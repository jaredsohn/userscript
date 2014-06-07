// ==UserScript==
// @name        Redmine Arrange Preview
// @namespace   http://www.hly1980.cn/projects/redmine_arrange_preview
// @description Arrange preview by editor, and enable auto preview. Tested on chrome and firefox.
// @include     */projects/*/wiki*
// @include     */projects/*/issues/new
// @include     */issues/*
// @version     1.1
// @grant		none
// ==/UserScript==
( function(){
	var toggleArrangePreview = function() {
		var text = $('content_text') || $('notes') || $('issue_description');
		var preview = text.id == 'notes' && $('update').getStyle('display') == 'none' ? false : $('preview');
		if (!preview) {
			$$('a[accesskey="e"]').each(function(link) {
				link.observe('click', function() {
					setTimeout('$("toggleArrange").onclick();$$(\'a[accesskey="r"]\').first().onclick();', 50);
				});
			});
			return (text ? text : false);
		}

		if (text) {
			text.setStyle({
				width: (text.getStyle('width') == '49%' ? '99%' : '49%'), marginTop: '20px'
			});
			var layout = text.getLayout();
		}

		if (Element.getStyle(preview, 'position') == 'absolute') {
			preview.setStyle({
				width: '', position: '', left: '', top: '', overflowX: 'visible'
			});
		} else if (text) {
			var previewLeft = '';
			if (text.id == 'notes') {
				previewLeft = (text.offsetLeft + layout.get('width') + 20) + 'px';
			} else {
				previewLeft = (layout.get('right') + text.offsetLeft - 20) + 'px';
			}
			preview.setStyle({
				position: 'absolute', overflowX: 'hidden',
				width: layout.get('width') + 'px', 
				left: previewLeft, 
				top: (text ? (layout.get('top') - 20) + 'px' : '175px')
			});
		}

		return (text && preview ? text : false);
	}

	var enableAutoPreview = function(toggleArrangePreview) {
		var token = $$('meta[name="csrf-token"]').first().content;

		var text = toggleArrangePreview();
		if (text && token) {
			var updateFunc = $$('a[accesskey="r"]').first().onclick;

			var enabled = false;
			$$('script').each(function(obj) {
				if (obj.innerHTML.indexOf('setWikiAutoPreview') >= 0 && obj.innerHTML.indexOf('toggleArrangePreview') < 0) {
					enabled = true;
				}
			});
			if (!enabled) {
				updateFunc = updateFunc.toString().replace(/Element\.scrollTo\(('|")preview('|")\)/, 
					'var newHeight = $("preview").getHeight();var nowHeight = $("' + text.id + '").getHeight();newHeight = ((newHeight > nowHeight && newHeight > 250) ? newHeight - 20 : nowHeight) + "px";$("' + text.id + '").setStyle({height: newHeight})');
				updateFunc = updateFunc.replace(/function.*?\{/, '').replace(/\}$/, '').replace(/return false;/, '');
				updateFunc = new Function(updateFunc);
				new Field.Observer(text, 2, updateFunc);
			}
			if (text.id != 'notes' || $('update').getStyle('display') != 'none') {
				updateFunc();
			}

			var obj = $$('div.help').last();
			if (obj) {
				obj.appendChild(new Element('a', {
					href: 'javascript:void();', style: 'background: none;', id: 'toggleArrange'
				}).update('Toggle arrange')).onclick = toggleArrangePreview;
			}
		}
	}

	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('chrome/') > 0) {
		// this is the only script injection technique I've found which works on Chrome with the above function
		var inject = document.createElement("script");
		var code = "var toggleArrangePreview = " + toggleArrangePreview.toString() + ";";
		code += "var enableAutoPreview = " + enableAutoPreview.toString() + ";";
		code += "enableAutoPreview(toggleArrangePreview)";

		inject.setAttribute("type", "text/javascript");
		inject.appendChild(document.createTextNode("( function(){" + code + "} )();"));

		document.body.appendChild(inject);
	} else {
		enableAutoPreview(toggleArrangePreview);
	}
} )();