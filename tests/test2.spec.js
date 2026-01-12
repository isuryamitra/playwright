import {expect, test} from '@playwright/test';

test('All Webelements',async({page})=>
{
    await page.goto(process.env.APP_URL)
    //await page.getByLabel('Monday').check();
    //await expect(page.getByLabel('Monday')).toBeChecked();

    /*const dialog = page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    })
    await page.getByRole('button',{name:'Simple Alert'}).click();

     const dialog2 = page.once('dialog', async dialog => {
     console.log(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
    })*/
    await page.getByRole('button',{name:'Confirmation Alert'}).click();

    await expect(page.locator(".form-check-input")).toHaveCount(9);

    expect(page.locator('table[name="BookTable"] tbody td', {hasText:/leniu/i})).toHaveCount(4);
})