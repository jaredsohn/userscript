// ==UserScript==
// @name           HackForums.net - Maximum Image Size
// @namespace      spafic/maximagesize
// @description    Makes images on HackForums.net have a maximum size so your browser does not "explode".
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.hackforums.net/showthread.php?tid=*
// @match          *://*.hackfourms.net/usercp.php?action=options
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/.user.js
// @updateURL      https://userscripts.org/scripts/source/.meta.js
//
// @icon           http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @icon64         http://cdn2.hackforums.net/uploads/ficons/hf-news.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed a small bug that will not resize images.
// ==/UserScript==

(function(){window.onload=function(){var b,a,e,c,h,f,d,g;if("undefined"==typeof localStorage)throw Error("Your browser does not support HTML5 localStorage. Try upgrading.");if(null==localStorage.getItem("hf_max_image")||"undefined"==localStorage.getItem("hf_max_image"))g={width:"500",height:"500"},localStorage.setItem("hf_max_image",JSON.stringify(g));d=JSON.parse(localStorage.getItem("hf_max_image"));if(-1!=document.location.toString().indexOf("usercp.php?action=options"))b=document.getElementsByTagName("fieldset")[2].parentNode,e=document.createElement("br"),a=document.createElement("fieldset"),a.setAttribute("class","trow2"),a.innerHTML='<legend><strong>Maximum Image Size</strong></legend><table cellspacing="0" cellpadding="2"><tbody><tr><td valign="top" width="1"><input type="text" name="image_width" value="'+d.width+'" id="image_width" /></td><td><span class="smalltext"><label for="image_width">Maximum image width (In pixels)</label></span></td></tr><tr><td width="1"><input type="text" name="image_height" value="'+d.height+'" id="image_height" /></td><td><span class="smalltext"><label for="image_height">Maximum image height (in pixels)</label></span></td></tr></tbody></table>',b.appendChild(e),b.appendChild(a),document.getElementsByName("regsubmit")[0].addEventListener("click",function(){myVal1=document.getElementById("image_width").value;myVal2=document.getElementById("image_height").value;g={width:myVal1,height:myVal2};localStorage.setItem("hf_max_image",JSON.stringify(g));return 1});else{images=[];c=[];f=a=h=0;b=document.getElementsByClassName("post_body");for(a=0;a<b.length;a++)if(-1!=b[a].innerHTML.toString().indexOf("<img ")){e=b[a].getElementsByTagName("img");for(f=0;f<e.length;f++)c[h]=e[f],h++}for(a=0;a<c.length;a++)if(c[a].width>d.width&&(c[a].width=d.width),c[a].height>d.height)c[a].height=d.height}}})();