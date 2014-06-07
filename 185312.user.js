// ==UserScript==
// @name           VU_Kepcsere
// @version        1.04
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php*
// ==/UserScript==

var version = "1.04";

//Thnx to Jerikó a kóddarabért!
function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}
var ver_check = GM_getValue("ver_check",0);
var most = Math.floor(new Date().getTime()/1000/3600/24);
if (most > ver_check) {
var url = 'http://userscripts.org/scripts/source/185312';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/185312');
		alert ("Van újabb képcsere verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(most));
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function tag(tagname){
	return document.getElementsByTagName(tagname);
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

username = document.evaluate("//div[@id='welcome']/strong", document, null, XPathResult.STRING_TYPE, null).stringValue; 
vilag = strcut('//','.',window.location.href) + ('.vegzetur');
gmval = vilag+'_'+username;

function configure(){
	style = document.createElement('style');
	style.innerHTML = '#folia {display: block; opacity: .85; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9} #folia div {background-color: #101; text-align: center; width: 600px; height: 400px; border: double gray 4px; position: absolute; top: 50%; left: 50%; margin-top: -200px; margin-left: -300px;} #folia h1 {margin: 25px} #folia label {width: 100px; display: block; float: left; line-height: 20px;} #folia input {float: left; width: 187px; margin: 3px 0px;} #folia .cseresor {clear: both} #folia #bezaras {position: absolute; right: 0px; top: -2px; width: 20px; height: 20px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer}';
	document.getElementsByTagName('body')[0].appendChild(style);
	folia = document.createElement('div');
	folia.id = 'folia';
	belsodiv = document.createElement('div');
	cim = document.createElement('h1');
	cim.innerHTML = 'Képcsere beállítások';
	document.getElementsByTagName('body')[0].appendChild(folia);
	folia.appendChild(belsodiv);
	belsodiv.appendChild(cim);
	cserek = eval(GM_getValue(gmval, '([])'));
	for (i=0; i<10; i++){
		cseresor = document.createElement('p');
		cseresor.setAttribute('class','cseresor');
		cseresor.innerHTML = '<label>Állat neve: </label><input class="cserelista" type="text" value="'+(cserek[i*2]?cserek[i*2]:'')+'" /><label>Csere kép: </label><input class="cserelista" type="text" value="'+(cserek[i*2+1]?cserek[i*2+1]:'')+'"/>';
		belsodiv.appendChild(cseresor);
	}
	bezargomb = document.createElement('input');
	bezargomb.type = 'button';
	bezargomb.value = 'X';
	bezargomb.id = 'bezaras';
	bezargomb.addEventListener('click',function(){
		folia.style.display='none';
		cserek = [];
		elems = document.getElementsByTagName('input');
		for (i=0; i<elems.length; i++){
			if (elems[i].className=='cserelista') cserek.push(elems[i].value);
		}
		GM_setValue(gmval, cserek.toSource());
		window.location.reload();
	}, false);
	belsodiv.appendChild(bezargomb);
}

if (strpos('index.php?m=allatok', window.location.href) || strpos('index.php?m=karakterlap', window.location.href) || strpos('index.php?m=csataleiras', window.location.href)){
	cserek = eval(GM_getValue(gmval, '([])'));
	kepek = tag('img');
	for(i=0; i<kepek.length; i++){
		if (strpos('creature',kepek[i].src) && strpos(kepek[i].alt,cserek)) {
			for (j=0; j<cserek.length; j+=2){
				if (cserek[j]!='' && cserek[j+1]!=''){
					kepek[i].src = "http://images.vegzetur.hu/pic/creature/"+cserek[j+1];
				}
			}
		}
	}
}
	
GM_registerMenuCommand('Kép beállítások', configure)
