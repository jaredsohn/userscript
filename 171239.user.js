// ==UserScript==
// @name           Duolinguo Invite Hider
// @namespace      fiveofoh
// @description    Adds a link to hide "Invite" buttons on the Facebook friend finder, leaving only friends who are actually on Duolinguo already
// @include        http://*duolinguo.com/
// ==/UserScript==

$('.go-back').prepend($('<a href="#" id="toggle-invite" data-toggle="show">Hide invites</a><br/>'))

$('#toggle-invite').click(function() {
  $invites = $('.invite-fb-friend').closest('li');

  if($(this).data('toggle') == 'show') {
    $(this).data('toggle','hide');
    $(this).text('Show invites');
    $invites.hide();
  } else {
    $(this).data('toggle','show');
    $(this).text('Hide invites');
    $invites.show();
  }

  return false;
});