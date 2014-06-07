// ==UserScript==
// @name         MTurk: Google Search Ranking
// @namespace    http://johnstoehr83.wordpress.com/mturk
// @version      1.0
// @description  Click on the circle task number indicators on the left to start working
// @copyright    2013+, John Stoehr
// -------------------------------------------------------------------------------------
// @match        *://*/*
// @run-at       document-end
// @require      http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require      http://huffpostlabs.github.io/highlighter.js/jQuery.highlighter.js
// ==/UserScript==

/**
 * Allows string formatting.
 * "{0} is {1} years old {2}".format("Mark", 40); // "Mark is 40 years old {2}"
 * Source: http://stackoverflow.com/a/4673436/2405722
 */
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(m, n) {
    return args[n] !== undefined ? args[n] : m;
  });
};

String.prototype.equalsIgnoreCase = function(other) {
  return this.toUpperCase() === other.toLowerCase();
};

String.prototype.startsWith = function(str) {
  return this.indexOf(str) === 0;
};

String.prototype.startsWithIgnoreCase = function(str) {
  return this.toUpperCase().indexOf(str.toUpperCase()) === 0;
};

function randomToken(length) {
  return Math.random().toString(36).substr(2, length);
}

var mturkDomains = ["www.mturkcontent.com", "s3.amazonaws.com",
  "work.scalableworkforce.com"];

// Source: http://www.google.com/supported_domains
var googleDomains = ["www.google.com", "www.google.ad", "www.google.ae", "www.google.com.af", "www.google.com.ag", "www.google.com.ai", "www.google.al", "www.google.am", "www.google.co.ao", "www.google.com.ar", "www.google.as", "www.google.at", "www.google.com.au", "www.google.az", "www.google.ba", "www.google.com.bd", "www.google.be", "www.google.bf", "www.google.bg", "www.google.com.bh", "www.google.bi", "www.google.bj", "www.google.com.bn", "www.google.com.bo", "www.google.com.br", "www.google.bs", "www.google.bt", "www.google.co.bw", "www.google.by", "www.google.com.bz", "www.google.ca", "www.google.cd", "www.google.cf", "www.google.cg", "www.google.ch", "www.google.ci", "www.google.co.ck", "www.google.cl", "www.google.cm", "www.google.cn", "www.google.com.co", "www.google.co.cr", "www.google.com.cu", "www.google.cv", "www.google.com.cy", "www.google.cz", "www.google.de", "www.google.dj", "www.google.dk", "www.google.dm", "www.google.com.do", "www.google.dz", "www.google.com.ec", "www.google.ee", "www.google.com.eg", "www.google.es", "www.google.com.et", "www.google.fi", "www.google.com.fj", "www.google.fm", "www.google.fr", "www.google.ga", "www.google.ge", "www.google.gg", "www.google.com.gh", "www.google.com.gi", "www.google.gl", "www.google.gm", "www.google.gp", "www.google.gr", "www.google.com.gt", "www.google.gy", "www.google.com.hk", "www.google.hn", "www.google.hr", "www.google.ht", "www.google.hu", "www.google.co.id", "www.google.ie", "www.google.co.il", "www.google.im", "www.google.co.in", "www.google.iq", "www.google.is", "www.google.it", "www.google.je", "www.google.com.jm", "www.google.jo", "www.google.co.jp", "www.google.co.ke", "www.google.com.kh", "www.google.ki", "www.google.kg", "www.google.co.kr", "www.google.com.kw", "www.google.kz", "www.google.la", "www.google.com.lb", "www.google.li", "www.google.lk", "www.google.co.ls", "www.google.lt", "www.google.lu", "www.google.lv", "www.google.com.ly", "www.google.co.ma", "www.google.md", "www.google.me", "www.google.mg", "www.google.mk", "www.google.ml", "www.google.com.mm", "www.google.mn", "www.google.ms", "www.google.com.mt", "www.google.mu", "www.google.mv", "www.google.mw", "www.google.com.mx", "www.google.com.my", "www.google.co.mz", "www.google.com.na", "www.google.com.nf", "www.google.com.ng", "www.google.com.ni", "www.google.ne", "www.google.nl", "www.google.no", "www.google.com.np", "www.google.nr", "www.google.nu", "www.google.co.nz", "www.google.com.om", "www.google.com.pa", "www.google.com.pe", "www.google.com.pg", "www.google.com.ph", "www.google.com.pk", "www.google.pl", "www.google.pn", "www.google.com.pr", "www.google.ps", "www.google.pt", "www.google.com.py", "www.google.com.qa", "www.google.ro", "www.google.ru", "www.google.rw", "www.google.com.sa", "www.google.com.sb", "www.google.sc", "www.google.se", "www.google.com.sg", "www.google.sh", "www.google.si", "www.google.sk", "www.google.com.sl", "www.google.sn", "www.google.so", "www.google.sm", "www.google.st", "www.google.com.sv", "www.google.td", "www.google.tg", "www.google.co.th", "www.google.com.tj", "www.google.tk", "www.google.tl", "www.google.tm", "www.google.tn", "www.google.to", "www.google.com.tr", "www.google.tt", "www.google.com.tw", "www.google.co.tz", "www.google.com.ua", "www.google.co.ug", "www.google.co.uk", "www.google.com.uy", "www.google.co.uz", "www.google.com.vc", "www.google.co.ve", "www.google.vg", "www.google.co.vi", "www.google.com.vn", "www.google.vu", "www.google.ws", "www.google.rs", "www.google.co.za", "www.google.co.zm", "www.google.co.zw", "www.google.cat"];

parseUri.options.strictMode = true;
var thisUrl = parseUri(location.href);

var googleOrigin = null; // will be parsed
var $tasks = [];

if ($.inArray(thisUrl.host, mturkDomains) > -1) {
  // make task number indicator (circle) clickable
  $(".task .task-num").css("cursor", "pointer").click(function() {
    // find task node and number
    var $task = $(this).parents(".task").first();
    var taskId = randomToken(10);
    console.log("Generated a new task id: {0}".format(taskId));
    $tasks[taskId] = $task;
    
    // find, parse and encode keyword
    var keywords = $.trim($task.find(".text-rep strong")[0].nextSibling.nodeValue);
    console.log('Found keywords "{0}" for task {1}'.format(keywords, taskId));
    var keywordsEncoded = encodeURIComponent(keywords).replace(/%20/g, "+");
    
    // launch google search window/tab
    var projectTitle = $(".projectTitle").text();
    var domain = $.trim(projectTitle.substr(projectTitle.lastIndexOf(" ")))
        .toLowerCase();
    
    if ($.inArray("www." + domain, googleDomains) === -1) {
      domain = "google.com";
    }
    
    console.log("Found Google domain: {0}".format(domain));
    googleOrigin = "https://www.{0}".format(domain);
    window.open("{0}/search?task={1}&q={2}".format(googleOrigin, taskId,
      keywordsEncoded), taskId);
  });
  
  window.addEventListener("message", function(e) {
    console.log("Message from {0}".format(e.origin));
    
    if (e.data.task !== undefined && $tasks[e.data.task] !== undefined) {
      var $task = $tasks[e.data.task];
      console.log('Received status "{0}"'.format(e.data.status));
      
      switch (e.data.status) {
        case "loaded":
          console.log("Google search page for task {0} has been loaded"
              .format(e.data.task));
          var urlNode = $task.find(".text-rep strong")[1];
          var url = $.trim(urlNode.nextSibling.nodeValue);
          console.log("Sending task url: {0}".format(url));
          e.source.postMessage(
            {"status": "find-url", "url": url, "task": e.data.task}, googleOrigin);
          break;
        
        case "found":
          console.log("Url found on page {0} at position {1}".format(e.data.page,
            e.data.position));
          var $dropdowns = $task.find("select");
          
          $dropdowns.first().find("option").filter(function() {
            return $(this).text() == e.data.page;
          }).prop("selected", true);
          
          if (e.data.position > 10) {
            e.data.position = 10; // Sometimes google returns 11 results
          }
          
          $dropdowns.eq(1).find("option").filter(function() {
            return $(this).text() == e.data.position;
          }).prop("selected", true);
          break;
        
        case "navigate-me":
          var parsedUrl = parseUri(e.data.url);
          var url = "{0}://{1}{2}?{3}{4}".format(parsedUrl.protocol,
            parsedUrl.host, parsedUrl.path, "task=" + e.data.task + "&",
            parsedUrl.query);
          console.log("Navigating page to {0}".format(url));
          window.open(url, e.data.task);
          break;
        
        case "submit-text":
          console.log("Received text: {0}".format(e.data.text));
          $task.find("textarea").first().val(e.data.text);
          e.source.close();
          break;
        
        default:
          console.log("Unknown status, ignoring");
          break;
      }
    } else console.log("Ignored message from {0}".format(e.origin));
  }, false);
} else if ($.inArray(thisUrl.host, googleDomains) > -1) {
  var task = thisUrl.queryKey.task;
  window.opener.postMessage({"status": "loaded", "task": task}, "*");
  
  window.addEventListener("message", function(e) {
    switch (e.data.status) {
      case "find-url":
        var pageNum = parseInt($.trim($("#navcnt td.cur").text()), 10);
        var position = 1;
        
        $("#rso li.g").each(function() {
          if (($(this).attr("class") === "g" ||
              $(this).attr("class") === "g no-sep") &&
              $(this).attr("id") == null) {
            var $h3 = $(this).find("h3.r").first();
            
            if ($h3.length > 0) {
              var findUrl = e.data.url;
              var normalizedFindUrl = findUrl.split("#")[0].replace(/\/$/, "");
              var pageUrl = $h3.find("a")[0].href;
              
              var style = pageUrl.startsWithIgnoreCase(normalizedFindUrl)
                  ? {"color": "white", "background-color": "red", "font-weight": "bold"}
                  : {"color": "black"};
              
              var data = {"status": "found", "task": task, "page": pageNum,
                  "position": position};
              
              $("<button></button>", {
                type: "button",
                text: "{0}-{1}".format(pageNum, position)
              }).css(jQuery.extend(true, {}, style)).click(function() {
                window.opener.postMessage(data, "*");
                window.open(pageUrl);
              }).prependTo($h3); 
              
              $(this).find(".f.kv").after("<pre>URL: {0}\nFND: {1}</pre>"
                  .format(pageUrl, findUrl));
              ++position;
            }
          }
        });
        break;
      
      case "submit-text":
        e.data.task = task;
        window.opener.postMessage(e.data, "*");
        e.source.close();
        break;
    }
  }, false);
  
  $("#navcnt a").click(function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else if (e.returnValue) {
      e.returnValue = false;
    }
    
    var data = {"status": "navigate-me", "task": task, "url": this.href};
    window.opener.postMessage(data, "*");
    return false;
  });
} else if (window.opener != null) {
  var buttonStyle = "display: none; margin: 5px; position: absolute; z-index: 100000;";
  $(document.body).append('<button class="selection-popup" style="{0}" type="button">SUBMIT</button>'.format(buttonStyle));
  $(document).highlighter({"selector": ".selection-popup", "complete": function(selectedText) {
    $(".selection-popup").data("text", selectedText);
  }});
  $(".selection-popup").mousedown(function(e) {
    return false;
  }).click(function() {
    window.opener.postMessage({"status": "submit-text",
        "text": $(this).data("text")}, "*");
  });
}
