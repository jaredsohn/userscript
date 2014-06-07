// ==UserScript==
// @name           [WoD]人物卡 (fork)
// @namespace      WOD_Tools_(fork) by_hildolfr@aino
// @description    用来在英雄-》属性页面添加一个按钮，点击后生成文本格式的可复制的人物卡，便于群众交流
// @include        http*://*.world-of-dungeons.org/wod/spiel/hero/attributes.php*
// @license        MIT License
// ==/UserScript==

var mini=(function(){var b=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,g=/^(?:[\w\-_]+)?\.([\w\-_]+)/,f=/^(?:[\w\-_]+)?#([\w\-_]+)/,j=/^([\w\*\-_]+)/,h=[null,null];function d(o,m){m=m||document;var k=/^[\w\-_#]+$/.test(o);if(!k&&m.querySelectorAll){return c(m.querySelectorAll(o))}if(o.indexOf(",")>-1){var v=o.split(/,/g),t=[],s=0,r=v.length;for(;s<r;++s){t=t.concat(d(v[s],m))}return e(t)}var p=o.match(b),n=p.pop(),l=(n.match(f)||h)[1],u=!l&&(n.match(g)||h)[1],w=!l&&(n.match(j)||h)[1],q;if(u&&!w&&m.getElementsByClassName){q=c(m.getElementsByClassName(u))}else{q=!l&&c(m.getElementsByTagName(w||"*"));if(u){q=i(q,"className",RegExp("(^|\\s)"+u+"(\\s|$)"))}if(l){var x=m.getElementById(l);return x?[x]:[]}}return p[0]&&q[0]?a(p,q):q}function c(o){try{return Array.prototype.slice.call(o)}catch(n){var l=[],m=0,k=o.length;for(;m<k;++m){l[m]=o[m]}return l}}function a(w,p,n){var q=w.pop();if(q===">"){return a(w,p,true)}var s=[],k=-1,l=(q.match(f)||h)[1],t=!l&&(q.match(g)||h)[1],v=!l&&(q.match(j)||h)[1],u=-1,m,x,o;v=v&&v.toLowerCase();while((m=p[++u])){x=m.parentNode;do{o=!v||v==="*"||v===x.nodeName.toLowerCase();o=o&&(!l||x.id===l);o=o&&(!t||RegExp("(^|\\s)"+t+"(\\s|$)").test(x.className));if(n||o){break}}while((x=x.parentNode));if(o){s[++k]=m}}return w[0]&&s[0]?a(w,s):s}var e=(function(){var k=+new Date();var l=(function(){var m=1;return function(p){var o=p[k],n=m++;if(!o){p[k]=n;return true}return false}})();return function(m){var s=m.length,n=[],q=-1,o=0,p;for(;o<s;++o){p=m[o];if(l(p)){n[++q]=p}}k+=1;return n}})();function i(q,k,p){var m=-1,o,n=-1,l=[];while((o=q[++m])){if(p.test(o[k])){l[++n]=o}}return l}return d})();


Function.prototype.method = function ( name, func ) {
	this.prototype[name] = func;
	return this;
};

String.method( 'txt', function () {
	return this.replace( /<.*?>|\s+|\s+|\n|\r|!/g, '' );
});

// 1 need reset point to unequip
// 2 item name
// 3 = 4+5+6
// 4 group mark
// 5 empty space
// 6 uses
//var rObj = new RegExp( '^(.+?)(!)?([ ])?([\(][0-9]+[\/][0-9]+[\)])?$' );
var rObj = /^(!! )?(.+?)((!)?([ ])?(\([0-9]+\/[0-9]+\))?)$/;

var pattern_graft = /^\/wod\/css\/icons\/WOD\/gems\/gem_(.)\.png$/ ;

// used to separate item name, group mark, and number of uses
String.method( 'item_txt', function () {
	var result = [];
	var item = this.replace( /<.*?>|\n|\r/g, '' );

	var item_list = rObj.exec(item);
	result.push( (item_list[1])?item_list[1]:'' );
	result.push(item_list[2]);
	result.push( (item_list[3])?item_list[3]:'' );
	return result
	
});

String.method( 'sindexOf', function ( subs ) {
	var i = -1;
	while ( (sub = subs[++i]) ) {
		if ( this.indexOf( sub ) != -1 ) {
			return this.indexOf( sub );
		}
	}
	return ( -1 );
});

var WoDTool = {
	
	attrs : [],
	skills : [],
	items : [],
	busy : 0,
	root : location.protocol + '//' + location.host + '/',
	
	done_func : function () {},
	
	done : function ( func ) {
		WoDTool.done_func = func || WoDTool.done_func;
		if (WoDTool.busy == 0) {
			WoDTool.done_func();
		}
		
		return this;
	},

	walker : function ( selector, func, context ) {
	
		var i = -1, node;
		context = context || document;
		var collection = mini( selector, context );
		
		while ( (node = collection[++i]) ) {
			if (func( node ) ) break;
		}
		
		return this;
	},

	loader : function ( url, func, i ) {
		WoDTool.busy++;
		if ( url.indexOf( 'http' ) == -1 ) {
			url = WoDTool.root + url;
		}
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if ( ( req.readyState == 4 ) && ( req.status == 200 ) ) {
				var dummy = document.createElement( 'div' );
				dummy.innerHTML = req.responseText;
				func( dummy, i );
				WoDTool.busy--;
				WoDTool.done();
			}
		};
		req.open( 'GET', url, true);
		req.send();
		return this;
	},
	
	loadHeroAll : function () {
		var load_attrs = function ( func ) {
			WoDTool.loader( 'wod/spiel/hero/attributes.php?IS_POPUP=1', function ( dummy ) {
				WoDTool.getAttr( dummy );
				func();
			});
		};
		var load_skills = function ( func ) {
			WoDTool.loader( 'wod/spiel/hero/skills.php?IS_POPUP=1', function ( dummy ) {
				WoDTool.getSkillPages( dummy );
				func();
			});
		};
		var load_items = function ( func ) {
			WoDTool.loader( 'wod/spiel/hero/items.php?IS_POPUP=1&view=gear', function ( dummy ) {
				WoDTool.getItem( dummy );
				func();
			});
		};
		load_skills(function () {
			load_items(function () {
				load_attrs(function() { return true } );
			});
		});
		return this;
	},

	getAttr : function ( context ) {
		context = context || document;
		
		//英雄属性的表
		var attrTable = false, attrs = [], skills =[];
		
		//遍历所有标签，找出正确标签
		WoDTool.walker( 'th', function ( th ) {
			if ( th.innerHTML == '属性' ) {
				attrTable = th.parentNode.parentNode;
				return true;
			}
		}, context );
		
		if( !attrTable ) return false;
		
		WoDTool.walker( 'tr', function ( tr ) {
			if ( tr.className.indexOf( 'row' ) != -1 ) {
				if ( tr.childNodes[1] ) {
					var attr = [];
					if ( tr.childNodes[1].childNodes[1] ) {
						attr[0] = tr.childNodes[1].childNodes[1].innerHTML.txt();
					} else {
						attr[0] = tr.childNodes[1].innerHTML.txt();
					}
					var valueTds = tr.childNodes[3].childNodes[1].getElementsByTagName( 'td' );
					attr[1] = valueTds[1].innerHTML.txt();
					attrs.push( attr );
				}
			}
		}, attrTable );

		// 英雄 强化 / 弱化
		WoDTool.walker( 'form > table:nth-of-type(2) tbody tr > td:nth-of-type(3) table.content_table td', function ( td ) {
			var skill = [];
			if ( td.childNodes[1] ) {
				skill[0] = td.childNodes[1].innerHTML.txt();
			} else {
				skill[0] = td.innerHTML.txt();
			}

			skill[1]=''
			skills.push( skill );
		}, context );

		WoDTool.walker( 'form > table:nth-of-type(1) tbody tr > td:nth-of-type(3) table.content_table td', function ( td ) {
			if ( td.innerHTML.sindexOf( ['英雄等级', '体力', '体力恢复', '法力', '法力回复', '每回合行动次数', '先攻附加值'] ) != -1 ) {
				var attr = [];
				if ( td.childNodes[1] ) {
					attr[0] = td.childNodes[1].innerHTML.txt();
				} else {
					attr[0] = td.innerHTML.txt();
				};

				if ( attr[0].indexOf( '体力恢复' ) != -1 ) {
					attr[0] = '体力恢复';
					attr[1] = td.innerHTML.txt().substr( td.innerHTML.txt().indexOf( '体力恢复' ) + 5 );
				} else if ( attr[0].indexOf( '法力回复') != -1 ){
					attr[0] = '法力回复';
					attr[1] = td.innerHTML.txt().substr( td.innerHTML.txt().indexOf( '法力回复' ) + 5 );
				} else {
					attr[1] = td.parentNode.childNodes[3].innerHTML.txt();
				};

				attrs.push( attr );
			}
		}, context );
		
		WoDTool.attrs = attrs;

		if ( WoDTool.skill_L ){
			WoDTool.skill_L[0] = skills;
		} else {
			WoDTool.skill_L = [skills];
		};		
	
		return attrs;
	},

	getMaxRepPage : function (context) {
		context = context || document;
		WoDTool.nMaxRepPage = 1;

		WoDTool.walker('input', function(myinput){
			var myname = myinput.getAttribute('name');
			var mytest = /^SKILLPAGI_PAGE\[([0-9]+)\]$/;
			var mylist = mytest.exec(myname);
			if (mylist && mylist[1]){
				var nCurrent = parseInt(mylist[1]);
				if (nCurrent > WoDTool.nMaxRepPage){ WoDTool.nMaxRepPage = nCurrent; };
			};
		}, context);

		return WoDTool.nMaxRepPage;
	},

	getSkillPages : function (context) {
		context = context || document;

		if (!WoDTool.skill_L){
			WoDTool.skill_L = [];};

		var nMaxRepPage = WoDTool.getMaxRepPage(context);

		for (var i = 1; i <= WoDTool.nMaxRepPage; ++i){
			var myurl = 'wod/spiel/hero/skills.php?IS_POPUP=1&SKILLPAGI_PAGE='+i;
			WoDTool.loader( myurl, function (dummy, t) {
				WoDTool.skill_L[t] = WoDTool.getSkill(dummy);
			}, i );
		};
	},
	
	getSkill : function ( context ) {
		context = context || document;
		
		//英雄技能的表
		var skillTable = false, skills = [];
		
		WoDTool.walker( 'th', function ( th ) {
			if ( th.innerHTML == '训练费' ) {
				skillTable = th.parentNode.parentNode;
				return true;
			}
		}, context);
		
		if( !skillTable ) return false;
		
		WoDTool.walker( 'a.skill_primary, a.skill_secondary, a.skill_foreign', function ( a ) {
			if (a.parentNode.parentNode.innerHTML.indexOf('学习') == -1) {
				var skill = [];
				skill[0] = a.innerHTML.txt();
				WoDTool.walker( 'div', function ( div ) {
					if ( div.id.indexOf( 'skill_rang' ) != -1 ) {
						skill[1] = div.innerHTML.txt();
					}
				}, a.parentNode.parentNode );
				WoDTool.walker( 'span', function ( span ) {
					if ( span.id.indexOf( 'skill_eff_rang' ) != -1 ) {
						skill[1] = skill[1] + span.innerHTML.txt();
					}
				}, a.parentNode.parentNode );
				if (skill[1].indexOf( '-' ) == -1 ){
					skills.push(skill);
				}
			}
		}, skillTable );

		return skills;
	},
	
	getItem : function ( context ) {
		
		
		context = context || document;
		
		//英雄装备的表
		var itemTable = false, items = [];
		
		WoDTool.walker( 'td.texttoken',function ( td ) {
			if ( td.innerHTML == '头' ) {
				itemTable = td.parentNode.parentNode.parentNode.parentNode.parentNode;
				return true;
			}
		}, context );
		
		if( !itemTable ) return false;
		
		WoDTool.walker('table tbody tr', function ( tr ) {

			var item =[];
			var tds = mini('td',tr)

			// 位置 = item[0]
			item[0] = tds[0].innerHTML.txt();
			var td = tds[1];

			item[1]=[];

			WoDTool.walker('select, img', function ( item_part ) {
				if (item_part.tagName.toLowerCase() == 'select'){
					WoDTool.walker( 'option', function ( option ) {
						if ( option.getAttribute('selected') ) {
							item[1].push(['select',option.innerHTML.item_txt()]);
						}
					}, item_part );
				};
				if (item_part.tagName.toLowerCase() == 'img'){
					// 有可裝備物品的空位
					if ( ! /zustand_leer.gif$/.test(item_part.getAttribute('src'))){
						item[1].push(['img',item_part.getAttribute('src')]);
					};
				};
			}, td);

			if (item[1].length > 0){items.push(item);};
		}, itemTable );
		
		WoDTool.items = items;
		
		return items;
	}

};

(function () {
	
	var btn = document.createElement( 'input' );
	btn.setAttribute( 'class', 'button' );
	btn.setAttribute( 'type', 'button' );
	btn.setAttribute( 'value', '人物卡代码' );
	btn.addEventListener( 'click', function () {
		
		var newdiv = document.createElement( 'div' );
		newdiv.innerHTML = '加载中';
		
		WoDTool.loadHeroAll().done( function () {

			WoDTool.skills = [];

			// WoDTool.skill_L[0] = 强化 / 弱化
			// WoDTool.skill_L[k] = 技能第k頁
			for (var i = 0; i< WoDTool.skill_L.length; ++i){
				WoDTool.skills = WoDTool.skills.concat(WoDTool.skill_L[i]);
			};

			var output = "[table border=1]<br />";
			var rows = Math.ceil( ( WoDTool.attrs.length + WoDTool.skills.length ) / 2 );
			if ( rows < WoDTool.attrs.length ) {
				rows = WoDTool.attrs.length;
			}
			for ( var i = 0; i < rows; ++i ) {
				output = output + "[tr]";
				if ( i < WoDTool.attrs.length ) {
					output = output + "[td][color=orange]" + WoDTool.attrs[i][0] + "[/color][/td][td]" + WoDTool.attrs[i][1] + "[/td]";
				} else {
					var s1 = i - WoDTool.attrs.length;
					output = output + "[td][skill:" + WoDTool.skills[s1][0] + "][/td][td]" + WoDTool.skills[s1][1] + "[/td]";
				}
				var s2 = i + rows - WoDTool.attrs.length;
				if ( WoDTool.skills[s2] ) {
					output = output + "[td][skill:" + WoDTool.skills[s2][0] + "][/td][td]" + WoDTool.skills[s2][1] + "[/td]";
				} else {
					output = output + "[td][/td][td][/td]"
				}
				output = output + "[/tr]<br />";
			}
			var i = -1;
			while ( (item = WoDTool.items[++i]) ) {
				output = output + "[tr][td][color=orange]" + item[0] + "[/color][/td][td colspan=3]";
				var t = -1;
				while ( (item_part = item[1][++t]) ) {
					if ( item_part[0]=='img' ){
						//output = output + "[img]" + item_part[1] + "[/img]";
						var graft_result = pattern_graft.exec(item_part[1]);
						if (graft_result != null ){
							output = output + ":g" + graft_result[1] + ":"
						};
					};
					if ( item_part[0]=='select' ){
						output = output + item_part[1][0] + "[item:" + item_part[1][1] + "]" + item_part[1][2];
					};
				};
				output = output + "[/td][/tr]<br />";
			}
			output = output + "[/table]";
			newdiv.innerHTML = output;
		});
			
		this.style.display = 'none';
		this.parentNode.appendChild( newdiv );
	}, false );
	
	WoDTool.walker( 'h1', function( h1 ) {
		h1.parentNode.appendChild( btn );
		return true;
	});
	
})();