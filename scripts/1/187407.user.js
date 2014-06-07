// ==UserScript==
// @name       人人皮肤随心变
// @version    1.0
// @description  无需VIP，即可体验人人网首页缤(chou)纷(lou)的皮肤
// @homepage	https://userscripts.org/scripts/show/187407
// @downloadURL	https://userscripts.org/scripts/source/187407.user.js
// @updateURL	https://userscripts.org/scripts/source/187407.meta.js
// @include     http://www.renren.com/*
// @grant       none
// @run-at document-end
// ==/UserScript==
window.onload=trial_load;

////插入设置界面
function trial_load(){
var tip=document.createElement('div');
tip.id='trial_tip';
var trial_tip_txt;
document.getElementsByClassName('fortuneBar')[0].appendChild(tip);
var trialid=judge_res();
trial_tip_txt='体验本页第<input id="trial_num" name="trial_num" type="text" style="border:1px solid gray;" title="当值改变时保存"value="'+1+'">个皮肤';//size="3" 
tip.innerHTML='<div>'+trial_tip_txt+'</div>';
//change
document.getElementById('trial_num').addEventListener("change",function(){trial_set(this.value)});

changeHomeStyle(trialid);
}
function trial_set(trial_num){
if(/^[0-9]*$/.test(trial_num)){
	if(trial_num&&trial_num<=10) {
	    var trial_id;
	    trial_id = document.getElementsById('skin-good-content')[0].getElementsByTagName('li')[trial_num-1].id.split('_')[1];
		localStorage.setItem('trial_id_stor',trial_id);
		alert("保存设置成功");
	}
	else alert("皮肤序号不能为空");	
}
else alert("字符不合法! 皮肤序号必须是数字");
}

////判断是否有设置
function judge_res(){
var res=(localStorage.getItem('trial_id_stor') != null) ? localStorage.getItem('trial_id_stor') : 39;
return res;
}