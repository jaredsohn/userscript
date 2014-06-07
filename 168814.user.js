// ==UserScript==
// @name          Texts Quick Reply PM
// @namespace     text/quickreply
// @description   Provides a quick reply textbox for users while reading the PM
// @include       http://leakforums.org/private.php?action=read*
// @include       http://www.leakforums.org/private.php?action=read*
// @version 	  1.3
// ==/UserScript==

//pmid start
var links = document.getElementsByTagName('a');
var element;

for ( var i = 0; i < links.length; i++ ) {

    element = links[i];

    if ( element.href.indexOf( "pmid" ) != -1 ) {
		if ( element.href.indexOf( "#content" ) != -1 ) {
			var pmid = element.href.match(/pmid\=(.*?)#content/);
			pmid = pmid[1];
		}
    } 
}
//pmid end

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
for ( i = 0; i < links.length; i++ ) {
	element = links[i];
	if( element.href.indexOf( "uid" ) != -1 ) {
		uid = element.href.split(/uid\=/);
		uid = uid[1];
		i=links.length;
	}
}
//uid end

//username start
var span = document.getElementsByTagName('span');
for (var i=0; i < span.length; i++) {
	element = span[i];
	var theHTML = element.innerHTML;
	if( element.className == 'largetext') {
		if( theHTML.indexOf('<a href="http://www.leakforums.org/member.php?action=profile&amp;uid=') != -1 ) {
			if( theHTML.indexOf('color') != -1) {
				user = theHTML.split(/color.*?>(.*?)<\/span>/);
				user = user[1];
				if( theHTML.indexOf('strong') != -1) {
					user = user.split(/<strong>(.*?)<\/strong>/);
					user = user[1];
				}
			} else {
				user = theHTML.split(/">(.*?)<\/a>/);
				user = user[1];
			}
		}
	}
}
//username end

//subject start
var nav = document.getElementsByTagName('div');
for (var i=0; i < nav.length; i++) {
	element = nav[i];
	var theHTML = element.innerHTML;
	if( theHTML.indexOf('<a href="private.php">Private Messages</a>') != -1 ) {
		subject = theHTML.split(/ve">(.*?)<\/span>/);
		subject = subject[1];
	}
}
//subject end

//form start
var formaction = '<div align="center"><form action="private.php" method="post" name="input"><input type="hidden" name="action" value="do_send" />';
var formpmid = '<input type="hidden" name="pmid" value="'+pmid+'" />';
var formdo = '<input type="hidden" name="do" value="reply" />';
var formicon = '<input type="hidden" name="icon" value="" />';
var formmy_post_key = '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
var formuid = '<input type="hidden" name="uid" value="'+uid+'" />';
var formto = '<input type="hidden" name="to" value="'+user+'" />';
var formsubject = '<input type="hidden" name="subject" value="'+subject+'" />';
var formchecks = '<input type="checkbox" class="checkbox" name="options[signature]" value="1" tabindex="5" checked="checked" />Signature - <input type="checkbox" class="checkbox" name="options[savecopy]" value="1" tabindex="7" checked="checked" />Save a Copy - <input type="checkbox" class="checkbox" name="options[readreceipt]" value="1" tabindex="8" checked="checked" />Request Read Receipt';
var formsend = '<input type="submit" class="button" name="submit" value="Send Message" tabindex="9" accesskey="s" /><input type="submit" class="button" name="saveasdraft" value="Save as Draft" tabindex="10" /><input type="submit" class="button" name="preview" value="Preview" tabindex="11" />';
var formmessage = '<textarea name="message" id="message" rows="7" cols="90" tabindex="4"></textarea><br />';
var finalform = formaction+formpmid+formdo+formicon+formmy_post_key+formuid+formto+formsubject+formmessage+formsend+formchecks+'</form></div>';
//form end

//add it in start
document.getElementById('post_meta_').innerHTML= '<hr style="width: 20%;background: #000;" />' + finalform;
//add it in end