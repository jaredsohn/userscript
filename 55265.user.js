// ==UserScript==
// @name           Bugzilla.mozilla.org dependency/blocker links
// @namespace      http://bugzilla.mozilla.org/
// @description    Adds "create dependency|blocker" links to BMO
// @include        https://bugzilla.mozilla.org/*
// ==/UserScript==



var GM = {};
GM.bmo = function()
{
  return {
    init: function() {
      var link_area = document.getElementById("dependson_input_area");
      if (link_area)
      {
        var deplink        = document.createElement("a");
        deplink.innerHTML = "Create new dependency";
        
        link_area.parentNode.appendChild(deplink);

        deplink.addEventListener("click", GM.bmo.clicked, true)
      }
    },
    clicked: function(e) {
      e.preventDefault();
      // we need to get the product, component and blocks
      var product   = document.getElementById("product").value;
      var component = document.getElementById("component").value;
      var bug_id    = document.getElementsByName('id')[0].value;
      var url       = "https://bugzilla.mozilla.org/enter_bug.cgi?product="+product+"&component="+component+"&blocked="+bug_id;

      window.open(url);
    }
  }
  
}();

GM.bmo.init();
