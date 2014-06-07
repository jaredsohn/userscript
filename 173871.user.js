// ==UserScript==
// @name        JVCMaster
// @namespace   http://www.jvcmaster.org/
// @description Ajoute des fonctionnalités à Jeuxvideo.com
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @exclude     http://www.jeuxvideo.com/jvchat*
// @run-at      document-end
// @updateURL   https://github.com/Kocal/JVCMaster/raw/master/JVCMaster.user.js
// @version     4.5.18
// ==/UserScript==

function JVCMaster(){
    var _ = this;
    _.version = "4.5.18";
    _.log = function(msg){ console.log(msg); }

    // localStorage
    _.LS_get = function(key){ return localStorage.getItem("JVCMaster_" + key); }
    _.LS_set = function(key, value){ localStorage.setItem("JVCMaster_" + key, value); }
    _.LS_rm  = function(key){        localStorage.removeItem("JVCMaster_" + key); }
    
    _.patternButton = "_BADGE:RANK__BTN:CITATION__BTN:HIDDENPOST__BTN:HIDDENPOSTSPSEUDO__BTN:MP_";

    // Un $("li.pseudo") aurait suffit, mais sur les MP, la zone était présente à côté de "Ce pseudo vient de quitter la conversation."
    _.pseudoArea = $(".msg").parent().find("li span:last-child:not(.generic), div[id^=message] ul").parent().find(".pseudo");

    _.activatedExtensions = JSON.parse(_.LS_get("activatedExtensions") || "[]");

    _.style = null;

    _.insertCSS = function(css){
        if(_.style)
            _.style.get(0).innerHTML += css;
        else
            _.style = $("<style>", { html : css}).appendTo("head");
    }

    _.setButtonsArea = function(){
        $("<span>", {
            "class" : "JVCMaster_patternButton"
          , html    : _.patternButton.replace(/_(BTN|BADGE):([a-zA-Z]*)_/g, "<span class='JVCMaster_$1_$2'>").replace(/'><span/g, "'></span><span")
        }).appendTo(_.pseudoArea);
    }

    _.setButton = function(type, btn, onMp){
        onMp = (onMp === undefined ? true : false);

        if(!onMp)
            $("div[id^=message] .JVCMaster_" + type).append(btn);
        else
            $(".JVCMaster_" + type).append(btn);
    }

    _.onMp = function(){ return window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/messages-prives\/message.php\?idd=[0-9]*/); }
    
    _.sortObject = function(e){var c={},d,b=[];for(d in e){if(e.hasOwnProperty(d)){b.push(d)}}b.sort();for(d=0;d<b.length;d++){c[b[d]]=e[b[d]]}return c};

    _.getSelectionHTML = function(){var d="";if(typeof window.getSelection!="undefined"){var e=window.getSelection();if(e.rangeCount){var b=document.createElement("div");for(var c=0,a=e.rangeCount;c<a;++c){b.appendChild(e.getRangeAt(c).cloneContents())}d=b.innerHTML}}else{if(typeof document.selection!="undefined"){if(document.selection.type=="Text"){d=document.selection.createRange().htmlText}}}return d};

    _.sha1 = function(e){function d(y,j){var i=(y<<j)|(y>>>(32-j));return i}function s(A){var z="";var j;var B;var y;for(j=0;j<=6;j+=2){B=(A>>>(j*4+4))&15;y=(A>>>(j*4))&15;z+=B.toString(16)+y.toString(16)}return z}function u(A){var z="";var y;var j;for(y=7;y>=0;y--){j=(A>>>(y*4))&15;z+=j.toString(16)}return z}function b(j){j=j.replace(/\r\n/g,"\n");var i="";for(var z=0;z<j.length;z++){var y=j.charCodeAt(z);if(y<128){i+=String.fromCharCode(y)}else{if((y>127)&&(y<2048)){i+=String.fromCharCode((y>>6)|192);i+=String.fromCharCode((y&63)|128)}else{i+=String.fromCharCode((y>>12)|224);i+=String.fromCharCode(((y>>6)&63)|128);i+=String.fromCharCode((y&63)|128)}}}return i}var h;var w,v;var c=new Array(80);var n=1732584193;var l=4023233417;var k=2562383102;var g=271733878;var f=3285377520;var t,r,q,p,o;var x;e=b(e);var a=e.length;var m=new Array();for(w=0;w<a-3;w+=4){v=e.charCodeAt(w)<<24|e.charCodeAt(w+1)<<16|e.charCodeAt(w+2)<<8|e.charCodeAt(w+3);m.push(v)}switch(a%4){case 0:w=2147483648;break;case 1:w=e.charCodeAt(a-1)<<24|8388608;break;case 2:w=e.charCodeAt(a-2)<<24|e.charCodeAt(a-1)<<16|32768;break;case 3:w=e.charCodeAt(a-3)<<24|e.charCodeAt(a-2)<<16|e.charCodeAt(a-1)<<8|128;break}m.push(w);while((m.length%16)!=14){m.push(0)}m.push(a>>>29);m.push((a<<3)&4294967295);for(h=0;h<m.length;h+=16){for(w=0;w<16;w++){c[w]=m[h+w]}for(w=16;w<=79;w++){c[w]=d(c[w-3]^c[w-8]^c[w-14]^c[w-16],1)}t=n;r=l;q=k;p=g;o=f;for(w=0;w<=19;w++){x=(d(t,5)+((r&q)|(~r&p))+o+c[w]+1518500249)&4294967295;o=p;p=q;q=d(r,30);r=t;t=x}for(w=20;w<=39;w++){x=(d(t,5)+(r^q^p)+o+c[w]+1859775393)&4294967295;o=p;p=q;q=d(r,30);r=t;t=x}for(w=40;w<=59;w++){x=(d(t,5)+((r&q)|(r&p)|(q&p))+o+c[w]+2400959708)&4294967295;o=p;p=q;q=d(r,30);r=t;t=x}for(w=60;w<=79;w++){x=(d(t,5)+(r^q^p)+o+c[w]+3395469782)&4294967295;o=p;p=q;q=d(r,30);r=t;t=x}n=(n+t)&4294967295;l=(l+r)&4294967295;k=(k+q)&4294967295;g=(g+p)&4294967295;f=(f+o)&4294967295}var x=u(n)+u(l)+u(k)+u(g)+u(f);return x.toLowerCase()};
    
    _.isPositiveInteger = function(val){ return val == "0" || ((val|0) > 0 && val % 1 == 0);}

    _.convertBadChars = function(str){
        return str.replace("<", "&lt;").replace(">", "&gt;");
    }

    _.onOverviewOfAPost = function(){
        return window.location.href == "http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi"
    }

    _.init = function(){
        _.setButtonsArea();

        // Bug sur les forumJV
        if(window.location.host.match(/\.forumjv\.com$/))
            $("h1 a").css("width", "initial");

        // Nouvelle interface de JVC, obligé de passer par du JS au lieu de CSS
        $("#connexion").css({
            textAlign    : "right"
          , paddingRight : "5px"
          , width        : "666px" // ok
        });

        /*
        ColorBox v1.3.20.1 - jQuery lightbox plugin
        (c) 2012 Jack Moore - jacklmoore.com
        License: http://www.opensource.org/licenses/mit-license.php */
        (function(e,t,n){function G(n,r,i){var o=t.createElement(n);return r&&(o.id=s+r),i&&(o.style.cssText=i),e(o)}function Y(e){var t=T.length,n=(U+e)%t;return n<0?t+n:n}function Z(e,t){return Math.round((/%/.test(e)?(t==="x"?tt():nt())/100:1)*parseInt(e,10))}function et(e){return B.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(e)}function tt(){return n.innerWidth||N.width()}function nt(){return n.innerHeight||N.height()}function rt(){var t,n=e.data(R,i);n==null?(B=e.extend({},r),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},n);for(t in B)e.isFunction(B[t])&&t.slice(0,2)!=="on"&&(B[t]=B[t].call(R));B.rel=B.rel||R.rel||"nofollow",B.href=B.href||e(R).attr("href"),B.title=B.title||R.title,typeof B.href=="string"&&(B.href=e.trim(B.href))}function it(t,n){e.event.trigger(t),n&&n.call(R)}function st(){var e,t=s+"Slideshow_",n="click."+s,r,i,o;B.slideshow&&T[1]?(r=function(){M.text(B.slideshowStop).unbind(n).bind(f,function(){if(B.loop||T[U+1])e=setTimeout(J.next,B.slideshowSpeed)}).bind(a,function(){clearTimeout(e)}).one(n+" "+l,i),g.removeClass(t+"off").addClass(t+"on"),e=setTimeout(J.next,B.slideshowSpeed)},i=function(){clearTimeout(e),M.text(B.slideshowStart).unbind([f,a,l,n].join(" ")).one(n,function(){J.next(),r()}),g.removeClass(t+"on").addClass(t+"off")},B.slideshowAuto?r():i()):g.removeClass(t+"off "+t+"on")}function ot(t){V||(R=t,rt(),T=e(R),U=0,B.rel!=="nofollow"&&(T=e("."+o).filter(function(){var t=e.data(this,i),n;return t&&(n=t.rel||this.rel),n===B.rel}),U=T.index(R),U===-1&&(T=T.add(R),U=T.length-1)),W||(W=X=!0,g.show(),B.returnFocus&&e(R).blur().one(c,function(){e(this).focus()}),m.css({opacity:+B.opacity,cursor:B.overlayClose?"pointer":"auto"}).show(),B.w=Z(B.initialWidth,"x"),B.h=Z(B.initialHeight,"y"),J.position(),d&&N.bind("resize."+v+" scroll."+v,function(){m.css({width:tt(),height:nt(),top:N.scrollTop(),left:N.scrollLeft()})}).trigger("resize."+v),it(u,B.onOpen),H.add(A).hide(),P.html(B.close).show()),J.load(!0))}function ut(){!g&&t.body&&(Q=!1,N=e(n),g=G(K).attr({id:i,"class":p?s+(d?"IE6":"IE"):""}).hide(),m=G(K,"Overlay",d?"position:absolute":"").hide(),L=G(K,"LoadingOverlay").add(G(K,"LoadingGraphic")),y=G(K,"Wrapper"),b=G(K,"Content").append(C=G(K,"LoadedContent","width:0; height:0; overflow:hidden"),A=G(K,"Title"),O=G(K,"Current"),_=G(K,"Next"),D=G(K,"Previous"),M=G(K,"Slideshow").bind(u,st),P=G(K,"Close")),y.append(G(K).append(G(K,"TopLeft"),w=G(K,"TopCenter"),G(K,"TopRight")),G(K,!1,"clear:left").append(E=G(K,"MiddleLeft"),b,S=G(K,"MiddleRight")),G(K,!1,"clear:left").append(G(K,"BottomLeft"),x=G(K,"BottomCenter"),G(K,"BottomRight"))).find("div div").css({"float":"left"}),k=G(K,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),H=_.add(D).add(O).add(M),e(t.body).append(m,g.append(y,k)))}function at(){return g?(Q||(Q=!0,j=w.height()+x.height()+b.outerHeight(!0)-b.height(),F=E.width()+S.width()+b.outerWidth(!0)-b.width(),I=C.outerHeight(!0),q=C.outerWidth(!0),g.css({"padding-bottom":j,"padding-right":F}),_.click(function(){J.next()}),D.click(function(){J.prev()}),P.click(function(){J.close()}),m.click(function(){B.overlayClose&&J.close()}),e(t).bind("keydown."+s,function(e){var t=e.keyCode;W&&B.escKey&&t===27&&(e.preventDefault(),J.close()),W&&B.arrowKey&&T[1]&&(t===37?(e.preventDefault(),D.click()):t===39&&(e.preventDefault(),_.click()))}),e("."+o,t).live("click",function(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||(e.preventDefault(),ot(this))})),!0):!1}var r={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"Image {current} sur {total}",previous:"Précédent",next:"Suivant",close:"Fermer",xhrError:"Impossible de charger ce contenu",imgError:"Impossible de charger cette image.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:undefined},i="colorbox",s="cbox",o=s+"Element",u=s+"_open",a=s+"_load",f=s+"_complete",l=s+"_cleanup",c=s+"_closed",h=s+"_purge",p=!e.support.opacity&&!e.support.style,d=p&&!n.XMLHttpRequest,v=s+"_IE6",m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K="div",Q;if(e.colorbox)return;e(ut),J=e.fn[i]=e[i]=function(t,n){var s=this;t=t||{},ut();if(at()){if(!s[0]){if(s.selector)return s;s=e("<a/>"),t.open=!0}n&&(t.onComplete=n),s.each(function(){e.data(this,i,e.extend({},e.data(this,i)||r,t))}).addClass(o),(e.isFunction(t.open)&&t.open.call(s)||t.open)&&ot(s[0])}return s},J.position=function(e,t){function f(e){w[0].style.width=x[0].style.width=b[0].style.width=e.style.width,b[0].style.height=E[0].style.height=S[0].style.height=e.style.height}var n,r=0,i=0,o=g.offset(),u,a;N.unbind("resize."+s),g.css({top:-9e4,left:-9e4}),u=N.scrollTop(),a=N.scrollLeft(),B.fixed&&!d?(o.top-=u,o.left-=a,g.css({position:"fixed"})):(r=u,i=a,g.css({position:"absolute"})),B.right!==!1?i+=Math.max(tt()-B.w-q-F-Z(B.right,"x"),0):B.left!==!1?i+=Z(B.left,"x"):i+=Math.round(Math.max(tt()-B.w-q-F,0)/2),B.bottom!==!1?r+=Math.max(nt()-B.h-I-j-Z(B.bottom,"y"),0):B.top!==!1?r+=Z(B.top,"y"):r+=Math.round(Math.max(nt()-B.h-I-j,0)/2),g.css({top:o.top,left:o.left}),e=g.width()===B.w+q&&g.height()===B.h+I?0:e||0,y[0].style.width=y[0].style.height="9999px",n={width:B.w+q,height:B.h+I,top:r,left:i},e===0&&g.css(n),g.dequeue().animate(n,{duration:e,complete:function(){f(this),X=!1,y[0].style.width=B.w+q+F+"px",y[0].style.height=B.h+I+j+"px",B.reposition&&setTimeout(function(){N.bind("resize."+s,J.position)},1),t&&t()},step:function(){f(this)}})},J.resize=function(e){W&&(e=e||{},e.width&&(B.w=Z(e.width,"x")-q-F),e.innerWidth&&(B.w=Z(e.innerWidth,"x")),C.css({width:B.w}),e.height&&(B.h=Z(e.height,"y")-I-j),e.innerHeight&&(B.h=Z(e.innerHeight,"y")),!e.innerHeight&&!e.height&&(C.css({height:"auto"}),B.h=C.height()),C.css({height:B.h}),J.position(B.transition==="none"?0:B.speed))},J.prep=function(t){function o(){return B.w=B.w||C.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function u(){return B.h=B.h||C.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(!W)return;var n,r=B.transition==="none"?0:B.speed;C.remove(),C=G(K,"LoadedContent").append(t),C.hide().appendTo(k.show()).css({width:o(),overflow:B.scrolling?"auto":"hidden"}).css({height:u()}).prependTo(b),k.hide(),e(z).css({"float":"none"}),d&&e("select").not(g.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(l,function(){this.style.visibility="inherit"}),n=function(){function y(){p&&g[0].style.removeAttribute("filter")}var t,n,o=T.length,u,a="frameBorder",l="allowTransparency",c,d,v,m;if(!W)return;c=function(){clearTimeout($),L.detach().hide(),it(f,B.onComplete)},p&&z&&C.fadeIn(100),A.html(B.title).add(C).show();if(o>1){typeof B.current=="string"&&O.html(B.current.replace("{current}",U+1).replace("{total}",o)).show(),_[B.loop||U<o-1?"show":"hide"]().html(B.next),D[B.loop||U?"show":"hide"]().html(B.previous),B.slideshow&&M.show();if(B.preloading){t=[Y(-1),Y(1)];while(n=T[t.pop()])m=e.data(n,i),m&&m.href?(d=m.href,e.isFunction(d)&&(d=d.call(n))):d=n.href,et(d)&&(v=new Image,v.src=d)}}else H.hide();B.iframe?(u=G("iframe")[0],a in u&&(u[a]=0),l in u&&(u[l]="true"),u.name=s+ +(new Date),B.fastIframe?c():e(u).one("load",c),u.src=B.href,B.scrolling||(u.scrolling="no"),e(u).addClass(s+"Iframe").appendTo(C).one(h,function(){u.src="//about:blank"})):c(),B.transition==="fade"?g.fadeTo(r,1,y):y()},B.transition==="fade"?g.fadeTo(r,0,function(){J.position(0,n)}):J.position(r,n)},J.load=function(t){var n,r,i=J.prep;X=!0,z=!1,R=T[U],t||rt(),it(h),it(a,B.onLoad),B.h=B.height?Z(B.height,"y")-I-j:B.innerHeight&&Z(B.innerHeight,"y"),B.w=B.width?Z(B.width,"x")-q-F:B.innerWidth&&Z(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=Z(B.maxWidth,"x")-q-F,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=Z(B.maxHeight,"y")-I-j,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,$=setTimeout(function(){L.show().appendTo(b)},100),B.inline?(G(K).hide().insertBefore(e(n)[0]).one(h,function(){e(this).replaceWith(C.children())}),i(e(n))):B.iframe?i(" "):B.html?i(B.html):et(n)?(e(z=new Image).addClass(s+"Photo").error(function(){B.title=!1,i(G(K,"Error").html(B.imgError))}).load(function(){var e;z.onload=null,B.scalePhotos&&(r=function(){z.height-=z.height*e,z.width-=z.width*e},B.mw&&z.width>B.mw&&(e=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(e=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.h-z.height,0)/2+"px"),T[1]&&(B.loop||T[U+1])&&(z.style.cursor="pointer",z.onclick=function(){J.next()}),p&&(z.style.msInterpolationMode="bicubic"),setTimeout(function(){i(z)},1)}),setTimeout(function(){z.src=n},1)):n&&k.load(n,B.data,function(t,n,r){i(n==="error"?G(K,"Error").html(B.xhrError):e(this).contents())})},J.next=function(){!X&&T[1]&&(B.loop||T[U+1])&&(U=Y(1),J.load())},J.prev=function(){!X&&T[1]&&(B.loop||U)&&(U=Y(-1),J.load())},J.close=function(){W&&!V&&(V=!0,W=!1,it(l,B.onCleanup),N.unbind("."+s+" ."+v),m.fadeTo(200,0),g.stop().fadeTo(300,0,function(){g.add(m).css({opacity:1,cursor:"auto"}).hide(),it(h),C.remove(),setTimeout(function(){V=!1,it(c,B.onClosed)},1)}))},J.remove=function(){e([]).add(g).add(m).remove(),g=null,e("."+o).removeData(i).removeClass(o).die()},J.element=function(){return e(R)},J.settings=r})(jQuery,document,window);
        var ColorBox_img_Overlay  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAMFBMVEX///8HBwcICAgUFBQXFxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuanbkAAAAQUlEQVR4nOzOoQ0AIBDF0K5QNiC3wYUN2H8nJPkai6l5prSOdcPU2jckN8mTZEmWZEmW5EFy8f+e/g4AAAD//wMAKnM4yCLdBHkAAAAASUVORK5CYII="
          , ColorBox_img_Controls = "data:image/png;base64,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"
          , ColorBox_img_Border   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyAQMAAACnNSPJAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlOArV5bRgAAABhJREFUeF6VwQENAAAAgjCjG50GbPwzDwUmggsB4+yamQAAAABJRU5ErkJggg=="
          , ColorBox_img_Loading  = "data:image/png;base64,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"        
        ;
        
        /*
        ColorBox CSS
        Modifié pour JVCMaster */
        _.insertCSS("#colorbox, #cboxOverlay, #cboxWrapper{position:absolute; top:0; left:0; z-index:2147483647; overflow:hidden;}#cboxOverlay{position:fixed; width:100%;  height:100%;}#cboxMiddleLeft, #cboxBottomLeft{clear:left;}#cboxContent{position:relative;}#cboxLoadedContent{overflow:auto;}#cboxTitle{margin:0;}#cboxLoadingOverlay, #cboxLoadingGraphic{position:absolute; top:0; left:0; width:100%; height:100%;}#cboxPrevious, #cboxNext, #cboxClose, #cboxSlideshow{cursor:pointer;}.cboxPhoto{float:left; margin:auto; border:0; display:block; max-width:none;}.cboxIframe{width:100%; height:100%; display:block; border:0;}#colorbox, #cboxContent, #cboxLoadedContent{box-sizing:content-box;}/*User Style:Change the following styles to modify the appearance of ColorBox.  They areordered & tabbed in a way that represents the nesting of the generated HTML.*/#cboxOverlay{background:url(" + ColorBox_img_Overlay + ") repeat 0 0;}#colorbox{z-index:2147483648}#cboxTopLeft{width:21px; height:21px; background:url(" + ColorBox_img_Controls + ") no-repeat -101px 0;}#cboxTopRight{width:21px; height:21px; background:url(" + ColorBox_img_Controls + ") no-repeat -130px 0;}#cboxBottomLeft{width:21px; height:21px; background:url(" + ColorBox_img_Controls + ") no-repeat -101px -29px;}#cboxBottomRight{width:21px; height:21px; background:url(" + ColorBox_img_Controls + ") no-repeat -130px -29px;}#cboxMiddleLeft{width:21px; background:url(" + ColorBox_img_Controls + ") left top repeat-y;}#cboxMiddleRight{width:21px; background:url(" + ColorBox_img_Controls + ") right top repeat-y;}#cboxTopCenter{height:21px; background:url(" + ColorBox_img_Border + ") 0 0 repeat-x;}#cboxBottomCenter{height:21px; background:url(" + ColorBox_img_Border + ") 0 -29px repeat-x;}#cboxContent{background:#fff; overflow:hidden;}.cboxIframe{background:#fff;}#cboxError{padding:50px; border:1px solid #ccc;}#cboxLoadedContent{margin-bottom:28px;}#cboxTitle{position:absolute; bottom:4px; left:0; text-align:center; width:100%; color:#949494;}#cboxCurrent{position:absolute; bottom:4px; left:58px; color:#949494;}#cboxSlideshow{position:absolute; bottom:4px; right:30px; color:#0092ef;}#cboxPrevious{position:absolute; bottom:0; left:0; background:url(" + ColorBox_img_Controls + ") no-repeat -75px 0; width:25px; height:25px; text-indent:-9999px;}#cboxPrevious:hover{background-position:-75px -25px;}#cboxNext{position:absolute; bottom:0; left:27px; background:url(" + ColorBox_img_Controls + ") no-repeat -50px 0; width:25px; height:25px; text-indent:-9999px;}#cboxNext:hover{background-position:-50px -25px;}#cboxLoadingGraphic{background:url(" + ColorBox_img_Loading + ") no-repeat center center;}#cboxClose{position:absolute; bottom:0; right:0; background:url(" + ColorBox_img_Controls + ") no-repeat -25px 0; width:25px; height:25px; text-indent:-9999px;}#cboxClose:hover{background-position:-25px -25px;}")

        // Code CSS pour JVCMaster
        _.insertCSS(".JVCMaster_patternButton img {cursor: pointer; margin-right : 3px} \
                    .JVCMaster_colorboxHTML .titre_bloc{font-size : 13px; text-align: left} \
                    .JVCMaster_colorboxHTML li{background: url(http://image.jeuxvideo.com/css_img/defaut/puce_base.gif) no-repeat left center; border-bottom : 1px solid rgb(237, 237, 237); font-size : 12px; font-weight : normal; margin: 2px 0; overflow: hidden; padding: 0 0 1px 18px; text-align : left} \
                    .JVCMaster_colorboxHTML p{margin : 5px} \
                    .JVCMaster_colorboxHTML input[type=checkbox]{ margin-right: 3px; vertical-align : bottom } \
                    .JVCMaster_POST{background: url(http://image.jeuxvideo.com/css_img/defaut/sep_444.gif) repeat-x top; clear: both; line-height: 1.3em; margin-bottom: 8px; padding-top: 10px} \
                    ");


        // Bouton "JVCMaster x.x.x" pour ouvrir le panneau de configuration
        var BTN_CONFIGURATION = $("<a/>", {
            title : "Panneau de configuration de JVCMaster"
          , text  : "JVCMaster " + _.version
          , click : function(e){
                // On rafraichit la liste des extensions activées
                _.activatedExtensions = JSON.parse(_.LS_get("activatedExtensions") || "[]");

                // Contenu du panneau de configuration de JVCMaster
                var html = '<div class="JVCMaster_colorboxHTML forums hp_forums"><div class="bloc1"><h3 class="titre_bloc"><span>Fonctionnalités</span></h3><div class="bloc_inner"><ul class="liste_liens">';
                    $.each(_.scripts, function(script){
                       html += '<li><input type="checkbox" data-jvcmaster-script-id="' + _.scripts[script].id + '"' + (_.activatedExtensions.indexOf(scripts[script].id) !== -1 ? ' checked="checked"' : '') + '/><b>' + _.scripts[script].name + "</b> : " + _.scripts[script].description + "</li>"
                    });
                    html += "</ul></div></div>";
                    
                    if(window.location.href.match("^http:\/\/www\.jeuxvideo\.com")){
                        html += '<div class="bloc1"><h3 class="titre_bloc"><span>Synchronisation des paramètres' + (_.LS_get("Sync_pseudo") != null ? ' (' +  _.LS_get("Sync_pseudo") + ')' : '') + '</span></h3><div class="bloc_inner">';
                        
                        var isConnected = false;
                        if(typeof _.LS_get("Sync_key") == "object" && typeof _.LS_get("Sync_pseudo") == "object"){
                            html += '<form id="JVCMaster_FORM_connection">';
                            html += '<p style="font-size: 15px;font-weight: bold;">Connectez-vous avec votre compte JVCMaster</p><input type="text" name="JVCMaster_pseudo" placeholder="Pseudo"><input type="password" name="JVCMaster_password" placeholder="Mot de passe"><input type="submit" value="Connexion">';
                            html += '<p>Pas encore de compte JVCMaster? <a href="http://www.jvcmaster.org/account">Inscrivez-vous!</a></p>'; 
                            html += '</form>'
                        } else{
                            isConnected = true;
                        }
                        
                        html += '<form id="JVCMaster_FORM_sync"' + (!isConnected ? ' style="display:none;"' : '') + ' action="http://www.jvcmaster.org/action?type=sync"><button id="JVCMaster_BTN_setSync">Envoyer votre configuration</button><button id="JVCMaster_BTN_getSync">Télécharger votre configuration</button>';
                        html += "<br><a href='#' id='JVCMaster_BTN_Sync_logout'>Se déconnecter</a>";
                        html += "</form>";

                        html += "</div></div>";                        
                    }

                    html += "</div>";

                $.colorbox({html : html});
                
                $("input[type=checkbox][data-jvcmaster-script-id]").click(function(){
                   var t  = $(this)
                     , id = t.attr("data-jvcmaster-script-id");

                    if(t.is(":checked")){
                        _.activatedExtensions.push(id);
                        _.scripts[id].init();
                    } else{
                        _.activatedExtensions.splice(_.activatedExtensions.indexOf(id), 1);
                        _.scripts[id].destroy();
                    }

                   _.LS_set("activatedExtensions", JSON.stringify($.unique(_.activatedExtensions)));
                });


                $("#JVCMaster_FORM_connection").on("submit", function(){
                    var t            = $(this)
                      , action       = "http://www.jvcmaster.org/action?type=sync"
                      , pseudo       = t.find("input[name=JVCMaster_pseudo]").val()
                      , password     = t.find("input[name=JVCMaster_password]").val()
                      , submitButton = t.find("[type=submit]")
                      , formSync     = $("#JVCMaster_FORM_sync")
                    ;

                    if(pseudo == ''){
                        alert("Rentrer votre pseudo");
                        return false;
                    }
                    if(password == ''){
                        alert("Rentrer votre mot de passe");
                        return false;
                    }

                    $.post(action, {
                            pseudo         : pseudo,
                            password       : _.sha1("0+@#1$4%*7" + password)
                        }, "json").done(function(data) {
                            data = JSON.parse(data);
                            
                            submitButton.attr("disabled", "disabled");
                            
                            if(!data.accountExists) {
                                alert("Ce compte n'existe pas!");
                                submitButton.removeAttr("disabled");
                            } else {
                                t.slideUp(200);
                                formSync.slideDown(200);

                                _.LS_set("Sync_key"    , data.key);
                                _.LS_set("Sync_pseudo" , pseudo);
                            }
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            alert("Bordel, il y a une erreur. Merci de regarder la console web, et de me faire parvenir (HerveGhesquiere) ce qui est inscrit dans cette dernière");
                            console.error(jqXHR);
                            console.error(textStatus);
                            console.error(errorThrown);
                        });

                    return false;
                });

                $("#JVCMaster_BTN_getSync").live("click", function(){
                     $.post("http://www.jvcmaster.org/action?type=sync&action=get", {
                            jvcmaster_sync : ""
                          , pseudo         : _.LS_get("Sync_pseudo")
                          , key            : _.LS_get("Sync_key")
                        }, 
                        function(data){
                            if(data.status){
                                var config = JSON.parse(data.config);

                                _.LS_set("activatedExtensions", config.activatedExtensions  == "null" ? "[]" : config.activatedExtensions);
                                _.LS_set("favoritesTopics",     config.favoritesTopics      == "null" ? "{}" : config.favoritesTopics);
                                _.LS_set("friends",             config.friends              == "null" ? "{}" : config.friends);
                                _.LS_set("hiddenposts",         config.hiddenposts          == "null" ? "[]" : config.hiddenposts);
                                _.LS_set("hiddenpostspseudo",   config.hiddenpostspseudo    == "null" ? "[]" : config.hiddenpostspseudo);
                                
                                alert("Votre configuration a été correctement téléchargée, et installée");
                                window.location.reload();
                            }
                            else
                                alert("Un problème est survenu");
                        }, "json"
                    );
                    return false;
                });

                $("#JVCMaster_BTN_setSync").live("click", function(){
                    config = {
                          activatedExtensions : _.LS_get("activatedExtensions")
                        , favoritesTopics     : _.LS_get("favoritesTopics")
                        , friends             : _.LS_get("friends")
                        , hiddenposts         : _.LS_get("hiddenposts")
                        , hiddenpostspseudo   : _.LS_get("hiddenpostspseudo")
                    };
                    
                    $.post("http://www.jvcmaster.org/action?type=sync&action=set", {
                            jvcmaster_sync : ""
                          , config         : config
                          , pseudo         : _.LS_get("Sync_pseudo")
                          , key            : _.LS_get("Sync_key")
                        },

                        function(data){
                            if(data.status)
                                alert("Votre configuration a été correctement envoyée");
                            else
                                alert("Un problème est survenu");
                        }, "json"
                    );

                    return false;
                });

                $("#JVCMaster_BTN_Sync_logout").live("click", function(){
                    _.LS_rm("Sync_pseudo");
                    _.LS_rm("Sync_key");
                    window.location.reload();
                });

                e.preventDefault();
            }
          , css : {cursor : "pointer"}
        });

        BTN_CONFIGURATION.appendTo($("<div>").prependTo($("#connexion")));

        // La barre #connexion est "appendée" au bout de 1000ms  sur les ForumJV
        setTimeout(function(){
            BTN_CONFIGURATION.appendTo($("<li>").prependTo($("div#log ul")));
        }, 1100);

        // On lance les extensions que l'utilisateur a activées
        $.each(_.activatedExtensions, function(k, script){
            _.scripts[script].init();
        });

        if(typeof LS_get("isFirstUse") === "object"){
            _.LS_set("isFirstUse", "0")

            // On purge la configuration de JVCMaster 2.x
            _.LS_rm("oHiddenPosts");
            _.LS_rm("oHiddenPostsViaPseudos");
            _.LS_rm("firstUse");
            _.LS_rm("sActivatedScripts");
            BTN_CONFIGURATION.click();
        }                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        $("body").bind("ajaxComplete", function(e, xhr, settings){
            if("url" in settings) {
    			if(settings.url.match(/^\.\/ajax_prec_msg\.php/)) {
                	console.log("ACTUALISATION");
                    $(".JVCMaster_patternButton").remove();
                    _.pseudoArea = $(".msg").parent().find("li span:last-child:not(.generic), div[id^=message] ul").parent().find(".pseudo");
                    _.setButtonsArea();

                    $.each(_.activatedExtensions, function(k, script){
                        _.scripts[script].destroy();
                        _.scripts[script].init();
                    });         
                }
            }
        });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

        delete ColorBox_img_Controls, ColorBox_img_Loading, ColorBox_img_Border, ColorBox_img_Overlay;
    }

    // Extensions de JVCMaster
    _.scripts = {
        antiflood : {
            id          : "antiflood"
          , name        : "Anti-Flood"
          , description : "Cache le flood"
          , init : function(){
                _.insertCSS(".JVCMaster_POST_FLOOD{background : rgba(255, 0, 0, 0.2); border : 1px solid red; padding : 10px} \
                             .JVCMaster_POST_FLOOD a img{margin-right : 3px; vertical-align : top} \
                            ");

                $("body").find("div[id^=message] .post, table[id^=liste_topics] tr > td + td a").each(function(){
                    var t             = $(this)
                      , html          = t.html()
                      , postContainer = t.parents(".msg, .tr1, .tr2")
                    ;

                    // Titre de topic sur la liste des topics
                    if(postContainer.attr("class").match(/tr1|tr2/)){
                        if(/(W{10,}){1,}/.test(html)){
                            t.html("<i>JVCMaster</i> : <b>Flood</b>");
                        }
                        // Corps du post sur un topic
                    } else if(postContainer.attr("class").match("msg")){
                        if(/(W{30,}){5,}/.test(html)
                            || /( ?<br( \/)?>&nbsp;\n){200}/.test(html)){
                            var BTN_AVERTIR = t.parent().find("a[target=avertir]")
                              , pseudo      = postContainer.find(".pseudo strong").text()
                            ;

                            postContainer.hide();
                            postContainer.before($("<div>", {
                                "class" : "msg JVCMaster_POST_FLOOD"
                                , html : "<i>JVCMaster</i> : <b>Flood</b> de <b>" + pseudo + "</b> - <a href='#' onclick='$(this).parent().next().slideToggle(); return false'>Voir/cacher le post</a> " + BTN_AVERTIR.clone().wrap('<p>').parent().html()
                            }));
                        }
                    }
                });

            },
            destroy : function(){
                $(".JVCMaster_POST_FLOOD").remove();
                $(".msg").show();
            }
        },

        cdvinformations : {
            id          : "cdvinformations"
          , name        : "CDV informations"
          , description : "Affiche des informations à côté du pseudo"
          , init : function(){
                // Impossible de faire une requête AJAX depuis les forumJV sur "Jeuxvideo.com"
                if(/forumjv\.com$/.test(window.location.hostname))
                    return;

                _.insertCSS(".JVCMaster_BADGE_RANK img{ cursor : default } \
                             .JVCMaster_avatar{display : none; height : 100px; left: -105px; position: absolute; text-align : right; top: 0; z-index: 1; width : 100px} \
                             .JVCMaster_avatar img{background: white; box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); padding: 5px} \
                            ");

                BADGE_RANK = $("<span>", {
                    height  : "12px"
                    , width : "14px"
                    , css : {
                        backgroundImage : "url(data:image/png;base64,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)"
                        , marginRight : "3px"
                        , display : "inline-block"
                    }
                });
                _.setButton("BADGE_RANK", BADGE_RANK);

                $(".pseudo strong").each(function(){
                    var t             = $(this)
                      , postContainer = t.parents(".msg")
                      , pseudo        = t.text().toLowerCase()
                    ;

                    $.ajax({
                        url : "http://www.jeuxvideo.com/profil/" + pseudo + ".html",
                        dataType : "text",
                        success : function(data){
                            var BTN_CDV    = postContainer.find("a[href^=http\\:\\/\\/www\\.jeuxvideo\\.com\\/profil] img")
                              , BADGE_RANK = postContainer.find("span.JVCMaster_BADGE_RANK span")
                            ;


                            if(data.match("<p class=\"banni\">"))
                                BTN_CDV.attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wICggWDgPWFDkAAAD2SURBVCjPhdEtroNAEMDxP4VtsqYkxXALDAoBohfgCIg9wJpaLoDZA+BxXAgEsmkIigSxJDzR0Pa9NK/jJvnNZD4crfXGlzDGOAAeQBzH/2Kt9WaMcTwAay0ARVH8QlVVcTqdiKIIrfV22PFfCHC9XhmGgXmeATi8dwZIkoTL5fLMu65jmiaeM1trKcuSrusIw5C2bQHIsowgCFjX9YX7vsday/F4pGkaANI0BcB1Xe73O1LKBwYQQiCEQCnF7XZDCMH5fCYIAoQQr87vUdc1AHme4/v+E37ESinGcfx4b2c/+r6EtZZlWQCQUr5G8LwH3gu+vf0HNF5XpCC6I0sAAAAASUVORK5CYII=");
                            else{
                                var rank   = data.match("<body.*class=\"(.*)\">")[1]
                                  , sexe   = data.match("<h1.*class=\"(sexe_[f|m])\">")[1]
                                  , avatar = data.match('<img id="img_grande"(?: | style="(?:[^"]*)" onClick="(?:[^"]*)" )?src="([^"]*)"')[1]
                                ;

                                if(!_.onMp()){
                                    $("<li>", {
                                        "class" : "JVCMaster_avatar",
                                        html : "<img src='" + avatar + "'>"
                                    }).appendTo(postContainer.find("ul"));

                                    postContainer.find(".pseudo strong").hover(function(){
                                        postContainer.find(".JVCMaster_avatar").stop().fadeIn(200);
                                    }, function(){
                                        postContainer.find(".JVCMaster_avatar").fadeOut(200);
                                    });
                                }

                                if(sexe == "sexe_f")
                                    BTN_CDV.attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEmSURBVHjahNG/SwJhHMfx92Ond4slYaF3EmgN0tQQLTm2FQQtZbTV5tYc9Cc49TccLU61NZ4E4eJSJGFDSGFJmoZ3Ss/TIF72g/xsD8/reZ4P30c4lq0Yk0wtKwA0gIW1xX+xc2GrTC0rNADVlQDETpe+oauNc6L6NPOraZyirQID/PELAqycrXNTr/De6QDg42Gy1iYHqR1/XaqXeW694HdWXcnlcoFiq0RaT3FczQOwb24zZ5goV37h2/sKrvIwZZTdp0MAcpE9DIJE+5O8ug2mAmGEY9nKUz3/2aZsc927oynfSGoJksEEhtDRRWjQeTRbjzmOGnliEzPEtVkMoft72k9ciJ9Q7T/8OW8BMFrFVR5N2QYgEgj7N+siNMDDA+O+/XMAnBxmyJCBTqUAAAAASUVORK5CYII=");
                                else
                                    BTN_CDV.attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEmSURBVHjahJE9S8NQFIafG29JHKq1FOkHCFUHRwcpoh0cHJ3cdHBRhOAfUBAc/Qnd3QRxEBfBMUUQZ0UIFYeiRrQpVBKbkOsQjPUDe7bDec57Xt4jSqal6FPNWlUASIDFyuS/8DmWataqQgJ43Vj8cDP/DVrav0RP55ifnqBuWkoD8AL1CwQ43ang3N/Q6bwBoPUqA5RmVxhf2Eh6x76i3Xom8ewFipntC9p2HX10isbJHgDF6jpGdgw/UF/wnX2LCn2iVJHHo1UAMnNbgEGg5fCdFpoxjCiZllLhe3I28l26T9dEvoscKZPKlhHSQEg99txbDwfLvJztMpDOI4cKCGkkM/kTLqwdE7w2/sxbAPRaUaFP5LlxVIOZRFlIPYY/F/q9/WMAikdlnhDc6i4AAAAASUVORK5CYII=");

                                switch(rank){
                                    case "carton":
                                        BADGE_RANK.css({
                                            width  : "13px"
                                          , height : "13px"
                                          , backgroundPosition : "0 0"
                                        });
                                    break;

                                    case "bronze":
                                        BADGE_RANK.css({
                                            width  : "8px"
                                          , height : "14px"
                                          , backgroundPosition : "-14px 0"
                                        });
                                    break;

                                    case "argent":
                                        BADGE_RANK.css({
                                            height : "13px"
                                          , backgroundPosition : "-22px 0"
                                        });
                                    break;

                                    case "or":
                                        BADGE_RANK.css({
                                            width  : "13px"
                                          , height : "13px"
                                          , backgroundPosition : "0 -14px"
                                        });
                                    break;

                                    case "rubis":
                                        BADGE_RANK.css({
                                            width : "11px"
                                          , backgroundPosition : "-14px -15px"
                                        });
                                    break;

                                    case "saphir":
                                        BADGE_RANK.css({
                                            width : "12px"
                                          , backgroundPosition : "0 -28px"
                                        });
                                    break;

                                    case "emeraude":
                                        BADGE_RANK.css({
                                            width : "12px"
                                          , backgroundPosition : "-12px -28px"
                                        });
                                    break;

                                    case "diamant":
                                        BADGE_RANK.css({
                                            width : "11px"
                                          , backgroundPosition : "-25px -27px"
                                        });
                                    break;
                                }
                            }
                        }
                    });
                });
            },
            destroy : function(){
                $("span.JVCMaster_BADGE_RANK span").remove();
                $("a[href^=http\\:\\/\\/www\\.jeuxvideo\\.com\\/profil] img").attr("src" ,"data:image/png;base64,R0lGODlhCwAMAMQAAAAAAP///3LEGzpYGj5qD5LkO2m1GWClF3q0PKHnVlKAIVGLE4PHO6boX5XcSkyDEm69Gn/GM4zJS1mLJJrdUj9iGWWtGFaUFJzmTVWAJkNzEJflREJjIQAAAAAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVFoCCOIwAITaqmwpkkQRxIVCJisow44hYPnFiGISpEJopYRRERQQyHGIFwMTghEMtDU4VcIbGFBfu1LMTkExZ6MKRPJFIIADs=");
            }
        },

        citation : {
            id          : "citation"
          , name        : "Citation"
          , description : "Citer des posts"
          ,  init : function(){
                var textarea = $("#newmessage")
                  , btn = $("<img />", {
                        title : "Citer ce post",
                        src   : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMEAYAAADkOZvdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAIcbAACL/wAA/6wAAIMCAACETAAA7XIAADqFAAAdxCRWn50AAAMoSURBVHjadJJvSJx1AMc/v98993h3HnLq6Q41lVKwGiGHmAwZQ4bEBW1sEENMgkSWuGMVDDlijIi4F3XY8EWMKBUnIccacdhYMlbYUasX4zj7I1K3FHGXXDc778/zPPf8elUNap/XXz58XnxFa9e8WvtWKZ6TXRwGcV40yMdBHFGn1IfYKsUlQuSYYYRJFuWbXKeHqHZRzspZO6EGZYR01dI2pJTS2yTCjInbxoQmUrJPRKGu6Nl1A9UJe8wOYjBFnDH2RYIx+tmWAyInblHnOCtSooteR0YWxaSwnC5N1/KO68actVwdK4xKnxwWDe6boiN01Z18XymX7ex1NoM8JbNyFEM0kyBGcf3E6Z5gGB+P4OlXP8gnxom6+/23moPMFTRrRV3mrsZRggwCm4ziAlHmJDPo6ydOB4JT6H8LWj+e6J7eAnGNNjEADt017vkD9JX6bxqTTDtna5719DEt3vF0essgVU5NiWkQWRETKRAf4aHrf9LiO/HfF0HLeIa8P4P7wmMHT8RB/+HQepsEdacmqr8I5h161QZofG8H1EmQy2JHngU2xKBKAJB62Fsqljr/jIEn7Tva9B7o4y3fde6D+ZTjosxC6RerUI1AOWcNWjmQak7GSIOdrAatAMgRe8Q+8t/gao8YNq/BwbY1XlmAB22l48URKCTLb1fuQnHXzFp7gIEHQKqgnbGHwPis3FKOQGXIiBgZSKczmQf5h8wL9iV9EqywmpEFMK8oH2FQtr1kS1CIT4Tx71y0Dsx/unZOKXrNrFEAsUgDcTB27x/fvgL3ayO+l87wSA69EV29Ogry9fpVvxccfe6wdxhEa8v81trnSinN8FQA8iwQA3uitHKwC6b3t1c2G8D0bb28eQ/4Sdn2VyAuuJZq3wVHsv6M/0fQIx3Pd8+BI9fYHjgGmgpZq2ZZNIkb+gs1uvpV+c3LlQSavOkxanfBGe94snsHzfGW7+vGVTR1u/Ja6RywrI6pJRCHa75wh4Abzo2aZVB+VafaQfzz08D8wdqXnEdDQ6p7wD4WISDPHu1Alh38wA57PAPsk0MC22SRQDsBAPoZgL8GAMXsSoEas11IAAAAAElFTkSuQmCC",
                        click : function(){
                            var postContainer                  = $(this).parents(".msg")
                              , isSelectedHTML                 = getSelection().toString() !== "" && (getSelection().focusNode.parentElement.className.match("JVCMaster_POST") || getSelection().focusNode.parentElement.className == "postContainer")
                              , SelectedHTML_node              = isSelectedHTML ? getSelection().focusNode.parentNode : ''
                              , SelectedHTML                   = isSelectedHTML ? SelectedHTML_node.innerHTML : ''
                              , SelectedHTML_isJVCMaster_POST  = SelectedHTML_node.className && !!SelectedHTML_node.className.match("JVCMaster_POST")
                            ;

                            var citation = citationPermalink = citationDate = citationPseudo = citationPosplace = "";                            

                            if(isSelectedHTML){
                                citationPost = _.getSelectionHTML();

                                
                                if(/<li class="ancre"><a href="([^"]*)">Lien permanent<\/a>/g.test(SelectedHTML)){
                                    citationPermalink = /<li class="ancre"><a href="([^"]*)">Lien permanent<\/a>/g.exec(SelectedHTML).pop();
                                } else {
                                    citationPermalink = /<div class="CITATION_permalink" style="[^"]+"><a href="([^"]*)">/g.exec(SelectedHTML);
                                    citationPermalink = citationPermalink != null ? citationPermalink.pop() : '';
                                }


                                if(/<li class="date">(Posté le \n[0-9]* [a-zéû]* [0-9]* à [0-9]{2}:[0-9]{2}:[0-9]{2})/g.test(SelectedHTML)){
                                    citationDate = /<li class="date">(Posté le \n[0-9]* [a-zéû]* [0-9]* à [0-9]{2}:[0-9]{2}:[0-9]{2})/g.exec(SelectedHTML).pop();
                                } else {
                                    citationDate = /<div class="CITATION_date">(?:le )?([0-9]* [a-zéû]* [0-9]* à [0-9]{2}:[0-9]{2}:[0-9]{2})/g.exec(SelectedHTML);
                                    citationDate = citationDate != null ? citationDate.pop() : '';
                                }
  
                                if(/<li class="pseudo">\n<strong>([^<]*)<\/strong>/g.test(SelectedHTML)){
                                    citationPseudo = /<li class="pseudo">\n<strong>([^<]*)<\/strong>/g.exec(SelectedHTML).pop();
                                } else {
                                    citationPseudo = /<div class="CITATION_pseudo"><a.*?href="([^"]*?)".*?>([a-zA-Z0-9\-\]\[_]*)/g.exec(SelectedHTML);
                                    citationPseudo = citationPseudo != null ? citationPseudo.pop() : '';
                                }

                                citationPost = _.getSelectionHTML();

                                if(SelectedHTML_isJVCMaster_POST){
                                    var postContainer = $(SelectedHTML_node).parent();
                                    citationPermalink = postContainer.find(".ancre a").attr("href");
                                    citationDate      = postContainer.find(".date").text();
                                    citationPseudo    = postContainer.find(".pseudo strong").text();
                                }                             
                            } else {
                                citationPermalink = postContainer.find(".ancre a").attr("href");
                                citationDate      = postContainer.find(".date, .msg_infos").text();
                                citationPseudo    = postContainer.find(".pseudo strong").text();
                                citationPost      = postContainer.find(".post:eq(0), .msg_body:eq(0)").html();
                            }

                            citation          = "";
                            citationPermalink = $.trim(citationPermalink);
                            citationDate      = $.trim(citationDate).replace("Posté ", "").replace(/le \n/, "");
                            citationPseudo    = $.trim(citationPseudo);
                            citationPost      = $.trim($.trim(citationPost).replace(/(\n)? *<br(?: \/)?> ?(\n)?/g, "\n").replace(/<img.*?alt="([^"]*?)".*?>|<a.*?href="([^"]*?)".*?>.*?<\/a>|<img.*?class="img_shack".*?>/gi, "$1 $2").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").split("\n").join("\n| "));

                            if(citationPermalink != "") citation += "| " + citationPermalink + "\n";

                            citation += "| Ecrit par « " + citationPseudo + " », " + citationDate + "\n| « " + citationPost + " »\n\n> "

                            textarea = $("#newmessage");
                            if(!textarea.is('*')){
                                _.LS_set("citation", citation);
                                window.location.href = $(".bt_repondre").attr("href");
                            } else{
                                if(textarea.val() !== "" && textarea.val() !== "Ne postez pas d'insultes, évitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas déjà été posée...\n\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement.")
                                    textarea.val(textarea.val() + "\n\n" + citation);
                                else
                                    textarea.val(citation);
                                    
                                // Si on est sur un MP ou la page de réponse d'un topic ET que la valeur du textarea est vide
                                if(($("#reception").is('*') || $(".revenir").is('*')) && textarea.val() === "")
                                    textarea.val(citation);
                            }
                        }
                    })
                ; _.setButton("BTN_CITATION", btn);

                if(textarea.is('*') && $(".revenir").is('*') && window.location.href.match("^http:\/\/www\.jeuxvideo\.com\/forums\/3"))
                    textarea.focus();

                if(textarea.is('*') && _.LS_get("citation")){
                    textarea.focus();
                    textarea.val(_.LS_get("citation"));
                    _.LS_rm("citation");
                }

                /*
                On ajoute du CSS pour les citations */
                _.insertCSS(".JVCMaster_POST_CITATION .postContainer{background:#e4f5ff;border:1px solid #9ddbff;border-radius:6px 6px 0 0;box-shadow:0 0 10px rgba(0,0,0,0.2);margin:0 0 5px;padding:5px;position:relative} \
                             .JVCMaster_POST_CITATION .postContainer:first-child{margin-top : -5px} \
                             .JVCMaster_POST_CITATION .postContainer:gt(0){margin-top: 5px} \
                             .JVCMaster_POST_CITATION .postContainer .CITATION_pseudo,.JVCMaster_POST_CITATION .postContainer .CITATION_date,.JVCMaster_POST_CITATION .postContainer .CITATION_permalink{background:#cbecff;border:1px solid #9ddbff;height:13px;line-height:13px;padding:2px 5px;position:absolute} \
                             .JVCMaster_POST_CITATION .postContainer .CITATION_pseudo{border-radius:6px 0 6px 0;left:-1px;top:-1px} \
                             .JVCMaster_POST_CITATION .postContainer .CITATION_date{border-radius:0 6px 0 6px;color:#0c4568;right:-1px;top:-1px} \
                             .JVCMaster_POST_CITATION .postContainer .CITATION_permalink{border-radius:0 0 6px 6px;display:none;left:-1px;overflow:hidden;right:-1px;text-overflow:ellipsis;top:100%;white-space:nowrap} \
                             .JVCMaster_MSGBODY{width:720px;overflow:hidden;float:right;margin-top:8px;padding-top:10px;line-height:1.3em;background:url(http://image.jeuxvideo.com/css_img/defaut/sep_444.gif) repeat-x left top} \
                             .JVCMaster_MSGBODY .postContainer{width:98%} \
                             .JVCMaster_POST_CITATION a span{left:-9999em;letter-spacing:-1em;position:absolute} \
                             .JVCMaster_POST_CITATION a i{background:url(http://image.jeuxvideo.com/css_img/defaut/liens_tronq.png) right 3px no-repeat;font-style:normal;padding-right:19px} \
                             .JVCMaster_POST_CITATION a:hover i{background-position-y:-37px} \
                            ");

                $(".msg").find(".post:first, .msg_body:first").each(function(){
                    t = $(this);
                    t.css("display", "none");

                    html = t.html();
                    
                    html = html.replace(/(?:\| )+((?:Ecrit par « |Citation de )([a-zA-Z0-9_\-\[\]]*)(?: »)?(?:[^<]*))/g, 
                                        '<div class="postContainer' + (t.attr("class") == "msg_body" ? " JVCMaster_MSGBODY" : '' ) + '">$1')

                                .replace(/» ?\n? ?<br(?: ?\/)?>\n? ?(\| ?)*\n(\| ?)* ?<br( ?\/)?>(\| ?)*\n?(\| ?)*&gt; ?/g, 
                                        "</div>")
                                
                                .replace(/\| *<a href="([^"]*?)".+>.+<\/a> ?\n? (?:<br(?:\/ )?>(?:\| )*)?<div class="postContainer">/g, 
                                        function(match, p1){
                                            return '<div class="postContainer"><div class="CITATION_permalink"><a href=\'' + encodeURI(p1) + '\'>' + encodeURI(p1) + '</a></div>'
                                        })
                                
                                .replace(/(<div class="postContainer(?: JVCMaster_MSGBODY)?">|<\/div>)(?:Ecrit par « |Citation de (?:")?)([a-zA-Z0-9_\-\[\]]*)(?: »?|(?:")?)? ?, *([^<]*)/gi, 
                                       '$1<div class="CITATION_pseudo"><a href="http://www.jeuxvideo.com/profil/$2.html">$2</a></div><div class="CITATION_date">$3</div>')
                                
                                .replace(/ ?(<br(?: \/)?>)?\n? ?(?:\| )+(« (?:\| ?)?|«&nbsp;(?:\| ?)?)?/g,
                                        "<br>")

                                .replace(/(<\/div>\n) ?<br(?: \/)?> ?/g,
                                        "$1");

                    t.before($("<li>", {
                        "class" : "JVCMaster_POST_CITATION " + (t.attr("class") == "msg_body" ? "JVCMaster_MSGBODY" : "JVCMaster_POST" )
                        , html  : html
                    }));

                    $(".JVCMaster_POST .postContainer").hover(function(){
                        $(this).find("> .CITATION_permalink").slideDown(100);
                    }, function(){
                        $(this).find(".CITATION_permalink").slideUp(100);
                    });
                })
            },

            destroy : function(){
                $(".JVCMaster_BTN_CITATION img").remove();
                $(".JVCMaster_POST_CITATION").remove();
                $(".msg").find(".post, .msg_body").show();
            }
        },

        hideposts : {
            id          : "hideposts"
          , name        : "HidePosts"
          , description : "Cacher des posts et les posts d'un pseudo"
          , init : function(){
                $("div[id^=message]").find(".post").after($("<li/>", {
                    "class" : "JVCMaster_POST JVCMaster_POST_HIDDENPOST"
                    , html  : "<b>JVCMaster</b> : <i>Ce message a été caché</i>"
                    , css   : { display : "none" }
                }));

                var postContainers      = $(".msg")
                    , topicContainers   = $("#liste_topics tr:not(:first)")
                    , hiddenPosts       = JSON.parse(_.LS_get("hiddenposts") || "[]")
                    , hiddenPostsPseudo = JSON.parse(_.LS_get("hiddenpostspseudo") || "[]");

                // Timer, sinon, ".JVCMaster_POST_CITATION" ou autre n'apparaissent pas
                setTimeout(function(){
                    postContainers.each(function(){
                        var t = $(this);

                        if(t.attr("id") === undefined)
                            return;

                        if(hiddenPosts.indexOf(t.attr("id").replace("message_", "")) !== -1
                        || hiddenPostsPseudo.indexOf(t.find(".pseudo strong").text().toLowerCase()) !== -1){
                            t.find(".post, .JVCMaster_POST").hide();
                            t.find(".JVCMaster_POST_HIDDENPOST").show();
                        }
                    });

                    topicContainers.each(function(){
                        var t           = $(this)
                          , topicTitle  = t.find("td:eq(1) a")
                          , topicPseudo = t.find("td:last").prev().prev().text().toLowerCase()
                        ;

                        if(hiddenPostsPseudo.indexOf(topicPseudo) !== -1){
                            topicTitle.css("color", "#0C4568");
                            topicTitle.html("<b>JVCMaster</b> : <i style='font-weight:normal'>Ce topic a été caché</i>");
                        }
                    });
                }, 10);

                var btn = $("<img />", {
                    title   : "Cacher ce post"
                    , src   : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMEAYAAADkOZvdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAIcbAACL/wAA/6wAAIMCAACETAAA7XIAADqFAAAdxCRWn50AAALqSURBVHjaZJNfaFt1HMU/39+9jVmMXWVZCSOUIqPOMce1yKgjlDGCSh7GENEJfS4yREcp2odRhoziQzdKKaWKD2NIcVuZY5RZ1m4UQVHR0IcZNJSVlRpCrF0NaWju/f3xocM/23k7Lx8Oh3Nk5c/5eXBOBl0ngBr3TgBQ5DRgyUgC2HChXQe+UDXP5wafqKzc83+1s9Lhzria0TLjTfqHk3vlkgyri2G/rL5253lwbtdc4vwzveCOmYLOELpbxMhRk6Scl+OscY6q9wYFWZakV+eqdKp2r8ud84NYqqXf3TD3o3TzOdMnS5L1Fne94KsZtUoZ7Mcmq0dABqRLDYPqlhEV4KfsK7r2OwEAPxP8dHDm3u4X6Wk/lWqV21JOKhnQadHeqHc5Hqj8Vs/W8b/KuqQkS16OAd1USIMMy3uSJMYEQ3KUNh7TnR9/+EDnOFhd3QjcIjlOyZyEjOpZhlyaVYU3LDeJK0blVVcCKagjsgm08r7MAhm5Lfd5QitfrY3ZLGx9vz0mQ2DfpEII5sNwSbeDm4oWwlZQLiNJAAnUWa8I1GjIdSBglMUnwa6PTmpgfFMyk9B8t3GzYWF7rHm9PgBNq5ei78Bn0OwH0EFkbQrkS5VoKYNUmabjEe3hv+Ao32wLp6Fxpf5Oswjbl7eL7iq41+kD8ENvA8DXg3YEINLhbFgFz6o12wV20sT050Dv/xObs/a0XQC9bK6xAAaTBlCh1wDA5wCA78quFyDcH30TzYHkOBABpmhTTAKwjPtPFTl3BMC9bS888hUAFnZ+wMt07/AP0QVgfdsNwFE3AWCmbQXg1uanBRH49pfCSwCZqfQiQOzZpz4CMCfdPgDpc28BcIlxACnt+fppINVy1/8M3EozH5YAnzoVgPp4ox/w/+h9OAH4rm0n8Z5kWwIgsRzPA3hT3iGA+N1YHkD+mdFv89eAM8SIgXuAJgHkWWcT6KBMFUixjgYOs0ENUFQJAUWaOAA9dAL8PQB4PTdp3o3mAAAAAABJRU5ErkJggg=="
                    , click : function(){
                        var postContainer = $(this).parents(".msg") 
                          , id            = postContainer.attr("id").replace("message_", "")
                          , hiddenPosts   = JSON.parse(_.LS_get("hiddenposts") || "[]")
                        ;

                        if(hiddenPosts.indexOf(id) === -1){
                            postContainer.find(".post, .JVCMaster_POST").slideUp(300);
                            postContainer.find(".JVCMaster_POST_HIDDENPOST").slideDown(300);
                            hiddenPosts.push(id);
                        } else{
                            hiddenPosts.splice(hiddenPosts.indexOf(id), 1);
                            postContainer.find(".JVCMaster_POST_HIDDENPOST").slideUp(300);

                            if(postContainer.find(".JVCMaster_POST_CITATION").is('*'))
                                postContainer.find(".JVCMaster_POST_CITATION").slideDown(300);
                            else
                                postContainer.find(".post").slideDown(300);
                        }

                        _.LS_set("hiddenposts", JSON.stringify($.unique(hiddenPosts)));
                    }
                });
    
                _.setButton("BTN_HIDDENPOST", btn, false);

                btn = $("<img />", {
                    title : "Cacher les posts de ce pseudo"
                    , src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMEAYAAADkOZvdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAIcbAACL/wAA/6wAAIMCAACETAAA7XIAADqFAAAdxCRWn50AAAMCSURBVHjabI9hSJx1HMc/v//zv/N2qIldy3Is2a6ykuM6xhIRE4kYRzUJoYghFOMYw8QXEm6M3iQiI2SYyIgxLO5FjmGyfDFGLDOJrUmNw1Yd0Zwdyy65rnnq3XPP8/x7sdWC6/PmC1/4fvj9ZPFqS6ExbAwtdHMA1B4ZlQEwZ2RC2vCIM25S5DhqkpwiSbMVUScYVRPWrH7Xm2PZ6zPtrqOUDup09UMyr1al305oGVUvSgp2UHOmdgu8mLPgJrDpZYQ+7rBfPS1zZOSy8qtWaiWsEtYRonJUjVor4uh8VcIXsGbd3lK1PVU4JPWqX9XtuKSlU6WtHnB3un2uB+qQ9bN6FRiTYdmJjvUv/vr9QaLc5W4e5K3PBp977am3ZSFUb/JmTFRNR9VI1R4V30xuDP0VdNKKdg7QAUTIsgs4xXUp4r8nrGO/ecXsg+O/7Z1ufJJ/efn9q9M/fEDHT5Obme03GNno8uadl1iVZTkhKwSUDJEyOZCURCULhGVRzt4XOAPlYPkXuBWxP7SHqeC7Y/nzhTBkDxcGihfBpEvV5W9AmW6pYwnUEatTnQWqZZDJ/yxnidEF0mY+JlAp/n1y8852M/z57Wa0UAtOzm4q3gDNsrdqpsBpcG94X4O06ZO+/nurm6DP+d/xn4ckGf6o9OKmy045Ce5ssam4BOwK5H0hUF6XN25iUDxux+wLYK/Yp0tdlYLnj9W8GZiu7E0TPWYMZMnETfR+r1igx4TBmS+1lzSUolu5rXOVgsCQLqon/ufkfeYC48AV0wlAFhsHNHGTYxUMZsLcBjKm1Sj4aObxjYcfgGvXCj8WZ2DvcGC37zq8d+WxZ+ubYe0ru8+dgUe6q4b1GPg/t6ZkBYigaAH54tNn1h49TMjnFyUXzc3SC+YT40dva6/gpSDX5FzyBtEmQYYCOvC6yksEttNe3lwGTpp1tuDBbl+vOg11c1avCoH889Hily1rjQ0MoNBocwuHIBBnHQ/YzW0cIMQ6QSBCDg9QZCUAKBpMEYBWbIC/BwCMhjqxWSOhnwAAAABJRU5ErkJggg=="
                    , click : function(){
                        var postContainer     = $(this).parents(".msg") 
                          , pseudoToHide      = postContainer.find(".pseudo strong").text().toLowerCase()
                          , hiddenPostsPseudo = JSON.parse(_.LS_get("hiddenpostspseudo") || "[]")
                          // Sinon, dans la boucle, ça renvoit true/false 1 fois sur 2
                          , postsAreToHide    = (hiddenPostsPseudo.indexOf(pseudoToHide) === -1 ? true : false) 
                        ;

                        postContainers.each(function(){
                            var t      = $(this)
                              , pseudo = t.find(".pseudo strong").text().toLowerCase()
                            ;
                                if(pseudoToHide == pseudo){
                                    if(postsAreToHide){
                                        t.find(".post, .JVCMaster_POST").slideUp(300);
                                        t.find(".JVCMaster_POST_HIDDENPOST").slideDown(300);

                                        hiddenPostsPseudo.push(pseudoToHide);
                                    }
                                    else{
                                        t.find(".JVCMaster_POST").slideUp(300);
                                        if(t.find(".JVCMaster_POST_CITATION").is('*'))
                                            t.find(".JVCMaster_POST_CITATION").slideDown(300);
                                        else
                                            t.find(".post").slideDown(300);

                                        hiddenPostsPseudo.splice(hiddenPostsPseudo.indexOf(pseudoToHide), 1);
                                    }
                                }
                            
                        })

                        _.LS_set("hiddenpostspseudo", JSON.stringify($.unique(hiddenPostsPseudo)));

                    }
                });
    
                _.setButton("BTN_HIDDENPOSTSPSEUDO", btn, false);
            },
            destroy : function(){
                $(".JVCMaster_BTN_HIDDENPOST img").remove();
                $(".JVCMaster_BTN_HIDDENPOSTSPSEUDO img").remove();
            }
        },

        friendlist : {
            id : "friendlist",
            name : "Liste d'amis",
            description : "Gerez une liste d'amis",
            init : function(){
                _.insertCSS("span.JVCMaster_colorView{border:1px solid;cursor:pointer;display:inline-block;height:10px;margin-right:3px;vertical-align:middle;width:10px} \
                             button.JVCMaster_delColor{height:16px;line-height:11px;margin-right:4px;padding:0;vertical-align:middle;width:16px} \
                            ");

                function showFarbtastic(color, pseudo, friends, callback){
                    $.colorbox({
                        height : "380px", 
                        width  : "330px", 
                        onComplete : function(){
                            $("#JVCMaster_BTN_ValidateColor").click(function(){
                                var newColor = $("#Farbtastic_color").val();

                                if(newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){
                                    friends[pseudo.toLowerCase()] = {pseudo : pseudo, color : newColor };
                                    _.LS_set("friends", JSON.stringify(friends));
                                    $.colorbox.close();
                                    if(callback) callback(newColor);
                                } else {
                                    alert("Merci de rentrer une couleur héxa-decimale valide!");
                                }
                            });
                        },
                        html   : '<h2 style="font-weight : normal; height:50px;"><b>JVCMaster<b> : choississez une couleur pour votre ami <b>' + encodeURI(pseudo) + '</b></h2><input type="text" id="Farbtastic_color" name="color" value="' + encodeURI(color) + '" /><div id="Farbtastic_colorpicker"></div><button id="JVCMaster_BTN_ValidateColor">Valider</button>'
                    });

                    $("#Farbtastic_colorpicker").farbtastic("#Farbtastic_color");
                }

                (colorizePseudos = function(){
                    var friends = JSON.parse(_.LS_get("friends") || "{}")
                      , pseudos = $(".pseudo strong, td.pseudo");

                    pseudos.each(function(){
                        var t      = $(this)
                          , pseudo = $.trim(t.text().toLowerCase())
                        ;

                        if(friends[pseudo] !== undefined){
                            t.css("color", friends[pseudo]["color"]);
                            t.css("font-weight", "bold");
                            t.attr("data-color", friends[pseudo]["color"]);
                        } else{
                            if((t.attr("class") && t.attr("class") == "moderateur" || t.attr("class") && t.attr("class").match(/topic_mod/))){
                                t.css("color", "#C00");
                                t.attr("data-color", "#C00");
                            } else{
                                t.css("color", "#000");
                                t.attr("data-color", "#000");
                            }
                        }
                    })
                })();

                // Farbtastic Color Picker 1.2 - © 2008 Steven Wittens
                jQuery.fn.farbtastic=function(a){$.farbtastic(this,a);return this};jQuery.farbtastic=function(a,b){var a=$(a).get(0);return a.farbtastic||(a.farbtastic=new jQuery._farbtastic(a,b))};jQuery._farbtastic=function(a,d){var b=this;$(a).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var c=$(".farbtastic",a);b.wheel=$(".wheel",a).get(0);b.radius=84;b.square=100;b.width=194;if(navigator.appVersion.match(/MSIE [0-6]\./)){$("*",c).each(function(){if(this.currentStyle.backgroundImage!="none"){var e=this.currentStyle.backgroundImage;e=this.currentStyle.backgroundImage.substring(5,e.length-2);$(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+e+"')"})}})}b.linkTo=function(e){if(typeof b.callback=="object"){$(b.callback).unbind("keyup",b.updateValue)}b.color=null;if(typeof e=="function"){b.callback=e}else{if(typeof e=="object"||typeof e=="string"){b.callback=$(e);b.callback.bind("keyup",b.updateValue);if(b.callback.get(0).value){b.setColor(b.callback.get(0).value)}}}return this};b.updateValue=function(e){if(this.value&&this.value!=b.color){b.setColor(this.value)}};b.setColor=function(e){var f=b.unpack(e);if(b.color!=e&&f){b.color=e;b.rgb=f;b.hsl=b.RGBToHSL(b.rgb);b.updateDisplay()}return this};b.setHSL=function(e){b.hsl=e;b.rgb=b.HSLToRGB(e);b.color=b.pack(b.rgb);b.updateDisplay();return this};b.widgetCoords=function(i){var g,m;var h=i.target||i.srcElement;var f=b.wheel;if(typeof i.offsetX!="undefined"){var l={x:i.offsetX,y:i.offsetY};var j=h;while(j){j.mouseX=l.x;j.mouseY=l.y;l.x+=j.offsetLeft;l.y+=j.offsetTop;j=j.offsetParent}var j=f;var k={x:0,y:0};while(j){if(typeof j.mouseX!="undefined"){g=j.mouseX-k.x;m=j.mouseY-k.y;break}k.x+=j.offsetLeft;k.y+=j.offsetTop;j=j.offsetParent}j=h;while(j){j.mouseX=undefined;j.mouseY=undefined;j=j.offsetParent}}else{var l=b.absolutePosition(f);g=(i.pageX||0*(i.clientX+$("html").get(0).scrollLeft))-l.x;m=(i.pageY||0*(i.clientY+$("html").get(0).scrollTop))-l.y}return{x:g-b.width/2,y:m-b.width/2}};b.mousedown=function(e){if(!document.dragging){$(document).bind("mousemove",b.mousemove).bind("mouseup",b.mouseup);document.dragging=true}var f=b.widgetCoords(e);b.circleDrag=Math.max(Math.abs(f.x),Math.abs(f.y))*2>b.square;b.mousemove(e);return false};b.mousemove=function(h){var i=b.widgetCoords(h);if(b.circleDrag){var g=Math.atan2(i.x,-i.y)/6.28;if(g<0){g+=1}b.setHSL([g,b.hsl[1],b.hsl[2]])}else{var f=Math.max(0,Math.min(1,-(i.x/b.square)+0.5));var e=Math.max(0,Math.min(1,-(i.y/b.square)+0.5));b.setHSL([b.hsl[0],f,e])}return false};b.mouseup=function(){$(document).unbind("mousemove",b.mousemove);$(document).unbind("mouseup",b.mouseup);document.dragging=false};b.updateDisplay=function(){var e=b.hsl[0]*6.28;$(".h-marker",c).css({left:Math.round(Math.sin(e)*b.radius+b.width/2)+"px",top:Math.round(-Math.cos(e)*b.radius+b.width/2)+"px"});$(".sl-marker",c).css({left:Math.round(b.square*(0.5-b.hsl[1])+b.width/2)+"px",top:Math.round(b.square*(0.5-b.hsl[2])+b.width/2)+"px"});$(".color",c).css("backgroundColor",b.pack(b.HSLToRGB([b.hsl[0],1,0.5])));if(typeof b.callback=="object"){$(b.callback).css({backgroundColor:b.color,color:b.hsl[2]>0.5?"#000":"#fff"});$(b.callback).each(function(){if(this.value&&this.value!=b.color){this.value=b.color}})}else{if(typeof b.callback=="function"){b.callback.call(b,b.color)}}};b.absolutePosition=function(f){var g={x:f.offsetLeft,y:f.offsetTop};if(f.offsetParent){var e=b.absolutePosition(f.offsetParent);g.x+=e.x;g.y+=e.y}return g};b.pack=function(f){var i=Math.round(f[0]*255);var h=Math.round(f[1]*255);var e=Math.round(f[2]*255);return"#"+(i<16?"0":"")+i.toString(16)+(h<16?"0":"")+h.toString(16)+(e<16?"0":"")+e.toString(16)};b.unpack=function(e){if(e.length==7){return[parseInt("0x"+e.substring(1,3))/255,parseInt("0x"+e.substring(3,5))/255,parseInt("0x"+e.substring(5,7))/255]}else{if(e.length==4){return[parseInt("0x"+e.substring(1,2))/15,parseInt("0x"+e.substring(2,3))/15,parseInt("0x"+e.substring(3,4))/15]}}};b.HSLToRGB=function(m){var o,n,e,j,k;var i=m[0],p=m[1],f=m[2];n=(f<=0.5)?f*(p+1):f+p-f*p;o=f*2-n;return[this.hueToRGB(o,n,i+0.33333),this.hueToRGB(o,n,i),this.hueToRGB(o,n,i-0.33333)]};b.hueToRGB=function(f,e,g){g=(g<0)?g+1:((g>1)?g-1:g);if(g*6<1){return f+(e-f)*g*6}if(g*2<1){return e}if(g*3<2){return f+(e-f)*(0.66666-g)*6}return f};b.RGBToHSL=function(m){var i,o,p,j,q,f;var e=m[0],k=m[1],n=m[2];i=Math.min(e,Math.min(k,n));o=Math.max(e,Math.max(k,n));p=o-i;f=(i+o)/2;q=0;if(f>0&&f<1){q=p/(f<0.5?(2*f):(2-2*f))}j=0;if(p>0){if(o==e&&o!=k){j+=(k-n)/p}if(o==k&&o!=n){j+=(2+(n-e)/p)}if(o==n&&o!=e){j+=(4+(e-k)/p)}j/=6}return[j,q,f]};$("*",c).mousedown(b.mousedown);b.setColor("#000000");if(d){b.linkTo(d)}};
                var FarbtasticWheel  = "data:image/png;base64,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" 
                  , FarbtasticMarker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAK3RFWHRDcmVhdGlvbiBUaW1lAHZyIDE0IGp1bCAyMDA2IDEzOjMxOjIzICswMTAwHvJDZwAAAAd0SU1FB9YHDgsgJYiZ4bUAAAAJcEhZcwAALiIAAC4iAari3ZIAAAAEZ0FNQQAAsY8L/GEFAAAB5ElEQVR42q2Tz0sqURTH72Qq4mASSAoSIfSDdCEI8qJFLXSjLYSQNoGLINrI8/0ZD9q0KnDlKkIMebmP9xZRCEEiLQLBiMiNJDYq/Zg573vpCkM6CdGBD3Pn3OvXe77nDGPfENKwJBHx/CxYAtNAAVfgXJKk7khVCCyCP6ALVKAJXkEdbINxw5tgM4HHPphSFEUql8usXq8zWZZZKBRiPp+PH3sBx2Br4FbiBg+aplGxWKRgMPiMH1+YTKZDq9V64na7G+l0mprNJo7RG/g94IEoQSsUCuRyue6QToIJYAJWMA/Bo2QySZ1Ohws9gZBeZI570Gq1yO/395BKGJg+ZbFYznK5HAmf9vQiKW5iqVQim832Fyn5E+83Y7EYieAdY2Nig7dRqtVqrNfr3YiWGsVltVrtr2f0IrwEZrfbGeqWhQ9GMeFwOPprRS9SAWo4HGZOp/MH1l4DAS6+HolE+u9Xek9kcK+qKqVSKUL/s0hPDhFY83g8j5VKhcQg7nxs80/w0mg0KB6Pa2az+RTpDbDA3sd/lwvk8/l+Z7iS/FHEAor8H9rtNmWzWYpGo+T1eikQCFAmkyFxAy7AJ255aMHYcIID8d1oNBi8hGuwwkYFDq0CPlG3YsTb4B/4BRwjBb4S/wGzT16tu5THiAAAAABJRU5ErkJggg==" 
                  , FarbtasticMask   = "data:image/png;base64,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" 
                _.insertCSS(".farbtastic{position: relative;margin : 0 auto;text-align : center} \
                             .farbtastic *{position: absolute;cursor: crosshair} \
                             .farbtastic, .farbtastic .wheel{width: 195px;height: 195px} \
                             .farbtastic .color, .farbtastic .overlay{top: 47px;left: 47px;width: 101px;height: 101px} \
                             .farbtastic .wheel{background: url(" + FarbtasticWheel + ") no-repeat;width: 195px;height: 195px} \
                             .farbtastic .overlay{background: url(" + FarbtasticMask + ") no-repeat} \
                             .farbtastic .marker{width: 17px;height: 17px;margin: -8px 0 0 -8px;overflow: hidden;background: url(" + FarbtasticMarker + ") no-repeat} \
                ");

                delete FarbtasticWheel, FarbtasticMarker, FarbtasticMask;

                var BTN_FRIENDLIST = $("<a/>", {
                    id   : "JVCMaster_BTN_FRIENDLIST",
                    text : "JVCMaster : Liste d'amis",
                    css  : { cursor : "pointer"},
                    click : function(){
                        var html = '<div class="JVCMaster_colorboxHTML" style="min-width : 300px;" class="forums hp_forums"><div class="bloc1"><h3 class="titre_bloc" style="min-width:200px"><span>JVCMaster : Liste d\'amis</span></h3><div class="bloc_inner"><span id="JVCMaster_MSG_notFriends">Vous n\'avez pas d\'amis. <img src="http://image.jeuxvideo.com/smileys_img/41.gif" alt=":rire2:"></span><ul class="liste_liens">'
                          , friends = JSON.parse(_.LS_get("friends") || "{}")
                        ;
                        
                        var haveAFriend = false;
                        
                        $.each(friends, function(pseudo){
                            haveAFriend = true;

                            html += "<li data-pseudo='" + _.convertBadChars(friends[pseudo]["pseudo"]) + "' data-color='" + _.convertBadChars(friends[pseudo]["color"]) + "'><button class='JVCMaster_delColor'>x</button><span class='JVCMaster_colorView' style='background-color : " + _.convertBadChars(friends[pseudo]["color"]) + "'></span>" + _.convertBadChars(friends[pseudo]["pseudo"]) + "</li>"
                        });

                        html += "</ul></div></div>";

                        $.colorbox({
                            html : html,
                            onComplete : function(){
                                if(haveAFriend)
                                    $("#JVCMaster_MSG_notFriends").hide();
                                else 
                                    $("#JVCMaster_MSG_notFriends").show();
                                
                                $(".JVCMaster_colorView").live("click", function(){
                                    var t = $(this);
                                    showFarbtastic(t.parent().attr("data-color"), t.parent().attr("data-pseudo"), JSON.parse(_.LS_get("friends") || "{}"));
                                });

                                $(".JVCMaster_delColor").live("click", function(){
                                    var t = $(this);
                                    t.parent().remove();
                                    delete friends[t.parent().attr("data-pseudo").toLowerCase()];
                                    _.LS_set("friends", JSON.stringify(friends));

                                    colorizePseudos();
                                });
                            }
                        });
                    }
                });
                BTN_FRIENDLIST.appendTo($("<div>").prependTo($("#connexion")));

                setTimeout(function(){
                    BTN_FRIENDLIST.appendTo($("<li>").prependTo($("div#log ul")));
                }, 1001);

                var pseudos = $(".pseudo strong");
                pseudos.css("cursor", "pointer");
                pseudos.attr("title", "Ajouter ce pseudo à mes amis");
                pseudos.live("click", function(){
                    var t = $(this);
                    showFarbtastic(t.attr("data-color"), t.text(), JSON.parse(_.LS_get("friends") || "{}"), function(color){
                        colorizePseudos();
                    });
                });
            },
            destroy : function(){
                $("#JVCMaster_BTN_FRIENDLIST").parent().remove();

                var pseudos     = $(".pseudo strong")
                  , pseudosModo = $(".pseudo strong.moderateur, .pseudo.topic_mod")
                ;

                pseudos.css("color", "#000");
                pseudos.attr("data-color", "#000");
                pseudosModo.css("color", "#C00");
                pseudosModo.attr("data-color", "#C00");
            
            }
        },

        shortcuts : {
            id          : "shortcuts",
            name        : "Raccourcis",
            description : "Des raccourcis sont ajoutés",
            init : function(){
                if(_.onMp() || _.onOverviewOfAPost() || !window.location.href.match("^http:\/\/www\.jeuxvideo\.com\/forums"))
                    return;

                _.insertCSS(".JVCMaster_BTN_MP span{cursor : pointer;display: inline-block;height: 10px;background: url(http://image.jeuxvideo.com/css_img/defaut/mprives/enveloppe.png) no-repeat top right;width: 16px}");

                // Bouton MP
                $(".pseudo strong").each(function(){
                    var pseudo = $(this);

                    var btn = $("<a/>", {
                        title : "Envoyer un mp à " + pseudo.text(),
                        href  : "http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=" + pseudo.text(),
                        css   : {
                            background: "url(http://image.jeuxvideo.com/css_img/defaut/mprives/enveloppe.png) no-repeat top right"
                            , width   : "16px"
                            , display : "inline-block"
                            , height  : "10px"
                        }
                    });

                    btn.appendTo(pseudo.parents(".msg").find(".JVCMaster_BTN_MP"));
                });

                // Derniere page lors du clic gauche sur l'icône du topic
                $("#liste_topics tr:not(:first)").each(function(){
                    var t         = $(this)
                      , icon      = t.find("td img")
                      , href      = t.find("td:eq(1) a").attr("href")
                      , nbMessage = parseInt(t.find("td:last").prev().text()) + 1
                    ;

                    icon.wrap($("<a/>", {
                        href : href.replace(/(http:\/\/www.jeuxvideo.com\/forums\/|http:\/\/.*\.forumjv.com\/)([0-9]+\-)([0-9]+\-)([0-9]+\-)([0-9]+\-)/, "$11-$3$4" + Math.ceil(nbMessage / 20) + '-'),
                        title : "Acceder à la dernière page de ce topic", 
                        // Bug sur les forumJV
                        css : {
                            display : "inline-block",
                            width   : "16px"
                        }
                    }).bind("contextmenu", function(e){ // Clic droit, alors on va sur la page de réponse
                        window.open(href.replace(/(http:\/\/www.jeuxvideo.com\/forums\/|http:\/\/.*\.forumjv.com\/)([0-9]+\-)([0-9]+\-)([0-9]+\-)([0-9]+\-)/, "$13-$3$4" + Math.ceil(nbMessage / 20) + '-'));
                        return false;
                    }));
                });

                // Permet de choisir la page en rentrant un numéro de page dans un input[type=text]
                _.insertCSS(".JVCMaster_FORM_navigatePage{ text-align : center !important} \
                            .JVCMaster_FORM_navigatePage input[type=text]{ height : 13px; vertical-align : top}");

                _.scripts.quicknavigation.insertLoadingMessage();

                var formNavigatePage = $("<form>", {
                    "class" : "JVCMaster_FORM_navigatePage"
                });

                formNavigatePage.append($("<input>", {
                    type : "image"
                  , src : "data:image/png;base64,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"
                }));

                formNavigatePage.append($("<input>", {
                    type : "text"
                  , size : "5"
                  , value : window.location.href.match(/(http:\/\/www.jeuxvideo.com\/forums\/|http:\/\/.*\.forumjv.com\/)([0-9]+\-)([0-9]+\-)([0-9]+\-)([0-9]+)/)[5]
                }));

                formNavigatePage.submit(function(e){
                    var pageNumber = $(this).find("input[type=text]").val()
                      , pagesNumber = $(".pagination:first").find("a, strong").filter(":last")
                    ;

                    if(pagesNumber.text() === "»")
                        pagesNumber = pagesNumber.prev();

                    pagesNumber = pagesNumber.text();
                    
                    if(_.isPositiveInteger(pagesNumber) && !!(pageNumber = parseInt(pageNumber, 10)) && pageNumber >= 1 && pageNumber <= pagesNumber){
                        var pageUrl = window.location.href.replace(/(http:\/\/www.jeuxvideo.com\/forums\/|http:\/\/.*\.forumjv.com\/)([0-9]+\-)([0-9]+\-)([0-9]+\-)([0-9]+\-)/, "$11-$3$4" + pageNumber + '-');
                        _.scripts.quicknavigation.navigatePage(pageUrl);
                    } else {
                        alert("Veuillez entrer un nombre correct");
                    }

                    e.preventDefault();
                });

                $(".pagination").after(formNavigatePage);

                // Lien vers les statistiques du forum
                _.insertCSS("#JVCMaster_SPAN_forumStatistics{ color:white; position: static; } \
                            #JVCMaster_SPAN_forumStatistics a{ color : #000}");

                $("h2.titre_page").next().children().filter(":first").append($("<span>", {
                    id : "JVCMaster_SPAN_forumStatistics"
                  , html : ' - <a href="http://jvstats.forum-stats.org/stats/inflate.php?num=' + window.location.href.match(/(http:\/\/www.jeuxvideo.com\/forums\/|http:\/\/.*\.forumjv.com\/)([0-9]+\-)([0-9]+)\-([0-9]+\-)([0-9]+)/)[3] + '">Statistiques du forum</a>'
                }));
            },
            destroy : function(){
                $(".JVCMaster_BTN_MP a").remove();
                $("#JVCMaster_SPAN_forumStatistics").remove();
            }
        },

        showcdv : {
            id          : "showcdv",
            name        : "Show CDV",
            description : "Affiche la CDV dans une lightbox",
            init : function(){
                $("a[target=profil], .pseudo > a, .CITATION_pseudo a").click(function(e){
                    var url = $(this).attr("href");

                    $.colorbox({
                        iframe     : true
                      , href       : $(this).attr("href")
                      , width      : "830px"
                      , title      : "<a href='" + url + "' style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap'>" + url + "</a>"
                      , height     : "81%"
                      , onComplete : function(){
                            // Le temps que le DOM s'initialise
                            setTimeout(function(){
                                $("#cboxLoadedContent iframe").on("load", function(){  
                                    var tFrame = $(this)
                                      , tabs   = tFrame.contents().find("#onglets")
                                    ;

                                    tabs.find("li").click(function(e){
                                        var t = $(this);

                                        if(t.find('a').is('*'))
                                            tFrame.attr("src", t.find('a').attr("href"));
                                        return false;
                                    });
                                });
                            }, 20);
                        }
                    });

                    return false;
                })
            },
            destroy : function(){
                $("a[target=profil], .pseudo > a, .CITATION_pseudo a").unbind("click");
            }
        },

        hightlightpemt : {
            id          : "hightlightpemt",
            name        : "Surlign'PEMT",
            description : "Les posts \"PEMT\" sont surlignés",
            init : function(){
                _.insertCSS(".JVCMaster_PEMT_time{ font-size : 11px}");
                var formatDate = function(date){ if(!date.is('*')) return; var match = date.text().match("([0-9]*[a-z]* [a-zûé]* [0-9]{4} à [0-9]{2}:[0-9]{2}:[0-9]{2})"); return (match == null) ? false : match[1]}
                  , dates = $(".date");

                dates.each(function(k){
                    var date     = $(dates[k])
                      , prevDate = $(dates[k - 1])
                    ;

                    if(formatDate(date) == formatDate(prevDate)){
                        date.html(date.html().replace(/([0-9]{2}:[0-9]{2}:[0-9]{2})/g, "<span class='JVCMaster_PEMT_time'>$1</span>"));
                        prevDate.html(prevDate.html().replace(/([0-9]{2}:[0-9]{2}:[0-9]{2})/g, "<span class='JVCMaster_PEMT_time'>$1</span>"));
                    }
                });  
            },
            destroy : function(){
                $(".date").each(function(){
                    var date = $(this);
                    date.html(date.html().replace(/(<span class="JVCMaster_PEMT_time">)*<span class="JVCMaster_PEMT_time">([0-9]{2}:[0-9]{2}:[0-9]{2})<\/span>(<\/span>)*/g, "$2"));
                })
            }
        },

        hightlightpermapost : {
            id          : "hightlightpermapost",
            name        : "Surlign'perma-post",
            description : "Les posts \"permanents\" sont surlignés",
            init : function(){
                var hash = window.location.hash;

                scrollTo = function(el){el = $(el);if(el.is('*')){ el.addClass("JVCMaster_highlightedPost"); $("body").animate({ scrollTop : el.offset().top - 50 }, 500, function(){ el.stop().animate({ backgroundColor : "#FFF9D0" }, 500) }); }}

                if(hash !== "" && !!hash.match(/^\#message_[0-9]+$/) && hash !== "#last_msg"){
                    setTimeout(function(){
                        scrollTo(hash);
                    }, 100);
                }

                $(".ancre a").live("click", function(e){
                    var t    = $(this)
                      , href = t.attr("href").match("(#.*)$")[0]
                      , post = href
                    ;

                    if($(post).is('*')){
                        var highlightedPost = $('.JVCMaster_highlightedPost');
                        highlightedPost.animate({ backgroundColor : "#EFF4FC" }, 200);
                        highlightedPost.removeClass("JVCMaster_highlightedPost");
                        scrollTo(post);
                    }
                });
            },
            destroy : function(){
                var highlightedPost = $('.JVCMaster_highlightedPost');
                
                highlightedPost.css("backgroundColor", "").removeClass("JVCMaster_highlightedPost");
                $(".ancre a").unbind("click");
            }
        },
        
        favoritestopics : {
            id          : "favoritestopics",
            name        : "Topics préférés",
            description : "Epinglez vos topics préférés",
            init : function(){
                if(!window.location.href.match("^http:\/\/www\.jeuxvideo\.com\/forums"))
                    return; 
                
                _.insertCSS("#JVCMaster_FavoritesTopics li{position:relative} \
                             #JVCMaster_FavoritesTopics li .JVCMaster_BTN_RMFAVORITESTOPIC{background:url(http://image.jeuxvideo.com/css_img/defaut/bt_forum_supp_pref.png) no-repeat top left;cursor:pointer;display:none;height:10px;position:absolute;right:0;top:2px;width:10px} \
                             #JVCMaster_FavoritesTopics li a:first-child{display:inline-block;overflow:hidden;text-overflow:ellipsis;width:270px;white-space:nowrap} \
                             #JVCMaster_FavoritesTopics li:hover .JVCMaster_BTN_RMFAVORITESTOPIC{display:inline-block} \
                             #JVCMaster_FavoritesTopics .JVCMaster_BTN_RMFAVORITESTOPIC:hover{background-position:bottom left} \
                            ");

                html =  "<h3 class=\"titre_bloc\"><span>Mes topics préférés</span></h3><div class=\"bloc_inner\"><span id=\"JVCMaster_MSG_notFavTopics\">Vous n'avez pas encore choisi de topics.</span><ul class=\"liste_liens\"></ul></div>"

                // Box en dessous des forums préférés
                $("div.bloc3:first").after(
                    $("<div>", {
                        id : "JVCMaster_FavoritesTopics",
                        "class" : "bloc3",
                        html : html
                    })
                );

                
                (listFavoritesTopics = function(){
                    var favoritesTopics = JSON.parse(_.LS_get("favoritesTopics") || "{}");
                    
                    $("#JVCMaster_MSG_notFavTopics").show();
                    $("#JVCMaster_FavoritesTopics ul").show(0, function(){
                        $(this).find("li").remove();
                    
                        for(topic in favoritesTopics){
                            $("#JVCMaster_MSG_notFavTopics").hide();

                            var split     = topic.split("|||")
                              , forumName = split[0]
                            ;
                            split.shift();

                            var topicName = split.join("|||")
                              , topicUrl  = favoritesTopics[topic]["topicUrl"]
                            ;

                            $("<a/>", {
                                href  : topicUrl.replace(/(<|>)/g, function(match, p1){ return _.convertBadChars(p1)})
                              , title : topicName.replace(/(<|>)/g, function(match, p1){ return _.convertBadChars(p1)})
                              , html  : "<b class='JVCMaster_FavoritesTopics_forumName'>" + forumName.replace(/(<|>)/g, function(match, p1){ return _.convertBadChars(p1)}) + "</b> : <span class='JVCMaster_FavoritesTopics_topicName'>" + topicName.replace(/(<|>)/g, function(match, p1){ return _.convertBadChars(p1)}) + "</span>"
                             }).after($("<a/>", {
                                "class" : "JVCMaster_BTN_RMFAVORITESTOPIC",
                                click : function(){
                                    var t         = $(this)
                                      , forumName = t.prev().find(".JVCMaster_FavoritesTopics_forumName").text()
                                      , topicName = t.prev().find(".JVCMaster_FavoritesTopics_topicName").text()
                                    ;

                                    delete favoritesTopics[forumName + "|||" + topicName];
                                    _.LS_set("favoritesTopics", JSON.stringify(_.sortObject(favoritesTopics)));
                                    listFavoritesTopics();
                                }
                             })).appendTo($("<li>").appendTo("#JVCMaster_FavoritesTopics ul"));
                        }

                        $("#JVCMaster_FavoritesTopics ul").delay(100).slideDown(250);

                    });
                })();

                $("div.bloc_forum div.bloc_inner").css("textAlign", "center");
                // On règle les quelques bugs d"alignement
                $("div.bloc_forum form").css("textAlign", "left");
                $("div.bloc_forum td.nouveau, div.bloc_forum td.navig_prec").css("textAlign", "left");
                // On insère le petit bouton à côté des titres du topic

                $("div.bloc_forum h1.sujet, div.bloc_forum h4.sujet").css({
                    display : "inline-block",
                    verticalAlign : "middle"
                }).after(
                    $("<img>", {
                        "class" : "JVCMaster_BTN_FAVORITESTOPIC",
                        title   : "Epingler ce topics à vos topics préférés",
                        src     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAIAQMAAAARA0f2AAAABlBMVEX///+ZzADAT8hDAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcCBsMAieAZsMmAAAAGklEQVQI12MoZ2D43wBF9QwMdgwMMgwMHAwAXZcF1pKKg9EAAAAASUVORK5CYII=",
                        css     : {
                            cursor : "pointer",
                            marginLeft : "5px",
                        },
                        title : "JVCMaster : ajouter ce topic à vos topics favoris",
                        click : function(){
                            var favoritesTopics = JSON.parse(_.LS_get("favoritesTopics") || "{}")
                              , topicUrl        = location.href.replace(/(http:\/\/www.jeuxvideo.com\/forums\/)(?:[0-9])-((?:[0-9]*)-(?:[0-9]*)-)(?:[0-9]*)-(.*)(#form_post)?/g, "$11-$21-$3")
                              , topicName       = $(".bloc_forum .sujet:first").text()
                              , topicName       = $.trim(topicName.substr(10).substr(0, topicName.length - 12))
                              , forumName       = $.trim($(".bloc_forum h3:first").html().replace(/<span class="txt">Forum : <\/span>([^<]*)(<span id="JVCMaster_SPAN_forumStatistics">.*<\/span>)?/, "$1"))
                            ;

                            favoritesTopics[forumName + "|||" + topicName] = {
                                topicUrl : topicUrl
                            }

                            _.LS_set("favoritesTopics", JSON.stringify(_.sortObject(favoritesTopics)));

                            listFavoritesTopics();
                        }
                    })
                );
            },
            destroy : function(){
                $("#JVCMaster_FavoritesTopics").remove();
                $(".JVCMaster_BTN_FAVORITESTOPIC").remove();
            }
        },

        visionoelshack : {
            id          : "visionoelshack",
            name        : "Visionneuse NoelShack",
            description : "Visionner directement les ressources hébergées sur NoelShack",
            init : function(){
                setTimeout(function(){
                    var $links = $("div[id^=message]").find("li:eq(2)").find("a[href^=http\\:\\/\\/www\\.noelshack\\.com], a[href^=http\\:\\/\\/image\\.noelshack\\.com]");

                    $links.each(function(){
                        var t = $(this);
                        t.attr("data-jvcmaster-visionoelshack", t.parents(".msg").attr("id").replace("message_", ""));
                    });

                    $("[data-jvcmaster-visionoelshack]").each(function(){
                        var t        = $(this)
                          , tParent  = t.parents(".msg")
                          , parentId = t.attr("data-jvcmaster-visionoelshack")
                          , pageUrl  = t.attr("href")
                          , resUrl   = pageUrl.replace(/http:\/\/www\.noelshack.com\/([0-9]{4})\-([0-9]*)\-([0-9]*)\-(.*)/, "http://image.noelshack.com/fichiers/$1/$2/$3-$4")
                          , params   = {
                                photo     : true
                              , href      : resUrl
                              , title     : "<a href='" + resUrl + "' style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap'>Lien</a>"
                              , maxHeight : "95%"
                              , maxWidth  : "95%"
                              , rel       : parentId
                          }
                        ;

                        if(resUrl.match(/\.swf$/)){
                            params["iframe"]      = true;
                            params["innerWidth"]  = "50%";
                            params["innerHeight"] = "60%";

                            delete params["photo"], params["maxHeight"], params["maxWidth"];
                        }

                        t.colorbox(params);
                    });
                }, 10);
            },
            destroy : function(){
                $("div[id^=message]").find("li:eq(2)").find("a[href^=http\\:\\/\\/www\\.noelshack\\.com], a[href^=http\\:\\/\\/image\\.noelshack\\.com]").unbind("click");
            }
        },

        quicknavigation : {
            id          : "quicknavigation",
            name        : "Quick Navigation",
            description : "Naviguez d'une façon plus rapide",
            init : function(){
                if(window.location.href.match("^http:\/\/www\.jeuxvideo\.com\/forums")){
                    _.scripts.quicknavigation.insertLoadingMessage();
                    
                    $(".pagination a, .bt_rafraichir:first, .bt_rafraichir:last").live("click", function(e){
                        if(e.handled === true)
                            return;
                        
                        var t = $(this)
                          , pos = document.body.scrollTop
                        ;

                        _.scripts.quicknavigation.navigatePage($(this).attr("href"), function(){
                            if(t.attr("class") == "bt_rafraichir") $("body").animate({scrollTop : pos}, 200);
                        });


                        e.handled = true;
                        return false;
                    });
                }                 
            },
            destroy : function(){
                $(".pagination a").die("click");
            },
            navigatePage : function(pageUrl, callback){
               $("body").animate({scrollTop : 0}, 100);

                $("div[id^=message]").remove();
                $("#JVCMaster_loadPost").fadeIn(50);

                $.ajax({
                    dataType : "html",
                    url      : pageUrl,
                    success  : function(data){
                        $("#JVCMaster_loadPost").fadeOut(50, function(){
                            if (history && history.pushState)
                                history.pushState({}, '', pageUrl);
                            
                            $(".bt_rafraichir").attr("href", pageUrl);
                            $(".navig_pages").html($(data).find(".navig_pages:first").html());
                            $(".discu_boutons:first").after($(data).find("div[id^=message]"));

                            $("#JVCMaster_loadPost").remove();

                            _.pseudoArea = $(".msg").parent().find("li span:last-child:not(.generic), div[id^=message] ul").parent().find(".pseudo");
                            _.setButtonsArea();
                            $.each(_.activatedExtensions, function(k, script){
                                _.scripts[script].destroy();
                                _.scripts[script].init();
                            });   

                            if(callback) callback();
                        });
                    }
                    
                });
            },
            insertLoadingMessage : function(){
                if($("#JVCMaster_loadPost").is('*'))
                    return;

                _.insertCSS("#JVCMaster_loadPost{display : none; font-size : 20px;height : 40px;line-height : 1.4em;text-align  : center}");

                $(".discu_boutons:first").after($("<p>", {
                    id   : "JVCMaster_loadPost" 
                  , html : "Chargement..."
                }));
            }
        },

        quickresponse : {
            id          : "quickresponse",
            name        : "Quick Response",
            description : "Répondez plus vite à un topic!",
            init : function(){
                 if(window.location.href.match("^http:\/\/www\.jeuxvideo\.com\/forums\/1") && $(".bt_repondre").is('*')){
                    var JVCMaster_QuickResponse = $("<div>", {
                        id : "JVCMaster_quickResponse"
                    });

                    $(".bloc_forum:last").before(JVCMaster_QuickResponse);

                    $.ajax({
                        dataType : "html",
                        url      : $(".bt_repondre:first").attr("href"),
                        success  : function(data){
                            JVCMaster_QuickResponse.append($(data.replace(/<p class="lien_base">\n.*\n<\/p>/, "").replace("Répondre sur ce sujet", "JVCMaster : Réponse rapide")).find(".bloc_forum:last, form[name=post2]"));
                            JVCMaster_QuickResponse.find("#boutons_repondre").css({background : "none", paddingBottom : "0"});

                            $("#boutons_repondre").keydown(function(e){
                                if(e.keyCode == 8)
                                    return false;
                            });
                        }
                    });
                }
            },
            destroy : function(){
                $("#JVCMaster_quickResponse").remove();
            }
        }
    };
}


var script = document.createElement("script");
script.appendChild(document.createTextNode("(JVCMaster = " + JVCMaster.toString() +")();\nJVCMaster = new JVCMaster(); JVCMaster.init();"));
(document.body || document.head || document.documentElement).appendChild(script)
