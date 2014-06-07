// ==UserScript==
// @name          Mr. Sky's Testing Script
// @namespace     mrsky/testing
// @description   Testing, testing.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==
$(function(){
    var tbl = $('<table>').attr('id', 'skytable');
	var cont = $('div#content').html();
	var nav = "<div class='menu'>\
				<a href='http://www.hackforums.net/'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/home.gif' alt='Home Page' title='Hack Forums' />Home</a><br />\
				<a href='http://www.hackforums.net/upgrade.php'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/subscribe.gif' alt='' title='upgrade your account' />Upgrade</a><br />\
				<a href='http://www.hackforums.net/search.php'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/search.gif' alt='' title='' />Search</a><br />\
				<a href='http://www.hackforums.net/memberlist.php'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/memberlist.gif' alt='' title='' />Member List</a><br />\
				<a href='http://www.hackforums.net/misc.php?action=help'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/help.gif' alt='' title='' />Help</a><br />\
				<a href='http://twitter.com/hackforumsnet'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/twitter.gif' alt='contact' title='twitter' />Follow</a><br />\
				<a href='contact.php'><img src='http://cdn.hackforums.net/images/blackreign/toplinks/contact.gif' alt='contact' title='contact' />Contact</a><br />\
		</div>";
	tbl.append(
    	$('<tr>').append(
    		$("<td style='height:100%;width:20%;'>").html(nav),
    		$("<td style='height:100%;width:80%;'>").html(cont)
    	)
	);
	//$('body').append(tbl);
	$(document).html('&nbsp;');
});