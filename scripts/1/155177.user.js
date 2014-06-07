// ==UserScript==
// @name       贴吧坟贴提醒（脚本版）
// @version    0.6
// @description  修改自：http://tieba.baidu.com/p/1748230170 原扩展作者864907600cc，修改者h573980998
// @homepage	https://userscripts.org/scripts/show/155177
// @downloadURL	https://userscripts.org/scripts/source/155177.user.js
// @updateURL	https://userscripts.org/scripts/source/155177.meta.js
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com/i/*
// @copyright  2012+, You
// @grant       none
// @run-at document-end
// ==/UserScript==
var bac=false;
var get_title_name=document.title.split('_');
addcss();
window.onload=ft_cr;
/////////////插入设置界面
function ft_cr()
{
var cx=document.createElement('li');
cx.id='this_ft';

var this_ft_txt;
document.getElementsByClassName('u_ddl_con_top')[1].getElementsByTagName('ul')[0].appendChild(cx);
if(get_title_name.length>1){
	var tc=pd_this_ft_t();
	this_ft_txt='该吧坟帖判定为<input id="ft_time" name="ft_time" type="text" style="border:1px solid gray;" size="3"title="当值改变时保存\n为空时清除对此吧的设置" value="'+tc+'">天';
}
else{
	this_ft_txt='默认坟帖判定为<input id="ft_time" name="ft_time" type="text" style="border:1px solid gray;" size="3"title="当值改变时保存\n且不能为空"value="'+((localStorage.getItem('this_ft_ba_time') != null) ? localStorage.getItem('this_ft_ba_time') : 30)+'">天';
}
cx.innerHTML='<div style="padding: 2px 0px 4px 4px;">'+this_ft_txt+'</div>';
//change
document.getElementById('ft_time').addEventListener("change",function(){ft_set(this.value)});
}
function ft_set(ft_va){
if(/^[0-9]*$/.test(ft_va)){
	if(get_title_name.length>1){
		var find_n=true;
		var bxxx=get_title_name.slice(-2)[0].split('吧')[0];
		if(localStorage.getItem('this_ft_ba')){
			var bas=localStorage.getItem('this_ft_ba').split(';');
			for(var i=0;i<=bas.length-1;i++){
				var baa=bas[i].split(',');
				if (baa[0]==bxxx){
				if(ft_va=="") bas[i]="";
				else bas[i]=bxxx+","+ft_va;
				localStorage.setItem('this_ft_ba',bas.join(";").replace(/\;;/g,';'));
				find_n=false;
				break;
				}
			}
		}
		if(find_n){
			if(localStorage.getItem('this_ft_ba')) localStorage.setItem('this_ft_ba',(localStorage.getItem('this_ft_ba')+";"+bxxx+","+ft_va).replace(/\;;/g,';'));
		else localStorage.setItem('this_ft_ba',bxxx+","+ft_va);
		}
		run("保存设置成功");
	}
	else{
		if(ft_va) {
			localStorage.setItem('this_ft_ba_time',ft_va);
			run("保存设置成功");
		}
		else run("默认坟帖判定天数不能为空");	
	}
}
else run("字符不合法! 坟贴标准必须是数字");
}
////////////判断是否有设置
//var bac=false;
function pd_this_ft_t(){
bac=false;
var bat=(localStorage.getItem('this_ft_ba_time') != null) ? localStorage.getItem('this_ft_ba_time') : 30;
var ba=get_title_name.slice(-2)[0].split('吧')[0];
if(localStorage.getItem('this_ft_ba')){
	var bas=localStorage.getItem('this_ft_ba').split(';');
	for(var i=0;i<=bas.length-1;i++){
		var baa=bas[i].split(',');
		if (baa[0]==ba){
			bat=baa[1];
			bac=true;
			break;
		}
	}
}
return bat;
}

if(document.getElementsByClassName('l_post')[0]){
var x=parseInt((new Date()- Date.parse(JSON.parse(document.getElementsByClassName('l_post')[0].getAttribute('data-field')).content.date.replace(/-/g,"/")))/86400000);
if(x>pd_this_ft_t()){
run('此贴已存在'+x+'天，已为坟贴，请勿回复。ㄟ(￣▽￣ㄟ)' );}}
function run(xmx){
var _=document.createElement('div');
_.id='old-thread';
document.body.appendChild(_);
//var text='此贴已存在'+x+'天，已为坟贴，请勿回复。ㄟ(￣▽￣ㄟ)' 
_.innerHTML='<p>'+xmx+'</p>';
}
function addcss(){
var a=document.createElement('style');
a.type='text/css';a.textContent='@-webkit-keyframes  hide{from{z-index:99999;opacity:0}20%{z-index:99999;opacity:1}80%{z-index:99999;opacity:1}to{z-index:99999;opacity:0}}#old-thread{width: 100%;text-align: center;color: white;font-size: 32px;top: 50%;margin-top: -59px;vertical-align: middle;position: fixed;z-index: -99999;opacity:0;-webkit-animation-name:hide;-webkit-animation-duration:5s;animation-name: hide;animation-duration:5s;pointer-events:none;-webkit-user-select:none;user-select:none}#old-thread p{background: rgba(255, 119, 119, .5);padding-top: 50px;padding-bottom: 50px;text-shadow: red 0 0 5px,red 0 0 5px,red 0 0 7px,red 0 0 7px,red 0 0 10px,red 0 0 10px,red 0 0 15px,red 0 0 15px;}@keyframes  hide {from{z-index:99999;opacity:0}20%{z-index:99999;opacity:1}80%{z-index:99999;opacity:1}to{z-index:99999;opacity:0}}';
document.documentElement.appendChild(a);}