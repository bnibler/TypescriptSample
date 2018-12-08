import { browser, $, ExpectedConditions } from 'protractor';
import { waitForElementToBeClickable, waitForElementToHaveAttribute } from './helper-functions';
import { async } from 'q';


export class GmailInbox {
    //Page strings/URLs
  private inboxPageURL = 'https://mail.google.com/mail/#inbox';
  

  //Selectors
  private controlRoot = $('.aeH');
  private selectionControl = this.controlRoot.$('[aria-label=Select]');
  private selectAllCheckboxCssAttr = '[role=checkbox]';
  private selectAllCheckedStatusAttr = '[aria-checked=true]';
  private selectAllUncheckedStatusAttr = '[aria-checked=false]';
  private deleteButton = this.controlRoot.$('[aria-label=Delete]');
  
  private primaryTabSelect =  $('[aria-label=Primary]');
  

  constructor() { }

  public selectPrimaryTab = async(): Promise<void> => {
    await waitForElementToBeClickable(this.primaryTabSelect);
    await this.primaryTabSelect.click();

  }

  public selectAllEmails = async(): Promise<void> => {
    await waitForElementToBeClickable(this.selectionControl.$(this.selectAllCheckboxCssAttr));
    await this.selectionControl.$(this.selectAllCheckboxCssAttr).click();
    await waitForElementToHaveAttribute(this.selectionControl, this.selectAllCheckboxCssAttr, this.selectAllCheckedStatusAttr);
  }

  public deleteAllEmailsInCurrentView = async(): Promise<void> => {
    console.log('wait for button');
    await waitForElementToBeClickable(this.deleteButton, 3000);
    console.log('clicky');
    await this.deleteButton.click();
    console.log('wait for delete');

    await browser.wait(ExpectedConditions.invisibilityOf(this.deleteButton), 10000);
    await waitForElementToHaveAttribute(this.selectionControl, this.selectAllCheckboxCssAttr, this.selectAllUncheckedStatusAttr);
    await browser.sleep(8000);
  }

}
