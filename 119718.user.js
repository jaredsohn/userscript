// ==UserScript==
// @name          1337's Easy Report
// @namespace     leet/easyreport
// @description   Puts a report button on posts.
// @include       http://hackforums.net/showthread.php*
// @include       http://www.hackforums.net/showthread.php*
// @version 	  1.0
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
//uid start
var uidList = new Array();
var uidCount = 0;
for ( var i = 0; i < links.length; i++ ) {

    element = links[i];

    if ( element.href.indexOf( "report.php" ) != -1 ) {
		var uid = element.href.match(/report\.php\?pid\=(\d*)/);
		uid = uid[1];
		uidList[uidCount]=uid;
		uidCount++;
    } 
}
//uid end
var regex;
var replace;
var form;
var cur;
for (i = 0; i < pidList.length; i++ ) {
	form = '<form method="post" action="report.php">';
	form += '<input type="hidden" name="my_post_key" value="'+postkey+'" />';
	form += '<input type="hidden" value="do_report" name="action">';
	form += '<input type="hidden" name="pid" value="'+pidList[i]+'" />';
	form += '<input type="hidden" name="pid" value="0" />';
	form += '<select name="reason" id="reason" style="border:1px solid black;">';
	form += '<option value="">Please select the best reason.</option>';
	form += '<option value="adult content">Adult Content</option></option>';
	form += '<option value="advertising">Forum Advertising</option>';
	form += '<option value="copyright">Copyright Infringement</option>';
	form += '<option value="cross posting">Cross Posting</option>';
	form += '<option value="donation begging">Donation Begging</option>';
	form += '<option value="flame threat harassment">Flame, Threat, Harassment</option>';
	form += '<option value="blackhat activity">Forbidden Blackhat Activity</option>';
	form += '<option value="infected download">Infected Download or Link</option>';
	form += '<option value="leeched">Leeched Post</option>';
    form += '<option value="low quality">Low Quality</option>';
    form += '<option value="market cross posting">Market Cross Posting</option>';
    form += '<option value="marketplace violation">Marketplace Violation</option>';
	form += '<option value="not in marketplace">Not In Marketplace</option>';
	form += '<option value="off topic">Unrelated or Off Topic Post</option>';
	form += '<option value="personal data">Personal Data</option>';
	form += '<option value="profile violation">Profile Violation</option>';
	form += '<option value="rep abuse">Reputation Abuse</option>';
	form += '<option value="spamming">Spam Posting</option>';
	form += '<option value="wrong forum">Wrong Forum</option>';
	form += '<option value="other">Other</option>';
	form += '</select>';
	form += '<input type="submit" class="button" value="Report Post" style="border:1px solid black;" onclick="window.open(\'http://www.hackforums.net/report.php\', \'report\', \'status=1,width=400,height=350\')"/>';
	form += '</form>';
	cur = 'post_meta_'+divList[i];
	document.getElementById(cur).innerHTML=form;

}
