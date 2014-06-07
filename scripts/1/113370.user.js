// ==UserScript==
// @name           fa_profile
// @version				 1.0
// @namespace      snowfox
// @description    Modify FA profile info from within your userpage
// @include        http*://www.furaffinity.net/user/*
// ==/UserScript==

function $(i,p){if(!p)p=document;return p.getElementById(i);}
function $c(c,p){if(!p)p=document;return p.getElementsByClassName(c);}
function $t(t,p){if(!p)p=document;return p.getElementsByTagName(t);}
function $n(n,p){if(!p)p=document;return p.getElementsByName(n);}
function $$(t,a,c){var e=document.createElement(t);if(a){for(var i in a){e.setAttribute(i,a[i]);}}if(c){for(var i in c){e.appendChild(c[i]);}}return e;}
function $$t(t){return document.createTextNode(t);}
function $$e(e,t,f,c){if(e.addEventListener)return e.addEventListener(t,f,c);else if(e.attachEvent)return e.attachEvent('on'+t,f);else return false;}

(function(){
	if(unsafeWindow.visitor_data['user_id'] != unsafeWindow.page_data['user_id']) return;

	var el_prof = document.evaluate('//div/table/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[3]/td[2]/table/tbody/tr/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	el_prof.id = 'profileinfo';
	var el_edbut = $$('input', {'type':'button','class':'button','value':'Edit Profile'});
	$$e(el_edbut, 'click', editProfile, false);
	el_prof.appendChild($$('br'));
	el_prof.appendChild(el_edbut);
})();

function editProfile()
{
	var data = getProfileInfo();
	var el_prof = $('profileinfo');
	el_prof.innerHTML = '';
	var el_tbl = $$('table', {'style':'width:90%;'});
	for(var i in data)
	{
		var fname = i;
		var ntype = data[i]['ntype'];
		var itype = data[i]['itype'];
		var label = data[i]['label'];
		var val = data[i]['value'];
		var values = data[i]['values'];
		
		if(itype == 'hidden')// || !/^typeartist|mood|profileinfo$/i.test(fname))
		{
			el_prof.appendChild($$('input', {'type':'hidden', 'id':fname, 'name':fname, 'value':val}));
		}
		else
		{
			var el_in;
			if(ntype == 'textarea'){
				el_in = $$(ntype, {'id':fname, 'name':fname, 'value':val, 'rows':8, 'class':'textbox', 'style':'width:100%;'}, [$$t(val)]);
			}
			else if(ntype == 'select'){
				el_in = $$(ntype, {'id':fname, 'name':fname, 'class':'listbox'});
				el_in.innerHTML = values;
				if(/^typeartist|mood$/i.test(fname))
				{
					var el_op = $$('option', {'value':''}, [$$t('-- custom --')]);
					$$e(el_op, 'click', addOpt, false);
					el_in.appendChild(el_op);
				}
				/*for(var o in values){
					var attrs = {'value':o};
					if(o==val) attrs['selected'] = 'selected';
					el_in.appendChild($$('option', attrs, [$$t(values[o])]));
				}*/
			}
			else{
				el_in = $$('input', {'type':'text', 'id':fname, 'name':fname, 'value':val, 'class':'textbox', 'size':50});
			}
			
			el_tbl.appendChild(
				$$('tr', {}, [
					$$('td', {'style':'white-space:nowrap;'}, [$$t(label || fname)]),
					$$('td', {'style':'width:90%;'}, [el_in])
				])
			);
		}
	}

	var el_savbut = $$('input', {'type':'button','class':'button','value':'Save Changes'});
	$$e(el_savbut, 'click', setProfileInfo, false);
	
	el_prof.appendChild(el_tbl);
	el_prof.appendChild(el_savbut);
}

function getProfileInfo()
{
	var h = new XMLHttpRequest();
	h.open('get', '/controls/profile/', false);
	h.send(null);

	var doc = $$('div');doc.innerHTML = h.responseText;
	var data = getFields(doc, ['input', 'select', 'textarea']);
	return data;
}

function setProfileInfo()
{
	h = new XMLHttpRequest();
	h.open('post', '/controls/profile/', true);
	h.onreadystatechange = function()
	{
		if(h.readyState != 4 || h.status != 200) return;
		if(/Profile information updated./i.test(h.responseText))
		{
			if(confirm("Profile Info saved.\n\nReload the page?"))
					window.location.reload();
		}
		else
			alert('Oh dear, that didn\'t work');
	}
	var data = getFields($('profileinfo'), ['input', 'select', 'textarea']);
	var data_arr = [];
	for(var i in data)
	{
		data_arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]['value']));
	}
	var data_str = data_arr.join('&');
	h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	h.setRequestHeader("Content-length", data_str.length);
	h.setRequestHeader("Connection", "close");
	h.send(data_str);
}

function getFields(pnode, el_types)
{
	var data = {};
	for(var t in el_types)
	{
		var els = $t(el_types[t], pnode);
		for(var i=0;i<els.length;i++)
		{
			var el = els[i];
			if(el.name)
			{
				var ntype = el.nodeName.toLowerCase();
				var itype = el.type.toLowerCase();
				var val = el.value || '';
				var label = '';
				var values;
				if(ntype == 'select')
				{
					values = el.innerHTML;
					/*var el_ops = el.getElementsByTagName('option');
					for(var o=0; o<el_ops.length; o++)
					{
						values[el_ops[o].value] = el_ops[o].innerHTML;
					}*/
				}
				try{
					label = $t('b', el.parentNode)[0].innerHTML;
				}catch(e){}
				data[el.name] = {'ntype':ntype, 'itype':itype, 'value':val, 'label':label, 'values':values};
			}
		}
	}
	return data;
}

function addOpt(evt)
{
	var opt = prompt("Enter a custom option\n(You'll have to remember to change this every time you change your profile info or it will default to the first option)", '');
	if(!opt || opt == '') return;
	evt.target.value = opt;
	evt.target.innerHTML = opt;
}



