// ==UserScript==
// @name		Komica Uiharu Package ver.homu
// @namespace		http://userscripts.org/scripts/show/175317
// @downloadURL		http://userscripts.org/scripts/source/175317.user.js
// @updateURL		http://userscripts.org/scripts/source/175317.user.js

//綜合http://k0.dreamhosters.com/00/*
// @include	/^http://[\w]{1,10}\.dreamhosters\.com/[0-9]{2}/index\.php\?res=[0-9]*$/
// @include	/^http://[\w]{1,10}\.dreamhosters\.com/[0-9]{2}/([0-9]*|index)\.htm$/
//塗鴉王國http://homu.komica.org/*
// @include	/^http://[\w]{1,10}\.komica\.org/[0-9]{2}/index\.php\?res=[0-9]*$/
// @include	/^http://[\w]{1,10}\.komica\.org/[0-9]{2}/([0-9]*|index)\.htm$/

// @exclude		http://*.komica.org/00/del.php*
// @version		130406.1638.2
// ==/UserScript==

//var _131223_host_name = window.location.hostname.match(/^[^.]*/)[0];
var _131223_host_name = window.location.hostname;
var _131223_pdir_name = window.location.pathname.substr(1,2);

if(typeof GM_getValue == "function"){
	var getValue = GM_getValue;
	var setValue = GM_setValue;
}else{
	var Cookie = {
		PREFIX: '_greasekit_',
		prefixedName: function(name){
			return Cookie.PREFIX + name;
		},
		get: function(name){
			var name = escape(Cookie.prefixedName(name)) + '=';
			if(document.cookie.indexOf(name) >= 0){
				var cookies = document.cookie.split(/\s*;\s*/);
				for(var i = 0; i < cookies.length; i++){
					if(cookies[i].indexOf(name) == 0)
						return unescape(cookies[i].substring(name.length, cookies[i].length));
				}
			}
			return null;
		},
		set: function(name, value, options){
			newcookie = [escape(Cookie.prefixedName(name)) + "=" + escape(value)];
			if(options){
				if(options.expires) newcookie.push("expires=" + options.expires.toGMTString());
				if(options.path) newcookie.push("path=" + options.path);
				if(options.domain) newcookie.push("domain=" + options.domain);
				if(options.secure) newcookie.push("secure");
			}
			document.cookie = newcookie.join('; ');
		}
	}
	var getValue = function(name, defaultValue){
		var value = Cookie.get(name);
		if(value){
			if(value == 'true') return true;
			if(value == 'false') return false;
			return value;
		}
		else return defaultValue;
	}
	var setValue = function(name, value){
		var expiration = new Date();
		expiration.setFullYear(expiration.getFullYear() + 1);
		Cookie.set(name, value, { expires: expiration });
	}
}

var k, but, popup, ext_frame, q_rply, op_num, j, d, l, blk, pat1, pat2, sib, popup_img, X, Y, captcha;
var setting = 0, conf_flag = getValue("CONFIG");
var pageid = window.location.pathname.substr(1,2);
var hostid = window.location.hostname.match(/^[^.]*/)[0];
if(typeof conf_flag == "undefined"){
	setValue("CONFIG", 135);
	conf_flag = 135;
}

if(conf_flag & 1024){
	var id_click = (function(){
		var sheet = (function() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			var stylesheet = style.sheet;
			if(stylesheet.insertRule){
				stylesheet.addCSS = function(sel,val,index){
					this.insertRule(sel+'{'+val+'}',index);
				}
			}else{
				stylesheet.addCSS = function(sel,val,index){
					this.addRule(sel,val,index);
				}
			}
			if(document.all){stylesheet.rulename='rules';}
			else{stylesheet.rulename='cssRules';}
			stylesheet.selector=function(sel){
				var rules = this[this.rulename]
					,result=[];
				for(var i=0;i<rules.length;i++){
					if(rules[i].selectorText.toLowerCase()==sel.toLowerCase()){
						result.push(rules[i]);
					}
				}
				return result;
			}
			return stylesheet;
		})();
		var selsuid=false;
		var seluid;
		var gc = function(id){
			var r= 'rgb('+(id.charCodeAt(0)*57+id.charCodeAt(1)*25+id.charCodeAt(2)*54)%256+','+(id.charCodeAt(3)*853+id.charCodeAt(4)*45)%256+','+(id.charCodeAt(5)*83+id.charCodeAt(6)*91+id.charCodeAt(7)*77)%256+')';
			return r;
		}
		var idclick=function(suid,uid){
			var style;
			if(selsuid){
				style=sheet.selector(selsuid)[0].style;
				style.setProperty('background','transparent');
				style.setProperty('color',gc(seluid));
			}
			style=sheet.selector('.uid_'+suid)[0].style;
			style.setProperty('background','#F0F');
			style.setProperty('color','#000');
			selsuid='.uid_'+suid;
			seluid=uid;
		};
		var f=document.getElementsByTagName('font');
		var f2 = [];
		for(var i=0;i<f.length;i++){f2.push(f[i].nextSibling);}
		for(var i=0;i<f2.length;i++){
			var t = f2[i];
			if(t){
				var d = t.data;
				if(d){
					var pos = d.search('ID:');
					if(pos!=-1){
						var b = t.data.substr(pos+3).split(' ');
						t.data = d.substr(0,pos+3);
						t.parentNode.insertBefore(document.createTextNode(' '+b[1]+' '),t.nextSibling);
						var font = document.createElement('font');
						font.uid=b[0];
						font.suid = font.uid.replace(/\\/g,'Sb').replace(/\//g,'Ss').replace(/\./g,'Sd');
						font.idclick=idclick;
						font.onclick = function(){this.idclick(this.suid,this.uid);};
						font.id = 'uid_'+font.suid;
						font.className = 'uid_'+font.suid;
						font.innerHTML=font.uid;
						if(!sheet.selector('.uid_'+font.suid).length){
							sheet.addCSS('.uid_'+font.suid,'color:'+gc(font.uid),0);
						}
						t.parentNode.insertBefore(font,t.nextSibling);
					}
				}
			}
		}
		//return idclick;
	})();
}

if(conf_flag & 256){
	k = document.getElementsByTagName("meta");
	for(var i in k){
		if(k[i].content == "3;URL=index.htm" || k[i].content == "0;URL=index.htm")
			window.location = "http://"+_131223_host_name+"/"+_131223_pdir_name+"/index.htm";
	}
}

j = document.createElement("a");
j.id = "set_but";
j.innerHTML = "設定";
j.href = "javascript:void(0)";
j.onclick = function() {change_settings();};
document.getElementsByTagName("p")[0].id = "panel";
k = document.getElementById("panel");
k.innerHTML += " [";
k.appendChild(j);
j = document.createTextNode('the text');
j.textContent = "]";
k.appendChild(j);
j = document.createElement("table");
j.id = "panel_table";
j.align = "center";
j.style.display = "none";
j.innerHTML = "<tr><td><input type='checkbox' id='chk1'>隱藏驗證 </td><td><input type='checkbox' id='chk2'>大圖 </td><td><input type='checkbox' id='chk3'>去-cf </td><td><input type='checkbox' id='chk4'>藍字預覽 </td><td><input type='checkbox' id='chk9'>免驗證(實驗用) </td></tr><tr><td><input type='checkbox' id='chk5'>顯示第十頁 </td><td><input type='checkbox' id='chk6'>同視窗放大圖片 </td><td><input type='checkbox' id='chk7'>自動載入gif </td><td><input type='checkbox' id='chk8'>修正無縮圖(不建議) </td><td><input type='checkbox' id='chk10'>快速回覆 </td><td><input type='checkbox' id='chk11'>ID高亮 </td></tr>";
k.parentNode.insertBefore(j, k);
j = document.createElement("div");
j.innerHTML = "<small>- <a target='_blank' href='http://userscripts.org/scripts/show/175317'>Komica Uiharu Package</a> -</small><hr>";
j.id = "panel_url";
j.align = "center";
j.style.display = "none";
k.parentNode.insertBefore(j, k);

document.getElementById("chk1").onchange = function() {
	if(!this.checked){
		document.getElementById("chk9").checked = false;
	}
}
document.getElementById("chk9").onchange = function() {
	if(this.checked){
		document.getElementById("chk1").checked = true;
	}
}

op_num = new Array();
j = 0;
l = 0;
k = document.forms[1].getElementsByTagName("input");
d = document.forms[1].getElementsByClassName("del");
blk = document.forms[1].getElementsByTagName("blockquote");
for(var i in k){
	if(!(k[i] && k[i].type == "checkbox" && k[i].value == "delete")){
		continue;
	}
	var parent_num;
	if(k[i].parentNode && k[i].parentNode.tagName == "FORM"){
		op_num[j] = k[i].name;
		parent_num = op_num[j];
		j++;
	}
	var quote = document.createElement("font");
	quote.innerHTML = " ";
	quote.id = "q"+k[i].getAttribute("name")+"p"+parent_num;
	d[l].id = "d"+k[i].getAttribute("name")+"p"+parent_num;
	l++;
	blk[i].id = "b"+k[i].getAttribute("name")+"p"+parent_num;
	for(sib = k[i].nextSibling; sib.tagName != "A" || sib.className != "del"; sib = sib.nextSibling);
	sib.parentNode.insertBefore(quote, sib.nextSibling);
}

captcha = document.getElementById("freecap");

if(conf_flag & 1){
	captchap = captcha.parentNode.parentNode;
    captchap.parentNode.removeChild(captchap);
	//captcha.parentNode.parentNode.style.display = "none";
	if((conf_flag & 256) == 0){
		document.forms[0].getElementsByTagName("textarea")[0].onfocus = function() {captcha.parentNode.parentNode.style.display = "table-row";};
		document.querySelector("input[name=upfile]").onclick = function() {captcha.parentNode.parentNode.style.display = "table-row";};
		document.querySelector("input[name=pwd]").onfocus = function() {captcha.parentNode.parentNode.style.display = "table-row";};
		document.querySelector("input[name=textonly]").onclick = function() {captcha.parentNode.parentNode.style.display = "table-row";};
		document.querySelector("input[name=email]").onfocus = function() {captcha.parentNode.parentNode.style.display = "table-row";};
        void(document.cookie="PHPSESSID = hahauccu");
	}
}

if(conf_flag & 256){
	document.forms[0].action = "m/index.php";
	document.querySelector("textarea[name=comx5113]").name = "com";
}

if(conf_flag & 2){
	document.querySelector("input[name=MAX_FILE_SIZE]").value = "10000000";
}

if(conf_flag & 4){
	k = document.forms[1].getElementsByTagName("a");
	for(var i in k){
		if(k[i].href)
			k[i].href = k[i].href.replace("-cf", "");
	}
	k = document.forms[1].getElementsByTagName("img");
	for(var i in k){
		if(k[i].src)
			k[i].src = k[i].src.replace("-cf", "");
	}
}

if(conf_flag & 8){
	k = document.forms[1].getElementsByTagName("img");
	for(var i in k){
		if(k[i] && k[i].src && k[i].src.match("nothumb")){
			k[i].border = "0";
			k[i].style.display = "none";
			if(k[i].parentNode.parentNode.tagName == "FORM"){
				k[i].onload = function(){
					if(this.width > this.height){
						this.height = 250 * this.height / this.width;
						this.width = 250;
					}else{
						this.width = 250 * this.width / this.height;
						this.height = 250;
					}
					this.style.display = "inline";
				}
			}else{
				k[i].onload = function(){
					if(this.width > this.height){
						this.height = 125 * this.height / this.width;
						this.width = 125;
					}else{
						this.width = 125 * this.width / this.height;
						this.height = 125;
					}
					this.style.display = "inline";
				}
			}
			if(conf_flag & 32){
				if(window.opera){
					k[i].addEventListener("click", function(e) {e.preventDefault();}, false);
				}
				k[i].parentNode.onclick = function(e) {return enlarge_img(e);};
			}
			k[i].src = k[i].parentNode.href;
		}
	}
}

if((conf_flag & 16) && !(window.location.href.match(/.*res=\d*/))){
	var tmp = document.forms[1].getElementsByTagName("form")[0];
    if(tmp){
        if(window.location == "http://"+_131223_host_name+"/"+_131223_pdir_name+"/index.htm"){
            tmp.previousSibling.innerHTML = tmp.previousSibling.innerHTML.replace("以下省略","<a href='http://"+_131223_host_name+"/"+_131223_pdir_name+"/10.htm'>10</a>");
        }else if(tmp.action == "http://"+_131223_host_name+"/"+_131223_pdir_name+"/index.htm"){
            var page_10 = "window.location='http://"+_131223_host_name+"/"+_131223_pdir_name+"/10.htm'";
            tmp.nextSibling.nextSibling.innerHTML = tmp.nextSibling.nextSibling.innerHTML.replace("以下省略","<a href='http://"+_131223_host_name+"/"+_131223_pdir_name+"/10.htm'>10</a>");
            tmp.nextSibling.nextSibling.nextSibling.innerHTML = '<input type="button" value="下一頁" onclick="'+page_10+'">';
        }else if(tmp.action == "http://"+_131223_host_name+"/"+_131223_pdir_name+"/10.htm"){
            tmp.nextSibling.nextSibling.innerHTML = tmp.nextSibling.nextSibling.innerHTML.replace("以下省略","<b>10</b>");
        }else{
            tmp.nextSibling.nextSibling.innerHTML = tmp.nextSibling.nextSibling.innerHTML.replace("以下省略","<a href='http://"+_131223_host_name+"/"+_131223_pdir_name+"/10.htm'>10</a>");
        }
	}
}

if(conf_flag & 32){
	popup_img = document.createElement("a");
	popup_img.appendChild(document.createElement("img"));
	popup_img.id = "p_img";
	popup_img.onclick = function() {return close_img();};
	popup_img.style.position = "absolute";
	popup_img.style.display = "none";
	document.forms[1].appendChild(popup_img);
	k = document.forms[1].getElementsByTagName("img");
	for(var i in k){
		if(k[i] && k[i].src && k[i].src.match("thumb")){
			if(window.opera){
				k[i].addEventListener("click", function(e) {e.preventDefault();}, false);
			}
			k[i].parentNode.onclick = function(e) {return enlarge_img(e);};
		}
	}
}

if(conf_flag & 64){
	k = document.forms[1].getElementsByTagName("img");
	for(var i in k){
		if(k[i] && k[i].parentNode && k[i].parentNode.href && k[i].parentNode.href.match("gif")){
			k[i].style.display = "none";
			k[i].onload = function(){
				this.style.backgroundColor = "black";
				this.style.display = "inline";
			}
			k[i].src = k[i].parentNode.href;
		}
	}
}

if(conf_flag & 128){
	popup = document.createElement("div");
	popup.style.display = "none";
	popup.style.border = "1px solid gray";
	popup.style.backgroundColor = "#f0e0d6";
	popup.style.position = "fixed";
	document.forms[1].appendChild(popup);
	ext_frame = document.createElement("iframe");
	ext_frame.id = "ext_frame";
	ext_frame.style.display = "none";
	document.forms[1].appendChild(ext_frame);

	k = document.forms[1].getElementsByTagName("font");
	pat1 = /^(&gt;)+ *No\.[1-9]\d{4,} *$/;
	pat2 = /^(&gt;)+ *No\./;
	for(var i in k){
		if(k[i].color != "789922" || !k[i].innerHTML.match(pat1)){
			continue;
		}
		var cur_res = k[i];
		var flag = 0;
		var res_num = cur_res.innerHTML.replace(pat2,"").replace(/ *$/,"");
		var blk_num = cur_res.parentNode.id.replace("b","").replace(/p.*/,"");
		var par_num = cur_res.parentNode.id.replace(/.*p/,"");
		var tmp = document.getElementById("q"+res_num+"p"+par_num);
		if(tmp == null){
			if(window.location.href.match(/res=/)){
				cur_res.innerHTML = "<s>>No."+res_num+"</s>";
				cur_res.style.color = "blue";
			}else{
				cur_res.innerHTML = ">No."+res_num+"-";
				cur_res.style.color = "blue";
				cur_res.onmouseover = function(e) {return pre_fetch_iframe(e);};
				cur_res.onmouseout = function() {return end_fetch_iframe();};
			}
			continue;
		}
		var kids = tmp.childNodes.length;
		for(j = 0; j < kids; j++){
			if(tmp.childNodes[j].name == blk_num){
				flag = 1;
				break;
			}
		}
		if(flag == 0){
			var rply = document.createElement("small");
			rply.innerHTML = ">No."+blk_num;
			rply.name = blk_num;
			rply.style.border = "3px solid transparent";
			rply.style.color = "blue";
			if(res_num != blk_num){
				rply.onmouseover = function(e) {return pre_fetch(e);};
				rply.onmouseout = function(e) {return end_fetch(e);};
			}else{
				rply.onmouseover = function(e) {return pre_fetch_op(e);};
				rply.onmouseout = function() {return end_fetch_op();};
			}
			tmp.appendChild(rply);
		}
		flag = 0;
		for(j = 0; j < 10; j++){
			if(res_num == op_num[j]){
				cur_res.innerHTML = ">No."+res_num+"(OP)";
				cur_res.style.color = "blue";
				cur_res.onmouseover = function(e) {return pre_fetch_op(e);};
				cur_res.onmouseout = function() {return end_fetch_op();};
				flag = 1;
				break;
			}
		}
		if(flag == 0){
			cur_res.style.color = "blue";
			cur_res.onmouseover = function(e) {return pre_fetch(e);};
			cur_res.onmouseout = function(e) {return end_fetch(e);};
		}
	}
	for(var i in k){
		if(k[i].color == "#707070"){
			k[i].innerHTML = k[i].innerHTML.replace("要閱讀","").replace("下返信連結","<a href='http://"+_131223_host_name+"/"+_131223_pdir_name+"/index.php?res=" + k[i].previousSibling.id.replace(/.*p/,"") + "'>這裡</a>閱讀");
		}
	}
}


if(conf_flag & 512){
	q_rply = document.createElement("form");
	q_rply.setAttribute("enctype", "multipart/form-data");
	q_rply.setAttribute("method", "POST");
	q_rply.setAttribute("action", "m/index.php");
	q_rply.innerHTML = "<input type='hidden' value='regist' name='mode'><input type='hidden' value='10000000' name='MAX_FILE_SIZE'><input type='hidden' id='q_resto' value='' name='resto'><table><tr><td><input type='text' size='28' name='email' placeholder='E-mail'><input type='submit' value='送出'><a id='close_q_rply' href='javascript:void(0)' style='float:right'>[x]</a></td></tr><tr><td><textarea id='q_textarea' style='width:390' wrap='soft' rows='4' cols='48' name='com' placeholder='內文'></textarea></td></tr><tr><td><input type='file' size='35' name='upfile'></td></tr><tr><td><input type='password' value='' maxlength='8' size='8' name='pwd' placeholder='刪除密碼'><div style='float:right'>[<label><input type='checkbox' value='on' name='textonly'>無貼圖</label>]</div></td></tr></table>";
	q_rply.style.width = 400;
	q_rply.style.position = "fixed";
	q_rply.style.right = "50px";
	q_rply.style.top = "160px";
	q_rply.style.backgroundColor = "ffffee";
	q_rply.style.border = "2px solid gray";
	q_rply.style.display = "none";
	document.forms[1].appendChild(q_rply);
	document.getElementById("close_q_rply").onclick = function(){close_quick_reply()};
	if((conf_flag & 256) == 0){
		var clone_captcha = captcha.parentNode.cloneNode(true);
		clone_captcha.id = "cl_captcha";
		q_rply.setAttribute("action", "index.php");
		document.getElementById("q_textarea").setAttribute("name", "comx5113");
		document.getElementById("q_textarea").parentNode.parentNode.parentNode.appendChild(clone_captcha);
	}
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".q_hvr:hover {color:red;}";
	document.head.appendChild(css);
	d = document.forms[1].getElementsByClassName("del");
	for(var i in d){
		if(d[i].id == undefined){
			continue;
		}
		var tmp_font = document.createElement("font");
		tmp_font.innerHTML = "No."+d[i].id.replace("d", "").replace(/p.*/, "");
		tmp_font.setAttribute("class", "q_hvr");
		tmp_font.id = d[i].id.replace("d","r");
		tmp_font.onclick = function(e) {quick_reply(e);};
		d[i].previousSibling.textContent = d[i].previousSibling.textContent.replace(/No.*/, "");
		d[i].parentNode.insertBefore(tmp_font, d[i]);
	}
	for(var i in d){
		if(d[i].id == undefined){
			continue;
		}
		d[i].parentNode.insertBefore(document.createTextNode(" "), d[i]);
	}
}

function quick_reply(e){
	q_rply.style.display = "inline";
	document.getElementById("q_textarea").focus();
	if(document.getElementById("q_resto").value == e.target.id.replace(/.*p/, "")){
		document.getElementById("q_textarea").value = document.getElementById("q_textarea").value + ">>"+e.target.innerHTML + "\n";
	}else{
		document.getElementById("q_resto").value = e.target.id.replace(/.*p/,"");
		document.getElementById("q_textarea").value = ">>"+e.target.innerHTML+"\n";
	}
}

function close_quick_reply(){
	q_rply.style.display = "none";
	document.getElementById("q_textarea").value = "";
}

function pre_fetch(e){
	var res = document.getElementById("b"+e.target.innerHTML.replace(pat2,"").replace(/ *$/,"")+"p"+e.target.parentNode.id.replace(/.*p/,""));
	if(res.parentNode.getBoundingClientRect().top < 0 || res.parentNode.getBoundingClientRect().bottom > window.innerHeight){
		popup.innerHTML = res.parentNode.innerHTML;
		improve_pop_pos(e, e.target.getBoundingClientRect());
	}else{
		res.parentNode.style.backgroundColor = "f0c1b1";
	}
}

function pre_fetch_op(e){
	var tmp_res_num = e.target.innerHTML.replace(pat2,"").replace(/ *\(OP\)$/,"");
	var tmp_sib;
	for(tmp_sib = document.getElementById("b"+tmp_res_num+"p"+tmp_res_num); tmp_sib.previousSibling && (!tmp_sib.previousSibling.tagName || tmp_sib.previousSibling.tagName != "HR"); tmp_sib = tmp_sib.previousSibling);
	if(tmp_sib.nextSibling.getBoundingClientRect().top >= 0){
		return;
	}
	var tmp_parent = document.createElement("div");
	var tmp_inner_str = "";
	for(tmp_sib = document.getElementById("b"+tmp_res_num+"p"+tmp_res_num); ; tmp_sib = tmp_sib.previousSibling){
		if(tmp_sib == "[object Text]"){
			tmp_inner_str = tmp_sib.textContent+tmp_inner_str;
		}else if(tmp_sib != null && tmp_sib.tagName != "HR"){
			var clone_sib = tmp_sib.cloneNode(true);
			tmp_parent.appendChild(clone_sib);
			tmp_inner_str = tmp_parent.innerHTML+tmp_inner_str;
			tmp_parent.removeChild(clone_sib);
		}else{
			break;
		}
	}
	popup.innerHTML = tmp_inner_str.replace(/name=.\d*."/,"").replace(/\[.*\]/,"");
	improve_pop_pos(e, e.target.getBoundingClientRect());
}

function pre_fetch_iframe(e){
	if(!window.location.href.match(/res=/)){
		var ext_url = "http://"+_131223_host_name+"/"+_131223_pdir_name+"/index.php?res="+e.target.parentNode.id.replace(/.*p/,"");
		ext_frame.src = ext_url;
		window.addEventListener("mousemove", update_pos, false);
		document.getElementById("ext_frame").onload = function(){
			if(X < e.target.getBoundingClientRect().left || X > e.target.getBoundingClientRect().right || Y < e.target.getBoundingClientRect().top || Y > e.target.getBoundingClientRect().bottom){
				window.removeEventListener("mousemove", update_pos, false);
				return;
			}
			window.removeEventListener("mousemove", update_pos, false);
			var iframe_res = document.getElementById("ext_frame").contentDocument.getElementById("b"+e.target.innerHTML.replace(pat2,"").replace("-","")+"p"+e.target.parentNode.id.replace(/.*p/,""));
			if(iframe_res){
				popup.innerHTML = iframe_res.parentNode.innerHTML;
				improve_pop_pos(e, e.target.getBoundingClientRect());
			}else{
				e.target.onmouseover = null;
				e.target.onmouseout = null;
				e.target.innerHTML = "<s>"+e.target.innerHTML.replace("-","")+"</s>"
			}
		};
	}
}

function end_fetch(e){
	popup.style.display = "none";
	document.getElementById("b"+e.target.innerHTML.replace(pat2,"").replace(/ *$/,"")+"p"+e.target.parentNode.id.replace(/.*p/,"")).parentNode.style.backgroundColor = "f0e0d6";
}

function end_fetch_op(){
	popup.style.display = "none";
}

function end_fetch_iframe(){
	popup.style.display = "none";
	window.frames[0].stop();
}

function enlarge_img(e){
	popup_img.style.display = "none";
	while(popup_img.firstChild){
		popup_img.removeChild(popup_img.firstChild);
	}
	var new_img = new Image();
	new_img.onload = function(){
		var img_w = this.width;
		var img_h = this.height;
		var p_i = document.getElementById("p_img");
		p_i.style.width = img_w+"px";
		p_i.style.height = img_h+"px";
		if(img_w > window.innerWidth - 42){
			p_i.style.width = (window.innerWidth - 42)+"px";
			p_i.style.height = (window.innerWidth - 42)*img_h/img_w+"px";
			img_w = parseInt(p_i.style.width.replace("px",""));
			img_h = parseInt(p_i.style.height.replace("px",""));
		}
		if(img_h > window.innerHeight - 42){
			p_i.style.height = (window.innerHeight - 42)+"px";
			p_i.style.width = parseInt(p_i.style.height.replace("px",""))*img_w/img_h+"px";
		}
		img_w = parseInt(p_i.style.width.replace("px",""));
		img_h = parseInt(p_i.style.height.replace("px",""));
		p_i.style.width = (parseInt(p_i.style.width.replace("px",""))+8)+"px";
		p_i.style.height = (parseInt(p_i.style.height.replace("px",""))+8)+"px";
		if(e.clientX-img_w/2 < 0){
			p_i.style.right = null;
			p_i.style.left = "6px";
		}else if(e.clientX+img_w/2 > window.innerWidth){
			p_i.style.left = null;
			p_i.style.right = "12px";
		}else{
			p_i.style.right = null;
			p_i.style.left = e.clientX-img_w/2+4+"px";
		}
		if(e.clientY-img_h/2 < 0){
			p_i.style.top = e.pageY-e.clientY+6+"px";
			//p_i.style.top = e.pageY+6+"px";
		}else if(e.clientY+img_h/2 > window.innerHeight){
			p_i.style.top = e.pageY+(window.innerHeight-e.clientY)-img_h-18+"px";
		}else{
			p_i.style.top = e.pageY-img_h/2-4+"px";
		}
		//p_i.style.top = e.pageY-img_h/2-4+"px";
		p_i.href = this.src;
		p_i.style.display = "inline";
	}
	new_img.src = e.target.parentNode.href;
	new_img.setAttribute("style","max-width:100%; max-height:100%; border: 4px solid gray; background-color: black;");
	popup_img.appendChild(new_img);
	return false;
}

function close_img(){
	document.getElementById("p_img").style.display = "none";
	return false;
}

function improve_pop_pos(e, rect){
	if(e.clientX < window.innerWidth - e.clientX){
		popup.style.right = null;
		popup.style.left = parseInt(e.clientX)-15;
	}else{
		popup.style.left = null;
		popup.style.right = window.innerWidth - parseInt(e.clientX)-15;
	}
	if(e.clientY < window.innerHeight - e.clientY){
		popup.style.bottom = null;
		popup.style.top = parseInt(rect.bottom);
	}else{
		popup.style.top = null;
		popup.style.bottom = window.innerHeight - parseInt(rect.top);
	}
	popup.style.display = "inline";
}

function update_pos(e){
	X = e.clientX;
	Y = e.clientY;
}

function change_settings(){
	var tmp_table, tmp_url, tmp_hr;
	tmp_table = document.getElementById("panel_table");
	tmp_url = document.getElementById("panel_url");
	if(setting == 0){
		var tmp = getValue("CONFIG");
		if(tmp & 1){
			document.getElementById("chk1").checked = true;
		}
		if(tmp & 2){
			document.getElementById("chk2").checked = true;
		}
		if(tmp & 4){
			document.getElementById("chk3").checked = true;
		}
		if(tmp & 8){
			document.getElementById("chk8").checked = true;
		}
		if(tmp & 16){
			document.getElementById("chk5").checked = true;
		}
		if(tmp & 32){
			document.getElementById("chk6").checked = true;
		}
		if(tmp & 64){
			document.getElementById("chk7").checked = true;
		}
		if(tmp & 128){
			document.getElementById("chk4").checked = true;
		}
		if(tmp & 256){
			document.getElementById("chk9").checked = true;
			document.getElementById("chk1").checked = true;
		}
		if(tmp & 512){
			document.getElementById("chk10").checked = true;
		}
		if(tmp & 1024){
			document.getElementById("chk11").checked = true;
		}
		tmp_table.style.display = "table";
		tmp_url.style.display = "block";
		document.getElementById("set_but").innerHTML = "Save";
		setting = 1;
	}else{
		var tmp = 0;
		if(document.getElementById("chk1").checked){
			tmp += 1;
		}
		if(document.getElementById("chk2").checked){
			tmp += 2;
		}
		if(document.getElementById("chk3").checked){
			tmp += 4;
		}
		if(document.getElementById("chk8").checked){
			tmp += 8;
		}
		if(document.getElementById("chk5").checked){
			tmp += 16;
		}
		if(document.getElementById("chk6").checked){
			tmp += 32;
		}
		if(document.getElementById("chk7").checked){
			tmp += 64;
		}
		if(document.getElementById("chk4").checked){
			tmp += 128;
		}
		if(document.getElementById("chk9").checked){
			tmp += 256;
		}
		if(document.getElementById("chk10").checked){
			tmp += 512;
		}
		if(document.getElementById("chk11").checked){
			tmp += 1024;
		}
		setValue("CONFIG", tmp);
		tmp_table.style.display = "none";
		tmp_url.style.display = "none";
		document.getElementById("set_but").innerHTML = "設定";
		setting = 0;
	}
}