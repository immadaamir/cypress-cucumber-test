Feature: Verifying the Delay Parameter in the Reqres.in API

    Scenario: Verify the delay parameter
        Given I am making a GET request to the 'https://reqres.in/api/users?delay=3' endpoint with a delay parameter
        When I send the request to check delay parameter
        Then the response should be received within 3 seconds

    Scenario: Verify the user's list
        Given I am making a GET request to the "https://reqres.in/api/users?delay=3" endpoint to retrieve the list of users
        When I send the request
        Then the response body should contain a list of at least 1 user

    Scenario: Verify the user details
        Given I am making a GET request to the "https://reqres.in/api/users?delay=3" endpoint to verify user details
        When I send the request to verify the user details
        Then the response body should contain the details of each user, such as their name, job, avatar

    Scenario: Verify pagination
        Given I am making a GET request to the "https://reqres.in/api/users?delay=3" endpoint
        When I send the request to verify the pagination
        Then the response body should contain pagination information, such as the total number of users, the current page number
        And the current page number should be 1 or greater

