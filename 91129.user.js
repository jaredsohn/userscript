// ==UserScript==
// @name           Auto Facebook
// @namespace      file:///C:/Users/Glitchy/Desktop/hobo.html
// @include        http://*.facebook.com/*
// @include        http://*.tempinbox.com/*
// @include        http://*.bluefrogsrv.com*
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

	//#########################################################
	//Changeable stuff
	//#########################################################

	var MaxBirthDay = 28
	var MaxBirthYear = 1988
	var MinBirthYear = 1970
	var PasswordLength = 6
	var CheckMailDelay = 10000
	var PageDelay = 3000
	var RefLink = "" //KILLER CHANGE THIS TO YOUR REF LINK
	var TempInboxDomain = "DingBone.com" //FudgeRub.com 

	//#########################################################
	//Main Entry point
	//#########################################################

	GM_registerMenuCommand("Get Facebook Accounts", GetAccounts)
	GM_registerMenuCommand("Start Over", StartOver)
	
	var SignupButton
	var CheckEmailAddy = 'http://www.tempinbox.com/cgi-bin/checkmail.pl?username=?REPLACEME?&button=Check+Mail&terms=on&kw=spam+email+inbox+filter'
	var CurrentPath = location.pathname
	var CurrentStep = GM_getValue("Auto_Step", 0);
	


	if (CurrentPath == "/r.php") {
		if (CheckForSignup) {
			GetRandomName()
		}
	} 








else if (CurrentPath == "/gettingstarted.php") {
		if (CurrentStep >= 1 && CurrentStep <= 3) {
			skip = document.evaluate("//div[contains(@class,'LinkContainer')]/a[contains(@class,'ControllerLink')]", document, null, 9, null).singleNodeValue;
			GM_setValue("Auto_Step", (CurrentStep +1));
			Goto(skip.href)
		}
	} else if (CurrentPath == "/home.php") {
		if (CurrentStep == 4) {
			//time to get email
			Email = GM_getValue("Auto_CurrentEmail");
			var CheckAddy = CheckEmailAddy.replace("?REPLACEME?",Email)
			GM_setValue("Auto_Step",5);
			Goto(CheckAddy)
		}
		if (CurrentStep == 7) {
			GM_setValue("Auto_Step",8);
			Goto(RefLink)
		}
	} else if (CurrentPath == "/cgi-bin/checkmail.pl") {
		if (CurrentStep == 5) {
			setTimeout(CheckForEmail,CheckMailDelay)
		}
	} else if (CurrentPath == "/cgi-bin/viewmail.pl") {
		if (CurrentStep == 6) {
			ConfimLink = document.evaluate("//a[contains(@href,'confirmemail.php')]", document, null, 9, null).singleNodeValue;
			GM_setValue("Auto_Step",7);
			SaveAccount()
			Goto(ConfimLink.href)
		}
	} else if (CurrentPath == "/profile/name_change") {
		if (CurrentStep == 9) {
			document.getElementById("user_team_name").value = GM_getValue("Auto_CurrentEmail");
			Acceptbtb = document.evaluate("//input[contains(@value,'Accept')]", document, null, 9, null).singleNodeValue;
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("click", true, true);
			GM_setValue("Auto_Step", 0);
			Acceptbtb.dispatchEvent(evt);
		}
	} else if (CurrentPath == "/tos.php") {
		if (CurrentStep == 8) {
			GM_setValue("Auto_Step",9);
			setTimeout(ClickAllow, PageDelay);
		}
	}
	
	function ClickAllow() {
		AllowBtb = document.evaluate("//tr/td/div/a/span[contains(@class,'UIButton_Text')]", document, null, 9, null).singleNodeValue;
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", true, true);
		AllowBtb.dispatchEvent(evt);
	}
	
	function clickLink(linkobj) {
		var onclickHandler = linkobj.getAttribute('onclick')
		alert(onclickHandler)
		if (onclickHandler == null) document.location = linkobj.getAttribute('href');
		//pass self reference back to handler in case handler normally called with 'this', other params will fail:
		else eval(onclickHandler);
	}
	
	
	function CheckForEmail() {
		EmailLink = document.evaluate("//td/a[contains(@href,'Confirmation')]", document, null, 9, null).singleNodeValue;
		if (EmailLink == null) {
			window.location.reload()
		} else {
			GM_setValue("Auto_Step", 6);
			window.location.href = EmailLink.href //Goto(EmailLink.href)
		}
	}

	function CheckForSignup() {
		if (location.pathname == "/r.php") {
			SignupButton = document.evaluate("//div[contains(@class,'reg_btn')]/span[contains(@class,'UIButton')]/input[contains(@class,'UIButton')]", document, null, 9, null).singleNodeValue;
			if (SignupButton) {
				return true
			}
		}
		return false
	}

	function ClickSignup() {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", true, true);
		SignupButton.dispatchEvent(evt);
	}
	
	function GetAccounts() {
		var SavedAccounts = eval(GM_getValue("Auto_Accounts","[]"))
		var AlertString = ""
		for (var x = 0; x < SavedAccounts.length; ++x) {
			AlertString = AlertString + SavedAccounts[x] + "\n"
		}
		if (SavedAccounts.length == 0) {
			alert("No Accounts")
		} else {
			alert("Email Password M \ D \ Y FName LName Sex\n" + AlertString)
		}
	}
	
	function StartOver() {
		GM_setValue("Auto_Step", 0);
		window.location.href = "http://www.facebook.com/r.php?locale=en_US"
	}
	
	function Goto(url) {
		setTimeout(function () {location.href = url;}, PageDelay);
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
		var YourEmail = FirstName + LastName + "@" + TempInboxDomain
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






