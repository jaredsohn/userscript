// ==UserScript==
// @name           VU cumomester
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=karakterlap
// @include        http://*.vegzetur.hu/index.php
// @include        http://*.vegzetur.hu/
// ==/UserScript==

var maxdelay = 3; //msec
var varolista = [];

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

//uj

function shuffle(o){ 
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
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

function gmload(data){
	if (varolista.length==0){
		loader = document.getElementById('loader');
		loader.parentNode.removeChild(loader);
		window.location.reload(true);
	} else {
		setTimeout(gmxml, Math.round(Math.random()*maxdelay));
	}
}

function gmxml(){
	link = varolista.pop();
	GM_xmlhttpRequest({method: 'GET', url: link, onload: gmload});
	// GM_log((new Date()).getSeconds()+': '+link);
	// gmload();
}

username = document.evaluate("//div[@id='welcome']/strong", document, null, XPathResult.STRING_TYPE, null).stringValue; 
doomlord = strpos('doomlord',window.location.href);
vilag = strcut('//','.',window.location.href) + (doomlord ? '.doomlord' : '.vegzetur');
gmval = vilag+'_'+username;

targyak = document.evaluate("//div[@class='eredmenyek_block']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

h3_out = document.createElement('div');
h3_out.setAttribute('class', 'h4_out');

h3 = document.createElement('h4');
h3.appendChild(document.createTextNode('Cumómester'));
h3_out.appendChild(h3);

cumobox = document.createElement('div');
// cumobox.setAttribute('class', 'message_center');
cumobox.setAttribute('style', 'text-align: center; margin: 10px 0px;');

select = document.createElement('select');
select.id = 'oltozetek';
select.name = 'oltozetek';
select.setAttribute('style', 'background-color: black; color: white; border: solid gray 1px; width: 130px;');
oltozetek = eval(GM_getValue(gmval,'[]'));

for (i=0; i<oltozetek.length; i++){
	option = document.createElement('option');
	option.value = oltozetek[i][0];
	option.innerHTML = oltozetek[i][0];
	select.appendChild(option);
}

mentbutton = document.createElement('a');
// mentbutton.setAttribute('class', 'gomblink');
mentbutton.setAttribute('style', 'cursor: pointer');
mentbutton.innerHTML = '<span> [Mentés] </span>';
mentbutton.addEventListener('click',function(){
	if (!confirm('Mentsük le a mostani öltözéked?')) return;
	cuccok = document.evaluate("//div[@class='egytargy']//h5", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	oltozet = [];
	while (cucc = cuccok.iterateNext()){
		oltozet.push(cucc.textContent);
	}
	nev = prompt('Öltözet neve: ','');
	oltozetek.push([nev, oltozet]);
	GM_setValue(gmval, oltozetek.toSource());
	alert('Öltözet elmentve.');
}, true);

felveszbutton = document.createElement('a');
// felveszbutton.setAttribute('class', 'gomblink');
felveszbutton.setAttribute('style', 'cursor: pointer');
felveszbutton.innerHTML = '<span style="color: #E9C347"> [Átöltözés] </span>';
felveszbutton.addEventListener('click',function(){
	oltozet = document.getElementById('oltozetek').value;
	div = document.createElement('div');
	div.id = 'loader';
	div.setAttribute('style','font-size: 14px; font-family: Verdana; text-align: center; position: fixed; top: 50%; left: 50%; height: 70px; width: 200px; border: solid gray 2px; padding: 10px; background-color: black; margin: -55px 0px 0px -105px;');
	div.innerHTML = 'Öltözök, ne less.<br />'+oltozet+'<br /><br /><img src="http://www.partnerinfo.eu/App_Style/Assets/Icons/ajax-loader.gif" />';
	for (i=0; i<oltozetek.length; i++){
		if (oltozetek[i][0]==oltozet) {
			for (j=0; j<oltozetek[i][1].length; j++){
				cucc = oltozetek[i][1][j];
				felvesz = true;
				jelenlegi_cuccok = document.evaluate("//div[@class='egytargy']//h5", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				while (felvett_cucc = jelenlegi_cuccok.iterateNext()){
					if (felvett_cucc.textContent == cucc) felvesz = false;
				}
				link = document.evaluate("//a[contains(.,\""+cucc+"\")]/@href", document, null, XPathResult.STRING_TYPE, null).stringValue; 
				if (link=='') {
					alert('Hoppá, eladtál valamit ('+cucc+')?');
				} else {
					if (felvesz) varolista.push(link);
					else GM_log('Nem kell felvenni: '+cucc);
				}
			}
			if (varolista.length==0) {
				alert('Nem is kell átöltözni!');
				return;
			}
			document.getElementsByTagName('body')[0].appendChild(div);
			gmxml();
			break;
		}
	}
}, true);


torolbutton = document.createElement('a');
// torolbutton.setAttribute('class', 'gomblink');
torolbutton.setAttribute('style', 'cursor: pointer');
torolbutton.innerHTML = '<span> [Törlés] </span> ';
torolbutton.addEventListener('click',function(){
	if (!confirm('Biztos hogy törlöd az öltözetet, pajtás?')) return;
	oltozet = document.getElementById('oltozetek').value;
	for (i=0; i<oltozetek.length; i++){
		if (oltozetek[i][0]==oltozet) {
			torolt = oltozetek.splice(i,1);
			break;
		}
	}
	GM_setValue(gmval, oltozetek.toSource());
	alert('Öltözet törölve.');
	window.location.reload(true);
}, true);

cumobox.appendChild(select);
cumobox.appendChild(felveszbutton);
cumobox.appendChild(mentbutton);
cumobox.appendChild(torolbutton);

targyak.insertBefore(cumobox, targyak.firstChild);
targyak.insertBefore(h3_out, targyak.firstChild);