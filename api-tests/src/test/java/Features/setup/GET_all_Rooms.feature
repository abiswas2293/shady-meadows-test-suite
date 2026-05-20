Feature: Room Inventory test (GET /room)

  Scenario: Get all available rooms and store the room id of the last room
    Given url baseUrl
    And path '/room'
    When method GET
    Then status 200
    * print response
    * def totalRooms = response.rooms.length
    * def lastRoomId = response.rooms[totalRooms-1].roomid
    * print lastRoomId