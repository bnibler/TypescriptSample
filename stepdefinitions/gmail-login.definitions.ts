import { browser, ExpectedConditions } from 'protractor';
import { GmailLoginPage } from '../pages/gmail-login.controls'

const { Given, When, Then } = require ('cucumber');
const page = new GmailLoginPage();


Given(/^I am at the Gmail login interface$/, async () => {
  await page.navigateToLoginPage();
});

When(/^I enter a valid email address and click the Next button$/, async() => {
  await page.enterEmailAddress();
  await page.submitEmailAddress();
});

When(/^I enter the password for the valid address and click the Next button$/, async() => {
  await page.waitForPasswordInterface();
  await page.enterPasswordAndSubmit();
});

Then(/^I am redirected to the Gmail inbox at (.*)$/, async(inboxUrl: string) => {
  var inboxRedirectDone = ExpectedConditions.urlIs(inboxUrl);
  await browser.wait(inboxRedirectDone, 15000);
});
