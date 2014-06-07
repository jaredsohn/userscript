// ==UserScript==
// @name       QQ-Titian for Deng1993
// @namespace  http://1111hui.com/
// @version    0.1
// @description  QQ-Titian for Deng1993
// @match      http://gamevip.qq.com/act/a20140401lzhlxs/index.html?gameId=bns
// @copyright  2014+, You
// ==/UserScript==

var inter1;
var skipCookies = 0;	//0,不绕cookies只抢一次。1,绕过cookies重复抢
var answer = prompt ("输入日期,时间,亳秒:","2014,04,12,15,42,00,111");
if(answer=='')return;
var dateto = answer.split(',');	//日期,时间, 亳秒数
var currnow = new Date();
var theevent = new Date(dateto[0],dateto[1]-1,dateto[2],
                        dateto[3],dateto[4],dateto[5],dateto[6]);
var diff2 = (theevent - currnow);
if(diff2<0) return;
inter1=setTimeout(updateDiff, diff2)
alert('已启动'+diff2);
function updateDiff() {
    $('.m-pop').hide();
    $(".m-pop-mask").hide();
    if(skipCookies){
        amsSubmit(8055,CURRENT_GAME['ruleId']);
        inter1=setTimeout(updateDiff, 500)	//若绕过cookies, 隔0.5秒重复抢
    }else{
        $("#getGiftByGameId").click();
    }
}
