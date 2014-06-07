// ==UserScript==
// @name        Alibaba Plus

// @namespace   alibabaplus

// @include     http://*alibaba.com/trade/search?*
// @include     http://*alibaba.com/products/*

// @version     1

// @grant       GM_xmlhttpRequest
// ==/UserScript==

var classname = 'ls-icon ls-item';
var positions = [];
var skip = ["metricton","ton","tonne","twentyfootcontainer","set","piece","notype","unit","carton","grain","box","bag","dozen","barrel","case","pair","acre","roll"];
var abbr = {};
//abbr.metricton = ["t","mg"];
//abbr.ton = ["t","mg"];
//abbr.tonne = ["t","mg"];
abbr.kilogram = ["kg","mg"];
abbr.gram = ["g","mg"];
abbr.milligram = ["mg","mg"];
abbr.kilometer = ["km","mm"];
abbr.meter = ["m","mm"];
abbr.centimeter = ["cm","mm"];
abbr.litre = ["l","ml"];
abbr.millilitre = ["ml","ml"];

function parseitems(classname){
	var els = document.getElementsByClassName(classname);
	for (var i=0;i<els.length;i++){
		if(els[i].innerHTML.indexOf('class="attr"') != -1){
			if(els[i].innerHTML.indexOf('<em>') == -1 && els[i].innerHTML.indexOf('$') == -1 && els[i].innerHTML.indexOf('. Order') == -1){
				removeditem(9999999999, 1, "notype", els[i]);
			}
			else{
				parseattr(els[i].getElementsByClassName('cleft')[0].getElementsByClassName('attr'), els[i]);
			}
		}
		else{
			removeditem(9999999999, 1, "notype", els[i]);
		}
		els[i].parentNode.removeChild(els[i]);
	}
}

function removeitems(classname){
	var els = document.getElementsByClassName(classname);
	for (var i=0;i<els.length;i++){
		els[i].parentNode.removeChild(els[i]);
	}
}

function parseattr(attr, pnode){
	var pieces = 0;
	var price = 999999;
	var piecetype = "";
	for (var i2=0;i2<attr.length;i2++){
		var htmldata = finddetail(attr[i2].innerHTML);
		if(attr[i2].innerHTML.indexOf('. Order') != -1){
			pieces = parseInt(htmldata[0]);
			piecetype = htmldata[1];
		}
		else if(attr[i2].innerHTML.indexOf('$') != -1){
			if(htmldata[0].indexOf('.') != -1){
				price = parseFloat(htmldata[0]).toFixed(2);
			}
			else{
				price = parseInt(htmldata[0]);
			}
		}
	}
	if(piecetype == "" || piecetype == "null"){
		if(price == 999999){
			removeditem(price, 1, "notype", pnode);
		}
		else{
			var possibletype = attr[0].getElementsByTagName('em');
			if(possibletype.length != 0){
				removeditem(price, 1, possibletype[0].innerHTML, pnode);
			}
			else{
				removeditem(99999999, 1, "notype", pnode);
			}
		}
	}
	else{
		removeditem(price, pieces, piecetype, pnode);
	}
}

function finddetail(html){
	if(html.indexOf('<em>') != -1){
		html = html.substring(0, html.indexOf('<em>') - 1);
	}
	var ptype = html;
	html = html.replace(/[^-0-9.]/ig,'');
	if(html.indexOf('-') != -1){
		html = html.substring(html.indexOf('-') + 1);
	}
	if(ptype.indexOf('$') == -1){
		ptype = ptype.substring(ptype.indexOf(html) + html.length + 1);
	}
	else{
		ptype = "null";
	}
	return [html,ptype];
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function convertpiecestosmall(units, ptype){
	if(ptype != "" && ptype != "null"){
		if(abbr[ptype] == undefined){
			console.log('Could not find measurement type in db: ' + ptype);
			return 9999999;
		}
		else{
			return $u(units, abbr[ptype][0]).as(abbr[ptype][1]).val();
		}
	}
	else{
		console.log('Measurement type not found: ' + ptype);
		return 9999999;
	}
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatptype(s){
	s = s.toLowerCase().replace(/[^a-zA-Z]/ig,'');
	if(endsWith(s, 's')){
		if(endsWith(s, 'xes')){
			return s.slice(0, -2);
		}
		else{
			return s.slice(0, -1);
		}
	}
	else{
		return s;
	}
}

function checkdoskip(piecetype){
	return skip.indexOf(piecetype) != -1;
}

function removeditem(price, pieces, piecetype, el){
	var pieceprice;
	piecetype = formatptype(piecetype);
	if(checkdoskip(piecetype)){
		pieceprice = ((price * 9999) / pieces);
	}
	else{
		pieceprice = (price / convertpiecestosmall(pieces, piecetype));
	}
	positions.push({"price":price,"pieces":pieces,"pieceprice":pieceprice,"piecetype":piecetype,"el": el});
}

(function () {
    var table = {};

    window.unitConverter = function (value, unit) {
        this.value = value;
        if (unit) {
            this.currentUnit = unit;
        }
    };
    unitConverter.prototype.as = function (targetUnit) {
        this.targetUnit = targetUnit;
        return this;
    };
    unitConverter.prototype.is = function (currentUnit) {
        this.currentUnit = currentUnit;
        return this;
    };

    unitConverter.prototype.val = function () {
        // first, convert from the current value to the base unit
        var target = table[this.targetUnit];
        var current = table[this.currentUnit];
        if (target.base != current.base) {
            throw new Error('Incompatible units; cannot convert from "' + this.currentUnit + '" to "' + this.targetUnit + '"');
        }

        return this.value * (current.multiplier / target.multiplier);
    };
    unitConverter.prototype.toString = function () {
        return this.val() + ' ' + this.targetUnit;
    };
    unitConverter.prototype.decimals = function (dec) {
        return this.val().toFixed(dec);
    };
    unitConverter.prototype.debug = function () {
        return this.value + ' ' + this.currentUnit + ' is ' + this.val() + ' ' + this.targetUnit;
    };
    unitConverter.addUnit = function (baseUnit, actualUnit, multiplier) {
        table[actualUnit] = { base: baseUnit, actual: actualUnit, multiplier: multiplier };
    };

    var prefixes = ['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'da', '', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
    var factors = [24, 21, 18, 15, 12, 9, 6, 3, 2, 1, 0, -1, -2, -3, -6, -9, -12, -15, -18, -21, -24];
    // SI units only, that follow the mg/kg/dg/cg type of format
    var units = ['g', 'b', 'l', 'm'];

    for (var j = 0; j < units.length; j++) {
        var base = units[j];
        for (var i = 0; i < prefixes.length; i++) {
            unitConverter.addUnit(base, prefixes[i] + base, Math.pow(10, factors[i]));
        }
    }

    // we use the SI gram unit as the base; this allows
    // us to convert between SI and English units
    unitConverter.addUnit('g', 'ounce', 28.3495231);
    unitConverter.addUnit('g', 'oz', 28.3495231);
    unitConverter.addUnit('g', 'pound', 453.59237);
    unitConverter.addUnit('g', 'lb', 453.59237);

//    unitConverter.addUnit('l', 'ml', 0.001);
//    unitConverter.addUnit('l', 'oz', 33.8239926);
//    unitConverter.addUnit('l', 'pints', 2.11337);
//    unitConverter.addUnit('l', 'cups', 4.22675);
//    unitConverter.addUnit('l', 'qt', 1.056998);
//    unitConverter.addUnit('l', 'gal', 3.78541);


    window.$u = function (value, unit) {
        var u = new window.unitConverter(value, unit);
        return u;
    };
})();

var sort_by = function(field, reverse, primer){
   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};
   reverse = [-1, 1][+!!reverse];
   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

function insertitems(sortby){
	positions.sort(sort_by(sortby, false, parseFloat));
	for (var i=0;i<positions.length;i++){
		if(abbr[positions[i].piecetype] && parseFloat(positions[i].price) < 9999 && parseFloat(positions[i].pieceprice) < 9999){
			if(positions[i].el.getElementsByClassName('cleft')[0].getElementsByClassName('lwrap')[0].innerHTML.indexOf('piecepriceattr') == -1){
				var piecepriceattr = document.createElement('div');
				piecepriceattr.id = 'piecepriceattr' + i.toString();
				piecepriceattr.setAttribute('class', 'attr');
				var piecepricetext = document.createTextNode('$' + parseFloat(positions[i].pieceprice).toString() + ' ');
				var piecepriceem = document.createElement('em');
				piecepriceem.innerHTML = 'Per ' + abbr[positions[i].piecetype][1];
				piecepriceattr.appendChild(piecepricetext);
				piecepriceattr.appendChild(piecepriceem);
				var insertel = positions[i].el.getElementsByClassName('cleft')[0].getElementsByClassName('lwrap')[0].getElementsByClassName('attr');
				insertAfter(insertel[insertel.length-1], piecepriceattr);
			}
		}
		insertAfter(document.getElementById('J-ls-filter'), positions[i].el);
	}
}

function filteritems(sortby){
	while(document.getElementsByClassName(classname).length > 0){
		parseitems(classname);
	}
	insertitems(sortby);
}

function filteritems2(sortby){
	while(document.getElementsByClassName(classname).length > 0){
		removeitems(classname);
	}
	insertitems(sortby);
}

function filterlaunch(e){
	if(e.target.id == 'filterpricecheck'){
		document.getElementById('filterpiecepricecheck').checked = false;
		document.getElementById('filterpriceallcheck').checked = false;
		document.getElementById('filterpiecepriceallcheck').checked = false;
		filteritems2('price');
	}
	else if(e.target.id == 'filterpiecepricecheck'){
		document.getElementById('filterpricecheck').checked = false;
		document.getElementById('filterpriceallcheck').checked = false;
		document.getElementById('filterpiecepriceallcheck').checked = false;
		filteritems2('pieceprice');
	}
	else if(e.target.id == 'filterpiecepriceallcheck'){
		document.getElementById('filterpricecheck').checked = false;
		document.getElementById('filterpiecepricecheck').checked = false;
		document.getElementById('filterpriceallcheck').checked = false;
		pageall('pieceprice');
	}
	else if(e.target.id == 'filterpriceallcheck'){
		document.getElementById('filterpricecheck').checked = false;
		document.getElementById('filterpiecepricecheck').checked = false;
		document.getElementById('filterpiecepriceallcheck').checked = false;
		pageall('price');
	}
}

function insertfilterbutton(name){
	var filtername = name.toLowerCase().replace(/[^a-zA-Z]/ig,'');
	var filter1 = document.createElement('div');
	filter1.id = 'filter' + filtername;
	filter1.setAttribute('class', 'item');
	var filterlink1 = document.createElement('a');
	filterlink1.setAttribute('class', 'ic');
	filterlink1.href = 'javascript:void(0);';
	var filtercheck1 = document.createElement('input');
	filtercheck1.setAttribute('class', 'ui-checkbox ui-checkbox-system');
	filtercheck1.type = 'checkbox';
	filtercheck1.id = 'filter' + filtername + 'check';
	var filterlabel1 = document.createElement('label');
	var filterlabelspan1 = document.createElement('span');
	filterlabelspan1.setAttribute('class', 'ico ico-crd');
	filterlabelspan1.id = 'filter' + filtername + 'span';
	filterlabelspan1.style.backgroundImage = "url('http://bookstoreonlineus.com/wp-content/themes/shopperpress/shopperpress/template_shopperpress/images/money_dollar.png')";
	var filterlabeltext1 = document.createTextNode(name);

	filterlink1.appendChild(filtercheck1);
	filterlabel1.appendChild(filterlabelspan1);
	filterlabel1.appendChild(filterlabeltext1);
	filterlink1.appendChild(filterlabel1);
	filter1.appendChild(filterlink1);
	document.getElementById('J-ls-filter-ext').childNodes[1].appendChild(filter1);
	document.getElementById('filter' + filtername).addEventListener('click',filterlaunch,true);
}

function dosort(){
	filteritems('pieceprice');
	insertfilterbutton('Price');
	insertfilterbutton('Piece Price');
	insertfilterbutton('Price (All)');
	insertfilterbutton('Piece Price (All)');
	document.getElementById('filterpiecepricecheck').checked = true;
}

function procpage(href, sortby){
	GM_xmlhttpRequest({
		method: "GET",
		url: href,
		onload: function(response) {
			if (response.readyState==4){
				if (response.status != 404){
					var divitem = document.createElement('div');
					var rdata = response.responseText.substring(response.responseText.indexOf('J-ls-filter">'));
					rdata = rdata.substring(rdata.indexOf('</script>') + 10);
					rdata = rdata.substring(0, rdata.indexOf('<script') - 8);
					divitem.innerHTML = rdata;
					insertAfter(document.getElementById('J-ls-filter'), divitem);
					if(response.responseText.indexOf('class="next disabled"') != -1){
						positions = [];
						filteritems(sortby);
					}
				}
			}
		}
	});
}

var pptime = 0;

function procpageq(href, sortby){
	pptime += 500;
	setTimeout(function(){procpage(href, sortby)}, pptime);
}

function pageall(sortby){
	var pageels = document.getElementById('J-ls-pagination').getElementsByClassName('navi')[0].getElementsByTagName('a');
	if(pageels.length > 0){
		var pages = parseInt(pageels[pageels.length-2].innerHTML) + 1;
		for (var i=2;i<pages;i++){
			procpageq(pageels[0].href.replace('2.html', i.toString() + '.html'), sortby);
		}
	}
}

dosort();