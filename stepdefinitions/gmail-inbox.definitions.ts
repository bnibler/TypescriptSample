import { GmailInbox } from '../pages/gmail-inbox.controls'
import { GmailComposer } from '../pages/gmail-composer.controls'
import { expect } from 'chai';

const { When, Then } = require ('cucumber');
const inboxPage = new GmailInbox();
const composeControl = new GmailComposer();


When(/^I click the Select All checkbox$/, {timeout: 15000}, async() => {
  await inboxPage.selectPrimaryTab();
  await inboxPage.selectAllEmails();
});

When(/^I click the Delete button$/, {timeout: 10000}, async() => {
  await inboxPage.deleteAllEmailsInCurrentView();
});


When(/^I create a new message$/, async() => {
  await inboxPage.composeNewMail();
});

When(/^I send it to "(.*)" with the subject "(.*)"$/, async(emailAddress: string, emailSubject: string) => {
  await composeControl.waitForComposer();
  await composeControl.setToField(emailAddress);
  await composeControl.setSubjectField(emailSubject);
  await composeControl.sendCurrentMail();
});

Then(/^my inbox will be empty$/, async() => {
    expect(await inboxPage.checkIfInboxIsEmpty()).to.equal(true);
});
Then(/^I should see an email from "(.*)" in my inbox$/, async(sourceAddress: string) => {
  await inboxPage.checkEmailFromAddrInInbox(sourceAddress);
  expect(await inboxPage.checkIfInboxIsEmpty()).to.equal(false);

});
