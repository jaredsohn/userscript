// ==UserScript==
// @name Flickr plus
// @include  http://www.flickr.com/*
// @include  http://farm3.static.flickr.com/*
// @include  http://farm5.static.flickr.com/*
// @version        20100227

// New version 2010-03-01 v1.01
//修改了一开始的几处错误
//增加了作用域，省去了自己手动调节的麻烦

/*
History version 
2010-02-23 v1.00

*/
//说实话这个IP替换的小把戏真的有点儿耍小聪明，尽管我估计了yahoo是世界上第一大被动搜索商
//不会经常变动IP，但是一旦变动，以前用的图片外链代码就都要改动了
//WordPress 后台还好说，但是其他后台或是BSP商的真要花一番功夫了

// ==/UserScript==

(function(){
var allImages=document.images;

if(allImages!=null){
	for(j=0;j<allImages.length;++j)
	{
	if (allImages [j].src.indexOf ("flickr.com") > 0)
	{
allImages[j].src=allImages[j].src.replace("farm3.static.flickr.com","76.13.18.78");
allImages[j].src=allImages[j].src.replace("farm5.static.flickr.com","76.13.18.79");
	}
}
}

var textareaobject=document.getElementsByTagName("textarea");

if(textareaobject!=null)
 {	
	if(textareaobject[0].childNodes[0].nodeValue.indexOf ("farm3.static") > 0)
	{
	textareaobject[0].childNodes[0].nodeValue=textareaobject[0].childNodes[0].nodeValue.replace("www.flickr.com","76.13.18.78");
	textareaobject[0].childNodes[0].nodeValue=textareaobject[0].childNodes[0].nodeValue.replace("farm3.static.flickr.com","76.13.18.78");
	}
	else if(textareaobject[0].childNodes[0].nodeValue.indexOf("farm5.static") > 0)
	{
	textareaobject[0].childNodes[0].nodeValue=textareaobject[0].childNodes[0].nodeValue.replace("www.flickr.com","76.13.18.79");
	textareaobject[0].childNodes[0].nodeValue=textareaobject[0].childNodes[0].nodeValue.replace("farm5.static.flickr.com","76.13.18.79");
	}
}

var inputobject=document.getElementsByTagName("input");


if(inputobject!=null)
 {	
	if(inputobject[0].defaultValue.indexOf ("farm3.static") > 0)
	{
	inputobject[0].defaultValue=inputobject[0].defaultValue.replace("www.flickr.com","76.13.18.78");
	inputobject[0].defaultValue=inputobject[0].defaultValue.replace("farm3.static.flickr.com","76.13.18.78");
	}
	else if(inputobject[0].defaultValue.indexOf("farm5.static") > 0)
	{
	inputobject[0].defaultValue=inputobject[0].defaultValue.replace("www.flickr.com","76.13.18.79");
	inputobject[0].defaultValue=inputobject[0].defaultValue.replace("farm5.static.flickr.com","76.13.18.79");
	}
}
}
)();