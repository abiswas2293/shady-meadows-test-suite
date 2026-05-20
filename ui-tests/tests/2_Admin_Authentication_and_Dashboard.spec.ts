import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginpage";
import { AdminPage } from "../pages/adminpage";

const HOMEPAGE_URL = 'https://automationintesting.online/';

test.describe('@admin @sanity Test: Admin Authentication & Dashboard Validation', () => {
    let homepage: Homepage;
    let loginPage: LoginPage;
    let adminPage: AdminPage;
    let roomsFromHomepage: any[] = [];


    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);
    });


    test('Admin flow: login and validate room data consistency', async ({ page }) => {

        //Navigate to the home page
        await test.step('Navigate to Homepage', async () => {
            await page.goto(HOMEPAGE_URL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(HOMEPAGE_URL);
            await page.goto(HOMEPAGE_URL, { waitUntil: 'networkidle' });
            await homepage.waitForHomepageToLoad();
        });

        //Get rooms data from Homepage
        await test.step('Get rooms data from Homepage', async () => {
            roomsFromHomepage = await homepage.getHomepageRooms();
        });

        //Click Admin link from Homepage
        await test.step('Click Admin link from Homepage', async () => {
            await homepage.click_on_Admin_button();
        });


        // Log in via the admin portal
        await test.step('Log in via the admin portal', async () => {
            await loginPage.verify_user_is_on_Login_page();
            await loginPage.fill_Login_form('admin', 'password');
            await loginPage.click_on_submit_button();
        });

        // Assert that you are redirected to the Admin ROOMS Page
        await test.step('Assert that you are redirected to the Admin ROOMS Page', async () => {
            await expect(page).toHaveURL(HOMEPAGE_URL + 'admin/rooms');
            await adminPage.verify_user_is_on_Admin_page();
        });

        // Verify the presence of the "Logout" button.
        await test.step('Verify the presence of the "Logout" button', async () => {
            await adminPage.verify_logout_button_is_displayed();
        });

        // Navigate to the "Rooms" tab within the admin panel and verify a room's details match what you saw on the public homepage.
        await test.step('Navigate to the "Rooms" tab within the admin panel and verify a room details match what you saw on the public homepage.', async () => {
            await adminPage.verify_rooms_match_between_homepage_and_admin(roomsFromHomepage);
        });

    });

}); 