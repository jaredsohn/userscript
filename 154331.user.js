// ==UserScript==
// @name    评教
// @namespace  
// @version    0.1
// @description  To change the default choice of the judgement for teachers in UESTC
// @match      http://ea.uestc.edu.cn/xsjxpj.aspx*
// @copyright  2012+, comilk
// ==/UserScript==

var i=0
s=document.getElementsByTagName('select')
for(i=1;i<s.length;i++){
    s[i].value="优秀"
}
