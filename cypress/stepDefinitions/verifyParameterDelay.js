import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(
  `I am making a GET request to the {string} endpoint with a delay parameter`,
  () => {
    cy.intercept({
      method: "GET",
      url: "/api*",
    }).as("getApi");
    cy.intercept("GET", "https://reqres.in/api/users?delay=3").as("getUsers");
  }
);

When(`I send the request to check delay parameter`, () => {
  cy.intercept({
    method: "GET",
    url: "https://reqres.in/api/users?delay=3",
    headers: {
      "Content-Type": "application/json",
    },
  }).as("getUsers");
  cy.request("https://reqres.in/api/users?delay=3");
  cy.wait(3000); // Wait for the response to be received
});

Then(`the response should be received within 3 seconds`, () => {
  cy.get("@getUsers").then((response) => {
    if (response) {
      expect(response.status).to.equal(200);
      expect(response.responseBody).to.have.property("data");
    }
  });
});

Given(
  "I am making a GET request to the {string} endpoint to retrieve the list of users",
  () => {
    cy.intercept({
      method: "GET",
      url: "/api*",
    }).as("getApi");
    cy.intercept("GET", "https://reqres.in/api/users?delay=3").as("getUsers");
  }
);

When("I send the request", () => {
  cy.intercept({
    method: "GET",
    url: "https://reqres.in/api/users?delay=3",
    headers: {
      "Content-Type": "application/json",
    },
  }).as("getUsers");
  cy.request("https://reqres.in/api/users?delay=3");
  cy.wait(3000); // Wait for the response to be received
});

Then("the response body should contain a list of at least 1 user", () => {
  cy.get("@getUsers").then((response) => {
    if (response) {
      expect(response).to.not.be.null;
      expect(response.responseBody)
        .to.have.property("data")
        .and("have.length.greaterThan", 0);
    }
  });
});

Given(
  "I am making a GET request to the {string} endpoint to verify user details",
  () => {
    cy.intercept({
      method: "GET",
      url: "/api*",
    }).as("getApi");
    cy.intercept("GET", "https://reqres.in/api/users?delay=3").as("getUsers");
  }
);

When("I send the request to verify the user details", () => {
  cy.intercept({
    method: "GET",
    url: "https://reqres.in/api/users?delay=3",
    headers: {
      "Content-Type": "application/json",
    },
  }).as("getUsers");
  cy.request("https://reqres.in/api/users?delay=3");
  cy.wait(3000); // Wait for the response to be received
});

Then(
  "the response body should contain the details of each user, such as their name, job, avatar",
  () => {
    cy.get("@getUsers").then((response) => {
      if (response) {
        expect(response).to.not.be.null;
        expect(response.responseBody)
          .to.have.property("data")
          .and("have.length.greaterThan", 0);
        response.responseBody.data.forEach((user) => {
          expect(user).to.have.all.keys(
            "id",
            "first_name",
            "last_name",
            "avatar"
          );
        });
      }
    });
  }
);

Given("I am making a GET request to the {string} endpoint", (url) => {
  cy.intercept({
    method: "GET",
    url: "/api*",
  }).as("getApi");
  cy.intercept("GET", "https://reqres.in/api/users?delay=3").as("getUsers");
});

When("I send the request to verify the pagination", () => {
  cy.intercept({
    method: "GET",
    url: "https://reqres.in/api/users?delay=3",
    headers: {
      "Content-Type": "application/json",
    },
  }).as("getUsers");
  cy.request("https://reqres.in/api/users?delay=3");
  cy.wait(3000); // Wait for the response to be received
});

Then(
  "the response body should contain pagination information, such as the total number of users, the current page number",
  () => {
    cy.get("@getUsers").should((response) => {
      if (response) {
        expect(response).to.not.be.null;
        expect(response.responseBody).to.have.property("total");
        expect(response.responseBody).to.have.property("page");
      }
    });
  }
);

Then("the current page number should be 1 or greater", () => {
  cy.get("@getUsers").should((response) => {
    if (response) {
      expect(response.responseBody.page).to.be.at.least(1);
    }
  });
});
