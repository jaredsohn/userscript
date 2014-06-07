// ==UserScript==
// @name		Mankato College Computer Recquirements
// @include		*mnsu.edu/its/restech/requirements*
// ==/UserScript==

var items = document.getElementsByTagName("ul");
for (var i = 0; i < items.length; ++i) {
    if (items[i].outerText.indexOf("Duo Core 2.20 GHz or i3 350m") != -1) {
        var itemsz = items[i].getElementsByTagName("li");
        for (var i = 0, size = itemsz.length; i < size; i++) {
            if (itemsz[i].outerText == "Duo Core 2.20 GHz or i3 350m") {
                itemsz[i].innerHTML = "Intel i5 350m";
            }
        }
    }
}