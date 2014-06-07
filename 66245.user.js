// ==UserScript==
// @name           Nasza-klasa deductions
// @namespace      http://arkbow.fm.interia.pl/
// @description    This script makes some "deductions" and inserts its results on NK pages.
// @include        http://nk.pl/profile/*
// @version        0.2.3
// @author         (c) Arkadiusz Bokowy
// ==/UserScript==

var NKtip = {
//[name, surname, nick, city, age, sex, tel]
prof_tds: [false, false, false, false, false, false, false],
//[[type, start, stop, link, full_name], ...]; type = {'p', 'g', 'l', 't', 's'}
schools_info: [],

// using for school_finder() soft stop
run_school_finder: true,

// parse user info table on profile page
parse_prof_info_table: function() {
	var proftop = document.getElementById('profile_top');
	var infobox = proftop.getElementsByClassName('profile_info_box');
	NKtip.prof_tds[0] = infobox[0].tBodies[0].rows[0].cells[1]; //name
	NKtip.prof_tds[3] = infobox[0].tBodies[0].rows[0].cells[3]; //city
	NKtip.prof_tds[1] = infobox[0].tBodies[0].rows[1].cells[1]; //surname
	NKtip.prof_tds[4] = infobox[0].tBodies[0].rows[1].cells[3]; //age
	NKtip.prof_tds[2] = infobox[0].tBodies[0].rows[2].cells[1]; //nick
	NKtip.prof_tds[5] = infobox[0].tBodies[0].rows[2].cells[3]; //sex
	NKtip.prof_tds[6] = infobox[0].tBodies[0].rows[3].cells[3]; //tel
},

// return false if tds has 'ukryty' info, otherwise return true
test_prof_tds: function(tds) {
	if(tds.innerHTML == 'ukryty') return false;
	return true;
},

// add interesting informations to our table
add_school_info: function(out_table, schname, classname, classlink) {
	if(/Podstawowa/i.test(schname)) var schtype = 'p';
	else if(/Gimnazjum/i.test(schname)) var schtype = 'g';
	else if(/Liceum/i.test(schname)) var schtype = 'l';
	else if(/Technikum/i.test(schname)) var schtype = 't';
	else if(/Uniwersytet/i.test(schname)) var schtype = 'u';
	else return; //do not add not supported school types

	var years = classname.match(/(\d)+-(\d)+/g);
	if(!years) return;

	var dt = years[0].match(/(\d)+/g);

	// append this school info to out_table
	out_table.push([schtype, dt[0], dt[1], classlink, schname]);
},

// get user school listing and parse it (if available),
// it returns out_table = [[type, start, stop, link, full_name], ...]
get_schools_listing: function(out_table) {
	var list = document.getElementById('schools_max');
	if(!list) return false; //return false if schools are hidden

	// parse schools datas
	var schools = list.getElementsByClassName('school');
	for (x in schools) {
		var schinf = schools[x];
		if(schinf.nodeName != 'LI') continue; //get only 'li' elements

		// get school name (on error continue <- special school, i.e. WOSP)
		try {var schname = schinf.getElementsByClassName('school')[0].innerHTML;}
		catch(e) {continue;}

		// get class listing (INFO: user_class not guest_class)
		var classes = schinf.getElementsByClassName('user_class');
		for (y in classes) {
			var classname = classes[y].innerHTML;
			var classlink = classes[y].href;

			// add school info to our info table
			NKtip.add_school_info(out_table, schname, classname, classlink);
		}
	}
	if(out_table.length != 0) return true; //we've got data, so return true
	return false;
},

// get user listing from school page and parse it (if available),
// it returns out_table = [[uid, user_name], ...]
get_user_listing: function(out_table) {
	var list = document.getElementById('dziennik');
	if(!list) return false; //return false (maybe it's not school page)

	// parse users datas
	var users = list.getElementsByClassName('student_link');
	for (x in users) {
		var usrinfo = users[x];
		var uid = usrinfo.href.replace(/.*\//, ''); //user's profile ID
		var uname = usrinfo.innerHTML;

		// append this user info to out_table
		out_table.push([uid, uname]);
	}

	if(out_table.length != 0) return true; //we've got data, so return true
	return false;
},

// calculate age based on schools and display it
deduct_age: function() {
	var born = [];
	for (x in NKtip.schools_info) {
		var schinf = NKtip.schools_info[x];
		var by = 0;

		switch(schinf[0]){
		case 'p':
			//**if(schinf[2] - schinf[1] == 3)
			//**	by = schinf[1] - 7; OR by = schinf[1] - 10
			if(schinf[2] - schinf[1] == 6) by = schinf[1] - 7;
			if(schinf[2] - schinf[1] == 8) by = schinf[1] - 7;
			break;
		case 'g':
			if(schinf[2] - schinf[1] == 3) by = schinf[1] - 13;
			break;
		case 'l':
			if(schinf[2] - schinf[1] == 3) by = schinf[1] - 16;
			if(schinf[2] - schinf[1] == 4) by = schinf[1] - 15;
			break;
		case 't':
			if(schinf[2] - schinf[1] == 4) by = schinf[1] - 16;}

		if(by != 0) born.push(by);
	}
	if(born.length == 0) return; //when years were wrong

	var note = '';
	born.sort(function (a,b) { return a-b }); //sort numerically
	if(born[0] != born[born.length - 1])
		note = ' ?'; //note that something is wrong

	// display age in profile info
	today = new Date();
	NKtip.prof_tds[4].innerHTML = 1900 + today.getYear() - born[0] + note;
},

// add 'Try to find schools' to school listing box
add_school_finder: function() {
	var empty_class = document.getElementsByClassName('empty_box_info');
	for (x in empty_class)
		if(empty_class[x].innerHTML == 'szkoły ukryte'){
			// insert native NK schools div
			empty_class[x].parentNode.innerHTML
					= '<div id="NKtip_schools_max" style="display:block;">'
			break;}

	var list = document.getElementById('NKtip_schools_max');
	list.innerHTML = '<a href="javascript: void(0)">Try to find schools</a>';

	// register click event to our link
	list.childNodes[0].addEventListener('click', NKtip.school_finder, false);

	NKtip.run_school_finder = true; //allow school_finder to run
},

// stop schools finder loop
stop_finder: function() {
	NKtip.run_school_finder = false;
},

// schools finder ^^ (DO NOT edit it unless you know how it works!)
school_finder: function() {
	// make div for friend's profile
	var body = document.getElementsByTagName("body").item(0);
	var bufferdiv = document.createElement("div");
	bufferdiv.id = 'NKtip_dwbuffer';
	bufferdiv.style.cssText = 'display:none;';
	//NOTE: we need it at the document's beginning! There will be two the same
	//      IDs 'schools_max', but we have to catch newer one - the first one!
	body.insertBefore(bufferdiv, body.childNodes[0]);

	var progressdiv = null;
	var tablediv = null;

	// profile ID of user under investigation
	var userID = "" + window.location;
	userID = userID.replace(/.*\//, '');

	var friends_data = []; //friends info (.UID -> users' ID table)
	var schools_info = []; //filled in by get_schools_listing()
	var uid_counter = -1;
	var sch_counter = false;
	var fetch_stop = false;
	function fetch_users_schools(response) {
		if(fetch_stop === true && sch_counter === false
				|| NKtip.run_school_finder === false) {
			// no more profiles and schools to fetch -> clear mess we've done
			bufferdiv.parentNode.removeChild(bufferdiv);
			progressdiv.parentNode.removeChild(progressdiv);
			stopdiv.parentNode.removeChild(stopdiv);
			tablediv.parentNode.id = 'schools_max';

			// we've got new stuff so refresh deductions :)
			NKtip.init();
			return;
		}

		if(uid_counter != -1) { //skip only on initialization
			// get only BODY; strip all scripts and src - we don't want to load it
			var sl_text = response.responseText.replace(/\n/g, '');
			sl_text = sl_text.replace(/.*<body>/i, '').replace(/<\/body>.*/i, '');
			sl_text = sl_text.replace(/src="[^"]+"/g, 'src=""');
			sl_text = sl_text.replace(/<script/ig, '<#').replace(/<\/script>/ig, '<\/#>');
			sl_text = sl_text.replace(/<#[^#]*<\/#>/g, '');

			// add DocumentFragment to document, because we need its methods!
			var profile = HTMLParser(sl_text);
			bufferdiv.innerHTML = ''; //clear node before append
			bufferdiv.appendChild(profile);
		}

		if(sch_counter !== false) { //processing fetched school
			var users_info = [];
			if(NKtip.get_user_listing(users_info)) //we've got school's users
				for (x in users_info)
					if(users_info[x][0] == userID) //we found user's school!
						add_school_to_table(schools_info[sch_counter - 1]);

			// no more schools to fetch -> back to fetching profiles
			if(sch_counter == schools_info.length) sch_counter = false;
		}
		else if(uid_counter != -1) { //processing fetched profile
			// if we've got user's schools fetch them
			schools_info = [];
			if(NKtip.get_schools_listing(schools_info)) sch_counter = 0;

			// no more friends -> stop fetching (but fetch last user's schools!)
			if(uid_counter + 1 == friends_data.UID.length) fetch_stop = true;
		}

		//NOTE: asynchronous XMLRequests!
		if(sch_counter !== false) { //get next school
			GM_xmlhttpRequest({method: 'GET',
				url: schools_info[sch_counter++][3], onload: fetch_users_schools});
			var progress = uid_counter/friends_data.UID.length*100
					+ (sch_counter - 1)/schools_info.length*100/friends_data.UID.length;
		}
		else { //get next profile
			GM_xmlhttpRequest({method: 'GET',
				url: 'http://nk.pl/profile/' + friends_data.UID[++uid_counter],
				onload: fetch_users_schools});
			var progress = uid_counter/friends_data.UID.length*100;
		}

		// update progress indicator
		progressdiv.innerHTML = 'Progress: ' + progress.toFixed(2) + '% ';
	}

	var matched_schools = [];
	function add_school_to_table(schinfo) {
		// add school info to table only if it is not already there
		var itis = false;
		for(x = 0; x < matched_schools.length; x++)
			if(matched_schools[x] == schinfo[3]){itis = true; break}
		if(!itis) {
			matched_schools.push(schinfo[3]);

			var classlink = schinfo[3].replace(/.*klasa.pl/, '');
			var schoolink = classlink.replace(/\/\d+$/, '');
			tablediv.innerHTML += '<li class="school"><div class="school_name">'
				+ '<a class="school" href="' + schoolink + '">' + schinfo[4] + '</a></div>'
				+ '<ul class="classes user_school_classes"><li><a class="user_class" href="'
				+ classlink + '">Klasa X (' + schinfo[1] + '-' + schinfo[2] + ')</a></li></ul></li>';
		}
	}

	// make DOM struct for schools table and progress indicator
	var list = document.getElementById('NKtip_schools_max');
	list.innerHTML = '<span id="NKtip_progress">Progress: 0.00% </span>'
			+ '<a href="javascript: void(0)">STOP</a>'
			+ '<ul class="schools user_schools"></ul>';
	progressdiv = list.childNodes[0];
	stopdiv = list.childNodes[1];
	tablediv = list.childNodes[2];

	// register click event to our STOP link
	stopdiv.addEventListener('click', NKtip.stop_finder, false);

	// get user's friends listing (asynchronous request)
	var auth = getCookie('basic_auth');
	GM_xmlhttpRequest({method: 'GET',
		url: 'http://nk.pl/friends_list/' + userID + '/1?t=' +auth,
		onload: function(response) {
			friends_data = eval('(' + response.responseText + ')');

			// initialize fetching users' profiles
			fetch_users_schools(null);
		}
	});
},

init: function() {
	NKtip.parse_prof_info_table();

	// get school listing form current profile
	var isschoolOK = NKtip.get_schools_listing(NKtip.schools_info);

	// add school finder link
	if(!isschoolOK) NKtip.add_school_finder();

	if(isschoolOK && !NKtip.test_prof_tds(NKtip.prof_tds[4]))
		NKtip.deduct_age(); //calculate age based on schools

}
}

function HTMLParser(aHTMLString) {
	var range = document.createRange();
	range.selectNode(document.body);
	return range.createContextualFragment(aHTMLString);
}

function getCookie(cookieName) {
	var exp = new RegExp(escape(cookieName) + '=([^;]+)');
	if(exp.test(document.cookie + ";")){
		exp.exec(document.cookie + ";");
		return unescape(RegExp.$1);}
	return false;
}

NKtip.init();
