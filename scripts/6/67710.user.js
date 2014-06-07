// ==UserScript==
// @name           kuvalauta
// @namespace      lolcat
// @include        http://www.kuvalauta.fi/*
// ==/UserScript==
//
// TODO:
// - Hideable config box
// - Possibly add small notification on each thread to express expandability
// - Hotkey for opening selected thread's first image
// - Close extra threads on space?
// - Add omitted posts
// - Don't toggle replies if they are visible because of the config settings

var console = unsafeWindow.console;
var jQuery = unsafeWindow.jQuery;

var settings = {
  hideReplies: GM_getValue('hideReplies', true),
  animate: GM_getValue('animate', true)
};

(function($) {
  var setupConfig = function() {
    if (isThread()) {
      var updateWrap = $('<div style="font-size: 90%; position:fixed; bottom:0; right: 0; background-color: inherit;" />"').appendTo('body');
      var updateConfig = $('<fieldset style="background-color: #FFF0E4; border: 1px solid #B38383; border-width: 1px 0px 0px 1px"> \
                              <legend><strong>kuvalauta.user.js</strong></legend> \
                              <label for="autoUpdate">Päivitä automaattisesti</label> \
                              <input type="checkbox" id="autoUpdate" name="autoUpdate" /><br/> \
                            </fieldset>').appendTo(updateWrap);

      var id; // Interval ID
      updateConfig.find('#autoUpdate').change(function() {
        if ($(this).attr('checked')) {
          updateThread();
          id = setInterval(updateThread, 30000);
        } else {
          clearInterval(id);
        }
      });
    };

    if (!isThread()) {
      var config = $('<div style="float: left; font-size: 90%; text-align: left;"> \
                        <fieldset style="background-color: #FFF0E4; border: 1px solid #B38383"> \
                          <legend><strong>kuvalauta.user.js</strong></legend> \
                          <label for="hideReplies">Piilota vastaukset</label> \
                          <input type="checkbox" id="hideReplies" name="hideReplies" /><br/> \
                          <label for="animate">Animoi skrollaus</label> \
                          <input type="checkbox" id="animate" name="animate" /> \
                          <p style="margin: 10px 0 0 0"> \
                            <strong><i>Väli</i></strong>: Seuraava ketju<br/> \
                            <strong><i>E</i></strong>: Avaa tai sulje nykyinen ketju<br/> \
                            <strong><i>Q</i></strong>: Edellinen sivu<br/> \
                            <strong><i>W</i></strong>: Seuraava sivu \
                          </p> \
                        </fieldset> \
                      </div>').prependTo('.postarea');

      var hideReplies = config.find('#hideReplies');
      hideReplies.attr('checked', settings.hideReplies);
      hideReplies.change(function() {
        checked = $(this).attr('checked');
        setTimeout(function() { GM_setValue('hideReplies', checked) }, 0)
        $("div[id^='replies']").toggle();
      });

      var animate = config.find('#animate');
      animate.attr('checked', settings.animate);
      animate.change(function() {
        checked = $(this).attr('checked');
        settings.animate = checked;
        setTimeout(function() { GM_setValue('animate', checked) }, 0)
      });
    };
  };

  var isThread = function() {
    return !!location.pathname.match(/\/res\/\d+\.html$/);
  };

  var updateThread = function() {
    var match = location.pathname.match(/\/(.*?)\/res\/(\d+)\.html$/);
    var board = match[1];
    var id    = match[2];

    jQuery.ajax({
      url: "/expand.php?board=" + board + "&threadid=" + id,
      type: "GET",
      success: function(data) {
        var replyData = $(data);

        var currentReplies = $.map($("td[id^='reply']"), function(a) {
          return $(a).attr('id');
        });

        var allReplies = $.map(replyData.find("td[id^='reply']"), function(a) {
          return $(a).attr('id');
        });

        var newReplies = allReplies.filter(function(s) { return !currentReplies.include(s) });
        var lastReply  = $("form#delform > table:has(.reply):last");

        $.each(newReplies, function() {
          var replyTable = replyData.find('#'+this).closest('table');
          replyTable.find('td.reply').css('background-color', '#FFE8CB');
          replyTable.hide();
          replyTable.insertAfter(lastReply);
          replyTable.fadeIn(500);
          lastReply = replyTable;
        });
      }
    });
  };

  $(function() {
    setupConfig();

    if (!isThread()) {
      var curThread = 0;
      var threads = $("div[id^='thread']");

      var toggleThread = function() {
        $thr = $(threads[curThread-1]);

        if ($thr.data('msgs') < 1) return;
        $thr.find("div[id^='replies']").toggle();

        if (!$thr.data('expanded')) {
          var match = $thr.attr('id').match(/thread(\d+)(.+)/)
          var id    = match[1];
          var board = match[2];
          unsafeWindow.expandthread(id, board);

          $thr.data('expanded', true);
        }
      };

      if (settings.hideReplies) {
         $("div[id^='replies']").hide();
      }

      threads.each(function(i) {
        var $thr = $(this);
        var omitted = $thr.find(".omittedposts").text().replace(/\n/g, '');
        var match = omitted.match(/\d+/g) || [0, 0];
        var msgs = parseInt(match[0] || 0);
        var pics = parseInt(match[1] || 0);
        var visible_msgs = $thr.find(".reply").length;
        var visible_pics = $thr.find(".reply .thumb").length;

        msgs += visible_msgs;
        pics += visible_pics;

        // It appears to be impossible to access $obj.data using this
        $(threads[i]).data('msgs', msgs);

        if (msgs > 0) var str = msgs + " viesti" + (msgs != 1 ? 'ä' : '');
        if (pics > 0) str += " ja " + pics + " kuva" + (pics != 1 ? 'a' : '');

        if (str) {
          $thr.find(".omittedposts").remove();
          $("<span/>")
          .css({fontWeight: 'bold', fontSize: '90%', backgroundColor: '#FFE4E4', padding: '1px', borderBottom: '1px dotted #AE6767'})
          .text(str)
          .appendTo($("<div/>").css({ marginBottom: '10px'}).prependTo($thr));
        }

        $thr.find("a[title^='Expand']").click(function() {
          $thr.find("div[id^='replies']").show();
        });

        // Adjust min-height based on thumb height
        $thr.css('minHeight', parseInt($thr.find(".thumb:eq(0), object:eq(0)").attr('height')) + 50)
      });

      $(document).keypress(function(event) {
        if ($(event.target).is('input, textarea')) return;

        // Q: Previous page
        if (event.charCode == 113) {
          $("input[value='Edellinen']").click();

        // W: Next page
        } else if (event.charCode == 119) {
          $("input[value='Seuraava']").click();

        // Space: Select and scroll to the next thread
        } else if (event.charCode == 32) {
          event.preventDefault();

          if (!event.shiftKey)
            curThread++;
          else {
            curThread--;
          }

          if (curThread > threads.length) {
            curThread = 1;
          } else if (curThread < 1) {
            curThread = threads.length;
          }

          $thr = $(threads[curThread-1]);

          var scrollPos = $thr.offset().top;
          if (settings.animate) {
            $('html, body').animate({scrollTop: scrollPos}, 250)
          } else {
            $('html, body').scrollTop(scrollPos);
          }

          threads.css({backgroundColor: 'transparent', border: 0});
          $thr.css({backgroundColor: '#fff', borderWidth: '0 1px 1px 0', borderStyle: 'solid', borderColor: '#D7C8C8', padding: '5px'});
        // E: Toggle current replies of current thread
        } else if (event.charCode == 101) {
          toggleThread();
        }
      });
    }
  });
})(jQuery);
