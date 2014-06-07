// ==UserScript==
// @name         youdao-helper
// @namespace    http://isailfish.net/
// @version      0.1
// @description  My mom will never worry about me visiting the English website
// @include      http://*/*
// @copyright    2013+, kongkongyzt
// @run-at       document-end
// ==/UserScript==
var select_text=window.getSelection();
document.onmouseup=function()
{
    var url='http://fanyi.youdao.com/openapi.do?keyfrom=isailfish&key=1053023538&type=data&doctype=xml&version=1.1&q='+select_text;
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
            "Accept": "text/xml"            // If not specified, browser defaults will be used.
        },
        onload: function(response) {
            var responseXML = new DOMParser()
            .parseFromString(response.responseText, "text/xml");
            //var result='翻译结果：\n'+responseXML.getElementsByTagName('ex')[8].textContent;
            var resultset='翻译结果：\n\n';
            for(var i=0;i<responseXML.getElementsByTagName('ex').length;i++){
                resultset=resultset+(i+1)+'.'+responseXML.getElementsByTagName('ex')[i].textContent+'\n';
            }
            if(resultset!='翻译结果：\n\n'){
                alert(resultset);
            }
        }
    });
};
