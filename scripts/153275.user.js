// ==UserScript==
// @name         InputBox Controller
// @author       izml
// @description  为输入框添加控制按钮，使其可以像 IE10 那样清除数据和显示密码！
// @version      0.1.6.0
// @created      2012-12-1
// @lastUpdated  2012-12-3
// @grant        none
// @run-at       document-start
// @namespace    http://userscripts.org/users/izml
// @homepage     http://userscripts.org/scripts/show/153275
// @updateURL    https://userscripts.org/scripts/source/153275.meta.js
// @downloadURL  https://userscripts.org/scripts/source/153275.user.js
// @include  http*
// ==/UserScript==

window.onload=InputCtrl;
window.addEventListener('DOMContentLoaded',InputCtrl,false);
function InputCtrl(){
	var opacity=0.15;		// 图标不透明度
	var AutoHidePwd=true;	// 自动隐藏密码
	var CtrlInput=false;
	try{if(document.doctype.name=='wml')return;}catch(evt){};
	var ins=document.getElementsByTagName('input');
	for(var i=ins.length-1;i>=0;i--){
		var input=ins[i];
		if(input.disabled) continue;
			var c=input.previousElementSibling;
		if(c!=null){
			if(c.tagName=='INPUTCTRL'){
				ChangePos(c,input);
				continue;
			}
		}
		var elem=document.createElement('InputCtrl');
		switch(input.type){
			case 'text': case 'email':
			case 'tel':
				elem.title='点击清除输出的内容！';
				elem.style.background='url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABPUlEQVR42tXTzStEURjH8dHkXUkxSMqe+A8MQvhTZE+yoWSjlJX8Fyy9ZDeYlfwNSl7m2ikXje9Tv1un69y35Zz61Myce3+dOc/zlEqtuvoy9tvRmTdsGtsYSwlbxjq68oRdoIFDDHqemUUNATbTQidwhh808YkjVLRfxhzutW8+sJEUOoxdvDsvvGJfewu4wZezf4sVXcO/1YZR3V+gF37xghPUnbBQ3+3EHVn32IsdPDsn+XY+hzrpfJG2GVBo4ARF6gorFwm0h5fwGAuzk55ipGhj+woQecNB3lCrVlV/K3Tu7CFWKKv+MYbSwqxaa7iLFeAai55CRX06nhQ4hSvnZE2FV3WnvkI19Jt39rs1n08KrWnM4i21pea3Al1qXBNXv0bJHlxNaForxh7OMZOnMD2YzJiAima/BdcfNBhmqx0AwNkAAAAASUVORK5CYII=)';
				elem.onclick=function(e){
					e.target.style.display='none';
					var t=e.target.nextElementSibling
					t.value='';
					t.focus();
				};
				insertBefore(elem,input);
				break;
			case 'password':
				elem.title='点击显示/隐藏密码！';
				elem.style.background='url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAA8ElEQVR42mNgGAX0BBxArALETkDsB8UuQKwFxDykGsYCxHZAvByIzwLxWyD+CcUg9mUg3gjEHkDMRsgwJiA2AOKdQPwbiP8D8WcgXgzEGUCcAsSzgfg9VO4vEB8GYiOoQ7ACF6gr/kPxRyAugwYDDIBclodkMAhfhboaAyhBvfYfCS+EGhgExOeB+C4QR0HFFqKpfQ8NfxTQjqYIhBOgcjeRxK5DxbKwqG8l19DbULEMLOrbSfX+RXK8D4uo62RE1E1cEQVLUmbQZIKepNKAOAlLkjoNxBb4khS+xP8bit+jJX4OSrJpABSTnU1HwSAEABh0afnLZ5nIAAAAAElFTkSuQmCC)';
				elem.type='pwd';
				if(AutoHidePwd){
					elem.onmouseover=function(e){
						e.target.nextElementSibling.removeEventListener('blur',SetPwd,false);
					};
					elem.onmouseleave=function(e){
						if(e.target.getAttribute('hide')=='1')
							e.target.nextElementSibling.addEventListener('blur',SetPwd,false);
					};
				}
				elem.onclick=function(e){
					var pwd=e.target.nextElementSibling;
					pwd.removeEventListener('blur',SetPwd,false)
					pwd.type = (pwd.type=='text') ? 'password' : 'text';
					pwd.focus();
					if(!AutoHidePwd) return;
					var b = (e.shiftKey) ? '0' : '1';
					e.target.setAttribute('hide',b);
				};
				input.onkeypress=function(e){if(e.keyCode==13)SetPwd(e);};
				insertBefore(elem,input);
				break;
			default:break;
		}
	}
	if(CtrlInput){
		var style=document.createElement('style');
		style.innerHTML='InputCtrl{position:absolute; display:none; width:20px; height:20px; background-repeat:no-repeat !important; background-position:center !important; opacity:'+opacity+'; z-index:9;} InputCtrl:hover{cursor:pointer; opacity:1;}';
		document.head.appendChild(style);
	}
	function insertBefore(e,i){
		CtrlInput=true;
		i.parentNode.insertBefore(e,i);
		i.oninput=InputState;
		ChangePos(e,i);
	}
	function ChangePos(e,i){
		if(arguments.length>1){
			var c=e;
			if(i.offsetParent==null){
				c.style.marginLeft='280px';
				i.addEventListener('mouseover',ChangePos,false);
				return;
			}
		} else {
			var i=e.target;
			i.removeEventListener('mouseover',ChangePos,false);
			var c=i.previousElementSibling;
		}
		SetCtrlVis(c,i);
		c.style.height=i.offsetHeight+'px';
		SetCtrlPos(c.previousSibling,c,i);
	}
	function SetCtrlPos(p,c,i){
		if(c.getAttribute('Pos')=='1') return;
		if(p!=null){
			if(p.nodeType==3){
				if(/^\s+$/.test(p.textContent)){
					SetCtrlPos(p.previousSibling,c,i);
				} else {
				var left=i.offsetLeft+i.offsetWidth-c.offsetLeft-24;
				SetCtrlXY(c,i.offsetTop-c.offsetTop,left);
				}
				return;
			}
			if(p.type=='hidden'){
				SetCtrlXY(c,i.offsetTop-c.offsetTop,i.offsetWidth-24);
				return
			}
			if(p.tagName!="BR"){
				var top=i.offsetTop-p.offsetTop;
				var left=i.offsetLeft-p.offsetLeft;
				if(p.offsetParent==null || (top==0 && left==0) ||c.offsetTop>=p.offsetTop+p.offsetHeight){
					SetCtrlXY(c,0,i.offsetWidth-24);
					return;
				}
				if(top>=p.offsetHeight){
					var left=i.offsetLeft+i.offsetWidth-c.offsetLeft-24;
					SetCtrlXY(c,top,left);
					return;
				}
			}
		} else if(i.nextSibling==null){
			var p=i.parentNode;
			if(p.tagName!='TD'){
			c.style.height=(p.offsetHeight)+'px';
			}
			SetCtrlXY(c,i.offsetTop-c.offsetTop,i.offsetWidth-24);
			return
		}
		SetCtrlXY(c,0,i.offsetWidth-24);
	}
	function SetCtrlXY(c,top,left){
		if(top!=0) c.style.marginTop=top+'px';
		c.style.marginLeft=left+'px';
		c.setAttribute('Pos','1');
	}
	function SetCtrlVis(c,i){
		if(i.value && i.value!='')
			c.style.display='inline';
		else c.style.display='';
	}
	function InputState(e){
		var i=e.target;
		SetCtrlVis(i.previousElementSibling,i);
	}
	function SetPwd(e){e.target.type='password';}
}
