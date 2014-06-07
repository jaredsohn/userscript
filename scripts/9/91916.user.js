// ==UserScript== 
// @name New Grooveshark Ad Remover (html5)(Widens usable area)  
// @description Removes advertisements on Grooveshark and WIDENS the usable area. 
// @author LukeB
// @version 2.0
// @include *.grooveshark.*
// @include *grooveshark.*
// ==/UserScript==

var Content = document.getElementById("content");
function removeAdz(){		
var manner = document.getElementById("musicCapitalWrapper_160"); var calitalS = document.getElementById("capitalSidebar");
var capitalT = document.getElementById("searchCapitalWrapper_728"); var capitalR= document.getElementById("searchCapitalWrapper_300");
var exploreT = document.getElementById("exploreCapitalWrapper_728"); var exploreR = document.getElementById("exploreCapitalWrapper_300");			
        if (Content != null && calitalS != null) { Content.removeChild(capitalSidebar); }
	if(capitalT != null){ var capitalTParent = capitalT.parentNode; capitalTParent.removeChild(capitalT); }		
	if(capitalR != null){ var capitalRParent = capitalR.parentNode; capitalRParent.removeChild(capitalR); }
	if(exploreT != null){ var exploreTParent = exploreT.parentNode; exploreTParent.removeChild(exploreT) }
	if(exploreR != null){ var exploreRParent = exploreR.parentNode; exploreRParent.removeChild(exploreR); }
	if(manner != null){ mannerParent = manner.parentNode; mannerParentParent = mannerParent.parentNode; mannerParentParent.removeChild(mannerParent); }
}
Content.addEventListener("DOMSubtreeModified", removeAdz, true);