/*
Redirect Binnews (c) Yubse.com 2011

Find more here : http://www.yubse.com
Plus d'info ici : http://www.yubse.com

Find support for 'Redirect Binnews' on our website : www.yubse.com
Si vous avez besoin d'aide sur 'Redirect Binnews' vous pouvez nous contacter via notre site : www.yubse.com

********* LICENSE*********

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


********* METADATA *********
// ==UserScript==
// @name           Redirect Binnews
// @namespace      www.yubse.com
// @description    Cette extension facilite la recherche de posts et permet de générer les fichiers nzb depuis les fichiers référencés sur binnewz. Un lien est ajouté sur chaque nom de fichier sur le site www.binnews.in. Cette extension vous est proposée par Yubse.com.

This extension adds link on each binnews files referenced and makes downloading easier. Download nzb from newsgroups search engine sites like yubse.com or binsearch
					
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include	http://www.binnews.in/*
// @include	http://binnews.in/*
// @version		1.1
// ==/UserScript==

*********CHANGELOG*********


********* SCRIPT **********
/* custom styles for tr and td */
var sty = document.styleSheets[document.styleSheets.length - 1];
sty.insertRule("tr.searchLnkR td.searchLnkL div.binLnks {display:inline; visibility:hidden; white-space:nowrap; font-weight:bold;}", 0);
sty.insertRule("tr.searchLnkR:hover td.searchLnkL div.binLnks {visibility:visible;}", 0);
sty.insertRule("tr.searchLnkR td.searchLnkL a.binLnk{display:inline; outline:none; position:relative; padding:1px; font-weight:bold; vertical-align:middle;}", 0);
sty.insertRule("tr.searchLnkR td.searchLnkL a.binLnk img {border:0; vertical-align:middle;}", 0);
/*sty.insertRule("tr.searchLnkR td.searchLnkL a.binLnk span {display:none; position:absolute; white-space:nowrap; padding:2px; left:20px; top:-25px; z-index:999; color:#000; background:#FFFFAA; border:1px solid #000; font-weight:normal}", 0);*/
sty.insertRule("tr.searchLnkR td.searchLnkL a.binLnk:hover span {display:block}", 0);

/* default style for link */	
var defaultStyles = {
	color : '#F5F5F5',
	backgroundColor : 'black',
	textDecoration : 'underline',
	padding:'2px 5px'
}

function addlink(elm, str, label, title, url, styles) {
	var div = elm.getElementsByTagName('div');
	if (div.length>0) {
		div = div[0];
		if (!div.className.match(/\bbinLnks/i)) {
			div = null;
		}
	}
	
	if (!div || div.length==0) {
		elm.innerHTML = "";
		elm.parentNode.className+= ' searchLnkR';
		elm.className+= ' searchLnkL';
		elm.innerHTML = str;
		div = elm.appendChild(document.createElement('div'));
		div.className = 'binLnks';
	}
	
	//custom style
	styles = styles || {};
	for (var i in defaultStyles) {
		if (!styles[i]) {
			styles[i] = defaultStyles[i];
		};
	}
	
	div.appendChild(document.createTextNode(' ')); 
	var a = document.createElement('a');
	a.target = '_blank';
	a.innerHTML = label;
	a.textContent = label;
	// add custom styles
	for (var i in styles) { 
			a.style[i] = styles[i];
	}
	var str = escape(str);
	
	a.className = 'binLnk';
	a.href = url.replace(/\$\$STR\$\$/g,str);
	a.title = title;
	
	div.appendChild(a);

}


//get index column for the file name
var col = 0;
var SearchColumn = "Fichier";
var isTabList = false;

col = $("#table_results tr th:contains('" + SearchColumn + "')").index()+1;

if (col == 0){
	isTabList = true;
	col = $("#tabliste tr th:contains('" + SearchColumn + "')").index()+1;
}



if (isTabList){
	$('#tabliste td:nth-child(' +  col +  ')').each(function(index){
			var binName = $(this).text();
			if (binName.trim().length>0){		
				addlink(this, binName, 'YUBSE', 'YUBSE your usenet binaries search engine', 'http://www.yubse.com/?group=&minage=&age=&min=min&max=max&q=$$STR$$', {backgroundColor:'orange', color:'#000',padding:'2px 5px'});
				addlink(this, binName , 'BS', 'binSearch', 'http://binsearch.info/?max=250&adv_age=&server=&q=$$STR$$');
				addlink(this, binName, 'BSO', 'binSearch Other groups', 'http://binsearch.info/?max=250&adv_age=&server=2&q=$$STR$$');
			}
		});
}
else
{
	$('#table_results td:nth-child(' +  col +  ')').each(function(index){
			var binName = $(this).text();
			if (binName.trim().length>0){		
				addlink(this, binName, 'YUBSE', 'YUBSE your usenet binaries search engine', 'http://www.yubse.com/?group=&minage=&age=&min=min&max=max&q=$$STR$$', {backgroundColor:'orange', color:'#000',padding:'2px 5px'});
				addlink(this, binName , 'BS', 'binSearch', 'http://binsearch.info/?max=250&adv_age=&server=&q=$$STR$$');
				addlink(this, binName, 'BSO', 'binSearch Other groups', 'http://binsearch.info/?max=250&adv_age=&server=2&q=$$STR$$');
			}
	});
	
}



