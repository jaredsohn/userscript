// ==UserScript==
// @name          original_image
// @author           s896221565
//@description       当图片被缩小或另外链接着图片时，显示原本尺寸的图片，可对图片进行拖拽、缩放或旋转。使用相册功能可列出当前页面的图片并预读。
// @date          20130217
// @version         20130228
// @Modified from  http://userscripts.org/users/sunbaokang
// @exclude *.jpg
// @exclude *.jpeg
// @exclude *.gif
// @exclude *.png
// @exclude *.bmp
// @exclude *.tiff
// @exclude *.svg
// @exclude *.fpx
// @exclude *.exif
// @exclude *.tga
// @exclude *.pcx
// @exclude *.psd
// @exclude *.cdr
// @exclude *.pcd
// @exclude *.dxf
// @exclude *.ufo
// @exclude *.eps
// @exclude *.ai
// @exclude *.raw
// @exclude *.ai
// ==/UserScript==

(function (json){
/*------------------------------设置-------------------------------*/
	//这里根据你的Opera页面缩放情况填入相关数值。如默认100%则填100。如果不使用Opera则不必理会这一项。
	//注：对于 Opera 11.10 以下的版本，如果你的页面缩放不是100%，不调整这项值会造成居中错误的问题。Opera 11.10 可不必理会此项。
	var OP_PAGE_PERCENTAGE = 100;

	// 0——图片居中显示，如果过大，则缩放
	// 1——直接在鼠标旁边显示图片，不缩放
	var VIEW_STYLE = 0;

	// true——只在图片被缩小过（用户限定规则的除外），或者图片链接着另一张图片时显示查看按钮
	// false——任何图片（用户限定规则的除外）都显示查看按钮，如果图片链接着另一张图片，则显示被链接的图片，否则显示当前图片
	var VIEW_FILTER = true;

	// 图片面积小于该值时，则不显示查看按钮
	var MIN_AREA = 120 * 120;

	// 是否在图片上显示相册按钮
	// -1：不显示；0：伴随查看按钮显示；1：图片面积大于特定值或伴随查看按钮显示
	var SHOW_ALBUM_ICON = 1;

	//图片面积小于该值时，则不显示相册按钮
	var MIN_AREA_TO_SHOW_ALBUM_ICON = 500 * 500;

	//图片并未链接图片，且图片仅仅被缩小x%，或者x像素的，则不显示查看按钮
	var DEC_PERCENTAGE = 2;
	var DEC_PIX = 20;

	//显示查看按钮的时延，单位为毫秒
	var VIEW_BUTTON_DELAY = 100;

	//查看按钮出现的位置
	//0——左上
	//1——右上
	var VIEW_BUTTON_POS = 0;

	//黑色背景的不透明度
	//注：取值为0到1之间的数，包括0跟1。
	var BACKGROUND_OPACITY = 0.5;

	//显示预览图工具栏
	//true——显示；false——不显示
	var SHOW_TOOLS_BAR = true;

	//预览图下面的背景颜色，取值方式可参照 CSS 中的 background-color 属性
	var PREVIEW_DIV_COLOR = 'white';

	//预览图边框的边距，单位为像素
	var PREVIEW_DIV_PADDING = '5';

	//当VIEW_STYLE = 2时（鼠标悬停即显示）时，显示预览图的时延
	var VIEW_PREVIEW_DELAY = 100;

	//是否开启旋转功能
	//true——开启；false——不开启
	var ROTATE_ENABLE = true;

	//旋转开启的方式
	//0——长按
	//1——按住 alt 键（firefox、chrome 则为 ctrl 键）不放
	//2——长按或按alt键（firefox、chrome 则为 ctrl 键）
	var ROTATE_STYLE = 1;

	//旋转捕捉，即旋转的角度为下值的倍数
	//注：该值为整数，0或负数为不开启捕捉
	var ROTATE_SNAP = 0;

	//旋转开启方式2
	//0——不启用
	//1——按shift旋转
	var ROTATE_STYLE_2 = 1;

	//使用第二种旋转开启方式时的角度捕捉
	//注：该值为整数，0或负数为不开启捕捉
	var ROTATE_SNAP_2 = 15;

	//当ROTATE_STYLE = 0或2时有效，长按x毫秒后开始旋转
	var LONG_PRESS_TIME = 300;

	//缩放方式
	//0——居中缩放
	//1——左上角对齐
	//2——按鼠标位置缩放
	var RESIZE_STYLE = 2;

	//显示原始尺寸方式
	//0——左上角对齐
	//1——按鼠标位置显示
	var ORIGINAL_STYLE = 1;

	//缩放速度，正数，值越大越快
	//注：当此参数为负数或零时，则不开启滚轮缩放图片功能。
	var RESIZE_SPEED = 5;

	//查看方式
	//true——当图片无链接，或链接的是一张图片，点击图片即可显示预览图，有可能与原有事件冲突。
	//false——必须点击查看按钮才显示预览图。
	//注：当设置为 true 时，如果点击事件冲突，请尝试按住 alt（firefox、chrome 则为 ctrl 键）进行点击。
	var CLICK_DIRECT_VIEW = false;

	//CLICK_DIRECT_VIEW = true时，即使链接的不一定是一张图片也显示预览图。
	var ALWAYS_CLICK_DIRECT_VIEW = false;

	//EXCLUDE_IMG_LINK = true，当图片带链接时，则不做预览操作。
	//注：ALWAYS_CLICK_DIRECT_VIEW = true或者使用自定义规则时，会忽略这项值。
	var EXCLUDE_IMG_LINK = false;

	//鼠标单击预览图的事件
	//0——尺寸切换（屏幕适配或原始尺寸）
	//1——关闭预览图
	//其他——无动作
	var PREVIEW_CLICK_HDLR = 0;

	//当PREVIEW_CLICK_HDLR = 1时（关闭预览图），等待关闭的时延，用于兼容双击事件
	var PREVIEW_CLICK_CLOSE_DELAY = 300;

	//鼠标双击预览图的事件
	//0——关闭预览图
	//1——尺寸切换（屏幕适配或原始尺寸）
	//其他——无动作
	var PREVIEW_DBLCLICK_HDLR = 0;

	//点击空白处关闭预览图
	//true——开启；false——关闭
	var CLICK_BLANK_TO_CLOSE = true;

	//按 esc 键关闭预览图
	//true——开启；false——关闭
	var PRESS_ESC_TO_CLOSE = true;

	//切换图片或在相册时是否跟踪页面图片位置
	//0——不启用
	//1——没打开相册时启用
	//2——只在相册打开时启用
	//3——都启用
	var TRACE_IMAGE_IN_PAGE = 3;

	//状态栏是否显示使用提示
	var SHOW_TIPS_ON_STATUSBAR = true;

	//说明：对于一些网站，不使用绝对路径的，可以添加替换规则
	//注：规则暂定，以后可能会变动。
	//true——开启规则检查
	//false——关闭规则检查
	var SITE_IMG_INFO_FLAG = true;
	//可按下面格式进行添加，只有在附件检查开启时才起作用
	//第一个值为图片匹配的正则表达式，第二个值为替换的内容，如何使用正则和替换，请自行搜索，或到论坛发帖求助
	//第三个值为可选值，可对替换后的链接地址作编码操作，可填常用编码函数，如 decodeURIComponent
	//第四个值为可选值，可填"href"或其他，当值为"href"时，则按照链接来匹配规则；当值为其他时，则按照图片的src来匹配规则。可参考下面google的规则
	//以下设置可做参考
	var SITE_IMG_INFO = [
		[/http\:\/\/bbs\.themex\.net\/attachment\.php\?attachmentid\=(\w+).*\&thumb\=1\&d\=(\w+)/, 'http://bbs.themex.net/attachment.php?attachmentid=$1&d=$2'],
		[/http\:\/\/(\w+)\.douban\.com\/view\/photo\/thumb\/public\/(\w+)/, 'http://$1.douban.com/view/photo/photo/public/$2'],
		[/http\:\/\/126\.fm\/(\w+)s$/, 'http://126.fm/$1'],
		[/http\:\/\/oimage\w\w\.ydstatic\.com\/image\?.*(http.*126\.fm.*)/, '$1', 'decodeURIComponent'],
		[/http\:\/\/static\.minitokyo\.net\/thumbs\/(\d+)\/(\d+)\/(\d+)\.(\w+)\?(\w+)/, 'http://static.minitokyo.net/view/$1/$2/$3.$4?$5'],
		//[/http\:\/\/\w+\.google\.\w{2,3}(\..*)?\/(images|imgres)\?imgurl\=(.*)\&imgrefurl\=.*/, '$3', '', 'href'],//去掉前面的"//"可开启该规则
		[/^https?\:\/\/.*(=|\?)(https?\:\/\/.*\.(jpg|bmp|png|gif|jpeg))$/i, '$2', '', 'href'],
	];

	//说明：特例网站设置
	//第一个值为站点匹配的正则表达式，第二个值为特例设置
	//以下设置可做参考
	var SITE_STYLE_INFO = [
		//[/http\:\/\/www\.douban\.com\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 1; VIEW_PREVIEW_DELAY = 250;'],
		[/http:\/\/t\.163\.com\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 1; VIEW_PREVIEW_DELAY = 100;'],
		[/http:\/\/tieba\.baidu\.com\//, 'CLICK_DIRECT_VIEW = false;'],
	];

	//>>>相册功能设置
	//打开相册后，如果图片链接着另一张图片，则进行预读
	//该功能为预读线程数，即同时进行预读的图片张数，-1 为无限制
	var PRELOAD_THREAD_NUM = 5;

	//相册过滤选项，第一、二项参数为宽高值，第三项参数表示该项为默认值
	var ALBUM_FILTER = [
		[150, 150],
		[200, 200],
		[300, 300, 'default'],
		[400, 400],
		[600, 600],
	];

	//相册宫格数，第一、二项为行列数，第三项参数表示该项为默认值
	var ALBUM_GRID_SIZE = [
		[2, 4],
		[2, 5],
		[3, 3],
		[3, 4],
		[3, 5, 'default'],
		[4, 5],
		[4, 6],
		[5, 5],
		[5, 7],
	];
	//<<<相册功能设置结束
/*---------------------------设置结束---------------------------------*/
	var target_obj = null;
	var preview_div = null;//大图的整个框架
	var preview_bg = null;//半暗背景
	var preview_head = null;//大图上面的三个按钮栏
	var preview_icon_album = null;//相册功能按钮
	var preview_icon_fit = null;//屏幕适配按钮
	var preview_icon_close = null;//关闭按钮
	var preview_img = null;//大图
	var preview_img_clone = null;//用于解决页面未加载完时大图无法显示的问题
	var icon_view = null;//移到可放大的图片时显示的图标
	var icon_view_album = null;//移到一张稍大的图片时显示相册按钮
	var preview_loading = null;
	var preview_loading_close = null;
	var preview_loading_close_icon = null;
	var preview_loading_img = null;
	var preview_exist_in_top = false; //用于iframe中判断顶层是否有preview div

	var timmer = null;//用于延时显示查看按钮
	var get_size_timmer = null;//用于获取图片尺寸
	var get_size_timeout_timmer = null;//获取图片尺寸超时
	var close_preview_timmer = null;//用于单击图片关闭预览图
	var timmer_rotate = null;//用于开启旋转
	//如果图片链接的是一张新图，尺寸要改变过两次才可信？？
	var org_pre_width = 0;//辅助获取新图的尺寸
	var org_cur_width = 0;//辅助获取新图的尺寸
	var org_count = 0;//辅助获取新图的尺寸
	var org_width = 0;
	var org_height = 0;
	//用于预览图拖拽
	var drag_flag = false;
	var mouse_lock = false;
	var offset_x = 0;
	var offset_y = 0;
	var preview_down_x = 0;//鼠标在预览图上点下的坐标
	var preview_down_y = 0;
	var create_lock = false;
	//用于预览图旋转
	var flag_rotate = false;
	var angle_org = 0;
	var angle_now = 0;
	var rotate_style = 1;

	var isOpera = false;

	// 用于缩放
	// 0——双击还原
	// 1——双击屏幕适配
	var fit_flag = 1;
	var percentage = 100;

	if(window.opera && window.opera.version() >= 11.10)
		OP_PAGE_PERCENTAGE = 100;

	var viewWidth = window.opera ? window.innerWidth / (OP_PAGE_PERCENTAGE / 100) : window.innerWidth;
	var viewHeight = window.opera ? window.innerHeight / (OP_PAGE_PERCENTAGE / 100) : window.innerHeight;

	var icon = {
		view: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAMAAAACYceEAAAAflBMVEUCAgKDg4PKyspAQEDq6uqoqKgiIiJiYmITExPY2Nj39/e1tbWRkZEKCgrQ0NBRUVFxcXGJiYny8vKzs7M4ODgaGhrj4+P///+/v79dXV14eHgHBweFhYXOzs7v7++rq6sWFhbc3Nz5+fm6urqenp4PDw/U1NRVVVU7Ozt/f38/jA2aAAAAnUlEQVR4nJ3R2xKCIBAG4NUow6IDBVsZYiajvf8LhgMxWDZT7s0y+13A/gBMKhyrH4SqfFTquTCJp5rEIgVAcXeStjKStG97J607eKHGNo14I9gACBndcwXISiTdgy7sYBe9LT9oe3EGy2M/MJu3fZqw+3koSgRhpyB8hXwWBbYtX6Kr5BJHyZQX0gErBimnXtYf+Xvh1TeZ8D9/1xOifhcF9jgunwAAAABJRU5ErkJggg==',
		view_click:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAMAAAACYceEAAAAnFBMVEUCAgKDg4NAQEDKysrq6upiYmKWAA4iIiLZ2M1rRiwTExOoqKj19fVxcXFRUVHQ0NDj4+MKCgqRkZF9GA/Y2Nh5VDry8vKGYUc4ODgZGRm1tbX///94eHhdXV3W1cuCGhSDXUQHBweJiYlgTCPOzs6enp6/v7/v7+/d3NEWFhb7+/tVVVUPDw/c3Nw7Ozt/f3/U1NSJY0qGX0aDGxVw/qcWAAAAmUlEQVR4nJ3RbxeBMBQG8Esj/zVlZBhalMjJ9/9w2tmsxZyTnpfP79V9LkCrUFsaSMAnVhlEvj/cy+qKTDn0yyylOJlnCBPCpGRwssgd0Rgg9CophKwoyh+BWxbTSpKCsWdCezBai+I2/7gn1rfv6sJDLfishWwo6RqDzS5vGaedrTkl5kpQDvhYW9lRsvjaXwlJf0mL//ydFxrrG3WOQg63AAAAAElFTkSuQmCC',
		view_album: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWAgMAAABI0d8lAAAACVBMVEUCAgKNjY3///+M+uzDAAAAOklEQVR4nGNgQANcq4BgBQMDB5DNhExrrVrVBKJVQ0MdOJBpoDgpNMg8JJprAdA+MM0AFoTTUHegAQBtOh2B1wNpuAAAAABJRU5ErkJggg==',
		album:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAVFBMVEVAQECjo6PT09Pq6upwcHC6urrf39/39/dcXFyLi4vKysqWlpZMTEzb29vy8vLCwsLn5+f+/v6enp62trZmZmZFRUXW1tbu7u6+vr7i4uL4+PiZmZlRV2w1AAAAkElEQVR4nHXR0Q6DIAxA0SKCyhRpxTHc///nwMWJK/bxpLlJAbA6gOTZUGLPd/3O7m8OhnMu/Fu84ZVxjHqa9g7f7nOHc5s7nAfnxpLjlyl3OIvcKc8Z+3YgQblTHH/mqc7iwgDr0bl9wa3+3h3gm//OIzEG3Rgzv5RaFqVm0zy1TW3EztoQUlNrLWWQdkP8ALS6HK3faHkLAAAAAElFTkSuQmCC',
		fit:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAaVBMVEVAQECtra3f399zc3PExMRbW1vy8vKIiIi6urpPT0+Wlpbr6+vR0dFmZmb4+PhKSkq1tbV8fHzCwsKdnZ1ERESzs7Pm5ubLy8teXl739/eUlJS+vr5RUVGYmJju7u7W1tZnZ2f+/v6Dg4PU9xxwAAAA0ElEQVR4nG3R0XaCMAwG4NhhhwSCAxeMaLR7/4dcUiluB/+bHL7mtKGF9DaQxm6T0bjb9naZcUZVZUu0VLrwvLshYmaNzXdVupuvPQMjKuj+44ILM597AFXjU39VXZkBAJ199cWQvxG9Mi+sJfGZF2P8k4Xjv1BhEd/Tyev6l5LdG60Q0cqHE4AI+Wq/Mv101/hkOTyawtPu03cgc6JxaMsklR8nkpKxtDaJvL9vgnTbvk5jnDS00zTMdX081vUwtfcQk09PMebHCSEw283YIb9I2iQce4cjfwAAAABJRU5ErkJggg==',
		full:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAaVBMVEVAQECurq7f3990dHTExMRbW1vy8vKPj4+6urpPT0/q6uqDg4PT09NmZmb4+PiZmZlKSkq2trbCwsJFRUWzs7Pn5+d7e3vKyspdXV339/eWlpa+vr5RUVHu7u6IiIjW1tZnZ2f+/v6enp6mh7t/AAAAwElEQVR4nG3Riw6CMAwF0DGhYoXJQ8QNqo7//0hbXoPADRByKE24KH8a5Yf8kIE5P87mIytOI8GmkfvAsyLSlou3KBJhX9QrY/JyxEZ0vSS4MIuLOr5S/HRAMDO/jaMiVcAJTHISTFk4yJZhF7PleLLMGGsDf6JWBrNqsCsr6PO7jFnjfjcbvrIumPgwtth1wijMD3asZMXY/8jmvG/e/zj+HcfsSWdtW3VpWpZpWrXZVwPv9t4CEHHhWmtpDYz3fxS5I/pIjUb7AAAAAElFTkSuQmCC',
		close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAh1BMVEU3Nzeenp7S0tJqamq7u7tSUlLq6uqGhoZHR0eurq7Hx8f4+PiTk5Pe3t5/f389PT2mpqZfX1/a2tpwcHDDw8Py8vKOjo5PT0/Ozs7///+ZmZlmZmY7OzuhoaHW1tZubm69vb3s7OyKiopKSkq1tbXLy8v7+/uXl5fm5uaCgoJCQkKpqaljY2MzrSVoAAAA6klEQVR4nG3R7XKCQAwFUD7jWkCoNWJKQYMQFvT9n69BoYzF/No5k8lm7zr0thxyi1W5ysW6t3jwkFZgp5KjM8w8pN7kUjrDzNaY4QRPTVM/mhnCPBxdstx8RXZmi8W9OLFs/c9a7MKAfd/vm7ovBQAm1hNE7rHr6oswvzDILY4/kP+xlPGz+2WI7DYbnb3LiIH/WDfxPZTt+V7T0o35NfcQkG6hOcvMaPT1421M2U/q05JJhaA7MEu2ZKL6sHG5fTcmKO/zjhz6Xv9Op0yQeG17uARB0wTBofWqBHU2kaCuoWknSWItMwrRL5iULnK/VwszAAAAAElFTkSuQmCC',
		loading:'data:image/gif;base64,R0lGODlhGAAYALIGAHFxccHBweTk5KampoyMjNLS0vb29gAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBwAHACwAAAAAGAAYAAADi3i6fBEtNlMYIcxIJgBUALAYgrYpBCCA4kGupxIAA4odQimRFqA9ilxmIbh8DAOYgrfMmRyXwXOT03EGhNqpOs10Y+DwojAoDyrgl5NsRsfUVrHc8JULAoMP1dlgB+ocfEFlbgVTTC6CiA5/ODBCI1QBaAVogjEPJpVNShsGAUqbTYBEDKJLckSdEgkAIfkECQcABwAsAAAAABgAGAAAA5B4unwRLTYjGCGsGLkEgQoALAFQcMtVHaJStKgSEINy2QA4rcpAbI+DAYBZbBSCweAkHPAOySNFcDwUlIMqR8DVQgMDnYRL5Ri8sbR6UQCHmbFpt60MwFHy8novRO8NbXcRZF4CD2JbXR0PPHoKFEaKjxkafUhPflAFTFyXmZRHnUKieAWNPBSfkx2YfI+qBwkAIfkECQcABwAsAAAAABgAGAAAA494unwRLTYj2BisGLnEKAtBLAFQccp1iooAjKhSDNBxpUA9nemwPQfDK7M5eD4KQ6DY8ilKAJDssowZCIBcQxCgxQYvacTAlJBjaA73EeChKII4hd1Ow+XpPOOsnxQKbhFxAmVGf2Iog0wGfzyEezxwiwxxSUWVC4WZmJyPaHhGJ3BoFEyYQZ5vlG6apK0MCQAh+QQJBwAHACwAAAAAGAAYAAADini6fFUtNiPYGEwYucSAyrUERMWFgykeAkGcSzEEaEjQ0jYO23MYBExHJwgETIaATuHRkQAglhF3AgIAVIWhEIhKBoAUx7DMlWHozONhgj0BN8G60D69b+m8Pk0R1CN+GhOBaYFLfUuCCxSLfocZSER1Z40mfkyKMI6YWpcwFIltoGhlnlp7WpQNCQAh+QQJBwAHACwAAAAAGAAYAAADiHi6fFUtRsFCYMLIZQJVw7AUw7cdlnaEisCebQChFzrMkaqkDmS8LZXhYSroDh1VgEAwCR64zY9Z4xBhA0JJesx1YWCOYJwJLwEAQsBALoPP6Wp4Pjd8FewxNh1FksEGBGhVeTpueCYBaDhHekgqjgpGEnktH2N3DZiWiCZSh5FsmRwYnqNcYAkAIfkECQcABwAsAAAAABgAGAAAA4x4unwiLUbDQmCCSmUKVNZSDN92FIUWOsNgLgIKXkcwFJumoNRzGAOaIsN56IgLQ0AzIiUfpVzr1jBAX7ZA9DXRcb9PqHdjIxCCVvG3fBaC31zDOLxtDABORrpeJQAAQmlHXgIDKn44HBgfcj8ABBhzPz4OH35uG0ZDHwV/cUiVCwEAiSaEUSlwP5IMCQAh+QQJBwAHACwAAAAAGAAYAAADiXi6fCItRsNKYVAuI6iyixB4mtN912EEQbk96BdkE5bBaxt63Kn4CkPqUBgMaD2aZmUcBh/KSGAwc7kMJKv2Bc1qisZBIQksgZvbdBq7hLoGhGMjaTXACTrVg1QWDDwBBARINgosKgAEGF5PGYIKAwB5JXsKAAA/iXVAlwsBAFE1C48LY2oHhy4JACH5BAkHAAcALAAAAAAYABgAAAOJeLp8Zi1GuIRgVCojsq1FplnU5xSFhpkmekmi+ZzpknFdJXJVELwOC1Dl+zVww0ghEFI5HaKndCPMPZeDARNpdWK1talYOoMJnQFtEvk0ZAdhHMU9FAwohSxQRABAfA4EAwxdDAEABAoEiQcDBAFSAAA1kgoCi1cAkAqVCgEESUdhB5g6YweATgkAIfkECQcABwAsAAAAABgAGAAAA4x4unxmLUa4hGBUKiOyXVymWdTnmNpmrp0mmo+COiBZiVxVFBk3a7vCBWMZjnailCSmbC6LraYgQA10oEnJtGp0eh1ZTPhQIAAGysDA2ggAAITxRj0oLArvwGbQNQQoBQN8G3YLZhBUDoIMUW1nCosHaoVKZkMEBDKRKQIAegqYd4MpBpQHmweNXolKCQAh+QQJBwAHACwAAAAAGAAYAAADh3i6fGYtRriEYFQqI7JdXKZZ1OeY2maunSaaj4I6IFmJXN2q82hjlksqKEoZj8hGgAAAEAJIQWFaECybzyi1muxuio2YRDAADIyFQKEYwIKVgYDwUHBCHYO5I1CKC3MLAwQQU3h3GxpLZwcDiwEDBUgEBEKNMpZGAlkKmHR5RoCcizJvKYVGCQAh+QQJBwAHACwAAAAAGAAYAAADi3i6fGYtRriEYFQqI7JdXKZZ1OeY2maunWQUjPkoqLMUABBUIgeSi0COIJJYWowCATBIHY5FUNRJrSoCSwBhR+VAsUOu0wu0mh1T6WhAaKYEhUIR207f4hcaYbsJ9GA0cRQ+CwMDEHEOAWI2EgUDXIsKBQF5ToZ5hn2MRgOAB5o0fmOWB5IVZ5OfGgkAIfkEBQcABwAsAAAAABgAGAAAA4p4unxmLTZTmBAMylVAWNdiCNp2AEB1hA5rHgFAKOxVZthCANBD54pSh/BxDIAtkW0Rk90kF1JDMAAMXtGnSPvqehWBAYEwKL5G2fC47EUvv3AH9ysIm6FvzmA/B+WpAyoGATcjSlJJTAMQIRQqQRsFbDBFBQVIG3s5AUWOXVSPnCAFfYlgd6V4XQkAOw==',
		broken: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNrMl9ERwiAMhsFzAEdxBDaQERyhG+EGfXcJXMIXX+oG2HrUi7mENim9lrucbSnwNX9I0BhjUiXrejsbRUtbQ4yDZYNS+hpaXAVRBSBfqyCqAWghaklgGIhis2BxKwX4DrI2zViDbQezg6aSQCLNrj1wnKMzKay1VQA298AsgP5r4xDt0PrHAWpe8pYoCOGEedJYyP0BA5SCkIPEL4YFxSgwwMOzpghAkK9hQ2b0WoA253aXr0te8OBdT3j1CiWZA9ASnmsJN5eKzxnJ4yUAjpjQocVPOICZ4BwhOgkA9WUN7EcLBODi3z3wxDiuWSJBBJpTWzYQ93inRWkQOiIIPQPwzEYB+L9zxMJt6AiNnwgkcPFDpeKbMJO+tzoPVJFgSTV85N8L03/v7cX0XeAcWg/U3Yaaoxc4/capkjyZiJQAvnoqlhpRaMZi5KaK0Rp/TvXleGX7HUhwrHwEGABQT5NqCNl2HwAAAABJRU5ErkJggg=='
	};

	function _Message(message){
		if(message.indexOf('MSG_ID_ORIGINAL_SIZE_IMAGE_CREATE') != -1){
			preview_exist_in_top = preview_temp_lock = true;
		}
		window.top.postMessage(message, '*');
	}

	function _StopEvent(ev){
		ev.stopPropagation();
		ev.preventDefault();
	}

	function get_preview_orginal_size() {
		if(org_width == 0 || org_height == 0){
			if(is_undefined(preview_img.naturalWidth) == false){
				org_width = preview_img.naturalWidth;
				org_height = preview_img.naturalHeight;
			}
			else{
				org_width = preview_img.offsetWidth;
				org_height = preview_img.offsetHeight;
			}
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

	function stop_rotate(){
		window.removeEventListener('mousemove', rotate_handler, false);
		window.removeEventListener('mouseup', stop_rotate, false);
		if(timmer_rotate != null){
			clearTimeout(timmer_rotate);
			timmer_rotate = null;
		}
		flag_rotate = false;
	}

	function is_undefined(x){
		if(typeof x != 'undefined')
			return false;
		return true;
	}

	function is_rotate_available(){
		var style = document.body.style;
		if( ! is_undefined(style.OTransform) || ! is_undefined(style.MozTransform) || ! is_undefined(style.WebkitTransform) || !is_undefined(style.Transform) )
			return true;
		return false;
	}

	function rotate_obj(obj, angle){
		!is_undefined(obj.style.OTransform) && (obj.style.OTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.MozTransform) && (obj.style.MozTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.WebkitTransform) && (obj.style.WebkitTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.Transform) && (obj.style.Transform = 'rotate(' + angle + 'deg)');
	}

	function rotate_handler(ev){
		var angle = get_angle(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
		var style_str = preview_div.getAttribute('style');
		var angle_to_rotate = (angle_org - angle + angle_now);
		if(ROTATE_SNAP > 0 && rotate_style == 1){
			angle_to_rotate = Math.floor(angle_to_rotate / ROTATE_SNAP) * ROTATE_SNAP;
		}
		else if(ROTATE_SNAP_2 > 0 && rotate_style == 2){
			angle_to_rotate = Math.floor(angle_to_rotate / ROTATE_SNAP_2) * ROTATE_SNAP_2;
		}
		rotate_obj(preview_div, angle_to_rotate);
	}

	function start_rotate(ox, oy, x, y){
		timmer_rotate = null;
		mouse_lock = true;
		window.removeEventListener('mousemove', drag_proc, false);
		if(ox == x && oy == y)
			return false;
		flag_rotate = true;
		drag_flag = false;
		angle_org = get_angle(ox, oy, x, y);
		window.addEventListener('mousemove', rotate_handler, false);
		window.addEventListener('mouseup', stop_rotate, false);
	}

	function get_container_origin(){
		return {
			x: preview_div.offsetLeft + (preview_div.offsetWidth >> 1),
			y: preview_div.offsetTop + (preview_div.offsetHeight >> 1)
		}
	}

	function backgroundMouseDown (ev){
		if(ev.target != preview_img){
			drag_flag = false;
			mouse_lock = false;
		}
	}

	function drag_begin (ev){
		if(ev.button != 0)//非左键
			return false;
		ev.preventDefault();
		create_lock = true;
		preview_down_x = ev.pageX;
		preview_down_y = ev.pageY;
		var x = ev.pageX;
		var y = ev.pageY;
		offset_x = x - preview_div.offsetLeft;
		offset_y = y - preview_div.offsetTop;
		if(ev.target == preview_img){
			drag_flag = true;
			mouse_lock = true;
			window.addEventListener('mousemove', drag_proc, false);
		}
		if(ROTATE_ENABLE && is_rotate_available()){
			if(ROTATE_STYLE == 0 || ROTATE_STYLE == 2){
				if(timmer_rotate == null)
					timmer_rotate = setTimeout(function(){ rotate_style = 1; start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY); }, LONG_PRESS_TIME);
			}
			if(ROTATE_STYLE == 1 || ROTATE_STYLE == 2){
				if(isOpera ? ev.altKey : ev.ctrlKey){
					rotate_style = 1;
					start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
				}
			}
			if(ROTATE_STYLE_2 == 1){
				if(ev.shiftKey){
					rotate_style = 2;
					start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
				}
			}
		}
	}

	function drag_proc(ev){
		if(!drag_flag || preview_img == null)
			return false;
		var x = ev.pageX;
		var y =	ev.pageY;
		stop_rotate();
		preview_div.style.left = x - offset_x + 'px';
		preview_div.style.top = y - offset_y + 'px';
		if(window.getSelection() != '')
			window.getSelection().removeAllRanges();
	}

	function drag_over(ev){
		if(ev.button != 0)
			return false;
		drag_flag = false;
		create_lock = false;
		//mouse_lock = false;
		if(flag_rotate){
			angle_now = angle_org - get_angle(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY) + angle_now;
		}
		stop_rotate();
		if(ev.pageX == preview_down_x && ev.pageY == preview_down_y){
			switch(PREVIEW_CLICK_HDLR){
				case 0:
					fit_to_screen_switch(ev.pageX, ev.pageY);
					break;
				case 1:
					if(close_preview_timmer == null){
						close_preview_timmer = setTimeout(function(){destroy_preview(); close_preview_timmer = null}, PREVIEW_CLICK_CLOSE_DELAY);
					}
					else{
						clearTimeout(close_preview_timmer);
						close_preview_timmer = null;
					}
					break;
				default:
					break;
			}
		}
	}

	function fit_to_screen_switch (x, y){
		get_preview_orginal_size();
		if(preview_img.offsetWidth != org_width || preview_img.offsetHeight != org_height)
			fit_to_screen_switch_ext(0, x, y);
		else
			fit_to_screen_switch_ext(1, x, y);
	}

	function fit_to_screen_switch_ext (fit_flag, x, y){
		get_preview_orginal_size();
		switch(fit_flag){
			case 0://还原
				var of_x = x - preview_div.offsetLeft;
				var of_y = y - preview_div.offsetTop;
				var o_w = preview_div.offsetWidth;
				var o_h = preview_div.offsetHeight;
				preview_img.style.width = 'auto';
				preview_img.style.height = 'auto';
				percentage = 100;
				fit_flag = 1;
				if(ORIGINAL_STYLE == 1){
					var p_x = of_x / o_w;
					var p_y = of_y / o_h;
					preview_div.style.left = x - (preview_div.offsetWidth * p_x) + 'px';
					preview_div.style.top = y - (preview_div.offsetHeight * p_y) + 'px';
				}
				break;
			case 1://屏幕适配
				preview_img.style.width = 'auto';
				preview_img.style.height = 'auto';
				percentage = 100;
				if(preview_img.offsetHeight > viewHeight * 0.9){
					percentage = (viewHeight * 100 * 0.9)/ org_height;
					preview_img.style.height = org_height * percentage/100 + 'px';
					preview_img.style.width = org_width * percentage/100 + 'px';
				}
				if(preview_img.offsetWidth > viewWidth * 0.9){
					percentage = (viewWidth * 100 * 0.9)/ org_width;
					preview_img.style.height = org_height * percentage/100 + 'px';
					preview_img.style.width = org_width * percentage/100 + 'px';
				}
				preview_div.style.left = (viewWidth - preview_div.offsetWidth) / 2 + window.pageXOffset +  'px';
				preview_div.style.top = (viewHeight - preview_div.offsetHeight) / 2 + window.pageYOffset + 'px';
				fit_flag = 0;
				break;
			default:
				break;
		}
	}

	function resize_preview(ev){
		get_preview_orginal_size();
		var val;
		if(ev.wheelDelta)
			val = ev.wheelDelta/120;
		else if(ev.detail)
			val = -ev.detail/3;
		_StopEvent(ev);
		if(val > 0)
			percentage += RESIZE_SPEED;
		else
			percentage -= RESIZE_SPEED;
		if(percentage < 5)
			percentage = 5;
		var org_div_w, org_div_h, org_div_x, org_div_y;
		var of_x, of_y;
		if(RESIZE_STYLE != 1) {//居中缩放
			org_div_w = preview_div.offsetWidth;
			org_div_h = preview_div.offsetHeight;
			org_div_x = preview_div.offsetLeft;
			org_div_y = preview_div.offsetTop;
			of_x = ev.pageX - org_div_x;
			of_y = ev.pageY - org_div_y;
		}
		preview_img.style.width = org_width * percentage/100 + 'px';
		preview_img.style.height = org_height * percentage/100 + 'px';
		if(RESIZE_STYLE == 0) {//居中缩放
			preview_div.style.left = preview_div.offsetLeft - (preview_div.offsetWidth - org_div_w)/2 + 'px';
			preview_div.style.top = preview_div.offsetTop - (preview_div.offsetHeight - org_div_h)/2 + 'px';
		}
		else if(RESIZE_STYLE == 2) {//按鼠标位置缩放
			var p_x = (of_x / org_div_w);
			var p_y = (of_y / org_div_h);
			preview_div.style.left = ev.pageX - (preview_div.offsetWidth * p_x) + 'px';
			preview_div.style.top = ev.pageY - (preview_div.offsetHeight * p_y) + 'px';
		}
	}

	function set_preview_layout_ext(){
		var times = isOpera ? 2 : 1;
		get_preview_orginal_size();
		if(org_width != 0 && org_height != 0){
			if(is_undefined(preview_img.naturalWidth) == false){
				clearInterval(get_size_timmer);
				get_size_timmer = null;
				set_preview_layout();
			}
			else{
				if(org_pre_width != org_width){
					org_count ++;
					org_pre_width = org_cur_width;
					org_cur_width = org_width;
				}
				if(org_count > times){
					clearInterval(get_size_timmer);
					get_size_timmer = null;
					org_count = org_pre_width = org_cur_width = 0;
					set_preview_layout();
				}
				else{
					org_width = org_height = 0;
				}
			}
		}
	}

	function set_preview_layout(){
		destroy_preview_loading();
		if(org_width > viewWidth * 0.9 || org_height > viewHeight * 0.9)
			fit_to_screen_switch_ext(1);
		preview_div.style.left = (viewWidth - preview_div.offsetWidth) / 2 + window.pageXOffset + 'px';
		preview_div.style.top = (viewHeight - preview_div.offsetHeight) / 2 + window.pageYOffset + 'px';
		preview_div.style.visibility = 'visible';
		preview_div.style.zIndex = 999999;
	}

	function create_preview_button(icon, func){
		var btn = _createElement('span');
		btn.setAttribute('style', 'margin-left: 5px; width: 22px !important; height: 22px !important; background-image: url("' + icon + '"); float: right !important; cursor: pointer !important;');
		btn.addEventListener('click', func, false);
		return btn;
	}

	function drag_fix(ev){
		var x = ev.pageX;
		var y = ev.pageY;
		if(drag_flag){
			preview_div.style.left = x - offset_x + 'px';
			preview_div.style.top = y - offset_y + 'px';
			if(window.getSelection() != '')
				window.getSelection().removeAllRanges();
			return true;
		}
		return false;
	}

	function create_whole_page_div(color, opacity){
		var div = _createElement('div');
		div.setAttribute('style', 'position: absolute !important; left: 0px !important; top: 0px !important; z-index: 999998 !important; background-color: ' + color + ' !important; opacity: ' + opacity + ' !important; width: '+Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) + 'px !important; height: ' + Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, (window == window.top) ? viewHeight : 0) + 'px !important;');
		return div;
	}

	var has_played = false;
	var last_play_mouse_x = -1;
	var last_play_mouse_y = -1;

	function preview_bg_scroll_hdlr (ev) {
		if(VIEW_STYLE != 0){
			return;
		}
		var val, ret = false;
		if(ev.wheelDelta)
			val = ev.wheelDelta/120;
		else if(ev.detail)
			val = -ev.detail/3;
		var obj = ev.target;
		if(obj == preview_bg || obj == preview_div
		|| (has_played && Math.abs(ev.clientX - last_play_mouse_x) <= 40 && Math.abs(ev.clientY - last_play_mouse_y) <= 40)){
			//在 firefox 中切换上/下张时页面会滚动，使用 Timer 避免该问题
			setTimeout(function() {
				has_played = true;
				last_play_mouse_x = ev.clientX;
				last_play_mouse_y = ev.clientY;
				(val < 0) ? preview_album_play_next() : preview_album_play_previous();
			}, 1);
			ret = true;
		}
		if(obj != preview_img || ret){
			_StopEvent(ev);
		}
	}

	function preview_play_check(ev) {
		if(Math.abs(ev.clientX - last_play_mouse_x) > 40 || Math.abs(ev.clientY - last_play_mouse_y) > 40){
			has_played = false;
		}
	}

	var image_source_gathering = false;

	function create_preview(x, y, imgLink, not_from_click){
		if(imgLink != null){
			destroy_all_preview();
			if(preview_album != null){
				if(target_obj.src && !not_from_click){
					curr_img_src = target_obj.src;
				}
				curr_index = preview_album_current_source_find_index_by_link(imgLink);
				preview_album_hightlight_photo(curr_index, true);
			}
			else if(image_source_gathering == false){
				album_display_lock = true;
				preview_album_main();
				image_source_gathering = true;
				setTimeout(function(){ image_source_gathering = false; }, 100);
			}
			if(VIEW_STYLE != 1){
				preview_bg = create_whole_page_div('black', BACKGROUND_OPACITY);
				preview_bg.addEventListener('mousemove', drag_fix, false);
				window.addEventListener('mousemvoe', preview_play_check, true);
				window.addEventListener('DOMMouseScroll', preview_bg_scroll_hdlr, true);
				window.addEventListener('mousewheel', preview_bg_scroll_hdlr, true);
				if(SHOW_TIPS_ON_STATUSBAR){
					preview_bg.addEventListener('mouseover', function(e){ window.status = '滚动鼠标滚轮查看上/下一张图片'; }, false);
				}
				document.body.appendChild(preview_bg);
			}
			preview_div = _createElement('div');
			preview_div.setAttribute('style', 'border: 1px solid gray !important; line-height: 0px !important; background-color: ' + PREVIEW_DIV_COLOR + ' !important; position: absolute !important; z-index: 999999 !important; padding: ' + PREVIEW_DIV_PADDING + 'px !important;');
			preview_div.style.left = -9999 + 'px';
			preview_div.style.top = -9999 + 'px';
			preview_div.style.visibility = 'hidden';
			preview_div.style.zIndex = -999999;

			if(SHOW_TOOLS_BAR){
				preview_head = _createElement('div');
				preview_head.setAttribute('style', 'min-width: 100px; height: 22px !important;');

				preview_icon_fit = create_preview_button(icon.fit, function(){ fit_to_screen_switch_ext(1); });
				preview_icon_full = create_preview_button(icon.full, function(){ fit_to_screen_switch_ext(0); });
				preview_icon_close = create_preview_button(icon.close, destroy_preview);

				preview_head.appendChild(preview_icon_close);
				preview_head.appendChild(preview_icon_full);
				preview_head.appendChild(preview_icon_fit);
				if(preview_album == null){
					preview_icon_album = create_preview_button(icon.album, preview_album_main);
					preview_head.appendChild(preview_icon_album);
				}
				preview_div.appendChild(preview_head);
			}

			preview_img = _createElement('img');
			preview_img.src = imgLink;
			preview_img.setAttribute('style', 'margin-top: 0px !important; cursor: move !important; max-width: none !important; max-height: none !important; width: auto; height: auto; background-color: white !important;');
			if(SHOW_TOOLS_BAR){
				preview_img.style.marginTop = '3px';
			}
			window.addEventListener('mousedown', backgroundMouseDown, false);
			preview_img.addEventListener('mousedown', drag_begin, false);
			preview_img.addEventListener('mouseup', drag_over, false);
			switch(PREVIEW_DBLCLICK_HDLR){
				case 0:
					preview_img.addEventListener('dblclick', destroy_preview, false);
					break;
				case 1:
					preview_img.addEventListener('dblclick', fit_to_screen_switch, false);
					break;
				default:
					break;
			}
			if(RESIZE_SPEED > 0){
				preview_img.addEventListener('DOMMouseScroll', resize_preview, false);
				preview_img.addEventListener('mousewheel', resize_preview, false);
			}
			preview_div.appendChild(preview_img);
			document.body.appendChild(preview_div);

			//opera中，body子元素加载优先权高于孙子元素，此段代码用于解决页面未加载完成时图片不显示的问题。
			preview_img_clone = _createElement('img');
			preview_img_clone.src = imgLink;
			preview_img_clone.setAttribute('style', 'visibility: hidden !important; z-index: -999999 !important; position: absolute !important; width: 0px; height: 0px;');
			preview_img_clone.onerror = preview_img_clone.onload = function (ev) {
				if(preview_img_clone != null){
					preview_img_clone.parentNode.removeChild(preview_img_clone);
					preview_img_clone = null;
				}
				if(ev.type == 'error'){
					if(preview_loading != null){
						clearInterval(get_size_timmer);
						get_size_timmer = null;
						preview_loading_img.style.backgroundImage = 'url(' + icon.broken + ')';
					}
				}
			};
			document.body.appendChild(preview_img_clone);
		}
		//调整图片位置
		if(VIEW_STYLE == 1){//不居中
			preview_div.style.left = x + 5 + 'px';
			preview_div.style.top = y + 5 + 'px';
			preview_div.style.visibility = 'visible';
			preview_div.style.zIndex = 999999;
		}
		else{//图片居中显示，如果过大，则缩放
			var temp_img = new Image();
			temp_img.src = imgLink;
			if(temp_img.width != 0){
				get_preview_orginal_size();
				set_preview_layout();
			}
			else{
				create_preview_loading();
				get_size_timmer = setInterval(set_preview_layout_ext, 10);
			}
			delete temp_img;
		}
	}

	function create_preview_loading(){
		preview_loading = _createElement('div');
		preview_loading.setAttribute('style', 'border: 1px solid gray !important; background-color: white !important; position: absolute !important; z-index: 999999 !important; width: 100px !important; height: 105px !important;');
		preview_loading_close = _createElement('div');
		preview_loading_close_icon = _createElement('div');
		preview_loading_close_icon.setAttribute('style', 'width: 22px !important; height: 22px !important; background-image: url("' + icon.close + '"); float: right !important; cursor: pointer !important;');
		preview_loading_close_icon.addEventListener('click', destroy_all_preview, false);
		preview_loading_close.appendChild(preview_loading_close_icon);
		preview_loading.appendChild(preview_loading_close);
		preview_loading_img = _createElement('div');
		preview_loading_img.setAttribute('style', 'position: absolute !important; top: 5px !important; background-image: url("' + icon.loading + '") !important; background-position: center center !important; background-repeat:no-repeat !important; width: 100px !important; height: 100px !important;');
		preview_loading.appendChild(preview_loading_img);
		document.body.appendChild(preview_loading);
		preview_loading.style.left = (viewWidth - preview_loading.offsetWidth) / 2 + window.pageXOffset + 'px';
		preview_loading.style.top = (viewHeight - preview_loading.offsetHeight) / 2 + window.pageYOffset + 'px';
	}

	function destroy_preview_loading(){
		if(window != window.top){
			_Message('MSG_ID_ORIGINAL_SIZE_IMAGE_DESTROY_LOADING');
			return;
		}
		if(get_size_timmer){
			clearInterval(get_size_timmer);
			get_size_timmer = null;
		}
		if(get_size_timeout_timmer){
			clearTimeout(get_size_timeout_timmer);
			get_size_timeout_timmer = null;
		}
		if(preview_loading != null){
			document.body.removeChild(preview_loading);
			preview_loading = null;
		}
	}

	function destroy_preview(event_or_keep_bg){
		if(window != window.top){
			_Message('MSG_ID_ORIGINAL_SIZE_IMAGE_DESTROY_PREVIEW');
			preview_exist_in_top = false;
			return;
		}
		if(timmer){
			clearTimeout(timmer);
			timmer = null;
		}
		reset_recycle_warning();
		if(event_or_keep_bg && typeof event_or_keep_bg != 'boolean'){
			_StopEvent(event_or_keep_bg);
		}
		if(preview_bg != null && event_or_keep_bg !== true){
			window.removeEventListener('mousemvoe', preview_play_check, true);
			window.removeEventListener('DOMMouseScroll', preview_bg_scroll_hdlr, true);
			window.removeEventListener('mousewheel', preview_bg_scroll_hdlr, true);
			document.body.removeChild(preview_bg);
			preview_bg = null;
		}
		if(preview_div != null){
			window.removeEventListener('mousedown', backgroundMouseDown, false);
			window.removeEventListener('mousemove', drag_proc, false);

			preview_div.parentNode.removeChild(preview_div);
			if(preview_img_clone != null){
				document.body.removeChild(preview_img_clone);
				preview_img_clone = null;
			}

			if(get_size_timmer){
				clearInterval(get_size_timmer);
				get_size_timmer = null;
			}
			preview_div = null;
			percentage = 100;
			fit_flag = 1;
			org_width = org_width = angle_org = angle_now = 0;
		}
	}

	function getElementXY(ele){
		destroy_view_icon();
		if(ele.getBoundingClientRect){
			return {
				x : ele.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
				y : ele.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
			}
		}
		else{
			var i = ele.offsetLeft, j = ele.offsetTop;
			var temp_node = ele;
			while(temp_node.offsetParent){
				temp_node = temp_node.offsetParent;
				i += temp_node.offsetLeft;
				j += temp_node.offsetTop;
			}
			temp_node = ele;
			while(temp_node.parentNode && temp_node.parentNode.tagName != 'BODY'){
				temp_node = temp_node.parentNode;
				i -= temp_node.scrollLeft;
				j -= temp_node.scrollTop;
			}
			return {
				x : i,
				y : j
			}
		}
	}

	function show_view_icon(imgLink, canShowAlbumIcon){
		if(drag_flag || target_obj == preview_img || (VIEW_STYLE == 1 && preview_div != null)){
			destroy_view_icon();
			return false;
		}
		var pos = getElementXY(target_obj);
		var x = pos.x, y = pos.y;
		if(imgLink != null){
			var view_icon = '';
			view_icon = can_click_direct_view() ? icon.view_click : icon.view;
			if(VIEW_BUTTON_POS == 1)//右上
				x = x + target_obj.width - 32;
			icon_view = _createElement('span');
			icon_view.setAttribute('style', 'width: 25px !important; height: 22px !important; position: absolute !important; left: ' + x + 'px !important; top: ' + y + 'px !important; cursor: pointer; background-image: url("' + view_icon + '") !important; z-index: 999998 !important;');
			icon_view.addEventListener('click', function(ev){
				if(window != window.top){
					var message = x + '+|+|+' + y + '+|+|+' + imgLink + '+|+|+' + 1 + '+|+|+' + 'MSG_ID_ORIGINAL_SIZE_IMAGE_CREATE';
					destroy_view_icon();
					_Message(message);
				}else{
					setTimeout(function(){create_preview(x, y, imgLink);}, 1);
				}
			}, false);
			document.body.appendChild(icon_view);
			x = (VIEW_BUTTON_POS == 1) ? (x - 25 - 1) : (x + 25 + 1);
		}

		if(preview_album == null && ((SHOW_ALBUM_ICON == 1 && canShowAlbumIcon) || (SHOW_ALBUM_ICON != -1 && imgLink != null)) ){
			icon_view_album = _createElement('span');
			icon_view_album.setAttribute('style', 'width: 25px !important; height: 22px !important; position: absolute !important; left: ' + x + 'px !important; top: ' + y + 'px !important; cursor: pointer; background-image: url("' + icon.view_album + '") !important; z-index: 999998 !important;');
			icon_view_album.addEventListener('click', function(){
				preview_album_main();
			}, false);
			document.body.appendChild(icon_view_album);
		}
	}

	function destroy_view_icon (){
		if(target_obj != icon_view && target_obj != icon_view_album){
			if(timmer){
				clearTimeout(timmer);
			}
			if(icon_view != null){
				icon_view.parentNode.removeChild(icon_view);
				icon_view = null;
			}
			if(icon_view_album != null){
				icon_view_album.parentNode.removeChild(icon_view_album);
				icon_view_album = null;
			}
		}
	}

	function destroy_all_preview (keep_bg){
		destroy_preview_loading();
		destroy_view_icon();
		destroy_preview(keep_bg);
	}

	function diff_ingore(w, h, ow, oh){
		if((100 - w*100/ow) <= DEC_PERCENTAGE && (100 - h*100/oh) <= DEC_PERCENTAGE)
			return true;
		if(Math.abs(ow - w) <= DEC_PIX && Math.abs(oh - h) <= DEC_PIX)
			return true;
		return false;
	}

	function need_preview(w, h, ow, oh){
		if(VIEW_FILTER == false)
			return true;
		if(w > ow && h > oh)
			return false;
		if(diff_ingore(w, h, ow, oh))
			return false;
		return true;
	}

	function check_img_link (link){
		if(link.search(/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i) != -1)
			return true;
		return false;
	}

	function check_img_src_reg (obj){
		if(!SITE_IMG_INFO_FLAG)
			return '';
		var i, t_link = '', link = obj.src;
		for(i = 0; i < SITE_IMG_INFO.length; i++){
			if(SITE_IMG_INFO[i][3] == 'href'){
				var target_link = obj, find = false;
				while(_tag(target_link) != 'a' && target_link.parentNode){
					target_link = target_link.parentNode;
				}
				if(_tag(target_link) != 'a') continue;
				t_link = target_link.href;
			}
			else{
				t_link = link;
			}
			if(SITE_IMG_INFO[i][0].test(t_link)){
				return (SITE_IMG_INFO[i][2]) ? eval(SITE_IMG_INFO[i][2] + '("' + t_link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]) + '")') : t_link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]);
			}
		}
		return '';
	}

	function can_click_direct_view(){
		var temp = target_obj;
		if(!CLICK_DIRECT_VIEW)
			return false;
		if(ALWAYS_CLICK_DIRECT_VIEW)
			return true;
		while(_tag(temp) != 'a' && temp.parentNode)
			temp = temp.parentNode;
		if(_tag(temp) != 'a')
			return true;
		else{
			if(check_img_src_reg(target_obj) || check_img_link(temp.href))
				return true;
		}
		return false;
	}

	var start_preview_x = 0, start_preview_y = 0, start_preview_link = '', start_preview_click_obj = null;
	function click_to_show_preview(ev){
		if(ev.target != start_preview_click_obj || (isOpera ? ev.altKey : ev.ctrlKey) || ev.button != 0){
			return;
		}
		_StopEvent(ev);
		if(preview_div == null || start_preview_link != preview_img.src){
			if(window != window.top){
				var message = start_preview_x + '+|+|+' + start_preview_y + '+|+|+' + start_preview_link + '+|+|+' + 1 + '+|+|+' + 'MSG_ID_ORIGINAL_SIZE_IMAGE_CREATE';
				destroy_view_icon();
				_Message(message);
			}else{
				setTimeout(function(){create_preview(start_preview_x, start_preview_y, start_preview_link);}, 1);
			}
			window.removeEventListener('click', arguments.callee, true);
		}
		else if(preview_div != null)
			destroy_all_preview();
	}

	function start_preview(x, y, target_x, target_y, link, canShowAlbumIcon){
		if(timmer){
			clearTimeout(timmer);
		}
		if(VIEW_STYLE == 1){
			show_view_icon(link, canShowAlbumIcon);
			if(window != window.top){
				var message = x + '+|+|+' + y + '+|+|+' + link + '+|+|+' + VIEW_PREVIEW_DELAY + '+|+|+' + 'MSG_ID_ORIGINAL_SIZE_IMAGE_CREATE';
				_Message(message);
			}
			else{
				timmer = setTimeout(function(){create_preview(x, y, link);}, VIEW_PREVIEW_DELAY);
			}
		}
		else{
			timmer = setTimeout(function(){show_view_icon(link, canShowAlbumIcon);}, VIEW_BUTTON_DELAY);
		}
		if( can_click_direct_view() && link != null){
			start_preview_x = target_x;
			start_preview_y = target_y;
			start_preview_link = link;
			start_preview_click_obj = target_obj;
			window.removeEventListener('click', click_to_show_preview, true);
			window.addEventListener('click', click_to_show_preview, true);
		}
	}

	function checkImage(ev){
		var x = ev.pageX;
		var y =	ev.pageY;
		if(flag_rotate){
			return false;
		}
		//用于修正拖拽过快造成的拖拽失败问题
		if(drag_fix(ev)){
			return false;
		}

		target_obj = ev.target;
		var temp = target_obj;
		if(preview_div != null){
			while(temp.parentNode){
				if(temp == preview_div){
					if(VIEW_STYLE == 1 && timmer){
						clearTimeout(timmer);
						timmer = null;
					}
					destroy_view_icon();
					return false;
				}
				temp = temp.parentNode;
			}
		}
		//指向非图片元素时，则关闭查看图标
		if(_tag(target_obj) != 'img'){
			if(VIEW_STYLE == 1){
				destroy_preview();
			}
			destroy_view_icon();
			return false;
		}

		//创建一个不显示的图片，用于验证原本尺寸
		var org_img = new Image();
		org_img.src = target_obj.src;

		var imgLink = target_obj;
		while(_tag(imgLink) != 'a' && imgLink.parentNode)
			imgLink = imgLink.parentNode;

		//如果目标图片过小，则不生效
		if(target_obj.width * target_obj.height < MIN_AREA
		&& check_img_src_reg(target_obj) == ''
		&& !(_tag(imgLink) == 'a' && check_img_link(imgLink.href) && target_obj.src != imgLink.href)
		){
			return false;
		}

		var link = null;
		if(VIEW_FILTER){//只在图片被缩小过，或者图片链接着另一张图片时显示查看按钮
			if(check_img_src_reg(target_obj) != ''){//自定义的规则
				link = check_img_src_reg(target_obj);
			}
			else if( _tag(imgLink) == 'a' && EXCLUDE_IMG_LINK == true){
			}
			else if( _tag(imgLink) == 'a' && check_img_link(imgLink.href) && EXCLUDE_IMG_LINK == false ){
				//图片链接，链接的是一张图片
				link = imgLink.href;
			}
			else if( (org_img.width > target_obj.offsetWidth || org_img.height > target_obj.offsetHeight)
				&& need_preview(target_obj.offsetWidth, target_obj.offsetHeight, org_img.width, org_img.height)){//原图被缩放
				link = target_obj.src;
			}
		}//if(VIEW_FILTER)
		else{//任何图片（除长或宽小于40像素外）都显示查看按钮，如果图片链接着另一张图片，则显示被链接的图片，否则显示当前图片
			if(check_img_src_reg(target_obj) != '' && preview_album == null){//自定义的规则
				link = check_img_src_reg(target_obj);
			}
			//图片链接，链接的是另一张图片
			else if( _tag(imgLink) == 'a' && (check_img_link(imgLink.href) || preview_album != null) ){
				link = imgLink.href;
			}
			else if(need_preview(target_obj.width, target_obj.height, org_img.width, org_img.height)){//没有链接图片
				if(diff_ingore(target_obj.offsetWidth, target_obj.offsetHeight, org_img.width, org_img.height)){
					link = target_obj.src;
				}
				else{
					link = target_obj.src;
				}
			}
		}
		start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, link, (target_obj.width * target_obj.height >= MIN_AREA_TO_SHOW_ALBUM_ICON));
		delete org_img;
	}

	function closePreviewByClick(ev){
		if(ev.button != 0)
			return;
		var temp = ev.target;
		var is_preview_obj = false;
		var is_loading_obj = false;
		var ret = false;
		if(preview_div != null || preview_loading != null){
			while(temp.parentNode){
				if(temp == preview_div)
					is_preview_obj = true;
				if(temp == preview_loading)
					is_loading_obj = true;
				temp = temp.parentNode;
			}
			if(is_preview_obj && preview_div != null || is_loading_obj && preview_loading != null){
				//do nothing
			}
			else if( ! is_loading_obj && ! mouse_lock && preview_loading != null
			|| ! is_preview_obj && ! mouse_lock && preview_div != null){
				destroy_all_preview();
				ret = true;
			}
			mouse_lock = false;
		}
		return ret;
	}

	//yan for preview album
	var album_icon = null;
	var preview_album = null;
	var album_settings = null;
	var album_ctn = null;
	var album_tables = null;
	var albumStyleObj = null;
	var album_display_lock = false;
	var album_source = null;
	var curr_img_src = '';
	var curr_album_source = null;
	var curr_index = -1;
	var album_frame_count = 0;
	var album_frame_timeout = null;
	var album_scroll_lock = false;
	var album_row = 3;
	var album_col = 5;

	var _VIEW_STYLE, _MIN_AREA, _CLICK_DIRECT_VIEW, _ALWAYS_CLICK_DIRECT_VIEW;
	var preload_queue = [];
	var album_background_img = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wAARCAAZABkDAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIBCP/EACMQAAEDAwIHAAAAAAAAAAAAAAABESESMUFi8DJCUnGRoeL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7UjSAjNIAABLRYCql6QC34cga+kDADK3yAV99gMkCebwBWQN36AoD//Z';

	var styleStr = '#ujs_preview_ablum_settings { width: 100% !important; height: 23px !important; background: black !important; text-align: center !important; box-shadow: 0px 0px 10px black !important; position: fixed !important; top: 0px !important; left: 0px !important; z-index: 1 !important; color: white !important; } \n'
	+ '#ujs_preview_ablum_settings * { color: inherit !important; float: none !important; font-size: 12px !important; font-weight: normal !important; } \n'
	+ '#ujs_preview_ablum_settings input { display: inline !important; color: black !important; } \n'
	+ '#ujs_preview_ablum_settings input[type="text"] { background-color: white !important; margin: 0px !important; padding: 0px !important; width: auto !important; height: auto !important; } \n'
	+ '#ujs_preview_ablum_settings select { max-width: 100px !important; border: 0px !important; margin: 0px 0px 0px 10px !important; padding: 0px !important; width: auto !important; height: auto !important; display: inline !important; color: black !important; background-color: white !important; } \n'
	+ '#ujs_preview_ablum_settings input[type="button"] { padding: 2px 5px 2px 5px !important; margin: 0px !important; width: auto !important; height: auto !important; background: #ffffff; border: 1px solid !important; border-color: #eeeeee #999999 #999999 #eeeeee !important; } \n'
	+ '#ujs_preview_ablum_page_count>span { display: inline-block !important; margin-left: 3px !important; cursor: pointer !important; border: 1px solid #555555 !important; width: 35px !important; padding: 2px !important; } \n'
	+ '#ujs_preview_ablum_page_count>.current_page { border: 1px solid white !important; } \n'
	+ '#ujs_preview_ablum_preload_info { margin-left: 10px !important; } \n'
	+ '#ujs_preview_ablum_preload_failed_to_load { color: red !important; margin-left: 10px !important; } \n'
	+ '#ujs_preview_album_tables { padding: 0px !important; margin: 0px !important; position: relative !important; transition: top 0.15s ease !important; -o-transition: top 0.15s ease !important; -webkit-transition: top 0.15s ease !important; -moz-transition: top 0.15s ease !important; } \n '
	+ '#ujs_preview_album_tables table { padding: 0px !important; margin: 0px !important; } \n'
	+ '.ujs_preview_album_table * { background-color: transparent !important; border: none !important; } \n'
	+ '.ujs_preview_album_table td{ vertical-align: middle !important; } \n'
	+ '#ujs_preview_ablum_container { width: 98% !important; height: 100% !important; left: 0.5% !important; top: 25px !important; position: fixed !important; overflow: hidden !important; z-index: 0 !important; } \n'
	+ '#ujs_preview_ablum_close { display: inline-block !important; width: 40px !important; color: white !important; cursor: pointer !important; }';

	function _addStyle(str){
		if(document.doctype && document.doctype.name == "wml"){
			return;
		}
		var styleObj = _createElement('style');
		styleObj.textContent = str;
		$('head').appendChild(styleObj);
		return styleObj;
	}

	function $(str){
		return document.querySelector(str);
	}

	function $$(str){
		return document.querySelectorAll(str);
	}

	function isVisible(obj){
		var display = obj.style.display || window.getComputedStyle(obj, null).display;
		var visibility = obj.style.visibility || window.getComputedStyle(obj, null).visibility;
		if(display.toLowerCase() == 'none' || visibility.toLowerCase() == 'hidden'){
			return false;
		}
		return true;
	}

	function _tag(obj){
		return obj ? obj.nodeName.toLowerCase() : '';
	}

	function _addClassName(obj, name) {
		if(obj.length){
			var i = 0;
			for(i = 0; i < obj.length; i++){
				if(obj[i].className.indexOf(name) == -1){
					obj[i].className += ' ' + name
					obj[i].className = obj[i].className.replace(/^ /, '');
				}
			}
		}
		else{
			if(obj.className.indexOf(name) == -1){
				obj.className += ' ' + name;
				obj.className = obj.className.replace(/^ /, '');
			}
		}
	}

	function _removeClassName(obj, name) {
		if(obj.length){
			var i = 0;
			for(i = 0; i < obj.length; i++){
				if(obj[i].className.indexOf(name) != -1){
					obj[i].className = obj[i].className.replace(name, '').replace(/ {2,}/, ' ');
				}
			}
		}
		else{
			if(obj.className.indexOf(name) != -1){
				obj.className = obj.className.replace(name, '').replace(/ {2,}/, ' ');
			}
		}
	}

	function _createElement(tag, id, classId){
		var obj = document.createElement(tag);
		id && (obj.id = id);
		classId && (obj.className = classId);
		return obj;
	}

	function get_default_filter_size () {
		var w = 0, h = 0;
		for(var i = 0; i < ALBUM_FILTER.length; i++){
			if(ALBUM_FILTER[i][2]){
				w = ALBUM_FILTER[i][0];
				h = ALBUM_FILTER[i][1];
			}
		}
		return {
			width: w,
			height: h
		}
	}

	function create_preview_album_setting_bar () {
		album_settings = _createElement('div', 'ujs_preview_ablum_settings');
		var str_filter = '', str_size = '', default_filter_w = 0, default_filter_h = 0;
		for(var i = 0; i < ALBUM_FILTER.length; i++){
			str_filter += '<option value="' + ALBUM_FILTER[i][0] + 'x' + ALBUM_FILTER[i][1] + '"' + (ALBUM_FILTER[i][2] ? ' selected="selected"' : '') + '>' + ALBUM_FILTER[i][0] + ' x ' + ALBUM_FILTER[i][1] + '</option>\r\n';
			if(ALBUM_FILTER[i][2]){
				default_filter_w = ALBUM_FILTER[i][0];
				default_filter_h = ALBUM_FILTER[i][1];
			}
		}
		for(var i = 0; i < ALBUM_GRID_SIZE.length; i++){
			str_size += '<option value="' + ALBUM_GRID_SIZE[i][0] + 'x' + ALBUM_GRID_SIZE[i][1] + '"' + (ALBUM_GRID_SIZE[i][2] ? ' selected="selected"' : '') + '>' + ALBUM_GRID_SIZE[i][0] + ' x ' + ALBUM_GRID_SIZE[i][1] + '</option>\r\n';
			album_row = ALBUM_GRID_SIZE[i][2] ? ALBUM_GRID_SIZE[i][0] : album_row;
			album_col = ALBUM_GRID_SIZE[i][2] ? ALBUM_GRID_SIZE[i][1] : album_col;
		}
		album_settings.innerHTML =
		'<span id="ujs_preview_ablum_page_count"></span>' +
		'<select id="ujs_preview_ablum_filter_selections">' +
			'<option value="0x0">全部显示</option>' +
			str_filter +
			'<option value="99999x99999">只显示预读</option>' +
		'</select>' +
		'<span style="margin-left: 10px;">' +
			'面积小于 ' +
			'<input id="ujs_preview_ablum_setting_width" type="text" size="5" value="' + default_filter_w + '">' +
			' X ' +
			'<input id="ujs_preview_ablum_setting_height" type="text" size="5" value="' + default_filter_h + '">' +
			' 的被 ' +
			'<input id="ujs_preview_ablum_settings_go" type="button" value="过滤" title="链接着大图的除外">' +
			' 宫格：' +
			'<select id="ujs_preview_ablum_grid_selections">' +
				str_size +
			'</select>' +
		'</span>' +
		'<span id="ujs_preview_ablum_preload_info">' +
			'<span id="ujs_preview_ablum_preload_completed_num"></span>' +
			' / ' +
			'<span id="ujs_preview_ablum_preload_need_to_load_num"></span>' +
			' 已预读' +
			'<span id="ujs_preview_ablum_preload_failed_to_load">（<span class="num"></span> 失败）</span>' +
		'</span>' +
		'<span id="ujs_preview_ablum_close">关闭</span>';
	}

	function preview_setting_go () {
		preview_album_jump_to_page(0);
		curr_album_source = filter_album_source(album_source);
		preview_album_clear_photos();
		preview_album_add_photos(curr_album_source);
		preview_album_start_preload(curr_album_source);
	}

	function preview_setting_filter_select (ev) {
		var index = this.selectedIndex;
		var value = this.options[index].value.split('x');
		var width = value[0], height = value[1];
		$('#ujs_preview_ablum_setting_width').value = width;
		$('#ujs_preview_ablum_setting_height').value = height;
		preview_setting_go();
	}

	function preview_setting_grid_select (ev) {
		var index = this.selectedIndex;
		var value = this.options[index].value.split('x');
		album_row = value[0];
		album_col = value[1];
		preview_setting_go();
	}

	function preview_album_scroll_to (obj, toHere) {
		var to_here = toHere, dir = 'none';
		var last_table_height = 0;
		var last_table = $('#ujs_preview_album_tables>table:last-child');
		var img_count = last_table.getElementsByTagName('img').length;
		var last_table_visible_rows = Math.ceil(img_count / album_col);
		last_table_height = (last_table.offsetHeight / album_row) * last_table_visible_rows;

		var limit_y = -($('#ujs_preview_album_tables').offsetHeight - 2 * last_table.offsetHeight + last_table_height);
		to_here = (to_here < limit_y) ? limit_y : to_here;
		to_here = (to_here > 0) ? 0 : to_here;
		dir = (to_here > parseInt(obj.style.top)) ? 'up' : 'down';
		obj.style.top = to_here + 'px';

		var f = dir == 'up' ? Math.ceil : Math.floor;
		var current_page = f(Math.abs(to_here) / $('#ujs_preview_album_tables>table').offsetHeight);
		if(to_here == limit_y){
			current_page = $$('#ujs_preview_album_tables>table').length - 1;
		}
		var ind = $('#ujs_preview_ablum_page_count>span:nth-child(' + (current_page + 1) + ')');
		if(ind){
			_removeClassName($$('#ujs_preview_ablum_page_count>span'), 'current_page');
			_addClassName(ind, 'current_page');
		}
	}

	function preview_album_scroll_hdlr (ev) {
		if($$('#ujs_preview_album_tables table').length <= 1){
			return;
		}
		var val;
		if(ev.wheelDelta)
			val = ev.wheelDelta/120;
		else if(ev.detail)
			val = -ev.detail/3;
		_StopEvent(ev);
		if(album_scroll_lock){
			return;
		}
		var curr_page_index = parseInt($('#ujs_preview_ablum_page_count>.current_page').textContent);
		var to_page_index = val > 0 ? curr_page_index - 2 : curr_page_index;
		preview_album_jump_to_page(to_page_index);
		album_scroll_lock = true;
		setTimeout(function () { album_scroll_lock = false; }, 150);
	}

	function preview_album_jump_to_page (index) {
		var table = $('#ujs_preview_album_tables>table');
		if(table){
			var toHere = 0 - table.offsetHeight * index;
			preview_album_scroll_to($('#ujs_preview_album_tables'), toHere);
		}
	}

	function preview_album_jump_to_page_by_click (ev){
		var obj = ev.target;
		preview_album_jump_to_page( parseInt(obj.textContent) - 1 );
	}

	function preview_album_table_click_hdlr (ev) {
		curr_index = -1;
		preview_album_hightlight_photo(curr_index, true);
	}

	function regist_preview_album_actions () {
		$('#ujs_preview_ablum_settings_go').addEventListener('click', preview_setting_go, false);
		$('#ujs_preview_album_tables').addEventListener('DOMMouseScroll', preview_album_scroll_hdlr, false);
		$('#ujs_preview_album_tables').addEventListener('mousewheel', preview_album_scroll_hdlr, false);
		$('#ujs_preview_album_tables').addEventListener('click', preview_album_table_click_hdlr, false);
		$('#ujs_preview_ablum_container').addEventListener('dblclick', function(ev) { _StopEvent(ev); preview_album_main(); if(window.getSelection() != '') window.getSelection().removeAllRanges(); }, false);
		if(SHOW_TIPS_ON_STATUSBAR){
			$('#ujs_preview_ablum_container').addEventListener('mousemove', function(e) { window.status = '双击空白处关闭相册 | 空格键（+shift）显示下一张（上一张）图片'; }, false);
		}
		$('#ujs_preview_ablum_filter_selections').addEventListener('change', preview_setting_filter_select, false);
		$('#ujs_preview_ablum_grid_selections').addEventListener('change', preview_setting_grid_select, false);
		$('#ujs_preview_ablum_page_count').addEventListener('click', preview_album_jump_to_page_by_click, false);
		$('#ujs_preview_ablum_close').addEventListener('click', destroy_preview_album, false);
	}

	function create_preview_album () {
		if(preview_album == null){
			MIN_AREA = VIEW_STYLE = 0;
			CLICK_DIRECT_VIEW = true;
			ALWAYS_CLICK_DIRECT_VIEW = true;
			curr_img_src = '';
			reset_recycle_warning();
			preview_album = create_whole_page_div('white', 1);
			preview_album.style.background = 'white url("' + album_background_img + '") repeat';
			create_preview_album_setting_bar();
			album_ctn = _createElement('div', 'ujs_preview_ablum_container');
			album_tables = _createElement('div', 'ujs_preview_album_tables');
			album_tables.style.top = '0px';

			preview_album.appendChild(album_settings);
			album_ctn.appendChild(album_tables);
			preview_album.appendChild(album_ctn);
			document.body.appendChild(preview_album);

			regist_preview_album_actions();
		}
	}

	function destroy_preview_album () {
		VIEW_STYLE = _VIEW_STYLE;
		MIN_AREA = _MIN_AREA;
		CLICK_DIRECT_VIEW = _CLICK_DIRECT_VIEW;
		ALWAYS_CLICK_DIRECT_VIEW = _ALWAYS_CLICK_DIRECT_VIEW;
		preview_album.parentNode.removeChild(preview_album);
		if(curr_img_src != ''){
			find_and_focus_image(curr_img_src);
			curr_img_src = '';
		}
		preview_album = album_settings = album_ctn = album_tables = null;
		albumStyleObj && albumStyleObj.parentNode.removeChild(albumStyleObj);
		albumStyleObj = null;
		clean_preview_album_preload_callback();
	}

	function preview_album_page_count_add_one () {
		var pages = $('#ujs_preview_ablum_page_count');
		var index = pages.hasChildNodes() ? $$('#ujs_preview_ablum_page_count>span').length + 1 : 1;
		var page = _createElement('span');
		page.textContent = index + '';
		pages.appendChild(page);
	}

	function preview_album_add_photos (source) {
		if(album_tables != null) {
			var tables = 0, i = 0, j = 0, k = 0, count = 0;
			var imgs = source;
			curr_index = 0;
			tables = Math.ceil(imgs.length / (album_col * album_row));
			tableArr = [];
			count = 0;
			var container_w = $('#ujs_preview_ablum_container').offsetWidth;
			var container_h = $('#ujs_preview_ablum_container').offsetHeight;
			var setting_h = $('#ujs_preview_ablum_settings').offsetHeight;
			for(i = 0; i < tables; i++){
				var table = _createElement('table', null, 'ujs_preview_album_table');
				for(j = 0; j < album_row; j++){
					var tr = _createElement('tr');
					tr.setAttribute('align', 'center');
					tr.setAttribute('height', (container_h - setting_h) / album_row - 1);
					for(k = 0; k < album_col; k++){
						var td = _createElement('td');
						td.setAttribute('align', 'center');
						td.setAttribute('width', container_w / album_col);
						if(count < imgs.length){
							var a = _createElement('a', null, 'ujs_preview_album_links');
							a.href = imgs[count].href;
							var img = _createElement('img', null, 'ujs_preview_album_imgs');
							img.src = imgs[count++].src;
							a.appendChild(img);
							td.appendChild(a);
						}
						tr.appendChild(td);
					}
					table.appendChild(tr);
				}
				album_tables.appendChild(table);
				tableArr.push(table);
				if(tables > 1){
					preview_album_page_count_add_one();
					_addClassName($('#ujs_preview_ablum_page_count>span:first-child'), 'current_page');
				}
			}

			albumStyleObj && albumStyleObj.parentNode.removeChild(albumStyleObj);
			var imgStyleStr = '.ujs_preview_album_imgs { max-width: ' + (container_w / album_col - 25) + 'px !important; max-height: ' + ((container_h - setting_h) / album_row - 25) + 'px !important; padding: 5px !important; background-color: white !important; box-shadow: 0px 0px 10px gray !important;} \n' +
			'.ujs_preview_album_imgs.loading { background-color: #409200 !important; } \n' +
			'.ujs_preview_album_imgs.failed { background-color: #930E0E !important; }' +
			'.ujs_preview_album_imgs.current { background-color: #0070B0 !important; }';
			albumStyleObj = _addStyle(imgStyleStr);
		}
	}

	function preview_album_preload_info_num_increase (span) {
		var num = parseInt(span.textContent);
		span.textContent = (++num) + '';
	}

	function preview_album_find_images_by_href (href) {
		return $('a[class="ujs_preview_album_links"][href="' + href + '"]>img');
	}

	function preview_album_preload_complete_callback (obj, success) {
		preview_album_preload_info_num_increase($('#ujs_preview_ablum_preload_completed_num'));
		preview_album_preload_next();
		var img = preview_album_find_images_by_href(obj.src);
		_removeClassName(img, 'loading');
		if( success == 'error' ){
			preview_album_preload_info_num_increase($('#ujs_preview_ablum_preload_failed_to_load .num'));
			_addClassName(img, 'failed');
			var a = $('a[class="ujs_preview_album_links"][href="' + obj.src + '"]');
			a.href = a.getElementsByTagName('img')[0].src;
			var i = preview_album_current_source_find_index_by_link(obj.src);
			curr_album_source[i].href = curr_album_source[i].src;
		}
		else if(img.src == '') {// imgur.com 上因滚动加载图片的功能而造成album无法显示图片的问题
			img.src = obj.src;
		}
	}

	var loading_image = [];

	function preview_album_preload_next() {
		if(preload_queue.length > 0){
			var source = preload_queue.shift();
			var image = new Image();
			image.src = source.href;
			setTimeout(function (){ //使用 timer 避免页面卡顿
				if(image.complete){
					preview_album_preload_complete_callback(image, 'load');
					image = null;
				}
				else{
					var _src = image.src;
					//重新赋值以再次加载，避免图片加载失败时UI更新不过来的问题
					if(image.width == 0 && image.height == 0){
						image.src = '';
						image.src = _src;
					}
					image.onerror = image.onload = function (e){
						preview_album_preload_complete_callback(image, e.type);
						image = null;
					};
					loading_image.push(image);
				}
			}, 0);
		}
	}

	function preview_album_start_preload (source) {
		var i = 0, count = 0;
		preload_queue = [];
		$('#ujs_preview_ablum_preload_completed_num').textContent = '0';
		for(i = 0; i < source.length; i++){
			if(source[i].src != source[i].href){
				preload_queue.push(source[i]);
				count++;
				_addClassName(preview_album_find_images_by_href(source[i].href), 'loading');
			}
		}
		$('#ujs_preview_ablum_preload_need_to_load_num').textContent = count + '';
		$('#ujs_preview_ablum_preload_failed_to_load .num').textContent = '0';
		var thread = (PRELOAD_THREAD_NUM < 0) ? count : PRELOAD_THREAD_NUM;
		for(i = 0; i < thread; i++){
			preview_album_preload_next();
		}
	}

	function clean_preview_album_preload_callback(){
		for(var i = 0; i < loading_image.length; i++){
			loading_image[i].onload = null;
			loading_image[i].onerror = null;
			loading_image[i] = null;
		}
		loading_image = [];
	}

	function preview_album_clear_photos () {
		clean_preview_album_preload_callback();
		if(album_tables != null) {
			var tables = $$('#ujs_preview_album_tables table');
			if(tables && tables.length > 0){
				for(var i = 0; i < tables.length; i++){
					tables[i].parentNode.removeChild(tables[i]);
				}
			}
		}
		var pages = $$('#ujs_preview_ablum_page_count>span');
		for(var i = 0; i < pages.length; i++){
			pages[i].parentNode.removeChild(pages[i]);
		}
	}

	function filter_album_source (sourceFrom) {
		var width = get_default_filter_size().width;
		var height = get_default_filter_size().height;
		var source = null;
		if(preview_album != null){
			width = parseInt($('#ujs_preview_ablum_setting_width').value);
			height = parseInt($('#ujs_preview_ablum_setting_height').value);
		}
		if( ! isNaN(width) && ! isNaN(height) ){
			var i = 0;
			source = [];
			for(i = 0; i < sourceFrom.length; i++){
				if( sourceFrom[i].width * sourceFrom[i].height >= width * height || sourceFrom[i].src != sourceFrom[i].href ){
					source.push(sourceFrom[i]);
				}
			}
		}
		return source;
	}

	function generate_album_source (sourceFrom) {
		var source = [], i = 0, j = 0, exist = false;

		for(i = 0; i < sourceFrom.length; i++){
			var _src, _href;
			var _width = sourceFrom[i].naturalWidth;
			var _height = sourceFrom[i].naturalHeight;
			var obj = sourceFrom[i];

			_src = _href = obj.src;
			if(check_img_src_reg(obj) != ''){
				_href = check_img_src_reg(obj);
			}
			else{
				while(_tag(obj) != 'a' && obj.parentNode)
					obj = obj.parentNode;
				if(_tag(obj) == 'a'){
					if(check_img_link(obj.href)){
						_href = obj.href;
					}
				}
			}

			exist = false;
			for(j = 0; j < source.length; j++){
				if(source[j].href == _href){
					exist = true;
					break;
				}
			}
			if( ! exist ){
				source.push( { src : _src, width : _width, height : _height, href : _href } );
			}
		}
		return source;
	}

	function preview_album_current_source_find_index_by_link (link) {
		var i = 0;
		for(; i < curr_album_source.length; i++){
			if(curr_album_source[i].href == link){
				return i;
			}
		}
		return 0;
	}

	function focus_image(img) {
		if(isVisible(img) == false){
			return;
		}
		if(_tag(img.parentNode) == 'a' && !isOpera){
			img.parentNode.focus();
		}
		else{
			var a = _createElement('a');
			a.href = '';
			a.innerHTML = isOpera ? '' : '.'; //Opera中有内容则定位不准，Chrome中无内容则定位不上 = =
			img.parentNode.insertBefore(a, img);
			a.focus();
			a.parentNode.removeChild(a);
		}
	}

	function find_image(src) { //first one
		//不用 img[src=xxx] 查询，避免 src 为相对路径时找不到 img object
		var imgs = document.images;
		for(var i = 0; i < imgs.length; i++){
			if(imgs[i].src == src){
				return imgs[i];
			}
		}
		return null;
	}

	function find_and_focus_image(src) {
		if(TRACE_IMAGE_IN_PAGE == 0
		|| (TRACE_IMAGE_IN_PAGE == 1 && preview_album != null)
		|| (TRACE_IMAGE_IN_PAGE == 2 && preview_album == null)
		){
			return;
		}
		var img = find_image(src);
		if(img != null){
			focus_image(img);
		}
		else if(window.frames.length > 0){
			var f = window.frames;
			for(var i = 0; i < f.length; i++){
				var message = {data: src, msg: 'MSG_ID_FIND_AND_FOCUS_IMAGE'};
				f[i].postMessage(json.stringify(message), '*');
			}
		}
	}

	function preview_album_hightlight_photo (index, fromClick) {
		var curr_img = $('.ujs_preview_album_imgs.current');
		if(curr_img){
			_removeClassName(curr_img, 'current');
		}
		if(index != -1){
			var imgs = $$('#ujs_preview_album_tables img');
			if(index < imgs.length){
				_addClassName(imgs[index], 'current');
				var page_index = Math.floor(index / (album_row * album_col));
				if( ! fromClick ){
					preview_album_jump_to_page(page_index);
				}
			}
		}
	}

	function preview_album_show_coming_photo (index) {
		var link = curr_album_source[index].href;
		destroy_all_preview(true);
		if(preview_album == null){
			find_and_focus_image(curr_album_source[index].src);
		}
		else{
			curr_img_src = curr_album_source[index].src;
		}
		setTimeout(function(){
			create_preview(0, 0, link, true);
			preview_album_hightlight_photo(index, false);
		}, 0);
	}

	var recycle_warning_flag = false;
	var recycle_warning = 0;
	var recycle_warning_timer = null;

	function reset_recycle_warning(){
		if(recycle_warning_timer){
			clearTimeout(recycle_warning_timer);
			recycle_warning_timer = null;
		}
		recycle_warning_flag = false;
		recycle_warning = 0;
	}

	function preview_change_div_color(){
		if(preview_div != null){
			preview_div.style.outline = (recycle_warning % 2 == 0) ? '#AA0000 solid ' + PREVIEW_DIV_PADDING + 'px' : 'none';
		}
		recycle_warning++;
		if(recycle_warning < 4){
			recycle_warning_timer = setTimeout(preview_change_div_color, 150);
		}
		else{
			recycle_warning_timer = null;
			recycle_warning = 0;
		}
	}

	function preview_album_play_coming_photo(dir){
		if((preview_div != null || preview_album != null) && VIEW_STYLE == 0){
			var needCreate = (preview_div == null);
			curr_index = (preview_div != null) ? preview_album_current_source_find_index_by_link(preview_img.src) : ((curr_index == -1) ? 0 : curr_index);
			var recycle_condition = (dir == 1) ? curr_index >= curr_album_source.length - 1 : curr_index <= 0;
			if( !needCreate && ((recycle_condition && recycle_warning_flag == false) || curr_album_source.length == 1) ){
				if(recycle_warning_timer == null){
					preview_change_div_color();
				}
				recycle_warning_flag = true;
				return true;
			}
			recycle_warning_flag = false;
			curr_index = (preview_div != null) ? (recycle_condition ? ((dir == 1) ? 0 : curr_album_source.length - 1) : curr_index + dir) : curr_index;
			preview_album_show_coming_photo(curr_index);
			return true;
		}
		return false;
	}

	function preview_album_play_next(){
		return preview_album_play_coming_photo(1);
	}

	function preview_album_play_previous(){
		return preview_album_play_coming_photo(-1);
	}

	function preview_album_main_ind (source){
		curr_album_source = [];
		curr_album_source = filter_album_source(source);
		if(album_display_lock){
			album_display_lock = false;
			return;
		}
		destroy_album_icon();
		create_preview_album();
		preview_album_add_photos(curr_album_source);
		preview_album_start_preload(curr_album_source);
	}

	function preview_album_main(){
		destroy_all_preview();
		if(preview_album == null){
			if(window.top == window){
				album_frame_count = $$('iframe[src]').length;
				album_source = [];
				album_source = generate_album_source(document.images);
				if(album_frame_count == 0){
					preview_album_main_ind(album_source);
				}
				else{
					album_frame_count = window.frames.length;
					for(var i = 0; i < window.frames.length; i++){
						window.frames[i].postMessage('MSG_ID_SUBMIT_IMAGE_DATA_REQ', '*');
					}
					if(album_frame_timeout != null){
						clearTimeout(album_frame_timeout);
					}
					//此处 timer 防止 iframe 都被 urlfilter 过滤，造成 message 无法响应而显示不出界面的情况
					album_frame_timeout = setTimeout(function () {
						album_frame_count = -1;
						preview_album_main_ind(album_source);
						album_frame_timeout = null;
					}, 150);
				}
			}
			else{
				_Message('MSG_ID_CREATE_PREVIEW_ALBUM');
			}
		}
		else{
			destroy_preview_album();
		}
	}

	function key_handler (ev) {
		if(ev.keyCode == 27 /* ESC */){
			var ret = false;
			if(PRESS_ESC_TO_CLOSE && (preview_div != null || preview_exist_in_top)){
				destroy_all_preview();
				_StopEvent(ev);
				ret = true;
			}
			if(preview_album != null && ! ret){
				destroy_preview_album();
				_StopEvent(ev);
			}
		}
		else if(ev.keyCode == 32 /* SPACE KEY */ && (preview_album != null || preview_div != null || preview_exist_in_top)){
			if(_tag(ev.target) == 'input' || _tag(ev.target) == 'textarea'){
				return;
			}
			_StopEvent(ev);

			ev.shiftKey ? preview_album_play_previous() : preview_album_play_next();
		}
	}

	function destroy_album_icon(){
		if(album_icon != null){
			album_icon.parentNode.removeChild(album_icon);
			album_icon = null;
		}
	}

	//特例网站设置
	function run_site_setting (){
		var i;
		for(i = 0; i < SITE_STYLE_INFO.length; i++){
			if(SITE_STYLE_INFO[i][0].test(window.location.href)){
				eval(SITE_STYLE_INFO[i][1]);
			}
		}
	}

	function check_current_page() {
		var spec_ele = null;
		var ret = 'NORMAL_PAGE';
		if(window.opera){
			spec_ele = document.selectSingleNode('//head/link[@href="opera:style/image.css"]');
			if(spec_ele != null)
				ret = 'IMG_PAGE';
		}
		/*firefox及chrome单独打开一张图片时不执行脚本，免去判断*/
		return ret;
	}

	function onMessage(ev){
		var message = ev.data;
		if(window == window.top){
			if(message.indexOf('MSG_ID_ORIGINAL_SIZE_IMAGE_CREATE') != -1){
				var temp = message.split('+|+|+');
				var x = parseInt(temp[0]), y = parseInt(temp[1]), link = temp[2], delay = parseInt(temp[3]);
				setTimeout(function(){create_preview(x, y, link);}, delay);
			}
			else if(message.indexOf('MSG_ID_ORIGINAL_SIZE_IMAGE_DESTROY_PREVIEW') != -1){
				destroy_preview();
			}
			else if(message.indexOf('MSG_ID_ORIGINAL_SIZE_IMAGE_DESTROY_LOADING') != -1){
				destroy_preview_loading();
			}
			else if(message.indexOf('MSG_ID_CREATE_PREVIEW_ALBUM') != -1){
				preview_album_main();
			}
			else{
				try{
					var obj = json.parse(message);
					var msg = obj.msg;
					var source = obj.data;
					if(msg == 'MSG_ID_SUBMIT_IMAGE_DATA_RSP'){
						if(album_frame_count > 0){
							for(var i = 0; i < source.length; i++){
								album_source.push(source[i]);
							}
							album_frame_count --;
						}
						if(album_frame_count == 0){
							if(album_frame_timeout != null){
								clearTimeout(album_frame_timeout);
							}
							preview_album_main_ind(album_source);
						}
					}
				}
				catch(e){
				}
			}
		}
		else{
			if(message.indexOf('MSG_ID_SUBMIT_IMAGE_DATA_REQ') != -1){
				var source = generate_album_source(document.images);
				var message = {data: source, msg: 'MSG_ID_SUBMIT_IMAGE_DATA_RSP'};
				_Message(json.stringify(message));
			}
			else{
				try{
					var obj = json.parse(message);
					if(obj.msg == 'MSG_ID_FIND_AND_FOCUS_IMAGE'){
						find_and_focus_image(obj.data);
					}
				}
				catch(e){
				}
			}
		}
	}

	function main_function () {
		if(check_current_page() == 'IMG_PAGE')
			return false;
		_addStyle(styleStr);
		run_site_setting();
		_VIEW_STYLE = VIEW_STYLE;
		_MIN_AREA = MIN_AREA;
		_CLICK_DIRECT_VIEW = CLICK_DIRECT_VIEW;
		_ALWAYS_CLICK_DIRECT_VIEW = ALWAYS_CLICK_DIRECT_VIEW;
		if(VIEW_STYLE == 1)
			window.addEventListener('mousemove', checkImage, true);
		else
			window.addEventListener('mouseover', checkImage, true);
		if(CLICK_BLANK_TO_CLOSE){
			window.addEventListener('click', closePreviewByClick, false);
		}
		if(typeof window.onkeydown != 'undefined')
			window.addEventListener('keydown', key_handler, true);
		else
			window.addEventListener('keypress', key_handler, true);
		window.addEventListener('message', onMessage, false);
		window.addEventListener('resize', function(e){
			if(preview_album != null){
				destroy_preview_album();
			}
			viewWidth = window.opera ? window.innerWidth / (OP_PAGE_PERCENTAGE / 100) : window.innerWidth;
			viewHeight = window.opera ? window.innerHeight / (OP_PAGE_PERCENTAGE / 100) : window.innerHeight;
		}, false);
		window.ujs_original_size_image = {
			album_main : preview_album_main,
			album_play_next : preview_album_play_next,
			album_play_previous : preview_album_play_previous,
		};
		isOpera = !!window.opera;
	}
	main_function();
})(window.JSON);