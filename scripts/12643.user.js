// ==UserScript==
// @name           Google Search Filter
// @description    Selected web-sites aren't displayed from Google search result.
// @version        2.2.6
// @author         Shinya
// @namespace      http://www.code-404.net/
// @homepage       http://userscripts.org/scripts/show/12643
// @include        http://www.google.*/search*
// @Note           
// ==/UserScript==

/* == The Original Script Copyright =========
 * Written by leva.
 * http://note.openvista.jp/212/
 * 
 * Released under the CCL by-nc-na ja license.
 * http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
/* ======================================= */

// Therefore, the license of this script is under the CCL by-nc-na ja license, too.


(function(){
  var SearchFilter = {
    // == Config ==================
    
    // Default blocked sites
    // CAUTION: Script DO NOT use this list if you used "Filters Editor".
    filters: [
      "del.icio.us",
      "buzzurl.jp",
      "(a|b|r|mgw).hatena.ne.jp",
      "1470.net",
      "pookmark.jp",
      "bookmarks.yahoo.co.jp",
      "clip.(nifty|livedoor).com",
      "(esearch|tag|pt.afl).rakuten.co.jp",
      "psearch.yahoo.co.jp"
    ],
    
    // Default blocked hidden mode
    hidden: false,
    
    // Font color(CSS's value)
    fontColor: "#999",
    
    // Font size(CSS's value)
    characterSize: "90%",
    
    // Use "Filters Editor"
    useEditor: true,
    
    // == Config end ==============
    
    
    list: [],
    
    init: function(){
      Language.init();
      
      SearchFilter.hidden = GM_getValue("mode", SearchFilter.hidden);
      SearchFilter.list = eval(GM_getValue("filter")) || SearchFilter.filters.sort();
      
      if(SearchFilter.useEditor) EditFilter.init();
      
      SearchFilter.doFiltering($X("//div[@class='g']"));
      addFilter(function(elm){
        for(var i = 0, l = elm.length; i < l; i++){
          if(elm[i].firstChild.className != "g") continue;
          SearchFilter.doFiltering($X(".//div[@class='g']", elm[i]));
          break;
        }
      });
    },
    
    doFiltering: function(results){
      for(var i = 0, l = results.length; i < l; i++){
        var anchor = $X(".//a[@class='l']", results[i])[0];
        if(SearchFilter.useEditor) EditFilter.createLink(results[i], anchor);
        for(var j = 0, b = SearchFilter.list.length; j < b; j++){
          var regexp = SearchFilter.createRegExp(SearchFilter.list[j]);
          if(anchor.href.match(regexp) != null){
            if(SearchFilter.hidden){
              results[i].style.display = "none";
            }
            else{
              anchor.style.color = SearchFilter.fontColor; // for other scripts
              var headline = $X("./h2[@class='r']", results[i])[0];
              headline.style.color = SearchFilter.fontColor;
              headline.style.fontSize = SearchFilter.characterSize;
              $X("./table[last()]", results[i])[0].style.display = "none";
            }
          }
        }
      }
    },
    
    createRegExp: function(filter){
      return new RegExp("^https?:\/\/" + filter.replace(/\./g, "\.") + "\/", "i");
    },
  }
  
  var EditFilter = {
    list: [],
    filter: "",
    timer: null,
    
    init: function(){
      EditFilter.list = eval(SearchFilter.list.toSource());
      
      var place = document.getElementById("ap");
      place.parentNode.style.position = "relative";
      place.appendChild(document.createElement("br"));
      place.innerHTML += "&nbsp;&nbsp;";
      
      var link = document.createElement("a");
      link.setAttribute("href", "#");
      link.appendChild(document.createTextNode(Language[Language.lang].config));
      link.addEventListener("click", EditFilter.toggleDisplayList, false);
      place.appendChild(link);
      
      var field = document.createElement("div");
      field.id = "google-search-filter";
      field.style.position = "absolute";
      field.style.top = place.parentNode.offsetTop + place.parentNode.offsetHeight + 10;
      field.style.right = "8px";
      field.style.width = place.parentNode.offsetWidth - 26;
      field.style.maxWidth = place.parentNode.offsetWidth - 26;
      field.style.minWidth = "250";
      field.style.padding = "8px";
      field.style.border = "1px solid #000";
      field.style.backgroundColor = "#eee";
      field.style.display = "none";
      
      var input = document.createElement("input");
      input.id = "filter-edit-area";
      input.setAttribute("name", "filter-edit-area");
      input.setAttribute("type", "text");
      input.addEventListener("focus", EditFilter.setTimer, false);
      input.addEventListener("blur", EditFilter.clearTimer, false);
      input.style.width = Math.abs(place.parentNode.offsetWidth * 2 / 3);
      input.style.minWidth = "150px";
      input.style.fontFamily = "'Lucida Console', 'Courier New', Courier, Monaco, monospace";
      input.style.fontSize = "80%";
      field.appendChild(input);
      field.appendChild(document.createElement("br"));
      
      var select = document.createElement("select");
      select.id = "filter-list";
      select.setAttribute("name", "filter-list");
      select.setAttribute("size", 7);
      select.addEventListener("change", EditFilter.selectFilter, false);
      select.style.width = Math.abs(place.parentNode.offsetWidth * 2 / 3);
      select.style.minWidth = "150px";
      select.style.cssFloat = "left";
      
      var option = document.createElement("option");
      select.appendChild(option);
      EditFilter.list.forEach(function(value){
        option = document.createElement("option");
        option.appendChild(document.createTextNode(value));
        select.appendChild(option);
      });
      
      field.appendChild(select);
      
      ["add", "edit", "remove", "reset"].forEach(function(value){
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        if(value != "reset"){
          button.setAttribute("disabled", "disabled");
        }
        button.addEventListener("click", EditFilter[value + "Filter"], false);
        button.style.width = "60px";
        button.style.marginLeft = "8px";
        button.style.marginBottom = "4px";
        field.appendChild(button);
        field.appendChild(document.createElement("br"));
      });
      
      var mode = document.createElement("label");
      mode.style.clear = "left";
      mode.style.cssFloat = "left";
      mode.style.fontSize = "90%";
      var check = document.createElement("input");
      check.id = "filter-mode";
      check.setAttribute("name", "filter-mode");
      check.setAttribute("type", "checkbox");
      if(SearchFilter.hidden) check.setAttribute("checked", "checked");
      mode.appendChild(check);
      mode.appendChild(document.createTextNode(" " + Language[Language.lang].mode));
      field.appendChild(mode);
      
      var p = document.createElement("p");
      p.style.clear = "left";
      p.style.margin = "0";
      p.style.paddingTop = "8px";
      p.style.borderTop = "1px solid #ccc";
      p.style.textAlign = "right";
      ["ok", "cancel"].forEach(function(value){
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        button.addEventListener("click", EditFilter[value + "Editing"], false);
        button.style.width = "75px";
        button.style.height = "27px";
        p.appendChild(button);
        p.appendChild(document.createTextNode(" "));
      });
      field.appendChild(p);
      
      place.parentNode.appendChild(field);
    },
    
    createLink: function(result, anchor){
      var span = document.createElement("span");
      span.className = "bl";
      var link = document.createElement("a");
      link.className = "fl2";
      link.setAttribute("href", "#" + anchor.host);
      link.appendChild(document.createTextNode(Language[Language.lang].block));
      link.addEventListener("click", EditFilter.addFromLink, false);
      span.appendChild(document.createTextNode(" - "));
      span.appendChild(link);
      var position = $X(".//td/div/nobr", result)[0] || $X(".//td/font[boolean(span[@class='a'])]", result)[0];
      position.appendChild(span);
    },
    
    addFromLink: function(event){
      var filter = event.target.href.match(/#([\w.-]+)$/)[1];
      if(confirm(Language[Language.lang].addPrefix + filter + Language[Language.lang].addSuffix)){
        EditFilter.addList(filter);
        event.target.removeEventListener("click", EditFilter.addFromLink, false);
        event.target.addEventListener("click", function(event){
          alert(Language[Language.lang].addedPrefix + filter + Language[Language.lang].addedSuffix);
        }, false);
        event.target.replaceChild(document.createTextNode(
          Language[Language.lang].blocked
        ), event.target.firstChild);
      }
      event.preventDefault();
    },
    
    addList: function(filter){
      if(EditFilter.isFilterAdded(filter) == null) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList();
      SearchFilter.list = eval(EditFilter.list.toSource());
      GM_setValue("filter", SearchFilter.list.toSource());
    },
    
    addFilter: function(event){
      var filter = EditFilter.filter = EditFilter.getEditedFilter();
      if(EditFilter.isFilterAdded(filter) == null) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList(filter);
      EditFilter.resetEnableButton();
    },
    
    isFilterAdded: function(filter){
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
//        var regexp = SearchFilter.createRegExp(EditFilter.list[i]);
//        if(("http://" + filter + "/").match(regexp) != null){
        if(filter == EditFilter.list[i]){
          alert(Language[Language.lang].addedPrefix + filter + Language[Language.lang].addedSuffix);
          return null;
        }
      }
      return 1;
    },
    
    editFilter: function(event){
      var filter = EditFilter.getEditedFilter();
      if(EditFilter.filter == filter){
        alert("'" + filter + "' " + Language[Language.lang].notEdited);
        return;
      }
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
        if(EditFilter.filter == EditFilter.list[i]){
          EditFilter.list[i] = filter;
          break;
        }
      }
      EditFilter.filter = filter;
      EditFilter.updateFilterList(filter);
      EditFilter.resetEnableButton();
    },
    
    removeFilter: function(event){
      var filter = EditFilter.getEditedFilter();
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
        if(filter == EditFilter.list[i]){
          EditFilter.list.splice(i, 1);
          EditFilter.updateFilterList();
          EditFilter.filter = document.getElementById("filter-edit-area").value = "";
          event.target.setAttribute("disabled", "disabled");
          return;
        }
      }
      alert("'" + filter + "' " + Language[Language.lang].notFound);
    },
    
    getEditedFilter: function(){
      return document.getElementById("filter-edit-area").value;
    },
    
    resetFilter: function(event){
      if(confirm(Language[Language.lang].init)){
        EditFilter.list = SearchFilter.filters.sort()
        SearchFilter.list = eval(EditFilter.list.toSource());
        EditFilter.updateFilterList();
        EditFilter.filter = document.getElementById("filter-edit-area").value = "";
      }
    },
    
    okEditing: function(event){
      SearchFilter.list = eval(EditFilter.list.toSource());
      GM_setValue("filter", SearchFilter.list.toSource());
      GM_setValue("mode", document.getElementById("filter-mode").checked);
      EditFilter.toggleDisplayList(event);
    },
    
    cancelEditing: function(event){
      EditFilter.list = eval(SearchFilter.list.toSource());
      EditFilter.updateFilterList();
      EditFilter.toggleDisplayList(event);
    },
    
    updateFilterList: function(filter){
      EditFilter.list.sort();
      var list = document.getElementById("filter-list");
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      var option = document.createElement("option");
      list.appendChild(option);
      EditFilter.list.forEach(function(value){
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(value));
        list.appendChild(option);
      });
      if(filter){
        for(var i = 0, l = list.childNodes.length; i < l; i++){
          if(filter == list.childNodes[i].value){
            list.childNodes[i].selected = true;
            return;
          }
        }
      }
    },
    
    selectFilter: function(event){
      EditFilter.filter = document.getElementById("filter-edit-area").value = event.target.value;
      EditFilter.resetEnableButton();
      if(event.target.value == "")
        document.getElementById("filter-remove").setAttribute("disabled", "disabled");
    },
    
    setTimer: function(event){
      EditFilter.timer = setInterval(EditFilter.checkValue, 250);
    },
    
    clearTimer: function(event){
      clearInterval(EditFilter.timer);
      EditFilter.timer = null;
    },
    
    checkValue: function(){
      var add = document.getElementById("filter-add");
      var edit = document.getElementById("filter-edit");
      var filter = document.getElementById("filter-edit-area").value;
      if(filter == ""){
        [add, edit].forEach(function(button){
          button.setAttribute("disabled", "disabled");
        });
      }
      else if(EditFilter.filter == "" && filter != ""){
        add.removeAttribute("disabled");
      }
      else if(filter != EditFilter.filter){
        [add, edit].forEach(function(button){
          button.removeAttribute("disabled");
        });
      }
      else{
        [add, edit].forEach(function(button){
          if(!button.hasAttribute("disabled")) button.setAttribute("disabled", "disabled");
        });
      }
    },
    
    resetEnableButton: function(){
      ["add", "edit"].forEach(function(value){
        var button = document.getElementById("filter-" + value);
        if(!button.hasAttribute("disabled")){
          button.setAttribute("disabled", "disabled");
        }
      });
      button = document.getElementById("filter-remove");
      if(button.hasAttribute("disabled")){
        button.removeAttribute("disabled");
      }
    },
    
    toggleDisplayList: function(event){
      var list = document.getElementById("google-search-filter");
      list.style.display = list.style.display == "none" ? "block" : "none";
      event.preventDefault();
    },
  }
  
  var Language = {
    lang: "en",
    
    init: function(){
      var lang = navigator.language.substring(0,2);
      Language.lang = Language[lang] ? lang : "en";
    },
    
    ja: {
      config     : "\u30d5\u30a3\u30eb\u30bf\u8a2d\u5b9a",
      add        : "\u8ffd\u52a0",
      edit       : "\u7de8\u96c6",
      remove     : "\u524a\u9664",
      reset      : "\u521d\u671f\u5024",
      mode       : "\u30d5\u30a3\u30eb\u30bf\u306b\u30de\u30c3\u30c1\u3057\u305f\u7d50\u679c\u3092\u975e\u8868\u793a",
      ok         : "OK",
      cancel     : "\u30ad\u30e3\u30f3\u30bb\u30eb",
      block      : "\u30d6\u30ed\u30c3\u30af",
      blocked    : "\u30d6\u30ed\u30c3\u30af\u6e08!",
      addPrefix  : "'",
      addSuffix  : "' \u3092\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3057\u307e\u3059\u304b?",
      addedPrefix: "'",
      addedSuffix: "' \u306f\u65e2\u306b\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
      notEdited  : "\u306f\u7de8\u96c6\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002",
      notFound   : "\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002",
      init       : "\u30d5\u30a3\u30eb\u30bf\u30ea\u30b9\u30c8\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u304b\uff1f",
    },
    
    en: {
      config     : "Config Filters",
      add        : "Add",
      edit       : "Edit",
      remove     : "Delete",
      reset      : "Reset",
      mode       : "Hide the filter matched result",
      ok         : "OK",
      cancel     : "Cancel",
      block      : "Block",
      blocked    : "Blocked!",
      addPrefix  : "Add '",
      addSuffix  : "' to filter?",
      addedPrefix: "Added '",
      addedSuffix: "' to filter already.",
      notEdited  : "isn't edited.",
      notFound   : "isn't found.",
      init       : "Do you initialize the list of filters?",
    },
  }
  
  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X (exp, context) {
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch(result.resultType){
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for(var i = 0, len = result.snapshotLength; i < len ; i++){
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }
  
  // For Autopagerize 0.0.12
  function addFilter(filter, i) {
    i = i || 4;
    if(window.AutoPagerize && window.AutoPagerize.addFilter){
      window.AutoPagerize.addFilter(filter);
    }
    else if(i > 1){
      setTimeout(arguments.callee, 1000, filter, i - 1);
    }
  }
  
  if(document.body) SearchFilter.init();
})();
