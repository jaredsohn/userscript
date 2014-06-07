// ==UserScript==
// @name        More DTD range options
// @namespace   rulesy-d2n
// @include     http://d2n.duskdawn.net/map*
// @version     1
// ==/UserScript==

var option, position, select;
select = document.getElementById('show_range_dropdown');

option = document.createElement("option");
option.text = '10 AP range';
option.value = 'ap_range#10';
position = 14;
select.add(option, position);

option = document.createElement("option");
option.text = '11 AP range';
option.value = 'ap_range#11';
position = 15;
select.add(option, position);