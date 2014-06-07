// ==UserScript==
// @name			Facebook Chat More Emoticons+
// @author			NonGyEN
// @description			เพิ่มอีโมติค่อนลงในกล่องแชท Facebook พัฒนาโดย NonGyEn เวอร์ชั่น 3.5 (http://www.facebook.com/nongyen.programmer)
// @version			3.5
// @versionnumber		3.5
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/121376
// @icon           http://image.free.in.th/z/ib/facebookchat.png
// ==/UserScript==

var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3.5;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

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
			if(confirm(	"มีเวอร์ชั่นใหม่สำหรับ 'Facebook Chat More Emoticons+'.\n" +
						"เวอร์ชั่นปัจจุบัน: " + version + "\n" +
						"เวอร์ชั่นใหม่: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"คุณควรที่จะติดตั้งมัน ?")
			   ) openInTab('http://userscripts.org/scripts/source/121376.user.js');
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
// standard emoticons
emoticonsListS[0]  = ":)";
emoticonsListS[1]  = ":(";
emoticonsListS[2]  = ":p";
emoticonsListS[3]  = ":D";
emoticonsListS[4]  = ":o";
emoticonsListS[5]  = ";)";
emoticonsListS[6]  = "8)";
emoticonsListS[7]  = "8|";
emoticonsListS[8]  = ">:(";
emoticonsListS[9]  = ":/";
emoticonsListS[10]  = ":'(";
emoticonsListS[11]  = "3:)";
emoticonsListS[12]  = "O:)";
emoticonsListS[13]  = ":*";
emoticonsListS[14]  = "<3";
emoticonsListS[15]  = "^_^";
emoticonsListS[16]  = "-_-";
emoticonsListS[17]  = "o.O";
emoticonsListS[18]  = ">:O";
emoticonsListS[19]  = ":v";
emoticonsListS[20]  = ":3";
emoticonsListS[21]  = "(y)";
// extra emoticons
emoticonsListE[0] = ":putnam:";
emoticonsListE[1] = "putnam";
emoticonsListE[2] = "(^^^)";
emoticonsListE[3] = "shark";
emoticonsListE[4] = ":42:";
emoticonsListE[5] = "42";
emoticonsListE[6] = ":|]";
emoticonsListE[7] = "robot";
emoticonsListE[8] = "<(\")";
emoticonsListE[9] = "penguin";
// code emoticons
//emoticonsListC[0] = "[[peennissee]]";
emoticonsListC[0] = "[[tiimide]]";
emoticonsListC[1] = "[[tiiimidee]]";
emoticonsListC[2] = "[[Coeur130]]";
emoticonsListC[3] = "[[295390167186206]]";
emoticonsListC[4] = "[[coeur233]]";
emoticonsListC[5] = "[[coeur12]]";
emoticonsListC[6] = "[[315721781819711]]";
emoticonsListC[7] = "[[134823553281107]]";
emoticonsListC[8] = "[[159050490867328]]";
emoticonsListC[9] = "[[295437087159559]]";
emoticonsListC[10] = "[[181121868652317]]";
emoticonsListC[11] = "[[296239407086564]]";
emoticonsListC[12] = "[[285756594808082]]";
emoticonsListC[13] = "[[242940279109002]]";
emoticonsListC[14] = "[[264000353661534]]";
emoticonsListC[15] = "[[295707353800293]]";
emoticonsListC[16] = "[[272758526114508]]";
emoticonsListC[17] = "[[272758526114508]]";
emoticonsListC[18] = "[[186271624802554]]";
emoticonsListC[19] = "[[306140386091878]]";
emoticonsListC[20] = "[[221832151226580]]";
emoticonsListC[21] = "[[198947756866358]]";
emoticonsListC[22] = "[[311970972176096]]";
emoticonsListC[23] = "[[144895178953675]]";
emoticonsListC[24] = "[[145225882254911]]";
emoticonsListC[25] = "[[224502284290679]]";
emoticonsListC[26] = "[[155393057897143]]";
emoticonsListC[27] = "[[326134990738733]]";
emoticonsListC[28] = "[[301206263254875]]";
emoticonsListC[29] = "[[224327770976718]]";
emoticonsListC[30] = "[[245307658872150]]";
emoticonsListC[31] = "[[138500952931109]]";
emoticonsListC[32] = "[[254708701262201]]";
emoticonsListC[33] = "[[253974841334328]]";
emoticonsListC[34] = "[[345425488820942]]";
emoticonsListC[35] = "[[355316531150134]]";
emoticonsListC[36] = "[[244276778975060]]";
//Version 3.2
emoticonsListC[37] = "[[256450607761963]]";
emoticonsListC[38] = "[[207725782644350]]";
emoticonsListC[39] = "[[124129714370600]]";
emoticonsListC[40] = "[[239174449499676]]";
emoticonsListC[41] = "[[239180809499040]]";
emoticonsListC[42] = "[[239181232832331]]";
emoticonsListC[43] = "[[239185909498530]]";
emoticonsListC[44] = "[[239185919498529]]";
emoticonsListC[45] = "[[239185912831863]]";
emoticonsListC[46] = "[[239190792831375]]";
emoticonsListC[47] = "[[239190796164708]]";
emoticonsListC[48] = "[[239190799498041]]";
emoticonsListC[49] = "[[239192696164518]]";
emoticonsListC[50] = "[[239192712831183]]";
emoticonsListC[51] = "[[239193352831119]]";
emoticonsListC[52] = "[[239200362830418]]";
//Version 3.5 Add Icon LINE By NonGyEN
emoticonsListC[53] = "[[103060529848716]]";
emoticonsListC[54] = "[[352231478194870]]";
emoticonsListC[55] = "[[170730406397056]]";
emoticonsListC[56] = "[[425229827524135]]";
emoticonsListC[57] = "[[119573904856408]]";
emoticonsListC[58] = "[[400009896721075]]";
emoticonsListC[59] = "[[145624042246549]]";
emoticonsListC[60] = "[[306327692807944]]";
emoticonsListC[61] = "[[245920182196833]]";
emoticonsListC[62] = "[[444989695543870]]";
emoticonsListC[63] = "[[499142520098779]]";
emoticonsListC[64] = "[[120215928126049]]";
emoticonsListC[65] = "[[342280675862263]]";
emoticonsListC[66] = "[[137231029756920]]";
emoticonsListC[67] = "[[283775208394259]]";
emoticonsListC[68] = "[[362094087203120]]";
emoticonsListC[69] = "[[386526518082880]]";
emoticonsListC[70] = "[[414918151889140]]";
emoticonsListC[71] = "[[411481458914282]]";
emoticonsListC[72] = "[[448887665163427]]";
emoticonsListC[73] = "[[330307067065370]]";
emoticonsListC[74] = "[[416251648423484]]";
emoticonsListC[75] = "[[104868626333836]]";
emoticonsListC[76] = "[[107960569357582]]";
emoticonsListC[77] = "[[nongyen]]";




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
	barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:17px;');
	popolaBarra(barra);
        var cop = document.createElement('div');
        //<div style="clear: both;"><span style="color:blue;">Facebook ChatPlus by </span><span style="color:red; font-size:8px;"> Giuseppe Maria D'Elia</span></div>
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:blue;');
        cops1.innerHTML="<hr>ปรับปรุงโดย ";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML='<img src="http://image.free.in.th/z/in/facebook_like_buton.png" width="20" style="padding-top:5px;"> <a href="http://www.facebook.com/nongyen.programmer" target="_blank" style="text-decoration:none;">NonGyEN</a>';
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
            minimize.innerHTML="เปิดแถบแสดงอีโมติค่อน";
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
		
		var altezzaemo = 225;
            if(listaemoticons.style.visibility == "hidden"){
               listaemoticons.style.visibility = "visible";
                               
                minimize.innerHTML= "ปิดแถบแสดงอีโมติค่อน";
                fbnubflyoutfooter.style.height= "267px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "เปิดแถบแสดงอีโมติค่อน";
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


//#-------------------------------------------------------------------- เพิ่มขนาดแชท Big Chat --------------------------------------------------------------------#\\
var chatNewHeight = 400; //limited by other stuff not to fly off the page
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