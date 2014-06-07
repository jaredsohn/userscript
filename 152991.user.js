// ==UserScript==
// @name        Springpad auto login
// @namespace   springpad
// @license     GPL v3 or later version; http://www.gnu.org/licenses/gpl.html
// @description login automatically into springpad.com
// @include     http://springpad.com/login
// @version     1.0
// ==/UserScript==


//For login
var user = "";	//Enter your username between the double quotes (Leave blank if you do not want to auto login)
var pass = "";	//Enter your password between the double quotes (Leave blank if you do not want to auto login)


// ------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE -------------------------

//check if at login page
	if(document.location.href == "http://springpad.com/login")
	{
		if(user !== "" && pass !== "")
		{
      var f = document.getElementById("loginForm");
      f.elements.namedItem("username").value = user;
      f.elements.namedItem("password").value = pass;
      f.submit();
		} else {
      alert("Please configure username and password in greasmonkey text-file");
    }
	} else {
    alert("Please use this script on this site: http://springpad.com/login");
  }
	



