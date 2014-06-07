// ==UserScript==
// @name        Baidu Tieba快速浏览帖子
// @namespace   http://tieba.baidu.com/f?kw=chrome
// @description 模仿googlecode的看帖模式
// @include     http://tieba.baidu.com/f*kw=*
// @include     http://tieba.baidu.com/p/*
// @version     14.04.22
// @grant       GM_addStyle
// ==/UserScript==
function resize(a,b,c,d,ele1,ele2,doc){
    var e=doc.documentElement;
    ele1.style.left=a+'px';
    ele1.style.top=b+'px';
    ele2.style.width=e.offsetWidth-a-d+'px';
    ele1.style.height=e.offsetHeight-b-c-10+'px';
    ele2.style.height=ele1.clientHeight-21+'px'
}
function sc(a1,b1,c1,d1){
    var e1=a1.classList;
    if (e1.contains('soc')){
        b1.preventDefault();
        c1.click()
    }
    else {
        e1.add('soc');
        if (d1)
            d1()
    }
}
function rfc(ele1,ele2,doc){
/*resize后面括号中前四个数字分别为小窗口与浏览器窗口左侧 顶端 下端以及右侧的距离，请自行替换调整相应数值来获取最佳效果*/
    var ref=document.getElementById('tab_forumname')||parent.document.getElementById('tab_forumname'),
        left;
    if(ref){
        var refl=ref.offsetLeft,
            refw=ref.offsetWidth;
        left=refl+refw>95?refl+refw:95
    }
    else
        left=95;
    resize(left,85,83,10,ele1,ele2,doc)
}
function w(ele1,ele2,doc){
    var m=ele1.classList.contains('ms');
    if (!m)
        resize(2,2,0,10,ele1,ele2,doc);
    else 
        rfc(ele1,ele2,doc);
    ele1.classList.toggle('ms')
}
function removecl(ele,cl){
    if (ele.classList.contains(cl))
        ele.classList.remove(cl)
}
var script=document.createElement('script'),
    code=document.createTextNode('if(!PageData.user.is_login)\n\tPageData.user.is_login=true');
script.type='text/javascript';
script.appendChild(code);
document.body.appendChild(script);
if (window.location.href.indexOf('http://tieba.baidu.com/f?')==0){
    var floatkj=document.createElement('div'),
        pgn,
        idf=function(x){
            return document.getElementById(x)
        };
    floatkj.id='floatdiv';
    floatkj.style.visibility='hidden';
    floatkj.style.opacity='1';
    floatkj.innerHTML='<div id="rq1" align="right" title="按ESC键终止载入，F5键刷新，M键切换窗口大小，Z键聚焦框架，X键聚焦窗口，小键盘4和6键分别向前后翻页">\
    <form id="tielistfm" name="tielistfm" style="float:left;margin-left:5px">\
    <select id="tielistsel" name="tielistsel" title="按S键切换帖子列表展开/收拢，执行选择按回车键(鼠标操作需点击展开列表)">\
    </select>\
    </form>\
    <img id="first" src="https://ssl.gstatic.com/codesite/ph/images/pagination-first.png" alt="第一帖(F键)"/>\
    <img id="previous" src="https://ssl.gstatic.com/codesite/ph/images/pagination-prev.png" alt="上一帖(P键)"/>\
    <img id="next" src="https://ssl.gstatic.com/codesite/ph/images/pagination-next.png" alt="下一帖(N键)"/>\
    <img id="last" src="https://ssl.gstatic.com/codesite/ph/images/pagination-last.png" alt="最后一帖(L键)"/>\
    <img id="kjclosebtn" src="https://ssl.gstatic.com/codesite/ph/images/close_icon.png" title="关闭(ESC键)" alt="关闭(ESC键)"/>\
    </div>\
    <iframe name="myifrm" id="kjfrm" scrolling="yes" frameborder="0" style="overflow:auto">\
    </iframe>';
    document.body.appendChild(floatkj);
    GM_addStyle('#floatdiv{background-color:rgb(255,255,255);width:auto;height:auto;border:outset 3px rgba(30,144,255,0.7);border-radius:5px;box-shadow:0px 0px 0px 4px rgba(128,128,128,0.7);z-index:10010}\
    #floatdiv,#tielistsel{position:fixed}\
    #rq1{background-image:linear-gradient(to bottom,rgb(6,76,107),rgb(0,67,90));background-color:rgb(6,76,107)}\
    #rq1>img{width:16px;height:16px;margin-left:5px;cursor:pointer}\
    #first{margin-left:0}\
    #tielistsel{-moz-appearance:none!important;background:none;background-color:rgba(255,255,255,0.7);color:rgba(0,0,0,0.9)}\
    #tielistsel>option{background-color:rgba(0,0,0,0.7);color:rgb(255,255,255)}\
    div.threadlist_rep_num{cursor: pointer !important}');
    var sylj=document.querySelectorAll('a.j_th_tit'),
        loc=location.href,
        ljArray=[],
        update=function(){
            if(document.querySelectorAll('a.j_th_tit').length>sylj.length||location.href!=loc){
                sylj=document.querySelectorAll('a.j_th_tit');
                loc=location.href;
                if(location.href!=loc)
                    ljArray=[];
                return true
            }
            else
                return false
        },
        tiefmsel=document.tielistfm.tielistsel,
        makeSel=function(lj){
            var tielistnames='',
                tiename=Array.prototype.reduce.call(lj,function(a,b,c){
                    var tn=c+1,
                        tnt=tn<10?'0'+tn:tn;
                    tielistnames+='<option>'
                    +tnt
                    +'&nbsp;&nbsp;'
                    +b.innerHTML
                    +'&nbsp;&nbsp;&nbsp;'
                    +b.parentNode.parentNode.parentNode.parentNode.querySelector("div.threadlist_rep_num").innerHTML
                    +'回复&nbsp;BY&nbsp;'
                    +b.parentNode.nextElementSibling.firstElementChild.title.split(':')[1].trim()
                    +'</option>';
                    return tielistnames
                },tielistnames);
            tiefmsel.innerHTML=tiename;
            tiefmsel.selectedIndex=pgn?pgn:0
        };
    makeSel(sylj);
    function addListener(lj){
        Array.prototype.forEach.call(lj,function(link,index){
            if(ljArray.indexOf(link)>-1)
                return;
            ljArray.push(link);
            var scutdiv=link.parentNode.parentNode.parentNode.parentNode.querySelector('div.threadlist_rep_num');
            scutdiv.addEventListener('mouseover',function(){
                if (kj.src==link.href)
                    return;
                if (floatkj.style.visibility!='visible')
                    floatkj.style.visibility='visible';
                if (floatkj.classList.contains('ms')){
                    rfc(floatkj,kj,document);
                    floatkj.classList.remove('ms')
                }
                if(floatkj.style.opacity=='0.3')
                    floatkj.style.opacity='1';
                removecl(floatkj,'soc');
                kj.src=link.href;
                tiefmsel.selectedIndex=pgn=index;
                panp()
            },false)
        })
    }
    addListener(sylj);
    function check(c){
        if (c<0) 
            c=sylj.length-1;
        else if (c==sylj.length) 
            c=0;
        return c
    }
    function page(n){
        removecl(floatkj,'soc');
        kj.src=n.name;
        switch (n){
            case ljf: pgn=0;
            break;
            case ljp: pgn=check(pgn-1);
            break;
            case ljn: pgn=check(pgn+1);
            break;
            case ljl: pgn=sylj.length-1;
            break
        }
        panp();
        tiefmsel.selectedIndex=pgn
    }
    function closefrm(){
        if (floatkj.style.visibility=='hidden')
            return;
        kj.src='';
        floatkj.style.visibility='hidden'
    }
    var kj=idf('kjfrm'),
        gbkj=idf('kjclosebtn'),
        chkxsh=document.querySelector('.wrap1'),
        ljf=idf('first'),
        ljl=idf('last'),
        ljp=idf('previous'),
        ljn=idf('next');
    function iw(){
        kj.contentWindow.focus()
    }
    kj.addEventListener('load',function(){
        if (!floatkj.classList.contains('soc'))
            floatkj.classList.add('soc');
        this.contentWindow.focus()
    },false);
    rfc(floatkj,kj,document);
    function panpage(btn,idx,ct1,ct2){
        btn.title=ct1+'一帖：'+sylj[idx].title+ct2+"键)";
        btn.name=sylj[idx].href
    }
    panpage(ljf,0,'第','(F');
    panpage(ljl,sylj.length-1,'最后','(L');
    function panp(){
        panpage(ljp,check(pgn-1),'上','(P');
        panpage(ljn,check(pgn+1),'下','(N');
        panpage(ljl,sylj.length-1,'最后','(L')
    }
    Array.prototype.forEach.call([gbkj,chkxsh,ljf,ljl,ljp,ljn],function(a){
        if (a==gbkj || a==chkxsh)
            a.addEventListener('click',closefrm,false);
        else 
            a.addEventListener('click',function(){
                page(this)
            },false)
    });
    tiefmsel.addEventListener('change',function(){
        if (!this.size){
            pgn=this.selectedIndex;
            removecl(floatkj,'soc');
            kj.src=sylj[pgn];
            panp();
            this.blur()
        }
    },false);
    tiefmsel.addEventListener('blur',function(){
        if (this.size){
            this.size=0;
            this.selectedIndex=pgn
        }
        iw()
    },false);
    document.addEventListener('keydown',function(e){
        function selcol(evt){
            var et=evt.target,
                colact=function(){
                    et.size=0;
                    et.blur()
                };
            if (et==tiefmsel)
                pgn=et.selectedIndex;
            if (kj.src==sylj[pgn]){
                colact();
                return
            }
            removecl(floatkj,'soc');
            kj.src=sylj[pgn];
            panp();
            colact()
        }
        if (floatkj.style.visibility=='visible')
            if (e.target.tagName.toLowerCase()!='input' && !e.target.hasAttribute('contenteditable'))
                switch (e.keyCode){
                    case 70: ljf.click();
                    break;
                    case 80: ljp.click();
                    break;
                    case 78: ljn.click();
                    break;
                    case 76: ljl.click();
                    break;
                    case 27: sc(floatkj,e,gbkj,iw);
                    break;
                    case 83: if(e.target==tiefmsel)e.target.blur();
                    break;
                    case 13: selcol(e);
                    break;
                    case 77: w(floatkj,kj,document);iw();
                    break;
                    case 90: if(floatkj.style.opacity=='0.3')floatkj.style.opacity='1';iw();
                    break
                }
    },false);
    setInterval(function(){
        if(update()){
            makeSel(sylj);
            addListener(sylj);
            panp();
        }
    },3000)
}
else if (window.top!=window.self){
    var id=function(x){
            return parent.document.getElementById(x)
        },
        a=document.querySelector('span.tP'),
        changeFocus=function(){
            var a=navigator.userAgent,
                b=/Chrome/,
                c=/Firefox/;
            if(id('floatdiv').style.opacity=='1')
                id('floatdiv').style.opacity='0.3';
            if (b.test(a))
                window.parent.focus();
            else if (c.test(a))
                parent.document.documentElement.focus()
        };
    document.addEventListener('keydown',function(e){
        var pd=parent.document;
        if (e.target.tagName.toLowerCase()!='input' && !e.target.hasAttribute('contenteditable'))
            switch (e.keyCode){
                case 70: id('first').click();
                break;
                case 80: id('previous').click();
                break;
                case 78: id('next').click();
                break;
                case 76: id('last').click();
                break;
                case 83: var tielistsel=id('tielistsel');tielistsel.size=pd.querySelectorAll('a.j_th_tit').length>20?20:pd.querySelectorAll('a.j_th_tit').length;tielistsel.focus();
                break;
                case 77: w(id('floatdiv'),id('kjfrm'),pd);
                break;
                case 116: removecl(id('floatdiv'),'soc');window.location.reload();e.preventDefault();
                break;
                case 27: sc(id('floatdiv'),e,id('kjclosebtn'));if (/Firefox/.test(navigator.userAgent) && pd.hasFocus(id('kjfrm')))id('kjfrm').blur();
                break;
                case 100: if (a && a.previousElementSibling){
                    removecl(id('floatdiv'),'soc');
                    a.previousElementSibling.click()
                }
                break;
                case 102: if (a && a.nextElementSibling){
                    removecl(id('floatdiv'),'soc');
                    a.nextElementSibling.click()
                }
                break;
                case 88: changeFocus();
                break
            }
    },false)
}