// ==UserScript==
// @name           Journal Expander
// @namespace      http://userscripts.org/users/48349
// @include        http://www.okcupid.com/*
// ==/UserScript==

//Change this value to be greater than the number of journal posts
var LOAD_LIMIT = 10000;


insertOwnJournalExpandOptions();
insertOtherJournalExpandOptions();

function insertOwnJournalExpandOptions(){
	var profileMenu= document.getElementById('add_post_btn');
	if(profileMenu != null){
	   menuRoot = profileMenu.parentNode;
	   var journalLink =document.evaluate("//li[@id='pnav_journal']/a",	
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    //GM_log('Username: ' + journalLink.href);	   
	    var loadString = journalLink.href + '?start=0&limit=' + LOAD_LIMIT + '&start_time=0&end_time=0';
	    var showAllLink = e('div',{},[e('a', {href: loadString}, [t('Show All Journals')])]);
	    var expandAllComments = e('a', {href: 'javascript:void(0)'}, [t('Expand All Comments')]);
	     expandAllComments.addEventListener('click', function(evt) {
	    	   	       	    
	    	   		       	    	loadAllComments();
	    	   	       	    
	   		}, false);
	    menuRoot.insertBefore(showAllLink,profileMenu);
	    menuRoot.insertBefore(expandAllComments,profileMenu);
	
	}

}

function insertOtherJournalExpandOptions(){
	var journalRoot =document.evaluate("//div[@class='journal' and @id='main_column']",	
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(journalRoot != null){
	 
	  var journalLink =document.evaluate("//li[@id='pnav_journal']/a",	
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	   var loadString = journalLink.href + '?start=0&limit=' + LOAD_LIMIT + '&start_time=0&end_time=0';
	   var showAllLink = e('div',{},[e('a', {href: loadString}, [t('Show All Journals')])]);
	  	    var expandAllComments = e('div',{},[e('a', {href: 'javascript:void(0)'}, [t('Show All Comments')])]);
	  	     expandAllComments.addEventListener('click', function(evt) {
	  	    	   	       	    
	  	    	   		       	    	loadAllComments();
	  	    	   	       	    
	   		}, false);
	   
	    journalRoot.insertBefore(expandAllComments,null);
	    journalRoot.insertBefore(showAllLink,null);
	
	}
	//GM_log("pagesNode: " + pagesNode);


}

//Steps over each loaded journal and loads all its comments
function loadAllComments(){
	//boards.load_comments('8703875369437572882','7307078655639574647',0,10,127); 
	//location.assign("javascript:boards.load_comments('8703875369437572882','7307078655639574647',0,127,127);void(0)");
	var journals = document.evaluate(
	        "//ul[@class='mini_actions']/li[1]/a",
	        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	      //GM_log('journals: ' + journals.snapshotLength);
	    for (var i = 0; i <  journals.snapshotLength; i++) {
	        //GM_log(journals.snapshotItem(i).getAttribute('onclick'));
	        loadComment(journals.snapshotItem(i).getAttribute('onclick'));
    }


}

//Loads up all comments for the given journal
function loadComment(ref){
	if(ref != null){
	  //GM_log("ref: " + ref);
	  //GM_log('split ' + ref.split('\'')[1]);
	  var param1 = '\'' + ref.split('\'')[1] + '\'';
          var param2 = ref.split(',')[1];
	  var param3 = ref.slice(ref.lastIndexOf(',')+1,ref.lastIndexOf(')'));
	  //GM_log("param3: " + param3);
	  var execString = "javascript:boards.load_comments(" + param1 + "," + param2 + ",0," + param3 + "," + param3 + ");void(0)";
	  //GM_log("execString: " + execString);
	  setTimeout(function(){location.assign(execString)},1000);
	}

}

function e(name, attribs, children) {

	//make an element with some attributes and children.

	var r = document.createElement(name);

	for (var i in attribs) {

		r.setAttribute(i, attribs[i]);

	}

	for (var i = 0; i < children.length; i++) {

		r.appendChild(children[i]);

	} 

	return r;

}

function t(text) {

	//make a text node.

	return document.createTextNode(text);

}