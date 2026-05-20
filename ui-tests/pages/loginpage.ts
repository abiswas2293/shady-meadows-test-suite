import { Page, expect } from '@playwright/test';

export class LoginPage {

       constructor(private page: Page) {
    }


    async verify_user_is_on_Login_page(): Promise<void> {
        const loginHeading = this.page.getByRole('heading', {name: 'Login',exact: true});
        await expect(loginHeading).toBeVisible();
    }


async fill_Login_form(user: string, pass: string): Promise<void>{

 const formFields = ["Username", "Password"];

 for (const field of formFields) {

      // Locate label
      const label = this.page.locator('label', { hasText: field });

      await expect(label).toBeVisible();
      await expect(label).toHaveText(field);
      const input = this.page.getByLabel(field);

          // Verify input boxes
      await expect(input).toBeEnabled();
      await input.clear();

      if(field === "Username"){
        await input.fill(user);
      }
      else if(field==="Password"){
        await input.fill(pass);
      }
    }

}



async click_on_submit_button(): Promise<void>{
     const submitButton = this.page.getByRole('button', { name: 'Login' });
     await expect(submitButton).toBeEnabled();
     await submitButton.click();
}

}