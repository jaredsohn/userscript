// ==UserScript==
// @name        Alerte Attaques Entrantes
// @namespace   LeonBuzz inspirÃ© d'un script de 11235813
// @description ouvre une boite popup d'alerte en cas de nouvelle(s) attaque(s) entrante(s), indique le nombre d'esquive(s) possible(s) une icone de status est affichÃ©e en permanence dans la barre 
// @include     http://*clodogame.fr*
// @include     http://*pennergame.de*
// @exclude     http://*game*login*
// @exclude     http://*game*logout*
// @exclude     http://*change_please/*
// @exclude     *board*
// @require	http://dabei.kilu.de/script.class.js
// @version	1.2
// ==/UserScript==
// v1.2:	nettoyage du header pour PG et modification de la notification
// v1.1:	portÃ© sur Pennergame
// v1.0:	version Clodogame

/* Update proc */
var SCRIPT={SCRIPTED:"Alerte Attaques Entrantes",VERSION:"1.3",SCRIPT_URL:"http://userscripts.org/scripts/source/77890.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */

cleanHead(1);
getFI(document.getElementById("wrap"));

function plur(bar,plur,sing)  {	if (bar<=1) return sing;	else	return plur;	}

function cleanHead(foo)
{	if(document.location.hostname.match('pennergame')) 
	{	var xtra = document.getElementById('xtra-nav').getElementsByTagName('li')[foo];
		xtra.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';	}
}

function getFI(target) {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://'+document.location.hostname+'/fight/overview/',
    onload: function(responseDetails) {
			var cont = responseDetails.responseText;
			if(cont.match(/http:\/\/.*(pennergame|farbflut)\.de\/img.*\/dots\/warning\.gif/)) {
				if(document.location.hostname.match('pennergame'))	{	var esq = 'Ausweichen'; }
				if(document.location.hostname.match('clodogame'))	{	var esq = 'Esquiver'; }
				var tbl = cont.split('<td><strong>'+esq+'</strong></td>')[1].split('</table>')[0];
				var ids = tbl.match(/id:(\d+)/g);
				var names = tbl.match(/">(.*?)<\/a/g);
				var hours = tbl.match(/([0-9]{2}:[0-9]{2}):[0-9]{2}/g)
				var ids = matchArrayVal(ids,/\d+/,0);
				var names = matchArrayVal(names,/>(.*?)</,1);
				var hours = matchArrayVal(hours,/([0-9]{2}:[0-9]{2}):[0-9]{2}/,1);
				var oldnames = GM_getValue("incoming_fights",Array());
				if(oldnames.length != 0)	{	var oldnames = oldnames.split(';');	}
				GM_setValue("incoming_fights",ids.join(';'));
				var news = arrayCompare(ids,oldnames);
//				alert('ids='+ids+'\n oldnames='+oldnames+'\n news='+news);

				// popup
				if(news.length != 0)
				{	var msg ='\t** '+news.length+' nouvelle'+plur(news.length,'s','')+' attaque'+plur(news.length,'s','')+' en cours ! **\n\n';
					for(var i=0;i<news.length;i++) {	msg += '\t'+hours[news[i][1]]+'\t'+names[news[i][1]]+'\t(id: '+news[i][0]+')\n';	}
					if (confirm(msg+'\n\t\tAller Ã  la page Combats ?'))	{ window.location.replace('http://'+document.location.hostname+'/fight/');	}
				}

				var time = ids.length;
				if(oldnames.length != ids.length) {
					try {	}
					catch(e) {	alert('Une attaque s\'est terminÃ©e !');	}
				}
				try	{		var ausw = tbl.match(/doEvade\(/).length;	} 
				catch(e) {	var ausw = 0;		}
				notify(time,ausw,news.length);
				el = fillData([time,ausw]);
				target.appendChild(el);
				var news = '';
			}
			else {
//				notify(0,0,0);
				el = fillData([0,0]);
				target.appendChild(el);	
			}
		}
	});
}


function fillData(inc) {
	var a = document.createElement('a');
	a.setAttribute('href', '/fight/overview/');
	var newimg = a.appendChild(document.createElement('img'));
	newimg.setAttribute('src', 'http://media.pennergame.de/de/img/att.png');
	newimg.setAttribute('border', '0');
	newimg.setAttribute('title', 'Combats');
	newimg.setAttribute('width', '22');
	newimg.setAttribute('height', '22');
	if(inc[0]<=0) {	newimg.setAttribute('style', 'background-color:lightgreen; position:absolute; left:877px; top:65px; z-index:101; border: 1px solid black; -moz-border-radius: 5px;'); }
	else					{ newimg.setAttribute('style', 'background-color:lightsalmon; position:absolute; left:877px; top:65px; z-index:101; border: 1px solid black; -moz-border-radius: 5px;'); }
	var newsp = a.appendChild(document.createElement('font'));
	var inc0 = (inc[0]<=0) ? '<font color="lightgreen">RAS</font>':'<font color="lightsalmon">'+inc[0]+' ATT</font>';
	if(inc[0]>=1)
	{	var inc1 = (inc[1]<=0) ? '<font color="lightsalmon">'+inc[1]+' ESQ</font>':'<font color="lightblue">'+inc[1]+' ESQ</font>';	}
	else	{	inc1 = ''; }
	newsp.innerHTML = inc0+'<br>'+inc1;
	newsp.setAttribute('style', 'font-size:10px; font-weight:bold; position:absolute; left:902px; top:64px; z-index:101');
	return a;
}


function isInArray(array,value) {
	for(var i=0;i<array.length;i++) {
		if(array[i]==value) return true;
	}
	return false;
}
function matchArrayVal(array,regexp,ind) {
	var arr = new Array();
	for(var i=0;i<array.length;i++) {
		var akt = array[i];
		var akt_t = akt.match(regexp)[ind];
		arr.push(akt_t);
	}
	return arr;
}
function arrayCompare(arr1,arr2) {
	var arr = new Array();
	//alert(arr1+'\n'+arr2);
	for(var i = 0;i<arr1.length;i++) {
		//alert(arr2+'\n'+arr1[i]);
		if(!isInArray(arr2,arr1[i])) {	arr.push(Array(arr1[i],i));	}
	}
	return arr;
}

function notify(time,aus,neue) {
	var div = document.getElementById('notifyme');
	div.style.top = '82px';
	var ico = document.getElementById('nicon');
	ico.setAttribute('class', 'icon fight_incoming zleft');
	var neuetxt = (neue != 0) ? ' (dont '+neue+' nouvelle'+plur(neue,'s','')+')':'';
	var austxt = (aus != 0) ? aus+' ':'Pas d\'';
	var div = document.getElementById('ntext');
	div.innerHTML += '<h2>Attaque'+plur(time,'s','')+' entrante'+plur(time,'s','')+' :</h2>';
	div.innerHTML += time+' attaque'+plur(time,'s','')+' entrante'+plur(time,'s','')+neuetxt+'<br>';
	div.innerHTML += austxt+'esquive'+plur(aus,'s','')+' possible'+plur(aus,'s','')+'<br>';
}