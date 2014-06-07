// ==UserScript==
// @id tiebakuaisuhuifu
// @name tieba快速回复
// @version 20121015.1
// @namespace nhnhwsnh@tiebakuaisuhuifu
// @author nhnhwsnh
// @description
// @include http://tieba.baidu.com/*
// @run-at         document-end
// ==/UserScript==

//20121015.1更新了发表部分的代码，这次不会再有什么兼容问题了吧
//20121014.9最后一次尝试解决表情丢失的问题，以后不再跟进这个问题，
//20121014.8试图解决表情丢失的问题
//20121014.7可以插入多个个表情啦，请按照格式来插入表情
//20121014.6可以插入一个表情啦，请按照格式来插入表情，为了世界和平不再使用unicode回复
//                 感谢noe132的美化，再次感谢众多的前辈们~~~


var txt=[{ label: "顶一下",text: "顶一下"},
             { label: "挽下尊",text: "挽尊！"},
             { label: "码一个",text: "MARK"},
             { label: "水汪汪",text: "节约用水啊"},
             { label: "不明厉",text: "虽不明<img src='http://static.tieba.baidu.com/tb/editor/images/lt/lt_0012.gif'>但觉厉<img src='http://imgsrc.baidu.com/forum/pic/item/dce55f4e9258d1097485493bd158ccbf6d814d02.jpg'>"},
             { label: "TEST",text: "<img src='http://imgsrc.baidu.com/forum/pic/item/dce55f4e9258d1097485493bd158ccbf6d814d02.jpg'><img src='http://imgsrc.baidu.com/forum/pic/item/dce55f4e9258d1097485493bd158ccbf6d814d02.jpg'>"},
             ]
             //插入表情的方法：<img src='http://www.baidu.com/baidu.jpg'>//不要有多余的空格，我的正则学得不好，不想再改它啦

if(document.getElementById("lzonly")){

        for(i in txt){//  加载开始，，先加载一下，看能不能防止表情丢失
            a=creaElemIn('div', document.body);
            a.setAttribute('style', 'display:none');
            a.innerHTML=txt[i].text
        }//加载结束，如果不需要的话可以把这段删除

        var b, curtain, elem;
        b=creaElemIn('div', document.body);
        b.setAttribute('style', 'top: 40%; right: 45%; z-index: 100001; position: fixed;');
        b.setAttribute("id","qreply");
        b.style.display = 'none';
        for(i in txt){
            a=creaElemIn('div', b);
            a.innerHTML=txt[i].label
            a.setAttribute("class","qli");
            a.setAttribute('title', txt[i].text);
            a.setAttribute('style', 'margin : 5px;text-align: center; vertical-align: middle; cursor: pointer;');
            a.addEventListener('click', function(){closeme();huifu(this)}, false);
        }
        createhuifudiv();
}
function createhuifudiv(){
    tiebakuaisuhuifu = creaElemIn('div', document.body);
    tiebakuaisuhuifu.setAttribute('style', 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACzUlEQVRoge1YLWwUQRhdebKysrKyEnmuiiBrSKpRNSTIMySIClwFCaK6giCwRRPEGVLXBFFBjsBdKdc0N+8H0d3Ldm63e3edpWZfMmY3+33fm5nvzZvNsg4dOnTo0KHDLWz3bPdJHgA4IjmUNFMEkkOSwxDCIcmB7b7t3v8qcp4shLBbFGp7QjJIGpO8iYtuwJhkIHlO8nUrhQN4LmkqaQzgC4CPksYrFrosmbfJCZA8KyX5LelvC8XP4ycnsWYh46ZBclL1Ickr21ttEriKEp7lzTkoRt4v9w4AzwAcSfoRxb8EsNcmgaQJchJ3AOAoVfwFAiRvSB6kig9gn+TCqqaKX9kDIYTDLMsy2zuSRpKmtnds90i+zM+BafTZFMCJ7X4TAUmjVgkAOMmyLCN5Xpq1P5J+qlmlxiRfNBCYtU3g1Pa2pMvyDDcUfodEsRI1BNQqAZJDAHsRgaVB8grAfh2BpFJaU8CZ7b5qTmSSF4XfITkA8FUl+X10ApJGtrcqEg+rYgA4fcwVWHCVylUifmh7UhUjV6Uy7u0Bkje2N1IRGFUtQdU7klPbm0sQuC6cbetNXJbKOEFcWN3SxzFIXhTvaghMUxKIZ08kg+0egOPoeaVBU9TsAE4bCKQ7yOIGLM80yVeSQk3RtShbhdatBICTOgIhhN14dpfFfQQAHKcksOAWSU5y77OxxjVSJOdWIYRwGL1LahYzkoOKGuYyWNHkn8t3g6oxm82elOIvSGwIYTcZgRrLUNbxpyR/6dakXRcH1LJQdM7USfHasL1ToS53LjW2t233yzP7gNjpJDRPsrDPy1bgAXE3Sb5R5GKTKlAp2SQmIOlDyawdFz+tmkaxZUhOVaFgAD4lJ1B1mLWIcXxrezCqpLQtpNieVQTWvrysgZWVrBG2e5K+l2ZpIunbsvt+lQHgXSs/fHPJK5K8T56gQ4cOHTp0WAH/ABzbRzeNGju0AAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:55%;width:60px;height:60px;right:-40px;z-index:9999');
    tiebakuaisuhuifu.setAttribute("id","tiebakuaisuhuifu")
    tiebakuaisuhuifu.addEventListener('click', showhuifu, false);
    tiebakuaisuhuifu.addEventListener('mouseover', function(){ tiebakuaisuhuifu.style.opacity = 1; tiebakuaisuhuifu.style.right = '0';}, false);
    tiebakuaisuhuifu.addEventListener('mouseout', function(){ tiebakuaisuhuifu.style.opacity = 0.3; tiebakuaisuhuifu.style.right = '-40px';}, false);
}
function creaElemIn(tagname, destin) {
    var theElem = destin.appendChild(document.createElement(tagname));
    return theElem;
}

function showhuifu() {
    if (curtain) curtain.style.display = 'block';
    else {
        curtain = creaElemIn('div', document.body);
        curtain.innerHTML = 'Click to close me！';
        curtain.title = '';
        curtain.setAttribute('style', 'width: 100%; height: 100%; top: 0; left: 0; z-index: 100000; position: fixed; color: #888; background: black; text-align: right; opacity: 0.7;');
        curtain.addEventListener('click', closeme, false);
    }
    b.style.display = '';
}

function closeme() {
    b.style.display = 'none';
    curtain.style.display = 'none';
}



function huifu(div){
    str=div.title
    unsafeWindow.rich_postor._editor.editArea.focus()
    str=str.replace(/<img src='(.*?)'>/g,'<img src="$1" class="BDE_Image"  />')
    unsafeWindow.rich_postor._editor.editArea.innerHTML =  str;
    unsafeWindow.rich_postor._submit();
}



GM_addStyle(' \
    .huifulink:hover{color: red; background: blue;} \
    #qreply{ \
    border:1px solid rgba(255,255,255,0.6); \
    box-shadow:0 0 5px rgba(255,255,255,0.8); \
    background:rgba(255,255,255,0.6); \
    padding:3px; \
    } \
    .qli{ \
    border:1px solid #999; \
    background:-moz-linear-gradient(90deg,#C6D3E0,#D4E1EE); \
    background:-webkit-linear-gradient(90deg,#C6D3E0,#D4E1EE); \
    font-size:18px; \
    height:30px; \
    width:auto; \
    line-height:30px; \
    padding:0 12px; \
    color:#111; \
    border-radius: 40px 70px 30px 80px / 70px 60px 38px 20px; \
    -moz-transition:0.3s ease all; \
    -webkit-transition:0.3s ease all; \
    } \
    \
    .qli:hover{ \
    border-radius: 20px 20px 38px 20px / 70px 30px 10px 10px; \
    box-shadow:0 0 3px #777; \
    color:#111; \
    background:-moz-linear-gradient(90deg,#CFDCE9,#DFECF9); \
    background:-webkit-linear-gradient(90deg,#CFDCE9,#DFECF9); \
    } \
    .qli:active{ \
    box-shadow:0 0 3px #777 inset; \
    } \
');