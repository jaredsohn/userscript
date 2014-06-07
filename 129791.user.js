// ==UserScript==
// @name           google_url
// @namespace      c:\
// @description    get google url
// @include        google.com
// ==/UserScript==

var include_jq = document.createElement('script');
include_jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
include_jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(include_jq);
function include_jq_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(include_jq_wait, 100); }
   else { $ = unsafeWindow.jQuery; main(); }
}
include_jq_wait();

// --- Coding Here --- //
function CreateBox(){
   $("<div id='jqprocess'>TSB_GetUrl</div>").prependTo(document.body);
   $("div#jqprocess").css({
      "color" : "blue",
      "border" : "outset blue 2px",
      "width" : "100px",
      "text-align" : "center",
      "cursor" : "pointer",
      "background-color" : "white"
   });
   $("div#jqprocess").hover(function(even){
      $("div#jqprocess").css("background-color","gray");
   }, function(even){
      $("div#jqprocess").css("background-color","white");
   });
   $("div#jqprocess").click(function(even){
      htmlPopup();
   });
}

function get_google(){
   doc = document;
   output = "";
   str_ret = "google null!";
   num = 0;
   $(doc).find("h3").each(function(i) {
      $(this).find("a").each(function(i) {
         str = $(this).attr("href");
         if(str!=null){
            if(str.substring("http://".length, 0)=="http://") {
               num++;
               output += str + "<br />\n";
            }
         }
      });
   });
//   str_ret = "google : [" + num + "]<br />\n" + output;
   str_ret = output;
   return str_ret;
}

function htmlPopup(){
   var data = "";
   if (window.location.href.indexOf("www.google")!=-1) data = get_google();
   var html = "";
   var generator = window.open('', 'name', 'location=1,status=1,scrollbars=1,height=auto,width=800');
   html = "<html><head><title>Popup</title></head><body><div>" + data + "</div></body></html>";
   html = data;
   generator.document.write(html);
}

function main(){
   if (window.location.href.indexOf("www.google")!=-1) CreateBox();
}