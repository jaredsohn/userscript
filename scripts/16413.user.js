// ==UserScript==
// @name           Enable Live Space Post Button
// @namespace      http://ftofficer.spaces.live.com
// @description    Enable Live Space Post Button
// @include        http://*.spaces.live.com/*
// ==/UserScript==

function LiveSpace_enableButton(id) {
  var button = document.getElementById(id);
  if ( button ) {
    var cls = button.getAttribute("class");
    var clsNameEnd = cls.indexOf("spDisabled");
    if ( clsNameEnd != -1 ) {
      clsNameEnd--;   // skip " " before spDisabled
      var newCls = cls.substring(0, clsNameEnd);
     
      button.setAttribute("class", newCls);
      button.setAttribute("mi:state", "enabled");

      var aNode = document.createElement("a");
      aNode.id = id;
      aNode.href = "#";
    }
  }
}

LiveSpace_enableButton("actionToolbarBlogPost");
LiveSpace_enableButton("actionToolbarSave");