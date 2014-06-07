// WaPo Troll Hunter
// version 1.8.4 BETA!
// 2011-01-12
// Copyright (c) 2011, Kevin Willis
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
// select "WaPo Troll Hunter", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          WaPo Troll Hunter
// @namespace     none
// @description   Removes Trolls from WaPo Comments Section
// @match		  http://voices.washingtonpost.com/*
// @include       http://voices.washingtonpost.com/*
// @include       https://voices.washingtonpost.com/*
// 
// @exclude       http://voices.washingtonpost.com/plum-line/
// ==/UserScript==

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


		function include(arr,obj) {
			return (arr.indexOf(obj) != -1);
		}

		function isArray(obj) {
		   if (obj.constructor.toString().indexOf("Array") == -1)
			  return false;
		   else
			  return true;
		}







//var trolls = badCom.join('|');
//GM_setValue("trolls",trolls);
//GM_setValue('trolls',''); // this clears out the troll cache
// alert(badCom[0]);



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

// GM_setValue('trolls',' ');
//alert('did it');


var moveName = 'yes';
var formatting = 'yes';
//window.addEventListener ("DOMContentLoaded", processPage(), false);

processPage();


function processPage() {

var comRemCount = 0;
var badCom=new Array();
var smallfont = '9px';



var extraStyle = '<style> \n a.th:hover {text-decoration:blink;} \n a.th:link {text-decoration:overline;color:yellow;} \n </style>';
var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
var search = window.location.search;
var ntcnt = search.split('?troll=').length-1;
var fvcnt = search.split('?favorite=').length-1;
var ufvcnt = search.split('?unfavorite=').length-1;
var newTroll = '';
if (ntcnt>0) {
var newTroll = ' ';
var newTroll = search.replace('?troll=','');
var newTroll = newTroll.replace('%20',' ');
var newTroll = newTroll.replace('+',' ');
var newTroll = newTroll.replace('+',' ');
}
var newFavorite = '';
if (fvcnt>0) {
var newFavorite = ' ';
var newFavorite = search.replace('?favorite=','');
var newFavorite = newFavorite.replace('%20',' ');
var newFavorite = newFavorite.replace('+',' ');
var newFavorite = newFavorite.replace('+',' ');
}



var unFavorite = '';
if (ufvcnt>0) {
var unFavorite = ' ';
var unFavorite = search.replace('?unfavorite=','');
var unFavorite = unFavorite.replace('%20',' ');
var unFavorite = unFavorite.replace('+',' ');
var unFavorite = unFavorite.replace('+',' ');
}

var shtuff = include(badCom,newTroll);

var trolls_get = GM_getValue('trolls','Decoy^');
var favorites_get = GM_getValue('favorites','Decoy^');

var badCom = trolls_get.split('|');
var goodCom = favorites_get.split('|');

if(ufvcnt>0) {
if (isArray(goodCom)==true) {
var unfavCount = goodCom.length;
for (unfx=0;unfx<=unfavCount;unfx++) {
if(goodCom[unfx] == unFavorite) {
alert ('Unfavoriting ' + unFavorite);
goodCom = deleteArray(goodCom,unFavorite);
//alert(goodCom[unfx]);
}
}
}
} // end if ufvcnt > 0




if (newTroll != "") {
if (include(badCom,newTroll)==false)
{
if (newTroll != 'Clear Out Trolls') {
alert ('Blocking ' + newTroll + '\n\nPress Clear Troll Buttons At Very Bottom of Page to Clear out Troll Settings');
var trollCount = badCom.length;
var trollx = trollCount;
badCom[trollx] = newTroll;




var trolls_set = badCom.join('|');





GM_setValue('trolls',trolls_set);



} else {
if (newTroll == 'Clear Out Trolls') {

GM_setValue('trolls',''); // this clears out the troll cache

if (isArray(badCom)==true) {
var clearCount = badCom.length;
for (clr=1;clr<=clearCount;clr++)
{
badCom=badCom.splice(1,1);
}

}
alert('Clearing Out Troll List');


}
// end if not clear out trolls
} 

}
} // end if newTroll equals something


//••••••••••••••••••••••••••••••••••••••••••••• favorites

if (newFavorite != "") {
if (include(goodCom,newFavorite)==false)
{
if (newFavorite != 'Clear Out Favorites') {
alert ('Favoriting ' + newFavorite + '\n\nPress Clear Favorites Button At Very Bottom of Page to Clear out Favorite Settings');
var favCount = goodCom.length;
var favx = favCount;
goodCom[favx] = newFavorite;




var favorite_set = goodCom.join('|');




GM_setValue('favorites',favorite_set);



} else {
if (newFavorite == 'Clear Out Favorites') {

GM_setValue('favorites',''); // this clears out the troll cache

if (isArray(goodCom)==true) {
var clearCount = goodCom.length;
for (clr=1;clr<=clearCount;clr++)
{
goodCom=goodCom.splice(1,1);
}

}
alert('Clearing Out Favorite List');


}
// end if not clear out favorites
} 

}
} // end if new favorite equals something



if (badCom[0]=='') {
badCom[0]='Decoy Troll';
}

if (goodCom[0]=='') {
goodCom[0]='Decoy Favorite';
}

/*
var adSidebar = document.getElementById('wrapperTop');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
*/
var adSidebar = document.getElementById('ad_links_inner');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}


var adSidebar = document.getElementById('wrapperMainRight');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}




var newBody = document.body.innerHTML;
var backupBody = newBody;




// parse through comments, one message at a time, so tasks can be performed on a message by message basis *******************

var begpos = newBody.indexOf('<a id="comments">');
var endpos = newBody.indexOf('<span class="commentheader">Post a Comment');
begpos = begpos + 17;
var cparse = newBody.substring(begpos,endpos);
var cstart = newBody.substring(0,begpos);
var cend = newBody.substring(endpos);

var commentArray = cparse.split('<a id="');

 var cpcount = commentArray.length;

//cpcount = 1;



for (cx=1;cx<cpcount;cx++)
{

var subparse = commentArray[cx];


if (subparse != "") {
//alert(subparse);
var subend = subparse.indexOf('<p class="posted">');

var sub1 = subparse.substring(0,subend);
var sub2 = subparse.substring(subend);

var sub1 = doFormatting(sub1);

sub2 = sub2.replace('|','| ' + cx + ' | ');

commentArray[cx]=sub1+sub2;
}



} // process each comment like a unique little snowflake

cparse = commentArray.join('<a id="');
newBody = cstart + cparse + cend;

// remove trolls or blocked commentors


comCount = badCom.length;
comCount = comCount-1;

for (cx=0;cx<=comCount;cx++)
{

var badCommentor = badCom[cx];


if (badCommentor==undefined) {
badCommentor = "";
}

if (goodCommentor==undefined) {
goodCommentor = "";
}

var remCom = '>Posted by: ' + badCommentor;
var hiliteCom = '>Posted by: ' + goodCommentor;

    // alert('Removing ' + badCommentor);



var badCount = newBody.split(remCom).length-1

var i=0;

for (i=1;i<=badCount;i++)
{

var endPos = newBody.indexOf(remCom,0);

// '<div class="commentText">'
// var newBody = newBody.concat('<hr>Here is the Pos<hr>',endPos);
var parse = newBody.substr(0,(endPos + remCom.length));

var begPos = parse.lastIndexOf('<a id="');
var beg2Pos = parse.lastIndexOf('<div class="commentText">');
var n1 = parse.substring(begPos,beg2Pos);
var repString = parse.substring(begPos);
var rem1Pos = newBody.indexOf(n1);
var rem2Pos = endPos+remCom.length;
var stitch1 = newBody.substr(0,rem1Pos);
var stitch2 = newBody.substring(rem2Pos);
var clipStitch = stitch2.indexOf('<a id="');
if (clipStitch < 2) {
var clipStitch = stitch2.lastIndexOf('Report abuse</a>');
clipStitch = clipStitch + 16;
}
var stitch2 = stitch2.substring(clipStitch);


var newBody = stitch1 + stitch2;

comRemCount++;

} // end remove all comments from a specific commentor

} // end page through commentors to remove





// handle moving who posted to above each comment


if (moveName == 'yes') {



var comCount = newBody.split('"posted">Posted by: ').length-1;
var printComCount = comCount;

var begPos = newBody.lastIndexOf('<a id="comments">');
var endPos = newBody.lastIndexOf('<div class="sectionhedComment">');


var parse = newBody.substring(begPos,endPos);
var start = newBody.substring(0,begPos);
var end = newBody.substr(endPos);

var comCount = comCount;
var alx = 0;
for (cc=1;cc<=comCount;cc++)
{


var parse = parse.replace('<a id="comments','<a mb="th" id="comments');
var begPos = parse.indexOf('<a id="',20);

// alert(parse);

var beg2Pos = parse.indexOf('<div class="commentText">');


var aid = parse.substring(begPos,beg2Pos);

beg2Pos = aid.indexOf('</a>');

var aid = aid.substr(0,beg2Pos);
var aid2 = aid.replace('<a id=','<a modified_by = "trollhunter" id =');

 // var aidWrite = aidWrite + '<xmp>AID: ' + aid + '</xmp><br>';

var posPos1 = parse.indexOf('<p class="posted">');
var posPos2 = parse.indexOf('<a href="mailto:blogs@',posPos1);
var postname = parse.substring(posPos1,posPos2);
var posPos3 = postname.indexOf('|');
postname = postname.substr(0,posPos3);
var postCounts = newBody.split(postname).length-1;

var namePos = postname.indexOf('by: ');
namePos = namePos + 4;

var justName =  postname.substr(namePos);

favCount = goodCom.length;
favCount = favCount-1;
var hilite_me = '';


for (fax=0;fax<=favCount;fax++)
{

var goodCommentor = goodCom[fax];

if (alx < 0) {
alert(trim(justName) + '|' + trim(goodCommentor));
alx++;
}

if (trim(justName)==trim(goodCommentor)) {
var fax=favCount+1;
var hilite_me = 'yes';
//alert("FAVORITE!");

}
}

var bg_color = '#DFDFDF';

if (hilite_me=='yes') {
bg_color = 'yellow';
var favUrl = '<a href="' + newUrl + '?unfavorite=' + justName + '" style="text-decoration:none;color:black;" title="Click Here to un-Favorite This Commentor">';
} else {
var favUrl = '<a href="' + newUrl + '?favorite=' + justName + '" style="text-decoration:none;color:black;" title="Click Here to Favorite This Commentor">';
}

//alert(justName);

//var justName = 'Jukie';
var dummy = justName;
var trollButton = '&nbsp;</a></td><td width="100%" align="right" bgcolor="#DFDFDF"><a href="' + newUrl + '?troll=' + dummy + '" style="text-decoration:none;"><button style="font-size:' + smallfont + ';">Ignore ' + dummy + '</button></a>';

var postname2 = postname.replace('<p class="posted">','<table width="100%" cellpadding=5 cellspacing=3 class="th"><tr><td bgcolor="' + bg_color + '" style="font-size:12px;color:black;" width = "100%" class="th"><b>' + favUrl);
// var postname2 = postname2 + '<a href="' + newUrl + '?favorite=' + dummy + '">';
var postname2 = postname2 + '</a></b>&nbsp;(' + postCounts + ') &nbsp;';
var postname2 = postname2 + trollButton;
var postname2 = postname2 +'</td></tr></table>';

var postname2 = aid2 + postname2;
var postname3 = postname.replace('<p class="posted">','"posted">') + '|';

 var aidWrite = aidWrite + '<xmp>postname: ' + postname3 + '</xmp>';
parse = parse.replace(postname3,'"posted">');
parse = parse.replace(aid,postname2);
parse = parse.replace('<p class="posted">','<p modified_by = "troll hunter" class="posted">');
parse = parse.replace('<div class="commentText">','<div modified_by = "troll hunter" class="commentText">');




}


var linkCount = parse.split('<p>http://').length-1;
// linkCount = 1;
for (hti=1;hti<=linkCount;hti++)
{

begPos = parse.indexOf('<p>http://');
var slice = parse.substr(begPos+3);
endPos = slice.indexOf('</p>');
var rlink = slice.substring(0,endPos);
// alert (rlink);
var vreplace = '<p>' + rlink + '</p>';
var repwith = '<p><a href="' + rlink + '" target = "_blank">' + rlink + '</a></p>';
var parse = parse.replace(vreplace,repwith);

} // end link loop


var linkCount = parse.split('<br />\nhttp://').length-1;
// linkCount = 1;
for (hti=1;hti<=linkCount;hti++)
{

begPos = parse.indexOf('<br />\nhttp://');
var slice = parse.substr(begPos+7);
endPos = slice.indexOf('</p>');
var rlink = slice.substring(0,endPos);
// alert (rlink);
var vreplace = '<br />\n' + rlink + '</p>';
var repwith = '<p><a href="' + rlink + '" target = "_blank">' + rlink + '</a></p>';
var parse = parse.replace(vreplace,repwith);

} 





// newBody = newBody + '<hr>' + postname + '<hr><xmp>' + '---------------------------------------- </xmp><br>' + '<xmp>' + aidWrite + '</xmp>';

} // end if moveName = yes


newBody = start + extraStyle + parse + end;
if (parse=="") {
newBody = backupBody;
}



// newBody = doFormatting(newBody);


// var newBody = '<hr> Count of Badness: ' + badCount;
//var newBody = '<xmp>' + stitch2;

newBody = newBody.replace('http://voices.washingtonpost.com/plum-line%20','http://voices.washingtonpost.com/plum-line/');
newBody = newBody.replace('<textarea name="text"','<textarea name="text" style="font-family:arial,helvetica;font-size:12px;" ');


var clearButton = '&nbsp;</a><a href="' + newUrl + '?troll=Clear+Out+Trolls" style="text-decoration:none;"><button style="font-size:' + smallfont + ';border:1px solid black;">Clear Troll List</button></a>';
var clearButton2 = '&nbsp;</a><a href="' + newUrl + '?favorite=Clear+Out+Favorites" style="text-decoration:none;"><button style="font-size:' + smallfont + ';border:1px solid black;">Clear Favorite List</button></a>';
var bottom_menu = '<!-- BOTTOM TOOLBAR --><table width="100%" cellpadding="3px" cellspacing="3px" bgcolor="#DFDFDF"><tr><td width="100%" bgcolor="#EFEFEF"><font size=2>Comments Removed: <b>' + comRemCount + '</b> | ' + clearButton + '&nbsp;' + clearButton2 + '</font></td></tr></table>';

var newBody = newBody.replace('<!-- BOTTOM TOOLBAR -->',bottom_menu);
// | ComCount: ' + printComCount + '

document.body.innerHTML = newBody;


}





		 function deleteArray(arr, obj) {
		  for(var i=0; i<arr.length; i++) {
		  
			if (arr[i] == obj) {
			arr.splice(i,1);
			}
		  }
		  return arr;
		}

		function trim(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		}


		function doFormatting(fparse) {
		
		if (formatting=="yes") {
		
		//do italic
		var itaCount = fparse.split('__').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('__');
		var slice = fparse.substr(begPos+2);
		endPos = slice.indexOf('__');
		var rlink = slice.substring(0,endPos);
		 //alert (rlink);
		var vreplace = '__' + rlink + '__';
		var repwith = '<u>' + rlink + '</u>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end bold loop
		
			//do italic
		var itaCount = fparse.split('•').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('•');
		var slice = fparse.substr(begPos+1);
		endPos = slice.indexOf('•');
		var rlink = slice.substring(0,endPos);
		 // alert (rlink);
		var vreplace ='•' + rlink + '•';
		var repwith = '<i>' + rlink + '</i>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end italic loop
		
		
		
		var itaCount = fparse.split('|hi:').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('|hi:');
		var slice = fparse.substr(begPos+4);
		endPos = slice.indexOf('|');
		var rlink = slice.substring(0,endPos);
		 // alert (rlink);
		var vreplace ='|hi:' + rlink + '|';
		var repwith = '<span style="background-color:#FFFF99">' + rlink + '</span>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end italic loop
		
				var itaCount = fparse.split('|red:').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('|red:');
		var slice = fparse.substr(begPos+5);
		endPos = slice.indexOf('|');
		var rlink = slice.substring(0,endPos);
		 // alert (rlink);
		var vreplace ='|red:' + rlink + '|';
		var repwith = '<span style="color:red">' + rlink + '</span>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end italic loop
		
		
		
		// embed image
		
				//do images
		var itaCount = fparse.split('img:').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('|img:');
		var slice = fparse.substr(begPos+5);
		endPos = slice.indexOf('|');
		var rlink = slice.substring(0,endPos);
		//alert (rlink);
		var vreplace = '|img:' + rlink + '|';
		var repwith = '<img src="'+ rlink + '" width="450">';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end images loop
		
		// horizontal rule loop
		var itaCount = fparse.split('|hr|').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		var fparse = fparse.replace('|hr|','<hr>');
		
		} // end horizontal rule loop
	
		//do strikethru
		var itaCount = fparse.split('––').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('––');
		var slice = fparse.substr(begPos+2);
		endPos = slice.indexOf('––');
		var rlink = slice.substring(0,endPos);
		 //alert (rlink);
		var vreplace = '––' + rlink + '––';
		var repwith = '<del>' + rlink + '</del>';
		var testdash = rlink.split('––').length-1;
		if (rlink=='') {
		testdash = 1;
		}
		if (testdash==0) {
		var fparse = fparse.replace(vreplace,repwith);
		}
		
		} // end strikethru loop
	
	
		
		//do bold
		var itaCount = fparse.split('**').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('**');
		var slice = fparse.substr(begPos+2);
		endPos = slice.indexOf('**');
		var rlink = slice.substring(0,endPos);
		//alert (rlink);
		var vreplace = '**' + rlink + '**';
		var repwith = '<b>' + rlink + '</b>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end bold loop
		
		//do blockquote 
		var itaCount = fparse.split('""').length-1;
		//itaCount = 1;
		for (iti=1;iti<=itaCount;iti++)
		{
		
		begPos = fparse.indexOf('""');
		var slice = fparse.substr(begPos+2);
		endPos = slice.indexOf('""');
		var rlink = slice.substring(0,endPos);
		 // alert (rlink);
		var vreplace = '""' + rlink + '""';
		var repwith = '</p><blockquote style="font-color:gray;color:black;border:2px solid #CFCFCF;background-color:#EFEFEF;font-size:12px;"><p>' + rlink + '</blockquote><p>';
		var fparse = fparse.replace(vreplace,repwith);
		
		} // end blockquote loop
		
		}
		return fparse;
		} // end function definition

