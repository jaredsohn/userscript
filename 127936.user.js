// ==UserScript==
// @name          Full Article+ (for Google+)
// @namespace     https://plus.google.com
// @description   See full articles shared in Google+ and focus on the main clutter-free content. All without leaving the comfort of Google+
// @include       https://plus.google.com/* 
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @require        http://tafreevar.com/download/jquery.scrollTo-min.js
// ==/UserScript==

	var i18n = (function i18n() {           
		var ltrChars            = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
			rtlChars            = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
			ltrDirCheckRe       = new RegExp('^[^'+rtlChars+']*['+ltrChars+']'),
			rtlDirCheckRe       = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');	
		function isRtlText(text) {return rtlDirCheckRe.test(text);};		
		function isLtrText(text) {return ltrDirCheckRe.test(text);};		
		return {
			rightDir: function(elem) {
				text = elem.text();
				arr = text.split("");i = 0;rtl = 0;ltr = 0;
				while (arr[i]) {if (isRtlText(arr[i])) {rtl+=1;}if (isLtrText(arr[i])) {ltr+=1;}i += 1;}
				if (ltr > rtl) {direction = 'ltr';} else {direction = 'rtl';}
				elem.attr('dir',direction);
			}
		};
	})();
	var showPage = function(params) {
		return function(data) {
			$fapluscontent = $(params.p1);
			if (data.query.results == null) {						
				$fapluscontent.html('<p><em>[unable to connect to the website. try again]</em></p>');
				return;
			}
			idx1 = data.query.results.item.description.indexOf('<p><em>This entry passed through the <a');
			idx2 = data.query.results.item.description.indexOf('Wikileaks</a>.</em></p>');
			paypal = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="9HCXV3EU9FY4A"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" title="Buy me a cup of coffee, if you like Full Article+ extension :) [opens in new window]"><img alt="" border="0" src="https://www.paypalobjects.com/en_AU/i/scr/pixel.gif" width="1" height="1"></form>';
			if (idx1 != -1 && idx2 != -1) {
				thecontent = data.query.results.item.description.substr(0,idx1) + data.query.results.item.description.substr(idx2+23);						
			} else {
				thecontent = data.query.results.item.description;
			}
			$fapluscontent.html(thecontent);
			$fapluscontent.find('*').each(function(){
				$(this).removeAttr('style');
				$(this).removeAttr('class');							
				$(this).removeAttr('dir');							
				$(this).removeAttr('align');							
				$(this).removeAttr('trbidi');							
				$(this).removeAttr('target');							
			});
			$fapluscontent.find('img').each(function(){
				$(this).css('max-width', '400px');
				$(this).after('<br>');
			});
			$fapluscontent.find('pre').each(function(){
				$(this).css('white-space', 'pre-wrap');
			});
			i18n.rightDir($fapluscontent);
			if ($fapluscontent.html() != '<p><em>[unable to retrieve full-text content]</em></p>' && $fapluscontent.html().length > 0) {
				$fapluscontent.after('<br>' + paypal);
			} else if ($fapluscontent.html() == '<p><em>[unable to retrieve full-text content]</em></p>') {
				$fapluscontent.html('<p><em>[unable to retrieve full-text content. do not try again]</em></p>');
			} else if ($fapluscontent.html().length == 0) {
				$fapluscontent.html('<p><em>[zero-sized reply from website. do not try again]</em></p>');
			}			
		};
	};
	var errorPage = function(params) {
		return function() {
			$fapluscontent = $(params.p1);
			$fapluscontent.html('<p><em>[unable to connect to the website. try again]</em></p>');
		};
	};	
	var process = function(url,fapluscontent) {
		$fapluscontent = $(fapluscontent);
		$fapluscontent.html('<img width="100" height="100" title="loading full article" alt="loading full article" src="data:image/gif;base64,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" />');
		$.post("https://query.yahooapis.com/v1/public/yql", "q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Ffivefilters.org%2Fcontent-only%2Fmakefulltextfeed.php%3Furl%3D" + encodeURIComponent(url) + "%26max%3D3'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", showPage({p1:fapluscontent}), "json").error(errorPage({p1:fapluscontent}));
	};
	var appear_on = function(ths){
		if (ths.attr('href').indexOf('http') == 0 && ths.next().attr('class') != 'f-a-plus' && ths.next().attr('class') != 'f-a-plus-container') {
			ths.after('<a class="f-a-plus" style="z-index:989;position:absolute;text-decoration:none;"><img width="32" height="32" title="Show Full Article" alt="Show Full Article" src="data:image/png;base64,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" /></a>');
		}
	};
	var disappear_on = function(ths){
		if (ths.next().attr('class') == 'f-a-plus') {
			ths.next().animate({opacity:[0,'linear']}, 2000, function() {
				$(this).remove();
			});
		}
	};
	$('#contentPane').on('mouseenter', 'a.c-C', function(){
		appear_on($(this));		
	});
	$('#contentPane').on('mouseleave', 'a.c-C', function(){
		disappear_on($(this));		
	});
	$('#contentPane').on('mouseenter', 'a.ot-anchor', function(){
		appear_on($(this));		
	});
	$('#contentPane').on('mouseleave', 'a.ot-anchor', function(){
		disappear_on($(this));		
	});
	$('#contentPane').on('click', '.f-a-plus', function(){
		if ($(this).next().attr('class') != 'f-a-plus-container') {
			$(this).after('<div class="f-a-plus-container" style="font-weight:normal;border:2px solid #00ff00;padding:5px;border-radius:10px;"><div class="f-a-plus-content"></div><a class="f-a-plus-close" style=""><img width="32" height="32" title="close" alt="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEwElEQVR42r2XXWwUVRTH/zP71f3qdtsixX5RG9C2qK1JQ3wg0fgCxmCD8IIP8KBPGLEBlABJ1wQbIpCqkSd9gAd5AUlFI/hgbMIDIU0sKi0KVpG2oUC723Z3tt2vGc+9M7PMzs62UwVOcjvTO3fn/7vnnHvPHQE27Tj8z9Oli9pLWrOyAa3174H0i533CjaEX6dLhFq7XVjNrrLfEcg3/wmAhBvpctI425UeNxrKPKhyOVHpcsEtirw/LcuIZjKYzmQxmUpjbCFl9spOAvnHNoA2ayZewf5v9pWhIxhAwOm0NfVENouheAKjyQW9a0aDKPJGEQCJ79DEEaaZbqgIodLtUgeXB+HetgWuF9fD0dYKR30d78+NjSM3PILM5StInzkHZS7O+6PpDC7NzCJGntGMQZwqCaDNvF+f9fpQOXczE/Z2vwv3G13I/jqM7G8jyE3cARa0GZaVwVG7Cs5nW+F8rg3pr/sx3/cZB2HhuTI7Z/RGl9ETgkG8UUucCia+Icy9D0drC/yf9yEzOITs4M+2QuDsfAGuzg5I73QjN3Kd912KzegQLBztek4YAX5iCcfcvqm6ks+ciXsP7Ufq/EVgfh5i3ZOQp2P83tK8Xgg+L5TpKL/3bN6I+cNHOATzxIWpqB6OAQJ4OQ9gdP3mFVU85sztvmNHkDr3HX+3WF8L/77dBBCFdPRTIGmCIGH2XKyq5M/lsQne7dnyGpJ79/NwsJw4f3+6IBQ6wBBzi9H1rlc3QZlXl5PYUA//wT00O5+adLfHIH107AEEEz+4Fw4ax0xJJun5ccg0js/S60Hm+wvmUFwlgA5B2+FY7LF1ZbW61MJhOFpa1BxY3QB/zwEIfl/BhHO3bkOK9PJ7f+QAH2c0RSKID3v5OD7+OuVCLMaX6Nm7U/qwdgbQQzeRetpgXqkKqzNetw6C2wOxqRGB3h4S91uGPPf3LRWyabXlc0WSEN/9AZR796GkU5CvXeP9LBfu0obFdAU9+TpDQbQFSIjcLDY1qa4j4cDRw3A0P2Ur+4sAR/9CYt8hDsJM/nMUSC1gOCFhcJbvFQMMQGF3G6vDqPF4gFAFxBXV+ZdwiE8+hmNN8/LEb44i8d77eXHukWiUt8lUChenYur7dYDtq57I7+1CRRhCIPAAIkgQJ/rgWLvGnviNm0js6oYSN4gnJSiUgFBkviRP37lXCLCztqbwLVRsECyH4NCgCCjw5Qk4n167qHj2jxtIvLULSiKhCudkQKL7VEGBwsmJySUAdHO7eRNDIQROfQHnM0sA/E4AO96GPDtLZTKtNgsrAjCGwGxsUwqePQ1na4utEGRp54tv3Z4vSmazDEE+Ca3Ez3wFJ1W/5ViWqmN825uWEOYkLFyGD0F8KQjzMizaiHQT62pR/sO3FP/ykgLMSgHKVIYZgF4RdfuRCpp2aopYb8UGYxWRecEMoc+OmZWXSokXbcXsr1UxWgzC7FpzqEqJMysqRhpAUTkuBSGPj1vGVYcQ6+pKipcsxxpE0YHEbCwnlLm5ksuLQTAAK/FFDyQagOWR7GHZkkcycyiMh9L/Y7YPpQaIksfy5dqyj+UmTzCIx/9hYoAo+jRjm1UNfZ498k8zC29E8Lg/Ti1AHsnn+b8jE38zLHBIMwAAAABJRU5ErkJggg==" /></a></div>');
			process($(this).prev().attr('href'),$(this).next().find('.f-a-plus-content'));
			$(this).remove();
		}
	});
	$('#contentPane').on('click', '.f-a-plus-close', function(){
		$.scrollTo($(this).parent().prev(),300);
		$(this).parent().animate({opacity:[0,'linear']}, 1000, function() {
			$(this).remove();
		});
	});
