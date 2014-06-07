// A9.com Googlizer
// version 1.0 BETA!
// 2005-08-05
//
//
// ==UserScript==
// @name          A9.com Googlizer
// @namespace     http://www.thejosher.com
// @description   Make a9.com more readable, somewhat like Google.
// @include       http://*a9.com
// ==/UserScript==
 */

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(
'@page{margin:10%}' +
'body{padding-right:0px;padding-left:0px;font-size:small;padding-bottom:0px;margin:10px 10px 10px 10px;color:#000000;padding-top:0PX;font-family:verdana,arial,helvetica,sans-serif;background-color:#F7F8FF;}' +
'a{color:#0366C9;text-decoration:underline;cursor:pointer;}' +
'a:hover{color:#3096FC;}' +
'a:active{color:#1C499D;}' +
'td{font-size:small;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'p{font-size:small;MARGIN:0.25em 0px;}' +
'ul{MARGIN:0.25em 0px;display:block;margin-left:1.5em;padding-left:0em;}' +
'li{display:list-item;}' +
'option select{font-size:small;}' +
'.gnav{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;color:#d5d5d5;padding-left:1em;padding-right:1em;text-decoration:none;border:1px solid #d5d5d5;background-color:#ffffff;}' +
'.small{font-size:x-small;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.about{display:none;}' +
'.button{cursor:pointer;}' +
'.colcb{width:11em;position:relative;float:left;overflow:hidden;}' +
'.o_win .colcb{width:12em;}' +
'.colover{background-color:#fdfbbb;}' +
'.pcurs{cursor:pointer}' +
'.form{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;color:#000000;width:100%;border:1px solid;border-color:#818181;MARGIN:0.25em 0px;}' +
'option,select,.text{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;}' +
'.wl{font-size:small;color:#818181;font-family:Verdana,Arial,Helvetica,sans-serif;text-decoration:none;}' +
'.wl-b{font-weight:bold;font-size:small;color:#575757;font-family:Verdana,Arial,Helvetica,sans-serif;text-decoration:none;}' +
'.tabHeader{margin-left:10px;position:relative;width:100%;height:1.5em;}' +
'.tabHeader ul{margin:0;padding:0;position:absolute;bottom:-1px;width:45em;}' +
'.tabHeader ul li{display:inline;list-style:none;}' +
'.tabHeader ul a,.tabHeader ul span{display:block;float:left;padding:4px 4px;margin:2px 4px 0 0;text-align:center;text-decoration:none;}' +
'.tabHeader ul span{border:1px solid #d5d5d5;border-bottom:none;background:#ffffff;padding-bottom:7px;margin-top:0;}' +
'.tabHeader ul a{background:#E8F2FD;border:1px solid #d5d5d5;border-bottom:none;}' +
'.tabHeader ul a:hover{border-color:#d5d5d5;background:#C7DCFC;}' +
'.tabHeader ul .tabover{background:#C7DCFC;}' +
'.tabBody{border:1px solid #d5d5d5;background-color:#ffffff;clear:both;padding:0.5em;}' +
'.1pixelshadow{border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e0e0e0;border-left-width:1px;border-left-style:solid;border-left-color:#e0e0e0;}' +
'.container{border-top:1px solid #B5C5DF;border-bottom:1px solid #B5C5DF;padding:10px;background:#ffffff;}' +
'.resizeNormal3 .container{-moz-opacity:0.25;opacity:0.25;filter:alpha(opacity=25);}' +
'.resizeNormal2 .container{-moz-opacity:0.5;opacity:0.5;filter:alpha(opacity=50);}' +
'.resizeNormal1 .container{-moz-opacity:0.75;opacity:0.75;filter:alpha(opacity=75);}' +
'.container-collapsed{border-top:1px solid #B5C5DF;border-bottom:1px solid #B5C5DF;background:#ffffff;}' +
'.control-col{padding:.5em;}' +
'.buttonLink{cursor:pointer;color:#575757;background-color:#E8F2FD;padding:0.33em;border-color:#ffffff;border-style:outset;border-width:2;text-decoration:none;font-weight:bold;}' +
'.control-off{cursor:pointer;color:#575757;background-color:#E8F2FD;padding:0.33em;border-color:#ffffff;border-style:outset;border-width:2;text-decoration:none;display:block;clear:none;margin-top:0.5em;position:relative;}' +
'.control-on{cursor:pointer;color:#575757;background-color:#ffffff;padding:0.33em;margin-top:0.5em;border-color:BUTTON_ON_BORDER;border-style:inset;border-width:2;text-decoration:none;display:block;clear:none;position:relative;}' +
'.control-off-drop{cursor:pointer;color:#575757;background-color:#C7DCFC;padding:0.33em;border-color:#ffffff;border-style:outset;border-width:2;text-decoration:none;display:block;clear:none;margin-top:0.5em;position:relative;}' +
'.control-on-drop{cursor:pointer;color:#575757;background-color:#C7DCFC;padding:0.33em;margin:0.5em 1em 0em 0em;border-color:BUTTON_ON_BORDER;border-style:inset;border-width:2;text-decoration:none;display:block;clear:none;position:relative;}' +
'.led{background-color:#B1D8FE;border:1px solid #818181;height:.5em;width:.5em;overflow:hidden;position:absolute;left:.1em;top:.6em;margin-top:.25em;}' +
'.b_moz .led{top:.25em;left:.25em;}' +
'.b_safari .led{top:.4em;}' +
'.control-off .led{visibility:hidden;}' +
'.control-off-drop .led{visibility:hidden;}' +
'.text-drop{background-color:#C7DCFC;}' +
'.column{background-color:#B5C5DF;background-image:url(/-/static/images/slide-bar-sky.gif);width:7px;height:100%;}' +
'.edge-column{background-color:#B5C5DF;background-image:url(/-/static/images/outer-edge-sky.gif);width:4px;height:100%;}' +
'.bmDiary{color:#575757;margin-left:1em;}' +
'.bmExplain{font-size:x-small;color:#575757;margin-left:1em;}' +
'.bmExplain a{font-size:x-small;color:#575757;}' +
'.explainQ{font-size:x-small;color:#707070;font-family:Verdana,Arial,Helvetica,sans-serif;vertical-align:middle;margin-left:.3em;}' +
'.content{color:#575757;border-width:1px;border-style:solid;border-color:#eaeaea;}' +
'.edit{padding:0.33em;border:1px solid #d5d5d5;background-color:#FBFDFF;}' +
'.r{font-size:small;color:#575757;line-height:1.5em;font-family:Verdana,Arial,Helvetica,sans-serif;background-color:#ffffff;}' +
'.r-a{font-weight:bold;font-size:medium;font-family:Arial,Helvetica,sans-serif;color:#0000CC;;}' +
'.r-a:hover{color:#0000CC;text-decoration:underline;;}' +
'.r-a:active{color:#0000CC;text-decoration:underline;;}' +
'.r-a:visited{color:#551A8B;text-decoration:underline;;}' +
'.r-url{font-size:small;color:#008000;font-family:Arial, Helvetica, sans-serif;text-decoration:none;}' +
'.lastvisit{display:none;;}' +
'.bc{color:#818181;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'image.image{border:1px solid #707070;}' +
'.float-element{float:right;clear:right;margin:.5em .5em .5em 1em;padding:0px;}' +
'.demo-text{width:350px;border:1px solid #d5d5d5;background-color:#F7F8FF;margin:.25em 0 .25em 0;padding:.5em;}' +
'.imageImg{vertical-align:middle;border:0;margin:.25em;border:1px solid #707070;}' +
'.gn{font-size:small;color:#575757;font-family:Verdana,Arial,Helvetica,sans-serif;text-decoration:none;}' +
'.fn{display:none;;}' +
'.sl{display:none;;}' +
'.sl-a{display:none;;}' +
'.sl-url{display:none;;}' +
'.sl-label{display:none;;}' +
'.sl-table{display:none;;}' +
'.site-info{background-image:url(/-/static/images/site-info-sky.gif);width:47px;height:15px;}' +
'.about-right{float:right;clear:both;width:200px;border:1px solid #C0C0C0;margin:0 1em 1em 1em;padding:.5em;background-color:#F7F8FF;}' +
'.diary-entry{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:x-small;color:#575757;line-height:2em;}' +
'.caption{font-size:small;color:#707070;font-family:trebuchet MS,Verdana,Arial,Helvetica,sans-serif;}' +
'.sm-arial{font-family:Arial,Helvetica,sans-serif;font-size:x-small;color:#818181;}' +
'.new-a{text-decoration:none;font-size:.9em;font-family:Verdana,Arial,Helvetica,sans-serif;border-bottom:1px solid #C0C0C0;}' +
'.new-a:link{color:#00A400;text-decoration:none;border-bottom:1px solid #C0C0C0;}' +
'.new-a:hover{color:#00A400;border-bottom:1px solid #3096FC;}' +
'.new-a:active{color:#00A400;border-bottom:1px solid #1C499D;}' +
'.new-a:visited{color:#00A400;border-bottom:1px solid #C0C0C0;}' +
'.flag{font-size:.6em;color:#FFFFFF;padding:2px 2px 2px 3px;background-color:#00A400;font-family:Verdana,Arial,Helvetica,sans-serif;font-weight:bold;}' +
'.b_moz .flag{font-size:.65em;padding:2px;}' +
'.noResult{font-size:x-small;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.std{font-size:small;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.paging{font-size:small;color:#818181;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.pagingCur a{font-size:small;font-weight:bold;color:#000000;font-family:Verdana,Arial,Helvetica,sans-serif;text-decoration:none;}' +
'.pagingCur a:hover{color:#000000;}' +
'.pagingCur a:active{color:#000000;}' +
'.paging-table{padding:5px;background-color:#ffffff;border:1px solid #eaeaea;background-position:center;width:auto;}' +
'.not-page-1{font-size:small;padding:5px;background-color:#ffffff;border:1px solid #eaeaea;background-position:center;width:auto;}' +
'.excerpt{font-size:small;font-family:Verdana,Arial,Helvetica,sans-serif;MARGIN-LEFT:0.5em;}' +
'.beta-column{background-image:url(/-/static/images/beta-column-sky.gif);width:28px;height:16px;}' +
'.button-small{cursor:pointer;color:#575757;font-size:80%;background-color:#E8F2FD;border-color:#ffffff;border-style:outset;border-width:2px;font-weight:bolder;}' +
'.button-small-disabled{cursor:pointer;border-style:outset;color:#575757;font-size:80%;font-weight:bolder;background-color:#eaeaea;border:2px solid;border-color:#ababab;}' +
'.button-small-down{cursor:pointer;border-style:outset;color:#575757;font-size:80%;font-weight:bolder;background-color:#fcf3da;border:2px solid;border-right-color:#d9bfa6;border-bottom-color:#d9bfa6;border-left-color:#818181;border-top-color:#818181;}' +
'.resize{cursor:col-resize;}' +
'.resizeMin{cursor:pointer;}' +
'.resizeNormal,.resizeNormal1,.resizeNormal2,.resizeNormal3,.resizeFull{overflow:hidden;}' +
'.yesFull{display:none;}' +
'.resizeFull .yesFull{display:inline;}' +
'.resizeFull .noFull{display:none;}' +
'.spellcheck{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;color:#cc3333;font-weight:bold;margin:.5em 0 1em 0;}' +
'.spellcheckurl{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;color:#377bfb;font-weight:bold;}' +
'.tip{padding:5px;margin:1em;text-align:left;background-color:#FFFFEE;border:1px solid #707070;width:75%;}' +
'.bm-edit{border:1px solid #d5d5d5;background-color:#FBFDFF;}' +
'.bm-header{padding:.5em;background-color:#E8F2FD;color:#0366C9;border-bottom:1px solid #d5d5d5;}' +
'.bmList{padding-bottom:.3em;}' +
'.bmDiv{background-color:#ffffff;cursor:pointer;}' +
'.bmDivOver{background-color:#E8F2FD;cursor:pointer;}' +
'.bmDivSel{background-color:#C7DCFC;cursor:pointer;}' +
'.bmDivMod{background-color:#C7DCFC;color:#1C499D;cursor:pointer;}' +
'.bmDropCurs{background-color:#666666;height:2px;}' +
'.noBm{font-style:italic;}' +
'.emptyFolder{font-style:italic;}' +
'.histFolder{padding-bottom:.3em;}' +
'.histLi{padding-bottom:.3em;}' +
'.ypform{padding:.5em;margin:1em 0 1em 0;background-color:#F7F8FF;border:1px solid #d5d5d5;}' +
'.ypMapOut{border-top:1px solid #F7F8FF;border-left:1px solid #F7F8FF;border-right:1px solid #1C499D;border-bottom:1px solid #1C499D;font:Verdana,Arial,Helvetica,sans-serif;font-size:.7em;background-color:BC_COLOR;#F7F8FF;text-decoration:none;cursor:pointer;}' +
'.ypMapLink{color:#1C499D;background-color:#E8F2FD;padding:.15em;border:1px solid #d5d5d5;text-align:center;font:Verdana,Arial,Helvetica,sans-serif;font-size:10;font-weight:bold;text-decoration:none;display:block;}' +
'.ypMapNone{color:#F7F8FF;background-color:#818181;padding:.15em;border:1px solid #d5d5d5;text-align:center;font:Verdana,Arial,Helvetica,sans-serif;font-size:10;font-weight:bold;text-decoration:none;display:block;}' +
'.ypMapHover .ypMapLink{color:#E8F2FD;background-color:#1C499D;}' +
'.ypCaption{font-style:italic;}' +
'.ypAd{margin-top:0.5em;}' +
'.columnWide .ypAd{width:300;}' +
'.columnWide .ypRight{float:right;margin-left:1em;}' +
'.columnNarrow .noNarrow{display:none;}' +
'.comboPopup{background:#F7F8FF;border:solid 1px #818181;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:x-small;}' +
'.comboSel{color:#ffffff;background:#0366C9;cursor:pointer;font-size:x-small;}' +
'.comboUnsel{cursor:pointer;font-size:x-small;}' +
'.comboTitle{font-weight:bold;font-size:x-small;}' +
'.comboHR{margin:1;padding:0;cursor:pointer;font-size:x-small;}' +
'.disabledText{color:#c0c0c0;}' +
'.trash{font-size:x-small;color:#575757;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.trash img{vertical-align:middle;}' +
'.selEvenMoreCol{background:#C7DCFC;padding:.25em .5em .25em 0;margin:1em 0 1em 0;}' +
'.selEvenMoreCol .r{background:#C7DCFC;}' +
'.selOddMoreCol{background:#C7DCFC;padding:.25em .5em 0.25em 0;margin:1em 0 1em 0;}' +
'.selOddMoreCol .r{background:#C7DCFC;}' +
'.evenMoreCol{background:#E8F2FD;padding:.25em .5em 0.25em 0;margin:1em 0 1em 0;}' +
'.evenMoreCol .r{background:#E8F2FD;}' +
'.oddMoreCol{padding:.25em .5em 0.25em 0;margin:1em 0 1em 0;}' +
'.oddMoreCol .r{}' +
'.contentLink{color:#575757;}' +
'th{font-weight:bolder;text-align:center;}' +
'caption{text-align:center;}' +
'h1{font-size:medium;color:#0366C9;margin:0.33em 0 .75em;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#d5d5d5;width:75%;}' +
'h2{font-size:medium;color:#575757;margin-bottom:.75em;font-weight:normal;}' +
'h3{font-size:small;MARGIN:.5em 0em 0px;}' +
'h4{font-size:medium;color:#0366C9;margin:1em 0 .33em;}' +
'h5{font-size:medium;color:#575757;margin-bottom:.75em;font-weight:normal;}' +
'h6{font-size:0.67em;MARGIN:2.33em 0px;}' +
'h1,h3,h4,h5,h6,b,strong{font-weight:bolder;}' +
'blockquote{MARGIN:0.25em 0px;}' +
'fieldset{MARGIN:0.25em 0px;}' +
'.form{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:small;color:#000000;width:100%;border:1px solid;border-color:#818181;MARGIN:0.25em 0px;}' +
'dir{MARGIN:0.25em 0px;}' +
'center,dir,hr,menu,pre{display:block;}' +
'pre,code{font-size:small;color:black;}' +
'ol{MARGIN:0.25em 0px;}' +
'dl{MARGIN:0.25em 0px;}' +
'menu{MARGIN:0.25em 0px;}' +
'hr{size:1px;border-bottom:1px #d5d5d5;}' +
'ol,dir,menu{margin-left:20px;}' +
'dt{margin:1.5em 0 .25em 1em;font-weight:bold;font-size:small;color:#0366C9;font-family:Verdana,Arial,Helvetica,sans-serif;text-decoration:none;}' +
'dd{margin:0 0 .5em 1em;}' +
'ol{list-style-type:decimal;}' +
'ol ul,ul ol,ul ul,ol ol{margin-top:0;margin-bottom:0;}' +
'br:unknown{content:"";}' +
'.adm{background-color:yellow;}' +
'.result-item{FONT-WEIGHT:normal;}' +
'.result-desc{FONT-WEIGHT:normal;FONT-SIZE:small;}' +
'.popup{FONT-SIZE:x-small;background-color:#FBFDFF;}' +
'.popup_heading{FONT-WEIGHT:bold;FONT-SIZE:small;COLOR:#0366C9;}' +
'.popup_sitetitle{FONT-WEIGHT:bold;FONT-SIZE:small;}' +
'.popup_url{FONT-SIZE:small;COLOR:#000000;}' +
'.popup_link{FONT-SIZE:x-small;}' +
'#lt-nav ul{margin:0 0 0 .5em;list-style-type:none;border:1px solid #707070;background-color:#E8F2FD;border-bottom:none;white-space:nowrap;}' +
'#lt-nav li{width:100%;}' +
'#lt-nav a,#lt-nav strong{white-space:nowrap;display:block;padding:.5em;background-color:#E8F2FD;border-bottom:1px solid #707070;font-size:x-small;}' +
'#lt-nav a:hover{background-color:#ffffff;}' +
'.lt-nav-title{margin:0;padding:.5em;list-style-type:none;background-color:#ffffff;white-space:nowrap;border-bottom:1px solid #707070;font-weight:bold;}' +
'.lt-nav-current{margin:0;padding:.5em;list-style-type:none;color:#575757;background-color:#C7DCFC;white-space:nowrap;border-bottom:1px solid #707070;font-weight:bold;}' +
'#maincontent{margin:.25em .5em 1em .5em;background-color:#FFFFFF;border:1px solid #C0C0C0;padding:.5em;}' +
'#header{margin:.25em .5em 1em .5em;padding:.5em;}' +
'#footer{margin:1em .5em 1em .5em;border-top:1px solid #C0C0C0;padding:.5em;}' +
'.toolsHeader{margin-left:10px;position:relative;width:100%;height:2em;width:45em;}' +
'.toolsHeader ul{margin:0;padding:0;position:absolute;bottom:5px;}' +
'.toolsHeader ul li{display:inline;list-style:none;}' +
'.toolsHeader ul a{display:block;float:left;padding:4px 4px;margin:2px 4px 0 0;text-align:center;text-decoration:none;}' +
'.toolsHeader ul .toolOff{border:1px solid #d5d5d5;background:#ffffff;}' +
'.toolsHeader ul .toolOn{background:#E8F2FD;border:1px solid #d5d5d5;}' +
'.toolsHeader ul a:hover{border-color:#d5d5d5;background:#C7DCFC;}' +
'.toolsHeader ul .toolOver{background:#C7DCFC;}' +
'.nolink{text-decoration:none;color:#000000;}' +
'.nolinkAbout{text-decoration:none;font-size:x-small;color:#707070;font-family:Verdana,Arial,Helvetica,sans-serif;}' +
'.halfCheck{-moz-opacity:0.40;opacity:0.40;filter:alpha(opacity=40);}' +
'.b_gen .halfCheck{background:#cccccc !important;}' +
'.b_ie a.halfcheck{background:#eeeeee !important;}'
);
})();
