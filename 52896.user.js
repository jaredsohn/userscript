// ==UserScript==
// @name           IBM Infocenter search results pane
// @namespace      com.ibm.infocenter.scripts.search.ux
// @description    Moves the search results pane into the main content window instead of the smaller left bar.
// @include        *advanced/search.jsp*
// @include        *advanced/views.jsp*
// @include        *advanced/searchView.jsp*
// ==/UserScript==

if (window.name == "SearchFrame") {
embedFunction(doSearch);
}
if (window.name == "ViewsFrame") {
embedFunction(showView);
}

if (document.location.href.indexOf('searchView.jsp') !== false && window.name == "ContentViewFrame"){

	GM_addStyle('table#list,table.results {margin-left: 10px; margin-right: 210px; width: auto; font-size: 110%;} table#list font,table.results font {font-size: 100%;} table#list tr.list td,table.results tr.list td {padding-top: 12px;} table#list a,table.results a { white-space: normal;');
	GM_addStyle('.searchBox {border: 1px solid threedshadow; margin-top: 1.5em; position: fixed; width: 200px; background-color: #F0F0F0; background-repeat: no-repeat; background-position: 0px 0px;}');
	GM_addStyle('.searchBox input[type="text"] {width: 95%;} .boxTitle { padding: 4px; padding-left: 24px; line-height: 18px; font-weight: bold;} .boxContents{ margin: 5px; }');
	insertGoogleBox();
	insertSupportBox();
}


function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function insertGoogleBox(){

	var html = ''
	+'<div class="boxTitle">Search google</div>'
		+'<div class="boxContents">'
			+'<form action="http://google.com/search" method="GET">'
			+'<input type="text" name="q" value="'+getQueryParameter('searchWord') + '" /><br />'
			+'<input type="submit" value="Search" />'
			+'</form>'
		+'</div>'
	+'';
	var box = document.createElement('div');
	box.className='searchBox';
	box.innerHTML = html;
	box.style.right='5px';
	box.style.top='40px';
	box.style.backgroundImage="url(data:image/gif;base64,R0lGODlhGAAYAPf5AP39/fz8/Pn5+fr6+vb29vj4+Pv7+wh3ZNra2ubm5u/v7+zs7Ovr6/Pz893d3fT09Ofn5y2LezmRgm6kyOrq6tPT0xV+bPX19Xiqy+np6UqZjPHx8e3t7eXl5UWGszuSg+jo6Pf39/Ly8tzc3NjY2Ozu8GSStmKRtTOBnUyNucLExtzg5dTZ4WCmpcDd7Y6bsLnZ5DePg+Pj42ypu3u1smmrpdLX31qWwCaHdm6stFyknvL09WSdxO7u7oCyzUaYiiuKeaHL3MjIyEaYjmWexSqJedTo8y+Gkdzg5imCjhuAdXq1tBZ/bTiQgTVdhVR4i5emukeJtkeItTZxnBZ7bEaEsHaQq2GnpkybjjmCgs7OzlOEkXiSrCqEjFGRvRmAbkGViVGSuVOUu9bW1nyuzl5xjGJ9m2KcxAp2anisyEWXii2Dk9fX1zFnkoOQpYKy0GeqqSSChVyNswxrZoS00i6Le9/u96+zu7bW2JGjuFOenxh/bjuShUGDr09oiEJnjb2/wf7+/sHGz5yirVqXwIq51nmUr+Hh4Tt6poiZrtPY4NLS0k6AqF6kpp3I00mEr1J2mSmIeJyjrmCaw2GbwzyThEuUqCOFdNTZ4FqWwWuqslBujVmillykoszj8VVujGWGmcLEx5HCx8Dd6TFkjx6Dclqjmoy82Gepnk6cj9DQ0DVtmDVtmUWXjtfq9GytqpXE3wp4ZUSTi6nP0ECBrWyDnXWoynSwwXmFmFqDk6GrvVOfktXV1SmIfVOflJzI2jKKhkyMuOfq7kmRqsTIzEGVh+/x8zl4n2iqoitmdTFfid/f3/Dw8GOmqUqLuJHA3FqXwVeZshFyapuirbe/zEJ2n5CdsSxahRmAb36xzBN8cD+SkECQmGWooI2dsjaPgMrKyiiIeD6ThU2Nuld/m2KmnXWxqlSTv2ajt8Hd7cbg7622w2WlrkFkh+3v8ZOgsxd/bbvDzszMzDSBnjSMiWWgvUuLuB+Af0mKt////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAPkALAAAAAAYABgAAAj/APMJHEiwoMGDCBMqXMhQIIAdLBTZWAEgUMN8AIRBIXfChBxGkHQBALAwAKZcsjTlaMaODI9HZowFSBgAyZZipmog6wanUQx6VJ64m2kQQAFQEjRwQjULxhINEiLBk+ZNAMmCAuJlqZTKHB47nmj4AgME24FkJQYUDPAgD7BWOka5MqKuHJYPRb4cmEONwFWBAxoYisanhSMX6UTtUvMNh4UuaN5tMECwgAIuRHx8+PEqyK8rQyKUUiIGhTUOagcSWGCFELo6TcR1gvXs1iULls7ResFAAMELCRIFm7AtXAQ9pwrNYBIrzjhW6xgUIEgAgqBqN+rt6ZWNzps0B+4lsfHgJMEC3wMLMHBQqwo0bdwwYLA1YVgYfFPcjFCQWqABZssQ84cHaxxByRmTZOJFFIj4QYIMDRDlEAEgkHDHJsfM40wK9kjRRxtlhDLCAtMVNIAIHbChAi7tKLMKKdd8Mo0WCIBwgYQDASDABgkgoAo4gEgyiBDyVOBABg9QdhAAgVFwCAK8LFLBGA500AMBSiZkQAgicJABBBBQoMADAuCYEAAGCBACAQQUMICZFzUUEAA7)";
	document.body.appendChild(box);
}

function insertSupportBox(){

	var html = ''
	+'<div class="boxTitle">Search IBM support</div>'
		+'<div class="boxContents">'
			+'<form action="http://ibm.com/support/search.wss" method="GET">'
			+'<input type="text" name="q" value="'+getQueryParameter('searchWord') + '" />'
			+'<input type="submit" value="Search" />'
			+'</form>'
		+'</div>'
	+'';
	var box = document.createElement('div');
	box.className='searchBox';
	box.innerHTML = html;
	box.style.right='5px';
	box.style.top='160px';
	box.style.backgroundImage="url(data:image/gif;base64,R0lGODlhGAAYAPcAAAAAAHZuX3dvYHhvYHlyYXlyYihQgyhwmElcj0ltoXCQuIF6ZomCaoyGbeSiOenWc/rafY+RgZSTgpuZh6eapKebpaqdp6ufqK2jq7ClrLGnr7OpsLSrsrattLmyuLu1ub22vL65vZa32Jm91q3P7L3e+cC7v8G+wf70jergpMTBxcbCxsfEx8rIytDO0NXs/v//yf//3+zr7O3s7ej1/////v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAYABgAAAiXAP8JHEiwoMGDCBMqXMiwocOHDw8gOKBgBESBFGm8GKHgYsYEJUgcgPgxpAgEERVoNKnAQMMIEhoweMHSJcMJLmSoCLGAhIiWDRu0mLHChIcNBIAybMCUxYkPHDAMsMnQAQoYDEB0yGAhgEOrMWrYWKDhAgWvVVGErVEDRoEKaBk+WNsWhYC4DFOIrQsB78W/gAMLHrwwIAA7)";
	document.body.appendChild(box);
}

function getQueryParameter(parameterName) {
    var queryString = window.location.search.substring(1);
    var parameterName = parameterName + "=";
    if (queryString.length > 0) {
        begin = queryString.indexOf(parameterName);
        if (begin != -1) {
            begin += parameterName.length;
            end = queryString.indexOf("&", begin);
            if (end == -1) {
                end = queryString.length
            }
            return unescape(queryString.substring(begin, end));
        }
    }
    return 'null';
}

//Override the built in IEHS doSearch function with my own that switches which frames are used.
function doSearch(query)
{
	var workingSet = document.getElementById("scope").firstChild.nodeValue;

	if (!query || query == "")
	{
		var form = document.forms["searchForm"];
		var searchWord = form.searchWord.value;
		var maxHits = form.maxHits.value;
		if (!searchWord || searchWord == "")
			return;
		query ="searchWord="+encodeURIComponent(searchWord)+"&maxHits="+maxHits;
		if (workingSet != 'All topics')
			query = query +"&scope="+encodeURIComponent(workingSet);
	}
		
	/******** HARD CODED VIEW NAME *********/
	// do some tests to ensure the results are available
	if (parent.HelpFrame && 
		parent.HelpFrame.NavFrame && 
		parent.HelpFrame.NavFrame.showView &&
		parent.HelpFrame.NavFrame.ViewsFrame && 
		parent.HelpFrame.NavFrame.ViewsFrame.search && 
		parent.HelpFrame.NavFrame.ViewsFrame.search.searchViewFrame) 
	{
		//parent.HelpFrame.NavFrame.showView("search"); //Brett - turn off switching to this view in the left nav
		//var searchView = parent.HelpFrame.NavFrame.ViewsFrame.search.searchViewFrame;  //Brett - switch searchView to use ContentViewFrame
		var searchView = parent.HelpFrame.ContentFrame.ContentViewFrame;
		searchView.location.replace("searchView.jsp?detail=true&"+query);
	}
}

//Override the IEHS showView function so that it doesn't try to show change the left navigation pane to the search view pane.
function showView(view)
{ 	
	if (view == lastView || view == "search") 
		return;
		
	lastView = view;
       	
	// show appropriate frame
 	var iframes = parent.ViewsFrame.document.body.getElementsByTagName("IFRAME");
 	for (var i=0; i<iframes.length; i++)
 	{			
  		if (iframes[i].id != view){
   			iframes[i].className = "hidden";
   			iframes[i].style.visibility="hidden";
  		}else{
   			iframes[i].className = "visible";
   			iframes[i].style.visibility="visible";
   			if (view == "index") {
   				if (parent.ViewsFrame.index && parent.ViewsFrame.index.indexViewFrame && parent.ViewsFrame.index.indexViewFrame.loadIndex) {
   					parent.ViewsFrame.index.indexViewFrame.loadIndex();
   				}
   			}
   		}
 	}
}
