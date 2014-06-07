// ==UserScript==
// @name		CDProd V3, [NAME HERE EDIT]
// @namespace	http://sgu-addons.fr.nf
// @description	Permet de calculer la production de toute ses planetes simplement. " Frank_Slim_Edit "
// @include	http://unialpha.sg-univers.fr/unialpha/index.php*
// @include	http://unipegase.sg-univers.fr/unipegase/index.php*
// @include	http://uniorion.sg-univers.fr/uniorion/index.php*
// @include	http://uniida.sg-univers.fr/index.php*
// @include	http://*sg-univers.fr*
// ==/UserScript==

/* Script Greasemonkey par Gu1ll4um3r0m41n */
/*   le 01/09/2008   */

// lib json2, http://www.json.org/json2.js compressé avec le YUI compressor
if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(key){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==="string"){return c}return"\\u"+("0000"+(+(a.charCodeAt(0))).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}return{stringify:function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+(+(a.charCodeAt(0))).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}()};

var infos = {planetes: []};
var count = 0;
var keypla = 0;
var pourcentage = 0;
var pourcentmax = 0;
var timerid = null;
var version = '1.0.1';

function defilPourcent() {
	if(pourcentage < pourcentmax) {
		pourcentage++;
		$('progress').style.width = pourcentage+'%';
		$('progress').innerHTML = pourcentage+'%';
	} else {
		clearInterval(timerid);
		timerid = null;
	}
}

function startDefil(max) {
	if(timerid != null && max > pourcentage) {
		pourcentmax = max;
	} else if(max > pourcentage) {
		pourcentmax = max;
		timerid = setInterval(defilPourcent, 1);
	} else {
		return false;
	}
}

function $(element) {
	return document.getElementById(element);
}

function startCalculateur() {
	$('linkStartCalculateur').style.display = 'none';
	$('onprogress').style.display = 'block';
	getPlanetes();
}

function stopCalculateur() {
	$('cdprod-status').innerHTML = '';
	pourcentage = 100;
	$('progress').style.width = pourcentage+'%';
	$('progress').innerHTML = pourcentage+'%';
	GM_openInTab('http://sgu-addons.fr.nf/CDProd/?infos='+btoa(JSON.stringify(infos))+'&version='+ version);
	$('cdprod-reset').addEventListener('click', resetCalculateur, false);
}

function resetCalculateur() {
	pourcentage = 0;
	$('progress').style.width = '0%';
	$('progress').innerHTML = '0%';
	$('cdprod-status').innerHTML = '';
	$('linkStartCalculateur').style.display = 'block';
	$('onprogress').style.display = 'none';
}

function changeColonie() {
	$('cdprod-status').innerHTML = '';
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					//alert('colo changée');
					startDefil(Math.round((keypla+1)/infos.planetes.length/1.5*95+5));
					getResProd(keypla);
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getResProd a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=ChangeColonie&salle=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('contenu=change_salle&affichageAJAX=ChangeColonie&salle=1&undefined&page_go=salleDeControle&idcolo='+infos.planetes[keypla].id);
}

function getResProd() {
	$('cdprod-status').innerHTML = '';
	var regexressources = /<tr style=".*?"><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td><td align="center"><div class='.*?'>(.*?)<\/span><\/td>/m;
	var regexproduction = /<td><b>Total :<\/b><\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>\n\t\t\t\t<td align = "center">(.*?)<\/td>/m;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					var ress = regexressources.exec(reponse);
					if(ress != null) {
						infos.planetes[keypla].ressources = {'fer': ress[1], 'or': ress[2], 'cri': ress[3], 'naq': ress[4]};
					} else {
						throw 'Impossible de recuperer les ressources';
					}
					
					var prod = regexproduction.exec(reponse);
					if(prod != null) {
						infos.planetes[keypla].production = {'fer': prod[1], 'or': prod[2], 'cri': prod[3], 'naq': prod[4]};
					} else {
						throw 'Impossible de recuperer la production';
					}
					startDefil(Math.round((keypla+1)/infos.planetes.length*95+5));
					if(keypla+1 <= infos.planetes.length-1) {
						keypla++;
						setTimeout(changeColonie, 1500);
						//changeColonie();
					} else {
						setTimeout(stopCalculateur, 1500);
						//alert('fini :)\n'+JSON.stringify(infos));
					}
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getResProd a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('POST', 'index.php?page=Production&salle=1&ajax=1', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(null);
}

function getPlanetes() {
	var regexplanetes = /<option.*? value="([0-9]{1,10})">(.*?)  \[(.*?):(.*?):(.*?)\]<\/option>/gm;
	$('cdprod-status').innerHTML = '';
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		try {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					reponse = xhr.responseText;
					while((tmpresult = regexplanetes.exec(reponse)) != null) {
						infos.planetes[count] = {'id': tmpresult[1], 'nom': tmpresult[2], 'gsp': tmpresult[3]+':'+tmpresult[4]+':'+tmpresult[5], 'ressources': [], 'production': []};
						count++;
					}
					if(count > 0) {
						count = 0;
						startDefil(5);
						keypla = 0;
						setTimeout(changeColonie, 1500);
						//changeColonie(0);
					}
				} else {
					$('cdprod-status').innerHTML = 'Une erreur '+ xhr.status +' s\'est produite dans le chargement de la page, veuillez contacter un administrateur ...';
				}
			}
		}
		catch(e) {
			$('cdprod-status').innerHTML = 'La fonction getPlanetes a retourn&eacute; une exception: <br /> '+ e;
		}
	}
	xhr.open('GET', 'index.php?page=salleDeControle&salle=1&ajax=1', true);
	xhr.send(null);
}

function load() {
	var element = document.createElement('tr');
	var element2 = document.createElement('td');
	element2.innerHTML = '';
	element.appendChild(element2);

	var element3 = document.createElement('tr');
	element3.className = 'tabligne2';
	var element4 = document.createElement('td');
	element4.align = 'center';
	element4.className = 'Categorie';
	element4.innerHTML = '<b>CDProd V3 <a class="link" href="http://sgu-addons.fr.nf"><span style="font-size: 9px;font-weight: normal;">by NG Corp</span></a></b>';
	element3.appendChild(element4);

	var element5 = document.createElement('tr');
	element5.className = 'tabligne1';
	var element6 = document.createElement('td');
	element6.style.padding = '3px';
	element6.style.textAlign = 'center';
	element6.innerHTML = '<span class="link" style="cursor: pointer;" id="linkStartCalculateur">Lancer le Calculateur</span>'+
						 '<div id="onprogress" style="display: none;"><div id="progress-container"><div style="width: 0%" id="progress">0%</div></div><span id="cdprod-status" style="font-size: 11px;"></span></div>';
	element5.appendChild(element6);

	var annonce = document.getElementsByTagName('td');
	for (var i = 0; i < annonce.length; i++) {
		if(annonce[i].className == 'Categorie' && annonce[i].innerHTML.search('<b>Annonce ') != -1) {
			annonce[i].parentNode.parentNode.insertBefore(element, annonce[i].parentNode);
			element.parentNode.insertBefore(element3, element);
			element3.parentNode.insertBefore(element5, element);
			break;
		}
	}
	$('linkStartCalculateur').addEventListener('click', startCalculateur, false);
	GM_addStyle('#progress-container {\n\tborder: 1px solid #cccccc;\n\twidth: 250px;\n\tmargin: 0px auto 2px auto;\n\tpadding: 1px;\n\tbackground: #FFFFFF;\n}\n\n#progress {\n\tbackground-color: #6FB2E9;\n\theight: 10px;\n\tfont: 8px Tahoma, sans-serif;\n\tcolor: #000000;\n\ttext-align: center;\n\toverflow: hidden;\n}');
	//embedFunction(startCalculateur);
	return true;
}

window.addEventListener("load", load, false); // on execute la fonction "load" qu'on a définie au dessus quand le chargement de la page est terminé.
