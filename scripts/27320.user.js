// ==UserScript==

// @name           Forum Page Links

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/forum_thread_list.pl?*

// ==/UserScript==
window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var threads = getElementsByClassName("post_count", document);
for (var i=0; i<threads.length; i++)
{
	var thread = threads[i].parentNode;
	var container_temp = getElementsByClassName("thread_title",thread);
	var container = container_temp[0];

	var urlElement = getElementsByClassName("thread_title",thread);
	var url = urlElement[0].firstChild.href;
	
	var postString = getElementsByClassName("post_count",thread);
	var posts = parseFloat(postString[0].innerHTML);

	var pages = posts/15;
	
	if (pages>1)
	{
	for(var j=0; j<pages; j++)
	{
		var page_number = j+1;
		if(page_number<8 || page_number > pages-2)
		{
			container.innerHTML = container.innerHTML + "<a href=\"" + url + "&page="+page_number+"\">"+ page_number + "</a> ";
		}
		//else if (j=6)
		//{
		//	container.innerHTML = container.innerHTML + "...";
		//}
		//else 
		//{
		//}
	}
	}
	
}

}, 100);