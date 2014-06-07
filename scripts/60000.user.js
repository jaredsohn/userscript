// ==UserScript==
// @name           Beliebte Foren als Select
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://forum.mods.de/bb/*
// ==/UserScript==


GM_addStyle("td.forum:not(.fav) { display: none; }");
var foren = [{bid: 14, name: "Public Offtopic", style: "font-weight: bold;"},
			 {bid: 43, name: "Webdesign & Coding"},
			 {bid: 117, name: "mods.de Intern"},
			 {bid: 91, name: "Benderforum"},
			 {bid: 20, name: "Cabs"}],
	lasttd = document.evaluate("//td[@class='forum'][last()]", document, null, 8, null).singleNodeValue,
	newtd = lasttd.parentNode.appendChild(document.createElement("td")),
	select = newtd.appendChild(document.createElement("select")), mko = function(e,r,k) {
		var option = document.createElement("option");
		option.value = e;
		option.textContent = r;
		option.style.cssText = k || "";
		return option;
	}

newtd.className = "forum fav";
select.className = "option";

select.addEventListener("change", function() {
	unsafeWindow.jumpTo(this.options[this.selectedIndex].value);
}, false);

select.appendChild(mko("", "FavBoards"));

foren.forEach(function(e) {
	select.appendChild(mko(e.bid, e.name, e.style));
});

