// ==UserScript==
// @name           US to Metric
// @namespace      http://odyniec.net/
// @description    Convert US measurement units to their metric counterparts
// @include        http://*
// @include        https://*
// ==/UserScript==

var _US_to_Metric_regexps = {
    miles_per_hour: [
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*m\.?p\.?h\.?(?=\W|$)/i,    /* 12.34 mph */
        /* 12.34 miles per hour */
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*miles?\s+per\s+hour(?=\W|$)/i
    ],
    inches: [
        /((?:\.[0-9]|[0-9])[0-9., /x]*)\s*(")/,                         /* 12.34" */
        /((?:\.[0-9]|[0-9])[0-9., /x]*)(\s|-)*in(ch)?(es)?(?=\W|$)/i    /* 12.34 inches */
    ],
    feet: [
        /((?:\.[0-9]|[0-9])[0-9., /x]*)(\s|-)*f(oo|ee)?t(?=\W|$)/i      /* 12.34 ft, 12-feet */
    ],
    yards: [
        /((?:\.[0-9]|[0-9])[0-9., /x]*)(\s|-)*y(ar)?ds?(?=\W|$)/i       /* 12.34 yds, 12.34 yards */
    ],
    miles: [
        /((?:\.[0-9]|[0-9])[0-9., /x]*)(\s|-)*mi(le)?s?(?=\W|$)/i       /* 12.34 miles */
    ],
    ounces: [
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*o(z|unces?)(?=\W|$)/i      /* 12 oz, 12 ounces */
    ],
    pounds: [
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*lbs?(?=\W|$)/i,            /* 12.34 lbs */
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*pounds?(?=\W|$)/i          /* 12.34 pounds */
    ],
    fluid_ounces: [
        /* 12 fl oz, 12 fluid ounces */
        /((?:\.[0-9]|[0-9])[0-9., /]*)(\s|-)*(u\.?s\.?\s)?fl(uid)?(\s|\.\s?)o(z|unces?)(?=\W|$)/i
    ],
    gallons: [
        /* 12.34 gal, 12.34 US gallon */
        /((?:\.[0-9]|[0-9])[0-9., /x]*)(\s|-)*(u\.?s\.?\s)?gal(lon)?(?=\W|$)/i
    ],
    fahrenheit: [
        /([-−]?[ ]*(?:\.[0-9]|[0-9])[0-9., /]*)\s*°\s*F(?=\W|$)/,       /* 34 °F */
        /* 34 degrees Fahrenheit */
        /([-−]?[ ]*(?:\.[0-9]|[0-9])[0-9., /]*)\s*deg(rees)?\s+f(ahrenheit)?(?=\W|$)/i
    ],
    next: [ ]
};

function _US_to_Metric_click(event)
{
    if (event.ctrlKey) {
        var t, nodes, switched = /_US_to_Metric_switched/.test(this.className);

        if (event.shiftKey)
            nodes = document.getElementsByClassName('_US_to_Metric_value');
        else
            nodes = [ this ];
            
        for (var i = 0; i < nodes.length; i++) 
            if (switched) {
                nodes[i].className = nodes[i].className.replace(' _US_to_Metric_switched', '');
                nodes[i].childNodes[0].nodeValue = nodes[i].title.split(/ = /)[0];
            }
            else {
                nodes[i].className = nodes[i].className.replace(' _US_to_Metric_switched', '');
                nodes[i].childNodes[0].nodeValue = nodes[i].title.split(/ = /)[1];
                nodes[i].className += ' _US_to_Metric_switched';
            }
        
        event.preventDefault();
        return false;
    }
}

function _US_to_Metric()
{
    var nodes, textNodes = [ ];
    var text, mode, r, pre, post, parent, span, t, tt, n, i;
    var regexps = _US_to_Metric_regexps;
    var excluded = { option: 1, script: 1, textarea: 1 };

    nodes = document.evaluate('//body//text()', document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
    for (i = 0; i < nodes.snapshotLength; i++)
        textNodes.push(nodes.snapshotItem(i));

    i = 0;

    while (i < textNodes.length) {
        if (textNodes[i].parentNode &&
            excluded[textNodes[i].parentNode.tagName.toLowerCase()])
        {
            i++;
            continue;
        }
    
        text = textNodes[i].nodeValue;

        if (!text || !text.match(/[0-9]/)) {
            i++;
            continue;
        }
        
        LOOP:
        for (mode in regexps)
            for (var j = 0; j < regexps[mode].length; j++)
                if (t = regexps[mode][j].exec(text))
                    break LOOP;

        if (mode == 'next') {
            i++;
            continue;
        }

        if (tt = t[1].match(/([0-9]+)\s+([0-9]+)\/([0-9]+)/))
            t[1] = (parseFloat(tt[1]) + tt[2] / tt[3]).toString();
            
        t[1] = t[1].replace(/\s+/g, '');
        t[1] = t[1].replace(',', '');
        t[1] = t[1].replace('−', '-');
        n = t[1].split(/x/);

        for (j = 0; j < n.length; j++)
            if (tt = n[j].match(/([0-9]+)\/([0-9]+)/))
                n[j] = tt[1] / tt[2];
                
        switch (mode) {
        case 'miles_per_hour':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 1.609344).toFixed(2);
                
            r = n.join(' x ') + ' km/h';                
            break;            
        case 'inches':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 2.54).toFixed(2);
                
            r = n.join(' x ') + ' cm';
            break;
        case 'feet':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 0.3048).toFixed(2);
                
            r = n.join(' x ') + ' m';
            break;
        case 'yards':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 0.9144).toFixed(2);
                
            r = n.join(' x ') + ' m';
            break;
        case 'miles':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 1.609344).toFixed(2);
                
            r = n.join(' x ') + ' km';
            break;
        case 'ounces':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 28.349523125).toFixed(2);
                
            r = n.join(' x ') + ' g';
            break;
        case 'pounds':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 0.45359237).toFixed(2);
                
            r = n.join(' x ') + ' kg';
            break;
        case 'fluid_ounces':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 29.57353).toFixed(2);
                
            r = n.join(' x ') + ' mL';
            break;
        case 'gallons':
            for (j = 0; j < n.length; j++)
                n[j] = (parseFloat(n[j]) * 3.78541178).toFixed(2);
                
            r = n.join(' x ') + ' L';
            break;
        case 'fahrenheit':
            for (j = 0; j < n.length; j++)
                n[j] = ((parseFloat(n[j]) - 32) * 5 / 9).toFixed(2);
            
            r = n.join(' x ') + ' °C';
            break;
        }
        
        pre = document.createTextNode(text.slice(0, text.indexOf(t[0])));
        post = document.createTextNode(text.slice(text.indexOf(t[0]) + t[0].length));

        span = document.createElement('span');
        span.appendChild(document.createTextNode(t[0]));
        t[0] = t[0].replace(/\s+/g, ' ');
        span.setAttribute('title', t[0] + ' = ' + r);
        span.className = '_US_to_Metric_value';
        span.style.cursor = 'pointer';
        span.addEventListener('click', _US_to_Metric_click, false);
        span.style.color = 'inherit';
        span.style.fontSize = 'inherit';
        span.style.fontWeight = 'inherit';

        parent = textNodes[i].parentNode;
        parent.replaceChild(post, textNodes[i]);
        parent.insertBefore(span, post);
        parent.insertBefore(pre, span);

        textNodes[i] = pre;
        textNodes.push(post);
    }
}

_US_to_Metric();

