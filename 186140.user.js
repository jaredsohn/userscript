// ==UserScript==
// @name          YanniHo_pics_viewer
// @description   Adds image thumbnails under image anchors in www.rouming.cz & www.roumenovomaso.cz
// @author        Yanni_SVK
// @version       2.6
// @include       http://halbot.haluze.sk/images/*
// @include       http://www.dusky.sk/pics/*
// @include       http://www.rouming.cz/*
// @include       http://www.roumenovomaso.cz/*
// ==/UserScript==


function Pripona(a){
	var i = -1
	prip = ""
	while(a.substr(i,1)!="." && (i*(-1))<=a.length && a.substr(i,1)!="/"){
		i--
	}
	if(a.substr(i,1)=="."){
		return a.substr(i)
	}
	else{
		return false
	}
}


function PridajObrazky() {
	var odkazy = document.getElementsByTagName("a")
	var al = false
	for (var i = 0; i < odkazy.length; i+=3){
		var prip = Pripona(odkazy[i].href.toLowerCase())
		if(prip){
			if(prip==".gif" || prip==".jpg" || prip==".jpeg" || prip==".png" ){
				var br = document.createElement("br")
				var novy = document.createElement("img")
				if(document.location.host=="www.rouming.cz"){
					odkazy[i].href="http://www.rouming.cz/"+odkazy[i].href.substr(parseInt(odkazy[i].href.indexOf("?file="))+6)
				}
				if(document.location.host=="www.roumenovomaso.cz"){
					odkazy[i].href="http://www.roumenovomaso.cz/"+odkazy[i].href.substr(parseInt(odkazy[i].href.indexOf("?file="))+6)
				}
				novy.setAttribute("src",odkazy[i].href)
				novy.setAttribute("style","max-height: 300px;")
				odkazy[i].appendChild(br)
				odkazy[i].appendChild(novy)
			}			
		}
		
	}

}


//PridajObrazky()

function PridajListenery(){
	var odkazy = document.getElementsByTagName("a");
	for(var i = 0; i < odkazy.length; i++){
		odkazy[i].addEventListener('mouseover',onLinkOver,false);
		odkazy[i].addEventListener('mouseout',onLinkOut,false);
		odkazy[i].addEventListener('mousemove',onLinkMove,false);

	}

}


function findPos(obj) {
	var curleft =  0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
		} while (obj = obj.offsetParent);

	return curleft;
	}
}

var predchadzajucaFarba


function onLinkOver(e){
	var prip = Pripona(this.href.toLowerCase())
	if(prip){
		if(prip==".gif" || prip==".jpg" || prip==".jpeg" || prip==".png" ){
			 if(!document.getElementById("image_href_over")){
				var novy = document.createElement("img")
				
			}else{
				var novy = document.getElementById("image_href_over")
			}

			if(document.location.host=="www.rouming.cz"){
				if(document.location.pathname!="/roumingArchive.php"){
					novy.setAttribute("src","http://www.rouming.cz/upload/"+this.href.substr(parseInt(this.href.indexOf("?file="))+6))
				}else{
					novy.setAttribute("src","http://www.rouming.cz/archived/"+this.href.substr(parseInt(this.href.indexOf("?file="))+6))

				}
			}else if(document.location.host=="www.roumenovomaso.cz"){
				if(document.location.pathname!="/masoArchive.php"){
					novy.setAttribute("src","http://www.roumenovomaso.cz/upload/"+this.href.substr(parseInt(this.href.indexOf("?file="))+6))
				}else{
					novy.setAttribute("src","http://www.roumenovomaso.cz/archived/"+this.href.substr(parseInt(this.href.indexOf("?file="))+6))

				}
			}else{
				novy.setAttribute("src",this.href)
			}
			novy.setAttribute("id","image_href_over")
			var maxW = window.innerWidth-findPos(this)-this.offsetWidth-10-5*2-3*2-15-10
			var maxH = window.innerHeight-5*2-3*2-10
			var topY = window.pageYOffset+5
			var leftX = findPos(this)+this.offsetWidth+10
			//alert(findPos(this)+this.offsetWidth)
			novy.setAttribute("style","display:block; max-height: "+maxH+"px ; max-width: "+maxW+"px ; position:absolute; border:5px white solid; z-index:99999; padding:3px; background-color:black; top:"+topY+"px ; left:"+leftX+"px;")
			if(!document.getElementById("image_href_over")){
				document.body.appendChild(novy)
			}
			predchadzajucaFarba = this.style.color
			this.style.color = "red"
		}
	}


}


function onLinkOut(e){
	if(document.getElementById("image_href_over")){
		var novy = document.getElementById("image_href_over")
		this.style.color = predchadzajucaFarba
		novy.parentNode.removeChild(novy)


	}
}

function onLinkMove(e){
/*	if(document.getElementById("image_href_over")){
		var novy = document.getElementById("image_href_over")
		novy.style.left = (parseInt(e.pageX)+10)+"px"
	}*/
}



PridajListenery()
