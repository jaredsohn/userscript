// ==UserScript==
// @name           [WoD]额外统计信息 v0.052
// @namespace      WOD_Tools_by_hildolfr@aino
// @include        http*://*.world-of-dungeons.org/wod/spiel/*dungeon/report.php*
// @include        http*://*.world-of-dungeons.org/wod/spiel/tournament/*duell.php*
// @license        MIT License
// ==/UserScript==

/**
 * "mini" Selector Engine
 * Copyright (c) 2009 James Padolsey
 * -------------------------------------------------------
 * Dual licensed under the MIT and GPL licenses.
 *    - http://www.opensource.org/licenses/mit-license.php
 *    - http://www.gnu.org/copyleft/gpl.html
 * -------------------------------------------------------
 * Version: 0.01 (BETA)
 */
var mini=(function(){var b=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,g=/^(?:[\w\-_]+)?\.([\w\-_]+)/,f=/^(?:[\w\-_]+)?#([\w\-_]+)/,j=/^([\w\*\-_]+)/,h=[null,null];function d(o,m){m=m||document;var k=/^[\w\-_#]+$/.test(o);if(!k&&m.querySelectorAll){return c(m.querySelectorAll(o))}if(o.indexOf(",")>-1){var v=o.split(/,/g),t=[],s=0,r=v.length;for(;s<r;++s){t=t.concat(d(v[s],m))}return e(t)}var p=o.match(b),n=p.pop(),l=(n.match(f)||h)[1],u=!l&&(n.match(g)||h)[1],w=!l&&(n.match(j)||h)[1],q;if(u&&!w&&m.getElementsByClassName){q=c(m.getElementsByClassName(u))}else{q=!l&&c(m.getElementsByTagName(w||"*"));if(u){q=i(q,"className",RegExp("(^|\\s)"+u+"(\\s|$)"))}if(l){var x=m.getElementById(l);return x?[x]:[]}}return p[0]&&q[0]?a(p,q):q}function c(o){try{return Array.prototype.slice.call(o)}catch(n){var l=[],m=0,k=o.length;for(;m<k;++m){l[m]=o[m]}return l}}function a(w,p,n){var q=w.pop();if(q===">"){return a(w,p,true)}var s=[],k=-1,l=(q.match(f)||h)[1],t=!l&&(q.match(g)||h)[1],v=!l&&(q.match(j)||h)[1],u=-1,m,x,o;v=v&&v.toLowerCase();while((m=p[++u])){x=m.parentNode;do{o=!v||v==="*"||v===x.nodeName.toLowerCase();o=o&&(!l||x.id===l);o=o&&(!t||RegExp("(^|\\s)"+t+"(\\s|$)").test(x.className));if(n||o){break}}while((x=x.parentNode));if(o){s[++k]=m}}return w[0]&&s[0]?a(w,s):s}var e=(function(){var k=+new Date();var l=(function(){var m=1;return function(p){var o=p[k],n=m++;if(!o){p[k]=n;return true}return false}})();return function(m){var s=m.length,n=[],q=-1,o=0,p;for(;o<s;++o){p=m[o];if(l(p)){n[++q]=p}}k+=1;return n}})();function i(q,k,p){var m=-1,o,n=-1,l=[];while((o=q[++m])){if(p.test(o[k])){l[++n]=o}}return l}return d})();


Function.prototype.method = function ( name, func ) {
	this.prototype[name] = func;
	return this;
};

String.method( 'txt', function () {
	return this.replace( /<.*?>|\s+|\s+|\n|\r|!/g, '' );
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

var WoDStore = function () {
	this.key = [];
	this.store = [];
};

WoDStore.method( 'indexOf', function ( key ) {
	key = key.replace(',','╃');
	for ( var i = 0, length = this.key.length; i < length; i++ )
		if ( this.key[i] == key )
			return i;
	return -1;
});

WoDStore.method( 'get', function ( key ) {
	key = key.replace(',','╃');
	var key = this.indexOf( key );
	if ( key != -1 ) {
		return this.store[key];
	}
	return -1;
});

WoDStore.method( 'add', function ( key, value ) {
	key = key.replace(',','╃');
	if ( this.indexOf( key ) == -1 ) {
		this.key.push( key )
		this.store.push( value );
	}
});

WoDStore.method( 'toArray', function () {
	var arr = [];
	for ( i = 0; i < this.key.length; i++ ) {
		arr.push( [ this.key[i], this.store[i] ] );
	}
	return arr;
});

var WoDTable = function () {
	this.col = [];
	this.row_prop = [];
	this.row = [];
}

WoDTable.method( 'setCol', function () {
	this.col = arguments;
});

WoDTable.method( 'setRowProp', function  () {
	this.row_prop = arguments;
});

WoDTable.method( 'addRow', function () {
	this.row.push( arguments );
});

WoDTable.method( 'adRows', function ( rows ) {
	var i = -1;
	while ( row = rows[++i] ) {
		item = [];
		for ( j = 0; j < row[3].length; j++ ) {
			item.push( WoDTool.listItem.get(row[3][j]) );
		}
		item = item.join(',');
		if ( row[2] ) {
			skill = WoDTool.listSkill.get(row[2]);
		} else {
			skill = '无技能';
		}
		this.row.push( [ WoDTool.listHero.get(row[0]), row[1], skill, item, row[4], row[5].length, (row[4]/row[5].length).toFixed(1), WoDTool.altBTN(row[5].toString())] );
	}
});

WoDTable.method( 'render', function () {
	var i = -1;
	var html = '<table class="content_table"><tr class="content_table_header">';
	while ( (col = this.col[++i]) ) {
		html = html + '<th class="content_table">' + col + '</th>';
	}
	html = html + '</tr>';
	i = -1;
	while ( (row = this.row[++i]) ) {
		html = html + '<tr class="content_table_row_' + (i % 2) + '">';
		for ( j = 0; j < this.col.length; j++) {
			html = html + '<td class="content_table"' + this.row_prop[j] + '>' + row[j] + '</td>';
		}
		html = html + '</tr>';
	}
	html = html + '</table>';
	return html;
});

var WoDTool = {
	
	busy : 0,
	root : location.protocol + '//' + location.host + '/',
	
	listHero : new WoDStore(), listSkill : new WoDStore(), listItem : new WoDStore(),
	statIni : [], statAtk : [], statDef : [],
	logIni : [], logAtk : [], logDef : [],
	reqs : new WoDStore(), levels : new WoDStore(),
	
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

	loader : function ( url, func, method, content ) {
		method = method || 'GET';
		content = content || [];
		var i = -1, c = [];
		while ( p = content[++i] ) {
			c.push( encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]).replace(/%20/g,'+') );
		}
		c = c.join('&');
		WoDTool.busy++;
		if ( url.indexOf( 'http' ) == -1 ) {
			url = WoDTool.root + url;
		}
		req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if ( ( req.readyState == 4 ) && ( req.status == 200 ) ) {
				var dummy = document.createElement( 'div' );
				dummy.innerHTML = req.responseText;
				func( dummy );
				WoDTool.busy--;
				WoDTool.done();
			}
		};
		req.open( method, url, true );
		req.setRequestHeader("Content-length", c.length);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.send( c );
		return this;
	},
	
	toHTML : function ( dom ) {
		var dummy = document.createElement( 'div' );
		dummy.appendChild( dom.cloneNode( true ) );
		return dummy.innerHTML;
	},
	
	toDOM : function ( html ) {
		var dummy = document.createElement( 'div' );
		dummy.innerHTML = html;
		return dummy;
	},
	
	altBTN : function ( txt ) {
		return btn = '<input type="button" class="button" value="显示" onclick="alert(\'' + txt + '\');" />';
	},
	
	reper : function ( reper ) {
		if ( reper == 'rep_myhero' ) {
			return 0;
		} else if ( reper == 'rep_hero' ) {
			return 1;
		} else {
			return 2;
		}
	},
	
	adSort : function ( a, b ) {
		if ( a[0] == b[0] ) {
			if ( a[1] == b[1] ) {
				if ( a[2] == b[2] ) {
					as = a.slice(4).join('');
						bs = b.slice(4).join('');
					return as.localeCompare( bs );
				} else {
					return a[2].toLowerCase().localeCompare( b[2].toLowerCase() );
				}
			} else {
				return a[1].toLowerCase().localeCompare( b[1].toLowerCase() );
			}
		} else {
			return a[0] - b[0];
		}
	},
	
	adStat : function ( logs ) {
		var i = -1, stat = [], temp = false;
		while ( ( log = logs[++i] ) ) {
			item = log.slice(5);
			if ( (log[1] != temp[0]) || (log[2] != temp[1]) || (log[4] != temp[2]) || (item.join('') != temp[3].join('')) ) {
				if ( temp ) {
					stat.push(temp);
				}
				temp = [ log[1], log[2], log[4], item , 0, [] ];
			}
			temp[4] = temp[4] + parseInt( log[3] );
			temp[5].push( log[3] );
		}
		stat.push(temp);
		
		return stat;
	},
	
	getRLs : function ( context ) {
		context = context || document;
		WoDTool.walker( 'form' , function ( form ) {
			if ( form.getAttribute( 'name' ) == 'the_form' ) {
				WoDTool.walker( 'input', function ( input ) {
					if ( input.getAttribute( 'name' ) ) {
						if ( input.getAttribute( 'name' ).indexOf( 'level' ) == 0 ) {
							WoDTool.levels.add( input.getAttribute( 'name' ), input.getAttribute( 'value' ) );
						} else {
							WoDTool.reqs.add( input.getAttribute( 'name' ), input.getAttribute( 'value' ) );
						}
					}
				}, form );
				return true;
			}
		}, context);
	},
	
	loadLevel : function ( level ) {
		
	},
	
	getLogs : function ( context ) {
		context = context || document;
		
		var parse_init = /^.*先攻([\d]+).*第([\d]+) 步行动.*$/;
		var parse_act = /^<a.*>.*<\/a>.*\s(?:.*攻击|做为自然灾害|散布|制造爆炸|偷袭|解除) \(<.*\)$/;
		var parse_act1 = /^<a.*>(.*)<\/a>.*\s(.*) \(<.*<\/a>\/([\d]+)(?:\/<.*)?\)$/;
		var parse_act2 = /^<a.*>(.*)<\/a>.*\s(.*) \(<.*<\/a>\/([^<]*: [^<]*)(?:\/<.*)?\)$/;
		var parse_mu_atk = /^.*: ([\d]+)$/;
		var parse_def = /^<a.*>(.*)<\/a>.*\s \((?:.*<\/a>\/)?([\d]+).*$/;
		
		WoDTool.walker( 'td.rep_initiative', function ( td ) {
			var init = parse_init.exec( td.innerHTML );
			if ( init ) {
				var td2 = td.parentNode.childNodes[2];
				var act = parse_act.test( td2.innerHTML );
				var def = false;
				if ( act ) {
					var mu_atk = false;
					act = parse_act1.exec( td2.innerHTML );
					if ( !act ) {
						act = parse_act2.exec( td2.innerHTML );
						mu_atk = act[3].split( '/' );
					}
					var as = mini( 'a', td2 );
					var j = -1;
					while ( ( a = as[++j] ) ) {
						if ( j == 0 ) {
							act[0] = WoDTool.reper( a.className.toLowerCase() );
							WoDTool.listHero.add( act[1], WoDTool.toHTML(a) );
						} else if( j == 1 ) {
							act[4] = a.innerHTML.txt();
							WoDTool.listSkill.add( act[4], WoDTool.toHTML(a) );
						} else {
							var item = a.innerHTML.txt();
							act.push( item );
							WoDTool.listItem.add( item, WoDTool.toHTML(a) );
						}
					}
					if ( init[2] == 1 ) {
						WoDTool.logIni.push([ act[0], act[1], init[1] ]);
					}
					if ( mu_atk ) {
						var k = -1;
						while ( a = mu_atk[++k] ) {
							a = parse_mu_atk.exec(a);
							act[3] = a[1];
							WoDTool.logAtk.push(act);
						}
					} else {
						WoDTool.logAtk.push(act);
					}
					def = true;
				}
				if ( def ) {
					var td3 = td.parentNode.childNodes[3];
					var rs = td3.innerHTML.split('<br>');
					j = -1;
					while ( ( r = rs[++j] ) ) {
						def = parse_def.exec( r );
						if ( def ) {
							var k = -1;
							as = mini( 'a', WoDTool.toDOM( r ) );
							while ( ( a = as[++k] ) ) {
								if ( k == 0 ) {
									def[0] = WoDTool.reper( a.className.toLowerCase() );
									WoDTool.listHero.add( def[1], WoDTool.toHTML(a) );
								} else if( k == 1 ) {
									def[3] = a.innerHTML.txt();
									WoDTool.listSkill.add( def[3], WoDTool.toHTML(a) );
								} else {
									var item = a.innerHTML.txt();
									def.push( item );
									WoDTool.listItem.add( item, WoDTool.toHTML(a) );
								}
							}
							def.splice( 2, 0, act[2] );
							WoDTool.logDef.push( def );
						}
					}
				}
			}
		}, context );
	},
	
	statLogs : function () {
		var temp = false;
		var i = -1;
		WoDTool.logIni.sort( function ( a, b ) {
			if ( a[0] == b[0] ) {
				if ( a[1] == b[1] ) {
					return b[2] - a[2];
				} else {
					return a[1].toLowerCase().localeCompare( b[1].toLowerCase() );
				}
			} else {
				return a[0] - b[0];
			}
		});
		while ( ( ini = WoDTool.logIni[++i] ) ) {
			if( ini[1] != temp[0] ) {
				if ( temp ) {
					WoDTool.statIni.push(temp);
				}
				temp = [ ini[1] , 0, [] ];
			}
			temp[1] = temp[1] + parseInt( ini[2] );
			temp[2].push( ini[2] );
		}
		WoDTool.statIni.push(temp);
		
		WoDTool.logAtk.sort( WoDTool.adSort );
		WoDTool.statAtk =WoDTool.adStat( WoDTool.logAtk );
		
		WoDTool.logDef.sort( WoDTool.adSort );
		WoDTool.statDef =WoDTool.adStat( WoDTool.logDef );
		
	},
	
	outputLogs : function () {
		var i = -1;
		var tableIni = new WoDTable(), tableAtk = new WoDTable(), tableDef = new WoDTable();
		
		tableIni.setCol( '人物', '总值', '次数', '平均值', '数值列表' );
		tableIni.setRowProp( '', ' align="right"', ' align="right"', ' align="right"', ' align="center"' );
		while ( row = WoDTool.statIni[++i] ) {
			tableIni.addRow( WoDTool.listHero.get(row[0]), row[1] , row[2].length , (row[1]/row[2].length).toFixed(1), WoDTool.altBTN(row[2].toString()) );
		}
		
		tableAtk.setCol( '人物', '攻击类型', '技能', '物品', '总值', '次数', '平均值', '数值列表' );
		tableAtk.setRowProp( '', '', '', '', '', ' align="right"', ' align="right"', ' align="center"', ' align="center"' );
		tableAtk.adRows( WoDTool.statAtk );
		
		tableDef.setCol( '人物', '防御类型', '技能', '物品', '总值', '次数', '平均值', '数值列表' );
		tableDef.setRowProp( '', '', '', '', '', ' align="right"', ' align="right"', ' align="center"', ' align="center"' );
		tableDef.adRows( WoDTool.statDef );
		
		var html = '<p>'
		html = html + tableIni.render();
		html = html + '</p><p>';
		html = html + tableAtk.render();
		html = html + '</p><p>';
		html = html + tableDef.render();
		html = html + '</p>';
		return html;
	}
};

(function () {
	var btn1 = document.createElement( 'input' );
	btn1.setAttribute( 'class', 'button' );
 	btn1.setAttribute( 'type', 'button' );
	btn1.setAttribute( 'value', '该层统计' );
 	btn1.addEventListener( 'click', function () {
 		try{
 		WoDTool.getLogs();
 		WoDTool.statLogs();
 		btn1.parentNode.innerHTML = btn1.parentNode.innerHTML + WoDTool.outputLogs();
 		}catch(e){
 			alert(e);
 		}
 	}, false );

	var btn2 = document.createElement( 'input' );
	btn2.setAttribute( 'class', 'button' );
	btn2.setAttribute( 'type', 'button' );
	btn2.setAttribute( 'value', '全地城统计' );
	btn2.addEventListener( 'click', function () {
		try{
		var output = document.createElement( 'div' );
		output.innerHTML = '<p>载入地城数据中，请稍等...</p>';
		btn2.parentNode.appendChild( output );
		WoDTool.getRLs();
		var i = -1, levels = WoDTool.levels.toArray();
		var func = [];
		func[i] = function () {
			WoDTool.done( function () {
				output.innerHTML = '<p>分析数据中...</p>';
				WoDTool.statLogs();
				output.innerHTML = WoDTool.outputLogs();
			});
		};
		while ( level = levels[++i]) {
			func[i] = ( function ( level ) {
			return function () {
				output.innerHTML = '<p>载入地城数据 [' + level[1] + '] 中，请稍等...</p>';
				WoDTool.loader( 'wod/spiel/dungeon/report.php?IS_POPUP=1', function ( dummy ) {
					WoDTool.getLogs(dummy);
					func[--i]();
				}, 'POST', [ [ 'wod_post_id', WoDTool.reqs.get('wod_post_id') ],
							 [ 'wod_post_world', WoDTool.reqs.get('wod_post_world') ],
							 [ 'selfid', WoDTool.reqs.get('selfid') ],
							 [ 'cur_rep_id', WoDTool.reqs.get('cur_rep_id') ],
							 [ 'report_id[0]', WoDTool.reqs.get('report_id[0]') ],
							 [ 'nr', WoDTool.reqs.get('nr') ],
							 [ 'current_level', i],
							 [ level[0], level[1] ]						 
				]);
			};
			})( level );
		}
		func[i-1]();
		} catch (e) {
			alert(e);
		}
	}, false );
	
	WoDTool.walker( 'input.button_disabled', function( input ) {
		if ( input.value.indexOf( '详细' ) != -1 ) {
			var blank = document.createTextNode("            ");
			input.parentNode.appendChild( blank );
			input.parentNode.appendChild( btn1 );
			input.parentNode.appendChild( blank.cloneNode( true ) );
			input.parentNode.appendChild( btn2 );
			return true;
		}
	});
})();