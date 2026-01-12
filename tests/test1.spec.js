import { test, expect } from '@playwright/test';
import screenshotDesktop from 'screenshot-desktop';
import PropertiesReader from 'properties-reader';
import path from 'path';
import exceljs from 'exceljs';
const properties = PropertiesReader(path.join(__dirname, '../tests/config.properties'));
// Access properties like this:
const appUrl = properties.get('url') || 'https://rahulshettyacademy.com/AutomationPractice/';

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

test('Test 5 ', async ({ page }) => {
  // Navigate to the sample page used across demos in this repo

  await page.goto(appUrl);
  await expect(page.getByText('Name:')).toBeVisible();
  await page.getByPlaceholder('Enter Name').fill('TestUser5'); 
  await expect(page.getByPlaceholder('Enter Name')).toHaveValue('TestUser5');
  await expect(page.locator('.widget-content li')).toHaveCount(12);
  const a = await page.locator('#HTML15 h2.title').textContent();
  console.log('Widget title text:', a?.trim());
  const b = await page.locator('#HTML15 h2.title').innerText();
  console.log('Widget title innerText:', b?.trim());
  await page.getByRole('button',{name:'Point Me'}).hover();
  await page.waitForTimeout(3000);  
  const table = page.locator("//table[@name='BookTable']").locator('td');


const javaCell = table.filter({ hasText: /^Java$/i });
await expect(javaCell).toHaveCount(2);
const partialCell = table.filter({ hasText: /earn Ja/ });
await expect(partialCell).toHaveCount(1);
const value = await page.locator('.widget-content  input#field1').inputValue();
await page.locator('.widget-content  input#field2').fill('TestValue');
  console.log('Input field type attribute:', value); 
  console.log(await page.locator('.widget-content  input#field2').inputValue());
  page.on('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.accept();
});
await page.locator('button[id="alertBtn"]').click();
});

test('Autosuggestive',async({page}) =>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.getByPlaceholder('Type to Select Countries').click()
  await page.getByPlaceholder('Type to Select Countries').fill('India');
  const a = 'India'
  const value = page.locator('.ui-menu-item div').filter({ hasText: a })
  await expect(value).toHaveCount(2);
  await value.click();
  console.log( await page.getByPlaceholder('Type to Select Countries').inputValue());
})

test('Read excel file data',async({page}) =>{

  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(path.join(__dirname, '../tests/testdataExcel.xlsx'));
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.eachRow((row, rowNumber) => {
      const values = row.values.slice(1); // remove index 0
      console.log(`Row ${rowNumber}:`, values);
  });
})  
test('Handle multiple tabs',async({page}) =>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByText('Open Tab').click()
  ]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/qaclicka/);
}) 
