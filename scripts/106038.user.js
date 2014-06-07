// ==UserScript==
// @name	PCNewPixnet
// @version	0.0.20110705.1
// @namespace	http://peicheng.pixnet.net
// @description	Expand PIXNET album
// @homepage	http://peicheng.pixnet.net
// @include	http://*.pixnet.net/album/set/*
// ==/UserScript==

(function(){
    if (!document.location.href.match('/album/set/')) {
	return;
    }

    var htmlCode = '';
    //var big =document.createElement("div");
    //big.className='content-1 content-narrow narrow-big';
    document.getElementById('content').setAttribute('class','content-1 content-narrow narrow-big');
    var contentBody = document.getElementById('left-column-1');
    //var contentBody = document.getElementsByClassName('photo-grid-list');
    var imageThumbs = contentBody.getElementsByClassName('thumb');
    var imageThumbsLength = imageThumbs.length;
    var page=contentBody.getElementsByClassName('page');
    htmlCode +=contentBody.innerHTML;
    if(imageThumbsLength>90){
		imageThumbsLength=90;
		}
    for (var i = 0; i < imageThumbsLength; i++) {
	try {
	    var el = imageThumbs[i];
	    var imgLink = el.parentNode.href;
	    var imgNewUrl = el.src.replace(/_[stq].jpg/, '_n.jpg');
	    var altv=el.alt;
	   
	    
	    htmlCode += '<a href="' + imgLink + '"><img alt="" src="' + imgNewUrl + '"></a><br>'+altv+' '+imgNewUrl+' '+i;
	} catch(err) {
	}
	}

	//for(var i=0;i<page.length;i++){
	htmlCode+=page[0].innerHTML;
	
	//}
	
    contentBody.innerHTML = htmlCode;

})();
