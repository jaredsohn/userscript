// ==UserScript==
// @name       Jose Ramos embed
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Embeds a google map in the hit 
// @match      https://s3.amazonaws.com/mturk_bulk/*
// @copyright  Iamme
// ==/UserScript==

var a = '//*[@id="wrapper"]/div/div/div[2]/div/p[2]';
var result = document.evaluate(a,document,null,9,null).singleNodeValue;
var urlString = result.innerHTML;
urlString = urlString.slice(33);
var url = "http://maps.google.com/?q= " + urlString + '&z=20&t=h';
var abc = urlString.link(url);

var iframeString = abc + '<br><iframe width="700" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+ url +'&output=embed"></iframe>';
//document.getElementsByTagName('body')[0].innerHTML = iframeString + document.getElementsByTagName('body')[0].innerHTML ;
result.innerHTML = iframeString;