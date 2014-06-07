// ==UserScript==
// @name        WKW PhotoZOOM
// @namespace   WKW PhotoZOOM
// @description Zeigt beim überfahren mit der Maus ein vergrößertes Vorschaubild
// @include     http://www.wer-kennt-wen.de*
// @version     1
// @grant       none
// ==/UserScript==


	///// Angepasst für WKW Orginal von
	///// MarshallMar http://userscripts.org/scripts/review/40217
	// this are parts of the script of MarshallMar
	// for his script look here: http://userscripts.org/scripts/review/40217
function imageZoom(){
    var container = document.getElementById("container");
    var imgList = document.getElementsByTagName("img");
    var round50 = document.getElementsByClassName("rounded-pic weight-50 m-r-s");
    for( i=0; i < imgList.length; i++) {	
    var imgName = imgList[i].src;
    var imgTitle = imgList[i].title;
    var s = imgName.search(/\/media\//); 
    if( s != -1 && imgTitle.indexOf("Panoramabild") && imgTitle.indexOf("Youtube Video")) {
        newImg = document.createElement("img");
        ow=imgList[i].width;
        oh=imgList[i].height;
        var eventElement;
        
        if(imgList[i].parentNode.getAttribute("class", false)=="rounded-pic weight-50 m-r-s"){
            eventElement=imgList[i].parentNode;
                }else if(imgList[i].parentNode.getAttribute("class", false)=="rounded-pic weight-75"||imgList[i].parentNode.getAttribute("class", false)=="media-pic rounded-pic"||imgList[i].parentNode.getAttribute("class", false)=="rounded-pic"){
            eventElement=imgList[i].parentNode;
        }else{
            eventElement=imgList[i];
        }

        eventElement.addEventListener("mouseover",
            function(e){
                if(this.getAttribute("class", false)=="rounded-pic weight-50 m-r-s"){
                    // MEINE LEUTE linke Spalte
                    newImg.src=this.childNodes[1].src.replace(this.childNodes[1].src.substr(-9),'8'+this.childNodes[1].src.substr(-8));
                }else if(this.getAttribute("class", false)=="rounded-pic weight-75"||this.getAttribute("class", false)=="media-pic rounded-pic"||this.getAttribute("class", false)=="rounded-pic"){
                    // MEIN/ALLE LEUTE alle | Forum
                    /*
                           if (imgList[i].parentNode.getAttribute("href", false).indexOf("person")>-1){
                //alert(imgList[i].parentNode.getAttribute("href", false).indexOf("person"));
        }else if (imgList[i].parentNode.getAttribute("class", false).indexOf("rounded")>-1){
                //alert(imgList[i].parentNode.getAttribute("href", false).indexOf("person"));
        } 
                    
                    
                    x = 0;
                    while ( this.childNodes[x].tagName != "IMG" ){
                        if (this.childNodes[x].tagName == "IMG") {
                            break;
                        }
                        x++
                    }*/
                    newImg.src=this.childNodes[0].src.replace(this.childNodes[0].src.substr(-9),'8'+this.childNodes[0].src.substr(-8));                
                }else{
                    //Normale Fotos
                    newImg.src=this.src.replace(this.src.substr(-9),'8'+this.src.substr(-8));						
                }
                newX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                newY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                //alert(newImg.src);
                newImg.style.position="absolute";
                newImg.style.zIndex='999';
                newImg.style.top=(newY-185/2).toString() + 'px';
                newImg.style.left=(newX+ow).toString() + 'px';
                document.body.appendChild(newImg);
                },false);
        eventElement.addEventListener("mouseout",
            function(e){
                document.body.removeChild(newImg);
                },false);
			}
		}
	}

/*if (document.getElementById("riverLoadPrevious")) {

    function warte(){
        setTimeout(function(){watchload();}, 500);
    }
    var riverLoadPrevious = document.getElementById("riverLoadPrevious");
    riverLoadPrevious.addEventListener("click",warte,false);

	function watchload(){
		if (riverLoadPrevious.getAttribute("class", false)=="button is-inactive") {
		  warte();
		}
		if (riverLoadPrevious.getAttribute("class", false)=="button") {
            imageZoom();
        }           
	}
}*/
		
		
window.addEventListener("load",imageZoom,false);	