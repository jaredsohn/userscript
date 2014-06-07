// ==UserScript==
// @author yansyrs
// @name PopupFlash
// @namespace http://opera.im/archives/pop-up-flash/
// @description 鼠标悬停在 flash 视频上会出现一个按钮，点击后可放大浮动在页面上。
// @version v1.1.6
// @date 2013-10-18
// @include *
// ==/UserScript==

(function(storage){
/* -------------------------------------------- 设置开始 ------------------------------------------*/
	// 悬停在视频上的按钮尺寸，单位为像素
	var POPUP_ICON_SIZE = 26;
	
	// 无保存值时，浮动的 FLASH 的默认尺寸，默认长和宽为浏览器页面大小的 70%
	var POPUP_FLASH_SIZE = 70;
	
	// 浮动 FLASH 的最小宽度，单位为像素
	var POPUP_FLASH_MIN_WIDTH = 640;
	
	// 浮动 FLASH 的最小高度，单位为像素
	var POPUP_FLASH_MIN_HEIGHT = 480;
	
	// 出现在菜单上的尺寸列表，name 是列表项文字，width 是宽度，height 是高度。单位是像素。
	// 注：width 与 height 任意一值超过可视页面的宽/高时，则该菜单不显示
	var POPUP_FLASH_SIZE_LIST =
	[
		{name: '初始默认值', width: 0, height: 0}, // 此项为第一位且不删除
		{name: '800 x 600', width: 800, height: 600},
		{name: '854 x 480 [宽]', width: 854, height: 480},
		{name: '1024 x 768', width: 1024, height: 768},
		{name: '1280 x 720 [宽]', width: 1280, height: 720},
	];
	
	// 黑色背景的不透明度，0 为全透，1 为不透
	var BACKGROUND_OPACITY = 0.8;
	
	// 拖拽边缘调整尺寸时，在何处显示尺寸大小
	// 可选值：title、statusbar、both、disable（分别代表“标题栏”、“状态栏”、“标题栏和状态栏”以及“不显示”）
	// 注：Opera 的 JavaScript 选项中必须勾选“允许更改状态域”才能使状态栏的修改生效。
	var SHOW_RESIZE_INFO = 'both';
	
	// 点击背景关闭浮动的 FLASH，可选值："NONE_CLICK"、"CLICK"、"DOUBLE_CLICK"
	var CLICK_BLANK_TO_CLOSE = 'CLICK';
	
	// 白名单列表，判断时优先级最高，只要出现该关键字就认为是视频
	// 可设置多个，用逗号分隔，使用小写
	// 规则：如果 flash 代码的 id、class、name、src、data、flashvars 任一属性中出现下列关键词，则认为是视频
	var WHITE_LIST_KEYWORD_IMPORTANT = ['ytimg'];
	
	// 白名单列表，优先级最低，如果在黑名单中已经排除，那么即使在白名单内也有相关关键字，也不会认为是视频
	var WHITE_LIST_KEYWORD = ['player', 'video', 'tudou.com', 'viddler', 'youtube'];
	
	// 黑名单列表，可设置多个，用逗号分割，使用小写
	// 如果 flash 代码的 id、class、name、src、data、flashvars 任一属性中出现下列关键词，则认为不是视频
	// 注：可将没有通用关键词的网站域名列入关键词内，如 xiami.com。同一个关键词在黑白名单都出现时，优先黑名单。
	var BLACK_LIST_KEYWORD = ['mp3', 'music', 'xiami.com', 'adplayer'];
	
	// 尺寸过滤，如果宽与高都小于下面的值，则认为不是视频。单位为像素。
	var FLASH_SIZE_FILTER = {width: 320, height: 240};
	
	// 拖动窗口时，该值越大，占用 CPU 越小，但同时也越不平滑。
	var PLAYER_MOUSE_MOVE_FILTER = 2;
/* -------------------------------------------- 设置结束 ------------------------------------------*/
	
	var picData = {
		popup_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4Nzc3NkEyMDIyMTExRTE5RTVDRDgxNTI5RTA2M0M0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4Nzc3NkEzMDIyMTExRTE5RTVDRDgxNTI5RTA2M0M0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDg3Nzc2QTAwMjIxMTFFMTlFNUNEODE1MjlFMDYzQzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg3Nzc2QTEwMjIxMTFFMTlFNUNEODE1MjlFMDYzQzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ATvzGAAABF0lEQVR42tSUTQqDMBCFTS3ewAN4S0EQBEEQBEEICILXcOOV3Loq7cOBNExMNWkL7awm8zJfJpOfIPhpi+P4K6h5nu9ehkQFEcqD4F2XEIKHaClzap7nJMExVVvWvqBYNqIDjrF2iSzrYmtHGIZJkphxBCEdt1Nfp6qquq6RNo6jXhqGCELChLObLYqCfEYkVtd1NMS0YxzrlyISq+97XVULW3GmNU0DUBRFbOO6Kcj1sKcA3TZb19XhZrP6yaSUkORm5OhqmqYORzEMA4Zt2zK0Yp29xiCiU3DQOL0cHCsRieX2KnC5zK6jWJ9XQQ/DDC7L4nAULFiWpV5almVv/Sg6UfXrRdaHv89n76Zp8mN5J/67PQQYAAbsFlu8mAWNAAAAAElFTkSuQmCC',
		
		popup_icon_reload: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE1OUY3MzNGMEI4QTExRTFCODQ1RkUzRjgzRjJCNzRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE1OUY3MzQwMEI4QTExRTFCODQ1RkUzRjgzRjJCNzRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTU5RjczM0QwQjhBMTFFMUI4NDVGRTNGODNGMkI3NEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTU5RjczM0UwQjhBMTFFMUI4NDVGRTNGODNGMkI3NEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gn/ifAAABOklEQVR42tSUQYqEMBBF49i47ZUH8BZ9G68hCIIgCIIgCIIg2Mdw45Wkd66GzG+LCTWJth3tzRSiSZX1rPxKFOLjdhPiLsRjud9OsnzfB0X+XvdzqOfjwXDyepWWNo7jHyqvToahtLcV7Z51haGpXZIklIOBucAV3IuAYm0RLXAaa5WoZX1ttcl13SAITD+cCO23mX8nz/OiKJDW9z0vDVM4EcIL7y42TVMaa0Ri1XVNU7y2j9P0UkRitW3Lo+rDmzjTyrIEyPM8beGr++6yqylA34vN82xx4rT6yZqmQahZjAY8GkWRRSu6rsO0qioNrVjvbmMQoRQGEI6Xg7YSkVh2pwKby1QdxR45FXQwTOc0TRat0JxZlvHS4jg+9UfhRKXXiyyHBw7/1h3H0bUbhuEY63Dif7cfAQYAG/lNJ9LDJZEAAAAASUVORK5CYII=',
		
		option: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MDQxMERFRkZEOTExRTA5NkI2RkJBQ0I1NkMwOEY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5MDQxMERGRkZEOTExRTA5NkI2RkJBQ0I1NkMwOEY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODkwNDEwRENGRkQ5MTFFMDk2QjZGQkFDQjU2QzA4RjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODkwNDEwRERGRkQ5MTFFMDk2QjZGQkFDQjU2QzA4RjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oax7AAAAGW0lEQVR42qxXeWwUVRj/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',
		
		close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCNTczMEM3RkQ0QjExRTA4M0U3QUNBRTYwODI2Q0Y0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCNTczMEM4RkQ0QjExRTA4M0U3QUNBRTYwODI2Q0Y0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI1NzMwQzVGRDRCMTFFMDgzRTdBQ0FFNjA4MjZDRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI1NzMwQzZGRDRCMTFFMDgzRTdBQ0FFNjA4MjZDRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47qcxnAAAFR0lEQVR42sRXfUxWVRh/7ouD+EoC3mwIyodGFCHYCwSSYpKgsuV/NVY5qenIBAbCgtnaKiSm/sP6p3KLNYmcLP4SDdJCbbWYtPiULzHicway+LBW7z39nnvfF++9vFdepa2z/e6555zn43ee55xzz5WEECRJErlT9mRlWSEbK1kscaht6AoFrI7hQWAE9n4SstyLuv3chQsLy9mU3CGwOzPzIcgcgONs1PHoCgQsJuL/AOOw+yOINMh2+5nzzc3igQhkZWR4WSyWl+H4bTSjVTGdrFFRaF9hmtstsmw/cb6pufG+CGTu2OED50WSRSpGc7XDl3u50hFSOI3LslwuZHH664sX7csSeGH7dquHh8fnzEMz6/t1riOBxzxcHReyvaLp0rd2UwIZ6dt8EPJ3LZJUskLHLlIjQEIUIho133zXopBY5SIrhUjeYRnE3N4eyxfJsSh8UVfA8jTqhiUReP65tDDMvg3dQY55qyEw4cG6Oi/LyykrE4W3avqlK1f/XNxK6VtSvSBYioEgIWRCLQHkhJenJ+3cmUlFxUcoLi5O6VOWuWPc+c5jLMOyrKO1odhU5ZJQH9ClAB3RvASEIfT8yspZu3bTvtxc8vf3p03x8XS0vIxuDg3pZhkREUHFJaUUsnYtpW3dSt4+3vRV/VklkJooOBvZ21JT6iwaA7vgKFpoZuVESEgIHcrPV5xzYQcfHKskW2Liogy/v48+HuPCsocO55M1OHiJPYePzagTFAJpSYkc7nQZoccKlQDSYnZ2lmZmZnR5ZUeFRcUUHh6ugN+dzp2FdWZn58hoz4FAToWSky2JNkRamkK0AzjoSxeWoJgnY6mkrIw2bNxocHJbqQMCHtH1D/T30/EPK6mnq9OYAu3WbLKo4ZdDwWa1K6Z2u12puzs7qOpYBd2entZZYcdG5yxTVVmh6GhtuECUSkAW/mr4heRaUJAddVdHO5UWFVJ/X5/phucxlulqb4djVdfE+V0CjtybgmfgnEVXZyed/bLOlACPsYxRzwyOCMh2RGHpatXAuc9tScn02v5cUwI8ZktMXnJOmOAPNQKyPOJgJFyx5AUEjhQeEUmlZeUUGhZmSoDHSsvLFVnWUXVNIzDiXAML8DxgPnM7Jaek0snq6iXOfxseVmAkwbKsw7r3iETr4rcg/olo/vy+Yrxo8Jifnx/V1tdT2Lr1OkfTU1NUnP+W8n6y+iMKDArSjQ8O9NP+nByam5szbkNno0BzEsoNwLzyHTDAz9+Pgq2P6oz3Xu+hgjcP0s/XrikoyDuo9BkPKx9fH3JlE+gDLt8lIMttyEkX582IibExqjn1Cd25s7A48/feOUodv7QvhrMD2477eIwLy9ac+pTGR0eN9oRay61Ar+5zHBsVsQ9UPtOmQfkYIWC4IVH23r2U8IyNztSexgnXpUhI2pji8fSmOHop51X6/uplampsVLah7qqoNuag+Wzn4FC3jsBTkeE+aDdDJsUVCdOLjukdVT3YdfcBtffj7qFf81xeyWLC1yUgN1/wLdjU6oquZXROkix5PTeHR1wTWB/mgb49QB02j/d/REKoRqRJ+Mq8PjzSvuy1/PHQkBcRiSp+XQEJocnFFRA40jcy1qoVWHUPXf6RuIVDqhr1ZqFfBZK7juH0bzyaoFDYNzo+eN+/ZhtC1jwMmdexd95AMwrwdO/PiOaBNlxyT8B+08DY5F8P/G/IJfIxayyCkAJ5Pi0TAF8DCadzvjC0wGYtDP9wY+LWxIp/TnVE1lglpMMLZGLQ5A+Dl2bGg7DVd2Pyd+H2D4MQgv7P8q8AAwDJYk66CQZGEAAAAABJRU5ErkJggg==',
		
		pin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAADdcAAA3XAHLx6S5AAADUElEQVQ4y22TX2xTZRjGn+87f9q1XQst7RgMS103kAkZATfAZMkg884LLryTC0NITEgMAyPekJgYbzYlhpsZs8wLY+KdWZiJIkIE/+AESdlxdIubs+tgrj1rt3Ztzznf971eaGRGn5s3T/L83rwX78Pwf9rxKsBNoLwBuC5v6j8UlzrKnDHHETonMPVXkMA2c74DryCUPoz2rkOwiyvcMHRVLq+/UypVLziuM8cY3mv645sxN3GMCaONgsbqvxfsfysLXdexs5lgMldri3A5OTX/MfeHX/7+3m8eRNkA50MgeRFgDNdeI4bjlwEiNHEgkdyD33+dQSwR4fb0DRVPdSWV2/i6f+CF9kLdFLcnM1DC1TXDPAbgB1KKa0gOANUyxEYFFa6zdM9x+JJHaOszJ5qjWyJXw7HE/txiXgnhcu4PkyRwkvI6Y8zimsY1tB0FpA2EO0HrRVTsxW3Fm18E9vZ2j7a37x4IxXeLuuDs0ew9vraUvaWCrWflhn1NKfIIjHQjnoaSSUZEhGDLec3nezt98og43BEPSWaozHxBq1VKjJRwdLd8XuVu3jf9zRxchxPZA90bn8Ab42NULFfw2edfvdRzoDPw9FM75Y5YALenC7z4OCdLOUurlZZHGDfvI5oyqoh6jGpgUoAdvfglAPBa3VXrtfqFF/u63w0Gg+KXZU+fX1pVxbmf+VreetSwc91ULRV4pAXKcxCK70L1uyvQ53KPsVIoKVwfBLD9/buJT57fm06dNBi8+rrNKnaeq6aEMvpOCdIDwOosuHDg5W4AANhPdzPI2zXU63VNeQ0Zjza//umkPWxVtnmO0o3i6pqqVsq8ulbqJdCkpmkcYEpcPQMA0FsSUaRSu3gsulVKhZ47394afhZTVz66s308FPNdImgHPbdhKbcxDSJI06cY155834MHFogIufxyYDabffjByIgFwA8AvckOhoNvRvDcJRMnPgTa+v9TG7a4sKD5/H5ZWClczs5kB8cnJrolUSbW18d/PH1aVTLAkgW4jSeQIsA583cLiAjDQ0PhsdHRhcFz584SEVpbWyMAggALwAgFoPn8AEwABgANAP/nAgBa1759nZzzjinLmjEMY4vneQKABCAAeADcTdPd5MWfasiPakYf8C4AAAAielRYdFNvZnR3YXJlAAB42isvL9fLzMsuTk4sSNXLL0oHADbYBlgQU8pcAAAAAElFTkSuQmCC',
		
		save: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFSSURBVHjapFPNaoNAEJ7UaIqlIgEveYkGvPSod5/Bq9DnKUWPfYGevBvwUtCD5wY8ek2kVuL6V2fDCmtKsGRgdoeZb76Z2Z9F3/dwiyxxcRwnEATBeHbe4EECeBwU9/vlGXRqAH4IwDc575/eC7Rtu/M8z6SQrusMXdfBfppX9bTdQhRFxthB0zTICFU7jwCxmDMSMEdJ5hGwgiNBXddUy3oeAcOj3DFGdOz3X3SMa4oYxHIjoIMQAh/vr1BV1dXqq9UKNE0bO+BGUFX13yNwHaBYlgWbzebPxCzLwPf9kYS7RnqIZUm7sG2bBl3X5Qgwluc5yLJ8eQaoh8MBjscjKIpCg2hPBTGiKPIdsHeACVhhvV7TINpTQQzGuXcwJJtxHAeSJNExWAdoT6UoisuXOPyF3bCZgwZhGFICnDNNUwrCq0UyRpgkCcuBxa3f+VeAAQBc2vzIX8mG5AAAAABJRU5ErkJggg==',
		
		player_bg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMkMzNDg5NUZGMjMxMUUwQTYzMkMwNTUwQzA1ODBBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMkMzNDg5NkZGMjMxMUUwQTYzMkMwNTUwQzA1ODBBMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyQzM0ODkzRkYyMzExRTBBNjMyQzA1NTBDMDU4MEEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyQzM0ODk0RkYyMzExRTBBNjMyQzA1NTBDMDU4MEEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQACAYGBgYGCAYGCAwIBwgMDgoICAoO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',
		
		loading: 'data:image/gif;base64,R0lGODlh3AATAMMNAJycnM/Pz+fn57y8vNnZ2fPz86qqqsfHx6amptXV1e7u7sLCwuDg4Pj4+LGxsQAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAPACwAAAAA3AATAAAE//DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM/0MyBAru987//AoHBILBqPyKRyiBh0BgOHFEpFGKRYaXPB7d6uWe2gSwaHHVsy13pGj9ULczitlmfp5bYbHtfju2xnf2t2YnyFYlSKHE0OAwcBAQkJiooLUJMJBJsEC45eXJicnJ5voZcDmqOdn2RUqqOeoKEDq5uys6KrpXBjtqyzqL+4oFDDDr3GtrzFqZsBkAQIHADImgwCAgSPkN0HBwPZ4tnb397f4ePZDKbn6erbXd/Q4Orr3PPm7+Ps8vn74vpxMYfOngB257oBJNeO4EJt+PLVs4cw4SV12AIAoOZsHBdJIP8n1SpAsqSCj5kyjTRJEmVKSgRYtoz2cmUBBSVdprR5s+UCSTVjluypU6VQlgto7jxqsqhIpjgLJA1AIOjQnD9fwrx6c8HGDQAOEBBQstOkqpoSQGrAtm0Ds2czrXXLFi7aSXPpwo2rNgDdugsy3c3rdm/avn/fBk5ZlXBbw2kdA9ZKQLJiypYh4/X7t9NXDWEZ4GxwUqumBSXdluYrMnXb1axR/4X9UjZd2HcT2Fa9WPCk3a971ywwW3hK4Gxpx0VOundu1CR5M84EnXjwBJ8zhB6tVPACBom7Uwf/V/xvptbN6yYQ3vwC9uXdk6er/v1VtvNy657v9hvr9fc1UB//fPQd4Ntv/LUVTXYYbFeAZoj9xYBxmyU2oWmWXahVhhRGSJeGL31jYYciSkgiZx+SeMCIGKLoFogplZjiJAxesJ0AqZjGnFQh7aRAYiTu2CElP/4VZJHSmTYAkm5lBZRKTCY35AJRNtcjlMWZppt1bvGYwJNfCglUjRYgsIkA/mll31D4Gagmgf25aRWbAsp5HJwK2kkdnm3qiF6fb7anJJ91DiqoVrUcOmeBmUyzARQCUHLllyt2pmJiEMpYmJMpQcPlY1mFeMCngE3qqaWmjorqhqrqpSKpiqUKaydg4tXqpkBB8QQOS/Tq66/ABivssEQ0UcOxyCar7LLMNuvsCrPQRivttNReEAEAIfkECQoADwAsBgADANAADQAABP/wDQSqvTjrzbv/YCiOZGl+yCANDoAYMDAsdL28hqPvqV2/u2DPd8sFdUMf4sibEZdMR9IGi05/xuOVBmVuF1Wv05fVjm1AHcwwaKeAbccgQa8nFnJim0BI8Pl4ZzR7f3+BRHKFhnk+iYoEeEQLhH6LgpMDfJWADpKEipF6mY+hPp+Fh42joJ01MwMGBxRLbQeTDAK5ugQDB76/vgO4urm8C7bItgPEugy9wMcHy8wCzsfRNNLDxLzQ2cLU1sm/08zO0L6T1NXP6d/rxuPK280z3tLr58jZeAkVbLYCZCpAsGABGn0KCSRgsOAxTagYNjy44BEviQYVIPRTKcHAiQj//9T5mHEjRzokDT4UCQhjQY0HLKZ0GLOOppkFYNLpM9IlQZiPFgqo0CldgIkNIFlccHSi0oSGAjRoYDBpRVJHqRpU2pFPAKlatT5V9BXp2I6+CmglaBViJaYTC4zVlMDX1IZcoUJqqlbsVY59DvDdepVu3QMEiTIVGFfjTpEeGy/YeTJyQa2OKY+UbMfOAM48KwVYoIDq2swd6ZA2jXlyVwKjFVz+OVkvbNITHStSLbshasgLkGYmu7oAUcGZ7ob1xZPuAQZ3VcYsROd59ILMbVaH3te0r86qGVQlyDy0ap9TywOHHlat+pMLxPdlmx04Q9P0D9gxROA6wWOPvdUf/37kTadZfAURZU90UzXAQEUBHsbgVA/SFVV3plUYmldZNUgQJI/98ZVyBXEF2F4kUuiaZnZ5qCJ4EjbYoIZuCeZfWyzBBhZerkGEIn4qJrQJU9EpuEx7OdUmJG9IahSAj7eVptZLTIUYJVtYAnhibKzd9RBgqrF1Wo/mFTcbUxteieFwB4Km2R1SRudkV2FiSVsAlTGZIAIHOJCAmN7V1NxFN9YnUnIypmfgSc+JmZ9b28UVwKJ1NDofQZNaWJ1EiWa6yW3yeVjApNrdNiCGmZrn0X0NqSdiRY66p98m2zGYQi8COGqVTZrYSKBcVWon2JSE4eljWbHuBeZhU661Vzxz1SG21ofBUjbspcDiyaK0WDq4onOIdUftk52llai32oZmLo/GKjRYAW1IQMEJ9NZr77345qsvCCk8EAEAIfkEBQoADwAsBgADANAADQAABP/wDQSqvTjrzbv/YCiOZGl+yCANg+MAiOHO77Dc+BK78pzmuB7NBbABFwYhrXhEKn1G4G7o+B2nQyvwCW1yXdpcklqNisnlnG0AY00WDlb8yEokCHY73HxjEf6ABHtAboGAcE1+hoJzhAOLjImPi4NAcZCIdJOGmY6YDpKffAuKnAYtBxRxB40LB68HAwKztAIEA7AHrq+ytbO3ubuxvrMMuLmwvb63wrq8xALGu67UyrXGsM3WtNiv2tDMyM/E3bo3utvFNuLDxMw4FQMBuAH1BAF/CwQF/P0FN4Du3Hvkj58CgAH/ECz4Tx8gfAkWFnSV516+fQwp5sEnCKO/gwf/7tjhKNGfq4ACSxo8aQfPRYYN88hUWeDgAoH37NC0WS/AgQroQuIUFKBBAaNIOy56xbCBUkMHih719zRQVH5Ij1YVWM+f0QIdW3KV6lWQwJYEombt91QsU4Zm/6C9ClefTDtvv/KLWzFtgKZmN8ZzIPTuAJgH7+KJiPXjzbN5FjRNfFcn4seVDxdsQLmyZIaJE96T3EBvTcxoAyxQAPrx4sWf9XJGPXPzbMh/VLMu2DlPhTgBZOZjYProK8h6GDTud1xkZOWbm9/VZ7q0dJkLoJvWuFgPAaTgj8t9Ltt4yPEXv5Y2XzlB9qxIX72Grbz0+gbyhd/CaFp89wopHMdR/z32rQcWbbkVdd9eDhlC4FRYMdDgeG/1U5qEkNBlYQMYLvLghhL2hccrBdoXIlp4HVDihbSluCKHdkHmClYFdijXH2pNZWKMLhHwGz1crdYaTs4JyRtm3bm3m4Wd9agbhEf1ViRrpoWWpHvLrbdAcH09ueE/XIql5JDtGUkjmFeOad9KFeWhS5ZGbdldbjDEEhWXB3znVQM+vZaSnmv5pFhH6tknqH6PrBlfSGG+tCGfhbnFH42HjjQioDq+Uk+beXrFj6b6UaejdZEKpM+jkHKUk3t6euXfqjqwoMumJEIJY5sJ2ibhptgdABNR4+H1WUFEiZlAXhbuamyFNJ7IqTCvezqbAJczGlhasXcxy5ac83UV7Zb6ebvmgRy5xYIEFJyg7rrstuvuu/CCkMIDEQAAOw==',
	};
	
	var styleText = '\
		.fv_PopupFlash_body_firefox object, \
		.fv_PopupFlash_body_firefox embed{ \
			display: none !important; \
		} \
		#fv_popup_player, \
		#fv_popup_player object, \
		#fv_popup_player embed, \
		object[fv_is_parent_object], \
		object[fv_is_parent_object] object, \
		object[fv_is_parent_object] embed{ \
			display: block !important; \
		} \
		#fv_popup_icon{ \
			width: ' + POPUP_ICON_SIZE + 'px; height: ' + POPUP_ICON_SIZE + 'px; \
			position: absolute; \
			background-image: url("' + picData.popup_icon + '"); \
			background-color: black; \
			background-size: 100% 100%; \
			z-index: 999999; \
			cursor: pointer; \
		} \
		#fv_popup_icon.reload{ \
			background-image: url("' + picData.popup_icon_reload + '"); \
		} \
		#fv_PopupFlash{ \
			background-color: rgba(0, 0, 0, ' + BACKGROUND_OPACITY + '); \
			position: fixed; \
			left: 0px; top: 0px; \
			width: 100%; \
			height: 100%; \
			z-index: 999998; \
			text-align: center; \
		} \
		#fv_PopupFlash.move{ \
			text-align: left; \
		} \
		#fv_popup_container{ \
			position: relative; \
			float: none; \
			z-index: 999999; \
			box-sizing: content-box; \
			-moz-box-sizing: content-box; \
			padding: 11px; \
			display: inline-block; \
			border-radius: 5px; \
			box-shadow: 0px 0px 30px black; \
			background-color: white; \
			background-image: url("' + picData.player_bg +'"); \
			background-repeat: no-repeat; \
			background-position:center; \
			line-height: 0px; \
		} \
		#fv_popup_player.noReload, \
		#fv_popup_player.noReload > embed{ \
			padding: 0px !important; \
			margin: 0px !important; \
			border: 0px !important; \
			z-index: 1000000 !important; \
			position: fixed !important; \
			display: block !important; \
		} \
		#fv_popup_player_parent.noReload{ \
			z-index: auto !important; \
			position: absolute !important; \
			overflow: visible !important; \
			opacity: 1 !important; \
		} \
		.fv_popup_player_forefather.noReload{ \
			z-index: auto !important; \
			opacity: 1 !important; \
		} \
		#fv_popup_option{ \
			width: 32px; \
			height: 32px; \
			background-image: url("' + picData.option + '"); \
			cursor: pointer; \
			position: absolute; \
			top: -16px; \
			left: -16px; \
			z-index: 1; \
		}\
		#fv_popup_option:hover{ \
			border-radius: 16px; \
			background-image: url("' + picData.close + '"); \
		} \
		#fv_popup_menu{ \
			width: auto; \
			height: auto; \
			display: none; \
			opacity: 0; \
			background-color: white; \
			position: absolute; \
			top: 3px; \
			left: 3px; \
			border: 2px dashed rgb(150, 150, 150); \
			box-shadow: inset 0px 0px 10px rgb(150, 150, 150); \
			text-align: left; \
			line-height: 18px; \
			font-size: 12px; \
			color: black; \
			padding: 5px 10px 5px 25px; \
			transition: opacity 0.7s ease; \
			-o-transition: opacity 0.7s ease; \
		} \
		#fv_popup_option:hover + #fv_popup_menu{ \
			display: inline; \
			opacity: 1; \
		} \
		#fv_popup_menu:hover{ \
			display: inline; \
			opacity: 1; \
		} \
		#fv_popup_menu .fv_menu_item_hide{ \
			display: none; \
		} \
		#fv_popup_menu ul{ \
			padding: 0px; \
			margin: 0px; \
		} \
		#fv_popup_menu li{ \
			list-style: disc outside; \
		} \
		#fv_popup_menu li:hover{ \
			background-color: rgb(234, 234, 234); \
			cursor: pointer; \
		} \
		#fv_popup_menu .fv_popup_pin{ \
			float: right; \
			width: 14px; \
			height: 14px; \
			margin-left: 5px; \
			margin-top: 1px; \
			background-image: url("' + picData.pin + '"); \
			background-color: transparent; \
			background-size: 100% 100%; \
			visibility: hidden; \
		} \
		#fv_popup_menu #fv_pin_press.fv_popup_pin{ \
			background-color: rgb(220, 220, 220); \
			visibility: visible; \
		} \
		#fv_popup_menu .fv_popup_save{ \
			float: right; \
			width: 14px; \
			height: 14px; \
			margin-left: 5px; \
			margin-top: 1px; \
			background-image: url("' + picData.save + '"); \
			background-size: 100% 100%; \
			visibility: hidden; \
		} \
		#fv_popup_menu .fv_menu_item_normal > span{ \
			color: #1F1F1F; \
			font-weight: normal; \
		} \
		#fv_popup_menu .fv_menu_item_selected > span{ \
			color: black; \
			font-weight: bold; \
		} \
		#fv_popup_menu li:hover > .fv_popup_pin{ \
			visibility: visible; \
		} \
		#fv_popup_menu li:hover > .fv_popup_save{ \
			visibility: visible; \
		} \
		#fv_popup_option.noReload{ \
			position: fixed; \
			z-index: 1000002; \
		} \
		#fv_popup_menu.noReload{ \
			position: fixed; \
			z-index: 1000001; \
		} \
	';
	
	var resizeMouseDwn = {x: 0, y: 0};
	var resizeFlag = false;
	var resizeBegin = false;
	var resizeEdge = 'EDGE_NONE';
	var edgeLeft = 'EDGE_NONE';
	var edgeTop = 'EDGE_NONE';
	var flashPreSize = null;
	var flashFinalSize = {w: 0, h: 0};
	var mouseMoveCount = 0;
	var adjustPreX = 0;
	var adjustPreY = 0;
	var adjustX = 0;
	var adjustY = 0;
	var titleSaved = '';
	
	//for move
	var closeLock = false;
	var playerMoved = false;
	var playerMoving = false;
	
	//for iframe
	var loadingTimer = 0;
	var randomName = 'none';
	var randomName2 = 'none';
	var savedIframeName = null;
	var topSavedIframeName = null;
	var topSavedObj = null;
	var parentWndWidth = 0;
	var parentWndHeight = 0;
	
	//for no reload
	var orgStyle = new Object();
	var orgForefather = [];
	
	//for alt, ctrl & shift key
	var funcKeyPress = false;
	
	function _addStyle(str){
		var styleObj = _createElement('style');
		styleObj.textContent = str;
		$('head').appendChild(styleObj);
	}
	
	function _getObjTag(obj){
		return obj ? obj.nodeName.toLowerCase() : '';
	}
	
	function $(str){
		return document.querySelector(str);
	}
	
	function $$(str){
		return document.querySelectorAll(str);
	}
	
	function sendToAllFrames(data){
		var f = window.frames;
		for(var i = 0; i < f.length; i++){
			f[i].postMessage(data, '*');
		}
	}
	
	function _createNodeByString(str){
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = str;
		var node = tempDiv.firstChild.cloneNode(true);
		delete(tempDiv);
		return node;
	}
		
	function _getStorageItem(name){
		if(window.opera){
			if(typeof storage != 'undefined'){
				var data = storage.getItem(name);
				if(data != null){
					return JSON.parse(data);
				}
			}
		}
		else if(typeof GM_getValue != 'undefined'){
			var data = GM_getValue(name);
			if(data != null){
				return JSON.parse(data);
			}
		}
		return null;
	}
	
	function _setStorageItem(name, data){
		if(window.opera){
			if( (typeof storage) != 'undefined' ){
				storage.setItem(name, JSON.stringify(data));
				return true;
			}
			else{
				alert('请先给 opera:config#PersistentStorage|UserJSStorageQuota 设置一个值 (单位为 kB)，然后再刷新试试。');
				return false;
			}
		}
		else if(typeof GM_setValue != 'undefined'){
			GM_setValue(name, JSON.stringify(data));
			return true;
		}
		else{
			alert('存储本地数据失败');
			return false;
		}
	}
	
	function _createElement(tag, id, classId){
		var obj = document.createElement(tag);
		id && (obj.id = id);
		classId && (obj.className = classId);
		return obj;
	}

	function _getElementXY(ele){
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
	
	function _getStyleSize(obj){
		var width = obj.style.width || window.getComputedStyle(obj, null).width;
		var height = obj.style.height || window.getComputedStyle(obj, null).height;
		return { w: parseInt(width), h: parseInt(height) };
	}
	
	function _getStyleXY(obj){
		var left = obj.style.left || window.getComputedStyle(obj, null).left;
		var top = obj.style.top || window.getComputedStyle(obj, null).top;
		return { x: parseInt(left), y: parseInt(top) };
	}
	
	function _saveAndSetObjAttri(obj, attr, newValue){
		if(obj.getAttribute(attr)){
			obj.setAttribute('_' + attr, obj.getAttribute(attr));
		}
		obj.setAttribute(attr, newValue);
	}
	
	function _restoreObjAttr(obj, attr){
		obj.removeAttribute(attr);
		if(obj.getAttribute('_' + attr)){
			obj.setAttribute(attr, obj.getAttribute('_' + attr));
			obj.removeAttribute('_' + attr);
		}
	}
	
	function _saveAndSetObjPositionSize(obj){
		var pos = _getElementXY(obj);
		var style_str = obj.getAttribute('style') || '';
		style_str.replace(/([^-]|^)(left|top|right|bottom|width|height)[^-:]*:[^;]+(;|$)/ig, '$1').replace(/( ){2,}/g, ' ');
		if(style_str != ''){
			style_str += ' ';
		}
		style_str += 'left: ' + pos.x + 'px !important; top: ' + pos.y + 'px !important; width: ' + obj.offsetWidth + 'px !important; height: ' + obj.offsetHeight + 'px !important;';
		_saveAndSetObjAttri(obj, 'style', style_str);
	}
	
	function _restoreObjPositionSize(obj){
		_restoreObjAttr(obj, 'style');
	}
	
	function _setTransition(obj, type){
		if(type == 'none'){
			obj.style.setProperty('transition-property', 'none', null);
			obj.style.setProperty('-o-transition-property', 'none', null);
			obj.style.setProperty('-moz-transition-property', 'none', null);
		}
		else{
			obj.style.setProperty('transition', type, null);
			obj.style.setProperty('-o-transition', type, null);
			obj.style.setProperty('-moz-transition', type, null);
		}
	}
	
	function _getDefaultWidth(){
		return Math.max(window.innerWidth * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_WIDTH);
	}
	
	function _getDefaultHeight(){
		return Math.max(window.innerHeight * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_HEIGHT);
	}
	
	function _getMaxWidth(){
		return window.innerWidth - 50;
	}
	
	function _getMaxHeight(){
		return window.innerHeight - 30;
	}
	
	function _saveTitle(){
		titleSaved = document.title;
	}
	
	function _restoreTitle(){
		document.title = titleSaved;
	}
	
	function _setTitle(str){
		document.title = str;
	}
		
	function check_bound(x, y, ox, oy, ow, oh){
		return (x >= ox) && (x <= (ox + ow)) && (y >= oy) && (y <= (oy + oh));
	}
	
	function check_obj_edge(obj, x, y){
		var objPos = _getElementXY(obj);
		var objSize = {w: obj.offsetWidth, h: obj.offsetHeight};
		
		if(check_bound(x, y, objPos.x, objPos.y, objSize.w, objSize.h) == false /* div 外侧 */
			|| check_bound(x, y, objPos.x + 8, objPos.y + 8, objSize.w - 16, objSize.h - 16) == true /* flash 内 */){
			return 'EDGE_NONE';
		}
		if( (Math.abs(x - objPos.x) <= 8 || Math.abs(objPos.x + objSize.w - x) <= 8) 
			&& (Math.abs(y - objPos.y) >= 25 && Math.abs(objPos.y + objSize.h - y) >= 25) ){
			return 'EDGE_LEFT_RIGHT';
		}
		else if( (Math.abs(y - objPos.y) <= 8 || Math.abs(objPos.y + objSize.h - y) <= 8) 
			&& (Math.abs(x - objPos.x) >= 25 && Math.abs(objPos.x + objSize.w - x) >= 25) ){
			return 'EDGE_TOP_BOTTOM';
		}
		else{
			return 'EDGE_CORNER';
		}
	}
	
	function set_parent_no_reload(obj){
		var temp = obj;
		var parentFind = false;
		while((temp = temp.parentNode) && _getObjTag(temp) != 'body'){
			var zIndex = temp.style.zIndex || window.getComputedStyle(temp, null).zIndex;
			if(_getObjTag(temp) == 'object'){
				_saveAndSetObjAttri(temp, 'fv_is_parent_object', 'true');
			}
			if(zIndex != 'auto' && parentFind == false){
				//放在设置 id 与 class 前
				_saveAndSetObjPositionSize(temp);
				_saveAndSetObjAttri(temp, 'id', 'fv_popup_player_parent');
				_saveAndSetObjAttri(temp, 'class', 'noReload');
				parentFind = true;
			}
			else if(zIndex != 'auto'){
				orgForefather.push(temp);
				_saveAndSetObjAttri(temp, 'class', 'fv_popup_player_forefather noReload');
			}
		}
	}
	
	function recover_parent_no_reload(){
		var po = $$('[fv_is_parent_object]');
		for(var i = 0; i < po.length; i ++){
			_restoreObjAttr(po[i], 'fv_is_parent_object');
		}
		var orgTargetObj = document.getElementById('fv_popup_player_parent');
		if(orgTargetObj != null){
			_restoreObjAttr(orgTargetObj, 'id');
			_restoreObjAttr(orgTargetObj, 'class');
			_restoreObjPositionSize(orgTargetObj);
			orgTargetObj = null;
		}
		while(orgForefather.length != 0){
			var obj = orgForefather.pop();
			_restoreObjAttr(obj, 'class');
		}
	}
	
	function create_black_background(obj){
		if(!$('#fv_PopupFlash')){
			if(!window.opera){
				document.body.className += ' fv_PopupFlash_body_firefox';
			}
			if(obj){
				var embed = obj.getElementsByTagName('embed');
				obj.style.visibility = 'hidden';
				if(embed[0]){
					embed[0].style.visibility = 'hidden';
				}
				save_and_hide_original_player_no_reload(obj);
				set_parent_no_reload(obj);
			}
			var div = _createElement('div', 'fv_PopupFlash');
			div.innerHTML = '.';
			document.body.appendChild(div);
			if(CLICK_BLANK_TO_CLOSE == 'CLICK' || CLICK_BLANK_TO_CLOSE == 'DOUBLE_CLICK'){
				var evtType = (CLICK_BLANK_TO_CLOSE == 'CLICK') ? 'click' : 'dblclick';
				div.addEventListener(evtType, function(e){
					if(e.target == this){
						var close = $('#fv_popup_option');
						closeLock = false;
						if(close) close.click();
					}
				}, false);
			}
		}
	}
	
	function del_black_background(obj){
		clearInterval(loadingTimer);
		if(!window.opera){
			document.body.className = document.body.className.replace(' fv_PopupFlash_body_firefox', '');
		}
		var bk = $('#fv_PopupFlash');
		if(bk){
			document.body.removeChild(bk);
		}
		recover_parent_no_reload();
		if(obj){
			recover_original_player_no_reload(obj);
		}
	}
	
	function _setObjSize(obj, w, h){
		var container = document.getElementById('fv_popup_container');
		if(w){
			if(!resizeFlag){
				obj.setAttribute('width', w);
				obj.style.setProperty('width', w + 'px', 'important');
			}
			if(container){//if(container && container.className == 'noReload'){
				container.style.width = w + 'px';
			}
		}
		if(h){
			if(!resizeFlag){
				obj.setAttribute('height', h);
				obj.style.setProperty('height', h + 'px', 'important');
			}
			if(container){//if(container && container.className == 'noReload'){
				container.style.height = h + 'px';
			}
		}
	}
	
	function resize_popup_flash(obj, w, h){
		var embed = obj.getElementsByTagName('embed');
		var div = document.getElementById('fv_popup_container');

		if(w){
			w = (w >= _getMaxWidth()) ? _getMaxWidth() : w;
			w = (w < POPUP_FLASH_MIN_WIDTH) ? POPUP_FLASH_MIN_WIDTH : w;
			_setObjSize(obj, Math.round(w), 0);
			if(embed[0]){
				_setObjSize(embed[0], Math.round(w), 0);
			}
		}
		
		if(h){
			h = (h >= _getMaxHeight()) ? _getMaxHeight() : h;
			h = (h < POPUP_FLASH_MIN_HEIGHT) ? POPUP_FLASH_MIN_HEIGHT : h;
			_setObjSize(obj, 0, Math.round(h));
			if(embed[0]){
				_setObjSize(embed[0], 0, Math.round(h));
			}
			if(div && playerMoved == false){
				var height = (div.className == 'noReload') ? div.offsetHeight : _getStyleSize(div).h;
				div.style.top = (window.innerHeight - height) / 2 + 'px';
			}
		}
	}
	
	function resize_popup_flash_by_drag(obj, w, h, edgeLeft, edgeTop){
		var div = document.getElementById('fv_popup_container');
		var divSize = _getStyleSize(div), divPos = _getStyleXY(div);
		var divSizeAfter = null;
		
		resize_popup_flash(obj, w, h);
		flashFinalSize.w = w;
		flashFinalSize.h = h;
		divSizeAfter = _getStyleSize(div);
		if(SHOW_RESIZE_INFO == 'title' || SHOW_RESIZE_INFO == 'both'){
			_setTitle('[ ' + divSizeAfter.w + ' x ' + divSizeAfter.h + ' ]');
		}
		if(SHOW_RESIZE_INFO == 'statusbar' || SHOW_RESIZE_INFO == 'both'){
			window.status = '[ ' + divSizeAfter.w + ' x ' + divSizeAfter.h + ' ]';
		}
		if(!playerMoved){
			return;
		}
		if(edgeLeft == 'EDGE_LEFT'){
			div.style.left = divPos.x - (divSizeAfter.w - divSize.w) + 'px';
		}
		if(edgeTop == 'EDGE_TOP'){
			div.style.top = divPos.y - (divSizeAfter.h - divSize.h) + 'px';
		}
	}
	
	function fill_popup_option_menu(){
		var i = 0;
		var htmlText = '<ul>';
		var customSize = null;
		var selected = _getStorageItem('fv_saved_idx') ? _getStorageItem('fv_saved_idx') : 0;
		
		for(i = 0; i < POPUP_FLASH_SIZE_LIST.length; i++){
			htmlText +=  '<li class="fv_menu_item_normal';
			if(POPUP_FLASH_SIZE_LIST[i].width >= _getMaxWidth()
			|| POPUP_FLASH_SIZE_LIST[i].height >= _getMaxHeight()){
				htmlText += ' fv_menu_item_hide';
			}
			htmlText += '"><span id="fv_pin_normal" class="fv_popup_pin"></span><span>' + POPUP_FLASH_SIZE_LIST[i].name + '</span></li>';
		}
		htmlText += '<li id="fv_menu_item_custom" class="fv_menu_item_normal">';
		if(customSize = _getStorageItem('fv_custom_size')){
			htmlText += '<span id="fv_pin_press" class="fv_popup_pin"></span><span class="fv_popup_save"></span><span class="fv_popup_custom_text">[' + customSize.width + ' x ' + customSize.height + ']</span></li>';
		}
		else{
			htmlText += '<span id="fv_pin_press" class="fv_popup_pin"></span><span class="fv_popup_save"></span><span class="fv_popup_custom_text">自定义 N/A</span></li>';
		}
		htmlText += '<li class="fv_menu_item_normal">居中显示</li>';
		htmlText += '</ul>';
		$('#fv_popup_menu').innerHTML = htmlText;
		
		if(selected == 255){
			$('#fv_menu_item_custom').className = 'fv_menu_item_selected';
		}
		else{
			if(selected == 0 || POPUP_FLASH_SIZE_LIST[selected].width > _getMaxWidth() || POPUP_FLASH_SIZE_LIST[selected].height > _getMaxHeight()){
				$('#fv_popup_menu li:nth-child(1)').className = 'fv_menu_item_selected';
			}
			else{
				$('#fv_popup_menu li:nth-child(' + (selected + 1) + ')').className = 'fv_menu_item_selected';
			}
		}
	}
	
	function set_default_popup_option_menu_item(){
		var savedIndex = _getStorageItem('fv_saved_idx');
		
		do{
			$('#fv_pin_press').id = 'fv_pin_normal';
			if(savedIndex){
				switch(savedIndex)
				{
				case 255: /* custom */
					$('#fv_menu_item_custom .fv_popup_pin').id = 'fv_pin_press';
					return;
				default:
					if(POPUP_FLASH_SIZE_LIST[savedIndex].width > _getMaxWidth()
					|| POPUP_FLASH_SIZE_LIST[savedIndex].height > _getMaxHeight()){
						break;
					}
					$('#fv_popup_menu li:nth-child(' + (savedIndex + 1) + ') .fv_popup_pin').id = 'fv_pin_press';
					return;
				}
			}
		}while(0);
		$('#fv_popup_menu li:nth-child(1) .fv_popup_pin').id = 'fv_pin_press';
	}
	
	function find_item_index(item){
		var temp = item.parentNode.firstChild;
		var i = 0;
		while( temp != item && (temp = temp.nextSibling) ){
			i++;
		}
		return i;
	}
	
	//fix for firefox redraw error while the embed object resized under the hidden status
	var fix_firefox_redraw_timer = null;
	function fix_firefox_redraw_error(obj){
		if(!window.opera && fix_firefox_redraw_timer == null){
			var ow = obj.width, oh = obj.height;
			resize_popup_flash(obj, ow - 1, oh - 1);
			fix_firefox_redraw_timer = setTimeout(function(){
				resize_popup_flash(obj, ow, oh);
				fix_firefox_redraw_timer = null;
			}, 10);
		}
	}
		
	function popup_option_click_hdlr(e){
		var item = e.target.parentNode;
		var i = find_item_index(item);
		var width = 0; height = 0;
		var flash = $('#fv_popup_player');
		var option = $('#fv_popup_option');
		var menu = $('#fv_popup_menu');
		var container = $('#fv_popup_container');
		
		if(flash.getElementsByTagName('embed').length != 0){
			flash = flash.getElementsByTagName('embed')[0];
		}
			
		if( i < (POPUP_FLASH_SIZE_LIST.length) ){ /* 预设值 */
			if( (width = POPUP_FLASH_SIZE_LIST[i].width) == 0 ){
				width = _getDefaultWidth();
			}
			if( (height = POPUP_FLASH_SIZE_LIST[i].height) == 0 ){
				height = _getDefaultHeight();
			}
		}
		else{	/* 自定义值 */
			var data = _getStorageItem('fv_custom_size');
			if(data){
				width = data.width;
				height = data.height;
			}
		}
		
		$('.fv_menu_item_selected').className = 'fv_menu_item_normal';
		$('#fv_popup_menu li:nth-child(' + (i+1) + ')').className = 'fv_menu_item_selected';
			
		_setTransition(container, 'width 0.5s ease');
		flash.style.visibility = 'hidden';
		option.style.visibility = 'hidden';
		menu.style.visibility = 'hidden';
		resize_popup_flash($('#fv_popup_player'), width, height);

		setTimeout(function(){
			set_flash_pos_no_reload();
			set_option_and_menu_pos_no_reload();
			flash.style.visibility = 'visible';
			fix_firefox_redraw_error(flash);
			option.style.visibility = 'visible';
			menu.style.visibility = 'visible';
			_setTransition(container, 'none');
		}, 500);
	}
	
	function popup_option_pin_click_hdlr(e){
		var li = e.target.parentNode;
		var i = find_item_index(li);
		var savedIndex = -1;
			
		if( i < (POPUP_FLASH_SIZE_LIST.length) ){ /* 预设值 */
			savedIndex = i;
		}
		else{
			if(_getStorageItem('fv_custom_size')){
				savedIndex = 255;
			}
		}
		if(savedIndex != -1 && _setStorageItem('fv_saved_idx', savedIndex) != false){
			set_default_popup_option_menu_item();
		}
		e.stopPropagation();
	}
	
	function popup_option_save_click_hdlr(e){
		var flash = $('#fv_popup_player');
		var customSize = {width: Math.round(flash.offsetWidth), height: Math.round(flash.offsetHeight)};
		
		if(_setStorageItem('fv_custom_size', customSize) != false){
			$('#fv_menu_item_custom .fv_popup_custom_text').textContent = '[' + customSize.width + ' x ' + customSize.height + ']';
		}
		e.stopPropagation();
	}
	
	function register_popup_option_menu(){
		var i = 0;
		var menu = $('#fv_popup_menu');
		if( (typeof menu) != 'undefined' ){
			var menu_item = menu.getElementsByTagName('li');
			for(i = 0; i < menu_item.length - 1; i++){
				var span = menu_item[i].getElementsByTagName('span');
				var pin = span[0], save = (span.length > 2) ? span[1] : null;
				
				menu_item[i].addEventListener('click', popup_option_click_hdlr, false);
				pin.addEventListener('click', popup_option_pin_click_hdlr, false);
				if(save){
					save.addEventListener('click', popup_option_save_click_hdlr, false);
				}
			}
			// “居中显示”菜单
			menu_item[i].addEventListener('click', move_popup_player_to_center, false);
		}
	}
	
	function init_popup_player_size(obj){
		var savedIndex = _getStorageItem('fv_saved_idx');
		var customSize = _getStorageItem('fv_custom_size');
		do{
			if(savedIndex){
				if(savedIndex == 255){ // custom
					resize_popup_flash(obj, customSize.width, customSize.height);
					return;
				}
				else if(savedIndex > 0){
					if(POPUP_FLASH_SIZE_LIST[savedIndex].width > _getMaxWidth()
					|| POPUP_FLASH_SIZE_LIST[savedIndex].height > _getMaxHeight())
					{
						break;
					}
					resize_popup_flash(obj, POPUP_FLASH_SIZE_LIST[savedIndex].width, POPUP_FLASH_SIZE_LIST[savedIndex].height);
					return;
				}
			}
		}while(0);
		resize_popup_flash(obj, _getDefaultWidth(), _getDefaultHeight());
	}
	
	function save_original_style(obj, names){
		var i = 0;
		for(; i < names.length; i++){
			var name = names[i];
			if(!orgStyle[name]) orgStyle[name] = [];
			orgStyle[name].push(obj.style[name] || window.getComputedStyle(obj, null)[name]);
		}
	}
	
	function restore_original_style(obj, names){
		var i = 0;
		for(; i < names.length; i++){
			var name = names[i];
			obj.style.removeProperty(name);
			if(!orgStyle[name]) continue;
			obj.style[name] = orgStyle[name].shift();
		}
	}

	function save_size_no_reload_no_reload(obj){
		save_original_style(obj, ['width', 'height', 'top', 'left']);
		var embed = obj.getElementsByTagName('embed');
		if(embed.length >= 1){
			embed = embed[0];
			save_size_no_reload_no_reload(embed);
		}
	}
	
	function restore_size_no_reload_no_reload(obj){
		restore_original_style(obj, ['width', 'height', 'top', 'left']);
		var embed = obj.getElementsByTagName('embed');
		if(embed.length >= 1){
			embed = embed[0];
			restore_size_no_reload_no_reload(embed);
		}
	}
	
	function save_and_hide_original_player_no_reload(obj){
		save_size_no_reload_no_reload(obj);
		_saveAndSetObjAttri(obj, 'id', 'fv_popup_player');
		_saveAndSetObjAttri(obj, 'class', 'noReload');
	}
	
	function recover_original_player_no_reload(obj){
		if(fix_firefox_redraw_timer != null){
			clearTimeout(fix_firefox_redraw_timer);
			fix_firefox_redraw_timer = null;
		}
		_restoreObjAttr(obj, 'id');
		_restoreObjAttr(obj, 'class');
		restore_size_no_reload_no_reload(obj);
	}
	
	function create_popup_option_no_reload(){
		var option = _createElement('span', 'fv_popup_option', 'noReload');
		var menu = _createElement('span', 'fv_popup_menu', 'noReload');
		option.setAttribute('title', '拖拽可移动');
		document.body.appendChild(option);
		document.body.appendChild(menu);
	}
	
	function get_popup_player_div_pos_no_reload(){
		var div = $('#fv_popup_container');
		var divPos = _getElementXY(div);
		divPos.x -= Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		divPos.y -= Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		return {x: divPos.x, y: divPos.y};
	}
	
	function set_option_and_menu_pos_no_reload(){
		var option = $('#fv_popup_option');
		var menu = $('#fv_popup_menu');
		if(option && option.className == 'noReload' && menu && menu.className == 'noReload'){
			var divPos = get_popup_player_div_pos_no_reload();
			option.style.left = divPos.x - 16 + 'px';
			option.style.top = divPos.y - 16 + 'px';
			menu.style.left = divPos.x + 3 + 'px';
			menu.style.top = divPos.y + 3 + 'px';
		}
	}
	
	function set_flash_pos_no_reload(){
		var flash = $('#fv_popup_player');
		if(flash && flash.className == 'noReload'){
			var divPos = get_popup_player_div_pos_no_reload();;
			flash.style.top = divPos.y + 11 + 'px';
			flash.style.left = divPos.x + 11 + 'px';
		}
	}
	
	function create_popup_player_no_reload(obj){
		if(!$('#fv_popup_container')){
			var embed = obj.getElementsByTagName('embed');
			var div = _createElement('div', 'fv_popup_container', 'noReload');
			var divPos = null;
			init_popup_player_size(obj);

			div.style.width = parseInt(obj.width) + 'px';
			div.style.top = (window.innerHeight - parseInt(obj.height) - 11 * 2) / 2 + 'px';
			div.style.height = parseInt(obj.height) + 'px';
			div.style.visibility = 'hidden';
			$('#fv_PopupFlash').appendChild(div);
			
			set_flash_pos_no_reload();

			create_popup_option_no_reload();
			$('#fv_popup_option').style.visibility = 'hidden';
			set_option_and_menu_pos_no_reload();
			fill_popup_option_menu();
			set_default_popup_option_menu_item();
			register_popup_option_menu();
			
			div.style.visibility = 'visible';
			obj.style.visibility = 'visible';
			if(embed[0]){
				embed[0].style.visibility = 'visible';
			}
			$('#fv_popup_option').style.visibility = 'visible';
			
			$('#fv_popup_option').addEventListener('click', function(){
				if(!closeLock){
					$('#fv_popup_container').removeEventListener('mousemove', fv_popup_container_mousemove_hdlr, false);
					$('#fv_popup_container').removeEventListener('mousedown', fv_popup_container_mousedown_hdlr, false);
					window.removeEventListener('mouseup', mouse_up_hdlr, false);
					window.removeEventListener('mousemove', move_popup_player, false);
					this.parentNode.removeChild(this.nextSibling);
					this.parentNode.removeChild(this);
					del_black_background(obj);
					playerMoving = false;
					playerMoved = false;
				}
			}, false);
			
			$('#fv_popup_option').addEventListener('mousedown', function(e){
				closeLock = false;
				mouseMoveCount = 0;
				window/*this*/.addEventListener('mousemove', move_popup_player, false);
			}, false);
			fix_firefox_redraw_error(obj);
		}
	}
	
	function change_popup_player_edge_cursor(div, e){
		var ret = 'IS_CHANGED';
		if(e.type != 'mousemove' || !div || resizeFlag == true){
			return 'NO_CHANGE';
		}
		
		var x = e.pageX, y = e.pageY;
		var edge_status = check_obj_edge(div, x, y);
		var pos = _getElementXY(div);
		var size = {w: div.offsetWidth, h: div.offsetHeight};
		var o = {x: (pos.x + size.w / 2), y: (pos.y + size.h / 2)};
		switch(edge_status){
		case 'EDGE_LEFT_RIGHT':
			x > o.x ? div.style.cursor = 'e-resize' : div.style.cursor = 'w-resize';
			break;
		case 'EDGE_TOP_BOTTOM':
			y > o.y ? div.style.cursor = 's-resize' : div.style.cursor = 'n-resize';
			break;
		case 'EDGE_CORNER':
			if(x > o.x && y > o.y){
				div.style.cursor = 'se-resize';
			}
			else if(x < o.x && y < o.y){
				div.style.cursor = 'default';
			}
			else if(x < o.x && y > o.y){
				div.style.cursor = 'sw-resize';
			}
			else{
				div.style.cursor = 'ne-resize';
			}
			break;
		default:
			div.style.cursor = 'default';
			ret = 'NO_CHANGE';
			break;
		}
		return ret;
	}
	
	function move_popup_player(e){
		var div = document.getElementById('fv_popup_container');
		var flash = $('#fv_popup_player');
		
		/* 清除拖动时会框选文字的副作用 */
		if(window.getSelection() !== ''){
			window.getSelection().removeAllRanges();
		}
		
		/* 过滤一部分鼠标事件以提高速度 */
		if(mouseMoveCount < PLAYER_MOUSE_MOVE_FILTER){
			mouseMoveCount++;
			return;
		}
		mouseMoveCount = 0;
		
		playerMoving = true;
		playerMoved = true;
		closeLock = true;
		
		if(flash.getElementsByTagName('embed').length != 0){
			flash = flash.getElementsByTagName('embed')[0];
		}
		
		flash.style.visibility = 'hidden';
		$('#fv_PopupFlash').setAttribute('class', 'move');
		div.style.left = e.clientX + 'px';
		div.style.top = e.clientY + 'px';
		set_option_and_menu_pos_no_reload();
		//set_flash_pos_no_reload(); // 不需移动 flash，mouseup 时再设置位置
	}
	
	function move_popup_player_to_center(e){
		if(playerMoved == true){
			var div = document.getElementById('fv_popup_container');
			
			playerMoved = false;
			div.style.left = '0px';
			div.style.top = (window.innerHeight - div.offsetHeight) / 2 + 'px';
			$('#fv_PopupFlash').removeAttribute('class');
			set_option_and_menu_pos_no_reload();
			set_flash_pos_no_reload();
		}
	}
	
	function resize_popup_player(e){
		if(resizeEdge == 'EDGE_NONE' || resizeFlag == false){
			return;
		}
		
		var x = e.pageX, y = e.pageY;
		var multi = playerMoved ? 1 : 2;
		var adjustMode = e.shiftKey ? true : false;
		
		/* 清除拖动时会框选文字的副作用 */
		if(window.getSelection() !== ''){
			window.getSelection().removeAllRanges();
		}
		
		/* 过滤一部分鼠标事件以提高速度 */
		if(mouseMoveCount < PLAYER_MOUSE_MOVE_FILTER){
			mouseMoveCount++;
			return;
		}
		mouseMoveCount = 0;
		
		var div = $('#fv_popup_container'), flash = $('#fv_popup_player');
		var divPos = _getElementXY($('#fv_popup_container'));
		var divSize = {w: div.offsetWidth, h: div.offsetHeight};
		var dot = {x: (divPos.x + divSize.w / 2), y: (divPos.y + divSize.h / 2)};
		var diff = {offsetW: Math.abs(resizeMouseDwn.x - dot.x), offsetH: Math.abs(resizeMouseDwn.y - dot.y)};
		if(resizeBegin == true){
			resizeBegin = false;
			edgeLeft = (x < dot.x) ? 'EDGE_LEFT' : 'EDGE_RIGHT';
			edgeTop = (y < dot.y) ? 'EDGE_TOP' : 'EDGE_BOTTOM';
		}
		
		if(adjustMode){
			(edgeLeft == 'EDGE_LEFT') ? (x < adjustPreX ? ++adjustX : --adjustX) : adjustX;
			(edgeLeft == 'EDGE_RIGHT') ? (x > adjustPreX ? ++adjustX : --adjustX) : adjustX;
			(edgeTop == 'EDGE_TOP') ? (y < adjustPreY ? ++adjustY : --adjustY) : adjustY;
			(edgeTop == 'EDGE_BOTTOM') ? (y > adjustPreY ? ++adjustY : --adjustY) : adjustY;
		}
		
		switch(resizeEdge){
		case 'EDGE_LEFT_RIGHT':
			resize_popup_flash_by_drag(flash, flashPreSize.w + (adjustMode ? adjustX : (Math.abs(x - dot.x) - diff.offsetW) * multi), 0, edgeLeft, 'EDGE_NONE');
			break;
		case 'EDGE_TOP_BOTTOM':
			resize_popup_flash_by_drag(flash, 0, flashPreSize.h + (adjustMode ? adjustY : (Math.abs(y - dot.y) - diff.offsetH) * multi), 'EDGE_NONE', edgeTop);
			break;
		case 'EDGE_CORNER':
			if(edgeLeft == 'EDGE_LEFT' && edgeTop == 'EDGE_TOP'){
				break;
			}
			resize_popup_flash_by_drag(flash, flashPreSize.w + (adjustMode ? adjustX : (Math.abs(x - dot.x) - diff.offsetW) * multi), flashPreSize.h + (adjustMode ? adjustY : (Math.abs(y - dot.y) - diff.offsetH) * multi), edgeLeft, edgeTop);
			break;
		default:
			break;
		}
		adjustPreX = x;
		adjustPreY = y;
	}
	
	function fv_popup_container_mousemove_hdlr(e){
		if(change_popup_player_edge_cursor(this, e) != 'NO_CHANGE'){
			window.status = '拖拽边缘调整大小，按 Shift 拖拽可微调';
		}
		else{
			window.status = '';
		}
	}
	
	function fv_popup_container_mousedown_hdlr(e){
		var x = e.pageX, y = e.pageY;
		if( (resizeEdge = check_obj_edge(this, x, y)) != 'EDGE_NONE' ){
			var flash = $('#fv_popup_player');
			var embed = flash.getElementsByTagName('embed');
			var option = $('#fv_popup_option');
			
			resizeMouseDwn.x = x; resizeMouseDwn.y = y;
			flashFinalSize.w = 0; flashFinalSize.h = 0;
			flashPreSize = _getStyleSize(flash);
			resizeFlag = true;
			mouseMoveCount = 0;
			embed = (embed.length != 0) ? embed[0] : null;
			if(flash.style.visibility != 'hidden'){
				flash.style.visibility = 'hidden';
			}
			if(embed && embed.style.visibility != 'hidden'){
				embed.style.visibility = 'hidden';
			}
			if(option.style.visibility != 'hidden'){
				option.style.visibility = 'hidden';
			}
			adjustX = adjustY = 0;
			adjustPreX = e.pageX;
			adjustPreY = e.pageY;
			resizeBegin = true;
			edgeLeft = edgeTop = 'EDGE_NONE';
			window.addEventListener('mousemove', resize_popup_player, false);
		}
	}
	
	function mouse_up_hdlr(e){
		if(playerMoving == false && (resizeEdge == 'EDGE_NONE' || resizeFlag == false)){
			return;
		}
		var flash = $('#fv_popup_player');
		var embed = flash.getElementsByTagName('embed');
		var option = $('#fv_popup_option');
		
		_restoreTitle();
		resizeEdge = 'EDGE_NONE';
		if(resizeFlag == true){
			resizeFlag = false;
			resize_popup_flash(flash, flashFinalSize.w, flashFinalSize.h);
		}
		mouseMoveCount = 0;
		
		embed = (embed.length != 0) ? embed[0] : null;
		if(flash && flash.style.visibility == 'hidden'
		|| (embed && embed.style.visibility == 'hidden')){
			set_flash_pos_no_reload();
			flash.style.visibility = 'visible';
			if(embed && embed.style.visibility == 'hidden'){
				embed.style.visibility = 'visible';
			}
		}
		if(option && option.style.visibility == 'hidden'){
			set_option_and_menu_pos_no_reload();
			option.style.visibility = 'visible';
		}
		fix_firefox_redraw_error(flash);
		resizeBegin = false;
		edgeLeft = edgeTop = 'EDGE_NONE';
		window.removeEventListener('mousemove', resize_popup_player, false);
		
		mouseMoveCount = 0;
		window/*this*/.removeEventListener('mousemove', move_popup_player, false);
	}
	
	function register_popup_player_drag_hdlr(){	
		$('#fv_popup_container').addEventListener('mousemove', fv_popup_container_mousemove_hdlr, false);
		$('#fv_popup_container').addEventListener('mousedown', fv_popup_container_mousedown_hdlr, false);
		window.addEventListener('mouseup', mouse_up_hdlr, false);
	}
	
	var fv_hide_obj = null;
	
	function hide_original_player(obj){
		fv_hide_obj = obj.cloneNode(true);
		var x = _createElement('fv_hide_obj', 'fv_hide_obj');
		obj.parentNode.replaceChild(x, obj);
	}
	
	function recover_original_player(){
		var x = $('fv_hide_obj');
		if(x && fv_hide_obj){
			x.parentNode.replaceChild(fv_hide_obj, x);
			fv_hide_obj = null;
		}
	}
	
	function create_popup_player(htmlText){
		if(!$('#fv_popup_container')){
			var bg = $('#fv_PopupFlash');
			bg.style.backgroundImage = 'url("' + picData.loading +'")';
			bg.style.backgroundRepeat = 'no-repeat';
			bg.style.backgroundPosition = '50% 50%';
		
			var div = _createElement('div', 'fv_popup_container');
			var cloneObj = _createNodeByString(htmlText);
			
			cloneObj.id = 'fv_popup_player';
			//resize_popup_flash(cloneObj, _getDefaultWidth(), _getDefaultHeight());
			init_popup_player_size(cloneObj);
			cloneObj.setAttribute('align', 'middle');
			
			div.innerHTML = '\
				<span id="fv_popup_option" title="拖拽可移动"></span> \
				<span id="fv_popup_menu"></span> \
				' + cloneObj.outerHTML + ' \
			';
			bg.appendChild(div);
			div.style.top = (window.innerHeight - parseInt(cloneObj.height)) / 2 + 'px';
			div.style.visibility = 'hidden';
			div.style.width = _getStyleSize(cloneObj).w + 'px'; div.style.height = _getStyleSize(cloneObj).h + 'px';
			fill_popup_option_menu();
			set_default_popup_option_menu_item();
			register_popup_option_menu();
			
			$('#fv_popup_option').addEventListener('click', function(){
				if(!closeLock){
					this.parentNode.parentNode.removeChild(this.parentNode);
					del_black_background();
					if(randomName == 'none'){
						recover_original_player();
					}
					else{
						var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_RECOVER_ORIGINAL_PLAYER', confirmName: randomName};
						sendToAllFrames(JSON.stringify(fv_data));
						restore_iframe_attr_name();
						randomName = 'none';
					}
				}
			}, false);
			
			$('#fv_popup_option').addEventListener('mousedown', function(e){
				closeLock = false;
				mouseMoveCount = 0;
				window/*this*/.addEventListener('mousemove', move_popup_player, false);
			}, false);
			
			//$('#fv_popup_player').addEventListener('PluginInitialized', function(e){}, false);
			loadingTimer = setInterval(function(){
				if($('#fv_popup_player').offsetHeight > 0){
					clearInterval(loadingTimer);
					$('#fv_PopupFlash').style.backgroundImage = 'none';
					div.style.visibility = 'visible';
					//此处避免选项按钮显示不完整
					$('#fv_popup_option').style.visibility = 'hidden';
					$('#fv_popup_option').style.visibility = 'visible';
				}
			}, 200);
		}
	}
	
	function restore_iframe_attr_name(){
		if(window.opera){
			if(topSavedObj != null){ // in the top window
				topSavedObj.name = topSavedIframeName;
				topSavedIframeName = null;
				topSavedObj = null;
			}else if(savedIframeName != null){
				var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_RESTORE_IFRAME_ATTR_NAME', saved_name: savedIframeName};
				window.top.postMessage(JSON.stringify(fv_data), '*');
				savedIframeName = null;
			}
		}
	}
	
	function check_need_reload(obj){
		if(window == window.top 
		|| (window != window.top && parentWndWidth * parentWndHeight != 0 && window.innerHeight > parentWndHeight * 0.8 && window.innerWidth > parentWndWidth * 0.8)){
			return false;
		}
		else{
			return true;
		}
	}
	
	function convert_to_full_path_outerHTML(obj){
		var tag = _getObjTag(obj);
		if(tag != 'object' && tag != 'embed'){
			return;
		}
		obj.data && (obj.data = obj.data);
		obj.archive && (obj.archive = obj.archive);
		obj.codebase && (obj.codebase = obj.codebase);
		obj.usemap && (obj.usemap = obj.usemap);
		obj.src && (obj.src = obj.src);
		for(var i = 0; i < obj.childNodes.length; i++){
			convert_to_full_path_outerHTML(obj.childNodes[i]);
		}
	}
	
	function popup_icon_hdlr(obj){
		if(check_need_reload(obj) == false){
			create_black_background(obj);
			create_popup_player_no_reload(obj);
			register_popup_player_drag_hdlr();
		}
		else{
			window.fv_name = Math.random().toString();
			//避免相对路径
			convert_to_full_path_outerHTML(obj);
			var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_CREATE_POPUP_PLAYER', from: window.fv_name, content: obj.outerHTML};
			window.top.postMessage(JSON.stringify(fv_data), '*');
			hide_original_player(obj);
		}
		del_popup_icon();
	}
	
	function check_plugin_type_int(obj){
		var keyword;
		keyword = obj.getAttribute('type');
		if(keyword && keyword.toLowerCase() == 'application/x-shockwave-flash'){
			return true;
		}
		keyword = obj.getAttribute('classid');
		if(keyword && keyword.toLowerCase() == 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'){
			return true;
		}
		keyword = obj.getAttribute('src');
		if(keyword && keyword.toLowerCase().indexOf('.swf') != -1){
			return true;
		}
		return false;
	}
	
	function check_plugin_type(obj){
		var embed = null;
		var ret = false;
		if((ret = check_plugin_type_int(obj)) == false){
			embed = obj.getElementsByTagName('embed');
			if(embed.length != 0) embed = embed[0];
			ret = check_plugin_type_int(embed);
		}
		return ret;
	}
	
	function get_attribute_str(obj, attr){
		return obj.getAttribute(attr) ? obj.getAttribute(attr) : '';
	}
	
	function check_black_and_white_list(obj){
		var i = 0;
		var htmlText = get_attribute_str(obj, 'id') + get_attribute_str(obj, 'class') + get_attribute_str(obj, 'name') 
				+ get_attribute_str(obj, 'src') + get_attribute_str(obj, 'data') + get_attribute_str(obj, 'flashvars');
		var embed = obj.getElementsByTagName('embed');
		var param = obj.getElementsByTagName('param');
		var i = 0;
		
		if(embed.length != 0){
			embed = embed[0];
			htmlText += get_attribute_str(embed, 'id') + get_attribute_str(embed, 'class') + get_attribute_str(embed, 'name') 
				+ get_attribute_str(embed, 'src') + get_attribute_str(embed, 'data') + get_attribute_str(obj, 'flashvars');
		}
		
		if(param.length != 0){
			for(i = 0; i < param.length; i++){
				if(param[i].name.toLowerCase() == 'flashvars'){
					htmlText += get_attribute_str(param[i], 'value');
				}
			}
		}
		
		for(i = 0; i < WHITE_LIST_KEYWORD_IMPORTANT.length; i++){
			if(htmlText.toLowerCase().indexOf(WHITE_LIST_KEYWORD_IMPORTANT[i]) != -1){
				return true;
			}
		}

		for(i = 0; i < BLACK_LIST_KEYWORD.length; i++){
			if(htmlText.toLowerCase().indexOf(BLACK_LIST_KEYWORD[i]) != -1){
				return false;
			}
		}
		
		for(i = 0; i < WHITE_LIST_KEYWORD.length; i++){
			if(htmlText.toLowerCase().indexOf(WHITE_LIST_KEYWORD[i]) != -1){
				return true;
			}
		}
		return false;
	}
	
	function check_flash_size(obj){
		var width = parseInt(window.getComputedStyle(obj, null).width) || obj.width;
		var height = parseInt(window.getComputedStyle(obj, null).height) || obj.height;
		
		if(width < FLASH_SIZE_FILTER.width && height < FLASH_SIZE_FILTER.height){
			return false;
		}
		return true;
	}
	
	function show_popup_icon(obj){
		if($('#fv_popup_icon')){
			del_popup_icon();
		}

		var ele = obj;
		var objTag = _getObjTag(obj);
		var pos = null;
		if(objTag == 'embed'){
			while(ele.parentNode && _getObjTag(ele.parentNode) != 'body'){
				ele = ele.parentNode;
				if(_getObjTag(ele) == 'object') break;
			}
			if(_getObjTag(ele) != 'object'){
				ele = obj;
			}
		}
		
		/* 只处理 flash 插件*/
		if(check_plugin_type(ele) == false){
			return;
		}

		/* 已经打开 player 的则不再显示工具按钮*/
		if(funcKeyPress == false){
			if($('#fv_popup_container')){
				return;
			}
			
			if(check_black_and_white_list(ele) == false){
				return;
			}
			
			if(check_flash_size(ele) == false){
				return;
			}
		}

		var div = _createElement('div', 'fv_popup_icon');
		//pos = _getElementXY(ele); //如果是 object，坐标可能会有问题？
		pos = _getElementXY(obj);
		div.style.left = pos.x + 'px';
		div.style.top = pos.y + 'px';
		document.body.appendChild(div);
		div.addEventListener('click', function(e){ popup_icon_hdlr(ele); }, false);
		if(check_need_reload(ele) == true){
			div.className = 'reload';
			window.fv_name = Math.random().toString();
			var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_SAVE_RANDOM_NAME_2', from: window.fv_name};
			window.top.postMessage(JSON.stringify(fv_data), '*');
		}
	}
	
	function del_popup_icon(){
		var obj = $('#fv_popup_icon');
		if(obj){
			obj.parentNode.removeChild(obj);
		}
		else if(randomName2 != 'none'){
			var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_DELETE_POPUP_ICON', confirmName: randomName2};
			sendToAllFrames(JSON.stringify(fv_data));
			restore_iframe_attr_name();
			randomName2 = 'none';
		}
	}
	
	function popup_message_hdlr(e){
		var fv_data = null;
		try{
			fv_data = JSON.parse(e.data);
		}
		catch(e){
			return;
		}
		if(fv_data.name && fv_data.name == 'fv_popup_player'){
			if(fv_data.confirmName){
				if(!window.fv_name || fv_data.confirmName != window.fv_name){
					sendToAllFrames(e.data);
					return;
				}
			}
			else if(fv_data.confirmIframe && fv_data.confirmIframe != window.name){
				sendToAllFrames(e.data);
				return;
			}
			switch(fv_data.msg){
			/* ------ operation in parent window ------ */
			case 'MSG_ID_GET_PARENT_WINDOW_SIZE_REQ':
				sendToAllFrames(JSON.stringify({
					name: 'fv_popup_player',
					w: window.innerWidth,
					h: window.innerHeight,
					msg: 'MSG_ID_GET_PARENT_WINDOW_SIZE_RSP',
					confirmName: fv_data.verifyName
				}));
				break;
			case 'MSG_ID_CREATE_POPUP_PLAYER':
				randomName = fv_data.from;
				randomName2 = 'none'; //icon will be deleted after create popup player
				create_black_background();
				create_popup_player(fv_data.content);
				register_popup_player_drag_hdlr();
				break;
			case 'MSG_ID_SAVE_RANDOM_NAME_2':
				randomName2 = fv_data.from;
				break;
			case 'MSG_ID_RESTORE_IFRAME_ATTR_NAME':
				restore_iframe_attr_name();
				break;
			/* ------ operation in iframes ------ */
			case 'MSG_ID_GET_PARENT_WINDOW_SIZE_RSP':
				parentWndWidth = fv_data.w;
				parentWndHeight = fv_data.h;
				if(parentWndHeight != 0 && parentWndWidth != 0){
					hasFetchParentSize = true;
				}
				break;
			case 'MSG_ID_RECOVER_ORIGINAL_PLAYER':
				recover_original_player();
				break;
			case 'MSG_ID_DELETE_POPUP_ICON':
				del_popup_icon();
				break;
			case 'MSG_ID_CHECK_IF_SHOW_POPUP_ICON_FOR_IFRAME':
				savedIframeName = fv_data.saved_name;
				var bodySize = _getStyleSize(document.body);
				var obj = $$('embed') || $$('object');
				var ret = false;
				if(obj && obj.length == 1){
					obj = obj[0];
					var objSize = _getStyleSize(obj);
					if(objSize.w >= bodySize.w * 0.95 && objSize.h >= bodySize.h * 0.95){
						show_popup_icon(obj);
						ret = true;
					}
				}
				if(ret == false){
					restore_iframe_attr_name();
				}
				break;
			default:
				break;
			}
		}
	}
	
	window.addEventListener('resize', function(e){
		set_flash_pos_no_reload();
		set_option_and_menu_pos_no_reload();
	}, false);
	
	window.addEventListener('message', popup_message_hdlr, false);
	
	function mouseover_hdlr(e){
		var obj = e.target;
		var tag = _getObjTag(obj);
		if(tag == 'embed' || tag == 'object'){
			show_popup_icon(obj);
		}
		else if(tag == 'iframe' && window.opera){
			var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_CHECK_IF_SHOW_POPUP_ICON_FOR_IFRAME', saved_name: obj.name};
			topSavedIframeName = obj.name;
			topSavedObj = obj;
			obj.name = Math.random().toString();
			fv_data.confirmIframe = obj.name;
			sendToAllFrames(JSON.stringify(fv_data));
		}
		else if(obj == $('#fv_popup_icon')){
			// do nothing
		}
		else{
			del_popup_icon();
		}
	}
	
	window.addEventListener('mouseover', mouseover_hdlr, false);
	
	window.addEventListener('keydown', function(e){ funcKeyPress = (e.altKey || e.shiftKey || e.ctrlKey ) ? true : false; }, false);
	window.addEventListener('keyup', function(e){ funcKeyPress = false; }, false);
	window.addEventListener('blur', function(e){ funcKeyPress = false; }, false);
	window.addEventListener('DOMContentLoaded', function(e) { _saveTitle(); } , false);
	
	var hasFetchParentSize = false;
	if(document.doctype && document.doctype.name == "wml"){
		// thanks iZML
	}
	else{
		_addStyle(styleText);
		window.addEventListener('DOMNodeInserted', function(){
			if(window != window.top && !hasFetchParentSize){
				var objs = $$('object, embed');
				if(objs.length > 0){
					window.fv_name = Math.random().toString();
					var fv_data = {name: 'fv_popup_player', msg: 'MSG_ID_GET_PARENT_WINDOW_SIZE_REQ', verifyName: window.fv_name};
					window.top.postMessage(JSON.stringify(fv_data), '*');
				}
			}
		}, false);
	}
})(window.opera ? window.opera.scriptStorage : undefined);