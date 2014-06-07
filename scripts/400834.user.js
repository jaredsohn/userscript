// ==UserScript==
// @name       LeShop.ch
// @version    0.1
// @description  Provides sorting buttons for leshop.ch
// @match      http://www.leshop.ch/leshop/Search.do?*
// @copyright  2012+, You
// ==/UserScript==
var $ = unsafeWindow.jQuery;

var sortBox = $('<div style="position:absolute;top: 1px;right: 1px;font-size: 10px;background-color: cornsilk;border-radius: 3px;border: 1px solid grey;">\
		Sort by:\
		<form name="sortForm" style="">\
  			<input type="radio" name="sort" value="original" checked>Original<br>\
			<input type="radio" name="sort" value="price">By price<br>\
			<input type="radio" name="sort" value="unitPrice">By unit price<br>\
		</form>\
	</div>').appendTo(document.body);
sortBox.find('input').on('change', function(e){
    sortByType(this.getAttribute('value'))
})

var products = null;
var listModeMainTable = $('.ListModeMainTable');
var calculateProducts = function(){
    var rows = listModeMainTable.find('tr');
    products = rows.toArray().map(function(row, originalIndex){
        var priceCell = $(row).children('.priceCell');
        var priceE = priceCell.children('.regPrice, .newPrice').clone();
        var priceByUnitE =  priceCell.children('.priceByUnit').clone();
        priceE.children('var').remove();
        var price = Number(priceE.text());
        priceByUnitE.children('var').remove();
        var priceByUnitParts = priceByUnitE.text().split('/');
        var byUnitPrice = Number(priceByUnitParts[0]);
        var byUnitType = priceByUnitParts[1].trim()
        return {
            row :row,
            originalIndex:originalIndex,
            price:price, 
            unitPrice:byUnitPrice,
            unitType:byUnitType
        }
    });
};

var sortByType = function(sortType){
    if (!products)
        calculateProducts(); 
    switch(sortType){
        case "original":
            products.sort(function compare(a, b) {
                return a.originalIndex > b.originalIndex ? 1 : -1;
            });
            break;
        case "price":
            products.sort(function compare(a, b) {
                return a.price > b.price ? 1 : -1;
            });
            break;
        case "unitPrice":
            products.sort(function compare(a, b) {
                if (a.unitType != b.unitType)
                	return a.unitType > b.unitType ? 1 : -1;
                return a.unitPrice > b.unitPrice ? 1 : -1;                
            });
            break;            
    }
    for(var i = 0;i<products.length;i++){
        var productRow = products[i].row;
        $(productRow).detach();
        listModeMainTable.append(productRow);
    }
}
