Feature: Verify user based endpoints

    Scenario: Verify pagination information
        Given I am making a GET request to the "https://reqres.in/api/users?page=2" endpoint to verify pagination information
        When I send the request to verify pagination information
        Then the response body should contain pagination information, such as the total number of users, current page number

    Scenario: Verify the list users endpoint
        Given I am making a GET request to the "https://reqres.in/api/users" endpoint to verify users list
        When I send a request
        Then I should receive response with a 200 status code
        And the response body should contain a list of users

    Scenario: Verify the single user endpoint
        Given I am making a GET request to the "https://reqres.in/api/users/2" endpoint to verify single user endpoint
        When I send the request to verify the single user endpoint
        Then I should get a response with a 200 status code
        And the response body should contain the details of the user with id 2

    Scenario: Verify the single user endpoint not found 
        Given I am making a GET request to the "https://reqres.in/api/users/23" endpoint to verify single user endpoint not found
        When I send the request to verify the single user endpoint not found
        Then I should get a response with a 404 status code

    Scenario: Verify the create user endpoint
        Given I am making a POST request to the "https://reqres.in/api/users" endpoint
        And I have a valid user object to create
        When I send the request with the user object as the request body
        Then I should receive a response with a 201 status code
        And the response body should contain the details of the created user

    Scenario: Verify the update user endpoint
        Given I am making a PUT request to the "https://reqres.in/api/users/2" endpoint
        And I have a valid user object to update
        When I send the request with the updated user object as the request body
        Then I should get a response with 200 status code
        And the response body should contain the details of the updated user

    Scenario: Verify to modify user endpoint
        Given I am making a PATCH request to the "https://reqres.in/api/users/2" endpoint to modify user
        And I have a valid user object to modify
        When I send the request with the modified user object as the request body
        Then I get a response with the status code 200
        And the response body should contain the details of the modified user

    Scenario: Verify the delete user endpoint
        Given I am making a DELETE request to the "https://reqres.in/api/users/2" endpoint
        When I send the request to delete the user
        Then I should receive a response with a 204 status code