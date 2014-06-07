// ==UserScript==
// @name        48 Comments Only
// @namespace   http://akr.tw/
// @version     1.3.12
//
// @description Google+（ぐぐたす）で AKB48 グループメンバーのコメントを抽出するユーザースクリプト。
// @icon        https://s3.amazonaws.com/uso_ss/icon/120097/large.png
// @author      Ming-Hsien Lin (akiratw)
// @license     MIT License
//
// @downloadURL https://userscripts.org/scripts/source/120097.user.js
// @updateURL   https://userscripts.org/scripts/source/120097.meta.js
//
// @match       https://plus.google.com/*
// @include     https://plus.google.com/*
// @exclude     https://plus.google.com/*_/*
//
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js
//
// @grant       GM_addStyle
// @grant       GM_setClipboard
//
// @run-at      document-idle
// @noframes
// ==/UserScript==

var CommentsOnly = function () {
  var self = this;

  self.NAME = '48 Comments Only';
  self.VERSION = '1.3.12';
  self.IS_CHROME = !!window.chrome && !!window.chrome.runtime;

  this.SETTINGS_KEY = 'userscript.48commentsonly';

  this.SELECTORS = {
    banner: '#gbqf',
    post: 'div[id^="update-"]',
    author: 'header a[oid]',
    content: 'div.Al.pf',
    comments: 'div.KK.gR',
    sharers: 'div.eK',
    plusone: {
      button: '.esw',
      pressed: '.eswa',
      normal: '.eswd'
    }
  };

  this.ICONS = {
    loading: 'data:image/gif;base64,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',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACvQAAAr0BiUEDvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAWdEVYdFRpdGxlADQ4IENvbW1lbnRzIE9ubHkLFjLLAAACcklEQVQ4jaWUTUhUURTHf/f55qk5zqeZU2hSpIsIwYKgMNDQzZQkNC2yoCgXQsvauG7VOrBNrYKwQluERGaCUUYFKRJBYC78Kh1lZvya0Zl7Wsw4as8k9MBZ3HvP+Z1zz/9y1ftLt5+4Xe56hWKnJgjRWLTHdDtd9T6v179j0pppqTcBRGTXLAAT0aD17kmiMdCAFpubxV5ApdcorPIAVnkAxB6bdjBEa0TLJneUlVB85wqOA3vB4aDo1kXyqo7grD2O70YjImLLEa3t11SWiSdUx8r4NIjgPFPF0pfvLPYPAuC7eR6rPMDKyMQW1xRho7saa1gaGCYVjgCCshxIPJE9l+UESin+zkMEEwHRaTVzK8twlPiJPO3Fd2g/ooWlj9/wtzaBMshxFWAGikiMTGRz1jsDMz08jZFn4QnVEb7/HFIaJCOMArQmt6I0LUoyBYayvwAtazDBHTrLQs9nUuFoplK6dd/1IHOPXrIyOgWAK3gKV/A00WdvbTBDtJB37DBGYT4L74ay6gAYhQXoxTiJkcnsfqx7gNyK0i3UFExE2HPyKI59PgJ3W7KFcjyFWAdLkGRqvdPMvqwms+v1mWVgs+2dtgftb21i/vUn8qsr8TY3MN/9AZVr4WluINLxxj4zEUyttdiUAeLDP0nOxoh09FJQU4X3WpDkTIRoVz+JH+O2eK21qL66lnaP01ULm/4gy+dyl28MXoovR+Mrid82CgBKIguxPrXVj/HixOUL1ZWVXQApnZLJmZlXk7O/2kJfuwa3hqXN/NeBiBBZmB8dm/l979zA4wfbQbaFJWU1OTY1+XB0Ltx2dahz+n9AAH8AasJvx9p50VAAAAAASUVORK5CYII=',
    settings: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABCklEQVR4nKXTPy9EQRQF8PU/svQSq5JoJXqNSiui2mh/kWi3I0ofQKIQhU5CodDxMVRUu6ESFIuVILtPM08mY188UdxMcs+55945c6eSZVnlP9E3iTVIchtYLStwix5OsIlTZGj+KoA5fIaCND4w21cA86ijWVCcRwvrWPgWwAieEuI1ljEVzpsEf8V4LjCEgwh8wXRytRl0Is4hhmPCKNoBPCsw9zzgzxj7YSIeAuG4QCB/jUcMpCbWo/HuUU2KJ6IGGRqxiZN4T0y6QC3gNVwmeAfVuMM2jvAWkbph3G6Ua2MXK0WLtBS2sN8O9LBYZpXvQsEV9sOZoVX2L+xgL3cag0Foq5TAX+ILTWdrlfnxT24AAAAASUVORK5CYII=',
    collapse: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAfUlEQVR4nNXSsQkCURRE0c00EK3C3C6swMRYDtiGHdiHDViBTWgm1iAYjImCiPy/7kYbTHgPPHhNkqbPesUDALDEoROAMS4I1l2A3SsObpi2BjDH/QMI9v8Ax684eGBRBbD6Eb93KgKY4FoAgk0J2Fbi4Fw7YVbZaECv3GZPL0C6D5doRJAAAAAASUVORK5CYII=',
    expand: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgUlEQVR4nM3SoQ3CUBRG4QYSBkARJmECxiDBfBJR30U6AmvgSWprGABD8PAwFQ0ht/TVVBx5TnLf+4uUUjGFSfIMAzjgNsAlCmzwQAqowhNwCuQWq6HAAtcf8hv7vx4RO7y+AudRv4C6Jz+xHRtY494Fyqwd4IgGy+whRfIMp5zDB0+gwsyFf2bqAAAAAElFTkSuQmCC',
    dropdown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAiUlEQVR4nLXSoQ3CUBQF0CYIAoYgmACFwSHRaDrEWQPLBtguwAwMgUTgWYAg4GFK0lT1/x/Elffk5uVVEVGVpKj8fwBTrEuAI24YJwNY4YXAIQe4tOXAE8vBAOpO+ZdzCjDCrJdJCrDHvZcmdcG1M/+NTeoRt/i0wCn3Dxo8MM8FFthlf+KQFANfGzfDcQ3pqD8AAAAASUVORK5CYII=',
    block: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABKElEQVR4nKXTuy5FURDGcZyTEBEKiUcgCkLlBURFvICGyI/HUCg4rgVRIBQ6hUSnEQWiQKNSiUoQISEujaOZLdvOuRSKVcx885/JWuubmmKxWPOfUzKJBgxjGusoYBRtVRtgEo8o4h03eIr4CytoLNkAa1F4gn7kUloXdkI/R/OfBpgIcT0NZgZ04gXf2P1tgHo8xOS6CvAdZjEXw/oScTASA1XgQsQteMNyUjCFT+QrwHOZ/AGOk2AVtxXg+RLaJq6TYAYvZeCFMtfaw3kSjMQbdGfgxTJwDvfYThKt+Ih/TuClcvbFWAwcTicX4n+fsVwB7gkvXKI26//TaFJASwbMYxyvYfWOUlZuimt8xx4cYgv7qf24QHu1bewNtx3hCmfYwBBq07U/MIlc+S9pbBUAAAAASUVORK5CYII=',
    blocked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABPklEQVR4nKWTvS6EURCGn7WbEBFbSFwCURAqNyAqsjegIRIuQ6HgW8sWRLGEQqeQ6DSieIliaVQqUQkiNiF+mv00c+Q4+X4KxSlm3nlmcs55hziO+c9JTAq6BBXBsqAhiASzgv7cBoJFwbMgFnwI7gQvFn8LNgXdiQ0E21Z4LpgQFD1tWHBgelPQ+6eBYMHEhg8GA4YELUFbcPjbQNApeLLJHRnwg2BVULVh406cssRkDhxZXBa8C+quYEnwJShlwNUgfyKQC7YE9xnwWoK2K7h1wYqglQLXUq51JGi6YMbeYCSA11PgouBRsO8SfYJP+2cHb6TZVzBnAyt+smb/+yqoZ8Cj5oVrQSH0/4U1iQTlACwJ5gVvZvXBJCv32DXatgengj3BsbcfV4KBvG0cM7edCW4El4IdwbSg4Nf+ALz5JK+eztUKAAAAAElFTkSuQmCC',
    addUser: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAzUlEQVR4nK3TMUqDQRCG4WgTbJTYWaQURQi5gOAZPICke06gHsHSRitTBA2SVMETWFtYeYX0KVMF1mZ/WMIkuMTig2V3vndmd2ZbKaXWLtrJvBGAc/SwXwVABz9IWXOc1QDuC3OjUQ3gLgC81wAeAsBHcf6M4TbAFVZrADjAEV7wmtftsAuYFeYv7GEcVPa4CXBdBN3kvS76mOYEfZxEVzjEZwH4bgK3vgFO8YRFUOoSb7jMc3IcAW4DY6RJ2MYKQFof7wZwgcFf9O+/8RfsjXoBH7fMzwAAAABJRU5ErkJggg==',
    close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8ElEQVR4nK3TzyrEURQH8BljodRM2VI2SlJ4AVmy9gr08RJ2ygvIEg8hVuMNrCZlSciSKCXJtblTpzu/n5kai7M53z/d8z3nNlJKjXFqLPGAAY5xg/UqMrZxi/0BA8wj5XrFciHewGfGvzFRGjTRDSYPmM3YEl4Cdlo3Qhu9QOxhEXeh18VkbYiYw1MQfBWG7aFbwAregjDhsT/SSGvEeWFwNPId4KAQJ/xgZ6gBdjO5L7wq8tj865C2itAOc/8k9N6xVnVInSK4s4C1cBmw+yqDGXxkwgVaxeumcZ3xZzSrRljNGUzVhNvBHhb+7Tf+AiQ5gYVlylm0AAAAAElFTkSuQmCC',
    copy: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAW0lEQVR42mNkgIKGhob/DEQCoFpGGJsR2YD6+nqCmhsbG+lgAEgRsQCnAcS6hvYGYPMOstxIcwG6odR3ATZ/YtOEDBixKcKXrGGugyVpsgyAqmHE6wJ8fkfOTACWlX8HDBsg/gAAAABJRU5ErkJggg=='
  };

  this.API = new GooglePlusAPI();

  this._settings = {
    gplusIDs: [],
    blockIDs: [],
    commentLoadTrigger: 'mouseenter',
    commentLoadInterval: 30000,
    loadSharers: true,
    highlightMyComments: true,
    commentsPosition: 'content',
    commentStyle: 'normal',
    triggerDelay: 0,
    autoExpand: true,
    hideStreamComments: false,
    displayCommentNumber: true,
    displayCommentHumanTime: true,
    colors: ['#FFF2F6', '#FFE6EE', '#FF3377'],
    memberData: {}
  };

  this._members = {
    groups: {},
    members: {},
    updated: null
  };

  this._login_user = {
    id: null,
    name: null,
    photo: null
  };

  this._idRegex = null;

  this._lang = {};

  this._readSettings();

  this._initData(function () {
    self._localize();
    self._renderGeneralUI();
    self._renderCommentUI();
    self._renderSettingsUI();
    self._writeSettings();
  });

  return this;
};

CommentsOnly.prototype._renderGeneralUI = function () {
  var self = this;

  /**
   * Adds CSS.
   */
  var addStyle = function () {
    self._addStyle('general',
      '.ext48co { color: #333; font: normal 12px Roboto, Arial, sans-serif; }' +
      '.ext48co a { color: #36C; text-decoration: none; }' +
      '.ext48co a:hover { text-decoration: underline; }' +
      'button.ext48co { cursor: pointer; margin: 2px 5px; padding: 5px 15px; border: 1px solid #CCC; border-radius: 2px; background: #FAFAFA; color: #333; font-weight: bold; }' +
      'button.ext48co:disabled { cursor: default; opacity: 0.5; }' +
      'button.ext48co:hover { box-shadow: 0 1px 1px #CCC; }' +
      'button.ext48co.ext48co-submit { border-color: #29691D; background: #3D9400; color: #FFF; }' +
      'button.ext48co.ext48co-main { border-color: #3079ED; background: #4D90FE; color: #FFF; }' +
      'button.ext48co.ext48co-extButton { margin: 0 2px; border-color: 1px solid rgba(0, 0, 0, 0.2); background: #CC295F; color: #FFF; font-size: 11px; }' +
      'input.ext48co { vertical-align: middle; }' +
      'input[type="text"].ext48co { margin: 2px; padding: 5px; font: normal 12px Roboto, Arial, sans-serif; }');
  };

  addStyle();
};

CommentsOnly.prototype._renderCommentUI = function () {
  var self = this;

  /**
   * Adds CSS.
   */
  var addStyle = function () {
    self._addStyle('comments',
      'div.ext48co-comments { display: none; padding: 5px; background: ' + self._settings.colors[1] + '; }' +
      'div.ext48co-comments.ext48co-popup { z-index: 9999; position: absolute; left: 480px; top: 30px; width: 360px; border-radius: 4px; box-shadow: 0 0 5px #CCC; }' +
      'div.ext48co-comments.ext48co-popup:after { content: ""; position: absolute; top: 10px; left: -10px; border-width: 10px 10px 10px 0; border-style: solid; border-color: transparent ' + self._settings.colors[1] + '; }' + self.SELECTORS.content + ' div.ext48co-comments { position: relative; margin: 20px 0 10px 0; border-radius: 4px; }' + self.SELECTORS.content + ' div.ext48co-comments:after { content: ""; position: absolute; top: -10px; left: 10px; border-width: 0 10px 10px; border-style: solid; border-color: ' + self._settings.colors[1] + ' transparent; }' +
      'div.ext48co-status { overflow: hidden; height: 18px; padding: 5px 50px 5px 5px; color: ' + self._settings.colors[2] + '; text-overflow: ellipsis; white-space: nowrap; }' +
      'div.ext48co-status img { margin: 0 2px; opacity: 0.5; }' +
      'div.ext48co-status a:hover img { opacity: 1; }' +
      'span.ext48co-status-text { cursor: pointer; }' +
      'img.ext48co-loading { padding: 0 5px 0 0; vertical-align: middle; }' +
      'span.ext48co-status-buttons { position: absolute; right: 5px; }' +
      'div.ext48co-comment { padding: 5px 5px 8px 5px; }' +
      'div.ext48co-comment:hover div.ext48co-comment-number { visibility: visible; }' +
      'div.ext48co-comment:hover span.ext48co-comment-plusone button { visibility: visible; }' +
      'div.ext48co-comment-myself { background: #FAFAFA; }' +
      'div.ext48co-comment-member { background: ' + self._settings.colors[0] + '; }' +
      'img.ext48co-comment-photo { position: absolute; border-radius: 2px; }' +
      'div.ext48co-comment-number { visibility: hidden; position: absolute; right: 5px; color: #CCC; font-size: 10px; }' +
      'div.ext48co-comment-content { position: relative; margin-left: 55px; }' +
      'div.ext48co-comment-author { font-weight: bold; }' +
      'div.ext48co-comment-body { margin: 2px 0; }' +
      'div.ext48co-comment-time { color: #999; }' +
      'a.ext48co-copy { opacity: 0.5; }' +
      'a.ext48co-copy:hover { opacity: 1; }' +
      'span.ext48co-comment-plusone { position: absolute; right: 5px; }' +
      'span.ext48co-comment-plusone button { visibility: hidden; vertical-align: top; cursor: pointer; border: 1px solid #D9D9D9; border-radius: 2px; background: #FFF; color: #262626; font: bold 11px Roboto, Arial, sans-serif; }' +
      'span.ext48co-comment-plusone button.ext48co-comment-plused { visibility: visible; border-color: #FFF; background: #DD4B39; color: #FFF; }' +
      'div.ext48co-comment-ballon { position: relative; padding: 5px; border: 1px solid #CCC; border-radius: 4px; background: #FFF; }' +
      'div.ext48co-comment-ballon:after { content: ""; position: absolute; top: 15px; left: -5px; border-width: 5px 5px 5px 0; border-style: solid; border-color: transparent #FFF; }' +
      'div.ext48co-comment-ballon:before { content: ""; position: absolute; top: 13px; left: -7px; border-width: 7px 7px 7px 0; border-style: solid; border-color: transparent #CCC; }' +
      'div.ext48co-comment-editor textarea { width: 90%; height: 50px; padding: 5px; border: 1px solid #CCC; font-size: 12px; }');
  };

  /**
   * Bind event handler functions.
   */
  var bindEvents = function () {
    $(document).on('loadComments', self.SELECTORS.post, loadComments);
    $(document).on('initComments', self.SELECTORS.post, initComments);
    $(document).on(self._settings.commentLoadTrigger, self.SELECTORS.post, function () {
      var $this = $(this);
      if (self._settings.triggerDelay) {
        setTimeout(function () {
          $this.trigger('loadComments');
        }, self._settings.triggerDelay);
      } else {
        $this.trigger('loadComments');
      }
    });

    $(document).on('toggleComments', 'div.ext48co-comments', toggleComments);
    $(document).on('addComments', 'div.ext48co-commentlist', addComments);
    $(document).on('addSharers', 'div.ext48co-sharerlist', addSharers);
    $(document).on('plusOneComment', 'div.ext48co-comment', plusOneComment);
    $(document).on('openEditor', 'div.ext48co-comment', openEditor);
    $(document).on('closeEditor', 'div.ext48co-comment', closeEditor);
    $(document).on('saveComment', 'div.ext48co-comment', saveComment);
    $(document).on('deleteComment', 'div.ext48co-comment', deleteComment);
    $(document).on('copyComment', 'div.ext48co-comment', copyComment);
    $(document).on('setStatusText', 'div.ext48co-status', setStatusText);

    $(document).on('click', 'div.ext48co-status', function () {
      var $comments = $(this).parents('div.ext48co-comments');
      $comments.trigger('toggleComments');
    });

    $(document).on('click', 'span.ext48co-comment-plusone button', function (event) {
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('plusOneComment');
    });

    $(document).on('click', 'a.ext48co-comment-edit', function (event) {
      event.preventDefault();
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('openEditor');
    });

    $(document).on('click', 'button.ext48co-comment-cancel', function (event) {
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('closeEditor');
    });

    $(document).on('click', 'button.ext48co-comment-save', function (event) {
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('saveComment');
    });

    $(document).on('click', 'button.ext48co-comment-delete', function (event) {
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('deleteComment');
    });

    $(document).on('click', 'a.ext48co-button-toggle', function (event) {
      event.preventDefault();
    });

    $(document).on('click', 'a.ext48co-copy', function (event) {
      event.preventDefault();
      var $comment = $(this).parents('div.ext48co-comment');
      $comment.trigger('copyComment');
    });
  };

  /**
   * Initializes comments list and attaches post data to element.
   */
  var initComments = function () {
    var $post = $(this);
    var authorID = $post.find(self.SELECTORS.author).eq(0).attr('oid');
    var postID = $post.prop('id').match(/^update-(.+)$/)[1];

    if (!authorID.match(self._idRegex)) {
      $post.data('ext48co.disabled', true);
      return;
    }

    $post.data('ext48co.id', postID);
    $post.data('ext48co.timestamp', 0);
    $post.data('ext48co.locked', false);

    var html =
      '<div class="ext48co ext48co-comments">' +
      '<div class="ext48co-status">' +
      '<img class="ext48co-loading" src="' + self.ICONS.loading + '">' +
      '<span class="ext48co-status-text"></span>' +
      '<span class="ext48co-status-buttons">' +
      '<a href="#" class="ext48co-button-settings" title="' + self._('48 Comments Only Settings') + '"><img src="' + self.ICONS.settings + '"></a>' +
      '<a href="#" class="ext48co-button-toggle" title="' + self._('Collapse or expand comments') + '"><img src="' + (self._settings.autoExpand ? self.ICONS.collapse : self.ICONS.expand) + '"></a>' +
      '</span>' +
      '</div>' +
      '<div class="ext48co-commentlist"' + (self._settings.autoExpand ? '' : ' style="display: none"') + '></div>' +
      '<div class="ext48co-sharerlist"></div>' +
      '</div>';

    if (self._settings.commentsPosition == 'content') {
      $post.find(self.SELECTORS.content).append(html);
      $post.find('div.ext48co-comments').fadeIn(200);
    } else if (self._settings.commentsPosition == 'list') {
      $post.find(self.SELECTORS.comments).parent().before(html);
      $post.find('div.ext48co-comments').fadeIn(200);
    } else if (self._settings.commentsPosition == 'popup') {
      $post.find(self.SELECTORS.content).after(html);
      $post.find('div.ext48co-comments').addClass('ext48co-popup').fadeIn(200);
    }

    if (self._settings.hideStreamComments && location.href.indexOf('/posts/') == -1) {
      $post.find(self.SELECTORS.comments).fadeOut(200);
    }
  };

  /**
   * Loads comments.
   */
  var loadComments = function (event) {
    var $post = $(this);
    var now = new Date();

    if (!$post.data('ext48co.id')) $post.trigger('initComments');

    if ($post.data('ext48co.disabled')) return;
    if (now.getTime() - $post.data('ext48co.timestamp') < self._settings.commentLoadInterval) return;
    if ($post.data('ext48co.locked')) return;

    $post.data('ext48co.timestamp', now.getTime());
    $post.data('ext48co.locked', true);

    var $status = $post.find('div.ext48co-status');
    var $commentList = $post.find('div.ext48co-commentlist');
    var $sharerList = $post.find('div.ext48co-sharerlist');

    $status.trigger('setStatusText', [self._('Loading...')]);

    // Send AJAX request to fetch all comments and parse them.
    self.API.lookupPost($post.data('ext48co.id'), function (response) {
      if (response.success) {
        var comments = response.data.comments;
        $commentList.trigger('addComments', [comments]);
      } else {
        var errorStatus = self._('HTTP % - %', [response.data.error, response.data.text]);
        $status.trigger('setStatusText', [self._('Error occurred.'), errorStatus]);
      }

      now = new Date();
      $post.data('ext48co.timestamp', now.getTime());
      $post.data('ext48co.locked', false);
    });

    if ($post.find(self.SELECTORS.sharers).length !== 0 && self._settings.loadSharers) {
      // Send AJAX request to fetch all sharers and parse them.
      self.API.lookupSharers($post.data('ext48co.id'), function (response) {
        if (response.success) {
          var sharers = response.data;
          $sharerList.trigger('addSharers', [sharers]);
        } else {
          var errorStatus = self._('HTTP % - %', [response.data.error, response.data.text]);
          $status.trigger('setStatusText', [self._('Error occurred.'), errorStatus]);
        }
      });
    }
  };

  /**
   * Adds comments to list.
   */
  var addComments = function (event, comments) {
    var $commentList = $(this);
    var $post = $commentList.parents(self.SELECTORS.post);
    var $status = $commentList.prev();
    var memberComments = [];
    var myComments = [];
    var names = [];
    var latest = null;

    comments.forEach(function (element, index) {
      var postBy;

      if (element.author.id == self._login_user.id && self._settings.highlightMyComments) {
        postBy = 'myself';
      } else if (element.author.id.match(self._idRegex)) {
        postBy = 'member';
      } else {
        return;
      }

      var commentTime = element.edited || element.time;
      var commentHTML =
        '<div class="ext48co-comment ext48co-comment-' + postBy + '" data-id="' + element.id + '" data-authorid="' + element.author.id + '">' +
        '<a href="./' + element.author.id + '" oid="' + element.author.id + '"><img class="ext48co-comment-photo" src="' + element.author.photo + '?sz=48"></a>' +
        '<div class="ext48co-comment-content' + (self._settings.commentStyle == 'ballon' ? ' ext48co-comment-ballon' : '') + '">' +
        '<div class="ext48co-comment-number">' +
        '<!--<a href="#" class="ext48co-copy">' + self._('Copy') + '</a>--> ' + (self._settings.displayCommentNumber ? (index + 1) : '') +
        '</div>' +
        '<div class="ext48co-comment-author">' +
        '<a href="./' + element.author.id + '" oid="' + element.author.id + '">' + element.author.name + '</a>' +
        ' ' + ((self._settings.gplusIDs.indexOf(element.author.id) !== -1) ? '<small>(' + self._('Custom') + ')</small>' : '') +
        '</div>' +
        '<div class="ext48co-comment-body">' + element.content + '</div>' +
        '<div class="ext48co-comment-time">' +
        '<span title="' + commentTime.toLongString() + '">' + (self._settings.displayCommentHumanTime ? commentTime.toHumanTimeDiff(self._('humantime')) + ' - ' : '') + commentTime.toShortString() + (element.edited ? self._(' (edited)') : '') +
        '</span>' + (postBy == 'myself' ? ' <a href="#" class="ext48co-comment-edit">' + self._('Edit') + '</a>' : '') + (self._login_user.id ? '<span class="ext48co-comment-plusone">' +
        '<button id="po-' + element.id + '"' +
        ' class="' + (element.plusone.isPlused ? 'ext48co-comment-plused' : '') + '"' +
        ' g:entity="comment:' + element.id + '"' +
        ' g:token="true">+1' +
        '</button>' + (element.plusone.count ? ' +<strong>' + element.plusone.count + '</strong>' : '') +
        '</span>' : '') +
        '</div>' +
        '</div>' +
        '</div>';

      if (postBy == 'member') {
        memberComments.push(commentHTML);
        latest = commentTime;
        if (names.indexOf(element.author.name) == -1) names.push(element.author.name);
        $post.find('div[id="' + element.id + '"]').addClass('ext48co-comment-member');
      } else {
        myComments.push(commentHTML);
        $post.find('div[id="' + element.id + '"]').addClass('ext48co-comment-myself');
      }
    });

    $commentList.empty().html(memberComments.join(' ') + myComments.join(' '));

    var commentCount = memberComments.length;
    var name = names.reverse().join(self._(', '));
    if (commentCount) {
      var statusText = self._('% comments', commentCount) + ' - ' + latest.toHumanTimeDiff(self._('humantime')) + ' - ' + name;
      $status.trigger('setStatusText', [statusText, name]);
    } else {
      $status.trigger('setStatusText', [self._('No comment from members')]);
    }
  };

  /**
   * Add sharers to list.
   */
  var addSharers = function (event, sharers) {
    var $sharerList = $(this);
    var output = [];

    sharers.forEach(function (element, index) {
      if (!element.id.match(self._idRegex)) return;
      output.push(
        '<img src="' + element.photo + '?sz=24" style="vertical-align: middle"> ' +
        '<a href="./' + element.id + '" oid="' + element.id + '">' + element.name + '</a>');
    });

    if (output.length) {
      $sharerList.html('<div class="ext48co-comment ext48co-comment-member"> ' + self._('% shared this post.', output.join(self._(', '))) + '</div>');
    } else {
      $sharerList.empty();
    }
  };

  /**
   * +1 a comment.
   */
  var plusOneComment = function (event) {
    var $comment = $(this);
    var $post = $comment.parents(self.SELECTORS.post);
    var $button = $comment.find('span.ext48co-comment-plusone button');
    var $counter = $comment.find('span.ext48co-comment-plusone strong');
    var count = parseInt($counter.text(), 10);
    var now = new Date();

    $post.data('ext48co.timestamp', now.getTime());

    if ($counter.length === 0) {
      $button.after('&nbsp; +<strong>1</strong>');
    }

    if ($button.hasClass('ext48co-comment-plused')) {
      $button.prop('disabled', true);
      $button.removeClass('ext48co-comment-plused');
      self.API.plusOneComment($comment.data('id'), false, function (response) {
        count -= 1;
        $counter.text(count);
        $button.prop('disabled', false);
      });
    } else {
      $button.prop('disabled', true);
      $button.addClass('ext48co-comment-plused');
      self.API.plusOneComment($comment.data('id'), true, function (response) {
        count += 1;
        $counter.text(count);
        $button.prop('disabled', false);
      });
    }
  };

  /**
   * Opens comment editor.
   */
  var openEditor = function (event) {
    var $comment = $(this);
    var $post = $comment.parents(self.SELECTORS.post);
    var $commentBody = $comment.find('div.ext48co-comment-body');

    if ($comment.find('div.ext48co-comment-editor').length !== 0) return;

    $post.data('ext48co.locked', true);

    var comment = $commentBody.html()
      .replace(/<br>/g, "\n")
      .replace(/(<b>|<\/b>)/g, '*')
      .replace(/(<i>|<\/i>)/g, '_')
      .replace(/(<s>|<\/s>)/g, '-')
      .replace(/(<a\s([^>]+)>|<\/a>)/g, '')
      .replace(/(<span\s([^>]+)>|<\/span>)/g, '');

    $commentBody.hide()
      .after(
      '<div class="ext48co-comment-editor">' +
      '<textarea>' + comment + '</textarea><br>' +
      '<button class="ext48co ext48co-submit ext48co-comment-save">' + self._('Save') + '</button>' +
      '<button class="ext48co ext48co-comment-delete">' + self._('Delete') + '</button>' +
      '<button class="ext48co ext48co-comment-cancel">' + self._('Cancel') + '</button>' +
      '</div>');

    $comment.find('div.ext48co-comment-editor textarea').focus();
  };

  /**
   * Closes comment editor.
   */
  var closeEditor = function (event) {
    var $comment = $(this);
    var $post = $comment.parents(self.SELECTORS.post);
    var $commentBody = $comment.find('div.ext48co-comment-body');

    $post.data('ext48co.locked', false);
    $commentBody.show();
    $comment.find('div.ext48co-comment-editor').remove();
  };

  /**
   * Saves edited comment.
   */
  var saveComment = function (event) {
    var $comment = $(this);
    var $editor = $comment.find('div.ext48co-comment-editor');
    var $textarea = $editor.find('textarea');
    var $commentBody = $comment.find('div.ext48co-comment-body');

    $editor.find('textarea, button').prop('disabled', true);

    self.API.editComment($comment.data('id'), $textarea.val(), function (response) {
      if (response.success) {
        $commentBody.html(response.data.content);
      }
      $comment.trigger('closeEditor');
    });
  };

  /**
   * Deletes the comment.
   */
  var deleteComment = function (event) {
    var $comment = $(this);
    var answer = confirm(self._('Do you want to permanently delete this comment?'));

    if (answer) {
      self.API.deleteComment($comment.data('id'), function (response) {
        if (response.success) {
          $comment.fadeOut(200, function () {
            $comment.trigger('closeEditor').remove();
          });
        }
      });
    }
  };

  /**
   * Collapses or expands comment list.
   */
  var toggleComments = function (event) {
    var $this = $(this);
    var $commentList = $this.find('div.ext48co-commentlist');
    var $buttonImage = $this.find('a.ext48co-button-toggle img');

    if ($commentList.is(':visible')) {
      $commentList.fadeOut(200);
      $buttonImage.prop('src', self.ICONS.expand);
    } else {
      $commentList.fadeIn(200);
      $buttonImage.prop('src', self.ICONS.collapse);
    }
  };

  var copyComment = function (event) {
    var $comment = $(this);
    var comment = $comment.find('.ext48co-comment-body').html()
      .replace(/<br>/g, "\n")
      .replace(/(<b>|<\/b>)/g, '')
      .replace(/(<i>|<\/i>)/g, '')
      .replace(/(<s>|<\/s>)/g, '')
      .replace(/(<a\s([^>]+)>|<\/a>)/g, '')
      .replace(/(<span\s([^>]+)>|<\/span>)/g, '');

    var data = $comment.find('.ext48co-comment-author').text() + "：\n" + comment + "\n" +
      "（" + $comment.find('.ext48co-comment-time span').eq(0).text() + "）\n";

    GM_setClipboard(data);
  };

  /**
   * Sets comments status bar text.
   */
  var setStatusText = function (event, text, title) {
    var $this = $(this);
    var $status = $this.find('span.ext48co-status-text');
    var $loading = $this.find('img.ext48co-loading');

    if (text == self._('Loading...')) {
      $loading.show();
    } else {
      $loading.hide();
    }

    $status.html(text)
      .prop('title', title);
  };

  addStyle();
  bindEvents();
};

CommentsOnly.prototype._renderSettingsUI = function () {
  var inFrame = (top != self);
  var self = this;

  /**
   * Adds CSS.
   */
  var addStyle = function () {
    self._addStyle('settings', (inFrame ? '' : ' a.ext48co-button-settings { display: none; }') +
      '#ext48co-settings-button { display: inline-block; vertical-align: top; }' +
      '#ext48co-settings-dialog { display: none; position: absolute; z-index: 988; top: 0; left: 0; width: 50%; min-width: 720px; padding: 50px 10px 10px 10px; border: 1px solid #CCC; box-shadow: 0 0 20px #CCC; background: #FFF; }' +
      '#ext48co-settings-dialog h1 { margin: 0; color: #CC295F; font-size: 18px; font-weight: normal; }' +
      '#ext48co-settings-dialog p { margin: 5px 0; }' +
      '#ext48co-settings-dialog label { display: inline-block; min-width: 200px; }' +
      '#ext48co-settings-close { position: absolute; top: 60px; right: 20px; }' +
      '#ext48co-settings-main { overflow: auto; min-height: 300px; margin: 10px 0 60px 0; }' +
      '#ext48co-settings-menu { position: absolute; width: 160px; max-width: 160px; border-right: 1px solid #E5E5E5; }' +
      '#ext48co-settings-menu a { display: block; padding: 10px; border-left: 3px solid transparent; color: #333; }' +
      '#ext48co-settings-menu a.ext48co-selected { border-color: #CC295F; color: #CC295F; }' +
      '#ext48co-settings-menu a:hover { background: #FAFAFA; text-decoration: none; }' +
      '.ext48co-settings-content { position: relative; margin-left: 180px; }' +
      '#ext48co-settings-info { position: absolute; bottom: 10px; left: 10px; color: #999; font-size: 11px; }' +
      '#ext48co-settings-buttons { position: absolute; bottom: 10px; right: 10px; }' +
      '#ext48co-settings-groups { padding: 5px; border-top: 1px solid #E5E5E5; background: #FAFAFA; }' +
      '#ext48co-settings-groups a { padding: 5px 10px; color: #333; font-weight: bold; text-decoration: none; }' +
      '#ext48co-settings-groups a:hover { color: #CC295F; }' +
      '#ext48co-settings-groups a.ext48co-selected { background: #CC295F; color: #FFF; }' +
      '#ext48co-settings-teams { padding: 8px 5px 5px 5px; background: #CC295F; }' +
      '#ext48co-settings-teams a { margin: 0 2px; padding: 5px 10px; color: #FFF; text-decoration: none; }' +
      '#ext48co-settings-teams a.ext48co-selected { background: #FFF; color: #CC295F; }' +
      '#ext48co-settings-users { overflow: auto; margin: 0; padding: 0; height: 300px; max-height: 300px; list-style: none; }' +
      '#ext48co-settings-users li { overflow: hidden; padding: 5px 0; border-bottom: 1px dotted #CCC; text-overflow: ellipsis; white-space: nowrap; }' +
      '#ext48co-settings-users li a { margin: 0 5px; font-weight: bold; }' +
      '#ext48co-settings-users li span { color: #999; font-size: 11px; }' +
      '#ext48co-settings-users li img { vertical-align: middle; }' +
      '#ext48co-settings-users li img.ext48co-settings-photo { width: 24px; height: 24px; }' +
      'img.ext48co-settings-photo { width: 24px; height: 24px; background: #E9ECEE; vertical-align: middle; }' +
      'a.ext48co-settings-userbutton { opacity: 0.5; }' +
      'a.ext48co-settings-userbutton:hover { opacity: 1; }' +
      '.ext48co-desc { color: #999; }');
  };

  /**
   * Inserts buttons.
   */
  var initButton = function () {
    $(self.SELECTORS.banner)
      .append(
      '<div id="ext48co-settings-button">' +
      '  <button class="ext48co ext48co-extButton ext48co-button-settings" title="' + self._('48 Comments Only Settings') + '">' + self.NAME + '</button>' +
      '</div>');
  };

  /**
   * Binds event handler functions.
   */
  var bindEvents = function () {
    $(document).on('toggleDialog', '#ext48co-settings-dialog', toggleDialog);
    $(document).on('readSettings', '#ext48co-settings-dialog', readSettings);
    $(document).on('saveSettings', '#ext48co-settings-dialog', saveSettings);
    $(document).on('resetSettings', '#ext48co-settings-dialog', resetSettings);
    $(document).on('checkUpdate', '#ext48co-update', checkUpdate);

    $(document).on('addUser', '#ext48co-settings-users li', addUser);
    $(document).on('editUser', '#ext48co-settings-users li', editUser);
    $(document).on('blockMember', '#ext48co-settings-users li', blockMember);
    $(document).on('deleteCustomUser', '#ext48co-settings-users li', deleteCustomUser);

    $(document).on('click', '#ext48co-settings-groups a', switchGroup);
    $(document).on('click', '#ext48co-settings-teams a', swtichTeam);

    $(document).on('keyup', '#ext48co-settings-add', addCustomUser);

    $(document).on('click', '.ext48co-button-settings', function (event) {
      event.preventDefault();
      event.stopPropagation();

      var $dialog = $('#ext48co-settings-dialog');
      if ($dialog.length === 0) {
        buildDialog();
      } else {
        $dialog.trigger('toggleDialog');
      }
    });

    $(document).on('click', '.ext48co-settings-save', function (event) {
      var $dialog = $('#ext48co-settings-dialog');
      $dialog.trigger('saveSettings');
    });

    $(document).on('click', '.ext48co-settings-cancel', function (event) {
      event.preventDefault();
      var $dialog = $('#ext48co-settings-dialog');
      $dialog.trigger('toggleDialog');
    });

    $(document).on('click', '.ext48co-settings-reset', function (event) {
      var $dialog = $('#ext48co-settings-dialog');
      $dialog.trigger('resetSettings');
    });

    $(document).on('click', '#ext48co-settings-menu a', function (event) {
      event.preventDefault();
      var $this = $(this);
      var tab = $this.data('tab');
      $('#ext48co-settings-menu a').removeClass('ext48co-selected');
      $this.addClass('ext48co-selected');
      $('div.ext48co-settings-content[data-tab]').hide();
      $('div.ext48co-settings-content[data-tab="' + tab + '"]').show();
    });

    $(document).on('click', '#ext48co-settings-users li a.ext48co-settings-userblock', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $user = $this.parent('li');
      $user.trigger('blockMember');
    });

    $(document).on('click', '#ext48co-settings-users li a.ext48co-settings-userdelete', function (event) {
      event.preventDefault();
      var $this = $(this);
      var $user = $this.parent('li');
      $user.trigger('deleteCustomUser');
    });
  };

  /**
   * Builds the settings dialog.
   */
  var buildDialog = function () {
    var $dialog = $('<div id="ext48co-settings-dialog" class="ext48co"></div>');

    $dialog.html(
      '<h1>48 Comments Only</h1>' +
      '<div id="ext48co-settings-close"><a href="#" class="ext48co-settings-cancel"><img src="' + self.ICONS.close + '"></a></div>' +
      '<div id="ext48co-settings-main">' +
      '<div id="ext48co-settings-menu">' +
      '<a href="#" data-tab="userlist">' + self._('Members & Custom Users') + '</a>' +
      '<a href="#" data-tab="extraction">' + self._('Extraction') + '</a>' +
      '<a href="#" data-tab="display">' + self._('Display') + '</a>' +
      '</div>' +

      '<div class="ext48co-settings-content" data-tab="extraction">' +
      '<p><label>' + self._('Extraction:') + '</label> <select data-key="commentLoadTrigger"><option value="mouseenter">' + self._('Cursor moving') + '</option><option value="DOMNodeInserted">' + self._('Auto load') + '</option></select></p>' +
      '<p><label>' + self._('Interval:') + '</label> <input type="text" size="5" data-key="commentLoadInterval"> ms</p>' +
      '<p><label>' + self._('Delay:') + '</label> <input type="text" size="5" data-key="triggerDelay"> ms</p>' +
      '<p><input type="checkbox" data-key="highlightMyComments"> <label>' + self._('Load my comments when I logged in.') + '</label></p>' +
      '<p><input type="checkbox" data-key="loadSharers"> <label>' + self._('Load post share information.') + '</label></p>' +
      '</div>' +

      '<div class="ext48co-settings-content" data-tab="display">' +
      '<p><label>' + self._('Comment Style:') + '</label> <select data-key="commentStyle"><option value="ballon">' + self._('Speech balloon style') + '</option><option value="normal">' + self._('Normal style') + '</option></select></p>' +
      '<p><label>' + self._('Comment Position:') + '</label> <select data-key="commentsPosition"><option value="content">' + self._('Bottom of post content') + '</option><option value="list">' + self._('Top of all comments') + '</option><option value="popup">' + self._('Popup') + '</option></select></p>' +
      '<p><label>' + self._('Colors:') + '</label> <select data-key="colors">' +
      '<option value="#FFF2F6,#FFE6EE,#FF3377" style="background: #FFE6EE; color: #FF3377;">' + self._('Pink') + '</option>' +
      '<option value="#FFF2F4,#FF485E,#FFFFFF" style="background: #FF485E; color: #FFFFFF;">' + self._('Red') + '</option>' +
      '<option value="#F2FFF7,#38D171,#FFFFFF" style="background: #38D171; color: #FFFFFF;">' + self._('Green') + '</option>' +
      '<option value="#F2F7FF,#6CA2FF,#FFFFFF" style="background: #6CA2FF; color: #FFFFFF;">' + self._('Blue') + '</option>' +
      '<option value="#FFFDF2,#FFEB4A,#666666" style="background: #FFEB4A; color: #666666;">' + self._('Yellow') + '</option>' +
      '<option value="#F2F2F2,#9D9D9D,#333333" style="background: #9D9D9D; color: #333333;">' + self._('Gray') + '</option>' +
      '</select></p>' +
      '<p><input type="checkbox" data-key="autoExpand"> <label>' + self._('Expand all comments by default.') + '</label></p>' +
      '<p><input type="checkbox" data-key="hideStreamComments"> <label>' + self._('Hide other comments in stream page.') + '</label></p>' +
      '<p><input type="checkbox" data-key="displayCommentNumber"> <label>' + self._('Display comment number.') + '</label></p>' +
      '<p><input type="checkbox" data-key="displayCommentHumanTime"> <label>' + self._('Display comment time difference.') + '</label></p>' +
      '</div>' +

      '<div class="ext48co-settings-content" data-tab="userlist">' +
      '<p>' + self._('Comments posted by users in list will be displayed.') + '</p>' +
      '<p class="ext48co-desc">' +
      '<a href="https://docs.google.com/spreadsheet/pub?&key=' + self.SPREADSHEET_KEY + '">' + self._('Latest update of member data:') + ' ' + '<span id="ext48co-settings-dataupdated"></span>' +
      '</a>' +
      '</p>' +
      '<div id="ext48co-settings-groups"></div>' +
      '<div id="ext48co-settings-teams"></div>' +
      '<ul id="ext48co-settings-users"></ul>' +
      '</div>' +
      '</div>' +

      '<div id="ext48co-settings-info">' +
      '<strong>48 Comments Only</strong>' +
      '<br>' +
      'Written by <a href="./108682025538161540700" oid="108682025538161540700">akiratw</a>, 2012. ' +
      'Iconset <a href="http://www.entypo.com/">Entypo</a>.' +
      '</div>' +

      '<div id="ext48co-settings-buttons">' +
      '<button class="ext48co ext48co-settings-reset">' + self._('Reset') + '</button>' +
      '<button class="ext48co ext48co-settings-cancel">' + self._('Cancel') + '</button>' +
      '<button class="ext48co ext48co-main ext48co-settings-save">' + self._('Save') + '</button>' +
      '</div>');

    $('body').append($dialog);
    $('#ext48co-update').trigger('checkUpdate');
    $('#ext48co-settings-menu a').eq(0).click();
    $dialog.trigger('readSettings')
      .trigger('toggleDialog');
  };

  /**
   * Reads all settings and user data to dialog.
   */
  var readSettings = function (event) {
    var $dialog = $(this);
    var $fields = $dialog.find('[data-key]');

    $fields.each(function () {
      var $field = $(this);
      var value = self._settings[$field.data('key')];

      if ($field.prop('tagName') == 'INPUT') {
        if ($field.prop('type') == 'text') $field.val(value);
        if ($field.prop('type') == 'checkbox') $field.prop('checked', value);
      } else if ($field.prop('tagName') == 'SELECT') {
        if (Array.isArray(value)) value = value.join(',');
        $field.find('option[value="' + value + '"]').prop('selected', 'selected');
      }
    });

    var $groups = $('#ext48co-settings-groups');
    var $teams = $('#ext48co-settings-teams');
    var $users = $('#ext48co-settings-users');
    var $updated = $('#ext48co-settings-dataupdated');
    var ids = [];

    $updated.text(
    self._members.updated.toHumanTimeDiff(self._('humantime')) + ' ' +
      '(' + self._members.updated.toShortString() + ')');
    $groups.empty()
      .append(
      '<a href="#" data-group="all">' + self._('All') + '</a>' +
      '<a href="#" data-group="custom">' + self._('Custom') + '</a>');
    $teams.empty();
    $users.empty()
      .append(
      '<li data-group="custom">' +
      '<img src="' + self.ICONS.addUser + '"> ' +
      '<input type="text" id="ext48co-settings-add" class="ext48co" size="50" placeholder="' + self._('Add a user to list by ID or Profile URL.') + '">' +
      '</li>');

    for (var group in self._members.groups) {
      $groups.append('<a href="#" data-group="' + escape(group) + '">' + self._(group) + '</a>');

      var teams = self._members.groups[group];
      teams.forEach(function (element, index) {
        $teams.append('<a href="#" data-group="' + escape(group) + '" data-team="' + escape(element) + '">' + self._(element) + '</a>');
      });
    }

    for (var id in self._members.members) {
      ids.push(id);

      var member = self._members.members[id];
      var $member = $('<li>').appendTo($users);
      $member.trigger('addUser', [id, member.name, '', '', member.group, member.team, false]);

      if (self._settings.blockIDs.indexOf(id) != -1) $member.trigger('blockMember');
    }

    self._settings.gplusIDs.forEach(function (element, index) {
      if (ids.indexOf(element) != -1) return;
      ids.push(element);

      var $user = $('<li>').insertAfter($users.find('li').eq(0));
      $user.trigger('addUser', [element, element, '', '', 'custom', 'custom', true]);
    });

    $groups.find('a').eq(0).click();

    self.API.lookupUsers(ids, function (response) {
      if (!response.success) return;
      var data = response.data;
      for (var id in data) {
        var $user = $users.find('li[data-id="' + id + '"]');
        $user.trigger('editUser', [id, data[id].name, data[id].photo, data[id].description]);
      }
    });
  };

  /**
   * Saves all settings.
   */
  var saveSettings = function (event) {
    var $dialog = $(this);
    var $fields = $dialog.find('[data-key]');

    $fields.each(function () {
      var $field = $(this);
      var key = $field.data('key');

      if ($field.prop('tagName') == 'INPUT') {
        if ($field.prop('type') == 'text') self._settings[key] = $field.val();
        if ($field.prop('type') == 'checkbox') self._settings[key] = $field.prop('checked');
      } else if ($field.prop('tagName') == 'SELECT') {
        var value = $field.find('option:selected').prop('value');
        values = value.split(',');
        if (values.length == 1) {
          self._settings[key] = values[0];
        } else {
          self._settings[key] = values;
        }
      }
    });

    self._settings.gplusIDs = [];
    self._settings.blockIDs = [];

    var $users = $dialog.find('#ext48co-settings-users li');
    $users.each(function () {
      var $user = $(this);
      if ($user.attr('data-group') == 'custom' && $user.attr('data-id')) {
        self._settings.gplusIDs.push($user.attr('data-id'));
      } else if ($user.attr('data-block')) {
        self._settings.blockIDs.push($user.attr('data-id'));
      }
    });

    self._writeSettings();
    location.reload(true);
  };

  /**
   * Resets all settings.
   */
  var resetSettings = function (event) {
    var answer = confirm(self._('Do you want to reset all options?'));
    if (!answer) return;

    localStorage.removeItem(self.SETTINGS_KEY);
    location.reload(true);
  };

  /**
   * Adds a user to list.
   */
  var addUser = function (event, id, name, photo, description, group, team, deletable) {
    var $user = $(this);
    var $list = $('#ext48co-settings-users');

    if ($list.find('li[data-id="' + id + '"]').length !== 0) return;

    $user.attr('data-id', id)
      .attr('data-group', escape(group))
      .attr('data-team', escape(team))
      .html(
    (deletable ?
      '<a href="#" class="ext48co-settings-userbutton ext48co-settings-userdelete" title="' + self._('Delete this user from list.') + '"><img src="' + self.ICONS.close + '"></a>' :
      '<a href="#" class="ext48co-settings-userbutton ext48co-settings-userblock" title="' + self._('Block this user from comment displayed.') + '"><img src="' + self.ICONS.block + '"></a>') +
      '<img class="ext48co-settings-photo" src="' + photo + '">' +
      '<a class="ext48co-settings-name" href="./' + id + '" oid="' + id + '">' + name + '</a>' +
      '<span>' + self._('Loading...') + '</span>');
  };

  /**
   * Edits user information in list.
   */
  var editUser = function (event, id, name, photo, description) {
    var $user = $(this);

    $user.find('img.ext48co-settings-photo').prop('src', photo + '?sz=24');
    $user.find('a.ext48co-settings-name').eq(0).text(name);
    $user.find('span').eq(0).text(description || self._(unescape($user.attr('data-team'))));
  };

  /**
   * Blocks a member from comment extraction.
   */
  var blockMember = function (event) {
    var $user = $(this);
    if ($user.attr('data-block')) {
      $user.removeAttr('data-block')
        .css({
        textDecoration: ''
      })
        .find('a.ext48co-settings-userblock img').prop('src', self.ICONS.block);
    } else {
      $user.attr('data-block', true)
        .css({
        textDecoration: 'line-through'
      })
        .find('a.ext48co-settings-userblock img').prop('src', self.ICONS.blocked);
    }
  };

  /**
   * Switches a group to display.
   */
  var switchGroup = function (event) {
    event.preventDefault();

    var $tab = $(this);
    var $groups = $('#ext48co-settings-groups');
    var $teams = $('#ext48co-settings-teams');
    var $list = $('#ext48co-settings-users');
    var group = $tab.attr('data-group');

    $teams.find('a').hide();
    $list.find('li').hide();

    if (group == 'all') {
      $list.find('li').show();
    } else {
      $list.find('li[data-group="' + group + '"]').show();
      $teams.find('a[data-group="' + group + '"]').show();
    }

    $groups.find('a').removeClass('ext48co-selected');
    $teams.find('a').removeClass('ext48co-selected');
    $tab.addClass('ext48co-selected');

    $list.animate({
      scrollTop: 0
    }, 200);
  };

  /**
   * Switches a team to display.
   */
  var swtichTeam = function (event) {
    event.preventDefault();

    var $tab = $(this);
    var $groups = $('#ext48co-settings-groups');
    var $teams = $('#ext48co-settings-teams');
    var $list = $('#ext48co-settings-users');
    var group = $tab.attr('data-group');
    var team = $tab.attr('data-team');

    $teams.find('a').hide();
    $list.find('li').hide();

    $teams.find('a[data-group="' + group + '"]').show();
    $list.find('li[data-group="' + group + '"][data-team="' + team + '"]').show();

    $teams.find('a').removeClass('ext48co-selected');
    $tab.addClass('ext48co-selected');

    $list.animate({
      scrollTop: 0
    }, 200);
  };

  /**
   * Adds a custom user by ID or Profile URL.
   */
  var addCustomUser = function (event) {
    var input = $(this).val();
    var $list = $('#ext48co-settings-users');

    if (!input.match(/(\d{21})/)) return;

    var id = input.match(/(\d{21})/)[1];
    if ($list.find('li[data-id="' + id + '"]').length !== 0) return;

    var $user = $('<li>').insertAfter($list.find('li').eq(0));
    $user.css('background', '#FFC')
      .trigger('addUser', [id, id, '', '', 'custom', 'Custom', true]);

    $(this).val('');

    self.API.lookupUsers(id, function (response) {
      if (response.success) {
        var data = response.data[id];
        $user.trigger('editUser', [id, data.name, data.photo, data.description]);
      } else {
        $user.fadeOut(200, function () {
          $(this).remove();
        });
      }
    });
  };

  /**
   * Deletes a custom user.
   */
  var deleteCustomUser = function (event) {
    var $user = $(this);
    $user.fadeOut(200, function () {
      $(this).remove();
    });
  };

  /**
   * Displays or hides the settings dialog.
   */
  var toggleDialog = function (event) {
    var $dialog = $(this);
    $dialog.css('left', ($(window).width() - $dialog.outerWidth()) / 2)
      .slideToggle(200);
  };

  /**
   * Checks userscript update and display version information.
   */
  var checkUpdate = function (event) {
    var $this = $(this);
    self._checkUpdate(function (response) {
      if (response.success) {
        if (response.data.isUpdateAvailable) {
          $this.html(' - ' + '<a href="' + response.data.scriptURL + '">' + self._('A newer version (%) is found. Click here to install.', response.data.version) + '</a>');
        } else {
          $this.html(' - ' + self._('You are using the latest version.'));
        }
      }
    });
  };

  addStyle();
  bindEvents();
  initButton();
};

CommentsOnly.prototype._initData = function (callback) {
  var self = this;
  var _callback = callback;

  /**
   * Fetches current login user data.
   */
  var getLoginUserData = function () {
    self.API.lookupCurrentUser(function (response) {
      if (response.error) return;

      self._login_user.id = response.data.id;
      self._login_user.name = response.data.name;
      self._login_user.photo = response.data.photo;
    });
  };

  /**
   * Builds Regex for comments extraction and purify user settings.
   */
  var buildRegex = function (ids) {
    self._settings.gplusIDs.forEach(function(element, index) {
      if (ids.indexOf(element) == -1) {
        ids.push(element);
      }
    });

    self._idRegex = new RegExp('(' + ids.join('|') + ')');
  };

  /**
   * Retrieves member data.
   */
  var retrievesMemberData = function (data) {
    data.people.forEach(function (element, index) {
      var id = element.id;
      var name = element.name;
      var group = element.group;
      var team = element.team;

      self._members.members[id] = {
        id: id,
        name: name,
        group: group,
        team: team
      };

      if (!Array.isArray(self._members.groups[group])) {
        self._members.groups[group] = [];
      }
      if (self._members.groups[group].indexOf(team) == -1) {
        self._members.groups[group].push(team);
      }
    });

    self._members.updated = new Date(data.updated);
    self._settings.memberData = data;
    self._writeSettings();

    buildRegex(data.ids);
  };

  var getJSON = function () {
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzg_KpbULRmyY-_TOjU0UPrGyypP8bl4PWg_ZcdXEEvtHmAtck/exec',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        retrievesMemberData(data);
        getLoginUserData();
        _callback();
      }
    });
  };

  if (self._settings.memberData.updated) {
    var updated = new Date(self._settings.memberData.updated),
        now = new Date();

    if (now.getTime() - updated.getTime() < 86400000 * 5) {
      retrievesMemberData(self._settings.memberData);
      getLoginUserData();
      _callback();
    } else {
      getJSON();
    }
  } else {
    getJSON();
  }

};

CommentsOnly.prototype._localize = function () {
  var langs = {
    'en': {
      'name': 'English',
      'humantime': ['Just now', '1 minute ago', '% minutes ago', '1 hour ago', '% hours ago', '1 day ago', '% days ago'],
      '48 Comments Only Settings': '48 Comments Only Settings',
      'Collapse or expand comments': 'Collapse or expand comments',
      'Loading...': 'Loading...',
      'HTTP % - %': 'HTTP % - %',
      'Error occurred.': 'Error occurred.',
      ' (edited)': ' (edited)',
      'Edit': 'Edit',
      'Copy': 'Copy',
      ', ': ', ',
      '% comments': '% comments',
      'No comment from members': 'No comment from members',
      '% shared this post.': '% shared this post.',
      'Save': 'Save',
      'Delete': 'Delete',
      'Cancel': 'Cancel',
      'Do you want to permanently delete this comment?': 'Do you want to permanently delete this comment?',
      'Members & Custom Users': 'Members & Custom Users',
      'Extraction': 'Extraction',
      'Display': 'Display',
      'Extraction:': 'Extraction:',
      'Cursor moving': 'Cursor moving',
      'Auto load': 'Auto load',
      'Interval:': 'Interval:',
      'Delay:': 'Delay:',
      'Load my comments when I logged in.': 'Load my comments when I logged in.',
      'Load post share information.': 'Load post share information.',
      'Comment Style:': 'Comment Style:',
      'Speech balloon style': 'Speech balloon style',
      'Normal style': 'Normal style',
      'Comment Position:': 'Comment Position:',
      'Bottom of post content': 'Bottom of post content',
      'Top of all comments': 'Top of all comments',
      'Popup': 'Popup',
      'Colors:': 'Colors:',
      'Pink': 'Pink',
      'Red': 'Red',
      'Green': 'Green',
      'Blue': 'Blue',
      'Yellow': 'Yellow',
      'Gray': 'Gray',
      'Expand all comments by default.': 'Expand all comments by default.',
      'Hide other comments in stream page.': 'Hide other comments in stream page.',
      'Display comment number.': 'Display comment number.',
      'Display comment time difference.': 'Display comment time difference.',
      'Comments posted by users in list will be displayed.': 'Comments posted by users in list will be displayed.',
      'Latest update of member data:': 'Latest update of member data:',
      'Reset': 'Reset',
      'All': 'All',
      'Custom': 'My List',
      'Official': 'Official',
      'Page': 'Page',
      'Staff': 'Staff',
      'Trainee': 'Trainee',
      'Other': 'Other',
      'OG': 'Former members',
      'Add a user to list by ID or Profile URL.': 'Add a user to list by ID or Profile URL.',
      'Do you want to reset all options?': 'Do you want to reset all options?',
      'Delete this user from list.': 'Delete this user from list.',
      'Block this user from comment displayed.': 'Block this user from comment displayed.',
      'A newer version (%) is found. Click here to install.': 'A newer version (%) is found. Click here to install.',
      'You are using the latest version.': 'You are using the latest version.'
    },
    'ja': {
      'name': '日本語',
      '48 Comments Only Settings': '48 Comments Only 設定',
      'humantime': ['たった今', '1 分前', '% 分前', '1 時間前', '% 時間前', '1 日前', '% 日前'],
      'Collapse or expand comments': 'コメントを折りたたむ／展開する',
      'Loading...': '読み込んでいます…',
      'HTTP % - %': 'HTTP % - %',
      'Error occurred.': 'エラーが発生しました。',
      ' (edited)': ' (編集)',
      'Edit': '編集',
      'Copy': 'コピー',
      ', ': '、',
      '% comments': '% 件のコメント',
      'No comment from members': 'メンバーのコメントが見つかりません。',
      '% shared this post.': '% がこの投稿を共有しました。',
      'Save': '変更保存',
      'Delete': '削除',
      'Cancel': 'キャンセル',
      'Do you want to permanently delete this comment?': 'このコメントを完全に削除してもよろしいですか？',
      'Members & Custom Users': 'メンバーとマイリスト',
      'Extraction': 'コメント抽出設定',
      'Display': '表示設定',
      'Extraction:': '抽出：',
      'Cursor moving': 'カーソルを合わせた時',
      'Auto load': '自動ロード',
      'Interval:': '抽出間隔：',
      'Delay:': '抽出遅延：',
      'Load my comments when I logged in.': 'ログインした場合は自分のコメントを表示する',
      'Load post share information.': '共有情報を表示する',
      'Comment Style:': 'コメント仕様：',
      'Speech balloon style': 'ふきだし',
      'Normal style': 'ノーマル',
      'Comment Position:': 'コメントリストの位置：',
      'Bottom of post content': '投稿内容の下',
      'Top of all comments': 'すべてのコメントの上',
      'Popup': '飛び出し',
      'Colors:': '色選択：',
      'Pink': 'ピンク',
      'Red': '赤',
      'Green': '緑',
      'Blue': '青',
      'Yellow': '黄',
      'Gray': 'グレー',
      'Expand all comments by default.': 'デフォルトでコメントを展開する',
      'Hide other comments in stream page.': 'ストリームでメンバー以外のコメントを非表示にする',
      'Display comment number.': 'コメントの番号を表示する',
      'Display comment time difference.': 'コメントの時間差を表示する',
      'Comments posted by users in list will be displayed.': 'リストにいるメンバーとユーザーの投稿したコメントが表示されます。',
      'Latest update of member data:': 'メンバーデータの最新更新時間：',
      'Reset': 'リセット',
      'All': 'すべて',
      'Custom': 'マイリスト',
      'Official': '運営／関係者',
      'Page': 'ページ',
      'Staff': 'スタッフ',
      'Trainee': '研究生',
      'Other': 'その他',
      'OG': '元メンバー',
      'Add a user to list by ID or Profile URL.': 'ID またはプロフィールの URL でユーザーを追加する…',
      'Do you want to reset all options?': 'すべての設定をリセットしますか？',
      'Delete this user from list.': 'リストからこのユーザーを削除する。',
      'Block this user from comment displayed.': 'このユーザーのコメントを非表示にする。',
      'A newer version (%) is found. Click here to install.': '新しいバージョン（%）があります。',
      'You are using the latest version.': '最新バージョン'
    },
    'zh-TW': {
      'name': '正體中文',
      '48 Comments Only Settings': '48 Comments Only 設定',
      'humantime': ['剛剛', '1 分鐘前', '% 分鐘前', '1小時前', '% 小時前', '1 天前', '% 天前'],
      'Collapse or expand comments': '收合／展開所有留言',
      'Loading...': '正在讀取中…',
      'HTTP % - %': 'HTTP % - %',
      'Error occurred.': '發生錯誤。',
      ' (edited)': ' (編輯)',
      'Edit': '編輯',
      'Copy': '複製',
      ', ': '、',
      '% comments': '% 則留言',
      'No comment from members': '找不到來自成員的留言。',
      '% shared this post.': '% 分享了這則訊息。',
      'Save': '儲存變更',
      'Delete': '刪除',
      'Cancel': '取消',
      'Do you want to permanently delete this comment?': '你確定要永久刪除這則留言嗎？',
      'Members & Custom Users': '成員與自訂使用者',
      'Extraction': '留言載入設定',
      'Display': '顯示設定',
      'Extraction:': '載入：',
      'Cursor moving': '游標移過時',
      'Auto load': '自動載入',
      'Interval:': '載入間隔：',
      'Delay:': '載入延遲：',
      'Load my comments when I logged in.': '登入時顯示我發表的留言',
      'Load post share information.': '顯示成員間的分享資訊',
      'Comment Style:': '留言顯示樣式：',
      'Speech balloon style': '對話框',
      'Normal style': '一般',
      'Comment Position:': '留言列表位置：',
      'Bottom of post content': '訊息內文的下方',
      'Top of all comments': '所有留言的最上方',
      'Popup': '彈出式',
      'Colors:': '顏色設定：',
      'Pink': '粉紅',
      'Red': '紅',
      'Green': '綠',
      'Blue': '藍',
      'Yellow': '黃',
      'Gray': '灰',
      'Expand all comments by default.': '預設展開所有留言',
      'Hide other comments in stream page.': '在訊息串中隱藏其他非成員的留言',
      'Display comment number.': '顯示留言編號',
      'Display comment time difference.': '顯示留言時間差',
      'Comments posted by users in list will be displayed.': '在以下清單內的成員和使用者所發表的留言會顯示出來。',
      'Latest update of member data:': '成員資料最後更新於：',
      'Reset': '重設',
      'All': '全部',
      'Custom': '自訂',
      'Official': '官方與關係者',
      'Page': '專頁',
      'Staff': '工作人員',
      'Trainee': '研究生',
      'Other': '其他',
      'OG': '已畢業成員',
      'Add a user to list by ID or Profile URL.': '以 ID 或個人檔案網址來新增使用者…',
      'Do you want to reset all options?': '你確定要重設所有設定嗎？',
      'Delete this user from list.': '刪除這個使用者。',
      'Block this user from comment displayed.': '不要顯示此成員的留言。',
      'A newer version (%) is found. Click here to install.': '有新的版本（%）。',
      'You are using the latest version.': '最新版本'
    },
    'zh-CN': {
      'name': '简体中文',
      '48 Comments Only Settings': '48 Comments Only 设定',
      'humantime': ['刚刚', '1 分钟前', '% 分钟前', '1小时前', '% 小时前', '1 天前', '% 天前'],
      'Collapse or expand comments': '收合／展开所有评论',
      'Loading...': '正在读取中…',
      'HTTP % - %': 'HTTP % - %',
      'Error occurred.': '发生错误。',
      '　(edited)': '　(编辑)',
      'Edit': '编辑',
      'Copy': '复制',
      ', ': '、',
      '% comments': '% 条评论',
      'No comment from members': '找不到来自成员的评论。',
      '% shared this post.': '% 分享了这则信息。',
      'Save': '保存更改',
      'Delete': '删除',
      'Cancel': '取消',
      'Do you want to permanently delete this comment?': '要永久性删除此评论吗？',
      'Members & Custom Users': '成员与自订用户',
      'Extraction': '评论加载设定',
      'Display': '显示设定',
      'Extraction:': '加载：',
      'Cursor moving': '鼠标移过时',
      'Auto load': '自动加载',
      'Interval:': '加载间隔：',
      'Delay:': '加载延迟：',
      'Load my comments when I logged in.': '登入时显示我发表的评论',
      'Load post share information.': '显示成员间的分享信息',
      'Comment Style:': '评论显示样式：',
      'Speech balloon style': '对话框',
      'Normal style': '一般',
      'Comment Position:': '评论列表位置：',
      'Bottom of post content': '信息内文的下方',
      'Top of all comments': '所有评论的最上方',
      'Colors:': '颜色设定：',
      'Pink': '粉红',
      'Red': '红',
      'Green': '绿',
      'Blue': '蓝',
      'Yellow': '黄',
      'Gray': '灰',
      'Expand all comments by default.': '默认展开所有评论',
      'Hide other comments in stream page.': '在讯息串中隐藏其他非成员的评论',
      'Display comment number.': '显示评论编号',
      'Display comment time difference.': '显示评论时间差',
      'Comments posted by users in list will be displayed.': '在以下清单内的成员和用户所发表的评论会显示出来。',
      'Latest update of member data:': '成员数据最后更新于：',
      'Reset': '重置',
      'All': '全部',
      'Custom': '自订',
      'Official': '官方与关系者',
      'Page': '专页',
      'Staff': '工作人员',
      'Trainee': '研究生',
      'Other': '其他',
      'OG': '已毕业成员',
      'Add a user to list by ID or Profile URL.': '以 ID 或个人档案网址来新增用户…',
      'Do you want to reset all options?': '你确定要重置所有设定吗？',
      'Delete this user from list.': '删除这个用户。',
      'Block this user from comment displayed.': '不要显示此成员的评论。',
      'A newer version (%) is found. Click here to install.': '有新的版本（%）。',
      'You are using the latest version.': '最新版本'
    }
  };

  var langCode = $('html').prop('lang');
  this._lang = langs[langCode] || langs[navigator.language] || langs.ja;
};

CommentsOnly.prototype._ = function (string, replace) {
  var output = this._lang[string] || string;

  if (replace) {
    if (!Array.isArray(replace)) replace = [replace];

    replace.forEach(function (element, index) {
      output = output.replace('%', element);
    });
  }

  return output;
};

CommentsOnly.prototype._readSettings = function () {
  var settings = localStorage.getItem(this.SETTINGS_KEY);
  if (settings) {
    this._settings = $.extend(this._settings, JSON.parse(settings));
  }
};

CommentsOnly.prototype._writeSettings = function () {
  var settings = JSON.stringify(this._settings);
  localStorage.setItem(this.SETTINGS_KEY, settings);
};

CommentsOnly.prototype._addStyle = function (id, css) {
  GM_addStyle(css);
};


var GooglePlusAPI = function () {
  // ---------- CONSTANTS ----------
  // API URLs.
  this.ACTIVITY_URL = 'https://plus.google.com/_/stream/getactivity/';
  this.SHARERS_URL = 'https://plus.google.com/_/stream/getsharers/';
  this.LOOKUP_URL = 'https://plus.google.com/_/socialgraph/lookup/hovercards/';
  this.INITIAL_DATA_URL = 'https://plus.google.com/_/initialdata?key=14';
  this.COMMENT_EDIT_URL = 'https://plus.google.com/_/stream/editcomment/';
  this.COMMENT_DELETE_URL = 'https://plus.google.com/_/stream/deletecomment/';
  this.COMMENT_PLUSONE_URL = 'https://plus.google.com/_/plusone';

  // ---------- Private Fields ----------
  this._session = null;
};

/**
 * Parses Google+ JSON string.
 *
 * @param {string} input A JSON string returned by Google+.
 * @return {Object} A parsed JSON object.
 */
GooglePlusAPI.prototype._parseJSON = function (input) {
  // var jsonString = input.replace(/\[,/g, '[null,');
  // jsonString = jsonString.replace(/,\]/g, ',null]');
  // jsonString = jsonString.replace(/,,/g, ',null,');
  // jsonString = jsonString.replace(/,,/g, ',null,');
  // jsonString = jsonString.replace(/\{(\d+):/, '{"$1":');
  //
  // return JSON.parse(jsonString);

  try {
    return eval('(' + input +')');
  } catch (error) {
    return {};
  }
};

/**
 * Fires callback safely.
 *
 * @param {boolean} isSuccess Whether the request is successful.
 * @param {Object} data Data to send in the callback.
 * @param {function (Object)} callback A callback to fire back.
 */
GooglePlusAPI.prototype._fireCallback = function (isSuccess, data, callback) {
  if (!callback) return;
  callback({
    success: isSuccess,
    data: data
  });
};

/**
 * Sends an HTTP request to Google + server.
 *
 * @param {string} url An URL to request.
 * @param {?string} postData A string of data to be sent to server.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype._sendRequest = function (url, postData, callback) {
  var self = this;

  var doSuccess = function (data, textStatus, jqXHR) {
    if (!data && jqXHR.status === 200) {
      var responseText = jqXHR.responseText.substring(4);
      var results = self._parseJSON(responseText);

      callback(Array.isArray(results) ? results[0] : results);
    } else if (data && jqXHR.status === 200) {
      callback(data);
    }
  };

  var doError = function (jqXHR, textStatus, errorThrown) {
    if (textStatus === 'parsererror') {
      if (jqXHR.status === 200) {
        doSuccess(null, textStatus, jqXHR);
      }
      return;
    }
    callback({
      error: errorThrown || jqXHR.status || 'error',
      text: textStatus
    });
  };

  return $.ajax({
    url: url,
    type: postData ? 'POST' : 'GET',
    data: postData || null,
    dataType: 'json',
    success: doSuccess,
    error: doError
  });
};

/**
 * Verifies an HTTP request is successful. If not, fire callback.
 *
 * @param {Object} response An response object returned by _sendRequest().
 * @param {function (Object)} callback A callback.
 * @return {boolean} Whether the request is successful.
 */
GooglePlusAPI.prototype._isRequestSuccess = function (response, callback) {
  if (response.error) {
    this._fireCallback(false, response, callback);
    return false;
  } else {
    return true;
  }
};

/**
 * Fetches Google+ current login user session.
 *
 * @param {boolean} reset Force re-fetch.
 * @return {string} Google+ login user session.
 */
GooglePlusAPI.prototype._getSession = function (reset) {
  if (this._session && !reset) return this._session;

    var html = $('body').html();
    var searchFor = ',"https://csi.gstatic.com/csi","';
    var startIndex = html.indexOf(searchFor);

    if (startIndex !== -1) {
      var remaining = html.substring(startIndex + searchFor.length);
      this._session = remaining.substring(0, remaining.indexOf('"'));
    }

    return this._session;
};

/**
 * Parses a Google+ post array to object.
 *
 * @param {Array} postArray A Google+ post array.
 * @return {Object} A parsed post data object.
 */
GooglePlusAPI.prototype._parsePost = function (postArray) {
  var self = this;
  var post = {
    id: postArray[8],
    comments: [],
    sharedFrom: postArray[39]
  };

  postArray[7].forEach(function (element, index) {
    post.comments.push(self._parseComment(element));
  });

  return post;
};

/**
 * Parses a Google+ comment array to object.
 *
 * @param {Array} commentArray A Google+ comment array.
 * @return {Object} A parsed comment data object.
 */
GooglePlusAPI.prototype._parseComment = function (commentArray) {
  var comment = {
    id: commentArray[4],
    author: {
      id: commentArray[6],
      name: commentArray[1],
      photo: commentArray[16]
    },
    content: commentArray[2],
    time: new Date(commentArray[3]),
    edited: commentArray[14] ? new Date(commentArray[14]) : null,
    plusone: {
      count: (typeof commentArray[15][12][0] != 'undefined') ? commentArray[15][12][0][0] : 0,
      isPlused: (commentArray[15][13] == '1')
    }
  };

  return comment;
};

/**
 * Parses a Google+ user array to object.
 *
 * @param {Array} userArray A Google+ user array.
 * @return {Object} A parsed user data object.
 */
GooglePlusAPI.prototype._parseUser = function (userArray) {
  var user = {
    id: userArray[0][2],
    name: userArray[2][0],
    photo: userArray[2][8],
    description: userArray[2][21]
  };

  return user;
};

/**
 * Parses a Google+ sharer array to object.
 *
 * @param {Array} sharerArray A Google+ sharer array.
 * @return {Object} A parsed sharer data object.
 */
GooglePlusAPI.prototype._parseSharer = function (sharerArray) {
  var sharer = {
    id: sharerArray[1],
    name: sharerArray[0],
    photo: sharerArray[4]
  };

  return sharer;
};

/**
 * Queries a specified post.
 *
 * @param {string} id A Google+ post ID.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.lookupPost = function (id, callback) {
  var self = this;
  var params = '?updateId=' + id;

  this._sendRequest(this.ACTIVITY_URL + params, null, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;

    var post = self._parsePost(response[1]);
    self._fireCallback(true, post, callback);
  });
};

/**
 * Queries sharers of a specified post.
 *
 * @param {string} id A Google+ post ID.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.lookupSharers = function (id, callback) {
  var self = this;
  var params = '?id=' + id;

  this._sendRequest(this.SHARERS_URL + params, null, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;

    var sharers = [];
    response[1].forEach(function (element, index) {
      sharers.push(self._parseSharer(element));
    });

    self._fireCallback(true, sharers, callback);
  });
};

/**
 * Queries specified users.
 *
 * @param {(string|Array.<string>)} ids Google+ user IDs.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.lookupUsers = function (ids, callback) {
  var self = this;
  var allSlices = [];

  if (!Array.isArray(ids)) ids = [ids];
  ids.forEach(function (element, index) {
    allSlices.push('[null,null,"' + element + '"]');
  });

  var maxSlices = 12;
  var slicedIndex = 0;
  var doRequest = function () {
    var currentSlices = allSlices.slice(slicedIndex, slicedIndex + maxSlices);
    if (currentSlices.length === 0) return;
    slicedIndex += currentSlices.length;

    var params = '?n=6&m=[[' + currentSlices.join(',') + ']]';
    var data = 'at=' + self._getSession();

    self._sendRequest(self.LOOKUP_URL + params, data, function (response) {
      if (!self._isRequestSuccess(response, callback)) {
        doRequest();
        return;
      }

      var users = {};

      response[1].forEach(function (element, index) {
        var user = self._parseUser(element[1]);
        users[user.id] = user;
      });

      self._fireCallback(true, users, callback);
      doRequest();
    });
  };

  doRequest();
};

/**
 * Queries Google+ current login user data.
 *
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.lookupCurrentUser = function (callback) {
  var self = this;

  if (!this._getSession()) {
    self._fireCallback(false, 'Not Login', callback);
    return;
  }

  this._sendRequest(this.INITIAL_DATA_URL, null, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;

    var info = self._parseJSON(response[1]);
    var data = {};

    for (var i in info) {
      data.id = info[i][0];
      data.name = info[i][20].replace(/(.+) <(.+)>/, '$1');
      data.photo = info[i][1][3];
      break;
    }

    self._fireCallback(true, data, callback);
  });
};

/**
 * Edits a specified comment posted by current login user.
 *
 * @param {string} id Google+ comment ID.
 * @param {string} text Edited comment content.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.editComment = function (id, text, callback) {
  var self = this;
  var postID = id.split('#')[0];
  var data =
    'at=' + this._getSession() +
    '&itemId=' + postID +
    '&commentId=' + id +
    '&text=' + encodeURIComponent(text);

  this._sendRequest(this.COMMENT_EDIT_URL, data, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;

    var comment = self._parseComment(response[1]);

    self._fireCallback(true, comment, callback);
  });
};

/**
 * Deletes a specified comment posted by current login user.
 *
 * @param {string} id Google+ comment ID.
 * @param {function (Object)} callback A callback.
 */
GooglePlusAPI.prototype.deleteComment = function (id, callback) {
  var self = this;
  var data =
    'at=' + this._getSession() +
    '&commentId=' + id;

  this._sendRequest(this.COMMENT_DELETE_URL, data, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;
    self._fireCallback(true, null, callback);
  });
};

/**
 * +1 a specified comment.
 */
GooglePlusAPI.prototype.plusOneComment = function (id, set, callback) {
  var self = this;
  var data =
    'at=' + this._getSession() +
    '&itemId=' + encodeURIComponent('comment:' + id) +
    '&set=' + (set ? 'true' : 'false');

  this._sendRequest(this.COMMENT_PLUSONE_URL, data, function (response) {
    if (!self._isRequestSuccess(response, callback)) return;
    self._fireCallback(true, null, callback);
  });
};


Date.prototype.toShortString = function () {
  var month = this.getMonth() + 1;
  var date = this.getDate();
  var hours = this.getHours();
  var minutes = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();

  return month + '/' + date + ' ' + hours + ':' + minutes;
};

Date.prototype.toLongString = function () {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var date = this.getDate();
  var hours = (this.getHours() < 10) ? '0' + this.getHours() : this.getHours();
  var minutes = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();
  var seconds = (this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds();

  return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds;
};

Date.prototype.toHumanTimeDiff = function (format) {
  var now = new Date();
  var diff = (now.getTime() - this.getTime()) / 1000;
  var string = '';

  if (diff < 60) {
    return format[0];
  }
  if (diff < 3600) {
    diff = Math.round(diff / 60);
    string = (diff == 1) ? format[1] : format[2];
    return string.replace('%', diff);
  }
  if (diff < 86400) {
    diff = Math.round(diff / 3600);
    string = (diff == 1) ? format[3] : format[4];
    return string.replace('%', diff);
  }

  diff = Math.round(diff / 86400);
  string = (diff == 1) ? format[5] : format[6];
  return string.replace('%', diff);
};

new CommentsOnly();

if (typeof chrome === 'object') {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'pageAction') {
      $('.ext48co-button-settings').eq(0).click();
    }
  });
}
