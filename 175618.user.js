// ==UserScript==
// @name         StackTrello
// @author     	Benjamin Collins <ben.collins@acm.org>
// @namespace  	https://gist.github.com/aggieben
// @downloadURL https://gist.github.com/5811685/raw/stacktrello.user.js
// @updateURL   https://gist.github.com/5811685/raw/stacktrello.user.js
// @version    	0.0.3
// @downloadURL ttps://gist.github.com/aggieben/5811685/raw/stacktrello.user.js
// @updateURL   ttps://gist.github.com/aggieben/5811685/raw/stacktrello.user.js
// @description Script to render a link that will create a new trello card from a StackExchange site post
// @match      	*://*.stackoverflow.com/q*
// @match       *://*.stackexchange.com/q*
// @match       *://*.superuser.com/q*
// @match       *://*.serverfault.com/q*
// @run-at      document-end
// @copyright  	2013+, Benjamin Collins
// @require     http://code.jquery.com/jquery.min.js
// @require     https://github.com/alexei/sprintf.js/raw/master/src/sprintf.min.js
// @require     https://api.trello.com/1/client.js?key=e9002cf6caab2a10867d22384966ab42
// @require     https://github.com/domchristie/to-markdown/raw/master/src/to-markdown.js
// ==/UserScript==
// Settings for users to modify

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var log_levels = { trace: 5, debug: 4, info: 3, warn: 2, err: 1, off: 0 };
var log_level = log_levels.warn;

var se_client_id = 1685;
var se_api_key = 'lHi*7B5IMDmzKmssD34nkQ((';
var se_user_token = GM_getValue('se_user_token', null);

var trello_api_key = "e9002cf6caab2a10867d22384966ab42";
var trello_api_baseUrl = 'https://api.trello.com/1';
var trello_user_token = GM_getValue('trello_user_token', null);
var trello_cache = {};

var trelloTipHtml = '                                     \
<div class="trellopopup share-tip">                       \
<p class="messages"></p>                                  \
<p>Board: <select class="board"></select></p>             \
<p>List: <select class="list"></select></p>               \
<p>Labels: <select class="labels"></select></p>           \
<a class="close-share-tip" style="float: left;">close</a> \
<button style="float: right;">create card</button>        \
</div>                                                    \
';

var trelloLabelColors = {
  "blue": "#5F86C9",
  "green": "#5FC984",
  "orange": "#C9AD5F",
  "purple": "#B48BD6",
  "red": "#D68B8B",
  "yellow": "#D6D58B"
};

GM_log(sprintf("loaded StackTrello v%s with jquery %s",
               GM_info.script.version,$.fn.jquery));

function trace(msg) {if (log_level > log_levels.trace) GM_log(sprintf('trace: %s', msg));}
function debug(msg) {if (log_level > log_levels.debug) GM_log(sprintf('debug: %s', msg));}
function info(msg) {if (log_level > log_levels.info) GM_log(sprintf('info: %s', msg));}
function warn(msg) {if (log_level > log_levels.warn) GM_log(sprintf('warn: %s', msg));}
function err(msg) {if (log_level > log_levels.err) GM_log(sprintf('err: %s', msg));}

function trello_get(path, success, onerror) {
  var url = null;
  if (/\?/.test(path)) {
    url = sprintf('%s/%s&key=%s&token=%s',
     trello_api_baseUrl, path, trello_api_key, trello_user_token);
  } else {
    url = sprintf('%s/%s?key=%s&token=%s',
     trello_api_baseUrl, path, trello_api_key, trello_user_token);
  }

  debug('requesting: ' + url);
  return {
    url: url,
    method: 'GET',
    headers: { "Accept": "application/json" },
    onload: success,
    onerror: onerror || function(response) { GM_log(response); }
  };
}

function trello_post(path, data, success, error) {
  var url = null;
  if (/\?/.test(path)) {
    url = sprintf('%s/%s&key=%s&token=%s',
     trello_api_baseUrl, path, trello_api_key, trello_user_token);
  } else {
    url = sprintf('%s/%s?key=%s&token=%s',
     trello_api_baseUrl, path, trello_api_key, trello_user_token);
  }

  debug(sprintf('posting %s with data:  %s', url, JSON.stringify(data)));
  return {
    url: url,
    method: 'POST',
    data: JSON.stringify(data),
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    onload: success,
    onerror: error || function(response) { GM_log(response); }
  }; 
}

function trelloAuthorize() {
  Trello.authorize({
    type: 'popup',
    name: GM_info.script.name,
    scope: { read: true, write: true },
    success: function() {
      if (Trello.token()) {
        trello_user_token = Trello.token();
        GM_setValue('trello_user_token', trello_user_token);
        debug('authenticated with token: ' + trello_user_token);
      }
    }
  });
}

function updateBoardOptions(boards) {
  trace('updating boards');
  $board = $('select.board');
  $board.empty();
  for ( var i in boards ) {
    $board.append(sprintf('<option value="%s">%s</option>', boards[i].id, boards[i].name));   
  }

  GM_xmlhttpRequest(
    trello_get(
      sprintf('boards/%s/lists?filter=open', boards[0].id),
      function(response) {
       updateListOptions(JSON.parse(response.responseText));
       updateLabelOptions(boards[0].labelNames)
     }));
}

function updateListOptions(lists) {
  trace('updating lists');
  $list = $('select.list');
  $list.empty();
  for ( var i in lists) {
    $list.append(sprintf('<option value="%s">%s</option>', lists[i].id, lists[i].name));
  }
}

function updateLabelOptions(labels) {
  trace('updating labels');
  $list = $('select.labels');
  $list.empty();
  $list.append('<option value="">select one</option>');
  for (var l in labels) {
    $list.append(
      sprintf('<option style="background-color: %s;" value="%s">%s</option>', 
        trelloLabelColors[l], l, labels[l] || sprintf('-%s-',l)));
  }
}

function loadTrelloBoards() {
  GM_xmlhttpRequest(
    trello_get(
      'members/me/boards?filter=open',
      function(response) {
        if (response.status != 200) {
          if (/invalid token/i.test(response.responseText) || /unauthorized/i.test(response.statusText)) {
            warn('invalid token');
            $('div.trellopopup p.messages').html('An error has occurred.  Please try again');
            trello_user_token = null;
            GM_setValue('trello_user_token', null);
            Trello.deauthorize();
            trelloAuthorize();
            return;
          }
        }
        var json = JSON.parse(response.responseText);
        updateBoardOptions(json);
      })
    );
}

function loadTrelloLists(boardId) {
  GM_xmlhttpRequest(
    trello_get(
      sprintf('boards/%s/lists?filter=open', boardId),
      function(response) {
       var lists = JSON.parse(response.responseText);
       updateListOptions(lists);
     })); 
}

function loadTrelloBoard(boardId) {
  GM_xmlhttpRequest(
    trello_get(
      sprintf('boards/%s', boardId),
      function(response) {
        var board = JSON.parse(response.responseText)        
        updateLabelOptions(board.labelNames)
        loadTrelloLists(boardId);
      }));
}

function createTrelloCard(options) {
  GM_xmlhttpRequest(
    trello_post(
      'cards',
      { name: options.name, idList: options.listId, labels: options.labels, due: null, desc: options.desc },
      options.success));
}

function showTrelloTip($link) {    
  if (!trello_user_token) {
    trelloAuthorize();
  } else {
    debug('using token: ' + trello_user_token);
  }

  loadTrelloBoards();

  var $div = $(trelloTipHtml);
  var p = $link.parents('.post-menu');
  $div.appendTo(p)
  .fadeIn('fast')
  .find('.close-share-tip').click(function() { 
    $div.fadeOut('fast', function() { 
      $(this).trigger('removing').remove();
    }); 
  });

  $('select.board').on('change', function() {
    var id = $(this).val();
    loadTrelloBoard(id);    
  });

  $('div.trellopopup button').click(function(event) {
    var idattr = null;
    $parent = $(this).parents('div.question, div.answer');
    if ($parent.hasClass('question')) idattr = 'data-questionid';
    else if ($parent.hasClass('answer')) idattr = 'data.answerid';
    else warn("unable to get post id");

    info("create the card for post " + $parent.attr(idattr));
    var cardTitle = $('#question-header a').text();
    var cardText = sprintf('[Meta Post](https://%s/q/%s)\n\n---\n\n%s', 
                            window.location.host,
                            $parent.attr(idattr),
                            $parent.find('div.post-text').html());
    createTrelloCard({
      name: cardTitle,
      desc: toMarkdown(cardText.trim()),
      listId: $('select.list').val(),
      labels: [$('select.labels').val()],
      success: function(data) {
        $div.fadeOut('fast', function() {
          $(this).trigger('removing').remove();
        });
      }
    });
  });
}

// main script starts here
//////////////////////////////////////////////////////////////////
$('div.post-menu').append(function(index) {
  var $parent = $(this).parents('div.question, div.answer');
  var result = ['<span class="lsep">|</span>'];

  if ($parent.hasClass('question')) {
    result.push('<a href="#" title="Create a Trello card from this post" class="stacktrello" data-postid="' + $parent.attr('data-questionid') + '">trello</a>');
  } else if ($parent.hasClass('answer')) {
    result.push('<a href="#" title="Create a Trello card from this post" class="stacktrello" data-postid="' + $parent.attr('data-answerid') + '">trello</a>');
  }

  return result.join("");
});

$('a.stacktrello').on('click', function(event) {
  $this = $(event.target);
  showTrelloTip($this);

  return false;
});