// ==UserScript==
// @name          display ed2k links on verycd
// @description   display ed2k links on verycd
// @namespace     JaHIY
// @author        JaHIY
// @version       0.2
// @match         http://www.verycd.com/topics/*
// @downloadURL   https://userscripts.org/scripts/source/176157.user.js
// @updateURL     https://userscripts.org/scripts/source/176157.meta.js
// ==/UserScript==

(function(){

'use strict';

/*
 * DOMParser HTML extension
 * 2012-09-04
 * 
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
 
/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/
 
    (function(DOMParser) {
        "use strict";

        var DOMParser_proto = DOMParser.prototype,
            real_parseFromString = DOMParser_proto.parseFromString;

        // Firefox/Opera/IE throw errors on unsupported types
        try {
            // WebKit returns null on unsupported types
            if ((new DOMParser).parseFromString("", "text/html")) {
                // text/html parsing is natively supported
                return;
            }
        } catch (ex) {}

        DOMParser_proto.parseFromString = function(markup, type) {
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var doc = document.implementation.createHTMLDocument("");
                    if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                        doc.documentElement.innerHTML = markup;
                    }
                    else {
                        doc.body.innerHTML = markup;
                    }
                return doc;
            } else {
                return real_parseFromString.apply(this, arguments);
            }
        };
    }(DOMParser));

    document.getElementById('iptcomED2K').children.length === 1 &&
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.icili.com/emule/download/' + window.location.pathname.match(/^\/topics\/(\d+)\/?$/)[1],
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Cache-Control': 'no-cache',
            'Origin': 'http://www.icili.com',
            'Referer': 'http://www.icili.com'
        },
        onload: function (res) {
            var parser = new DOMParser(),
                children = parser.parseFromString(res.responseText, 'text/html').getElementById('emuleFile').firstElementChild.children,
                files = [],
                wrapper = document.getElementById('iptcomED2K'),
                docfrag = document.createDocumentFragment();
            for (let i=1, l=children.length-1, child; i<l; i++) {
                child = children[i].children[1].firstElementChild;
                files.push({
                    'title': child.title.trim(),
                    'href': child.href,
                    'size': children[i].children[2].textContent.trim()
                });
            }
            {
                let emuletop = document.createElement('div'),
                    emulemain = emuletop.cloneNode(false),
                    tbl = document.createElement('table'),
                    random_code = 'EM51da5b7de03b7';

                emuletop.className = 'emuletop';
                emuletop.textContent = '电驴资源';
                docfrag.appendChild(emuletop);

                emulemain.className = 'emulemain';
                docfrag.appendChild(emulemain);

                tbl.cellPadding = '2';
                tbl.cellSpacing = '1';
                tbl.width = '100%';
                emulemain.appendChild(tbl);
                {
                    let row = tbl.insertRow(-1),
                        cell = row.insertCell(-1),
                        archor = document.createElement('a');
                    cell.className = 'needemule';
                    cell.colSpan = '2';
                    archor.href = 'http://www.easymule.com/';
                    archor.textContent = '下面是用户共享的文件列表，安装电驴后，您可以点击这些文件名进行下载';
                    cell.appendChild(archor);
                }
                for (let i=0, l=files.length, row, cell_filename, cell_size, input, archor; i<l; i++) {
                    row = tbl.insertRow(-1);
                    cell_filename = row.insertCell(-1);
                    cell_size = row.insertCell(-1);
                    input = document.createElement('input');
                    archor = document.createElement('a');
                    cell_filename.className = cell_size.className = (i%2 === 0) ? 'post2' : 'post';
                    input.className = 'forminput';
                    input.type = 'checkbox';
                    input.name = 'EM51da5b7de03b7';
                    input.value = files[i]['href'];
                    input.defaultChecked = true;
                    input.setAttribute('onclick', 'em_size("' + random_code + '");');
                    archor.href = archor.ed2k = files[i]['href'];
                    archor.textContent = files[i]['title'];
                    cell_filename.appendChild(input);
                    cell_filename.appendChild(archor);
                    cell_size.align = 'center';
                    cell_size.textContent = files[i]['size'];
                }
                {
                    let row = tbl.insertRow(-1),
                        cell = row.insertCell(-1),
                        input_checkbox = document.createElement('input'),
                        input_button = input_checkbox.cloneNode(false),
                        label = document.createElement('label'),
                        span = document.createElement('span'),
                        script = document.createElement('script');
                    cell.align = 'left';
                    cell.className = (files.length%2 === 0) ? 'post2' : 'post';
                    input_checkbox.className = 'forminput';
                    input_checkbox.type = 'checkbox';
                    input_checkbox.id = 'checkall_' + random_code;
                    input_checkbox.defaultChecked = true;
                    input_checkbox.setAttribute('onclick', 'checkAll("' + random_code + '",this.checked)');
                    label.htmlFor = 'checkall_' + random_code;
                    input_button.type = 'button';
                    input_button.className = 'button downall';
                    input_button.value = '下载选中的文件';
                    input_button.setAttribute('onclick', 'download("' + random_code + '",0,1)');
                    span.id = 'updateflash' + random_code;
                    script.type = 'text/javascript';
                    script.textContent = 'changeUpdateFlash("' + random_code + '");new MultiCheckBox("' + random_code + '");';
                    cell.appendChild(input_checkbox);
                    cell.appendChild(label);
                    cell.appendChild(input_button);
                    cell.appendChild(span);
                    cell.appendChild(script);
                }
            }
            wrapper.replaceChild(docfrag, wrapper.firstElementChild);
        }
    });
})();
