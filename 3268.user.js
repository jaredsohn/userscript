// ==UserScript== 
// @name          MySpace Comment Box PLUS
// @description   Modifies comment boxes in user profiles
// @include       http://*.myspace.com/*
// ==/UserScript== 

(function() {
	var friendID;
	var query = window.location.search.substring(1);
	var vars = query.split("&");
 	for (var i=0;i<vars.length;i++) {
 		var pair = vars[i].split("=");
    		if (pair[0] == 'friendid' || pair[0] == 'friendID') {
      			friendID = pair[1];
    		}
  	}

	var userName;
	var elems = document.getElementsByTagName("*");
	for ( var cls, i = 0; ( elem = elems[i] ); i++ )
	{
		if ( elem.className == "nametext" )
		{
			userName = elem.innerHTML;
		}
	}

	var allTables = document.getElementsByTagName('table');
	for(var i=0; i<allTables.length; i++){
		if(allTables[i].innerHTML.indexOf('Friends Comments')<400 && allTables[i].innerHTML.indexOf('Friends Comments')>0){
			var friendHTML = '<tr><td colspan="2" class="orangetext15"><span style="text-align:left">&nbsp;&nbsp;&nbsp;Leave  '+ userName +'  a comment. </span><br><br /><form method="post" action="http://collect.myspace.com/index.cfm?fuseaction=user.confirmComment" style="text-align:center"><input type="hidden" name="friendID" value="' +  friendID + '"/><textarea name="f_comments" cols="64" rows="5" style="background-color:FFFFFF; border-width:1px; border-style:solid; border-color:000000; color:000000;"></textarea><br /><input type="submit" value="Add Comment" /></form></td></tr>';
			
			var numComments = 6;
			var commentArr = allTables[i].getElementsByTagName('tr');
			friendHTML = friendHTML + '<tr><td class="orangetext15" colspan="2">&nbsp;&nbsp;&nbsp;' + userName + '\'s <span class="redtext">' + Math.min(numComments, commentArr.length) + '</span> latest comments<br><br></td></tr>';

			for (var q = 4; q < 4 + numComments && q < commentArr.length; q++) {
				friendHTML = friendHTML + '<tr>' + commentArr[q].innerHTML + '</tr>';
			}

			allTables[i].innerHTML = friendHTML;
		}
	}
}
)();