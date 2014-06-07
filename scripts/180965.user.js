// ==UserScript==
// @name          AnimeFTW's d2jsp post blocker
// @description   Hides posts from a defined list of users
// @namespace	  d2jsp.animeftw
// @include       http://forums.d2jsp.org/topic.php?t=*&f=*
// @include	  http://forums.d2jsp.org/topic.php?t=*
// @include	  http://forums.d2jsp.org/guild.php?t=*
// @include	  http://forums.d2jsp.org/post.php
// ==/UserScript==

(function(){
	// Block Posts
	function bp(u){
		var users = JSON.parse(localStorage["AnimePostBlocker"]);
		if(users instanceof Array != true){users = [];}
		users.push(u);
		localStorage["AnimePostBlocker"] = JSON.stringify(users);
		refresh();
	}
	// Unblock Posts
	function ubp(u){
		var users = JSON.parse(localStorage["AnimePostBlocker"]);
		if(users instanceof Array != true){users = [];}
		for(var i=0,l=users.length;i<l;i++){
			if(users[i] == u){ users[i] = "";}
		} 
		var a = [];
		for(var b=0;b<l;b++){
			if(users[b] != ""){a.push(users[b]);}
		}
		localStorage["AnimePostBlocker"] = JSON.stringify(a);
		refresh();
	}
	// Hide Posts
	function refresh(){

		if( localStorage["AnimePostBlocker"] == undefined ) localStorage["AnimePostBlocker"] = '[]';

		var users = JSON.parse(localStorage["AnimePostBlocker"]);
		var e = document.getElementsByTagName("a");
		for(var i=0,l=e.length;i<l;i++){
			if(e[i].getAttribute("href")){
				if(e[i].getAttribute("href").slice(0,4) == "user"){ // It's a user post... probably
					
					var isBlocked = false, isPost = false;

					if(e[i].parentNode.nextSibling){
						var z = e[i].parentNode.nextSibling.getElementsByTagName("div");
						var id = e[i].getAttribute("href").slice(11,e[i].getAttribute("href").length);
						
						if(z[0]){ isPost = true; }

						for(var j=0;j<users.length;j++){ // check each user ID
							if(e[i].getAttribute("href").length > 11){
								
								
								if(e[i].getAttribute("href").slice(11,e[i].getAttribute("href").length) == users[j]){ 
									isBlocked = true;
								}

							}
						}
					
						// Determine what happens to the post
						if( isPost ){
							
							if(z[0].getElementsByTagName("div")[0].getElementsByClassName("block-tag")[0]){
								var bNode = z[0].getElementsByTagName("div")[0].getElementsByClassName("block-tag")[0];
								bNode.parentNode.removeChild(bNode);
							}
							var y= document.createElement("a");
							y.setAttribute("style","color:#f66;font-weight:bold;");
							y.setAttribute("href", "javascript:void(0);");
							y.className = "block-tag";
							z[0].getElementsByTagName("div")[0].insertBefore(
								y,z[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0]);

							if(isBlocked){
								console.log("here");
								y.innerHTML = "[Unblock User]";
								y.onclick = (function(id){
									return function(){
										ubp(id);
									}
								})(parseInt(id));
								e[i].parentNode.parentNode.getElementsByTagName("dd")[0].getElementsByClassName("ppc")[0].innerHTML=
									"<div class='blocked-post' style='text-align:center;font-weight:bold;color:#f66;padding:.5em;'>This user is blocked.</div>";
							} else{
								console.log("here1");
								y.innerHTML = "[Block User]";
								y.onclick = (function(id){
									return function(){ 
										bp(id);
									}
								})(parseInt(id));
							}
						}
					}
					
				}
			}
		}
	}
	refresh();
})();