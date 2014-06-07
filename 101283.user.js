// ==UserScript==
// @name           bro3_deck_filter
// @namespace      http://bro3.blog90.fc2.com
// @description    print selected cards only
// @include        http://*.3gokushi.jp/card/deck.php*
// ==/UserScript==

// グローバル変数いろいろ
var status = {};
var key_pref = location.hostname + "/";

var base_url = "http://" + location.hostname + "/card/deck.php";

var num_conf = 8; // 「全て」「設定」を除くタブ数

var pager = get_element('//ul[@class="pager"]/li/a', document);
var page_length;
if (pager.snapshotLength){ // 1ページしかないときはページャ出ないらしい
  pager.snapshotItem(pager.snapshotLength - 1).href.match(/\?p=(\d+)/); // 12ページ以上ある場合に対応
  page_length = RegExp.$1;
}else{
  page_length = 1;
}

var preload = false; // 前回選択タブを記憶するか。true:記憶する、false:記憶しない

var load_end = []; // 読み込み終了判定フラグ

//// 本体ここから ////

var tab_list;
tab_list = get_element("//form[@id='deck_file']/div[@id='tab-labels']/ul", document).snapshotItem(0);

// 今ある「すべて」と3つのラベルを消しとく
while(tab_list.childElementCount){
  tab_list.removeChild(tab_list.firstChild);
}
// ついでに、「ファイル」ってのも消す。
var to_remove_element = document.getElementById('file-head');
to_remove_element.parentNode.removeChild(to_remove_element);
// 「ラベル名を設定」ってのもいらないよね。
var to_remove_element = get_element("//div[@class='navi-btns']/ul[@class='clearfix']", document).snapshotItem(0);
//alert(to_remove_element);
//to_remove_element.removeChild(to_remove_element.lastChild); // textnodeの分
//to_remove_element.removeChild(to_remove_element.lastChild); // 本当に消したい奴
to_remove_element.removeChild(to_remove_element.children[2]); // 面倒なので直指定で

// 各々のカードに今設定されているラベル名もいらないぜ。
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'dl.label-name { display: none !important;}';
style.innerHTML += ' div.cardStatusDetail { height: 205px;}';
// カードのフッター部分が汚かったのでちょっと修正。
style.innerHTML += 'div.statusDetail .right { height:150px !important;}';
head.appendChild(style);
// 現在の所持数の横にあるカード設定も。
var label_setting = get_element('//div[@class="btn-label"]', document).snapshotItem(0);
label_setting.parentNode.removeChild(label_setting);
// デッキ内のカードのラベル欄で終わり。
var label_set = get_element('//div[@class="cardColmn"]/div/dl', document);
for (var i = 0; i < label_set.snapshotLength; i++){
  label_set.snapshotItem(i).removeChild(label_set.snapshotItem(i).lastChild);
  label_set.snapshotItem(i).removeChild(label_set.snapshotItem(i).lastChild); // ラベル名
  label_set.snapshotItem(i).removeChild(label_set.snapshotItem(i).lastChild);
  label_set.snapshotItem(i).removeChild(label_set.snapshotItem(i).lastChild); // 設定されているラベル名
}

// タブ部分のスタイル作成。元のCSSが!important使いまくりできれいにならない。
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
//style.innerHTML = 'li.added_tab, li.added_tab_selected { width: 70px; margin:0 3px 0 0 !important; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px;}';
style.innerHTML = 'li.added_tab, li.added_tab_selected { width: 70px; margin:0 3px 0 0 !important; -moz-border-radius-topleft: 10px; border-top-left-radius: 10px; -moz-border-radius-topright: 10px; border-top-right-radius: 10px;}';
style.innerHTML += 'li.added_tab_selected { background-color: #ff9900;}';
style.innerHTML += 'li.added_tab { background-color: #ffbb33;}';
style.innerHTML += 'a.added_tab, a.added_tab_null { width: 70px !important; font-size: 20px !important; color: #000000 !important; line-height: 33px !important;padding: 0!important; height: 25px !important; display: block; text-decoration: none !important;}';
style.innerHTML += 'a.added_tab_null { cursor: default !important;}';

head.appendChild(style);

// タブ作成。微妙にしか違わないんだけど、ひとつに纏められないかなあ。
var link_a_element = document.createElement('a');
link_a_element.setAttribute("class", "added_tab");
link_a_element.setAttribute("title", "全て");
link_a_element.setAttribute("alt", "全て");
link_a_element.href = base_url;
link_a_element.innerHTML = "全て";
link_a_element.addEventListener('click',
  function (event){GM_setValue(key_pref + "setting", -1);}, false);

var link_li_element = document.createElement('li');
link_li_element.setAttribute("class", "added_tab_selected");
link_li_element.appendChild(link_a_element);

tab_list.appendChild(link_li_element);

for (var i = 0; i < num_conf; i++){
  var link_li_element = document.createElement('li');
  link_li_element.setAttribute("class", "added_tab");
  
  var load_data = GM_getValue(key_pref + "conf_name" + i, "");
  
  if (load_data != ""){
    var link_a_element = document.createElement('a');
    link_a_element.setAttribute("class", "added_tab");
    link_a_element.setAttribute("title", load_data); // このあたりの記述を
    link_a_element.setAttribute("alt", load_data); // エスケープしなくても
    link_a_element.href = '#';
    link_a_element.innerHTML = load_data; // うまくいくのはなぜだろう。
    
    var listener = function(i){
      link_a_element.addEventListener('click',
        function (event){redraw(event, i);}, false);
    }
    listener(i);
  }else{
    var link_a_element = document.createElement('a');
    link_a_element.setAttribute("class", "added_tab_null");
  }
  
  link_li_element.appendChild(link_a_element);
  tab_list.appendChild(link_li_element);
}

var link_a_element = document.createElement('a');
link_a_element.setAttribute("class", "added_tab");
link_a_element.setAttribute("title", "設定");
link_a_element.setAttribute("alt", "設定");
link_a_element.href = '#';
link_a_element.innerHTML = "設定";
link_a_element.addEventListener('click', configure, false);

var link_li_element = document.createElement('li');
link_li_element.setAttribute("class", "added_tab");
link_li_element.appendChild(link_a_element);

tab_list.appendChild(link_li_element);

// 前回選択していたタブを再現する。
var setting = GM_getValue(key_pref + "setting", -1);
if (setting != -1 && preload){
  var dummy_event = document.createEvent('MouseEvents');
  //dummy_event.initEvent('click', false, true); // これいらないの?
  redraw(dummy_event, setting);
}
//// 本体ここまで ////

// 設定タブクリック時の動作
function configure(event) {
  var body = document.getElementById('gray02Wrapper');
  var card_list_page;
  var card_order = [];
  
  for(var i = 1; i <= page_length; i++){
    load_end[i] = 0;
  }
  
  for(var i = 1; i <= page_length; i++){
    read_url = base_url + "?p=" + i;

    card_order[i] = new Array();
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: read_url,
      headers: { // UAがブラウザのバージョンと異なるとセッションタイムアウトになる
        //'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ja; rv:1.9.2.4) Gecko/20100611 Firefox/3.6.4 (.NET CLR 3.5.30729)',
        //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        //'Accept-Language': 'ja,en-us;q=0.7,en;q=0.3',
        //'Accept-Encoding': 'gzip,deflate',
        //'Accept-Charset': 'Shift_JIS,utf-8;q=0.7,*;q=0.7'
      },
      
      onload: function(responseDetails) {
        var div = document.createElement('div');
        div.innerHTML = responseDetails.responseText;
        target_url = responseDetails.finalUrl.replace(/^.*\?p=/, '');
        
        var all_cards;
        all_cards = get_element("*//table[@class='statusParameter1']", div);
        
        for (var j = 0; j < all_cards.snapshotLength; j++){
          var data = all_cards.snapshotItem(j);
          all_status = get_element("tbody/tr/td", data);
          
          var serial_card_no = data.parentNode.parentNode.parentNode.childNodes[7].id.replace(/^cardWindow_/, '');
          
          card_order[target_url].push(serial_card_no);
          
          var name = all_status.snapshotItem(2).textContent;
          var level = all_status.snapshotItem(4).textContent;
          var attack = all_status.snapshotItem(1).textContent;
          var intelligence = all_status.snapshotItem(3).textContent;
          
          status[serial_card_no] = 
            name + ',' + level + ',' + attack + ',' + intelligence;
        }
        //console.log("status=" + responseDetails.status);//
        //console.log("page=" + target_url);//
       load_end[target_url] = 1;
      }
    });
  }

  // xmlhttpRequestの終了判定
  timerID = setInterval( function(){
  var num = 1;
  for (var i = 1; i <= page_length; i++){
    num *= load_end[i];
  }

  if(num == 1){
      var str;
      
      var head = document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'th, td { padding:4px ! important; }';
      head.appendChild(style);
      
      str = "<h2>デッキ設定</h2>";
      str += "<form name='card_set'>";
      str += "<ul id='statMenu'><li class='last'>";
      str += "<input type='button' name='save' value='保存'></li></ul>";
      
      str += "<table class='commonTables'>";
      
      str += "<tr>";
      str += "<th class='mainTtl' nowrap>名前</th><th class='mainTtl'>Lv</th>";
      for (var i = 0; i < num_conf; i++){
        var load_data = GM_getValue(key_pref + "conf_name" + i, "");
        str += "<th class='mainTtl'>"
        str += "<input type='text' name='conf_name' value='";
        str += load_data.replace("'", "&#39;", "g");
        str += "' size=6 /></th>";
      }
      str += "</tr>";
      
      str += "<tr>";
      str += "<td class='center' colspan='2'>初期表示</td>";
      var default_set = GM_getValue(key_pref + "default_print", "");
      var is_checked = default_set.split(',');
      for (var j = 1; j <= num_conf; j++){
        str += "<td class='center'>";
        str += "<input type='checkbox' name='default_print'";
        if(is_checked[j-1] == "true"){
          str += " checked='checked'";
        }
        str += " value='conf" + j + "' /></td>";
      }
      str += "</tr>";
      
      str += "<tr>";
      var select_item = [
        "未設定", "カードNO", "レアリティ", "LV", "スコア", "コスト", "兵科", 
        "HP", "討伐", "攻撃力", "知力", 
        "歩兵防御", "槍兵防御", "弓兵防御", "騎兵防御", "移動速度"];
      for (var i = 1; i <= 3; i++){
        var selected_index1 = GM_getValue(key_pref + "sort_order" + i,   "").split(',');
        var selected_index2 = GM_getValue(key_pref + "sort_order_type" + i,       "").split(',');
        str += "<td class='center' colspan='2'>優先度" + i + "</td>";
        for (var j = 1; j <= num_conf; j++){
          str += "<td class='center'>";
          str += '<select name="sort_order' + i + '" id="sort_order_1"       class="sortGenre">';
          for (var k = 0; k <= 15; k++){
            if (selected_index1[j-1] == k){
              str += '<option value="' + k + '" selected="selected">' + select_item[k] +       '</option>';
            }else{
              str += '<option value="' + k + '">' + select_item[k] + '</option>';
            }
          }
          str += '</select>';
          str += '<select name="sort_order_type' + i;
          str += '" id="sort_order_type_1" class="sortType">';
          if (selected_index2[j-1] == 0){// 降順は"1"
            str += '<option value="0" selected="selected">昇順</option>';
            str += '<option value="1">降順</option>';
          }else{
            str += '<option value="0">昇順</option>';
            str += '<option value="1" selected="selected">降順</option>';
          }
          str += '</select>';
          str += "</td>";
        }
        str += "</tr>";
      }
      
      for (var i = 1; i < card_order.length; i++){
        var card_list = card_order[i];
        
        for (var j = 0; j < card_list.length; j++){
          var serial_card_no = card_list[j];
          var serial = "card_" + serial_card_no;
          
          var is_checked = GM_getValue(key_pref + serial, default_set).split(',');
          
          var card_status = status[serial_card_no];
          var all_status = card_status.split(',');
          
          var name = all_status[0];
          var level = all_status[1];
          var attack = all_status[2];
          var intelligence = all_status[3];
          
          str += "<tr><td class='center'>" + name + "</td><td class='center'>" + level     + "</td>";
          for (var k = 1; k <= num_conf; k++){
            str += "<td class='center'><input type='checkbox' name='" + serial + "'";
            if(is_checked[k-1] == "true"){
              str += " checked='checked'";
            }
            str += " value='conf" + k + "' /></td>";
          }
          str += "</tr>";
        }
      }
      
      str += "</table>";
      body.innerHTML = str;
      
      var target_elements = document.getElementsByName("card_set")[0].getElementsByTagName("input");
      target_elements[0].addEventListener('click', function(){save_conf(this.form);}, false);
      
      clearInterval(timerID);
      timerID = null;
    }
  },1000);

}

// 設定画面で保存した時
function save_conf (form){
  var value;
  
  var save_data = get_element('*//input[@name="conf_name"]', form);
  for ( var i = 0; i < save_data.snapshotLength; i++){
    value = save_data.snapshotItem(i).value;
    GM_setValue(key_pref + "conf_name" + i, value);
  }
  
  value = "";
  var save_data = get_element('*//input[@name="default_print"]', form);
  for ( var i = 0; i < save_data.snapshotLength; i++){
    value += save_data.snapshotItem(i).checked + ",";
  }
  GM_setValue(key_pref + "default_print", value);
  var default_print = value;
  
  for (var i = 1; i <= 3; i++){
    value = "";
    var save_data = get_element('*//select[@name="sort_order' + i + '"]', form);
    for ( var j = 0; j < save_data.snapshotLength; j++){
      value += save_data.snapshotItem(j).selectedIndex + ",";
    }
    GM_setValue(key_pref + "sort_order" + i, value);
    
    value = "";
    var save_data = get_element('*//select[@name="sort_order_type' + i + '"]', form);
    for ( var j = 0; j < save_data.snapshotLength; j++){
      value += save_data.snapshotItem(j).selectedIndex + ",";
    }
    GM_setValue(key_pref + "sort_order_type" + i, value);
  }
  
  var value_by_cards = {};
  var save_data = get_element('*//input[contains(@name, "card_")]', form);
  for ( var i = 0; i < save_data.snapshotLength; i++){
    var div = save_data.snapshotItem(i);
    var serial = div.name;
    if (value_by_cards[serial] == undefined){value_by_cards[serial] = "";}
    value_by_cards[serial] += div.checked + ",";
  }
  for (var i in value_by_cards ){
    if (typeof GM_getValue(key_pref + i) != 'undefined' || value_by_cards[i] != default_print) {
      GM_setValue(key_pref + i, value_by_cards[i]);
    }
  }
  
  alert("保存しました");
}

// 全て、設定以外のタブをクリックした時の動作
function redraw (event, target){
  event.preventDefault();
  
  GM_setValue(key_pref + "setting", target);
  
  // もともと表示されていたカードは全消し
  var card_list = document.getElementById('rotate');
  
  original_divs = get_element('div', card_list);
  for (var i = 1; i < original_divs.snapshotLength -1; i++){ // 最初と最後だけ残す
    card_list.removeChild(original_divs.snapshotItem(i));
  }
  original_divs = get_element('*//ul[@class="pager"]', card_list);
  for (var i = 0; i < original_divs.snapshotLength; i++){
    var del_div =original_divs.snapshotItem(i);
    del_div.parentNode.removeChild(del_div);
  }
  original_divs = get_element('div[@class="rotateInfo clearfix label-all-color-inner"]', card_list);
  original_divs.snapshotItem(0).style.cssText = "margin-bottom: 10px;";
  
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'div.cardStatusDetail { padding-bottom: 0px !important;}';
  head.appendChild(style);

  // セット先変更用
  var village = get_element('//li[@class="on"]', document).snapshotItem(0);
  var i = 0;
  while (village = village.previousSibling){
    if (village.nodeType == 1){
      i++;
    }
  }
  var village = i;
  
  // 並び順変更用
  var post_data = "btn_change_flg=1&show_deck_card_count=15";
  
  for (var i = 1; i <= 3; i++){
    var selected_index1 = GM_getValue(key_pref + "sort_order" + i, "").split(',');
    var selected_index2 = GM_getValue(key_pref + "sort_order_type" + i, "").split(',');
    
    post_data += '&sort_order%5B%5D=' + selected_index1[target];
    post_data += '&sort_order_type%5B%5D=' + selected_index2[target];
  }
  
//  load_end[1] == 0;
  load_end[1] = 0;
  GM_xmlhttpRequest({
    method: 'POST',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    url: location,
    data: post_data,
    onload: function(responseDetails){
      // 15枚表示に変更した後で、全ページ数を再取得
      var div = document.createElement('div');
      div.innerHTML = responseDetails.responseText;
      var pager = get_element('//ul[@class="pager"]/li/a', div);
      if (pager.snapshotLength){
        pager.snapshotItem(pager.snapshotLength - 1).href.match(/\?p=(\d+)/);
        page_length = RegExp.$1;
      }else{
        page_length = 1;
      }
      
      load_end[1] = 1;
    }
  });
  
  // POST用xmlhttpRequestの終了判定
  timerID_post = setInterval( function(){
    if(load_end[1] == 1){
      for(var i = 1; i <= page_length; i++){
        load_end[i] = 0;
      }
      
      var card_div = [];
      
      for(var i = 1; i <= page_length; i++){
        target_url = base_url + "?p=" + i;
        
        GM_xmlhttpRequest({
          method: 'GET',
          url: target_url,
          headers: {
          //    'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ja; rv:1.9.2.4) Gecko/20100611 Firefox/3.6.4 (.NET CLR 3.5.30729)',
          //    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          //    'Accept-Language': 'ja,en-us;q=0.7,en;q=0.3',
          //    'Accept-Encoding': 'gzip,deflate',
          //    'Accept-Charset': 'Shift_JIS,utf-8;q=0.7,*;q=0.7'
          },
          onload: function(responseDetails) {
            // 帰ってくるのがwell-formedでないので、DOMParser使えない。
            //var parser = new DOMParser();
            //var doc = parser.parseFromString(file_p2, "application/xml");
            
            var this_page = responseDetails.finalUrl.replace(/^.*\?p=/, "");
            
            var div = document.createElement('div');
            div.innerHTML = responseDetails.responseText;
            
            var page_all_cards;
            page_all_cards = get_element("*//div[@class='cardStatusDetail label-setting-mode']", div);
            
            var this_page_divs = [];
            
            // 必要なカードのみ取得
            for (var j = 0; j < page_all_cards.snapshotLength; j++){
              var this_div = page_all_cards.snapshotItem(j);
              var serial_card_no = this_div.childNodes[7].id.replace(/^cardWindow_/, '');
              
              var default_set = GM_getValue(key_pref + "default_print", "");
              var is_checked = GM_getValue(key_pref + "card_" + serial_card_no, default_set).split(',');
              
              if (is_checked[target] == "true"){
                // セット先をいじる
                var village_list = get_element('*//option', this_div);
                if (village_list.snapshotLength){
                  village_list.snapshotItem(village).setAttribute("selected", "selected");
                }
                
                // 破棄とかポイント振り直しの部分をいじる
                //var status_reset = get_element('*//div[contains(@class, "useCp")]', this_div);
                var status_reset = get_element('*//div[contains(@class, "itemBtn")]', this_div);
                if (! status_reset.snapshotLength){ // ステータス振ってるかどうかでhtmlの構成が変わる
                  var status_reset = get_element('*//div[contains(@class, "useCp")]', this_div);
                }
                var card_footer = status_reset.snapshotItem(0).parentNode;
                
                card_footer.removeChild(status_reset.snapshotItem(0));
                
                var sub_control = get_element('div[contains(@class, "sub-control-buttons")]', card_footer).snapshotItem(0);
                
                var images = get_element('*//img', sub_control);
                
                for (var k = 0; k < images.snapshotLength; k++){
                  var img_element = images.snapshotItem(k);
                  var img_title = img_element.title;
                  
                  if (k == images.snapshotLength - 1){
                    sub_control.appendChild(make_union_element('lvup.php', 'LVUP', 'スキルLvを上げる', serial_card_no));
                    var link_text_element = document.createTextNode("\n");
                    sub_control.appendChild(link_text_element);
                    
                    sub_control.appendChild(make_union_element('learn.php', '付与', '新しいスキルを習得する', serial_card_no));
                    var link_text_element = document.createTextNode("\n");
                    sub_control.appendChild(link_text_element);
                    
                    sub_control.appendChild(make_union_element('remove.php', '削除', 'スキルを削除する', serial_card_no));
                    var link_text_element = document.createTextNode("\n");
                    sub_control.appendChild(link_text_element);
                  }
                  
                  if (img_title.match(/破棄/)){
                    var a_element = img_element.parentNode;
                    a_element.removeChild(img_element);
                    
                    a_element.title = img_title;
                    a_element.className = "";
                    a_element.textContent = "破棄";
                    
                    var link_a_element = document.createElement('a');
                    link_a_element.setAttribute("title", "このカードを出品する");
                    link_a_element.href = "#";
                    link_a_element.innerHTML = "出品";
                    
                    var link_span_element = document.createElement('span');
                    link_span_element.appendChild(link_a_element);
                    
                    sub_control.appendChild(link_span_element);
                    var link_text_element = document.createTextNode("\n");
                    sub_control.appendChild(link_text_element);
                  }
                  
                  if (img_title.match(/保護する/)){
                    var a_element = img_element.parentNode;
                    a_element.removeChild(img_element);
                    
                    a_element.title = img_title;
                    a_element.className = "";
                    a_element.textContent = "保護";
                    
                    sub_control.appendChild(a_element);
                  }
                  
                  if (img_title.match(/解除/)){
                    var a_element = img_element.parentNode;
                    a_element.removeChild(img_element);
                    
                    a_element.title = img_title;
                    a_element.className = "";
                    a_element.textContent = "保護解除";
                    
                    sub_control.appendChild(a_element);
                  }
                }
                
                this_page_divs.push(this_div);
              }
            }
            
            card_div[this_page] = this_page_divs;
            load_end[this_page] = 1;
          }
        });
      }
      
      // カードデータ取得用xmlhttpRequestの終了判定
      timerID = setInterval( function(){
        var num = 1;
        for (var i = 1; i <= page_length; i++){
          num *= load_end[i];
        }
        if(num == 1){
          // 選択されているタブを変更する
          var selected = get_element('//li[@class="added_tab_selected"]', document);
          for (var i = 0; i < selected.snapshotLength; i++){
            selected.snapshotItem(i).className = "added_tab";
          }
          var selected = get_element('//li[@class="added_tab"]', document);
          selected.snapshotItem(target + 1).className = "added_tab_selected";
          
          for(var i = 1; i <= page_length; i++){
            var this_page_divs = card_div[i];
            
            for (var j = 0; j < this_page_divs.length; j++){
              var this_div = this_page_divs[j];
              
              // リスナー追加はここじゃないと消えてしまう
              var serial_card_no = this_div.childNodes[7].id.replace(/^cardWindow_/, '');
              var trade_a_element = get_element('*//a[text()="出品"]', this_div).snapshotItem(0);
              if (trade_a_element){
                var listener = function(k){
                  trade_a_element.addEventListener('click',
                  function (event){trade(event, k);}, false);
                }
                listener(serial_card_no);
              }
              
              // カード拡大用のリスナーもついでに
              var clickable = get_element('*//a[@class="thickbox"]', this_div).snapshotItem(0);
              var large_image = get_element('*//div[@class="cardWrapper2col"]', this_div).snapshotItem(0);
              var listener = function(k){
                clickable.addEventListener('click',
                function (event){print_large_image(event, k);}, false);
              }
              listener(large_image);
              
              card_list.insertBefore(this_div,
                card_list.childNodes[card_list.childNodes.length-2]);
            }
          }
          
          clearInterval(timerID);
          timerID = null;
          }
        },500);
      
      clearInterval(timerID_post);
      timerID_post = null;
    }
  },500);
}

function print_large_image (event, image){
  event.preventDefault();
  
  var div_element;
  div_element = document.createElement('div');
  div_element.id = "TB_overlay";
  div_element.className = "TB_overlayBG";
  
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(div_element);
  
  div_element = document.createElement('div');
  div_element.id = "TB_window";
  div_element.style.cssText =
  "margin-left: -265px; width: 530px; margin-top: -190px; display: block;";
  
  var div_child1 = document.createElement('div');
  div_child1.id = "TB_title";
  
  var div_child1_child1 = document.createElement('div');
  div_child1_child1.id = "TB_ajaxWindowTitle";
  
  var div_child1_child2 = document.createElement('div');
  div_child1_child2.id  = "TB_closeAjaxWindow";
  
  var a_element = document.createElement('a');
  a_element.id  = "TB_closeWindowButton";
  a_element.href = "#";
  a_element.textContent = "close"
  
  var text_node = document.createTextNode(' or Esc Key');
  
  div_child1_child2.appendChild(a_element);
  div_child1_child2.appendChild(text_node);
  
  div_child1.appendChild(div_child1_child1);
  div_child1.appendChild(div_child1_child2);
  
  var div_child2 = document.createElement('div');
  div_child2.id = "TB_ajaxContent";
  div_child2.style.cssText = "width: 500px; height: 335px;";
  
  div_child2.appendChild(image);
  
  div_element.appendChild(div_child1);
  div_element.appendChild(div_child2);
  
  body.appendChild(div_element);
  
  // 以下、元の画面に戻る用
  var to_erase;
  
  to_erase = document.getElementById('TB_overlay');
  
  to_erase.addEventListener('click',
  function (event){erase_large_image(event);}, false);
  
  to_erase = document.getElementById('TB_closeWindowButton');
  
  to_erase.addEventListener('click',
  function (event){erase_large_image(event);}, false);
  
  document.addEventListener('keydown',
  function (event){
    if (event.keyCode == 27){
      erase_large_image(event);
      document.removeEventListener('keydown', arguments.callee, false);
    }
  }, false);
  // キー押下周りは良くわからない。判明しているだけでも、
  // ・Enterキーを押すと、オーバーレイが暗くなり、何にも反応しなくなる
  // ・拡大画面を出したり消したりを繰り返しているとエラーが出るようになる
  // という不具合がある。他にもまだまだありそう。
}

function erase_large_image (event){
  event.preventDefault();
  
  var target;
  
  target = document.getElementById('TB_overlay');
  target.parentNode.removeChild(target);
  
  target = document.getElementById('TB_window');
  target.parentNode.removeChild(target);
}

function make_union_element (program, anchor, message, serial){
  var link_a_element = document.createElement('a');
  link_a_element.setAttribute("title", message);
  link_a_element.href = 'http://' + location.hostname + '/union/' + program + '?cid=' + serial;
  link_a_element.innerHTML = anchor;
  
  var link_span_element = document.createElement('span');
  link_span_element.appendChild(link_a_element);
  
  return link_span_element;
}

function trade (event, serial){
  event.preventDefault();
  
  var trade_form = document.createElement('form');
  trade_form.setAttribute('action', 'http://' + location.host + '/card/exhibit_confirm.php');
  trade_form.setAttribute('method', 'POST');
  
  var hidden_input = document.createElement('input');
  hidden_input.setAttribute('type', 'hidden');
  hidden_input.setAttribute('name', 'exhibit_cid');
  hidden_input.setAttribute('value', serial);
  trade_form.appendChild(hidden_input);
  
  document.body.appendChild(trade_form);
  trade_form.submit();
}

function get_element (xpath, element){
  return document.evaluate(xpath, element, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
