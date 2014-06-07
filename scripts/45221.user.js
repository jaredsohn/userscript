// ==UserScript==
// @name           Gaia Market Link Re-builder
// @description    Enable middle click when selling stuff on Gaia.
// @include        http://www.gaiaonline.com/marketplace/mystore/showinventory/*
// ==/UserScript==
GM_addStyle("#items_tabview .isEquipped,#items_tabview .isSoulBound{display:none;}");
window.addEventListener("load",function(){
	var tabHolder=document.getElementsByClassName("yui-nav")[0];
	var li=document.createElement("li");
	li.innerHTML='<input type="button" id="enable_button_2" title="DO NOT OVER CLICK ME - Every extra click makes it open extra tabs" onclick="this.disabled=\'disabled\';setTimeout(function(){document.getElementById(\'enable_button_2\').removeAttribute(\'disabled\')},3000)" value="Enable middle click for this inventory page"/>';
	li.style.marginLeft='85px';
	tabHolder.appendChild(li);
	li.childNodes[0].addEventListener("click",function(){
		try{
			var li=document.evaluate('.//div[@id="items_tabview"]/div[@class="yui-content"]/div[not(contains(@class,"yui-hidden"))]/ul/li', document, null, 6, null);
		}
		catch(err){
			alert(err+"\nWait for tab to load, ok");
			return;
		}
		for(var i=0;i<li.snapshotLength;i++){
			li.snapshotItem(i).addEventListener("mouseup",function(event){
					if(event.which==2){
						var id=this.getAttribute('data-slot').split('.');
						window.open("/marketplace/mystore/sell/?item_id="+id[1]+"&item_param="+id[0]+"&item_param2=1");
					}
			},false);
		}
	},false);
	li=document.createElement("li");
	li.innerHTML='<input type="button" onclick="window.open(\'http://www.howtogeek.com/howto/internet/firefox/disable-that-irritating-autoscroll-feature-in-firefox/#post-1077\');" value="Problems?"/>';
	tabHolder.appendChild(li);
},false);