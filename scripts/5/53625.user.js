// ==UserScript==
// @name           Pinboard with delicious tag suggestion
// @namespace      http://userscripts.org/users/92501
// @description    Harvests tag suggestions from delicious.com (will prompt for API login)
// @include        http://pinboard.in/add?url=*
// @include        http://pinboard.in/add?next=same&url*
// ==/UserScript==

// Sloppy script, coded it instead of sleeping, needs refactoring badly.
// Known issue: If there's a duplicate tag it won't disappear when clicking the suggestion.
// Another known issue: It's ugly when there's too many tags.

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText) }
  })
}

function suggest(tag) {
        // untested, couldn't get to work on my hackintosh at work, will debug later
        // should work though! uncomment it and give it a go.
        /*var check = document.getElementById("tag_" + tag);
        if (check != null) {
            return;
        }*/
	// write it, make it clickable
	var node = document.createElement("span");
	var tag_style = document.createAttribute("style");
	tag_style.nodeValue = "padding: 10px; display: inline-block;";
	var tag_id = document.createAttribute("id");
	tag_id.nodeValue = "tag_" + tag;
	var tag_class = document.createAttribute("class");
	tag_class.nodeValue = "suggested_tag";
	var tag_onclick = document.createAttribute("onClick");
	tag_onclick.nodeValue = "moveMe('" + tag + "');";
	node.setAttributeNode(tag_style);
	node.setAttributeNode(tag_id);
	node.setAttributeNode(tag_class);
	node.setAttributeNode(tag_onclick);
	var tag_text = document.createTextNode(tag);
	node.appendChild(tag_text);
	tags.appendChild(node);
}

function tagsuggest_callback(response) {
	// alright, we got a xml result. parse for recommended
	// and suggested tags. domparser hack due to 
	// GM_xhr not returning responseXML
	var parser = new DOMParser();
	var tree = parser.parseFromString(response,"text/xml");
	var suggestions = tree.getElementsByTagName("suggest")[0];
	// now walk through all the children

	for (var i=0; i<suggestions.childNodes.length; i++) {
		if ((suggestions.childNodes[i].nodeName == "popular")
			|| (suggestions.childNodes[i].nodeName == "recommended"))
			{
			suggest(suggestions.childNodes[i].childNodes[0].nodeValue);
		}
	}
}

function firstNodeOf(html){
 firstNodeOf.dummyDiv.innerHTML = html;
 return firstNodeOf.dummyDiv.firstChild;
 }
firstNodeOf.dummyDiv = document.createElement('div');
document.body.appendChild(firstNodeOf("<script>function moveMe(tag) { document.getElementById('tags').value+= ' ' + tag; document.getElementById('tag_' + tag).style.display = 'none'; }</script>"));

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

var inputs = document.getElementsByTagName("input"); 
var to_bookmark = "";
var tags_field = document.getElementById("tags");

for (var i=0; i < inputs.length; i++) {
	if (inputs[i].getAttribute("type") == "text") {
		if (inputs[i].getAttribute("name") == "url") {
			to_bookmark = inputs[i].value;
			break;
		}
	}
}

var tags = document.createElement("div");
var tags_id = document.createAttribute("id");
tags_id.nodeValue = "tags_list";
tags.setAttributeNode(tags_id);
var tags_title = document.createElement("div");
tags_title.appendChild(document.createElement("b").appendChild(document.createTextNode("Delicious suggested tags: ")));
tags.appendChild(tags_title);

// got the url to be bookmarked. grab the delicious api result.
get("https://api.del.icio.us/v1/tags/suggest?url=" + escape(to_bookmark), tagsuggest_callback);

insertAfter(tags, document.getElementsByTagName("form")[0]);