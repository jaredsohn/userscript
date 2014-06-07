// ==UserScript==
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @name           Japanese text magnifier
// @description    Increases the font size of Japanese characters on any webpage.  Note that any surrounding English text will also be magnified; I hope to change element in the future.
// @author         Josh1billion
// @include        http://*
// @include        https://*
// @version        1.2
// ==/UserScript==

var newFontSize = 26; // increase element to increase the magnification level, or decrease it to make the text smaller.

function isJapanese(str)
{
	return str.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf]/);
}

function processElement(element)
{
	if (isJapanese($(element).html()))
	{
		var fontSize = parseInt(($(element)).css('font-size'));
		if (fontSize < newFontSize)
			$(element).css('font-size', newFontSize + 'px');
		var lineHeight = parseInt(($(element)).css('line-height'));
		if (lineHeight < newFontSize)
		{
			lineHeight *= (newFontSize / fontSize)
			lineHeight = Math.ceil(lineHeight);
			$(element).css('line-height', lineHeight + 'px');
		}
	}
}

function replaceJapanese(str)
{
	if (str.indexOf("<span style='font-size: " + newFontSize + "px;'>") != -1)
		return str;
		
	var oldHTML = str;
	var newHTML = "";
	
	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i).match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf]/))
		{
			newHTML += "<span style='font-size: " + newFontSize + "px;'>" + str.charAt(i);
			while (str.charAt(i + 1).match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf]/))
			{
				newHTML += str.charAt(i + 1);
				i++;
			}
			newHTML += "</span>";
		}
		else
			newHTML += str.charAt(i);
	}
	
	return newHTML;
}

$("div").each(function()
{
	if (this.innerHTML.length > 2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});

$("span").each(function()
{
	if (this.innerHTML.length > 2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});

$("p").each(function()
{
	if (this.innerHTML.length >2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});

$("li").each(function()
{
	if (this.innerHTML.length >2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});

$("td").each(function()
{
	if (this.innerHTML.length >2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});

$("input").each(function()
{
	this.value = this.value.replace(/(<([^>]+)>)/ig,"");
	this.value = this.value.replace("<span style='font-size: " + newFontSize + "px;'>", "");
	this.value = this.value.replace("<span style='font-size: " + newFontSize + "px;'>", "");
});

$("em").each(function()
{
	if (this.innerHTML.length >2000)
		return;
		
	if (isJapanese(this.innerHTML))
	{
		$(this).html(replaceJapanese($(this).html()));
		$(this).css('line-height',  Math.ceil(newFontSize * 1.2) + 'px');
	}
});