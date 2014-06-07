// ==UserScript==
// @name           GLB - Crude Package Transfer Script
// @namespace      GLB
// @include        http://goallineblitz.com/game/team_package.pl*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var elContainer = document.getElementById("all_plays");
	var mainForm = document.getElementsByTagName("form")[0];
	
	var elText = document.createElement("textarea");
	elText.id = "txtPackage";
	elText.rows = 30;
	elText.cols = 150;
	elText.value = elContainer.innerHTML;
	elText.setAttribute("style","visibility: hidden; display: none;");
	
	var elEdit = document.createElement("a");
	elEdit.id = "updateButton";
	elEdit.innerHTML = "Edit Plays";
	
	var elShow = document.createElement("a");
	elShow.id = "showText";
	elShow.innerHTML = "Show Text Box";
	
	var elBlank = document.createElement("span");
	elBlank.innerHTML = "&nbsp;&nbsp;&nbsp;";
	
	var elBr = document.createElement("br");
	
	mainForm.appendChild(elEdit);
	mainForm.appendChild(elBlank);
	mainForm.appendChild(elShow);
	mainForm.appendChild(elBr);
	mainForm.appendChild(elText);	
	
	var elButtonEdit = document.getElementById("updateButton");
	elButtonEdit.addEventListener("click", editPlays, false);
	
	var elButtonShow = document.getElementById("showText");
	elButtonShow.addEventListener("click",
								  function() {
									  document.getElementById("txtPackage").setAttribute("style", "");
								  }, false);	
}

function editPlays() { 
		var tempContain = document.getElementById("all_plays");
		var strPlays = document.getElementById("txtPackage").value;
		var arrPlays = strPlays.split("<div class=\"package_play\" id=\"play_",10000);
		
		for(var i=1; i<arrPlays.length; i++) {
			var tempString = new RegExp(arrPlays[i].split("\"",1)[0],"gi");
			strPlays = strPlays.replace(tempString,"n" + (i-1));
		}
		
		tempContain.innerHTML = strPlays;
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};
