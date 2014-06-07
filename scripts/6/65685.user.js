// ==UserScript==
// @name           DC Magic MouseOver
// @namespace      3PO
// @description    großes klares Bild beim überfahren mit der Maus
// @include        *.datingcafe.de/*
// ==/UserScript==


////////////////////
// small zu large //  
////////////////////   

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
			if (imgName.match("media/foto/small") == "media/foto/small" ) {
				imgName=imgName.replace('media/foto/small','media/foto/small');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace("media/foto/small","media/foto/large");
					newImg.style.width = "350px"; 
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX+400).toString() + 'px';
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


/*

// ab hier alter Teil funktioniert nicht mehr //


/////////////////////////////////////////////
// es funktioniert nicht bei allen Bildern //  
/////////////////////////////////////////////
// pk pm p70x60              werden scharf //
/////////////////////////////////////////////
// b70x60           werden manchmal scharf //
/////////////////////////////////////////////
// bk                     bleiben unscharf //
/////////////////////////////////////////////


// p bedeutet scharfes Bild
// b bedeutet unscharfes Bild
// k bedeutet Miniaturansicht
// m bedeutet Miniaturansicht
// g bedeutet Großansicht
// 70x60 bedeutet Miniaturansicht
// 230x198 bedeutet Großansicht 


//////////////
// pk zu pG //
//////////////


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
			if (imgName.match("pk") == "pk" ){
				imgName=imgName.replace(/pk/,'/pG/').replace("pk", "pG");
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/pk/,/pG/);
					newImg.style.width = "330px";
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


//////////////
// pm zu pg //
//////////////


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
			if (imgName.match("pm") == "pm" ) {
				imgName=imgName.replace(/pm/,'/pg/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/pm/,/pg/).replace("pm", "pg");
					newImg.style.width = "330px";
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


////////////////////////
// p70x60 zu p230x198 //
////////////////////////


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
			if (imgName.match("p70x60") == "p70x60" ) {
				imgName=imgName.replace(/p70x60/,'/p230x198/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/p70x60/,/p230x198/);
					newImg.style.width = "330px";
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


////////////////////////
// b70x60 zu p230x198 //   
////////////////////////


// es gibt b70x60 die zu p230x198 scharf werden.
// wenn es kein Bild gibt wird auch keins angezeigt.


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
			if (imgName.match("b70x60") == "b70x60" ) {
				imgName=imgName.replace(/b70x60/,'/p230x198/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/b70x60/,/p230x198/);
					newImg.style.width = "330px";
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


////////////////////////
// b70x60 zu b230x198 //   versetzt weil unscharf (nicht unbedingt notwendig)
////////////////////////


// es gibt b70x60 die zu p230x198 kein Bild haben.
// deswegen wird hier zusätzlich immer das grosse Bild unscharf versetzt angezeigt


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
			if (imgName.match("b70x60") == "b70x60" ) {
				imgName=imgName.replace(/b70x60/,'/b230x198/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/b70x60/,/b230x198/);
					newImg.style.width = "330px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX+400).toString() + 'px';
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


//////////////
// bk zu bg //   versetzt weil unscharf (nicht unbedingt notwendig)
//////////////


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
			if (imgName.match("bk") == "bk" ) {
				imgName=imgName.replace(/bk/,'/bg/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/bk/,/bg/).replace("bk", "bg");
					newImg.style.width = "330px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX+400).toString() + 'px';
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


////////////////////////
// p70x60 zu b230x198 //   versetzt weil unscharf (nicht unbedingt notwendig)
////////////////////////


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
			if (imgName.match("p70x60") == "p70x60" ) {
				imgName=imgName.replace(/p70x60/,'/b230x198/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/p70x60/,/b230x198/);
					newImg.style.width = "330px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY-100).toString() + 'px';
					newImg.style.left=(newX+400).toString() + 'px';
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



//////////////
// bk zu pg //   hat beim testen zwar nie geklappt aber vielleicht gibt es ja Fälle in denen es funktioniert
//////////////   


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
			if (imgName.match("bk") == "bk" ) {
				imgName=imgName.replace(/bk/,'/pg/');
				var newImg = document.createElement ('img');
			ow=imgList[i].width;
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0]
					newY=cumulativeOffset(this)[1]
					newImg.src=this.src.replace(/bk/,/pg/).replace("bk", "pg");
					newImg.style.width = "330px";
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

*/