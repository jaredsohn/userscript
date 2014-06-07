// ==UserScript==
// @name           草榴社区看图界面优化
// @namespace      草榴社区看图界面优化
// @description    将看图界面，从“从上到下平铺式”，改为“每行约3个网格式”，便于浏览和保存图片。
// @version        2012.06.03
// @include        http://cl.eye.rs/htm_data/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var UI = {
	init: function(){
		this.insertContent();
		$('#list li img').click(function(){		
			var id = parseInt($(this).attr('data-id'));
			$('#panel').show();
			UI.showBigImage(id);
			$('#panel').click(function(){
				$('#panel').hide('');
			});
			$(document).keydown(function(e){
				switch (e.keyCode){
					case 27: //esc
						$('#panel').hide('');
						break;
					case 37: //left arrow
						var newid = UI.showBigImage(id - 1);
						id = (newid != -1)?newid : id;
						break;
					case 39: // right arrow
						var newid = UI.showBigImage(id + 1);
						id = (newid != -1)?newid : id;
						break;
				}
			});
		});
		//绑定img的load事件，加载完成之后自动等比压缩
		$('#list li img').one('load', function() {
			var that = this;
			setTimeout(function(){
				UI.resizePic(that, 400, 380);
			}, 100);
			$(this).parent().parent().find('.process').fadeOut('fast');
		})
			.each(function() {
				if(this.complete) $(this).trigger('load');
			})
			
		//图片如果加载失败，重新加载
		$('#list li img').error(function() {
			this.src = this.src;
		});
		this.renameTitle();
	},
	resizePic: function(x, maxw, maxh){
		var pwidth = x.width;//图片等比例压缩后大小
		var pheight = x.height;
		if(x.width/x.height >= maxw/maxh){   
			if(x.width > maxw){     
				pwidth = maxw;   
				pheight = (x.height * maxw) / x.width; 	
			}   
		}else{   
			if(x.height > maxh){     
				pheight = maxh;   
				pwidth = (x.width * maxh) / x.height; 
			}
		}
		x.setAttribute('width', pwidth);
		x.setAttribute('height', pheight);
		//为了使图片居中，单独设置他离上方的留白。
		var top = (maxh - pheight) / 2;
		$(x).css('margin-top',top+'px');
	},
	getImagesList: function(){
		var img_src = [];
		$('input[type="image"]').each(function(){
			img_src.push($(this).attr('src'));
		})
		return img_src;
	},
	insertContent: function(){
		var imgs = this.getImagesList();
		var total = imgs.length;
		var listCont = "";
		for(var i = 0; i < total; i++){
			listCont += '<li><p class="process">正在加载中</p><img src=\"'+imgs[i]+'\" data-id="' + i + '" id="img'+i+'" /></li>'
		}		
		var css='<style>*{padding:0; margin:0;}body{ margin:10px;}a{text-decoration:none;}input[type="button"]{padding:2px 4px;}#list{list-style:none;margin-bottom:10px;}#list li{float: left;display:table-cell;vertical-align:middle;text-align:center;width:420px;height:400px;overflow:hidden;margin:5px;position:relative;}#list li img{cursor:pointer;box-shadow: 3px 3px 7px rgb(120, 120, 120);}.process{position:absolute; top:10px; background:#000; color:#fff; padding:4px; opacity:0.7; }#panel{display:none;position:fixed;top:0px;left:0px;right:0px;bottom:0px;padding:10px;vertical-align:middle;text-align:center;z-index:9999;background:#000;}</style>'
		var cont = css + "<span>共" + total + "张图</span><ul id='list'>" + listCont + "</ul><div style='clear:both;'></div>"
		$('.t2:eq(0)').html(cont);
		$('body').before('<div id="panel"><img src="" /></div>')
	},
	renameTitle: function(){
		document.title = document.title.split('-')[0];
	},
	showBigImage: function(id){	
		var $img = $('img[data-id="'+id+'"]');
		if ($img[0]) {
			$('#panel img').hide();
			$('#panel img').removeAttr("width")
				.removeAttr("height");
			$('#panel img').attr('src', $img.attr('src'));
			$('#panel img').one('load', function() {
				var that = this;
				setTimeout(function(){
					console.log($(that).width(),$(that).height());
					UI.resizePic(that, $('#panel').width(), $('#panel').height());
					$(that).fadeIn('fast');
				}, 100);		
			})
				.each(function() {
					if(this.complete) $(this).trigger('load');
				})
			return id;
		}else{
			return -1;
		}
	}
};

if ($('#main div')[0].innerHTML.indexOf('新時代的我們') != -1 || $('#main div')[0].innerHTML.indexOf('達蓋爾的旗幟') != -1 ){
	UI.init();
}
