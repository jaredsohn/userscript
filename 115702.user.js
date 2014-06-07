// ==UserScript==
// @name           Ring Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var HS = [];
var MS = [];
var LS = [];
var BL = [];

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
		
	
	for(i=0;i<HS.length;i++){
		if(name == HS[i]){
			return 'hs';
		}
	}
	
	for(i=0;i<BL.length;i++){
		if(name == BL[i]){
			return 'bl';
		}
	}
	
	for(i=0;i<LS.length;i++){
		if(name == LS[i]){
			return 'ls';
		}
	}
	
	for(i=0;i<MS.length;i++){
		if(name == MS[i]){
			return 'ms';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/topic.php?t=56452130&f=104&p=377290392"' +
 ' title="Bar and Pub Games" target="_blank">Ring Status</a>: ';
switch(resolveBettorType(user)){
 case 'ms':
  holder.innerHTML += '<font color="blue"><b>Mid Stakes</b></font>';
  break;
 case 'bl':
  holder.innerHTML += '<font color="black"><b>Blacklisted</b></font>';
  break;
 case 'hs':
  holder.innerHTML += '<font color="green"><b>High Stakes</b></font>';
  break;
 case 'ls':
  holder.innerHTML += '<font color="orange"><b>Low Stakes</b></font>';
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
	    url: 'http://ringlist.angelfire.com/',
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