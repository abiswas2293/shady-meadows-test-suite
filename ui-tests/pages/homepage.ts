

import { Page, expect } from '@playwright/test';

type Room = {
  name: string;
  price: number;
  features: string[];
};

export class Homepage {

  private send_us_message_heading = 'Send Us a Message';

  constructor(private page: Page) {
  }


  async get_Homepage_Title(): Promise<string> {
    return await this.page.title();
  }


async waitForHomepageToLoad(): Promise<void> {

    await expect(
        this.page.getByText(this.send_us_message_heading)).toBeVisible();
}

  async get_Contact_Form_Title(): Promise<string> {
    const headingLocator = this.page.getByText(this.send_us_message_heading);
    return await headingLocator.textContent() || '';
  }


  async verify_contact_form_elements_are_visible_and_interactable(): Promise<void> {
    const formFields = ["Name", "Email", "Phone", "Subject", "Message"];

    console.log("Verifying Form labels and input boxes");

    // verify labels
    for (const field of formFields) {

      const label = this.page.locator('label', { hasText: field });

      await expect(label).toBeVisible();
      await expect(label).toHaveText(field);

      let input;

      if (field === "Message") {
        input = this.page.getByTestId('ContactDescription');
      } else {
        input = this.page.getByLabel(field);
      }

      // Now verify input boxes

      await expect(input).toBeVisible();
      await expect(input).toBeEnabled();

      console.log(`${field} label and input field verified`);
    }

    // Verify Submit Button
    await expect(
      this.page.getByRole('button', { name: 'Submit' })
    ).toBeEnabled();

    console.log('Submit button - Enabled');
    console.log('All form fields and labels verified successfully!');
  }


  async verify_Book_this_room_button_is_visible_for_all_listed_rooms(): Promise<void> {
    const roomCards = this.page.locator('.room-card');

    await expect(roomCards.first(), 'waiting for room cards to load on the page').toBeVisible();

    const allRooms = await roomCards.all();
    expect(allRooms.length, 'No rooms were found on the homepage').toBeGreaterThan(0);

    for (let i = 0; i < allRooms.length; i++) {
      const room = allRooms[i];
      const bookNowButton = room.getByRole('link', { name: 'Book now', exact: true });

      await expect(bookNowButton, 'Room card at index ${i} is missing a visible Book now button').toBeVisible();
      await expect(bookNowButton, 'The Book now button at index ${i} is disabled').toBeEnabled();

      console.log(`Room ${i + 1} has a valid "Book Now" button`);
    }
  }



  async click_on_Admin_button(): Promise<void> {
    const adminButton = this.page.getByRole('link', { name: 'Admin', exact: true });
    await expect(adminButton).toHaveText('Admin');
    await expect(adminButton).toBeEnabled();
    await adminButton.click();
  }




  async getHomepageRooms(): Promise<Room[]> {
    const cards = this.page.locator('.room-card');

    const count = await cards.count();

    const rooms: Room[] = [];

    for (let i = 0; i < count; i++) {

      const card = cards.nth(i);

      const name = await card.locator('h5.card-title').textContent();

      const priceText = await card.locator('.fw-bold.fs-5').textContent();

      const numericPrice = priceText?.replace(/\D/g, '') ?? '0';
      const price = Number(numericPrice);

      const featureTexts = await card.locator('.badge').allTextContents();

      rooms.push({
        name: name?.trim() || '',
        price,
        features: featureTexts.map(f => f.trim())
      });
    }

     console.log('Homepage Rooms:', rooms);
    return rooms;
  }

}