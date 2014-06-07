// ==UserScript==
// @name           Customize Country
// @namespace      onyx.stone.su@gmail.com
// @description    Customize Country
// @include        http://www.stumbleupon.com/settings/
// ==/UserScript==


var $ = unsafeWindow.$;
//var console= unsafeWindow.console;


var defaultC = $( '#country' ).attr('selectedIndex');
var newC =  '';
var savedC = GM_getValue('country','');

$( '#country' ).after( '<br /><br /><label>Custom Country</label><input type="text" id="customcountry" /><input type="button" id="okc" value="OK" /><input type="button" id="clearc" value="x" />' ).append('<option id="cc" value="' + savedC  + '">' + savedC + '</option>');

$( '#clearc' ).bind('click',function( ) {
   $( '#customcountry' ).val('');

   clear();
});
 $( '#okc' ).bind('click',function( e ) {
    newval= $( '#customcountry' ).val();
    
       newC= newval;
    if( newval.length  > 0 ) $('#cc' ).val( newval ).text( newval ).attr('selected',true); 
    else clear();
},false);

if( savedC.length >0 )
$( '#customcountry' ).val( savedC );



$( '#prefsForm1' )[0].addEventListener('submit', function( ) {
      set(newC);
},false);

if( $( '#customcountry' ).val().length >0 ) {


$( '#country' ).attr('selectedIndex',$('#cc').attr('index')) ;
}
else clear();


function clear() {
   $('#cc' ).val( '' ).text( '' );
   $( '#country' ).attr('selectedIndex',defaultC) ;
}


function set(newval) {
    GM_setValue('country', newval );
}


