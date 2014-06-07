// ==UserScript==
// @author	   Brainnovate
// @name           Digg UserIcons
// @description    Brings back user icons to the Digg User Interface.
// @include        http://digg.com/*
// @version        0.3.0

// ==/UserScript==

(function(){

    var stories = 15;
    
    function getUserName(element) {
        
        var storyText = element.getElementsByClassName('body')[0];
        var user = storyText.nextSibling.nextSibling.getElementsByTagName('a')[0].innerHTML;        
        
        return user;
    }

    function getStoryShortcut(element) {
    
        var url = element.getElementsByClassName('body')[0].href;
        var u = url.split('/');
        var shortcut = u[u.length-1];
        
        return shortcut;
    }

    function appendIcon(element) {
	
        var username = getUserName(element);
	var userSpan = document.createElement("span");
        var bbdiv = document.createElement("div");
    var storyShortcut = getStoryShortcut(element);
        
        userSpan.innerHTML = "<span class='tool'><img src='http://digg.com.nyud.net/users/" + username + "/s.png' style='padding:1px;border-width:1px;border-color:#ccc;border-style:solid'></span><span class='tool' style='margin-left: -2px';><a href='http://digg.com/users/" + username + "'/>" + username + "</a></span></span>";
        bbdiv.innerHTML = "<div class='tool' style='float:right;'> <a href='http://biggboard.brainnovate.com/stories/" + storyShortcut + "?source=GM' target='_blank'/>Track on Biggboard</a></div>";      


        var madepop = element.getElementsByClassName('news-details')[0]//.appendChild(userSpan);
        madepop.insertBefore(userSpan, madepop.lastChild.previousSibling.previousSibling);
        element.getElementsByClassName('news-details')[0].appendChild(bbdiv);
    }
	
    for (j=0; j < stories; j++) {
       var enclosure = document.getElementById('enclosure' + j);
       if (enclosure) {
           appendIcon(enclosure);
       } else {
           break;
       }
    }

})();