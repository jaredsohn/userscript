// ==UserScript==
// @name           Toggle Google Toolbar
// @namespace      jp.mitukiii.google.search
// @include        http*://www.google.*/search*
// ==/UserScript==
(function() {
  var e_nav = document.getElementById('leftnav'),
  e_col = document.getElementById('center_col'),
  e = document.createElement('a'),
  e_id = 'google_search_toogler_toggle_button';
  e_style = 'margin: 0 0 0 3px; padding: 2px 0 1px 10px; position: absolute; top: -15pt; width: 142px;',
  e_status = false,
  e_margin = e_col.style.marginLeft;
  e_show_text = '表示',
  e_hide_text = '非表示',
  e_event = function(evt) {
    e.blur();
    if (e_status) {
      e_nav.style.display = '';
      e_col.style.marginLeft = e_margin;
      e.innerHTML = e_hide_text;
    } else {
      e_nav.style.display = 'none';
      e_col.style.marginLeft = '0';
      e.innerHTML = e_show_text;
    };
    e_status = !e_status;
    if (evt) {
      evt.preventDefault();
    };
  };
  e.setAttribute('href', '#');
  e.setAttribute('id', e_id);
  e.setAttribute('style', e_style);
  e_col.parentNode.insertBefore(e, e_col.nextSibling);
  e_event.call(e, null);
  e.addEventListener('click', function(evt) { e_event.call(this, evt); }, false);
})();