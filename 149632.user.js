// ==UserScript==
// @name        RITES User Switch
// @namespace   rites
// @description switches users from the user search page
// @include     http://rites-investigations.concord.org/users*
// @include	http://rites-investigations.staging.concord.org/users*
// @version     1
// @grant		none
// ==/UserScript==

var myuidurl = document.getElementById("userlinks").getElementsByTagName("li")[0].children[0].href;
var myuid = myuidurl.split("/")[4];

var create_form = function(item, uid) {

	var form = document.createElement("form");
	form.setAttribute("method","POST");
	form.setAttribute("action","/users/" + myuid + "/switch");
	form.setAttribute("accept-charset","UTF-8");
	
	var params = {};
	
	params["_method"] = "put";
	params["user[id]"] = uid;
	params["utf8"] = "✓";
	

	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hf = document.createElement("input");
			hf.setAttribute("type","hidden");
			hf.setAttribute("name",key);
			hf.setAttribute("value",params[key]);
			
			form.appendChild(hf);
		}
	}
	
	var input_submit = document.createElement("input");
	input_submit.setAttribute("value","Switch");
	input_submit.setAttribute("name","commit");
	input_submit.setAttribute("type","submit");
	
	form.appendChild(input_submit);
	
	var br = document.createElement("BR");
	item.appendChild(br);
	item.appendChild(form);
}
    
var items = document.getElementsByClassName("item");

for(var i = 0; i < items.length; i++) {

    var btn = document.createElement("BUTTON");
    var btntxt = document.createTextNode("SWITCH");    

    userid = parseInt(items[i].id.split("_")[2]);

	create_form(items[i], userid);
}

