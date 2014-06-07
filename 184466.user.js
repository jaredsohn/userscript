// ==UserScript==
// @name        Douban movie batch tagger for NPC
// @namespace   DMBT4N
// @include     http://movie.douban.com/people/*/collect*
// @include     http://movie.douban.com/people/*/wish*
// @include     http://movie.douban.com/people/*/do*
// @version     0.1
// @grant       none
// @author      aligo
// @run-at      document-end
// ==/UserScript==

  var App, MovieItem;

  MovieItem = (function() {
    function MovieItem($li) {
      var _this;
      this.$li = $li;
      _this = this;
      this.item_id = this.$li.attr('id').substr(4);
      this.$editor = $('<div class="batch_editor" style="padding-bottom: 18px;">载入数据中...</div>');
      this.$post_status = $('<div></div>');
      this.$li.append(this.$editor);
      this.$input = $('<input type="text" style="width: 100%;">');
      $.getJSON('http://movie.douban.com/j/subject/' + this.item_id + '/interest?', function(data) {
        _this.data = data;
        _this.$input.val(data.tags.join(' '));
        _this.$editor.empty().append('标签(用空格分隔): ');
        _this.$editor.append(_this.$input);
        return _this.$editor.append(_this.$post_status);
      });
    }

    MovieItem.prototype.changed = function() {
      if (!this.data) {
        return false;
      } else {
        return this.data.tags.join(' ') !== this.$input.val();
      }
    };

    MovieItem.prototype.trySubmit = function() {
      var $htmlDummy, postData, _this;
      _this = this;
      if (this.changed()) {
        $htmlDummy = $(this.data.html);
        postData = {
          ck: $htmlDummy.find('input[name=ck]').val(),
          comment: $htmlDummy.find('textarea[name=comment]').val(),
          foldcollect: $htmlDummy.find('input[name=foldcollect]').val(),
          interest: this.data.interest_status,
          rating: $htmlDummy.find('input[name=rating]').val(),
          tags: this.$input.val()
        };
        _this.$post_status.html('提交中...');
        return $.post('http://movie.douban.com/j/subject/' + this.item_id + '/interest?', postData, function() {
          return _this.$post_status.html('更新成功');
        });
      }
    };

    return MovieItem;

  })();

  App = {
    init: function() {
      var $tagger_trigger, $triggers;
      if (-1 !== $('#db-usr-profile .info ul').html().indexOf('设置')) {
        $tagger_trigger = $('<a href="#">批量标签</a>');
        $tagger_trigger.bind('click', function() {
          var $batch_ops, $submit_btn;
          if (!$('ul.list-view')[0]) {
            alert('请先点击右侧按钮切换到列表模式');
          } else {
            App.tagger_actived = !App.tagger_actived ? (!App.item_inited ? (App.items = [], $('ul.list-view > li').each(function() {
              return App.items.push(new MovieItem($(this)));
            }), $submit_btn = $('<button type="button">批量保存</button>'), $submit_btn.bind('click', function() {
              var item, _i, _len, _ref;
              _ref = App.items;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                item.trySubmit();
              }
              return false;
            }), $batch_ops = $('<div class="batch_ops"></div>'), $batch_ops.append($submit_btn), $('.article').append($batch_ops), App.item_inited = true) : $('ul.list-view > li > .batch_editor, .batch_ops').show(), true) : ($('ul.list-view > li > .batch_editor, .batch_ops').hide(), false);
          }
          return false;
        });
        $triggers = $('<div class="triggers"></div>');
        $triggers.append($tagger_trigger);
        return $('.article .opt-bar').prepend($triggers);
      }
    }
  };

  $(function() {
    return App.init();
  });