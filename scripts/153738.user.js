// ==UserScript==
// @name        Ignore, block and report group invites
// @include     http://steamcommunity.com/*/home/invites*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

jQuery.noConflict();
console.log('hi');

var infoBreak = jQuery('<span class="infoBreak">&nbsp;&nbsp;|&nbsp;&nbsp;</span>');
var trigger = jQuery('<a class="linkStandard" href="#">Ignore, block and report</a>');
infoBreak.appendTo('#ginvites_ignoreall');
trigger.appendTo('#ginvites_ignoreall');

trigger.click(function() {
  console.log('clicked');
  var groupInvites = jQuery('#BG_bottom > .inviterBlock');
  groupInvites.each(function(index, value) {
    console.log(value);
    var info = jQuery('.memberRow', value).last();
    if (jQuery('a', info).length == 2)
      return; // we have friends in this group, so we'll forgive them
    
    // ignore invite
    eval(jQuery('.acceptDeclineBlock .linkStandard', value).last().attr('href').slice(11));
    
    // open user's page
    jQuery.get(jQuery('a', info).first().attr('href'), function(data) {
      var id = jQuery('[name="abuseID"]', jQuery(data)).attr('value');
      // console.log(id);
      var angryLinks = jQuery('.actionItemNoIcon .linkActionSubtle', jQuery(data));
      
      // block all communication
      jQuery.post(angryLinks.first().attr('href'), {
        action: 'confirmBlock',
        newIDtoBlock: id
      });
      
      // report for spam
      jQuery.post('http://steamcommunity.com/actions/ReportAbuse/', {
        abuseID: id,
        abuseType: 'Spamming',
        ingameAppID: jQuery('[name="ingameAppID"]', jQuery(data)).attr('value'),
        abuseDescription: ''
      });
    });
  });
});