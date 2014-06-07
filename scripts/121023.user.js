// ==UserScript==
// @name           GC Load Bookmark
// @namespace      delta68.gc_load_bookmark
// @include        http://www.geocaching.com/bookmarks/view.aspx*
// @include        http://www.geocaching.com/bookmarks/bulk.aspx*
// ==/UserScript==


window.addEventListener('submit', newsubmit, true);


var codelist = GM_getValue('codelist','')
var t =document.getElementsByName("wp")
var i = GM_getValue('i',0)
var c = codelist.split(',')
try{
	if((i <  c.length)&&(c.length>1)){
		t[0].value=c[i]// + ' ' + i
	
		var d =document.getElementById('ctl00_ContentBody_QuickAdd')
		var s = document.createElement('span')
		s.innerHTML= '<b>Loaded ' + i + '/' + c.length + '</b>'
		d.appendChild(s)
	}
		GM_setValue('i',i+1)
		if(i==c.length)
		{
			GM_setValue('codelist','')
			GM_setValue('i',0)
		}
	
}catch(err){}


function newsubmit(event) 
{   
	var target = event ? event.target : this;
    var t =document.getElementsByName("wp")
   // alert(t[0].value)
    if(t[0].value.indexOf(',') > -1)
    {	var c = t[0].value.split(',')
		GM_setValue('codelist',t[0].value)
		GM_setValue('i',1)
		t[0].value=c[0]
    }
    
        // call real submit function
        this._submit();
}
