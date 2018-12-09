import { browser, $, $$, ExpectedConditions, by, element } from 'protractor';
import { waitForElementToBeClickable, waitForElementToHaveAttribute } from './helper-functions';


export class GmailInbox {
  //Locators|strings
  private controlRoot = $('.aeH');
  private selectionControl = this.controlRoot.$('[aria-label=Select]');
  private selectAllCheckboxCssAttr = '[role=checkbox]';
  private selectAllCheckedStatusAttr = '[aria-checked=true]';
  private selectAllUncheckedStatusAttr = '[aria-checked=false]';
  private deleteButton = this.controlRoot.$('[aria-label=Delete]');
  
  private primaryTabSelect =  $('[aria-label=Primary]');
  private primaryinboxEmptyMessage = 'Your Primary tab is empty.';
  private primaryinboxEmptyClass = '.aRv';

  private receivedMailSources = $$('.zF');
  private receivedMailSourceAttr = 'email';

  private composeButton = $('.T-I.J-J5-Ji.T-I-KE.L3');


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
    await waitForElementToBeClickable(this.deleteButton, 3000);
    await this.deleteButton.click();

    await browser.wait(ExpectedConditions.invisibilityOf(this.deleteButton), 10000);
    await waitForElementToHaveAttribute(this.selectionControl, this.selectAllCheckboxCssAttr, this.selectAllUncheckedStatusAttr);
    //Wait for minor page updates that occur after the delete
    await browser.sleep(500);
  }

  public checkIfInboxIsEmpty = async(): Promise<boolean> => {
    return await element(by.cssContainingText(this.primaryinboxEmptyClass, this.primaryinboxEmptyMessage)).isDisplayed();
  }

  public composeNewMail = async(): Promise<void> => {
    await waitForElementToBeClickable(this.composeButton, 1000);
    await this.composeButton.click();
  }

  public checkEmailFromAddrInInbox = async(sourceAddress: string): Promise<boolean> => {
    return (await (await this.receivedMailSources.first()).getAttribute(this.receivedMailSourceAttr)) === sourceAddress;
  }
}
