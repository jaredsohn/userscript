// ==UserScript==
// @name           班固米次元分界过滤器
// @version 0.1.1
// @uso:version  0.1.1
// @namespace      com.ruocaled.bangumi
// @description    把首页平铺模式的三次元和二次元通过tab分开浏览
// @include        http://bgm.tv/
// @include        http://bangumi.tv/


// ==/UserScript==

var 全部 = 0;
var 三次元 = 6;
var 动画  = 2;
var 书籍 = 1;


var 条目们 = document.getElementsByClassName('infoWrapper');
var 按钮们 = document.getElementById('prgCatrgoryFilter').getElementsByTagName('a');


for (var i = 0; i <按钮们.length; i++){
    if (按钮们[i].getAttribute('subject_type')){
        if (按钮们[i].getAttribute('subject_type') == 三次元 ){
            按钮们[i].addEventListener("click", function(){
                藏起来(条目们, 三次元);
            }, false);
        }
        else if  (按钮们[i].getAttribute('subject_type') == 动画){
            按钮们[i].addEventListener("click", function(){
                藏起来(条目们, 动画);
            }, false);

        }
        else if  (按钮们[i].getAttribute('subject_type') == 全部){
            按钮们[i].addEventListener("click", function(){
                藏起来(条目们, 全部);
            }, false);

        }
    }
}


function 藏起来(条目们, 条目类型){

    var 计数器 = 0;
    for (var i = 0; i <条目们.length; i++){
        条目们[i].style.display = 'block';
        if (条目类型 != 全部 && 条目们[i].getAttribute('subject_type') && 条目们[i].getAttribute('subject_type') != 条目类型 && 条目们[i].getAttribute('subject_type') != 书籍){
            条目们[i].style.display = 'none';
        }
        else if (条目们[i].getAttribute('subject_type') && 条目们[i].getAttribute('subject_type') != 书籍) {
            // 重置左右css
            计数器 ++;
            removeClass(条目们[i],'odd');
            removeClass(条目们[i],'even');
            if (计数器%2){
                addClass(条目们[i],'odd');
            }
            else {
                addClass(条目们[i],'even');
            }

        }

    }

}

//抄来的代码 出处：http://www.avoid.org/javascript-addclassremoveclass-functions/

function hasClass(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function removeClass(el, name)
{
    if (hasClass(el, name)) {
        el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
}

function addClass(el, name)
{
    if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}