// **Requirements - jquery**
// Go to http://jqueryjs.googlecode.com/files/jquery-1.4.2.min.js
// 
// Robbed from a few different reddit userscripts, as well as common bookmarklets.
// Adds a floating box to the comments page from which to initiate pants-dropping awesomesauce.
//
// ==UserScript==
// @name          Reddit Awesomesauce
// @description   Show Imgur pictures inline, collapse reply tree, show YouTube videos inline, show +/- votes on comments 
// @include       http://www.reddit.com/comments/*
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/user/*
// ==/UserScript==

var showPermanently = true; // Show up/down votes inline (vs. on hover)

if( location.href.match(/^http:\/\/www\.reddit\.com\/r\/.*\/comments\/.*/) || location.href.match(/^http:\/\/www\.reddit\.com\/user\/.*/)) {
  $(document).ready(function(){
    function addVotes(items) {
      $.each(items, function(i, item) {
        var data = item.data;
        
        var votesText = '(+'+data.ups+'/-'+data.downs+')';
        var votes = $('<span></span>').addClass('votes').text(votesText);
        
        var tagline = $('.id-'+data.name+' > .entry .tagline');
        
        if (showPermanently) {
          votes.css({ 'margin' : '0 0.4em' });
          votes.insertAfter(tagline.find('.unvoted'));
        } else {
          votes.css({ 'color' : '#03F', 'font-weight' : 'bold' });
          votes.hide();
          tagline.hover(
            function() { $(this).find('.votes').show(); },
            function() { $(this).find('.votes').hide(); }
          )
          votes.appendTo(tagline);
        }
        
        if (data.replies) {
          addVotes(data.replies.data.children);
        }
      });
    }

    function showBreakdown() {
      $.getJSON(
        window.location.href.split('?')[0]+'.json',
        function(listing) {
          if (listing[1]) {
            addVotes(listing[1].data.children);
          } else {
            addVotes(listing.data.children);
          }
        }
      );
      
      return false;
    }   

    function showPictures() {      
      $("#siteTable,.commentarea").find("a").each(function(){
        var href=$(this).attr("href");
        
        if((!$(this).hasClass("embeddedPic")) && ($(this).next(".embeddedPic").length==0) && href && (href.indexOf('imgur')>=0 || href.indexOf('jpeg')>=0 || href.indexOf('jpg')>=0  || href.indexOf('png')>=0)){
          var ext =(href.indexOf('imgur')>=0 && href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' :''; 
          var img = $("<a class='embeddedPic' href='"+href+"' target='blank' style='display:block'><img style='display:block;max-width:780px;' src='"+href+ ext+"' /></a>");
          $(this).after(img);
        }
      });
      return false;      
    }
        
    function showYouTube() {         
        $("#siteTable,.commentarea").find("a").each(function(){
          var href=$(this).attr("href");

          if ((!$(this).hasClass("embeddedVideo")) && ($(this).next(".embeddedVideo").length==0) && href && href.match(/(youtube.com\/watch\?v=)(\w+)/i) ){
            var id = href.match(/(youtube.com\/watch\?v=)([\w-_]+)/i)[2]; 
            var video = '<embed src="http://www.youtube.com/v/IDREPLACEMENT&hl=en_US&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed>'.replace("IDREPLACEMENT", id);
            
            $(this).after( video );
          }          
        });
        
        return false;      
    }
        
    
    function collapseAll() {
      $(".child .comment .noncollapsed .expand").click();
      return false;
    }
    
    
    var css = { margin : "5px 0" }
    
    var redditPics      = $('<li><a href="#">Show Pictures</a></li>').bind("click", showPictures).css(css);
    var redditVids      = $('<li><a href="#">Show YouTube</a></li>').bind("click", showYouTube).css(css);
    var redditCollapse  = $('<li><a href="#">Collapse All</a></li>').bind("click", collapseAll).css(css);
    var redditBreakdown = $('<li><a href="#">Show Vote Breakdown</a></li>').bind("click", showBreakdown).css(css);
    
    var container = $('<ul></ul>')
      .css({ position : "fixed", left : "70%", border : "2px solid #336699", padding : "10px" })
      .append(redditPics)
      .append(redditVids)
      .append(redditCollapse)
      .append(redditBreakdown);
      
    
    $('#siteTable').before(
      container
    );
    
  });
}