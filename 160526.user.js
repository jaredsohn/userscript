// ==UserScript==
// @name    Trello to Phabricator
// @description Creates links between Trello and Phabricator
// @namespace http://userscripts.org/users/rfones
// @version   0.2
// @include   https://trello.com/*
// @require   http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

GM_config.init('Trello to Phabricator Settings',
  {
    'phabUrl':
    {
      'label': 'Phabricator URL (including trailing slash)',
      'type': 'text'
    }
  });

var parseCards = function () {
  $('.list-card').each(function (i, card) {
    var $this = $(this),
    $members = $this.find('.list-card-members'),
    string = $this.text(),
    task = string.match(/T(\d+)/),
    diff = string.match(/D(\d+)/),
    revision = string.match(/rD*(\d+)/),                
    phabUrl = GM_config.get('phabUrl');

    if (!phabUrl) {
      GM_config.open();
      return;
    }

    if (!$this.hasClass('parsed')) {
      $this.addClass('parsed');
      if (revision && revision.length) {
                $members.append('<div class="member phabLink phabLink-revision" data-type="r" data-id="' + revision[1] + '"><span class="member-initials" title="r' + revision[1] + '"> r </span></div>');
      }
      if (diff && diff.length) {
        $members.append('<div class="member phabLink phabLink-diff" data-type="D" data-id="' + diff[1] + '"><span class="member-initials" title="D' + diff[1] + '"> D </span></div>');
      }
      if (task && task.length) {
        $members.append('<div class="member phabLink phabLink-task" data-type="T" data-id="' + task[1] + '"><span class="member-initials" title="T' + task[1] + '"> T </span></div>');
      }
    }
  });
},
getMoreInfoTimeout,
getMoreInfo = function (obj) {
    var type = obj.attr('data-type'),
        id = obj.attr('data-id'),
        phabUrl = GM_config.get('phabUrl');
    if (type === 'T' && !obj.attr('data-title-loaded')) {
      $title = $('<div />').load(phabUrl + type + id + ' .aphront-headsup-core h1', function () {
            obj.closest('.list-card').find('.list-card-title').contents().filter(function () {
            return this.nodeType != 1;
        }).replaceWith($title.text());            
          obj.attr('data-title-loaded', true);
        });
    }
};

$(function () {
  GM_addStyle("phabLink { z-index: 100; } " +
    ".phabLink-task { background-color: #cfc } " +
    ".phabLink-diff { background-color: #ffc } " +
    ".phabLink-revision { background-color: #fcc }");
  $(document).delegate('.phabLink', 'mouseenter mouseleave', function (e) {
    var $this = $(this),
            type = $this.attr('data-type'),
            id = $this.attr('data-id'),
            link = GM_config.get('phabUrl') + type + (type === 'r' ? 'D' : '') + id;
    if (e.type === "mouseenter") {
            getMoreInfoTimeout = window.setTimeout(function () {
                getMoreInfo($this);
            }, 200);
      // intercept click
      $('.list-card').bind('click.phabLink', function (e) {
        window.open(link, 'phabricator');
        // close trello dialog
        window.history.back();
      });
    } else {
            window.clearTimeout(getMoreInfoTimeout);
      $('.list-card').unbind('click.phabLink');
    }
  });
    var $resetLink = $('<a href="#" class="board-header-btn dark-hover quiet">Reset Phabricator Links</a>')
      .on('click', function (e) {
            e.preventDefault();
            $('div.phabLink').remove();
            $('.list-card').removeClass('parsed');     
      parseCards();
        });
    $('#board-header').append($resetLink);
});

$(window).load(function () {
  // wait for cads to load
  window.setTimeout(parseCards, 500);
  // look for new cards every 60 seconds
  window.setInterval(parseCards, 60000);
});