// ==UserScript==
// @name           Facebook Chat Smiley 
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.0.1
// @author         r.O.b.O.t
// @description	   Facebook Chat Smiley :) 
// ==/UserScript==
//



// Lista delle emoticons di FB
/*

	standard: :) , :D , :( , :p , >:( , -_- , :/ , :\ , o.O , >:O , :V , 3:) , :O , :3 , ;) , :* , 8) , <3 , 8| , ^_^ , O:)
	extra: :putnam: , (^^^) , <(") , :42: , :|]
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


function initListeners(){
	
	if( document.addEventListener ){
		document.addEventListener( 'DOMNodeInserted', creabar, false );
		document.addEventListener( 'DOMNodeInsertedIntoDocument', creabar, false );
		//alert("aggiunto addeventlistener");
	}
	else if( document.attachEvent ){
		document.attachEvent( 'DOMNodeInserted', creabar );
		document.attachEvent( 'DOMNodeInsertedIntoDocument', creabar );
		//alert("aggiunto attachevent");
	}	
}

function creabar(event){ //prima di chiamare questo metodo controllo la presenza della bar
	try{
	//var p = event.target;
        
	//alert("creo la bar per " + p.className);
        var pchild = event.target.getElementsByTagName('div');
        var cf = null;
        var atmp = pchild;
	for(i=0;i<atmp.length;i++){
            if(atmp[i].className.toLowerCase().indexOf('fbsikil inputcontainer')>=0 && atmp[i].nodeType === 1){
                if(atmp[i].id.toLowerCase()=='bar_emoticons'){
                    //alert("questo elemento ha già la bar, keluar");
                    return;
                }else{
			cf = atmp[i];
                        break;
			//alert("fbsikil ketemu!");
                }
            }
            
        }
        //alert(p.className);
	 //p.getElementsByTagName('div');
	
	/*for(i=0;i<atmp.length;i++){
		if(atmp[i].className.toLowerCase().indexOf('fbsikil')>=0){
			cf = atmp[i];
			alert("fbsikil ketemu!");
		}
	}*/
	if(cf==null){/*alert("cf = null, keluar");*/return;}
	//inserisco il div
	var bar = document.createElement('div');
	bar.setAttribute('id','bar_emoticons');
	bar.setAttribute('style','background-color: #ffffff; padding-top: 0px;');
	popolabar(bar);
        var cop = document.createElement('div');
        //<div style="clear: both;"><span style="color:blue;">Facebook Chat Smiley </span><span style="color:red; font-size:8px;"> r.O.b.O.t</span></div>
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:blue;');
        cops1.innerHTML="Facebook Chat Smiley";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML=' <a href="http://r0b0t.tk" target="_blank" style="text-decoration:none;"> r.O.b.O.t</a>';
        cop.appendChild(cops1);
        cop.appendChild(cops2);
        bar.appendChild(cop);
	cf.appendChild(bar);
	//alert("masukkan tepat di bawah fbsikil");
	}catch(e){
		debug(e);
	}
	
}

function popolabar(bar){
    try{
            //alert("popolo la bar");
            var lista = document.createElement('li');
            lista.setAttribute('id' , 'listaEmoticons');
            lista.setAttribute ('style', 'display:inline;');
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

            bar.appendChild(lista);
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


function debug(e){
	if(debugMode){
		alert(e.description);
	}
}
//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();