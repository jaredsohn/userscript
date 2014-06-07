// ==UserScript==
// @name           Hotmail Signup Script
// @namespace      http://www.fallox.org/
// @description    Hotmail Signup Script
// @include        https://signup.live.com/signup.aspx*
// ==/UserScript==
//GM_setValue("firsttime", 0)

first_time = GM_getValue("firsttime",0);

if(first_time != "1")
{
	GM_setValue("firsttime", "1");
	var password = prompt("Enter Password");
	GM_setValue("password",password);
	var firstname = prompt("First Name: ");
	GM_setValue("firstname",firstname);
	var lastname = prompt("Last Name: ");
	GM_setValue("lastname",lastname);
	var country = prompt("Country Initals: ");
	GM_setValue("country",country);
	var gender = prompt("Enter Gender: m or f ");
	GM_setValue("gender",gender);
	var birthyear = prompt("BirthYear");
	GM_setValue("birthyear",birthyear);
	
	var postal = prompt("Postal Code: ");
	GM_setValue("postal",postal);
	var answer = prompt("answer");
	GM_setValue("answer",answer);
}
else if(first_time = "1")
{
var email = prompt("Please Enter Email Name Here: ","Name");
var password = GM_getValue("password");

var firstname = GM_getValue("firstname");
var lastname =  GM_getValue("lastname");
var country = GM_getValue("country");
var postalcode = GM_getValue("postal");

var gender = GM_getValue("gender");
var birthyear = GM_getValue("birthyear");

var characters = '';
var uncheck = true;

var answer = GM_getValue("answer");

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
}


