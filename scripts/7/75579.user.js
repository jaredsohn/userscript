//
// ==UserScript==
// @name          Dirty Service Pack 1
// @namespace     http://dirty.ru/
// @description   Dirty Service Pack 1
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Funtions and Params


* * * * * * * * * * * * * * * * * * * * * * * * * */

function DSP_set_setting(name,option){

	if(option.toString().indexOf('"')>0){
		option = option.toString().split('"').join('\\"');
	}

	if(document.cookie.indexOf('dsp.settings=')>0){
		var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);

		if(param.indexOf(name+':')>0){
			eval("var temp_name = name+':\"'+dsp_settings."+name+".split('\"').join('\\\\\"')+'\"';");
			param = param.split(temp_name).join(name+':"'+option+'"');
		}
		else param = param.split('}').join(','+name+':"'+option+'"}');

		document.cookie = "dsp.settings="+escape(param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		eval("dsp_settings="+unescape(param));
	}
	else{
		document.cookie = "dsp.settings="+escape('{'+name+':"'+option+'"}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
	}
}


function DSP_get_settings(){

	if(document.cookie.indexOf('dsp.settings=')>0){
		var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);
		eval("dsp_settings="+unescape(param));
	}

}

var dsp_settings = '';
var dsp_location = window.location.href.split(window.location.host)[1];

DSP_get_settings();

if(!dsp_settings.use_pictures) DSP_set_setting('use_pictures',1);
if(!dsp_settings.username_replace) DSP_set_setting('username_replace',0);
if(!dsp_settings.posts_average) DSP_set_setting('posts_average',0);
if(!dsp_settings.youtube_fullscreen) DSP_set_setting('youtube_fullscreen',1);
if(!dsp_settings.tooltip_on) DSP_set_setting('tooltip_on',1);
if(!dsp_settings.tooltip_with_notepad) DSP_set_setting('tooltip_with_notepad',1);
if(!dsp_settings.tooltip_show_self) DSP_set_setting('tooltip_show_self',1);
if(!dsp_settings.notepad_on) DSP_set_setting('notepad_on',1);
if(!dsp_settings.vote_viewer_on) DSP_set_setting('vote_viewer_on',1);
if(!dsp_settings.favicon_on){ DSP_set_setting('favicon_on',1); DSP_set_setting('favicon_style',0); }
if(!dsp_settings.colors_on) DSP_set_setting('colors_on',0);
if(!dsp_settings.colors_border) DSP_set_setting('colors_border',1);
if(!dsp_settings.colors){ DSP_set_setting('colors','[]');}
if(!dsp_settings.after_load) DSP_set_setting('after_load',1);


if(dsp_location.indexOf('/off/')!=0){

	var dsp_general_bar = '';
	var dsp_general_param = '';
	var dsp_viewx = 0;
	var dsp_viewy = 0;
	var dsp_check_change_pictures = 1;
	var dsp_isOpera = (navigator.userAgent.toLowerCase().indexOf('opera')!=-1)?true:false;
	var dsp_self_name = document.getElementById('greetings').innerHTML.split('dirty.ru/users/')[1].split('<')[0].split('>')[1];
	var dsp_self_num = document.getElementById('greetings').innerHTML.split('dirty.ru/users/')[1].split('"')[0];


	function DSP_make_General_Bar(){

		var dsp_output = '';
		var dsp_left_panel = document.getElementsByTagName('div');

		for(var i=0; i<dsp_left_panel.length; i++){

			if(dsp_left_panel[i].className=='layout_left'){

				dsp_left_panel = dsp_left_panel[i];
				break;
			}
		}

		var dsp_bars = '';
		var dsp_params = '';

		for(var i=0; i<6; i++){
			dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
			dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(http://pit.dirty.ru/dirty/1/2010/04/27/11119-033725-660249a537b6f5822a9918ea8835026b.png) 7px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';
		dsp_output += '<div id="dsp_settings" style="display:none;position:fixed;top:'+((dsp_viewy-300)/2)+'px;left:'+((dsp_viewx-500)/2)+'px;width:500px;height:300px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="500" height="300"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td valign="top" colspan="2" height="30" style="font-size:14pt;color:#5880af">Разные штуки</td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="font-size:10pt">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
		dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';

		dsp_left_panel.innerHTML += dsp_output;

		document.getElementById('dsp_setting_bar').addEventListener('click',function(){DSP_make_content_settings()},false);
		document.getElementById('dsp_setting_close').addEventListener('click',function(){DSP_show_hide_menu('dsp_settings')},false);
		dsp_general_bar = document.getElementById('dsp_settings_panels');
		dsp_general_param = document.getElementById('dsp_settings_props');
	}



	function DSP_make_Setting_Bar(title,params,init){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){
			if(document.getElementById('dsp_setting_button_'+dsp_setting_id).innerHTML.length<10) break;
			else dsp_setting_id++;
		}

		document.getElementById('dsp_setting_button_'+dsp_setting_id).style.borderTop = '1px solid #b6b6b6';
		document.getElementById('dsp_setting_button_'+dsp_setting_id).innerHTML += '<span style="margin-left:10px;cursor:pointer" id="dsp_setting_link_'+dsp_setting_id+'">'+title+'</span>';
		document.getElementById('dsp_setting_link_'+dsp_setting_id).addEventListener('click',function(e){var dsp_layer=parseInt(e.target.id.split('_')[3]);DSP_show_hide_setting(dsp_layer)},true);
		document.getElementById('dsp_setting_'+dsp_setting_id).innerHTML += params;
		eval(init);
	}


	function DSP_get_view_area_size(){

		dsp_viewy = parseInt(((document.compatMode||dsp_isIE)&&!dsp_isOpera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		dsp_viewx = parseInt(((document.compatMode||dsp_isIE)&&!dsp_isOpera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);

	}


	function DSP_show_hide_menu(name){

		var dsp_layer = document.getElementById(name);

		if(dsp_layer.style.display=='block') dsp_layer.style.display = 'none';
		else dsp_layer.style.display = 'block';
	}


	function DSP_show_hide_setting(num){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){

			if(document.getElementById('dsp_setting_'+dsp_setting_id).style.display=='block'){
				document.getElementById('dsp_setting_'+dsp_setting_id).style.display = 'none';
				document.getElementById('dsp_setting_button_'+dsp_setting_id).style.borderRight = '1px solid #b6b6b6';
				document.getElementById('dsp_setting_button_'+dsp_setting_id).style.backgroundColor = '#edf1f6';
				document.getElementById('dsp_setting_button_'+dsp_setting_id).style.fontWeight = 'normal';

				if(dsp_setting_id<5){

					if(document.getElementById('dsp_setting_button_'+(dsp_setting_id+1)).innerHTML=='&nbsp;'){
						document.getElementById('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #edf1f6';
					}
					else{
						document.getElementById('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #b6b6b6';
					}
				}
			}
			dsp_setting_id++;
		}

		document.getElementById('dsp_setting_'+num).style.display = 'block';
		document.getElementById('dsp_setting_button_'+num).style.borderRight = '1px solid #fff';
		document.getElementById('dsp_setting_button_'+num).style.backgroundColor = '#fff';
		document.getElementById('dsp_setting_button_'+num).style.fontWeight = 'bold';

		if(num<5) document.getElementById('dsp_setting_button_'+(num+1)).style.borderTop = '1px solid #b6b6b6';
	}


	function DSP_getPosition(el){
		var rv = {x:0,y:0}
		while (el) {
			rv.x += el.offsetLeft;
			rv.y += el.offsetTop;
			el = el.offsetParent;
		}
		return rv;
	}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Favicons


* * * * * * * * * * * * * * * * * * * * * * * * * */


	function DSP_show_favicon(obj,show){
		if(show==1){
			var favicon = 'http://favicon.yandex.ru/favicon/'+obj.toString().split('/')[2];
			obj.style.paddingTop='16px';
			obj.style.backgroundImage = 'url('+favicon+')';
			obj.style.backgroundRepeat = 'no-repeat';
		}
		else obj.style.backgroundImage = 'none';
	}


	
/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Username Replace


* * * * * * * * * * * * * * * * * * * * * * * * * */

function DSP_replace_username(option){

	var dsp_content_nodes = document.getElementById('main').getElementsByClassName('dt');
	var dsp_first = '%username%';
	var dsp_second = dsp_self_name;

	if(option==0){
		dsp_first = dsp_self_name;
		dsp_second = '%username%';
	}

	for(var i=0; i<dsp_content_nodes.length; i++){
		if(dsp_content_nodes[i].innerHTML.indexOf(dsp_first)>-1){
			dsp_content_nodes[i].innerHTML = dsp_content_nodes[i].innerHTML.split(dsp_first).join(dsp_second);
		}
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Color Picker + User Skiper


* * * * * * * * * * * * * * * * * * * * * * * * * */

var dsp_all_comments = '';
var dsp_color_user = '';

function DSP_paint_comment(name,color,font){

	if(color!='transparent'){
		color = '#'+color;
		font = '#'+font;
	}

	for(var i=0;i<dsp_all_comments.length;i++){
		if(dsp_all_comments[i].getElementsByTagName('a')[1].innerHTML.toString()==name.toString()){
			var temp_div = dsp_all_comments[i].parentNode.parentNode.getElementsByClassName('dt')[0];

			if(color.toLowerCase()!='#ffffff'){
				temp_div.style.padding = (color!='transparent')?'5px':'0';
				if(color=='transparent') temp_div.style.paddingBottom = '0.5em';
				temp_div.style.backgroundColor = color;
				temp_div.style.color = font;

				dsp_all_comments[i].style.padding = (color!='transparent')?'5px':'0';
				dsp_all_comments[i].style.backgroundColor = color;
				dsp_all_comments[i].style.color = font;

				if(color!='transparent') var link_color = (font=='#fff')?'#e3e3e3':'#393939';
				else var link_color = '';

				var div_links = dsp_all_comments[i].parentNode.parentNode.getElementsByTagName('a');

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}

				dsp_all_comments[i].getElementsByTagName('span')[2].style.display = (color=='transparent')?'none':'inline';
			}
		}

		if(dsp_settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>0){
				dsp_all_comments[i].parentNode.parentNode.style.border = '1px solid #666';
			}
		}
	}
}

function DSP_color_remove(obj){

	var user = obj.parentNode.parentNode.getElementsByTagName('a')[1].innerHTML;

	eval('var temp_array='+dsp_settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){
			delete temp_array[i];
		}
	}

	DSP_set_setting('colors','["'+temp_array.join('","')+'"]');
	DSP_paint_comment(user,'transparent','');
}

function DSP_save_color(){

	var color = dsp_color_user.title.split('#').join('');
	var user = dsp_color_user.parentNode.getElementsByTagName('a')[1].innerHTML;
	var font = dsp_color_user.name;
	var checker = 0;

	eval('var temp_array='+dsp_settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){

			temp_array[i] = user+','+color+','+font;
			checker = 1;
			break;
		}
	}

	if(checker==0) temp_array.push(user+','+color+','+font);

	DSP_set_setting('colors','["'+temp_array.join('","')+'"]');
}

var dsp_jscolor = {

	bindClass : 'dsp_color',
	binding : true,


	init : function() {
		if(dsp_jscolor.binding) {
			dsp_jscolor.bind();
		}
	},

	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+dsp_jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var el = document.getElementsByTagName('a');
		for(var i=0; i<el.length; i+=1) {
			var m;
			if(!el[i].color && el[i].className && (m = el[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				el[i].color = new dsp_jscolor.color(el[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in dsp_jscolor.imgRequire) {
			if(dsp_jscolor.imgRequire.hasOwnProperty(fn)) {
				dsp_jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		dsp_jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!dsp_jscolor.imgLoaded[filename]) {
			dsp_jscolor.imgLoaded[filename] = new Image();
			dsp_jscolor.imgLoaded[filename].src = filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) {
			el['on'+evnt]();
		}
	},


	dsp_getElementPos : function(obj) {
		var e1=obj, e2=obj;
		var x=0, y=0;
		if(e1.offsetParent){
			do{
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(el) {
		return [el.offsetWidth, el.offsetHeight];
	},


	getMousePos : function(e){
		if(!e) { e = window.event; }
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			];
		}
	},


	getViewPos : function(){
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},



	color : function(otarget, prop) {

		this.required = true;
		this.adjust = true;
		this.hash = false;
		this.caps = true;
		this.valueElement = otarget;
		this.styleElement = otarget;
		this.hsv = [0,0,1];
		this.rgb = [1,1,1];

		this.pickerOnfocus = true;
		this.pickerPosition = 'bottom';
		this.pickerFace = 10;
		this.pickerBorder = 0;
		this.pickerInset = 0;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}

		this.showPicker = function(){
			if(!isPickerOwner()) {

				var tp = dsp_jscolor.dsp_getElementPos(otarget);
				var ts = dsp_jscolor.getElementSize(otarget);
				var vp = dsp_jscolor.getViewPos();
				var vs = dsp_jscolor.getViewSize();
				var ps = [
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];

				drawPicker(pp[a]-28, pp[b]+26);

			}
		};


		this.exportColor = function(flags){
			if(!(flags & leaveValue) && valueElement){
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var value = this.toString();
				if(this.caps) value = value.toUpperCase();
				valueElement.title = value;
				valueElement.name = temp_font;

			}
			if(!(flags & leaveStyle) && styleElement) {
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var temp_color = this.toString().split('#').join();

				DSP_paint_comment(otarget.parentNode.getElementsByTagName('a')[1].innerHTML,temp_color,temp_font);
			}

			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) {
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) {
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) {
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else {
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r,g,b){
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h,s,v){
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker(){
			DSP_save_color();
			document.getElementsByTagName('body')[0].removeChild(dsp_jscolor.picker.boxB);
			document.getElementById("dsp_color_show_div").style.display = 'none';
			delete dsp_jscolor.picker;
		}


		function drawPicker(x,y){
			var dsp_color = document.getElementById("dsp_color_show_div");
			if(!dsp_color){
				document.body.appendChild(dsp_color = document.createElement('div'));
				dsp_color.id = 'dsp_color_show_div';
				dsp_color.style.position = 'absolute';
				dsp_color.style.zIndex = 1399;
				dsp_color.innerHTML = '<table cellspacing="0" cellpadding="0" width="282" height="160" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';

				dsp_color.appendChild(dsp_closer = document.createElement('div'));
				dsp_closer.id = 'dsp_color_closer';
				dsp_closer.style.backgroundColor = '#999';
				dsp_closer.style.position = 'absolute';
				dsp_closer.style.width = '20px';
				dsp_closer.style.height = '20px';
				dsp_closer.style.fontSize = '8pt';
				dsp_closer.style.lineHeight = '18px';
				dsp_closer.style.textAlign = 'center';
				dsp_closer.style.color = '#fff';
				dsp_closer.style.cursor = 'pointer';
				dsp_closer.style.zIndex = 1400;
				dsp_closer.style.left = '237px';
				dsp_closer.style.top = '30px';
				dsp_closer.innerHTML = '<b>x</b>';
				dsp_closer.addEventListener('click',function(){ removePicker(); },true);
			}

			dsp_color.style.left = (x-5)+'px';
			dsp_color.style.top = (y-20)+'px';
			dsp_color.style.display = 'block';



			if(!dsp_jscolor.picker){

				dsp_jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div')
				};
				for(var i=0,segSize=4; i<dsp_jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					dsp_jscolor.picker.sld.appendChild(seg);
				}
				dsp_jscolor.picker.sldB.appendChild(dsp_jscolor.picker.sld);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldM);
				dsp_jscolor.picker.padB.appendChild(dsp_jscolor.picker.pad);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padM);
				dsp_jscolor.picker.boxB.appendChild(dsp_jscolor.picker.box);
			}



			var p = dsp_jscolor.picker;

			posPad = [
				x+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];
			posSld = [
				null,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];

			p.box.addEventListener('mouseout',function() { otarget.focus(); },true);
			p.box.addEventListener('click',function(e) { holdPad && setPad(e); holdSld && setSld(e);},true);
			p.padM.addEventListener('mouseout',function() { if(holdPad) { holdPad=false; dsp_jscolor.fireEvent(valueElement,'change'); } },true);
			p.padM.addEventListener('click',function(e) { holdPad=true; setPad(e); },true);
			p.sldM.addEventListener('mouseout',function() { if(holdSld) { holdSld=false; dsp_jscolor.fireEvent(valueElement,'change'); } },true);
			p.sldM.addEventListener('click',function(e) { holdSld=true; setSld(e); },true);

			p.box.style.width = 4*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[1] + 'px';

			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = 1400;
			p.boxB.style.border = DSP_this.pickerBorder+'px solid';

			p.pad.style.width = dsp_jscolor.images.pad[0]+'px';
			p.pad.style.height = dsp_jscolor.images.pad[1]+'px';

			p.padB.style.position = 'absolute';
			p.padB.style.left = DSP_this.pickerFace+'px';
			p.padB.style.top = DSP_this.pickerFace+'px';
			p.padB.style.border = DSP_this.pickerInset+'px solid';

			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = DSP_this.pickerFace + 2*DSP_this.pickerInset + dsp_jscolor.images.pad[0] + dsp_jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			p.sld.style.overflow = 'hidden';
			p.sld.style.width = dsp_jscolor.images.sld[0]+'px';
			p.sld.style.height = dsp_jscolor.images.sld[1]+'px';

			p.sldB.style.position = 'absolute';
			p.sldB.style.right = DSP_this.pickerFace+'px';
			p.sldB.style.top = DSP_this.pickerFace+'px';
			p.sldB.style.border = DSP_this.pickerInset+'px solid';

			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = dsp_jscolor.images.sld[0] + dsp_jscolor.images.arrow[0] + DSP_this.pickerFace + 2*DSP_this.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			p.sldM.style.cursor = 'pointer';


			p.padM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif) no-repeat";
			p.padB.style.border = '1px solid #b6b6b6';
			p.sldB.style.border = '1px solid #b6b6b6';
			p.sldM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif) no-repeat";
			p.pad.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png) 0 0 no-repeat";

			redrawPad();
			redrawSld();

			dsp_jscolor.picker.owner = DSP_this;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);

		}


		function redrawPad() {
			var yComponent = 1;
			var x = Math.round((DSP_this.hsv[0]/6) * (dsp_jscolor.images.pad[0]-1));
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.pad[1]-1));
			dsp_jscolor.picker.padM.style.backgroundPosition =
				(DSP_this.pickerFace+DSP_this.pickerInset+x - Math.floor(dsp_jscolor.images.cross[0]/2)) + 'px ' +
				(DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.cross[1]/2)) + 'px';

			var seg = dsp_jscolor.picker.sld.childNodes;

			var rgb = HSV_RGB(DSP_this.hsv[0], DSP_this.hsv[1], 1);
			for(var i=0; i<seg.length; i+=1) {
				seg[i].style.backgroundColor = 'rgb('+
					(rgb[0]*(1-i/seg.length)*100)+'%,'+
					(rgb[1]*(1-i/seg.length)*100)+'%,'+
					(rgb[2]*(1-i/seg.length)*100)+'%)';
			}
		}


		function redrawSld() {
			var yComponent = 2;
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.sld[1]-1));
			dsp_jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			if(dsp_jscolor.picker) return dsp_jscolor.picker && dsp_jscolor.picker.owner === DSP_this;
		}


		function setPad(e){
			var posM = dsp_jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(x*(6/(dsp_jscolor.images.pad[0]-1)), 1 - y/(dsp_jscolor.images.pad[1]-1), null, leaveSld);
		}


		function setSld(e) {
			var posM = dsp_jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(null, null, 1 - y/(dsp_jscolor.images.sld[1]-1), leavePad);
		}


		var DSP_this = this;
		var abortBlur = false;
		var
			valueElement = dsp_jscolor.fetchElement(this.valueElement),
			styleElement = dsp_jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		otarget.addEventListener('click',function(e){
			if(dsp_jscolor.picker) removePicker();
			dsp_color_user = e.target;
			if(DSP_this.pickerOnfocus) DSP_this.showPicker();
		},true);


		if(valueElement){
			var updateField = function(){
				DSP_this.fromString(valueElement.value, leaveValue);
			};
		}

		if(styleElement){
			styleElement.jscStyle = {
				backgroundColor:styleElement.style.backgroundColor,
				color:styleElement.style.color
			};
		}

		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif');

	}

}


function DSP_colorize_comments(){

	eval('var temp_array='+dsp_settings.colors);

	for(var i=0; i<dsp_all_comments.length; i++){
		var temp_name = dsp_all_comments[i].getElementsByTagName('a')[1].innerHTML;
		var temp_color = '';
		var temp_font = '';

		for(var j=0; j<temp_array.length; j++){
			if(temp_array[j].split(',')[0]==temp_name){
				temp_color = temp_array[j].split(',')[1];
				temp_font = temp_array[j].split(',')[2];
				break;
			}
		}

		dsp_all_comments[i].innerHTML += '&nbsp; <a class="dsp_color" style="text-decoration:underline;cursor:pointer">цвет</a><span'+((temp_color=='')?' style="display:none"':'')+' id="dsp_color_remover_'+i+'"> | <a style="text-decoration:underline;cursor:pointer">сбросить</a></span>';

		document.getElementById('dsp_color_remover_'+i).addEventListener('click',function(e){DSP_color_remove(e.target);},true);

		if(temp_color!=''){

			var temp_div = dsp_all_comments[i].getElementsByTagName('a');
			temp_div = temp_div[temp_div.length-2];

			temp_div.title = '#'+temp_color;
			temp_div.color = '#'+temp_font;

			var temp_div = dsp_all_comments[i].parentNode.parentNode.getElementsByClassName('dt')[0];

			if(temp_color.toLowerCase()!='ffffff'){
				temp_div.style.padding = '5px';
				temp_div.style.backgroundColor = '#'+temp_color;
				temp_div.style.color = '#'+temp_font;

				dsp_all_comments[i].style.padding = '5px';
				dsp_all_comments[i].style.backgroundColor = '#'+temp_color;
				dsp_all_comments[i].style.color = '#'+temp_font;

				var link_color = (temp_font=='fff')?'#e3e3e3':'#393939';

				var div_links = dsp_all_comments[i].parentNode.parentNode.getElementsByTagName('a');

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}
			}
		}

		if(dsp_settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>0){
			dsp_all_comments[i].parentNode.parentNode.style.border = '1px solid #666';
			}
		}

	}

}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Dirty Tooltip


* * * * * * * * * * * * * * * * * * * * * * * * * */


var dup_showing = 0;
var dup_processing = 0;


function dup_showBaloon(obj){

	if(dsp_settings.tooltip_on=='1'){
	if((obj.innerHTML==dsp_self_name&&dsp_settings.tooltip_show_self=='1')||obj.innerHTML!=dsp_self_name){

		var dup_div = document.getElementById("dup_show_div");
		if(!dup_div){
			document.body.appendChild(dup_div = document.createElement('div'));
			dup_div.id = 'dup_show_div';
			dup_div.style.position = 'absolute';
			dup_div.style.zIndex = '1300';

			document.addEventListener('click',function(e){dup_div.style.display="none"},true);
		}

		if(dsp_check_change_pictures==1){
			if(dsp_settings.use_pictures=='1') dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><table cellspacing="0" cellpadding="0" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" id="dup_data_td"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';
			else dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><div style="border-right:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1"><div style="background-color:#fff;border:1px solid #505050;font-size:10px;padding:14px;line-height:16px" id="dup_data_td"></div></div>';
		}

		if(document.getElementById("dup_current_id").value!=obj.toString()){

			dup_div.style.display = "none";

			if(dsp_settings.use_pictures=='1') document.getElementById("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
			else document.getElementById("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;line-height:60px">...</div></center>';

			dup_processing = 1;
			dup_getData(obj);
		}

		var dup_pos = DSP_getPosition(obj);
		var dup_leftOffset = (dsp_settings.use_pictures=='1')?35:10;

		dup_showing = setTimeout("document.getElementById('dup_show_div').style.display='block'",700);
		dup_div.style.top = (dup_pos.y+obj.offsetHeight+5)+'px';
		dup_div.style.left = (dup_pos.x-dup_leftOffset)+'px';
	}
	}
}

function dup_getData(obj){

	if(dup_processing!=0){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",obj.toString(),true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				var dup_user_id = obj.toString().split('/');
				dup_user_id = dup_user_id[dup_user_id.length-1];

				dup_text = xmlhttp.responseText;

				var dup_date = dup_text.split('<span>с нами с ')[1].split(' года')[0];
				var dup_karma = dup_text.split('<span class="rating"><em>')[1].split('</em>')[0];
				var dup_pluses = dup_text.split('plus voted').length-1;
				var dup_minuses = dup_text.split('minus voted').length-1;

				dup_pluses = (dup_pluses>0)?'<span style="color:green;font-size:9pt"><b>+'+dup_pluses+'</b></span>':0;
				dup_minuses = (dup_minuses>0)?'<span style="color:red;font-size:9pt"><b>-'+dup_minuses+'</b></span>':0;
				
				var dup_votes_him = '';
				if(dup_minuses!==0) dup_votes_him += dup_minuses;
				if(dup_minuses!==0&&dup_pluses!==0) dup_votes_him += ' <span style="color:#ccc">/</span> ';
				if(dup_pluses!==0) dup_votes_him += dup_pluses;

				var dup_name = dup_text.split('<td width="70%" valign="top">')[1].split('<span class="greetings">')[0];
				for(var i=0;i<2;i++) dup_name = dup_name.split('&#35;').join('#').split('&#59;').join(';').split('&amp;').join('&');

				var dup_country = dup_name.split('<br>')[1];

				var dup_raitdata = dup_text.split('На <a href="/">большом ');
				dup_raitdata = dup_raitdata[dup_raitdata.length-1].split(' комментар')[0];

				var dup_sex = (dup_raitdata.indexOf('она')>0)?'f':'m';
				var dup_raiting = parseInt(dup_raitdata.split('рейтинг ')[1].split(' ')[0]);
				var dup_vote = dup_raitdata.split('и голос ')[1].split(')')[0];
				var dup_posts = parseInt(dup_raitdata.split(', написав')[1].split(' пост')[0]);
				var dup_comments = parseInt(dup_raitdata.split(' пост')[1].split(' комментари')[0].split('и ')[1]);

				dup_name = dup_name.split('<br>')[0];
				dup_name = '<span style="font-size:10pt;color:#'+((dup_sex=='m')?'009ced':'ff4fdc')+'"><b>'+dup_name+'</b></span>';

				dup_votes_him = (dup_votes_him!='')?'<b>Ваша оценка:</b> '+dup_votes_him:'<span style="color:#999"><b>Ваших оценок нет в '+((dup_sex=='f')?'её':'его')+' карме</b></span>';

				var dup_prop = Math.round((dup_raiting/(dup_posts+dup_comments))*10)/10;

				var dup_userpic = '';
				if(dsp_settings.use_pictures=='1'){
					if(dup_text.indexOf('alt="Dirty Avatar"')>0){
						dup_userpic = dup_text.split('alt="Dirty Avatar"')[0];
						dup_userpic = dup_userpic.split('src="');
						dup_userpic = dup_userpic[dup_userpic.length-1].split('"')[0];
					}
					else if(dup_text.indexOf('#Dirty Avatar#')>0){
						dup_userpic = dup_text.split('#Dirty Avatar#')[1].split('src="')[1].split('"')[0];
					}
					else{
						dup_check_avatar = dup_text.split('<table width="100%" height="300" border="0" cellpadding="3" cellspacing="4" bgcolor="#F8F8F8">')[1].split('</table>')[0];
						if(dup_check_avatar.indexOf('<img')>0){
							dup_userpic = dup_check_avatar.split('src="')[1].split('"')[0];
						}
					}

					if(dup_userpic!='') dup_userpic = '<img src="http://www.amaryllis.nl/cmm/tools/thumb.php?src='+dup_userpic+'&maxw=70&maxh=100" border="0" alt=""><br>';
					else dup_userpic = '<div style="width:75px;height:75px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-074626-d60640dc88fd86bcef83e920d94a8797.png);background-position:'+((dup_sex=='m')?'left':'-75px')+' top">&nbsp;</div>';
				}
				else{
					if(dsp_isOpera===true){
						if(dup_sex=='m') dup_userpic = '<div style="width:66px;height:70px;color:#d2dae2;border:1px solid #919191;font-family:Verdana;text-align:center;font-size:50px;line-height:70px">♂</div>';
						else dup_userpic = '<div style="width:66px;height:70px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:50px;line-height:70px">♀</div>';
					}
					else{
						if(dup_sex=='m') dup_userpic = '<div style="width:66px;color:#d2dae2;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                  ~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~~                ~~~~~~  '+"\r\n"+'  ~~~~~~~~              ~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  </pre></div>';
						else dup_userpic = '<div style="width:66px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~                    ~~~~~  '+"\r\n"+'  ~~~~~                  ~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  '+"\r\n"+'</pre></div>';
						dup_userpic = dup_userpic.split('~').join('█');
					}
				}

				dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center" valign="top" style="padding-right:10px">'+dup_userpic+'<span style="color:#444">№'+dup_user_id+'</span><div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px"><b>Карма: <span style="font-size:10pt;color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td>';
				dup_output += '<td valign="top"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>';
				dup_output += '<div style="float:right;margin-left:5px;margin-bottom:5px"><span style="display:block'+((dsp_settings.use_pictures=='1')?';background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png);background-repeat:no-repeat':'')+';width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;background-color:#999"><b>'+dup_prop+'</b></span></div>';
				dup_output += '<div style="clear:both">Автор <b>'+dup_posts+'</b> постов и <b>'+dup_comments+'</b> комментариев<br>Заработал'+((dup_sex=='f')?'а':'')+' голос <span style="font-size:10pt;color:#0069ac"><b>'+dup_vote+'</b></span> и рейтинг '+dup_raiting+'</div>';
				dup_output += '<div style="margin-top:10px">'+dup_votes_him+'</div><div id="dup_his_vote"></div><div id="dup_profile_note" style="margin-top:10px"></div></td></tr></table>';

				document.getElementById("dup_current_id").value = obj.toString();

				var dup_user_name = obj.innerHTML;

				dup_getKarma(dup_output,dup_user_id,dup_sex,dup_user_name);
			}
			else if(xmlhttp.status==404) alert("URL doesn't exist!");
		}
	}
	xmlhttp.send(null);

	}
}

function dup_getKarma(dup_text,dup_user_id,dup_sex,dup_user_name){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", window.location.protocol+'//'+window.location.host+'/'+'karmactl',true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Referer', window.location.href);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200) {
				var dup_temp = xmlhttp.responseText;

				if(dup_temp.indexOf('{"uid":"'+dup_user_id+'"')>0){

					dup_temp = dup_temp.split('{"uid":"'+dup_user_id+'"')[1].split('","login"')[0].split('"');
					dup_temp = dup_temp[dup_temp.length-1];
					dup_temp = '<b>'+((dup_sex=='f')?'Её':'Его')+' оценка вас: <span style="font-size:9pt;color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

					document.getElementById("dup_his_vote").innerHTML = dup_temp;
					
				}
				else document.getElementById("dup_his_vote").innerHTML = '<span style="color:#999"><b>Е'+((dup_sex=='f')?'ё':'го')+' оценок нет в вашей карме</b></span>';

				if(dsp_settings.notepad_inbox&&dsp_settings.tooltip_with_notepad=='1'){
					dup_getNote(dsp_settings.notepad_inbox,dup_user_name);
				}
			}
		}
	}
	xmlhttp.send('view='+dsp_self_num);

	document.getElementById("dup_data_td").innerHTML = dup_text;
}

function dup_getNote(dup_storage,dup_user_name){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+dup_storage,true);
	xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200) dup_parseInbox(xmlhttp.responseText,dup_user_name);
		}
	}
	xmlhttp.send(null);
}

function dup_parseInbox(dup_text,dup_user_name){

	dup_user_name = dup_user_name.split('-').join('&#150;');

	if(dup_text.indexOf('<div class="dt"><b>'+dup_user_name)>0){

		var dup_temp = dup_text.split('<div class="dt"><b>'+dup_user_name);
		dup_temp = dup_temp[dup_temp.length-1].split('</div>')[0];

		var dup_temp_name = dup_temp.split('<br>');
		var dup_temp_body = dup_temp.substring(dup_temp_name[0].length+4,dup_temp.length);
		dup_temp_body_mini = (dup_temp_body.length>32)?dup_temp_body.substring(0,32)+'...':dup_temp_body;

		if(dup_temp_body_mini!=dup_temp_body){
			document.getElementById("dup_profile_note").innerHTML = '<b>Ваша заметка:</b><div style="cursor:help;background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman" title="'+dup_temp_body+'"><i>'+dup_temp_body_mini+'</i></div>';
		}
		else{
			document.getElementById("dup_profile_note").innerHTML = '<b>Ваша заметка:</b><div style="background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman"><i>'+dup_temp_body_mini+'</i></div>';
		}
	}
}






/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Dirty Notepad


* * * * * * * * * * * * * * * * * * * * * * * * * */


if(dsp_location.indexOf('/users/')===0){

	if(dsp_self_num!=dn_user){

		var dn_user = document.getElementById('main_inner').innerHTML.split(' class="vote" uid="')[1].split('"')[0];
		var dn_username = document.getElementById('main_inner').innerHTML.split(' class="vote" uid="')[1].split(' href="">')[1].split('</')[0];
		var dn_layer = '';

		var dn_all = document.getElementById('generic-wrapper').getElementsByTagName("td")[1];
		dn_all.innerHTML = '<div id="dsp_notepad_on" style="display:'+((dsp_settings.notepad_on=='1')?'block':'none')+'"></div>'+dn_all.innerHTML;


	}
}

function dn_get_hash(param){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/write/',true);
	xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				temp = xmlhttp.responseText.split(' name=wtf value="')[1].split('"')[0];

				if(param=="inbox") dn_new_inbox(temp);
				else dn_write_note(temp,document.getElementById("dn_textarea").value);
			}
			else if(xmlhttp.status==404) alert("URL doesn't exist!");
		}
	}
	xmlhttp.send(null);
}

		function dn_get_inbox_num(){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/',true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					if(xmlhttp.status==200){
						temp = xmlhttp.responseText;

						if(temp.indexOf('http://pit.dirty.ru/dirty/1/2010/04/23/11119-040541-f56ca7cbb6ae11943ec582da08875f63.png')>0){

							temp = temp.split('http://pit.dirty.ru/dirty/1/2010/04/23/11119-040541-f56ca7cbb6ae11943ec582da08875f63.png')[1].split('a href="/my/inbox/')[1].split('"')[0];

							DSP_set_setting('notepad_inbox',temp);
							dn_getNote(temp);
						}
						else dn_get_hash("inbox");
					}
					else if(xmlhttp.status==404) alert("URL doesn't exist!");
				}
			}
			xmlhttp.send(null);
		}

		function dn_new_inbox(hash){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/write',true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/write/');
			xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					if(xmlhttp.status==200) dn_get_inbox_num();
					else if(xmlhttp.status==404) alert("URL doesn't exist!");
				}
			}
			xmlhttp.send('run=01&wtf='+hash+'&whom='+dsp_self_name+'&comment=%3Cimg+src%3D%22http%3A%2F%2Fpit.dirty.ru%2Fdirty%2F1%2F2010%2F04%2F23%2F11119-040541-f56ca7cbb6ae11943ec582da08875f63.png%22+alt%3D%22%22%3E');
		}

		function dn_getNote(num){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+num,true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					if(xmlhttp.status==200) dn_parseInbox(xmlhttp.responseText);
					else if(xmlhttp.status==404) dn_get_inbox_num();
				}
			}
			xmlhttp.send(null);
		}

		function dn_parseInbox(text){
			dn_username = dn_username.split('-').join('&#150;');

			if(text.indexOf('<div class="dt"><b>'+dn_username)>0){
				temp = text.split('<div class="dt"><b>'+dn_username);
				temp = temp[temp.length-1].split('</div>')[0];

				temp_name = temp.split('<br>');
				temp_body = temp.substring(temp_name[0].length+4,temp.length);

				temp2 = temp_body.split('<br>').join("\r\n").split('&#150;').join('-').split('<span class=irony>').join('<irony>').split('</span>').join('</irony>');

				dn_layer.innerHTML = temp_body;
				document.getElementById("dn_textarea").value = temp2;
			}
			else dn_layer.innerHTML = '<center>...</center>';
		}

		function dn_write_note(hash,text){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+dsp_settings.notepad_inbox,true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/write/');
			xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					if(xmlhttp.status==200){
						dn_layer.innerHTML = text.split("\n").join('<br>').split('<irony>').join('<span class=irony>').split('</irony>').join('</span>');
					}
					else if(xmlhttp.status==404) alert("URL doesn't exist!");
				}
			}
			xmlhttp.send('wtf='+hash+'&step=1&i=01&comment=<b>'+dn_username+'</b><br>'+text);
		}


		function dn_submit(e){
			if(e.target.className=='dn_submit'){
				dn_layer.innerHTML = '<center><div style="width:30px;height:30px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
				document.getElementById("dn_switcher2").style.display="none";
				document.getElementById("dn_switcher").style.display="block";
				document.getElementById("dn_notepad").style.display="block";
				document.getElementById("dn_notepad_edit").style.display="none";
				dn_get_hash("note");
			}
		}

		function DSP_show_notepad(){

			if(dsp_settings.notepad_on=='1'){

				if(dn_layer==''){
					document.getElementById('dsp_notepad_on').innerHTML = '<div id="dn_switcher2" style="margin-bottom:4px;display:none">[<a style="cursor:pointer;text-decoration:underline" onClick="document.getElementById(\'dn_switcher2\').style.display=\'none\';document.getElementById(\'dn_switcher\').style.display=\'block\';document.getElementById(\'dn_notepad\').style.display=\'block\';document.getElementById(\'dn_notepad_edit\').style.display=\'none\'">отменить редактирование</a>]</div><div id="dn_switcher" style="margin-bottom:4px;display:block">[<a style="cursor:pointer;text-decoration:underline" onClick="document.getElementById(\'dn_switcher2\').style.display=\'block\';document.getElementById(\'dn_switcher\').style.display=\'none\';document.getElementById(\'dn_notepad\').style.display=\'none\';document.getElementById(\'dn_notepad_edit\').style.display=\'block\'">редактировать</a>]</div><div id="dn_notepad_edit" style="display:none"><form onSubmit="return false"><textarea id="dn_textarea" style="width:95%;height:150px;padding:5px"></textarea><div align="right" style="width:95%"><input class="dn_submit" type="image" src="http://img.dirty.ru/lepro/yarrr.gif" style="border:0;margin:5px -10px 10px 0"></div></form></div><div id="dn_notepad" style="display:block;margin:9px 0 5px 0"><table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td width="11" height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif)"></td><td style="background-color:#d9d9d9"></td><td width="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:right top"></td></tr><tr><td style="background-color:#d9d9d9"></td><td style="background-color:#d9d9d9;font-size:14pt;color:#696969" id="dn_notepad_td"><center><div style="width:30px;height:30px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center></td><td style="background-color:#d9d9d9"></td></tr><tr><td height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:left bottom"></td><td style="background-color:#d9d9d9"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-021658-e9dc42ba6f9a6e90a8f677861ecd76db.gif);background-position:right bottom"></td></tr></table></div>';
					dn_layer = document.getElementById("dn_notepad_td");

					document.addEventListener('click',dn_submit,true);
				}


				if(!dsp_settings.notepad_inbox) dn_get_inbox_num();
				else dn_getNote(dsp_settings.notepad_inbox);
			}
		}




/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Dirty Vote Viewer


* * * * * * * * * * * * * * * * * * * * * * * * * */


		function getVotes(id,el,type,mode){

			var div = document.getElementById("ds_show_div");
			if(!div){
				document.body.appendChild(div = document.createElement('div'));
				div.id = 'ds_show_div';
				div.style.position = 'absolute';
				div.style.zIndex = '1200';
				div.innerHTML = '<table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td height="14"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-000456-a580cb01c47764e60da94074a66172b1.png);background-repeat:no-repeat;background-position:10px top"></td><td></td></tr><tr><td width="11" height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png)"></td><td style="background-color:#d9d9d9"></td><td width="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right top"></td></tr><tr><td style="background-color:#d9d9d9"></td><td style="background-color:#d9d9d9;font-size:10px" id="dk_data_td"><center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center></td><td style="background-color:#d9d9d9"></td></tr><tr><td height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:left bottom"></td><td style="background-color:#d9d9d9"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right bottom"></td></tr></table>';

				document.addEventListener('click',function(e){div.style.display="none"},true);
			}
			var pos = DSP_getPosition(el);
			var addit_pos_y = 15;
			var addit_pos_x = (mode=='comment')?-10:-7;

			document.getElementById("dk_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
			div.style.display = "block";
			div.style.top = (pos.y+el.offsetHeight+addit_pos_y)+'px';
			div.style.left = (pos.x+addit_pos_x)+'px';


			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST", window.location.protocol+'//'+window.location.host+'/'+((mode=='user')?'karmactl':'votesctl'),true);
			xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xmlhttp.setRequestHeader('Referer', window.location.href);
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4){
					if(xmlhttp.status == 200) {
						showRes(eval('res = '+xmlhttp.responseText),el,mode);
					}
				}
			}
			var addenum = '';
			if(type==0){
				var eln = document.getElementById('navigation');
				if(eln){
					var elp = eln.getElementsByClassName('post');
					if (elp && elp.length && elp[0].id){
						addenum += '&post_id='+elp[0].id.substr(1); 				
					}
				}
			}
			xmlhttp.send(((mode=='user')?'view=':'type='+type+'&id=')+id+addenum);
		}

		function showRes(res,el,mode){

			var div = document.getElementById("dk_data_td");

			var buff = [];
			buff.push('<div style="margin-top:-2px;width:320px;'+((res.votes.length>20)?'overflow:auto;height:300px;':((res.votes.length>20&&mode=='user')?'overflow:auto;height:300px;':''))+'padding:4px"><div style="height:16px;padding-left:10px">'+((res.votes.length>20&&mode=='user')?'<b>Последние 20 оценок:</b></div>':''));

			var plus = '';
			var minus = '';
			var last = '';
			var plus_count = 0;
			var minus_count = 0;
			var plus_votes = 0;
			var minus_votes = 0;

			for(var i=res.votes.length-1; i>=0; i--){
				var e = res.votes[i];
				var last_temp = '';

				var temp = '<span style="color:'+((e.attitude>0)?'green':'red')+'">'+e.attitude+'</span> <a style="color:'+((e.attitude>0)?'green':'red')+'" href="http://www.dirty.ru/users/'+e.uid+'">'+e.login+'</a><br />';

				if(res.votes.length>20&&mode=='user'){
					if(i>=res.votes.length-20){
						last_temp = '<a style="line-height:16px;color:'+((e.attitude>0)?'green':'red')+'" href="http://www.dirty.ru/users/'+e.uid+'">'+e.login+'</a>&nbsp;<span style="color:#555">('+e.attitude+')</span>';
					}

					if(i>res.votes.length-20) last += last_temp+', ';
					else if(i==res.votes.length-20) last += last_temp;
				}

				if(e.attitude>0){
					plus+=temp;

					if(mode=='user'){
						plus_votes++;
						plus_count = plus_count+parseInt(e.attitude);
					}
				}
				else{
					minus+=temp;

					if(mode=='user'){
						minus_votes++;
						minus_count = minus_count+parseInt(e.attitude);
					}
				}
			}

			if(mode=='user'){
				text = 'Возможно вам будет интересно узнать, что было поставлено ';
				if(plus_votes>0) text += plus_votes+' положительных оценок, которые увеличили карму на <span style="color:green">'+plus_count+'</span>';
				if(plus_votes>0&&minus_votes>0) text += ' и ';
				if(minus_votes>0) text += minus_votes+' отрицательных оценок, которые уменьшили карму на <span style="color:red">'+(-1*minus_count)+'</span>';
				text += '.';
			}

			buff.push(((res.votes.length>0)?((res.votes.length>20&&mode=='user')?'<div style="padding:15px;background:#ecebeb;border:1px solid #c8c7c7;width:271px">'+last+'</div><div style="height:16px;margin-top:10px;padding-left:10px">':'')+'<b>Все оценки ('+res.voters+'):</b></div><table cellspacing="0" cellpadding="5" border="0"><tr><td valign="top" width="136" style="line-height:16px;padding:12px 15px 10px 15px;background:#ecebeb;border:1px solid #c8c7c7">'+minus+'</td><td width="5" style="padding:0">&nbsp;</td><td width="136" valign="top" style="line-height:16px;padding:12px 15px 10px 15px;background:#ecebeb;border:1px solid #c8c7c7">'+plus+'</td></tr></table>':'</div><center><b>Оценок нет</b></center>')+((res.votes.length>20&&mode=='user')?'<div style="margin-top:5px;padding:15px;text-indent:10px;background:#ecebeb;border:1px solid #c8c7c7;width:271px;text-align:justify">'+text+'</div>':'')+'</div>');
			div.innerHTML = buff.join('');

		}




/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Функции создания настроек


* * * * * * * * * * * * * * * * * * * * * * * * * */


function dsp_general_init(){

	document.getElementById('dsp_c_favicon_on').addEventListener('click',
	function(){
		DSP_show_hide_menu('dsp_l_favicon');

		if(document.getElementById('dsp_c_favicon_on').checked===true) DSP_set_setting('favicon_on',1);
		else DSP_set_setting('favicon_on',0);

	},false);


	document.getElementById('dsp_c_after_load').addEventListener('click',
	function(){
		if(document.getElementById('dsp_c_after_load').checked===true) DSP_set_setting('after_load',1);
		else DSP_set_setting('after_load',0);

	},false);


	document.getElementById('dsp_c_favicon_style_a').addEventListener('click',
	function(){
		DSP_set_setting('favicon_style',1);
	},false);


	document.getElementById('dsp_c_favicon_style_b').addEventListener('click',
	function(){
		DSP_set_setting('favicon_style',0);
	},false);


	document.getElementById('dsp_c_username_replace').addEventListener('click',
	function(){

		if(document.getElementById('dsp_c_username_replace').checked===true){
			DSP_replace_username(1);
			DSP_set_setting('username_replace',1);
		}
		else{
			DSP_replace_username(0);
			DSP_set_setting('username_replace',0);
		}

	},false);
}

function dsp_posts_init(){

	document.getElementById('dsp_c_posts_average').addEventListener('click',
	function(){
		if(document.getElementById('dsp_c_posts_average').checked===true) DSP_set_setting('posts_average',1);
		else DSP_set_setting('posts_average',0);

	},false);

	document.getElementById('dsp_c_youtube_fullscreen').addEventListener('click',
		function(){
			if(document.getElementById('dsp_c_youtube_fullscreen').checked===true) DSP_set_setting('youtube_fullscreen',1);
			else DSP_set_setting('youtube_fullscreen',0);

		},false);
}

function dsp_comments_init(){

	document.getElementById('dsp_c_colors_on').addEventListener('click',
		function(){
			DSP_show_hide_menu('dsp_l_colors');

			if(document.getElementById('dsp_c_colors_on').checked===true) DSP_set_setting('colors_on',1);
			else DSP_set_setting('colors_on',0);

		},false);

	document.getElementById('dsp_c_colors_border').addEventListener('click',
		function(){
			if(document.getElementById('dsp_c_colors_border').checked===true) DSP_set_setting('colors_border',1);
			else DSP_set_setting('colors_border',0);

		},false);

}


function dsp_tooltip_init(){

	document.getElementById('dsp_c_use_picture').addEventListener('click',
	function(){
		dsp_check_change_pictures = 1;

		if(document.getElementById('dsp_c_use_picture').checked===true) DSP_set_setting('use_pictures',0);
		else DSP_set_setting('use_pictures',1);

	},false);


	document.getElementById('dsp_c_tooltip_on').addEventListener('click',
		function(){
			DSP_show_hide_menu('dsp_l_tooltip');

			if(document.getElementById('dsp_c_tooltip_on').checked===true) DSP_set_setting('tooltip_on',1);
			else DSP_set_setting('tooltip_on',0);
		},false);


	document.getElementById('dsp_c_tooltip_with_notepad').addEventListener('click',
		function(){
			if(document.getElementById('dsp_c_tooltip_with_notepad').checked===true) DSP_set_setting('tooltip_with_notepad',1);
			else DSP_set_setting('tooltip_with_notepad',0);
		},false);


	document.getElementById('dsp_c_tooltip_show_self').addEventListener('click',
		function(){
			if(document.getElementById('dsp_c_tooltip_show_self').checked===true) DSP_set_setting('tooltip_show_self',1);
			else DSP_set_setting('tooltip_show_self',0);
		},false);
}

function dsp_notepad_init(){

	document.getElementById('dsp_c_notepad_on').addEventListener('click',
		function(){
			if(document.getElementById('dsp_c_notepad_on').checked===true) DSP_set_setting('notepad_on',1);
			else DSP_set_setting('notepad_on',0);

			if(dsp_location.indexOf('/users/')==0&&dsp_location!='/users/'+dsp_self_num) DSP_show_notepad();

			if(document.getElementById('dsp_notepad_on')){
				DSP_show_hide_menu('dsp_notepad_on');
			}

		},false);
}

function dsp_vote_viewer_init(){

	document.getElementById('dsp_c_vote_viewer_on').addEventListener('click',
		function(){

			if(document.getElementById('dsp_c_vote_viewer_on').checked===true) DSP_set_setting('vote_viewer_on',1);
			else DSP_set_setting('vote_viewer_on',0);

		},false);
}



function DSP_make_content_settings(){

	if(document.getElementById('dsp_setting_button_0').innerHTML.length<10){

		var dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((dsp_settings.username_replace=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Заменять %username% на ваше имя</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_after_load" type="checkbox" '+((dsp_settings.after_load=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Догружать обрезанные страницы</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_favicon_on" type="checkbox" '+((dsp_settings.favicon_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать иконку сайта ссылки:</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_favicon" style="display:'+((dsp_settings.favicon_on=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_favicon_s" value="1" id="dsp_c_favicon_style_a" type="radio" '+((dsp_settings.favicon_style=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">при наведении - над ссылкой</td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_favicon_s" value="0" id="dsp_c_favicon_style_b" type="radio" '+((dsp_settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">всегда перед ссылкой</td></tr>';
		dsp_txt += '</table></form></div>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_average" type="checkbox" '+((dsp_settings.posts_average=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать средние ID и оценку</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_youtube_fullscreen" type="checkbox" '+((dsp_settings.youtube_fullscreen=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Добавить кнопку "Fullscreen" в постах с видеороликами youtube</td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_on" type="checkbox" '+((dsp_settings.colors_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Изменять цвет комментариев пользователей</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_colors" style="display:'+((dsp_settings.colors_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_border" type="checkbox" '+((dsp_settings.colors_border=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">Выделять рамкой новые комментарии</td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_tooltip_on" type="checkbox" '+((dsp_settings.tooltip_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Включить Dirty Tooltip</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_tooltip" style="display:'+((dsp_settings.tooltip_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_use_picture" type="checkbox" '+((dsp_settings.use_pictures=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt">Режим "без картинок"</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_tooltip_with_notepad" type="checkbox" '+((dsp_settings.tooltip_with_notepad=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать заметку Dirty Notepad</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_tooltip_show_self" type="checkbox" '+((dsp_settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать информацию о себе по ссылке возле logout</td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Dirty Tooltip',dsp_txt,'dsp_tooltip_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_notepad_on" type="checkbox" '+((dsp_settings.notepad_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Включить Dirty Notepad</td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Dirty Notepad',dsp_txt,'dsp_notepad_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_vote_viewer_on" type="checkbox" '+((dsp_settings.vote_viewer_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Включить Vote Viewer</td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Vote Viewer',dsp_txt,'dsp_vote_viewer_init()');
	}
	DSP_show_hide_menu('dsp_settings');
}


function DSP_init(){


	DSP_get_view_area_size();
	DSP_make_General_Bar();
	DSP_show_hide_setting(0);


if(dsp_settings.after_load=='1'){

	if(dsp_location.indexOf('/users/')==0){
		var dsp_css = document.createElement('link');
		dsp_css.type = 'text/css';
		dsp_css.rel = 'stylesheet';
		dsp_css.href = 'http://www.dirty.ru/css/main.css?rev=3';
		document.getElementsByTagName("head")[0].appendChild(dsp_css);
	}
}



// Favicons inits

if(dsp_settings.favicon_on=='1'&&dsp_settings.use_pictures=='1'){

	if(dsp_location.indexOf('/users/')<0){

		var dsp_elements = document.getElementById('content').getElementsByTagName('a');

		if(dsp_settings.favicon_style=='1'){


			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					dsp_elements[i].addEventListener('mouseover',function(e){DSP_show_favicon(e.target,1);},true);
					dsp_elements[i].addEventListener('mouseout',function(e){DSP_show_favicon(e.target,0);},true);
				}
			}

		}
		else{

			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					var favicon = 'http://favicon.yandex.ru/favicon/'+dsp_elements[i].toString().split('/')[2];

					dsp_elements[i].style.paddingLeft = '18px';
					dsp_elements[i].style.backgroundImage = 'url('+favicon+')';
					dsp_elements[i].style.backgroundRepeat = 'no-repeat';
				}
			}

		}
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Average IDs and Votes


* * * * * * * * * * * * * * * * * * * * * * * * * */

if(dsp_settings.posts_average=='1'){

	if(dsp_location.indexOf('/comments/')==0){

		document.getElementsByClassName('dd')[0].getElementsByClassName('p')[0].innerHTML += '<span id="dsp_layer_posts_average"></span>';

		var dsp_ids_count = 0;
		var dsp_votes_count = 0;

		var dsp_average_votes = document.getElementById('content_left_inner').getElementsByClassName('dd');
		for(var i=0; i<dsp_average_votes.length; i++){
			dsp_votes_count = dsp_votes_count+parseInt(dsp_average_votes[i].getElementsByTagName('em')[0].innerHTML);
		}
		dsp_votes_count = Math.round((dsp_votes_count/dsp_average_votes.length)*10)/10;

		dsp_average_votes = document.getElementById('content_left_inner').getElementsByClassName('dd');
		var dsp_temp_array = ',';

		for(var i=0; i<dsp_average_votes.length; i++){
			var dsp_temp = parseInt(dsp_average_votes[i].getElementsByTagName('a')[1].toString().split('/users/')[1]);
			if(dsp_temp_array.indexOf(','+dsp_temp+',')<0) dsp_temp_array += dsp_temp+',';
		}
		dsp_temp_length = dsp_temp_array.split(',').length-2;
		dsp_temp_array = eval('0'+dsp_temp_array.split(',').join('+')+'0');

		dsp_ids_count = Math.round((dsp_temp_array/dsp_temp_length)*10)/10;
		dsp_average_votes = '';

		if(isNaN(dsp_votes_count)) dsp_votes_count = 0;
		if(isNaN(dsp_ids_count)) dsp_ids_count = 0;

		document.getElementById('dsp_layer_posts_average').innerHTML += ' | &#216;id '+dsp_ids_count+' | &#216;&#177; '+dsp_votes_count;
	}
}


// Username replace

if(dsp_settings.username_replace=='1'){

	DSP_replace_username(1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Youtube Video Enhancer


* * * * * * * * * * * * * * * * * * * * * * * * * */


if(dsp_settings.youtube_fullscreen=='1'){

	if(dsp_location.indexOf('/comments/')==0){

		if(document.getElementsByTagName('object').length>0&&document.getElementById('navigation').innerHTML.indexOf('value="http://www.youtube.com')>0){

			var dsp_video_link = document.getElementsByTagName('object')[0].parentNode.innerHTML.split('value="http')[1].split('"')[0];
			var dsp_video_array = document.getElementsByTagName('object')[0].parentNode.innerHTML.split('<');
			var dsp_video_html = dsp_video_array[0];

			for(var i=1; i<dsp_video_array.length; i++){

				if(dsp_video_array[i][0]=='p') dsp_video_html += '<'+dsp_video_array[i]+'</param>';
				else if(dsp_video_array[i][0]=='e') dsp_video_html += '<'+dsp_video_array[i]+'</embed>';
				else dsp_video_html += '<'+dsp_video_array[i];
			}

			dsp_video_html = dsp_video_html.split('%20').join('').split('<embed').join('<param name="allowFullScreen" value="true"></param><embed allowfullscreen="true"');
			dsp_video_html = dsp_video_html.split(dsp_video_link).join(dsp_video_link+'&hl=ru_RU&fs=1');
			document.getElementsByTagName('object')[0].parentNode.innerHTML = dsp_video_html;
		}
	}
}


// Color Picker

if(dsp_settings.colors_on=='1'){

	if(dsp_location.indexOf('/comments/')==0||dsp_location.indexOf('/news/')==0||(dsp_location.indexOf('/my/inbox/')==0&&dsp_location!='/my/inbox/')){

		var dsp_check_comments = document.getElementById('content').getElementsByTagName('div');

		dsp_all_comments = [];
		for(var dsp_i=0; dsp_i<dsp_check_comments.length; dsp_i++){
			if(dsp_check_comments[dsp_i].className=='p') dsp_all_comments.push(dsp_check_comments[dsp_i]);
		}
		delete dsp_check_comments;

		DSP_colorize_comments();
		dsp_jscolor.init();
	}
}

// Dirty Tooltip


if(dsp_location.indexOf('/users/')<0){

	for(var i=0;i<document.links.length;i++){

		var dup_an = document.links[i].toString()+'|';

		if(dup_an.indexOf('/users/')>0&&dup_an.indexOf('/'+dsp_self_num+'|')<0&&dup_an[dup_an.length-2]!='/'){

				document.links[i].addEventListener('mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)},true);
				document.links[i].addEventListener('mouseout',function(){clearTimeout(dup_showing);dup_processing=0},true);
		}
	}

	document.getElementById('greetings').getElementsByTagName('a')[0].addEventListener('mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)},true);
	document.getElementById('greetings').getElementsByTagName('a')[0].addEventListener('mouseout',function(){clearTimeout(dup_showing);dup_processing=0},true);
}


// Dirty Notepad

if(dsp_location.indexOf('/users/')===0){

	if(dsp_self_num!=dn_user){

		DSP_show_notepad();
	}


}


// Vote viewer


if(dsp_settings.vote_viewer_on=='1'){

	if(dsp_location.indexOf('/news/')<0){

		var allHTMLTags=document.getElementsByTagName('em');
		for(var i=0;i<allHTMLTags.length;i++){
			if(allHTMLTags[i].parentNode.className=='rating'){
	
				allHTMLTags[i].style.cursor = 'pointer';

				if(allHTMLTags[i].parentNode.parentNode.parentNode.getAttribute('uid')!==null){

					allHTMLTags[i].addEventListener('click',function(e){getVotes(e.target.parentNode.parentNode.parentNode.getAttribute('uid'),e.target,0,'user')},false);
				}
				else if(allHTMLTags[i].parentNode.parentNode.parentNode.parentNode.parentNode.id!==null){

					allHTMLTags[i].addEventListener('click',function(e){var id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;var type = 0;var mode='comment';if(id.charAt(0)=='p'){id = id.substr(1);type = 1;mode = 'post'};getVotes(id,e.target,type,mode)},false);
				}
			}
		}
	}
}









}











/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Догрузчик страниц


* * * * * * * * * * * * * * * * * * * * * * * * * */

	if(!document.getElementById('copy')&&dsp_settings.after_load=='1'){

		document.body.appendChild(div = document.createElement('div'));
		div.id = 'reload_alert';
		div.style.position = 'fixed';
		div.style.top = '100px';
		div.style.left = '100px';
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.zIndex = '1200';
		div.innerHTML = '<table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td height="14"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-000456-a580cb01c47764e60da94074a66172b1.png);background-repeat:no-repeat;background-position:10px top"></td><td></td></tr><tr><td width="11" height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png)"></td><td style="background-color:#d9d9d9"></td><td width="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right top"></td></tr><tr><td style="background-color:#d9d9d9"></td><td style="background-color:#d9d9d9;font-size:10px" id="dk_data_td"><center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center></td><td style="background-color:#d9d9d9"></td></tr><tr><td height="11" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:left bottom"></td><td style="background-color:#d9d9d9"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-015624-5ede1534598f53f8e1a892b54c37bb47.png);background-position:right bottom"></td></tr></table>';

		function DSP_afterloader_page(){
			var dsp_link = window.location.href;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET",dsp_link,true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					var content = '';
					content += xmlhttp.responseText;

					if(content.indexOf('var picnum = Math.round(random*6)+1;')>0){}
					else if(content.indexOf('\/html\>')>0){
						content = content.split('<body')[1].split('</body>')[0];
						content = content.substring(content.indexOf('>')+1);

						document.body.innerHTML = content;
						DSP_init();
					}
					else var dsp_time = setTimeout(DSP_afterloader_page,2000);
				}
			}
			xmlhttp.send(null);
		}


		function DSP_afterloader(){
			var dsp_link = window.location.href;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET",dsp_link,true);
			xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/');
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					var content = '';
					content += xmlhttp.responseText;

					if(content.indexOf('var picnum = Math.round(random*6)+1;')>0){}
					else if(content.indexOf('\/html\>')>0){

						content = content.split('<body')[1].split('</body>')[0];
						content = content.substring(content.indexOf('>')+1);

						if(all_new>0){
							var all_comments2 = parseInt(content.split('<table class="category">')[1].split('<em>')[1].split('<')[0].split(' ')[2]);

							var parser = content.split('checkShowComments();')[1].split('<div id="reply_link_default">')[0];
							parser = parser.split('<div id="');
							parser[0] = 0;

							for(var i=1; i<parser.length; i++){
								parser[i] = parseInt(parser[i].split('"')[0]);
							}
							parser.sort();

							for(var i=parser.length-(2+all_new+(all_comments2-all_comments1)); i<parser.length; i++){
								content = content.split('<div id="'+parser[i]+'" class="post').join('<div id="'+parser[i]+'" class="post new');
							}
						}

						document.body.innerHTML = content;
						DSP_init();
					}
					else var dsp_time = setTimeout(DSP_afterloader,2000);
				}
			}
			xmlhttp.send(null);
		}




		if(dsp_location.indexOf('/comments/')>-1||dsp_location.indexOf('/news/')>-1||(dsp_location.indexOf('/my/inbox/')>-1&&dsp_location.indexOf!='/my/inbox/')){

			var all_comments1 = parseInt(document.getElementsByClassName('category')[0].getElementsByTagName('em')[0].innerHTML.split(' ')[2]);
			var all_new = parseInt(document.getElementById('show_new').innerHTML.split('(')[2].split(')')[0]);

			var dsp_time = setTimeout(DSP_afterloader,2000);
		}
		else{
			var dsp_time = setTimeout(DSP_afterloader_page,2000);
		}

	}
	else DSP_init();

}