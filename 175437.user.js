// ==UserScript==
// @name         vBulletin 5 Floating Bar
// @namespace    http://userscripts.org/users/527495
// @description  Enhances vBulletin 5's Floating Bar.
// @downloadURL  http://userscripts.org/scripts/show/175437
// @grant        none
// @include      http*
// @version      2.1
// @date         2013-08-12
// @creator      noypiscripter
// ==/UserScript==
(function () {
    var main = function () {

        $(function () {

            var $style = $('#vb5FloatingBarByNoypiscripter_floatingBarCSS');

            if (!$style.length) {
                var $bottomPageNav = $('.pagenav-container'),
                    $floatingBarWrapper = $('.conversation-toolbar-wrapper'),
                    ns = '.vb5FloatingBarByNoypiscripter_namespace'
					$topnav = $('#channel-tabbar'),
					$floatingBar = $('.conversation-toolbar', $floatingBarWrapper),
					bgColor = $floatingBar.css('background-image') == 'none' ? $floatingBar.css('background-color') : ($floatingBar.css('background-color') == 'transparent' && $topnav.css('background-color') != 'transparent' ? $topnav.css('background-color') : '#000'),
					floatingBarBgColor = bgColor == '#000' ? [$topnav.css('background-color'), $topnav.css('background-image'), $topnav.css('background-repeat'), $topnav.css('background-attachment'), $topnav.css('background-position')].join(' ') : bgColor, //bgColor == '#000' && $topnav.css('background-color') != 'transparent' ? $topnav.css('background-color') : bgColor,
					//floatingBarBorderColor = parseInt($topnav.css('border-bottom-width')) > 0 ? $topnav.css('border-bottom-color') : $topnav.css('background-color'), //floatingBarBgColor == $topnav.css('background-color') ? $topnav.css('background-color') : $floatingBar.css('border-color'),
					floatingBarHeight = ($floatingBarWrapper.filter(':visible')
						.length && $floatingBarWrapper.filter(':visible')
						.outerHeight()) || 37,
					textColor = $('ul li.section-item', $topnav)
						.not('.current')
						.children('a')
						.css('color') || '#FFF',
					$buttonSecondary = $('.button.secondary'),
					buttonSecondaryBorderColor = $buttonSecondary.css('border-top-color'),
					buttonSecondaryBgImage = $buttonSecondary.css('background-image'),
					buttonSecondaryBgColor = $buttonSecondary.css('background-color'),
					buttonColorSecondary = $buttonSecondary.css('color') || $('body')
						.css('color'),
					buttonColorPrimary = $('.button.primary')
						.css('color') || '#FFF',
					rtl = $('html')
						.attr('dir') === 'rtl',
					textDirLeft = rtl ? 'right' : 'left',
					textDirRight = rtl ? 'left' : 'right';

                $('<style>\n\
					.conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed {\n\
						box-shadow: 0 0 20px #000 !important;\n\
						border: 0 !important;\n\
						background: ' + floatingBarBgColor + ' !important;\n\
						' + textDirLeft + ': 0 !important;\n\
						width: 100% !important;\n\
					}\n\
					.conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar {\n\
						background: ' + floatingBarBgColor + ' !important;\n\
						color: ' + textColor + ' !important;\n\
						margin: auto !important;\n\
						border: 0 !important;\n\
						height: 38px !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper .pagenav-container {\n\
					 	margin: 0 !important;\n\
					 	padding: 0 !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper .pagenav-container .button.secondary, .conversation-toolbar-wrapper .username-container .b-button {\n\
					 	color: ' + buttonColorSecondary + ' !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper .pagenav-container .button.primary {\n\
					 	color: ' + buttonColorPrimary + ' !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating .conversation-toolbar .toolbar-filter .filter-wrapper.button {\n\
						border: 0;\n\
						font-weight: normal;\n\
						background-image: none;\n\
						background-color: transparent;\n\
						min-width: 0;\n\
						margin-left: 0;\n\
						margin-right: 0;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .toolbar-filter .filter-wrapper {\n\
					 	min-width: 0;\n\
						height: 21px;\n\
						line-height: 21px;\n\
						margin-' + textDirLeft + ': 11px;\n\
						margin-' + textDirRight + ': 11px;\n\
						padding-' + textDirLeft + ': 7px;\n\
						padding-' + textDirRight + ': 4px;\n\
						padding-top: 1px;\n\
						padding-bottom: 0;\n\
						font-weight: bold;\n\
						background-image: ' + buttonSecondaryBgImage + ';\n\
						background-color: ' + buttonSecondaryBgColor + ';\n\
						border: ' + (parseInt($buttonSecondary.css('border-top-width'), 10) > 0 ? '1px solid ' + buttonSecondaryBorderColor : '0') + ';\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .toolbar-filter-overlay {\n\
						top: ' + (floatingBarHeight + 3) + 'px !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .filter-wrapper .label,\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .filter-wrapper.selected .label {\n\
						color: ' + buttonColorSecondary + ';\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .toolbar-filter .filter-wrapper.selected {\n\
					 	margin-top: 0;\n\
					 	background: ' + (buttonSecondaryBgImage == 'none' ? $buttonSecondary.css('background-color') : buttonSecondaryBgImage) + ';\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .toolbar-filter .filter-wrapper .vb-icon-wrapper,\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .conversation-toolbar .toolbar-filter .filter-wrapper.selected .vb-icon-wrapper {\n\
					 	height: 20px;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .filtered-by {\n\
					 	margin: -1px;\n\
					 }\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container,\n\
					 .conversation-toolbar-wrapper .toolset-left .follow-btn {\n\
					 	display: none;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .toolset-right .goto-top-container {\n\
					 	display: list-item;\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .toolset-left .follow-btn {\n\
					 	display: inline-block;\n\
					 }\n\
					 .conversation-toolbar-wrapper .toolset-left .button + .follow-btn {\n\
					 	margin-' + textDirLeft + ': 6px !important;\n\
					 }\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container .goto-top-button {\n\
					 	min-width: 0;\n\
					    padding: 1px 5px;\n\
					    height: 24px;\n\
					 }\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container a,\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container a:visited,\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container a:hover,\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container a:active {\n\
					    color: ' + buttonColorSecondary + ';\n\
					 }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .toolbar-inline-mod .moderationmenu_container .moderation-mainmenu .mainmenu .submenu > li > a {\n\
					    color: ' + $('.toolbar-filter-overlay .filter-options input:not(:checked) + span', $floatingBarWrapper)
                    .css('color') + ';\n\
					 }\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container .goto-top-button label {\n\
					 	bottom: 7px;\n\
    					position: relative;\n\
    					cursor:pointer;\n\
					 }\n\
					 .memberlist-widget .conversation-toolbar-wrapper .toolset-right .goto-top-container .goto-top-button label { bottom: 3px; }\n\
					 .conversation-toolbar-wrapper .toolset-right .goto-top-container .goto-top-button .vb-icon-wrapper {\n\
					 	margin-top: -2px;\n\
    					margin-' + textDirLeft + ': 4px;\n\
					 }\n\
					 .memberlist-widget .conversation-toolbar-wrapper .toolset-right .goto-top-container .goto-top-button .vb-icon-wrapper { margin-top: 2px; }\n\
					 .pagenav-container .pagenav .button {\n\
						font-size: 10px;\n\
						line-height: 20px;\n\
					 }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu { width: 15px; margin-' + textDirRight + ': 18px !important; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul { margin-top: -11px; margin-' + textDirLeft + ': -13px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul > li.mobile { width: 12px !important; padding: 11px 14px 9px !important; cursor: pointer; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul:hover > li.mobile { background: #F1F1F1; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .main-menu-control-sections { height: 22px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .icon { height: 11px; width: 12px; display: inline-block; margin: 6px 0; background: transparent ' + $('#mobile-main-menu-sections .sections-menu-icon .icon')
                    .css('background-image') + ' repeat-x 0 0; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul:hover > li.mobile .icon { background-position: -16px -0px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item {\n\
					 	display: none;\n\
					 	position: relative;\n\
					 	height: auto;\n\
					 	background: #F1F1F1;\n\
					 	width: 200px;\n\
					 	border: 1px solid #C0C0C0;\n\
					 	border-width: 0 1px;\n\
					 	-moz-box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
					 	-webkit-box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
					 	box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
					 	float: ' + textDirLeft + ';\n\
					  }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu ul:hover > .section-item, .vb5FloatingBarByNoypiscripter-navmenu .section-item:hover > ul > .section-item { display: list-item; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item:last-child { border-bottom-width: 1px; }\n\
					 .widget-tabs.ui-tabs .ui-widget-content .vb5FloatingBarByNoypiscripter-navmenu .section-item a, .vb5FloatingBarByNoypiscripter-navmenu .section-item a { color: #252C2F; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item a { display: block; padding: 8px 10px; float: none; white-space: normal; line-height: 16px; position: relative; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item.vb5FloatingBarByNoypiscripter-hasChild a { padding-' + textDirRight + ': 18px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item:hover { background: ' + floatingBarBgColor + '; }\n\
					 .conversation-toolbar-wrapper.scrolltofixed-floating.scrolltofixed .vb5FloatingBarByNoypiscripter-navmenu { display: block; }\n\
					 .vb5FloatingBarByNoypiscripter-right-arrow {\n\
						width: 0px;\n\
						height: 0px;\n\
						border-style: solid;\n\
						border-width: 7px;\n\
						border-' + textDirRight + '-width: 0;\n\
						border-' + textDirLeft + '-width: 6px;\n\
						border-color: transparent;\n\
						border-' + textDirLeft + '-color: #000;\n\
						position: absolute;\n\
						margin-top: -7px;\n\
						top: 50%;\n\
						' + textDirRight + ': 8px;\n\
					 }\n\
					 .section-item:hover > a .vb5FloatingBarByNoypiscripter-right-arrow { border-' + textDirLeft + '-color: ' + textColor + '; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item a + ul { position: absolute; ' + textDirLeft + ': 196px; top: 1px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item:hover > ul { display: block; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item a + ul > li:first-child { border-top: 1px solid #C0C0C0; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu .section-item > ul { position: absolute; ' + textDirLeft + ': 148px; top: 1px; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul:hover .section-item { z-index: 100001; }\n\
					 .vb5FloatingBarByNoypiscripter-navmenu > ul .section-item:hover ~ .section-item { z-index: 100000; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item { display: none; cursor: pointer; }\n\
					 .scrolltofixed .vb5FloatingBarByNoypiscripter-topnav-item { display: list-item; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item.username-container { padding-bottom: 7px; position: relative; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item.notifications-container a:hover .b-icon { opacity: 0.9; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item.notifications-container .b-icon {\n\
					 	background-position: 0 -176px;\n\
						width: 15px;\n\
						height: 14px;\n\
						margin-top: 5px;\n\
					 }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item.notifications-container .notifications-count { top: -4px; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item.notifications-container a:hover .notifications-count { opacity: 0.9; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item .avatar { display: inline-block; margin: 2px 0 0; border-color: #868686; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item:hover .avatar { border-color: #707070; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item .submenu {\n\
					 	display: none;\n\
						position: absolute;\n\
					 	' + textDirRight + ': 0px;\n\
						white-space: nowrap;\n\
						background: #F1F1F1;\n\
						top: 31px;\n\
						border: 1px solid #C0C0C0;\n\
						-moz-box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
						-webkit-box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
						box-shadow: ' + (textDirRight === 'left' ? '-': '') + '2px 2px 2px rgba(0, 0, 0, 0.3);\n\
					 }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item:hover .submenu { display: block !important; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item .submenu a,\n\
					 .widget-tabs.ui-tabs .ui-widget-content .vb5FloatingBarByNoypiscripter-topnav-item .submenu a {\n\
					 	color: #252C2F;\n\
						padding: 8px 10px;\n\
						line-height: 16px;\n\
						display: block;\n\
						width: 150px;\n\
					 }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item .vb5FloatingBarByNoypiscripter-login-signup { margin-top: -1px; }\n\
					 .vb5FloatingBarByNoypiscripter-topnav-item .vb5FloatingBarByNoypiscripter-login-signup + ul {\n\
					 	display: none;\n\
					 	position: absolute;\n\
						right: 0;\n\
						top: 31px;\n\
						border: 1px solid #C0C0C0;\n\
						-moz-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);\n\
						-webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);\n\
						box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);\n\
					 }\n\
					 .vb5FloatingBarByNoypiscripter-page-arrow { position: relative; top: 2px; }\n\
					 .vb5FloatingBarByNoypiscripter-page-left-arrow .vb-icon-arrow-left { margin-right: 2px; }\n\
					 .vb5FloatingBarByNoypiscripter-page-right-arrow .vb-icon-arrow-right { margin-left: 2px; }\n\
					 .vb5FloatingBarByNoypiscripter-pagenav { margin-top: -2px; }\n\
					 .conversation-toolbar-wrapper .conversation-toolbar .toolset-right > li.h-hide + .vb5FloatingBarByNoypiscripter-topnav-item { background: none; }\n\
					 html[dir="rtl"] .conversation-toolbar-wrapper .conversation-toolbar .toolset-right > li:last-child { background: none; }\n\
					 </style>')

                .attr({
                    'id': 'vb5FloatingBarByNoypiscripter_floatingBarCSS',
                    'type': 'text/css'
                })
                .appendTo('head');                

                //replace top pagination with bottom pagination                
                var paginationClickHandler = function ($context) {
                    var pageNumber = $(this).data('page'),
                        $pageNumField = $('.js-pagenum', $context).val(pageNumber),
                        keypressEvent = $.Event('keypress', { keyCode: 13 });

                    $pageNumField.trigger(keypressEvent);
                    return false;
                };

                if ($bottomPageNav.find('.button').length) {
                	var $bottomPageNavClone = $bottomPageNav.first().clone(true);
                	changePrevNextButtons($bottomPageNavClone);
                    $('.pagenav-controls', $floatingBarWrapper)
                        .append($bottomPageNavClone)
                        .find('.pagenav-form')
                        .hide();

                    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                        if (options.url.indexOf('/render/pagenav') !== -1) {
                            var origSuccess = options.success;
                            options.success = function () {                            	
                                origSuccess.apply(this, arguments);
                                changePrevNextButtons($floatingBarWrapper);
                            }
                        }
                    });

                } else {
                    //generate pagination buttons
                    var ajax = false;
                    var generatePaginationButtons = function ($container) {
                    	if ($('.pagenav-form', $container).length) {
	                        ajax = true;
	                        var pageInfo = {
	                            perpage: $('name[per-page]', $container).val(),
	                            totalpages: $('.pagetotal', $container)
	                                .html()
	                                .replace(/\D/, ''),
	                            pagenumber: $('.js-pagenum', $container)
	                                .val()
	                                .replace(/\D/, '')
	                        };

	                        if (pageInfo.totalpages == 1) {
	                            $('.toolbar-pagenav', $container).hide();
	                            return;
	                        }

	                        $.get(pageData.baseurl + "/ajax/render/pagenav", {
		                            pagenav: pageInfo
		                        }, function (result) {
		                            if (result) {
		                                var $oldPagenav = $(".pagenav-controls", $container).hide(),
		                                    isSearchWidget = $container.closest('.search-results-widget').length,
		                                    $template = $(result.template);

			                            changePrevNextButtons($template);

		                                $('.toolbar-pagenav', $container).append($template);

		                                var $newPagenavButtons = $('.pagenav .button', $container)
		                                    .on('click', function (ev) {
		                                        if (isSearchWidget) {
		                                            return true;
		                                        }
		                                        return paginationClickHandler.call(this, $container);
		                                    });

		                                if (isSearchWidget) {
		                                    var baseurl = $oldPagenav.find('.pagenav-form').attr('action');
		                                    $newPagenavButtons.each(function () {
		                                        var pagenum = $(this).data('page');
		                                        this.href = baseurl + (pagenum > 1 ? '&p=' + pagenum : '');
		                                    });
		                                } else {
		                                    $newPagenavButtons.each(function () {
		                                        this.href = vBulletin.makePaginatedUrl(location.href, $(this).data('page'));
		                                    });
		                                }
		                            }
		                        }, 'json')
	                            .always(function () {
	                                ajax = false;
	                            });
	                        }
                    };

                    function changePrevNextButtons($container) {
                    	var $prevNext = $container.find('.pagenav .button').filter(function(){
                            	return isNaN(Number($(this).html()));
                            });

                        if ($prevNext.length === 2) {
                        	$prevNext.eq(0)
                        		.attr('title', $prevNext.eq(0).html())
                        		.addClass('vb5FloatingBarByNoypiscripter-page-left-arrow vb5FloatingBarByNoypiscripter-page-arrow')
                        		.html('<span class="vb-icon vb-icon-arrow-' + textDirLeft + '"></span>');
                        	$prevNext.eq(1)
                        		.attr('title', $prevNext.eq(1).html())
                        		.addClass('vb5FloatingBarByNoypiscripter-page-right-arrow vb5FloatingBarByNoypiscripter-page-arrow')
                        		.html('<span class="vb-icon vb-icon-arrow-' + textDirRight + '"></span>');
                        }
                        else if ($prevNext.length === 1) {
                        	if ($prevNext.data('page') < $container.find('.pagenav .button.primary').data('page')) {
                        		$prevNext
                            		.attr('title', $prevNext.html())
                            		.addClass('vb5FloatingBarByNoypiscripter-page-left-arrow vb5FloatingBarByNoypiscripter-page-arrow')
                            		.html('<span class="vb-icon vb-icon-arrow-' + textDirLeft + '"></span>');
                        	}
                        	else {
                        		$prevNext
                            		.attr('title', $prevNext.html())
                            		.addClass('vb5FloatingBarByNoypiscripter-page-right-arrow vb5FloatingBarByNoypiscripter-page-arrow')
                            		.html('<span class="vb-icon vb-icon-arrow-' + textDirRight + '"></span>');
                        	}
                        }

                        $('.pagenav', $container).addClass('vb5FloatingBarByNoypiscripter-pagenav');
                    };

                    $floatingBarWrapper.each(function () {
                        var $this = $(this);
                        if ($this.find('.pagenav-controls').is(':visible')) {
                            generatePaginationButtons($this);
                        } else {
                            $this.closest('.ui-tabs').on("tabsshow", function (event, ui) {
								var $container = $(ui.tab.hash).find('.conversation-toolbar');
								if ($container.find('.pagenav-controls').is(':visible') && !ajax) {
									generatePaginationButtons($container);
								}
							});
                        }
						
						if (!$this.hasClass('scrolltofixed-floating')) {
							var $container = $this.closest('.widget-content');
							if (!$container.length) {
								$container = $(document);
							}							
							new vBulletin.scrollToFixed({
								element: $this.addClass('scrolltofixed-floating'),
								limit: $container.offset().top + $container.height()
							});
						}
						else {
							var $blogHome = $this.closest('.bloghome-widget');
							if ($blogHome.length) {
								new vBulletin.scrollToFixed({
									element: $this,
									limit: $blogHome.offset().top + $blogHome.height()
								});
							}						
						}
                    });
                }

                $(window).on('scroll' + ns, function () {
					var $activeFloatingBar = $floatingBarWrapper.filter(':visible');
					if ($activeFloatingBar.length) {
						if ($activeFloatingBar.is('.scrolltofixed')) {
							$('.filter-wrapper', $activeFloatingBar).addClass('button secondary');
						} else {
							$('.filter-wrapper', $activeFloatingBar).removeClass('button secondary');
							$activeFloatingBar.siblings('.scrolltofixed-filler').hide();
						}
					}
				});
				
				function getToolset($container, dir) {
					var $toolsetLeft = $('.toolset-' + dir, $container);
					if ($toolsetLeft.length != $container.length) {
						$toolsetLeft = $toolsetLeft.add($('.conversation-toolbar', $container)
							.not(':has(.toolset-' + dir + ')')
							.prepend('<ul class="toolset-' + dir + '"><li></li></ul>')
							.find('.toolset-' + dir));
					}
					return $toolsetLeft;
				}
				var $toolsetLeft = getToolset($floatingBarWrapper, 'left');

                //add Go to Top button
                $('.toolset-right', $floatingBarWrapper)
                    .prepend('<li class="goto-top-container"><a href="' + location.href + '#" class="button secondary goto-top-button"><label>Top</label><span class="vb-icon-wrapper"><span class="vb-icon vb-icon-triangle-up-wide"></span></span></a></li>');
                $('.goto-top-container .goto-top-button', $floatingBarWrapper)
                    .on('click', function (e) {
                        vBulletin.animateScrollTop(0, {
                            duration: "slow"
                        });
                        return false;
                    });

                //add Subscribe button
                vBulletin.subscribe = vBulletin.subscribe || {};
                var $followButton = $('.follow-btn');
                if ($followButton.length) {
                    $followButton.clone(true)
                        .removeClass('h-left')
                        .appendTo($toolsetLeft.find('li:first-child'));

                    var origSubscribeRequestSuccess = vBulletin.subscribeRequestSuccess || vBulletin.subscribe.subscribeRequestSuccess;
                    if (typeof origSubscribeRequestSuccess === 'function' && origSubscribeRequestSuccess.toString()
                        .indexOf('location.reload') != -1) {
                        vBulletin.subscribeRequestSuccess = vBulletin.subscribe.subscribeRequestSuccess = function (button, response) {
                            origSubscribeRequestSuccess($('.follow-btn'), response);
                            window.stop(); //stop location.reload after subscribing
                        };
                    }

                    var origUnsubscribe = vBulletin.unsubscribe || vBulletin.subscribe.unsubscribe;
                    if (typeof origUnsubscribe === 'function' && origUnsubscribe.toString()
                        .indexOf('location.reload') != -1) {
                        vBulletin.unsubscribe = vBulletin.subscribe.unsubscribe = function (button) {
                            origUnsubscribe($('.follow-btn'));
                        };

                        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                            if (options.url.indexOf('/api/follow/delete') != -1) {
                                var origSuccess = options.success;
                                options.success = function () {
                                    origSuccess.apply(this, arguments);
                                    window.stop(); //stop location.reload after unsubscribing
                                }
                            }
                        });
                    }
                }

				function addMainNav($container) {
					//add nav/subnav menu
					var $mainNav = $('#channel-tabbar > ul')
						.clone()
						.find('.section-item.current')
						.removeClass('current')
						.addClass('vb5FloatingBarByNoypiscripter-hasChild')
						.end();
					$mainNav.find('#mobile-main-menu,#mobile-main-menu-sections')
						.removeAttr('id');
					$mainNav.find('#mobile-main-menu-search,.mobile-search,.sections-title,.sections-icon,.dropdown-icon')
						.remove();
					$mainNav.find('>li').css('display', '');
					var $subNav = $('#channel-subtabbar > ul')
						.clone()
						.addClass('vb5FloatingBarByNoypiscripter-subnavmenu');
					if ($subNav.find('li')
						.length) {
						$mainNav.find('.section-item.vb5FloatingBarByNoypiscripter-hasChild')
							.append($subNav.addClass('h-hide')
								.find('>li')
								.addClass('section-item')
								.end())
							.find('> a')
							.append('<span class="vb5FloatingBarByNoypiscripter-right-arrow"></span>');
					}

					//add footer nav
					var $footerNav = $('#footer-tabbar .nav-list').clone().addClass('h-hide').find('li').addClass('section-item').end(),
						$langChooser = $('#footer-tabbar .chooser-list .languagechooser'),
						$styleChooser = $('#footer-tabbar .chooser-list .stylechooser'),
						chooserNavHtml = '<ul class="h-hide">',
						$chooserNav;

					//add languange chooser
					if ($langChooser.length) {
						$langChooser.find('option').each(function(){
							chooserNavHtml += '<li class="section-item"><a href="#" onclick="var $_=$(\'#footer-tabbar .chooser-list .languagechooser\');$_[0].selectedIndex=$(this).parent().index();$_.trigger(\'change\'); return false;">' + $(this).html() + '</a></li>';
						});
						chooserNavHtml += '</ul>';

						$chooserNav = $('<li class="section-item vb5FloatingBarByNoypiscripter-hasChild"><a href="javascript:void(0);">Language Chooser<span class="vb5FloatingBarByNoypiscripter-right-arrow"></span></a></li>').append(chooserNavHtml);
						$footerNav.prepend($chooserNav);
					}
					
					//add style chooser
					if ($styleChooser.length) {
						chooserNavHtml = '<ul class="h-hide">';
						$styleChooser.find('option').each(function(){
							chooserNavHtml += '<li class="section-item"><a href="#" onclick="var $_=$(\'#footer-tabbar .chooser-list .stylechooser\');$_[0].selectedIndex=$(this).parent().index();$_.trigger(\'change\'); return false;">' + $(this).html() + '</a></li>';
						});
						chooserNavHtml += '</ul>';

						$chooserNav = $('<li class="section-item vb5FloatingBarByNoypiscripter-hasChild"><a href="javascript:void(0);">Style Chooser<span class="vb5FloatingBarByNoypiscripter-right-arrow"></span></a></li>').append(chooserNavHtml);
						$footerNav.prepend($chooserNav);
					}

					$footerNav = $('<li class="section-item vb5FloatingBarByNoypiscripter-hasChild"><a href="javascript:void(0);">Footer<span class="vb5FloatingBarByNoypiscripter-right-arrow"></span></a></li>').append($footerNav);
					$mainNav.append($footerNav);

					//add breadcrumbs
					var $breadcrumbItems = $('#breadcrumbs .crumb').filter(function() {
						return $(this).children('a').length > 0;
					});
					$breadcrumbs = $breadcrumbItems.length && $('<ul></ul>')
						.append($breadcrumbItems.clone().addClass('section-item')),
					$breadcrumbsMainNav = $breadcrumbs && $('<li class="section-item vb5FloatingBarByNoypiscripter-hasChild"><a href="javascript:void(0);">You Are Here<span class="vb5FloatingBarByNoypiscripter-right-arrow"></span></a></li>')
						.append($breadcrumbs);
					$breadcrumbsMainNav && $mainNav.append($breadcrumbsMainNav);

					$('<li class="vb5FloatingBarByNoypiscripter-navmenu h-hide"></li>')
						.append($mainNav)
						.prependTo(getToolset($container, 'left'));

					var $navMenu = $('.vb5FloatingBarByNoypiscripter-navmenu');
					$('.section-item a', $navMenu).on('mouseenter.vb5FloatingBarByNoypiscripter-hover', function () {
						addHoverStyle($(this), $navMenu);
					});
				}
				addMainNav($floatingBarWrapper);

				function addHoverStyle($el, $container) {
					var navMenuBgColor, navMenuTextColor;
					if (!$('#vb5FloatingBarByNoypiscripter_floatingBarCSS_hover').length) {
						$container.attr('id', 'channel-tabbar');
						navMenuBgColor = $el.css('background-color'),
						navMenuTextColor = $el.css('color');
						$container.removeAttr('id');
						if (navMenuBgColor == 'rgba(0, 0, 0, 0)') {
							navMenuTextColor = '#252C2F';
							navMenuBgColor = '#C1C1C1';
						}
						$('<style id="vb5FloatingBarByNoypiscripter_floatingBarCSS_hover">\n\
								.widget-tabs.ui-tabs .ui-widget-content .vb5FloatingBarByNoypiscripter-navmenu .section-item:hover > a,\n\
								.vb5FloatingBarByNoypiscripter-topnav-item .submenu a:hover,\n\
								.vb5FloatingBarByNoypiscripter-navmenu .section-item:hover > a { color: ' + navMenuTextColor + ' !important; }\n\
								.vb5FloatingBarByNoypiscripter-navmenu .section-item:hover,\n\
								.vb5FloatingBarByNoypiscripter-topnav-item .submenu li:hover { background: ' + navMenuBgColor + '; }\n\
								.section-item:hover > a .vb5FloatingBarByNoypiscripter-right-arrow { border-' + textDirLeft + '-color: ' + navMenuTextColor + '; }\n\
							</style>')
							.appendTo('head');
					}
				}

				function addTopBarNav($container) {
					var $topBarNavItems = $('#main-navbar .secondary-nav')
						.clone()
						.children(':has(.divider)')
						.remove()
						.end()
						.children()
						.addClass('vb5FloatingBarByNoypiscripter-topnav-item'),
						$messagesLink = $topBarNavItems.children('.notifications-container a'),
						messageText = ($messagesLink.text() || '').replace(/\d/g, '');

					if (messageText) {
						 $messagesLink
						 	.html($messagesLink.html().replace(messageText, '<span class="b-icon"></span>'))
						 	.attr('title', messageText);
					}

					var $username = $topBarNavItems.children('#lnkUsernameMenu'), loggedIn = false;

					if ($username.length) {
						loggedIn = true;
					 	$username
					 		.children('.label')
						 	.remove()
						 	.end()
						 	.removeAttr('id')
						 	.next('.dropdown-icon')
						 	.remove();
					}
					else { //user is not logged in
						$username = $topBarNavItems.children('#lnkLoginSignupMenu');
						$username.replaceWith('<a href="/auth/login-form" class="vb5FloatingBarByNoypiscripter-login-signup b-button">' + $username.html() + '</a>');
					}

					$topBarNavItems.appendTo(getToolset($container, 'right'));

					if (loggedIn) {
						$('.vb5FloatingBarByNoypiscripter-topnav-item .submenu a').on('mouseenter.vb5FloatingBarByNoypiscripter-hover', function () {
							addHoverStyle($(this), $('.vb5FloatingBarByNoypiscripter-topnav-item'));
						});
					}
					else {
						var firstLoad = true;
						$('.vb5FloatingBarByNoypiscripter-topnav-item #idLoginIframe').on('load', function(e) {
							if (!firstLoad) {
								try {
				                    var $iframe = $(this),
				                    	$iframeContent = $iframe.contents().find("html")[0],
				                    	h = $iframeContent.scrollHeight;
				                    if (h > 0) {
				                        $iframe.height(h);
				                        $iframe.parent().height(h);
				                    }
				                } catch (err) { }
				            }
				            firstLoad = false;
						});

						$('.vb5FloatingBarByNoypiscripter-login-signup').on('click', function(e) {
							e.preventDefault();
							$(this).next('ul').slideToggle('fast');
						});
					}

				}
				addTopBarNav($floatingBarWrapper);				

				//Fix for Member Blog tab and Profile Media tab
				var selectors = ['#memberblog-tab', '#media-tab'];
				var $tabs = $(selectors.join(','));
				if ($tabs.length) {
					$(document).ajaxComplete(function(event, xhr, settings) {
						var templates = ['/render/blogmember_tab','/profile/fetchMedia'];
						$.each(templates, function() {
							if (settings.url.indexOf(this) !== -1) {
								setTimeout(function(){
									$tabs.each(function(){
										var $floatingBarTab = $('.conversation-toolbar-wrapper', this);
										if ($floatingBarTab.length) {
											generatePaginationButtons($floatingBarTab);
											addMainNav($floatingBarTab);
											addTopBarNav($floatingBarTab);
 
											var $widget = $(this).closest('.canvas-widget');
											new vBulletin.scrollToFixed({
												element: $floatingBarTab.addClass('scrolltofixed-floating'),
												limit: $widget.offset().top + $widget.height()
											});
										}
									});
								}, 100);
							}
						});						
					});
				}

                //Fix pagination in Memberlist page
                var $memberlist = $('.memberlist-widget');
                if ($memberlist.length) {
                    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                        if (options.url.indexOf('/render/memberlist_items') !== -1) {
                            var origSuccess = options.success;
                            options.success = function () {
                                origSuccess.apply(this, arguments);
                                var pageInfo = {
                                    totalpages: $('.js-memberlist-table-body', $memberlist)
                                        .data('totalPages'),
                                    pagenumber: $('.pagenav-controls .js-pagenum', $memberlist)
                                        .val(),
                                    perpage: $('.js-per-page', $memberlist)
                                        .data('perpage')
                                };
                                $.get(pageData.baseurl + "/ajax/render/pagenav", {
                                    pagenav: pageInfo
                                }, function (result) {
                                    if (result) {
                                    	var $template = $(result.template);
			                            changePrevNextButtons($template);
                                        $('.pagenav-container', $memberlist).replaceWith($template);
                                        $('.pagenav .button', $memberlist)
                                            .on('click', function (ev) {
                                                return paginationClickHandler.call(this, $memberlist);
                                            });
                                    }
                                }, 'json');


                            }
                        }
                    });
                }
            }

            if (!Function.prototype.debounce) {
                Function.prototype.debounce = function (threshold, execAsap) {
                    var func = this,
                        timeout;

                    return function () {
                        var obj = this,
                            args = arguments;
                        var delayed = function () {
                            if (!execAsap)
                                func.apply(obj, args);
                            timeout = null;
                        };

                        if (timeout)
                            clearTimeout(timeout);
                        else if (execAsap)
                            func.apply(obj, args);

                        timeout = setTimeout(delayed, threshold || 100);
                    };

                }
            }

        });
    };

    var lazyLoader = function () {
        //this script applies to all vBulletin 5+ sites only
        if (typeof window.vBulletin === 'object' && document.querySelector('.conversation-toolbar-wrapper')) {
            var lazyScript = document.getElementById('vb5FloatingBarByNoypiscripter_lazyScript'),
                lazyScriptBody = (lazyScript.textContent || '')
                    .replace(/\/\*/, '')
                    .replace(/\*\//, '');
            eval(lazyScriptBody);
        }
    }

    var lazyScript = document.createElement('script');
    lazyScript.type = 'text/javascript';
    lazyScript.id = 'vb5FloatingBarByNoypiscripter_lazyScript';
    lazyScript.textContent = '/* (' + main.toString() + ')(); */';
    document.body.appendChild(lazyScript);

    var lazyLoaderScript = document.createElement('script');
    lazyLoaderScript.type = 'text/javascript';
    lazyLoaderScript.id = 'vb5FloatingBarByNoypiscripter_lazyScriptLoader';
    lazyLoaderScript.textContent = '(' + lazyLoader.toString() + ')();';
    document.body.appendChild(lazyLoaderScript);

})();