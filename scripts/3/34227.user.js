// ==UserScript==
// @name           SG_Scan
// @namespace      Vieoli
// @description    Scanneur de galaxie
// @include        http://*.sg-univers.fr/galaxi.php
// @include        http://*.sg-univers.fr/*/index.php?page=Capteurs
// ==/UserScript==

var ScanType = GM_getValue('ScanGalaType', false);
if (ScanType) ScanType = ScanType.split('|');
var form = document.getElementById('galaxiform');
var galaxy = document.getElementById('galaxi2').value;
var system = document.getElementById('system2').value;
var url = document.URL.replace(/.+index\.php/, 'index.php').replace(/(session=[0-9a-zA-Z]+)&.+/, '$1');

var tmp_now = (Math.random() * 1500) + (Math.random() * 300) + 1000; // temps aléatoire
var initOK = false; // pour vérifier l'activation de affinfo !
var Int;

function Scan() {
    var Etap;
    if (this.getAttribute('id') == 'U') Etap = 'U|0';
    else if (this.getAttribute('id') == 'U2') Etap = 'U|' + (galaxy - 1);
    else Etap = 'G|' + (galaxy - 1);
    GM_setValue('ScanGalaType', Etap);
}
// Returns null if expr didn't match anything
function getFirstXPath(expr, node) {
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}

function goclick(){
  var ruines = ctrlRuine();
  if (system * 1 < 100 && !ruines)
    document.getElementsByName('systemeplus')[0].click();
}
function StopScan(){
  GM_setValue('ScanGalaType', false);
}
//===========================
// Control si ya des ruines ds le sources
//===========================
function ctrlRuine(){
  var imgs = document.getElementsByTagName("input");
  var retour = '';
  for (var x = 0; x < imgs.length; x++){
    if (imgs[x].src.indexOf("CDR.gif") != -1){
      GM_setValue('ScanGalaType', false); // stop scan !!
      affinfo ("RUINES !!!!");
      return true;
    }
  }
  return false;
}

function affinfo(info, etat, concat){
  if (!initOK) init_logger();
  if (etat == null){
    if (concat)
      document.getElementById("ldiv").innerHTML += "<hr />" + info;
    else
      document.getElementById("ldiv").innerHTML = info;
    document.getElementById("ldiv").style.display = "block";
  }else{
    if (typeof(info) != "object"){
      document.getElementById("ldiv2").innerHTML = info + document.getElementById("ldiv2").innerHTML;
      document.getElementById("ldiv2").style.display = "block";
    }else
      document.getElementById("ldiv2").appendChild(info);
  }
}

function init_logger(){
      if (initOK) return;
    	var ldiv = document.createElement("DIV");
    	ldiv.setAttribute("id"   , "ldiv");
    	ldiv.setAttribute("title", " Innit_logger ");
    	ldiv.setAttribute("style", "position:absolute; width:300px; left:400px; top:100px; border:2px #804000 solid; background-color:#F8F4E8; color:black; padding:10px; display: none; cursor:pointer; z-index:1000");
    	ldiv.innerHTML = "&nbsp;yeahhhhhhhhhh, c moiiiiiiiiiiiiiii";
    	if (document.getElementsByTagName("body")[0]) {
    		document.getElementsByTagName("body")[0].appendChild(ldiv);
    		ldiv.addEventListener("click", hideLdiv, true);
    	}
    	var ldiv = document.createElement("DIV");
    	ldiv.setAttribute("id"   , "ldiv2");
    	ldiv.setAttribute("title", " Innit_logger2 ");
    	ldiv.setAttribute("style", "position:absolute; width:300px; left:400px; top:180px; border:2px #804000 solid; background-color:#F8F4E8; color:black; padding:10px; display: none; z-index:1000");
    	ldiv.innerHTML = '<br /><input type="button" onclick="this.parentNode.style.display=\'none\';" value="Fermer" />';
    	if (document.getElementsByTagName("body")[0]) {
    		document.getElementsByTagName("body")[0].appendChild(ldiv);
    	}
    	initOK = true;
}

function hideLdiv(){ document.getElementById("ldiv").style.display = "none"; }
function showLdiv(){ document.getElementById("ldiv").style.display = "block"; }
    
if (ScanType) {
	if (system * 1 < 100){
        window.setTimeout(goclick, tmp_now);
	}else if (ScanType[0] == 'U') {
			if (ScanType[1] != galaxy) {
				document.getElementById('system2').value = 1;
				GM_setValue('ScanGalaType', ScanType[0] + '|' + galaxy)
				window.setTimeout(goclick, tmp_now);
			} else {
				GM_setValue('ScanGalaType', false);
				affinfo('Scan Univers ' + document.URL.match(/uni(\d+)\.sg-univers/)[1] + ' terminé.');
			}
		} else {
			GM_setValue('ScanGalaType', false);
			affinfo('Scan Galaxie ' + galaxy + ' terminé.');
		}
}

var table = getFirstXPath("/html/body/table/tbody/tr[3]/td[2]/div/div[2]/form[2]/div/table", document);
var td = table.getElementsByTagName('td');

for (var i = 0; i < td.length; i++) {
	if (td[i].innerHTML.search(/<input.+value="Voir"/) + 1) {
		var align = document.createAttribute('align');
		align.nodeValue = "center";
		td[i].setAttributeNode(align);
		td[i].innerHTML = '<input id="G" type="button" value="Scanner la G' + galaxy + '" onclick="document.getElementById(\'galaxi2\').value=' + galaxy + ';document.getElementById(\'system2\').value=1;document.getElementById(\'galaxiform\').submit();" />';
		td[i].innerHTML += ' <input id="G2" type="button" value="Scanner la G' + galaxy + ' &agrave; partir d\'ici" onclick="document.getElementById(\'galaxi2\').value=' + galaxy + ';document.getElementById(\'system2\').value=' + (system * 1 + 1) + ';document.getElementById(\'galaxiform\').submit();" />';
		td[i].innerHTML += ' <input type="submit" value="Afficher">';
		if (ScanType) td[i].innerHTML += ' <input id="stop" type="button" value="Stop" />';
	}
}
document.getElementById('G').addEventListener('click',Scan,true);
document.getElementById('G2').addEventListener('click',Scan,true);
if (ScanType) document.getElementById('stop').addEventListener('click',StopScan,false);
