Feature: Booking creation test (POST /room)

  Background:
    * def auth = call read('classpath:Features/setup/POST_generate_token.feature')

  Scenario: Create a new room
    Given url baseUrl
    And path '/room'
    And header Content-Type = 'application/json'
    * print auth.token
    And header Cookie = 'token=' + auth.token
    And request
    """
    {
    "roomName": "test",
    "type": "Single",
    "accessible": true,
    "description": "testing room",
    "image": "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
    "roomPrice": "100",
    "features": [
        "WiFi",
        "TV",
        "Radio"
    ]
}
    """
    When method POST
    Then status 200