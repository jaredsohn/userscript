// ==UserScript==
// @name           Advanced Gallery Functions2
// @namespace      http://www.advancedanime.com/profile.php?member=nemesis_monkey
// @description    Provides some advanced functions for the advancedanime.com galleries.
// @include        http://www.advancedanime.com/thumbnails.php*
// @include        http://advancedanime.com/thumbnails.php*
// @include        advancedanime.com/thumbnails.php*
// @include        http://www.advancedanime.com/anime.php*
// @include        http://advancedanime.com/anime.php*
// @include        advancedanime.com/anime.php*
// Version         2.0
// ==/UserScript==

var imgData = new Array();

function nm() {
	this.init = galleryInit;
    this.getImgs = getImages;
    this.uri = resolveURI;
	this.setEvt = setEvent; 
	this.ldNewImg = loadNewImage;
	this.remove = removeNewImage;
	this.getCls = getClass;
	this.dtct = detect;
	this.prcs = process;
}

function galleryInit(){
var url = window.location.href;
if(url.search(/thumbnails.php/i) >= 0 || url.search(/sec\=images/) >= 0) {
		getImages();
		window.addEventListener('keydown', detect, true);
	}
}

function getImages() {
	var imgArray = document.getElementById("contentcolumn").getElementsByTagName("img");
	resolveURI(imgArray);
}

function resolveURI(imgArray){
	for(i=0;i<imgArray.length;i++){
		var tourl = imgArray[i].parentNode.getAttribute("href");
		var imgurl = imgArray[i].getAttribute("src");
		imgurl = imgurl.replace(/thumb_/i, '');
		imgArray[i].setAttribute('index',i);
		imgArray[i].parentNode.setAttribute('onClick','return false;');
		imgData[i] = {
			'index' : i,
			'to' : tourl,
			'img' : imgurl
		}
		setEvent(imgArray[i]);
	}
}

function setEvent(OBJ) {
	OBJ.addEventListener('click',function(){loadNewImage(this);},true);
}

function loadNewImage(OBJ) {
	var i = OBJ.getAttribute('index');
	var div1 = document.createElement('div');
		div1.setAttribute("style","position:fixed;top:0px;left:0px;width:100%;height:100%;background:#000;opacity:.8;");
		div1.setAttribute("id",'1001');
		document.getElementsByTagName('body')[0].appendChild(div1);
	var div2 = document.createElement('div');
		div2.setAttribute("style","position:fixed;top:0px;left:0px;width:100%;height:100%;background:transparent;z-index:10;overflow:scroll;");
		div2.setAttribute("id",'1002');
	var padDiv = document.createElement('div');
		padDiv.setAttribute("style","padding:20px;text-align:center;");
		padDiv.setAttribute("id",'1003');
	var image = document.createElement('img');
		image.setAttribute('src',imgData[i].img);
		image.setAttribute('style','margin:0 auto;max-width:100%;min-width:1%;width:auto;');
	var link1 = document.createElement('a');
		link1.setAttribute('href','#');
		link1.setAttribute('style','display:block;font-size: 16px;font-weight:bold;');
		link1.setAttribute("class",'1005');
		link1.setAttribute('onClick','return false;');
	var text = document.createTextNode('Close X');
		link1.appendChild(text);
	var link3 = link1.cloneNode(true);
	var link2 = document.createElement('a');
		link2.setAttribute('href',imgData[i].to);
		link2.appendChild(image);
		padDiv.appendChild(link1);
		padDiv.appendChild(link2);
		padDiv.appendChild(link3);
		div2.appendChild(padDiv);
		document.getElementsByTagName('body')[0].appendChild(div2);
		document.getElementsByTagName('body')[0].setAttribute('style','overflow:hidden');
	var linkelms = getClass('1005');
		linkelms[0].addEventListener('click',function(){removeNewImage()},true);
		linkelms[1].addEventListener('click',function(){removeNewImage()},true);
}

function removeNewImage() {
	document.getElementById('1001').parentNode.removeChild(document.getElementById('1001'));
	document.getElementById('1002').parentNode.removeChild(document.getElementById('1002'));
	document.getElementsByTagName('body')[0].setAttribute('style','');
}

function getClass(CLASS,NODE) {
	var startNode = NODE || document;
	var AllTags = startNode.getElementsByTagName("*");
		var Elems = new Array();
		var re = new RegExp("(^|\\s+)" + CLASS + "(\\s+|$)");
		for (var i=0; i<AllTags.length; i++){
			if (re.test(AllTags[i].className)) Elems[Elems.length] = AllTags[i];
		}
	return Elems;
}

function detect(e){
	var key = e.which;
	if(key == 39 || key == 37){
		var URI = window.location.href;
		process(URI,key);
	}
}

function process(URI,KEY){
	var con;
	var d = window.document;
	var GETS = URI.split("p=");
	var UL = d.getElementsByTagName('ul');
	for(i=0;i<UL.length;i++){
		if(UL[i].getAttribute('class') == "list num"){
			con = UL[i];
			break;
		}
	}
	if(GETS.length == 1 && KEY == 39){
		var url = con.getElementsByTagName('a')[0].getAttribute('href');
		window.location.href = url;
	}
	else{
		if(KEY == 39){
			var url = con.getElementsByTagName('a')[con.getElementsByTagName('a').length-2].getAttribute('href');
			window.location.href = './'+url;
		}
		else if(KEY == 37){
			if(GETS.length == 1){
					return;
			}
			var s = /p=1/;
			if(!s.test(URI)){
				var url = con.getElementsByTagName('a')[1].getAttribute('href');
				window.location.href = './'+url;
			}
		}
		return;
	}
}

var NM = new nm();
NM.init();