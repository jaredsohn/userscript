// ==UserScript==
// @name    	safeway-justforu
// @namespace	safeway-justforu
// @description	safeway, vons, dominicks, genuardis, pavilions, randalls, tomthumb J4U coupons automatically added to your card.
// @include		http://www.safeway.com/ShopStores/Justforu*
// @include     http://www.vons.com/ShopStores/Justforu*
// @include     http://www.dominicks.com/ShopStores/Justforu*
// @include     http://www.genuardis.com/ShopStores/Justforu*
// @include     http://www.pavilions.com/ShopStores/Justforu*
// @include     http://www.randalls.com/ShopStores/Justforu*
// @include     http://www.tomthumb.com/ShopStores/Justforu*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// ==/UserScript==

function OfferProcessor(url, callback) {
    var _url = url;
    var _offersAdded = 0;
    var _callback = callback;
    var _clippingUrl = "/Clipping1/services/clip/offers";

    return {
        processOffers: function (data) {
            var offers = data.offers;
            var count = 0;
            for (var i = 0; i < offers.length; i++) {
                var offer = offers[i];
                if (offer.clipStatus === "U") {
                    count++;
                    var clips = [];
                    var clip = {};
                    clip.offerId = offer.offerId;
                    clip.offerPgm = offer.offerPgm;
                    clips.push(clip);
                    var postRequest = {};
                    postRequest.clips = clips;
                    var jsonStr = JSON.stringify(postRequest);
                    $.ajax({
                        type: 'POST',
                        url: _clippingUrl,
                        contentType: 'application/json',
                        data: jsonStr,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('SWY_API_KEY', 'emjou');
				xhr.setRequestHeader('SWY_BANNER', 'safeway');
				xhr.setRequestHeader('SWY_VERSION', '1.0');
				xhr.setRequestHeader('X-SWY_API_KEY', 'emjou');
				xhr.setRequestHeader('X-SWY_BANNER', 'safeway');
				xhr.setRequestHeader('X-SWY_VERSION', '1.0');
			}
                    });
                }
            }
            _offersAdded = count;
            _callback();
        },

        process: function () {
            var scope = this;
            $.ajax(_url).done(function (data) {
                scope.processOffers(data);
            });
        },

        getOffersAdded: function () {
            return _offersAdded;
        }
    }
}

function Counter(maxCnt) {

    var _maxCount = maxCnt;
    var _callback = "";
    var _count = 0;
    return {
        incrementCount: function () {
            _count++;
            if (_count == _maxCount)
                _callback();
        },

        setCallback: function (cb) {
            _callback = cb;
        }

    }
}


$(document).ready(function () {
    var counter = Counter(3);
    var ccOfferProcessor = OfferProcessor("/J4UProgram1/services/program/CC/offer/allocations", counter.incrementCount);
    var pdOfferProcessor = OfferProcessor("/J4UProgram1/services/program/PD/offer/allocations", counter.incrementCount);
    var ycsOfferProcessor = OfferProcessor("/J4UProgram1/services/program/YCS/offer/allocations", counter.incrementCount);

    var printData = function () {
        var ccCount = ccOfferProcessor.getOffersAdded();
        var pdCount = pdOfferProcessor.getOffersAdded();
        if (ccCount + pdCount > 0) {
            alert("J4U - Added " + ccCount + " 'Coupon Center' coupons and \n " + pdCount + " 'Personalized Deals' Coupons. \n Please reload the page.");
        }
    }

    counter.setCallback(printData);
    ccOfferProcessor.process();
    pdOfferProcessor.process();
    ycsOfferProcessor.process();

});