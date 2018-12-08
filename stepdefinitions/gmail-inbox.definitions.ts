import { browser, ExpectedConditions } from 'protractor';
import { GmailInbox } from '../pages/gmail-inbox.controls'

const { Given, When, Then } = require ('cucumber');
const page = new GmailInbox();


When(/^I click the Select All checkbox$/, {timeout: 15000}, async() => {
  await page.selectPrimaryTab();
  await page.selectAllEmails();
});

When(/^I click the Delete button$/, {timeout: 30000}, async() => {
  await page.deleteAllEmailsInCurrentView();
});


