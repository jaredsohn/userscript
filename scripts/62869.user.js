// ==UserScript==
// @name           OKC Killfile 2.0
// @namespace      http://userscripts.org/users/48349
// @description    Allows people to hide other users from journals
// @include        http://www.okcupid.com/*
// ==/UserScript==

var KillOptions = {"none" : 0, "hide" : 1, "kill" : 3}; 

//No point in doing anything until the page has loaded and okc's javascript loads up
window.addEventListener ("load", startKillFile, false);
insertProfileMenu();

function startKillFile() {
	watchAllCommentLoaders();
	
}

//Inserts the menu options in profiles
function insertProfileMenu(){
	var profileMenu= document.getElementById('actions');
	// GM_log('profileMenu: ' + profileMenu);
	if(profileMenu != null){
	   var flagForm = document.getElementById('flag_form');
	   var username = flagForm.elements.namedItem('name').value
	   //GM_log('username: ' + username);
	   var killSetting = loadKillSetting(username);
	 
	   var collapseCommentButton = e('p',{class:'btn small white small_white'},[e('a', {href:'javascript:void(0)', style:''}, [t('Collapse Comments')])]);
	   var killCommentButton = e('p',{class:'btn small white small_white'},[e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Kill Comments')])]);
	   var showCommentButton = e('p',{class:'btn small white small_white'},[e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Show Comments')])]);
	   var resurrectCommentButton = e('p',{class:'btn small white small_white'},[e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Resurrect Comments')])]);
	   collapseCommentButton.addEventListener('click', function(evt) {
	   	       	    
	   		       	    	saveKillSetting(username, KillOptions.hide);
	   	       	    		profileMenu.replaceChild(showCommentButton,collapseCommentLink);
	   	       	    
	   		}, false);
	   		killCommentButton.addEventListener('click', function(evt) {
	   			       	    
	   				       	    	saveKillSetting(username, KillOptions.kill);
	   				       	    	profileMenu.replaceChild(resurrectCommentButton,killCommentButton);
	   			       	    	
	   			       	    
	   		}, false);
	   		showCommentButton.addEventListener('click', function(evt) {
	   					       	    
	   						 saveKillSetting(username, KillOptions.none);
	   					       	 profileMenu.replaceChild(collapseCommentButton,showCommentButton);   	
	   					       	    
	   		}, false);
	   		resurrectCommentButton.addEventListener('click', function(evt) {
	   							       	    
	   								 saveKillSetting(username, KillOptions.none);
	   							       	 profileMenu.replaceChild(killCommentButton,resurrectCommentButton);   	
	   							       	    
	   		}, false);
	   		if(killSetting == KillOptions.none){
	   			profileMenu.insertBefore(collapseCommentButton,null);
	   			profileMenu.insertBefore(killCommentButton,null);
	   		} else{
	   			profileMenu.insertBefore(showCommentButton,null);
	   		}
	   		//GM_log('adding ' + killSelectionDialog +' to ' + parent);
		
	}

}

//Finds all comment loading areas and watches them for changes
function watchAllCommentLoaders() {
    //Find all comment loaders and wait for comments
    var boards = document.evaluate(
        "//div[@class='comment_load_shell']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      //GM_log('boards: ' + boards.snapshotLength);
    for (var i = 0; i <  boards.snapshotLength; i++) {
        watchCommentLoader(boards.snapshotItem(i));
    }
}

//Watches a specific comment load area
function watchCommentLoader(node) {
    
    //handleCommentList(node);
    //node.wrappedJSObject.watch('innerHTML',handleCommentList);
    //GM_log('adding handleEvent');
    if(node.hasChildNodes){
    	handleCommentList(node)
    }
    node.addEventListener('DOMSubtreeModified',handleEvent,false);
}

//Handles a full list of comments
function handleCommentList(node){
	//GM_log('handleCommentList' + node.innerHTML);
	var comments = document.evaluate(
	        ".//div[contains(@class,'journal_comment')]",
	        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log('comments: ' + comments.snapshotLength);
	    for (var i = 0; i <  comments.snapshotLength; i++) {
	        processComment(comments.snapshotItem(i));
    }
	

}

//Handles an update event
function handleEvent(evt){
	
	window.setTimeout(function() {
	   handleCommentList(evt.target);
	  }, 0);

	

}

//Processes a comment. Adds in the menu and kills/hides it if configured
function processComment(comment){
	//GM_log('comment:****************************' + comment.innerHTML)
	//comment.parentNode.removeChild(comment);
	var username = document.evaluate(	
				"string(.//p[@class='post_time']/a)",	
		comment, null, XPathResult.STRING_TYPE, null).stringValue;
	if(username != null && username != ''){
		var existingLink= document.evaluate(".//a[@class='killLink']",	
			comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(existingLink == null){
		   var killSetting = loadKillSetting(username);
		   insertMenu(comment, username, killSetting);		   
		   if(killSetting == KillOptions.hide){
		   	blockComment(comment,username);
		   } else if(killSetting == KillOptions.kill){
		   	comment.parentNode.removeChild(comment);
		   }
	   
        	}
        }
	
	
}

//Inserts the menu button next to a comment
function insertMenu(comment, username, killSetting){
       var username = document.evaluate(	
       				"string(.//p[@class='post_time']/a)",	
		comment, null, XPathResult.STRING_TYPE, null).stringValue;
       var displayLink = e('a', {href:'javascript:void(0)', style:'float:right',class:'killLink'}, [t('>')]);
       displayLink.addEventListener('click', function(evt) {
       	    
       	    	//GM_log(comment + " " + username);
       	    	displayKillSelection(comment,username, killSetting );
       	    
	}, false);
	//GM_log(bottomBar + " " + username);
	 var bottomBar = document.evaluate(	
	       				".//p[@class='post_time']",	
		comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		//GM_log('bottomBar' + bottomBar);
	bottomBar.insertBefore(displayLink,null);

}



//Displays the selection menu 
function displayKillSelection(parent, username, killSetting){
	//GM_log('displayKillSelection' + username);
	var existingMenu= document.evaluate(".//div[contains(@class,'killMenu')]",	
		parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(existingMenu == null){
		var killSelectionDialog = e('div', {class:'journal_comment killMenu'},[]);
		var collapseCommentLink = e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Collapse ' + username + '\'s Comments')]);
		var killCommentLink = e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Kill ' + username + '\'s Comments')]);
		var showCommentLink = e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Show ' + username + '\'s Comments')]);
		var showAllVictimsLink = e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Show All Victims')]);
		var resurrectCommentLink = e('a', {href:'javascript:void(0)', style:'margin-left:5px;padding:5px;display:block'}, [t('Resurrect ' + username + '\'s Comments')]);
		 collapseCommentLink.addEventListener('click', function(evt) {
	       	    
		       	    	saveKillSetting(username, KillOptions.hide);
	       	    		killSelectionDialog.replaceChild(showCommentLink,collapseCommentLink);
	       	    
		}, false);
		killCommentLink.addEventListener('click', function(evt) {
			       	    
				       	    	saveKillSetting(username, KillOptions.kill);
				       	    	killSelectionDialog.replaceChild(resurrectCommentLink,killCommentLink);
			       	    	
			       	    
		}, false);
		showCommentLink.addEventListener('click', function(evt) {
					       	    
						 saveKillSetting(username, KillOptions.none);
					       	 killSelectionDialog.replaceChild(collapseCommentLink,showCommentLink);   	
					       	    
		}, false);
		resurrectCommentLink.addEventListener('click', function(evt) {
							       	    
								 saveKillSetting(username, KillOptions.none);
							       	 killSelectionDialog.replaceChild(killCommentLink,resurrectCommentLink);   	
							       	    
		}, false);
		
		showAllVictimsLink.addEventListener('click', function(evt) {
									       	    
										showAllVictims(killSelectionDialog);  	
									       	    
		}, false);
		
		GM_log('killSetting ' + killSetting);
		if(killSetting == KillOptions.none){
			killSelectionDialog.insertBefore(collapseCommentLink,null);
			killSelectionDialog.insertBefore(killCommentLink,null);			
		} else{
			killSelectionDialog.insertBefore(showCommentLink,null);
		}
		
		killSelectionDialog.insertBefore(showAllVictimsLink,null);
		GM_log('adding ' + killSelectionDialog +' to ' + parent);
		parent.insertBefore(killSelectionDialog,null);
		
	} else{
		parent.removeChild(existingMenu);
	
	}

}

//Blocks a comment
function blockComment(comment, username){
	
	
	    //comment.parentNode.removeChild(comment);	
	    var parent = comment.parentNode;
	    var showLink = e('a', {href:'javascript:void(0)'}, [t('show')]);
	    
	    
	    
	    	var killedCommentPlaceholder = e('div', {class:'journal_comment'}, [
	    
	    		e('a', {href:('/profile?u=' + username)}, [t(username)]),
	    
	    		t(' left a comment ('),
	    
	    		showLink, 
	    
	    		t(')'),
	    
	    	]);
	    
	    
	    
	    	showLink.addEventListener('click', function(evt) {
	    
	    		parent.replaceChild(comment, killedCommentPlaceholder);
	    
	    	}, false);
	    
	    
	    
	parent.replaceChild(killedCommentPlaceholder, comment);
   

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

/****** People using crazy webbrowsers without GreaseMonkey should delve in here ******/

function saveKillSetting(username, setting){
	GM_setValue(username, setting)

}

function loadKillSetting(username){
	var val = GM_getValue(username,KillOptions.none);
	if(val == null){		
                val = KillOptions.none;
        } 	
	return val;

}

function showAllVictims(killSelectionDialog){
	var vals = GM_listValues();
	for (var i = 0; i < vals .length; i++) {
          var val=vals[i];
          var killOption = loadKillSetting(val);
	  //GM_log('val is ' + val);
	   if(killOption != KillOptions.none){
	   	var profileLink = e('a', {href:'http://www.okcupid.com/profile/' + val, style:'margin-left:5px;padding:5px;display:block'}, [t(val)]);
	   	killSelectionDialog.insertBefore(profileLink,null);
	   }	 
	}

}