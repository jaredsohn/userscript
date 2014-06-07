// ==UserScript==
// @name           Triburile rezervari tabel
// @namespace      http://userscripts.org/users/andone
// @description    Genereaza tabel cu rezervarile de pe un anumit K de pe forum pe orice lume
// @include        http://*.triburile.ro/*
// @version        0.6
// @date           2008.11.12
// ==/UserScript==


_a = function() {
//alert("location: "+window.location);
var DEBUG_MODE=false;
var debugInfo = "";
function info(msg) {
	//var debugElem = document.getElementById("rezervariDebugInfo");
	//debugElem.innerHTML += "<br>"+msg;
	debugInfo += "<br>"+msg;
	//alert(debugInfo);
}
function pregatesteDebug() {
	/*
	var debugElem = document.createElement("div");
	debugElem.style.bgcolor="#ffffff";
	debugElem.style.color="green";
	debugElem.innerHTML="debug info: "+debugInfo;
	debugElem.id = "rezervariDebugInfo";
	debugElem.style.display = "none";
	document.body.appendChild(debugElem);
	*/
}
function activeazaDebug() {
	DEBUG_MODE=true;
}
pregatesteDebug();
//activeazaDebug();

function arataEroare(ex) {
	errorElem = document.createElement("div");
	errorElem.style.bgcolor="#ffffff";
	errorElem.style.color="red";
	errorElem.innerHTML="exceptie: "+ex.message;
	document.body.appendChild(errorElem);
	//alert("exceptie: "+ex.message);
	activeazaDebug();
}
function arataDebug() {
	//alert(debugInfo);
	/*
	var debugElem = document.getElementById("rezervariDebugInfo");
	if ( !debugElem )
		return;
	if ( DEBUG_MODE && debugElem.innerHTML.length>0 ) {
		debugElem.style.display = "";
	} else
		debugElem.style.display = "none";
	*/
	if ( DEBUG_MODE && debugInfo && debugInfo.length>0 ) {
		debugElem = document.createElement("div");
		debugElem.style.bgcolor="#ffffff";
		debugElem.style.color="green";
		debugElem.innerHTML="debug info: "+debugInfo;
		document.body.appendChild(debugElem);
	}
}
try {
var ForumAdIframe = null;
var TitleNode = null;
var currentK = null;//daca este sectiunea rezervari, tine minte K-ul curent
var vizStyle = 'font-size:10px;border:1px solid black;display:block;cursor:pointer;text-align:center;text-transform:uppercase;color:darkblue;';

var getChildElem = function (parent, startIndex) {
	if ( parent == null )
		return null;
	if ( startIndex > parent.childNodes.length )
		return null;
	if ( !startIndex || startIndex<0 )
		startIndex = 0;
	var index = startIndex;
	var node=null;
	while(index<parent.childNodes.length) {
		node = parent.childNodes[index];
		if (node.nodeType==1 )//Node.ELEMENT_NODE
			return {node:node,next_index:index+1};
		index++;
	}
	return null;
}

var getFirstChildElem = function (parent) {
	var tp = getChildElem(parent);
	if ( tp )
		return tp.node;
	return null;
}
var isVillage = function(domElem) {
	if ( !domElem )
		return -1;
	if ( domElem.nodeType!=1 )
		return -2;
	if ( domElem.tagName!="A" )
		return -3;
		//game.php?t=319293&&screen=info_village&id=79779
	var villageRegEx = /game\.php\?.*\&screen=info_village\&id=\d+/;
	if ( !villageRegEx.test(domElem.href) )
		return -4;
	var villageCoordsRegEx = /.*\s+\(\d\d\d|\d\d\d\)\sK\d\d/;
	if ( !villageCoordsRegEx.test(domElem.innerHTML) )
		return -5;
	return 1;
}
var isPlayer = function(domElem) {
	if ( !domElem )
		return -1;
	if ( domElem.nodeType!=1 )
		return -2;
	if ( domElem.tagName!="A" )
		return -3;
	var playerRegEx = /game\.php\?\&screen=info_player\&id=\d+/;
	if ( !playerRegEx.test(domElem.href) )
		return -4;
	return 1;
}
var isToIgnore = function(domElem) {
	if (!domElem )
		return true;
	if ( domElem.nodeType!= 1 )
		return true;
	if ( domElem.tagName == "BR" )
		return true;
	return false;
}

var errCount=0; //tine minte de cate ori a incercat sa citeasca un document si a esuat
var MAXerrCount=10; //la mai mult de 10 incercari ar trebui sa renunte
function verificaDocumentOK(pageDocument, pageNumber) {
	info("verific pagina "+pageNumber+" incercarea "+(errCount+1));
	//incearca sa gaseasca numarul paginii in continutul paginii tocmai incarcate. ar trebui sa fie 2 aparitii
	try {
		//mai intai cauta paginile
		var snapPagini = pageDocument.evaluate( '//table[@class="main"]//table[@width="100%"]//td[@align="right"][contains(.,"Pagina:")]', pageDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if ( snapPagini.snapshotLength < 2 ) {
			errCount ++;
			return false;
		}
		//trebuie gasita pagina curenta in contextul tuturor paginilor
		//pentru asta enumar prin elementele DOM, ar trebui sa fie de tip "a" cu continut [x] sau
		//"b" cu continut >x<
		var paginiElem = null;
		paginiElem = snapPagini.snapshotItem(0);
		
		var t_pag = {next_index:0};
		while ( t_pag = getChildElem(paginiElem, t_pag.next_index) ) {
			pagElem = t_pag.node;
			if ( pagElem.tagName == "B" ) {
				//am gasit elementul care contine numarul paginii, acum tre aflat numarul efectiv
				var nr = parseInt(pagElem.innerHTML.substr(4,pagElem.innerHTML.length-8))//codificarea este &gt;XX&lt;
				if ( nr!=pageNumber ) {
					info("pagina nu are valoarea care trebuie, valoarea gasita: "+nr+" continut element: "+pagElem.innerHTML);
					//activeazaDebug();
					break;
					//am gasit elementul care trebuie dar nu are valoarea care trebuie
					//errCount += MAXerrCount;// nu e pagina care trebuie, nu mai are rost cautarea
					//return false;
				} else {
					errCount = 0;
					info("ok");
					return true;
				}
			}
		}
	} catch (ex) {
		//reincearca
		info("eroare: "+ex.message);
		//activeazaDebug();
	}
	errCount ++;
	return false;
}


function prelucreazaDocument(pageDocument) { //stagiu poate fi: "incarcare" sau "parsare"
	var findForumAd = '//table[@class="main"]/tbody/tr/td/div';
	var snap = pageDocument.evaluate( findForumAd, pageDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	//sari peste primul post care este reclama intotdeauna
	//parseaza fiecare post dupa rezervari
	for ( i=1; i<snap.snapshotLength; i++) {
		thisNode = snap.snapshotItem(i);
		//info("currentNode: "+thisNode+(thisNode?thisNode.innerHTML:""));
		t_bara = getChildElem(thisNode);
		bara = t_bara.node;
		mesajBara = getChildElem(bara).node;
		t_player = getChildElem(mesajBara);
		playerLinkNode =t_player.node;
		//debugInfo += "<br>first child-child-child node: "+playerLinkNode;
		timeInfo = mesajBara.childNodes[t_player.next_index];//.nodeValue;
		t_continut = getChildElem(thisNode,t_bara.next_index);
		//debugInfo += "<br>time info: "+timeInfo;
		//cauta satele rezervate: tot ce apare ca element dom si nu este player
		//cautarea se termina cand un element care nu este player sau sat este descoperit
		//asta pentru a evita elementele ca: citari, comentarii, etc...
		continut = t_continut.node;
		var next_index = 0;
		var villages = new Array();
		while ( tuplu = getChildElem(continut, next_index) ) {
			node = tuplu.node;
			next_index = tuplu.next_index;
			if ( isVillage(node)>0 ) {
				villages[villages.length] = node;
				//info("am gasit sat "+node.innerHTML);
			} else {
				//debugInfo += "isVillage("+node.innerHTML+")="+isVillage(node);
				if ( isPlayer(node)<0 && !isToIgnore(node) )
					break;
				//else debugInfo += "isPlayer("+node.innerHTML+")="+isPlayer(node);
			}
		}
		listaRezervari[listaRezervari.length] = {
			player:playerLinkNode,
			time: timeInfo,
			villages: villages
		}
	}
	ForumAdIframe.src = "about:blank"; //sterge pagina curenta
	/*
	ForumAdIframe.contentDocument.open();
	ForumAdIframe.contentDocument.write("");
	ForumAdIframe.contentDocument.close();
	*/
}

var forumDocument = null;

var spanProcesareCurenta = document.createElement("span");
var paginiUrl = new Array();
var indexPagina=0;
function proceseazaPagini() {
	//alert("indexPagina="+indexPagina+" paginiUrl.length="+paginiUrl.length);
	if ( indexPagina >= paginiUrl.length ) {
		spanProcesareCurenta.innerHTML="";
		//info("indexPagina="+indexPagina+" paginiUrl.length="+paginiUrl.length);
		//alert("indexPagina="+indexPagina+" paginiUrl.length="+paginiUrl.length);
		genereazaTabel();
		//acesta este un alt punct final al executiei, deci afiseaza informatia de debug daca a fost ceruta
		arataDebug();
		return;
	}
	var pagUrl = paginiUrl[indexPagina++];
	spanProcesareCurenta.innerHTML="<span style='"+vizStyle+"'>...procesez pagina "+indexPagina+"...</span>";
	//daca nu este pagina curenta, incarca in iframe si proceseaza
	if ( pagUrl!="--pagina curenta--" ) {
		//pentru ca este firefox, atunci pot sa scriu doar:
		checkIframe();
		loadIframe(pagUrl, indexPagina);
		//debugInfo += "<hr><br>page "+pagUrl+" has doc? "+doc+"<br><hr>";
	} else {
		if ( forumDocument )
			prelucreazaDocument(forumDocument);
		proceseazaPagini();
	}
}
//lista cu rezervarile
//diferite prelucrari pot fi facute pe ea: daca o rezervare a fost indeplinita (satul apartine jucatorului)
//daca alt jucator a rezervat acelasi sat, etc...
//daca a trecut timpul rezervarii
var listaRezervari = new Array();

function checkIframe() {
	if ( !ForumAdIframe ) {
		ForumAdIframe = document.createElement("iframe");
		//ForumAdIframe.
		ForumAdIframe.style.display="none";
		//ForumAdIframe.height=1;
		document.body.appendChild(ForumAdIframe);
	}
}
function loadIframe(src, pagNr) {
	if ( ForumAdIframe ) {
		ForumAdIframe.src = src;
		info("set location to: "+src);
		setTimeout(doIframe,200);
		//return ForumAdIframe.contentDocument;
	}
}
function doIframe() {
	//debugInfo+="check location: "+ForumAdIframe.contentDocument.location;
	//ar trebui verificat ca documentul e cel care trebuie, daca nu trebuie asteptat...
	try {
		var doc = ForumAdIframe.contentDocument;
		if ( verificaDocumentOK(doc,indexPagina) ) {//foloseste indexul global
			prelucreazaDocument(doc);
			//alert("am procesat ok pagina "+indexPagina);
		} else if ( errCount < MAXerrCount ) {
			setTimeout(doIframe,200);
			return;
		} else {
			activeazaDebug();
			//alert("erori prea multe la pagina "+indexPagina);
			errCount = 0;
		}
	} catch ( ex ) {
		arataEroare(ex);
		//setTimeout(checkIframe,2000);
	}
	proceseazaPagini();
}
function genereazaTabel() {
	var doRow = function(player,time,village,obs,vcolor) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.appendChild(player.cloneNode(true));
		tr.appendChild(td);
		td = document.createElement("td");
		td.appendChild(time.cloneNode(true));
		tr.appendChild(td);
		td = document.createElement("td");
		if ( vcolor )
			td.bgColor = vcolor;
		td.appendChild(village.cloneNode(true));
		tr.appendChild(td);
		td = document.createElement("td");
		if ( obs ) {
			if ( typeof obs == "string" ) {
				if ( obs.length > 0 ) {
					sobs = document.createElement("span");
					sobs.innerHTML=obs;
					td.appendChild(sobs);
				}
			} else
				td.appendChild(obs.cloneNode(true));
		}
		tr.appendChild(td);
		return tr;
		//return "<tr><td>"+player+"</td><td>"+time+"</td><td>"+village+"</td></tr>";
	}
	//var tabel="<table border=1 cellspacing=0 cellpadding=4>";
	//header
	
	var tabel = document.createElement("table");
	tabel.id =  "TabelRezervari";
	tabel.border=1;
	tabel.cellspacing = "0px";
	tabel.cellpadding="4px";
	tbody = document.createElement("tbody");
	tabel.appendChild(tbody);
	colJucator = document.createElement("b");
	colJucator.innerHTML="Jucator";
	colRezervat = document.createElement("b");
	colRezervat.innerHTML="Rezervat la";
	colSat = document.createElement("b");
	colSat.innerHTML="Sat";
	colObs = document.createElement("b");
	colObs.innerHTML="Observatii";
	tbody.appendChild(doRow(colJucator,colRezervat,colSat,colObs));
	noVillage = document.createElement("span");
	noVillage.innerHTML="--------";
	var nrRezervari = 0;
	
	for (i=0; i<listaRezervari.length; i++)
		if ( listaRezervari[i].villages && listaRezervari[i].villages.length>0 )
			for ( j=0; j<listaRezervari[i].villages.length; j++) {
				//construieste observatii
				var elem_sat = listaRezervari[i].villages[j];
				var val_sat = elem_sat.innerHTML;
				//verifica daca satul este pe K-ul care trebuie
				var observatii = "";
				var bEroare = false;
				if ( currentK && val_sat.indexOf(currentK)==-1 ) {
					if ( observatii.length > 0 ) observatii +="<br>";
					observatii+="sat rezervat pe K-ul gresit";
					bEroare = true;
				}
				//cauta daca satul este deja rezervat mai sus
				for (ii=0; ii<=i; ii++)
					if ( listaRezervari[ii].villages && listaRezervari[ii].villages.length>0 )
						for ( jj=0; jj<(ii==i?j:listaRezervari[ii].villages.length); jj++)
							if ( val_sat == listaRezervari[ii].villages[jj].innerHTML ) {
								if ( observatii.length > 0 ) observatii +="<br>";
								observatii+="sat deja rezervat de "+listaRezervari[ii].player.innerHTML+listaRezervari[ii].time.textContent;
								bEroare = true;
							}
				var vcolor=null;
				if ( bEroare )
					vcolor = "#ff7777";
				tabel.appendChild(doRow(listaRezervari[i].player,listaRezervari[i].time,elem_sat, observatii,vcolor));
				nrRezervari ++;
			}
		else {
			tabel.appendChild(doRow(listaRezervari[i].player,listaRezervari[i].time,noVillage));
		}
	//tabel+="</table>";
	//alert("pun tabel");
	if ( TitleNode ) {
		var vizTabel = document.createElement("span");
		vizTabel.addEventListener("click", function(evt) { 
			if (tabel.style.display=="" ) {
				tabel.style.display = "none";
				this.innerHTML = "<span style='"+vizStyle+"'>arata tabel rezervari ["+nrRezervari+"]</span>";
			} else {
				tabel.style.display = "";
				this.innerHTML = "<span style='"+vizStyle+"'>ascunde tabel rezervari</span>";
			}
		}, false);
		vizTabel.innerHTML = "<span style='"+vizStyle+"'>arata tabel rezervari ["+nrRezervari+"]</span>";
		TitleNode.appendChild( vizTabel);
		tabel.style.display = "none";

		TitleNode.appendChild( tabel);
		//adauga cautarea
		intro = document.createElement("span");
		intro.innerHTML="<span style='font-size:10px;text-transform:uppercase;color:darkgreen;display:block;padding-top:4px;padding-bottom:4px;'>Cauta daca un sat e rezervat precizand coordonatele<br></span>";
		TitleNode.appendChild( intro);
		txtCoord = document.createElement("input");
		txtCoord.type = "text";
		txtCoord.size=10;
		txtCoord.value = "123|456";
		txtCoord.addEventListener("click", function(evt) { this.select(); }, false);
		function cauta(inputTxt) {
			var txt = "";
			var rcolor = "blue";
			var valid = true;
			//mai intai corecteaza valoarea din input
			var arrMatch = inputTxt.value.match(/(\d+\|\d+)/);
			if ( arrMatch.length>1 )
				inputTxt.value = arrMatch[1];
			else {
				txt="sat inexistent";
				rcolor="#FE7F00";
				valid = false;
			}
			if ( valid )
				for (ii=0; ii<listaRezervari.length; ii++)
					if ( listaRezervari[ii].villages && listaRezervari[ii].villages.length>0 )
						for ( jj=0; jj<listaRezervari[ii].villages.length; jj++)
							if ( listaRezervari[ii].villages[jj].innerHTML.indexOf(inputTxt.value)!=-1 ) {
								if ( txt.length > 0 ) txt +="<br>";
								txt+="sat deja rezervat de "+listaRezervari[ii].player.innerHTML+listaRezervari[ii].time.textContent;
								rcolor = "red";
							}
			if ( txt.length==0 ) {
				txt="sat nerezervat";
				rcolor = "green"
			}
			end.innerHTML = "<br><span style='font-size:10px;padding-top:4px;display:block;text-transform:uppercase;color:"+rcolor+";'>"+txt+"</span>";
		}
		txtCoord.addEventListener("keypress", function(evt) { if( evt.which == 13) cauta(this); }, false);
		TitleNode.appendChild( txtCoord);
		txtBut = document.createElement("input");
		txtBut.type = "button";
		txtBut.size=10;
		txtBut.value = "cauta";
		txtBut.addEventListener("click", function(evt) { cauta(txtCoord); }, false);
		TitleNode.appendChild( txtBut);
		var end = document.createElement("span");
		end.innerHTML="";
		TitleNode.appendChild( end);
	}	

}

	
	if ( document.body && document.body.tagName == "FRAMESET" ) {
		if ( document.body.cols!="*" )
			document.body.cols="*";
		if ( document.body.rows!="*" )
			document.body.rows="*";
	}
	var forumRegEx = /\/forum.php/;
	if ( forumRegEx.test(document.location.pathname) )
		forumDocument = document;
	else {
		if ( document.body && document.body.tagName == "FRAMESET" ) {
			for( i=0; i<window.frames.length; i++)
				if ( window.frames[i].name == 'main' ) {
					frms = window.frames[i].document.getElementsByTagName("iframe");
					for ( j=0; j<frms.length; j++)
						if ( forumRegEx.test(frms[j].document.location) ) {
							forumDocument = frms[j].document;
							break;
						}
					break;
				}
		}
	}
	var localForumRegEx = /file:\/\/\/.+\/forum.+\.php/;
	if ( localForumRegEx.test(document.location) )
		forumDocument = document;
	if ( forumDocument && forumDocument.location.href.indexOf("&NO_MANIPULATION=1")>=0 )
		forumDocument = null;
	if ( forumDocument ) {
		var bTopicRezervari = false;
		var findPattern = '//table[@class="main"]//table//tr/td/h2';
		var iterator = forumDocument.evaluate( findPattern, forumDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null ); 
		TitleNode = iterator.iterateNext();
		if ( TitleNode ) {
			var rezervariRegEx = /[rR][eE][zZ][eE][rR][vV].[rR][ieIE].*(\s[kK]?\s*(\d\d))?/;
			bTopicRezervari = rezervariRegEx.test(TitleNode.innerHTML);
			
			if ( bTopicRezervari ) {
				var nimereli = rezervariRegEx.exec(TitleNode.innerHTML);
				if ( nimereli.length>2 && nimereli[2] )
					currentK = "K"+nimereli[2];
				else {
					//ia numele K-ului din titlul categoriei
					var findCategorieCurenta = '//span[@class="forum selected"]/a';
					var snap = forumDocument.evaluate( findCategorieCurenta, forumDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
					if ( snap.snapshotLength > 0 ) {
						var text = snap.snapshotItem(0).innerHTML;
						var nimereli2 = /[kK]?\s*(\d\d)/.exec(text);
						if ( nimereli2 && nimereli2.length>1 )
							currentK = "K"+nimereli2[1];
					}
					
				}
				TitleNode.innerHTML += '&nbsp;<a href="http://ro5.triburile.ro/guest.php?screen=info_player&id=341202" target=_blank style="font-size:10px;padding: 1px;">&copy; ando</a>';
			}
			TitleNode.appendChild( spanProcesareCurenta);

			
		}
		var findForumAd = '//table[@class="main"]/tbody/tr/td/div';
		var snap = forumDocument.evaluate( findForumAd, forumDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
		if ( snap.snapshotLength > 0 ) {
			var ForumAdNode = snap.snapshotItem(0);
			if ( ForumAdNode ) {
				ForumAdIframe = getFirstChildElem(ForumAdNode);
				ForumAdIframe.src = "about:blank";
				//ForumAdIframe.height=1;
				ForumAdNode.style.display="none";
				
				//ForumAdNode.innerHTML="";
			}
		}
		if ( bTopicRezervari ) {
			//parseaza fiecare post dupa rezervari
			info("incepe parsarea nodurilor");
			//mai intai cauta paginile
			var snapPagini = forumDocument.evaluate( '//table[@class="main"]//table[@width="100%"]//td[@align="right"][contains(.,"Pagina:")]', forumDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			//trebuie gasita pagina curenta in contextul tuturor paginilor
			//pentru asta enumar prin elementele DOM, ar trebui sa fie de tip "a" cu continut [x] sau
			//"b" cu continut >x<
			var paginiElem = null;
			if ( snapPagini.snapshotLength > 0 )
				paginiElem = snapPagini.snapshotItem(0);
			
			var t_pag = {next_index:0};
			while ( t_pag = getChildElem(paginiElem, t_pag.next_index) ) {
				pagElem = t_pag.node;
				if ( pagElem.tagName == "A" )
					//salveaza url ca identificator
					paginiUrl[paginiUrl.length] = pagElem.href + "&NO_MANIPULATION=1";
				else if ( pagElem.tagName == "B" )
					paginiUrl[paginiUrl.length] = "--pagina curenta--";
			}
			//pentru fiecare pagina adaug inregistrari in lista de rezervari
			//paginile diferite de cea curenta trebuie luate cu xmlhttprequest
			proceseazaPagini();
		}
	}
} catch(ex) {
	//alert(ex.message);
	arataEroare(ex);
}
arataDebug();
}() //sfarsitul crearii + apelului functiei fara nume, pentru a avea un namespace distinct
