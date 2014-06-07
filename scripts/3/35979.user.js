/* This is a Greasemonkey user script.
   To use it, you need Greasemonkey first: http://www.greasespot.net/
*/

// ==UserScript==
// @name           干扰码终结者(Terminator of Copy Disturbing)
// @version        0.2.2008.11.24
// @description    还原被干扰的内容，可以随便复制，不再有乱码。
// @namespace      http://userscripts.org/scripts/show/35979
// @include        *
// ==/UserScript==

GM_registerMenuCommand("清除干扰码", main);

function remove_self(self)
{
  self.parentNode.removeChild(self);
}

function main()
{
  var nodes = document.getElementsByTagName("span");
  for(var i=0; i<nodes.length; i++) {
    if( getComputedStyle(nodes[i],"").getPropertyValue("display") == "none" ) {
      remove_self(nodes[i]);
      //after remove, all followed element's number decrease 1.
      // if not do this, you will get error.
      i--;
    }
  }

  var reg = /^\s*0\s*(em|pt|px)?\s*$/i;
  nodes = document.getElementsByTagName("font");
  for(i=0; i<nodes.length; i++){
    var gPV = function(p){return getComputedStyle(nodes[i],"").getPropertyValue(p);};
    if( gPV("display") == "none" || reg.test(gPV("font-size")) ){
      remove_self(nodes[i]);
      i--;
    }
    else {
      var childs = nodes[i].childNodes;
      for(var j=0; j<childs.length; j++)
        if(childs[j].nodeName == "#text"){ //<font><table>...</table></font>
          childs[j].data = childs[j].data.replace(/../g, "　");
          //keep format. above is a Chinese space character.
          //continuous & heading English space ignored by html parser.
          //below is a English space, replace the last charactor(if odd).
          childs[j].data = childs[j].data.replace(/[^　]/, " ");
        }
    }
  }
}