// ==UserScript==
// @name           Codeguru Inline Ads Remover
// @namespace      http://lars.werner.no
// @description    Removes inline commercials at codeguru.com and the forum
// @include        *.codeguru.com*
// ==/UserScript==

var isForum = (location.href.indexOf('/forum') != -1);
var isArticle = (location.href.indexOf('/article.php') != -1);
var isMain = (location.href=='http://codeguru.com') || (location.href=='http://www.codeguru.com') || (location.href=='http://codeguru.com/') || (location.href=='http://www.codeguru.com/');

//Gets the elements by it class
function getElementsByClass(searchClass, node, tag)
{
    var classElements = new Array();
    if (node === null) { node = document; }
    if (tag === null) { tag = '*'; }
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

//Hides the class we're looking for
function removeClass(searchClass, node, tag)
{
    var cElements = getElementsByClass(searchClass,node,tag);
    if (cElements.length > 0)
    {
        for (i = 0; i < cElements.length; i++)
        {
	    cElements[i].parentNode.style.display='none';

//Alternative to just remove that child
//            cElements[i].parentNode.removeChild(cElements[i]);
        }
    }

}

//Removes the inline commercial in an article
function removeInLine()
{
  if(document.body.innerHTML.match('<a href="#more">') )
  {
	//Get positions
	var first = document.body.innerHTML.search(/<a href="#more">/gi);
	var last = document.body.innerHTML.search(/<a name="more"/gi);
	var length = document.body.innerHTML.length;

	//Only show what we want to ;)
 	var text = document.body.innerHTML.substring(0, first);
	text = text + document.body.innerHTML.substring(last, length);
	document.body.innerHTML = text;
  }
}

//Removes the inline commercial in the article lists
function removeInLineList()
{
  if(document.body.innerHTML.match('<!--Bob Position-->') )
  {
	//Get positions
	var first = document.body.innerHTML.search(/<!--Bob Position-->/gi);
	var last = document.body.innerHTML.search(/<font class="sectionhead">/gi);
	var length = document.body.innerHTML.length;

	//Only show what we want to ;)
 	var text = document.body.innerHTML.substring(0, first);
	text = text + document.body.innerHTML.substring(last, length);
	document.body.innerHTML = text;
  }
}

////////////////////////////////////////////////////////
//Remove the silly adds who blocks 1/4 of your screen...
if (isForum)
{
  removeClass("clickhere", document, "span");
}
else
{
 if(!isMain)
 {
  //Remove the silly inline ads
  if(isArticle)
  {
    removeInLine();
  }
  else
  {
    removeInLineList();
  }
 }
}