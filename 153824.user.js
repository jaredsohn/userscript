// ==UserScript==
// @name        Duolingo auto login
// @namespace   duolingo
// @license     	GPL v3 or later version; http://www.gnu.org/licenses/gpl.html
// @description log into diigo automatically (to activate the toolbar)
// @include     https://duolingo.com
// @version     1.0
// ==/UserScript==


//For login
var user = "";	//Enter your username between the double quotes (Leave blank if you do not want to auto login)
var pass = "";	//Enter your password between the double quotes (Leave blank if you do not want to auto login)


// ------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE -------------------------

//check if at login page
	if(document.location.href == "https://duolingo.com")
	{
		if(user !== "" && pass !== "")
		{
      var f = document.getElementById("login-form");
      f.elements.namedItem("top_login").value = user;
      f.elements.namedItem("top_password").value = pass;
      f.submit();
		} else {
      alert("Please configure username and password in greasmonkey text-file");
    }
	} else {
    alert("Please use this script on this site: https://duolingo.com/");
  }
	



