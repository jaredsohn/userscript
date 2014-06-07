// ==UserScript==
// @name           AA Forum Extender
// @namespace      nemesismonkey@mon.key
// @description    Adds lots of shortcuts and usabilty enhancements to the AA forums.

// @include        http://www.advancedanime.com/forum.php?t=*
// @include        http://advancedanime.com/forum.php?t=*
// @include        advancedanime.com/forum.php?t=*
// @include        http://www.advancedanime.com/forum_edit_post.php?*
// @include        http://advancedanime.com/forum_edit_post.php?*
// @include        advancedanime.com/forum_edit_post.php?*
// @include        http://www.advancedanime.com/forum.php?f=*
// @include        http://advancedanime.com/forum.php?f=*
// @include        advancedanime.com/forum.php?f=*
// @include        http://www.affairanime.com/forum_edit_post.php?*
// @include        http://affairanime.com/forum_edit_post.php
// @include        affairanime.com/forum_edit_post.php
// @include        http://www.affairanime.com/forum.php?t=*
// @include        http://affairanime.com/forum.php?t=*
// @include        affairanime.com/forum.php?t=*
// @include        http://www.affairanime.com/forum.php?f=*
// @include        http://affairanime.com/forum.php?f=*
// @include        affairanime.com/forum.php?f=*
   
   
// Version         1.3
// ==/UserScript==

var table = document.getElementById('post_new') || document.getElementById('contentcolumn').getElementsByTagName('textarea')[0];
var helper = helper();
var textarea = table.getElementsByTagName('textarea')[0] || document.getElementById('contentcolumn').getElementsByTagName('textarea')[0];

function init() {
	toggleReply();
	if(applyhtml()){
		setEvents();
	}
}
function toggleReply() {
	table.setAttribute('style','display:block;');
}
function helper() {
	if(window.document.getElementById('post_new')){
		var tr = table.getElementsByTagName('tr');
		var nTr = document.createElement('tr');
		var nTd = document.createElement('td');
		nTd.setAttribute('id','helper');
		nTr.appendChild(nTd);
		tr[0].parentNode.insertBefore(nTr, tr[1]);
		return window.document.getElementById('helper');
	} else if(window.document.getElementById('contentcolumn').getElementsByTagName('textarea')[0]){
		var ele = document.createElement('div');
		ele.setAttribute('id','helper');
		document.getElementById('contentcolumn').getElementsByTagName('textarea')[0].parentNode.insertBefore(ele,document.getElementById('contentcolumn').getElementsByTagName('textarea')[0]);
		return window.document.getElementById('helper');
	}
}
function setEvents() {
	var inputArray = helper.getElementsByTagName('input');
	for(i=0;i<inputArray.length;i++){
		if(inputArray[i].getAttribute('class') == 'minibutton'){
			inputArray[i].addEventListener('click',function(){process(this);},true);
		}
	}
}
function process(OBJ, BYPASS, T1, T2) {
	var tagName = OBJ.getAttribute('name');
	var begin,selection,end,stag,etag,current; 
	var ret = false;
	if (textarea.selectionStart!= undefined) {  
		current = textarea.selectionStart
		begin = textarea.value.substr(0, textarea.selectionStart);  
		selection = textarea.value.substr(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart);  
		end = textarea.value.substr(textarea.selectionEnd);  
	}else { 
		if (window.getSelection){ 
			selection = window.getSelection(); 
		}
		else if (document.getSelection){ 
			selection = document.getSelection(); 
		}
		else if (document.selection){ 
			selection = document.selection.createRange().text; 
		} 
	}
	var startPos = textarea.value.indexOf(selection); 
	if (startPos!= 0){ 
		var endPos = textarea.value.indexOf(selection) + selection.length; 
		begin = textarea.value.substr(0,startPos); 
		end = textarea.value.substr(endPos, textarea.value.length); 
	} if(BYPASS) {
		tagName = 'skip';
	}
	switch(tagName) {
		case('skip'):
			stag = T1;
			etag = T2;
			ret = true;
			destroyDialog();
			break;
		case('bold'):
			stag = '[b]';
			etag = '[/b]';
			ret = true;
			break;
		case('italic'):
			stag = '[i]';
			etag = '[/i]';
			ret = true;
			break;
		case('underline'):
			stag = '[u]';
			etag = '[/u]';
			ret = true;
			break;
		case('strike'):
			stag = '[s]';
			etag = '[/s]';
			ret = true;
			break;
		case('sup'):
			stag = '[sup]';
			etag = '[/sup]';
			ret = true;
			break;
		case('sub'):
			stag = '[sub]';
			etag = '[/sub]';
			ret = true;
			break;
		case('quote'):
			stag = '[quote]';
			etag = '[/quote]';
			ret = true;
			break;
		case('headline'):
			var ht = new Array();
			ht[0] = createEle('input',new Array('id::ht1', 'type::button','class::subbutton', 'name::h12', 'value::h1', 'style::font-size:14px;font-weight:bold;margin:0 2px;', 'title::Create h1 headline'),false);
			ht[1] = createEle('input',new Array('id::ht2', 'type::button','class::subbutton', 'name::h22', 'value::h2', 'style::font-size:14px;font-weight:bold;margin:0 2px;', 'title::Create h1 headline'),false);
			
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				document.getElementById('ht1').addEventListener('click',function(){
					process(OBJ,true,'[h1]','[/h1]');
				},false);
				document.getElementById('ht2').addEventListener('click',function(){
					process(OBJ,true,'[h2]','[/h2]');
				},false);
			} else {
				ret = false;
			}
			break;
		case('color'):            //
			var ht = new Array();
			ht[0] = createEle('lable',new Array('id::c1', 'name::c1', 'style::font-size:12px;'),'Color: ');
			ht[1] = createEle('input',new Array('id::c2', 'type::text', 'name::c2', 'value::hex or color', 'style::font-size:12px;margin:0 2px;color:#aaa;'),false);
			ht[2] = createEle('input',new Array('id::c3', 'type::button','class::subbutton', 'name::c3', 'value::Apply', 'title::Colorize text.'),false);
			function constructColor(val) {
				var pat = /^#?(([a-fA-F0-9]){3}){1,2}$/i;
				var co = '';
				if(pat.test(val)) {
					co = val;
				} else {
					var t = document.createElement('div');
					t.style.display = 'none';
					t.style.color = 'rgb(67,171,126)';  //overrides defualt color so non-existint colors will match this output. rgb(67,171,126) == #43ab7e;
					t.style.color = val;
					document.body.appendChild(t);
					var style = window.getComputedStyle(t, null);
					var colorValue = style.color;
					document.body.removeChild(t);
					var hexString = colorValue.replace(
					/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
					function($0, $1, $2, $3) {
						return "#" + ("0"+Number($1).toString(16)).substr(-2) + ("0"+Number($2).toString(16)).substr(-2) + ("0"+Number($3).toString(16)).substr(-2);
					})
					if(pat.test(hexString)) {
						co = hexString;
					}
				}
				if(co != '' && co != '#43ab7e'){
					process(OBJ,true,'[color='+co+']','[/color]');
				} else {
					document.getElementById('c2').setAttribute('style','font-size:12px;margin:0 2px;color:#aaa;');
					document.getElementById('c2').value = 'invalid color';
					document.getElementById('c2').blur();
				}
			}
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				document.getElementById('c2').addEventListener('keydown',function(e){
					var key = e.which;
					if(key == 13){
						constructColor(document.getElementById('c2').value);	
					}
				},false);
				document.getElementById('c2').addEventListener('focus',function(){
					if(this.value == 'hex or color' || this.value == 'invalid color'){
						this.value = '';
						this.setAttribute('style','font-size:12px;margin:0 2px;color:#000;');
					}
				},false);
				document.getElementById('c3').addEventListener('click',function(){
					constructColor(document.getElementById('c2').value);
				},false);
			} else {
				ret = false;
			}
			break;
		case('size'):    
			var ht = new Array();
			ht[0] = createEle('lable',new Array('id::s1', 'name::s1', 'style::font-size:12px;'),'Size: ');
			ht[1] = createEle('input',new Array('id::s2', 'type::text', 'name::s2', 'value::11', 'style::font-size:12px;margin:0 2px;color:#aaa;','size::3', 'maxlength::2'),false);
			ht[2] = createEle('input',new Array('id::s3', 'type::button','class::subbutton', 'name::s3', 'value::Apply', 'title::Adjust size.'),false);
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				function constructSize(val){
					var pat = /(\d+)/;
					if(pat.test(val) && val>0){
						process(OBJ,true,'[size='+val+']','[/size]');
					}
					else {
						document.getElementById('s2').setAttribute('style','font-size:12px;margin:0 2px;color:#aaa;');
						document.getElementById('s2').value = '11';
						document.getElementById('s2').blur();
					}
				}
				document.getElementById('s2').addEventListener('keydown',function(e){
					var key = e.which;
					if(key == 13){
						constructSize(document.getElementById('s2').value);	
					}
				},false);
				document.getElementById('s2').addEventListener('focus',function(){
					if(this.value == '11'){
						this.value = '';
						this.setAttribute('style','font-size:12px;margin:0 2px;color:#000;');
					}
				},false);
				document.getElementById('s3').addEventListener('click',function(){
					constructSize(document.getElementById('s2').value);
				},false);
			} else {
				ret = false;
			}
			break;
		case('align'):            //
			var ht = new Array();
			ht[0] = createEle('input',new Array('id::al1', 'type::button','class::subbutton', 'name::al2', 'value::left', 'style::font-size:14px;font-weight:bold;margin:0 2px;', 'title::Algin text to the left'),false);
			ht[1] = createEle('input',new Array('id::al2', 'type::button','class::subbutton', 'name::al2', 'value::center', 'style::font-size:14px;font-weight:bold;margin:0 2px;', 'title::Algin text to the center'),false);
			ht[2] = createEle('input',new Array('id::al3', 'type::button','class::subbutton', 'name::al2', 'value::right', 'style::font-size:14px;font-weight:bold;margin:0 2px;', 'title::Algin text to the right'),false);
			
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				document.getElementById('al1').addEventListener('click',function(){
					process(OBJ,true,'[align=left]','[/align]');
				},false);
				document.getElementById('al2').addEventListener('click',function(){
					process(OBJ,true,'[align=center]','[/align]');
				},false);
				document.getElementById('al3').addEventListener('click',function(){
					process(OBJ,true,'[align=right]','[/align]');
				},false);
			} else {
				ret = false;
			}
			break;
		case('url'):                 //
			var ht = new Array();
			ht[0] = createEle('lable',new Array('id::u1', 'name::u1', 'style::font-size:12px;'),'URL: ');
			ht[1] = createEle('input',new Array('id::u2', 'type::text', 'name::u2', 'value::Enter url...', 'style::font-size:12px;margin:0 2px;color:#aaa;','size::10', 'maxlength::200'),false);
			ht[2] = createEle('input',new Array('id::u3', 'type::text', 'name::u2', 'value::Enter title...', 'style::font-size:12px;margin:0 2px;color:#aaa;','size::10', 'maxlength::200'),false);
			ht[3] = createEle('input',new Array('id::u4', 'type::button','class::subbutton', 'name::u3', 'value::Apply', 'title::Apply url.'),false);
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				function constructUrl(val){
					var pat = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
					var pat2 = /^(\[img\])(http:\/\/([ \S]+\.(jpg|png|gif)))(\[\/img\])$/i;
					if(pat2.test(val)){
						var pat3 = /(http:\/\/([ \S]+\.(jpg|png|gif)))/i;
						var url = val.match(pat3);
						process(OBJ,true,'[url='+url[0]+'][img]'+url[0]+'[/img]'+'[/url]','');
					} else if(pat.test(val)){
						var def = /enter title/i;
						var tes = /\[\/?img\]/i;
						var ef = val;
						while(tes.test(ef)){
							ef = ef.replace(tes,'');
						}
						if(def.test(document.getElementById('u3').value) && document.getElementById('u3').value != ''){
							process(OBJ,true,'[url]'+ef+'[/url]','');
						} else if(!def.test(document.getElementById('u3').value) && document.getElementById('u3').value != ''){
							process(OBJ,true,'[url='+ef+']'+document.getElementById('u3').value+'[/url]','');
						}
					}
					else {
						document.getElementById('u2').setAttribute('style','font-size:12px;margin:0 2px;color:#aaa;');
						document.getElementById('u2').value = 'Enter url...';
						document.getElementById('u2').blur();
					}
				}
				document.getElementById('u2').addEventListener('keydown',function(e){
					var key = e.which;
					if(key == 13){
						constructUrl(document.getElementById('u2').value);	
					}
				},false);
				document.getElementById('u3').addEventListener('keydown',function(e){
					var key = e.which;
					if(key == 13){
						constructUrl(document.getElementById('u2').value);	
					}
				},false);
				document.getElementById('u2').addEventListener('focus',function(){
					if(this.value == 'Enter url...'){
						this.value = '';
						this.setAttribute('style','font-size:12px;margin:0 2px;color:#000;');
					}
				},false);
				document.getElementById('u3').addEventListener('focus',function(){
					if(this.value == 'Enter title...'){
						this.value = '';
						this.setAttribute('style','font-size:12px;margin:0 2px;color:#000;');
					}
				},false);
				document.getElementById('u4').addEventListener('click',function(){
					constructUrl(document.getElementById('u2').value);
				},false);
			} else {
				ret = false;
			}
			break;
		case('image'):               //
			var ht = new Array();
			ht[0] = createEle('lable',new Array('id::img1', 'name::img1', 'style::font-size:12px;'),'Image URL: ');
			ht[1] = createEle('input',new Array('id::img2', 'type::text', 'name::img2', 'value::Image url...', 'style::font-size:12px;margin:0 2px;color:#aaa;','size::10', 'maxlength::200'),false);
			ht[2] = createEle('input',new Array('id::img3', 'type::button','class::subbutton', 'name::img3', 'value::Apply', 'title::Enter Image URL'),false);
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				function constructImg(val){
					var pat = /(http:\/\/([ \S]+\.(je?pg|png|gif)))/i;
					if(pat.test(val)){
						var tes = /\[\/?img\]/i;
						var ef = val;
						while(tes.test(ef)){
							ef = ef.replace(tes,'');
						}
						process(OBJ,true,'[img]'+ef+'[/img]','');
					}
					else {
						document.getElementById('img2').setAttribute('style','font-size:12px;margin:0 2px;color:#aaa;');
						document.getElementById('img2').value = 'Image url...';
						document.getElementById('img2').blur();
					}
				}
				document.getElementById('img2').addEventListener('keydown',function(e){
					var key = e.which;
					if(key == 13){
						constructImg(document.getElementById('img2').value);	
					}
				},false);
				document.getElementById('img2').addEventListener('focus',function(){
					if(this.value == 'Image url...'){
						this.value = '';
						this.setAttribute('style','font-size:12px;margin:0 2px;color:#000;');
					}
				},false);
				document.getElementById('img3').addEventListener('click',function(){
					constructImg(document.getElementById('img2').value);
				},false);
			} else {
				ret = false;
			}
			break;
		case('list'):
			var uii = re = 0;
			var ht = new Array();
			ht[0] = createEle('lable',new Array('id::li1', 'name::li1', 'style::font-size:12px;'),'List type: ');
			ht[1] = createEle('select',new Array('id::li2', 'name::li2','style::margin-right:3px;'),'<option value="stan">Standard</option><option value="upper">A: Item</option><option value="lower">a: Item</option><option value="itu">I: Item</option><option value="ita">i: Item</option>');
			ht[2] = createEle('input',new Array('id::li3', 'type::button','class::subbutton', 'name::li3', 'value::Apply', 'title::Apply list.'),false);
			ht[3] = createEle('div',new Array('id::li4', 'style::margin:5px 2px;height:1px;background:#ADB3C8;'),false);
			ht[4] = createEle('lable',new Array('style::font-size:12px;'),'Item '+(++uii)+': ');
			ht[5] = createEle('input',new Array('id::liu-'+uii, 'type::input','class::listinput', 'name::liu-'+uii),false);
			ht[6] = createEle('br',new Array('class::s'),false);
			ht[7] = createEle('lable',new Array('style::font-size:12px;'),'Item '+(++uii)+': ');
			ht[8] = createEle('input',new Array('id::liu-'+uii, 'type::input','class::listinput', 'name::liu-'+uii),false);
			ht[9] = createEle('br',new Array('class::s'),false);
			ht[10] = createEle('lable',new Array('style::font-size:12px;'),'Item '+(++uii)+': ');
			ht[11] = createEle('input',new Array('id::liu-'+uii, 'type::input','class::listinput', 'name::liu-'+uii),false);
			ht[12] = createEle('div',new Array('id::li6', 'style::margin:5px 2px;height:1px;background:#ADB3C8;'),false);
			ht[13] = createEle('input',new Array('id::li7', 'type::button','class::subbutton', 'name::li7', 'value::Add more...', 'title::Add.'),false);
			if(createDialog(objProperties(OBJ),ht,tagName,OBJ,'auto')){
				var coi = document.getElementById('dialog').getElementsByTagName('input');
				function insertAfter(ref, ne){
					ref.parentNode.insertBefore(ne,ref.nextSibling);
				}
				function constructList(C){
					var listItems = '[list';
					var typI = document.getElementById('li2').selectedIndex;
					var typO = document.getElementById('li2').options;
					if(typO[typI].value == 'stan'){
						listItems +=']';
					}else if(typO[typI].value == 'upper'){
						listItems +='=A]';
					}else if(typO[typI].value == 'lower'){
						listItems +='=a]';
					}else if(typO[typI].value == 'itu'){
						listItems +='=I]';
					}else if(typO[typI].value == 'ita'){
						listItems +='=i]';
					}else{
						listItems +=']';
					}
					var t = 0;
					for(var i in C){
						if(C[i].value != ''){
							listItems += '[li]'+C[i].value+'[/li]';
							t++;
						}
					}
					listItems +='[/list]';
					if(t>0){
						process(OBJ,true,listItems,'');
					}
				}
				document.getElementById('li3').addEventListener('click',function(){
					var n = new Array();
					var o = 0;
					for(var i in coi){
						if(coi[i].className == 'listinput'){
							n[o++] = coi[i];
						}
					}
					if(n.length > 0)
						constructList(n);
				},false);
				document.getElementById('li7').addEventListener('click',function(){
					var ite = uii-re+1;
					insertAfter(document.getElementById('liu-'+uii), createEle('br',new Array('class::s','id::brg'+(++re)),false));
					insertAfter(document.getElementById('brg'+re), createEle('lable',new Array('id::liu-'+(++uii),'style::font-size:12px;'),'Item '+ite+': '));
					insertAfter(document.getElementById('liu-'+uii), createEle('input',new Array('id::liu-'+(++uii), 'type::input','class::listinput', 'name::liu-'+uii),false));
				},false);
			} else {
				ret = false;
			}
			break;
		case('member'):
			stag = '[member]';
			etag = '[/member]';
			ret = true;
			break;
		case('series'):
			stag = '[series]';
			etag = '[/series]';
			ret = true;
			break;
		case('tag'):
			stag = '[tag]';
			etag = '[/tag]';
			ret = true;
			break;
		case('close'):  //will fix at a later date.
			stag = '';
			etag = '';
			ret = true;
			break;
		case('x'):  //will fix at a later date.
			stag = '';
			etag = '';
			ret = true;
			break;
			
		default:
			return false;
	}
	if(ret) {
		textarea.value = begin + stag + selection + etag + end; 
		textarea.scrollTop = textarea.scrollHeight;
		textarea.focus();
	}
}
function objProperties(obj) {
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent) {
		
		do {
			  curleft += obj.offsetLeft;
			  curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
function createDialog(PROP,ELE,NAME,OBJ,WIDTH) {
	if(document.getElementById('dialog')){
		destroyDialog();
		return false;
	}
	var pnode = OBJ.parentNode;
	var ndiv = document.createElement('div');
	ndiv.setAttribute('style','display:block;position:absolute;top:'+eval(PROP[1]+6)+'px;left:'+eval(PROP[0]+OBJ.offsetWidth+7)+'px;width:'+WIDTH+';height:auto;border:solid 2px #ADB3C8;background:#fff;padding:4px;');
	ndiv.setAttribute('id','dialog');
	ndiv.setAttribute('goesto',NAME);
	for(var i in ELE){
		ndiv.appendChild(ELE[i]);
	}
	pnode.appendChild(ndiv);
	return true;
}
function destroyDialog() {
	helper.removeChild(document.getElementById('dialog'));
}
function createEle(TYPE,ATTRIBUTES,HTM) {
	var ele = document.createElement(TYPE);
	for(var i in ATTRIBUTES){
		var spli = ATTRIBUTES[i].split('::');
		ele.setAttribute(spli[0],spli[1]);
	}
	if(HTM){
		ele.innerHTML = HTM;
	}
	return ele;
}
function applyhtml() {
	if(helper) {
	helper.innerHTML = ' \
		<input style="font-size:14px;width:20px;font-weight:bold;" value="b" name="bold" class="minibutton" title="Bolden text. [b][/b]" type="button"> \
		<input style="font-size:14px;width:20px;font-style:italic;" value="i" name="italic" class="minibutton" title="Italicize. [i][/i]" type="button"> \
		<input style="font-size:14px;width:20px;text-decoration:underline;" value="u" name="underline" class="minibutton" title="Underline text. [u][/u]" type="button"> \
		<input class="minibutton" name="strike" value="s" style="font-size:14px;width:20px;text-decoration:line-through;" title="Strike text. [s][/s]" type="button"> \
		<input class="minibutton" name="sup" value="sup" style="font-size:14px;" title="Superscript text. [sup][/sup]" type="button"> \
		<input class="minibutton" name="sub" value="sub" style="font-size:14px;" title="Subscript text. [sub][/sub]" type="button"> \
		<input class="minibutton" name="quote" value="quote" style="font-size:14px;" title="Quote text. [quote][/quote]" type="button"> \
		<input class="minibutton" name="headline" value="h" style="font-size:14px;width:20px;font-weight:bold;" title="Headline. [h1][/h1]-[h2][/h2]" type="button"> \
		<input class="minibutton" name="color" value="C" style="font-size:14px;width:20px;font-weight:bold;color:#c93535" title="Color text. [color=red][/color]" type="button"> \
		<input class="minibutton" name="size" value="size" style="font-size:14px;" title="Change size of text. [size=11][/size]" type="button"> \
		<input class="minibutton" name="align" value="align" style="font-size:14px" title="Align text. [align=left/right/center][/align]" type="button"><br> \
		<input class="minibutton" name="url" value="URL" style="font-size:14px;color:#2B4CC5" title="Add link. [url=link][/url]-[url]link[/url]" type="button"> \
		<input style="font-size:14px;color:#a135c9" value="image" name="image" class="minibutton" title="Add image. [img]link[/img]" type="button"> \
		<input class="minibutton" name="list" value="list" style="font-size:14px;" title="Make a list. [list][li]List item[/li][/list]" type="button">\
		<input class="minibutton" name="member" value="member" style="font-size:14px;" title="Link to member. [member][/member]" type="button"> \
		<input class="minibutton" name="series" value="series" style="font-size:14px;" title="Link to series. [series][/series]" type="button"> \
		<input style="font-size:14px;" value="tag" name="tag" class="minibutton" title="Link to tag. [tag][/tag]" type="button"> \
		<!-- <input title="Remove all formatting" style="font-size:14px;float:right;font-weight:bold;color:#ae013a;" value="[X]" name="x" class="minibutton" type="button"> -->\
		<!-- <input title="Close all open tags" style="margin-right: 2px;font-size:14px;float:right;font-weight:bold;color:#4c8911;" value="close" name="close" class="minibutton" type="button"> --> \
		\
		';
		return true;
	}
}
window.onload = init();