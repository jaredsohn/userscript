// ==UserScript==
// @name           MtG DeckPrint
// @namespace      http://www.deckcheck.net/deck/print
// @description    Print MtG Magic The Gathering decks at www.DeckCheck.net
// @include        http://www.deckcheck.net/deck.php?id=*
// ==/UserScript==

var deckcheck_current_version = 0.3 ;

function byId(tagId){
	return document.getElementById(tagId);
}

function byTag(tagName,elm){
	var elm = elm || document;
	var returnElements = [];
	var elements = (tagName == "*" && elm.all)? elm.all : elm.getElementsByTagName(tagName);
	var length = elements.length;
	for(var i=0; i<length; i++){
		returnElements.push(elements[i]);
	}
	return returnElements;
}

function byClass(className, elm, tag){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = byTag(tag,elm);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

unsafeWindow.quanteCarteStampare=function(q){
	
	var n=q.id.substr(3);
	var isSideboard = q.className == "isSideboard" ;
	script
	var ITEM = isSideboard ? sb[n] : md[n] ;
	
	var BOTH = ( typeof sb[ITEM.name]!="undefined" && typeof md[ITEM.name]!="undefined" ) ;
	
	var value_q = q.options[q.options.selectedIndex].value * 1 ;
	var quante;
	if(BOTH){
		var p = byId((isSideboard?'md':'sb')+'-'+ITEM.name) ;
		var value_p = p.options[p.options.selectedIndex].value * 1 ;
		var total   = value_p + value_q ;
		if(total>ITEM.max){
			p.options.selectedIndex=ITEM.max-value_q;
			quante=ITEM.max;
		}else{
			quante=total;
		}
	}else{
		quante=value_q;
	}
	
	var cards=byClass(ITEM.name);
	for(var i=0;i<cards.length;i++){
		cards[i].style.display='none';
	}
	for(var i=0;i<quante;i++){
		cards[i].style.display='inline';
	}
	
}

items=[];
md={};
sb={};

window.addEventListener('load', function(event) {
	
	var BODY=byTag('BODY')[0];
	var HEAD=byTag('HEAD')[0];
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://jure.mephit.it/wp-content/uploads/deckcheck_version.js",
		onload: function(responseDetails) {
			eval ("var o = "+responseDetails.responseText);
			if ( o.lastestVersion > deckcheck_current_version ){
				var H1=byTag('h1')[0];
				H1.innerHTML='<a href="http://online-games-hacks.blogspot.com/2008/10/print-magic-gathering-decks-in-1-click.html" target="_blak" style="font-size:12pt;font-style:italic;">Download MtG DeckPrint update: v'+o.lastestVersion+'</a><br><br>'+H1.innerHTML;
			}
			
		}
	});
	
	var STYLE=document.createElement('STYLE');
	STYLE.media="print";
	STYLE.innerHTML+="#stampaCarte IMG{width:6.4cm;height:8.7cm;}";
	STYLE.innerHTML+="#aa{display:none;}";
	STYLE.innerHTML+="BODY{background:none;}";
	STYLE.innerHTML+="#topper{display:none;}";
	STYLE.innerHTML+="#trail_image{display:none;}";
	HEAD.appendChild(STYLE);
	
	var STYLE=document.createElement('STYLE');
	STYLE.innerHTML+="#stampaCarte{display:none;}";
	STYLE.media="screen";
	//HEAD.appendChild(STYLE);
	
	BODY.innerHTML+='<div id="stampaCarte"></div>';
	
	// If you want add aa tab, do like that:
	/*
	var tabMenu=byTag('UL',byId('large'))[0];
	tabMenu.innerHTML+='<li><a href="javascript:window.print();">PRINT</li>';
	*/
	
	// Gather HTML elements corresponding to cards
	var a = byTag('a',byId('deck'));
	for(var i=0;i<a.length;i++){
		var isSideboard=a[i].parentNode.parentNode.className == "sb";
		a[i].className = isSideboard ? "isSideboard" : "" ;
		items.push(a[i].parentNode);
	}
	
	// Create JSON object collecting cards
	for(var i=0;i<items.length;i++){
		var ITEM=items[i];
		var LINK=byTag('a',ITEM)[0];
		
		n=ITEM.innerHTML.match(/s\('(\w+)/)[1];
		
		var quante=parseInt(ITEM.innerHTML);
		switch(n){
			case"Plains":
			case"Forest":
			case"Mountain":
			case"Swamp":
			case"Island":
				var quante_max=30;
			break;
			default:
				var quante_max=4;
			break;
		}
		
		if(LINK.className=="isSideboard"){
			sb[n]={
				name:n,
				quante:quante,
				max:quante_max,
				ref:ITEM
			}
		}else{
			md[n]={
				name:n,
				quante:quante,
				max:quante_max,
				ref:ITEM
			}
		}
	}
	
	// Prepare create combo boxes
	function addComboBoxes(ITEM,isSideboard){
		var SELECT='<select id="'+(isSideboard?'sb':'md')+'-'+ITEM.name+'" class="'+(isSideboard?'isSideboard':'')+'" onchange="quanteCarteStampare(this);">';
		for(var j=0;j<=ITEM.max;j++){
			SELECT+='<option';
			if(j==ITEM.quante){
				SELECT+=' style="font-weight:bold;font-style:italic;" selected>'+j;
			}else{
				SELECT+='>'+j;
			}
			SELECT+='</option>';
		}
		SELECT+='</select>';
		var ASTERISC='';
		if( typeof sb[ITEM.name]!="undefined" && typeof md[ITEM.name]!="undefined" )ASTERISC+='<strong style="cursor:help;" title="This card is present both in deck and sideboard"> * </strong>';
		ITEM.ref.innerHTML = SELECT + ASTERISC + ITEM.ref.innerHTML.substr(ITEM.ref.innerHTML.indexOf(" ")) ;
	}
	
	// Prepare draw cards
	function addCard(ITEM,isSidebar){
		var stampaCarte=byId('stampaCarte');
		var alreadyDrawn=byClass(ITEM.name,stampaCarte);
		if(isSidebar && alreadyDrawn.length!=0){
			
			var countdown=ITEM.quante;
			for(var j=0;j<alreadyDrawn.length;j++){
				if(countdown==0)break;
				var card=alreadyDrawn[j];
				if(card.style.display=="none"){
					card.style.display="inline";
					countdown--;
				}
			}
			
		}else{
			
			for(var j=0;j<ITEM.max;j++){
				var carta='';
				carta+='<img src="http://www.deckcheck.net/pix/'+ITEM.name+'.jpg" class="'+ITEM.name+'" style="width:6.2cm;height:8.7cm;border:0;';
				if(j>=ITEM.quante){
					carta+='display:none;';
				}else{
					carta+='display:inline;';
				}
				carta+='">';
				stampaCarte.innerHTML+=carta;
			}
			
		}
	}
	
	// Do prepared actions
	for(i in md){
		addComboBoxes(md[i],false);
		addCard(md[i],false);
	}
	for(i in sb){
		addComboBoxes(sb[i],true);
		addCard(sb[i],true);
	}

},true);
