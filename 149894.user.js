// ==UserScript==
// @name         MAL Compatibility
// @namespace    shaldengeki
// @version      0.3
// @description  Returns MAL compatibility for the given user.
// @match        http://boards.endoftheinter.net/showmessages.php*
// @match        https://boards.endoftheinter.net/showmessages.php*
// @match        http://archives.endoftheinter.net/showmessages.php*
// @match        https://archives.endoftheinter.net/showmessages.php*
// @copyright    2012+, Shal Dengeki
// @grant        GM_xmlhttpRequest
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL    http://userscripts.org/scripts/source/149894.user.js
// ==/UserScript==

//livelinks compatiblity
//gratuitously stolen from pendevin (http://userscripts.org/scripts/review/42993)
function livelinks(func){
    document.addEventListener(
        'DOMNodeInserted',
        function(e){
            if(e.target.firstChild&&e.target.firstChild.className=='message-container')
                func(e.target.firstChild);
        },
        false
    );
    func(document);
}

function replaceMALLink(elt) {
    // takes a link of the form http://myanimelist.net/* and replaces its title with the compatibility between these users.
    var u1 = $('.userbar > a:first').attr('href').split('user=')[1];
    var potentialUsername = $(elt).attr('href').replace(/^.*\/|\.[^.]*$/g, '');
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://llanim.us/fetchMALCompat.php?u1=" + u1 + "&u2=" + potentialUsername,
      onload: function (response) {
        var data = response.responseText;
        console.log(data);
        if (data.length > 0) {
          $(elt).addClass('malCompat-mal-uname-' + potentialUsername);
          $(elt).attr('title', data + "%");
        }
      }
  });
}

function replaceCompatLink(elt) {
  // take a MAL Compat link and fetch the compat between these users (if any).
  $(elt).text("Fetching...").unbind('click');
  var u1 = $('.userbar > a:first').attr('href').split('user=')[1];
  var u2 = $(elt).parent().find('a:first').attr('href').split('user=')[1];
  GM_xmlhttpRequest ( {
      method: 'GET',
      url: "http://llanim.us/fetchMALCompat.php?u1=" + u1 + "&u2=" + u2,
      onload: function (response) {
          var data = response.responseText;
          console.log(data);
          $('.' + $(elt).attr('class').split(/\s+/)[0]).each(function() {
              $(this).unbind('click');
              $(this).addClass('malCompat-uid-' + u2 + '-processed').text("MAL Compat: " + data + "%");
          });

      }
  } );
}
function appendLinks() {
    $('.infobar').next().find('.message-container > .message-top').each(function() {
        var uid = $(this).find('a:first').attr('href').split('user=')[1];
        if (!$(this).hasClass('malCompat-processed')) {
            $(this).addClass('malCompat-processed');
            // replace the titles of links to MAL with compat %.
            $(this).next().find('a[href^="http://myanimelist.net/"]').each(function() {
              var uname = $(this).attr('href').replace(/^.*\/|\.[^.]*$/g, '');
              if ($('.malCompat-mal-uname-' + uname).length > 0) {
                $(this).attr('title', $('.malCompat-mal-uname-' + uname + ':first').attr('title'));
              } else {
                replaceMALLink(this);
              }
            });
            // add links to calculate mal compat on the fly.
            if ($('.malCompat-uid-' + uid + '-processed').length > 0) {
              linkElt = $("<span></span>").css('text-decoration', 'underline').css('cursor', 'pointer').addClass('malCompat-uid-' + uid).text($('.malCompat-uid-' + uid + '-processed:first').text());
            } else {
              linkElt = $("<span></span>").css('text-decoration', 'underline').css('cursor', 'pointer').addClass('malCompat-uid-' + uid).text("MAL Compat").click(function() {
                  replaceCompatLink(this);
              });
            }
            $(this).append(" | ");
            $(this).append(linkElt);
        }
    });
}
livelinks(appendLinks);