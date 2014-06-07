// ==UserScript==
// @name           skill search
// @namespace      http://cwsj.info
// @include        http://www.geocities.jp/shdqm/dqmj/dqmj2/j2psklhyo.htm
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var form = $('<form id="search"></form>');
form.css('width', '15em');

var input_box = $('<div></div>');
input_box.css('margin', '0 auto');
input_box.css('width', '15em');
form.append(input_box);

dl = $('<dl></dl>');
input_box.append(dl);

var attribute_kinds = ['attribute1', 'attribute2', 'attribute3', 'attribute4'];

$.each(attribute_kinds, function () {
  var name = this;
  var label_name = '特技';

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
  comparison.append($('<option>').attr({ value: -1 }).text('を覚えない'));
  comparison.append($('<option>').attr({ value: 1, selected: 'selected' }).text('を覚える'));
  dd.append(comparison);
  dl.append(dd);
});

var data_rows = $('table:last tr');
data_rows = data_rows.filter(function (index) {
  return index > 0;
});

var search_button = $('<input type="button" value="検索">');
search_button.click(function () {
  console.log('start');
  data_rows.css('display', 'none');
  var d = data_rows.filter(function (index) {
    return true;
  }); // copy of data_rows

  $.each(attribute_kinds, function () {
    var name = this;
    var threshold = $('#' + name).val()
    var comparison = $('#' + name + '_comparison').val()
    console.log(name, threshold, comparison, d.length);
    if (threshold != '') {
      d = d.filter(function () {
        var included = false;
        included = included || ($($(this).children()[1]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[2]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[3]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[4]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[5]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[6]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[7]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[8]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[9]).text().split("(")[0] == threshold);
        included = included || ($($(this).children()[10]).text().split("(")[0] == threshold);

        console.log(status)
        return (comparison == -1 && !included) ||
               (comparison ==  1 && included);
      })
      console.log(d.length);
    };
  });

  d.css('display', '');
  console.log('stop');
});

form.append(search_button);
$('table:last').before(form);
