// ==UserScript==
// @name Wiki img plus plus
// @include  *
//ver  1.0
// ==/UserScript==
//2步实现计划：
//说实话这个IP替换的小把戏真的有点儿耍小聪明，尽管我估计了yahoo是世界上第一大被动搜索商
//不会经常变动IP，但是一旦变动，以前用的图片外链代码就都要改动了
//WordPress 后台还好说，但是其他后台或是BSP商的真要花一番功夫了

//第1步 farm3、farm5的图片地址变换 实现代码
//图片可显示 Start
(function(){

//获得文档中的图象资源，若多个图片，按照显示的先后采用数组接受
var allImages=document.images;

if(allImages!=null){//对象不为空执行
	for(j=0;j<allImages.length;++j)//图像对象数组循环计数器
	{
	if (allImages [j].src.indexOf ("upload.wikimedia.org") > 0)//判断图像数组中是否含有需要替换的部分
	//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	{
	//替换图片src属性的address，实现图片的显示
	allImages[j].src=allImages[j].src.replace("upload.wikimedia.org","91.198.174.3");
	}
}
}
}
)();


