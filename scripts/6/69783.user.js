// ==UserScript==
// @name Hotmail plus
// @include   *

// ==/UserScript==
//2步实现计划：
//第1步实现，farm3、farm5的图片地址内容变换
//第2部实现，编辑页面，两处外联代码 的地址内容替换
//说实话这个IP替换的小把戏真的有点儿耍小聪明，尽管我估计了yahoo是世界上第一大被动搜索商
//不会经常变动IP，但是一旦变动，以前用的图片外链代码就都要改动了
//WordPress 后台还好说，但是其他后台或是BSP商的真要花一番功夫了

//第1步 farm3、farm5的图片地址变换 实现代码
//图片可显示 Start
(function(){

//获得文档中的图象资源，若多个图片，按照显示的先后采用数组接受
var allImages=document.images;

var testcode=document.getElementById(spPreviewContainer);

alert(testcode);

// if(allImages!=null){//对象不为空执行
	// for(j=0;j<allImages.length;++j)//图像对象数组循环计数器
	// {
	// if (allImages [j].src.indexOf ("public.blu.livefilestore.com") > 0)//判断图像数组中是否含有需要替换的部分
	// //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	 // htmlstr=allImages [j].src;
	// }
// }

// document.write("<Textarea>"++"</Textarea>");

}
//图片显示 End
}
)();






// <img width="600px" height="375px" src="http://public.blu.livefilestore.com/y1pmMrXR9IKMNYpG3La-Es4wnBBhpDYxHoVCjdjlUHY6UUiTuy-0L4NGR18wLWIL-LHcwlG1BdRGCcT4NhHZhTCog/test.jpg" alt="" id="spPreviewImage">
