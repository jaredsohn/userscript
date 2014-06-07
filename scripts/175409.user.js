// ==UserScript==
// @name        百变饼（修改版）
// @description 百度首页仿Bing
// @include     http://www.baidu.com/
// @include     http://www.baidu.com/home*
// @include     http://www.baidu.com/index.php*
// @exclude     http://www.baidu.com/home/page/show/setting*
// @run-at      document-start
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @grant       GM_setValue
// @grant       GM_getValue
// @updateURL   https://userscripts.org/scripts/source/175409.meta.js
// @downloadURL https://userscripts.org/scripts/source/175409.user.js
// @author      谷哥卫士、雨滴在心头、林小鹿吧
// @version     14.05.11
// ==/UserScript==
var doc=document.documentElement,
    xmlns=doc.hasAttribute('xmlns'),
    docW=doc.clientWidth,
    ini,
    browser=navigator.userAgent.indexOf('Chrome'),
    isOpera=navigator.userAgent.indexOf('OPR')>-1,
    w1=browser!=-1?docW-20:docW-37,
    w2=browser!=-1?docW-113:docW-130,
    w3=browser!=-1?docW:docW-17,
    bOrb=localStorage['bOrb']||'bing',
    keyevt=function(num,prop,val1,val2,func,style,text1,text2,cw){
        document.addEventListener('keydown',function(e){
            if(e.keyCode==num&&!/input/i.test(e.target.tagName)){
                localStorage[prop]=localStorage[prop]==val1?val2:val1;
                if(style&&!/wd=.*/.test(location.hash))
                    style.innerHTML=localStorage[prop]==val1?text1:text2;
                (!cw)&&(localStorage['wallpaper']='');
                if(func)
                    func()
            }
        },false)
    },
    wp=localStorage['wallpaper']?'url('+localStorage["wallpaper"]+')':'none',
    nvm=browser==-1?'#nv>a:first-child{margin-left:19px}':'',
    ct=browser!=-1?'#nv>*:last-child{position:absolute!important;overflow:hidden;width:28px;height:16px;margin-top:1px}':'',
    fnv=browser!=-1?'#s_ndirect_area .s-ncf{width:'+docW+'px!important}':'',
    cfgObj={
        chkbx1:true,
        chkbx2:true,
        chkbx3:true,
        chkbx4:false,
        chkbx5:false,
        chkbx6:true
    },
    cfgStr=JSON.stringify(cfgObj),
    cfgStorage=GM_getValue('bOrb_cfg',cfgStr),
    objPfs=JSON.parse(cfgStorage),
    bgcoverset=objPfs['chkbx1'],
    bigpic=objPfs['chkbx2'],
    showvideo=objPfs['chkbx3'],
    bgcover=bgcoverset?'#bgDiv{background-size:cover!important;background-position:0 0!important}':'',
    ntr=objPfs['chkbx4'],
    ntrpt=ntr?'li[class~="s-ncf-nav"],li[class~="s-nori-nav"],#s_nori_add_btn{background-color:transparent!important}\
    li[class~="s-ncf-nav"]:hover{background-color:rgba(255,255,255,.3)!important}\
    .sc-dragitem{color:rgb(255,255,255)!important}\
    ':'',
    hiRes=objPfs['chkbx5'],
    oldIcon=objPfs['chkbx6'],
    ctext1='@-webkit-keyframes spin{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}\
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\
    a,.sc-dragitem{text-decoration:none!important}\
    html{overflow:auto!important}\
    html,#u_sp,#bottom_container{border-width:0px!important;background-color:rgb(51,51,51)!important;font-size:13px}\
    body{overflow:hidden;height:100%!important;min-width:1000px;min-height:562px;background-color:rgb(51,51,51)!important}\
    body>*,#lg>*,#bottom_container>*,#s_seth,.bottom-line2>.s-bottom-copyright{display:none}\
    #wrapper,#content{height:100%}\
    #wrapper,#u_sp,#s_username_menu,#m,#s_wrap,div[id^="sug_conn_"],#bottom_container>div[class^="bottom-line"],#messageWindow{display:block}\
    #u_sp{margin:auto;position:relative;min-height:28px;min-width:800px;max-width:2560px;padding:7px 10px 0 0;z-index:9;color:transparent}\
    .s-skin-hasbg #u_sp{padding-bottom:2px}\
    #s_neo_link{visibility:visible;margin-right:5px!important}\
    #s_tradditional_link{visibility:hidden}\
    .user-name-top{background:url(http://su.bdimg.com/static/skin/img/skin_2bac2a1f.png) no-repeat right -110px}\
    #s_username_top,.un{font-weight:normal!important}\
    #u_sp>*:not([href="/gaoji/preferences.html"]):not(#s_i_msg),#nv>a{color:rgb(153,153,153)!important}\
    .s-skin-hasbg #u_sp>:not([href="/gaoji/preferences.html"]):not(#s_i_msg){position:relative;top:1px}\
    #u_sp>a[href="/gaoji/preferences.html"],#nav,#sh_rdiv>a[class^="sh_p"],#sh_igw{background:url(http://cn.bing.com/s/a/hpc8.png) no-repeat}\
    #u_sp>#s_i_msg,#u_sp>a[href="/gaoji/preferences.html"]{position:absolute;height:20px;width:20px;right:13px;background-position:-121px -71px;color:transparent!important;overflow:hidden;margin-top:1px!important}\
    #u_sp>#s_i_msg{right:42px;background-position:0px 0px;background-size:20px 20px;border-radius:2px}\
    #u_sp>a[href="/gaoji/preferences.html"]{-webkit-transform:rotate(0deg);transform:rotate(0deg)}\
    .s-skin-hasbg #u_sp>#s_i_msg,.s-skin-hasbg #u_sp>a[href="/gaoji/preferences.html"]{margin-top:2px!important}\
    #u_sp>a[href="/gaoji/preferences.html"]:hover{background-position:-121px -49px;-webkit-animation:spin 1s linear 0s infinite normal;animation:spin 1s linear 0s infinite normal}\
    #outerDiv1{position:absolute!important;right:18px;top:29px!important;padding-top:8px}\
    .inbetweenDiv1{border:solid 1px rgb(235,235,235)}\
    #u_sp>a[href="/gaoji/preferences.html"]:hover~#outerDiv1,#outerDiv1:hover{display:block!important}\
    [id^="innerDiv"],#btnDiv1{padding:10px 15px;border:solid 1px rgb(215,215,215);background-color:rgb(235,235,235)}\
    .inbetweenDiv1>[id^="innerDiv"]:hover{color:rgb(202,202,202)!important;border:solid 1px rgb(40,40,40);background-color:rgb(20,20,20)}\
    #btnDiv1{padding:7px 13px;text-align:center}\
    #OK_btn1{-moz-appearance:none!important;background-color:rgb(38,114,226);border:none!important;padding:3px 7px}\
    #OK_btn1:not([disabled]){color:rgb(255,255,255)!important}\
    #OK_btn1:not([disabled]):hover{background-color:rgb(90,148,241)}\
    #OK_btn1:not([disabled]):active{background-color:rgb(33,33,33)}\
    #s_username_menu{border:none;box-shadow:1px 1px 2px rgb(204,204,204);font-size:13px;top:31px}\
    #s_username_menu>a{color:rgb(153,153,153);background-color:rgb(255,255,255)}\
    .sep{border-top-color:rgb(235,235,235)!important}\
    #s_username_menu>a:hover{background-color:rgb(235,235,235)!important}\
    #nv{margin:auto;position:relative;top:-24px;padding:8px 0 0 0;text-indent:0px;z-index:9}\
    #nv>*{font-size:13px!important}\
    #nv>a{font-weight:700}\
    #nv>b{display:none}\
    '+ct+
    '#m{position:relative;top:-35px;width:100%!important;height:100%;max-width:2560px;min-width:1000px;min-height:562px;margin:auto}\
    #lg{position:absolute;top:20%;left:8%;width:175px;height:35px!important;z-index:6}\
    #lg,[class$="btn_wr"]:first-of-type,.s-skin-hasbg .btn_wr,#sh_igf,#sh_igl,#sh_igr,#sh_cp{background:url(http://imgsrc.baidu.com/forum/pic/item/7da86b899e510fb3f9270773d833c895d0430cf9.jpg) no-repeat}\
    #lg,#s_fm{margin-top:-25px!important}\
    #s_fm{position:absolute;top:20%;left:8%;z-index:10;width:421px;padding:0;margin:0 0 0 155px;background-color:rgb(255,255,255);border:solid 1px rgb(229,229,229)}\
    #s_fm>form>div{border:none}\
    #s_fm>form>div:not([id^="hwr_div"]):not([id^="loading"]){width:421px!important;border:solid 1px rgb(204,204,204)!important;left:-1px}\
    .bdsug{top:36px!important}\
    .bdsug li{width:auto!important}\
    #kw1{width:375px!important;height:28px!important;border:none;background:none}\
    .s-skin-hasbg #kw1{box-shadow:none}\
    [class$="btn_wr"]:first-of-type{position:relative;top:-32px;left:-1px;width:28px!important;float:right;background-position:-149px -37px!important}\
    [class$="btn_wr"]:first-of-type>input{width:28px;height:28px;opacity:0}\
    .sa_as{position:absolute;top:35px;background-color:rgb(255,255,255);font-size:small;z-index:1}\
    .sa_drw{list-style:none outside none;padding:0px;background-color:rgb(255,255,255);margin:0px}\
    .sa_hd_first{margin:0.25em 0.2em 0 0px;padding:0.6em 0 0.1em 0.55em;border:0px none;color:rgb(102,102,102);cursor:default;clear:left}\
    .sa_drw li{disply:block;white-space:no-wrap}\
    .sa_sgPN{color:rgb(115,115,115);font-size:120%;padding:0.2em 0.55em 0.21em;cursor:pointer;clear:left}\
    .sa_iconPN_A{background-color:rgb(255,90,0)}\
    .sa_iconPN_B{background-color:rgb(179,179,179)}\
    .sa_iconPN{height:16px;line-height:16px;margin-right:6px;display:inline-block;padding:0 5px;font-size:13px;vertical-align:top;color:rgb(255,255,255)}\
    .sa_hv{background-color:rgb(229,229,229)}\
    .sa_om{background-color:rgb(245,245,245);border-top:solid 1px rgb(204,204,204);font-siz:90%;height:1.6em;line-height:1.6em;padding:0.16em 0px 0.2em}\
    .sa_om ul{margin:0px 0.5em;padding:0px;float:right}\
    .sa_as ul{list-style:none outside none}\
    .sa_om li{float:left;margin-left:1.3em}\
    .sa_om a{color:rgb(51,102,187)}\
    .sa_om a:hover{color:rgb(102,187,51)}\
    .sa_om a:active{color:rgb(187,51,102)}\
    [id^="hwr_div"],[id^="loading"]{left:437px!important}\
    #mCon1{right:-195px!important;background-color:rgba(0,0,0,.3)!important}\
    #imeS1{text-decoration:none!important}\
    #mMenu1{right:-198px!important}\
    #lm,#lm>a{visibility:hidden!important}\
    #s_wrap{margin-top:15px!important;position:relative;bottom:108px;min-height:35px;padding:0;z-index:9}\
    .s-notify-pnl{overflow:hidden!important}\
    #s_mod_msg{top:-30px}\
    #wrapper #s_mod_msg{top:-58px}\
    #s_wrap[style*="0px"] #s_mod_msg{top:-65px}\
    #wrapper #s_wrap[style*="0px"] #s_mod_msg{top:-93px}\
    #s_mod_msg.extend>.bg-shadow{display:none!important}\
    #s_msg_content{position:absolute;bottom:0px}\
    #s_mod_msg.extend>#s_msg_content{background-color:rgba(34,34,34,.7)!important}\
    #s_mod_msg.extend>#s_msg_content>.mover{background-image:none!important;background-color:rgba(219,219,219,.2)!important}\
    #s_msg_exchange{background-position:-218px 0px!important}\
    #s_msg_exchange.hide{background-position:-132px 0px!important}\
    #s_mod_msg.extend>#s_msg_setting{top:12px!important;right:29px!important}\
    #s_mod_msg.extend>#s_msg_count{top:29px!important}\
    #s_wrap[style*="0px"] #s_mod_msg.extend>#s_msg_count{top:22px!important}\
    #s_mod_nav{position:absolute;bottom:55px;left:0;width:100%;background-image:linear-gradient(rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.55) 100%);border-width:0}\
    #s_mod_nav,.status_visible>#s_mod_nav_b_settings.s-mod-set-view,.status_visible>#s_mod_nav_add,.status_visible:not([class~="setting"])>#s_nav_rp_tip,.status_visible:not([class~="setting"])>#s_rp_words{display:block!important}\
    .s-skin-hasbg #s_mod_nav{bottom:31px}\
    .s-container,#s_nav_area:not([class~="nplus-edit"])>.s-ncf{width:100%!important}\
    #s_mod_nav_titleBar{border-bottom-color:transparent;padding-top:5px;padding-bottom:5px}\
    #s_mod_nav_close,#s_mod_nav_b_settings.s-mod-set-view,#s_mod_nav_add,#s_nav_rp_tip,#s_rp_words,#s_menu{display:none!important}\
    .status_visible>#s_mod_nav_b_settings.s-mod-set-view,.status_visible>#s_mod_nav_add,#allsign,#autoSign{opacity:0;transition:opacity 500ms ease-in-out}\
    .status_visible>#s_mod_nav_b_settings.s-mod-set-view:hover,.status_visible>#s_mod_nav_add:hover,#allsign:hover,#allsign:hover+#autoSign,#autoSign:hover{opacity:1}\
    .s-mod-nav{color:rgb(255,166,8)!important;cursor:pointer;padding-right:23px;font-size:16px!important}\
    .s-mod-nav.open-close,a[class~="s-ncf-name-link"]{color:rgb(255,255,255)!important}\
    #nav{width:22px;height:22px;cursor:pointer;position:absolute;top:8px;left:93px}\
    .nav_opener{background-position:-128px -1px!important}\
    .nav_closer{background-position:-128px -25px!important}\
    .s-title-bg{background:none!important}\
    #s_nav_rp_tip,#s_rp_words{margin-top:5px}\
    .s-rp-nav-item>span:first-of-type{position:absolute;max-width:66px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
    #s_mod_nav_content{background-color:transparent!important;background:none!important;overflow:hidden;height:0}\
    #s_nused_extend_tip{left:'+((docW-835)/2)+'px}\
    '+fnv+
    '#s_nav_area{width:100%}\
    #s_nav_area[class~="nplus-edit"]>div[id^="s_nav_add_wrap_"]{width:'+w3+'px}\
    #s_nav_area[class~="nori-edit"]>div[id^="s_nav_add_wrap_"]{width:100%}\
    .s-ncf,.s-ncf-navs{border-color:transparent!important}\
    #s_nav_area[class~="nplus-edit"]>.s-ncf{width:'+w1+'px}\
    #s_nav_area[class~="nplus-edit"] .s-ncf-navs{width:'+w2+'px!important}\
    .s-nori-navs{width:auto!important}\
    li[class~="s-ncf-nav"],li[class~="s-nori-nav"]{cursor:pointer;background-color:rgb(238,238,238)!important;transition:background-color 500ms ease-in-out}\
    li[class~="s-nori-nav"]{transition-property:box-shadow;transition-duration:500ms;transition-timing-function:ease-in-out}\
    li[class~="s-ncf-nav"]:hover{background-color:rgb(255,255,255)!important}\
    li[class~="s-nori-nav"]:hover{box-shadow:0px 0px 0px 2px rgb(119,119,119) inset}\
    .sc-dragitem{color:rgb(0,0,0)!important}\
    .nplus-edit .sc-dragitem{max-width:67px!important}\
    .nori-edit .sc-dragitem{max-width:80px!important}\
    #s_nori_add_btn{background-color:rgb(43,43,43);color:rgb(255,255,255);transition:all 500ms ease-in-out}\
    #s_nori_add_btn>a{border-color:transparent}\
    #s_nori_add_btn:hover{background-color:rgb(160,160,160)}\
    #s_nori_add_btn:active{background-color:rgb(255,140,0);color:rgb(0,0,0)}\
    '+ntrpt+
    '#s_mod_topsearch{position:absolute!important;overflow:hidden;width:0;height:0}\
    .mod-pk{overflow:hidden;height:10px}\
    #bottom_container{margin:auto;position:relative;bottom:10px;height:27px;min-width:1000px;max-width:2560px;padding-top:8px;text-align:right}\
    .s-skin-hasbg #bottom_container{padding-top:10px;bottom:16px}\
    #wrapper #bottom_container{margin-top:-27px;padding-bottom:42px!important}\
    div[class^="bottom-line"]{color:rgb(102,102,102)!important}\
    .bottom-line1{padding:0 20px 0 10px;float:right}\
    div[class^="bottom-line"]>a{color:rgb(102,102,102)!important}\
    #bwps{color:rgb(153,153,153)!important}\
    #u_sp>*:not([href="/gaoji/preferences.html"]):not(em):not(#outerDiv1):hover,#nv>a:hover,#bottom_container a:hover{text-decoration:underline!important}\
    #hp_container{position:absolute;top:0;left:0;width:100%;height:100%;min-width:1000px;min-height:562px;overflow:hidden}\
    #bgDiv{overflow:hidden;margin:auto;position:relative;width:2560px;height:1440px;min-width:1000px;min-height:562px;background-color:rgb(102,102,102);background-image:'+wp+';background-repeat:no-repeat}\
    '+bgcover+
    '.hp_bottomCell{position:absolute;top:0;width:100%;height:100%}\
    .hp_ctrls{margin:auto;position:relative;height:100%;max-width:2560px;min-width:1000px}\
    div[id^="sc_hst"]{z-index:6;position:absolute;top:-90px;opacity:0}\
    .sh_hto{width:39px;height:39px;opacity:.4;background-color:rgb(0,0,0);padding:1px}\
    .hp_hot{height:37px;width:37px;border:solid 1px rgb(255,255,255)}\
    a[id^="sc_hs"]{position:absolute;width:205px;z-index:6;padding:3px 8px 6px;visibility:hidden;opacity:0;font-size:small;color:rgb(255,255,255);text-align:left;line-height:1.4em}\
    a[id^="sc_hs"]>p{margin:0 0 .2em}\
    .sh_hq{text-decoration:underline}\
    .sh_hi{font-size:medium;color:rgb(255,165,0)}\
    .sh_ho{position:absolute;top:0;left:0;z-index:-1;width:100%;opacity:.6;padding:1px;background-color:rgb(0,0,0)}\
    .sh_ho>div{border:solid 1px rgb(255,255,255)}\
    #sh_rdiv{position:absolute;right:15px;bottom:43px;z-index:7;transition:z-index 0s ease-in-out 3s}\
    #sh_rdiv:hover{z-index:205}\
    #sh_rdiv:not(:hover){transition:z-index 0s ease}\
    #sh_rdiv a{position:relative;width:29px;height:29px;margin:0 5px;float:left}\
    #sh_igf{background-position:-119px -37px}\
    #sh_igl{background-position:-29px -37px}\
    #sh_igr{background-position:0px -37px}\
    #sh_cp{background-position:-59px -37px}\
    #sh_cp>span{position:absolute;bottom:1.82em;right:-1px;width:500px;visibility:hidden;color:rgb(21,4,23);font-size:small;padding-bottom:0.45em}\
    #sh_cp>span>p{padding:.45em;background-color:rgb(255,255,255);border:solid 1px rgb(95,95,95);float:right}\
    .sh_psl{background-position:-91px -64px!important}\
    .sh_ppl{background-position:-61px -48px!important}\
    #sh_igw{background-position:-31px -78px!important}',
    ctext2='a:link{text-decoration:none!important}\
    body{overflow:visible!important}\
    #u_sp{color:transparent}\
    #u_sp,#nv{z-index:9!important}\
    #slsep,#bwps{display:none!important}\
    #u_sp>#s_i_msg{background-image:none!important}\
    #nv{margin-right:0!important}\
    '+nvm+
    '#form1>#kw1,.btn_wr>#su1{background:none;color:rgb(238,238,238)!important}\
    #form1>#kw1{background-color:rgba(30,30,30,.6);box-shadow:1px 1px 3px rgba(255, 255, 255, 0.25);border:solid 1px!important;border-color:rgba(30, 30, 30,.7) rgba(81, 81, 81,.7) rgba(81, 81, 81,.7) rgba(30, 30, 30,.7)!important}\
    .btn_wr>#su1{border-radius:2px 2px 2px 2px;font-weight:bold;transition:all 0.218s ease 0s, visibility 0s ease 0s;background-image:-moz-linear-gradient(center top , rgba(36, 39, 47,.3), rgba(30, 30, 30,.3));background-image:-webkit-linear-gradient(top , rgba(36, 39, 47,.3), rgba(30, 30, 30,.3));background-color:rgba(36, 39, 47,.3);border:1px solid rgba(30, 30, 30, 0.7)!important}\
    .btn_wr>#su1:hover{box-shadow:1px 1px 2px rgb(51, 51, 51)!important;transition:all 0s ease 0s;background-image:-moz-linear-gradient(center top , rgba(36, 39, 47,.3), rgba(12, 17, 25,.3));background-image:-webkit-linear-gradient(top , rgba(36, 39, 47,.3), rgba(12, 17, 25,.3));background-color:rgba(12, 17, 25,.3);border:1px solid rgba(29, 0, 54,.6)!important}\
    .sa_as,#nav{display:none!important}\
    [id^="sd_"],.bdsug{border-color:rgba(63, 63, 63,.7) rgba(50, 50, 50,.7) rgba(50, 50, 50,.7)!important;box-shadow:0px 2px 4px rgba(255, 255, 255, 0.2)}\
    .bdsug{width:490px!important}\
    [id^="sd_"] td,.bdsug li{color:rgb(238,238,238)!important}\
    [id^="sd_"] td b,.bdsug li b{color:rgb(255,255,255)!important}\
    .btn_wr,#st,#st tr,.bdsug{background:none!important}\
    #st,.bdsug>ul{background-image:linear-gradient(rgba(30, 30, 30, 0.6) 0px, rgba(30, 30, 30, 0.6) 100%)!important}\
    #st tr,.bdsug li{transition:background-color 200ms ease-in-out}\
    #st .ml,.bdsug li.bdsug-overflow{background-color:rgba(34,34,34,.7)!important}\
    #st .mo,.bdsug li.bdsug-overflow.bdsug-s{background-color:rgba(64,64,64,.7)!important}\
    #s_mod_msg{top:0px!important}\
    #s_mod_nav{bottom:0px!important}\
    #s_mod_nav_content{height:auto!important;overflow:visible!important}\
    #s_nav_area,.s-ncf-navs{width:auto!important}\
    #s_news_top_tip.s-guide-tip.yahei,#s_news_top_tip.s-guide-tip.yahei .guide-tip-content-down{width:295px!important}\
    #bottom_container{visibility:visible!important}\
    #allsign,#autoSign{opacity:0;transition:opacity 500ms ease-in-out}\
    #allsign:hover,#allsign:hover+#autoSign,#autoSign:hover{opacity:1}\
    #hp_container,#s_neo_link,.sepsign,.sepem{display:none}',
    addCss=function(c){
        var t=document.createTextNode(c),
            s=document.createElement('style');
        s.type='text/css';
        s.id='sctext';
        s.appendChild(t);
        doc.appendChild(s)
    },
    bgf=function(el,con){
        el.style.backgroundSize=con?'cover':doc.clientWidth+'px '+doc.scrollHeight+'px';
        el.style.backgroundPosition=con?'0 0':(-parseFloat(el.style.left))+'px '+(-parseFloat(el.style.top))+'px'
    },
    bingico=function(){
        var favicon=document.createElement('link');
        favicon.href='http://'+(oldIcon?'bingwallpaper':'cn.bing')+'.com/favicon.ico';
        favicon.rel='shortcut icon';
        document.head.appendChild(favicon)
    },
    wwwo=function(k,d,v,t){
        this.key=k;
        this.detail={
            domain:d,
            video:v,
            tail:t?t:''
        }
    },
    www=[new wwwo('j','www',1,'ja-JP'),new wwwo('h','www',0,'zh-HK'),new wwwo('g','www',1,'en-GB'),new wwwo('f','www',1,'fr-FR'),new wwwo('d','www',1,'de-DE'),new wwwo('a','www',1,'en-AU'),new wwwo('b','www',1,'pt-BR'),new wwwo('c','www',1,'en-CA')],
    wwwk=Array.prototype.map.call(www,function(a){
        return a.key
    }),
    configureGUI='<div id="outerDiv1" style="display:none">\
    <div class="inbetweenDiv1">\
    <div id="innerDiv1" title="勾选为不拉伸"><label for="chkbx1">拉伸背景图片尺寸</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx1" name="chkbx1" /></div>\
    <div id="innerDiv2" title="带有必应LOGO"><label for="chkbx2">查看显示可用大图</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx2" name="chkbx2" /></div>\
    <div id="innerDiv3" title="反选查看图片"><label for="chkbx3">背景影像查看链接</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx3" name="chkbx3" /></div>\
    <div id="innerDiv4" title="选中即可透明"><label for="chkbx4">导航链接透明设置</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx4" name="chkbx4" /></div>\
    <div id="innerDiv5" title="  1920x1080 "><label for="chkbx5">大分辨率背景图片</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx5" name="chkbx5" /></div>\
    <div id="innerDiv6" title="old favicon "><label for="chkbx6">使用旧版网站图标</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="chkbx6" name="chkbx6" /></div>\
    </div>\
    <div id="btnDiv1" title="设置更改后需刷新页面生效"><input type="button" id="OK_btn1" value="确定" title="点击按钮刷新页面" disabled="true" /></div>\
    </div>';
bingico();
if(browser==-1)
    bingico();
if(!xmlns)
    return;
bOrb=='bing'?addCss(ctext1):addCss(ctext2);
document.addEventListener('DOMContentLoaded',function(){
    var loading=processing=working=fse=0,
        fullScreen=1,
        pageNum=localStorage['pageNum']==0?0:((+localStorage['pageNum'])||-1),
        setEvents=[],
        setAnimation=function(e,d){
            var s=browser!=-1?30:40,
                a=d.style,
                m,
                i,
                j,
                t=Math.ceil(d.time*1e3),
                f=function(m){
                    var n,
                        c,
                        x,
                        p,
                        q,
                        z=e.style;
                    if(setEvents[j][m])
                        clearInterval(setEvents[j][m]);
                    n=parseFloat(z[m]||a[m].default||0);
                    c=t/s;
                    x=a[m].extension;
                    p=a[m].number;
                    q=parseFloat((p-n)/c);
                    setEvents[j][m]=setInterval(function(){
                        n+=q;
                        z[m]=n.toFixed(20)+x;
                        c<1?(clearInterval(setEvents[j][m]),z[m]=p+x,d.funs&&d.funs(),d.styled&&(d.styled.time=d.styled.time||d.time,setAnimation(e,d.styled))):c--
                    },s)
                };
            for(i=0,j=setEvents.length;i<j;i++)
                if(setEvents[i]&&setEvents[i].e===e){
                    j=i;
                    break
                }
            setEvents[j]=setEvents[j]||{};
            if(!setEvents[j].e)
                setEvents[j].e=e;
            for(m in a)
                f(m)
        },
        $=function(e,a){
            return a?a.querySelector(e):document.querySelector(e)
        },
        id=function(e){
            return document.getElementById(e)
        },
        query=function(x,y){
            return y?y.querySelectorAll(x):document.querySelectorAll(x)
        },
        foreach=Array.prototype.forEach,
        getData=function(i,t){
            var u=localStorage['setrgn']=='worldwide'?'http://'+JSON.parse(localStorage['www']).domain+'.bing.com':localStorage['setlan']=='zh-CN'?'http://cn.bing.com':'http://www.bing.com',
                u1='http://s.cn.bing.net',
                g,
                f=function(h){
                    var e,
                        a,
                        i,
                        d=h.hs,
                        r=new RegExp('.*\\?q=([^&]*).*','i');
                    $('#sh_cp>span>p').textContent=h.copyright;
                    if(d.length)
                        for(i=d.length-1;i>-1;i--){
                            e=id('sc_hs'+(i+1));
                            a=id('sc_hst'+(i+1));
                            e.setAttribute('href',(/^\/(maps\/\?v=|videos\/search\?pq=|images\/search\?&?q=)/.test(d[i].link))?u+d[i].link:d[i].link.replace(r,(browser!=-1&&!isOpera?'s?ie=UTF-8&':'baidu?')+'wd=$1'+(browser!=-1?(isOpera?'&tn=cnopera&ie=utf-8':''):'&tn=monline_dg')));
                            e.firstElementChild.textContent=d[i].desc;
                            $('span',e).textContent=d[i].query;
                            $('.sh_ho',e).style.height=e.offsetHeight-3+'px';
                            $('.sh_ho>div',e).style.height=e.offsetHeight-5+'px';
                            a.style.left=d[i].locx+'%';
                            a.style.top=d[i].locy+'%';
                            (a.style.display!='block')&&(a.style.display='block')
                        }
                    else
                        foreach.call(query('[id^="sc_hst"]'),function(a){
                            (a.style.display!='none')&&(a.style.display='none')
                        })
                    x()
                },
                x=function(){
                    loading=0;
                    id('sh_igr').title='下一页';
                    id('sh_igl').title='上一页';
                    working=0
                },
                pop=id('sh_rdiv').firstElementChild,
                y=function(ele,val1,val2){
                    ele.className=val1;
                    ele.title=val2
                },
                ppstate=localStorage['ppstate']||'play',
                o=$('#bgDiv>video'),
                ni=new Image(),
                tail,
                hp,
                hasv;
            if(localStorage['ppstate']!=ppstate)
                localStorage['ppstate']=ppstate;
            tail=localStorage['setrgn']=='default'?localStorage['setlan']=='zh-CN'?'':'&mkt=en-us':JSON.parse(localStorage['www']).tail?'&mkt='+JSON.parse(localStorage['www']).tail:'';
            hp=localStorage['setrgn']=='default'?localStorage['setlan']=='zh-CN'?'':'&FORM=HPCNEN':'';
            hasv=localStorage['setrgn']=='default'?'&video=1':JSON.parse(localStorage['www']).video?'&video=1':'';
            i=i>7?7:i<-1||isNaN(i)?-1:i;
            if(i==pageNum&&t!=true||loading==1)
                return;
            loading=1;
            g=setTimeout(x,5e3);
            id('sh_igr').title=id('sh_igl').title='正在加载...';
            if(pop.style.visibility=='visible'){
                pop.className=='sh_psl'&&(o.pause(),y(pop,'sh_ppl','播放'));
                pop.removeAttribute('class');
                pop.removeAttribute('title');
                pop.onclick=null;
                pop.style.visibility='hidden'
            }
            GM_xmlhttpRequest({
                method:'GET',
                url:u+'/HPImageArchive.aspx?format=js&idx='+i+'&n=1&nc='+new Date().getTime()+'&pid=hp'+hp+hasv+tail,
                onload:function(response){
                    if(loading==0)
                        return;
                    clearTimeout(g);
                    var d=JSON.parse(response.responseText),
                        e=id('bgDiv'),
                        isCn=/^http:\/\/s\.cn\.bing\.net/.test(d.images[0].url);
                        s=isCn?d.images[0].url:d.images[0].url.replace(/^(?:https?:\/\/)?[^\/]*/,u),
                        v=d.images[0].vid?d.images[0].vid:null,
                        eh=/\/explore\/bing500px-/.test(d.images[0].copyrightlink),
                        cl=eh?u+d.images[0].copyrightlink:d.images[0].copyrightlink.split('&')[0].split('=')[1]?d.images[0].copyrightlink.split('&')[0].split('=')[1]:null,
                        dlurl=id('sh_igw'),
                        hri=(isCn?u1:u)+d.images[0].urlbase+'_1920x1080.jpg',
                        img=v?(isCn?u1:u)+v.image:hiRes?hri:s,
                        cdn=(localStorage['setrgn']=='default'&&d.images[0].wp&&bigpic),
                        bi=(isCn?u1:u)+d.images[0].urlbase+'_1920x1200.jpg',
                        testRegexp=/^[^\/]+/,
                        myfunc=function(){
                            v?o.setAttribute('src',/^(?:https?:)?\/\//.test(v.codecs[0][1])?localStorage['mp4format']=='mp4'?v.codecs[1][1].replace(testRegexp,'http:'):v.codecs[0][1].replace(testRegexp,'http:'):(isCn?u1:u)+(localStorage['mp4format']=='mp4'?v.codecs[1][1]:v.codecs[0][1])):o.hasAttribute('src')?o.removeAttribute('src'):null;
                            o.loop=v?v.loop:true;
                            o.style.display=v?'':'none';
                            if(v){
                                function foreplay(){
                                    var nppstate=localStorage['ppstate']=='play';
                                    if(browser!=-1)
                                        o.style.opacity='0';
                                    if(nppstate)
                                        o.pause();
                                    function re(){
                                        if(browser!=-1)
                                            o.style.opacity='1';
                                        if(nppstate)    
                                            this.play();
                                        this.removeEventListener('canplay',arguments.callee,false)
                                    }
                                    o.addEventListener('canplay',re,false)
                                }
                                foreplay();
                                if(!ini){
                                    o.addEventListener('ended',function(){
                                        if(!v.loop){
                                            pop.click();
                                            o.load();
                                            foreplay();
                                            o.pause()
                                        }
                                    },false);
                                    ini=true
                                }
                            }
                            id('sh_igl').style.opacity=i==7?.5:1;
                            id('sh_igl').style.cursor=i==7?'default':'pointer';
                            id('sh_igr').style.opacity=i==-1?.5:1;
                            id('sh_igr').style.cursor=i==-1?'default':'pointer';
                            id('sh_cp').href=eh?cl:cl?'http://www.baidu.com/'+(browser!=-1&&!isOpera?'s?ie=UTF-8&':'baidu?')+'wd='+cl+(browser!=-1?(isOpera?'&tn=cnopera&ie=utf-8':''):'&tn=monline_dg'):d.images[0].copyrightlink;
                            if(cl)
                                id('sh_cp').target='_blank';
                            v&&(pop.style.visibility='visible',ppstate=='play'?y(pop,'sh_psl','暂停'):(o.pause(),y(pop,'sh_ppl','播放')),pop.onclick=function(){
                                this.className=='sh_psl'?o.pause():o.play();
                                this.title=this.title=='暂停'?'播放':'暂停';
                                this.className=this.className=='sh_psl'?'sh_ppl':'sh_psl';
                                localStorage['ppstate']=localStorage['ppstate']=='play'?'pause':'play'
                            });
                            dlurl.href=v?showvideo?o.src:cdn?bi:hiRes?hri:(isCn?u1:u)+v.image:cdn?bi:img;
                            if(document.activeElement==dlurl)
                                dlurl.blur();
                            f(d.images[0]);
                            localStorage['wallpaper']=img;
                            localStorage['pageNum']=pageNum=i
                        },
                        sfunc=function(){
                            var t=this;
                            setAnimation(e,{
                                time:0.3,
                                style:{
                                    opacity:{
                                        number:0,
                                        default:1,
                                        extension:''
                                    }
                                },
                                styled:{
                                    time:0.2,
                                    style:{
                                        opacity:{
                                            number:1,
                                            extension:''
                                        }
                                    }
                                },
                                funs:function(){
                                    e.style.backgroundImage='url('+t.src+')';
                                    !bgcoverset&&bgf(e,v);
                                    myfunc()
                                }
                            })
                        };
                    localStorage['video']=v?' ':''; 
                    ni.onload=sfunc;
                    img!=localStorage['wallpaper']?ni.src=img:myfunc()
                }
            })
        },
        reSizeBg=function(){
            var p=id('hp_container'),
                c='height',
                l='width',
                v='top',
                y='left',
                f='px',
                e=2560,
                o=1440,
                z=1000,
                x=function(u){
                    var n=p.clientWidth,
                        t=p.clientHeight,
                        i,
                        r;
                    n=n>e?e:n;
                    t=t>o?o:t;
                    n/e>t/o?(i=Math.ceil(o*n/e),u[l]=n+f,u[c]=i+f,u[v]=(t-i)/2+f,u[y]=0):(r=Math.ceil(e*t/o),u[c]=t+f,u[l]=r+f,u[v]=0,u[y]=(n-r)/2+f)
                },
                bd=id('bgDiv');
            p.style.minWidth=doc.clientWidth+f;
            x(bd.style);
            x($('video',bd).style);
            if(!bgcoverset)
                bgf(bd,localStorage['video']);
            (function(){
                var i=id('s_username_top').offsetLeft,
                    r=doc.offsetWidth;
                id('nv').style.marginRight=(r>z?r>e?e:r:z)-i+117+'px';
                foreach.call(query('.s-ncf-navs',id('s_main')),function(a){
                    a.style.width=(doc.clientWidth-113)+'px'
                })
            })()
        },
        sl=id('s_bottom_prline1').appendChild(document.createElement('a')),
        cprta=$('.bottom-line2>a'),
        search_prefs=$("a[href='/gaoji/preferences.html']"),
        classAdd=function(ele,cname){
            ele.classList.add(cname)
        },
        classRemove=function(ele,cname){
            ele.classList.remove(cname)
        },
        udp=id('u_sp'),
        sctext=id('sctext'),
        initLocalstorage=function(prop,defaultVal){
            if(!localStorage[prop])
                localStorage[prop]=defaultVal   
        },
        hideEle=function(){
            if(localStorage['bOrb']=='bing'){
                var cssText=sctext.innerHTML,
                    cssRule='html,body{background-color:transparent!important}\
                    #s_skin_container_big{background-image:url('+localStorage["wallpaper"]+')!important}\
                    #hp_container{display:none}';
                if(cssText.indexOf(cssRule)<0)
                    sctext.appendChild(document.createTextNode(cssRule))
            }
        },
        subfm=id('form1'),
        sSession=unsafeWindow.s_session;
    if(browser!=-1&&/wd=.*/.test(location.hash)){
        hideEle();
        return
    }
    else if(browser==-1&&!/wd=.*/.test(location.hash)){
        var interval;
        interval=setInterval(function(){
            if(/wd=.*/.test(location.hash)){
                hideEle();
                clearInterval(interval)
            }
        },100)
    }
    (function(){
        var i,
            j,
            d=doc.appendChild(document.createElement('div'));
        i='<div id=bgDiv><video autoplay autobuffer preload=auto></video></div><div class=hp_bottomCell><div class=hp_ctrls>';
        for(j=1;j<5;j++)
            i+='<div id=sc_hst'+j+'><div class=sh_hto><div class=hp_hot></div></div></div><a id=sc_hs'+j+' target=_blank><p></p><span class=sh_hq></span>&nbsp;<span class=sh_hi>»</span><div class=sh_ho><div></div></div></a>';
        d.id='hp_container';
        d.innerHTML=i+'</div></div><div class=hp_bottomCell><div class=hp_ctrls><div id=sh_rdiv><a style=visibility:hidden href=javascript:void(0)></a><a id=sh_igf href=javascript:void(0) title=全屏></a><a id=sh_igl href=javascript:void(0) title=上一页></a><a id=sh_igr href=javascript:void(0) title=下一页></a><a id=sh_cp><span><p></p></span></a><a id=sh_igw title=右键另存为下载壁纸或者点击查看></a></div></div></div>'
    })();
    if(!sSession.userProp.searchAgroupGuide){
        subfm.addEventListener('submit',hideEle,false);
        var mo=new MutationObserver(function(mutations){
                mutations.forEach(function(mutation){
                    if(mutation.addedNodes.length){
                        var nodes=mutation.addedNodes,
                            i;
                        for(i=0;i<nodes.length;i++)
                            if(nodes[i].classList.contains('bdsug'))
                                nodes[i].addEventListener('click',function(e){
                                    if(e.target.nodeName!='u')
                                        hideEle()
                                },false)
                    }
                })
            }),
            cfg={
                attributes:true,
                childList:true
            };
        mo.observe(subfm,cfg)
    }
    if(id('s_i_msg'))
        if(sSession.portrait){
            id('s_i_msg').style.backgroundImage="url(http://tb.himg.baidu.com/sys/portrait/item/"+sSession.portrait+")";
            id('s_i_msg').title='消息'
        }
    initLocalstorage('bOrb','bing');
    initLocalstorage('setrgn','default');
    initLocalstorage('setlan','zh-CN');
    initLocalstorage('www',JSON.stringify(www[0].detail));
    initLocalstorage('navstat','col');
    initLocalstorage('mp4format','ogv');
    udp.insertAdjacentHTML('afterbegin','<em id="stlsep" class="sepsign">&nbsp;&nbsp;|&nbsp;&nbsp;</em>');
    udp.insertAdjacentHTML('beforeend',configureGUI);
    var chkbxes=query('[id^="chkbx"]');
    for(var i=0;i<chkbxes.length;i++){
        chkbxes[i].checked=objPfs[chkbxes[i].id]!=undefined?objPfs[chkbxes[i].id]:false;
        chkbxes[i].addEventListener('change',function(){
            objPfs[this.id]=this.checked;
            if(id('OK_btn1').disabled)
                id('OK_btn1').disabled=false
        },false)
    }
    id('OK_btn1').addEventListener('click',function(){
        GM_setValue('bOrb_cfg',JSON.stringify(objPfs));
        location.reload()
    });
    var s_neo_link=id('s_tradditional_link').cloneNode(true);
    s_neo_link.setAttribute('id','s_neo_link');
    udp.insertBefore(s_neo_link,udp.firstChild);
    s_neo_link.addEventListener('click',function(){
        localStorage['wallpaper']=''
    },false);
    search_prefs.className='sw_pref';
    search_prefs.title='设置';
    search_prefs.parentNode.removeChild(search_prefs.previousSibling);
    cprta.insertAdjacentHTML('beforebegin','<em class="sepsign">&nbsp;|&nbsp;</em>');
    cprta.insertAdjacentHTML('afterend','<em class="sepsign">&nbsp;|&nbsp;</em>');
    id('s_bottom_prline1').insertAdjacentHTML('afterbegin','<em class="sepem">| <em>');
    keyevt(57,'bOrb','bing','baidu',(function(){
        if(localStorage['bOrb']=='bing')
            reSizeBg()
    }),sctext,ctext1,ctext2,true);  
    var smain=id('s_main'),
        nicon=query('.s-nav-name>img',smain),
        smodnav=$('.s-mod-nav'),
        smnc=id('s_mod_nav_content'),
        titlebar=id('s_mod_nav_titleBar'),
        smodnavsetting=id('s_mod_nav_b_settings'),
        snavarea=id('s_nav_area'),
        checks,
        checksp,
        wrap=id('wrapper');
    if(smain.classList.contains('mod-main-old')){
        id('s_wrap').style.paddingTop='8px';
        $('.mod-pk').style.height='2px';
        classRemove(smain,'mod-main-old')
    }
    smodnav.insertAdjacentHTML('afterend','<div id="nav" class="nav_opener" style="visibility:visible"></div>');
    id('nav').addEventListener('click',function(){
        var rd=id('sh_rdiv'),
            smmsg=id('s_mod_msg');
        processing=1;
        this.className=='nav_opener'?(setAnimation(smnc,{
            time:0.17,
            style:{
                height:{
                    number:303,
                    default:0,
                    extension:'px'
                }
            },
            funs:function(){
                id('nav').className='nav_closer';
                classAdd(smodnav,'open-close');
                classAdd(titlebar,'status_visible');
                smnc.style.overflowY='auto';
                localStorage['navstat']='exp';
                processing=0
            }
        }),setAnimation(rd,{
            time:0.17,
            style:{
                bottom:{
                    number:386,
                    default:83,
                    extension:'px'
                }
            }
        }),smmsg&&setAnimation(smmsg,{
            time:0.17,
            style:{
                top:{
                    number:wrap?-361:-333,
                    default:wrap?-58:-30,
                    extension:'px'
                }
            }
        })):(smnc.style.overflowY='hidden',setAnimation(smnc,{
            time:0.17,
            style:{
                height:{
                    number:0,
                    extension:'px'
                }
            },
            funs:function(){
                id('nav').className='nav_opener';
                classRemove(smodnav,'open-close');
                classRemove(titlebar,'status_visible');
                localStorage['navstat']='col';
                processing=0
            }
        }),setAnimation(rd,{
            time:0.17,
            style:{
                bottom:{
                    number:83,
                    extension:'px'
                }
            }
        }),smmsg&&setAnimation(smmsg,{
            time:0.17,
            style:{
                top:{
                    number:wrap?-58:-30,
                    extension:'px'
                }
            }
        }))
    },false);
    id('nav').addEventListener('mouseover',function(){
        if(processing==1)
            return;
        this.click()
    },false);
    checks=setInterval(function(){
        if(smodnavsetting.className!='s-mod-set-edit'||checksp)
            return;
        id('u_sp').style.zIndex=id('nv').style.zIndex=0;
        document.body.style.overflow='visible';
        id('hp_container').style.minWidth=doc.clientWidth+'px';
        id('bgDiv').style.position='fixed';
        smnc.style.overflowX=smnc.style.overflowY='visible';
        id('bottom_container').style.visibility=id('sh_rdiv').style.visibility=id('nav').style.visibility='hidden';
        snavarea.style.width='auto';
        classAdd(titlebar,'setting');
        checksp=setInterval(function(){
            if(smodnavsetting.className=='s-mod-set-edit')
                return;
            document.body.style.overflow='hidden';
            id('hp_container').style.minWidth=doc.clientWidth+'px';
            id('bgDiv').style.position='relative';
            smnc.style.overflowX='hidden';
            smnc.style.overflowY='auto';
            id('u_sp').style.zIndex=id('nv').style.zIndex=9;
            id('bottom_container').style.visibility=id('sh_rdiv').style.visibility=id('nav').style.visibility='visible';
            snavarea.style.width='100%';
            if(query('.s-ncf',smain).length)
                foreach.call(query('.s-ncf-navs',smain),function(a){
                    a.style.width=doc.clientWidth-113+'px'
                });
            classRemove(titlebar,'setting');
            clearInterval(checksp);
            checksp=null;
            reSizeBg()
        },100)
    },100);
    smodnav.addEventListener('click',function(){
        if(id('nav').style.visibility!='hidden')
            id('nav').click()
    },false);
    foreach.call(nicon,function(a){
        a.src=a.src||a.dataset.src
    });
    id('s_username_menu').style.right=parseFloat(id('s_username_menu').style.right)-48+'px';
    $('input[class*="btn"]').title='搜索';
    id('kw1').title='输入搜索词';
    (function(){
        id('sh_rdiv').addEventListener('click',function(event){
            switch(event.target.id){
                case'sh_igf':(function(){
                    var m=id('s_fm'),
                        u=id('u_sp'),
                        n=id('nv'),
                        w=id('s_wrap'),
                        r=id('sh_rdiv'),
                        i=id('sh_igf'),
                        smmsg=id('s_mod_msg'),
                        pf,
                        p=r.firstElementChild,
                        pl=function(){
                            if(localStorage['ppstate']=='pause'&&p.style.visibility=='visible'&&pf=='y')
                                p.click()
                        },
                        fsed=function(x,y){
                            i.style.backgroundPosition=x+'px '+y+'px';
                            fse=0;
                            pl()
                        },
                        f=function(e,i){
                            setAnimation(e,{
                                time:0.17,
                                style:{
                                    top:{
                                        number:i,
                                        extension:'px'
                                    }
                                }
                            })
                        };
                    if(fse)
                        return;
                    fse=1;
                    localStorage['ppstate']=='play'&&p.style.visibility=='visible'&&(p.click(),pf='y');
                    fullScreen?(fullScreen=0,localStorage['fullScreen']=1,f(u,-37),setAnimation(n,{
                        time:0.17,
                        style:{
                            top:{
                                default:-24,
                                number:-59,
                                extension:'px'
                            }
                        }
                    }),setAnimation(w,{
                        time:0.17,
                        style:{
                            bottom:{
                                number:0,
                                default:108,
                                extension:'px'
                            }
                        }
                    }),setAnimation(m,{
                        time:0.17,
                        style:{
                            opacity:{
                                number:0.6,
                                default:1,
                                extension:''
                            }
                        }
                    }),setAnimation(r,{
                        time:0.17,
                        style:{
                            bottom:{
                                number:9,
                                default:83,
                                extension:'px'
                            }
                        },
                        funs:function(){
                            fsed(-89,-37)
                        }
                    }),(id('nav').className=='nav_closer')&&(smnc.style.overflowY='hidden',setAnimation(smnc,{
                        time:0.17,
                        style:{
                            height:{
                                number:0,
                                extension:'px'
                            }
                        }
                    })),smmsg&&setAnimation(smmsg,{
                        time:0.17,
                        style:{
                            top:{
                                number:wrap?-93:-65,
                                default:(id('nav').className=='nav_opener')&&(wrap?-58:-30),
                                extension:'px'
                            }
                        }
                    })):(fullScreen=1,localStorage['fullScreen']=0,f(u,0),f(n,-24),setAnimation(w,{
                        time:0.17,
                        style:{
                            bottom:{
                                number:108,
                                extension:'px'
                            }
                        }
                    }),setAnimation(m,{
                        time:0.17,
                        style:{
                            opacity:{
                                number:1,
                                extension:''
                            }
                        }
                    }),setAnimation(r,{
                        time:0.17,
                        style:{
                            bottom:{
                                number:(id('nav').className=='nav_closer'||localStorage['navstat']=='exp')?386:83,
                                extension:'px'
                            }
                        },
                        funs:function(){
                            fsed(-119,-37)
                        }
                    }),(id('nav').className=='nav_closer'||localStorage['navstat']=='exp')&&setAnimation(smnc,{
                        time:0.17,
                        style:{
                            height:{
                                number:303,
                                extension:'px'
                            }
                        },
                        funs:function(){
                            smnc.style.overflowY='auto';
                            if(id('nav').className!='nav_closer'){
                                id('nav').className='nav_closer';
                                classAdd(smodnav,'open-close');
                                classAdd(titlebar,'status_visible')
                            }
                        }
                    }),smmsg&&setAnimation(smmsg,{
                        time:0.17,
                        style:{
                            top:{
                                number:(id('nav').className=='nav_closer'||localStorage['navstat']=='exp')?(wrap?-361:-333):(wrap?-58:-30),
                                default:wrap?-93:-65,
                                extension:'px'
                            }
                        }
                    }))
                })();
                break;
                case'sh_igl':getData(pageNum+1);
                break;
                case'sh_igr':getData(pageNum-1);
                break
            };
            event.target.blur()
        },false);
        id('sh_cp').addEventListener('mouseover',function(event){
            this.firstChild.style.visibility='visible'
        },false);
        id('sh_cp').addEventListener('mouseout',function(event){
            this.firstChild.style.visibility='hidden'
        },false)
    })();
    sl.href='#';
    sl.id='bwps';
    sl.innerHTML=localStorage['setlan']=='zh-CN'?'英文必应壁纸':'中文必应壁纸';
    sl.addEventListener('click',function(e){
        this.blur();
        e.preventDefault();
        if(working==1)
            return;
        working=1;  
        localStorage['setlan']=localStorage['setlan']=='zh-CN'?'en-US':'zh-CN';
        this.innerHTML=localStorage['setlan']=='zh-CN'?'英文必应壁纸':'中文必应壁纸';
        localStorage['wallpaper']='';
        getData(pageNum,true)
    },false);
    sl.insertAdjacentHTML('beforebegin','<em id="slsep">&nbsp;|&nbsp;</em>');
    function sld(){
        foreach.call([sl,id('slsep')],function(a){
            a.style.display=localStorage['setrgn']=='default'?'inline-block':'none'
        })
    }
    sld();
    keyevt(105,'setrgn','default','worldwide',(function(){
        sld();
        getData(pageNum,true)
    }));
    (function(){
        var _={
                X:0,
                Y:0,
                L:0,
                O:null
            },
            i,
            m='sc_hst',
            n='sc_hs',
            e,
            a;
        for(i=1;i<5;i++){
            (function(e,a){
                e.addEventListener('mouseover',function(event){
                    _.O=this;
                    var i=a.offsetWidth,
                        j=e.offsetLeft,
                        w=e.offsetWidth;
                    a.style.left=doc.offsetWidth-j-w>i||j<i?j+w+'px':j-2-i+'px';
                    a.style.top=e.offsetTop+'px'
                },false);
                e.addEventListener('mouseout',function(event){
                    _.O=null
                },false);
                a.addEventListener('mouseover',function(event){
                    _.O=this
                },false);
                a.addEventListener('mouseout',function(event){
                    _.O=null
                },false)
            })(id(m+i),id(n+i))
        }
        document.addEventListener('mousemove',function(event){
            var x=event.pageX,
                y=event.pageY;
            _.L+=_.X==x&&_.Y==y||_.L>9?0:1;
            _.X=x;
            _.Y=y
        },false);
        setInterval(function(){
            var g=$('#form1>div').style.display,
                gg=($('.s-ps-sug')||$('.bdsug'))?($('.s-ps-sug')||$('.bdsug')).style.display:'none',
                t=id('nav').className=='nav_opener'||localStorage['fullScreen']==1,
                f=function(q,p){
                    p==1?(q.style.opacity==0&&(q.style.visibility='visible',setAnimation(q,{
                        time:0.3,
                        style:{
                            opacity:{
                                number:1,
                                extension:''
                            }
                        }
                    }))):(q.style.opacity==1&&setAnimation(q,{
                        time:0.3,
                        style:{
                            opacity:{
                                number:0,
                                extension:''
                            }
                        },
                        funs:function(){
                            q.style.visibility='hidden'
                        }
                    }))
                };
            for(i=1;i<5;i++){
                e=id(m+i);
                a=id(n+i);
                !loading&&g=='none'&&gg=='none'&&t?_.O?e===_.O||a===_.O?(f(e,1),f(a,1)):(f(e,0),f(a,0)):(_.L>9&&f(e,1),_.L<1&&f(e,0),_.O===null&&f(a,0)):(f(e,0),f(a,0))
            }
            _.L-=_.L<0?0:1
        },100)
    })()
    window.addEventListener('resize',reSizeBg,false);
    window.addEventListener('load',function(){
        var fscr=function(){
                (localStorage['fullScreen']==1&&fullScreen==1)&&id('sh_igf').click()
            },
            i=0,
            t;
        setAnimation(id('sh_rdiv'),{
            time:0.07,
            style:{
                bottom:{
                    default:43,
                    number:83,
                    extension:'px'
                }
            }
        });
        setAnimation(id('s_mod_nav'),{
            time:0.07,
            style:{
                bottom:{
                    default:document.body.classList.contains('s-skin-hasbg')?31:55,
                    number:document.body.classList.contains('s-skin-hasbg')?71:95,
                    extension:'px'
                }
            },
            funs:function(){
                if(localStorage['navstat']=='exp'&&id('nav').className=='nav_opener'&&localStorage['fullScreen']!=1){
                    id('nav').click();
                    t=setInterval(function(){
                        if(i>=13||(id('s_mod_msg')&&id('s_mod_msg').style.top==(wrap?'-361px':'-333px')))
                            clearInterval(t);
                        else if(id('s_mod_msg'))
                            id('s_mod_msg').style.top=wrap?'-361px':'-333px';
                        else
                            i+=1;
                    },1000)
                }
                fscr()
            }
        })
    },false);
    if(browser==-1){
        $('#nv>:last-child').innerHTML='更多';
        window.addEventListener('beforeunload',function(){
            if(localStorage['ppstate']=='play'&&$('#bgDiv>video').src)
                $('#bgDiv>video').pause()
        },false)
    }
    reSizeBg();
    getData(pageNum,true);
    document.addEventListener('keypress',function(e){
        if (e.target.tagName.toLowerCase()!='input'){
            var a=String.fromCharCode(e.which);
            if (/[0-8]/.test(a))
                getData(a-1);
            else if(a==' '){
                var ppb=id('sh_rdiv').firstElementChild;
                if(ppb.style.visibility!='hidden')
                    ppb.click()
            }
            else if(localStorage['setrgn']!='default'&&wwwk.join('').match(new RegExp(a,'i'))){
                var thekey=wwwk.join('').match(new RegExp(a,'i'))[0],
                    keyidx,
                    thewww;
                keyidx=wwwk.indexOf(thekey);
                thewww=www[keyidx];
                if(localStorage['www']==JSON.stringify(thewww.detail))
                    return;
                localStorage['www']=JSON.stringify(thewww.detail);
                getData(pageNum,true)
            }
            else if(/q/i.test(a)){
                localStorage['mp4format']=localStorage['mp4format']=='ogv'?'mp4':'ogv';
                getData(pageNum,true)
            }
        }
    },false);
    id('hp_container').addEventListener('click',function(e){
        if(id('nav').className=='nav_closer'&&fullScreen==1&&e.target.parentNode!=id('sh_rdiv')&&id('nav').style.visibility!='hidden')
            id('nav').click()
    },false);
    (function(){
        $('.btn_wr').insertAdjacentHTML('afterend','<div style="width: 540px; left: -1px; display: none" class="sa_as"><ul class="sa_drw" id="sa_ul"><li class="sa_hd_first">实时热点</li></ul><div class="sa_om"><ul><li><a href="#">换一批</a></li></ul></div></div>');
        var fetch,
            cfunc,
            hotul=id('sa_ul');
        fetch=setInterval(function(){
            if(!query('.word-key').length)
                return;
            var wordkey=query('.word-key'),
                count,
                ihtml='',
                nsign;
            for(count=0;count<wordkey.length;count++){
                nsign=count<5?'sa_iconPN_A"':'sa_iconPN_B"';
                ihtml+='<li class="sa_sg sa_sgPN"><div class="sa_tm"><div class="sa_iconPN '+nsign+'>'+(count+1)+'</div>'+wordkey[count].innerHTML+'</div></li>'
            }
            hotul.innerHTML+=ihtml;
            if(typeof cfunc=='undefined'){
                cfunc=function(){
                    var hotdiv=$('.sa_as'),
                        elearr=[],
                        collect=function(ele){
                            elearr.push(ele);
                            if(ele.hasChildNodes())
                                for(var ei=0;ei<ele.childNodes.length;ei++){
                                    if(ele.childNodes[ei].nodeType==3)
                                        continue;
                                    collect(ele.childNodes[ei])
                                }
                        },
                        hotli=query('.sa_sg.sa_sgPN',hotul),
                        taript=id('kw1'),
                        idx=-1,
                        check=function(n){
                            n=n<-1?hotli.length-1:n>hotli.length?0:n;
                            return n
                        },
                        clear=function(){
                            if(idx==-1||idx==hotli.length)
                                return;
                            hotli[idx].classList.remove('sa_hv')
                        },
                        changebtn=id('s-hotnews-change-btn'),
                        changelink=$('.sa_om a',hotdiv),
                        keymove=function(dir){
                            if(hotdiv.style.display=='block'){
                                clear();
                                if(dir==-1||dir==hotli.length)
                                    taript.value='';
                                else{
                                    hotli[dir].classList.add('sa_hv');
                                    taript.value=hotli[dir].firstElementChild.lastChild.nodeValue
                                }
                                idx=dir
                            }
                        },
                        dfunc=function(){
                            if(hotdiv.style.display=='block'||!/^\s*$/.test(taript.value)||query('*[id^="bdime_"]').length||localStorage['bOrb']!='bing')
                                return;
                            hotdiv.style.display='block';
                            if(!taript.classList.contains('sa_ipt'))
                                taript.classList.add('sa_ipt')
                        },
                        s=function(){
                            ($('.s-ps-sug')||$('.bdsug'))&&(($('.s-ps-sug')||$('.bdsug')).style.display='none')
                        },
                        reset=function(){
                            taript.value='';
                            taript.focus()
                        };
                    taript.addEventListener('click',dfunc,false);
                    taript.addEventListener('input',function(){
                        if(query('*[id^="bdime_"]').length||localStorage['bOrb']!='bing')
                            return;
                        if(!/^\s*$/.test(this.value)){
                            if(!this.classList.contains('sa_ipt'))
                                this.classList.add('sa_ipt')
                            if(hotdiv.style.display=='block'){
                                hotdiv.style.display='none';
                                clear();
                                idx=-1
                            }
                        }
                        else{
                            if(this.classList.contains('sa_ipt'))
                                hotdiv.style.display='block'
                        }
                    },false);
                    foreach.call(hotli,function(a,b){
                        a.addEventListener('mouseover',function(){
                            clear();
                            a.classList.add('sa_hv');
                            idx=b
                        },false);
                        a.addEventListener('click',function(){
                            taript.value=this.firstElementChild.lastChild.nodeValue;
                            s();
                            subfm.target!='_blank'?(hotdiv.style.display='none',subfm.submit()):($('#su1',subfm).click(),reset())
                        },false);
                    });
                    collect(hotdiv);
                    doc.addEventListener('click',function(e){
                        if(e.target!=taript&&e.target!=changebtn&&elearr.indexOf(e.target)==-1&&hotdiv.style.display=='block'){
                            hotdiv.style.display='none';
                            clear();
                            idx=-1
                        }
                    },false);
                    document.addEventListener('keydown',function(e){
                        if(e.target==taript&&!query('*[id^="bdime_"]').length&&localStorage['bOrb']!='baidu')
                            switch(e.keyCode){
                                case 40:keymove(check(idx+1));dfunc();
                                break;
                                case 13:s();
                                break
                            }
                    },false);
                    document.addEventListener('keyup',function(e){
                        if(e.target==taript&&!query('*[id^="bdime_"]').length&&localStorage['bOrb']!='baidu')
                            switch(e.keyCode){
                                case 38:keymove(check(idx-1));
                                break;
                                case 13:if(subfm.target=='_blank')reset();
                                break
                            }
                    },false);
                    changelink.addEventListener('click',function(e){
                        e.preventDefault();
                        changebtn.click();
                        setTimeout(function(){
                            var fillpoints=query('.sa_tm',hotul),
                                nwordkey=query('.word-key');
                            foreach.call(fillpoints,function(a,b){
                                a.lastChild.nodeValue=nwordkey[b].innerHTML
                            });
                            clear();
                            idx=-1;
                            reset()
                        },500)
                    },false)};
                cfunc()
            }
            clearInterval(fetch)
        },100)
    })()
},false)