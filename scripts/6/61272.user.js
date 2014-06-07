// Author: Xiao.L ( http://twitter.com/xiaoliulx )

// ==UserScript==
// @name           VeryCD Movie HighLighter
// @namespace      xiaol.org
// @description    Highlights Movie Entries on VeryCD's Movie Page according to IMDb Score intervals defined by the user.
// @include        http://www.verycd.com/sto/movie/*
// @include        http://verycd.com/sto/movie/*
// @version        0.1 (05-Nov-2009)
// ==/UserScript==

// --------------------------------------------------------------------
// DISCLAIMER
// ----------
// Please note that this script is provided free of charge and comes with no warranty, any usage of this script is at your own risk
//
// ------------
// INSTALLATION
// ------------
// This is a Greasemonkey User Script. 
// 
// To install it, you need:
//     FireFox  (http://www.mozilla.org/firefox)
//     FireFox Extension - Greasemonkey (https://addons.mozilla.org/en-US/firefox/addon/748)
//
//   Install the Greasemonkey extension then restart Firefox and revisit this script.
//   Under Tools, there will be a new menu item to "Install User Script".
//   Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "VeryCD Movie HighLighter", and click Uninstall.
//
// -----
// USAGE
// -----
// After installing the script, the Movie Entries on VeryCD's Movie Page will be Highlighted whenever you visit the pages.
//   (Press [ Ctrl + Alt + t] to turn off the highlights.)
//
// While you are on script related page:
//     [ Ctrl + Alt + t ]: Press to Toggle the highlights on the page.
//     [ Ctrl + Alt + h ]: Press to Show/Hide a box of Legends of on the lower right of the page indicating 
//                         the highlight colors of your predefined rating intervals.
//
// Preference Configurations:
//   script user can further configure the script by changing the values below (within PREFS Object).
//
//   PREFS.autoload  : true|false (controls whether the related page is auto highlighted when first loaded)
//   PREFS.intervals : [ [ LowerEndPoint, HigherEndPoind, #HexColor ], ...] 
//                     the IMDb Rating Interval is a Left-Open, Right-Closed Interval (Lower, Higher]
//                     the Highlight Color accepts CSS compatible Colors.
//   NOTE            : it is recommended that intervals to be Separate. 
//                     the lower interval highlight within the interval array would apply to the result page among Overlapping intervals.

// Preference Settings 
var PREFS={
			'autoload':true,
			'intervals':[
				// Don't forget the Ending Period After changing the array.
					[ 0, 5 , '#D0DDFE'],
					[ 5, 6.5, '#F7C5AD'],
					[ 6.5, 7.5, '#C7FFB1'],
					[ 7.5, 10, '#EBA2CB']
			]
};



function VMH_addStyleSheet(css) {
	var stylesheet=document.createElement('style');
	stylesheet.type='text/css';
	stylesheet.innerHTML=css;
	document.getElementsByTagName("head")[0].appendChild(stylesheet);
}

function VMH_composeTable(prefarray){
	var tablestr='<table><tbody><tr><td>Rating Highlights</td></tr>'
	for (item in prefarray){
		tablestr=tablestr+'<tr><td class=\"vmh_scores\" style=\"background-color:'+prefarray[item][2]+'\">( '+prefarray[item][0]+' , '+prefarray[item][1]+' ]</td>'+'</tr>';		
	}
	return (tablestr+'</table></tbody>');
}

function VMH_applyColors(entryObject, rating){
	var bgcolor;
	var intervals=PREFS.intervals;
	for(itvl in intervals){
		if (intervals[itvl].length!=3){
			GM_log('Malformed data encountered Please Check your PREF Settings');
			continue;
		}
		if((rating>=intervals[itvl][0])&&(rating<intervals[itvl][1]))
			bgcolor=intervals[itvl][2];
	}
	entryObject.style.backgroundColor=bgcolor;
	entryObject.style.borderTop='1px solid #ADADAD';
}

function VMH_highLightItems(){
	var regPattern=/.*imdb:\s*([\d.]+)\/10\s*\(([\d,]+)\svotes\).*/i;
	var taggedlis=document.getElementsByClassName('vmh_tagged');
	if(!taggedlis[0]){
		var entries=document.getElementsByClassName("topic-list")[0].getElementsByTagName('li');
		for(var entry_index in entries){
			var movie_item=entries[entry_index];
			if(!movie_item.hasAttributes()){
				ratings=movie_item.getElementsByClassName("blog_entry")[0].textContent.match(regPattern);
				if(ratings!=null){
					VMH_applyColors(movie_item,ratings[1]);
					movie_item.setAttribute('class','vmh_tagged');
				}
			}
		}
	}
	else{
		if(taggedlis[0].hasAttribute('style')){
			for(item in taggedlis){
				taggedlis[item].removeAttribute('style');
			}
		}
		else{
			for(item in taggedlis){
				ratings=taggedlis[item].getElementsByClassName("blog_entry")[0].textContent.match(regPattern);
				if(ratings!=null){
					VMH_applyColors(taggedlis[item],ratings[1]);
				}
			}
		}
	}
}

function VMH_legendBox(){
	var lbox=document.getElementById('vmh_lbox');
	if(!lbox){
		VMH_addStyleSheet('#vmh_lbox{position:fixed;bottom:2%;right:7%;z-index:100;background:#F1F1F1;font-size:9pt;text-align:left;padding:5px 15px 8px 15px;border:1px solid #C1C1C1;border-left:1px solid #D50006;color:#262626;}#vmh_lbox td{padding:2px 3px;text-align:center;} .vmh_scores{font-weight:bold;border:1px solid #FFF;}.vmh_highlights{border:1px solid #FFF;}');
		lbox=document.createElement('div');
		lbox.setAttribute('id','vmh_lbox');
		lbox.innerHTML=VMH_composeTable(PREFS.intervals);
		lbox.style.display='block';
		document.body.insertBefore(lbox,document.body.firstChild);
	}
	else{
		if(lbox.style.display=='block')
			lbox.style.display='none';
		else
			lbox.style.display='block';
	}
}

function VMH_keyHandler(e) {
	if (e.ctrlKey && e.altKey && String.fromCharCode(e.charCode) == 'h') {
		VMH_legendBox();
	}
	if (e.ctrlKey && e.altKey && String.fromCharCode(e.charCode) == 't'){
		VMH_highLightItems();
	}
}

document.addEventListener('keypress', VMH_keyHandler, false);

if(PREFS.autoload){
	VMH_highLightItems();
}
