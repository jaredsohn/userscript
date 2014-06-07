// ==UserScript==
// @name       淘宝自动好评(卖家版)
// @namespace  http://ooxx.me/
// @version    0.1
// @description  见钱眼开的淘宝把批量评价功能收费了,干
// @match      http://rate.taobao.com/remark_buyer.jhtml*
// @copyright  2012+, You
// ==/UserScript==

document.getElementById("rate-good-all").click();
document.getElementsByTagName('textarea')[0].textContent = '目睹了整个事件的猫先生称：“我活了25年，这位爷是我见过最虔诚的买家”。';
document.getElementById('rateListForm').submit();