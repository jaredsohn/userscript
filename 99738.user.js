// ==UserScript==
// @name image_viewer
// @author yansyrs
// @description 打开图片后，可拖拽图片，滚动滚轮可缩放图片大小，单击双击改变图片的尺寸显示。对于10.50及以上版本，可以长按开启图片旋转模式
// @version v1.4
// @exclude *.html
// @exclude *.htm
// @exclude *.jsp
// @exclude *.php
// @exclude *.aspx
// @exclude *.asp
// ==/UserScript==

(function(){
/*--------------------设置-----------------------*/
	//opera首选项中的页面缩放值
	//注：对于 Opera 11.10 以下的版本，如果你的页面缩放不是100%，不调整这项值会造成居中错误的问题。Opera 11.10 可不必理会此项。
	var OP_PAGE_PERCENTAGE = 100;
	
	//是否启用长按旋转，旋转将以图像中点为中心
	//true为启用，false为关闭
	//注：旋转功能仅Opera10.50及以上有效
	var ROTATE_ENABLE = true;
	
	//旋转开启的方式
	//0——长按
	//1——按住alt键不放
	//2——长按或按alt键
	var ROTATE_STYLE = 2;
	
	//旋转捕捉，即旋转的角度为下值的倍数
	//注：该值为整数，0或负数为不开启捕捉
	var ROTATE_SNAP = 0;
	
	//当ROTATE_STYLE = 0时有效，长按x毫秒后开启旋转模式
	var LONG_PRESS_TIME = 600;
	
	//图片默认显示方式
	//0——原尺寸
	//1——屏幕适配
	var IMG_DEFAULT_STYLE = 1;
	
	//图片信息显示
	//第一个值可为 'status' 、 'title'、'both' 或 'none'，分别表示 "在状态栏显示"、"在标题显示"、"在状态栏及标题显示"、"不显示"
	//第二个值：可选参数 %o ——原始尺寸；%c ——当前尺寸；%p ——缩放比；%r ——旋转角度；其余字符原样输出
	var IMG_INFO_SHOW = ['status', '原始尺寸：%o 像素；当前尺寸：%c 像素；缩放比：%p；旋转角度：%r'];
	
	//页面背景色
	var PAGE_BG_COLOR = 'gray';
/*------------------设置结束---------------------*/
	var img;
	var img_org_w, img_org_h;
	var img_x, img_y;
	var img_ox, img_oy;
	
	var mouse_offsetX, mouse_offsetY;
	
	var angle_org;
	var angle_begin = 0;
	var angle_now = 0;
	
	var timmer_rotate = null;
	var timmer_measure = null;

	var flag_rotate = false;
	var flag_drag = false;
	
	var percentage = 100;
	
	function get_img_origin(){
		return {
			x: img.offsetLeft + (img.width >> 1),
			y: img.offsetTop + (img.height >> 1)
		}
	}
	
	function get_angle(ox, oy, x, y){
		x = x - ox;
		y = oy - y;
		ox = oy = 0;
		if(ox == x)
			return (y > oy) ? 90 : 270;
		else if(oy == y)
			return (x > ox) ? 0 : 180;
		else if(y > oy && x > ox)//第一象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180;
		else if( (y > oy && x < ox) || (y < oy && x < ox))//第二、三象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 180;
		else if(y < oy && x > ox)//第四象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 360;
	}
	
	function mouse_wheel_handler(ev){
		if(timmer_measure != null)
			return;
		var val;
		var org_div_w, org_div_h, org_div_x, org_div_y;
		var of_x, of_y;
		
		if(ev.wheelDelta)
			val = ev.wheelDelta/120;
		else if(ev.detail)
			val = -ev.detail/3;
		ev.preventDefault();
		if(val > 0)
			percentage += 5;
		else
			percentage -= 5;
		if(percentage < 10)
			percentage = 10;

		org_div_w = img.offsetWidth;
		org_div_h = img.offsetHeight;
		org_div_x = img.offsetLeft;
		org_div_y = img.offsetTop;
		of_x = ev.pageX - org_div_x;
		of_y = ev.pageY - org_div_y;

		img.style.width = img_org_w * percentage/100 + 'px';
		img.style.height = img_org_h * percentage/100 + 'px';

		var p_x = (of_x / org_div_w);
		var p_y = (of_y / org_div_h);
		img.style.left = ev.pageX - (img.offsetWidth * p_x) + 'px';
		img.style.top = ev.pageY - (img.offsetHeight * p_y) + 'px';
		
		show_img_size_infomation();
	}
	
	function mouse_up_handler(ev){
		if(ev.button != 0)
			return;
		if(timmer_rotate){
			clearTimeout(timmer_rotate);
			timmer_rotate = null;
		}
		if(flag_rotate){
			angle_begin = angle_org - get_angle(img_ox, img_oy, ev.pageX, ev.pageY) + angle_begin;
		}
		flag_rotate = false;
		if(window.opera.version() >= 10.50)
			flag_drag = false;
		window.removeEventListener('mousemove', mouse_drag_handler, false);
		window.removeEventListener('mousemove', rotate_handler, false);
		window.removeEventListener('mouseup', mouse_up_handler, false);
		show_img_size_infomation();
	}
	
	function mouse_drag_handler(ev){
		flag_drag = true;
		if(timmer_rotate){
			clearTimeout(timmer_rotate);
			timmer_rotate = null;
		}
		img.style.left = ev.pageX - mouse_offsetX + 'px';
		img.style.top = ev.pageY - mouse_offsetY + 'px';
	}
	
	function rotate_handler(ev){
		if(flag_rotate == false){
			window.removeEventListener('mousemove', rotate_handler, false);
			return;
		}
		var angle = get_angle(img_ox, img_oy, ev.pageX, ev.pageY);
		var style_str = img.getAttribute('style');
		var angle_to_rotate = (angle_org - angle + angle_begin);
		if(ROTATE_SNAP > 0){
			angle_to_rotate = Math.floor(angle_to_rotate / ROTATE_SNAP) * ROTATE_SNAP;
		}
		style_str = style_str.replace(/rotate\((\d|\.|-)+(deg|rad)\)/ig, 'rotate(' + angle_to_rotate + 'deg)');
		img.setAttribute('style', style_str);
		angle_now = angle_to_rotate;
		show_img_size_infomation();
	}
	
	function start_rotate(ox, oy, x, y){
		clearTimeout(timmer_rotate);
		timmer_rotate = null;
		window.removeEventListener('mousemove', mouse_drag_handler, false);
		if(ox == x && oy == y)
			return false;
		flag_rotate = true;
		angle_org = get_angle(ox, oy, x, y);
		window.addEventListener('mousemove', rotate_handler, false);
	}
	
	function mouse_down_handler(ev){
		if(ev.button != 0)
			return;
		img_ox = get_img_origin().x;
		img_oy = get_img_origin().y;
		mouse_offsetX = ev.pageX - img.offsetLeft;
		mouse_offsetY = ev.pageY - img.offsetTop;
		window.addEventListener('mousemove', mouse_drag_handler, false);
		window.addEventListener('mouseup', mouse_up_handler, false);
		var x = ev.pageX, y = ev.pageY;
		if(ROTATE_ENABLE && window.opera.version() >= 10.50){
			if(ROTATE_STYLE == 0 || ROTATE_STYLE == 2){
				if(timmer_rotate == null)
					timmer_rotate = setTimeout(function(){start_rotate(img_ox, img_oy, x, y)}, LONG_PRESS_TIME);
			}
			if(ROTATE_STYLE == 1 || ROTATE_STYLE == 2){
				if(ev.altKey){
					start_rotate(img_ox, img_oy, x, y);
				}
			}
		}
	}
	
	function resize_img(type){
		var viewWidth = window.innerWidth / (OP_PAGE_PERCENTAGE / 100);
		var viewHeight = window.innerHeight / (OP_PAGE_PERCENTAGE / 100);
		switch(type)
		{
			case 'FIT_TO_SCREEN':
				img.style.width = 'auto';
				img.style.height = 'auto';
				percentage = 100;
				if(img.height > viewHeight * 0.95){
					percentage = (viewHeight * 100 * 0.95)/ img_org_h;
					img.style.height = img_org_h * percentage/100 + 'px';
					img.style.width = img_org_w * percentage/100 + 'px';
				}
				if(img.width > viewWidth * 0.95){
					percentage = (viewWidth * 100 * 0.95)/ img_org_w;
					img.style.height = img_org_h * percentage/100 + 'px';
					img.style.width = img_org_w * percentage/100 + 'px';
				}
				img.style.left = (viewWidth - img.offsetWidth) / 2 + window.pageXOffset +  'px';
				img.style.top = (viewHeight - img.offsetHeight) / 2 + window.pageYOffset + 'px';
				break;
			case 'ORG_SIZE':
				percentage = 100;
				//img.setAttribute('style', 'width: auto; height: auto;');
				img.style.width = 'auto';
				img.style.height = 'auto';
				break;
			case 'RECOVER_ALL':
				percentage = 100;
				angle_begin = 0;
				angle_now = 0;
				img.setAttribute('style', 'transform: rotate(0deg); -o-transform: rotate(0deg); width: auto; height: auto; position: absolute; left: 0px; top: 0px;');
				if(img_org_w < viewWidth)
					img.style.left = (viewWidth - img_org_w) / 2 + 'px';
				if(img_org_h < viewHeight)
					img.style.top = (viewHeight - img_org_h) / 2 + 'px';
				break;
			default:
				break;
		}
		show_img_size_infomation();
	}
	
	function mouse_dblclick_handler(){
		resize_img('RECOVER_ALL');
	}
	
	function mouse_click_handler(){
		if(flag_drag){
			flag_drag = false;
			return;
		}
		resize_img('FIT_TO_SCREEN');
	}

	function initMain(){
		img = document.getElementsByTagName('img')[0];
		if(opera.version() >= 11.10){
			img_org_w = img.naturalWidth;
			img_org_h = img.naturalHeight;
			if( !img_org_w || !img_org_h){
				timmer_measure = setInterval(function(){
					if(img.naturalWidth && img.naturalHeight){
						img_org_w = img.naturalWidth;
						img_org_h = img.naturalHeight;
						clearInterval(timmer_measure);
						if(IMG_DEFAULT_STYLE == 1)
							resize_img('FIT_TO_SCREEN');
						else
							resize_img('RECOVER_ALL');
					}
				}, 100);
			}
		}
		else{
			img_org_w = img.width;
			img_org_h = img.height;
			if(img_org_w <= 34 && img_org_h <= 26){
				timmer_measure = setInterval(function(){
					if(img.width > img_org_w){
						img_org_w = img.width;
						img_org_h = img.height;
						clearInterval(timmer_measure);
						timmer_measure = null;
						if(IMG_DEFAULT_STYLE == 1)
							resize_img('FIT_TO_SCREEN');
						else
							resize_img('RECOVER_ALL');
					}
				}, 10);
			}
		}
		img.setAttribute('style', 'transform: rotate(0deg); -o-transform: rotate(0deg); position: absolute; left: 0px; top: 0px;');
		if(IMG_DEFAULT_STYLE == 1)
			resize_img('FIT_TO_SCREEN');
		else
			resize_img('RECOVER_ALL');
		document.body.style.backgroundColor = PAGE_BG_COLOR;
	}
	
	function get_final_size(){
		img = document.getElementsByTagName('img')[0];
		if(opera.version() >= 11.10){
			img_org_w = img.naturalWidth;
			img_org_h = img.naturalHeight;
		}
		else{
			var temp_img = new Image();
			temp_img.src = img.src;
			img_org_w = temp_img.width;
			img_org_h = temp_img.height;
		}
		clearInterval(timmer_measure);
		timmer_measure = null;
	}
	
	function remove_mouse_down_hdlr(){
		if(timmer_rotate != null){
			clearTimeout(timmer_rotate);
			timmer_rotate = null;
		}
		window.removeEventListener('mousemove', mouse_drag_handler, false);
	}
	
	function show_img_size_infomation(){
		if(IMG_INFO_SHOW[0].toLowerCase() == 'none')
			return;
		var info = IMG_INFO_SHOW[1].replace('%o', img_org_w + ' x ' + img_org_h).replace('%c', img.clientWidth + ' x ' + img.clientHeight).replace('%r', angle_now.toPrecision(3) + 'deg').replace('%p', percentage.toPrecision(4) + '%');
		switch(IMG_INFO_SHOW[0])
		{
		case 'status':
			window.status = info;
			break;
		case 'title':
			document.title = info;
			break;
		case 'both':
			window.status = info;
			document.title = info;
			break;
		}
	}
	
	if(document.selectSingleNode('//head/link[@href="opera:style/image.css"]') != null){
		if(opera.version() >= 11.10)
			OP_PAGE_PERCENTAGE = 100;
		initMain();
		window.addEventListener('mousedown', mouse_down_handler, false);
		window.addEventListener('click', mouse_click_handler, false);
		window.addEventListener('dblclick', mouse_dblclick_handler, false);
		window.addEventListener('load', get_final_size, false);
		window.addEventListener('blur', remove_mouse_down_hdlr, false);
		window.onmousewheel = mouse_wheel_handler;
		window.opera.addEventListener(
			"BeforeScript",
			function (e) {
				e.preventDefault();
			}, false
		);
		if(IMG_INFO_SHOW[0] == 'status' || IMG_INFO_SHOW[0] == 'both'){
			window.addEventListener('mousemove', show_img_size_infomation, false);
		}
	}
})();