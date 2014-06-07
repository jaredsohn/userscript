// ==UserScript==
// @name           Hide Announcements
// @namespace      GLB
// @description    hides announcements on home page
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var elHead = getElementsByClassName("medium_head",document)[0];
	var elA = document.createElement("a");
	elA.setAttribute("id", "hide_announcement");
	elA.setAttribute("name", "1");
	elA.innerHTML = "( Hide )";
	elHead.appendChild(elA);

	var elHide = document.getElementById("hide_announcement");
	elHide.addEventListener("click", hideAnnouncements, false);
	
	hideAnnouncements();
}

function hideAnnouncements() {
	console.log('test');
	var state = document.getElementById('hide_announcement').getAttribute("name");
	var tblMain = document.getElementsByTagName("table")[1];
	
	if (state == 0){
		tblMain.setAttribute('style','');
		document.getElementById('hide_announcement').setAttribute("name","1");
		document.getElementById('hide_announcement').innerHTML = '( Hide )';
	}

	else {
		tblMain.setAttribute('style','visibility: hidden; display:none;');
		document.getElementById('hide_announcement').setAttribute("name","0");
		document.getElementById('hide_announcement').innerHTML = '( Show )';
	}
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