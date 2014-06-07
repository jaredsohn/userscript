// ==UserScript==
// @name           Free Property Count on Monopoly City Streets
// @namespace      http://html-apps.com/greasemonkey/monopolycitystreets
// @description    If there are free properties in your view, it says how many, or none.
// @version        6
// @include        http://www.monopolycitystreets.com/*
// @include        https://www.monopolycitystreets.com/*
// ==/UserScript==

var timerLimit = (60*55*24);
function streetChecker(){
  var intBiggestValue=intFreeArrayCounter=0;
  try
  {
    if(!document.getElementById('PropFinder'))
    {
      var s = document.createElement('div');
      s.id='PropFinder';
      s.style.color='black';
      s.style.padding='5px';
      s.style.position='absolute';
      s.style.zIndex='9999';
      s.style.fontSize='2.0em';
      s.style.border='3px inset gold';
      s.style.backgroundColor='black';
      document.body.appendChild(s);
    }
    else
    {
      var s = document.getElementById('PropFinder');
    }
    s.style.color='gold';
    s.style.top=''+(window.innerHeight-135)+'px';
    s.style.right='225px';
    s.innerHTML='Loading...';

    var listArray = new Array();
    listArray = getElementsByClassName('street-list', 'div');

    for(var x=0;x<listArray.length;x++)
    {
    	listArray[x].style.backgroundColor='black';
    	listArray[x].style.color='gold';
    }

    if(listArray.length&&0<listArray.length)
    {
      var freeArray = new Array();
      freeArray = getElementsByClassName('free', 'tr');

      for(var x=0;x<freeArray.length;x++)
      {
      	intFreeArrayCounter++;
      	childrenOfTR = freeArray[x].childNodes;
      	if(childrenOfTR) for(y=0;y<childrenOfTR.length;y++)
      	{
          childOfTR=childrenOfTR[y];
          if(childOfTR.tagName&&('TD'==childOfTR.tagName.toUpperCase()))
          {
            childrenOfTD = childOfTR.childNodes;
            if(childrenOfTD) for(z=0;z<childrenOfTD.length;z++)
            {
              if(3==childrenOfTD[z].nodeType)
              {
                strToCheck=((childrenOfTD[z].textContent).split(',')).join('');
                if(4<strToCheck.length) strToCheck=strToCheck.substring(0,strToCheck.length-3);
                if(isNaN(parseInt(strToCheck)))
                {
                  //NOTHING
                }
                else
                {
                  if(parseInt(strToCheck)>intBiggestValue) intBiggestValue=parseInt(strToCheck);
                }
              }
            }
          }
      	}
      }
      if (0<intFreeArrayCounter)
      {
        s.innerHTML=' '+intFreeArrayCounter+' free properties found. Largest: $'+intBiggestValue+'(000)';
        if(999<intBiggestValue) s.style.color='salmon';
        if(1999<intBiggestValue) s.style.color='green';
        if(2999<intBiggestValue) s.style.color='blue';
      }
      else {s.innerHTML='No properties found';}
    }
    else
    {
      s.innerHTML='Display the "Buy Streets" list to use';
    }

    if(timerLimit-- > 0) objStreetCheckerTimer = window.setTimeout(streetChecker, 1100);
  }catch(e){s.innerHTML='Broken:'+e;}
}

var objStreetCheckerTimer = window.setTimeout(streetChecker, 5000);


/*
	Copyright (c) 2008, Robert Nyman, http://www.robertnyman.com
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.*/	

var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
