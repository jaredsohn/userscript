// ==UserScript==
// @name          Cam4 Highlighter
// @description   Highlights users from defined countries on cam4.com based on the script from polarfuchs1
// @include       http://www.cam4.com/
// @include       http://www.cam4.com/featured
// @include       http://www.cam4.com/recent
// @include       http://www.cam4.com/female
// @include       http://www.cam4.com/male
// @include       http://www.cam4.com/couple
// @include       http://www.cam4.com/shemale
// @include       http://www.cam4.com/party
// @include       http://www.cam4.com/couple
// ==/UserScript==

// Highlighted countries
var hlCountries = "Austria,Germany,Switzerland";

// Highlighting color
var hlColor = "#FEECC8";

// Variables used
var allUsers, thisUser, arrCountries, thisCountry;

hlCountries = hlCountries.replace(" ","");
arrCountries = hlCountries.split(",");

allUsers = document.getElementsByClassName('profileBox');

for (var i = 0; i < allUsers.length; i++) {
  thisUser    = allUsers[i];
  thisUsersCountry = getUserCountry(thisUser);

  for (var j = 0; j < arrCountries.length; j++) {
    if (thisUsersCountry == arrCountries[j] ) {
      thisUser.style.backgroundColor = hlColor;
    }
  }
}

// Functions
function getUserCountry(user) {
  // Returns the country indicated by the flag
  return user.getElementsByClassName('country').item(0).firstChild.title;
}

// End of script