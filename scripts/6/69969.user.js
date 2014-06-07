// ==UserScript==
// @name                Word Count for LV / Gutenberg
// @namespace	        http://www.gutenberg.org/
// @description	        Simple word counter for Gutenberg HTML books
// @include		http://www.gutenberg.org/files/*
// ==/UserScript==

function wordCount(textParam){
  var wc = 0;
  textParam = textParam.replace(/^\s*|\s*$/g,'');
  if (textParam) { wc = textParam.split(/\s+/).length; }
  return wc;
}

function getTarget()
{
  var tgt = prompt("Please enter the target number of words to count", "20000");
  if ((tgt==null) || (tgt=="")) { tgt = 0; }
  return (tgt);
}

function showParaCount(o, tc, pc)
{
  o.append("<span class='wcpg' style='background: #ff0'> (paragraph " + pc.toString() + " words, running total " + tc.toString() + " words)</span>");
}

function clearAll()
{
  $("p").css("border", "none");
  $("span.wcpg").remove();
}

function scrollGo(o) 
{
  var x = o.offset().top - 100; // 100 provides buffer in viewport
  $('html,body').animate({scrollTop: x}, 500);
}

function countToTarget(opara, wctarget, stoponhead)
{
  var txt = '', pcount = 0, count = 0, tagname = '', prevpara = null, n = 0;
  while (opara && (count < wctarget) && (n < 1000))
  {
    opara.css("border", "1px solid #f00"); 
    txt = opara.text();
    pcount = wordCount(txt);
    count += pcount;
    showParaCount(opara, count, pcount);
    prevpara = opara;
    opara = opara.next();
    if (stoponhead && opara.is("h1,h2,h3,h4,h5,h6,pre,div")) { opara = null; }
    n++;
  }
  scrollGo(opara || prevpara);
}

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
       $("p").click(function () { 
	var countTarget = 0;
	clearAll();
	countTarget = getTarget();
	if (countTarget) { countToTarget($(this), countTarget, true); }
      });
      alert("click the paragraph where you want to start the count!");
    }
