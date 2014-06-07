// CSFD Piratska verzia
// version 3.01
// 7.7.2011
// Copyright (c) 2011, borec
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CSFD Pirated Version
// @description   Prida odkazy na stiahnutie filmov a tituliek pre CSFD.cz
// @include       http://www.csfd.cz/*
// @include		  http://csfd.cz/*
// ==/UserScript==





var galerie ="galerie/";

//nastavenia
var Reklama = 0 // 0 - reklama vypnuta, 1 - reklama zapnuta 

//odstranit reklamu
var reklama = document.getElementById("ad-wrapper");
if (reklama && Reklama == 0) 
{
reklama.innerHTML='';
}
var reklama2 = document.getElementById("bmone2n-14143.2.11.7");
if (reklama2 && Reklama == 0) 
{
reklama2.innerHTML="";
}
//koniec reklama
var kontrola = document.getElementById('rating');
if (kontrola) {

var h1= document.getElementsByTagName("h1");

var objekt = document.getElementsByClassName("names");

if (objekt.length > 0) {
var img= objekt[0].getElementsByTagName("img");
var h3= objekt[0].getElementsByTagName("h3");
nazovEN = 'undef';
var nazovCZ = 'nic';
for (var i=0;i<img.length;i++)
{
if (img[i].alt=="EN nåzev" || img[i].alt=="USA" || img[i].alt=="Velkå Britånie")
{nazovEN=h3[i].innerHTML; } 

if (img[i].alt=="CZ název")
{nazovCZ=h3[i].innerHTML; }
};


var ennazov = '';
var matnazov = '';
if (navigator.language == 'sk'){
matnazov = 'Český názov';
ennazov = 'Anglický názov'; } else {ennazov = 'Anglický název'; matnazov = 'Český název';}
 
if (navigator.language == 'cz') {nazovCZ = h1[0].innerHTML; }
if (nazovEN=='undef') {nazovEN=h1[0].innerHTML;} } else {nazovEN=h1[0].innerHTML;}

var f =nazovEN.search(/</i); 
if (f != -1) {nazovEN = nazovEN.slice(0,f-1)}

var h =nazovEN.search(/</i); 
if (h != -1) {nazovCZ = nazovCZ.slice(0,h-1)}

//var nazov = document.getElementsByTagName("h3");
//nazovEN=nazov[1].innerHTML;
nazovEN=nazovEN.replace(/	/g,"");

nazovEN=encodeURI(nazovEN);
nazovEN=nazovEN.replace(/%0A%0A/g,"");

nazovCZ=encodeURI(nazovCZ);
nazovCZ=nazovCZ.replace(/%0A%0A/g,"");



var nnnnn=document.createElement('form');




var nastavenia = document.getElementById('main-menu').getElementsByTagName('li');


var nnnnn=document.createElement('form');
function nastpanel() 
	{
	var main = document.getElementsByTagName("h1");
	
	nnnnn.id="nastavenia";
	nnnnn.setAttribute('style','padding-bottom:5px;  display: none;');
	nnnnn.innerHTML='<input id ="caa"type="checkbox"checked name="c1">Uloz.to</input>&emsp;'+
	"<input type='checkbox'  id ='cab' checked name='c2'>Titulky.com</input>&emsp;" +
	'<input type="checkbox" checked="true" id ="cac" name="c3">Czshare</input>&emsp;'+
	'<input type="checkbox"  checked id="cak">Share-rapid</input>&emsp;' +
	'<input type="checkbox" checked="unchecked" id ="cad">CzTorrent</input>&emsp;<br/>' +
	'<input type="checkbox"checked id ="cae">ThePirateBay</input>&emsp;'+
	'<input type="checkbox"checked id ="caf">KickAssTorrents</input>&emsp;' +
	'<input type="checkbox"checked id ="cag">TrezzorCz</input>&emsp;'+
	'<input type="checkbox"checked id ="cah">Torrentleech</input>&emsp;<br/>'+
	'<input type="checkbox"checked id ="cai">Titulkari</input>&emsp;'+
	'<input type="checkbox"checked id ="cal">Warez-BB</input>&emsp;'+
	'<input type="checkbox"checked id ="caj">Trailer</input>&emsp;<hr>'+
//	'<input type="radio" id="r1"/>'+ennazov+'&emsp;'+
//	'<input type="radio" id="r2"/>'+matnazov+'<br/>'+
	'<input type="button" value="Ok" id="butt";/>&emsp;<br/>';
;
	
	
	main[0].parentNode.insertBefore(nnnnn, main[0]);
	}
nastpanel();


var nastavenia = document.getElementById('main-menu').getElementsByTagName('li');

		
	









var mm = document.getElementById('main-menu').getElementsByTagName('li');

for (var i=0; i<mm.length; i++){
mm[i].setAttribute('style','margin-left:9px');
}
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.6.2.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript

function main() {
$('<style type="text/css">.zmazat{color:#A52A2A; font-weight:bold; font-size: 13px; }</style>').appendTo('head');
		
		
  
  
		


 

var imdebe = $('img.imdb').parent();
$(imdebe).find("img").attr("src","http://www.vignesrealm.com/images/imdb_icon.png");


$(imdebe).appendTo($('ul.links'));



if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

//cookie
var caa = GM_getValue('caa');
var cab = GM_getValue('cab');
var cac = GM_getValue('cac');
var cad = GM_getValue('cad');
var cae = GM_getValue('cae');
var caf = GM_getValue('caf');
var cag = GM_getValue('cag');
var cah = GM_getValue('cah');
var cai = GM_getValue('cai');
var caj = GM_getValue('caj');
var cak = GM_getValue('cak');
var cal = GM_getValue('cal');

var enn= GM_getValue('enn');
var czn = GM_getValue('czn');

$('#r1').click(function(){
GM_setValue('enn',true);

});







if (caa == "false") {

$('#aa').hide();
$('#caa').prop('checked',false);

} else { 

$('#aa').show();
}

if (cak == "false") {

$('#ak').hide();
$('#cak').prop('checked',false);

} else { 

$('#ak').show();
}

if (cab == "false") {

$('#ab').hide();
$('#cab').prop('checked',false);

} else { 

$('#ab').show();
}

if (cac == "false") {

$('#ac').hide();
$('#cac').prop('checked',false);

} else { 

$('#ac').show();
}

if (cad == "false") {

$('#ad').hide();
$('#cad').prop('checked',false);
} else { 


$('#ad').show();
}

if (cae == "false") {

$('#ae').hide();
$('#cae').prop('checked',false);

} else { 

$('#ae').show();
}

if (caf == "false") {

$('#af').hide();
$('#caf').prop('checked',false);

} else { 
$('#af').show();
}

if (cag == "false") {

$('#ag').hide();
$('#cag').prop('checked',false);
} else { 

$('#ag').show();
}

if (cah == "false") {

$('#ah').hide();
$('#cah').prop('checked',false);
} else { 

$('#ah').show();
}

if (cai == "false") {

$('#ai').hide();
$('#cai').prop('checked',false);
} else { 

$('#ai').show();
}
if (caj == "false") {

$('#aj').hide();
$('#caj').prop('checked',false);

} else { 

$('#aj').show();
}

if (cal == "false") {

$('#al').hide();
$('#cal').prop('checked',false);

} else { 

$('#al').show();
}

 var kontrola = document.getElementById('rating');
if (kontrola) {

  var nastavenia = document.getElementById('main-menu').getElementsByTagName('li');
var panelkkkk = document.createElement('li');
panelkkkk.setAttribute('style','display: none;');
panelkkkk.setAttribute('id','nast');
if (navigator.language == 'sk'){

panelkkkk.innerHTML='<a href ="#"><b>Nastavenia</b></a>';
}
else {panelkkkk.innerHTML='<a href ="#"><b>Nastavení</b></a>';
}
panelkkkk.setAttribute('style','font-size:13px;color:#B01;');
nastavenia[9].parentNode.insertBefore(panelkkkk,nastavenia[9].nextSibling);
 $.noConflict();
  
 $('#nast').click( function(){

$('#nastavenia').toggle();
return false;
});
 }

//-->

$('.disc-sale-ads').remove();
$('object:eq(1)').remove();




$('[class*="trivia"]').attr('href','#');
	$('[class*="trivia"]').find('a').attr('class','nie').click(function(odkaz){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/zajimavosti/", function(data,panell) {
		
				var x =$(data).find('div[class*="ct-general th with-navigation trivia"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });
// perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 


  });
		return false;
		
	});


$('[class*="reviews"]').find('a').attr('href','#').attr('class','nie');
	$('[class*="reviews"]').click(function(){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/recenze/", function(data,panell) {
		
				var x =$(data).find('div[class*="ct-general th with-navigation reviews"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });
// perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 


  });
		return false;
		
	});

var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");
	
if ($('li:contains("Registrovat")').length == 1) {
	
	$('li[class*="forum"]').find('a').attr('href','#').attr('class','nie');
	$('li[class*="forum"]').click(function(davaj){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/diskuze/", function(data) {
		
				var x =$(data).find('div[class*="ct-general th with-navigation forum"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });

  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 


  });
		return false;
		
	});

													}
 





	$('li[class*="photos"]').find('a:eq(0)').attr('href','#').attr('class','nie');
	$('li[class*="photos"]').click(function(){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/galerie/", function(data,panell) {
		var x =$(data).find('div[class*="ct-general th with-navigation photos"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error photo"); })
  .complete(function() {  });

  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 
		
  });
		return false;
	});
	
	$("h4:contains('Hraj')").parent().append('<div id="foto"></div>');
	
	$('span').find('a').mouseover(function(){
	var semm = $(this).prop('href');
	
	var jqxhr = $.get(semm, function(data,panell) {
		var x =$(data).find('img[alt="foto"]');
				
		
		
		$('#foto').html(x);
		$(this).append('sssssssss');
		
  })
	
	
	$('#foto').html('');
});
	
	
$('body').mouseover(function(){
	$('#foto').html('');
});
	$('#foto').mouseover(function(){
	$('#foto').html('');
});
	
$('[class*="collection"]').find('a').attr('href','#').attr('class','nie');
	$('[class*="collection"]').find('a').click(function(){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/filmoteka/", function(data,panell) {
		var x =$(data).find('div[class*="ct-general th with-navigation collection"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });

  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 
		
  });
		return false;
	});

$('[class*="bazaar"]').find('a').attr('href','#');
	$('[class*="bazaar"]').click(function(){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem+"/bazar/", function(data,panell) {
		var x =$(data).find('div[class*="ct-general th with-navigation bazaar"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });

  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 
		
  });
		return false;
	});
	$('.videos').find('a').attr('class','nie');
	$('.videos').click(function(sem){
	window.location.href = sem+"/videa/";
	})
	
	if ($('li:contains("Registrovat")').length == 1) {
	$('[class*="comments"]').click(function(){
	var sem= window.location.href;
	sem = sem.replace("galerie/","").replace("diskuze/","").replace("recenze/","").replace("videa/","").replace("bazar/","").replace("filmoteka/","").replace("zajimavosti/","").replace("strana-2/","").replace("strana-3/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","").replace("podle-datetime/","").replace("podle-rating/","").replace("strana-4/","");

		var jqxhr = $.get(sem, function(data,panell) {
		var x =$(data).find('div[class*="ct-general th with-navigation default"]');
				var y =$(x).find('.content');
				x =$(x).find('h2');
		
		$('h2:eq(1)').html(x.html());
		$('div[class*="ct-general th with-navigation"]').find('.content').html(y.html());
		
		
  })
  .success(function() {  })
  .error(function() { alert("error"); })
  .complete(function() {  });

  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ 
		
  });
		return false;
	});
	
					}

  
  

$('#butt').click( function(){

$('#nastavenia').toggle();


});


$('#caa').change(function(){$('#aa').toggle();});
$('#cab').change(function(){$('#ab').toggle();});
$('#cac').change(function(){$('#ac').toggle();});
$('#cad').change(function(){$('#ad').toggle();});
$('#cae').change(function(){$('#ae').toggle();});
$('#caf').change(function(){$('#af').toggle();});
$('#cag').change(function(){$('#ag').toggle();});
$('#cah').change(function(){$('#ah').toggle();});
$('#cai').change(function(){$('#ai').toggle();});
$('#caj').change(function(){$('#aj').toggle();});
$('#cak').change(function(){$('#ak').toggle();});
$('#cal').change(function(){$('#al').toggle();});



/////////////////////////////////////////////////////////////////////////////////////////////////////////

var panelkkkkko; 






      
	  
	  
	  
	  
	   $('#cab').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cab',true); 
	  
	  }
	  else {
	  GM_setValue('cab',false); 
	  
	  }
	  
	  })
	  
	   $('#caa').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('caa',true); 
	  
	  }
	  else {
	  GM_setValue('caa',false); 
	  
	  }
	  
	  })
	  
	   $('#cac').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cac',true); 
	  
	  }
	  else {
	  GM_setValue('cac',false); 
	  
	  }
	  
	  })
	  
	   $('#cad').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cad',true); 
	  
	  }
	  else {
	  GM_setValue('cad',false); 
	  
	  }
	  
	  })
	  
	   $('#cae').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cae',true); 
	  
	  }
	  else {
	  GM_setValue('cae',false); 
	  
	  }
	  
	  })
	  
	   $('#caf').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('caf',true); 
	  
	  }
	  else {
	  GM_setValue('caf',false); 
	   
	  }
	  
	  })
	  
	   $('#cag').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cag',true); 
	  
	  }
	  else {
	  GM_setValue('cag',false); 
	  
	  }
	  
	  })
	  
	   $('#cah').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cah',true); 
	  
	  }
	  else {
	  GM_setValue('cah',false); 
	  
	  }
	  
	  })
	  
	   $('#cai').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cai',true); 
	  
	  }
	  else {
	  GM_setValue('cai',false); 
	  
	  }
	  
	  })
	  
	   $('#caj').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('caj',true); 
	  
	  }
	  else {
	  GM_setValue('caj',false); 
	  
	  }
	  
	  })
	  
	  $('#cak').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cak',true); 
	  
	  }
	  else {
	  GM_setValue('cak',false); 
	  }
	  })
	  
	  $('#cal').change(function(){
	  if ($(this).prop('checked')== true){
	  
	  GM_setValue('cal',true); 
	  
	  }
	  else {
	  GM_setValue('cal',false); 
	  }
	  })
	  
	  
	 
	  
	  
	  $('a:not(.nie)').filter('[href*="film"]').mouseover(function(){
		var s = $(this).prop('href');
		var h = $(this);
		var data;
		 
		$.ajax({
		processData: false,
  url: s,
  data: data,
  success: function(data){
  $(h).parent().find('[name="zmazat"]').remove();
  var hodnotenie = $(data).find('h2').filter('[class*="average"]').text();
  if(hodnotenie != ''){
  $(h).parent().prepend('<span name="zmazat" class="zmazat">['+hodnotenie+']&nbsp;</span>');}
 },
  
});
	});	
	  
	  
	  
	  
	  
	  
	  
	  


















   
  
    
  
  }

// load jQuery and execute the main function
addJQuery(main);
if (kontrola) {

nazov=nazovEN;

var TPB="http://thepiratebay.org/search/"+nazov+"/0/99/200";
var YT="http://www.youtube.com/results?search_query="+nazov+" trailer";
var ULTO="http://www.uloz.to/hledej/?q="+nazov+"&media=video";	
var CzT="http://tracker.cztorrent.net/torrents/?c1=1&c35=1&c33=1&c11=1&c30=1&c31=1&c25=1&c19=1&c24=1&s="+nazov+"&t=3";	
var NT="http://www.newtorrents.info/search/"+nazov;	
var SR="http://share-rapid.com/vyhledavani/?co="+nazov+"&zpusob=jakekolivslovo&minvelikost=&minstazeni=0&typ=2&sbmt=Vyhledat";
var TL="http://www.torrentleech.org/torrents/browse/index/query/"+nazov.replace(/:/g,"")+"/categories/1,8,9,10,11,12,13,14,15,29,2,26,27,32";
var TIT="http://www.titulky.com/index.php?Fulltext="+nazov.replace(/,%20The/g,"");
var KAT="http://www.kat.ph/search/"+nazov;
var TRZ="http://tracker.czech-server.com/torrents.php?active=1&category=21111111111&search="+nazov;
var TT="http://titulkari.com/index.php?searchword="+nazov+"&ordering=newest&searchphrase=all&areas[0]=downloads&option=com_search#content"
var CZs="http://czshare.com/search.php?q="+nazov;	
var WB="http://www.warez-bb.org/search.php?mode=results&search_terms=all&search_author=&search_forum=4&search_cat=-1&show_results=topics&search_time=0&search_fields=aa&sort_by=0&sort_dir=DESC&return_chars=200&search_keywords="+nazov;
var FO="http://filmy.kinotip.cz/?s="+nazovCZ;

		
function downBar() 
	{
var maini, downbar;
maini = document.getElementsByTagName("h1");
if (maini) {

    downbar = document.createElement('tr');
	downbar.setAttribute('style','padding-top:5px;');
	downbar.innerHTML+="<td id='aa'><a href="+ULTO+"><img id='ia'; title='Uloz.to' width='20' src='data:;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAN7e3v98fHz/UVFR/1FRUf9RUVH/UVFR/1FRUf9RUVH/UVFR/1FRUf9RUVH/fHx8/97e3v8AAAAAAAAAAN7e3v9bW1v/UFBQ/29vb/97e3v/e3t7/3t7e/97e3v/e3t7/3t7e/97e3v/b29v/1BQUP9bW1v/3t7e/wAAAACSkpL/UFBQ/7Gxsf////////////////////////////////////////////////+xsbH/UFBQ/5KSkv8AAAAAfHx8/09PT////////////////////////////////////////////////////////////09PT/98fHz/AAAAAHx8fP9PT0//////////////////AAAA/////////////////wAAAP////////////////9PT0//fHx8/wAAAAB8fHz/T09P/////////////////wAAAP///////////wAAAP8AAAD/AAAA////////////T09P/3x8fP8AAAAAfHx8/09PT/////////////////8AAAD//////wAAAP8AAAD/AAAA/wAAAP8AAAD//////09PT/98fHz/AAAAAHx8fP9PT0//////////////////AAAA/////////////////wAAAP////////////////9PT0//fHx8/wAAAAB8fHz/T09P//////8AAAD/AAAA/wAAAP8AAAD/AAAA//////8AAAD/////////////////T09P/3x8fP8AAAAAfHx8/09PT////////////wAAAP8AAAD/AAAA////////////3dSv/7ShUP+tmED/rZhA/4FsFP+cj1T/AAAAAHx8fP9PT0//////////////////AAAA////////////1syf/5J2AP+SdgD/knYA/5J2AP+7qWD/AAAAAAAAAAB8fHz/T09P/////////////////////////////////6aQMP+SdgD/knYA/5J2AP+7qWD/AAAAAAAAAAAAAAAAfHx8/09PT/////////////////////////////////+SdgD/knYA/5J2AP+7qWD/AAAAAAAAAAAAAAAAAAAAAJKSkv9QUFD/sbGx////////////////////////////knYA/5J2AP+7qWD/AAAAAAAAAAAAAAAAAAAAAAAAAADe3t7/W1tb/1BQUP9vb2//e3t7/3t7e/97e3v/e3t7/5J2AP+7qWD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN7e3v98fHz/UVFR/1FRUf9RUVH/UVFR/1FRUf+Gbw//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAACAAwAAgAcAAIAPAACAHwAAwD8AAA=='></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ab'><a href="+TIT+"><img title='Titulky' width='20' src='data:application/ico;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEwcHLycoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxb3I9PUI9PUJlY2KqpaQAAAAAAAAAAAAAAAAAAAAAAACzsbF/fH19e3ypp6iKhYcVJYQGJdgGJdgeNIo1Nj5ubW3Y1NQAAAAAAADf3d6amZq8u7ykoqOxra1lY2IdJVoGJdgGJdgYQ+MpYe5DfOI6SV12c3IAAAAAAACtrK0AAADQzs89PUKxra2pp6glLF4dLIgPNN4pYe42b+hcl9VLhLtubG4AAACinp/EwcEAAABkZGk0MzfEwcHLycpNW10XoYYbcWUwWcJNirdWYYS8u7wAAADf3d6PiIcsLDO1srJsa216eX3Lycrf3d5beXYUsJAR5rIWs5FlY2Lf3d4AAAAAAAC9uLeGhYY1Nj7f3d7LycrLycqTkpTf3d5beXYTwpsR5rJKfnCamJkAAAAAAAAAAACdmprLycrEwcGin5/LycpVVVssLDPEwcFUcG0po4kwu5qzop+di4cAAAAAAAAAAACWkZCgnZ68u7xNSkvLycpGRkw9PUHf3d4jYYEk07uDkaG8u7ytrK0AAAAAAAAAAACinp9FQ0eAfoHY1NSqpKS8u7zf3d6jsK8Xj3pN2ty9uLetrK29uLcAAAAAAAAAAAC9uLdOTFHQzs9MS1BeWVq4trff3d5ybmhVqpZwudPf3d6HgoLf3d4AAAAAAAAAAAC4trcAAADf3d4sLDNeWVqkoqOnj4msV0LjhWy/ranf3d6amJkAAAAAAAAAAAAAAADf3d7Qzs8AAACsqKikoqOMioqDVUy/Y0yylY7f3d6in5/f3d4AAAAAAAAAAAAAAAAAAADY1NTEwcGxra2smZXEwcG1srK8u7wAAACpp6jY1NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQzs+xra29uLe9uLff3d4AAAAAAAAAAAAAAAAAAAAAAAD/zwAA/4MAAPAAAADAAAAA0AAAAJABAAAAAwAAAAcAAAAHAAAABwAAAAcAAAAHAABADwAAIA8AAICfAAD4PwAA'></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ac'><a href="+CZs+"><img title='CzShare' width='20' src='data:application/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKUAAACmAAAApwACAKcAAACpAAMAqgAIAKkAAACsAAQArAAAAK8AAQCvAAEAsAAOAKwAAACxAA8ArAAAALIAAACzAAkAsgAFALQAAAC2AAAAuAAVAa4AAAC6AAUAuQAAALsAAAC8AAEAvAAAAL4AAAC/AAAAxAAAAMUABQW2AAAAyQAAAMwAAAHJAA0EvAAAANEAAADSAAUBzwAFAs4ACAm3ABEIuQAJBsMABQLSABYLsAAIBcsACQfEAAMHygARCcEACgjIABAKxAAQCskADQzMAAgL1AAIDNQADQ7RAB0WtQAeF7MADRLRABwVxAAPFdEAIRnCACIcuwAYG8cAIBzFACIdwgAcHcUAJCC5ACMfvgAiIL4AKiqlABgf0wAjKL8AMSu5ACwsvwAxMccAMDLKACsz1wAwNs4APTvBADo8ygA9PcsAOz/QAEdI0AA/Rd4ARUrZAFBRxQBNU8YAV1rMAFph3gBaYtsAa27VAHN12QB7guUAf4TfAJOV3ACSmecAlpzlAJ+l6ACsq+QAr7PqAK2z7ADGy+0A2dv0APv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpQFdGaWlpaWlpaWlpaWlALA4VDDlGaWlpaWlpaWlJBgECBQADBlZpaWlpaWk4CAdPY2ZfQwcERmlpaWk+EQtYaGhoaGhKCglpaWlEEilFaGdIH1toaCgPRmlBFz0UXGhLECMNZGhRE1BpGTBAGF5oQho7E2FoUxZMaWkuMipSaGIcGU5oaD8bQGlpaTEzHmBoaGVoaFodHmlpaWlpNC0vXWhoaFkiIFVpaWlpaWk3JyFHTTwhJjppaWlpaWlpaVQ1JCslNkBpaWlpaWlpaWlpaUBAQGlpaWlpaWlpaWlpaWlpaWlpaWlpaf//AAD/HwAA/AcAAPgDAADwAQAA4AEAAMAAAACAAAAAgAAAAMAAAADgAQAA8AEAAPgDAAD8BwAA/x8AAP//AAA='></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ak'><a href="+SR+"><img title='Share-rapid' width='20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAApNJREFUeJyNkktIVGEYhp/z/zPnOJ5Js5xKm5GMNOyCEmRQtAgt6LaINkHSuiiyNtW+KCIIK4qCiAgsIiILBAXpRiJloKndLC9p2nhJ56ijnhnP+VsEpmaXZ/fB+7zw8X0aszGHLNJYIRLEfBSOa7lf6aAR6J0Z1aZNITanbV10eHX+qo2h9FCyaSTiKhdrxOJzW+vXpieNj4Yro+exafmtwFsgzxbs33RsXcZavK7EUQ4oF9DQEAgpsZwRKmorhxpL3u2jnYeTBd4tsmT7kcLiJb4M4mocTYDQftUrBcpV4EqE9FLT9krVnmzYSSvlHgJsyN2bVVy4uJA1C/LRheenOHU5BQpAadjxcVLMuVrnni8Xwqet55i7tRtFT7epoZil/pc3/a/V+ns5iqXsEnNC+nLLCVPXVzPrQWaiFFR23kcmxjFC5ApH2OLTWB3HG4p40lP2DxvOvD3EzfZzhOMteHQMkSDQdENhe/s58WkXD3ov/sFVnGot4k7fZXTfBIau0DWUUP30+A3wJYDfhOt9RykfuDJNniDOtfBhqqKlpPrB8EGigniYThGppcIclfj9GoYuSTcyeWaV8mLoLgCucqgYuEpD9DFpxnyEDil+iduOPfKBxzLWR7OeyrbslfMWpSYvwC8CpOtZuCpOzI3SPl5Pm12PAmLaGMkenVjYoelq/NJoC7clYFvveeUJjm/PDAaSlporCPpyCBo5JMkAQpNI4cEDeGI2Pd1hXt+KVHSVcRCISQDX5lt3FWXDfF/mZnzMVr4uND2C4+0hwkc6xqppHnxKfVO9XX02eq6jjAPA6OQrT0EzF7IpuJEdaXnkmQFSHAd3sIOu7pfUdFbzkBjvpgl/uXoAMAEXiABDs4V+APcpNPRFq7koAAAAAElFTkSuQmCC'></img></a>&nbsp;&nbsp;&nbsp;</td>";	
	downbar.innerHTML+="<td id='ad'><a href="+CzT+"><img title='CzTorrent' width='20' src='data:application/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAACufzBIrHwt56p5Kv+ndyf/pXQk/6NxIf+hbh//n2wc/51pGv+bZxf/mWUV/5hiE/+WYBH/lV4P/5NdDeeSWwtIsIIz5K5/MP+sfC3/qnkq/6Z2J/+dbiL/m2sf/5loHf+XZhv/lWQZ/5NiFv+YZBX/mGIT/5ZgEf+VXg//k10N5LOFNv+wgjP/rn8w/6N2K/+hcyj/tZ6Q/8zM///MzP//zMz//8zM//+wl4r/k2IW/5FgFP+YYhP/lmAR/5VeD/+2iTr/s4U2/6d7MP+1ik7/98zM/9W6wP+ng1H/nW4i/5trH/+jfEr/wbjR/8zM//+ifVD/k2EU/5hiE/+WYBH/uY4+/7WIOv+qfjP/98zM/82ie/+jdiv/oXMo/55xJf+dbiL/m2sf/5loHf+iekn/wbfR/5NiFv+ZZRX/mGIT/7ySQ/+whzv/0aaA/+e8rf+nezD/98zM//bMzP/izOX/zMz//51uIv/MzP//mWgd/550Of+XZRn/m2cX/5llFf/Alkf/sotA//fMzP+8kVX/qn4z/7eLT//2zMz/tIdL/6FzKP+ecSX/zMz//5trH/+ebB//n2wc/51pGv+bZxf/w5pL/7aOQ//3zMz/sIc7/62CN/+qfjP/t4tP//bMzP+0jFD/oXMo//////+dbiL/o3Eh/6FuH/+fbBz/nWka/8aeT/+5kkf/98zM/7KLQP+whzv/98zM//fMzP/86Oj////+/6N2K///////nnEl/6V0JP+jcSH/oW4f/59sHP/JolP/vJZL//fMzP/Dml7/sotA/7CHO/+tgjf/qn4z/6d7MP+3lFj//////7SPU/+ecSX/n28j/6NxIf+hbh//zKZX/7+aT//ZsIr/6sCx/7aOQ//s1cb///7+////////////////////////////7OPU/55xJf+ldCT/o3Eh/86pWv/KpVb/v5pP//jNzv/ZvJb/to5D/7KLQP+whzv/rYI3/6p+M/+nezD/xal5//////+hcyj/p3cn/6V0JP/RrF3/zqla/8KeU//LqW3///////Hp2v/FpWn/sotA/7CHO/+9m1//7uXW/+3l1v/Ru5T/o3Yr/6p5Kv+ndyf/069g/9GsXf/OqVr/wp5T/8yucv/dyaP//////////////////////+TWvv/JrX3/p3sw/61+MP+sfC3/qnkq/9SxYufTr2D/0axd/86pWv/Io1X/v5pP/7yWS/+5kkf/to5D/7KLQP+whzv/r4Q4/7OFNv+wgjP/rn8w/6x8LefWs2Q/1LFiydOvYP/RrF3/zqla/8ymV//JolP/xp5P/8OaS//Alkf/vJJD/7mOPv+2iTr/s4U2/7CCM8mufzA/gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=='></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ae'><a href="+TPB+"><img title='The Pirate Bay' width='20' src='data:application/ico;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA='></img></a>&nbsp;&nbsp;&nbsp;</td>"; 
	downbar.innerHTML+="<td id='af'><a href="+KAT+"><img title='Kick Ass Torrents' width='20' src='data:application/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeBk/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAAAC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9UkKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Smtf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv////////////////////////////////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn//////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9nobL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA=='></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ag'><a href="+TRZ+"><img title='Trezzor' width='20' src='data:application/ico;base64,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'></img></a>&nbsp;&nbsp;&nbsp;</td>"; 
	downbar.innerHTML+="<td id='ah'><a href="+TL+"><img title='Torrentleech' width='20' src='data:application/ico;base64,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'></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='ai'><a href="+TT+"><img title='Titulkari' width='20' src='data:application/ico;base64,AAABAAEAICAAAAEACACoCAAAFgAAACgAAAAgAAAAQAAAAAEACAAAAAAAAAQAABILAAASCwAAAAEAAAABAAADA0wAAwNNAAMDTwADA1QAAwNXAAQEVAADA1sADw9VABkZWgADA2AAAwNiAAMDZwADA2kAAwNvAAMDcgADA3cAAwN5AAMDfgAfH3YAPj5qADU1egA1NXwANTV9AD4+egBbW1sAXFxcAF1dXQBeXl4AX19fAENDcwBERHQAR0d8AGFhYQBkZGQAaGhoAG1tbQB0dHQAfHx8AAMDgQAEBIUAAwOJAAMDjgAEBIgABASKAAQEjgAEBI8AAwOQAAMDkgADA5UABASRAAQEkgAEBJQABASVACIijgBdXYUAX1+FAFhYpwBqaowAenqIAHt7jAB+fpcAf3+WAGNjswB/f6AAf3+iAH5+pQCFhYUAhoaGAIeHhwCIiIgAj4+PAICAmwCCgp8AkJCQAJKSkgCUlJQAlZWVAJaWlgCXl5cAmpqaAJubmwCcnJwAnp6eAIODogCDg6QAg4OlAIODpgCOjrIAjo6/AJCQpgCTk60AmZmqAJqaqACQkLcAkpK7AKCgoAChoaEAp6enAKioqACpqakAq6urAKysrACtra0Arq6uAK+vrwCmprUAo6O4AKOjvACurrgAsLCwALKysgCzs7MAtLS0ALW1tQC3t7cAtLS5ALa2vgC3t74Aubm5ALq6ugC7u7sAvLy8AL29vQC+vr4Av7+/AI+PwQCPj8QAk5PAAJOTxgCUlMIAlJTEAJSUxgCenskAnp7KAMDAwADBwcEAwsLCAMPDwwDExMQAxcXFAMbGxgDHx8cAyMjIAMnJyQDKysoAy8vLAMvLzQDMzMwAzc3NAM7OzgDPz88Az8/XAM7O3gDQ0NAA0dHRANLS0gDT09MA1NTUANXV1QDW1tYA19fXANjY2ADZ2dkA2traANvb2wDc3NwA3d3dAN7e3gDf398A4ODgAOHh4QDi4uIA4+PjAOTk5ADl5eUA5ubmAOfn5wDo6OgA6enpAOrq6gDr6+sA7OzsAO3t7QDu7u4A7+/vAPHx8QDy8vIA8/PzAPT09AD29vYA9/f3APn5+QD7+/sA/Pz8AP39/QD+/v4A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwL64tK2kmpOHe3NwZmZmY2NmZmZvdnuLj56orbW8vsCxonlRQiUkIyIhIBwcGRwYGBwcHBwgISIjJCVDUXuisbioX0VJTE5OTk5OTk1NTU1NTU5NTU1OTk5NTElFT6S0wHlKX2Zvb29xcXFxcXFxcXFxcXFvcXFxcXFvZmBKb8StTmJ2h4uLi4uLi4uLi4uLiYyLi4uLi4yLi4uHd2NOqItieYyPj4+Pj4+Pj4+Pj4+Oj4+Pj4+Pj4+Pj4+MeWJ7hnGPk5OVk5WTlZWVk5WTlZWVkpOVk5WVk5WVk5WPdnaLi5OZmZmampqampmampp1OR0TOXWampmZmpmampWHho+PmZ6dn5+fn5+fn5+fXAcCAgIAWZ+enp6enp6emo+Mk5OioqSkoaShpKSkpJIIBQUTOzpzpKKkpKSioqSilY+XlaWoqKWoqKioqKioXAYGF6SlqKioqKWoqKioqKWZk5qepaioqamprKmpqak9BgpBqampramoqampqaitqJ6Vn5+psK2tra2wra2trT0LDFewra2tsa2trbGtra2popmfpLCysrK0srKysrKySA0OXrKysrKysrSysrK0sq2knqSosrW1tbW1tbW1tbJIDxBetLW1tLS0tLS0tLS0sqifpKi0tbW1tbW1tbW1tVMRJn+1tbW1uLW1uLW1tbi0qKSkqLK1urW1tbq1tbW6VicngbW4tbW4tbW1urW6tbKopKSosrW1tbq1tbW6urVUKy2DuLi4urW1urW1tbq1tKifpKiyurW6tbq1urW1tVYtMoC1tbi6tbW6urW6tbW1qKSkqLW1tbW1tbW1tbW6VjI0gLW4tbW1tbW1tbW1tbKppKSosrW1tbW1tbW1l4Q4NDQ+hYWEmLW1tbW1tbW1sqifn6iytbW1tbWytbJaKTAwMDAwMDCAsrWytbWytbWtqJ+kpK2ysrKysrKysmkUEi8wNRYWFmuysrKysrKysq2ln5+kqa2yrbKysq2ysq1WKS99sLCwrbKysrKysrGxraian6StrbKtsq2yrbKtrT8oKX2trbGtrbGtra2trbKppJqfn6mtra2tra2tra2tbDYfaq2tra2tra2tra2tramkmqSkqa2tra2trampra2pramtra2tra2tra2tra2tqaSframpra2tqa2tra2tra2tra2tramtra2tra2tra2pqa26qamtra2tra2tra2tra2tra2pra2tra2tra2trampusSyra2tsq2tra2tra2tsa2tra2yra2tra2tsa2tra3ExMSysrKysrKysrKysrKysrKysrKysrKysrKysrGyxMTExMS9urW1tbq1tbq1tbW6tbW4tbi1uLW4tbW6vsTExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='al'><a href="+WB+"><img title='Warez-BB' width='20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAC3UlEQVR42l2SW0hTcRzHf///2c4uZztbXhvZxUrECwWF3UAjxCKotIgiulvZQxkRQQQRFFYERU8RQQ89GEEPXjLImdGEUpPumqtlzcsuus25s/Ts7Jz/+f97SCT6PH/g+/D5IviHnJyc6pqd5eUVS/KXAoD/16+uLk/b05ZoNAr/gTE+dPjo9x8/KZkmUq860aiNPyJSHyUp7zff/gMH50z017524+b5c/WQ7NSn3IwolAKjDBgDbDVmV+N5FTdv3bl08QIAcABQe/xEw5XLLPpQn/YicwkWyjh7GRZWYlM+A4sa62FKdOPWurFg8NPHj2hBXp7b3ZmXIRl5G28vwByHEJpdR4gxxqiuTPbrlBuN85urKrna2mObKlZjZSjNlzxpaX/d9xkQIKMxparBeOLD4NDoSDDLtSwd6jZlLI/Gprj6+rMLxRCkAkMRsffdp8rydWOhib4B30g0ziNwOWxv+j7bBYt5/EWaWQifiXPm53LKMEr67Dbr5ORUU1tHccFiKTqZDE/k2izuVz2RSMzEAQn59OmIy+XCOtFVhaCE3wzJk0f2mnnDs/ZXWlr5LUkdnl5FntlTXWmcGdNiE7pGGWU4HA7HlUyqEBT0qJpGCLEJFr/fPzw8goEmJUknRBlsT8mapJkDwYBh8OtA3vzybI03jHl044qyVaVO0Y4AeN64LH/RogW5qXEf/daNBWeSOvv7O3FrS5Mj0zWdVQWyLHgfmwxITskZTptDFGR5xgCa3vUAZtK0cJvVZm972srF43FRdKyp2seSMe7nWzNTrAUbHA6HKIqCyUA99/XQD2Hdrsy1uxsbG93tzzkAeP/+3fLCosVrq6nZTrwelAjYC9ebMJ1qu61EAvO21IllNR2dL683XKWUzkblef7U6TPbtu+w8piEvcBhPa1QbLYuLJbTpLm56f69u6qqzp5vjqKiou07aopLS51OJwAkEtLXgS+tzc0+3/c55w8232iz0qRaPQAAAABJRU5ErkJggg=='></img></a>&nbsp;&nbsp;&nbsp;</td>";
	downbar.innerHTML+="<td id='aj'><a href="+YT+"><img title='Youtube Trailer' width='20' src='data:image/png;base64,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'></img></a>&nbsp;&nbsp;&nbsp;</td>";
//	downbar.innerHTML+="<td id='aj'><a href="+FO+"><img title='Sleduj Film Online na kinotip.cz' width='20' src='data:application/ico;base64,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AP8AAAD/PDw8/zw8PP/y8vL/8vLy////////////kZGR/5GRkf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+goKD/oKCg////////////goKC/4KCgv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP88PDz/PDw8//Ly8v/y8vL///////////+RkZH/kZGR/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////+AgID/gICA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8KCgr/CgoK/8fHx//Hx8f////////////Kysr/ysrK/wgICP8ICAj/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////4CAgP+AgID/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/woKCv8KCgr/x8fH/8fHx////////////8rKyv/Kysr/CAgI/wgICP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////f39//39/f/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/mpqa/5qamv///////////8/Pz//Pz8//JCQk/yQkJP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////9/f3//f39//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+ampr/mpqa////////////z8/P/8/Pz/8kJCT/JCQk/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////4CAgP+AgID/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9jY2P/Y2Nj////////////+vr6//r6+v8yMjL/MjIy/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////gICA/4CAgP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/2NjY/9jY2P////////////6+vr/+vr6/zIyMv8yMjL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3////////////c3Nz/3Nzc/zc3N/83Nzf/AAAA/wAAAP8AAAD/AAAA/0FBQf9BQUH/9/f3//f39////////////2dnZ/9nZ2f/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////9zc3P/c3Nz/Nzc3/zc3N/8AAAD/AAAA/wAAAP8AAAD/QUFB/0FBQf/39/f/9/f3////////////Z2dn/2dnZ/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d///////////////////////t7e3/7e3t/1xcXP9cXFz/GBgY/xgYGP/g4OD/4ODg////////////kpKS/5KSkv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3//////////////////////+3t7f/t7e3/XFxc/1xcXP8YGBj/GBgY/+Dg4P/g4OD///////////+SkpL/kpKS/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////9LS0v/S0tL/9fX1//X19f/29vb/9vb2/7q6uv+6urr////////////FxcX/xcXF/xISEv8SEhL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////0tLS/9LS0v/19fX/9fX1//b29v/29vb/urq6/7q6uv///////////8XFxf/FxcX/EhIS/xISEv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////91dXX/dXV1/05OTv9OTk7/5ubm/+bm5v///////////+Tk5P/k5OT/ERER/xEREf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////3V1df91dXX/Tk5O/05OTv/m5ub/5ubm////////////5OTk/+Tk5P8RERH/ERER/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////f39//39/f/8AAAD/AAAA/zU1Nf81NTX/8PDw//Dw8P///////////42Njf+NjY3/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////9/f3//f39//wAAAP8AAAD/NTU1/zU1Nf/w8PD/8PDw////////////jY2N/42Njf8BAQH/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////4CAgP+AgID/AAAA/wAAAP8AAAD/AAAA/zg4OP84ODj/4ODg/+Dg4P///////////6Wlpf+lpaX/CwsL/wsLC/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////gICA/4CAgP8AAAD/AAAA/wAAAP8AAAD/ODg4/zg4OP/g4OD/4ODg////////////paWl/6Wlpf8LCwv/CwsL/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////+AgID/gICA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ykpKf8pKSn/0tLS/9LS0v///////////729vf+9vb3/ExMT/xMTE/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/nZ2d/52dnf///////////4CAgP+AgID/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/KSkp/ykpKf/S0tL/0tLS////////////vb29/729vf8TExP/ExMT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+dnZ3/nZ2d////////////gICA/4CAgP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/yAgIP8gICD/zMzM/8zMzP///////////7CwsP+wsLD/JSUl/yUlJf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/52dnf+dnZ3///////////+AgID/gICA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ICAg/yAgIP/MzMz/zMzM////////////sLCw/7CwsP8lJSX/JSUl/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/oKCg/6CgoP///////////4KCgv+CgoL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xMTE/8TExP/wcHB/8HBwf///////////9/f3//f39//PT09/z09Pf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+goKD/oKCg////////////goKC/4KCgv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ExMT/xMTE//BwcH/wcHB////////////39/f/9/f3/89PT3/PT09/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/5OTk/+Tk5P/8PDw//Dw8P94eHj/eHh4/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wsLC/8LCwv/t7e3/7e3t//29vb/9vb2/9zc3P/c3Nz/KCgo/ygoKP8AAAD/AAAA/wAAAP8AAAD/k5OT/5OTk//w8PD/8PDw/3h4eP94eHj/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/CwsL/wsLC/+3t7f/t7e3//b29v/29vb/3Nzc/9zc3P8oKCj/KCgo/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='></img></a>&nbsp;&nbsp;&nbsp;</td>";
    
	downbar.innerHTML+="</tr>";
	maini[0].parentNode.insertBefore(downbar, maini[0]);
}	}


downBar();

}