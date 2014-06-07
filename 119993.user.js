// ==UserScript==
// @name		FTO Tooltip
// @namespace		http://userscripts.org/tags/faerytaleonline
// @include		*faerytaleonline.com/*
// @version		1.0
// @description		FTO tweak that changes behaviour of tooltips in game. They used to disappear immediately after you stop hovering their icon. Now they stay on screen for 1 second, but it can keep them on screen by hovering the tooltip itself, or even lock multiple tooltips at once by double clicking them.
// @icon		http://faerytaleonline.com/favicon.ico
// ==/UserScript==
 
function contentEval(source) {
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var str = source.toString();
str=str.replace("function ()", "").replace("function()", "").replace("{", "");
str=str.substring(0, str.length-2)
script.textContent = str;
document.body.insertBefore(script,document.body.firstChild);
}
 
 
contentEval(function(){
 
var DH = 0;
var an = 0;
var al = 0;
var ai = 0;
var timer;
var last;

//document.body.removeChild(document.body.children[0]);
if (document.getElementById)
{
        ai = 1; 
        DH = 1;
}
else 
{
        if (document.all) 
        {
                al = 1;
                DH = 1;
        }
        else
        { 
        browserVersion = parseInt(navigator.appVersion);
        if      ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion== 4))
                {
                        an = 1;
                        DH = 1;
                }
        }
}
 
function fd(oi, wS) 
{
        if (ai)
                return wS ? document.getElementById(oi).style:document.getElementById(oi);
        if (al)
                return wS ? document.all[oi].style: document.all[oi];
        if (an)
                return document.layers[oi];
}
 
function pw() 
{
        return window.innerWidth != null? window.innerWidth: document.body.clientWidth != null? document.body.clientWidth:null;
}
 
function mouseX(evt)
{
        if (evt.pageX)
                return evt.pageX;
        else
                if (evt.clientX)
                        return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft);
                else
                        return null;
}
 
function mouseY(evt)
{
        if (evt.pageY)
                return evt.pageY;
        else
                if (evt.clientY)
                        return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                else
                        return null;
}
    
function hide(z)
{
	last = null;
	if (z.borderColor=='#0079e0'||z.borderColor=='rgb(0, 121, 224)') return;
	z.visibility = "hidden";
//alert("wooohooo");
}     

function popUp(evt,oi)
{
        if (DH)
        {
                if (last)
		{
			hide(last);
			clearTimeout(timer);
		}
                var wp = pw();
                var ds = fd(oi,1);
                dm = fd(oi,0);
                st = ds.visibility;
		if(!dm.getAttribute("ondblclick"))
			dm.setAttribute("ondblclick", "if(this.style.borderColor=='#0079e0'||this.style.borderColor=='rgb(0, 121, 224)') this.style.borderColor='#262A13'; else this.style.borderColor='#0079e0';");
		if(!dm.getAttribute("onmouseover"))
			dm.setAttribute("onmouseover", "if(last == this.style)clearTimeout(timer);");
		if(!dm.getAttribute("onmouseout"))
			dm.setAttribute("onmouseout", "if(last == this.style)timer = setTimeout('hide(last)',1);if(!last)hide(this.style)");
                if (dm.offsetWidth)
                        ew = dm.offsetWidth;
                else
                        if (dm.clip.width)
                                ew = dm.clip.width;
                if (st == "visible" || st == "show")
                {
                        last = ds;
                        timer = setTimeout("hide(last)",1000);
                }
                else
                {
                        tv = mouseY(evt) + 30;
                        lv = mouseX(evt) - (ew/4);
                        if (lv < 2)
                                lv = 2;
                        else
                                if (lv + ew > wp)
                                        lv -= ew/2;
                        if (!an)
                        {
                                lv += 'px';
                                tv += 'px';
                        }
                        ds.left = lv;
                        ds.top = tv;
                        ds.visibility = "visible";
                }
        }
}

});
