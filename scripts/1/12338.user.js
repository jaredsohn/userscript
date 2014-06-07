window.addEventListener("load", function(e) {

        var title = document.title;
        var vidURL = document.location + ' ';
        var vidURLarray = vidURL.split("/");
        if (vidURLarray[3] == "user") {
            var vidID = vidURLarray[6];
        }else{
            var vidID = vidURLarray[5];
        }

	document.getElementById("header-nav").getElementsByTagName("li")[4].style.display = "none";
        
	var ddLink = '<li><a href="http://video.stage6.com/' + vidID + name + '/.divx' + '" class="vid-channel function">Download Video</a></li>';
        var codeSnip = document.getElementById('share-video').innerHTML;	
	codeSnip = codeSnip + ddLink;
        document.getElementById('share-video').innerHTML = codeSnip;
		
	var ddLink = '<li><a href="http://video.stage6.com/' + vidID + name + '/.divx' + '" class="subnav">Download Video</a></li>';
        var codeSnip = document.getElementById('header-nav').innerHTML;	
	codeSnip = codeSnip + ddLink;
        document.getElementById('header-nav').innerHTML = codeSnip;
}, false);


// ==UserScript==

// @name          Direct Download Stage6

// @description   adds a download video button to the Stage6 site

// @include       http://stage6.divx.com/*/video/*

// ==/UserScript==
