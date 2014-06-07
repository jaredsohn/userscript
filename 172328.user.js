// ==UserScript==
// @name       		Tumblr Smaller Text
// @namespace  		http://alphasour.tumblr.com/
// @version    		0.4
// @description  	Shrinks or Resets text in any TinyMCE area
// @include     	*://*.tumblr.com/*
// @copyright  		2013+, Allyson Moisan
// ==/UserScript==

var btnUp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAAGj9fUKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcNJREFUeNpi/P//PwMyYAIRvTMWKMBFQCpAuGf6/P8gmhFdC0AAYQgwAfU7oIggmVGP1QyAAMIQQAdM6AJAO+YD8X+sCoAS9UAK5IkDMEUErQAIINLdgFUBsqNwmXAAyaH/cVoB8mJxRgIjsiIUR0IlQKYpABUqUscXAAFE0ASiggHJjQIUGQAE67EpAhq8H4jXk+VHaMg9AOIAIPs+SQZANX+AGtAACn4MQ2BJHh2DshEQv8chvh/GpzgWAAKIIgOYqBb/A6MZGB3vgfg8Sbqh0SCAFCUCaFE0HzmKkDHB0EbKxA9geZXY1DYfykyElmkkBVgCqIQA2rgAath9ojQj2XoAWppeQLediYCtoAziAMUfYFkWpoAFh60gmxiAzhXE4pqEIZ62AQKM4jw9YC4f0pbjSmoBQAqUrBSBye0DrSxHr7ALgJQ9EBdCLZ8IxPlA3Ah0xAGaWo5eeQItdCSingRlefT6MRFWntAszrFY/ABKg5p9CTSzHIvFhtDy+gOxDmCiksWOQIsvQNlEO4DkQgZHHBMCjtgSLEmWQ5uGIIsFCCUsHKFzgKxgx2JxA74UDZQDJT5DJKH96H2c0bJ9QAAAHytL4ubDLqIAAAAASUVORK5CYII=";
var btnDn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAAGj9fUKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUeNpi/P//PwMyYAIRvTMW7EcRAAIBoOB9EIMRXQtAADFiNQOrANCM/1i1AAQQhgA+I/ZjU4BhAsyu4owERqKsAAgg4t1AYwUgLwLxeSh7Pk5HQiUTSPImQTcABBBBE0j2JdCdBhQZAAT9lBrAgMVV/9GDF58BAuiaoUEeAGTXY6gGBSIu3DN9/n8gVkDjByCroTgWAAKIIgOYqBr/o5op1Awqe2HlGc54BipQAFLxQPwQiB8Ak+cBpILwARAvAIo14itOQGlcAKjoAVJRCxJzBOL3sCKGqBSGxbmJQAMWEPQzUGM/rECD2hgIxPOHQdoGCDCK8/SAuXx4W46rTTEa7JQAFmoYAoyaACClD+UuhJVNZPkc1A6BFnLo4g5YxEDtqvVA3ADF96ElLPn5HGp5P7TRdgFUtqH7COoYWIIElbz2UAd8AGJFoPoPNClkoK2081DuBCDeCGWDmjcO0DpFkeqWQ4P1PpS7ARoyyACUBgwIOYBky6HRcR9ayYFqx0Rc1S+QAjnyAFCN42jZPmgsBwAk7vjEBUfMOgAAAABJRU5ErkJggg==";
var insertionQ=function(){function f(t,n){var s,o="insQ_"+e++;var u=function(e){if(e.animationName===o||e[r]===o){if(!c(e.target)){n(e.target)}}};s=document.createElement("style");s.innerHTML="@keyframes "+o+" {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }"+"\n"+"@"+i+"keyframes "+o+" {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }"+"\n"+t+" { animation-duration: 0.001s; animation-name: "+o+"; "+i+"animation-duration: 0.001s; "+i+"animation-name: "+o+"; "+" } ";document.head.appendChild(s);setTimeout(function(){document.addEventListener("animationstart",u,false);document.addEventListener("MSAnimationStart",u,false);document.addEventListener("webkitAnimationStart",u,false)},20)}function l(e){e["-+-"]=true}function c(e){return t&&e["-+-"]===true}function h(e){if(c(e.parentNode)){return e}else{return h(e.parentNode)}}function p(e){l(e);e=e.firstChild;for(;e;e=e.nextSibling){if(e!==undefined&&e.nodeType===1){p(e)}}}function d(e,t){var n=[];var r=function(){var e;return function(){clearTimeout(e);e=setTimeout(function(){n.forEach(p);t(n);n=[]},10)}}();f(e,function(e){if(c(e)){return}l(e);var t=h(e);if(n.indexOf(t)<0){n.push(t)}r()})}var e=100,t,n=false,r="animationName",i="",s="Webkit Moz O ms Khtml".split(" "),o="",u=document.createElement("div");if(u.style.animationName){n=true}if(n===false){for(var a=0;a<s.length;a++){if(u.style[s[a]+"AnimationName"]!==undefined){o=s[a];r=o+"AnimationName";i="-"+o.toLowerCase()+"-";n=true;break}}}return function(e,r){if(n&&e.match(/[^{}]/)){t=r?false:true;if(t){p(document.body)}return{every:function(t){f(e,t)},summary:function(t){d(e,t)}}}else{return false}}}();

var gm_uwin = ( function() {
		var a;
		try {
			a = unsafeWindow == window ? false : unsafeWindow;
			// Chrome: window == unsafeWindow
		} catch(e) {
		}
		return a || ( function() {
				var el = document.createElement('p');
				el.setAttribute('onclick', 'return window;');
				return el.onclick();
			}());
	}());

var $ = gm_uwin.jQuery;

function shrinkPostText(m) {
	var post = $(m).contents().find('#tinymce');
	var markup = $('<body>').append(post.html());
		markup.find("div, p, li").each(function(i, e) {
        var t = $(e).children("sup, sub");
		if (t.length >= 1) {
			$(t).parent().each(function(j, l) {
				l.innerHTML = $(t).html();
			});
		}
		var s = $(e).children("small");
		if (s.length < 1) {
			$(e).wrapInner('<small />');
		}
	});
	post.html(markup.html());
}

function resetPostText(m) {
	var post = $(m).contents().find('#tinymce');
	var markup = $('<body>').append(post.html());
	markup.find("div, p, li").each(function(i, e) {
		var s = $(e).children("small, sup, sub");
		if (s.length >= 1) {
			$(s).parent().each(function(j, l) {
				l.innerHTML = $(s).html();
			});
		}
	});
	post.html(markup.html());
}

function insertButton(v) {
    if($($(v).parents("tr").get(0)).contents().find("a.mce_shrinktext").length == 0)
    {
        var td1 = document.createElement("td");
        $(td1).css("position", "relative");
        td1.innerHTML = '<a role="button" id="post_two_shrink" href="javascript:;" class="mceButton mceButtonEnabled mce_shrinktext" onmousedown="return false;" onclick="return false;" aria-labelledby="post_two_shrink_voice" title="Shrink Text" tabindex="-1"><span class="mceIcon mce_shrinktext"></span><span class="mceVoiceLabel mceIconOnly" style="display: none;" id="post_two_shrink_voice">Shrink Text</span></a>';
        $(td1).on("click", function() {
            var m = $(this).parents('table.mceLayout').contents().find('td.mceIframeContainer iframe');
            shrinkPostText(m);
        });
        $(td1).insertAfter($(v).parent());
        var td2 = document.createElement("td");
        $(td2).css("position", "relative");
        td2.innerHTML = '<a role="button" id="post_two_reset" href="javascript:;" class="mceButton mceButtonEnabled mce_resettext" onmousedown="return false;" onclick="return false;" aria-labelledby="post_two_reset_voice" title="Reset Text" tabindex="-1"><span class="mceIcon mce_resettext"></span><span class="mceVoiceLabel mceIconOnly" style="display: none;" id="post_two_reset_voice">Reset Text</span></a>';
        $(td2).on("click", function() {
            var m = $(this).parents('table.mceLayout').contents().find('td.mceIframeContainer iframe');
            resetPostText(m);
        });
        $(td2).insertAfter($(v).parent());
    }
}


$(document).ready(function() {
    $("head").append('<style type="text/css">span.mce_shrinktext { background:url(\'' + btnDn + '\') !important; } span.mce_resettext { background:url(\'' + btnUp + '\') !important; }</style>');
	if ($('a.mce_blockquote').length > 0) {
		$('a.mce_blcokquote').each(function(i, v) {
			insertButton(v);
		});
	}
	insertionQ('a.mce_blockquote').every(function(v) {
		insertButton(v);
	});
});