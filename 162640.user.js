// ==UserScript==
// @name       Craw the self shot in weibo.
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Craw the self shot pics and save into IndexDB.
// @match     http://s.weibo.com/weibo/%25E8%2587%25AA%25E6%258B%258D&b=1&scope=ori
// @copyright  2013+, You
// ==/UserScript==

(function() {
    Object.prototype.clone = function() {
      var newObj = (this instanceof Array) ? [] : {};
      for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
          newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
      } return newObj;
    };

    var mblogModel = {
        'author'    : undefined,
        'author_url': undefined,
        'content'   : undefined,
        'image_url' : undefined
    };

    var mblogsObj = [];

    var mblogs = document.querySelectorAll('dl.feed_list');

    for (var i=0; i<mblogs.length; i++) {
        var mblog = mblogs[i];
        var thumb = mblog.querySelector('ul.piclist > li > img.bigcursor');
        if (!thumb.length) {
            continue;
        }
    
        var mblogObj = mblogModel.clone();
        var author = mblog.querySelector('a[nick-name]');
        mblogObj['author'] = author.title;
        mblogObj['author_url'] = author.href;
        mblogObj['content'] = mblog.querySelector('em');
        mblogObj['image_url'] = thumb
        mblogsObj.append(mblogObj);
    }

    console.log(mblogsObj);
})()
