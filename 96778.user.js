// ==UserScript==
// @name           Gawker Plus
// @namespace      com.katai.gawkerplus
// @description    Edits to gawker layout for better navigation
// @include        http://*jalopnik.com/*
// @include        http://*io9.com/*
// @include        http://*jezebel.com/*
// @include        http://*deadspin.com/*
// @include        http://*gawker.com/*
// @include        http://*kotaku.com/*
// @include        http://*gizmodo.com/*
// @include        http://*lifehacker.com/*
// ==/UserScript==


//Globals - Edit to customize

var floatRightBar = true;

var gawkerSites = ['Gawker', 'Deadspin', 'Kotaku', 'Jezebel', 'io9', 'Jalopnik', 'Gizmodo', 'LifeHacker'];

var gawkerTags = [];
var deadspinTags = [];
var kotakuTags = ['speakup', 'tips'];
var jezebelTags = [];
var io9Tags = [];
var jalopnikTags = [];
var gizmodoTags = ['whitenoise', 'lifechanger', 'tips'];
var lifehackerTags = [];

///End Global


var tagList = [gawkerTags, deadspinTags, kotakuTags, jezebelTags, io9Tags, jalopnikTags, gizmodoTags, lifehackerTags];

var rbsHeight = document.getElementById("rightbar_scroller").style.height;


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('link')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function toggle() {
	var ele = document.getElementById("rightcontainer");
	var text = document.getElementById("toggle");
	var rbs = document.getElementById("rightbar_scroller");

	if(ele.style.zIndex == -1) {
		ele.style.zIndex = 1;

		if(floatRightBar)
			ele.style.top = "38px"


		rbs.style.height = parseInt(rbsHeight)-20 + "px";
		text.innerHTML = "-";
	}
	else {
		ele.style.zIndex = -1;

		if(floatRightBar)
			ele.style.top = "-1100px"


		rbs.style.height = "0px";
		text.innerHTML = "+";
	}

}

function addHeader() {
    var main = document.getElementById('main-container');
    if(!main) { return; }

    var div = document.createElement('div');

    //Add Links to Gawker Network
    var span = document.createElement('div');
	span.style.cssFloat = "left";

	var i=0;
	for(i=0;i<gawkerSites.length;i++){
	    var button = document.createElement("a");
        	button.innerHTML = " " + gawkerSites[i] + " ";
		button.href = "http://" + gawkerSites[i] + ".com";
	    span.appendChild(button);
	}

    div.appendChild(span);



    //Add Tag Shortcuts
  	var span = document.createElement("div");
	span.style.cssFloat = "right";

	var address = window.location.href;
	for(i=0;i<gawkerSites.length;i++){
		var match = gawkerSites[i].toLowerCase() + ".com";
  		if(address.indexOf(match) != -1){ 
			var j = 0;
			for(j=0; j<tagList[i].length;j++){
	   			var button = document.createElement("a");
				button.innerHTML = " #" + tagList[i][j] + " ";
				button.href = "#!" + tagList[i][j] + "/forum";
				span.appendChild(button);
			}			
		}
	}

    //Add Show/Hide button
    var button = document.createElement("a");
	button.id="toggle";
        button.innerHTML = "+";
	button.style.cursor = "pointer";
	button.addEventListener("click", toggle, false);
    span.appendChild(button);

	div.appendChild(span);


    //Clear floating
	var clear = document.createElement("d");
	clear.style.clear = "both";


	div.appendChild(clear);

    main.insertBefore(div, main.childNodes[0]);
}

document.getElementById("rightbar_scroller").style.height = "0px";

document.getElementById("rightcontainer").style.zIndex = -1;
addHeader();

var newstyle = '.gmgrid {width: 920px;}';
newstyle = newstyle + '.gmgrid .grid-full{width: 920px;}';
newstyle = newstyle + '.gmgrid .grid-bleed{width: 940px;}';
newstyle = newstyle + '.gmgrid .people{width: 920px;}';
newstyle = newstyle + '.gmgrid .frontpagegrid{width: 940px;}';
newstyle = newstyle + '#main-container >.inner{width: 960px;}';
newstyle = newstyle + '#hoveringNextPostContainer {height:0px}';
newstyle = newstyle + '#marquee-frame {display: none}';
newstyle = newstyle + '.gmgrid .gmg-1.omega {width:590px}'

if(!floatRightBar){
	newstyle = newstyle + '#rightcontainer {position:relative;top: -47px;right: 15px}';
}
else
{
	newstyle = newstyle + '#rightcontainer {position:fixed;top: -1100px;}';
}

addGlobalStyle(newstyle);