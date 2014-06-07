// ==UserScript==
// @name           GMail fix
// @author         Kishore Senji
// @namespace      chiru
// @include        https://www.google.com/ig*
// @include        http://www.google.com/ig*
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// ==/UserScript==


(function() {
  var $ = unsafeWindow._gel;
  var allDivs = document.getElementsByTagName("div");
  var gadgetId = -1;
  
  function toHtml(mail) {
    var str = "<div class=\"tls\"><p ";
    str += "class=\"tld\" style=\"top:2px\">" + mail.c + "</p>";
    str += "<a title=\"" + mail.l + "\" target=\"igmail\" href=\"" + gmailUrl + "&message_id=" + mail.e + "&view=conv&extsrc=ig\">";
    str += mail.k;
    str += "&nbsp;-&nbsp;";
    str += mail.l;
    str += "&nbsp;-&nbsp;";
    str += "<span class=\"gt\">";
    str += mail.m;
    str += "</span>";
    str += "</a></div>";
    return str;
  }
  
  function render(gadgetId, gmailUrl) {
    return function (data) {
      var indexOfBrace = data.indexOf("{");
      eval("var m = "+data.substring(indexOfBrace));
                    
      /* Show display */
      var display = $("GM" + gadgetId + "display");
      display.style.display = "block";
          
      /* Show the label */
      var label = $("GM" + gadgetId + "label");
      label.innerHTML = "<a href=\"" + gmailUrl + "\"><b>Inbox (" + m.i + ")</b></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0)\" class=\"alt\" onclick=\"" + "GM" + gadgetId + ".togglePreview();blur();\"><span id=\"" + "GM" + gadgetId + "showhidemsg\">Hide preview</span></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + gmailUrl + "&view=comp&amp;extsrc=ig\" target=\"_blank\">Compose Mail</a>";
      label.style.display = "block";
          
      /* Remove Loading... message */
      $("GM" + gadgetId+"msg").innerHTML = "";
          
      var threads = $("GM" + gadgetId + "threads");
      var str = "<div>";
      for(var i=0; i<m.n.length; i++) {
        var mail = m.n[i];
        str += toHtml(mail);
      }
      str += "</div>";
      threads.innerHTML = str;
      threads.style.display = "block";
      var c = unsafeWindow.document.cookie;
      var indexOfVisibility = c.indexOf("GM" + gadgetId + ".visibility=");
      if(indexOfVisibility != -1) {
        var indexOfNextSemiColon = c.indexOf(";", indexOfVisibility);
        var visibility = c.substring(indexOfVisibility + ("GM" + gadgetId + ".visibility=").length, indexOfNextSemiColon != -1 ? indexOfNextSemiColon : c.length);
        if(visibility != null) {
          var threads = $("GM" + gadgetId + "threads");
          var currentVisibility = (threads.style.display != 'none');
          GM_log("visibility = " + visibility + "; currentVisibility = " + currentVisibility);
          if(("" + currentVisibility) != ("" + visibility)) {
            unsafeWindow["GM" + gadgetId].togglePreview();
          }
        }        
      }
    }
  }
  
  function togglePreview(gadgetId, oldTogglePreview) {
    return function() {
      oldTogglePreview();
      var threads = $("GM" + gadgetId + "threads");
      unsafeWindow.document.cookie = "GM" + gadgetId + ".visibility=" + (threads.style.display != 'none');
    }
  }
  
  for(var i=0; i<allDivs.length; i++) {
    var id = allDivs[i].id;
    var match = /GM(\d+)threads/.exec(id);
    if(match) {
      var gadgetId = match[1];
      var gadget = unsafeWindow["GM" + gadgetId];
      var gmailUrl = $("m_" + gadgetId + "_url").href;
      
      gadget.render = render(gadgetId, gmailUrl);
      var oldTogglePreview = gadget.togglePreview;
      gadget.togglePreview = togglePreview(gadgetId, oldTogglePreview);
      gadget.init(true);      
    }
  }
})();