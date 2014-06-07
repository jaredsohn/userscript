// ==UserScript==
// @name       blueKiwi Background
// @namespace  http://www.google.com
// @version    1
// @description  Random full page cover backgrounds
// Add your blueKiwi URL beneath, make sure it has a trailing /*
// @match      http*://
// @copyright  2013, GHesp
// ==/UserScript==

function randomBG(){
    
//Add in URL's to images inbetween the quote marks below.  If you wish to add more than 3 images, just continue as I have, so the next line will be images[4] = "url".
    
    var images = new Array()
    images[1] = "http://farm4.staticflickr.com/3451/3814151827_fe79a7ddde_b.jpg"
    images[2] = ""
	images[3] = ""
 

//*****************************//  
//****DON'T EDIT BELOW HERE****//
//*****************************//    
    
    var random = Math.floor(Math.random()*images.length)
 
  GM_addStyle ( "                                     \
    .banner_url {                                   \
        background: url('"+ images[random]+"') no-repeat center center fixed !important; \
        -webkit-background-size: cover !important;  \
        -moz-background-size: cover !important;     \
        -o-background-size: cover !important;       \
        background-size: cover !important;          \
    }                                               \
" );
} 
randomBG();