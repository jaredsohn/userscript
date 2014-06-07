// ==UserScript==
// @name DoNotLazyLoad
// @version    3.5
// @description  DoNotLazyLoad
// @include *.taobao.com/*
// @include *.tmall.com/*
// @include *.jd.com/*
// @include *.sina.com.cn/*
// @include *.youtube.com/*
// @include *.pconline.com.cn/*
// @include *.tianya.cn/*
// @include */article-*.html
// @include */thread-*.html
// ==/UserScript==

//http://userscripts.org/scripts/show/151249
//意见反馈和建议E-mail: nolazyload@foxmail.com

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
var tma = 300; //运行间隔(毫秒)


function nolazyload()
{
    try
    {
        var imgs = document.images;
        if(imgs.length==0) //页面加载完一个图都没有就跳出
        {
            //alert(document.location.href+"nopics");
            return;
        }
        for(var i=0;i<imgs.length;i++)
        {
            //taobao
            if(pic_url_check(imgs[i].getAttribute("data-ks-lazyload"))&&imgs[i].src!=imgs[i].getAttribute("data-ks-lazyload"))
            {
                
                imgs[i].src=imgs[i].getAttribute("data-ks-lazyload");

                if(!imgs[i].getAttribute("postfix"))//etao fix lazyurl+postfix=true url
                {
                imgs[i].removeAttribute("data-ks-lazyload");
                }
            }
            
            //alibaba
            if(pic_url_check(imgs[i].getAttribute("data-lazy-load-src"))&&imgs[i].src!=imgs[i].getAttribute("data-lazy-load-src"))
            {
                imgs[i].src=imgs[i].getAttribute("data-lazy-load-src");
                imgs[i].removeAttribute("data-lazy-load-src");
            }
            
            //360buy
            if(pic_url_check(imgs[i].getAttribute("data-lazyload"))&&imgs[i].src!=imgs[i].getAttribute("data-lazyload"))
            {
                imgs[i].src=imgs[i].getAttribute("data-lazyload");
                
                imgs[i].removeAttribute("data-lazyload");
            }
            //tianya
            if(pic_url_check(imgs[i].getAttribute("original"))&&imgs[i].src!=imgs[i].getAttribute("original"))
            {
                imgs[i].src=imgs[i].getAttribute("original");
                if(imgs[i].className!="productLazyLoad") //凡客
                {
                    //imgs[i].removeAttribute("original");
                }
                if(window.location.href.indexOf("tianya.cn")>0) //tianya auto pic size
                {
                    imgs[i].style.height="auto";
                    imgs[i].style.width="auto";
                }
                
            }
            //discuz
            if(imgs[i].getAttribute("file"))
            {
            //alert(imgs[i].complete);
            //imgs[i].style.display="";
                if(pic_url_check(imgs[i].getAttribute("file"))&&imgs[i].src!=imgs[i].getAttribute("file"))
                {
                    imgs[i].src=imgs[i].getAttribute("file");
                    imgs[i].removeAttribute("file");
                    
                    //imgs[i].src=imgs[i].getAttribute("file");
                    //alert(imgs[i].getAttribute("lazyloaded"));
                    
                    imgs[i].setAttribute("lazyloaded","false");
                    //imgs[i].setAttribute("initialized","false");
                    
                    //imgs[i].setAttribute("lazyloaded","true");
                    //imgs[i].setAttribute("initialized","true");
                    /*
                    if(imgs[i].getAttribute("lazyloaded")==true)
                    {
                        //imgs[i].setAttribute("lazyloaded","false"); //修复pcfuns图片无限加载问题
                        imgs[i].getAttribute("lazyloaded")=false;
                    }
                    */
                    
                    if(window.location.href.indexOf("padhz.com")>-1)
                    {
                        //alert(1);
                        imgs[i].setAttribute("lazyloadpass","1");//padhz
                        imgs[i].setAttribute("style","opacity: 1");//padhz
                    }
                    //imgs[i].setAttribute("initialized","true");
                    //imgs[i].style.display="inline";
                }
            }
            
            //pconline
            if(pic_url_check(imgs[i].getAttribute("src2"))&&imgs[i].src!=imgs[i].getAttribute("src2"))
            {
                imgs[i].src=imgs[i].getAttribute("src2");
            }
            
            //sina_blog
            if(pic_url_check(imgs[i].getAttribute("real_src"))&&imgs[i].src!=imgs[i].getAttribute("real_src"))
            {
                imgs[i].src=imgs[i].getAttribute("real_src");
                imgs[i].removeAttribute("real_src");
            }
            
            //YouTube
            if(pic_url_check(imgs[i].getAttribute("data-thumb"))&&imgs[i].src!=imgs[i].getAttribute("data-thumb"))
            {
                imgs[i].src=imgs[i].getAttribute("data-thumb");
                imgs[i].removeAttribute("data-thumb");
            }
            //getchu
            if(pic_url_check(imgs[i].getAttribute("data-original"))&&imgs[i].src!=imgs[i].getAttribute("data-original"))
            {
                imgs[i].src=imgs[i].getAttribute("data-original");
                if(imgs[i].getAttribute("class")=="file lazy lazyGO") //wallbase
                {
                    imgs[i].setAttribute("class","file lazy show");
                }
                //imgs[i].removeAttribute("data-original");
            }
            
            //pixiv & tmall
            if(pic_url_check(imgs[i].getAttribute("data-src"))&&imgs[i].src!=imgs[i].getAttribute("data-src"))
            {
                if(window.location.href.indexOf("taobao.com")>=0)
                {
                    continue;
                }
                //imgs[i].src="";
                imgs[i].src=imgs[i].getAttribute("data-src");
            }
            
            //lightnovel
            if(pic_url_check(imgs[i].getAttribute("data-cover"))&&imgs[i].src!=imgs[i].getAttribute("data-cover"))
            {
                imgs[i].src=imgs[i].getAttribute("data-cover");
            }
            
        }

    //alert("done"+"\n"+window.location.href);
    }catch(e)
    {
        //alert(e+"\n请将此错误信息发送至\n\nE-mail:nolazyload@foxmail.com");
    }

    setTimeout(nolazyload,tma);
}
function pic_url_check(picx)
{
    if(!picx)return false;
    if(picx.length>10)
    {
        return true;
    }
    else
    {
        return false;
    }
}
nolazyload();
})();