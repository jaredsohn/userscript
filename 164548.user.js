// ==UserScript==
// @name        Yahoo Fantasy Baseball Players List Easy Links
// @namespace   KMHI - Greasemonkey
// @include     http://baseball.fantasysports.yahoo.com/b1/*/players*
// @exclude			http://baseball.fantasysports.yahoo.com/b1/*/playerssearch*
// @grant				metadata
// ==/UserScript==

var positions=["B","P"];
var position_names=["Batters","Pitchers"];
var stats=["S_S_2014","S_S_2013","S_L"];
var stat_names=["Season(total)","2013 Total","Today(live)"];

var url_re = new RegExp
url_re = /^http\:\/\/baseball\.fantasysports\.yahoo\.com\/b\d{1}\/\d{1,6}\/players$/i;

var str1 = location.href.split("/b1/")[1].split("/")[0];	
var ysp_form = document.getElementById('playerfilter');

var easyLinks = document.createElement('div');
easyLinks.setAttribute("id","yspstatlinks");
easyLinks.setAttribute("class","navlist");

var ul=document.createElement('ul');

for(var i=0;i<positions.length;i++){
	for(var j=0;j<stats.length;j++){
		var li=document.createElement('li');
		var span=document.createElement('span');
		span.setAttribute('id', positions[i]+'%'+stats[j]);
		if(i==0)
			span.setAttribute('class', 'statlink first');
		else
			span.setAttribute('class', 'statlink');
		span.innerHTML = position_names[i] + ' ' + stat_names[j];
		span.addEventListener('click', changeFilter, false);
		li.appendChild(span);
		ul.appendChild(li);			
	}
}

easyLinks.appendChild(ul);

// insert the stat links
ysp_form.parentNode.insertBefore(easyLinks, ysp_form.nextSibling);

addGlobalStyle('#yspstatlinks { background: none repeat scroll 0 0 #FFFFFF; padding: 0 200px 10px 10px; }');
addGlobalStyle('#yspstatlinks ul { margin-left:0; padding-left: 0;display:inline; }');
addGlobalStyle('#yspstatlinks li { display:inline; padding: 0 8px; }');
addGlobalStyle('#yspstatlinks li.first { padding-left: 0px; }');
addGlobalStyle('#yspstatlinks li.none { padding: 0px; }');
addGlobalStyle('.statlink { font:normal 77% Verdana; color: #0069AA; cursor: pointer; }');
addGlobalStyle('.statlink:hover { text-decoration:underline; }');

function changeFilter(){
	var pstat = this.id.split('%');
	
	var list = document.getElementById("posselect").options;
	for(var i = 0; i<list.length; i++){
			if(list[i].value==pstat[0]) { 
					list[i].selected = true; 
			}
	}
	
	var list = document.getElementById("statselect").options;
	for(var i = 0; i<list.length; i++){
			if(list[i].value==pstat[1]) { 
					list[i].selected = true; 
			}
	}
	
	var allProceed = getElements("input", "class", "Btn-primary Mtop-xxl Mstart-med ysf-cta-proceed");
	allProceed[0].click();
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

function getElements(element, attribute, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(attribute != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + attribute + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + attribute + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}