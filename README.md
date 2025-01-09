### install playwright
https://playwright.dev/docs/intro#installing-playwright
```
npm init playwright@latest
```


### open browser 
```
import { test, chromium } from '@playwright/test';

test('has title', async () => {
  // Launch the browser in non-headless mode
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser UI
  const page = await browser.newPage(); // Open a new page/tab
  
  // Navigate to a website
  await page.goto("https://google.com");
  
  
  // Close the browser
  await browser.close();
});
```

### start a project:
```
npx playwright test
```

### check reports:
```
  npx playwright show-report
```
