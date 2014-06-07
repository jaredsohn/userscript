// ==UserScript==
// @name           武林英雄 屏蔽用戶 (50Hero Block User)
// @namespace      http://www.50hero.com.tw/
// @include        http://*.50hero.com.tw/
// ==/UserScript==

var scriptCode = new Array();
scriptCode.push('var block_name = new Array();');
scriptCode.push('block_name.push("屏蔽用戶1");');
scriptCode.push('block_name.push("屏蔽用戶2");');
scriptCode.push('block_name.push("屏蔽用戶3");');

scriptCode.push('classIm.prototype.onData=function(data) {');
scriptCode.push(' var u=data.split(\'|\')[2];');
scriptCode.push(' for(var i=0; i<block_name.length; i++)');
scriptCode.push('  if(u==block_name[i])');
scriptCode.push('   return true;');
scriptCode.push(' if(this.debug==1)this.showStatus(\'---返回請求---\'+data);');
scriptCode.push(' this.defaultHandle(data) }');

scriptCode.push('classIm.prototype.loadMenu=function() {');
scriptCode.push(' if(this.right_menu.length==0) return false;');
scriptCode.push(' var div_Menu=document.createElement("ul");');
scriptCode.push(' div_Menu.id="div_RightMenu";');
scriptCode.push(' div_Menu.className="im_RightMenu";');
scriptCode.push(' for(var i=0,l=this.right_menu.length;i<l+1;i++) {');
scriptCode.push('  var div_MenuItem=document.createElement("li");');
scriptCode.push('  div_MenuItem.className="im_RightMenuItem";');
scriptCode.push('  div_MenuItem.onmousemove=function(){this.className=\'im_RightMenuItem_over\'};');
scriptCode.push('  div_MenuItem.onmouseout=function(){this.className=\'im_RightMenuItem\'};');
scriptCode.push('  div_MenuItem.innerHTML=i<l?this.right_menu[i]:"屏蔽用戶";');
scriptCode.push('  div_MenuItem.value=i;');
scriptCode.push('  div_Menu.appendChild(div_MenuItem) }');
scriptCode.push(' this.$("im_center").appendChild(div_Menu) }');

scriptCode.push('classIm.prototype.rightclk=function(event,obj) {');
scriptCode.push(' if(this.right_menu.length==0) return false;');
scriptCode.push(' var self=this;');
scriptCode.push(' var m=this.$("div_RightMenu");');
scriptCode.push(' this.mouseX=event.clientX;');
scriptCode.push(' this.mouseY=event.clientY;');
scriptCode.push(' for(var i=0,l=m.childNodes.length;i<l;i++)');
scriptCode.push('  if(m.childNodes[i].innerHTML=="屏蔽用戶") m.childNodes[i].onclick=function(){m.style.display="none";block_name.push(clsIm.get_value(obj))};');
scriptCode.push('  else m.childNodes[i].onclick=function(){m.style.display="none";self.menu_click(this.value,clsIm.get_value(obj))};');
scriptCode.push(' m.style.display="block";');
scriptCode.push(' if((this.mouseX+m.offsetWidth)>document.documentElement.clientWidth)m.style.left=this.mouseX-m.offsetWidth+document.documentElement.offsetLeft+\'px\';');
scriptCode.push('  else m.style.left=this.mouseX+document.documentElement.offsetLeft+\'px\';');
scriptCode.push(' if((this.mouseY+m.offsetHeight)>document.documentElement.clientHeight)m.style.top=this.mouseY-m.offsetHeight+document.documentElement.offsetTop+\'px\';');
scriptCode.push('  else m.style.top=this.mouseY+document.documentElement.offsetTop+\'px\' }');

var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;

document.getElementsByTagName('head')[0].appendChild(script); 
