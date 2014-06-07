// ==UserScript==
// @name           Fish Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var SHARK = [];
var ACTIVE = [];
var EATENFISH = [];
var PAIDFORFISH = [];
var NEMO = [];
var KRAKEN = [];
var MAGIKARP = [];

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
		
	
	for(i=0;i<MAGIKARP.length;i++){
		if(name == MAGIKARP[i]){
			return 'magikarp';
		}
	}
	
	for(i=0;i<KRAKEN.length;i++){
		if(name == KRAKEN[i]){
			return 'kraken';
		}
	}
	
	for(i=0;i<SHARK.length;i++){
		if(name == SHARK[i]){
			return 'shark';
		}
	}
	
	for(i=0;i<PAIDFORFISH.length;i++){
		if(name == PAIDFORFISH[i]){
			return 'paidforfish';
		}
	}
	
	for(i=0;i<EATENFISH.length;i++){
		if(name == EATENFISH[i]){
			return 'eatenfish';
		}
	}
	
	for(i=0;i<NEMO.length;i++){
		if(name == NEMO[i]){
			return 'nemo';
		}
	}

	for(i=0;i<ACTIVE.length;i++){
		if(name == ACTIVE[i]){
			return 'active';
		}
	}
	
	return 'probablefish';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/forum.php?f=104"' +
 ' title="Bar and Pub Games" target="_blank">Fish Status</a>: ';
switch(resolveBettorType(user)){
 case 'magikarp':
  holder.innerHTML += '<font color="chartreuse"><b>Magikarp</b></font>';
  break;
 case 'nemo':
  holder.innerHTML += '<font color="red"><b>Nemo</b></font>';
  break;
 case 'active':
  holder.innerHTML += '<font color="purple"><b>Active</b></font>';
  break;
 case 'paidforfish':
  holder.innerHTML += '<font color="fuchsia"><b>Paid-For-Fish</b></font>';
  break;
 case 'Shark':
  holder.innerHTML += '<font color="blue"><b>Shark</b></font>';
  break;
 case 'kraken':
  holder.innerHTML += '<font color="black"><b>Kraken</b></font>';
  break;
 case 'eatenfish':
  holder.innerHTML += '<font color="orange"><b>Eaten Fish</b></font>';
  break;
case 'probablefish':
 holder.innerHTML += '<font color="gray"><b>Probable Fish</b></font>';
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
	    url: 'http://Fishystatus.angelfire.com/',
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