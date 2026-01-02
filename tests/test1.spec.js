import { test, expect } from '@playwright/test';
import screenshotDesktop from 'screenshot-desktop';

test('AutomationPractice — radio selection and screenshots', async ({ page }) => {
  // Navigate to the sample page used across demos in this repo
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //need to maximize the window after browser is opening
    await page.setViewportSize({ width: 1920, height: 1080 });

  // Select radio2 and assert it is checked (project commonly uses these selectors)
  const radio2 = page.locator("input[value='radio2']");
  await radio2.check();
  await expect(radio2).toBeChecked();

  // Log the first label text for quick debugging in CI logs
  const firstLabel = await page.locator('label').first().textContent();
  console.log('First label text:', firstLabel);
//replace below locator that should not have text but a generic row selector    
//how to iterate to all rows and columns and print values




  const smithRow = page.locator('#product tbody tr').nth(8);
  const smithRowText = await smithRow.textContent();
  console.log('Smith row values:', smithRowText?.trim());   
  // Save a page screenshot into the configured output directory
  const pageShot = `./test-results/page-${Date.now()}.png`;
  await page.screenshot({ path: pageShot, fullPage: true });

  // Try to capture a desktop screenshot as an additional artifact (optional)
  const desktopShot = `./test-results/desktop-${Date.now()}.png`;
  try {
    await screenshotDesktop({ filename: desktopShot });
    console.log('Saved desktop screenshot to', desktopShot);
  } catch (err) {
    console.warn('desktop screenshot failed:', err?.message ?? err);
  }
});


test('Test 2 ', async ({ page }) => {
  // Navigate to the sample page used across demos in this repo
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //need to maximize the window after browser is opening
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.selectOption('#dropdown-class-example', 'option2');
    const dropdown = page.locator('#dropdown-class-example');
    await expect(dropdown).toHaveValue('option2');
    const checkk = await dropdown.filter({ hasText: 'Option3' }).count();
    console.log('Option3 is present:', checkk > 0); 
    const checkboxval = await page.locator('#checkbox-example fieldset label').filter({ hasText: ' Option2 ' }).count();
    console.log('Option2 checkbox is present:', checkboxval > 0); 
    await page.locator('#checkbox-example fieldset label input').last().check();
    await page.waitForTimeout(3000);
    await page.locator('fieldset input[id="name"]').click()
    await page.locator('fieldset input[id="name"]').fill('TestUser');
    const val = await page.locator('fieldset input[id="name"]').inputValue();
    console.log('Input field value:', val);
    await page.waitForTimeout(3000);
} );
test.skip('Test 3 ', async ({ page }) => {
  // Navigate to the sample page used across demos in this repo
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
});
test.fixme('Test 4 ', async ({ page }) => {
  // Navigate to the sample page used across demos in this repo
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
});