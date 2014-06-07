// ==UserScript==
// @name           TwittSeven
// @namespace      http://phpz.org/
// @description    Auto-refresh Twitter timeline, keyboard shortcut controls and many more enhancements. (from TwittSeven Plus)
// @version        3.0.0
// @author         Seven Yu
// @author         modify by sfufoet(http://blog.loland.net/)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @require        http://gm.phpz.org/public/checkVersion.js
// ==/UserScript==


var waitForPreview = 0.5; // in reply to 预览延时 (单位:秒 sec)
var hide_refresh = getCookie('hide_refresh') || false
var enable_retweet_avatar = getCookie('enable_retweet_avatar') || true
var enable_shortcuts = getCookie('enable_shortcuts') || true
var enable_auto_refresh = getCookie('enable_auto_refresh') || true
var enable_auto_scroll = getCookie('enable_auto_scroll') || true
var checkMaxTimes = getCookie('checkMaxTimes') || 15;  // 最后访问点最多检测页数 (pages)

GM_addStyle(<><![CDATA[
.status, .direct_message {
    min-height: 60px;
}
.unread {
    background-color: #ff9;
}
.currenttweet {
    background-color: #eee;
}
.tome {
    background-color: #cff;
}
.ts_selected {
    background-color: #f00;
}
#ts_ltv {
    text-align: center;
    background-color: #eee;
}
.ts_ret {
    background-image: url("data:image/gif,GIF89a%10%00%10%00%B3%00%00%FF%FF%FF%F8%F8%F8%F1%F1%F1%EA%EA%EA%E4%E4%E4%D6%D6%D6%CF%CF%CF%C1%C1%C1%BB%BB%BB%FF%FF%FF%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1%A1!%F9%04%01%00%00%09%00%2C%00%00%00%00%10%00%10%00%00%04R0%C9I%2B-8g%9B%0A%F8%20%60%20%96%17~%06A%5E'%8A%BC%2C%60%82%C6H%81%C7%01%06%3C%A9a9%1D%AF%D7%09%1As%C3%80%EF%18D%04%04P%D2k%8A%C8!%A0%D8%95%04w%85%0E%BE%DA%84%E1%D3%15%7C%C1%941%80%E7%3D%87G%D4x%98c%89%00%00%3B");
    background-repeat: no-repeat;
    background-position:50% 50%;
    display:block;
    width:15px;
    height:15px;
    margin-right:1px;
    visibility:hidden;
}
.ts_ret:hover{
    background-image: url("data:image/gif,GIF89a%10%00%10%00%B3%00%00%FF%FF%FF%EF%EF%EF%E0%E0%E0%CF%CF%CF%BF%BF%BF%A0%A0%A0%90%90%90ppp%60%60%60%FF%FF%FF%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!%F9%04%01%00%00%09%00%2C%00%00%00%00%10%00%10%00%00%04R0%C9I%2B-8g%9B%0A%F8%20%60%20%96%17~%06A%5E'%8A%BC%2C%60%82%C6H%81%C7%01%06%3C%A9a9%1D%AF%D7%09%1As%C3%80%EF%18D%04%04P%D2k%8A%C8!%A0%D8%95%04w%85%0E%BE%DA%84%E1%D3%15%7C%C1%941%80%E7%3D%87G%D4x%98c%89%00%00%3B");
}
.ts_edt {
    padding: 3px 12px;
    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01uIDATx%DAb%FC%FF%FF%3F%03%25%80%05%9B%60WW%17%3ES%83%CB%CA%CA%D6%E14%00%A6%D9%C3%C3%83AOO%0F%9B%E1k%81%14%23%8C%CF%84%AE%19%A4%11%06%BE%7F%FF%CE%F0%F5%EBW%86%CF%9F%3F3%7C%FC%F8%11%2Cfmm%0D%A2%1A%808%09%88%C5%98%D05%03m%DD%02%13%FB%FB%F7%2F%18%FF%FB%F7%8F%81%85%05%E2%D8%85%D3%3B%19%D2b%FC%EA%81L9%20%F6a%04%05%22%BA%9F%A5%A5%A5_%EA%EA%EA%8A%CB%CB%CB%83%F9%CC%CC%CC%0C%8C%8C%8C%0C%85%E9%91%0C%BD%81%BF%C0b%C5%EB%D9%18f-%D9%D4%08%0F%03d%A7%03%81%B8%82%82%02%D8fl%9A%AF%BE%60b%B0P%F8%07v%09%DC%00P%80%81%FC%0A%D2%04%C2%20%A7%E3%D2%8C%0CPx0%3F%83%BC%05%D2%CC%C4%C4%C4P%94%11%85%A1%F9%DAs%26%86%13%0F%98%C0%5E%C0j%00%CCfB%9A%81%DCG%2C%D8%0C%E0%E0%E0%60(%CE%8Cfh%EC%F2f%F8%02%14%7F%B8~%23V%CD%40%BC%05%C5%05%7F%FE%FC%81G%1B%0C%DC%BC%F6%92%E1%87%BA%05%5Cs%7Cf9%03L3%10%BF%C2%EA%85_%BF%20%CE%AE%2F%DB%0A%A6o%5D%7F%05%B3%99%E1%D3%A7O%0C0%CD%18I%19f%00(6%60%60%D9%823%60%BA%B9w6%98%BE%7B%F7.%03L3%86%01%A0%B8%87%01%90m%D8%C0%B7o%DF%B0%E6F%3F%60j%DCDd%0E%F6C%E6%00%04%18%00%F2%D6%D5%AD%19%E2%F4N%00%00%00%00IEND%AEB%60%82");
    background-repeat: no-repeat;
    background-position: 50%;
}
.ts_refresh {
    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%E6IDATx%DA%A4SIOSQ%14%3E%F7%0D%1D%A0%94ZZl%11%11%A8%A0%88q%C1%03%C5H%D5%20*%91%18M%14%17%86%98%B8%E2%0F%B8%F1o%18%17.%DC%98%E8%02%E2%14c%0CA%A3%A2%C1%10%A5%04Q)%04(%16h%19J%A1%A5tz%C3%BD%9E%D7%A2%12V%26%BE%E4%CB%1D%DE%FD%BE%7B%BEs%CE%25%8C1%F8%9FO8zg%26%3F%11E%10%04%018%9E%B7%11B%BC%B8u%0A%D1%84(DL!%06%F1%B2%A7%94%D20%CF%F3%5D%B8%F6%BE%BBY%DA-%EC%10%AC%168v%AD%AA%CC%7C%A4%BC%D4%5Cg-%14%AAq%CF%9AH%AAu%0B%AB%99%96%99%F9%E4%15%CA%D8%A0%A6%AA%ED%BF%09%DC%1F*cn%83%C0%BC%1D%C7%9D%AE%CAR%B3%D5%40%88Q%91)%E8%10%09)%D8%E70%95%9For%9CV%91%DCy%C6-%E1%98%8F%9Cj%1A%60%C8%06%02Z%DD%B9F%97u%3D%9A%01%8D%03%3A%11%8C%87%E6%96R%11%DDB%85%AB%D0%D6P%BB%CB%13_W%E0%B2%D7%25m%C4%B3(%2C%E7%054E%D1%C7%92J%97%D5%12%5DI%02%E5%09y%F39%3C%8E%A2%1F8Ax%A5%E2%C1%400%7B7%10%5Ck%BE%DAV)-%2F%C4%C1b5%82%9A%CD%E6%05%E4%FC%C4b%2F%10%0CrV%A1%DF%E7c%8B%A8%DEO%08%8C%A8%A9%94%1E%5D%17%A2%F9zG%AD%94%88e%404%E8%AE%19%C8%BF%05%F4%1B%D0%BFb6%F2%11U%D5V%83s%D1%84F%B5%91%BC5%0EDQ%F4%EA%A5~%F0d%CC%B7%3D%DB(%9A%5B%0B%E9dR_%DC~%FE%FA%87%B4%B3%C6%94%A9%3E%24wc%D9%20w%11!R%AB%F7%40%91%88%A5%EA%7B%3B%1E%FC%1B%01%80%D4~%B1IJe%F2%99-)6%C2%B3%C7C%3E%14%FE%88u%CF%91E%83%A1aw%99%FDl4C%13TN%2F%2B%D9l8'%A0lyY%CC%00%AC%26%18T8L%D0%FBh%40%0Fo%08%C9%0F5%B4%82%0Dv%01%F3r%D2%E1%D9k%8E%82%90L%85%17e%E4mnO%22%C4y%03%D8%9C%26%18%8B)Ps%A9UZ%F92f%8B%CC%86%86%F1W%B2x%8FCv%D6%D7%A4%C3%9C)%E0.%12%C0%3F5%BF%A9)jt%BB%050ZL%F0%E9%5E%8F%AF%F2F%A74%2F3%E0%A5F%8F%FB%98%DE%C9%B0%91QY(DY%C0U%C8%81%AF%E7%E5%86%92L%FB%B1%E5sD%C29%0F%02%DFrkx%2Bo%7D%C4h%3C%E18%5C%BB_%F4T%D9%89%DD%5E%A0%0B%B0%E8Z%40%9E%9E%F1%C7%FC%D3c%CA%C2%B7%5E%3A%F9%22%40W%26%40%AF%8E%40%23%13%E5%B0%EC%1F%87l%7C%94%FA%EE%0Fp%A5%87%DE%2F%FDlk%81%92%9Az%E0D%FD-l%82%9A%F9%0A%AB%FEQ6%DD%3F%C9%D6gM%B8%E7D%AC!4%A2%3F%16%84%A8%DBA%F0%FF%F0%82%F5%D6M!%D2%18%01%FD%25%C0%002%B4l%A7%01%CA%5C%D4%00%00%00%00IEND%AEB%60%82");
    background-repeat: no-repeat;
}
.ts_read_all {
    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%B0IDATx%DA%A4%93_H%D3Q%14%C7%BFw%CE%3Fm%3A%B76%9C%AE%E9%5C%F3O%E6p%D3%E5D%C5%CAY4%5DRD!D%F4PB%3E%D4C%F4%10%88T%84%0F%BD%14%08%25%15%D5CA%05%9A%11m%A8%19hQ%1A%E9d%11%3A*MV%A6%88.%A7.%DD%FF%DB%FD%E5%7C%0A)%F0%07%1F%CE%E1%FC%BB%E7w%EE%B9%84R%8A%8D%7C%FC%D6z%1E%B8%12%5C%1D%0EBV%1D%9C%3C%7D%97b%BF%81%C0R%B4%EA%8B0%7CN%8A8%3E%CC%E1%08%9A%03A4%F1%FE%E3%90R%96w%87%83%E9%3BY!%F3%B2%0F%CDe%D5%87%0C%BFV%D0%CC%FFGr%96%D5N%0BZn%5D9%C9%B5%60%BD%D1(eI%E9F%D3.C%DB%FD%0E%7B(%BC~%07b%16%7F%86%C9%BDcc%E37%3B%DF%25%C2%3F3%83%9A%FA%8B%07%93%B4d%EA%C9%E3W%F6%C9Y4E%22%E8%E2%3A%88e%243d%8C4%96X%9C%20%14%17g%EA%CA%F4%23u%05j%9B%CD%8A%AA*3%3A%BB%FD%A8T%7D%C1%BEc%E7j%03%A1%AB6%96%EC%E3%E6%C2g%83%B9%90%20%94%14%C7%0BE%02A%92T%24K%CF%96K%E4JYp)%C0_%9At%A3%DA(%40%87%F5)L%26%0Bl%DD%CB%A8R%8F%C3t%E0%84%A5%BB%FD%DE%02%2B%D0%C7c%95z%BC%0B%F3%FE%5CcME%9A%C6%A0%F3yh%EA%C4%80%93%EF%9D%9D%87%40)%C1%CF%D1%EF%A8-Z%84%D5%DA%86%8A%0A%0B%9E%8F%A4a%D1%B5%88P%08%3C%06b%CC%3A%E2%EA%B7SO%7F%EF%60%5E%22%85B%98%2CDJ%B6%121q%B1%98v%7C%85D%93%8A%90%D7%8F%3C%F12%1E%BEt%20'%A7%04ug%2F%3F*%D7%B0%9B%A1%98X%BB%85%AEB-Y%99s%0F%9F%CF-%D5V%8F%0D%3B%C1%A7%3Cd%14d%C1%3B%E7%01%F5%85!V%C9q%3C%DF%03cC%5D%3B%8Boe%BF%FF%86%5B%99%18%C26f%C1%0Bh%14%C4%E5%18%A5%EE%C1%B7%1F%F2J%CAu%8A-%DB31%E5t!%E4%0FB%A4%94a%FE%D3%14%DA%9E%3DxmH%C7%B5%A1o%A4%2Fc3%F0%F1%07%5B%B8%B5%7BS%A7%10%A8%84%14%E5ZR%C9%E6%D2%98%9DS%BA'%C2%14%8D%3E%17s%2C%B9%AB%B7g%80m%DF%25%F7%0A%5EXG%08%D6%7D%02*)%C1n5%CCG%F21%D4y%FD0%BD%7Dj%07%3D%AA%C7%7B%D3V%98%E5I%7F%C7s%1Dp%CB%24d%88%18%5C%C8%26%CE%A6W%A0p%9B%14%0D%DC%FE%7Fv%A3%C51%8D%5Ef%0F0%FC%8C%60T%0F%93h%918F%7C%14~%D4%C6%F5%18%89%12f%84%A2r%8D%3F%3E%B2%D1%E7%FC%5B%80%01%00%9A%7F%1A%1D%97%5E0%8E%00%00%00%00IEND%AEB%60%82");
    background-repeat: no-repeat;
}
.auto_update {
    float: right;
    margin: 0 3px;
    padding: 5px 5px 5px 10px;
    background-color: #e8f7fa;
}
.auto_update a {
    margin: 0;
    text-decoration: none;
    padding: 3px 5px 3px 18px;
}
#update-submit {
    position: relative;
    z-index: 2;
}
#show_txt, #show_pic {
    color: #ddd;
    z-index: 1600;
    min-width: 4px;
    min-height: 4px;
    position: absolute;
    border: 5px solid #666;
    background-color: #333;
}
#show_txt hr {
    margin: 5px;
    clear: both;
    display: block;
}
#show_pic {
    line-height: 0;
    min-width: 16px;
    min-height: 16px;
}
#show_pic img {
    max-width: 300px;
    max-height: 200px;
}
#show_txt {
    padding: 6px;
    max-width: 350px;
    text-align: left;
    font-size: 1.2em;
    line-height: 1.4em;
}
#show_txt img {
    float: left;
    width: 50px;
    height: 50px;
    margin: 5px 10px 5px 5px;
}
#show_txt .status-body a {
    margin-right: 5px;
    color: #fff;
}
#show_txt .meta {
    color:#999;
    float: right;
    font-family:georgia;
    font-size:0.8em;
    font-style:italic;
}
#show_txt .meta a {
    color: #999;
}
#fly_state {
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
    z-index: 1500;
    padding: 10px;
    font-size: 18px;
    position: fixed;
    font-weight: bold;
}
#status_state {
    top:5px;
    right:5px;
    width: 10px;
    height: 10px;
    z-index: 1501;
    position: fixed;
       background-color: #fff;
}
#ts_setting_dialog {
    z-index: 1600;
    position: absolute;
    border: 5px solid #33CCFF;
    background-color: #FFF;
    text-align:left;
    padding:15px;
    line-height: 20px;
}
.msgtxt, .entry-content {
line-height: 20px;
}
.ts_loading {
    background: url(http://assets0.twitter.com/images/loader.gif) no-repeat right bottom;
}
]]></>);

// ----------------------------------------------------
var $, jQuery;
var frmStatus;
// 状态框
var interid, inReplyTimeId, stateTimeId, curScr;
var delid = 0, lastid = 0, unread = 0;
var runfirst = true, lastview, runtimes = 1;
var me_name = '';
var curScrollTop = 0;
var is_updating = false;
var title = 'Twitter', token = '';
var lastInReplyId = 0;
var rpc_data = {};
var STATUS_NOT_FOUND = 'No status found with that ID.<br />Perhaps it has been deleted.';
// resource
var img_icon = "data:image/gif,GIF89a%10%00%10%00%E6%00%00%F0%F3%F5%D9%EB%F4%FD%D1%04%9A%C0%D6%AE%D3%E4%BD%E5%FF%AE%DF%FFy%AEM%E7%F3%FC%FD%E4%04%7F%B6S%7D%B3Q%A9%DD%FF%7D%B4Q%BB%E4%FF%80%B7T%AD%DE%FF~%B4Q%C0%E6%FF%B5%E2%FF%84%BCX%C2%E7%FF%B3%E1%FF%B6%E2%FF%D5%DB%E4%7B%B1O%C7%E9%FF%AA%CD%DF)1C%7C%B2P%81%B8U%C4%E8%FF%A1%DA%FF%BE%E5%FF%A7%DC%FF%7C%B3Qy%B0N%7F%B5S%B7%E2%FE%97%D6%FF%AF%DF%FF%80%B6Sx%AFM%81%B9U%CB%CC%D1%AB%DE%FF%B0%E0%FF%B9%E3%FF%7D%B4R%CD%EB%FF~%B4S%7B%B1N%B2%D6%C2y%AFN%BA%E3%FF~%B4R%82%B9V%99%D7%FF%A0%D9%FF%B4%E1%FF%A4%DB%FF%9F%D9%FFz%B0My%AFM%B1%E0%FF%81%B7T%7B%B0O%B7%E2%FF%CA%EA%FF%BF%E5%FF%A8%DC%FF%AC%DE%FF%FF%E4%00z%B0Nz%B1O%83%BAW%9D%D8%FF%C4%E7%FF%A5%DB%FF%85%AC%C7AIYLYov%95%B2Uk%8B%DE%E8%F2%E6%EC%F4%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%07%CA%80V%82%83%84%85%82%01%04%04%1B%03%03O%8ER%90SR%82%04%01%08%01%98T%9A%9AU%18S%94%08H%09%02'9L%3AN%0C%06%00%9FV%1B%08%09%A3%3D%20%3CF-.%3BU%AD%03U%02%024%22%0CG(%16%26%0EUQ%82%BC%10%10%06%06%40%16%176%05%15%C8%82OU%13%13%17C%2F%0E%05%12M%1A%D6V%D8%05%05!E%12%15%1F%1AD1%E4%D8%07%075I%19%1D%0B%0D7%11UP%82RU%0E%FC%10%92a%81%8C%08%0AR%3C%A0%E2%CF%0A%40%15%24%94%8ChPBA%10%0F8%18%FE%03%E0c%C6%02%18%0A%1E%ACXB%81%02%80%86S0%00%A8%C2%92%E5%26%00%2C8%FC%9BBsJ%94%9BPrB%E1%90%CC%90%CFA%81%00%00%3B";
// template
var edt = '<a class="ts_edt" title="edit" href="javascript:void 0;">&nbsp;&nbsp;</a>';
var ret = '<a class="ts_ret" title="retweet" href="javascript:void 0;">&nbsp;&nbsp;</a>';
var rto = '<a class="ts_inreply" href="/{replyto}/status/{statusid}">in reply to {replyto}</a>'
var rttexteare = '<div id="status_update_box"><form action="http://twitter.com/status/update" class="status-update-form" id="status_update_form" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="182c60a2793cc284a4c7a0542aecf3731363e1f9" /></div><input id="tab_action" name="tab" type="hidden" value="index" /><input id="authenticity_token" name="authenticity_token" type="hidden" value="182c60a2793cc284a4c7a0542aecf3731363e1f9" /><input id="in_reply_to_status_id" name="in_reply_to_status_id" type="hidden" value="" /><input id="in_reply_to" name="in_reply_to" type="hidden" value="" /><input id="source" name="source" type="hidden" value="" /><input id="tab_action" name="tab" type="hidden" value="index" /><fieldset class="common-form standard-form"><div class="bar"><h3><label for="status" class="doing">What’s happening?</label></h3><span id="chars_left_notice" class="numeric"><strong id="status-field-char-counter" class="char-counter"></strong></span></div><div class="info"><textarea cols="40" rows="2" id="status" name="status" accesskey="u" autocomplete="off" tabindex="1"></textarea><div class="status-btn"><input type="submit" name="update" value="update" id="update-submit" class="status-btn round-btn" tabindex="2" /></div><div id="currently"><strong>Latest:</strong><span id="latest_status"><span id="latest_text"><span class="status-text"></span><span id="latest_meta" class="entry-meta"></span></span><span id="latest_text_full"><span class="status-text"></span><span class="entry-meta"></span></span></div></div></fieldset></form></div>'
loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init()
{
    $ = jQuery = unsafeWindow.jQuery;
    
    // This script modifies how avatars are displayed for Twitter's new Retweet
    // functionality into something that I think makes more sense: the retweeter's
    // avatar (whom you are following) is restored to the primary view, and an inset
    // is added for the retweet source.
    //
    // - @lhl
    //
    // Thanks Taylor (@gtmcknight) for the Twivatar pointer!
    //
    // TODO:
    // * BUG: after RT, "timeline-changed" event doesn't get triggered.  maybe need
    //        another bind then...
    // * RFE: allow swapping of inset avatar
    //
    // Changelog
    // ---
    // 2009-11-20 - v1.1.0 - Added option of swapping the inset avatar
    // 2009-11-20 - v1.0.2 - Changed RT parsing to a:href to fix "you" retweeted
    // 2009-11-19 - v1.0.1 - Changed border color of inset avatar to #666
    // 2009-11-19 - v1.0.0 - Initial Release
    // Author: Leonard Lin
    // Script from http://userscripts.org/scripts/review/62338

    retweet_avatar = {
      inset_retweeter: 0,
      rt: null,
      scan: function() {
        rt = $(".retweet-meta:not(.retweet-modified)");
        rt.each(retweet_avatar.update_tweet);
        // console.log("done w/ scan!");
      },
      update_tweet: function(i) {
        var friend = $(this).find("a").attr('href').slice(1);
        var friend_avatar = "http://twivatar.org/" + friend;
        var status = $(this).parent().parent();
        var thumb = status.find(".thumb");
        // console.log(thumb.html());

        if(retweet_avatar.inset_retweeter) {
          // The retweeter avatar is moved into the inset position
          thumb.after('<span class="thumb vcard author" style="border:1px solid #666; background:white; top:44px; left:26px; width:24px; height:24px"><a class="tweet-url profile-pic url" href="http://twitter.com/' + friend + '"><img class="photo fn" style="width:24px; height:24px" width="24" height="24" src="' + friend_avatar + '/mini"/></a></span>');
        } else {
          // The original source avatar is moved into the inset position
          thumb.before('<span class="thumb vcard author"><a class="tweet-url profile-pic url" href="http://twitter.com/' + friend + '"><img class="photo fn" width="48" height="48" src="' + friend_avatar + '"/></a></span>');
          thumb.css({"border":"1px solid #666", 
                     "background":"white",
                     "top":"44px",
                     "left" : "26px", 
                     "width" : "24px", 
                     "height" : "24px"});
          thumb.find("img").css({"width" : "24px", "height" : "24px"});
        }

        // Mark to not be redone on later scans
        $(this).addClass("retweet-modified");
        //console.log("done w/ update_tweet!");
      }
    }
    //end retweet_avatar

    //来自 http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
    //控制光标位置
    $.fn.selectRange = function(start, end) {
            return this.each(function() {
                    if(this.setSelectionRange) {
                            this.focus();
                            this.setSelectionRange(start, end);
                    } else if(this.createTextRange) {
                            var range = this.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', start);
                            range.select();
                    }
            });
    };
    me_name = $.trim($('#me_name').text());
    token = $('#authenticity_token').val();
    lastview = getCookie('ts_last') || 0;
    checkPage() && createUI() && bindEvents() && successHandler() && gotoLastView();
    if(enable_retweet_avatar === 'true')
        retweet_avatar.scan();
    if(enable_shortcuts === 'true')
        addShortcuts();
        
}

function checkPage()
{
    return 'home,replies,direct_messages,favorites,search,profile,profile_favorites,list_show'
           .indexOf(document.body.id) != -1;
}

function createUI()
{
    if($('#auto_update').size() > 0) return false;
    lastid = getLastId();
    $('<div id="show_txt" class="round"></div><div id="show_pic" class="round ts_loading"></div>').appendTo('body').hide();
    $('<div class="auto_update round" >' +
        '<a href="javascript:void 0;" class="ts_refresh" title="Refresh">Refresh</a> ' +
        '<a href="javascript:void 0;" class="ts_read_all" title="Mark all as read">Mark all as read</a>' +
        '</div>')
        .prependTo('#timeline_heading')
        .find('a').click(function()
        {
            this.blur();
            if(this.className == 'ts_refresh')
            {
                if(document.body.id == 'replies')
                    $('#replies_tab a').trigger('click');
                if(document.body.id == 'home')
                    $('#home_tab a').trigger('click');
            }
            else
            {
                unread = 0;
                $('.unread').removeClass('unread').removeClass('tome');
                document.title = document.title.replace(/\(\d+\)\s/g, '');
            }
        }).end();
    if(hide_refresh === 'true') $('.auto_update').hide();
    if(document.body.id == 'profile')
    {
        $('#content>.wrapper').prepend(rttexteare);
        $('#status_update_form').isUpdateForm();
    }
    // 入侵别人的 list页面。感觉没意义。
    //if(document.body.id == 'list_show')
    //    $('#content>.wrapper').prepend(rttexteare);
    frmStatus = $('#status_update_box');
    $('#status').css('height', '3.5em');
    $('<div id="fly_state"></div>').appendTo('body').hide();
    $('<div id="status_state" class="white"></div>').appendTo('body').hide();
    $('<div id="ts_setting_dialog"><label>' +
        '  <input type="checkbox" name="hide_refresh" id="hide_refresh" /> Hide &quot;Refresh&quot; and &quot;Mark all as read&quot;' +
        '</label><br />' +
        '<label>' +
        '  <input type="checkbox" name="enable_retweet_avatar" id="enable_retweet_avatar" /> Retweet avatar (Press F5 to reload)' +
        '</label><br />' +
        '<label>' +
        '  <input type="checkbox" name="enable_shortcuts" id="enable_shortcuts" /> Shortcuts (Press F5 to reload)' +
        '</label><br />' +
        '<label>' +
        '  <input type="checkbox" name="enable_auto_refresh" id="enable_auto_refresh" /> Auto refresh (Press F5 to reload)' +
        '</label><br />' +
        '<label>' +
        '  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="enable_auto_scroll" id="enable_auto_scroll" /> After refreshing, auto scroll down' +
        '</label><br />' +
        '  Stop check last visit, if pages &gt;<input type="text" name="checkMaxTimes" id="checkMaxTimes" size="6" />' +
        '<br /><input type="button" name="ts_save" id="ts_save" value="save" class="status-btn round-btn" style="margin-top:5px;"/>' + 
        '</div>')
    .appendTo('body').hide();
    $('.top-navigation').prepend('<li><a href="javascript:void 0;"  id="ts_setting">[TS Settings]</a></li>');
    $('#ts_setting').click(function(e){
        if($('#ts_setting_dialog').is(":hidden")){
            var offset = $(this).offset();
            $('#ts_setting_dialog').css({'left':offset.left, 'top':offset.top + 30}).show();
            if(hide_refresh === 'true') document.getElementById('hide_refresh').checked = true;
            if(enable_retweet_avatar === 'true') document.getElementById('enable_retweet_avatar').checked = true;
            if(enable_shortcuts === 'true') document.getElementById('enable_shortcuts').checked = true;
            if(enable_auto_refresh === 'true') document.getElementById('enable_auto_refresh').checked = true;
            if(enable_auto_scroll === 'true') document.getElementById('enable_auto_scroll').checked = true;
            $('#checkMaxTimes').val(checkMaxTimes);
        }else{$('#ts_setting_dialog').hide();}
    });
    $('#enable_auto_refresh').click(function(){
            if(!this.checked)
            {
                document.getElementById('enable_auto_scroll').checked = false;
            }
        });

    $('#ts_save').click(function(){
        $('#ts_setting_dialog').hide();
        updateSetting();
    });
    if(enable_auto_refresh === 'true')
        GM_addStyle('.minor-notification{display:none !important;}');
    return true;
}
function updateSetting(){
    if(document.getElementById('hide_refresh').checked) hide_refresh = 'true'; else hide_refresh = 'false';
    if(document.getElementById('enable_retweet_avatar').checked) enable_retweet_avatar = 'true'; else enable_retweet_avatar = 'false';
    if(document.getElementById('enable_shortcuts').checked) enable_shortcuts = 'true'; else enable_shortcuts = 'false';
    if(document.getElementById('enable_auto_refresh').checked) enable_auto_refresh = 'true'; else enable_auto_refresh = 'false';
    if(document.getElementById('enable_auto_scroll').checked) enable_auto_scroll = 'true'; else enable_auto_scroll = 'false';
    checkMaxTimes= $('#checkMaxTimes').val();
    setCookie('hide_refresh', hide_refresh, 60 * 60 * 24 * 15);
    setCookie('enable_retweet_avatar', enable_retweet_avatar, 60 * 60 * 24 * 15);
    setCookie('enable_shortcuts', enable_shortcuts, 60 * 60 * 24 * 15);
    setCookie('enable_auto_refresh', enable_auto_refresh, 60 * 60 * 24 * 15);
    setCookie('enable_auto_scroll', enable_auto_scroll, 60 * 60 * 24 * 15);
    setCookie('checkMaxTimes', checkMaxTimes, 60 * 60 * 24 * 15);
    if(hide_refresh === 'true') $('.auto_update').hide(); else $('.auto_update').show();
}
function bindEvents()
{
    $(window)
        .ajaxSuccess(successHandler)
        .ajaxError(function(e, XHR, settings)
        {
            if(XHR.status == '404')
            {
                var id = settings.url.split('/').pop().split('.')[0];
                setData('id_' + id, STATUS_NOT_FOUND);
                $('#show_txt').html(STATUS_NOT_FOUND).removeClass('ts_loading');
            }
        })
        .keydown(function(e)
        {
            if(e.altKey && e.which == 65)
            {
                var status = document.getElementById('status');
                status && status.focus();
            }
        })
        .scroll(function(e)
        {
            if(nearingBottom())
            {
                $('#more[class*=loading]').size() == 0 && $('#more').click();
                $('#search_more[class*=loading]').size() == 0 && $('#search_more').click();
            }
        })
        .mouseup(function(e)
        {
            if($.inArray(e.target.id, 'status,update-submit'.split(',')) != -1) return ;
            resetDelid();
            frmStatus.prependTo('#content>.wrapper');
        });
    $('fieldset').mouseup(function(e){e.stopPropagation();});
    $('.unread').live('mouseover', function(){$(this).removeClass('unread tome');unread--;checkUnread();});
    $('.ts_ret,.ts_edt,.reply')
        .live('mousedown', function(e)
        {
            curScrollTop = e.pageY - e.clientY;
        })
        .live('mouseup', setStatus);
    $('.hentry').live('mouseover', function(e)
    {
            $('.currenttweet').removeClass("currenttweet");
            $(this).addClass("currenttweet");
    });
    if(enable_shortcuts === 'true')
        $('.hentry:first-child').addClass("currenttweet");
    $(':input').keyup(function(e)
    {
        e.stopPropagation();
    });
    $('#status').keydown(function(e)
    {
        e.stopPropagation();
        if(e.ctrlKey && e.which == 13)
        {
            $('#update-submit').click();
        }
        if(e.which == 27)
        {
            $(window).mouseup();
        }
    });
    $('#status').focus(function () {
        $('#status_state').show();
    }).blur(function () {
        $('#status_state').hide();
        if($("#new_results_notification").data("count")>0 && enable_auto_refresh === 'true'){
            var UpdateTimeOut = setTimeout(function(){UpdateTimeline();clearTimeout(UpdateTimeOut);}, 1000);
        }
    });
    $('#status_update_form')
        .submit(function()
        {
            $('#status')[0].disabled = 'disabled';
            clearTimeout(stateTimeId);
            $('#fly_state').show().css('background-color', '#BE1414').html('Sending... '+$('#status').val());
            frmStatus.prependTo('#content>.wrapper');
            if(delid > 0)
            {
                $.post('/status/destroy/' + delid
                , {'authenticity_token': token}
                , function()
                {
                    $('#status_' + delid).fadeOut(function(){$(this).remove();resetDelid();});
                });
            }
        });
    $('.entry-meta>a:gt(0)[href*=/status/],.ts_inreply')
        .live('mouseover', function(e)
        {
            var id = this.href.split('/').pop();
            if(lastInReplyId > 0 && lastInReplyId <= id)
                return;
            if(lastInReplyId == 0)
            {
                var offset = $(this).offset();
                $('#show_txt').html('').css({'left':offset.left, 'top':offset.top});
            }
            inReplyTimeId = setTimeout(function()
            {
                showInReplyTo(id);
            }, 1000 * waitForPreview);
        })
        .live('mouseout', function()
        {
            clearTimeout(inReplyTimeId);
        });
    $('#show_txt')
        .mouseleave(function(){this.style.display = 'none';lastInReplyId = 0;});
    return true;
}

function showInReplyTo(id)
{
    var html = lastInReplyId == 0 ? '' : $('#show_txt').html() + '<hr />';
    lastInReplyId = id;
    if(getData('id_' + id))
    {
        html += getData('id_' + id);
        $('#show_txt').show().html(html).removeClass('ts_loading');
    }
    else
    {
        $('#show_txt').show().addClass('ts_loading');        
        $.getJSON('/statuses/show/' + id + '.json', function(data)
        {
            var reto = '';
            if(data.in_reply_to_status_id)
            {
                reto =  rto.replace(/\{replyto\}/g, data.in_reply_to_screen_name);
                reto = reto.replace(/\{statusid\}/g, data.in_reply_to_status_id);
            }
            var cont  = '<img src="' + data.user.profile_image_url + '" alt="' + data.user.screen_name + '" />' + 
                        '<span class="status-body">' +
                        '<strong><a href="/' + data.user.screen_name + '" title="' + data.user.name + '">' + 
                        data.user.screen_name + '</a></strong> ' +
                        textHandler(data.text) + '</span>' + 
                        '<span class="meta"><a href="/' + data.user.screen_name + '/status/' + data.id + '">' + 
                        getTime(data.created_at) + '</a> from ' + data.source + ' ' + reto + '</span> ';
            setData('id_' + data.id, cont);
            html += cont;
            $('#show_txt').show().html(html).removeClass('ts_loading');
        });
    }
}

function successHandler(e, XHR, settings)
{
    document.body.id == 'home' && setTimeout(function(){setCookie('ts_last', getLastId(), 60 * 60 * 24 * 15);}, 500);
    $('#fly_state').css('background-color', '#008000').html('Send completed.');
    stateTimeId = setTimeout(function(){$('#fly_state').fadeOut('slow');}, 3000);
    $('.actions:not(:has(.ts_ret))').find('div:eq(0)').append(ret);
    'sent,profile'.indexOf(document.body.id) == -1  && $('.mine:not(:has(.ts_edt))').find('.meta').append(edt);
    $('#loader').hide();
    settings && settings.url == '/status/update' && statusBlur();
    showImage();
    showTinyUrl();
    runfirst && settings && settings.url.indexOf('/home') != -1 && setTimeout(gotoLastView, 100);
    return true;
}

function gotoLastView()
{
    if(runfirst == false || lastview == 0 || document.body.id != 'home') return;
    var cat = '#ts_ltv', gostatus = $('#status_' + lastview);
    runfirst = gostatus.length == 0 && ++runtimes < checkMaxTimes;
    if(runfirst)
        $('#more[class*=loading]').size() == 0 && $('#more').click();
    else
    {
        gostatus.length > 0 
            ? gostatus.before('<li id="ts_ltv"><span class="meta">~~~~~~~ Last visit ~~~~~~~</span></li>') 
            : cat = '#footer';
        window.scrollTo(0, $(cat).offset().top - window.innerHeight + 60);
    }
}

function setStatus(e)
{
    e.stopPropagation();
    resetDelid();
    if(this.className == 'reply')
    {
           var base1 = $("li:hover").find('.status-body');
        var cont1 = base1.find('span').filter('.entry-content').html();
            cont1 = cont1.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
            cont1 = cont1.replace(/<img[^>]*>/gi, '');
            cont1 = cont1.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
            cont1 = cont1.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
            cont1 = cont1.replace(/<[^>]*>/gi, '');
        var    cont2 = cont1.match(/@[a-z0-9_]+/gi);
        var ReplayAll="";
        var x;
        for (x in cont2)
        {
            cont2[x]=cont2[x]+" ";
            ReplayAll=ReplayAll+cont2[x];
        }
        $('.currenttweet').after(frmStatus);
        setTimeout(function(){window.scrollTo(0, curScrollTop);}, 0);
        
        if(e.ctrlKey)
        {
            $('#status_update_box:visible').size()>0 ? $('#status').val(ReplayAll).focus() : location.href = '/home?status=' + urlencode(ReplayAll);
        }
        return;
    }
    $('.currenttweet').after(frmStatus);
    var base = $(this).closest('li').find('.status-body');
    var user
    if(document.body.id == 'profile')
        user = $('div.screen-name').html();
    else
        user = $('.currenttweet a.screen-name').html();
    var cont = base.find('span').filter('.entry-content').html();
        cont = cont.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
        cont = cont.replace(/<img[^>]*>/gi, '');
        cont = cont.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
        cont = cont.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
        cont = cont.replace(/<[^>]*>/gi, '');

    switch(this.className)
    {
        case 'ts_ret':
        {
            cont = cont.replace(/\s*rt:?\s*@/ig, ' > @');
            cont = cont.replace(/:\s+&gt;\s+@/ig, ' > @');
            cont = 'RT @' + user + ': ' + cont;
            break;
        }
        case 'ts_edt':
        {
            var relk = base.find('.meta a:contains(in reply to)');
            if(relk.length > 0)
            {
                $('#in_reply_to').val(relk.text().replace('in reply to ', ''));
                $('#in_reply_to_status_id').val(relk.attr('href').split('/').pop());
            }
            delid = base.find('.meta a.entry-date').attr('href').split('/').pop();
            break;
        }
        default:
        {
            break;
        }
    }
    $('#status_update_box:visible').size()>0 ? $('#status').val(cont).focus() : location.href = '/home?status=' + urlencode(cont);
    $('#status').selectRange(0,0);
}

function showTinyUrl()
{
    // bit.ly
    createTinyUrl('[href*=/bit.ly/]',
        'http://bit.ly/favicon.ico',
        function(shortUrl)
        {
            var hash = shortUrl.split('/').pop();
            var login  = 'dofy';
            var apiKey = 'R_19826aa48e46d889fc1bed17df804835';
            var url = 'http://api.bit.ly/expand?callback=?&version=2.0.1&shortUrl=' + hash + '&login=' + login + '&apiKey=' + apiKey;
            $.getJSON(url, function(data)
            {
                var result;
                if(data.errorCode == 0)
                {
                    result = data.results[hash].longUrl;
                }
                else
                {
                    result = data.errorMessage;
                }
                setData(shortUrl, result);
                $('#show_txt').removeClass('ts_loading').html(result);
            });
        })
}

function createTinyUrl(filter, icon, handler)
{
    $('.entry-content,.msgtxt')
        .filter(':not(:has(img))')
        .find(filter)
        .append('<img src="' + icon + '" />')
        .hover(function(e)
        {
            var offset = $(this).offset();
            var height = $(this).height();
            $('#show_txt').html('').css({'left':offset.left, 'top':offset.top + height});
            if(getData(this.href))
            {
                $('#show_txt').show().html(getData(this.href));
            }
            else
            {
                $('#show_txt').show().addClass('ts_loading');
                handler(this.href);
            }
        }, function(e)
        {
            $('#show_txt').hide();
        });
}

function showImage()
{
    // all image
    createImagePreview('[href$=.jpg],[href$=.jpeg],[href$=.gif],[href$=.png],[href$=.bmp]', img_icon);
    // twitpic
    createImagePreview(
        '[href*=twitpic.com]',
        'http://twitpic.com/favicon.ico',
        function(obj)
        {
            var imageid  = obj.href.split('/').pop();
            return obj.href.replace(imageid, 'show/thumb/' + imageid);
        });
}

function createImagePreview(filter, icon, previewurl)
{
    $('.entry-content,.msgtxt')
        .filter(':not(:has(img))')
        .find(filter)
        .append('<img src="' + icon + '" />')
        .hover(function(e)
        {
            var imgurl = previewurl ? previewurl(this) : this.href;
            $('#show_pic').css({'left':e.pageX+20, 'top':e.pageY})
                .show().html('<img src="' + imgurl + '" />');
        }, function()
        {
            $('#show_pic').hide();
        });
}

function getLastId()
{
    return getStatusId(0);
}

function getStatusId(index)
{
    return $('#timeline > li[id!=ts_ltv]')[index].id.replace('status_', '');
}

function selectStatus(index)
{
    var status = $('#status_' + getStatusId(index));
    var y = status.offset().top - window.innerHeight / 3;
    $('.ts_selected').removeClass('ts_selected');
    status.addClass('ts_selected');
    window.scrollTo(0, y);
}


function getTime(time)
{
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date(time.replace('+', 'GMT+'));
    return d.getHours() + ':' + d.getMinutes() + ' ' + m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function checkUnread()
{
    title = document.title.replace(/\(\d+\)\s/g, '');
    document.title = (unread > 0 ? '(' + unread + ') ' : '') + title;
    $("#new_results_notification").data("count",unread);
}

function statusBlur()
{
    var status = document.getElementById('status');
    if(status)
    {
        status.disabled = 'disabled';
        setTimeout(function(){$('#status')[0].disabled = '';}, 500);
    }
}

function resetDelid()
{
    delid = 0;
}

function textHandler(text)
{
    var reg_url = /((?:http|https|ftp|telnet|file)\:\/\/[^\s]+)/ig;
    var reg_rpl = /@([a-z0-9_]+)/ig;
    var reg_tag = /#([^\s]+)/ig;
    text = text.replace(reg_url, '<a href="$1" target="_blank">$1</a>');
    text = text.replace(reg_rpl, '@<a href="/$1">$1</a>');
    text = text.replace(reg_tag, '<a href="/search?q=%23$1">#$1</a>');
    return text;
}

function nearingBottom() {
    var viewportBottom = window.scrollY + window.innerHeight,
        nearNextPageLink = document.body.clientHeight - window.innerHeight/4;
    return viewportBottom >= nearNextPageLink
}

// Data
function setData(key, value)
{
    rpc_data[keyHandler(key)] = value;
}

function getData(key, value)
{
    return rpc_data[keyHandler(key)] || value;
}

function keyHandler(key)
{
    return key.replace('http://', '').replace(/\.|\-|\//g, '_');
}

// Cookie
function setCookie(sName, sValue, iTime){
    var date = new Date();
    date.setTime(date.getTime()+iTime*1000);
    document.cookie = escape(sName) + "=" + escape(sValue) + "; expires=" + date.toGMTString();
}

function getCookie(sName){
    var aCookie = document.cookie.split("; ");
    for (var i=0; i <aCookie.length; i++){
        var aCrumb = aCookie[i].split("=");
        if (escape(sName) == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

function delCookie(sName){
    var date = new Date();
    document.cookie = sName + "= ; expires=" + date.toGMTString();
}

// urlencode
function urlencode(str)
{
    // ! @   #   $   %   ^ &   *()_ +   - =   /   ?   ,   <.> ;   :   '"[{]}`~\|
    // ! %40 %23 %24 %25 ^ %26 *()_ %2B - %3D %2F %3F %2C <.> %3B %3A '"[{]}`~\|
    str = str.replace(/\%/ig, '%25');
    
    str = str.replace(/\#/g, '%23');
    str = str.replace(/\$/g, '%24');
    str = str.replace(/\&/g, '%26');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/\,/g, '%2C');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\:/g, '%3A');
    str = str.replace(/\;/g, '%3B');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/\@/g, '%40');
    return str;
}

function UpdateTimeline(){
    if($('#status_state').is(":hidden")){
        $("#content ol#timeline > li.buffered").addClass("unread").addClass("unbuffered").removeClass("buffered").each(function(){
                if(enable_auto_scroll === 'true')
                    $(window).scrollTop($(window).scrollTop()+$(this).outerHeight());
            });
        $("#content ol#timeline > li.unbuffered").removeClass("unbuffered");
        unread=$("#new_results_notification").data("count");
        if(enable_retweet_avatar === 'true')
            retweet_avatar.scan();
    }
}
// 监控标题，即时刷新
unsafeWindow.document.watch('title',
    function(prop, oldval, newval) {
        if(enable_auto_refresh === 'true')
            UpdateTimeline();
           return (newval);
    });



// 快捷键
function addShortcuts(){
        
    /**
     * http://www.openjs.com/scripts/events/keyboard_shortcuts/
     * Version : 2.01.B
     * By Binny V A
     * License : BSD
     */
    shortcut = {
        'all_shortcuts':{},//All the shortcuts are stored in this array
        'add': function(shortcut_combination,callback,opt) {
            //Provide a set of default options
            var default_options = {
                'type':'keydown',
                'propagate':false,
                'disable_in_input':true,
                'target':document,
                'keycode':false
            }
            if(!opt) opt = default_options;
            else {
                for(var dfo in default_options) {
                    if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
                }
            }

            var ele = opt.target;
            if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
            var ths = this;
            shortcut_combination = shortcut_combination.toLowerCase();

            //The function to be called at keypress
            var func = function(e) {
                e = e || window.event;
                
                if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                    var element;
                    if(e.target) element=e.target;
                    else if(e.srcElement) element=e.srcElement;
                    if(element.nodeType==3) element=element.parentNode;

                    if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                }
        
                //Find Which key is pressed
                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();
                
                if(code == 188) character=","; //If the user presses , when the type is onkeydown
                if(code == 190) character="."; //If the user presses , when the type is onkeydown

                var keys = shortcut_combination.split("+");
                //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
                var kp = 0;
                
                //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
                var shift_nums = {
                    "`":"~",
                    "1":"!",
                    "2":"@",
                    "3":"#",
                    "4":"$",
                    "5":"%",
                    "6":"^",
                    "7":"&",
                    "8":"*",
                    "9":"(",
                    "0":")",
                    "-":"_",
                    "=":"+",
                    ";":":",
                    "'":"\"",
                    ",":"<",
                    ".":">",
                    "/":"?",
                    "\\":"|"
                }
                //Special Keys - and their codes
                var special_keys = {
                    'esc':27,
                    'escape':27,
                    'tab':9,
                    'space':32,
                    'return':13,
                    'enter':13,
                    'backspace':8,
        
                    'scrolllock':145,
                    'scroll_lock':145,
                    'scroll':145,
                    'capslock':20,
                    'caps_lock':20,
                    'caps':20,
                    'numlock':144,
                    'num_lock':144,
                    'num':144,
                    
                    'pause':19,
                    'break':19,
                    
                    'insert':45,
                    'home':36,
                    'delete':46,
                    'end':35,
                    
                    'pageup':33,
                    'page_up':33,
                    'pu':33,
        
                    'pagedown':34,
                    'page_down':34,
                    'pd':34,
        
                    'left':37,
                    'up':38,
                    'right':39,
                    'down':40,
        
                    'f1':112,
                    'f2':113,
                    'f3':114,
                    'f4':115,
                    'f5':116,
                    'f6':117,
                    'f7':118,
                    'f8':119,
                    'f9':120,
                    'f10':121,
                    'f11':122,
                    'f12':123
                }
        
                var modifiers = { 
                    shift: { wanted:false, pressed:false},
                    ctrl : { wanted:false, pressed:false},
                    alt  : { wanted:false, pressed:false},
                    meta : { wanted:false, pressed:false}    //Meta is Mac specific
                };
                            
                if(e.ctrlKey)    modifiers.ctrl.pressed = true;
                if(e.shiftKey)    modifiers.shift.pressed = true;
                if(e.altKey)    modifiers.alt.pressed = true;
                if(e.metaKey)   modifiers.meta.pressed = true;
                            
                for(var i=0; k=keys[i],i<keys.length; i++) {
                    //Modifiers
                    if(k == 'ctrl' || k == 'control') {
                        kp++;
                        modifiers.ctrl.wanted = true;

                    } else if(k == 'shift') {
                        kp++;
                        modifiers.shift.wanted = true;

                    } else if(k == 'alt') {
                        kp++;
                        modifiers.alt.wanted = true;
                    } else if(k == 'meta') {
                        kp++;
                        modifiers.meta.wanted = true;
                    } else if(k.length > 1) { //If it is a special key
                        if(special_keys[k] == code) kp++;
                        
                    } else if(opt['keycode']) {
                        if(opt['keycode'] == code) kp++;

                    } else { //The special keys did not match
                        if(character == k) kp++;
                        else {
                            if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                                character = shift_nums[character]; 
                                if(character == k) kp++;
                            }
                        }
                    }
                }
                
                if(kp == keys.length && 
                            modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                            modifiers.shift.pressed == modifiers.shift.wanted &&
                            modifiers.alt.pressed == modifiers.alt.wanted &&
                            modifiers.meta.pressed == modifiers.meta.wanted) {
                    callback(e);
        
                    if(!opt['propagate']) { //Stop the event
                        //e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;
        
                        //e.stopPropagation works in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            }
            this.all_shortcuts[shortcut_combination] = {
                'callback':func, 
                'target':ele, 
                'event': opt['type']
            };
            //Attach the function with the event
            if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
            else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
            else ele['on'+opt['type']] = func;
        },

        //Remove the shortcut - just specify the shortcut and I will remove the binding
        'remove':function(shortcut_combination) {
            shortcut_combination = shortcut_combination.toLowerCase();
            var binding = this.all_shortcuts[shortcut_combination];
            delete(this.all_shortcuts[shortcut_combination])
            if(!binding) return;
            var type = binding['event'];
            var ele = binding['target'];
            var callback = binding['callback'];

            if(ele.detachEvent) ele.detachEvent('on'+type, callback);
            else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
            else ele['on'+type] = false;
        }
    }
    //回复
    shortcut.add("R",function() {
        if(document.body.id == 'profile')
            $('#status').val("@"+$('div.screen-name').html()+" "+$('#status').val().replace("@"+$('div.screen-name').html()+" ",""));
        else
            $('#status').val("@"+$('.currenttweet a.screen-name').html()+" "+$('#status').val().replace("@"+$('.currenttweet a.screen-name').html()+" ",""));
        $('#update-submit').val("reply")
        $('#in_reply_to').val($('.currenttweet a.screen-name').html());
        $('#in_reply_to_status_id').val($('.currenttweet a.entry-date').attr("href").match(/\d+/));
        $('.currenttweet').after(frmStatus);
        $("#status").focus();
    });
    //RT
    shortcut.add("Shift+R",function() {
        $(".currenttweet .ts_ret").trigger('mousedown').trigger('mouseup');
    });
    //收藏，加星
    shortcut.add("S",function() {
        $(".currenttweet .fav-action").trigger('click');
    });
    //选中下一个推
    shortcut.add("J",function() {
        if (!$('.currenttweet').is(":last-child")) {
            var cheight=$('.currenttweet').outerHeight();
            $('.currenttweet').removeClass("currenttweet").next("li").addClass("currenttweet");
            $(window).scrollTop($(window).scrollTop() + cheight);
            if($('.currenttweet').hasClass("unread"))
            {
                $('.currenttweet').removeClass('unread');
                unread--;
                checkUnread();
            }
        }
    });
    //选中上一个推
    shortcut.add("K",function() {
        if (!$('.currenttweet').is(":first-child")) {
            var cheight=$('.currenttweet').outerHeight();
            $('.currenttweet').removeClass("currenttweet").prev("li").addClass("currenttweet");
            $(window).scrollTop($(window).scrollTop() - cheight);
            if($('.currenttweet').hasClass("unread"))
            {
                $('.currenttweet').removeClass('unread');
                unread--;
                checkUnread();
            }
        }

    });
    //DM 当前
    shortcut.add("D",function() {
        $('#status').val("D "+$('.currenttweet a.screen-name').html()+" ");
        $('#update-submit').val("send")
        $('.currenttweet').after(frmStatus);
        $("#status").focus();
    });
    //打开当前推里面的链接
    shortcut.add("L",function() {
        $('.currenttweet .entry-content a').each(function(){
            var reg=/^\//;
            if(!reg.test($(this).attr('href')))    
                unsafeWindow.open($(this).attr('href'));
        });
    });
    //标记为已读
    shortcut.add("Shift+A",function() {
        unread = 0;
        $('.unread').removeClass('unread').removeClass('tome');
        document.title = document.title.replace(/\(\d+\)\s/g, '');
        checkUnread();
    });
    //A回复全部人
    shortcut.add("A",function() {
        $('#update-submit').val("reply")
        $('#in_reply_to').val($('.currenttweet a.screen-name').html());
        $('#in_reply_to_status_id').val($('.currenttweet a.entry-date').attr("href").match(/\d+/));
        $('.currenttweet').after(frmStatus);
        var cont1 = $('.currenttweet .entry-content').html();
            cont1 = cont1.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
            cont1 = cont1.replace(/<img[^>]*>/gi, '');
            cont1 = cont1.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
            cont1 = cont1.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
            cont1 = cont1.replace(/<[^>]*>/gi, '');
        var    cont2 = cont1.match(/@[a-z0-9_]+/gi);
        var ReplayAll="";
        var x;
        for (x in cont2)
        {
            cont2[x]=cont2[x]+" ";
            ReplayAll=ReplayAll+cont2[x];
        }
        $('#status').val("@"+$('.currenttweet a.screen-name').html()+" "+$('#status').val().replace("@"+$('.currenttweet a.screen-name').html()+" ","")+ReplayAll);
        $("#status").focus();
    });
    //把推发送出去之后，会在顶部提示正在发送的推的完整内容。方便发送失败的时候复制。

    //F 官方 RT 或者 undo
    shortcut.add("F",function() {
        if($('.currenttweet .undo'))
            $('.currenttweet .undo').trigger('click');
        if($('.currenttweet .retweet-link a')){
            $('.currenttweet .retweet-link a').trigger('click');
            $('.inline-form-buttons .btn').trigger('click');
        }
    });
    //快捷键 12345 对应 home，reply，DM，Fav，RT。模仿 GR 的快捷键。
    shortcut.add("1",function() {
        $('#home_tab a').trigger('click');
    });
    shortcut.add("2",function() {
        $('#replies_tab a').trigger('click');
    });
    shortcut.add("3",function() {
        $('#direct_messages_tab a').trigger('click');
    });
    shortcut.add("4",function() {
        $('#favorites_tab a').trigger('click');
    });
    shortcut.add("5",function() {
        $('#retweets_by_others_tab a').trigger('click');
    });

    //C 一键清理当前推以下的 tweets
    shortcut.add("C",function() {
        $('.hentry:gt('+($('.hentry').index($('li.currenttweet'))+6)+')').not($('.unread')).each(function(){
            $(this).remove();
        });
    });
/*
    shortcut.add("G",function() {
        alert($('.currenttweet').html());
    });
*/
}
/*
//G 跳转快捷键
shortcut.add("G",function() {
    shortcut.add("H",function() {
        $('#home_tab a').trigger('click');
    });
    shortcut.add("R",function() {
        $('#replies_tab a').trigger('click');
    });
    shortcut.add("D",function() {
        $('#direct_messages_tab a').trigger('click');
    });
    shortcut.add("S",function() {
        $('#favorites_tab a').trigger('click');
    });
    shortcut.add("F",function() {
        $('#retweets_by_others_tab a').trigger('click');
    });
    RemoveHokey = setTimeout(function(){
        shortcut.remove("H");
        shortcut.remove("R");
        shortcut.remove("D");
        shortcut.remove("S");
        shortcut.remove("F");
        clearTimeout(RemoveHokey);
    }, 3000);
});
*/

// check new version
var name = 'TwittSeven', version = '300';
checkVersion(name, version);