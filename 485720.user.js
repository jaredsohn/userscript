// ==UserScript==
// @name            IFC Gray Theme
// @namespace       Anon?M ID / Angki
// @description     Ganti tema Forum IFC jadi abu2 :v
// @include         http://forum.ifc.my.id/*
// @version         2.0
// @run-at         document-start
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var styles = [];

styles.push('body {background: #222 url(http://s28.postimg.org/digyuw0m5/image.png) fixed !important; }');
styles.push('frame-title, .frametitle, .tab-title { background: url(http://s28.postimg.org/mfa4hskrh/bg_header.png) repeat-x scroll 0px 100% #333; background-color: #333; background-image: url(http://s28.postimg.org/mfa4hskrh/bg_header.png); background-repeat: repeat-x; background-attachment: scroll; background-position: 0px 100%; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}');
styles.push('.frame, .frame-tab { margin-bottom: 10px; border: 1px solid #e5e5e5; border-top-width: 1px; border-right-width-value: 1px; border-right-width-ltr-source: physical; border-right-width-rtl-source: physical; border-bottom-width: 1px; border-left-width-value: 1px; border-left-width-ltr-source: physical; border-left-width-rtl-source: physical; border-top-style: solid; border-right-style-value: solid; border-right-style-ltr-source: physical; border-right-style-rtl-source: physical; border-bottom-style: solid; border-left-style-value: solid; border-left-style-ltr-source: physical; border-left-style-rtl-source: physical; border-top-color: #e5e5e5; border-right-color-value: #e5e5e5; border-right-color-ltr-source: physical; border-right-color-rtl-source: physical; border-bottom-color: #e5e5e5; border-left-color-value: #e5e5e5; border-left-color-ltr-source: physical; border-left-color-rtl-source: physical; -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image-source: none; border-image-slice: 100% 100% 100% 100%; border-image-width: 1 1 1 1; border-image-outset: 0 0 0 0; border-image-repeat: stretch stretch; background: none repeat scroll 0% 0% #333; background-color: #333; background-image: none; background-repeat: repeat; background-attachment: scroll; background-position: 0% 0%; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}');
styles.push('#category_grid { padding: 0px; padding-top: 0px; padding-right-value: 0px; padding-bottom: 0px; padding-left-value: 0px; padding-left-ltr-source: physical; padding-left-rtl-source: physical; padding-right-ltr-source: physical; padding-right-rtl-source: physical; border-top: 1px solid #00FF2A; border-top-width: 1px; border-top-style: solid; border-top-color: #00FF2A; }');
styles.push('element {font-weight: bold; color: #F00;}');
styles.push('#nv {overflow: hidden; overflow-x: hidden; overflow-y: hidden; height: 33px; background-color: #003; background-attachment: scroll; background-position: 0px 0px; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}');
styles.push('hr.l{ height:1px; border:none; background:#e5e5e5; color:#e5e5e5;}');
styles.push('hr.da{ height:0; border:none; border-top:1px dashed #e5e5e5; background:transparent; color:transparent;}');
styles.push('.bbda{border-bottom:1px dashed #e5e5e5;}');
styles.push('.btda{border-top:1px dashed #e5e5e5;}');
styles.push('.bbs{border-bottom:1px solid #e5e5e5 !important;}');
styles.push('.bts{border-top:1px dashed #e5e5e5 !important;}');
styles.push('.avt img{padding:2px; width:48px; height:48px; background:#333; border:1px solid; border-color:#333000 #e5e5e5 #e5e5e5 #333000;}');
styles.push('#toptb{min-width:960px; border-bottom:1px solid #e5e5e5; background:#333000;line-height:28px;}');
styles.push('#hd{border-bottom:0 solid #e5e5e5; background:#333; background-image: url(http://s28.postimg.org/digyuw0m5/image.png); background-repeat: repeat; background-attachment: scroll; background-position: 0% 0%; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}'); //http://s28.postimg.org/9765b3xul/angki_ganteng.png
styles.push('#mu a:hover{ margin:4px 5px; border:1px solid #e5e5e5; background:#2D2D2D; color:#369; text-decoration:none;}');
styles.push('#ft{ padding:10px 0 50px; border-top:1px solid #e5e5e5; line-height:1.8; color:#FFF;}');
styles.push('.bm{ border:1px solid #e5e5e5; background:#333;}');
styles.push('.bmw{ border:1px solid #e5e5e5;}');
styles.push('.bmn{padding:7px 10px; border-color:#e5e5e5; background:#2D2D2D;}');
styles.push('.fl{ border:1px solid #e5e5e5; border-top:none; background:#333;}');
styles.push('.fl .bm_h{ border-width:1px 0; border-color:#e5e5e5; background:#333; background: url(http://s28.postimg.org/mfa4hskrh/bg_header.png) repeat scroll 0% 0% #333; background-color: #333; background-image: url(http://s28.postimg.org/mfa4hskrh/bg_header.png); background-repeat: repeat; background-attachment: scroll; background-position: 0% 0%; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}'); //
styles.push('.bm2 .bm2_b{ float:left; width:49%; border:1px solid #e5e5e5;}');
styles.push('.tb{ margin-top:10px; padding-left:5px; line-height:30px; border-bottom:1px solid #e5e5e5;}');
styles.push('.tb a{ display:block; padding:0 10px; border:1px solid #e5e5e5; background:#2D2D2D;}');
styles.push('.tbmu{ padding:10px; border-bottom:1px dashed #e5e5e5;}');
styles.push('.obn{border-bottom:1px solid #e5e5e5;}');
styles.push('.a_mu{ border:solid #e5e5e5; border-width:0 1px 1px; background:#333000;}');
styles.push('.a_t td{ padding:4px 15px; border:1px solid #e5e5e5;}');
styles.push('.tbn li.a{ margin:-1px 0 0; padding:0 10px 0 9px; border-top:1px solid #e5e5e5; border-bottom-style:solid; background:#333;}');
styles.push('.tedt .bar{ padding:0 10px 0 0; height:25px; line-height:25px; border-bottom:1px solid #e5e5e5; background:#333000;}');
styles.push('.f_c .list{margin:0 auto 10px; width:570px;border-top:3px solid #e5e5e5;}');
styles.push('.f_c .list th,.f_c .list td{padding:5px 2px; height:auto; border-bottom:1px dashed #e5e5e5;}');
styles.push('.rfm{ margin:0 auto; width:760px; border-bottom:1px dotted #e5e5e5;}');
styles.push('#returnmessage4{ display:none; padding:10px 0; border-bottom:1px solid #e5e5e5; background:#FFE; text-align:center; font-weight:700;}');
styles.push('#messagelogin{margin-top:5px;border-top:1px solid #e5e5e5;}');
styles.push('.fastlg_fm{ margin-right:5px; padding-right:5px; border-right:1px solid #e5e5e5;}');
styles.push('.dt{ border-top:1px solid #e5e5e5; width:100%;}');
styles.push('.dt td,.dt th{ padding:7px 4px; border-bottom:1px solid #e5e5e5;}');
styles.push('.tdat{ width:100%; border:1px solid #e5e5e5;}');
styles.push('.tdat th,.tdat td{ padding:4px 5px; border:1px solid #e5e5e5;}');
styles.push('.um{ margin-bottom:1em; padding-bottom:1em; border-bottom:1px dashed #e5e5e5; clear:left;}');
styles.push('.lum ul{ padding:1em 0 1em 2em; margin-bottom:1em; border-bottom:1px dashed #e5e5e5;}');
styles.push('.pg a,.pg strong,.pgb a,.pg label{ float:left; display:inline; margin-left:4px; padding:0 8px; height:26px; border:1px solid; border-color:#e5e5e5; background-color:#333; background-repeat:no-repeat; color:#00FF00; overflow:hidden; text-decoration:none;}');
styles.push('.uploadform{padding:0 10px; border:1px dashed #e5e5e5; background:#333000;}');
styles.push('.b_hstab td{padding:5px 0; border-bottom:1px solid #e5e5e5;}');
styles.push('.card{ padding:0; width:295px !important; border-color:#e5e5e5; background:#FDFEFF;}');
styles.push('.card_info{ border:dashed #e5e5e5; border-width:1px 0;}');
styles.push('.card .o a{ float:left; margin:3px 5px 3px 0; padding:2px 0; width:5em; border:1px solid #e5e5e5; background:#2D2D2D url(../../static/image/common/card_btn.png) repeat-x 0 100%; line-height:14px; text-align:center;}');
styles.push('.plugin .bm_h{ border-color:#e5e5e5; color:#FF9933;background:#333000;}');
styles.push('a {color:#ccc; text-decoration:none; text-shadow:1px 1px 0px #333,0 0 0px #333,0 0 0px #333,0 0 0px #333; -webkit-transition:all .5s ease-out; -moz-transition:all .5s ease-out; -o-transition:all .5s ease-out; transition:all .5s ease-out;}');
styles.push('a:hover {color:#fff; text-shadow: 0px 1px 0px #FF00FF, 0px 0px 3px #FF00FF, 0px 0px 5px #FF00FF, 0px 0px 30px #FF00FF, 0px 3px 50px #FF00FF;}');
styles.push('.bm_h{ border-width:1px 0; border-color:#e5e5e5; background:#333; background: url(http://s28.postimg.org/mfa4hskrh/bg_header.png) repeat scroll 0% 0% #333; background-color: #333; background-image: url(http://s28.postimg.org/mfa4hskrh/bg_header.png); background-repeat: repeat; background-attachment: scroll; background-position: 0% 0%; background-clip: border-box; background-origin: padding-box; background-size: auto auto;}');
styles.push('.p_pop, .p_pof, .sllt {padding: 4px; padding-top: 4px;    padding-right-value: 4px;    padding-bottom: 4px;    padding-left-value: 4px;    padding-left-ltr-source: physical;    padding-left-rtl-source: physical;    padding-right-ltr-source: physical;    padding-right-rtl-source: physical;border: 1px solid #e5e5e5;    border-top-width: 1px;    border-right-width-value: 1px;    border-right-width-ltr-source: physical;    border-right-width-rtl-source: physical;    border-bottom-width: 1px;    border-left-width-value: 1px;    border-left-width-ltr-source: physical;    border-left-width-rtl-source: physical;    border-top-style: solid;    border-right-style-value: solid;    border-right-style-ltr-source: physical;    border-right-style-rtl-source: physical;    border-bottom-style: solid;    border-left-style-value: solid;    border-left-style-ltr-source: physical;    border-left-style-rtl-source: physical;    border-top-color: #e5e5e5;    border-right-color-value: #e5e5e5;    border-right-color-ltr-source: physical;    border-right-color-rtl-source: physical;    border-bottom-color: #e5e5e5;    border-left-color-value: #e5e5e5;    border-left-color-ltr-source: physical;    border-left-color-rtl-source: physical;    -moz-border-top-colors: none;    -moz-border-right-colors: none;    -moz-border-bottom-colors: none;    -moz-border-left-colors: none;    border-image-source: none;    border-image-slice: 100% 100% 100% 100%;    border-image-width: 1 1 1 1;    border-image-outset: 0 0 0 0;    border-image-repeat: stretch stretch;width: auto;min-width: 60px;background: none repeat scroll 0% 0% #333;    background-color: #333;    background-image: none;    background-repeat: repeat;    background-attachment: scroll;    background-position: 0% 0%;    background-clip: border-box;    background-origin: padding-box;    background-size: auto auto;box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);}');

addGlobalStyle(styles.join(''));