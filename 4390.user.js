// ==UserScript==
// @name           MySpace  - Add Image Links w/Comment View
// @namespace      http://myspace.com/____
// @description    Adds a set of links on small images.
// @include        http://myspace.com/*
// @include        http://*.myspace.com/*
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

// View All Comments
   shortcuts[i] = 'viewComments';
descriptions[i] = 'View All Comments';   
       icons[i] = 'http://static.flickr.com/43/76961892_3c9191dd92_o.png';   
        urls[i] = "'http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + friendID";
           i++;

// Links directly to profile images
   shortcuts[i] = 'viewImages';
descriptions[i] = 'View Friend\'s Images';
       icons[i] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKrSURBVHjaYvz//z8DIyMjAxGAGYiZoPRfIP4HpeEAIIBYSDCADYhZofR3IP4NxL+QDQcIICYChoHkOYGYD4iFQfj/10PPoHxkDFLDBBBATES4jOP/o46XQFoMiCUZNncwgGkGBgmQ2P+nM0ByHCC1AAHEAAozPIAV6iLN/3OjQQojgDgZiKOA2P//DG+QmCZUDStAADFCI4AZqpEDGibMaN4EuUpBSpxvqbScAAPDu68M735zMtx99CQAKH4LiJ8C8VeAAGJBcoEg1OmCUEORvQoSE1IS+8TQWSvPwLD+OUPMhh8gOREgvguNgL8AAQRzGdA6BkVPT89zfHx8DNzc3GBTQHL8/PwMLCwsDJ8/f2Lg5BJg+PT5NwMjJyvDx5cPGX5+/8awefNma6DSa0D8ASCAYC4DeU0QpLGkpARswL9//xhEREQYOjs7GR48eMAwceJEhk+fPoHTJBMTE8PevXsZDhw4ANLLDdXPABBATMixBmKANIAwSEN1dTWDspIyQ2REBENWRgYDsvz379+RIwkcxgABhDVpgLw6YcIEBmVlZYa09DQG5sAAhhdxcQwVeXkMQkJCOKMeIIAwcgAjMLIZf/9hEAZ68ef7jwwr//1heMzEwvDr6VMGCUlJhr9//+I0DCCAUAwD5dD/XOwMj3iZGTKSUxgWzpvL0NnSxvCbk4vB5c5thpKWFobXr18zsLKyYjUMIIBghoGs+wGKvRcvXzL8Y//P8OvZRwZnb2+G9/PnM7x4/pwhoryc4fLly+AIAGGQgdAC4gcswwMEEMwwUIZ9//3HD4ZpXT0MXGwcDH+ZGcFJg5eXF5w0QJGBDH79+sUgLi4OYr6H6mcACCBYOuPAk2hxgR9Qg15A6R8AAUQoO+EDf6Eu+gEtjv4CBBAjgYxOEgAIMAB9w9fFkUNCiQAAAABJRU5ErkJggg==';
        urls[i] = "'http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID='+friendID";
           i++;

// Links directly to MAIL
   shortcuts[i] = 'sendMail';
descriptions[i] = 'Send Friend a message';   
       icons[i] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALlSURBVHjaYvz//z8DLQFAADEx0BgABBDNLQAIIJpbABBANLcAIIBYYAxGRkZmIMUKxBxAzAbEzETo/4uEmZH0/ALiH0D8GyCAWJAUgwwXBGIJKM1BhAU/oPg7EHNCzQBZ9haIXwHxJ4AAQrYAZKBEZkbauYP7djPIKqoy6OrqMrx794GBh4+P4f/fXwzffnxg+POHiYGLnZOBlYObYc+2DQyJITEMpW3N0e9nhS7l+PQQbhhnySl5IPUVIICQLQAFi+CLl58ZEpLTGPbu288QGxPHoKevx/D0ySMGVmZuBhb2Hwz/gcq4uXgZtm3dyXD65HGGZx/vgfSKgQz/wSfP8F3SkEHKt8oWFDwg3wAEELIFoPDjEBXjZMjMzGL49PkrQ2RYAENn32QGSQlRBq6//xk+/f3LwMvPw7B//wqGpUuXMRgALWfm/ApzcToDw6lPDAyrP0CDByTxDyCAMFLRh4+fGL4z/2Rw8rBkyCzIZigvymV4/folAyPnPwZpOQGGTdvWgA139HJg0NJTg+v7kik2ExhMy4HMJ0gW/AUIIBaMdCsgzvDp2UcGEX5ZBmtzSYaHfs8ZmpraGLzdIxlevnjCcPX6NQZnO28Gn9AkhlObNzL8/Q7W9o1n+is3oOtBkfABZjhIAiCAMHzA8foDAwsbN8Pnz98Z2Dh4GBLTchmSk1MY/jN/YGDn+cfg6GLGEBTmzcD95yPDj38fGf6yQpLr/VOTd0FTFCiJ/oOZBxBALGhp+sdfLkYGcTFBhqdPHzO8ePGQQUhAmMHM3AwYY/8Z/n1jApK/GRj/iDL8+POBgYubm+HHd3aQ3leKZrnq0OT5C+Z6EAAIIGQLQBLvv/z4yDB50gSGC1dPM3ACk+O7D5+AlvAxfP/5nYH5PxfDz98/GNhZORhYWdmBlryH6QWF+Wd014MAQAAxwoprYE7mIDOjgWx5AaV/oCsACCBkC8gtKuDFAnLQwABAADHSusIBCDAAyRv1nMcpvFkAAAAASUVORK5CYII=';   
        urls[i] = "'http://mail3.myspace.com/index.cfm?fuseaction=mail.message&friendID='+friendID";
           i++;
           
// Links directly to the add friend page   
   shortcuts[i] = 'addFriend';
descriptions[i] = 'Add to Friends';
       icons[i] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMsSURBVHjaYvz//z8DIyMjAxQwAzEbELMDMQsQ/wPiH0D8C4j/MGABAAHEgsRmFhQU5Pn+/bsQ0FCxP3/+cALFfv/9+/c1kH4DxJ9BfHQDAAIIZgDICewsLCxi5ubmTrKyss1OTk6ily5d+vvx48f2+fPnrwTKPwLiv1BXwQFAADGAvAAETEAsBHSBbVhY2I0HDx78//bt2/9Hjx79Lyws/J+YmJgLlJdCczEYAAQQExKbzcHBwUpfX19VTEyM4dOnTwzi4uIMKioqDCIiIurQsGFENwAggJBN/Hf48OGLAgIC396+fcsjKirK8O7dO4YvX758BYLH0ED8j24AQADBDABJ/H7z5s1HDQ2NU1OnTrUH2s4MDFAGoLcOT5s27SQ0AJmgGB4OAAHEhESD8YIFCw49fvz4/6xZsxhev37NMHfu3NNAcW4gFoRiTmSXAwQQjAHyHx/Q/1rCwsLuQJrZ3d2d4fnz5wz8goIhkqIizIx/f6g9e/cFZMkaIH4LxN9ALgEIIJgBHEAsKi8vPz0+Pp4Z6A0GYJQy8PPzM7z88E3T8sZuzQo3BgaHjQyvz7xhuARUex+IX4ASGUAAwQxgBWJeoO0McnJyDL9//WI4e+Eiw09GFoa7z14y2AAdzc3FwPD9L1itFxA/AOL1oAQGEEAsSGHABkoTTExMDJ9//maYXlvCYPb5GYMi0GhHTUiwZegyiD57xFBwB+j41a8YjoJSJ0AAYSQMkCHfgRGmKfSPYYI11HOskDjIMQDSRgwMp+4CDdgMzi9MAAEEMwCcaUD+5uLiYmBi/8/wlUeOYcpTFoZPX78yOEi+Z7CSYWCYfY3h3+0nDN+ffAZH+1dQ0gYIIJgBoNz24dmzZ8y7d+9mYGZmZtB1DWB4z8TOsPfISQbeq6sYrBQYGHZeZHi58TXDRKB/rwLVvwRZChBAsLwAcqgkEBsCsRM0oPyBOIFLQPhAgzHD/1uxDP/9BBlAOdMdiBWgepgBAogRWh4wQ33KAU0TzFDMD8TSMvwMs4SBoo/eMTx6/5chDSj2FJq9GQACiBGtQEEGjNBUJwDKqVALviGVDSBvMwAEGACCcgb/9CvQAwAAAABJRU5ErkJggg==';
        urls[i] = "'http://www.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID";
        //urls[i] = "'#'";
        //code[i] = "shortcut.name = friendID;";
        //code[i]+= "shortcut.addEventListener('click', function(){ quickFriendRequest(this.name); }, false);";
           i++;

// Links directly to Comment
   shortcuts[i] = 'sendMail';
descriptions[i] = 'Leave Friend a Comment';   
       icons[i] = 'http://static.flickr.com/43/76961892_3c9191dd92_o.png';   
        urls[i] = "'http://comments.myspace.com/index.cfm?fuseaction=user&circuitaction=viewProfile_commentForm&friendID=' + friendID";
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
selectedLinks = document.evaluate("//a[img[contains(@src, '_s.')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


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
		shortcutIcon.setAttribute('style', 'border: none !important;');
		
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


