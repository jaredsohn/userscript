// ==UserScript==
// @name       Se7ensins Comment Counter
// @namespace  http://tcorley.me
// @version    0.1
// @description  Shows character count left on comments
// @match      http://www.se7ensins.com/forums/members/*
// @copyright  2012+, Fire30
// ==/UserScript==

var isFirstRun = true;
var alreadyHasCounter = true;
window.setInterval(function(){
	for (var i = 0; i < document.getElementsByClassName('submit').length; i++) 
    {
        if(isFirstRun)
        {
			document.getElementsByClassName('submit')[i].innerHTML += "<span id=" + i.toString() + " title='Characters remaining' class='statusEditorCounter'>420</span>";
            if(document.getElementById('statusEditorCounter').innerHTML == "" && alreadyHasCounter)
            {
				document.getElementsByClassName('submitUnit')[0].innerHTML += "<span id='swag' title='Characters remaining' class='statusEditorCounter'>420</span>";
                alreadyHasCounter = false;
            }
        }
        else
        {
			document.getElementById(i.toString()).innerHTML = 420 - document.getElementsByName('message')[i + 1].value.length;
            if(!alreadyHasCounter)
            {
				document.getElementById('swag').innerHTML = 420 - document.getElementsByName('message')[0].value.length;
            }
        }
	}
    isFirstRun = false;
}, 100);