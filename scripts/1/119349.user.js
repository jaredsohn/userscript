// ==UserScript==
// @name           跳转到手机版页面
// @namespace      neteasemobile
// @description    自动跳转到手机版的全文页面。
// @include        http://*.blog.163.com/blog/static/*/
// @include        http://*.163.com/*.html
// @include        http://*.163.com/*.html?from=*
// @include        http://*.caijing.com.cn/*-*-*/*.html
// @include        http://blog.caijing.com.cn/*_article-*-*.shtml
// @include        http://news.qq.com/a/*.htm
// @include        http://news.sohu.com/*/n*.shtml
// @include        http://*.news.sohu.com/*/n*.shtml
// @include        http://*.yesky.com/*.shtml
// @include        http://www.ftchinese.com/story/*
// @include        http://www.dw-world.de/dw/article/*.html
// @include        http://www.dw-world.de/dw/article/*.html?*
// @exclude        http://*.163.com/bbs/*
// @exclude        http://3g.163.com/*
// @exclude        http://*bbs.163.com/*
// @exclude        http://bbs*.163.com/*
// @exclude        http://comment*.163.com/*
// @exclude        http://fanxian.163.com/*
// @exclude        http://help.163.com/*
// @exclude        http://m.163.com/*
// @exclude        http://*mail.163.com/*
// @exclude        http://reg.163.com/*
// @exclude        http://survey2.163.com/*
// @exclude        http://t.163.com/*
// @exclude        http://v.163.com/*
// @exclude        http://wap.163.com/*
// @exclude        http://wap.*.163.com/*
// @exclude        http://*.163.com/*index.html
// @exclude        http://*.163.com/board/*
// @exclude        http://*.163.com/photo/*
// @exclude        http://*.163.com/photoview/*.html*
// @exclude        http://*.163.com/special/*
// @exclude        http://*.163.com/video/*
// @exclude        http://news.163.com/special/*/error_news.html
// @exclude        http://m.caijing.com.cn/*
// @exclude        http://wap.yesky.com/*
// ==/UserScript==

var link=location.href;
if(link.match("blog.163.com")){
    document.location.replace(link.replace("http://","http://wap.blog.163.com/w2/blogDetail.do?u=http://"));
}
else if(link.match("163.com")){
    document.location.replace(link.replace(/http\:\/\/([a-z]+\.)+163\.com(\/[a-z]+)?\/\d+\/\d+\/\d+\/(\w+)\.html((\?from=\w+)+)?/g,"http://3g.163.com/touch/article.html?docid=$3"));
}
else if(link.match("blog.caijing.com.cn")){
    document.location.replace(link.replace(/http\:\/\/blog\.caijing\.com\.cn\/\w+_article-\d+-(\d+).shtml/g,"http://wap.caijing.com.cn/dlog4wap/wml/cjArticle/showb.vm?log_id=$1&hp=100"));
}
else if(link.match("caijing.com.cn")){
    document.location.replace(link.replace(/http\:\/\/(\w+)\.caijing\.com\.cn(\/\d{4}-\d{2}-\d{2}\/\d+\.html)/g,"http://m.caijing.com.cn/$1$2"));
}
else if(link.match("qq.com")){
    document.location.replace(link.replace(/http\:\/\/news\.qq\.com\/a\/(\d+)\/(\d+)\.htm/g,"http://info.3g.qq.com/g/s?aid=news_ss&id=news_$1$2"));
}
else if(link.match("sohu.com")){
    document.location.replace(link.replace(/http\:\/\/(\w+\.)?news\.sohu\.com\/\d{8}\/n(\d+)\.shtml/g,"http://wap.sohu.com/news/?rid=ND$2"));
}
else if(link.match("yesky.com")){
    document.location.replace(link.replace(/http\:\/\/(\w+)\.yesky\.com\//g,"http://wap.yesky.com/$1/"));
}
else if(link.match("ftchinese.com")){
    document.location.replace(link.replace("www.ftchinese.com","m.ftchinese.com/m/index.html#"));
}
else if(link.match("dw-world.de")){
    document.location.replace(link.replace("dw/article","popups/popup_printcontent"));
}