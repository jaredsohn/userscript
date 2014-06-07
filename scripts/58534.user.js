// ==UserScript==
// @name           Jp d2jsp Status
// @namespace      d2jsp Forums
// @include        http://forums.d2jsp.org/index.php?showtopic=*
// @include        http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// @include       http://forums.d2jsp.org/index.php?act=Post&c=*
// ==/UserScript==

var TRUSTED = [];
var TROUBLE = [];
var BLACKLISTED = [];
var VERBALED = [];
var LOVED = [];

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
		
	
	for(i=0;i<TRUSTED.length;i++){
		if(name == TRUSTED[i]){
			return 'trusted';
		}
	}
	
	for(i=0;i<BLACKLISTED.length;i++){
		if(name == BLACKLISTED[i]){
			return 'blacklisted';
		}
	}
	
	for(i=0;i<TROUBLE.length;i++){
		if(name == TROUBLE[i]){
			return 'trouble';
		}
	}
	
	for(i=0;i<LOVED.length;i++){
		if(name == LOVED[i]){
			return 'loved';
		}
	}
	
	for(i=0;i<VERBALD.length;i++){
		if(name == VERBALED[i]){
			return 'verbaled';
		}
	}
	
	
	return 'none';
};

function createHTML(div,user){
-	div.innerHTML += '<br/><b>Status: ';

	switch(resolveBettorType(user)){
		case 'trusted':
			div.innerHTML += '<font color="blue"><b>Trusted</b></font>';
			break;
		case 'blacklisted':
			div.innerHTML += '<font color="black"><b>BLACKLISTED</b></font>';
			break;
		case 'trouble':
			div.innerHTML += '<font color="red"><b>Trouble</b></font>';
			break;
		case 'loved':
			div.innerHTML += '<font color="fuchsia"><b>Loved</b></font>';
			break;
		case 'verbaled':
			div.innerHTML += '<font color="orange"><b>Verballed</b></font>';
			break;
		case 'unknown':
			div.innerHTML += '<font color="gray"><b>Not Rated</b></font>';
			break;
	}
	div.innerHTML += '</b>';
};

function doThePage(){
	var divs = getElementsByClassName('bc1',document);
	var names = document.getElementsByTagName('legend');
	var name,str,nameOffset,divOffset;
	nameOffset = 0;
	divOffset = 0;
	
	for(var i=0;i<divs.length;i++){
		if(names[i + nameOffset].innerHTML == 'User Poll'){
			nameOffset++;
		}
		
		if(window.location.href.indexOf('pm.php?') > 0){
			nameOffset = 1;
			divOffset = 5;
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
	    url: 'http://d2jspstatus.angelfire.com/',
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