// ==UserScript==
// @name Coursera Forums - hide posts
// @include https://class.coursera.org/* 
// @grant none
// ==/UserScript==

var blockedNamesCookie = "hide";

var blockedNames = getCookie(blockedNamesCookie);
//var blockedNames = null;

if (blockedNames === null)
    blockedNames = [];
else
    blockedNames = blockedNames.split("\n");


//***** Add Hide/Show Buttons **********

var snapUserSpan = document.evaluate("//span[@class = 'course-forum-post-byline']/child::span",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
for (var i = 0; i < snapUserSpan.snapshotLength; i++) {

    var elm = snapUserSpan.snapshotItem(i);
    var username = String(elm.innerHTML).replace(/^\s+|\s+$/g, '')
    
    var buttonnode= document.createElement('input');
   	buttonnode.setAttribute('type','button');
    buttonnode.setAttribute('style', 'float:right');
    
    if (inArray(blockedNames,username.valueOf())) {
        buttonnode.setAttribute('id','Show user ' + username);
    	buttonnode.setAttribute('value','Show Posts');
        elm.parentNode.appendChild(buttonnode);
        buttonnode.addEventListener('click', unblock, false);
    }
    else {
        buttonnode.setAttribute('id','Hide user ' + username);
    	buttonnode.setAttribute('value','Hide Posts');
        elm.parentNode.appendChild(buttonnode);
        buttonnode.addEventListener('click', block, false);
    }  
  
    buttonnode.username = username;
    
}


//***** Remove posts of blackedlisted students ******

for (var i = 0; i < blockedNames.length; i++) {

    var snapUserSpan = document.evaluate("//span[contains(text(), '" + blockedNames[i] + "')]/following::div[@class='course-forum-post-text-container'][1]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var j=0; j<snapUserSpan.snapshotLength; j++) {
        var elm = snapUserSpan.snapshotItem(j);

        elm.innerHTML = "<!-- " + elm.innerHTML + " -->" +"<i> You have chosen to hide posts by user '" + blockedNames[i] + "'. </i>";
    }

}

function block(evt) {
    var username = evt.target.username;

    blockedNames.push(username);
    
    saveBlockedNames();
    location.reload();
}

function unblock(evt) {
    var username = evt.target.username;
    
    for (var i = 0; i < blockedNames.length; i++) 
        if (blockedNames[i] === username.valueOf())
            blockedNames.splice(i, 1);
    
    saveBlockedNames();
    location.reload();
}

function saveBlockedNames() {
    var namestring = "";

    for (var i = 0; i < blockedNames.length - 1; i++)
        namestring += blockedNames[i] + "\n";

    if (blockedNames.length > 0)
        namestring += blockedNames[blockedNames.length-1];

    if (namestring === "")
        namestring = null;

    setCookie(blockedNamesCookie, namestring, 360);

}

function inArray (arr, elm) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elm) { return true;}
    }
    return false;
    
}


// setCookie() & getCookie from http://www.blazonry.com/javascript/cookies_save.php

function setCookie(name, value, expires)  {			
    exp = new Date();
    exp.setDate(exp.getDate()+expires);
    document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + exp.toUTCString()); 
}  

function getCookie (name)    {						
    var dc = document.cookie;			
    var cname = name + "=";			

    if (dc.length > 0) {		
        begin = dc.indexOf(cname);  

        if (begin != -1) {        		
            begin += cname.length;       
         	end = dc.indexOf(";", begin);
         	if (end == -1) end = dc.length;
         		return unescape(dc.substring(begin, end));
   		} 	
    }				
	return null;				
}