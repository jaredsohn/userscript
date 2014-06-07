// ==UserScript==
// @name           	drag
// @namespace        
// @description    	
// @include        	http://delta.astroempires.com/*
// @exclude        	http://*.astroempires.com/
// @exclude        	http://*.astroempires.com/home.aspx
// @exclude        	http://*.astroempires.com/login.aspx
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


var windowWidth=400;
var windowHeight=300;
var windowURL="http://www.google.pt/";
var windowTitle="drag me bitch!"




GX=GM_getValue("GX","").replace("px","")*1;
GY=GM_getValue("GY","").replace("px","")*1;
if (GX=="" || GX > (window.innerWidth-10) || GY=="" || GY > (window.innerHeight-10)){
			GM_setValue("GX","0px");GY="0px";
			GM_setValue("GY","0px");GX="0px";
}else{
	GX+="px";
	GY+="px";
}



	// if the panel doesnt exists, create a new one
	if ($('div[id=encoder]').length==0){
		$('body' ).append(
		"<div id='encoder' style='	position:fixed;left:"+GX+";top:"+GY+";'>" +
			"<div id='encodertitle'"+
					"style='font-size:12px; cursor:move;" +
					"border: 1px solid rgb(32, 86, 128);padding:5px;" +
					"background: rgb(40,40,90);'>"+ windowTitle +
			"</div>"+
			"<div id='encodercontent'"+
					"<br><iframe src='"+windowURL+"' width='"+windowWidth+"' height='"+windowHeight+"'></iframe>" +
			"</div>"+
		"</div>");
	}






//////////////////////////////////////////////////////////////

	// procedimento de arrastar ////////////////////////////////////////////////////////
	// implements the drag feature
	
	var iamdragging=false;
	var dragx0,dragy0; // remember functions in javascript are static

	// captura o movimento do cursor
	// capture mousemove x,y coords
	document.addEventListener("mousemove",function(event) {
		x=event.pageX;y=event.pageY;
		// verifica se esta a arastar neste momento
		// e actualiza a posicao do painel
		if (iamdragging){
			dragw=$('div[id=encoder]').css("width");
			dragh=$('div[id=encoder]').css("height");
			$('div[id=encoder]').css("left",x - dragx0);
			$('div[id=encoder]').css("top" ,y - dragy0);
			$('div[id=encoder]').css("width",dragw);
			$('div[id=encoder]').css("height",dragh);
		}

	},true);
	
	// comecou a arrastar
	// callback that deals when user starts to drag
	document.getElementById("encodertitle").addEventListener("mousedown",function(event) {
		dragx0=event.pageX - 1*( $('div[id=encoder]').css("left") ).replace("px","");
		dragy0=event.pageY - 1*( $('div[id=encoder]').css("top" ) ).replace("px","");
		iamdragging=true;
		//event.stopPropagation();
    		event.preventDefault();
	},true);

	// largou, terminou o arrastar
	document.addEventListener("mouseup",function(event) {
		iamdragging=false;
		GM_setValue("GX",$('div[id=encoder]').css("left") ) ;
		GM_setValue("GY",$('div[id=encoder]').css("top") ); 
		event.stopPropagation();
    		event.preventDefault();

	},true);





