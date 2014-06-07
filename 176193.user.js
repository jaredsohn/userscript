// ==UserScript==
// @name         vBulletin 5 Profile Preview Tooltip
// @namespace    http://userscripts.org/users/527495
// @description  Shows preview tooltip when a profile link or avatar is hovered.
// @downloadURL  http://userscripts.org/scripts/show/176193
// @grant        none
// @include      http*
// @version      1.4
// @date         2013-08-20
// @creator      noypiscripter
// ==/UserScript==

(function() {	
	var main = function() {

		$(function() {

			var $style = $('#vB5ProfilePreviewTooltipByNoypiscripter_CSS'), timer, jqXHR, profileData = {};

			if (!$style.length) {
				var ns = '.vB5ProfilePreviewTooltipByNoypiscripter_namespace',
					rtl = $('html').attr('dir') === 'rtl',
					textDirLeft = rtl ? 'right' : 'left',
					textDirRight = rtl ? 'left' : 'right';

				$('<style>\n\
				    .ui-tooltip-profile-preview-noypiscripter.ui-tooltip, .ui-tooltip-profile-preview-noypiscripter.qtip {\n\
				        max-width: 350px;\n\
   				        width: 350px;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-content {\n\
				        max-height: 150px;\n\
				        overflow: auto;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter.ui-tooltip-shadow {\n\
				        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .section .section-header {\n\
				        border: 0;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .section .section-content.table .tr {\n\
				        height: auto;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .section .section-content.table .tr .td {\n\
				        width: auto;\n\
				        padding: 5px;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .section .section-content.table .sub-section .section-content.table .tr .td {\n\
				        white-space: nowrap;\n\
				        padding: 5px;\n\
				        width: 50%;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-title-noypiscripter {\n\
				        width: 80%;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-full-profile-noypiscripter {\n\
				        width: 20%;\n\
				        text-align: ' + textDirRight + ';\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-titlebar {\n\
				        padding-' + textDirRight + ': 15px;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-content::-webkit-scrollbar {\n\
					    width: 10px;\n\
					}\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-content::-webkit-scrollbar-track {\n\
                        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n\
                        border-radius: 10px;\n\
                        border-radius: 10px;\n\
				    }\n\
				    .ui-tooltip-profile-preview-noypiscripter .ui-tooltip-content::-webkit-scrollbar-thumb {\n\
                        border-radius: 10px;\n\
                        background: rgba(0,0,0,0.1);\n\
                        box-shadow: inset 0 0 6px rgba(0,0,0,0.4);\n\
				    }\n\
					</style>')
					.attr({'id': 'vB5ProfilePreviewTooltipByNoypiscripter_CSS', 'type': 'text/css'})
					.appendTo('head');

			}
			
			function showProfileTooltip(html, userid, profileUrl) {
				var title = this.find('img').attr('alt');
				if (!title) {
				    title = this.text();
				    if (title != this.html() && this.closest('.b-userinfo__details').length == 0) {
				        delete profileData[userid];
				        return;
				    }
				}
				this.qtip({
					content: {
					    title: '<div class="ui-tooltip-title-noypiscripter h-left">' + (title.indexOf('http://') == 0 || title.indexOf('https://') == 0 ? 'Profile Preview' : 'Profile Preview for ' + title) + '</div><a href="' + profileUrl + '" class="ui-tooltip-full-profile-noypiscripter h-right">Full Profile</a>',
					    text: html
					},
					position: {
					    my: 'left top',
					    at: 'top right',
					    viewport: $(window)
					},
					show: {
                        effect: function() {
                            $(this).show('slide', 500);
                        }
                    },
					hide: {
                        fixed: true,
                        delay: 300
                    },
                    style: {    
                        classes: 'ui-tooltip-shadow ui-tooltip-light ui-tooltip-profile-preview-noypiscripter'
                    },
                    events: {
                        hide: function(event, api) {
                            api.destroy();
                        }
                    },
                    overwrite: false
				});
				this.qtip('api').show();
			}

			$('.canvas-widget').on('mouseenter' + ns + ' mouseleave' + ns, 'a[href*="/member/"]', function(e) {
				var $this = $(this);     
				if (e.type === 'mouseenter') {
					var profileUrl = vBulletin.parseUrl($this.attr('href')); 
					   matches = profileUrl.hostname == location.hostname && !profileUrl.pathname.match(/\/activities|\/subscribed|\/media|\/subscriptions|\/subscribers/) ? profileUrl.pathname.match(/\/member\/(\d+)/) : null, //'about' tab excluded from regex check intentionally
					   userid = matches ? matches[1] : 0;
					if (!userid) {
					   return;
					}
					timer = setTimeout(function() {
						if (profileData[userid]) {
							showProfileTooltip.call($this, profileData[userid], userid, $this.attr('href'));
							return;
						}						

						jqXHR = $.post(vBulletin.getAjaxBaseurl() + '/profile/fetchAbout', {userid: userid}, function(data) {
							var $data;
							if (!$.trim(data)) {
								return;
							}
							else {
								$data = $('<div />').html(data);
								if (!$data.find('.about-basicinfo').length) {
    								return;
    							}
							}
							$data.find('.about-status').remove(); //remove Status section
						
							//make Web url as anchor link
							var $url = $data.find('.about-contact .td:contains("http")');
							if ($url.length && !$url.find('a').length) {
								var url = $url.html();
								$url.empty().append($('<a />').attr({'href': url, 'target': '_blank'}).html(url));
							}														

							//cache profile data
							profileData[userid] = $data.html();	

							showProfileTooltip.call($this, profileData[userid], userid, $this.attr('href'));																				
						});
					}, 1000);
				}
				else {
					clearTimeout(timer);
					if (jqXHR) {
						jqXHR.abort();
					}
					jqXHR = null;
				}

			});
		});
	};

	var lazyLoader = function() {
		//this script applies to all vBulletin 5+ sites only
		if (typeof window.vBulletin === 'object' && typeof window.vBulletin.AJAX === 'function') {
			var lazyScript = document.getElementById('vB5ProfilePreviewTooltipByNoypiscripter_lazyScript'),
				lazyScriptBody = (lazyScript.textContent || '').replace(/\/\*/, '').replace(/\*\//, '');
			eval(lazyScriptBody);
		}
	}
	
	var lazyScript = document.createElement('script');
	lazyScript.type = 'text/javascript';
	lazyScript.id = 'vB5ProfilePreviewTooltipByNoypiscripter_lazyScript';
	lazyScript.textContent = '/* (' + main.toString() + ')(); */';
	document.body.appendChild(lazyScript);

	var lazyLoaderScript = document.createElement('script');
	lazyLoaderScript.type = 'text/javascript';
	lazyLoaderScript.id = 'vB5ProfilePreviewTooltipByNoypiscripter_lazyScriptLoader';
	lazyLoaderScript.textContent = '(' + lazyLoader.toString() + ')();';
	document.body.appendChild(lazyLoaderScript);

})();