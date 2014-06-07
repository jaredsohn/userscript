// ==UserScript==
// @name          iGoogle Canvas Expand Button
// @namespace     http://cumakt.googlepages.com (Umakanthan Chandran)
// @description  Add Expand and Minimize button in main bar of new iGoogle Canvas View.
// @include       http*://*.google.*/ig*
// @include       http*://*.google.*/webhp*
// ==/UserScript==
//
var maxcount = 50;
var mainDiv = 'm_'+1+'_home_menu';
var maxDiv = 'm_'+1+'_b';
for(link = 1; link <=maxcount; link++) {
  mainDiv = 'm_'+link+'_home_menu';
  maxDiv = 'm_'+link+'_b';
  if(document.getElementById(mainDiv)){	
	var anchor = document.getElementById(mainDiv).nextSibling.getElementsByTagName('A');			
	var values = anchor[2].getAttributeNode('onclick').nodeValue.split(",")
	var param1 = values[0].split("'")[1];
	var param2 = values[1];
	var node = document.createElement("A");									
	node.href = "javascript:void(0);";
	node.id = "maxbutu:"+param1+":"+param2;
	node.className = "minbox";	
	if(document.getElementById(maxDiv)) {
		if(document.getElementById(maxDiv).getAttributeNode('style')) {
			node.className = "maxbox";
		}		
	}
	node.addEventListener('click', function(){ 				
			var myVal = this.id.split(":");
			changeThis(this);
			return _zm(myVal[1],myVal[2]);
	},false);
	document.getElementById(mainDiv).insertBefore(node,document.getElementById(mainDiv).firstChild);
  }
}
function changeThis(divTag) {
  if(divTag.className =="maxbox") {divTag.className = "minbox";} 
  else{divTag.className = "maxbox";}
}

//Original Code By Google 
function _zm(a,b,c){ var d=_gel("m_"+a+"_b");if(d){var e=d.style.display!="none";d.style.display=e?"none":"block";var f=_gel("m_"+a+"_zippy");if(f)f.className=e?f.className.replace(/minbox/,"maxbox"):f.className.replace(/maxbox/,"minbox");var g=c?"mmz":"mz";_xsetp(g+"="+a+":"+(e?"1":"0")+"&t="+b);}return ig_a}var ig_z="https://www.google.com/accounts";
var ig_m=[],ig_n,ig_a,ig_b;
function _gel(a){return document.getElementById?document.getElementById(a):ig_}
function _xsetp(a){ig_m.push(a);}