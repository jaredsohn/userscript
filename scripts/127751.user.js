// ==UserScript==
// @name         uso. SCRIPTS FOLLOW-UP
// @version      2014.0423.1231
// @description  userscripts.org: Highlights new reviews, posts, fans, installs and updates for both your own scripts and favourite scripts. Go to your "script management" and/or your "favorite scripts" pages to initiate follow-ups. + Posts/Fans direct links.
// @namespace    https://userscripts.org/127751
// @author       PATATE12 aka. jesus2099/shamo
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://userscripts.org/home/favorites*
// @include      https://userscripts.org/home/favorites*
// @include      http://userscripts.org/home/scripts*
// @include      https://userscripts.org/home/scripts*
// @include      http://userscripts.org/scripts/fans/*
// @include      https://userscripts.org/scripts/fans/*
// @include      http://userscripts.org/users/*/favorites*
// @include      https://userscripts.org/users/*/favorites*
// @include      http://userscripts.org/users/*/scripts
// @include      https://userscripts.org/users/*/scripts
// @include      http://userscripts.org/scripts/search?*
// @include      https://userscripts.org/scripts/search?*
// @include      http://userscripts.org/tags/*
// @include      https://userscripts.org/tags/*
// @run-at       document-end
// ==/UserScript==
(function(){
/* -- config start ----- */
var newStuffTOC = true;
var scrollToFirstChange = false;
var highlightTableHeader = true;
var changeDateFormat = "%YYYY-%MM-%DD %hh:%mm"; /*=null to leave dates as they are | ="%DD\u00a0/\u00a0%MM\u00a0/\u00a0%YYYY %hh:%mm" is another favourite example (also has %ss)*/
var colour = "gold"; /*="#ff6" for another colour | =null for no colour*/
var tooltip = "was %o %t"; /*="was %o %t" where %o, %n, %d and %t are replaced by old, new number, delta (+1) and type | =null for no tooltip*/
var newText = "%n\u00a0(%d)"; /*="%o \u2192\u00a0%n" for new text in cell (%o %n %d %t) | =null for no text change*/
var addDirectLinks = true; /*=true will add "discussions" and "fans" direct links*/
/* -- config stop ------ */
	var userjs = "j2userjs127751";
	var ls = (typeof localStorage != "undefined");
	var firstChange = null;
	var types = {"reviews":[0,-1], "posts":[1,-1,"discuss"], "fans":[2,-1,"fans"], "installs":[3,-1], "updates":[4,-1]};/*[lspos,col,url]*/
	if (cat = location.pathname.match(/^\/(home\/scripts|home\/favorites|users\/[0-9]+\/(?:favorites|scripts)|scripts\/search|tags\/.+)/)) {
		cat = cat[1];
		if (cat.match(/^home/) && (h1 = document.querySelector("div#main > h1"))) {
			h1.appendChild(document.createTextNode(" ("));
			var reset = h1.appendChild(document.createElement("a"));
			reset.appendChild(document.createTextNode("reset scripts follow-up"));
			reset.setAttribute("title", "alt-click to reset script fans too");
			reset.style.setProperty("cursor", "pointer");
			if (colour) { reset.style.setProperty("text-shadow", "0 0 4px "+colour); }
			reset.addEventListener("click", function(e) {
				var trashbin = [];
				for (var ikey=0; ikey<localStorage.length; ikey++) {
					var key = localStorage.key(ikey);
					if (key.match(new RegExp("^"+userjs+"[0-9]+"+(e.altKey?".+":"")+"$"))) {
						trashbin.push(key);
					}
				}
				for (var tb=0; tb<trashbin.length; tb++) {
					localStorage.removeItem(trashbin[tb]);
				}
				location.reload();
			}, false);
			h1.appendChild(document.createTextNode(")"));
		}
		var ujs = document.querySelectorAll("table.wide.forums th.la a");
		for (var th=0; th<ujs.length; th++) {
			if (m = ujs[th].textContent.trim().toLowerCase().match(/rating|posts|fans|installs|last\supdated/)) {
				types[(""+m).replace(/rating/, "reviews").replace(/last\supdated/, "updates")][1] = ujs[th].parentNode.cellIndex;
			}
		}
		ujs = document.querySelectorAll("table.wide.forums td.script-meat");
		for (var uj=0; uj<ujs.length; uj++) {
			var id = ujs[uj].parentNode.getAttribute("id").match(/\d+/);
			var sto = null;
			if (ls) { sto = localStorage.getItem(userjs+id); if (sto) { sto = sto.split(" "); } }
			if (sto && colour) { ujs[uj].style.setProperty("text-shadow", "0 0 4px "+colour); }
			else if (!sto) { ujs[uj].style.setProperty("opacity", ".777"); }
			var pag = [];
			for (t in types) { if (types.hasOwnProperty(t) && types[t][1] > -1) {
				var td = ujs[uj].parentNode.querySelectorAll("td")[types[t][1]];
				var ov = null;
				var nv = null;
				if (sto && types[t][0] < sto.length) { ov = sto[types[t][0]]; }
				if (t == "reviews") {
					nv = td.innerHTML.match(/(no|\d+)\sreviews?/);
					if (nv) { nv = nv[1]; }
				}
				else if (t == "updates" && (upd = td.querySelector("abbr.updated"))) {
					nv = upd.getAttribute("title");
					if (changeDateFormat) {
						upd.replaceChild(document.createTextNode(coolDate(nv)), upd.firstChild);
					}
				}
				else { nv = td.firstChild.nodeValue; }
				pag.push(nv);
				if (addDirectLinks && (url = types[t][2])) {
					var a = document.createElement("a");
					a.appendChild(document.createTextNode(nv));
					a.setAttribute("href", "/scripts/"+url+"/"+id);
					td.replaceChild(a, td.firstChild);
				}
				if (ov && nv && ov != nv) {
					if (!firstChange) { firstChange = td; }
					if (colour) {
						td.style.setProperty("background-color", colour);
						if (highlightTableHeader) { td.parentNode.parentNode.querySelectorAll("th")[types[t][1]].style.setProperty("border-top", "4px solid "+colour); }
					}
					if (tooltip) { td.setAttribute("title", tooltip.replace(/%o/g, t!="updates"?ov:coolDate(ov)).replace(/%n/g, t!="updates"?nv:coolDate(nv)).replace(/%d/g, t!="reviews"&&t!="updates"?((nv-ov>0?"+":"")+(nv-ov)):"").replace(/%t/g, t!="reviews"&&t!="updates"?t.replace(/s$/, parseInt(ov, 10)==1?"":"s"):"")); }
					if (newText && t != "reviews" && t != "updates") {
						var atxt = newText.replace(/%o/g, ov).replace(/%d/g, (nv-ov>0?"+":"")+(nv-ov)).replace(/%t/g, t).split("%n");
						var ftxt = document.createDocumentFragment();
						for (var j=0; j<atxt.length; j++) {
							if (atxt[j] != "") { ftxt.appendChild(document.createTextNode(atxt[j])); }
							if (j != atxt.length-1) { ftxt.appendChild(document.createElement("strong")).appendChild(td.firstChild.cloneNode(true)); }
						}
						td.replaceChild(ftxt, td.firstChild);
					}
					if (newStuffTOC) {
						var ns = document.querySelector("p#"+userjs+"new"+t);
						if (!ns) {
							ns = (document.querySelector("div#main") || document.querySelector("div#content")).insertBefore(document.createElement("p"), document.querySelector("div#content table.forums"));
							ns.setAttribute("id", userjs+"new"+t);
							ns.appendChild(document.createTextNode("New\u00a0"));
							ns.appendChild(document.createElement("strong")).appendChild(document.createTextNode(t));
							ns.appendChild(document.createTextNode(": "));
						}
						var item = ns.appendChild(document.createElement("span"));
						item.style.setProperty("white-space", "nowrap");
						var a = item.appendChild(ujs[uj].querySelector("a").cloneNode(true));
						a.replaceChild(document.createTextNode(a.firstChild.nodeValue), a.firstChild);
						a.setAttribute("ref", "#scripts-"+id);
						a.addEventListener("click", function(e) {
							var tgt = document.querySelector("tr"+this.getAttribute("ref"));
							tgt.scrollIntoView();
							if ((divtop = document.getElementById("top")) && divtop.style.getPropertyValue("position") == "fixed") {
								scrollTo(0, self.pageYOffset - self.getComputedStyle(divtop).getPropertyValue("height").match(/\d+/));
							}
							tgt.style.setProperty("border", "4px solid "+(colour?colour:"red"));
							setTimeout(function() {tgt.style.removeProperty("border");}, 500);
							e.cancelBubble = true;
							if (e.stopPropagation) e.stopPropagation();
							e.preventDefault();
							return false;
						}, false);
						if (colour) { a.style.setProperty("background-color", colour); }
						item.appendChild(document.createTextNode("\u00a0("));
						item.appendChild(document.createElement("strong")).appendChild(document.createTextNode(t!="updates"?(nv-ov>0?"+":"")+(nv-ov):coolDate(nv)));
						item.appendChild(document.createTextNode(")\u2026"));
						ns.appendChild(document.createTextNode(" "));
					}
				}
			} }
			if (ls && (ov || cat.match(/^home/))) { localStorage.setItem(userjs+id, pag.join(" ")); }
		}
	}
	else if (ls && (id = location.pathname.match(/^\/scripts\/fans\/(\d+)\/?(?:\?page=(\d+))?$/))) {
		var page = id[2]?id[2]:1;
		id = id[1];
		var content = document.querySelector("div#content");
		var own = localStorage.getItem(userjs+id) || document.querySelector("a.admin");
		var sto = localStorage.getItem(userjs+id+"fans-p"+page);
		if (!sto && own && typeof own == "string" && (fancount = own.split(" ")).length > types["fans"][0]) { sto = ""; }
		var fans = content.querySelectorAll("ul > li > a");
		var fanclub = [];
		if (fans.length > 0) {
		var userdir = JSON.parse(localStorage.getItem(userjs+"userdir")) || {};
			for (var f=0; f<fans.length; f++) {
				if ((fan = fans[f].getAttribute("href").match(/\/users\/(\d+)$/))) {
					fan = fan[1];
					userdir[fan] = fans[f].textContent;
					if (colour && typeof sto == "string" && sto.indexOf(fan) == -1) {
						if (!firstChange) { firstChange = fans[f]; }
						fans[f].style.setProperty("background-color", colour);
					}
					if (fanclub.indexOf(fan) == -1) { fanclub.push(fan); }
				}
			}
			localStorage.setItem(userjs+"userdir", JSON.stringify(userdir));
		}
		if (own || sto) {
			localStorage.setItem(userjs+id+"fans-p"+page, fanclub.join(" "));
		}
		if (typeof sto == "string" && sto != "" && (formerFans = sto.split(" ")).length > 0) {
			var ul = null;
			for (var g=0; g<formerFans.length; g++) {
				if (fanclub.indexOf(formerFans[g]) == -1) {
					if (!ul) {
						content.appendChild(document.createElement("h2")).appendChild(document.createTextNode("Former fans"));
						ul = content.appendChild(document.createElement("ul"));
						ul.style.setProperty("list-style", "none");
						ul.style.MozColumnCount = "4";
					}
					var a = ul.appendChild(document.createElement("li")).appendChild(document.createElement("a"));
					a.appendChild(document.createTextNode(userdir[formerFans[g]] || formerFans[g]));
					a.setAttribute("href", "/users/"+formerFans[g]);
					a.style.setProperty("text-decoration", "line-through");
					if (colour) { a.style.setProperty("background-color", colour); }
				}
			}
		}
	}
	if (scrollToFirstChange && firstChange) { firstChange.scrollIntoView(); }
	function coolDate(d) {
		if (changeDateFormat) { return changeDateFormat.replace(/%YYYY/g, d.substr(0,4)).replace(/%MM/g, d.substr(5,2)).replace(/%DD/g, d.substr(8,2)).replace(/%hh/g, d.substr(11,2)).replace(/%mm/g, d.substr(14,2)).replace(/%ss/g, d.substr(17,2)); }
		else { return d; }
	}
})();