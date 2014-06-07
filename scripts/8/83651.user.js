// ==UserScript==
// @name           HatenaRealtimePreview
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/snaka72/
// @description    Realtime preview on Hatena::Diary detail edit page.
// @license        MIT license
// @require        http://gist.github.com/raw/165105/c03749f657fff0c22bbcdf49d310981a68bef428/text-hatena0-2.js
// @include        http://d.hatena.ne.jp/*/edit*
// @include        http://d.hatena.ne.jp/*/draft?*
// ==/UserScript==

(function() {

  GM_log("start");
  function $(id) {
    return document.getElementById(id);
  };

  function insertAfter(ele, dest) {
    dest.parentNode.insertBefore(ele, dest.nextSibling);
  }

  function Preview(edit) {
    this.hatena = new Hatena({sectionanchor: "\u25A0"});
    this.edit = $(edit);
    this.setupEditElement();
    this.element = this.createElement();
    this.update();
  }

  Preview.prototype = {
    setupEditElement: function() {
      var that = this;
      this.edit.addEventListener("keyup", function() {
          that.update();
      }, false);
    },

    createElement: function() {
      var preview = document.createElement("div");
      with(preview.style) {
        border = "1px solid black";
        cssFloat = "right";
        fontSize = "11pt";
        overflow = "auto";
      }
      insertAfter(preview, this.edit);
      return preview;
    },

    update: function() {
       this.hatena.parse(this.edit.value);
       this.element.innerHTML = this.hatena.html();
    },
  };

  function LayoutManager(container, elem1, elem2) {
    this.container = container;
    this.elem1 = elem1;
    this.elem2 = elem2;
    this.toggleSideBar(false);
    this.adjustWidth();
    this.syncronizeHeight();
    setInterval(function(that) that.syncronizeHeight(), 100, this);
  }

  LayoutManager.prototype = {
    toggleSideBar: function(isShow) {
      this.isShowSideBar = isShow;
      var sidebar = $("sidebar");
      var main    = $("main");

      if (isShow) {
        sidebar.style.display = "block";
        main.style.marginLeft = "185px";
      }
      else {
        sidebar.style.display = "none";
        main.style.marginLeft = "0";
      }
    },

    adjustWidth: function() {
      this.elem1.style.width = "49%";
      this.elem2.style.width = "49%";
    },

    syncronizeHeight: function() {
      var _height = this.elem1.clientHeight;
      if (_height != this.elem2.clientHeight)
        this.elem2.style.height = _height + "px";
    }
  };

  var preview = new Preview('textarea-edit');
  var sidebar = $("sidebar");
  var layout  = new LayoutManager($("edit-body-container"), preview.edit, preview.element);

  var button = document.createElement("button");
  with(button.style) {
    position = "absolute";
    top = "-16";
    left = "0";
  }
  button.innerHTML = "&raquo;";
  button.addEventListener("click", function(e) {
    layout.toggleSideBar(!layout.isShowSideBar);
    e.preventDefault();
    if (layout.isShowSideBar)
      this.innerHTML = "&laquo;";
    else
      this.innerHTML = "&raquo;";
  }, true);

  insertAfter(button, $("sidebar"));

})();
