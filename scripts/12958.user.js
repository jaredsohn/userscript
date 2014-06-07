// ==UserScript==
// @name           Pixiv Ajax Favorite
// @namespace      http://userscripts.org/users/35494
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @author         anekos <anekos@snca.net> http://d.hatena.ne.jp/nokturnalmortum/
// @version        2010.03.01
// @description    Add ajax favorite menus above illustration
// ==/UserScript==


// XPath
// img = '//div[@id="pixiv"]/div/div/a'
// fav = '//div[@id="pixiv"]/div/div/a/img/parent::*/parent::*/preceding-sibling::div[1]'
// a   = '//div[@id="pixiv"]/div/div/a/img/parent::*/self::*'

function installAjaxFavorite () {

  var xpathFavLink = '//div[@id="pixiv"]/div/div/a/img/parent::*/parent::*/preceding-sibling::div[1]';
  var xpathImgAnchor = '//div[@id="pixiv"]/div/div/a/img/parent::*/self::*';
  var xpathImg = '//div[@id="pixiv"]/div/div/a/img';
  var xpathBookmarkButton = '//div[@id="bookmark_btn"]';
  var xpathSizeTools = '//div[@id="bookmark_btn"]/parent::div/span';

  function createHTMLDocument (source) {
    let wcnt = window.content;
    let doc = wcnt.document.implementation.createDocument(
      'http://www.w3.org/1999/xhtml',
      'html',
      wcnt.document.implementation.createDocumentType(
        'html',
        '-//W3C//DTD HTML 4.01//EN',
        'http://www.w3.org/TR/html4/strict.dtd'
      )
    );
    let range = wcnt.document.createRange();
    range.selectNodeContents(wcnt.document.documentElement);
    let content = doc.adoptNode(range.createContextualFragment(source));
    doc.documentElement.appendChild(content);
    return doc;
  };

  function ajaxRequest (opts) {
    var req = false;
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if ((req.readyState == 4)) {
        opts.onComplete(req);
      }
    };
    req.open(opts.params ? 'POST' : 'GET', opts.url, true);
    if (opts.params) {
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.setRequestHeader("Content-length", opts.params.length);
      req.setRequestHeader("Connection", "close");
      req.send(opts.params);
    } else {
      req.send(null);
    }
    return req;
  }

  var xpathGet = function (xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  var enabled = true;
  var fav_link_div = xpathGet(xpathFavLink);
  var sizeTools = xpathGet(xpathSizeTools);
  var img = xpathGet(xpathImg);
  var imgAnchor = xpathGet(xpathImgAnchor);
  var illust_id = document.location.toString().match(/illust_id=(\d+)/)[1];
  var user_id = document.getElementById('illust_contents').innerHTML.match(/\.php\?id=(\d+)/)[1];
  var bookmarkButton = xpathGet(xpathBookmarkButton);
  var links = '';


  ////////////////////////////////////////////////////////////////////////////////

  // Large Image
  if (false && img && imgAnchor) {
    imgAnchor.id = 'nekoname';
    imgAnchor.href = 'javascript:void(0)';
    imgAnchor.target = null;
    imgAnchor.addEventListener('click', function () {
      img.src = img.src.replace(/_m(\.\w+)$/, '$1');
    }, true);
  }

  // Ajax Bookmark
  if (fav_link_div) {
    var addToFavorites = function (id, type, restrict) {
      if (!enabled) {
        alert('連打すんな');
        return;
      }
      enabled = false;
      stat_elem.innerHTML = '--アクセス中-- ';


      let url =
        type == 'illust' ? 'http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=' + id :
        type == 'user'   ? 'http://www.pixiv.net/bookmark_add.php?type=user&id=' + id :
        (alert('なぞなのだ'));
      ajaxRequest({
        url: url,
        onComplete: function (req) {
          let doc = createHTMLDocument(req.responseText);
          let token = doc.querySelector('input[name=tt]').value;
          var params =
            'mode=add&id=' + id +
            '&type=' + type +
            '&restrict=' + restrict +
            '&tt=' + token +
            '&ok=%E3%80%80%E3%81%AF%E3%80%80%E3%81%84%E3%80%80';

          ajaxRequest({
            url: 'http://www.pixiv.net/bookmark_add.php',
            method: 'post',
            params: params,
            onComplete: function (originalRequest) {
              var s = originalRequest.responseText;
              var r = '';
              if (s.match(/既に(お気に入り|ブックマーク)に追加済みです。/)) {
                  r += '既にお気に入りに追加済みです';
              }
              if (s.match('を(お気に入り|ブックマーク)に追加しました。')) {
                  r += 'お気に入りに追加しました';
              }
              if (!r) {
                r = '失敗？';
              }
              stat_elem.innerHTML = '--' + r + '-- ';
              enabled = true;
            },
            onError: function () {
              alert('失敗');
            }
          });
        },
      });

    }

    var addLink = function (id, type, restrict, caption, to) {
      var element = document.createElement('a');
      element.innerHTML = caption;
      element.addEventListener('click', function(){ addToFavorites(id, type, restrict);}, true);
      to.appendChild(element);
    }

    bookmarkButton.parentNode.removeChild(bookmarkButton);
    var stat_elem = document.createElement('span');
    var my_buttons = document.createElement('span');
    my_buttons.innerHTML = ' &nbsp; '

    stat_elem.style.color = 'blue';
    my_buttons.appendChild(stat_elem);

    addLink(illust_id, 'illust', 0, '[絵を公開お気に] ', my_buttons);
    addLink(illust_id, 'illust', 1, '[絵を非公開お気に]', my_buttons);
    addLink(user_id, 'user', 0, '[作者を公開お気に] ', my_buttons);
    addLink(user_id, 'user', 1, '[作者を非公開お気に]', my_buttons);

    var element = document.createElement('a');
    element.innerHTML = '[普通に]';
    element.href = 'http://www.pixiv.net/bookmark_add.php?illust_id=' + illust_id + '&type=illust';
    my_buttons.appendChild(element);

    sizeTools.parentNode.insertBefore(my_buttons, sizeTools.nextSibling);
  }
}

installAjaxFavorite();
