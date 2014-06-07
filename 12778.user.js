// ==UserScript==
// @name           NicoVideo Additional MyList
// @namespace      http://castor.s26.xrea.com/
// @description    Nicovideo mylist for local
// @include        http://www.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/my/mylist*
// @version        1.0.1.20110605
// @author         castor <castor.4bit@gmail.com>
// ==/UserScript==
(function() {
  // Number of items to display per page
  var NUM_DISPLAY_ITEMS = 100;

  // button image
  var IMAGE_BUTTON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAgCAMAAABKDfSpAAAAwFBMVEUIDQ0IDQ0OEREUGRkUGRkUGRkdIiIkKSkkKSkkKSktMjI1Ojo1Ojo1Ojo8QEBCR0dCR0dCR0dMUFBYXFxYXFxYXFxeYWFlaWllaWllaWlucnJ3enp3enp3enp+gYGChYWChYWChYWNkJCUlpaUlpaeoKClp6elp6elp6eusLC1urq1urq1urq+wMDIysrIysrIysrP0NDW19fW19fm5ubm5ubv8PD8/Pz8/PwQFKAoBAAAwH4koOD5IAEB1dSR0Huo5mniAAAEb0lEQVRIibVW7YrkKhAVBQUFAxE6kMAEIhtIoAVFrPd/s3vKpGd6dhfuj909MBM/j1WnyrIF/TsIosOpvw93MPchtfn70PIAt9P2/2HM7wa+Rn+etlY7Ek32c+YHVppj650+OQDeY1S/YD7bvOSblVfvax0g24u7JjOEQDmEAR0E4nHF42GGab4wwboxdHiTqtd232/OOS1g9NdksN+47dTK47zYfsCJ5UmBnuu6fjiTPuO+6eVu1dBodZnId2cmDM3a5Ht2/+LG9ICRdrZxXcfRG+OGHdyMZsx4Wx1p1/PrmPmgCu82G6zmE9EOeitArtSs5mDe3MbX7M4KT/uRT+wOdH58fCwsolL8t9OkzDBP47gTDf2UxZy0KFCf9qDmVddn+M4N/WvS4G5nD0aG7COV5/PZ+/OilYnEbQcbdKasLSyd9Mn/Cp1G2dT8fJ7HcSTm1i9uwNf2fJaBVmP7QY9HonICKx9FMWRKFuZDvAwTRymh8Y5Q7FqPMxuHjeUWjLn1Jze2tJjPmUL7gS4vyNCwPCtze960XRnWo1kR5a0xy8a+xANGHLPyE2fJQk2rN24zIwdb3Mk+C9u9HTTSmuoDLkNrW2jn5VB9bO8Vozil1XpbO4x8JYaJWnBv3F0GmktxoOcucoZWeJP6pPKNBiZH/kCGPXfEwt465bYtU9mm8nVmfucOLR105ees9WOuZSXkU6vTRT7ujrkb62HuIqEHTv0DhUmuFJU626dPx7smuDLjsf/4CL5FzeEH9f7h7fPjkqIboHRucSvthZrW1DY5Zs7pfOJaWoRmdO5bLGHJVSWMHllCM1qlruKAr5I+6Fc3v8nNGa/ldneWWgOmnXCrVzf3q+Rqe1arWwKdo034xNes9Op+0KvGI9HiMDKGUGkVGLLLfFJeJr7zc6KZx0H6zq3diUugqcBOR1EMmakbLdh/kruXIdmDuCALLTxqDzch8Mnpg1K+0+edG1cA9wvKtJtbdlFw04Nkuwcp5W132mIHcobPlSPFmbYNZ6ppZO5o5Ce3VFd27RCPueXNrZRwrerOTeds+9D5rvfIvltKyJODvNDLBO6qWakXt9/SFRnYRUVJLO/cUiW2RqorPze0pF0KHbAcOZ0nxdy61kixNOUza1Jpl592SxlhVtg6N9ySUgzQGx/FbmMeb581c4ELGBQRgQYOfFgoKU/aaQsBpbEMuXFp78MXt5+8Rv4zN/ZiP9rY7RKdmbaLWwjN1JgMKBhCmEYzL2VL1hWywPWoRCaDKrbywoubk1cxd98s8QRAM4u8jRJ5sYrOzbR+RxGF4ungGpjQW5XQc+zXPVkTkH9WYKP+5O64uYU9G9VBOHjI2YbHcxDnzb3QL9DXYMOLKbjakBFymuR37rmFzu1bWQ0U2Cbd9fHRiAg/+rnbz5ggSTrW0UBMMdXWIodEvLjFrYS7JBG35veK3lD66ojfAPtfDc69ay8HogmO0j+Bxe+q+Ftr/hhIbIF3ycq/D4s3D79jUXpvvDX/FBnvxH9swQR6Xa5ZUQAAAABJRU5ErkJggg==';
  var FILE_BUTTON  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAVCAMAAAAdDWyfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEBAQIiKhYqLiYuNiJOUkpmZmZubm+np6erq6uvr6+zs6+zs7O3t7e7u7e/v7vDw7/Dw8PHx8fLy8fLy8vPz8/T08/X19Pb29ff39vj49/39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA7tdoAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAJdJREFUOE+NktkSgyAQBD2TqDFqxMUY/f/PjFTBwqYsR/qVZoZjk18UCbC+YY21MhOUh72sZZugANriWaF2dyxY044LLbL05phxqU37zNprqcXcOzwISzSFNLakxqWjKLVZf2lEahz67jXIs1lLpJlDkVJvI8IraC5toUamr33W1aOB2urZzv80LwT56YRczDCaXrE1UtsBCZE5jxq1hSYAAAAASUVORK5CYII=';
  
  var MODE_STORAGE = 1;
  var MODE_GMVALUE = 2;

  var w = unsafeWindow || window, document = w.document;
  var compatible = false;

  // --------------------------------------------
  // Models
  // --------------------------------------------
  var ListItem = function(id, v, title) {
    this.id = id;       // id (watch/XXXXXX)
    this.v = v;         // id (smXXXXXX)
    this.t = title;     // title
    this.c = '';        // comment
    this.tags = [];     // tags
    this.reg = new Date();  // registered date
  };

  var Tag = function(id, name) {
    this.id = id;   // id
    this.t = name;  // name
  };

  var Store = function() {};
  Store.prototype = {
    save: function(key, value) {
      var d = this._toSource(value)
      var s = this._getLocalStorage();

      return (s != null)? s.setItem(key, d) : GM_setValue(key, d);
    },
    load: function(key, target) {
      var s = this._getLocalStorage();
      var target = target || ((s != null)? MODE_STORAGE : MODE_GMVALUE);
      var result;

      if (target == MODE_STORAGE) {
        return (s != null)? s.getItem(key) : null;
      } else {
        return GM_getValue(key, null);
      }
    },
    clear: function(key) {
      var s = this._getLocalStorage();
      if (s) {
        s.removeItem(key);
      }
    },
    _getLocalStorage: function() {
      if (compatible) return null;

      if (typeof localStorage == "object") {
        return localStorage;
      } else if (typeof globalStorage == "object") {
        return globalStorage[location.host];
      }
      return null;
    },
    _toSource: function(value) {
      if (!Object.prototype.toSource) {
        return JSON.stringify(value);
      }
      return value.toSource();
    }
  };

  var ItemList = function(key, items) {
    this.key = key;
    this.items = items || [];
    this.store = new Store();
  };
  ItemList.prototype = {
    get: function(idx) {
      if (idx < this.items.length) {
        return this.items[idx];
      }
      return null;
    },
    add: function(item) {
      if (this.find(item.id) === false) {
        this.items.push(item);
        return true;
      }
      return false;
    },
    remove: function(item) {
      var idx = this.find(item.id);
      if (idx !== false) {
        this.items.splice(idx, 1);
        return true;
      }
      return false;
    },
    find: function(id) {
      var len = this.items.length;
      for (var i=0; i<len; ++i) {
        if (id == this.items[i].id) {
          return i;
        }
      }
      return false;
    },
    save: function() {
      return this.store.save(this.key, this.items);
    },
    load: function() {
      var d = this.store.load(this.key, MODE_STORAGE)
        || this.store.load(this.key, MODE_GMVALUE);
      if ((d == null) || (typeof d == "undefined")) {
        d = "[]";
      }

      var _items = eval('('+ d +')');
      if (_items) {
        this.items = _items;
      }
      return _items;
    },
    clear: function() {
      this.store.clear(this.key);
    },
    length: function() {
      return this.items.length;
    }
  };

  var MyList = function() {
    this.initialize();
  };
  MyList.prototype = {
    STORE_KEY_ITEMS: "additional_mylist",
    STORE_KEY_TAGS:  "additional_mylist_tags",
    items: null,
    tags: null,
    sort: 0,
    filter: 0,

    initialize: function() {
      this.items = new ItemList(this.STORE_KEY_ITEMS);
      this.tags  = new ItemList(this.STORE_KEY_TAGS);

      this.items.load();
      this.tags.load();
    },
    addItem: function(item) {
      this.items.load();
      if (this.items.add(item)) {
        this.items.save();
        return true;
      }
      return false;
    },
    removeItem: function(item) {
      this.items.load();

      if (this.items.remove(item)) {
        this.items.save();
        this.compactionTag();
        return true;
      }
      return false;
    },
    findItem: function(id) {
      var idx = this.items.find(id);
      if (idx !== null) {
        return this.items.get(idx);
      }
      return null;
    },
    addTag: function(name) {
      this.tags.load();
      if (name.length == 0) return false;
      if (this.searchTag(name) != null) return true;

      var id = 1;
      for (var i=0; i<this.tags.length(); ++i) {
        var tag = this.tags.get(i);
        if (id <= tag.id) id = tag.id + 1;
      }

      if (this.tags.add(new Tag(id, name))) {
        this.tags.save();
        return id;
      }
      return null;
    },
    findTag: function(id) {
      var idx = this.tags.find(id);
      if (idx !== null) {
        return this.tags.get(idx);
      }
      return null;
    },
    searchTag: function(name) {
      for (var i=0; i<this.tags.length(); ++i) {
        var tag = this.tags.get(i);
        if (name == tag.t) return tag;
      }
      return null;
    },
    setFilter: function(filter) {
      this.filter = filter;
    },
    setSortOrder: function(sort) {
      this.sort = sort;
    },
    getItemList: function(offset, limit) {
      // filter
      var i, j;
      var items = [];
      var len = this.items.length();
      for (i=0; i<len; ++i) {
        var skip = false;
        var item = this.items.get(i);
        if (this.filter > 0) {
          skip = true;
          for (j=0; j<item.tags.length; ++j) {
            if (this.filter == item.tags[j]) {
              skip = false;
              break;
            }
          }
        }
        if (!skip) {
          items.push(item);
        }
      }
      // sort
      if (this.sort == 0) {
        items.reverse();
      }
      // slice
      offset = offset || 0;
      if (limit) {
        items = items.slice(offset, offset + limit);
      } else {
        items = items.slice(offset);
      }
      return items;
    }
    ,
    compactionTag: function() {
      var i;
      var refs = {};

      for (i=0; i<this.items.length(); ++i) {
        var _tags = this.items.get(i).tags;
        for (var j in _tags) {
          if (!refs[_tags[j]]) {
            refs[_tags[j]] = 0;
          }
          refs[_tags[j]]++;
        }
      }

      for (i=this.tags.length()-1; i>=0; --i) {
        var tag = this.tags.get(i);
        if (!refs[tag.id] || (refs[tag.id] == 0)) {
          this.tags.remove(tag);
        }
      }
      this.tags.save();
    },
    
    serialize: function() {
      var tagmap = {};
      for (i=0; i<this.tags.length(); ++i) {
        var tag = this.tags.get(i);
        tagmap[tag.id] = tag.t;
      }
      
      var data = '';
      for (var i=0; i<this.items.length(); ++i) {
        var item = this.items.get(i);
        var line = [];
        
        line.push(item.id.match(/^[a-z0-9]+/));
        line.push(item.v);
        line.push(Punycode.decode(item.t));
        line.push((Punycode.decode(item.c)).replace(/[\r\n]/g, ' '));
        line.push(Date.parse(item.reg));
        for (var j=0; j<item.tags.length; ++j) {
          line.push(tagmap[item.tags[j]]);
        }
        data += line.join("\t") +"\r\n";
      }
      return data;
    }
  }


  // --------------------------------------------
  // Views
  // --------------------------------------------
  var View = function(){};
  View.prototype = {
    initialize: function() {
    },
    render: function(template, params) {
      var pattern;
      var params = params || {};

      for (var i in params) {
        pattern = new RegExp("{"+ i +"}", "ig");
        template = template.replace(pattern, params[i]);
      }
      return template;
    },
    sync: function() {
    },
    focus: function() {
    },
    command: function(node, type, func, options) {
      var self = this;
      var node = ((typeof node == "string")? $(node) : node);
      node.addEventListener(type, function() {
        self.elem = this;
        self.options = options || {};
        return func.apply(self, arguments);
      }, false);
    },
    commands: function(className, type, func, options) {
      var elems = document.getElementsByClassName(className);
      for (var i=0; i<elems.length; ++i) {
        this.command(elems[i], type, func, options);
      }
    }
  }

  // Mypage
  var MyView = $extend(View, function(){});
  MyView.prototype.TRIGGER_HASH = '#/extmylist';
  MyView.prototype.page = 0;
  MyView.prototype.isEditting = false;
  MyView.prototype.hasUpdate = false;
  MyView.prototype.initialize = function() {
    var target = $('myNavMylistMemory');
    if (target) {
      this._initialize();
    } else {
      target = $('myNavMylist');
      target.addEventListener('DOMNodeInserted', function() {
        if ($('myNavMylistMemory')) {
          target.removeEventListener('DOMNodeInserted', arguments.callee, false);
          view._initialize();
        }
      }, false);
    }
  }
  MyView.prototype._initialize = function() {
    this.initLayout();

    if (document.location.hash == this.TRIGGER_HASH) {
      this.navigate();
    }
    this.command('myNaviExtMylist', 'click', this.navigate);
  }
  MyView.prototype.initLayout = function() {
    var menu = $node(this.render(this.MENU_LINK));
    var target = $('myNavMylistTemp');

    target.parentNode.insertBefore(menu, target);
  }
  MyView.prototype.moveTo = function() {
    if (!this.confirmCancelEdit()) return;

    this.page = parseInt(this.elem.getAttribute("data-moveto")) - 1;
    this.drawList();
  }
  MyView.prototype.navigate = function() {
    this.page = 0;
    this.initList();
    this.drawList();

    this.command('mylist_select_sort', 'change', this.selectSort)
    this.command('mylist_select_tag',  'change', this.selectFilter);
    this.command('mylist_import',      'change', this.importData);
    this.command('popupExtMylistButton', 'click', this.togglePopup);
  }
  MyView.prototype.sync = function() {
    this.hasUpdate = true;
  }
  MyView.prototype.focus = function() {
    if (!this.hasUpdate) return;
    if (document.location.hash != this.TRIGGER_HASH) return;

    this.hasUpdate = false;
    if (confirm('リストに更新がありました。再読み込みしますか？')) {
      if (!this.confirmCancelEdit()) return;

      mylist.initialize();
      this.drawList();
    }
  }
  MyView.prototype.initList = function() {
    // init
    document.title = "拡張マイリスト - ニコニコ動画(原宿)";
    document.location.hash = this.TRIGGER_HASH;

    var dda = $xa('//dd[contains(@class, "active")]');
    for (var i in dda) {
      var el = dda[i];
      el.className = el.className.replace("-active", "");
      el.className = el.className.replace( "active", "");
    }
    $('myNaviExtMylist').setAttribute('class', 'folder1-locked-active active');
    $x('//div[@id="myContHead"]/h3').innerHTML = '拡張マイリスト';

    // check update
    if (this.hasUpdate) mylist.initialize();

    // base
    var params = {
      count: mylist.items.length(),
      button: FILE_BUTTON,
      export: Base64.encode(mylist.serialize())
    };
    
    var src = $node(this.render(this.LIST_BASE, params));
    var dst = $('myContBody');
    ElementUtil.replaceChildren(src, dst);
  }
  MyView.prototype.drawList = function() {
    var offset = this.page * NUM_DISPLAY_ITEMS;
    var limit = NUM_DISPLAY_ITEMS;
    var items = mylist.getItemList(offset, limit);

    ElementUtil.removeAllChildren($('SYS_page_items'));

    if (items.length > 0) {
      $('noListMsg').style.display = 'none';

      var html = '';
      for (var i in items) {
        var id = items[i].v || items[i].id;
        var num = parseInt(id.replace(/^[a-z]+/, ''));
        var item = {
          id: items[i].id,
          vid: items[i].id,
          title: Punycode.decode(items[i].t),
          comment: StringUtil.escape(Punycode.decode(items[i].c)),
          thumb_url: 'http://tn-skr'+ ((num % 4) + 1) +'.smilevideo.jp/smile?i='+ num,
          date: StringUtil.dateFormat(items[i].reg)
        };
        item.comm_suffix = (item.comment.length > 0)? '' : '_hidden';
        html += this.render(this.LIST_ITEM, item);
      }
      $('SYS_page_items').appendChild($node(html));
      this.commands('SYS_btn_edit_memo', 'click', this.beginEdit);
      this.commands('SYS_btn_remove_item', 'click', this.removeItem);

      // tags
      for (var i in items) {
        this.drawItemTags(items[i].id);
      }
    } else {
      $('noListMsg').style.display = 'block';
    }

    this.drawPager();
    this.drawTagList();
    this.drawCount();
    this.hasUpdate = false;
  }
  MyView.prototype.drawPager = function() {
    var items = mylist.getItemList();
    var showLinks = 10;
    var showLinksHalf = parseInt(showLinks / 2);

    var pageCurrent = this.page + 1;
    var pageBegin = (pageCurrent - showLinksHalf < 1)? 1 : (pageCurrent - showLinksHalf);
    var pageMax = parseInt((items.length - 1) / NUM_DISPLAY_ITEMS) + 1;
    var pageEnd = ((pageBegin + showLinks) < pageMax)? (pageBegin + showLinks) : pageMax;

    if (pageBegin > (pageEnd - showLinks)) {
      pageBegin = ((pageEnd - showLinks) < 1)? 1 : (pageEnd - showLinks);
    }

    var targets = $xa('//div[@class="pager"]');
    for (var pos in targets) {
      var pager = '';

      // prev
      if (this.page > 0) {
        pager += this.render(this.PAGER_ARROW, {'class':'prev', 'text':'前へ', 'moveto':(pageCurrent-1)});
      }
      // pages
      for (i=pageBegin; i<=pageEnd; ++i) {
        pager += this.render(
          ((i == pageCurrent)? this.PAGER_ITEM_CURRENT : this.PAGER_ITEM),
          {page: i}
        );
      }
      // next
      if (this.page < (pageMax - 1)) {
        pager += this.render(this.PAGER_ARROW, {'class':'next', 'text':'次へ', 'moveto':(pageCurrent+1)});
      }

      var src = $node(pager);
      var dst = targets[pos];
      ElementUtil.replaceChildren(src, dst);
    }
    this.commands('GM_mylist_move', 'click', this.moveTo);
  }
  MyView.prototype.drawTagList = function() {
    var params = { value:0, text:'（すべて表示）' };
    var options = this.render(this.TAGLIST_ITEM, params);

    for (var i=0; i<mylist.tags.length(); ++i) {
      var tag = mylist.tags.get(i);
      params.value = tag.id;
      params.text = tag.t;

      options += this.render(this.TAGLIST_ITEM, params);
    }

    var src = $node(options, 'option');
    var dst = $('mylist_select_tag');
    ElementUtil.replaceChildren(src, dst);
    ElementUtil.setValue(dst, mylist.filter);
  }
  MyView.prototype.drawItemTags = function(id) {
    var item = mylist.findItem(id);
    if (item == null) return;

    var tags = this.render(this.LIST_ITEM_TAG_HEADER);
    for (var i=0; i<item.tags.length; ++i) {
      var _id = item.tags[i];
      var tag = mylist.findTag(item.tags[i]);
      if (tag !== null) {
        tags += this.render(this.LIST_ITEM_TAG, {id:id, tag_id:tag.id, name:tag.t});
      }
    }

    var src = $node(tags)
    var dst = $('am_tags_'+ id);
    ElementUtil.replaceChildren(src, dst);

    var dd = $xa('.//a', dst);
    for (i=0; i<dd.length; ++i) {
      this.command(dd[i], 'click', this.clickFilter);
    }
  }
  MyView.prototype.drawCount = function() {
    $('mylist_items_length').innerHTML = mylist.items.length();
  }
  MyView.prototype.selectSort = function() {
    if (!this.confirmCancelEdit()) return;

    var sort = 0;
    var t = $('mylist_select_sort');
    if (t && (t.selectedIndex == 1)) {
      sort = 1;
    }

    mylist.setSortOrder(sort);
    this.drawList();
  }
  MyView.prototype.clickFilter = function() {
    var tid = ElementUtil.getSuffix(this.elem);
    this.setFilter(tid);
  }
  MyView.prototype.selectFilter = function() {
    var tid = 0;
    var t = $('mylist_select_tag');
    if (t) {
      tid = t.options[t.selectedIndex].value;
    }
    this.setFilter(tid);
  }
  MyView.prototype.setFilter = function(tid) {
    if (!this.confirmCancelEdit()) return;

    if (tid != mylist.filter) {
      mylist.setFilter(tid);
      this.page = 0;
      this.drawList();
    }
  }
  MyView.prototype.beginEdit = function() {
    if (!this.confirmCancelEdit()) return;
    this.closePopup();

    var id = ElementUtil.getSuffix(this.elem);
    var item = mylist.findItem(id);
    if (!item) return;

    var params = {
      target_id: id,
      comment: StringUtil.escape(Punycode.decode(item.c))
    }
    $('SYS_box_memo_'+ id).style.display = 'none';
    $('commentEditForm_'+ id).innerHTML = this.render(this.EDIT_PANEL, params);
    $('am_edit_comment').focus();

    target = $('am_edit_tags');
    for (var i=0; i<item.tags.length; ++i) {
      var tag = mylist.findTag(item.tags[i]);
      var node = $node(this.render(this.EDIT_TAG_ITEM, {name:tag.t}), 'tr');
      target.appendChild(node);
    }
    if (item.tags.length == 0) {
      $('am_no_tags').style.display = 'block';
    }

    this.commands('am_delete_tag', 'click', this.deleteTag);
    this.command('am_add_tag', 'click', this.addTag);
    this.command('am_editend', 'click', this.endEdit);
    this.command('am_append_tag_text', 'keydown', this.onFormKeyDown);
    this.isEditting = true;
  }
  MyView.prototype.endEdit = function() {
    if (!this.isEditting) return;

    var id = $('am_edit_target').value;
    var panel = $('commentEditForm_'+ id);

    if (panel && panel.hasChildNodes()) {
      var i;
      var comment = $('am_edit_comment').value;
      var memo_box = $('SYS_box_memo_'+ id);
      var memo_body = $x('div//span[@class="SYS_box_memo_body"]', memo_box);

      var _tags = [];
      var tags = document.getElementsByClassName('am_edit_tag_item');
      for (i=0; i<tags.length; ++i) {
        var name = tags[i].textContent;
        var tag = mylist.searchTag(name);
        if (tag !== null) {
          tid = tag.id;
        } else {
          tid = mylist.addTag(name);
        }
        if (tid !== null) {
          _tags.push(tid);
        }
      }

      mylist.findItem(id).c = Punycode.encode(comment);
      mylist.findItem(id).tags = _tags;
      mylist.items.save();

      var xa = $xa('.//div[contains(@class, "myListComment")]', memo_box);
      for (var i in xa) {
        var el = xa[i];
        if (comment.length > 0) {
          el.className = el.className.replace("_hidden", "");
        } else {
          el.className = el.className + "_hidden";
        }
      }

      memo_body.innerHTML = comment;
      memo_box.style.display = "block";
      ElementUtil.removeAllChildren(panel);

      mylist.compactionTag();
      this.drawTagList();
      this.drawItemTags(id);
    }

    this.isEditting = false;
  }
  MyView.prototype.addTag = function() {
    var target = $('am_edit_tags');
    var form = $('am_append_tag_text');
    var tags = form.value;
    if (tags.length == 0) return;

    tags = tags.replace('　', ' ').split(' ');
    for (var i=0; i<tags.length; ++i) {
      var tag = tags[i].replace(/^\s+|\s+$/g, '');
      if (tag.length == 0) continue;

      var node = $node(this.render(this.EDIT_TAG_ITEM, {name:tag}), 'tr');
      var button = node.getElementsByClassName('am_delete_tag')[0];

      this.command(button, 'click', this.deleteTag);
      target.appendChild(node);
    }

    form.value = '';
    form.focus();
    $('am_no_tags').style.display = 'none';
  }
  MyView.prototype.deleteTag = function() {
    var target = this.elem;
    while (target.parentNode) {
      var target = target.parentNode;
      if (target.className == 'am_edit_tag_item_block') {
        target.parentNode.removeChild(target);
      }
    }

    var tags = document.getElementsByClassName('am_edit_tag_item_block');
    if (tags.length == 0) {
      $('am_no_tags').style.display = 'block';
    }
  }
  MyView.prototype.onFormKeyDown = function(e) {
    if (e.keyCode == 13) this.addTag();
  }
  MyView.prototype.confirmCancelEdit = function() {
    if (this.isEditting) {
      /*
      if (!confirm('編集中のマイリストコメントを終了しますか？')) {
        return false;
      }
      */
      this.endEdit();
    }
    return true;
  }
  MyView.prototype.removeItem = function() {
    if (!this.confirmCancelEdit()) return;

    var id = ElementUtil.getSuffix(this.elem);
    var item = mylist.findItem(id);
    if (!item) return;

    var msg = '「'+ Punycode.decode(item.t) +'」を削除します。\r\n本当によろしいですか？';
    if (confirm(msg)) {
      if (mylist.removeItem(item)) {
        this.closePopup();
        this.drawList();
      } else {
        alert('削除できませんでした');
      }
    }
  }
  MyView.prototype.togglePopup = function() {
    if ($('popupExtMylist').style.display == 'block') {
      this.closePopup();
    } else {
      this.openPopup();
    }
  }
  MyView.prototype.openPopup = function() {
    $('popupExtMylist').style.display = 'block';
    $('mylist_export').href = "data:application/octet-stream;base64,"+ Base64.encode(mylist.serialize());
  }
  MyView.prototype.closePopup = function() {
    $('popupExtMylist').style.display = 'none';
  }
  MyView.prototype.importData = function() {
    var file = $('mylist_import').files[0];
    if (!file) return;
    
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      var imported = 0;
      var text = e.target.result;
      var lines = text.split(/[\r\n]+/g);
      
      for (var i=0; i<lines.length; ++i) {
        var params = lines[i].split(/\t/g);
        if (params.length < 4) continue;
        
        var item = new ListItem(params[0], params[1], Punycode.encode(params[2]));
        if (mylist.addItem(item)) {
          var _tags = [];
          for (var j=5; j<params.length; ++j) {
            var name = params[j];
            var tag = mylist.searchTag(name);
            if (tag !== null) {
              tid = tag.id;
            } else {
              tid = mylist.addTag(name);
            }
            if (tid !== null) {
              _tags.push(tid);
            }
          }
          mylist.findItem(params[0]).c = Punycode.encode(params[3]);
          mylist.findItem(params[0]).tags = _tags;
          mylist.items.save();
          
          imported++;
        }
      }
      if (imported > 0) {
        mylist.initialize();
        self.drawList();
        self.openPopup();
        alert(imported +"件がインポートされました");
      } else {
        alert("インポートされたデータはありません");
      }
    }
    reader.onerror = function() {
      alert('ファイルの読み込みに失敗しました');
    }
    reader.readAsText(file, 'utf-8');
  }
  MyView.prototype.MENU_LINK = '<dd id="myNaviExtMylist" class="folder1-locked"><a href="javascript:void(0);">拡張マイリスト</a></dd>';
  MyView.prototype.LIST_BASE = ''
    // header
    + '<div class="mylistFormWrap">'
    + '<div class="spBox">'
    + '<form class="sortForm SYS_box_sort" action="">'
    + '<div style="float:left">'
    + '<span class="itemNum">全<span id="mylist_items_length" style="margin-right:0">{count}</span>件</span>'
    + '<select name="sort" id="mylist_select_sort" class="mylist_select_sort">'
    + '<option value="1" selected="true">登録が新しい順</option>'
    + '<option value="2">登録が古い順</option>'
    + '</select>'
    + '&nbsp;タグで絞り込み:<select style="width: 120px;" id="mylist_select_tag" class="mylist_select_tag"></select>'
    + '&nbsp;'
    + '<img id="popupExtMylistButton" src="{button}" alt="エクスポート/インポート" title="エクスポート/インポート">'
    + '</div>'
    + '<div class="pagerWrap"><div class="pager"></div></div>'
    + '<div style="clear:both"></div>'
    + '<div id="popupExtMylist"><dl>'
    + '<dd>エクスポート：<a href="data:application/octet-stream;base64,{export}" id="mylist_export">ファイルダウンロード</a></dd>'
    + '<dd>インポート：<input type="file" id="mylist_import"></dd>'
    + '</dl></div>'
    + '</form>'
    + '<p class="spMsg">500件を超えても消えてしまいませんが、ニコニコ動画のデザイン変更でしばしば悲しいことになります。</p>'
    + '</div>'
    + '</div>'
    + '<style type="text/css">'
    + 'input.submit, button.submit {'
    +   'font-size:12px; background:#CCC url("http://res.nimg.jp/img/btn/bg_submit_01.gif") repeat-x;'
    +   'border:solid 1px; border-color:#C9CFCF #999F9F #696F6F; margin:2px 0; padding:2px 4px; cursor:pointer;'
    + '}\n'
    + '.am_item_tag{'
    +   'font-size:11px;'
    + '}\n'
    + '.am_edit_tag_item_block td {'
    +   'font-size:12px; border-bottom:dotted 1px #666;'
    + '}\n'
    + '.am_edit_tag_item {'
    +   'padding: 2px 3em 0 4px;'
    + '}\n'
    + '#popupExtMylist {'
    +   'display:none; margin:4px 60px 0; background-color:#fff; border:1px solid #333; padding:4px 8px;'
    + '}\n'
    + '#popupExtMylistButton {'
    +   'cursor:pointer;'
    + '}'
    + '</style>'
    + '</div>'
    // main
    + '<div id="noListMsg" class="noListMsg" style="display:none">'
    +   '<p class="att">拡張マイリストに動画は登録されていません。<br>好きな動画を登録しましょう！</p>'
    + '</div>'
    + '<ul id="SYS_page_items" class="myContList videoList"></ul>'
    // footer
    + '<div class="pagerWrap"><div class="pager"></div></div>'
    ;
  MyView.prototype.LIST_ITEM = ''
    + '<li class="SYS_box_item">'
    + '<a class="mypageThumb" href="watch/{vid}"><img class="lazyimage" src="{thumb_url}"></a>'
    + '<div class="mylistVideo">'
    +   '<h4><a href="/watch/{vid}">{title}</a></h4>'
    +   '<p class="mylistTime">{date} 登録</p>'
    +   '<dl id="am_tags_{id}">'
    +     '<dt>登録タグ:</dt>'
    +   '</dl>'
    +   '<div class="comment SYS_box_memo" id="SYS_box_memo_{id}">'
    +     '<div class="myListCommentT{comm_suffix}">'
    +     '<div class="myListCommentB{comm_suffix}">'
    +     '<div class="myListCommentL{comm_suffix}">'
    +     '<div class="myListCommentR{comm_suffix}">'
    +       '<p><span class="SYS_box_memo_body">{comment}</span>'
    +       '<img class="editBtnComment SYS_btn_edit_memo" id="SYS_btn_edit_memo_{id}" alt="マイリストコメント編集" src="http://uni.res.nimg.jp/img/blank.gif"></p>'
    +   '</div></div></div></div>'
    +   '</div>'
    +   '<div id="commentEditForm_{id}"></div>'
    +   '<div class="buttons">'
    +     '<a class="editBtnDel SYS_btn_remove_item" id="SYS_btn_remove_item_{id}" href="javascript:void(0);">削除</a>'
    +   '</div>'
    + '</div>'
    + '</li>'
    ;
  MyView.prototype.LIST_ITEM_TAG_HEADER = '<dt>登録タグ: </dt>';
  MyView.prototype.LIST_ITEM_TAG = '<dd><a href="javascript:void(0);" id="am_item_tag_{id}_{tag_id}" class="am_item_tag">{name}</a></dd>';
  MyView.prototype.PAGER_ARROW = '<a href="javascript:void(0)" class="GM_mylist_move {class}" data-moveto="{moveto}">{text}</a>';
  MyView.prototype.PAGER_ITEM = '<a href="javascript:void(0)" class="GM_mylist_move SYS_btn_pager" data-moveto="{page}">{page}</a>';
  MyView.prototype.PAGER_ITEM_CURRENT = '<span class="active">{page}</span>';
  MyView.prototype.TAGLIST_ITEM = '<option value="{value}">{text}</option>'
  MyView.prototype.EDIT_PANEL = ''
    + '<div id="commentEditForm_body" style="border:1px solid #95B9DE; padding: 4px">'
    + '<div style="color:#666">マイリストコメント</div>'
    + '<textarea id="am_edit_comment" style="width:98%; margin:2px 0 0.5em 0; padding:2px; border:solid 1px #aaa; font-size:12px">'
    + '{comment}'
    + '</textarea>'
    + '<div style="color:#666; margin-top:4px">タグ</div>'
    + '<input type="text" id="am_append_tag_text" style="border:solid 1px #aaa; font-size:12px"> '
    + '<input type="button" id="am_add_tag" class="submit" value="登録">'
    + '<table cellspacing="2" cellpadding="2" border="0" style="font-size:12px; line-height:1; margin:4px 2px; padding-left:16px;">'
    +   '<tbody id="am_edit_tags">'
    +   '<tr id="am_no_tags" style="display:none"><td style="font-size:12px; border-bottom:dotted 1px #666;">登録されているタグはありません</td></tr>'
    +   '</tbody>'
    + '</table>'
    + '<div style="margin:4px">'
    +   '<input type="hidden" id="am_edit_target" value="{target_id}">'
    +   '<input type="button" id="am_editend" style="vertical-align:bottom" class="submit" value="編集を終了する">'
    + '</div>'
    + '</div>';
  MyView.prototype.EDIT_TAG_ITEM = '<tr class="am_edit_tag_item_block">'
    + '<td class="am_edit_tag_item">{name}</td>'
    + '<td><input type="button" class="submit am_delete_tag" value="削除"></td>'
    + '</tr>'
    ;

  // Watchpage
  var WatchView = $extend(View, function(){});
  WatchView.prototype.initialize = function() {
    this.initLayout();

    this.command('gm_add_mylist', 'click', this.addItem);
  }
  WatchView.prototype.initLayout = function() {
    var MSG_deflist = $('MSG_deflist');

    // button
    var button = $node(this.render(this.ADD_BUTTON, {data:IMAGE_BUTTON}));
    MSG_deflist.parentNode.appendChild(button);

    // popup window
    var popup = $('MSG_deflist_success').cloneNode(true);
    popup.setAttribute('id', 'MSG_gm_mylist_message');
    popup.setAttribute('style', 'background-color:#696F6F; opacity:0.8; display:none');
    MSG_deflist.appendChild(popup);

    // fix
    $('video_tags').style.width = "576px";
  }
  WatchView.prototype.addItem = function() {
    var video = this.getVideo();
    if (!video) {
      this.popupMessage('動画情報の取得に失敗しました…orz');
      return;
    }

    var id = video.v;
    var v = video.id;
    var t = video.encodedTitle;

    var item = new ListItem(id, v, t);
    if (mylist.addItem(item)) {
      this.popupMessage('<a href="/my/mylist/#/extmylist" style="color:#fff">拡張マイリストに登録しました(多分)。</a>');
    } else {
      this.popupMessage('すでに登録されています。');
    }
  }
  WatchView.prototype.getVideo = function() {
    var video = w.Video;
    if (!video) {
      var scripts = document.getElementsByTagName('script');
      for (var i in scripts) {
        if (scripts[i].text) {
          var script = scripts[i].text;
          if (script.match(/var Video/)) {
            eval(script.replace(/(<!--|-->)/g, ''));
            video = Video;
            break;
          }
        }
      }
    }

    if (video.id && video.title) {
      video.encodedTitle = Punycode.encode(video.title);
      return video;
    }
    return null;
  }
  WatchView.prototype.popupMessage = function(msg) {
    var msgs = $xa('//p[starts-with(@id, "MSG_deflist_")]');
    for (var i in msgs) {
      if (msgs[i].style) msgs[i].style.display = 'none';
    };

    // show
    $('MSG_gm_mylist_message').innerHTML = msg;
    $('MSG_gm_mylist_message').style.display = 'block';
    $('MSG_deflist').style.display = 'block';

    // hide
    setTimeout(function() {
      $('MSG_deflist').style.display = 'none';
      $('MSG_gm_mylist_message').style.display = 'none';
      $('MSG_gm_mylist_message').innerHTML = '';
    }, 3000);
  }
  WatchView.prototype.ADD_BUTTON = '<div style="position:absolute;left:-91px"><a id="gm_add_mylist" href="javascript:void(0);"><img src="{data}" alt="拡張マイリストに登録"></a></div>';


  // --------------------------------------------
  // Utilities
  // --------------------------------------------
  function $(id) {
    return document.getElementById(id);
  }
  function $e(type) {
    return document.createElement(type);
  }
  function $t(text) {
    return document.createTextNode(text);
  }
  function $x(xpath, node) {
    node = node || document;
    var result = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue? result.singleNodeValue : null;
  }
  // reference from http://d.hatena.ne.jp/os0x/20081024/1224863727
  function $xa(exp, context) {
    context || (context = document);
    var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
      return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
        context.namespaceURI || document.documentElement.namespaceURI || "";
    });
    var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        var ret = [], i = null;
        while (i = result.iterateNext()) ret.push(i);
        return ret;
    }
    return null;
  };
  function $node(html, type, p) {
    var tmp;
    var p = p || 0;
    var container = document.createDocumentFragment();
    
    switch (type) {
      case 'tr':
        p++;
        tmp = document.createElement('table');
        break;
      case 'option':
        tmp = document.createElement('select');
        break;
      default:
        tmp = document.createElement('div');
    }

    tmp.style.display = "none";
    document.body.appendChild(tmp);
    tmp.innerHTML = html;

    while (tmp.firstChild) {
      container.appendChild(tmp.firstChild);
    }
    document.body.removeChild(tmp);
    
    for (var i=0; i<p; ++i) {
      if (container.firstChild) container = container.firstChild;
    }
    return container;
  };
  function $extend(s, c) {
    var f = function(){};
    f.prototype = s.prototype;
    c.prototype = new f();
    c.prototype._super = s.prototype;
    c.prototype._super.constructor = s;
    c.prototype.constructor = c;

    return c;
  };

  StringUtil = {
    escape: function(str) {
      return str.replace(/&/,'&amp;').replace(/</g,'&lt;').replace(/>/,'&gt;');
    },
    dateFormat: function(str) {
      var date = new Date(str);
      var _ = {
        'year' : date.getYear(),
        'month': date.getMonth() + 1,
        'date' : date.getDate(),
        'hour' : date.getHours(),
        'min'  : date.getMinutes(),
        'sec'  : date.getSeconds()
      };

      for (var key in _) {
        if (key != 'year') {
          _[key] = (_[key] < 10)? ('0'+ _[key]) : _[key];
        } else {
          _[key] = (_[key] < 2000)? (_[key] + 1900) : _[key];
        }
      }

      return _['year'] +'年'+ _['month'] +'月'+ _['date']  +'日 '
           + _['hour'] +':'+ _['min'];
    }
  }

  ElementUtil = {
    replaceChildren: function(src, dst) {
      ElementUtil.removeAllChildren(dst);
      while (src.firstChild) {
        dst.appendChild(src.firstChild);
      }
    },
    removeAllChildren: function(elem) {
      if (elem.hasChildNodes()) {
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }
      }
    },
    getSuffix: function(elem) {
      return elem.id.substring(elem.id.lastIndexOf('_')+1);
    },
    setValue: function(elem, value) {
      switch (elem.nodeName.toLowerCase()) {
        case 'select':
          for (var i=0; i<elem.options.length; ++i) {
            elem.options[i].selected = ((elem.options[i].value == value)? true : false);
          }
          break;
        default:
          elem.value = value;
      }
    }
  }

  // http://coderepos.org/share/browser/lang/javascript/Base64/trunk/base64.js
  Base64 = {
    utob: function(uni){
      return uni.replace(/[^\x00-\x7f]/g,
        function(m){
          var n = m.charCodeAt(0);
          return n < 0x800 ? String.fromCharCode(0xc0 | (n >>>  6))
                           + String.fromCharCode(0x80 | (n & 0x3f))
              :              String.fromCharCode(0xe0 | ((n >>> 12) & 0x0f))
                           + String.fromCharCode(0x80 | ((n >>>  6) & 0x3f))
                           + String.fromCharCode(0x80 |  (n         & 0x3f));
        }
      );
    },
    encode: function(u){ return btoa(Base64.utob(u)) }
  };

  // Punycode for JavaScript
  // Copyright (c)2005 Airemix. All rights reserved.
  // This software is licensed under BSDL.
  var Punycode = new function()
  {
    var MAXINT = 0x7fffffff;
    var BASE = 36;
    var TMIN = 1;
    var TMAX = 26;
    var SKEW = 38;
    var DAMP = 700;
    var INITIAL_BIAS = 72;
    var INITIAL_N = 0x80;
    var DELIMITER = 0x2D;

    /* basic(cp) tests whether cp is a basic code point: */
    function basic(cp){
      return cp < 0x80;
      // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./
    }

    function decode_digit(cp){
      return  cp < 58 ? cp - 22 :  cp < 91 ? cp - 65 : cp < 123 ? cp - 97 :  BASE;
    }

    function encode_digit(d){
      return d < 26 ? d + 97 : d + 22;
    }

    /*** Bias adaptation function ***/
    function adapt(delta, numpoints, firsttime){
      var k;
      delta = firsttime ? parseInt(delta / DAMP) : delta >> 1;
      delta += parseInt(delta / numpoints);
      for (k = 0;  delta > ((BASE - TMIN) * TMAX) >> 1;  k += BASE) {
        delta = parseInt(delta / (BASE - TMIN));
      }
      return parseInt(k + (BASE - TMIN + 1) * delta / (delta + SKEW));
    }

    /*** Main encode function ***/
    function encode(input){
      if(typeof(input)=='string'){
        var str = input;
        input = new Array;
        for(var i=0; i< str.length; i++)
          input.push(str.charCodeAt(i));
      }
      var output = _encode( input );
      for (var j = 0;  j < output.length;  ++j) {
        var c = output[j];
        if(c >= 0 && c <= 127); else break;
        output[j] = String.fromCharCode(c);
      }
      return output.join('');
    }
    this.encode = encode;

    function _encode( input ){
      var output = new Array;
      var n = INITIAL_N;
      var delta = 0;
      var bias = INITIAL_BIAS;

      for (j = 0;  j < input.length;  ++j)
        if (basic(input[j])) output.push(input[j]);

      var bcp = output.length;
      var handled = bcp;
      if (bcp > 0) output.push(DELIMITER);

      while (handled < input.length) {
        var m = MAXINT;
        for (j = 0;  j < input.length;  ++j)
          if (input[j] >= n && input[j] < m) m = input[j];
        if (m - n > (MAXINT - delta) / (handled + 1)) throw 'overflow';
        delta += (m - n) * (handled + 1);
        n = m;
        for (j = 0;  j < input.length;  ++j) {
          if (input[j] < n && ++delta == 0) throw 'overflow';
          if (input[j] == n) {
            var q = delta;
            for (var k = BASE;  ;  k += BASE) {
              var t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
              if (q < t) break;
              output.push(encode_digit(t + (q - t) % (BASE - t)));
              q = parseInt((q - t) / (BASE - t));
            }
            output.push(encode_digit(q));
            bias = adapt(delta, handled + 1, handled == bcp);
            delta = 0;
            ++handled;
          }
        }
        ++delta, ++n;
      }
      return output;
    }

    /*** Main decode function ***/
    function decode(input)
    {
      if(typeof(input)=='string'){
        var str = input;
        input = new Array;
        for(var i=0; i< str.length; i++)
          input.push(str.charCodeAt(i));
      }
      var output = '';
      try {
        output = _decode( input );
      } catch (e) {
        output = input;
      }
      for (var j = 0;  j < output.length;  ++j)
        output[j] = String.fromCharCode(output[j]);

      return output.join('');
    }
    this.decode = decode;

    function _decode( input )
    {
      var j;
      var output = new Array;
      var n = INITIAL_N;
      var bias = INITIAL_BIAS;
      var bcp = 0;

      for (j = input.length;  j >= 0;  --j)
        if (input[j] == DELIMITER){ bcp = j; break; }
      for (j = 0;  j < bcp;  ++j) {
        if (!basic(input[j])) throw 'bad_input';
        output.push( input[j] );
      }
      var i = 0;
      var inp = bcp > 0 ? bcp + 1 : 0;
      while( inp < input.length ){
        var oldi = i;
        for (var w = 1, k = BASE;  ;  k += BASE) {
          if (inp >= input.length) throw 'bad_input';
          var digit = decode_digit(input[inp++]);
          if (digit >= BASE) throw 'bad_input';
          if (digit > (MAXINT - i) / w) throw 'overflow';
          i += digit * w;
          var t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
          if (digit < t) break;
          if (w > MAXINT / (BASE - t)) throw 'overflow';
          w *= (BASE - t);
        }
        bias = adapt(i - oldi, output.length + 1, oldi == 0);
        oldi = parseInt(i / (output.length + 1));
        if (oldi > MAXINT - n) throw 'overflow';
        n += oldi;
        i %= (output.length + 1);
        output.splice(i++,0,n);
      }
      return output;
    }
  }

  // --------------------------------------------
  // Events
  // --------------------------------------------
  w.addEventListener('storage', function(e) {
    if (view) view.sync();
  }, false);
  w.addEventListener('focus', function(e) {
    if (view) view.focus();
  }, false);


  // --------------------------------------------
  // main
  // --------------------------------------------
  var view;
  var mylist = new MyList();

  if (location.href.indexOf('.nicovideo.jp/watch') !=  - 1) {
    view = new WatchView();
  } else {
    view = new MyView();
  }
  view.initialize();


  // --------------------------------------------
  // TEST
  // --------------------------------------------
  function test() {

    // button image
    var img = document.createElement('img');
    document.body.appendChild(img);
    img.src = IMAGE_BUTTON;
    assertEqual(img.width, 91);
    assertEqual(img.height, 32);
    document.body.removeChild(img);

    // store
    var store = new Store();
    var test_key = "_test";
    var test_value = 0;
    GM_setValue(test_key, null);
    localStorage.removeItem(test_key);

    assertEqual(null, store.load(test_key, MODE_STORAGE));
    assertEqual(null, store.load(test_key, MODE_GMVALUE));

    test_value = 123;
    store.save(test_key, test_value);
    assertEqual(toSource(test_value), store.load(test_key));

    test_value = "abcde";
    store.save(test_key, test_value);
    assertEqual(toSource(test_value), store.load(test_key));

    test_value = ["a", 123, [1, 2, 3], {"z":"test"}];
    store.save(test_key, test_value);
    assertEqual(toSource(test_value), store.load(test_key));

    // itemlist (tag)
    var taglist = new ItemList(test_key);
    GM_setValue(test_key, null);
    localStorage.removeItem(test_key);

    var item = new Tag(10, "foo");
    assertEqual(0, taglist.length());
    taglist.add(item);
    assertEqual(1, taglist.length());

    item = new Tag(25, "bar");
    taglist.add(item);
    assertEqual(2, taglist.length());

    item = new Tag(123456, "baz");
    taglist.add(item);
    assertEqual(3, taglist.length());

    item = new Tag(25, "qux");
    taglist.add(item);
    assertEqual(3, taglist.length());
    assertEqual(1, taglist.find(item.id));
    taglist.remove(item);
    assertEqual(2, taglist.length());

    // itemlist (video)
    test_key = "__test";
    var videolist = new ItemList(test_key);
    GM_setValue(test_key, null);
    localStorage.removeItem(test_key);

    item = new ListItem(10, 20, "hoge");
    assertEqual(0, videolist.length());
    videolist.add(item);
    assertEqual(1, videolist.length());
    assertEqual(2, taglist.length());

    item = new ListItem(25, 100, "fuga");
    videolist.add(item);
    assertEqual(2, videolist.length());

    item = new ListItem(456789, 999999, "hogehoge");
    videolist.add(item);
    assertEqual(3, videolist.length());
    assertEqual(2, videolist.find(item.id));
    videolist.remove(item);
    assertEqual(2, videolist.length());

    // Punycode
    var src = "abcXYZ123[]!@#$%^&*()-+=?<>/;:'\"\\";
    var dst = Punycode.encode(src);
    assertEqual(src, Punycode.decode(dst));

    src = "逝ってしまったわ、円環の理に導かれて・・・";
    dst = Punycode.encode(src);
    assertTrue((src != dst));
    assertEqual(src, Punycode.decode(dst));


    // test method
    function assertTrue(a) {
      console.log(a? "OK":"NG");
    }
    function assertEqual(a, b) {
      var msg = (a == b)? ("OK: "+ a) : ("NG: "+ a +", "+ b);
      console.log(msg);
    }
    // util
    function toSource(value) {
      if (!Object.prototype.toSource) {
        return JSON.stringify(value);
      }
      return value.toSource();
    }
  }
})();
