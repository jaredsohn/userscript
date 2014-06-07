// ==UserScript==
// @name           MySpace  - Add Image Links
// @namespace      http://myspace.com/yeah_dude_13
// @description    Adds a set of links on small images.
// @include        http://myspace.com/*
// @include        http://*.myspace.com/*
// @exclude        http://*.myspace.com/*.viewCategory*
// ==/UserScript==


(function() {

/************\
|*  CONFIG  *|
\************/

// Inizzylizzy some viariabizzies.
var shortcuts    = new Array;  // Not used anymore
var descriptions = new Array;  // Description of what the shortcut does
var icons        = new Array;  // A URL or Base64 of an icon for the button;
var urls         = new Array;  // A link to the shortcut -- Must be an EXPRESSION
var code         = new Array;  // User defined code
var i = 0;

// Links directly to profile images
   shortcuts[i] = '';
descriptions[i] = 'View Pics';
       icons[i] = 'http://i94.photobucket.com/albums/l91/ZebraGang2/view_pictures.png ';
        urls[i] = "'http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID='+friendID";
           i++;

// Links directly to MAIL
   shortcuts[i] = '';
descriptions[i] = 'Send A Message';   
       icons[i] = 'http://i94.photobucket.com/albums/l91/ZebraGang2/message.png ';   
        urls[i] = "'http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+friendID";
           i++;
           
// Links directly to the add friend page   
   shortcuts[i] = '';
descriptions[i] = 'Add To Friends (You Whore)';
       icons[i] = 'http://i94.photobucket.com/albums/l91/ZebraGang2/add_friend.png ';
        urls[i] = "'http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID";
        //urls[i] = "'#'";
        //code[i] = "shortcut.name = friendID;";
        //code[i]+= "shortcut.addEventListener('click', function(){ quickFriendRequest(this.name); }, false);";
           i++;

// Links directly to Comment
   shortcuts[i] = '';
descriptions[i] = 'Leave A Comment';   
       icons[i] = 'http://i94.photobucket.com/albums/l91/ZebraGang2/add_comment.png ';   
        urls[i] = "'http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID=' + friendID";
           i++;

// Links directly to view Comment
   shortcuts[i] = '';
descriptions[i] = 'View Comments';   
       icons[i] = 'http://i94.photobucket.com/albums/l91/ZebraGang2/view_comments.png ';   
        urls[i] = "'http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + friendID";
           i++;









function quickFriendRequest(friendID){
	
	//alert(friendID);
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID="+friendID,
	  onload:function(details){quickFriendRequestSubmit(details)}
	});
	
}

function quickFriendRequestSubmit(details){
	    
	document.writeln(details.responseText.replace(/</, '&lt;'));
	form_url = details.responseText.match(/<form name="addFriend" action="(.*)?"/i)[1];
	input_hashcode = details.responseText.match(/name="hashcode" value="(.*)?"/i)[1];
	input_friendID = details.responseText.match(/name="friendID" value="(.*)?"/i)[1];
	//input_submit = details.responseText.match(/name="submit" value="(.*)?"/i)[1];
	
	formData  = '?hashcode='+input_hashcode;
	formData += '&friendID='+input_friendID;
	
	GM_xmlhttpRequest({
	  method:"POST",
	  data:formData,
	  url:form_url,
	  headers: {
        'User-agent': 'Mozilla/4.0 (compatible)',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer':'http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID,
     },
	  onload:function(details2){
	  	document.writeln(details2.responseText.replace(/</, '&lt;'));
	  }
	});
	
	    
}




/**************************************************\
|*  CORE CODE   -- DON'T EDIT BELOW THIS SECTION  *|
\**************************************************/

function friendIdFromHttp(request){

	friendMatch = request.match(/friendid=([0-9]*)/i);
	
	return (friendMatch.length >= 1) ? friendMatch[1] : '6366493';
	
}






// Select all links with a mid-size image inside them.
selectedLinks = document.evaluate("//a[img and contains(@href, '.viewprofile')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// iterate through list
for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {
	
	// Stuff we already know
	var friendLink = selectedLinks.snapshotItem(snapshotIndex);
	var friendPic = friendLink.firstChild;
	var friendID = friendIdFromHttp(friendLink.href);
	
	
	// Create shortcuts!
	shortcutGroup = document.createElement('div');
	
	for ( var shortcutIndex = 0; shortcutIndex < shortcuts.length; ++shortcutIndex){
		
		shortcutIcon = document.createElement('img');
		shortcutIcon.src = icons[shortcutIndex];
		shortcutIcon.alt = descriptions[shortcutIndex];
		shortcutIcon.setAttribute('style', 'border: none !important; width: auto !important; height: 16px !important;');
		
		shortcut = document.createElement('a');
		shortcut.href = eval(urls[shortcutIndex]);
		shortcut.title = descriptions[shortcutIndex];
		shortcut.appendChild(shortcutIcon);
		
		if (code[shortcutIndex]) eval(code[shortcutIndex]);
		//if (code[shortcutIndex]) alert(eval(code[shortcutIndex]));
		//if (code[shortcutIndex]) alert(code[shortcutIndex]);
		
		shortcutGroup.appendChild(shortcut);
		//shortcutGroup.setAttribute('style', 'height: 0px');
	
	}
	
	if (friendLink.nextSibling){
		friendLink.parentNode.insertBefore(shortcutGroup, friendLink.nextSibling);
	} else {
		friendLink.parentNode.appendChild(shortcutGroup);
	}
	
	
}

})(); 

