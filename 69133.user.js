// ==UserScript==
// @name        Szene Fixer
// @namespace   http://userscripts.org/******
// @description Some useful functions for szene1.at
// @include     http://www.szene1.at/*
// @author      Matthias Schörghuber
// @version     1.05
// @time		9.9.2010  
// ==/UserScript==

/*
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" http://de.wikipedia.org/wiki/Beerware
* Du kannst mit diesem Script machen, was immer du willst. Sollten wir uns eines
* Tages treffen, und du findest, dass es das Script wert ist, kannst du mir ein
* Bier ausgeben.
* ----------------------------------------------------------------------------
*/

/** Changelog
v1.05
- fixed: UP & Event Fotobrowser
- disabled: Chat closing feature - den gibts nicht mehr :D
v1.04
- added: Closing Chat
- fixed: Event Foto Browsing
v1.03
- added: < in PN's ermöglicht
v1.02
- Supportanfragen fixed
v1.01
- Freundschaftsanfagen fixed
- Design fix deaktiviert
v1.0 
Initial Release
*/

/** Configuration */

var designFix = true;	//true = enable
var delSysPNs = true;


//PN Deleting
var idPrefix = "pn_tr_";
var idSmsgPrefix = "pn_r_id_";
var delPrefix = "id_del_pn_";
var formlist_id = "markedpnslist";
var form_id = "markedpnsform";
var SystemPnClassName = "ICON16_PN_BW_SYSTEMPN";
var pnListBody 	= "yui-main";
var pnId_Prefix = "pn_tr_";			//Prefix of Id in <tr> tag
var pnDel_Form_List = "markedpnslist";
var pnDel_Form_List_Delmiter = ",";
var pnDel_Form 	= "markedpnsform";

//Links
var link_Inbox = "http://www.szene1.at/pn/in";
var link_PopUpInbox = "http://www.szene1.at/pn/popup/1";

//FotoBrowsing
var ufotos_thumb_prefix = 'ustn';
var ufotos_img_prefix = 'usph';
var efotos_thumb_prefix = 'evsn';
var efotos_img_prefix = 'evs1';


function loader(){

	switch(GM_getValue('redirect')){
		case 'inbox':
			GM_setValue('redirect', '');
			window.location = link_Inbox;
			return;
			break;
		case 'popupinbox':
			GM_setValue('redirect', '');
			window.location = link_PopUpInbox;
			return;
			break;
		default:
	}
	if(GM_getValue('msg')){
		writeMessage(GM_getValue('msg'));
		GM_setValue('msg','');
	}
	
	var url = document.URL.split('/');
	var section = url[3];
	var action = url[4];
	switch(section){
		//-------------------------- PN ---
		case 'pn':
			if(delSysPNs){
				switch(action){
					case 'in':
						pn_DelSystemPn('inbox');
						break;
					case 'popup':
						pn_DelSystemPn('popupinbox');
						break;
				}
			}
			if(action == "write" || (action == "popup" && url[5] == "write")){
				pn_checkGreater();
			}
			break;
		//-------------------------- User ---
		case 'user':	
			if(url[5] == 'album'){	//If in album
				ufotos_viewer();
			}
			break;
		//-------------------------- Events ---
		case 'event': 	
			ufotos_viewer();
			break;
			
	}

	if(designFix){
		design_fix();	
	}
	
}

/**
 * Design fix
 */

function design_fix(){
	//design_UserPanel();
	design_removeAd();
}
function design_removeAd(){
if(document.getElementById('bigSizeBanner'))
	document.getElementById('bigSizeBanner').style.display = "none";
if(document.getElementById('contentRightsmallSky'))
	document.getElementById('contentRightsmallSky').style.display = "none";
}
function design_UserPanel(){
	userPanel = document.getElementById('userPanel');
	userPanel.style.overflow = "visible";
	//userPanel.style.height = "70px";
	//userPanel.style.backgroundColor = "#000000";
	
	userImg = document.getElementById('userPanelImage');
	userImg.childNodes[1].childNodes[1].height = "50";
	userImg.childNodes[1].childNodes[1].width = "50";
	userImg.style.marginTop = "3px";
	
	userPn = document.getElementById('userPanelPn');
	userPn.style.marginLeft = "5px";
	userPn.style.marginTop = "5px";
	
	userLinks = document.getElementById('userPanelLinks');
	userLinks.style.marginLeft = "0px";
	//userLinks.style.width = "250px";
	userLinks.style.overflow = "hidden";
	
	userBtn = document.getElementById('buttonsRight');
	userBtn.style.width="80px";
	userBtn.style.overflow="hidden";
}

/**
 * Better Browsing
 */
function viewer_div(){
	if(!document.getElementById('s1f_viewer')){
		newElement = document.createElement('div');
		newElement.id = "s1f_viewer";
		document.body.appendChild(newElement);
		//Design
		newElement.style.backgroundColor = "#FFFFFF";
		newElement.style.padding = "2px";
		newElement.style.border = "1px solid #C0C0C0";
		newElement.style.position = "fixed";
		newElement.style.top = "20px";
		newElement.style.right = "20px";
		newElement.style.display = "none";
		
		eventThingX = 0;
		eventThingY = 0;
		newElement.addEventListener(
		  'mouseover',
		  function(event) {
			this.style.display = "inline";
		  },
		  true);
		newElement.addEventListener(
		  'mouseout',
		  function(event) {
			window.clearTimeout(100);
			this.style.display = "none";
		  },
		  true);
		newElement.addEventListener(
		  'mousemove',
		  function(e) {
			if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 1337) {
			  window.clearTimeout(100);
			  this.style.display = "none";
			}
		  },
		  true);
		return newElement;
	}
	return document.getElementById('s1f_viewer');
}



function addClickListenerToElems(elems, listener){
	for(var i = 0; i < elems.length; i++){
		addClickListenerToElem(elems[i],listener);
	}
}
function addClickListenerToElem(elem, listener){
		elem.addEventListener(
				'click',
				function(event) {
					document.getElementById('sfixer_imgbrwst').innerHTML = 'Szene1 Fixer - Init Script...';
					setTimeout(listener, 1000);
				},
				true);	
}

//Viewer for Userpagefotos
function ufotos_viewer(){
	var viewer = viewer_div();	
	if(!document.getElementById('sfixer_imgbrwst')){
		var blub = document.createElement('span');
		blub.id = "sfixer_imgbrwst";
		document.getElementById('pagingTop').parentNode.appendChild(blub);
		document.getElementById('sfixer_imgbrwst').innerHTML = 'Szene1 Fixer - Init Script...';
	}
	

	var allImages = document.evaluate("//img[contains(@src, 'fsc.szene1.at/')]",
                                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, allImages);

	addClickListenerToElems(document.getElementById('pagingTop').childNodes, ufotos_viewer);
	addClickListenerToElems(document.getElementById('pagingBottom').childNodes, ufotos_viewer);
	addClickListenerToElem(document.getElementById('nextPage'), ufotos_viewer);
	addClickListenerToElem(document.getElementById('prevPage'), ufotos_viewer);								
									
	for(var i = 0; i < allImages.snapshotLength; i++){
		imgDiv = allImages.snapshotItem(i);
		hoverDiv = imgDiv.parentNode;
		if(hoverDiv.name=="showBigPhoto"){
			hoverDiv.id = imgDiv.src;
			hoverDiv.addEventListener(
				'mouseover',
				function(event) {
					var img_url = this.id;	
					fullsize_url = img_url.replace('/.jpg/g','_.jpg');
					fullsize_url = fullsize_url.replace(/ustn/g, ufotos_img_prefix);
					fullsize_url = fullsize_url.replace(/evtn/g, efotos_img_prefix);

					viewer.innerHTML = "Loading...";
					viewer.style.display = "inline";
					globalTimer = window.setTimeout(
						function (hoverDiv) {return function(result) {
							viewer.innerHTML = "<img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block;' src='" + fullsize_url + "'>";
					}}(hoverDiv),500
				  );
				},
				true);
			hoverDiv.addEventListener(
				'mouseout',
				function(event) {
				  window.clearTimeout(globalTimer);
				  viewer.style.display = "none";
				},
				true);
		}
	}
	document.getElementById('sfixer_imgbrwst').innerHTML = '';
	
}


 /**
  * PN Advertisment deleting
  * @param redirect : wo es hinleiten soll
  */
function pn_DelSystemPn(redirect){
	var pns = document.evaluate("//div[starts-with(@class, '"+SystemPnClassName+"')]",
                                    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, pns);
	var found = 0;
	var delList = document.getElementById(pnDel_Form_List);
	for( var k=0; k < pns.snapshotLength; k++ ) {
		var item = pns.snapshotItem(k);
		var pnId = item.parentNode.parentNode.id.substr(pnId_Prefix.length);
		
		var excludeArray = new Array("Szene1.atFreundschaftsanfrage","Szene1.atSupport");
		
		var spam = true;
		var short_msg = document.getElementById(idSmsgPrefix+pnId).innerHTML;
		for(var i = 0; i < excludeArray.length; i++){
			var regEx = new RegExp(excludeArray[i]);
			if(short_msg.search(regEx) > -1){
				spam = false;
			}
		}
		
		if(spam){
			if(found > 0){
				delList.value += pnDel_Form_List_Delmiter;
			}
			delList.value += pnId;
			found++;
		}
	}
	if(found > 0){
		GM_setValue('msg', 'Es wurden ' + found + ' Elemente in den Papierkorb verschoben.');
		GM_setValue('redirect', redirect);
		document.getElementById(pnDel_Form).submit();
	}
}

// Replaces < with &lt;   because Szene1 XSS protection sucks
function pn_checkGreater(){
	textarea = document.getElementById('textarea');
	pn_btn = document.getElementById('pnformsendbutton');
	pn_btn.addEventListener(
			'click',
			function(event) {
				if(textarea.value.search(/</) > -1){
					GM_setValue('msg', 'Sie verwendeten in Ihrer Nachricht ein < Zeichen. Bei Szene1 wird dieses Zeichen nicht unterstützt.<br />Szene1 Fixer wandelte es in ein gültiges Zeichen um.');
					textarea.value = textarea.value.replace(/</g,'&lt;');
				}
				return true;
			},
			true);
}

function writeMessage(message){
	var main, newElement;
	main = document.getElementById('content');
	newElement = document.createElement('div');
	if(main){
		main.parentNode.insertBefore(newElement, main);
	}else{
		document.body.appendChild(newElement);
	}

	//Design
	newElement.innerHTML = "<b>Szene1 Fixer:</b> "+message;
	newElement.style.backgroundColor = "#FFFFD4";
	newElement.style.padding = "4px";
	newElement.style.border = "1px solid #FFD42A";
	newElement.style.margin = "4px";
	
}

//Start Script
setTimeout(loader,1000);