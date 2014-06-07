// ==UserScript==
// @name           Gyorsgombok
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php*
// ==/UserScript==

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

//ujabb

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function renderbuttons(gombok){
	fomenu = document.getElementById('fomenu');
	if (document.getElementById('gyorsgomb_block')) {
		fomenu.removeChild(fomenu.firstChild);
	}
	gyorsgomb_block = document.createElement('li');
	gyorsgomb_block.id = 'gyorsgomb_block';
	menucim = document.createElement('div');
	menucim.setAttribute('class','fomenu_sor testreszab');
	menucim.innerHTML = 'Gyorsgombok';
	gyorsgomb_block.appendChild(menucim);
	gyorsgomb_wrap = document.createElement('ul');
	for (i=0; i<gombok.length; i+=2){
		if (gombok[i]!='' && gombok[i+1]!=''){
			gomb = document.createElement('li');
			gomb.innerHTML = '<a href="'+gombok[i+1]+'">'+gombok[i]+'</a>';
			gyorsgomb_wrap.appendChild(gomb);
		}
	}
	gyorsgomb_block.appendChild(gyorsgomb_wrap);
	fomenu.insertBefore(gyorsgomb_block, fomenu.firstChild);
	menucim.addEventListener('click',function(){
		layer.style.display='block';
	}, true);
}

username = document.evaluate("//div[@id='welcome']/strong", document, null, XPathResult.STRING_TYPE, null).stringValue; 
doomlord = strpos('doomlord',window.location.href);
vilag = strcut('//','.',window.location.href) + (doomlord ? '.doomlord' : '.vegzetur');
gmval = vilag+'_'+username;

style = document.createElement('style');
style.innerHTML = '#layer {display: none; opacity: .85; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9} #layer div {background-color: #101; text-align: center; width: 600px; height: 400px; border: double gray 4px; position: absolute; top: 50%; left: 50%; margin-top: -200px; margin-left: -300px;} #layer h1 {margin: 25px} #layer label {width: 100px; display: block; float: left; line-height: 20px;} #layer input {float: left; width: 170px; margin: 3px 0px;} #layer .gombsor {clear: both} #layer #bezaras {position: absolute; right: 0px; top: -2px; width: 20px; height: 20px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer}';
document.getElementsByTagName('body')[0].appendChild(style);

layer = document.createElement('div');
layer.id = 'layer';
belsodiv = document.createElement('div');
cim = document.createElement('h1');
cim.innerHTML = 'Gyorsgombok';
	
document.getElementsByTagName('body')[0].appendChild(layer);
layer.appendChild(belsodiv);
belsodiv.appendChild(cim);

gombok = eval(GM_getValue(gmval, '([])'));
for (i=0; i<10; i++){
	gombsor = document.createElement('p');
	gombsor.setAttribute('class','gombsor');
	gombsor.innerHTML = '<label>Felirat: </label><input class="gyorsgomb" type="text" value="'+(gombok[i*2]?gombok[i*2]:'')+'" /><label>Link: </label><input class="gyorsgomb" type="text" value="'+(gombok[i*2+1]?gombok[i*2+1]:'')+'"/>';
	belsodiv.appendChild(gombsor);
}

bezargomb = document.createElement('input');
bezargomb.type = 'button';
bezargomb.value = 'X';
bezargomb.id = 'bezaras';
bezargomb.addEventListener('click',function(){
	layer.style.display='none';
	gombok = [];
	elems = document.getElementsByTagName('input');
	for (i=0; i<elems.length; i++){
		if (elems[i].className=='gyorsgomb') gombok.push(elems[i].value);
	}
	GM_setValue(gmval, gombok.toSource());
	renderbuttons(gombok);
}, true);

belsodiv.appendChild(bezargomb);
renderbuttons(gombok);
