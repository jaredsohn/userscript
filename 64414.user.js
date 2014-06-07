// ==UserScript==
// @name          Legit Duels Status
// @namespace      d2jsp
// @include       http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

/**************************************
** VERSION 1.0 ************************
** COPYRIGHT NUMONE@D2jsp.org ******
**************************************/

var TRUSTED = [];
var ACTIVE = [];
var WELCHERPB = [];
var WELCHER = [];
var BLACKLISTED = [];
var MED = [];
var REGULAR = [];

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
		if(name == MED[i].toUpperCase()){
			return 'med';
		}
	}
	
	// see if user is blacklisted
	for(i=0;i<BLACKLISTED.length;i++){
		if(name == BLACKLISTED[i].toUpperCase()){
			return 'blacklisted';
		}
	}
	
	// see if user is trusted
	for(i=0;i<TRUSTED.length;i++){
		if(name == TRUSTED[i].toUpperCase()){
			return 'trusted';
		}
	}
	
	// see if user is regular
	for(i=0;i<REGULAR.length;i++){
		if(name == REGULAR[i].toUpperCase()){
			return 'regular';
		}
	}
	
	// see if user is welcher paid back
	for(i=0;i<WELCHERPB.length;i++){
		if(name == WELCHERPB[i].toUpperCase()){
			return 'welcherpaidback';
		}
	}
	
	// see if user is active
	for(i=0;i<ACTIVE.length;i++){
		if(name == ACTIVE[i].toUpperCase()){
			return 'active';
		}
	}
	
	// see if user is a welcher
	for(i=0;i<WELCHER.length;i++){
		if(name == WELCHER[i].toUpperCase()){
			return 'welcher';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
	div.innerHTML += '<br/><b>Dueling Status: ';
	switch(resolveBettorType(user)){
		case 'med':
			div.innerHTML += '<font color="green"><b>Mediator</b></font>';
			break;
		case 'welcher':
			div.innerHTML += '<font color="red"><b>Welcher</b></font>';
			break;
		case 'regular':
			div.innerHTML += '<font color="SaddleBrown"><b>Regular</b></font>';
			break;
		case 'active':
			div.innerHTML += '<font color="purple"><b>Active</b></font>';
			break;
		case 'welcherpaidback':
			div.innerHTML += '<font color="orange"><b>Welcher Paid Back</b></font>';
			break;
		case 'trusted':
			div.innerHTML += '<font color="blue"><b>Trusted</b></font>';
			break;
		case 'blacklisted':
			div.innerHTML += '<font color="red"><b>BLACKLISTED!</b></font>';
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
	var name,str,nameOffset,divOffset;
	nameOffset = 0;
	divOffset = 0;
	
	for(var i=0;i<divs.length;i++){
		// because polls use the tag name ledgend we need to skip them so use an offset parameter.
		if(names[i + nameOffset].innerHTML == 'User Poll'){
			nameOffset++;
		}
		
		// for pm's - they get too many "ledgend" fields - we only want/need the second one
		if(window.location.href.indexOf('pm.php?') > 0){
			nameOffset = 2;
			divOffset = divs.length - 1;
		}
		
		// for replies
		if(window.location.href.indexOf('index.php?act=Post&c') > 0){
			nameOffset = 1;
		}
		
		// apply the offset and grab the element the name is in
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
		
		createHTML(divs[i + divOffset],name.toUpperCase());
		
		// for pm's - we only need to run it once, all the other fields are useless
		// same for user profiles
		if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0){
			break;
		}
	}
};

function getNames(){
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://takingsunday.angelfire.com',
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