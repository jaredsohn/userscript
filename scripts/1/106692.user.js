// ==UserScript==
// @name           Hide Darkside Eric!
// @namespace      HSK@apocalypex.net
// @include        http*://*.bungie.net/*
// @version			1.1
// ==/UserScript==
//I said I wouldn't make anymore scripts for Bnet. But this is a must.
var lists, topics, posts,
username = "Darkside Eric";
//search forum topics
lists = document.getElementsByClassName("grid");
for(var i = 0; i < lists.length; i++){
	topics = lists[i].getElementsByTagName("tr");
	for(var e = 0; e < topics.length; e++){
		var a = topics[e];
		if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[1]){
			if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[1].innerHTML === username){
				a.getElementsByTagName("p")[0].getElementsByTagName("a")[1].innerHTML = "";
			}
		}
		if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[0].innerHTML === username){
			a.parentNode.removeChild(a);
		}
	}
}
//search pinned topics
lists = document.getElementsByClassName("pinned_topic_grid");
for(var i = 0; i < lists.length; i++){
	topics = lists[i].getElementsByTagName("tr");
	for(var e = 0; e < topics.length; e++){
		var a = topics[e];
		if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[1]){
			if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[1].innerHTML === username){
				a.getElementsByTagName("p")[0].getElementsByTagName("a")[1].innerHTML = "";
			}
		}
		if(a.getElementsByTagName("p")[0].getElementsByTagName("a")[0].innerHTML === username){
			a.parentNode.removeChild(a);
		}
	}
}
//search posts
posts = document.getElementsByClassName("login");
if(posts[0]){
	if(posts[0].getElementsByTagName("a")[0].innerHTML === username && document.getElementById("ctl00_mainContent_cp1_skin_firstPage")){
		window.location.assign(document.getElementById("ctl00_forumHeader_forumTitleLink").href);
	}
};
for(var i = 0; i < posts.length; i++){
	if(posts[i].getElementsByTagName("a")[0].innerHTML === username){
		var post = posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		console.log(post);
		post.parentNode.removeChild(post)
	}
}
//hide profile
if(document.getElementById("ctl00_mainContent_header_lblUsername")){
	if(document.getElementById("ctl00_mainContent_header_lblUsername").innerHTML === username){
		window.location.assign("/Account/Profile.aspx"
	);
}
}
