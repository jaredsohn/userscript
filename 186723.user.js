// ==UserScript==
// @name        CuteSU
// @namespace   http://www.stumbleupon.com/stumbler/onyxstone/comments
// @include     http://www.stumbleupon.com/stumbler/*/comments
// @version     0.0.1
// @grant       none
// @description StumbleUpon not that ugly anymore!
// @author      onyxstone (http://www.stumbleupon.com/stumbler/onyxstone/)
// ==/UserScript==


var $ = unsafeWindow.$;


var style=

 "body{background:#EBEBEB url('http://25.media.tumblr.com/432b90f00bdbde5400a2f9cf9ab178f2/tumblr_mycni1EkXL1rjqfiko1_250.png')}" +



"#reflow-wrapper{width:auto;margin-right:380px;margin-left:30px;}" +


/**TopBar**/


 "#header-top{background:rgba(255,255,255,0.5)}" +
 
 ".l-header-top .center-wrap{width:90%}"  +



/**Sidebar**/
  
".header-content-wrap{ margin-top:0px;position:fixed;width:340px;right:20px;background:#221C1C; height:auto;box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);border-bottom:none;padding:30px 0px;}"  +

".header-content.large-header{width:auto;height:auto}" +

".header-context{display:none;}"+


".nav-tertiary{position:relative;text-align:left;padding-left:18px;}"+

".nav-tertiary-text, .nav-tertiary-count{font-size:10px;text-shadow:none;color:gray}"+

".s-active .nav-tertiary-count, .s-active .nav-tertiary-text{color:white}" +

".subject-dna{display:none;}"   +

".nav-tertiary-link-wrapper{float:none;position:auto;}" +

".nav-tertiary-link{text-align:left;}"     +

".nav-tertiary-count{display:auto;margin-right:5px;}"  +
".s-active .nav-tertiary-link:after {display:none;}" +

/**Portrait-Sidebar**/
".subject-controls{float:none;}"   +
".subject-user{padding-left:0px;}" +
".subject-left-wrap{float:none;margin:0 0}"  +
".subject-copyblock{float:none;}"   +

".subject-controls{margin-left:140px;position:absolute;}" +

".subject-copyblock{height:auto}"   +

".subject-copyblock .button-follow{float:none;margin:10px 0;display:block;width:70px;}" +

".tile-copy{width:80%}" +


/**Posts**/
".page-divider{position:static !important;display:none;}"+
".tile-comment{width:auto;display:block;position:static !important;}" +
".tile-comment{background:white;margin-bottom:20px;}"  +

".tile-url-content{background:white;border:none !important;}"  +

".tile-context-wrap{background:transparent}"  +

".tile-comment-thumb-image{width:150px !important;height:100px !important;}" +

".tile-url-thumb{border:none !important;}"+

".tile-url-content{height:100px !important;}"   +

".tile-controls{background:none;color:gray}"  +

".tile-url-topic{opacity:0.5}"
;


$('head').append("<style type='text/css'>"+ style + "</style>");



$(".nav-tertiary br").remove();


//Display Images


var target = document.querySelector('#reflow-wrapper');
 

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
         processUrls();
  });    
});
 

var config = { childList: true };
 

observer.observe(target, config);
 
 
function processUrls(){ 
 $(".e-comment").each(function(index){
  var text = $(this).text();
  
 var urls = $(this).text().match(/(http:\/\/|https:\/\/)(\S+)(.jpg|.gif|.png)/g) ;
  
  if(urls) {
    for (var i=0;i<urls.length;i++ ) {
     text = text.replace( urls[i] , "<center><img src=\"" + urls[i] + "\" /></center>");     
    }
   $(this).html(text);
  }
  
  
 });
} 





