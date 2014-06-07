// ==UserScript==
// @name           Last.fm/events/add enhancer
// @description    Enhances the form to add events
// @include        http://www.lastfm.*/events/add*
// @include        http://www.last.fm/events/add*
// ==/UserScript==

// un-hide more options
document.getElementById('moreOptions').style.display = '';

var datefield = document.createElement('input');
//datefield.value = new Date().toISOString().substring(0, 4+1+2+1+2);
datefield.onchange = function (e) {
  var m; ;
  if (m = this.value.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
    document.getElementById('startday').value = m[3];
    document.getElementById('startmonth').value = m[2];
    document.getElementById('startyear').value = m[1];
  } else if (m = this.value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)) {
    document.getElementById('startday').value = m[1];
    document.getElementById('startmonth').value = m[2];
    document.getElementById('startyear').value = m[3];
  }
};
datefield.type = 'date';
datefield.style = {'float': 'right'};
var startday = document.getElementById('startday');
var div = document.createElement('div');
div.appendChild(datefield);
startday.parentNode.insertBefore(div, startday);
