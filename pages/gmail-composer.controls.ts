import { browser, $, ExpectedConditions, by, element } from 'protractor';
import { waitForElementToBeClickable, waitForElementToHaveAttribute, waitForElementToBeVisible } from './helper-functions';
import { async } from 'q';


export class GmailComposer {
  //Locators|strings
  private composerRoot = $('.aoI[role=region]');
  private mailToField = this.composerRoot.$('[aria-label=To]');
  private mailSubjectField = this.composerRoot.$('[name=subjectbox]');
  private mailSendButton = this.composerRoot.$('.T-I.J-J5-Ji.aoO.T-I-atl.L3')


  public setToField = async(emailAddress: string): Promise<void> => {
    console.log('can I find the to field?');
    await waitForElementToBeVisible(this.mailToField);
    console.log('I did it!');
    await this.mailToField.sendKeys(emailAddress);
  }

  public setSubjectField = async(emailSubject: string): Promise<void> => {
    await waitForElementToBeVisible(this.mailSubjectField);
    // await this.mailSubjectField.click();
    await this.mailSubjectField.sendKeys(emailSubject);
  }

  public sendCurrentMail = async(): Promise<void> => {
    await waitForElementToBeClickable(this.mailSendButton, 3000);
    await this.mailSendButton.click();
    await browser.wait(ExpectedConditions.invisibilityOf(this.composerRoot), 10000);
    //Small wait for the email to post before moving on. Replace this with monitoring of the sending status pop-up
    await browser.sleep(2000);
  }

  public waitForComposer = async(): Promise<void> => {
    await waitForElementToBeVisible(this.composerRoot);
  }

}
