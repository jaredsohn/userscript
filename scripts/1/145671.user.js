// ==UserScript==
// @id             msg.un.read.toggle.indamail.hu-8e573e36-14f1-449e-918b-5a297bd50356@52349.userscripts.org
// @name           Indamail Un/Read Toggler
// @version        0.2
// @author         xabolcs
// @description    Toggles Un/Read Mail at Indamail.hu
// @include        http://inda16.indamail.hu/*
// @updateURL      https://userscripts.org/scripts/source/145671.meta.js
// @run-at         document-end
// ==/UserScript==



(function() {
  function IndaMailUnReadTogggle(aIMail) {

    function createMArray() {
      with (unsafeWindow) {
        J.bJ = "";
        for(z in aj){
          if (aj[z]["f"] && aj[z]["id"]) {
            J.bJ += aj[z]["f"] + ":" + aj[z]["id"] + ",";
          }
        }
        log("J.bJ is: " + J.bJ);
      }
    }

    function toggleUnReadMail(aParam){
      createMArray();
      var param = aParam || "read";
      unsafeWindow.oW.request.call(unsafeWindow.oW, "rau",unsafeWindow.oW.bQ, "", {"p":param,"m_array":unsafeWindow.J.bJ});
    }

    var toReadListener = {
      handleEvent: function (aEvt) {
        toggleUnReadMail("read");
      }
    }

    var toUnReadListener = {
      handleEvent: function (aEvt) {
        toggleUnReadMail("unread");
      }
    }

    function setupUI() {
      const toggleId = "unReadToggler";
      if ($("#" + toggleId)) {
        log("already patched!");
        return;
      }

      let actionForm = $("div#main-top > form.actions");
      if (actionForm) {
        log(nodeColor);
        var node = document.createElement("span");
        var nodeStyle = "padding-right: 10px; ";
        if (GM_getValue("useButtonBackground", true)) {
          var nodeColor = getComputedStyle($("a#spnCompose"), null).getPropertyValue("color");
          if (nodeColor && nodeColor.search(/rgba/i) == -1 && nodeColor.search(/rgb/i) == 0) {
            nodeColor = nodeColor.replace("rgb", "rgba").replace(")", ", 0.875)");
          } else {
            nodeColor = "rgba(8, 8, 8, 0.375)";
          }
          nodeStyle += "margin-right: 10px; " +
            "background-color: " + nodeColor + "; " +
            "border: 0px; " +
            "border-radius: 5px; " +
            "padding-left: 9px; " +
            "padding-top: 3px; ";
        }
        node.setAttribute("style", nodeStyle);
        node.id = toggleId;
        node.innerHTML = "<img class=\"input-image\" src=\"http://img.vipmail.hu/inda/indamail-mailstatus-read.gif\" style=\"cursor: pointer;\" id=\"toggleToRead\"/>";
        node.innerHTML += "&nbsp;";
        node.innerHTML += "<img class=\"input-image\" src=\"http://img.vipmail.hu/inda/indamail-mailstatus-unread.gif\" style=\"cursor: pointer;\" id=\"toggleToUnRead\"/>";
        actionForm.insertBefore(node, $("#trashEf", actionForm));
        $("#toggleToRead", node).addEventListener("click", toReadListener, false);
        $("#toggleToUnRead", node).addEventListener("click", toUnReadListener, false);

        log("patched!");
      } else {
        log("actionForm not found!");
      }
    }

    var owRequest = unsafeWindow.oW.request;
    if (owRequest) {
      setupUI();
    }
  }

  var initialized = false;
  var tries = 10;

  function log(aMsg) {
    // setTimeout(function() { throw new Error("[im messagetoggle log] " + aMsg); }, 0);
  }

  function $ (selector, el) {
    if (!el) {
      el = document;
    }
    return el.querySelector(selector);
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
      initialized = new IndaMailUnReadTogggle(); 
    }
  }

  window.addEventListener("load", function() {
    window.removeEventListener("load", arguments.callee, true);
    if (window.location.toString().search("indamail.hu/blank.html") < 0) {
      initialize();
    }
  }, true);

})();
