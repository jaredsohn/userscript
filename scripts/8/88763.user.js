// ==UserScript==
// @name     grmhikitoto
// @namespace  
// @description  hikitoto
// @include    http://www.toto-dream.com/*
// ==/UserScript==
(function(){
var f = {};
var mode_obj = {SK0150:true, SK0110:true};
var mode = location.href.replace(new RegExp(/.*dc\//g), '').replace(new RegExp(/\.do.*/g), '');
if (mode_obj[mode] == undefined) { void(0); }

var teamcnv = {'ベガルタ仙台':'仙　台','コンサドーレ札幌':'札　幌','モンテディオ山形':'山　形','水戸ホーリーホック':'水　戸','鹿島アントラーズ':'鹿　島','栃木ＳＣ':'栃　木','浦和レッズ':'浦　和','ザスパ草津':'草　津','大宮アルディージャ':'大　宮','ジェフユナイテッド千葉':'千　葉','ＦＣ東京':'Ｆ東京','柏レイソル':' 　柏　','川崎フロンターレ':'川崎Ｆ','東京ヴェルディ':'東京Ｖ','横浜 Ｆ・マリノス':'横浜M','横浜ＦＣ':'横浜C','湘南ベルマーレ':'湘　南','ヴァンフォーレ甲府':'甲　府','アルビレックス新潟':'新　潟','カターレ富山':'富　山','清水エスパルス':'清　水','ＦＣ岐阜':'岐　阜','ジュビロ磐田':'磐　田','ファジアーノ岡山':'岡　山','名古屋グランパス':'名古屋','徳島ヴォルティス':'徳　島','京都サンガF.C.':'京　都','愛媛ＦＣ':'愛　媛','ガンバ大阪':'Ｇ大阪','アビスパ福岡':'福　岡','セレッソ大阪':'Ｃ大阪','ギラヴァンツ北九州':'北九州','ヴィッセル神戸':'神　戸','サガン鳥栖':'鳥　栖','サンフレッチェ広島':'広　島','ロアッソ熊本':'熊　本','大分トリニータ':'大　分','ジェフユナイテッド市原':'市　原'};

var menu = {};
menu.SK0150 = {};
menu.SK0150.element = {};
menu.SK0150.element.body = document.getElementById('container');
menu.SK0150.title = '　　結果を整形する▼';
menu.SK0150.width = 150;
menu.SK0150.height = 20;
menu.SK0150.top = 113;
menu.SK0150.left = 760;

menu.SK0110 = {};
menu.SK0110.element = {};
menu.SK0110.element.body = document.getElementById('container');
menu.SK0110.title = '　　totoスレ用のテンプレートを取得する▼';
menu.SK0110.width = 250;
menu.SK0110.height = 20;
menu.SK0110.top = 233;
menu.SK0110.left = 650;

var _btn = document.createElement('div');
_btn.id = 'grm_menu_btn';
_btn.style.width = menu[mode].width + 'px';
_btn.style.height=menu[mode].height + 'px';
_btn.style.display = 'block';
_btn.style.position = 'absolute';
_btn.style.top = menu[mode].top + 'px';
_btn.style.left = menu[mode].left + 'px';
_btn.style.border = 'solid 1px #000000';
_btn.style.background = '#ffffff';
_btn.style.cursor = 'pointer';
_btn.appendChild(document.createTextNode(menu[mode].title));
menu[mode].element.body.appendChild(_btn);
menu[mode].element.btn = document.getElementById('grm_menu_btn');

switch (mode) {
  case 'SK0150':
    menu.SK0150.element.btn.addEventListener('click', getResult, false);
    break;
  case 'SK0110':
    menu.SK0110.element.btn.addEventListener('click', getTemplate, false);
    break;
}

function getResult() {
  var req = '';
  var idcnv = {'toto':[99,7,4,5], 'mini toto-A組':[39,7,2,99], 'mini toto-B組':[39,7,2,99], 'totoGOAL3':[36,5,3,2], 'totoGOAL2':[24,5,2,2]};
  var r0 = 103, r1 = 7, r2 = 4, r3 = 5;
  var _t = document.evaluate('//td[@class=\'list_border list_title list_fontstyle\']', document.body, null, 7, null);
  var t_c = '';
  var id_c = '';
  var _tm = document.evaluate('//td[@class=\'list_border list_fontstyle\' or @class=\'list_border list_fontstyle2\']', document.body, null, 7, null);

  var r_jm = 0;
  if (_tm.snapshotItem(0).textContent.replace(new RegExp(/[\t\n]/g), '').length > 5) {
    idcnv['toto'][0]++; idcnv['mini toto-A組'][0]++; idcnv['mini toto-B組'][0]++; idcnv['totoGOAL3'][0]++; idcnv['totoGOAL2'][0]++;
    r_jm = 1;
  }

  var cnt = _t.snapshotLength;
  var tmcnt = _tm.snapshotLength;
  var j_tmcnt = 0;
  var jm_tmcnt = 0;
  var tmcnt_c = 0;
  for (var i = 0; i < cnt; i++) {
    t_c = _t.snapshotItem(i).textContent.replace(new RegExp(/[\t\n]/g), '');
    id_c = t_c.replace(new RegExp(/第[0-9]+回 /g), '').replace(new RegExp(/ くじ結果/g), '');
    if (id_c == 'toto' || id_c == 'mini toto-A組' || id_c == 'mini toto-B組' || id_c == 'totoGOAL3' || id_c == 'totoGOAL2') {
req += '▼' + t_c + "\n";
      r0 = idcnv[id_c][0]; r1 = idcnv[id_c][1]; r2 = idcnv[id_c][2]; r3 = idcnv[id_c][3];
      j_tmcnt = tmcnt_c + r0; jm_tmcnt = j_tmcnt - r1 - r2 * 3;
      for (var j = tmcnt_c+r_jm, k = 1; j < j_tmcnt; j += r1, k++) {
        req += _tm.snapshotItem(j + r1 - 1).textContent.replace(RegExp(/[\t\n]/g), '') + (k%r3 == 0 ? ' ' : '');
        if (j >= jm_tmcnt) {
           req += "\n";
           for (var m = 0; m < r2 - 1; m++) {
            req += (m + 1) + '等 ' + _tm.snapshotItem(j + r1 + 1 + m).textContent + '(' + _tm.snapshotItem(j + r1 + 1 + r2 + m).textContent + ')' + "\n";
          }
           break;
        }
      }
       tmcnt_c += r0;
req += "\n";
    }
  }
  alert('結果' + "\n\n" + req);
};

function getTemplate() {
  var req = '';
  var idcnv = {'toto':13, 'mini toto-A組':5, 'mini toto-B組':5, 'totoGOAL3':3, 'totoGOAL2':2};
  var r1 = 8, r2 = 7;
  var _t = document.evaluate('//td[@class=\'list_border list_title list_fontstyle\']', document.body, null, 7, null);
  var t_c = '';
  var id_c = '';
  var _tm = document.evaluate('//td[@class=\'list_border list_fontstyle\' or @class=\'list_border list_fontstyle2\']', document.body, null, 7, null);

  var cnt = _t.snapshotLength; if (_t.snapshotItem(7).textContent != '対戦チームデータ') {r1 = 7; r2 = 6}
  var tmcnt = _tm.snapshotLength;
  var j_tmcnt = 0;
  var tmcnt_c = 0;
  for (var i = 0; i < cnt; i += r1) {
    t_c = _t.snapshotItem(i + 1).textContent.replace(new RegExp(/[\t\n]/g), '');
    id_c = t_c.replace(new RegExp(/第[0-9]+回 /g), '').replace(new RegExp(/ くじ情報/g), '');
req += '▼' + t_c + "\n";
    j_tmcnt = tmcnt_c + idcnv[id_c] * r2;
    for (var j = tmcnt_c, k = 1, m = 1; j < j_tmcnt; j += r2, k++, m+=2) {
      switch (idcnv[id_c]) {
        default: req += (k < 10 ? '0' + k : k) + ' ' + teamcnv[_tm.snapshotItem(j + 3).textContent] + ' － ' + teamcnv[_tm.snapshotItem(j + 5).textContent] + ' [--]' + "\n"; break;
        case 3:case 2: req += '0' + m + ' ' + teamcnv[_tm.snapshotItem(j + 3).textContent] + ' [---]' + "\n" + '0' + (m + 1) + ' ' + teamcnv[_tm.snapshotItem(j + 5).textContent] + ' [---]' + "\n" + (j + r2 != j_tmcnt ? '--------------' : '') + "\n"; break;
      }
    }
    tmcnt_c = j;
req += "\n";
  }
  alert('テンプレ' + "\n\n" + req);
};

})();