// ==UserScript==
// @name           removeDupSlashesFromSmart
// @namespace      http://userscripts.org/users/96951
// @description    remove duplicate slashes from smart messages
// @include        http://login.smartmanager:1000/messager/receber.php*
// ==/UserScript==


//implements replaceAll on String
String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

var ta = document.getElementsByTagName("textarea")[0];
ta.value=ta.value.replaceAll("\\\\","\\");