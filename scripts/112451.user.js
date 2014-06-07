// ==UserScript==
// @name           EmbedWidgets
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Allows viewing and embedding of flash widgets on StumbleUpon Pages
// @author         http://onyxstone.stumbleupon.com/
// @include        http://*.stumbleupon.com/*
// @version        0.0.2
// @license (с) ONYXSTONE (http://onyxstone.stumbleupon.com/)
// ==/UserScript==


var $ = unsafeWindow.$;
var txt;

unsafeWindow.EmbedWidgets = {};
unsafeWindow.EmbedWidgets.embeds = function( p ) {
  if( p === 'on' ) {
  
  

    var eo = $( 'li.embedded_object');
    var eo2 = $( 'li.eo');
    
    for (var i = 0; i<eo.length; i++) { 
     a = $( eo[i] );
     if( !a.hasClass('widgeton') ) {
         a.html( this.translateBack( a.html() ) ).show()
         .addClass('widgeton');
     }
    }
    
    for (var ii = 0; ii<eo2.length; ii++) { 
     a = $( eo2[ii] );
     if( !a.hasClass('widgeton') ) {
         a.html( this.translateBack( a.html() ) ).show()
         .addClass('widgeton');
     }
    }

    
     $('li.embedded_object_placeholder').hide();
     $('li.eop').hide();
    

  
  }

}

unsafeWindow.EmbedWidgets.translateBack = function( txt ) {

var r1 = txt.replace(/\[script/g, '');
r1 = r1.replace(/\[\/script\]/g, '');
r1 = r1.replace(/\[iframe/g, '');
r1 = r1.replace(/\[\/iframe\]/g, ''); 
r1 = r1.replace( /\[/g, '<');
r1 = r1.replace( /\]/g, '>');
return r1;

}


unsafeWindow.EmbedWidgets.embeds('on');











if(  $('a.addSite')[0]  ){

  
  
 main = $('<div id="ew-main" style="display:none;" ><br><textarea spellcheck="false" id="ew-txt" style="background:rgba(0,0,0,0.8);color:#FF6600;font-family:Courier New, monospace; text-shadow: #FF6600 0px 0px 5px;width:100%; min-height: 200px; overflow: hidden; display:block;" /><br><button class="btnWhite" id="ew-btn" >OK</button><span id="ew-info">        Paste widget code here ^ and click the button</span><br><br><div id="ew-preview" style="border: 1px solid;padding:20px 0px;"><center>Preview</center></div><br><button class="btnWhite" id="ew-post" >Post this to blog</button><br></div>').insertAfter( '#navSecondary' );
 var btn = $('<li class="embedwidgets" style="" >EmbedWidgets</li>').appendTo( '#navSecondary ul.left' ).bind('click',function(e) { main.toggle(); } );
  

  
  txt = $('#ew-txt');
  txt.adjust = function adjust( ) {
      this.css( { height : this[0].scrollHeight + 'px' } );
  }
  
  
  $('#ew-btn').bind('click',function( e ) {
      str = txt.val();
      txt.val( translate( str ) )
      .css( { color : 'lime' ,
            textShadow : 'lime 0px 0px 2px' } )
            .adjust();
    
      $('#ew-preview').html( txt.val() );
      $('#ew-info').html( '        Copy widget code ^ ' );
      unsafeWindow.EmbedWidgets.embeds('on');

  }); 
  $('#ew-post').bind('click',function( e ) {
      $('a.addSite').click();
      $('#addContent textarea').val( txt.val() );
      $('#addContent').find('a.submit').click();
      unsafeWindow.EmbedWidgets.embeds('on');

  });
}





function translate( str ) {


//eop = embedded_object_placeholder
//eo = embedded_object

if( !str.match( 'class="embedded_object"' ) 
    && !str.match( 'class="eo"' )) {
str = str.replace( /</g, '[').replace( />/g, ']');
//str = "<ul>" +
//"<li class=\"embedded_object_placeholder\">To view this widget, please install <a href=\"http://userscripts.org/scripts/show/38500\">EmbedWidgets</a> script</li>"+
//"<li style=\"display: none;\" class=\"embedded_object\">"+
//str + "</li></ul>";
str = 
"<li class=\"eop\">To view this widget, please install <a href=\"http://userscripts.org/scripts/show/38500\">EmbedWidgets</a> script</li>"+
"<li style=\"display: none;\" class=\"eo\">"+
str + "</li>";
}

return str;
}