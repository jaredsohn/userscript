// ==UserScript==
// @name	Tieba Fix for Opera
// @namespace	http://gera2ld.blog.163.com/
// @author	Gerald <gera2ld@163.com>
// @icon	http://s.gravatar.com/avatar/a0ad718d86d21262ccd6ff271ece08a3?s=80
// @version	1.3.1
// @description	Opera贴吧修复 - Gerald倾情打造
// @homepage	http://userscripts.org/scripts/show/153687
// @downloadURL	https://userscripts.org/scripts/source/153687.user.js
// @updateURL	https://userscripts.org/scripts/source/153687.meta.js
// @include	http://tieba.baidu.com/*
// @exclude	http://tieba.baidu.com/tb/*
// @require	http://userscripts.org/scripts/source/186749.user.js
// ==/UserScript==
function t(){UE.browser.opera=null,UE.browser.ie=!0,UE.browser.ie9above=!0}function e(){$("<div id=baidu_pastebin>").appendTo(document.body)}function o(){var t="http://tb2.bdstatic.com/tb/static-postor/images/loading_33e098e1.gif";unsafeWindow._.Module.use("common/component/image_uploader_manager",{},function(e){utils.hook(e.__proto__,"_startImageUploader",{after:function(){var e=$('<input type=file style="opacity:0">'),o=null;this._options.container.html(e),"uploadImage"in utils?utils.uploadImage||(o="图片上传功能初始化失败，请在图化按钮中重试！"):o="请先安装贴吧图化脚本（http://userscripts.org/scripts/show/156579）才能上传本地图片！",o?e.click(function(t){t.preventDefault(),alert(o)}):e.change(function(e){var o=new FileReader,n=document.createElement("img");n.src=t,test_editor.selection._bakRange.insertNode(n),o.onload=function(){utils.uploadImage(this.result,n)},o.readAsDataURL(e.target.files[0])})}})})}unsafeWindow.PosterContext&&unsafeWindow.PosterContext.isPostAllowed()&&(utils.wait(unsafeWindow,"test_editor",t),e(),o());