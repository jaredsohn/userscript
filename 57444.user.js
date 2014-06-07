// ==UserScript==
// @name           Edit Forum Posts
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Edit Forum Posts
// @include        http://*.group.stumbleupon.com/forum/*
// @author         onyxstone
// ==/UserScript==

var $ = window.wrappedJSObject.$;
var myname;
var myurl;
var postnum;




forum_main = $('td.lightbg[valign="top"]')[0]
  $( forum_main ).addClass('forum_main');
  
$( '.forum_main > table > tbody > tr' ).addClass('post');

$('.post > td[width="100%"]').addClass('post_right_container');
$('.post_right_container td[colspan="2"]').addClass('post_content');




window.wrappedJSObject.edit_post = function( postnum ) {
     if( postnum.target) postnum = postnum.data;

    $( '#postEdit_' + postnum ).parent().show();
    container = $( '#postEdit_' + postnum ).parents( '.post_right_container' );
    var html = $( '.post_content' , container )[0].innerHTML;
    
    $( '#postEdit_' + postnum )[0].data.value = processHTML( html );
    
    
    $( '.post_content' , container ).attr('_originalHTML' , encodeURI( html ) )
        .attr('postnum' , postnum );
    

}



getMyName();
isMod();




function getMyName() {
    var regexp =  /http\:\/\/(.+)\.stumbleupon\.com\/prefs\/interests/;
    footer = $('div.footer');
    myname = footer.html().match( regexp )[1];
    myurl = 'http://'+myname+'.stumbleupon.com/';

}

function isMod() {




   delposts =  $( 'a[href^="javascript:delete_post"]' );

   
for( i=0;i<delposts.length;i++ ) {

prev = delposts[i].previousElementSibling;

if( prev.href == myurl ) {

postnum = delposts[i].href
    .match(/javascript\:delete\_post\(\'(\d+)\'\)/)[1];
    
    
$( delposts[i] ).after('&nbsp;&nbsp;&nbsp;<font style="font-size: 15px;">&#9998;</font>&nbsp;<a href="javascript:edit_post(\'' 
+ postnum + '\'); "><span class="mini">Edit post</span></a>');

container = $( $( delposts[i] ).parents('.post_right_container')[0] );
container.attr('postnum' , postnum );
          
formHTML = 
  '<br><div style="width:100%;min-height:250px;display:none;">' +
  '<form id="postEdit_'+  postnum + '" postnum="'+  postnum + '" class="postEditForm" >' +
  '<input name="edit" type="hidden" value="' + postnum + '" />' +
  '<textarea name="data" style="width:100%;min-height:200px;" /><br><br>' +
  '<input type="button" name="subm_btn" class="btnGreenSm" value="Submit" />' +
  '&nbsp;&nbsp;' +
  '<input type="button" name="prev_btn" value="Preview" class="btnGreenSm" />' +
  '&nbsp;&nbsp;' +
  '<input type="button" name="canc_btn" value="Cancel" class="btnGreenSm" />' +
  '</form></div>';

 

container.append(formHTML);
    
      
          
}
}

addEvents();

}






function addEvents() {

    if( $( '.postEditForm' ).length > 0 ) {
    subm = $( '.postEditForm input[name="subm_btn"]' );
      for(i=0;i<subm.length;i++)
         subm[i].addEventListener( 'click' , postRequest , false );
      
      
      $( '.postEditForm input[name="canc_btn"]' ).bind( 'click' , cancelEdit );
      $( '.postEditForm input[name="prev_btn"]' ).bind( 'click' , previewPost );
   }
}


function previewPost( e ) {
    form = e.target.form;
    postnum = form.getAttribute('postnum');
    container = $( '#postEdit_' + postnum ).parents( '.post_right_container' );

    $( '.post_content' , container )
        .html( processHTMLBack( form.data.value ) );
    

}


function processHTML( string ) {
    tempDiv = $('<div>');
      tempDiv.html( string );
      
      var embeds = $( '.embedded_object', tempDiv );

      for(i=0;i<embeds.length;i++) {

        embeds[i].innerHTML = embeds[i].innerHTML.replace( /\</g , '[')
          .replace( /\>/g , ']');
      }
      
      var spanminis = $('.mini' , tempDiv );

      for(i=0;i<spanminis.length;i++) {
        $( spanminis[i].parentNode ).empty().remove();
 
      }
      
     result = tempDiv[0].innerHTML.replace( /\<br\>/g , '\r' );
      
      //prevent background breakage
  regexp = /url\(([^\'\)\(]+)\)/;
  counter = 0;

 
  while( result.match( regexp ) && counter<30) {

    res = result.match( regexp )[1];
    result = result.replace( res , '\'' + res + '\'' );
    counter++;
  }


  
  return result;
}

function processHTMLBack( html ) {
    
   html = html.replace( /\r/g , '<br>' );
   html = html.replace( /\n/g , '<br>' );
    return html;
}

function postRequest( e ) {

    form = e.target.form
    data =  $('textarea[name="data"]' , form )[0].value;
    edit =  $('input[name="edit"]' , form )[0].value;

    data = 'edit='+ parseInt( edit ) +'&body='+data + '';


     GM_xmlhttpRequest({
    method: "POST",
    url: document.baseURI,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data: encodeURI( data ) ,
    



    onload: function(xhr) { 
        window.document.location=document.baseURI;
        location.reload(true)


    }
  });
}

function cancelEdit( e ) {
    
    postnum = e.target.form.getAttribute('postnum');
    $( '#postEdit_' + postnum ).parent().hide();
}



