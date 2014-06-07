// ==UserScript==
// @name			Samu o kisu posonder Emo for FB
// @author			Mohib
// @description			সামু ও কিছু পছন্দের ইমো v2.2 (http://www.facebook.com/mbmohib)
// @version			2.2
// @versionnumber		2.2
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/139629
// @icon           http://saifulislam.info/samuscript/facebooksamuchat.png
// ==/UserScript==

var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3.5;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 864 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/121376.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"Mohib 'Samu+more Emo For FB'.\n" +
						"Mohib: " + version + "\n" +
						"Mohib: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Mohib ?")
			   ) openInTab('http://userscripts.org/scripts/show/139629');
		}
	}
	
// END

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
UpdateCheck();
	

var emoticonsListS = new Array();
var emoticonsListE = new Array();
var emoticonsListC = new Array();
var debugMode = false;

// code emoticons
//emoticonsListC[0] = "[[peennissee]]";
emoticonsListC[0] = "[[samuhasi]]";
emoticonsListC[1] = "[[closeuphasi]]";
emoticonsListC[2] = "[[chamhasi]]";
emoticonsListC[3] = "[[dhorakhaise]]";
emoticonsListC[4] = "[[kimojaa]]";
emoticonsListC[5] = "[[samujah]]";
emoticonsListC[6] = "[[monkharaap]]";
emoticonsListC[7] = "[[khayalamu]]";
emoticonsListC[8] = "[[kotmot]]";
emoticonsListC[9] = "[[bachaoo]]";
emoticonsListC[10] = "[[aammaaa]]";
emoticonsListC[11] = "[[samuobak]]";
emoticonsListC[12] = "[[samudash]]";
emoticonsListC[13] = "[[oidakii]]";
emoticonsListC[14] = "[[kilojja]]";
emoticonsListC[15] = "[[lojjapelum]]";
emoticonsListC[16] = "[[partiden]]";
emoticonsListC[17] = "[[eidaki]]";
emoticonsListC[18] = "[[hayhaay]]";
emoticonsListC[19] = "[[javagga]]";
emoticonsListC[20] = "[[orekhaise]]";
emoticonsListC[21] = "[[aajobto]]";
emoticonsListC[22] = "[[kosskii]]";
emoticonsListC[23] = "[[mojarto]]";
emoticonsListC[24] = "[[banglavai]]";
emoticonsListC[25] = "[[kidushtu]]";
emoticonsListC[26] = "[[hasteiasi]]";
emoticonsListC[27] = "[[owakthu]]";
emoticonsListC[28] = "[[ghumpaise]]";
emoticonsListC[29] = "[[ghumaai]]";
emoticonsListC[30] = "[[138500952931109]]";
emoticonsListC[31] = "[[363460793698354]]";
emoticonsListC[32] = "[[312004515520386]]";
emoticonsListC[33] = "[[312615488792622]]";
emoticonsListC[34] = "[[364105393643631]]";
emoticonsListC[35] = "[[319363251468506]]";
emoticonsListC[36] = "[[207725782644350]]";
emoticonsListC[37] = "[[124129714370600]]";
emoticonsListC[38] = "[[274914629225060]]";
emoticonsListC[39] = "[[208551699231052]]";
emoticonsListC[40] = "[[134695813311979]]";
emoticonsListC[41] = "[[333708903307152]]";
emoticonsListC[42] = "[[f9.devilface]]";
emoticonsListC[43] = "[[f9.cake]]";
emoticonsListC[44] = "[[f9.fastfood]]";
emoticonsListC[45] = "[[425229827524135]]";
emoticonsListC[46] = "[[.midfig]]";
emoticonsListC[47] = "[[f9.thumbsdown]]";


function initListeners(){
	
	if( document.addEventListener ){
		document.addEventListener( 'DOMNodeInserted', creaBarra, false );
		document.addEventListener( 'DOMNodeInsertedIntoDocument', creaBarra, false );
		debug("aggiunto addeventlistener");
	}
	else if( document.attachEvent ){
		document.attachEvent( 'DOMNodeInserted', creaBarra );
		document.attachEvent( 'DOMNodeInsertedIntoDocument', creaBarra );
		debug("aggiunto attachevent");
	}	
}

function creaBarra(event){ //prima di chiamare questo metodo controllo la presenza della barra
	try{
	
        var classeChat = 'fbnubflyoutfooter';
	
        var pchild = event.target.getElementsByTagName('div');
        
        var cf = null;
        var atmp = pchild;
	for(i=0;i<atmp.length;i++){
	
            if(atmp[i].className.toLowerCase().indexOf(classeChat)>=0 && atmp[i].nodeType === 1){
            
                if(atmp[i].id.toLowerCase()=='barra_emoticons'){
                    
                    return;
                }else{
			cf = atmp[i];
			/*var fbnubflyoutbody = atmp[i].previousSibling;
			fbnubflyoutbody.addEventListener('resize',riposizionaBarra,false);*/
                        break;
			
                }
            }
            
        }
      
	if(cf==null){return;}
	//inserisco il div
	var barra = document.createElement('div');
	barra.setAttribute('id','barra_emoticons');
	barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:13px;');
	popolaBarra(barra);
        var cop = document.createElement('div');
        //<div style="clear: both;"><span style="color:blue;">Facebook ChatPlus by </span><span style="color:red; font-size:8px;"> Giuseppe Maria D'Elia</span></div>
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:black;');
        cops1.innerHTML="<hr>সৌজন্যে ";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:11px;');
        cops2.innerHTML='<a href="https://www.facebook.com/mbmohib" target="_blank" style="text-decoration:none;">মুহিব</a>';
        cop.appendChild(cops1);
        cop.appendChild(cops2);
        barra.appendChild(cop);	
cf.appendChild(barra);
	
	}catch(e){
		debug(e);
	}
	
}



function popolaBarra(barra){
    try{
            
            //creo il bottone per minimizzare o massimizzare
            var minimize = document.createElement('div');
            minimize.setAttribute('id','fbcp_minimize');
            minimize.setAttribute('style','cursor:pointer;margin:0px 0 5px;background-color:#3B5998;color:white;font-weight:bold; width:auto;text-align:center;');
            minimize.innerHTML="সামু ও কিছু পছন্দের ইমো";
            minimize.addEventListener('click',showBarra,false);
            barra.appendChild(minimize);
            // inizio la lista di emoticons
            var lista = document.createElement('li');
            lista.setAttribute('id' , 'listaEmoticons');
            lista.setAttribute ('style', 'display:inline; visibility:hidden;');
            //inserisco prima le emoticons standard
            var posX = 0;
            var posY = 0;
            var cont = 1;
            for(i=0;i<emoticonsListS.length;i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; width:20px; ');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListS[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
                    imag.setAttribute('style',"cursor: pointer; background: url('http://static.ak.fbcdn.net/rsrc.php/v2/yM/r/WlL6q4xDPOA.png') no-repeat scroll " + posX +"px "+ posY +"px transparent; height:16px; width:16px; ");
                   
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    posX -=16;
                    imag.addEventListener('click', handleImg, false);
                    cont++;
                    
            }
            //inserisco le emoticons extra
            for(i =0; i<emoticonsListE.length ; i += 2){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer; width:20px;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListE[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/emote/'+ emoticonsListE[i+1] + '.gif');
                    
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    cont++;
            }
            //inserisco le emoticons code
            for(i =0; i<emoticonsListC.length ; i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer; width:20px;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListC[i]);
                    imag.setAttribute('height', '20px');
                    var nameEmo = emoticonsListC[i].substring(2,emoticonsListC[i].length-2);
                    imag.setAttribute('src','http://graph.facebook.com/'+ nameEmo  + '/picture ');                    
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    cont++;
            }


            barra.appendChild(lista);
    }catch(e){
            debug(e);
    }
}

function handleImg(event){
    inserisciInChat(event.target);
}

function inserisciInChat(elem){
	var listaemoticons = elem.parentNode.parentNode;	
	var barra = listaemoticons.parentNode;
	var inputcontainer = barra.previousSibling;
while(inputcontainer.className.toLowerCase().indexOf('inputcontainer')<0){
inputcontainer = inputcontainer.previousSibling;
}
	var arrayInput = inputcontainer.getElementsByTagName('textarea');
	
	var str = elem.getAttribute('alt');
        
	          for (i =0;i<arrayInput.length; i++){
	            if (arrayInput[i].className.toLowerCase().indexOf('input')>=0){
	                arrayInput[i].value += " " + str + " ";
	                arrayInput[i].focus();
	                
	                break;
	            }
	          }
	         
        
}


function showBarra(event){

	
	var fbnubflyoutfooter = event.target.parentNode.parentNode;
	var fbnubflyoutbody = fbnubflyoutfooter.previousSibling;
	var fbnubflyoutheader = fbnubflyoutbody.previousSibling;
	var fbnubflyoutinner = fbnubflyoutheader.parentNode;
	var fbnubflyoutouter = fbnubflyoutinner.parentNode;
	var fbnubflyout = fbnubflyoutouter.parentNode;
	var vbnubchattab = fbnubflyout.parentNode;
	var barra = event.target.parentNode;
	var minimize = event.target;
	var listaemoticons = minimize.nextSibling;
	
		hgt = parseInt(fbnubflyoutbody.style.height);
		
		var altezzaemo = 122;
            if(listaemoticons.style.visibility == "hidden"){
               listaemoticons.style.visibility = "visible";
                               
                minimize.innerHTML= "সামু ও কিছু পছন্দের ইমো";
                fbnubflyoutfooter.style.height= "160px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "সামু ও কিছু পছন্দের ইমো";
                fbnubflyoutfooter.style.height= "auto";                
                fbnubflyoutbody.style.height=(hgt+altezzaemo)+"px";
                
            }       

	          
          }


function debug(e){
	if(debugMode){
		alert(e);
	}
}
//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();


//#--------------------------------------------------------------------Big Chat --------------------------------------------------------------------#\\
var chatNewHeight = 300; //limited by other stuff not to fly off the page
var chatNewWidth = 280; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 0; // Chat entry size - icon
var fbSidebarSize = 205

function chatResizeAction() { 

        chatNewWidth = 280;
        chatNewHeight = 400;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 6;
    
    reFlow();
}


 //----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;
    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
	addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 2px; }"
    )
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbMercuryChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");
    addGlobalStyle(
      ".fbMercuryChatTab .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}" +
	  "#fbDockChatTabs .fbMercuryChatTab.opened {" +
	  "width: " + chatNewWidth + "px !important; " +
	  "}"
    )
 addGlobalStyle(".emote_custom { height: 38px !important; width: 38px !important; } ");
    addGlobalStyle("tbody { vertical-align: bottom; }");
}
reFlow();
//#-------------------------------------------------------------------- End Big Chat --------------------------------------------------------------------#\\