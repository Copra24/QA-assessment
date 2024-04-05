
const { test, expect } = require('@playwright/test');
import { describe } from 'node:test';
import { SignupPage } from './POM/Signup_Page';





test.beforeEach(async ({ page }) => {
    await page.goto('https://qa-assessment.pages.dev/');
   
    
  
  });


describe('Profile Creation Test Suit', () => {


test('Validating page title and Url', async ({page}) =>{
    await expect(page).toHaveTitle('User Profile Creation');
    await expect(page).toHaveURL('https://qa-assessment.pages.dev/');

})

test('Verifying profile creation when all fields are filled out as required', async ({page}) =>{
  //creates an object of Signup POM page
  const signup = new SignupPage(page);

  await signup.First_Name("John");
  await signup.Last_Name("Smith");
  await signup.Email("john.smith@example.com");
  await signup.Password("P@ssw0rd");
  await signup.Confirm_Password("P@ssw0rd");
  await signup.Gender();
  await signup.DOB("1990/01/01");
  await signup.Phone_Number("1234567890");
  await signup.Address("123 Main St, Apt 1");
  await  signup.linkedin_Url("https://www.linkedin.com/in/johnsmith");
  await signup.Github_Url("https://github.com/johnsmith");
  await signup.Submit_Button();

  await page.waitForTimeout(2000); 
 
  //Retrun value of first name field after form has been submitted
  const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

  //Assert the first name field is cleared after submitting form(verification point)
   expect(firstNameInputBox).toBe("");
  
  
});

test('Verifying if form will submit when just mandatory fields are filled out', async ({page}) =>{

  const signup = new SignupPage(page);
  await signup.mandatoryFields("John", "Smith", "john.smith@example.com", "P@ssw0rd", "P@ssw0rd"); 
 
  // Wait for 2 seconds for the form to submit and reset
  await page.waitForTimeout(2000); 

  //Returns value of input box after submitting form
  const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

  //Asserts the first name input box is cleared after submitting form (verification oint)
  expect(firstNameInputBox).toBe("");

  
  
})

test("Verifying if form will submit when all fields are filled out with the required input but First Name  field is filled out containing alpha numeric values",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('First name must contain alphabetical characters only');
    await dialog.accept();
   })
 

   await signup.Signup("J0hn@", "Smith", "john.smith@example.com", "P@ssw0rd", "P@ssw0rd", "1990/01/01", "1234567890", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

   

})

test("Verifying if form will submit when all fields are filled  out with the required input but Last Name  field is filled out containing alpha numeric values",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Last name must contain alphabetical characters only');
    await dialog.accept();
   })
 

   await signup.Signup("John", "Sm1th@", "john.smith@example.com", "P@ssw0rd", "P@ssw0rd", "1990/01/01", "1234567890", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

   

})

test("Verifying if form will submit when all fields are filled  out with the required input but Email  field is filled out with invalid email format",  async ({page}) =>{
  const signup = new SignupPage(page);
 
   await signup.Signup("John", "Smith", "john.smithexample.com", "P@ssw0rd", "P@ssw0rd", "1990/01/01", "1234567890", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

   //Waits for the page to reset after submitting form
   await page.waitForTimeout(2000); 

  //Returns value of input box after submitting form
  const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

  //Asserts the first name input box is cleared after submitting form (verification oint)
  expect(firstNameInputBox).toContain("John");
   

})

test("Verifying if form will submit when fields are filled out as requied but  invalid date is inputted", async ({page}) =>{
  const signup = new SignupPage(page);

  await signup.Signup("John", "Smith", "john.smith@example.com", "P@ssw0rd", "P@ssw0rd", "1990/02/30", "1234567890", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

  //Waits for the page to reset after submitting form
  await page.waitForTimeout(2000); 

  //Returns value of input box after submitting form
  const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

  //Asserts the first name input box is cleared after submitting form (verification oint)
  expect(firstNameInputBox).toContain("John");



//   // Wait for the validation message element to appear
// const validationMessageElement = await page.waitForSelector(signup.userEmail);

// // Get the text content of the validation message element
// const validationMessage = await validationMessageElement.innerText();

// // Assert that the validation message contains the expected substring
// expect(validationMessage).toContain("Please include an '@' in the email address");


// // Listen for console messages
// page.on('console', async (message) => {
//   if (message.type() === 'error') {
//       const errorMessage = message.text();
//       // Check if the error message contains information about the hidden focus class
//       if (errorMessage.includes('Please enter a valid value. The field is incomplete or has an invalid date')) {
//           // Handle the error message here
//           console.error('Error message:', errorMessage);
          
//       }
//   }
// });

})




test("Verifying if form will submit when Password and Confirm password do not match while all other fields are filled with required input",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Passwords do not match');
    await dialog.accept();
   })

   await signup.Signup("John", "Smith", "john.smith@example.com", "P@ssw0rd", "P@ssw", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

   

})


test("Verifying if form will submit when all fields are filled as required but First name field is left Blank",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('First name must be filled out');
    await dialog.accept();
   })

   await signup.Signup("", "Smith", "john.smith@example.com", "P@ssw0rd", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");


})





test("Verifying if form will submit when all fields are filled out as required but  Last name field is left Blank",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Last name must be filled out');
    await dialog.accept();
   })

   await signup.Signup("John", "", "john.smith@example.com", "P@ssw0rd", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

  
})



test("Verifying if form will submit when Email field is left Blank while all other fields are filled out as required",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Email must be filled out');
    await dialog.accept();
   })
  
   await signup.Signup("John", "Smith", "", "P@ssw0rd", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

     

})


test("Verifying if form will submit when Password and Confirm password fields are left Blank while all other fields are filled out as required",  async ({page}) =>{
  const signup = new SignupPage(page);

  //Enabling alert handling
  page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Confirm password must be filled out');
    await dialog.accept();
   })
  
   await signup.Signup("John", "Smith", "john.smith@example.com", "", "", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", "https://github.com/johnsmith");

     

})



test("Verifying if form will submit when linkedin field is left blank while other fields are filled out",  async ({page}) =>{
  const signup = new SignupPage(page);
  
   await signup.Signup("John", "Smith", "john.smith@example.com", "P@ssword", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "", "https://github.com/johnsmith");

   //Waits for the page to reset after submitting form
await page.waitForTimeout(2000); 

      //Returns value of input box after submitting form
  const lastNameInputBox = await page.$eval(signup.lastName, input => input.value);

  //Asserts the first name input box is cleared after submitting form (verification oint)
  expect(lastNameInputBox).toBe("");


})


test("Verifying if form will submit when github field is left blank while other fields are filled out",  async ({page}) =>{
  const signup = new SignupPage(page);
  
//await signup.Signup("John", "Smith", "john.smith@example.com", "P@ssword", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", " ");

await signup.First_Name("John");
await signup.Last_Name("Smith");
await signup.Email("john.smith@example.com");
await signup.Password("P@ssw0rd");
await signup.Confirm_Password("P@ssw0rd");
await signup.Gender();
await signup.DOB("1990/01/01");
await signup.Phone_Number("1234567890");
await signup.Address("123 Main St, Apt 1");
await  signup.linkedin_Url("https://www.linkedin.com/in/johnsmith");
await signup.Github_Url("");
await signup.Submit_Button();

//Waits for the page to reset after submitting form
await page.waitForTimeout(2000); 

//Retrun value of first name field after form has been submitted
const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

//Assert the first name field is cleared after submitting form(verification point)
 expect(firstNameInputBox).toBe("");
})



test("Verifying if form will submit when Address field is left blank while other fields are filled out",  async ({page}) =>{
  const signup = new SignupPage(page);
  
//await signup.Signup("John", "Smith", "john.smith@example.com", "P@ssword", "P@ssword", "1990/01/01", "123456789012", "123 Main St, Apt 1", "https://www.linkedin.com/in/johnsmith", " ");

await signup.First_Name("John");
await signup.Last_Name("Smith");
await signup.Email("john.smith@example.com");
await signup.Password("P@ssw0rd");
await signup.Confirm_Password("P@ssw0rd");
await signup.Gender();
await signup.DOB("1990/01/01");
await signup.Phone_Number("1234567890");
await signup.Address("");
await  signup.linkedin_Url("https://www.linkedin.com/in/johnsmith");
await signup.Github_Url("https://github.com/johnsmith");
await signup.Submit_Button();

//Waits for the page to reset after submitting form
await page.waitForTimeout(2000); 

//Retrun value of first name field after form has been submitted
const firstNameInputBox = await page.$eval(signup.firstName, input => input.value);

//Assert the first name field is cleared after submitting form(verification point)
 expect(firstNameInputBox).toBe("");
})





})

