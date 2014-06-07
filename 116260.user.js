// ==UserScript==
// @version 0.9.1
// @name GMT Target Finder
// @author Mortificant
// @namespace http://userscripts.org/scripts/source/47845
// @description Directions to target for GMTBC on Urban Dead - slightly modified by Lottuk
// @include http://*urbandead.com/*.cgi*
// ==/UserScript==



/*
   Including the copyright from some of the contained co_ordinates code.
   All code is under GPL.

   Copyright 2005 Sebastian Wiers - swiers@gmail.com

   This is distributed under the terms of the GPL.
   http://www.gnu.org/licenses/gpl.txt

*/

//DETERMINE CO_ORDINATES

blocksXY=[];
blocks=document.getElementsByName('v');
Xsum=0;
Ysum=0;

for (var i=0; i<blocks.length; i++){
    blocksXY[i]=blocks[i].value.match(/(\d\d?\d?)-(\d\d?\d?)/);
    Xsum+=parseInt(blocksXY[i][1]);
    Ysum+=parseInt(blocksXY[i][2]);
}

xLoc=parseInt(Xsum/blocksXY.length); yLoc=parseInt(Ysum/blocksXY.length);
if(xLoc<1){xLoc=0;}
if(yLoc<1){yLoc=0;}
if(xLoc>98 && xLoc<99){xLoc=99;}
if(yLoc>98  && yLoc<99){yLoc=99;}

if (window.location.href.match(/GmtbcTarget=\d+,\d+/)) {
  var results = window.location.href.match(/GmtbcTarget=(\d+),(\d+)/);

  document.cookie = "GmtX=" + results[1];
  document.cookie = "GmtY=" + results[2];
}

// If there are cookies, and in particular our cookies
if ((document.cookie.length>0) && (document.cookie.indexOf("GmtX=") != -1) && (document.cookie.indexOf("GmtX=") != -1)) {

  c_start=document.cookie.indexOf("GmtX=");
  c_start+=5;
  c_end=document.cookie.indexOf(";",c_start);
  if (c_end==-1) c_end=document.cookie.length;
  var xTarget = document.cookie.substring(c_start,c_end);

  c_start=document.cookie.indexOf("GmtY=");
  c_start+=5;
  c_end=document.cookie.indexOf(";",c_start);
  if (c_end==-1) c_end=document.cookie.length;
  var yTarget = document.cookie.substring(c_start,c_end);
   
   // Compare Loc and target, and determine direction
var gmt_rows_obj = document.getElementsByClassName("cp")[0].children[0].children[0].rows;
var gmt_arr_rows = [gmt_rows_obj[1],gmt_rows_obj[2],gmt_rows_obj[3]];
var gmt_dirs = {
	NW : gmt_arr_rows[0].children[0],
	N :  gmt_arr_rows[0].children[1],
	NE : gmt_arr_rows[0].children[2],
	
	W :    gmt_arr_rows[1].children[0],
	HERE : gmt_arr_rows[1].children[1],
	E :    gmt_arr_rows[1].children[2],

	SW : gmt_arr_rows[2].children[0],
	S :  gmt_arr_rows[2].children[1],
	SE : gmt_arr_rows[2].children[2]
}

var gmtWhichWay;
  if (xLoc < xTarget && yLoc < yTarget) {
    gmtWhichWay = gmt_dirs.SE;
  } else if (xLoc < xTarget && yLoc > yTarget) {
    gmtWhichWay = gmt_dirs.NE;
  } else if (xLoc > xTarget && yLoc < yTarget) {
    gmtWhichWay = gmt_dirs.SW;
  } else if (xLoc > xTarget && yLoc > yTarget) {
    gmtWhichWay = gmt_dirs.NW;
  } else if (xLoc == xTarget && yLoc < yTarget) {
    gmtWhichWay = gmt_dirs.S;
  } else if (xLoc == xTarget && yLoc > yTarget) {
    gmtWhichWay = gmt_dirs.N;
  } else if (xLoc < xTarget && yLoc == yTarget) {
    gmtWhichWay = gmt_dirs.E;
  } else if (xLoc > xTarget && yLoc == yTarget) {
    gmtWhichWay = gmt_dirs.W;
  } else {
  // at target
	gmtWhichWay= gmt_dirs.HERE;
  }
  gmtWhichWay.style.border = "5px solid red";   
  document.getElementsByClassName("cp")[0].innerHTML += "<p>"+gmtWhichWayStr+"</p>";
}

