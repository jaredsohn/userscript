// ==UserScript==
// @name           Magnifying Glass for dA            
// @namespace      world
// @description    can zoom image easily with 3 size
// @include        http://*.deviantart.com/*
// ==/UserScript==   
 
var $ = unsafeWindow.jQuery;  

$(document).ready(function() {
  var w = $("#gmi-ResViewSizer_fullimg").width();
  var h = $("#gmi-ResViewSizer_fullimg").height(); 
  var multi = 2;  
  var size = 100;
  var allowed = false;
  var open = false;
  var offLeft = null;
  var offTop = null;   
  var img_zoomed = $("#gmi-ResViewSizer_fullimg").attr("src");
  var img_width = w * multi;
  var img_height = h * multi;
  var loupe;
  
  if(w > 70 && h > 70) {    
                 
    loupe = "<div id='loupe' style='border: 1px solid #d3dfd1;position: absolute; z-index: 999999999999; width: " + size + "px; height: " + size + "px; display: block; background-color: #000000; overflow: hidden;'>";
    loupe += "  <img id='img_zoomed' src='" + img_zoomed + "' width='" + img_width + "' height='" + img_height + "'/>";
    loupe += "</div>";    
    $("#zoomed-in").prepend(loupe);    
    $("#zoomed-in").css("margin", "0px auto 0px auto");
    $("#zoomed-in").width($("#gmi-ResViewSizer_fullimg").width());
    $("#zoomed-in").css("overflow", "hidden");
    $("#loupe").css({cursor: 'none'});
    $("#loupe").hide();
                  
    var ico_loupe = "<div style='margin-top: -" + h + "px; float: right; z-index: 999999999; margin-left: -30px; width: 30px;'>";
    ico_loupe += "  <div id='ico_loupe' style='cursor: pointer; display:block; border: 1px solid #313f3a; width: 30px; height: 30px;'>";
    ico_loupe += "    <img src='http://fc05.deviantart.net/fs71/f/2010/255/2/e/zoom_on_ico_by_mixedmilkchocolate-d2ykorw.png'/>";
    ico_loupe += "  </div>";
    ico_loupe += "  <div id='ico_plus' style='cursor: pointer; text-decoration: none; display:block; border: 1px solid #313f3a; width: 30px; height: 30px;'>";
    ico_loupe += "    <div style='margin-top: 2px; width: 30px; text-align: center; font-size: 20px;'>+</div>";
    ico_loupe += "  </div>";
    ico_loupe += "  <div id='ico_moins' style='cursor: pointer; text-decoration: none; display:block; border: 1px solid #313f3a; width: 30px; height: 30px;'>";
    ico_loupe += "    <div style='margin-top: 2px; width: 30px; text-align: center; font-size: 20px;'>-</div>";
    ico_loupe += "  </div>";
    ico_loupe += "</div>";
    $("#zoomed-in").parent().append(ico_loupe);   
    $("#ico_loupe").fadeTo(0, 0.5);
    $("#ico_plus").hide();
    $("#ico_moins").hide();
    
    reInit();  
    
    $("#zoomed-in").mousemove(function(e) {
      var relativeX = e.pageX - $(this).offset().left;    
      var relativeY = e.pageY - $(this).offset().top;
      $("#img_zoomed").css("margin-left", "-" + relativeX * multi + "px"); 
      $("#img_zoomed").css("margin-top", "-" + relativeY * multi + "px"); 
      $("#loupe").css("left", (relativeX - $("#loupe").width() / 2) + "px");
      $("#loupe").css("top", (relativeY - $("#loupe").height() / 2) + "px");
    });   
    
    $("#zoomed-in").mouseenter(function(e) {
      if(allowed) {  
        $("#loupe").show();
      }
    });    
    
    $("#zoomed-in").mouseleave(function(e) {  
      $("#loupe").hide();
    }); 
                 
    $("#ico_loupe").click(function() {
      if(allowed) {
        $(this).fadeTo(0, 0.5);
        allowed = false;
        $("#loupe").hide();   
        $("#ico_plus").hide();
        $("#ico_moins").hide();
      }else {         
        $(this).fadeTo(0, 1);
        $("#ico_plus").show();
        $("#ico_moins").show();
        allowed = true;  
        reInit();
      }              
    }); 
                 
    $("#ico_plus").click(function() {
      zoomIn("+")
    });
                 
    $("#ico_moins").click(function() {
      zoomIn("-")
    });
  }
  
  function zoomIn(i) {
    if(i == "+") {
      multi += 1;
      size += 100; 
    }else {
      multi -= 1;
      size -= 100;
    }
    
    if(multi >= 5) {
        multi = 5;
        size = 500;
        $("#ico_plus").fadeTo(0, 0.5);
    }else {
        $("#ico_plus").fadeTo(0, 1);
    }
    
    if(multi <= 1) {
        multi = 1;
        size = 100;
        $("#ico_moins").fadeTo(0, 0.5);
    }else {
        $("#ico_moins").fadeTo(0, 1);
    }
    
    reInit();
  }
  
  function reInit() {     
    img_width = $("#gmi-ResViewSizer_fullimg").width() * multi;
    img_height = $("#gmi-ResViewSizer_fullimg").height() * multi;
    $("#loupe").width(size);
    $("#loupe").height(size);
    $("#img_zoomed").width(img_width);
    $("#img_zoomed").height(img_height);
  }
});