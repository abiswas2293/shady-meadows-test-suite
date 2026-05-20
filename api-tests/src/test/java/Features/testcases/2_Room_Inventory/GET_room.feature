@rooms @sanity
Feature: 2. Room Inventory

Description:
      ● Endpoint: GET /room/
      ● Goal: Retrieve the list of available rooms.
      ● Expectation: Verify the response is an array and that at least one room exists with a roomPrice greater than 0.


  Scenario: Retrieve the available rooms
    Given url baseUrl
    And path '/room'
    When method Get
    Then status 200
    And match response == '#object'
    And match response.rooms == '#array'
    * match response.rooms[*].roomPrice contains '#? _ > 0'