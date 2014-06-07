// ==UserScript==
// @name           Fix RateMyProfessors
// @author         Jon Uleis
// @namespace      http://onevision.googlepages.com
// @description    This script inserts the alphabetical and departmental "Browse Professors" section atop individual professor pages, and attempts to remove many advertisements from the site.
// @include        http://*ratemyprofessors.com*
// ==/UserScript==

var text = document.getElementsByTagName('body')[0].innerHTML;
var regex = /\?sid=(.*?)\">(.*?)<\/a/;
var result = text.match(regex);
if(result!=null){var schoolid = result[1];}
if(result!=null){var schoolname = result[2];}

var bcrumb, table = document.createElement("span"),
currentURL = window.location.href, ad = new Array();
ad[1] = document.getElementById('rmp_leftColumn');
ad[2] = document.getElementById('mtvuBar');
ad[3] = document.getElementById('AdDiv1332');
ad[4] = document.getElementById('AdDiv1333');
ad[5] = document.getElementById('upperAdvertisement');
ad[6] = document.getElementById('upperAdvertisementImg');
ad[7] = document.getElementById('rightAdvertisement');
ad[8] = document.getElementById('rightAdvertisementImg');
ad[9] = document.getElementById('lowerAdvertisement');
ad[10] = document.getElementById('lowerAdvertisementImg');
ad[11] = document.getElementById('promo1_id');
ad[12] = document.getElementById('promo2_id');
ad[13] = document.getElementById('promo3_id');
ad[14] = document.getElementById('promo4_id');
ad[15] = document.getElementById('FLASH_AD');

for(i=1;i<ad.length;i++){
if(ad[i]){ad[i].parentNode.removeChild(ad[i]);} }

document.body.innerHTML=document.body.innerHTML.replace(/id=\"rmp_key\"/g,"id=\"rmp_key\" style=\"width\: 510px;\"");
document.body.innerHTML=document.body.innerHTML.replace(/class=\"rmp_leaderboard\"/g,"");
//document.body.innerHTML=document.body.innerHTML.replace(/class=\"withAds\"/g,"style=\"display\:none\""); Doesn't work?
document.body.innerHTML=document.body.innerHTML.replace(/id=\"rmp_tabB\" style=\"width\: 650px;/g,"id=\"rmp_tabB\" style=\"width\: 650px; display\:none;");
document.body.innerHTML=document.body.innerHTML.replace(/id=\"DIV_/g,"style=\"display\:none;\" id=\"DIV_");
document.body.innerHTML=document.body.innerHTML.replace(/id=\"ew_/g,"style=\"display\:none;\" id=\"ew_");
document.body.innerHTML=document.body.innerHTML.replace(/\<h3\>Advertisement\<\/h3\>/g,"");
document.body.innerHTML=document.body.innerHTML.replace(/ad\.doubleclick/g,"dsaoihdfsoifh");
document.body.innerHTML=document.body.innerHTML.replace(/2mdn\.net/g,"dsaoihdfsoifh");

table.innerHTML = '<h3 align="LEFT" style="padding-bottom: 3px;">Browse Professors: '+schoolname+'</h3><div class="rmp_search_nav">' +
	'<ul>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=A">A</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=B">B</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=C">C</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=D">D</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=E">E</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=F">F</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=G">G</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=H">H</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=I">I</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=J">J</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=K">K</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=L">L</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=M">M</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=N">N</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=O">O</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=P">P</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=Q">Q</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=R">R</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=S">S</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=T">T</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=U">U</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=V">V</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=W">W</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=X">X</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=Y">Y</a>&nbsp;</li>' +
	'<li><a href="SelectTeacher.jsp?the_dept=All&amp;sid='+schoolid+'&amp;orderby=TLName&amp;letter=Z">Z</a></li> |&nbsp;' +
	'<li><strong><a href="AddTeacher.jsp?sid='+schoolid+'">Add A Professor</a>&nbsp;</strong></li>' +
	'</ul>' +
	'</div>' +
	'<form type="post" id="rmp_nameSearch" name="deptForm" action="SelectTeacher.jsp">' +
	'<ul><h4>Find professor by department:</h4>' +
	'<li>' +
	'<select name="the_dept" style="width: 158px;">' +
	'<option value="All" selected="selected">All</option>' +
	'<option value="African Studies">African Studies</option>' +
	'<option value="Anatomy">Anatomy</option>' +
	'<option value="Anthropology">Anthropology</option>' +
	'<option value="Applied Mathematics">Applied Mathematics</option>' +
	'<option value="Art">Art</option>' +
	'<option value="Art &amp; Design">Art &amp; Design</option>' +
	'<option value="Art History">Art History</option>' +
	'<option value="Asian Studies">Asian Studies</option>' +
	'<option value="Astronomy">Astronomy</option>' +
	'<option value="Biochemistry">Biochemistry</option>' +
	'<option value="Biology">Biology</option>' +
	'<option value="Biomedical Engineering">Biomedical Engineering</option>' +
	'<option value="Business">Business</option>' +
	'<option value="Career Development">Career Development</option>' +
	'<option value="Chemistry">Chemistry</option>' +
	'<option value="Chinese">Chinese</option>' +
	'<option value="Classical &amp; Medieval Studies">Classical &amp; Medieval Studies</option>' +
	'<option value="Comparative Literature">Comparative Literature</option>' +
	'<option value="Computer Science">Computer Science</option>' +
	'<option value="Criminal Justice">Criminal Justice</option>' +
	'<option value="Culinary Arts">Culinary Arts</option>' +
	'<option value="Design">Design</option>' +
	'<option value="Ecology &amp; Evolutionary Biology">Ecology &amp; Evolutionary Biology</option>' +
	'<option value="Economics">Economics</option>' +
	'<option value="Education">Education</option>' +
	'<option value="Engineering">Engineering</option>' +
	'<option value="English">English</option>' +
	'<option value="Ethnic Studies">Ethnic Studies</option>' +
	'<option value="European Studies">European Studies</option>' +
	'<option value="Film">Film</option>' +
	'<option value="Fine Arts">Fine Arts</option>' +
	'<option value="French">French</option>' +
	'<option value="Geography">Geography</option>' +
	'<option value="Geology">Geology</option>' +
	'<option value="Health Science">Health Science</option>' +
	'<option value="History">History</option>' +
	'<option value="Humanities">Humanities</option>' +
	'<option value="Instructional Technology">Instructional Technology</option>' +
	'<option value="International Studies">International Studies</option>' +
	'<option value="Italian">Italian</option>' +
	'<option value="Italian Studies">Italian Studies</option>' +
	'<option value="Journalism">Journalism</option>' +
	'<option value="Languages">Languages</option>' +
	'<option value="Latin American Studies">Latin American Studies</option>' +
	'<option value="Linguistics">Linguistics</option>' +
	'<option value="Literature">Literature</option>' +
	'<option value="Management">Management</option>' +
	'<option value="Marketing">Marketing</option>' +
	'<option value="Mathematics">Mathematics</option>' +
	'<option value="Medicine">Medicine</option>' +
	'<option value="Music">Music</option>' +
	'<option value="Neurological Sciences">Neurological Sciences</option>' +
	'<option value="Not Specified">Not Specified</option>' +
	'<option value="Nursing">Nursing</option>' +
	'<option value="Pharmacology">Pharmacology</option>' +
	'<option value="Philosophy">Philosophy</option>' +
	'<option value="Physical Ed">Physical Ed</option>' +
	'<option value="Physics">Physics</option>' +
	'<option value="Physics &amp; Astronomy">Physics &amp; Astronomy</option>' +
	'<option value="Political Science">Political Science</option>' +
	'<option value="Psychology">Psychology</option>' +
	'<option value="Religion">Religion</option>' +
	'<option value="Religious Studies">Religious Studies</option>' +
	'<option value="Science">Science</option>' +
	'<option value="Social Science">Social Science</option>' +
	'<option value="Social Work">Social Work</option>' +
	'<option value="Sociology">Sociology</option>' +
	'<option value="Spanish">Spanish</option>' +
	'<option value="Technology &amp; Operations Mgmt">Technology &amp; Operations Mgmt</option>' +
	'<option value="Theater">Theater</option>' +
	'<option value="Theology">Theology</option>' +
	'<option value="Women\'s Studies">Women\'s Studies</option>' +
	'<option value="Writing">Writing</option>' +
	'</select>' +
	'</li><li>&nbsp;<input value="Search" onclick="document.forms[\'deptForm\'].submit();" type="submit"></li></ul>' +
	'<input name="orderby" value="TLName" type="hidden">' +
	'<input name="sid" value="'+schoolid+'" type="hidden">' +
	'</form><br />';
	
bcrumb = document.getElementById('breadcrumb_links');
if (bcrumb && currentURL.match("Rating")!=null) {   
	bcrumb.parentNode.insertBefore(table, bcrumb);
}