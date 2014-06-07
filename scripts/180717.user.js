// ==UserScript==
// @name       CMBchina Bill tool
// @namespace  东东魄 QQ386486929
// @version    0.1
// @description  招商银行网银帐单显示MCC代码工具
// @match    https://pbsz.ebank.cmbchina.com/CmbBank_CreditCardV2/UI/CreditCardPC/CreditCardV2_AccountManager/am_QueryReckoningNotRMB.aspx
// @copyright  2012+,东东魄
// ==/UserScript==
function removeClass(ele,className){
var tmpClassName = ele.className;
ele.className = null;    
ele.className = tmpClassName.split(new RegExp(" " + className + "|" + className + " " + "|" + "^" + className + "$","ig")).join("");
}
var x;
var tb = document.getElementById('dgReckoningNotDetail');
var td = tb.getElementsByTagName('td'); 
for ( x=0;x<td.length;x=x+15)
     {
        // td[x+9].className=null;
        // td[x+11].className=null;
        // td[x+13].className=null;
        removeClass(td[x+9],'hidden');
        removeClass(td[x+11],'hidden');
        removeClass(td[x+13],'hidden');
         
     }
console.log('帐单隐藏信息已显示！');


