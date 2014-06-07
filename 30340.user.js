// ==UserScript==
// @name           SU LayoutCreator
// @version        2.0.0
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Adds backgrounds to your stumbleupon page
// @include        http://*.stumbleupon.com/*
// @author         Onyxstone
// @license        (c)Onyxstone
// ==/UserScript==


$ = unsafeWindow.$;
var style = 
'#sulc .src {border:1px solid;display:block;margin:10px;padding:10px;height:100px;width:100px;font-size:9px;}'+

'#sulc fieldset {border: 1px solid;margin:10px;padding:10px;}'+
'#sulc input[name="tr"] {max-width:40px;}' + 
'#sulc input[name="color"] {max-width:70px;}';
GM_addStyle( style );




var preview = $('<div>').insertBefore('#navSecondary' );

var html = '<form id="sulc">\
<div><img src="" name="src_preview" class="src" />\
<textarea name="src" class="src" style="display:none;"/></div>\
<fieldset><legend>Color</legend>\
<input type="text" name="color" value="" />\
</fieldset>\
<fieldset><legend>Tile</legend>\
<input type="checkbox" name="tilex" value="x" checked=true />x\
<input type="checkbox" name="tiley" value="y" checked=true />y\
</fieldset>\
<fieldset><legend>Position</legend>\
<input type="radio" name="pos" value=" top left " checked=true _checked=true />\
<input type="radio" name="pos" value=" top center "  />\
<input type="radio" name="pos" value=" top right "/><br />\
<input type="radio" name="pos" value=" center left "/>\
<input type="radio" name="pos" value=" center center "/>\
<input type="radio" name="pos" value=" center right " /><br />\
<input type="radio" name="pos" value=" bottom left "/>\
<input type="radio" name="pos" value=" bottom center "/>\
<input type="radio" name="pos" value=" bottom right "/>\
</fieldset>\
<fieldset><legend>Transparency</legend>\
<input type="text" maxlength="3" value="0" name="tr"></input> %\
</fieldset>\
<button type="button" class="previewbg">Preview</button>\
<button type="button" class="savebg">Save</button>\
<button type="button" class="cancelbg">Cancel</button>\
</form>';


var div = $('<div style="display:none;" >');
if( $('#wrapperContent')[0].className.length > 0 ) {
$('<br><br>').appendTo( '#stats' );
$('<span style="cursor:pointer;">Set background</span>').appendTo( '#stats' )
.bind( 'click' , function( e ) {

      ( div.css( 'display' ) == "none" ) ? open() : close( );
      
});

div.appendTo( '#stats' ).html( html );
}


$('#sulc img.src').bind( 'click' , function( e ) {
   $('#sulc textarea.src').show();    
   $(e.target).hide();   

});
$('#sulc textarea.src').bind( 'blur' , function( e ) {
   $('#sulc img.src').show().attr( 'src' , e.target.value );    
   $(e.target).hide();   

});
$('#sulc .previewbg').bind( 'click' , function( e ) {
   
  d = getData(); 

   preview.html( d );

});
$('#sulc .cancelbg').bind( 'click' , function( e ) {
   

   close();
   
});

if( $('#sulc .savebg')[0] )
$('#sulc .savebg')[0].addEventListener( 'click' , post , false );


$('#sulc input[name="pos"]').bind( 'click' , function( e ) {
   $('#sulc input[name="pos"]').attr('_checked' , false );
   $( e.target ).attr('_checked' , true );
});


function close(){
div.slideUp( 'slow' );

$( 'ul.listStumble ul.bg' ).css( { position: ''}).html( '' );
preview.html( '' );
}
function open(){
div.slideDown( 'slow' );

$( 'ul.listStumble ul.bg' ).css( { position: 'static'})
       .html( '<button type="button" style="background:yellow;color:black;border:2px dashed orange;padding:20px;opacity:0.5;">Old Background - remove before installing a new one</button>' );

}

function getData() {

         var string = '<ul class="bg" style="background: ';
         
         color = $( '#sulc input[name="color"]' ).val();
         if( color && color.length > 0 ) string+= color;
         
         string +=' url(\'' + $('#sulc img.src').attr('src') + '\')';
         
         tilex = $('#sulc input[value="x"]').attr('checked');
         tiley = $('#sulc input[value="y"]').attr('checked');

         //alert( tilex + tiley )
         if( !tilex && !tiley )     repeat = " no-repeat ";
         else if( tilex && !tiley ) repeat = " repeat-x ";
         else if( !tilex && tiley ) repeat = " repeat-y ";
         else if( tilex && tiley ) repeat = " ";
         
         if( repeat )string = string + repeat;
         
         
         pos = $('#sulc input[name="pos"][_checked="true"]').val();
         
         if( pos )string = string  + pos;
         
         opacity = parseInt( $( '#sulc input[name="tr"]').val() );
         
         if( opacity > 0 )
         string = string + '; opacity: '+( 100 - opacity )/100;
         
         string +=';" />';
         
         return string;
}


function post( ) {

         var data = getData();
         preview.html( data );
         
         var bg = data + '\n\n' + data.replace( /</g , '[' ).replace( />/g , ']' );
         
         var postdata = 
         'review=' + bg +
         '&title=Background' + 
         '&keep_date=0&sticky_post=0&commentid=0&new_post=1&blog_post=1' +
         '&token=' + $('#wrapperContent')[0].className;


          GM_xmlhttpRequest({
            method: "POST",
            url: "http://www.stumbleupon.com/ajax/edit/comment",
            data: postdata,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
              div.slideUp( 'slow' );
            }
          });
          
          
}



