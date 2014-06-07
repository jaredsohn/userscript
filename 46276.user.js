// Version 0.01 Beta
//
// 20090409 0.01 Initial version.
//
// ==UserScript==
// @name           Finn distance
// @namespace      http://drop.by
// @description    Improves FINN.no realestate. Both the results page and object page are improved by adding driving distance to a given address and price per square meter. The entries on the results page can be sorted by these two new variables, as well as total price (incl. "fellesgjeld").
// @include        http://www.finn.no/finn/realestate/*
// ==/UserScript==
(function () {

    if (window.location.href.indexOf(
            "http://www.finn.no/finn/realestate/lettings/wanted") > -1)
        return;

    var distance = false;
    var supported = typeof(GM_xmlhttpRequest) != "undefined";
    var address = "Unsupported by browser";
    if (supported) {
        distance = GM_getValue("distance");
        if (typeof(distance) == "undefined") {
            distance = true;
        }
        address = GM_getValue("address");
        if (!address) {
            address = "Henrik Ibsens gate 1,0255 Oslo";
        }
    }
    if(window.location.href.indexOf(
            "http://www.finn.no/finn/realestate/abroad") > -1)
        distance = false;

    var resultlist = document.getElementById("resultlist");

    var result = new Array();

    if (resultlist == null) {
        if(window.location.href.indexOf("/finn/realestate/object") > -1)
            handleObjectPage();
/*        else if (window.location.href.indexOf("/finn/realestate/newbuildings")
                > -1) //This results page is unfortunately diffrent from others.
            handleResultsPageNewBuildings();*/
    }
    else
        handleResultsPage();
    return; //Nothing more to do.

    function handleObjectPage() {
        result[0] = new Object();
        var header = createDistanceHeader();
        var e = document.getElementsByTagName("h2")[0];
        e.parentNode.insertBefore(header, e);

        var o = document.getElementsByTagName("h4");
        e = document.getElementsByTagName("body")[0].innerHTML;
        e = e.substr(e.indexOf("<h4>Prisinformasjon"));
        e = e.substring(e.indexOf("<table"), e.indexOf("</table>"));
        var totalPrice = -1;
        if (e.indexOf("Totalt") > -1) {
            var s = e.substr(e.indexOf("Totalt"));
            s = s.substring(0, s.indexOf("</tr>"));
            totalPrice = parseInt(s.replace(/[^0-9]/g, ""));
        }
        else {
            e = document.getElementsByClassName("price");
            if (e.length > 0)
                totalPrice = parseInt(e[0].textContent.replace(/[^0-9]/g, ""));
        }
        if (totalPrice > -1) {
            e = document.getElementsByTagName("body")[0].innerHTML;
            e = e.substr(e.indexOf("<h4>Info"));
            e = e.substring(e.indexOf("<table"),
                e.indexOf("</table>")).match(/[^0-9][0-9]+m²/g);
            if (e.length > 0) {
                document.getElementsByClassName("price")[0].appendChild(
                    createPricePerSizeElement(totalPrice /
                    parseInt(e[0].replace(/[^0-9]/g, ""))));
            }
        }
        
        for (var i = 0; i < o.length; i++) {
            if (o[i].textContent.indexOf("Info") > -1) {
                e = o[i];
                break;
            }
        }
        //Address here is split up into two html table rows.
        e = e.nextSibling.nextSibling.getElementsByTagName("td");
        e = e[0].textContent.replace(/\s+/g, "+").replace(/^\++/, "").
            replace(/\++$/, "") + "," + e[1].textContent.replace(/\s+/g, "+").
            replace(/^\++/, "").replace(/\++$/, "");
        result[0].address = e;
        result[0].addressNode = header;
        if (distance) {
            handleAddress(result[0]);
        }
    }

    function handleResultsPage() {
        var results = resultlist.childNodes;
        var c = 0;
        for(var i = 0; i < results.length; i++) {
            var e = results.item(i);
            if (e && e.hasChildNodes()) {
                result[c] = new Object();
                result[c].standard = c;
                result[c].element = e;
                var a = e.getElementsByClassName("sec_info_left")[1];
                if (a == null) { //realestate/plots actually has "address".
                    a = e.getElementsByClassName("address")[0];
                }
                result[c].addressNode = a;
                result[c].address = parseResultsAddress(a);
                if (distance) {
                    handleAddress(result[c]); //result[c].distance set here.
                }
                result[c].totalPrice = -1;
                var o = e.getElementsByClassName("sec_info_right");
                if (o.length > 0) {
                    o = o[0].innerHTML;
                    if (o.indexOf("Totalt: ") > -1) {
                        result[c].totalPrice = parseInt(o.
                            match(/Totalt: [0-9.]+,/g)[0].
                            replace(/[^0-9]/g, ""));
                    }
                }
                if (result[c].totalPrice == -1) {
                    o = e.getElementsByClassName("price")[0].innerHTML;
                    if (o.indexOf("Solgt") == -1) {
                        result[c].totalPrice = parseInt(
                            o.replace(/[^0-9]/g, ""));
                    }
                    else {
                        result[c].totalPrice = -1;
                        result[c].pricePerSize = -1;
                    }
                }
                if (result[c].totalPrice > -1) {
                    o = e.getElementsByClassName("size")[0].innerHTML.
                        match(/[0-9]+/g);
                    if (!o) {
                        result[c].pricePerSize = -1;
                    }
                    else {
                        result[c].pricePerSize = parseInt(result[c].totalPrice /
                            parseInt(o[0]));
                        o = e.getElementsByClassName("sec_info_right");
                        if (o.length > 0)
                            o[0].appendChild(createPricePerSizeElement(
                                result[c].pricePerSize));
                        else
                            document.getElementsByClassName("price")[c].
                                appendChild(createPricePerSizeElement(
                                result[c].pricePerSize));
                    }
                }
                c++;
            }
        }

        var header = createDistanceHeader();
        header.appendChild(document.
            createTextNode("Ranger resultatene på denne siden etter "));
        el = document.createElement("select");
        el.setAttribute("id", "orderSelect");
        el.addEventListener("change", order, false);
        var el2 = document.createElement("option");
        el2.appendChild(document.createTextNode("Standard"));
        el.appendChild(el2);
        el2 = document.createElement("option");
        el2.appendChild(document.createTextNode("Total pris"));
        el.appendChild(el2);
        el2 = document.createElement("option");
        el2.setAttribute("id", "distanceOption");
        if (distance) {
            el2.appendChild(document.createTextNode("Kjøreavstand"));
        }
        else {
            var el3 = document.createElement("del");
            el3.appendChild(document.createTextNode("Kjøreavstand"));
            el2.appendChild(el3);
        }
        el.appendChild(el2);
        el2 = document.createElement("option");
        el2.appendChild(document.createTextNode("Kvadratmeterpris"));
        el.appendChild(el2);
        header.appendChild(el);
        resultlist.parentNode.insertBefore(header, resultlist);
    }

    /**
     * Creates and returns a DIV element with text contents like:
     * "Kvadratmeterpris: 9.123,-" if the input parameter is the number
     * 9123 (or 9123.234...).
     */
    function createPricePerSizeElement(pricePerSize) {
        var str = "" + parseInt(pricePerSize);
        if (str.length > 3) //Assumes pricePerSize is not > 99999.
            str = str.substring(0, str.length - 3) + "." +
            str.substr(str.length - 3);
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("Kvadrameterpris: " +
            str + ",-"));
        return div;
    }

    /**
     * Creates and returns DIV element with text input field for distance
     * address (and check box).
     */
    function createDistanceHeader() {
        var header = document.createElement("div");
        header.setAttribute("class", "header");
        var el = document.createElement("input");
        el.setAttribute("type", "checkbox");
        if (supported) {
            el.addEventListener("click", toggleDistance, false);
        }
        else {
            el.disabled = true;
        }
        if (distance) {
            el.checked = true;
        }
        header.appendChild(el);
        el = document.createTextNode(" Vis kjøreavstand til ");
        header.appendChild(el);
        el = document.createElement("input");
        el.setAttribute("id", "addressInput");
        el.setAttribute("size", "23");
        el.setAttribute("value", address);
        if (!distance) {
            el.disabled = true;
        }
        header.appendChild(el);
        el = document.createElement("input");
        el.setAttribute("id", "updateAddressButton");
        el.setAttribute("type", "button");
        el.setAttribute("class", "button");
        el.setAttribute("value", "oppdater");
        if (supported) {
            el.addEventListener("click", updateAddress, false);
        }
        if (!distance) {
            el.disabled = true;
        }
        header.appendChild(el);
        header.appendChild(document.createElement("br"));
        return header;
    }

    /**
     * Sorts the results on the page, by selectedIndex from the SELECT element
     * with id "orderSelect".
     * "Kjøreavstand" ("distanceOption") is not available if distance
     * calculation is disabled.
     * Unknown values (-1) are presented last.
     */
    function order() {
        var x = document.getElementById("orderSelect").selectedIndex;
        var i;
        switch (x) {
            case 0:
                for (i = 0; i < result.length; i++)
                    result[i].sortBy = result[i].standard;
                break;
            case 1:
                for (i = 0; i < result.length; i++)
                    result[i].sortBy = result[i].totalPrice;
                break;
            case 2:
                if (!distance) {
                    document.getElementById("distanceOption").selected = false;
                    for (i = 0; i < result.length; i++)
                        result[i].sortBy = result[i].standard;
                }
                else
                    for (i = 0; i < result.length; i++)
                        result[i].sortBy = result[i].distance;
                break;
            case 3:
                for (i = 0; i < result.length; i++)
                    result[i].sortBy = result[i].pricePerSize;
                break;
            default:
                for (i = 0; i < result.length; i++)
                    result[i].sortBy = result[i].standard;
        }
        for (i = 0; i < result.length; i++) {
            for(var j = 0; j < result.length - 1; j++) {
                if (result[j].sortBy == -1 || result[j + 1].sortBy > -1 &&
                        result[j + 1].sortBy < result[j].sortBy) {
                    resultlist.insertBefore(resultlist.removeChild(
                        result[j + 1].element), result[j].element);
                    var t = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = t;
                }
            }
        }
        for (i = 0; i < result.length; i++) {
            if (i % 2 == 0) {
                result[i].element.setAttribute("class", "even");
            }
            else {
                result[i].element.setAttribute("class", "odd");
            }
        }
    }

    /**
     * Enable or disable distance to address calculation.
     */
    function toggleDistance() {
        var el2 = document.getElementById("distanceOption");
        if (el2) {
            el2.selected = false;
            el2.removeChild(el2.firstChild);
        }
        if (distance) {
            document.getElementById("updateAddressButton").disabled = true;
            document.getElementById("addressInput").disabled = true;
            distance = false;
            if (el2) {
                var el3 = document.createElement("del");
                el3.appendChild(document.createTextNode("Kjøreavstand"));
                el2.appendChild(el3);
            }
            removeDistance();
        }
        else {
            document.getElementById("updateAddressButton").disabled = false;
            document.getElementById("addressInput").disabled = false;
            distance = true;
            if (el2)
                el2.appendChild(document.createTextNode("Kjøreavstand"));
            updateAddress();
        }
        GM_setValue("distance", distance);
    }

    /**
     * Recalculates distances to inputed address. For when it has changed.
     */
    function updateAddress() {
        removeDistance();
        address = document.getElementById("addressInput").value;
        if (address.search(/[a-zA-Z]/) == -1) return;
        GM_setValue("address", address);
        for(var i = 0; i < result.length; i++) {
            handleAddress(result[i]);
        }
    }

    /**
     * Removes all calculated distances. For when inputed address is changed or
     * address calculation is disabled.
     */
    function removeDistance() {
        var distances = document.getElementsByClassName("distance");
        for(var i = distances.length - 1; i >= 0; i--) {
            var d = distances.item(i);
            d.parentNode.removeChild(d);
        }
    }

    /**
     * Returns address represented as a string like:
     * Henrik+Ibsens+gate+1,0255+Oslo
     */
    function parseResultsAddress(node) {
        if (!node)
            return null;
        var r = new RegExp("[0-9]{4}");
        var s = node.textContent.split("").reverse().join(""); //reversed str.
        var a = r.exec(s); //match first (which is last) [0-9]{4} in string.
        if (a != null) { //add coma before postal number.
            s = s.substring(0, a.index + 4) + "," + s.substr(a.index + 4,
                s.length);
        }
        s = s.split("").reverse().join(""); // reverse string back again.
        return s.replace(/\s+/g, "+").replace(/\++,|,\++/g, ",").
            replace(/^\++|\++$/g, "");
    }

    /**
     * Gets object's address string and calculates distance between object's
     * address and inputed address. The distance is then appended to the
     * object's address node (with link to driving directions).
     */
    function handleAddress(obj) {
        var drive = "http://maps.google.com/?q=from:" + obj.address +
            ",Norway+to:" + address.replace(" ", "+", "g") + ",Norway&hl=no";
        //&dirflg=w"; //walk

        GM_xmlhttpRequest({
            method:'GET',
            url:drive + "&output=dragdir",
            headers:{
                'User-Agent':'Mozilla/5.0 (compatible) Greasemonkey',
                'Accept':'application/atom+xml,application/xml,text/xml'
            },
            onload:function(response) {
                var resp = response.status;
                if (response.status == 200) {
                    resp = response.responseText;
                    resp = resp.substring(resp.indexOf("(") + 1, resp.
                        indexOf(")")).replace(/\\[^km]+/, "", "");
                    if (resp.search(/[1-9]/) == -1) {
                        obj.distance = -1;
                    }
                    else if (resp.indexOf("km") == -1) {
                        obj.distance = parseInt(resp.
                            match(/[0-9]+/g)[0]);
                    }
                    else {
                        var nums = resp.match(/[0-9]+/g);
                        obj.distance = parseInt(nums[0]) * 1000;
                        if (resp.indexOf(",") > -1) {
                            obj.distance += parseInt(nums[1]) *
                                Math.pow(10, 3 - nums[1].length);
                        }
                    }
                    resp = "<a href=\"" + drive + "\">" + resp + "</a>";
                }
                else {
                    resp = resp.status;
                }
                var e = document.createElement("div");
                e.setAttribute("class", "distance");
                e.innerHTML = "Kjøreavstand: "+ resp;
                obj.addressNode.appendChild(e);
            }
        });
    }

})();

