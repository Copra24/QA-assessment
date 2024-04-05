exports.SignupPage =
class SignupPage {

    constructor(page){
        this.page = page;
        this.firstName = "#firstName"
        this.lastName = "#lastName"
        this.userEmail = "#email"
        this.userpassword = "#password"
        this.userConfirmPassword = "#confirmPassword"
        this.userDob = "#dob"
        this.phoneNumber = "#phone"
        this.userAddress = "#address"
        this.linkedinUrl = "#linkedIn"
        this.githubUrl = "#github"
        this.submitButton = "//input[@value='Submit']"
        this.maleGender = "#male"
        this.femaleGender = "#female"
        this.preferNotToSayGender = "#preferNotToSay"
    }
    async First_Name(FirstName){
        await this.page.locator(this.firstName).fill(FirstName)

    }
    async Last_Name(LastName){
        await this.page.locator(this.lastName).fill(LastName)
        

    }
    async Email(Email){
        await this.page.locator(this.userEmail).fill(Email)

    }
    async Password(password){
        await this.page.locator(this.userpassword).fill(password)

    }
    async Confirm_Password(confirmPassword){
        await this.page.locator(this.userConfirmPassword).fill(confirmPassword)

    }
    async Gender(){
        await this.page.locator(this.maleGender).click()

    }
    async DOB(Dob){
     await this.page.locator(this.userDob).click()
     await this.page.locator(this.userDob).type(Dob);
    

    }
    async Phone_Number(phoneNumber){
        await this.page.locator(this.phoneNumber).fill(phoneNumber)

    }
    async Address(address){
        await this.page.locator(this.userAddress).fill(address)

    }
    async linkedin_Url(linkedinUrl){
        await this.page.locator(this.linkedinUrl).fill(linkedinUrl)

    }
    async Github_Url(githubUrl){
        await this.page.locator(this.githubUrl).fill(githubUrl)

    }
    async Submit_Button(){
        await this.page.locator(this.submitButton).click()

    }
    
    //Method to sigup with all fieds filled out with valid input
    async Signup(FirstName, LastName, Email, password, confirmPassword, Dob, phoneNumber, address, linkedinUrl, githubUrl){
        //Entes first name
        await this.page.locator(this.firstName).fill(FirstName)

        //Entes last name
        await this.page.locator(this.lastName).fill(LastName)

        //Enters Email
        await this.page.locator(this.userEmail).fill(Email)

        //Enters password
        await this.page.locator(this.userpassword).fill(password)

        //Enters Confirm password
        await this.page.locator(this.userConfirmPassword).fill(confirmPassword)

       //Checks the male gender button
        await this.page.locator(this.maleGender).click()

       //Clicks on the dob input field
        await this.page.locator(this.userDob).click();

       //Entes the date of birth
        await this.page.locator(this.userDob).type(Dob);

       //Enters phone number
         await this.page.locator(this.phoneNumber).fill(phoneNumber)

       //Enters Address
         await this.page.locator(this.userAddress).fill(address)

       //Enters linkedin Url
        await this.page.locator(this.linkedinUrl).fill(linkedinUrl)

      //Enters github Url
        await this.page.locator(this.githubUrl).fill(githubUrl)

      //Clicks on submit button
        await this.page.locator(this.submitButton).click()

    }
    
    //Method to signup with all mandatory fiedls filled out
    async mandatoryFields(FirstName, LastName, email, password, confirmPassword, linkedinUrl){
        await this.page.locator(this.firstName).fill(FirstName)
        await this.page.locator(this.lastName).fill(LastName)
        await this.page.locator(this.userEmail).fill(email)
        await this.page.locator(this.userpassword).fill(password)
        await this.page.locator(this.userConfirmPassword).fill(confirmPassword)
     //   await this.page.locator(this.linkedinUrl).fill(linkedinUrl)
        await this.page.locator(this.submitButton).click()

    }



}