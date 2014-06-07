// ==UserScript==
// @name           SU Blog Search
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Search
// @include        http://www.stumbleupon.com/*
// ==/UserScript==


$ = unsafeWindow.$;
console = unsafeWindow.console;

reviews = $('ul.listStumble li.listLi div.review ');
     

function log( a )  {
  //if( console ) console.log( a );
}
var abort = true;
var tempdiv = $('<div>');
var page = 0;
var word = '';
var temp = '';


var div = $('<div class="box borderBottom" id="searchBlog" />').insertAfter('div#stats');

$('<input type="text" class="text" id="searchWord"></input>').appendTo('div#searchBlog');

$('<button class="btnGreen" type="button">Stop search</button>').appendTo('div#searchBlog')
.bind( 'click' , stopSearch );
$('<button class="btnGreen" type="button">Start search</button>').appendTo('div#searchBlog')
.bind( 'click' , startSearch );

dd = parseInt( $( 'dd[title*="reviews & Blogs"]').text().replace(',' , '' ) );

var interval = null;

function startSearch() {
   $('ul.listStumble li.listLi').hide();
   newword = $('#searchWord').val();
   if ( newword == word )
   $('ul.listStumble li.listLi[found]').show();
   
   
   
   if( newword.length > 3 && abort ) {
    abort = false;
    word = newword;
    page = 0;

    
          getPage();
    }
}












function stopSearch() {
   abort = true;
   clearInterval( interval );
}



function narrow( reviews ) {
      

  
       reArray = new Array();
  
for( var i=0; i<reviews.length; i++) {
    match = $( 'div.review' , reviews[i] ).html().match( word );

     if ( match )  { 
         $( 'div.review' , reviews[i] ).html( $( 'div.review' , reviews[i] ).html().replace( word , '<font style="background-color:yellow;border:1ps solid red;">'+word+'</font>') );
        reArray.push( reviews[i]) ;
        $( reviews[i] ).attr('found',true);
        $( reviews[i] )
          .html( $( reviews[i] ).html().replace( /_src=/g , 'src=' ) );
        }
  
}
$('ul.listStumble').append( reArray );
 temp = null;
}



function getPage() {
var URL = 'http://www.stumbleupon.com/favorites/reviews/';
if( unsafeWindow.stumbler_userid ) 
URL =  'http://www.stumbleupon.com/stumbler/'+unsafeWindow.stumbler_userid+'/reviews/'
 if ( abort || page > dd ) {

   abort = true;
   return;
 } 
$.ajax({
type: "GET", 
 
url: URL + page +'/' ,
 
complete : function( xhr )  {
html = xhr.responseText;
        html = html.replace( /src=/g , '_src=' );
        

        temp = $( html );
        ulliststumble = $('ul.listStumble', temp ).html();
        rewCount = $('ul.listStumble li.listLi ' , temp ).length;
        reviews = $('ul.listStumble li.listLi ' , temp );
           log( rewCount )
           if( rewCount < 8 ) {
              abort = true;


          }

        narrow( reviews );
         
        if( !abort ) {
            
            
            page+=10;
             getPage();

            }

        }
        
});

}      
