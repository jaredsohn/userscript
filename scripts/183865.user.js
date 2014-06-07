// ==UserScript==
// @name           Facebook Chat Emoticons Xat
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @include        https://apps.facebook.com/*
// @version        1.8.4
// @author         GhostExinDesign
// @description	   This script add a nice emoticons xat bar to your Facebook Chat.

// ==/UserScript==
//



// List of emoticons FB
/*

	extra: :putnam: , xatecool , kiss , xatxD , xathello, xatdd, xatredface, xathehe, xatmad, xathmm, xatchew, xatwink, xatclap, xatbye, xatcd, xatwhat, xatshock, xatmaniac, xathello, xatfacepalm
*/


var emoticonsListS = new Array();
var emoticonsListE = new Array();
var emoticonsListC = new Array();
var debugMode = false;
// standard emoticons

// extra emoticons



// code emoticons
//emoticonsListC[0] = "[[xatdd]]";
emoticonsListC[0] = "[[xatdd]]";
emoticonsListC[1] = "[[xatxD]]";
emoticonsListC[2] = "[[xatkiss]]";
emoticonsListC[3] = "[[xatecool]]";
emoticonsListC[4] = "[[xatredface]]";
emoticonsListC[5] = "[[xathehe]]";
emoticonsListC[6] = "[[xatmad]]";
emoticonsListC[7] = "[[xathmm]]";
emoticonsListC[8] = "[[xatchew]]";
emoticonsListC[9] = "[[xatwink]]";
emoticonsListC[10] = "[[xatclap]]";
emoticonsListC[11] = "[[xatbye]]";
emoticonsListC[12] = "[[xatcd]]";
emoticonsListC[13] = "[[xatwhat]]";
emoticonsListC[14] = "[[xatshock]]";
emoticonsListC[15] = "[[xatmaniac]]";
emoticonsListC[16] = "[[xathello]]";
emoticonsListC[17] = "[[xatfacepalm]]";


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

function creaBarra(event){ //before calling this method control the presence of the bar
	try{
	
        var classeChat = 'fbnubflyoutfooter';
	debug(event);
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
	//I insert the div
	var barra = document.createElement('div');
	barra.setAttribute('id','barra_emoticons');
	barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:17px;');
	popolaBarra(barra);
        var cop = document.createElement('div');
        ////
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:blue;');
        cops1.innerHTML="";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML=' XatEmoticons by <a href="http://www.facebook.com/GhostExinDesign" target="_blank" style="text-decoration:none;"> GhostExinDesign </a>';
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
            
            //I create the button to minimize or maximize
            var minimize = document.createElement('div');
            minimize.setAttribute('id','fbcp_minimize');
            minimize.setAttribute('style','cursor:pointer;margin:0px 60px 5px;background-color:#627BAE;color:white;font-weight:bold; width:auto;text-align:center;');
            minimize.innerHTML="Otwórz Emotki";
            minimize.addEventListener('click',showBarra,false);
            barra.appendChild(minimize);
            // beginning of the list of emoticons
            var lista = document.createElement('li');
            lista.setAttribute('id' , 'listaEmoticons');
            lista.setAttribute ('style', 'display:inline; visibility:hidden;');
            //first insert the emoticons standard
            var posX = 0;
            var posY = 0;
            var cont = 1;
            for(i=0;i<emoticonsListS.length;i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline;');
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
            //I insert emoticons extra
            for(i =0; i<emoticonsListE.length ; i += 2){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListE[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/emote/'+ emoticonsListE[i+1] + '.gif');
                    
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    cont++;
            }
            //I enter the emoticons code
            for(i =0; i<emoticonsListC.length ; i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListC[i]);
                    imag.setAttribute('height', '16px');
                    var nameEmo = emoticonsListC[i].substring(2,emoticonsListC[i].length-2);
                    imag.setAttribute('src','http://graph.facebook.com/'+ nameEmo  + '/picture');                    
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
	var inputcontainer = barra.previousSibling.previousSibling;
while(inputcontainer.firstChild.tagName.toLowerCase() != 'textarea'){
inputcontainer = inputcontainer.previousSibling;
}
	var arrayInput = inputcontainer.getElementsByTagName('textarea');
	
	var str = elem.getAttribute('alt');
        
	          for (i =0;i<arrayInput.length; i++){
	            if (arrayInput[i].className.toLowerCase().indexOf('uitextareaautogrow')>=0){
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
		
		var altezzaemo = 75;
            if(listaemoticons.style.visibility == "hidden"){
               listaemoticons.style.visibility = "visible";
                               
                minimize.innerHTML= "Zamknij";
                fbnubflyoutfooter.style.height= "120px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "Otwórz Emotki";
                fbnubflyoutfooter.style.height= "auto";                
                fbnubflyoutbody.style.height=(hgt+altezzaemo)+"px";
                
            }       

	          
          }


function debug(e){
	if(debugMode){
		alert(e);
	}
}
// add the listener for the click on the chat bar in the dock
initListeners();