// ==UserScript==
// @name           Bettor Status
// @namespace      d2jsp
// @description   Puts the betting status of the person in their avatar
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include       http://forums.d2jsp.org/user.php?i=*
// @include       http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

/**************************************
** VERSION 2.5************************
** COPYRIGHT NUMONE@D2jsp.org ******
Change Log:
1.0 - official release
1.1 - fixed the names in pm's to match the change on jsp's website
2.0 - separated the lists, created them into objects that can be added/removed
2.1 - changed the include files dictated by the site. also changed which files the names are on
2.5 - sum'ed up the main page and added a fieldset for details on status
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

function BettorStatus(){
	this.namesHolder = {};
	this.getNames();
};
BettorStatus.prototype = {};

BettorStatus.prototype.createHTML = function(div,user){
	var that = this;
	if(!this.namesHolder[user]){
		this.gatherBettorStatus(user);
	}
	
	var br = document.createElement('BR');
	var bold = document.createElement('B');
	//var link = document.createElement('A');
	//link.href = 'http://forums.d2jsp.org/forum.php?f=104';
	//link.addEventListener('click',function() { that.showDetails.apply(that,[user,this]); },false);
	var font = document.createElement('FONT');
	font.setAttribute('color', ' ' + this.namesHolder[user].activeStatus.color);
	var beginText = document.createElement('textNode');
	beginText.innerHTML = '<a href=http://forums.d2jsp.org/forum.php?f=104>Bettor Status</a>: ';
	font.innerHTML = this.namesHolder[user].activeStatus.status;
	
	bold.appendChild(beginText);
	//link.appendChild(font);
	//bold.appendChild(link);
	bold.appendChild(font);
	div.appendChild(br);
	div.appendChild(bold);
};

BettorStatus.prototype.showDetails = function(user,link){
	this.openMobileWindow(link);
	this.populateFieldset(user);
};

BettorStatus.prototype.populateFieldset = function(user){
	var obj = this.namesHolder[user];

	// bold tag
	var bold = document.createElement('B');
	this.fieldset.appendChild(bold);
	
	// each sport
	for(sport in NAMES){
		var curr = NAMES[sport];
		
		// a tag and attributes
		var a = document.createElement('A');
		a.href = curr.list;
		a.setAttribute('target','_blank');
		a.innerHTML = curr.title + ' Status:';
		a.setAttribute('title','Links to ' + curr.title + ' list');
		bold.appendChild(a);
		
		var font = document.createElement('FONT');
		if(obj[curr.title]){
			font.setAttribute('color',obj[curr.title].color);
			font.innerHTML = ' ' + obj[curr.title].status;
		}else{
			font.setAttribute('color','gray');
			font.innerHTML = ' Unknown';
		}
		bold.appendChild(font);
		var br = document.createElement('BR');
		bold.appendChild(br);
	}
};

BettorStatus.prototype.openMobileWindow = function(link){
	var that = this;
	var offsetTop = this.getOffset(link);
	if(this.fieldset){
		this.removeDetails();
	}
	
	// field set and properties
	this.fieldset = document.createElement('FIELDSET');
	this.fieldset.style.padding = '5px';
	this.fieldset.style.position = 'absolute';
	this.fieldset.style.top = offsetTop;
	this.fieldset.style.left = '50px';
	this.fieldset.style.zIndex = '100';
	
	// legend and properties
	var legend = document.createElement('LEGEND');
	var legText = document.createElement('TEXTNODE');
	legText.innerHTML = 'Better Status Info.&nbsp;';
	var close = document.createElement('A');
	close.href = 'javascript:void(0)';
	close.innerHTML = '<img src="images/x.gif"/>';
	close.addEventListener('click',function() { that.removeDetails.apply(that); },false);
	legend.appendChild(legText);
	legend.appendChild(close);
	this.fieldset.appendChild(legend);
	
	// append field set
	document.body.appendChild(this.fieldset);
};

BettorStatus.prototype.removeDetails = function(){
	this.fieldset.parentNode.removeChild(this.fieldset);
	this.fieldset = null;
};

BettorStatus.prototype.getOffset = function(elm){
	var toReturn = 0;
	while(elm){
		toReturn += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return toReturn;
};

BettorStatus.prototype.checkSport = function(curSport,user){
	// for each bettor status in the sport
	for(theStatus in curSport.status){
		var curStatus = curSport.status[theStatus];
		for(var i=0;i<curStatus.names.length;i++){
			var curName = curStatus.names[i];
			if(user == curName.toUpperCase()){
				var theUser = this.namesHolder[user];
				theUser[curSport.title] = {};
				theUser[curSport.title].status = curStatus.title;
				theUser[curSport.title].rank = curStatus.rank;
				theUser[curSport.title].color = curStatus.color;
				return;
			}
		}
	}
};

BettorStatus.prototype.gatherBettorStatus = function(user){
	this.namesHolder[user] = {};
	// for each sport
	for(sport in NAMES){
		var curSport = NAMES[sport];
		this.checkSport(curSport,user);
	}
	
	this.resolveStatus(user);
};

// figures out the current status of the user based on rank
BettorStatus.prototype.resolveStatus = function(user){
	var curLeader = {rank:-1};
	for(sport in this.namesHolder[user]){
		var userBracket = this.namesHolder[user];
		var curSport = userBracket[sport];
		if(curSport.rank > curLeader.rank){
			curLeader = curSport;
		}
	}
	
	if(curLeader.rank == -1){
		curLeader.status = 'Unknown';
		curLeader.color = 'gray';
	}
	this.namesHolder[user].activeStatus = curLeader;
};

BettorStatus.prototype.doThePage = function(){
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
		
		this.createHTML(divs[i + divOffset],name.toUpperCase());
		
		// for pm's - we only need to run it once, all the other fields are useless
		// same for user profiles
		if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0){
			break;
		}
	}
};

BettorStatus.prototype.getNames = function(){
	var that = this;
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://d2jsp-bettor-list.angelfire.com/index.html',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response){
			// response from other page
			var str = response.responseText;
			
			// check version
			var version = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 19,str.indexOf('StArToFmYBETTORlIsT') + 22);
			if(version != '2.5'){
				if(confirm('Your Bettor Status script is not up-to-date.\n\nWould you like to update it?')){
					window.open('http://userscripts.org/scripts/show/50720');
				}
			}
			
			// strip out what i don't need
			var names = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 22,str.indexOf('EnDoFmYBETTORlIsT'));
			eval(names);
			that.doThePage();
		}
	});
};

//getNames();
window.setTimeout(function() { new BettorStatus(); },0);