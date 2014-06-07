// ==UserScript==
// @name          Dark YouTube Style
// @namespace     YouTube
// @description   Dark YouTube Style
// @author        Mexaon
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @include       https://apis.google.com/*
// @include       https://plus.googleapis.com/*
// @version       1.5
// @grant         none
// @run-at        document-start
// ==/UserScript==

(function() {


if(window.location.toString().match(/parent=http.+?www.youtube.com/gi)){


	var css = "";
	
	css += ".yJa,.DJa,.dn,.Aq,.ot-hashtag, .proflink,a,a span,.xN .d-y-r-c-ha, .Pga.d-A .d-A-B,.xN .d-y-r-c-ha, .Pga.d-A .d-A-B,.r3 .r0,.r3 .PA,.d-A, .d-Kl,.ve.oba,.OF{color:#999 !important}";
	css += ".DJa,.mj,.BJa,.yJa,.xN.d-y-r-c, .xN.d-y-r-c.d-y-r-c-eb,.d-r,.r3 .r0,.r3 .PA,.nbc{background-color:#222 !important}";
	css += ".r3 .r0:hover,.dga{background-color:#333 !important}";
	css += ".d-y-r-c,.r3 .r0,.nbc,.d-r,.dga{border-color:#505050 !important}";
	css += ".MJa,.LJa {background-color:#999 !important;opacity:0.7 !important;border-radius:4px !important}";
	css += ".oba .MJa:hover, .oba .LJa:hover, .via .MJa:hover, .via .LJa:hover {opacity: 1 !important}";
	css += ".r3 .r0,.r3 .r0:hover,.r3 .PA{background-image:none !important}";
	css += ".o-ms-fk {box-shadow:0 2px 8px #505050 !important}";
	css += ".yDa {background-color:#505050 !important}";
	css += ".oba .Zld {background-color: #A00 !important}";
	
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node); 
		} else {
			// no head yet, stick it whereever
			document.documentElement.appendChild(node);
		}
	}
} else if (window.location.host == 'www.youtube.com')
{


	var css = "";
	css += "body,a,.not-exp-new-metadata-style .yt-lockup,ul.appbar-nav-menu li a,a.yt-uix-button-epic-nav-item.selected, a.yt-uix-button-epic-nav-item.yt-uix-button-toggled, button.yt-uix-button-epic-nav-item.selected, button.yt-uix-button-epic-nav-item.yt-uix-button-toggled, .epic-nav-item.selected, .epic-nav-item.yt-uix-button-toggled, .epic-nav-item-heading,button,.yt-uix-button-menu .yt-uix-button-menu-item,#watch7-headline h1 .long-title,#watch-description,.video-list .video-list-item .title,#watch-description-extras .title,.watch-view-count,.yt-uix-expander-head,input,#c4-about-tab, .about-metadata-container,#c4-about-tab .about-stats .about-stat,.branded-page-module-title,#yt-masthead-user-displayname,.yt-badge,#vm-page-subheader h3,.vm-list-view .vm-video-list .vm-video-desc,#non-appbar-vm-video-actions-bar .vm-video-actions-inner #vm-view-filter-label, .vm-copyright-filter-wrapper,input,.share-panel,.not-exp-new-metadata-style .video-player-view-component .view-count .count,.not-exp-new-metadata-style .video-player-view-component,#watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot,#watch7-action-buttons .yt-uix-button-content,.yt-lockup{color:#999 !important}";
	css += "a:visited,ul#watch-related a:visited span,.yt-picker-content strong{color:#2793E6 !important}";
	css += "body.site-center-aligned,#masthead-appbar,.site-center-aligned .yt-card,.site-center-aligned .yt-card,#watch7-content,#watch7-headline,#watch7-user-header,#watch7-sidebar,.watch-playlists-drawer ul,#yt-picker-country-footer, #yt-picker-language-footer, #yt-picker-safetymode-footer,#non-appbar-vm-video-actions-bar, #non-appbar-vm-video-actions-bar .vm-video-actions-bar,.vm-list-view .vm-video-list li,.site-center-aligned #masthead-positioner:hover #appbar-guide-button,#watch7-sidebar,#watch-response,.exp-css-ellipsis .yt-ui-ellipsis{background-color:#222 !important}";
	css += "#yt-masthead-container,body #footer-container,#masthead-appbar,.guide-pinned .guide-pinning-enabled #appbar-guide-menu,#watch7-action-buttons,#watch7-action-panels,#watch-discussion,.watch-playlists-drawer ul,.branded-page-v2-primary-col .branded-page-box,.yt-horizontal-rule,.site-center-aligned .branded-page-v2-subnav-container,.feed-item-container.legacy-style .feed-item-main,.feed-item-content-wrapper.playlist-promo, .feed-item-content-wrapper.channel-lockup,.c4-welcome-primary-col,.welcome.c4-spotlight-module-component,.pl-video,.site-center-aligned #masthead-positioner:hover #appbar-guide-button,.yt-uix-button-subscribe-unbranded, .yt-uix-button-subscribe-unbranded[disabled], .yt-uix-button-subscribe-unbranded[disabled]:hover, .yt-uix-button-subscribe-unbranded[disabled]:active, .yt-uix-button-subscribe-unbranded[disabled]:focus,#watch-response-content{border-color:#505050 !important}";
	css += ".site-center-aligned #yt-masthead-container,.site-center-aligned #masthead-expanded-container,.site-center-aligned #footer-container,#appbar-guide-menu, .guide-flyout,.yt-thumb,#yt-masthead-user #sb-button-notify{background-color:#333 !important}";
	css += ".guide-item.guide-item-selected, .guide-item.guide-item-selected:hover, .guide-item.guide-item-selected .yt-deemphasized-text, .guide-item.guide-item-selected:hover .yt-deemphasized-text, .guide-collection-item .guide-item.guide-item-selected,.yt-uix-form-input-checkbox-container input:checked + .yt-uix-form-input-checkbox-element{background-color:#505050 !important;}";
	css += ".guide-flyout-trigger.on-hover, .guide-item:hover, .guide-item:hover .yt-deemphasized-text, .guide-collection-item:hover .guide-item{background-color:#505050 !important;}";
	css += ".yt-uix-button-default, .yt-uix-button-default[disabled], .yt-uix-button-default[disabled]:hover, .yt-uix-button-default[disabled]:active, .yt-uix-button-default[disabled]:focus,#watch7-action-panels #watch7-action-panel-footer,.metadata-inline,.exp-appbar-onebar #masthead-positioner:hover #appbar-guide-button,#masthead-search-terms,.compact-shelf .yt-uix-button-shelf-slider-pager,.yt-uix-button-subscribed-branded, .yt-uix-button-subscribed-branded[disabled], .yt-uix-button-subscribed-branded[disabled]:hover, .yt-uix-button-subscribed-branded[disabled]:active, .yt-uix-button-subscribed-branded[disabled]:focus, .yt-uix-button-subscribed-unbranded, .yt-uix-button-subscribed-unbranded[disabled], .yt-uix-button-subscribed-unbranded[disabled]:hover, .yt-uix-button-subscribed-unbranded[disabled]:active, .yt-uix-button-subscribed-unbranded[disabled]:focus,.yt-uix-form-input-select, .yt-uix-form-input-text, .yt-uix-form-input-textarea,select,.yt-uix-button-menu,.yt-uix-button-subscribe-branded.yt-is-buffered, .yt-uix-button-subscribe-branded:active, .yt-uix-button-subscribe-branded.yt-uix-button-toggled, .yt-uix-button-subscribe-branded.yt-uix-button-active, .yt-uix-button-subscribed-branded.external, .yt-uix-button-subscribed-branded.external[disabled], .yt-uix-button-subscribed-branded.external:active, .yt-uix-button-subscribed-branded.external.yt-uix-button-toggled, .yt-uix-button-subscribed-branded.external.yt-uix-button-active,.yt-uix-button-subscribe-branded, .yt-uix-button-subscribe-branded[disabled], .yt-uix-button-subscribe-branded[disabled]:hover, .yt-uix-button-subscribe-branded[disabled]:active, .yt-uix-button-subscribe-branded[disabled]:focus{background-color:#222 !important;border-color:#777 !important;color:#999 !important}";
	css += "#masthead-search-terms,.watch-playlists-drawer ul,.feed-item-content-wrapper.playlist-promo, .feed-item-content-wrapper.channel-lockup{box-shadow: 0 1px 2px #777777 inset !important}";
	css += ".yt-uix-button-subscribed-branded, .yt-uix-button-subscribed-branded[disabled], .yt-uix-button-subscribed-branded[disabled]:hover, .yt-uix-button-subscribed-branded[disabled]:active, .yt-uix-button-subscribed-branded[disabled]:focus, .yt-uix-button-subscribed-unbranded, .yt-uix-button-subscribed-unbranded[disabled], .yt-uix-button-subscribed-unbranded[disabled]:hover, .yt-uix-button-subscribed-unbranded[disabled]:active, .yt-uix-button-subscribed-unbranded[disabled]:focus,.yt-uix-form-input-select,.yt-uix-button-subscribe-branded.yt-is-buffered, .yt-uix-button-subscribe-branded:active, .yt-uix-button-subscribe-branded.yt-uix-button-toggled, .yt-uix-button-subscribe-branded.yt-uix-button-active, .yt-uix-button-subscribed-branded.external, .yt-uix-button-subscribed-branded.external[disabled], .yt-uix-button-subscribed-branded.external:active, .yt-uix-button-subscribed-branded.external.yt-uix-button-toggled, .yt-uix-button-subscribed-branded.external.yt-uix-button-active,.yt-uix-button-subscribe-branded, .yt-uix-button-subscribe-branded[disabled], .yt-uix-button-subscribe-branded[disabled]:hover, .yt-uix-button-subscribe-branded[disabled]:active, .yt-uix-button-subscribe-branded[disabled]:focus,.yt-uix-button-subscribe-unbranded, .yt-uix-button-subscribe-unbranded[disabled], .yt-uix-button-subscribe-unbranded[disabled]:hover, .yt-uix-button-subscribe-unbranded[disabled]:active, .yt-uix-button-subscribe-unbranded[disabled]:focus{background-image:none !important}";
	css += ".yt-uix-button-subscribe-branded, .yt-uix-button-subscribe-branded[disabled], .yt-uix-button-subscribe-branded[disabled]:hover, .yt-uix-button-subscribe-branded[disabled]:active, .yt-uix-button-subscribe-branded[disabled]:focus {border-width:1px !important}";
	css += ".site-center-aligned .guide-item, .site-center-aligned .guide-view-more{height:22px !important}";
	css += ".yt-uix-button .yt-uix-button-icon-action-panel-transcript,.yt-uix-button-icon-action-panel-stats,.yt-uix-button-icon-action-panel-report,.yt-uix-button-icon-watch-dislike,.yt-uix-button-icon-watch-like{background-color:#505050 !important;border-radius:4px !important}";
	css += ".yt-uix-button-icon-action-panel-report{border:4px solid #505050 !important}";
	css += "#watch7-action-buttons .yt-uix-button-content{text-shadow:none}";
	
	
	css += ".watch-sidebar {width:400px}";

	css += ".site-center-aligned #player.watch-medium {max-width: 1217px !important;min-width: 1000px !important;width: auto !important}";
	css += ".site-center-aligned #player.watch-large #player-api, .site-center-aligned #player.watch-medium #player-api{float:left !important}";
	css += ".watch-wide{margin-left:-90px}.watch-wide #watch7-content {width:854px !important}body#body .watch-wide #watch7-sidebar{margin-top: -525px !important;margin-left: 860px}";
	
	css += ".watch-wide #watch-discussion .comments-iframe-container{max-width: 830px !important}.watch-wide #comments-test-iframe {width:825px !important}.watch-wide #comments-test-iframe iframe{width:825px !important} ";
	css += ".watch-wide .action-panel-content{width:814px !important}";
	
	
	css += ".gsok_a{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAALCAMAAACqC0YIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDg3MDUyRDJBOURFMTFFM0FBRDhFOThDQUFBOTNDMTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDg3MDUyRDNBOURFMTFFM0FBRDhFOThDQUFBOTNDMTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODcwNTJEMEE5REUxMUUzQUFEOEU5OENBQUE5M0MxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowODcwNTJEMUE5REUxMUUzQUFEOEU5OENBQUE5M0MxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrwmKVgAAAAJUExURdTU1N3d3RwcHPviKB4AAAAaSURBVHjaYmAgGjChQXqpA6pEAAYSAECAAQAdiABHfgRDMQAAAABJRU5ErkJggg==) !important}";
	css += "#masthead-search .search-btn-component .yt-uix-button-content,#channel-search .show-search img, #channel-search .yt-uix-button-icon-search{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDUxNjEzMjhBOURGMTFFM0E4OEE5NjYxMUJBOEZGRUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDUxNjEzMjlBOURGMTFFM0E4OEE5NjYxMUJBOEZGRUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENTE2MTMyNkE5REYxMUUzQTg4QTk2NjExQkE4RkZFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENTE2MTMyN0E5REYxMUUzQTg4QTk2NjExQkE4RkZFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgeBA8AAADYSURBVHjanJI9DoJAEIUHpPEeFnoEQmEsrWi0AoyF99h4l6WzIRbWFBIP4T2szPqib5NxoSC85AvZ2X2ZP6Ku6wSKQAFykMlPd9CAGjhRStNUEpoM0dqRBTiH5piZDC8s2BPLmOGbPyUsT1hSpe4u/JZ8Y8OMvqdG+vKxLLyIZaJiTk9UyVq5mnCvx4bTK4LychW7DhlrjtxwEOVA5g3fvbXRcU/P4Ad4gBVYgiNjJ29OGPA7tEGmObiBNc0zcBgz1RfYgpbnyrcyZh2h+VtV5JybtMePAAMAJ0Uw03R7ewkAAAAASUVORK5CYII=) 0 0 !important}";
	
	css += "#yt-masthead-user .sb-notif-on .yt-uix-button-icon-bell{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdGREI1QzZBRkZEMTFFMzhDNTZDMEUwNUIzRUQ3QjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdGREI1QzdBRkZEMTFFMzhDNTZDMEUwNUIzRUQ3QjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozN0ZEQjVDNEFGRkQxMUUzOEM1NkMwRTA1QjNFRDdCNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozN0ZEQjVDNUFGRkQxMUUzOEM1NkMwRTA1QjNFRDdCNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvOz+EwAAADuSURBVHjaYvj//z8DHtwBxJ+AuA2fOkYQgQcgSzLiUsSEQ9wNiFehiYH4rtitwnTetP/4wRR0PegGTP1PHJiIyxC7/6QBc2yGrCfRkNXoscMCxE+AWJyBePAUiOWB+C8sdriAmI+BNCAE1QePYpBz/pJoyF9Y2mHCkbCIAf9hepgYqACoasg3IP5Hot5/UH1wQ3hhIU0C4ILqAxtiAsQ7gZiVRENYofpMQIntGZAhCcSf0RR9Rot2ZpjNSADEfw4yRALI+IrFJpD4F3QNWNRx4yvVlkLzyCcovQKXWnyG6ADxGagBZ4FYF5dagAADAFmovN7d8en7AAAAAElFTkSuQmCC) no-repeat scroll 3px  5px !important} ";
	css += "#yt-masthead-user .yt-uix-button-icon-bell{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODFGRTY3MTVBRkZFMTFFMzlFRUZCMzRDQzQwMTUwOTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODFGRTY3MTZBRkZFMTFFMzlFRUZCMzRDQzQwMTUwOTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MUZFNjcxM0FGRkUxMUUzOUVFRkIzNENDNDAxNTA5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MUZFNjcxNEFGRkUxMUUzOUVFRkIzNENDNDAxNTA5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhaAw7sAAAEsSURBVHjaYvj//z8DHtwBxJ+AuA2fOkYQgQcgSzLiUsSEQ9wNiNegiYH4rtitwnTetP8I8A/qHWQwBV0PugFTkRTXArESEPMCsQoQ1yPJTcJliC1UwR8gtsQRiPZIBplhM2QjVLKOQIw1Q9WtRTeEBYi/QCXlCRiiAFX3AYiZQWKw2OECYm4o+y0DfvAcSvND9cENQU4P7AQMYUVPO9jSCSMBQxjREyMTAxUAVQyB5R1mIP4DFWMD4t8E9MHCkAWI/7JAObxICqQJxBAP1BBGqL4PoHg3AeKT/8kDIH0mIO88A5omCcSf0Vz1DeRUJBcww9IFEHyBugak9jnIEAkg4ysWZ0tAFTMgGf4cizpufMl7KdTJsKJgBS61+AzRAeIzUAPOArEuLrUAAQYAiJIhdezgjT0AAAAASUVORK5CYII=) no-repeat scroll 3px  5px !important; opacity: 0.5 !important} ";
	
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node); 
		} else {
			// no head yet, stick it whereever
			document.documentElement.appendChild(node);
		}
	}
  
  //vid = window.location.search.match(/(?:\&|\?)v=(.+)(?:\&|$)/);
}

})();