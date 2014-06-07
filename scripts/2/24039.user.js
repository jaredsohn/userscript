// ==UserScript==

// @name           SongzaDL

// @namespace      0d92f6be108e4fbee9a6a0ee4366b72e

// @include        http://*songza.com/* 

// ==/UserScript==



//TODO javascript leaks?



addListener(document,"click",catchClick);



function catchClick(oEvent){

	if(oEvent.target.id.indexOf('pie_')>-1)//Seriously....?

		window.setTimeout(getFlash,1500);

}



function getVar(vars, find) {

	return vars.split(find+"=")[1].split("&")[0];

}



function $(id){

	return document.getElementById(id);

}



function getFlash(oEvent){

	if(!$('songza-name') || $('songza-name').innerHTML.length==0) //slow connection etc.

		window.setTimeout(getFlash,1500);



	var vars ;
	var file ;
	
	var embeds = document.getElementsByTagName('embed');

	
	/*for( var i = 0; i< embeds.length; i++){
		try{
			vars = embeds[i].getAttribute('flashvars');
			if(!vars)continue;
			file = getVar(vars,'file');

		}catch(e){GM_log('No vars found');}
	}*/

        // Quick hack, youtube and regular files should atleast work
	file = unsafeWindow['CURRENT_SONG_URL'];


	if(!file)return;

	var a = document.createElement('a');

	a.href=URLDecode(file);

	a.innerHTML=$('songza-name').innerHTML;

	removeChildrenFromNode($('songza-name')); //.innerHTML="";//Probably overkill right now

	$('songza-name').appendChild(a);

}


function removeChildrenFromNode(node)
{
	if(node == undefined ||
		node == null)
	{
	return;
	}

	while (node.hasChildNodes())
	{
	  node.removeChild(node.firstChild);
	}

}


function addListener(obj,type,listener){

	/*if(obj.attachEvent){

		obj.attachEvent('on'+type,function(event){ listener(event); });

	}

	else */

	if(obj.addEventListener){

		obj.addEventListener(type,function(event){ listener(event); },false);

		return true;

	}

	return false;

}



function removeListener(obj,type,listener){ //FIXME Check it, ,remove IE?

	/*if(obj.detachEvent){

		obj.detachEvent('on'+type,function(event){ listener(event); });

	}

	else */

	if(obj.removeEventListener){

		obj.removeEventListener(type,function(event){ listener(event); },false);

		return true;

	}

	return false;

}



function URLDecode( encoded )

{

   // Replace + with ' '

   // Replace %xx with equivalent character

   // Put [ERROR] in output if %xx is invalid.

   var HEXCHARS = "0123456789ABCDEFabcdef";

   var plaintext = "";

   var i = 0;

   while (i < encoded.length) {

       var ch = encoded.charAt(i);

	   if (ch == "+") {

	       plaintext += " ";

		   i++;

	   } else if (ch == "%") {

			if (i < (encoded.length-2) 

					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 

					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {

				plaintext += unescape( encoded.substr(i,3) );

				i += 3;

			} else {

				alert( 'Bad escape combination near ...' + encoded.substr(i) );

				plaintext += "%[ERROR]";

				i++;

			}

		} else {

		   plaintext += ch;

		   i++;

		}

	} // while

   return plaintext;

};


