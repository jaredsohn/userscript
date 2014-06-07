// ==UserScript==
// @name           Data Miner
// @namespace      xiaoranzzz
// @description    Data Miner
// @include        *
// ==/UserScript==
var $ = unsafeWindow.xrlin_jquery || unsafeWindow.$;

//DATA MINER
var SIMPLE_EXPS = [
	[/thumbs\//,''],
	[/(.+)s\.([^.]+)$/,'$2.$3'],
	[/(\/?)th-/,'$1'],
];


//UTILS
function debugPrint(text) {
    console.log("Data Miner: " + text);
}

var ATTRFUNC = {
	attr_simple : function(img,src,args) {
		var pat,rp;
		for(var i=0;i<SIMPLE_EXPS.length;i++) {
			if(src.match(SIMPLE_EXPS[i][0])) {
				pat = SIMPLE_EXPS[i][0];
				rp = SIMPLE_EXPS[i][1];
				break;
			}
		}
		if(pat) {
			return {src:src.replace(pat,rp)};
		}
		return false;
	},
	//args[0]	pattern
	//args[1]	"src" captured
	//args[2]	"href" captured
	//args[3]	"text" captured
	attr_match: function(element,attr,args) {
		if(!attr) return false;
		var q = attr.match(args[0]);
		if(q) {
			//debugPrint(attr + ' MATCH ' + args[0] + ' = ' + q.toString());
			if(typeof(args[1]) == 'function') {
				return args[1](q,element,attr,args);
			}
			else {
				return {
					src:	(q[args[1]] ? unescape(q[args[1]]) : null),
					href:	(q[args[2]] ? unescape(q[args[2]]) : null),
					text:	(q[args[3]] ? unescape(q[args[3]]) : null),
				};
			}
		}
		else {
			return false;
		}
	},	
	// args[0] pattern
	// args[1] replacement
	// args[2] optional no_checking flag
	attr_replace : function (element,attr,args) {
		debugPrint(attr + ' => ' + args);
		if(!attr) return false;
		for(var $idx=0;$idx<args.length-1;$idx +=2) {
			if(attr.match(args[$idx])) {
				return {src: attr.replace(args[$idx],args[$idx+1])};
			}
		}
		return false;
	}
}
	
function dataMiner(DOC_HREF) {
	this.DOC_HREF = DOC_HREF || null;
	this.MINER = new Array();
	this.MINER_SECOND = new Array();
	this.MINER_DEFAULT = new Array();
	this.MINER_FAILBACK = new Array();
	this.CACHED_JQUERY = {};
	this.register = function(site,jquery_selector,func,args,property) {
//		console.log('Add MINER ' + site + ' for ' + this.DOC_HREF);
		if(!site) return;
		if(this.DOC_HREF && !this.DOC_HREF.match(site)) return;
		this.MINER.push([site,jquery_selector,func,args,property]);
	};
	this.reg = this.register;
	this.registerSecond = function(site,selector,func,args,prop) {
		if(!site) return;
		if(this.DOC_HREF && !this.DOC_HREF.match(site)) return;
		this.MINER_SECOND.push([site,selector,func,args,prop]);
	};
	this.reg2 = this.registerSecond;
	this.registerDefault = function(site,selector,func,args,prop) {
		if(!site) return;
		if(this.DOC_HREF && !this.DOC_HREF.match(site)) return;
		this.MINER_DEFAULT.push([site,selector,func,args,prop]);
	};
	this.regD = this.registerDefault;
	this.registerFailback = function(selector,func,args,prop) {
		this.MINER_FAILBACK.push([selector,func,args,prop]);
	};
	this.regF = this.registerFailback;
	this.registerSimple = function(exp,prop) {
		return this.register(exp,
			['a img','src'],
			'attr_simple',
			null,
			prop
		);
	};
	this.regS  = this.registerSimple;
	this.start = function(miner) {
			var site = miner[0];
			var jquery_selector = miner[1];
			var func = miner[2];
			var args = miner[3];
			var property = miner[4];
			var attr;
			if(this.DOC_HREF && !this.DOC_HREF.match(site)) return;
			if(typeof(jquery_selector) == 'object') {
				attr = jquery_selector[1];
				jquery_selector = jquery_selector[0];
			}
			if(attr && attr[0] == ':') {
				get_attr = function(elm,attr) {
					return $(elm).prop(attr.substr(1));
				}
			}
			else if(attr){
				get_attr =  function(elm,attr) {
					return $(elm).attr(attr);
				}
			}
			else {
				get_attr =  function() {};
			}
			if(!args) {
				args = [];
			}
			if(!property) {
				property = {};
			}	
			if(func && typeof(func) == 'string' && func.match(/^attr_/)) {
				func = ATTRFUNC[func];
			}
			var elements;
			if(property.no_cache_selector) {
				elements = $(jquery_selector);
			}
			else {
				elements = this.CACHED_JQUERY[jquery_selector];
				if(!elements) {
					elements = $(jquery_selector);
					this.CACHED_JQUERY[jquery_selector] = elements;
				}
			}
			debugPrint('FOR ' + jquery_selector + ' GET ' + elements.length + ' elements.');
			var result = new Array();
			if(typeof(func) == 'function') {
				for(var i=0;i<elements.length;i++) {
					var r = func(elements[i],get_attr(elements[i],attr),args);
					if(!r) {
						continue;
					}
					else if(r.length != undefined) {
						for(var j=0;j<r.length;j++) {
							$.extend(r[j],property,{target:elements[i]});
						}
						result = result.concat(r);
					}
					else {
						$.extend(r,property,{target:elements[i]});
						result.push(r);
					}
				}
			}
			else {
				for(var i=0;i<elements.length;i++) {
					var source = get_attr(elements[i],attr)
					if(!(source && source.match(func))) {
						continue;
					}
					if(source = source.replace(func,args[0])) {
						result.push(
							$.extend(
								{src:source,target:elements[i]},
								property
								)
						);
					}
				}
			}
			debugPrint(this.DOC_HREF + "\n =~ " + site + ' => ' + result.length + ' images');
			this.lastMatch = result.length;
			if(result.length>0) {
				//if(property.showtable) SHOWTABLE=true;
				//data = data.concat(result);
				return result;
			}
			else if(!'!@#$%^&*ieiowokalkfdlk'.match(site)){
				debugPrint("\nHave rule for \"" + this.DOC_HREF 	+ "\",\nBut nothing matched." + "\nUpdate may be needed.");
			}	
			return false;
	};
	
	
	this.addSite = function(exp,funGet,show) {
		return this.register(
			exp,
			[document,'location'],
			function(doc,DOC_HREF) {
				return funGet(DOC_HREF,doc);
			},
			null,
			{showtable:show}
		);
	};
	
	this.addTagSite = function(tag,prop,pat,rp,show,exp,inline) {
		return this.register(
			exp,
			[tag,prop],
			ATTRFUNC['attr_replace'],
			[pat,rp],
			{inline:inline, dialog:(!inline),show:show}
		);
	};
	
	this.addImgSite = function(pat,rp,show,exp,inline) {
		return this.register(
			exp,
			['img','src'],
			ATTRFUNC['attr_replace'],
			[pat,rp],
			{inline:inline, dialog:(!inline), show:show}
		);
	};
	
	this.addLinkSite = function(pat,idx1,idx2,idx3,show,exp,attr,inline) {
		attr = attr || 'href';
		return this.register(
			exp,
			['a',attr],
			ATTRFUNC['attr_match'],
			[pat,idx1,idx2,idx3],
			{inline:inline, dialog:(!inline), show:show}
		);
	};
	
	this.addTextSite = function(exp,pat,show) {
		return this.register(exp,
			[':text',':textContent'],
			function(element,text,pat) {
				var result = new Array();
				var match = pat.exec(text);
				while(match) {
					for(var i=1;i<match.length;i++) {
						result.push({src:match[i],href:match[i],text:match[i]});        
					}
				}
			},
			pat,
			{showtable:show}
		);
	};
	this.collect = function(data) {
		if(!data) {
			data = new Array();
		}
		for(var i=0;i<this.MINER.length;i++) {
			var r = this.start(this.MINER[i]);
			if(r) {
				data = data.concat(r);
			}
		}
		if(data.length < 1) {
			for(var i=0;i<this.MINER_SECOND.length;i++) {
				var r = this.start(this.MINER_SECOND[i]);
				if(r) {
					data = data.concat(r);
				}
			}
		}
		if(data.length < 1) {
			for(var i=0;i<this.MINER_DEFAULT.length;i++) {
				var r = this.start(this.MINER_DEFAULT[i]);
				if(r) data = data.concat(r);
			}
		}
		if(data.length < 1) {
			for(var i=0;i<this.MINER_FAILBACK.length;i++) {
				var r = this.start(this.MINER_FAILBACK[i]);
				if(r) data = r;
				break;
			}
		}
		this.lastResult = data;
		return data;
	};
	return this;
}
//DATA MINER END
