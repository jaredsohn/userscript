// ==UserScript==
// @name           WKW-Tineye 
// @namespace      wkw
// @include        http://www.wer-kennt-wen.de/person/*
// @include        http://www.wer-kennt-wen.de/gallery/*
// @include        http://www.tineye.com/*
// ==/UserScript==

var url = document.URL
var referrer = document.referrer;

	  /////////////////////////////////////////////////////
////////// Benutzerprofil Tineye-Link einfügen Start /////
	/////////////////////////////////////////////////////

	function personsSite(){

		var sidebar = document.getElementById('sidebar');
		var person_picture = document.getElementById('sidebar').getElementsByTagName('img')[0].getAttribute('src');
		if ( person_picture.match('bmi') ){
			person_picture = 'http://'+person_picture.substring(person_picture.indexOf('img'));
		}
		if (!person_picture.match('dummy')){
			var newButton1 = document.createElement('li');
			newButton1.setAttribute("class","tineye");
			newButton1.innerHTML = '<font color="#135AA0"><a href="http://www.tineye.com/search?url='+person_picture+'">Tineye</a></font>';
			var ul = sidebar.getElementsByTagName('ul')[0];
			ul.appendChild(newButton1);
		}

		if (url.indexOf('justnow') > -1){
			var all_a = document.getElementsByTagName('a');
			for (var i = 0; i < all_a.length; i++) {
				this_a = all_a[i];
				if(this_a.title == 'kommentieren'){
					this_a.addEventListener('click' , jn_comment , true );
				}
			}
		}

		if (url.indexOf('gb') > -1){
			document.getElementById('myGBPostContainer').setAttribute('class','UI-activeForm wImageS clearfix active');
			document.getElementById('myGBPost').setAttribute('style','height: 100px; overflow: hidden;');
			document.getElementById('myGBPost').value = 'Für dieses Profilbild hatte ich '+url.substring(url.indexOf('&')+1,url.length)+' Treffer bei dem Bildersuchdienst TinEye\n'+document.referrer+'\n\nGefunden mit dem Script\nWKW TineyeSearch\nhttp://userscripts.org/scripts/show/95267';
		}

	}

	function jn_comment(){
		document.getElementById('jn_cmt_text').value = 'Für dieses Profilbild hatte ich '+url.substring(url.indexOf('&')+1,url.length)+' Treffer bei TinEye\n'+referrer;
	}

	  ////////////////////////////////////////////////////
////////// Benutzerprofil Tineye-Link einfügen Ende /////
	////////////////////////////////////////////////////


	  //////////////////////////////////////////////
////////// Gallery Tineye-Link einfügen Start /////
	//////////////////////////////////////////////

	function gallery(){

		// Eventlistener einfügen um neue URL dann zu laden
		var allIMG = document.getElementsByTagName('img');
		for (var i = 0; i < allIMG.length; i++) {
			thisIMG = allIMG[i];
			if (thisIMG.src.match('thumb')){
				thisIMG.addEventListener('click' , main , true );
			}
		}
		document.getElementById('slideLeft').addEventListener('click' , main , true );
		document.getElementById('slideRight').addEventListener('click' , main , true );
		document.getElementById('toPrevImg').addEventListener('click' , main , true );
		document.getElementById('toNextImg').addEventListener('click' , main , true );

		// Wenn vorhanden alten Link erstmal entfernen
		var tineye_link = document.getElementById('tineye_link');
		if (tineye_link) {
		    tineye_link.parentNode.removeChild(tineye_link);
		}

		// Die Bild-URL
		var pic_URL = document.getElementById('imgContainer').getElementsByTagName('img')[0].getAttribute('src');		

		// Link einfügen
		var new_li = document.createElement('li');
		new_li.setAttribute("class","tineye");
		new_li.setAttribute("id","tineye_link");
		new_li.innerHTML = '<font color="#135AA0"><a href="http://www.tineye.com/search?url='+pic_URL+'">Tineye</a></font>';
		var picActions = document.getElementById('picActions');
		var ul = picActions.getElementsByTagName('ul')[0];
		ul.appendChild(new_li);

		if (url.indexOf('comment') > -1){
			document.getElementById('postComment').setAttribute('class','active clearfix');
			document.getElementById('myComment').setAttribute('style','height: 100px; color: rgb(51, 51, 51);');
			document.getElementsByTagName('button')[0].setAttribute('style','display: inline;');
			document.getElementById('myComment').value = 'Für dieses Bild hatte ich '+url.substring(url.lastIndexOf('&')+1,url.length)+' Treffer bei dem Bildersuchdienst TinEye\n'+document.referrer+'\n\nGefunden mit dem Script\nWKW TineyeSearch\nhttp://userscripts.org/scripts/show/95267';
		}
	}
			
	  /////////////////////////////////////////////
////////// Gallery Tineye-Link einfügen Ende /////
	/////////////////////////////////////////////
	
	function tineye (){
		if ( document.referrer.match('wer-kennt-wen') ) {
			var wkw_referrer = document.referrer;
			if( document.title.match('result') && !document.title.substring(0,1).match('0') ){
	
				gallery_link = document.getElementsByTagName('p')[3].getElementsByTagName('a')[0].getAttribute('title');

				alertbox = document.getElementsByTagName('p')[7];
				if (alertbox) {
					if (alertbox) {
						alertbox.parentNode.removeChild(alertbox);
					}
					newalertbox = document.createElement('p');
					newalertbox.setAttribute("class","chrome-alert");
					if ( wkw_referrer.match('gallery') ) {
						newalertbox.innerHTML = '<a href="'+wkw_referrer+'#image'+gallery_link.substring(gallery_link.lastIndexOf('/'),gallery_link.lastIndexOf('.'))+'/comment&'+document.title.substring(0,document.title.indexOf(' '))+'">Fotokommentar schreiben...</a>';

					} else {
						newalertbox.innerHTML = '<a href="http://www.wer-kennt-wen.de/person'+gallery_link.substring(gallery_link.lastIndexOf('/'),gallery_link.lastIndexOf('.')-1)+'?justnow&'+document.title.substring(0,document.title.indexOf(' '))+'">Was macht XYZ kommentieren...</a><br><a href="http://www.wer-kennt-wen.de/person'+gallery_link.substring(gallery_link.lastIndexOf('/'),gallery_link.lastIndexOf('.')-1)+'?gb&'+document.title.substring(0,document.title.indexOf(' '))+'">Gästebucheintrag verfassen...</a>';
					}
					document.getElementsByTagName('p')[6].parentNode.insertBefore(newalertbox, alertbox.nextSibling);
				}
			}
		
		}
	}

	  /////////////////////////////////
////////// Seitensteuerung Start /////
	/////////////////////////////////
	function main(){
			///// Aktuelle URL /////

			if (url.indexOf('person') > -1)
				personsSite();

			else if (url.indexOf('gallery') > -1)
				document.getElementById('imgContainer').getElementsByTagName('img')[0].addEventListener('load',gallery,true);
			else if (url.indexOf('tineye') > -1)
				tineye();
			
	}

	  ////////////////////////////////
////////// Seitensteuerung Ende /////
	////////////////////////////////

//////////////////////////////////////////
window.addEventListener('load',main,true);	
//////////////////////////////////////////

var css = "" + (<r><![CDATA[

li.tineye
{
	background:url('data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAb/xAAgEAABBAICAwEAAAAAAAAAAAAEAQIDEQUhABIGFTFB/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABkRAAEFAAAAAAAAAAAAAAAAABIAAQIxQf/aAAwDAQACEQMRAD8AsPbp7twEk5spE+Vkh6tKljbDDelStfdVwi+QI7PhBCkmRzR5d400bypXo6Nj0airetreuEcKeL5kVkCcXl5hojJJY0FFV3enqqfaRUVP2+DCxh03mcR4+Iy8I0uRaQ5SxVYrO0nZ11aUl/b48YleIDPIa1f/2Q==') 2px no-repeat;
} 
]]></r>);

	if(GM_addStyle)
		GM_addStyle(css);
		else
		{
			var head = document.getElementsByTagName('head')[0];
			if(head)
			{
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = css;
				head.appendChild(style);
			}
		}

	  /////////////////////////////
////////// CSS einfügen Ende /////
	/////////////////////////////
