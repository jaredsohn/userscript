// Version 1.1
// ==UserScript==
// @name           Form Filler 2.0 Zmk
// @description    Fills registration forms automatically and in ways that will look real.
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lnktrckr.com/*
// @include           http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// ==/UserScript==


	var MaxBirthDay = 28
	var MaxBirthYear = 1988
	var MinBirthYear = 1970
	var PasswordLength = 6
	var CheckMailDelay = 10000
	var PageDelay = 3000
	var RefLink = "" //KILLER CHANGE THIS TO YOUR REF LINK
	var TempInboxDomain = "DingBone.com" //FudgeRub.com 




function randomInt(max) {
	return Math.floor(Math.random()*max);
	}

function match(input, regexp) {
	return ((input.name && input.name.match(regexp)) ||
		(input.id && input.id.match(regexp)));
	}

function randomWord(length) {
	var word="";
	for (var i=0; i<length; i++)
		word+=String.fromCharCode(randomInt(26)+97);
	return word;
	}

function fillPhoneNumber(input) {
	var n=input.getAttribute("maxlength");
	if (n<=10)
		input.value=(randomInt(8)+2)+""+randomInt(1000000000);
	else if (n>10)
		input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(10000));
	}

function makeSelection(select) {
	if (select.length>2)
		select.selectedIndex=randomInt(select.length-2)+2;
	else
		select.selectedIndex=0;
	}

var retype;
function fillTextBox(input) {
	if (match(input,/retype|c(on)?fi?rm/i) && retype)
		input.value=retype;
	else if (match(input,/e-?mail/i)) {
		input.value=email+"@gmail.com";
		GM_setValue("form filler email", email);
		}
	else if (match(input,/login|use?r/i)) //user or login name
		input.value=username;
	else if (match(input,/phone/i)) //phone number
		fillPhoneNumber(input);
	else if (match(input,/zip/i) || input.getAttribute("maxlength")==5) //zip code
		input.value=randomInt(90000)+10000;
	else if (match(input,/code|ima?ge?/i)) {//CAPTCHA
		input.focus(); captcha=true;}
	else if (match(input,/year/i) || input.getAttribute("maxlength")==4) //year of birth
		input.value=1926+randomInt(60);
	else if (match(input,/day|date/i) || input.getAttribute("maxlength")==2) //date of birth
		input.value=randomInt(28)+1;
	else if (match(input,/nu?m?be?r/i))
		input.value=randomInt(10000000)+42;
	else
		input.value=randomWord(7+randomInt(4));
	retype=input.value;
	}

function fillField(input) {
	if (input.type=="hidden")
		return;
	else if (input.type=="password")
		input.value=password;
	else if (input.type=="text")
		fillTextBox(input);
	else if (input.type=="checkbox")
		input.checked=true;
	else if (input.type=="radio" && input.name) {
		var r=document.getElementsByName(input.name);
		r[randomInt(r.length)].checked=true;
		}
	else if (input.type=="radio")
		input.checked=true;
	else if (input.type && input.type.match(/select/))
		makeSelection(input);
	else if (input.type=="submit" && !captcha)
		input.focus();
	}

if (GM_getValue("form filler email")!=undefined && GM_getValue("form filler email")!="") {
	var a=document.createElement("a");
	a.setAttribute("href","http://mailinator.com/mailinator/maildir.jsp?email="+GM_getValue("form filler email")+"");
	a.appendChild(document.createTextNode("Check your email for confirmation link."));
	document.body.insertBefore(a, document.body.firstChild);
	GM_setValue("form filler email", "");
	}


if (!document.forms.length)
	return;

var f=document.forms[0];
for (var i=1; i<document.forms.length; i++)
	if (document.forms[i].elements.length>f.elements.length)
		f=document.forms[i];
if (f.elements.length<7)
	return;

var div=document.createElement("div");
div.appendChild(document.createTextNode("Press CTRL+SHIFT+F to fill in form."));
f.parentNode.insertBefore(div, f);

var username, password, email, captcha;
function submitForm() {
	username=randomWord(randomInt(4)+8);
	password=randomWord(8)+randomInt(100);
	email=randomWord(10);
	captcha=false;
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	}


	//#########################################################
	//Random name Stuff
	//#########################################################

	function GetRandomName() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.fakenamegenerator.com/gen-random-us-us.php',
			onload: function(responseDetails) { HandelRandomResponse(responseDetails) }
		});
	}

	function HandelRandomResponse(responseDetails) {
		var parser = new DOMParser();
		var FirstName = responseDetails.responseText.match(/given-name..(\w*)[<]/)[1]
		var LastName = responseDetails.responseText.match(/family-name..(\w*)[<]/)[1]
		var YourEmail = FirstName + LastName + "@gmail.com"
		var Password = RandomPassword(PasswordLength)
		var YourSex = 1 //Female
		if (responseDetails.responseText.indexOf('sil-male.png') != -1) {
			YourSex = 2 //Male
		}
		var DOBM = RandomNumber(1,12)
		var DOBD = RandomNumber(1,MaxBirthDay)
		var DOBY = RandomNumber(MinBirthYear,MaxBirthYear)
		FillForm(FirstName,LastName,YourEmail,Password,YourSex,DOBM,DOBD,DOBY)
	}
	
	function RandomPassword(length)
	{
	  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	  pass = "";
	  for(x=0;x<length;x++)
	  {
		i = Math.floor(Math.random() * 62);
		pass += chars.charAt(i);
	  }
	  return pass;
	}

	function FillForm(FirstName,LastName,YourEmail,Password,YourSex,DOBM,DOBD,DOBY) {
		document.getElementById('firstname').value = FirstName
		document.getElementById('lastname').value = LastName
		document.getElementById('reg_email__').value = YourEmail
                document.getElementById('reg_email_confirmation__').value = YourEmail
		document.getElementById('reg_passwd__').value = Password
		document.getElementById('sex').value = YourSex
		document.getElementById('birthday_month').value = DOBM
		document.getElementById('birthday_day').value = DOBD
		document.getElementById('birthday_year').value = DOBY
		var SexArray = Array("N/A", "[F]", "[M]")
		var SaveString = YourEmail + " " + Password + " " + DOBM + " " + DOBD + " " + DOBY + " " + FirstName + " " + LastName + " " + SexArray[YourSex]
		GM_setValue("Auto_Step", 1);
		GM_setValue("Auto_CurrentEmail", FirstName + LastName);
		GM_setValue("Auto_TempString", SaveString);
	}
	
	function SaveAccount() {
		var SaveString = GM_getValue("Auto_TempString");
		var SavedAccounts = eval(GM_getValue("Auto_Accounts","[]"))		
		SavedAccounts[SavedAccounts.length] = SaveString
		GM_setValue("Auto_Accounts", uneval(SavedAccounts));
	}

	function RandomNumber(minVal,maxVal) {
		minVal = parseInt(minVal)
		maxVal = parseInt(maxVal)
		return Math.round(minVal+(Math.random()*(maxVal-minVal)));
	}











function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 70 )
        //submitForm();
    GetRandomName();
}

//window.addEventListener('keydown', keyPressed, false)





