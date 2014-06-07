// ==UserScript==
// @name           Blacklist Manager
// @namespace      Atimmer
// @description    This manages a blacklist locally on a pc
// @include        http://www.casualcollective.com/*
// @include				 http://casualcollective.com/*
// @exclude        http://www.casualcollective.com/chat
// ==/UserScript==

function JSONError(a){this.message=a||"";this.name="JSONError"};JSONError.prototype=new Error; JSON=new function(){this.decode=function(){var a,result,self,tmp;if($$("toString")){switch(arguments.length){case 2:self=arguments[0];a=arguments[1];break;case 1:if($[typeof arguments[0]](arguments[0])===Function){self=this;a=arguments[0]}else self=arguments[0];break;default:self=this;break};if(rc.test(self)){try{result=e("(".concat(self,")"));if(a&&result!==null&&(tmp=$[typeof result](result))&&(tmp===Array||tmp===Object)){for(self in result)result[self]=v(self,result)?a(self,result[self]):result[self]}}catch(z){}}else{throw new JSONError("bad data");}};return result};this.encode=function(){var a=arguments.length?arguments[0]:this,result,tmp;if(a===null)result="null";else if(a!==undefined&&(tmp=$[typeof a](a))){switch(tmp){case Array:result=[];for(var i=0,j=0,k=a.length;j<k;j++){if(a[j]!==undefined&&(tmp=JSON.encode(a[j])))result[i++]=tmp};result="[".concat(result.join(","),"]");break;case Boolean:result=String(a);break;case Date:result='"'.concat(a.getFullYear(),'-',d(a.getMonth()+1),'-',d(a.getDate()),'T',d(a.getHours()),':',d(a.getMinutes()),':',d(a.getSeconds()),'"');break;case Function:break;case Number:result=isFinite(a)?String(a):"null";break;case String:result='"'.concat(a.replace(rs,s).replace(ru,u),'"');break;default:var i=0,key;result=[];for(key in a){if(a[key]!==undefined&&(tmp=JSON.encode(a[key])))result[i++]='"'.concat(key.replace(rs,s).replace(ru,u),'":',tmp)};result="{".concat(result.join(","),"}");break}};return result};this.toDate=function(){var a=arguments.length?arguments[0]:this,result;if(rd.test(a)){result=new Date;result.setHours(i(a,11,2));result.setMinutes(i(a,14,2));result.setSeconds(i(a,17,2));result.setMonth(i(a,5,2)-1);result.setDate(i(a,8,2));result.setFullYear(i(a,0,4))}else if(rt.test(a))result=new Date(a*1000);return result};var c={"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},d=function(n){return n<10?"0".concat(n):n},e=function(c,f,e){e=eval;delete eval;if(typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},i=function(e,p,l){return 1*e.substr(p,l)},p=["","000","00","0",""],rc=null,rd=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,rs=/(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,rt=/^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,ru=/([\x00-\x07]|\x0b|[\x0e-\x1f])/g,s=function(i,d){return"\\".concat(c[d])},u=function(i,d){var n=d.charCodeAt(0).toString(16);return"\\u".concat(p[n.length],n)},v=function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},$={"boolean":function(){return Boolean},"function":function(){return Function},"number":function(){return Number},"object":function(o){return o instanceof o.constructor?o.constructor:null},"string":function(){return String},"undefined":function(){return null}},$$=function(m){function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}};return $(Array)&&$(Object)};try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}};

var blacklist = new Array();
var sorted_blacklist = new Array();
var prev_names = new Array();

// Z-index: OVER 9000 because CC+ is 9000
GM_addStyle('#BLM_blacklist{position: absolute; border-color: #A4C0DB #A5C1DB #A5C1DB; border-style: solid; border-width: 1px; height: 400px; width: 298px; background: #FFF; z-index: 9000; overflow:hidden;}' +
						'#BLM_blacklist ul{list-style-type: none;}' +
						'#BLM_blacklist ul li{margin-left: 10px;}' + 
						'#BLM_blacklist_list{position: absolute; bottom: 0;margin: 0;border-top:1px solid #A3B9CE;border-right:1px solid #A3B9CE;width:298px;height:300px;overflow:scroll;}' + 
						'#BLM_blacklist_list_latest{position:absolute; bottom: 300px;margin:0;width: 298px;overflow:hidden;height:60px;border-top:1px solid #A3B9CE;}' + 
						'.BLM_remove_via_blacklist{float:left; margin-right: 20px;margin-top:2px;}' +
						'.BLM_add{position: absolute; top:5px; right: 70px;}' +
						'#BLMMenu{height: 22px; width: 100%; margin-top: 2px;}' +
						'.skilltext{top:1px;}' + 
						'#BLM_export_blacklist{}' +
						'#BLM_import_blacklist{}');


CCPlusActive = false;

setTimeout(add_BLM, 1000);
function add_BLM()
{
	BLM_load_blacklist();
	var BLM_blacklist = document.createElement('div');
	BLM_blacklist.id = 'BLM_blacklist';
	BLM_blacklist.innerHTML =	'';
	BLM_blacklist.style.display = 'none';
	document.getElementById('sb-tabs').insertBefore(BLM_blacklist, document.getElementById('sb-tabs').firstChild);
	// document.getElementById('sb-tabs').innerHTML = '<div id="BLM_blacklist" class="tab" style="display:none;"></div>' + document.getElementById('sb-tabs').innerHTML;
	
	document.getElementById('BLM_blacklist').innerHTML += '<div class="sb-mc-g-buts">'
																										 + '<div class="but but-gray sb-mc-g-b-l" id="BLM_clear_blacklist" onclick="BLM_clear_blacklist();return false;"><a href="#"><span>Clear Blacklist</span></a></div>' 
																										 + '<div class="but but-gray sb-mc-g-b-l"><a href="#" id="BLM_import_blacklist" onclick="BLM_import_blacklist();return false;"><span>Import</span></a></div>'
																										 + '<div class="but but-gray sb-mc-g-b-l"><a href="#" id="BLM_export_blacklist" onclick="BLM_export_blacklist();return false;"><span>Export</span></a></div>'
																										 + '</div>';
																										 
	unsafeWindow.BLM_clear_blacklist = BLM_clear_blacklist;
	unsafeWindow.BLM_import_blacklist = BLM_import_blacklist;
	unsafeWindow.BLM_export_blacklist = BLM_export_blacklist;
	
	document.getElementById('BLM_blacklist').innerHTML += '<ul id="BLM_blacklist_list_latest"></ul><ul id="BLM_blacklist_list"></ul>';


	// Add button:
	var BLM_open_blacklist = document.createElement('div');
	

	BLM_open_blacklist.id = "BLMMenu";
	BLM_open_blacklist.innerHTML = '<span class="usel usel-gray" id="BLM_open_blacklist"><span id="BLM_open_blacklist_text">Blacklist</span></span>';

	
	
	var CCPlus = document.getElementById('CCplusMenu');
	if(CCPlus)
	{
		CCPlusActive = true;
	   CCPlus.innerHTML += BLM_open_blacklist.innerHTML;
	   document.getElementById('CCPlusOpenMain').addEventListener('click', BLM_hide, false);
	   if(document.getElementById('CCPlusOpen5'))
	   {
	   		document.getElementById('CCPlusOpen5').addEventListener('click', BLM_hide, false);
	   }
	}
	else	
	{
		document.getElementById('sidebar').insertBefore(BLM_open_blacklist, document.getElementById('sb-twitter'));
	}
	document.getElementById('sb-selectors').addEventListener('click', BLM_hide, false);
	
	
	document.getElementById('BLM_open_blacklist').addEventListener('click', BLM_show, true);

	
	BLM_update_blacklist();
	

	// Add search event Handler:
	document.getElementById('sb-search-results').addEventListener('DOMSubtreeModified', BLM_search_user, false);	
	document.getElementById('stDiv').addEventListener('DOMSubtreeModified', BLM_friend_popup, false);
}

function BLM_button_click()
{
	var BLM_blacklist = document.getElementById('BLM_blacklist');
	if(BLM_blacklist.style.display == '')
	{
		BLM_hide();
	}
	else
	{
		BLM_show();
	}
}

function BLM_hide()
{
	var BLM_blacklist = document.getElementById('BLM_blacklist');
	BLM_blacklist.style.display = 'none';
	document.getElementById('BLM_open_blacklist').className = '';
	document.getElementById('BLM_open_blacklist').className = 'usel usel-gray';
	
}

function BLM_show()
{
	var BLM_blacklist = document.getElementById('BLM_blacklist');
	BLM_blacklist.style.display = '';
	document.getElementById('BLM_open_blacklist').className = 'usel usel-grayon';
	BLM_update_blacklist();
	if(CCPlusActive)
	{
		if(unsafeWindow.CCPluscurrentTab != 'none')
		{
			unsafeWindow.CCPlusopenTab(unsafeWindow.CCPluscurrentTab);
		}
	}
}

function BLM_update_blacklist()
{
	var length = blacklist.length;
	var sorted_list = '<li><strong>Alphabetical:</strong></li>';
	list = '<li><strong>Latest:</strong></li>';
	
	if(length == 0)
	{
		list += '<li>Sorry, but your blacklist is empty. Fill it up with trollers and leavers.</li>';
	}
	else
	{
		sorted_blacklist = JSON.decode("[]");
		for(var i=0;i<length;i++)
		{
			sorted_blacklist[i] = blacklist[i];
		}
		for(var i=length-1;i>=length-3;--i)
		{
			if(blacklist[i])
			{
				list += '<li><a href="#profiles/' + blacklist[i] + '">' + blacklist[i] + '</a><a href="#" id="BLM_remove_' + sorted_blacklist[i] + '_via_blacklist" class="BLM_remove_via_blacklist"><img src="http://cdn.casualcollective.com/images/icons/12-em-cross.png" title="Remove from blacklist"></img></a></li>';
			}
		}
		sorted_blacklist = sorted_blacklist.sort(function(x,y){
			var a = String(x).toUpperCase();
			var b = String(y).toUpperCase();
			if(a > b)
			{
				return 1;
			}
			if(a < b)
			{
				return -1;
			}
			return 0;
		});
		var sorted_length = sorted_blacklist.length;
		for(var i=0;i<length;i++)
		{
			sorted_list += '<li><a href="#profiles/' + sorted_blacklist[i] + '">' + sorted_blacklist[i] + '</a><a href="#" id="BLM_remove_' + sorted_blacklist[i] + '_via_blacklist" class="BLM_remove_via_blacklist"><img src="http://cdn.casualcollective.com/images/icons/12-em-cross.png" title="Remove from blacklist"></img></a></li>';
		}
	}
	document.getElementById('BLM_blacklist_list').innerHTML = sorted_list;
	document.getElementById('BLM_blacklist_list_latest').innerHTML = list;
	for(var i=0; i<length;i++)
	{
		document.getElementById('BLM_remove_' + sorted_blacklist[i] + '_via_blacklist').addEventListener('click', BLM_remove_via_blacklist, false);
	}
}

function BLM_search_blacklist(search_for)
{
	var length = blacklist.length;
	for(var i=0;i<length;i++)
	{
		if(blacklist[i] == search_for)
		{
			return i;
		}
	}
	return false;
}

function BLM_add_user(user)
{
	if(BLM_search_blacklist(user) === false)
	{
		blacklist.push(user);
		BLM_save_blacklist();
		BLM_update_blacklist();
	}
}

function BLM_remove_user(user)
{
	var index = BLM_search_blacklist(user);
	if(index !== false)
	{
		blacklist.splice(index, 1);
		BLM_save_blacklist();
		BLM_update_blacklist();
	}
}

function BLM_clear_blacklist()
{
	var confirmed = confirm("Are you sure you want to clear your blacklist?");
	if(confirmed)
	{
		blacklist = JSON.decode('[]');
		setTimeout(function(){BLM_save_blacklist();}, 0);
		BLM_update_blacklist();
	}
}

function BLM_save_blacklist()
{
	GM_setValue('BLM_blacklist', JSON.encode(blacklist));
}

function BLM_load_blacklist()
{
	blacklist = JSON.decode(GM_getValue('BLM_blacklist', '[]'));
}

function BLM_import_blacklist()
{
	var import = prompt('Paste the text you have gotten from a friend here, his blacklist will be added to yours.', '[]');
	var add_to_blacklist = JSON.decode(import);
	for(var i=0;i<add_to_blacklist.length;++i)
	{
		BLM_add_user(add_to_blacklist[i]);
		setTimeout(function(){BLM_save_blacklist();}, 0);
	}
}

function BLM_export_blacklist()
{
	prompt('Copy this text and send it to friend so he can import it!', JSON.encode(blacklist));
}

function BLM_search_user()
{

	var members = getElementsByCSS(document.getElementById('sb-search-results'), 'userbox ub-sa');

	for ( var i = 0; i < members.length; ++i) 
	{
			var box = members[i].lastChild.previousSibling;
			var name = members[i].lastChild.previousSibling.firstChild.firstChild.nodeValue;
			if(getElementsByCSS(box, 'BLM_add').length !== 0)
			{
				return false;
			}
			var show_add = '';
			var show_remove = '';
			if(BLM_search_blacklist(name) !== false)
			{
				show_add = 'none';
			}
			else
			{
				show_remove = 'none';
			}
			box.innerHTML += '<div class="BLM_add"><a href="#" title="Add to blacklist" style="display:' + show_add + ';" id="BLM_add_' + name +'"><img src="http://cdn.casualcollective.com/images/icons/12-em-plus.png"></img></a><a title="Remove from blacklist" href="#" style="display:' + show_remove + ';" id="BLM_remove_' + name +'"><img src="http://cdn.casualcollective.com/images/icons/12-em-cross.png"></src></a></div>';
			document.getElementById('BLM_add_' + name).addEventListener('click', BLM_change_via_search, false);
			document.getElementById('BLM_remove_' + name).addEventListener('click', BLM_change_via_search, false);
			if(BLM_search_blacklist(name) !== false)
			{
				box.firstChild.style.color = 'red';
				box.firstChild.style.fontWeight = '900';
			}
	}
}

function BLM_change_via_search(event)
{
	event.preventDefault();
	var user = this.id.replace('BLM_add_', '').replace('BLM_remove_', '');
	if(BLM_search_blacklist(user) === false && this.firstChild.src == "http://cdn.casualcollective.com/images/icons/12-em-plus.png")
	{
		BLM_add_user(user);
		var profilelink = getElementsByCSS(this.parentNode.parentNode, 'profilelink')[0];
		profilelink.style.color = 'red';
		profilelink.style.fontWeight = '900';
		this.style.display = 'none';
		document.getElementById('BLM_remove_' + user).style.display = '';
	}
	else if(this.firstChild.src == "http://cdn.casualcollective.com/images/icons/12-em-cross.png")
	{
		BLM_remove_user(user);
		var profilelink = getElementsByCSS(this.parentNode.parentNode, 'profilelink')[0];
		profilelink.style.color = '';
		profilelink.style.fontWeight = '';
		this.style.display = 'none';
		document.getElementById('BLM_add_' + user).style.display = '';
	}
}

// var BLM_DOMSubtreeModified_Fired = 0;

function BLM_friend_popup()
{
	var stDiv = document.getElementById('stDiv');
		
		var members = getElementsByCSS(document.getElementById('stDiv'), 'userbox ub-sa');
		for ( var i = 0; i < members.length; ++i) 
		{
				var box = members[i].lastChild.previousSibling;
				var name = members[i].lastChild.previousSibling.firstChild.firstChild.nodeValue;
				if(getElementsByCSS(box, 'BLM_add').length !== 0)
				{
					return false;
				}
				var show_add = '';
				var show_remove = '';
				if(BLM_search_blacklist(name) !== false)
				{
					show_add = 'none';
				}
				else
				{
					show_remove = 'none';
				}
				box.innerHTML += '<div class="BLM_add"><a href="#" title="Add to blacklist" style="display:' + show_add + ';" id="BLM_add_' + name +'"><img src="http://cdn.casualcollective.com/images/icons/12-em-plus.png"></img></a><a href="#" title="Remove from blacklist" style="display:' + show_remove + ';" id="BLM_remove_' + name +'"><img src="http://cdn.casualcollective.com/images/icons/12-em-cross.png"></src></a></div>';
				document.getElementById('BLM_add_' + name).addEventListener('click', BLM_change_via_friend_popup, false);
				document.getElementById('BLM_remove_' + name).addEventListener('click', BLM_change_via_friend_popup, false);
				if(BLM_search_blacklist(name) !== false)
				{
					var profilelink = getElementsByCSS(box, 'profilelink')[0];
					profilelink.style.color = 'red';
					profilelink.style.fontWeight = '900';
				}
		}
}

function BLM_change_via_friend_popup(event)
{
	event.preventDefault();
	var user = this.id.replace('BLM_add_', '').replace('BLM_remove_', '');
	if(BLM_search_blacklist(user) === false && this.firstChild.src == "http://cdn.casualcollective.com/images/icons/12-em-plus.png")
	{
		BLM_add_user(user);
		var profilelink = getElementsByCSS(this.parentNode.parentNode, 'profilelink')[0];
		profilelink.style.color = 'red';
		profilelink.style.fontWeight = '900';
		this.style.display = 'none';
		document.getElementById('BLM_remove_' + user).style.display = '';
	}
	else if(this.firstChild.src == "http://cdn.casualcollective.com/images/icons/12-em-cross.png")
	{
		BLM_remove_user(user);
		var profilelink = getElementsByCSS(this.parentNode.parentNode, 'profilelink')[0];
		profilelink.style.color = '';
		profilelink.style.fontWeight = '';
		this.style.display = 'none';
		document.getElementById('BLM_add_' + user).style.display = '';
	}
}

function BLM_remove_via_blacklist(event)
{
	event.preventDefault();
	var user = this.id.replace('BLM_remove_', '').replace('_via_blacklist', '');
	BLM_remove_user(user);
}

function getElementsByCSS(node, classname) {
	if (document.getElementsByClassName) {
		if (!node) {
			node = document.getElementsByTagName('body')[0];
		}
		return node.getElementsByClassName(classname);
	} else {
		if (!node) {
			node = document.getElementsByTagName('body')[0];
		}
		var a = [], re = new RegExp('\\b' + classname + '\\b');
		els = node.getElementsByTagName('*');
		for ( var i = 0, j = els.length; i < j; ++i) {
			if (re.test(els[i].className)) {
				a.push(els[i]);
			}
		}
		return a;
	}
}

var onPage = '';
var ajaxloadHide = unsafeWindow.ccHistory.hideLoad;
unsafeWindow.ccHistory.hideLoad = function() 
{
	window.setTimeout(function() {BLM_show_on_blacklist()}, 50); // Give enough time for page to update
	return ajaxloadHide.apply(unsafeWindow.ccHistory);
}

var pagecontent = document.getElementById('pagecontent');

function BLM_show_on_blacklist()
{
	onPage = window.location.hash.replace('#', '').split('?')[0].split('/');
	if(onPage[0] == 'profiles')
	{
		var user = onPage[1];
		if(BLM_search_blacklist(user) !== false)
		{
			getElementsByCSS(pagecontent, 'groupblock')[0].lastChild.style.color = 'red';
			getElementsByCSS(getElementsByCSS(pagecontent, 'groupblock')[0].lastChild, 'p-level')[0].innerHTML += ' <strong> Blacklisted!</strong>';
		}
	}
}