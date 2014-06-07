// ==UserScript==
// @name        MET Website - fix download links
// @author	Amr Tj. Wallas
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace   http://tjwallas.weebly.com
// @description Fixes the assigments links on the MET website
// @include     http://met.guc.edu.eg/Faculty/EvaluateAssignments.aspx
// @version     1.0
// @downloadURL http://userscripts.org/scripts/source/153023.user.js
// @updateURL   http://userscripts.org/scripts/source/153023.user.js
// ==/UserScript==

/**
 * Author: Amr Tj. Wallas
 * http://tjwallas.weebly.com
 *
 * Fixes the download links and their Content-Type when downloaded.
 */
function fix_downloads() {
	var x = 0;
	$('#ctl00_AcademicsMasterContent_submissionDiv > table > tbody > tr > td:nth-child(4) > a').each(function() {
		x = x + 1;
		this.href = this.href.match(/Repository\/.+/);
		this.href = this.href.replace("/Faculty","").replace("&File=","/");
	});	
	if (x == 0) {
		alert('Are you sure the submissions table has been loaded?');
	} else {
		alert('Download links have been fixed!');
	}
}

// ----------------------------------------------

function pad(i) { return (i < 10?"0":"") + i; }

/**
 * Author: Saher El-Neklawy
 * http://userscripts.org/users/saherneklawy
 *
 * Renames the link titles so as to include name, ID and Tut group.
 * Useful for download masks using the DownThemAll plugin
 */
function rename(){
	console.log('rename started');

	i = 1;

	selected = document.getElementById("ctl00_AcademicsMasterContent_groupsLst").selectedIndex;
	
	if (!document.getElementById("ctl00_AcademicsMasterContent_groupsLst")[selected])
	{
		return;
	}
	
	group = document.getElementById("ctl00_AcademicsMasterContent_groupsLst")[selected].text;

	while(tag = document.getElementById("ctl00_AcademicsMasterContent_submissionRepeater_ctl"+pad(i)+"_appNumDataLbl")) {
		console.log(tag.firstChild);
		tag3 = document.getElementById("ctl00_AcademicsMasterContent_submissionRepeater_ctl"+pad(i)+"_nameDataLbl");
		
		j = 0;
		while(tag2 = document.getElementById("ctl00_AcademicsMasterContent_submissionRepeater_ctl"+pad(i)+"_filesRepeater_ctl"+pad(j)+"_filesDataLink")) {
			console.log(tag2.firstChild.data);
			tag2.replaceChild(document.createTextNode(group+"`"+tag.firstChild.data +"`"+ tag3.firstChild.data+"`"+tag2.firstChild.data),tag2.firstChild);
			j++;
		}
		i += 2;
	}
}

console.log('user script loaded');
$('#contentHolderDiv h3').append("<input type='button' value='Fix downloads' id='fix_downloads'/>");
$('#fix_downloads').click(function() {
	fix_downloads();
	rename();
});