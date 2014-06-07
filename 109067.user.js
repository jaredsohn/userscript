// ==UserScript==
// @id             TagDisplay
// @name           Minecraftforum.net Tag Display
// @namespace      red-sheep
// @author         flying sheep
// @description    Changes the Display of [] Tags
// @include        http://www.minecraftforum.net/forum/*
// ==/UserScript==

/**
 * Tokenizer/jQuery.Tokenizer
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 2/29/2008
 *
 * @projectDescription JS Class to generate tokens from strings.
 * http://flesler.blogspot.com/2008/03/string-tokenizer-for-javascript.html
 *
 * @author Ariel Flesler
 * @version 1.0.1
 */
;(function(){var T=function(a,b){if(!(this instanceof T))return new T(a,onEnd,onFound);this.tokenizers=a.splice?a:[a];if(b)this.doBuild=b};T.prototype={parse:function(a){this.src=a;this.ended=0;this.tokens=[];do this.next();while(!this.ended);return this.tokens},build:function(a,b){if(a)this.tokens.push(!this.doBuild?a:this.doBuild(a,!!b,this.tkn))},next:function(){var b=this,c;b.findMin();c=b.src.slice(0,b.min);b.build(c,0);b.src=b.src.slice(b.min).replace(b.tkn,function(a){b.build(a,1);return''});if(!b.src)b.ended=1},findMin:function(){var a=this,i=0,b,c;a.min=-1;a.tkn='';while((b=a.tokenizers[i++])!==undefined){c=a.src[b.test?'search':'indexOf'](b);if(c!=-1&&(a.min==-1||c<a.min)){a.tkn=b;a.min=c}}if(a.min==-1)a.min=a.src.length}};if(window.jQuery){jQuery.tokenizer=T;T.fn=T.prototype}else window.Tokenizer=T})();

function tagify(matchedtxt, istoken, re) {
	if (istoken) {
		var tag = document.createElement("span");
		tag.setAttribute("class", "topic_prefix");
		
		var contents = re.exec(matchedtxt)[1];
		tag.textContent = contents.replace(/(\d+)[x×](\d+)?/ig,"$1×");
		
		return tag;
	} else return document.createTextNode(matchedtxt);
}

unsafeWindow.$A(document.getElementsByClassName("topic_title")).forEach(function(title) {
	var tagifier = new Tokenizer([
		/\s?\[([^\]]+)\]\s?/
	], tagify);
	
	var tokens = tagifier.parse(title.innerHTML);
	
	title.innerHTML = "";
	tokens.forEach(function(token) {
		title.appendChild(token);
		title.appendChild(document.createTextNode(" "));
	});
});