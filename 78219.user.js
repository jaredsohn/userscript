// ==UserScript==
// @name           Llama Button
// @namespace      http://userscripts.org/users/173445
// @description    Add a Llama Button to deviantArt profile pages
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/?*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/78219.meta.js?interval=1
// ==/UserScript==


function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();';
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function () {

  var user_home = jQuery('#oh-menu-deviant a.oh-l').attr('href');

  if (!user_home || jQuery('.gruserbadge a.u').attr('href') == user_home || jQuery("#gmi-GroupMemberZone").length) {
    // User is not logged in or is looking at his own profile, do nothing.
    return;
  }

  var user_name = jQuery('.gruserbadge a.u').text();

  DiFi.pushPublicGet('User', 'getGiveMenu', [user_name], function (C, B, F, D) {
    if (B.response.status == 'SUCCESS') {
      gWebPage.update(B.response.content);
      jQuery('body').append(B.response.content.html);
      var llama_link = jQuery('a:contains(Llama Badge)', B.response.content.html);

      var llama_html = '<i class="icon" style="background-image: url(http://i.deviantart.net/badges/llama.gif); background-position: 0 -4px;"></i>Llama<b></b>';
      var ll;

      if (llama_link.length == 1) {
        ll = jQuery('<a/>').addClass('gmbutton2 gmbutton2ggr').attr('href', '#').attr('onClick', llama_link.attr('onClick')).html(llama_html);
      } else {
        ll = jQuery('<a/>').addClass('gmbutton2 gmbutton2ggr disabledbutton').attr('href', user_home + '/badges/').attr('title', 'You already gave some sweet llama love to ' + user_name).html(llama_html);
      }
      jQuery('div.gmbutton2town').append(ll);
    }
  });

  DiFi.send();
});
