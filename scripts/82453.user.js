// ==UserScript==
// @name           Reddit Account Switcher - Chrome
// @version        chrome
// @author         aj <aj@drfloob.com>
// @namespace      http://reddit.com
// @description    Easily switch between multiple accounts while browsing reddit.
// @match          http://reddit.com/*
// @match          http://*.reddit.com/*
// ==/UserScript==

// inspired by the two following userscripts. I rewrote this specifically so it would work in the chrome browser.
// http://userscripts.org/scripts/show/62689
// http://userscripts.org/scripts/show/79371

(function(){
     var users = {
	 'username1': 'pw1'
	 , 'username2': 'pw2'
	 , 'username3': 'pw3'
     };


     function debug(msg) {
	 alert("Reddit Account Switcher: "+msg);
     }

     function getLoggedInUser() {
	 var users= document.getElementsByClassName('user');
	 if (users.length === 0) { 
	     return null; 
	 } else if (users[0].childNodes[0].nodeType === Node.TEXT_NODE) {
	     // no user logged in, text should say "want to join?"
	     return null;
	 }

	 return users[0].childNodes[0].innerHTML; // username
     }

     function buildDom(currUser) {
	 //debug('buildDom');

	 var sep= document.createElement('span');
	 sep.className= 'separator';
	 sep.innerHTML='|';

	 var label= document.createElement('span');
	 label.className='user';
	 label.innerHTML= 'Change user:';
	 //var label= document.createTextNode('Change user: ');

	 var select= document.createElement('select');
	 select.id= 'user_switch';
	 select.className= 'spacer';
	 select.style= 'font-size:10px;';
	 select.onchange= sel_onchange;

	 for (var i in users) {
	     var opt= document.createElement('option');
	     opt.innerHTML= i;
	     
	     if(currUser === i) {
		 opt.selected="selected";
	     }

	     select.add(opt);
	 };

	 var img = document.createElement('img');
	 img.id= 'user_switch_spinner';
	 img.style.display= 'none';
	 img.style.margin= '0 0 -4px 5px';
	 img.src= 'http://squidcdn.s3.amazonaws.com/images/ajax-loader-spinner.gif';

	 var hbr= document.getElementById("header-bottom-right");
	 [sep, label, select, img].forEach(function(el){hbr.appendChild(el);});
     }

     function sel_onchange(el) {
	var spinner= document.getElementById('user_switch_spinner');
	spinner.style.display= 'inline';

	var user= this[this.selectedIndex].innerHTML;
	var pwd= users[user];

	ajaxpost('/post/login', getParams(user, pwd), 
	       function(){
		   //alert('logged in as '+user);
		   window.location.reload();
	       }
	);
     }


     // returns a string-version of object, serialized to parameters
     function getParams(name, pwd) {
	 return "user="+name+"&passwd="+pwd;
     }

     function ajaxpost(path, params, next) {
	 var xhr= new XMLHttpRequest();
	 xhr.open("POST", path, true);

	 xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	 //xhr.setRequestHeader('Content-length', params.length);
	 //xhr.setRequestHeader('Connection', 'close');

	 xhr.onreadystatechange= function() {
	     //alert('readyState: '+xhr.readyState);
	     //alert('status: '+xhr.status);
	     if(xhr.readyState === 4) {
		 if(typeof next === 'function') {
		     next();
		 } else {
		     window.location.reload();
		 }
	     }
	 };

	 xhr.send(params);
     }
     

// SWITCHER LOGIC *************************************************************

     if ( users.length == 0 ) {
	 debug("You don't appear to have set any accounts to switch between.\nPlease edit the script around line 10 to add them.");
	 return;
     };

     var user = getLoggedInUser();
     if(user == false || !(user in users)) {
	 return;
     }

     if (document.getElementById('user_switch') !== null) {
	 debug('The script has already run, or is conflicting with another script. Please file a bug report so I can fix this.');
	 return;
     }

     buildDom(user);

 })();