// ==UserScript==
// @name			HF Scripts - Easy Report
// @namespace 		Glassy/hfreporting
// @description 	Makes reporting posts/threads to Glassy MUCH easier.
// @include  		*hackforums.net/showthread.php*
// @version  		1.1.2
// ==/UserScript==

var navBit = document.getElementsByClassName('navigation')[0];
if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=25">The Lounge</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="The Lounge Section Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Lounge Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=4">Beginner Hacking</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Beginner Hacking Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Beginner Hacking Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=155">Member Contests</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Member Contests Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Member Contests Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=128">Science, Religion, Philosophy, and Politics</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Science, Religion, Philosophy, and Politics Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Science, Religion, Philosophy, and Politics Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=186">Free Services and Giveaways</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Free Services and Giveaways Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Free Services and Giveaways Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=47">Hacking Tutorials</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Hacking Tutorials Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Hacking Tutorials Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=43">Website and Forum Hacking</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Website and Forum Hacking Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Website and Forum Hacking Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=6">Graphics</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="The Graphics Section Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Graphics Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=120">Monetizing Techniques</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Monetizing Techniques Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Monetizing Techniques Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=221">Free Money Making Ebooks</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Free Money Making Ebooks Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Free Money Making Ebooks Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=127">Referrals</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Referrals Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Referrals Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=121">Shopping Deals</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Shopping Deals Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Shopping Deals Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}else if(navBit.innerHTML.indexOf('<a href="forumdisplay.php?fid=259">Personal Life</a>') != -1) {
	
	var links = document.getElementsByTagName('a');
	for ( i = 0; i < links.length; i++ ) {
		var element = links[i];
		if( element.href.indexOf( "my_post_key" ) != -1 ) {
			postkey = element.href.split(/my_post_key\=/);
			postkey = postkey[1];
		}
	}	
	
	if(document.body.innerHTML.indexOf("<!-- start: showthread_classic_header -->") != -1) {
		var tds = document.getElementsByTagName('td');
		var authBut = new Array();
		for(var z = 0; z < tds.length; z++) {
			var ele = tds[z];
			if(ele.align == "right") {
				authBut[authBut.length] = ele;
			}
		}
	} else {
		var authBut = document.getElementsByClassName('post_management_buttons');
	}
	
	for(var i = 0; i < authBut.length; i++) {
		var divHold = document.createElement("span");
		var el = authBut[i];
		pid = el.innerHTML.match(/pid\=(\d*)/);
		pid = pid[1];
		var formaction = '<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" />';
		var formpmid = '<input type="hidden" name="pmid" value="" />';
		var formdo = '<input type="hidden" name="do" value="" />';
		var formicon = '<input type="hidden" name="icon" value="" />';
		var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
		var formuid = '<input type="hidden" name="uid" value="175033" />';
		var formto = '<input type="hidden" name="to" id="to" value="Glassy" />';
		var formsubject = '<input type="hidden" name="subject" value="Personal Life Report" />';
		var formchecks = '<input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" />';
		var formsend = '<input type="submit" class="bitButton" name="submit" value="Personal Life Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to Glassy?\');"/>';
		var formmessage = '<input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+pid+'#pid'+pid+'" />';
		var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form>';
		divHold.innerHTML = finalform;
		el.appendChild(divHold);
	}
}