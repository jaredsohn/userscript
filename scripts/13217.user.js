// ==UserScript==
// @name           Cambridge Library Search
// @namespace      cam.ac.uk
// @description    Provides a link to search Cambridge University's libraries wherever an ISBN or ISSN is displayed.
// @version 0.1    Not fully tested but appears to work
// @version 0.2    Support for non-plain-text; should work universally
// @version 0.3    Support for textareas
// @version 0.31   Fix some forms
// @version 0.4     Support for CSL fetching
// @include        *
// ==/UserScript==

//Read document to memory
txt = document.body.innerHTML;

if (/^http:\/\/www\.lib\.cam\.ac\.uk\/ejournals_list\/\?V=1\.0&N=100&L=TF5LU9YM5N&S=I_M&C=/i.test(window.location.href)) {//ejournals list
} else if (/^http:\/\/ucat-newton\.lib\.cam\.ac\.uk\/cgi-bin\//i.test(window.location.href)) {//catalogue results
	csl = /Central Science Library/i
	if (csl.test(txt)) {
		jTitle = /<BDO dir="LTR">([^<]*)<\/BDO>/i;
		jClassMark = /Classmark:<\/TH>[\n\r\s]*<TD dir="ltr">[\s\n\r]*([^<]*)/i;
		txt=txt.replace(csl, "Central Science Library <small><a href=http://www.lib.cam.ac.uk/SPL/fetch3.htm?GM_title=" + jTitle.exec(txt)[1].replace(/[\s\.]/g, "+") + "&GM_classmark=" + jClassMark.exec(txt)[1] + ">[order]</a></small>");
	}
} else if (/^http:\/\/www\.lib\.cam\.ac\.uk\/SPL\/fetch3\.htm\?GM_/i.test(window.location.href)) {//CSL fetching page
	params = /GM_title=(.*)&GM_classmark=(.*)/;
	jParam = params.exec(window.location.href);
	document.getElementsByName("Title of journal to be fetched")[0].value = jParam[1].replace(/\+/g, " ");
	txt=txt.replace(/Title of journal to be fetched=/, "Title of journal to be fetched=" + jParam[1].replace(/\+/g, " "));
	document.getElementsByName("Classmark")[0].value = jParam[2];
	txt=txt.replace(/Classmark=/, "Classmark=" + jParam[2]);
	now = new Date();
	document.getElementsByName("Date")[0].value = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
	txt=txt.replace(/Todays date=/, "Todays date=" + now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear());
} else {
	textarea = /<textarea(?! leftbyGM)[\s\S]*<\/textarea>/i
	textareas = new Array();
	for (var i = 0; txt.search(textarea) > 0; i++) {
		oMatch = txt.match(textarea);
		if (oMatch[0].match(/\b(e?issn(?=[^>]*<)(?:[^<]|<[^>]*>)*?(\d{4})[\-\s]?([\dx]{4}))/ig)||oMatch[0].match(/\b(isbn(?=[^>]*<)(?:\W|<[^>]*>)*(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?([\dx]+))/ig)) {
			textareas.push(txt.match(textarea));
			txt = txt.replace(textarea, "@@@TextAreaRemovedByGM_Script@@@");
		} else txt=txt.replace(textarea, oMatch[0].replace(/textarea/, "textarea leftbyGM"));

	}

	issn = /\b(e?issn(?=[^>]*<)(?:[^<]|<[^>]*>)*?(\d{4})[\-\s]?([\dx]{4}))/ig;
	if (issn.test(txt)) txt = txt.replace(issn, "$1<small>&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISSN+%22$2-$3%22&Search_Code=CMD&CNT=10'>[Find]</a>&nbsp;<a href=http://www.lib.cam.ac.uk/ejournals_list/?V=1.0&N=100&L=TF5LU9YM5N&S=I_M&C=$2-$3>[Online]</a></small>");

	isbn = /\b(isbn(?=[^>]*<)(?:\W|<[^>]*>)*(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?([\dx]+))/ig;
	if (isbn.test(txt)) txt = txt.replace(isbn, "$1&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISBN+%22$2$3$4$5$6%22&Search_Code=CMD&CNT=10'>[Find]</a>");

	for (var i = 0, j=textareas.length; i<j; i++) {
		txt = txt.replace(/@@@TextAreaRemovedByGM_Script@@@/, textareas[i]);
	}
}

//if content changed, print to page.
if (txt != document.body.innerHTML) document.body.innerHTML = txt;


//Read document to memory
txt = document.body.innerHTML;

if (/^http:\/\/www\.lib\.cam\.ac\.uk\/ejournals_list\/\?V=1\.0&N=100&L=TF5LU9YM5N&S=I_M&C=/i.test(window.location.href)) {//ejournals list
} else if (/^http:\/\/ucat-newton\.lib\.cam\.ac\.uk\/cgi-bin\//i.test(window.location.href)) {//catalogue results
	csl = /Central Science Library/i
	if (csl.test(txt)) {
		jTitle = /<BDO dir="LTR">([^<]*)<\/BDO>/i;
		jClassMark = /Classmark:<\/TH>[\n\r\s]*<TD dir="ltr">[\s\n\r]*([^<]*)/i;
		txt=txt.replace(csl, "Central Science Library <small><a href=http://www.lib.cam.ac.uk/SPL/fetch3.htm?GM_title=" + jTitle.exec(txt)[1].replace(/[\s\.]/g, "+") + "&GM_classmark=" + jClassMark.exec(txt)[1] + ">[order]</a></small>");
	}
} else if (/^http:\/\/www\.lib\.cam\.ac\.uk\/SPL\/fetch3\.htm\?GM_/i.test(window.location.href)) {//CSL fetching page
	params = /GM_title=(.*)&GM_classmark=(.*)/;
	jParam = params.exec(window.location.href);
	document.getElementsByName("Title of journal to be fetched")[0].value = jParam[1].replace(/\+/g, " ");
	document.getElementsByName("Classmark")[0].value = jParam[2];
	now = new Date();
	document.getElementsByName("Date")[0].value = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
} else {
	textarea = /<textarea(?! leftbyGM)[\s\S]*<\/textarea>/i
	textareas = new Array();
	for (var i = 0; txt.search(textarea) > 0; i++) {
		oMatch = txt.match(textarea);
		if (oMatch[0].match(/\b(e?issn(?=[^>]*<)(?:[^<]|<[^>]*>)*?(\d{4})[\-\s]?([\dx]{4}))/ig)||oMatch[0].match(/\b(isbn(?=[^>]*<)(?:\W|<[^>]*>)*(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?([\dx]+))/ig)) {
			textareas.push(txt.match(textarea));
			txt = txt.replace(textarea, "@@@TextAreaRemovedByGM_Script@@@");
		} else txt=txt.replace(textarea, oMatch[0].replace(/textarea/, "textarea leftbyGM"));

	}

	issn = /\b(e?issn(?=[^>]*<)(?:[^<]|<[^>]*>)*?(\d{4})[\-\s]?([\dx]{4}))/ig;
	if (issn.test(txt)) txt = txt.replace(issn, "$1<small>&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISSN+%22$2-$3%22&Search_Code=CMD&CNT=10'>[Find]</a>&nbsp;<a href=http://www.lib.cam.ac.uk/ejournals_list/?V=1.0&N=100&L=TF5LU9YM5N&S=I_M&C=$2-$3>[Online]</a></small>");

	isbn = /\b(isbn(?=[^>]*<)(?:\W|<[^>]*>)*(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?([\dx]+))/ig;
	if (isbn.test(txt)) txt = txt.replace(isbn, "$1&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISBN+%22$2$3$4$5$6%22&Search_Code=CMD&CNT=10'>[Find]</a>");

	for (var i = 0, j=textareas.length; i<j; i++) {
		txt = txt.replace(/@@@TextAreaRemovedByGM_Script@@@/, textareas[i]);
	}
}

//if content changed, print to page.
if (txt != document.body.innerHTML) document.body.innerHTML = txt;
