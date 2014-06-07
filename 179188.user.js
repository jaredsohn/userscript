// ==UserScript==
// @name         Instructables Enhancer
// @namespace    http://www.sorunome.de/
// @version      2.0.2
// @description  This enhances Instructables
// @match        http://www.instructables.com/*
// @grant        none
// @copyright    2013+, Sorunome
// @updateURL    http://ibles.sorunome.de/iblesEnhancerNoUpdate.user.js
// @downloadURL  http://userscripts.org/scripts/source/179188.user.js
// ==/UserScript==
/* Options settings in cookie 'iblesEnhancerSettings'
* 
* 1 - display comment trees
* 2 - check for updates
* 3 - old-style comments
* 4 - page buttons
* 5 - add 'ibles indicator
* 6 - fix line-break bug on editing the 'about me' zone
* 7 - fit ibles on screen
* 8 - hide (removed by author or community request)
* 9 - smaller font size
* 10 - make background a color
* 11 - enhance comment deleting
* 12 - add more comment buttons
* 13 - comments pager ajax
* 14 - save the ponies
* 15 - -> old, resetting
* 16 - display embed button
* 17 - awnsers navigation
* 18 - enable inline editor
* 19 - disable mouseover stats
* 
*/

//oh god 'ibles, Y U USE FUNCTIONS THAT YOU DON'T DECLARE!!!!!!! or should we blame coffeescript? SAME RESULT GAH
if(!String.prototype.replaceAll){
	/**
	 * ReplaceAll by Fagner Brack (MIT Licensed)
	 * Replaces all occurrences of a substring in a string
	 */
	String.prototype.replaceAll = function(token,newToken,ignoreCase ) {
		var _token,
			str = this + "",
			i = -1;
		if(typeof token === "string"){
			if(ignoreCase){
				_token = token.toLowerCase();
				while((
					i = str.toLowerCase().indexOf(
					token, i >= 0 ? i + newToken.length : 0
					)) !== -1
				){
					str = str.substring(0,i) +
						newToken +
						str.substring(i + token.length);
				}
			}else{
				return this.split(token).join(newToken);
			}
		}
	return str;
	};
}
(function($){
	var info = {
			version:'2.0.2',
			instantId:function(){
				var id = ls.get('iblesEnhancerInstantID');
				if(!id){
					id = Math.random().toString(36)+(new Date()).getTime().toString();
					ls.set('iblesEnhancerInstantID',id);
				}
				return id;
			}
		},
		ls = {
			getCookie:function(c_name) {
					var i,x,y,ARRcookies=document.cookie.split(";");
					for (i=0;i<ARRcookies.length;i++) {
						x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
						y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
						x=x.replace(/^\s+|\s+$/g,"");
						if (x==c_name) {
							return unescape(y);
							}
					}
				},
			setCookie:function(c_name,value,exdays) {
					var exdate=new Date();
					exdate.setDate(exdate.getDate() + exdays);
					var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
					document.cookie=c_name + "=" + c_value;
				},
			support:function(){
					try{
						return 'localStorage' in window && window['localStorage'] !== null;
					}catch(e){
						return false;
					}
				},
			get:function(name){
					if(this.support()){
						return localStorage.getItem(name);
					}
					return this.getCookie(name);
				},
			set:function(name,value){
					if(this.support()){
						localStorage.setItem(name,value);
					}else{
						this.setCookie(name,value,30);
					}
				},
		},
		api = {
			membersLite:[],
			getMemberLite:function(s,fn){
				var self = this;
				$.each(self.membersLite,function(i,inst){
					if(inst.screenName == s){
						fn(inst);
						return;
					}
				});
				$.getJSON('http://www.instructables.com/json-api/showAuthor?lite=true&screenName='+encodeURIComponent(s)).done(function(data){
					self.membersLite.push(data);
					fn(data);
				});
			}
		},
		updates = {
			check:function(doBubble){
					var self = this;
					$.getJSON('http://ibles.sorunome.de/iblesEnhancerVersion.php?id='+encodeURIComponent(info.instantId())+'&jsoncallback=?').done(function(u){
						if(u.version!=info.version){
							if(doBubble){
								$('body').append(
									$('<div>')
										.attr('id','iblesEnhancerUpdateWindow')
										.css({'position':'fixed','z-index':'900001','border':'1px black solid','background-color':'white','top':'5px','right':'5px','padding':'5px','width':'185px'})
										.append(
											$('<h4>').text('Instructables Enhancer'),
											$('<p>')
												.append(
													'There are updates available ('+u.version+'), to install it please go here: ',
													$('<a>')
														.attr('href',u.url)
														.text(u.url)
														.click(function(){
															setTimeout(function(){
																location.reload();
															},10000);
														})
												),
											$('<a>')
												.attr('onclick','return false;')
												.attr('href','#')
												.text('Dismiss')
												.click(function(){
													ls.set('iblesEnhancerDismiss','true');
													ls.set('iblesEnhancerDismissVersion',info.version);
													$('#iblesEnhancerUpdateWindow').css('display','none');
												})
										)
								);
							}else{
								$('#iblesEnhancerUpdateCont').text('New updates available ('+u.version+'), to install it click here: ')
									.append(
										$('<a>')
											.attr('href',u.url)
											.text(u.url)
											.click(function(){
												setTimeout(function(){
													location.reload();
												},10000);
											})
									);
							}
						}else{
							if(doBubble){
								ls.set('iblesEnhancerLastCheck',thisTime.toString());
							}else{
								$('#iblesEnhancerUpdateCont').text('No new updates available ')
									.append(
										$('<a>')
											.text('Check again')
											.click(function(e){
												e.preventDefault();
												$('#iblesEnhancerUpdateCont').text('checking for Updates');
												self.check();
												return false;
											})
									);
							}
						}
					});
				},
			bubble:function(){
				var self = this;
				if(options.get(2,'T')=='T'){
					var lastCheck = ls.get('iblesEnhancerLastCheck'),
						thisTime = new Date().getTime(),
						timeIntervalToCheck = 1000*3600;
					if(lastCheck==null){
						ls.set('iblesEnhancerLastCheck',(thisTime-timeIntervalToCheck).toString());
						lastCheck = ls.get('iblesEnhancerLastCheck');
						if(thisTime>=parseInt(lastCheck)+timeIntervalToCheck && (ls.get('iblesEnhancerDismiss')!='true' || ls.get('iblesEnhancerDismissVersion')!=info.version)){
							self.check(true);
						}
					}
				}
			}
		},
		options = {
			set:function(optionsNum,value){
					var self = this;
					if(optionsNum < 1 || optionsNum > 40){
						return;
					}
					var optionsString = ls.get('iblesEnhancerSettings');
					if(optionsString==null){
						ls.set('iblesEnhancerSettings','----------------------------------------');
						optionsString = ls.get('iblesEnhancerSettings');
					}
					optionsString = optionsString.substring(0,optionsNum-1)+value+optionsString.substring(optionsNum);
					ls.set('iblesEnhancerSettings',optionsString);
					self.refreshCache = true;
				},
			refreshCache:true,
			cache:'',
			get:function(optionsNum,defaultOption){
					var self = this,
						optionsString = (self.refreshCache?self.cache=ls.get('iblesEnhancerSettings'):self.cache),
						result;
					self.refreshCache = false;
					if(optionsString==null){
						return defaultOption;
					}
					result = optionsString.charAt(optionsNum-1);
					if(result=='-'){
						return defaultOption;
					}
					return result;
				},
			getChangeColorSetting:function(){
				return $('<span>')
							.append(
								'Make instructables ',
								$('<input>')
									.attr('type','text')
									.css({
										'margin':'0',
										'padding':'0 2px',
										'height':'17px',
										'font-size':'15px',
										'color':styles.getBgColor()
									})
									.val(styles.getBgColor())
									.keyup(function(){
										if(styles.setBgColor($(this).val())){
											$(this).css('color',$(this).val());
											styles.parse();
										}
									})
							)
			},
			optionHigh:false,
			html:function(settingsName,optionsNum,defaultOption,fn){
				var self = this;
				self.optionHigh = !self.optionHigh;
				return $('<tr>')
					.append(
						$('<td>')
							.attr('class','subtitleBold settings_body_profile_div_0')
							.css('background-color',self.optionHigh? '#F0EDEB' : '#E8E5E3')
							.append(settingsName),
						$('<td>')
							.css('background-color',self.optionHigh? '#F0EDEB' : '#E8E5E3')
							.append(
								$('<input>')
									.attr('type','checkbox')
									.attr((options.get(optionsNum,defaultOption)=='T') ? 'checked' : 'name','checked')
									.change(function(){
										($(this).is(':checked')) ? options.set(optionsNum,'T') : options.set(optionsNum,'F');
										if(fn===undefined){
											fn = function(){}
										}
										fn();
									})
							)
					);
			},
			htmlPage:function(){
				var self = this;
				return $('<div>')
					.attr('id','subPane')
					.append(
						$('<div>')
							.attr('class','subtitleBold settings_body_profile_div_0')
							.text('Instructables Enhancer Settings',0,'F'),
						$('<div>').text('Version '+info.version),
						$('<div>')
							.attr('id','iblesEnhancerUpdateCont')
							.text('checking for Updates')
							.ready(function(){
								updates.check(false);
							}),
						$('<div>')
							.append(
								$('<a>')
									.attr('href','http://www.instructables.com/id/Instructables-Enhancer-a-userscript-that-enhances-/')
									.text('Help!')
							),
						$('<table>')
							.attr('class','form')
							.append(
								self.html('Display comment trees',1,'F',function(){comments.parse()}),
								self.html('Check for new updates',2,'T'),
								self.html('Use old-style comments',3,'F',function(){comments.parse()}),
								self.html('Display Page-Buttons on Orangeboards',4,'T'),
								self.html('Fix Instructables indicator on comments',5,'T',function(){comments.parse()}),
								self.html('Fix line-break bug when editing the about zone',6,'T'),
								self.html('Make page change size with screen size (especially good with widescreen)',7,'F',function(){styles.parse()}),
								self.html('Hide (removed by author or community request)',8,'F',function(){comments.parse()}),
								self.html('Smaller font-size',9,'F',function(){styles.parse()}),
								self.html(self.getChangeColorSetting(),10,'F'),
								self.html('Enhance comment deleting',11,'T',function(){comments.parse()}),
								self.html('Add more comment buttons',12,'T',function(){comments.parse()}),
								self.html('Comments Pager AJAX',13,'T'),
								self.html('Save the ponies',14,'T'),
								self.html('Display embed button',16,'T'),
								self.html('Better answers navigation',17,'T'),
								self.html('Enable inline editor',18,'T'),
								self.html('Disable mouse-over stats on avatars',19,'F',function(){comments.parse()})
							),
						$('<div>')
							.css('font-size','0.8em')
							.append(
								'Instructables Enhancer written by ',
								$('<a>')
									.attr('href','http://www.sorunome.de')
									.text('Sorunome')
							)
					);
			},
			changeYouPage:function(){
				var self = this;
				self.moddedYouPage = true;
				$('.subtabs').mouseup(function(){
					$($($('.subtabs')[0]).children('.currentSubsection')[0]).attr('class','');
					$('#iblesEnhancerButton').css('color','#ff5200');
				});
				$($('.subtabs')[0]).append(
					$('<span>')
					.attr('id','iblesEnhancerButton')
					.text('Instructables Enhancer')
					.css({
						'font-size':'12px',
						'font-weight':'bold',
						'margin-right':'14px',
						'color':'#ff5200',
						'cursor':'pointer'
					})
					.mouseenter(function(){
						$(this).css('text-decoration','underline');
					})
					.mouseleave(function(){
						$(this).css('text-decoration','none');
					})
					.click(function(){
						$($($('.subtabs')[0]).children('.currentSubsection')[0]).attr('class','');
						$(this).attr('class','currentSubsection').css('color','#000');
						$('#subPane').replaceWith(self.htmlPage());
					})
				);
			},
			popUpMenu:function(){
					$('body').append(
						$('<div>')
							.attr('class','feedback')
							.css({
								'width':'90%',
								'height':window.innerHeight-100-((10*window.innerHeight)/100),
								'margin':'0 5%',
								'text-align':'left',
								'font-size':'12px',
								'font-weight':'normal'
							})
							.append(
								this.htmlPage()
									.css({
										'overflow-y':'auto',
										'height':'inherit'
									})
								,
								$('<a>')
									.css({
										'position':'absolute',
										'right':'-10px',
										'top':'-10px'
									})
									.append(
										$('<img>')
											.attr('src','/static/img/close.png')
									)
									.click(function(e){
										e.preventDefault();
										$(this).parent().remove();
										$('#modalMask').remove();
										return false;
									})
							),
							$('<div>')
								.attr('id','modalMask')
								.css({
									'position':'fixed',
									'left':'0',
									'top':'0',
									'width':'100%',
									'height':'100%'
								})
						);
				},
			moddedYouPage:false,
			addMenu:function(){
					var self = this;
					$('#you-menu').children('.dropdown-menu').append(
							$('<li>').attr('class','divider')
						).append(
							$('<li>').append($('<a>').text('Ibles Enhancer').click(function(e){
								e.preventDefault();
								$('#you-menu').attr('class','dropdown');
								self.popUpMenu();
								return false;
							}))
						);
					if(ls.get('iblesEnhancerLastVersion')!=info.version){
						ls.set('iblesEnhancerLastVersion',info.version);
						self.popUpMenu();
					}
					if(document.URL.split('.com')[1].split('/')[1].split('?')[0]=='you'){
						if(document.URL.split('.com')[1].split('/')[2]!=undefined && document.URL.split('.com')[1].split('/')[2].split('?')[0]=='settings'){
							self.changeYouPage();
						}
						$('#youcontent').bind('DOMNodeInserted',function(event){
							if ($('.subtabs')[0] && $($($('.subtabs')[0]).children()[0]).html() == 'Profile'){
								if(!self.moddedYouPage){
									self.changeYouPage();
								}
							}else{
								self.moddedYouPage = false;
							}
						});
					}
				}
		},
		comments = {
			moreButtons:function(){
				return [
					$('<input>')
						.attr({
							'class':'btn',
							'type':'button',
							'value':'Preview'
						})
						.click(function(e){
							e.preventDefault();
							var params,
								elem = $(this).parents('#CommentPoster'),
								txt = elem.find('#PostCommentFormBODY_editor').val();
							if(txt.length > 0){
								params = {
									action:'PREVIEW',
									body:escape(txt),
									files:elem.find('#commentFiles').val()
								};
								params['userId'] = elem.find('#PostTopicID').val();
								$.post('/ajax/comment',params,function(response){
									elem.find("#PreviewCommentBody").html(unescape(response.body));
									elem.find("#PreviewCommentImages").html(unescape(response.images));
									elem.find("#PreviewCommentFiles").html(unescape(response.files));
									return elem.find("#PreviewComment").show();
								},'json');
							}
						})
				,
					$('<input>')
						.attr({
							'id':'activateeditor',
							'class':'btn',
							'type':'button',
							'value':'Rich Editor'
						})
						.click(function(e){
							$(this).parents('#CommentPoster').find('.redactor_redactorAirComment.redactor_editorArea.redactor_editor').hide();
						})
				];
			},
			replyId:'none',
			parseHandlers:[
				[function(){return options.get(1,'F')=='T'},false,function(elem,self){ //trees
					$(elem).children('div.comment-txt').attr('style','overflow:visible;');
					if($(elem).children('.comment-info').find('.in-reply-to').is('a') || self.replyId!='none'){
						var temp;
						if(self.replyId!='none'){
							temp = self.replyId;
						}else{
							temp = $(elem).find('.in-reply-to').attr('href').substr(1);
						}
						if($.makeArray($('div#comment-'+temp)).length==0){
							$.ajax({
								url:'http://www.instructables.com/you/backtalk/?action=reply&commentId='+$(elem).attr('id').substr(8)+'&comments=all',
								async:false
							}).done(function(data){
								try{
									temp = data.split('<a name="'+$(elem).attr('id').substr(8)+'"></a>')[1]
												.split('<div class="comment-authorpicstats">')[0].split('margin-left: ')[1].split(';')[0];
								}catch(e){
									temp = '50px';
								}
							});
						}else{
							$('div#comment-'+temp).next().after(
								$('a[name="'+$(elem).attr('id').split('-')[1]+'"]').detach(),
								$(elem).detach(),
								$('<div>').css('display','none').text('THE GAME')
							);
							temp = (parseInt($('div#comment-'+temp).css('margin-left').substr(0,$('div#comment-'+temp).css('margin-left').length-2))+10).toString()+'px';
						}                    
						$(elem).css({
							'margin-left':temp,
							'padding':'5px',
							'border':'1px dashed #c2bab0',
							'border-top':'0 none'
						});
					}else{
						$(elem).css({
							'margin-left':'0px',
							'padding':'5px',
							'border':'1px solid #c2bab0',
							'margin-top':'4px'
						});
					}
				}],
				[function(){return options.get(3,'F')=='T'},false,function(elem){ //old-style comments
					if($(elem).hasClass('highlight')){
						bgColor = '#f2f7fe';
					}else{
						bgColor = '#fff';
					}
					$(elem).css({'background-image':'none','background':bgColor})
						.data('bgcolor',bgColor)
						.mouseenter(function(){
							$(this).css('background','#f5f5f5');
						})
						.mouseleave(function(){
							$(this).css('background',$(this).data('bgcolor'));
						})
						.children('.comment-actions').children('.fr.mt5').append(
							$(elem).children('.comment-info').children('.comment-date').children('a[id^="replytolink_"]').detach()
								.css({'color':'#ff5200','font-weight':'bold','margin-left':'5px','border':'1px solid #CDCDCD',
									'background':'#ff6906 url("/static/img/buttonBG.gif") repeat-x'})
								.mouseenter(function(){
									$(this).css('text-decoration','underline');
								})
								.mouseleave(function(){
									$(this).css('text-decoration','none');
								})
						).children('.flag-comment').css('color','#000')
							.mouseenter(function(){
								$(this).css('color','#ff5200');
							})
							.mouseleave(function(){
								$(this).css('color','#000');
							});
					var commentAuthor = $(elem).children('.comment-info').children('.comment-author');
					commentAuthor.children('.author-link').nextAll().remove();
					commentAuthor.html(commentAuthor.html().replace(' in reply to ',' says:'));
				}],
				[function(){return options.get(5,'T')=='T'},false,function(elem){ //'ibles indicator
					api.getMemberLite($(elem).find('.author-link').text(),function(data){
						if(!data.error){
							var color;
							if (data.instructablesCount<=7){
								color = '#1F8BC9';
							}else if(data.instructablesCount<=15){
								color = '#077634';
							}else if(data.instructablesCount<=25){
								color = '#EE282E';
							}else{
								color = '#FF7B00';
							}
							if($(elem).find('.memberstats span').length==0){
								$(elem).find('.memberstats').css({'background-color':color,'height':'62px'}).append(
									$('<span>')
										.css({'position':'relative','top':'-2px','font-size':'12px','left':'6px'})
										.text(data.instructablesCount)
								);
							}
						}
					});
				}],
				[function(){return options.get(8,'F')=='T'},false,function(elem){ //hide deleted
					if($(elem).children('.txt.comment-txt').html().trim() == '(removed by author or community request)'){
						$(elem).css('display','none');
					}
				}],
				[function(){return options.get(11,'T')=='T'},false,function(elem){ //enhance deleting
					$(elem).find('.delete-comment').replaceWith(
						$('<a>').data('id',$(elem).find('.delete-comment').attr('href')).text('[delete]').click(function(){
							if(confirm('Are you sure you want to delete this comment?')){
								var id = $(this).data('id');
								$.post('/edit/deleteComment',{
									commentId:id,
									userId:$('#userId').attr('value')
								}).done(function(){
									$('#comment-'+id).css('display','none');
								}).fail(function(){
									alert('There was a error deleting your comment');
								});
							}
						})
					);
				}],
				[function(){return options.get(19,'F')=='T'},false,function(elem){
					$(elem).find('.memberstats').mouseover(function(e){
							e.stopImmediatePropagation();
						}).mouseout(function(e){
							e.stopImmediatePropagation();
						});
				}],
				[function(){return true},false,function(elem,self){ //click on reply button
					$(elem).find('a[id^="replytolink_"]').click(function(){
						self.replyId = $(this).attr('id').substr(12);
						if(options.get(1,'F')=='T'){ //comment trees
							var temp = $(elem).css('margin-left');
							if(parseInt(temp.substr(0,temp.length-2))>100){
								$(elem).css('margin-left','100px').data('old-margin',temp); //post-comment-form
							}
							$(elem).unbind('DOMNodeRemoved').bind('DOMNodeRemoved',function(event){
								if($(this).find('.post-comment-box').context.id!='comment-'+self.replyId){
									$(this).css('margin-left',$(this).data('old-margin'));
								}
							});
						}
						if(options.get(12,'T')=='T'){ //cancle button
							$(elem).unbind('DOMNodeInserted').bind('DOMNodeInserted',function(event){
								if($(this).find('#PostCommentLink').length!=0){
									$(this).unbind('DOMNodeInserted').find('#PostCommentLink').after(
										'&nbsp;',
										$('<a>')
											.attr('id','cancelCommentButton')
											.text('[cancel]')
											.click(function(e){
												e.preventDefault();
												var temp = self.replyId;
												self.replyId = 'none';
												$('#reply'+temp).empty();
												return false;
											})
									);
									$(this).find('#ed_add_images_files').before(self.moreButtons());
								}
							});
						}
					});
				}]
			],
			comments:false,
			parseSingle:function(elem){
				var self = this;
				$.each(self.parseHandlers,function(hi,handler){
					if(handler[1]){
						handler[2](elem,self);
					}
				});
			},
			updateSettings:function(){
				var self = this;
				$.each(self.parseHandlers,function(hi,handler){
					handler[1] = handler[0]();
				});
			},
			parse:function(){
				var self = this;
				self.updateSettings();
				if(options.get(23,'T')=='T'){
					$('[id="ed_add_images_files"]').before(self.moreButtons());
				}
				if(self.comments!==false){
					$('.comments').replaceWith(self.comments);
				}
				self.comments = $('.comments').clone();
				$.each($('div[id^="comment-"]'),function(i,elem){
					self.parseSingle(elem);
				});
				//newley posted comment
				$('#ajax_newcomment_placeholder').unbind('DOMNodeInserted').bind('DOMNodeInserted',function(event){
					if($(this).children('script').html()!=undefined){
						self.parseSingle($(this).unbind('DOMNodeInserted').children('div[id^="comment-"]'));
					}
				});
				$('.comments').unbind('DOMNodeInserted').bind('DOMNodeInserted',function(event){
					if(self.replyId!='none' && $('#comment-'+self.replyId).next().next().next().next().is('script') && $('#comment-'+self.replyId).next().next().next().next().attr('src')==undefined){
						if(options.get(1,'F')=='T'){
							$('#comment-'+self.replyId).css('margin-left',$('#comment-'+self.replyId).data('old-margin')).next().next().css('display','none');
						}
						self.parseSingle($('#comment-'+self.replyId).next().next().next());
						self.replyId = 'none';
					}
				});
				
			}
		},
		styles = {
			element:$('<style>').attr('type','text/css').appendTo('head'),
			clear:function(){
				var self = this;
				self.element.html('');
			},
			add:function(s){
				var self = this;
				self.element.html(self.element.html()+s);
			},
			setBgColor:function(s){
				var $dummy = $('<span>');
				$dummy.css('color','rgb(255, 255, 255)');
				console.log($dummy.css('color'));
				if($dummy.css('color')!='rgb(255, 255, 255)' || s=='white' || s.toLowerCase()=='#ffffff'){
					console.log('setting');
					return true;
				}
				return false;
			},
			getBgColor:function(){
				var c = ls.get('iblesBgColor');
				if(!c){
					c = '#D44400';
				}
				return c;
			},
			parseHandlers:[
				[function(){return options.get(7,'F')=='T'},false,function(self){ // fit on screen
					self.add(
						'#omni{width:90% !important;}'+
						'#leftcontent{margin-left:25px !important;}'+
						'#centercontent{width:calc(100% - 222px) !important;margin-right:25px !important;}'+
						'.container{margin:0 25px !important;width:auto !important;}'+
						'#main-content,#main_content{width:calc(100% - 360px) !important;}'+
						'.photoset:before{background-image:none !important;}'+
						'#member-centercontent{width:calc(100% - 250px) !important;}'+
						'.member-hatbox.constrained,.boxgray_mid > table > tbody > tr > td:nth-child(1),#container,#editor-box{width:auto !important;}'+
						'.boxgray_mid>table,#ible-header:before,#ible-header{width:100% !important;}'+
						'.boxgray_mid>table>tbody>tr>td:nth-child(5){width:227px !important;}'+
						'ul.h-list>li.line-end{margin-right:26px !important;}'+
						'#gbl-header>.top-bar,#gbl-header>.bottom-bar{padding:0 140px !important;}'+
						'#content{width:calc(100% - 50px) !important;}'+
						'#horizontal_carousel{width:calc(100% - 83px) !important;}'+
						'#horizontal_carousel>.container{width:100% !important;}'+
						'#home-projects-advertiser>.container,#home-projects>.container,#home-hero .container{width:1042px !important;margin:0 auto !important;}'+
						'#gbl-footer .container{width:1049px !important;margin:0 auto !important;}'+
						'.container.main>a{width:143px !important;}'+
						'#ible-header.fixed{width:calc(100% - 190px) !important;}'+
						'#community-menu{width:471px !important;}'+
						'#group-container>.tab-container{width:calc(100% - 344px) !important;}'+
						'#group-container .tabbed-body,#group-container .tab-button-container,#group-container .group-entries,#group-container .groupFixed,#group_page_masthead{width:100% !important}'+
						'#group-body #omni{background:url(/static/img/group-page-divider.png) repeat-y scroll calc(100% - 15px) top #f3f3f3 !important;padding-bottom:0 !important;}'
					);
				}],
				[function(){return options.get(9,'F')=='T'},false,function(self){ // smaller font size
					self.add(
						'.featured-editor-content,.group-snippet .info p,#ible-steps-nav .description,.txt,.ible-author .byline .site{font-size:13px !important}'+
						'.cover-info,.photoset-seemore,.explore-sort,#ible-header .author-by-line,.bg-img.vote,.share-motto{font-size:14px !important}'+
						'.cover-stats,.member-profile-content,.bio{font-size:12px !important}'+
						'.activetags-toolbar a.btn,#ible-awards-bar .contest-entry p{font-size:11px !important}'+
						'.activetags-toolbar a.btn-close span,.search-ibles,.makeit-searchbar{font-size:15px !important}'+
						'.photoset-label,.dropdown-searchbar .input-append input{font-size:18px !important}'+
						'.btn{line-height:normal !important}'
					);
				}],
				[function(){return options.get(10,'F')=='T'},false,function(self){ // background color
					self.add(
						'body,html>body.topic,html>body.community-page,html>body.forum-list{background-color:'+self.getBgColor()+' !important}'
					);
				}],
			],
			updateSettings:function(){
				var self = this;
				$.each(self.parseHandlers,function(hi,handler){
					handler[1] = handler[0]();
				});
			},
			parse:function(){
				var self = this;
				self.updateSettings();
				self.clear();
				$.each(self.parseHandlers,function(hi,handler){
					if(handler[1]){
						handler[2](self);
					}
				});
			}
		},
		page = {
			firstTime:true,
			registeredHistoryHandler:false,
			createCommentPager:function(limit,max,offset){
				var self = this,
					pagerHTML;
				if(max!=0){
					pagerHTML = $('<div>')
						.attr('class','comments-pager')
						.append($('<table>')
								.attr('cellpadding','7')
								.append($('<tbody>')
										.append($('<tr>')
												.append(
													$('<td>').append((offset>0) ? $('<a>')
															.attr('class','pager-prev')
															.attr('rel','nofollow')
															.attr('href','?&sort=ACTIVE&limit='+limit.toString()+'&offset='+(offset-limit).toString()+'#DISCUSS')
															.text('« Previous') : ''
													),
													$('<td>').append($('<span>')
															.attr('class','pager-results')
															.text((offset+1).toString()+'-'+((offset+limit<max)?offset+limit:max).toString()+' of '+max.toString())
													),
													$('<td>').append((offset+limit<max) ? $('<a>')
															.attr('class','pager-next')
															.attr('rel','nofollow')
															.attr('href','?&sort=ACTIVE&limit='+limit.toString()+'&offset='+((offset+limit<max)?offset+limit:max).toString()+'#DISCUSS')
															.text('Next »') : ''
													)
												)
										)
								)
						);
					$('.comments-header.clearfix').after(pagerHTML);
					if($('#add-comment-bottom').length!=0){
						$('#add-comment-bottom').before(pagerHTML.clone());
					}else{
						$('.comments-container').append(pagerHTML.clone());
					}
					self.parse(true);
				}
			},
			parseHandlers:[
				[function(){return options.get(13,'T')=='T'},false,function(self){ // comment pager ajax
					$('.comments-header').bind('DOMNodeInserted',function(){
						$('.comments-pager a').off('click').click(function(e){
							var href = this.href;
							e.preventDefault();
							$('.comments').empty().append(
								$('<img>')
									.attr('src','http://www.instructables.com/static/img/loading.gif')
							);
							$.ajax(href).done(function(data){
								comments.comments = $(data).find('.comments');
								history.pushState({},$('title').text(),href);
								comments.parse();
								self.parse();
							});
						});
					}).trigger('DOMNodeInserted');
					if(!self.registeredHistoryHandler){
						var firstTime = true;
						$(window).bind('popstate',function(e){
							if(!firstTime){
								window.location = document.URL;
							}else{
								firstTime = false;
							}
						});
					}
				}],
				[function(f,ajax){return options.get(4,'T')=='T' && !ajax},false,function(self){ // comment pages
					var offset = 0,
						checkNum = 0,
						temp;
					if(document.URL.split('.com')[1].split('/')[3]!=undefined){
						checkNum = 3;
					}else if(document.URL.split('.com')[1].split('/')[2]!=undefined){
						checkNum = 2;
					}
					if(checkNum!=0){
						temp = document.URL.split('.com')[1].split('/')[checkNum].split('#')[0].split('&');
						for(var i=0;i<temp.length;i++){
							if(temp[i].substr(0,7)=="offset="){
								offset = parseInt(temp[i].substr(7));
							}
						}
					}
					if(document.URL.split('.com')[1] && document.URL.split('.com')[1].split('/')[1].split('?')[0]=='member'){
						$.ajax('http://www.instructables.com/member/statscard/?screenName='+document.URL.split('.com')[1].split('/')[2].split('?')[0].split('#')[0]+'&dataFormat=JSON').done(function(data){
							self.createCommentPager(15,eval('('+data+')').OrangeboardCount,offset);
						});
					}else if(document.URL.split('/id/')[1]!=undefined){
						$.ajax('http://www.instructables.com/api/'+document.URL.split('/id/')[1].split('/')[0]+'/instructable.xml?format=lite').done(function(data){
							self.createCommentPager(40,$(data).find('num_comments').text(),offset);
						});
					}
				}],
				[function(){return document.URL.split('.com')[1].split('/')[1].split('?')[0]=='you'},false,function(){ // edit menu editing
					var onEditMenu = false,
						parseAndBindEdit = function(){
							onEditMenu = true;
							if(options.get(6,'T')=='T'){
								var textarea = $('textarea[name="about"]');
								textarea.val(textarea.val().split('\n ').join('\n'));
								$('#settingsSubmitButton').mousedown(function(){
									textarea.val(textarea.val().split('\n ').join('\n&nbsp;').split('\n').join('&#11;'));
									onEditMenu = false;
								});
							}
						};
					$('#youcontent').bind('DOMNodeInserted',function(event){
						if($('.subtitleBold.settings_body_profile_div_0')[0]
								&& $('.subtitleBold.settings_body_profile_div_0').children('a').text() == 'view profile'
								&& $('textarea[name="about"]').is('textarea')){
							if(!onEditMenu){
								parseAndBindEdit()
							}
						}else{
							onEditMenu = false;
						}
					});
					if($('.subtitleBold.settings_body_profile_div_0')[0] && $('.subtitleBold.settings_body_profile_div_0').children('a').text() == 'view profile'){
						parseAndBindEdit();
					}
				}],
				[function(){return options.get(14,'T')=='F'},false,function(){ // save the ponies
					setTimeout(function(){
						$('body').empty().append(
							$('<div>')
								.css({
									'width':'100%',
									'height':'100%',
									'text-align':'center',
									'font-size':'50px'
								})
								.append(
									$('<img>')
										.attr('src','http://www.fimfiction-static.net/images/story_images/24058.png?1335992873')
										.css({
											'max-width':'100%',
											'max-height':'calc(100% - 100px)'
										}),
									$('<div>')
										.text('Why didn\'t you save the ponies? :(')
								)
						);
					},10*60*1000);
				}],
				[function(f){return options.get(16,'T')=='T' && document.URL.split('.com')[1].split('/')[1]=='id' && $('#jumpto-btngroup').length!=0 && f},false,function(){ // display embed button
					var ibleId = document.URL.split('/id/')[1].split('/')[0],
						iFrameHTML = '<iframe width="100%" height="600px" src="http://ibles.sorunome.de/ible.php?id='+ibleId+'" allowfullscreen mozallowfullscreen webkitallowfullscreen style="background-color:#ffffff;border:1px solid #000000;border-radius:5px;padding:10px;margin:10px 0;"></iframe>';
					$('#jump-to-step-btn').click(function(){
						$('#instructablesEnhancerEmbed').css('display','none');
						$('#instructablesEnhancerEmbedBtn').removeClass('active');
						$('#ible-header').parent().height($('#ible-header').outerHeight());
					});
					$('#ible-header-inner > .container')
						.after(
							$('<div>')
								.attr('id','instructablesEnhancerEmbed')
								.css({
									'background':'#f9f9f9',
									'padding':'15px 0',
									'border-top':'1px solid #dadada',
									'margin-top':'4px',
									'display':'none'
								})
								.append(
									$('<div>')
										.attr('class','bubble-tip')
										.css({
											'left':'314px',
											'top':'-15px',
											'width':'30px'
										}),
									$('<div>')
										.attr('class','container')
										.css('font-size','14px')
										.append(
											'iFrame:',
											$('<input>')
												.attr('type','text')
												.click(function(){
													this.select()
												})
												.val(iFrameHTML),
											'<br>JavaScript (requires jQuery):',
											$('<input>')
												.attr('type','text')
												.click(function(){
													this.select()
												})
												.val('<div id="iblesmain"></div><script type="text/javascript" src="http://ibles.sorunome.de/ible.php?id='+ibleId+'&js&idPrev=ibles"></scr'+'ipt>'),
											'<br>',
											$('<a>')
												.text('Preview')
												.click(function(e){
													e.preventDefault();
													$(this).after(iFrameHTML);
													$(this).off('click');
												})
										)
								)
						);
					$('#jumpto-btngroup').after(
						$('<div>')
							.attr('class','btn-group')
							.append( //1348
								$('<a>')
									.attr({
										'id':'instructablesEnhancerEmbedBtn',
										'class':'btn',
										'data-original-title':'embed'
									})
									.tooltip()
									.append(
										$('<i>')
											.attr('class','bg-icon')
											.css({
												'background-position':'-8px -1348px',
												'width':'11px',
												'height':'14px'
											})
									)
									.mouseenter(function(){
										$(this).find('i').css('background-position','-29px -1348px');
									})
									.mouseleave(function(){
										$(this).find('i').css('background-position','-8px -1348px');
									})
									.click(function(e){
										e.preventDefault();
										$(this).toggleClass('active');
										if($(this).hasClass('active')){
											$('#ible-steps-nav').addClass('collapsed');
											$('#jump-to-step-btn').removeClass('active');
											$('#instructablesEnhancerEmbed').css('display','block');
											$('#ible-header').parent().height($('#ible-header').outerHeight());
										}else{
											$('#instructablesEnhancerEmbed').css('display','none');
											$('#ible-header').parent().height($('#ible-header').outerHeight());
										}
									})
							)
					);
				}],
				[function(f){return options.get(17,'T')=='T' && document.URL.split('.com')[1].split('/')[1] == 'tag' && document.URL.split('.com')[1].split('/')[2]!=undefined && document.URL.split('.com')[1].split('/')[2].split('?')[0]=='type-question' && f},false,function(){ // better awnsers navigation
					var json = eval('('+document.documentElement.innerHTML.split('var categories = ')[1].split(';')[0]+')'),
						category = (document.URL.split('category-')[1]||'').split('/')[0].split('?')[0],
						channel = (document.URL.split('channel-')[1]||'').split('/')[0].split('?')[0],
						params = '?'+(document.URL.split('?')[1]||'');
					category = ((category.match(/^[a-zA-Z0-9-]+$/g)&&category)||'');
					channel = ((channel.match(/^[a-zA-Z0-9-]+$/g)&&channel)||'');
					params = ((params.match(/^[a-zA-Z0-9-%&?=]+$/g)&&params)||'');
					pubjson = json;
					$('#answers-search-header .fr').append(
						$('<ul>')
							.attr('class','h-list explore-icons clearfix')
							.append(
								$('<li>')
									.append(
										$('<a class="explore-all'+(category==''?' selected':'')+'" href="/tag/type-question'+params+'" data-original-title="Everything">Everything</a>').tooltip()
									)
							)
					);
					$.each(json,function(i){
						var name = i.charAt(0).toUpperCase()+i.slice(1);
						$('#answers-search-header .fr>.h-list.explore-icons.clearfix').append(
							$('<li>')
								.append(
									$('<a class="explore-'+(i!='technology'?i:'tech')+(i==category?' selected':'')+'" href="/tag/type-question/category-'+i+params+'" data-original-title="'+name+'">'+name+'</a>').tooltip()
								)
						);
					});
					$('#answers-search-header .header-search').css('right','350px');
					$('#answers-search-header .fl').empty().append(
						'<img alt="ask '+(category!=''?category:'everything')+'" src="/static/img/explore/category-'+(category!=''?category:'all')+'.png">',
						$('<h1 class="fr header-title">'+(category!=''?category:'everything')+'</h1>')
							.css({
								'color':'#333',
								'font-size':'36px',
								'margin-left':'10px',
								'font-family':'CompleteInHimPro,Arial,Helvetica,sans-serif'
							})
					);
					$('#answers-search-sortbar').before(
						$('<div>')
							.attr('class','explore-content')
							.append(
								$('<div>')
									.attr('class','btn-toolbar clearfix')
									.append(
										$('<div>')
											.attr('class','types-toolbar fl')
											.append(
												$('<div>')
													.attr('class','btn-group categories-menu')
													.append(
														$('<a>')
															.attr({
																'data-toggle':'dropdown',
																'class':'btn dropdown-toggle'
															})
															.append(
																$('<i>')
																	.attr('class','bg-icon category-'+(category!=''?category:'all')),
																'&nbsp;'+(category!=''?category.charAt(0).toUpperCase()+category.slice(1):'Everything')+'&nbsp;',
																$('<span>')
																	.attr('class','caret')
															),
														$('<ul>')
															.attr('class','dropdown-menu')
															.append(
																'<li'+(category==''?' class="active"':'')+'><a href="/tag/type-question'+params+'"><i class="icon-category-all"></i>Everything</a></li>',
																$.map(json,function(val,i){
																	return '<li'+(i==category?' class="active"':'')+'><a href="/tag/type-question/category-'+i+params+'"><i class="icon-category-'+i+'"></i>'+i.charAt(0).toUpperCase()+i.slice(1)+'</a></li>';
																}).sort()
															)
													),
												$('<div>')
													.attr('class','btn-group channels-menu')
													.append(
														$('<a>')
															.attr({
																'data-toggle':'dropdown',
																'class':'btn dropdown-toggle'
															})
															.append(
																'&nbsp;'+(channel!=''?(json[category]?(
																	$.map(json[category],function(val){
																		if(val.title==channel){
																			return val.displayName;
																		}
																	})[0]
																):channel):'All Channels')+'&nbsp;',
																$('<span>')
																	.attr('class','caret')
															),
														$('<ul>')
															.attr('class','dropdown-menu dropdown-scroll')
															.append(
																(category!=''?
																	$.map(json[category],function(val,i){
																			return '<li'+(val.title==channel?' class="active"':'')+'><a href="/tag/type-question/category-'+category+'/channel-'+val.title+params+'">'+val.displayName+'</a></li>';
																	}).sort()
																:
																	$.map(json,function(channelsContent,categoryName){
																		return $.map(channelsContent,function(val,i){
																			return '<li'+(val.title==channel?' class="active"':'')+'><a href="/tag/type-question/category-'+categoryName+'/channel-'+val.title+params+'">'+val.displayName+'</a></li>';
																		})
																	}).join().split(',').sort(function(a,b){
																		var as = a.split('channel-')[1].split('"')[0].split('?')[0]+a.split('category-')[1].split('/')[0],
																			bs = b.split('channel-')[1].split('"')[0].split('?')[0]+b.split('category-')[1].split('/')[0];
																		return as==bs?(a==b?0:a<b?-1:1):as<bs?-1:1;
																	})
																)
															)
													)
											),
										$('<div>')
											.attr('class','sort-toolbar fr')
									)
							)
					);
					$('.sort-toolbar.fr').append($('#answers-search-sortbar').detach());
				}],
				[function(f){return options.get(18,'T')=='T' && document.URL.split('.com')[1].split('/')[1] == 'id' && $('#author-options').length!=0 && f},false,function(){ // indline editor
					head.js('http://ckeditor.com/ckeditor_4.3_beta/ckeditor.js',
						'/static/js/ckeditor/config.js',
						'/static/js/ckeditor/adapters/jquery.js',
						function(){
							var inlineEditors = 0,
								activeEditor = 0,
								activeId = '',
								instructableId = $('#author-options .button.newrightbar_a_4').attr('href').split('instructableId=')[1],
								stepIds = [],
								saveTryCount = 0,
								setStepData = function(element){
									var stepNum = $(element).parents('.step-container').find('.step-title').text();
									stepNum = parseInt(stepNum.substring(stepNum.indexOf(" ")+1,stepNum.indexOf(":"))||0);
									$(element).data({
										'ready':true,
										'stepId':stepIds[stepNum],
										'title':($(element).parents('.step-container').find('.step-title').length!=0?
													$(element).parents('.step-container').find('.step-title').text().split(" ").splice(2).join(" ")
												:
													$('#ible-header .fn[itemprop="name"]').text()),
										'files':$.map($(element).parents('.step-container').find('.photoset-photo'),function(elem){
													return $(elem).attr('data-notes-lookup-id').split('-')[0];
												}).join(' ')
									});
								},
								saveStep = function(elem){
									if($(elem).data('ready')){
										saveTryCount = 0;
										$('#iblesEnhancerInlineEditSaveIndicator').remove();
										$(elem).after(
											$('<div>')
												.attr('id','iblesEnhancerInlineEditSaveIndicator')
												.css({
													'font-size':'11px',
													'text-align':'right',
													'color':'#555555'
												})
												.text('Saving...')
										)
										$.post('/id/edit',{
											body:$(elem).html(),
											files:$(elem).data('files'),
											instructableId:instructableId,
											stepId:$(elem).data('stepId'),
											title:$(elem).data('title')
										}).done(function(data){
											if(data.body){
												$(elem).html(data.body);
												$('#iblesEnhancerInlineEditSaveIndicator').text('Saved');
												setTimeout(function(){
													$('#iblesEnhancerInlineEditSaveIndicator').fadeOut(1600,function(){
														$(this).remove();
													});
												},5000);
											}else{
												$('#iblesEnhancerInlineEditSaveIndicator').css('color','#FF0000').text('An error occured while saving');
											}
										});
									}else{
										saveTryCount++;
										if(saveTryCount<=10){
											setTimeout(saveStep,1000);
										}
									}
								};
							CKEDITOR.disableAutoInline = true;
							CKEDITOR.config.allowedContent = true;
							CKEDITOR.config.UseBROnCarriageReturn = true;
							$('.txt.step-body').dblclick(function(){
								if(!$(this).attr('id')){
									var elem = this;
									$(this).attr('id','editable'+inlineEditors);
									inlineEditors++;
									if(stepIds.length==0){
										$.ajax('/id/edit/?instructableId='+instructableId).done(function(data){
											var $ep = $(data);
											$.post('/id/edit',{
												body:$ep.find('#description').val(),
												files:$ep.find('#files').val().split(',').join(' '),
												instructableId:instructableId,
												stepId:data.split('new Editor("')[1].split('"')[0],
												title:$ep.find('#title').val()
											}).done(function(data){
												stepIds = $.map(data.images,function(val,i){
													return i;
												});
												setStepData(elem);
											});
										});
									}else{
										setStepData(this);
									}
								}
								if(activeEditor){
									if(activeEditor.element.getId() == activeId){
										return;
									}
									activeEditor.destroy();
								}
								activeEditor = CKEDITOR.inline($(this).attr('id'));
								$(this).attr('contenteditable','true').css({
									'box-shadow':'inset 0px 0px 20px 3px #ddd, inset 0 0 1px #000',
									'outline':'none',
									'background':'#eeeeee',
									'cursor':'text'
								}).on('blur',function(){
									saveStep(this);
									$(this).attr({
										'contenteditable':'false',
										'style':''
									}).off('blur');
									activeId = '';
									activeEditor.destroy();
									activeEditor = 0;
								}).focus();
							});
						});
				}]
			],
			updateSettings:function(ajax){
				var self = this;
				$.each(self.parseHandlers,function(hi,handler){
					handler[1] = handler[0](self.firstTime,ajax);
				});
			},
			parse:function(ajax){
				var self = this;
				self.updateSettings(ajax);
				$.each(self.parseHandlers,function(hi,handler){
					if(handler[1]){
						handler[2](self);
					}
				});
				self.firstTime = false;
			}
		};
	styles.parse();
	options.addMenu();
	updates.bubble();
	comments.parse();
	page.parse();
	options.set(15,'-');
})(jQuery)