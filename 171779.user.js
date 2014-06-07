// ==UserScript==
// @name           ZH Tail
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Very Good Tail.Hello!
// @version        1.4
// @include        http://bbs.kafan.cn/thread*
// @include        http://bbs.kafan.cn/forum.php?mod=viewthread&tid=*
// @include        http://bbs.kafan.cn/forum.php?mod=post&action=reply&fid=*
// @include        http://bbs.kafan.cn/forum.php?mod=post&action=newthread&fid=*
// @include        http://bbs.fsllq.com/forum.php?mod=*     
// @copyright      2013+, Yulei
// ==/UserScript==

(function() {
var node = document.createElement("div");
node.setAttribute("onclick", "return window;");
var unsafeWindow = node.onclick();
if (unsafeWindow == window || typeof unsafeWindow == 'undefined') {
    window.onload = GTail();
    return;
}
//无法使用unsafeWindow时将代码附到页面里执行
function GTail() {
    var script = document.createElement('script');
    var jsstring = go.toString() + "\ngo(true, window);";
    script.innerHTML = jsstring;
    document.body.appendChild(script);
}

function go(label, unsafeWindow) {
    var $ = unsafeWindow.$;
    var bar=document.querySelector('.bar'),e6=document.querySelector('#e_adv_6>p:nth-child(2)');
    var Psfm = $('postform'),Fps=$('fastpostform');
    var pos=Psfm || Fps;
    
    //插入尾巴
    function MUA(P) { //Custom 为自定尾巴信息，各喜好修改！
        var Custom='[list][/list][float=left]\r\r\r\r\r\r[hr][size=1][/color][font=Impact][color=#008080]'+navigator.userAgent+'  ('+navigator.language+') \r————[size=5]I have not thought about living until yesterday.  [/size][/font][/color][/size][/float]';
        P.value +=Custom;
    }
    //截获提交
    function gform(pos) {
        var posn=pos.onsubmit;
        pos.onsubmit=function() {
            if ($('mUA').checked) MUA(pos.message);
            if ($('postsubmit')) return unsafeWindow.validate($('postform'));
            posn;
        }
    }
    gform(pos);
    //截获快捷键
    function mess(PS) {
        var fwin=$('fwin_reply');
        PS.onkeydown = function(e) {
            if (event.ctrlKey && event.keyCode == 13 || event.altKey && event.keyCode == 83) {
                if (Psfm) {
                    if ($('mUA').checked) MUA(PS);
                    unsafeWindow.ctlent(e ? e : event);
                } else if (fwin) {
                    location.href="javascript:$('postsubmit').click()";
                } else {
                    $('fastpostsubmit').click();
                }
            }
        }
    }
    //创建选项
    var Cbox='<input type="checkbox" id="mUA" style="border:1px solid #f6f; color:green; width:20px; height:20px;" title="加入签名(尾巴)" checked />';
    if (e6) {
        if (e6.innerHTML.indexOf("加入簽名(尾巴)") < 0) e6.innerHTML += Cbox;
        mess(pos.message);
    } else if (bar) {
        if (bar.innerHTML.indexOf("加入簽名(尾巴)") < 0) {
            if (document.querySelector('object#SWFUpload_0')) document.querySelector('.bar>.fpd').innerHTML += Cbox;
            else bar.innerHTML += Cbox;
        }
        mess(pos.message);
    }
    //劫持楼层回复
    var fre=document.querySelectorAll('.fastre');
    var len = fre.length;
    for (var i=0; fre[i]; i++) {
        fre[i].onclick = function() {
            unsafeWindow.showWindow('reply', this.href);
            setTimeout(function(){
                var pof=$('postform');
                document.querySelector('.bar').innerHTML +=Cbox;
                mess(pof.message);
                gform(pof);
            }, 1300);
        }
    }
    if (label) {
        setInterval(function(){
            fre=document.querySelectorAll('.fastre');
            if (fre.length == len) return;
            for (i=len; fre[i]; i++) {
                fre[i].onclick = function() {
                    unsafeWindow.showWindow('reply', this.href);
                    setTimeout(function(){
                        var pof=$('postform');
                        document.querySelector('.bar').innerHTML +=Cbox;
                        mess(pof.message);
                        gform(pof);
                    }, 1000);
                }
            }
        },3000);
    }
}
go(false, unsafeWindow);
})();

