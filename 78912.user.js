// ==UserScript==
// @name           baiduhi_create_script
// @namespace      com.baidu.hi
// @include        http://hi.baidu.com/*/creat/blog*
// @include        http://hi.baidu.com/*/modify/blog*
// @version		   1.0
// @author		   leivli<http://hi.baidu.com/leivli>
// @copyright	   Copyright (c) 2010  leivli , All rights Reserved
// ==/UserScript==
//

var delegate = function() {
	var url			= window.location.href;
	var self		= this;

	if( typeof delegate.__initilized__ == 'undefined' ) {
		//获取元素绝对top
		delegate.prototype.getAbsoluteTop = function(id){
//{{{
			var item = document.getElementById(id);
			var aTop = item.offsetTop;
			while(item.offsetParent != null){
				itemParent = item.offsetParent;
				aTop += itemParent.offsetTop;
				item = itemParent;
			}
			return aTop;//}}}
		}
		//获取元素绝对left
		delegate.prototype.getAbsoluteLeft = function(id){
//{{{
			var item = document.getElementById(id);
			var aLeft = item.offsetLeft;
			while(item.offsetParent != null){
				itemParent = item.offsetParent;
				aLeft += itemParent.offsetLeft;
				item = itemParent;
			}
			return aLeft;//}}}
		}
		//打开视图
		delegate.prototype.show = function(id) {
		//{{{
			id = id || "__html_view";
			var dialog = document.getElementById(id);
			if(dialog && dialog.style.display == 'none'){
				var d_mask = document.getElementById('__mask');
				var blog_div = document.getElementById('main');

				dialog.style.top = self.getAbsoluteTop('main');
				dialog.style.left = self.getAbsoluteLeft('main');
				//d_mask.style.top = blog_div.offsetTop;
				//d_mask.style.left = blog_div.offsetLeft;
				d_mask.style.height = blog_div.offsetHeight;
				d_mask.style.width = blog_div.offsetWidth;

				var blog_form = document.getElementById('spBlogText___Frame');
				dialog.style.top = self.getAbsoluteTop('spBlogText___Frame');
				dialog.style.left = self.getAbsoluteLeft('spBlogText___Frame');
				dialog.style.height = blog_form.offsetHeight;
				dialog.style.width = blog_form.offsetWidth;
				dialog.style.display = "block";

				d_mask.style.display = "block";
			}//}}}
		}
		//关闭视图
		delegate.prototype.close = function(id) {
		//{{{
			id = id || "__html_view";
			var x = document.getElementById(id);
			x.style.display="none";
			document.getElementById('__mask').style.display="none";//}}}
		}
		delegate.prototype.init  = function() {
			var target_code_div = undefined;

			//添加遮罩层//{{{
			var mask = document.createElement("div");
			mask.id="__mask";
			mask.innerHTML = "<style>#__mask{display:none;left:0px;"+
							"position:absolute;top:0px;background-image:none;"+
							"filter:alpha(opacity:50);z-index:10000}</style>";
			document.body.appendChild(mask);
			//}}}
			
			//创建HTML视图DIV//{{{
			var x = document.createElement("div");
			x.id = "__html_view";
			x.innerHTML = "<style>#__html_view{border:solid 2px red; overflow:hidden;"
						  + "background-color:#eee;position:absolute;"
						  + "width:690px;height:300px;z-index:12000;}</style>"
						  + "<b>百度空间文章HTML源码编辑(双击关闭该视图)</b><br/>";

			
			x.innerHTML += "<input type='button' id='load_article' value='加载'></input>";
			x.innerHTML += "<input type='button' id='update_article' value='更新'></input>";
			x.innerHTML += "<div style=\"text-align:left;\">" +
						   "<textarea id=\"__article\" style=\"margin:20px;width:80%;overflow:auto;height:75% !important;\"></textarea></div>";
			x.style.display="none";
			//}}}
			
			//创建代码视图DIV//{{{
			var y = document.createElement("div");
			y.id = "__code_view";
			y.innerHTML = "<style>#__code_view{border:solid 2px red; overflow:hidden;"
						  + "background-color:#eee;position:absolute;"
						  + "width:690px;height:300px;z-index:12000;}</style>"
						  + "<b>百度空间code编辑(双击关闭该视图)</b><br/>";

			y.innerHTML += "<input type='button' id='insert_code' value='插入'></input>";
			y.innerHTML += "<div style=\"text-align:left;\">" +
						   "<textarea id=\"__code\" style=\"margin:20px;width:80%;overflow:auto;height:75% !important;\"></textarea></div>";
			y.style.display="none";
			//}}}

			//双击关闭
			x.addEventListener("dblclick",function(){self.close()},false);
			y.addEventListener("dblclick",function(){self.close("__code_view")},false);
			document.body.appendChild(x);
			document.body.appendChild(y);

			//当前文章的内容
			var article_body = document.getElementById('spBlogText___Frame').contentDocument.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('body')[0];

			//标题栏增加HTML视图按钮
			var title_table = document.getElementById('m_blognew').getElementsByTagName('table')[0];
			if(title_table){
			//{{{
				document.getElementById('spBlogTitle').style["marginRight"]="10px";

				//插入按钮//{{{
				var td = title_table.tBodies[0].rows[0].cells[1];	
				var html_view_btn = document.createElement('input');
				var draft_href = document.getElementById('draftBar');
				html_view_btn.id="__show_html_view";
				html_view_btn.value='HTML视图';
				html_view_btn.type='button';

				var insert_code_btn = document.createElement('input');
				insert_code_btn.id="__insert_code";
				insert_code_btn.value='插入代码段';
				insert_code_btn.type='button';

				td.insertBefore(insert_code_btn,draft_href);
				td.insertBefore(html_view_btn,draft_href);//}}}

				//双击代码段时//{{{
				article_body.addEventListener('dblclick',function(e){
					if(e.target.tagName.toUpperCase() == 'DIV' && e.target.getAttribute('name').toLowerCase() == '__code_div'){
						self.close();
						if(y.style.display == "none"){
							var content = e.target.innerHTML;
							var code_text = document.getElementById("__code");
							code_text.value = content;
							target_code_div = e.target;
							self.show("__code_view");
						}
						else{
							target_code_div = undefined;
							var code_text = document.getElementById("__code");
							self.close("__code_view");
						}
						return false;
					}
					return false;
				},false);//}}}

				//插入代码//{{{
				document.getElementById("__insert_code").addEventListener('click', function(e) {
					self.close();
					if(y.style.display == "none"){
						target_code_div = undefined;
						self.show("__code_view");
					}
					else{
						target_code_div = undefined;
						self.close("__code_view");
					}
					return false;
				}, false);

				document.getElementById("insert_code").addEventListener('click', function(e) {
						var code_text = document.getElementById("__code");
						if(target_code_div != undefined){
						//{{{
							target_code_div.innerHTML = code_text.value;	
							var nodes = target_code_div.childNodes;
							var len = nodes.length;
							for(var i=0; i<len; i++){
								var node = nodes[i];
								if(node.nodeType == 1){
									if(node.tagName.toUpperCase() != 'PRE'){
										var t = '<pre>'+target_code_div.innerHTML+'</pre>';
										target_code_div.innerHTML = t;
									}
									break;
								}
							}//}}}
						}
						else{
							var content = "<div name='__code_div' style='background-color:#999999;border:2px solid #D1D7DC;font-family:Monaco,DejaVu Sans Mono,Bitstream Vera Sans Mono,Consolas,Courier New,monospace;font-size:15px;'>";
							content += '<pre>';
							content += code_text.value;
							content += '</pre>';
							content += "</div>";
							content += "<br/>";
							article_body.innerHTML += content;
						}
						target_code_div = undefined;
						self.close("__code_view");
				}, false);		//}}}

				//HTML视图//{{{
				document.getElementById("__show_html_view").addEventListener('click', function(e) {
					self.close("__code_view");
					if(x.style.display == "none"){
						var content = article_body.innerHTML;
						self.show();
						document.getElementById("__article").value=content;
					}
					else{
						self.close();
					}
					return false;
				}, false);		

				document.getElementById("load_article").addEventListener('click', function(e) {
						var content = article_body.innerHTML;
						document.getElementById("__article").value=content;
				}, false);		
				document.getElementById("update_article").addEventListener('click', function(e) {
						var content = document.getElementById("__article").value;
						article_body.innerHTML = content;
						self.close();
				}, false);//}}}
			//}}}
			}
		}
		delegate.__initilized__ = true;
	}	
}

window.addEventListener('load',  function() {
	var agent = new delegate();
	agent.init();
}, false);
