import * as fs from 'fs';
import { browser, $, ExpectedConditions } from 'protractor';


interface LoginCredentials {
  userEmail: string;
  userPassword: string;
}

export class GmailLoginPage {
  private userCredentials: LoginCredentials;

  //Page strings/URLs
  private loginPageURL = 'https://www.gmail.com';
  private loginPageTitle = 'Gmail';
  private loginPageSignInUrl = 'https://accounts.google.com/signin/v2/identifier?service=mail';
  private loginPagePasswordUrl = 'https://accounts.google.com/signin/v2/sl/pwd?service=mail';

  //Selectors
  private loginAddressInput = $('#identifierId');
  private loginAddressNextButton = $('#identifierNext');
  private loginEnteredAddressDropdown = $('#profileIdentifier');
  private loginPasswordInput = $('[name=password]');
  private loginPasswordNextButton = $('#passwordNext');


  constructor(credentialsFilename: string = 'test-credentials.json') {
    this.userCredentials = JSON.parse(fs.readFileSync(credentialsFilename, 'utf8')); 
  }

  public navigateToLoginPage = async(): Promise<void> => {
    var navComplete = ExpectedConditions.urlContains(this.loginPageSignInUrl);
    var titleCorrect = ExpectedConditions.titleIs(this.loginPageTitle);
    await browser.get(this.loginPageURL);
    await browser.wait(navComplete, 5000);
    await browser.wait(titleCorrect, 500);
  }


  public enterEmailAddress = async (): Promise<void> => {
    await this.loginAddressInput.isDisplayed();
    await this.loginAddressInput.sendKeys(this.userCredentials.userEmail);
  }

  public submitEmailAddress = async (): Promise<void> => {
    await this.loginAddressNextButton.isDisplayed();
    await this.loginAddressNextButton.click();
  }

  public waitForPasswordInterface = async (): Promise<void> => {
    var passwordPageShown = ExpectedConditions.urlContains(this.loginPagePasswordUrl);
    var enteredAddressCorrect = ExpectedConditions.textToBePresentInElement(this.loginEnteredAddressDropdown, this.userCredentials.userEmail);
    // var passwordPrompted = ExpectedConditions.elementToBeSelected(this.loginPasswordInput);
    await browser.wait(passwordPageShown, 3000);
    await browser.wait(enteredAddressCorrect, 500);
    // await browser.wait(passwordPrompted, 2000);
  }

  public enterPasswordAndSubmit = async (): Promise<void> => {
    await this.loginPasswordInput.isDisplayed();
    await this.loginPasswordInput.sendKeys(this.userCredentials.userPassword);
    await browser.sleep(500);
    await this.loginPasswordNextButton.isDisplayed();
    await this.loginPasswordNextButton.click();
  }

  

}