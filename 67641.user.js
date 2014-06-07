// ==UserScript==
// @name          Superfavcolor
// @author	  Dollr
// @description   passt den Orange-Part des Favicons dem Farbschema an
// @version       0.0.2
// @include       http://www.supertopic.de/*
// @include       http://supertopic.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



var fo=<>
data:image/ico;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAA
AAAAAAAAAAAAAAAEAAAAAAAAAAAZv8A////ANDQ0ADy8vMAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARERERERERERBEREREzERFEEiIiIiIyI0QzMzMzMTMzRBIiI
iIiMiFEMzMzMzEzMUQSIiIiIjIjRDMzMzMxMzNEEiIiIiIyI0QTMzMzMTMzRBIiIiIiMiNEERERERER
EUQ0REREREREREREREREREREQAAABEREREREREREREREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</>.toString(),fa=[],$$$$;



function c(){

$$$$=arguments[0]||$$$$;fu=new Image();fu.src=fo;

$('body').append('<canvas id="__c" style="display:none;" height="16" width="16"></canvas>');
C=$('#__c')[0];if(!C.getContext)return;

var c=C.getContext('2d');c.drawImage(fu,0,0);c.fillStyle=('#'+$$$$);
for($$$=0;$$$<6;$$$++){c.fillRect(2,1,$$$+1,1);fa[$$$]=C.toDataURL();}
GM_setValue('supercolor',$$$$);GM_setValue('supericon',fa.join('|'));

$('#__c').remove();
if(fa[0])a();

}



function a(x){

(x=x+1||1)==6||window.setTimeout(a,2E2,x);
$('head').children('link[rel^=shortcut]').remove();
$('head').append('<link rel="shortcut icon" type="image/png" href="'+fa[x-1]+'"/>');

}



$(function(){

$$$$=$('#usercss').attr('href').substr(-10,6);
if($$$$&&$$$$!=GM_getValue('supercolor')){c();}else{fa=GM_getValue('supericon').split('|');a();}
$('#usercss').bind('DOMAttrModified',function(){c($('#usercss').attr('href').substr(-10,6));});

});

