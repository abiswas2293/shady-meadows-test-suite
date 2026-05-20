Feature: Booking creation test (POST /auth/login)

  Scenario: Get a token
    Given url baseUrl
    And path '/auth/login'
    And header Content-Type = 'application/json'
    And request
    """
    {
    "username": "admin",
    "password": "password"
}
    """
    When method POST
    Then status 200
    * def token = response.token
    * print token