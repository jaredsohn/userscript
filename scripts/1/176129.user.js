// ==UserScript== 
// @name          PHPBB3 Hide Users (for nucssa bbs)
// @include       */viewtopic.php* 
// @include       */viewforum.php* 
// @description   Hides/unhides a user's posts (for nucssa bbs)
// @exclude 
// ==/UserScript== 
// A CeeBeeUK production based on A2K User Hide
// 2013.08.19, v0.1, based on another script (http://userscripts.org/scripts/show/95692).
(function() { 

   // Get stored hidden users from cookie
   var users = [];
   var cookieName = "PHPBB3UserHide";
   for (var i = 0; i < document.cookie.split('; ').length; i++) {
      var oneCookie = document.cookie.split('; ')[i].split('=');
      if (oneCookie[0] == cookieName) {
         users = oneCookie[1].split(', ');
         break;
      }
   }
   
   // Cursor functions
   var curPointer = function(event) {
      event.target.style.cursor = 'pointer';
      event.preventDefault();
   };
   var curDefault = function(event) {
      event.target.style.cursor = 'default';
      event.preventDefault();
   };

   // Add or remove a user from the cookie
   var addRemoveUser = function(event) {
      // Parse current cookie
      for(j = 0; j < document.cookie.split('; ').length; j++ ) {
         var oneCookie = document.cookie.split('; ')[j].split('=');
         if (oneCookie[0] == cookieName) {
            users = oneCookie[1].split(', ');
            break;
         }
      }
	    
      //var user = escape(event.target.nextSibling.firstChild.innerHTML)
	  var user = escape(event.target.nextSibling.innerHTML)
      notFound = true;
      for (var j = 0; j < users.length; j++) {
         if (users[j] == user) {
            users.splice(j, 1);
            notFound = false;
         }
      }
      if (notFound)
         users.push(user);
      if (users.length > 0) {
         var date = new Date();
         var days = 365;
         date.setTime(date.getTime() + (days*24*60*60*1000));
         var expires = '; expires=' + date.toGMTString();
         var value = users.join(', ');
         document.cookie = cookieName + '=' + value + expires + '; path=/';
      } else {
         document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
      }
      window.alert(unescape(user) + ' has been ' + (notFound ? 'added to' : 'removed from')
         + ' your hide list\n'
         + 'You must refresh the page to view the changes.');
      event.preventDefault();
   };
   // Toggle display of user's post
	var togglePost = function(event) {
		
		if(event.target.innerHTML=='(Click to show post)') {
			//get element containing post
			var elem = event.target.nextSibling;
			while (elem.nodeType != 1) elem = elem.nextSibling;
			elem.style.display = ''; //show post
			//get element for hide button
			var elem = event.target.previousSibling;
			while (elem.nodeType != 1) elem = elem.previousSibling;
			elem.style.display = '';//display hide button
			event.target.style.display='none'; //hide me
		} else if(event.target.innerHTML=='(Click to hide post)'){
			//get element containing show button
			var elem = event.target.nextSibling;
			while (elem.nodeType != 1) elem = elem.nextSibling;
			elem.style.display = ''; //display show button
			//get element containing post
			var elem = event.target.nextSibling.nextSibling;
			while (elem.nodeType != 1) elem = elem.nextSibling;
			elem.style.display = 'none'; //hide post
			event.target.style.display='none'; //hide me
		}			
		event.preventDefault();
	};   
   // Toggle display of user's quote
	var toggleQuote = function(event) {
 		if(event.target.innerHTML=='(Click to show quote)') {
			// get element containing quote
			var elem = event.target.parentNode.nextSibling;
			while (elem.nodeType != 1) elem = elem.parentNode.nextSibling;
			elem.style.display = ''; //show post
			event.target.parentNode.style.display='none'; //hide me
		} else if(event.target.innerHTML=='(Click to hide quote)'){
			// get element containing quote warning
			var elem = event.target.parentNode.previousSibling;
			while (elem.nodeType != 1) elem = elem.parentNode.previousSibling;
			elem.style.display = ''; //show post
			event.target.parentNode.style.display='none'; //hide me
		}			
		event.preventDefault();
	};   

	// Find all the usernames in the page
   var results = document.evaluate("//p[@class='author']/b|//p[@class='author']/strong", document, null, XPathResult.ANY_TYPE, null);
   var resultNodes = []; 
   while (aResult = results.iterateNext()) { 
      resultNodes.push(aResult); 
   } 
   // Loop through every user post on the page
   for (var i in resultNodes) {

      var containingRow = resultNodes[i].parentNode.parentNode.parentNode;
      // Format whitespace
      //var user = escape(resultNodes[i].firstChild.innerHTML);
      var user = escape(resultNodes[i].innerHTML);

      // Flag whether the user is in our hide list
      var notFound = true;
      for (var j = 0; j < users.length; j++) {
         if (users[j] == user) {
            notFound = false;
         }
      }

      // Add relevant event handlers to user's name and a toggler node
      var toggler = document.createElement('span');
      toggler.setAttribute('title', "click to add or remove this user from your hide list");
      toggler.appendChild(document.createTextNode('[x] '));
      toggler.style.fontSize = '10px';
      toggler.style.color = '#006699';
      toggler.addEventListener('mouseover', curPointer, true);
      toggler.addEventListener('mouseout', curDefault, true);
      toggler.addEventListener('click', addRemoveUser, true);

      resultNodes[i].parentNode.insertBefore(toggler, resultNodes[i]);
	  
      // If this user isn't in our hide list, skip to the next user
      if (notFound)
         continue;	

// Create a span to control toggling
	var spanText = document.createElement('span');
	var spanShow = document.createElement('span');
	var spanHide = document.createElement('span');
	spanText.appendChild(document.createTextNode('This post by '));
	//spanText.appendChild(document.createTextNode(resultNodes[i].firstChild.innerHTML));
	spanText.appendChild(document.createTextNode(resultNodes[i].innerHTML));
	spanText.appendChild(document.createTextNode(' is hidden because they are on your ignore list '));
	//Build show link
	spanShow.appendChild(document.createTextNode('(Click to show post)'));
	spanShow.style.textDecoration = 'bold';
	spanShow.style.fontSize = '10px';
	spanShow.style.color = '#006699';
	spanShow.addEventListener('mouseover', curPointer, true);
	spanShow.addEventListener('mouseout', curDefault, true);
	spanShow.addEventListener('click', togglePost, true);
	//Build hide link
	spanHide.appendChild(document.createTextNode('(Click to hide post)'));
	spanHide.style.textDecoration = 'bold';
	spanHide.style.fontSize = '10px';
	spanHide.style.color = '#006699';
	spanHide.style.display='none';
	spanHide.addEventListener('mouseover', curPointer, true);
	spanHide.addEventListener('mouseout', curDefault, true);
	spanHide.addEventListener('click', togglePost, true);

	containingRow.parentNode.insertBefore(spanShow, containingRow.parentNode.firstChild);
	containingRow.parentNode.insertBefore(spanHide, containingRow.parentNode.firstChild);
	containingRow.parentNode.insertBefore(spanText, containingRow.parentNode.firstChild);

	//Hide the current users post
	containingRow.style.display = 'none'; 
    containingRow.parentNode.style.border = "solid red 2px";

   } 

   // Find all the usernames quoted in the page
	var results = document.evaluate("//cite", document, null, XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var aResult;
	while (aResult = results.iterateNext())
	resultNodes.push(aResult);
	
	// Loop through every user quote on the page
	for (var i in resultNodes) {
		//alert(resultNodes[i].innerHTML);
		var containingRow = resultNodes[i].parentNode;
		while (containingRow.nodeType != 1)
			containingRow = containingRow.parentNode;

		// Find username
		var usermatch = resultNodes[i].innerHTML.match(/(.*) skrev:$/);
		if (usermatch)
			var user = escape(usermatch[1]);
		else
			var usermatch = resultNodes[i].innerHTML.match(/(.*) wrote:$/)
			if (usermatch)
				var user = escape(usermatch[1]);
			else
				continue;

		// Flag whether the user is in our hide list
		var notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				notFound = false;
			}
		}

		// If this user isn't in our hide list, skip to the next user
		if (notFound)
			continue;
			
		// Create a span to control toggling
		var spanText = document.createElement('div');
		var spanShow = document.createElement('span');
		var spanHide = document.createElement('span');
		var citeNode = document.createElement('cite');
		citeNode.appendChild(document.createTextNode(usermatch[1] + ' wrote something,'));
		spanText.appendChild(citeNode);
		spanText.appendChild(document.createTextNode('And it was hidden because they are on your ignore list '));
		//Build show link
		spanShow.appendChild(document.createTextNode('(Click to show quote)'));
		spanShow.style.textDecoration = 'bold';
		spanShow.style.fontSize = '10px';
		spanShow.style.color = '#006699';
		spanShow.addEventListener('mouseover', curPointer, true);
		spanShow.addEventListener('mouseout', curDefault, true);
		spanShow.addEventListener('click', toggleQuote, true);
		spanText.appendChild(document.createElement('br'));
		spanText.appendChild(spanShow);
		//Build hide link
		spanHide.appendChild(document.createTextNode('(Click to hide quote)'));
		spanHide.style.textDecoration = 'bold';
		spanHide.style.fontSize = '10px';
		spanHide.style.color = '#006699';
		spanHide.addEventListener('mouseover', curPointer, true);
		spanHide.addEventListener('mouseout', curDefault, true);
		spanHide.addEventListener('click', toggleQuote, true);

		//Insert Warning block
		containingRow.parentNode.insertBefore(spanText, containingRow);
		// Hide the quote
		containingRow.style.display = 'none';
		//and add hide link too
		containingRow.appendChild(document.createElement('br'));
		containingRow.appendChild(spanHide);
	}
	
	// hide topics.
	//alert("nName in blacklist: "+users.length);
	var count=0
	var blacklist=""
	var listmoved=""
	for (var j = 0; j < users.length; j++) {
		//var username = "qinjiahao"; 
		var username = unescape(users[j]);
		blacklist=blacklist+" : "+username;
		var allTopics = document.evaluate( '//dl[@class="icon"]/dt[@title][contains(.,"'+username+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
		if(allTopics.snapshotLength > 0) listmoved += (" : "+username+"\t"+allTopics.snapshotLength+"\n");
		for ( var k = 0; k < allTopics.snapshotLength; k++ ){
			var nameLink = allTopics.snapshotItem(k);
			var panel=nameLink.parentNode;
			panel.parentNode.removeChild(panel);
			count++;
		}
	}
	if(count>0) {
		// alert("Blacklist" +blacklist+" .");
		// alert("Number of topic removed: "+count);		
		// alert("List-moved\n" +listmoved+" .");
		document.title = document.title + " ( " + count + " topics removed )" + listmoved 
	}
})();