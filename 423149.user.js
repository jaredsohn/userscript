// ==UserScript==
// @name        Font Substitution
// @author      Adam J. Conover
// @namespace   http://www.adamconover.com
// @description Replace all fonts with browser "generic-family" fonts.
// @include     http*
// @grant       none
// @version     0.2.1
// ==/UserScript==

var fontMap = new Array();

/* ********* START: USER CONFIG (CUSTOMIZE HERE!!!) ********* */
// Use whatever fonts you like....

fontMap['SERIF'] = 'serif';
fontMap['SANS']  = 'sans-serif';
fontMap['MONO']  = 'monospace';
fontMap['CURSIVE'] = fontMap['MONO'];
fontMap['FANTASY'] = fontMap['SERIF'];
fontMap['DEFAULT'] = fontMap['SANS'];

/* ******************** END: USER CONFIG ******************** */


/** Iterate over an array of all the elements on the page. */
function main() {
    var logGroup = "CHANGING FONTS:";
    
    console.group(logGroup);
    iterateOverElements(document.getElementsByTagName('*'));
    console.groupEnd(logGroup);
}

/** Iterate over all page elements with early bail-out on the irrelevant ones.
  *
  * NOTE: It's necessary to iterate over ALL page elements (not just styles)
  *       because most elements *inherit* styles while the page is rendering
  *       and don't necessarily have their *own* style attributes to change.
  */
function iterateOverElements(elements) {
  
    // Step over elements (MUST use "C-style" loop in GM)
    for (var i = 0; i < elements.length; i++) {
       
        // Bail out if the element has no inner HTML
        var element = elements[i];
        if (!(element.innerHTML)) continue;
        
        // Bail out if the element has no computable style
        var compStyle = getComputedStyle(element, null);
        if (!compStyle) continue;
       
        // Bail out if the font style does not actually exist so we don't waste time altering/setting "default" fonts.
        var fontList = compStyle.getPropertyValue('font-family').toLowerCase().split(',');
        if (!fontList || fontList.length <= 0) continue;
       
        // If we are here, we must have fonts that can be replaced...
        replaceFont(element, fontList);
    }
    
}


/** Perform the actual font replacement. */
function replaceFont(element, fontList) {

    // Determine the NEW base family...
    //
    // SEE ALSO: http://www.w3.org/TR/CSS2/fonts.html
    var newFontFamily = 
        fontList.indexOf('sans-serif') >= 0  ? fontMap['SANS'] :
        fontList.indexOf('serif') >= 0       ? fontMap['SERIF'] : 
        fontList.indexOf('monospace') >= 0   ? fontMap['MONO'] :
        fontList.indexOf('cursive') >= 0     ? fontMap['CURSIVE'] :
        fontList.indexOf('fantasy') >= 0     ? fontMap['FANTASY'] :
        fontMap['DEFAULT'];


    // FIXME: It would seem unnecessary to "change" a font to its own reported "computed style",
    //        Unfortunately, scripted style changes don't seem to propagate down the inheritance chain
    //        causing elements to report the inherited style, yet display as the original font.
    //        I haven't worked out an elegant fix for this yet..
    
//  if (fontList[0] == newFontFamily) {    
    
       // Set the font style to the newly simplified string.
       element.style.setProperty('font-family', newFontFamily, 'important');
  
       // DEBUG: Console Logging. (Should only hit performance if actually monitoring logs.)
       console.info('Changed %s font from %s to %s and is now %s', element.nodeName, fontList[0], newFontFamily, getComputedStyle(element, null).getPropertyValue('font-family'));
    
//  }
}  

// Invoke main()
main();
