// ==UserScript==
// @name search
// ==/UserScript==




@charset "UTF-8";
/*
 * For Google search
 *
 * Author : yansyrs
 * Version : 1.0
 */

/* ------------------------ 去广告 -----------------------*/
div[id^="tads"]
{
	display: none !important;
}

/* --------------------- 去掉网页预览 --------------------*/
.vspib
{
	display: none !important;
}

/* ----------------------- 页面宽度 -----------------------*/
body:not([class="tbo"]), 
body:not([class="tbo"]) .sfbg,
body:not([class="tbo"]) #appbar
{
	width: 99% !important;
	min-width: 833px !important;
}

body:not([class="tbo"]), 
body:not([class="tbo"]) .sfbg
{
	margin-left: auto !important;
	margin-right: auto !important;
}

body:not([class="tbo"]) .sfbg
{
	left: auto !important;
}



body:not([class="tbo"])
{
	box-shadow: 0 0 10px gray !important;
	border-radius: 10px !important;
	padding-bottom: 20px !important;
	margin-bottom: 10px !important;
	min-height: 550px !important;
}

body:not([class="tbo"]) #gbx3,
body:not([class="tbo"]) #gbx4
{
	box-shadow: 0 0 10px gray !important;
}

/* --------------------- 搜索结果加宽 --------------------- */
body:not([class="tbo"]) #center_col
{
	width: auto !important;
}

body:not([class="tbo"]) #center_col,
body:not([class="tbo"]) #foot
{
	margin-right: auto !important;
}

body:not([class="tbo"]) .vsc > .s
{
	max-width: 80% !important;
}

/* ------------- 搜索结果 hover 效果 (未使用) ---------------*/
/*
body:not([class="tbo"]) .g > .vsc
{
	padding-left: 5px !important;
	border-left: 3px solid white !important;
}

body:not([class="tbo"]) .g > .vsc:hover
{
	border-left: 3px solid #DD4B39 !important;
}
*/

/* -------------------------- 页尾 -------------------------- */
body:not([class="tbo"]) #fll
{
	display: none !important;
}





body,div,table,td{
text-shadow: 1px 1px white;
color: #3E4147;
font: 16.5px 微软雅黑;
}

::selection {
color: #08D;
background: #DCDCDC;
}

@charset "utf-8";
/* Name:HuYan */

body,div,table,td{background-color: #efefef !important;}

