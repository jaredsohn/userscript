// ==UserScript==
// @name       TPT (View Post) previews
// @namespace  http://boxmein.x10.mx/
// @version    2.1.1
// @description  Previews TPT posts accessible from (View Post) links. 
// @match      http://powdertoy.co.uk/Discussions/*
// @copyleft   2013+ boxmein. Free to use. 
// ==/UserScript==

// Update URL: http://userscripts.org/scripts/source/174701.user.js
/*jshint laxcomma: true*/

// http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';
  }

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {
  var getMessages = function (evt) {
    var x = new XMLHttpRequest()
      , postID = 0;
    postID = $(evt.target).data("id");
    console.log("Fetching message data for " + postID);

    x.open("GET", "/Discussions/Thread/Post.json?Post=" + postID);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.onreadystatechange = function() {
      if (x.readyState === 4) {
        console.log("Got some delicious JSON!"); 
        try {
          var post = JSON.parse(x.responseText)
            , mx = 0
            , my = 0
            , $box; 

          mx = evt.pageX || evt.clientX + document.body.scrollLeft;
          my = evt.pageY || evt.clientY + document.body.scrollTop;

          // data get!
          if (post.Status == 1) 
          {
            $box = $('<div class="popover fade bottom in" id="commentBox" style="display: block; opacity: 1; cursor: default; padding: 3px;position: absolute; z-index: 99999999999; top:'+(my+10)+'px; left:'+(mx-300)+'px; "><div class="arrow"></div><div class="popover-inner" style="max-width: 900px; min-width: 600px;"><div class="popover-content">'+post.Post+'</div></div></div>');
          }
          // error get!
          else if (post.Status == "0") // Either "0" or 0, not 100% sure
          {
            $box = $('<div class="popover fade bottom in" id="commentBox" style="display: block; opacity: 1; cursor: default; padding: 3px; max-width: 900px; min-width: 600px; position: absolute; z-index: 99999999999; top:'+(my+10)+'px; left:'+(mx-300)+'px;"><div class="arrow"></div><div class="popover-inner" style="max-width: 900px; min-width: 600px;"><div class="popover-content">Error: '+post.Error+'</div></div></div>');
          }
          // :O 
          else {
            $box = $('<div class="popover fade bottom in" id="commentBox" style="display: block; opacity: 1; cursor: default; padding: 3px; max-width: 900px; min-width: 600px; position: absolute; z-index: 99999999999; top:'+(my+10)+'px; left:'+(mx-300)+'px;"><div class="arrow"></div><div class="popover-inner" style="max-width: 900px; min-width: 600px;"><div class="popover-content">:O -- '+JSON.stringify(post)+'</div></div></div>'); 
          }
          $(document.body).one('click', function(evt) { $("#commentBox").remove(); });
          $("#commentBox").remove(); 
          $box.appendTo($(document.body));
        }
        catch (err) {
          console.log(err); 
        }
      }
    };
    x.send();
  };
  var applyPreviews = function ($) {
    $('.Message a[href*="View.html?Post="]')
      .each(function() {
        $(this).after($('<span class="messagePreview" title="Quick Preview" data-id="'+$(this).attr('href').split("=")[1]+'">&hellip;</span>'));
      });
    $('.messagePreview').click(getMessages);
  };
  var lfb = LoadForumBlocks;
  LoadForumBlocks = function () {
    lfb(); 
    if (lfb.lastTimeout)
      clearTimeout(lfb.lastTimeout);
    lfb.lastTimeout = setTimeout(function() {
        console.log("Regenerating previews."); 
        applyPreviews($ || jQuery || window.jQuery || ptjq);
        }, 4000);
  };
  applyPreviews($ || jQuery || window.jQuery || ptjq); 
});