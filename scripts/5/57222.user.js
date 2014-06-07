// ==UserScript==
// @name           Friends Online Light version for Firefox 3.0
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Lightweight script shows your online friends in the sidebar
// @include        http://*.stumbleupon.com/*
// @author        http://onyxstone.stumbleupon.com/
// ==/UserScript==

var stumbler = window.wrappedJSObject.stumbler;
var $ = window.wrappedJSObject.$;

var friends_url = 'http://'+stumbler+'.stumbleupon.com/friends/all/';
var tempDiv;




if( stumbler && $('#blogContent' ).length > 0 ) {

  request();
  GM_addStyle('#FrOnline .vmini:hover {-moz-box-shadow: 1px 1px 5px 3px lightgray; }');
}


function request( ) {

GM_xmlhttpRequest({
    method: "GET",
    url: friends_url,

    headers:{'Content-type':'text/html'},



    onload: function(xhr) { 
          txt = xhr.responseText.replace(/\n/g, '' );

          var m = txt.match(  
          /class\=\"listPeople mgnTop clearfix mgnBottom\"\>(.+)\<\/td\>\<td class\=\"sidebar\"\>/); 

          processHTML( '<div '+ m[0] );

}});}
	
	
	
function processHTML( html ) {

  tempDiv = $('<div>')
      .html( html );
      
      bG = $(' dl.vcardLg > dd.borderGreen ', tempDiv );

     sidebar = $('<div id="FrOnline" class="section clearfix"><h3>Friends Online Now</h3></div>');
        $( '#cloudTopics' ).before( sidebar );
     
     //bg = getBackgroundImageURL( bG[0].firstElementChild );

     for( i=0; i < bG.length; i++ ){
  
        vmini = $( '<dl class="vmini"><dd class="thumbnail"></dd></dl>' );
        
          //$( '.thumbnail' , vmini).append( bG[i].firstElementChild.cloneNode(true) );
	  //firefox 3.0
          $( '.thumbnail' , vmini).append( bG[i].childNodes[0].cloneNode(true) );
          sidebar.append( vmini );

     }
     
     tempDiv = null;


$('a.tips').cluetip({
	cluetipClass: 'jtip', 
	dropshadow: false,
	showTitle: false, 
	splitTitle: '|', 
	arrows: true,
	width: 150,
	dropShadow: false,
	hoverIntent: {    
		sensitivity:  3,
		interval:     400,
		timeout:      0
		}
	});


}	

function getBackgroundImageURL( elem ) {
    m = elem.style.backgroundImage.match( /url\((.+)\)/ );

    return m[1];
}
	
	
