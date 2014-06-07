// ==UserScript==
// @name           Xianmang helper
// @namespace      xianmang_helper
// @description    让鲜芒变得更好用
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.xianmang.com/*
// @include        http://localhost:4850/*
// @author         Ken
// @version        0.2
// ==/UserScript==

//the XMH singleton
var XMH=(function(){
	var vars={};
	vars.body_id=$('body').attr('id');
	vars.logged_in=$('#hd-main div.user-status a#h-msg').length==1;
	return{
		get_bodyid:function(){return vars.body_id},
		get_loggedin:function(){return vars.logged_in},
		init:function(){
			XMH.cmt_hlpr.init();
			XMH.threads_hlpr.init();
		}
	}
})();
XMH.cmt_hlpr={
	//comments helper
	//show index
	
	//buttons
	default_btns:[
		{name: '忽略',onclick: 'ignore'}, 
		//{name: '只看',onclick: 'view_only'}, 
		{name: '高亮',onclick: 'highlight'}
	],
	add_buttons:function(){
        try {
            var btns = [], jbtns = [];
            if (arguments[0] instanceof Array) 
                btns = arguments[0];
            else 
                btns.push(arguments[0]);    
            for (var i = 0, len = btns.length; i < len; i++) {
                this.each(function(){
					//closure for the variable btns
					var callback = (function(){
						var onclick=btns[i].onclick;
						return function(e){
							var handler = eval('XMH.cmt_hlpr.' + onclick);
							if (handler) {
								handler.call(this);
							}
							else {
								throw new Error('callback not defined!');
							}
							e.preventDefault();
						}
					})();
                    $('<a href="#" style="font-weight:normal;font-size:12px;text-decoration:none"> - ' + btns[i].name + '</a>').appendTo(this).bind('click', callback);
                });          
            }
        } 
        catch (e) {
        	GM_log(e);
        }		
	},
	ignore:function(e){
		$(this).parents('li.comment-li').hide('fast');
	},
	_get_entries:function(btn,the_author){
		var li=$(btn).parents('li.comment-li'),
			id_re=/\/(\d+)\/m\.jpg/;
			author_id=$('img',li).attr('rel').match(id_re)[1];
			GM_setValue('authorid',author_id);
			return $.grep($('#comments li.comment-li:not(.c-tmp)'),function(n,i){
				var cur_rel=$('div.comment-main>div.user-avatar>a>img',n).attr('rel'),
					cur_id=cur_rel.match(id_re)[1];
				if (the_author) {
					return cur_id == author_id
				}else{
					//console.log($('img', n).attr('rel'));
					return cur_id != author_id;
				}
			});
	},
	view_only:function(e){
		$.each(XMH.cmt_hlpr._get_entries(this,false),function(){
			$(this).hide('fast');
		})
	},
	highlight:function(e){
		$.each(XMH.cmt_hlpr._get_entries(this,false),function(){
			$('div.comment-main',this).removeClass('xmh-hl');
		});
		$.each(XMH.cmt_hlpr._get_entries(this,true),function(){
			$('div.comment-main',this).toggleClass('xmh-hl');
		});
	},
	//ajax load next page
	get_next_page:(function(){
		var cur=1,
			total=$('#comments div.pagination>ul>li').length-2,
			//pag_re=/page\=(\d+)/,
			url_pattern=window.location;
		return function(btn){
			if(cur<total){
				cur+=1;
				var url=url_pattern+'&page='+cur,$btn=$(btn),$loader=$('#loader');
				$btn.hide();
				$loader.show();
				$.get(url,function(data){
					var $new_entries=$('#comments>ul>li:not(.c-tmp)',data);
					
					$new_entries.appendTo('#comments>ul');
					XMH.cmt_hlpr.add_buttons.call($('div.reply-button',$new_entries), XMH.cmt_hlpr.default_btns);
					if(cur!=total)$btn.show();
					$loader.hide();
				})
			}
		}
	})(),
	init:function(){
        try {
			var that=this;
			
			//Comments
            that.add_buttons.call($('#comments div.reply-button'), that.default_btns);
			
			//Pag
			GM_addStyle('#pag,#loader{cursor:pointer;width:100%;border:1px solid #E0F0FA;font-weight:bold;-moz-border-radius:3px;padding:4px;text-align:center;font-size:14px;}\
						#pag:hover{background-color:#E0F0FA;color:#3290D8}\
						#pag a{text-decoration:none!important;}\
						.xmh-hl{border-width:0 0 0 2px;border:solid #F8A226;-moz-border-radius:4px}');
			if ($('#comments div.pagination li').length > 0) {
				$('#comments div.pagination').hide().after('<div id="pag">更多...</div>').after('<div id="loader" style="display:none">载入中...</div>');
				$('div#pag').bind('click', function(e){
					that.get_next_page(this);
					e.preventDefault();
				});
			}
        } 
        catch (e) {
        	GM_log(e);
        }

	}
};
XMH.threads_hlpr={
	//fast post-original text only
	fp_form:{
		create:function(action,options){
			//@param string action: the action attrib of the form
			//@param array options: e.g [{l:'lable-text',t:'input',n:'name',v:'value',tp:'type'}]
			var $f=$('<form id="fp_form" method="post" action="'+action+'">');
			for (var i=0,len=options.length;i<len;i++){
				$('<div class="f-row">').addClass(options[i].tp||'')
					.append($('<label>').html(options[i].l))
					.append(
					$(document.createElement(options[i].t))
						.attr({
							name:options[i].n,
							value:options[i].v||''
						})
						.attr(options[i].t!='textarea'?{type:options[i].tp||'text'}:{})
					).appendTo($f);
			}
			$f.append('<button type="submit">提交</button>');
			return $f;
		},
		init:function(){
			var that=this;
			GM_addStyle('	#fp_form{background:#FEF6CB;-moz-border-radius:3px;padding:1em 2em;}\
							#fp_form div.f-row{margin:1em}\
							#fp_form label{float:left;margin:0 0 .5em 0;}\
							#fp_form input,#fp_form textarea{width:100%;}\
							#fp_form textarea{height:7em;}\
							#fp_form button{margin:.5em 0 1em 1em}\
							#fp_indicator{font-size:12px!important;font-weight:normal!important;margin:0 0 0 .8em;color:#F8A226;}');
			$.get('post',function(data){
				var token=$('input[name=__RequestVerificationToken]',data).val();
				var cate_id=$('ul.pl-category a:eq(1)')[0].href.match(/id=([0-9A-Z]+)$/)[1],
				fp_options=[
					{l:'<strong>标题</strong><span>(必填,不能超过100个字符)</span>',t:'input',n:'topic.title',v:''},
					{l:'',t:'input',n:'topic.type',v:'0',tp:'hidden'},
					{l:'',t:'input',n:'__RequestVerificationToken',v:token,tp:'hidden'},
					{l:'',t:'input',n:'categoryid',v:cate_id,tp:'hidden'},
					{l:'<strong>内容</strong><span>(必填,不能超过10,000个字符)</span>',t:'textarea',n:'topic.content',v:'',tp:''}
				];
				$('h3.subtitle:eq(0)').append('<a href="#fp_form" id="fp_indicator">快速发帖&raquo;</a>')
				var $f=that.create('post',fp_options);
					$f.appendTo($('div.b-content'));
					$f.before($('<h3 class="subtitle">快速发帖</h3>'));
					$('button',$f).addClass('xm-orange');
			});
		}
	},
	init:function(){
		if(XMH.get_bodyid()=='postlist'&&XMH.get_loggedin()){
			var that=this;
			that.fp_form.init();
		}
	}	
};
XMH.init();
