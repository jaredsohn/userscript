// ==UserScript==
// @name			Facepunch Avaterrs
// @description		        Avaterrs ofcourse
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==


(function() {
	userposts = document.getElementsByClassName('userinfo');
    
	for (var i = 0, len = userposts.length; i < len; i++)
        {
            var userinfo = document.getElementsByClassName('userinfo')[i];
            var user = userinfo.getElementsByClassName("username_container")[0].getElementsByTagName("a")[0].href.match("/members/(.*?)-")[1];
            var avatar = document.createElement("img");
            avatar.src = "http://www.facepunch.com/image.php?u=" + user;
            //alert("hi");
            var div = userinfo.getElementsByTagName("div")[1];
            div.getElementsByTagName("a")[0].innerHTML = "";
            div.getElementsByTagName("a")[0].appendChild(avatar);
            
	}
})();