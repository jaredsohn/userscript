// ==UserScript==
// @name    Report From Post for HackForums.net
// @namespace  spafic/report
// @description  Report From Post for HackForums.net
// @include  *hackforums.net/showthread.php*
// @include  *hackforums.net/report.php*
// @version  1.0.5
// ==/UserScript==

var links = document.getElementsByTagName('a');
for ( i = 0; i < links.length; i++ ) {
	var element = links[i];
	if( element.href.indexOf( "my_post_key" ) != -1 ) {
		var postkey = element.href.split(/my_post_key\=/);
		postkey = postkey[1];
	}
}

var report_areas = document.getElementsByClassName("post_meta");

for(i=0;i<report_areas.length;i++) {
    var pid = report_areas[i].id.match(/post_meta_(\d*)/)[1];

	var addme = document.createElement("div");
    addme.setAttribute("style","display:none;text-align:right;float:right;");
	addme.setAttribute("id","report_from_post_"+i);
	addme.innerHTML = '<form action="report.php?pid='+pid+'" id="myShittyForm_'+i+'" method="POST" target="_BLANK"><input type="hidden" name="my_post_key" value="'+postkey+'"><input type="hidden" name="action" value="do_report"><input type="hidden" name="pid" value="'+pid+'"><span class="smalltext">Your reason for reporting this post is:</span><br /><select name="reason"><option value="">Please select the best reason.</option><option value="adult content">Adult Content</option><option value="advertising">Forum Advertising</option><option value="copyright">Copyright Infringement</option><option value="cross posting">Cross Posting</option><option value="donation begging">Donation Begging</option><option value="flame threat harassment">Flame, Threat, Harassment</option><option value="blackhat activity">Forbidden Blackhat Activity</option><option value="infected download">Infected Download or Link</option><option value="leeched">Leeched Post</option><option value="low quality">Low Quality</option><option value="market cross posting">Market Cross Posting</option><option value="marketplace violation">Marketplace Violation</option><option value="not in marketplace">Not In Marketplace</option><option value="off topic">Unrelated or Off Topic Post</option><option value="personal data">Personal Data</option><option value="profile violation">Profile Violation</option><option value="rep abuse">Reputation Abuse</option><option value="spamming">Spam Posting</option><option value="wrong forum">Wrong Forum</option><option value="other">Other</option></select><br /><button type="submit" onclick="document.getElementById(\'report_from_post_'+i+'\').innerHTML=\'<span style=color:green>Reported!</span>\'" class="button" value="Report Post">Report Post</button></form>';
	
	var addme2 = document.createElement("div");
	addme2.setAttribute("style","clear:both");
	
	report_areas[i].appendChild(addme);
	report_areas[i].appendChild(addme2);
}

var button_areas = document.getElementsByClassName("post_management_buttons float_right");

for(i = 0; i < button_areas.length; i++){
	var oldreport;
	var yourpost;
	for(x=0;x<=500;x++) {
		oldreport = button_areas[i].getElementsByTagName("a")[x];
		if(oldreport.innerHTML.indexOf("Report") != -1) {
			break;
		}
	}
	oldreport.setAttribute("style","cursor:pointer");
	oldreport.setAttribute("id","report_button_"+i);
	oldreport.addEventListener("click",new Function('document.getElementById("report_from_post_'+i+'").style.display = (document.getElementById("report_from_post_'+i+'").style.display == "inline") ? "none" : "inline";'),false);
	oldreport.setAttribute("rel","");
	oldreport.removeAttribute("href");
}

if(document.location.toString().indexOf("report.php")!=-1) {
	window.close();
}