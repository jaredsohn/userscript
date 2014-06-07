// ==UserScript==
// @name           	jira enhancer
// @version		0.0.3
// @author	   	Yakov Shuvaev 91koff@gmail.com http://91koff.ru
// @description	   	Script enhances Jira usability.
// @namespace           http://jira.lanit.ru/secure/
// @include        	http://jira.lanit.ru/secure/*
// @exclude	   	http://www.jira.lanit.ru/*
// @updateURL		http://userscripts.org/scripts/source/95218.user.js
// ==/UserScript==

(function(){
function log(message)
{
    GM_log(message);
}
function setSize(jclassname){
    var classField = document.getElementById(jclassname);
    if (classField) {
        var counter = 0;
        var class_options_count = classField.childElementCount;
        for (var i = 0; i < class_options_count; i++) {
            if (classField.children[i].nodeName == 'OPTION') {
                counter++;
            }
            else {
                if (classField.children[i].nodeName == 'OPTGROUP') {
                    counter += classField.children[i].childElementCount + 1;
                }
            }
        }
        if (counter > 15) {
            classField.size = 15;
        }
        else {
            classField.size = counter;
        }
    }
}
setSize('components');
setSize('versions');
setSize('fixVersions');
})();