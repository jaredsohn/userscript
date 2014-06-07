// ==UserScript==
// @name           Poker Bettor Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var TRUSTED = [];
var ACTIVE = [];
var REGULAR = [];
var WELCHERPB = [];
var WELCHER = [];
var BLACKLIST = [];
var MED = [];

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
		
	
	for(i=0;i<MED.length;i++){
		if(name == MED[i]){
			return 'med';
		}
	}
	
	for(i=0;i<BLACKLIST.length;i++){
		if(name == BLACKLIST[i]){
			return 'blacklist';
		}
	}
	
	for(i=0;i<TRUSTED.length;i++){
		if(name == TRUSTED[i]){
			return 'trusted';
		}
	}
	
	for(i=0;i<WELCHERPB.length;i++){
		if(name == WELCHERPB[i]){
			return 'welcherpaidback';
		}
	}
	
	for(i=0;i<REGULAR.length;i++){
		if(name == REGULAR[i]){
			return 'regular';
		}
	}
	
	for(i=0;i<WELCHER.length;i++){
		if(name == WELCHER[i]){
			return 'welcher';
		}
	}

	for(i=0;i<ACTIVE.length;i++){
		if(name == ACTIVE[i]){
			return 'active';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/forum.php?f=104"' +
 ' title="Bar and Pub Games" target="_blank">Poker Status</a>: ';
switch(resolveBettorType(user)){
 case 'med':
  holder.innerHTML += '<font color="chartreuse"><b>Mediator</b></font>';
  break;
 case 'welcher':
  holder.innerHTML += '<font color="red"><b>Welcher</b></font>';
  break;
 case 'active':
  holder.innerHTML += '<font color="purple"><b>Active</b></font>';
  break;
 case 'welcherpaidback':
  holder.innerHTML += '<font color="fuchsia"><b>Paid-Back</b></font>';
  break;
 case 'trusted':
  holder.innerHTML += '<font color="blue"><b>Trusted</b></font>';
  break;
 case 'blacklist':
  holder.innerHTML += '<font color="black"><b>Blacklist</b></font>';
  break;
 case 'regular':
  holder.innerHTML += '<font color="orange"><b>Regular</b></font>';
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
	    url: 'http://pokerlist.angelfire.com/',
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