// ==UserScript==
// @name           OneManga Chapter Onepage
// @namespace      Knace
// @description    A onemanga.com script: Loads all images in the entire chapter vertically. You only need to scroll down to continue reading which keeps the flow of the manga. Also makes saving the entire chapter simple and easy!
// @version          1.2.1
// @include        http://www.onemanga.com/*
// ==/UserScript==
if(!GM_setValue) {
	function GM_setValue(arg1,arg2) {}
	function GM_getValue(arg1,arg2) {return arg2;}
	function GM_registerMenuCommand(arg1,arg2) {}
}


var img_width = GM_getValue('img_width', '100%');
var img_height = GM_getValue('img_height', 'auto');
function setImageSize() {
	GM_setValue('img_width',prompt('Set width (#,#px,#%,auto): ',img_width));
	GM_setValue('img_height',prompt('Set height (#,#px,#%,auto): ',img_height));
}
GM_registerMenuCommand( 'Set Image Size', setImageSize );


//Variables
var url = window.location.pathname.split('/');
var url_directory = 'http://www.onemanga.com/'+url[1];
var url_chapter = url[2];
var page = '01';
	//if(target_load) { page = url[3]; }


var skip_summary = GM_getValue('skip_summary', false);
function setSkipSummary() {
	skip_summary = !skip_summary; GM_setValue('skip_summary', skip_summary);
	if( skip_summary ) {
		alert('Will now skip the summary confirm page.');
	} else {
		alert('YOu must now manually click on the Begin Reading link.');
	}
}
GM_registerMenuCommand( 'Skip summary confirm page?', setSkipSummary );
var url = document.location.href.split('/');
GM_log(window.location);
GM_log(url[0]+'//'+url[2]+'/'+url[3]+'/'+url[4]+'/');
if( window.location==url[0]+'//'+url[2]+'/'+url[3]+'/'+url[4]+'/' ) {
	if( skip_summary ) { window.location.href = window.location.href+'01/'}
}
else {

	//Get data from page select tag

	var select = document.getElementById('id_chapter_1');
	var si = select.selectedIndex;
	var chapter_prev=url_directory;
		if( si+1 < select.length ) { chapter_prev += '/'+select.options[si+1].value; }
	var chapter_next=url_directory;
		if( si > 0 ) { chapter_next += '/'+select.options[si-1].value; }
	var ch_selecter=select.innerHTML;



	var pg=document.getElementById('id_page_select');
	var total_images = pg.length;
	pg_selecter = pg.innerHTML;

	url = document.getElementsByClassName("manga-page")[0].src.split('/');
	url.pop();
	var path = url.join('/');


	{ //Clear and Create Menu
		document.body.parentNode.replaceChild( document.createElement('body'), document.body )
		var js = document.getElementsByTagName('script');
		for( var i=0;i<js.length;++i ) { js[i].src=''; }

		var element = document.createElement('div');
			element.setAttribute('id','mu');
			element.style.top='5px';
			element.style.position='fixed';
			element.innerHTML = '<div style="background:#FFFFFF; border:solid #000000 medium; padding:3px"><a href="http://'+window.location.host+'">Onemanga</a> : <a href="'+url_directory+'">Manga Info</a> : [ <a href="'+chapter_prev+'">&lt;&lt;</a> <select id="chapters" onchange="window.location.href=\''+url_directory+'/\'+this.value">'+ch_selecter+'</select> <a href="'+chapter_next+'">&gt;&gt;</a> ] ('+total_images+' Images) <select id="page" onchange="var e=document.getElementById(\'\'+this.value);if(e){e.style.display=\'\'}window.location=\'#p\'+this.value">'+pg_selecter+'</select></div>';
		document.body.appendChild(element);
		document.getElementById('chapters').selectedIndex = si;
	}

	function toggleMenu() {
		var menu = document.getElementById('mu');
		var hide_menu = !GM_getValue('hide_menu', false); GM_setValue('hide_menu', hide_menu);
		if( hide_menu ) {
			menu.style.display = 'none';
		} else {
			menu.style.display = '';
		}
	}
	toggleMenu();toggleMenu();
	GM_registerMenuCommand( '[~] Toggle Menu', toggleMenu );

	document.addEventListener('keydown', function(event) {
		if(event.keyCode == 192) { toggleMenu(); }
		if(event.keyCode == 37) { window.location=chapter_prev; }
		if(event.keyCode == 39) { window.location=chapter_next; }
	}, false);


	window.loader = function( i ) {
		var element = document.createElement('div');
			element.setAttribute('id', 'p'+i);
			element.innerHTML = '<div style="width:100%;font:xx-small;color:#FFFFFF;border-style:outset;border-width:thin 0px thin 0px;text-align:center;cursor:pointer;" onClick="element=document.getElementById(\''+i+'\').style;if(element.display==\'none\'){element.display=\'\';}else{element.display=\'none\';}">-'+i+'-</div>';
			element.innerHTML += '<img id="'+i+'" src="'+path+'/'+i+'.jpg" width="'+img_width+'" height="'+img_height+'">';
		document.body.appendChild(element);
	}

	//Start loading images
	var select = document.getElementById('page');
	for( var i=0; i<select.length; i++ ) {
		loader(select.options[i].value);
		if( i == (total_images-1) ) { 
			var element = document.createElement('div');
			element.innerHTML+='<div style="width:100%;text-align:center;font:x-small;border:outset;border-width:thin 0px thin 0px;background-color:#FF0000;color:#FFFFFF"><br><br>***End of Chapter***<br><br><br></div>';
			document.body.appendChild(element);
		}
	}

}
