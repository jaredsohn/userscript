// ==UserScript==
// @name           Pokemon!
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/index.php?showtopic=*
// @include        http://forums.d2jsp.org/user.php?i=*
// ==/UserScript==

var TRUSTED = [];
var ACTIVE = [];
var WELCHERPB = [];
var WELCHER = [];
var BLACKLISTED = [];
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
	//alert(name);
	
	// see if user is a med
	for(i=0;i<MED.length;i++){
		if(name == MED[i]){
			return 'med';
		}
	}
	
	// see if user is blacklisted
	for(i=0;i<BLACKLISTED.length;i++){
		if(name == BLACKLISTED[i]){
			return 'blacklisted';
		}
	}
	
	// see if user is trusted
	for(i=0;i<TRUSTED.length;i++){
		if(name == TRUSTED[i]){
			return 'trusted';
		}
	}
	
	// see if user is welcher paid back
	for(i=0;i<WELCHERPB.length;i++){
		if(name == WELCHERPB[i]){
			return 'welcherpaidback';
		}
	}
	
	// see if user is active
	for(i=0;i<ACTIVE.length;i++){
		if(name == ACTIVE[i]){
			return 'active';
		}
	}
	
	// see if user is a welcher
	for(i=0;i<WELCHER.length;i++){
		if(name == WELCHER[i]){
			return 'welcher';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
	div.innerHTML += '<br/><b>Poker Status: ';
	switch(resolveBettorType(user)){
		case 'med':
			div.innerHTML += '<font color="chartreuse"><b>Mediator</b></font>';
			break;
		case 'welcher':
			div.innerHTML += '<font color="red"><b>Welcher</b></font>';
			break;
		case 'active':
			div.innerHTML += '<font color="purple"><b>Active</b></font>';
			break;
		case 'welcherpaidback':
			div.innerHTML += '<font color="fuchsia"><b>Paid-Back</b></font>';
			break;
		case 'trusted':
			div.innerHTML += '<font color="blue"><b>Trusted</b></font>';
			break;
		case 'blacklisted':
			div.innerHTML += '<font color="black"><b>Blacklisted</b></font>';
			break;
		case 'unknown':
			div.innerHTML += '<font color="gray"><b>Unknown</b></font>';
			break;
	}
	div.innerHTML += '</b>';
};

function doThePage(){
	var divs = getElementsByClassName('bc1',document);
	var names = document.getElementsByTagName('legend');
	var name,str,nameOffset;
	nameOffset = 0;
	
	for(var i=0;i<divs.length;i++){
		// because polls use the tag name ledgend we need to skip them so use an offset parameter.
		if(names[i + nameOffset].innerHTML == 'User Poll'){
			nameOffset++;
		}
			
		str = names[i + nameOffset].firstChild;
		
		// if they have an orb, there is another first child
		if(str.innerHTML.indexOf('<') == 0){
			str = str.firstChild;
		}
		
		str = str.innerHTML;
		
		// strip out any images
		var idx = str.indexOf('<');
		if(idx != -1){
			name = str.substring(0,idx)
		}else{
			name = str;
		}
		
		name = name.replace(/ /gi,'');
		
		createHTML(divs[i],name.toUpperCase());
	}
};

function getNames(){
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://d2jsp-poker-list.angelfire.com',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response)
		{
			// response from other page
			var str = response.responseText;
			
			// strip out what i don't need
			var names = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 19,str.indexOf('EnDoFmYBETTORlIsT'));
			eval(names);
			doThePage();
		}
	});

};

getNames();