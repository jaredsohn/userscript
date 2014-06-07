///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name           NewAccount's RMB User Ignore Script
// @namespace      rmbuserignore
// @description    Easily ignore or unignore forum users on ratemybody.com. Huge chunks of code + help from joebloe3000
// @include        http://www.ratemybody.com/*
// @exclude        http://www.ratemybody.com/loggedin/instant_message.aspx*
// ==/UserScript==

// Version 0.7 of this script has added the following enhancements:
// * Visual interface, no more editing text files
// * Ability to stipulate whether a user's threads are ignore as well as their posts
// * Abilitity to replace an ignored user's posts with a customizable string
// * Ability to easily add, remove or view your ignore list from any page on RMB forums
// * All data saved locally
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Load the ignored users list if it exists, else create it. This list is saved in local storage (about:config >> greasemonkey.scriptvals.rmbuserignore
	var ignoredUsers = eval(GM_getValue('ignoredUsersList', '[]')); 
	var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('ignoredUsersList') != 'undefined';
	if (isGM == false){
		var ignoredUsers = [{user: 'test',threads: true, replace: false, replacetext: 'String'}];
		GM_setValue('ignoredUsersList', uneval(ignoredUsers));
		alert('NewAccount\'s RMB User Ignore Script - First Load (you should never see this message again)');
	}
		
// Add jQuery
	var GM_JQ = document.createElement('script'); 
	GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	GM_JQ.type = 'text/javascript'; 
	document.getElementsByTagName('head')[0].appendChild(GM_JQ); 

	var $;
	(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
    GM_wait();
    })();

// Check if jQuery's loaded
	function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
    } else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
    }

// All script code placed inside this function
	function letsJQuery() {
	// Add JQuery to RMB
	GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	GM_JQ.type = 'text/javascript'; 
	document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
	
	// Let's create and style our ignore panel
	$('.subheadertitle_content').append('<a class="userIgnore">User Ignore Settings</a><div class="ignoreContainer"></div>').css({ position: 'relative', width: '890px'});
    var ignoreContainer = $('.ignoreContainer');
	ignoreContainer.append('<h1 align="center">Currently Ignored Users</h1><br>'+
	'<p>This is a list of the users you have currently ignored:</p><br></div>');
	ignoreContainer.find('h1').css({
		color: 'white'
	});
	ignoreContainer.css({
		display: 'none',
		padding: '10px',
		position: 'absolute',
		height: '1200px',
		width: '300px',
		border: '1px solid #000',
		top: '19px',
		right: '-8px',
		zIndex: '10',
		backgroundImage: 'url(http://includes.ratemybody.com/schemes/1/bg_black.gif)'
	});
	$('.userIgnore').css({
		marginLeft: '15px',
		textDecoration: 'underline',
		cursor: 'pointer',
		'float': 'right'
	}).click( function() {
		$('.ignoreContainer').slideToggle();
	});
	

	// Let's display all the ignored users
	for ( var i = 0; i < ignoredUsers.length; i++ ) {
		ignoreContainer.append('<p style="color:orange;">'+
		ignoredUsers[i]['user']+
		'</a></p>');
	}
	
	
	// Let's add an interface 
	ignoreContainer.append('<br><br><hr><br><h1 align="center">Add To Ignore</h1><br>'+
		'<p>To add a new user to your ignore list, just type in their name and click the ADD button.</p><br></div>'+
		'<form name="forumignore" id="xxyy" method="post" action="#">' +
		'<label for="username"></label>'+
		'<input name="username" type="textarea" id="username" value="enter username" ><br><br>'+
		'<input type="checkbox" name="ignoretopics" id="ignoretopics" checked>' +
		'<label for="ignoretopics">Ignore Topics</label> <br><br>'+
		'<input type="checkbox" name="replacetext" id="replacetext" unchecked>' +
		'<label for"replacetext">Replace Posts</label> <br><br>'+
		'<input name="replacemnenttext" type="text" id="replacemnenttext" value="optional replacement text" style="background:#E5F0F9;font-style:italic;" size=35> <br><br>'+
		'<input type="submit" name="ignorelist" id="ignorelist" value="Add">'+
		'<br><br><hr><br><h1 align="center">Remove From Ignore</h1><br>'+
		'<p>To remove a user from your list, just type in their name and click the REMOVE button.</p><br></div>'+
		'<label for="removeusername"></label>'+
		'<input name="removeusername" type="textarea" id="removeusername" value="enter username" ><br><br>'+
		'<input type="submit" name="removeignorelist" id="removeignorelist" value="Remove">'+
		'</form>');
		
	// Let's define a function, and call it onClick
	function ignorelistSave(){
		var formReplacement = false;
		var formTopics = false;
		var formReplacemnenttext='optional replacement text';
		formUsername=$('#username').val();
		if ( ($('#replacetext:checked').length) > 0 ){
			var formReplacement=true;
			formReplacemnenttext=$('#replacemnenttext').val();
			//alert(formReplacemnenttext);0
		} 
		if( ($('#ignoretopics:checked').length) > 0 ){
			var formTopics=true;
		}
		ignoredUsers.push({user: formUsername, threads: formTopics, replace: formReplacement, replacetext: formReplacemnenttext});
		GM_setValue('ignoredUsersList', uneval(ignoredUsers));
	}
	function ignorelistDelete(){
		for ( var i = 0; i < ignoredUsers.length; i++ ) {
			//test=ignoredUsers[1]["user"];
			tobedeleted=$('#removeusername').val();
			if (tobedeleted == ignoredUsers[i]["user"]){
			ignoredUsers.splice(i,1);
			}
			GM_setValue('ignoredUsersList', uneval(ignoredUsers));
		}
	}
	var ignorelistClick = document.getElementById('ignorelist');
	ignorelistClick.addEventListener("click", ignorelistSave, true);
	
	var ignorelistClick = document.getElementById('removeignorelist');
	ignorelistClick.addEventListener("click", ignorelistDelete, true);
//	for ( var i = 0; i < ignoredUsers.length; i++ ) {
//		//ignoredeleteClick = 'ignoredeleteClick'+i;
//		window['ignoredeleteClick' + i] = document.getElementById('removeignorelist'+i);
//		window['ignoredeleteClick' + i].addEventListener("click", ignorelistDelete(window['ignoredeleteClick' + i]), true);
//	}

// This section of the scrip will do the actual work

	var div;
	var divs = document.getElementsByTagName( 'div' );
	// THIS LOOP CHECKS EVERY DIV WITH A USERNAME IN IT TO FIND POSTS BY IGNORED USERS, AND THEN IT HIDES THE DIV 2 LEVELS UP (WHICH IS THE POST DIV). IF "THREADS" IS TRUE, THEN INSTEAD OF HIDING THE DIV WE REPLACE THE TEXT WITH REPLACEMENT TEXT
	for ( var i = 0; i < divs.length; i++ ) {
		div = divs[ i ];
		if ( div.className == "topic_details_item5" ) {
			for ( var ii = 0; ii < ignoredUsers.length; ii++ ) {
				var test = div.innerHTML.search(ignoredUsers[ii]['user']+'.');
				if ( test != -1 ) {
					divs[ i + 11].innerHTML = ignoredUsers[ii]['replacetext'];
					if ( ignoredUsers[ii]['threads'] = false ) {
					divs[i-1].parentNode.style.display = "none";
					}
				}
				
			}
		}
	}
	
	
	var divtopic;
	var divstopic = document.getElementsByTagName( 'div' );
	// THIS LOOP CHECKS EVERY DIV WITH A USERNAMES IN IT TO FIND TOPICS STARTED BY IGNORED USERS, THEN IT HIDES THE DIV 2 LEVELS UP (WHICH IS THE POST DIV) 
	for ( var i = 0; i < divstopic.length; i++ ) {
		divtopic = divstopic[ i ];
		if ( divtopic.className == "topiclisting2_topic_0" ) {
			for ( var ii = 0; ii < ignoredUsers.length; ii++ ) {
				if ( divtopic.innerHTML == ignoredUsers[ii]['user'] && ignoredUsers[ii]['threads'] ){
					divs[i-1].parentNode.style.display = "none";
				}
			}
		}
	}

}
