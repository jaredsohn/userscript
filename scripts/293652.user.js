// ==UserScript==
// @name         mb. SUPER MIND CONTROL II X TURBO
// @version      2014.0129.2112
// @description  musicbrainz.org power ups (mbsandbox.org too): RELEASE_CLONER. copy/paste releases / RADIO_DOUBLE_CLICK_SUBMIT / POWER_RELATE_TO. auto-focus and remember last used types in "relate to" inline search / RELEASE_EDITOR_PROTECTOR. prevent accidental cancel by better tab key navigation / TRACK_LENGTH_PARSER / ALIAS_SORT_NAME. clever auto fill in / LAST_SEEN_EDIT. handy for subscribed entities / COOL_SEARCH_LINKS / COPY_TOC / ROW_HIGHLIGHTER / SERVER_SWITCH / TAG_SWITCH / USER_STATS / RETURN_TO_MB_PROPERLY / CHECK_ALL_SUBSCRIPTIONS / STATIC_MENU / MERGE_USER_MENUS / SLOW_DOWN_RETRY
// @namespace    https://userscripts.org/85790
// @author       PATATE12 aka. jesus2099/shamo
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://*.mbsandbox.org/*
// @include      http://*musicbrainz.org/*
// @include      https://*musicbrainz.org/*
// @exclude      *://*musicbrainz.org/ws/*
// @exclude      *://blog.musicbrainz.org/*
// @exclude      *://bugs.musicbrainz.org/*
// @exclude      *://chatlogs.musicbrainz.org/*
// @exclude      *://forums.musicbrainz.org/*
// @exclude      *://tickets.musicbrainz.org/*
// @exclude      *://wiki.musicbrainz.org/*
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";
	var userjs = {"key":"jesus2099userjs85790", "name":"SUPER MIND CONTROL Ⅱ X TURBO", "ohp":"https://userscripts.org/85790"};
	var MBS = self.location.protocol+"//"+self.location.host;
	var stre_GUID = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
	var re_GUID = new RegExp(stre_GUID);
	var account = document.querySelector("div#header-menu li.account");
	document.head.appendChild(document.createElement("style")).setAttribute("type", "text/css");
	var j2css = document.styleSheets[document.styleSheets.length-1];
	/*==========================================================================
	## CONFIGURATORZ ##
	find this script settings in MB "About" menu
	==========================================================================*/
	var j2set = document.querySelector("div#header-menu li.about > ul > li.jesus2099");
	if (!j2set && (j2set = document.querySelector("div#header-menu li.about > ul"))) {
		j2set = j2set.appendChild(createTag("li",{"a":{"class":"jesus2099 separator"}}));
	}
	var j2sets = {}, j2docs = {}, j2setsclean = [];
	j2setting();
	if (j2set) {
		j2set = addAfter(createTag("li", {"a":{"class":"jesus2099"}}, createTag("a",{"e":{"click":function(e){
			getParent(this, "ul").style.setProperty("left", "-10000px");
			j2setting();
			if (j2sets) {
				var j2setsdiv = document.body.appendChild(createTag("div",{"a":{"id":userjs.key+"j2sets"},"s":{"position":"fixed","top":"100px","left":"100px","background":"silver","border":"2px outset white","padding":"1em"}},[createTag("a",{"s":{"float":"right"},"e":{"click":function(e){del(document.getElementById(userjs.key+"j2sets"));}}}, "  CLOSE ×  "),createTag("a",{"s":{"float":"right"},"e":{"click":function(e){if(confirm("RESET TO DEFAULT and REMOVE OBSOLETE")){localStorage.removeItem(userjs.key+"settings");self.location.reload();}}}}, "  reset  "),createTag("h4",{"s":{"text-shadow":"0 0 8px black"}},["██ ",createTag("a",{"a":{"href":userjs.ohp,"target":"_blank"}},userjs.name)," settings"]),createTag("p",{},["All settings are instantly saved but require a ",createTag("a",{"e":{"click":function(){location.reload();}}},"page reload")," to see the effect."])]));
				var alphakeys = [];
				for (var s in j2sets) { if (j2sets.hasOwnProperty(s)) {
					if (j2setsclean.indexOf(s)<0) { delete j2sets[s]; }
					else if (!s.match(/!/)) { alphakeys.push(s); }
				} }
				alphakeys.sort();
				var table = j2setsdiv.appendChild(createTag("table", {"a":{"cellspacing":"0"}}));
				for (var a=0; a<alphakeys.length; a++) {
					var tr = table.appendChild(document.createElement("tr"));
					tr.appendChild(createTag("td", {"s":{"background-color":"#ccc","padding-left":alphakeys[a].match(/[a-z]/)?"2em":"inherit"}}, j2settinput(alphakeys[a])));
					if (j2docs[alphakeys[a]]) { tr.appendChild(createTag("td", {"s":{"opacity":".666", "margin-bottom":".4em"}}, j2docit(j2docs[alphakeys[a]]))); }
				}
			}
		}}}, userjs.name+" settings")), j2set);
	}
	function j2setting(set, val, def, doc) {
		if (set == null) { j2sets = localStorage.getItem(userjs.key+"settings"); if (j2sets) { j2sets = JSON.parse(j2sets); } else { j2sets = {}; } }
		else {
			if (def) { j2setsclean.push(set); }
			if (doc) { j2docs[set] = doc; }
			if (val != null && (!def || j2sets[set] == null)) {
				j2sets[set] = val;
				localStorage.setItem(userjs.key+"settings", JSON.stringify(j2sets));
			} else if (set) {
				return j2sets[set];
			}
		}
	}
	function j2settinput(set) {
		var val = j2setting(set);
		var rnd = (Math.random()+"").substring(2);
		var lbl = createTag("label", {"a":{"for":userjs.key+enttype+set+rnd}, "s":{"white-space":"nowrap","text-shadow":"1px 1px 2px grey"}}, createTag("input", {"a":{"type":"checkbox", "id":userjs.key+enttype+set+rnd, "class":set},"e":{"change":function(e){
			j2setting(this.className, this.getAttribute("type")=="checkbox"?this.checked:this.value);
		}}}));
		var inp = lbl.querySelector("input");
		switch (typeof val) {
			case "boolean":
				addAfter(document.createTextNode(set), inp);
				inp.setAttribute("type", "checkbox");
				inp.checked = val;
				break;
			default:
				lbl.insertBefore(document.createTextNode("\u00a0_\u00a0 "+set), inp);
				inp.setAttribute("type", "text");
				inp.setAttribute("value", val);
				inp.addEventListener("keypress", function(e){if(e.keyCode==13){this.blur();del(getParent(this,"div"))}}, false);
				break;
		}
		return lbl;
	}
	function j2docit(txt) {
		var jira = txt.match(/\b(MBS-\d+)\b/);
		if (jira) {
			var arr = txt.split(jira[1]);
			arr.splice(1, 0, createTag("a", {"a":{"href":"http://tickets.musicbrainz.org/browse/"+jira[1].toUpperCase(),"target":"_blank","title":"opens in new window"}}, jira[1]));
			return arr;
		}
		else return txt;
	}
	/*==================================================================== LINK+
	## RELEASE_CLONER ##
	todo : add debugged clone release-AR module
	==========================================================================*/
	j2setting("RELEASE_CLONER", true, true, "one-click duplicate release(s). you can find this in the standard “Editing” menu");
	if (j2sets.RELEASE_CLONER && account) {
		var rcwhere = self.location.pathname.match(new RegExp("^/((release(?!-group)|release-group|label)/"+stre_GUID+")|artist/"+stre_GUID+"/(releases)$"));
		if (
			rcwhere && (rcwhere = rcwhere[2]?rcwhere[2]:rcwhere[3])
		) {
			var addrel = document.querySelector("div#header-menu li.editing > ul > li:not(.separator) > a[href$='/release/add']");
			if (addrel) {
				addAfter(createTag("li", null, createTag("a", {"a":{"title":userjs.name+"\nshift+click to open new tab / ctrl+click for background tab"+(rcwhere!="release"?"\nno need to select if there is only one release on this page":"")},"s":{"text-shadow":"1px 1px 2px grey"},"e":{"click":function(e){
					var crmbids = [];
					if (rcwhere == "release") {
						crmbids.push(""+self.location.pathname.match(re_GUID));
					}
					else {
						var checkrels = document.querySelectorAll("tr[xmlns\\3arel*='/release/'] input[type='checkbox'][name='add-to-merge']");
						for (var crmbid, cr=0; cr<checkrels.length; cr++) {
							if ((checkrels[cr].checked || checkrels.length == 1) && (crmbid = getParent(checkrels[cr], "tr")) && (crmbid = crmbid.getAttribute("xmlns:rel").match(re_GUID))) {
								crmbids.push(""+crmbid);
							}
						}
					}
					if (crmbids.length > 0) {
						for (var crr=crmbids.length-1; crr>=0; crr--) {
							var xhr = new XMLHttpRequest();
							xhr.onload = function(e) {
								var resv, res = this.responseXML.documentElement;
								var reled = {
									"form": createTag("form", {"a":{"action":"/release/add","method":"post","target":crr==0?"_self":"_blank"},"s":{"display":"none"}}),
									"add": function(ws, re, _opt) {
										var opt = _opt?_opt:{};
										var cont = opt.node?opt.node:res;
										var val = opt.raw?ws:cont.querySelector(ws);
										if (val) {
											if (typeof val == "object") val = val.textContent;
											/*console.log(re+" = "+val);*/
											if (opt.multiline) reled.form.appendChild(createTag("textarea", {"a":{"name":re}}, val));
											else reled.form.appendChild(createTag("input", {"a":{"name":re,"value":val}}));
										}
										else if (opt.req) {
											return false;
										}
										return true;
									}
								};
								var ok = true;
								ok &= reled.add("release > title", "name", {"req":true});
								resv = res.querySelector("release > release-group");
								if (confirm("new release in same release group?")) {
									ok &= reled.add(resv.getAttribute("id"), "release_group", {"raw":true});
								}
								else {
									resv = resv.querySelectorAll("release-group > primary-type, release-group > secondary-type-list > secondary-type");
									for (var resi=0; resi<resv.length && ok; resi++) {
										ok &= reled.add(resv[resi].textContent.toLowerCase(), "type", {"raw":true});
									}
								}
								ok &= reled.add("release > disambiguation", "comment");
								ok &= reled.add("release > annotation", "annotation", {"multiline":true});
								ok &= reled.add("release > barcode", "barcode");
								/* ws:release-event-list */
								resv = res.querySelectorAll("release > release-event-list > release-event");
								for (var resi=0; resi<resv.length && ok; resi++) {
									var date = resv[resi].querySelector("release-event > date");
									if (date && (date = date.textContent)) {
										var datex;
										if (datex = date.match(/^(\d{4})/)) ok &= reled.add(datex[1], "events."+resi+".date.year", {"raw":true});
										if (datex = date.match(/^.{4}-(\d{2})/)) ok &= reled.add(datex[1], "events."+resi+".date.month", {"raw":true});
										if (datex = date.match(/^.{4}-.{2}-(\d{2})$/)) ok &= reled.add(datex[1], "events."+resi+".date.day", {"raw":true});
										ok &= reled.add("release-event > area > iso-3166-1-code-list > iso-3166-1-code", "events."+resi+".country", {"node":resv[resi]});
									}
								}
								/* ws:release-event-list */
								ok &= reled.add("release > text-representation > language", "language");
								ok &= reled.add("release > text-representation > script", "script");
								ok &= reled.add("release > status", "status");
								ok &= reled.add("release > packaging", "packaging");
								/* ws:label-info-list */
								resv = res.querySelectorAll("release > label-info-list > label-info");
								for (var resi=0; resi<resv.length && ok; resi++) {
									var label = resv[resi].querySelector("label-info > label");
									if (label && (label = label.getAttribute("id"))) {
										ok &= reled.add(label, "labels."+resi+".mbid", {"raw":true});
									}
									ok &= reled.add("label-info > catalog-number", "labels."+resi+".catalog_number", {"node":resv[resi]});
								}
								/* ws:label-info-list */
								/* ws:artist-credit */
								resv = res.querySelectorAll("release > artist-credit > name-credit > artist");
								for (var resi=0; resi<resv.length && ok; resi++) {
									ok &= reled.add(resv[resi].getAttribute("id"), "artist_credit.names."+resi+".mbid", {"raw":true});
									ok &= reled.add("name-credit name", "artist_credit.names."+resi+".name", {"node":resv[resi].parentNode});
									ok &= reled.add(resv[resi].parentNode.getAttribute("joinphrase"), "artist_credit.names."+resi+".join_phrase", {"raw":true});
								}
								/* ws:artist-credit */
								/* ws:medium-list */
								resv = res.querySelectorAll("release > medium-list > medium");
								for (var resi=0; resi<resv.length && ok; resi++) {
									ok &= reled.add("medium > format", "mediums."+resi+".format", {"node":resv[resi]});
									ok &= reled.add("medium > position", "mediums."+resi+".position", {"node":resv[resi]});
									ok &= reled.add("medium > title", "mediums."+resi+".name", {"node":resv[resi]});
									var tracks = resv[resi].querySelectorAll("medium > track-list > track");
									for (var tr=0; tr<tracks.length; tr++) {
										ok &= reled.add("track title", "mediums."+resi+".track."+tr+".name", {"node":tracks[tr]});
										ok &= reled.add("track > number", "mediums."+resi+".track."+tr+".number", {"node":tracks[tr]});
										ok &= reled.add(tracks[tr].querySelector("track > recording").getAttribute("id"), "mediums."+resi+".track."+tr+".recording", {"raw":true});
										/* ws:artist-credit */
										var trac = tracks[tr].querySelector("track > artist-credit, track > recording > artist-credit");
										trac = trac.querySelectorAll("artist-credit > name-credit > artist");
										for (var aci=0; aci<trac.length && ok; aci++) {
											ok &= reled.add(trac[aci].getAttribute("id"), "mediums."+resi+".track."+tr+".artist_credit.names."+aci+".mbid", {"raw":true});
											ok &= reled.add("name-credit > name", "mediums."+resi+".track."+tr+".artist_credit.names."+aci+".name", {"node":trac[aci].parentNode});
											ok &= reled.add(trac[aci].parentNode.getAttribute("joinphrase"), "mediums."+resi+".track."+tr+".artist_credit.names."+aci+".join_phrase", {"raw":true});
										}
										/* ws:artist-credit */
										ok &= reled.add("track > length", "mediums."+resi+".track."+tr+".length", {"node":tracks[tr]});
									}
								}
								/* ws:medium-list */
								ok &= reled.add("\n —\n"+MBS+"/release/"+crmbids[crr]+" cloned using "+userjs.name+"’s '''RELEASE_CLONER'''™ ("+userjs.ohp+")", "edit_note", {"raw":true,"multiline":true});
								/* fin */
								if (ok) document.body.appendChild(reled.form).submit();
								else sendEvent(this, "error");
							}
							xhr.onerror = function(e) {
								alert("mb. RELEASE_CLONER ERROR MY GOD");
							};
							xhr.open("get", "/ws/2/release/"+crmbids[crr]+"?inc=artists+labels+recordings+release-groups+media+artist-credits+annotation", false);
							xhr.overrideMimeType("text/xml");
							xhr.send(null);
						}
					}
				}}}, ["Clone "+(rcwhere=="release"?"release":"selected releases")+" ", createTag("small", {"s":{"color":"grey"}}, "← RELEASE_CLONER™")])), addrel.parentNode);
			}
		}
	}
	/*================================================================ KEYBOARD+
	## ALIAS_SORT_NAME ##
	==========================================================================*/
	j2setting("ALIAS_SORT_NAME", true, true, "alias sort name will be prefilled as you type name, no more empty sort names");
	if (j2sets.ALIAS_SORT_NAME && self.location.href.match(new RegExp("^"+MBS+"/(.+/add-alias|.+/alias/.+/edit)$"))) {
		var aliasname, aliassortname, oldaliasname = "";
		if ((aliasname = document.getElementById("id-edit-alias.name")) && (aliassortname = document.getElementById("id-edit-alias.sort_name"))) {
			if (self.location.href.match(/add-alias$/)) { aliassortname.value = aliasname.value; }
			aliasname.style.setProperty("background-color", "#eef");
			oldaliasname = aliasname.value;
			aliasname.focus();
			aliasname.addEventListener("keyup", function(e) {
				if (aliassortname.value == oldaliasname || aliassortname.value == "") {
					aliassortname.value = aliasname.value;
				}
				oldaliasname = aliasname.value;
			}, false);
		}
	}
	/*================================================================= DISPLAY+
	## USER_STATS ##
	==========================================================================*/
	j2setting("USER_STATS", true, true, "adds convenient edit stats to user page (percentage of yes/no voted edits)");
	if (j2sets.USER_STATS && self.location.pathname.match(/^\/user\/[^/]+$/)) {
		var stats = document.querySelectorAll("table.statistics > tbody > tr > td:last-child");
		if (stats.length > 0) {
			var accepted = readStat(stats, 0);
			var autoedits = readStat(stats, 1);
			var voteddown = readStat(stats, 2);
			var failed = readStat(stats, 3);
			var open = readStat(stats, 4);
			var cancelled = readStat(stats, 5);
			var total = accepted + voteddown;
			writeStat(stats, 0, accepted, total);
			writeStat(stats, 2, voteddown, total);
			stats[2].parentNode.parentNode.insertBefore(
				createTag("tr", null, [
					createTag("th", null, "Ranked total"),
					createTag("th", null, createTag("a", {"a":{"href":"/statistics/editors","title":"see editor rankings"},"s":{"cursor":"help"}}, separ1000(0+accepted+autoedits)))
				]),
				stats[2].parentNode
			);
			stats[6].parentNode.parentNode.insertBefore(
				createTag("tr", null, [
					createTag("th", null, "Total"),
					createTag("th", null, createTag("a", {"a":{"href":self.location.pathname+"/edits"}}, separ1000(0+accepted+autoedits+voteddown+failed+open+cancelled)))
				]),
				stats[6].parentNode
			);
			var votes = stats[6].getElementsByTagName("a")[0].getAttribute("href");
			votes = votes.replace(/conditions\.0\.field=editor/, "conditions.0.field=vote");
			votes = votes.replace(/conditions\.0\.name=[^&]+/, "conditions.0.voter_id="+votes.match(/conditions\.0\.args\.0=(\d+)/)[1]);
			votes = votes.replace(/conditions\.0\.args\.0=\d+/, "conditions.0.args=%vote%");
			votes = votes.replace(/\?conditions\.1[^&]+&/, "?");
			votes = votes.replace(/conditions\.1[^&]+/g, "");
			for (var i = 7; i < stats.length; i++) {
				var vote = stats[i];
				vote.replaceChild(createTag("a", {"a":{"href":votes.replace(/%vote%/, {7:1, 8:0, 9:-1, 10:2}[i])}}, [vote.firstChild.cloneNode(true)]), vote.firstChild);
			}
			var yes = readStat(stats, 7);
			var no = readStat(stats, 8);
			var abs = readStat(stats, 9);
			var appr = stats.length>10?readStat(stats, 10):0;
			stats[9].parentNode.parentNode.insertBefore(
				createTag("tr", null, [
					createTag("th", null, "Ranked total"),
					createTag("th", {"a":{"colspan":"2"}}, createTag("a", {"a":{"href":"/statistics/editors","title":"see editor rankings"},"s":{"cursor":"help"}}, separ1000(0+yes+no+appr)+" ("+pc(yes+no+appr,yes+no+abs+appr)+")"))
				]),
				stats[9].parentNode
			);
		}
	}
	function readStat(stats, i) {
		return parseInt(stats[i].textContent.split("(")[0].replace(/\D/g, ""), 10);
	}
	function writeStat(stats, i, stat, total) {
		var a = stats[i].getElementsByTagName("a")[0];
		a.replaceChild(document.createTextNode(pc(stat,total)), a.firstChild);
	}
	function pc(p, c) {
		return (c==0?0:Math.round(10000*p/c)/100)+"%";
	}
	function separ1000(n) {
		return (""+n).replace(/(\d)(\d{3})$/, "$1,$2");
	}
	/*==================================================================== LINK+
	## RETURN_TO_MB_PROPERLY ##
	==========================================================================*/
	j2setting("RETURN_TO_MB_PROPERLY", true, true, "fixes the “return to musicbrainz.org” normal server link that is in beta and test server banners (MBS-6837)");
	if (j2sets.RETURN_TO_MB_PROPERLY && document.getElementsByClassName("server-details").length > 0) {
		var a = document.querySelector("body > div.server-details > p > a[href^='//musicbrainz.org']");
		if (a) {
			var h = a.getAttribute("href").split("?");
			a.setAttribute("href", h[0]+location.pathname+(h[1]?"?"+h[1]:""));
			a.style.setProperty("background-color", "yellow");
			addAfter(createTag("fragment", {}, ["←", createTag("a", {"a":{"href":"http://tickets.musicbrainz.org/browse/MBS-6837"}}, "MBS-6837"), " fixed"]), a);
		}
	}
	/*=================================================================== MOUSE+
	## CHECK_ALL_SUBSCRIPTIONS ##
	==========================================================================*/
	j2setting("CHECK_ALL_SUBSCRIPTIONS", true, true, "adds a “check all” checkbox on subscriptions pages (MBS-3629)");
	if (j2sets.CHECK_ALL_SUBSCRIPTIONS && self.location.href.match(new RegExp("^"+MBS+"/user/[^/]+/subscriptions/.+$"))) {
		var cbs = document.querySelectorAll("div#page > form > table.tbl > tbody > tr > td > input[type='checkbox']");
		var ths = document.querySelector("div#page > form > table.tbl > thead > tr > th");
		if (ths && !ths.hasChildNodes() && cbs && cbs.length > 0) {
			var cb = ths.appendChild(createTag("input",{"a":{"type":"checkbox"},"e":{"click":function(e){
				for (var icb=0; icb < cbs.length; icb++) {
					if (cbs[icb].checked != this.checked) {
						cbs[icb].click();
					}
				}
			}}}));
		}
	}
	/*================================================================= DISPLAY+
	## ROW_HIGHLIGHTER ##
	evolution of brianfreud’s
	MusicBrainz row highlighter https://userscripts.org/118008
	==========================================================================*/
	j2setting("ROW_HIGHLIGHTER", true, true, "highlights rows in various MB tables");
	j2setting("ROW_HIGHLIGHTER_colour", "#fcf", true, "use any CSS colour code or name");
	if (j2sets.ROW_HIGHLIGHTER && j2sets.ROW_HIGHLIGHTER_colour.match(/^(#[0-9a-f]{3}|#[0-9a-f]{6}|[a-z-]+)$/i)) {
		j2css.insertRule("."+userjs.key+"rowhlr > * { background-color:"+j2sets.ROW_HIGHLIGHTER_colour+"!important; }", j2css.cssRules.length);
		ROW_HIGHLIGHTER_init();
		document.body.addEventListener("DOMNodeInserted", ROW_HIGHLIGHTER_init, false);
	}
	function ROW_HIGHLIGHTER_init() {
		var tds = document.querySelectorAll("table:not(.details) td, table.details td span:not(.mp):not(.name-variation)");
		for (var td=0; td<tds.length; td++) {
			tds[td].removeEventListener("mouseover", ROW_HIGHLIGHTER_refresh, false);
			tds[td].removeEventListener("mouseout", ROW_HIGHLIGHTER_refresh, false);
			tds[td].addEventListener("mouseover", ROW_HIGHLIGHTER_refresh, false);
			tds[td].addEventListener("mouseout", ROW_HIGHLIGHTER_refresh, false);
		}
	}
	function ROW_HIGHLIGHTER_refresh(e) {
		var cls = " "+userjs.key+"rowhlr";
		var row = [this.parentNode];
		if (this.tagName == "SPAN") {
			row = [this, this.style.getPropertyValue("float")=="right"?getSibling(this, "span", false, true):getSibling(this, "span", false)];
		}
		for (var r=0; r<row.length; r++) { if (row[r]) {
			if (e.type.match(/over/)) row[r].className += cls;
			else row[r].className = row[r].className.split(cls).join("");
		} }
	}
	/*=================================================================== MOUSE+
	## RADIO_DOUBLE_CLICK_SUBMIT ##
	==========================================================================*/
	j2setting("RADIO_DOUBLE_CLICK_SUBMIT", true, true, "makes the radio buttons submit forms on double-click (MBS-3229)");
	if (j2sets.RADIO_DOUBLE_CLICK_SUBMIT && self.location.pathname.match(/^\/(cdtoc\/|cdstub\/|edit\/|release\/(add(\?release-group=.+)?|[^/+]\/edit)|search|.+\/merge)/)) {
		var radios = document.querySelectorAll("div#page form > *:not(.edit-list) input[type='radio']");
		if (radios) {
			for (var rad=0; rad<radios.length; rad++) {
				var obj = getParent(radios[rad], "label") || radios[rad];
				obj.addEventListener("mousedown", stop, false);
				obj.addEventListener("dblclick", function(e) {
					var form = getParent(this, "form");
					if (form) {
						var submitbutt = form.querySelector("div#release-editor input#id-next[type='submit'],button.submit.positive,span.buttons > button[type='submit']");
						if (submitbutt) {
							submitbutt.style.setProperty("background-color", "yellow");
							submitbutt.click();
						} else {
							form.submit();
						}
					}
				}, false);
				obj.setAttribute("title", "double-click this radio button to submit its whole form");
			}
		}
	}
	/*================================================================ REMEMBER+
	## LAST_SEEN_EDIT ##
	==========================================================================*/
	j2setting("LAST_SEEN_EDIT", false, true, "it shows you what edits you have already seen (reviewed) on entities edit histories, yeah man. only saves states when looking at all edits (not only open) of entity");
	if (j2sets.LAST_SEEN_EDIT && account) {
		var what = (self.location.pathname).match(new RegExp("^/(?:(user)/([^/]+)/edits(?:/(open))?|([^/]+)/("+stre_GUID+")/(?:(open)_)?edits)"));
		if (what) {
			var open = typeof (what[3] || what[6]) != "undefined";
			var which = what[2] || what[5];
			what = what[1] || what[4];
			var lastseenedits = localStorage.getItem(userjs.key+"lastseenedits-"+what);
			var upd = false;
			if (lastseenedits) { lastseenedits = JSON.parse(lastseenedits); } else { lastseenedits = {}; }
			var now = new Date();
			if (lastseenedits[which]) {
				if (lastseenedits[which][2] > lastseenedits[which][0] && new Date(lastseenedits[which][1]) < new Date(now-1000*60*30/*30minutes*/)) {
					lastseenedits[which][0] = lastseenedits[which][2];
					lastseenedits[which][1] = now.getTime();
					upd = true;
				}
			} else {
				lastseenedits[which] = [0,now.getTime(),0];/*[0:edit,1:when,2:next]*/
			}
			var edits = document.querySelectorAll("div.edit-header > h2 > a[href*='/edit/']");
			for (var ed=0; ed<edits.length; ed++) {
				var editn = parseInt(edits[ed].getAttribute("href").match(/\d+$/), 10);
				var editlist = getParent(edits[ed], "div", "edit-list");
				if (!open && ed == 0 && editn > lastseenedits[which][0] && editn > lastseenedits[which][2]) {
					lastseenedits[which][2] = editn;
					upd = true;
				}
				if (editn <= lastseenedits[which][0]) {
					editlist.setAttribute("title", "SEEN EDIT");
					if (editn == lastseenedits[which][0]) {
						editlist.parentNode.insertBefore(createTag("hr", {"a":{"title":"edits below are already seen"},"s":{"height":"0px", "border":"none", "border-top": "4px dashed red"}}), editlist);
						if (ed > 0) { getSibling(editlist, "div", "edit-list", true).scrollIntoView(); }
					}
				}
				else {
					editlist.style.setProperty("background-color", "#ffc");
					editlist.setAttribute("title", "NEW EDIT");
				}
			}
			if (upd && !open) {
				localStorage.setItem(userjs.key+"lastseenedits-"+what, JSON.stringify(lastseenedits));
			}
		}
	}
	/*==================================================================== LINK+
	## COOL_SEARCH_LINKS ##
	==========================================================================*/
	j2setting("COOL_SEARCH_LINKS", true, true, "additional “refine this search” links excluding own edits, cross links between edits / open_edits, etc.");
	if (j2sets.COOL_SEARCH_LINKS && account) {
		var refine = location.pathname.match(/(?:(?:(open)_)?edits|edits\/(open))\/?$/);
		var searchHelp = document.querySelector("div.search-help > dl.properties");
		var refines = document.createElement("dd");
		var id;
		var notme = "&conditions.2099.field=editor&conditions.2099.operator=%21%3D&conditions.2099.name=COOLEST+EDITOR+2099&conditions.2099.args.0=%id%";
		var novote = "&conditions.2098.field=vote&conditions.2098.operator=%3D&conditions.2098.voter_id=%id%&conditions.2098.args=no";
		if (searchHelp && refine) {
			refines.appendChild(createTag("a", {"a":{"href": location.pathname.replace(/edits\/open|(open_)?edits/, refine[1]||refine[2]?"edits":(location.pathname.match(re_GUID)?"open_edits":"edits/open"))+location.search+location.hash}}, (refine[1]||refine[2]?"All ":"Open ")+"edits"));
			if (
				self.location.href.indexOf(account.getElementsByTagName("a")[0].getAttribute("href")) < 0 &&
				(refine = document.querySelector("div.search-help > dl.properties > dd > a[href*='/search/edits?conditions.']")) &&
				(id = refine.getAttribute("href").match(/user_id=(\d+)/) || localStorage.getItem(userjs.key+"me-userid"))
			) {
				if (typeof id == "object") {
					id = id[1];
					if (id  != localStorage.getItem(userjs.key+"me-userid")) localStorage.setItem(userjs.key+"me-userid", id);
					refines.appendChild(document.createTextNode(" | "));
					refines.appendChild(createTag("a", {"a":{"href": refine.getAttribute("href")+notme.replace(/%id%/g, id)}}, ["Refine this search (",createTag("strong", null, "+not me"),")"]));
					novote = notme+novote;
				}
				refines.appendChild(document.createTextNode(" | "));
				refines.appendChild(createTag("a", {"a":{"href": refine.getAttribute("href")+novote.replace(/%id%/g, id)}}, ["Refine this search (",createTag("strong", null, "+not me+not voted"),")"]));
			}
			if (refines.childElementCount > 0) {
				addAfter(refines, searchHelp.insertBefore(createTag("dt", null, "Cool link"+(refines.childElementCount>1?"s":"")+": "), searchHelp.firstChild));
			}
		}
	}
	/*==================================================================== LINK+
	## COPY_TOC ##
	==========================================================================*/
	j2setting("COPY_TOC", true, true, "re-lookup Disc ID (from cdtoc page)");
	if (j2sets.COPY_TOC && account && self.location.pathname.match(/^\/cdtoc\/[^/]+-$/)) {
		var cdtoctrs = document.querySelectorAll("div#page > table table tr");
		var TOC = cdtoctrs[2].getElementsByTagName("td")[0].textContent+"%20"+cdtoctrs[cdtoctrs.length-1].getElementsByTagName("td")[0].textContent+"%20"+cdtoctrs[cdtoctrs.length-1].getElementsByTagName("td")[6].textContent;/*this should be 1%20totaltracks%20lastsector*/
		for (var i=2; i < cdtoctrs.length; i++) { TOC += "%20"+cdtoctrs[i].getElementsByTagName("td")[2].textContent; }
		(document.querySelector("h1")||document.body).appendChild(createTag("fragment", {}, [" (", createTag("a", {"a":{"href":"/cdtoc/attach?toc="+TOC}}, "re-lookup"), ")"]));
	}
	/*==================================================================== LINK+
	## SERVER_SWITCH ##
	==========================================================================*/
	j2setting("SERVER_SWITCH", true, true, "fast switch between normal, beta, test and mbsandboxes. look for the new top-right Mß menu");
	j2setting("SERVER_SWITCH_mbsandbox", "[\"acid2\", \"ianmcorvidae\", \"bitmap\", \"nikki\", \"i18n\"]", true, "type an array of subdomains to .mbsandbox.org ex.(default): [\"acid2\", \"ianmcorvidae\", \"bitmap\", \"nikki\", \"i18n\"]");
	if (j2sets.SERVER_SWITCH) {
		var menu = document.querySelector("div#header-menu ul.r");
		if (menu) {
			var menu = menu.appendChild(createTag("li", {}, [createTag("a", {"a":{"title":"Server Switch"}}, "Mß"), document.createElement("ul")]));
			menu.addEventListener("mouseover", function(e){
				this.firstChild.nextSibling.style.setProperty("left", "inherit");
				this.firstChild.nextSibling.style.setProperty("right", "0px");
			}, false);
			menu.addEventListener("mouseout", function(e){
				this.firstChild.nextSibling.style.removeProperty("left");
				this.firstChild.nextSibling.style.removeProperty("right");
			}, false);
			//MB.Control.HeaderMenu(menu);
			menu = menu.firstChild.nextSibling;
			var mbs = ["", "beta.", "test."];
			for (var mb=0; mb<mbs.length; mb++) {
				menu.appendChild(serverSwitch(mbs[mb]+"musicbrainz.org"));
			}
			if (j2sets.SERVER_SWITCH_mbsandbox) {
				var mbsb = JSON.parse(j2sets.SERVER_SWITCH_mbsandbox);
				if (mbsb.length) {
					mbsb.sort();
					for (var sb=0; sb<mbsb.length; sb++) {
						menu.appendChild(serverSwitch(mbsb[sb]+".mbsandbox.org", sb==0));
					}
				}
			}
			menu.appendChild(createTag("li", {"a":{"class":"separator"}}, j2settinput("SERVER_SWITCH"))).getElementsByTagName("input")[0].addEventListener("change", function(e){
				if (!this.checked) del(getParent(this, "ul").parentNode);
			}, false);
		}
	}
	function serverSwitch(server, sep) {
		var li = document.createElement("li");
		if (sep) {
			li.className = "separator";
		}
		var a = li.appendChild(createTag("a", {}, server));
		if (location.host == server) {
			a.style.setProperty("cursor", "no-drop");
			a.style.setProperty("font-weight", "bold");
		}
		else {
			a.setAttribute("href", "http"+(server.match(/mbsandbox/)?"":"s")+"://"+server+location.pathname+location.search+location.hash);
		}
		return li;
	}
	/*==================================================================== LINK+
	## TAG_SWITCH ##
	==========================================================================*/
	j2setting("TAG_SWITCH", true, true, "makes tag pages better titled and adds switches between your tags and others’ tags");
	if (j2sets.TAG_SWITCH && account) {
		var tagscope = self.location.href.replace(new RegExp("^"+MBS+"|[?#].*$","g"),"").match(/(?:\/user\/([^/]+))?(?:\/tags|(\/tag\/([^/]+))(?:\/(?:artist|release-group|release|recording|work|label))?)$/);
		if (tagscope) {
			var h1 = document.querySelector("h1");
			var me = account.querySelector("a");
			var tags = tagscope[0].match(/tags$/);
			if (h1 && me) {
				me = me.textContent;
				var tagswitches = [];
				var scope = typeof tagscope[1]=="string"?decodeURIComponent(tagscope[1]):"";
				if (scope != me) {
					tagswitches.push([MBS+"/user/"+encodeURIComponent(me)+(tags?"/tags":tagscope[2]), (scope==""?"only ":"")+"mine"]);
				}
				if (scope != "") {
					tagswitches.push([MBS+(tags?"/tags":tagscope[2]), "everyone’s"]);
					h1.appendChild(document.createTextNode("’s tag"+(tags?"s":" “"+decodeURIComponent(tagscope[3])+"”")));
				}
				tagswitch(h1, tagswitches);
			}
		}
	}
	function tagswitch(cont, urltxt) {
		var switcht = h1.appendChild(createTag("span", {"s":{"color":"grey","text-shadow":"1px 1px 2px silver"}}, " (see "));
		for (var i=0; i<urltxt.length; i++) {
			if (i>0) { switcht.appendChild(document.createTextNode(" or ")); }
			switcht.appendChild(createTag("a", {"a":{"href":urltxt[i][0]}}, urltxt[i][1]))
		}
		switcht.appendChild(document.createTextNode(")"));
	}
	/*=================================================================== MOUSE+
	## STATIC_MENU ##
	==========================================================================*/
	j2setting("STATIC_MENU", true, true, "makes the main MB menu always there when you need it (wihout scrolling top)");
	j2setting("STATIC_MENU_opacity", "1", true, "any value from 0 to 1. 1 (default) means no transparency (normal), 0 means invisible (stupid), .5 means half transparent. less than .666 is hard to see");
	var mmenu = document.getElementById("header-menu");
	var mlogo = document.getElementById("header-logo");
	var etais;
	if (j2sets.STATIC_MENU && mmenu && mlogo) {
		etais = mmenu.parentNode.insertBefore(document.createElement("div"), mmenu);
		self.addEventListener("load", smenu, false);
		self.addEventListener("resize", smenu, false);
		self.addEventListener("scroll", smenu, false);
	}
	function smenu(e) {
		if (document.body.scrollTop + document.documentElement.scrollTop > self.getComputedStyle(mlogo).getPropertyValue("height").match(/\d+/)) {
			mmenu.style.setProperty("position", "fixed");
			mmenu.style.setProperty("top", "0px");
			mmenu.style.setProperty("width", self.getComputedStyle(mmenu.parentNode).getPropertyValue("width"));
			mmenu.style.setProperty("opacity", j2sets.STATIC_MENU_opacity);
			etais.style.setProperty("display", "block");
			etais.style.setProperty("height", self.getComputedStyle(mmenu).getPropertyValue("height"));
			try {
				mmenu.querySelector("div > div.l").style.setProperty("display", "none");
				mmenu.querySelector("div > div.r").style.setProperty("display", "none");
			} catch (e) {}
		} else {
			mmenu.style.removeProperty("position");
			mmenu.style.removeProperty("top");
			mmenu.style.removeProperty("width");
			mmenu.style.removeProperty("opacity");
			etais.style.setProperty("display", "none");
			try {
				mmenu.querySelector("div > div.l").style.removeProperty("display");
				mmenu.querySelector("div > div.r").style.removeProperty("display");
			} catch (e) {}
		}
	}
	/*=================================================================== MOUSE+
	## MERGE_USER_MENUS ## (default off)
	==========================================================================*/
	j2setting("MERGE_USER_MENUS", false, true, "merges “user” and “my data” menus. also adds “use beta site” (yes/no) link in user preferences");
	var data = document.querySelector("div#header-menu li.data");
	var datas = data?data.querySelectorAll("div#header-menu li.data > ul > li"):null;
	if (j2sets.MERGE_USER_MENUS && account && data && datas.length > 0) {
		var accountul = account.querySelector("ul");
		data.style.setProperty("display", "none");
		accountul.insertBefore(createTag("li",{"a":{"class":"separator"}}), accountul.firstChild);
		for (var d=datas.length-1; d > -1; d--) {
			accountul.insertBefore(datas[d].cloneNode(true), accountul.firstChild);
		}
	}
	if (self.location.pathname.match(/\/account\/preferences$/)) {
		var betalink = document.querySelector("div#footer a.internal[href$='/set-beta-preference']");
		if (betalink) {
			var cont = document.querySelector("div#page form") || document.getElementById("page") || document.body;
			cont.insertBefore(betalink.cloneNode(true), cont.firstChild);
		}
		
	}
	/*==========================================================================
	## SLOW_DOWN_RETRY ##
	==========================================================================*/
	j2setting("SLOW_DOWN_RETRY", false, true, "gently auto-retries requests when MB overloading so you don’t have to do it yourself. just s(h)it back and relax");
	if (j2sets.SLOW_DOWN_RETRY && document.title.match(/^slow down! - musicbrainz$/i)) {
		var h1 = document.querySelector("div#content h1");
		var sddelay = 20;
		if (h1 && h1.textContent.match(/^slow down!$/i)) {
			setInterval(function(e){
				sddelay--;
				h1.replaceChild(document.createTextNode("Slow down! (retrying"+(sddelay>0?" in "+sddelay+" second"+(sddelay!=1?"s":""):"…")+")"), h1.firstChild);
				if (sddelay == 0) { self.location.reload(false); }
			}, 1000);
		}
	}
	/* --- ENTITY BONUS --- */
	j2setting("RELEASE_EDITOR_PROTECTOR", true, true, "repairs the keyboard tab navigation to save button (MBS-3112). prevents from cancelling the release editor by mistake");
	j2setting("TRACK_LENGTH_PARSER", true, true, "adds a “Time Parser” button next to the existing “Track Parser” in release editor’s tracklists");
	j2setting("POWER_RELATE_TO", true, true, "remembers last used search type (artist/release/track/label) for “Relate to …” inline AJAX search relationship creator. focuses its search field on click");
	j2setting("POWER_RELATE_TO_autofocus", true, true, "focus text search field");
	j2setting("POWER_RELATE_TO_autoselect", true, true, "selects its current value for quick reset by typing");
	var enttype = self.location.href.match(new RegExp("^"+MBS+"/(artist|label|recording|release|release-group|work)/.*$"));
	if (enttype) {
		enttype = enttype[1];
		/*======================================================== KEYBOARD+ MOUSE+
		## RELEASE_EDITOR_PROTECTOR ##
		=========================================================================*/
		if (j2sets.RELEASE_EDITOR_PROTECTOR && enttype == "release" && self.location.href.match(new RegExp("^"+MBS+"/release/(add.*|"+stre_GUID+"/edit)$"))) {
			var editnote = document.getElementById("id-edit_note");
			var cancelbutt = document.getElementById("id-cancel");
			var previousbutt = document.getElementById("id-previous");
			var savebutt = document.getElementById("id-save");
			if (document.getElementById("release-editor") && cancelbutt) {
				cancelbutt.addEventListener("click", function(e) {
					if (!confirm("RELEASE EDITOR PROTECTOR\n\nDo you really want to cancel this release "+self.location.href.match(/add|edit/)+"?")) {
						return stop(e);
					}
				}, false);
				if (editnote && previousbutt && savebutt) {
					editnote.setAttribute("tabindex", "1");
					savebutt.setAttribute("tabindex", "1");
					previousbutt.setAttribute("tabindex", "2");
					cancelbutt.setAttribute("tabindex", "3");
				}
			}
		}
		/*================================================================== MOUSE+
		## TRACK_LENGTH_PARSER ##
		=========================================================================*/
		if (j2sets.TRACK_LENGTH_PARSER && enttype == "release" && location.pathname.match(new RegExp("/release/(add.*|"+stre_GUID+"/edit)$"))) {
			var re = document.querySelector("div#release-editor");
			if (re) {
				re.addEventListener("DOMNodeInserted", function(e) {
					var tps = this.querySelectorAll("input.track-parser[type='button']");
					for (var tp=0; tp<tps.length; tp++) {
						if (!tps[tp].parentNode.querySelector("*.track-length-parser")){
							addAfter(createTag("input", {"a":{"type":"button","class":"track-length-parser","value":"Time Parser","title":"YEAH MAN!"},"s":{"background-color":"yellow"},"e":{"click":function(e){
								var times = prompt("TRACK_LENGTH_PARSER\n\nPlease paste your huge text including track times below.\n“1:23” and “1′23″” and even incorrect “1’23”” and “1'23\"” will be parsed.\nYou can for instance copy from your foobar2000 tracklist, minc.or.jp, etc.\nWARNING. You must understand that all current times will be overwritten in the tracklist editor.");
								times = times.match(/\b\d{1,3}[:′’']\d\d\b[″”"]?/g);
								var inputs = getParent(this, "fieldset", "advanced-disc").querySelectorAll("td.length > input.track-length[type='text']");
								if (inputs.length == times.length || confirm("ACHTUNG, detected times and tracks count mismatch.\nThere are "+times.length+" lengths detected in your text, butt\nthere are "+inputs.length+" tracks in the tracklist.\nAre you sure to go on?")) {
									for (var t=0, i=0; t<times.length && i<inputs.length; t++, i++) {
										var time = times[t].match(/(\d+)\D+(\d+)/);
										inputs[i].value = time[1]+":"+time[2];
									}
								}
							}}}), tps[tp]);
						}
					}
				}, false);
			}
		}
		/*============================================== KEYBOARD+ MOUSE+ REMEMBER+
		## POWER_RELATE_TO ##
		=========================================================================*/
		if (j2sets.POWER_RELATE_TO) {
			var rta = document.querySelector("a.relate-to");
			var rtd = document.querySelector("div.relate-to");
			if (rta && rtd) {
		/* MEMORY */
				initsel(rtd.querySelector("select"), j2sets["POWER_RELATE_TO_"+enttype+"_type!"]);
				if (enttype == "release") { initsel(rtd.querySelector("select.endpoint"), j2sets["POWER_RELATE_TO_"+enttype+"_endpoint!"]); }
		/* AUTOFOCUS + AUTOSELECT */
				var prtq = rtd.querySelector("input.name[type='text']");
				if (prtq) {
					rta.addEventListener("click", function(e) { if (j2sets.POWER_RELATE_TO_autofocus) { setTimeout(function(){prtq.focus();},0); } }, false);
					prtq.addEventListener("focus", function(e) { if (j2sets.POWER_RELATE_TO_autofocus && j2sets.POWER_RELATE_TO_autoselect) { this.select(); } }, false);
				}
			}
		}
	}
	function initsel(sel, val) {
		if (sel) {
			if (val) {
				sel.value = val;
				sendEvent(sel, "change");
			}
			sel.addEventListener("keypress", function(e) { sendEvent(this, "change"); }, false);
			sel.addEventListener("change", function(e) {
				j2setting("POWER_RELATE_TO_"+enttype+"_"+(this.className!="endpoint"?"type":"endpoint")+"!", this.value);
				if (j2sets.POWER_RELATE_TO_autofocus) {
					var prtq = this.parentNode.querySelector("input.name[type='text']");
					if (prtq) { setTimeout(function(){prtq.focus();},0); }
				}
			}, false);
		}
	}
	/*==========================================================================
	## MY COMMON CRAP : https://github.com/jesus2099/javascript-patate12chips ##
	==========================================================================*/
	function addAfter(n, e) {
		if (n && e && e.parentNode) {
			if (e.nextSibling) { return e.parentNode.insertBefore(n, e.nextSibling); }
			else { return e.parentNode.appendChild(n); }
		} else { return null; }
	}
	function createTag(tag, gadgets, children) {
		var t = (tag=="fragment"?document.createDocumentFragment():document.createElement(tag));
		if(t.tagName) {
			if (gadgets) {
				for (var attri in gadgets.a) { if (gadgets.a.hasOwnProperty(attri)) { t.setAttribute(attri, gadgets.a[attri]); } }
				for (var style in gadgets.s) { if (gadgets.s.hasOwnProperty(style)) { t.style.setProperty(style.replace(/!/,""), gadgets.s[style], style.match(/!/)?"important":""); } }
				for (var event in gadgets.e) { if (gadgets.e.hasOwnProperty(event)) { t.addEventListener(event, gadgets.e[event], false); } }
			}
			if (t.tagName == "A" && !t.getAttribute("href") && !t.style.getPropertyValue("cursor")) { t.style.setProperty("cursor", "pointer"); }
		}
		if (children) { var chldrn = children; if (typeof chldrn == "string" || chldrn.tagName) { chldrn = [chldrn]; } for(var child=0; child<chldrn.length; child++) { t.appendChild(typeof chldrn[child]=="string"?document.createTextNode(chldrn[child]):chldrn[child]); } t.normalize(); }
		return t;
	}
	function del(o) {
		return o.parentNode.removeChild(o);
	}
	function sendEvent(n, e){
		var ev = document.createEvent("HTMLEvents");
		ev.initEvent(e, true, true);
		n.dispatchEvent(ev);
	}
	function getParent(obj, tag, cls) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("\\W*"+cls+"\\W*")))) {
				return cur;
			} else {
				return getParent(cur, tag, cls);
			}
		} else {
			return null;
		}
	}
	function stop(e) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
		return false;
	}
	function getSibling(obj, tag, cls, prev) {
		var cur = obj;
		if (cur = prev?cur.previousSibling:cur.nextSibling) {
			if (cur.tagName == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("\\W*"+cls+"\\W*")))) {
				return cur;
			} else {
				return getSibling(cur, tag, cls, prev);
			}
		} else {
			return null;
		}
	}
})();