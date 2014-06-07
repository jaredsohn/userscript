// ==UserScript==
// @name           Vendi Basecamp Milestone Modifer
// @description    Automatically highlite currently logged in user's milestones
// @namespace      http://namespaces.vendiadvertising.com/basecamp-modifier
// @include        https://*.basecamphq.com/*
// ==/UserScript==

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

//Code milestone highlighting
var myName = document.getElementById('settings_signout_and_help').getElementsByTagName('span')[0].childNodes[0].nodeValue.trim();

var lis = document.getElementsByTagName('li');
var match;
var exp  = /.*?\[(.*?)\|(.*?)\|(.*?)\].*/;
var exp2 = /^(.*?)\|(.*?)\|(.*?)$/;
for(var i=0; i<lis.length; i++){
	if(lis[i].getAttribute('record') && lis[i].getAttribute('record').match(/milestone_\d+/)){
		match = null;
		if(lis[i].getElementsByTagName('strong').length==1){
			match = exp.exec(lis[i].innerHTML);
		}else if(lis[i].getElementsByTagName('a').length==1){
			match = exp2.exec(lis[i].getElementsByTagName('a')[0].getAttribute('title'));
		}
		if(match && match[3].trim() == myName){
			lis[i].style.backgroundColor = '#FFDDDD';
		}
	}
}

var shortName = Namify(myName);

var trs = document.getElementsByTagName('tr');
var tds;
for(var i=0; i<trs.length; i++){
	if(trs[i].className && trs[i].className.match(/row\d/)){
		tds = trs[i].getElementsByTagName('td');
		if(tds){
			for(var j=0; j<tds.length; j++){
				if(tds[j].className && tds[j].className.indexOf('name')>=0 && tds[j].innerHTML == shortName){
					trs[i].style.backgroundColor = '#FFDDDD';
				}
			}
		}
	}
}

if(document.getElementById('more_late_milestones')){
	document.getElementById('more_late_milestones').style.display = 'block';
}
if(document.getElementById('link_to_show_more_late_milestones')){
	document.getElementById('link_to_show_more_late_milestones').style.display = 'none';
}

function Namify(name){
	if(name.indexOf(' ')<0) return name;
	return name.substr(0, name.indexOf(' ')+2) + '.';
}