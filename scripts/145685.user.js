// ==UserScript==
// @id             move2social.indamail.hu-1e1ed475-e833-4ea3-afad-57ffcb71285f@52349.userscripts.org
// @name           Indamail Move 2 Social
// @version        0.3
// @author         xabolcs
// @description    Let Indamail.hu Users to move their messages to the Social folder
// @include        http://inda16.indamail.hu/*
// @updateURL      https://userscripts.org/scripts/source/145685.meta.js
// @run-at         document-end
// ==/UserScript==



(function() {
  function IndaMailMove2Social(aIMail) {

    function addMenuItem () {
      const folder = "Social";
      const listItemId = "liMove2" + folder;

      if ($(listItemId)) {
        log("already patched!");
        return;
      }

      var csDropDown = $("cs");
      if (csDropDown) {
        var node = document.createElement("li");
        node.innerHTML = "<span style=\"cursor:pointer;padding-top:3px\" " +
          "onclick=\"oW.bI('" + folder + "','')\" id=\"spnd" + folder + "\">" + 
          unsafeWindow.hj[folder] + "</span>";
        node.id = listItemId;
        var csItem = $("spndspam");
        if (csItem) {
          csDropDown.insertBefore(node, csItem.parentNode);
        } else {
          csItem = $("spndinbox");
          csDropDown.insertBefore(node, csItem.parentNode.nextElementSibling);
        }
        log("patched!");
      } else {
        log("Dropdown menu not found!");
      }
    }

    if (unsafeWindow.hj) {
      addMenuItem();
    }
  }

  var initialized = false;
  var tries = 0;

  function log(aMsg) {
    //window.setTimeout(function() { throw new Error("[im move2social log] " + aMsg); }, 0);
  }

  function $(aId) {
    return document.getElementById(aId);
  }

  function initialize(aArgs) {
    if (!initialized && tries < 10) {
        window.setTimeout(function() {
            initialize(aArgs);
            initialized = unsafeWindow.hj && typeof(unsafeWindow.hj) == "object";
            tries++;
            log("init: again!");
        }, 100+tries*100, aArgs);
    } else if (initialized) {
      initialized = new IndaMailMove2Social(); 
    }
  }

  window.addEventListener("load", function() {
    window.removeEventListener("load", arguments.callee, true);
    if (window.location.toString().search("indamail.hu/blank.html") < 0) {
      initialize();
    }
    unsafeWindow.IndaMailMove2Social = IndaMailMove2Social;
  }, true);

})();
