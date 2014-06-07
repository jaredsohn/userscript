// ==UserScript==
// @name       Ignore ROBLOX Member
// @match      http://www.roblox.com/Forum/*
// ==/UserScript==

// Specify the blacklisted members below.
var ignored_members = [
    "example_member",
    "example_member2",
];

var class_name;
var desired_parent_index;
if(window.location.href.match(/roblox.com\/Forum\/ShowForum.aspx\?ForumID=*/i)) {
	class_name = "normalTextSmaller thread-link-container";
	desired_parent_index = 3;
}
else if(window.location.href.match(/roblox.com\/Forum\/ShowPost.aspx\?PostID=*/i)) {
	class_name = "normalTextSmallBold notranslate";
	desired_parent_index = 5;
}

for(element in ignored_members) {
	if(ignored_members.hasOwnProperty(element)) {
		ignored_members[element] = ignored_members[element].toLowerCase();
	}
}

var elements = document.getElementsByClassName(class_name);
for(var index = 0; index < elements.length; ++index) {
	var element = elements[index];
	if(ignored_members.indexOf(element.textContent.toLowerCase().trim()) != -1 && index != 0) {
		get_node(desired_parent_index, element).style.display = "none"; 
	}
}

function get_node(index, element) {
	for(index; index >= 0; --index) {
		element = element.parentNode;
	}
	return element;
}