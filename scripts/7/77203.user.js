// ==UserScript==
// @name           goo.gl URL shortener
// @namespace      download
// @include        http://*
// @include        https://*
// ==/UserScript==

var closeButton="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAlhJREFUOMuFk7FKI1EUhj8ze5NxVFQIqGCnwoAIooUgU6ebF9AiYCMpJWgsI9opyKSwtLTVB/AB1GChxkYYbNTGiEqSmcsMk7PFYtasK/7dufB/9/z3noOISBRF4nmeXF9fy086OzuTg4MDiaJIRETQWovneZLL5SSfz8vd3d235mq1KktLS5LL5cTzPGm1WmLMz8+Xj46OGBgYoNVqUa1WsW2bbDbLZ52fn+N5Hs1mk97eXmq1Gul0mpTjOMzMzBAEAUop6vU6u7u7+L7fZa5UKjSbTZRSBEHA4uIiruvSIyLyYbq9vcU0TeI4ZmxsjPX1dV5fX9nf3++YG40GjuOwsbFBJpP5AwA6N9/c3GBZFkmSMDIyQqPR6Ji11iwsLFAsFrEsC+Av4DPko5MkSQAwDAOtNY7jsLa2RiaT6cTrAgC8v7+ztbXF/f09hmEAEMcxruuSz+dRSnU9bor/SGv95ewjxr/69bnwfZ9KpcLj4yNKqU4EpRSnp6f09/ezsrJCKpX62oHv+53vU0oRxzHZbJbBwUGSJME0TU5OTjg8PKTdbncDfN9ne3ubh4cHTNNEa83U1BTlcplCoQDwLcRYXl4u7+zsUK/XsSyLMAyZnp6mVCoxOjrK+Pg4Q0NDXF5eIiKk02lqtRphGDI7O4vx9vZWfnl5wTRNwjDEtm1KpVLXKE9OTtLX18fFxQU9PT0YhsHV1RXDw8Ok5ubmAAiCANu22dzc/LIHAK7rsrq6SrvdJo5jJiYmsG0boiiSvb09KRaL8vz8/OM6Hx8fS6FQkKenJxER+Q2B9p9jHygejQAAAABJRU5ErkJggg==";

function shortenUrl(url,cb)
{
	GM_xmlhttpRequest(
	{
		method:"POST",
		url:"https://www.googleapis.com/urlshortener/v1/url",
		headers:{"Content-Type":"application/json"},
		data:JSON.stringify({longUrl:url}),
		onload:function(r){cb(r.responseText)}
	});
}

function startShorten()
{
	var d=document.createElement("div"),b=document.createElement("button"),n=document.createElement("input"),m=document.createElement("img");
	setStyle(d,{zIndex:10000,position:"fixed",top:0,left:"50%",width:270,height:25,marginLeft:"-100px",border:"black 1px solid",MozBorderRadius:"5px",backgroundColor:"white"});
	setStyle(n,{width:150,marginLeft:"5px",marginRight:"10px",verticalAlign:"middle"});
	setStyle(m,{cursor:"pointer",marginLeft:"5px",marginRight:"5px",verticalAlign:"middle"});
	
	n.value=location.href;
	n.addEventListener("keydown",function(e){if(e.keyCode==13)b.click()},false);
	m.src=closeButton;
	m.addEventListener("click",function(){d.parentNode.removeChild(d)},false);
	b.textContent="Shorten";
	b.style.verticalAlign="middle";
	b.addEventListener("click",function()
	{
		shortenUrl(n.value,function(r){try{n.value=JSON.parse(r).id;n.select()}catch(e){n.value="Error: "+r}});
		n.value="Shortening...";
	},false);
	
	d.appendChild(n);
	d.appendChild(b);
	d.appendChild(m);
	document.body.appendChild(d);
	n.select();
}
function setStyle(a,s){for(var i in s)a.style[i]=s[i]}

GM_registerMenuCommand("Shorten URL",startShorten);
addEventListener("keydown",function(e)
{
	if(e.altKey&&e.keyCode==71)
	{
		e.stopPropagation();
		startShorten();
	}
},true);