// ==UserScript==
// @name           bro3_tweak
// @namespace      http://bro3.blog90.fc2.com
// @description    unofficial minor improvements
// @include        http://*.3gokushi.jp/*
// ==/UserScript==

// 簡易機能オフ(Beyondみたいな格好いい設定画面作りません or 作れません)
var is_all_troop = true;       // true: 兵士全数入力機能オン、false: オフ
var is_trade_from_grain = true;// true: 資源三種一括変換機能オン、false: オフ
var is_raid_attack = true;     // true: 強襲スキルチェック機能オン、false: オフ
var is_bookmark_plus = true;   // true: ブックマーク編集機能オン、false: オフ
var is_troop_dest = true;      // true: 出兵先表示機能オン、false: オフ
var is_draw_and_go = true;     // true: ドローして即売却機能オン、false: オフ
var is_yorozudas = true;       // true: ヨロズダス関連機能オン、false: オフ
var is_duel_lv_check = true;   // true: ブショーダスレベルチェックオン、false: オフ


// (未実装)同盟掲示板、ログをチェックして(もっと賢く)ピコピコする。
// のは、重いかなあ。→別ツールとして作りたいな。


// 出兵時に便利なリンクをつける。
// 盾兵追加でレイアウトが乱れた。対応したら盾のないワールドでは動かなそう。
// 大剣兵は上級だろうか。入れなくていいや。
if (location.pathname.match(/\/facility\/castle_send_troop\.php/) && document.title.match(/出兵\(入力\)/) && is_all_troop){

  var inner_tablebody = get_element('//table[@class="innerTables"]/tbody', document).snapshotItem(0)
  
  // クリア用のリンク作成
  var new_tr_element = document.createElement('tr');
  
  var new_span_element = document.createElement('span');
  new_span_element.textContent = "兵士全てクリア";
  new_span_element.setAttribute("onclick", "setObjectValue('infantry_count', '');setObjectValue('large_infantry_count', '');setObjectValue('shield_count', '');setObjectValue('heavy_shield_count', '');setObjectValue('spear_count', '');setObjectValue('halbert_count', '');setObjectValue('archer_count', '');setObjectValue('crossbow_count', '');setObjectValue('cavalry_count', '');setObjectValue('cavalry_guards_count', '');setObjectValue('scout_count', '');setObjectValue('cavalry_scout_count', '');setObjectValue('ram_count', '');setObjectValue('catapult_count', '');");
  new_span_element.style.cssText = "color: rgb(0, 0, 255); text-decoration: underline; cursor: pointer;";
  
  var new_td_element = document.createElement('td');
  new_td_element.setAttribute("colspan", "6");
  new_td_element.appendChild(new_span_element);
  new_tr_element.appendChild(new_td_element);
  
  // 下級兵、上級兵全部行けリンクの作成
  for (var i = 2; i >= 1; i--){
    var new_span_element = document.createElement('span');
    new_span_element.textContent = (i == 1 ? "槍/弓/騎兵全て" : "矛/弩/近衛兵全て");
    
    if (i == 1){
      var span_elements = get_element('tr/td[2]/span', inner_tablebody);
    }else{
      var span_elements = get_element('tr/td[4]/span', inner_tablebody);
    }
    
    var onclick_attribute = "";
    for (var j = 1; j < span_elements.snapshotLength; j++){//剣兵除くため1から
      var this_span = span_elements.snapshotItem(j);
      onclick_attribute += this_span.getAttribute("onclick") + ";";
    }
    new_span_element.setAttribute("onclick", onclick_attribute);
    new_span_element.style.cssText = "color: rgb(0, 0, 255); text-decoration: underline; cursor: pointer;";
    
    var new_td_element = document.createElement('td');
    new_td_element.setAttribute("colspan", "3");
    new_td_element.appendChild(new_span_element);
    new_tr_element.insertBefore(new_td_element, new_tr_element.firstElementChild);
    
  }
  
  inner_tablebody.insertBefore(new_tr_element, inner_tablebody.children[1]);
}


// 米の変換をやりやすくする。
if (document.title.match(/^市場/) && is_trade_from_grain){// 拠点名に市場とか名付けないよね
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'table.commonTables.w250 { width: 350px;}';
  head.appendChild(style);
  
  var inner_tbody = get_element('//table[@class="commonTables"]/tbody/tr/td/table/tbody', document).snapshotItem(0);
  if (get_element('tr', inner_tbody).snapshotLength >= 3){// (旧)確認画面では発動させない
    var inner_table = inner_tbody.parentNode;
    inner_tbody.style.display = 'none';
    
    var new_tbody_element = document.createElement('tbody');
    
    var new_tr_element = document.createElement('tr');
    var new_td_element = document.createElement('th');
    new_td_element.className = 'ttl2';
    new_td_element.textContent = '欲しい資源';
    new_tr_element.appendChild(new_td_element);
    
    var new_td_element = document.createElement('th');
    new_td_element.className = 'ttl2';
    new_td_element.textContent = '売り出す糧の量';
    new_tr_element.appendChild(new_td_element);
    
    var new_td_element = document.createElement('th');
    new_td_element.className = 'ttl2';
    new_td_element.textContent = '欲しい資源の量';
    new_tr_element.appendChild(new_td_element);
    
    new_tbody_element.appendChild(new_tr_element);
    
    var img_path = get_element('//img[contains(@src, "wood")]', document).snapshotItem(0).src;
    var icon_wood = img_path.replace(new RegExp('^.*' + location.hostname), '');
    var icon_stone = icon_wood.replace('wood', 'stone');
    var icon_ingot = icon_wood.replace('wood', 'ingot');
    
    var img_prop = {
      101 : {"alt" : "木", "src" : icon_wood},
      102 : {"alt" : "石", "src" : icon_stone},
      103 : {"alt" : "鉄", "src" : icon_ingot}
    }
    
    for (var i = 101; i <= 103; i++){
      var new_tr_element = document.createElement('tr');
      
      var new_td_element = document.createElement('td');
      new_td_element.className = 'cost';
      var new_img_element = document.createElement('img');
      new_img_element.align = "middle";
      new_img_element.alt = img_prop[i]['alt'];
      new_img_element.src = img_prop[i]['src'];
      new_td_element.textContent = img_prop[i]['alt'];
      new_td_element.insertBefore(new_img_element, new_td_element.childNodes[0]);
      new_tr_element.appendChild(new_td_element);
      
      var new_td_element = document.createElement('td');
      var new_input_element = document.createElement('input');
      new_input_element.type = 'text';
      new_input_element.id = 'tt_id' + i;
      new_input_element.value = '';
      new_input_element.size = 8;
      new_input_element.name = 'tt_id' + i;
      new_input_element.addEventListener('change', function(){set_purchase(this);}, false);
      new_td_element.appendChild(new_input_element);
      new_tr_element.appendChild(new_td_element);
      
      var new_td_element = document.createElement('td');
      var new_span_element = document.createElement('span');
      new_span_element.className = 'buy_digit';
      new_span_element.id = 'tt_num_id' + i;
      new_span_element.textContent = '0';
      new_td_element.textContent = '購入する';
      new_td_element.insertBefore(new_span_element, new_td_element.childNodes[0]);
      new_tr_element.appendChild(new_td_element);
      
      new_tbody_element.appendChild(new_tr_element);
      
      inner_table.appendChild(new_tbody_element);
    }
    
    var new_tr_element = document.createElement('tr');
    var new_td_element = document.createElement('td');
    var new_input_element = document.createElement('input');
    new_input_element.type = 'submit';// テキストボックスの履歴保存のためにbuttonじゃなくsubmit
    new_input_element.value = 'はい';
    new_input_element.addEventListener('click', function(event){exec_trade(event, this);}, false);
    new_td_element.className = 'center';
    new_td_element.colSpan = 3;
    new_td_element.textContent = '取引してよろしいですか？';
    new_td_element.appendChild(new_input_element);
    new_tr_element.appendChild(new_td_element);
    new_tbody_element.appendChild(new_tr_element);
    
    var new_tr_element = document.createElement('tr');
    var new_td_element = document.createElement('td');
    new_td_element.className = 'center';
    new_td_element.colSpan = 3;
    var link_a_element = document.createElement('a');
    link_a_element.setAttribute("title", "元の画面");
    link_a_element.setAttribute("alt", "元の画面");
    link_a_element.href = '#';
    link_a_element.innerHTML = "糧以外を取引に出す(元の画面)";
    var listener = function(tbody){
      link_a_element.addEventListener('click',
      function (event){
        event.preventDefault();
        tbody.style.display = '';
        tbody.nextSibling.style.display = 'none';
      }, false);
    }
    listener(inner_tbody);
    new_td_element.appendChild(link_a_element);
    new_tr_element.appendChild(new_td_element);
    new_tbody_element.appendChild(new_tr_element);
    
    inner_table.appendChild(new_tbody_element);
  }
}

function exec_trade(event, obj){
  event.preventDefault();
  obj.disabled = true;
  
  var trade_end = {};
  for (var i = 101; i <= 103; i++){
    trade_end[i] = 1;
  }
  
  //投げるべきデータ
  //POST
  //http://s5.3gokushi.jp/facility/facility.php
  //米100→木60
  //x=0&y=0&st=1&tf_id=104&tc=100&tt_id=101&change_btn=%E3%81%AF%E3%81%84
  //米100→石60
  //x=0&y=0&st=1&tf_id=104&tc=100&tt_id=102&change_btn=%E3%81%AF%E3%81%84
  //鉄100→米60
  //x=0&y=0&st=1&tf_id=103&tc=100&tt_id=104&change_btn=%E3%81%AF%E3%81%84
  
  var target_url = location.href.replace(/\?.+$/, '');
  
  var post_data_prefix = location.href.replace(target_url, '').replace(/\?([^?#]*)#?.*$/, '$1'); // この時点で x=0&y=0 みたいな感じ
  post_data_prefix += '&st=1&tf_id=104'; // tf_id=104 は売る資源が糧で固定
  
  var post_data_postfix = '&change_btn=%E3%81%AF%E3%81%84';
  
  for (var i = 101; i <= 103; i++){
    var input_element = document.getElementById('tt_id' + i);
    
    if (input_element.value){
      var post_data = post_data_prefix + '&tc=' + input_element.value;
      post_data += '&tt_id=' + i + post_data_postfix;
      
      trade_end[i] = 0;
      var trade = function(loop){
        GM_xmlhttpRequest({
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          url: target_url,
          data: post_data,
          onload: function(){trade_end[loop] = 1;}
        });
      };
      trade(i);
    }
  }
  
  // 資源変換終了
  timerID = setInterval( function(){
    var num = 1;
    for (var i = 101; i <= 103; i++){
      num *= trade_end[i];
    }
    
    if(num == 1){
      location.reload();
      
      clearInterval(timerID);
      timerID = null;
    }
  },1000);

}

function set_purchase(obj){
  var facility_contents = get_element('//*[@class="commonTables"]', document).snapshotItem(0);
  var price_list = get_element('*//*[contains(text(), "%")]', facility_contents);
  // 通常は、
  //<td class="contents">60%</td>
  // だけど、市場繁栄・市場知識使用時は、
  //<td class="contents">60%<span title="スキルによるボーナス" class="color1">&nbsp;+&nbsp;3%（スキル効果）</span></td>
  // のようになる。ツールを作らせまいとする気迫が伝わってきます。
  // (龐統さんがいてすら、ボーナスが小数点を含む場合の検証できないなんて)
  
  var price = 0;
  for(var j=0;j<price_list.snapshotLength;j++){
    price += parseFloat(price_list.snapshotItem(j).textContent.replace(/^[^0-9.]*([0-9.]+)%.*$/, '$1'));
  }
  
  document.getElementById(obj.id.replace('tt_id', 'tt_num_id')).textContent = Math.floor(obj.value * price / 100);
}


// 引いてすぐにそのカードを売る。
// 引いてすぐにそのカードを破棄する。
// →保護解除だけになりました。
//if (location.pathname.match(/\/busyodas\/busyodas_continuty_result\.php/) && is_draw_and_go){
// 10連はひどい仕様で対応不可だった
if (location.pathname.match(/\/busyodas\/busyodas_result\.php/) && is_draw_and_go){
  var card_list = get_element('//form[@id="busyodas"]/table/tbody/tr', document);
  var card = card_list.snapshotItem(0);
  
  var lock_img = get_element('td/img', card_list.snapshotItem(1));
  if (lock_img.snapshotLength){
    var card_name = get_element('td/a', card);
    
    card_name.snapshotItem(0).href.match(/cardWindow_(\d+)/);
    var card_no = RegExp.$1;
    
    // カーソルアイコン変わらなくてもいいよね
    var listener = function(k){
      lock_img.snapshotItem(0).addEventListener('click',
      function (event){deprotect(event, k, this);}, false);
    }
    listener(card_no);
  }
}
function deprotect (event, serial, obj){
  var mode = 'deprotect';
  
  // SSID取得
  var target_url = 'http://' + location.host + '/card/deck.php';
  
  var ssid = '';
  GM_xmlhttpRequest({
    method: 'GET',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    url: target_url,
    onload: function(responseDetails) {
      var div = document.createElement('div');
      div.innerHTML = responseDetails.responseText;
      ssid = get_element('*//input[@id="ssid"]', div).snapshotItem(0).value;
    }
  });
  
  // SSID取得完了
  timerID = setInterval( function(){
    if(ssid){
      clearInterval(timerID);
      timerID = null;
      
      // 保護解除実行
      //投げるべきデータ
      //POST
      //http://s9.3gokushi.jp/card/deck.php
      //
      //mode=protect&target_card=(カードNo)&ssid=(セッションID)
      //modeはprotect/deprotect/delなど。
      
      var post_data = 'mode=' + mode + '&target_card=' + serial + '&ssid=' + ssid;
      
      var is_end = 0;
      GM_xmlhttpRequest({
        method: 'POST',
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        url: target_url,
        data: post_data,
        onload: function(){is_end = 1;}
      });
      
      // 保護解除終了→錠前のアイコン消しとく
      // 保護解除した後破棄も出品もできなくていいよね
      timerID = setInterval( function(){
        if(is_end == 1){
          clearInterval(timerID);
          timerID = null;
          obj.parentNode.removeChild(obj);
        }
      },1000);
    }
  },1000);
}


// (未実装)売る時に同じカードの出品具合を見る。
// 自分の作った他のツールとの整合性取れないなんて格好悪すぎるしなあ。
// →理由変更: トレード機能のバグがなくなるまでは作っても使い物にならない。


// 強襲スキル使用時に強襲になってるかチェックする。
if (location.pathname.match(/\/facility\/castle_send_troop\.php/) && document.title.match(/出兵\(確認\)/) && is_raid_attack){
  var use_skill = get_element('//div[@class="useSkill"]/p[@class="skillInfo"]', document);
  
  if (use_skill.snapshotLength){
    skill = use_skill.snapshotItem(0);
    
    if (skill.textContent.match(/強襲/)){
      var move_type = get_element('//table[@class="fighting_about"]/tbody/tr/th', document).snapshotItem(0);
      
      if (! move_type.textContent.match(/強襲/)){
        var form_element = get_element('//form[@name="input_troop"]', document).snapshotItem(0);
        
        var new_div_element = document.createElement('div');
        new_div_element.className = "infomation";
        var new_p_element = document.createElement('p');
        
        var new_span_element = document.createElement('span');
        new_span_element.className = "notice";
        new_span_element.innerHTML = "<strong>!! 注意 !!</strong></span><br>";
        new_p_element.appendChild(new_span_element);
        
        var new_span_element = document.createElement('span');
        new_span_element.className = "notice";
        new_span_element.textContent = "強襲スキルの無駄遣いです!!";
        new_p_element.appendChild(new_span_element);
        
        new_div_element.appendChild(new_p_element);
        form_element.insertBefore(new_div_element, form_element.lastElementChild);
        
        // 合成時に追加カードのスコアが多かった場合の注意書きと同じスタイルに。
        var link_element = get_element('//link[@media="screen,tv"]', document).snapshotItem(0);
        
        var new_link_element = link_element.cloneNode(true);
        new_link_element.href = new_link_element.href.replace(/\/[^/]+$/, '/union.css');
        
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(new_link_element);
      }
    }
  }
}


// ブックマークを上下に移動できるようにする
if (location.pathname.match(/\/user\/bookmark\.php/) && is_bookmark_plus){
  var bookmarks = get_element('//table[@class="tables"]', document);
  
  var items = get_element('tbody/tr/td[1][@class="center"]', bookmarks.snapshotItem(0));
  
  for (var i = 0; i < items.snapshotLength; i++){
    var td_element = items.snapshotItem(i);
    
    if (i == 0){
      var link_text_element = document.createTextNode("　"); // 本当は&nbsp;にしたい
      td_element.insertBefore(link_text_element, td_element.childNodes[0]);
    }else{
      var link_a_element = document.createElement('a');
      link_a_element.setAttribute("title", "上へ");
      link_a_element.setAttribute("alt", "上へ");
      link_a_element.href = '#';
      link_a_element.innerHTML = "▲";
      var listener = function(element){
      link_a_element.addEventListener('click',
        function (event){move_vertical(event, element, +1);}, false);
      }
      listener(td_element);
      
      td_element.insertBefore(link_a_element, td_element.childNodes[0]);
    }
    
    if (i == items.snapshotLength - 1){
      var link_text_element = document.createTextNode("　");
      td_element.appendChild(link_text_element);
    }else{
      var link_a_element = document.createElement('a');
      link_a_element.setAttribute("title", "下へ");
      link_a_element.setAttribute("alt", "下へ");
      link_a_element.href = '#';
      link_a_element.innerHTML = "▼";
      var listener = function(element){
      link_a_element.addEventListener('click',
        function (event){move_vertical(event, element, -1);}, false);
      }
      listener(td_element);
      td_element.appendChild(link_a_element);
    }
  }
}
function move_vertical (event, element, direction){
  // ダブルクリック抑止はしなくても大丈夫かな
  event.preventDefault();
  
  var td_element = element;
  var tr_element = td_element.parentNode;
  
  var dst_tr_element;
  if (direction == 1){
    dst_tr_element = tr_element.previousElementSibling;
  }else{
    dst_tr_element = tr_element.nextElementSibling;
  }
  
  var src_bookmarks = get_element('*//input', tr_element); // ORDERED必須
  var dst_bookmarks = get_element('*//input', dst_tr_element);
  
  for (var i = 0; i < src_bookmarks.snapshotLength; i++){
    var src = src_bookmarks.snapshotItem(i);
    var dst = dst_bookmarks.snapshotItem(i);
    
    if (src.type != "checkbox"){
      src.value = [dst.value, dst.value = src.value][0];
    }else{
      src.checked = [dst.checked, dst.checked = src.checked][0];
    }
  }
}


// 出兵時に出兵先のグラフィックを表示する。
if (location.pathname.match(/\/facility\/castle_send_troop\.php/) && document.title.match(/出兵\(確認\)/) && is_troop_dest){
  var tr_element = get_element('//table[@class="fighting_about"]/tbody/tr', document).snapshotItem(0);
  
  var village_x_value = get_element('*//input[@name="village_x_value"]', tr_element).snapshotItem(0).value;
  var village_y_value = get_element('*//input[@name="village_y_value"]', tr_element).snapshotItem(0).value;
  
  var map_url = "http://" + location.hostname + "/map.php?x=" + village_x_value + "&y=" + village_y_value;
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: map_url,
    onload: function(responseDetails) {
      var div = document.createElement('div');
      div.innerHTML = responseDetails.responseText;
      
      var map_scale = get_element('*//div[@id="change-map-scale"]', div).snapshotItem(0);
      
      var li_scale = get_element('ul/li[contains(@class, "now")]', map_scale).snapshotItem(0);
      
      li_scale.className.match(/sort(\d+)/);
      var scale = RegExp.$1;
      
      var center = 0;
      if (scale == 11){
        center = 61;
      }else if (scale == 15){
        center = 113;
      }else if (scale == 21){
        center = 221;
      }else{
        //51x51はどうしよう。どうせ、使ってる人いないか
      }
      
      if (center != 0){
        center = "mapAll" + center;
        
        var new_td_element = document.createElement('td');
        //new_td_element.style.cssText = "position: relative;";
        
        var bg_img = document.createElement('img');
        //bg_img.src = 'data:image/gif;base64,R0lGODlhPAA8APcAANToas7fZsfjMElcEmh9Jaa%2FTqK6TaW8U6O5WHiNKYacNZOqO6nDR6G5RarCSqfAS6nBTam%2FUKe%2BUZKqKLHJP6jAPq7HQq%2FGRqzER67ESazDSqzCTaa%2FKbjPObPKQf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAB8ALAAAAAA8ADwABwj%2FAD8IHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPqzDmg54CbPn3S9KnAAQYFQl8S1SDhwAMMGCYkVUm0wIYLESREgHAAKtKeKKtmyICBgoYNGhwcWHvAwNefI4kysIDhggYLFDxQoHChQAEHEgowcDu1o9wLc41e2PBAAlS7ENRKYFAAAmGwG30meABBw1wIoDVEcPDAAQQMphkweFD5AIQMFt5i1GzBg%2B0LeCNrSDt6Awa8F%2FZSyHBBgoTTZBMUhqiZQgcPWDPkteAgwgENFzCUjpy3ru3v1C9c%2F%2BhAQTlmh5orGD1rQQMEx1wPIEAQgTUEBA8YAEbgwEH73XoZRVcF5sGlUHoeZBBBAQdM9oBT%2BvknngMaQHcXawj8pdZ8CPzGwHsPYPdAgQilhxpUW9XH2YcQUKBfBBfY1sGMM3qAlwcdYOUbhXZhsAECEGygF4kDpffcaBZgpZUGBwj2wJPyIXAAhXxlgCONHXhH3gVj4VZcU%2FRh0ACJPRHQAF8YcLVaBHrhiKN4XF61FmsW0IVBBBvUqMEDMOp1Z1amcSUlgw4QGNQACkBAWQFPzjdlbW8mCNUGq%2BH3AH0KQoAVdn4V4JgFDDrmgHjOYSABBbJ9QBR%2B%2FkkgpVORMf%2FQoKgR1DmeghFoUBZg4ul6wQERoGZXBqcx4FwHqRLk0wK1YtCkBKU9yWh%2FxOV1pV7OYWvbbxlsYF1%2B%2FFWn3wLLFbRsbe81yRoD2dWFgQfYwXYtvDHaiKVe8lHoALnnLUTUexkuWlmS7%2BoFmwZ8QZAVu3nJ%2B90GFkSQ7ENEXSWaew58GCN50tmYlYgSjPWbs3V1IFW%2FEi2721juAQrpc6il9aBrGWvnF78GXrTsVRlUd19loFlKWVNO9scAzh4RZQFxG4jK4KB07ZgWBBMn3ZMCS%2B%2BWJLFB4kjWVlWHtKym4p12ZQcKI53Ssg%2B0F9nSEajN0qqshj331XYrVa5FAQEAOw%3D%3D';
        bg_img.src = 'data:image/gif;base64,R0lGODlhPAA8APcAAExeFKS6RPz%2B%2FKS%2BVLTKPKS6THyOLKzGTLzOPKTCTISeNKzCPKS6XKzGRJSqLGx%2BJKy%2BVKS%2BTKzCTKzCRLTKRJSqPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAA8ADwABwj%2FAAUIHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPqzPkAAIAHNhX4HApAgUyhPhVMmIC0qEsHQxVIgDAggYQJUH1WUFkhagQJByJA%2BDpgadOtJZsqiHBAQgMCEuJKGEB3QAG1IrMWndCgr1sCFAA3iEA2woS7UT2qnXCAL9gGccv6vUp3wljEWjV29WkgQFzHXyWEtjpBAukEhQ80aOrAooGhBhpQmN0X7tW4oflSePtWdYQBVxu%2FTiqxqYEFCBAMPiB4gli3cq0C1h04MOS%2BCAgMd9rQ%2BALo4AcM%2F6bLgEEE1BIYJJiQgO56yHEDu20wYcF2tAg3AzhOwfJcCOwNYFhcfUHGXF8LJJCAeVaRV4BbpRHmVgTbtVbQdsdBxthXhH1VmgT9TSUbAcmVSMCJJDYAAXgNtDWXaBTYl5gA3gH2VV9UsSUgbqIxUMBYEhDQIgUlJtcXkUI%2BhiNdBZQVwHZIPRCAkOM5B0F12SnX1wEQNEAXYX4NJkFyFOA2ooq%2F4VbXb4b1RJQCD%2B74m48RvEWkbBC61d55AnKZwHIN7CneeHW6xZxyBRDQFI1RFXAjBE0CSdlvkNWJnZdVvSWihl4CCN56E5Co6IwC6VVBAX0JKCGHcqkGGJHZncYYa3WyBcrmBAxcBWAE%2Bhl10FkTUCCWgO21yBd9ZSJLIgKzuTUbciUGRhduvTKk1o%2BVdTgfc4GpFmRbYukG12zVSbBABHg9pFadLlpFoKhBCinhYF%2BpRp9kBOjla3FDVeAZY6Y9JxuRIcbV3o58ocYrqRWddRVkK5qnJpi%2FCehcXAHoZwBHUH4HmXiiQcCAgGF%2Bhi5sIEFJH4HwJXBohCdzRtJ9bPkVbImoaYxShXUSlkCZBei8EpQF%2BBiAcTBBifRM2%2F20UUAAOw%3D%3D';
        
        new_td_element.appendChild(bg_img);
        
        var center_img = document.createElement('img');
        var xpath = 'img[@class="' + center + '"]';
        var maps = get_element('*//div[@id="mapsAll"]', div).snapshotItem(0);
        if (get_element(xpath, maps).snapshotLength == 1){
          var center_img = get_element(xpath, maps).snapshotItem(0);
        }
        
        //center_img.style.cssText = "position: absolute;";
        center_img.style.cssText = "position: relative;left: -60px;top: -1px";// 妥協の産物;;
        new_td_element.appendChild(center_img);
        
        tr_element.appendChild(new_td_element);
      }
    }
  });
}


// 繰り返しクエストをまとめて受諾する
if (location.pathname.match(/\/quest\//) && is_yorozudas){
  var attention_quest = get_element('//div[@id="questB3_table"]/table/tbody/tr[contains(@class, "attention")]', document);
  var copy_src;
  
  // 残ってる繰り返しクエストのidを取得する
  var quest_list = [];

var version; // クエストの新バージョン対応
var is_exist_attention = 0;

  for (var i = 0; i < attention_quest.snapshotLength; i++){
    if (get_element('td[contains(text(), "繰り返し")]', attention_quest.snapshotItem(i)).snapshotLength){
      is_exist_attention = 1;
      version = 0;
    }else if (get_element('td/a[contains(text(), "繰り返し")]', attention_quest.snapshotItem(i)).snapshotLength){
      is_exist_attention = 1;
      version = 1;
    }
    
    if(is_exist_attention == 1){
      var regexp = /takeQuest\((\d+)\)/;
      var quest_id = attention_quest.snapshotItem(i).innerHTML.match(regexp);
      if ( quest_id ){
        quest_list.push(quest_id[1]);
        if ( !copy_src ){ // 次々に上書きしていくと、classがlastつきになることがある
          copy_src = attention_quest.snapshotItem(i);
        }
      }
    }
  }
  
  // 一度に受諾できる行追加
  if ( quest_list.length > 1 ){ // 残り1つの時はまとめても意味がない
    var add_quest = copy_src.cloneNode(true);
    
    add_quest.children[0].firstElementChild.innerHTML = "9"; // 難易度は適当で
    
    add_quest.children[2-version].firstElementChild.href = "#"; // クエスト名のリンクはずす
    add_quest.children[2-version].firstElementChild.textContent
      = "【繰り返しクエスト】未受諾" + quest_list.length + "種";
    if (version == 1){
      add_quest.children[2-version].children[1].textContent = "寄付とか出兵とかデュエルする";
    }
    
    add_quest.children[3-version].textContent
      = add_quest.children[3-version].textContent.replace(/\+1/, '+' + quest_list.length);
    
    add_quest.children[4-version].firstElementChild.href = "#";
    add_quest.children[4-version].firstElementChild.removeAttribute("onclick");
    add_quest.children[4-version].firstElementChild.addEventListener('click', function(event){take_quest(event, quest_list);}, false);
    
    copy_src.parentNode.insertBefore(add_quest, attention_quest.snapshotItem(0));
  }
}
function take_quest(event, quest_list){ // クエスト受諾
  event.preventDefault();
  
  var accept_end = [];
  for (var i = 0 ; i < quest_list.length ; i++){
    //投げるべきデータ
    //GET
    //http://s1.3gokushi.jp/quest/index.php
    // action=take_quest&id=(クエストID)
    var target_url = "http://" + location.hostname + "/quest/index.php";
    var get_data = 'action=take_quest&id=' + quest_list[i];
    target_url += '?' + get_data;
    
    accept_end[i] = 0;
    var accept = function(loop){
      GM_xmlhttpRequest({
        method: 'GET',
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        url: target_url,
        onload: function(){accept_end[loop] = 1;}
      });
    }
    accept(i);
  }
  
  // 受諾完了
  timerID = setInterval( function(){
    var num = 1;
    for (var i = 0; i < quest_list.length; i++){
      num *= accept_end[i];
    }
    
    if(num == 1){
      location.reload();
      
      clearInterval(timerID);
      timerID = null;
    }
  },1000);
}
// クリアしたクエストの報酬がヨロズダス回数なら報酬を受け取る
if (location.pathname.match(/\/quest\//) && !location.search.match(/\?c=1/) && is_yorozudas){
  var reward = get_element('//table[@summary="報酬"]/tbody/tr/td', document).snapshotItem(0);
  if (reward.textContent == "ヨロズダス回数"){
    location.href = 'http://' + location.host + '/quest/index.php?c=1';
  }
}
// クエストクリアで報酬としてヨロズダス回数を貰ったらそのままヨロズダスを引く
if (location.pathname.match(/\/quest\/index\.php/) && location.search.match(/\?c=1/) && is_yorozudas){
  var reward = get_element('//table[@summary="報酬"]/tbody/tr/td', document).snapshotItem(0);
  
  if (reward.textContent == "ヨロズダス回数"){
    post_data = 'send=send&got_type=0';
    var target_url = 'http://' + location.host + '/reward_vendor/reward_vendor.php';
    
    GM_xmlhttpRequest({
      method: 'POST',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      url: target_url,
      data: post_data,
      onload: function(responseDetails){
        var div = document.createElement('div');
        div.innerHTML = responseDetails.responseText;
        var reward_result;
        reward_result = get_element('*//table[@class="getBushodas"]/tbody/tr/td/p/strong', div);
        reward.textContent = reward_result.snapshotItem(0).textContent;
      }
    });
  }
}


// ブショーデュエル結果報告書から武将のレベルアップをチェックする
if (location.pathname.match(/\/report\/detail\.php/) && is_duel_lv_check){
  if (get_element('//img[contains(@src, "icon_attack_pvp.gif")]', document).snapshotLength == 1){
    // ブショーデュエルの報告書かどうかの判定。もっとスマートにしたい
    
    var result_summary = get_element('//div[@id="gray02Wrapper"]/table/tbody[contains(tr/th/strong, "戦闘結果")]', document).snapshotItem(0);
    
    if (result_summary){ // リーグ昇格のお知らせを除外するの忘れてた
      var duel_busyo = get_element('tr/td/p/text()[last()]', result_summary).snapshotItem(0);
      
      var new_input_element = document.createElement('input');
      new_input_element.type = 'button';
      new_input_element.value = 'レベルアップをチェックする';
      new_input_element.addEventListener('click', function(event){level_check(event, this);}, false);
      
      duel_busyo.parentNode.appendChild(new_input_element);
    }
  }
}
function level_check(event, obj){
  event.preventDefault();
  obj.disabled = true;
  
  var target_url = 'http://' + location.host + '/card/duel_main.php';
  
  var duel_page = document.createElement('div');
  duel_page.innerHTML = 
  GM_xmlhttpRequest({
    method: 'GET',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    url: target_url,
    synchronous: true
  }).responseText;
  
  var busyo_list = get_element('//ul[@id="duelDeckList"]/li', duel_page);
  
  if (busyo_list.snapshotLength){
    var name = [];
    var card_no = [];
    var lv_flg = [];
    var role = [];
    var check_end = []; // 終了判定用フラグ
    
    for (var i = 0; i < busyo_list.snapshotLength; i++){
      var busyo = busyo_list.snapshotItem(i);
      var busyo_thumb = get_element('div[1]/a', busyo).snapshotItem(0);
      if (! busyo_thumb){ // 武将が外されている場合はスキップ
        continue;
      }
      
      busyo_thumb.href.match(/cardWindow_(\d+)/);
      card_no[i] = RegExp.$1;
      
      name[i] = busyo_thumb.firstChild.title;
      
      role[i] = get_element('div[last()]', busyo).snapshotItem(0).textContent;
      
      lv_flg[i] = 0;
      check_end[i] = 0;
      var target_url = 'http://' + location.host + '/card/status_info.php?cid=' + card_no[i];
      
      var check = function(loop){
        GM_xmlhttpRequest({
          method: 'GET',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          url: target_url,
          onload: function(responseDetails) {
            var div = document.createElement('div');
            div.innerHTML = responseDetails.responseText;
            
            var header_tr = get_element('//table[@id="status_table"]/tbody/tr[th[contains(text(), "現ポイント")]]', div).snapshotItem(0);
            
            var point = header_tr.nextElementSibling.firstChild.textContent;
            if (point > 0){
              lv_flg[loop] = 1;
            }
            check_end[loop] = 1;
          }
        });
      };
      check(i);
    }
    
    timerID = setInterval( function(){
      var num = 1;
      for (var i = 0; i < busyo_list.snapshotLength; i++){
        if (! name[i]){
          continue;
        }
        num *= check_end[i];
      }
      
      if(num == 1){
        clearInterval(timerID);
        timerID = null;
        
        duel_busyo.parentNode.removeChild(new_input_element);
        duel_busyo.textContent = "\nデュエルデッキ：";
        for (var i = 0; i < busyo_list.snapshotLength; i++){
          if (! name[i]){
            continue;
          }
          
          if (lv_flg[i]){
            var link_a_element = document.createElement('a');
            link_a_element.setAttribute("title", name[i]);
            link_a_element.setAttribute("alt", name[i]);
            link_a_element.href = 'http://' + location.host + '/card/status_info.php?cid=' + card_no[i];
            link_a_element.innerHTML = name[i];
            
            duel_busyo.parentNode.appendChild(link_a_element);
          }else{
            add_text(duel_busyo.parentNode, name[i]);
          }
          
          add_text(duel_busyo.parentNode, "(" + role[i] + ")");
          
          add_text(duel_busyo.parentNode, "、");
        }
        
        duel_busyo.parentNode.lastChild.textContent = 
        duel_busyo.parentNode.lastChild.textContent.replace(new RegExp('、$'), '');
      }
    },1000);
  
  }else{
    add_text(duel_busyo.parentNode, "エラーが発生しました。");
  }

}
function add_text(element, text){
  if (element.lastChild.nodeName == "#text"){
    element.lastChild.textContent += text;
  }else{
    var text_element = document.createTextNode(text);
    element.appendChild(text_element);
  }
}


function get_element (xpath, element){
  return document.evaluate(xpath, element, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
