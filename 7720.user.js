// ==UserScript==
// @name           Facebook - Go to Post/Page
// @namespace      http://www.facebook.com
// @description    Provides search box to go to any post of discussion boards and any page of search results and lists of items such as walls, photos, and notes. Updated for new Facebook layout.
// @author         Alan Kelly
// @version        2.0.1
// @include        *facebook.com/topic.php*
// @include        *facebook.com/wall.php*
// @include        *facebook.com/s.php?*
// @include        *facebook.com/friends.php*
// @include        *facebook.com/coworker.php?*
// @include        *facebook.com/classmate.php?*
// @include        *facebook.com/board.php*
// @include        *facebook.com/photo_search.php?*view*
// @include        *facebook.com/notes.php*
// ==/UserScript==

/*
Copyright (C) 2007 by Alan Kelly.
Contact: alan@swampmedia.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/


// declare parameters
	var prompt = 'Page';
	var boxsize = '4';
	var boxlen = '6';
	var type = '';

	
// detect specific page
	detectPage();

	
// create elements
	var div = document.createElement('div');
	div.setAttribute('style', 'width:636px;text-align: right; border-top: 1px solid #CCCCCC; padding: 5px; font-weight: bold; background-color: #F7F7F7; color: #000000; font-size: 11px;');
	div.setAttribute('class', 'quail');
	div.setAttribute('id', 'gm_postfinder');

	var num = document.createElement('input');
	num.setAttribute('type', 'text');
	num.setAttribute('class', 'inputtext inputsearch');
	num.setAttribute('size', boxsize);
	num.setAttribute('maxlength', boxlen);
	num.setAttribute('id', 'gm_postnum');
	num.setAttribute('value', prompt+' #');
	num.setAttribute('style', 'margin-right: 5px; font-weight: normal; border-color: #95a5c6; color: #777777');

	var cont = document.createTextNode(' ');
	var space = document.createTextNode(' ');

	var but = document.createElement('input');
	but.setAttribute('type', 'button');
	but.setAttribute('class', 'inputbutton');
	but.setAttribute('value', 'Go');
	but.setAttribute('id', 'gm_postbut');
	but.setAttribute('style', 'margin-right: 18px; font-weight: normal');
	
// create toolbar
function init() {
	document.getElementById('content').appendChild(div);
	document.getElementById('gm_postfinder').appendChild(cont);	
	document.getElementById('gm_postfinder').appendChild(num);
	document.getElementById('gm_postfinder').appendChild(but);
	
	document.getElementById('gm_postnum').addEventListener('focus',cleardir,false);
	document.getElementById('gm_postnum').addEventListener('blur',showdir,false);
	document.getElementById('gm_postnum').addEventListener('keyup',onreturn,false);
	document.getElementById('gm_postbut').addEventListener('click',findpost,false);
}


// detect page
function detectPage() {
	var url = location.href;
	
	u = url.split("?");
	n = u[0].split("/");
	t = n[3];

	type = t;
	if (t == "topic.php") { prompt = 'Post'; }
	if (t == "s.php" || t == 'coworker.php' || t == 'classmate.php') { type = "search"; }
}


// validate input and redirect to specified post/page
function findpost() {
	var pnum = document.getElementById('gm_postnum').value;
	
	if (pnum=="") return;
	if (pnum==" ") { document.getElementById('gm_postnum').value = ""; return; }
	
	var numtest = /^[\+\-]?\d*$/;
	
	if(!numtest.test(pnum) || pnum<=0) {
		document.getElementById('gm_postfinder').firstChild.nodeValue = "Enter Valid Number ";
		document.getElementById('gm_postfinder').style.backgroundColor = '#ffebe8';
		document.getElementById('gm_postfinder').style.borderColor = '#dd3c10';
	
		var nums = pnum.split('');
		var newln = "";
		if (pnum != 0)
			for (i=0; i<nums.length; i++)
				if (numtest.test(nums[i])) newln += nums[i];
		document.getElementById('gm_postnum').value = newln;
		return;
	}
	
	document.getElementById('gm_postbut').disabled=true;
	var url = location.href;
	
	if (type == 'topic.php') {
		var digits = pnum.split('');
		num = '';
		if (digits[digits.length-1] == 0) {
			num = pnum-10;
		}
		else {
			for (i=0;i<(digits.length-1);i++) num +=digits[i];
			num += "0";
		}
	
		top = url.split('&');
		newloc = top[0]+"&"+top[1]+"&start="+num;
		location.href = newloc;
	}
	
	if (type == 'search') {		
		if (pnum == 1) num = '0';
		else { num = (pnum-1) + '0'; }

		top = url.split('&s=');
		newloc = top[0]+"&s="+num;
		location.href = newloc;
	}

	if (type == 'friends.php') {		
		top = url.split('&p=');
		newloc = top[0]+"&p="+(pnum-1);
		location.href = newloc;
	}
	
	if (type == 'notes.php') {		
		if (pnum == 1) num = '0';
		else { num = (pnum-1) + '0'; }

		top = url.split('&start=');
		newloc = top[0]+"&start="+num;
		location.href = newloc;
	}
	
	if (type == 'board.php') {		
		if (pnum == 1) num = '0';
		else { num = Math.round((pnum-1)*30); }

		top = url.split('&start=');
		newloc = top[0]+"&start="+num;
		location.href = newloc;
	}
	
	if (type == 'photo_search.php') {
		top = url.split('&page=');
		newloc = top[0]+"&page="+pnum;
		location.href = newloc;
	}
	
	if (type == 'wall.php') {
		top = url.split('&page=');
		newloc = top[0]+"&page="+(pnum-1);
		location.href = newloc;
	}
}


// Allow script to be called when Enter key is pressed
function onreturn(e) {
	if (e.which==13) findpost();
}


// set and clear the prompt
function cleardir() {
	dir = document.getElementById('gm_postnum');
	if (dir.value==(prompt+' #')) {
		dir.value = '';
		dir.style.color = '#000000';
	}
}

function showdir() {
	dir = document.getElementById('gm_postnum');
	if (dir.value=='') {
		dir.value = prompt+' #';
		dir.style.color = '#777777';
	}
}


// prevent errors
var tq1 = location.href.split("/");
var tq2 = tq1[3];

if (tq2=="wall.php" || tq2=="friends.php")
	location.href = "http://"+tq1[2]+"/"+tq2+"?";


// initialize
init();
