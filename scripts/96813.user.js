// ==UserScript==
// @name           Gawker Media Sites Classic Search
// @description    Enables one to search on Gawker Media Sites using the Gawker Media Sites Classic Userstyle
// @include        http://*jalopnik.com/*
// @include        http://*io9.com/*
// @include        http://*jezebel.com/*
// @include        http://*deadspin.com/*
// @include        http://*gawker.com/*
// @include        http://*kotaku.com/*
// @include        http://*gizmodo.com/*
// @include        http://*lifehacker.com/*
// ==/UserScript==

function toggle() {
	var ele = document.getElementById("rightcontainer");
        var ele2 = document.getElementById("date-nav");
	var ele3 = document.getElementById("toggle");
	if(ele.style.right == "-350px") {
		ele.style.right = "52px";
		ele2.style.left = "0px";
		ele3.innerHTML = ">>";
	}
	else {
		ele.style.right = "-350px";
		ele2.style.left = "-50px";
		ele3.innerHTML = "<<";
	}

}

function addHeader() {
    var div = document.getElementById('date-nav');
	
    if(!div) { return; }

    var button = document.createElement("div");
	button.id="toggle";
        button.innerHTML = "<<";
	button.addEventListener("click", toggle, false);
    div.insertBefore(button, div.childNodes[0]);
}

addHeader();