// ==UserScript==
// @name            SU V4 Tag Cloud
// @version	    	0.1
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://*.stumbleupon.com/*
// @license         Who knows
// ==/UserScript==

var navDiv = document.getElementById ('navSecondary');
var tagArray = new Array ();
var tagArrayUns = new Array ();
var maxTag=1;
var tagMode = GM_getValue ('Mode', 0);
var COLS = GM_getValue ('Columns', 4);
if (GM_getValue ('Columns', 0) == 0) {
	GM_setValue ('Columns', 4);
}
GM_log ('Columns: ' + COLS);
if (navDiv) {
	var tagsLi = document.getElementsByClassName ('hasChild')[0];
	var tagsA = tagsLi.childNodes[1];
	var tagsUl = tagsLi.childNodes[3];
	var tagsList = tagsUl.getElementsByTagName ('li');
	
	var i;
	for (i=0; i<tagsList.length; i++) {
		tagArray[i] = new Array (3);
		tagArray[i][0] = tagsList[i].childNodes[1].childNodes[2].textContent.replace(/^\s*/, '').replace(/\s*$/, '');
		tagArray[i][1] = tagsList[i].childNodes[1].childNodes[1].textContent.replace(/^\s*/, '').replace(/\s*$/, '');
		tagArray[i][2] = tagsList[i].childNodes[1].href;
		tagArray[i][0] = tagArray[i][0].replace(/\s/g, '-');
		if (maxTag < Number(tagArray[i][1])) maxTag = Number(tagArray[i][1]);
	}
	
	maxTag = Math.sqrt (maxTag);
	
	GM_log ('Number of tags: ' + tagArray.length);
	tagArrayUns = tagArray.slice();
	tagArray.sort();
	tagsA.addEventListener ('click', displayTagCloud, false);
	tagsA.href = 'javascript:void(0);';
}

function displayTagCloud () {
	GM_setValue ('Mode', tagMode);
	var mainContent = document.getElementsByClassName ('listStumble')[0];
	var pagination = document.getElementsByClassName ('module modulePagination clearfix')[0];
	mainContent.innerHTML = '';
	if (pagination != undefined) {
		pagination.parentNode.removeChild (pagination);
	}
	mainContent.style.textAlign = 'center';
	//mainContent.style.wordSpacing = '1.5em';
	var i;
	var tspan;
	var tlink;
	var tdiv;
	var tnumspan;
	var coldivs = new Array (COLS);
	switch (tagMode) {
	case 0:
		var size;
		for (i=0; i<tagArray.length; i++) {
			tspan = document.createElement('span');
			tlink = document.createElement('a');
			tlink.href = tagArray[i][2];
			tlink.textContent = tagArray[i][0] + ' ';
			size = 3 * (Math.sqrt (Number(tagArray[i][1])) / maxTag) + 1;
			tspan.style.fontSize = size +'em';
			tspan.style.margin = '0px 10px';
			tspan.appendChild (tlink);
			mainContent.appendChild (tspan);
			mainContent.style.margin = '10px 0px';
		}
		break;
	case 1:
		GM_log ('Num tags: ' + tagArray.length);
	
		var currletter = 'a'.charCodeAt(0);
		var currlabel = '#';
		var sectioncount = 0;
		var totalcount = 0;
		var collengths = new Array (COLS);
		var currcol = 0;
		var firstitem;
		
		for (i=0; i<COLS; i++) {
			coldivs[i] = document.createElement ('div');
			coldivs[i].style.width = 100/COLS-2+'%';
			coldivs[i].style.display = 'inline-block';
			coldivs[i].style.paddingLeft = '1%';
			coldivs[i].style.paddingRight = '1%';
			coldivs[i].style.verticalAlign = 'top';
			coldivs[i].style.textAlign = 'left';
		}
		
		for (i=0; i<tagArray.length; i++) {
			if (tagArray[i][0].toLowerCase().charCodeAt(0) >= currletter) {
				while (tagArray[i][0].toLowerCase().charCodeAt(0) > currletter) {
					currletter++;
				}
				currlabel = String.fromCharCode (currletter);
				tspan = document.createElement('span');
				tspan.style.display = 'block';
				tspan.style.borderBottom = 'solid 1px';
				tspan.textContent = currlabel;
				tspan.style.fontSize = '2em';
				coldivs[currcol].appendChild (tspan);
				currletter++;
				totalcount++;
			} 
			
			tspan = document.createElement('span');
			tnumspan = document.createElement('span');
			tlink = document.createElement('a');
			tlink.href = tagArray[i][2];
			tlink.textContent = tagArray[i][0];
			tspan.style.display = 'block';
			tnumspan.textContent = ' (' + tagArray[i][1] + ') ';
			tspan.appendChild (tlink);
			tspan.appendChild (tnumspan);
			coldivs[currcol].appendChild (tspan);
						
			totalcount++;
			if (((tagArrayUns.length + 27) / totalcount) < COLS) {
				currcol++;
				totalcount = 0;
			}
		} 
			
		for (i=0; i<COLS; i++) {
			mainContent.appendChild (coldivs[i]);
		}
		
		mainContent.style.margin = '5px 0px';
				
		break;
	case 2:
		var currcol = 0;
		var totalcount = 0;
		for (i=0; i<COLS; i++) {
			coldivs[i] = document.createElement ('div');
			coldivs[i].style.width = 100/COLS-2+'%';
			coldivs[i].style.display = 'inline-block';
			coldivs[i].style.paddingLeft = '1%';
			coldivs[i].style.paddingRight = '1%';
			coldivs[i].style.verticalAlign = 'top';
			coldivs[i].style.textAlign = 'left';
		}
		for (i=0; i<tagArrayUns.length; i++) {
			tspan = document.createElement('span');
			tnumspan = document.createElement('span');
			tlink = document.createElement('a');
			tlink.href = tagArrayUns[i][2];
			tlink.textContent = tagArrayUns[i][0];
			tspan.style.display = 'block';
			tspan.style.margin = '0px 10px';
			tnumspan.textContent = ' (' + tagArrayUns[i][1] + ') ';
			tspan.appendChild (tlink);
			tspan.appendChild (tnumspan);
			coldivs[currcol].appendChild (tspan);
			
			totalcount++;
			if ((tagArrayUns.length / totalcount) < COLS) {
				currcol++;
				totalcount = 0;
			}
		}
		for (i=0; i<COLS; i++) {
			mainContent.appendChild (coldivs[i]);
		}
		
		mainContent.style.margin = '10px 0px';
		
		break;
	}
	
	tagMode = (tagMode + 1) % 3;
}