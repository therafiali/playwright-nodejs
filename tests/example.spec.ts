// Sign Up Form


import { test, expect, chromium } from "@playwright/test";
test("has title", async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser UI
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://parabank.parasoft.com/parabank/register.htm");
    await page.fill('input[name="customer.firstName"]', "Jazzy");
    await page.fill('input[name="customer.lastName"]', "Doe");
    await page.fill('input[name="customer.address.street"]', "123 Test St");
    await page.fill('input[name="customer.address.city"]', "TestCity");
    await page.fill('input[name="customer.address.state"]', "CA");
    await page.fill('input[name="customer.address.zipCode"]', "12345");
    await page.fill('input[name="customer.phoneNumber"]', "555-555-5555");
    await page.fill('input[name="customer.ssn"]', "123-45-6789");
    await page.fill('input[name="customer.username"]', "testuser111");
    await page.fill('input[name="customer.password"]', "Test123!");
    await page.fill('input[name="repeatedPassword"]', "Test123!");
    await page.click('input[value="Register"]');
    // Wait for success message and verify registration
    await page.waitForSelector('div#rightPanel p');
    await page.waitForTimeout(5000);
    // const message = await page.textContent('div#rightPanel p');
    // expect(message).toContain('Your account was created successfully');
    // Add a delay to keep browser open
  } finally {
    await browser.close();
  }
});

// Form Login

test("form login", async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser UI
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://parabank.parasoft.com/parabank/register.htm");
    await page.fill('input[name="username"]', "testuser111");
    await page.fill('input[name="password"]', "Test123!");

    await page.click('input[value="Log In"]');
    // Wait for success message and verify registration
    await page.waitForSelector('div#rightPanel p');
    // const message = await page.textContent('div#rightPanel p');
    // expect(message).toContain('Your account was created successfully');
    // Add a delay to keep browser open
  } finally {
    await browser.close();
  }
});


import fs from 'fs';

test('form login and reuse cookies', async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser UI
  const context = await browser.newContext();
  const page = await context.newPage();

  const cookiesFile = 'cookies.json';

  // Check if cookies are already saved
  if (fs.existsSync(cookiesFile)) {
    console.log('Loading cookies from file...');
    const cookies = JSON.parse(fs.readFileSync(cookiesFile, 'utf-8'));
    await context.addCookies(cookies); // Load cookies to reuse login session
    await page.goto('https://parabank.parasoft.com/parabank/index.htm'); // Skip login since cookies are loaded
  } else {
    console.log('No cookies found. Logging in...');
    await page.goto("https://parabank.parasoft.com/parabank/register.htm");

    // Fill out the login form and submit it
    await page.fill('input[name="username"]', "testuser111");
    await page.fill('input[name="password"]', "Test123!");
    await page.click('input[value="Log In"]');



    // Save cookies to a file
    const cookies = await context.cookies();
    fs.writeFileSync(cookiesFile, JSON.stringify(cookies, null, 2));

    console.log('Login successful, cookies saved.');
  }

  // Do additional actions after successful login, e.g., verify elements
  await page.waitForSelector('h1');
  console.log('Page title:', await page.title()); // Check page title after login

  // Add any further checks, like verifying if the user is logged in by checking specific content on the page

  await browser.close();
});
