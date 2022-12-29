import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let statusCode;
let response;

Given(
  "I am making a GET request to the {string} endpoint to verify pagination information",
  () => {
    cy.intercept({
      method: "GET",
      url: "/api*",
    }).as("getApi");
    cy.intercept("GET", "https://reqres.in/api/users?page=2").as("getUsers");
  }
);

When("I send the request to verify pagination information", () => {
  cy.intercept({
    method: "GET",
    url: "https://reqres.in/api/users?page=2",
    headers: {
      "Content-Type": "application/json",
    },
  }).as("getUsers");
  cy.request("https://reqres.in/api/users?page=2");
});

Then(
  "the response body should contain pagination information, such as the total number of users, current page number",
  () => {
    cy.get("@getUsers").should((response) => {
      if (response) {
        expect(response).to.not.be.null;
        expect(response.responseBody).to.have.property("total");
        expect(response.responseBody).to.have.property("page");
        expect(response.responseBody).to.have.property("per_page");
      }
    });
  }
);

Given(
  "I am making a GET request to the {string} endpoint to verify users list",
  (url) => {
    cy.intercept({
      method: "GET",
      url: url,
    }).as("getUsers");
  }
);

When("I send a request", () => {
  cy.request("https://reqres.in/api/users");
});

Then("I should receive response with a 200 status code", () => {
  const statusCode = 200;
  cy.get("@getUsers").should((response) => {
    if (response) {
      expect(response).to.not.be.null;
      expect(response.statusCode).to.be.equal(statusCode);
    }
  });
});

Then("the response body should contain a list of users", () => {
  cy.get("@getUsers").should((response) => {
    if (response) {
      expect(response.body).to.have.property("data");
    }
  });
});

Given(
  "I am making a GET request to the {string} endpoint to verify single user endpoint",
  () => {
    cy.intercept({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).as("getUsers");
  }
);

When("I send the request to verify the single user endpoint", () => {
  cy.request("https://reqres.in/api/users/2");
});

Then("I should get a response with a 200 status code", () => {
  const statusCode = 200;
  cy.get("@getUsers").should((response) => {
    if (response) {
      expect(response).to.not.be.null;
      expect(response.statusCode).to.be.equal(statusCode);
    }
  });
});

Then(
  "the response body should contain the details of the user with id 2",
  () => {
    cy.get("@getUsers").should((responseBody) => {
      if (response) {
        expect(responseBody).to.have.property("data");
        expect(responseBody.data).to.have.property("id", 2);
        expect(responseBody.data).to.have.property(
          "email",
          "janet.weaver@reqres.in"
        );
      }
    });
  }
);

Given(
  "I am making a GET request to the {string} endpoint to verify single user endpoint not found",
  () => {
    cy.intercept({
      method: "GET",
      url: "https://reqres.in/api/users/23",
    }).as("getUsers");
  }
);

When("I send the request to verify the single user endpoint not found", () => {
  cy.request({
    method: "GET",
    url: "https://reqres.in/api/users/23",
    failOnStatusCode: false,
  });
});

Then("I should get a response with a 404 status code", () => {
  const statusCode = 404;

  if (response) {
    expect(response.statusCode).to.be.equal(statusCode);
  }
});

Given("I am making a POST request to the {string} endpoint", () => {
  () => {
    cy.intercept({
      method: "POST",
      url: "https://reqres.in/api/users",
    }).as("createUser");
  };
});

Given("I have a valid user object to create", (name, job) => {
  cy.fixture("user").then((user) => {
    cy.wrap({ ...user, name, job }).as("user");
  });
});

When("I send the request with the user object as the request body", () => {
  cy.wait(3000); // optional delay to simulate a slower server
  cy.get("@user").then((user) => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: user,
    });
  });
});

Then("I should receive a response with a 201 status code", () => {
  const statusCode = 201;

  if (response) {
    expect(response.statusCode).to.be.equal(statusCode);
  }
});

Then(
  "the response body should contain the details of the created user",
  (responseBody) => {
    if (responseBody) {
      expect(responseBody).to.have.property("name", "morpheus");
      expect(responseBody).to.have.property("job", "leader");
    }
  }
);

Given("I am making a PUT request to the {string} endpoint", () => {
  () => {
    cy.intercept({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
    }).as("updateUser");
  };
});

Given("I have a valid user object to update", (name, job) => {
  cy.fixture("user_2").then((user) => {
    cy.wrap({ ...user, name, job }).as("user_2");
  });
});

When(
  "I send the request with the updated user object as the request body",
  () => {
    cy.wait(3000); // optional delay to simulate a slower server
    cy.get("@user_2").then((user) => {
      cy.request({
        method: "PUT",
        url: "https://reqres.in/api/users/2",
        body: user,
      });
    });
  }
);

Then("I should get a response with 200 status code", () => {
  statusCode = 200;

  if (response) {
    expect(response.statusCode).to.be.equal(statusCode);
  }
});

Then(
  "the response body should contain the details of the updated user",
  (responseBody) => {
    if (responseBody) {
      expect(responseBody).to.have.property("name", "morpheus");
      expect(responseBody).to.have.property("job", "zion resident");
    }
  }
);

Given(
  "I am making a PATCH request to the {string} endpoint to modify user",
  () => {
    () => {
      cy.intercept({
        method: "PATCH",
        url: "https://reqres.in/api/users/2",
      }).as("updateUser");
    };
  }
);

Given("I have a valid user object to modify", (name, job) => {
  cy.fixture("user_2").then((user) => {
    cy.wrap({ ...user, name, job }).as("user_2");
  });
});

When(
  "I send the request with the modified user object as the request body",
  () => {
    cy.wait(3000); // optional delay to simulate a slower server
    cy.get("@user_2").then((user) => {
      cy.request({
        method: "PATCH",
        url: "https://reqres.in/api/users/2",
        body: user,
      });
    });
  }
);

Then("I get a response with the status code 200", () => {
  statusCode = 200;

  if (response) {
    expect(response.statusCode).to.be.equal(statusCode);
  }
});

Then(
  "the response body should contain the details of the modified user",
  (responseBody) => {
    if (responseBody) {
      expect(responseBody).to.have.property("name", "morpheus");
      expect(responseBody).to.have.property("job", "zion resident");
    }
  }
);

Given("I am making a DELETE request to the {string} endpoint", (url) => {
  cy.intercept({
    method: "DELETE",
    url: url,
  }).as("deleteUser");
});

When("I send the request to delete the user", () => {
  cy.wait(3000);
  cy.request("DELETE", "https://reqres.in/api/users/2");
});

Then("I should receive a response with a 204 status code", () => {
  statusCode = 204;
  cy.get("@deleteUser").should((response) => {
    if (response) {
      expect(response).to.not.be.null;
      expect(response.statusCode).to.be.equal(statusCode);
    }
  });
});
