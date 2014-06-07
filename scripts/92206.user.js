// ==UserScript==
// @name           Search Filter for Google
// @description    Remove Google search results by filter.
// @version        1.2.0
// @author         Milly
// @namespace      http://d.hatena.ne.jp/MillyC/
// @homepage       http://userscripts.org/scripts/show/92206
// @include        http://www.google.tld/search*
// ==/UserScript==
//
// Released under the CC by-nc-sa ja license.
// http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
//
// This script based on
// Google Search Filter (http://userscripts.org/scripts/show/12643) by Shinya
// Google Search Site-block (http://note.openvista.jp/212/) by leva

(function() {
  var SearchFilter = {
    // == Config =================={{{

    // Default filters
    // CAUTION: Script DO NOT use this list if you used "Filters Editor".
    filters: [
      "!*** OKWave partners ***",
      "||okwave.jp^",
      "*/oshiete^",
      "||oshiete.*",
      "*/qa^",
      "||qa.*",
      "||bekkoame.okweb.ne.jp^",
      "||otasuke.goo-net.com^",
      "||kikitai.teacup.com^",
      "||hiroba.chintai.net^",
      "||hiroba.kodate.jp^",
      "||gtubo.gpoint.co.jp^",
      "||renai.sunmarie.com^",
      "||questionbox.jp.msn.com^",
      "||qanda.rakuten.ne.jp^",
      "||soudan.biglobe.ne.jp^",
      "||kaiketsu.athome.jp^",
      "||moura.jp/osiete^",
      "||naruhodo.television.co.jp^",
      "||qanda.usfl.com^",
      "||soudan.teinenseikatsu.com^",
      "||ziddy.japan.zdnet.com^",
      "||cafe.family-first.jp^",
      "||q.brideswedding.jp^",
      "||scienceportal.jp/contents/guide/sqa^",
      "||www.fruitmail.net/my/p2.cgi?hatena.html^",
      "||www.mag2qa.com^",
      "||tour.tabitama.co.jp/faq^",
      "||shitsumon.sumaino-hiroba.com^",
      "||girlslucky.com^",
      "||www.soudan.hakujuji.co.jp^",
      "||www.qa.d-yutaka.co.jp^",
      "||www.oshiete-nougyou.com^",
      "||suumo.jp/sodan^",
      "||www.jiji.com/jc/qa^",
      "||japanda-ch.jp^",
      "||www.nurse-partners.com/question^",
      "||ohadanonayami.cross-clinic.com^",
      "||search.soudans.net^",
      "||soudan.shoubaihanzyou.com^",
      "||www.zakzak.co.jp/oyaji/hatsugen^",
      "||shitsumonbako.hon-aru.jp^",
      "||soudan.hokenmado.jp^",
      "||www.netricoh.com/kaiketsu^",
      "||hokensoudan.lify.jp^",
      "!*** Social Bookmarks ***",
      "||del.icio.us^",
      "||buzzurl.jp^",
      "||ceron.jp^",
      "||1470.net^",
      "||pookmark.jp^",
      "||bookmarks.yahoo.co.jp^",
      "||clip.nifty.com^",
      "||clip.livedoor.com^",
      "||psearch.yahoo.co.jp^",
      "/^https?:\\/\\/(a|b|r|h|mgw)\\.hatena\\.ne\\.jp\\//",
      "/^https?:\\/\\/(esearch|tag|pt\\.afl)\\.rakuten\\.co\\.jp\\//",
      "!*** Wikipedia clones ***",
      "||wpedia*.goo.ne.jp^",
      "||wkp.fresheye.com^",
      "||wapedia.mobi^",
      "||jiten.biglobe.ne.jp^",
      "||r25.yahoo.co.jp/keyword^"
    ],

    // Default hidden mode
    hidden: false,

    // Font color(CSS's value)
    fontColor: "#999",

    // Font size(CSS's value)
    characterSize: "90%",

    // Use "Filters Editor"
    useEditor: true,

    // == Config end ==============}}}

    list: [],
    pageUpdateEventTimer: null,

    init: function() {
      GM_addStyle([
        "body.hide-filtered li.filtered { visibility: hidden; height: 0; margin: 0; }",
        "li.filtered h3.r { font-size: " + SearchFilter.characterSize + "; }",
        "li.filtered h3.r, li.filtered h3.r a { color: " + SearchFilter.fontColor + "; }",
        "li.filtered:not(.show-temporary) div.s,",
        "li.filtered:not(.show-temporary) h3~div,",
        "li.filtered:not(.show-temporary) br { display: none; }",
      ].join(''));

      Language.init();
      SearchFilter.load();
      if (SearchFilter.useEditor) EditFilter.init();
      GM_registerMenuCommand("SFG - " + _("mode"), SearchFilter.toggleHideMode, '', '', _("modekey"));
      GM_registerMenuCommand("SFG - " + _("editor"), SearchFilter.toggleUseEditor, '', '', _("editorkey"));

      SearchFilter.filtering();
      SearchFilter.addPageUpdateEvent();
    },

    addPageUpdateEvent: function() {
      $("res").addEventListener("DOMNodeInserted", function(event) {
        if (event.target && event.target.nodeName == "DIV") {
          if (SearchFilter.pageUpdateEventTimer)
            clearTimeout(SearchFilter.pageUpdateEventTimer);
          SearchFilter.pageUpdateEventTimer = setTimeout(function() {
            SearchFilter.pageUpdateEventTimer = null;
            SearchFilter.filtering();
          }, 300);
        }
      }, false);
    },

    save: function() {
      GM_setValue("filter", JSON.stringify(SearchFilter.list));
      GM_setValue("mode", SearchFilter.hidden);
      GM_setValue("useEditor", SearchFilter.useEditor);
    },

    load: function() {
      try {
        SearchFilter.list = JSON.parse(GM_getValue("filter"));
      } catch(e) {
        SearchFilter.list = SearchFilter.filters.slice();
      }
      SearchFilter.hidden = GM_getValue("mode", SearchFilter.hidden) || false;
      SearchFilter.useEditor = GM_getValue("useEditor", SearchFilter.useEditor) !== false;
    },

    filtering: function() {
      SearchFilter.filterElements($X("//li[local:has-class('w0') and not(local:has-class('videobox'))]"));
      SearchFilter.hideElements(SearchFilter.hidden);
    },

    hideElements: function(hidden) {
      if (hidden) {
        addClass(document.body, "hide-filtered");
      } else {
        removeClass(document.body, "hide-filtered");
      }
    },

    filterElements: function(results) {
      var urlregexp = SearchFilter.createUrlRegExp();
      for (var i = 0, l = results.length; i < l; i++) {
        var anchor = $X(".//a[local:has-class('l')]", results[i])[0];
        if (urlregexp && urlregexp.test(anchor.href)) {
          addClass(results[i], 'filtered');
        } else {
          removeClass(results[i], 'filtered');
        }
        if (SearchFilter.useEditor) {
          EditFilter.createLink(results[i], anchor);
        } else {
          EditFilter.removeLink(results[i]);
        }
      }
    },

    createUrlRegExp: function() {
      var regexplist = [];
      for (var i = 0, b = SearchFilter.list.length; i < b; i++) {
        var regexp = SearchFilter.createRegString(SearchFilter.list[i]);
        if (regexp) regexplist.push(regexp);
      }
      if (!regexplist.length) return null;
      return new RegExp("(?:" + regexplist.join(")|(?:") + ")", "i");
    },

    createRegString: function(filter) {
      if (/^!/.test(filter)) return null;
      if (/^\/.*\/$/.test(filter)) {
        var regexp = filter.substring(1, filter.length - 1);
      } else {
        var regexp = filter
          .replace(/$.*/, "")                          // options
          .replace(/(?=[.()\[\]{}\\+?|])/g, '\\')      // escape regexp
          .replace(/\*/g, '.*')                        // wildcards
          .replace(/\^/g, '[/:?=&]')                   // separator
          .replace(/^\[\/:\?=&\]/g, '^(?:|.*[/:?=&])') // separator or beginning
          .replace(/\[\/:\?=&\]$/, '(?:[/:?=&].*|)$')  // separator or end
          .replace(/^\\\|\\\|/, "^[a-z0-9_+-]+://(?:[^/.?]+\\.)*");
                                                       // any protocol or sub domain
        if (/^\\\||\\\|$/.test(regexp)) {
          regexp = regexp
            .replace(/^\\\|/, "^")                     // beginning
            .replace(/\\\|$/, "$");                    // end
        } else {
          regexp = regexp
            .replace(/^(?!\^)/, "^")                   // beginning
            .replace(/[^$]$/, "$&$");                  // end
        }
      }
      try {
        new RegExp(regexp, "i");
        return regexp;
      } catch(e) {
        return null;
      }
    },

    toggleHideMode: function() {
      SearchFilter.hideElements(SearchFilter.hidden = !SearchFilter.hidden);
      SearchFilter.save();
    },

    toggleUseEditor: function() {
      if (SearchFilter.useEditor = !SearchFilter.useEditor) {
        EditFilter.init();
      } else {
        EditFilter.hideAll();
      }
      SearchFilter.filtering();
      SearchFilter.save();
    }
  };

  var EditFilter = {
    list: [],
    selected: [],
    filter: "",
    timer: null,
    initialized: false,

    init: function() {
      if (EditFilter.initialized) {
        $("search-filter-panel-button").style.display = "";
        return;
      }
      EditFilter.initialized = true;

      EditFilter.list = SearchFilter.list.slice();

      GM_addStyle([
        "#search-filter-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000000; opacity: 0.1; z-index: 10000; }",
        "#search-filter-panel-button { color: #4373db; text-decoration: none; }",
        "#search-filter-panel { position: absolute; right: 1em; min-width: 20em; padding: 0.8em; border: 1px solid #cccccc; background: #f0f0f0; -moz-box-shadow: 2px 2px 5px rgba(0,0,0,0.5); z-index: 10001; }",
        "#filter-edit-area { width: 99%; min-width: 20em; font-family: 'Lucida Console', 'Courier New', Courier, Monaco, monospace; font-size: 80%; }",
        "#filter-list { width: 100%; min-height: 10em; }",
        "#filter-list option.filter-comment { color: #808080; }",
        "#filter-list option.filter-regexp { color: #c00000; }",
        "#filter-list option b { color: #008000; }",
        "#filter-edit-buttons { padding-left: 1em; }",
        "#filter-edit-buttons input { width: 5em; margin-bottom: 0.5em; }",
        "#filter-accept-buttons { margin: 0; padding-top: 0.5em; border-top: 1px solid #cccccc; text-align: right; }",
        "#filter-accept-buttons input { width: 5em; }",
        "span.filter-buttons { white-space: nowrap; margin-left: 0.5em; }",
        "a.filter-button, a.show-temporary-button { display: inline-block; color: #d3e1f9; text-decoration: none; border: 1px solid #d3e1f9; -moz-border-radius: 4px; background: #ffffff; padding: 0.1em 0.3em; line-height: 1; }",
        "div.vsc:hover a.filter-button, div.vsc:hover a.show-temporary-button { color: #4373db; border-color: #4373db; }",
        "a.show-temporary-button { display: none; }",
        "li.filtered a.filter-button { display: none; }",
        "li.filtered a.show-temporary-button { display: inline-block; }"
      ].join(''));

      var place = $X("id('subform_ctrl')/div[contains(@style, 'float')]")[0];
      place.parentNode.style.position = "relative";
      place.innerHTML += "&nbsp;&nbsp;";

      var link = document.createElement("a");
      link.id = "search-filter-panel-button";
      link.setAttribute("href", "#");
      link.appendChild(document.createTextNode(_('config')));
      link.addEventListener("click", EditFilter.toggleDisplayList, false);
      place.appendChild(link);

      var screen = document.createElement("div");
      screen.id = "search-filter-screen";
      screen.style.display = "none";
      document.body.appendChild(screen);

      var panel = document.createElement("div");
      panel.id = "search-filter-panel";
      panel.style.top = place.parentNode.offsetTop + place.parentNode.offsetHeight + 10;
      panel.style.maxWidth = (place.parentNode.offsetWidth - 26) + "px";
      panel.style.display = "none";
      panel.addEventListener("keydown", function(e) { if (27 == e.keyCode) EditFilter.cancelEditing(e) }, true);

      var table = panel.appendChild(document.createElement("table"));
      var tr = table.appendChild(document.createElement("tr"));
      var lcolumn = tr.appendChild(document.createElement("td"));
      var rcolumn = tr.appendChild(document.createElement("td"));
      rcolumn.id = "filter-edit-buttons";

      var input = document.createElement("input");
      input.id = "filter-edit-area";
      input.setAttribute("name", "filter-edit-area");
      input.setAttribute("type", "text");
      input.addEventListener("focus", EditFilter.setTimer, false);
      input.addEventListener("blur", EditFilter.clearTimer, false);
      input.addEventListener("keydown", function(e) { if (13 == e.keyCode) EditFilter.addFilter(e) }, false);
      lcolumn.appendChild(input);
      lcolumn.appendChild(document.createElement("br"));

      var select = document.createElement("select");
      select.id = "filter-list";
      select.setAttribute("name", "filter-list");
      select.setAttribute("size", 10);
      select.setAttribute("multiple", "multiple");
      select.addEventListener("change", EditFilter.selectFilter, false);
      select.addEventListener("keydown", function(e) { if (46 == e.keyCode) EditFilter.removeFilter(e) }, false);
      lcolumn.appendChild(select);

      ["add", "edit", "remove", "reset"].forEach(function(value) {
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        if (value != "reset") {
          button.setAttribute("disabled", "disabled");
        }
        button.addEventListener("click", EditFilter[value + "Filter"], false);
        rcolumn.appendChild(button);
        rcolumn.appendChild(document.createElement("br"));
      });

      var mode = document.createElement("label");
      var check = document.createElement("input");
      check.id = "filter-mode";
      check.setAttribute("name", "filter-mode");
      check.setAttribute("type", "checkbox");
      if (SearchFilter.hidden) check.setAttribute("checked", "checked");
      mode.appendChild(check);
      mode.appendChild(document.createTextNode(" " + _('mode')));
      panel.appendChild(mode);

      var p = document.createElement("p");
      p.id = "filter-accept-buttons";
      ["ok", "cancel"].forEach(function(value) {
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        button.addEventListener("click", EditFilter[value + "Editing"], false);
        p.appendChild(button);
        p.appendChild(document.createTextNode(" "));
      });
      panel.appendChild(p);

      var firstTarget = panel.insertBefore(document.createElement("a"), panel.firstChild);
      var lastTarget = panel.appendChild(document.createElement("a"));
      firstTarget.href = lastTarget.href = "#";
      firstTarget.addEventListener("focus", function() { $("filter-cancel").focus() }, false);
      lastTarget.addEventListener("focus", function() { $("filter-edit-area").focus() }, false);

      place.parentNode.appendChild(panel);
      EditFilter.updateFilterList();
    },

    hideAll: function() {
      if (EditFilter.initialized) {
        [ "search-filter-panel-button",
          "search-filter-screen",
          "search-filter-panel" ]
          .forEach(function(id) { $(id).style.display = "none" });
      }
    },

    createLink: function(parent, anchor) {
      var exists = $X(".//span[local:has-class('filter-buttons')]", parent)[0];
      if (exists) return;

      var span = document.createElement("span");
      span.className = "filter-buttons";

      var filterLink = document.createElement("a");
      filterLink.className = "filter-button";
      filterLink.setAttribute("href", "#" + anchor.host);
      filterLink.appendChild(document.createTextNode(_('filter')));
      filterLink.addEventListener("click", EditFilter.addFromLink, false);
      span.appendChild(filterLink);

      var showLink = document.createElement("a");
      showLink.className = "show-temporary-button";
      showLink.setAttribute("href", "#");
      showLink.appendChild(document.createTextNode(_('show')));
      showLink.addEventListener("click", EditFilter.toggleShowTemporary, false);
      span.appendChild(showLink);

      var position = $X(".//h3[local:has-class('r')]|.//a[local:has-class('l')]", parent)[0];
      position.parentNode.insertBefore(span, position.nextSibling);
    },

    removeLink: function(parent) {
      var buttons = $X(".//span[local:has-class('filter-buttons')]", parent)[0];
      if (buttons) buttons.parentNode.removeChild(buttons);
    },

    addFromLink: function(event) {
      event.preventDefault();
      var domain = event.target.href.match(/#([\w.-]+)$/)[1];
      var filter = "||" + domain + "^";
      if (confirm(_('confirm', filter)))
        EditFilter.addList(filter);
    },

    addList: function(filter) {
      if (!EditFilter.checkFilterExists(filter)) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList();
      SearchFilter.list = EditFilter.list.slice();
      SearchFilter.save();
      SearchFilter.filtering();
    },

    addFilter: function(event) {
      var filter = EditFilter.filter = $("filter-edit-area").value;
      if (filter == "") return;
      if (!EditFilter.checkFilterExists(filter)) return;
      if (!EditFilter.checkFilterValid(filter)) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList(filter);
    },

    checkFilterExists: function(filter) {
      for (var i = 0, l = EditFilter.list.length; i < l; i++) {
        if (filter == EditFilter.list[i]) {
          alert(_('exists', filter));
          return false;
        }
      }
      return true;
    },

    checkFilterValid: function(filter) {
      if ("!" != filter[0] && !SearchFilter.createRegString(filter)) {
        alert(_('invalid', filter));
        return false;
      }
      return true;
    },

    editFilter: function(event) {
      var filter = $("filter-edit-area").value;
      if (EditFilter.filter == filter) {
        alert(_('notChanged', filter));
        return;
      }
      if (!EditFilter.checkFilterValid(filter)) return;
      for (var i = 0, l = EditFilter.list.length; i < l; i++) {
        if (EditFilter.filter == EditFilter.list[i]) {
          EditFilter.list[i] = filter;
          break;
        }
      }
      EditFilter.filter = filter;
      EditFilter.updateFilterList(filter);
    },

    removeFilter: function(event) {
      var selected = EditFilter.selected;
      var first = EditFilter.selected[0];
      for (var i = selected.length - 1; 0 <= i; i--) {
        var index = selected[i];
        if (0 <= index && index < EditFilter.list.length) EditFilter.list.splice(index, 1);
      }
      EditFilter.filter = $("filter-edit-area").value = "";
      EditFilter.updateFilterList();
      if (first) {
        var option = $("filter-list").childNodes[first];
        if (option) {
          option.selected = true;
          EditFilter.selectFilter(event);
        }
      }
    },

    resetFilter: function(event) {
      if (confirm(_('init'))) {
        EditFilter.list = SearchFilter.filters.slice()
        SearchFilter.list = EditFilter.list.slice();
        EditFilter.updateFilterList();
        EditFilter.filter = $("filter-edit-area").value = "";
      }
    },

    okEditing: function(event) {
      SearchFilter.list = EditFilter.list.slice();
      SearchFilter.hidden = $("filter-mode").checked;
      SearchFilter.save();
      EditFilter.toggleDisplayList(event);
      SearchFilter.filtering();
    },

    cancelEditing: function(event) {
      EditFilter.list = SearchFilter.list.slice();
      EditFilter.updateFilterList();
      EditFilter.toggleDisplayList(event);
    },

    updateFilterList: function(filter) {
      var list = $("filter-list");
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      EditFilter.list.forEach(function(value) {
        var option = document.createElement("option");
        if (filter && value == filter) option.setAttribute("selected", "selected");
        value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (/^!/.test(value)) {
          option.className = "filter-comment";
        }
        else if (/^\/.*\/$/.test(value)) {
          option.className = "filter-regexp";
        } else {
          value = value.replace(/^\|\|?|\^|\*|\|$/g, '<b>$&</b>')
        }
        option.innerHTML = value;
        list.appendChild(option);
      });
      EditFilter.selected = EditFilter.getSelectedIndexes();
      EditFilter.resetEnableButton();
    },

    getSelectedIndexes: function() {
      var selected = [];
      var options = $("filter-list").childNodes;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) selected.push(i);
      }
      return selected;
    },

    selectFilter: function(event) {
      EditFilter.selected = EditFilter.getSelectedIndexes();
      if (1 == EditFilter.selected.length) {
        var value = EditFilter.list[event.target.selectedIndex] || "";
        EditFilter.filter = $("filter-edit-area").value = value;
      } else {
        EditFilter.filter = "";
      }
      EditFilter.resetEnableButton();
    },

    setTimer: function(event) {
      EditFilter.timer = setInterval(EditFilter.checkValue, 250);
    },

    clearTimer: function(event) {
      clearInterval(EditFilter.timer);
      EditFilter.timer = null;
    },

    checkValue: function() {
      var filter = $("filter-edit-area").value;
      if (EditFilter.checkedFilter == filter) return;

      var enabled = [];
      if (filter != "") {
        if (EditFilter.filter == "") {
          enabled.push("add");
        }
        else if (filter != EditFilter.filter) {
          enabled.push("add");
          if (1 == EditFilter.selected.length) enabled.push("edit");
        }
      }
      ["add", "edit"].forEach(function(value) {
        var button = $("filter-" + value);
        if (0 <= enabled.indexOf(value)) {
          button.removeAttribute("disabled");
        } else {
          button.setAttribute("disabled", "disabled");
        }
      });

      EditFilter.checkedFilter = filter;
    },

    resetEnableButton: function() {
      ["add", "edit"].forEach(function(value) {
        var button = $("filter-" + value);
        button.setAttribute("disabled", "disabled");
      });
      var button = $("filter-remove");
      if (0 == EditFilter.selected.length) {
        button.setAttribute("disabled", "disabled");
      } else {
        button.removeAttribute("disabled");
      }
    },

    toggleDisplayList: function(event) {
      event.preventDefault();
      var screen = $("search-filter-screen");
      var panel = $("search-filter-panel");
      var show = (panel.style.display == "none");
      screen.style.display = panel.style.display = show ? "block" : "none";
      $(show ? "filter-edit-area" : "search-filter-panel-button").focus();
    },

    toggleShowTemporary: function(event) {
      event.preventDefault();
      var element = $X("./ancestor::li[local:has-class('filtered')]", event.target)[0];
      if (hasClass(element, "show-temporary")) {
        removeClass(element, "show-temporary");
        var text = _("show");
      } else {
        addClass(element, "show-temporary");
        var text = _("hide");
      }
      event.target.innerHTML = "";
      event.target.appendChild(document.createTextNode(text));
    }
  };

  var Language = {
    lang: "en",

    init: function() {
      var lang = navigator.language.substring(0,2);
      Language.lang = Language[lang] ? lang : "en";
    },

    getMessage: function() {
      var args = Array.prototype.slice.call(arguments), id = args.shift();
      var msg = Language[Language.lang][id] || Language["en"][id];
      return msg.replace(/{(\d+)}/g, function(_, n) { return args[n]; });
    },

    ja: {
      config     : "\u30d5\u30a3\u30eb\u30bf\u8a2d\u5b9a",
      add        : "\u8ffd\u52a0",
      edit       : "\u7de8\u96c6",
      remove     : "\u524a\u9664",
      reset      : "\u521d\u671f\u5316",
      mode       : "\u30d5\u30a3\u30eb\u30bf\u306b\u30de\u30c3\u30c1\u3057\u305f\u7d50\u679c\u3092\u975e\u8868\u793a",
      modekey    : "H",
      editor     : "\u30D5\u30A3\u30EB\u30BF\u8A2D\u5B9A\u3092\u4F7F\u7528",
      editorkey  : "E",
      ok         : "OK",
      cancel     : "\u30ad\u30e3\u30f3\u30bb\u30eb",
      filter     : "\u30d5\u30a3\u30eb\u30bf\u30fc",
      show       : "\u8868\u793a",
      hide       : "\u975e\u8868\u793a",
      confirm    : "'{0}' \u3092\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3057\u307e\u3059\u304b?",
      exists     : "'{0}' \u306f\u65e2\u306b\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u3059.",
      invalid    : "'{0}' \u306f\u4e0d\u6b63\u306a\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3067\u3059.",
      notChanged : "'{0}' \u306f\u5909\u66f4\u3055\u308c\u3066\u3044\u307e\u305b\u3093.",
      init       : "\u30d5\u30a3\u30eb\u30bf\u30ea\u30b9\u30c8\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u304b?",
    },

    en: {
      config     : "Config Filters",
      add        : "Add",
      edit       : "Edit",
      remove     : "Delete",
      reset      : "Reset",
      mode       : "Completely hide filtered results",
      modekey    : "H",
      editor     : "Enable filter editor",
      editorkey  : "E",
      ok         : "OK",
      cancel     : "Cancel",
      filter     : "Filter",
      show       : "Show",
      hide       : "Hide",
      confirm    : "Add '{0}' to filter?",
      exists     : "Filter '{0}' already exists.",
      invalid    : "'{0}' is invalid format.",
      notChanged : "'{0}' is not changed.",
      init       : "Are you sure you want to reset all your filters?",
    }
  };

  function _(msg) {
    return Language.getMessage.apply(Language, arguments);
  }

  function $(id) {
    return ("string" != typeof id) ? id : document.getElementById(id);
  }

  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X(exp, context) {
    if (!context) context = document;
    var resolver = function(prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    exp = exp.replace(/\blocal:has-class\(((?:[^"'()]*|"[^"]*"|'[^']*'|\(.*?\))*)\)/g, "contains(concat(' ',normalize-space(@class),' '),concat(' ',$1,' '))");
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }

  function hasClass(element, name) {
    var names = ' ' + element.className.replace(/\s+/g, ' ') + ' ';
    return 0 < names.indexOf(' ' + name + ' ');
  }

  function addClass(element, name) {
    if (!hasClass(element, name))
      element.className = (element.className + ' ' + name).replace(/^\s+|\s+$/g, '');
  }

  function removeClass(element, name) {
    var names = ' ' + element.className.replace(/\s+/g, ' ') + ' ';
    element.className = names.replace(' ' + name + ' ', ' ').replace(/^\s+|\s+$/g, '');
  }

  if (document.body) SearchFilter.init();
})();
