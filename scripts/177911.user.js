// ==UserScript==
// @name        RSDN: highlight first unread
// @namespace   Maxim.Yanchenko
// @description highlights first unseen msg
// @include     http://rsdn.ru/Forum/MainList.aspx
// @include     http://www.rsdn.ru/Forum/MainList.aspx
// @include     http://кывт.рф/Forum/MainList.aspx
// @include     http://www.кывт.рф/Forum/MainList.aspx
// @version     2.0.0
// @require     http://rsdn.ru/Scripts/jquery-1.8.1.min.js
// @installURL  http://userscripts.org/scripts/source/177911.user.js
// @updateURL   http://userscripts.org/scripts/source/177911.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$(function(){
var $answers = $( "#loggedHeaderPanel > a:nth-child(1) > b:nth-child(1) > font:nth-child(1)" );
var $timestamps = $( "#messageList td:nth-child(6)" );
if ( ! $timestamps.length ) return;

function get_set_value(name,def) {
  var ret = GM_getValue(name);
  if (ret === undefined) {
    ret = def;
    GM_setValue(name, ret);
  }
  return ret;
}

// get/reset last seen timestamp and answers
var last_answ = get_set_value("last_answers", "");
var last_seen = get_set_value("last_seen", "00.00 00:00");
var new_last_answ = $answers.first().text().trim();
var new_last_seen = $timestamps.first().text().trim();
GM_setValue("last_seen", new_last_seen);
GM_setValue("last_answers", new_last_answ);

if (new_last_answ != last_answ)
{
  // get color (use #15252E for RSDN@night)
  var bg_color = get_set_value("bg_color", "rgb(170,203,221)");
  $answers.first().parent().parent().attr('style', function(i,s) {
       return (s?s:"") + ' background-color: '+bg_color+ '!important'
  });
  
  var alert_on_new_msg = get_set_value("alert_on_new_msg", true);
  if (alert_on_new_msg)
    alert("Вам ответили!");
}

for (i=$timestamps.length;i;i--)
{
  $el = $($timestamps[i-1]);
  var t = $el.text().trim();
  if ( t.length == 11 && t > last_seen ) {
    // get color (use #15252E for RSDN@night)
    var bg_color = get_set_value("bg_color", "rgb(170,203,221)");

    // attr is the only way to pass "!important"
    $el.parent().find('*').attr('style', function(i,s) {
       return (s?s:"") + ' background-color: '+bg_color+ '!important'
    });
    return;
  }
}
});
