// ==UserScript==
// @name LL Mod User Takeover Justification Thingy
// @namespace By Kalphak
// @description LL Mod User Takeover Justification Thingy
// @include http://endoftheinter.net/profile.php?user=*
// @include https://endoftheinter.net/profile.php?user=*
// ==/UserScript==


function userClicked(e){
e.preventDefault();
// Edit it I guess to whatever
var reason = prompt("Why do you need to take over this user's account?", "blackmail");
reason = encodeURIComponent(reason);
GM_xmlhttpRequest({
method: "POST",
url: "http://betweentheselines.net/bcuz/receive.php",
headers: { "Content-type" : "application/x-www-form-urlencoded" },
data: "modName=" + modName + "&modId=" + modId + "&victimName=" + victimName + "&victimId=" + victimId + "&reason=" + reason,
onload: function(theResponose) {
if (theResponose.responseText == "True"){
window.location = el.href;
}else{
alert("Problem with remote request. Server returned: " + theResponose.responseText);
}
}
});
}

// Whatever it's functional

var mod = document.getElementById("userbar_pms").parentNode.firstChild;
var modName = encodeURIComponent(mod.innerHTML.split(" (")[0]);
var modId = encodeURIComponent(mod.href.split("=")[1]);
var victimName = encodeURIComponent(document.title.split("End of the Internet - User Profile - ")[1]);
var el = document.getElementsByTagName("a")[document.getElementsByTagName("a").length-4];
var victimId = encodeURIComponent(el.href.split("=")[1]);

el.addEventListener("click", function (event){ userClicked(event); }, false);