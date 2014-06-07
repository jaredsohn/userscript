// ==UserScript==
// @name        browsePreview
// @namespace   ptPicOpener
// @include     http://*pussytorrents.org/torrents/browse*
// @version     3
// @description shows the pictures in the browse page so you don't have to open the torrent details pages.
// @require  http://www.pussytorrents.org/templates/pt_default/js/jquery.lightbox.min.js
// @require http://www.pussytorrents.org/templates/pt_default/js/torrents/torrent/torrent.js
// ==/UserScript==
if( $('#torrenttable') === undefined){
     throw "no #torrenttable";
}
var maxImagesPerTorrent = 10;
var thumbWidthMax = 350;
var thumbHeightMax = 350;

var totalImgCounter = 0;
var overrideScrollingForLargeImages = true;

//prevent clicking of thumb rows to add them to bookmarks, then recreate them
$('#torrenttable tbody tr').die ("click");
$('#torrenttable tbody .even, #torrenttable tbody tr.odd').live ("click", function() {
  if ( $(this).hasClass('row_selected') ) {
    $(this).removeClass('row_selected');
    var rowCount = $('.row_selected').size();
    $(".rowCount").text('('+rowCount+')');
    if (rowCount ==0){
       $(".rowCount").text('');
    }

  }
  else {
    $(this).addClass('row_selected');
    var rowCount = $('.row_selected').size();
    $(".rowCount").text('('+rowCount+')');
  }
});
  
function showImages() {
  var image = new Image();
  image.src = "http://pussytorrents.org/templates/pt_default/images/jquery-lightbox-theme.png";
  $("#torrenttable td.name").each(function() {
    var td = $(this);
    var container = $(document.createElement("tr"));
    var url = td.find("a").attr("href");
    var imgCounter = 0;
    $.ajax({
      url: url,
      datatype: 'xml' 
      }).done(function(data) {

        container.css( "text-align", "center");
        var thumbTD = $(document.createElement("td"));
        thumbTD.css( "text-align", "center");
        thumbTD.attr('colspan','8');
        var imgHref = $(data).find(".lightbox").each(function() {
          if(imgCounter >= maxImagesPerTorrent) {
            container.append("... ");
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
          
// //            $('.jquery-lightbox-move').attr('id','overrideScrolling');
          a.on('click',function(){
            $(this).css("border","4px solid #000000");
            if(typeof(Storage)!=="undefined"){
              localStorage.setItem($(that).attr("data-image-id"),true);
              console.log("set: "+$(that).attr("data-image-id"),localStorage.getItem($(that).attr("data-image-id")));
            }
          });
    
          var img = $(document.createElement("img"));
          img.attr("src", imgSrc);
          //img.addClass('img-polaroid');
          img.css("display","inline-block");

          a.append(img);

          var closestTR = td.closest('tr');

          // if(closestTR.hasClass("even")){
          //   container.addClass("even");
          // }else{
          //   container.addClass("odd");
          // }
        
          thumbTD.append(a);
          container.append(thumbTD);

          container.addClass("thumbRow");
          container.insertAfter(closestTR);
          imgCounter++;
          totalImgCounter++;
          if(typeof(Storage)!=="undefined"){
            if(localStorage.getItem(dataImageID)){
                //console.log("dataImageID/localStorage.clicked[dataImageID]", a.attr("data-image-id"), localStorage.clicked[a.attr("data-image-id")])
                console.log("gotit"+dataImageID);
                $('[data-image-id='+dataImageID+']').css("border","4px solid #FC706E");
                
            }
          }
        });
        
      $('.lightbox').lightbox({fixedNavigation:false});
      $('.lightbox').css("max-width", thumbWidthMax+"px");
      $('.lightbox').css("max-height",thumbHeightMax+"px");
      $('.lightbox').css("margin","3px 0px 0px 10px");
      $('.lightbox img').css("margin","0");
      $('.lightbox img').each(function() {
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

showImages();

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
