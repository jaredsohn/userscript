// ==UserScript==
// @name       Car Scores
// @namespace  http://variant.ch
// @version    1.9
// @description  Calculate Car Scores
// @require    http://userscripts.org/scripts/source/49700.user.js
// @match      https://*.mobile.de/*
// @match      http://*.mobile.de/*
// @match      https://*.autoscout24.de/*
// @match      http://*.autoscout24.de/*
// @match      https://*.autoscout24.ch/*
// @match      http://*.autoscout24.ch/*
// @match      http://*.eric4c.com/*
// @copyright  2013 Nicola Fankhauser
// ==/UserScript==

function addCSSRule(rule) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = rule;
    document.getElementsByTagName('head')[0].appendChild(style);
}

function getElementByClassName(tagName, className) {
    var elems = document.getElementsByTagName(tagName),
        i, retElems = [];
    for (i in elems) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
            retElems.push(elems[i]);
        }
    }
    return retElems;
}

// inputValue is a value between 0 and 511; 
// 0 = red, 255 = yellow, 511 = green.
function makeColor(inputValue) {
    var value = inputValue,
        redValue, greenValue;
    
    if (value < 1) {
        value = 1;
    }
    if (value > 502) {
        value = 502;
    }
    
    if (value < 255) {
        redValue = 255;
        greenValue = Math.sqrt(value) * 16;
        greenValue = Math.round(greenValue);
        greenValue = Math.min(greenValue, 255);
    } else {
        greenValue = 255;
        value = value - 255;
        redValue = 256 - (value * value / 255);
        redValue = Math.round(redValue);
        redValue = Math.min(redValue, 255);
    }
    var col = "#" + redValue.toString(16) + greenValue.toString(16) + "00";
    return col;
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.'),
        x1 = x[0],
        x2 = x.length > 1 ? '.' + x[1] : '',
            rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + "'" + '$2');
    }
    return x1 + x2;
}

function cleanPrice(price) {
    var p = price.replace(/€/, '').replace(/CHF/, '').replace(/\./, '').replace(/,/, '.').replace(/-/, '').replace(/'/, '');
    return parseInt(p, 10);
}

function calculatePrice(price, inCHF) {
    var vatOrigin = (GM_config.get('vatOrigin') / 100) + 1;
    var vatDest = (GM_config.get('vatDestination') / 100);
    var duties = (GM_config.get('importTaxDuties') / 100);
    var exchRate = GM_config.get('exchangeRate')*1;
    if(GM_config.get('priceCalcActive')){
        return GM_config.get('currencySymbol') +" "+ addCommas(parseInt(inCHF ? price : (price / vatOrigin * (vatDest + duties + 1) * exchRate), 10));
    }
    else {
        return "" + addCommas(parseInt(price, 10));
    }
}

function cleanMileage(mileage) {
    var m = mileage.replace(/km/, '').replace(/\./, '').replace(/'/, '');
    return parseInt(m, 10);
}

function cleanEZ(ez, ezSeparator) {
    var sep = ezSeparator || '.';
    var e = ez.replace(/EZ/, '').split(sep),
        month = e[0],
        year = e[1];
    e = (new Date().getTime() - new Date(year, month - 1).getTime()) / 2629743;
    return e;
}

function cleanPower(power) {
    try{
        var p = power.match(/([0-9]+)\sPS/)[1];
        return Math.round(parseInt(p, 10));
    }
    catch(e){
        var p = power.replace(/kW/,'');
        return Math.round(parseInt(p, 10)*1.359622);       
    }
}

function cleanLeather(leather) {
    if (leather.match(new RegExp(GM_config.get('fullLeatherText'),'i'))) {
        return GM_config.get('fullLeatherFactor')*1;
    } else if (leather.match(new RegExp(GM_config.get('semiLeatherText'),'i'))) {
        return GM_config.get('semiLeatherFactor')*1;
    } else if (leather.match(new RegExp(GM_config.get('nonLeatherText'),'i'))) {
        return GM_config.get('nonLeatherFactor')*1;
    }
    return 1;
}

function cleanConsumption(consumption) {
    var c = consumption.split('/')[0].replace(',', '.');
    c = parseFloat(consumption);
    return c;
}

function calculateScores(price, mileage, ez, power, leather, consumption, inCHF, priceEl) {
    var leather = leather || 1;
    var consumption = consumption || power / 20;
    var priceToMiles = (1 / price + 1 / mileage) * 10000 ;
    var powerToConsumption = power / (consumption * 20) * 0.2;
    
    

    var score = Math.round(80 * leather * (powerToConsumption + priceToMiles));
   	var optimalScore = GM_config.get('optimalScore');
    
    var optimalPrice;
    if(score < optimalScore){
    	optimalPrice = 10000 / (optimalScore/80/leather - powerToConsumption - 10000/mileage);
    }
    else {
        optimalPrice = price;
    }
        
    var color = makeColor((score - 55) * 8.5);
    var ret = {
        price: price,
        priceEl: priceEl,
        chf: calculatePrice(price, inCHF),
        mileage: mileage,
        ez: ez,
        leather: leather,
        consumption: consumption,
        power: power,
        score: score,
        optimalPrice: optimalPrice,
        optimalPricePercentage: Math.round((1-1/price*optimalPrice)*-100)+"%",
        scores: "Score: " + score + "\n$/km: " + Math.round(100 * priceToMiles) + "\npw/c: " + Math.round(100 * powerToConsumption),
        priceToMiles: Math.round(100 * priceToMiles),
        powerToConsumption: Math.round(100 * powerToConsumption),
        color: color
    };
    return ret;
}

function markString(h, st, reverse) {
    var s = st.replace(/^\s+|\s+$/g,'');
    var r = false || reverse,
        a;
    var green = '#99FF99',
        red = '#FF9999',
        cond = new RegExp(s, 'gi'),
        condExisting = new RegExp(s+'\\?', 'gi');
    
    if (r) {
        a = [red, green];
        red = a[1];
        green = a[0];
    }
    if (h.match(condExisting)){
    	throw 'done';
    }
    if (h.match(cond)) {
        h = h.replace(cond, "<b style='background-color:" + green + "'>" + s + "</b>");
    } else if (!r) {
        h = "<b style='background-color:" + red + "'>" + s + "?</b> " + h;
    }
    return h;
}

function markText(h) {
    var wanted = GM_config.get('equipmentWanted').split(',');
    for(var i = 0; i < wanted.length; i++){
        h = markString(h, wanted[i]);   
    }
    
    var unwanted = GM_config.get('equipmentUnwanted').split(',');
    for(var i = 0; i < unwanted.length; i++){
        h = markString(h, unwanted[i], true);   
    }
    
    return h;
}

var engines = [];
function prepareEngines(){
    var enginesConfig = GM_config.get('engines').split("\n");
    for(var i = 0; i < enginesConfig.length; i++){
        var e = enginesConfig[i];
        var m = e.split(':')[0];
        var c = e.split(':')[1].split('/')[0];
        var p = e.split(':')[1].split('/')[1];
        engines.push({m: m, c: c, p: p});
    }   
}

function getConsumptionFromCarModel(carModel) {
    for(var i = 0; i < engines.length; i++){
        var e = engines[i];
        var r  = new RegExp(e.m.replace(/\s/g,'\\s*'));
        if(carModel.match(r,'gi')){
            return e.c;
        }
    }
}

function getPowerFromTitle(title) {
    for(var i = 0; i < engines.length; i++){
        var e = engines[i];
        var r  = new RegExp(e.m.replace(/\s/g,'\\s*'));
        if(title.match(r,'gi')){
            return e.p;
        }
    }
}

var MobileDE = {
    ezSeparator: '/',
    details: function () {
        debugger;
        var carModel = document.getElementsByClassName("titleContainer")[0].innerText;
        
        var techDetails = document.getElementsByClassName("mainTechnicalData")[0].innerText;
        var mileage = techDetails.match(/([0-9\.]+)\skm/)[0];
        mileage = cleanMileage(mileage);
        
        var power = techDetails.match(/([0-9]+)\sPS/)[1];
        power = parseInt(power, 10);
        
        var ez = techDetails.match(/EZ\s([0-9\/]+)/)[0];
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        
        var leather = 1;
        try {
            leather = document.getElementsByClassName('technicalDetailsColumn')[0].innerText;
            leather = cleanLeather(leather);
        } catch (e) {}
        
        var consumption = getConsumptionFromCarModel(carModel);
        
        var price = document.getElementsByClassName('pricePrimaryCountryOfSale')[0].innerText;
        price = cleanPrice(price);
        
        var scores = calculateScores(price, mileage, ez, power, leather, consumption, false);
        
        var priceEl = document.getElementsByClassName('pricePrimaryCountryOfSale')[0];
        priceEl.innerText = scores.scores + "\n" + calculatePrice(price);
        priceEl.style.backgroundColor = scores.color;
        
        var textEl = document.getElementsByClassName('vehicleFeatures')[0];
        if (!textEl) {
            return;
        }
        var h = textEl.innerText;
        
        var eqEl = getElementByClassName('div', 'ad-description')[0];
        h += eqEl.innerText;
        eqEl.innerHTML = '';
        h = markText(h);
        h = h.replace(/,/g, '<br>');
        textEl.innerHTML = h;
    },
    
    getInfoForCar: function (elItemHeader, carModel) {
        debugger;
        var pEl = elItemHeader.getElementsByClassName('parkRightBlock')[0];
        var price = pEl.getElementsByClassName('price')[0].innerText,
            mileage = elItemHeader.getElementsByClassName('kilometer')[0].innerText,
            ez = elItemHeader.getElementsByClassName('registrationDate')[0].innerText,
            power = elItemHeader.getElementsByClassName('description')[0].innerText;
        var leather = cleanLeather(power);
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        power = cleanPower(power);
        var consumption = getConsumptionFromCarModel(carModel);
        return calculateScores(price, mileage, ez, power, leather, consumption, false);
    },
    
    parkdeck: function () {
        debugger;
        var imgs = getElementByClassName('div', 'oneAdInListWrapper');
        for (var i = 0; i < imgs.length; i++) {
            
            try {
                var topLineEl = imgs[i].getElementsByClassName('topLine')[0];
                var hEl = topLineEl.getElementsByClassName('description')[0];
                var h = hEl.innerText;
                
                var info = MobileDE.getInfoForCar(imgs[i], h);
                
                h = markText(h);
                hEl.innerHTML = h;
                var pEl = imgs[i].getElementsByClassName('parkRightBlock')[0];
                var priceEl = pEl.getElementsByClassName('price')[0];
                priceEl.innerText = info.chf + "\n" + info.power + " PS\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    getInfoForSearchResultCar: function (elItemHeader) {
        debugger;
        try {
            var power;
            var carModel;
            
            var titleEl = elItemHeader.getElementsByClassName('listEntryTitle')[0];
            if (!titleEl) {
                titleEl = elItemHeader.getElementsByClassName('topOfPageTitle')[0];
            }
            
            var title = titleEl.innerText;
            var descriptionEl = elItemHeader.getElementsByClassName('description')[0];
            var description;
            if (descriptionEl) {
                description = descriptionEl.innerText;
            }
            else {
                debugger;
                description = elItemHeader.getElementsByClassName('col2')[0].innerText;
            }
            
            var price = elItemHeader.getElementsByClassName('priceGross')[0].innerText;
            var mileageEl = elItemHeader.getElementsByClassName('mileage')[0];
            if (!mileageEl) {
                mileageEl = elItemHeader.getElementsByClassName('column2')[0];
            }
            
            var mileage = mileageEl.innerText;
            var ez;
            var ezEl = elItemHeader.getElementsByClassName('firstRegistration')[0];
            if (!ezEl) {
                ezEl = elItemHeader.getElementsByClassName('column1')[0];
            }
            
            ez = ezEl.innerText;
            
            power = cleanPower(description);
            if (!power) {
                power = getPowerFromTitle(title);
            }
            
            price = cleanPrice(price);
            mileage = cleanMileage(mileage);
            ez = cleanEZ(ez, MobileDE.ezSeparator);
            var consumption = getConsumptionFromCarModel(title);
            var leather = null;
            return calculateScores(price, mileage, ez, power, leather, consumption, false);
        } catch (e) {}
    },
    
    searchResult: function () {
        debugger;
        var items = getElementByClassName('div', 'listEntry');
        for (var i = 0; i < items.length; i++) {
            try {
                var info = MobileDE.getInfoForSearchResultCar(items[i]);
                
                if (GM_config.get('hideLowScoreResults') && info.score < GM_config.get('hideBelowScore')) {
                    items[i].style.opacity = (GM_config.get('hideOpacity') / 100);
                }
                
                var priceEl = items[i].getElementsByClassName('priceGross')[0];
                priceEl.innerText = info.chf + " " + info.power + " PS Score: " + info.score;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {
                debugger;
            }
        }
    },
    
    initialize: function () {
        if (document.location.href.match(/\/auto\//) || document.location.href.match(/\/fahrzeuge\//)) {
            MobileDE.searchResult();
        }
        if (document.location.href.match(/\/home\/parking\//)) {
            MobileDE.parkdeck();
        }
        if (document.location.href.match(/\/auto-inserat\//)) {
            MobileDE.details();
        }
    }
    
};

var AutoScout24CH = {
    equipmentMarked: false,
    markEquipment: function () {
        if (AutoScout24CH.equipmentMarked) {
            return;
        }
        var eqEl = document.getElementById('equipmentBoxUngrouped');
        if (!eqEl) {
            return;
        }
        var h = markText(eqEl.innerText);
        h = h.replace(/,/g, '<br>');
        eqEl.innerHTML = h;
        AutoScout24CH.equipmentMarked = true;
    },
    
    details: function () {
        debugger;
        var carModel = "";
        try {
            carModel = document.getElementsByClassName("title-car")[0].innerText;
        }
        catch(e){
            carModel = document.getElementsByClassName("title-main")[0].innerText;   
        }
        
        var attrs = {};
        var signs = getElementByClassName('li','sign');
        var meats = getElementByClassName('li','meat');
        
        for(var i = 0; i < signs.length; i++){
            var name = signs[i].innerText;
            var value = meats[i].innerText;
            if(signs[i].className.match(/swap/)){
                attrs[value] = name; 
            }
            else {
                attrs[name] = value;
            }
        }
        
        var comments = '';
        try {
            comments = getElementByClassName('div', 'comments')[0].innerText;
        } catch (e) {}
        
        var mileage = attrs['Kilometer'];
        mileage = cleanMileage(mileage);
        
        var power = attrs['Leistung in PS'];
        power = parseInt(power, 10);
        var ez = attrs['Inverkehrssetzung'];
        ez = cleanEZ(ez);
        
        var eqEl = getElementByClassName('ul', 'equipment-list')[0];
        
        var leather = cleanLeather(comments + " " + eqEl.innerText);
        
        var consumption;
        try {
        	consumption = parseFloat(attrs['Verbrauch in l/100 km'].split('/')[2]);
        }
        catch(e){
            consumption = getConsumptionFromCarModel(carModel);
        }
        
        
        var price = attrs['Preis'];
        
        price = cleanPrice(price);
        
        var scores = calculateScores(price, mileage, ez, power, leather, consumption, true);
        
        var priceEl = document.getElementsByClassName('price-tag')[0];
        priceEl.innerText = scores.scores + "\n" + calculatePrice(price, true) + "\n"+calculatePrice(scores.optimalPrice, true)+" fair "+scores.optimalPricePercentage;
        priceEl.style.backgroundColor = scores.color;
        
        var h = markText(comments + " " + eqEl.innerText);
        h = h.replace(/,/g, '<br>');
        eqEl.innerHTML = h;
        try {
            getElementByClassName('div', 'comments')[0].innerHTML = '';
        }
        catch(e){}
        setInterval(AutoScout24CH.markEquipment, 2000);
    },
    
    getInfoForCar: function (elItemHeader, carModel) {
        debugger;
        var pEl = elItemHeader.getElementsByClassName('props')[0];
        if (!pEl) { // Search Result
            pEl = elItemHeader.getElementsByClassName('car-props')[0];
        }
        
        var price = pEl.getElementsByClassName('prop-price')[0].innerText,
            mileage = elItemHeader.getElementsByClassName('prop-milage')[0].innerText,
            ez = elItemHeader.getElementsByClassName('prop-date')[0].innerText,
            power = elItemHeader.getElementsByClassName('description')[0].innerText;
        var leather = cleanLeather(power);
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez);
        power = cleanPower(power);
        var consumption = getConsumptionFromCarModel(carModel);
        return calculateScores(price, mileage, ez, power, leather, consumption, true);
    },
    
    parkdeck: function () {
        debugger;
        var imgs = getElementByClassName('li', 'car');
        for (var i = 0; i < imgs.length; i++) {
            
            try {
                var titleEl = imgs[i].getElementsByClassName('car-title')[0];
                var hEl = imgs[i].getElementsByClassName('description')[0];
                var h = titleEl.innerText + " " + hEl.innerText;
                
                var info = AutoScout24CH.getInfoForCar(imgs[i], h);
                
                var priceEl = imgs[i].getElementsByClassName('prop-price')[0];
                priceEl.innerText = info.chf + "\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    searchResult: function () {
        debugger;
        document.getElementsByClassName('top-offers')[0].style.visibility = 'hidden';
        
        var imgs = getElementByClassName('li', 'car');
        for (var i = 0; i < imgs.length; i++) {
            
            try {
                var titleEl = imgs[i].getElementsByClassName('car-name')[0];
                var hEl = imgs[i].getElementsByClassName('description')[0];
                var h = titleEl.innerText + " " + hEl.innerText;
                
                var info = AutoScout24CH.getInfoForCar(imgs[i], h);
                
                if (GM_config.get('hideLowScoreResults') && info.score < GM_config.get('hideBelowScore')) {
                    imgs[i].style.opacity = (GM_config.get('hideOpacity') / 100);
                }
                
                var priceEl = imgs[i].getElementsByClassName('prop-price')[0];
                priceEl.innerText = info.chf + "\n" + info.power + " PS\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    initialize: function () {
        debugger;
        if (document.location.href.match(/\/autos\//)) {
            AutoScout24CH.searchResult();
        }
        if (document.location.href.match(/\/WatchList/)) {
            AutoScout24CH.parkdeck();
        }
        if (document.location.href.match(/\/d\//)) {
            AutoScout24CH.details();
        }
    }
};

var AutoScout24DE = {
    ezSeparator: '/',
    getInfoForCar: function(elItemHeader, carModel){
        debugger;
        var price = elItemHeader.getElementsByClassName('listItemHeaderPrice')[0].innerText,
            mileage = elItemHeader.getElementsByClassName('listItemHeaderMileage')[0].innerText,
            ez = elItemHeader.getElementsByClassName('listItemHeaderEZ')[0].innerText,
            power = elItemHeader.getElementsByClassName('listItemHeaderPower')[0].innerText;
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        power = cleanPower(power);
        var leather = null;
        var consumption = getConsumptionFromCarModel(carModel);
        return calculateScores(price, mileage, ez, power, leather, consumption, false);
    },
    
    
    details: function () {
        debugger;
        var carModel = document.getElementById("ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_Panel1").innerText;
        
        var mileage = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData1_mileageRow').innerText;
        mileage = mileage.split(':')[1];
        mileage = cleanMileage(mileage);
        
        var power = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData1_powerRow').innerText;
        power = power.split(':')[1].split('(')[0];
        power = cleanPower(power);
        
        var ez = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData1_firstRegRow').innerText;
        ez = ez.split(':')[1];
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        
        var leather = 1;
        try {
            leather = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData1_interiorDecorationRow').innerText;
            leather = leather.split(':')[1];
            leather = cleanLeather(leather);
        } catch (e) {}
        
        var consumption = getConsumptionFromCarModel(carModel);
        
        var priceEl = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData1_pricePublicRow');
        var price = priceEl.innerText.split(':')[1];
        price = cleanPrice(price);
        
        var scores = calculateScores(price, mileage, ez, power, leather, consumption, false);
        
        priceEl = priceEl.getElementsByClassName('large-font')[0];
        priceEl.innerText = scores.scores + "\n" + calculatePrice(price);
        priceEl.style.backgroundColor = scores.color;
        
        var textEl = document.getElementById('ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleDescription_creoleSupportedDescription');
        if (!textEl) {
            return;
        }
        var h = textEl.innerText;
        
        var eqEl = getElementByClassName('div', 'equipment-list')[0];
        h += eqEl.innerText;
        eqEl.innerHTML = '';
        h = markText(h);
        h = h.replace(/,/g, '<br>');
        textEl.innerHTML = h;
    },
    
    parkdeck: function () {
        debugger;
        var imgs = getElementByClassName('div', 'listItemHeader');
        for (var i = 0; i < imgs.length; i++) {
            try {
                var hEl = imgs[i].parentNode.getElementsByClassName('fontLoud')[0];
                var h = hEl.innerText;
                
                var info = AutoScout24DE.getInfoForCar(imgs[i], h);
                
                h = markText(h);
                hEl.innerHTML = h;
                
                imgs[i].getElementsByClassName('listItemHeaderPrice')[0].innerText = info.chf;
                imgs[i].getElementsByClassName('listItemHeaderPower')[0].innerText = info.power + " PS " + info.scores;
                imgs[i].getElementsByClassName('listItemHeaderPower')[0].style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    getInfoForSearchResultCar: function (elItemHeader) {
        debugger;
        var price = elItemHeader.getElementsByClassName('listItemHeaderPrice')[0].innerText;
        var mileage = elItemHeader.getElementsByClassName('listItemHeaderMileage')[0].innerText;
        var ez = elItemHeader.getElementsByClassName('listItemHeaderEZ')[0].innerText;
        var power = elItemHeader.getElementsByClassName('listItemHeaderPower')[0].innerText;
        var carModel = elItemHeader.getElementsByClassName('truncHeadline')[0].innerText;
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        power = cleanPower(power);
        var consumption = getConsumptionFromCarModel(carModel);
        var leather = null;
        return calculateScores(price, mileage, ez, power, leather, consumption, false);
    },
    
    searchResult: function () {
        debugger;
        
        /*
         try {
            getElementByClassName('div', 'search-top-articles')[0].style.visibility = 'hidden';
        } catch (e) {}
        
        try {
            getElementByClassName('div', 'footer-container')[0].style.visibility = 'hidden';
        } catch (e) {}
        
        addCSSRule('div.list-item-d { background-color: white; }');
        addCSSRule('.list-item-d .info-texts-gn { background-color: white; }');
        addCSSRule('div.list-item-d div.lit-kw { background-image: url(); }');
        
        document.getElementById('ctl00_ctl00_decoratedArea_contentArea_ServiceBox_boxStart').style.visibility = 'hidden';
        */
        var items = getElementByClassName('div', 'listItem');
        //var itemsD = getElementByClassName('div', 'list-item-d');
        //items = items.concat(itemsD);
        for (var i = 0; i < items.length; i++) {
            
            if(items[i].getElementsByClassName('listItemHeaderPower')[0].innerText.match(/Score/)){
                continue;
            }
            
            var info = AutoScout24DE.getInfoForSearchResultCar(items[i]);
            
            if (GM_config.get('hideLowScoreResults') && info.score < GM_config.get('hideBelowScore')) {
                items[i].style.opacity = (GM_config.get('hideOpacity') / 100);
            }
            
            try {
            	var hEl = items[i].getElementsByClassName('truncHeadline')[0];
            	var h = hEl.innerText;
            	h = markText(h);
            	hEl.innerHTML = h;
            }
            catch(e){}
            
            items[i].getElementsByClassName('listItemHeaderPrice')[0].innerText = info.chf;
            items[i].getElementsByClassName('listItemHeaderPower')[0].innerText = info.power + " PS Score: " + info.score;
            items[i].getElementsByClassName('listItemHeaderPower')[0].style.backgroundColor = info.color;
            /*
              try {
                items[i].getElementsByClassName('dlogo')[0].style.visibility = 'hidden';
            } catch (f) {}
            */
        }
    },
    
    initialize: function () {
        if (document.location.href.match(/\atype/)) {
            setInterval(AutoScout24DE.searchResult, 1000);
        }
        if (document.location.href.match(/\/parkdeck/)) {
            AutoScout24DE.parkdeck();
        }
        if (document.location.href.match(/\/Details/)) {
            AutoScout24DE.details();
        }
    }
};

var MobileDE = {
    ezSeparator: '/',
    details: function () {
        debugger;
        var carModel = document.getElementsByClassName("titleContainer")[0].innerText;
        
        var techDetails = document.getElementsByClassName("mainTechnicalData")[0].innerText;
        var mileage = techDetails.match(/([0-9\.]+)\skm/)[0];
        mileage = cleanMileage(mileage);
        
        var power = techDetails.match(/([0-9]+)\sPS/)[1];
        power = parseInt(power, 10);
        
        var ez = techDetails.match(/EZ\s([0-9\/]+)/)[0];
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        
        var leather = 1;
        try {
            leather = document.getElementsByClassName('technicalDetailsColumn')[0].innerText;
            leather = cleanLeather(leather);
        } catch (e) {}
        
        var consumption = getConsumptionFromCarModel(carModel);
        
        var price = document.getElementsByClassName('pricePrimaryCountryOfSale')[0].innerText;
        price = cleanPrice(price);
        
        var scores = calculateScores(price, mileage, ez, power, leather, consumption, false);
        
        var priceEl = document.getElementsByClassName('pricePrimaryCountryOfSale')[0];
        priceEl.innerText = scores.scores + "\n" + calculatePrice(price);
        priceEl.style.backgroundColor = scores.color;
        
        var textEl = document.getElementsByClassName('vehicleFeatures')[0];
        if (!textEl) {
            return;
        }
        var h = textEl.innerText;
        
        var eqEl = getElementByClassName('div', 'ad-description')[0];
        h += eqEl.innerText;
        eqEl.innerHTML = '';
        h = markText(h);
        h = h.replace(/,/g, '<br>');
        textEl.innerHTML = h;
    },
    
    getInfoForCar: function (elItemHeader, carModel) {
        debugger;
        var pEl = elItemHeader.getElementsByClassName('parkRightBlock')[0];
        var price = pEl.getElementsByClassName('price')[0].innerText,
            mileage = elItemHeader.getElementsByClassName('kilometer')[0].innerText,
            ez = elItemHeader.getElementsByClassName('registrationDate')[0].innerText,
            power = elItemHeader.getElementsByClassName('description')[0].innerText;
        var leather = cleanLeather(power);
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez, MobileDE.ezSeparator);
        power = cleanPower(power);
        var consumption = getConsumptionFromCarModel(carModel);
        return calculateScores(price, mileage, ez, power, leather, consumption, false);
    },
    
    parkdeck: function () {
        debugger;
        var imgs = getElementByClassName('div', 'oneAdInListWrapper');
        for (var i = 0; i < imgs.length; i++) {
            
            try {
                var topLineEl = imgs[i].getElementsByClassName('topLine')[0];
                var hEl = topLineEl.getElementsByClassName('description')[0];
                var h = hEl.innerText;
                
                var info = MobileDE.getInfoForCar(imgs[i], h);
                
                h = markText(h);
                hEl.innerHTML = h;
                var pEl = imgs[i].getElementsByClassName('parkRightBlock')[0];
                var priceEl = pEl.getElementsByClassName('price')[0];
                priceEl.innerText = info.chf + "\n" + info.power + " PS\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    getInfoForSearchResultCar: function (elItemHeader) {
        debugger;
        try {
            var power;
            var carModel;
            
            var titleEl = elItemHeader.getElementsByClassName('listEntryTitle')[0];
            if (!titleEl) {
                titleEl = elItemHeader.getElementsByClassName('topOfPageTitle')[0];
            }
            
            var title = titleEl.innerText;
            var descriptionEl = elItemHeader.getElementsByClassName('description')[0];
            var description;
            if (descriptionEl) {
                description = descriptionEl.innerText;
            }
            else {
                debugger;
                description = elItemHeader.getElementsByClassName('col2')[0].innerText;
            }
            
            var price = elItemHeader.getElementsByClassName('priceGross')[0].innerText;
            var mileageEl = elItemHeader.getElementsByClassName('mileage')[0];
            if (!mileageEl) {
                mileageEl = elItemHeader.getElementsByClassName('column2')[0];
            }
            
            var mileage = mileageEl.innerText;
            var ez;
            var ezEl = elItemHeader.getElementsByClassName('firstRegistration')[0];
            if (!ezEl) {
                ezEl = elItemHeader.getElementsByClassName('column1')[0];
            }
            
            ez = ezEl.innerText;
            
            power = cleanPower(description);
            if (!power) {
                power = getPowerFromTitle(title);
            }
            
            price = cleanPrice(price);
            mileage = cleanMileage(mileage);
            ez = cleanEZ(ez, MobileDE.ezSeparator);
            var consumption = getConsumptionFromCarModel(title);
            var leather = null;
            return calculateScores(price, mileage, ez, power, leather, consumption, false);
        } catch (e) {}
    },
    
    searchResult: function () {
        debugger;
        var items = getElementByClassName('div', 'listEntry');
        for (var i = 0; i < items.length; i++) {
            try {
                var info = MobileDE.getInfoForSearchResultCar(items[i]);
                
                if (GM_config.get('hideLowScoreResults') && info.score < GM_config.get('hideBelowScore')) {
                    items[i].style.opacity = (GM_config.get('hideOpacity') / 100);
                }
                
                var priceEl = items[i].getElementsByClassName('priceGross')[0];
                priceEl.innerText = info.chf + " " + info.power + " PS Score: " + info.score;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {
                debugger;
            }
        }
    },
    
    initialize: function () {
        if (document.location.href.match(/\/auto\//) || document.location.href.match(/\/fahrzeuge\//)) {
            MobileDE.searchResult();
        }
        if (document.location.href.match(/\/home\/parking\//)) {
            MobileDE.parkdeck();
        }
        if (document.location.href.match(/\/auto-inserat\//)) {
            MobileDE.details();
        }
    }
    
};

var EricCOM = {
    ezSeparator: '/',
    equipmentMarked: false,
    markEquipment: function () {
        if (EricCOM.equipmentMarked) {
            return;
        }
        var eqEl = document.getElementById('equipmentBoxUngrouped');
        if (!eqEl) {
            return;
        }
        var h = markText(eqEl.innerText);
        h = h.replace(/,/g, '<br>');
        eqEl.innerHTML = h;
        EricCOM.equipmentMarked = true;
    },
    
    details: function () {
        debugger;
        var carModel = "";
        try {
            carModel = document.getElementsByClassName("title-car")[0].innerText;
        }
        catch(e){
            carModel = document.getElementsByClassName("title-main")[0].innerText;   
        }
        
        var attrs = {};
        var signs = getElementByClassName('li','sign');
        var meats = getElementByClassName('li','meat');
        
        for(var i = 0; i < signs.length; i++){
            var name = signs[i].innerText;
            var value = meats[i].innerText;
            if(signs[i].className.match(/swap/)){
                attrs[value] = name; 
            }
            else {
                attrs[name] = value;
            }
        }
        
        var comments = '';
        try {
            comments = getElementByClassName('div', 'comments')[0].innerText;
        } catch (e) {}
        
        var mileage = attrs['Kilometer'];
        mileage = cleanMileage(mileage);
        
        var power = attrs['Leistung in PS'];
        power = parseInt(power, 10);
        var ez = attrs['Inverkehrssetzung'];
        ez = cleanEZ(ez);
        
        var eqEl = getElementByClassName('ul', 'equipment-list')[0];
        
        var leather = cleanLeather(comments + " " + eqEl.innerText);
        
        var consumption = getConsumptionFromCarModel(carModel);
        
        var price = attrs['Preis'];
        
        price = cleanPrice(price);
        
        var scores = calculateScores(price, mileage, ez, power, leather, consumption, true);
        
        var priceEl = document.getElementsByClassName('price-tag')[0];
        priceEl.innerText = scores.scores + "\n" + calculatePrice(price, true);
        priceEl.style.backgroundColor = scores.color;
        
        var h = markText(comments + " " + eqEl.innerText);
        h = h.replace(/,/g, '<br>');
        eqEl.innerHTML = h;
        try {
            getElementByClassName('div', 'comments')[0].innerHTML = '';
        }
        catch(e){}
        setInterval(EricCOM.markEquipment, 2000);
    },
    
    getInfoForCar: function (elItemHeader, carModel) {
        debugger;
        var tds = elItemHeader.getElementsByTagName('td');
        var price ,
            priceEl,
            mileage ,
            ez ,
            leather,
            power;
        for(var j = 0; j < tds.length; j++){
            var td = tds[j];
            var w = td.getAttribute('width');
            var t = td.innerText;
            if(w == 110){
                ez = t;
            }
            else if(w == 72){
                mileage = t;   
            }
            else if(w == 75){
                price = t;
                priceEl = td;
            }
            else if(w == 112){
                leather = t;   
            }
            else if(w == 60){
                carModel = "BMW "+t;   
            }
        }
        
        leather = cleanLeather(leather);
        price = cleanPrice(price);
        mileage = cleanMileage(mileage);
        ez = cleanEZ(ez, EricCOM.ezSeparator);
        power = getPowerFromTitle(carModel);
        var consumption = getConsumptionFromCarModel(carModel);
        
        return calculateScores(price, mileage, ez, power, leather, consumption, true, priceEl);
    },
    
    parkdeck: function () {
        debugger;
        var imgs = getElementByClassName('li', 'car');
        for (var i = 0; i < imgs.length; i++) {
            
            try {
                var titleEl = imgs[i].getElementsByClassName('car-title')[0];
                var hEl = imgs[i].getElementsByClassName('description')[0];
                var h = titleEl.innerText + " " + hEl.innerText;
                
                var info = EricCOM.getInfoForCar(imgs[i], h);
                
                var priceEl = imgs[i].getElementsByClassName('prop-price')[0];
                priceEl.innerText = info.chf + "\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
            } catch (e) {}
        }
    },
    
    searchResult: function () {
        debugger;
        
        var imgs = document.getElementsByTagName('tbody');
        for (var i = 0; i < imgs.length; i++) {
            if(!imgs[i].id.match(/^rowId/)){ continue; }
            
            try {
                var h = "BMW "+ imgs[i].innerText;
                
                var info = EricCOM.getInfoForCar(imgs[i], h);
                
                /*
                if (GM_config.get('hideLowScoreResults') && info.score < GM_config.get('hideBelowScore')) {
                imgs[i].style.opacity = (GM_config.get('hideOpacity') / 100);
                }
                */
                
                var priceEl = info.priceEl;
                
                priceEl.innerText = info.chf + "\n" + info.power + " PS\n" + info.scores;
                priceEl.style.backgroundColor = info.color;
                
            } catch (e) {}
        }
    },
    
    initialize: function () {
        debugger;
        if (document.location.href.match(/\/process\.do/)) {
            EricCOM.searchResult();
        }
        if (document.location.href.match(/\/WatchList/)) {
            EricCOM.parkdeck();
        }
        if (document.location.href.match(/\/d\//)) {
            EricCOM.details();
        }
    }
};

function start(){
    
    GM_config.init('Car Scores: Configuration',{
        
        hideLowScoreResults: 
        { section: ['Search'], label: 'Hide low score search results?', type: 'checkbox', default: true },
        
        hideBelowScore: 
        { label: 'Hide below score:', type: 'int', default: 40 },
        
        optimalScore: 
        { label: 'Optimal Score:', type: 'int', default: 93 },
        
        hideOpacity: 
        { label: 'Hide opacity:', type: 'int', default: 15 },
        
        vatOrigin:
        { section: ['Price'], label: 'VAT in country of origin:', type: 'int', default: 19 },
        
        vatDestination:
        {   label: 'VAT in country of destination:', type: 'int', default: 8 },
        
        importTaxDuties:
        {   label: 'Import taxes and duties:', type: 'int', default: 4 },
        
        exchangeRate: 
        {  label: 'Exchange rate currency of origin to currency of destination:', 
         type: 'int', default: 1.25 },
        
        currencySymbol: 
        {   label: 'Currency symbol:', type: 'text', cols:50, default: 'CHF' },
        
        priceCalcActive:  
        {   label: 'Calculate import price:', 
         title: 'Calculate import price (VAT, import taxes and duties, currency rate)?', 
         type: 'checkbox', default: false },
        
        equipmentWanted:
        { section: ['Equipment'], title: 'Enter values comma separated',
         label: 'Keywords for wanted equipment:',
         type: 'textarea', default:'Navi, Xenon, Klima, Sportsitze, Leder' },
        
        equipmentUnwanted:
        {   title: 'Enter values comma separated',
         label: 'Keywords for unwanted equipment:',
         type: 'textarea', default: 'Sportfahrwerk, M-Paket'},
        
        fullLeatherText:
        { section: ['Interior'],  title: 'Enter keyword',
         label: 'Keyword for full leather interior:',
         type: 'text', default: 'Vollleder'},
        
        fullLeatherFactor:
        {   title: 'Enter factor',
         label: 'Factor for full leather interior:',
         type: 'int', default: 1.2},
        
        semiLeatherText:
        {   title: 'Enter keyword',
         label: 'Keyword for semi leather interior:',
         type: 'text', default: 'Leder'},
        
        semiLeatherFactor:
        {   title: 'Enter factor',
         label: 'Factor for semi leather interior:',
         type: 'int', default: 1.0},    
        
        nonLeatherText:
        {   title: 'Enter keyword',
         label: 'Keyword for non leather interior:',
         type: 'text', default: 'Stoff'},
        
        nonLeatherFactor:
        {   title: 'Enter factor',
         label: 'Factor for non leather interior:',
         type: 'int', default: 0.8},  
        
        engines:
        { section: ['Engines'],
         title: 'Enter in the following form {model}:{l/100km}/{power}',
         label: 'Engines per model, consumption and power:',
         type: 'textarea', cols:50, rows:10, default: 
         ['BMW 116 d:4.4/116',
         'BMW 118 d:4.5/143',
         'BMW 120 d:4.8/177',
         'BMW 123 d:5.2/204',
         'BMW 316 d:4.5/116',
         'BMW 318 d:4.7/143',
         'BMW 320 d:4.8/177',
         'BMW 325 d:6.5/197',        
         'BMW 325 xi:8.0/0',
         'BMW 320 i:6.7/0',
         'BMW 325 i:7.2/0',
         'BMW 335 d:6.8/286',
         'BMW 330xi:8.1/272',
         'Passat 2.0 TDI:6.5/0'].join("\n")
         },        
    });
    
    GM_registerMenuCommand('Car Scores: Configuration', GM_config.open);
    
    prepareEngines();
    
    if(document.domain.match(/autoscout24\.ch/)){
        AutoScout24CH.initialize();
    }
    else if(document.domain.match(/autoscout24\.de/)){
        AutoScout24DE.initialize();
    }
    else if(document.domain.match(/mobile\.de/)){
        MobileDE.initialize();
    }
    else if(document.domain.match(/eric4c\.com/)){
        EricCOM.initialize();
    }
}

start();