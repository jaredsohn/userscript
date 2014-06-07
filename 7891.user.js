// HockeyArena Team Info
// version 0.5 BETA!
// 2008-07-04
// Copyright (c) 2008, Evan Roth
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HockeyArena Team Info", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HockeyArena Quick Viewer
// @namespace     
// @description   display team or player info when hovering over the team or player name with the mouse
// @include       http://*.hockeyarena.net/*
// @include	  http://*.tennisarena.net/*
// ==/UserScript==


// thanks to quirksmode for this utility function: http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

function onTeamMouseover(e) {
  if (doLog) GM_log('onTeamMouseover: ' + this.innerHTML);
  var url = this.href;

  this.hovering = true;
  var self = this;
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {'User-Agent': 'HockeyArena Greasemonkey Script'},
    onload: function (res) {
    try{
      if (doLog) GM_log('onTeamMouseover: entered callback');
      if (!self.hovering)  { if (doLog) GM_log('onTeamMouseover: !self.hovering');  return; }
      var htmlRes = res.responseText;

      var beginParse = "<table width=\"400\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
      var endParse = "<td colspan=\"2\" align=\"center\" class=\"nice\">"      

      var start = htmlRes.indexOf(beginParse) + beginParse.length;
      var end = htmlRes.indexOf(endParse) -7;
      var output =  "<table cellpadding=0>" + htmlRes.substring(start, end) + "</table>";
      if (doLog) GM_log('onTeamMouseover: output=' + output);
      showDiv(self, output);
    }
    catch(err) { GM_log('onTeamMouseover:Error on page: ' + err.description); }
    },
    data: null
  });
}

function onPlayerMouseover(e) {
  if (doLog) GM_log('onPlayerMouseover: ' + this.innerHTML);
  var url = this.href;

  this.hovering = true;
  var self = this;
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {'User-Agent': 'HockeyArena Greasemonkey Script'},
    onload: function (res) {
    try{
      if (doLog) GM_log('onPlayerMouseover: entered callback');

      if (!self.hovering) {if (doLog) GM_log('onPlayerMouseover: !self.hovering'); return; }
      var htmlRes = res.responseText;

      var beginParse = "<table class='to'>\n <tr>\n  <td class='darkbg1'>";
      var endParse = "<!-- END TABLE STATISTICS -->";
	
      var start = htmlRes.indexOf(beginParse);
      var end = htmlRes.indexOf(endParse);
      var output = htmlRes.substring(start, end);
      if (doLog) GM_log('onPlayerMouseover: output=' + output);
      showDiv(self, output);

      var t = _div.getElementsByTagName("table");
      for (var i=0;i<t.length;i++)
      {
         if (t[i].rows[0].cells[0].className == "tts"){ t[i].rows[0].cells[0].className = "darkbg1"; }
         if (t[i].className == "to"){ t[i].style.width = "400px"; }
      }
    }
    catch(err) { GM_log('onPlayerMouseover:Error on page: ' + err.description); }
    },
    data: null
  });
}

function showDiv(el, content)
{
  var pos = findPos(el);
  pos[0] = pos[0];
  pos[1] = pos[1];

  _div.style.left = (pos[0] + el.offsetWidth + 10) + 'px';
  _div.style.top = pos[1] + 'px';
  _div.innerHTML = content;
  _div.style.display = 'inline';

  if ((_div.offsetHeight + pos[1]) > (window.innerHeight + document.body.scrollTop))  
  {
     if (doLog) GM_log('repositioning window: was below bottom of screen');
     _div.style.top = (window.innerHeight + document.body.scrollTop - _div.offsetHeight - 10) + 'px';
  }
  if ((pos[0] + el.offsetWidth + _div.offsetWidth) > (window.innerWidth - 50))  
  {
     /*if (doLog)*/ GM_log('repositioning window: was off right of screen');
     _div.style.left = (pos[0] - _div.offsetWidth - el.offsetWidth - 10) + 'px';
  }
}

function onObjMouseout(e) {
  this.hovering = false;
  _div.style.display = 'none';
}

var playerLinkRegEx = /public_player_info\.php[\?\&]id=[0-9]+/;
var teamLinkRegEx = /public_team_info_basic\.php[\?\&]team_id\=[0-9]+/;
var discussionURL = /manager_discussion_detail\.php[\?\&]type\=[0-9]+\&mode\=new/;
var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++){
   var link = links[i];   
   if (link.href.match(teamLinkRegEx)){
      if (doLog) GM_log('found team match: ' + link.href);
      link.addEventListener('mouseover', onTeamMouseover, false);
      link.addEventListener('mouseout', onObjMouseout, false);
   }else if (link.href.match(playerLinkRegEx)){
      if (doLog) GM_log('found player match: ' + link.href);
      link.addEventListener('mouseover', onPlayerMouseover, false);
      link.addEventListener('mouseout', onObjMouseout, false);
   }else if (link.href.match(discussionURL)){
      if (doLog) GM_log('found discussion match: ' + link.href);
      link.href = links[i].href.replace(/=new/, "=all");
   }
}

function init_div(){
  if (doLog) GM_log('init_div: begin...');

  var _div = document.createElement('div');
  _div.id = 'greasemonkey_info';
  _div.style.position = 'absolute';
  _div.style.backgroundColor = '#253f69';
  _div.style.border = '1px solid black';
  _div.style.display = 'none';

  document.body.appendChild(_div);  
  if (doLog) GM_log('init_div: _div was appended');
  return _div;
}


var textBoxes = document.getElementsByTagName('textarea');
for(var i=0;i<textBoxes.length;i++){
   if (textBoxes[i].name == "text") textBoxes[i].cols = 100;
}



var doLog = false;
var _div = init_div();