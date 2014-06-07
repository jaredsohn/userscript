// ==UserScript==
// @name           AIM Roll Bettor's Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/index.php?showtopic=*
// @include        http://forums.d2jsp.org/user.php?i=*
// @include        http://forums.d2jsp.org/topic.php?t=*
// @include        http://forums.d2jsp.org/pm.php?c=*
// @include        http://forums.d2jsp.org/index.php?act=Post&c=*
// ==/UserScript==

var TRUSTED = [];
var OTHER = [];
var WELCHERPB = [];
var WELCHER = [];
var MEDIATOR = [];

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
		
	for(i=0;i<MEDIATOR.length;i++){
		if(name == MEDIATOR[i]){
			return 'med';
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
	
	for(i=0;i<OTHER.length;i++){
		if(name == OTHER[i]){
			return 'other';
		}
	}
	
	for(i=0;i<WELCHER.length;i++){
		if(name == WELCHER[i]){
			return 'welcher';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
div.innerHTML += '<br/><b><a href="http://forums.d2jsp.org/topic.php?t=37819900&f=104"' + 
		' title="Unofficial AIM Roll Information" target="_blank">Roll Status</a>: ';
	switch(resolveBettorType(user)){
		case 'med':
			div.innerHTML += '<font color="chartreuse"><b>Mediator</b></font>';
			break;
		case 'welcher':
			div.innerHTML += '<font color="red"><b>Welcher</b></font>';
			break;
		case 'other':
			div.innerHTML += '<font color="pink"><b>Megan</b></font>';
			break;
		case 'welcherpaidback':
			div.innerHTML += '<font color="fuchsia"><b>Paid-Back</b></font>';
			break;
		case 'trusted':
			div.innerHTML += '<font color="blue"><b>Trusted</b></font>';
			break;
		case 'unknown':
			div.innerHTML += '<font color="orange"><b>Unknown</b></font>';
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
	    url: 'http://remembrance1.angelfire.com/',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response)
		{
			var str = response.responseText;
			
			var names = str.substring(str.indexOf('StaRt') + 5,str.indexOf('EnD'));
			eval(names);
			doThePage();
		}
	});

};

getNames();