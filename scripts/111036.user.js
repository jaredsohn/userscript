// ==UserScript==
// @name           Center the AppShopper content please
// @namespace      http://userscripts.org/users/390631
// @run-at document-end
// @description    The AppShopper content is much too left in wide screen?Change it please,(OR we change it ourselves),only a little change and make better UI for users.
// @include        http://appshopper.com/*
// @version 0.9.3
// ==/UserScript==


(function(){
var content=getTagsByClassName('div','content');
var sections=getTagsByClassName('ul','sections');
var toolbar=getTagsByClassName('div','toolbar');
var h1=document.getElementsByTagName('h1');
if(h1){
h1[0].style.marginRight="auto";
h1[0].style.marginLeft="auto";
h1[0].innerHTML='<a href="/" style="position:relative;left:50%;margin-Left:auto;margin-Right:auto">AppShopper</a>';
}else{console.log("cannot find the h1");}


if(content){
content[0].style.marginRight="auto";
content[0].style.marginLeft="auto";
}else{console.log("cannot find the content");}

if(sections){
sections[0].style.marginRight="auto";
sections[0].style.marginLeft="auto";

sections[0].style.left='30%';
}else{console.log("cannot find the sections");}

if(toolbar){
toolbar[0].style.marginRight="auto";
toolbar[0].style.marginLeft="auto";
toolbar[0].style.textAlign="center"
//toast("OMG,couldn't center it.");
}else{console.log("cannot find the toolbar");}

})();
function getTagsByClassName (tagname,className){
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName(tagname);
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}
		return results;
}


//hi android~
function toast(msg) {
 if(msg.length) {
    toast=document.createElement('div');
    toast.id="toast";
    toast.setAttribute("style","color:#000000; background:#eeffee; width:60%; text-align:center; font-size:18px; border: 1px solid #ffeeee; margin:2px;margin-Left:auto;margin-Right:auto;");
    toast.textContent="Message from userscript: "+msg;
    document.body.insertBefore(toast, document.body.firstChild);
    setTimeout('document.getElementById("toast").style.display="none";',5000)
  }
}
