// ==UserScript==
// @name        Google Link
// @namespace   userscripts.org/users/HoMax
// @description Remove Google search link Redirects
// @include     https://www.google.com*
// @include     http://www.google.com*
// @version     3
// @grant       none
// ==/UserScript==


(function() {
    var links = document.getElementsByClassName("r");
    for(var i = 0; i < links.length ; i ++) {
        var link = links[i].firstChild;
        link.setAttribute('onmouseover', 'this.style.backgroundColor=\'#CCFFFF\'');
        link.setAttribute('onmouseout', 'this.style.backgroundColor=\'\'');
        link.setAttribute('style', 'font-weight: bold; font-size:17px;');
        link.removeAttribute("onmousedown");
        link.setAttribute('target', '_blank');
    }
    
    var allLinks = document.getElementsByTagName("a");
    for(var i = 0; i < allLinks.length ; i ++) {
        allLinks[i].setAttribute('onmouseover', 'this.style.backgroundColor=\'#CCFFFF\'');
        allLinks[i].setAttribute('onmouseout', 'this.style.backgroundColor=\'\'');
        allLinks[i].style.color = "#5588cc";
    }
    console.log("set allLinks begin");
})();

(function() {
	document.getElementsByTagName("body")[0].style.backgroundColor = "#222222";
	document.getElementsByTagName("body")[0].style.color = "#666666"
	
	var descList = document.getElementsByClassName("st");
    for(var i = 0; i < descList.length ; i ++) {
        descList[i].style.color = "#666666";
    }
    
    document.getElementsByClassName("fbar")[0].style.backgroundColor = "#222222";console.log("set fbar begin");
    document.getElementById("appbar").style.backgroundColor = "#222222";
    document.getElementById("hdtbSum").style.backgroundColor = "#222222";
    document.getElementsByClassName("sfbgg")[0].style.backgroundColor = "#222222";
    document.getElementById("hdtb_more_mn").style.backgroundColor = "#222222";
    document.getElementById("gbmmb").style.backgroundColor = "#222222";
    document.getElementById("gbd5").style.backgroundColor = "#222222";
    //document.getElementById("gs_tti0").style.backgroundColor = "#222222";
    window.setTimeout(function() { 
        document.getElementById("gs_id0").style.backgroundColor = "#222222";
        document.getElementById("lst-ib").style.color = "#666666";
        console.log("finish");
    }, 200);

})();