// ==UserScript==
// @name           Dugout Training Analyser
// @namespace      DOTA
// @description    A small extension to show the numeric values behind the training screen
// @include        http://do*.dugout-online.com/training.php?pg=tranalyze*
// ==/UserScript==

// Version 1.0 based upon the original dugtool by Lightstoner and Chancentod. 

/**********************version history*************************** 
* Extension GUID 8f0c29a7-6ad5-4383-8190-9561d3b6b5bf


Version 1.3.4
- Compatibility with FF4

Version 1.3.3
- Fixed parsing error with new DO code
- Added extra character to codestrip to handle some values

Version 1.3.1
-Updated FF version

Version 1.3
Changes:
- Added variable checking for players with 1200 TP's in a skill. Instead of displaying green bars, the tool displays 'Error' instead. Just a patch for the moment.
The tool will display "Error" and "N/A" as the entries after it encounters a bar that is maxed. No work around yet.

Version 1.2
Changes:
- Added the date and player name at the top of the box.
- Moved the links to the bottom of the box.
You can now copy easily from the tool and paste into excel. The date and playername at the top of the box preserve tab formatting for easy pasting.

Version 1.1
Several bug fixes in this version:
- Reading of Strength value fixed
- Better handling of different conditions
- Yellow/Red/Green values now handled correctly

Version 1.0
This is my first release of this tool so if you find any bugs or have any suggestions, feel free to post them in this thread or contact me directly. This only works with Firefox.
*************************************************************/

function CopyToClipboard()
{
   CopiedTxt = document.selection.createRange();
   CopiedTxt.execCommand("Copy");
}

function clearcode(codestring) {
    var temp = codestring.slice(250,270);
      var retval = "";
        for (var n = 0; n < temp.length; n++) 
		{
            var c = temp.charCodeAt(n);
             if((c > 47) && (c < 58)) 
			{
                retval += String.fromCharCode(c);
            }
        }
        return retval;
		
}

function getcurrentplayer(string1){
var matchPos1 = string1.search(/selected/g) +20;
string1 = string1.slice(matchPos1);
var matchPos2 = string1.search(/</g);
string1 = string1.slice(0,matchPos2);
var retval = "";
	for (var n = 0; n < string1.length; n++)
		{
            var c = string1.charCodeAt(n);
             retval += String.fromCharCode(c);
        }
return retval;
}

function getDate()
{
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
return(day + "/" + month + "/" + year);
}


var playerselected = getcurrentplayer(document.getElementById("plid_form").getElementsByTagName("select")[0].innerHTML);

	var skill1 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[2].innerHTML;
	var tag1 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[3].innerHTML;
	var skill2 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[7].innerHTML;
	var tag2 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[8].innerHTML;
	var skill3 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[12].innerHTML;
	var tag3 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[13].innerHTML;
	var skill4 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[17].innerHTML;
	var tag4 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[18].innerHTML;
	var skill5 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[23].innerHTML;
	var tag5 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[24].innerHTML;
	var skill6 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[28].innerHTML;
	var tag6 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[29].innerHTML;
	var skill7 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[33].innerHTML;
	var tag7 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[34].innerHTML;
	var skill8 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[38].innerHTML;
	var tag8 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[39].innerHTML;
	var skill9 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[43].innerHTML;
	var tag9 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[44].innerHTML;
	var skill10 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[48].innerHTML;
	var tag10 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[49].innerHTML;
	var skill11 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[53].innerHTML;
	var tag11 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[54].innerHTML;
	var skill12 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[58].innerHTML;
	var tag12 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[59].innerHTML;
	var skill13 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[63].innerHTML;
	var tag13 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[64].innerHTML;
	var skill14 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[68].innerHTML;
	var tag14 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[69].innerHTML;
	var skill15 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[73].innerHTML;
	var tag15 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[74].innerHTML;
	var skill16 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[78].innerHTML;
	var tag16 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[79].innerHTML;
	var skill17 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[83].innerHTML;
	var tag17 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[84].innerHTML;
	var skill18 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[88].innerHTML;
	var tag18 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[89].innerHTML;
	var skill19 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[93].innerHTML;
	var tag19 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[94].innerHTML;
	var skill20 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[99].innerHTML;
	var tag20 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[100].innerHTML;
	var skill21 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[104].innerHTML;
	var tag21 = document.getElementsByTagName("table")[10].getElementsByTagName("td")[105].innerHTML;
	
	
var skillval1 = clearcode(tag1) * 3;
var skillval2 = clearcode(tag2) * 3;
var skillval3 = clearcode(tag3) * 3;
var skillval4 = clearcode(tag4) * 3;
var skillval5 = clearcode(tag5) * 3;
var skillval6 = clearcode(tag6) * 3;
var skillval7 = clearcode(tag7) * 3;
var skillval8 = clearcode(tag8) * 3;
var skillval9 = clearcode(tag9) * 3;
var skillval10 = clearcode(tag10) * 3;
var skillval11 = clearcode(tag11) * 3;
var skillval12 = clearcode(tag12) * 3;
var skillval13 = clearcode(tag13) * 3;
var skillval14 = clearcode(tag14) * 3;
var skillval15 = clearcode(tag15) * 3;
var skillval16 = clearcode(tag16) * 3;
var skillval17 = clearcode(tag17) * 3;
var skillval18 = clearcode(tag18) * 3;
var skillval19 = clearcode(tag19) * 3;
var skillval20 = clearcode(tag20) * 3;
var skillval21 = clearcode(tag21) * 3;

/* code to inject values into green bars
// document.getElementsByTagName("table")[10].getElementsByTagName("td")[0].innerHTML = '' + playerselected + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[4].innerHTML = '' + skillval1 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[9].innerHTML = '' +skillval2 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[14].innerHTML = '' +skillval3 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[19].innerHTML = '' +skillval4 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[25].innerHTML = '' +skillval5 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[30].innerHTML = '' +skillval6 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[35].innerHTML = '' +skillval7 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[40].innerHTML = '' +skillval8 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[45].innerHTML = '' +skillval9 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[50].innerHTML = '' +skillval10 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[55].innerHTML = '' +skillval11 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[60].innerHTML = '' +skillval12 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[65].innerHTML = '' +skillval13 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[70].innerHTML = '' +skillval14 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[75].innerHTML = '' +skillval15 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[80].innerHTML = '' +skillval16 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[85].innerHTML = '' +skillval17 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[90].innerHTML = '' +skillval18 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[95].innerHTML = '' +skillval19 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[101].innerHTML = '' +skillval20 + '</b>';
document.getElementsByTagName("table")[10].getElementsByTagName("td")[106].innerHTML = '' +skillval21 + '</b>';
*/
 
	if (skill1.search(/image/g) >0 ) {skill1 ="Error"; skillval1="N/A";}else{skill1 = skill1;}
	if (skill2.search(/image/g) >0 ) {skill2 ="Error"; skillval2="N/A";}else{skill2 = skill2;}
	if (skill3.search(/image/g) >0 ) {skill3 ="Error"; skillval3="N/A";}else{skill3 = skill3;}
	if (skill4.search(/image/g) >0 ) {skill4 ="Error"; skillval4="N/A";}else{skill4 = skill4;}
	if (skill5.search(/image/g) >0 ) {skill5 ="Error"; skillval5="N/A";}else{skill5 = skill5;}
	if (skill6.search(/image/g) >0 ) {skill6 ="Error"; skillval6="N/A";}else{skill6 = skill6;}
	if (skill7.search(/image/g) >0 ) {skill7 ="Error"; skillval7="N/A";}else{skill7 = skill7;}
	if (skill8.search(/image/g) >0 ) {skill8 ="Error"; skillval8="N/A";}else{skill8 = skill8;}
	if (skill9.search(/image/g) >0 ) {skill9 ="Error"; skillval9="N/A";}else{skill9 = skill9;}
	if (skill10.search(/image/g) >0 ) {skill10 ="Error"; skillval10="N/A";}else{skill10 = skill10;}
	if (skill11.search(/image/g) >0 ) {skill11 ="Error"; skillval11="N/A";}else{skill11 = skill11;}
	if (skill12.search(/image/g) >0 ) {skill12 ="Error"; skillval12="N/A";}else{skill12 = skill12;}
	if (skill13.search(/image/g) >0 ) {skill13 ="Error"; skillval13="N/A";}else{skill13 = skill13;}
	if (skill14.search(/image/g) >0 ) {skill14 ="Error"; skillval14="N/A";}else{skill14 = skill14;}
	if (skill15.search(/image/g) >0 ) {skill15 ="Error"; skillval15="N/A";}else{skill15 = skill15;}
	if (skill16.search(/image/g) >0 ) {skill16 ="Error"; skillval16="N/A";}else{skill16 = skill16;}
	if (skill17.search(/image/g) >0 ) {skill17 ="Error"; skillval17="N/A";}else{skill17 = skill17;}
	if (skill18.search(/image/g) >0 ) {skill18 ="Error"; skillval18="N/A";}else{skill18 = skill18;}
	if (skill19.search(/image/g) >0 ) {skill19 ="Error"; skillval19="N/A";}else{skill19 = skill19;}
	if (skill20.search(/image/g) >0 ) {skill20 ="Error"; skillval20="N/A";}else{skill20 = skill20;}
	if (skill21.search(/image/g) >0 ) {skill21 ="Error"; skillval21="N/A";}else{skill21 = skill21;}


var logo = document.createElement("div");
var navbar = document.getElementById('Table_01');
var curdate = getDate();

logo.innerHTML = 
'<div id="wrapper"><p id="analyse"><p class="dugtooltitle">'+ curdate + '</p><p class="dugtooltitle">' + playerselected + '</p><table border="1" cellspacing="0" cellpadding="0">'
+    '<tr><td>GK Rating </td><td> ' + skillval1 + '</td></tr>'
+    '<tr><td>Def Rating </td><td> ' + skillval2 + '</td></tr>'
+    '<tr><td>Mid Rating </td><td> ' + skillval3 + '</td></tr>'
+    '<tr><td>Fwd Rating </td><td> ' + skillval4 + '</td></tr>'
+    '<tr><td>' + skill5 + ' </td><td> ' + skillval5 + '</td></tr>'
+    '<tr><td>' + skill6 + ' </td><td> ' + skillval6 + '</td></tr>'
+    '<tr><td>' + skill7 + ' </td><td> ' + skillval7 + '</td></tr>'
+    '<tr><td>' + skill8 + ' </td><td> ' + skillval8 + '</td></tr>'
+    '<tr><td>' + skill9 + ' </td><td> ' + skillval9 + '</td></tr>'
+    '<tr><td>' + skill10 + ' </td><td> ' + skillval10 + '</td></tr>'
+    '<tr><td>' + skill11 + ' </td><td> ' + skillval11 + '</td></tr>'
+    '<tr><td>' + skill12 + ' </td><td> ' + skillval12 + '</td></tr>'
+    '<tr><td>' + skill13 + ' </td><td> ' + skillval13 + '</td></tr>'
+    '<tr><td>' + skill14 + ' </td><td> ' + skillval14 + '</td></tr>'
+    '<tr><td>' + skill15 + ' </td><td> ' + skillval15 + '</td></tr>'
+    '<tr><td>' + skill16 + ' </td><td> ' + skillval16 + '</td></tr>'
+    '<tr><td>' + skill17 + ' </td><td> ' + skillval17 + '</td></tr>'
+    '<tr><td>' + skill18 + ' </td><td> ' + skillval18 + '</td></tr>'
+    '<tr><td>' + skill19 + ' </td><td> ' + skillval19 + '</td></tr>'
+    '<tr><td>' + skill20 + ' </td><td> ' + skillval20 + '</td></tr>'
+    '<tr><td>' + skill21 + ' </td><td> ' + skillval21 + '</td></tr>'
+    '</table></p><p class="dugtoolfooter">Dugout Training Tool by <a href="club.php?pg=clubinfo&club_id=21598">boro</a></p><p class="dugtoolfooter"><a href="community.php?pg=forum&subpage=viewtopic&t=117692">Version: 1.3.4</a></p></div>';
navbar.parentNode.insertBefore(logo, navbar);


function addGlobalStyle(css) 
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('#condition {font-weight: bold; text-align: center; border: 1px solid #53714d; margin-top: -10px; background: #ffffff;} .dugtoolfooter {background: #53714d; text-align: center; padding: 3px; color: #ffffff; font-weight: bold; font-size: 12px;}  #wrapper table tr td{font-size: 10px; font-weight:bold; width: 100px; padding: 2px; text-align: center;} .dugtooltitle {background: #53714d; text-align: center; padding: 3px; color: #ffffff; font-weight: bold; font-size: 12px;} #wrapper {position: absolute; top: 20px; right: 30px; width: 130px; padding-right: 4px; padding-left: 4px; border: 2px solid #53714d; background: #ffffff;}   #wrapper a {color:#ffffff; border-bottom: 1px solid #ffffff;}');

 function addGlobalStyle(css) 
{
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	addGlobalStyle('#link {color: #53714d;}'); 

