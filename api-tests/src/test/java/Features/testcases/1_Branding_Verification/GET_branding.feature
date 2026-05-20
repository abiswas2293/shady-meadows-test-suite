@branding @sanity
Feature: 1. Branding Verification

Description:
      ● Endpoint: GET /branding/
      ● Goal: Validate that the B&B branding information name, contact details, and descriptions is returning correctly.
      ● Expectation: Verify that the name field is exactly Shady Meadows B&B and that the contact email matches a valid email regex.

  Scenario: Validate Branding information
    Given url baseUrl
    And path '/branding'
    When method Get
    Then status 200
    And match response contains
    """
    {
    contact: {
        email: "#regex ^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
        name: "Shady Meadows B&B",
        phone: "#string"
    },
    description: "Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.",
   name: "Shady Meadows B&B"
}
    """



