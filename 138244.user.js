// ==UserScript==
// @name           Rage Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var STUFE1 = [];
var STUFE2 = [];
var STUFE3 = [];
var STUFE4 = [];

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
		
	
	for(i=0;i<STUFE1.length;i++){
		if(name == STUFE1[i]){
			return 'stufe1';
		}
	}
	
	for(i=0;i<STUFE2.length;i++){
		if(name == STUFE2[i]){
			return 'stufe2';
		}
	}
	
	for(i=0;i<STUFE3.length;i++){
		if(name == STUFE3[i]){
			return 'stufe3';
		}
	}

	for(i=0;i<STUFE4.length;i++){
		if(name == STUFE4[i]){
			return 'stufe4';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/forum.php?f=104"' +
 ' title="Bar and Pub Games" target="_blank">Rage Status</a>: ';
switch(resolveBettorType(user)){
 case 'stufe1':
  holder.innerHTML += '<font color="green"><b>Stufe1</b></font>';
  break;
 case 'stufe2':
  holder.innerHTML += '<font color="orange"><b>Stufe2</b></font>';
  break;
 case 'stufe3':
  holder.innerHTML += '<font color="red"><b>Stufe3</b></font>';
  break;
 case 'stufe4':
  holder.innerHTML += '<font color="black"><b>Stufe4</b></font>';
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
	    url: 'http://ragestatus.angelfire.com',
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