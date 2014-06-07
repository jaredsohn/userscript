// ==UserScript==
// @name           モンスターデータ検索
// @namespace      http://cwsj.info
// @include        http://www.geocities.jp/shdqm/dqmj/dqmj2/j2pmst*.htm
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var form = $('<form id="search"></form>');
form.css('width', '60em');

var input_box = $('<div></div>');
input_box.css('margin', '0 auto');
input_box.css('width', '60em');
form.append(input_box);

var dl = $('<dl></dl>');
dl.css('float', 'left');
input_box.append(dl);

var status_kinds = [
  ['size', '枠', 1],
  ['hp', 'HP', 4],
  ['mp', 'MP', 5],
  ['attack', '攻撃力', 6],
  ['defence', '守備力', 7],
  ['speed', '素早さ', 8],
  ['intelligence', '賢さ', 9],
  ['total', '合計', 10],
];

$.each(status_kinds, function () {
  var name = this[0];
  var label_name = this[1];

  var dt = $('<dt></dt>');
  var label = $('<label></label>');
  label.attr('for', name);
  label.text(label_name);
  dt.append(label);
  dl.append(dt);

  var dd = $('<dd></dd>');
  var value_input = $('<input></input>');
  value_input.attr('type', 'text');
  value_input.attr('id', name);
  value_input.attr('name', name);
  dd.append(value_input);
  var comparison = $('<select></select>');
  comparison.attr('id', name + '_comparison');
  comparison.attr('name', name + '_comparison');
  comparison.append($('<option>').attr({ value: -1 }).text('以下'));
  comparison.append($('<option>').attr({ value: 0 }).text('である'));
  comparison.append($('<option>').attr({ value: 1, selected: 'selected' }).text('以上'));
  dd.append(comparison);
  dl.append(dd);
});

dl = $('<dl></dl>');
dl.css('float', 'left');
input_box.append(dl);

var attribute_kinds = ['attribute1', 'attribute2', 'attribute3', 'attribute4'];

$.each(attribute_kinds, function () {
  var name = this;
  var label_name = '特性';

  var dt = $('<dt></dt>');
  var label = $('<label></label>');
  label.attr('for', name);
  label.text(label_name);
  dt.append(label);
  dl.append(dt);

  var dd = $('<dd></dd>');
  var value_input = $('<input></input>');
  value_input.attr('type', 'text');
  value_input.attr('id', name);
  value_input.attr('name', name);
  dd.append(value_input);
  var comparison = $('<select></select>');
  comparison.attr('id', name + '_comparison');
  comparison.attr('name', name + '_comparison');
  comparison.append($('<option>').attr({ value: -1 }).text('を持っていない'));
  comparison.append($('<option>').attr({ value: 1, selected: 'selected' }).text('を持っている'));
  dd.append(comparison);
  dl.append(dd);
});

var registance_kinds = [
  ['fire_breath', '炎ブレス(マダンテ)', 15, 0],
  ['ice_breath', '氷ブレス', 15, 1],
  ['io', 'イオ', 16, 0],
  ['mera', 'メラ', 16, 1],
  ['gira', 'ギラ', 16, 2],
  ['hyado', 'ヒャド', 17, 0],
  ['bagi', 'バギ', 17, 1],
  ['doruma', 'ドルマ', 17, 2],
  ['dein', 'デイン', 17, 3],
  ['betan', 'ベタン', 18, 0],
  ['zaki', 'ザキ', 18, 1],
  ['dance_seal', '踊り封じ', 18, 2],
  ['slash_seal', '斬撃封じ', 19, 0],
  ['arts_seal', '体技封じ', 19, 1],
  ['breath_seal', '息封じ', 19, 2],
  ['confusion', '混乱', 20, 0],
  ['sleep', '眠り', 20, 1],
  ['paralize', 'マヒ', 20, 2],
  ['mind', 'マインド', 20, 3],
  ['mahoto-n', 'マホトーン', 21, 0],
  ['mahotora', 'マホトラ', 21, 1],
  ['manu-sa', 'マヌーサ', 21, 2],
  ['rukani', 'ルカニ', 22, 0],
  ['down', 'ダウン', 22, 1],
  ['bomie', 'ボミエ', 22, 2],
  ['fool', 'フール', 22, 3],
  ['poison', '毒', 23, 0],
  ['hack', 'ハック', 23, 1],
];

dl = $('<dl></dl>');
dl.css('float', 'left');
input_box.append(dl);

$.each(registance_kinds, function (index) {
  if (index == 10 || index == 20) {
    dl = $('<dl></dl>');
    dl.css('float', 'left');
    input_box.append(dl);
  };

  var name = this[0];
  var label_name = this[1];

  var dt = $('<dt></dt>');
  var label = $('<label></label>');
  label.attr('for', name);
  label.text(label_name);
  dt.append(label);
  dl.append(dt);

  var dd = $('<dd></dd>');
  var select = $('<select></select>');
  select.attr('id', name);
  select.attr('name', name);
  select.append($('<option>').attr({ value: '' }).text('---'));
  select.append($('<option>').attr({ value: -1 }).text('弱点'));
  select.append($('<option>').attr({ value: 0 }).text('普通'));
  select.append($('<option>').attr({ value: 1 }).text('軽減'));
  select.append($('<option>').attr({ value: 2 }).text('半減'));
  select.append($('<option>').attr({ value: 3 }).text('激減'));
  select.append($('<option>').attr({ value: 4 }).text('無効'));
  select.append($('<option>').attr({ value: 5 }).text('回復'));
  select.append($('<option>').attr({ value: 6 }).text('反射'));
  dd.append(select);
  var comparison = $('<select></select>');
  comparison.attr('id', name + '_comparison');
  comparison.attr('name', name + '_comparison');
  comparison.append($('<option>').attr({ value: -1 }).text('以下'));
  comparison.append($('<option>').attr({ value: 0 }).text('である'));
  comparison.append($('<option>').attr({ value: 1, selected: 'selected' }).text('以上'));
  dd.append(comparison);
  dl.append(dd);
});

function isDataRow(target) {
  return ($($(target).children()[0]).attr('rowspan') != '2') && ($(target).children().length == 24);
}

var data_rows = $('table:last tr');
data_rows = data_rows.filter(function (index) {
  return isDataRow(this);
});

$('table:last tr').filter(function (index) {
  return !isDataRow(this) && (index > 1);
}).css('display', 'none');

var search_button = $('<input type="button" value="検索">');
search_button.click(function () {
  console.log('start');
  data_rows.css('display', 'none');
  var d = data_rows.filter(function (index) {
    return true;
  }); // copy of data_rows

  $.each(status_kinds, function () {
    var name = this[0];
    var i = this[2];
    var threshold = $('#' + name).val()
    var comparison = $('#' + name + '_comparison').val()
    console.log(name, i, threshold, comparison, d.length);
    if (threshold != '') {
      d = d.filter(function () {
        var str = $($(this).children()[i]).text();
        var status = parseInt(str);

        console.log(status)
        return (comparison == -1 && status <= threshold) ||
               (comparison ==  0 && status == threshold) ||
               (comparison ==  1 && status >= threshold);
      })
      console.log(d.length);
    };
  });

  $.each(attribute_kinds, function () {
    var name = this;
    var threshold = $('#' + name).val()
    var comparison = $('#' + name + '_comparison').val()
    console.log(name, threshold, comparison, d.length);
    if (threshold != '') {
      d = d.filter(function () {
        var included = false;
        included = included || ($($(this).children()[11]).text() == threshold);
        included = included || ($($(this).children()[12]).text() == threshold);
        included = included || ($($(this).children()[13]).text() == threshold);
        included = included || ($($(this).children()[14]).text() == threshold);

        console.log(status)
        return (comparison == -1 && !included) ||
               (comparison ==  1 && included);
      })
      console.log(d.length);
    };
  });

  $.each(registance_kinds, function () {
    var name = this[0];
    var i = this[2];
    var j = this[3];
    var threshold = $('#' + name).val()
    var comparison = $('#' + name + '_comparison').val()
    console.log(name, i, j, threshold, comparison, d.length);
    if (threshold != '') {
      d = d.filter(function () {
        var str = $($(this).children()[i]).text().split(" ")[j];
        var registance = 0;
        if (str == '回') {
          registance = 5;
        } else if (str == '反') {
          registance = 6;
        } else {
          registance = parseInt(str);
        }

        console.log(registance)
        return (comparison == -1 && registance <= threshold) ||
               (comparison ==  0 && registance == threshold) ||
               (comparison ==  1 && registance >= threshold);
      })
      console.log(d.length);
    };
  });

  d.css('display', '');
  console.log('stop');
});

form.append(search_button);
$('table:last').before(form);
