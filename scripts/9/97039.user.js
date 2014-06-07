// ==UserScript==
// @name           Nexus Random File Link
// @namespace      http://userscripts.org/users/161086
// @description    Adds "random file" and "random image" links to the navigation bar on all Nexus sites.
// @include        http://fallout3nexus.com/*
// @include        http://www.fallout3nexus.com/*
// @include        http://tesnexus.com/*
// @include        http://www.tesnexus.com/*
// @include        http://newvegasnexus.com/*
// @include        http://www.newvegasnexus.com/*
// @include        http://dragonagenexus.com/*
// @include        http://www.dragonagenexus.com/*
// ==/UserScript==

(function insertContent(){
	var href = window.location.href;
	
	//Set stuff for the site currently on
	if(href.indexOf("fallout3nexus.com") != -1){
		var top = 15751;
		var bottom = 1;
		var url = "http://fallout3nexus.com/downloads/file.php?id=";		
		var topb = 22275;
		var urlb = "http://fallout3nexus.com/imageshare/image.php?id=";
	}
	else if(href.indexOf("tesnexus.com") != -1){
		var top = 37153;
		var bottom = 1;
		var url = "http://tesnexus.com/downloads/file.php?id=";
		var topb = 82649;
		var urlb = "http://tesnexus.com/imageshare/image.php?id=";
	}
	else if(href.indexOf("dragonagenexus.com") != -1){
		var top = 2092;
		var bottom = 1;
		var url = "http://dragonagenexus.com/downloads/file.php?id=";
		var topb = 6266;
		var urlb = "http://dragonagenexus.com/imageshare/image.php?id=";
	}
	else {
		var top = 40339;
		var bottom = 34800; //Apperantly files don't start at #1 on NVNexus, which is weird
		var url = "http://newvegasnexus.com/downloads/file.php?id=";
		var topb = 8822;
		var urlb = "http://newvegasnexus.com/imageshare/image.php?id=";
	}
	
	//Get random file
	var cur = Math.floor(Math.random() * (top + 1 - bottom + 1) + bottom);
	url += cur;
	//Get random image
	var curb = Math.floor((topb + 1) * Math.random());
	urlb += curb;
	
	//Did we hit an error page?
	if (href.indexOf("error.php?") != -1 && href.indexOf("error=file_exist") != -1){
		window.location = url;
	}

	//Inject links into page
	var a = document.getElementsByTagName("ul");
	if(a != null){
		for(i=0;i < a.length;i++){
			//Quick and dirty way to make sure it's inserted into the right <ul> tags
			if(a[i].innerHTML.indexOf("<a href=\"/downloads/\">Index</a>") != -1){
				a[i].innerHTML = "<li><a href='" + url + "'>Random file</a></li>" + a[i].innerHTML;
			}
			else if(a[i].innerHTML.indexOf("<a href=\"/imageshare/\">View images</a>") != -1){ 
				a[i].innerHTML = "<li><a href='" + urlb + "'>Random image</a></li>" + a[i].innerHTML;
			}
		}
	}
	
	//Inject credits into footer because I like being reminded of my epicness :P
	var foot = document.createElement("div");
	foot.innerHTML = "<p>Random file Greasemonkey script by <a href='http://newvegasnexus.com/modules/members/index.php?id=707349'>Argomirr</a>.<br>Thanks for using!</p>";
	var footer = document.getElementById("footer");
	footer.appendChild(foot);
})();