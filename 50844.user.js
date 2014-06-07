// ==UserScript==
// @name           GoogleGallery
// @description    Enhanced google image search
// @author         Sean Catchpole
// @version        1.0
// @namespace      google
// @include        http://images.google.*/images?*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Settings
var width    = GM_getValue("width"    ,120);
var height   = GM_getValue("height"   ,120);
var approx   = GM_getValue("approx"   ,1);
var dark     = GM_getValue("dark"     ,0);
var autoload = GM_getValue("autoload" ,1);
var custom   = GM_getValue("custom"   ,0);

// Shapes and Sizes
var shapes = {square:1,page:1.3,picture:0.75};
var sizes = {small:80,medium:120,large:160};

// Keyboard Commands
var commands = {
  exit:{esc:27},
  next:{right:39,down:40,space:32},
  prev:{left:37,up:38,back:8},
  open:{enter:13}
};

// Google Gallery
$.fn.at = $.fn.appendTo;
var debug = /#debug/i.test(window.location.hash||"");

// Debugging Alerts
var alerts = $('<ul id="alerts">').at("body");
var alertstimer=0;
var alert = function(msg,type){
  if(debug) {
    var li = $("<li>").html(msg+'').at(alerts);
    if(type) { alerts.find("."+type).remove(); li.addClass(type); }
    if(alertstimer) clearTimeout(alertstimer);
    alertstimer = setTimeout(function(){
      $().one("mousemove",function(){
        alerts.find("li").remove();
      });
    },2000);
  }
};


// Icons
var loadingIcon = new Image();
loadingIcon.src = "data:image/png;base64,\
R0lGODlhEAAQAPEAAP///wAAADY2NgAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5\
BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAACLYSPacLtvkA7U64qGb2C6gtyXmeJ\
HIl+WYeuY7SSLozV6WvK9pfqWv8IKoaIAgAh+QQACgABACwAAAAAEAAQAAACLYSPacLtvhY7DYhY\
5bV62xl9XvZJFCiGaReS1Xa5ICyP2jnS+M7drPgIKoaIAgAh+QQACgACACwAAAAAEAAQAAACLISP\
acLtvk6TE4jF6L3WZsyFlcd1pEZhKBixYOie8FiJ39nS97f39gNUCBEFACH5BAAKAAMALAAAAAAQ\
ABAAAAIshI9pwu2+xGmTrSqjBZlqfnnc1onmh44RxoIp5JpWN2b1Vdvn/ZbPb1MIAQUAIfkEAAoA\
BAAsAAAAABAAEAAAAi2Ej2nC7b7YaVPEamPOgOqtYd3SSeFYmul0rlcpnpyXgu4K0t6mq/wD5CiG\
gAIAIfkEAAoABQAsAAAAABAAEAAAAiyEj2nC7b7akSuKyXDE11ZvdWLmiQB1kiOZdifYailHvzBk\
o5Kpq+HzUAgRBQA7AAAAAAAAAAAA";
var blankIcon = new Image();
blankIcon.src = "data:image/png;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAEBMgA7";

// CSS
var css = "\
body { margin:0; width:100%; height:100%; }\
#googlegallery { display:block; width:100%; height:100%; overflow-x:hidden; overflow-y:scroll; position:relative; }\
#outer { margin:3px 8px; }\
#options { float:right; margin-top:-16px; }\
#options a { font-size:9pt; color:#00C; outline:none; }\
#search { display:none; }\
#settings { position:fixed; top:0; left:50%; display:none; margin:60px 0 0 -150px; width:300px; border:10px solid rgba(0,0,0,0.6); -moz-border-radius:8px; text-align:center; }\
#settings .inner { background:#FFF; padding:8px; }\
#settings h2 { margin:-4px 0 8px; text-align:center; font:14pt Georgia; }\
#settings tr { vertical-align:top; text-align:left; font-size:11pt; }\
#settings td:first-child { text-align:right; padding-top:3px; font-weight:bold; }\
#settings ul { overflow:auto; padding:0; margin:0; }\
#settings li { float:left; list-style:none; padding:0 6px 1px; margin:2px; -moz-border-radius:2px; cursor:pointer; }\
#settings li.selected { background:#66C; color:#FFF; cursor:default; }\
#settings p { margin:1px 0 3px 0; }\
#settings label { margin:0 4px 0 8px; }\
#settings input { width:40px; font:10pt Tahoma; text-align:center; border:1px solid #CCC; -moz-border-radius:3px; background:#F6F6F6; padding:0 2px 1px; }\
#ImgContent { display:none; }\
#images { display:block; width:100%; overflow:hidden; }\
#images > .outer { margin:10px; }\
#images img { border:none; }\
#images a { margin:2px; border:1px solid #CCC; float:left; background:#EEE; width:"+(width+2)+"px; height:"+(height+2)+"px; overflow:hidden; outline:none; }\
#images img { margin:0; position:absolute; top:50%; left:50%; }\
#images img.loading { margin:-8px 0 0 -8px; }\
#images span { border:1px solid #FFF; display:block; width:"+width+"px; height:"+height+"px; overflow:hidden; position:relative; }\
#overlay2 { position:fixed; top:0; left:0; background:rgba(255,255,255,0.6); width:100%; height:100%; display:none; }\
#overlay { display:none; text-indent:0; position:absolute; top:0; left:0; width:100%; height:100%; }\
#overlay table img { display:-moz-inline-box; margin:3% -10px; max-width:90%; background:transparent url("+loadingIcon.src+") no-repeat 4px 4px; border:10px solid rgba(0,0,0,0.6); -moz-border-radius:8px; }\
#overlay table { width:100%; height:100%; table-layout:fixed; }\
#overlay tbody { margin:0; }\
#overlay tr { vertical-align:middle; }\
#overlay td { text-align:center; overflow:hidden; }\
#resize { background:#FFF; padding:8px; position:fixed; bottom:0px; right:16px; }\
#ajax { background:#FFF; padding:8px; position:fixed; top:0; left:0; margin:20px 0 0; }\
#alerts { position:fixed; top:-16px; left:50%; padding:0; }\
#alerts li { list-style:none; padding:2px 8px; margin:0 50% 0 -50%; text-align:center; background:#FFF; }\
#alerts li:first-child { padding-top:8px; }\
#alerts li:last-child { padding-bottom:8px; }\
#ajaxdone { font:14pt Arial; text-align:center; padding:30px 0 0; }\
.GGoverlay #overlay2 { display:block; }\
.GGoverlay #overlay { display:block; }\
.GGoverlay #googlegallery { overflow:hidden; }\
.GGautoload #navbar { display:none; }\
.GGcustom #gbar, .GGcustom .gbh, .GGcustom #guser, .GGcustom #sft, .GGcustom .t, .GGcustom center { display:none; }\
.GGcustom #outer { margin:8px; }\
.GGcustom #ImgCont { padding-top:20px; }\
.GGcustom #ImgCont > * { display:none; }\
.GGcustom #ImgCont > #images { display:block; }\
.GGcustom #ImgCont > #navbar { display:block; }\
.GGcustom #ImgCont > #options { display:block; width:100%; }\
.GGcustom #ImgCont > #options a { float:right; margin-top:10px; }\
.GGcustom #ImgCont #search { display:block; float:left; font:14pt Georgia; margin:-3px 3px 5px; padding:0 4px 2px; border:1px solid #FFF; outline:1px solid #CCC; background:#F6F6F6; color:#111; width:40%; }\
.GGcustom #ImgCont #search.watermark { color:#AAA; }\
.GGcustom #ImgCont #images { margin-bottom:0; }\
.GGcustom #ImgCont #ajaxdone { display:block; margin-top:-20px; padding-bottom:10px; }\
.GGautoload.GGcustom #ImgCont > #navbar { display:none; }\
.GGdark.GGcustom #ImgCont > #navbar { display:none; }\
.GGdark #overlay2 { background:rgba(0,0,0,0.9); }\
.GGdark #overlay table img { background-color:transparent; border-color:rgba(255,255,255,0.1); -moz-border-radius:0; }\
.GGdark.GGcustom { background:#111; }\
.GGdark.GGcustom #images a { background-color:#222; border-color:#333; }\
.GGdark.GGcustom #images span { border-color:#333; }\
.GGdark.GGcustom #ImgCont #ajaxdone { color:snow; }\
.GGdark.GGcustom #ImgCont #search { border-color:#333; outline-color:#333; background:#222; color:snow; }\
.GGdark.GGcustom #ImgCont #search.watermark { color:#666; }\
.GGdark.GGcustom #ImgCont > #options a { color:#888; }\
.GGdark.GGcustom #googlegallery { padding-right:16px; }\
.GGdark.GGcustom { overflow-x:hidden; }\
";
$('<style type="text/css">').html(css).at('head');

// Initialize variables
var body = $(document.body);
var scripts = $("script");
body.wrapInner('<div id="googlegallery"><div id="outer"></div></div>');
var gg = $("#googlegallery");
var images = $('<div id="images">');
$("#ImgContent").after(images);
var overlayitem=null,preloading=false;
var overlay2 = $('<div id="overlay2">').at("body");
var overlay = $('<div id="overlay"><table cellspacing="0" cellpadding="0"><tr><td><img/></td></tr></table></div>').at("body");
if(dark) body.addClass("GGdark");
if(autoload) body.addClass("GGautoload");
if(custom) body.addClass("GGcustom");

// Overlay close
var overlayclose = function(){
  body.removeClass("GGoverlay");
  overlayitem=null;
  preloading=false;
  if(approx) setTimeout(function(){ checkresize(true); },1);
  return false;
};
overlay2.click(overlayclose);
overlay.click(overlayclose);

// Resize an image to fit thumbnail
var thumbWidth=0;
var thumbHeight=0;
$.fn.resizeImg = function(){
  $(this).each(function(){ 
    var [ow,oh] = $(this).attr("rel").split("x");
    var w = thumbWidth||width;
    var h = thumbHeight||height;
    if(oh/ow>h/w) h = Math.round((w/ow)*oh);
    else w = Math.round((h/oh)*ow);
    $(this).css({height:h+'px',width:w+'px',marginLeft:-w/2+'px',marginTop:-h/2+'px'});
  });
};

// Show overlay when image clicked
var showimg = function(e){
  if(e&&e.ctrlKey) return true;
  var self=this;
  setTimeout(function(){
    overlayitem=$(self).closest("a");
    body.addClass("GGoverlay");
    overlay.find("td").empty();
    var p = $("<p>").at($("td",overlay));
    $("<img>").at(p).error(function(){
      this.src=$("img",self)[0].src;
      $(this).css({width:$("img",self).width()*2});
    }).load(function(){ $(this).addClass("done"); }).attr({src:self.rel});
  },1);
  return false;
};

// Setup
var num = 21;
var url = window.location.href;
var base = url.match(/(https?:\/\/images\.google\..*?\/images)\?/i); base=base?base[1]:"";
var query = url.match(/(?:\?|&)q=(.*?)(?:&|#|$)/i); query=query?query[1]:"";
var start = url.match(/(?:\?|&)start=(\d*?)(?:&|#|$)/i); start=start?+start[1]:0;
var check = 0;
var windowWidth = 0;
var windowHeight = 0;
var scrollTop = -1;

// Settings menu
var settings = $('<div id="settings">').at(body);
$("<h2>Options</h1>").at(settings);
(function(){
  // Option
  var opt = function(list,df,fn,id){
    var ul = $("<ul>");
    if(id) ul.attr({id:id});
    $.each(list,function(name,value){
      var li = $("<li>").at(ul).text(name)
      .click(function(){
        ul.find("li").removeClass("selected");
        $(this).addClass("selected");
        fn.call(this,value); });
      if(value==df) li.addClass("selected");
    });
    return ul;
  };
  // Input option
  var optbox = function(name,df,fn,id){
    var box = $("<label>").text(name);
    var input = $('<input type="text"/>').val(df).attr({id:id});
    input.keydown(function(e){
      var v = +input.val();
      switch(e.keyCode) {
        case 38: input.val(v+1); break;  //up
        case 40: input.val(v-1); break;  //down
        case 33: input.val(v+10); break; //pageUp
        case 34: input.val(v-10); break; //pageDown
        default: break;
      }
      setTimeout(function(){
        var shaped=false;
        if(name=="width" && $("#optionShape li.selected").length) shaped=true;
        else $("#optionShape li").removeClass("selected");
        $("#optionSize li").removeClass("selected");
        fn.call(input[0],input.val(),shaped);
        checkresize(true);
      },1);
    });
    return box.add(input);
  };
  // Full option
  var fullopt = function(title,list,df,fn){
    var tr = $("<tr>");
    $("<td>").at(tr).text(title);
    var td = $("<td>").at(tr);
    opt(list,df,fn).at(td);
    return tr;
  };
  var set = function(v,c){ body[(v?"add":"remove")+"Class"](c); };
  var tr,td,table = $("<table>").at(settings);
  tr = $("<tr>").at(table);
  $("<td>Thumbnail</td>").at(tr);
  td = $("<td>").at(tr);
  var setwidth = function(v,both){
    var r = height/width;
    v = Math.round(v);
    $("#optionWidth").val(v);
    width=v;
    GM_setValue("width",width);
    if(both) setheight(width*r);
  };
  var setheight = function(v){
    v = Math.round(v);
    $("#optionHeight").val(v);
    height=v;
    GM_setValue("height",height);
  };
  var shape = function(v){
    setheight(width*v);
    checkresize(true);
  };
  var size = function(v){
    var r = height/width;
    setwidth(v);
    setheight(r*v);
    checkresize(true);
  };
  opt(shapes,height/width,shape,"optionShape").at(td);
  opt(sizes,width,size,"optionSize").at(td);
  var p = $("<p>").at(td);
  optbox("width",width,setwidth,"optionWidth").at(p);
  optbox("height",height,setheight,"optionHeight").at(p);
  var ap = function(v){ approx=v; GM_setValue("approx",v); checkresize(true); };
  opt({exact:false,approx:true},approx,ap).at(td);
  var bg = function(v){ dark=v; set(v,"GGdark"); GM_setValue("dark",v); };
  var al = function(v){ autoload=v; set(v,"GGautoload"); GM_setValue("autoload",v); checkresize(true); };
  var la = function(v){ custom=v; set(v,"GGcustom"); GM_setValue("custom",v); };
  fullopt("Background",{light:false,dark:true},dark,bg).at(table);
  fullopt("Autoload",{paged:false,continuous:true},autoload,al).at(table);
  fullopt("Layout",{normal:false,fullscreen:true},custom,la).at(table);
})();
$("<button>Close</button>").at(settings)
.click(function(){ settings.hide(); return false; });
settings.wrapInner('<div class="inner">');

// Search box
var options = $('<div id="options">'); images.before(options);
$('<input id="search" class="watermark">').val(query).at(options)
.focus(function(){ if($(this).is(".watermark")) { this.value=""; $(this).removeClass("watermark"); } })
.blur(function(){ if(!this.value) { this.value=query; $(this).addClass("watermark"); } })
.keydown(function(e){
  if(e.which==13 && !$(this).is(".watermark")) {
    window.location.href = base+'?q='+$(this).val();
    $(this).addClass("watermark").blur();
  }
});
$('<a href="#settings">GoogleGallery Settings</a>').at(options)
.click(function(){ settings.show(); return false; });


// Ajax scrolling
var ajaxdone=!!$("td.j").length;
var checkAjax = function(ok){
  if(scrollTop<-1) return;
  var scroll = gg[0].scrollTop;
  if((!ok && scroll==scrollTop) || ajaxdone) return;
  var last = $("#images a:visible:last").offset().top;
  if(debug) {
    $("#ajax").remove();
    $('<p id="ajax">').html(Math.round(last)+" > "+Math.round(windowHeight*1.3)).at(gg); }
  if(last < windowHeight*1.5 ) {
    var w = Math.round(windowWidth / ((thumbWidth||width)+8));
    var h = Math.round(windowHeight*2 / ((thumbHeight||height)+8));
    var n = Math.min(Math.ceil(w*h/num),10);
    alert("Loading "+n+" pages ("+w+"&times;"+h+")","loadingajax");
    scrollTop = -n-1;
    for(;n-->0;start<1000) {
      start+=num;
      $.get(base,{q:query,start:start},parseajax);
    }
  } else scrollTop = scroll;
}

// Hide last row
var lastrow = function(){
  if(!windowWidth) return;
  var n = $("a",images).show().length;
  var w = Math.round(windowWidth / ((thumbWidth||width)+8));
  var m = n%w;
  alert(m+" images in last row","row");
  $("a:gt("+(n-m-1)+")",images).hide();
};

// Resize thumbnails
var resize = function(){
  if(body.is(".GGoverlay")) return;
  var n = Math.round(windowWidth / (width+8));
  thumbWidth = (windowWidth/n) - 8.01;
  thumbHeight = height/width * thumbWidth;
  if(!approx) { thumbWidth = width; thumbHeight = height; }
  var css = "\
    #images a { width:"+(thumbWidth+2)+"px; height:"+(thumbHeight+2)+"px; }\
    #images span { width:"+thumbWidth+"px; height:"+thumbHeight+"px; }";
  $("#resizeStyle").remove();
  $('<style id="resizeStyle" type="text/css">').html(css).at('head');
  $("a img",images).resizeImg();
  lastrow();
};

// Resize window
var checkresize = function(force) {
  var w = $(window).width();
  var h = $(window).height();
  if(check==w*h&&!force) return autoload?checkAjax(false):true;
  check=w*h;
  windowHeight=h;
  var o = gg.find("#outer").css({width:"auto"});
  windowWidth = o.innerWidth();
  if(dark&&custom) windowWidth+=16;
  if(debug) {
    $("#resize").remove();
    $('<p id="resize">').html(windowWidth+" &times; "+windowHeight).at(gg); }
  if(approx||force) { o.css({width:windowWidth+"px"}); resize(); }
  if(autoload) checkAjax(true);
};
setInterval(function(){ checkresize(false); },200);


// Overlay Navigation Controls
var controls = {
  exit:overlayclose,
  open:function(){
    if(overlayitem) GM_openInTab(overlayitem[0].href)
  },
  prev:function(){
    var p = overlayitem.prev();
    if(p.length) {
      showimg.call(p[0]);
      overlayitem=p;
      var o = p.offset().top;
      if(o<0) gg.scrollTop(o+gg.scrollTop());
    }
    preloading=true;
    p = p.prev();
    if(p.length) (new Image).src=p[0].rel;
  },
  next:function(){
    var n = overlayitem.next();
    if(n.length && n.is(":visible")) {
      showimg.call(n[0]);
      overlayitem=n;
      var o = n.offset().top+(thumbHeight||height)+8;
      if(o>windowHeight)
        gg.scrollTop(o-overlay2.height()+gg.scrollTop());
      if(!preloading) {
        preloading=true;
        var n2 = n.next();
        if(n2.length) (new Image).src=n2[0].rel;
        n2 = n2.next();
        if(n2.length) (new Image).src=n2[0].rel;
      }
      n = n.next().next().next();
      if(n.length) (new Image).src=n[0].rel;
    }
  }
};

// Bind command keys
$().keydown(function(e){
  if(!body.is(".GGoverlay")) return;
  var key,cmd;
  $.each(commands,function(c){
    $.each(this,function(k){
      if(this==e.which) { key = k; cmd = c; }
    });
  });
  key = cmd?key+" = "+cmd:e.which+'';
  alert(key,"key");
  if(cmd) controls[cmd].call(overlay);
  if(cmd||debug) return false;
});

// Add ajax image
var addimg = function(match,url,u2,key,src,width,height,title,u8,u9,
                      size,type,source,u13,u14,google,u16,u17,u18){
  if(!match) return false;
  var a = $('<a target="_blank">').at(images);
  var span = $('<span>').at(a);
  var thumb = google+"?q=tbn:"+key+src;
  var img = $('<img>').attr({src:blankIcon.src})
  .at(span).attr({rel:width+"x"+height});
  img.attr({src:thumb}).load(function(){ img.resizeImg(); });
  var link = url.match(/imgrefurl?(?:=|\\x3d)(.*?)(?:&|\\x26|$)/i)[1];
  a.attr({href:link,rel:src}).click(showimg);
  return true;
};

// Regexp to parse html
var rep = /"(.*?)",/.source;
var reg = /\[/.source;
for(var i=16; i-->0;) reg+=rep;
reg+= /(\[.*?\]),"(.*?)"\],?/.source;
reg = new RegExp(reg,'g');
var results = /dyn\.setResults\((.*?)\);/i;

// Parse ajax response
var parseajax = function(html){
  var n=num;
  if(approx) $("a:hidden",images).show();
  var m=(html.match(results)||[null])[0];
  if(m) while(addimg.apply({self:this,n:(num-n)},reg.exec(m))&&--n);
  if(!ajaxdone && /id=ofr|<td\s+class=j/.test(html)) {
    ajaxdone=true;
    images.after('<div id="ajaxdone">All results returned.</div>');
  }
  scrollTop++;
  check=0;
  if(approx) lastrow();
  if(debug) alert($("a",images).length+" images total","imagetotal");
};

// Parse Current Page
scripts.each(function(){
  var html = $(this).html();
  if(/dyn\.setResults/.test(html))
    parseajax(html);
});

/* The regex matches the following
dyn.Img(
 1 "/imgres?imgurl=http://www.beachtownpress.com/db5/00415/beachtownpress.com/_uimages/beach7.jpg&imgrefurl=http://www.beachtownpress.com/&usg=__BX3cUbhu7hRrgcyKF2qJtJ-YPsY=&h=768&w=1024&sz=158&hl=en&start=1&sig2=Sp6-03VXzakJ7Y22WJZ0kg",
 2 "",
 3 "XSiffMZ6ERkUNM:",
 4 "http://www.beachtownpress.com/db5/00415/beachtownpress.com/_uimages/beach7.jpg",
 5 "150",
 6 "113",
 7 "\x3cb\x3eBEACH\x3c/b\x3e TOWN PRESS books available:",
 8 "",
 9 "",
10 "1024 x 768 - 158k",
11 "jpg",
12 "www.beachtownpress.com",
13 "",
14 "",
15 "http://tbn3.google.com/images",
16 "1",
17 [],
18 0);
*/

//vim: set foldmethod=expr foldexpr=getline(v:lnum)=~'^\\s*$'&&getline(v:lnum+1)=~'\\S'?'<1':1
