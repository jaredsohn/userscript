// ==UserScript==
// @name         CrowdSource: Search Keywords on (Google|Bing|Yahoo) TESTING
// @version      2.0
// @description  Click on the circle task number indicators on the left to start working
// @copyright    2013+, John Stoehr, Tjololo12
// ------------------------------------------------------------------------------------
// @match        https://work.scalableworkforce.com/*
// @match        https://www.google.ca/search*
// @match        https://www.google.com/search*
// @match        https://www.google.co.uk/search*
// @match        https://www.google.it/search*
// @match        https://www.google.ng/search*
// @match        http://www.bing.com/search*
// @run-at       document-end
// @require      http://code.jquery.com/jquery-git.js
// @require      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// ==/UserScript==
 
//parseUri.options.strictMode = true;
 
// Source: http://stackoverflow.com/a/4673436/2405722
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(match, number) {
    return args[number] !== undefined ? args[number] : match;
  });
};
 
var mturkOrigins = ["https://work.scalableworkforce.com"];
 
function isMturkOrigin(url) {
  for (var i = 0; i < mturkOrigins.length; ++i) {
    if (url.indexOf(mturkOrigins[i]) === 0) {
      return true;
    }
  }
 
  return false;
}
 
if (isMturkOrigin(location.href)) {
  // make task number indicator (circle) clickable
    $('label[for^=URL]').each( 
        function() {
            var id = $(this).attr('for');
            $(this).append(
                $("<button></button>", {
                    type: "button",
                    text: "Search "+$(this).attr("for").replace(/URL-?(\d{1,2}).*/, '$1')
                }).click(function() {
                    var $task = $(this).parent().parent().prev();
                    var taskNumber = parseInt($(this).parent().attr("for").replace(/URL-?(\d{1,2}).*/, '$1'));
                    $task.addClass("task-" + taskNumber);
                    var textRepText = $task.text();
                    
                    var prefix = "Keyword:";
                    var keywords = $.trim(textRepText.substr(textRepText.indexOf(prefix) + prefix.length));
                    var keywordsEncoded = encodeURIComponent(keywords).replace(/%20/g, "+");
                    console.log(keywords);
   
                    // launch google or bing search window/tab
                    var projectTitle = $(".projectTitle").text();
                    var domain = $.trim(projectTitle.substr(projectTitle.lastIndexOf(" "))).toLowerCase();
                    var googleOrigin = (domain.match(/.*bing.*/) ? "http://www.{0}".format(domain) : "https://www.{0}".format(domain));
                    window.open("{0}/search?q={1}&magicword={2}&task={3}".format(googleOrigin, keywordsEncoded, "mumbojumbo", taskNumber));
                    //console.log("{0}/search?q={1}&magicword={2}&task={3}".format(googleOrigin, keywordsEncoded, "mumbojumbo", taskNumber));

                }));
    });
      window.addEventListener("message", function(e) {
         alert("Message Received");
         if (e.data.magicword === "mumbojumbo") {
             console.log("Message Received");
             $(".task-{0}".format(e.data.task)).next().find("input").val(e.data.url);
         }
          else{
              console.log(e.data);
          }
      }, false);
} else if (window.opener != null && window.location.href.indexOf("mumbojumbo") > -1) {
    //console.log(window.opener.document.location);
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
                window.opener.postMessage({magicword: "mumbojumbo", task: taskNumber, url: pageUrl}, "*");
                window.close();
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