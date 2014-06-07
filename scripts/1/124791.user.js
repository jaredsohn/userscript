// ==UserScript==
// @name           YSSY.Black.List
// @namespace      YSSY.Black.List
// @description    YSSY.Black.List. Bitches are all around the world, just say f*** off and smile.
// @version        1.05
// @match          https://bbs.sjtu.cn/bbs*
// @match          https://bbs.sjtu.edu.cn/bbs*
// @match          https://bbs6.sjtu.edu.cn/bbs*
// @require        http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js
// ==/UserScript==


(function(){
	if(['bbs.sjtu.cn','bbs.sjtu.edu.cn','bbs6.sjtu.edu.cn'].indexOf(location.hostname) === -1){
		return;
	}
	if(!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g,'');
		};
    }
	function recent(sCurrent){
		var sBase='1.7';
		//$([]).on() works on 1.6 and after
		var aBase=sBase.split('.');
		var aCurrent=sCurrent.split('.');
		for(var i=0;i<aBase.length;++i){
			//console.log([parseInt(aBase[i]||0),parseInt(aCurrent[i]||0)]);
			if(parseInt(aBase[i]||0,10)>parseInt(aCurrent[i]||0,10)){
				return false;
			}
		}
		return true;
	}
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	function run(){
		jQuery(function($){
			var blacklist = (function(){
				var obj = JSON.parse(localStorage.blacklist||'{}');
				function isBlocked(name){
					return obj.hasOwnProperty(name);
				}
				function block(name){
					obj[name] = 1;
					localStorage.blacklist = JSON.stringify(obj);
				}
				function unblock(name){
					delete obj[name];
					localStorage.blacklist = JSON.stringify(obj);
				}
				function getList(){
					return Object.keys(obj);
				}
				return {
					isBlocked : isBlocked,
					block : block,
					unblock : unblock,
					getList: getList
				};
			})();
			function main(options){

				var opts={
					postlist:'table',
					post:'tr',
					id:'a'
				};
				$.extend(opts, options);

				var hiddenElems = [];
				function update(){
					$(opts.postlist+' '+opts.post).each(function(i, item){
						var $item = $(item);
						//console.log(this);
						if(blacklist.isBlocked($item.find(opts.id).text())){
							hiddenElems.push(item);
							$item.hide();
						}else if(hiddenElems.indexOf(item) !== -1){
							$item.show();
						}
					});
				}
				update();

				var wastebasket = $('<div id="blackListTrunk" class="blackListParent" style="position:fixed;right:10px;bottom:25px;background:#9b9;line-height:20px;padding:10px;text-align:center"><div style="position:relative"><div class="blackListclose" style="position:absolute;top:-10px;right:0;color:red;cursor:pointer">X</div></div>黑名单<div id="blackListTips">将讨厌的id拖入此处以屏蔽</div><div id="blackListMan" style="color:red;cursor:pointer">黑名单管理</div></div>').hide().appendTo($('body'));
				var manager=$('<div class="blackListParent" style="position:fixed;left:30%;top:40%;width:40%;background:#9b9;line-height:20px;padding:10px;text-align:center"><div style="position:relative"><div class="blackListclose" style="position:absolute;top:-10px;right:0;color:red;cursor:pointer">X</div></div>你已屏蔽如下id，单击可以解封<div id="blackListPop" style="cursor:pointer"></div></div>').hide().appendTo($('body'));

				function updateMan(){
					var list='';
					blacklist.getList().forEach(function(name){
						list+='<span style="padding:5px">'+name+'</span>';
					});
					$('#blackListPop').html(list);
				}

				jQuery.event.props.push('dataTransfer');

				$('#blackListMan').on('click',function(){
					manager.show();
					manager.on('click','span',function(){
						blacklist.unblock($(this).text());
						updateMan();
						update();
					});
				});

				$(opts.postlist).on('dragstart',opts.id,function(e){
					e.dataTransfer.setData('text/plain', $(this).text());
					// var id = $(this).text().trim();
					wastebasket.fadeIn(1000);
				});

				wastebasket.on('dragenter',false).on('dragover',false).on('drop',function(e){
					e.preventDefault();
					var id = e.dataTransfer.getData('text/plain');
					if(id){
						blacklist.block(id);
						$('#blackListTips').html('上网娱乐，请保持心情愉悦，不要轻易动怒 :)');
						updateMan();
						update();
					}
					return false;
				});

				$('.blackListclose').on('click',function(){
					$(this).parents('.blackListParent').hide();
				});
			}
			var YSSY_controller=[
					{
						path:['/bbsdoc','/bbstdoc'],
						fn:function(){
							main({
								postlist:'table[width="640"]:has(tr[bgcolor])',
								post:'tr:not([bgcolor])',
								id:'a[href^="bbsqry"]'
							});
						}
					},
					{
						path:['/bbscon','/bbstcon'],
						fn:function(){
							main({
								postlist:'body',
								post:'table:has(pre)',
								id:'a[href^="bbsqry"]'
							});
						}
					}
				];
			var pathname=location.pathname;
			for(var i=0;i<YSSY_controller.length;++i){
				for(var j=0;j<YSSY_controller[i].path.length;++j){
					if(pathname.indexOf(YSSY_controller[i].path[j])!==-1){
						YSSY_controller[i].fn();
						return true;
					}
				}
			}
		});
	}
	if((typeof jQuery!=='undefined')&&recent(jQuery.fn.jquery)){
		run();
	}else{
		addJQuery(run);
	}
})();