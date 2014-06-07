// ==UserScript==
// @name        贴吧帖子楼层直达
// @namespace   http://tieba.baidu.com/f?kw=chrome
// @description 可跳到帖子中存在的任意指定楼层
// @include     http://tieba.baidu.com/p/*
// @version     1
// ==/UserScript==

//获取楼层锚点，以备在本页直达或者翻页后跳转
var myanchors=function(){
var mydiv=document.querySelectorAll('div.l_post')
var aname=[]
var i=0
while (mydiv[i]){
aname.push(mydiv[i].querySelector('a.l_post_anchor'))
i++
}
return aname
}
var myanchor=new myanchors()

//获取特定ID元素的函数
var id=function(x){
    return document.getElementById(x)
}

//复制输入框和按钮的函数
var elecreation=function(ele,id1,type1,style1,value1,innerHTML1,torf){
    var y=document.createElement(ele)
    y.id=id1
    y.type=type1
    y.style.cssText=style1
    if (torf){
    y.value=value1
    y.innerHTML=innerHTML1
    }
    return y
}

//创建文本节点的函数
var text=function(z){
    return document.createTextNode(z)
}

//创建以上元素DIV父元素的函数
var creatediv=function(txtb,ipt,txta,btn){
var xindiv=document.createElement('div')
xindiv.style.cssText="width:145px;height:25px;float:right"
var xinarr=[]
xinarr.push(txtb,ipt,txta,btn)
for (var i=0;xinarr[i];i++){
    xindiv.appendChild(xinarr[i])
}
return xindiv
}

//创建页面顶部的各种元素
var txt1=text("跳到 ")
var txt2=text(" 楼 ")

var xinipt1=elecreation('input','xinipt1','text','width:30px;height:14px')
var xinbtn1=elecreation('button','xinbtn1','button','padding: 0 2px 0 2px;height:21px;line-height:15px','确定','确定',true)

var xindiv1=creatediv(txt1,xinipt1,txt2,xinbtn1)

//获取要添加以上元素的目标元素
var insert1=id('tofrs_up')
var insert2=id('thread_theme_3')

//如果第一目标元素已被删除或者不显示，直接添加到二号目标元素，否则对第一目标元素进行替换
if (!insert1 || insert1.style.display=="none"){
    insert2.appendChild(xindiv1)
}
else {
insert1.parentNode.replaceChild(xindiv1,insert1)
}

//同样的过程创建和添加页面底部的元素
var txt3=text("跳到 ")
var txt4=text(" 楼 ")

var xinipt2=elecreation('input','xinipt2','text','width:30px;height:14px')
var xinbtn2=elecreation('button','xinbtn2','button','padding: 0 2px 0 2px;height:21px;line-height:15px','确定','确定',true)

var xindiv2=creatediv(txt3,xinipt2,txt4,xinbtn2)

var insert3=id('thread_theme_4')

insert3.appendChild(xindiv2)

//获取最大页数，定义最大楼层（帖子数量）
var pgspan=insert2.querySelector('span.red')
var m=pgspan.innerHTML*30-1 

//检测输入框数值的函数
function check(n){
    if (n<0 || isNaN(n)){
        n=0
    }
    else if (n>m){
        n=m
    }
    return n
}

//同样为检测输入框数值的函数
function number(v){
    if (v!="" && !isNaN(v) && v>0){
    v=Number(v)
    }
    else {
        v=Number(0)
    }
    return v
}

//如果指定的楼层需要跳转页面，在载入楼层所在页面时调用之前保存的楼层数值，调用之后即刻删除
if (GM_getValue('fnum')!=undefined){
    if (myanchor.length>0 && GM_getValue('fnum')<myanchor.length){
    window.location.href+='#'+myanchor[GM_getValue('fnum')].name
    }
    GM_deleteValue('fnum')
}

//分配在两个按键上各自的功能函数
//获取按钮相邻的输入框，当前网址，把要跳转到的楼层数值减1并调用检测函数，定义楼层所在页面，以及楼层在该页的位置
//如果是在首页,地址中含有'#'符号（代表在首页使用过楼层直达），去掉此符号
//如果输入楼层数小于30，也就是首页楼层数的范围，直接到达；如果超过30，需要跳转页面的话，地址会变化成该楼层所在页地址
//如果未超出最大页数的尾楼层数，则根据计算确定楼层在页面的位置，并且保存为指定值以备调用
//如果不在首页，假如输入楼层根据计算位于本页，同样地址中含有'#'符号的话，去掉此符号
//根据计算，不跳转页面，直接到达
//否则必须跳转页面的话，先更换地址中的页数
//同样如果未超出最大页数的尾楼层数，则根据计算确定楼层在页面的位置，并且保存为指定值以备调用
//清空输入框，移除焦点
function tiefloor(a){
    a.addEventListener("click",function(){
        var iptele=a.parentNode.querySelector('input')
        var url=window.location.href
        var myvalue=check(iptele.value-1)
        var pgnum=parseInt(myvalue/30)+1
        var fnum=myvalue%30
        if (!url.match(/\?pn=.*/)){
            if (url.match('#.*')){
                url=url.split('#')[0]
            }
            if (myvalue<30){
                window.location.href=url+'#'+myanchor[myvalue].name
            }
            else {
                window.location.href=url+'?pn='+pgnum
                if (myvalue!=m){
                    GM_setValue('fnum',fnum)
                }
            }
        }
        else {
            if (pgnum==url.match(/\?pn=(\d+)/)[1]){
                if (url.match('#.*')){
                    url=url.split('#')[0]
                }
                window.location.href=url+'#'+myanchor[fnum].name
            }
            else {
                url=url.replace(/\?pn=.*/,"")
                window.location.href=url+'?pn='+pgnum
                if (myvalue!=m){
                    GM_setValue('fnum',fnum)
                }
            }
        }
        iptele.value=""
        iptele.blur()
    },false)
}

//两个按钮各自添加功能
var btnarr=[]
btnarr.push(xinbtn1,xinbtn2)
btnarr.forEach(tiefloor)

//焦点位于输入框时，回车等于点击相邻按钮
document.addEventListener('keydown',function(e){
    if (e.target==xinipt1 || e.target==xinipt2){
        if (e.keyCode==13){
            e.target.parentNode.querySelector('button').click()
            e.target.value=""
            e.target.blur()
        }
    }
},false)

//方便输入楼层数字的按键功能，为防止相关按键太过灵敏，设定为松开按键时触发功能
//如果焦点位于输入框时，启用以下几个按键功能
//方向键“上” 输入框中的数值乘以30，代表输入框中数值页面最后一楼
//"End"键 输入框中的数值加10
//"Home"键 输入框中的数值加5
//方向键“下” 输入框中的数值加1
//如果要到达某页的某层，比如说102页的27层，也就是正常情况下的3057楼
//可以在输入框中先输入101，然后按方向键“上”，此时的数值代表101页的最后一楼
//然后按两次“End”键，一次“Home”键，两次方向键“下”，输入框中的数值刚好为“3057”
//按下按钮或者回车，即可到达该帖的102层27楼（3057楼），当然前提是此楼必须存在                          
document.onkeyup=function(e){
    if (e.target==xinipt1 || e.target==xinipt2){
        switch (e.keyCode){
            case 38: e.target.value=number(e.target.value)*30
            break
            case 35: e.target.value=number(e.target.value)+10
            break
            case 36: e.target.value=number(e.target.value)+5
            break
            case 40: e.target.value=number(e.target.value)+1
            break
        }
        e.preventDefault()
    }
}
