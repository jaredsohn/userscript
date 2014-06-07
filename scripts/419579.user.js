// ==UserScript==
// @name            Hide Facebook Sidebar
// @description     Hides the sidebar including Highlights, People you may know, etc.
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
var rightcolcnt = document.getElementById('rightCol') .innerHTML;
var rightcolstyle = document.getElementById('contentCol') .className;
var style;
function addGlobalStyle(css) {
    var head;
    head = document.getElementsByTagName('head') [0];
    if (!head) {
        return ;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function hideit()
{
    addGlobalStyle('.uiStreamBoulderStyle .uiUfi{width:90%;}');
    contentcol = document.getElementById('contentCol');
    document.getElementById('rightCol') .innerHTML = '';
    contentcol.className = 'noRightCol';
}
function showit()
{
    contentcol = document.getElementById('contentCol');
    document.getElementById('rightCol') .innerHTML = rightcolcnt;
    contentcol.className = rightcolstyle;
    head.removeChild(style);
}
function togglerightbar() {
    if (document.getElementById('rightCol') .innerHTML != '') {
        hideit();
    } else {
        showit();
    }
}
function func()
{
    var ul = document.getElementById('pageNav');
    var newLI = document.createElement('LI');
    var textinside = document.getElementById('navHome') .innerHTML;
    ul.appendChild(newLI);
    newLI.setAttribute('class', document.getElementById('navHome') .getAttribute('class'));
    newLI.setAttribute('id', 'toggleBarButton');
    newLI.onclick = function () {
        togglerightbar();
    };
    newLI.innerHTML = textinside;
    document.getElementById('toggleBarButton') .innerHTML = document.getElementById('toggleBarButton') .innerHTML.replace('Home', 'Toggle Sidebar');
    newLI.getElementsByTagName('a') [0].removeAttribute('href');
}

func();

addGlobalStyle(".uiStreamBoulderStyle .uiUfi{width:90%;}");	

function blub()
{
	
	contentcol=document.getElementById("contentCol");
	if(contentcol.className!="noRightCol")
	{
		document.getElementById("rightCol").innerHTML="";
		contentcol.className="noRightCol";
		
	}
}
blub();
document.addEventListener("DOMNodeInserted", blub, true);