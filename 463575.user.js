// ==UserScript==
// @name         贴吧自动砸蛋
// @version     2.3
// @description  贴吧自动砸蛋，贴吧vip用户请删除脚本2、3行
// @run-at         document-end
// @include      http://tieba.baidu.com/f*
// @include      http://tieba.baidu.com/p*
// @namespace https://greasyfork.org/users/85
// @downloadURL https://greasyfork.org/scripts/369/code.user.js
// @updateURL https://greasyfork.org/scripts/369/code.meta.js
// ==/UserScript==
(function(){
	if(document.getElementsByClassName("tbworld_lv2_gray")[0]){
if(document.getElementsByClassName("j_VIP_score score_egg")[0]){
var temp=document.getElementsByClassName("j_VIP_score score_egg")[0];temp.parentNode.removeChild(temp);}}

document.getElementsByClassName("j_score_open")[0].onclick=function(){
temp1=document.getElementsByClassName("j_limit_error");
temp2=document.getElementsByClassName("info_num");
for(i=0;i<temp1.length;i++){
temp2[i].innerHTML=temp1[i].innerHTML.substring(5);}
}
var temp=/^http:\/\/tieba\.baidu\.com\/f/i;
if(temp.test(location.href)){
if(document.getElementsByClassName("reward_frs_list_wrap")){
	temp=document.getElementsByClassName("reward_frs_list_wrap")
	for(i=0;i<temp.length;i++){
		var tdN=/^..*0/i
	if(!tdN.test(temp[i].firstChild.textContent))
		
alert(temp[i].textContent);break;};

}
}
document.getElementsByClassName("j_score_open")[0].innerHTML="显示条件";

setTimeout(function(){
document.getElementsByClassName("time_gift")[0].click();
if(document.getElementsByClassName("score_egg")[0])
document.getElementsByClassName("score_egg")[0].click();
document.getElementsByClassName("j_score_open")[0].click();
temp1=document.getElementsByClassName("j_limit_error");
temp2=document.getElementsByClassName("info_num");
for(i=0;i<temp1.length;i++){
temp2[i].innerHTML=temp1[i].innerHTML.substring(5);
}
},1000);
setTimeout(function(){
temp1=document.getElementsByClassName("j_limit_error");
temp2=document.getElementsByClassName("info_num");
for(i=0;i<temp1.length;i++){
temp2[i].innerHTML=temp1[i].innerHTML.substring(5);}
},3000);

})();