// ==UserScript==
// @name           EmbedWithGuestpass
// @description    Embed private photos with a guest pass
// @namespace      vispillo
// @require        http://userscripts.org/scripts/source/78952.user.js
// @include        http://www.flickr.com/photos/*/*/
// @version        1.0.0
// ==/UserScript==
var pregpCode = '<p>Add a Guest Pass?</p> <div class="ShareGPMsg"> <p style="color: rgb(150, 149, 147); font-size: 11px; line-height: normal; margin: 5px 0pt;" class="sharing-privacy-msg">This photo is private. If you like, you can add a Guest Pass to the embed code to allow viewers to click through to this photo page.</p> </div> <p><input style="" value="Get a Guest Pass" class="Butt sharing-get-guest-passx" name="grab_link_get_butt_copy" id="grab_link_get_butt_copy" type="button"></p>';
var re = new RegExp(jQuery('#canonicalurl').attr('href'), 'g');

function getJSVariable(regex) {
  // Credit for this function goes to Alesa Dam
  var retval;
  var scripttags = document.getElementsByTagName('script');
  for (i = 0; i < scripttags.length; i++) {
    if (retval != undefined) {
      return;
    }
    var html = scripttags[i].innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {}
  }
  return retval;
}
jQuery.noConflict();
if ((getJSVariable(/\"?is_public\"?[ :]+[\'\"]([^\'\"]+)[\'\"],/) != 1) && (jQuery('#photo').length == 1 ) ) {
  jQuery('<div id="pre-gp-gen-cloned" style="margin-top:5px">').html(pregpCode).appendTo('#share-menu-options-embed div.share-menu-options-inner');
  jQuery('#pre-gp-gen-cloned p.sharing-privacy-msg').css({
    'color': '#969593',
    'font-size': '11px',
    'line-height': 'normal',
    'margin': '5px 0'
  }).text('This photo is private. If you like, you can add a Guest Pass to the embed code to allow viewers to click through to this photo page.');
  jQuery('#pre-gp-gen-cloned input[type=button]').attr('id', 'grab_link_get_butt_copy').attr('name', 'grab_link_get_butt_copy').click(function() {
    cont = jQuery('#share-menu-options-embed div.share-menu-options-inner').css('position', 'relative');
    div = jQuery('<div id="SharingGeneratingGpMsgcloned">');
    div.css({
      'width': cont.attr('offsetWidth'),
      'height': cont.attr('offsetHeight'),
      'margin-left': '-8px'
    });
    p = jQuery('<p id="SharingGeneratingGpTextcloned">');
    generating_content = '<img src="http://l.yimg.com/g/images/progress/balls-16x16-trans.gif" width="16" height="16" style="margin-right:10px;vertical-align:middle" alt="">';
    p.html(generating_content);
    mtop = ((cont.attr('offsetHeight') / 2) - (div.attr('offsetHeight') / 2) - 7) + 'px';
    p.css({
      'padding-top': mtop,
      'margin-left': 'auto',
      'margin-right': 'auto',
      'width': '16px'
    });
    div.append(p);
    jQuery('#share-menu-options-embed div.share-menu-options-inner > *:not(#SharingGeneratingMsgcloned)').hide()
    cont.append(div);
    jQuery.post('http://www.flickr.com/services/rest/', {
      'api_key': getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"],/),
      'auth_hash': getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"],/),
      'format': 'json',
      'method': 'flickr.sharing.createGuestpass',
      'nojsoncallback': 1,
      'photo': getJSVariable(/\"?photo_id\"?[ :]+[\'\"]([^\'\"]+)[\'\"],/)
    }, function(data) {
      jQuery('#pre-gp-gen-cloned').html('<div class="ShareGPMsg"> <p style="color: rgb(150, 149, 147); font-size: 11px; line-height: normal; margin: 5px 0pt;" class="sharing-privacy-msg">A guest pass is included in the embed code.</p> </div>')
      jQuery('#share-menu-options-embed div.share-menu-options-inner > *:not(#SharingGeneratingMsgcloned)').show();
      jQuery('#SharingGeneratingGpMsgcloned').hide();
      jQuery('textarea.embed-markup').each(function() {
        jQuery(this).val(jQuery(this).val().replace(re,data.guestpass.url));
      });
    }, 'json');
  });
}


