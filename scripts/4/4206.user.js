// ==UserScript==
// @name           Justify text by default
// @namespace      http://pile0nades.deviantart.com/
// @description    Makes paragraphs use justified text.
// @include        *
// ==/UserScript==


/* I tried doing this with only one for loop, overwriting styles only when
needed, but <th> elements ended up uncentered, because they inherited the 
tables' text-align: justify which the script wrote to it, so when the loop
got to it, it was justified when it was centered by default (I wonder why 
I can't find the css that does that?) and that's no good; this way uses 
two for loops, and an array which stores every element's text-align value;
the first loop mods the array, while the second writes the array to every
element; slower but safer, I think. This really shouldn't break anything.
*/

// get all elements
var p = document.body.getElementsByTagName("*");
var align = [];
var i;

// check all elements for left-aligned text and justify it
for (i=0; i<p.length; i++) {
  // get value of text-align
  align[i] = document.defaultView.getComputedStyle(p[i], "").getPropertyValue("text-align");
  
  // only justify elements with left-aligned text
  // this is so we don't mess up any layouts, like my css version does
  // http://userstyles.org/style/show/348
  if(
    align[i] == "start" ||
    align[i] == "left" ||
    align[i] == "-moz-left"
  ) {
    align[i] = "justify";
  }

}

// apply the styles
for (i=0; i<p.length; i++) {
  p[i].style.textAlign = align[i];
}