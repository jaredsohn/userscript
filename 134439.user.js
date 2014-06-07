// ==UserScript==
// @name           贴吧 bypass validate
// @version        1.0.0 2012-05-29
// @update        
// @author         http://www.yanhanshui.com
// @description    贴吧 bypass validate
// ==/UserScript==

(function(){baidu.ajax.post("?lockcheckcode",null,function(xhr,text){var obj=eval('('+text+')');parent.window.insertToken(obj.token,obj.time);parent.safe_dialog.hideModal();baidu.dom.remove(parent.safe_dialog.getMain())})})();