// ==UserScript==
// @name				TheFancy - J and K scrolling
// @version			2.4
// @namespace	JTBrinkmann
// @description		adds scrolling using the J and K key to theFancy.com
// @domain          thefancy.com
// ==/UserScript==

// Inject our main script to load after the page and jQuery are loaded
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + (function () {


// Scroll posts using J and K
JKscroll = {index: -1, newIndex: -1, scrollSpeed: 150, debug: false}; // you can modify scrollSpeed as you wish
$("body").live("keydown", function(event){
if(event.keyCode == 74 || event.keyCode == 75){ // J or K
	var marginTop=75;
//	var posts = $("#content>ol>li, #content .content-wrapper, #content .figure-row:not(:first-of-type)");
	var posts = $(".stream>li, .content-wrapper, .content-wrapper .figure-row:not(:first-of-type)");
if(JKscroll.debug) {
	console.log("key-scroll");
	console.log("> key:", event.keyCode==74 ? "J (down)" : "K (up)");
	console.log("> offset:", document.body.scrollTop);
	console.log("> index:", JKscroll.index, "("+!(!(JKscroll.index+1))+")");
	console.log("> newIndex", JKscroll.newIndex, "("+!(!(JKscroll.newIndex+1))+")");
}
	JKscroll.index = (JKscroll.newIndex+1 || JKscroll.index+1 || 0)-1;
	if(!(JKscroll.index+1)) {
JKscroll.debug && console.log(">>> calculating new index...", posts);
		posts.each(function(i, post){
			if(post.offsetTop-marginTop>=document.body.scrollTop)
				return (JKscroll.index = i) && false
		})
	}
JKscroll.debug && console.log("> current Post:", JKscroll.index, posts.eq(JKscroll.index).find("figcaption").text(), posts.eq(JKscroll.index));
	if(event.keyCode == 74 && JKscroll.index+1  && JKscroll.index+1 != posts.length) { // Scroll down (if current post is not the las (currently loaded) post
JKscroll.debug && console.log("> scrolling down")
		JKscroll.newIndex=JKscroll.index+1; // simply scroll one post down
		
		
	} else if(event.keyCode == 75 && JKscroll.index){ // Scroll up
JKscroll.debug && console.log("> scrolling up")
		if(JKscroll.index==-1) // fix if current post is the last (currently loaded) post
			JKscroll.newIndex=posts.length-1; // scroll one post up
		else
			if(posts[JKscroll.index].offsetTop-marginTop<document.body.scrollTop && !(JKscroll.newIndex+1)) // if current post is only partly shown...
				JKscroll.newIndex=JKscroll.index; // scroll to it
			else
				JKscroll.newIndex=JKscroll.index-1; // scroll one post up
	}
	
	if(JKscroll.newIndex+1) { // if trying to scroll to an other post
JKscroll.debug && console.log("scrolling to:", JKscroll.newIndex);
		var thisNewIndex = 1*JKscroll.newIndex; // to let the callback check, whether a new JK-scroll event has occured after this one
		$('body').animate({
			scrollTop: posts[JKscroll.newIndex].offsetTop-marginTop // the magic happens here
		}, JKscroll.scrollSpeed, function(){setTimeout(function(){
			if(thisNewIndex==JKscroll.newIndex) { // clear newIndex if no other JK-scroll event as occured after this one
				JKscroll.index = JKscroll.newIndex;
				JKscroll.newIndex=-1
			}
		}, 0)});
	}
JKscroll.debug && console.log("");
}});

window.onscroll=function(){JKscroll.index=-1} // reset current index if user scrolls




}).toString() + ')();';
document.body.appendChild(script);