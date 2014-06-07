// ==UserScript==
// @name          Superpostpreview
// @author	  Dollr
// @description   zeigt - bei Klick - den aktuellsten Themenbeitrag in der Übersicht an
// @version       0.0.4
// @include       http://www.supertopic.de/forum*
// @include       http://supertopic.de/forum*
// @exclude	  http://www.supertopic.de/forum/*.html*
// @exclude	  http://supertopic.de/forum/*.html*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==





var a,O,L,e='<img src="http://static.supertopic.de/images/emoticons/',eE='.gif"/>';



function _spp(o){

if(a)return;
a=rss=true;

o2=o.children('.threadtitle').children('h4').children('a');
u=o2.attr('href').replace(/#.*$/,'');

if(!o2.html().match(/^(Privat:|Geheim:|Wichtig:|Gelöscht:)/)){u=u.replace(/\-\d+\.html$/,'/rss');}
else{rss=false;}



GM_xmlhttpRequest({

 method:'GET',
 url:u,


 onload:function(r)
 {

  r=r.responseText.replace(/[\r\n]/g,'');

  if(rss){
   r=r.match(/content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded/)[1];
  }
  else{
   r=r.match(/<div id="pdiv_\d+" class="posting">(.*?)<\/div>/g);r=r[r.length-1];
   if(r.match(/<div/))r=r.replace(/.*?none;">/,'');
   r=r.replace(/<span.*?<\/span>/g,'').replace(/<img.*?static.supertopic.de\/.*s\/(.*?).gif.*?>/,':$1');
  }


 r=$.trim(r.replace(/<(?!\/?a|\/?blockquote|\/?strong|img|\/?s).*?>/g,' ').
 replace(/<\/blockquote>/g,'</span> ').replace(/<blockquote>/g,'<span style="background:#e5e5e5;"> ').replace(/<img.*?>/g,'<span style="background:#000;margin-top:-10px;padding-bottom:10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>').replace(/\[ Text nur.*?\]/g,'<strong>&nbsp;***&nbsp;</strong>').
 replace(/:(ja|lol|metal|rockon|haha|five|trippel|hammer|lol2|doppelhammer|love|cheer|gumbo|verlegen|asian|starr|umarm|tuse|danke|honks|sing|lol3|zunge|jump|angst|freuen|bigsmile|huhu|party|heul|lol4|nene|hm|schimpf|peng|kotz|pah|hammer2|smoke|werber|toni|bigass|schonklar|laber|blablabla|nein|tuschel|ouw|vogel|stumm|rafftnix|traurig|brain|eek|debil|planlos|pee|ohno|zzz|kopfstand|beam)/g,(e+'$1'+eE)).
 replace(/:\-\)/g,(e+'smile'+eE)).replace(/:\-\(/g,(e+'traurig'+eE)).replace(/:hörthört/g,(e+'hoerthoert'+eE)).replace(/:\-?D/g,(e+'freuen'+eE)).replace(/;\-\)/,(e+'zwinker'+eE)));


 if(!r){a=false;return;}

 o.animate({height:95},{duration:150,complete:function()
 {
  o.append('<div id="spp" style="margin-left:5px;margin-right:5px;padding:0 0 5px 5px;font:21px/25px arial;overflow:hidden;white-space:nowrap;"><br/><span>'+r+'</span></div>');
  if($('#spp span').width()>730){window.setTimeout(function(){$('#spp span').eq(0).animate({marginLeft:-($('#spp span').width()-729)},$('#spp span').width()*5);},750);}a=false;}
 });


 }


});



}






$(function(){


$('.markthread,.markthread2').live('click',function(e){

if(e.target.nodeName.match(/(a|span)/i))return;
if(O&&O.height()>33)O.animate({height:33},{duration:2E2,queue:false,complete:function(){$('#spp').remove();}});
if(!a)O=$(this);
if(O.height()==33&&!a)_spp(O);

});



});

