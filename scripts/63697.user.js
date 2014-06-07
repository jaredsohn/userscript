// ==UserScript==
// @name           github: Search any repository
// @description    Adds search ability to *any* github.com repo.
// @include        http*://github.com/*/*
// ==/UserScript==

(function(global) {
  var choiceElem, formElem, items, prevValue = '',
   $ = global.$, mark = ' \u2713', reSb = /#sb-([a-z]+)/,
   prevChoice = (global.location.href.match(reSb) || [0,''])[1];

  if (!$('.subnav-bar').length) {
    // grab previous search value
    prevValue = $('form#search-form input[name=q]').val();
    // remove ugly old UI
    $('.big-search').remove();
    // inject container
    $('.tabs').after('<div class="subnav-bar"></div>');
  } else {
    // remove old stank search form
    $('#repo-search-form').remove();
  }

  $('.subnav-bar').prepend(
    '<form id="repo-search-form" action="' + $('.pagehead.repohead h1 a')[1].href + '/search">' +
    '<input name="q" value="' + prevValue + '" type="text" class="search notnative">' +
    '<input id="choice" name="choice" value="code" type="hidden">' +
    '<input id="lang-value" name="langOverride" value="" type="hidden">' +
    '<input id="start-value" name="start" value="" type="hidden">' +
    '</form>' +
    '<ul style="float:right;margin-left:10px;">' +
    '<li><a id="search-by-select" class="dropdown" href="#">Search by (4)</a><ul>' +
    '<li><a style="color:black;" class="sb-code" href="#">Code</a></li>' +
    '<li><a style="color:black;" class="sb-grep" href="#">Commit Messages</a></li>' +
    '<li><a style="color:black;" class="sb-author" href="#">Author</a></li>' +
    '<li><a style="color:black;" class="sb-committer" href="#">Committer</a></li>' +
    '</ul></li></ul>');

  choiceElem = $('#choice')[0];
  formElem = $('#repo-search-form')[0];
  items = $('#search-by-select + ul a');

  items.click(function() {
    var cn = this.className,
     node = formElem.getAttributeNode('action');

    // add checkmark
    items.each(function(i, el) { el.textContent = el.textContent.replace(mark, '') });
    this.textContent += mark;
    // set choice
    choiceElem.value = cn.slice(3);
    // add hash to form action
    node.value = node.value.replace(reSb, '') + '#' + cn;
    // cancel default click action
    return false;
  });

  // set previous page's selected value
  $('.sb-' + (prevChoice || 'code'))[0].textContent += mark;
})(this.unsafeWindow || this);