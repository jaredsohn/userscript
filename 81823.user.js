// ==UserScript==
// @name           NicoCommentsInTwitter
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://www.nicovideo.jp/watch/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
/*
  Copyright (c) 2010 John Resig, http://jquery.com/

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//-------------------
var NG_TWITTER_IDS = [
  "xxx",
  "yyy",
  "zzz"
];

var THISCOLOR = "#FFE4E1";
var THISFONTSIZE = "10px";
var SHOW_USER_NAME = false;

//-------------------
var ngtwids = (function(){
  var res = {};
  for(var i = 0, x; x = NG_TWITTER_IDS[i]; i++){
    res[x] = 1;
  }
  return res;
})();

var Video = unsafeWindow.Video;
var j = jQuery;

GM_xmlhttpRequest({
  "method":"GET",
  "url":'http://search.twitter.com/search.atom?q=%23'+Video.id+'&locale=ja&rpp=100',
  "onload":
    function(response) {
      var res = [];
      var data = response.responseText;
      var entrysj = j(data).find("entry");
      entrysj.each(
          function(){GM_log("#");
            var thisj = j(this);
            var content = thisj.find("title").text().toString();
            var content2 = removeInfo(content);
            var twitterid = thisj.find("author").find("uri").text().replace(/^http:\/\/twitter\.com\//,"");
            var link = thisj.find("link").eq(0).attr("href");
            if(!ngtwids[twitterid]){
              res.push({"body":content2, "twitterid":twitterid, "link":link});
            }
          }
      );

      //table of Twitter comments 
      var tablej = j("<table style='font-size :10px; background-color: "+THISCOLOR+"' ></table>");
      tablej.hide();
      for(var i = 0, r; r = res[i]; i++){
        var body = (SHOW_USER_NAME?r.twitterid+":":"")+r.body;
        tablej.append("<tr><td><a target='_blank' href='"+r.link+"'><pre style='margin:0px;'>"
          +body+"</pre></a></td></tr>");
      }
      var footerj = $("#WATCHFOOTER");
      footerj.find("p").eq(0).after(tablej);
      
      //menu
      var menuj = j("div#WATCHFOOTER p").eq(0);
      var buttonj = j("<a target='_blank' href=',' style='background-color:"+THISCOLOR+"; '></a>");
      var menustr = "";
      if(res.length == 0){
        menustr = "Twitter Comments"+"(no comment)";
        buttonj.click(function(){return false;});
      }
      else{
        menustr = "Twitter Comments("+res.length+")";
        buttonj.click(function(){tablej.toggle();return false;});
      }
      buttonj.text(menustr);
      buttonj.dblclick(function(){open("http://search.twitter.com/search?q=%23"+Video.id,"_blank");});
      menuj.append("|");
      menuj.append(buttonj);
      menuj.append("|");
    }
});


function removeInfo(str){
  //remove title
  str = str.replace(new RegExp(Video.title+" \\(\\d+\\:\\d\\d\\)","g"),"");

  //remove url of nico.ms
  str = str.replace(new RegExp("http://nico.ms/"+Video.v,"g"),"");

  //remove #(video.id)
  var reg = new RegExp("#"+Video.id+"[ ]?","g");
  str =  str.replace(reg,"");
  
  //#nicovideo ??
  str = str.replace(/#nicovideo[ ]?/g, "");

  //remove twitter userid
  str = str.replace(new RegExp("@[a-zA-Z0-9]+","g"),"");
  
  //trim
  str = str.replace(/^\s+/gm,"").replace(/\s+$/gm,"");
  
  return str;
}

