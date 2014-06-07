// ==UserScript==
// @name          DiG Links
// @namespace     http://mozilla.wikicities.com/
// @include       http://diveintogreasemonkey.org/*
// @include       http://www.diveintogreasemonkey.org/*
// @description	  Adds document relationships to diveintogreasemonkey.org. This is very useful if u have Link Toolbar extension installed. See screenshot: http://xrl.us/gx6a
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');

  function insertLink(uri, title) {
    link.setAttribute('href', uri);
    link.setAttribute('title', title);
    head.appendChild(link);
  }

  function insertContents(uri, title) {
    link.setAttribute('rel', 'contents');
    insertLink(uri, title);
  }

  function insertChapter(uri, title) {
    link.setAttribute('rel', 'chapter');
    insertLink(uri, title);
  }

  function insertAppendix(uri, title) {
    link.setAttribute('rel', 'appendix');
    insertLink(uri, title);
  }

  function insertLicense(uri, title) {
    link.setAttribute('rel', 'copyright');
    insertLink(uri, title);
  }

  function insertSection(uri, title) {
    link.setAttribute('rel', 'section');
    insertLink(uri, title);
  }

  insertContents('/toc', 'Table of Contents');

  insertChapter('/install/', '1. Getting Started');
  insertChapter('/helloworld/', '2. Your First User Script');
  insertChapter('/debug/', '3. Debugging User Scripts');
  insertChapter('/patterns/', '4. Common Patterns');
  insertChapter('/casestudy/', '5. Case Studies');
  insertChapter('/advanced/', '6. Advanced Topics');

  insertAppendix('/api/', 'Greasemonkey API Reference');
  insertAppendix('/appendix/furtherreading.html', 'List of "further reading" links');
  insertAppendix('/appendix/tips.html', 'List of tips');
  insertAppendix('/appendix/examples.html', 'List of examples');
  insertAppendix('/appendix/procedures.html', 'List of procedures');
  insertAppendix('/appendix/history.html', 'List of history');
  insertAppendix('/appendix/colophon.html', 'About this book');

  insertLicense('/license/gpl.html', 'GNU General Public License');

  if(document.location.href.match(/\/install\//)) {
    insertSection('what-is-greasemonkey.html', '1.1. What is Greasemonkey');
    insertSection('greasemonkey.html', '1.2. Installing Greasemonkey');
    insertSection('userscript.html', '1.3. Installing a user script');
    insertSection('manage.html', '1.4. Managing your user scripts');
  }

  if(document.location.href.match(/\/helloworld\//)) {
    insertSection('divein.html', '2.1. Hello World');
    insertSection('metadata.html', '2.2. Describing your user script with metadata');
    insertSection('code.html', '2.3. Coding your user script');
    insertSection('editing.html', '2.4. Editing your user script');
  }

  if(document.location.href.match(/\/debug\//)) {
    insertSection('javascript-console.html', '3.1. Tracking crashes with JavaScript Console');
    insertSection('gm_log.html', '3.2. Logging with GM_log');
    insertSection('dom-inspector.html', '3.3. Inspecting elements with DOM Inspector');
    insertSection('javascript-shell.html', '3.4. Evaluating expressions with Javascript Shell');
    insertSection('other.html', '3.5. Other debugging tools');
  }

  if(document.location.href.match(/\/patterns\//)) {
    insertSection('domain.html', '4.1. Executing a user script on a domain and all its subdomains');
    insertSection('function-exists.html', '4.2. Testing whether a Greasemonkey function is available');
    insertSection('element-exists.html', '4.3. Testing whether a page includes an HTML element');
    insertSection('iterate-every-element.html', '4.4. Doing something for every HTML element');
    insertSection('iterate-one-element.html', '4.5. Doing something for every instance of a specific HTML element');
    insertSection('match-attribute.html', '4.6. Doing something for every element with certain attribute');
    insertSection('insert-before.html', '4.7. Inserting content before an element');
    insertSection('insert-after.html', '4.8. Inserting content after an element');
    insertSection('remove-element.html', '4.9. Removing an element');
    insertSection('replace-element.html', '4.10. Replacing an element with new content');
    insertSection('innerhtml.html', '4.11. Inserting complex HTML quickly');
    insertSection('add-image.html', '4.12. Adding images without hitting a central server');
    insertSection('add-css.html', '4.13. Adding CSS styles');
    insertSection('getcomputedstyle', "4.14. Getting an element's style");
    insertSection('set-style', "4.15. Setting an element's style");
    insertSection('onload.html', '4.16. Post-processing a page after it renders');
    insertSection('case-insensitive.html', '4.17. Matching case-sensituve attribute values');
    insertSection('get-domain.html', '4.18. Getting the current domain name');
    insertSection('rewrite-link.html', '4.19. Rewriting links');
    insertSection('redirect.html', '4.20. Redirecting page');
    insertSection('intercept-clicks.html', '4.21. Intercepting user clicks');
    insertSection('override-method.html', '4.22. Overriding a built-in Javascript method');
    insertSection('parse-xml.html', '4.23. Parsing XML');
  }

  if(document.location.href.match(/\/casestudy\//)) {
    insertSection('gmailsecure.html', '5.1. Case Study: Gmail Secure');
    insertSection('bloglinesautoload.html', '5.2 Case Study: Bloglines Autoload');
    insertSection('aintitreadable.html', "5.3. Case Study: Ain't It Readable");
    insertSection('offsiteblank.html', '5.4. Case Study: Offsite Blank');
    insertSection('dumbquotes.html', '5.5. Case Study: Dumb Quotes');
    insertSection('frownies.html', '5.6. Case Study: Frownies');
    insertSection('zoomtextarea.html', '5.7. Case Study: Zoom Textarea');
    insertSection('accessbar.html', '5.8. Case Study: Access Bar');
  }

  if(document.location.href.match(/\/advanced\//)) {
    insertSection('gm_getvalue.html', '6.1. Storing and retrieving persistent data');
    insertSection('gm_registermenucommand.html', '6.2. Adding items to the menubar');
    insertSection('gm_xmlhttprequest.html', '6.3. Integrating data from other sites');
    insertSection('compiler.html', '6.4. Compiling your user script into an extension');
  }

  if(document.location.href.match(/\/api\//)) {
    insertSection('gm_log.html', 'GM_log');
    insertSection('gm_getvalue.html', 'GM_getValue');
    insertSection('gm_setvalue.html', 'GM_setValue');
    insertSection('gm_registermenucommand.html', 'GM_registerMenuCommand');
    insertSection('gm_xmlhttprequest.html', 'GM_xmlhttpRequest');
  }

  if(document.location.href.match(/\/license\//)) {
    insertSection('gpl-preamble.html', '1. Preamble');
    insertSection('gpl-terms-and-conditions.html', '2. Terms and conditions for copying, distribution, and modification');
    insertSection('gpl-how-to-apply.html', '3. How to apply these terms to your new programs')
  }

  link.setAttribute('rel', 'Downloads');
  insertLink('/download/', 'Downloads');

})();



