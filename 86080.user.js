// ==UserScript==
// @name           Fotozoom
// @namespace      wkw
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==


// "final" vars
var version = '2010.09.13';
var scriptURL = '86080';
//http://userscripts.org/scripts/show/ + scriptURL

var scriptname = 'Fotozoom';

var url= document.URL;
var user = document.body.innerHTML.substring(document.body.innerHTML.indexOf('willkommen') + 11, document.body.innerHTML.indexOf('!',document.body.innerHTML.indexOf('willkommen')));


function main(){	
	imageZoom();
	if(url.indexOf('start') > -1){
		if(url.indexOf('update') > -1)
		{
			window.location.href = '/start';
			update();
		}
		addText('h6','el1',scriptname);
		addText('p','el1',' \n Version: '+ version);
		
	// löscht element wenn das script installiert ist	
		document.getElementById('el2').removeChild(document.getElementById('div' + scriptURL));
		
		
	}
	else if(url.indexOf('settings/privacy/JSscripts') > -1){
		
		
	}
	
}
	function addButton(PlaceID,ButtonID,ButtonText,href)
	{
		if(document.getElementById(PlaceID) != null)
		{
			var newButton = document.createElement('input');
			newButton.id = ButtonID;
			newButton.class = 'formbutton';
			newButton.type = 'Button';
			newButton.value = ButtonText;
		
			 newButton.href = href;
			document.getElementById(PlaceID).appendChild(newButton);
		}
	}
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
//	Typen: p,h1,h2,h3,h4,h5,h6
	function addText(Typ,PlaceID,Text){
		if(document.getElementById(PlaceID) != null)
		{
			var newText = document.createElement(Typ);
			var spanElement = document.createElement('span');
			
			spanElement.innerHTML = Text;
			newText.appendChild(spanElement);
			
			document.getElementById(PlaceID).appendChild(newText);
		}
	}
	
	
	// this are parts of the script of MarshallMar
	// for his script look here: http://userscripts.org/scripts/review/40217
	function imageZoom(){
		var imgList = document.getElementsByTagName("img");
		for( i=0; i < imgList.length; i++) {
			var imgName = imgList[i].src;
			var t = imgName.search(/\/(medium|tiny|small)\//); 
			if( t != -1) {
				bigimage=imgName.replace(/\/(medium|tiny|small)\//, "/big/");
				newImg = document.createElement("img");
				ow=imgList[i].width;
				oh=imgList[i].height;
				imgList[i].addEventListener("mouseover",
						function(e){
							newX=cumulativeOffset(this)[0]
							newY=cumulativeOffset(this)[1]
							newImg.src=this.src.replace(/\/(medium|tiny|small)\//, "/big/");
							//newImg.style.width="140px";
							//newImg.style.height = "185px";
							newImg.style.position="absolute";
							newImg.style.zIndex='999';
							newImg.style.top=(newY-185/2).toString() + 'px';
							newImg.style.left=(newX+ow).toString() + 'px';
							document.body.appendChild(newImg);
						},false);
				imgList[i].addEventListener("mouseout",
						function(e){
							document.body.removeChild(newImg);
						},false);

			}
		}
	}
		
		function cumulativeOffset(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
			} while (element);
			return [valueL, valueT];
		}

		
	
	function update(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + scriptURL,
			onload: function(responseDetails) {
				if (responseDetails.responseText.substring(responseDetails.responseText.indexOf(scriptname) + scriptname.length,responseDetails.responseText.indexOf(scriptname) + scriptname.length + 11).indexOf(version) == -1)
				{
				//	alert(responseDetails.responseText.substring(responseDetails.responseText.indexOf(scriptname) + scriptname.length,responseDetails.responseText.indexOf(scriptname) + scriptname.length+11).trim());
					if(confirm('Es ist eine neue Version verfügbar. \n Installieren?'))
					{
						//GM_openInTab('http://userscripts.org/scripts/source/' + scriptURL+ '.user.js');
						window.location.href = 'http://userscripts.org/scripts/source/' + scriptURL+ '.user.js';
					}
				}
				else
					{
						alert(scriptname + ': \nDein Script ist auf dem neuesten stand :)');
					}
			}
		});	
	}
// läd das sript sobald wkw fertig eladen hat
window.addEventListener('load',function(){main();},true);