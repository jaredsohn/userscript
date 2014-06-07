// ==UserScript==
// @name           reddit usability
// @description    Parent comment tooltips, remembers collapsed comments.
// @namespace      rane
// @author         Raine Virta <raine.virta@gmail.com>
// @include        http://www.reddit.com/*
// ==/UserScript==

// Chrome compatible method of using the jQuery provided by the site
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + reddit.toString() + ")(jQuery)";
document.body.appendChild(script);

function reddit($) {
  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  }

  Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
  }

  // Time in milliseconds after tooltip should appear after hovering 'parent'
  tooltipDelay = 400;
  tooltipCss = {
    backgroundColor: '#eee',
    padding: '3px',
    '-mozBorderRadius': '5px',
    '-webkitBorderRadius': '5px',
    borderWidth: '0 1px 1px 0',
    borderStyle: 'solid',
    borderColor: '#ABABAB'
  }

  var cache = {};
  var collapsedComments = localStorage.getObject('collapsedComments') || [];

  var on_comments = function() {
    function toggleComments(comments) {
      $.each(comments, function(i,id) {
        $('[class*=' + id + '] > .entry > div:visible .expand').click();
      });
    }

    // Selector for root-level comment expand links ( [+], [-] )
    var rootLevelExpand = '.commentarea > .sitetable > .comment > .entry > div:visible .expand';
    var linkId = $('body .content .link').attr('class').match(/id-.*?_([^\s]+)/)[1];

    if (localStorage.linkId != linkId) {
      collapsedComments = [];
      localStorage.collapsedComments = null;
      localStorage.linkId = linkId;
    }

    var bar = $("<p>").css({margin: '10px'});
    var expandAll = $('<a>expand all comments</a>').click(function() {
      toggleComments(collapsedComments);
      collapsedComments = [];
      localStorage.collapsedComments = null;
    }).css({cursor: 'pointer', marginBottom: '5px'});

    bar.append(expandAll);

    $(".commentarea .sitetable:first").before(bar);

    toggleComments(collapsedComments);

    $(".expand").click(function() {
      var commentId = $(this).parents(".comment").attr('class').match(/id-.*?_([^\s]+)/)[1];

      if (collapsedComments.indexOf(commentId) != -1) {
        collapsedComments.splice(collapsedComments.indexOf(commentId), 1);
      } else {
        collapsedComments.push(commentId);
      }

      localStorage.setObject('collapsedComments', collapsedComments);
    });

    $("a.bylink:contains(parent)").mouseover(function() {
      var entry = $(this).closest('.entry');
      var self = $(this);

      var id = setTimeout(function() {
        var parentId = self.attr('href').substring(1);
        var parent = $("div[class*="+parentId+"] > .entry");
        var _parent;

        var showTooltip = function() {
          // Remove crap
          _parent.find('.flat-list.buttons, .expand').remove();

          // Make tagline text darker
          _parent.find('.tagline').css('color', '#3E3E3E');
          _parent.find('.usertext-body').css('backgroundColor', 'transparent');

          var tooltip = $("<div/>").css(tooltipCss).css({position: 'absolute', zIndex: 100000}).hide().appendTo("body");
          _parent.appendTo(tooltip);

          var offset = entry.offset();

          // Tooltip doesn't fit above
          if ($(window).scrollTop() >= (offset.top - tooltip.outerHeight(true))) {
            // Show tooltip below instead
            offset.top = offset.top + entry.outerHeight(true);
          } else {
            offset.top = offset.top - tooltip.outerHeight(true);
          }

          tooltip.css({top: offset.top, left: offset.left});
          tooltip.show();
          self.data('tooltip', tooltip);

          self.one('mouseout', function() {
            self.data('tooltip').remove();
          });
        };

        // Parent not visible, load using ajax
        if (!parent.length) {
          var url = self.attr('href');
          var parentId = url.match(/([^/]*?)$/)[0];

          if (cache[parentId]) {
            _parent = cache[parentId];
            showTooltip();
          } else {
            self.text('loading');

            $.get(url, function(data) {
              var resp = $(data);
              _parent = resp.find("div[class*="+parentId+"] > .entry");
              cache[parentId] = _parent;
              self.text('parent');
              showTooltip();
            });
          }

          return;
        }

        _parent = parent.clone();
        var isHidden = ($(window).scrollTop() >= $(parent).offset().top);

        if (isHidden) {
          showTooltip();
        } else {
          parent.css('background-color', '#F7F7F7');

          self.one('mouseout', function() {
            parent.css('background-color', 'transparent');
          });
        }
      }, tooltipDelay);

      self.one('mouseout', function() {
        clearTimeout(id);
      });
    });
  };

  if ($(".commentarea").length) on_comments();
}
