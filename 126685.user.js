// ==UserScript==
// @name            MG PM from post
// @namespace       Joe
// @description     This will let you PM users from posts.
// @include         http://www.moddedgame.com/showthread.php*
// @include         http://moddedgame.com/showthread.php*
// @version         1
// ==/UserScript==


var links = document.getElementsByTagName('a');
var element;
//my_post_key start
for ( i = 0; i < links.length; i++ ) {
	element = links[i];
	if( element.href.indexOf( "my_post_key" ) != -1 ) {
		postkey = element.href.split(/my_post_key\=/);
		postkey = postkey[1];
	}
}
//my_post_key end

//pid start
var pid
var divList = new Array();
var divCount = 0;
var divs;
divs = document.getElementsByTagName('div');
	for (j = 0; j < divs.length; j++ ) {
		element = divs[j];
		if(element.id.indexOf( "post_meta" ) != -1 ) {
			pid = element.id.match(/post_meta_(\d*)/);
			pid = pid[1];
			divList[divCount]=pid;
			divCount++;
		}
	}
//pid end

//div author_buttons float_left start
var divsnew = document.getElementsByTagName('div');
var divListnew = new Array();
var divcountnew = 0;
for(i = 0; i < divsnew.length; i++){
	var e = divsnew[i];
	if(e.className == 'author_buttons float_left') {
		divListnew[divcountnew] = e;
		divcountnew++;
	}
}
//div author_buttons float_left end

//uid start
var uidList = new Array();
var userList = new Array();
var tds = document.getElementsByTagName('td');
var uidCount = 0;
for ( var i = 0; i < tds.length; i++ ) {
    element = tds[i];
    if ( element.className == 'post_author') {
		var newElement = element.getElementsByTagName('strong')[0].getElementsByTagName('a')[0];
		var userStart = newElement.innerHTML;
		if(userStart.indexOf('<strong>') != -1){
			var user = newElement.getElementsByTagName('strong')[0].innerHTML;
		}
		else if(userStart.indexOf('<span') != -1){
			var user = newElement.getElementsByTagName('span')[0].innerHTML;
		} else {
			user = userStart;
		}
		var uid = newElement.href.match(/uid\=(\d*)/);
		uid = uid[1];
		uidList[uidCount]=uid;
		userList[uidCount]=user;
		uidCount++;
    } 
}
//uid end

var cur;
for (i = 0; i < uidList.length; i++ ) {
	// alert(postkey + '<br />' + uidList[i]);
	//form start
	var formaction = '<div id="xeropmfrompost'+i+'" style="display:none;"><form action="private.php" method="post" name="input" target="_blank"><input type="hidden" name="action" value="do_send" />';
	var formpmid = '<input type="hidden" name="pmid" value="" />';
	var formdo = '<input type="hidden" name="do" value="" />';
	var formicon = '<input type="hidden" name="icon" value="" />';
	var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
	var formuid = '<input type="hidden" name="uid" value="'+uidList[i]+'" />';
	var formto = '<strong>Recipients: </strong><input type="text" class="textbox" name="to" id="to" tabindex="3" value="'+userList[i]+'" />';
	var formsubject = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Subject: </strong><input type="text" class="textbox" name="subject" size="40" maxlength="85" value="" tabindex="3" /><br />';
	var formchecks = '<input type="checkbox" class="checkbox" name="options[signature]" value="1" tabindex="5" checked="checked" />Signature - <input type="checkbox" class="checkbox" name="options[savecopy]" value="1" tabindex="7" checked="checked" />Save a Copy - <input type="checkbox" class="checkbox" name="options[readreceipt]" value="1" tabindex="8" checked="checked" />Request Read Receipt';
	var formsend = '<input type="submit" class="button" name="submit" value="Send Message" tabindex="9" accesskey="s" /><input type="submit" class="button" name="saveasdraft" value="Save as Draft" tabindex="10" /><input type="submit" class="button" name="preview" value="Preview" tabindex="11" />';
	var formmessage = '<textarea name="message" rows="7" cols="90" tabindex="3">[size=x-small]Sent from post: http://www.moddedgame.com/showthread.php?pid='+divList[i]+'#pid'+divList[i]+' [/size] \n\n</textarea><br />';
	var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form></div>';
	//form end
		
	cur = 'post_meta_'+divList[i];
	divListnew[i].innerHTML='<a class="bitButton" href="javascript:void(0);" onclick="javascript:document.getElementById(\'xeropmfrompost'+i+'\').style.display = (document.getElementById(\'xeropmfrompost'+i+'\').style.display == \'block\') ? \'none\' : \'block\'">PM From Post</a>' + divListnew[i].innerHTML;
	document.getElementById(cur).innerHTML = document.getElementById(cur).innerHTML + finalform;