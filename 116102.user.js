// ==UserScript==  
// @name        NicoVideo Visited Hide
// @namespace   http://www21.atpages.jp/atokigedesu/
// @description ニコニコ動画のランキングページで既に見た動画を隠します。
// @include     http://www.nicovideo.jp/ranking*
// @include     http://www.nicovideo.jp/watch/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript== 

var idregexp = new RegExp("");
idregexp.compile("watch/([a-z0-9]+)");

var Ranking = function() {

  var items = {};

  // Itemクラス
  // id     : sm~やnm~の文字列
  var Item = function(id) {
    this.initialize(id);
  };
  Item.prototype = {
    initialize : function(id) {
      this.id = id;
      this.$box = undefined;      // 一つの動画のコンテナとなるdiv要素
      this.$thumb = undefined;    // サムネイルを表示するimg要素
      this.$button = undefined;   // 表示・隠すの切り替えを行うボタン
      this.$link = undefined;     // 動画のタイトル、<a>タグ
      this.$useless = undefined;  // 動画の再生数など，隠したときに消す情報
      
      this.$link = this.getLink();
      this.$box = this.getBox();
      this.$thumb = this.getThumb();
      this.$useless = this.getUseless();
      this.createField();
    },
    getLink : function() {
      return $('a.watch[href^="watch/' + this.id + '"]');
    },
    getBox : function() {
      return $();
    },
    getThumb : function() {
      return $();
    },
    getUseless : function() {
      return $();
    },
    createField : function() {
      $field = $('<div></div>')
        .css({
          textAlign : 'right',
          position : 'absolute',
          top : '0',
          right : '0'
        });
      this.createButton();
      this.$box.css('position', 'relative')    // $buttonのposition:absoluteを正しく動作させるため。
        .append($field.append(this.$button));
    },
    createButton : function() {
      this.$button = $('<a href="javascript:;"></a>')
        .css({
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          backgroundColor: 'white'
        });
      this.initButton();
    },
    initButton : function() {
      var _this = this;   // クリックイベント内でthisを参照するため橋渡し関数内で使う
      this.$button
        .text('[×]')
        .click(function() {
          _this.hide();
        });
    },
    show : function() {
      this.$box.css('opacity', '1');
      this.$thumb.css({
        width : '96px',
        height : '72px'
      });
      this.initButton();
      this.clearVisit();
      this.$useless.show();
    },
    hide : function() {
      var _this = this;   // クリックイベント内でthisを参照するため橋渡し関数内で使う
      this.$box.css('opacity', '0.5');
      this.$thumb.css({
        width : '65px',
        height : '50px'
      });
      this.$button
        .text('[○]')
        .click(function() {
          _this.show();
        });
      this.visit();
      this.$useless.hide();
    },
    visit : function() {
      GM_setValue('visited_' + this.id, true);
    },
    clearVisit : function() {
      GM_setValue('visited_' + this.id, false);
    },
    visited : function() {
      return GM_getValue('visited_' + this.id, false);
    }
  };

  // ランキングトップページで使用するItemOnTopクラス
  var ItemOnTop = function(id) {
    this.initialize(id);
  };
  ItemOnTop.prototype = new Item();
  ItemOnTop.prototype.getBox = function() {
    return this.$link.parent().parent().parent();
  }
  ItemOnTop.prototype.getThumb = function() {
    return this.$link.parent().parent().prev().find('img');
  }
  ItemOnTop.prototype.getUseless = function() {
    return this.$link.parent().siblings();
  }

  // ランキングマトリックスページで使用するItemOnMatrixクラス
  var ItemOnMatrix = function(id) {
    this.initialize(id);
  };
  ItemOnMatrix.prototype = new Item();
  ItemOnMatrix.prototype.getBox = function() {
    return this.$link.parent().parent();
  };
  ItemOnMatrix.prototype.getThumb = function() {
    return this.$link.parent().prev().children().children().children();
  };
  ItemOnMatrix.prototype.getUseless = function() {
    return this.$link.parent().prev().prev();
  };

  // ジャンル別ランキングページで使用するItemOnFavクラス
  var ItemOnFav = function(id) {
    this.initialize(id);
  };
  ItemOnFav.prototype = new Item();
  ItemOnFav.prototype.getBox = function() {
    return this.$link.parent().parent().parent().parent()
      .parent().parent().parent();
  };
  ItemOnFav.prototype.getThumb = function() {
    return this.$link.parent().parent().parent().prev().find('img');
  };
  ItemOnFav.prototype.getUseless = function() {
    return this.$link.parent().siblings();
  };
  
  // 初期化
  (function initialize() {
     var matrix = location.href.indexOf('matrix') != -1;
     var fav = location.href.indexOf('fav') != -1;
     $('a.watch').each(function() {
                         if ($(this).attr('href').match(idregexp)) {
                           var id = RegExp.$1;
                           (function(_id) {
                              if (matrix) {
                                items[_id] = new ItemOnMatrix(_id);
                              } else if (fav) {
                                items[_id] = new ItemOnFav(_id);
                              } else {
                                items[_id] = new ItemOnTop(_id);
                              }
                            })(id);
                         }
                      });
   })();
  
  // 全アイテムをチェックして既読なら隠します
  (function checkAll() {
    $.each(items, function(key, val) {
      if (val.visited()) {
        val.hide();
      }
    });
    setTimeout(checkAll, 1000);
  })();
  
  // 「すべて既読にする」のボタンを作成します
  (function createAllHideButton() {
    $allHideButton = $('<td colspan="11" />')
      .text('すべて既読にする')
      .addClass('bg_grade_0')
      .css('cursor', 'pointer')
      .click(function() {
        $('a:contains("[×]")').each(function() {
          this.click();
        });
      });
    $('#PAGEBODY table.top20 table tr:eq(20)').after($('<tr />')
      .append($('<td />')).append($allHideButton));
  })();
};

var Watch = function() {
  var id = location.href.match(idregexp)[1];
  GM_setValue('visited_' + id, true);
};

$(function() {
  var href = location.href;
  if (href.indexOf('ranking') != -1) {
    Ranking();
  } else if (href.indexOf('watch') != -1) {
    Watch();
  }
});
