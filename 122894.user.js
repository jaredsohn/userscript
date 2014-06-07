// ==UserScript==
// @name           Adobe Products Direct Download
// @namespace      http://qixinglu.com
// @description    Change Adobe products download link to direct url
// @include        http://www.adobe.com/cfusion/tdrc/index.cfm?product=*
// @include        https://www.adobe.com/cfusion/tdrc/index.cfm?product=*
// @include        http://get.adobe.com/flashplayer/
// @include        http://get.adobe.com/flashplayer/otherversions/
// @include        http://get.adobe.com/*/flashplayer/
// @include        http://get.adobe.com/*/flashplayer/otherversions/
// @include        http://get.adobe.com/reader/
// @include        http://get.adobe.com/reader/otherversions/
// @include        http://get.adobe.com/*/reader/
// @include        http://get.adobe.com/*/reader/otherversions/
// ==/UserScript==

var sites = [
    {
        url: 'cfusion/tdrc/index.cfm?product=',
        handler: function() {
            var versions_node = document.getElementById('product1')
            var get_url = function() {
                return versions_node.value.match(new RegExp('http://.*$'))[0];
            }
            var download_button = document.getElementById('download-button');
            var download_link = document.createElement('a');
            download_link.id = 'download-link';
            download_link.className = 'download-button';
            download_link.href = get_url();
            download_link.text = download_button.textContent;
            download_button.parentNode.replaceChild(download_link, download_button);
            versions_node.onchange = function() { 
                download_link.href = get_url();
            }
        },
    },
    {
        url: '/otherversions/',
        handler: function() {
            var versions_node = document.getElementById('installer')
            var get_url = function() {
                if (versions_node.value === '0') {
                    return 'javascript:void(0)';
                }
                return '../completion/?installer=' + versions_node.value;
            }
            var download_button = document.getElementById('buttonDownload');
            var download_link = document.createElement('a');
            download_link.id = 'download-link';
            download_link.href = get_url();
            download_link.className = 'download-button';
            download_link.text = download_button.textContent;
            download_button.style.display = 'none';
            download_button.parentNode.appendChild(download_link);
            versions_node.onchange = function() { 
                download_link.href = get_url();
                var addon_node = document.getElementsByClassName('addon')[0];
                addon_node.parentNode.removeChild(addon_node);
            }
        }
    },
    {
        url: 'get.adobe.com/',
        handler: function() {
            var installer_node = document.getElementById('installer');
            var download_link = document.getElementById('buttonDownload');
            download_link.href = 'completion/?installer=' + installer_node.value;
            var addon_node = document.getElementsByClassName('addon')[0];
            addon_node.parentNode.removeChild(addon_node);
        }
    }
];

var url = document.URL;
var i, site;
for (i = 0; i < sites.length; i += 1) {
    site = sites[i];
    if (url.indexOf(site.url) != -1) {
        site.handler();
        break;
    }
}
