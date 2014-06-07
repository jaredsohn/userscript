// ==UserScript==
// @name          Ubuntu Forums Dark  (easiest on the eyes) part 2
// @namespace     http://userstyles.org
// @description	  this is part 2 it contains 1/4 of the image
// @author        tjwoosta
// @homepage      http://userstyles.org/styles/16749
// @include       http://ubuntuforums.org/*
// @include       https://ubuntuforums.org/*
// @include       http://*.ubuntuforums.org/*
// @include       https://*.ubuntuforums.org/*
// ==/UserScript==
(function() {
var css = "/****UbuntuForums.org Dark part2****/ /****Created by: tjwoosta ****/ @namespace url(http://www.w3.org/1999/xhtml); /**IMAGES**/ img[src*=\"images/buttons/firstnew.gif\"] {width:0px !important; height:15px !important; background:url(data:image/gif;base64,R0lGODlhCwAPAIQXAAEBAQgICBQUFCkpKTY2Njo6Oj09PUZGRkpKSktLS0xMTFRUVFZWVl1dXWBgYGJiYmNjY2RkZGVlZWZmZmlpaWpqamtra%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAB8ALAAAAAALAA8AAAVE4CdOUCQxYvpZrKWoolWxCby2NTzT9m7lKh9CFYH4HI2H6GGhsCizgchQqTidCUDqIHNGAjAGqyKwfSIWgvlTWGjXthAAOw%3D%3D) no-repeat !important; padding-left:30px !important; z-index:1 !important;} img[src*=\"images/buttons/collapse_tcat.gif\"] {width:0px !important; height:30px !important; background:url(data:image/gif;base64,R0lGODlhGwAZAKECAAAAAIqKiv%2F%2F%2F%2F%2F%2F%2FyH5BAEKAAIALAAAAAAbABkAAAIrlI%2Bpy%2B0Po5y02ouzxqH7D35MSIZjiQZnSgIOAMfyDD%2F0XW%2F6zvf%2BDwwiCgA7) no-repeat !important; padding-left:30px !important; z-index:1 !important;} img[src*=\"images/buttons/collapse_thead.gif\"] {width:0px !important; height:30px !important; background:url(data:image/gif;base64,R0lGODlhGQAZAOMKABoaGhsbGyMjIzAwMDQ0NDo6Ojw8PD09PT4%2BPoqKiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAA8ALAAAAAAZABkAAARREMlJq7046827%2F2AojqR4GGiqruoxHUksz%2FRMFC5i1HwtEAbJrkdMBAZBXZF4TBoIggBgSq1aA7%2FkoUAYeL%2FgsPeWQ5xY6FW5xG673%2FC4XBIBADs%3D) no-repeat !important; padding-left:30px !important; z-index:1 !important;} img[src*=\"images/buttons/lastpost.gif\"] {width:0px !important; height:15px !important; background:url(data:image/gif;base64,R0lGODlhFAAPAIQcAAMDAwcHBwkJCRYWFhoaGigoKC0tLT09PT4%2BPkBAQENDQ0tLS0xMTFFRUVVVVVdYV1paWltbW2JiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAB8ALAAAAAAUAA8AAAVK4CeOZGme4gWh7HdtU3ti26Yx5VvvPP%2BQlZ6QJxkFh8jM4nNEDhsfilOIOQSiU2KBlEB4EYfwwbJzDGQjckYhQKcnBoB7FCHM5yEAOw%3D%3D) no-repeat !important; padding-left:30px !important; z-index:1 !important;} img[src*=\"images/buttons/sortasc.gif\"] {width:0px !important; height:15px !important; background:url(data:image/gif;base64,R0lGODlhCwAPAIQXAAEBAQgICBQUFCkpKTY2Njo6Oj09PUZGRkpKSktLS0xMTFRUVFZWVl1dXWBgYGJiYmNjY2RkZGVlZWZmZmlpaWpqamtra%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAB8ALAAAAAALAA8AAAVE4CdOUCQxYvpZrKWoolWxCby2NTzT9m7lKh9CFYH4HI2H6GGhsCizgchQqTidCUDqIHNGAjAGqyKwfSIWgvlTWGjXthAAOw%3D%3D) no-repeat !important; padding-left:30px !important; z-index:1 !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
