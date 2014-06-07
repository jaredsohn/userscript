// ==UserScript==
// @name           Anti ADS
// @namespace      anti_ads
// @include        http://*
// @version        0.0.1 aplha
// ==/UserScript==

var hosts=new Array();
var nhosts=0;
var pages=new Array();
var npages=0;
var host=window.location.host;
var page=window.location.href;
var badimg='data:image/gif;base64,R0lGODlhDAAMAMQQAMwzM88%2FP%2Fzy8tllZfXZ2fnl5fLMzOyystJMTO%2B%2Fv%2BmlpdVZWdxycuWZmeKMjN9%2Ff%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAMAAwAQAVJIAQViiCKx0CICQAciLuYJ%2BMCwSoWw60UMtqp5zKcBAHAICFyABC6Q3KAilFFDVegFxCKkC7GaZxN4oSEJAJiuAEKiYdxbKCFAAA7';

// end of vars starting functions

function strtolower(str) {return str.toLowerCase();}
function addHost(str){hosts[nhosts]=strtolower(str); nhosts++;}
function addPage(str){pages[npages]=strtolower(str); npages++;}
function in_array(needle, haystack, strict) {var found = false, key, strict = !!strict;for (key in haystack) {if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {found = true;break;}}return found;}


// starting listing servers
addHost('srv.etology.com');
addHost('rt.globalmailer3.com');
addHost('upload.xhamster.com');
addHost('pcash.imlive.com');
addHost('www.comprabanner.it');
addHost('cm.it.overture.com');
addHost('ad.yieldmanager.com');
addHost('pagead2.googlesyndication.com');
addHost('www.sky.it');
addHost('www.login-x.com');
addHost('aed.roiagencie.com');
addHost('ad.altervista.org');
addHost('ads.adbrite.com');
addHost('rt.globalmailer.com');

// Pages
addPage('http://www.imageshack.us/yieldmanager.php');
addPage('http://www.imageshack.us/ymlowmedrec.php');
addPage('http://imageshack.us/yieldmanager.php');
addPage('http://imageshack.us/ymlowmedrec.php');


// starting the engime
if(in_array(host, hosts)){
document.body.innerHTML='<img src="'+badimg+'" alt="" /> <b> Blocked by M-Anti ADS</b> Copyright &copy; <i>Mattia Manzati</i>';
}

if(in_array(page, pages)){
document.body.innerHTML='<img src="'+badimg+'" alt="" /> <b> Blocked by M-Anti ADS</b> Copyright &copy; <i>Mattia Manzati</i>';
}

