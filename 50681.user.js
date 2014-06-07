// ==UserScript==
// @name           Popup Nico Dict for Iframe
// @namespace      http://gigi-net.net
// @include        http://dic.nicovideo.jp/*
// @include        http://www.nicovideo.jp/watch/*
// @author         giginet modified Arc Cosine
// @version        2.0
// ==/UserScript==
(function(){
/////////////////////////////
//CONFIG
/////////////////////////////
//※デフォルトから変更した場合の動作保証は致しません
//取得する記事の文字数
ARTICLE_LENGTH=1000;
//ポップアップの横の長さ（ピクセル）
POPUP_WIDTH=500;

//ポップアップの縦の長さ（ピクセル）
POPUP_HEIGHT=300;

    /** simple version of $X
     * $X(exp);
     * $X(exp, context);
     * @source http://gist.github.com/3242.txt
     */
   var $X = function (exp, context) {
      context || (context = document);
      var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
          context.namespaceURI || document.documentElement.namespaceURI || "";
        });
      var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
          case XPathResult.STRING_TYPE : return result.stringValue;
          case XPathResult.NUMBER_TYPE : return result.numberValue;
          case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
          case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            // not ensure the order.
            var ret = [], i = null;
            while (i = result.iterateNext()) ret.push(i);
            return ret;
        }
      return null;
    }

    var init = function(){
      if( checkOption() ){
        createNicoDic();
      }else{
        var w = typeof unsafeWindow != "undefined" ? unsafeWindow : window;
        if( w != window.parent ){
          if( location.href.search(/dic\.nicovideo\.jp/) != -1 ){
            createNicoDic();
          }
        }

        popup();
      }
    };

    var createNicoDic = function(){
        document.getElementById("container").style.display = "none";
        //clear div
        var cap = document.getElementsByTagName("h1")[0].innerHTML;
        var desc = document.getElementById("article");
        var article= desc.innerHTML;

        //置き換え用の適当な文字列生成
        var rand_st ="st"+(new Date()).getTime();
        var rand_ed ="ed"+(new Date()).getTime();

        //ページメニューを消去
        article =article.replace(/<div id..page-menu.>.*<.div>/i,"");

        //見出しを適当な文字に変換
        article =article.replace(/<h2.*?>/gm,rand_st);
        article =article.replace(/<.h2>/gm,rand_ed);
        //ページメニューを消去
        article =article.replace(/<div id..page-menu.>.*<.div>/,"");
        //タグを全消去
        article =article.replace(/<.*?>/mg,"");
        //適当な文字を見出しに戻す
        article =article.replace(new RegExp(rand_st,"gm"),"<br>【");
        article =article.replace(new RegExp(rand_ed,"gm"),"】<br>");
        //空の見出しを削除
        article =article.replace(/<br>【.*】<br>\s*<br>【/gm,"【");

        showText = article.substring(0,ARTICLE_LENGTH-1);
        if(article.length>=ARTICLE_LENGTH){
          showText +="...";
        }
        //タイトルを追加
        showText ="<h1 style='font-size:22px;line-height: 1.2em;'>"+cap+"</h1>"+showText;
        var descDiv = document.body.appendChild(document.createElement("div"));
        descDiv.style.display = "block";
        descDiv.style.fontSize="10pt";
        descDiv.style.fontFamily="sans-serif";
        descDiv.style.textAlign="left";
        descDiv.style.lineheight="110%";
        descDiv.style.color="#333333";
        descDiv.style.paddingLeft="5px";
        descDiv.style.paddingRight="5px";
        descDiv.style.height = POPUP_HEIGHT + "px";
        descDiv.style.background = "cornsilk";
        descDiv.innerHTML = showText;
    };
    var popup = function(){
      var loc = location.href.match(/nicovideo\.jp\/watch/);
      if(loc){
        var flvplayer = document.getElementById("flvplayer");
        flvplayer.setAttribute("wmode", "transparent");
        flvplayer.style.display = "none";
        setTimeout(function() { flvplayer.style.display = ""; }, 10);
        var iconList = $X('//div[@id="video_tags"]/p[@class="tag_txt"]/nobr/a/img[@class="txticon"]');
        for( var i=0, l=iconList.length; i<l; i++ ) (function(list){
          var link = list.parentNode.href;
          list.parentNode.removeAttribute("title");
          list.addEventListener( "mouseover", function(e){ showTips(e,link ); }, false ); 
          list.addEventListener( "mouseout", function(){ hideTips(); }, false );
        })(iconList[i]);
      }else{
        var aList = $X('//a');
        for( var i=0, l=aList.length; i<l; i++ )(function(list){
          var link = list.href;
          list.addEventListener( "mouseover", function(e){ showTips(e,link ); }, false ); 
          list.addEventListener( "mouseout", function(){ hideTips(); }, false );
        })(aList[i]);
      }
    };
    var checkOption = function(){
      var loc =location.href.match(/popup=true/);
      return ((!loc) ? false : true);
    };

    var showTips = function(e,link){
      var tip = document.getElementById("nDicIframe");
      if( tip != null ){ hideTips(); };
      var scTop = (document.scrollTop||document.documentElement.scrollTop);
      tip = document.createElement("div");
      tip.id = "nDicIframe";
      tip.style.top = e.pageY + 20 +"px";
      tip.style.left = e.pageX + 10 + "px";
      tip.style.width = POPUP_WIDTH + "px";
      tip.style.height = POPUP_HEIGHT + "px";
      tip.style.zIndex = "10002";
      tip.style.position = "absolute";
      tip.style.opacity = "0";
      var opTimer = function(){
          var interval = setInterval( function(){
          if( tip.style.opacity >= 1.0 ){
            clearInterval(interval);
            interval=null;
          }
          var newop = parseFloat(tip.style.opacity) + 0.1;
          tip.style.opacity = newop;
          }, 30 );
      };
      opTimer();
      tip.addEventListener( "click", hideTips, false );

      document.body.appendChild(tip);

      var iframe = tip.appendChild(document.createElement("iframe"));
      iframe.src = link + "#popup=true";
      iframe.width = POPUP_WIDTH + "x";
      iframe.height= POPUP_HEIGHT + "px";
      iframe.frameborder = "0";
      iframe.scrolling = "no";
      iframe.style.zIndex = "10000";
   
      var readingDiv = tip.appendChild(document.createElement("div"));
      readingDiv.style.zIndex = "10005";
      readingDiv.style.top = "0px";
      readingDiv.style.width = POPUP_WIDTH + 2 + "px";
      readingDiv.style.height = POPUP_HEIGHT + 2 + "px";
      readingDiv.style.position = "absolute";
      readingDiv.style.background = "#fff8dc";
      readingDiv.style.textAlign = "left";
      readingDiv.style.fontFamily="sans-serif";
      readingDiv.style.paddingLeft = "18px";
      readingDiv.appendChild(document.createTextNode("読み込み中……"));

      iframe.addEventListener("load", function(){
          readingDiv.style.display = "none";
      }, false);
 
    };
    var hideTips = function(){
      var tip = document.getElementById("nDicIframe");
      tip.parentNode.removeChild(tip);
    }

 //fire
 var timer = setTimeout(init,1000);
})();
