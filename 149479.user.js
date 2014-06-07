// ==UserScript==
// @name        NotiBubbles4Zhihu
// @namespace   http://
// @include     http://www.zhihu.com/*
// @version     0.10
// ==/UserScript==
var d=window.document;
var css=''
,maxNoti=20
,head=d.getElementsByTagName('head')[0]
,style=d.createElement('style');
style.type='text/css';
css+='div.uno.noti5{clear:both;vertical-align:middle;border:none;margin:0 auto;width:960px;position:relative;}';
css+='div.uno.noti5 .bubbleFrame{display:block;float:right;}';//width:20px;height:20px;}';
css+='div.uno.noti5 .bubbleFrame .bubble{text-align:center;display:block;width:1px;height:1px;margin:auto;position:relative;}';
css+='div.uno.noti5 .bubbleFrame .bubble:hover{text-decoration:none;}';
css+='div.uno.noti5 .noti{display:none;overflow:hidden;position:absolute;z-index:10;width:200px;margin-left:-180px;color:#000;text-decoration:none;text-align:center;}';
css+='div.uno.noti5 .noti .cusp{position:relative;display:block;margin-top:-5px;margin-left:185px;width:0px;height:0px;border:5px solid transparent;border-bottom-color:#ccc; }';
css+='div.uno.noti5 .noti .message{text-align:center;position:relative;display:block;background-color:#ccc;border-radius:5px;padding:5px;}';
css+='div.uno.noti5 .noti:hover{display:block;text-decoration:none;}';
css+='div.uno.noti5 .bubble:hover + .noti{display:block;}';
if(style.styleSheet){
    style.styleSheet.cssText = css;
}else{
    style.appendChild(d.createTextNode(css));
}
head.appendChild(style);
var uno_n=null;
var uno_iJump=[{h:10,v:0.00},{h:0,v:0.05},{h:10,v:0.10},{h:0,v:0.15},
               {h:10,v:0.20},{h:0,v:0.25},{h:10,v:0.30},{h:0,v:0.35},
               {h:10,v:0.40},{h:0,v:0.45},{h:10,v:0.50},{h:0,v:0.55},
               {h:10,v:0.60},{h:0,v:0.65},{h:10,v:0.70},{h:0,v:0.75},
               {h:10,v:0.80},{h:0,v:0.85},{h:10,v:0.90},{h:0,v:0.95}];
var uno_iOffsetC=[+1,+1,+2,+2,+3,+3,+4,+4,+5,+5,-5,+4,-4,+3,-3,+2,-2,+1,-1,0];
var uno_iOffsetD=[+1,1,+1,1,+1,1,+1,1,+1,1];
var _t=d.body.children[0]//top_banner
;
function resize(b,offset){
    var size=b.style.width;
    size=parseInt(size.substr(0,size.length-2));
    size+=offset;
    b.style.width=(size)+"px";
    b.style.height=(size)+"px";
    if(size>20){
        b.style.margin=(10-size/2)+"px";
    }
    b.children[0].style.width=(size)+"px";
    b.children[0].style.height=(size)+"px";
}
function playC(b){
    if(!b)return;
    var swell=parseInt(b.getAttribute('swellC'));
    if(isNaN(swell))swell=0;
    if(swell<uno_iOffsetC.length){
        var offset=uno_iOffsetC[swell];
        resize(b,offset);
        swell++;
        b.setAttribute('swellC',swell);
    }else if(swell-uno_iOffsetC.length<uno_iJump.length){
        var hv=uno_iJump[swell-uno_iOffsetC.length];
        var h=hv.h,v=window.innerHeight*(1-hv.v);
        b.parentNode.style.right=h+"px";
        b.parentNode.style.top=v+"px";
        if(v<=25)
            b.parentNode.style.position='';
        swell++;
        b.setAttribute('swellC',swell);
    }else{
        b.parentNode.style.position='';
        var iID=parseInt(b.getAttribute('playC'));
        if(!isNaN(iID)&&iID>0){
            clearInterval(iID);
            b.removeAttribute('playC');
        }
    }
}
function playD(b){
    if(!b)return;
    var swell=parseInt(b.getAttribute('swellD'));
    if(isNaN(swell))swell=0;
    if(swell<uno_iOffsetD.length){
        var offset=uno_iOffsetD[swell];
        resize(b,offset);
        swell++;
        b.setAttribute('swellD',swell);
    }else{
        var iID=parseInt(b.getAttribute('playD'));
        if(!isNaN(iID)&&iID>0){
            clearInterval(iID);
        }
        var n=b.parentNode;
        var renew=n.getAttribute('renew');
        if(renew&&renew!=""){
            n.children[1].children[1].innerHTML=renew;
            n.removeAttribute('renew');
            cBubble(n.children[0]);
        }else if(n.parentNode){
            var p=n.parentNode,q;
            p.removeChild(n);
            while(p!=uno_n){
                q=p;
                do{
                    p=p.nextSibling;
                }while(p.className!='uno noti5');
                q.insertBefore(p.children[p.children.length-1],q.children[0]);
            }
            if(q&&p.children.length==0){
                _t.removeChild(p);
                uno_n=q;
            }
        }
    }
}
function hitBubble(){
    var id=this.parentNode.getAttribute('nid');
    var nDiv=d.getElementById(id);
    if(nDiv==null)return;
    nDiv.parentNode.children[0].click();
}
function cBubble(b){
    b.style.width='0px';
    b.style.height='0px';
    b.children[0].style.width='10px';
    b.children[0].style.height='10px';
    b.parentNode.style.position='absolute';
    b.parentNode.style.top=window.innerHeight+"px";
    b.parentNode.style.right="0px";
    b.setAttribute('swellC',0);
    var iID=setInterval(playC,50,b);
    b.setAttribute('playC',iID);
}
function dBubble(b){
    b.setAttribute('swellD',0);
    var iID=setInterval(playD,50,b);
    b.setAttribute('playD',iID);
}
function newBubble(id,html,index){
    var uns=d.getElementsByName('uno_noti5');
    for(var h=0;h<uns.length;h++){
        var un=uns[h];
        for(var i=0;i<un.children.length;i++){
            var n=un.children[i];
            var nid=n.getAttribute('nid');
            if(nid&&nid==id){
                if(n.children[1].children[1].innerHTML!=html){
                    n.setAttribute('renew',html);
                    if(n.getAttribute('updated'))
                        n.removeAttribute('updated');
                }
                if(n.getAttribute('del'))
                    n.removeAttribute('del');
                return;
            }
        }
    }
    var n=document.createElement("div");
    n.setAttribute('nid',id);
    n.className='bubbleFrame';
    n.innerHTML="<a href='#' class='bubble'><img width='100%' height='100%' src='http://i.imgbox.com/abc3Yu92.png' border='0'/></a><div class='noti'><span class='cusp'></span><div class='message' href='#'>"+html+"</div></div>";
    n.setAttribute('updated','1');
    if(index==undefined)
        index=uno_n.children.length;
    if(index==maxNoti){
        var l=uno_n.nextSibling;
        uno_n=d.createElement('div');
        uno_n.setAttribute('name','uno_noti5');
        uno_n.className='uno noti5';
        if(l==null){
            _t.appendChild(uno_n);
        }else{
            _t.insertBefore(uno_n,l);
        }
        index=0;
    }
    if(index==0)
        uno_n.appendChild(n);
    else{
        uno_n.insertBefore(n,uno_n.children[0]);
    }
    n.children[0].onclick=hitBubble;
    cBubble(n.children[0]);
}
function delBubble(id){
    var uns=d.getElementsByName('uno_noti5');
    for(var h=0;h<uns.length;h++){
        var un=uns[h];
        for(var i=0;i<un.children.length;i++){
            var n=un.children[i];
            var nid=n.getAttribute('nid');
            if(!nid||nid==""){
                dBubble(n.children[0]);
            }else if(nid==id){
                n.setAttribute('del','1');
                if(n.getAttribute('renew'))
                    n.removeAttribute('renew');
                if(n.getAttribute('updated'))
                    n.removeAttribute('updated');
            }
        }
    }
}
function updateBubbles(c,tnc){
    var uns=d.getElementsByName('uno_noti5');
    for(var h=0;h<uns.length;h++){
        var un=uns[h];
        for(var i=0;i<un.children.length;i++){
            var n=un.children[i];
            var nid=n.getAttribute('nid');
            var del=n.getAttribute('del');
            var renew=n.getAttribute('renew');
            var updated=n.getAttribute('updated');
            if(c==0||(!updated&&(del||renew))){
                dBubble(n.children[0]);
                n.setAttribute('updated','1');
            }
        }
    }
}
if(_t){//html/body/div/div/div[3]/div[2]/div/div[4]/div/div/div/div
    var _tnc,_tnl=_t.children[0]
    ,_tnl=_tnl?_tnl.children[3]:null
    ,_tnc=_tnl?_tnl.children[0]:null
    ,_tnl=_tnl?_tnl.children[1]:null
    ,_tnl=_tnl?_tnl.children[0]:null
    ,_tnl=_tnl?_tnl.getElementsByTagName('ul')[0]:null
    ,_tnc=_tnc?_tnc.children[2]:null
    ,_tnc=_tnc?_tnc.children[0]:null
    ,_tnc=_tnc?_tnc.children[0]:null
    ,cNoti=0
;
    if(_tnl){
        _tnc.addEventListener("DOMSubtreeModified",function(){
            var c=0;
            if(_tnc)c=parseInt(_tnc.innerHTML);
            if(isNaN(c))c=0;
            updateBubbles(c,_tnl);
        });
        _tnl.addEventListener("DOMNodeInserted",function(){
            var n=arguments[0].target,n=n.getElementsByTagName('div'),n=n.length>0?n[0]:null;
            if(n&&n.id!="")//alert('add'+n.innerHTML);//
                newBubble(n.id,n.innerHTML);
        },false);
        _tnl.addEventListener("DOMNodeRemoved",function(){
            var n=arguments[0].target,n=n.getElementsByTagName('div'),n=n.length>0?n[0]:null;
            if(n&&n.id!="")//alert('del'+n.innerHTML);//
                delBubble(n.id);
        },false);
        uno_n=d.createElement('div');
        uno_n.setAttribute('name','uno_noti5');
        uno_n.className='uno noti5';
        _t.appendChild(uno_n);
        var ns=_tnl.getElementsByTagName('div');
        for(var i=0;i<ns.length;i++){
            var n=ns[i];
            if(n&&n.id!="")
                newBubble(n.id,n.innerHTML);
        }
        if(_tnc)cNoti=parseInt(_tnc.innerHTML);
        if(isNaN(cNoti))cNoti=0;
        updateBubbles(cNoti,_tnl);
    }
}
