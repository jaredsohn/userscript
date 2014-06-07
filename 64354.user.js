// ==UserScript==
// @name           Cam4 Highlighter
// @description	   Highlights users from defined countries on cam4.com
// @include        http://*cam4.com/*
// ==/UserScript==



// USERSCRIPT SETTINGS
// CHANGE SETTINGS IN THIS SECTION


// Highlighted countries
var hlCountries = "Austria,Germany,Switzerland";

// Highlighting color
var hlColor = "#FEECC8";


// USERSCRIPT SETTINGS END



var allUsers, thisUser, arrCountries;

hlCountries = hlCountries.replace(" ","");
arrCountries = hlCountries.split(",");
allUsers = document.getElementsByClassName('country');

for (var i = 0; i < allUsers.length; i++) {
  thisUser = allUsers[i];
  
  for (var j = 0; j < arrCountries.length; j++) {
    if (thisUser.innerHTML.search(arrCountries[j]) != -1) {
      thisUser = getUserBox(thisUser);
      thisUser.style.backgroundColor = hlColor;
    }
  }
}

function getUserBox(user) {
  for (var i = 0; i < 4; i++) {
    user = user.parentNode;
  }
  return user;
}