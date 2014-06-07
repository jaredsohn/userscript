// ==UserScript==
// @name          Texts Easy Rep - Sponsor Version
// @namespace     text/easyrepl33t
// @description   Puts a rep button on posts.
// @include       http://leakforums.org/showthread.php*
// @include       http://www.leakforums.org/showthread.php*
// @version 	  1.2
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

//uid start
var uidList = new Array();
var uidCount = 0;
for ( var i = 0; i < links.length; i++ ) {

    element = links[i];

    if ( element.href.indexOf( "reputation.php" ) != -1 ) {
		var uid = element.href.match(/reputation\.php\?uid\=(\d*)/);
		uid = uid[1];
		uidList[uidCount]=uid;
		uidCount++;
    } 
}
//uid end

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

var regex;
var replace;
var form;
for (i = 0; i < uidList.length; i++ ) {
	form = '<br><form style="display:inline-block;" target="myrepwindow" action="reputation.php" method="post" id="xrep">';
	form += '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
	form += '<input type="hidden" name="action" value="do_add" />';
	form += '<input type="hidden" name="uid" value="'+uidList[i]+'" />';
	form += '<input type="hidden" name="pid" value="0" />';
	form += '<select name="reputation" id="reputation" style="border:1px solid black;">';
	form += '<option value="6" class="reputation_positive" style="color: green;">Positive (+6)</option>';
	form += '<option value="5" class="reputation_positive" style="color: green;">Positive (+5)</option>';
	form += '<option value="4" class="reputation_positive" style="color: green;">Positive (+4)</option>';
	form += '<option value="3" class="reputation_positive" style="color: green;">Positive (+3)</option>';
	form += '<option value="2" class="reputation_positive" style="color: green;">Positive (+2)</option>';
	form += '<option value="1" class="reputation_positive" style="color: green;">Positive (+1)</option>';
	form += '<option value="0" class="reputation_neutral" selected="selected">Neutral</option>';
	form += '<option value="-1" class="reputation_negative" style="color: red;">Negative (-1)</option>';
	form += '<option value="-2" class="reputation_negative" style="color: red;">Negative (-2)</option>';
	form += '<option value="-3" class="reputation_negative" style="color: red;">Negative (-3)</option>';
	form += '<option value="-4" class="reputation_negative" style="color: red;">Negative (-4)</option>';
	form += '<option value="-5" class="reputation_negative" style="color: red;">Negative (-5)</option>';
	form += '<option value="-6" class="reputation_negative" style="color: red;">Negative (-6)</option>';
	form += '</select>';
	form += ' <input type="text" class="textbox" name="comments" size="25" maxlength="250" style="border:1px solid black;" />';
	form += ' <input type="submit" class="bitButton" style="cursor:pointer" value="Add Rating" style="border:1px solid black;" onclick="window.open(\'http://www.leakforums.org/reputation.php\', \'myrepwindow\', \'status=1,width=400,height=350\')"/>';
	form += '</form>';
	divListnew[i].innerHTML=divListnew[i].innerHTML+form;
}