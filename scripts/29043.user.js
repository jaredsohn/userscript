// ==UserScript==
// @name           maps live local toggle toolbar
// @namespace      http://maps.live.com
// @description    maps live local toggle toolbars
// @include        http://maps.live.com/*
// @exclude		   http://maps.live.com/print.aspx*
// ==/UserScript==
_amcd = new function() {
	this.bit=1;
	this.gel=function(ig_){return document.getElementById?document.getElementById(ig_):null};
	this.gelstn=function(ig_){return document.getElementsByTagName?document.getElementsByTagName(ig_):new Array};
	this.go = function() {
		var tog_icon = "data:image/gif;base64,R0lGODlhEAAOAKEBAP///6uuqauuqauuqSH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAACACwAAAAAEAAOAAACG1SOmabtDxEAUU4a74Va5115IfhNVSCeD3MKBQA7";
		var link_icon = "data:image/gif;base64,R0lGODlhTQAQAOYAAFtbW8jIyPj4+H9/f/f39+jo6Pr6+vPz8+fn59LS0kBAQISEhFFRUYuLi4GBgcPDw8DAwF9fX4mJic/Pz1paWu7u7r6+vnh4eMXFxeHh4eTk5GNjY+rq6vDw8ICAgO/v709PT2FhYV5eXuDg4EdHR/n5+UlJSUJCQkNDQ+Pj44WFhV1dXUZGRj4+Pjs7O5+fn1ZWVvb29s3Nzebm5sbGxuvr6zo6Oq2trd/f3zk5Ofv7+3JycrKysrOzs2xsbJycnMfHx8LCwpOTk1hYWO3t7WdnZ21tbYaGhjw8PFNTU42NjVRUVHNzc9vb23x8fD8/P2hoaIeHh3t7e6CgoPHx8by8vOnp6aGhoYqKilxcXOLi4pmZmX19fVlZWZ6entfX14iIiJ2dnba2ttjY2NDQ0IyMjNra2sTExLq6ujg4OExMTOzs7NPT00tLS5KSkiQkJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABNABAAAAf/gHCCg4SFhoeIiYqLjIMFjwUICIIaGilaGSONm5ydhAVKVy8/W0KRElELHlIrmp6vsIYNZSUGBjFVKg5oAr0CQyGxwrENEgZAZxAdCRk6NA9iAkkrw9WdDUclHUQIZDdNBxVWZgIgXdbojFgOBs8WE1MJBxgQPQQmS4hv+/twAPxvAvzjF8CNGzgGDQoyGAAgADgA30AUJNEQGC4GPnCYMeEFmwNrCowhwIKBvkESAQQQpFIly4IJEb4xOFOgIJsVJ0rMWWjBBQEYgliQ4UXeAwg8YpxQo4/fy5cu/RWcuTAhQ4cQnWZN5GCHgAocUsgII68Ggi8Enpg4SVEq1JVSbq0iPDjXJhycbXUicmLEF4EPOKgQEEBgBgEkLJo6HbhPIECYcxXWfXj3Yc6deQtdKLJBBAUYDFQsIIFCQQsXNk6kW42IyYDXsEG0gQ1bAevbhHxA6fyZQYgIpE27yJEGt3FDbiJk8XC8ufPnhwIBADs%3D";
		var print_icon = "data:image/gif;base64,R0lGODlhOAAQAOYAAMjIyFtbW+7u7mZmZrCwsK+vr2dnZ/Dw8Hx8fMzMzKioqH19fb29vfv7+9bW1tPT09zc3O/v76SkpL6+vqOjo9/f32tra25ubtfX16qqqnBwcM/Pz/r6+t3d3XJycvj4+FpaWuzs7GpqatnZ2c7OznFxcaurq8bGxktLS2NjY7S0tHh4eHV1dZiYmJSUlEJCQtjY2Hl5efn5+RkZGe3t7ff39/X19ZeXl4GBgT09PR8fH15eXi0tLVhYWOHh4evr6+rq6qGhoenp6VdXV4WFhVVVVcvLy83Nzd7e3uDg4DExMbi4uGhoaNra2qmpqfHx8cPDw4aGhoSEhObm5np6esTExJmZmcfHx7W1tW9vb11dXZWVlWxsbOPj45CQkL+/v3t7e+Li4o+Pj/Ly8m1tbR0dHU1NTdXV1X9/fxgYGJ6enjAwMNvb2yQkJJKSkv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA4ABAAAAf/gG+Cg1VbJRosLBdBg42Oj5CRko8XNBECAjQQLQsck5+goR5jMBgPJDJNajehra6NHk8wI2cbSSFCA6+7oBwaBxAdpldQBxYyvMmPJyVkB0gdEA4kRgdMZirK2hhEX1kHFRVsIw8bERYqWgCQbe3tbwHubQABAG5ugvdu8viPUidhBgwwQFDgwAE+sARgN6gNvHUP6+3Ddy9fP0gXGjRggAnTJUxLNIJgJw+eu3US9VV8sxKSgQ8fWjiYwIABzQkOxNSogYJho3oPH1acaFFSigQJcBwpwLRpghVIefgcBDSivX4rWz7aYSLDCgAKnCgYqwAAl65ltCUDQUECGhEiPlL0QJFDyZohbWeo5VXEhQQLVggIHnxDB4UoafbucmHgRQwbIX4AmdKlgo0YM154UZwMzAIECD6DXkCFs6tAADs%3D";
		var floatingBox2 = document.createElement('div');
		floatingBox2.id='GM_FloatingBox';
		floatingBox2.setAttribute('style','opacity:0.8;font-family:arial,helvetica; text-decoration:none; position: fixed; top: 0px; right: 0px; height: 2em;  padding: 2px 0px 0px 15px; background: #bbb; -moz-border-radius-bottomleft: 32px; color: #000; font-size: 10px');
		floatingBox2.innerHTML='<a id="gm_prnt" onclick="OpenPrintPage(); return false;" href="#" title="print this"><img src="'+print_icon+'"/></a>&nbsp;|&nbsp;<a id="gm_link" onclick="ShowPermalinkPanel(); return false;" href="#" title="link to this"><img src="'+link_icon+'"/></a>&nbsp;|&nbsp;<a id="gm_tog" href="#" title="Show/Hide Screen Furniture"><img src="' + tog_icon + '" alt="Show/Hide Screen Furniture"/></a>&nbsp;&nbsp;';
		_amcd.gelstn('body')[0].appendChild(floatingBox2);
		_amcd.gel('gm_tog').addEventListener("click", this.toggle, true);
	};
	
	this.toggle = function(event) {
		_amcd.bit = (_amcd.bit==0) ? 1 : 0;
		_amcd.gel('sw_hdr').style.display = (_amcd.bit==0) ? 'none' : 'block';	
		_amcd.gel('taskBar').style.display = (_amcd.bit==0) ? 'none' : 'block';	
		_amcd.gel('sb_foot').style.display = (_amcd.bit==0) ? 'none' : 'block';	
		_amcd.gel('pageContext').style.display = (_amcd.bit==0) ? 'none' : 'block';	
		_amcd.gel('underTaskLinks').style.display = (_amcd.bit==0) ? 'none' : 'block';	
		unsafeWindow.resize();
		event.stopPropagation(); 
		event.preventDefault(); 
	};
};
_amcd.go();
