// Copyright (C) 2011 by LOK-Soft Lars-Olof Krause http://lok-soft.net
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           GC-OneClickLogin
// @namespace      LOK-Soft.GC
// @include        http*://www.geocaching.com/*
// @exclude        */map/*
// @exclude        */membership/*
// @exclude        */reviews/*
// @description    Adds OneClick-Login-Box to GC, several Account can be saved, saving PW is optional
// @version        0.3
// ==/UserScript==

GM_log = function(){};

//Initial Log-Message
  GM_log("GC-OneClickLogin activate");

//register GM-Menu
  GM_registerMenuCommand('GC-OneClickLogin - Clear all Data', GCAclearData);

//Global Vars
  var gcusers = new Array();
  var gcpasswords = new Array();
  var gckmsi = new Array();

  function loadGMdata(){
    GM_log("GC-Autologin loadGMdata");

    var gcusers_str = "##!##" + GM_getValue('gcuser');
    var gcpasswords_str = "##!##" + GM_getValue('gcpass');
    var gckmsi_str = "##!##" + GM_getValue('gckmsi');
    GM_log("GC-OneClickLogin received Data");

    gcusers = gcusers_str.split("##!##");
    gcpasswords = gcpasswords_str.split("##!##");
    gckmsi = gckmsi_str.split("##!##");
    GM_log("GC-OneClickLogin splitted Data");
    gcusers.splice(0,1);
    gcpasswords.splice(0,1);
    gckmsi.splice(0,1);
    GM_log("GC-OneClickLogin removed unused data");
  }


  loadGMdata();

//Check URL
  var loc = String(document.location);
  if(loc.indexOf("/login/") != -1){
    GM_log("GC-OneClickLogin: on /login/");
    if(document.getElementById('ctl00_ContentBody_LoggedInPanel')){
      GM_log("GC-OneClickLogin: loggedin");
      GCAloggedin();
    }else if(document.getElementById('ctl00_ContentBody_LoginPanel')){
      GM_log("GC-OneClickLogin: not loggedin");

      var loginform = document.getElementById('ctl00_ContentBody_LoginPanel').getElementsByTagName("dl")[0];
      var usrdt = document.createElement("dt");
      var usrdttxt = document.createTextNode("OneClickLogin:");
      usrdt.appendChild(usrdttxt);

      var usrdd = document.createElement("dd");
      var dropdown = GCAcreateUserDropdown();
      usrdd.appendChild(dropdown);

      loginform.insertBefore(usrdt, loginform.getElementsByTagName("dt")[0]);
      loginform.insertBefore(usrdd, loginform.getElementsByTagName("dt")[0].nextSibling);
      GM_log("GC-OneClickLogin: Added Dropdown");
      GCAaddListener();

    }else{
      GM_log("GC-OneClickLogin: Login-Box not found o.O");
    }

  }else{ //not on /login/
    GM_log("GC-OneClickLogin: not on /login/"); 

    //Check if User is Loggedin
    if(document.getElementById('ctl00_divSignedIn')){
      GM_log("GC-OneClickLogin: loggedin"); 
      GCAloggedin();
    }else if(document.getElementById('ctl00_divNotSignedIn')){
      GM_log("GC-OneClickLogin: not loggedin");
      var signinbox = document.getElementById('SignInWidget');
      var dropp = document.createElement("p");

      var label = document.createElement("label");
      label.for = "GCAutoSelect";
      var labeltxt = document.createTextNode("OneClickLogin:");
      label.appendChild(labeltxt);
      dropp.appendChild(label);

      var br = document.createElement("br");
      dropp.appendChild(br);

      var dropdown = GCAcreateUserDropdown();
      dropp.appendChild(dropdown);
      signinbox.insertBefore(dropp, signinbox.getElementsByTagName("p")[0]);
      GM_log("GC-OneClickLogin: Added Dropdown");
      GCAaddListener();

    }else{
      GM_log("GC-OneClickLogin: Login-Box not found o.O"); 
    }

  }


  function GCAcreateUserDropdown(){
    GM_log("GC-OneClickLogin: create dropdown");
    var dropdown = document.createElement("select");
    dropdown.id = "GCAutoSelect";
    var stdselect = document.createElement("option");
    stdselect.value = "-1";
    stdselect.innerHTML = "- choose username -";
    dropdown.appendChild(stdselect);
    for(var i = 1; i < gcusers.length; i++){
      var select = document.createElement("option");
      select.value = i;
      select.appendChild(document.createTextNode(gcusers[i]));
      dropdown.appendChild(select);
    }
    return dropdown;
  }


  function GCAaddListener(){
    GM_log("GC-OneClickLogin: addListener");

    var element = document.getElementById('GCAutoSelect');
    if( element.addEventListener )
      element.addEventListener( 'change', GCAfilloutLogin, false );
    else if( element.attachEvent )
      element.attachEvent( 'onchange', GCAfilloutLogin );
    else
      document.onchange = GCAfilloutLogin;
 }

  function GCAfilloutLogin(){
    GM_log("GC-OneClickLogin: User selected");
    var userid = document.getElementById('GCAutoSelect').value;
    GM_log("GC-OneClickLogin: Userid - "+userid);
    var loc = String(document.location);
    if(loc.indexOf("/login/") != -1){
      GM_log("GC-OneClickLogin: Login - Form");
      document.getElementById("ctl00_ContentBody_tbUsername").value = gcusers[userid];
      if(GCAgetuserkmsi(userid) == "1"){
        document.getElementById("ctl00_ContentBody_cbRememberMe").checked = true;
      }
      if(GCAgetuserpass(userid) != "?"){
        document.getElementById("ctl00_ContentBody_tbPassword").value = GCAgetuserpass(userid);
        simulateClick(document.getElementById("ctl00_ContentBody_btnSignIn"));
      }
    }else{
      GM_log("GC-OneClickLogin: Login - Box");
      document.getElementById("ctl00_tbUsername").value = gcusers[userid];
      if(GCAgetuserkmsi(userid) == "1"){
        document.getElementById("ctl00_cbRememberMe").checked = true;
      }
      if(GCAgetuserpass(userid) != "?"){
        document.getElementById("ctl00_tbPassword").value = GCAgetuserpass(userid);
        simulateClick(document.getElementById("ctl00_btnSignIn"));
      }
    }

  }

  function simulateClick(button) {
    GM_log("GC-OneClickLogin: Simulate Click");
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    button.dispatchEvent(evt);
  }



  function GCAloggedin(){
    if(GCAuser_exists(GCAgetactualuser())){
      GM_log("GC-OneClickLogin: AddMenu-Entry 'remove'"); 
      GM_registerMenuCommand('GC-OneClickLogin - remove Account', GCAremoveAccount);
      var remaccount = document.createElement('a');
      remaccount.id = "GCA_remaccount";
      remaccount.title = "GC-OneClickLogin - remove Account";
      remaccount.style.color = "#ff162b";
      remaccount.style.paddingLeft = "5px";
      remaccount.style.cursor = "pointer";
      remaccount.style.textDecoration = "none";
      remaccount.innerHTML = "-";
      document.getElementById("ctl00_divSignedIn").getElementsByTagName("strong")[0].appendChild(remaccount);
      addClkListener(document.getElementById('GCA_remaccount'), GCAremoveAccount);

      if(GCAgetuserpass(GCAgetactualuserid()) == '?'){
        var addpass = document.createElement('a');
        addpass.id = "GCA_addpass";
        addpass.title = "GC-OneClickLogin - add Password";
        addpass.style.color = "#ffdc17";
        addpass.style.paddingLeft = "5px";
        addpass.style.cursor = "pointer";
        addpass.style.textDecoration = "none";
        addpass.innerHTML = "p";
        document.getElementById("ctl00_divSignedIn").getElementsByTagName("strong")[0].appendChild(addpass);
        addClkListener(document.getElementById('GCA_addpass'), GCAaddPass);
      }
    }else{
      GM_log("GC-OneClickLogin: AddMenu-Entry 'add account'"); 
      GM_registerMenuCommand('GC-OneClickLogin - add Account', GCAaddAccount);
      var addaccount = document.createElement('a');
      addaccount.id = "GCA_addaccount";
      addaccount.title = "GC-OneClickLogin - add Account";
      addaccount.style.color = "#67d91b";
      addaccount.style.paddingLeft = "5px";
      addaccount.style.cursor = "pointer";
      addaccount.style.textDecoration = "none";
      addaccount.innerHTML = "+";
      document.getElementById("ctl00_divSignedIn").getElementsByTagName("strong")[0].appendChild(addaccount);
      addClkListener(document.getElementById('GCA_addaccount'), GCAaddAccount);
    }
    GM_log("GC-OneClickLogin: AddMenu-Entry 'set pass'"); 
    GM_registerMenuCommand('GC-OneClickLogin - set Password', GCAaddPass);
  }


function addClkListener(element, fkt){
  if( element.addEventListener )
    element.addEventListener( 'click', fkt, false );
  else if( element.attachEvent )
    element.attachEvent( 'onclick', fkt );
  else
    document.onClick = fkt;
}


  function GCAuser_exists(username){
    var userid = GCAgetuserid(username);
    if(userid == -1){
      return false;
    }
    return true;
  }


  function GCAaddAccount(){
    GM_log("GC-OneClickLogin: addAccount");
    var gcuser = GCAgetactualuser();
    GM_log("GC-OneClickLogin: addAccount - is loggedin as " + gcuser);
    if(GCAuser_exists(gcuser)){
      alert("GC-OneClickLogin: User '" + gcuser + "' exists already!");
    }else{
      GCAaddUser(gcuser);
    }
  }


  function GCAaddUser(username){
    gcusers.push(username);
    gcpasswords.push("?");
    GCAsaveusers();
    alert("Account added");
    GM_log("GC-OneClickLogin: addAccount - successfull");
    var userid = GCAgetuserid(username)
    if(confirm('Do you want to loggin with the option "Keep Me Signed In"?')){
      gckmsi[userid] = 1;
    }else{
      gckmsi[userid] = 0;
    }
    GCAsaveusers();
  }


  function GCAaddPass(){
    GM_log("GC-OneClickLogin: addPass");
    var userid = GCAgetactualuserid();
    if(userid > -1){
      var pass_promt = prompt('Please enter your password');
	  if(pass_promt){
        GCAsavePass(userid, pass_promt);
      }
    }else{
      alert("User not found!");
    }
  }


  function GCAsavePass(userid, pass){
    gcpasswords[userid] = pass;
    GCAsaveusers();
    alert("Password added");
  }


  function GCAremoveAccount(){
    GM_log("GC-OneClickLogin: removeAccount");
    var userid = GCAgetactualuserid();
    if(userid > -1){
      GCAremoveUser(userid);
    }else{
      alert("User not found!");
    }
  }

  function GCAgetactualuser(){
    return document.getElementById("ctl00_divSignedIn").getElementsByTagName("strong")[0].getElementsByTagName("a")[0].innerHTML;
  }

  function GCAgetactualuserid(){
    return GCAgetuserid(GCAgetactualuser());
  }

  function GCAgetuserid(username){
    return gcusers.indexOf(username);
  }

  function GCAgetuserpass(userid){
    return gcpasswords[userid];
  }

  function GCAgetuserkmsi(userid){
    return gckmsi[userid];
  }

  function GCAremoveUser(userid){
    gcusers.splice(userid,1);
    gcpasswords.splice(userid,1);
    gckmsi.splice(userid,1);
    GCAsaveusers();
    alert("Account removed");
  }

  function GCAsaveusers(){
    GM_setValue('gcuser', gcusers.join("##!##"));
    GM_setValue('gcpass', gcpasswords.join("##!##"));
    GM_setValue('gckmsi', gckmsi.join("##!##"));
    loadGMdata();
  }

  function GCAclearData(){
    if(confirm("Do you really want to clear all Data?")){
      gcusers = new Array();
      gcpasswords = new Array();
	  GM_setValue('gcuser', '');
	  GM_setValue('gcpass', '');
      loadGMdata();
	  alert('Data cleared');
    }
  }


//Update Check by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 105628; // Change this to the number given to the script by userscripts.org (check the address bar)

 GM_registerMenuCommand('GC-OneClickLogin - Check for Updates', function(){updateCheck(true);});


try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}

	updateCheck(false);
}
catch(err)
{}