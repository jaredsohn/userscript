/*
 *	Name:		Songza Video Toggle
 *	Version:	1
 *  Author:		Tim Dupree
 *				http://www.tdupree.com
 *				email: tim [AT] tdupree [DOT] com
 * 
 *	License:	Songza Video Toggle is released under the Open Source MIT License
 *				(c) 2008 Tim Dupree
 *
 *	Date:		Oct 2, 2008
 *
 *	Summary:	Allows users to show/hide videos on Songza.
 *
 */
// ==UserScript==
// @name           Songza Video Toggle
// @namespace      http://www.tdupree.com
// @description    Allows users to show/hide videos on Songza.
// @include        http://www.songza.com*
// @include        http://songza.com*
// ==/UserScript==
(function() {
	// Uncomment line below to enable debugging IO in firebug console
	//console = unsafeWindow['console'];	 //example: console.log("ouput: " + myOutputVar);

	var miscCol = document.getElementById("misc-col");
	if(miscCol){
		miscCol.style.position = "relative";

		var video = document.getElementById("video-ad-box");
		video.style.position = "relative";


		var toggleText = document.createElement("div");
		toggleText.style.position = "absolute";
		toggleText.style.top = "0px";
		toggleText.style.right = "0px";

		var mask = document.createElement("div");
		mask.style.position = "absolute";
		mask.style.width = "100%"
		mask.style.height = "100%";
		mask.style.backgroundColor = "#CC3300";
		mask.style.top = "0px";
		mask.style.left = "0px";
		mask.style.display = "block";
		mask.style.visibilty = "visible";
		mask.style.zIndex = "2";
		mask.setAttribute("id","mask");


		toggleText.innerHTML = "<a id='showHide' href='javascript:showHide()'>Toggle Video</a>";

		miscCol.appendChild(toggleText);

		if(document.getElementById('mediaplayer')){
			document.getElementById('mediaplayer').setAttribute("wmode","opaque");
			document.getElementById('mediaplayer').style.zIndex = "1";
			document.getElementById('mediaplayer').style.position = "absolute";
			document.getElementById('mediaplayer').setAttribute("bgcolor","#000000");
			document.getElementById('mediaplayer').setAttribute("showHide","hidden");
		}

		video.appendChild(mask);

		unsafeWindow.showHide = function (){
			var video = document.getElementById("mediaplayer");
			var text = document.getElementById("showHide");
			var mask = document.getElementById("mask");

			mask.style.zIndex = "2";
			if(video){
				video.setAttribute("wmode","opaque");
				video.setAttribute("bgcolor","#000000");
				video.style.zIndex = "1";
				video.style.position = "absolute";
			}

			if(!video.getAttribute("showHide") || video.getAttribute("showHide") == "shown"){
				mask.style.display = "block";
				mask.style.visibility = "visible";
				video.setAttribute("showHide","hidden");

			}
			else{
				mask.style.display = "none";
				mask.style.visibility = "hidden";
				video.setAttribute("showHide","shown");
			}
		}
	}

})();