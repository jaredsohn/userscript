// ==UserScript==
// @name           MMA
// @namespace      d2jsp
// @description   Puts "Martial Arts, Boxing, and Wrestling" betting status of the person in their avatar
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

/**************************************
** VERSION 2.0 ************************
** COPYRIGHT NUMONE@D2jsp.org ******
Change Log:
1.0 - official release
1.1 - fixed the names in pm's to match the change on jsp's website
2.0 - separated the lists, created them into objects that can be added/removed
2.1 - changed the include files dictated by the site. also changed which files the names are on
**************************************/

var NAMES = {};

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
	var toPrint = '';
	for(sport in NAMES){
		// set the initial link
		toPrint += '<br/><b><a href="' + NAMES[sport].list + '"' +
			'title="Links to ' + NAMES[sport].title + ' list!" target="_blank">' +
			NAMES[sport].title + ' Status</a>:';
		var status = resolveBettorStatus(NAMES[sport],user);
		toPrint += ' <font color="' + status.color + '">' + status.title + '</font></b>';
	}

	div.innerHTML = div.innerHTML + toPrint;
};

function resolveBettorStatus(sport,user){
	var user = user.toUpperCase();
	var status = sport.status;
	// for each status
	for(astatus in status){
		// for each person in that status
		for(var i=0;i<status[astatus].names.length;i++){
			// if we find a match we are done, return
			if(user == status[astatus].names[i].toUpperCase()){
				return {title:status[astatus].title, color:status[astatus].color};
			}
		}
	}
	
	return {title:'<br> Unknown',color:'gray'};
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
	    url: 'http://JSP-MMA.angelfire.com/index.html',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response)
		{
			// response from other page
			var str = response.responseText;
			
			// check version
			var version = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 19,str.indexOf('StArToFmYBETTORlIsT') + 22);
			if(version != '2.1'){
				if(confirm('Your Bettor Status script is not up-to-date.\n\nWould you like to update it?')){
					window.open('http://userscripts.org/scripts/show/59593');
				}
			}
			
			// strip out what i don't need
			var names = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 22,str.indexOf('EnDoFmYBETTORlIsT'));
			eval(names);
			doThePage();
		}
	});
	
	doThePage();

};

getNames();