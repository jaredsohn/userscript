// ==UserScript==
// @name           [WoD]Hero Build
// @namespace      WOD_Tools_by_hildolfr@aino
// @description    Add a button at Attributes to help you show your character.
// @include        http*://*.world-of-dungeons.net/wod/spiel/hero/attributes.php*
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

	loader : function ( url, func ) {
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
				WoDTool.getSkill( dummy );
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
		
		//Attributes
		var attrTable = false, attrs = [];
		
		//Find correct tags
		WoDTool.walker( 'th', function ( th ) {
			if ( th.innerHTML == 'Attributes' ) {
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
		
		WoDTool.walker( 'table.content_table td', function ( td ) {
			if ( td.innerHTML.sindexOf( ['hero's level', 'hit points', 'recover hp', 'Mana points', 'recover mana points', 'actions per round', 'initiative'] ) != -1 ) {
				var attr = [];
				if ( td.childNodes[1] ) {
					attr[0] = td.childNodes[1].innerHTML.txt();
				} else {
					attr[0] = td.innerHTML.txt();
				}
				if ( attr[0].indexOf( 'recover hp' ) == -1 ) {
					attr[1] = td.parentNode.childNodes[3].innerHTML.txt();
				} else {
					attr[1] = td.innerHTML.txt().substr( td.innerHTML.txt().indexOf( 'recover hp' ) + 4 );
				}
				if ( attr[0].indexOf( 'recover mana points' ) == -1 ) {
					attr[2] = td.parentNode.childNodes[3].innerHTML.txt();
				} else {
					attr[2] = td.innerHTML.txt().substr( td.innerHTML.txt().indexOf( 'recover mana points' ) + 5 );
				}

				attrs.push( attr );
			}
		}, context );
		
		WoDTool.attrs = attrs;
		
		return attrs;
	},
	
	getSkill : function ( context ) {
		context = context || document;
		
		//Skills Table
		var skillTable = false, skills = [];
		
		WoDTool.walker( 'th', function ( th ) {
			if ( th.innerHTML == 'Training Cost' ) {
				skillTable = th.parentNode.parentNode;
				return true;
			}
		}, context);
		
		if( !skillTable ) return false;
		
		WoDTool.walker( 'a.skill_primary, a.skill_secondary, a.skill_foreign', function ( a ) {
			if (a.parentNode.parentNode.innerHTML.indexOf('Learn') == -1) {
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
		
		WoDTool.skills = skills;
		
		return skills;
	},
	
	getItem : function ( context ) {
		
		
		context = context || document;
		
		//Item Table
		var itemTable = false, items = [];
		
		WoDTool.walker( 'td.texttoken',function ( td ) {
			if ( td.innerHTML == 'head' ) {
				itemTable = td.parentNode.parentNode.parentNode.parentNode.parentNode;
				return true;
			}
		}, context );
		
		if( !itemTable ) return false;
		
		WoDTool.walker( 'td.texttoken select', function ( select ) {
			var item = [];
			item[0] = select.parentNode.parentNode.childNodes[0].innerHTML.txt();
			WoDTool.walker( 'option', function ( option ) {
				if ( option.getAttributeNode('selected') ) {
					item[1] = option.innerHTML.txt();
				}
			}, select );
			items.push( item );
		}, itemTable );
		
		WoDTool.items = items;
		
		return items;
	}

};

(function () {
	
	var btn = document.createElement( 'input' );
	btn.setAttribute( 'class', 'button' );
	btn.setAttribute( 'type', 'button' );
	btn.setAttribute( 'value', 'Hero Build)' );
	btn.addEventListener( 'click', function () {
		
		var newdiv = document.createElement( 'div' );
		newdiv.innerHTML = 'Loading';
		
		WoDTool.loadHeroAll().done( function () {
			var output = "[table border=1]<br />";
			var rows = Math.ceil( ( WoDTool.attrs.length + WoDTool.skills.length ) / 2 );
			if ( rows < WoDTool.attrs.length ) {
				rows = WoDTool.attrs.length;
			}
			for ( var i = 0; i < rows; ++i ) {
				output = output + "[tr]";
				if ( i < WoDTool.attrs.length ) {
					if(WoDTool.attrs[i][0] == 'recover mana points'){
						output = output + "[td][color=orange]" + WoDTool.attrs[i][0] + "[/color][/td][td]" + WoDTool.attrs[i][2] + "[/td]";
					}else{
						output = output + "[td][color=orange]" + WoDTool.attrs[i][0] + "[/color][/td][td]" + WoDTool.attrs[i][1] + "[/td]";
					}
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
				output = output + "[tr][td][color=orange]" + item[0] + "[/color][/td][td colspan=3][item:" + item[1] + "][/td][/tr]<br />";
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