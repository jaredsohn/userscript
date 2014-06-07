// ==UserScript==
// @description A script that allows for the removal of specific planets resources from the Sum in Empire View.
// @name Empire View Resource Enhancer
// @namespace http://userscripts.org/users/410193
// @version 0.1
// ==/UserScript==

function ReplaceAll(Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}

function addPeriods(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function subtractResources(resource, total) {
    resource = parseInt(ReplaceAll(resource, ".", ""), 10);
    total = parseInt(ReplaceAll(total, ".", ""), 10);

    return addPeriods(total - resource);
}

function addResources(resource, total) {
    resource = parseInt(ReplaceAll(resource, ".", ""), 10);
    total = parseInt(ReplaceAll(total, ".", ""), 10);

    return addPeriods(total + resource);
}

$('.planetHead').click(function() {
alert("click registered");
    if ($(this).parent().hasClass('summary')) {
        return;
    }
    else {
        var planetDiv = $(this).parent();
        var metal = planetDiv.find(".metal span");
        var crystal = planetDiv.find(".crystal span");
        var deut = planetDiv.find(".deuterium span");

        var total = $('#total');
        var totalMetal = total.find(".metal");
        var totalCrystal = total.find(".crystal");
        var totalDeut = total.find(".deuterium");

        var metalCount, crystalCount, deutCount;
        if (planetDiv.hasClass('subtract')) {
            planetDiv.removeClass('subtract');
            totalMetal.text(addResources(metal.text(), totalMetal.text()));
            totalCrystal.text(addResources(crystal.text(), totalCrystal.text()));
            totalDeut.text(addResources(deut.text(), totalDeut.text()));
        }
        else {
            planetDiv.addClass('subtract');
            totalMetal.text(subtractResources(metal.text(), totalMetal.text()));
            totalCrystal.text(subtractResources(crystal.text(), totalCrystal.text()));
            totalDeut.text(subtractResources(deut.text(), totalDeut.text()));
    }
}
});