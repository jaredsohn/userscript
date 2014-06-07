// ==UserScript==
// @name          Resource Guru 8h
// @namespace     http://ymbra.com
// @description   Set 8h as default ResourceGuru
// @match       https://*.resourceguruapp.com/bookings/calendar
// ==/UserScript==

document.getElementById('calendar-modal-form').addEventListener('DOMAttrModified', function(e){
  if (e.attrName === 'style') {
    if (e.newValue == 'display: block;') {
      document.getElementById('booking-hour-time').value = 8;
    }
  }
}, false);