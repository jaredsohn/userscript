// ==UserScript==
// @name           cleantbaidu
// @namespace      http://argszero.appspot.com/userjs
// @description    点击左上角的按钮，进入简洁浏览页面，类似聊天窗口模式
// @include        http://t.baidu.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://dev.jquery.com/~john/ticket/fx-rewrite2/easing.js
// @require        http://dev.jquery.com/~john/ticket/fx-rewrite2/color.js
// ==/UserScript==

(function(){
	var href = window.location.href;
	if(/.*argszero.*/.test(href)){
		href=href.replace('&myname=argszero','');
		href=href.replace('?myname=argszero','');
		$('<span>保留最新<input type="text" value="50" id="maxItems"/><span>条记录,刷新间隔为</span><input type="text" value="1000" id="delay"/><span>毫秒</span>').prependTo('body');
		$('<input type="button" value="view normal" />').prependTo('body').click(function(){
			window.location.href=href;
		});
	}else{
		$('<input type="button" value="view clean" />').prependTo('body').click(function(){
			if(/.*\?.*/.test(href)){
				window.location.href=href+'&myname=argszero';
			}else{
				window.location.href=href+'?myname=argszero';
			}
		});
		return;
	}
	$('div').hide();
	var c = $('<div class=".console"></div>').appendTo('body');
	var lastId='';
	var bgi=0;
	var bg=['#eeeeee','#f5f5f5'];
	var fecth= function(){
		$.ajax({ url: href, 
			error:function(response){
				try{
					setTimeout(fecth,parseInt($('#delay').val()));
				} catch (e) {
					setTimeout(fecth,1000);
				}
			},
			success: function(repsonse){
					 try{
						 var msgs=[];
						 var find=false;
						 $(repsonse).find('tr[id^="message_tr_"]').each(function(i,n){
							 var tr=$(n);
							 tr.find('a').css('color','#ddd');
							 var id=tr.attr('id');
							 if(!find&&id!=lastId){
								 msgs.push({id:id,
									 msg:tr.find('.talk-words'),
									 img:tr.find('.talk-img'),
									 opt:tr.find('.talk-handle>.opt'),
									 transmit:tr.find('.transmit-words')});
							 }else{
								 find=true;
							 }
						 });
						 if(msgs.length>0){
							 lastId=msgs[0].id;
						 }
						 for(i=msgs.length-1;i>=0;i--){
							 var msg =msgs[i].msg;
							 var transmit =msgs[i].transmit;
							 var opt = msgs[i].opt;
							 var item = $('<div class="item"></div>').prependTo(c);
							 item.css('border-top','1px solid #ddd');
							 item.css('border-bottom','1px solid #fff');
							 bgi=Math.abs(bgi-1);
							 item.css('background-color',bg[bgi]);
							 msg.css('color','red')
								 .css('max-width','100%')
								 .css('max-width','100%')
								 .css('font-size','12px');
							 transmit.css('max-width','100%')
								 .css('background-color','#F5F5F5')
								 .css('padding-left','50px')
								 .css('font-size','12px');
							 item.prepend(transmit);
							 item.prepend(msgs[i].img);
							 item.prepend(msg);
							 opt.find('br').remove();
							 msg.append(opt);
							 msg.animate({'color':'orange'},3000).animate({'color':'red'},3000).animate({'color':'black'},3000);	
						 }
						 c.children(".item:gt("+$('#maxItems').val()+")").remove();
						 setTimeout(fecth,parseInt($('#delay').val()));
					 } catch (e) {
						 setTimeout(fecth,1000);
					 }
				 }});
	};
	fecth();
})();
