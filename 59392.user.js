// ==UserScript==
// @namespace     http://daryl.learnhouston.com/userscripts/
// @name          Hide Digg Sponsored Entries
// @description   Remove those irritating sponsored links in Digg's entry list.
// @include       http*://*digg.com*
// ==/UserScript==


document.digg_getElementsByClassName = function(clsName){
        var retVal = new Array();
        var elements = document.getElementsByTagName("*");
        for(var i = 0;i < elements.length;i++){
                if(elements[i].className.indexOf(" ") >= 0){
                        var classes = elements[i].className.split(" ");
                        for(var j = 0;j < classes.length;j++){
                                if(classes[j] == clsName)
                                        retVal.push(elements[i]);
                        }
                }
                else if(elements[i].className == clsName)
                        retVal.push(elements[i]);
        }
        return retVal;
}

var divs = document.digg_getElementsByClassName('sponsored');
for(var i = 0; i< divs.length; i++){
	divs[i].setAttribute('style', 'display: none;');
}
