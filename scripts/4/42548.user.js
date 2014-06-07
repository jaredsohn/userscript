// ==UserScript==

// @name           Stumbleupon Cumulus Plugin
// @namespace      http://onyxstone.stumbleupon.com/
// @author         http://onyxstone.stumbleupon.com/
// @description    Stumbleupon adaptation of Wordpress Cumulus Plugin by Roy Tanck
// @include        http://*.stumbleupon.com/*
// @license        GNU GENERAL PUBLIC LICENSE
// @version        0.0.3

// ==/UserScript==



/*
*** This is the adaptation of 
***WP-Cumulus Wordpress Plugin 
*** (  http://wordpress.org/extend/plugins/wp-cumulus/ )
* by Roy Tanck
*   (  http://www.roytanck.com/ ),
*   licensed under 
*   GNU GENERAL PUBLIC LICENSE
*/


var TAGCLOUD = 'http://onyxstone.viviti.com/files/others/tagcloud_by_roy_tanck.swf';
var $        = unsafeWindow.$;
var jQuery   = unsafeWindow.jQuery;

var Color = {

RGBtoHex : function(rgb) {
  var rgb2 =/\d+/g;

  var cc = rgb.match(rgb2);


  return Color.toHex(cc[0])+Color.toHex(cc[1])+Color.toHex(cc[2])
},

toHex : function(N) {
 if (N==null) return "00";
 N=parseInt(N); if (N==0 || isNaN(N)) return "00";
 N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
 return "0123456789ABCDEF".charAt((N-N%16)/16)
      + "0123456789ABCDEF".charAt(N%16);

 }
 }
 
var lists = $('#navSecondary > ul.left > li.hasChild > ul > li');

if( lists[0] ) init();


function init() {

lists = jQuery.makeArray( lists );

str ='';

firstnum = parseInt( $( lists[0] ).find('span.right').text() );


for( var i=0; i< 30 ; i++ ) {
if( i >= lists.length ) break;
l = $( lists[i] );
link = l.find('a').attr('href');
name = l.find('span.right')[0].nextSibling.textContent;
num  = l.find('span.right').text();

str += "<a+href='"+link+"'+rel='tag'+style='font-size:+"+ 20*Math.sqrt( (1/firstnum)*num  ) +"pt;'>" + name + "</a>\n";


}

str = '<tags>'+str+'</tags>';



//bgcolor = window.getComputedStyle( document.body , '' ).backgroundColor;
//bgcolor = '#'+Color.RGBtoHex( bgcolor );
bgcolor = "transparent";
tcolor = window.getComputedStyle( $('.listLi')[0] , '' ).color;
tcolor = '0x'+Color.RGBtoHex( tcolor );
hicolor = window.getComputedStyle( $('.listLi a')[0] , '' ).color;
hicolor = '0x'+Color.RGBtoHex( hicolor );



$('<div class="box borderBottom"  id="cumulus"><h3>Tag Cloud</h3></div>')
 .insertAfter( $( 'div#stats' ) );


tags =  escape( str );



obj = $('<object id="flashobj" style="margin-left:-20px;" width="200" height="200" data="" type="application/x-shockwave-flash" ><param value="" id="movieparam" name="movie"/><param value="' + bgcolor + '" name="bgcolor"/><param value="always" name="AllowScriptAccess"/><param value="transparent" name="wmode"/><param value="tcolor=' + tcolor + '&tcolor2='+ hicolor + '&hicolor='+ hicolor + '&tspeed=150&distr=true&mode=both&tagcloud=' + tags +'" name="flashvars" /></object>').appendTo('#cumulus');

t = window.setTimeout( setParams , 40 );

}
 
 
 





function setParams() {

$('#flashobj').attr('data',TAGCLOUD);
$('#movieparam').attr('value',TAGCLOUD);
}



