// ==UserScript==
// @name        Phabricator Hotkeys!
// @namespace   http://userscripts.org/users/444814
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     https://phabricator.example.company.org/*
// ==/UserScript==
 
$(function() {
  var classes, urls;
  classes = {
    cards: 'phabricator-object-list-cards',
    orange: 'phabricator-object-item-bar-color-orange',
    form: '.aphront-form-control',
    itemLink: '.phabricator-object-item-link'
  };
  urls = {
    audit: '/audit/',
    addComment: '/audit/addcomment/'
  };
 
  function isOnAuditListPage() {
    return window.location.pathname == urls.audit;
  }
 
  function isOnAuditPage() {
    return $(classes.form).length > 0;
  }
 
  function openLastCard($container) {
    var link = $container.find('.' + classes.cards + ' .' + classes.orange).last().find(classes.itemLink).attr('href');
    console.log(link);
    if (typeof link == 'undefined') {
      alert('Congrats, no more changes to audit!');
    } else {
      window.location.href = link;
    }
  }
 
  function openLastCardOnScreen() { openLastCard($(document)); }
  function openNextCard() {
    $.get(urls.audit).done(function(html){openLastCard($(html));});
  }
 
  function acceptAudit() {
    var $form = $('form[action="/audit/addcomment/"]');
    $form.find('option[value="accept"]').prop('selected', true);
    $.post(urls.addComment, $form.serialize()).done(openNextCard);
  }
  
  if (isOnAuditListPage()) {
    new JX.KeyboardShortcut("m", "Open the oldest change that requires audit and doesn't have an issue raised").setHandler(openLastCardOnScreen).register();
  } else if (isOnAuditPage()) {
    new JX.KeyboardShortcut("m", "Open the oldest change that requires audit and doesn't have an issue raised").setHandler(openNextCard).register();
    new JX.KeyboardShortcut("a", "Mark the audit as accepted and jump to the next commit needing audit").setHandler(acceptAudit).register();
  }
});