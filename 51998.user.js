// ==UserScript==
// @name           PeopleSoft Auto-Login
// @description    Automatic Login for PeopleSoft.  Replace language links with list of previously-used credentials.  Known to be compatible with PeopleTools versions 8.47 and 8.49, but probably others.
// @include        https://your_peoplesoft_server.com*?cmd=log*
// ==/UserScript==
var cookiesEnabled = false;
var JSONEnabled = false;
var aryCredentials;
var strEnvironment;
var urlRoot = 'http://your_pepoplesoft_server.com/environment_list.htm';

// set up jQuery variable
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
GM_JQ.type = "text/javascript";
document.body.appendChild(GM_JQ);

// Load the JQuery cookie plug-in.
var GM_Cookies = document.createElement("script");
GM_Cookies.src = "http://dev.jquery.com/export/6405/trunk/plugins/cookie/jquery.cookie.min.js";
GM_Cookies.type = "text/javascript";
GM_Cookies.onreadystatechange = function () {
   if (this.readyState == 'complete')
      cookiesReady();
   }
GM_Cookies.onload = cookiesReady();
document.body.appendChild(GM_Cookies);

// Load the JSON parsing object
var GM_JSON = document.createElement("script");
GM_JSON.src = "http://jquery-json.googlecode.com/files/jquery.json-1.3.min.js";
GM_JSON.type = "text/javascript";
GM_JSON.onreadystatechange = function () {
   if (this.readyState == 'complete')
      JSONReady();
   }
GM_JSON.onload = JSONReady();
document.body.appendChild(GM_JSON);

// Check if jQuery's loaded
var checker = setInterval(function() {
   if (typeof ($ = unsafeWindow.jQuery) != "undefined") {
      // JQuery is loaded.  Stop re-checking.
      clearInterval(checker);

      // Wait for cookies to be enabled.
      var loopCookies = setInterval(function() {
         if (cookiesEnabled) {
            // Stop waiting for cookies.
            clearInterval(loopCookies);

            // Wait for JSON to be enabled.
            var loopJSON = setInterval(function() {
               if (JSONEnabled) {
                  // Stop waiting for JSON.
                  clearInterval(loopJSON);
                  // Begin the replacements
                  changeLanguageBox();
               }
            }, 50);
         }
      }, 50);
   }
}, 50);

// All your GM code must be inside this function
function changeLanguageBox() {
   strEnvironment = getEnvironment(top.location);
   aryCredentials = getCredentials(strEnvironment)

   // Change the action when the original submit button is clicked.
   $('input:eq(3)').click(function() {
      return formSubmit();
   });

   var selectALanguage = $('.pslanguageframe .psloginlabel:contains("Select a Language")');
   if (selectALanguage.length > 0) {
      // Tools 8.49 (or compatible)
      // Change the caption from "Select a Language" to "Select a User"
      selectALanguage.text("Select a User:");
      // Turn on the "skpremove" class, so we know which TDs remain.
      $('.pslanguageframe .pslogintext').toggleClass('skpremove');
      $('.pslanguageframe .textnormal').remove();
      // Add each of the saved credentials
      for (var x=0; x<= aryCredentials.length - 1; x++)
         addUser849(aryCredentials[x].username, aryCredentials[x].password);
      // Remove any unused TDs
      $('.pslanguageframe .skpremove').remove();
      // Add a link so the user can clear their saved credentials
      $('.pslanguageframe .psloginlabel:eq(1) table tr:last').html('<td colspan=2><br /><a id=\"clearlink\" href=\"javascript:Clear list of credentials">Clear List</a></td>');
      // Add a link back to the "root" page, listing available environments.
      //$('table:first table:first > tbody > tr:eq(1) td').html('<a href="' + urlRoot + '">Other Instances</a>');
      $('.psmessageframe p.pslogintext a').after('<br /><a href="' + urlRoot + '">Other Instances</a>');
   } else {
      // Tools 8.47 (or compatible)
      selectALanguage = $('table:first tr td table:eq(1) tr td.PSLOGINTEXTBOLD:contains("Select a Language:")');
      if (selectALanguage.length > 0) {
         // Change the caption from "Select a Language" to "Select a User"
         selectALanguage.text("Select a User:");
         // Clear the contents of the first table row
         $('table:first tr td table:eq(1) tr:eq(1)').html("<td colspan=\"2\"><a name=\"#usernames\"></a><br style=\"display: none;\" /></td>");
         // Remove all the remaining table rows
         $('table:first tr td table:eq(1) tr:gt(1)').remove();
         // Add each of the saved credentials
         for (var x=0; x<= aryCredentials.length - 1; x++) {
            addUser847(aryCredentials[x].username, aryCredentials[x].password);
         }
         // Add a link so the user can clear their saved credentials
         $('table:first tr td table:eq(1) tr:eq(1) td br:last').after('<br /><a class=\"PSLOGINTEXT\" id=\"clearlink\" href=\"javascript:Clear list of credentials">Clear List</a><br />\n');
         // Add a link back to the "root" page, listing available environments.
         $('tr.PSHYPERLINK td.PSHYPERLINK a').after('<br /><a href=\"' + urlRoot + '\">Other Instances</a>');
      } else {
         // Unknown PeopleTools Version
      }
   }
   if (selectALanguage) {
      var clearLink = $('#clearlink');
      clearLink.click(function() {
         if (clearCredentials(strEnvironment))
            top.history.go(0);
      });
   }
}

function addUser849(userName, password) {
   var newLink = $('.pslanguageframe .skpremove:first').html('<a href=\"javascript:Log in as ' + userName + '\">' + userName + '</a>').toggleClass('skpremove').children('a');
   newLink.attr('userName', userName);
   newLink.attr('password', password);
   newLink.click(loginwith);
}

function addUser847(userName, password) {
   $('table:first tr td table:eq(1) tr:eq(1) td br:last').after('<a class=\"PSLOGINTEXT\" href=\"javascript:Log in as '+userName+'\">' + userName + '</a><br />\n');
   var newLink = $('table:first tr td table:eq(1) tr:eq(1) td a:last');
   newLink.attr('userName', userName);
   newLink.attr('password', password);
   newLink.click(loginwith);
}

function loginwith() {
   strUsername = $(this).attr('userName');
   strPassword = $(this).attr('password');

   $('#userid').val(strUsername);
   $('#pwd').val(strPassword);

   // don't trigger URL for link
   return false;
}

function cookiesReady() {
   cookiesEnabled = true;
}
function JSONReady() {
   JSONEnabled = true;
}

function getEnvironment(objLocation) {
   // Input: '/psp/cpshrdev/'
   //        '/psc/cpshrdev/EMPLOYEE/HRMS/'
   var temp = objLocation.pathname;
   temp = temp.substring(5);
   temp = temp.substring(0, temp.indexOf('/'));
   return temp;
}

function initCredentials(strEnvironment) {
   var aryCredentials = new Array();
   
   // If there are any username/passwords common to all environments, you can define those here.
   //aryCredentials[0] = {};
   //aryCredentials[0].username = 'PS';
   //aryCredentials[0].password = 'PS';
   //aryCredentials[1] = {};
   //aryCredentials[1].username = 'VP1';
   //aryCredentials[1].password = 'VP1';

   var strCredentials = $.toJSON(aryCredentials);
   $.cookie(strEnvironment, strCredentials, {path: "/"});
   return aryCredentials;
}
function getCredentials(strEnvironment) {
   // Should be a string in the format:  '[{"username":"PS", "password":"PS_password"}]'
   //var aryCredentials = new Array();
   aryCredentials = eval('(' + $.cookie(strEnvironment) + ')');
   if (aryCredentials) {
      // Credentials loaded OK
   } else {
      // Credentials are mal-formed or null.  Re-initialize.
      aryCredentials = initCredentials(strEnvironment);
   }
   // Return array of username/password pairs
   return aryCredentials;
}

function setCredentials(strEnvironment, aryCredentials) {
   // Convert the array of credential objects to their JSON string format.
   var strCredentials = $.toJSON(aryCredentials);
   // Store the string format in a cookie named for the current environment.
   $.cookie(strEnvironment, strCredentials, {path: "/"});
}

function addCredential(strUsername, strPassword) {
   // Adding username/password to the array at index lngIndex
   var lngIndex = aryCredentials.length;

   // Create a new object
   aryCredentials[lngIndex] = {};
   // Set the username/password properties.
   aryCredentials[lngIndex].username = strUsername;
   aryCredentials[lngIndex].password = strPassword;

   // Set the cookie based on the object
   setCredentials(strEnvironment, aryCredentials);

   return true;
}
function clearCredentials(strEnvironment) {
   if (confirm('Are you sure you wish to clear the saved credentials for \'' + strEnvironment + '\'?')) {
      // Remove the cookie by setting it to null
      $.cookie(strEnvironment, null, {path: "/"});
      return true;
   }
   return false;
}
function formSubmit() {
   // The user is logging in.  Grab the username/password.
   var strUsername = $('#userid').attr('value');
   var strPassword = $('#pwd').attr('value');

   // Unless proven otherwise, we did not find a username.
   var bolFound = false;
   var bolNewPassword = false;

   // Loop through the array of saved credentials, seeing if the current username is found.
   for (var x=0; x<= aryCredentials.length - 1; x++) {
      if (strUsername == aryCredentials[x].username) {
         bolFound = true;
         if (strPassword != aryCredentials[x].password) {
            bolNewPassword = true;
         }
         break;
      }
   }
   // If the username was not found in the list of saved credentials, offer to add it.
   if (!bolFound) {
      if (confirm('Do you want to add \'' + strUsername + '\' to your list of saved credentials?')) {
         addCredential(strUsername, strPassword)
      }
   } else {
      // Offer to save the new password, if it differs from the one previously saved.
      if (bolNewPassword) {
         if (confirm('The stored password differs from the one entered.\nDo you wish to save the new password?')) {
            aryCredentials[x].password = strPassword;
            setCredentials(strEnvironment, aryCredentials);
         }
      }
   }
   return true;
}
