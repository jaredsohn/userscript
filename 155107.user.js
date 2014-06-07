/*
// ==UserScript==
// @name last updated
// @description Shows last updated post on forum view
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 0.7
// ==/UserScript==
 * todo
 *  link to recent viewed forum (only 1?)
 * changelog
 * 0.8
 *  Ability to Mark all as read
 *  Now compares last poster if post-count is somehow wrong
 *  Time is now simplified in ADV mode
 * 0.7
 *  Now hides stickies by default - togglable (stores user pref through cookie)
 * 0.6.2
 *  Disinlined
 *  Bold last poster's name, underline if us
 * 0.6.1
 *  Disabled blizzard's marking
 * 0.6
 *  Finally fixed the bug of "wrong count with deleted posts"
 *   the working solution is just to use .post-lastPost a[href] (ie blabla#354)
 *   This is still not working as intended when there's deleted posts (but that's definitely blizz's fault)
 *  Also splits correctly depending on the language used
 * 0.5
 *  Now adds annotations : [!] for new, [ASCII:check] for read and [?] for never went
 * 0.4
 *  Now works with advanced mode
 *  Fix a bug when logged off
*/
(function(){
  var that, pages, l, c, topicId, ref$, postCount, lastPosterName, posts, currentForumHref, currentForumName, characters, res$, i$, len$, name, ref1$, lastPostTh, mode, createCookie, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, langs, lang, timeTable, x$, tbodySticky, buttonSticky, allRead, buttonMar, forumOptions, hasUnread, post, children, div, a, href, td, lastPostTd, x, lastPost, lastPostLink, replies, author, y$, postOnly, text, authorName, span, inlineText, simplifiedTime, state, split$ = ''.split, replace$ = ''.replace, slice$ = [].slice, join$ = [].join;
  if (that = document.getElementById('thread')) {
    if ((pages = QSA('#forum-actions-top .ui-pagination li:not(.cap-item)')) != null) {
      l = pages.length;
    }
    if (l && 'current' !== (c = pages[pages.length - 1].className)) {
      return;
    }
    l || (l = 1);
    topicId = (split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 1], '?'))[0];
    postCount = (ref$ = that.getElementsByClassName('post-info'))[ref$.length - 1].getElementsByTagName('a')[0].getAttribute('href').slice(1);
    lastPosterName = (ref$ = that.getElementsByClassName('char-name-code'))[ref$.length - 1].innerHTML.trim();
    unsafeWindow.localStorage.setItem("topic_" + topicId, postCount);
    unsafeWindow.localStorage.setItem("topic_lp_" + topicId, lastPosterName);
    return;
  }
  if (!(posts = document.getElementById('posts'))) {
    return;
  }
  ref$ = (ref$ = document.getElementsByClassName('ui-breadcrumb')[0].children)[ref$.length - 1].children[0], currentForumHref = ref$.href, currentForumName = ref$.innerHTML;
  characters = QSA('.user-plate .overview');
  if (characters.length) {
    res$ = [];
    for (i$ = 0, len$ = (ref$ = characters[0].children).length; i$ < len$; ++i$) {
      name = ref$[i$].innerHTML;
      res$.push(replace$.call((ref1$ = split$.call(name, ' '))[ref1$.length - 1], '\n', ''));
    }
    characters = res$;
  }
  lastPostTh = node('td', {
    innerHTML: 'Dernier message'
  });
  QS('.post-th').appendChild(lastPostTh);
  mode = posts.getAttribute('class');
  if (mode !== 'advanced') {
    lastPostTh.style.display = 'none';
  }
  createCookie = partialize$(unsafeWindow.Cookie.create, [
    void 8, void 8, {
      path: '/',
      expires: 9999
    }
  ], [0, 1]);
  unsafeWindow.Cms.Forum.setView = function(type, target){
    var x$, i$, ref$, len$, el, results$ = [];
    mode = type;
    createCookie('forumView', type);
    x$ = target;
    x$.parentNode.querySelector('.active').className = '';
    x$.className = 'active';
    posts.setAttribute('class', type);
    if (type === 'simple') {
      lastPostTh.style.display = 'none';
      hideAll('.post-last-updated');
      for (i$ = 0, len$ = (ref$ = showAll('.tt-last-updated')).length; i$ < len$; ++i$) {
        el = ref$[i$];
        results$.push(el.style.display = '');
      }
      return results$;
    } else {
      lastPostTh.style.display = '';
      showAll('.post-last-updated');
      return hideAll('.tt-last-updated');
    }
  };
  TSTATE_UNK = 0;
  TSTATE_ALR = 1;
  TSTATE_CHK = 2;
  l = (split$.call(document.location, '/'))[4];
  langs = {
    fr: {
      timeIndex: 3,
      timeOutdex: 0,
      toggleSticky: 'Afficher/Cacher les post-its',
      mar: 'Tout marquer comme lu'
    },
    en: {
      timeIndex: 0,
      timeOutdex: -1,
      toggleSticky: 'Show/Hide stickies',
      mar: 'Mark all as read'
    }
  };
  lang = langs[l];
  timeTable = [['heures', 'h'], ['heure', 'h'], ['houres', 'h'], ['hour', 'h'], ['minutes', 'm'], ['minute', 'm'], ['jours', 'j'], ['jour', 'j'], ['days', 'd'], ['day', 'd']];
  x$ = tbodySticky = document.getElementsByClassName('sticky')[0];
  if ('show' !== unsafeWindow.Cookie.read('show-stickies')) {
    x$.style.display = 'none';
  }
  buttonSticky = node('a', {
    innerHTML: 'Post-its',
    title: lang.toggleSticky,
    onclick: function(){
      var s;
      (s = tbodySticky.style).display = s.display === 'none' ? '' : 'none';
      createCookie('show-stickies', s.display || 'show');
    }
  });
  document.getElementsByClassName('forum-options')[0].appendChild(buttonSticky);
  allRead = false;
  buttonMar = node('a', {
    innerHTML: 'MAR',
    title: lang.mar,
    onclick: function(){
      var postRows, i$, ref$, len$, row, topicId, siblings;
      if (allRead) {
        return;
      }
      allRead = !allRead;
      postRows = document.getElementsByClassName('regular')[0];
      for (i$ = 0, len$ = (ref$ = postRows.children).length; i$ < len$; ++i$) {
        row = ref$[i$];
        if (row.className.trim() === 'read') {
          continue;
        }
        topicId = row.id.slice('postRow'.length);
        siblings = fetchSiblings(row.children[0], {
          slice: 5
        });
        unsafeWindow.localStorage.setItem("topic_" + topicId, (split$.call(siblings.lastPost.children[0].href, '#'))[1]);
        unsafeWindow.localStorage.setItem("topic_lp_" + topicId, siblings.author.innerHTML.trim());
        row.className = 'read';
      }
      forumOptions.removeChild(buttonMar);
    }
  });
  buttonMar.style.cursor = 'pointer';
  buttonSticky.style.cursor = 'pointer';
  x$ = forumOptions = document.getElementsByClassName('forum-options')[0];
  x$.appendChild(buttonMar);
  x$.appendChild(buttonSticky);
  hasUnread = false;
  for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('post-title')).length; i$ < len$; ++i$) {
    post = ref$[i$], children = post.children, div = children[0], a = children[1], href = a.href, td = post.parentNode;
    if (children.length > 2) {
      lastPostTd = node('td', {
        className: 'post-last-updated',
        innerHTML: ' '
      });
      td.appendChild(lastPostTd);
      continue;
    }
    topicId = div.id.slice('thread_tt_'.length);
    x = fetchSiblings(post, {
      slice: 5
    }), pages = x.pages, lastPost = x.lastPost, lastPostLink = lastPost.children[0], replies = x.replies, author = x.author;
    postCount = (split$.call(lastPostLink.href, '#'))[1];
    if (!pages.querySelector('ul')) {
      pages.appendChild((x$ = node('ul', {
        className: 'ui-pagination'
      }), x$.appendChild((y$ = node('li'), y$.appendChild(node('a', {
        innerHTML: '1',
        dataPagenum: 1,
        rel: 'np',
        href: href
      })), y$)), x$));
    }
    postOnly = false;
    text = split$.call(div.querySelector('.tt_info').innerHTML, '\n');
    text = text[2].trim().length
      ? text[2]
      : (postOnly = true, div.querySelector('.tt_time').innerHTML);
    text = text.replace(RegExp('(' + (authorName = lastPostLink.innerHTML.trim()) + ')'), fn$);
    a.style.display = 'inline';
    span = node('span', {
      className: 'tt-last-updated',
      innerHTML: "<br />" + text
    });
    post.appendChild(span);
    if (mode === 'advanced') {
      span.style.display = 'none';
    }
    inlineText = text;
    if (!postOnly) {
      inlineText = inlineText.slice(text.indexOf('(') + 1, -1);
    }
    simplifiedTime = -1 === inlineText.indexOf('/') ? simplifyTime(join$.call(slice$.call(split$.call(inlineText, ' '), lang.timeIndex, lang.timeOutdex - 1 + 1 || 9e9), ' ')) : inlineText;
    lastPostTd = node('td', {
      className: 'post-last-updated',
      innerHTML: simplifiedTime
    });
    td.appendChild(lastPostTd);
    if (mode !== 'advanced') {
      lastPostTd.style.display = 'none';
    }
    state = checkTopic(topicId, postCount, authorName);
    /*used to work, but blizzard marks some posts are marked even tho THEY'RE FUCKING NOT
    if 'read' is td.className.trim! #used to work :))))))
    	TSTATE_CHK
    else
    	check-topic topic-id, post-count*/
    if (state !== TSTATE_CHK) {
      if (that = characters && authorName) {
        if (in$(that, characters)) {
          state = TSTATE_CHK;
        }
      }
      if (replies == 0 && in$(author.innerHTML.trim(), characters)) {
        state = TSTATE_CHK;
      }
    }
    if (state === TSTATE_CHK) {
      td.className = 'read';
      if (that = pages.querySelector('.last-read')) {
        pages.removeChild(that);
      }
    } else {
      hasUnread = true;
      td.className = '';
    }
    if (state !== TSTATE_UNK) {
      a.href = (ref1$ = pages.querySelectorAll('.ui-pagination a'))[ref1$.length - 1].href;
    }
    markState(post, state);
  }
  if (!hasUnread) {
    forumOptions.removeChild(buttonMar);
  }
  /**
   * simplifies time based on table replacement
   */
  function simplifyTime(it){
    var i$, ref$, len$, ref1$, convertFrom, convertTo;
    for (i$ = 0, len$ = (ref$ = timeTable).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], convertFrom = ref1$[0], convertTo = ref1$[1];
      it = it.replace(convertFrom, convertTo);
    }
    return it;
  }
  /**
   * prepends state to a topic
   *
   * `state` must be a TSTATE_* constant
   */
  function markState(node, state){
    var innerHTML, states;
    innerHTML = node.innerHTML;
    states = ['?', '!', '✓'];
    node.innerHTML = "<b>[" + states[state] + "]</b> " + innerHTML;
  }
  /**
   * checks topic to user
   *
   * returns 2 if user read last post
   * returns 1 if user read topic (at some moment)
   * returns 0 if no information were found
   */
  function checkTopic(id, count, lastPoster){
    var ref$;
    switch (ref$ = [unsafeWindow.localStorage.getItem("topic_" + id)], false) {
    case !(function(it){
      return it >= count;
    })(ref$[0]):
      if (lastPoster === getLastPoster(id)) {
        return TSTATE_CHK;
      } else {
        return TSTATE_ALR;
      }
      break;
    case !(0 === ref$[0] || null === ref$[0]):
      return TSTATE_UNK;
    default:
      return TSTATE_ALR;
    }
  }
  function getLastPoster(it){
    return unsafeWindow.localStorage.getItem("topic_lp_" + it);
  }
  /**
   * fetches nextElementSibling
   */
  function fetchSiblings(elem, arg$){
    var slice, ref$, indexBy, results$ = {};
    slice = (ref$ = arg$.slice) != null ? ref$ : 0, indexBy = (ref$ = arg$.indexBy) != null ? ref$ : 'className';
    while (elem != null && (elem = elem.nextElementSibling)) {
      results$[elem[indexBy].slice(slice)] = elem;
    }
    return results$;
  }
  function node(tag, props){
    props == null && (props = {});
    return import$(document.createElement(tag), props);
  }
  function hideAll(selector){
    var i$, ref$, elements, len$, el;
    for (i$ = 0, len$ = (ref$ = elements = QSA(selector)).length; i$ < len$; ++i$) {
      el = ref$[i$];
      el.style.display = 'none';
    }
    return elements;
  }
  function showAll(selector){
    var i$, ref$, elements, len$, el;
    for (i$ = 0, len$ = (ref$ = elements = QSA(selector)).length; i$ < len$; ++i$) {
      el = ref$[i$];
      el.style.display = 'block';
    }
    return elements;
  }
  function QSA(it){
    return document.querySelectorAll(it);
  }
  function QS(it){
    return document.querySelector(it);
  }
  function partialize$(f, args, where){
    return function(){
      var params = slice$.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ? partialize$(f, ta, tw) : f.apply(this, ta);
    };
  }
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
  function fn$(it){
    return "<b>" + (in$(it, characters) ? "<u>" + authorName + "</u>" : authorName) + "</b>";
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
