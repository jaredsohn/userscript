// ==UserScript==
// @name           VU Highlight Damaged Ships
// @namespace      http://userscripts.org/users/125692
// @description    Alters all % under 100 % to be red text
// @include        http://www.humugus.com/ds.php/f/move/index/*
// @include        http://www.humugus.com/ds.php/battle/index/*
// @include        http://www.humugus.com/ds.php/fleet/index/*
// ==/UserScript==


    //	Add one or more CSS style rules to the document
(function() {
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
	    return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }

    //	Quote HTML metacharacters in body text

    function quoteHTML(s) {
	s = s.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	return s;
    }

   addGlobalStyle('span.redpercent { color:#FF0000; } ' +  // bluegreen?
		   'span.greenpercent { color:#00FF00; } '           //pale pink?
		  ); 

var replacements2, regex2, key2, textnodes2, node, s2,str2;
replacements2 =([
   "^[0-9][0-9]\.[0-9]{1,2}[ ]*%[ ]*$",//try to highlight % under 100%
   //"[0-9][0-9]\.[0-9][0-9] %",//try to highlight % under 100%
   //"[0-9][0-9]\.[0-9][0-9]%",//try to highlight % under 100%
   //"100 %",//try to highlight % under 100%
    ]);
regex2 = {};

//textnodes2 = document.evaluate(
//    "//text()",
//    document,
//    null,
//    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//    null);
    var textnodes2 = document.evaluate("//body//text()", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var node;
//alert(textnodes2.snapshotLength);
for (var i = 0; i < textnodes2.snapshotLength; i++) {//for each text string
    if (typeof(textnodes2.snapshotItem(i)) != "undefined"){
        node = textnodes2.snapshotItem(i);
    }
    else{
        continue;
    }
    //alert("loopmain:"+i+" of "+textnodes2.snapshotLength);
    if (node.parentNode.tagName != "STYLE" &&
            node.parentNode.tagName != "TEXTAREA" &&
            node.parentNode.tagName != "SCRIPT") {//not something we shouldn't be messing with
        if ((typeof(node.data) != "undefined")&& !(node.data.match(/^\s*$/))) {//not empty
            str = ""+node.data;
            //alert("node.data:"+str+" replacements length"+replacements2.length);
            for (var j=0;j<replacements2.length;j++) {
                var key=replacements2[j];
                //alert("loopinner key:"+key+"str:"+str);
                regex2=new RegExp(key);
                //alert(str.match(regex2));
                //if(str.match(/100 %/)){alert("found");}
                if(str.match(regex2)){
                   // alert("found one");
                    var newElement = document.createElement("span");//make a span element
                    newElement.innerHTML=""+str.match(regex2);
                    newElement.setAttribute("class","redpercent");
                    node.parentNode.replaceChild(newElement,node);
                }
            }
            //node.data = str2;//write string. note will be writing this more than strictly necessary. meh
        }
    }
}







})();