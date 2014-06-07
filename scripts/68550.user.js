// ==UserScript==
// @name           Filter - Current Down
// @namespace      monsterkill
// ==/UserScript==

CurrentDownFilter = function(filterData) {
    if (filterData != null) {
        this.o = filterData.o;
        this.v = filterData.v;
    } else {
        this.o = '=';
        this.v = 1;
    }
};
CurrentDownFilter.prototype = {};
CurrentDownFilter.filterClassIndex = 1;
CurrentDownFilter.prototype.getAddDiv = function() {
    alert('getAddDiv() is unimplemented');
};
CurrentDownFilter.prototype.getEditDiv = function() {
    alert('getEditDiv() is unimplemented');
};
CurrentDownFilter.prototype.getViewText = function() {
    return "Current down "+this.o+" "+this.v;
};
CurrentDownFilter.prototype.isMatch = function() {
    alert('isMatch() is unimplemented');
};
CurrentDownFilter.prototype.serialize = function() {
    var filter = {
        i: CurrentDownFilter.filterClassIndex,
        d: {
            o: this.o,
            v: this.v
        }
    };
    return filter;
};

