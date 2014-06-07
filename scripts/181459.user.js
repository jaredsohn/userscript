// ==UserScript==
// @name       Youtube Fixer
// @namespace  http://www.youtube.com/
// @version    0.1
// @description  Fixes many issues with Youtube (logo, watch later list, show all comments)
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2013+, Matic Leva
// ==/UserScript==

function removeElement(node) {
    node.parentNode.removeChild(node);
}

function init()
{
    if(!('contains' in String.prototype))
      String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };
    
    logo();
    all_comments();
    watch_later();

}

function logo(){
	document.getElementById('logo-container').setAttribute('href', 'http://www.youtube.com/feed/subscriptions');
}
function all_comments(){
    var videos = document.getElementsByClassName('vm-video-item-content');
    for(var v = 0; v < videos.length; v++)
    {
		var video_link = videos[v].getElementsByClassName('vm-video-title-content')[0].getAttribute("href");  
        var comments = videos[v].getElementsByClassName('vm-video-metric video-comments');
        
    	if(comments[0].parentNode.tagName.toLowerCase() != "a")
        {
            var link = document.createElement('a');
            link.setAttribute('href', "/all_comments" + video_link.substr(video_link.indexOf("?v=")));
            link.appendChild(comments[0]);
            videos[v].getElementsByClassName('vm-video-metrics')[0].appendChild(link);
        }
    }
}

function watch_later()
{
    var current_url = document.URL.toString();
    
    if(current_url.contains("feed/subscriptions"))
    {
    	var watch = document.getElementById('channel-navigation-menu').children[1].cloneNode(true);
    	watch.getElementsByTagName("a")[0].href = "/feed/watch_later";
    	watch.getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML = "Watch later";
        
        removeElement(document.getElementById('channel-navigation-menu').children[1]);
    	document.getElementById('channel-navigation-menu').appendChild(watch);
	}
}
init();