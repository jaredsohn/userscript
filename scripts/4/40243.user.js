// ==UserScript==
// @name           MySpace Add Comment Box
// @namespace      kennydude
// @description    Adds a "add comment" box to the comment section to be quicker
// @include        http://*myspace.com/index.cfm?*fuseaction=viewImage*
// ==/UserScript==
/* thnx about.com */
var qsParm = new Array();
function qs() {
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}
	}
}
qs();
/* end of their code */
function $(v){return document.getElementById(v);}

url = "http://viewmorepics.myspace.com/index.cfm?fuseaction=postImageComment&friendID="+qsParm["friendID"]+"&albumID="+qsParm["albumID"]+"&imageID="+qsParm["imageID"];

/* Add function commentbox! */
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function commentbox(){ document.getElementById("sheetcover").style.display=""; } function closecommentbox(){ document.getElementById("sheetcover").style.display="none"; }';
headID.appendChild(newScript);

var sheetcover = document.createElement("div");
sheetcover.id = "sheetcover";
sheetcover.setAttribute("style","background: #000;position: absolute;top: 0;left:0;width:100%;height:100%;text-align: center;display: none");
var internal = document.createElement("div");
internal.innerHTML = '<h2>Post a comment</h2><br/><br/><form action="'+url+'" method="post"><input id="__EVENTTARGET" type="hidden" value="" name="__EVENTTARGET"/><input id="__EVENTARGUMENT" type="hidden" value="" name="__EVENTARGUMENT"/><input type="hidden" name="__VIEWSTATE" value="/wEPDwULLTE5MzQwMTI4MjIPFgIeCkFsYnVtVGl0bGUFFUVsZWFub3IgKGJhYnkgc2lzdGVyKRYCZg9kFgJmD2QWAgIDD2QWAgIBD2QWAmYQZGQWAmYPZBYCAgEPZBYCAgMPZBYCAgEPZBYEAgIPZBYKAgEPDxYCHghJbWFnZVVybAVUaHR0cDovL2MyLmFjLWltYWdlcy5teXNwYWNlY2RuLmNvbS9pbWFnZXMwMi8yL2xfNjRiYTg5OGNkNDViNDRjZDhhMDQzOWI2MjE4ZTViYWQuanBnZGQCAw8PFgIeBFRleHQFDUl0J3MgRWxlYW5vciFkZAIFDxYCHwIFJGN0bDAwX2N0bDAwX2NwTWFpbl9jcE1haW5fbGJsQ2FwdGlvbmQCCw8WAh4HVmlzaWJsZWdkAhUPFgIfA2gWAmYPZBYCAgEPDxYCHwNoZGQCAw9kFgICAg9kFgICAQ9kFgRmDxYCHwNnZAIBDw8WAh8BBW5odHRwOi8vc2VjdXJpdHkubXlzcGFjZS5jb20vY2FwdGNoYS9jYXB0Y2hhLmFzcHg/U2VjdXJpdHlUb2tlbj0yMjI2QTk0NDM3RDA0RDZFODY5N0M5QTQ0Q0FCOTA2MiZkbD0wJmhvPTEmdWM9MWRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBSxjdGwwMCRjdGwwMCRjcE1haW4kY3BNYWluJGltZ0J0blBvc3RBQ29tbWVudA==" /><textarea name="ctl00$ctl00$cpMain$cpMain$tbxAddComment" rows=5 cols=40></textarea><br/><input type="submit" value="Post Comment" /><input type="hidden" value="10" name="ctl00$ctl00$cpMain$cpMain$imgBtnPostAComment.x"/><input type="hidden" value="2" name="ctl00$ctl00$cpMain$cpMain$imgBtnPostAComment.y" /></form><small>Created by <a href="http://therkm.net">kennydude</a> for myspace - <a href="#" onclick="closecommentbox()">close this box</a></small>';
internal.setAttribute("style", "background: #FFF; position: relative; top: 100px; width: 500px; height: 200px; padding: 10px; margin: 0 auto");
sheetcover.appendChild(internal);
$("content").appendChild(sheetcover);

$("liPostImageComment").firstChild.href="#";
$("liPostImageComment").firstChild.setAttribute("onclick", "commentbox();");
