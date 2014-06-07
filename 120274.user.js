// ==UserScript==
// @name        Atsuko Comments Only
// @namespace   http://akr.tw/
// @description Highlight Google+ comment posted by Maeda Atsuko.
// @author      bon.voyage
// Original Script by akiratw of http://userscripts.org/users/336234
// @version     0.02
// @license     MIT License
// @source      http://userscripts.org/scripts/show/120274
// @include     https://plus.google.com/*
// ==/UserScript==

function AtsukoCommentsOnly() {
	var self = this;
	
	this.version = 0.3;
	this.highlightColor = {
		member: '#FFD5CC',
	};
	this.selectors = {
		post: 'div.md.gi',
		postCurrent: 'div.md.gi.rh',
		postAuthor: 'a.yn.Hf.cg',
		postInner: 'div.Ve.jn.c-ng',
		permalink: 'a.hl',
		comments: 'div.Qg',
		comment: 'div.Qd',
		commentAuthor: 'a.yn.Hf.ox'
	};
	this.idRegex = /(116582420246242769167)/;
	this.icons = {
		highlight: 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABXpJREFUeNq0V2tsFFUU/ubuzsxutyzd3b5soYKUFBGFSDTGRBMiiRgM8s8/Ro2/fIHWyD8fPwyJqAhBSQi+QoNEE00IgdAiiKlaCiUWtQINIhVou9Btd3d29tF9zHjO7BQKtsvuArc9mZt7Xt8599xz70qmaWKqIUnSVMvi520r33DJopW4DSbyuhL90WwolTE2PfLivo9pyZhKeSpfUpEApINbVjzpq5T3BAIqqmYKzKxykkXbjyQQjWQRiRoYHR1HWM+sWr62fS/7vBUAxOGtTzznq1S/bJ4/Ax5fDcX+NOB98FoF7Rjl4FvEwyP4+0yMQIy/sOyV/TsmZ6McAFLH5hWr6v2u3fPvroar+l5Ijc/CpIhhZCYFSLJCJmMGzME2pEJ/4sypEIJjqdWPv96+Z0JwKl9OFB6uer+6e15LA9QKF6S6p2Bmo2QpezX9VxALAua0ZNTEv5jXogD9g7uJU0GUnM6BKOBcHPp0RauvpgoVXg9QeQ/51YDxEJAOA5notcRrxLNkSJZ1WJdtFPJTKAMuv1dZO9NfRalzElGaM2TcyF5fW5PTQHxblnRY1z8SXkuMzUSJkgHIQqrzBmqQy4xTxpMQFJ1pAZh+SMIJg2RB28G6shioY1vlAHBKkgmDDBn0RXoUphqgXEpXMjBRVFdPjETOqTuwrKTQOtWEZBb0IwpGw4bJEIRiRYTUMPZ2naZ5Cgd7z5O7lEU85zWLRzKWrKWjTNfQijsF1mkz+CtTuA5Cm4MiJXD4t3NYfl9N3jGN5YsD1ppCIAQ8MCznwtYtfMwKsc2Inj6uR8Yoinw0kFQ67iqWLaqmNpDDYwurLOI5rzGPZfKRK2BdtlGgagsCSHf3hdq0kUFAphpyyBSZk5zkt4NrI4s88ZzXmMcyLMs6rMs22FY5AFKtm3v2hy5f/icaHIDkUC0nHpcbQY1yS4648ZjWfjutNeaxDMuyDuuyDbZVVgaIxj7cebI1Onga6RTZEC7MqfXiYtiEsNIsW8RzXmMey7As67Au2yg3A7xv+jc/nDvR0X1x/aW/DpHhBGp9lVaqRxL5M88FynOhqBaPZVh2V8fZdazLNsqtAR5844y+tKG7bc8v5wlEO3KGwKzADAzplH6hErkwFFfR6PdaPJbZ++uF9W9t6+V7IGTbQLkATPsiGX5tY8/XA0H9Ry14Ev5KNxY11dMZTUCK92OJ/BMC1Pu14CmwzJqPju0knaCta94MANj3eZwN7u8a/jwZPk9RU7Wb3AlhXc0GmeFMpGNBtB8Z/oJkL9mt17yR8WIAXAGxoa3vaC5xmbTU/19CEgHQLuL9HX3dNmCjGMPFApioh4RTyh9BihncZYXVsmlOZ1/J99XEjfa9lAfJ9fVguB1JyE4HTXP0TzejnLGuaKHS7aemJ7JlFmtUKuFVLG///sCwrHoDKh05t+pBOptDNBojikLXY4gTaeGRfds/eHM1yWeLeRWXkgFP8NJQQFHCkBUXXIoH2WwGekxHPBFHMk7feAJ6PLaSZKklInarawDvvPz8Qw21fjTdUYdESkc2k8Xc2Y1orK1BTNfoaR7Grq3vPVCK3VIywMU1cvrsOUq/G0uXLKUW7EDX0aOW8zmz78SYh7uu1XqTtwMAV5i+YN5cVLhnoK+/H4LeCAuamxEOh9H7x+/Qohrs1pu+HQCsOjree6Kzuqb+0aWL76c8Cxzp6UEspqFp1mxcMAY6SzkBJdcAX6tb3l23ptpb2SmEgMPpxMKWFjTPvQuRsVDnZxvfXlPo6r3ZYziRsSqiptXPvPqJ1xd4mIHoWqTru682sXN+o0WmOoI3++N08uAu5CNqsL886FcJhuxvbtr9u0UAJjLhtt/7sNOenC7yQgD+E2AA70B+Z2GwI18AAAAASUVORK5CYII=',
		reset: 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVJJREFUeNq0V1tsFGUU/ua2994v0NIuIsUSJNbQEosPPPiqIUSDvpgYTXyxAqmGB421waa+oDagRBIQI4lRAZWQEh8MFxttoa0WDJI2ihqoLfSyO7s7u9vubTxnZra2Zjt0C0xyMv/8/7l8/znnP+cfQdd15HoEQcg1LXYc/OY1RVFaAb0aWVGDVRhLJpNdbS1Pf0AfmVzCuWwJSwQgtB84/pTP4zstl/shFFdBKimFbpkRRCAdDEBXx5GaugEtpm3bu+vZbrZ5LwCI7xz8+gWPr+ioe10zCku8aK4G6goX8v8RBi6OAeFgFPHfLyKmhV56u+WZz+Z7YzkAhPb9X20rLq885avfgpoyJ7au4jXasc4Ks7yAJJjfPf8Ao9Oz0Eb6oE5NbN+7+7nTWU/ksiXD/nGVkPGCdZshu51oWgHEUguN/wfYBME8EzEnCklGwMApWvIQxRczINoYFzs+/rbVW14DV4EXfh9pIeORWSCaICDJhcRzvMY8zMsyLMs67OzYAXAVlpTtcpZWUJxgEBtiAzOLEK8xT5afZVkH61rMiF0IXIrsWOEtKUKalCYyppFM5n+pPT8MvCPR5JXpw0myGumwAMTyBSCLogTJiq9GLi5wmi6bA7CgDpgvBsi8DEA0AEm2duxCAFGSjMRiEolCM8CF3mtI07h36AbIMQbxmOd4jXlES8aQkyTbLLc9BYIkQ9JNt+rWhlOCAz/9MoqmR/zoI8P8NDX4jTle0w3Xmd4wckGyP2h2HtCj0dDgrBYxFMrWjmRFxqaNNUjS1hs2+A3iMc/xmsEjmCBYlnVg8bSxBZAYvtJ/LB5WIZMX2ZMSA1GUORcLVtyzIeI15mFelmFZ1sG6lgNg5tC7r38XCk7+qammF9iQx+VCKDxrGsrGmsY8x2uStXuWYVnWwbqW5QGiwPHD+1ojKjWaRNpQXlNZgOlg3HTzPOI5XjNKMvGyDMuyjuV6gOOmne/+8vLPP37feevWONKpNCqKHaB2TB0vZeYG75bGPMdrzMO857q/2MOyrGO5OQDrlE13vfXysb6zpzvHx28bqqpKXZjSTAAKUTCaQjXNcdYzz8Xz3Z1H33uD+8CUpWPxk7aUdkzkJarZf+LSR+sf3vhEWZEHbkoyanoIUJuZondjBTUhNYbh366e273jsRbiHyWKLqhbOWzdyQOw+jkrutV/oftIfGbWqIwZmB0xi9MowYkk+n848wl93rZKr34n5UIeVzIHe+HE4PT1h1aVGsgDtHOVaJJyfMtK4NrNAHY0la21dp9YypVsKR6Ynw8xSXIacecCIAhzbQAKhURxGE0vdqe4LxcAw88oLjccCtd4IqqyIo0lIjfZdvs82ZDpS1WaTwiUIye7x51OT5mLdupyeenIpRAKqQiHwghHNEQiEaiqeubQvje3c9tYSgjkPDzgHZ+YLGM3OxiAw4tkKokYGY7GolTzo3QRjVJNiD9JvG6iyL0OAdpeebG5urIctVVViM7EkEpmsLq2FlWVKxChxqOGQvj8YMfmfPTm4wFOrsnh63/B7XSj8dFGakASei9dIuNhPFC7GgEvV12j9MbvBwA+Vtr6tWvgcRfg6sgIRF3C+ro6BINBDP16xcgFq/Qm7gcAI48Ghy73lFes3NrYsIn8LKJvYICSLwx/TS1uZv7uyecE5J0D3FYPtO/ZWV7o6xGp9EmyjA319ahb8yDUwFTP4ffbdtq13rs9hlmPFRP5tz//6od05X6cgWhhtffkp11snO9oaq4jeLc/p/MfvmWWEFVbb36CRGPWO71o/O4RgKwn3PN+OGaszE/ZJlAOW/8KMAB9p1fsnpAgrgAAAABJRU5ErkJggg==',
		highlight16px: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk9JREFUeNpsU01oE1EQ/t7upvnZNG211ghJo6YaAkalKl48Ve9WjwZEEYr07klqEfHkRfAgCLZSqBehVCh4id5ERE3FFrVFE9PUpFHpitiYbLL7nH3Jxphk2GHnzffNN++9nWWcc1jGGBPv5IPTIW5U7nNDP8m5UcdkMLnrKZMdl4YvPM5YuUZds8DbmdFzMKuzg5EI+o5fp6QqMPAtaC8nsbayAkhK/PD5+YdtAkuzZ4/S4tVQtB+u6BUiOkFiNQFJsTqgtHwDnz78AGfsWCw+99qCFDTMnAqEA3B63OC6Bm6UqbNZg5hEj5OwXgTCTmRT61OUPfifgMx4rGcgAKNSglxcp4bcOmhdgAkxg47UM7AduXQ2ZtdJduB0u0nFA+bwgpUyeL6UAqtqwkVc+iowiyO4rQJV/Q+4rNJte7GQ/IkTERWJdwXhVryQ1ARmcSyubY0j6AZf/b35bb9vRwgeH4lJXowcqn0FDkY5HVKXD7++ZwS3bQdPXuQmNr8koZd1BP1+mJIbJqs7xUH/LoFZHItr1zXPgXr14oHRy2f23dsZHfE4tu359xUkGYaWxsb7Z8W7c6tjN6eX56luq22QyDzkkck7j5ISL9PGTZGXZQUf0xpmbo0PE07ThKJd1zQHworki8HBfvT5euFxeVEoFJDPb6DbJXaz2MJvExCm5bPQcmvi+iRZhupUoEhmJ2pnAZeqJkK7h0553d3YoB3kcnlUysVEJ27rHdi2Nz4+8Vmh7kxiApu+fS1M+ZRN6Pg3ttiRlvWb5oVd91eAAQB6avm+/a/a/gAAAABJRU5ErkJggg=='
	};
		
	this.features = {
		bar: {
			init: function(){
				var html = [
					'<div id="FECO-bar">' +
					'<button id="FECO-button-highlight" class="FECO-button">Highlight</button>' +
					'<button id="FECO-button-reset" class="FECO-button">Reset</button>' +
					'</div>'
				].join(' ');
				
				$('body').append(html);
				
				$('#FECO-button-highlight').click(function(){ self.features.highlight.on(); });
				$('#FECO-button-reset').click(function(){ self.features.highlight.off(); });
			}
		},
		highlight: {
			init: function(){
				$(self.selectors.post).live('mouseenter', function(){
					var $post = $(this);
					
					$(self.selectors.post).each(function(){
						$(this).removeClass('rh');
						$(this).find('button.FECO-inlinebutton').hide();
					});
					
					$post.addClass('rh');
					
					if ($post.find('button.FECO-inlinebutton').length == 0 && $post.find(self.selectors.postAuthor).attr('oid').match(self.idRegex)) {
						var url = $post.find(self.selectors.permalink).attr('href');
						$post.prepend('<button class="FECO-inlinebutton" data-url="https://plus.google.com/u/0/' + url + '">Popout</button>');
					}
					$post.find('button.FECO-inlinebutton').show();
				});
				
				$('button.FECO-inlinebutton').live('click', function(){
					var $post = $(this).parents(self.selectors.post),
						url = $(this).attr('data-url');
					
					$.ajax({
						url: url,
						beforeSend: function(){
							$('div.m-n-f-ba-rd').hide();
							$post.css('opacity', 0.5);
						},
						complete: function(){
							$('div.m-n-f-ba-rd').show();
							$post.css('opacity', 1);
						},
						success: function(data){
							$post.find(self.selectors.comments).replaceWith($(data).find(self.selectors.comments));
							$post.find(self.selectors.comment).trigger('check');
						}
					});
				});
				
				$(self.selectors.comment).live('check', function(){
					var $comment = $(this);
					
					if ($comment.attr('class').indexOf('FECO-') != -1) return;
					
					if ($comment.find(self.selectors.commentAuthor).attr('oid').match(self.idRegex)) {
						$comment.removeClass('FECO-hide').addClass('FECO-highlight-member');
						return;
					} else {
						$comment.addClass('FECO-hide');
					}
				});
			},
			on: function(){
				$(self.selectors.post).each(function(){
					var $post = $(this);
					
					if (! $post.find(self.selectors.postAuthor).attr('oid').match(self.idRegex)) return;
					
					$post.find(self.selectors.comment).each(function(){
						$(this).trigger('check');
					});
				});
				self.features.highlight.scroll();
			},
			off: function(){
				$(self.selectors.comment).removeClass('FECO-hide');
				self.features.highlight.scroll();
			},
			scroll: function(){
				if ($(self.selectors.postCurrent).length != 0) {
					var offset = $(self.selectors.postCurrent).offset().top - 30;
					$('html,body').animate({scrollTop: offset}, 500);
					return;
				}
			},
		}
	};
	
	this.initFeatures = function(){
		for (var i in self.features) {
			if (typeof self.features[i].init == 'function') {
				self.features[i].init();
			}
		}
	};
	
	this.applyStyle = function(){
		var style = [
			'<style type="text/css">' +
			'#FECO-bar { position: fixed; bottom: 0; left: 0; border-radius: 0 5px 0 0; box-shadow: 0 0 5px #666; background: #E5E5E5; }' +
			'#FECO-button-highlight { background: url(data:image/png;base64,' + self.icons.highlight + ') no-repeat center; text-indent: -9999px; }' +
			'#FECO-button-reset { background: url(data:image/png;base64,' + self.icons.reset + ') no-repeat center; text-indent: -9999px; }' +
			'button.FECO-inlinebutton { float: right; width: 24px; height: 24px; margin: 20px 0 0 0; border-radius: 2px; border: 1px solid #CCC; background: #F2F2F2 url(data:image/png;base64,' + self.icons.highlight16px + ') no-repeat center; box-shadow: 0 1px 2px #CCC; text-indent: -9999px; cursor: pointer; }' +
			'button.FECO-button { width: 48px; height: 48px; border: none; background: transparent; cursor: pointer; }' +
			'button.FECO-button:hover { position: relative; top: -2px; }' +
			'div.FECO-highlight-member { display: block !important; background-color: ' + self.highlightColor.member + '; }' +
			'div.FECO-hide { display: none !important; }' +
			'</style>'
		].join(' ');
		$('head').append(style);
	};
	
	this.construct = function(){
		self.initFeatures();
		self.applyStyle();
		return true;
	};
	
	return this.construct();
}

function loadUserScript(callback) {
	var jquery = document.createElement('script');
	
	jquery.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js')
	jquery.addEventListener('load', function(){
		var userscript = document.createElement('script');
		userscript.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(userscript);
	}, false)
	
	document.body.appendChild(jquery);
}

loadUserScript(AtsukoCommentsOnly);