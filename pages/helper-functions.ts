import { browser, ExpectedConditions, ElementFinder } from 'protractor';


export async function waitForElementToBeVisible(targetElement: ElementFinder, waitTime = 5000): Promise<void> {
  await browser.wait(ExpectedConditions.presenceOf(targetElement), waitTime);
  await browser.wait(ExpectedConditions.visibilityOf(targetElement), waitTime);
}

export async function waitForElementToBeClickable(targetElement: ElementFinder, waitTime = 5000): Promise<void> {
  await waitForElementToBeVisible(targetElement, waitTime);
  await browser.wait(ExpectedConditions.elementToBeClickable(targetElement), waitTime);
}

export async function waitForElementToHaveAttribute(parent: ElementFinder, elemLocator: string, elemAttribute: string, waitTime = 5000): Promise<void> {
  var targetElement = parent.$(elemLocator.concat(elemAttribute));
  await browser.wait(ExpectedConditions.presenceOf(targetElement), waitTime);
}
