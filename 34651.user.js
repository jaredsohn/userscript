// ==UserScript==
// @name           csakötös
// @namespace      lintaba
// @description    MaYoR csakötös, felelőséget nem vállalok
// @include        https://80.*.202/index.php?page=naplo&sub=osztalyozo*
// @include        https://enaplo.njszki.hu/index.php?page=naplo&sub=osztalyozo*
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
a=getElementsByClassName("osztalyozo")[0].childNodes[5];
for(i=0;i<a.rows.length;i++){
for(j=1;j<6;j++){
c=a.rows[i].cells[j]
for(k=0;k<c.getElementsByTagName("a").length;k++){
c.getElementsByTagName("a")[k].title+="      AMI IGAZÁBÓL CSAK "+c.getElementsByTagName("a")[k].innerHTML
c.getElementsByTagName("a")[k].innerHTML="5 "
}
}
if(a.rows[i].cells[6].innerHTML){
a.rows[i].cells[6].title=a.rows[i].cells[6].innerHTML+" volt amíg át nem írtam"
a.rows[i].cells[6].innerHTML="5,00"
}
}
getElementsByClassName("toolBarTitle")[0].firstChild.textContent+=" módosítva"