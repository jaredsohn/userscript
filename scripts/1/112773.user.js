// ==UserScript==
// @name AreaLV
// @namespace AreaLV
// @include *.sangokushi.in.th/*
// ==/UserScript==

// created by xun
// areaLv version 1.0 2011-03-20

/******************************* Code Area LV *********************************/
function arealv() {
var picNum = [ 
"http://image.ohozaa.com/i/0de/80j01.png",
"http://image.ohozaa.com/i/eb5/deg02.png",
"http://image.ohozaa.com/i/f19/8uz03.png",
"http://image.ohozaa.com/i/838/cch04.png",
"http://image.ohozaa.com/i/207/19605.png",
"http://image.ohozaa.com/i/850/hlu06.png",
"http://image.ohozaa.com/i/86e/gsq07.png",
"http://image.ohozaa.com/i/d19/re608.png",
"http://image.ohozaa.com/i/8dd/wlq09.png",
];
var areas = document.getElementsByTagName('area');
var maxArea = areas.length;
var areaMinStar = 1;
var areaGetMoreStar = false;
var areaTaken = 0; // 0=all 1=free 2=taken
var arealv;
var areatmp ='';
for(var i =0; i<maxArea; i++){
if(areas[i].title.split(' ').length==2)	 //free area
{
arealv = areas[i].getAttribute('onmouseover').split("/img/common/star_warpower_b.gif").length -1;
if(i<9)areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll0'+(i+1)+'" alt="">';else areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll'+(i+1)+'" alt="">';
}
}
document.getElementById("mapsAll").innerHTML = areatmp +document.getElementById("mapsAll").innerHTML;
}
/******************* END **********************/
if(window.location.href.match('.sangokushi.in.th/map.php'))arealv();
