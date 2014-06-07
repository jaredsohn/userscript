// ==UserScript==
// @name           TopHatenar View
// @namespace      http://d.hatena.ne.jp/yuroyoro/
// @description    show TopHatenar chart
// @include        http://d.hatena.ne.jp/*
// ==/UserScript==
//
//

(function() {

  var already_got_chart = false;

  if (self.location.href != top.location.href) {
    return;
  }

  GM_addStyle(<><![CDATA[
    div#TopHatenar_view{
      z-index: 250;
      position: fixed;
      bottom: 71px;
      left: 0px;
      overflow: hidden;
      opacity: 0.85;
      min-height: 20px;
      min-width: 20px;
      max-height: 400px;
      padding: 2px;
      -moz-border-radius: 0 8px 8px 0;
      font-family: Helvetica, Verdana, sans-serif;
    }
    div#TopHatenar_view table.TopHatenar_view_table{
      color: #CCCCCC;
      font-size: 12px;
      font-weight: bold;
      border: none;
      padding: 5px 10px;
      margin: 10px 10px 10px 10px;
      background-color: #333333;
      border-collapse: collapse;
    }
    div#TopHatenar_view table.TopHatenar_view_table td{
      padding: 0px 15px;
      background-color: #333333;
      white-space: nowrap;
      border: 1px solid #CCCCCC;
    }
    div#TopHatenar_view table.TopHatenar_view_table a{
      color: #CCCCCC;
      text-decoration: none;
    }
    div#TopHatenar_view span.TopHatenar_view_count{
      color: #6699ff;
      font-size: 14px
    }
    div#TopHatenar_view span.TopHatenar_view_rank{
      color: #ff6633;
      font-size: 14px
    }
    div#TopHatenar_view span.TopHatenar_view_percentile{
      color: #00cc99;
      font-size: 14px
    }
  ]]></>);


  function main() {

    var element = document.createElement('div');
    with (element) {
      id = 'TopHatenar_view';
      init_style(style);
      addEventListener('mouseover', show_TopHatenar_view, false);
      addEventListener('mouseout', hide_TopHatenar_view, false);
    }
    var logo = document.createElement('div');
    with (logo) {
      id = 'TopHatenar_view_logo';
      innerHTML = "T?";
      with (style) {
        margin = '0';
        padding = '2';
        fontSize = '16px';
        textAlign = 'center';
        color = '#FF6347';
        fontWeight = 'bold';
      }
    }
    element.appendChild(logo);

    var content = document.createElement('div');
    with (content) {
      id = 'TopHatenar_view_content';
      init_style(style);
      with (style) {
        display = 'none';
        margin = '7px 4px 4px 4px';
        width = '540px';

      }
    }
    element.appendChild(content);

    document.body.appendChild(element);
  }

  function show_TopHatenar_view() {

      if (!already_got_chart) {
        get_TopHatenar_chart();
      }

      var TopHatenar_view_logo = document.getElementById('TopHatenar_view_logo');
      TopHatenar_view_logo.style.display = 'none';

      var TopHatenar_view_elem = document.getElementById('TopHatenar_view_content');
      TopHatenar_view_elem.style.display = 'block';
  }

  function hide_TopHatenar_view() {
    var TopHatenar_view_elem = document.getElementById('TopHatenar_view_content');
    if (TopHatenar_view_elem) {
      TopHatenar_view_elem.style.display = 'none';
      var TopHatenar_view_logo = document.getElementById('TopHatenar_view_logo');
      TopHatenar_view_logo.style.display = 'block';
    }
  }

  function get_TopHatenar_chart() {

    var content = document.getElementById('TopHatenar_view_content');

    // HatenaIDを切り出す
    var m = /^http:\/\/d\.hatena\.ne\.jp\/([a-zA-Z][\w-]{1,30}[a-zA-Z\d])/.exec(top.location.href);
    var hatena_id = m[1];

    var detail_url = 'http://tophatenar.com/view/' + hatena_id;  // 詳細ページURL

    // ID Link
    var id_link = document.createElement('a');
    with (id_link) {
      innerHTML = 'TopHatenar@' + hatena_id;
      setAttribute('href', detail_url);
      setAttribute('title', 'クリックで詳細情報ページへ');
      with (style) {
        fontSize = '20px';
        textAlign = 'center';
        color = '#FF6347';
        fontWeight = 'bold';
        margin = '5px';
        textDecoration = 'none';
      }
    }
    content.appendChild(id_link);

    // Ranking情報表示用
    var id_info = document.createElement('div');
    content.appendChild(id_info);

    // グラフを取得
    var correlation_chart = document.createElement('img');
    with (correlation_chart) {
      src = 'http://tophatenar.com/chart/correlation_small/' + hatena_id;
      title = "相関グラフ";
      init_img_style(style);
    }
    var correlation_chart_title = document.createElement('div');
    correlation_chart_title.style.cssFloat = 'left';
    correlation_chart_title.style.textAlign = 'center';
    correlation_chart_title.appendChild(correlation_chart);
    content.appendChild(correlation_chart_title);
    correlation_chart_title.innerHTML += "<p>&lt;相関グラフ&gt;</p>";

    var subscriber_chart = document.createElement('img');
    with (subscriber_chart) {
      src = 'http://tophatenar.com/chart/subscriber_small/' + hatena_id;
      title = "購読者数の推移";
      init_img_style(style);
    }
    var subscriber_chart_title = document.createElement('div');
    subscriber_chart_title.style.cssFloat = 'left';
    subscriber_chart_title.style.textAlign = 'center';
    subscriber_chart_title.appendChild(subscriber_chart);
    subscriber_chart_title.innerHTML += "<p>&lt;購読者数の推移&gt;</p>";
    content.appendChild(subscriber_chart_title);

    var bookmark_chart = document.createElement('img');
    with (bookmark_chart) {
      src = 'http://tophatenar.com/chart/bookmark_small/' + hatena_id;
      title = "ブックマーク数の推移";
      init_img_style(style);
    }
    var bookmark_chart_title = document.createElement('div');
    bookmark_chart_title.style.cssFloat = 'left';
    bookmark_chart_title.style.textAlign = 'center';
    bookmark_chart_title.appendChild(bookmark_chart);
    content.appendChild(bookmark_chart_title);
    bookmark_chart_title.innerHTML += "<p>&lt;ブックマーク数の推移&gt;</p>";

    // 詳細ページから情報取得
    GM_xmlhttpRequest({
        method : 'GET',
        url : detail_url,
        onload : function(res) {
             var html = res.responseText;
             var numbers = getTags(html, "div", "number");
             var ranks = getTags(html, "div", "rank");
             var percentiles = getTags(html, "div", "percentile");

             var subscriber_cnt        = numbers[1].match(/\d+/gm);
             var subscriber_rank       = ranks[0].match(/\d+/gm);
             var subscriber_percentile = percentiles[0].match(/[\d.]+/gm);

             var bookmark_cnt          = numbers[2].match(/\d+\s+/gm);
             var bookmark_rank         = ranks[1].match(/\d+/gm);
             var bookmark_percentile   = percentiles[1].match(/[\d.]+/gm);

             var inner = "<table class='TopHatenar_view_table'><tbody><tr>";
             inner += "<td>購読者数 : <span class='TopHatenar_view_count'>" + subscriber_cnt + "</span></td>";
             inner += "<td><span class='TopHatenar_view_rank'>" + subscriber_rank[0] + "</span>位/" + subscriber_rank[1] + "人";
             inner += "<a href='/ranking/subscriber/" + subscriber_rank[0] + "'>[周辺ランキング]</a></td>";
             inner += "<td>(上位<span class='TopHatenar_view_percentile'>" +subscriber_percentile + "</span>％以内) </td>";
             inner += "</tr><tr>";
             inner += "<td>ブックマーク数 : <span class='TopHatenar_view_count'>" + bookmark_cnt + "</span></td>";
             inner += "<td><span class='TopHatenar_view_rank'>" + bookmark_rank[0] + "</span>位/" + bookmark_rank[1] + "人";
             inner += "<a href='/ranking/subscriber/" + bookmark_rank[0] + "'>[周辺ランキング]</a></td>";
             inner += "<td>(上位<span class='TopHatenar_view_percentile'>" +bookmark_percentile + "</span>％以内) </td>";
             inner += "</tr></tbody></table>"

             id_info.innerHTML += inner;
        }
      });


    already_got_chart = true;


  }


  function init_style(style) {
    with (style) {
      fontSize = '12px';
      textAlign = 'left';
      padding = 0;
      margin = 0;
      lineHeight = '15px';
      color = '#CCCCCC';
      backgroundColor = '#333333';
      border = 'none';
    }
  }

  function init_img_style(style) {
    with (style) {
      border = '1px solid #CCCCCC';
      margin = '5px';
      position = 'relative';
      textAlign = 'center';
    }
  }

  function getTags(html, tagName, className) {
    var cls = "";
    if (className) {
      cls = "(?:\\s[^>]*?)?\\sclass\\s*=\\s*([\"'])(?:(?:\\\\\\1|(?!\\1).)+?\\s+)?" + className + "(?:\\s+(?:\\\\\\1|(?!\\1).)+?)?\\1";
    }
    var reg = new RegExp("<" + tagName + cls + "(?:\\s[^>]*)?>(?:(?!<" + tagName + "\\b)[\\s\\S])*?</" + tagName + "\\s*>", "ig");
    return html.match(reg);
  }

  main();

})();
