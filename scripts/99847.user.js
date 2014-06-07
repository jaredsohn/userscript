// ==UserScript==
// @name           Remove [m]s from Reddit's gonewild
// @namespace      com.kalevil
// @include        http://www.reddit.com/r/gonewild/*
// @include        http://www.reddit.com/r/treesgonewild/*
// ==/UserScript==

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}



entries = getElementsByClassName('entry unvoted')
var i=0;
for (i=0;i< entries.length;i++)
{
    entry = entries[i];
    var txt = entry.children[0].textContent;
    txt=txt.replace('{','[').replace('}',']').replace('(','[').replace(')',']').toLowerCase()

    if (
	txt.indexOf('[m]') != -1 || 
	txt.indexOf('male') != -1 || 
	txt.indexOf('dick') != -1 ||
	txt.indexOf('penis') != -1 

	)
    {
	var removethis = entry.parentNode;
        removethis.parentNode.removeChild(removethis)
    }



}
