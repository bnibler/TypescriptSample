Feature: Gmail Login


Scenario: Login with valid credentials
  Given I am at the Gmail login interface
  When I enter a valid email address and click the Next button
    And I enter the password for the valid address and click the Next button
  Then I am redirected to the Gmail inbox at https://mail.google.com/mail/#inbox


