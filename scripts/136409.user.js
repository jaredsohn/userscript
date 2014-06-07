// ==UserScript==

// @name Songtaste Song Page 
// @authur xyhp915@gmail.com
// @namespace http://xyhp915.diandian.com
// @description  SongTaste Song 
// @include  http://*songtaste.com/song/*

// ==/UserScript==

        var  win = window,
	       doc = document,
		head = doc.getElementsByTagName('head')[0],
		scroff = doc.getElementsByTagName('script').item(0),
		html = doc.documentElement,
		_isIE = /msie/i.test(navigator.userAgent),
		_loadScript = function(src,callback){
			var script = doc.createElement('script'),
				attrs = {
					type : 'text/javascript',
					src : src
				},
				key;
			for(key in attrs)
					script[key] = attrs[key];
			_isIE ? (script.onreadystatechange = function(){
				if(this.readyState == 'complete'){
					callback();
				}
			}) : (script.onload = callback);
			
			head.insertBefore(script,scroff);
		},
		S = {
			init : function(){
                                 console.log('start');
				S.$player = $('#player');
				S.$playIcon = $('#playicon');
				S.title = $('title').text();
				win.playmedia1 = function(){
					var args = $.makeArray(arguments);
						S.playmedia1.apply(S,args);
				};
			},
			//create dom
			setUI : function(data){
				var tpl = '<div id="xy_operate_st" style="padding:5px;border:1px dotted #ddd;border-bottom:none;"><a style="color:green;font-weight:bold;" href="javascript:;" class="btn-down" data-src="'+data+'">一键下载</a></div>';
					S.$operate = $(tpl);
					S.$player.before(S.$operate);
				//event
					S.setEvent();	
			},
			setEvent:function(){
				var $opt = S.$operate,
					$btnDown = $opt.children('a.btn-down'),
					_down_frame = (function(){
							var iframe = doc.createElement('iframe');
								iframe.src = 'about:blank';
								iframe.style.display = 'none';
							doc.body.appendChild(iframe);
						  return iframe;
					})();
					
				$btnDown.bind('click',function(){
					 var $this = $(this),
					 	 url = $this.attr('data-src');
					 _down_frame.src = url;
				});
			},
			//Media Link
			playmedia1 : function(playIcon, strID,strURL,intWidth,intHeight,type, Head,st_songid,t) {
				playIcon.replace(" ","%20");
				strID.replace(" ","%20");
				
				var objDiv=document.getElementById(strID);
				document.getElementById(playIcon).style.display='none';
				
				if (!objDiv) return false;
				if (objDiv.style.display!='none') {
					objDiv.innerHTML='';
					objDiv.style.display='none';
				} else {
					if(strURL.indexOf('rayfile')>0) {
						var SongUrl = Head + strURL + GetSongType(type);
						objDiv.innerHTML=makemedia_html(SongUrl,intWidth,intHeight);
						objDiv.style.display='block';
					} else {
						$.ajax({
							type:'POST',
							url:'/time.php',
							cache:false,
							data:'str='+strURL+'&sid='+st_songid+'&t='+t,
							dataType:'html',
							success:function(data){
								//alert(data);
								if(data){
									objDiv.innerHTML=makemedia_html(data,intWidth,intHeight);
									objDiv.style.display='block';
									if(data.indexOf('duomi.com') > 0){
										$("#show_logo").show();	
									}
									S.setUI(data);
								}
							},
							error:function(data){
								//alert('error');
							}
							});
					}
					
				}
			}
		};
		
		if(typeof jQuery == 'function'){
				jQuery(S.init);
		}else{
				_loadScript('http://code.jquery.com/jquery.min.js',function(){
					jQuery(S.init);
				})
		}
	
