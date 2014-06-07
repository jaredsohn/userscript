// Highrise Dates Today
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Highrise Dates Today
// @description   Adds a "Today" link next to the first new date dropdown.
// @namespace     http://www.kevinashworth.com/UserScript/
// @include       https://*highrisehq.com/*/contact_dates
// ==/UserScript==

(function () {
  
    var todaylink = new Element('a', { 
      'class': 'admin', 
      'id': 'todaylink', 
      'style': 'text-decoration: underline'
    }).update("Today");
    $$("[id=add_contact_date] table tr:nth-child(3) td").each(function(element){
      element.insert(todaylink);
    });
    $("todaylink").observe("click", function() { 
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var self = this;
      self.siblings()[0].setValue(month);
      self.siblings()[1].setValue(day);
      self.siblings()[2].setValue(year);
    });
    
})();