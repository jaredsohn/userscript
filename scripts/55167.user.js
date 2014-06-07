// ==UserScript==
// @name           DS Signature Filter
// @namespace      http://userscripts.org/scripts/show/55167
// @description    Prohibits the specific signatures you dislike :)
// @include        http://top81.ws/show.php?*
// @include        http://www.top81.ws/show.php?*
// @include        http://top81.net/show.php?*
// @include        http://www.top81.net/show.php?*
// @include        http://top81.org/show.php?*
// @include        http://www.top81.org/show.php?*
// @include        http://64.92.166.106/show.php?*
// @author		   killkeeper / http://tremblefrog.org
// ==/UserScript==

new DSFilter();

function DSFilter(){
	var content_div = document.getElementById('mb');
	var location = unsafeWindow.location.href;
	var ds_id = getDSid();
	
	ban();
	init();
	
	function ban(){
		var re = /&ban=([0-1])/;
		if (re.test(location)){
			location.match(re);
			
			var flag = parseInt(RegExp.$1);
			var key = 'dsid_' + encodeURI(ds_id);
			
			if (flag == 1){
				// ban this user
				if (ds_id && !GM_getValue(key, null)){
					GM_setValue(key, 1);
					alert('您屏蔽了【' + ds_id + '】的签名!');
				}
			}
			else if(flag == 0 && GM_getValue(key, null)){
				if (ds_id){
					GM_deleteValue(key);
					alert('您解除了对【' + ds_id + '】的签名屏蔽!');
				}
			}
		}
	}
	
	function init(){
		
		var a_id_setting = null;
		
		if (ds_id){
			id_flag = GM_getValue('dsid_' + encodeURI(ds_id), null);
			
			if (id_flag == null){
				/* no flag set yet */
				a_id_setting = _a('屏蔽【' + ds_id + '】的签名', location + '&ban=1', null);					
				content_div.insertBefore(a_id_setting, content_div.childNodes[content_div.childNodes.length - 2]);
			}
			else{
				a_id_setting = _a('解除对【' + ds_id + '】的签名屏蔽', location + '&ban=0', null);
				content_div.insertBefore(a_id_setting, content_div.childNodes[content_div.childNodes.length - 2]);
				
				filterSignature();
			}
		}
	}
	
	function getDSid(){
		var tag_center = content_div.nextSibling.nextSibling;
		if (tag_center.tagName.toLowerCase() == 'center'){
			var tc_children = tag_center.firstChild.childNodes;
			var tc_text = "";
			
			for(var idx = 0; idx < tc_children.length; ++idx){
				if (tc_children[idx].nodeType == 3){
					tc_text = tc_children[idx].nodeValue;
					break;	
				}	// textNode
			}
			
			if (tc_text){
				var start = tc_text.indexOf("【");
				var end = tc_text.indexOf("】") - 1;
				var user_id = tc_text.substr(start + 1, end - start);
				
				return user_id;
			}
			else{
				return null;
			}
		}
	}	
	
	function filterSignature(){
		
		var p_group = content_div.getElementsByTagName('p');
	
		/* create essential DOM elements */
		var tip = document.createElement("p");
		var tip_link = document.createElement("a");
		tip_link.setAttribute('id', 'a_signature');
		tip_link.setAttribute('href', 'javascript:void(0);');
		tip_link.setAttribute('onclick', 'javascript:toggle_display();');
		
		var tip_link_txt = document.createTextNode('Show/Hide');
		tip_link.appendChild(tip_link_txt);
		
		tip.appendChild(tip_link);

		/* hide specific "p" element containing signature */
		if (p_group.length){
			var p_sign = p_group[p_group.length - 1];
			p_sign.setAttribute('style', 'display: none;');
			p_sign.setAttribute('id', 'p_signature');
			
			content_div.insertBefore(tip, p_sign);
		}
	}
	
	function _a(text, _href, _onclick, rest){
		var a_tag = document.createElement('a');
		a_tag.setAttribute('href', _href);
		a_tag.setAttribute('onclick', _onclick);
		
		var a_text = document.createTextNode(text);
		a_tag.appendChild(a_text);
		
		/* the rest attributes */
		if (rest){
			for(attr in rest){
				a_tag.setAttribute(attr, rest[attr]);
			}
		}
		
		return a_tag;
	}
}

/* insert the callback function into the original window object */
unsafeWindow.toggle_display = function(){ 
	var p = document.getElementById('p_signature'); 
	if (p){ 
		if(p.getAttribute('style') == 'display: none;')
			p.setAttribute('style', 'display: block;')
		else
			p.setAttribute('style', 'display: none;') 
		} 
};