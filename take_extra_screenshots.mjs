import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // Scroll down to browse section
  await page.evaluate(() => {
    document.querySelector('.main-content').scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: 'C:/Users/NAYANASREE/.gemini/antigravity/brain/d25b8809-632e-47eb-b230-7a81c3888045/screenshot_event_grid.png'
  });

  // Open Details Modal
  await page.locator('.view-details-btn').first().click();
  await page.waitForSelector('.modal-container');
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/NAYANASREE/.gemini/antigravity/brain/d25b8809-632e-47eb-b230-7a81c3888045/screenshot_event_modal.png'
  });

  // Close details modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Open Add Event modal
  await page.click('.add-event-btn');
  await page.waitForSelector('.add-modal-container');
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/NAYANASREE/.gemini/antigravity/brain/d25b8809-632e-47eb-b230-7a81c3888045/screenshot_add_modal.png'
  });

  await browser.close();
  console.log('Extra screenshots captured successfully!');
}

capture().catch(console.error);
