// ==UserScript==
// @name           myspace ignore user updated
// @namespace      mark
// @include        http://forums.myspace.com/t/*
// @include        http://forums.myspace.com/p/*
// ==/UserScript==
// created: 10/06/2007
// credits: created by mark (myspace.com/xenomark) 
// credits: based on the original script by adrian (myspace.com/adrian232)
// credits: with mucho grande help from dave (myspace.com/_saintjimmy)


(function() {
var username = '';
var userid = '';
var blacklisted = GM_getValue('blacklisted', '');
var listArr = blacklisted.split(';');
var friends = new Array();	 //a place to store the friendID's

//reset the blacklist to nothing by uncommenting the following line you may need to refresh twice afterwards
//GM_setValue('blacklisted','');
//be sure to comment it back again

//GM_setValue('blacklisted', blacklisted + "XXXXXXXX;XXXXXXXX;");            

//GM_setValue('blacklisted', blacklisted + '"' + 'XXXXXXXX' + ';' + '"');    




	var allLis, thisLi;
	allLis = document.evaluate(                                  //get all username li elements
    		'//li[@class ="ForumPostUserName"]', document, null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allLis.snapshotLength; i++) {
    			thisLi = allLis.snapshotItem(i);
		
			//from there we can determine if this is a user we wanted to block
       			var a = thisLi.getElementsByTagName('a');
          		username = a[0].innerHTML; //text between the anchor tags
			//parse the link to the users profile
            		userid = a[0].href; 
        		userid = userid.substring(userid.indexOf('&friendid') + 10);
        		userid = userid.substring(0,userid.indexOf('&'));



			if (blacklisted.match(new RegExp(userid))){
			//if (userid == "XXXXXXXX"){       //testing purposes
			
				// hide the entire li that contains the post
				thisLi.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style['display'] = 'none';
				}
			
			
			
		

			var newfriend = allLis.length;       
			friends[newfriend] = new Friend(userid);  
			var newlink = document.createElement("a");  
			newlink.setAttribute("style", "color:white; background-color:red; font-size:10px;");
			newlink.setAttribute("href", "javascript:void(0);");
			newlink.addEventListener("click", friends[newfriend].ignoreUser, false);
			newlink.appendChild(document.createTextNode('Ignore User'));
			

    			thisLi.parentNode.parentNode.insertBefore(newlink, thisLi.parentNode.nextSibling);  



		}
	
		function Friend(userid) {  
			var parent = this;
		
			this.friendID = userid;  
			
		
			this.ignoreUser = function(e) {
				if (confirm("Do you really want to ignore this user? This operation cannot be undone.")) {
					GM_setValue('blacklisted', blacklisted + '"' + userid + ';' + '"');
					document.location.reload();
				}
			}
		}

	


})();