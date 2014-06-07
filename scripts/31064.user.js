// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "irishrail accessibility remediation", and click Uninstall.
//
//--------------------------------------------------------------------------------------------------------------
// WHAT IT DOES:
// Client side remediation for www.irishirail.ie:
// 1. Set the language of the web site. (lang="en")
// 2. Add null alt text to images used as spacer or decoration ("space.gif","sitemap_arrow.gif","sitemap_bullet.gif")
// 3. Change the title bar image to text("Reservation&Times","Fare Deals","Travel Alerts&News")
// 4. Change the navigate bar images to text.("Home Page","My Account"...)
// 5. Add alt text for images without alt-text. (Fare Deals advertisement, process to reservation). And fix some improper alt-text.
// 6. Add "title" attribute to image links
// 7. Change the color of the web site to provide sufficient contrast
// 8. Add accesskey to focus on search field (accesskey='0'), accesskey to submit search(accesskey='9')
// 9. Add accesskey to focus on the first item of form (accesskey='1'), accesskey for submit form in all steps of booking ticket (accsskey='2')
// 10. Add key event handlers in stations selection asp page, let pressing 'enter' key has same function as double click
// 11. Add prompt text for date selection input, since only this format can be accepted by server (dd-mm-yyyy)
// 12. Add a access bar which provide all the accesskeys.
// 13. Add label or title attribute for form elements, and group them to make the forms more accessible for screen reader users. (to be improved).
// 14. Add "Skip Navigation" link to skip navigation links.
//---------------------------------------------------------------------------------------------------------------

// ==UserScript==
// @name          irishrail accessibility remediation 
// @namespace     http://www.dcu.ie
// @description  correct some web accessibility problem on www.irishrail.ie
// @version		1.7
// @include        http://irishrail.ie/*
// @include        http://www.irishrail.ie/*
// @include        https://www.irishrail.ie/*
// ==/UserScript==

// ****set the language of the web****
function addLanguageInfo() {
	var html = document.getElementsByTagName('html')[0];
	if (html && !html.lang)
		html.lang = "en";
}

// **** alt-text remediation ****
function fixImages() {
	// ***fix images as advertisement
	// since images as advertisement are changeable. We shouldn't get the
	// element by images' name.
	var adArea = document.getElementById("home-middle-panel");
	if (adArea) {
		var eles1 = adArea.childNodes;
		for ( var i = 0; i < eles1.length; i++) {
			var ele1 = eles1[i];
			if (ele1.tagName == "P") {
				eles2 = ele1.childNodes;
				for ( var j = 0; j < eles2.length; j++) {
					ele2 = eles2[j];
					if (ele2.tagName == "A") {
						var ad = ele2.firstChild;
						if (ad.tagName == "IMG" && !ad.alt) {
							ad.alt = 'Fare Deals Advertisement';
						}
					}
					if (ele2.tagName == 'IMG' && !ele2.alt) {
						ele2.alt = 'Fare Deals Advertisement Picture';
					}
				}
			}
		}
	}

	var images, image;
	images = document.getElementsByTagName('img');
	for ( var i = 0; i < images.length; i++) {
		image = images[i];

		var string = image.src;
		var s = string.substring(string.lastIndexOf("/") + 1, string
				.lastIndexOf("."));

		// ****fix images as spacer****
		if (s == "arrow" || s == "sitemap_arrow" || s == "spacer"
				|| s == "sitemap_bullet"){
				image.alt = "";
		}
		// images as tiltle
		else if (s == "proceed_to_reservations")
			image.alt = "Go to Reservations";
		// seat type "P" "S" and "T"
		else if (s == "p")
			image.alt = "P";
		else if (s == "s")
			image.alt = "S";
		else if (s == "t")
			image.alt = "T";
		// continue button
		else if (s == "continue")
			image.alt = "Continue";

		// title of columns in main page
		else if (s == "grey_bar") {
			var td = image.parentNode;
			var tr = td.parentNode;
			var td1 = document.createElement('td');
			tr.replaceChild(td1, td);

			var td2 = document.createElement('th');
			td2.textContent = "Reservation&Times";
			td2.className = "title1";
			tr.insertBefore(td2, td1.nextSibling);

			var td3 = document.createElement('td');
			tr.insertBefore(td3, td2.nextSibling);

			var td4 = document.createElement('th');
			td4.textContent = "Fare Deals";
			td4.className = "title1";
			tr.insertBefore(td4, td3.nextSibling);

			var td5 = document.createElement('td');
			tr.insertBefore(td5, td4.nextSibling);

			var td6 = document.createElement('th');
			td6.textContent = "Travel Alerts&News";
			td6.className = "title1";
			tr.insertBefore(td6, td5.nextSibling);
		}

		// **** Add 'title' attribute to image links
		var a = image.parentNode;
		if (a && (a.tagName == "A" || a.tagName == "a")) {
			// add title attribute
			a.setAttribute("title", image.alt);
		}

	}
}

// ****use text rather than graphical representation****
function replaceImage2Text() {
	var allLinks, myAccount;
	allLinks = document
			.evaluate(
					'//a[@href="https://www.irishrail.ie/seat_reservation/my_account.asp"]',
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	for ( var i = 0; i < allLinks.snapshotLength; i++) {
		myAccount = allLinks.snapshotItem(i);
		if (myAccount) {
			var td = myAccount.parentNode;
			td.innerHTML = '<a class="nav" href="../home/" title="Home">Home Page</a><br/><br/>' 
				+ '<a class="nav" href="https://www.irishrail.ie/seat_reservation/my_account.asp" title="My Account">My Account</a><br/><br/>' 
				+ '<a class="nav" href="../your_journey/printed_timetables.asp" title="Printed Timetables">Printed Timetables</a><br/><br/>' 
				+ '<a class="nav" href="../home/company_information.asp" title="Company Information">Company Information</a>'
				+ '<div id="skip">';
		}

	}
}

// ****use text rather than graphical representation****
function fixImageAsButton() {
	var images, image;
	images = document.evaluate('//img[@alt="select stations"]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0; i < images.snapshotLength; i++) {
		image = images.snapshotItem(i);
		if (image) {
			var stations = image.parentNode;
			stations.setAttribute('class', 'mybutton');
			stations.removeChild(stations.firstChild);
			stations.textContent = 'Stations';
		}
	}

	images = document.evaluate('//img[@alt="select map"]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0; i < images.snapshotLength; i++) {
		image = images.snapshotItem(i);
		if (image) {
			var maps = image.parentNode;
			maps.setAttribute('class', 'mybutton');
			maps.removeChild(maps.firstChild);
			maps.textContent = 'Maps';
		}
	}

	images = document.evaluate('//img[@alt="Submit"]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0; i < images.snapshotLength; i++) {
		image = images.snapshotItem(i);
		if (image) {
			var submit = image.parentNode;
			submit.setAttribute('class', 'mybutton');
			submit.removeChild(submit.firstChild);
			submit.textContent = 'Submit';
		}
	}
}

// ****add accesskey to search bar (accesskey = 0--focus on search field;
// accesskey = 2----submit to search) , also add 'title' attributes for searchfield ****.
function fixSearchBar() {
	var searchInput = document.getElementsByName('search')[0];
	if (searchInput) {
		searchInput.id = "searchbar";
		searchInput.setAttribute("accesskey", "0");
		// add "title" attribute to input field
		searchInput.setAttribute("title",
				"Please input the content you want to search");
		// var searchLabel = document.createElement('label');
		// searchLabel.setAttribute("for", "searchbar");
		// searchLabel.setAttribute("class", "mylabel");
		// searchLabel.textContent = "Please input the content you want to search";
		// searchInput.parentNode.insertBefore(searchLabel, searchInput);

	}
	// submit
	var links = document.evaluate('//a[@href="javascript:submitSearch()"]',
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (links) {
		var searchgo = links.snapshotItem(0);
		if (searchgo) {
			searchgo.setAttribute('accesskey', '9');
			searchgo.removeChild(searchgo.firstChild);
			searchgo.setAttribute('class', 'mybutton')
			searchgo.textContent = 'GO'
		}
	}
}


// ****add accesskey to focus on first item of form(accesskey='1'), and submitform(accesskey='2'), 
//also add 'label' elements or 'title' attributes for elements in forms.****
function fixForm() {
	// ****First step (Home page)
	// set the focus on first input field (from station)
	var fromStation = document.getElementsByName('txtFromStation')[0];
	if (fromStation && fromStation.type != 'hidden') {
		// make sure fromStation input have 'id'. Since there is no 'id'
		// attribute for it in SR page.
		fromStation.id = 'txtFromStation';
		fromStation.setAttribute("accesskey", "1");
		fromStation.setAttribute("title","Please input the station you depart from");
		
		// home page
		var links = document.evaluate('//a[@href="javascript:Go()"]', document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (links) {
			var go = links.snapshotItem(0);
			if (go) {
				go.setAttribute('accesskey', '2');
			}
		}
		
		// Screen Reader Friendly page
		var submit4SR = document.getElementsByName('cmdSubmit3')[0];
		if (submit4SR) {
			submit4SR.setAttribute('accesskey', '2');
		}

		// add label to other elements in form
		// to station input
		var toStation = document.getElementById('txtToStation');
		if (toStation) {
			toStation.setAttribute("title","Please input the station you want go to");
		}

		// time of train (home page)
		var temp = document.evaluate('//select[@class="tt_search"]', document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (temp) {
			for ( var i = 0; i < temp.snapshotLength; i++) {
				var time = temp.snapshotItem(i);
				if(time.name!="NumPass")
					time.setAttribute("title","Please select the time suitable for you");
			}
		}

		// timetables only or reservations
		var timetablesOnly = document.getElementsByName('timetables')[0];
		if (timetablesOnly) {
			timetablesOnly.setAttribute("title","Select for search timetables only");
		}
		var reservations = document.getElementsByName('reservations')[0];
		if (reservations) {
			reservations.setAttribute("title","Select reservations for");
		}

		// ****Screen Reader Friendly page
		// all trains or direct trains only
		temp = document.evaluate('//input[@value="all"]', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (temp) {
			for ( var i = 0; i < temp.snapshotLength; i++) {
				var allTrains = temp.snapshotItem(i);
				allTrains.setAttribute("title","All trains");
			}
		}

		temp = document.evaluate('//input[@value="direct"]', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (temp) {
			for ( var i = 0; i < temp.snapshotLength; i++) {
				var directTrains = temp.snapshotItem(i);
				directTrains.setAttribute("title","Direct trains only");
			}
		}

		// day and month of out and return date
		var date = document.getElementsByName('OutSelectDate')[0];
		if(date){
			date.setAttribute("title","Please input the departing date");
		}
		var returnDate = document.getElementsByName('ReturnSelectDate')[0];
		if(returnDate){
			returnDate.setAttribute("title","Please input the return date");
		}
		
		var day = document.getElementById('OutSelectDay');
		if (day) {
			var dayLabel = document.createElement('label');
			dayLabel.setAttribute("for", "OutSelectDay");
			dayLabel.setAttribute("class", "mylabel");
			dayLabel.textContent = "Day of departing date";
			day.parentNode.insertBefore(dayLabel, day);	
		}
		var month = document.getElementById('OutSelectMonth');
		if (month) {
			var monthLabel = document.createElement('label');
			monthLabel.setAttribute("for", "OutSelectMonth");
			monthLabel.setAttribute("class", "mylabel");
			monthLabel.textContent = "Month of departing date";
			month.parentNode.insertBefore(monthLabel, month);
		}
		var retrunDay = document.getElementById('RtnSelectDay');
		if (retrunDay) {
			var retrunDayLabel = document.createElement('label');
			retrunDayLabel.setAttribute("for", "RtnSelectDay");
			retrunDayLabel.setAttribute("class", "mylabel");
			retrunDayLabel.textContent = "Day of return date";
			retrunDay.parentNode.insertBefore(retrunDayLabel, retrunDay);
		}
		var retrunMonth = document.getElementById('RtnSelectMonth');
		if (retrunMonth) {
			var retrunMonthLabel = document.createElement('label');
			retrunMonthLabel.setAttribute("for", "RtnSelectMonth");
			retrunMonthLabel.setAttribute("class", "mylabel");
			retrunMonthLabel.textContent = "Month of return date";
			retrunMonth.parentNode.insertBefore(retrunMonthLabel, retrunMonth);	
		}

		// check box for departing or arriving
		temp = document.evaluate('//input[@value="D"]', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (temp) {
			for ( var i = 0; i < temp.snapshotLength; i++) {
				var depart = temp.snapshotItem(i);
				depart.setAttribute("title","Departing");
			}
		}
		temp = document.evaluate('//input[@value="A"]', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (temp) {
			for ( var i = 0; i < temp.snapshotLength; i++) {
				var arrive = temp.snapshotItem(i);
				arrive.setAttribute("title","Arriving");
			}
		}

		// from time and to time
		var fromTime = document.getElementById('OutFromTime');
		if (fromTime) {
			var fromTimeLabel = document.createElement('label');
			fromTimeLabel.setAttribute("for", "OutFromTime");
			fromTimeLabel.setAttribute("class", "mylabel");
			fromTimeLabel.textContent = "Select begin time";
			fromTime.parentNode.insertBefore(fromTimeLabel, fromTime);
		}
		var toTime = document.getElementById('OutToTime');
		if (toTime) {
			var toTimeLabel = document.createElement('label');
			toTimeLabel.setAttribute("for", "OutToTime");
			toTimeLabel.setAttribute("class", "mylabel");
			toTimeLabel.textContent = "Selelct end time";
			toTime.parentNode.insertBefore(toTimeLabel, toTime);
		}
		var returnFromTime = document.getElementById('RtnFromTime');
		if (returnFromTime) {
			var returnFromTimeLabel = document.createElement('label');
			returnFromTimeLabel.setAttribute("for", "RtnFromTime");
			returnFromTimeLabel.setAttribute("class", "mylabel");
			returnFromTimeLabel.textContent = "Select begin time";
			returnFromTime.parentNode.insertBefore(returnFromTimeLabel,returnFromTime);
		}
		var returnToTime = document.getElementById('RtnToTime');
		if (returnToTime) {
			var returnToTimeLabel = document.createElement('label');
			returnToTimeLabel.setAttribute("for", "RtnToTime");
			returnToTimeLabel.setAttribute("class", "mylabel");
			returnToTimeLabel.textContent = "Selelct end time";
			returnToTime.parentNode.insertBefore(returnToTimeLabel,returnToTime);
		}
		
		// checkbox for return journey
		var needReturn = document.getElementsByName('RadioRetReqd')[0];
		if (needReturn)
			needReturn.setAttribute("title","Return journey required");
	
		var reservation = document.getElementById('RadioReserve');
		if(reservation)
			reservation.setAttribute("title","Check Availability for Seat Reservation");
		
		// select number of passengers
		var number = document.getElementsByName('NumPass')[0];
		if (number) {
			number.id = 'NumPass';
			var numberLabel = document.createElement('label');
			numberLabel.setAttribute("for", "NumPass");
			numberLabel.setAttribute("class", "mylabel");
			numberLabel.textContent = "Please choose number of passagers";
			number.parentNode.insertBefore(numberLabel, number);
		}
		return;
	}

	// ****Second step (select trains:
	// http://www.irishrail.ie/your_journey/timetables_junction1.asp)
	// set the focus on first checkbox1
	if(URL=="https://www.irishrail.ie/your_journey/timetables_junction1.asp"||URL=="http://www.irishrail.ie/your_journey/timetables_junction1.asp"){
		var allCheckbox, checkbox1;
		allCheckbox = document.evaluate("//input[@type='checkbox']", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (allCheckbox) {
			checkbox1 = allCheckbox.snapshotItem(0);
			if (checkbox1) {
				checkbox1.setAttribute('accesskey', '1');
				// submit
				var links = document.evaluate(
						'//a[@href="javascript:ValidateAllReservations() ;"]',
						document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
				if (links) {
					var process = links.snapshotItem(0);
					if (process) {
						process.setAttribute('accesskey', '2');
					}
				}
			}
			// add title attribute to all checkbox to give proper prompt to them 
			for( var i = 0; i < allCheckbox.snapshotLength; i++){
				var checkbox = allCheckbox.snapshotItem(i);
				var hiddenInfo = checkbox.nextSibling.nextSibling;
				checkbox.setAttribute('title',hiddenInfo.value);
			}
		}
		
	}
	
	// *** Third step (select ticket type)
	var select1 = document.getElementsByName('pxticket')[0];
	if (select1) {

		select1.setAttribute('accesskey', '1');
		// submit
		var links = document.evaluate(
				'//a[@href="javascript:Continue(\'1\')"]', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (links) {
			var autoseat = links.snapshotItem(0);
			if (autoseat) {
				autoseat.setAttribute('accesskey', '2');
			}
		}
		return;
	}

	// *** Fourth step (log in)
	var firstname = document.getElementsByName('firstname')[0];
	if (firstname) {
		firstname.setAttribute('accesskey', '1');
		return;
	}
	var email = document.getElementsByName('email')[0];
	if (email) {
		email.setAttribute('accesskey', '1');
		// submit
		var links = document.evaluate('//a[@href="javascript:save()"]',
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (links) {
			var login = links.snapshotItem(0);
			if (login) {
				login.setAttribute('accesskey', '2');
			}
		}
		return;
	}

	// ****Fifth step (Place Order) cardlist
	var select2 = document.getElementById('cardlist');
	if (select2) {
		select2.setAttribute('accesskey', '1');
		// submit
		var links = document.evaluate('//a[@href="javascript:Continue()"]',
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (links) {
			var palceOrder = links.snapshotItem(0);
			if (palceOrder) {
				palceOrder.setAttribute('accesskey', '2');
			}
		}
		return;
	}

}

// ****Add key event handlers in stations selection asp page, let pressing
// 'enter' key has same function as double
// click.(https://www.irishrail.ie/your_journey/stationpicker.asp?box=From&service=1)****
function fixStationSelection() {
	var allLinks, thisLink;
	allLinks = document.evaluate('//*[@ondblclick]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		thisLink.setAttribute('onkeydown', 'if(event.keyCode==13)' + thisLink
				.getAttribute('ondblclick'));
	}
}

// **** Add prompt text for date selection ( dd-mm-yyyy) ****
function promptDateFormat() {
	var temp = document.evaluate('//strong', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (temp) {
		for ( var i = 0; i < temp.snapshotLength; i++) {
			var el = temp.snapshotItem(i);
			if (el.textContent == "Departing on")
				el.textContent = "Departing on (dd-mm-yyyy)";
			else if (el.textContent == "Returning on")
				el.textContent = "Returning on (dd-mm-yyyy)";

		}
	}
}

// **** Add an accessbar at the bottom of web page, to show all the available accesskeys ****
function addAccessbar() {
	var accessbar = document.createElement('accessbar');
	accessbar.id = 'accessbar';
	var desc = '<ul><strong>Accesskey:</strong>  ';
	var accesskeyItem;
	accesskeyItem = document.evaluate('//*[@accesskey="1"]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (accesskeyItem.snapshotLength > 0)
		desc = desc + '<li><strong>[1]</strong>Focus on Form</li>';
	accesskeyItem = document.evaluate('//*[@accesskey="2"]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (accesskeyItem.snapshotLength > 0)
		desc = desc + '<li><strong>[2]</strong>Submit</li>';
	desc = desc + '<li><strong>[0]</strong>Focus on Search bar</li>' + '<li><strong>[9]</strong>Do Search</li>' + '</ul>';

	accessbar.innerHTML = desc;
	var body = document.body;
	if (body)
		body.insertBefore(accessbar, body.firstChild);
		var skiplink = document.createElement('a');
		skiplink.setAttribute('class','skip');
		skiplink.href="#skip";
		skiplink.textContent = "Skip Navigation";
		body.insertBefore(skiplink,accessbar);
}

// ***fix the presentation of the web site****
function fixStyle() {
	var newCSS = '.sitemap{background-color: #C0FFC0;}'
			+ '.title1{background-color: #C0FFC0;font-size:1.0em;}'
			+ '.mylabel{display:none;}'
			+'.form_title{font-size:1.2em}'
			//CSS for skip navigation link
			+'.skip{height:0; width:0; overflow:hidden; position:absolute;}'
			// CSS for button
			+ '.mybutton{background-color: #C0FFC0;border-style:outset}'
			// CSS for navigation bar
			+ '.nav{font-size:2em;}'
			// CSS for access bar
			+ '#accessbar{'
			+ '  position: fixed;'
			+ '  left: 0;'
			+ '  right: 0;'
			+ '  bottom: 0;'
			+ '  top: auto;'
			+ '  border-top: 0.01em solid silver;'
			+ '  background: black;'
			+ '  color: white;'
			+ '  margin: 1em 0 0 0;'
			+ '  padding: 0.1em 0 0.4em 0;'
			+ '}'
			+ '#accessbar ul,'
			+ '#accessbar ul li,'
			+ '#accessbar strong {'
			+ '  background-color: transparent;'
			+ '  color: white;'
			+ '  font-size: 1.0em;'
			+ '}'
			+ '#accessbar a{color:white;font-size: 1.0em;text-decoration : underline;}'
			+ '#accessbar ul {'
			+ '  margin-left: 0.5em;'
			+ '  margin-bottom: 0.2em;'
			+ '  padding-left: 0;'
			+ '  display: inline;'
			+ '}'
			+ '#accessbar ul li {'
			+ '  margin-left: 0;'
			+ '  padding: 0.15em 1em;'
			+ '  border-left: 0.01em solid silver;'
			+ '  list-style: none;'
			+ '  display: inline;' + '}'
	GM_addStyle(newCSS);

	// change background color of some titile from dark green to light green
	var trs = document.getElementsByTagName('tr');
	for ( var i = 0; i < trs.length; i++) {
		var tr = trs[i];
		var bg = tr.getAttribute("bgcolor");
		if (bg && bg == "#86b918") {
			tr.setAttribute("bgcolor", "#C0FFC0")
		}
	}
	var tds = document.getElementsByTagName('td');
	for ( var i = 0; i < tds.length; i++) {
		var td = tds[i];
		var bg = td.getAttribute("bgcolor");
		if (bg) {
			if (bg == "#86b918")
				td.setAttribute("bgcolor", "#C0FFC0");
			else if (bg == "#828585")
				td.setAttribute("bgcolor", "#505050");
		}
	}
	// change the background color of the form in home page
	var form = document.getElementById("res");
	if (form)
		form.style.backgroundColor = "#505050";
}

// ****rewirte the form in screen reader freindly timetables page****
function fixSRForm(){
	if(URL=="http://www.irishrail.ie/your_journey/timetables.asp"||URL=="https://www.irishrail.ie/your_journey/timetables.asp") {
	var toStation = document.getElementById('txtToStation');
	var formtb = toStation.parentNode.parentNode.parentNode;
	var tr1 = formtb.firstChild;
	var html = formtb.innerHTML;
	
	var part = html.substring(html.indexOf('<hr'),html.length);
	
	
	formtb.innerHTML='<tr><td colspan=25 class="form_title">Outward Journey</td></tr>'
		+'<tr><tr/>'
		+'<td colspan=9><fieldset><legend>From Station</legend>'
		+'<label for="txtFromStation">From</label>'
		+'<input id="txtFromStation" size="20" name="txtFromStation" maxlength="30" value="" type="text"> <br/>'
		+'<img border="0" alt="" src="../images/your_journey/arrow.gif"/><a href="javascript:openSelectWindow(\'From\', \'timetables_stationpicker.asp\');"> station list</a>'
		+'|<img border="0" alt="" src="../images/your_journey/arrow.gif"/><a href="javascript:openSelectWindow(\'MapFrom\', MAP2URL);">map</a>'
		+'</fieldset></td>'
		+'<td colspan=9><fieldset><legend>To Station</legend>'
		+'<label for="txtToStation">To</label>'
		+'<input type="text" maxlength="30" size="20" value="" id="txtToStation" name="txtToStation"/><br/>'
		+'<img border="0" alt="" src="../images/your_journey/arrow.gif"/><a href="javascript:openSelectWindow(\'To\', \'timetables_stationpicker.asp\');"> station list</a>'
		+'|<img border="0" alt="" src="../images/your_journey/arrow.gif"/><a href="javascript:openSelectWindow(\'MapTo\', MAP2URL);">map</a>'
		+'</fieldset></td>'
		+'<td colspan=6><fieldset><legend>Train type</legend>'
		+'<input id="allTrains" type="radio" checked="" value="all" name="RadioOutDirect"/>'
		+'<label for="allTrains">All trains</label><br/>'
		+'<input id="directTrains" type="radio" value="direct" name="RadioOutDirect"/>'
		+'<label for="directTrains">Direct trains only</label>'
		+'</fieldset></td>'
		+'</tr>'
		+'<tr>'
		+'<td colspan=8><fieldset><legend>Date of outward</legend>'
		+'<label for="OutSelectDay">Date </label>'
		+'<select onchange="onChangeValidDates(document.frmInfo.OutSelectDay, document.frmInfo.OutSelectMonth);" id="OutSelectDay" name="OutSelectDay">'
		+'<option value="01" id="01">01</option><option value="02" id="02">02</option><option value="03" id="03">03</option><option value="04" id="04">04</option><option value="05" id="05">05</option><option value="06" id="06">06</option><option value="07" id="07">07</option><option value="08" id="08">08</option><option value="09" id="09">09</option><option value="10" id="10">10</option><option value="11" id="11">11</option><option value="12" id="12">12</option><option value="13" id="13">13</option><option value="14" id="14">14</option><option value="15" id="15">15</option><option value="16" id="16">16</option><option value="17" id="17">17</option><option value="18" id="18">18</option><option value="19" id="19">19</option><option value="20" id="20">20</option><option value="21" id="21">21</option><option value="22" id="22">22</option><option value="23" id="23">23</option><option value="24" id="24">24</option><option value="25" id="25">25</option><option value="26" id="26">26</option><option selected="" value="27" id="27">27</option><option value="28" id="28">28</option><option value="29" id="29">29</option><option value="30" id="30">30</option><option value="31" id="31">31</option></select>'
		+'<select onchange="ChangeOptionDays(document.frmInfo.OutSelectDay, document.frmInfo.OutSelectMonth);onChangeValidDates(document.frmInfo.OutSelectDay, document.frmInfo.OutSelectMonth);" id="OutSelectMonth" name="OutSelectMonth">'
		+'<option value="01" id="01">January</option><option value="02" id="02">February</option><option value="03" id="03">March</option><option value="04" id="04">April</option><option value="05" id="05">May</option><option value="06" id="06">June</option><option value="07" id="07">July</option><option selected="" value="08" id="08">August</option><option value="09" id="09">September</option><option value="10" id="10">October</option><option value="11" id="11">November</option><option value="12" id="12">December</option></select>'
		+'</fieldset></td>'
		+'<td colspan=6><fieldset>'
		+'<input id="departing" type="radio" checked="" value="D" name="RadioOutStatus"/>'
		+'<label for="departing">Departing</label><br/>'
		+'<input id="arriving" type="radio" value="A" name="RadioOutStatus"/>'
		+'<label for="arriving">Arriving</label>'
		+'</fieldset></td>'
		+'<td colspan=11><fieldset><legend>Time of departing or arriving</legend>'
		+'<label for="OutFromTime">Between </label>'
		+'<select id="OutFromTime" size="1" name="OutFromTime"><option value="00" id="00">00h</option><option value="01" id="01">01h</option><option value="02" id="02">02h</option><option value="03" id="03">03h</option><option value="04" id="04">04h</option><option value="05" id="05">05h</option><option value="06" id="06">06h</option><option value="07" id="07">07h</option><option value="08" id="08">08h</option><option value="09" id="09">09h</option><option value="10" id="10">10h</option><option value="11" id="11">11h</option><option value="12" id="12">12h</option><option value="13" id="13">13h</option><option value="14" id="14">14h</option><option value="15" id="15">15h</option><option value="16" id="16">16h</option><option value="17" id="17">17h</option><option value="18" id="18">18h</option><option value="19" id="19">19h</option><option value="20" id="20">20h</option><option value="21" id="21">21h</option><option value="22" id="22">22h</option><option value="23" id="23">23h</option><option value="24" id="24">24h</option></select>'
		+'<label for="OutToTime">and </label>'
		+'<select id="OutToTime" size="1" name="OutToTime"><option value="00" id="00">00h</option><option value="01" id="01">01h</option><option value="02" id="02">02h</option><option value="03" id="03">03h</option><option value="04" id="04">04h</option><option value="05" id="05">05h</option><option value="06" id="06">06h</option><option value="07" id="07">07h</option><option value="08" id="08">08h</option><option value="09" id="09">09h</option><option value="10" id="10">10h</option><option value="11" id="11">11h</option><option value="12" id="12">12h</option><option value="13" id="13">13h</option><option value="14" id="14">14h</option><option value="15" id="15">15h</option><option value="16" id="16">16h</option><option value="17" id="17">17h</option><option value="18" id="18">18h</option><option value="19" id="19">19h</option><option value="20" id="20">20h</option><option value="21" id="21">21h</option><option value="22" id="22">22h</option><option value="23" id="23">23h</option><option value="24" id="24">24h</option></select>'
		+'</fieldset></td>'
		+'</tr>'
		+'<tr><td colspan=25>'
		+'<input id="isReturn" type="checkbox" value="1" onclick="DisableRtn(RadioRetReqd.checked);" name="RadioRetReqd"/>'
		+'<label for="isReturn">Return journey required</label>'
		+'</td></tr>'
		+'<tr><td  colspan=25>'
		+part;
	var tdSubmit2 = document.getElementById('tdSubmit2');	
	tdSubmit2.parentNode.removeChild(tdSubmit2);
	}
}

// *******************execute code********************

var URL = window.location.href;

// 1. Set the language of the web site. (lang="en")
addLanguageInfo();

// 2. Add null alt text to images used as spacer or decoration ("space.gif","sitemap_arrow.gif","sitemap_bullet.gif")
// 3. Change the title bar image to text("Reservation&Times","Fare Deals","Travel Alerts&News")
// 5. Add alt text for images without alt-text. (Fare Deals advertisement, process to reservation). And fix some improper alt-text.
// 6. Add "title" attribute to image links
fixImages();
// 4. Change the navigate bar images to text.("Home Page","My Account"...)
replaceImage2Text();
fixImageAsButton();

// 8. Add accesskey to focus on search field (accesskey='0'), accesskey to
// submit search(accesskey='9')
fixSearchBar();

// 9. Add accesskey to focus on the first item of form (accesskey='1'),
// accesskey for submit form in all steps of booking ticket (accsskey='2')
//13. Add label or title attribute for form elements, 
//make the forms more accessible for screen reader users. (to be improved).
fixSRForm();
fixForm();

// 10. Add key event handlers in stations selection asp page, let pressing
// 'enter' key has same function as double click
fixStationSelection();

// 11. Add prompt text for date selection( dd-mm-yyyy)
promptDateFormat();

// 12. Add a bar at the bottom of web page, to show all the accesskeys. Also add
// links to "disabled access","Screen Reader Friendly page" and "Visually
// Impaired Page"
// 14. Add "Skip Navigation" link to skip navigation links.
addAccessbar();

// 7. Change the color of the web site to provide sufficient contrast, and set
// the css of access bar
fixStyle();
