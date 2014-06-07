// ==UserScript==
// @name           ETI Zebra Tables
// @namespace      pendevin
// @description    Makes lines in link/topic etc. lists alternate colors
// @include        http://endoftheinter.net*
// @include        http://links.endoftheinter.net*
// @include        http://boards.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://endoftheinter.net*
// @include        https://links.endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// ==/UserScript==

//
//  **USER SETTINGS**
//

//When true, the script to choose the colors automatically based on your color scheme
const Auto=true;

//User defined values
//Set Auto to false if you want to use custom colors
const AlternateRowColor="#70ADE7";
const BorderColor="#DDE3EB";
const BorderVerticalWidth="2px";
const BorderHorizontalWidth="2px";
const MarginVerticalWidth="0px";
const MarginHorizontalWidth="0px";
const PaddingVerticalWidth="1px";
const PaddingHorizontalWidth="3px"

//
//	**END USER SETTINGS**
//

var altRow=AlternateRowColor;
var border=BorderColor;
if(Auto&&document.getElementsByClassName("grid")[0]){
	//Converts an RGB color value to HSV. Conversion formula
	//adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	//Assumes r, g, and b are contained in the set [0, 255] and
	//returns hin the set [0, 360] and, s and v in the set [0, 1].
	function rgbToHsl(r,g,b){
		r/=255, g/=255, b/=255;
		var max=Math.max(r,g,b), min=Math.min(r,g,b);
		var h, s, l=(max+min)/2;
		if(max==min)
			h=s=0; // achromatic
		else{
			var d=max-min;
			s=l>0.5?d/(2-max-min):d/(max+min);
			if(max==r)
				h=(g-b)/d+(g<b?6:0);
			else if(max==g)
				h=(b-r)/d+2;
			else if(max==b)
				h=(r-g)/d+4;
			h/=6;
		}
		return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
	}

	border=window.getComputedStyle(document.body).getPropertyValue("background-color");
	altRow=window.getComputedStyle(document.getElementsByClassName("grid")[0].getElementsByTagName("td")[0]).getPropertyValue("background-color");
	altRow=altRow.match(/\((\d+), (\d+), (\d+)\)/);
	altRow.shift();
	altRow=rgbToHsl(parseInt(altRow[0],10),parseInt(altRow[1],10),parseInt(altRow[2],10));
	altRow[2]=altRow[2]<50?altRow[2]+20:altRow[2]-20;
	altRow="hsl("+altRow[0]+","+altRow[1]+"%,"+altRow[2]+"%)"
}

var css="\
		table.grid>tbody>tr:nth-child(odd)>td{background-color:"+altRow+"!important;}\
		table.grid>tbody>tr>td,table.grid>tbody>tr>th{border-color:"+border+"!important;border-width:"+BorderVerticalWidth+" "+BorderHorizontalWidth+"!important;\
			margin:"+MarginVerticalWidth+" "+MarginHorizontalWidth+"!important;padding:"+PaddingVerticalWidth+" "+PaddingHorizontalWidth+"!important;}\
		.center{text-align:center!important;}";
GM_addStyle(css);

