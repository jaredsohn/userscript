// CRAN Redirect
// 
// version 0.1 
// 2012-10-03
// 
// -------------------------------------------------------------------- 
// This is a Greasemonkey user script. 
// To uninstall, go to Tools/Manage User Scripts, 
// select "CRAN Redirect", and click Uninstall. 
// -------------------------------------------------------------------- 
//
// ==UserScript== 
// @name CRAN Redirect
// @description Redirect CRAN requests to a selected mirror
// @include http://cran.r-project.org/* 
// 
//
// ==/UserScript== 

location.href = location.href.replace(/^http:\/\/cran.r-project.org/, 'http://mirrors.ustc.edu.cn/CRAN');