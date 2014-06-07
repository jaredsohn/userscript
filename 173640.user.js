// ==UserScript==
// @name        PussyTorrentsLightbox Theif
// @namespace   ptPicOpener
// @include     http://*pussytorrents*/torrents/browse*
// @version     4
// @description shows the pictures in the browse page so you don't have to open the torrent details pages.
// @require  http://www.pussytorrents.org/templates/pt_default/js/jquery.lightbox.min.js
// @require http://projects.bygph.com/torrent.js
// ==/UserScript==

/*global $:false */
/*global GM_addStyle:false */
/*global document:false */
/*sglobal console:false */
/*global window:false */
if (!GM_addScript) { var GM_addScript = function(p) {
    var scr = document.createElement('script');
    scr.type = "text/javascript";
    if (typeof(p) == "string") {scr.src  = p;}
    else {scr.textContent = '(' + p.toString() + ')();';}
    id='test1'; document.head.appendChild(scr);
    return scr;
   
}}

$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

GM_addStyle(".lastClicked {border:4px solid #F66 !important;} .recentlyClicked{border:4px solid #F2BEDD;} #preload1{background:url(http://pussytorrents.org/templates/pt_default/images/jquery-lightbox-theme.png)}");

var maxImagesPerTorrent = 10;
var thumbWidthMax = 350;
var thumbHeightMax = 350;

var totalImgCounter = 0;

var scrollPosition = $('body').scrollTop();
var lastRow = $('tr');
var lastElement = $('a');

var dataImageIDs = [];

var newClick = function(){
  var wheight = $(window).height();
  if(scrollPosition !== null){
    $("body").animate({ scrollTop:  scrollPosition - $(window).height() / 2 + 50});
  }
};

$(document).ready(function() {
  maxImagesPerTorrent = 10;
  thumbWidthMax = 350;
  thumbHeightMax = 350;

  totalImgCounter = 0;

  scrollPosition = $('body').scrollTop();
  lastRow = $('tr');
  lastElement = $('a');

  dataImageIDs = [];
  // GM_addScript('http://www.pussytorrents.org/templates/pt_default/js/torrents/torrent/torrent.js');

  if ($('#torrenttable') === undefined) {
       throw "no #torrenttable";
   }
   showImages();
   
  $('.jquery-lightbox-overlay').click(function(){newClick();});
  $('.jquery-lightbox-button-close').click(function(){newClick();});

  $('.jquery-lightbox-button-max').click(function(){

    scrollPosition = $(lastRow).offset().top;
  });

  $('.jquery-lightbox-button-left').click(function(){
    if($(".jquery-lightbox-background img").attr('src')!==undefined){
      $('a[data-image-id]').each(function(){
        dataImageIDs.push($(this).attr('data-image-id'))
      });
      var lastLastElement = $("a:has(img[src$='"+$(".jquery-lightbox-background img").attr('src').replace('noresize','thumb')+"'])");    
      var lastElementIndex = dataImageIDs.indexOf(lastLastElement.attr("data-image-id"))-1;
      var lastElement = $("a[data-image-id='"+dataImageIDs[lastElementIndex]+"']");

      $(".lastClicked").removeClass("lastClicked");
      lastElement.children('img').each(function(){$(this).addClass("recentlyClicked").addClass("lastClicked")});

      var closestTR =  $("tr:has(a[data-image-id='"+dataImageIDs[lastElementIndex]+"'])");
      lastRow = $(closestTR).prev('tr');
     // $(closestTR).addClass("recentlyClicked").addClass("lastClicked");

      var wheight = $(window).height();
      if($(lastRow).offset().top !== undefined){
        $("body").animate({ scrollTop:  $(lastRow).offset().top - $(window).height() / 2 + $(closestTR).height()});
      }

      scrollPosition = null;
      if(typeof(Storage)!=="undefined"){
        localStorage.setItem($(lastElement).attr("data-image-id"),true);
      }
    }
  });

  $('.jquery-lightbox-button-right').click(function(){
    if($(".jquery-lightbox-background img").attr('src')!==undefined){
      $('a[data-image-id]').each(function(){
        dataImageIDs.push($(this).attr('data-image-id'))
      });
      var lastLastElement = $("a:has(img[src$='"+$(".jquery-lightbox-background img").attr('src').replace('noresize','thumb')+"'])");

      var lastElementIndex = dataImageIDs.indexOf(lastLastElement.attr("data-image-id"))+1;
      var lastElement = $("a[data-image-id='"+dataImageIDs[lastElementIndex]+"']");

      $(".lastClicked").removeClass("lastClicked");
      lastElement.children('img').each(function(){$(this).addClass("recentlyClicked").addClass("lastClicked")});

      var closestTR =  $("tr:has(a[data-image-id='"+dataImageIDs[lastElementIndex]+"'])");
      lastRow = $(closestTR).prev('tr');
      //$(closestTR).addClass("recentlyClicked").addClass("lastClicked");

      var wheight = $(window).height();
      if($(lastRow).offset().top !== undefined){ 
        $("body").animate({ scrollTop:  $(lastRow).offset().top - $(window).height() / 2 + $(closestTR).height()});
      }
      scrollPosition = null;
      if(typeof(Storage)!=="undefined"){
        localStorage.setItem($(lastElement).attr("data-image-id"),true);
      }
    }
  });


  $('#torrenttable tbody tr').die ("click");
  $('#torrenttable tbody .even, #torrenttable tbody tr.odd').live ("click", function() {
    if ( $(this).hasClass('row_selected') ) {
      $(this).removeClass('row_selected');
      var rowCount = $('.row_selected').size();
      $(".rowCount").text('('+rowCount+')');
      if (rowCount === 0){
         $(".rowCount").text('');
      }

    }
    else {
      $(this).addClass('row_selected');
      var rowCount = $('.row_selected').size();
      $(".rowCount").text('('+rowCount+')');
    }
  });

});
function showImages() {
  // var image = new Image();
  // image.src = "http://pussytorrents.org/templates/pt_default/images/jquery-lightbox-theme.png";
  $("#torrenttable td.name").each(function() {


    var td = $(this);
    var container = $(document.createElement("tr"));
    var aUrl = td.find("a").attr("href");

    var imgCounter = 0;
    $.ajax({
      url: aUrl,
      datatype: 'xml' 
      }).done(function(data) {

        container.css( "text-align", "center");
        var thumbTD = $(document.createElement("td"));
        var closestTR = td.closest('tr');
        thumbTD.css( "text-align", "center");
        thumbTD.attr('colspan','8');
        var imgHref = $(data).find(".lightbox").each(function() {
          if(imgCounter >= maxImagesPerTorrent) {

            thumbTD.append("... ");
            container.append(thumbTD); 
            container.addClass("thumbRow");
            container.insertAfter(closestTR);                     
            return;
          }
          var that = this;
          var imgSrc = $(this).find("img").attr("src");
          var aHref = $(this).attr("href");
          var dataImageID = $(this).attr("data-image-id");
          var a = $(document.createElement("a"));
          a.attr("href", aHref);
          a.attr("data-image-id", dataImageID||totalImgCounter);
          a.addClass("lightbox");
          a.attr('rel', 'imagegroup');
          a.css("margin","0 5px 0 20px");
          a.css("padding","0");
          a.css("display","inline-block");
          
          a.on('click',function(){
            $(".lastClicked").removeClass("lastClicked");
              a.children().each(function(){
                $(this).addClass("recentlyClicked").addClass("lastClicked");
              })
            lastRow = $(closestTR);
            scrollPosition = null;
            // $(closestTR).addClass("recentlyClicked").addClass("lastClicked");
            if(typeof(Storage)!=="undefined"){
              localStorage.setItem($(that).attr("data-image-id"),true);
            }
          });
    
          var img = $(document.createElement("img"));
          img.attr("src", imgSrc);
          //img.addClass('img-polaroid');
          img.css("display","inline-block");

          a.append(img);

        
          thumbTD.append(a);
          container.append(thumbTD);

          container.addClass("thumbRow");
          container.insertAfter(closestTR);

          imgCounter++;
          totalImgCounter++;
          if(typeof(Storage)!=="undefined"){
            if(localStorage.getItem(dataImageID)){
                $('[data-image-id='+dataImageID+']').children('img').each(function(){$(this).addClass("recentlyClicked")});                
            }
          }
        });
        
      $('a .lightbox').lightbox({fixedNavigation:false});
      $('a .lightbox').css("max-width", thumbWidthMax+"px");
      $('a .lightbox').css("max-height",thumbHeightMax+"px");
      $('a .lightbox').css("margin","3px 0px 0px 10px");
      $('a .lightbox img').css("margin","0");
      $('a .lightbox img').each(function() {

          var ratio = 0;  // Used for aspect ratio
          var width = $(this).width();    // Current image width
          var height = $(this).height();  // Current image height

          // Check if the current width is larger than the max
          if(width > thumbWidthMax){
              ratio = thumbWidthMax / width;   // get ratio for scaling image
              $(this).css("width", thumbWidthMax); // Set new width
              $(this).css("height", height * ratio);  // Scale height based on ratio
              height = height * ratio;    // Reset height to match scaled image
          }

          var imgWidth = $(this).width();    // Current image width
          var imgHeight = $(this).height();  // Current image height

          // Check if current height is larger than max
          if(imgHeight > thumbHeightMax){
              ratio = thumbHeightMax / imgHeight; // get ratio for scaling image
              $(this).css("height", thumbHeightMax);   // Set new height
              $(this).css("width", imgWidth * ratio);    // Scale width based on ratio
              imgWidth = imgWidth * ratio;    // Reset width to match scaled image
          }
        });
     });
  });

  
  
}



var oldJQueryGet = $.get;
$.get = function(url,options, callback) {
  if(url.indexOf("/torrents/browse") === 0) {
    oldJQueryGet(url,options,function(data) {
      callback(data);
      showImages();
    });
  }
  else {
    oldJQueryGet(url,options,callback);
  }
}
