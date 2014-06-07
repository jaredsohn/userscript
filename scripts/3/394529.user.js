// ==UserScript==
// @name        SO - Code line nums
// @namespace   http://mdev.me/
// @description Show line numbers next to code in question
// @include     http://*stackoverflow.com/questions/*
// @version     5
// @grant       none
// ==/UserScript==

var styles = document.createElement('link');
styles.rel = 'stylesheet';
styles.type = 'text/css';
styles.href = 'http://mdev.me/SOcln.css';
document.querySelector('head').appendChild(styles);

var initLines = function() {
	var codeBlocks = N('body').findAll('#question pre, .answer pre, .wmd-preview pre');
	O(codeBlocks).loop(function(n){
		n = N(n);
		if(n.hasClass('mdevLinesEnabled') || n.hasClass('mdevLinesDisabled'))
		{
			n.removeClass('mdevLinesEnabled');n.removeClass('mdevLinesDisabled');
			N(n.find('.mdevLineBox')).remove();
			N(n.find('.mdevLinesToggle')).remove();
			n.n.style.paddingLeft = '';
		}
		n.n.style.position = 'relative';
		var codeEl = n.find("code");
		if(!codeEl) return;
		var codeH = codeEl.offsetHeight;
		var span = N(codeEl).find("span");
		var spanH = 17;
		var lineNoOffset = 1;
		if(span)
		{
			spanH = span.offsetHeight;
			if(N(span).find('span')) span = N(span).find('span');
			var m = null
			if(m = span.innerHTML.match(/^#Line:(\d+)/))
			{
				lineNoOffset = D(m[1]).toInt();
			}
		}
		else
		{
			spanH = parseInt(N(codeEl).getCompStyle('lineHeight'));
			if(m = codeEl.innerHTML.match(/^#Line:(\d+)/))
			{
				lineNoOffset = D(m[1]).toInt();
			}
		}
        var firstSpan = N(codeEl).find("span");
        var lastSpan = N(codeEl).findAll("span");
        lastSpan = lastSpan[lastSpan.length-1];
		var lines = Math.floor(codeH/spanH);
        if(firstSpan.innerHTML.match(/^\s*\r?\n\s*$/)) lines++;
        if(lastSpan.innerHTML.match(/^\s*\r?\n\s*$/)) lines++;
		if(lines>5)
		{
			n.addClass('mdevLinesEnabled');
			var lineBox = document.createElement('div');
			lineBox.className = 'mdevLineBox';
			lineBox.style.visibility = 'hidden';
			var lineNosAdded = 0;
			while(lineNosAdded<lines && lineNosAdded<200)
			{
				var lineNo = document.createElement('span');
				lineNo.className = 'mdevLineNo';
				lineNo.innerHTML = lineNosAdded+lineNoOffset;
				lineBox.appendChild(lineNo);
				lineNosAdded++;
			}
			n.n.appendChild(lineBox);
			var linesToggle = document.createElement('div');
			linesToggle.className = 'mdevLinesToggle';
			linesToggle.innerHTML = '#L';
			linesToggle.style.cursor = 'pointer';
			n.n.appendChild(linesToggle);
			disableSelection(linesToggle);
			addEvent(linesToggle,'click',function(e){
				var toggleLines = function(showHide){
					var pre = N(this).parent();
					var box = N(this).prev('div','mdevLineBox');
					var show = df(showHide,'string')&&showHide=='show';
					var hide = df(showHide,'string')&&showHide=='hide';
					var override = show||hide;
					show = (override&&show) || (!override&&N(box).getCompStyle('visibility')!='visible');
					hide = (override&&hide) || (!override&&N(box).getCompStyle('visibility')=='visible');
					if(show)
					{
						pre.style.paddingLeft = box.offsetWidth+10+"px";
						box.style.visibility = 'visible';
					}
					else if(hide)
					{
						pre.style.paddingLeft = "5px";
						box.style.visibility = 'hidden';
					}
				}
				var disable = function() {
					var pre = N(this).parent();
					toggleLines.call(this,'hide');
					N(pre).removeClass('mdevLinesEnabled');
					N(pre).addClass('mdevLinesDisabled');
				}
				if(e.shiftKey)
				{
					var show = N(N(this).prev('div','mdevLineBox')).getCompStyle('visibility')!='visible';
					O(N('#question').findAll('pre.mdevLinesEnabled')).loop(function(pre) {
						var that = N(pre).find('.mdevLinesToggle');
						if(e.ctrlKey) disable.call(that);
						else toggleLines.call(that,show?'show':'hide');
					})
				}
				else if(e.ctrlKey)
				{
					disable.call(this);
				}
				else toggleLines.call(this);
			})
		}
	});
}
var initScript = function() {
	addEvent(window,'load',function() {
		initLines();
	})
}
function disableSelection(target)
{
	if (typeof target.onselectstart!="undefined")
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined")
		target.style.MozUserSelect="none"
	else
		target.onmousedown=function(){return false}
	target.style.cursor = "default"
}
var scriptTag = document.createElement('script');
scriptTag.type = 'text/javascript';
scriptTag.src = 'http://mdev.me/prot.min.js';
scriptTag.onreadystatechange=function(){if(this.readyState=='complete')initScript();}
scriptTag.onload = initScript;
document.body.appendChild(scriptTag);
window.initLines = initLines;