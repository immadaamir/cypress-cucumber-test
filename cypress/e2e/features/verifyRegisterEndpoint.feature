Feature: Register a new user to verify the endpoint

    Scenario: Verify the registering endpoint with valid credentials
        Given I am making a POST request to the "https://reqres.in/api/register" endpoint with the right credentials to register
        When I send the request with the right credentials as the request body
        Then I should receive a response with a 200 status code
        And the response body should contain a token

    Scenario: Verify the registering endpoint without a password
        Given I am making a POST request to the "https://reqres.in/api/register" endpoint without a password to register
        When I send the request without a password as the request body
        Then I should receive a response with a 400 status code specific to the missing password
        And the response body should contain an error message specific to the missing password

    Scenario: Verify the registering endpoint without email
        Given I am making a POST request to the "https://reqres.in/api/register" endpoint without email to register
        When I send the request without email as the request body
        Then I should receive a response with a 400 status code specific to the missing email
        And the response body should contain an error message specific to missing email

    Scenario: Verify the registering endpoint with the wrong credentials
        Given I am making a POST request to the "https://reqres.in/api/register" endpoint with the wrong credentials to register
        When I send the request with the wrong credentials as the request body
        Then I should receive a response with a 400 status code specific to the wrong credentials
        And the response body should contain an error message specific to the wrong credentials