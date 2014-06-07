// ==UserScript==
// @name          Google plus search in gplus
// @description   google plus search in gplus basing on google site search
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://*.google.co.jp/*
// @include       https://*.google.co.jp/*
// @author        Wheel Wheaty http://gplus.to/wheaty
// ==/UserScript==

(function(){
var searchbox = document.getElementById("search-box");
var searchform = document.createElement("form");
	searchform.setAttribute("id","searchform"); 
	searchform.setAttribute("method","get");
	searchform.setAttribute("style"," position: relative;left:390px;top: -20px");
	searchform.setAttribute("action","http://www.google.com/search");
	searchform.setAttribute("target","_blank");

	var searchpost=document.createElement("input");
    searchpost.setAttribute("type","image");
    searchpost.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJCNEUwNzM4OTY0MTFFMEE0MDNEODlCOThCNUNBOTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJCNEUwNzQ4OTY0MTFFMEE0MDNEODlCOThCNUNBOTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkI0RTA3MTg5NjQxMUUwQTQwM0Q4OUI5OEI1Q0E5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkI0RTA3Mjg5NjQxMUUwQTQwM0Q4OUI5OEI1Q0E5OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po7ONFMAAADISURBVHjanFJBCsIwEFzrF7z04h9E/Efx5MEHePHmr4T6hFLwF6G/sKW0lLixEwh1AtGB6SaZne22G7HWCrhT1sqXneHiE+fC6BcX5Wg5RujU7CoPSDTKs3KLaHA+sA7co0JCE2mvgV4xcwuxiJgL6C0zTxDziDmHPi21TER6mbEXDn/efykYT8o316ztQzAm93dPyg2iCUZ2/WfOIe7M7DtwN6pDYof9LVZAYldvwZIVSDXTApmk46h8BPv16vP631D6Ym8BBgAsamp63yCdlAAAAABJRU5ErkJggg==");
    searchpost.addEventListener("mouseover",addlis,false);
    //searchpost.addEventListener("click",clearcontent,false);
	searchpost.addEventListener("mouseout",clearcontent,false);
searchform.appendChild(searchpost);
searchbox.parentNode.appendChild(searchform);
 
 
 function addlis(){
var cloneNOD1 = document.getElementById("search-box").childNodes[0].cloneNode(true);
    cloneNOD1.setAttribute("id","cloneNOD1");
//alert("ss");
var cloneNOD2 = document.getElementById("search-box").childNodes[2].cloneNode(true);
    cloneNOD2.setAttribute("type","hidden");
	var str = cloneNOD2.value + " site:plus.google.com";
	//alert(str);
	cloneNOD2.setAttribute("id","cloneNOD2");
	cloneNOD2.setAttribute("value",str);
	searchform.appendChild(cloneNOD1);
    searchform.appendChild(cloneNOD2);
	
	}
 // removeChild 动态移除新增的两个input
 function clearcontent(){
    document.getElementById("searchform").removeChild(document.getElementById("searchform").lastChild);
    document.getElementById("searchform").removeChild(document.getElementById("searchform").lastChild);
 }
}) ();

