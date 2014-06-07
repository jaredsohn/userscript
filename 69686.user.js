// ==UserScript==
// @name           IMDb Search plus
// @namespace      http://userscripts.org/users/67626
// @description    Provides additional search options for IMDb.
// @icon           http://s3.amazonaws.com/uso_ss/icon/69686/large.png
// @author         Chicago_gangster (http://userscripts.org/users/67626)
// @copyright      2010-2012 Chicago_gangster (http://userscripts.org/users/67626)
// @license        Creative Commons BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include        http*://*.imdb.com/*
// @exclude        http://*.imdb.com/*images*
// @exclude        http://*pro.imdb.com/*
// @exclude        https://resume.imdb.com/*
// @version        2011.04.28
// ==/UserScript==

function $(x) {return document.getElementById(x)}

function results() {
	var Realm = (LP.split("/")[2] == "title") ? "Title" : "Name";
	var RHS = document.createElement("DIV");
	RHS.className = "aux-content-widget-2";
	RHS.innerHTML = '<H3>' + Realm + ' Search</H3><A href="' + LP + '">Advanced ' + Realm + ' Search</A><BR><A href="/search/common?realm=' + ((Realm == "Title") ? "name" : "title")  + '">Common ' + Realm + ' Search</A>';
	try {
		$("sidebar").appendChild(RHS);
	}
	catch(err) {
		RHS.id = "sidebar";
		$("content-2-wide").appendChild(RHS);
	}
	if (GM_getValue("hide")) {
		var Details = ".results .image, .name > span.description, .name > span.bio, .title > span.outline, .title > span.credit, .title > span.runtime, .title > span.certificate, .title > span.genre";
		var Hide = document.createElement("SPAN");
		Hide.innerHTML = ' &#160; <INPUT type="checkbox" id="Hide"> <LABEL for="Hide">Hide details</LABEL>';
		$("left").appendChild(Hide);
		with ($("Hide")) {
			if (GM_getValue("hidedetails")) {
				GM_addStyle(Details + "{display: none !important}");
				checked = true;
			}
			addEventListener("change", function() {
				GM_addStyle(Details + "{display:" + ((checked) ? "none" : "block") + "!important}");
				GM_setValue("hidedetails", checked);
			}, false);
		}
	}
}

function job(input, obj) {
	var Job = document.createElement("SPAN");
	Job.innerHTML = '&#160; Job: <SELECT id="' + input + 'C"><OPTION></OPTION><OPTION>Cast</OPTION><OPTION>Crew</OPTION><OPTION>Actors</OPTION><OPTION>Actresses</OPTION><OPTION>Animation Department</OPTION><OPTION>Art Department</OPTION><OPTION>Art Directors</OPTION><OPTION>Assistant Directors</OPTION><OPTION>Camera Department</OPTION><OPTION>Casting Department</OPTION><OPTION>Casting Directors</OPTION><OPTION>Cinematographers</OPTION><OPTION>Composers</OPTION><OPTION>Costume Department</OPTION><OPTION>Costume Designers</OPTION><OPTION>Directors</OPTION><OPTION>Editorial Department</OPTION><OPTION>Editors</OPTION><OPTION>Electrical Department</OPTION><OPTION>Location Management</OPTION><OPTION>Make-up Department</OPTION><OPTION>Music Department</OPTION><OPTION>Producers</OPTION><OPTION>Production Department</OPTION><OPTION>Production Designers</OPTION><OPTION>Production Managers</OPTION><OPTION>Script Department</OPTION><OPTION>Set Decorators</OPTION><OPTION>Sound Department</OPTION><OPTION>Special Effects Department</OPTION><OPTION>Stunts</OPTION><OPTION>Thanks</OPTION><OPTION>Transportation</OPTION><OPTION>Visual Effects Department</OPTION><OPTION>Writers</OPTION><OPTION>Miscellaneous</OPTION></SELECT>';
	if (input == "name1" && (LP.match(/workedwith$/) || LS.match("key"))) {
		with ($("tn15content") || $("main")) {
			insertBefore(Job, getElementsByTagName("a")[0].nextSibling);
		}
	}
	else {
		$(input).parentNode.insertBefore(Job, $(input).nextSibling.nextSibling.nextSibling);
	}
	if ($(input).value.match(/\|/)) {
		var Jobs = $(input + "C").options;
		for (i=0; i<Jobs.length; i++) {
			if (Jobs[i].innerHTML.toLowerCase().replace(/ /g, "-") == $(input).value.split("|")[1]) {
				Jobs[i].selected = true;
				break;
			}
		}
	}
	$(input + "C").addEventListener("change", function() {
		with ($(input)) {
			if (value.match(/\d+/)) {
				value = value.split("|")[0];
				if (this.selectedIndex != 0) {value += "|" + this.options[this.selectedIndex].innerHTML.toLowerCase().replace(/ /g, "-")}
			}
			else {
				this.selectedIndex = 0;
				this.blur();
				alert("Specify the " + obj + " first.");
			}
		}
	}, false);
}

function titletypes(id) {
	var titletypes = document.getElementsByName("title_type")[0];
	if (titletypes) {titletypes.parentNode.removeChild(titletypes)}
	var T = document.createElement("TABLE");
	T.style.marginBottom = "10px";
	T.innerHTML = (<![CDATA[<tr>
		<td><input id="title_type-1" type="checkbox" name="title_type" value="feature"> <label for="title_type-1">Feature Film</label></td>
		<td><input id="title_type-2" type="checkbox" name="title_type" value="tv_movie"> <label for="title_type-2">TV Movie</label></td>
		<td><input id="title_type-3" type="checkbox" name="title_type" value="tv_series"> <label for="title_type-3">TV Series</label></td>
		<td><input id="title_type-4" type="checkbox" name="title_type" value="tv_episode"> <label for="title_type-4">TV Episode</label></td></tr><tr>
		<td><input id="title_type-5" type="checkbox" name="title_type" value="tv_special"> <label for="title_type-5">TV Special</label></td>
		<td><input id="title_type-6" type="checkbox" name="title_type" value="mini_series"> <label for="title_type-6">Mini-Series</label></td>
		<td><input id="title_type-7" type="checkbox" name="title_type" value="documentary"> <label for="title_type-7">Documentary</label></td>
		<td><input id="title_type-8" type="checkbox" name="title_type" value="game"> <label for="title_type-8">Video Game</label></td></tr><tr>
		<td><input id="title_type-9" type="checkbox" name="title_type" value="short"> <label for="title_type-9">Short Film</label></td>
		<td><input id="title_type-10" type="checkbox" name="title_type" value="video"> <label for="title_type-10">Video</label></td>]]>).toString();
	var B = $(id).getElementsByTagName("button");
	var S = B[B.length-1];
	S.parentNode.insertBefore(T, S);
}

function legacy() {
	if (LH.match("=")) {
		var legacy = LH.split("=");
		with (I = document.createElement("INPUT")) {
			type = "hidden";
			name = legacy[0].split("#")[1];
			value = legacy[1];
		}
		document.forms[1].appendChild(I);
	}
}

var LP = window.location.pathname;
var LS = window.location.search;
var LH = window.location.hash;

switch (LP) {
	case "/search/title":
		if (LS) {
			results();
			if (GM_getValue("import")) {
				var Import = document.createElement("FORM");
				with (Import) {
					method = "POST";
					action = "/mymovies/list";
					innerHTML = '<input type="hidden" name="pending"><input type="submit" name="submit" value="+ My Movies" id="Add" title="Add to My Movies ' + $("left").innerHTML.split(".")[0].replace(/\n/g, " ").replace(/^\s/, "") + '" class="linkasbutton-secondary" style="font-weight: bold; color: black; font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small; padding: 2px; height: auto;">';
				}
				with ($("main")) {
					appendChild(document.createElement("BR"));
					appendChild(Import);
				}
				$("Add").addEventListener("click", function() {
					var Titles = document.getElementsByClassName("title");
					for (i=0; i<Titles.length; i++) {
						with (I = document.createElement("INPUT")) {
							type = "hidden";
							name = "add";
							value = Titles[i].getElementsByTagName("a")[(document.getElementsByClassName("image")[0]) ? 11 : 0].getAttribute("href").match(/\d+/);
						}
						Import.appendChild(I);
					}
				}, false);
			}
		}
		else {
			if (GM_getValue("adult")) {
				var Adult = document.createElement("td");
				Adult.innerHTML = '<input id="genres-29" type="checkbox" name="genres" value="adult"> <label for="genres-29">Adult</label>';
				document.getElementsByClassName("clause")[5].getElementsByTagName("table")[0].getElementsByTagName("tr")[6].appendChild(Adult);
			}
			if (GM_getValue("job")) {
				job("role", "person");
			}
			if (GM_getValue("public")) {
				var Pub = document.createElement("DIV");
				Pub.innerHTML = '<B>&#160; &#160; &#160; Public Lists</B><P>&#160; Include: <INPUT name="my_lists|restrict" size="10" title="copy & paste here the list URL"><P>&#160; Exclude: <INPUT name="my_lists|exclude" size="10" title="copy & paste here the list URL">';
				with (document.getElementsByClassName("my_lists")[1]) {parentNode.insertBefore(Pub, nextSibling)}
				var PL = Pub.getElementsByTagName("input");
				for (i=0; i<PL.length; i++) {
					with (PL[i]) {
						addEventListener("change", function() {
							this.value = this.value.replace(/.+list\?l=(\d+).*/, "$1");
						}, false);
					}
				}
			}
			legacy();
		}
		break;
	case "/search/":
		var Select = document.getElementsByName("field");
		for (i=0; i<Select.length; i++) {
			Select[i].setAttribute("onChange", "this.nextSibling.nextSibling.focus()");
		}
		break;
	case "/search/text":
		if (LS) {
			var RHS = document.createElement("DIV");
			RHS.className = "aux-content-widget-2";		
			RHS.innerHTML = '<H3>Text Search</H3><A href="/search/text">Title and Name Text Searches</A>';
			try {
				$("sidebar").appendChild(RHS);
			}
			catch(err) {
				RHS.id = "sidebar";
				$("content-2-wide").appendChild(RHS);
			}
		}
		else {
			var Select = document.getElementsByName("field");
			for (i=0; i<Select.length; i++) {
				Select[i].setAttribute("onChange", "this.nextSibling.nextSibling.focus()");
			}
		}
		break;
	case "/search/name":
		if (LS) {
			results();
		}
		else {
			legacy();
			if (GM_getValue("job")) {
				job("filmography", "title");
			}
		}
		break;
	case "/search/common":
		if (GM_getValue("titletypes") && (!LS || LS.match("realm=name"))) {
			titletypes("main");
		}
		if (GM_getValue("job")) {
			if (!LS || LS == "?realm=title") {
				job("title1", "title");
				job("title2", "title");
			}
			if (!LS || LS.match("realm=name")) {
				if (LS.match("key")) {document.getElementsByName("roles")[0].id = "name1"}
				job("name1", "person");
				job("name2", "person");
			}
		}
		break;
	case "/find/preferences":
		function newOption(where, id, content) {
			var TR = document.createElement("TR");
			with (where.parentNode.parentNode) {parentNode.insertBefore(TR, nextSibling)}
			TR.innerHTML = content;
			if (id != "null") {$(id).checked = GM_getValue(id)}
		}
		newOption($("rs"), "import", '<TD valign="top"><INPUT type="checkbox" id="import"></TD><TD valign="top"><LABEL for="import"><SMALL>Option to import Advanced Title Search results into My Movies.</SMALL></LABEL></TD>');
		newOption($("rs"), "hide", '<TD valign="top"><HR style="margin-top:0"><INPUT type="checkbox" id="hide"></TD><TD valign="top"><HR style="margin-top:0"><LABEL for="hide"><SMALL>Option to hide details in Advanced Search results.</SMALL></LABEL></TD>');
		newOption($("at"), "char", '<TD valign="top"><INPUT type="checkbox" id="char"></TD><TD valign="top"><LABEL for="char"><SMALL>Include characters that don\'t have IMDb pages.</SMALL></LABEL></TD>');
		newOption($("at"), "null", '<TD colspan="2" bgcolor="#eeeeee"><B>"Characters" Search Behavior</B></TD>');
		newOption($("sc"), "public", '<TD valign="top"><INPUT type="checkbox" id="public"></TD><TD valign="top"><LABEL for="public"><SMALL>Interface for including/excluding public My Movies lists.</SMALL></LABEL></TD>');
		newOption($("sc"), "job", '<TD valign="top"><INPUT type="checkbox" id="job"></TD><TD valign="top"><LABEL for="job"><SMALL>Refinement by Cast/Crew Job in Advanced Search forms.</SMALL></LABEL></TD>');
		newOption($("sc"), "titletypes", '<TD valign="top"><INPUT type="checkbox" id="titletypes"></TD><TD valign="top"><LABEL for="titletypes"><SMALL>Refinement by Title Type in Two People Working Together forms.</SMALL></LABEL></TD>');
		newOption($("sc"), "keys", '<TD valign="top"><INPUT type="checkbox" id="keys"></TD><TD valign="top"><LABEL for="keys"><SMALL>Search category alternate shortcut keys.</SMALL></LABEL></TD>');
		newOption($("sc"), "focus", '<TD valign="top"><INPUT type="checkbox" id="focus"></TD><TD valign="top"><LABEL for="focus"><SMALL>Automatically set focus on the main search box when the page loads.</SMALL></LABEL></TD>');
		newOption($("sc"), "null", '<TD colspan="2" bgcolor="#eeeeee"><B>Search Forms</B></TD>');
		document.forms[1].addEventListener("submit", function() {
			var Options = new Array("hide", "import", "char", "focus", "keys", "titletypes", "job", "public");
			for (i in Options) {GM_setValue(Options[i], $(Options[i]).checked)}
			GM_setValue("adult", $("pn").checked);
		}, false);
		document.getElementsByTagName("h1")[0].innerHTML += ' <A target="_blank" href="http://userscripts.org/scripts/show/69686"><IMG src="http://i.media-imdb.com/images/resume/icon_help.gif" border="0"></A>';
}

if (LP.match(/workedwith$/)) {
	if (GM_getValue("titletypes")) {titletypes("tn15content")}
	if (GM_getValue("job")) {
		document.getElementsByName("roles")[0].id = "name1";
		job("name1", "person");
		job("name2", "person");
	}
}
else if (LP.match(/^\/list\//)) {
	var Desc = document.getElementsByClassName("desc")[0];
	if (Desc && Desc.innerHTML.match(/Titles|People/)) {
		var Realm = (Desc.innerHTML.match("Titles")) ? "Title" : "Name";
		var RHS = document.createElement("DIV");
		RHS.className = "aux-content-widget-2";
		RHS.innerHTML = '<H3>Advanced Search</H3><A href="/search/' + Realm.toLowerCase() + '#lists|restrict=' + LP.split("/")[2] + '">Advanced ' + Realm + ' Search with this list</A>'
		$("sidebar").appendChild(RHS);
	}
}
else if (LP.match(/^\/company\//)) {
	var RHS = document.createElement("DIV");
	with (RHS) {
		className = "aux-content-widget-2";
		setAttribute("style", "position: absolute; top: 130px; right: 20px");
		innerHTML = '<H3>Advanced Search</H3><A href="/search/title#companies=' + LP.split("/")[2] + '">Advanced Title Search with this company</A>';
	}
	with ($("pagecontent")) {
		style.position = "relative";
		appendChild(RHS);
	}
}
else if (LP.match(/^\/glossary\//)) {
	if (LP == "/glossary/") {
		var GG = document.createElement("DIV");
		GG.innerHTML = (<![CDATA[<P>Use this form to search the glossary via Google or jump directly to the term or the letter page:</P>
			<FORM target="_blank" method="get" action="http://www.google.com/search" id="GG">
			<INPUT type="hidden" name="sitesearch" value="www.imdb.com/glossary/">
			<SPAN style="width: 200px; position: relative">
			<INPUT name="q" id="q" maxlength="255" style="width: 200px; vertical-align: top">
			<IMG id="Load" title="Analysing..." style="position: absolute; right: 8px; bottom: 1px; visibility: hidden" src="data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==">
			</SPAN>
			<BUTTON id="Jump" class="linkasbutton-secondary" style="padding: 3.5px 6px; vertical-align: top">Jump to Term or Letter</BUTTON>
			<INPUT type="submit" value="Google Search &raquo;" class="linkasbutton-secondary" style="padding: 3.5px 6px; vertical-align: top"></FORM>]]>).toString();
		var FCA = document.getElementsByTagName("H3")[1];
		FCA.parentNode.insertBefore(GG, FCA);
		$("GG").addEventListener("submit", function(event) {
			if (!$("q").value) {
				event.stopPropagation();
				event.preventDefault();
			}
		}, false);
		$("Jump").addEventListener("click", function(event) {
			if ($("q").value) {
				function redirect(s) {
					window.location = s.split('<h3 class="r"><a href="')[1].split('"',1)[0].match(/http:\/\/www\.imdb\.com\/glossary\/\w/) + "?" + $("q").value;
				}
				$("Load").style.visibility = "visible";
				$("Jump").disabled = true;
				var GG1 = "http://www.google.com/search?sitesearch=www.imdb.com%2Fglossary%2F";
				var GG2 = "&q=" + $("q").value;
				GM_xmlhttpRequest({
					method: "GET",
					url: GG1 + $("q").value.charAt(0) + GG2,
					onload: function(response) {
						try {
							redirect(response.responseText);
						}
						catch(err) {
							GM_xmlhttpRequest({
								method: "GET",
								url: GG1 + GG2,
								onload: function(response) {
									try {
										redirect(response.responseText);
									}
									catch(err) {
										$("Load").style.visibility = "hidden";
										$("Jump").disabled = false;
										alert("Not found");
									}
								}
							});
						}
					}
				});
			}
			event.stopPropagation();
			event.preventDefault();
		}, false);
	}
	else if (LS) {
		var term = LS.split("?")[1].toLowerCase();
		if (Anchor = document.anchors.namedItem(term.replace(/%20|-/g, "_"))) {
			Anchor.scrollIntoView();
		}
		else {
			var Term = term.slice(0,1).toUpperCase() + term.slice(1).replace(/%20/g, " ");
			with (document.getElementsByTagName("H1")[0].parentNode) {
				var text = innerHTML.replace(/<[^>]+>/g, "");
				var termSearch = (text.match(Term)) ? new RegExp(Term + "(?![^<]*>)") : new RegExp(Term + "(?![^<]*>)", "i");
				innerHTML = innerHTML.replace(termSearch, '<span id="Term">' + text.match(termSearch) + '</span>');
			}
			$("Term").scrollIntoView();
		}
	}
}

document.getElementsByName("s")[0].setAttribute("onChange", "jumpMenu(this); suggestionsearch_dropdown_choice(this); document.getElementsByName('q')[0].focus()");
if (GM_getValue("focus") && LP != "/updates" && !LH) {
	document.getElementsByName("q")[0].focus();
}

if (GM_getValue("char")) {
	document.getElementsByName("s")[0].options[6].value = "char";
}

if (GM_getValue("keys")) {
	function cat(x) {
		document.getElementsByName("s")[0].selectedIndex = x;
		with (document.getElementsByName("q")[0]) {value = value.slice(value.indexOf("=") + 1)}
	}
	with (document.getElementsByName("q")[0]) {
		addEventListener("keypress", function() {
			if (value.charAt(1)=="=") {
				switch (value.slice(0,1).toLowerCase()) {
					case "t": cat(1); break; // Titles
					case "e": cat(2); break; // TV Episodes
					case "n": cat(3); break; // Names
					case "k": cat(5); break; // Keywords
					case "c": cat(6); break; // Characters
					case "v": cat(7); break; // Videos
					case "q": cat(8); break; // Quotes
					case "b": cat(9); break; // Bios
					case "p": cat(10);break; // Plots
				}
			}
			else if (value.charAt(2)=="=") {
				switch (value.slice(0,2).toLowerCase()) {
					case "tt": cat(1); break; // Titles
					case "ep": cat(2); break; // TV Episodes
					case "nm": cat(3); break; // Names
					case "co": cat(4); break; // Companies
					case "kw": cat(5); break; // Keywords
					case "ch": cat(6); break; // Characters
					case "vi": cat(7); break; // Videos
					case "qu": cat(8); break; // Quotes
					case "bi": cat(9); break; // Bios
					case "pl": cat(10);break; // Plots
				}
			}
		}, false);
	}
}