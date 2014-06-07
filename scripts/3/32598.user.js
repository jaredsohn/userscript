// ==UserScript==
// @name           UiO og HiO - Fronter (Blyant) - Autologin
// @namespace      ...
// @description    Automatic login for University of Oslo (Universitetet i Oslo) and Oslo University College (Høyskolen i Oslo). Do ONLY use on private machine as username and password are stored in plain text!
// @include        *://blyant.uio.no/*
// @include        *://fronter.com/hio/*
// ==/UserScript==

// Login information (["user", "pass", "lang"])
var login = ["usernamehere", 'passhere', "no"];

/* Possible values for "lang":
  +--------------+------------------+
  | Value        | Result           |
  +--------------+------------------+
  | default_lang | Default language |
  | no           | Norsk Bokmål     |
  | no-nn        | Norsk Nynorsk    |
  | en           | English          |
  | fr           | Français         |
  | de           | Deutsch          |
  | es           | Español          |
  +--------------+------------------+*/

////////////////////////////////////////////////////
// DO NOT MODIFY BELOW UNLESS SOMETHING IS BROKEN //
////////////////////////////////////////////////////

var doDisable = 1; // disable form while working?

var languages = [];
languages["default_lang"] = "Default language";
languages["no"] = "Norsk Bokmål";
languages["no-nn"] = "Norsk Nynorsk";
languages["en"] = "English";
languages["fr"] = "Français";
languages["de"] = "Deutsch";
languages["es"] = "Español";

var messages = [];
messages["-3"] = "Error: Login language is invalid, refer to line 12 in the Greasemonkey script for help.";
messages["-2"] = "Error: The login data array is not 3 in size!";
messages["-1"] = "Error: The login data contains a syntax error, probably where username and password is stored.";
messages["0"] = "Error: The login data appears to be blank.";

var urls = [
  "https://blyant.uio.no/",            // referrer login for UiO
  "https://fronter.com/hio/",          // referrer login for HiO
  "https://blyant.uio.no/index.phtml", // special referrer login for UiO
];

function shouldSkip() {
  try {
    var ref = unsafeWindow.document.referrer + "";
    if(ref.match(/\?logout=1/))
      return true;
    if(ref.match(/\/index\.phtml$/))
      return true;
    if(ref == urls[0] || ref == urls[1])
      return true;
  } catch(e) {}
  return false;
}

function isFronter() {
  var form;
  try {
    var forms = unsafeWindow.document.getElementsByTagName("form");
    for(var i=0; i<forms.length; i++) {
      form = forms[i];
      if(form.action == urls[2] || form.name == "loginform" && form.action.match(/index\.phtml/)) { // the page contains the login form
        var hasFound = 0;
        var retInputs = [];
        var inputs = form.getElementsByTagName("input");
        for(var j=0; j<inputs.length; j++) { // check that the input fields we need exist
          var input = inputs[j];
          if(input.name == "fronter_request_token")
            hasFound++;
          if(input.name == "username") {
            retInputs["user"] = input;
            hasFound++;
          }
          if(input.name == "password") {
            retInputs["pass"] = input;
            hasFound++;
          }
          if(input.value == "Login" || input.id == "login_button") {
            retInputs["submit"] = input;
            hasFound++;
          }
        }
        var selects = form.getElementsByTagName("select");
        if(selects)
          for(var j=0; j<selects.length; j++) {
            var select = selects[j];
            var selinputs = select.getElementsByTagName("option");
            if(selinputs)
              for(var k=0; k<selinputs.length; k++) {
                var selinput = selinputs[k];
                if(selinput.value == login[2]) {
                  select.selectedIndex = k;
                  retInputs["lang"] = select;
                }
              }
          }
        if(hasFound >= 3) { // this has to be fronter login page, return true! (fronter_request_token is kind of optional, thus 3 or 4 is accepted)
          retInputs["form"] = form;
          return [true, retInputs];
        }
      }
    }
  } catch(e) {}
  return [false, null];
}

function validLogin() {
  try {
    if(login.length != 3)
      return -2;
    try {
      if(languages[login[2]].length < 1)
        return -3;
    } catch(e2) {return -3;}
    if(login[0].length > 1 && login[1].length > 1)
      return 1;
  } catch(e) {return -1;}
  return 0;
}

function doLogin(array) {
  // fill out and submit (language filled out when isFronter was called)
  array[1]["user"].value = login[0];
  array[1]["pass"].value = login[1];
  array[1]["form"].submit();
  if(doDisable) {
    array[1]["user"].disabled = "disabled";
    array[1]["pass"].disabled = "disabled";
    array[1]["lang"].disabled = "disabled";
    array[1]["submit"].disabled = "disabled";
  }
}

(function() {
  if(shouldSkip())
    return; // do not try to login if already has (or if signed out)
  var form = isFronter();
  if(form[0] == true) {
    var state = validLogin();
    if(state < 1)
      alert(messages[""+state]);
    else
      doLogin(form);
  }
})();
