// ==UserScript==
// @name           La Guia TV Favourites
// @namespace      http://www.latinsud.com
// @include        http://www.laguiatv.com/*
// @include        http://laguiatv.com/*
// @match          http://www.laguiatv.com/*
// @match          http://laguiatv.com/*
// @version        1.0
// ==/UserScript==


// helper function to run code in the target
function codeEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

// helper function to run function bodies in the target
function functionEval(source) {
  source = '(' + source + ')();'  
  codeEval(source);
}

// Sample values
if (localStorage['favs'] == undefined)
	localStorage['favs']='simpson\nfuturama\namerican dad';

var regexes0=localStorage['favs'];
var prgs=document.body.getElementsByClassName('programacion');

if (prgs.length > 0 && regexes0.length>0) {
 var regs=new RegExp(regexes0.replace(/\n/g,"|"), "i");
 prg=prgs[0];

 ts=prg.getElementsByTagName('TD');


 for (i=0; i<ts.length; i++) { 
	t=ts[i];

	if (t && t.childNodes[0] && t.childNodes[0].childNodes[0]) {
		for (j=0; j<t.childNodes[0].childNodes[0].childNodes.length; j++) {
			txt=t.childNodes[0].childNodes[0].childNodes[j];
			if (txt.nodeType == 3 && txt.nodeValue.match(regs)) {
				di=document.createElement('DIV');
				di.style.border="5px solid red";
				for (j=t.childNodes.length-1; j>=0; j--) {
					di.appendChild(t.childNodes[j]);
				}
				t.appendChild(di);
			} 
		}
	}
 }
}

hs=document.getElementsByClassName('hour');
h=document.body;
if (hs.length>0 && hs[0].childNodes.length>0) {
	h=hs[0];
}

hh=h.childNodes[h.childNodes.length-1];
if (hh.nodeType==3 && h.childNodes.length>1)
	hh=h.childNodes[h.childNodes.length-2];

but=document.createElement('INPUT');
but.type="BUTTON";
but.value="Favs";
but.id="favs_but";

hh.appendChild(but);

favsDiv=document.createElement('DIV');
favsDiv.id='favs_div';
favsDiv.style.position='absolute';
favsDiv.style.top='10px';
favsDiv.style.left='10px';
favsDiv.style.width='600px';
favsDiv.style.height='400px';
favsDiv.style.display='none';
favsDiv.style.zIndex='1000';
favsDiv.style.backgroundColor='white';
favsDiv.style.border='2px solid black';

favsArea=document.createElement('TEXTAREA');
favsArea.id='favs_area';
favsArea.style.width="98%";
favsArea.style.height="90%";

sBut=document.createElement('INPUT');
sBut.type="BUTTON";
sBut.id="favs_save";
sBut.value="Save & Close";

bHelp=document.createElement('INPUT');
bHelp.type="BUTTON";
bHelp.id="favs_help";
bHelp.value="Help";


favsDiv.appendChild(favsArea);
favsDiv.appendChild(sBut);
favsDiv.appendChild(bHelp);
document.body.appendChild(favsDiv);

function autoRun() {
	if (localStorage['favs'] != undefined)
		document.getElementById('favs_area').value=localStorage['favs'];

	document.getElementById('favs_help').addEventListener('click', function() {
		alert("EN: Put a substring of you fave program one on each line.\n"+
			"Beware these are Regular Expressions, so '.' is a wildcard, etc.\n"+
			"--\n"+
			"ES: Pon una subcadena de cada programa favorito, una en cada linea.\n"+
			"Ten en cuenta que se usan Expresiones Regulares, asi que '.' es un comodin, etc.\n"
		);
	}, true);

	document.getElementById('favs_but').addEventListener('click', function() {
		document.getElementById('favs_div').style.display='block';
	}, true);

	document.getElementById('favs_save').addEventListener('click', function() {
		document.getElementById('favs_div').style.display='none';
		localStorage['favs']=document.getElementById('favs_area').value;
	}, true);
}

functionEval(autoRun);
