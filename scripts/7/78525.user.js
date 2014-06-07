// ==UserScript==
// @name           What.cd Seeding checker
// @namespace      EDB_gm
// @include        http*://*what.cd*
// ==/UserScript==

var userid;
var userhref;
var seedingno;

var infobar;
var seedingbar;

userid = document.getElementById("userinfo_username").innerHTML;
userid = userid.substring(userid.indexOf("<li><a href=\"")+13, userid.indexOf("\" class="));

userhref = document.URL;
userhref = userhref.substring(0, userhref.indexOf(".cd")+3);
userhref = userhref + "/" + userid;

infobar = document.getElementById("userinfo_stats");
seedingbar = document.createElement("li");

GM_xmlhttpRequest({
	method: "GET",
	url: userhref,
	onload: function(response) {
		seedingno = response.responseText;
		seedingno = seedingno.substring(seedingno.indexOf("Seeding: "));
		seedingno = seedingno.substring(9, seedingno.indexOf(" [<a href="));
		seedingbar.innerHTML = "<a href=\"torrents.php?type=seeding&userid=" + userid.substring(userid.indexOf("id=")+3) + "\">Seeding</a>: <span class=\"stat\">" + seedingno + "</span> ";

		infobar.insertBefore(seedingbar, document.getElementById("stats_seeding"));
	}
});