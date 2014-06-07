// ==UserScript==
// @name           PM for BFH forum
// @namespace      http://userscripts.org/users/63816/bfh
// @description    Adds PM send buttons to the bfh forum
// @include        http://www.battlefieldheroes.com/forum/*
// ==/UserScript==

onload=function(){
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}
}

//Re-enable usercp pm menu
var usercp_pn_nav = document.getElementById('usercppms_e');
if(usercp_pn_nav!=null){
	usercp_pn_nav.innerHTML = usercp_pn_nav.innerHTML.replace("<!--","");
	usercp_pn_nav.innerHTML = usercp_pn_nav.innerHTML.replace("-->","");
	usercp_pn_nav.innerHTML = usercp_pn_nav.innerHTML.replace("--&gt;","");
	usercp_pn_nav.innerHTML = usercp_pn_nav.innerHTML.replace("&lt;!--","");
}

//Add button at the bottom of each post
pmElements = document.getElementsByClassName("author_buttons");
for ( var i=0, len=pmElements.length; i<len; ++i ){
	var regexp = /uid=([0-9]+)/;
	var match = regexp.exec(pmElements[i].innerHTML);
	if(match != null) {	
		pmElements[i].innerHTML = pmElements[i].innerHTML + "&nbsp;<a href=\"private.php?action=send&uid="+match[1]+"\"><img title=\"Send a private message\" alt=\"Send a private message\" src=\"http://cdn.battlefieldheroes.com/static/1266826520/modules/forum/images/postbit_pm.gif\"></a>";
	}
}

//Add reply button
postManagement = document.getElementsByClassName("post_management_buttons");
if(postManagement.length==1 && pmElements.length==1){
	var regexp = /uid=([0-9]+)/;
	var match = regexp.exec(pmElements[0].innerHTML);
	var uid = match[1];

	var regexp = /pmid=([0-9]+)/;
	var match = regexp.exec(postManagement[0].innerHTML);
	if(match != null) {	
		postManagement[0].innerHTML = "<a href=\"private.php?action=send&uid="+uid+"&pmid="+match[1]+"\"><img title=\"Reply to this private message\" alt=\"Reply\" src=\"http://cdn.battlefieldheroes.com/static/1266826520/modules/forum/images/pm_reply.gif\"></a>&nbsp;" + postManagement[0].innerHTML;
	}
}