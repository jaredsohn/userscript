// ==UserScript==
// @name           Lolocker
// @namespace      http://example.com/d3x/lolocker.user.js
// @include
// ==/UserScript==
var lolocker = {
  sites_array: [
    ["poczta.onet.pl", "e", ["foo.bar@example.com", "example@pentagon.gov"]]
  ],
  site: function(array) {
    this.address = array[0];
    this.login = {
      name: array[1],
      values: array[2]
    };
  },
  sites: [],
  create_sites: function() {
    var sites_array_size = lolocker.sites_array.length;
    for(var i=0; i < sites_array_size; i++) {
      lolocker.sites.push(new lolocker.site(lolocker.sites_array[i]));
    }
  },
  findParentForm: function(element) {
    return element.parentNode.nodeName == "FORM" ? element.parentNode : lolocker.findParentForm(element.parentNode);
  },
  restrictField: function(field, values) {
    lolocker.findParentForm(field).addEventListener('submit', function(e) {
      var values_count = values.length;
      var match = false;
      for(var i=0; i < values_count; i++) {
        if(field.value == values[i]) {
          match = true;
          break;
        }
      }
      if(!match) {
        e.preventDefault();
      }
    }, false);
  },
  init: function() {
    lolocker.create_sites();
    sites_count = lolocker.sites.length;
    for(var i=0; i < sites_count; i++) {
      if (document.location.href.match(lolocker.sites[i].address)) {
        lolocker.current_site = lolocker.sites[i];
        lolocker.restrictField(document.getElementsByName(lolocker.current_site.login.name).item(0), lolocker.current_site.login.values);
      }
    }
  }
};
lolocker.init();