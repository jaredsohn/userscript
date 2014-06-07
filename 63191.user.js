// ==UserScript==
// @name           Display User ID
// @namespace      d2jsp
// @description   Display's the user id under the user's avatar
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

/**************************************
** VERSION 1.0 ************************
** COPYRIGHT NUMONE@D2jsp.org ******
Change Log:
1.0 - official release
**************************************/

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

function createHTML(div,user){
	div.innerHTML = div.innerHTML + '<br/>User ID: ' + user;
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
		
		// apply the offset and grab the anchor tag that has the ID
		str = names[i + nameOffset].getElementsByTagName('A')[0];
		
		name = str.getAttribute('HREF');
		if(name == '#' && window.location.href.indexOf('user.php?i') > 0){
			// we are in a user's profile.
			name = window.location.href.split('=')[1];
		}else{
			name = name.split('=')[1];
		}
		
		name = name.replace(/ /gi,'');
		createHTML(divs[i + divOffset],name);
		
		// for pm's - we only need to run it once, all the other fields are useless
		// same for user profiles
		if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0){
			break;
		}
	}
};

doThePage();