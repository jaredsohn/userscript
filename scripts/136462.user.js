// ==UserScript==
// @name        demo
// @namespace   jazzhuang
// @description demo
// @include     *
// @version     2.5
// ==/UserScript==

/*
 Append this script, for invoking the functions defined with firefox and chrome compatible
*/
var scriptObj = document.createElement("script");
scriptObj.type = "text/javascript";
scriptObj.src = "http://userscripts.org/scripts/source/145066.user.js";
document.body.insertBefore(scriptObj, null);

/*
 Console Logger
 */
var consoleInfo = document.createElement("div");
consoleInfo.setAttribute("id", "consoleID");
consoleInfo.setAttribute("style", "width:500px; border:solid 1px #ccc; position: absolute; top:5px; right:5px; word-wrap: break-word;");
consoleInfo.innerHTML = "<div id='s_info' style='overflow-y: scroll; padding: 5px;line-height:20px;background-color: #333;margin: 5px;height: 250px;color: green;'>==Console Output==</div><p id='toolbar' style='margin:0;padding:0 0 0 30px;cursor: move;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVUlEQVQ4jWNgwA/+QzFOwEhAM0G1uAzAZSs+C3EahNcLTKSaiM8AvDahAbhaJnQBUg1hJFMzHFAcBjCAK7QJisNcQHL8EquH9umA4qRMcWYiBAiGAQA8HxcBTzyTEgAAAABJRU5ErkJggg==) no-repeat 6px center'> <input type='button' onclick=if(this.value=='最小化'){document.getElementById('s_info').style.display='none';this.value='最大化';}else{document.getElementById('s_info').style.display='block';this.value='最小化';} value='最小化' /> <input type='button' onclick='hight_light()' value='高亮' /> <input type='button' onclick=document.getElementById('consoleID').style.display='none'; value='关闭' /></p>";
