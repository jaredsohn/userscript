// ==UserScript==
// @name	GallerySkip for Firefox 1.5
// @namespace	http://gotdoof.com/devart/galleryskip
// @description	Adds next/previous buttons to deviation view pages
// @include	http://www.deviantart.com/view/*
// @include	http://www.deviantart.com/deviation/*
// @exclude	http://www.deviantart.com/deviation/*/favourites
// ==/UserScript==

/*    GallerySkip
*     Copyright (C) 2005 Kevin Wallace, portions Matthias Bauer
*     <kevin@doofsmack.com>
* 
*     This program is free software; you can redistribute it and/or modify
*     it under the terms of the GNU General Public License as published by
*     the Free Software Foundation; version 2 of the License
* 
*     This program is distributed in the hope that it will be useful,
*     but WITHOUT ANY WARRANTY; without even the implied warranty of
*     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*     GNU General Public License for more details.
* 
*     You should have received a copy of the GNU General Public License
*     along with this program; if not, write to the Free Software
*     Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
*		2005-11-10 Modified by Henrik Nyh <http://henrik.nyh.se> to work in Fx 1.5.
*/

var thumbs = 5;
var thumbsize = 100;
var bkcolor = "BBC2BB";

var GF = new Array();

var deviationId = (document.location+'').match(/[0-9]+/)[0];

var deviantName = xpSingle("//div[@class='deviation section']/div/p/a").innerHTML;
if(deviationId && deviantName){
	// ORIGINALLY: Adapted from moeffju's slideshow code. Hope you don't mind ;)
	
	// Flatten multiline data for the benefit of regexps
	function flatten(d) {
		return d.replace(/(\r|\r?\n)/g, '');
	}
	
	var s = 'http://' + deviantName + '.deviantart.com/stats/gallery/script.js.php/gallerystats.js';

		GM_xmlhttpRequest({
		method:"GET",
		url:s,
		onload:function(result) {
			
			flatFeed = flatten(result.responseText);
			
			var match, i = 0;
			var re = /title: "(.+?)",\tid: (\d+),\tthumb: "(.+?)",\tdate: .+?",\tresolution: "(\d+)x(\d+)",.+?category: "(.+?)"/g;

			while (match = re.exec(flatFeed)) {  // Iterate through items in feed
				GF[i] = {"title": match[1], "id": match[2], "thumb": match[3], "width": match[4], "height": match[5], "cat": match[6]};
				i++;
			}
			
			checkForGF();
			
		}
		});
	
	initDisplay();
}

function getURL(s) {
	//Again.. adapted from moeffju's slideshow code. Because he is a regex ninja, and I am not.
	if (s.match(/^http:\/\/.*\.deviantart\.com\/\d+\/(.*)\.deviantart\.com/))
		return s.replace(/^http:\/\/.*\.deviantart\.com\/\d+\/(.*)\.deviantart\.com/, 'http://ic1.deviantart.com/$1');
	else
		return s.replace(/^http:\/\/.*\.deviantart\.com\/\d+\//, 'http://images.deviantart.com/');
}

function checkForGF(){
	if(GF){
		document.getElementById('gs-top').innerHTML = "Other deviations by " + deviantName;
		var gfId = -1;
		GF.sort(function(a,b){return (a['id']-b['id']);});
		
		for(var i=0;i<GF.length;i++){
			if(GF[i]['id'] == deviationId) gfId = i;
		}
		if(gfId == -1){
			document.getElementById('gs-top').innerHTML = "Error locating current deviation in GalleryFeed";
		}else{
			var start=(gfId-parseInt(thumbs/2));
			if(start < 0) start = 0;
			if(start+thumbs > GF.length) start = GF.length - thumbs;
			var gsTr = document.getElementById('gs-thumbs');
			gsTr.style.verticalAlign = "center";
			gsTrLoop(start, start+thumbs, gsTr, IMGFromGFItem);
			
			gsTr = document.getElementById('gs-titles');
			gsTr.style.verticalAlign = "top";
			gsTrLoop(start, start+thumbs, gsTr, TitleFromGFItem);
		}
	}
}

function gsTrLoop(start, end, node, func){
	for(var j=start;j<end;j++){
		var td = document.createElement('td');
		td.innerHTML = func(GF[j]);
		td.style.textAlign = "center";
		td.style.width = parseInt(100 / thumbs) + "%";
		node.appendChild(td);
	}
}

function initDisplay(){
	var authorDiv = xpSingle("//div[@class='author section']");
	var gsDiv = document.createElement('div');
	
	gsDiv.id = "gs-outer";
	gsDiv.className = "section";
	gsDiv.style.marginTop = "-1em";
	gsDiv.innerHTML = '\
		<div class="section-head"><h2 id="gs-top">Loading other deviations by '+deviantName+'...</h2></div>\
		<div class="trailing section-block">\
			<table style="width:100%"><tr id="gs-thumbs"></tr><tr id="gs-titles"></tr></table>\
		</div>\
	';
	
	authorDiv.parentNode.insertBefore(gsDiv, authorDiv);
}

function xpSingle(str){
	return document.evaluate(str, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function IMGFromGFItem(item){

	var w = item['width'];
	var h = item['height'];

	var small = (w<thumbsize && h<thumbsize);

	if(small)
		var url = getURL(item['id']);
	else{
		if((w/h) > 1){
			h = parseInt(h / (w / thumbsize));
			w = thumbsize;
		}else{
			w = parseInt(w / (h / thumbsize));
			h = thumbsize;
		}
		var url = item['thumb'].replace(/deviantart\.com\/\d+/, 'deviantart.com/'+thumbsize);
	}
	

	var out = '<a href="/view/'+item['id']+'/"><img src="'+url+'" width="'+w+'" height="'+h+'" /></a>';
	if(!small){
		out = '<span class="shadow-holder"><span class="shadow" style="background-image:url(http://sh.deviantart.com/shadow/'+bkcolor+'-000000/5.1-0.6/'+w+'/'+h+'/null.png);">'+out+'</span></span>';
	}
	return out;
}

function TitleFromGFItem(item){
	return '<a href="/view/'+item['id']+'/">'+item['title']+'</a><br /><sup>'+item['cat']+'</sup>';
}
