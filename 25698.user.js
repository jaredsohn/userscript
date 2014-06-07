// ==UserScript==
// @name          T.O Skin - Vista V1.0
// @namespace     http://www.rajputgal.4t.com
// @description	  Orkut vista
// @author        Modified bye rajputgal
// @homepage      http://www.orkut.com/Community.aspx?cmm=20303922
// @include       http://*.orkut.com/*
// @include       https://*.orkut.com/*
// @include       https://*www.google.com/accounts/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml);"+
".newText { padding: 0px 0px; line-height: 1.5em; font-size: 12px; text-align: center !important}"+
".magenta { color: blue !important}"+
".newMain { background: white; padding: 0px  !important}"+
".newGaia { background: white; padding: 0px  !important}"+
".newFooter { background-image:url(http://img246.imageshack.us/img246/9464/footerlzz3.png); background-color: white; margin: 4px 0 0 0; font-size: 12px; height:30px; padding: 5px; text-align: center !important }"+
".spacer { height: 7px; background-color: white; margin: 0px -0px  !important}"+
"body {filter:alpha(opacity:3);opacity:.80; background-color: white; color: #000; font-family: Verdana, Arial, sans-serif; font-size: 12px; margin: 0px !important}"+
".joinNow {filter:alpha(opacity:3);opacity:.70; font-size: 12px; background: white; padding: 0px 0px; text-align: center; line-height: 1.7em !important }"+
"a.userbutton,.listlight,.listitemlight,.listitem,"+
".listitemchk{background-color:white;!important/*fudo tabela 2*/}#header "+
"li.logobg .logo{background:url(http://img246.imageshack.us/img246/9848/eeeers8.png) !important}"+
".trustyon{background:url(http://galrajput.googlepages.com/123_166x250.jpg) !important}"+
"#footer .logogoogle{background:url() !important}"+
"#footer .logosml{background:url() !important}"+
".listdark,.listitemdark,.listitemsel{background-color:white;!important/*fudo tabela 1*/}"+
".promobg{background-color:white !important/*atualizações*/}"+
"body,.userinfodivi,.ln,a.userbutton:hover{background-image: url(http://galrajput.googlepages.com/123_166x250.jpg) !important/*bg fundo*/}"+
"a.userbutton{border-color:white !important/*linha menu*/}"+
"ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}"+
".tabdivi{background-color:white !important/*linha do perfil*/}#header"+
"li{color:silver !important/*divições dos |butões|*/}#header,#header "+
"li.logobg,ul.intabs li.sel{background-image:url(http://img246.imageshack.us/img246/9464/footerlzz3.png);height:32px; !important/*barra menu*/}"+
"body:after{content:url(http://www.usagi.blogger.com.br/1000.gif)}"+
".ltxt,.rfdte{color:black !important/*sobnome*/}"+
"a.userbutton,.useremail{color:black !important/*email*/}"+
"a,.floatanchornormal{color:black !important/*link*/}"+
"a:hover,.parabtns a.btn:hover,.inlinebtns "+
"a.btn:hover{color:black !important/*ao passar o mouse no link*/}#header "+
"li a,ul.intabs li.sel a{color:white !important/*link barra menu*/}"+
".footer_l{background-image:url(http://img246.imageshack.us/img246/9464/footerlzz3.png);height:37px;align:center;color:white; !important}"+
".footer_r{background-image:url(http://img246.imageshack.us/img246/9464/footerlzz3.png);height:37px; !important}"+
".module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock{filter:alpha(opacity:3);opacity:.70;background-color:#fff  !important}"+
".module .topl,.module .topl_lrg,.module .topl_g{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img246.imageshack.us/img246/174/boxtoplhne3.png) !important}"+
".module .topr,.module .topr_g{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img246.imageshack.us/img246/174/boxtoplhne3.png) !important}"+
".module .topr_lrg{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img3.orkut.com/img/castro/box_top_rh_lrg.png) !important}"+
".module .botl{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img4.orkut.com/img/castro/box_bot_lh.png) !important}"+
".module .botr{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img1.orkut.com/img/castro/box_bot_rh.png) !important}"+
".module .topr,.module .topr_g{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img2.orkut.com/img/castro/box_top_rh.png)  !important}"+
".module .boxmidr,.module .boxmidsmlr{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img1.orkut.com/img/castro/box_mid_rh.png) !important}"+
"ul.intabs li{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img2.orkut.com/img/castro/tabnotsel_r.gif) !important}"+
"ul.intabs li .ltab{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img3.orkut.com/img/castro/tabnotsel_l.gif) !important}"+
"ul.intabs li.sel{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img4.orkut.com/img/castro/tabsel_r.gif) !important}"+
"ul.intabs li.sel .ltab{filter:alpha(opacity:3);opacity:.70;background-image:url(http://img1.orkut.com/img/castro/tabsel_l.gif) !important}";

if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        heads[0].appendChild(node);
    }
}

function Logo() {	document.images[0].src="http://www.pplware.com/wp-content/images/logo_vista_security.jpg";
}
Logo();
