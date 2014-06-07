// ==UserScript==
// @name           Facebook ChatPlus
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @include        https://apps.facebook.com/*
// @version        1.4.5
// @author         Giuseppe Maria D'Elia
// @description	   This script add a nice emoticons bar to your Facebook Chat.
// @icon           http://gmdelia.eu/blog/wp-content/uploads/2012/05/fc+_32x32.png
// ==/UserScript==
//



// Lista delle emoticons di FB
/*
	standard: :) , :D , :( , :p , >:( , -_- , :/ , :\ , o.O , >:O , :V , 3:) , :O , :3 , ;) , :* , 8) , <3 , 8| , ^_^ , O:)
	extra: :putnam: , (^^^) , <(") , :42: , :|], <(")
*/


var emoticonsListS = new Array();
var emoticonsListE = new Array();
var emoticonsListC = new Array();
var debugMode = false;

// extra emoticons
// code emoticons
//emoticonsListC[0] = "[[peennissee]]";
emoticonsListC[79] = "[[tiiimidee]]";
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
emoticonsListC[82] = "[[272758526114508]]";
emoticonsListC[81] = "[[272758526114508]]";
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
emoticonsListC[80] = "[[254708701262201]]";
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
emoticonsListC[17] = "[[107960569357582]]";
emoticonsListC[76] = "[[nongyen]]";
//Version 3.5 Add Icon LINE By ArAsh
emoticonsListC[78] = "[[100002480484581]]";
emoticonsListC[0] = ":poop:"; 
emoticonsListC[32] = "[[midfig]]";
emoticonsListC[16] = "[[fingerrr]]";
emoticonsListC[77] = "[[peennissee]]";
emoticonsListC[1] = "[[punchsign]]";
emoticonsListC[83] = "[[tiiimidee]]";



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
        cops1.innerHTML="";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML=' <a href="" target="_blank" style="text-decoration:none;">  </a>';
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
            minimize.innerHTML="Open Facebook ChatPlus";
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
            //inserisco le emoticons extra
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
            //inserisco le emoticons code
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
                               
                minimize.innerHTML= "Close Facebook ChatPlus";
                fbnubflyoutfooter.style.height= "120px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "Open Facebook ChatPlus";
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