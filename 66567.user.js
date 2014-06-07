// ==UserScript==
// @name           Google App Engine Log Downloader
// @namespace      gld
// @description    Google App Engine Log Downloader (including Timezone Adjuster from http://userscripts.org/scripts/show/47857) 
// @include        http://appengine.google.com/logs*
// @include        https://appengine.google.com/logs*
// @author         pto.developer (http://pto-s2.appspot.com/d/ or http://twitter.com/pto_developer)
// ==/UserScript==


( function(){

var gld = {};

// date format
//   true  : yyyy/MM/dd HH:mm:ss.SSS
//   false : MM/dd HH:mm:ss.SSS
//   null  : (disable re-format)
gld.ENABLE_FORMAT_YYYY = false;

// log date timezone, default : PST(GMT-08:00, non daylight saving time)
gld.log_timezone_offset_in_minutes  = -8 * 60;

// your timezone, default : from your localtime  ex) JST=9*60, GMT=0
gld.your_timezone_offset_in_minutes = new Date().getTimezoneOffset();

// enable firebug logging
gld.enable_firebug_logging = false;



//////////////////////////////////////////////////////////////////////////////////////////////////

gld.leftZeroPad = function(text, len){
  var tmp = "00000000" + text;
  return tmp.substring(tmp.length - len, tmp.length);
}

gld.log = function(str){
  if(gld.enable_firebug_logging && console && console.info){
    console.info(str);
  }
}

gld.req = function(param){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", param.url, true);
  xhr.onreadystatechange = function(){ 
    if (xhr.readyState==4){
      if(xhr.status == 200){
        param.onload(xhr, param);
      }
      else{
        param.onerror(xhr, param);  // TODO retry
      }
    }
  }
  xhr.send(null)
}


// TODO not worked
gld.getValue = function(key, value){
  if(false && GM_getValue){
    GM_getValue(key, value);
  }
}

gld.setValue = function(key, default_value){
  if(false && GM_setValue){
    GM_setValue(key, default_value);
  }
}


////////////////////////////////////////////////////////////////////////////////////

gld.parseLogSpans = function(parentDiv, updateView, reqlog){
  var str = "";
  var spans = parentDiv.getElementsByTagName('span');
  var len = Math.min(7, spans.length);
  var timepos = reqlog ? 0 : 1;
  
  for(var k=0; k<len; k++){
    var s = spans[k].innerHTML.toString();
    if(k==timepos && (gld.ENABLE_FORMAT_YYYY!=null)){
      //gld.log("time:" + s);
      var adjusted = gld.adjustTz(s);
      if(adjusted){
        s = adjusted;
        if(updateView){
          spans[k].innerHTML = adjusted; //.substring(5);
          return "";
        }
      }
    }
    if(k==1){s = s.replace(/&amp;/g, "&")}      // url
    else if(k==3){s = s.replace(/ms/g, "");}    // ms
    else if(k==4){s = s.replace(/api_cpu_ms/g, "").replace(/cpu_ms\n/g, "\t");} // cpu_ms
    else if(k==5){s = s.replace(/kb/g, "");}    // kb
    str += s + (reqlog?"\t":" ");
  }
  
  str += (reqlog ? gld.reqlog_indent[len] : "");
  return str.replace(/\n/g, " ");
}


gld.reqlog_indent = [];
gld.reqlog_indent[4] = "\t\t\t\t";
gld.reqlog_indent[5] = "\t\t\t";
gld.reqlog_indent[6] = "\t\t";
gld.reqlog_indent[7] = "\t";
gld.reqlog_indent[8] = "";


gld.parseLogDiv = function(div, updateView){

  var tsv = "";
  
  var reqlog = document.getElementById("ae-logs-requests-all").checked == true;
  var log_divs = div.getElementsByClassName("ae-logs-reqlog");
  
  for(var i=0; i<log_divs.length; i++){
    var tmp = log_divs[i];
    tsv += gld.parseLogSpans(tmp, updateView, true);  // true : always reqlog
    // find app log
    tmp = tmp.nextSibling;
    while(tmp){
      if(tmp.getAttribute && tmp.getAttribute("class").indexOf("ae-logs-applog") != -1){
        tsv += gld.parseLogSpans(tmp, updateView, false) + "\t";  // false : always applog
      }
      tmp = tmp.nextSibling;
    }
    tsv += "\n";
  }
  
  var nextUrl = null;
  var next = div.getElementsByClassName("ae-paginate-next");
  if(next && next.length > 0){
    nextUrl = next[0].getAttribute("href");
  }

  gld.log("page:" + gld.page + " parseed, tsv="+tsv.length + ", nextUrl=" + nextUrl);
  
  return [tsv, nextUrl]
}
  
  
gld.PAT_DATE = /^(\d\d)-(\d\d) (\d\d):(\d\d)(AM|PM) (\d\d)\.(\d\d\d)$/;
gld.offset = (gld.your_timezone_offset_in_minutes + gld.log_timezone_offset_in_minutes) * 60 * 1000;

gld.adjustTz = function(str){
  var match = str.match(gld.PAT_DATE);
  if(!match){
    //gld.log("!match : " + str)
    return null;
  }
  
  var date = new Date();
  date.setMonth(new Number(match[1]) - 1, match[2]);
  var hour = new Number(match[3]);
  if(hour == 12){hour = 0;}
  date.setHours(match[5] == "AM" ? hour : hour + 12);
  date.setMinutes(match[4]);
  date.setSeconds(match[6], match[7]);
  date.setTime(date.getTime() - gld.offset);
  
  // TODO unconsidered "last year"
  var ret = (gld.ENABLE_FORMAT_YYYY ? (date.getFullYear()+"-") : "") + gld.leftZeroPad(date.getMonth() + 1, 2)
           + "-" + gld.leftZeroPad(date.getDate(), 2) + " " + gld.leftZeroPad(date.getHours(), 2) 
           + ":" + gld.leftZeroPad(date.getMinutes(), 2) + ":"
           + gld.leftZeroPad(date.getSeconds(), 2) + "." + gld.leftZeroPad(date.getMilliseconds(), 3); 
  return ret;
}
 
// variables for state
gld.page = 0;
gld.all_log = "";
gld.ta = null;
gld.limit = gld.getValue("gld_pages", 2);
gld.cache = [];

gld.parse = function(text, cache_key_url){

  var tmpdiv = document.getElementById("gld_tmpdiv");

  var targetdiv = null;
  if(text == null){
    cache_key_url = location.href;
    targetdiv = document.getElementById("ae-logs");
  }
  else{
    tmpdiv.innerHTML = text;
    targetdiv = tmpdiv;
  }

  var ret = gld.parseLogDiv(targetdiv, false);

  if(ret && ret[0]){
    gld.all_log += ret[0];
    gld.ta.value = "page:" + gld.page;

    if(cache_key_url && !gld.cache[cache_key_url]){
      gld.log("cache added " + cache_key_url);
      gld.cache[cache_key_url] = ret;
    }
  }
  
  tmpdiv.innerHTML = ""; 
  
  var nextUrl = (ret && ret[1]) ? ret[1] : null;
  gld.next(nextUrl);
}


gld.next = function(url){
  gld.log("next (" + gld.page + "/" + gld.limit + "), url=" + url);

  if(gld.page++>=gld.limit || !url){
    gld.ta.value = ["date","url","status","ms","cpu_ms","api_cpu_ms","size","ua"].join("\t") + "\n" + gld.all_log;
    return;
  }
  
  var cache_key_url = url;
  if(url.indexOf("&layout=none") == -1){
    url = url + "&layout=none";
  }
  else{
    cache_key_url = cache_key_url.replace(/&layout=none/, "");
  }

  if(gld.cache[cache_key_url]){
    gld.log("cache found " + cache_key_url);
    var ret = gld.cache[cache_key_url];
    gld.all_log += ret[0];
    var nextUrl = ret[1];
    gld.next(nextUrl);
    return;
  }
  else{
    gld.req({
      url : url,
      onload  : function(x){ gld.parse(x.responseText, cache_key_url);},
      onerror : function(x){ gld.ta.value = "failed. please retry. status=" + x.status; }
    });
  }
}

////////////////////////////////////////////////////////////////////////////////////

gld.init = function(){
  
  var target = document.getElementById("ae-logs-form-options");
  
  var main_area = document.createElement("span");
  main_area.setAttribute("id", "gld_main");
  main_area.setAttribute("style", "margin-left:40px");
  main_area = target.parentNode.insertBefore(main_area, target);
  
  main_area.innerHTML
   = "<button style='background:#DDDDDD url(/img/button-bg.gif) repeat-x scroll left top;"
   + " border-style:solid; border-color:#99CCFF #6699EE #6699EE #77AAFF; border-width:1px'"
   + " id='gld_get' onclick='return false'>getTSV</button> for "
   + "<input type='text' value='2' size='3' style='width:24px;' id='gld_pages'>pages &nbsp;&nbsp;&nbsp;"
   + "result:<textarea id='gld_ta' rows='1' cols='20' style='overflow:hidden; paddin:0px; margin-bottom:-2px'>"
   + "</textarea><div id='gld_tmpdiv' style='display:none'></div>"
   ;
  
  gld.ta = document.getElementById("gld_ta");
  
  var button = document.getElementById("gld_get");
  button.addEventListener("click",function(){
    var limit_str = document.getElementById("gld_pages").value;
    if(!limit_str || !limit_str.match(/^[0-9]+$/)){
      alert("input number!");
      return false;
    }
    gld.limit = new Number(limit_str);
    gld.setValue("gld_pages", gld.limit);
    gld.ta.value=""; 
    gld.page = 0;
    gld.all_log = "";
    gld.parse(null);
    return false;
  }, false);
  
  
  if(gld.ENABLE_FORMAT_YYYY != null){
    var potentialUpdate = false;
    function periodicalUpdate(force){
      if(!force && !potentialUpdate){
        return;
      }
      gld.log("periodicalUpdate:" + potentialUpdate);
      potentialUpdate = false;
      gld.parseLogDiv(document.getElementById("ae-logs"), true);
    }
    periodicalUpdate(true);
    document.getElementById("ae-logs").addEventListener("DOMNodeInserted", function(){potentialUpdate = true;}, false);
    setInterval(function(){periodicalUpdate();}, 1000);    
  } 
}


gld.init();
  
}) ();
