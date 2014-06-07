// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// Then restart Firefox and visit this script again.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          united.com Hold Enabler
// @version       0.04
// @namespace     http://www.flyertalk.com
// @description   Enables itinerary hold on United.com.
// @include       https://travel.united.com/ube/*
// @include       http://travel.united.com/ube/*
//
// @history 0.04  Revamp logic to work after 3/18 redesign.  Not quite perfect; see userscripts.org page for details.
// @history 0.03  Add http URL to @include after 2/1/10 redesign (pre-auth purchase screen is insecure)
// @history 0.02  Remove code to handle delete itinerary (not needed)
// @history 0.01  Initial Release
// ==/UserScript==

window.addEventListener('load',
  function() {
    if(unsafeWindow.go == null) {
        // don't do anything; not a real purchase page.
        return;
    }

    unsafeWindow.setUvTarget = function(target) {
        window.uvTarget = target;
    }

    unsafeWindow.go = function(ignoredTarget) {
        var target = window.uvTarget;
        if(target == null || (target != "purchase" && target != "provres")) {
            alert("la vaca se dice:\n\n\"You must select either Purchase or Hold to continue.\"\n\ngracias!");
            if (document.getElementById('purB')) {
                var disPurB = document.getElementById('purB');    
                purBCont = "<a href=\"javascript:validateForm('purchase');\" onfocus=\"blur();\" class=\"b\">&nbsp;<span class=\"a\"><s>Continue</s>&nbsp;</span></a>";
                disPurB.innerHTML = purBCont;
            }
            return;
        }
        unsafeWindow.document.getElementById('dispatch').value=target;
        unsafeWindow.document.forms['reviewInputForm'].submit();
    };

    var holdButton = '&nbsp;&nbsp;&nbsp;<b><input name="uvselect" type="radio" onClick="javascript:setUvTarget(\'purchase\');" id="uvpurchase"><label for="uvpurchase"> Purchase</label> <input name="uvselect" type="radio" onClick="javascript:setUvTarget(\'provres\');" id="uvhold"><label for="uvhold"> Hold</label></b>';

    var elements = document.evaluate(
        "//div[@id='purB']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < elements.snapshotLength; i++) {
        var holdDiv = document.createElement("div");
        holdDiv.setAttribute("id", "uvHoldB");
        holdDiv.style.display = "inline";
        holdDiv.innerHTML = holdButton;
        elements.snapshotItem(i).parentNode.insertBefore(holdDiv, elements.snapshotItem(i));
    }

  },
  true);