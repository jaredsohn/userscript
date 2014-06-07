// ==UserScript==
// @name          Roblox - Add Link to Showcase Edit
// @description   Adds The Left out Edit ShowCase Link
// @namespace     http://userscripts.org/users/73069
// @include       *roblox.com/User.aspx
// @version       0.4
// ==/UserScript==
(function () {	
	link = document.createElement("div");
	link.innerHTML = '<h5><a href="http://www.roblox.com/My/Showcase.aspx" style="">Edit Showcase</a></h5>'; 
	link.style.textAlign = "center";
	link.style.height = "8px";
	link.style.marginBottom = "10px";
	link.style.marginTop = "-20px";
	document.getElementById("UserPlaces").appendChild(link);
})();