// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           danbooru easier tag search
// @namespace      http://www.w3.org/1999/xhtml 
// @description    drag and drop tags onto the search field
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

if(document.getElementById("tags")) {
   if(document.getElementById("tags").tagName.toLowerCase() == "input") {
      //the change event isn't fired for drag and drop, therefore we use mousemove
      document.getElementById("tags").addEventListener("mousemove", function(e) {update_tag_box()}, false);
      //we add a clear button
      var clear_button = document.getElementById("tags").parentNode.appendChild(document.createElement("img"));
      clear_button.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJxQAACcUBh4TE9AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANXSURBVDiNldVfTFtVHAfw7zm0tOfce+7tn9t7S7styrAdLCKbWRwx2cYYg0RjsuiDPvlmfPTJV+Obr777JzHTLGbGZGrUoSLQjQGzbM1WNicSOzugYzWDQVtC+/NBOi4d6DzJeTnnfD/J7/xOcgAQi0bLESnPv2vb5ADEiQiPMwFisVjZEuKb9yyrEgOIQ6lSWMoLaaXmSNOuToRCtPtxUICY45AtxPDYRjYrxFocPt+5t5TKkWlWyTCWSdMy4/+FurALSv1FplklpeZIypF3EAhQQIjRL5W69xDV9czFUIh2bYe6sNQmdp80Lf2drlMEADGlyBJi9FwDmmpEXdjoVmzqvGVRC0Ds4cF/0NTXShU30CXS9cxIOExxgLgLG27ABjcwTkTYUopSZPn9qW830fukaVd/DoVol22TI8TwUH1vA/vBjW0B66iuU8TvT33vDur6dEqI8dRW7MpPlkWxxnvetoO6TraUqcF6aYZRJsMoubGh7bBtwTpq2+Ro2sSIYaySaRKZJpFhlEnXszu+ACICxw6DMVCtVltvXPd6eYVz1HbKPQIyBqYUwtXqxdNSPtXDmA9EFRBVwJgXuoodE/L6x5EIbMbA/hWsY9HYxJlorKMvFA5AiBVUq7OT6+vXLwNLEEJDS3z3ybCd/cS2H0V5I5bYf/nzPa2J3pClwwiU0OTJjft8+16W8uBLwI1LHs8D+IVEW0e8L946fboR5W6s63D6bOu+vT1mSEIPlFEq5X4pre5/pVhEfnER8z7f4VNra7emmrwl+IXAM89FT+ztvPGpG+V17NCxqS/ann7iqB70Qw+WsVjIZ+bz7aeKRdwhQo0IVCigsLz07AsrD2auNXlK8Ekfuges3vbu6c8cBxHGwHgwCKO778rZ5IE9R7RAM6RZRm52LvtbNvlisYg80WZHiVBbWMDC7d+7+ov3cje5t4Jm4cXxV4PHO3uzZwwDQU/X86NvJw+0HW0WzeCeNWTGFm9mxpIDjZgbZQzzPJ08oaxfR4Jx50mvaEL/G7JneTn9Jp/JHnr/7nzxD69cQTZ999bkYKJvJ8yN5m8335n8MXEkP1v4k3vLuPTV6sy1oYMfACCe6Ci19L828VEkQtH/+QXw9s7V6MDrYx86DtkA8b8BKPh6wgVOFWMAAAAASUVORK5CYII=");
      clear_button.setAttribute("style", "border-width: 0px; margin: 0px; padding: 0px; height: 17px; width: 17px;");
      clear_button.setAttribute("alt", "clear search");
      clear_button.setAttribute("title", "clear search");
      clear_button.addEventListener("click", function() {document.getElementById('tags').value = '';}, false);
   }
}

function update_tag_box() {

   if (document.getElementById("tags").value.indexOf("http") != -1) {
      //we remove the URL part and the tag(s) remain
      document.getElementById("tags").value = document.getElementById("tags").value.replace(/https?:\/\/.*\?tags=/," ");
      //we have to decode the tag(s); else they will be double encoded when submitting the search (and won't work!)
      document.getElementById("tags").value = decodeURIComponent(document.getElementById("tags").value);
      //for convenience we focus the input; else [enter] would submit the link instead of submitting the complete search
      document.getElementById("tags").focus();
   }

   if (document.getElementById("tags").value.slice(0,1) == " ") {
      document.getElementById("tags").value = document.getElementById("tags").value.slice(1);
   }
}