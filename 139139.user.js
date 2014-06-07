// ==UserScript==
// @name        Menu Bar framework
// @namespace   *
// @description Greasemonkey plugin development framework, add a useful and functional menu bar in the page.
// @include     *
// @require     http://code.jquery.com/jquery.min.js
// @require     http://caoglish.github.io/HelperBar-Framework/lib/0.5.0/HelperBar.min.js
// @version     0.5.0
// ==/UserScript==
(function (window,undefined) {
    "use strict";
    window.optSetter = (function () {
        var ITEM_OPTSET = 'HelperBar_optset';
        return {
            set: function (opt) {
                HelperBar.data(ITEM_OPTSET, opt);
            },
            init: function (opt) {
                HelperBar.data(ITEM_OPTSET);
                var value = opt || 0;
                this.set(value);
            },
            get: function () {
                return HelperBar.data(ITEM_OPTSET);
            }
        };
    })();
})(window);

//extend HelperBar and jQuery plugin
(function ($,window,HelperBar,undefined){
	$.tag = HelperBar.tag;
	
	
	HelperBar.fn.aboutMsg=function(){
		var text=Array.prototype.slice.call(arguments);
		var $text=$.tag('div');
		for (var i in text){
			$text.append($.tag('div').text(text[i]));
		}
		this.addmsg($text,function($msg){
			$msg.on('click',function (){
				$(this).remove();
			});
		});
		return this;
	};
	
	HelperBar.fn.demoTitle=function(title){
		var $title=$.tag('span').css('color','green').append(
						$.tag('b').text(title)
					);
		return this.title('[').title($title).title(']');
	};
	
	var random_color=function (){
		var rand_0_255=function (){
					return Math.round(Math.random()*255+1);
				};
		var rand_color=[];
		for(var i=0;i<3;i++) {
			var element=rand_0_255().toString(16);
			rand_color.push(element.length<2?'0'+element:element);
		}
		return '#'+rand_color.join("");
	};
	
	HelperBar.fn.extend({
		rainbowMsg:function(msg,color_filter){
			color_filter=color_filter||[];
			var filter_random_color=function (){
				var this_color=random_color();
				if($.inArray(this_color,color_filter)>0) this_color=filter_random_color();
				return this_color;
			};
			this.addmsg(msg,filter_random_color(),function($msg,msg,style){
					$msg.hover(
						function(){
							$(this).css(style);
						},function (){
							$(this).css('color',filter_random_color());
						}
					); 
				});
			
			return this;
		},
		flashRainbowMsg:function(msg){
			var flash=function($msg,color1,color2){
				$msg.css({'color':color1});
				setTimeout(function (){
						flash($msg,color2,random_color());
					}, 386);
			};
			this.addmsg(msg,random_color(),function($msg,msg,style){
				flash($msg,style.color,random_color());
			});
			return this;
		},
		realRainbowMsg:function(msg){
			var color_filter=(function(){
				var color_list=[];
				for(var color_el=0;color_el<255;color_el++){
					var color=[];
					for(var i=0;i<3;i++){
						color.push(color_el.toString(16));
					}
					color_list.push('#'+color.join(""));
				}
				return color_list;
			})();
			for (var i = 0, len = msg.length; i < len; i++) {
				this.rainbowMsg(msg[i],color_filter);
			}
		}
	});
})(jQuery,window,HelperBar);


//options
(function ($,window,undefined){
	
	var options={
		exampleDefault:{},
		example1:{
				bar_title:'Helper Bar Demo(black)',
				bar_foot:'verions:'+HelperBar.version(),
				foot_mode:'show',
				foot_size:'8px',
                safe_mode: 'unsafe',
                hide_mode: 'rightClick',
				hide_effect:'slide',
				border_radius: '0px',
                warn_size:'32px',
				warn_color:'yellow',
				warn_mode:'log',
                bar_bg_color: 'black',
                bar_opacity: '0.8',
                bar_font_color: 'white',
				menu_show_effect:'slide',
				menu_width:'auto',
                menu_bg_color: '#111111',
                menu_hover_bg_color: '#333333',
                menu_font_color: '#EAFFED',
				menu_separator_color: 'black',
				msg_click:function(){
					this.cls().clsTitle();
				},
				warn_callback:function($msg,msg,style){
					this.addmsg('==warn_callback==');
				}
		},
		example2:{
				bar_title:'Helper Bar Demo(Pink)',
				bar_foot:'verions:'+HelperBar.version(),
				foot_mode:'show',
				foot_size:'8px',
                safe_mode: 'safe',
                hide_mode: 'notOnMenu',
				border_radius: '86px',
                warn_size:'32px',
				warn_color:'black',
				warn_mode:'log',
                bar_bg_color: 'pink',
                bar_opacity: '0.8',
                bar_font_color: '#005500',
				menu_width:'230px',
                menu_bg_color: '#ff00cc',
                menu_hover_bg_color: '#ff33cc',
                menu_font_color: 'yellow',
				menu_separator_color: 'yellow',
				font_family:'MuseoLight,Arial,Helvetica,Sans-Serif',
				bar_click:function(){this.cls().clsTitle();}
		},
		example3:{
			bar_title:'Helper Bar Demo(blue)',
			bar_foot:'Blue Theme Demo',
			foot_size:'86px',
			foot_mode:'hide',
			menu_width:'260px',
			border_radius: '10px',
			bar_bg_color: 'blue',
			bar_font_color: 'gray',
			menu_bg_color: 'Navy',
			menu_font_color: 'yellow',
			menu_hover_bg_color: 'gray',
			menu_separator_color: 'green',
			warn_callback:function($msg,msg,style){
					this.addmsg('more....');
				}
		}
	};
	
	window.optionsList=[options.exampleDefault,
							options.example1,
							options.example2,
							options.example3];
})(jQuery,window);

(function( $,undefined ){
	"use strict";
	var bar; 
	var optionsList=window.optionsList;
	
	//[todo] rewrite mouse_position handler
	var mp_handler=function (e){ bar.clsFoot().foot("[X: " + e.pageX + "][Y: " + e.pageY+']');};

	var menuEventHandler={
		//function eventHandler.
		go_top:function(){
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		},
		go_bottom:function(){
			$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
		},
		//[todo] rewrite mouse_position handler
		mouse_position:function(){
			var mouse_position_on = this.cache('toggle')||'0';
			if(mouse_position_on ==='1'){
				$(document).off('mousemove',mp_handler);
				this.cache('toggle','0');
				this.clsFoot();
			}else{
				$(document).on('mousemove',mp_handler);
				this.cache('toggle','1');
			}
		},
		page_reload:function(){
			location.reload();
		},
		//Demo eventHandler
		
		show_msg_demo:function(){
			this.clsTitle().demoTitle('bar.msg(text)');
			this.msg('bar.msg(text): message demo');
		},
		show_color_msg_demo:function(){
			this.clsTitle().demoTitle('bar.msg(text,color)');
			this.msg('bar.msg(text,color):color message demo','green');
		},
		show_style_msg_demo:function(){
			this.clsTitle().demoTitle('bar.msg(text.style)');
			this.msg('bar.msg(text.style)style message demo',{color:'red','font-size':'50px'});
		},
		log_demo:function(){
			this.clsTitle().demoTitle('bar.log(text)');
			this.log('bar.log(text):log demo');
		},
		warning_demo:function(){
			this.clsTitle().demoTitle('bar.warn(text)');
			this.warn('!!bar.warn(text): warning demo!!');
		},
		alert_demo:function(){
			this.clsTitle().demoTitle('bar.msg()');
			alert('bar.msg():get message on Bar: ' + this.msg());
		},
		alert_html_demo:function(){
			this.clsTitle().demoTitle('bar.html()');
			alert('bar.html():get message on Bar: ' + this.html());
		},
		cls_msg_demo:function(){
			this.clsTitle().demoTitle('bar.cls()');
			this.cls();
		},
		add_msg_demo:function(){
			this.clsTitle().demoTitle('bar.addmsg(text)');
			var msg='add msg demo<br/>';

			this.addmsg('bar.msg(text):'+msg);
			this.addmsg('bar.msg(text,color):'+msg,'yellow');
			this.addmsg('bar.msg(text,style):'+msg,{color:'skyblue','font-size':'50px'});
		},
		html_demo:function(){
			this.clsTitle().demoTitle('bar.html(html)');
			this.html('<strong style="font-size:x-large;">bar.html(html):</strong> <span style="color:yellow;">html demo<span>');
		},
		append_demo:function(){
			this.clsTitle().title('[<span style="color:green"><b>bar.append(html)</b></span>]');
			this.append('<div><strong style="color:skyblue;font-size:x-large;">bar.append(html):</strong> <span style="color:orange;">append demo<span></div>');
		},
		chaining_demo:function(){
			this.clsTitle().title('[<span style="color:green"><b>Chainging Style Demo</b></span>]').cls()
				.html('<span style="color:red;"><b>Chainging Style Like:</b></span>')
				.append('<strong style="font-size:x-large;">bar.cls().html(html).append(html).addmsg(text,style):</strong>')
				.append('<br/>').append('<br/>')
				.addmsg('<div><strong>chaining method: return <span style="color:red;font-size:x-large;"><b>bar</b></span> itself.</strong></div>','green')
				.append($.tag('h1').text('chaining methods:'))
				.append('<ul>')
				.addmsg('<li>html(html)</li>','green')
				.addmsg('<li>append(html)</li>','yellow')
				.addmsg('<li>warn(html)</li>','red')
				.log('<li>log(text)</li>')
				.addmsg('<li>msg(html,style)</li>',{'font-size':'30',color:'olive'})
				.addmsg('<li>addmsg(html,style)</li>','skyblue')
				.msg(this.html()+'<li>title(text)</li>')
				.addmsg('<li>cls(html)</li>','orange')
				.append('</ul>')
				.title('')
				.warn('<br/> check the demo source code: chaining_demo() ');
		},
		cls_title_demo:function(){
			this.clsTitle();
		},
		title_demo:function(){
			this.demoTitle('bar.title(text)');
		},
		open_url_demo:function(){
			this.clsTitle().demoTitle('bar.open(url,mode)');
			this.open('http://www.google.com','new');
		},
		foot_demo:function(){
			this.foot('footer:').foot(create_title('bar.foot(text)'));
		},
		cls_foot_demo:function(){
			this.clsFoot();
		},
		//example
		extending_example1:function (){
			this.rainbowMsg('ranbowMsg');
			this.addmsg(' ');
		},
		extending_example2:function (){
			this.flashRainbowMsg('flashRanbowMsg');
			this.addmsg(' ');
		},
		extending_example3:function (){
			this.realRainbowMsg('realRainbowMsg');
			this.addmsg(' ');
		},
		
		//options demo
		opt_default_demo:function(){
			optSetter.set(0);
			location.reload();
		},
		opt_customize_black_demo:function(){
			optSetter.set(1);
			location.reload();
		},
		opt_customize_pink_demo:function(){
			optSetter.set(2);
			location.reload();
		},
		opt_customize_blue_demo:function(){
			optSetter.set(3);
			location.reload();
		},
		//about 
		about:function(){
			this.clsTitle().cls().demoTitle('about');
			this.aboutMsg('Helper Bar Framework[Version:'+HelperBar.version()+']',
				'Jquery[Version:'+$().jquery+']',
				'Designer: Caoglish');
		}
	};

	//Menu bar setup
	HelperBar.menu.addTree()
						.addItem('go top',menuEventHandler.go_top)
						.addItem('go bottom',menuEventHandler.go_bottom)
						.addItem('mouse position',menuEventHandler.mouse_position)
						.addItem('page refresh',menuEventHandler.page_reload)
						.addItem('function')
					.addTree('API Demo')
						.addItem('Show Message => bar.msg(text)',menuEventHandler.show_msg_demo)
						.addItem('Show Color Message => bar.msg(text,color)',menuEventHandler.show_color_msg_demo)
						.addItem('Show Style Message => bar.msg(text,style)',menuEventHandler.show_style_msg_demo)
						.addItem('warning => bar.warn(text)',menuEventHandler.warning_demo)
						.addItem('log => bar.log(text)',menuEventHandler.log_demo)
						.addItem('get msg on the bar => bar.msg()',menuEventHandler.alert_demo)
						.addItem('get html on the bar => bar.html()',menuEventHandler.alert_html_demo)
						.addItem('add msg demo => bar.addmsg(text,style)',menuEventHandler.add_msg_demo)
						.addItem('html demo => bar.html(html)',menuEventHandler.html_demo)
						.addItem('append msg => bar.append(html)',menuEventHandler.append_demo)
						.addItem('open url =>bar.open(url)',menuEventHandler.open_url_demo)
						.addItem('chaining Demo',menuEventHandler.chaining_demo)
						.addItem('append title =>bar.title(text)',menuEventHandler.title_demo)
						.addItem('append foot =>bar.foot(text)',menuEventHandler.foot_demo)
						.addItem('clear title =>bar.clsTitle(text)',menuEventHandler.cls_title_demo)
						.addItem('clear foot =>bar.clsFoot(text)',menuEventHandler.cls_foot_demo)
						.addItem('clear msg => bar.cls()',menuEventHandler.cls_msg_demo)
					.addTree('Extending Example')
						.addItem('example:rainbowMsg',menuEventHandler.extending_example1)
						.addItem('example:flashRainbowMsg',menuEventHandler.extending_example2)
						.addItem('example:realRainbowMsg',menuEventHandler.extending_example3)
					.addTree()
						.addItem('default(no custom options)',menuEventHandler.opt_default_demo)
						.addItem('custom(black)',menuEventHandler.opt_customize_black_demo)
						.addItem('custom(pink)',menuEventHandler.opt_customize_pink_demo)
						.addItem('custom(blue)',menuEventHandler.opt_customize_blue_demo)
						.addItem('custom options demo')
					.addTree('about',menuEventHandler.about);
	$(run);
	
	function run(){
		if((optSetter.get()>=0)!==true){
			optSetter.init(1);
		}
		bar = HelperBar.buildBar(optionsList[optSetter.get()]);//singleton start
		window.bar=bar;
	}
})( jQuery );


//make demo interface.
(function ($,window,undefined){
	function demo_interface(){
		var bar=window.bar;
		var $helperbar_demo=$.tag('div',{id:'helperbar-demo'}).appendTo('body').html($.tag('h1').text('Helper Bar API Demo Button(no included in framework)').css('color','yellow')).css({opacity: '0.5',width:'100%',position:'fixed',top:0,background:'black'});
		
		var addbutton=function(text,func){
			$.tag('button').prependTo($helperbar_demo).text(text).click(func);
		};
		
		addbutton('hide()',function(){			bar.hide();		});
		addbutton('show()',function(){			bar.show();		});
		addbutton('hide("slow")',function(){			bar.hide(100);		});
		addbutton('show("slow")',function(){			bar.show(100);		});
	}
	
	$(demo_interface);
	
})(jQuery,window);