// @name           Yahoo Automatic Login
// @namespace      Christian Blackburn's
// @description    This script avoids having to type your password into the ever annoying Yahoo Login screen for e-mail, groups, calendar and everything else :)
// @include        *yahoo.com*

/* 
To Do List
1.  make sure e-mails are valid
2.  make sure that the inputted password matches yahoo's security requirements
3.  allow user to set password from actual login fields
4.  IE Support vs. AddListener
5.  Older DOM model Support vs. AddListener
6.  Support the lack of GM_getValue & GM_setValue
7.  Manually add a default option where it goes straight to your inbox "[X] go directly to inbox" or "[ ] go directly to inbox"
8.  Remove <div class="first">... <div class="last"> sidebar advertising (getNextSibling, getPreviousSibling, getElementById(spanId).getAttribute('id'))
9.  Get rid of the ads in the calendar
10.  Add a boolean function that will either turn all the ads off or on
*/

//stores the date and time the code was last revised:
var revised = "2007/05/27 4:00 PM";

//Stores the user's e-mail address 
var email_address = "";

//Stores the user's password
var password = "";

//used in e-mail verification
var email_address2 = "";

//used to verify the password
var password2 = "";

//automatically clicks the sign out link
function SignOut()
{
    //creates an array of all hyperlinks in the current page
    var links = document.getElementsByTagName("A");
    
    //creates the holder for the text description of the current link
    var link_text = "";
    
    //creates the holder for the url (href) of the current link
    var link_url = "";

    // cycles through each link on the page
    for (var i = 0; i < links.length; i++) 
    {
    
        //captures the text description of the current link
        link_text = links[i].text; 
        
        //if the link reads "Sign Out" then
        if (link_text == "Sign Out")
        {
            //determines the URL associated with the sign out link
            link_url = links[i].href;
            
            //if the link points to the login portion of yahoo's website then...
            if (link_url.indexOf("login.yahoo.com", 0) != -1)
            {
                //we load the Sign Out URL in the current window
                document.location.href = link_url;
            
                //report that we signed out
                return true;
            }
        }
    }
    
    //reports that we didn't sign out! (or that no "Sign Out" link was found)
    return false;
    
}


//Returns to a previously used yahoo service after having just logged out of it-
function ReturnTo()
{
    //creates an array of all the hyperlinks on the page
    var links = document.getElementsByTagName("A");
    
    //stores the text associated with a link <a>Text</a>
    var link_text = "";
    
    //stores the URL associated with a link <a href="URL">
    var link_url = "";

    //cycles through each hyperlink on the page
    for (var i = 0; i < links.length; i++) {
    
        //stores the text of the current link
        link_text = links[i].text;         
        
        //trims the text of the link to the first 9 characters
        link_text = link_text.substring(0,9);
        
        //if the link starts with Return to then...
        if (link_text == "Return to" || link_text == "Re-login ")
        {
            //stores URL of the link            
            link_url = links[i].href;
            
            //if the url contains yahoo.com then...
            if (link_url.indexOf("yahoo.com", 0) != -1)
            {
            
                //we load the url of the link returning to some yahoo service
                document.location.href = link_url;
            
                //reports that we signed in
                return true;
            }
        }
    }
    
    //reports that we weren't able to return to a service (or that no "Return to" link was found)
    return false;
}

//Removes the advertising banners from yahoo mail and possibly other areas
function KillBanner()
{
    //locates and stores the <div class="northbanner"></div> tag
    var north_banner = document.getElementById('northbanner');
    
    //if the ad. banner is found then...
    if (north_banner) 
    {
        //removes the ad. banner
        north_banner.parentNode.removeChild(north_banner);
    }
}

//signs the user into yahoo.com
function SignIn()
{
    //creates an array of all links on the current page
    var links = document.getElementsByTagName("A");
    
    //stores the text of the current link in the array
    var link_text = "";
    
    //stores the url of the current link in the array
    var link_url = "";

    //cycles through each link on the page
    for (var i = 0; i < links.length; i++) {
    
        //stores the text of the current link
        link_text = links[i].text; 
        
        //if the text is "Sign In" then...
        if (link_text == "Sign In")
        {
        
            //stores the URL of the Sign In link           
            link_url = links[i].href;
            
            //if the URL is actually a sign in link for yahoo.com then...
            if (link_url.indexOf("yahoo.com/r/", 0) != -1 || link_url.indexOf("login.yahoo.com", 0) != -1)
            {
                //we load the "Sign In" URL thereby signing in
                document.location.href = link_url;
            
                //reports that we signed in
                return true;
            }
        }
    }
    
    //reports that we didn't sign in (or that no "Sign In" link could be found)
    return false;
}

//determines whether or not the user is currently at a login page
function IsLoginPage()
{

    //stores the URL of the current page
    var URL = document.location.href;

    //extracts the first 23 characters of the URL
    URL = URL.substring(0, 23);

    //converts the url to UPPER CASE
    URL = URL.toUpperCase();

    //if the url is that of the login page then...
    if (URL == "HTTPS://LOGIN.YAHOO.COM")
    {
        //Reports that we are at a login page    
        return true;
    }
    //if the url isn't that of a login page then...
    else
    {
        //reports that we aren't at a login page
        return false;
    }
}


//determines whether a variable or control value is empty ("" or null)
function EmptyInput(variable)
{
    //if the input variable is an empty string or null then...
    if (variable == "" || variable == null) 
    {
        //return true that the item is empty
        return true;
    }
    //if the item isn't an empty string nor null then...
    else
    {
        //report that the item isn't empty
        return false;
    }
}


//allows the user to set their loging information either when it doesn't exist or when it needs to be changed (from the Greasemonkey menu)
function SetLoginInformation() 
{
    //clears the e-mail and password to allow the looping logic below to work properly
    email_address = "";
    password = "";

    //so long as the email address typed is blank or there isn't one file...
    while (email_address == "")
    {
        //so long as the user doesn't enter a password or none has been entered...
        while (EmptyInput(email_address))
        {    
            //asks the user for their e-mail address
            email_address = prompt("E-mail Address:", "");
        }
        
        //so long as the user doesn't verify their password or none has been entered...
        while (EmptyInput(email_address2))
        {    
            //asks the user for their e-mail address
            email_address2 = prompt("Verify E-mail Address:", "");
        
        }
        
        //if the initial password and verification one don't match then...
        if (email_address != email_address2)
        {
            //we clear the e-mail address so the user will have to enter their e-mail twice, yet again
            email_address = "";
        }
        //if both e-mails match then...
        else
        {
            //we save the e-mail address for future use
            GM_setValue("email_address", email_address);
        }
    }

    //so long as the user's passwords don't or are empty
    while (password == "")
    {
        //so long as the user doesn't type in a password 
        while (EmptyInput(password))
        {    
            //asks the user for their password
            password = prompt("Password:", "");
        
        }
        
        //so long as the user doesn't verify their password
        while (EmptyInput(password2))
        {    
            //asks the user for their password
            password2 = prompt("Verify Password:", "");
        
        }
        
        // if the two passwords don't match then...
        if (password != password2)
        {
            //we clear the password so they'll have to type it twice all over again
            password = "";
        }
        //if the two passwords do match then...
        else
        {
            //we save the password for future use
            GM_setValue("password", password);
        }
        
    }
}

//Calls the setlogininformation function telling it that it's been called from a menu
function ResetLoginInformation()
{	
    //asks the user if they're sure they want to change their login information
	var response = confirm("Are you sure you want to change your e-mail address and or password?");
	
    //if the user agrees to change their e-mail and or password then...
    if (response == true)
    {
        //Prompts the user for their e-mail and password (and tries logging in again if they're on the login page)
        SetLoginInformation();
        
        //if the user is already at a login page then...
        if (IsLoginPage() == true)
        {

            //enters the user name and password automatically, while checking the remember me box and clicking submit
            Automate();
        }
        //if the user isn't at the login page we'll try signing them out
        else
        {
            //if it isn't possible to sign out then...
            if (SignOut() == false) 
            {
                //if a "Return to..." link is found login otherwise... 
                if (ReturnTo() == false)
                {
                	//Try Signing in
                	SignIn();
            	}
            }
        }
    }
}

//enters the user name and password automatically, while checking the remember me box and clicking submit
function Automate()
{
    //tells the Automation function to submit immediately at the end of filling out the fields
    var submit_now = false;
    
    //if the password field exists then...
    if (document.forms[0].elements.namedItem("passwd")) 
    {   
        //Enters your password
        document.forms[0].elements.namedItem("passwd").value = password;
        
        //if the page contains a captcha then..
        if (document.forms[0].elements.namedItem(".secword"))
        {
            //if the user hasn't already typed in a value for the captcha
            if (EmptyInput(document.forms[0].elements.namedItem(".secword").value))
            {
            
                //let's the user know we can't login automatically
                alert("Dear User,\n\nBecause this page contains a captcha (picture a computer can\'t recognize) you\'ll have to answer the captcha and click [Sign In] yourself.\n\nThanks,\nChristian Blackburn\nYahoo Automatic Login Author");
                
                //Places focus on the captcha text line
                window.addEventListener("load", function() {document.forms[0].elements.namedItem(".secword").focus();}, false);
            }
            //if the user has typed in a value for the captcha then...
            else
            {
                //tells the Automation function to submit immediately at the end of filling out the fields
                submit_now = true;
            }
        }
        else
        {
            //Tells your browser to submit the form once the page loads
            window.addEventListener("load", function() {document.forms[0].submit();}, false);
        }
    }
    
    //If the remember me for 2 weeks checkbox is visible then...
    if (document.forms[0].elements.namedItem(".persistent")) 
    {   
        //checks the box so this script will have to run as little as possible
        document.forms[0].elements.namedItem(".persistent").checked = true;
    }

    //If the user name field exists (sometimes this isn't present)
    if (document.forms[0].elements.namedItem("username")) 
    {   
        //enters your e-mail address
        document.forms[0].elements.namedItem("username").value = email_address;
    }
 
    //if the automation should submit immediately then...
    if (submit_now == true) 
    {
        //forces a submission now
        document.forms[0].submit();
    }   
}

// Displays a Help\About style message box
function About()
{
    //let's the user know the name of the program, the revision date, the author's name and whereabouts
    alert("Title: Yahoo Automatic Login \n Revised: " + revised + " \n Author: Christian Blackburn \n Location: Sacramento, CA (USA) \n \n Happy Yahooing!");
}

//Start functional page code!

//if the url is that of a login page then...
if (IsLoginPage() == true) 
{
    //tries loading the e-mail address from the user's Greasemonkey cookies
    email_address = GM_getValue("email_address", "");

    //tries loading the password from the user's Greasemonkey cookies
    password = GM_getValue("password", "");

    //If there's no record of previous login information then...
    if (email_address == "" || password == "") 
    {
        
        //Set's the user's login information
        SetLoginInformation();
    }
    
    //enters the user name and password automatically, while checking the remember me box and clicking submit
    Automate();

}
//if we aren't at the login page then...
else
{    
    //if a "Return to..." link is found login otherwise...  
    if (ReturnTo() == false)
    {
        //try signing in
        SignIn();
    }
}

//if it even exists removes the ad banner
KillBanner();
    
//if the GM_registerMenuCommand exists in this version of GreaseMonkey then...    
if (GM_registerMenuCommand) 
{
    //add the menu item to adjust the user's login information
    GM_registerMenuCommand("Yahoo Automatic Login - Change Credentials", ResetLoginInformation);
    
    //adds a help\about style program information dialog:
    GM_registerMenuCommand("Yahoo Automatic Login - About", About);
}