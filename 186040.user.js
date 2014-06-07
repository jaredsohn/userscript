// ==UserScript==
// @name 		Celestus load corrector
// @include 	*celestus.fr/game*

// ==/UserScript==
 
var int = setInterval(function(){hideLoad();},1000);

 
function hideLoad()
{
if (document.readyState == "complete"){
 
	var load = window.frames[0].document.getElementById("Load");
	if (load)
	{
	if (load.style.visibility=="hidden")
		{
		load.style.display="none";
		clearInterval(int);
		}
	
	}
	}
}
