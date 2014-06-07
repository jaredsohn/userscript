// ==UserScript==
// @name          Bgu.ac.il personal info bugfix
// @namespace amirrima
// @version      0.85
// @description   fixes "personal information" bug in bgu.ac.il site
// @description   מתקן באגים באתר של אוניברסיטת בן-גוריון
// @include  http://bgu4u.bgu.ac.il/pls/scwp/!fw.loginex?rc_app=*
// @include  http://bgu4u.bgu.ac.il/pls/scwp/sc.*
// @include  http://bgu4u.bgu.ac.il/pls/scwp/!sc.*
// @include  http://*.bgu.ac.il/*
// ==/UserScript==

function setLink(formname,hrefVal){
	var node_list = document.getElementsByTagName('a');
	for (var i = 0; i < node_list.length; i++) {
		var node = node_list[i];
		if (node.href.toString().indexOf(hrefVal)>=0){
			node.href="javascript:document.getElementById('"+formname+"').submit()";
		}
	}
}

var loc = (window.location).toString();
if (loc.indexOf("http://bgu4u.bgu.ac.il/pls/scwp/!fw.loginex?rc_app")==0){
setLink('mainForm',"javascript:mainValidation('!fw.CheckId");
}
else if (loc.indexOf("http://bgu4u.bgu.ac.il/pls/scwp/sc")==0){
setLink('mainForm',"javascript:pre_check");
}else if (loc.indexOf("http://bgu4u.bgu.ac.il/pls/scwp/!sc.AnnualCoursesAdv")==0){
setLink('searchForm',"javascript:mainValidation");
}
else if (loc.indexOf("http://bgu4u.bgu.ac.il/pls/scwp/!sc.ExamCourseSearch")==0){
setLink('mainForm',"javascript:before_checkForm");
}
else if (loc.indexOf("http://bgu4u.bgu.ac.il/pls/")==0)
{
//check if the form needs to be submitted
	var a = document.getElementsByName('report');
	if (a[0]){
	a[0].id="report";
	a[0].submit();}
}


