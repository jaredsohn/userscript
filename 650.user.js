/* Adjust message replies on WebmasterWorld forums.
   c. 2005 Jason Kirtland <lmnop@discorporate.us>
   (Perl) Artistic License / GPL dual license.  Go nutty.
   Version: 0.2 <2005-03-23>
*/

// ==UserScript==
// @name          Webmaster World Forum Reply
// @namespace     http://discorporate.us/gms
// @description	  Re-arrange message reply screen for easier composition.
// @include       http://www.webmasterworld.com/edpost.cgi?action=reply*
// ==/UserScript==
(function() {
  try {
    var els = document.evaluate('/html/body/center[3]/table[2]/tbody/tr/td/center/table/tbody/tr[5]/td[1]/table[1]',
                            document, null, XPathResult.ANY_TYPE, null);
    var quote = els.iterateNext();

    if (! quote || quote.tagName != 'TABLE') return false;

    quote.firstChild.removeChild(quote.firstChild.firstChild);
    quote.parentNode.removeChild(quote);

    var label = quote.firstChild.firstChild.firstChild.firstChild.firstChild;
    label.nodeValue = 'Original Message: ' + label.nodeValue;

    var quoteArea = quote.firstChild.childNodes[1].firstChild;
    quoteArea.style.padding = '0 0 0 2px';

    var newQuote = document.createElement('DIV');
    newQuote.style.maxHeight = '10em';
    newQuote.style.overflow = 'auto';

    while (quoteArea.childNodes.length) {
      var snarf = quoteArea.removeChild(quoteArea.firstChild);
      newQuote.insertBefore(snarf, null);
    }
    quoteArea.insertBefore(newQuote, null);

    els = document.evaluate('/html/body/center[3]/table[2]/tbody/tr/td/center/table/tbody/tr[2]/td[1]',
                            document, null, XPathResult.ANY_TYPE, null);
    var targetBlock = els.iterateNext();

    while (targetBlock.childNodes.length) {
      targetBlock.removeChild(targetBlock.firstChild);
    }

    targetBlock.insertBefore(quote, null);

    try { 
      var els = document.evaluate('//textarea',
                                  document, null, XPathResult.ANY_TYPE, null);
      var entry = els.iterateNext();
      entry.style.width = '100%'; 
    }
    catch (e) { }
  }
  catch (e) {
    // throw e;
  }

})();
