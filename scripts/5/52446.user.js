// ==UserScript==
// @name           Hotmail Signup Script
// @namespace      somethingstupid.com
// @description    signing up for hotmail automatically
// @include        https://signup.live.com/signup.aspx*
// ==/UserScript==

var email = 'ouasdflkawerngal43';
var password = 'orkslasdfkjke425';

var firstname = 'jemoeder';
var lastname = 'is gek';
var country = 'NL';
var postalcode = '6666DD';

var gender = 'm';
var birthyear = '1939';

var characters = '';
var uncheck = true;

var answer = 'Enschede';

function clickOnId(domid) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,	0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var thehorn = document.getElementById(domid); 
	var canceled = !thehorn.dispatchEvent(evt);
}
function setValueToDom(domid,value) {
	document.getElementById(domid).value = value;
}
function setSelectBox(domid,value) {
	var selectbox = document.getElementById(domid);
	selectbox.selectedIndex = value;
}
function setSelectBoxByVal(domid,value) {
	var selectbox = document.getElementById(domid);
	for(var i=0;i<selectbox.options.length;i++) {
		if(selectbox.options[i].value == value) {
			selectbox.options[i].selected = true;
			return;
		}
	}
}
function setCheckBox(domid) {
	document.getElementById(domid).checked = true;
}
function unsetCheckBox(domid) {
	document.getElementById(domid).checked = false;
}

try {
	var liveswitch = document.getElementById('iliveswitch');
	clickOnId('iliveswitch');
}
catch(e) {
}

try {
	var liveswitchemail = document.getElementById('iqsaswitch');
	clickOnId('iqsaswitch');
}
catch(e) {
}

setValueToDom('imembernamelive',email);
setSelectBox('idomain',1);

setValueToDom('iPwd',password);
setValueToDom('iRetypePwd',password);

setSelectBox('iSQ',1);
setValueToDom('iSA',answer);

setValueToDom('iFirstName',firstname);
setValueToDom('iLastName',lastname);

setSelectBoxByVal('iCountry',country);
setValueToDom('iZipCode',postalcode);

if(gender == 'm') {
	setCheckBox('iGenderMale');
}
else if(gender == 'f') {
	setCheckBox('iGenderFemale');
}

setValueToDom('iBirthYear',birthyear);
unsetCheckBox('iOptinEmail');

setTimeout(function() {var captcha = prompt("Type de captcha in GVD !", "");setValueToDom('iHIP',captcha);}, 2000);
