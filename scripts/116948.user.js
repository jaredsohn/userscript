// ==UserScript==
// @name           Anni Status
// @namespace      d2jsp
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var TS = [];
var SUPPLIER = [];
var BLACKLIST = [];
var SELLER = [];

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
		
	
	for(i=0;i<BLACKLIST.length;i++){
		if(name == BLACKLIST[i]){
			return 'blacklist';
		}
	}
	
	for(i=0;i<TS.length;i++){
		if(name == TS[i]){
			return 'ts';
		}
	}
	
	for(i=0;i<SELLER.length;i++){
		if(name == SELLER[i]){
			return 'seller';
		}
	}
	
	for(i=0;i<SUPPLIER.length;i++){
		if(name == SUPPLIER[i]){
			return 'supplier';
		}
	}
	
	return 'unknown';
};

function createHTML(div,user){
var br = document.createElement('BR');
var holder = document.createElement('B');
holder.innerHTML += '<a href="http://forums.d2jsp.org/forum.php?f=51"' +
 ' title="Trading Grounds" target="_blank">Anni List Status</a>: ';
switch(resolveBettorType(user)){
 case 'ts':
  holder.innerHTML += '<font color="blue"><b>Top Seller</b></font>';
  break;
 case 'seller':
  holder.innerHTML += '<font color="orange"><b>Seller</b></font>';
  break;
 case 'blacklist':
  holder.innerHTML += '<font color="black"><b>Blacklist</b></font>';
  break;
 case 'supplier':
  holder.innerHTML += '<font color="red"><b>Taken Supplier</b></font>';
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
	    url: 'http://annilist.angelfire.com/',
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