// ==UserScript==
// @id             133828
// @name           百度贴吧楼层跳转
// @version        1.2
// @namespace      
// @author         nhnhwsnh
// @description    
// @include        http://tieba.baidu.com/p/*
// ==/UserScript==
if(typeof GM_getValue('gourl') === 'undefined'){          
    GM_setValue('gourl', '1');                                           
}
if(GM_getValue('gourl') != '1'){
    url = GM_getValue('gourl')
    GM_setValue('gourl', '1')
    window.location= url 
}
var JQueryDiv = document.createElement("div");
JQueryDiv.setAttribute("onclick", "return $;");
$ = JQueryDiv.onclick();
$('body').append('<span class="onekeygo">GO!</span>');
$('span.onekeygo').attr('style', 'top: 20px; right: 0; z-index: 1000; position: fixed; color: blue;  font-size: 9pt; cursor: pointer;');
$('span.onekeygo')[0].addEventListener("click", go, false);

lcturl = window.location.href
slcturl = lcturl.match(/http:\/\/tieba\.baidu\.com\/p\/\d{1,}/g)[0]
var maxfloor = $('span.d_red_num').eq(0).text()


//if(lcturl.indexOf('?pn=') === -1){
//    lcturl = lcturl.match(/http:\/\/tieba\.baidu\.com\/p\/\d{1,}/g)[0]
//    curpage = 1
//}
//else{
//    lcturl = lcturl.match(/http:\/\/tieba\.baidu\.com\/p\/\d{1,}\?pn\=\d{1,}/g)[0]
//    slcturl = lcturl.match(/http:\/\/tieba\.baidu\.com\/p\/\d{1,}/g)[0]
//}

function go(){
    var floornum=prompt("去多少楼呢？(1 - "+maxfloor+")" ,"0")
    if(floornum === '0' || floornum === null){
        return
    }
    if(floornum%30===0){
        pn=floornum/30
    }
    else{
        pn = (floornum-floornum%30)/30+1
    }
    window.location=slcturl+"?pn="+pn+"##"+floornum
}

//var $floorlist = $('p.d_floor')
//for(i=0;i<$floorlist.length;i++){
//    if($floorlist.eq(i).text().indexOf(num+'楼') === 0){
//        floor=$floorlist.eq(i)
//        break;
//    }
//}
// if(i === $floorlist.length){
        //alert('在本页没有找到！')
//        return
//}
//$('html,body').animate({scrollTop: floor.offset().top}, 500);
