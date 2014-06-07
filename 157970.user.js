// ==UserScript==
// @name        Quote Retweet
// @namespace   http://hazelzhu.com/
// @description A extension make Twitter use convenient.
// @include     https://twitter.com/*
// @version     1.1.0
// ==/UserScript==
(function($) {
  var enabled = "classic-retweet-enabled", script = null;
  var escapeQuotes = function(str) { return str.replace(/['"]/g, "\\$&"); };
  $("#page-container").delegate(".tweet", "mouseover", function() {
    if (!$(this).attr(enabled)) {
      $(this).attr(enabled, "true");
      var replyAction = $(this).find(".action-reply-container").first();
      var classicRetweetAction = replyAction.clone();
      var link = classicRetweetAction.find(".js-action-reply");
      link.removeClass("js-action-reply");
      link.removeAttr("data-modal");
      var label = "Quote RT";
      link.attr("title", label);
      link.find("b").html(label);
      link.find("i").attr("class", "sm-rt");
      $(this).find('.action-rt-container').after(classicRetweetAction);

      link.on("click", function(event) {
        var tweet = $(this).closest(".tweet");
        var text = tweet.find(".js-tweet-text").first();
        text.find("a").each(function(index) {
          $(this).html($(this).data("expanded-url"));
        });
        var title = "Quote Retweet", content = " RT @" + tweet.data("screen-name") + ": " + text.text().trim();
        var dialog = $("#global-tweet-dialog");
        if (dialog.length) {
          $("#global-new-tweet-button").trigger("click");
          dialog.find("h3").html(title);
          dialog.find("#tweet-box-global").html(content).focus();
          dialog.find("textarea.tweet-box-shadow").val(content);
		  var s = document.getElementById('tweet-box-global');
          s.selectionStart = s.selectionEnd = 0;
        }
        else if ($(".twttr-dialog-wrapper").length) {
          if (window.twttr && twttr.widget && twttr.widget.TweetDialog) {
            new twttr.widget.TweetDialog({
              basic: false,
              modal: false,
              draggable: true,
              template: {
                title: title
              },
              defaultContent: content,
              origin: "new-tweet-titlebar-button"
            }).open().focus();
          }
          else {
            if (script != null) {
              script.parentNode.removeChild(script);
            }
            script = document.createElement("script");
            script.textContent = 'if (window.twttr && twttr.widget && twttr.widget.TweetDialog) { ' +
              'new twttr.widget.TweetDialog({ ' +
                'basic: false, ' +
                'modal: false, ' +
                'draggable: true, ' +
                'template: { ' +
                  'title: "' + escapeQuotes(title) + '" ' +
                '}, ' +
                'defaultContent: "' + escapeQuotes(content) + '", ' +
                'origin: "new-tweet-titlebar-button" ' +
              '}).open().focus(); ' +
            ' }';
            document.body.insertBefore(script, document.body.firstChild);
          }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    }
  });
})($);
(function (document) {
    var keyEnter = 13,
        keyShift = 16,
        keyCtrl = 17,
        isCtrlPressed = false,
        isShiftPressed = false;

    var hasClass = function(el, className) {
        return new RegExp("\\b" + className + "\\b", "g").test(el.className);
    }

    var onKeyDown = function(event) {
        if (event.which === keyCtrl) {
            isCtrlPressed = true;
        }
        else if (event.which === keyShift) {
            isShiftPressed = true;
        }
        else if (event.which === keyEnter && (isShiftPressed || isCtrlPressed) &&
            hasClass(event.target, "tweet-box")) {
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            event.target.parentNode.parentNode.querySelector("button.tweet-action").dispatchEvent(clickEvent);
            event.preventDefault();
        }
    }

    var onKeyUp = function(event) {
        if (event.which === keyCtrl) {
            isCtrlPressed = false;
        }
        else if (event.which === keyShift) {
            isShiftPressed = false;
        }
    }

    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
})(document);

si = window.setInterval(clearanchors, 2000);
function clearanchors(){
    anchors = document.getElementsByTagName('a')
    for(i=0;i<anchors.length;i++){
        if(anchors[i].getAttribute('data-expanded-url') != null){
            anchors[i].setAttribute('href', anchors[i].getAttribute('data-expanded-url'));
        }
    }
}


function RTCode()
		{
			var statusBoxID = ".twitter-anywhere-tweet-box-editor:last";
			var DMTag = '<li class="action-dm-container DM-link"><a class="with-icn" href="#" title="Quick Direct Message"> <i class="action-reply"></i><b>DM</b></a> </li>';
			
			var username = jQuery.trim($("#screen-name:first").text());
			
			$(".js-stream-item").live('mouseover',function(){
					
					if ($(this).find(".DM-link").length == 0 ){
						$(this).find(".js-actions").append(DMTag).find(".DM-link").click(
							function(){
								var tweet = $(this).parent().parent().parent().parent().parent();
								var screenName = tweet.find(".username:first").text().replace("@","");
								if (screenName == "")
									screenName = $(".username:first").text().replace("@","");
								var tweetext = "DM "+ screenName+ " ";
								
								$(".nav-tweet").click();
								$("#tweet-box-global").html(tweetext);
								
								/*new twttr.widget.TweetDialog({
									template:{title:"Quick Direct Message to "+screenName},
									modal: true,
									draggable: true,
									defaultContent: tweetext,
									origin: "new-tweet-titlebar-button"
								}).open().focus();*/
								
								return false;
							});
				}
			});
			
			
			function formatTweet(element) {
				myElement = element.clone();
				myElement.find('.twitter-timeline-link').each(function() {
					$(this).text($(this).attr('href'));
				});
				myElement.find('.peerindex').remove();
				return myElement.text().replace(/\n/g, ' ').replace(/ +(?= )/g,'');
			}
			
			function speak2tweet(tweet)
			{
				$(statusBoxID).val(tweet);
			}
		
			
		
		}
		
	
			$(document).ready(function() {
			var node = document.createElement('script');
			var toInject = "("+RTCode.toString()+")();";
			
			node.innerText = toInject ;
			document.querySelector('body').appendChild(node);
			});