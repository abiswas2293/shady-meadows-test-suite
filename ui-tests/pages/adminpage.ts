import { Page, expect } from '@playwright/test';
import { Homepage } from "../pages/homepage";

export class AdminPage {

    constructor(private page: Page) {
    }



    async verify_user_is_on_Admin_page(): Promise<void> {
        const formFields = ["Rooms", "Report", "Branding", "Messages"];

        for (const field of formFields) {
            const link = this.page.getByRole('link', { name: field });
            await expect(link).toBeEnabled();
        }

    }



    async verify_logout_button_is_displayed(): Promise<void> {
        const logoutButton = this.page.getByRole('button', { name: 'Logout', exact: true });
        await expect(logoutButton).toBeEnabled();

    }



    async getAdminRooms(): Promise<any[]> {

        const rows = this.page.locator('[data-testid="roomlisting"]');

        await expect(rows.first()).toBeVisible();

        const count = await rows.count();

        const rooms = [];

        for (let i = 0; i < count; i++) {

            const row = rows.nth(i);

            const type = (await row.locator('[id^="type"]').innerText()).trim();
            const price = Number((await row.locator('[id^="roomPrice"]').innerText()).trim());

            const detailsText = (await row.locator('[id^="details"]').innerText()).trim();
            const features = detailsText.split(',').map(f => f.trim());

            rooms.push({
                name: type,
                price,
                features
            });
        }

        return rooms;
    }


    async verify_rooms_match_between_homepage_and_admin(listOfRooms: any[]): Promise<void> {

        const adminRooms = await this.getAdminRooms();


        console.log('Admin Rooms:', adminRooms);

        for (const homeRoom of listOfRooms) {

            const match = adminRooms.find(r => {

                const sameName =
                    r.name.trim() === homeRoom.name.trim();

                const samePrice =
                    r.price === homeRoom.price;

                const sameFeatures =
                    r.features.sort().join(',')
                    === homeRoom.features.sort().join(',');

                return sameName && samePrice && sameFeatures;
            });

            expect(match).toBeDefined();

            expect(match!.price).toBe(homeRoom.price);

            expect(match!.features.sort()).toEqual(homeRoom.features.sort());
        }
    }

}