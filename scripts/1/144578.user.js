// ==UserScript==
// @id             msg.plaintext.indamail.hu-7938068b-5fbe-4f00-9653-3a4e21ec69ff@52349.userscripts.org
// @name           Indamail PlainText
// @version        0.3
// @author         xabolcs
// @description    Displays plain/text mails with monospaced font at Indamail.hu
// @include        http://inda16.indamail.hu/*
// @updateURL      https://userscripts.org/scripts/source/144578.meta.js
// ==/UserScript==



(function() {
  function IndaMailPlainText(aIMail) {

    function applyPlainTextStyle2Read() {
      const styleId = "plainTextStyle";
      if ($(styleId)) {
        log("already patched!");
        return;
      }

      const css = "@namespace url(http://www.w3.org/1999/xhtml); \n" +
        "div#divMessageBody.bg, \n" + 
        "div#divMessageBody.bg a{ font-family: monospace !important } \n" +
        "div#divMessageBody.bg { white-space: pre-wrap } \n";

      var divMBody = $("divMessageBody");
      if (divMBody) {
        var notColored = divMBody.getAttribute("style").toString().search("bgcolor=#") < 0;
        if (divMBody.childNodes.length > 0) {
          var brNodes = [];
          var nodesTypes = {
            "BR": 0
            , "A": 0
            , "#text": 0
            , "other": 0
          }; 
          var gotHtmlType = false;
          for (var i = 0; i < divMBody.childNodes.length && notColored; i++) {
            var nodeName = divMBody.childNodes[i].nodeName.toString();
            if (!nodesTypes.hasOwnProperty(nodeName)) {
              nodesTypes["other"]++;
              log("other tag!: " + nodeName);
              gotHtmlType = true;
              break;
            } else {
              nodesTypes[nodeName]++;
              if (nodeName == "BR") {
                brNodes.push(divMBody.childNodes[i]);
              }
            }
          }
        }
      }

      if (divMBody && notColored && !gotHtmlType) {
        brNodes.forEach(function (aElem) {
          if (aElem.parentNode) {
            aElem.parentNode.removeChild(aElem);
          }
        });
        var node = document.createElement("style");
        node.type = "text/css";
        node.id = styleId;
        node.appendChild(document.createTextNode(css));
        divMBody.parentNode.insertBefore(node, divMBody);
        log("patched!");
      }
    }

    function applyPlainTextStyle2Compose() {
      const stlyeComposeId = "plainTextComposeStyle";
      if ($(stlyeComposeId)) {
        log("already patched!");
        return;
      }

      const cssCompose = "@namespace url(http://www.w3.org/1999/xhtml); \n" +
        "form#mailWrite textarea#mail_body { font-family: monospace !important } \n";

      var formMailWrite = $("mailWrite");
      
      if (formMailWrite) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.id = stlyeComposeId;
        node.appendChild(document.createTextNode(cssCompose));
        formMailWrite.insertBefore(node, formMailWrite.firstChild);
        log("mail compose patched!");
      }
    }

    var oldAV = unsafeWindow.oW.aV;
    if (oldAV) {
      unsafeWindow.oW.aV = function (aMsg) {
        try {
          with (unsafeWindow) {
            oldAV.call(oW, aMsg);
          }
          applyPlainTextStyle2Read();
        } catch (e) {
          log("err! " + e);
        }
      }
      applyPlainTextStyle2Read();
      applyPlainTextStyle2Compose();
    }
  }

  var initialized = false;
  var tries = 10;

  function log(aMsg) {
    //setTimeout(function() { throw new Error("[log] " + aMsg); }, 0);
  }

  function $(aId) {
    return document.getElementById(aId);
  }

  function initialize(aArgs) {
    if (!initialized && tries > 0) {
        setTimeout(function() {
            initialize(aArgs);
            initialized = unsafeWindow.oW && typeof(unsafeWindow.oW) == "object";
            tries--;
            log("init: again!");
        }, 100, aArgs);
    } else if (initialized) {
      initialized = new IndaMailPlainText(); 
    }
  }

  window.addEventListener("load", function() {
    window.removeEventListener("load", arguments.callee, true);
    if (window.location.toString().search("indamail.hu/blank.html") < 0) {
      initialize();
    }
  }, true);

})();
