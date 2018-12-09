Feature: Gmail Inbox
  

@focus
Scenario: Login with valid credentials
  Given I am at the Gmail login interface
  When I enter a valid email address and click the Next button
    And I enter the password for the valid address and click the Next button
  Then I am redirected to the Gmail inbox at https://mail.google.com/mail/#inbox


@focus
Scenario: Send an email to myself
  When I create a new message
    And I send it to "blakestestaddress@gmail.com" with the subject "This is a test message"
  Then I should see an email from "blakestestaddress@gmail.com" in my inbox

@focus
Scenario: Delete current messages
  When I click the Select All checkbox
    And I click the Delete button
  Then my inbox will be empty