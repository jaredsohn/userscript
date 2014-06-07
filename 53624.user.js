// ==UserScript==
// @name           PostcodeLookup
// @namespace      http://www.data-8.co.uk/integr8/developers/tutorials/postcode_lookup_greasemonkey
// ==/UserScript==

var pageConfigs = new Array();
var ajaxKey = 'YOUR-AJAX-KEY';

// CONFIGURE - replace the YOUR-AJAX-KEY value above with your own personal
//             Ajax key available from http://www.data-8.co.uk/integr8/Admin/Ajax.aspx
//             Note that you must have an "Address Capture - Internal User" licence
//             from Data8 in order for this script to work correctly.

// CONFIGURE - add entries to the pageConfigs array to indicate how addresses
//             should be entered into the pages you use, e.g.
//
// pageConfigs['http://www.example.com/'] = {
//     buttonPos: 'zipcode',
//     add1: 'address1',
//     add2: 'address2',
//     add3: 'address3',
//     add4: 'address4',
//     town: 'city',
//     county: 'state',
//     postcode: 'zipcode'
// };
//
// Each entry identifies which fields should be used to hold the address on
// a particular page. The buttonPos setting indicates the element in the page
// that the "Find Address" button should be added after. Settings add1 - add6
// can be used to identify the elements used to hold address lines 1 to 6.
// The town and county settings can be used instead of add5 and add6 to hold
// the town and county parts of the address if they need to be separated out.
// Finally, the postcode setting indicates the element used to contain the
// postcode.

var pageConfig = pageConfigs[window.location.href];

if (pageConfig == null) {
    alert('No postcode lookup configuration defined for ' + window.location.href + '\n\nPlease edit the PostcodeLookup Greasemonkey script to add a pageConfigs entry for this URL.');
} else {
    try {
        // Local version of the Ajax library for use by the Greasemonkey sandbox.
        // NOTE: dynamicInvoke is modified to update the callQueue array in the
        // external window to allow callback scripts loaded outside the Greasemonkey
        // sandbox to reference the correct callback function.
        function dst(url) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = url;
            document.getElementsByTagName('head')[0].appendChild(s);
        }

        if (typeof (data8) == 'undefined')
            data8 = function() { };

        data8.prototype.callQueue = new Array();

        if (typeof (data8.load) == 'undefined') {
            data8.load = function(service) {
                var url = 'http://webservices.data-8.co.uk/Javascript/Proxy.ashx?key=' + ajaxKey + '&service=' + escape(service);
                dst(url);
            }
        }

        data8.prototype.dynamicInvoke = function(service, func, args, options, callback) {
            var callIndex = data8.prototype.callQueue.length;
            data8.prototype.callQueue[callIndex] = callback;
            unsafeWindow.data8.prototype.callQueue[callIndex] = callback;

            var url = 'http://webservices.data-8.co.uk/Javascript/Handler.ashx?key=' + ajaxKey + '&service=' + escape(service) + '&func=' + escape(func);

            for (var i = 0; args != null && i < args.length; i++) {
                url = url + '&arg' + i + '=' + escape(args[i]);
            }

            for (var i = 0; options != null && i < options.length; i++) {
                url = url + '&opt' + i + 'name=' + escape(options[i].name);
                url = url + '&opt' + i + 'value=' + escape(options[i].value);
            }

            url = url + '&callback=data8.prototype.callQueue[' + callIndex + ']';
            url = url + '&rnd=' + Math.floor(Math.random() * 1000000);

            dst(url);
        }

        if (typeof (data8.option) == 'undefined') {
            data8.option = function(name, value) {
                this.name = name;
                this.value = value;
            }
        }

        if (typeof (data8.parseJsonDate) == 'undefined') {
            data8.parseJsonDate = function(key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
                    /^\/Date\((-?\d+)\)\/$/.exec(value);
                    if (a) {
                        return new Date(+a[1]);
                    }
                }
                return value;
            }
        }

        // JSON
        if (!this.JSON) { JSON = {}; }
        (function() {
            function f(n) { return n < 10 ? '0' + n : n; }
            if (typeof Date.prototype.toJSON !== 'function') {
                Date.prototype.toJSON = function(key) {
                    return this.getUTCFullYear() + '-' +
        f(this.getUTCMonth() + 1) + '-' +
        f(this.getUTCDate()) + 'T' +
        f(this.getUTCHours()) + ':' +
        f(this.getUTCMinutes()) + ':' +
        f(this.getUTCSeconds()) + 'Z';
                }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) { return this.valueOf(); };
            }
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function(a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; }
            function str(key, holder) {
                var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
                if (typeof rep === 'function') { value = rep.call(holder, key, value); }
                switch (typeof value) {
                    case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; }
                        gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap +
        partial.join(',\n' + gap) + '\n' +
        mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v;
                        }
                        if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } }
                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
        mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v;
                }
            }
            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function(value, replacer, space) {
                    var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; }
                    rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); }
                    return str('', { '': value });
                };
            }
            if (typeof JSON.parse !== 'function') {
                JSON.parse = function(text, reviver) {
                    var j; function walk(holder, key) {
                        var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } }
                        return reviver.call(holder, key, value);
                    }
                    cx.lastIndex = 0; if (cx.test(text)) {
                        text = text.replace(cx, function(a) {
                            return '\\u' +
        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; }
                    throw new SyntaxError('JSON.parse');
                };
            }
        })();

        // Embedded proxies
        data8.addresscapture = function() { data8.apply(this); }
        data8.addresscapture.prototype = new data8();
        data8.addresscapture.prototype.validatepostcodesimple = function(licence, postcode, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'ValidatePostcodeSimple', [licence, postcode], null, callback);
        }
        data8.addresscapture.prototype.validatepostcode = function(licence, postcode, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'ValidatePostcode', [licence, postcode], options, callback);
        }
        data8.addresscapture.prototype.getfulladdresssimple = function(licence, postcode, building, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'GetFullAddressSimple', [licence, postcode, building], null, callback);
        }
        data8.addresscapture.prototype.getfulladdress = function(licence, postcode, building, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'GetFullAddress', [licence, postcode, building], options, callback);
        }
        data8.addresscapture.prototype.getfullrawaddresssimple = function(licence, postcode, building, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'GetFullRawAddressSimple', [licence, postcode, building], null, callback);
        }
        data8.addresscapture.prototype.getfullrawaddress = function(licence, postcode, building, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'GetFullRawAddress', [licence, postcode, building], options, callback);
        }
        data8.addresscapture.prototype.findaddresssimple = function(licence, town, street, building, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FindAddressSimple', [licence, town, street, building], null, callback);
        }
        data8.addresscapture.prototype.findaddress = function(licence, town, street, building, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FindAddress', [licence, town, street, building], options, callback);
        }
        data8.addresscapture.prototype.localitiesbypostcodesimple = function(licence, postcode, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'LocalitiesByPostcodeSimple', [licence, postcode], null, callback);
        }
        data8.addresscapture.prototype.localitiesbypostcode = function(licence, postcode, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'LocalitiesByPostcode', [licence, postcode], options, callback);
        }
        data8.addresscapture.prototype.localitiesbynamesimple = function(licence, name, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'LocalitiesByNameSimple', [licence, name], null, callback);
        }
        data8.addresscapture.prototype.localitiesbyname = function(licence, name, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'LocalitiesByName', [licence, name], options, callback);
        }
        data8.addresscapture.prototype.streetsbylocalitykeysimple = function(licence, localitykey, street, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'StreetsByLocalityKeySimple', [licence, localitykey, street], null, callback);
        }
        data8.addresscapture.prototype.streetsbylocalitykey = function(licence, localitykey, street, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'StreetsByLocalityKey', [licence, localitykey, street], options, callback);
        }
        data8.addresscapture.prototype.streetsbynamesimple = function(licence, locality, street, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'StreetsByNameSimple', [licence, locality, street], null, callback);
        }
        data8.addresscapture.prototype.streetsbyname = function(licence, locality, street, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'StreetsByName', [licence, locality, street], options, callback);
        }
        data8.addresscapture.prototype.addressesbystreetkeysimple = function(licence, streetkey, building, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'AddressesByStreetKeySimple', [licence, streetkey, building], null, callback);
        }
        data8.addresscapture.prototype.addressesbystreetkey = function(licence, streetkey, building, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'AddressesByStreetKey', [licence, streetkey, building], options, callback);
        }
        data8.addresscapture.prototype.addressesbylocalitykeysimple = function(licence, localitykey, building, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'AddressesByLocalityKeySimple', [licence, localitykey, building], null, callback);
        }
        data8.addresscapture.prototype.addressesbylocalitykey = function(licence, localitykey, building, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'AddressesByLocalityKey', [licence, localitykey, building], options, callback);
        }
        data8.addresscapture.prototype.fetchrawaddresssimple = function(licence, addresskey, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FetchRawAddressSimple', [licence, addresskey], null, callback);
        }
        data8.addresscapture.prototype.fetchrawaddress = function(licence, addresskey, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FetchRawAddress', [licence, addresskey], options, callback);
        }
        data8.addresscapture.prototype.fetchaddresssimple = function(licence, addresskey, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FetchAddressSimple', [licence, addresskey], null, callback);
        }
        data8.addresscapture.prototype.fetchaddress = function(licence, addresskey, options, callback) {
            data8.prototype.dynamicInvoke.call(this, 'AddressCapture', 'FetchAddress', [licence, addresskey], options, callback);
        }

        // Load the Ajax library for use by the response handler.
        var s = document.createElement('script');
        s.src = 'http://webservices.data-8.co.uk/Javascript/Loader.ashx?key=' + ajaxKey + '&load=AddressCapture';
        document.getElementsByTagName('head')[0].appendChild(s);

        // Define the functions used for the lookup.
        var maxLineLength = 255;
        var maxLines = 6;
        var fixTownCounty = false;

        if (pageConfig.town || pageConfig.county) {
            fixTownCounty = true;
        }
        else {
            if (!pageConfig.add6)
                maxLines--;
            if (!pageConfig.add5)
                maxLines--;
        }

        if (!pageConfig.add4)
            maxLines--;
        if (!pageConfig.add3)
            maxLines--;
        if (!pageConfig.add2)
            maxLines--;

        var options = [
          new data8.option('MaxLineLength', maxLineLength),
          new data8.option('MaxLines', maxLines),
          new data8.option('FixTownCounty', fixTownCounty)
        ];

        function showFreeTextLookup(e) {
            // Switch from the postcode lookup to free-text lookup views.
            postcodeLookup.style.display = 'none';
            freeTextLookup.style.display = 'block';
            building.focus();

            if (e.preventDefault)
                e.preventDefault();
        }

        function showPostcodeLookup(e) {
            // Switch from the postcode lookup to free-text lookup views.
            postcodeLookup.style.display = 'block';
            freeTextLookup.style.display = 'none';
            postcode.focus();

            if (e.preventDefault)
                e.preventDefault();
        }

        function doPostcodeLookup() {
            // Check that a postcode has been entered.
            if (postcode.value == '') {
                alert('You must enter a postcode');
            }
            else {
                var ws = new data8.addresscapture();
                ws.getfulladdress('InternalUserFull', postcode.value, house.value, options, doPostcodeLookupResults);
            }
        }

        var _postcodeLookupResults;
        var _freeTextLookupResults;

        function doPostcodeLookupResults(results) {
            _postcodeLookupResults = results;

            if (!results.Status.Success) {
                alert('Error: ' + results.Status.ErrorMessage);
            }
            else if (results.Results.length == 0) {
                alert('Address not found');
            }
            else if (results.Results.length == 1) {
                doSelectAddress(results.Results[0]);
            }
            else {
                for (var i = postcodeAddressList.options.length; i >= 0; i--) {
                    postcodeAddressList.options[i] = null;
                }

                for (var i = 0; i < results.Results.length; i++) {
                    var address = results.Results[i];
                    var singleLine = address.Address.Lines.join(', ');

                    var option = new Option(singleLine, i);
                    postcodeAddressList.options[postcodeAddressList.options.length] = option;
                }

                postcodeLookup.style.display = 'none';
                postcodeLookupResults.style.display = 'block';
            }
        }

        function undoPostcodeLookup() {
            postcodeLookup.style.display = 'block';
            postcodeLookupResults.style.display = 'none';
        }

        function doPostcodeSelectAddress() {
            if (postcodeAddressList.selectedIndex < 0) {
                alert('Please select an address from the list');
            }
            else {
                doSelectAddress(_postcodeLookupResults.Results[postcodeAddressList.selectedIndex]);
            }
        }

        function doSelectAddress(address) {
            fadeOut();
            container.style.display = 'none';

            var dynamicLines = maxLines - (fixTownCounty ? 2 : 0);

            for (var line = 0; line < dynamicLines; line++) {
                var el = document.getElementById(pageConfig['add' + (line + 1)]);
                if (!el)
                    el = document.getElementsByName(pageConfig['add' + (line + 1)])[0];

                if (el)
                    el.value = address.Address.Lines[line];
            }

            if (fixTownCounty) {
                var el = document.getElementById(pageConfig.town);
                if (!el)
                    el = document.getElementsByName(pageConfig.town)[0];

                if (el)
                    el.value = address.Address.Lines[maxLines - 2];

                el = document.getElementById(pageConfig.county);
                if (!el)
                    el = document.getElementsByName(pageConfig.county)[0];

                if (el)
                    el.value = address.Address.Lines[maxLines - 1];
            }

            var el = document.getElementById(pageConfig.postcode);
            if (!el)
                el = document.getElementsByName(pageConfig.postcode)[0];

            if (el)
                el.value = address.Address.Lines[maxLines];
        }

        function doFreeTextLookup() {
            // Check that a town and street or building has been entered.
            if (town.value == '' || (street.value == '' && building.value == '')) {
                alert('You must enter a town and either a street or building');
            }
            else {
                var ws = new data8.addresscapture();
                ws.findaddresssimple('InternalUserFull', town.value, street.value, building.value, doFreeTextLookupResults);
            }
        }

        function doFreeTextLookupResults(results) {
            _freeTextLookupResults = results;

            if (!results.Status.Success) {
                alert('Error: ' + results.Status.ErrorMessage);
            }
            else if (results.Results.length == 0) {
                alert('Address not found');
            }
            else if (results.Results.length == 1) {
                doFetchAddress(results.Results[0].ID);
            }
            else {
                for (var i = freeTextAddressList.options.length; i >= 0; i--) {
                    freeTextAddressList.options[i] = null;
                }

                for (var i = 0; i < results.Results.length; i++) {
                    var address = results.Results[i];

                    var option = new Option(address.Description, address.ID);
                    freeTextAddressList.options[freeTextAddressList.options.length] = option;
                }

                freeTextLookup.style.display = 'none';
                freeTextLookupResults.style.display = 'block';
            }
        }

        function undoFreeTextLookup() {
            freeTextLookup.style.display = 'block';
            freeTextLookupResults.style.display = 'none';
        }

        function doFreeTextSelectAddress() {
            if (freeTextAddressList.selectedIndex < 0) {
                alert('Please select an address from the list');
            }
            else {
                doFetchAddress(freeTextAddressList.options[freeTextAddressList.selectedIndex].value);
            }
        }

        function doFetchAddress(id) {
            var ws = new data8.addresscapture();
            ws.fetchaddress('InternalUserFull', id, options, doFetchAddressResults);
        }

        function doFetchAddressResults(results) {
            if (!results.Status.Success) {
                alert('Error: ' + results.Status.ErrorMessage);
            }
            else {
                doSelectAddress(results.Results[0]);
            }
        }

        // Create the UI elements used for the lookup.
        var background = document.createElement('div');
        background.style.backgroundColor = 'black';
        background.style.opacity = '0';
        background.style.display = 'none';
        background.style.position = 'fixed';
        background.style.left = '0px';
        background.style.top = '0px';
        background.style.width = '100%';
        background.style.height = '100%';
        document.body.appendChild(background);

        function fadeIn() {
            var opacity = parseFloat(background.style.opacity);
            opacity = opacity + 0.1;
            background.style.opacity = opacity;

            if (opacity < 0.7)
                setTimeout(fadeIn, 50);
        }

        function fadeOut() {
            var opacity = parseFloat(background.style.opacity);
            opacity = opacity - 0.1;
            background.style.opacity = opacity;

            if (opacity > 0)
                setTimeout(fadeOut, 50);
            else
                background.style.display = 'none';
        }

        var container = document.createElement('div');
        container.style.backgroundColor = 'white';
        container.style.border = 'solid 1px gray';
        container.style.display = 'none';
        container.style.position = 'fixed';
        container.style.width = '500px';
        container.style.height = '300px';
        container.style.padding = '0.5em';
        container.style.fontFamily = 'calibri,verdana,arial,sans-serif';
        container.style.fontSize = '9pt';
        document.body.appendChild(container);

        var header = document.createElement('div');
        var close = document.createElement('a');
        close.style.display = 'inline-block';
        close.innerHTML = 'X';
        close.style.color = 'white';
        close.style.backgroundColor = '#C0504D';
        close.style.margin = '-4px 0';
        close.style.padding = '4px';
        close.style.textDecoration = 'none';
        close.title = 'Close Address Finder';
        close.style.cssFloat = 'right';
        close.href = '';
        close.addEventListener('click', function(e) {
            fadeOut();
            container.style.display = 'none';
            if (e.preventDefault)
                e.preventDefault();
        }, true);
        header.appendChild(close);
        header.appendChild(document.createTextNode('Address Finder'));
        header.style.textAlign = 'center';
        header.style.backgroundColor = '#26468E';
        header.style.color = 'white';
        header.style.padding = '4px 0';
        header.style.fontWeight = 'bold';
        container.appendChild(header);

        var footer = document.createElement('div');
        a = document.createElement('a');
        a.href = 'http://www.data-8.co.uk';
        a.target = '_blank';
        var img = document.createElement('img');
        img.src = 'http://webservices.data-8.co.uk/SimplePostcodeLookup/logo.png';
        img.style.border = '0';
        img.align = 'absmiddle';
        a.appendChild(document.createTextNode('Powered by'));
        a.appendChild(img);
        footer.appendChild(a);
        footer.style.textAlign = 'right';
        footer.style.height = '50px';
        footer.style.lineHeight = '50px';
        footer.style.verticalAlign = 'middle';
        footer.style.position = 'absolute';
        footer.style.right = '0px';
        footer.style.bottom = '0px';
        container.appendChild(footer);

        // ---------- Postcode Lookup page ----------
        var postcodeLookup = document.createElement('div');
        container.appendChild(postcodeLookup);

        var p = document.createElement('p');
        p.appendChild(document.createTextNode('Postcode: '));
        var a = document.createElement('a');
        a.innerHTML = 'I don\'t know my postcode';
        a.href = '';
        a.addEventListener('click', showFreeTextLookup, true);
        p.appendChild(a);
        p.appendChild(document.createElement('br'));
        var postcode = document.createElement('input');
        p.appendChild(postcode);
        postcodeLookup.appendChild(p);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('House name or number:'));
        p.appendChild(document.createElement('br'));
        var house = document.createElement('input');
        p.appendChild(house);
        postcodeLookup.appendChild(p);

        p = document.createElement('p');
        var btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'Find Address';
        btn.addEventListener('click', doPostcodeLookup, false);
        p.appendChild(btn);
        postcodeLookup.appendChild(p);

        // ---------- Postcode Lookup results page ----------
        var postcodeLookupResults = document.createElement('div');
        postcodeLookupResults.style.display = 'none';
        container.appendChild(postcodeLookupResults);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('Select your address from the list below:'));
        p.appendChild(document.createElement('br'));

        var postcodeAddressList = document.createElement('select');
        postcodeAddressList.multiple = 'multiple';
        postcodeAddressList.size = 10;
        postcodeAddressList.style.width = '100%';
        postcodeAddressList.addEventListener('dblclick', doPostcodeSelectAddress, false);
        p.appendChild(postcodeAddressList);
        postcodeLookupResults.appendChild(p);

        p = document.createElement('p');
        btn = document.createElement('input');
        btn.type = 'button';
        btn.value = '< Back';
        btn.addEventListener('click', undoPostcodeLookup, false);
        p.appendChild(btn);
        p.appendChild(document.createTextNode(' '));
        btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'Select Address';
        btn.addEventListener('click', doPostcodeSelectAddress, false);
        p.appendChild(btn);
        postcodeLookupResults.appendChild(p);

        // ---------- Free Text Lookup page ----------
        var freeTextLookup = document.createElement('div');
        freeTextLookup.style.display = 'none';
        container.appendChild(freeTextLookup);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('House name or number: '));
        a = document.createElement('a');
        a.href = '';
        a.addEventListener('click', showPostcodeLookup, true);
        a.innerHTML = 'I know my postcode';
        p.appendChild(a);
        p.appendChild(document.createElement('br'));
        var building = document.createElement('input');
        p.appendChild(building);
        freeTextLookup.appendChild(p);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('Street:'));
        p.appendChild(document.createElement('br'));
        var street = document.createElement('input');
        p.appendChild(street);
        freeTextLookup.appendChild(p);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('Town:'));
        p.appendChild(document.createElement('br'));
        var town = document.createElement('input');
        p.appendChild(town);
        freeTextLookup.appendChild(p);

        p = document.createElement('p');
        btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'Find Address';
        btn.addEventListener('click', doFreeTextLookup, false);
        p.appendChild(btn);
        freeTextLookup.appendChild(p);

        // ---------- Postcode Lookup results page ----------
        var freeTextLookupResults = document.createElement('div');
        freeTextLookupResults.style.display = 'none';
        container.appendChild(freeTextLookupResults);

        p = document.createElement('p');
        p.appendChild(document.createTextNode('Select your address from the list below:'));
        p.appendChild(document.createElement('br'));

        var freeTextAddressList = document.createElement('select');
        freeTextAddressList.multiple = 'multiple';
        freeTextAddressList.size = 10;
        freeTextAddressList.style.width = '100%';
        freeTextAddressList.addEventListener('dblclick', doFreeTextSelectAddress, false);
        p.appendChild(freeTextAddressList);
        freeTextLookupResults.appendChild(p);

        p = document.createElement('p');
        btn = document.createElement('input');
        btn.type = 'button';
        btn.value = '< Back';
        btn.addEventListener('click', undoFreeTextLookup, false);
        p.appendChild(btn);
        p.appendChild(document.createTextNode(' '));
        btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'Select Address';
        btn.addEventListener('click', doFreeTextSelectAddress, false);
        p.appendChild(btn);
        freeTextLookupResults.appendChild(p);

        var button = document.createElement('input');
        button.type = 'button';
        button.value = 'Find Address';
        button.addEventListener('click', function() {
            container.style.top = (window.innerHeight - 300) / 2 + 'px';
            container.style.left = (window.innerWidth - 500) / 2 + 'px';
            background.style.height = document.body.height + 'px';
            background.style.display = 'block';
            postcodeLookup.style.display = 'block';
            postcodeLookupResults.style.display = 'none';
            freeTextLookup.style.display = 'none';
            freeTextLookupResults.style.display = 'none';
            postcode.value = '';
            house.value = '';
            building.value = '';
            street.value = '';
            town.value = '';
            container.style.display = 'block';
            postcode.focus();

            fadeIn();
        }, false);

        var parent = document.getElementById(pageConfig.buttonPos);
        if (!parent)
            parent = document.getElementsByName(pageConfig.buttonPos)[0];

        parent.parentNode.insertBefore(button, parent.nextSibling);
    }
    catch (err) {
        alert(err);
    }
}
