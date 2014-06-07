// ==UserScript==
// @name           Configurable Flickr Homepage
// @namespace      http://www.jakob.at/greasemonkey/
// @description    The purpose of this greasemonkey script is to provide a set of modifications of the layout from the flickr homepage. Several modifications are available. All of them can be enabled or disabled by the user.
// @version 0.18
// @creator Steffen A. Jakob (http://www.jakob.at/steffen)
// @include http://*flickr.com/
// @include http://*flickr.com/?beta_toto_2=1
// ==/UserScript==
//
// Copyright (C) 2008-2009 Steffen A. Jakob
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// The GNU General Public License is available by visiting
// http://www.gnu.org/copyleft/gpl.html
// or by writing to
// Free Software Foundation, Inc.
// 51 Franklin Street, Fifth Floor
// Boston, MA  02110-1301
// USA

// Changelog
// 2009-12-12 0.18
//     Fixed a bug in saving module positions caused by a new greasemonkey version
// 2008-12-14 0.17
//     Load jquery libraries from ajax.googleapis.com
// 2008-11-11 0.16
//     Bugfix for removing tips
// 2008-11-11 0.15
//     Bugfix for moving upload to menubar
// 2008-11-11 0.14
//     Added option to show rounded borders
//     Adapted script to markup changes of the flickr homepage
// 2008-11-06 0.13
//     Show images in recent activities by default.
// 2008-11-06 0.12
//     Modules can now be positioned by using drag&drop
//     Use the jQuery framework
// 2008-11-01 0.11
//     Group images will now link in the group pool
//     It's possible to move the photostream to the right column
// 2008-11-01 0.10 Resize width of comments in recent activities
// 2008-10-31 0.9 First public version

// Add jQuery
function importJs(url) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js');
importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.js');
//importJs('http://dev.jquery.com/view/tags/ui/latest/ui/ui.core.js');
//importJs('http://dev.jquery.com/view/tags/ui/latest/ui/ui.sortable.js');
    
// Check if jQuery's loaded
function jQueryWait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(jQueryWait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        main();
    }
}
jQueryWait();

// Here comes the main action
function main() {
    initFlags();
    fixMarkup();
    changeLayout();
    initConfiguration();
}

// First we fix some things in the original flickr markup to make things
// easier.
function fixMarkup() {
    // Put the upload link and the associated divider in a div container.
	$('div#tt-upload').addClass('saj-block');
	if (grayBackground) {
		$('#tt-upload .tt-divider').css('margin', '');
	}

	// Fix padding for closed sections in the right column.
	GM_addStyle(
		'.tt-col2 .tt-block .tt-closed-wrapper { padding: 8px ! important; }\n'
	);
}

// Read configuration flags.
function initFlags() {
	// Configuration
	configTitle = 'Configuration of the flickr homepage layout';

    dragDrop = GM_getValue('dragDrop', true);
    customPositions = GM_getValue('customPositions', true);
    showBuddyIcon = GM_getValue('showBuddyIcon', false);
    showBlog = GM_getValue('showBlog', true);
    dynamicWidth = GM_getValue('dynamicWidth', true);
    grayBackground = GM_getValue('grayBackground', true);
	roundedBorder = GM_getValue('roundedBorder', false);
    showTips = GM_getValue('showTips', true);
    showImages = GM_getValue('showImages', true);
    showUploadInMenuBar = GM_getValue('showUploadInMenuBar', true);
    linkToGroupPool = GM_getValue('linkToGroupPool', true);
}

// Change the original flickr layout according to the user's preferences.
function changeLayout() {
    // Remove the buddy icon
    if (!showBuddyIcon) {
        $('table.launchHead').remove();
		GM_addStyle('#Main {margin-top: 15px ! important; }');
    }

    // Dynamic width of homepage contents
    if (dynamicWidth) {
        GM_addStyle(
            '.act-data { width: 95% ! important; }\n' +
            '.tt-col1 { width: 50% ! important; min-height: 200px ! important; }\n' +
            '.tt-col2 { width: 47% ! important; min-height: 200px ! important; }\n' +
            '#Main { margin-left: 10px ! important; margin-right: 10px !important; }\n' +
            '#Main, .Header, .NavBar, div.Footer { width: 98% ! important; }\n');
    }

    // Gray background with rounded corners
    if (grayBackground) {
        GM_addStyle(
            '.saj-block, .tt-module, .tt-block { ' +
			'padding: 5px 3px ! important; background-color: #f6f6f6 ! important;' +
			(roundedBorder ? '-moz-border-radius: 3px ! important;' : '') +
			'border: 1px solid #cccccc ! important; }\n' +
			'#y-groups > .bd > div:first-child { margin-top: 0 ! important; }\n' +
            '.saj-block, #y-groups { margin-bottom: 20px ! important; }\n');
	}

    // Extend links from group images so that the will link in the group pool
    if (linkToGroupPool) {
		hrefs = $('#y-groups .bd h3.special a').attr('href');
		if (typeof hrefs != 'undefined') {
			poolUrl = hrefs.replace(/.*\/groups\//, '');
			$('div#y-groups span.photo_container a:not([href*=in/pool])').attr('href', function() {
				return this.href + 'in/pool-' + poolUrl;
			});
		}
    }

    // Set position of modules
    function getNodeKey(n) {
        return n.tagName + ' ' + $(n).attr('id');
    }
    
    if (customPositions) {
        var nodes = [];
        $('.tt-col1,.tt-col2').children().each(function (i, v) {
            nodes[getNodeKey(v)] = v;
        });
        
        function setColumn(c, nodes) {
            parent = $(c);
            var m = eval(GM_getValue('state' + c));
            for (i in m) {
				node = nodes[m[i]];				
				if (typeof node != 'undefined') {
					parent.append($(nodes[m[i]]));
				}
            }
        }
        
        setColumn('.tt-col1', nodes);
        setColumn('.tt-col2', nodes);
    }
    
    // Drag & drop modules
    if (dragDrop) {
        GM_addStyle('.placeholder { border: 2px dashed #cccccc; }\n');
        function saveColumnState(c) {
            var m = [];
            $(c).children().each(function (i, v) {
                m[i] = getNodeKey(v);
            });
            // window.setTimeout(GM_setValue, 0, 'state' + c, m.toSource());
            window.setTimeout(function() { GM_setValue('state' + c, m.toSource()) }, 0);
        }

		var sortables = $('.tt-col1, .tt-col2, #ad-block');
		sortables.sortable({
			items: '.tt-module, .tt-block, #ad-block, .saj-block',
			connectWith: $('.tt-col1, .tt-col2'),
			cursor: 'move',
			forcePlaceholderSize: 'true',
			placeholder: 'placeholder',
            start: function(e,ui) {
                ui.helper.css('width', ui.item.width());
            },
            stop: function(e, ui) {
                saveColumnState('.tt-col1');
                saveColumnState('.tt-col2');
            }
        });
    }
    
    // Flickr blog
    if (!showBlog) {
        $('#tt-blog').remove();
    }

    // Tips
    if (!showTips) {
        $('#tt-tips').remove();
    }

    // Images in recent activity
    if (!showImages) {
        $('#y-photostream .act-content img').remove();
    }

    // Upload link
    if (showUploadInMenuBar) {
        $('#tt-upload').remove();
        $('ul.site_nav_menu_buttons').eq(0).append($('<li class="no_menu_li"><span><a href="/photos/upload/">Upload</a></span></li>'));
    }
}

function initConfiguration() {
    GM_registerMenuCommand(configTitle, createConfigurationDialog);
}

function createConfigurationDialog() {
    GM_addStyle(
        '#homepageconfigcontainer { position:fixed; top:0; left:0; right:0; bottom:0; z-index:1000; }'+
        '#homepageconfig { text-align: left; width:400px; padding:10px; margin:40px auto 0;' +
        ' background:#eeeeee; -moz-border-radius: 5px;' +
        ' border:2px solid #444444;' +
        '}'
    );

    var div = document.createElement('div');
    div.id = 'homepageconfigcontainer';
    div.innerHTML =
        '<div id="homepageconfig">' +
        '<h2 style="margin-bottom:10px;">&raquo; ' + configTitle + '</h2>'+
        '<div style="font-size:12px;">' +
        '<table width="100%">' +        
        getLabel('hpc_width', 'Adjust homepage width to size of browser', 'dynamicWidth', true) +
        getLabel('hpc_dragdrop', 'Enable drag&drop', 'dragDrop', true) +
        getLabel('hpc_custompositions', 'Use customized module positions', 'customPositions', true) +
        getLabel('hpc_graybackground', 'Use gray background for modules', 'grayBackground', true) +
        getLabel('hpc_roundedborder', 'Show rounded borders around modules', 'roundedBorder', false) +
        getLabel('hpc_upload', 'Show upload link in menubar', 'showUploadInMenuBar', true) +
        getLabel('hpc_images', 'Show images in recent activities', 'showImages', true) +
        getLabel('hpc_buddy', 'Show buddy icon', 'showBuddyIcon', false) +
        getLabel('hpc_blog', 'Show flickr blog', 'showBlog', true) +
        getLabel('hpc_linkgrouppool', 'Link group images to group pool', 'linkToGroupPool', true) +
        getLabel('hpc_tips', 'Show tips', 'showTips', true) +		
        '</table>' +
        '<div class="tt-divider" style="padding:10px;"></div>' +
        '<div style="text-align:center; margin-top=10px;"><input type="button" onclick="document.getElementById(\'homepageconfigcontainer\').parentNode.removeChild(document.getElementById(\'homepageconfigcontainer\')); document.location.reload();" value="Ok" /></div>'+
        '</div>' +
        '</div>';
    
    $('#toto-main').prepend(div);
    
    addListener('hpc_width', 'dynamicWidth', true);
    addListener('hpc_dragdrop', 'dragDrop', true);
    addListener('hpc_custompositions', 'customPositions', true);
    addListener('hpc_buddy', 'showBuddyIcon', false);
    addListener('hpc_blog', 'showBlog', true);
    addListener('hpc_graybackground', 'grayBackground', true);
    addListener('hpc_roundedborder', 'roundedBorder', false);
    addListener('hpc_linkgrouppool', 'linkToGroupPool', true);
    addListener('hpc_tips', 'showTips', true);
    addListener('hpc_images', 'showImages', true);
    addListener('hpc_upload', 'showUploadInMenuBar', true);
}

function addListener(id, flag, defaultValue) {
    document.getElementById(id).addEventListener('click', function() {
        GM_setValue(flag, this.checked); }, defaultValue);
}

function getLabel(id, label, flag, defaultValue) {
    var label =
        '<tr><td><label for="' + id + '">' + label + '</label>' +
        '<td><input style="margin-left:15px; padding:10px;" type="checkbox" id=\"' + id + '\"' +
            (GM_getValue(flag, defaultValue) ? 'checked="checked" ' : '') + '/>' +
        '<br>';
    return label;
}
