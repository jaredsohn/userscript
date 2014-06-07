// ==UserScript==
// @name        yanwenzi
// @namespace   *
// @include     http://weibo.com/*
// @version     1
// @grant       none
// ==/UserScript==
var list = [
    "→_→",
    "_(:з”∠)_",
    "|∀ﾟ",
    "(´ﾟДﾟ`)",
    "(;´Д`)",
    "(｀･ω･)",
    "(=ﾟωﾟ)=",
    "| ω・´)",
    "|-` )",
    "|д` )",
    "|ー` )",
    "|∀` )",
    "(つд⊂)",
    "(ﾟДﾟ≡ﾟДﾟ)",
    "(＾o＾)ﾉ",
    "(|||ﾟДﾟ)",
    "( ﾟ∀ﾟ)",
    "( ´∀`)",
    "(*´∀`)",
    "(*ﾟ∇ﾟ)",
    "(*ﾟーﾟ)",
    "(　ﾟ 3ﾟ)",
    "( ´ー`)",
    "( ・_ゝ・)",
    "( ´_ゝ`)",
    "(*´д`)",
    "(・ー・)",
    "(・∀・)",
    "(ゝ∀･)",
    "(〃∀〃)",
    "(*ﾟ∀ﾟ*)",
    "( ﾟ∀。)",
    "( `д´)",
    "(`ε´ )",
    "(`ヮ´ )",
    "σ`∀´)",
    " ﾟ∀ﾟ)σ",
    "ﾟ ∀ﾟ)ノ",
    "(╬ﾟдﾟ)",
    "(|||ﾟдﾟ)",
    "( ﾟдﾟ)",
    "Σ( ﾟдﾟ)",
    "( ;ﾟдﾟ)",
    "( ;´д`)",
    "(　д ) ﾟ ﾟ",
    "( ☉д⊙)",
    "(((　ﾟдﾟ)))",
    "( ` ・´)",
    "( ´д`)",
    "( -д-)",
    "(>д<)",
    "･ﾟ( ﾉд`ﾟ)",
    "( TдT)",
    "(￣∇￣)",
    "(￣3￣)",
    "(￣ｰ￣)",
    "(￣ . ￣)",
    "(￣皿￣)",
    "(￣艸￣)",
    "(￣︿￣)",
    "(￣︶￣)",
    "ヾ(´ωﾟ｀)",
    "(*´ω`*)",
    "(・ω・)",
    "( ´・ω)",
    "(｀・ω)",
    "(´・ω・`)",
    "(`・ω・´)",
    "( `_っ´)",
    "( `ー´)",
    "( ´_っ`)",
    "( ´ρ`)",
    "( ﾟωﾟ)",
    "(oﾟωﾟo)",
    "(　^ω^)",
    "(｡◕∀◕｡)",
    "/( ◕‿‿◕ )\\",
    "ヾ(´ε`ヾ)",
    "(ノﾟ∀ﾟ)ノ",
    "(σﾟдﾟ)σ",
    "(σﾟ∀ﾟ)σ",
    "|дﾟ )",
    "┃電柱┃",
    "ﾟ(つд`ﾟ)",
    "ﾟÅﾟ )　",
    "⊂彡☆))д`)",
    "⊂彡☆))д´)",
    "⊂彡☆))∀`)",
    "(´∀((☆ミつ"

];


var btn = '\
    <a class="S_func1 ndd_ascart_btn" action-type="plugin" href="javascript:void(0);" title="颜文字">\
        <i class="W_ico16 icon_sw_face"></i>\
        颜文字\
    </a>\
';
var WLayer = '\
<div class="W_layer" node-type="outer" id="layer_[[mc]]" style="visibility: visible; left: 355px; top: 247px;">\
    <div class="bg">\
        <table border="0" cellspacing="0" cellpadding="0">\
            <tbody>\
                <tr>\
                    <td>\
                        <div class="content" node-type="layoutContent">\
                            <a class="W_close" href="javascript:void(0);" node-type="close" title="关闭">\
                            </a>\
                            <div node-type="inner">\
                                <div node-type="outer" id="layer_1385891631447249">\
                                    <div class="profile_tab layer_tab S_line5">\
                                        <ul class="pftb_ul layer_tab S_line1">\
                                            <li class="pftb_itm_lst pftb_itm S_line1">\
                                                <a href="javascript:void(0);" class="pftb_lk current S_line5 S_txt1 S_bg5" node-type="general">┃電柱┃</a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                    <div class="layer_faces">\
                                        <div class="tab_nosep">\
                                            <span class="right">\
                                            <!-- TODO:分页这个功能... -->\
                                            </span>\
                                        </div>\
                                        <div class="detail">\
                                            <ul class="faces_list clearfix" node-type="hotFace">\
                                                [[face_list]]\
                                            </ul>\
                                            \
                                            <div class="W_pages_minibtn" node-type="page"></div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </td>\
                </tr>\
            </tbody>\
        </table>\
        <div class="arrow arrow_t" node-type="arrow" style="left: 330px;"></div>\
    </div>\
</div>\
';//<div class="layer_faces">\</div>
var layerFaces = '\
        <ul class="asc_list clearfix" node-type="hotFacez" style="display: none;">\
            [[face_list]]\
        </ul>\
\
';
var faceList = '\
    <li action-type="insert" text="[[face]]" style="width:58px;" action-data="text=[[face]]">>\
        [[face]]\
    </li>\
';

var LIStyle = '\
    .layer_faces .asc_list li {\
        cursor: pointer;\
        float: left;\
        border: 1px solid #e8e8e8;\
        height: 22px;\
        width: 26px;\
        overflow: hidden;\
        margin: -1px 0 0 -1px;\
        padding: 4px 2px;\
        text-align: center;\
    }\
    li {\
        list-style: none;\
    }\
    .layer_faces .asc_list {\
        margin: 0 0 0 6px;\
    }\
';
var STYLE = document.createElement("style");
STYLE.innerHTML = LIStyle;
document.body.appendChild(STYLE);

var face_list = "";
for(var n in list) {
    face_list += faceList.replace(/\[\[face\]\]/gi,list[n]);
}







var $$ = function(sele,_parent) {
    _parent = _parent || document
    var _nodeList = _parent.querySelectorAll(sele);

    _nodeList.each = function(callback) {
        for(var i=0;i<this.length;i++) {
            callback.call(this[i]);
        }
    }
    return _nodeList;
}

window.$a = $$;





















var temp = document.createElement("div");




var process = function(){
    console.log("LOADED");

    var W_layer = null;//node
    var input_detail = document.getElementsByClassName("input_detail")[0];
    var postKind;
    postKind = document.getElementsByClassName("kind_detail")[0];
    postKind.innerHTML += btn;

    btn = document.getElementsByClassName("ndd_ascart_btn")[0];//node
    btn.addEventListener("click",function(e) {
        if(W_layer) {
            W_layer.innerHTML = "";
        }
        var mc = +new Date();
        temp.innerHTML += WLayer.replace(/\[\[mc\]\]/gi,mc).replace(/\[\[face_list\]\]/,face_list);
        W_layer = temp.getElementsByTagName("*")[0];
        W_layer.getElementsByClassName("W_close")[0].addEventListener("click",function(){W_layer.style.display="none";});
        document.body.appendChild(W_layer);

        //W_layer Content
        W_layer.addEventListener("click",function(e) {
            var el = e.target;
            while(el!==W_layer) {
                if(el.getAttribute("action-type") === "insert") {
                    input_detail.value += el.getAttribute("text");
                    return;
                }
                el = el.parentNode;
            }
        });

    });
};
var ascBtn = null;
function domModi(node) {
    if(!node.querySelector("#asc_btn")) {
        var tab = node.querySelector("ul.pftb_ul.layer_tab.S_line1");
        tab.getElementsByClassName("pftb_itm_lst")[0].classList.remove("pftb_itm_lst");
        temp.innerHTML = '<li class="pftb_itm pftb_itm_lst  S_line1"><a href="javascript:void(0);" id="asc_btn" node-type="asc_art" class="pftb_lk __current S_line5 S_txt1 S_bg1">颜文字</a></li>';
        var asc_btn = temp.getElementsByTagName("*")[0];
        tab.appendChild(asc_btn);
        temp.innerHTML=layerFaces.replace(/\[\[face_list\]\]/,face_list)
        node.getElementsByClassName("detail")[0].appendChild( temp.getElementsByTagName("*")[0] );
        ascBtn = asc_btn;
    }


    ascBtn.addEventListener("click",function() {
        $$(".faces_list, .faces_magic_list",node).each(function(){this.style.display="none";})
        $$(".asc_list",node).each(function(){this.style.display="block";})
    });
    node.querySelector("[node-type='general']").addEventListener("click",function() {
        $$(".faces_list",node).each(function(){this.style.display="block";})
        $$(".faces_magic_list",node).each(function(){this.style.display="none";})
        $$(".asc_list",node).each(function(){this.style.display="none";})
    });
    node.querySelector("[node-type='magic']").addEventListener("click",function() {
        $$(".faces_list",node).each(function(){this.style.display="none";})
        $$(".faces_magic_list",node).each(function(){this.style.display="block";})
        $$(".asc_list",node).each(function(){this.style.display="none";})
    });
}

var timer = function() {
    if(!document.getElementsByClassName("kind_detail")[0]) {
        setTimeout(timer,900);
        console.log("转~");
    }
    else {
        //sina_hack开始
        var face_W_layer;
        //解除绑定
        window.STK.unRegister("common.editor.widget.face");
        //新浪微博编辑器表情选择器(绑定部分)
        window.STK.register("common.editor.widget.face",function(a) {
            return function(b) {
                var c={},d,e,f,g;
                g=a.parseParam({t:0,l:-15,useAlign:!1},b);
                var h=function(a,b) {
                    d.API.insertText(b.value);
                    e.getBub().hide()
                },
                i=function(){//onclick事件监听器
                    a.core.evt.preventDefault();
                    g.refer=d.nodeList.textEl;
                    e=a.common.bubble.face(d.nodeList[f],g);
                  //获取DOM
                    console.log("e::getBub()::getBox()",e.getBub().getBox());
                    console.log("d",d,"f",f);
                    face_W_layer = e.getBub().getBox();
                    domModi(face_W_layer);
                  //获取DOM结束
                    a.custEvent.add(e,"insert",h);
                    a.custEvent.fire(c,"show",e);
                    a.custEvent.add(e,"hide",function() {
                        a.custEvent.remove(e,"hide",arguments.callee);
                        a.custEvent.remove(e,"insert",h);
                        a.custEvent.fire(c,"hide",e)
                    });
                    //alert("hhhhh");
                };
                c.init=function(b,e,g) {
                    console.log("init caller",arguments.callee.caller.caller.toSource());
                    d=b;
                    f=e;
                    a.addEvent(b.nodeList[f],"click",i);
                    a.custEvent.define(c,"show");
                    a.custEvent.define(c,"hide")
                };
                c.clear=function(){};
                c.show=function(){};
                c.hide=function(){};
                c.destroy=function(){
                    d=null;
                    a.custEvent.undefine(c)
                };

                return c
            }
        });
        //sina_hack结束
        process();








    }
};
timer();

