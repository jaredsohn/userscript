// ==UserScript==
// @name			Facebook Chat More Emoticons+
// @author			VanDeSanders
// @description			เCustom Emote Facebook ver 2.0 by VanDeSanders (http://facebook.com/andimunandar)
// @version           2.0
// @versionnumber		2.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/121376
// @icon           http://image.free.in.th/z/ib/facebookchat.png
// ==/UserScript==



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
emoticonsListC[16] = "[[186271624802554]]";
emoticonsListC[17] = "[[272758526114508]]";
emoticonsListC[18] = "[[272758526114508]]";
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
emoticonsListC[37] = "[[271066852954281]]";
emoticonsListC[38] = "[[388038041289465]]";
emoticonsListC[39] = "[[271066959620937]]";
emoticonsListC[40] = "[[271066882954278]]";
emoticonsListC[41] = "[[271066782954288]]";
emoticonsListC[42] = "[[271067399620893]]";
emoticonsListC[43] = "[[271066969620936]]";
emoticonsListC[44] = "[[271067956287504]]";
emoticonsListC[45] = "[[271067062954260]]";
emoticonsListC[46] = "[[271067166287583]]";
emoticonsListC[47] = ":poop:";
emoticonsListC[48] = "[[271067189620914]]";
emoticonsListC[49] = "[[271066869620946]]";


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
        cops1.innerHTML="<hr>by ";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML='<a href="http://www.facebook.com/andimunandar" target="_blank" style="text-decoration:none;">VanDeSanders</a>';
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
            minimize.innerHTML="emote";
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
		
		var altezzaemo = 125;
            if(listaemoticons.style.visibility == "hidden"){
               listaemoticons.style.visibility = "visible";
                               
                minimize.innerHTML= "emote";
                fbnubflyoutfooter.style.height= "167px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "klik utk buka";
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