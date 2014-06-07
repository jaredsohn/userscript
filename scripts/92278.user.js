// AICN Extra Stuff
// version 0.7.5 BETA!
// 2011-05-12
// Copyright (c) 2010, Kevin Willis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "AICN Extra Stuff", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          AICN Extra Stuff
// @namespace     none
// @description   Does Some Extra Stuff in AICN Comments Section
// @include       http://www.aintitcool.com/*
// @match		  http://www.aintitcool.com/*
// @include       http://aintitcool.com/*
// @match		  http://aintitcool.com/*
// @include       http://aintitcoolnews.com/*
// @match		  http://aintitcoolnews.com/*


// 

// ==/UserScript==


//var reorder = "yes";

//alert('running');

var flip=0;
//var hilite = 'true';
var moderator = '';
var ignoreArray = new Array();
ignoreArray[0] = 'decoy';

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}



// this chunk of code to get certain things running on Chrome . . .
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}



var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;

var search = window.location.search;

// GM_setValue ('ignore','');
// GM_setValue ('prefs','');
//GM_setValue ('talkbacks','');
var readIgnore = '';
var readPrefs = '';
var readTalkbacks = '';
var readPrefs = GM_getValue('prefs');
var readIgnore = GM_getValue('ignore');
var readTalkbacks = GM_getValue('talkbacks');
//alert(readTalkbacks);
var autoxx = 0;

var countnode = newUrl.split('node/').length-1;
//alert(countnode);


if (readTalkbacks==undefined) {
readTalkbacks = '|';
}

var assobj= {};
var ignobj= {};


// alert(readTalkbacks);
var talkbacks = readTalkbacks.split('|');


ignobj.decoy = 'decoy';
ignobj.unhi = '';
ignobj.unig = '';




if (readIgnore!='' & readIgnore!=undefined) {
var ignoreRay = readIgnore.split('\n');
} else {
var ignoreRay = new Array();
ignoreRay[0] = 'decoy';
}



var browser = navigator.userAgent;


var bcount = browser.split('Chrome').length-1;
var bcount2 = browser.split('Safari').length-1;
var bcount3 = browser.split('Opera').length-1;
if (bcount>0 || bcount2>0 || bcount3>0) {
var brow = 'Chrome';

} else {
var brow = 'Something else';
}



if (search!=undefined & search !='') {

var search = search.replace('?','');

var searchRay = search.split('&');
//var showr = dump(searchRay);



assobj.showonly = '';
assobj.reverse = '';
assobj.hili= '';
assobj.auto = '';
assobj.skip = '';
assobj.pink = '';
assobj.count = '';
assobj.fullig = '';
assobj.click = '';
assobj.proc = '';
ignobj.ignore = '';
ignobj.hilite = '';
ignobj.unhi = '';
ignobj.unig = '';

 



var submitcount = search.split('Update').length-1;
var igcount = search.split('ignore').length-1;
var hicount = search.split('hilite').length-1;
var unigcount = search.split('unig').length-1;
var unhicount = search.split('unhi').length-1;

if (submitcount>0) {
var prefcount = searchRay.length;
for (rx=0;rx<prefcount;rx++) {
var preftemp = searchRay[rx];
//alert (preftemp);
var prefvals = preftemp.split("=");
var pref1 = prefvals[0];
var pref2 = prefvals[1];
//alert (pref1 + pref2);
assobj[pref1] = pref2;

}

} else if (igcount>0 || hicount>0 || unigcount>0 || unhicount>0) {

var igcount = searchRay.length;
for (rx=0;rx<igcount;rx++) {
var igtemp = searchRay[rx];
//alert (preftemp);
var igvals = igtemp.split("=");
var ig1 = igvals[0];
var ig2 = igvals[1];
//alert (ig1 + ig2);
ignobj[ig1] = ig2;



}



}

//var showr = dump(assobj);
//alert (showr);

if (submitcount>0) {
assobj.submit = '';
delete assobj.submit;
var writePrefs = dump(assobj);
//alert (writePrefs);
var readPrefs = writePrefs;
GM_setValue ('prefs',writePrefs);
}


} // end if search string has values


if (readPrefs!='' & readPrefs!=undefined) {

var objRay = readPrefs.split('\n');


var prefcount = objRay.length;
for (rx=0;rx<prefcount;rx++) {
var preftemp = objRay[rx];
var prefvals = preftemp.split("|");
var pref1 = prefvals[0];
var pref2 = prefvals[1];
assobj[pref1] = pref2;


}


}


if (assobj.showonly == 'on') {
var showcheck = 'checked';
} else {
var showcheck = '';
}

if (assobj.reverse == 'on') {
var revcheck = 'checked';
} else {
var revcheck = '';
}


if (assobj.hili == 'on') {
var hilcheck = 'checked';
} else {
var hilcheck = '';
}

if (assobj.auto == 'on') {
var autocheck = 'checked';
} else {
var autocheck = '';
}

if (assobj.click == 'on') {
var clickcheck = 'checked';
} else {
var clickcheck = '';
}

if (assobj.proc == 'on') {
var proccheck = 'checked';
} else {
var proccheck = '';
}


if (assobj.fullig == 'on') {
var fulligcheck = 'checked';
} else {
var fulligcheck = '';
}




if (assobj.skip == 'on') {
var skipcheck = 'checked';
} else {
var skipcheck = '';
}

if (assobj.pink == 'on') {
var pinkcheck = 'checked';
var pink='on';
} else {
var pinkcheck = '';
var pink = '';
}

if (assobj.clean == 'on') {
var cleancheck = 'checked';
} else {
var cleancheck = '';
}

if (assobj.count == 'on') {
var countcheck = 'checked';
} else {
var countcheck = '';
}


if (ignobj.ignore!=undefined) {
if (ignobj.ignore.length>1) {

var ignore_dummy = ignobj.ignore;

var countIgnore = ignoreRay.length;


var exists =  searchArray(ignoreRay,ignore_dummy + '|Ignore');

if (exists == 'false') {
ignoreRay[countIgnore] = ignore_dummy + '|Ignore';
var writeIgnore = ignoreRay.join('\n');
GM_setValue('ignore',writeIgnore);


}
}
}


if (ignobj.hilite!=undefined) {
if (ignobj.hilite.length>1) {

var ignore_dummy = ignobj.hilite;

var countIgnore = ignoreRay.length;


var exists =  searchArray(ignoreRay,ignore_dummy + '|Hilite');

if (exists == 'false') {
ignoreRay[countIgnore] = ignore_dummy + '|Hilite';
var writeIgnore = ignoreRay.join('\n');
GM_setValue('ignore',writeIgnore);


}
}
}

if (ignobj.unhi!=undefined) {
if (ignobj.unhi.length>1) {

var ignore_dummy = ignobj.unhi;
deleteArray(ignoreRay,ignore_dummy + '|Hilite');
var writeIgnore = ignoreRay.join('\n');
GM_setValue('ignore',writeIgnore);
}
}



if (ignobj.unig!=undefined) {
if (ignobj.unig.length>1) {
alert(assobj.unig);
var ignore_dummy = ignobj.unig;
deleteArray(ignoreRay,ignore_dummy + '|Ignore');
var writeIgnore = ignoreRay.join('\n');
GM_setValue('ignore',writeIgnore);
}
}




//////////////// set up functions ///////////////////////


function recentTalk(tbak) {
var recentTBs = '<div id="recentTalkbackBox" style="color:white;background-color:#666699;border:2px solid black;">';

recentTBs = recentTBs + '<b><font face="tahoma,verdana" color="white" size="3">&nbsp;&nbsp;Recent Talkbacks</font></b><ul id=\'recentTalkBack\' style="color:black;background-color:white;border:0px solid black;">';

for (tbx=0;tbx<tbak.length;tbx++) {
 if(tbak[tbx]!=undefined) {
 var tbray = tbak[tbx].split('§');

 if (tbray[1]!=undefined) {
recentTBs = recentTBs + '<li style="background-color:white;border-bottom:1px dotted gray;border-left:0px;border-right:0px;"><a href="' + tbray[0] + '">' + tbray[1] + '</a></li>';
}
}
}
recentTBs = recentTBs + '</ul></div>';

return recentTBs;


}

function repall(fnd,rpl,stxt) {

while(stxt.indexOf(fnd)!=-1)stxt=stxt.replace(fnd,rpl);

return stxt;

}
 
function reformat(tag,open_tag,close_tag,ftext) {


 tagcount = 1;
 var tagcount = ftext.split(tag).length-1;


 if (tagcount > 0) {
 for(tx=0;tx<tagcount;tx++) {
 var bfpos = ftext.indexOf(tag);
 var efpos = ftext.indexOf(tag,bfpos+tag.length);
 var fpar = ftext.substring(bfpos,efpos+tag.length);
 var reppar = fpar;
 fpar = fpar.replace(tag,'');
 fpar = fpar.replace(tag,'');
 fpar = open_tag + fpar + close_tag;
 
 if (tag=='|') {
 
 fpar = fpar.replace('img:','img src="');
 fpar = fpar.replace('Img:','img src="');
 
   if (fpar.split('mp3-auto:').length-1>0) {
  fpar = fpar.replace('mp3-auto:','embed src="');
 fpar = fpar.replace('">','" width="300" height="42" autostart="true"></embed>');

 }
 
 if (fpar.split('mp3:').length-1>0) {
 fpar = fpar.replace('mp3:','embed src="');
 fpar = fpar.replace('">','" width="300" height="42" autostart="false"></embed>');

 }

 fpar = fpar.replace('http://','url_swap');
 fpar = fpar.replace('www.','wol_swap.');

}

 if (tag=='~') {
 fpar = fpar.replace('red:','font color="red">');
 fpar = fpar.replace('blue:','font color="blue">');
 fpar = fpar.replace('white:','font color="white">');
 fpar = fpar.replace('green:','font color="green">');
 fpar = fpar.replace('gray:','font color="gray">');
 fpar = fpar.replace('silver:','font color="silver">');
}

 
 ftext =ftext.replace(reppar,fpar);
 
 

 

 } 
 }
  return ftext;
  
 
 } // end function


 
 function searchArray(arr, obj) {
  for(var i=0; i<arr.length; i++) {
  
    if (arr[i] == obj) return 'true';
  }
  return 'false';
}

 function deleteArray(arr, obj) {
  for(var i=0; i<arr.length; i++) {
  
    if (arr[i] == obj) {
    arr.splice(i,1);
    }
  }
  return arr;
}

//****************************

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + item + "|" + value + "\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}



function stripHTML(oldString) {

   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
   
        if(oldString.charAt(i) == '<') inTag = true;
        if(oldString.charAt(i) == '>') {
              if(oldString.charAt(i+1)=="<")
              {
              		//dont do anything
	}
	else
	{
		inTag = false;
		i++;
	}
        }
   
        if(!inTag) newString += oldString.charAt(i);

   }

   return newString;
}
function extract(needle1,needle2,source) {

var begPos = source.indexOf(needle1);



var source2 = source.substring(begPos);
var endPos = source2.indexOf(needle2);
source2 = source2.substring(0,endPos);

return source2;



}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function extract2(needle1,needle2,source) {

var begPos = source.indexOf(needle1);
begPos = begPos + needle1.length;


var source2 = source.substring(begPos);
var endPos = source2.indexOf(needle2);
source2 = source2.substring(0,endPos);

return source2;



}

//**************************************

function removeDiv(needle1,needle2,source) {
var begPos = source.indexOf(needle1);
begPos = begPos + needle1.length;

var source1 = source.substring(0,begPos);
var endPos = source.indexOf(needle2,begPos);
var source2 = source.substring(endPos);

var source3 = source1 + source2;

return source3;
}



function extract3(needle1,needle2,needle3,needle4,source) {

var begPos = source.indexOf(needle1);



var source2 = source.substring(begPos);
var endPos = source2.indexOf(needle2)+needle2.length;

if (endPos<4) {
endPos = source2.indexOf(needle3)+1;
}
if (endPos<4) {
endPos = source2.indexOf(needle4)+needle4.length;
}

source2 = source2.substring(0,endPos);

return source2;



}

function Linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" style="color:blue;text-decoration:underline;font-weight:bold;">$1</a>');

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" style="color:blue;text-decoration:underline;font-weight:bold;" target="_blank">$2</a>');

    //Change email addresses to mailto:: links
    var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" style="color:blue;text-decoration:underline;font-weight:bold;">$1</a>');

    return replacedText
}



///////////////////////////


var newBody = document.body.innerHTML;

if(countnode==1) {

var gurucount = newBody.split('Guru Meditation:</h3>').length-1;
if (gurucount > 0) {
var guruerror = '<div align="center"><img src="http://upload.wikimedia.org/wikipedia/commons/d/db/Guru_meditation.gif"></div>';
} else {
var guruerror = '';
}


var countNames = '<p class="commentBy">by';
countNames = countNames + '\n';
countNames = countNames + '      ';
      
var nocomments = newBody.split('<h4>No comments yet</h4>').length-1;
var pageTitle = extract('<h1 class="articleTitle">','</h1>',newBody);
var listTitle = stripHTML(pageTitle);
pageTitle = 'AICN: ' + stripHTML(pageTitle);
document.title = pageTitle;

var stopcount = newBody.split('<aicnextrastuff-processed />').length-1;
if (stopcount==0 || nocomments > 0) {

//var backupBody = newBody;

var parse=newBody;
var parse3 ='';

var n1 = '<ul id="talkBackList">';
var n2 = '<div id="qTalkbackBox" class="box full">';




parse2 = extract(n1,n2,parse);
parse2 = parse2.replace('<td class="talkback" width="80%">','');

var loggedin = extract2('You are logged in as ','</p>',newBody);




begSplit = '<li id="comment-block-';
var comCount = parse2.split(begSplit).length-1;
if (comCount == 0 ) {
begSplit = '';
var comCount = parse2.split(begSplit).length-1;
}

var commentsTotal = comCount;
endSplit = '</li>';

var n3 = '<div id="pageLogin" class="box full">';
var n3count = parse2.split(n3).length-1;

if (n3count>0) {
n2 = n3;
}
var pBegPos = parse.indexOf(n1) + n1.length;
var pEndPos = parse.indexOf(n2);

var toppg = parse.substring(0,pBegPos);



var bottom = parse.substring(pEndPos);
var parse3 = '';

// alert(comCount);



n1 ='<div id="qTalkbackBox" class="box full">';

n2 = '<div id="talkBackBox" class="box full">';


/*
var qBegPos = toppg.indexOf(n1);
var qEndPos = toppg.indexOf(n2);
var postbox = toppg.substring(qBegPos);
var qEndPos = postbox.indexOf(n2);
var afterbox = postbox.substring(qEndPos);
var postbox = postbox.substring(0,qEndPos);
postbox = postbox.replace('rows="20"','rows="15"');
toppg = toppg.substring(0,qBegPos) + afterbox;
bottom = postbox + bottom;
	
	*/



if (comCount > 0 ) {



if (assobj.showonly == 'on' & comCount > 100) {
comCount = 100;
var showonly = assobj.showonly;
}

if (assobj.reverse == 'on') {
var reorder = "yes";
}

if (assobj.hili == 'on') {
var hilite = "true";
}


if (assobj.auto == 'on') {
var autoexpand = 'yes';
} else {
var autoexpand = '';
}

if (assobj.skip == 'on') {
var skiphuge = 'yes';
} else {
var skiphuge = '';
}

if (assobj.fullig == 'on') {
var fullignore = 'yes';
} else {
var fullignore = '';
}





var pPos=0;

/*
if (assobj.clean == 'on') {
// toppg = toppg.replace(/<p>/g,'');
var remclen = '<br>\n<br>\n<br>\n';
var remclen2 = '<br><br>';
var remclen3 = '<br><br><br>';
toppg = toppg.replace(remclen,'');
while(toppg.indexOf(remclen3)!=-1)toppg=toppg.replace(remclen3,'<RETURN>');
while(toppg.indexOf(remclen)!=-1)toppg=toppg.replace(remclen,'<br>');
while(toppg.indexOf('<br>')!=-1)toppg=toppg.replace('<br>','');
while(toppg.indexOf('<RETURN>')!=-1)toppg=toppg.replace('<RETURN>','<br><br>');
}
*/

if (skiphuge!='yes' || commentsTotal<600) {
if (showonly=='on') {


for (scx=0;scx<=commentsTotal-100;scx++) {
var pBegPos = parse2.indexOf(begSplit,pPos+begSplit.length);
pPos = pBegPos;

}



parse2 = parse2.substring(pPos);

}
var aa=0;
for (cx=0;cx<comCount;cx++)
		{
		
		
		var pBegPos = parse2.indexOf(begSplit);
		var pEndPos = parse2.indexOf(endSplit,endSplit.length+pBegPos)+endSplit.length;
		
		if (cx==comCount) {
		
		endSplit = '</tbody>';
		var pEndPos = parse2.lastIndexOf(endSplit);
		
		pEndPos = parse2.length;
		
		}
		
		if (pEndPos > pBegPos) {
		var comment = extract(begSplit,endSplit,parse2);
	
		
		if (pink=='on') {
		comment = comment.replace(' class="moderatorComment"',' class="modCom"');
		}
		
		if (autoexpand == 'yes') {
		//comment = comment.replace('display: none','display: inline-block');
		//comment = comment.replace('display:none','display:inline-block');
		
		
		comment = comment.replace('<!--div class="talkback','<!--div class="remove');
		comment = comment.replace('class="talkbackContent"','class="talkbackContent" style="display:inline-block;"');
		

		
		}
		var autoxx=autoxx+1;
		if (comment!=undefined) {
		comment = '' + comment;
		}
		

		
		var dBegPos = '<p class="commentDate">';
		var dEndPos = '</p>';
		var cdate = extract2(dBegPos,dEndPos,comment);
		if (assobj.reverse == 'on') {
		var cnum = commentsTotal-cx;
		} else if (showonly=='on') {
		var cnum = (cx+1)+(commentsTotal-100);
		} else {
		var cnum = cx+1;
		}
		
		
		comment = comment.replace(dBegPos+cdate+dEndPos,'');
		


		/*
		if (comment.split('http://').length-1) {
		
		
		var url = extract3('http://','/\n','/<','</TD>',comment);
		var repurl = url;
		
		url = url.replace(' ','');
		url = url.replace('\n','');
		url = '<a href="' + url + '" target="_blank" style="color:blue;">' + url + '</a>';
		comment = comment.replace(repurl,url);
		
		
		}
		*/
	
		var moderator = '';
		var comNum = extract2('id="comment-block-','>',comment);
		var errat = comNum.split(' ').length-1; 
		if (errat>0) {
		var spapos = comNum.indexOf(' ');
		comNum = comNum.substring(0,spapos);
		var moderator = 'true';
		//alert(comment);
		
		}
		
		
		comNum = comNum.replace('"','');
		
		

		
				if(flip>49 & flip<56) {
		
		
		}
		var nBegPos='<a href="#" onclick="Element.toggle(\'talkback-content-' + comNum + '\');; return false;">';
		var nEndPos='</a>';
		var ctitle = extract2(nBegPos,nEndPos,comment);
		if (ctitle.length>50) {
		
		var titlediv = ctitle.length/50;
		var charcount = ctitle.split(' ').length-1;
		
		if (charcount < titlediv) {
		for (tdx=1;tdx<=titlediv;tdx++) {
		 var ctitle2 = ctitle.substring(0,50*tdx) + ' ' + ctitle.substring(50*tdx);
		ctitle = ctitle2;
		}
		} 
		} // end if title div
		
		
		
		ctitle = nBegPos + ctitle + nEndPos;
		
		comment = comment.replace(ctitle,'');
		

		
		
		var nBegPos='<p class="commentBy"';
		var nEndPos='</p>';
		var cname = extract2(nBegPos,nEndPos,comment);
		
		var nBegPos='">';
		var nEndPos='<span';
		var cname = extract2(nBegPos,nEndPos,cname);
		
	
		
		var dname = '';
		var spancount = cname.split('<span').length-1;
		
		if (spancount<1) {
		var cname = cname + '<trim>';
		var dname = extract2('by','<trim>',cname);
		} else {
		var dname = extract2('by','<span',cname);
		}
		dname = trim(dname);
		
		if (assobj.count == 'on') {
		var cncount = newBody.split(countNames + dname).length-1;
}

		var iname = dname.replace(' ','+');
		
		//dname = trim(dname);
		if (flip==4) {
		
		}
		var subname = '';
		var subfun = '';
		var subfunction ='';
		var iglen = ignoreRay.length;
		for(dxn=0;dxn<iglen;dxn++) {
		var subray = ignoreRay[dxn].split('|');
		var subname = subray[0];
		var subfun = subray[1];
		if (subname==dname) {
		
		dxn=iglen;
		var subfunction = subfun;
		} 
		}
		
		
		ignorehtml = '<span class="ctrl">';
	
	
		
		ignorehtml = ignorehtml + '<a href="' + newUrl + '?ignore=' + iname + '">Ignore</a> ';
		if (subfunction!='Hilite') {
		ignorehtml = ignorehtml + '<a href="' + newUrl + '?hilite=' + iname + '">Hilite</a> ';
		} else {
		ignorehtml = ignorehtml + '<a href="' + newUrl + '?unhi=' + iname + '">Unhilite</a> ';
		}
		ignorehtml = ignorehtml + '</span>';
		
		
		
		
		
		
		
		if(dname==loggedin) {
		ignorehtml='';
		var remember = newUrl + '§' + listTitle;

		var countRemember = talkbacks.length;
		if (countRemember>10) {
		talkbacks.splice(0,1);
		
		var tbdisp = dump(talkbacks);
		
		}

		var addToList = searchArray(talkbacks,remember);

		 if (addToList=='false') {
		 talkbacks[countRemember]=remember;

		 var writeBacks = talkbacks.join('|');
		 writeBacks = repall('|||','',writeBacks);
		 GM_setValue('talkbacks',writeBacks);
		 
		}
		}
		
		
		
		var datecol = 'white';
		if (dname=='kevinwillis.net') {

		}
		
		if(dname==loggedin & hilite=='true') {
		var bgcolor = 'yellow';
		var bgcolor2 = 'black';
		} else {
		var bgcolor = '#c1c1de';
		var bgcolor2 = '#666699';
		}
		if (moderator=='true') {
		var bgcolor = 'black';
		var bgcolor2= 'gray';
		
		if (assobj.pink=='on') {
		bgcolor2 = 'magenta';
		bgcolor = '#FF66FF';
		datecol = '#330033';
		}
		
		}
		if (subfunction=='Hilite') {
		var bgcolor = 'yellow';
		var bgcolor2= 'gold';
		var datecol = 'black';
		} 
		
		var nBegPos='<div class="talkbackContent" id="talkback-content-' + comNum + '" style="display:none;">';
		var nEndPos='class="reply">';
		var commentText = extract2(nBegPos,nEndPos,comment);
		var repcomment = commentText;
		
		
		if (assobj.proc == 'on') {
		var commentText = reformat('|','<','">',commentText);
		var commentText = reformat('~','<','</font>',commentText);
	
		var commentText = reformat('•','<b>','</b>',commentText);
		var commentText = reformat('––','<del>','</del>',commentText);
		var commentText = reformat('**','<i>','</i>',commentText);
		var commentText = reformat('“','<blockquote>','</blockquote>',commentText);
		
		}
		
		if (assobj.click == 'on') {
		var commentText = Linkify(commentText);
		}
		
		
		
		while(commentText.indexOf('url_swap')!=-1)commentText=commentText.replace('url_swap','http://');
	    while(commentText.indexOf('wol_swap.')!=-1)commentText=commentText.replace('wol_swap.','www.');
		
		


		
		//var htcount = commentText.split('http://').length-1;
		//if (htcount>0) {
		//alert(commentText);
		//}
		//var flip2 = flip2 + 1;
		//var res = parseUrl2(commentText);
		//alert(res);
		//if(flip2<6) {
		//var res = parseUrl2(commentText);
		//alert(res);
		//}
		//if (htcount>0) {
		//for (htx=0;htx<=htcount;htx++) {
		//n1 = 'http://';
		//n2 = '<';
		//var url = extract2(n1,n2,commentText);
		
		//alert('url:' + url + '|' + htcount);
		//}
		
		
		//}
		
		
		if (commentText.length>70) {
		var commentText2 = commentText;
		var comdiv = commentText.length/70;
		var charcount = commentText.split(' ').length-1;
		
		if (charcount < comdiv) {
		for (tdx=1;tdx<=comdiv;tdx++) {
		 var recomment = commentText2.substring(0,70*tdx) + ' ' + commentText2.substring(70*tdx);
		commentText2 = recomment;
		var comdiv = commentText2.length/70;
		}
		commentText = recomment;
		} 
		} // end if title div
	
		comment = comment.replace(repcomment,commentText);
		flip = flip+1;
	

		
		if (assobj.clean == 'on') {
		comment = removeDiv('<p class="reply">','</p>',comment);
		}

		

		
		comment = comment.replace(cname,'');
		comment = removeDiv('<div class="talkbackHeader">','</div>',comment);

		
		

		
		if (assobj.count == 'on') {
		cname = cname.replace(dname,dname + ' (' + cncount + ')');
		
		}
		
		
		var head = '<table width="100% border=1 style="border-width:1px;border-style:solid;border-color:black;" cellspacing=0 cellpadding=0><tr><td width="85%"  bgcolor="' + bgcolor + '" style="line-height:110%;margin:12px;padding:14px;">\n<b style="font-size:16px;font-weight:bolder;">' + ctitle + '</b><br><span style="font-size:14px;letter-spacing:0;">' + cname + '</span>'+ignorehtml+'</td><td align="right" bgcolor="' + bgcolor2 + '" style="font-family:arial,helvetica;font-size:12px;letter-spacing:0;color:' + datecol + ';line-height:110%;padding:10px;">' + cdate + '<br><b>' + cnum + '</b> of <b>' + commentsTotal + '</b></td></tr></table>\n';
		
		comment = comment.replace('<div class="talkbackHeader">','<div style=:padding0;margin:0;">' + head);
		//comment = '<xmp>' + comment;
		// alert(ctitle);
		
		
		
		var replaceString = '<replace_' + comNum + '|' + pBegPos + ':' + pEndPos + '>';
		// replaceString = comment;
		
		//alert(comment);
		
		var chunk1 = parse2.substring(0,pBegPos);
		var chunk2 = parse2.substring(pEndPos);
		// alert(chunk2);
		
		var parse2 =  chunk1 + '\n\n' + replaceString + '\n\n' + chunk2;
		
		if (subfunction=="Ignore") {
		comment='<table width="100%" bgcolor="black" style="border:1px solid #333;"><tr><td><a href="' + newUrl + '?unig=' + iname + '" style="font-family:verdana,arial,helvetica;font-size:10px;font-weight:800;letter-spacing:0;color:gray;">UN-IGNORE ' + dname.toUpperCase() + '</td></tr></table>';
		if (fullignore=="yes") {
		comment = '';
		}
		}
		
		comment = comment + '</em></b></i></b></em>';
		
		//if (aa < 5) {
		//alert(comment);
		//aa++;
		//}
		
				if (moderator=='true') {
				



		comment = comment.replace('eader">','');
		comment = comment.replace('<p class="reply"></p>','');
		comment = comment.replace(' style="display:inline-block;"',' style="display:block;"');
		
		//alert(cname);
// alert(comment);
		
		}
		
		
		if (comNum > 0) {
		if (reorder=="yes") {
		var parse3 = comment + parse3;
		} else {
		var parse3 = parse3 + comment; // + '<xmp>'+ comment +'</xmp>';
		//alert(parse3);
		}
		}
		}
		
		// chunk1 + replaceString +
		
		} // end for loop
		

//alert(parse3);

var recentT = recentTalk(talkbacks);

bottom = bottom.replace('<!--AdZone4:end-->','<!--AdZone4:end--><br><br>' + recentT);




parse3 = parse3 + "</li></ul></div>";

var watermark = '<aicnextrastuff-processed />\n';

newBody =  toppg + parse3 + bottom;

}  else { // end if skip huge not selected

newBody = toppg + parse2 + bottom;

}
//newBody = '<xmp>' + comment + '\n\n' + comNum + '</xmp>';

} else {

// do something

}

// newBody = parse3;

if (nocomments>0) {
parse3 = 'No Reader Comments Posted Yet';
newBody =  toppg + parse3 + bottom;
}

//var ptitle = document.title;
//var ptitle =  stripHTML(ptitle);


// newBody = newBody.replace(ptitle,ptitle2);

var newStyle = '<style type="text/css">';

// newStyle = newStyle + '#recentPosts div ul {color:white;background-color:#c1c1de;border:2px solid black;}';


if (skiphuge!='true') {
newStyle = newStyle + '#talkBackList .talkbackContent {left-padding:10px;margin:-5;letter-spacing:.5px;line-height:110%;} \n h4 {background:none;color:#333;margin:0;font-size:100%;letter-spacing:.5px;line-height:110%;font-family:arial; } \n h1,h2,h3,h4,h5,h6,\n .list {font-family:Tahoma,Verdana,Arial,Helvetica}\n h1,h2,h3,h4,h5,h6 {line-height:100%; margin: .1em 0} \n';
newStyle = newStyle + '#talkBackList li div {padding:0;}\n';
newStyle = newStyle + '#talkBackList li {list-style:none;padding:0;margin:0;border-bottom:1px solid #000;float:left;width:100%} \n';
}

if (assobj.pink == 'on') {
newStyle = newStyle + '#talkBackList .modCom * {color: #000} \n';
newStyle = newStyle + '#talkBackList .modCom .talkbackContent {background-color:pink} \n ';
newStyle = newStyle + '#talkBackList .modCom .talkbackHeader {background-color: #FF66FF} \n ';
newStyle = newStyle + '#talkBackList .modCom .talkbackEdit {background-color:pink}';
newStyle = newStyle + '.reply2 {width:100%;line-height:80%;letter-spacing:0;font-size:13px;color:pink;background-color:#CC99FF;}';
}

// newStyle = newStyle + '.reply {color:gray;background-color:#DFDFDF;width:100%;line-height:80%;letter-spacing:0;font-size:13px;}';



if(brow=='Chrome') {
newStyle = newStyle + '#talkBackList .ctrl {text-indent:0;display:inline-block}';
}
newStyle = newStyle + '.talkbackHeader {margin:0;padding:0;line-height:100%;}';



newStyle = newStyle + '.text {width:35.25em;border:1px solid;border-color:#999 #CCC #CCC;display:block}';
newStyle = newStyle + '.box .ctrl a {margin-left: 1em;padding-left:1em; border-left: 1px solid #999;color: #369;font-size:12px;letter-spacing:0;"}';



newStyle = newStyle + '</style>';

//<span style="background-color:#c1c1de;border:1px solid black;padding:12px;width:100%;line-height:200%;">
var cwidth = '15%';
var prefs = '<div id = "preffs"><form name="modprefs" type="post" id="modeprefs"><table style="width:100%;font-family:arial,helvetica,verdana;font-size:12px;letter-spacing:0;background-color:#c1c1de;border:1px solid black;display:inline-block;"><tr>'
prefs = prefs + '<td width="' + cwidth + '"><b>Total Comments: ' + commentsTotal + '</td>';
prefs = prefs + '<td width="' + cwidth + '" NOWRAP><input type="checkbox" name= "showonly" id="showonly" ' + showcheck +'> Show Only Last 100 TBs </td> ';
prefs = prefs + '<td width="' + cwidth + 'x"><input type="checkbox" name= "reverse" id="reverse" ' + revcheck +'> Reverse Order  </td>';
prefs = prefs + '<td width="' + cwidth + '"><input type="checkbox" name= "fullig" id="rfullig" ' + fulligcheck +'> Full Ignore </td>';
prefs = prefs + '<td width="' + cwidth + '"><input type="checkbox" name= "click" id="click" ' + clickcheck +'> Clickable Links </td>';
prefs = prefs + '<td width="' + cwidth + '"><input type="checkbox" name= "proc" id="proc" ' + proccheck +'> Formatting! </td>';
prefs = prefs + '<td width="' + cwidth + '"><input type="checkbox" name= "hili" id="hili" ' + hilcheck +'> Hilite Mine </td>';


prefs = prefs + '</tr>';
prefs = prefs + '<tr><td width="' + cwidth + '" bgcolor="#C6AEC7"><input type="checkbox" name= "skip" id="skip" ' + skipcheck +'> Skip Huge Talkbacks </td> ';
prefs = prefs + '<td width="' + cwidth + '" bgcolor="#C6AEC7"><input type="checkbox" name= "pink" id="pink" ' + pinkcheck +'> Make Moderators Pink </td> ';
prefs = prefs + '<td width="' + cwidth + '" bgcolor="#C6AEC7"><input type="checkbox" name= "count" id="count" ' + countcheck +'> Count Comments </td> ';
prefs = prefs + '<td width="' + cwidth + '" bgcolor="#C6AEC7"><input type="checkbox" name= "clean" id="clean" ' + cleancheck +'> No Reply Button</td> ';
prefs = prefs + '<td width="' + cwidth + '" bgcolor="#C6AEC7"><input type="checkbox" name= "auto" id="auto" ' + autocheck +'> Auto Expand All </td>';
prefs = prefs + '<td width="' + cwidth + '" bgcolor="#C6AEC7" colspan="2"><input type="submit" name = "submit" value="Update Prefs" style="font-size:11px;border:1px solid black;">';


pref = prefs + '</td></tr></table></form></div>';
/*
var clear='<script language="Javascript">';
var clear=clear+'function clearBox() {';
var clear=clear+'alert(\'hey now!\');';
var clear=clear+'var ref1 = document.getElementById(\'comment_subject\');';
var clear=clear+'var ref2 = document.getElementById(\'comment_content\');';
var clear=clear+'ref2.value=\'\';';
var clear=clear+'ref2.value=\'\';';
var clear=clear+'</script>';
*/

prefs = prefs + '';

//var showonlywatch = document.getElementById( 'showonly' );
//	 showonlywatch.addEventListener( 'click', alertMe, false );

//newBody = newBody.replace(/&lt;br&gt;/g,'<br>');
//newBody = newBody.replace(/&lt;Br&gt;/g,'<br>');
//newBody = newBody.replace(/&lt;p&gt;/g,'<p>');
//newBody = newBody.replace(/&lt;hr&gt;/g,'<hr>');


//newBody = newBody.replace(/&lt;BR&gt;/g,'<br>');
//newBody = newBody.replace(/&lt;P&gt;/g,'<p>');
//newBody = newBody.replace(/&lt;HR&gt;/g,'<hr>');

newBody = newBody.replace('false;">+ expand all</a>','false;">+ Expand All ' + commentsTotal + ' Comments</a>');
newBody = newBody.replace('<script src="/javascripts/jquery-',prefs + '<script src="/javascripts/jquery-');
/*
var rep0 = 'value="Post Your Talkback" type="submit">';
var rep1 = 'value="Post Your Talkback"';
var rep2 = 'value="Post Your Talkback" type="submit">&nbsp;<button name="Clear Fields" onmouseover="clearBox();; return false;">Clear Fields</button';
newBody = newBody.replace(rep0,rep2);
*/

newBody = guruerror + newStyle + newBody + watermark;









document.body.innerHTML = newBody;
}


} else {
//alert(countnode);
var recentT = recentTalk(talkbacks);

newBody = newBody.replace('<div id="webMailBox" class="box">',recentT + '<br><div id="webMailBox" class="box">');
document.body.innerHTML = newBody;
}