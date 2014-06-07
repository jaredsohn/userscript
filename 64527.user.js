// ==UserScript==                                                               
// @name C4L News Wire Frame Remover                                            
// @description Removes the annoying C4L frame around the article.              
// @include http://www.campaignforliberty.com/wire.php*                         
// @version 0.0.1                                                               
// ==/UserScript==                                                              
var f_url = document.getElementById("content").getElementsByTagName("iframe")[0].src;
window.location = f_url;
