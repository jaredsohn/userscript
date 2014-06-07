// ==UserScript==
// @name           StumbleUpon Enhanced Forum
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Adds 'edit post' feature to StumbleUpon forums
// @include        http://www.stumbleupon.com/group/*
// @version        0.0.1
// ==/UserScript==


$ = unsafeWindow.$;
//console = unsafeWindow.console;

var edit = null;
var num = null; 
var post = null;
var myname = null;
var btn = null;
var btnfalse = null;


if( document.URL.match( 'http://www.stumbleupon.com/group/' ) ) init();

function init() {


 edit =    $('form[action="#end"] input[name="edit"]');
 num =  edit.val();
 myname = getMyName();



$( 'div#content > table > tbody > tr ').addClass( 'aPost' ).attr('editable' , false );


btn = $('form[action="#end"] input.bold[type="submit"]').hide();
btnfalse = $('<a class="btnGreen" href="javascript:falsePost();">' + btn.val() + '</a>').insertBefore( btn );


$(document.body).prepend('<div id="postEditForm" style="background: rgba(227, 235, 246, 0.7) url(\'http://img227.imageshack.us/img227/5342/headerbga.gif\') repeat-x;padding:10px;display:none;position:fixed;left:0px;right:0px;bottom:0px;"><button class="closebtn" type="button" style="background:transparent;float:right;">Close</button><form id="editForm" method="post"><br /><input id="postID" name="edit" type="hidden" /><br /><br /><textarea  name="body" style="min-height: 100px;width:80%;"></textarea><br /><a class="btnGreen" href="javascript:savePost();">Edit post</a><input type="submit"  style="display:none;"/></form></div>');


$('.aPost td[colspan="2"]' ).addClass( 'postBody' );
 $( '#postEditForm .closebtn').bind( 'click' , function( ) {
    $( '#postEditForm').hide();
    $( '.aPost').css( { 'background' : 'transparent' , 'border': 'none' } );
 });

//Find editable posts as moderator
var modLinks = $('a[href^="javascript:delete_post"]');
for( var i =0 ; i<modLinks.length; i++ ) insertModEditBtn( modLinks[i] ); 

editLinks = $( '.aPost[editable="false"] b.editpost' );
GM_log( 'editlinks number = ' + editLinks.length );


for( var i =0 ; i<editLinks.length; i++ ) insertEditBtn( editLinks[i] );
      
      
      unsafeWindow.falsePost = falsePost;
      unsafeWindow.editPost = editPost;
      unsafeWindow.savePost = savePost;
      unsafeWindow.createNewPost = createNewPost;
      

}

function getMyName() {

    var regexp =  /\/stumbler\/(.+)\/groups\//;
    footer = $('div#footer'); 
    
    
    myname = footer.html().match( regexp )[1];
    myurl = 'http://'+myname+'.stumbleupon.com/';
    return myurl;
}







function insertModEditBtn( modLink ) {
    var modLink = $( modLink );
    var editNum = modLink.attr( 'href' ).match( /\'(\d+)\'/ )[1];
    
    if( modLink.prev().attr('href').toLowerCase() == myname.toLowerCase() && editNum!=num ) {
    var aPost = modLink.parents( '.aPost' );
    aPost
    //.css( { 'background':'rgba(255, 255, 204, 0.5)','border' : '1px dashed pink' } )
    .attr('num',editNum).attr('editable',true);
    
    var linkText = '&nbsp;&nbsp;&nbsp;<a href="javascript:editPost(\'' + editNum + '\');">&#9998; Edit post as a mod</a>';
    aPost.find('a[target="_top"]' ).parent().append( ' ' + linkText );
    }                                                               

}

function insertEditBtn( editLink ) {
    
    var editLink = $( editLink );
    var editNum = editLink.attr( 'num' );
    var aPost = editLink.parents( '.aPost' );
    
    //console.log( 'editNum= ' + editNum )
    //console.log( 'num= ' + num )
    if( aPost.find('a[target="_top"]' ).attr('href').toLowerCase() == myname.toLowerCase()  && editNum!=num ) {
    
    aPost.attr('num',editNum);
    
    var linkText = '&nbsp;&nbsp;&nbsp;<a href="javascript:editPost(\'' + editNum + '\');">&#9998; Edit post</a>';
    aPost.find('a[target="_top"]' ).parent().append( ' ' + linkText );
    }                                                             

}


function editPost( num ) {
  $( '.aPost').css( { 'background' : 'transparent' , 'border': 'none' } );
  $( '.aPost[num="'+num+'"]' ).css( { 'background':'rgba(255, 255, 204, 0.5)','border' : '1px dashed pink' } );
        var postBody = $( '.aPost[num="'+num+'"]' ).find( '.postBody' );
     $('#postEditForm').show();

     var html = postBody.html().replace( /<br>\n/g , '\n');
     $('#postEditForm textarea' ).val( html );
     $( '#postID').val( num );

}

function savePost() {
    insertLink( $('#postEditForm textarea') , $('#postEditForm input[name="edit"]').val() );
    $('#postEditForm form')[0].submit();
}


function falsePost()  {
    btnfalse.attr('href' , '' );
   if( !$( 'form[action="#end"] input[name="edit"]')[0] ) createNewPost();   
   else {
      insertLink( $('#posttext') , num );
      btn[0].form.submit();
   }
   
       
}


function createNewPost() {
   data = 'body=' + $('#posttext').val() 
   
  
 
    
  $.ajax({
  type: 'POST',
  url: document.URL,
  data:  data,
  success : function( html ) {
      html = html.replace( /src=/g , '_src=' );
      var temp = $( html );
      numm =  $( 'input[name="edit"]' , temp ).val() ;
      if( !$( 'form[action="#end"] input[name="edit"]')[0] ) 
        $('#posttext').before( '<input type="hidden" value="' + numm + '" name="edit" /> ');
        //console.log( numm );
      insertLink( $('#posttext') , numm ); 
      btn[0].form.submit();
  }

});
  

}


function insertLink( textarea , num ) { 
      var posttext = $(textarea).val();
    var link 
       = '<b class="editpost" num="' + num +  '"></b>';
       if( !posttext.match( link ) ) {
           $(textarea).val( posttext + link );
       } 

       
}
