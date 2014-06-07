// ==UserScript==
// @name           Facebook ChatPlus
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.3.0
// @author         MsNKopatcocuk
// @description	   Facebook Chat.
// ==/UserScript==
//



// Lista delle emoticons di FB
/*
	standard: :) , :D , :( , :p , >:( , -_- , :/ , :\ , o.O , >:O , :V , 3:) , :O , :3 , ;) , :* , 8) , <3 , 8| , ^_^ , O:)
	extra: :putnam: , (^^^) , <(") , :42: , :|], <(")
*/


var emoticonsListS = new Array();
var emoticonsListE = new Array();
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


function initListeners(){
	
	if( document.addEventListener ){
		document.addEventListener( 'DOMNodeInserted', creaBarra, false );
		document.addEventListener( 'DOMNodeInsertedIntoDocument', creaBarra, false );
		//alert("aggiunto addeventlistener");
	}
	else if( document.attachEvent ){
		document.attachEvent( 'DOMNodeInserted', creaBarra );
		document.attachEvent( 'DOMNodeInsertedIntoDocument', creaBarra );
		//alert("aggiunto attachevent");
	}	
}

function creaBarra(event){ //prima di chiamare questo metodo controllo la presenza della barra
	try{
	//var p = event.target;
        
	//alert("creo la barra per " + p.className);
        var pchild = event.target.getElementsByTagName('div');
        var cf = null;
        var atmp = pchild;
	for(i=0;i<atmp.length;i++){
            if(atmp[i].className.toLowerCase().indexOf('fbnubflyoutfooter inputcontainer')>=0 && atmp[i].nodeType === 1){
                if(atmp[i].id.toLowerCase()=='barra_emoticons'){
                    //alert("questo elemento ha già la barra, esco");
                    return;
                }else{
			cf = atmp[i];
                        break;
			//alert("fbNubFlyoutFooter trovato!");
                }
            }
            
        }
        //alert(p.className);
	 //p.getElementsByTagName('div');
	
	/*for(i=0;i<atmp.length;i++){
		if(atmp[i].className.toLowerCase().indexOf('fbnubflyoutfooter')>=0){
			cf = atmp[i];
			alert("fbNubFlyoutFooter trovato!");
		}
	}*/
	if(cf==null){/*alert("cf = null, esco");*/return;}
	//inserisco il div
	var barra = document.createElement('div');
	barra.setAttribute('id','barra_emoticons');
	barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:17px;');
	popolaBarra(barra);
        var cop = document.createElement('div');
        //<div style="clear: both;"><span style="color:blue;">Facebook ChatPlus by </span><span style="color:red; font-size:8px;"> MsNKoPaTCoCuK</span></div>
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:blue;');
        cops1.innerHTML="Facebook ChatPlus by";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML=' <a href="http://msnkopatforum.tk" target="_blank" style="text-decoration:none;"> MsNKoPaTCoCuK ' </a>';
        cop.appendChild(cops1);
        cop.appendChild(cops2);
        barra.appendChild(cop);
	cf.appendChild(barra);
	//alert("ho popolato la barra e l'ho inserita subito sotto il fbNubFlyoutFooter");
	}catch(e){
		debug(e);
	}
	
}

function popolaBarra(barra){
    try{
            //alert("popolo la barra");
            //creo il bottone per minimizzare o massimizzare
            var minimize = document.createElement('div');
            minimize.setAttribute('id','fbcp_minimize');
            minimize.setAttribute('style','cursor:pointer;margin:0px 0 5px;background-color:#3B5998;color:white;font-weight:bold; width:auto;text-align:center;');
            minimize.innerHTML="Facebook ChatPlus Aç";
            minimize.addEventListener('click',showBarra,false);
            barra.appendChild(minimize);
            // inizio la lista di emoticons
            var lista = document.createElement('li');
            lista.setAttribute('id' , 'listaEmoticons');
            lista.setAttribute ('style', 'display:inline; visibility:hidden;');
            //inserisco prima le emoticons standard
            var posX = 0;
            var posY = 0;
            for(i=0;i<emoticonsListS.length;i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+(i+1));
                    emm.setAttribute('style','display:inline;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+(i+1));
                    imag.setAttribute('alt', emoticonsListS[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
                    imag.setAttribute('style',"cursor: pointer; background: url('http://static.ak.fbcdn.net/rsrc.php/zC/r/eKCEtE1PXyK.png') no-repeat scroll " + posX +"px "+ posY +"px transparent; height:16px; width:16px; ");
                    //imag.setAttribute('onclick', 'inserisciInChat(this)');
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    posX -=16;
                    imag.addEventListener('click', handleImg, false);
                    //alert("ho inserito l'emoticon "+(i+1) +" standard");
            }
            //inserisco le emoticons extra
            for(i =0; i<emoticonsListE.length ; i += 2){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+((i+1)+emoticonsListS.length));
                    emm.setAttribute('style','display:inline; cursor: pointer;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+((i+1)+emoticonsListS.length));
                    imag.setAttribute('alt', emoticonsListE[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/emote/'+ emoticonsListE[i+1] + '.gif');
                    //imag.setAttribute('onclick', 'inserisciInChat(this)');
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    //alert("ho inserito l'emoticon "+(i+1) +" extra");
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
	var str = elem.getAttribute('alt');
        var arrChat = document.getElementsByTagName('div');
        for(i=0;i<arrChat.length;i++){
          if(arrChat[i].className.toLowerCase().indexOf('opentoggler')>= 0 && arrChat[i].nodeType === 1){
	          var arrayInput = arrChat[i].getElementsByTagName('textarea');
	          for (i =0;i<arrayInput.length; i++){
	            if (arrayInput[i].className == 'input'){
	                arrayInput[i].value += " " + str + " ";
	                arrayInput[i].focus();
	                //alert (str + "added");
	                break;
	            }
	          }
	          break;
          }
        }
        
}
/*
<div id="fbcp_minimize" onclick="showBarra()" style="cursor:pointer;margin:0px 0 5px;background-color:#3B5998;color:white;font-weight:bold; width:auto;text-align:center;">Facebook ChatPlus Kapat</div>
*/

function showBarra(){
	var arrChat = document.getElementsByTagName('div');
        for(i=0;i<arrChat.length;i++){
          if(arrChat[i].className.toLowerCase().indexOf('opentoggler')>= 0 && arrChat[i].nodeType === 1){
		var at= arrChat[i].getElementsByTagName('div');
		var le = null;
		var be = null;
		var fm = null;
		for(j=0;j<at.length;j++){
			
			if(at[j].getAttribute('id')=="barra_emoticons"){
				be = at[j];
				break;
			}
		}
		for(j=0;j<at.length;j++){
			
			if(at[j].getAttribute('id')=="fbcp_minimize"){
				fm = at[j];
				break;
			}
		}
		at = arrChat[i].getElementsByTagName('li');
		for(j=0;j<at.length;j++){
			
			if(at[j].getAttribute('id')=="listaEmoticons"){
				le = at[j];
				break;
			}
		}
		
		
            if(le.style.visibility == "hidden"){
               le.style.visibility = "visible";
                be.style.height= "auto";
                //be.style.backgroundColor= "white";
                fm.innerHTML= "Close Facebook ChatPlus";
            }else{
                le.style.visibility = "hidden";
                be.style.height= "17px";
                //be.style.backgroundColor= "#E4E4E4";
                fm.innerHTML= "Open Facebook ChatPlus";
                
            }       


	          break;
          }
}
}


function debug(e){
	if(debugMode){
		alert(e.description);
	}
}
//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();