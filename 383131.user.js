// ==UserScript==
// @name Allegro - Średnia cena oglądanych aukcji
// @namespace http://github.com/zaza
// @include http://allegro.pl/*
// @version 0.5
// @grant none
// ==/UserScript==

Math.avg = function(data, round) {
    var sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += data[i]
    }
    var avg = sum/data.length
    return Number((avg).toFixed(round))
};

Math.parseFloat2 = function(string) {
    string = string.replace(/\s+/g, '')
    string = string.replace(/,/g, '.')
    return parseFloat(string)
};

function Scraper(doc) {
    this.doc = doc
}

Scraper.prototype.shouldRun = function() {
  return this.doc.getElementById('main-breadcrumb-search-hits') != null
    && (this.doc.getElementsByClassName('bid dist').length > 0
        || this.doc.getElementsByClassName('buy-now dist').length > 0)
};

Scraper.prototype.collectPrices = function () {
  return this.collectPricesForClass('bid dist').concat(this.collectPricesForClass('buy-now dist'))
}

Scraper.prototype.collectPricesForClass = function (className) {
  var prices = []
    var spans = this.doc.getElementsByClassName(className)
    if (spans.length == 0) return []
    for (var i = 0; i < spans.length; i++) {
        var price = spans[i].childNodes[2].nodeValue
        prices.push(Math.parseFloat2(price))
    }
    return prices
}

Scraper.prototype.updateSearchHits = function(avg) {
    var hits = this.doc.getElementById('main-breadcrumb-search-hits')
    var regex = /(\(\d+ oferty?)(, średnia=[\d\.]+)?(\))/
    if (hits != null) {
        var str = hits.innerHTML
        if (str.match(regex)) {
            str = str.replace(regex, "$1, średnia=" + avg + "$3")
            hits.innerHTML = str
        }
    }
};

(function() {
    var scraper = new Scraper(document)
    if (!scraper.shouldRun())
        return
    var prices = scraper.collectPrices()
    var avg = Math.avg(prices, 2)
    scraper.updateSearchHits(avg)
})();