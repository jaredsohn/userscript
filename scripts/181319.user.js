// ==UserScript==
// @name        IDG insert comments
// @namespace   http://griffeltavla.wordpress.com/
// @description Inserts disquis comments directly into the main article page at idg.se
// @include     http://*.idg.se/*
// @include     https://*.idg.se/*
// @version     1.0
// @grant       none
// ==/UserScript==

function insertComments(jQuery, did, url){
  $('<div id="disqus_thread"></div>').insertBefore('#articleFooter');
  $('#articleFooter, .divCommentWide, #divArticleMainColumnFooter, #divFooterContainer, .divColumn2article').remove();
  
  var disqus_identifier = did;
  var disqus_shortname = "prodidgse";
  var disqus_remote_auth_s3;
  var disqus_url = url + '?articleRenderMode=listpostings';
  
  function disqus_config() {
    this.page.remote_auth_s3 = disqus_remote_auth_s3;
    this.page.api_key = 'IxkjQL3wXf3o6fIkucOFN8HOp123dIGb9wqj1voswpQv9C6mkLVY2ueQhFPH49Og';
  
    this.sso = {
            name: location.hostname,
            button: "/img/login/ditt-idg-konto-btn-disqus.png",
            url:    "http://computersweden.idg.se/account/login?returnurl=" + encodeURIComponent(url) + "&disqus=true",
            width:   "800",
            height:  "400",
            logout: "http://computersweden.idg.se/account/logout?logoutFromIdgLogin=true&returnurl=" + encodeURIComponent(url) 
      };
  }
   
  function disqus_callback(json) {
    // Store value in temporary value (global variable) 
    this.disqus_remote_auth_s3 = json.message + ' ' + json.signature +  ' ' + json.timestamp;
  }
   
  function disqus_embed() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);  
  }
  
  jQuery.ajax({
     type : "GET",
     dataType : "json",
     cache: false,
     url : "/ajax/disqus?publicationId=2.126",
     success : function(json) {
       disqus_callback(json);
       disqus_embed();
     }
  });
}

function init(){
  var url = document.location.href, did = url.split('/')[4];
  insertComments($, did, url);
}

// Only run on the article pages
if( document.getElementById('articleHeader') ) init();
