// ==UserScript==
// @id             133796
// @name           煎蛋妹子图标记器
// @version        1.2
// @namespace      
// @author         nhnhwsnh
// @description    支持小电影，一日一歌，妹子图，无聊图，还有发霉啦
// @include        http://jandan.net/ooxx*
// @include        http://jandan.net/pic*
// @include        http://jandan.net/fml*
// @include        http://jandan.net/m*
// @include        http://jandan.net/v*
// ==/UserScript==
var urls = [
                {url:'http://jandan.net/ooxx',numname:'nummark_ooxx'},
                {url:'http://jandan.net/pic',numname:'nummark_pic'},
                {url:'http://jandan.net/fml',numname:'nummark_fml'},
                {url:'http://jandan.net/m',numname:'nummark_m'},
                {url:'http://jandan.net/v',numname:'nummark_v'}
                ]
var JQueryDiv = document.createElement("div");
JQueryDiv.setAttribute("onclick", "return $;");
$ = JQueryDiv.onclick();
for(i=0;i<=urls.length;i++){
lcturl=document.location.href
url=urls[i].url
    if(lcturl.indexOf(url) === 0){
        Pnumname = urls[i].numname
        break;
    };
}

if(typeof GM_getValue(Pnumname) === 'undefined'){          
    GM_setValue(Pnumname, '111');                                           
}
shownum();
var $nums = $("span.righttext");
for(var i = 1; i < $nums.length-2; i++) {
    var $num = $nums.eq(i);
    var numtext = $num.text();
    if(numtext > GM_getValue(Pnumname)){
        $num.html("<a class='num_query' num=" + numtext + "><font color='blue'>" + numtext + "</font></a>");
        $num.children()[0].addEventListener("click", marknum, false);
        $num.css('color','blue')
        $num.css('cursor','pointer')
        $num.parent().css('background-color','rgb(194, 207, 239)')
    }
}
function marknum() {
        oldnum = $(this).attr('num')
        if(oldnum >= GM_getValue(Pnumname)){
            var $num_querys = $("a.num_query");
            for(var i = 0; i < $num_querys.length; i++) {
                var $num_query = $num_querys.eq(i);
                var num_querytext = $num_query.text();
                if(num_querytext <= oldnum){
                    $num_query.parent().css('color','rgb(187, 187, 187)')
                    $num_query.parent().css('cursor','')
                    $num_query.parent().parent().css('background-color','rgb(255, 255, 255)')
                }
                GM_setValue(Pnumname, oldnum)
                shwnum.innerHTML = GM_getValue(Pnumname)
            }
        }
}
function shownum() {
    shwnum = creaElemIn('div', document.body);
    shwnum.setAttribute('style', 'top: 0; left: 0;  position: fixed; color: black; font-size: 9pt;');
    shwnum.innerHTML =  GM_getValue(Pnumname)
}
function creaElemIn(tagname, destin) {
    var theElem = destin.appendChild(document.createElement(tagname));
    return theElem;
}