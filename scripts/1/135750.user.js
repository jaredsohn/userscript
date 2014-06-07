// ==UserScript==
// @name         Tao Of Scripts [userscripts.org]
// @namespace    http://www.airmio.com/
// @version      0.3.6
// @description  Make userscripts.org beautiful.
// @match        http://userscripts.org/*
// ==/UserScript==

(function(){
  
    var fontsCFG = 'http://fonts.googleapis.com/css?family=Glegoo|Open+Sans+Condensed:300,700|Open+Sans';
    var webFontsEl = document.createElement('link');
    webFontsEl.setAttribute('rel','stylesheet');
    webFontsEl.setAttribute('type','text/css');
    webFontsEl.setAttribute('href',fontsCFG);
    document.head.appendChild(webFontsEl);

    var styleRaw = '\
body { font-family:"Open Sans",sans-serif; }\
a:hover { text-decoration: none }\
#header #mainmenu li { border: none }\
#install_script { top: 30px }\
\
#summary { padding: 0 }\
#summary p  { position: relative; border-left: 150px solid #EEE; margin: 3px 8px; padding: 3px }\
#summary p b { position: absolute; left: -150px; width: 145px; text-align: right }\
\
body.scripts #screenshots { border: none; margin: 3px 8px; padding-left: 150px; overflow: hidden; position: relative }\
body.scripts #screenshots:before { content: "Screenshots"; position: absolute; left: -150px; width: 145px; text-align: right; font-weight: bold }\
body.scripts #screenshots a { float: left; border: 1px solid #DDD; padding: 3px; background-color: #FFF; margin-right: 5px }\
body.scripts #screenshots a:hover { border-color: #AAA }\
#full_description { padding: 8px; float: none }\
body h3 { border-bottom: none }\
.postactions { float: right }\
\
#activity + h6 { display: none }\
#___plusone_0 { position: absolute; top: -9999px }\
#script_sidebar > a { display: none }\
#script_sidebar > a > img { height: 20px }\
#topics th, #topics td { padding: 3px }\
#topics a { white-space: nowrap; overflow: hidden; text-overflow: ellipse }\
\
#script_submit { width: 80px !important; float: right }\
#group_id { width: 120px; margin: 2px }\
\
#script_src { font-family: monospace }
';

    var el = document.createElement('style');
    el.setAttribute('type','text/css');
    el.setAttribute('media','screen, projection');
    el.innerHTML = styleRaw;
    document.head.appendChild(el);

})();