@bookARoom @sanity
Feature: 3. Booking Creation


Description:
        ● Endpoint: POST /booking/
        ● Goal: Create a new booking for a room.
        ● Requirement: * Find a valid roomid first.
            ○ Payload must include firstname, lastname, depositpaid (boolean), and a bookingdates object.
            ○ Note: This endpoint often requires specific headers (e.g., Content-Type: application/json).



  Background:
    * def createRoom = call read('classpath:Features/setup/POST_create_room.feature')
    * def roomID = call read('classpath:Features/setup/GET_all_Rooms.feature')
    * def today = java.time.LocalDate.now().toString()
    * def tomorrow = java.time.LocalDate.now().plusDays(1).toString()
    * def bookingDeposit = false
    * def firstname = 'test'
    * def lastname = 'case'

  Scenario: Create a new room booking
    Given url baseUrl
    And path '/booking'
    And header Content-Type = 'application/json'
    And request
    """
   {
    "roomid": #(roomID.lastRoomId),
    "firstname": "#(firstname)",
    "lastname": "#(lastname)",
    "depositpaid": #(bookingDeposit),
    "bookingdates": {
        "checkin": "#(today)",
         "checkout": "#(tomorrow)"
    },
    "email": "test@yahoo.com",
    "phone": "1234567811234"
}
    """
    When method POST
    Then status 201
    And match response ==
    """
    {
    "bookingdates": {
        "checkin": "#(today)",
        "checkout": "#(tomorrow)"
    },
    "bookingid": '#number',
    "depositpaid": #(bookingDeposit),
    "firstname": "#(firstname)",
    "lastname": "#(lastname)",
    "roomid": #(roomID.lastRoomId)
}
    """