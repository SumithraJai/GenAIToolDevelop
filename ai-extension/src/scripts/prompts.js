/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.
    - Use fine tuned model

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`
/**
 * Page object representing the Login page.
 * Provides methods to interact with the login form fields and actions.
 * @author Auto-generated
 */
package com.leaftaps.pages;

import com.framework.selenium.api.design.Locators;
import com.framework.testng.api.base.ProjectSpecificMethods;


public class LoginPage extends ProjectSpecificMethods {

	/**
	 * Enters the username in the login form.
	 * @param uName The username to enter
	 * @return The current LoginPage instance
	 */
	public LoginPage enterUsername(String uName) {
		clearAndType(locateElement(Locators.ID,"username"),uName);
		reportStep(uName+" username is entered successfully", "pass");
		return this;
	}

	/**
	 * Enters the password in the login form.
	 * @param passWord The password to enter
	 * @return The current LoginPage instance
	 */
	public LoginPage enterPassword(String passWord) {
		clearAndType(locateElement(Locators.ID,"password"),passWord);
		reportStep(passWord+" password is entered successfully", "pass");
		return this;
	}

	/**
	 * Clicks the Login button to submit the form.
	 * @return A new HomePage instance
	 */
	public HomePage clickLogin() {
		click(locateElement(Locators.CLASS_NAME, "decorativeSubmit"));
		reportStep("Login button is clicked successfully", "pass");
		return new HomePage();
	}

}    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Playwright TypeScript Page Object Prompt (No Test Class)
   */
  PW_TYPESCRIPT_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test code).
    - Add TSDoc (/** */) for class and methods.
    - Use Playwright 1.30+ compatible imports.
    - Use meaningful, action-driven method names.
    - Do NOT include explanations or test code.
    - Use a clean, maintainable POM design with async/await.
    - Use fine tuned model.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`typescript
    /**
     * Page object representing the Login page.
     * Provides methods to interact with the login form fields and actions.
     * @author Auto-generated
     */
    import { Page, Locator } from '@playwright/test';

    export class LoginPage {
      readonly page: Page;
      readonly usernameInput: Locator;
      readonly passwordInput: Locator;
      readonly loginButton: Locator;

      constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('.decorativeSubmit');
      }

      /**
       * Enters the username in the login form.
       * @param username The username to enter
       * @returns The current LoginPage instance
       */
      async enterUsername(username: string): Promise<this> {
        await this.usernameInput.fill(username);
        return this;
      }

      /**
       * Enters the password in the login form.
       * @param password The password to enter
       * @returns The current LoginPage instance
       */
      async enterPassword(password: string): Promise<this> {
        await this.passwordInput.fill(password);
        return this;
      }

      /**
       * Clicks the Login button to submit the form.
       * @returns A new HomePage instance
       */
      async clickLogin(): Promise<HomePage> {
        await this.loginButton.click();
        return new HomePage(this.page);
      }
    }
    \`\`\`
    
    Persona:
    - Audience: Automation engineer focusing on scalable Playwright Page Object Model (POM) architecture.

    Output Format:
    - A single TypeScript class inside a \`\`\`typescript\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,        
  /**
   * Test Data JSON/CSV Only Prompt
   * Generates realistic test-data for the provided DOM.
   */
  TESTDATA_JSON_ONLY: `
    Instructions:
    - Analyze the provided DOM and generate realistic test data for all user-input fields (text inputs, selects, radios, checkboxes).
    - For each logical record, provide: field name, data type, validation rules, and example value.
    - Prefer realistic South India data for names, addresses, phone numbers and pincodes unless DOM values constrain choices.
    - For dropdown/select elements use only options present in the DOM.
    - Provide output format as a JSON array of objects
    - Generate at least 5 unique records unless otherwise constrained by the DOM.
    - Do NOT include any explanatory text outside the requested code blocks.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

    Example Output:
    \`\`\`json
    {
      "data": [
        { "fullName": "Arjun Ramesh", "email": "arjun.ramesh@example.in", "mobile": "+91-9840123456", "pincode": "560076" },
        { "fullName": "Meera Karthik", "email": "meera.k@example.in", "mobile": "+91-9901234567", "pincode": "600001" },
        { "fullName": "Ravi Nambiar", "email": "ravi.n@example.in", "mobile": "+91-9876543210", "pincode": "682001" }
      ]
  }
  \`\`\`

    Persona:
    - Audience: QA engineers or test-data engineers who need bulk, realistic test data anchored to the page DOM.

    Output Format:
  - A JSON object with \`data\` fields in a \`\`\`json\`\`\` block.

    Tone:
    - Precise, machine-readable, and ready for direct consumption by tests or seed scripts.
  `,
   
  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `
,

/**
 * Cucumber with Step Definitions
 */
CUCUMBER_WITH_PLAYWRIGHT_TYPESCRIPT_STEPS: `
  Instructions:
  - Generate BOTH:
    1. A Cucumber .feature file.
    2. A Playwright TypeScript step definition file.
  - Do NOT include Page Object code.
  - Step definitions must include Playwright setup, explicit waits (locator.waitFor, expect), and actual Playwright interactions.
  - Use Scenario Outline with Examples table (South India realistic data).
  - Include before/after hooks for browser and page lifecycle.
  - Use async/await syntax and modern TypeScript standards.
  - Use fine tuned model.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`
  URL: \${pageUrl}

  Example:
  \`\`\`gherkin
  Feature: Login to OpenTaps

  Scenario Outline: Successful login with valid credentials
    Given I open the login page
    When I type "<username>" into the Username field
    And I type "<password>" into the Password field
    And I click the Login button
    Then I should be logged in successfully

  Examples:
    | username   | password  |
    | "admin"    | "admin123"|
  \`\`\`

  \`\`\`typescript
  import { Given, When, Then, Before, After } from '@cucumber/cucumber';
  import { chromium, Browser, Page, expect } from '@playwright/test';

  let browser: Browser;
  let page: Page;

  Before(async () => {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
  });

  After(async () => {
    await browser.close();
  });

  Given('I open the login page', async () => {
    await page.goto('\${pageUrl}');
    await page.waitForLoadState('domcontentloaded');
  });

  When('I type {string} into the Username field', async (username: string) => {
    const usernameField = page.locator('#username');
    await usernameField.waitFor({ state: 'visible' });
    await usernameField.fill(username);
  });

  When('I type {string} into the Password field', async (password: string) => {
    const passwordField = page.locator('#password');
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.fill(password);
  });

  When('I click the Login button', async () => {
    const loginButton = page.locator('button:has-text("Login")');
    await loginButton.waitFor({ state: 'attached' });
    await loginButton.click();
  });

  Then('I should be logged in successfully', async () => {
    const successMessage = page.locator('.success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });
  \`\`\`

  Persona:
  - Audience: QA engineers working with Cucumber + Playwright TypeScript automation.

  Output Format:
  - Gherkin in \`\`\`gherkin\`\`\` block + TypeScript code in \`\`\`typescript\`\`\` block.

  Tone:
  - Professional, executable, maintainable.
`
};


/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  PW_TYPESCRIPT_PAGE_ONLY: 'Playwright-TypeScript-Page-Only',
  TESTDATA_JSON_ONLY: 'TestData-JSON-Only',
  CUCUMBER_WITH_PLAYWRIGHT_TYPESCRIPT_STEPS: 'Cucumber-With-Playwright-TypeScript-Steps',
};
