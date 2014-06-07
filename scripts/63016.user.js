// ==UserScript==
// @name           GrosseLeute Pic MouseOver
// @namespace      zas-kar
// @description    vergrößert Mini Avatare und Mini Galleriebilder auf www.grosseleute.de beim überfahren mit der Maus
// @include        *.grosseleute.org/*
// @include        *.grosseleute.de/*
// @exclude        *.grosseleute.de/galerie/*
// @include        *.grosswaslos.de/*
// @include        *.gross-was-los.de/*
// @include        *eine-party.de*




// ==/UserScript==


// es werden immer die detailreicheren Original-Fotos genommen und skaliert 
// wenn das Bild schlecht ist, ist das Original schlecht


///////////////////////////////////////////////////////////////////////
// NUE MITGLIEDER und MITGLIEDER ONLINE vergrößern auf Breite: 350px //  suche nach '/image/1'  
///////////////////////////////////////////////////////////////////////


(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("/image/1") == "/image/1" ) {
				imgName=imgName.replace('/image/1','/image/4');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("/image/1","/image/4");
					newImg.style.width = "350px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-350).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();



//////////////////////////////////////////////
// SINGLEFOTOS vergrößern auf Breite: 350px //  suche nach '/image/2'  
//////////////////////////////////////////////


(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("/image/2") == "/image/2" ) {
				imgName=imgName.replace('/image/2','/image/4');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("/image/2","/image/4");
					newImg.style.width = "350px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-350).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();



//////////////////////////////////////////////
// PROFILFOTOS vergrößern auf Breite: 500px //  suche nach '/image/4'  
//////////////////////////////////////////////


(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("/image/4") == "/image/4" ) {
				imgName=imgName.replace('/image/4','/image/5');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("/image/4","/image/5");
					newImg.style.width = "500px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-500).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();


/////////////////////////////////////////////////////////////
// AVATARE und PROFILBESUCHER vergrößern auf Breite: 300px //  suche nach 'avatars'
/////////////////////////////////////////////////////////////


// Eigene Avatare dürfen die Dateiendungen gif, jpg, jpeg und png und maximal 
// eine Größe von 150*250 Pixel und 400 kB besitzen. Größere Avatare werden 
// automatisch auf die Maximalgröße verkleinert.


(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("avatars") == "avatars" ) {
				imgName=imgName.replace('avatars','avatars');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/avatars/,/avatars/);
					newImg.style.width = "300px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX+ow).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();



/////////////////////////////////////////////////////////////
// NEUIGKEITEN GALLERIEBILDER vergrößern auf Breite: 350px //  suche nach 'photos/thumbnails/quadratic'
/////////////////////////////////////////////////////////////

// Bilder in der Gallerie dürfen die Dateiendungen gif, jpg, jpeg, png 
// und eine Maximalgröße von 4 000*4 000 Pixel und 3 MB besitzen. 

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("photos/thumbnails/quadratic") == "photos/thumbnails/quadratic" ) {
				imgName=imgName.replace('photos/thumbnails/quadratic','photos/thumbnails/medium');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("photos/thumbnails/quadratic","photos/thumbnails/medium");
					newImg.style.width = "350px"; 
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-350).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();


////////////////////////////////////////////////////////
// PROFIL GALLERIEBILDER vergrößern auf Breite: 500px //  suche nach 'photos/thumbnails/tiny'
////////////////////////////////////////////////////////


// Bilder in der Gallerie dürfen die Dateiendungen gif, jpg, jpeg, png 
// und eine Maximalgröße von 4 000*4 000 Pixel und 3 MB besitzen. 

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("photos/thumbnails/tiny") == "photos/thumbnails/tiny" ) {
				imgName=imgName.replace('photos/thumbnails/tiny','photos/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("photos/thumbnails/tiny","photos/");
					newImg.style.width = "500px"; 
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-500).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();



//////////////////////////////////
// PARTYFOTOS auf Breite: 500px //  suche nach '/partyfotos/'
//////////////////////////////////


(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("/partyfotos/") == "/partyfotos/" ) {
				imgName=imgName.replace('/170/','/500/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("/170/","/500/");
					newImg.style.width = "500px"; 
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-500).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();


//////////
// TEST //  Suche nach _thumbs
//////////

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName('img');
		for( i=0; i < imgList.length; i++) {	
			var imgName = imgList[i].src;
			if (imgName.match("_thumbs") == "_thumbs" ) {
				imgName=imgName.replace('_thumbs','_original');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("_thumbs","_original");
					newImg.style.width = "600px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX-600).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();
