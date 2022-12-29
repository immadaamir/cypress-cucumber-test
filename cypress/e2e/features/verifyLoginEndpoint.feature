Feature: Verify the login endpoint

    Scenario: Verify the login endpoint with valid credentials
        Given I am making a POST request to the "https://reqres.in/api/login" endpoint with the right credentials to login
        When I send the request with the right credentials as a request body
        Then I should receive a response with 200 status code
        And the response body should contain token

    Scenario: Verify the login endpoint without a password
        Given I am making a POST request to the "https://reqres.in/api/login" endpoint without a password to login
        When I send the request without password as a request body
        Then I should receive a response with 400 status code specific to missing password
        And the response body should contain an error message specific to missing password

    Scenario: Verify the login endpoint without email
        Given I am making a POST request to the "https://reqres.in/api/login" endpoint without email to login
        When I send the request without email as a request body
        Then I should receive a response with a 400 status code specific to missing email
        And the response body should contain an error message specific to the missing email

    Scenario: Verify the login endpoint with the wrong credentials
        Given I am making a POST request to the "https://reqres.in/api/login" endpoint with the wrong credentials to login
        When I send the request with the wrong credentials as a request body
        Then I should receive a response with a 400 status code specific to wrong credentials
        And the response body should contain an error message specific to wrong credentials