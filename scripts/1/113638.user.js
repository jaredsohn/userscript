// ==UserScript==
// @name           Poker Skill Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var TEAMER = [];
var DONKER = [];
var LEGEND = [];
var AMATEUR = [];

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

function resolveBettorType(name){
	var i;
		
	
	for(i=0;i<TEAMER.length;i++){
		if(name == TEAMER[i]){
			return 'teamer';
		}
	}
	
	for(i=0;i<DONKER.length;i++){
		if(name == DONKER[i]){
			return 'donker';
		}
	}
	
	for(i=0;i<LEGEND.length;i++){
		if(name == LEGEND[i]){
			return 'legend';
		}
	}

	for(i=0;i<AMATEUR.length;i++){
		if(name == AMATEUR[i]){
			return 'amateur';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/forum.php?f=104"' +
 ' title="Bar and Pub Games" target="_blank">Skill Status</a>: ';
switch(resolveBettorType(user)){
 case 'legend':
  holder.innerHTML += '<font color="aqua"><b>Legend</b></font>';
  break;
 case 'amateur':
  holder.innerHTML += '<font color="orange"><b>Amateur</b></font>';
  break;
 case 'teamer':
  holder.innerHTML += '<font color="green"><b>Teamer</b></font>';
  break;
 case 'donker':
  holder.innerHTML += '<font color="red"><b>Donker</b></font>';
  break;
case 'unknown':
 holder.innerHTML += '<font color="gray"><b>Unknown</b></font>';
 break;
}

var beforeEle = div.getElementsByTagName('DIV')[0];
div.insertBefore(holder,beforeEle);
div.insertBefore(br,beforeEle);
};

function doThePage(){
	var divs = getElementsByClassName('bc1',document);
	var names = document.getElementsByTagName('DT');
	var name,str,nameOffset,divOffset;
	nameOffset = 0;
	divOffset = 0;
	
	for(var i=0;i<divs.length;i++){
		if(names[i + nameOffset].innerHTML == 'User Poll'){
			nameOffset++;
		}
		
		if(window.location.href.indexOf('pm.php?') > 0){
			nameOffset = 2;
			divOffset = divs.length - 1;
		}
		
		if(window.location.href.indexOf('index.php?act=Post&c') > 0){
			nameOffset = 1;
		}
		
		str = names[i + nameOffset].firstChild;

		if(str.innerHTML.indexOf('<') == 0){
			str = str.firstChild;
		}
		
		str = str.innerHTML;
		
		var idx = str.indexOf('<');
		if(idx != -1){
			name = str.substring(0,idx)
		}else{
			name = str;
		}
		
		name = name.replace(/ /gi,'');
		
		createHTML(divs[i + divOffset],name.toUpperCase());
		
		if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0){
			break;
		}
	}
};

function getNames(){
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://pokerskilllist.angelfire.com/',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response)
		{
			var str = response.responseText;
			
			var names = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 19,str.indexOf('EnDoFmYBETTORlIsT'));
			eval(names);
			doThePage();
		}
	});

};

getNames();