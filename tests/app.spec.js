import { test, expect } from '@playwright/test';

test('app loads successfully', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if the page is not just a white screen
  // Look for any content or wait for a specific element
  await page.waitForTimeout(2000); // Give it time to render
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'test-results/app-loaded.png' });
  
  // Check if there's any content
  const body = await page.locator('body').innerHTML();
  console.log('Page content length:', body.length);
  
  // The page should have some content (not just empty)
  expect(body.length).toBeGreaterThan(100);
});