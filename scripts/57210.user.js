// ==UserScript==
// @name           SU CopyCat
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Easily copy contents of anyone's blog post
// @include        http://*.stumbleupon.com/*
// ==/UserScript==


						 
$ = window.wrappedJSObject.$;

var txt = $('<div id="copycat_div" style="background:rgba(255,255,255,0.98);display:none;padding:10px; position:fixed;bottom:0px;left:0px;right:0px;"><button id="copycat_close" style="float:right;">x</button><textarea id="copycat_text" style="margin: 10px;background:transparent;font-size:12px;width:90%;color:black !important;" /></div>');
$('body',document).append(txt);
$('#copycat_close').bind('click',function(e){ txt.hide(); });

if( window.wrappedJSObject.stumbler )
$('#blogEntries > dl.dlBlog > dt.nomargin > span.cmds ')
    .prepend('<a class="copycat_link" style="cursor:pointer;">copy</a>&nbsp;&nbsp;&nbsp;');
else {
$('#blogEntries > dl.dlBlog > dt.nomargin  ')
    .prepend('<span class="right cmds pdgRight" ><a class="copycat_link" style="cursor:pointer;" >copy</a>&nbsp;&nbsp;&nbsp;</span>');
}
  

    
      $( '#blogEntries > dl.dlBlog' ).bind('click', function( e ) {
          if( e.target.className == 'copycat_link' ) {
                html = $( 'dd.nothumb' , this ).attr('innerHTML');

                  $('#copycat_text')
                    .attr('value',processHTML( html ) );      
                       $('#copycat_div').show();
                      height = $('#copycat_text')[0].scrollHeight;
                      if( height<250)
                        $('#copycat_text').css( { height:height+'px' } );
                       else  
                         $('#copycat_text').css( { height:'250px' } );
            }
      
      });


function processHTML( string ) {
    tempDiv = $('<div>');
      tempDiv.html( string );
      
      var embeds = $( '.embedded_object', tempDiv );

      for(i=0;i<embeds.length;i++) {

        embeds[i].innerHTML = embeds[i].innerHTML.replace( /\</g , '[')
          .replace( /\>/g , ']');
      }
      
      res = tempDiv[0].innerHTML.replace( /\<br\>/g , '\r' );
  
  return res;
}