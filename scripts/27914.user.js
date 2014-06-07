// ==UserScript==
// @name          ImageFit
// @description	  Fit the image for reading.
// @version	      1.0
// @namespace     ImageFit
// @author        Crystalfluxay
// @include       http://*.lqqm.net/*
// @include       http://*.zatan.org/*

// ==/UserScript==

(var AllImages = document.images;
var winWidth = 0;
var winHeight = 0;

function findDimensions() //函数：获取尺寸
{
	winWidth = 0;
	winHeight = 0;
	//获取窗口宽度
	if (window.innerWidth)
  	winWidth = window.innerWidth;
  else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
 //获取窗口高度
  if (window.innerHeight)
    winHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
 /* nasty hack to deal with doctype switch in IE */
  if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
  {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
   }
}

function Wa_SetImgAutoSize( img)
{
 	var MaxWidth=winWidth * 0.96;//设置图片宽度界限
	var MaxHeight=winHeight * 0.96;//设置图片高度界限
	var HeightWidth=img.offsetHeight/img.offsetWidth;//设置高宽比
	var WidthHeight=img.offsetWidth/img.offsetHeight;//设置宽高比
	if(img.readyState!="complete")return false;//确保图片完全加载
	if(img.offsetWidth>MaxWidth)
	{
		img.width=MaxWidth;
		img.height=MaxWidth*HeightWidth;
	}
	if(img.offsetHeight > MaxHeight )
	{
		img.height=MaxHeight;
		img.width=MaxHeight*WidthHeight;
	}
}

if (AllImages != null)
{
	findDimensions();
  window.onresize=findDimensions;

	for (i=0; i < AllImages.length; i++)
	{

    Wa_SetImgAutoSize( AllImages[i]);
	}
});
