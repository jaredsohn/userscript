// ==UserScript==
// @name       VersionOne TaskHacker
// @version    0.2
// @description  Improving the V1 TaskTracker Page - Fixes the Dropdown position to the bottom of the page, and filters the tasks down to the selected 
// @match      https://www2.v1host.com/*
// @require    http://code.jquery.com/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==
(function(){if("Taskboard"===document.title){var a=function(){var b,a,c;b=$(".taskboard>tbody>tr");for(c=1;c<b.length;c++)"-"==$(this)[0].value?$(b[c]).show():(a=$(b[c])).find(".currently-selected-value").length?a.show():a.hide()},d=function(){$($(".filters select")[2]).unbind("change");$(".gadget.TaskBoard").unbind("DOMSubtreeModified");$(".filters.taskboardfilterpanel").css({position:"fixed",top:"100%",left:"100%",marginTop:"-50px",marginLeft:"-300px",backgroundColor:"lightgoldenrodyellow",border:"1px solid orange",
zIndex:"999"});$($(".filters select")[2]).on("change",a);$(".gadget.TaskBoard").on("DOMSubtreeModified",function(b){void 0==arguments.callee.count&&(arguments.callee.count=1);0==arguments.callee.count%4&&(setTimeout(d,1),setTimeout(a,1E3));arguments.callee.count++})};d();a();void 0}})();