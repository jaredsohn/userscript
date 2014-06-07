// ==UserScript==
// @name           The Register Ajaxified
// @namespace      www.example.com
// @description    Ajaxified commenting and voting, navigation, and more.
// @include        *.theregister.co.uk/*
// @include        *.reghardware.com/*
// @include        *.channelregister.co.uk/*
// ==/UserScript==

;

//
/* Facebox License Block
    Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
*/
/* jQuery License Block
 Copyright (c) 2010 John Resig, http://jquery.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

*/

/* jQuery UI License Block
 
 Copyright (c) 2010 Paul Bakaus, http://jqueryui.com/

This software consists of voluntary contributions made by many
individuals (AUTHORS.txt, http://jqueryui.com/about) For exact
contribution history, see the revision history and logs, available
at http://jquery-ui.googlecode.com/svn/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

*/

(function($){

    /*!
 * jQuery Form Plugin
 * version: 2.43 (12-MAR-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
    ;
    (function($) {
	$.fn.ajaxSubmit = function(options) {
	    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	    if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	    }

	    if (typeof options == 'function')
		options = {
		    success: options
		};

	    var url = $.trim(this.attr('action'));
	    if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	    }
	    url = url || window.location.href || '';

	    options = $.extend({
		url:  url,
		type: this.attr('method') || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	    }, options || {});

	    // hook for manipulating the form data before it is extracted;
	    // convenient for use with rich editors like tinyMCE or FCKEditor
	    var veto = {};
	    this.trigger('form-pre-serialize', [this, options, veto]);
	    if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	    }

	    // provide opportunity to alter form data before it is serialized
	    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	    }

	    var a = this.formToArray(options.semantic);
	    if (options.data) {
		options.extraData = options.data;
		for (var n in options.data) {
		    if(options.data[n] instanceof Array) {
			for (var k in options.data[n])
			    a.push( {
				name: n,
				value: options.data[n][k]
			    } );
		    }
		    else
			a.push( {
			    name: n,
			    value: options.data[n]
			} );
		}
	    }

	    // give pre-submit callback an opportunity to abort the submit
	    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	    }

	    // fire vetoable 'validate' event
	    this.trigger('form-submit-validate', [a, this, options, veto]);
	    if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	    }

	    var q = $.param(a);

	    if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	    }
	    else
		options.data = q; // data is the query string for 'post'

	    var $form = this, callbacks = [];
	    if (options.resetForm) callbacks.push(function() {
		$form.resetForm();
	    });
	    if (options.clearForm) callbacks.push(function() {
		$form.clearForm();
	    });

	    // perform a load on the target only if dataType is not provided
	    if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
		    var fn = options.replaceTarget ? 'replaceWith' : 'html';
		    $(options.target)[fn](data).each(oldSuccess, arguments);
		});
	    }
	    else if (options.success)
		callbacks.push(options.success);

	    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		for (var i=0, max=callbacks.length; i < max; i++)
		    callbacks[i].apply(options, [data, status, xhr || $form, $form]);
	    };

	    // are there files to upload?
	    var files = $('input:file', this).fieldValue();
	    var found = false;
	    for (var j=0; j < files.length; j++)
		if (files[j])
		    found = true;

	    var multipart = false;
	    //	var mp = 'multipart/form-data';
	    //	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	    // options.iframe allows user to force iframe mode
	    // 06-NOV-09: now defaulting to iframe mode if file input is detected
	    if ((files.length && options.iframe !== false) || options.iframe || found || multipart) {
		// hack to fix Safari hang (thanks to Tim Molendijk for this)
		// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
		if (options.closeKeepAlive)
		    $.get(options.closeKeepAlive, fileUpload);
		else
		    fileUpload();
	    }
	    else
		$.ajax(options);

	    // fire 'notify' event
	    this.trigger('form-submit-notify', [this, options]);
	    return this;


	    // private function for handling file uploads (hat tip to YAHOO!)
	    function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit]', form).length) {
		    alert('Error: Form elements must not be named "submit".');
		    return;
		}

		var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

		var id = 'jqFormIO' + (new Date().getTime());
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ opts.iframeSrc +'" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />');
		var io = $io[0];

		$io.css({
		    position: 'absolute',
		    top: '-1000px',
		    left: '-1000px'
		});

		var xhr = { // mock object
		    aborted: 0,
		    responseText: null,
		    responseXML: null,
		    status: 0,
		    statusText: 'n/a',
		    getAllResponseHeaders: function() {},
		    getResponseHeader: function() {},
		    setRequestHeader: function() {},
		    abort: function() {
			this.aborted = 1;
			$io.attr('src', opts.iframeSrc); // abort op in progress
		    }
		};

		var g = opts.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) $.event.trigger("ajaxStart");
		if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
		    s.global && $.active--;
		    return;
		}
		if (xhr.aborted)
		    return;

		var cbInvoked = false;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
		    var n = sub.name;
		    if (n && !sub.disabled) {
			opts.extraData = opts.extraData || {};
			opts.extraData[n] = sub.value;
			if (sub.type == "image") {
			    opts.extraData[n+'.x'] = form.clk_x;
			    opts.extraData[n+'.y'] = form.clk_y;
			}
		    }
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
		    // make sure form attrs are set
		    var t = $form.attr('target'), a = $form.attr('action');

		    // update form attrs in IE friendly way
		    form.setAttribute('target',id);
		    if (form.getAttribute('method') != 'POST')
			form.setAttribute('method', 'POST');
		    if (form.getAttribute('action') != opts.url)
			form.setAttribute('action', opts.url);

		    // ie borks in some cases when setting encoding
		    if (! opts.skipEncodingOverride) {
			$form.attr({
			    encoding: 'multipart/form-data',
			    enctype:  'multipart/form-data'
			});
		    }

		    // support timout
		    if (opts.timeout)
			setTimeout(function() {
			    timedOut = true;
			    cb();
			}, opts.timeout);

		    // add "extra" data to form if provided in options
		    var extraInputs = [];
		    try {
			if (opts.extraData)
			    for (var n in opts.extraData)
				extraInputs.push(
				    $('<input type="hidden" name="'+n+'" value="'+opts.extraData[n]+'" />')
				    .appendTo(form)[0]);

			// add iframe to doc and submit the form
			$io.appendTo('body');
			$io.data('form-plugin-onload', cb);
			form.submit();
		    }
		    finally {
			// reset attrs and remove "extra" input elements
			form.setAttribute('action',a);
			t ? form.setAttribute('target', t) : $form.removeAttr('target');
			$(extraInputs).remove();
		    }
		};

		if (opts.forceSync)
		    doSubmit();
		else
		    setTimeout(doSubmit, 10); // this lets dom updates render

		var domCheckCount = 100;

		function cb() {
		    if (cbInvoked)
			return;

		    var ok = true;
		    try {
			if (timedOut) throw 'timeout';
			// extract the server response from the iframe
			var data, doc;

			doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

			var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
			log('isXml='+isXml);
			if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
			    if (--domCheckCount) {
				// in some browsers (Opera) the iframe DOM is not always traversable when
				// the onload callback fires, so we loop a bit to accommodate
				log('requeing onLoad callback, DOM not available');
				setTimeout(cb, 250);
				return;
			    }
			    log('Could not access iframe DOM after 100 tries.');
			    return;
			}

			log('response detected');
			cbInvoked = true;
			xhr.responseText = doc.body ? doc.body.innerHTML : null;
			xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
			xhr.getResponseHeader = function(header){
			    var headers = {
				'content-type': opts.dataType
			    };
			    return headers[header];
			};

			if (opts.dataType == 'json' || opts.dataType == 'script') {
			    // see if user embedded response in textarea
			    var ta = doc.getElementsByTagName('textarea')[0];
			    if (ta)
				xhr.responseText = ta.value;
			    else {
				// account for browsers injecting pre around json response
				var pre = doc.getElementsByTagName('pre')[0];
				if (pre)
				    xhr.responseText = pre.innerHTML;
			    }
			}
			else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
			    xhr.responseXML = toXml(xhr.responseText);
			}
			data = $.httpData(xhr, opts.dataType);
		    }
		    catch(e){
			log('error caught:',e);
			ok = false;
			xhr.error = e;
			$.handleError(opts, xhr, 'error', e);
		    }

		    // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
		    if (ok) {
			opts.success(data, 'success');
			if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
		    }
		    if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
		    if (g && ! --$.active) $.event.trigger("ajaxStop");
		    if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

		    // clean up
		    setTimeout(function() {
			$io.removeData('form-plugin-onload');
			$io.remove();
			xhr.responseXML = null;
		    }, 100);
		};

		function toXml(s, doc) {
		    if (window.ActiveXObject) {
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async = 'false';
			doc.loadXML(s);
		    }
		    else
			doc = (new DOMParser()).parseFromString(s, 'text/xml');
		    return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		};
	    };
	};

	$.fn.ajaxForm = function(options) {
	    return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		e.preventDefault();
		$(this).ajaxSubmit(options);
	    }).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
		    // is this a child element of the submit el?  (ex: a span within a button)
		    var t = $el.closest(':submit');
		    if (t.length == 0)
			return;
		    target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
		    if (e.offsetX != undefined) {
			form.clk_x = e.offsetX;
			form.clk_y = e.offsetY;
		    } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
			var offset = $el.offset();
			form.clk_x = e.pageX - offset.left;
			form.clk_y = e.pageY - offset.top;
		    } else {
			form.clk_x = e.pageX - target.offsetLeft;
			form.clk_y = e.pageY - target.offsetTop;
		    }
		}
		// clear form vars
		setTimeout(function() {
		    form.clk = form.clk_x = form.clk_y = null;
		}, 100);
	    });
	};

	$.fn.ajaxFormUnbind = function() {
	    return this.unbind('submit.form-plugin click.form-plugin');
	};

	$.fn.formToArray = function(semantic) {
	    var a = [];
	    if (this.length == 0) return a;

	    var form = this[0];
	    var els = semantic ? form.getElementsByTagName('*') : form.elements;
	    if (!els) return a;
	    for(var i=0, max=els.length; i < max; i++) {
		var el = els[i];
		var n = el.name;
		if (!n) continue;

		if (semantic && form.clk && el.type == "image") {
		    // handle image inputs on the fly when semantic == true
		    if(!el.disabled && form.clk == el) {
			a.push({
			    name: n,
			    value: $(el).val()
			});
			a.push({
			    name: n+'.x',
			    value: form.clk_x
			}, {
			    name: n+'.y',
			    value: form.clk_y
			});
		    }
		    continue;
		}

		var v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
		    for(var j=0, jmax=v.length; j < jmax; j++)
			a.push({
			    name: n,
			    value: v[j]
			});
		}
		else if (v !== null && typeof v != 'undefined')
		    a.push({
			name: n,
			value: v
		    });
	    }

	    if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0], n = input.name;
		if (n && !input.disabled && input.type == 'image') {
		    a.push({
			name: n,
			value: $input.val()
		    });
		    a.push({
			name: n+'.x',
			value: form.clk_x
		    }, {
			name: n+'.y',
			value: form.clk_y
		    });
		}
	    }
	    return a;
	};

	$.fn.formSerialize = function(semantic) {
	    //hand off to jQuery.param for proper encoding
	    return $.param(this.formToArray(semantic));
	};

	$.fn.fieldSerialize = function(successful) {
	    var a = [];
	    this.each(function() {
		var n = this.name;
		if (!n) return;
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
		    for (var i=0,max=v.length; i < max; i++)
			a.push({
			    name: n,
			    value: v[i]
			});
		}
		else if (v !== null && typeof v != 'undefined')
		    a.push({
			name: this.name,
			value: v
		    });
	    });
	    //hand off to jQuery.param for proper encoding
	    return $.param(a);
	};

	$.fn.fieldValue = function(successful) {
	    for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
		    continue;
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	    }
	    return val;
	};

	$.fieldValue = function(el, successful) {
	    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	    if (typeof successful == 'undefined') successful = true;

	    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1))
		return null;

	    if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) return null;
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
		    var op = ops[i];
		    if (op.selected) {
			var v = op.value;
			if (!v) // extra pain for IE...
			    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
			if (one) return v;
			a.push(v);
		    }
		}
		return a;
	    }
	    return el.value;
	};

	$.fn.clearForm = function() {
	    return this.each(function() {
		$('input,select,textarea', this).clearFields();
	    });
	};

	$.fn.clearFields = $.fn.clearInputs = function() {
	    return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea')
		    this.value = '';
		else if (t == 'checkbox' || t == 'radio')
		    this.checked = false;
		else if (tag == 'select')
		    this.selectedIndex = -1;
	    });
	};

	$.fn.resetForm = function() {
	    return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
		    this.reset();
	    });
	};

	$.fn.enable = function(b) {
	    if (b == undefined) b = true;
	    return this.each(function() {
		this.disabled = !b;
	    });
	};

	$.fn.selected = function(select) {
	    if (select == undefined) select = true;
	    return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio')
		    this.checked = select;
		else if (this.tagName.toLowerCase() == 'option') {
		    var $sel = $(this).parent('select');
		    if (select && $sel[0] && $sel[0].type == 'select-one') {
			// deselect all other options
			$sel.find('option').selected(false);
		    }
		    this.selected = select;
		}
	    });
	};

	function log() {
	    if ($.fn.ajaxSubmit.debug) {
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
		if (window.console && window.console.log)
		    window.console.log(msg);
		else if (window.opera && window.opera.postError)
		    window.opera.postError(msg);
	    }
	};

    })($);


    /*
* jQuery Color Animations
* Copyright 2007 John Resig
* Released under the MIT and GPL licenses.
*/
    (function(jQuery){
	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
	    jQuery.fx.step[attr] = function(fx){
		if ( fx.state == 0 ) {
		    fx.start = getColor( fx.elem, attr );
		    fx.end = getRGB( fx.end );
		}

		fx.elem.style[attr] = "rgb(" + [
		Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
		Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
		Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
		].join(",") + ")";
	    }
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
	    var result;

	    // Check if we're already dealing with an array of colors
	    if ( color && color.constructor == Array && color.length == 3 )
		return color;

	    // Look for rgb(num,num,num)
	    if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
		return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

	    // Look for rgb(num%,num%,num%)
	    if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
		return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

	    // Look for #a0b1c2
	    if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
		return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

	    // Look for #fff
	    if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
		return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

	    // Otherwise, we're most likely dealing with a named color
	    return colors[jQuery.trim(color).toLowerCase()];
	}
	function getColor(elem, attr) {
	    var color;

	    do {
		color = jQuery.curCSS(elem, attr);

		// Keep going until we find an element that has color, or we hit the body
		if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
		    break;

		attr = "backgroundColor";
	    } while ( elem = elem.parentNode );

	    return getRGB(color);
	};

	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/
	var colors = {
	    aqua:[0,255,255],
	    azure:[240,255,255],
	    beige:[245,245,220],
	    black:[0,0,0],
	    blue:[0,0,255],
	    brown:[165,42,42],
	    cyan:[0,255,255],
	    darkblue:[0,0,139],
	    darkcyan:[0,139,139],
	    darkgrey:[169,169,169],
	    darkgreen:[0,100,0],
	    darkkhaki:[189,183,107],
	    darkmagenta:[139,0,139],
	    darkolivegreen:[85,107,47],
	    darkorange:[255,140,0],
	    darkorchid:[153,50,204],
	    darkred:[139,0,0],
	    darksalmon:[233,150,122],
	    darkviolet:[148,0,211],
	    fuchsia:[255,0,255],
	    gold:[255,215,0],
	    green:[0,128,0],
	    indigo:[75,0,130],
	    khaki:[240,230,140],
	    lightblue:[173,216,230],
	    lightcyan:[224,255,255],
	    lightgreen:[144,238,144],
	    lightgrey:[211,211,211],
	    lightpink:[255,182,193],
	    lightyellow:[255,255,224],
	    lime:[0,255,0],
	    magenta:[255,0,255],
	    maroon:[128,0,0],
	    navy:[0,0,128],
	    olive:[128,128,0],
	    orange:[255,165,0],
	    pink:[255,192,203],
	    purple:[128,0,128],
	    violet:[128,0,128],
	    red:[255,0,0],
	    silver:[192,192,192],
	    white:[255,255,255],
	    yellow:[255,255,0]
	};
    })($);

    // Cross-domain get
    $.xGet = function(url, callback){
	callback = callback || $.noop;
	// Hack to execute in correct context
	setTimeout(function(){
	    GM_xmlhttpRequest({
		'method':'GET',
		'url':url,
		'onload':function(r){
		    // Execute callback passing response as argument
		    callback(r.responseText);
		}
	    });
	}, 0);
    };

    // The Facebox loading image
    var loadingImg = "data:image/gif;base64,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";
    // The Facebox close image variable, with nothing in it
    var closeImg;
    // Facebox CSS
    var faceCss = "#facebox .b{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAG0lEQVQ4jWMICgraQClmGDVk1JBRQ0YNCdoAAHYawHDC5WlcAAAAAElFTkSuQmCC')}#facebox .tl{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAS0lEQVR42o3OoQ0AIAxEUZYi7NEluggewwy1dMNyBgIJCSe+uTxxKSKuRKQgRRV1ZGicIKOG/NVGa/jB9oPrkzNQWVhZ2FloLBwMnD51rC95s060AAAAAElFTkSuQmCC')}#facebox .tr{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAARElEQVR42o3KoREAIAwEMJbi2KNLdBE8pjPUlg3Lo8BwvIhLEZEAB4MOCi0zy23H+TCg/uNR2TjYuDU2Khs7G42NzsZYRf6sL6b2F1EAAAAASUVORK5CYII=')}#facebox .bl{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQ0lEQVQY02MICgpaD8QbCGEGILGMWIVTiFXYQqzCdGIVmhOl8P///yDF/cQqNCVKIZLifoIKkTSYQz3YAg06UDivBwBLtawvNrYbVAAAAABJRU5ErkJggg==')}#facebox .br{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQ0lEQVQYlY3KoRUAIAhFUZbyuMdbgkXoFmaw6oaYyP5w2zXgCo6Jcasx1RhqdDVOJa6qMiWOX1ydOh5gAwkE4MDs0B5TPqwv1+d6zQAAAABJRU5ErkJggg==')}#facebox{position:absolute;top:0;left:0;z-index:100;text-align:left}#facebox .popup{position:relative}#facebox table{border-collapse:collapse}#facebox td{border-bottom:0;padding:0}#facebox .body{padding:10px;background:#fff;width:370px}#facebox .loading{text-align:center}#facebox .image{text-align:center}#facebox img{border:0;margin:0}#facebox .footer{border-top:1px solid #DDD;padding-top:5px;margin-top:10px;text-align:right}#facebox .tl,#facebox .tr,#facebox .bl,#facebox .br{height:10px;width:10px;overflow:hidden;padding:0}#facebox_overlay{position:fixed;top:0;left:0;height:100%;width:100%}.facebox_hide{z-index:-100}.facebox_overlayBG{background-color:#000;z-index:99}* html #facebox_overlay{position:absolute;height:expression(document.body.scrollHeight>document.body.offsetHeight ? document.body.scrollHeight:document.body.offsetHeight+'px')}";

    // Animated mini-loading image
    var loadImg = "data:image/gif;base64,R0lGODlhKwALAPEAAP///wAAAIKCggAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=";

    // Generates a CSS rule setting the loading icon as the background with the specified size
    function loadCSS(width, height) {
	return "url(" + loadImg + ") no-repeat scroll " + width + "px " + height + "px transparent";
    }

    // The up button
    var upButtonImg = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAIAAAA3ajm2AAAEyElEQVRIx8WX+09aZxjH/bdMXLakJotm69RiO11ktda79dbOaqxUDTaoCBPvIlXxhlcKKCqonahVUFEBAaGAQkEFAQURq3XvHsXqWHVp7On25vPLec7z5f2cl5DzEIA+ew0ODtbSKnp7e71eL/rKK+Az+0CluZ6G9OOysS4Oh/NfaB19ODA4JKtbw0vmgU9Z3RrZdKmWVFNTPCZoIZ2wsoIEldOimX1l5GaAAGiAzKnW4bFLvsnbcql919etjY2NKS4T6cZAi82s0ev1mJ8QCIAGyHiP9gIMDrHV/Raqe16L3WP4FIdn/eDI6XRvtdFp4ITejvI7a5VrK6fFA9OVkZsBAqBh29cZ7HMBsk3uh5Mjh2dj2625Eujbf2+3WNe7m6vBCWmHaeXEnT0zFK1u7XWpm2H3rJ/8ebxi4QTAlwqOlj3FdcCRuA+tc/OiWV6LYbqbXlVKoZChAg/3L6kbAzKgdK614Vy4EjiqXa9l22moKCd5lYNOKXt6oJEz1AdF6772utSX4Kel25n5O0bnIojDxo4D46ZD+3slRTnejjR8pBma59H5QjbUzbuyf6QwwU9LbR33obFNWlyKHY/exzu7ikwpWxhiIM2gQtB6IGePtFcuyCbhls4+c5HCED8txRYfUG4LzHtyOCSjTdHDZpKppYTCAgm3Aak5SM1lN1dUlRUyq4ji5QnoMe/JtDsiXxBD/LSk5n5gw7m46VIuKl9nZ6XN9FA90i6TqAUp+5FqADCJWvOfZsXHx7d10/XbUugE4Pl8Wazw05IYO9TWMTgAsVyQlPDAIKhBsg4k70IKFlJ0I0XPGd1IzrJNMfpqCCkP8bS6MugH4BEhjhV+WjMGhtYmMjqlGY9TZAMkJH2JlprRcitaaTuj/Yw2tMxESy2ndxebyHkJRS/yIAJBiGOFn5ZIX7/ukChNokR85K6I5pqqQgsNaJGOpE1IyrgEKgsNJ5L6Y3Hd0VxtVkLUwtooBKcN9D901ZjgpwWfq7O/4Ys6GMQ04GVJ2vvZGtgYtgc+SOoI6fjwH0OrCUlGfvnBTLVnump/ikbMvg8RCEJcqCFjgp8WaMLPamiSScl72FCU3FiU4hJVukU0ALYH9LzS2TYCvTglLjr8QVR4RW5ccSYeHxsFqdXtkRF1ybCaiAl+WjwlQWUVrNkmcBG3C9NjynNibWMVwM445QK4tArJwLaAzKt6EvlTyNI6HyJzRiZXWYAV51q+V7VQS543daqsQoGkPfd5elJM+Dt+qY/Oskdw+Sw1eqnzuYlPMg6d8yIbz3ndBJERDWlAkYMJoHH+qoYpAl58vu9x3sSCoQ+IjsEpeov03BJAzHxWR4jPiL0TFBSUm3Svh5w+0Zgz15ofdjtkXvcKmvvlv/WsZH45Y1rK5WADM9fHMfDwYiJjMBhdpWnq/mJVXxGg7C0EVnsK2dR0QlpU7L0fcDicVCrFegw8vBwDPw7NYsXW0NnkOgrT8Nj0q4LUn2UsQnbcncDAwFvfffNrZGh+8t0WYuKbljzq0/uZT1KhzbS7LLPwsBqaQQA0zofm69zxeDwxI1pY+7irNKWTlAwUP4rKTcQFBwdTqVS32/2//fNhsVg5OTlhYWG/RHwfEXor6i4uJPhbOp2Ovv76Cxf2gGVi2yrfAAAAAElFTkSuQmCC') repeat scroll 0 0 transparent";
    // The down button
    var downButtonImg = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAIAAAA3ajm2AAAFDElEQVRIx7WW+1PSWRTA/Zf63XFstm3sKQkUBtYufjef64qFgiEC42M0REURQkRRQEApxRTwSZqsq/lYpYePbF1Te7iuSZPWzu7Zc83dotImxDOfcYYj587ne7+Xc08YfCnW19d9Pp/X67XZbA0NDYbqqsZatdFo3NzchAOLsE9TS0tLyrISlUplMBiqq6vt9Zq77sbfhx1bM93wuA/me2G+Z6LL5HQ6D1jL74e2NmhuBq/3tccjEWY9GTTB9C2Y7YA5FzzqhEddMN+NNsNO0+ZD1+2beph1Kovz17q7sQRqa0EuDwEaDdFAGaK1tgYqFQwNwdYWftbpdN1GOdy3w4ObMO2AmW25WRfMuR8PNkkkEn1VSWVJAUqPOLR2uz2UW4RCqIEyq6th4HDA6CjJvnnzbHFRmpkMkyaYssC9ph25h60w3fbotkkgENhqSgtlOW5zBcnft8tyReRh8JBtbMDLl/tle59gbAxaW8OgogKF8GBjtsVq7dFLYLwOfq3flmsEnw3uNcP9G0ZVgbGqEG1eTzT9MWQi0j6L6HLKyMAAWQ63fGUlBDx/Dm/fglIZRl4qxtOnuHRudvZypwLuamFMB+O19xyKkSY5TJrvWEpSkxIoitIrxAt9uoVebb+5WJaVcpHN4qWlEacXL2BuLjRgyOX/aS0uollCfPyWV/XmZ9Vfv6j/GdHM3SpmMc7QaDQ6nS7hJ507d47FYuFfJpMZF3u2TJz6rEfJT+KQR0J8PpiYCAEBWgsLSHzsmdnWQn+/suzqD68HK1ER/f4e1qCif1B1NiZam5fmH1TDqBYzmMf/JsQx3GYzKccHxRe6fwK0JidhdtZpMOTweLEMxuHDh//sK315u3yjv/zVgBIVN72VHr2IdvLYke04zziVTrGupnJOn4ii2DET7e1YDh4PdHTslwCtlhZihi9im9qioiL+d8865S+6S1Z7FGu9pWi57ikTJrNLsylvfY5bI7guSdJIklzqrBtlGXXFxaSwtxcslv0SoKXVgsGAv0zo6SH9YnQ0jcvt1GQ+6ShachYtu4pX3Needl6rzUuJjIzMTePYSn6qzLkk/pGTfJHOjD4mSk0lVaiF6+yTAK0Pu63Nhr17pb2dfvL4lE0y78hHHjsKfmsr6NcLIyIi8jMulAnj/0crTWREnyTtHk/G/nt9gJZYHABeRH19M2YzxaKNmnIeNEsf2mXTNwhZCWfDw8PjY0+rRFRbBe9WZQY75kSHQoHfJ1UfrRMEAVrp6QEIBOQ1u1wzdXXRUUc1YmrSIp6y5iJXKIaAy122WCxSaY1QiPSXl+M3AU99dvbH6wRBgBaX+zEpKeQObm31W615ly6lfx8zZhKNm0U8boyOzyen8EOsVrLip4sEQYAWk/kZLlwA3Ak8ajZbaXKyLO383YbsrqrLWRwOSVZVgURCQCHMfHaFIAjQioraFfyVGY0bNTWnjnwzXC9Ejn8b6a+pwSSw2XsVBseO1rurOi4OwsN3RSoFvb6UorTi+KE6QVEGp5HHwwzghbhHVRCgxs5VjScDZwkMTB069HnodJzRPEIhn4rx6rN6r19Oio4mU1tu7q4lQYAC7web1dWdMfDVqy8OarG0owM6fpc6IzExMfSTMgq8HwPfjYU4DKrVe3W5ri5smGwarb/6iiIzTosNBvsnHvyQjMvvQAHU2BmavyZwk9wqHoN2fHl5GQ4yvk5LJpOxmHQPTgoHHP8CyqudQD6HiYEAAAAASUVORK5CYII=') repeat scroll 0 0 transparent";

    // Append the facebox style sheet
    GM_addStyle(faceCss);
    // Append some custom CSS for the Facebox
    GM_addStyle("#facebox {font-family: 'lucida grande',tahoma,verdana,arial,sans-serif} #facebox h2 {color: #7E7E7E; border: none;} #facebox .close {display: none;}");
    GM_addStyle("#facebox p {color: #000000} #facebox h2 {color: #7E7E7E; font-size: 14px; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif;}");
    GM_addStyle(".loadButton {background: " + loadCSS(8,5) + "; border: none; width: 53px; height: 18px;}");
    
    // Cache the facebox JS to avoid bombarding the hosting site
    var cache = GM_getValue("facebox", null);
    if (cache == null)
    {
	console.log("Script not in cache... fetching remote version");
	GM_xmlhttpRequest({
	    'method':'GET',
	    'url':"http://defunkt.github.com/facebox/facebox.js",
	    'onload':function(d){
		GM_setValue("facebox", d.responseText);
		injectAndContinue(d.responseText);
	    }
	});
    }
    else {
	console.log("Script already in cache... loading cached version");
	injectAndContinue(cache);
    }

    function injectAndContinue(script)
    {
	script = script.replace("loadingImage : '/facebox/loading.gif'","loadingImage : '" + loadingImg + "'");
	script = script.replace("closeImage   : '/facebox/closelabel.gif'", "closeImage : '" + closeImg + "'");

	// Inject script
	$("<script>" + script + "</script>").appendTo('head');

	main();
    }
    function main(){

	// Remove ad leader
	$("#leader").remove();

	// Remove ads
	$("#ad-mpu1-spot").remove();

	// Determine site
	var loc;
	var locs = ["theregister.co.uk", "reghardware.com", "channelregister.co.uk"];
	for (var i in locs)
	    if (location.href.indexOf(locs[i]) != -1)
		loc = locs[i];

	// Determine subnavigation id
	var subs;
	var subnav;
	
	if (loc != "channelregister.co.uk")
	{
	    if (loc == "theregister.co.uk")
		subs = "#sub-nav";
	    else if (loc == "reghardware.com")
		subs = "#subsections";

	    subnav = $(subs).html();

	    // Make the navigation menu dynamic
	    $("#top-nav ul:eq(0) li").each(function(){
		// Get each menu item
		var href = $(this).find("a").attr("href");
		// Bind a mouse enter event to reveal subitems
		$(this).mouseenter(function(){
		    clearTimeout(t);
		    // Cross domain get the sub navigation, because there are multiple subdomains that this script
		    // works on
		    $.xGet("http://www." + loc + href, function(r){
			// Get the sub navigation
			var html = $(r).find(subs).html();
			// Replace subnavigation
			$(subs).html(html).find("li").mouseenter(function(){
			    clearTimeout(t);
			}).mouseleave(function(){
			    timedNavReset();
			});
		    });
		}).mouseleave(function(){
		    timedNavReset();
		});
	    });
	}

	var activePage;
	var t;

	function isLoggedIn()
	{
	    // Parse authorization cookie
	    if (parseInt(($.cookie('s').split(':'))[3],16))
		return true;
	    else
		return false;
	}

	// Loads the current page in the background and extracts the votes from the given post ID
	function getVotes(id, callback)
	{
	    if (!callback)
		return;
	    // No need to use GM functions for Ajax since all requests are same-domain
	    $.get(transformPageURL(location.href, activePage), function(r){
		// Create a jQuery object from the response HTML
		var $p = $(r);
		// Generate the url used for searching
		var link = "http://forums." + loc + "/post/report/" + id;
		// Find a form with action defined above
		var $result = $p.find("form[action=" + link + "]");
		var arg;
		if ($result.size() == 1)
		{
		    // Get all vote buttons
		    var $voteButtons = $result.siblings(".vote");
		    var $downs = $voteButtons.find(".down").val();
		    var $ups = $voteButtons.find(".up").val();
		    // Return votes
		    arg = {
			down: $downs,
			up: $ups
		    };
		}
		
		callback(arg);
	    });
	}

	// Parses the comment ID from the url
	function parseCommentID(url)
	{
	    // Find a numeric sequence in the string
	    return (url.match(/\d+/) || null);
	}

	// Find the post given the post ID
	function findPost(id)
	{
	    var url = "http://forums." + loc + "/post/vote/down/" + id;
	    return $("form.vote[action=" + url + "]").parent().parent();
	}

	function animateScroll(scroll, callback)
	{
	    callback = callback||$.noop;
	    $('html,body').stop().animate({
		scrollTop: scroll
	    }, 750, "swing");
	    // Start the color animation just before the scrolling finishes
	    setTimeout(callback, 700);
	}

	function getScroll(target)
	{
	    if (!target)
		target = $('html,body');
	    return target.offset().top;
	}

	function loadPosts(url, callback)
	{
	    // Add a loading image
	    $(".forums-page-nav h3").before("<img src='" + loadImg + "'/>&nbsp;&nbsp;");
	    // Load posts
	    $("#main-col").load(url + " #main-col > *", function(r){
		ajaxifyPages();
		ajaxifyPosts();
		if (!callback)
		    animateScroll(0);
		callback = callback||$.noop;
		callback();
	    });
	}

	function doVote(id, direction, callback)
	{
	    callback = callback || $.noop;
	    // Post a vote
	    $.post("http://forums." + loc + "/post/vote/" + direction + "/" + id, callback);
	}

	function ajaxLogin(callback)
	{
	    callback = callback||$.noop;
	    $.facebox($("#forums-nav form:eq(0)").clone().prepend("<h2>Login to continue</h2>").ajaxForm(function(){
		$("#facebox").trigger("close.facebox");
		callback();
	    }).find("#forum-rhs-q").remove().end().find("input[type=submit]").click(function(){
		$(this).val("").addClass("loadButton");
	    }).end());
	}

	function reportPost(id, $post)
	{
	    var href = "http://forums." + loc + "/post/report/" + id;
	    // Post the report
	    var $button = $post.find("input[value=Report]");
	    $button.removeClass("act").addClass("loadButton").val("");
	    $.post(href, function(r){
		$button.removeClass("loadButton").addClass("act").val("Reported").attr("title", "Reported");
		$post.css("border", "none");
	    });
	}

	function extractPageNumber(url)
	{
	    return (parseInt(url.match(/forum\/(\d+?)\//)[1],10));
	}

	function transformPageURL(url, page)
	{
	    return (url.replace(/forum\/(\d+?)\//, "/forum/" + page + "/"));
	}

	function timedNavReset(){
	    t = setTimeout(function(){
		$(subs).html(subnav);
	    }, 3000);
	}

	function ajaxifyPosts(target)
	{
	    if (!target)
		target = $("body");
	    // Get the collection of posts that aren't deleted
	    var $posts = target.find(".post:not(.deleted)");

	    $posts.each(function(){

		var $post = $(this);
		// Override form submit and get the first form (for comment ID parsing purposes)
		var $form = $post.find("form.vote").submit(function(){
		    return false;
		}).filter(":eq(0)");

		// Get the comment ID from the form
		var id = parseCommentID($form.attr("action"));
		// Get author name, used later
		var author = $post.find(".author").text();
		var $author = $post.find(".author");
		
		
		// Hook the buttons
		var $upButton = $post.find("input.up");
		var $downButton = $post.find("input.down");

		// Calculate net score
		var score = $upButton.val() - $downButton.val();

		$post.find("h3").append("<span style='font-size: 80%; color: #999999;'>&nbsp;&nbsp;&nbsp;Net vote: " + score + "</span>");

		// Blur stupid posts
		if (score < -4)
		    $post.css("opacity", 0.4);

		var $buttons = $upButton.add($downButton);

		$buttons.click(function(){
		    var go = function(that){
			// Return if buttons are 'disabled'
			if ($buttons.data("disabled"))
			    return;

			// Disable the buttons
			$buttons.data("disabled", true);
			// Add a loading
			$buttons.css("background", loadCSS(1, 6)).val("");
			var direction;

			// Determine vote direction
			if (that.hasClass("up"))
			    direction = "up";
			else
			    direction = "down";

			// Call voting method with comment ID, direction, and callback
			doVote(id, direction, function(){
			    // Set a one second delay before updating vote counts so the vote has time to register
			    setTimeout(function(){
				getVotes(id, function(v){
				    // Enable buttons
				    $buttons.data("disabled", false);
				    // Update buttons with vote count and restore image
				    $upButton.val(v.up).css("background", upButtonImg);
				    $downButton.val(v.down).css("background", downButtonImg);
				});
			    }, 1000);
			});
		    };

		    if (isLoggedIn())
			go($(this))
		    else
		    {
			var that = $(this);
			ajaxLogin(function(){
			    go(that)
			});
		    }
		});

		// Find the report button
		$post.find("input[value=Report]").click(function(){
		    var go = function(that){
			if ($(this).data("disabled"))
			    return;
			// Add border to post to distinguish it
			$post.css("border", "3px dashed red");
			// Show the facebox dialog
			$.facebox("<h2>Report this Post?</h2>\
<p>Are you sure you want to report this post by <strong>" + author + "</strong>?</p>\n\
<button id='yesClose'>Yes</button><button id='noClose'>No</button>");
			// Bind Yes and No button clicks
			$("#yesClose").click(function(){
			    // Remove the border
			    $post.css("border", "none");
			    // Close the facebox
			    $("#facebox").trigger("close.facebox");
			    // Disable report button
			    that.data("disabled", true);
			    // Report the post
			    reportPost(id, $post);
			});
			$("#noClose").add("#facebox_overlay").click(function(){
			    // Remove the border
			    $post.css("border", "none");
			    // Close the facebox
			    $("#facebox").trigger("close.facebox");
			});
		    };

		    if (isLoggedIn())
			go($(this))
		    else {
			var that = $(this);
			ajaxLogin(function(){
			    go($(that))
			});
		    }
		    
		}).parent().submit(function(){
		    // Override form submit
		    return false;
		});
		
		// Find the author and add an author preview dialog
		if (author != "Anonymous Coward"){
		    // Get the link
		    var extLink = $author.find("a:eq(0)").attr("href");

		    $post.mouseenter(function(){
			var that = $(this);
			if (that.attr("title") != "")
			    return;
			that.attr("Please wait, loading author information...");
			$.get(extLink, function(r){
			    var $j = $(r);
			    var $content = $j.find(".post").parent();
			    that.attr("title", $content.find("p:eq(0)").text());
			});
		    });
		}
		else
		    $author.css("font-weight", "normal");

		// Detect nested posts
		if ($post.find(".permalink").size() == 2){
		    var $perm = $post.find(".permalink:eq(1)");
		    var pid = parseCommentID($perm.attr("href"));
		    // Find the parent post
		    var $parent = findPost(pid);
		    // Bind a click event that scrolls to the parent post and highlights it
		    $perm.attr("href", "javascript: void false;").click(function(){
			var go = function(){
			    var $parent = findPost(pid);
			    animateScroll(getScroll($parent) - 25, function(){
				$parent.animate({
				    backgroundColor: "#68BFEF"
				}, 750).animate({
				    backgroundColor: "#FFFFFF"
				}, 1250);
			    });
			};
			// If the parent post is not on this page, load the previous page.
			// It is assumed that the comments on one post won't span more than one page
			if ($parent.size() == 0)
			    if (activePage != 1){
				$perm.after("&nbsp;<img src='" + loadImg + "'/>");
				loadPosts(transformPageURL(location.href, activePage - 1), go);
				
			    }
			    else
				return; // The parent post was removed
			else
			    go();
		    });
		}
	    });
	}

	function ajaxifyPages()
	{
	    // Ajaxify the comment paging
	    var $postNav = $(".forums-page-nav");
	    // Only ajaxify page navigation that exists
	    if ($postNav.size() > 0)
	    {
		// Find all the page links that are hyperlinks
		var $pages = $postNav.find("li:not(.current)");

		$pages.each(function(){
		    var $page = $(this);
		    // Get the link
		    var $link = $page.find("a");
		    // Get the page url
		    var href = $link.attr("href");
		    // Override link
		    $link.attr("href", "javascript: void false;");

		    // Bind click event
		    $link.click(function(){
			// Store the now-active page
			activePage = extractPageNumber(href);

			loadPosts(href);
		    });
		});
	    }
	}

	// Get the currently active page number
	activePage = extractPageNumber(location.href);

	if (activePage){
	    // Works on all sites
	    ajaxifyPosts();
	    // Works on all sites
	    ajaxifyPages();
	}
    }
})(unsafeWindow.$); // The Register already uses jQuery so just mooch of their installation