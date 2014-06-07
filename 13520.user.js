// ==UserScript==
// @name           Convert foreign to local currency
// @description    Converts prices to a valuta of your choice
// @version        2012-12-17
// @updateURL      https://userscripts.org/scripts/source/13520.meta.js
// @namespace      none.m31.convert_currency
// @include        *
// @exclude        http://en.wikipedia.org/wiki/List_of_circulating_currencies
// @exclude        about:blank
// ==/UserScript==

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// This list contains all the currencies we look for. 
// The key is the international currency code, the following list contains the different symbols used to denote 
// that currency. The first from that list will be used for formatting.
// Feel free to add any missing values.

var lookup_currency = {
    'USD': ['US$', '$'],
    'GBP': ['£'],
    'EUR': ['€'],
    'AUD': ['AU$', '$', 'A$'],
    'CAD': ['CA$', 'C$', 'CDN', '$', 'CDN$'],
    'JPY': ['￥','¥'],
    'CNY': ['￥','¥'],
    'CHF': ['CHF', 'Fr', 'Sfr'],
    'HKD': ['HK$', '$'],
    'INR': ['₹', 'rs', '₨'],
    'IDR': ['Rp'],
    'ISK': ['kr', 'íkr'],
    'ILS': ['₪'],
    'DKK': ['kr'],
    'NOK': ['kr', 'NOR'],
    'SEK': ['kr'],
    'THB': ['฿'],
    'TRY': ['TL'],
    'RUB': ['руб'],
    'PLN': ['zł']
}

// These currencies prefer to suffix their symbol
var symbol_suffix = ['CHF', 'DKK', 'NOR', 'ISK', 'TRY']

// ------------------------------------------------------------------------- //

function set_local_currency() {
    var answer = prompt('Please enter your 3-letter currency code (e.g. USD, EUR, GBP)\nYou can change this setting later using the Greasemonkey menu\nIf you dot know the proper code, press Cancel')
    if (!answer && !local_currency) 
    {
        GM_openInTab('http://en.wikipedia.org/wiki/List_of_circulating_currencies')
    } else if (answer.length >= 3) 
    {
        local_currency = answer
        lookup_exchange = []
        GM_setValue('exchange-rates', local_currency + '!' + today)
    }
}

function add_symbol(code, symbol) {
    if (!(symbol in lookup_symbol)) 
    {
        lookup_symbol[symbol] = new Array(code)
    } else {
        lookup_symbol[symbol].push(code)
    }
}

function match_all(node, regex, prefix) {
    var matches = []
    while (m = regex.exec(node.data)) 
    {
        var start = prefix ? m.index + m[1].length : m.index
        var end = m.index+m[0].length
        var symbol = m[2]
        var amount = prefix ? m[3] : m[1]
        matches.push([start, end, symbol, amount])
    }	
    return matches
}

function create_element(symbol, amount) {
    var node = document.createElement('span')
    node.addEventListener('mouseover', show_tooltip, false)
    node.addEventListener('mouseout', hide_tooltip, false)
    node.setAttribute('class', 'autocurrency')
    node.setAttribute('symbol', symbol)
    node.setAttribute('amount', amount)
    return node
}

function mark_currency() {
    if (!local_currency) 
        return
        
    text = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = text.snapshotLength-1; i > 0; --i) 
    {
        var el = text.snapshotItem(i)
        if (!el.parentNode || re_skip.test(el.parentNode.nodeName) || el.parentNode.getAttribute('class') == 'autocurrency')
            continue

        var prefix = match_all(el, re_currency_prefix, true)
        var matches = prefix.concat( match_all(el, re_currency_suffix, false) )
        matches.sort(function(a,b) { return a[0] - b[0] })
        for (var j = matches.length - 1; j >= 0; --j) {
            var m = matches[j]
            var range = document.createRange()
            range.setStart(el, m[0])
            range.setEnd(el, m[1])
            range.surroundContents(create_element(m[2], m[3]))
        }
    }
}

function show_tooltip() {
    var x = 0
    var y = 0
    for(var obj = this; obj; obj = obj.offsetParent) 
    {
        x += obj.offsetLeft
        y += obj.offsetTop
    }
    y += this.offsetHeight

    tooltip_symbol = this.getAttribute('symbol')
    tooltip_amount = parse_amount(this.getAttribute('amount'))

    var decimal = tooltip_amount.toString().split(".");
    tooltip_precision = (decimal.length > 1 && decimal[1].length > 2) ? decimal[1].length+1 : 2
    fill_tooltip()
	
    tooltip.style.display = 'block'
	
    var top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
    if (y + tooltip.offsetHeight > top + document.body.clientHeight) 
    {
        y -= this.offsetHeight + tooltip.offsetHeight + 20
    }
    
    var left = document.documentElement ? document.documentElement.scrollLeft : document.body.scrollLeft;    
    if (x + tooltip.offsetWidth > left + document.body.clientWidth -20) 
    {
        x -= tooltip.offsetWidth - this.offsetWidth
    }

    tooltip.style.left = x + 'px'
    tooltip.style.top = y + 'px'
}

function hide_tooltip() {
    tooltip.style.top = tooltip.style.left = '-100px'
    tooltip.style.display = 'none'
}

function fill_tooltip() {
    var foreign_currency_list = lookup_symbol[tooltip_symbol]
    var foreign_amount = tooltip_amount
    var local_symbol = local_currency in lookup_currency ? lookup_currency[local_currency][0] : local_currency
    var table = ''
    for (c in foreign_currency_list) {
        var foreign_currency = foreign_currency_list[c]
        var exchange_rate = get_exchange_rate(foreign_currency)
        if (exchange_rate != null) 
        {
            var local_amount = (foreign_amount * exchange_rate).toFixed(tooltip_precision);
            var local_formatted = (symbol_suffix.indexOf(local_currency) != -1)
                    ? local_amount + '\xA0' + local_symbol 
                    : local_symbol + '\xA0' + local_amount
            table += '<tr><td>' + foreign_currency + ':</td><td>' + local_formatted + '</td></tr>'
        } else {
            table += '<tr><td>' + foreign_currency + ':</td><td>retrieving</td></tr>'
        }
    }
    tooltip.innerHTML = '<table>' + table + '</table>'
}

function parse_amount(input) {
    var point = input.indexOf('.');
    var comma = input.indexOf(',');
    
    if (point >= 0 && comma >= 0)
    {
        if (point > comma)
            input = input.replace(/,/g, '');
        else
        {
            input = input.replace(/\./g, '');
            input = input.replace(/,/g, '.');
        }
    }
    else if (point >= 0 || comma >= 0)
    {
        input = input.replace(/,/g, '.');
        if (/\.[0-9]{3}$/.test(input)) 
        {
            var n = input.split('.');
            if (parseInt(n[0]) != 0)
                input = input.replace(/\./g, '');
        }
    }
    return parseFloat(input);
}

function get_exchange_rate(foreign_currency) {
    if (foreign_currency in lookup_exchange)
        return lookup_exchange[foreign_currency]
        
    if (!(foreign_currency in requests)) {
        requests.push(foreign_currency)
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://download.finance.yahoo.com/d/quotes.csv?s=" + foreign_currency + local_currency + "=X&f=Xl1&e=.csv",
            onload: function(responseDetails) 
            {
                var response = responseDetails.responseText.split(",");
                var foreign_currency = response[0].substring(1,4);
                lookup_exchange[foreign_currency] = parseFloat(response[1])

                requests.splice(requests.indexOf(foreign_currency), 1)

                var raw = []
                for (i in lookup_exchange) {
                    raw.push(i + ':' + lookup_exchange[i])
                }
                GM_setValue('exchange-rates', local_currency + '!' + today + '!' + raw.join('|'))
                fill_tooltip()
            }
        })
    }
    return null;
}

var today = new Date().toDateString()
var requests = []
var re_skip = /^(SCRIPT|IFRAME|TEXTAREA|STYLE|OPTION|TITLE)$/

// Get the locally stored exchange rates
var lookup_exchange = {}
var raw = GM_getValue('exchange-rates', '').split('!')
var local_currency = raw[0]
if (local_currency != '') 
{
    if (raw[1] == today && raw.length > 2) 
    {
        c = raw[2].split('|')
        for (i in c) 
        {
            var e = c[i].split(':')
            lookup_exchange[e[0]] = e[1]
        }
    }
} else if (document.URL != 'http://en.wikipedia.org/wiki/List_of_circulating_currencies' && document.URL != 'about:blank') {
    // Ask about the local currency if it is not set
    set_local_currency()
}

// Create a reverse lookup table (symbol -> currency code)
var lookup_symbol = []
for (code in lookup_currency) 
{
    if (code == local_currency)
        continue
    
    add_symbol(code, code)
    for (i in lookup_currency[code]) 
    {
        add_symbol(code, lookup_currency[code][i])
    }
}

// Create a list of all symbols we should match
var re_symbols = ''
for (symbol in lookup_symbol) 
{
    re_symbols += '|' + symbol.replace('$', '\\$')
}
re_symbols = re_symbols.substring(1)

// Regexes that should match currencies
var re_currency_prefix = new RegExp('(\\W|^)('+re_symbols+')\\s*([0-9.,]*[0-9])', 'ig')
var re_currency_suffix = new RegExp('([0-9.,]*[0-9])-?\\s*('+re_symbols+')(?=$|[^a-zA-Z0-9])', 'img')

// A tooltip dialog
var tooltip =  document.createElement('div')
tooltip.setAttribute('id', 'autocurrencytooltip')
tooltip.style.display= 'none'
document.body.appendChild(tooltip)
var tooltip_symbol = null
var tooltip_amount = null
var tooltip_precision = 2

GM_addStyle('.autocurrency { border-bottom: 1px dashed; } #autocurrencytooltip * { padding: 0px; margin: 0px; border: 0px; } #autocurrencytooltip { background-color: Beige; border: 2px solid YellowGreen; position: absolute; padding: 0.2em; margin: 10px 0px; z-index: 2000 } #autocurrencytooltip td { font-family: sans-serif !important; font-style: normal !important; font-weight: normal !important; font-size: 11pt !important; color: black; text-align: right; padding: 0.1em; } #autocurrencytooltip td:first-child { font-size: 9pt !important; }')

GM_registerMenuCommand('Change local currency', set_local_currency)

// Do something useful
mark_currency()

// Support for AutoPagerize
document.addEventListener('GM_AutoPagerizeNextPageLoaded', mark_currency, false);