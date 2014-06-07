// ==UserScript==
// @name           Gaia Online Mule Tool V2
// @description    Easy way to switch/manage accounts on Gaia Online.
// @include        http://www.gaiaonline.com/*
// @include        https://www.gaiaonline.com/*
// @updateURL      https://userscripts.org/scripts/source/56658.meta.js
// @downloadURL    https://userscripts.org/scripts/source/56658.user.js 
// @version        2.9.11
// ==/UserScript==
function getEle(tag,attr,val){
	return document.evaluate('.//'+tag+'[@'+attr+'="'+val+'"]', document, null, 9, null).singleNodeValue;
}
function getId(id){
	return document.getElementById(id);
}
function sendEvent(ele,e){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(e, true, true);
	ele.dispatchEvent(evt);
}
function getURL(findMe,txt){
	if(!txt)
		txt=location.search;
	if(txt){
		txt=txt.slice(1);
		txt=txt.slice(txt.indexOf(findMe+'='));
		var l=txt.indexOf('&');
		if(l!=-1){
			return txt.slice(findMe.length+1,l);
		}
		else{
			return txt.slice(findMe.length+1);
		}
	}
	return null;
}
function chunkify(t){ /* This function from http://my.opera.com/GreyWyvern/blog/show.dml/1671288 */
	var tz = [], x = 0, y = -1, n = 0, i, j;
	while (i = (j = t.charAt(x++)).charCodeAt(0)) {
		var m = (i == 46 || (i >=48 && i <= 57));
		if (m !== n) {
			tz[++y] = "";
			n = m;
		}
		tz[y] += j;
	}
	return tz;
}
function sortAlphaNumAsc(a, b){ /* This function from http://my.opera.com/GreyWyvern/blog/show.dml/1671288 */
	var aa,bb;
	if(GM_getValue('sortCase',false)){
		aa = chunkify(a);
		bb = chunkify(b);
	}
	else{
		aa = chunkify(a.toLowerCase());
		bb = chunkify(b.toLowerCase());
	}
	for (x = 0; aa[x] && bb[x]; x++) {
		if (aa[x] !== bb[x]) {
			var c = Number(aa[x]), d = Number(bb[x]);
			if (c == aa[x] && d == bb[x]) {
				return c - d;
			} else return (aa[x] > bb[x]) ? 1 : -1;
		}
	}
	return aa.length - bb.length;
}
function sortAlphaNumDes(a, b){ /* This function from http://my.opera.com/GreyWyvern/blog/show.dml/1671288 */
	var aa,bb;
	if(GM_getValue('sortCase',false)){
		aa = chunkify(a);
		bb = chunkify(b);
	}
	else{
		aa = chunkify(a.toLowerCase());
		bb = chunkify(b.toLowerCase());
	}
	for (x = 0; aa[x] && bb[x]; x++) {
		if (aa[x] !== bb[x]) {
			var c = Number(aa[x]), d = Number(bb[x]);
			if (c == aa[x] && d == bb[x]) {
				return d - c;
			} else return (aa[x] > bb[x]) ? -1 : 1;
		}
	}
	return bb.length - aa.length;
}
function safeMode(){
	var TF=GM_getValue('safeMode',false);
	if(confirm('If this setting is set to true it will log you in using your User Id instead of your username.\nThis is useful if Gaia is being stubborn with your User Name.\nCurrent setting is '+TF+'.\nChange it?')===true){
		if(TF===true){
			GM_setValue('safeMode',false);
		}
		else{
			GM_setValue('safeMode',true);
		}
	}
	return;
}
function sortConfig(){
	var sort={"sort":GM_getValue('sortEnable',true),"by_name":GM_getValue('sortName',false),"id_asc":GM_getValue('sortIdAsc',true),"by_case":GM_getValue('sortCase',false),"name_asc":GM_getValue('sortNameAsc',true)};
	sort=window.showModalDialog(
		'data:text/html;base64,PGh0bWw+Cgk8aGVhZD4KCQk8dGl0bGU+Q29uZmlndXJlIFNvcnRpbmc8L3RpdGxlPgoJCTxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KCQkJZnVuY3Rpb24gbG9hZChqc29uLGUpewoJCQkJZS5zb3J0LmNoZWNrZWQ9anNvblsic29ydCJdOwoJCQkJZS5ieV9uYW1lW2pzb25bImJ5X25hbWUiXT8xOjBdLmNoZWNrZWQ9dHJ1ZTsKCQkJCWUuaWRfYXNjW2pzb25bImlkX2FzYyJdPzA6MV0uY2hlY2tlZD10cnVlOwoJCQkJZS5ieV9jYXNlLmNoZWNrZWQ9anNvblsiYnlfY2FzZSJdOwoJCQkJZS5uYW1lX2FzY1tqc29uWyJuYW1lX2FzYyJdPzA6MV0uY2hlY2tlZD10cnVlOwoJCQkJZGlzYWJsZUl0ZW1zKCk7CgkJCX0KCQkJZnVuY3Rpb24gZGlzYWJsZUl0ZW1zKCl7CgkJCQl2YXIgZT1kb2N1bWVudC5zb3J0Rm9ybTsKCQkJCWlmKGUuc29ydC5jaGVja2VkPT09ZmFsc2UpewoJCQkJCWUuYnlfbmFtZVswXS5kaXNhYmxlZD0iZGlzYWJsZWQiOwoJCQkJCWUuYnlfbmFtZVsxXS5kaXNhYmxlZD0iZGlzYWJsZWQiOwoJCQkJCWUuaWRfYXNjWzBdLmRpc2FibGVkPSJkaXNhYmxlZCI7CgkJCQkJZS5pZF9hc2NbMV0uZGlzYWJsZWQ9ImRpc2FibGVkIjsKCQkJCQllLmJ5X2Nhc2UuZGlzYWJsZWQ9ImRpc2FibGVkIjsKCQkJCQllLm5hbWVfYXNjWzBdLmRpc2FibGVkPSJkaXNhYmxlZCI7CgkJCQkJZS5uYW1lX2FzY1sxXS5kaXNhYmxlZD0iZGlzYWJsZWQiOwoJCQkJfQoJCQkJZWxzZXsKCQkJCQllLmJ5X25hbWVbMF0ucmVtb3ZlQXR0cmlidXRlKCJkaXNhYmxlZCIpOwoJCQkJCWUuYnlfbmFtZVsxXS5yZW1vdmVBdHRyaWJ1dGUoImRpc2FibGVkIik7CgkJCQkJaWYoZS5ieV9uYW1lWzBdLmNoZWNrZWQ9PT10cnVlKXsKCQkJCQkJZS5pZF9hc2NbMF0ucmVtb3ZlQXR0cmlidXRlKCJkaXNhYmxlZCIpOwoJCQkJCQllLmlkX2FzY1sxXS5yZW1vdmVBdHRyaWJ1dGUoImRpc2FibGVkIik7CgkJCQkJCWUuYnlfY2FzZS5kaXNhYmxlZD0iZGlzYWJsZWQiOwoJCQkJCQllLm5hbWVfYXNjWzBdLmRpc2FibGVkPSJkaXNhYmxlZCI7CgkJCQkJCWUubmFtZV9hc2NbMV0uZGlzYWJsZWQ9ImRpc2FibGVkIjsKCQkJCQl9CgkJCQkJZWxzZXsKCQkJCQkJZS5pZF9hc2NbMF0uZGlzYWJsZWQ9ImRpc2FibGVkIjsKCQkJCQkJZS5pZF9hc2NbMV0uZGlzYWJsZWQ9ImRpc2FibGVkIjsKCQkJCQkJZS5ieV9jYXNlLnJlbW92ZUF0dHJpYnV0ZSgiZGlzYWJsZWQiKTsKCQkJCQkJZS5uYW1lX2FzY1swXS5yZW1vdmVBdHRyaWJ1dGUoImRpc2FibGVkIik7CgkJCQkJCWUubmFtZV9hc2NbMV0ucmVtb3ZlQXR0cmlidXRlKCJkaXNhYmxlZCIpOwoJCQkJCX0KCQkJCX0KCQkJfQoJCQlmdW5jdGlvbiBzYXZlKGUpewoJCQkJd2luZG93LnJldHVyblZhbHVlPXsic29ydCI6ZS5zb3J0LmNoZWNrZWQsImJ5X25hbWUiOmUuYnlfbmFtZVsxXS5jaGVja2VkLCJpZF9hc2MiOmUuaWRfYXNjWzBdLmNoZWNrZWQsImJ5X2Nhc2UiOmUuYnlfY2FzZS5jaGVja2VkLCJuYW1lX2FzYyI6ZS5uYW1lX2FzY1swXS5jaGVja2VkfTsKCQkJCXdpbmRvdy5jbG9zZSgpOwoJCQl9CgkJPC9zY3JpcHQ+CgkJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCQkJdWwsbGl7CgkJCQlsaXN0LXN0eWxlOm5vbmU7CgkJCX0KCQkJZm9ybXsKCQkJCW1hcmdpbi1ib3R0b206MDsKCQkJfQoJCQlmb3JtID4gdWx7CgkJCQltYXJnaW46MDsKCQkJCXBhZGRpbmctbGVmdDowOwoJCQl9CgkJCXN1cHsKCQkJCWxpbmUtaGVpZ2h0OjFlbTsKCQkJfQoJCQlpbnB1dFt0eXBlPSJidXR0b24iXXsKCQkJCWZsb2F0OnJpZ2h0OwoJCQl9CgkJPC9zdHlsZT4KCTwvaGVhZD4KCTxib2R5IG9ubG9hZD0ibG9hZCh3aW5kb3cuZGlhbG9nQXJndW1lbnRzLGRvY3VtZW50LnNvcnRGb3JtKTsiPgoJCTxmb3JtIG5hbWU9InNvcnRGb3JtIiBvbnN1Ym1pdD0ic2F2ZSh0aGlzKTsiIGFjdGlvbj0iIyI+CgkJCTx1bD4KCQkJCTxsaT48aW5wdXQgbmFtZT0ic29ydCIgb25jaGFuZ2U9ImRpc2FibGVJdGVtcygpOyIgdHlwZT0iY2hlY2tib3giLz5FbmFibGUgU29ydGluZzxzdXA+WzFdWzJdPC9zdXA+CgkJCQkJPHVsPgoJCQkJCQk8bGk+PGlucHV0IG5hbWU9ImJ5X25hbWUiIG9uY2hhbmdlPSJkaXNhYmxlSXRlbXMoKTsiIHR5cGU9InJhZGlvIi8+QnkgYWNjb3VudCBJRAoJCQkJCQkJPHVsPgoJCQkJCQkJCTxsaT48aW5wdXQgbmFtZT0iaWRfYXNjIiB0eXBlPSJyYWRpbyIvPk9sZGVzdCB0byBuZXdlc2V0PC9saT4KCQkJCQkJCQk8bGk+PGlucHV0IG5hbWU9ImlkX2FzYyIgdHlwZT0icmFkaW8iLz5OZXdlc3QgdG8gb2xkZXN0PC9saT4KCQkJCQkJCTwvdWw+CgkJCQkJCTwvbGk+CgkJCQkJCTxsaT48aW5wdXQgY2hlY2tlZD0iY2hlY2tlZCIgbmFtZT0iYnlfbmFtZSIgb25jaGFuZ2U9ImRpc2FibGVJdGVtcygpOyIgdHlwZT0icmFkaW8iLz5CeSBhY2NvdW50IG5hbWUKCQkJCQkJCTx1bD4KCQkJCQkJCQk8bGk+PGlucHV0IG5hbWU9ImJ5X2Nhc2UiIHR5cGU9ImNoZWNrYm94Ii8+SWdub3JlIENhc2U8c3VwPlszXTwvc3VwPjwvbGk+CgkJCQkJCQkJPGxpPjxpbnB1dCBuYW1lPSJuYW1lX2FzYyIgdHlwZT0icmFkaW8iLz5Bc2NlbmRpbmcgKDAgdG8geik8L2xpPgoJCQkJCQkJCTxsaT48aW5wdXQgbmFtZT0ibmFtZV9hc2MiIHR5cGU9InJhZGlvIi8+RGVzY2VuZGluZyAoeiB0byAwKTwvbGk+CgkJCQkJCQk8L3VsPgoJCQkJCQk8L2xpPgoJCQkJCTwvdWw+CgkJCQk8L2xpPgoJCQk8L3VsPgoJCQk8aW5wdXQgdmFsdWU9IlNhdmUiIHR5cGU9InN1Ym1pdCI+PGlucHV0IHZhbHVlPSJDYW5jZWwiIG9uY2xpY2s9IndpbmRvdy5jbG9zZSgpOyIgdHlwZT0iYnV0dG9uIi8+PGJyLz4KCQkJPHNtYWxsPjEuIEFsbG93cyB5b3UgdG8gbWFudWFsbHkgb3JkZXIgdGhlIGFjY291bnRzIGJ5IGRlbGV0aW5nIGFuZCBhZGRpbmcgdGhlbSBpbiB0aGUgb3JkZXIgeW91IGRlc2lyZS48YnIvPgoJCQkyLiBTb3J0aW5nIGFjY291bnRzIGRlbGV0ZXMgYW55IGN1c3RvbSBvcmRlci48YnIvPgoJCQkzLiBJZiBjaGVja2VkIEEgY29tZXMgYmVmb3JlIGEgd2hlbiBBc2NlbmRpbmcsIGxpa2V3aXNlIHogY29tZXMgYmVmb3JlIFogd2hlbiBEZXNjZW5kaW5nLjwvc21hbGw+CgkJPC9mb3JtPgoJPC9ib2R5Pgo8L2h0bWw+Cg==',
		sort,
		"dialogwidth: 360; dialogheight: 300; resizable: yes; center: yes;"
	);
	if(sort==null){
		return false;
	}
	GM_setValue('sortEnable',sort["sort"]);
	GM_setValue('sortName',sort["by_name"]);
	GM_setValue('sortIdAsc',sort["id_asc"]);
	GM_setValue('sortCase',sort["by_case"]);
	GM_setValue('sortNameAsc',sort["name_asc"]);
	if(sort["sort"]===false){
		return false;
	}
	return true;
}	
function insertUserInverface(cId){
	var accounts='';
	try{
		var ids=JSON.parse(GM_getValue('accounts','{}'));
		for(var i in ids){
			if(cId!=i){
				accounts+='<option class="GM_indent" value="'+i+'">'+unescape(ids[i]["name"])+'</option>';
			}
			else{
				accounts+='<option disabled="disabled" class="GM_indent">'+unescape(ids[i]["name"])+'</option>';
				try{
					getId('GM_message').setAttribute('name',unescape(ids[i]["name"]));
				}
				catch(e){}
			}
		}
		var l=document.location.href;
		/*if(l.match('/marketplace/outfits')!=null){
			var pass=ids[cId]["pass"];
			if(pass.length>0){
				pass=pass.split(',')[1];
				if(pass.length>0){
					window.addEventListener("load",function(){
						var outFitMarket=getEle("div","class","yui3-widget-bd gmodal-body");
						if(outFitMarket){
							outFitMarket.addEventListener("DOMNodeInserted",function(){
								var blank=getId('ospassword');
								if(blank){
									if(blank.value==""){
										blank.focus();
										blank.value=pass;
										blank.addEventListener("keypress",function(event){
											if(event.which=13){
												this.blur();
												var btn=getEle("a","data-title","Buy It!");
												btn.click();
											}
										},false);
									}
								}
							},false);
						}
					},false);
				}
			}
		}
		else */if(l.match('/marketplace/')!=null||l.match('/gaia/bank.php')!=null||l.match('/giftgiving/')||l.match('/guilds-home/')){
			function passfill(l){
				try{
					var field=document.evaluate('.//input[@type="password"]',document,null,9,null).singleNodeValue;
					if(field.value.length==0)
						field.value=ids[cId]['pass'];
				}
				catch(e){/*there is no pass field*/}
				if(l.match('/marketplace/')!=null){
					setTimeout(function(){passfill(l)},1355);// probes page for pass field every 1.35 seconds
				}
			}
			passfill(l);
		}
	}
	catch(e){/*no accounts stored*/}
	n=getId('gmSelectLogin').parentNode;
	n.innerHTML=''+
		'<select class="'+cId+'" id="gmSelectLogin" onchange="this.blur();">'+
			'<option value="return">Change User...</option>'+
			'<option value="gmLogout">Logout</option>'+
			'<optgroup label="User Accounts">'+
				accounts+
			'</optgroup>'+
			'<optgroup label="Edit Tool Data">'+
				'<option class="GM_indent" value="addAccount">Add/Update this account</option>'+
				'<option class="GM_indent" value="delAccount">Remove this account</option>'+
			'</optgroup>'+
			'<optgroup class="GM_indent" label="Advanced">'+
				'<option class="GM_indent" value="addAccountAdv">Add/Update account</option>'+
				'<option class="GM_indent" value="delAccountAdv">Remove account</option>'+
				'<option class="GM_indent" value="genTable">Display account table</option>'+
				'<option class="GM_indent" value="sortConf">Configure account sorting</option>'+
				'<option class="GM_indent" value="toggleSM">Toggle Safe Mode</option>'+
			'</optgroup>'+
			'<optgroup label="Utilities">'+
				'<option class="GM_indent" value="dumpsterDive">Dumpster Dive</option>'+
				'<option class="GM_indent" value="getDaily">Get Daily Chances</option>'+
				'<option class="GM_indent" value="theDailyDive">Both of the above</option>'+
		//	*/	'<option class="GM_indent" value="theDailyDive">The Daily Dive</option>'+
			'</optgroup>'+
		'</select>';
	var GM_sel=getId('gmSelectLogin');
	GM_sel.addEventListener('change',function(e){
		GM_selectChange(GM_sel.value,cId,nonce);
	},false);
	GM_sel.addEventListener('mouseup',function(){// this is a little dirty, but it was quick and works
		setTimeout(function(){
			var ele0=getId('user_dropdown_arrow');
			if(ele0)
				sendEvent(ele0,'click');
		},0);
	},false);
}
function GM_updateIds(cId,accounts){
	var ids=[],sorted={},names=[];
	if(GM_getValue('sortEnable',true)===true){
		if(GM_getValue('sortName',false)===false){
			for(var i in accounts){
				ids.push(i);
			}
			if(GM_getValue('sortIdAsc',true)){ // The below line contains code from from http://www.w3schools.com/jsref/jsref_sort.asp
				ids.sort(function(a,b){return a-b;});
			}
			else{ // The below line contains code from from http://www.w3schools.com/jsref/jsref_sort.asp
				ids.sort(function(a,b){return b-a;});
			}
			for(var i=0;i<ids.length;i++){
				sorted[ids[i]]=accounts[ids[i]];
			}
		}
		else{
			for(var i in accounts){
				names.push(unescape(accounts[i]['name']));
			}
			names.sort(GM_getValue('sortNameAsc',true)?sortAlphaNumAsc:sortAlphaNumDes);
			while(names.length>0){
				for(var i in accounts){
					if(unescape(accounts[i]['name'])==names[0]){
						sorted[i]=accounts[i];
						names=names.splice(1,names.length);
						delete(accounts[i]);
					}
				}
			}
		}
	}
	else{
		sorted=accounts;
	}
	GM_setValue('accounts',JSON.stringify(sorted));
	getId('gmSelectLogin').selectedIndex=0;
	insertUserInverface(cId);
}
function Gm_Login(id){
	var ele=getId('memberloginForm');
	if (ele){
		ele.setAttribute('action','/auth/login/?username='+id);
		try{
			var accounts=JSON.parse(GM_getValue('accounts','{}'));
		}
		catch(e){
			return alert("Abort:\nUnable to parse account data!?\nWhich makes no sence since you can not be here if it can not be parsed :?\n\t"+e);
		}
		var pass=getId('password');
		if(GM_getValue('safeMode',false)===true){
			getId('username').value=id;
		}
		else{
			getId('username').value=unescape(accounts[id]['name']);
		}
		if(accounts[id]['pass']==''){
			var word=prompt('Warning: You will not be able to change accounts via the mule tool on this tab without restarting\nFirefox. Please vote on this bug: https://bugzilla.mozilla.org/show_bug.cgi?id=647727\nPassword for '+unescape(accounts[id]['name'])+'.');
			if(typeof word=='object'){
				alert("Login aborted");
				return;
			}
			pass.value=word;
		}
		else{
			pass.value=unescape(accounts[id]['pass']);
		}
		if(accounts[id]['auto']===true){
			getId('autologin').checked=true;
		}
		if(self!=top){ // Ensure page is in an iframe
			ele.target="_parent";
			var captcha=getId('recaptcha_image');
			if(captcha){
				getId('recaptcha_response_field').value=window.showModalDialog('data:text/html;base64,PGh0bWw+Cjxib2R5Pgo8c2NyaXB0Pgpkb2N1bWVudC53cml0ZSgiRGFtIENhcHRjaGE6PGJyLz4iK3dpbmRvdy5kaWFsb2dBcmd1bWVudHMpOwo8L3NjcmlwdD4KPGJyLz4KPGlucHV0IGlkPSJjYXB0Y2hhIiB0eXBlPSJ0ZXh0Ii8+CjxpbnB1dCB0eXBlPSJidXR0b24iIHZhbHVlPSJTdWJtaXQiIG9uY2xpY2s9IndpbmRvdy5yZXR1cm5WYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhJykudmFsdWU7IHdpbmRvdy5jbG9zZSgpOyI+CjwvYm9keT4KPC9odG1sPg==',captcha.innerHTML,"dialogwidth: 350; dialogheight: 150; resizable: yes");
			}
			var loc=self.parent.location.href;
			if(loc.indexOf('#')!=-1){
				loc=loc.slice(0,loc.indexOf('#'));
			}
			var redirect=redirect=document.getElementsByName('redirect');
			if(redirect.length>0){
				redirect[0].value=loc;
			}
			else{
				redirect=document.createElement('input');
				redirect.name='redirect';
				redirect.value=loc;
				redirect.type='hidden';
				ele.appendChild(redirect);
			}
			getId('signInButton').click();
			try{
				self.parent.document.getElementsByClassName('avatarName')[0].childNodes[0].textContent='Reloading page...';
			}
			catch(e){
				self.parent.document.getElementById('GM_message').textContent='Reloading page...';
			}
			setTimeout(function(){// Click it again cause gaia missed it the 1st time
				GM_log('reclick');
				getId('signInButton').click();
			},5800);
		}
	}
	else if(self!=top){
		document.location.reload();
	}
}
function GM_selectChange(newId,oldId,nonce){
	if(newId=='return'){
		return;
	}
	else if(newId==oldId){
		alert('That account is currently logged in.');
		getId('gmSelectLogin').selectedIndex=0;
	}
	else if(newId=='gmLogout'){
		try{
			var nameSpace=document.getElementsByClassName('avatarName')[0].childNodes[0];
		}
		catch(e){
			var nameSpace=getId('GM_message');
			nameSpace.parentNode.className='on';
		}
		var newName=nameSpace.getAttribute('name');
		document.getElementsByClassName('avatarName')[0].className+=' logout';
		nameSpace.textContent='Logging '+newName+' out.';
		var timeout=setTimeout(function(){
			nameSpace.textContent='Un-able to confirm logout of '+newName+'.';
			var gmSelectLogin=getId('gmSelectLogin');
			gmSelectLogin.disabled='disabled';
			gmSelectLogin.title='Refresh page to see if you are loged in.';
		},10000); // Wait 10 seconds 
		GM_xmlhttpRequest({
			method: "GET",
			url: location.protocol+"//"+document.domain+"/auth/logout/?userid="+oldId+'&nonce='+nonce,
			onload: function(){
				clearTimeout(timeout);
				nameSpace.textContent=newName+' has been logged out.';
				var gmSelectLogin=getId('gmSelectLogin');
				gmSelectLogin.disabled='disabled';
				gmSelectLogin.title='Refresh page to login.';
			},
			onerror: function(){
				clearTimeout(errortimer);
				alert('[Loading error]\nUn-able to confirm logout');
			}
		});
	}
	else if(newId=='addAccount'){
		var accounts=JSON.parse(GM_getValue("accounts","{}"));
		if(accounts[oldId]){
			var userName=accounts[oldId]["name"];
			var passWord=accounts[oldId]["pass"];
			if(confirm('Continue with changeing "'+unescape(userName)+'" login\'s data?')===false){
				getId('gmSelectLogin').selectedIndex=0;
				return;
			}
		}
		else{
			try{
				var userName=escape(document.getElementsByClassName('avatarName')[0].childNodes[0].textContent);
			}
			catch(e){
				return alert('This feature does not work on profiles\nUse the Advanced option. The user id is '+oldId);
			}
			var passWord='';
			if(confirm('Continue with adding the account "'+unescape(userName)+'"?')===false){
				getId('gmSelectLogin').selectedIndex=0;
				return;
			}
		}
		passWord=escape(prompt('Please insert the password for this account.\nLeave Blank to ask for it every time.',unescape(passWord)));
		if(passWord=='null'){
			if(confirm('If you clicked "Cancel" click "OK".')===true){
				passWord='';
			}
		}
		var autoLogin=confirm('Enable "Remember Me" for this account?');
		accounts[oldId]={"name":userName,"pass":passWord,"auto":Boolean(autoLogin)};
		GM_updateIds(oldId,accounts);
	}
	else if(newId=='delAccount'){
		var accounts=JSON.parse(GM_getValue("accounts","{}"));
		if(accounts[oldId]){
			if(confirm('Continue with removeing the account for '+unescape(accounts[oldId]["name"])+'?')===true){
				delete(accounts[oldId]);
			}
		}
		else{
			alert("You can't remove an account that does not exist.");
			getId('gmSelectLogin').selectedIndex=0;
			return;
		}
		GM_updateIds(oldId,accounts);
	}
	else if(newId=='addAccountAdv'){
		var accounts=JSON.parse(GM_getValue("accounts","{}"));
		var userId=prompt('Please insert the user ID.\nThis is a number.');
		if(!userId||isNaN(userId)===true){
			getId('gmSelectLogin').selectedIndex=0;
			return;
		}
		var userName=escape(prompt('Please insert the username.',accounts[userId]?unescape(accounts[userId]["name"]):''));
		if(accounts[userId]){
			if(confirm('Account already exist.\nContinue with changeing the account?')===false){
				getId('gmSelectLogin').selectedIndex=0;
				return;
			}
		}
		else{
			if(confirm('Continue with adding the account "'+unescape(userName)+'"?')===false){
				getId('gmSelectLogin').selectedIndex=0;
				return;
			}
		}
		var passWord=escape(prompt('Please insert the password for this account.\nLeave blank to ask for it every time.',accounts[userId]?unescape(accounts[userId]["pass"]):''));
		if(passWord=='null'){
			if(confirm('If you clicked "Cancel" click "OK".')===true){
				passWord='';
			}
		}
		var autoLogin=confirm('Enable "Remember Me" for this account?');
		accounts[userId]={"name":userName,"pass":passWord,"auto":Boolean(autoLogin)};
		GM_updateIds(oldId,accounts);
	}
	else if(newId=='delAccountAdv'){
		var nID=prompt('Account ID\nThis is a number.');
		if(!nID||isNaN(nID===true)){
			getId('gmSelectLogin').selectedIndex=0;
			return;
		}
		var accounts=JSON.parse(GM_getValue("accounts","{}"));
		if(accounts[nID]){
			var accounts=JSON.parse(GM_getValue("accounts","{}"));
			if(confirm('Continue with removeing the account '+unescape(accounts[nID]["name"])+'?')===true){
				delete(accounts[nID]);
			}
		}
		else{
			alert("You can't remove an account that does not exist.");
			getId('gmSelectLogin').selectedIndex=0;
			return;
		}
		GM_updateIds(oldId,accounts);
	}
	else if(newId=='genTable'){
		var div=document.createElement('div');
		var vals=JSON.parse(GM_getValue("accounts","{}"));
		var th='',td='';
		if(GM_getValue('sortEnable',true)===false){
			th='<td><h3>Move</h3></td>';
			td='<td>'+
				'<span onclick="var tr=this.parentNode.parentNode;tr.parentNode.insertBefore(tr,tr.parentNode.firstElementChild.nextElementSibling);">Way Up</span> | '+
				'<span onclick="var tr=this.parentNode.parentNode;if(tr.previousElementSibling.id)tr.parentNode.insertBefore(tr,tr.previousElementSibling);">Up</span> | '+
				'<span onclick="var tr=this.parentNode.parentNode;if(tr.nextElementSibling)tr.parentNode.insertBefore(tr,tr.nextElementSibling.nextElementSibling);">Down</span> | '+
				'<span onclick="var tr=this.parentNode.parentNode;tr.parentNode.appendChild(tr);">Way Down</span></td>';
		}
		var string='<span onclick="this.parentNode.parentNode.removeChild(this.parentNode);" id="GM_tableClose" title="Close">X</span><div id="GM_div4Table">'+
			'<table id="GM_accountTable" border="1"><tr style="text-align:center">'+
			'<td><h3>Delete</d3></td>'+
			'<td><h3>User Id</h3></td>'+
			'<td><h3>User Name</h3></td>'+
			'<td><h3><a title="Toggle Password Display" onclick="var x=document.getElementsByName(\'GM_passWord\');if(this.href.indexOf(\'#Show_Password\')>-1){for(var i=0;i<x.length;i++){x[i].type=\'text\';}this.href=this.href.replace(\'#Show_Password\',\'#Hide_Password\');}else{for(var i=0;i<x.length;i++){x[i].type=\'password\';}this.href=this.href.replace(\'#Hide_Password\',\'#Show_Password\');}return false;" href="#Show_Password">Password</a></h3></td>'+
			'<td><h3>Remember Me</h3></td>'+
			th+'</tr>';
		for(var i in vals){
			string+='<tr class="GM_account" id="'+i+'"><td style="text-align:center;"><input type="checkbox" onchange="this.parentNode.parentNode.className=this.checked?\'GM_account delete\':\'GM_account\'"/></td><td>'+i+'</td><td>'+unescape(vals[i]["name"])+'</td><td><input name="GM_passWord" readonly="readonly" type="password" value="'+unescape(vals[i]["pass"])+'"/></td><td>'+vals[i]["auto"]+'</td>'+td+'</tr>';
		}
		div.id='GM_popupDiv';
		div.innerHTML=string+'</table><p><input style="margin-left:8px;" type="button" value="Save" id="GM_save"/><input style="float:right;margin-right:8px;" type="button" value="Cancel" id="GM_cancel"/></p></div>';
		document.body.appendChild(div);
		getId('GM_save').addEventListener("click",function(){
			var list=document.evaluate(".//table[@id='GM_accountTable']/tbody/tr[@class='GM_account']",document,null,6,null);
			var accounts=JSON.parse(GM_getValue("accounts","{}")),ordered={},id;
			for(var i=0,stp=list.snapshotLength;i<stp;i++){
				id=list.snapshotItem(i).id
				ordered[id]=accounts[id];
			}
			GM_updateIds(oldId,ordered);
			sendEvent(getId('GM_tableClose'),'click');
		},false);
		getId('GM_cancel').addEventListener("click",function(){
			sendEvent(getId('GM_tableClose'),'click');
		},false);
		div=getId('GM_div4Table');
		div.setAttribute('style','width:'+(div.childNodes[0].offsetWidth+20)+'px;height:'+div.offsetHeight+'px;max-height:'+document.body.offsetHeight+'px;display:block;');// The base height is detectable when the display is inline-table but it will not center while it is a inline-table
	}
	else if(newId=='toggleSM'){
		safeMode();
	}
	else if(newId=='sortConf'){
		if(sortConfig()){
			var accounts=JSON.parse(GM_getValue("accounts","{}"));
			GM_updateIds(oldId,accounts);
		}
	}
	else if(newId=='getDaily'){
		global.daily=Array();
		global.dailyId=[{"id":1,"name":"Home"},{"id":2,"name":"MyGaia"},{"id":3,"name":"Forums"},{"id":4,"name":"Games"},{"id":5,"name":"World"},{"id":8,"name":"Shops"}];
		global.dailyTime=0;
		global.dailyDivider="\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n";
		global.dailyTimeout=setTimeout(function(){
			alert("Daily Chance Timeout:\nI never got a reply for one or more chances\n\n"+global.daily.join(global.dailyDivider)+global.dailyDivider.substr(0,global.dailyDivider.length-1));
		},12500);
		global.daily.push("\t\t\t\tDaily Chances");
		if(!global.dailyDive){
			global.dailyOpt=document.evaluate('.//select[@id="gmSelectLogin"]/optgroup[@label="Utilities"]/option[@value="getDaily"]',document,null,9,null).singleNodeValue;
			global.dailyOpt.disabled='disabled';
		}
		for(var i=0,max=global.dailyId.length;i<max;i++){
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.gaiaonline.com/dailycandy/?mode=ajax&action=issue&list_id="+global.dailyId[i]["id"]+"&cart="+i,
				onload: function(response){
					global.daily.push(readDailyData(response.responseText+response.finalUrl.substr(-1)));
				},
				onerror: function(response){
					global.daily.push("Something when wrong getting data\nYou may or may have not got something\n"+(response.status!=200)?"I got a "+((response.status==Null)?"timeout":response.status)+" error":"Gaia said \""+unescape(response.responseText.slice(response.responseText.indexOf('<message>')+9,response.responseText.indexOf('</message>')))+"\" on "+global.dailyId[i]["name"]);
				}
			});
		}
		setTimeout(function(){
			dailyCandy();
		},2500);
	}
	else if(newId=='dumpsterDive'){
		global.diveTimeout=setTimeout("alert('Dumpster Dive Timeout:\\nNever got a reply from gaia.')",10000);
		if(!global.dailyDive){
			global.diveOpt=document.evaluate('.//select[@id="gmSelectLogin"]/optgroup[@label="Utilities"]/option[@value="dumpsterDive"]',document,null,9,null).singleNodeValue;
			global.diveOpt.disabled='disabled';
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.gaiaonline.com/dumpsterdive?mode=showConfirmed&time="+parseInt(new Date().getTime()/1000),
			onload: function(response){
				var trash=response.responseText;
				if(trash.slice(trash.indexOf('<div id="grant_granted">')+24,trash.indexOf('</div></div></div><form'))=="Pete looks a little crazy XD, maybe if you try later..."){
					clearTimeout(global.diveTimeout);
					var str="Pete looks a little crazy XD, maybe if you try later...";
					if(global.dailyDive)
						global.dailyDive=str;
					else{
						alert(str);
						global.diveOpt.removeAttribute("disabled");
					}
				}
				else{
					clearTimeout(global.diveTimeout);
					if(trash.indexOf('<title>DC Error | Gaia Online</title>')>-1){
						var N="DC Error";
						var M=trash.slice(trash.indexOf('<div id="errorMessage" class="errorMessage">')+44);
						M=M.replace(/[(\n\t\r]/g,'');
					}
					else{
						var N=trash.slice(trash.indexOf('<div id="grant_text1">')+22,trash.indexOf('</div><div id="grant_text2">'));
						var M=trash.slice(trash.indexOf('<div id="grant_text2">')+22);
					}
					M=M.slice(0,M.indexOf('</div>'));
					if(global.dailyDive)
						global.dailyDive="Dumpster:\n\t"+N+"\n\t"+M;
					else{
						alert(N+"\n"+M);
						global.diveOpt.removeAttribute("disabled");
					}
				}
			},
			onerror: function(response){
				clearTimeout(global.diveTimeout);
				var str="Something when wrong in the dumpster\nYou may or may have not got something\n"+(response.status!=200)?"I got a "+((response.status==Null)?"timeout":response.status)+" error":"I got something from gaia but idk what it is @.@";
				if(global.dailyDive)
					global.dailyDive=str;
				else{
					alert(str);
					global.diveOpt.removeAttribute("disabled");
				}
			}
		});
	}
	else if(newId=='theDailyDive'){ // Will need update if more utilties are added
		if(!document.evaluate('.//select[@id="gmSelectLogin"]/optgroup[@label="Utilities"]/option[disabled="disabled"]',document,null,9,null).singleNodeValue){
			global.utils=document.evaluate('.//select[@id="gmSelectLogin"]/optgroup[@label="Utilities"]',document,null,9,null).singleNodeValue;
			global.utils.disabled="disabled";
			global.dailyDive=true;
			GM_selectChange('getDaily',oldId,nonce);
			GM_selectChange('dumpsterDive',oldId,nonce);
		}
		else{
			alert('I think you are trying to make a error happen.\nToo bad for you anticipated this one.\nmua ahahah\n\nA daily or dive appears to be in progress running a second grab while one is in progress can screw things up.');
		}
	}
	else{
		try{
			var nameSpace=document.getElementsByClassName('avatarName')[0].childNodes[0];
		}
		catch(e){
			var nameSpace=getId('GM_message');
			nameSpace.parentNode.className='on';
		}
		var newName=getId('gmSelectLogin');
		nameSpace.parentNode.className+=' logout';
		nameSpace.textContent='Logging '+nameSpace.getAttribute('name')+' out.';
		var timeout=setTimeout(function(){
			alert("I think you waited long enough...\nNow assuming you are logged out");
			var GM_ele=document.createElement("iframe");
			GM_ele.setAttribute('style','width:0px;height:0px;border:none;');
			GM_ele.src=location.protocol+"//"+document.domain+"/auth/login/?username="+newId;
			document.body.appendChild(GM_ele);
		}, 10000); // wait 10 seconds 
		GM_xmlhttpRequest({
			method: "GET",
			url: location.protocol+"//"+document.domain+"/auth/logout/?userid="+oldId+'&nonce='+nonce,
			onload: function(){
				nameSpace.textContent='Logging '+newName.options[newName.selectedIndex].text+' in.';
				setTimeout(function(){
					clearTimeout(timeout);
					var GM_ele=document.createElement("iframe");
					GM_ele.setAttribute('style','width:0px;height:0px;border:none;');
					GM_ele.src="/auth/login/?username="+newId;
					document.body.appendChild(GM_ele);
				},500);
			},
			onerror: function(){
				alert('[Loading error]\nUn-able to confirm logout');
			}
		});
		return;
	}
	getId('gmSelectLogin').selectedIndex=0;
	return;
}
function dailyCandy(){
	if(typeof global.dailyDive=='string'){
		global.daily.push(global.dailyDive);
		global.dailyDive=true;
	}
	if(global.daily.length==global.dailyId.length+(global.dailyDive?2:1)){
		clearTimeout(global.dailyTimeout);
		alert(global.daily.join(global.dailyDivider)+global.dailyDivider.substr(0,global.dailyDivider.length-1));
		var cart=getId("dailyReward");
		if(cart)
			cart.style.display='none';
		if(global.dailyDive){
			delete(global.dailyDive);
			global.utils.removeAttribute("disabled");
		}
		else
			global.dailyOpt.removeAttribute("disabled");
	}
	else{
		setTimeout(function(){
			dailyCandy();
		},2500);
	}
}
function readDailyData(str){
	var l=global.dailyId[Number(str.substr(-1))]["name"];
	if(str.slice(str.indexOf('<message>')+9,str.indexOf('</message>'))=="The daily reward was already claimed for today."){
		return l+" daily reward was already claimed for today.";
	}
	else if(str.indexOf('<status>error</status>')>-1){
		var m=str.slice(str.indexOf('<message>')+9,str.indexOf('</message>'));
		return l+":\n\t"+m;
	}
	else{
		var n=str.slice(str.indexOf('<name>')+6,str.indexOf('</name>'));
		//var t=str.slice(str.indexOf('<tier>')+6,str.indexOf('</tier>'));
		var m=str.slice(str.indexOf('<tier_message>')+14,str.indexOf('</tier_message>'));
		//return n+" * "+t+"\n"+m;
		return l+":\n\t"+n+"\n\t"+m;
	}
}

var url=document.location.href,global={};
if(url.indexOf('gaiaonline.com/auth/login/?username=')!=-1){
	Gm_Login(url.slice(url.indexOf('=')+1));
}
else{
	try{
		var n=0,cId,nonce;
		try{ // clean crap next to username
			var ele=document.getElementsByClassName('avatarName')[0];
			ele.removeChild(ele.childNodes[0]);
			ele=ele.childNodes[0];
			var name=ele.textContent;
			name=name.slice(0,name.length-1);
			ele.textContent=name;
			ele.setAttribute('name',name);
		}
		catch(e){
			var l=document.createElement('li');
			l.innerHTML='<span id="GM_message"></span>';
			var t=getId('header_right');
			t.insertBefore(l,t.childNodes[0]);
		}
		try{
			cId=document.evaluate('.//a[@title="Logout from your Gaia account"]',document,null,9,null).singleNodeValue;
			cId.id="gmSelectLogin";
			cId=cId.href;
			cId=cId.substr(cId.indexOf('?'));
			nonce=getURL('nonce',cId);
			cId=getURL('userid',cId);
		}
		catch(e){
			try{
				cId=document.getElementsByClassName('panel_mygaia_profile')[0].getElementsByTagName('a')[0].href;
				cId=cId.substr(cId.indexOf('?'));
				nonce=getURL('nonce',cId);
				cId=getURL('userid',cId);
				if(isNaN(cId)){
					makeError();
				}
			}
			catch(e){
				try{
					cId=getId('header_right').getElementsByTagName('a');
					cId=cId[cId.length-1];
					cId.id="gmSelectLogin";
					cId=cId.href;
					cId=cId.substr(cId.indexOf('?'));
					nonce=getURL('nonce',cId);
					cId=getURL('userid',cId);
				}
				catch(e){
					cId=false;
					nonce=false;
				}
			}
		}
	}
	catch(e){ // not signed in or on game page
		if(getId("memberloginForm")){
			var accounts='';
			try{
				var ids=JSON.parse(GM_getValue("accounts","{}"));
				for (var i in ids){
					accounts+='<option value="'+i+'">'+unescape(ids[i]["name"])+'</option>';
				}
			}
			catch(e){/*no accounts stored*/}
			if(accounts){
				var usrR=getId('usernamerow');
				var original=usrR.innerHTML;
				usrR.innerHTML='<select id="username" name="username"><option value="">Please select...</option>'+accounts+'<option value="other">Other</option></select>';
				var usrN=getId('username');
				var usrP=getId('password');
				var usrA=getId('autologin');
				usrN.addEventListener('change',function(e){
					if(usrN.value=='other'){
						usrR.innerHTML=original;
						usrP.value='';
						usrP.className="header-login-input-password header-login-input-password-default textbox";
						usrA.value=false;
					}
					else if(usrN.value!=''){
						var arr=ids[usrN.value];
						usrP.value=unescape(arr["pass"]);
						usrP.className="header-login-input-password textbox";
						usrA.checked=arr["auto"];
					}
					else{
						usrP.value='';
						usrA.value=false;
						usrP.className="header-login-input-password header-login-input-password-default textbox";
					}
				},false);
				usrP.value='';
			}
		}
	}
	if(cId){
		insertUserInverface(cId);
		if(url.indexOf('login_success=')!=-1){
			var txt="Welcome back"; // Placed before username if you just logged in
		}
		else{
			var txt="Logged in as"; //Placed before username if did did not just login
		}
		try{
			var p=document.evaluate('.//div[@class="hud-stats hud hud-sprite"]',document,null,9,null).singleNodeValue.offsetWidth-175;
		}
		catch(e){
			var p=0;
		}
	}
	GM_addStyle("\n"+
		"#gmSelectLogin{\n"+
		"	font-size:7pt !important;\n"+
		"	padding:0px;\n"+
		"	height:17px;\n"+
		"	width:87px;\n"+
		"}\n"+
		"#gmSelectLogin .GM_indent{\n"+
		"	padding-left:16px;\n"+
		"	padding-right: 1px;\n"+
		"}\n"+
		"#GM_tableClose{\n"+
		"	width:30px;\n"+
		"	height:30px;\n"+
		"	padding-top: 2px;\n"+
		"	padding-bottom:2px;\n"+
		"	font-size:25px;\n"+
		"	border:1px solid black;\n"+
		"	font-family:courier,monospace;\n"+
		"	cursor:pointer;\n"+
		"	float:right;\n"+
		"	color:black;\n"+
		"	text-align:center;\n"+
		"	-moz-border-radius:10px;\n"+
		"	margin:5px 5px 0 0;\n"+
		"}\n"+
		"#GM_popupDiv{\n"+
		"	height:100%;\n"+
		"	width:100%;\n"+
		"	position:fixed;\n"+
		"	top:0;\n"+
		"	left:0;\n"+
		"	z-index:99998;\n"+
		"	background-color:-moz-dialog;\n"+
		"}\n"+
		"#GM_div4Table{\n"+
		"	overflow: auto;\n"+
		"	margin:auto;\n"+
		"	position:absolute;\n"+
		"	top:0;\n"+
		"	left:0;\n"+
		"	right:0;\n"+
		"	bottom:0;\n"+
		"	display:inline-table;\n"+
		"}\n"+
		"#GM_accountTable{\n"+
		"	margin-left:auto;\n"+
		"	margin-right:auto;\n"+
		"	margin-bottom:2px;\n"+
		"}\n"+
		"#GM_div4Table #GM_accountTable input{\n"+
		"	border:none;\n"+
		"	background-color:inherit;\n"+
		"}\n"+
		"#GM_div4Table #GM_accountTable span{\n"+
		"	text-decoration:underline;\n"+
		"	cursor:pointer;\n"+
		"}\n"+
		"#gaia_header .header_content .userName li{\n"+
		"	max-width:none;\n"+
		"}\n"+
		"table#GM_accountTable{\n"+
		"	border-collapse:separate;\n"+
		"	border-spacing:2px;\n"+
		"}\n"+
		"#GM_accountTable h3{\n"+
		"	margin:0px;\n"+
		"}\n"+
		"#GM_accountTable th,#GM_accountTable td{\n"+
		"	border-width:1px;\n"+
		"	border-style:inset;\n"+
		"}\n"+
		"#GM_accountTable .GM_account:nth-child(2n){\n"+
		"	background-color:white;\n"+
		"}\n"+
		"#GM_accountTable .GM_account:nth-child(2n+1){\n"+
		"	background-color:lightgray;\n"+
		"}\n"+
		".avatarName:not(.logout):before{\n"+
		"	content: '"+txt+" ';\n"+//places text before username
		"}\n"+
		".avatarName:not(.logout) > span:after{\n"+
		"	content: '!';\n"+//places text after username
		"}\n"+
		".avatarName{\n"+
		"	margin-left:10px;\n"+
		"\n}"+
		"p > select#username{\n"+
		"	width:180px;\n"+
		"	background-image:none;\n"+
		"}\n"+
		"p.form-row-username > select#username{\n"+
		"	width:172px;\n"+
		"}\n"+
		".header_content > .userName .avatarName{\n"+
		"	min-width:"+p+"px;\n"+
		"}\n"+
		"#gaia_header #header_right li:nth-last-child(-n+1):before{\n"+
		"	content:'| ';\n"+
		"}\n"+
		"#gaia_header #header_right select:focus{\n"+
		"	margin-right:33px;\n"+
		"}\n"+
		"#gaia_header #header_right li.on:after{\n"+
		"	content:' |';\n"+
		"}\n"+
		"#gaia_header #header_right #GM_message{\n"+
		"	font-weight:bold;\n"+
		"	color:#CCCCCC;\n"+
		"}\n"+
		"#Message iframe{\n"+
		"	display:none;\n"+
		"}"+
	"\n");
}