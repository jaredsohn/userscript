/****************************
Friends List Sorter v0.11
Dec 26, 2008
Released under a Creative Commons License
http://creativecommons.org/licenses/by-nc-sa/3.0/
*****************************/
// ==UserScript==// @name            Friends List Sorter// @namespace    ' '// @include         http://live.xbox.com/*/profile/Friends*
// @description    sort and re-sort XBL Friends List as you did on the console dashboard before NXE.// ==/UserScript==
var flistSorter = {

  initSort : true,  		//decide whether to sort when loaded
  linkify : false,  		//set direct links to profile subpages (optional)
  list : 100,		//number of friends showed per page (need fixed when they divide a list into some pages, and you want it AutoPagerized)

  playing : /Playing.+<br>|Jeu en cours.+<br>|.+\u3092\u30d7\u30ec\u30a4\u4e2d/i,  	//'Playing' status (to find game titles) in each language: eng|fra|jpa 
  away : /Away|Absent|\u9000\u5e2d\u4e2d/i,  		//'Away' status (, that is not to be sorted) in each language

  isSort : false,
  page : 1,

  sort : function(target, div) {
    sortfunc = function(a,b) {
      if (!flistSorter.isSort) {
        playing = flistSorter.playing;
        a = a.firstChild.lastChild.firstChild.innerHTML.toLowerCase().match(playing);
        b = b.firstChild.lastChild.firstChild.innerHTML.toLowerCase().match(playing);
      } else {
        a = a.firstChild.childNodes[1].firstChild.firstChild.innerHTML.toLowerCase();
        b = b.firstChild.childNodes[1].firstChild.firstChild.innerHTML.toLowerCase();
      }
      if (a < b) return  -1;
      if (a > b) return  1;
      return 0;
    }
    target.sort(sortfunc);
    var list = div.getElementsByTagName('table');
    var def = div.getElementsByTagName('tbody');
    for(var i = 0, l=target.length, n=flistSorter.list; i < l; i++) {
      var pos = parseInt(i / n);
      if (i % n == 0) {
        if (l >= n*(pos+1)) var postpos = null;
        else var postpos = def[l];
        list[pos].insertBefore(target[i], postpos);
      }
      else list[pos].insertBefore(target[i], target[i-1].nextSibling);
    }
  },

  init : function() {
    var alldivs = document.getElementsByTagName('div');
    for (var i=0, div; div = alldivs[i]; i++) {
      if (div.className == 'XbcProfileSubHead') var subhead = div;
      //if (div.className == 'XbcRelative') var relative = div;
      if (div.className == 'XbcProfileTableContainer') var container = div;
    }
    var online = subhead.getElementsByTagName('span')[0].innerHTML.match(/\d+/);
    var maxnmb = flistSorter.list*flistSorter.page;
    if (online > maxnmb) online = maxnmb;
    var stats = container.getElementsByTagName('tbody');
    var away = flistSorter.away;
    for (var i=0; i < online; i++) if (!away.test(stats[i].firstChild.childNodes[4].firstChild.innerHTML)) var playing = i+1;
    stats = Array.slice(stats, 0, playing);

    flistSorter.isSort = !flistSorter.initSort;
    flistSorter.sort(stats, container);
    flistSorter.isSort = !flistSorter.isSort;

    if (flistSorter.linkify) flistSorter.setLink(container, flistSorter.page);

    if (document.getElementById('sortButton')) return;

    orderToShow = function() {
      var order;
      if (!flistSorter.isSort) order = 'game';
      else order = 'name';
      return order;
    }
    var text = document.createElement('span');
    text.setAttribute('id', 'sortButton');
    text.innerHTML = 'sort by ';
    var button = document.createElement('a');
    button.style.cursor = 'pointer';
    button.innerHTML = orderToShow();
    button.addEventListener('click', function() {
      flistSorter.sort(stats, container);
      flistSorter.isSort = !flistSorter.isSort;
      flistSorter.initSort = !flistSorter.initSort;
flistSorter.init();
      button.innerHTML = orderToShow(); }, false);
    text.appendChild(button);
    subhead.appendChild(text);
  },

  getPage : function() {
    alldivs = document.getElementsByTagName('div');
    for (var i=0, div; div = alldivs[i]; i++){
      if (div.className == 'XbcProfileTableContainer') var container = div;
    }
    index = container.getElementsByTagName('hr');
    flistSorter.page = index[index.length-1].nextSibling.lastChild.innerHTML;
  },

  setLink : function(container, p) {
    var allrows = container.getElementsByTagName('table')[p-1].getElementsByTagName('tr');
    for (var i=1, row; row = allrows[i]; i++) {
      row.removeAttribute('onclick');
      data = row.getElementsByTagName('td');
      var link = data[1].firstChild.firstChild;
      data[0].innerHTML = '<a href ="' + link.href + '" target="_blank" title="profile top">' + data[0].innerHTML + '</a>'; 
      var gamertag = link.innerHTML;
      var locale = link.href.match(/.+\/profile\//i);
      link.href = 'http://live.xbox.com/ja-JP/profile/MessageCenter/SendMessage.aspx?gt=' + gamertag;
      link.target = '_blank';
      link.title = 'send message';
      data[2].innerHTML = '<a href ="' + locale + 'Achievements/ViewAchievementSummary.aspx?compareTo=' + gamertag + '" target="_blank" title="view games">' + data[2].innerHTML + '</a>';
      data[3].innerHTML = '<a href ="' + locale + 'FriendsOfFriend.aspx?pp=0&GamerTag=' + gamertag + '" target="_blank" title="view friends">' + data[3].innerHTML + '</a>'; 
    }
  },
}

if (document.body) flistSorter.init();
if (window.AutoPagerize) window.AutoPagerize.addFilter(function(){flistSorter.getPage(); flistSorter.init(); });//.user.js