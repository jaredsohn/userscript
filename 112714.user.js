// ==UserScript==
// @name           New_Amazon_ASIN_NODE
// @namespace      http://www.thaiseoboard.com/
// @description    Show ASIN, NODE from Amazon
// @include        http://www.amazon.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js
// @icon           http://www.thaiseoboard.com/Themes/thaiseoboard_rev2009/images/on.gif
// ==/UserScript==

(function() {
   // short link node   http://www.amazon.com/b/?node=3733851&page=1
   // short link asin   http://www.amazon.com/dp/B000BK9BXG/?tag=abc-20

   function substrc(str, from, to){
      var start, end;
      start = str.indexOf(from);
      if(start < 0) start = 0;
      else start = start + from.length;
      end = str.lastIndexOf(to);
      if(end < 0) end = str.length;
      return str.substring(start, end);
   }   
   function substrcll(str, from, to){
      var start, end;
      start = str.lastIndexOf(from);
      if(start < 0) start = 0;
      else start = start + from.length;
      end = str.lastIndexOf(to);
      if(end < 0) end = str.length;
      return str.substring(start, end);
   }   
   
   function amazon_getasin(){
      var data = new Array();   // data[].asin, data[].name
      var select = ".productTitle";
      if($(select).length <= 0) select = ".title";
      $(select).find("a:first").each(function(i){
         var asin, name;
         asin = $.trim($(this).attr("href"));
         asin = substrc(asin, "/dp/", "/ref=");
         name = $.trim($(this).attr("href"));
         name = substrc(name, "amazon.com/", "/dp/");
         name = name.replace(/-/g, "+");
         var newdata = {};
         newdata.asin = asin;
         newdata.name = name;
         data.push(newdata);
      });
      return data;
   }
   function amazon_showasin(asin){
      var select = ".productTitle";
      if($(select).length <= 0) select = ".title";
      $(select).find("a:first").each(function(i){
         if(i<asin.length){
            googlestr = "http://www.google.com/#hl=en&gl=us&source=hp&q=" + asin[i].name + "&num=10&aq=f&fp=e8d6ef47431c6a4a";
            str = " [" + asin[i].asin + "]";
            str += ' <a href="' + googlestr + '">[GG]</a>';
         }
         str = "<span class='amazon_asin_process'>" + str + "</span>";
         $(this).after(str);
      });
   }
   function amazon_getnode(){
      var data = new Array();   // data[](node) // thisnode = data[data.length-1]
      var thisnode;
      $("h1#breadCrumb a").each(function(i){
         var node = "";
         node = $.trim($(this).attr("href"));
         node = substrcll(node, "n%3A", "&ie=");
         if(node.indexOf("=")>0) node = substrc(node, "", "&bbn");
         data.push(node);
      });
      thisnode = $("form#hms-response-form input:first").val();
      data.push(thisnode);
      return data;
   }
   function amazon_shownode(node){
   $("h1#breadCrumb a").each(function(i){
         if(i<node.length){
            str = "[" + node[i] + "]";
         }
         str = "<span class='amazon_node_process'>" + str + "</span>";
         $(this).after(str);
      });
      str = "[" + node[node.length-1] + "]";
      str = "<span class='amazon_node_process'>" + str + "</span>";
      $("h1#breadCrumb").append(str);
   }
   
   function amazon_asin_process(){
      if($("span.amazon_asin_process").length<=0){
         var asin = amazon_getasin();
         amazon_showasin(asin);
      }
   }
   function amazon_node_process(){
      if($("span.amazon_node_process").length<=0){
         var node = amazon_getnode();
         amazon_shownode(node);
      }
   }
   function main(){
      setInterval(amazon_asin_process, 2000);
      setInterval(amazon_node_process, 2000);
   }
   main();
})();

GM_registerMenuCommand("New_Amazon_ASIN_NODE", function(){
   alert("...");
});