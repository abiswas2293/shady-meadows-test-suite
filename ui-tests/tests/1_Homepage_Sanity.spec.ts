import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";

const HOMEPAGE_URL = 'https://automationintesting.online/';

test.describe('@homepage @sanity Test : Homepage Validation', () => {
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
    });

    test('Verify Homepage Elements and Contact Form', async ({ page }) => {

        //Navigate to the home page
        await test.step('Navigate to Homepage', async () => {
            await page.goto(HOMEPAGE_URL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(HOMEPAGE_URL);
            await homepage.waitForHomepageToLoad();
        });

        // Assert that the "Contact" form is visible.
        await test.step('Verify Contact Form Title is "Send Us a Message"', async () => {
            const verifyTitle: string = await homepage.get_Contact_Form_Title();
            expect(verifyTitle).toBe('Send Us a Message');
        });


        await test.step('Verify Contact Form elements are visible and interactable', async () => {
            await homepage.verify_contact_form_elements_are_visible_and_interactable();
        });

        // Verify that the "Book this room" buttons are present for the listed room types.
        await test.step('Verify all listed rooms have a visible and enabled "Book Now" button', async () => {
            await homepage.verify_Book_this_room_button_is_visible_for_all_listed_rooms();
        });
    });
});