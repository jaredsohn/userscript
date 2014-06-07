// ==UserScript==
// @name        msft blackfridaydeals bot#1
// @namespace   http://freaknetswag.com
// @include     http://www.blackfridaydealsdash.com/Default.aspx
// @version     1
// @grant       none
// ==/UserScript==
var bot = function(){
var makeId = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for(var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }
var email = "therealfreaknet+" + makeId() + "@gmail.com";
document.getElementById("ContentPlaceHolder1_txtFirstName").value="Darryl"; //fname
document.getElementById("ContentPlaceHolder1_txtLastName").value="Boman"; //lname
document.getElementById("ContentPlaceHolder1_txtZip").value="90010"; //zip
document.getElementById("ContentPlaceHolder1_txtEmailAddress").value=email; //email
document.getElementById("ContentPlaceHolder1_txtPhoneNumber").value="4244801840"; //phone
document.getElementById("ContentPlaceHolder1_chkPromotions").checked=false; //nospamemail
document.getElementById("ContentPlaceHolder1_chkResident").checked=true; //confirmentry
document.getElementById("ContentPlaceHolder1_btnGetStarted").click(); //submit
};
window.setTimeout(bot(), 100);