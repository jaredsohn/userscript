// ==UserScript==
// @name           Imageshack Direct Linker
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Converts imageshack "show" links to direct image links
// @include        *
// @exclude        http://*imageshack.us/*
// ==/UserScript==

//--------------------------------------
// Code snippets
//--------------------------------------

// Source of code snippet:
//   http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

// Source of code snippet:
//   http://simonwillison.net/2006/Jan/20/escape/
RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}

//--------------------------------------
// Script starts here
//--------------------------------------

function replaceText(pattern,replacement)
{
   var xPathResult = document.evaluate(
      './/text()[normalize-space(.) != ""]',
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
   for (var i = 0, l = xPathResult.snapshotLength; i < l; i++)
   {
      var textNode = xPathResult.snapshotItem(i);
      textNode.data = textNode.data.replace(pattern, replacement);
   }
}

function replaceLinks(pattern,replacement)
{
   var xPathResult = document.evaluate(
      './/a[@href]',
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
   for (var i = 0, l = xPathResult.snapshotLength; i < l; i++)
   {
      var link = xPathResult.snapshotItem(i);
      link.href = link.href.replace(pattern, replacement);
   }
}


function doLinks()
{
   var crapLinks = document.body.innerHTML.match(/http:\/\/img[0-9]+\.imageshack\.us\/my\.php\?image=[a-zA-Z0-9\.]*/g);
   if(crapLinks)
   {
      crapLinks = crapLinks.unique();
      for(var i=0;i<crapLinks.length; i++)
      {
         GM_xmlhttpRequest({
            method: "GET",
            url: crapLinks[i],
            onload: function(response)
               {
                  var crapLink = response.responseText.match(/http:\/\/img[0-9]+\.imageshack\.us\/my\.php\?image=[a-zA-Z0-9\.]*/)[0];
                  var goodLink = response.responseText.match(/http:\/\/img[0-9]+\.imageshack\.us\/img[0-9]+\/[0-9]+\/[a-zA-Z0-9\.]*/)[0];
                  var reg = new RegExp(RegExp.escape(crapLink),"g");
                  replaceText(reg,goodLink);
                  replaceLinks(reg,goodLink);
               }
            });
      }
   }
}

doLinks();
GM_registerMenuCommand("Imageshack Direct Linker: Try again",doLinks);