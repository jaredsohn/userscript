// ==UserScript==
// @name           Picture Selector 3.4
// @namespace      PictureSelector34
// @include        *
// @resource gradient0 http://i38.tinypic.com/2dmcg2b.jpg
// @resource gradient1 http://i33.tinypic.com/suws5h.jpg
// @resource gradient2 http://i35.tinypic.com/2cwo3lx.jpg
// @resource gradient3 http://i34.tinypic.com/nl6638.jpg
// @resource gradient4 http://i35.tinypic.com/1ovn7m.jpg
// @resource gradient5 http://i35.tinypic.com/rw5jzt.jpg
// @resource gradient6 http://i36.tinypic.com/n2hhle.jpg
// @resource gradient7 http://i33.tinypic.com/2z6uxj8.jpg
// @resource popupPic http://i35.tinypic.com/2hn5bv7.jpg
// @resource popupMov http://i36.tinypic.com/2nqcvw9.jpg
// @resource popupGal http://i37.tinypic.com/2hhdocw.jpg
// @resource spacer18x4 http://img63.imageshack.us/img63/5307/spacer18x4.gif
// @resource blacklist1 http://img716.imageshack.us/img716/259/blacklist1.png
// @resource unique0 http://img52.imageshack.us/img52/2990/unique0.png
// @resource unique1 http://img352.imageshack.us/img352/6997/unique1.png
// @resource warnlevel1 http://img690.imageshack.us/img690/6467/warnlevel1.png
// @resource warnlevel2 http://img641.imageshack.us/img641/6332/warnlevel2.png
// @resource warnlevel3 http://img716.imageshack.us/img716/9513/warnlevel3.png
// @resource filterlevel0 http://img519.imageshack.us/img519/7744/filterlevel0.png
// @resource filterlevel1 http://img534.imageshack.us/img534/9017/filterlevel1.png
// @resource filterlevel2 http://img169.imageshack.us/img169/3228/filterlevel2.png
// @resource procq http://img718.imageshack.us/img718/8173/processqueued.png
// @resource proce http://img718.imageshack.us/img718/4475/processengaged.png
// @resource procs http://img519.imageshack.us/img519/661/processsuccess.png
// @resource procf http://img52.imageshack.us/img52/8936/processfailed.png
// @resource autoblue http://img126.imageshack.us/img126/3331/autoblue.png
// @resource autogreen http://img341.imageshack.us/img341/848/autogreen.png
// @resource autored http://img38.imageshack.us/img38/5659/autored.png
// @resource checkgreen http://img220.imageshack.us/img220/347/checkgreen.png
// @resource checkred http://img535.imageshack.us/img535/9933/checkred.png
// @resource spacer http://img687.imageshack.us/img687/9421/spacerh.png
// @resource Logo34Medium http://img199.imageshack.us/img199/8066/pslogomedium.png

// ==/UserScript==

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// #      all original thoughts by the author"thumbs" on this link : 
// #      Thumbs only gallery browser -  http://userscripts.org/scripts/show/3413
// #      essential additions and functionality by "kfx666"
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var kChoice = new Array();
var kNumPicks = 0;
var kUnclicked = true;
var kPicksPreview = '';
var kPicksString = "";
var tagstringA = 'Landscape,Mountain,Sea,Forest,Desert,';
var tagstringB = 'Vehicle,Cars,Bikes,Boats,Planes,';
var tagstringC = 'Tag A, Tag B, Tag C,';
var tagPreset;
var tagstring = 'Category A,Category B,Category C,Category D,';
var tagnames;
var tagcount = 0;
var tagchoice = new Array();

var cTakesFill;
var cTakesText;
var cUntakesFill;
var cUntakesText;
var cTaggedFill;
var cTaggedText;
var cUntaggedFill;
var cUntaggedText;
var cBhoverFill;
var cBhoverText;
var cBhoverBorder;
var cButtonFill;
var cButtonText;
var cButtonBorder;
var cLinksNew;
var cLinksOld;
var cStatusbarFill;
var cStatusbarText;
var cFlipboxHeader;
var cFlipboxText;
var cSysMessage;
var cMainBackground;
var cMainBackground2;

var pdBackground = "rgb(30,50,70)";
var pdHltdBtn = "rgb(60,110,120)";
var flagsTaken = new Array();
var flagsWarned = new Array();
var prepPattern = 1;
var prepOffset = 0;
var prepSort = 0;
var prepSel = "";
var targetSel = "";
var mFilterLevel = 1;

var welcomeMessage = false;
var currentMode = "";
var currentThemeNum = 0;
var nextTabUrl;
var mUrls = new Array();
var mFlags = new Array();
var mWarns = new Array();
var redSel = "";
var sortedOut = new Array();
var masterCounter;


// Icons
var nextYellow = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%0"
+"0V%CE%8EW%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%00%8B%00%00%00%8B"
+"%01Fe%B3%3F%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%01%0CIDAT8%8D%"
+"CD%D4%B1.%04Q%14%C6%F1%DFE%E2%15%84%82(6%0A%5BItJ%B2(t%0A%12Y%1E%04%89%D8Fx%05%0A%D1%7B"
+"%02z%BA%0D%2F%40'J%F5Q%EC%9De%93%99%EC%C4n%E1%2673%99%7C%F9%DF%EF%7C%E7%DCI%11a%1Ckb%2C"
+"%94%FA%A0%D4%22m%90R%A5%24%22%86l%8B%11%BA%11%9E%22t%22%A42%5D%1DGs%F9%D9%C6%3A%CE%CA%9"
+"CM%0D%DA%B7R%02%9A%CD%DE_Hm%DC%20H%C7%FCt*%83%D2%02%AE%F0X%E1%EA%FE%17%EC%10%D7%19v%D2%"
+"87%E5%1CV%7B9%0C%CB%AB%9F%5B3%C2s%84%D3%22%B3%3F%B6%3F%BA8%C2%8E%5En%23%CD%D1%3C%A6%F19"
+"Ji%DB%11%5E%23%EC%15%DF%8A%AE%BDc%92%F4Pq%FA%07%B1%DB%7BM%5B%B8%C09qW%08%D2%CF%5DK%0D%2"
+"C%97%40%1A%D8'%9A%A4M%5C%A2C%DC%0E%A8j%94%B1%96'%BB%95%CB9(%D3%D5%01%CD%E4VWB%A2%98%81%"
+"E1%2B-%E1%8Bx%ABT%FC%BB%FF%D17'%D90%0F%92X%944%00%00%00%00IEND%AEB%60%82";

var nextGray = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%"
+"CE%8EW%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%00%8B%00%00%00%8B%01Fe%"
+"B3%3F%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%01%5EIDAT8%8D%AD%94%2FO"
+"%DCA%10%86%9FY.%E97%A8%E8%09%08%82%20%8A%AAF%1E%E1%8F%C0%D5%D4%1C'%EB%AB.%7B%B3%B3%0B%04B%"
+"40b%DB4M%7DuE%3FAU%8B%AA%2C%8ET6%01q%3B%18%A0%97%CB%5D%7F%97%CBM%B2%EE%9D7%CF%3B3Yqw%16Qa!"
+".%B3%1A%99%D9%B6%99m%89%88L%D3HS43%5B%05%BE%00%B7%C0%D7%94R%DF'45%12%85%10%DA%00%C3%E1%B0%"
+"0BtRJe%12Yk%14_D%5E%8D%0B%DC%FD%05%40%CE%F9%AA%94%D2%AD%B5~H)%B9%88%0CF%C9%C2%83%C9%8A%88%"
+"5C%B8%7B%7B%FC%01%F2%10%8D%18%E3%15p%00l%A7%94l%94%EC%91%E8%B9%BB%0FU%F5mSTU%FDYJ%E9%B9%FB"
+"%7B3%AB%22b%EE%EEs%AD%3F%C6%F8%C3%DD%7B%EE%BE%9FR%EA%3CE%9B%A7j%AD%CB%C0%B3%10%C2%9F%B9%8D"
+"r%CE%7B!%84S%E00%C6%F8%1D%FE%CD%E8%1AX2%B3oSzoT%F55%80%99%ED%02g%22r4%18%0C%3E%3F%0A%9E%0E"
+"%D2%CC%D6%80%97%13L%D6%807%AA%BA%91s%DEq%F7s%E0XU%3F%8D%8A%1A%2F%BB%94%B2Yk%BD%04%DE%01%17"
+"%C0%89%AA~%1C%D75%CE%A8%D6%FAKD%EE%FEg2%13%11%80%99%AD%B7Z%AD%BF%FD~%FF%F74%CDLF%B3%D4%C2%"
+"FE%A3%7BI%E5%A6k%F3%E1%CDq%00%00%00%00IEND%AEB%60%82";

var welcomeText = '<h1>Welcome to Picture Selector 3.4!</h1>' 
		+ 'This script does not download files by itself, it just helps you select them. Install <a href="https://addons.mozilla.org/de/firefox/addon/201">DownThemAll</a>, if you don' + "'" + 't already use it.<ol><li>After installing, go to Tools->DownThemAll!-Tools->DownThemAll... (the blue one)</li> <li>Enter a directory where files will be saved</li><li>Disable all filter checkboxes!</li><li>Enter *<span style="color:rgb(190,190,55);">text</span>*.*ext* into renaming mask</li><li>Enter "seq-" into fast filtering</li><li>If everything is okay, only your selected files will be highlighted in the dta-preview</li><li>Drag the dtaOneClick!-Button into your browser somewhere. From now on you will always just hit that button to download.</li></ol>'
		+'<br>Also, please make sure to set <b>dom.allow_scripts_to_close_windows</b> to  true: <ol><li>Enter <b>about:config</b> into the address bar</li><li>To make it easier, type "allow" into the filter box</li><li>Double click that entry, to set to "true"</li></ol><br>That' + "'" + 's it, Have fun! :)';

var nextColor;

var iconPic ="data:image/gif,GIF89a%0C%00%0D%00%80%00%00%B2%B9E%FF%FF%FF!%F9%04%01%00%00%01%"
+"00%2C%00%00%00%00%0C%00%0D%00%00%02%17%84%8F%17%CBm%0D%C3%8BlR%09%EE%B2%94G%0F%81NB%96%E6%09%14%00%3B";

var iconMov ="data:image/gif,GIF89a%0E%00%0D%00%80%00%00%B2%B9E%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00"
+"%00%00%00%0E%00%0D%00%00%02%23L%00v%A9%C6%F9%DAq%B36%A4%F0E%BC%EF%EEM%D1%25%3E%1E%B78%18%B4%9A%60%09%86l%ACI%AFT%00%00%3B";

var basketIcon = new Array();

function flipBox(inp,mode) {
	
	var chunks = new Array();
	var incChunks = new Array();
	var decChunks = new Array();

	function isNum(i) {
		var k =  i.charCodeAt(0);
		if ((k > 47) && (k <58)) return true;
		else { return false;}
	}	
	
	function colChunk(inp) {

	if (inp.substring(0,1) == 'c') {
		return '<label style="color : ' + cFlipboxHeader + '">' + inp.substring(1,inp.length) + '</label>';
	}
	else {
		return '<label style="color : ' + cSysMessage + '">' + inp.substring(1,inp.length) + '</label>';
	}

	}
	
	function incdLink(pos) {

	var res = '';

	for (var i = 0; i < chunks.length; i++) {
		
		if (pos == i) {
			res += incChunks[i].substring(1,incChunks[i].length);
		}
		
		else {
			res += chunks[i].substring(1,chunks[i].length);
		}
		
	}

	return res;

	}

	function decdLink(pos) {

	var res = '';

	for (var i = 0; i < chunks.length; i++) {
		
		if (pos == i) {
			res += decChunks[i].substring(1,decChunks[i].length);
		}
		
		else {
			res += chunks[i].substring(1,chunks[i].length);
		}
		
	}

	return res;

	}

	var jo = new Array();

	for (var i = 0; i < inp.length; i++) {
		
		if (isNum(inp[i])) {
			jo.push('n' + inp[i]);
		}
		else {
			jo.push('c' + inp[i]);
		}
	}
	
	var chunk = jo[0].substring(0,2);
	var lastMode = jo[0].substring(0,1);
	var newMode = jo[0].substring(0,1);
	
	for (var i = 1; i < inp.length; i++) {
	
		newMode = jo[i].substring(0,1);
		if ((newMode == 'n') && (newMode == lastMode)) {
				chunk += jo[i].substring(1,2);
				lastMode = newMode;
			}
			
		else if ((newMode == 'c') && (newMode == lastMode)) { 
				chunk += jo[i].substring(1,2);
				lastMode = newMode;
			
		}
		else if (! (newMode == lastMode)) {
				chunks.push(chunk);
				chunk = jo[i].substring(0,2);
				lastMode = newMode;
		}
		
	}
	
	var r = 0;
	for (var t = 0; t < chunks.length; t++) {
		r += chunks[t].length - 1;
	}
	
	var lastChunk = inp.substring(r,inp.length);
	if (isNum(lastChunk[0])) {
		chunks.push('n'+lastChunk);
	}
	
	else {
		chunks.push('c'+lastChunk);
	}
		
	var cStr = '';
	for (var z = 0; z < chunks.length; z++) {
		cStr += colChunk(chunks[z]);
	}

	for (var i = 0; i < chunks.length; i++) {
		if (chunks[i].substring(0,1) == 'n') {
			
			var q = parseInt(chunks[i].substring(1,chunks[i].length)) + 1;
			q = intPad(q, chunks[i].length - 1);
			incChunks.push('n' + q);
		}
		else {
			incChunks.push(chunks[i]);
		}
	}
	
	for (var i = 0; i < chunks.length; i++) {
		if (chunks[i].substring(0,1) == 'n') {
			
			var q = parseInt(chunks[i].substring(1,chunks[i].length)) -1;
			q = intPad(q, chunks[i].length - 1);
			decChunks.push('n' + q);
		}
		else {
			decChunks.push(chunks[i]);
		}
		
	}
	
	var cntNumberChunks = 0;
	var incStr = '';
	for (var i = 0; i < chunks.length; i++) {
		
		if (chunks[i].substring(0,1) == 'c') {
			incStr += '<label style="color : ' + cFlipboxText + '">' + chunks[i].substring(1,chunks[i].length) + '</label>';
		cntNumberChunks++;
		}
		
		else {
			incStr += '<a href="' + incdLink(i) + '">' + incChunks[i].substring(1,incChunks[i].length) + '</a>';
		}
		
	}

	var decStr = '';
	for (var i = 0; i < chunks.length; i++) {
		
		if (chunks[i].substring(0,1) == 'c') {
			decStr += '<label style="color : ' + cFlipboxText + '">' + chunks[i].substring(1,chunks[i].length) + '</label>';
		}
		
		else {
			decStr += '<a href="' + decdLink(i) + '">' + decChunks[i].substring(1,decChunks[i].length) + '</a>';
		}
		
	}	

if (mode == 0) { 
if (decStr == cStr) {
	return '<div style="float: left; padding: 10px; color: ' + cFlipboxHeader+'">FlipBox<br>URL is not flippable.</div>';
}
	
else return '<div style="float: left; padding: 10px;"><span style="color: ' + cFlipboxHeader+'"> FlipBox</span><br>' + decStr + '<br>' + cStr + '<br>' + incStr + '</div>';

}
else {
	cntNumberChunks--;
	return cntNumberChunks;
}
	




}

function kToggle(inp) {

	var num = inp.substring(8,inp.length);
	kChoice[num] = !kChoice[num];
	var theTbl = document.getElementById('bTbl' + num);
	var theTxt = document.getElementById('btt' + num);
	//<div id="btt' + i +'" align="center" style="color : '+cUntakesText+'"
	
	if (kChoice[num]) {
		theTbl.setAttribute('bgcolor', cTakesFill);
		theTxt.setAttribute('style', 'color :' + cTakesText);
		kNumPicks++;
	}
	else {
		theTbl.setAttribute('bgcolor', cUntakesFill);
		theTxt.setAttribute('style', 'color :' + cUntakesText);
		kNumPicks--;
	}
	
	kUpdateChoices();
	directList('Images');
}

function kToggleM(inp) {

var num = inp.substring(2,inp.length);
kChoice[num] = !kChoice[num];

if (kChoice[num]) {
	var tbl = document.getElementById('mvt' + num);
	tbl.setAttribute('bgcolor', cTakesFill);
	kNumPicks++;
}
else {
	var tbl = document.getElementById('mvt' + num);
	tbl.setAttribute('bgcolor', cUntakesFill);
	kNumPicks--;
}

kUpdateChoicesMov();
directList('Movies')
}

function kMatchGrade(inp1,inp2) {
var maxLen = 0;
if (inp1.length <= inp2.length) 
	{ maxLen = inp1.length;}
else { maxLen = inp2.length;};

var c = 0;
for(t = 0; t < maxLen; t++) 
	{
		if (inp1[t] == inp2[t]) { c++;}
		else {break};
	}
return c;
}

function stringBasket() {

var max = GM_getValue('psBasketFull');;
var cnt = GM_getValue('psItemCntr');
var part = max / 6;
var a = new Array();
var b = new Array();
var z = 0;
var imgStr = "";
for (var x = 0; x < 6; x++) {
a.push(x * part);
};

for (var r= 0; r<6; r++) {
b.push(parseInt(a[r]));
}

if (cnt == 0) {
	imgStr = '<img src="' + basketIcon[0] + '">';
}

else {
	while (cnt > b[z]) {
		z++;
	}
	imgStr = '<img src="' + basketIcon[z] + '">'
}

return '<table style="text-align: left; width: 100%;" border="0" cellpadding="2" cellspacing="2">'
  + '<tbody><tr><td width="27px">' + imgStr + '</td><td style="color : ' + cStatusbarText + ';">' + GM_getValue('psJobCnt') + ' jobs<br>' + GM_getValue('psItemCntr') + ' items'+'</td></tr></tbody></table>';
    
  }

function closeTab() {
var cnt = GM_getValue('psItemCntr');
cnt += kNumPicks;
GM_setValue('psItemCntr',cnt);
GM_setValue('psItemsDownloaded', parseInt( GM_getValue('psItemsDownloaded') + kNumPicks));

sendToHelper();

window.open('', '_self', '');
window.close();
document.getElementById('closeBtn1').innerHTML = '<center><h2>Cannot close Tab !!</h2> Please type "about:config" into the address bar, find the key "dom.allow_scripts_to_close_windows" and double click it.</center>';

}

function buildJobString(modeTgl) {
	var kExpURLs = new Array();
	var kExpGrades = new Array();
	var mediaMode;

	if (modeTgl == 'Images') {
	 	for (t = 0; t < thumbLinks.length; t++){
	 		if (kChoice[t]){ 
	 			kExpURLs.push(thumbLinks[t].href);
				}
	  	}
		mediaMode = "img";
	}
	else {
	 	for (t = 0; t < videoLinks.length; t++){
	 		if (kChoice[t]){ 
	 			kExpURLs.push(videoLinks[t].href);
				}
	  	}
		mediaMode = "mov";
	}
		
	for(t = 1; t < kExpURLs.length; t++) 
		{
			kExpGrades.push(kMatchGrade(kExpURLs[0],kExpURLs[t]));
		}

	var cp = kExpGrades[0]-1;
	var exps ="xc0xc";

	exps += kExpURLs[0].substring(0,cp) + "xc1xc";

	for(t = 0; t < kExpURLs.length; t++) 
		{
			exps += " " + kExpURLs[t].substring(cp,kExpURLs[t].length);
		}
		
	var exptags = "";
	for(t = 0; t < tagcount; t++) 
		{
			if (tagchoice[t]) exptags += tagnames[t] + ",";
		}

	exps += "xc2xc" + document.location
	+ "xc3xc" + document.title.substring(GM_getValue('psImgName').length,document.title.length)
	+ "xc4xc" + kExpURLs.length
	+ "xc5xc" + thumbLinks.length
	+ "xc6xc" + exptags
	+ "xc7xc" + mediaMode
	+ "xc8xc";

	if (exptags.length > 1) {
	var psj = GM_getValue('psTaggedJobs') + 1;
	GM_setValue('psTaggedJobs',psj);
	}
	return exps;
}

function newSession() {
var s = GM_getValue('psSession');
GM_setValue('psSession',s+1);

s = GM_getValue('psJobMax');
//GM_setValue('psJobMax',s+1);
GM_setValue('psJobMax',0);
document.getElementById("labelSession").innerHTML = 'Session: ' + GM_getValue('psSession');
document.getElementById("labelJob").innerHTML = 'Job offset: ' + GM_getValue('psJobMax');


}

function repadJob(str) {

var clean1 ='';
var clean2 ='';

	if (getField(str,2).indexOf('/') > -1) {
		
		var spl = getField(str,2).split(' ');
		
		for (var r = 1; r < spl.length;r++) {
			clean2 += ' ' + spl[r].substring(1,spl[r].length);
		}
		clean1 = getField(str,1) + '/';	
	}
	else {
	clean1 = getField(str,1);
	clean2 = getField(str,2);
	}
	
	var s = clean1;
	var new1 = s.substring(0,s.lastIndexOf('/')+1);
	cprefix = s.substring(s.lastIndexOf('/')+1,s.length);

	var f = clean2;
	var new2 = '';
	var fsplit = f.split(' ');
	
	for (var t = 1; t < fsplit.length; t++) {
		new2 += ' ' + cprefix + fsplit[t];
	}
	return getField(str,0) + 'xc0xc' 
		+ new1 + 'xc1xc' 
		+ new2 + 'xc2xc' 
		+ getField(str,3) + 'xc3xc' 
		+ getField(str,4) + 'xc4xc' 
		+ getField(str,5) + 'xc5xc' 
		+ getField(str,6) + 'xc6xc' 
		+ getField(str,7) + 'xc7xc' 
		+ getField(str,8) + 'xc8xc' ;
}

function getField(inp,n) {

if (n > 0) {
	var b = n - 1;
	var strB = 'xc' + b + 'xc';
	var strE = 'xc' + n + 'xc';
	return inp.substring(inp.indexOf(strB)+5,inp.indexOf(strE));
}
else {
	return inp.substring(0,inp.indexOf('xc0xc'));
}
}

function mediaIcon(inp) {

if (inp == 'img') {
	return '<img src="' + iconPic + '">';
}
else {
	return '<img src="' + iconMov + '">';
}

}

function buildJobInfo(inpt) {

	var y = getField(inpt,2);
	var inp = repadJob(inpt);
	var resUrl = getField(inp,1);
	var spl = getField(inp,2).split(' ');
	resUrl += spl[1].substring(0,spl[1].length);
	var med = mediaIcon(getField(inpt,8));
	
	var tagz = getField(inp,7);
	var expt = med + ' ' + getField(inp,0) + '<br>'
				+ 'Title: ' + getField(inp,4) + '<br>'
				+ 'Gallery URL: ' + getField(inp,3)  + '<br>'
				+ 'Resource URL: ' + resUrl + ' (' + y + ' )<br>';
	if (tagz.length > 1) { expt += 'Tags: ' + getField(inp,7) + '<br>';}
	expt += '<br>'
	return expt;
}

function getQueue() {
	document.getElementById("thumbs").innerHTML = "";
	br = document.createElement('br');
	document.body.appendChild(br);

	var xStart = getField(GM_getValue('pj1'),0);
	var xNum = GM_getValue('psJobCnt');
	var xEnd = GM_getValue('pj'+xNum);
	xEnd = getField(xEnd,0);
	
	iList = document.createElement('div');
	iList.setAttribute('style','color: yellow; background : rgb(65,85,100); padding : 4px 4px 4px 4px; border: 4px 4px 4px 4px ');
	var logInfo = '<h1>Log data. From "' + xStart + '" to "' + xEnd + '"</h1><br>';
	document.title = 'PictureSelector Log data. From ' + xStart + ' to ' + xEnd;

	iList.innerHTML = logInfo;
	document.body.appendChild(iList);	
	
	for(var d = 1; d < GM_getValue('psJobCnt')+1; d++) {

	iJob = document.createElement('div');
	iJob.setAttribute('style','color: yellow; background : rgb(65,85,100); padding : 4px 4px 4px 4px; border: 4px 4px 4px 4px ');
	iJob.innerHTML = d + '<br>' + buildJobInfo(GM_getValue('pj'+d));
	document.body.appendChild(iJob);
	}
	
	
	for(var d = 1; d < GM_getValue('psJobCnt')+1; d++) {
	GM_deleteValue('pj'+d);

	}

	for(var d = 0; d < GM_getValue('psJobMax')+1; d++) {
	GM_deleteValue('pj'+d);
	}
	
	
	GM_setValue('psJobCnt',0);
	GM_setValue('psItemCntr',0);

	inf = document.createElement('div');
	inf.setAttribute('style','color : ' + cSysMessage);
	
	inf.innerHTML = '<br>You can save this text now. Queue has been cleared.';
	document.body.appendChild(inf);
}

function fileName(inp) {

var a = inp.lastIndexOf('/');
var b = inp.lastIndexOf('.');

return inp.substring(a+1,b);

//var new1 = s.substring(0,s.lastIndexOf('/')+1);

}

function directList(mode) {

if (kUnclicked) {
	var tm = GM_getValue('psJobMax');
	GM_setValue('psJobMax',tm+1);
	
	tm = GM_getValue('psJobCnt');
	GM_setValue('psJobCnt',tm+1);
	kUnclicked = false;

}

	var sPad = GM_getValue('pnSessionCnt');
	var jPad = GM_getValue('pnJobCnt');
	
	if (GM_getValue('pnSessionMode') == 'S') {sPad = 1}
	if (GM_getValue('pnJobMode') == 'S') {jPad = 1}
	
	var cCtr = 0;
	var str = "";
	var jm = GM_getValue('psJobMax');
	for (var r = 0; r < kChoice.length;r++) {
		if (kChoice[r]) { 
		cCtr++;
		str += '<a href="';
		if (mode == 'Images') {str += thumbLinks[r].href;}
		else {str += videoLinks[r].href;}
		
		str	+= '">' + GM_getValue('psFilePrefix');
		if (GM_getValue('pnSessionMode') == 'N') {var dontaddsession = 0} 
		else { 	str += intPad(GM_getValue('psSession'),sPad) + '-';};
		
		str += intPad(jm,jPad);

		switch(GM_getValue('pnSetMode')){
			case 'O':
			{if (mode == 'Images') {str += '-' + fileName(thumbLinks[r].href);}
			else { str += '-' + fileName(videoLinks[r].href);}}
			break
			case 'C':
			str += '-' + intPad(r+1,2);
			break
			case 'R':
			str += '-' + intPad(cCtr,2);
			break
		}
		
		str += '</a> ';
		}
	}
	document.getElementById("pppp").innerHTML = str;

	var jobStr = buildJobString(mode);
	var psj = GM_getValue('psJobCnt');
	var psm = GM_getValue('psJobMax');

	GM_setValue('pj' + psj, GM_getValue('psFilePrefix') +intPad(GM_getValue('psSession'),3) +'-'+ intPad(psm,4) + jobStr);

}

function intPad(inp,c) {

var i =  parseInt(inp);
var a = 0;

if (i > 9) a++;
if (i > 99) a++;
if (i > 999) a++;
if (i > 9999) a++;
if (i > 99999) a++;

a = c - a;

var nulls = "";

for(var j = 0; j < a-1;j++) {
nulls += "0";

}

return nulls+inp;

}

function kTToggle(inp) {

tnum = inp.substring(2,inp.length);
tagchoice[tnum] = !tagchoice[tnum];

if (tagchoice[tnum]) {
	document.getElementById("xb"+tnum).setAttribute('style', 'color: ' + cTaggedText +'; background: ' + cTaggedFill + '; padding: 3 3 3 3');
}
else {
	document.getElementById("xb"+tnum).setAttribute('style', 'color: ' + cUntaggedText +'; background: ' + cUntaggedFill + '; padding: 3 3 3 3');
};

directList(currentMode);
}

function initFactoryDefaults() {
	
basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%80%00%00%20C%3D%FF%FF%FF!%F9%04%01%00%00%01%"
+ "00%2C%00%00%00%00%1A%00%0E%00%00%02(%04%82%A9%CBa%DEb%3BPZD%E9%95Z%EF%E5y_%12%8ELi*%A2%F8%"
+ "B1%EC%E6%A6%D8)W%60%FAb%C6%CE%F7b%01%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3D%00%FF%1B%FF%FF%FF%00%00%00!%"
+"F9%04%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%02%2C%04%84%A9%CBb%DEb%3BPZD%E9%95Z%EF%E"
+"5y_%12%8ELi*%A2%F8%B1%EC%E6%A6%D8%89%04%F6%8D%E33m%BE%98%01%0C%0AE%05%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3Dg%CB4%FF%FF%FF%00%00%00!%F9%04"
+"%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%02%2F%04%84%A9%CBb%DEb%3BPZD%E9%95Z%EF%E5y_%12%8"
+"ELi*%A2%F8%B1T%00%C7%B2%8C%9Di%0D%22%F3%1E%E3%B9%C9%22%19%86%C4%A2%A8%00%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3D%AF%C95%FF%FF%FF%00%00%00!%F9%"
+"04%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%021%04%84%A9%CBb%DEb%3BPZD%E9%95Z%EF%E5y_%12%8"
+"EL%89%04%EA%CA%B2%24h%BE%B0%D0%D6%2Bv%C6%F8l%DB%FB%3C%12)%0C%C4%A2%F1%A1(%00%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3D%D9%B3%25%FF%FF%FF%00%00%00!%F"
+"9%04%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%022%04%84%A9%CBb%DEb%3BPZD%E9%95Z%EF%E5i%C1H%9"
+"6e%12~%93%22%9A%EE%88%82*%CBP%EF%8B%D5s%2C%0B%B7%9B%D3%CD%3C%20%83%F1%88%24%16%00%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3D%D9k%26%FF%FF%FF%00%00%00!%F9%"
+"04%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%024%04%84%A9%CBb%DEb%3BPZD)%0A%BC%7B%AFh%DA%C5"
+"%8C%DA%87v%89IF%EC%96%A2%EB2%B6U%08%C7%E0%3D%DB%3D.%D0%7D0%13%1F%8FfH*%97%B5%02%00%3B");

basketIcon.push("data:image/gif,GIF89a%1A%00%0E%00%91%00%00%20C%3D%E03%1F%FF%FF%FF%00%00%00!%F9%"
+"04%01%00%00%02%00%2C%00%00%00%00%1A%00%0E%00%00%025%04%84%A9%CBb%AE%82%9C%94%AA%03%9Bf%18%A3%0"
+"ANW%E2mZ%E9%85!9%9A%1B%9A%A8%20%DB%BAK%89%60r%95s%B6%7F%FB%ECD%99%E0%AFw2(%97L%5C%01%00%3B");


	
	var sx = GM_getValue('stPgView');

	if (!sx) {
	
		GM_setValue('kWarnLevel1', 'warnphrase1,warnphrase2');
		GM_setValue('kWarnLevel2', 'warnphrase3,warnphrase4');
		GM_setValue('kWarnLevel3', 'warnphrase5,warnphrase6');

		
		GM_setValue('kTagA', tagstringA);
		GM_setValue('kTagB', tagstringB);
		GM_setValue('kTagC', tagstringC);
		GM_setValue('kTagPreset', 'N');
		GM_setValue('kTheme', 0);
		currentThemeNum = 0;
		
GM_setValue('kTheme0','Classic Blue/#99FF99/#000000/#44605C/#253342/#7F7F1A/#171E3C/#1B334C/#6793A7/#28415F/#2CA7D0/#3B7996/#233039/#7CC2DA/#1A6179/#CC9911/#884400/#000000/#436279/#00FF00/#FFFF00/#A6DFA3/#334444/');

GM_setValue('kTheme1','Coffee/#FEFF6E/#804B00/#43473F/#2B2318/#7F563A/#260819/#342E2A/#221119/#8A9269/#F2FF7F/#EDFFB2/#4C4D41/#9FB3A1/#62674A/#02C16E/#1B5046/#1D1715/#5A5030/#FDFF13/#0095A3/#41666B/#282B2F/');

GM_setValue('kTheme2','Coffee Two/#D2E7A4/#001636/#44423D/#6B7269/#556755/#002450/#313533/#171C1C/#647675/#0F3235/#909387/#394B46/#001619/#6E7D74/#1D8E79/#003F42/#1F2421/#2D4C33/#FFC533/#B7913D/#7E9C9B/#595851/');

GM_setValue('kTheme3','Compact Blue/#D2E7A4/#000D2B/#222F3A/#171D1F/#223D43/#001B33/#141F29/#31383B/#21516E/#0FC5FF/#73D5FF/#172C37/#127B95/#2A6073/#0C5360/#002635/#0D151A/#3F7B61/#FFC533/#FFEA72/#6F9297/#243340/');

GM_setValue('kTheme4','Grey and Green/#D8D8D8/#404040/#323232/#212121/#5C5C5C/#000000/#2F2F2F/#191919/#2C8F00/#43FF02/#0AFF1F/#193500/#52822C/#034800/#616161/#353535/#000000/#104D16/#33FF13/#666666/#3B3B3B/#1C1C1C/');

GM_setValue('kTheme5','Grey and Red/#D8D8D8/#404040/#323232/#212121/#5C5C5C/#000000/#2F2F2F/#191919/#8F1400/#FF4B02/#FF2F0A/#350D00/#AE0D00/#480A00/#616161/#353535/#000000/#980000/#FF2913/#666666/#3B3B3B/#1C1C1C/');

GM_setValue('kTheme6','Light Mint/#39A2FF/#240066/#ABE2F7/#3EA6D0/#7DD5FF/#00265A/#7298B1/#245C73/#77CDFF/#2067FF/#ABE6FF/#6FACB8/#005770/#437283/#0E5135/#69B0A4/#60819A/#00346A/#FF601B/#005A74/#7C9EA3/#C5EAF2/');

GM_setValue('kTheme7','Medium Mint/#8CF9FF/#002366/#597781/#95B8C6/#9BC45A/#003A96/#445660/#202E34/#8BBFDD/#155164/#C9EFFF/#507A83/#00242F/#99CADB/#29E6E4/#00677D/#2C3B3E/#3F7B61/#FFC533/#FFEA72/#B0C193/#7C8E99/');

		tagstring = tagstringA;
		tagnames = tagstring.split(",");
		tagcount = tagnames.length;		

		GM_setValue('psEngagePictures',true);
		GM_setValue('psEngageMovies',false);
		GM_setValue('psEngageGalleries',false);
		GM_setValue('psAlwaysPic',true);
		GM_setValue('psAlwaysMov',true);
		GM_setValue('psAlwaysGal',false);
		GM_setValue('psFlipbox',true);
		GM_setValue('pnSessionMode','P');
		GM_setValue('pnJobMode','P');
		GM_setValue('pnSetMode','C');
		GM_setValue('pnSessionCnt',2);
		GM_setValue('pnJobCnt',3);
		GM_setValue('stPgView', 0);
		GM_setValue('stPcView', 0);
		GM_setValue('stPcDl', 0);
		GM_setValue('psRnEntered', 0);
		GM_setValue('psItemCntr',0);
		GM_setValue('psSession',0);
		GM_setValue('psJobMax',0);
		GM_setValue('psJobCnt',0);
		GM_setValue('psFilePrefix','seq-');
		GM_setValue('psImgName','[Img] - ');
		GM_setValue('psVidName','[Vid] - ');
		GM_setValue('psGalName','[Gal] - ');
		GM_setValue('psBasketFull',450);
		GM_setValue('psLinefeed',9);
		GM_setValue('psTaggedJobs',0);
		GM_setValue('psItemsDownloaded',0);
		setTheme(0);
	}

	
}
	
function kInvertSelection(){

	for (var x = 0; x < thumbLinks.length; x++) {
		kChoice[x] = !kChoice[x];
		var theTbl = document.getElementById('bTbl' + x);
		
		if (kChoice[x]) {
			theTbl.setAttribute('bgcolor', cTakesFill);
			kNumPicks++;
		}
		else {
			theTbl.setAttribute('bgcolor', cUntakesFill);
			kNumPicks--;
		}
	}
	
    kUpdateChoices();
	directList('Images');
}

function kSelectAll(){
	
	kNumPicks = thumbLinks.length;
	
	for (var x = 0; x < thumbLinks.length; x++) {
		kChoice[x] = true;
		var theTbl = document.getElementById('bTbl' + x);
		theTbl.setAttribute('bgcolor', cTakesFill);
	}

    kUpdateChoices();
	directList('Images');
}

function kSelectNone(){

	kNumPicks = 0;
	
	for (var x = 0; x < kChoice.length; x++) {
		kChoice[x] = false;
		var theTbl = document.getElementById('bTbl' + x);
		theTbl.setAttribute('bgcolor', cUntakesFill);
	}
    kUpdateChoices();
	directList('Images');
}

function tagCheck(inp) {
applySettings();
GM_setValue('kTagPreset',inp);
setTagPreset('t'+inp+'btn');
kTagTable();

}

function setTagPreset(inp) {

if (inp == 'tAbtn') {tagstring = GM_getValue('kTagA');}
if (inp == 'tBbtn') {tagstring = GM_getValue('kTagB');}
if (inp == 'tCbtn') {tagstring = GM_getValue('kTagC');}
if (inp == 'tNbtn') {

	if (document.getElementById("tagdiv")) 
	{
		var oldTagbar = document.getElementById('tagdiv');
		    oldTagbar.parentNode.removeChild(oldTagbar);
	
		for (z = 0; z < tagcount; z++) {
			var tagElem = document.getElementById('xb' + z);   
			tagElem.parentNode.removeChild(tagElem);
		}
	}

}

tagnames = tagstring.split(",");
tagcount = tagnames.length;		

}

function kTagTable() {

	var cTag = GM_getValue('kTagPreset');
	
	if ( ! (cTag == 'N')) {
		
		var ti = tagcount;
		var tt = '<table style="text-align: left; width: 100%;" border="0"'
		+ 'cellpadding="1" cellspacing="1">'
		+ '<tbody>'
		+   '<tr>';
		for (z = 0; z < ti; z++) {
			tt += '<td><div id=' + '"tt' + z + '" name="' + z + '"></div></td>';
		 }

		tt +='</tr></tbody></table>';
		tta = document.createElement('div');
		tta.setAttribute('id','tagdiv');
		tta.innerHTML = tt;
		document.getElementById("tttt").innerHTML = "";
		document.getElementById("tttt").appendChild(tta);
		
		for (z = 0; z < ti; z++) {
			bx = document.createElement('div');
			bx.setAttribute('id', 'xb'+z);
			if (tagchoice[z]) {
				bx.setAttribute('style', 'color: ' + cTaggedText +'; background: ' + cTaggedFill + '; padding: 3 3 3 3');
			}
			else {
				bx.setAttribute('style', 'color: ' + cUntaggedText +'; background: ' + cUntaggedFill + '; padding: 3 3 3 3');
			};		
			
			bx.addEventListener('click', function(e){kTToggle(e.currentTarget.id)}, false);
			bx.innerHTML = "<center>" + tagnames[z] + "</center>";
			document.getElementById("tt"+z).appendChild(bx);
		}
	
	}
		
	
}

function applySettings() {

var x =  document.getElementById("tAid").value;
GM_setValue('kTagA',x);

x = document.getElementById("tBid").value;
GM_setValue('kTagB',x);

x = document.getElementById("tCid").value;
GM_setValue('kTagC',x);


GM_setValue('psFilePrefix',document.getElementById("psFilePrefixId").value);
GM_setValue('psImgName', document.getElementById("psImgNameId").value);
GM_setValue('psVidName', document.getElementById("psVidNameId").value);
GM_setValue('psGalName', document.getElementById("psGalNameId").value);
GM_setValue('psBasketFull', document.getElementById("psBasketFullId").value);
GM_setValue('psLinefeed', document.getElementById("psLinefeedId").value);

GM_setValue('pnSessionCnt', document.getElementById("pnSesC").value);
GM_setValue('pnJobCnt', document.getElementById("pnJobC").value);


if (document.getElementById("psAlwaysPicId").checked) {
 GM_setValue('psAlwaysPic',true);} else {GM_setValue('psAlwaysPic',false);}
if (document.getElementById("psAlwaysMovId").checked) {
 GM_setValue('psAlwaysMov',true);} else {GM_setValue('psAlwaysMov',false);}
if (document.getElementById("psAlwaysGalId").checked) {
 GM_setValue('psAlwaysGal',true);} else {GM_setValue('psAlwaysGal',false);}
if (document.getElementById("psFlipboxId").checked) {
 GM_setValue('psFlipbox',true);} else {GM_setValue('psFlipbox',false);}

 
}

function displaySettings() {

document.getElementById("psFilePrefixId").value = GM_getValue('psFilePrefix');
document.getElementById("psImgNameId").value = GM_getValue('psImgName');
document.getElementById("psVidNameId").value = GM_getValue('psVidName');
document.getElementById("psGalNameId").value = GM_getValue('psGalName');
document.getElementById("psBasketFullId").value = GM_getValue('psBasketFull');
document.getElementById("psLinefeedId").value = GM_getValue('psLinefeed');
document.getElementById("pnSesC").value = GM_getValue('pnSessionCnt');
document.getElementById("pnJobC").value = GM_getValue('pnJobCnt');

document.getElementById("tAid").value = GM_getValue('kTagA');	
document.getElementById("tBid").value = GM_getValue('kTagB');	
document.getElementById("tCid").value = GM_getValue('kTagC');	



if (GM_getValue('psAlwaysPic') == false) {document.getElementById("psAlwaysPicId").checked = false} 
else {document.getElementById("psAlwaysPicId").checked = true};

if (GM_getValue('psAlwaysMov') == false) {document.getElementById("psAlwaysMovId").checked = false} 
else {document.getElementById("psAlwaysMovId").checked = true};

if (GM_getValue('psAlwaysGal') == false) {document.getElementById("psAlwaysGalId").checked = false} 
else {document.getElementById("psAlwaysGalId").checked = true};

if (GM_getValue('psFlipbox') == false) {document.getElementById("psFlipboxId").checked = false} 
else {document.getElementById("psFlipboxId").checked = true};


var kt = GM_getValue('kTagPreset');
document.getElementById('tr'+kt).checked = true;

kt = GM_getValue('pnSessionMode');
document.getElementById('pnSes'+kt).checked = true;

kt = GM_getValue('pnJobMode');
document.getElementById('pnJob'+kt).checked = true;


kt = GM_getValue('pnSetMode');
document.getElementById('pnSet'+kt).checked = true;

document.getElementById('psThemeBox').selectedIndex = GM_getValue('kTheme');
//document.forms[0].elements[0].selectedIndex = 2;


}

function updateTick() {
document.getElementById('rrr8').innerHTML = stringBasket();
//loop
setTimeout(updateTick, 1000);
}

function cleanupUrl(inp) {

	if (inp) {
	var xpos = inp.length -1;
	var k = 0;
	var lastchar = '' + inp[xpos];

	if (xpos > 0) {k = lastchar.charCodeAt(0);};

	var normalChar = false;

	if ((k > 96) && (k <123)) {normalChar = true;};
	if ((k > 64) && (k <91)) {normalChar = true;};
	if ((k > 47) && (k <58)) {normalChar = true;};

	if (normalChar == true) {
		return inp;
	}
	else {
		return inp.substring(0,inp.length - 1);
	};
	}
	else {
	deleteRange();
	var n = document.getElementById('nextbtn');
	if (n) {
		nextColor = nextGray;
		n.innerHTML = '<img src="' + nextColor + '">';	
	}
	
	return 'Reached end of range.';
	
	};
}

function sendToHelper() {

var psj = GM_getValue('psJobCnt');
var tMsg = GM_getValue('pj' + psj);

var element = document.createElement("PSHelperDataElement");
element.setAttribute("attribute1", tMsg);
document.documentElement.appendChild(element);

var evt = document.createEvent("Events");
evt.initEvent("PSHelperEvent", true, false);
element.dispatchEvent(evt);

}

function kAutoNextPage() {

if (GM_getValue('kPages')) {
	var cnt = GM_getValue('psItemCntr');
	cnt += kNumPicks;
	GM_setValue('psItemCntr',cnt);


	var xa = GM_getValue('kPages');
	var xb = xa.split(" ");
	var xc = new Array();

	var xcnt = 0;

	for (var t=0; t < xb.length; t++) {
		if (xb[t].length > 2) {	xc[xcnt] = xb[t];	xcnt++;
		}
	}

	var posCurrent = GM_getValue('kCur');

	posCurrent++;

	GM_setValue('kCur',posCurrent);

	var xHere = 'Page ' + posCurrent + ' of ' + (xcnt-1);
	GM_setValue('kHere',xHere);

	var kb = xcnt - posCurrent - 1;
	
	if (posCurrent < (xcnt)) { 
		GM_openInTab(cleanupUrl(xc[posCurrent])); 
		setTimeout(kAutoNextPage, 250);
		}
	else { deleteRange()}
	
}

}

function kNextPage() {

if (GM_getValue('kPages')) {
	var cnt = GM_getValue('psItemCntr');
	cnt += kNumPicks;
	GM_setValue('psItemCntr',cnt);


	var xa = GM_getValue('kPages');
	var xb = xa.split(" ");
	var xc = new Array();

	var xcnt = 0;

	for (var t=0; t < xb.length; t++) {
		if (xb[t].length > 2) {	xc[xcnt] = xb[t];	xcnt++;
		}
	}

	var posCurrent = GM_getValue('kCur');

	posCurrent++;

	GM_setValue('kCur',posCurrent);

	var xHere = 'Page ' + posCurrent + ' of ' + (xcnt-1);
	GM_setValue('kHere',xHere);

	var kb = xcnt - posCurrent - 1;

	GM_setValue('psItemsDownloaded', parseInt( GM_getValue('psItemsDownloaded') + kNumPicks));
	
	if (kNumPicks > 0) sendToHelper();
	
	if (posCurrent < (xcnt)) { window.location.href = cleanupUrl(xc[posCurrent]); }
	
}

}

function kMouseOut1(inp) {

	document.getElementById(inp).setAttribute('style', 'margin: 4px 4px 2 2; padding: 3; color: ' + cButtonText + '; background : '
	+cButtonFill+'; border:2px; border-style:solid; border-color: ' + cButtonBorder +';');	
	
	if (inp == 'menuNewSession') { 
		document.getElementById('labelSession').removeAttribute('style');
		document.getElementById('labelJob').removeAttribute('style');
	}
	if (inp == 'menuClearStatistics') { 
		document.getElementById('statsContent').removeAttribute('style');
	}
	if (inp == 'menuDownloadQueue') { 
		document.getElementById('rrr8').removeAttribute('style');
	}
	
	if (inp == 'menuRestoreDefaults') { 
		document.getElementById('kMainMenu').removeAttribute('style');
	}	
		
}

function kMouseOver2(inp) {

	if (inp == 'tlfLabel') { 
		document.getElementById('bottomSpaceDiv').setAttribute('style', 'background: rgb(80,80,30)');
	}	
}

function kMouseOut2(inp) {

	if (inp == 'tlfLabel') { 
		document.getElementById('bottomSpaceDiv').removeAttribute('style');
	}	
}

function kMouseOver1(inp) {
	
	document.getElementById(inp).setAttribute('style', 'margin: 4px 4px 2 2; padding: 3; color: ' + cBhoverText + '; background : '
	+cBhoverFill+'; border:2px; border-style:solid; border-color: ' + cBhoverBorder +';');
	
	if (inp == 'menuNewSession') { 
		document.getElementById('labelSession').setAttribute('style', 'color : yellow');
		document.getElementById('labelJob').setAttribute('style', 'color : yellow');
	}

	if (inp == 'menuClearStatistics') { 
		document.getElementById('statsContent').setAttribute('style', 'background-color : #995555');
	}
	
	if (inp == 'menuDownloadQueue') { 
		document.getElementById('rrr8').setAttribute('style', 'background-color : rgb(80,80,30)');
	}

	if (inp == 'menuRestoreDefaults') { 
		document.getElementById('kMainMenu').setAttribute('style', 'background: #995555');
	}	

}

function toggleConfMenu() {

	if (document.getElementById("kMenuFloatStlye")) {
		var v = document.getElementById("kMenuFloatStlye").style.visibility;
		if (v) {
		
			if (v == 'visible') {
				document.getElementById("kMenuFloatStlye").style.visibility = 'hidden';
			}
			else {
				document.getElementById("kMenuFloatStlye").style.visibility = 'visible';
			}
		}

	}
	else {
		buildMenu();
	}
	

}

function kUpdateChoices(){
	document.getElementById("rrr1").innerHTML = '<div style="color: ' + cStatusbarText + ';">Get '+ kNumPicks + ' of ' + thumbLinks.length+'</div>';
}

function kUpdateChoicesMov(){
	document.getElementById("rrr1").innerHTML = '<div style="color: ' + cStatusbarText+';">Get '+ kNumPicks + ' of ' + videoLinks.length+'</div>';
}

function kSkipNext() {
	var k = GM_getValue('kCur') + 1;
	GM_setValue('kCur',k);
	kNextPage();
}

function cPopupClick(mode) {
	GM_setValue(mode,true);
	window.location.reload();
}

function cPopup(mode) {
	addGlobalStyle('#psPopupFloatStyle {position: fixed; left: 0; right: 0; bottom: auto; top: 0;' +
		'  border-top: 1px solid silver; background: black; color: white;  margin: 1em 0 0 0;' +
		'  padding: 4 4 4 4; width: 45px; z-index:99;');

	cPop = document.createElement('div');
	cPop.id = 'psPopupFloatStyle';
	
	var cIcon = "";
	
	switch(mode){
		case 'psEngagePictures':
		cIcon = '<img src="' + GM_getResourceURL("popupPic") +'">';
		break
		case 'psEngageMovies':
		cIcon = '<img src="' + GM_getResourceURL("popupMov") +'">';
		break
		case 'psEngageGalleries':
		cIcon = '<img src="' + GM_getResourceURL("popupGal") +'">';
		break
	}
	
	cPop.innerHTML = cIcon;
	cPop.addEventListener('click', function(){cPopupClick(mode)}, false);
	document.body.appendChild(cPop);

}

function resetToDefaults() {
clearStatistics();

document.getElementById("tAid").value = tagstringA;
document.getElementById("tBid").value = tagstringB;
document.getElementById("tCid").value = tagstringC;

	if (document.getElementById("tagdiv")) 
	{
		var oldTagbar = document.getElementById('tagdiv');
		    oldTagbar.parentNode.removeChild(oldTagbar);
	
		for (z = 0; z < tagcount; z++) {
			var tagElem = document.getElementById('xb' + z);   
			tagElem.parentNode.removeChild(tagElem);
		}
	}


GM_deleteValue('stPgView');
initFactoryDefaults();
displaySettings();
directList(currentMode);
	
GM_setValue('kTagA', tagstringA);
GM_setValue('kTagB', tagstringB);
GM_setValue('kTagC', tagstringC);

document.getElementById("trN").setAttribute('checked', 'checked');

deleteRange();

}

function clearStatistics() {

	GM_setValue('stPgView',0);
	GM_setValue('stPcView',0);
	GM_setValue('psItemsDownloaded',0);
	GM_setValue('psRnEntered',0) ;
	GM_setValue('psTaggedJobs',0);

	document.getElementById("statsContent").innerHTML = '<table style="text-align: left;" border="0" cellpadding="3" cellspacing="2"><tbody><tr>'
	+'<td>Pages viewed:</td><td>' + GM_getValue('stPgView') + '</td></tr><tr>'
	+'<td>Items viewed:</td><td>' + GM_getValue('stPcView') + '</td></tr><tr>'
	+'<td>Items downloaded:</td><td>' + GM_getValue('psItemsDownloaded') +'</td></tr><tr>'
	+'<td>Items tagged:</td><td>' + GM_getValue('psTaggedJobs') + '</td></tr></tbody>'
	+'<td>Ranges started:</td><td>' + GM_getValue('psRnEntered') +'</td></tr><tr>'
	+'</table>';
	
}

function applyTheme() {
	
	//GM_addStyle('body { min-height: 100%; margin: 0 5px; background: '+cMainBackground+'; }');
	currentThemeNum = GM_getValue('kTheme');
	
	if (currentThemeNum) {
	GM_addStyle('body { min-height: 100%; margin: 0 5px; background: '+cMainBackground
			+'; background-image: url(' + GM_getResourceURL("gradient" + currentThemeNum )+') }');	

		}
		
	else {
	GM_addStyle('body { min-height: 100%; margin: 0 5px; background: '+cMainBackground
		+'; background-image: url(' + GM_getResourceURL("gradient0")+') }');			
	
	}

			
	GM_addStyle('body.inCol { background: '+cMainBackground2+'; }');
	GM_addStyle('a { color: '+cLinksNew+'; }');
	GM_addStyle('a:visited { color: '+cLinksOld+'; }');
	GM_addStyle('p { margin: 4px 4px 2 2; padding: 3; color: ' + cButtonText + '; background : '
	+cButtonFill+'; border:2px; border-style:solid; border-color: ' + cButtonBorder +';}');
	
	addGlobalStyle('#statusLowerFloat {position: fixed; left: 0; right: 0; bottom: 0; top: auto;' +
	'  border-top: 1px solid silver; background: ' + cStatusbarFill + '; color: white;  margin: 1em 0 0 0;' +
	'  padding: 0 0 0 0; width: 100%;');

	for (var x = 0; x < thumbLinks.length; x++) {

		var theTbl = document.getElementById('bTbl' + x);
		var theTxt = document.getElementById('btt' + x);
		
		if (kChoice[x]) {
			theTbl.setAttribute('bgcolor', cTakesFill);
			theTxt.setAttribute('style', 'color :' + cTakesText);
		}
		else {
			theTbl.setAttribute('bgcolor', cUntakesFill);
			theTxt.setAttribute('style', 'color :' + cUntakesText);
		}
	}
	
	document.getElementById('flipDivId').innerHTML = flipBox(document.location.href,0);
	document.getElementById('d1Feedback').setAttribute('style','color : ' + cSysMessage);
	document.getElementById('kbtn').setAttribute('style', 'color: ' + cStatusbarText);
	document.getElementById('d3Feedback').setAttribute('style','color : ' + cFlipboxText);
	
	kUpdateChoices()
	
	directList('Images');

}

function setFirstLoadScheme() {

	var th ='Classic Blue/#99FF99/#000000/#44605C/#253342/#7F7F1A/#171E3C/#1B334C/#6793A7/#28415F/#2CA7D0/#3B7996/#233039/#7CC2DA/#1A6179/#CC9911/#884400/#000000/#436279/#00FF00/#FFFF00/#A6DFA3/#334444/';
	var clrs = th.split("/");

	cTakesFill = clrs[1];
	cTakesText = clrs[2];
	cUntakesFill = clrs[3];
	cUntakesText = clrs[4];
	cTaggedFill = clrs[5];
	cTaggedText = clrs[6];
	cUntaggedFill = clrs[7];
	cUntaggedText = clrs[8];
	cBhoverFill = clrs[9];
	cBhoverText = clrs[10];
	cBhoverBorder = clrs[11];
	cButtonFill = clrs[12];
	cButtonText = clrs[13];
	cButtonBorder = clrs[14];
	cLinksNew = clrs[15];
	cLinksOld = clrs[16];
	cStatusbarFill = clrs[17];
	cStatusbarText = clrs[18];
	cSysMessage = clrs[19];
	cFlipboxHeader = clrs[20];
	cFlipboxText = clrs[21];
	cMainBackground = clrs[22];
	cMainBackground2 = clrs[22];

	GM_addStyle('p { margin: 4px 4px 2 2; padding: 3; color: ' + cButtonText + '; background : '
	+cButtonFill+'; border:2px; border-style:solid; border-color: ' + cButtonBorder +';}');
	GM_addStyle('a { color: '+cLinksNew+'; }');
	GM_addStyle('a:visited { color: '+cLinksOld+'; }');	
	
}

function setTheme(inp) {
if (inp) {

	GM_setValue('kTheme',inp);
	var cols = GM_getValue('kTheme'+ inp).split("/");

	cTakesFill = cols[1];
	cTakesText = cols[2];
	cUntakesFill = cols[3];
	cUntakesText = cols[4];
	cTaggedFill = cols[5];
	cTaggedText = cols[6];
	cUntaggedFill = cols[7];
	cUntaggedText = cols[8];
	cBhoverFill = cols[9];
	cBhoverText = cols[10];
	cBhoverBorder = cols[11];
	cButtonFill = cols[12];
	cButtonText = cols[13];
	cButtonBorder = cols[14];
	cLinksNew = cols[15];
	cLinksOld = cols[16];
	cStatusbarFill = cols[17];
	cStatusbarText = cols[18];
	cSysMessage = cols[19];
	cFlipboxHeader = cols[20];
	cFlipboxText = cols[21];
	cMainBackground = cols[22];
	cMainBackground2 = cols[22];

}

}

function displayNaming() {

directList(currentMode);

}

function setSessionNaming(inp) {
	GM_setValue('pnSessionMode',inp);
	displayNaming();
}

function setJobNaming(inp) {
	GM_setValue('pnJobMode',inp);
	displayNaming();
}

function setSetNaming(inp) {
	GM_setValue('pnSetMode',inp);
	displayNaming();
}
	
function buildMenu() {
	addGlobalStyle('#kMenuFloatStlye {position: fixed; left: 40px; bottom: auto;top: 0;' +
	'  border-top: 1px solid silver; background: gray; margin: 1em 1 0 0;' +
	'  padding: 5px 5px 5px 5px; width: 875px');
	
	addGlobalStyle('#propStyle { margin: 5px 5px 5px 5px ; padding: 1px 1px 1px 1px; float: left');
	
	
	
	
	kMenu = document.createElement('kMenuBar');
	kMenu.innerHTML = '<img src="' + GM_getResourceURL("Logo34Medium") +'">'
	+'<table bgcolor="#757575" "style="text-align: left; width: 100%; height: 350px;" border="0" cellpadding="6" cellspacing="6">'
	+'<tbody> <tr><td>'
	
	+'<fieldset><legend>Commands</legend>'

	+'<div id="propStyle"><p id="menuNewSession" title="Increase the session number and set job offset to zero.">&nbsp New session &nbsp</p></div>'
	+'<div id="propStyle"><p id="menuDownloadQueue" title="Show and clear log info on downloaded items.">&nbsp Show Log &nbsp</p></div>'
	+'<div id="propStyle"><p id="showIntro" title="Show introductory welcome text again. Check this out for DTA setup.">&nbsp Introduction &nbsp</p></div>'
	+'<div id="propStyle"><p id="goHomepage" title="Visit PictureSelector on userscripts.org (in new tab).">&nbsp "Homepage" &nbsp</p></div>'
	+'<div id="propStyle"><p id="menuClearStatistics" title="Clear values marked red.">&nbsp Clear statistics &nbsp</p></div>'
	+'<div id="propStyle"><p id="menuRestoreDefaults" title="Reset to factory defaults.">&nbsp Restore defaults &nbsp</p></div>'
	+'<div id="propStyle"><p id="menuAddon" title="Visit Add-on page.">&nbsp Add-on &nbsp</p></div>'
	
	+'</fieldset>'	
	+'<br><div id="kMainMenu">'
	+'<table style="text-align: left; " border="0" cellpadding="0" cellspacing="0"><tbody><tr>'
	
	+'<td>'	

	+'<fieldset title="Engage means that PictureSelector will always automatically process (clean up) pages containing items. Otherwise it just supplies a small popup, to enter clean-up manually. If you dont even need this, disable PictureSelector in the monkey menue."><legend>Operation modes</legend>'	
	+'<table style="text-align: left;" border="0" cellpadding="3" cellspacing="2"><tbody>'
	+'<tr>'
	+'<td><b>Engage</b></td>'
	+'<td><b>Tab name</b></td>'
	+'</tr>'
	+'<tr>'
	+'<td><label><input id="psAlwaysPicId" type="checkbox">Pictures</label></td>'
	+'<td><input id="psImgNameId" value="[IMG] - " type="text" size="7"></td>'
	+'</tr>'
	+'<tr>'
	+'<td><label><input id="psAlwaysMovId" type="checkbox">Movies</label></td>'
	+'<td><input id="psVidNameId" value="[VID] - " type="text" size="7"></td>'
	+'</tr>'
	+'<tr>'
	+'<td><label><input id="psAlwaysGalId" type="checkbox">Galleries&nbsp</label></td>'
	+'<td><input id="psGalNameId" value="[GAL] - " type="text" size="7"></td>'
	+'</tr>'
	+'</tbody></table>'	
	+'</fieldset>'	
	+'</td>'
	+'<td>&nbsp&nbsp&nbsp</td>'
	
	+'<td>'

	+'<fieldset><legend>File renaming</legend>'
	+'<table style="text-align: left;" border="1" cellpadding="4" cellspacing="0"><tbody><tr style="text-align: center;"> <td><b>[Prefix]</b>'
	+'</td><td><b>[Session counter]</b></td><td><b>[Job counter]</b></td><td><b>[Set number]</b></td></tr><tr><td title="First chunk of the resulting file name. All downloaded files will begin with this. This field may not be empty. Also note: set DTA fast filtering to this same value.">'
	+'<input id="psFilePrefixId" value="seq-" size="7" type="text">'
	+'</td><td><form title="Second chunk of file names. Increase this from time to time by hitting [New session]. Setting to [None] is not recommended. You would have to change [Prefix] manually and often, also in DTA-[Fast filtering].">'
	+'<input name="psNamingGr1" id="pnSesP" value="P" type="radio"> Padded <input id="pnSesC" value="2" size="1" type="text" /><br/>'
	+'<input name="psNamingGr1" id="pnSesS" value="S" type="radio"> Short<br>'
	+'<input name="psNamingGr1" id="pnSesN" value="N" type="radio"> None'
	+'</form></td><td><form title="Each unique page where you click items on, will increase the job (page) counter. This value is maintained even after [Show log]. Hit [New session] to reset to zero.">'
	+'<input name="psNamingGr2" id="pnJobP" value="iJobPad"type="radio"> Padded <input id="pnJobC" value="4" size="1" type="text"><br>'
	+'<input name="psNamingGr2" id="pnJobS" value="iJobShort" type="radio"> Short'
	+'</form></td><td><form title="Last part of file names. [Original] does not generate any counter, it just takes the original file name from the server. [Corresponding] inserts a counter which corresponds to positions in the original scheme. If you picked the first, the second, and the last file of a series [pic01.jpg to pic20.jpg] this will insert 01, 02 and 20. [Linear] will insert 01,02,03.">'
	+'<input name="psNamingGr3" id="pnSetO" value="O" type="radio">Original<br>'
	+'<input name="psNamingGr3" id="pnSetC" value="C" type="radio">Corresponding<br>'
	+'<input name="psNamingGr3" id="pnSetR" value="R" type="radio">Linear'
	+'</form></td></tr></tbody></table>'
	+'</fieldset>'	
	+'</td>'
	+'<td>&nbsp&nbsp&nbsp</td>'
	+'<td>'
	+'<fieldset><legend>Statistics</legend>'
	+'<div id="statsContent"><table style="text-align: left;" border="0" cellpadding="3" cellspacing="2"><tbody>'
	
	+'<tr title="Total of pages viewed and processed.">'
	+'<td>Pages viewed:</td><td>' + GM_getValue('stPgView') + '</td></tr>'
	
	+'<tr title="Total of images/videos viewed.">'
	+'<td>Items viewed:</td><td>' + GM_getValue('stPcView') + '</td></tr>'
	
	+'<tr title="Estimated total of items downloaded. Acutal amount will always be lower, since you sometimes just click items, and decide not to download. They get logged in nevertheless.">'
	+'<td>Items downloaded:</td><td>' + GM_getValue('psItemsDownloaded') +'</td></tr>'
	
	+'<tr title="Total of items where you have set a tag.">'
	+'<td>Items tagged:</td><td>' + GM_getValue('psTaggedJobs') + '</td></tr>'
	
	+'<tr title="Total of started ranges. Usage: Mark a bunch of links to pages and select MonkeyMenu->User Script Commands -> Start range. Reload and repeat if it doesnt work the first time. Hit G to return to your starting point after reaching the end.">'
	+'<td>Ranges started:</td><td>' + GM_getValue('psRnEntered') +'</td></tr>'
	+'</tbody></table></div></fieldset>'
	+'</td>'
	+'</tr></tbody></table><br>'
	
	+'<table style="text-align: left;" border="0" cellpadding="2" cellspacing="2"><tbody><tr>'
	+'<td>'
	+'<fieldset><legend>Download Queue</legend>'
	+'<table style="text-align: left;" border="0" cellpadding="3" cellspacing="3"><tbody><tr>'
	+'<td style="text-align: left;"><div id="labelSession" title="Current session counter.">Session: ' + GM_getValue('psSession') + '</div></td>'
	+'<td style="text-align: left;"><div id="labelJob" title="Current job offset.">Job offset: ' + GM_getValue('psJobMax') + '</div></td>'
	+'</tr>'
	+'</tbody></table>'
	+'</fieldset>'	
	+'</td>'
	+'<td>'
	+'<fieldset><legend>Miscellaneous</legend>'	
	+'<div id="propStyle"><label id="tlfLabel" title="Append some space to the end of pages. Useful on very full pages.">Space at bottom <input id="psLinefeedId" value="8" type="text" size="2"></label></div>'
	+'<div id="propStyle"><label title="Set when the basket (log queue) will be full. Its just an indicator.">Basket full/red: <input id="psBasketFullId" value="450" type="text" size="3"></label></div>'
	+'<div id="propStyle"><label title="Show/hide the FlipBox. It tries supply paths to related pages."><input id="psFlipboxId" type="checkbox">Flipbox</label></div>'
	+'<div id="propStyle">'
	
	+'<form title="Color themes!"><select id="psThemeBox" name="Pizza" size="1">'
	+'<option value="0">1: Classic Blue</option>'
	+'<option value="1">2: Coffee I</option>'
	+'<option value="2">3: Coffee II</option>'
	+'<option value="3">4: Compact Blue</option>'
	+'<option value="4">5: Grey and Green</option>'
	+'<option value="5">6: Grey and Red</option>'
	+'<option value="6">7: Light Mint</option>'
	+'<option value="7">8: Medium Mint</option>'
	+'</select>'
	+'</form></div>'
	+'</fieldset>'	
	+'</td>'
	+'</tr></tbody></table>'	
	
	+'<fieldset><legend>Tag presets</legend>'
	+'<div id="propStyle"><input id="trN" name="psTagGr1" value="tN" type="radio"/>Hide</div>'		
	+'<div id="propStyle"><input id="trA" name="psTagGr1" value="tA" type="radio"/><input id="tAid" value="'
	+ GM_getValue('kTagA') + '" size="30" type="text"></div>'
	+'<div id="propStyle"><input id="trB" name="psTagGr1" value="tB" type="radio"/><input id="tBid" value="'
	+ GM_getValue('kTagB') + '" size="30" type="text"></div>'
	+'<div id="propStyle"><input id="trC" name="psTagGr1" value="tC" type="radio"/><input id="tCid" value="'
	+ GM_getValue('kTagC') + '" size="30" type="text"></div>'

	+'</fieldset>'
	+'<br></div>'

	+'<table style="text-align: left; width: 100%;" border="0" cellpadding="3" cellspacing="3"><tbody>'
	+'<tr><td><center><p id="menuApply">Save</p></center></td>'
	+'<td><center><p id="menuClose">Close</p></center></td></tr>'
	+'</tbody></table>'
	+'</td></tr> </tbody> </table>';
	
	kMenu.id = 'kMenuFloatStlye';
	kMenu.setAttribute('style', 'visibility : visible;');
		
	var theDiv = document.getElementById('thumbs');
	theDiv.appendChild(kMenu);
	
	displaySettings();
	
	document.getElementById("menuNewSession").addEventListener('mouseover', function(){kMouseOver1('menuNewSession')}, false);
	document.getElementById("menuNewSession").addEventListener('mouseout', function(){kMouseOut1('menuNewSession')}, false);	
	document.getElementById("menuNewSession").addEventListener('click', function(){newSession()}, false);

	document.getElementById("menuDownloadQueue").addEventListener('mouseover', function(){kMouseOver1('menuDownloadQueue')}, false);
	document.getElementById("menuDownloadQueue").addEventListener('mouseout', function(){kMouseOut1('menuDownloadQueue')}, false);	
	document.getElementById("menuDownloadQueue").addEventListener('click', function(){getQueue()}, false);

	document.getElementById("menuClose").addEventListener('mouseover', function(){kMouseOver1('menuClose')}, false);
	document.getElementById("menuClose").addEventListener('mouseout', function(){kMouseOut1('menuClose')}, false);	
	document.getElementById("menuClose").addEventListener('click', function(){toggleConfMenu()}, false);

	document.getElementById("menuApply").addEventListener('mouseover', function(){kMouseOver1('menuApply')}, false);
	document.getElementById("menuApply").addEventListener('mouseout', function(){kMouseOut1('menuApply')}, false);	
	document.getElementById("menuApply").addEventListener('click', function(){applySettings()}, false);

	document.getElementById("menuClearStatistics").addEventListener('mouseover', function(){kMouseOver1('menuClearStatistics')}, false);
	document.getElementById("menuClearStatistics").addEventListener('mouseout', function(){kMouseOut1('menuClearStatistics')}, false);	
	document.getElementById("menuClearStatistics").addEventListener('click', function(){clearStatistics()}, false);

	document.getElementById("menuRestoreDefaults").addEventListener('mouseover', function(){kMouseOver1('menuRestoreDefaults')}, false);
	document.getElementById("menuRestoreDefaults").addEventListener('mouseout', function(){kMouseOut1('menuRestoreDefaults')}, false);	
	document.getElementById("menuRestoreDefaults").addEventListener('click', function(){resetToDefaults()}, false);

	document.getElementById("menuAddon").addEventListener('mouseover', function(){kMouseOver1('menuAddon')}, false);
	document.getElementById("menuAddon").addEventListener('mouseout', function(){kMouseOut1('menuAddon')}, false);	
	document.getElementById("menuAddon").addEventListener('click', function(){	
		GM_openInTab("http://kfx.homepage.t-online.de/psh/index.html"); 	
	}, false);

	document.getElementById("tlfLabel").addEventListener('mouseover', function(){kMouseOver2('tlfLabel')}, false);
	document.getElementById("tlfLabel").addEventListener('mouseout', function(){kMouseOut2('tlfLabel')}, false);	

	
	document.getElementById("showIntro").addEventListener('mouseover', function(){kMouseOver1('showIntro')}, false);
	document.getElementById("showIntro").addEventListener('mouseout', function(){kMouseOut1('showIntro')}, false);	
	document.getElementById("showIntro").addEventListener('click', function(){
		
		if (!document.getElementById("introMsgDiv")) {
			wMsg = document.createElement('div');
			wMsg.setAttribute('id','introMsgDiv');
			wMsg.setAttribute('style','background: black; color : rgb(50,150,220); margin: 10 10 10 10; padding: 15 15 15 15');
			wMsg.innerHTML = welcomeText;
			document.getElementById("d1Feedback").appendChild(wMsg);
			
		}
		
	}, false);
	
	document.getElementById("goHomepage").addEventListener('mouseover', function(){kMouseOver1('goHomepage')}, false);
	document.getElementById("goHomepage").addEventListener('mouseout', function(){kMouseOut1('goHomepage')}, false);	
	document.getElementById("goHomepage").addEventListener('click', function(){	
		GM_openInTab("http://userscripts.org/scripts/show/25468"); 	
	}, false);
		
	document.getElementById('trA').addEventListener('click', function(){tagCheck('A')}, false);
	document.getElementById('trB').addEventListener('click', function(){tagCheck('B')}, false);
	document.getElementById('trC').addEventListener('click', function(){tagCheck('C')}, false);
	document.getElementById('trN').addEventListener('click', function(){tagCheck('N')}, false);
	
	document.getElementById('pnSesP').addEventListener('click', function(){setSessionNaming('P')}, false);
	document.getElementById('pnSesS').addEventListener('click', function(){setSessionNaming('S')}, false);
	document.getElementById('pnSesN').addEventListener('click', function(){setSessionNaming('N')}, false);
	
	document.getElementById('pnJobP').addEventListener('click', function(){setJobNaming('P')}, false);
	document.getElementById('pnJobS').addEventListener('click', function(){setJobNaming('S')}, false);
	
	document.getElementById('pnSetO').addEventListener('click', function(){setSetNaming('O')}, false);
	document.getElementById('pnSetC').addEventListener('click', function(){setSetNaming('C')}, false);
	document.getElementById('pnSetR').addEventListener('click', function(){setSetNaming('R')}, false);
	
	document.getElementById('psThemeBox').addEventListener('change', function(e){ setTheme(e.currentTarget.value); applyTheme()}, false);
	
}
	
function buildPage(modeToggle) {
	
	if (! cTakesFill) setFirstLoadScheme();
	
	
	var div = document.getElementById('thumbs');
	
	if (GM_getValue('psImgName')) {
		if (modeToggle == 'Images') {
			document.title = GM_getValue('psImgName') + document.title;
		}
		
		else {
			document.title = GM_getValue('psVidName') + document.title;
		}	
	}
	
	else {
		welcomeMessage = true;

	}
	

	
	addGlobalStyle('#statusLowerFloat {position: fixed; left: 0; right: 0; bottom: 0; top: auto;' +
	'  border-top: 1px solid silver; background: ' + cStatusbarFill + '; color: white;  margin: 1em 0 0 0;' +
	'  padding: 0 0 0 0; width: 100%;');
	
	addGlobalStyle('#kCloseFloatStlye {position: fixed; left: 0; right: 0; bottom: auto; top: 0;');	
	
	initFactoryDefaults();

	var s1 = parseInt(GM_getValue('stPgView'));
	s1++;
	GM_setValue('stPgView',s1);
	
	kStatusBar = document.createElement('kStatusBar');
	kStatusBar.innerHTML = '<table style="text-align: left; width: 100%; height: 25px;" border="0" cellpadding="1" cellspacing="1"> <tbody>'
	+'<tr> <td><div id="tttt"></div></td></tr>'
	+'<tr> <td><div id="pppp"></div></td></tr>'
	+'<tr> <td style="height: 18px;"> <table style="text-align: left; width: 100%; height: 19px;" border="0" cellpadding="0" cellspacing="1">'
	+'<tbody> <tr>'
	+'<td title="Stats on your current selection." style="text-align: center; width: 50px;"><div id="rrr1"></div></td>'
	+'<td style="text-align: center; width: 50px;"><div id="rrr2"></div></td>'
	+'<td style="text-align: center; width: 50px;"><div id="rrr3"></div></td>'
	+'<td style="text-align: center; width: 50px;"><div id="rrr4"></div></td>'
	+'<td style="text-align: center; width: 50px;"><div id="rrr5"></div></td>'
	+'<td style="text-align: center; width: 160px;"><div id="rrr6"></div></td>'
	+'<td style="text-align: center; width: 60px;"><div id="rrr7"></div></td>'
	+'<td title="Stats on collected / logged items." style="text-align: center; width: 60px;"><div id="rrr8">'+ stringBasket() +'</div></td>'
	+'</tr> </tbody> </table></td></tr></tbody></table>';	

	kStatusBar.id = 'statusLowerFloat';
	div.appendChild(kStatusBar);
	
	spaceBtn = document.createElement('p');
	spaceBtn.setAttribute('style', 'visibility: hidden');
	spaceBtn.innerHTML = '<center><h2>spacer</h2></center>';
	div.appendChild(spaceBtn);	

	topCloseDiv = document.createElement('div');
	topCloseDiv.setAttribute('id', 'kCloseFloatStlye');
	topCloseDiv.innerHTML ='<table style="text-align: left; width: 100%;" border="0" cellpadding="0" cellspacing="0">'
  +'<tbody><tr>'
  +'<td id="ttx1" style="width: 1%;"><div id="ttLeft"></div></td>'
  +'<td id="ttx2" style="width: 99%;"><div id="ttRight"></div></td>'
  +'</tr></tbody></table>'
  
	closeBtn1 = document.createElement('p');
	closeBtn1.setAttribute('id', 'closeBtn1');	
	closeBtn1.setAttribute('title', 'Close this tab and log items.');	
	closeBtn1.addEventListener('mouseover', function(){kMouseOver1('closeBtn1')}, false);
	closeBtn1.addEventListener('mouseout', function(){kMouseOut1('closeBtn1')}, false);
	closeBtn1.addEventListener('click', function(){closeTab()}, false);
	closeBtn1.innerHTML = '<center><h2>Close</h2></center>';

	//topCloseDiv.appendChild(closeBtn1);
	div.appendChild(topCloseDiv);		
	document.getElementById("ttRight").appendChild(closeBtn1);	
	
if (modeToggle == 'Images') {

	allbtn = document.createElement('p');
 	allbtn.innerHTML ='<center>All</center>';
 	allbtn.setAttribute('id', 'allbtn');
	allbtn.setAttribute('title', 'Select all pictures on this page.');
	allbtn.addEventListener('click', function(){kSelectAll()}, false);
	allbtn.addEventListener('mouseover', function(){kMouseOver1('allbtn')}, false);
	allbtn.addEventListener('mouseout', function(){kMouseOut1('allbtn')}, false);		
	document.getElementById("rrr2").appendChild(allbtn);	
	
	nonebtn = document.createElement('p');
 	nonebtn.innerHTML ='<center>None</center>';
 	nonebtn.setAttribute('id', 'nonebtn');
	nonebtn.setAttribute('title', 'Deselect all pictures on this page.');
	nonebtn.addEventListener('click', function(){kSelectNone()}, false);
	nonebtn.addEventListener('mouseover', function(){kMouseOver1('nonebtn')}, false);
	nonebtn.addEventListener('mouseout', function(){kMouseOut1('nonebtn')}, false);		
	document.getElementById("rrr3").appendChild(nonebtn);
		
	invbtn = document.createElement('p');
 	invbtn.innerHTML ='<center>Invert</center>';
 	invbtn.setAttribute('id', 'invbtn');
	invbtn.setAttribute('title', 'Invert the current selection.');
	invbtn.addEventListener('click', function(){kInvertSelection()}, false);
	invbtn.addEventListener('mouseover', function(){kMouseOver1('invbtn')}, false);
	invbtn.addEventListener('mouseout', function(){kMouseOut1('invbtn')}, false);		
	document.getElementById("rrr4").appendChild(invbtn);

}	
	
	confbtn = document.createElement('p');
	confbtn.setAttribute('id', 'confbtn');
	confbtn.setAttribute('title', 'Open the configuration menu.');
	confbtn.addEventListener('click', function(){toggleConfMenu()}, false);
	confbtn.addEventListener('mouseover', function(){kMouseOver1('confbtn')}, false);
	confbtn.addEventListener('mouseout', function(){kMouseOut1('confbtn')}, false);
	confbtn.innerHTML = "Config";
	document.getElementById("rrr5").appendChild(confbtn);

	nextbtn = document.createElement('p');
	if (GM_getValue('kCur')) { nextColor = nextYellow;}	else {nextColor = nextGray;	}
	
	nextbtn.innerHTML = '<img src="' + nextColor + '">';
 	nextbtn.setAttribute('id', 'nextbtn');

	var xa = GM_getValue('kPages');
	if (xa) {
		var xb = xa.split(" ");
		var xc = new Array();

		var xcnt = 0;

		for (var t=0; t < xb.length; t++) {
			if (xb[t].length > 2) {	xc[xcnt] = xb[t];	xcnt++;
			}
		}		

		var nextUrl = cleanupUrl(xc[parseInt(GM_getValue('kCur')+1)]);	

		skipButton = document.createElement('p');
		skipButton.setAttribute('id','skipButton');
		skipButton.innerHTML = "<center><h2>Skip</h2></center>";
		
		//d3Feedback.innerHTML = '<center>Next: ' + nextUrl+' <span title="Skip this one if you realize its bogus." id="skipButton">(skip)</span></center>';
		
		document.getElementById("ttx1").setAttribute('style', 'width: 20%;');
		document.getElementById("ttx2").setAttribute('style', 'width: 80%;');
		
		document.getElementById("ttLeft").appendChild(skipButton);			
		//div.appendChild(d3Feedback);		
		document.getElementById("skipButton").addEventListener('click', function(){kSkipNext()}, false);
		document.getElementById("skipButton").addEventListener('mouseover', function(){kMouseOver1('skipButton')}, false);
		document.getElementById("skipButton").addEventListener('mouseout', function(){kMouseOut1('skipButton')}, false);
	
	}
	else {
		nextUrl = "no range";
		deleteRange();
	}
	
	nextbtn.setAttribute('title', 'Next: ' + nextUrl);
	nextbtn.addEventListener('click', function(){kNextPage()}, false);
	nextbtn.addEventListener('mouseover', function(){kMouseOver1('nextbtn')}, false);
	nextbtn.addEventListener('mouseout', function(){kMouseOut1('nextbtn')}, false);	
  	document.getElementById("rrr6").appendChild(nextbtn);
	
 	kbtn = document.createElement('div');
	var xCurrent = GM_getValue('kHere');
	var bl = GM_getValue('kSource');
	var kback = '<a href="'+ bl +'">G</a>';
	if (xCurrent) kbtn.innerHTML = kback + ' - ' + xCurrent;
 	kbtn.setAttribute('id', 'kbtn');
	kbtn.setAttribute('title', 'Progress on your current range.');
	kbtn.setAttribute('style', 'color: ' + cStatusbarText);
	document.getElementById("rrr7").appendChild(kbtn);	

	document.body.style.paddingBottom = "4em";
	window.addEventListener( "load", function() { document.body.appendChild(div); }, true);

	upperFeedback = document.createElement('div');
	upperFeedback.setAttribute('id','uFeedback');
	upperFeedback.setAttribute('style','color : yellow');
	div.appendChild(upperFeedback);
	
	// now the pictures are added .... each "b" is a picture-button	
	
	if (modeToggle == 'Images') {
	
	for (i = 0; i < thumbLinks.length; i++) {
		imgStr = '<img src="'+thumbLinks[i].getElementsByTagName('img')[0].src+'">';
		b = document.createElement('button');
		b.innerHTML='<table id="bTbl' + i + '" bgcolor="'+cUntakesFill+'" width="69" border="0"><tr><td width="5" height="21">&nbsp;</td><td width="45" height="21"></td><td width="5" height="21">&nbsp;</td></tr><tr><td height="21">&nbsp;</td><td>'+imgStr+'</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td><div id="btt' + i +'" align="center" style="color : '+cUntakesText+'">Picture '+ parseInt(i+1) +'</div></td><td>&nbsp;</td></tr></table>'
		b.setAttribute('type', 'button');
		b.setAttribute('id', 'picBtnId' + i);
		b.addEventListener('click', function(e){kToggle(e.currentTarget.id)}, false);
		kChoice.push(false);
		div.appendChild(b);
	kGoBtnX2 = document.createElement('a');
	kGoBtnX2.setAttribute('id', 'kGoButton');
	kGoBtnX2.setAttribute('href',thumbLinks[i].href);
	kGoBtnX2.innerHTML = parseInt(i+1);

	div.appendChild(kGoBtnX2);			
	}	
	
	}
	
	else {
		for (i = 0; i < videoLinks.length; i++) {
		imgStr = '<img src="'+videoLinks[i].getElementsByTagName('img')[0].src+'">';
		b = document.createElement('button');
		b.innerHTML='<table id="mvt' + i + '" bgcolor="'+cUntakesFill+'" width="69" border="0"><tr><td width="5" height="21">&nbsp;</td><td width="45" height="21"></td><td width="5" height="21">&nbsp;</td></tr><tr><td height="21">&nbsp;</td><td>'+imgStr+'</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td><div align="center"  style="color : '+cUntakesText+'">Movie '+i+'</div></td><td>&nbsp;</td></tr></table>'
		b.setAttribute('type', 'button');
		b.setAttribute('id', 'mv' + i);
		b.addEventListener('click', function(ee){kToggleM(ee.currentTarget.id)}, false);
		kChoice.push(false);
		div.appendChild(b);
	kGoBtnX2 = document.createElement('a');
	kGoBtnX2.setAttribute('id', 'kGoButton');
	kGoBtnX2.setAttribute('href',videoLinks[i].href);
	kGoBtnX2.innerHTML = i;

	div.appendChild(kGoBtnX2);	
				
		}
	}
	
	s1 = parseInt(GM_getValue('stPcView'));
	s1 = s1 + thumbLinks.length;
	GM_setValue('stPcView',s1);

	lowerFeedback = document.createElement('div');
	lowerFeedback.setAttribute('id','lFeedback');
	lowerFeedback.setAttribute('style','color : yellow');
	div.appendChild(lowerFeedback);	
	
	if (welcomeMessage) {

		welcomeMsg = document.createElement('div'); 
		welcomeMsg.setAttribute('style','background: black; color : rgb(50,150,220); margin: 10 10 10 10; padding: 15 15 15 15');
		welcomeMsg.setAttribute('id','introMsgDiv');
		welcomeMsg.innerHTML = welcomeText;
		div.appendChild(welcomeMsg);		
	}

	d1Feedback = document.createElement('div');
	d1Feedback.setAttribute('id','d1Feedback');
	d1Feedback.setAttribute('style','color : ' + cSysMessage);
	d1Feedback.innerHTML = "Done.";
	d1Feedback.addEventListener('click', function(){drawColors()}, false);
	div.appendChild(d1Feedback);	

	if (GM_getValue('psFlipbox') == true) {
	flipDiv = document.createElement('div');
	flipDiv.setAttribute('id','flipDivId');
	flipDiv.setAttribute('title','Possible branches to other pages.');
	flipDiv.innerHTML = flipBox(document.location.href,0);
	div.appendChild(flipDiv);	
	}

	
	var lf ="";
	for(var i = 0; i < GM_getValue('psLinefeed');i++) {
	 lf+="<br>";
	};
	
	spacer = document.createElement('div');
	spacer.setAttribute('id','bottomSpaceDiv');
	spacer.innerHTML = lf;
	div.appendChild(spacer);	
	
	var dtp = GM_getValue('kTagPreset');
	setTagPreset('t'+dtp+'btn');
	kTagTable();
	
	if (modeToggle == 'Images') {
		kUpdateChoices();
	}
	else {
		kUpdateChoicesMov();
	}
	//buildMenu();
	

	updateTick();
	
}


var imgMinSize = 50;
var bannerRatio = 1.8;

var reqTumbs = 5;
var reqVideos = 2;
var reqGalleries = 25;

var thumbLinks = [];
var videoLinks = [];
var galleryLinks = [];

var collectedGalleries = GM_getValue('collectedGalleries', '').split('|');

var scaleThumbs = GM_getValue('scaleThumbs', true);
var scaleSize = GM_getValue('scaleSize', 150);

var filterNestedUrls = GM_getValue('filterNestedUrls', true);
var modifyLinks = GM_getValue('modifyLinks', true);
var modifyAllLinks = GM_getValue('modifyAllLinks', true);

var linkFiltering = GM_getValue('linkFiltering', false);
var filterExpression = new RegExp(GM_getValue('filterExpression', 'unwanted'), 'i');

var i, a, img, button, label;

GM_registerMenuCommand('Visit random collected thumb gallery', visitRandomCollected);

function scaleFullImg(img) {
	if (img.naturalHeight > 0) {
		if (img.naturalHeight > document.body.parentNode.scrollHeight) {
			img.style.width = (img.naturalWidth * document.body.parentNode.scrollHeight / img.naturalHeight) +'px';
			img.style.height = document.body.parentNode.scrollHeight +'px';
		}
		else if (img.naturalWidth > document.body.parentNode.scrollWidth) {
			img.style.height = (img.naturalHeight * document.body.parentNode.scrollWidth / img.naturalWidth) +'px';
			img.style.width = document.body.parentNode.scrollWidth +'px';
		}
		else {
			img.style.height = img.naturalHeight +'px';
			img.style.width = img.naturalWidth +'px';
		}
		img.style.marginLeft = ((document.body.parentNode.scrollWidth - parseInt(img.style.width, 10)) / 2) + 'px';
		img.style.marginTop = ((document.body.parentNode.offsetHeight - parseInt(img.style.height, 10)) / 2) + 'px';
		img.style.display = 'block';
	}
	else {
		setTimeout(scaleFullImg, 100, img);
	}
}

function scaleImg(img) {
	if (img.naturalHeight > 0) {
		if (scaleThumbs) {
			if (img.naturalWidth > scaleSize && img.naturalWidth >= img.naturalHeight) {
				img.style.height = (img.naturalHeight * scaleSize / img.naturalWidth) +'px';
				img.style.width = scaleSize + 'px';
			}
			else if (img.naturalHeight > scaleSize && img.naturalHeight > img.naturalWidth) {
				img.style.width = (img.naturalWidth * scaleSize / img.naturalHeight) +'px';
				img.style.height = scaleSize +'px';
			}
		}
		else {
			img.style.width = img.naturalWidth +'px';
			img.style.height = img.naturalHeight +'px';
		}
	}
	else {
		setTimeout(scaleImg, 500, img);
	}
}

function scaleImages() {
	img = document.getElementsByTagName('img');
	if (img && img.length) {
		for (i = 0; i < img.length; i++) {
			scaleImg(img[i]);
		}
	}
}

function setLinkTypeClass(a) {
	if (a.host == document.location.host) {
		a.className = 'intLink';
		a.title = unescape(a.pathname + a.search);
	}
	else {
		a.className = 'extLink';
		a.title = a.host;
	}
}

// Remove links that match filterExpression
function filterLinks() {
	var links = div.getElementsByTagName('a');
	for (i = links.length - 1; i >= 0; i--) {
		if (links[i].href.match(filterExpression)) {
			links[i].parentNode.removeChild(links[i]);
		}
	}
}

// Modify links with nested URLs
function removeLinkNesting() {
	var div = document.getElementById('thumbs');
	var links = div.getElementsByTagName('a');
	for (i = 0; i < links.length; i++) {
		// Needs improvement
		links[i].href = unescape(links[i]).replace(/^(http:\/\/.+)(http:\/\/[^&]+)(.*)$/, '$2');
		setLinkTypeClass(links[i]);
	}
}

function updateColList(colDiv, remove) {
	if (remove) {
		collectedGalleries = [];
		var checks = colDiv.getElementsByTagName('input');
		for (i = 0; i < checks.length; i++) {
			if (!checks[i].checked) collectedGalleries.push(checks[i].value);
		}
		if (collectedGalleries.length > 0) {
			GM_setValue('collectedGalleries', collectedGalleries.join('|'));
		}
		else {
			GM_setValue('collectedGalleries', '');
		}
	}
	collectedGalleries.sort();
	var newCol = '';
	document.body.className = '';
	for (i = 0; i < collectedGalleries.length; i++) {
		if (collectedGalleries[i] != '') {
			newCol += '<label><input type=checkbox value='+ collectedGalleries[i];
			if (collectedGalleries[i] == document.location.href) {
				document.body.className = 'inCol';
				newCol += ' checked';
			}
			newCol += '> <a href='+ collectedGalleries[i] +'>'+ collectedGalleries[i] +'</a></label>';
		}
	}
	colDiv.innerHTML = newCol;
}

function mainCleanUp() {

		document.body.innerHTML = '';

		for (i = 0; i < document.styleSheets.length; i++)
			document.styleSheets[i].disabled = true;

		for (i = document.body.attributes.length - 1; i >= 0; i--)
			document.body.removeAttribute(document.body.attributes[i].nodeName);

		GM_addStyle('html { min-height: 100%; }');

		currentThemeNum = GM_getValue('kTheme')	;

	if (currentThemeNum) {
	GM_addStyle('body { min-height: 100%; margin: 0 5px; background: '+cMainBackground
			+'; background-image: url(' + GM_getResourceURL("gradient" + currentThemeNum )+') }');	

		}
		
	else {
	GM_addStyle('body { min-height: 100%; margin: 0 5px; background: '+cMainBackground
		+'; background-image: url(' + GM_getResourceURL("gradient0")+') }');			
	
	}
		
		
		
// -------------------------------------

			
			
		GM_addStyle('body.inCol { background: '+cMainBackground2+'; }');
		GM_addStyle('* { font-size: 11px; font-family: "Verdana"; }');
		GM_addStyle('h1 { font-size: 15px; }');
		GM_addStyle('a { color: '+cLinksNew+'; }');
		GM_addStyle('a:visited { color: '+cLinksOld+'; }');
		GM_addStyle('a:active { color: #e00; }');
		GM_addStyle('a img { margin: 1px; border-width: 2px; }');
		GM_addStyle('a:visited img { opacity: 0.5; }');
		GM_addStyle('button { margin: 2px 2px 0 0; padding: 0px; }');
		GM_addStyle('p { margin: 4px 4px 2 2; padding: 3; color: '+cButtonText+'; background : '+cButtonFill+'; border:2px; border-style:solid; border-color: ' + cButtonBorder + ';}');
		GM_addStyle('#thumbs { clear: both;}');
					
		var div = document.createElement('div');
		div.setAttribute('id', 'thumbs');
		document.body.appendChild(div);	
}

function visitRandomCollected() {
	if (collectedGalleries.length > 1) {
		var url;
		do {
			url = collectedGalleries[Math.floor(collectedGalleries.length * (Math.random() - 0.0001))];
		}
		while (url == document.location.href);
		document.location.href = url;
	}
}

var img = document.getElementsByTagName('img');
if (img && img.length) {
	for (i = 0; i < img.length; i++) {
		if (img[i].parentNode.nodeName == 'A') {
			if (linkFiltering && img[i].parentNode.href.match(filterExpression)) {
				continue;
			}
			else if (img[i].parentNode.href.match(/\.jpe?g$/i)) {
				thumbLinks.push(img[i].parentNode.cloneNode(true));
			}
			else if (
				img[i].parentNode.href.match(/\.(mpe?g|wmv|asf|avi)$/i) &&
				img[i].width > imgMinSize &&
				img[i].height > imgMinSize &&
				img[i].width / img[i].height < bannerRatio &&
				img[i].height / img[i].width < bannerRatio
			) {
				videoLinks.push(img[i].parentNode.cloneNode(true));
			}
			else if (
				img[i].src.match(/\.jpe?g$/i) &&
				img[i].width > imgMinSize &&
				img[i].height > imgMinSize &&
				img[i].width / img[i].height < bannerRatio &&
				img[i].height / img[i].width < bannerRatio
			) {
				galleryLinks.push(img[i].parentNode.cloneNode(true));
			}
		}
	}
}

// Images
if (thumbLinks.length >= reqTumbs) {

 if (GM_getValue('psEngagePictures') || GM_getValue('psAlwaysPic')) {
	
		setTheme(GM_getValue('kTheme'));
		GM_setValue('psEngagePictures', false);
		mainCleanUp();
		currentMode = 'Images';
		buildPage('Images');

		scaleImages();
		if (filterNestedUrls && modifyAllLinks) { removeLinkNesting(); };
		var div = document.getElementById('thumbs');
		div.childNodes[1].focus();
		
	}

	else {
		cPopup('psEngagePictures');
	}
	
}

// Videos
else if (videoLinks.length >= reqVideos) {

 if (GM_getValue('psEngageMovies') || GM_getValue('psAlwaysMov')) {
	
		setTheme(GM_getValue('kTheme'));
		GM_setValue('psEngageMovies', false);
		mainCleanUp();
		currentMode = 'Videos';
		buildPage('Videos');

		scaleImages();
		if (filterNestedUrls && modifyAllLinks) { removeLinkNesting(); };
		var div = document.getElementById('thumbs');
		div.childNodes[1].focus();	
	}
 
	else {
		cPopup('psEngageMovies');
	}
}

// Gallery
else if (galleryLinks.length >= reqGalleries) {


 if(GM_getValue('psEngageGalleries') || GM_getValue('psAlwaysGal')) {
	
	setTheme(GM_getValue('kTheme'));
	mainCleanUp();
	GM_setValue('psEngageGalleries', false);
// ..............................................
	var div = document.getElementById('thumbs');
	
	div.className = 'gallery';
	div.innerHTML = '<h1>'+ document.title +'</h1>';
	
	document.title = GM_getValue('psGalName') + document.title;

	GM_addStyle('fieldset { height: 200px; -moz-border-radius: 8px; border: 1px solid #aaa; margin-top: -5px; padding-bottom: 0; }');
	GM_addStyle('label { display: block; cursor: pointer; line-height: 18px; }');
	GM_addStyle('.indent { margin-left: 17px; }');
	GM_addStyle('.indent.double { margin-left: 34px; }');
	GM_addStyle('input[type="checkbox"] { width: 12px; height: 12px; margin: 0; }');
	GM_addStyle('input[type="text"] { padding: 1px; border: 1px solid #aaa; width: 100%; }');
	GM_addStyle('input[type="text"][size] { width: auto; }');
	GM_addStyle('fieldset hr { height: 6px; display: block; border: 0; margin: 0; }');
	GM_addStyle('#thumbs.gallery { position: absolute; top: 220px; right: 0; bottom: 0; left: 0; overflow: auto; padding: 0 8px; }');
	GM_addStyle('#thumbs.gallery a.intLink img { border-color: #900; }');
	GM_addStyle('#thumbs.gallery a.extLink img { border-color: #090; }');
	GM_addStyle('#colFs { width: 400px; margin-right: 10px; float: left; }');
	GM_addStyle('#setFs { width: 240px; float: left; }');
	GM_addStyle('#colDiv { height: 154px; white-space: nowrap; overflow: auto; border: 1px solid #aaa; padding: 0 4px; background: #222; }');

	var form = document.createElement('form');

	// Gallery collection
	var fs = document.createElement('fieldset');
	form.appendChild(fs);
	fs.setAttribute('id', 'colFs')
	fs.innerHTML = '<legend>Gallery collection</legend>';

	var colDiv = document.createElement('div');
	fs.appendChild(colDiv);
	colDiv.setAttribute('id', 'colDiv');
	updateColList(colDiv, false);

	// Delete selected galleries
	button = document.createElement('button');
	button.innerHTML = '<u>D</u>elete selected';
	button.setAttribute('type', 'button');
	button.setAttribute('accesskey', 'd');
	button.addEventListener('click', function(e){
		if (confirm('Delete selected galleries?')) {
			updateColList(colDiv, true);
		}
	}, false);
	fs.appendChild(button);

	// Add current gallery
	button = document.createElement('button');
	button.innerHTML = '<u>A</u>dd current';
	button.setAttribute('type', 'button');
	button.setAttribute('accesskey', 'a');
	button.addEventListener('click', function(e){
		collectedGalleries = GM_getValue('collectedGalleries', '').split('|');
		if (collectedGalleries.join('|').indexOf(document.location.href) == -1) {
			collectedGalleries.push(document.location.href);
			GM_setValue('collectedGalleries', collectedGalleries.join('|').replace(/^\||\|$/, ''));
			updateColList(colDiv, false);
		}
	}, false);
	fs.appendChild(button);

	// Visit random gallery
	button = document.createElement('button');
	button.innerHTML = 'Visit <u>r</u>andom';
	button.setAttribute('type', 'button');
	button.setAttribute('accesskey', 'r');
	button.addEventListener('click', visitRandomCollected, false);
	fs.appendChild(button);

	// Settings
	var fs = document.createElement('fieldset');
	form.appendChild(fs);
	fs.setAttribute('id', 'setFs')
	fs.innerHTML = '<legend>Settings</legend>';

	// Scale thumbs
	label = document.createElement('label');
	label.innerHTML = '<input type=checkbox> Scale thumbnails down to:';
	if (scaleThumbs) label.firstChild.setAttribute('checked', 'checked');
	label.firstChild.addEventListener('click', function(e){
		scaleThumbs = !scaleThumbs;
		GM_setValue('scaleThumbs', scaleThumbs);
		if (scaleThumbs) e.currentTarget.setAttribute('checked', 'checked');
		else e.currentTarget.removeAttribute('checked');
		scaleImages();
	}, false);
	fs.appendChild(label);

	// Scale size
	label = document.createElement('label');
	label.innerHTML = '<input type=text size=3 value='+ scaleSize +'> pixels';
	label.className = 'indent';
	label.firstChild.addEventListener('change', function(e){
		scaleSize = parseInt(e.currentTarget.value, 10);
		GM_setValue('scaleSize', scaleSize);
		scaleImages();
	}, false);
	fs.appendChild(label);

	fs.appendChild(document.createElement('hr'));

	// Nested URLs
	label = document.createElement('label');
	label.innerHTML = '<input type=checkbox> Try to use URL nested in link';
	if (filterNestedUrls) label.firstChild.setAttribute('checked', 'checked');
	label.firstChild.addEventListener('click', function(e){
		filterNestedUrls = !filterNestedUrls;
		GM_setValue('filterNestedUrls', filterNestedUrls);
		if (filterNestedUrls) e.currentTarget.setAttribute('checked', 'checked');
		else e.currentTarget.removeAttribute('checked');
	}, false);
	fs.appendChild(label);

	// Modify links with nested URL on click
	label = document.createElement('label');
	label.innerHTML = '<input type=checkbox> Modify link on click';
	label.className = 'indent';
	if (modifyLinks) label.firstChild.setAttribute('checked', 'checked');
	label.firstChild.addEventListener('click', function(e){
		modifyLinks = !modifyLinks;
		GM_setValue('modifyLinks', modifyLinks);
		if (modifyLinks) e.currentTarget.setAttribute('checked', 'checked');
		else e.currentTarget.removeAttribute('checked');
	}, false);
	fs.appendChild(label);

	// Modify all links with nested URL on load
	label = document.createElement('label');
	label.innerHTML = '<input type=checkbox> Modify <em>all</em> links on page load';
	label.className = 'indent';
	if (modifyAllLinks) label.firstChild.setAttribute('checked', 'checked');
	label.firstChild.addEventListener('click', function(e){
		modifyAllLinks = !modifyAllLinks;
		GM_setValue('modifyAllLinks', modifyAllLinks);
		if (modifyAllLinks) e.currentTarget.setAttribute('checked', 'checked');
		else e.currentTarget.removeAttribute('checked');
	}, false);
	fs.appendChild(label);

	// Modify all links with nested URL now
	var bdiv = document.createElement('div');
	bdiv.innerHTML = '<button type=button accesskey=M><u>M</u>odify all now</button>';
	bdiv.className = 'indent double';
	bdiv.firstChild.addEventListener('click', removeLinkNesting, false);
	fs.appendChild(bdiv);

	fs.appendChild(document.createElement('hr'));

	// Filter links
	label = document.createElement('label');
	label.innerHTML = '<input type=checkbox> Remove links matching expression:';
	if (linkFiltering) label.firstChild.setAttribute('checked', 'checked');
	label.firstChild.addEventListener('click', function(e){
		linkFiltering = !linkFiltering;
		GM_setValue('linkFiltering', linkFiltering);
		if (linkFiltering) {
			e.currentTarget.setAttribute('checked', 'checked');
			filterLinks();
		}
		else e.currentTarget.removeAttribute('checked');
	}, false);
	fs.appendChild(label);

	// Filter expression
	label = document.createElement('label');
	label.innerHTML = '<input type=text value='+ GM_getValue('filterExpression', 'unwanted') +'>';
	label.className = 'indent';
	label.firstChild.addEventListener('change', function(e){
		try {
			filterExpression = new RegExp(e.currentTarget.value, 'i');
			GM_setValue('filterExpression', e.currentTarget.value);
			if (linkFiltering) filterLinks();
		}
		catch (ex) {
			alert('Invalid expression!');
		}
	}, false);
	fs.appendChild(label);

	document.body.insertBefore(form, document.body.firstChild);

	for (i = 0; i < galleryLinks.length; i++) {
		a = document.createElement('a');
		a.href = galleryLinks[i].href;
		setLinkTypeClass(a);
		div.appendChild(a);

		img = document.createElement('img');
		img.src = galleryLinks[i].getElementsByTagName('img')[0].src;
		a.appendChild(img);
		a.setAttribute('onclick', 'return false');
		
		a.addEventListener('click', function(e){
			if (filterNestedUrls) {
				if (modifyLinks) {
					// Needs improvement
					e.currentTarget.href = unescape(e.currentTarget.href)
						.replace(/^(http:\/\/.+)(http:\/\/[^&]+)(.*)$/, '$2');
					setLinkTypeClass(e.currentTarget);
					GM_openInTab(e.currentTarget.href);
				}
				else {
					GM_openInTab(
						unescape(e.currentTarget.href)
						.replace(/^(http:\/\/.+)(http:\/\/[^&]+)(.*)$/, '$2')
					);
				}
			}
			else {
				GM_openInTab(e.currentTarget.href);
			}
		}, false);
		
	}

// ..............................................
		scaleImages();
		if (filterNestedUrls && modifyAllLinks) { removeLinkNesting(); };
		var div = document.getElementById('thumbs');
		div.childNodes[1].focus();	
	}
 
	else {
		cPopup('psEngageGalleries');
	}
}

//  0	1			2			3		4				5			6		7			8
//-------------------------------------------------------------------------------------------------
// 	ID  Process 	Toggle	 	TMode	Filterdepth	    URLgrade	URLs	BadTags		BadPages
//  -----------------------------------------------------------------------------------------------
//  n	Queued		Off			M.Off	Full(0)			Unique(0)	n-n;..	0			0
//		Engaged		On			M.On	W-E(1)			Multi(1)			1			1
//		Success					Auto	W(2)								2			2
//		Failed


var rFieldName = new Array();

function setFlag(id,field,value) {
	var ts = "";
	for (var i = 0; i < 9; i++) {
		if (i == field) {
			ts += value + "/";
		}
		else {
			ts += getFlag(id,i) + "/";
		}
	}
	mFlags[id] = ts;
}

function getFlag(id,field) {

rFieldName[0] = 'ID';
rFieldName[1] = 'QueueStatus';
rFieldName[2] = 'MainToggle';
rFieldName[3] = 'Manual';
rFieldName[4] = 'FilterDepth';
rFieldName[5] = 'Uniqueness';
rFieldName[6] = 'Sub-URLS';
rFieldName[7] = 'WordWarn';
rFieldName[8] = 'PageWarn';

	var spl = mFlags[id].split("/");
	return spl[field];
}

function toggleXE(inp,Btn) {
	var str = "";
	for (var j = 0; j < 9; j++) {
		str += rFieldName[j] + ': ' + getFlag(inp,j) + ' | ';
	}
	document.getElementById('rfb3').innerHTML = str + 'btn: ' + Btn + " " + mWarns[inp] + 'filterlevel:' + mFilterLevel;
	
	if (Btn == 1) {
		var oAuto = getFlag(inp,2);
		var oManual = getFlag(inp,3);
		var tMode = "";
		
		if ((oManual == 2) && (oAuto == 0)) { tMode = "checkgreen"; setFlag(inp,3,1);}
		if ((oManual == 2) && (oAuto == 1)) { tMode = "checkred"; setFlag(inp,3,0);}
		
		if (oManual == 0) {tMode = "checkgreen"; setFlag(inp,3,1);}
		if (oManual == 1) {tMode = "checkred"; setFlag(inp,3,0);}
		
		document.getElementById('tglBtn' + inp).innerHTML = '<img src="' + GM_getResourceURL(tMode) +'">';
	}

}

function processIcon(inpID) {
	
	var f = parseInt(getFlag(inpID,1));
	
	var expIcon = "";
	switch(f) {
		case 0: expIcon = '<img src="' + GM_getResourceURL("procq") +'">';
		break
		case 1: expIcon = '<img src="' + GM_getResourceURL("proce") +'">';
		break
		case 2: expIcon = '<img src="' + GM_getResourceURL("procs") +'">';
		break
		case 3: expIcon = '<img src="' + GM_getResourceURL("procf") +'">';
		break		
	}
	return expIcon + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function toggleIcon(inpID) {
	
	var expIcon = "";
	var f = parseInt(getFlag(inpID,2));
		
	switch(f) {
		case 0: expIcon = '<img src="' + GM_getResourceURL("autored") +'">';
		break
		case 1: expIcon = '<img src="' + GM_getResourceURL("autogreen") +'">';
		break
	}

	return expIcon + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function filterIcon(inpID) {
	
	var expIcon = "";
	var f = parseInt(getFlag(inpID,5));
		
	switch(f) {
		case 0: expIcon = '<img src="' + GM_getResourceURL("filterlevel0") +'">';
		break
		case 1: expIcon = '<img src="' + GM_getResourceURL("filterlevel1") +'">';
		break
		case 2: expIcon = '<img src="' + GM_getResourceURL("filterlevel2") +'">';
		break		
	}

	return expIcon + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function uniqueIcon(inpID) {
	
	var expIcon = "";
	var f = parseInt(getFlag(inpID,4));
		
	switch(f) {
		case 0: expIcon = '<img src="' + GM_getResourceURL("unique0") +'">';
		break
		case 1: expIcon = '<img src="' + GM_getResourceURL("unique1") +'">';
		break
	}

	return expIcon + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function urlsIcon(inpID) {
	
	var expIcon = "";
	var f = parseInt(getFlag(inpID,6));

	return f + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function warnIcon(inpID) {
	
	var expIcon = "";
	var f = parseInt(getFlag(inpID,7));

	var theWarn = mWarns[inpID].substring(2, mWarns[inpID].length);
	switch(f) {
		case 0: expIcon = "";
		break
		case 1: expIcon = '<img src="' + GM_getResourceURL("warnlevel1") +'"> ' +theWarn;
		break
		case 2: expIcon = '<img src="' + GM_getResourceURL("warnlevel2") +'"> '+ theWarn;
		break
		case 3: expIcon = '<img src="' + GM_getResourceURL("warnlevel3") +'"> '+ theWarn;
		break		
	}

	return expIcon + '<img src="' + GM_getResourceURL("spacer18x4") +'">';
}

function getElementsFromSelection(){
   var nodes=null, candidates=[], children, el, parent, rng;

   // Main
   rng=getSelectionRange();
   if(rng) {
     parent=getCommonAncestor(rng);
     if(parent) {
       // adjust from text node to element, if needed
       while(parent.nodeType!=1) parent=parent.parentNode;

       // obtain all candidates from parent (excluded)
       // up to BODY (included)
       if(parent.nodeName.toLowerCase()!="body") {
         el=parent;
         do {
           el=el.parentNode;
           candidates[candidates.length]=el;
         } while(el.nodeName.toLowerCase()!="body");
       }

       // obtain all candidates down to all children
       children=parent.all||parent.getElementsByTagName("*");
       for(var j=0; j<children.length; j++)
         candidates[candidates.length]=children[j];

       // proceed - keep element when range touches it
       nodes=[parent];
       for(var ii=0, r2; ii<candidates.length; ii++) {
         r2=createRangeFromElement(candidates[ii]);
         if(r2 && rangeContact(rng, r2))
           nodes[nodes.length]=candidates[ii];
       }
     }
   }
   return nodes;

   // Helpers
   function getSelectionRange() {
     var rng=null;
     if(window.getSelection) {
       rng=window.getSelection();
       if(rng && rng.rangeCount && rng.getRangeAt) {
         rng=rng.getRangeAt(0);
       }
     } else if(document.selection && document.selection.type=="Text") {
       rng=document.selection.createRange();
     }
     return rng;
   }

   function getCommonAncestor(rng) {
     return rng.parentElement ?
              rng.parentElement() : rng.commonAncestorContainer;
   }

   function rangeContact(r1, r2) {
     var p=null;
     if(r1.compareEndPoints) {
       p={
         method:"compareEndPoints",
         StartToStart:"StartToStart",
         StartToEnd:"StartToEnd",
         EndToEnd:"EndToEnd",
         EndToStart:"EndToStart"
       }
     } else if(r1.compareBoundaryPoints) {
       p={
         method:"compareBoundaryPoints",
         StartToStart:0,
         StartToEnd:1,
         EndToEnd:2,
         EndToStart:3
       }
     }
     return p && !(
           r2[p.method](p.StartToStart, r1)==1 &&
           r2[p.method](p.EndToEnd, r1)==1 &&
           r2[p.method](p.StartToEnd, r1)==1 &&
           r2[p.method](p.EndToStart, r1)==1
           ||
           r2[p.method](p.StartToStart, r1)==-1 &&
           r2[p.method](p.EndToEnd, r1)==-1 &&
           r2[p.method](p.StartToEnd, r1)==-1 &&
           r2[p.method](p.EndToStart, r1)==-1
         );
   }

   function createRangeFromElement(el) {
     var rng=null;
     if(document.body.createTextRange) {
       rng=document.body.createTextRange();
       rng.moveToElementText(el);
     } else if(document.createRange) {
       rng=document.createRange();
       rng.selectNodeContents(el);
     }
     return rng;
   }

};

function startPageRange() {

	var statx = parseInt(GM_getValue('psRnEntered'));
	statx++;
	GM_setValue('psRnEntered',statx);

	var xa = targetSel;
	GM_setValue('kPages', xa);
	GM_setValue('kCur','0');
	GM_setValue('kHere','...');
	
	var xb = xa.split(" ");
	var xc = new Array(100);

	var xcnt = 0;

	for (var t=0; t < xb.length; t++) {
		if (xb[t].length > 2) {	xc[xcnt] = xb[t];	xcnt++;
		}
	}
	
	GM_setValue('kSource',window.location.href);
	window.location.href = xc[0];
	
}

function deleteRange() {
	
	GM_deleteValue('kPages');
	GM_deleteValue('kCur');
	GM_deleteValue('kHere');
	GM_deleteValue('kSource');
	
	
}

function shiftOffset() {
	var max = prepPattern;
	if (prepOffset < max) prepOffset ++;
	if (prepOffset == max) prepOffset = 0;
	buildRangeLinks(0);
}

function goTabChunk(num,mode) {
	
	var tStart = num * 10;
	var tEnd = 0;
	
	if (mode == 0) { tEnd = tStart + 10;}
	else { tEnd = masterCounter; }
	

	var aWarns = "Warns:  ";
	var aWarnsC = 0;
	for (var g = tStart; g < tEnd; g++) {
		if ((getFlag(g,7) > 1)) {
			aWarns += g + ":" + mWarns[g] + " / ";
			aWarnsC++;
		}
	}
	var mTgl = "Manually deactivated: ";
	var mTglC = 0;
	for (var g = tStart; g < tEnd; g++) {
		if ((getFlag(g,3) < 1)) {
			mTgl += g + " / ";
			mTglC++;
		}
	}
	if (mTglC == 0) mTgl = "No warns."
	if (aWarnsC == 0) aWarns = "Try all links."
	
	var tmEnd = tEnd - 1;
	document.getElementById('xTabBtn' + num).innerHTML = '<center><h3>Done. (' + tStart + ' - ' + tmEnd + ')</h3></center><br>' + aWarns + '<br>' + mTgl;
	targetSel = "";
		
	for (var g = tStart; g < tEnd; g++) {
		if ((getFlag(g,7) < 2) && (getFlag(g,3) > 0)) {
			targetSel += mUrls[g] + " ";
		}
	}
	openRangeInTabs();
}

function scaledSpacer(iw, ih) {
	return '<img src="' + GM_getResourceURL("spacer") +'" width="' + iw + '" height="' + ih + '">';
}

function filterOut(level) {
	mFilterLevel = level;
	document.getElementById('rfb2').innerHTML = "Filter level: " + level;
	// prepSel = [];
	// var warnCnt = 0;
	// for(var x = 0; x < mUrls.length; x++) {
		// if(getFlag(x,7) < 0) {
			// prepSel.push('<a href="' + mUrl[x] + '"></a>');
		// }
		// else { warnCnt++;}
	// }
	// buildRangeLinks();
	// document.getElementById('rfb3').innerHTML = "Filtered out " + warnCnt + " urls with warning.";
}

function reduceLinks() {

	redSel = "";
	sortedOut = [];
	var taken = true;
	var at = 0;
	var mt = 0;

	for (var x = 0; x < mUrls.length; x++) {
		taken = true;
		at = getFlag(x,2); // automatic take
		mt = getFlag(x,3); // manual take (stronger / override)
		ww = getFlag(x,7); // word warn
		if ((at == 0) && (mt == 2)) taken = false;
		if (mt == 0) taken = false;
		if((ww > mFilterLevel)) taken = false;
		if (taken) {
			redSel += mUrls[x] + " ";
			}
		else { 
			if (mt == 0) {
				sortedOut.push(x + ': <img src="' + GM_getResourceURL("checkred") + '">' 
				+ ' <a href="' + mUrls[x] + '">'+ mUrls[x] + '</a>');
			}
			if (at == 0) {
				sortedOut.push(x + ': <img src="' + GM_getResourceURL("autored") + '">' 
				+' <a href="' + mUrls[x] + '">'+ mUrls[x] + '</a>');
			}
			if (ww > 0) {
				sortedOut.push(x + ": " 
			+ '<img src="' + GM_getResourceURL("warnlevel" + calcWarnLevel(mUrls[x]).substring(0,1)) +'">'
			+ ' <a href="' + mUrls[x] + '">'+ mUrls[x] + '</a>'  );
			}
			}
	}
	
	prepPattern = 1;
	buildRangeLinks(1);
}

// BUILD RANGE LINKS


function calcWarnLevel(inp) {

	
	// Worst case
	var Level1 = GM_getValue('kWarnLevel1').split(',');

	// Bad
	var Level2 = GM_getValue('kWarnLevel2').split(',');
	
	// Hmm...
	var Level3 = GM_getValue('kWarnLevel3').split(',');
		
	var lev1 = 0;
	var lev2 = 0;
	var lev3 = 0;
	var foundTags = "";
	
	for (var j = 0; j < Level3.length; j++) {
		if (inp.indexOf(Level3[j]) > -1) {
			lev3++; 
			foundTags += Level3[j] + ",";
			}
	}

	for (var j = 0; j < Level2.length; j++) {
		if (inp.indexOf(Level2[j]) > -1) {
			lev2++;
			foundTags += Level2[j] + ",";
			}
	}

	for (var j = 0; j < Level1.length; j++) {
		if (inp.indexOf(Level1[j]) > -1) {
		lev1++;
		foundTags += Level1[j] + ",";
		}
	}
	
	var mainWarn = 0;
	
	if (lev3 > 0) mainWarn = 1;
	if (lev2 > 0) mainWarn = 2;
	if (lev1 > 0) mainWarn = 3;

	return mainWarn + ";" + foundTags;
}
	
function buildRangeLinks(mode) {

	function addElemBtn(inp,BtnKind) {
		
		var bname = "";
		var needsEvent = false;
		switch (BtnKind) {
			case 0: bname = "procInfo" + inp;
			break
			case 1: bname = "tglBtn" + inp; needsEvent = true;
			break
			case 2: bname = "filterBtn" + inp; needsEvent = true;
			break			
			case 3: bname = "uniInfo" + inp;
			break	
			case 4: bname = "urlsInfo" + inp;
			break	
			case 5: bname = "warnInfo" + inp;
			break				
			
		}
		
		p1Btn = document.createElement('span');
		p1Btn.setAttribute('id', bname);	
		
		var bStr ="";

		switch (BtnKind) {
			case 0: bStr = ''; // should be bStr = processIcon(inp);
			break
			case 1: bStr = toggleIcon(inp);
			break
			case 2: bStr = ''; // should be bStr = filterIcon(inp);
			break			
			case 3: bStr = uniqueIcon(inp);
			break	
			case 4: bStr = urlsIcon(inp);
			break	
			case 5: bStr = warnIcon(inp);
			break				
		}
		p1Btn.innerHTML = bStr;

		
		document.getElementById("xe" + inp).appendChild(p1Btn);
		if (needsEvent) document.getElementById(bname).addEventListener('click', function(){ toggleXE(inp,BtnKind)}, false);

	}

	function addTabButton(inp,mode) {
		var bname = "xTabBtn" + inp;
		p1Btn = document.createElement('p');
		p1Btn.setAttribute('id', bname);	
		p1Btn.innerHTML = '<center><h3>' + inp + '</h3></center>';
		document.getElementById("xtd" + inp).appendChild(p1Btn);
		document.getElementById(bname).addEventListener('click', function(){ goTabChunk(inp,mode)}, false);	
	}

	function isURL(murl) {
	
		function isURL0(argvalue) {

		  if (argvalue.indexOf(" ") != -1)
		    return false;
		  else if (argvalue.indexOf("http://") == -1)
		    return false;
		  else if (argvalue == "http://")
		    return false;
		  else if (argvalue.indexOf("http://") > 0)
		    return false;

		  argvalue = argvalue.substring(7, argvalue.length);
		  if (argvalue.indexOf(".") == -1)
		    return false;
		  else if (argvalue.indexOf(".") == 0)
		    return false;
		  else if (argvalue.charAt(argvalue.length - 1) == ".")
		    return false;

		  if (argvalue.indexOf("/") != -1) {
		    argvalue = argvalue.substring(0, argvalue.indexOf("/"));
		    if (argvalue.charAt(argvalue.length - 1) == ".")
		      return false;
		  }

		  if (argvalue.indexOf(":") != -1) {
		    if (argvalue.indexOf(":") == (argvalue.length - 1))
		      return false;
		    else if (argvalue.charAt(argvalue.indexOf(":") + 1) == ".")
		      return false;
		    argvalue = argvalue.substring(0, argvalue.indexOf(":"));
		    if (argvalue.charAt(argvalue.length - 1) == ".")
		      return false;
		  }
		  return true;
		}

		function isURL1(url){
		    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
		    if(RegExp.test(url)){
		        return true;
		    }else{
		        return false;
		    }
		} 

		var res = false;
		
		if (isURL0(murl)) {res = true;};
		if (isURL1(murl)) {res = true;};
			
		return res
	}

	function splitArgs(inp) {
		
		var urls = new Array();
		var scores = new Array();
		var tl = "";
		var gl = "";
		var pos = 0;
		
		var spl = new Array();
		spl = inp.split("=");

		for (var i = 0; i < spl.length;i++) {
			tl = spl[i];
			gl = tl.split("?")[0];
			tl = gl;
			if (isURL(tl)) {urls.push(tl);};
		}

		var totalScore = 0; var uScore = 0; var lScore = 0; var sScore = 0; var cScore = 0;
		
		var noCommonUrl = false;
		if (commonUrl.length < 10) noCommonUrl = true;
		
		var exp = "";
		var winnerNum = 0;
		var highscore = 0;
		var sEff = 15;
		var cEff = 15;
		for (var i = 0; i < urls.length;i++) {
			
			if ((urls[i].indexOf(commonUrl) < 0) || noCommonUrl) {
			
				var ppos = inp.indexOf(urls[i]);
				var us = inp.substring(ppos-2,ppos);
				if (us == "u=") { uScore = 65;}
				
				lScore =  urls[i].length;
				sScore = (urls[i].split("/").length - 3);
				cScore = flipBox(urls[i],1);
				totalScore = uScore + lScore + (sScore * sEff) + (cScore * cEff);
				
				if (totalScore > highscore) {
					highscore = totalScore;
					winnerNum = i;
				}
				scores.push('u: ' + uScore 
				+ ', length: ' + lScore
				+ ', slashes: '  + parseInt(sScore * sEff) + ' (' + sScore + '*' + sEff + ')'
				+ ', numerals: ' + parseInt(cScore * cEff) + ' (' + cScore + '*' + cEff + ')'
				+ ', total: ' + totalScore + ',');
			}
			else {
				scores.push("Referrer filtered out.");
			}
		}	

		exp = inp.replace(commonUrl, '<span class="uBadRef">' + commonUrl + '</span>') ;
		
		for (var z = 0; z < urls.length; z++) {
			if (z == winnerNum) { 
				exp = exp.replace(urls[winnerNum], '<span class="uWinner" title="Link score: ' + scores[z]+ '">' + urls[winnerNum] + '</span>');}
			else { 
				exp = exp.replace(urls[z],'<span class="uSecond" title="Low link score: ' + scores[z] + '">' + urls[z] + '</span>');}
		}
		
		if (noCommonUrl) {
			return '<span class="uWinner" title="Unmodified Link">'+ inp +'</span>';}
		else {

			return exp;
		}
		
	}	
	
	function linkElement(num, lnk) {
		var rst = (num+prepOffset) % prepPattern;
		
		var autoToggle = 0;
		if (rst == 0) autoToggle = 1;

		var tWarn = calcWarnLevel(lnk).substring(0,1);
		targetSel += lnk +' ';
		mUrls.push(lnk);
		mFlags.push(num + '/0/' + autoToggle + '/2/0/0/0/' + tWarn + '/0/' );
		mWarns.push(calcWarnLevel(lnk));
		masterCounter++;
		return splitArgs(lnk) ;
	}

	mUrls = [];
	mFlags = [];
	masterCounter = 0;
	var  xdv = document.getElementById('xdiv');

	var buf=[];
	var xc = new Array();

	for(var ii=0; ii<prepSel.length; ii++) { 
		buf[buf.length]=prepSel[ii].href; 
		}
		
	var xa = buf.join(" ");
	var xb = new Array();
	
	if (mode == 0) {xb = xa.split(" ");}
	else { xb = redSel.split(" ");}

	var xcnt = 0;
	var xxcn = 0;
	
	for (var t=0; t < xb.length; t++) { if (xb[t].length > 2) {	xxcn++;};}
	
	xdv.innerHTML = '';
	
	targetSel = "";

	var badUrlGrades = new Array();
	var spk = 0;
	while(xb[spk].length < 3) { spk++;};
	var firstUrl = xb[spk];
	var jj = 0;
	for (var t=1; t < xb.length; t++) {
			if (xb[t].length > 2) {	
				badUrlGrades.push(kMatchGrade(firstUrl,xb[t]));
				jj++;
			}
	}
	var smallest = badUrlGrades[0];
	
	for (var j = 0; j < jj; j++) {
		if(badUrlGrades[j] < smallest) {
			smallest = badUrlGrades[j];
		}
	};
	
	
	var commonUrl = firstUrl.substring(0,smallest);
	commonUrl = commonUrl.replace("?"," ");
	commonUrl = commonUrl.replace("&"," ");
	commonUrl = commonUrl.split(" ")[0];
	var grlInfo = xxcn + " links identified, " + xb.length + " total nodes in selection.";
	
	var dbg = document.getElementById('rfb1');
	if (commonUrl.length > 10) {
		grlInfo += ' Could filter out referrer: <b>' + commonUrl + '</b>';
	}
	

// --------------------------------------------------------------------------------------------
	
	for (var t=0; t < xb.length; t++) {
			if (xb[t].length > 2) {	
			xc[xcnt] = xb[t];	
			xcnt++;
			}
	}
	
	//xc.sort();
	
	var jo = 0;
	for (var t=0; t < xc.length; t++) {
			var re = document.createElement('div');
			re.setAttribute('id','xElem' + t);
			
			re.innerHTML = '<table style="text-align: left;" border="0" cellpadding="0" cellspacing="2">'
			+'<tbody><tr>'
			+'<td style="color : rgb(30,120,190)"><a href="' + xc[t] + '">' + intPad(t,3) + '</a> </td>'
			+'<td><div id="xe' + t + '"></div></td>'
			+'<td class="uCrap">' + linkElement(t,xc[t]) + '</td>'
			+'</tr></tbody></table>';
	
			xdiv.appendChild(re);
			addElemBtn(t,0);
			addElemBtn(t,1);
			addElemBtn(t,2);
			addElemBtn(t,5);
			
			if ((t+1) % 10 == 0) {
				var nuTab = document.createElement('div')
				nuTab.setAttribute('id','xtd' + jo);
				xdiv.appendChild(nuTab);
				jo++;
			}
	
	}
	var lastTab = 0;
	for (var d = 0; d < jo; d++) {
		lastTab++;
		addTabButton(d,0);
	}
	

	var xh = document.createElement('div');
	
	var w1 = 0;
	var w2 = 0;
	var w3 = 0;
	
	for(var w = 0; w < mUrls.length; w++) {
		if (mWarns[w].substring(0,1) == "1") w1++;
		if (mWarns[w].substring(0,1) == "2") w2++;
		if (mWarns[w].substring(0,1) == "3") w3++;
	}
	
	var fInfo = grlInfo + " | ";
	if (w1 > 0) fInfo += w1 + " x " + '<img src="' + GM_getResourceURL("warnlevel1") +'">' ;
	if (w2 > 0) fInfo += w2 + " x " + '<img src="' + GM_getResourceURL("warnlevel2") +'">' ;
	if (w3 > 0) fInfo += w3 + " x " + '<img src="' + GM_getResourceURL("warnlevel3") +'">' ;
	
	dbg.innerHTML = fInfo;
	
	xh.innerHTML = '<div id="xtd' + lastTab + '"></div><br><center><h3>Filtered Elements: </h3></center>';

	xdiv.appendChild(xh);
	
	if (!(xc.length % 10 == 0)) {
		addTabButton(lastTab,1);
	}
	
	
	for ( var s = 0; s < sortedOut.length; s++) {
		var so = document.createElement('div')
		so.innerHTML = sortedOut[s];
		xdiv.appendChild(so);
	}


}
function saveWarns() {
var w1 = document.getElementById("warnEdit1").value;
var w2 = document.getElementById("warnEdit2").value;
var w3 = document.getElementById("warnEdit3").value;
GM_setValue('kWarnLevel1',w1);
GM_setValue('kWarnLevel2',w2);
GM_setValue('kWarnLevel3',w3);
var totalPhrases = w1.split(',').length + w2.split(',').length + w3.split(',').length;
quickLog("Saved warning phrases. " + totalPhrases + ' total, Level 1:' + w1.split(',').length + ', Level 2:' + w2.split(',').length + ', Level 3:' + w3.split(',').length + '.');

}

function quickLog(inp) {
	document.getElementById('rfb3').innerHTML = "";
	var xinfo = document.createElement('div');
	xinfo.innerHTML = inp;
	document.getElementById('rfb3').appendChild(xinfo);
}

function patternChange(dropdown) {
	prepPattern = dropdown;
	buildRangeLinks(0);
}

function buildRangePrepareDialog() {

	document.title = '[RANGE]';
	var buf=[];
	prepSel=getElementsFromSelection();
	var xc = new Array();

var pBody = '<table style="text-align: top;" cellpadding="0" cellspacing="0"><tbody><tr><td>'
	+'<img src="' + GM_getResourceURL("spacer18x4") +'" width="10" height="132">'
	+'</td><td>'
	+'<table style="text-align: top;" cellpadding="4" cellspacing="2"><tbody>'
	+'<tr>'
	+'<td style="width : 145px"><img src="' + GM_getResourceURL("Logo34Medium") +'"></td>'
	+'<td>'
	+'<form>'
	+'<select id="patternDropdown" name="pSelect">'
	+'<option value="1">Every link</option>'
	+'<option value="2">Every 2nd</option>'
	+'<option value="3">Every 3rd</option>'
	+'</select>'
	+'</form>'
	+'<span id="sBtn"></span>'
	+'</td>'
	+'<td><span style="color : yellow">Filter level</span><br>'
	+'<select id="filterDropdown" name="fSelect">'
	+'<option value="0">Allow nothing</option>'
	+'<option value="1" selected>Allow Level 3</option>'
	+'<option value="2">Allow Level 2 + 3</option>'
	+'<option value="3">Allow everything</option>'
	+'</select><br><button id="reduceBtn">Apply filters</button>'
	+'</td>'
	+'<td>'
	+'<table style="text-align: right; width: 100%; color : yellow;" border="0" cellpadding="1" cellspacing="1"><tbody><tr>'
	+'<td>Level 1, Worst <img src="' + GM_getResourceURL("warnlevel3") +'"></td>'
	+'<td><input id="warnEdit1" value="' + GM_getValue('kWarnLevel1') + '" type="text" size="70"></td>'
	+'</tr>'
	+'<tr>'
	+'<td>Level 2, Bad <img src="' + GM_getResourceURL("warnlevel2") +'"></td>'
	+'<td><input id="warnEdit2" value="' + GM_getValue('kWarnLevel2') + '" type="text" size="70"></td>'
	+'</tr>'
	+'<tr>'
	+'<td>Level 3, Low <img src="' + GM_getResourceURL("warnlevel1") +'"></td>'
	+'<td><input id="warnEdit3" value="' + GM_getValue('kWarnLevel3') + '" type="text" size="70"></td>'
	+'<td><button id="saveWarnsBtn">Save</button></td>'
	+'</tr>'
	+'</tbody>'
	+'</table>'
	+'</td>'
	+'</tr>'
	+'</tbody></table><div id="rfb1"></div><div id="rfb2"></div><div id="rfb3"><td><br>'
	//----
	+'</td>'
	+'</tr>'
	+'</tbody>'
	+'</table>';
	

	
	function patternTitle(inp) {
		switch(inp){
			case 1:
			return "";
			break
			case 2:
			return "2nd";
			break
			case 3:
			return "3rd"
			break
		}
	
	}


	document.body.innerHTML = '';
	
	
	for (i = 0; i < document.styleSheets.length; i++)
		document.styleSheets[i].disabled = true;
	for (i = document.body.attributes.length - 1; i >= 0; i--)
		document.body.removeAttribute(document.body.attributes[i].nodeName);

	GM_addStyle('* { font-size: 11px; font-family: "Verdana"; }');
	GM_addStyle('h3 { font-size: 15px; }');		
		
	GM_addStyle('body { min-height: 100%; margin: 0 5px; background: ' + pdBackground + ';}');		
	GM_addStyle('div {color: yellow }');
	GM_addStyle('a {color: rgb(170,170,50) }');
	GM_addStyle('p { margin: 4px 4px 2 2; padding: 3; color: rgb(90,140,140); border:1px; border-style:solid;}');

	GM_addStyle('.uBadRef { background: rgb(63, 16, 1);}');
	GM_addStyle('.uCrap { color: rgb(84, 136, 145);}');
	GM_addStyle('.uSecond { color: rgb(240, 30, 30);}');
	GM_addStyle('.uWinner { color: rgb(138, 255, 6); background-color: rgb(29, 85, 15);}');
	
	addGlobalStyle('#navPnl {position: fixed; left: 0; right: 0; bottom: auto; top: 0; background-color: rgb(20, 20, 40); z-index:99;');
	//background-color: rgb(50, 140, 230);

	rdiv = document.createElement('div');
	rdiv.setAttribute('id','navPnl');

	rdiv.innerHTML = pBody;
	document.body.appendChild(rdiv);

//---------------------
	navSpacer = document.createElement('div');
	navSpacer.innerHTML = '<table style="text-align: top;" cellpadding="0" cellspacing="0"><tbody><tr><td>'
	+'<img src="' + GM_getResourceURL("spacer18x4") +'" width="10" height="132">'
	+'</td></tr></tbody></table>';
	document.body.appendChild(navSpacer);
	
//---------------------
	splitter = document.createElement('hr');
	document.body.appendChild(splitter);	
// --------------	
	
	xdiv = document.createElement('div');
	xdiv.setAttribute('id', 'xdiv');
	document.body.appendChild(xdiv);
	
	var bname = 'shiftBtn';
	p1Btn = document.createElement('button');
	p1Btn.setAttribute('id', bname);	
	p1Btn.innerHTML = 'Offset shift';
	document.getElementById('sBtn').appendChild(p1Btn);	
	document.getElementById(bname).addEventListener('click', function(){ shiftOffset()}, false);
	
	document.getElementById('saveWarnsBtn').addEventListener('click', function(){ saveWarns()}, false);
	
	document.getElementById('patternDropdown').addEventListener('change', function(e){ patternChange(e.currentTarget.value);}, false);	
	document.getElementById('filterDropdown').addEventListener('change', function(e){ filterOut(e.currentTarget.value);}, false);		

	document.getElementById("reduceBtn").addEventListener('click', function(){ reduceLinks()}, false);

	prepPattern = 1;
	buildRangeLinks(0);
}

function openRangeInTabs() {
	
	var statx = parseInt(GM_getValue('psRnEntered'));
	statx++;
	GM_setValue('psRnEntered',statx);
	
	//var nodes=getElementsFromSelection();

	var xa = targetSel;
	GM_setValue('kPages', xa);
	GM_setValue('kCur','0');
	GM_setValue('kHere','...');
	
	var xb = xa.split(" ");
	var xc = new Array();

	var xcnt = 0;

	for (var t=0; t < xb.length; t++) {
		if (xb[t].length > 2) {	xc[xcnt] = xb[t];	xcnt++;
		}
	}
	
	GM_setValue('kSource',window.location.href);

	GM_openInTab(cleanupUrl(xc[0])); 
	kAutoNextPage();
}

function testdummy() {
	
	var str = '<html><head></head><body style="background-color: rgb(66, 82, 114);"><img src="' + GM_getResourceURL("Logo34Medium") +'"><br><br>An extra tab, from nothing.</body></html>';

	GM_openInTab("data:text/html;charset=UTF-8," + encodeURI(str));
	document.title = "ha!";
}

GM_registerMenuCommand("Prepare Range" , buildRangePrepareDialog);