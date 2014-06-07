// ==UserScript==
// @id             craigslist_regex_filter
// @name           Craigslist Regex Filter
// @version        1.2
// @namespace      https://github.com/epicyclist
// @author         Chris Canipe
// @description    A regular expression filter to remove Craigslist listings from view. Works in conjunction with "Hide Selected Craigslist Listings" (http://userscripts.org/scripts/show/127536) if it's installed.
// @include        http*://*.craigslist.*/*/*
// @exclude        http*://*.craigslist.*/cgi-bin/*
// @exclude        http*://*.craigslist.*/about/*
// @exclude        http*://forums.craigslist.*/*
// @exclude        http*://accounts.craigslist.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==

/*** Styles ***/
GM_addStyle((<><![CDATA[
  div.cl_filter {
    position: fixed;
    right: 0;
    bottom: 0;
    background-color: black;
    padding: 0.5em;
    width: 90%;
    color: white;
    font-weight: bold;
    z-index: 1;
  }
  div.cl_filter > input[type=text] {
    border: 0 none;
    border-bottom: solid gray 1px;
    background-color: black;
    color: white;
    width: 90%;
  } 
]]></>).toString());

/*** Interface ***/
$('body').prepend((<><![CDATA[
  <div class="cl_filter">
    /&nbsp;<input type="text" id="cl_filter_regex">&nbsp;/
    i<input type="checkbox" id="cl_filter_case_insensitive"/>
    &nbsp;&nbsp;
    <input type="button" value="filter" id="cl_filter_button">
  </div>
]]></>).toString());
// Load regex data
$('#cl_filter_regex').val(GM_getValue('cl_filter_regex', ''));
if (GM_getValue('cl_filter_case_insensitive', 0)) {
  $('#cl_filter_case_insensitive').attr('checked', true);
}

/*** Functions ***/
$('#cl_filter_button').click(function(){
  // Validate regex
  regex = $('#cl_filter_regex').val();
  case_insensitive = $('#cl_filter_case_insensitive:checked').length;
  try {
    regexp_object = new RegExp(regex, case_insensitive ? 'i' : '');
  }
  catch(e) {
    alert("Invalid regular expression:\n" + e);
    return;
  }
  // Save regex data
  GM_setValue("cl_filter_regex", regex);
  GM_setValue("cl_filter_case_insensitive", case_insensitive);
  // Look in links and locations
  $('blockquote > p > a, blockquote > p > span > font')
    .filter(function(){
      return $(this).text().match(regexp_object);
    })
    .parents('p')
    .each(function() {
      hide_button = $(this).find('input[type=button]').filter(function () {
        return /^hide_\d+$/.test($(this).attr('id'));
      });
      // Click "Hide Selected Craigslist Listings"s button if it exists. 
      // http://userscripts.org/scripts/review/127536
      if (hide_button.length) {
        hide_button.trigger('click');
      }
      // Otherwise just remove it from view.
      else {
        $(this).remove();
      }
    });
});
