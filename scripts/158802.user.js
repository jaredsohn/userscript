// ==UserScript==
// @namespace http://userscripts.org/users/311626
// @name Last.fm HTTPS [youtube]
// @version 1.0.0.0
// @description Allows the use of HTTPS links in [youtube] tags on Last.fm.
// @include /^http://www\.last\.fm/(?:(?:group/.+?/)?forum/(?:\d+/_/\d+(?:(?:/\d+)?(?:#f\d+|#post)?)?|newthread(?:\?id=\d+?&baseurl=.+?)?|editmessage\?message=\d+)|.+?/journal/(?:create|.+?/edit)|inbox/(?:compose|pm/\d+?)(?:#preview)?)$/
// @require http://userscripts.org/scripts/source/68059.user.js
// ==/UserScript==

// This script's namespace.
var GM_LHY = {};

// Replace all occuring 'https' with 'http' in a YouTube link enclosed in a [youtube] tag.
GM_LHY.replaceYouTubeHttpsWithHttp = function (message) {
  // This regex matches an HTTPS YouTube video link enclosed in a [youtube] tag.
  var regex = /(\[youtube\]http)s(:\/\/(?:www\.)?youtube\.com\/watch\?.*?v=\w+.*?\[\/youtube\])/i;
  return message.replace(regex, '$1$2');
}

// Last.fm uses two methods for previewing/posting. One is used in forums and journals,
// with the other being used in the private messaging system. Here we check for unique element
// IDs, with the goal of determining which method is on the current page.
// NOTE: When I wrote this, I didn't realize that [youtube] was nonexistant in PMs.
// Still, the code will prove useful for future implementations.
if ($('editorPreview')) {
  GM_LHY.ppMethod = 'forums';
} else if ($('prevbutton')) {
  GM_LHY.ppMethod = 'inbox';
} else {
  GM_LHY.ppMethod = '';
}

if (GM_LHY.ppMethod === 'forums') {
  // Event.stopObserving() doesn't work for some reason. The alternative is to invalidate all
  // currently registered events by changing the element's ID. This will invalidate ALL events,
  // but it doesn't pose a problem, as there was only one event to begin with: the one we're
  // about to register.
  $('editorPreview').id = '_editorPreview';
  
  Event.observe($('_editorPreview'), 'click', function (event) {
    var editorPreviewValueOrig = $('_editorPreview').value;
    
    $('_editorPreview').disabled = true;
    $('_editorPreview').value = editorTranslations.pleasewait;
    
    new Ajax.Updater({
      success : 'editorPreviewPane'
    }, '/ajax/renderarticle/', {
      asynchronous : true,
      method : 'post',
      parameters : 'content=' + encodeURIComponent(GM_LHY.replaceYouTubeHttpsWithHttp($('message').value)),
      onSuccess : function () {
        $('_editorPreview').disabled = false;
        $('_editorPreview').value = editorPreviewValueOrig;
        $('editorPreviewContainer').style.display = 'block';
      },
      onFailure : function () {
        $('_editorPreview').disabled = false;
        $('_editorPreview').value = editorPreviewValueOrig;
        $('editorPreviewPane').value = "";
      }
    });
    
    Event.stop(event);
  }, false);
  
  // Event.stopObserving() doesn't work for some reason. The alternative is to invalidate all
  // currently registered events by changing the element's ID. This will invalidate ALL events,
  // but it doesn't pose a problem, as there was only one event to begin with: the one we're
  // about to register.
  $('editorSubmit').id = '_editorSubmit';
  
  Event.observe($('_editorSubmit'), 'click', function (event) {
    $('message').value = GM_LHY.replaceYouTubeHttpsWithHttp($('message').value);
    
    LFM.set('Page', {
      editorMessage : $('message').value
    });
  });
} else if (GM_LHY.ppMethod === 'inbox') {
  LFM.set("Inbox", {
    doPreview : function () {
      $("previewContainer").show();
      $("progbar").show();
      $('previewpane').update();
      
      new Ajax.Updater('previewpane', '/ajax/bbcode/', {
        method : 'post',
        parameters : {
          'raw' : GM_LHY.replaceYouTubeHttpsWithHttp($('body').value)
        },
        onComplete : function (transport) {
          $('progbar').hide();
        }
      });
      
      window.location.hash = "preview";
    }
  });
}
