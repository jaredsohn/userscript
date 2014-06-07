// ==UserScript==
// @name         CrowdSource: Search Keywords on Google
// @namespace    http://johnstoehr83.wordpress.com/mturk
// @version      1.0
// @description  Click on the circle task number indicators on the left to start working
// @copyright    2013+, John Stoehr
// ------------------------------------------------------------------------------------
// @match        https://work.scalableworkforce.com/*
// @match        https://www.google.ca/search*
// @match        https://www.google.com/search*
// @match        https://www.google.co.uk/search*
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// ==/UserScript==

parseUri.options.strictMode = true;

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
  $(".task .task-num").css("cursor", "pointer").click(function() {
    // find task node and number
    var $task = $(this).parents(".task").first();
    var taskNumber = parseInt($(this).text());
    $task.addClass("task-" + taskNumber);
    
    // find, parse and encode keyword
    var textRepText = $task.find(".text-rep").text();
    var prefix = "Keyword:";
    var keywords = $.trim(textRepText.substr(textRepText.indexOf(prefix) + prefix.length));
    var keywordsEncoded = encodeURIComponent(keywords).replace(/%20/g, "+");
    
    // launch google search window/tab
    var projectTitle = $(".projectTitle").text();
    var domain = $.trim(projectTitle.substr(projectTitle.lastIndexOf(" "))).toLowerCase();
    var googleOrigin = "https://www.{0}".format(domain);
    window.open("{0}/search?q={1}&magicword={2}&task={3}".format(googleOrigin, keywordsEncoded, "mumbojumbo", taskNumber));
  });
  
  window.addEventListener("message", function(e) {
    if (e.data.magicword === "mumbojumbo") {
      $(".task-{0} input".format(e.data.task)).first().val(e.data.url);
    }
  }, false);
} else if (window.opener != null) {
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
}
