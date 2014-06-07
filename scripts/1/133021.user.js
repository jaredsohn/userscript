// ==UserScript==
// @name        Float Menu
// @namespace   http://www.webmonkey.com
// @description A floating menu for Mozilla Developer Network

// @version     v2.0
//@author      Jithil P Ponnan
//@include      https://developer.mozilla.org/*
// ==/UserScript==

var _A__Obj_aRRay_Lis_t_er = document.getElementById('article-nav');
            _A__Obj_aRRay_Lis_t_er.removeAttribute('class');
            _A__Obj_aRRay_Lis_t_er.setAttribute('style', 'position:fixed;top:85px;right:10px;overflow:scroll');
            var _mainConClassObjs = document.getElementsByTagName('div');
            document.getElementById('content-main').style.width = '82%';
