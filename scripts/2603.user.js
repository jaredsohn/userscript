// ==UserScript==
// @name          dictTuChem
// @namespace     http://www.demiurg.org/
// @description   an interface to a German <-> English Dictionary by TU Chemnitz at http://dict.tu-chemnitz.de/
// @include       *
// @exclude       http://dict.tu-chemnitz.de/*
// @version       1.3
// ==/UserScript==

/*
 * {{{ Notice
 *
 * dictTuChem - an interface to a German <-> English Dictionary by TU Chemnitz at http://dict.tu-chemnitz.de/
 * Copyright (C) 2006 Levon Ghazaryan
 *
 * Dedicated to my wife Elena, our love and patience in our relationship.
 * Levon Ghazaryan 14.01.2006 Hamburg
 *
 * dictTuChem is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * dictTuChem is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You will find a copy of the GNU General Public License
 * at http://www.gnu.org/licenses/gpl.txt; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * }}} Notice
 */

// {{{ dictTuChemWrapStringAt()
function dictTuChemWrapStringAt(str, length)
{
    if (str.length > length)
    {
        words = str.split(' ');
        for (var i = 0; i < words.length; i++)
        {
            if (words[i].length > length)
            {
                words[i] = words[i].substring(0, length) + '- ' + words[i].substring(length);
            }
        }

        str = words.join(' ');
    }

    return str;
}
// }}} dictTuChemWrapStringAt()

// {{{ dictTuChemSetQuery()
function dictTuChemSetQuery(s)
{
    this.query.value = s;
    this.query.select();
}
// }}} dictTuChemSetQuery()

// {{{ createSelectElement()
function createSelectElement(name, options)
{
    var s = document.createElement('select');
    s.name = name;

    var o = null;
    var t = null;
    var opt = null;
    for (var opt_index in options)
    {
        opt = options[opt_index];

        o = document.createElement('option');
        t = document.createTextNode(opt.name)
        o.appendChild(t);
        o.value = opt.value;
        s.appendChild(o);
    }

    return s;
}
// }}} createSelectElement()

// {{{ createInputElement()
function createInputElement(params)
{
    var inputElm = document.createElement('input');

    inputElm.type = params.type;
    inputElm.name = params.name;

    if (params.value) inputElm.value = params.value;
    if (params.size) inputElm.size = params.size;

    return inputElm;
}
// }}} createInputElement()

// {{{ dictTuChemOpen()
function dictTuChemOpen(mouseEvent, selection)
{
    // ue 252  UE 220  ae 228  AE 196  oe 246  OE 214  ss 223
    // ue \xFC UE \xDC ae \xE4 AE \xC4 oe \xF6 OE \xD6 ss \xCF
    Pattern = /[a-z\xFC\xDC\xE4\xC4\xF6\xD6\xCF ]+/i;
    var words = Pattern.exec(selection.toString());
    this.query.value = words[0];

    this.style.display = 'block';

    var diffY = 0, diffX = 0, paddingX = 50, paddingY = 20;
    var rightDistance = (window.pageXOffset + window.innerWidth - mouseEvent.pageX);
    if (rightDistance < (this.offsetWidth + paddingX))
    {
        diffX = (this.offsetWidth + paddingX) - rightDistance;
    }

    var bottomDistance = (window.pageYOffset + window.innerHeight - mouseEvent.pageY);
    if (bottomDistance < (this.offsetHeight + paddingY))
    {
        diffY = (this.offsetHeight + paddingY) - bottomDistance + 30;
    }

    this.style.top = (mouseEvent.pageY + 10 - diffY) + 'px';
    this.style.left = (mouseEvent.pageX + 10 - diffX) + 'px';

    //this.query.focus();
    this.query.select();
}
// }}} dictTuChemOpen()

// {{{ dictTuChemQueryString()
function dictTuChemQueryString()
{
    var self = this;

    // still dunno how to fix this: the response seams to
    // arrive with broken umlaut characters, accept=charset was just a
    // dumb idea
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://dict.tu-chemnitz.de/dings.cgi?' +
                    'lang=en&' +
                    'noframes=1&' +
                    'service=' + this.service.value + '&' +
                    'query=' + encodeURI(this.query.value) + '&' +
                    'optword=1&' +
                    'optcase=1&' +
                    'opterrors=0&' +
                    'optpro=0&' +
                    'style=&' +
                    'dlink=self',
            headers: {
                'Accept-Charset':'iso-8859-5, unicode-1-1;',
            },
            onload: function(responseDetails) {
                //alert(responseDetails.responseHeaders);
                self.parseResults(responseDetails.responseText);
                self.displayResults();
            }
        }
    );
}
// }}} dictTuChemQueryString()

// {{{ dictTuChemParseResults()
function dictTuChemParseResults(data)
{
    var lines = data.split("\n");

    resultRowOpen = /<tr id="row" class="s[12]">/mg;
    resultRowClose = /<\/tr>/mg;
    resultField = /<td class="r|f">/;

    var row = false, line = '', result_index = 0, field_index = 1;
    for (var line_index in lines)
    {
        line = lines[line_index];

        if (resultRowOpen.test(line))
        {
            row = true;
            continue;
        }

        if (row)
        {
            if (resultField.test(line))
            {
                if (field_index > 2)
                {
                    field_index = 1;
                    result_index++;
                }

                if (!this.results[result_index])
                {
                    this.results[result_index] = { de: '', en: '' };
                }

                dlinkCall = line.match(/dl\('[^']+'[^']+\'([den]{2})\'\)/);
                lang = dlinkCall[1];
                result = line.replace(/<[^>]+>/g, '');

                if (lang == 'de')
                {//if (!confirm(result_index + ' ' + result)) return;
                    this.results[result_index].de = result;
                }
                else
                {//if (!confirm(result_index + ' ' + result)) return;
                    this.results[result_index].en = result;
                }

                field_index++;
                //if (!confirm(this.results[result_index].en)) return;
            }

            if (resultRowClose.test(line)) row = false;
        }
    }
}
// }}} dictTuChemParseResults()

// {{{ dictTuChemDisplayResults()
function dictTuChemDisplayResults()
{
    var self = this;
    if (this.results.length < 1) return;

    this.resultsDiv.innerHTML = '';
    this.resultsDiv.style.display = 'block';

    var d = null, a = null, t = null, table = null, row = null, td = null, de_enc_str = '';

    table = document.createElement('table');
    table.align = 'center';
    table.cellPadding = '0px';
    table.cellSpacing = '1px';
    //table.style.tableLayout = 'fixed';
    this.resultsDiv.appendChild(table);

    // ue \xFC UE \xDC ae \xE4 AE \xC4 oe \xF6 OE \xD6 ss \xCF
    var umlregs  = [ /\xFC/g,  /\xDC/g,  /\xE4/g,  /\xC4/g,  /\xF6/g,  /\xD6/g,  /\xCF/g, ];
    var umlrepls = [ '&uuml;', '&Uuml;', '&auml;', '&Auml;', '&ouml;', '&Ouml;', '&szlig;', ];
    var reg = null, repl = null;

    for (var i in this.results)
    {
        result = this.results[i];

        //if (!confirm(result.de + ' : ' + result.en)) return;

        row = table.insertRow(i);

        td = document.createElement('td');
        row.appendChild(td);

        a = document.createElement('a');
        a.href = 'javascript:';
        a.addEventListener(
            'click',
            function (event) { event.preventDefault(); self.setQuery(this.firstChild.nodeValue); },
            false
        );
        td.appendChild(a);

        de_enc_str = this.wrapStringAt(result.de, 15);
        for (var reg_index in umlregs)
        {
            reg = umlregs[reg_index];
            repl = umlrepls[reg_index];
            de_enc_str = de_enc_str.replace(reg, repl);
        }
        //alert(de_enc_str + ': ' + de_enc_str.search(umlregs[2]));

        t = document.createTextNode(de_enc_str);
        a.appendChild(t);

        td = document.createElement('td');
        row.appendChild(td);

        a = document.createElement('a');
        a.href = 'javascript:';
        a.addEventListener(
            'click',
            function (event) { event.preventDefault(); self.setQuery(this.firstChild.nodeValue); },
            false
        );
        td.appendChild(a);

        t = document.createTextNode(this.wrapStringAt(result.en, 15));
        a.appendChild(t);
    }

    this.resultsDiv.scrollTop = 0;

}
// }}} dictTuChemDisplayResults()

// {{{ init()
function init()
{
	// {{{ css
	var head, style;
	head = document.getElementsByTagName('head')[0];
    if (!head) return 1;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML =
        '#dictTuChem { border:solid #DCDAD5 1px;z-index:9999;background-color:#F8F8D8;text-align:center;width:220px; }' +
        '#dictTuChem input, #dictTuChem textarea, #dictTuChem select { border:solid #999999 1px;font-size:10px;background-color:#ffffff;margin:2px; }' +
        '#dictTuChem a { font-family:sans-serif;font-size:12px;font-weight:600;color:#006600;display:block;width:100%;height:20px;background-color:#ffffff;border-bottom:solid #999999 1px; }' +
        '#dictTuChem a:hover { color:#CC6600; }' +
        '#dictTuChemResults  { width:200px;height:60px;margin-left:10px;border:solid #ffffff 1px;overflow:scroll;margin-bottom:5px;background-color:#ffffff; }' +
        '#dictTuChemResults  table { width:180px;background-color:#ffffff; }' +
        '#dictTuChemResults  table td { width:89px;background-color:#f8f8d8; }' +
        '#dictTuChemResults  td a { font-size:10px;display:inline;border:solid #ffffff 0px;background-color:#f8f8d8;font-weight:500;text-decoration:none; }';
	head.appendChild(style);
    // }}} css

    // {{{ toolbox
    var dictTuChem = document.createElement('div');
	dictTuChem.id = 'dictTuChem';
    dictTuChem.style.position = 'absolute';
    dictTuChem.style.display = 'none';

    var a = null, t = null, d = null;
    
    a = document.createElement('a');
    t = document.createTextNode('dict.tu-chemntiz.de');
    a.appendChild(t);
    a.href = 'http://dict.tu-chemnitz.de/';
    dictTuChem.appendChild(a);

    d = document.createElement('div');
    d.style.height = '25px';
    dictTuChem.appendChild(d);

    var formElm = document.createElement('form');
    formElm.addEventListener(
        'submit',
        function (event) { event.preventDefault(); dictTuChem.queryString(); },
        true
    );
    //formElm.action = 'http://dict.tu-chemnitz.de/dings.cgi';
    //formElm.target = '_blank';
    d.appendChild(formElm);

    dictTuChem.service = createSelectElement(
        'service',
        [
            { name: 'De <> En', value: '' },
            { name: 'De >> En', value: 'de-en' },
            { name: 'En >> De', value: 'en-de' },
            { name: 'English', value: 'dict-en' },
            { name: 'Deutsch', value: 'dict-de' },
            { name: 'Proverbs (En)', value: 'fortune-en' },
            { name: 'Sprueche (De)', value: 'fortune-de' },
        ]
    );
    dictTuChem.service.style.width = '50px';
    formElm.appendChild(dictTuChem.service);

    dictTuChem.query = createInputElement({type: 'text', name: 'query', size: 15});
    formElm.appendChild(dictTuChem.query);

    dictTuChem.queryString = dictTuChemQueryString;
    i = createInputElement({type: 'submit', name: 'search', value: 'Go!'});
    formElm.appendChild(i);

    dictTuChem.resultsDiv = document.createElement('div');
    dictTuChem.resultsDiv.id = 'dictTuChemResults';
    dictTuChem.resultsDiv.style.display = 'none';
    dictTuChem.appendChild(dictTuChem.resultsDiv);

    dictTuChem.open = dictTuChemOpen;
    dictTuChem.results = new Array();
    dictTuChem.parseResults = dictTuChemParseResults;
    dictTuChem.displayResults = dictTuChemDisplayResults;
    dictTuChem.setQuery = dictTuChemSetQuery;
    dictTuChem.wrapStringAt = dictTuChemWrapStringAt;

	document.body.insertBefore(dictTuChem, document.body.firstChild);
    // }}} toolbox

    // {{{ addEventListener
    window.addEventListener('mouseup', function(mouseEvent) {
            if (dictTuChem.style.display != 'none')
            {
                var node = mouseEvent.target;
                var is_dict = false;
                while (!is_dict && node.parentNode)
                {
                    if (node == dictTuChem) {
                        is_dict = true;
                    }
                    node = node.parentNode;
                }

                if (!is_dict)
                {
                    dictTuChem.style.display = 'none';
                    dictTuChem.resultsDiv.style.display = 'none'
                }
            }
            else if (window.getSelection() != '' && mouseEvent.altKey)
            {
                dictTuChem.open(mouseEvent, window.getSelection());
            }
        },
        true
    );
    // }}} addEventListener
}
// }}} init()

init();
