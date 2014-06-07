// ==UserScript==
// @name			Hide Completed Tasks
// @namespace		http://dex.ir/
// @description		Hides Completed Task in PersianTools Task Manager System
// @include			http://task.pt2.com/*
// @version			1.5
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

function getElementsByClassName(classname, node)
{
    if(!node)
	{
		node = document.getElementsByTagName("body")[0];
	}
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
	{
        if(re.test(els[i].className))
		{
			a.push(els[i]);
		}
	}
    return a;
}

elms = getElementsByClassName('task completed');

for(i=0; i<elms.length; i++) 
{
	elms[i].style.display = "none";
}

projectElms = getElementsByClassName('projectContainer');

for(i=0; i<projectElms.length; i++) 
{
	tasks = projectElms[i].firstElementChild.lastElementChild.lastElementChild.children;
	doneTasks = 0;
	notDoneTasks = 0;
	
	for(j=0; j<tasks.length; j++) 
	{
		if (tasks[j].className=='task  ')
		{
			notDoneTasks++;
		}
		else
		{
			doneTasks++;
		}
	}
	
	if (notDoneTasks==0)
	{
		projectElms[i].style.display = "none";
	}
}