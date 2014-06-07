// ==UserScript==
// @name		normal.dj
// @version		1.0
// @description		Are you fucking pissed because of the jumping fuckers on plug.dj? Me too. With this script you can kill them easily.
// @author		Majko
// @icon		http://i.imgur.com/qx6DVhL.jpg
// @include		http://plug.dj*
// ==/UserScript==


(function() {

	var tries = 0;
    
    function moveThatShitUp()
    {
        document.getElementById("user-container").style.transition = "top 1s, left 1s";
        document.getElementById("user-container").style.top = "357px";
        document.getElementById("user-container").style.left = "458px";
        document.getElementById("user-container").style.width = "280px";
        document.getElementById("user-container").childNodes[0].style.transition = "opacity 3s";
        document.getElementById("user-container").childNodes[0].style.opacity = "0.93";
        document.getElementById("footer-container").style.transition = "top 1s";
        document.getElementById("footer-container").style.top = "460px";
        document.getElementById("dj-booth").style.transition = "top 1s";
        document.getElementById("dj-booth").style.top = "322px";
        document.getElementById("user-meta-line").remove();
        document.getElementById("join-container").style.left = "178px";
        document.getElementById("join-container").style.height = "80px";
        document.getElementById("user-fans").style.left = "92px";
    }

    function deleteBastards()
    {
       	document.getElementById("audience-canvas").style.display = "none";
        document.getElementById("booth-canvas").style.display = "none";
        document.getElementById("dj-canvas").style.display = "none";
        document.getElementById("map-canvas").style.display = "none";
        document.getElementById("dj-console").style.display = "none";
        document.getElementById("audience-canvas").remove();
        document.getElementById("booth-canvas").remove();
        document.getElementById("dj-canvas").remove();
        document.getElementById("map-canvas").remove();
        document.getElementById("dj-console").remove();
    	console.log("Teh bastrads are gone!!!1!!"); 
        moveThatShitUp();
    }
	
    function tryToDeleteThem()
    {
        if (document.getElementById("audience-canvas")==null)
        {
            console.log("Can't find #audience-canvas. Wat is wrong?");
            tries++;
            if (tries<10) setTimeout(tryToDeleteThem,1000);
        }
        else
        {
            deleteBastards();
        }
    }
    
    setTimeout(tryToDeleteThem,3000);

})();