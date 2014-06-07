// ==UserScript==
// @name nolazyload
// @namespace http://userscripts.org:8080/scripts/show/151249
// @version    5.0
// @description  nolazyload
// @include *
// @installURL http://userscripts.org:8080/scripts/source/151249.user.js
// @updateURL  http://userscripts.org:8080/scripts/source/151249.meta.js
// @copyright  反馈和建议E-mail: nolazyload@foxmail.com
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARklEQVQ4y2NgoBAw4pH7D5X/T4ZeuAEE5Vgo9QLVDfhPgM9IiuH4DPuPzwWMAxoGJKcfFgrCgZHsxDMowgCvAf/JyThkAwCd8w8i7EeNAAAAAABJRU5ErkJggg==
// ==/UserScript==

function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(function(){
var time_interval = 300; //运行间隔(毫秒)

var lazypic = ["data-ks-lazyload","data-ks-lazyload-custom","data-lazy-load-src","data-lazyload","original","file","data-src","data-cover","data-original","data-thumb","real_src","src2","data-imageurl","data-defer-src","data-placeholder","origin-src"];
var nolazypic = new Array();
var dipic = ["item.taobao.com","detail.tmall.com"]; //直接加载
function nolazyload4()
{
    try
    {
        var imgs = document.images;
        for(var i=0;i<imgs.length;i++)
        {
            for(var j=0;j<lazypic.length;j++)
            {
                for(var p=0;p<imgs[i].attributes.length;p++)
                {
                    if(imgs[i].attributes[p].nodeName == lazypic[j])
                    {
                        //alert(imgs[i].attributes[p].nodeName);
                        preload(imgs[i].attributes[p].nodeValue, lazypic[j], i);
                    }
                }
            }
        }
    setTimeout(nolazyload4,time_interval);
    }catch(e)
    {
        //alert("error"+e);
    }
    //alert(atv); //测试用
}

function preload(x,y,z)
{
    var loaded = false;
    for(var l = 0;l<nolazypic.length;l++)
    {
        if(x == nolazypic[l])
        {
            loaded = true;
            break;
        }
    }
    if(loaded)
    {
        return;
    }
    else
    {
        loading(x,y,z);
    }
    
}
//var atv = "";//测试用
function loading(x,y,z)
{
    if(di_check(y))
    {
        //atv+=y+"|"+z+"|"+x+"\n"; //测试用
        //alert(location.hostname);
        document.images[z].src=x;
        document.images[z].removeAttribute(y);
    }
    else
    {
        new Image().src = x;
    }
    nolazypic.push(x)
}

function di_check(y)
{
    var hn = location.hostname;
    for(var i=0;i<dipic.length;i++)
    {
        if(dipic[i]==hn)
        {
            return true;
        }
    }
    return false;
}

nolazyload4();
});