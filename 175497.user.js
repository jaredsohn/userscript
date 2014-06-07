// ==UserScript==
// @name          YouTube playlist button
// @namespace     http://griffeltavla.wordpress.com/gm
// @description   Adds a drop-down button with all playlists from the video publisher
// @version       1.0.1
// @author        tinjon@gmail.com
// @include       http://www.youtube.com/watch?v=*
// @include       https://www.youtube.com/watch?v=*
// @require       http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

function alignScheme(url){
  if(url.indexOf(window.location.protocol) == -1)         // Mismatch HTTP(S)
    return url.replace(/^.*?:/,window.location.protocol);
  else
    return url;
}

function init($) {

  function getPlayLists(userDetailsUrl) {
    var d = $.Deferred();

    $.get(userDetailsUrl).done(function(html){
      var doc = document.createElement('div'), playlists;
      doc.innerHTML = html;

      playlists = $('div[data-context-item-type=playlist]',doc).map(function(){
        return {
          title: this.getAttribute('data-context-item-title'),
          id: this.getAttribute('data-context-item-id')
        };
      }).filter(function(){
        return this.title != "Favorite videos";
      }).sort(function(a,b){
        return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
      });
      d.resolve(playlists);
    });
    return d;
  }

  function createButtonItemHTML(title, id){
    var url  = id ? 'http://www.youtube.com/playlist?list='+ id : "#";
    return '<a class="yt-uix-button-menu-item" href="'+ url +'" title="'+ title +'">'+ title +'</a>';
  }

  function createButtonItems(playlists) {
    var html = "";
    $('#playlists-menu').html('');

    playlists.each(function(){
      html += createButtonItemHTML(this.title, this.id)
    });
    $(html).appendTo('#playlists-menu');
  }

  function createButton() {
    $('#playlist-button, #playlists-menu').remove();

    var html = '<div id="playlists-menu" aria-haspopup="true" class="yt-uix-button-menu yt-uix-button-menu-default hid" role="menu">'+
                 createButtonItemHTML('Loading playlists ...') +
               '</div>';
    $(html).appendTo('body');

    html = '<button'+
           ' id="playlist-button"'+
           ' data-button-menu-id="playlists-menu"'+
           ' aria-pressed="false"'+
           ' aria-expanded="false"'+
           ' class="yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-tooltip-reverse"'+
           ' role="button" title="User\'s playlists"'+
           ' type="button"'+
           ' style="margin-left:0.5em">'+
           '  <span class="yt-uix-button-content" id="playlist-content">Playlists</span>'+
           '  <img alt="" class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">'+
           '</button>';
    $(html).appendTo('#watch7-subscription-container')
    .mouseover(function(evt){
      var userDetailsUrl = alignScheme( $('span[itemprop=author] link[href*="/user/"]').attr('href') );

      $(this).unbind(evt);
      getPlayLists(userDetailsUrl).then(function(lists){
        createButtonItems(lists);
      });
    });
  }

  createButton();
}

// Bootstrap
(function(){
  function addScript(url, cb){
    var el = document.createElement('script');
    el.setAttribute('type','text/javascript');
    el.setAttribute('src',url);
    el.addEventListener('load',cb);
    document.body.appendChild(el);
  }

  // If Chrome, we need to add jquery ourselves :(
  if(/webkit/i.test(window.navigator.userAgent)) {
    addScript(alignScheme('http://code.jquery.com/jquery-2.0.3.min.js'),function(){
      init(jQuery);
    });
  } else {
    init($);
  }
}());
