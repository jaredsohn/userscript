// ==UserScript==
// @name           مسمي القرى المتطور
// @namespace      حرب القبائل
// @version        1.2
// @author         قـــاتل
// @include        http://ae*.tribalwars.ae/game.php?village=2411&screen=overview_villages*
// ==/UserScript==
var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

javascript:var%20text=prompt('آدخــل الإسم [تمت البرمجة بواسطة قـــاتل]');var%20doc=document;if(window.frames.length>0)doc=window.main.document;var%20inputs=doc.getElementsByTagName('input');var%20index=1;for(i=0;i<inputs.length;i++){if(inputs[i].id.indexOf('edit_input')!=-1){inputs[i].value="";if(index<100)inputs[i].value+="0";if(index<10)inputs[i].value+="0";inputs[i].value+=index%20+%20"%20";inputs[i].value+=text;inputs[i+1].click();index++;}}end();