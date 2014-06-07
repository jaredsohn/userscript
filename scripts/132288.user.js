// ==UserScript==
// @name           mservice fix for retarded monkeys
// @namespace      http://userscripts.org/users/zipleen
// @description    retarded code monkeys don't know firefox and chrome exists..
// @include        http://mservice.ts.fujitsu.com/mainbody/timesheet.asp*
// ==/UserScript==
f=document.getElementsByTagName('select')
for (var i in f)
{
	if(f[i].id=="" && f[i].name!="")
		f[i].id=f[i].name;
}

f1=document.getElementsByTagName('input')
for (var i in f1)
{
	if(f1[i].name=="cbdel" )
		f1[i].name="cbDel"
}