import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let email;
let password;
let response;

Given(
  "I am making a POST request to the {string} endpoint with the right credentials to register",
  () => {
    email = "eve.holt@reqres.in";
    password = "pistol";
  }
);

When(
  "I send the request with the right credentials as the request body",
  () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
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
  }
);

Then("I should receive a response with a 200 status code", () => {
  const statusCode = 200;
  expect(response.status).to.equal(statusCode);
});

Then("the response body should contain a token", () => {
  expect(response.body).to.have.property("token", "QpwL5tke4Pnpja7X4");
});

Given(
  "I am making a POST request to the {string} endpoint without a password to register",
  () => {
    email = "sydney@fife";
  }
);

When("I send the request without a password as the request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/register",
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
  "I should receive a response with a 400 status code specific to the missing password",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to the missing password",
  () => {
    expect(response.body).to.have.property("error", "Missing password");
  }
);

Given(
  "I am making a POST request to the {string} endpoint without email to register",
  () => {
    password = "pistol";
  }
);

When("I send the request without email as the request body", () => {
  cy.request({
    method: "POST",
    url: "https://reqres.in/api/register",
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
  "I should receive a response with a 400 status code specific to the missing email",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to missing email",
  () => {
    expect(response.body).to.have.property(
      "error",
      "Missing email or username"
    );
  }
);

Given(
  "I am making a POST request to the {string} endpoint with the wrong credentials to register",
  () => {
    email = "random@email.com";
    password = "random";
  }
);

When(
  "I send the request with the wrong credentials as the request body",
  () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
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
  }
);

Then(
  "I should receive a response with a 400 status code specific to the wrong credentials",
  () => {
    const statusCode = 400;
    expect(response.status).to.equal(statusCode);
  }
);

Then(
  "the response body should contain an error message specific to the wrong credentials",
  () => {
    expect(response.body).to.have.property(
      "error",
      "Note: Only defined users succeed registration"
    );
  }
);
