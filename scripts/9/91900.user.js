// ==UserScript==
// @name           nisesakura_scripter
// @namespace      yktmt.com
// @include        https://twitter.com/
// @include        http://twitter.com/
// @resource       surface0  http://yktmt.com/ukagaka/surface0.png
// @resource       surface1  http://yktmt.com/ukagaka/surface1.png
// @resource       surface2  http://yktmt.com/ukagaka/surface2.png
// @resource       surface3  http://yktmt.com/ukagaka/surface3.png
// @resource       surface4  http://yktmt.com/ukagaka/surface4.png
// @resource       surface5  http://yktmt.com/ukagaka/surface5.png
// @resource       surface6  http://yktmt.com/ukagaka/surface6.png
// @resource       surface7  http://yktmt.com/ukagaka/surface7.png
// @resource       surface8  http://yktmt.com/ukagaka/surface8.png
// @resource       surface9  http://yktmt.com/ukagaka/surface9.png
// @resource       surface10 http://yktmt.com/ukagaka/surface10.png
// @resource       surface11 http://yktmt.com/ukagaka/surface11.png
// @resource       surface12 http://yktmt.com/ukagaka/surface12.png
// ==/UserScript==

var surface,baloon;
var lock = false;
var done = "";

window.addEventListener("load", function(e){

(function addEmStyle() {
  if(document.getElementsByClassName("signin").length > 0){ return; }
  var nStyle = document.createElement('style');
  nStyle.type = 'text/css';
  var cssText = document.createTextNode(
    '.uka_baloon { text-align: left; overflow: auto; font-size: 16px; border: solid 2px #333333; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; position: fixed; text-decoration: none; padding: 3px 5px; width: 200px; height: 150px; zoom: 1; -webkit-transition-property: opacity; -webkit-transition-duration: 1s; -webkit-transition-timing-function: ease-in-out;  background-color: white; z-index: 21; opacity: 0.8; } .uka_surface {position: fixed; bottom: 0; z-index: 21; background-position: center 0px; background-repeat: no-repeat; }'
     + '#uka_sh {height: 400px; width: 300px; right: 0;} #uka_su {height: 280px; width: 210px; left: 0;} #uka_bh {right: 50px; bottom: 400px; } #uka_bu {left: 10px; bottom: 150px; }'
  );
  nStyle.appendChild(cssText);
  document.getElementsByTagName('head')[0].appendChild(nStyle);
  setSurface();
  setTimeout(gsearch, 4000);
  GM_xmlhttpRequest({
    method: "GET", 
    url: "http://bottle.mikage.to/dyn/recent.cgi",
    headers: {"User-Agent": "Mozilla/5.0","Accept": "text/html"},
    overrideMimeType: 'text/html; charset=UTF-8',
    onload: function(x){
      var dstr = GM_getValue("done");
      var resXML = crEle('div');
      resXML.innerHTML = x.responseText;
      var sample;
      for(var i=9; i>-1; i--){
        sample = resXML.getElementsByTagName("script")[i];
        if(i == 0){
          done = "";
          sstpBottle();
          break;
        }else if(sample && dstr && sample.innerHTML.indexOf(dstr) > -1){
          done += sample.innerHTML;
          scriptStr(sample.innerHTML, "bottle");
          break;
        }else if(sample && dstr && sample.innerHTML.indexOf(dstr) < 0){
          done += sample.innerHTML;
        }
      }
    },
    onerror: function(x){
      GM_log("server error");
    }
  });
})();

function gtEle(arg){
  return document.getElementById(arg);
}

function crEle(arg){
  return document.createElement(arg);
}

function setSurface(){
  var o = crEle('div');
  o.setAttribute("id","uka_sh");
  o.setAttribute("class","uka_surface");
  o.setAttribute("style", "background-image: url(" + GM_getResourceURL('surface0') + ");");
  document.body.appendChild(o);
  o = crEle('div');
  o.setAttribute("id","uka_su");
  o.setAttribute("class","uka_surface");
  o.setAttribute("style", "background-image: url(" + GM_getResourceURL('surface10') + ");");
  document.body.appendChild(o);
  o.addEventListener("dblclick", function(e){
    var ta = document.getElementsByClassName("twttr-editor");
    if(ta.length == 0){ return; }
    var str = ta[0].getElementsByTagName("textarea")[0].value;
    if(str.indexOf("@nisesakura") > -1){
      scriptStr(str,"test");
    }else{
      str = "@nisesakura \\t\\h@nisesakura をつけてね\\uすまんな\\e";
      scriptStr(str,"test");
    }
  }, false);
}

function setBaloon(bid){
  var o = crEle('span');
  o.setAttribute("id",bid);
  o.setAttribute("class","uka_baloon");
  document.body.appendChild(o);
  return o;
}

function scriptStr(str,from){
  if(lock){
    setTimeout(scriptStr, 10*1000, str, from);
    return;
  }
  lock = true;
  if(!gtEle("uka_sh")){ setSurface(); }
  baloon = gtEle("uka_bh");
  surface = gtEle("uka_sh");
  var startchar;
  if(str.indexOf("@nisesakura") > -1){
    if(str.indexOf("\\t") > -1){
      startchar = str.indexOf("\\t");
      scriptChar(str, startchar, false, false, 50);
    }else{
      str += "\\h\\n\\n\\w9\\w9だって。\\w9\\u胸キュンやね。\\e";
      startchar = str.indexOf("@nisesakura") + ("@nisesakura").length;
      scriptChar(str, startchar, false, false, 50);
    }
    if(from == "twitter"){ setTimeout(sstpBottle, 5*60*1000); }
  }else if(from == "bottle"){
    if(str.indexOf("\\t") > -1){
      startchar = str.indexOf("\\t");
      scriptChar(str, startchar, false, false, 50);
      setTimeout(sstpBottle, 30*1000);
    }
  }else{
    return;
  }
}

function scriptChar(str, startchar, yenmode, sync, wait){
  lock = true;
  if(startchar >= str.length){
    setTimeout(closeScr, 4*1000);
    return;
  }
  var sc = str.charAt(startchar);
  if(sc.charCodeAt(0) == 0x5c){
    scriptChar(str, ++startchar, true, sync, wait);
  }else if(yenmode){
    switch(sc){
      case "h" : 
      case "0" : 
      //GM_log("h");
      baloon = gtEle("uka_bh");
      if(!baloon){ baloon = setBaloon("uka_bh"); }
      surface = gtEle("uka_sh");
      setTimeout(scriptChar, 50, str, ++startchar, false, sync, wait);
      break;
      case "u" : 
      case "1" : 
      //GM_log("u");
      baloon = gtEle("uka_bu");
      if(!baloon){ baloon = setBaloon("uka_bu"); }
      surface = gtEle("uka_su");
      setTimeout(scriptChar, 50, str, ++startchar, false, sync, wait);
      break;
      case "s" : 
      //GM_log("s");
      var numstr = str.substring(startchar).match(/\[(-1|\d+?)\]/);
      var num;
      if(numstr){
        num = numstr[0].replace(/\[|\]/g, "");
        startchar += numstr[0].length;
      }
      if(num && num == -1){
        surface.setAttribute("style", "background-image: none;");
      }else if(num && num < 13){
        surface.setAttribute(
          "style",
          "background-image: url(" + GM_getResourceURL('surface' + num) + ");"
        );
      }else{
        num = (surface.id == "uka_sh") ? 0 : 10;
        surface.setAttribute(
          "style",
          "background-image: url(" + GM_getResourceURL('surface' + num) + ");"
        );
      }
      scriptChar(str, ++startchar, false, sync, wait);
      break;
      case "n" : 
      //GM_log("n");
      if(baloon.innerHTML){ baloon.appendChild(crEle("br")); }
      if(str.charAt(startchar +1) == "["){ startchar = str.indexOf("]", startchar); }
      setTimeout(scriptChar, 50, str, ++startchar, false, sync, wait);
      break;
      case "c" : 
      //GM_log("c");
      var bid = baloon.id;
      document.body.removeChild(baloon);
      baloon = setBaloon(bid);
      setTimeout(scriptChar, 50, str, ++startchar, false, sync, wait);
      break;
      case "e" : 
      //GM_log("e");
      setTimeout(closeScr, 4*1000);
      return;
      break;
      case "w" : 
      //GM_log("w");
      var num = str.charAt(++startchar).match(/[\d]/);
      if(num){
        setTimeout(scriptChar, 50*num[0], str, ++startchar, false, sync, wait);
      }else{
        setTimeout(scriptChar, wait, str, startchar, false, sync, wait);
      }
      break;
      case "U" : 
      //GM_log("U");
      var lastindex,qtindex;
      if(str.substring(startchar,startchar+4) == "URL["){
        qtindex = str.indexOf("[",startchar+4);
        lastindex = str.indexOf("]",startchar);
        if(lastindex < 0 || (lxdump < qtindex && qtindex > 0)){
          setTimeout(scriptChar, wait, str, startchar, false, sync, wait);
          return;
        }
        if(str.charAt(++lastindex) == "["){
          qtindex = str.indexOf("[",lastindex+1);
          var lxdump = str.indexOf("]",lastindex);
          if(lxdump > -1 && (lxdump < qtindex || qtindex < 0)){
            lastindex = lxdump;
            if(str.charAt(++lastindex) == "["){
              qtindex = str.indexOf("[",lastindex+1);
              lxdump = str.indexOf("]",lastindex);
              if(lxdump > -1 && (lxdump < qtindex || qtindex < 0)){
                lastindex = ++lxdump;
              }
            }
          }
        }
        var urlstr = str.substring(startchar,lastindex).match(/(http.+?)\]/);
        var url = RegExp.$1;
        if(url){
          var a = crEle("a");
          a.href = url;
          a.innerHTML = url;
          baloon.appendChild(a);
          setTimeout(scriptChar, 500, str, lastindex, false, sync, wait);
        }else{
          setTimeout(scriptChar, wait, str, startchar+3, false, sync, wait);
        }
      }else{
        setTimeout(scriptChar, wait, str, startchar, false, sync, wait);
      }
      break;
      case "_" : 
      //GM_log("_");
      var nsc = str.charAt(startchar +1);
      if(nsc == "q"){
        if(wait > 0){
          wait = 0;
        }else{
          wait = 50;
        }
        setTimeout(scriptChar, wait, str, startchar+2, false, sync, wait);
      }else if(nsc == "s"){
        sync = !sync;
        setTimeout(scriptChar, wait, str, startchar+2, false, sync, wait);
      }else{
        setTimeout(scriptChar, wait, str, startchar, false, sync, wait);
      }
      break;
      case "t" : 
      //GM_log("t");
      setTimeout(scriptChar, wait, str, ++startchar, false, sync, wait);
      break;
      default : 
      setTimeout(scriptChar, wait, str, startchar, false, sync, wait);
    }
  }else if(sync){
    var bh = gtEle("uka_bh");
    var bu = gtEle("uka_bu");
    if(!bh){ bh = setBaloon("uka_bh"); }
    if(!bu){ bu = setBaloon("uka_bu"); }
    bh.innerHTML += sc;
    bh.scrollTop = bh.scrollHeight;
    bu.innerHTML += sc;
    bu.scrollTop = bu.scrollHeight;
    setTimeout(scriptChar, wait, str, ++startchar, false, sync, wait);
  }else{
    if(!baloon){ baloon = setBaloon("uka_bh"); }
    baloon.innerHTML += sc;  
    baloon.scrollTop = baloon.scrollHeight;
    setTimeout(scriptChar, wait, str, ++startchar, false, sync, wait);
  }
}

function closeScr(){
  gtEle("uka_sh").setAttribute(
          "style",
          "background-image: url(" + GM_getResourceURL('surface0') + ");"
        );
  gtEle("uka_su").setAttribute(
          "style",
          "background-image: url(" + GM_getResourceURL('surface10') + ");"
        );
  document.body.removeChild(gtEle("uka_bh"));
  document.body.removeChild(gtEle("uka_bu"));
  surface = null;
  baloon = null;
  lock = false;
}

function sstpBottle(){
  GM_xmlhttpRequest({
    method: "GET", 
    url: "http://bottle.mikage.to/dyn/recent.cgi",
    headers: {"User-Agent": "Mozilla/5.0","Accept": "text/html"},
    overrideMimeType: 'text/html; charset=UTF-8',
    onload: function(x){
      var resXML = crEle('div');
      resXML.innerHTML = x.responseText;
      var sample,sid;
      for(var i=9; i>-1; i--){
        sample = resXML.getElementsByTagName("script")[i];
        if(sample && done.indexOf(sample.innerHTML) < 0){
          done += sample.innerHTML;
          scriptStr(sample.innerHTML,"bottle");
          GM_setValue("done", sample.innerHTML);
          break;
        }
      }
    },
    onerror: function(x){
      GM_log("server error");
    }
  });
}

function gsearch(){
  //weekly
  var srch = "http://www.google.co.jp/search?q=%22%40nisesakura%22+site:twitter.com&tbs=qdr:w";
  //var srch = "http://www.google.co.jp/search?q=%22%40nisesakura%22+site:twitter.com";
  GM_xmlhttpRequest({
    method: "GET", 
    url: srch,
    headers: {"User-Agent": "Mozilla/5.0","Accept": "text/html"},
    overrideMimeType: 'text/html; charset=UTF-8',
    onload: function(x){
      var resXML = crEle('div');
      resXML.innerHTML = x.responseText;
      var tref = resXML.getElementsByClassName("l")[0];
      if(tref){
        GM_xmlhttpRequest({
          method: "GET", 
          url: tref,
          headers: {"User-Agent": "Mozilla/5.0","Accept": "text/html"},
          overrideMimeType: 'text/html; charset=UTF-8',
          onload: function(x){
            var resXML = crEle('div');
            resXML.innerHTML = x.responseText;
            var tbody = resXML.getElementsByClassName("entry-content")[0].innerHTML;
            if(tbody.indexOf("【")){ return; }
            var tname = resXML.getElementsByClassName("screen-name")[0].innerHTML;
            tbody = tbody.replace(/<.+?>/g,"");
            tbody = tbody.replace("\\e","");
            tbody += "\\u\\n\\n\\URL[http://twitter.com/" + tname + "]\\w9\\w9\\e";
            scriptStr(tbody,"twitter");
          },
          onerror: function(x){
            GM_log("server error");
          }
        });
      }
    },
    onerror: function(x){
      GM_log("server error");
    }
  });
}

}, false);//end of onload

window.addEventListener("focus", function(e){
  lock = false;
}, false);

window.addEventListener("blur", function(e){
  lock = true;
}, false);