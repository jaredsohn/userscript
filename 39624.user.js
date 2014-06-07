// RMP Boards Killfile
//
// A GreaseMonkey user script to ignore posts of certain users on the RMP 
// message boards. To ignore a user, simply add them to the list below. If the
// script is already installed, this can be acomplished by going to 
// Tools->Manage Scripts, selecting the RMP Killfile, and
// pressing the "Edit" button.
// 
// You should choose an editor that is appropriate for "pure" text files 
//-- e.g., notepad (Windows) or textedit (Mac)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RMP Killfile
// @namespace     www.ratemyprofessors.com
// @description   allows you to ignore posts from specific users
// @include       http://www.ratemyprofessors.com/jive/vodka/*
// ==/UserScript==

// ADD YOUR BLACKLIST ENTRIES HERE 

var Bans = Array("tard", "spammer", "troll");


var banRegs = Array();
for(var ban in Bans){
  //create a regular expression using the user's name
  var re = new RegExp('posted by\: ' + Bans[ban]);
  banRegs.push(re);
 }

var basicRe = new RegExp('posted by\: ');
var spans = document.getElementsByTagName('span');

for(var span=0; span<spans.length; span++){
  if(spans[span].className=='messageAuthor'){
    var test = spans[span];
    if(test.childNodes[0].nodeValue){
      var block=0;
      var newLink = 0;
      var user='';
      for(var re in banRegs){
	if(test.childNodes[0].nodeValue){
	  
	  if(test.childNodes[0].nodeValue.match(banRegs[re])){
	    while(test && test.nodeName.toUpperCase() != 'TABLE'){
	      test = test.parentNode;
	    }
	    test.style.display='none';
	    var newLink = document.createElement('a');
	    newLink.setAttribute('onclick', 'if(this.nextSibling.style.display=="none"){this.nextSibling.style.display="";}else{this.nextSibling.style.display="none";}');
	    newLink.appendChild(document.createTextNode('Show/Hide blocked comment'));
	    block=1;
	  }else{
	    if(test.childNodes[0] && test.childNodes[0].nodeValue){
	      
	      user = test.childNodes[0].nodeValue.replace(basicRe, '');
	    }
	  }
	}
	
      }
      if(block && newLink){
	test.parentNode.insertBefore(newLink, test);
      }
    }
  }
 }
