// ==UserScript==
// @name         My Little Keywords, Cheating is Magic!
// @version      3.4
// @description  Click on the circle task number indicators on the left to start working
// @copyright    2013+, John Stoehr, Tjololo12
// ------------------------------------------------------------------------------------
// @match        https://work.crowdsource.com/amt/view*
// @match        https://www.google.ca/search*
// @match        https://www.google.com/search*
// @match        https://www.google.co.uk/search*
// @match        https://www.google.it/search*
// @match        https://www.google.ng/search*
// @match        http://www.bing.com/search*
// @run-at       document-end
// @require      http://code.jquery.com/jquery-git.js
// @require      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==
 
//parseUri.options.strictMode = true;
 
// Source: http://stackoverflow.com/a/4673436/2405722
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(match, number) {
    return args[number] !== undefined ? args[number] : match;
  });
};

var mturkOrigins = ["https://work.crowdsource.com/amt/view"];
//var googleAPIPrefix="https://ajax.googleapis.com/ajax/services/search/web?v=1.0&";
var googleAPIPrefix="https://www.google.com/search?q=";
//var ip = myIP();
//console.log(ip);
var numTasks = 0;
var interval = 0;
var completedTasks = 0;
var counter = 0;

function myIP() {
    try{
        GM_xmlhttpRequest({
        method: 'GET',
        url: "http://smart-ip.net/geoip-json",
        synchronous: true,

        onload: function (xhr) {
            r = xhr.responseText;
            var data = $.parseJSON(xhr.responseText);
            if (data["host"])
                googleAPIPrefix+="userip="+data["host"].trim()+"&q=";
            else
                googleAPIPrefix+="q=";
            console.log(googleAPIPrefix);
        }
        });
    }
    catch(err){
        console.log(err);
            }
    }

function httpGet(theUrl,taskNum)
{
  var taskNumber = taskNum;
  GM_xmlhttpRequest({
        method: 'GET',
        url: theUrl,
        synchronous: true,

        onload: function (xhr,taskNum,theUrl) {
            r = xhr.responseText;
            //console.log(r);
            var ret="";
            try{
                //var data = $.parseJSON(xhr.responseText);
                ret = getUrl(r);
                //console.log(taskNumber);
                window.postMessage({magicword: "mumbojumbo", task: taskNumber, url: ret, source: theUrl}, "*");
            }
            catch(err){
                console.log(err);
                console.log(r);
                return r;
            }
        }
    });
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function isMturkOrigin(url) {
  for (var i = 0; i < mturkOrigins.length; ++i) {
    if (url.indexOf(mturkOrigins[i]) === 0) {
      return true;
    }
  }
 
  return false;
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
        };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
        };
    this.GM_deleteValue=function (key) {
        return localStorage.removeItem(key);
        };
}

document.onkeydown = showkeycode;
var keys=new Array(5);
var indexes = [0,0,0,0,0];
var pointer = 0;

function showkeycode(evt){
    var keycode = evt.keyCode;
    if (pointer < keys.length){
        keys[pointer] = keycode;
        pointer += 1;
    }
    else{
        pointer = 0;
        keys[pointer] = keycode;
        pointer += 1;
    }
    var start = 0;
    if (keys.indexOf(67) != -1){
        start = keys.indexOf(67);
    }            
    for (var i = 0; i < 5; i++){
        if (start == 5)
            start = 0;
        indexes[i] = start;
        start += 1;
    }
    if (keys[indexes[0]] == 67 && keys[indexes[1]] == 72 && keys[indexes[2]] == 69 &&
        keys[indexes[3]] == 65 && keys[indexes[4]] == 84){
        if (GM_getValue("brony")){
            GM_deleteValue("brony");
            console.log("Bye bye");
        }
        else{
            GM_setValue("brony", 1);
            console.log("Welcome!");
        }
        indexes = [0,0,0,0,0];
    }
}

function getGoogleResults(domain,term,task){
    var searchURL = domain+"/search?q="+encodeURIComponent(term);
    console.log(searchURL);
    var ret = httpGet(searchURL, task);
    return ret;
}

function openDiv(term,task){
    var searchURL = googleAPIPrefix+encodeURIComponent(term);
    var ret = getGoogle(searchURL, task);
    console.log(ret);
    return ret;
}
 
function getUrl(obj){
    //console.log(obj["responseData"]);
    var html = $.parseHTML(obj);
    //var results = obj["responseData"]["results"];
    //var responseNum = getRandomInt(0,3);
    //var finalUrl = results[responseNum]["unescapedUrl"];
    var el = $( '<div></div>' );
    var finalUrl = "";
    el.html(html);
    //var element = $("#rso li.g", el).eq(getRandomInt(0,4));
    var element = $("#rso li.g", el).eq(counter);
    counter = (counter + 1 > 2 ? 0 : counter + 1);
    if (element.attr("class") === "g" || element.attr("class") === "g no-sep" && element.attr("id") == null){
             var $h3 = element.find("h3.r").first();
             if ($h3.length > 0) {
                 url = $h3.find("a")[0].href;
                 finalUrl = (url.indexOf("work.crowdsource.com") == -1 && url.indexOf("google.com") == -1 ? url : "");             }
         }
    console.log(element);
    return finalUrl;
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

if (isMturkOrigin(location.href)) {
  // make task number indicator (circle) clickable
    $('label[for^=URL]').each( 
        function() {
            numTasks++;
            var id = $(this).attr('for');
            $(this).append(
                $("<button></button>", {
                    type: "button",
                    text: "Search "+$(this).attr("for").replace(/URL-?(\d{1,2}).*/, '$1'),
                    id: "button"+id
                }).click(function() {
                    var $task = $(this).parent().parent().prev();
                    var taskNumber = parseInt($(this).parent().attr("for").replace(/URL-?(\d{1,2}).*/, '$1'));
                    $task.addClass("task-" + taskNumber);
                    var textRepText = $task.text();
                    
                    var prefix = "Keyword:";
                    var keywords = $.trim(textRepText.substr(textRepText.indexOf(prefix) + prefix.length));
                    var keywordsEncoded = encodeURIComponent(keywords).replace(/%20/g, "+");
                    //console.log(keywords);
   
                    // launch google or bing search window/tab
                    var projectTitle = $(".projectTitle").text();
                    var domain = $.trim(projectTitle.substr(projectTitle.lastIndexOf(" "))).toLowerCase();
                    var googleOrigin = (domain.match(/.*bing.*/) ? "http://www.{0}".format(domain) : "https://www.{0}".format(domain));
                    if(GM_getValue("brony") && !domain.match(/.*bing.*/))
                        var resultURL = getGoogleResults(googleOrigin, keywords,taskNumber);
                    else
                        //openDiv(keywords,taskNumber);
                        window.open("{0}/search?q={1}&magicword={2}&task={3}".format(googleOrigin, keywordsEncoded, "mumbojumbo", taskNumber));
                    //console.log("{0}/search?q={1}&magicword={2}&task={3}".format(googleOrigin, keywordsEncoded, "mumbojumbo", taskNumber));

                }));
            
            $("#button"+id).click();
    });
    console.log(numTasks);
      window.addEventListener("message", function(e) {
         if (e.data.magicword === "mumbojumbo") {
             console.log("Message Received");
             //console.log(e.data);
             if (e.data.url == "")
                 httpGet(e.data.source, e.data.task);
             else
             	$(".task-{0}".format(e.data.task)).next().find("input").val(e.data.url);
         }
          else{
              console.log("Also message received");
              console.log(e.data);
          }
      }, false);
} else if (window.opener != null && window.location.href.indexOf("mumbojumbo") > -1) {
    console.log(window.opener);
    window.opener.postMessage("Child Frame Loaded", "*");
    $("#rso li.g").each(function() {
      if (($(this).attr("class") === "g" || $(this).attr("class") === "g no-sep") && $(this).attr("id") == null) {
        var $h3 = $(this).find("h3.r").first();
        if ($h3.length > 0) {
            var taskNumber = parseUri(location.href).queryKey.task;
            var pageUrl = $h3.find("a")[0].href;
            $("<button></button>", {
              type: "button",
              text: "Submit"
            }).click(function() {
                //window.opener.postMessage({magicword: "mumbojumbo", task: taskNumber, url: pageUrl}, "*");
                GM_setValue("task-"+taskNumber,pageUrl);
                console.log(GM_getValue("task-"+taskNumber));
                //setCookie(taskNumber, pageUrl)
                //window.close();
            }).prependTo($h3);
          }
      }
  });
  $("#b_results li.b_algo").each(function() {
    if ($(this).attr("class") === "b_algo" && $(this).attr("id") == null) {
      var $h3 = $(this).find("h2").first();
     
      if ($h3.length > 0) {
        var taskNumber = parseUri(location.href).queryKey.task;
        var pageUrl = $h3.find("a")[0].href;
        $("<button></button>", {
          type: "button",
          text: "Submit"
        }).click(function() {
          window.opener.postMessage({magicword: "mumbojumbo", task: taskNumber, url: pageUrl}, "*");
          window.close();
        }).prependTo($h3);
      }
    }
  });
}