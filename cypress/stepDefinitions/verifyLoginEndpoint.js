import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let email;
let password;
let response;

Given(
  "I am making a POST request to the {string} endpoint with the right credentials to login",
  () => {
    email = "eve.holt@reqres.in";
    password = "cityslicka";
  }
);

When("I send the request with the right credentials as a request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/login",
    body: {
      email: email,
      password: password,
    },
  }).then((res) => {
    if (res) {
      response = res;
    } else {
      console.error("Response object is null or undefined");
    }
  });
});

Then("I should receive a response with 200 status code", () => {
  const statusCode = 200;
  expect(response.status).to.equal(statusCode);
});

Then("the response body should contain token", () => {
  expect(response.body).to.have.property("token", "QpwL5tke4Pnpja7X4");
});

Given(
  "I am making a POST request to the {string} endpoint without a password to login",
  () => {
    email = "eve.holt@reqres.in";
  }
);

When("I send the request without password as a request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/login",
    body: {
      email: email,
    },
    failOnStatusCode: false,
  }).then((res) => {
    if (res) {
      response = res;
    } else {
      console.error("Response object is null or undefined");
    }
  });
});

Then(
  "I should receive a response with 400 status code specific to missing password",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to missing password",
  () => {
    expect(response.body).to.have.property("error", "Missing password");
  }
);

Given(
  "I am making a POST request to the {string} endpoint without email to login",
  () => {
    password = "cityslicka";
  }
);

When("I send the request without email as a request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/login",
    body: {
      password: password,
    },
    failOnStatusCode: false,
  }).then((res) => {
    if (res) {
      response = res;
    } else {
      console.error("Response object is null or undefined");
    }
  });
});

Then(
  "I should receive a response with a 400 status code specific to missing email",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to the missing email",
  () => {
    expect(response.body).to.have.property(
      "error",
      "Missing email or username"
    );
  }
);

Given(
  "I am making a POST request to the {string} endpoint with the wrong credentials to login",
  () => {
    email = "random@email.com";
    password = "random";
  }
);

When("I send the request with the wrong credentials as a request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/login",
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  }).then((res) => {
    if (res) {
      response = res;
    } else {
      console.error("Response object is null or undefined");
    }
  });
});

Then(
  "I should receive a response with a 400 status code specific to wrong credentials",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to wrong credentials",
  () => {
    expect(response.body).to.have.property("error", "user not found");
  }
);
