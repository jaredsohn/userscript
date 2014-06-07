// ==UserScript==
// @name        RemoveOKCupidAds
// @namespace   gleske.net
// @description This will remove any and all ads from OkCupid.
// @include     *.okcupid.com*
// @version     1.0.1
// ==/UserScript==

/**
 *
 *  Delete using div ids
 *
 **/
var _divid=new Array(),i=0;

//define the ids
_divid[i++]="leaderboard_wrapper";
_divid[i++]="skyscraper_floater_region";
_divid[i++]="skyscraper_floater_region2";
_divid[i++]="criteo_beacon";

for(var j=0;j<_divid.length;j++)
{
  if(document.getElementById(_divid[j]) !== null)
  {
    _y=document.getElementById(_divid[j]);
    _y.parentNode.removeChild(_y);
  }
}

/**
 *
 *  Delete using class names
 *
 **/
var _classnames=new Array(),k=0;

//define the classes
_classnames[k++]="okad";

for(var m=0;m<_classnames.length;m++)
{
  var _elems=document.getElementsByClassName(_classnames[m]);
  for(var j=0;j<_elems.length;j++)
  {
    _elems[j].parentNode.removeChild(_elems[j]);
  }
}