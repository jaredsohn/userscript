// ==UserScript==
// @name          Forum Enhancer
// @version       0.1.7.1
// @description   Threads Preview + Ads Remove + Youtube Preview + More...
// @namespace     http://userscripts.org/scripts/show/72031
// @include       */forumdisplay.php?*
// @include       */viewthread.php?*
// @include       */showthread.php?*
// @include       */forum-*-*.html
// @include       */thread-*-*-*.html
// @include       *.discuss.com.hk/*
// @include       *.uwants.com/*
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/hk/
// ==/UserScript==

var GM_JQ = document.createElement('script');GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);function GM_wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { jQ = unsafeWindow.jQuery.noConflict(true); letsJQuery(); }}GM_wait();function letsJQuery() {

(function($){
// Default Setting
var preAreaCss={'background':'#F5F5F5','padding':'2em 1em 1em','overflow':'hidden','border-right':'12px solid #F5F5F5','position':'fixed','width':'50%','height':'50%','z-index':'20','top':'0','left':'0'};
var previewLinkCss={'cursor':'pointer','margin':'0 .5em 0 0','padding':'.5em'};
var printableCSS={'background':'#FFF','margin':'0','padding':'0 0 1em 1em','min-width':'0','text-align':'left'}
var frameHide={'width':'0','height':'0','left':'50%','padding':'1.1em','border-right':'8px solid #F5F5F5'}
var loadingGif="<img src='data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6%2BvhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2Fh1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh%2FhVNYWRlIGJ5IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAABXcgIAICCSHlqAJEQgjHQZCrSByJ4MjCrBKzwWGwA6ZEgsIQ5kAgXrYUQelY%2BJBQpEDxuCJVg4KzUSMJzuFCgVw7n80LwzGqEgwYBW%2FPOjIkGnYDQAQKJHwsMwQPCwoNBIJfIwIIBgANZASANQQGM5ciC3M1CwtlIQAh%2BQQJCgAAACwAAAAAEAAQAAAFdiAgAgJpQGU5jkRBCMlBEIyyisTxwA4RL6sZYHBoJBiNQ2ElQCAFjMfpcEipCAidELB4vUYCgcJ1U4kUEIMBeCOFBQ0EBMIuv92EhlkUZo4RBEwCXyIDBQpwCjNCg1eBBBAEC4hdfEwGDVw2knt8epo4nTdbNyEAIfkECQoAAAAsAAAAABAAEAAABXggIAIC2QxlOY4ERAhFIgiPsoqEg8AyciyrF6BxUMQUhwKAABQYarTCYPA4EAYH6xLCQBAIOGIWSBIsICrR4jAYLaYN8G1GVxju5Dm9TFCkRTMrAgoQKIICQiINBgtmjXuIKkJXXy%2BJfwINQF8kiYJ%2BS3KBN0FyNyEAIfkECQoAAAAsAAAAABAAEAAABXYgIAIC2TRlOY6EIQhI8SLLKhKPGwvQUY8vQIOxiC0OEBKBNIAQBAXDqXAQNA6MUiv3vC0SB5%2FotXCtCMinYNFQKJY2CIPhoJ0a8FUv%2FCAJCAsqLASEKQQDKCsvXSJsT4UvhipBa5F%2Fk4oLS5SMil1BfjY2oDYhACH5BAkKAAAALAAAAAAQABAAAAVsICACAmkYZTmOBCIIx%2FEeyyoShxsLDL2%2BAAMt1jgwSAQSgrGAPU47oQzQyhFUhEXs0BC9Fq4V7nEVEBropO2xZZ4M6lVvSzJfV1ry3YxWibQxamdXBGVAdHVILy93YD%2BFiWZ%2BI5KJljaUkyMhACH5BAkKAAAALAAAAAAQABAAAAV%2BICACArksZTmOgiIIg%2FEaxCoKhjsMcFKzJQKEsCMwBqSaYKEgwBonw2OZKKQWA5RKQEAcHr8XwbUSFBovMcFpAzQQiMJgvVatGokEA0LivlYEDw11fYQiYwcHBWFOaS8MB10HDCkpjS0HCABMZWx%2FCQcLbWl9AAQHDW1lWyshACH5BAkKAAAALAAAAAAQABAAAAV5ICACAkkQZTmOwiIITfM2xCrCqCI3Rc2WhIFARygoTCbUcHFqQFqFp4n5uhEgDITvJUCtBBAFd6xaKSAQhHBsAygKj4eB1K2OCAhx9XUqExYHB1ImYwYQCQdgBw8pKSgMBwMHc39fSpAEiD5fXA4HJw5HbTcIjCQrIQAh%2BQQJCgAAACwAAAAAEAAQAAAFdyAgAgJJEGU5jgIqLIsgKMQqvij8QjVbEjEYAbIgpVqy00lhaCEGR5eqZXgYerLsSjCIZb82wMJAVnxVqwUE8TS6tkRtsoUlJA7Nm%2BtwGAwKCVwHBUcAA3gJCQ19AEArBHwEDAwCDwc9KwoHMZMtCUVhNQJsKSshACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieJ0GcS6mSr%2BDajSyitv0OBJOJRVwobIOcqSY7NSCN4BA1EkSJxBmAMOgeszOCYawwLRKLFZC1LRwO0R2hwBiUBI7Dg3BINBQQBVYJECUNaQMHAw8PCnBbUiJ8CQKMAggOkSMKmQIJDzYFaVp3Y3cqIQAh%2BQQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSonixLlCr5tsQCi6gwnwthmjvXi9CwAVk4gWJgNOlupB4LwqhCYgCCYrt4HL4FLLHB1BEZvpGgscsWvs0T5NEoCRIHyL2wHSAECwgGJQo%2BAwcNCAULDAoyKgQHDwKKAgYPaSoLCS8FBToQmSskAwN2KiEAIfkECQoAAAAsAAAAABAAEAAABXUgIAICKZzkqJ5sW6ok4QqyShBxW6PCcQwzmWBRW%2FgONROB%2BDoZDoqV8ARJWCEwwHJBRDgYDEN2q5DJFAXcSFBmaRG%2B5GkAUZQEj4NBUEBwGxBDBg0lRAANUAYQBA9RNDYMBQKKAg1pY2kCEAhOajB3DYQpIyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqC4Mcb6oCixHAguuShAAciivHEqQOAwIh0Pw5CoRioeGQrQsmRqOheomGDwKhYGMtNsZEmixDFd%2BLRC8kWDRLAkMh5b1pBgs7D4DAhAGOwoNOFJOPCwLA4UQPDFUDxBdBgIKmGMEkZcnDXFrJApAKSMhADsAAAAAAAAAAAA%3D'/>";
var previewPNG="<a class='preview'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVDjLjZNJS8NAGIarv0PBuzcV/4MHwYMHL/4CPQsexYvoSW2RioiguJ9cigtFKhpxqVtBXGqtVRO62TbJNFMb%2BzpfNKJVMQMPCWTeZ%2BYdMi4ALjGqBPWCxn%2BoEVRSxsb1IajnnGeLxeKraZr4DfEdbrd7sFxiCxoprOs6GGOf5HI5ZDIZxONxS6IoCjwezzcJjQoS0ATDMFAoFKwnoWkastksEomEJcjn86BFvF6vJfkhoLANCSigqiqSyeSPSh9nUvFNIGp8TqB36m1XSaVS1k5kWf5bUM5XCe2EziOdTjsXmGYRgVAMi9I1JrbuMbPzBF/wAS8F5kywfX6PlWAcNwrDXYpj/1bF2mkS/pOYM8G8JOPiUcNBNA8pwrArCMkcs9vR/wXUf9wfRTjBId3q2Anr8F9qCMY4pgKPzgSzovPFE0Pg%2Bj1MHD1wjPqunFUIhBTsh1Uci9Be1MChWH35TIN3cgl97XU95YJSueBZ4zi8ecaCOIu5XRljm3cYmfQhtDYGabidTXfWttl3oUH8fUyE/rxMNpGD1dLReEcpsj4EX28TswXVJHFwnS26mqu6NwdajY3%2BFrwBN5GpoomTEloAAAAASUVORK5CYII%3D'/></a>";
var loadedPNG="<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ%2BroKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be%2B9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L%2Bzg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg%2BlEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z%2BqM2uCJmuMJmaNZaUrCSIi6X%2BjJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC'/>";
var toggleIMG="<img id='toggleIMG' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFR1ZSA2IE5vdiAyMDA3IDExOjIzOjQ4IC0wMDAwjXnldAAAAAd0SU1FB9cLBgseIHIuGAwAAAAJcEhZcwAAHsEAAB7BAcNpVFMAAAAEZ0FNQQAAsY8L%2FGEFAAABVElEQVR42o2Ty0rDQBSG%2F1wqJhSL0jRd9A2q1a1P4E7whjRWXCi%2BlwsphRKFgvQJrG50YUVxlUrVlIq2RbQ2yYwz0ZQuhMxAYM7J%2FN%2B5zUgQXIdnJUoIBSEEJKChj%2B9VUQATZxWo7lKmAEmSQl%2BjdQ5ZGBCQTrR%2FHXXHGQgDEsoUXUj%2FRk%2FJs%2FB8H0EgUMJBzTJZ%2Bg%2BmZmIw7ENPJHH5eBFlFQ8ICL3NJXMzhp6B897CTb%2BJctGWov%2BxJbAojaH3DefNwXP%2F6WRSLLx2Khv1YnndFhbs2dv2bnWrLnJW%2Fk%2BcnjbW2LfCotZiAfs1i06IKRebehaKpPL6l%2BMAKh8FF3IjPzeP3lcPnQ8X7V57wC5KPhbgeT4KxmJoUIbRVB0tNq5K6TQl3AMudD9djPwR7rt3OLaqwqMaN9HUsmPn5tGqKQpQ%2BdO8frkKDd6PvyfrMlMoix8BnZ1tgdpdiwAAAABJRU5ErkJggg%3D%3D'/>";

function setPreviewIcon(){
var l=$("span[id^='thread'] a");
if(l.length==0){l=$("a[id^='thread_title']");};
if(l.length==0){l=$("td>a[href^='viewthread.php']:not(':has('img')')");};
$(l).each(function(index){
$(previewPNG).css(previewLinkCss).insertBefore(this);});
$(".preview").live("click", function(event) {
if (event.button != 0) {return true;}var tLink=$(this).next().attr('href');tLink=(tLink.length!=0)?tLink:this.href;previewLink(tLink,$(this));return false;});
}

function previewLink(targetLink,e){
var tTitle=$(e).next().text()

var pLink=(targetLink.indexOf('tid')==-1&&targetLink.indexOf('thread')==-1)?"printthread.php?t=":"viewthread.php?action=printable&tid=";
pLink+=targetLink.match("\\d+");

var tLink=(preMode)?targetLink.match("\\w+.\\w{3}[?]\\w+=\\d+"):pLink;
if(targetLink.indexOf('showthread.php')==-1){tLink=(preMode)?targetLink:pLink;};

$(e).html(loadingGif);
$("#preArea").hide();
$("#preFrame").attr('src',tLink).hide().load(function(){
$("#preTitle").html(tTitle);printableFix();previewVideo();
if(preMode)PreviewCleanUp();
$(e).html(loadedPNG);
$(this).parent().css(preAreaCss).andSelf().css("display","block");
});}

function printableFix(){
var t=$('#preFrame').contents().find("body");
$(t).css(printableCSS);
$(t).find("img").each(function(){if(this.file!=''){$(this).attr('src',function() {return $(this).attr('file');});}})
resizeFrame();
}

function resizeFrame(){
var t = $('#preFrame').contents().find("body");var w = $('#preArea').width();var f=(oddSties)?w:w+32;var b=(oddSties)?w-47:w-12;
if ($(t).height() > 3000) {
w = w - 24;	f=(oddSties)?w:w+32; b=(oddSties)?w-47:w-12;
$("#preFrame").width(f);$(t).width(b);
}else{$("#preFrame").width(f);$(t).width(b);}
}

function previewVideo(){
youtubeLink=$("#preFrame").contents().find("a[href*='youtube.com']");
if(!youtubeLink.length){youtubeLink=$("a[href*='youtube.com']");}
if(!youtubeLink)return;
$(youtubeLink).each(function(){
var vid=this.href.replace("http://www.youtube.com/watch?v=","");
$(this).replaceWith("<object type='application/x-shockwave-flash' style='width:560px; height:340px;' data='http://www.youtube.com/v/" + vid + "?fs=1'><param name='movie' value='http://www.youtube.com/v/" + vid + "?fs=1' /><param name='allowfullscreen' value='true'/></object>");
});}

function PreviewCleanUp(){
var a="";var t=$("#preFrame").contents();
if($(t).find("div.page").length!=0){var b=$(t).find("div.page table:eq(0)").html();b=b+$(t).find("#posts").children().html();$(t).find("body").html(b);}
else{if($(t).find("#nav").length){a=$(t).find("#nav").html();}a+=$(t).find("div.wrap:has('h1')").html();
if(!a)return;setTimeout(function() {$(t).find("body").html(a)},0);
$(t).find("table[id^='pid']").each(function (i) {
var e=$(this).find('td.postcontent>div.postinfo');
$(this).find(".postactions").css('border-bottom','2px dashed #E6E7E1').end().find(".postauthor a[href*='space.php?uid=']:eq(0)").prependTo(e);
}).find("td.postauthor").hide();$(t).find("td.modaction").hide();}};

function adRemove(){
var selector=["a","div","embed","iframe","table"];
var attribute=["id","class","src","href"];
var adSrc=["i1.hk","scupio.com","ads","overture","promo","adv","banner","ad_","zedo.com","/aeiou/","zanox","pixelinteractivemedia",".com/ads/","/adviewer.","/houseads/*"];
$.each(selector, function(i, select) {
$.each(attribute, function(i, attr) {
$.each(adSrc, function(i, src){
$(select+"["+attr+"*='"+src+"']").not("table[id^='thread']").not("a:parent('[href*='thread']')").not("#secanswer_menu").remove();});});});
$("img[src*='ads']").remove();
$("a[href*='systematic']").parentsUntil("table").remove();
}

function isPage(A) {return new RegExp("^" + A.replace(/(\?\.\(\))/g, "\\$1").replace(/\*/g, ".*"), "i").test(window.location.href);}

var agent = -1,FIREFOX = 1,CHROME = 2;
if (!window.chrome && GM_getValue) {agent = FIREFOX} else if (window.chrome && chrome.extension) {agent = CHROME};
function saveVar(name, value) {if (agent == FIREFOX) {window.setTimeout(function() { GM_setValue(name, value)},0);} else if (agent == CHROME) {localStorage.setItem(name, value)}};
function getVar(name,d) {if (agent == FIREFOX) {return GM_getValue(name,d);} else if (agent == CHROME) {localStorage.getItem(name)}};

var preMode;setInterval(function(){preMode=getVar("preMode",0);$("#previewMode").attr("checked",preMode);},3000);

function init(){
$("<div id='preArea'></div>").css(preAreaCss).hide().prependTo('body').prepend(toggleIMG).prepend("<input type='checkbox' id='previewMode'/>");
$("<iframe id='preFrame'></iframe>").attr({height:'100%',width:'100%',scrolling:'yes'}).css('border','0 none').prependTo('#preArea');
$("#toggleIMG").css({'position':'absolute','right':'0','top':'3px'}).toggle(function() {$("#preArea").css(frameHide).children().not("#toggleIMG").hide();}, function() {$("#preArea").css(preAreaCss).children().show();});var mode=(preMode)?1:0;
$("#previewMode").attr("checked",mode).css({'position':'absolute','top':'0','right':'19px'}).click(function(){
if(preMode){saveVar("preMode",0);}else{saveVar("preMode",1);}});
$("<h2 id='preTitle'></h2>").prependTo("#preArea").css({'position':'absolute','top':'3px','margin':'0','padding':'0','font-size':'1.1em'});
}

function testOdd(){
a=$("span[id^='thread'] a").add("a[id^='thread_title']");
if(l.length!=0)return true;}

var oddSties=(isPage("*uwants.com/*") || isPage("*discuss.com.hk/*"));

$(document).ready(function() {
if(isPage("*uwants.com/*")||isPage("*discuss.com.hk/*")){unsafeWindow.getComputedStyle=function(){return false;};unsafeWindow.unsupport_msg='';
$("#mainbody a[href*='zanox']").parentsUntil("tr").remove();$("td[onclick*='scupio']").parentsUntil("div").remove()}
$(window).resize(function() {resizeFrame();});
if(isPage("*thread*")){adRemove();previewVideo();}else if(isPage("*/forum*php*")||testOdd){init();adRemove();setPreviewIcon();}}
);})(jQ);
    }