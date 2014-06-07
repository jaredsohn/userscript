// ==UserScript==
// @name          TEM Quick Search
// @namespace     http://zoolcar9.lhukie.net/
// @include       http://www.extensionsmirror.nl/*
// @description	  Adds a search box when hover on the search link on the header
// ==/UserScript==
// Changelog:
// 20051113: Updated to TEM's new layout


(function() {
  var head, style;
  style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = (
    '#searchbox { display: none !important; }' + //hide the ugly search
    '#SearchBox {' +
    '  display: none;' +
    '  border: 2px outset #5176b5;' +
    '  background: #d7deea' +
    '    url(/style_images/1/tile_sub.gif) top left repeat-x;' +
    '  font-weight: normal;' +
    '  position: absolute;' +
    '  margin-top: -.5em;' +
    '  margin-left: -15em;' +
    '}' +
    '#searchmenu:hover > #SearchBox {' +
    '  display: block;' +
    '}' +
    '#closebox {' +
    '  display: block;' +
    '  width: 16px;' +
    '  height: 16px;' +
    '  background: transparent' +
    '    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAbqSURBVHjaYmRgYGADYj4oTQr4BcSfoOwB0w8QQCxAQrCDlz2Zh5HRjYmRQZaZgUEJn66%2FDAz3%2Fv1nePzl%2F%2F9dFZ9%2FzgWJUUs%2FKyODPTEu%2F%2F2f4SBMP0AAgTzACNLslxJrLyAmDLThHwPDv78M%2F4GY4f9fBPsvhP%2F%2F3z%2Bl96%2FfKW1buxtk1jwQAdIfu3%2B3PZ%2BBLpAH1P%2FnNxD%2FAYYRMJB%2B%2F0bCIP4vpa%2BXrigtSCtA0W%2BoxGf%2FhfE%2FAzsjI9Ce%2F0DR%2F0Cr%2F4HsY%2FgH9PG%2FfyA2hOb6%2F9%2F%2BymuwX%2BYBBBDIA%2F%2BYGRlkBOWlGP68ecbw5%2B0zsIb%2F%2FyGK%2F0FpCB9oAb8Ag6C0KIOwqIAMw6cX%2F0CmgPTzGegxMNy%2Fz8Dw8BLEs2D8B0L%2Fg%2BK%2FQE8IKzNwa2owiKnIyzCcuwnWDwr57%2FzcDJIcrAzCrMwMzAxQO%2F%2FCHP8X7Pi%2FUA%2F9Bpp5880HUGz9AwggJmNjY2YmBgZlBqDGvz%2FeM%2FwHGsKXXsXAJC0LjO5fDH%2F%2F%2F2JglpVnEM6pZ%2FjHxcHw9etHBgYOFgZ2TnZlkF64fqClDE%2BuAVPlVwYGTRsgl5WB4f0HBoYPQPXMnAwMxh4MDN%2BBHnh8BayUg5cLrh%2FsCV5eBhERQQYxGUkG0dAkBhF1DQZhMSEwFtHQZBCPSmMQkZGC8EEpBQhAegECiMXGxoaV4c5VoJn%2FwTHHF1fKwK5vxcCmps%2FwurcIGAMMDOIlfQxMXDwMYimMDE8nVQMd8A8czWC9IADUDw5tULIxcWFgkFFhALqEgWHXcoha92hgFuVgYLALZGDYsQiaHFH1M7IwMzCxsjAw2fkC9SszMEnJM%2FzbuYKBERjiLO4RDAws7AxsTEwMP3atZmBmBkccWD9AALGoqalBcj8wmv4BLfu0ZRGDsKoe2MGixX1gKRD777cvDO82LoDkon8QA%2BB6QeAPNJ1fPAJxPMjBbpEQORD753cGhrN7Iekb5AFggCHrByURkLn%2FgPoZRaWBUcLBwOwWAU66DKzsDP9%2F%2FmD4ff4wRC1UD0g%2FQACxKCsrsz8Euenzd4afD98y%2FL5yj%2BHHoyQGqZ45DMy8fJCS4%2FMnhrv5CQzf790CJilgWhSWBDsEpBckD9LPALSA4c1bBoZnLxkYnk9mYIjOZmDg5ILY9A2YrKa1AZPPfYg6VROwK5D1%2F3v3meHPizcMv%2B88ZWC4%2BpCBJTqd4T87B1jdv%2B8fGb7Pn8Lw5%2BUzcMZmFIW4C6QfIAAZVZACIAzDoggKgrf9%2F30KMsFON7eq2QQRPJQeSkqakjTGmC4vUCuILiBKQB3SL7rOQ8ssmzrNK66kyNj3AE%2BFHYkKqw%2F%2F7NtI3NIPO%2Fs0lYT64nW00JriMIvRDuTAb1ZNEeo6IlQ8dJHHyM6XlRl%2FCyAmAQEBTnC0ABWBcjyrsjqD7OQF4NAHhTwIg9gq0xczcKppgvPE%2F5%2B%2FGP7%2F%2FsMA0gvTDw5ZoBkMIsDYSSqChD4o5EGYi5uBoaSRgUFKDpJPvn0DewBZ%2F98fvyDFppgEA2t8FtATHAz%2Fger%2BfQeqZedk4EzNY2CUkIaUht8hAQTSCxBATDw8PJzwPABMgyJJ2XDH38mKZbidGcvwB8hmAYpJpuZC0uQ%2FSCYE6YXrB5X5IOzojXD8xCYGht56IPsL0BM8DAyBUZB8AlL3D1U%2FqHj8C8wbzPbu4KQDcvi32RMZvs2aCGYzAsXYnb3AeQXsBlD9AdQLEEAsnECA7IFHzRUMsgwdDM9nT2b4dus6WPHN9Biw4%2B%2FWlzEwA0sLSCUHdCdMLwiAkgYwZhgWTQOm%2F3QGhi2rGBge3AU6GBjizWUMDAHADN3fwgAqrhl%2B%2FgQHALJ%2BkN2gOvT76sUM7MHRDD%2F3bGP4%2B%2BwJOFX8ndHPwAZ0%2FJcVC6H1AsQDIP0AAcQCBJzAMvg50FGSnIJCDJ9fvWS4W5IFL1ZBHvhy4xrDzaIMBlY2VgZ%2BQT5wKfKfg%2FM5SC%2B0DH8OzAOSDNLA4vPDWQaGSa2QGh1WtN4C1g8tFUAbgYWOgjpY%2Fz9mVrh%2BiAcgNe8fYD76s3Am3G4Q%2FvvkMcPP%2BdPhNTIMgPQDBBALGxsbB7uA4NsPb99J8gsKMnDx80FCGFT7%2FUVqSiA1KT5%2B%2BsLwi5XjLUgvyCCQ%2Fq%2BXrkpyK8ozMEh6QvICLKnAMCjUQRio%2F%2BvjZwxffzPA9fPIyl3hePVA5%2BcfYAEBrNYZoUkE7AGQo2E01PGf%2FjOC9YD0AwQQuCkhbm5x5fSZ00w%2F378T%2FvXxozi%2BhhQbP%2F9LdkGhtyA9kIYPsKIDsjdNmUuR%2FldnmJnuPrivBVHFiLcxx6ugeE3cxBSsHyCAgJ79Dww2BmD1ycBNYnMWmEsZ9kDZA6YfIMAAwl901NcZnlkAAAAASUVORK5CYII%3D)' +
    '    top left no-repeat;' +
    '  float: left;' +
    '  cursor: pointer;' +
    '}' +
    '#closebox:hover {' +
    '  background-position: top center;' +
    '}'
  );

  head = document.getElementsByTagName('head')[0];
  if(!head) return;
  head.appendChild(style);

  var iconlinks, searchlink, searchmenu, searchbox;

  iconlinks = document.getElementById('iconlinks');
  if(!iconlinks) return;
  iconlinks.getElementsByTagName('a')[0].removeAttribute('onmouseover'); //remove the ugly search
  searchlink = iconlinks.getElementsByTagName('a')[2];

  searchmenu = document.createElement('span');
  searchmenu.setAttribute('id', 'searchmenu');

  searchbox = document.createElement('div');
  searchbox.setAttribute('id', 'SearchBox');
  searchbox.innerHTML = (
    '<span id="closebox" title="Close"' +
    ' onclick=this.parentNode.removeAttribute("style")>\n</span>' +
    '<form method="post"' +
    ' action="/index.php?act=Search&CODE=01"' +
    ' onclick=this.parentNode.style.display="block" />' +
    '<select name="forums" style="font-size: 10px; border: 1px solid #999;' +
    ' background: #FFF; color: #072a66; vertical-align: middle; padding: 1px;" />' +
    '<option value="all">all</option>' +
    '<option value="20" selected>extensions</option>' +
    '<option value="23">themes</option>' +
    '</select>' +
    '<input type="hidden" name="searchsubs" value="1" />' +
    '<input type="text" name="keywords" value="" size="30"' +
    ' style="border-style: inset;" />' +
    '<input type="image" src="/style_images/1/login-button.gif" class="button" />' +
    '</form>'
  );

  iconlinks.insertBefore(searchmenu, searchlink);
  searchmenu.appendChild(searchlink);
  searchmenu.appendChild(searchbox);

})();

