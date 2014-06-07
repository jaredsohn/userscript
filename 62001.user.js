// ==UserScript==
// @name           V4Buddies
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Bookmark stumblers and displays them as a 'buddy list' in a sidebar
// @include        http://*.stumbleupon.com/*
// @author        http://onyxstone.stumbleupon.com/
// @version       0.0.3
// ==/UserScript==

var TRASH = 'data:image/gif;base64,R0lGODlhCgAKAKIAADMzM93d3YuLi2ZmZv/M/////7CwsAAAACH5BAEHAAQALAAAAAAKAAoAAAMlSDo8ui2SYYq9ZgAQ2Z6BEISBA4qkOQTG2KqsWy5GbZvEpgNKAgA7';


GM_addStyle('.hoverdiv .listUsers{ display:none;}.hoverdiv:hover .listUsers{ display:block;} button.remove-all { float: right; background: rgba(255,255,255,0.4); border : 0px solid; -moz-border-radius: 5px; } ');




$ = unsafeWindow.$;


//**** TEMP

//$('#fdbk_tab').attr('style','display:none;');

var img;

//*********Forum pages**************


$( 'td.lightbg > a > img[src^="http://cdn.stumble-upon.com/superminipics/"]' )
.parent()
.after('<input type="button" value="+" class="addbuddy" />');



//******Visitors, Subscribers, etc.******



GM_addStyle(' input.addbuddy { display: none; font-size: 10px; background: rgba( 255 ,255, 255, 0.6 ); padding: 0px; position: absolute; border-width: 1px; margin-top: -17px; cursor : crosshair ; } span.img:hover input.addbuddy { display: block ; } td.lightbg:hover input.addbuddy { display: block ; }  li:hover input.addbuddy { display: block ; } ');

$('ul.gridUsers > li > span.img > a').after('<input type="button" value="+" class="addbuddy" />');


$('ul.listUrlReviews > li > span.img > a').after('<input type="button" value="+" class="addbuddy" />');

//**********Sidebars***************

$( 'ul.listUsers > li > a').after('<input type="button" value="+" class="addbuddy" />');



//**********Stumbler Page***************

if( unsafeWindow.stumbler_userid ) {
spanimg = $( '#content > div.colMain > div.reviewProfile > span.img' );
img = $(  'a' , spanimg ).after('<input type="button" value="+" class="addbuddy" />');




}

$('input.addbuddy' ).bind( 'click' , handleAdd ) ;





var match = /\/stumbler\/([^\/]+)\//;
var matchBG = /http\:\/\/cdn\.stumble-upon\.com\/[^\/]+pics\/(\d+)\.jpg/;
var forumIMG = /http\:\/\/([^\/\.]+)/;


function handleAdd( e ) {

       
       t = $( e.target ); 
       

      var name, userid;
      
      
      tag = t.parent().attr('_type');
      
      var parent = t.parent();
      

      a = parent.find( 'a' );

      href = a.attr( 'href' );
      src = parent.find( 'img' ).attr( 'src' ) || "" ;

      
     
      
      //name
      
      name = parent.find( 'img' ).attr( 'alt' );
      
      ( !name ) ? name = match2( href , match ) : false;
      
      ( !name ) ? name = match2( href , forumIMG ) : false;
      

      
       userid = null;

      
      ( !userid ) 
      ? userid = a.attr( 'id' ) : false;
         
      ( !userid ) 
      ? userid = match2( src , matchBG ) : false ;

      
      ( !userid ) 
      ? userid = unsafeWindow.stumbler_userid : false;

      
      ( !userid ) 

      ? userid = match2( a.css('background-image') , matchBG ) : false;
      
      
      
      
      //GM_log( '\n\nNAME: ' + name + '\nUSERID:  ' + userid );

      

      
      
      addBuddy( { username : name , userid : userid } );
}






function match2( str , regexp ) {
 var m = str.match( regexp );
 
 if( m ) {
     GM_log( m[1] );
     return m[1];
 }
 
 else return false;


}




loc = unsafeWindow.localStorage;
var tempdiv = $('<div>')
.html( unsafeWindow.localStorage.getItem('BookmarkedStumblers') );
var ul;
var btn;

var StumblerMenu = $('<div id="StumblerMenu" style="display:none;position:absolute;background:white;"><button>Remove stumbler</button></div>')
.appendTo( 'body' );

var RemoveBtn = $( '#StumblerMenu button');

spanimg = $( '#content > div.colMain > div.reviewProfile > span.img' );

function removeStumbler( name ) {
         child = tempdiv[0].childNodes;
         for( var  i=0; i<child.length;i++) {
              if( child[i].getAttribute('stumbler') == name )
                  tempdiv[0].removeChild( child[i] );
         }
         loc.setItem('BookmarkedStumblers' , tempdiv.html() );
         generateList();
}
 
 
function generateList( ) {
 
 var stumblers = $( 'a[stumbler]' , tempdiv );
 var html = '';
 for ( var i=0 ; i<stumblers.length ; i++ ) {
      name = $( stumblers[i] ).attr('stumbler');
      userid = $( stumblers[i] ).attr('userid');
      
      if( userid == "nopic" ) {
          url = 'http://cdn.stumble-upon.com/images/nopic2_60x60.jpg';
      }
      else {
          url = 'http://cdn.stumble-upon.com/superminipics/'+ userid +'.jpg';
      }
      
      html += '<li ><a class="stumbler" stumbler="'+ name +'" style="background: rgb(255, 255, 255) url('+ url +') no-repeat scroll 50% 50%;" title="'+ name +'" href="/stumbler/'+ name +'/" id="'+ userid +'">'+ name +'</a></li>'
 
 }

 ul.html( html );
 
}

if( !spanimg[0] ) {

 div = $('<div class="box borderBottom" id="SidebarFriends" ><h3>Bookmarks<button class="remove-all"><img src="' + TRASH + '" /></button></h3><ul class="listUsers clearfix" id="SidebarFriendsUL" /></div>').insertAfter('#stats');
 
 $( div.attr( 'nextElementSibling' ) ).addClass('hoverdiv');
 
 $( 'button.remove-all' ).bind( 'click' , clearAll );
 
 
 ul = $( '#SidebarFriendsUL' );

  generateList();
 

 ul.bind('contextmenu' , function( e ) {
    
    if( e.target.className == "stumbler" ) {
    e.originalEvent.preventDefault();
    pos = findPos( e.target );
    width = e.target.clientWidth;
    height = e.target.clientHeight;
    name = $(e.target).attr('stumbler');
    
    RemoveBtn.unbind('click').bind( 'click' , name ,
    function( e ) {
    
          

          StumblerMenu.hide(); 

          removeStumbler( e.data );
          
                              
    });
    
    StumblerMenu.css( { left : pos[0] + width/2 + 'px' , 
    top : pos[1] + height/2 + 'px' } ).show();
    }
 });
 $( document.body ).bind('mousedown', function(e) {
 if( e.target != StumblerMenu[0] &&  e.target != RemoveBtn[0] )
                     StumblerMenu.hide();
 });
}

else if( spanimg[0] ) {



}

function clearAll( e ) {
var sure = confirm( 'You are about to delete all stumblers from your buddy list.\n Are you sure? ');
if( sure ) {
    tempdiv.html( '' );
    unsafeWindow.localStorage.setItem('BookmarkedStumblers' , '' );
    generateList();
    }
}

function findPos( el ) {
  var x=0,y=0;
  while( el ) {
      x+=el.offsetLeft;
      y+=el.offsetTop;
      el = el.offsetParent;
  }
  return [x,y];
}

function findStumbler( name, userid ) {

   var _name = $( 'a[stumbler="' + name + '"]' , tempdiv );
   var _userid = $( 'a[userid="' + userid + '"]' , tempdiv );

   if( _name[0] ) return _name;
   if( _userid[0] ) return _userid;
   else return false;
}

function addBuddy( e ) {

alt = ( img ) ?  img.attr( 'alt' ) : null ;

stumbler_name   = e.username || alt ;
stumbler_userid = e.userid || "nopic";


if( !findStumbler( stumbler_name,  stumbler_userid ) ) {
var a = '<a stumbler="'+ stumbler_name +'" userid="'+ stumbler_userid + " />";

tempdiv.append( a );
unsafeWindow.localStorage.setItem('BookmarkedStumblers' , tempdiv.html() );

}


}