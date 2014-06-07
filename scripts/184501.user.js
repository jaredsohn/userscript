// ==UserScript==
// @name         Server
// @version      3.18
// @description  PHP a javascript
// @copyright  2013+, LethalPAX
// ==/UserScript==

/* 
 * More info at: http://phpjs.org
 * 
 * This is version: 3.18
 * php.js is copyright 2010 Kevin van Zonneveld.
 * 
 * Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jonas Raoni
 * Soares Silva (http://www.jsfromhell.com), Jack, Philip Peterson, Ates Goral
 * (http://magnetiq.com), Legaev Andrey, Ratheous, Alex, Martijn Wieringa,
 * Nate, lmeyrick (https://sourceforge.net/projects/bcmath-js/), Philippe
 * Baumann, Enrique Gonzalez, Webtoolkit.info (http://www.webtoolkit.info/),
 * Ash Searle (http://hexmen.com/blog/), travc, Jani Hartikainen, Carlos R. L.
 * Rodrigues (http://www.jsfromhell.com), Ole Vrijenhoek, WebDevHobo
 * (http://webdevhobo.blogspot.com/), T.Wild,
 * http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,
 * pilus, GeekFG (http://geekfg.blogspot.com), RafaÅ Kukawski
 * (http://blog.kukawski.pl), Johnny Mast (http://www.phpvrouwen.nl), Michael
 * Grier, Erkekjetter, d3x, marrtins, Andrea Giammarchi
 * (http://webreflection.blogspot.com), stag019, mdsjack
 * (http://www.mdsjack.bo.it), Chris, Steven Levithan
 * (http://blog.stevenlevithan.com), Arpad Ray (mailto:arpad@php.net), David,
 * Joris, Tim de Koning (http://www.kingsquare.nl), Marc Palau, Michael White,
 * Public Domain (http://www.json.org/json2.js), gettimeofday, felix, Aman
 * Gupta, Pellentesque Malesuada, Thunder.m, Tyler Akins (http://rumkin.com),
 * Karol Kowalski, Felix Geisendoerfer (http://www.debuggable.com/felix),
 * Alfonso Jimenez (http://www.alfonsojimenez.com), Diplom@t
 * (http://difane.com/), majak, Mirek Slugen, Mailfaker
 * (http://www.weedem.fr/), Breaking Par Consulting Inc
 * (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
 * Josh Fraser
 * (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
 * Martin (http://www.erlenwiese.de/), Paul Smith, KELAN, Robin, saulius, AJ,
 * Oleg Eremeev, Steve Hilder, gorthaur, Kankrelune
 * (http://www.webfaktory.info/), Caio Ariede (http://caioariede.com), Lars
 * Fischer, Sakimori, Imgen Tata (http://www.myipdf.com/), uestla, Artur
 * Tchernychev, Wagner B. Soares, Christoph, nord_ua, class_exists, Der Simon
 * (http://innerdom.sourceforge.net/), echo is bad, XoraX
 * (http://www.xorax.info), Ozh, Alan C, Taras Bogach, Brad Touesnard, MeEtc
 * (http://yass.meetcweb.com), Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), T0bsn, Tim Wiel, Bryan Elliott,
 * jpfle, JT, Thomas Beaucourt (http://www.webapp.fr), David Randall, Frank
 * Forte, Eugene Bulkin (http://doubleaw.com/), noname, kenneth, Hyam Singer
 * (http://www.impact-computing.com/), Marco, Raphael (Ao RUDLER), Ole
 * Vrijenhoek (http://www.nervous.nl/), David James, Steve Clay, Jason Wong
 * (http://carrot.org/), T. Wild, Paul, J A R, LH, strcasecmp, strcmp, JB,
 * Daniel Esteban, strftime, madipta, Valentina De Rosa, Marc Jansen,
 * Francesco, Stoyan Kyosev (http://www.svest.org/), metjay, Soren Hansen,
 * 0m3r, Sanjoy Roy, Shingo, sankai, sowberry, hitwork, Rob, Norman "zEh"
 * Fuchs, Subhasis Deb, josh, Yves Sucaet, Ulrich, Scott Baker, ejsanders,
 * Nick Callen, Steven Levithan (stevenlevithan.com), Aidan Lister
 * (http://aidanlister.com/), Philippe Jausions
 * (http://pear.php.net/user/jausions), Zahlii, Denny Wardhana, Oskar Larsson
 * HÃ¶gfeldt (http://oskar-lh.name/), Brian Tafoya
 * (http://www.premasolutions.com/), johnrembo, Gilbert, duncan, Thiago Mata
 * (http://thiagomata.blog.com), Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), Linuxworld, lmeyrick
 * (https://sourceforge.net/projects/bcmath-js/this.), Jon Hohle, Pyerre,
 * merabi, Saulo Vallory, HKM, ChaosNo1, djmix, Lincoln Ramsay, Adam Wallner
 * (http://web2.bitbaro.hu/), paulo kuong, jmweb, Orlando, kilops, dptr1988,
 * DxGx, Pedro Tainha (http://www.pedrotainha.com), Bayron Guevara, Le Torbi,
 * James, Douglas Crockford (http://javascript.crockford.com), Devan
 * Penner-Woelk, Jay Klehr, Kheang Hok Chin (http://www.distantia.ca/), Luke
 * Smith (http://lucassmith.name), Rival, Amir Habibi
 * (http://www.residence-mixte.com/), Blues (http://tech.bluesmoon.info/), Ben
 * Bryan, booeyOH, Dreamer, Cagri Ekin, Diogo Resende, Howard Yeend, Pul,
 * 3D-GRAF, jakes, Yannoo, Luke Godfrey, daniel airton wermann
 * (http://wermann.com.br), Allan Jensen (http://www.winternet.no), Benjamin
 * Lupton, davook, Atli ÃÃ³r, Maximusya, Leslie Hoare, Bug?, setcookie, YUI
 * Library: http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html,
 * Blues at http://hacks.bluesmoon.info/strftime/strftime.js, Andreas,
 * Michael, Christian Doebler, Gabriel Paderni, Marco van Oort, Philipp
 * Lenssen, Arnout Kazemier (http://www.3rd-Eden.com), penutbutterjelly, Anton
 * Ongson, DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html),
 * meo, Greenseed, Yen-Wei Liu, mk.keck, William, rem, Jamie Beck
 * (http://www.terabit.ca/), Russell Walker (http://www.nbill.co.uk/),
 * Garagoth, Dino, Andrej Pavlovic, gabriel paderni, FGFEmperor, Scott Cariss,
 * Slawomir Kaniecki, ReverseSyntax, Mateusz "loonquawl" Zalega, Francois,
 * Kirk Strobeck, Billy, vlado houba, Jalal Berrami, date, Itsacon
 * (http://www.itsacon.net/), Martin Pool, Pierre-Luc Paour, ger, john
 * (http://www.jd-tech.net), mktime, Simon Willison
 * (http://simonwillison.net), Nick Kolosov (http://sammy.ru), marc andreu,
 * Arno, Nathan, Kristof Coomans (SCK-CEN Belgian Nucleair Research Centre),
 * Fox, nobbler, stensi, Matteo, Riddler (http://www.frontierwebdev.com/),
 * Tomasz Wesolowski, T.J. Leahy, rezna, Eric Nagel, Alexander M Beedie, baris
 * ozdil, Greg Frazier, Bobby Drake, Ryan W Tenney (http://ryan.10e.us), Tod
 * Gentille, RafaÅ Kukawski, FremyCompany, Manish, Cord, fearphage
 * (http://http/my.opera.com/fearphage/), Victor, Brant Messenger
 * (http://www.brantmessenger.com/), Matt Bradley, Luis Salazar
 * (http://www.freaky-media.com/), Tim de Koning, taith, Rick Waldron, Mick@el
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ 


function basename (path, suffix) {
    // Returns the filename component of the path  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/basename
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
    // *     example 2: basename('ecra.php?p=1');
    // *     returns 2: 'ecra.php?p=1'
    var b = path.replace(/^.*[\/\\]/g, '');
    
    if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    
    return b;
}

function dirname (path) {
    // Returns the directory name component of the path  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/dirname
    // +   original by: Ozh
    // +   improved by: XoraX (http://www.xorax.info)
    // *     example 1: dirname('/etc/passwd');
    // *     returns 1: '/etc'
    // *     example 2: dirname('c:/Temp/x');
    // *     returns 2: 'c:/Temp'
    // *     example 3: dirname('/dir/test/');
    // *     returns 3: '/dir'
    
    return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
}

function echo () {
    // !No description available for echo. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/echo
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Eugene Bulkin (http://doubleaw.com/)
    // +   input by: JB
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
    // %        note 1: we wouldn't need any such long code (even most of the code below). See
    // %        note 1: link below for a cross-browser implementation in JavaScript. HTML5 might
    // %        note 1: possibly support DOMParser, but that is not presently a standard.
    // %        note 2: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
    // %        note 2: use with a temporary holder before appending to the DOM (as is our last resort below),
    // %        note 2: since it may not work in an XML context
    // %        note 3: Using innerHTML to directly add to the BODY is very dangerous because it will
    // %        note 3: break all pre-existing references to HTMLElements.
    // *     example 1: echo('<div><p>abc</p><p>abc</p></div>');
    // *     returns 1: undefined
    var arg = '', argc = arguments.length, argv = arguments, i = 0;
    var win = this.window;
    var d = win.document;
    var ns_xhtml = 'http://www.w3.org/1999/xhtml';
    var ns_xul = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'; // If we're in a XUL context

    var holder;

    var stringToDOM = function (str, parent, ns, container) {
        var extraNSs = '';
        if (ns === ns_xul) {
            extraNSs = ' xmlns:html="'+ns_xhtml+'"';
        }
        var stringContainer = '<'+container+' xmlns="'+ns+'"'+extraNSs+'>'+str+'</'+container+'>';
        if (win.DOMImplementationLS &&
            win.DOMImplementationLS.createLSInput &&
            win.DOMImplementationLS.createLSParser) { // Follows the DOM 3 Load and Save standard, but not
            // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
            // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
            // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
            var lsInput = DOMImplementationLS.createLSInput();
            // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
            lsInput.stringData = stringContainer;
            var lsParser = DOMImplementationLS.createLSParser(1, null); // synchronous, no schema type
            return lsParser.parse(lsInput).firstChild;
        }
        else if (win.DOMParser) {
            // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
            try {
                var fc = new DOMParser().parseFromString(stringContainer, 'text/xml');
                if (!fc || !fc.documentElement ||
                        fc.documentElement.localName !== 'parsererror' ||
                        fc.documentElement.namespaceURI !== 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
                    return fc.documentElement.firstChild;
                }
                // If there's a parsing error, we just continue on
            }
            catch(e) {
                // If there's a parsing error, we just continue on
            }
        }
        else if (win.ActiveXObject) { // We don't bother with a holder in Explorer as it doesn't support namespaces
            var axo = new ActiveXObject('MSXML2.DOMDocument');
            axo.loadXML(str);
            return axo.documentElement;
        }
        /*else if (win.XMLHttpRequest) { // Supposed to work in older Safari
            var req = new win.XMLHttpRequest;
            req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(str), false);
            if (req.overrideMimeType) {
                req.overrideMimeType('application/xml');
            }
            req.send(null);
            return req.responseXML;
        }*/
        // Document fragment did not work with innerHTML, so we create a temporary element holder
        // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
        //if (d.createElementNS && (d.contentType && d.contentType !== 'text/html')) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways)
        if (d.createElementNS &&  // Browser supports the method
            (d.documentElement.namespaceURI || // We can use if the document is using a namespace
            d.documentElement.nodeName.toLowerCase() !== 'html' || // We know it's not HTML4 or less, if the tag is not HTML (even if the root namespace is null)
            (d.contentType && d.contentType !== 'text/html') // We know it's not regular HTML4 or less if this is Mozilla (only browser supporting the attribute) and the content type is something other than text/html; other HTML5 roots (like svg) still have a namespace
        )) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways); last test is for the sake of being in a pure XML document
            holder = d.createElementNS(ns, container);
        }
        else {
            holder = d.createElement(container); // Document fragment did not work with innerHTML
        }
        holder.innerHTML = str;
        while (holder.firstChild) {
            parent.appendChild(holder.firstChild);
        }
        return false;
        // throw 'Your browser does not support DOM parsing as required by echo()';
    };


    var ieFix = function (node) {
        if (node.nodeType === 1) {
            var newNode = d.createElement(node.nodeName);
            var i, len;
            if (node.attributes && node.attributes.length > 0) {
                for (i = 0, len = node.attributes.length; i < len; i++) {
                    newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i].nodeName));
                }
            }
            if (node.childNodes && node.childNodes.length > 0) {
                for (i = 0, len = node.childNodes.length; i < len; i++) {
                    newNode.appendChild(ieFix(node.childNodes[i]));
                }
            }
            return newNode;
        }
        else {
            return d.createTextNode(node.nodeValue);
        }
    };

    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.echo_embedded_vars']) {
            arg = arg.replace(/(.?)\{\$(.*?)\}/g, function (s, m1, m2) {
                // We assume for now that embedded variables do not have dollar sign; to add a dollar sign, you currently must use {$$var} (We might change this, however.)
                // Doesn't cover all cases yet: see http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
                if (m1 !== '\\') {
                    return m1+eval(m2);
                }
                else {
                    return s;
                }
            });
        }
        if (d.appendChild) {
            if (d.body) {
                if (win.navigator.appName == 'Microsoft Internet Explorer') { // We unfortunately cannot use feature detection, since this is an IE bug with cloneNode nodes being appended
                    d.body.appendChild(stringToDOM(ieFix(arg)));
                }
                else {
                    var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, 'div').cloneNode(true); // We will not actually append the div tag (just using for providing XHTML namespace by default)
                    if (unappendedLeft) {
                        d.body.appendChild(unappendedLeft);
                    }
                }
            } else {
                d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, 'description')); // We will not actually append the description tag (just using for providing XUL namespace by default)
            }
        } else if (d.write) {
            d.write(arg);
        }/* else { // This could recurse if we ever add print!
            print(arg);
        }*/
    }
}

function fclose (handle) {
    // Close an open file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fclose
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fclose(handle);
    // *     returns 1: true
    if (!handle || handle.opener !== 'fopen') {
        return false;
    }
    
    try {
        delete this.php_js.resourceDataPointer[handle.id];
        delete this.php_js.resourceData[handle.id]; // Free up memory
    }
    catch (e) {
        return false;
    }
    return true;
}

function feof (handle) {
    // Test for end-of-file on a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/feof
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(handle, 1);
    // *     example 1: feof(handle);
    // *     returns 1: false

    if (!handle || !this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
        return true;
    }

    return !this.php_js.resourceData[handle.id][this.php_js.resourceDataPointer[handle.id]];
    
}

function fgetc (handle) {
    // Get a character from file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fgetc
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fgetc(handle);
    // *     returns 1: '1'

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
        return false;
    }

    var start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    var length = 1; // 2 byte-character (or surrogate)
    this.php_js.resourceDataPointer[handle.id] += length;
    var chr = this.php_js.resourceData[handle.id].substr(start, length);

    // If don't want to treat surrogate pairs as single characters, can delete from here until the last line (return chr;)
    var nextChr = this.php_js.resourceData[handle.id].substr(start+1, 1);
    var prevChr = start === 0 ? false : this.php_js.resourceData[handle.id].substr(start-1, 1);
    var code = chr.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        if (!nextChr)  {
            throw 'High surrogate without following low surrogate (fgetc)';
        }
        var next = nextChr.charCodeAt(0);
        if (0xDC00 > next || next > 0xDFFF) {
            throw 'High surrogate without following low surrogate (fgetc)';
        }
        this.php_js.resourceDataPointer[handle.id] += length; // Need to increment counter again since grabbing next item
        return chr+nextChr;
    }
    else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        if (prevChr === false) {
            throw 'Low surrogate without preceding high surrogate (fgetc)';
        }
        var prev = prevChr.charCodeAt(0);
        if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
            throw 'Low surrogate without preceding high surrogate (fgetc)';
        }
        return prevChr+chr; // Probably shouldn't have reached here, at least if traversing by fgetc()
    }
    
    return chr;
}

function fgetcsv (handle, length, delimiter, enclosure, escape) {
    // Get line from file pointer and parse for CSV fields  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fgetcsv
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: str_getcsv
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fgetcsv(handle, 1);
    // *     returns 1: '<'

    var start=0, fullline='';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start)+1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length/2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length; // Leaves the pointer one higher apparently than in fgets/fgetss
    return this.str_getcsv(this.php_js.resourceData[handle.id].substr(start, length), delimiter, enclosure, escape);
}

function fgets (handle, length) {
    // Get a line from file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fgets
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fgets(handle, 1);
    // *     returns 1: '<'

    var start=0, fullline='', endlinePos = -1, content = '';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    content = this.php_js.resourceData[handle.id].slice(start);

    endlinePos = content.search(/\r\n?|\n/)+start+1;
    fullline = this.php_js.resourceData[handle.id].slice(start, endlinePos+1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length/2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length;
    return this.php_js.resourceData[handle.id].substr(start, length);
}

function fgetss (handle, length, allowable_tags) {
    // Get a line from file pointer and strip HTML tags  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fgetss
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: strip_tags
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fgetss(handle, 4096, 'a');
    // *     returns 1: ''

    var start=0, fullline='';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start)+1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length/2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length-1;
    return this.strip_tags(this.php_js.resourceData[handle.id].substr(start, length), allowable_tags);
}

function file (url) {
    // Read entire file into an array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/file
    // +   original by: Legaev Andrey
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
    // *     example 1: file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: {0: '123'}
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {throw new Error('XMLHttpRequest not supported');}
       
    req.open("GET", url, false);
    req.send(null);
    
    return req.responseText.split('\n');
}

function file_exists (url) {
    // Returns true if filename exists  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/file_exists
    // +   original by: Enrique Gonzalez
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
    // *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
    
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {throw new Error('XMLHttpRequest not supported');}
      
    // HEAD Results are usually shorter (faster) than GET
    req.open('HEAD', url, false);
    req.send(null);
    if (req.status == 200){
        return true;
    }
    
    return false;
}

function file_get_contents (url, flags, context, offset, maxLen) {
    // Read the entire file into a string
    //
    // version: 906.111
    // discuss at: http://phpjs.org/functions/file_get_contents
    // +   original by: Legaev Andrey
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Raphael (Ao) RUDLER
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
    // %        note 2: Synchronous by default (as in PHP) so may lock up browser. Can
    // %        note 2: get async by setting a custom "phpjs.async" property to true and "notification" for an
    // %        note 2: optional callback (both as context params, with responseText, and other JS-specific
    // %        note 2: request properties available via 'this'). Note that file_get_contents() will not return the text
    // %        note 2: in such a case (use this.responseText within the callback). Or, consider using
    // %        note 2: jQuery's: $('#divId').load('http://url') instead.
    // %        note 3: The context argument is only implemented for http, and only partially (see below for
    // %        note 3: "Presently unimplemented HTTP context options"); also the arguments passed to
    // %        note 3: notification are incomplete
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
    // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php
    var tmp, headers = [], newTmp = [], k=0, i=0, href = '', pathPos = -1, flagNames = 0, content = null, http_stream = false;
    var func = function (value) { return value.substring(1) !== ''; };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT

    var ini = this.php_js.ini;
    context = context || this.php_js.default_streams_context || null;

    if (!flags) {flags = 0;}
    var OPTS = {
        FILE_USE_INCLUDE_PATH : 1,
        FILE_TEXT : 32,
        FILE_BINARY : 64
    };
    if (typeof flags === 'number') { // Allow for a single string or an array of string flags
        flagNames = flags;
    }
    else {
        flags = [].concat(flags);
        for (i=0; i < flags.length; i++) {
            if (OPTS[flags[i]]) {
                flagNames = flagNames | OPTS[flags[i]];
            }
        }
    }

    if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together
        throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
    }

    if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path &&
            ini.include_path.local_value) {
        var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
        url = ini.include_path.local_value+slash+url;
    }
    else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
        href = this.window.location.href;
        pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8)-1 : href.lastIndexOf('/');
        url = href.slice(0, pathPos+1)+url;
    }

    if (context) {
        var http_options = context.stream_options && context.stream_options.http;
        http_stream = !!http_options;
    }

    if (!context || http_stream) {
        var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        if (!req) {throw new Error('XMLHttpRequest not supported');}

        var method = http_stream ? http_options.method : 'GET';
        var async = !!(context && context.stream_params && context.stream_params['phpjs.async']);
        
        if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
            url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(); // Give optional means of forcing bypass of cache
        }
        
        req.open(method, url, async);
        if (async) {
            var notification = context.stream_params.notification;
            if (typeof notification === 'function') {
                // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
                if (0 && req.addEventListener) { // Unimplemented so don't allow to get here
                    /*
                    req.addEventListener('progress', updateProgress, false);
                    req.addEventListener('load', transferComplete, false);
                    req.addEventListener('error', transferFailed, false);
                    req.addEventListener('abort', transferCanceled, false);
                    */
                }
                else {
                    req.onreadystatechange = function (aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent

    // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
    /*
    PHP Constants:
    STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
    STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
    STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
    STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
    STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
    STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
    STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
    STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
    STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
    STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

    STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
    STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
    STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
    */
                        var objContext = {
                            responseText : req.responseText,
                            responseXML : req.responseXML,
                            status : req.status,
                            statusText : req.statusText,
                            readyState : req.readyState,
                            evt : aEvt
                        }; // properties are not available in PHP, but offered on notification via 'this' for convenience

                        // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
                        // Need to add message, etc.
                        var bytes_transferred;
                        switch (req.readyState) {
                            case 0: //     UNINITIALIZED     open() has not been called yet.
                                notification.call(objContext, 0, 0, '', 0, 0, 0);
                                break;
                            case 1: //     LOADING     send() has not been called yet.
                                notification.call(objContext, 0, 0, '', 0, 0, 0);
                                break;
                            case 2: //     LOADED     send() has been called, and headers and status are available.
                                notification.call(objContext, 0, 0, '', 0, 0, 0);
                                break;
                            case 3: //     INTERACTIVE     Downloading; responseText holds partial data.
                                bytes_transferred = req.responseText.length*2; // One character is two bytes
                                notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
                                break;
                            case 4: //     COMPLETED     The operation is complete.
                                if (req.status >= 200 && req.status < 400) {
                                    bytes_transferred = req.responseText.length*2; // One character is two bytes
                                    notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
                                }
                                else if (req.status === 403) { // Fix: These two are finished except for message
                                    notification.call(objContext, 10, 2, '', req.status, 0, 0);
                                }
                                else { // Errors
                                    notification.call(objContext, 9, 2, '', req.status, 0, 0);
                                }
                                break;
                            default:
                                throw 'Unrecognized ready state for file_get_contents()';
                        }
                    }
                }
            }
        }

        if (http_stream) {
            var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
            var userAgentSent = false;
            for (i=0; i < sendHeaders.length; i++) {
                var sendHeader = sendHeaders[i];
                var breakPos = sendHeader.search(/:\s*/);
                var sendHeaderName = sendHeader.substring(0, breakPos);
                req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos+1));
                if (sendHeaderName === 'User-Agent') {
                    userAgentSent = true;
                }
            }
            if (!userAgentSent) {
                var user_agent = http_options.user_agent ||
                                                                    (ini.user_agent && ini.user_agent.local_value);
                if (user_agent) {
                    req.setRequestHeader('User-Agent', user_agent);
                }
            }
            content = http_options.content || null;
            /*
            // Presently unimplemented HTTP context options
            var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
            var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
            var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
            var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
            var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
            */
        }

        if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)
            var content_type = 'text/html';
            if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well
                content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set
                                                                                                        //   overridden earlier by bind_textdomain_codeset()
            }
            else {
                var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) || 'UTF-8';
                if (http_options && http_options.header && (/^content-type:/im).test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present
                    content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand
                }
                if (!(/;\s*charset=/).test(content_type)) { // If no encoding
                    content_type += '; charset='+encoding;
                }
            }
            req.overrideMimeType(content_type);
        }
        // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
        //     most people will also want a way to have it be auto-converted into native JavaScript text instead
        else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
            req.overrideMimeType('text/plain; charset=x-user-defined');
            // Getting an individual byte then requires:
            // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
        }

        if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)
            req.sendAsBinary(content); // In Firefox, only available FF3+
        }
        else {
            req.send(content);
        }

        tmp = req.getAllResponseHeaders();
        if (tmp) {
            tmp = tmp.split('\n');
            for (k=0; k < tmp.length; k++) {
                if (func(tmp[k])) {
                    newTmp.push(tmp[k]);
                }
            }
            tmp = newTmp;
            for (i=0; i < tmp.length; i++) {
                headers[i] = tmp[i];
            }
            this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
        }

        if (offset || maxLen) {
            if (maxLen) {
                return req.responseText.substr(offset || 0, maxLen);
            }
            return req.responseText.substr(offset);
        }
        return req.responseText;
    }
    return false;
}

function filemtime (file) {
    // +   original by: Ole Vrijenhoek (http://www.nervous.nl/)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: get_headers
    // %        note 1:  Looks for Last-Modified in response header.
    // *     example 1: filemtime('http://www.un.org');
    // *     returns 1: 1241532483

    var headers = {};
    headers = this.get_headers(file, 1);
    return (headers && headers['Last-Modified'] && Date.parse(headers['Last-Modified'])/1000) || false;
}

function filesize (url) {
    // Get file size  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/filesize
    // +   original by: Enrique Gonzalez
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: T. Wild
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
    // *     example 1: filesize('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '3'
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {throw new Error('XMLHttpRequest not supported');}
    
    req.open('HEAD', url, false);
    req.send(null);
    
    if (!req.getResponseHeader) {
        try {
            throw new Error('No getResponseHeader!');
        } catch (e){
            return false;
        }
    } else if (!req.getResponseHeader('Content-Length')) {
        try {
            throw new Error('No Content-Length!');
        } catch (e2){
            return false;
        }
    } else {
        return req.getResponseHeader('Content-Length'); 
    }
}

function fopen (filename, mode, use_include_path, context) {
    // Open a file or a URL and return a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fopen
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Paul Smith
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: file_get_contents
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     returns 1: 'Resource id #1'

    var resource={}, i=0, that = this;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    // BEGIN file inclusion: file_get_contents
    var file_get_contents = function ( url ) {
        var req = that.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        if (!req) {
            throw new Error('XMLHttpRequest not supported');
        }
        if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
            url = that.window.location.href + '/' +url;
        }
        req.open("GET", url, false);
        req.send(null);
        return req.responseText;
    };
    // END file inclusion

    if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) { 
        // Not implemented yet: Search for file in include path too
    }
    if (context) {
        // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
    }

    for (i=0; i < mode.length; i++) { // Have to deal with other flags if ever allow
        if (mode.charAt(i) === 'r' && (!mode.charAt(i+1) || mode.charAt(i+1) !== '+')) {
            continue;
        }
        switch (mode.charAt(i)) {
            case 'r': // must have '+' now
            case 'w': // or 'w+'
            case 'a': // or 'a+'
            case 'x':// or 'x+'
                throw 'Writing is not implemented';
            case 'b':
            case 't':
                throw 'Windows-only modes are not supported';
            default:
                throw 'Unrecognized file mode passed to '+getFuncName(arguments.caller)+'()';
        }
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.resourceData = this.php_js.resourceData || {};
    this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
    this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
    // END REDUNDANT

    // BEGIN STATIC
    function PHPJS_Resource (type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
        // See http://php.net/manual/en/resource.php for types
        this.type = type;
        this.id = id;
        this.opener = opener;
    }
    PHPJS_Resource.prototype.toString = function () {
        return 'Resource id #'+this.id;
    };
    PHPJS_Resource.prototype.get_resource_type = function () {
        return this.type;
    };
    PHPJS_Resource.prototype.var_dump = function () {
        return 'resource('+this.id+') of type ('+this.type+')';
    };
    // END STATIC

    this.php_js.resourceIdCounter++;
    this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
    this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

    resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'fopen');
    resource.mode = mode; // Add file-specific attributes

    return resource; // may be 'file' instead of 'stream' type on some systems
}

function fpassthru (handle) {
    // Output all remaining data from a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fpassthru
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fpassthru(handle);
    // *     returns 1: 3

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
        return false;
    }

    var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
    this.echo(chrs);
    this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length; // Place pointer at end
    return chrs;
}

function fread (handle, length) {
    // Binary-safe file read  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fread
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(handle, 10);
    // *     returns 1: '123'

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
        return false;
    }

    length = length < 8192 ? (Math.floor(length/2) || 1) : 4096; // 2 bytes per character (or surrogate) means limit of 8192 bytes = 4096 characters; ensure at least one

    var start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined) {
        return false; // Resource was already closed
    }

    if (!this.php_js.resourceData[handle.id][start]) {
        return ''; // already reached the end of the file (but pointer not closed)
    }

    this.php_js.resourceDataPointer[handle.id] += length;

    return this.php_js.resourceData[handle.id].substr(start, length); // Extra length won't be a problem here
}

function fscanf (handle, format) {
    // Implements a mostly ANSI compatible fscanf()  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fscanf
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: fgets
    // -    depends on: sscanf
    // *     example 1: var handle = fopen('http://example.com/names_and_professions.html', 'r');
    // *     example 1: fscanf(handle, '%s\t%s\t%s\n');
    // *     returns 1: ['robert', 'slacker', 'us']

    var mixed; // Could be an array or an integer

    mixed = this.sscanf.apply(this, [fgets(handle), format].concat(Array.prototype.slice.call(arguments, 2)));

    return mixed;
}

function fseek (handle, offset, whence) {
    // Seek on a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fseek
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fseek(h, 100);
    // *     returns 1: 0

    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return -1;
    }

    switch (whence) {
        case undefined: // fall-through
        case 'SEEK_SET':
            this.php_js.resourceDataPointer[handle.id] = offset/2+1;
            break;
        case 'SEEK_CUR':
            this.php_js.resourceDataPointer[handle.id] += offset/2+1;
            break;
        case 'SEEK_END':
            this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length + offset/2 + 1;
            break;
        default:
            throw 'Unrecognized whence value for fseek()';
    }
    return 0;
}

function ftell (handle) {
    // Get file pointer's read/write position  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ftell
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(h, 100);
    // *     example 1: ftell(h);
    // *     returns 1: 99

    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return false;
    }
    return this.php_js.resourceDataPointer[handle.id]*2-1; // We're currently storing by character, so need to multiply by two; subtract one to appear like array pointer
}

function get_headers (url, format) {
    // +   original by: Paulo Freitas
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // *     example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
    // *     returns 1: 'Date: Wed, 13 May 2009 23:53:11 GMT'
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
        throw new Error('XMLHttpRequest not supported');
    }
    var tmp, headers, pair, i, j = 0;

    req.open('HEAD', url, false);
    req.send(null);

    if (req.readyState < 3) {
        return false;
    }

    tmp = req.getAllResponseHeaders();
    tmp = tmp.split('\n');
    tmp = this.array_filter(tmp, function (value) { return value.substring(1) !== ''; });
    headers = format ? {} : [];

    for (i in tmp) {
        if (format) {
            pair = tmp[i].split(':');
            headers[pair.splice(0, 1)] = pair.join(':').substring(1);
        } else {
            headers[j++] = tmp[i];
        }
    }
    return headers;
}

function pathinfo (path, options) {
    // Returns information about a certain string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/pathinfo
    // +   original by: Nate
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
    // %        note 1: The way the bitwise arguments are handled allows for greater flexibility
    // %        note 1: & compatability. We might even standardize this code and use a similar approach for
    // %        note 1: other bitwise PHP functions
    // %        note 2: php.js tries very hard to stay away from a core.js file with global dependencies, because we like
    // %        note 2: that you can just take a couple of functions and be on your way.
    // %        note 2: But by way we implemented this function, if you want you can still declare the PATHINFO_*
    // %        note 2: yourself, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
    // %        note 2: which makes it fully compliant with PHP syntax.
    // -    depends on: dirname
    // -    depends on: basename
    // *     example 1: pathinfo('/www/htdocs/index.html', 1);
    // *     returns 1: '/www/htdocs'
    // *     example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
    // *     returns 2: 'index.html'
    // *     example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
    // *     returns 3: 'html'
    // *     example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
    // *     returns 4: 'index'
    // *     example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
    // *     returns 5: {basename: 'index.html', extension: 'html'}
    // *     example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
    // *     returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    // *     example 7: pathinfo('/www/htdocs/index.html');
    // *     returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    // Working vars
    var opt = '', optName = '', optTemp = 0, tmp_arr = {}, cnt = 0, i=0;
    var have_basename = false, have_extension = false, have_filename = false;

    // Input defaulting & sanitation
    if (!path) {return false;}
    if (!options) {options = 'PATHINFO_ALL';}

    // Initialize binary arguments. Both the string & integer (constant) input is
    // allowed
    var OPTS = {
        'PATHINFO_DIRNAME': 1,
        'PATHINFO_BASENAME': 2,
        'PATHINFO_EXTENSION': 4,
        'PATHINFO_FILENAME': 8,
        'PATHINFO_ALL': 0
    };
    // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
    for (optName in OPTS) {
        OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
    }
    if (typeof options !== 'number') { // Allow for a single string or an array of string flags
        options = [].concat(options);
        for (i=0; i < options.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[options[i]]) {
                optTemp = optTemp | OPTS[options[i]];
            }
        }
        options = optTemp;
    }

    // Internal Functions
    var __getExt = function (path) {
        var str  = path+'';
        var dotP = str.lastIndexOf('.')+1;
        return str.substr(dotP);
    };


    // Gather path infos
    if (options & OPTS.PATHINFO_DIRNAME) {
        tmp_arr.dirname = this.dirname(path);
    }

    if (options & OPTS.PATHINFO_BASENAME) {
        if (false === have_basename) {
            have_basename = this.basename(path);
        }
        tmp_arr.basename = have_basename;
    }

    if (options & OPTS.PATHINFO_EXTENSION) {
        if (false === have_basename) {
            have_basename = this.basename(path);
        }
        if (false === have_extension) {
            have_extension = __getExt(have_basename);
        }
        tmp_arr.extension = have_extension;
    }

    if (options & OPTS.PATHINFO_FILENAME) {
        if (false === have_basename) {
            have_basename = this.basename(path);
        }
        if (false === have_extension) {
            have_extension = __getExt(have_basename);
        }
        if (false === have_filename) {
            have_filename  = have_basename.substr(0, (have_basename.length - have_extension.length)-1);
        }

        tmp_arr.filename = have_filename;
    }


    // If array contains only 1 element: return string
    cnt = 0;
    for (opt in tmp_arr){
        cnt++;
    }
    if (cnt == 1) {
        return tmp_arr[opt];
    }

    // Return full-blown array
    return tmp_arr;
}

function pclose (handle) {
    // Close a file pointer opened by popen()  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/pclose
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var handle = popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: pclose(handle);
    // *     returns 1: true
    if (!handle || handle.opener !== 'popen') {
        return false;
    }

    try {
        delete this.php_js.resourceDataPointer[handle.id];
        delete this.php_js.resourceData[handle.id]; // Free up memory
    }
    catch (e) {
        return false;
    }
    return true;
}

function popen (filename, mode, use_include_path, context) {
    // Execute a command and open either a read or a write pipe to it  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/popen
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Paul Smith
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: file_get_contents
    // *     example 1: popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     returns 1: 'Resource id #1'

    var resource={}, i=0, that = this;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    // BEGIN file inclusion: file_get_contents
    var file_get_contents = function ( url ) {
        var req = that.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        if (!req) {
            throw new Error('XMLHttpRequest not supported');
        }
        if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
            url = that.window.location.href + '/' +url;
        }
        req.open("GET", url, false);
        req.send(null);
        return req.responseText;
    };
    // END file inclusion

    if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) {
        // Not implemented yet: Search for file in include path too
    }
    if (context) {
        // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
    }

    for (i=0; i < mode.length; i++) { // Have to deal with other flags if ever allow
        switch (mode.charAt(i)) {
            case 'r':
                if (!mode.charAt(i+1) || mode.charAt(i+1) !== '+') {
                    break;
                }
            case 'w': // or 'w+'
            case 'a': // or 'a+'
            case 'x':// or 'x+'
                throw 'Writing is not implemented';
            case 'b':
            case 't':
                throw 'Windows-only modes are not supported';
            default:
                throw 'Unrecognized file mode passed to '+getFuncName(arguments.caller)+'()';
        }
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.resourceData = this.php_js.resourceData || {};
    this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
    this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
    // END REDUNDANT
    
    // BEGIN STATIC
    function PHPJS_Resource (type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
        // See http://php.net/manual/en/resource.php for types
        this.type = type;
        this.id = id;
        this.opener = opener;
    }
    PHPJS_Resource.prototype.toString = function () {
        return 'Resource id #'+this.id;
    };
    PHPJS_Resource.prototype.get_resource_type = function () {
        return this.type;
    };
    PHPJS_Resource.prototype.var_dump = function () {
        return 'resource('+this.id+') of type ('+this.type+')';
    };
    // END STATIC

    this.php_js.resourceIdCounter++;

    this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
    this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

    resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'popen');
    resource.mode = mode; // Add file-specific attributes

    return resource; // may be 'file' instead of 'stream' type on some systems
}

function readfile (filename, use_include_path, context) {
    // Output a file or a URL  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/readfile
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // *     example 1: readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var read_data = this.file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
    this.echo(read_data);
    return read_data;
}

function realpath (path) {
    // Return the resolved path  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/realpath
    // +   original by: mk.keck
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Returned path is an url like e.g. 'http://yourhost.tld/path/'
    // *     example 1: realpath('../.././_supporters/pj_test_supportfile_1.htm');
    // *     returns 1: 'file:/home/kevin/workspace/_supporters/pj_test_supportfile_1.htm'
    
    var p = 0, arr = [];
    /* Save the root, if not given */
    var r = this.window.location.href;
    /* Avoid input failures */
    path = (path + '').replace('\\', '/');
    /* Check if there's a port in path (like 'http://') */
    if (path.indexOf('://') !== -1) {
        p = 1;
    }
    /* Ok, there's not a port in path, so let's take the root */
    if (!p) {
        path = r.substring(0, r.lastIndexOf('/') + 1) + path;
    }
    /* Explode the given path into it's parts */
    arr = path.split('/');
    /* The path is an array now */
    path = [];
    /* Foreach part make a check */
    for (var k in arr) {
        /* This is'nt really interesting */
        if (arr[k] == '.') {
            continue;
        }
        /* This reduces the realpath */
        if (arr[k] == '..') {
            /* But only if there more than 3 parts in the path-array.
             * The first three parts are for the uri */
            if (path.length > 3) {
                path.pop();
            }
        }
        /* This adds parts to the realpath */
        else {
            /* But only if the part is not empty or the uri
             * (the first three parts ar needed) was not
             * saved */
            if ((path.length < 2) || (arr[k] !== '')) {
                path.push(arr[k]);
            }
        }
    }
    /* Returns the absloute path as a string */
    return path.join('/');
}

function rewind (handle) {
    // Rewind the position of a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/rewind
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(h, 100);
    // *     example 1: rewind(h);
    // *     returns 1: true

    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return false;
    }
    this.php_js.resourceDataPointer[handle.id] = 0;
    return true;
}

function sscanf (str, format) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Since JS does not support scalar reference variables, any additional arguments to the function will
    // %        note 1: only be allowable here as strings referring to a global variable (which will then be set to the value
    // %        note 1: found in 'str' corresponding to the appropriate conversion specification in 'format'
    // %        note 2: I am unclear on how WS is to be handled here because documentation seems to me to contradict PHP behavior
    // *     example 1: sscanf('SN/2350001', 'SN/%d');
    // *     returns 1: [2350001]
    // *     example 2: var myVar; // Will be set by function
    // *     example 2: sscanf('SN/2350001', 'SN/%d', 'myVar');
    // *     returns 2: 1
    // *     example 3: sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
    // *     returns 3: [20, 10]

    // SETUP
    var retArr = [], num = 0, _NWS = /\S/, args = arguments, that = this, digit;

    var _setExtraConversionSpecs = function (offset) {
        // Since a mismatched character sets us off track from future legitimate finds, we just scan
        // to the end for any other conversion specifications (besides a percent literal), setting them to null
        // sscanf seems to disallow all conversion specification components (of sprintf) except for type specifiers
        //var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g); // Do not allow % in last char. class
        var matches = format.slice(offset).match(/%[cdeEufgosxX]/g); // Do not allow % in last char. class;
                                                                                                // b, F,G give errors in PHP, but 'g', though also disallowed, doesn't
        if (matches) {
            var lgth = matches.length;
            while (lgth--) {
                retArr.push(null);
            }
        }
        return _finish();
    };

    var _finish = function () {
        if (args.length === 2) {
            return retArr;
        }
        for (var i=0; i < retArr.length; ++i) {
            that.window[args[i+2]] = retArr[i];
        }
        return i;
    };

    var _addNext = function (j, regex, cb) {
        if (assign) {
            var remaining = str.slice(j);
            var check = width ? remaining.substr(0, width) : remaining;
            var match = regex.exec(check);
            var testNull = retArr[digit !== undefined ? digit : retArr.length] = match ? (cb ? cb.apply(null, match) : match[0]) : null;
            if (testNull === null) {
                throw 'No match in string';
            }
            return j+match[0].length;
        }
        return j;
    };

    if (arguments.length < 2) {
        throw 'Not enough arguments passed to sscanf';
    }

    // PROCESS
    for (var i=0, j = 0; i < format.length; i++) {

        var width = 0, assign = true;

        if (format.charAt(i) === '%') {
            if (format.charAt(i+1) === '%') {
                if (str.charAt(j) === '%') { // a matched percent literal
                    ++i, ++j; // skip beyond duplicated percent
                    continue;
                }
                // Format indicated a percent literal, but not actually present
                return _setExtraConversionSpecs(i+2);
            }

            // CHARACTER FOLLOWING PERCENT IS NOT A PERCENT

            var prePattern = new RegExp('^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)', 'g'); // We need 'g' set to get lastIndex

            var preConvs = prePattern.exec(format.slice(i+1));

            var tmpDigit = digit;
            if (tmpDigit && preConvs[1] === undefined) {
                throw 'All groups in sscanf() must be expressed as numeric if any have already been used';
            }
            digit = preConvs[1] ? parseInt(preConvs[1], 10)-1 : undefined;

            assign = !preConvs[2];
            width = parseInt(preConvs[3], 10);
            var sizeCode = preConvs[4];
            i += prePattern.lastIndex;

            // Fix: Does PHP do anything with these? Seems not to matter
            if (sizeCode) { // This would need to be processed later
                switch (sizeCode) {
                    case 'h': // Treats subsequent as short int (for d,i,n) or unsigned short int (for o,u,x)
                    case 'l': // Treats subsequent as long int (for d,i,n), or unsigned long int (for o,u,x);
                                   //    or as double (for e,f,g) instead of float or wchar_t instead of char
                    case 'L': // Treats subsequent as long double (for e,f,g)
                        break;
                    default:
                        throw 'Unexpected size specifier in sscanf()!';
                        break;
                }
            }
            // PROCESS CHARACTER
            try {
                switch (format.charAt(i+1)) {
                    // For detailed explanations, see http://web.archive.org/web/20031128125047/http://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection=
                    // Also http://www.mathworks.com/access/helpdesk/help/techdoc/ref/sscanf.html
                    // p, S, C arguments in C function not available
                    // DOCUMENTED UNDER SSCANF
                    case 'F': // Not supported in PHP sscanf; the argument is treated as a float, and
                                     //  presented as a floating-point number (non-locale aware)
                        // sscanf doesn't support locales, so no need for two (see %f)
                        break;
                    case 'g': // Not supported in PHP sscanf; shorter of %e and %f
                        // Irrelevant to input conversion
                        break;
                    case 'G': // Not supported in PHP sscanf; shorter of %E and %f
                        // Irrelevant to input conversion
                        break;
                    case 'b': // Not supported in PHP sscanf; the argument is treated as an integer, and presented as a binary number
                        // Not supported - couldn't distinguish from other integers
                        break;
                    case 'i': // Integer with base detection (Equivalent of 'd', but base 0 instead of 10)
                        j = _addNext(j, /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/, function (num, sign, hex, oct, dec) {
                            return hex ? parseInt(num, 16) : oct ? parseInt(num, 8) : parseInt(num, 10);
                        });
                        break;
                    case 'n': // Number of characters processed so far
                        retArr[digit !== undefined ? digit : retArr.length-1] = j;
                        break;
                    // DOCUMENTED UNDER SPRINTF
                    case 'c': // Get character; suppresses skipping over whitespace! (but shouldn't be whitespace in format anyways, so no difference here)
                        // Non-greedy match
                        j = _addNext(j, new RegExp('.{1,'+(width || 1)+'}'));
                        break;
                    case 'D': // sscanf documented decimal number; equivalent of 'd';
                    case 'd': // Optionally signed decimal integer
                        j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
                            // Ignores initial zeroes, unlike %i and parseInt()
                            var decInt = parseInt((sign ||'')+dec, 10);
                            if (decInt < 0) { // PHP also won't allow less than -2147483648
                                return decInt < -2147483648 ? -2147483648: decInt; // integer overflow with negative
                            }
                            else { // PHP also won't allow greater than -2147483647
                                return decInt < 2147483647 ? decInt : 2147483647;
                            }
                        });
                        break;
                    case 'f': // Although sscanf doesn't support locales, this is used instead of '%F'; seems to be same as %e
                    case 'E': // These don't discriminate here as both allow exponential float of either case
                    case 'e':
                        j = _addNext(j, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function (num, sign, dec) {
                            if (dec === '.') {
                                return null;
                            }
                            return parseFloat((sign ||'')+dec); // Ignores initial zeroes, unlike %i and parseFloat()
                        });
                        break;
                    case 'u': // unsigned decimal integer
                        // We won't deal with integer overflows due to signs
                        j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
                            // Ignores initial zeroes, unlike %i and parseInt()
                            var decInt = parseInt(dec, 10);
                            if (sign === '-') { // PHP also won't allow greater than 4294967295
                                return 4294967296-decInt; // integer overflow with negative
                            }
                            else {
                                return decInt < 4294967295 ? decInt : 4294967295;
                            }
                        });
                        break;
                    case 'o': // Octal integer // Fix: add overflows as above?
                        j = _addNext(j, /([+-])?(?:0([0-7]+))/, function (num, sign, oct) {
                            return parseInt(num, 8);
                        });
                        break;
                    case 's': // Greedy match
                        j = _addNext(j, /\S+/);
                        break;
                    case 'X': // Same as 'x'?
                    case 'x':
                         // Fix: add overflows as above?
                        // Initial 0x not necessary here
                        j = _addNext(j, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function (num, sign, hex) {
                            return parseInt(num, 16);
                        });
                        break;
                    case '': // If no character left in expression
                        throw 'Missing character after percent mark in sscanf() format argument';
                    default:
                        throw 'Unrecognized character after percent mark in sscanf() format argument';
                }
            }
            catch(e) {
                if (e === 'No match in string') { // Allow us to exit
                    return _setExtraConversionSpecs(i+2);
                }
            }
            ++i; // Calculate skipping beyond initial percent too
        }
        else if (format.charAt(i) !== str.charAt(j)) {
            // Fix: Double-check i whitespace ignored in string and/or formats
            _NWS.lastIndex = 0;
            if ((_NWS).test(str.charAt(j)) || str.charAt(j) === '') { // Whitespace doesn't need to be an exact match)
                return _setExtraConversionSpecs(i+1);
            }
            else {
                // Adjust strings when encounter non-matching whitespace, so they align in future checks above
                str = str.slice(0, j)+str.slice(j+1); // Ok to replace with j++;?
                i--;
            }
        }
        else {
            j++;
        }
    }

    // POST-PROCESSING
    return _finish();
}

function str_getcsv ( input, delimiter, enclosure, escape ) {
    // Parse a CSV string into an array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_getcsv
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: str_getcsv('"abc", "def", "ghi"');
    // *     returns 1: ['abc', 'def', 'ghi']
    var output = [];
    var backwards = function (str) { // We need to go backwards to simulate negative look-behind (don't split on 
                                                              //an escaped enclosure even if followed by the delimiter and another enclosure mark)
        return str.split('').reverse().join('');
    };
    var pq = function (str) { // preg_quote()
        return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    };

    delimiter = delimiter || ',';
    enclosure = enclosure || '"';
    escape = escape || '\\';

    input = input.replace(new RegExp('^\\s*'+pq(enclosure)), '').replace(new RegExp(pq(enclosure)+'\\s*$'), '');

    // PHP behavior may differ by including whitespace even outside of the enclosure
    input = backwards(input).split(new RegExp(pq(enclosure)+'\\s*'+pq(delimiter)+'\\s*'+pq(enclosure)+'(?!'+pq(escape)+')', 'g')).reverse();

    for (var i = 0; i < input.length; i++) {
        output.push(backwards(input[i]).replace(new RegExp(pq(escape)+pq(enclosure), 'g'), enclosure));
    }

    return output;
}

function strip_tags (str, allowed_tags) {
    // Strips HTML and PHP tags from a string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strip_tags
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    var key = '', allowed = false;
    var matches = [];
    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = '';

    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };

    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }

    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);

    // Go through all HTML tags
    for (key in matches) {
        if (isNaN(key)) {
            // IE7 Hack
            continue;
        }

        // Save HTML tag
        html = matches[key].toString();

        // Is tag not in allowed list? Remove from str!
        allowed = false;

        // Go through all allowed tags
        for (k in allowed_array) {
            // Init
            allowed_tag = allowed_array[k];
            i = -1;

            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
            if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

            // Determine
            if (i == 0) {
                allowed = true;
                break;
            }
        }

        if (!allowed) {
            str = replacer(html, "", str); // Custom replace. No regexing
        }
    }

    return str;
}

