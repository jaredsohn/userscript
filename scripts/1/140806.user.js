/*
// ==UserScript==
// @name        PriceLine Negotiator
// @namespace   http://silkroadvb5piz3r.onion/qaz
// @description replace bitcoin prices with real prices
// @include     http://silkroadvb5piz3r.onion/index.php
// @include     http://silkroadvb5piz3r.onion/index.php/silkroad/item*
// @include     http://silkroadvb5piz3r.onion/index.php/silkroad/category*
// @version     1
// ==/UserScript==
*/


(function() {
  var buy, currencies, defaults, desc, el, element, elements, html, item, log, nextTick, parseWeight, price, prices, pullPrices, pullSettings, pushPrices, pushSettings, redraw, round, settings, text, weightInGrams, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2,
    __slice = [].slice;

  log = function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = unsafeWindow.console).log.apply(_ref, args);
  };

  currencies = {
    BTC: '฿',
    JPY: '¥',
    USD: '$',
    AUD: 'AU$',
    CHF: 'CHF',
    RUB: 'руб.',
    CNY: 'CN¥',
    SLL: 'Le',
    DKK: 'kr.',
    BRL: 'R$',
    GBP: '£',
    NZD: 'NZ$',
    PLN: 'zł',
    CAD: 'CA$',
    SEK: 'kr.',
    SGD: 'S$',
    HKD: 'HK$',
    EUR: '€',
    custom: ''
  };

  settings = {
    currency: 'USD'
  };

  defaults = {
    pricesCacheTime: 1000 * 60 * 60,
    window: '24h',
    pricesJsonURL: 'http://bitcoincharts.com/t/weighted_prices.json',
    testClasses: ['price_small', 'price_big', 'price', 'td', 'nav_count']
  };

  (pushSettings = function() {
    return GM_setValue('settings', JSON.stringify(settings));
  })();

  (pullSettings = function() {
    var json;
    if (json = GM_getValue('settings')) {
      return settings = JSON.parse(json);
    } else {
      return pushSettings();
    }
  })();

  prices = null;

  pushPrices = function(prices) {
    return GM_setValue('prices', JSON.stringify(prices));
  };


  nextTick = function(cb) {
    return setTimeout(cb, 0);
  };

  pullPrices = function(cb) {
    var json;
    json = GM_getValue('prices');
    if (json != null) {
      prices = JSON.parse(json);
    }
    if ((prices != null) && (new Date).getTime() - prices.timestamp < defaults.pricesCacheTime) {
      return nextTick(cb);
    } else {
      return GM_xmlhttpRequest({
        method: 'GET',
        url: defaults.pricesJsonURL,
        onload: function(res) {
          prices = JSON.parse(res.responseText);
          prices.BTC = {
            '24h': 1
          };
          prices.timestamp = (new Date).getTime();
          pushPrices(prices);
          return cb();
        }
      });
    }
  };

  round = function(n) {
    return Math.round(n * 100) / 100;
  };

  redraw = function() {
    var className, el, elements, match, rate, symbol, testElements, _i, _len, _results;
    if (settings.currency !== 'custom') {
      symbol = currencies[settings.currency];
      rate = prices[settings.currency][defaults.window];
    } else {
      symbol = settings.custom.symbol;
      rate = settings.custom.rate;
    }
    testElements = [];
    _results = [];
    for (_i = 0, _len = defaults.testClasses.length; _i < _len; _i++) {
      className = defaults.testClasses[_i];
      elements = document.getElementsByClassName(className);
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
          el = elements[_j];
          if (el.btcValue != null) {
            _results1.push(el.innerHTML = "" + symbol + (round(rate * el.btcValue)));
          } else if (el.btcValue === void 0 && (match = el.innerHTML.match(/฿([\d\.]+)/))) {
            el.btcValue = parseFloat(match[1]);
            _results1.push(el.innerHTML = "" + symbol + (round(rate * el.btcValue)));
          } else {
            _results1.push(el.btcValue = null);
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  pullPrices(function() {
    var currency, currencySelect, customRate, k, option, select, settingsBar, style, v;
    settingsBar = document.createElement('div');
    settingsBar.innerHTML = '<label>Display prices in:</label><br />';
    document.body.appendChild(settingsBar);
    style = {
      width: '200px',
      height: '50px',
      background: 'white',
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      'zIndex': 1000
    };
    for (k in style) {
      v = style[k];
      settingsBar.style[k] = v;
    }
    customRate = null;
    currencySelect = document.createElement('select');
    style = {
      width: '75px',
      height: ' 20px'
    };
    for (k in style) {
      v = style[k];
      currencySelect.style[k] = v;
    }
    for (currency in currencies) {
      option = document.createElement('option');
      option.innerHTML = "" + currency + " (" + currencies[currency] + ")";
      option.name = option.value = currency;
      if (settings.currency === currency) {
        option.selected = 'selected';
      }
      currencySelect.appendChild(option);
    }
    settingsBar.appendChild(currencySelect);
    select = function(currency) {
      var _i, _len, _ref;
      _ref = currencySelect.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.selected = option.value === currency;
      }
      settings.currency = currency;
      if (currency !== 'custom') {
        customRate.value = "" + currencies[currency] + prices[currency][defaults.window];
      } else {
        customRate.value = "" + settings.custom.symbol + settings.custom.rate;
      }
      pushSettings();
      return redraw();
    };
    currencySelect.onchange = function() {
      return select(this.value);
    };
    customRate = document.createElement('input');
    customRate.type = 'text';
    style = {
      width: '75px',
      height: '20px',
      display: 'inline'
    };
    for (k in style) {
      v = style[k];
      customRate.style[k] = v;
    }
    settingsBar.appendChild(customRate);
    customRate.onchange = function() {
      var match;
      match = this.value.match(/([^\d]*)([\d\.]+)/);
      settings.custom = {
        symbol: match[1],
        rate: parseFloat(match[2])
      };
      return select('custom');
    };
    select(settings.currency);
    return redraw();
  });

  weightInGrams = {
    'g': 1,
    'mg': 0.001,
    'ug': 0.000001,
    'oz': 28.3495,
    'lb': 453.592
  };

  parseWeight = function(text, price) {
    var count, factor, html, unit, weight, weights, _ref;
    weights = text.match(/(([\d]+) ?x|count|pills)?[^\d\.]*([\d\.]+) ?(g|gr|gram|grams|ug|µg|mg|lb|oz)([^\w]|$)/i);
    count = 1;
    html = '&nbsp;';
    if (weights) {
      if (weights[2]) {
        count = parseInt(weights[2]);
      }
      if (weights[4]) {
        if ((_ref = (unit = weights[4].toLowerCase())) === 'g' || _ref === 'gr' || _ref === 'gram' || _ref === 'grams') {
          unit = 'g';
        }
        factor = weightInGrams[unit];
        weight = count * parseFloat(weights[3]) * factor;
        if (!isNaN(weight)) {
          html = "(<span class='price'>฿" + (round(price / weight)) + "</span> per gram)";
        }
      } else if (count) {
        html = "(<span class='price'>฿" + (round(count / weight)) + "</span> each)";
      }
    }
    return html;
  };

  if (item = document.getElementById('cat_item')) {
    elements = item.parentNode.childNodes;
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (element.id === 'cat_item') {
        _ref = element.childNodes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          el = _ref[_j];
          if (el.id === 'cat_item_description') {
            desc = el;
          } else if (el.id === 'cat_item_buy') {
            buy = el;
          }
        }
        text = desc.getElementsByClassName('h2')[0].innerHTML;
        price = parseFloat((_ref1 = buy.getElementsByClassName('price_big')[0].innerHTML.match(/฿([\d\.]+)/)) != null ? _ref1[1] : void 0);
        html = parseWeight(text, price);
        el = document.createElement('div');
        el.innerHTML = html;
        buy.insertBefore(el, buy.childNodes[1]);
      }
    }
  } else {
    elements = document.getElementsByClassName('featured_item');
    for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
      element = elements[_k];
      text = element.getElementsByClassName('featured_text')[0].innerHTML;
      price = parseFloat((_ref2 = element.getElementsByClassName('price_small')[0].innerHTML.match(/฿([\d\.]+)/)) != null ? _ref2[1] : void 0);
      html = parseWeight(text, price);
      el = document.createElement('div');
      el.innerHTML = html;
      element.appendChild(el);
    }
  }

}).call(this);
