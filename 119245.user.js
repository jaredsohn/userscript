// ==UserScript==
// @name           Parse images - configurable per site
// @grant       none
// @namespace      http://echo.waw.pl/
// @include        NONE
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==

function seq() {
	var body = $("body");
	var current;
	if(!body.attr('sequence')) { current = 0; }
	else { current = parseInt(body.attr('sequence')); }
	body.attr('sequence', current+1);
	return current;
}

function Tree() {
	var ATTR = 'uniqueId';	
	this.instances = {};
	this.getNode = function(domNode) {
		if(!$(domNode).attr(ATTR)) {
			$(domNode).attr(ATTR, seq());
		}
		var id = $(domNode).attr(ATTR);
		if(!this.instances[id]) {
			var node = new Node(id, domNode);
			this.instances[id] = node;
			node.init(this);
		}
		return this.instances[id];
	}
	this.sprintTree = function(node, options, prefix) {
		if(!node) node = this.getNode($("body")[0]);
		if(!prefix) prefix = '';
		var result = prefix+node.format(options);
		var curr = node;
		while(curr.children.length == 1) {
			curr = curr.children[0];
			result += " > " + curr.format(options);
		}
		if(curr.children.length > 1) {
			var strs = {};
			var keys = [];
			for(index in curr.children) {
				var sub = this.sprintTree(curr.children[index], options, prefix+"   ");
				if(!strs[sub]) {
					strs[sub] = 1;
					keys.push(sub);
				} else {
					strs[sub] = strs[sub]+1;
				}
			}
			for(index in keys) {
				var key = keys[index];
				var count = strs[key];
				result += "\n" + (count > 1 ? '['+count+']' : '') + key;
			}
		}
		return result;
	}
}

function Node(id, domNode) {
//	log('Node::__constructor', domNode);
	this.uid = id;
	this.domNode = domNode;
	this.children = [];
	this.init = function(tree) {
		// build up path to root
		var pnode = this.domNode;
		do {
			pnode = pnode.parentNode;
		} while(
			pnode
			&& pnode != $("body")[0]
			&& !$(pnode).attr('id') 
			&& (!pnode.className || pnode.className.match(/^\s*$/))
		);
		if(pnode) {
			this.parent = tree.getNode(pnode);
			this.parent.children.push(this);
		}
	}
	this.format = function(options) {
		var node = this;
		var result =  node.domNode.tagName
		+ ($(node.domNode).attr('id') ? '#'+ $(node.domNode).attr('id') : '')
		+ (node.domNode.className ? ' ('+node.domNode.className+')' : '')
		;
		var conf;
		if(options && (conf  = options[node.domNode.tagName]) && conf['attrs']) {
			var attrs = [];
			$.each(conf['attrs'], function(i, attrName){
				var attrVal = $(node.domNode).attr(attrName);
				if(attrVal)
					attrs.push(attrName+'='+attrVal);
			});
			if(attrs.length > 0)
				result += "["+attrs.join(',')+"]";
			
		}
		return result;
	}
}

COOKIE_MODEL = 'IP_model';
PARAM_SWITCH = 'switch';
model = null;

function persistModel() {
	$.cookie(COOKIE_MODEL, JSON.stringify(model), { path: '/' });
}

ctxMenuTarget = null;
function setupImgMenu(domImg) {
	$(domImg).click(function(evt) {
		// show menu
		log("onClick", this, evt, $("#PI_cmenu"));
		$("#PI_cmenu")
		.css('left', evt.clientX+"px")
		.css('top', evt.clientY+"px")
		.removeClass('hidden')
		;
		evt.stopPropagation();
		ctxMenuTarget = this;
	});
}

$("body").ready(function() {
	log = console.log;
	if(!isEmpty($.cookie(COOKIE_MODEL))) {
		model = JSON.parse($.cookie(COOKIE_MODEL));
	} else {
		model = {};
		model[PARAM_SWITCH] = false;
	}
	
	addGlobalStyle(globalStyle);
	$("body").append(actionbarHTML);
	$("body").append(configDialogHTML);
	FimgSelector = $("#PI_config input[name='imgWrapperSelector']");
	FaSelector = $("#PI_config input[name='anchorsSelector']");
	Fregex = $("#PI_config input[name='pagenumRegex']");
	Foutput = $("#PI_config *[name='output']").text('');
	var simpleFields = [ 'wrapperSelector', 'anchorsSelector', 'imgMaxWidth', 'imgMaxHeight' ];
	var directMappedFields = simpleFields.concat([ 'srcBlacklist' ]);
	var fields = directMappedFields.concat([ 
		'pagenumRegex' 
	]);
	
	function val(val, defVal) {
		return isEmpty(val) ? defVal : val;
	}
	function toEnv() {
		var regex = model['pagenumRegex'];
		var opts = {
			urlRegex: !isEmpty(regex) ? new RegExp(regex) : undefined,
			domWhitelist: ['#PI_actionbar', '#PI_config']
		};
		$.each(directMappedFields, function(i, fName) {
			opts[fName] = val(model[fName]);
		});
		opts['eachImg'] = setupImgMenu;
		return newEnv(opts);
	}
	
	$("#PI_actionbar_button_config").click(function() {
		// hide bar
		$("#PI_actionbar").addClass('hidden');
		// fill values
		Foutput.text('');
		$.each(fields, function(i, key) {
			$("#PI_config input[name='"+key+"']").val(model[key]);
		});
		// show dialog
		$("#PI_config").removeClass('hidden');
	});
	$("#PI_config input[name='findimg']").click(function() {
		var tree = new Tree();	
		$("img").each(function() {
			tree.getNode(this);
		});
		Foutput.text(
			tree.sprintTree()
		);
	});
	$("#PI_config input[name='finda']").click(function() {
		var tree = new Tree();	
		$("a").each(function() {
			tree.getNode(this);
		});
		Foutput.text(
			tree.sprintTree(
				undefined, 
				{ A : { attrs: [ 'href' ] } }
			)
		);
	});
	$("#PI_config input[name='testboth']").click(function() {
		var tree = new Tree();
		var regex = !isEmpty(Fregex.val()) ? new RegExp(Fregex.val()) : null;
		$(FaSelector.val())
		.filter(function() {
			return !regex 
			|| (
				!isEmpty($(this).attr('href'))
				&& $(this).attr('href').match(regex)
			);
		})
		.each(function() {
			tree.getNode(this);
		});
		Foutput.text(
			tree.sprintTree(
				undefined, 
				{ A : { attrs: [ 'href' ] } }
			)
		);
	});
	$("#PI_config input[name='save']").click(function() {
		// hide dialog
		$("#PI_config").addClass('hidden');
		// collect values
		$.each(fields, function(i, key) {
			model[key] = $("#PI_config input[name='"+key+"']").val();
		});
		persistModel();
		if(model[PARAM_SWITCH]) {
			window.location.reload();
		} else {
			// show action bar
			$("#PI_actionbar").removeClass('hidden');
		}
	});
	$("#PI_config input[name='cancel']").click(function() {
		// hide dialog
		$("#PI_config").addClass('hidden');
		// show action bar
		$("#PI_actionbar").removeClass('hidden');
	});
	$("#PI_actionbar_switch").change(function() {
		var value = $(this).is(':checked');
		model[PARAM_SWITCH] = value;
		persistModel();
		if(!value) {
			window.location.reload();
		} else {
			applyParsing(toEnv());
		}
	});
	if(model[PARAM_SWITCH]) {
		$("#PI_actionbar_switch").attr('checked','checked');
		applyParsing(toEnv());
	}
	
	// setup context menu
	$(div).append(cmenuHTML);
	$("#PI_cmenu").click(function(evt) {
		evt.stopPropagation();
	});
	function blacklistSrc(src, reload) {
		if(!model['srcBlacklist']) {
			model['srcBlacklist'] = [];
		}
		model['srcBlacklist'].push(src);
		persistModel();
		if(model[PARAM_SWITCH] && reload) {
			window.location.reload();
		}
	}
	$("#PI_cmenu input[name='hidethis']").click(function() {
		if(!ctxMenuTarget) {
			alert('no ctxTarget defined!');
		} else {
			blacklistSrc($(ctxMenuTarget).attr('src'));
		}
		// Hide the ctx menu
		$("#PI_cmenu").addClass('hidden');
	});
	$("#PI_cmenu input[name='hidesimilar']").click(function() {
		if(!ctxMenuTarget) {
			alert('no ctxTarget defined!');
			// Hide the ctx menu
			$("#PI_cmenu").addClass('hidden');
		} else {
			var src=prompt("Substring for SRC attribute", $(ctxMenuTarget).attr('src'));
			if(!isEmpty(src)) {
				blacklistSrc(src, true);
			}
		}
	});
	$("#PI_cmenu input[name='searchbyimg']").click(function() {
		if(!ctxMenuTarget) {
			alert('no ctxTarget defined!');
		} else {
			window.open("http://www.google.com/searchbyimage?hl=pl&image_url=" + encodeURI($(ctxMenuTarget).attr('src')));
		}
		// Hide the ctx menu
		$("#PI_cmenu").addClass('hidden');
	});
	$("#PI_cmenu input[name='searchbysrc']").click(function() {
		if(!ctxMenuTarget) {
			alert('no ctxTarget defined!');
		} else {
			var src = $(ctxMenuTarget).attr('src');
			window.open("http://www.google.com/search?q=" + encodeURI(src));
		}
		// Hide the ctx menu
		$("#PI_cmenu").addClass('hidden');
	});
	
	$('html').click(function() {
		// Hide the ctx menu
		$("#PI_cmenu").addClass('hidden');
	});
});

// injected CSS sheet
globalStyle = "\
.hidden { \
	display: none; \
} \
";

// injected HTML of actionbar
actionbarHTML = '\
<div id="PI_actionbar" style="position: fixed; z-index: 1000; bottom: 0px; padding: 0.5em; border: 1px solid black; background: none repeat scroll 0% 0% gold;"> \
<input type="checkbox" id="PI_actionbar_switch"></input> \
<input type="button" id="PI_actionbar_button_config" value="config"></input> \
</div> \
';

// injected HTML of dialog
configDialogHTML = '\
<form id="PI_config" class="hidden" style="position: fixed; z-index: 100; bottom: 0px; padding: 0.5em; border: 1px solid black; background: none repeat scroll 0% 0% gold;"> \
IMG wrapper selector \
<input type="text" name="wrapperSelector" /> \
<br /> \
PAGENUM regex \
<input type="text" name="pagenumRegex"/> \
<br />  \
NAV::A selector \
<input type="text" name="anchorsSelector" /> \
<br /> \
Max IMG size \
<input type="text" name="imgMaxWidth" size="4" />x<input type="text" name="imgMaxHeight"  size="4" /> \
<br /> \
<input type="button" name="testboth" value="test regex&amp;navSelector" /> \
<input type="button" name="findimg" value="find IMG" /> \
<input type="button" name="finda" value="find A" /> \
<br /> \
Output:<br /> \
<pre name="output" style="max-height:300px; max-width: 1200px; overflow: scroll; border: solid gray 1px; margin: 0.5em; padding: 0.5em; background: black; color: white"> \
asd \
</pre> \
<input type="button" name="save" value="save" /> \
<input type="button" name="cancel" value="cancel" /> \
</form> \
';

// context menu HTML
cmenuHTML = '\
<form id="PI_cmenu" class="hidden" style="position: fixed; font-size: 1.2em; padding: 0.1em; border: 1px solid black; background: gold;"> \
	<input type="button" name="hidethis" value="hide this" style="width: 100%"> </input> \
	<input type="button" name="hidesimilar" value="hide similar" style="width: 100%"> </input> \
	<input type="button" name="searchbyimg" value="find img @google.com" style="width: 100%"> </input> \
	<input type="button" name="searchbysrc" value="find URL @google.com" style="width: 100%"> </input> \
</form> \
';

// ### <!-- HELPERS
function isEmpty(value) {
	return value == undefined || value == '' || value == null || value == [];
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    return style;
}
//### HELPERS -->

//### <!-- PARSING
function is_array(input){
	return typeof(input)=='object'&&(input instanceof Array);
}
function isEmpty(val) {
	return !val || val == '' || val == [];
}

/*
{ 
	wrapperSelector: ,
	navSelector: ,
	nextAnchor: ,
	anchorsSelector: ,
	urlRegex: ,
	srcBlacklist: ,
	domWhitelist: ,
	eachImg:
}
*/

injectId = 'newDiv';

function newEnv(params) {
	var result = { 
		srcBlacklist: []
	};
	for(i in newEnv.arguments) {
		var initValues = newEnv.arguments[i];
		if(initValues)
			for(index in initValues) {
				result[index] = initValues[index];
			}
	}
	return result;
}

filterOutSrc = function(blacklist, img) {
//  GM_log('filterOutSrc', blacklist, img);
  if(!is_array(blacklist) || !img)
  	return true;
  var src = $(img).attr('src');
  if(isEmpty(src)) return false;
  for(index in blacklist) {
  	var pattern = blacklist[index];
  	if(src.indexOf(pattern) != -1) {
//	  	GM_log(pattern, 'filtered out', src);
  		return false;
  	}
  }
  return true;
}
cache = [];
filterOutDups = function(img) {
  if(!img)
  	return true;
  var src = $(img).attr('src');
  if(isEmpty(src)) return false;
  if($.inArray(src, cache) != -1) {
  	GM_log(src, 'duplicates', cache);
  	return false;
  }
  cache.push(src);
  return true;
}


// injected HTML of actionbar
nextbarHTML = ' \
<style> \
a.piNextLink { \
	font-size: 2em; \
	color: red; \
} \
</style> \
<style> \
#PI_nextnbar { \
	padding: 1em;  \
	border: 1px solid black;  \
	background: gold; \
}; \
</style> \
<div id="PI_nextnbar" style="position: fixed; bottom: 0px; right: 0px;"> \
	<a class="piNextLink" tabindex="0">NONE</a> \
</div> \
';

GM_log = console.log;
bigNext = function(div, url, label) {
	if(!url) return;
	GM_log("bigNext()", div, url, label);
	var label = "NEXT ("+label+") >";
	$(div).append(nextbarHTML);
	var a = $("#PI_nextnbar a");
	GM_log(a);
	a.attr('href', url);
	a.text(label);
	$('head').append('<link rel="next" href="'+url+'" />');
}

function applyParsing(env) {
	GM_log('applyParsing()::$env', env);
	
	pageNum = function(url) {
	  if(env.urlRegex == undefined) {
	    return 0;
	  }
	  arr = env.urlRegex.exec(url);
//		GM_log("pageNum", env, arr);
//	  GM_log('pagenum', url, env.urlRegex);
	  return is_array(arr) ? parseInt(arr[1]) : 0;
	}
	
	val = function(val, defV) {
		if(isEmpty(val))
			return defV;
		else
			return val;
	}
	
	addGlobalStyle(
	"#"+injectId+" \img { \
		max-width: "+val(env['imgMaxWidth'], 300)+"px !important; \
		max-height: "+val(env['imgMaxHeight'], 400)+"px !important \
	} \n");
	
	$("body").append("<div id='"+injectId+"'></div>");
	div = $("#"+injectId)[0];
	
	// cut all non-empty anhors inside wrappers
	$(env.wrapperSelector+" a")
	.filter(function() { return $(this).find('img').size() > 0; })
	.filter(function() { return filterOutSrc(env.srcBlacklist, $(this).find('img')[0]); })
	.each(function() { $(this).find(':not(img)').remove(); })
	.appendTo(div);
	// cut all images inside wrappers
	$(env.wrapperSelector+" img")
	.filter(function() { return filterOutSrc(env.srcBlacklist, $(this)); })
	.filter(function() { return filterOutDups($(this)); })
	.appendTo(div)
	.each(function() {
		if(env.eachImg) {
			env.eachImg(this);
		}
	});
	//--- FIND href of next page ---//
	next = $(env.nextAnchor);
	ans = $(env.anchorsSelector);
	if(!isEmpty(env.nextAnchor) && next.size() > 0) {
		bigNext(div, next.attr('href'), next.text());		
	} else if(!isEmpty(env.anchorsSelector) && ans.size() > 0) {
		currentPage = pageNum(document.URL);
		GM_log('current page', currentPage);
		urls = {};
		ans.each(function() {
		  var href = $(this).attr('href');
		  var page = pageNum(href);
		  GM_log('inspect anhor', href, page);
		  if(page >= currentPage) {
		  	urls[page] = href;
		  }
		});
		GM_log('found', urls);
		lowest = undefined;
		max = 0;
		next = undefined;
		for(index in urls) {
			var page = parseInt(index);
			if(lowest==undefined || page < lowest) {
				lowest = page;
				next = urls[index];	
			}
			if(page > max) {
				max = page;
			}
		}
		GM_log('lowest', lowest, next);
		bigNext(div, next, "p. "+lowest+"/"+max);
	} else if(!isEmpty(env.navSelector)) {
		$(env.navSelector).appendTo(div).css('font-size','20pt');
	} else if(!isEmpty(env.urlRegex)) {
		// try to find href by parsing current URL
		currPage = pageNum(document.URL);
		log(env.urlRegex, document.URL, currPage);
		bigNext(div, document.URL.replace(''+currPage, ''+(currPage+1)), "p. "+(currPage+1));
	}
	
	// hide all unnecesary except white-listed
	$("body > *").css('display', 'none');
	if(env['domWhitelist']) $.each(env['domWhitelist'], function(i, selector) {
		$(selector).each(function() {
			var node = this;
			do {
				$(node).css('display', '');
				node = node.parentNode;
			} while(node);
		});
	});
	$("body").css('width', '100%');
	$(div).css('display', 'block');
	$(div).find('img').each(function() {
		$(this).removeAttr('style');
		$(this).removeAttr('width');
		$(this).removeAttr('height');
		$(this).css('display', 'inline-block');
	});
	$('body').scrollTop(0);
}

//### PARSING -->