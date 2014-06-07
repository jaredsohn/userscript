// ==UserScript==
// @name        cnu-pingjia
// @namespace   http://userscripts.org/scripts/show/185720
// @author      Gizeta <0w0@gizeta.tk>
// @description CNU Pingjia Plugin
// @include     http://xk.cnu.edu.cn/jxpgXsAction.do
// @version     0.1.1.6
// @updateURL   https://userscripts.org/scripts/source/185720.meta.js
// @downloadURL https://userscripts.org/scripts/source/185720.user.js
// @grant       none
// ==/UserScript==

injectScript = function(src){
    var scriptEl;
    scriptEl = document.createElement('script');
    scriptEl.innerHTML = "(" + (src.toString()) + ")();";
    return document.head.appendChild(scriptEl);
};

injectScript(function(){
    var d = document;
    var x = d.getElementsByTagName('input');
    var exp=/(很好|适中|很满意)/;
    for(i in x)
    {
        if(x[i].type === 'radio')
        {
            if(exp.exec(x[i].nextSibling.data))
            {
                x[i].checked = true;
            }
        }
    }
    
    var cmts = ["上课风趣",
                "注重教学质量",
                "十分关注学生的接受学习能力",
                "下课主动和同学交流，对自己的课堂做出改进",
                "不拖堂，不很多的占用学生的课余时间",
                "布置数量不多，但是运用了所有课堂教学知识的作业",
                "开展研学课，让大家不拘泥于书本之中",
                "经常给我们科普课外知识",
                "和我们探讨人生、理想"]; // Writed by Clect
    var cmtCount = parseInt(Math.random() * 3 + 3);
    var cmtString = "";
    for(i = 0; i < cmtCount; i++)
    {
        var index = parseInt(Math.random() * (9 - i));
        cmtString += cmts[index] + "，";
        cmts.splice(index, 1);
    }
                
    window.document.StDaForm.zgpj.value = cmtString.substring(0, cmtString.length - 1) + "。";
    window.document.StDaForm.zgpj1.value = "无";
    flag = true;
});