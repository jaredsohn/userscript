// ==UserScript==
// @name           Anobii group updates
// @namespace      tag:fms@linux.it,2009-03-18:anobiiGroupUpdates 
// @description    A script to add timestamp of last updates to the list of groups presented by anobii
// @include        http://www.anobii.com/group_owner*
// ==/UserScript==

// CONFIGURAZIONE
var secsBetweenUpdates = 3000 ;
// FINE CONFIGURAZIONE

var groupSection = new Object ;
var processingRequest = false ;
var toProcess = null ;
var msgDiv = null ;
var lastUpdate = 0 ;

var muSecsBetweenUpdates = 1000 * secsBetweenUpdates ;

updateMsgDiv = function() {
	if (msgDiv == null) {
		msgDiv = document.createElement("div") ;
		msgDiv.style.background = "yellow" ;
		msgDiv.style.position = "fixed" ;
		msgDiv.style.verticalAlign= "middle" ;
		msgDiv.style.fontSize = "24pt" ;
		msgDiv.style.top = "50%" ;
		msgDiv.style.bottom = "50%" ;
		msgDiv.style.left = "50%" ;
		msgDiv.style.right = "50%" ;
		msgDiv.style.width = "100px" ;
		msgDiv.style.height = "50px" ;
		msgDiv.style.border = "2px solid black" ;
		document.body.appendChild(msgDiv) ;
	}
	else if (toProcess == 0) {
		document.body.removeChild(msgDiv) ;
		msgDiv = null ;
	}
	if (msgDiv.childNodes.length > 0)
		msgDiv.removeChild(msgDiv.childNodes[0]) ;
	var txtNode = document.createElement("div") ;
	txtNode.appendChild(document.createTextNode(toProcess + "...")) ;
	txtNode.style.position = "relative" ;
	txtNode.style.top    = "25%" ;
	txtNode.style.bottom = "25%" ;
	txtNode.style.marginLeft   = "auto" ;
	txtNode.style.marginRight  = "auto" ;
	msgDiv.appendChild(txtNode) ;
}



getUpdates = function() {
	var elapsed = (new Date()).getTime() - lastUpdate ;
	if (elapsed < muSecsBetweenUpdates) {
		alert("Aggiornamenti scaricati " + parseInt(elapsed / 1000) + " secondi fa, si sconsiglia di scaricarli nuovamente per non appesantire il lavoro del server di Anobii. Attendere " +
			parseInt((muSecsBetweenUpdates - elapsed) / 1000) + " secondi oppure ricaricare la pagina.") ;
		return ;
	}

	var links = document.getElementsByTagName("a") ;
	var count = 0 ;

// Loop a first time on links to count the ones which shall really be processed
	toProcess = 0 ;
	for (var i=0 ; i < links.length ; i++) {
		var link = links[i] ;
		var grurl = link.getAttribute("href") ;
		var class = link.getAttribute("class") ;
		if (grurl.indexOf("/groups/") == 0 && class == null)
			toProcess++ ;
	}
	updateMsgDiv() ;
	
	for (var i=0 ; i < links.length ; i++) {
		var link = links[i] ;
		var grurl = link.getAttribute("href") ;
		var class = link.getAttribute("class") ;
		if (grurl.indexOf("/groups/") == 0 && class == null) {
			count++ ;
//			if (count > 3) break ;
			groupSection[grurl] = link.parentNode.getElementsByTagName("span")[0] ;
			startNextRequest(grurl, link) ;
		}
	}
} ;


startNextRequest = function(grurl, link) {
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://www.anobii.com' + grurl,
		onload:function(responseDetails){
			var update = "nessun aggiornamento recente" ;
			if (responseDetails.responseText.match(/<h4 class="divider_head">[\s\S]*?<h4 class="divider_head">[\s\S]*?<td class="reply_count">(.*?)<\/td>[\s\S]*?<td>(.*?)<\/td>/))
				update = RegExp.$2 ;

			var b ;
			var bolds = groupSection[grurl].getElementsByTagName("B") ;
			if ( bolds.length > 0 ) {
				b = bolds[0] ;
				b.firstChild.data = update ;
			}
			else {
				b = document.createElement("B") ;
				groupSection[grurl].appendChild(b) ;
				b.appendChild(document.createTextNode(update)) ;
			}
			link.setAttribute("TARGET", "_blank") ;
			toProcess -- ;
			updateMsgDiv() ;
			lastUpdate = (new Date()).getTime() ;
		}
	});
} ;
	
var head = document.getElementById("page_head") ;
var span = head.getElementsByTagName("span")[0] ;
span.appendChild(document.createTextNode(" ")) ;
var link = document.createElement("a") ;
link.addEventListener("click", getUpdates, true) ;
link.setAttribute("href", "#") ;
link.appendChild(document.createTextNode("Visualizza aggiornamenti")) ;

span.appendChild(link) ;