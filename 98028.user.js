// ==UserScript==
// @name           AlwaysShowGroupSetRemoval
// @namespace      vispillo
// @require        http://vispillo.org/78952.user.js
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

function GM_addStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
function getJSVar(reMatch) {
  var retval;
  jQuery('script').each(function(i,script) {
    if (retval) {
      return;
    }
    var html = script.innerHTML;
    if (html.match(reMatch)) {
      try {
        retval = html.match(reMatch)[1];
      } catch (e) {
        GM_log("error executing RegExp: " + e);
        retval = undefined;
      }
    }
  });
  return retval;
}

jQuery.noConflict();
GM_addStyle('a.remove-from-context { display:block !important }');
if (document.getElementById('primary-column')) {
  var photoid = jQuery('input[name=photo]').val();
  var magicCo = jQuery('input[name=magic_cookie]').val();
  var apikey = getJSVar(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"],/);
  jQuery('li[data-context-type=set] a.remove-from-context').each(function() {
    var that = jQuery(this);
    that.click(function(e) {
      e.preventDefault();
      var setid = that.parent().parent().attr('data-context-set_id');
      that.find('img').attr('src','http://l.yimg.com/g/images/pulser2.gif').css({'width':'20px','margin-top':'4px','margin-right':'-4px'});
      jQuery.post('http://www.flickr.com/services/rest/',{'api_key':apikey,'auth_hash':magicCo,'method':'flickr.photosets.removePhoto','photo_id':photoid,'photoset_id':setid},function (data) {
        that.parent().parent().slideUp();
      });
    });
  });
}
