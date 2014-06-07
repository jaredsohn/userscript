// ==UserScript==
// @name           giForumFilter
// @namespace      http://peters-webcorner.de
// @description    Filters forum posts by team ids
// @include        http://www.grid-iron.org/index.php?page=community&subpage=viewt&t=*
// @include        http://grid-iron.org/index.php?page=community&subpage=viewt&t=*
// @version        0.0.0.1
// ==/UserScript==


var timeout = 200;
window.setTimeout( function() {
	var abody, thisbody;
	//Edit only here!!!
	// example: to hide the ids 1,2 and 3 pls type
	// user_ids_to_hide="1,2,3";
	user_ids_to_hide="4010";
	//Don't edit anything below this remark!
	
	
	abody = document.evaluate(
	'//div[@style="width: 600px; border: 1px solid rgb(181, 182, 186); padding-bottom: 0px;"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	teams=user_ids_to_hide.split(",");
	
	for (var i = 0; i < abody.snapshotLength; i++) {
		
		thisbody = abody.snapshotItem(i);
		//alert(teams.length);
		for(var j=0; j<teams.length; j++){
			if(teams[j] != "") {
				if(thisbody.innerHTML.indexOf("team_id="+teams[j]) >=0) {
					originalhtml=thisbody.innerHTML;
					//get the users name
					username=originalhtml.substring(originalhtml.indexOf("team_id="+teams[j]),originalhtml.indexOf("team_id="+teams[j])+100);
					username=username.substring(username.indexOf("<b>")+3,username.indexOf("<b>")+103);
					username=username.substring(0,username.indexOf("</b>"));
					//thisbody.style.visibility="hidden";
					//thisbody.style.height="15px";
					originalhtml=originalhtml+"'''''''";
					originalhtml=originalhtml.replace(/'/g,"");
					originalhtml=originalhtml.replace(/"/g,"");
					
					originalhtml=stripHTML(originalhtml);
					
					thisbody.innerHTML="Hidden content by "+username+" (<a href=\"javascript:alert('"+originalhtml+"')\">show content</a>)";
				}
			}
		}
	}


},timeout);
function stripHTML(str){

	// remove all string within tags

	var tmp = str.replace(/(<.*['"])([^'"]*)(['"]>)/g, 

	function(x, p1, p2, p3) { return  p1 + p3;}

	);

	// now remove the tags

	return tmp.replace(/<\/?[^>]+>/gi, '');

}
