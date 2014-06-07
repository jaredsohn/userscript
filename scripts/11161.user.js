// ==UserScript==
// @name             Myspace comment page
// @namespace      jksnc
// @include        http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=*
// ==/UserScript==


// ==UserScript==
// @name            Platypus-comment.myspace.com/inde
// @namespace       Platypus
// @include         http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=*
function do_platypus_script() {
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.getElementById('header_search'),null,null,null);
remove_it(window.document,document.getElementById('ctl00_Header_Header1_imgGoogle'),null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/THEAD[1]/TR[1]/TH[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/THEAD[1]/TR[1]/TH[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.getElementById('footer'),null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/DIV[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<style type="text/css">td.text td.text table table table td a img {width:100px;}td.text td.text table table table td div img {width:80px;}td.text td.text table table td img {width:260px; max-width:260px; width:auto;}td.text td.text table table td div img {width:80px;}* html td.text td.text table table td img {width:260px;}* html td.text td.text table table td a img {width:90px;}* html td.text td.text table table td div img {width:80px;}</style>           ',true,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<style type="text/css">td.text td.text table table table td a img {width:80px;}td.text td.text table table table td div img {width:80px;}td.text td.text table table td img {width:260px; max-width:260px; width:auto;}td.text td.text table table td div img {width:80px;}* html td.text td.text table table td img {width:260px;}* html td.text td.text table table td a img {width:90px;}* html td.text td.text table table td div img {width:80px;}</style>           ',true,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<style type="text/css">td.text td.text table table table td a img {width:80px;}td.text td.text table table table td div img {width:80px;}td.text td.text table table td img {width:260px; max-width:260px; width:auto;}td.text td.text table table td div img {width:80px;}* html td.text td.text table table td img {width:260px;}* html td.text td.text table table td a img {width:90px;}* html td.text td.text table table td div img {width:80px;}</style>           ',true,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<style type="text/css">td.text td.text table table table td a img {width:80px;}td.text td.text table table table td div img {width:80px;}td.text td.text table table td img {width:160px; max-width:160px; width:auto;}td.text td.text table table td div img {width:70px;}* html td.text td.text table table td img {width:160px;}* html td.text td.text table table td a img {width:80px;}* html td.text td.text table table td div img {width:70px;}</style>           ',true,false);
html_insert_it(window.document,document.getElementById('comments'),'<style type="text/css"> body {background: url('http://cbimg6.com/layouts/07/08/04/20303aa.gif'); background-repeat: repeat; line-height: 17px; cursor: ne-resize;color:444444;}td, .text, div, input {color:!important;} span, b {color: !important;} a {color: !important;} img {border:0px;} table, tr, td {background:transparent; border:0px;} div table td font {visibility:hidden;} div table table table td font {visibility:visible;} table table table td {visibility:hidden;} marquee, table table table div td {visibility:visible;} table table embed {display:block; position:absolute; top:0px; left:0px; visibility:visible;} table table table embed {position:static;} table div div, table tr td div font a {visibility:hidden;} .div1 div, .div2 div, .div3 div, .div4 div, .div5 div, .div1 a, .div2 a, .div3 a, .div4 a, .div5 a, .div6 a, .div7 a, {visibility:visible !important;} .text, table table table table a, table table table table div, .frm1 {visibility:hidden;} table table table table div a, .frm1 input {visibility:visible;} .text, td.text td.text table, .contactTable, .lightbluetext8 {display:none;} table table, table table td {padding:0px; height:0px;} .nav { background-color:transparent; position:absolute; z-index:2; top:50%; margin-top:-220px;left: 50%;margin-left: 75px;text-align:left; visibility:visible;}.aboutme { background-color:transparent; width: 325px; position:absolute; z-index:2; left:0; top:50%; margin-top:-228px;left: 50%;margin-left: -300px;text-align:left; visibility:visible; font-size: 8pt; overflow:auto;height:210px;}.div { background: 000; overflow:auto; position:absolute; z-index:2; top:50%; margin-top:-300px;left: 50%;margin-left: -380px;text-align:left; visibility:visible;}font, td, a, table, td, li, p, div, textarea, li, h1, h2, p, br {font-family:Verdana;font-size: 8pt; color:000; font-weight: normal; text-decoration: none; letter-spacing: 0px; padding: 0px; line-height: 17px;} h1 {font: 22pt "impact";text-align: left;letter-spacing: 3px;text-transform: lowercase;margin: 0 0 10px 0;color:4E5B54; }div.title { font: 30pt "arial black";position:absolute; z-index:2; top:50%; margin-top:25px;left: 50%;margin-left: 30px;letter-spacing: -5px;text-transform: lowercase;color:C1821F;}.friends {position:absolute; z-index:2; top:50%; margin-top:140px;left: 50%;margin-left: -300px;width:600px;height:200px;}.contactTable {display: none;}.text {font-family:Verdana;font-size:9; color: 0072BC; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .orangetext15 {font-family:Verdana;font-size:12; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;}.redbtext, .redtext {font-family:Verdana;font-size:9; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .lightbluetext8 {font-family:Verdana;font-size:12; color: ffffff; font-weight: bold; text-decoration: bold; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .nametext {font-family:Verdana;font-size:12; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .0072BCtext12 {font-family:Verdana;font-size:12; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} textarea, input {font-family:Verdana;font-size:9; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .btext {font-family:Verdana;font-size:4; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .0072BCtext10 {font-family:Verdana;font-size:12; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .0072BCtext12 {font-family:Verdana;font-size:12; color: ffffff; font-weight: normal; text-decoration: none; letter-spacing: 0px; text-transform: ; padding: 0px; line-height: 10px;} .r { Layout by Fainaru - fainaruu.uni.cc }a:link, a:visited, a:active {color:556960; text-decoration: none; font-weight:bold;}a:hover {cursor: help; color: FF5300; text-decoration: none;}input, textarea {cursor: ne-resize; color:000;font-size:8pt;font-family:Verdana;background-color:74887F;border-width:1px; border-style:solid; border-color:000;}blockquote {background:transparent;border: transparent 0px solid;margin: 20px 50px 20px 55px;padding: 10px 10px 30px 10px;}</style><table><tr><td><table><tr><td><table><tr><td>',true,false);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TH[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TH[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[2]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[2]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[3]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[3]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[4]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[4]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[5]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[5]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[6]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[6]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[7]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[7]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[8]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[8]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[9]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[9]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[10]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[10]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[11]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[11]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[12]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[12]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[13]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[13]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[14]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[14]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[15]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[15]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[16]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[16]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[17]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[17]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[18]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[18]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[19]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[19]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[20]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[20]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[21]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[21]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[22]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[22]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[23]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[23]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[24]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[24]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[25]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[25]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[26]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[26]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[27]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[27]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[28]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[28]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[29]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[29]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[30]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[30]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[31]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[31]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[32]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[32]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[33]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[33]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[34]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[34]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[35]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[35]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[36]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[36]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[37]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[37]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[38]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[38]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[39]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[39]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[40]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[40]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[41]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[41]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[42]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[42]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[43]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[43]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[44]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[44]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[45]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[45]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[46]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[46]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[47]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[47]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[48]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[48]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[49]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[49]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[50]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[50]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: red;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TH[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: red;background-color: white;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/FORM[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TH[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: red;background-color: white;",null,null);
set_style_script(window.document,document.getElementById('comments'),"color: red;background-color: white;",null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 
function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  var biggest_elem = find_biggest_elem(doc);
  isolate(doc, biggest_elem);
  relax(doc, biggest_elem);
  make_bw(doc, biggest_elem);
  fix_page_it(doc, biggest_elem);
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  var allElems = document.evaluate("//*",
 doc.body, null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
    var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

    if (thisElem_size < size_of_body &&
thisElem_size > max_size &&
!contains_big_element(thisElem, size_of_body * big_element_limit)) {
      max_size = thisElem_size;
      max_elem = thisElem;
    };
  };
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning("Platypus couldn't find a page element when executing the command "+
func_name+".  This usually happens when running a script -- maybe the"+
" web page the script is running on has changed.");
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};
//.user.js