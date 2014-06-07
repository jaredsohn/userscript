// ==UserScript==
// @name           8Realms Auto Login
// @namespace      BreakIt
// @version        1.1.1
// @description    8Realms Auto Login
// @include        http://www.8realms.com/
// @include        https://secure.8realms.com/*login*
// @include        http://www.8realms.com/*/play.ws
// ==/UserScript==

// ------------ Login Details ------------
var email = GM_getValue("email");
var pass = GM_getValue("pass");
GM_registerMenuCommand("8Realms Auto Login > Set Email/Username", function(){email = prompt("Input your Email/Username", email); GM_setValue("email", email); });
GM_registerMenuCommand("8Realms Auto Login > Set Password", function(){pass = prompt("Input your Password"); GM_setValue("pass", pass); });
GM_registerMenuCommand("8Realms Auto Login > Clean data", function(){email = undefined; pass = undefined; GM_deleteValue("email"); GM_deleteValue("pass"); });

if (document.getElementById("login") || document.getElementById("login_panel")) {
	if(!email){ email = prompt("Input your Email"); GM_setValue("email", email);}
	if(!pass){ pass = prompt("Input your Password"); GM_setValue("pass", pass);}

	// Function to return the Element by ID. Makes code shorter.
	function $$(a) {
		return document.getElementById(a);
	}
	// If its the login page then login.
	$$("username").value = email;
	with(p = $$("password")) focus(), value = pass;

	if(email && pass){
          if (document.getElementById("login")) {
		  $$("play").click();
          }
          else { 
            if (document.getElementById("login_panel")) {
                    document.evaluate("//input[@value='Log In' and @type='submit' and contains(@title, 'Log In')]", document, null, 9, null).singleNodeValue.click();
            }
          }
        }
}

//Looking for an error page then reloading the page.

  var error = 'Unable to find server';
  var h2Elems = document.getElementsByTagName('h2');

  for (var i=0; i<h2Elems.length; i++) {
      var thisElem = h2Elems[i];
      if (thisElem.textContent == error) {
          var rand = Math.floor(30000 + (Math.random() * ((60000 - 30000) + 1)));
          //window.setTimeout("document.location.reload()", rand);
        //Reload the page in 30 secs to 1 min.
      }
  }

//Adding 'Relog' to the 'nav bar'.

  var ul = document.getElementsByTagName("ul");
  var li = document.createElement("li");
  li.innerHTML = '<a href="https://secure.8realms.com/m=weblogin/g=8realms/loginform.ws?mod=minisites&dest=play.ws">Relog</a>';


  for (var i=0; i<ul.length; i++) {
      var thisElem = ul[i];
      ul[i].appendChild(li);
  }