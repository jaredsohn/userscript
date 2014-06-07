// ==UserScript==
// @name           hatebu chart
// @namespace      http://jugyo.org/
// @description    hatebu chart
// @include        http://*
// ==/UserScript==
//
// version: 1.2
//

(function() {
  var RANGE = 30;

  if (self.location.href != top.location.href) {
    return;
  }

  function main() {
    var element = c("div");
    with (element) {
      id = "hatebu_chart_content";
      init_style(style);
      with (style) {
        zIndex = 300;
        position = "fixed";
        bottom = "40px";
        right = "0px";
        overflow = "auto";
        MozOpacity = 0.60;
        minHeight = "16px";
        minWidth = "16px";
        maxHeight = "400px";
        padding = "2px";
      }
      addEventListener("mouseover", show_hatebu_chart, false);
      addEventListener("mouseout", hide_hatebu_chart, false);
    }
    var status_element = c("div");
    with(status_element) {
      id = "hatebu_chart_status";
      init_style(style);
      style.textAlign = "right";
    }
    element.appendChild(status_element);
    document.body.appendChild(element);
  }

  function show_hatebu_chart() {
    var hatebu_chart_elem = e("hatebu_chart");
    if (hatebu_chart_elem == null) {
      u("hatebu_chart_status", "loading...");
      var hatebu_chart_elem = c("div");
      with (hatebu_chart_elem) {
        id = "hatebu_chart";
        init_style(style);
        with (style) { display = "none"; }
      }
      e("hatebu_chart_content").appendChild(hatebu_chart_elem);
      get_hatebu_chart();
    } else {
      hatebu_chart_elem.style.display = "block";
    }
  }

  function hide_hatebu_chart() {
    var hatebu_chart_elem = e("hatebu_chart");
    if (hatebu_chart_elem) {
      hatebu_chart_elem.style.display = "none";
    }
  }

  function get_hatebu_chart() {
    var url = 'http://b.hatena.ne.jp/entry/json/?url=' + escape(top.location.href) + '&callback=get_hatebu_chart_json_callback';
    GM_xmlhttpRequest({
        method : "GET",
        url : url,
        onload : function (req) {
            eval(req.responseText);
        },
      });
  }

  function get_hatebu_chart_json_callback(item) {

    e("hatebu_chart_content").style.MozOpacity = 0.90;

    u("hatebu_chart_status", "");

    hatebu_chart_elem = e("hatebu_chart");
    
    var chart = c('div');
    with (chart) {
      init_style(style);
    }
    var img_tag = create_chart_img_tag(item);
    chart.appendChild(img_tag);
    
    hatebu_chart_elem.appendChild(chart);
    show_hatebu_chart();
  }
  
  function format_timestamp(timestamp) {
    return timestamp.split(" ")[0].replace(/\//g, "");
  }
  
  function init_style(style) {
    with(style) {
      fontSize = "11px";
      textAlign = "left";
      padding = 0;
      margin = 0;
      lineHeight = "15px";
      color = "white";
      backgroundColor = "#1841CE";
      border = "none";
    }
  }
  
  function c(tag_name) {
    return document.createElement(tag_name);
  }
  
  function u(id, text) {
    e(id).innerHTML = text;
  }
  
  function e(id) {
    return document.getElementById(id);
  }
  
  function increment_date(date_str, inc_count) {
    var array = date_str.split("/");
    var date = new Date(array[0], array[1] - 1, array[2]);
    var day = date.getDate();
    date.setDate(day + inc_count);
    return date_to_str(date);
  }

  function date_to_str(date) {
    var year = date.getFullYear().toString();
    var month = date.getMonth();
    month = month == 0 ? 1 : month + 1;
    var day = date.getDate();
    return year + "/" + pad_left_2(month) + "/" + pad_left_2(day);
  }

  function pad_left_2(i) {
    return i < 10 ? "0" + i.toString() : i.toString();
  }

  function create_date_table(obj) {
    if (obj == null) {
      return {};
    }
    var bookmarks = obj.bookmarks;
    var table = {};
    for (var n = 0; n < bookmarks.length; n++) {
      var bookmark = bookmarks[n];
      var date = bookmark.timestamp.split(" ")[0];
      
      if (table[date] == undefined) {
        table[date] = 0;
      }
      table[date] += 1;
    }
    return table;
  }

  function create_chart_img_tag(obj) {

    var table = create_date_table(obj);
    var dates = [];
    for (date in table) {
      dates.push(date);
    }
    dates.sort();

    var chart_labels = [];
    var chart_datas = [];

    var max = 0;
    
    var current_date = increment_date(date_to_str(new Date()), - (RANGE - 1));
    
    for (var i = 0; i < RANGE; i++) {
      
      if (i % 2 == 0) {
        chart_labels.push(format_date_for_label(current_date));
      } else {
        chart_labels.push("");
      }
      
      chart_data = table[current_date] == undefined ? 0 : table[current_date];
      max = max > chart_data ? max : chart_data;
      chart_datas.push(chart_data);
      current_date = increment_date(current_date, 1)
    }
    
    for (var i = 0; i < chart_datas.length; i++) {
      chart_datas[i] = chart_datas[i] / max * 100;
    }

    return create_hatebu_chart_img_elem(chart_datas, chart_labels, max);
  }
  
  function format_date_for_label(date_str) {
    var array = date_str.split("/");
    return array[1] + "/" + array[2];
  }
  
  function create_hatebu_chart_img_elem(chart_datas, chart_labels, max) {
    
    var src = "";
    src += 'http://chart.apis.google.com/chart?';
    src += 'chs=540x100';
    src += '&chd=s:helloWorld';
    src += '&cht=lc';
    src += '&chco=4769D7';
    src += '&chxt=x,y';
    src += '&chd=t:' + chart_datas.join(",");
    src += '&chxl=0:|' + chart_labels.join("|") + '|1:||' + max;

    var img_elem = c('img');
    init_style(img_elem.style);
    img_elem.setAttribute("src", src);
    img_elem.setAttribute("alt", "hatebu chart");

    return img_elem;
  }

  main();
  
})();
