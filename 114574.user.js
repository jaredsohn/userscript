// ==UserScript==
// @name           Dofus Enhancement Suite
// @namespace      http://dark-elites.com/ns:dofus
// @description    Adds various functionality to the Dofus website.
// @include        http://*.dofus.com/*
// @include        http://*.ankama.com/*
// ==/UserScript==

GM_addStyle("\
	.guild_member .post2.post_left, .guild_member td.formbuttonrow {\
		background-color: #FFF !important;\
	}\
	.guild_member .postblockdate {\
		background-color: #FFF;\
	}\
	.aktable.guild_member tr td.post2 {\
		border-top: 1px solid #A6A6A6;\
		padding: 0;\
	}\
");

function deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

isLogged = document.getElementById("nicknamelinka");

// CHAT ICON ---
if (isLogged) {
	chat_ico_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABn0lEQVR4nI2SL2xTURSHvwtNasgck1tSAX6zzO5lE6ipJkCewcx1dmGCGcTqKqaaVHQIgiGBdrYKM0MmQCwpamtpl9Am773eP2fivte+QqH7ifdubs75nXO+cxUAhx3hPjreUn9fHnakOzKyTN2RkUWFHgCsPXq4tPi/YgpYy0g7AJQoSJsUwZ8FUIISwJoFBsYwiB2gUIiPJ8tOzbKvsQsMtKYfuVw5cue8kYCezAM/3lIF9ITW5Q0bpVWUEt96apBL5eKqD1ojb58B8HNsWacjBW6HwZv3X9uNyu7U+OXJl/wEsyFO96Y3GVQfVq5vUyy2a5Xn7Fc/QRI/Bb7/rr+aTqNy7YjyhitHHb9GmuE5SRLsv/sIRkMz/AEwTBzD2DFMHIPY8it2DBLHIBYP3pjUIDNxNsDOSPciRy+y6V/oR5ZeZOlHzoPXmsLcTprheQ47rctrNkuPUwIpWAUiiourHugJC952Tq8/zFYm0DjYmYGufobxOPhv/pzK9SeEZ1L7NhbCplCub2d93V8vGv6pOhuk4/7BYJk84GkywB1eevCPEaw/swAAAABJRU5ErkJggg==';

	img_node = document.createElement('img');
	img_node.src = chat_ico_src;
	img_node.setAttribute("style", "margin-top: 8px; cursor: pointer;");
	img_node.setAttribute("onclick", "window.open('http://staticns.ankama.com/comm/news/dofus/www/08_2011/forum-irc-page.html', 'ankirc')");

	chat_ico_div = document.createElement("div");
	chat_ico_div.className = "pmail";
	chat_ico_div.appendChild(img_node);

	sep = document.createElement("div");
	sep.className = "vseparator";

	mng_div = document.getElementsByClassName("manage")[0];

	mng_div.parentNode.insertBefore(chat_ico_div, mng_div);
	mng_div.parentNode.insertBefore(sep, mng_div);
}

// UPLOAD FORM
// todo

// GET GUILD LIST
last_updated = deserialize("guild_updated", '0');
if ( isLogged  && (Date.now() - last_updated > (3600000 * 72)) ) {
	GM_log("Updating guild list data.");
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://ankabox.ankama.com/en/?box=1&parent=forum.dofus.com&protocol=http%3A',
		onload: function(d) 
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://ankabox.ankama.com/requests/guild_list',
				onload: function(responseDetails) 
				{
					gsrc = responseDetails.responseText.replace(/\\t/g, "").replace(/\\n/g, "").replace(/\\/g, "");
					frag = document.createElement("div");
					frag.innerHTML = gsrc;
					
					nicks = [];

					strongtags = document.evaluate("//td[@class='name']//strong", frag, null, XPathResult.ANY_TYPE , null);
					nick = strongtags.iterateNext();
					while (nick) {
						if (nicks.indexOf(nick.textContent) == -1) {
							nicks.push(nick.textContent);
						}
						
						nick = strongtags.iterateNext();
					}

					serialize("guild_members", nicks);
					serialize("guild_updated", Date.now());
				}
			});
		}
	});
}

// HIGHLIGHT GUILD MEMBERS
pt = document.getElementById("postlist_table");
if ((location.hostname == "forum.dofus.com") && pt) {
	gmembers = deserialize("guild_members", "[]");
	ptables = pt.getElementsByClassName("aktable");
	nlist = pt.getElementsByClassName("normalname");
	
	for (i=0; i < nlist.length; i++) {
		if (gmembers.indexOf(nlist[i].textContent.replace(/(^\s*)|(\s*$)/g, "")) != -1) {
			ptables[i].className = "aktable guild_member";
		}
	}
}

// ANKABAR SUBSCRIPTION VIEW
function RemainingSub(t)
{
	r = (t - Date.now()) / 1000;
	parts = 0;
	out = "";
	
	months = Math.floor(r / 2592000);
	r = r % 2592000;
	if (months) {
		out = out + months + " " + ((months==1)?"month":"months") + " ";
		parts += 1;
	}
	
	weeks = Math.floor(r / 604800);
	r = r % 604800;
	if (weeks) {
		out = out + weeks + " " + ((weeks==1)?"week":"weeks") + " ";
		parts += 1;
		if (parts == 2) {
			return out;
		}
	}
	
	days = Math.floor(r / 86400);
	r = r % 86400;
	if (days) {
		out = out + days + " " + ((days==1)?"day":"days") + " ";
		parts += 1;
		if (parts == 2) {
			return out;
		}
	}
	
	hours = Math.floor(r / 3600);
	r = r % 3600;
	if (hours) {
		out = out + hours + " " + ((hours==1)?"hour":"hours") + " ";
		parts += 1;
		if (parts == 2) {
			return out;
		}
	}
	
	return out;
}

subtextobj = document.evaluate("//div[@id='manage_dofus']/br[1]/following-sibling::text()", document, null, XPathResult.ANY_TYPE , null).iterateNext();
if (subtextobj) {
	subtext = subtextobj.textContent.replace(/(^\s*Until )|(\s*$)/g, "");
	
	subcont = document.createElement("span");
	subtextobj.parentNode.insertBefore(subcont, subtextobj.parentNode.getElementsByTagName("br")[1]);
	subcont.appendChild(document.createElement("br"));
	subcont.appendChild(document.createTextNode("( " + RemainingSub(Date.parse(subtext)) + ")"));
}




