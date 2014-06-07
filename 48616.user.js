// ==UserScript==
// @name           Renweb Has Issues
// @namespace      jfrw09
// @description    Fixes Junk that Renweb is...
// @author         josh.23.french@gmail.com
// @include        http://renweb.com/*
// @include        http://*.renweb.com/*
// @include        https://*.renweb.com/*
// ==/UserScript==

// - Home page login form
// id: wrap
if(document.body.id == 'home'){
	// Add a login box
	wr = document.getElementById('wrap');
	frl = document.createElement('form');
	frl.method = 'post';
	frl.action = 'https://www.renweb.com/RenWeb/ParentsWeb/ValidateLogin.cfm ';
	frl.innerHTML = 'School&nbsp;ID:&nbsp;<input name="DISTRICT" value="' + GM_getValue('district', '') + '">&nbsp;Email:&nbsp;<input name="EMAIL">&nbsp;Password:&nbsp;<input name="PASSWORD" type="password">&nbsp;<input type="submit"  value="Parent Login" name="ParentLogin" /><input type="submit" value="Student Login" name="StudentLogin" /><input type="submit" value="Staff Login" name="StaffLogin" /><hr />';
	frl.addEventListener("submit", function(){GM_setValue('district', document.forms[0].elements.namedItem('DISTRICT').value);}, true);
	wr.parentNode.insertBefore(frl, wr);
	d = GM_getValue('district', '');
	if(d == ''){
		document.forms[0].elements.namedItem('DISTRICT').focus();
	} else {
		document.forms[0].elements.namedItem('DISTRICT').value = d;
		document.forms[0].elements.namedItem('EMAIL').focus();
	}
}
// - Done Home page login form

// - Fixing login
// url: https://www.renweb.com/login.htm
if(window.location.href == 'https://www.renweb.com/login.htm'){
	window.location.href = 'https://app2.renweb.com/Login4.cfm';
}
// - Done fixing login...

// - Autofocus to district code input
// input name: DISTRICT
if(window.location.href == 'https://app2.renweb.com/Login4.cfm'){
	d = GM_getValue('district', '');
	if(d == ''){
		document.forms[0].elements.namedItem('DISTRICT').focus();
	} else {
		document.forms[0].elements.namedItem('DISTRICT').value = d;
		document.forms[0].elements.namedItem('EMAIL').focus();
	}
}
// - Done autofocusing

// - Show/Hide Announcements
// id: AutoNumber2
// url: https://app2.renweb.com/renweb/parentsweb/MainMenuBody.cfm
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/MainMenuBody.cfm'){
	var annm, shElem;
	annm = document.getElementById('AutoNumber2');
	if (annm) {
		annm.style.display = 'none';
		shElem = document.createElement('a');
		shElem.id = 'shElem';
		shElem.href = '#';
		shElem.innerHTML = 'Toggle Announcements';
		shElem.addEventListener("click", function(){var e = document.getElementById('AutoNumber2');if(e.style.display == 'block'){e.style.display = 'none';}else{e.style.display = 'block';}}, true);
		annm.parentNode.insertBefore(shElem, annm);
	}
}
// - Done Show/Hide Announcements

// - Switch Calendars
// iframe: <iframe src="http://www.google.com/calendar/embed?src=blondiefbc%40gmail.com&ctz=America/New_York" style="border: 0" width="780" height="585" frameborder="0" scrolling="no"></iframe>
if(GM_getValue('district').toLowerCase() == 'fcs-de' && location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/MainMenuBody.cfm'){
	cal = GM_getValue('cal_type', 'g'); // initial calendar type...
	if(cal == 'g'){
		annm1 = document.getElementsByTagName("table");
		annm1[2].style.display = 'none';
		annm2 = document.getElementsByTagName("form");
		annm2[0].style.display = 'none';
		shElem = document.createElement('a');
		shElem.id = 'calElem';
		shElem.href = '#';
		shElem.innerHTML = 'Show Renweb Calendar';
		shElem.addEventListener("click", function(){GM_setValue('cal_type', 'r');document.location = location.href + '&'}, true);
		annm2[0].parentNode.insertBefore(shElem, annm2[0]);
		ifElem = document.createElement('iframe');
		ifElem.src = 'http://www.google.com/calendar/embed?src=blondiefbc%40gmail.com&ctz=America/New_York';
		ifElem.style.border = '0';
		ifElem.width = '780';
		ifElem.height = '400';
		ifElem.frameborder = '0';
		ifElem.scrolling = 'no';
		annm1[2].parentNode.insertBefore(ifElem, annm1[2]);
	} else {
		annm2 = document.getElementsByTagName("form");
		shElem = document.createElement('a');
		shElem.id = 'calElem';
		shElem.href = '#';
		shElem.innerHTML = 'Show Google Calendar';
		shElem.addEventListener("click", function(){GM_setValue('cal_type', 'g');document.location = location.href + '&'}, true);
		annm2[0].parentNode.insertBefore(shElem, annm2[0]);
	}
}
// - Done switching calendars

// - Single Student Schedules
// id: AutoNumber2
// url: https://app2.renweb.com/renweb/parentsweb/StudentSchedulesMenu.cfm
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/StudentSchedulesMenu.cfm'){
	var annm, hre;
	annm = document.getElementsByTagName("table");
	hre = document.getElementsByTagName("a")[0].href;
	if( annm[0].getElementsByTagName("tbody").length == 1 ){
		parent.location = hre;
	}
}
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/StudentScheduleBody.cfm'){
	k = document.createElement('a');
	k.href = '#';
	k.innerHTML = 'Back';
	k.style.position = 'absolute';
	k.style.right = '10px';
	k.style.top = '10px';
	k.id = 'backlink';
	k.addEventListener("click", function(){document.location = location.href.replace(/StudentScheduleBody/,"RenWebMainMenu")}, 1);
	// RenWebMainMenu
	document.body.appendChild(k, document.body);
	s = document.createElement('style');
	s.innerHTML = '@media print{#backlink{display: none;}}';
	document.body.appendChild(s, document.body);
}
// - Done Single Student Schedules

// - Single School Info
// id: AutoNumber2
// url: https://app2.renweb.com/renweb/parentsweb/StudentSchedulesMenu.cfm
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/SchoolInfoMenu.cfm'){
	var annm, hre;
	annm = document.getElementsByTagName("table");
	hre = document.getElementsByTagName("a")[0].href;
	if( annm[0].getElementsByTagName("tbody").length == 1 ){
		parent.location = hre;
	}
}
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/SchoolInfoBody.cfm'){
	k = document.createElement('a');
	k.href = '#';
	k.innerHTML = 'Back';
	k.style.position = 'absolute';
	k.style.right = '10px';
	k.style.top = '10px';
	k.id = 'backlink';
	k.addEventListener("click", function(){document.location = location.href.replace(/SchoolInfoBody/,"RenWebMainMenu")}, 1);
	// RenWebMainMenu
	document.body.appendChild(k, document.body);
	s = document.createElement('style');
	s.innerHTML = '@media print{#backlink{display: none;}}';
	document.body.appendChild(s, document.body);
}
// - Done Single School Info

// - Fix stupid logout page
// url: https://app2.renweb.com/renweb/parentsweb/RenWebLogoutFrame.cfm
if(location.href.slice( 0, location.href.indexOf('?') ) == 'https://app2.renweb.com/renweb/parentsweb/RenWebLogoutFrame.cfm'){
	document.location = 'http://www.renweb.com/';
}
// - Done logout page