// ==UserScript==
// @name	V2EX回复@助手
// @namespace	http://lmbj.net
// @description V2EX回复@助手 输入@即可自动提示可以回复的ID，方向键可以选择，回车即完成输入
// @include     http://www.v2ex.com/t/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require	http://jquery-sew.s3-website-us-east-1.amazonaws.com/jquery.sew.js
// @require	http://jquery-sew.s3-website-us-east-1.amazonaws.com/jquery.caretposition.js
// @updateURL	https://userscripts.org/scripts/source/178530.meta.js
// @downloadURL	https://userscripts.org/scripts/source/178530.user.js
// @version	0.1
// ==/UserScript==

//alert(data.length);
//values = [{val:'santiagotactivos', meta:'Santiago Montero'}];
function unique(arr) {
    var ret,hash,i,item,key;
    ret = [];
    hash = {};
    
    for (i = 0; i < arr.length; i++) {
        item = arr[i];
        key = typeof(item) + item.val;
        if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
        }
    }
    
    return ret;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var style ="body {font: 13px Helvetica, arial, freesans, clean, sans-serif;line-height: 1.4;color: #333;}.-sew-list-container {background: white;border: 1px solid #DDD;border-radius: 3px;box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);	min-width: 180px;}.-sew-list {list-style: none;margin: 0;padding: 0;}.-sew-list-item {display: block;	padding: 5px 10px;border-bottom: 1px solid #DDD;}.-sew-list-item small{color:#afafaf;}.-sew-list-item.selected {	color: white;background: #4183C4;	text-decoration: none;}";

$(document).ready(function() {
    var elist,data,i,temp,customItemTemplate,values;
    elist = document.getElementsByClassName("dark");
    data = [];
    for(i=0;i<elist.length;i++){
        if(elist[i].href.indexOf("member")!=-1){
            temp ={val:elist[i].innerText, meta:elist[i].innerText};
            data.push(temp);
        }
    } 
    
    customItemTemplate = "<div><span/></div>";
    
    function elementFactory(element, e) {
        var template = $(customItemTemplate).find('span')
        .text('@' + e.val).end();
        element.append(template);
    }
    values = unique(data);
    // here is how we use it
    $('textarea').sew({values: values, elementFactory: elementFactory});
    addGlobalStyle(style);
});