// ==UserScript==
// @name           Select Multiple Check Boxes
// @namespace      
// @description    Select multiple check boxes using shift key.
// @include        *
// ==/UserScript==

(function()
{

var currentCheckbox = null;

function NSResolver(prefix) 
{
  if (prefix == 'html') {
    return 'http://www.w3.org/1999/xhtml';
  }
  else {
    //this shouldn't ever happen
    return null;
  }
}

function selectCheckboxRange(start, end)
{
  var xpath, i, checkbox, last;

  if (document.documentElement.namespaceURI) // XML
    xpath = "//html:input[@type='checkbox']";
  else // HTML
    xpath = "//input[@type='checkbox']";
    
  var checkboxes = document.evaluate(xpath, document, NSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (i = 0; (checkbox = checkboxes.snapshotItem(i)); ++i) {
    if (checkbox == end) {
      last = start;
      break;
    }
    if (checkbox == start) {
      last = end;
      break;
    }
  }

  for (; (checkbox = checkboxes.snapshotItem(i)); ++i) {
    if (checkbox != start && checkbox != end && checkbox.checked != start.checked) {
      // Instead of modifying the checkbox's value directly, fire an onclick event.
      // This makes scripts that are part of Yahoo! Mail and Google Personalized pick up the change.
      // Doing it this way also triggers an onchange event, which is nice.
      var evt2 = document.createEvent("MouseEvents");
      evt2.initEvent("click", true, false);
      checkbox.dispatchEvent(evt2);
    }

    if (checkbox == last) {
      break;
    }
  }
}

function handleChange(event)
{
  var t = event.target;

  if (isCheckbox(t) && (event.button == 0 || event.keyCode == 32)) {
    if (event.shiftKey && currentCheckbox) {
      selectCheckboxRange(currentCheckbox, t);
    }

    currentCheckbox = t;
  }
}

function isCheckbox(elt)
{
  // tagName requires toUpperCase because of HTML vs XHTML
  return (elt.tagName.toUpperCase() == "INPUT" && elt.type == "checkbox");
}

// onchange always has event.shiftKey==true, so to tell whether
// shift was held, we have to use onkeyup and onclick instead.
document.documentElement.addEventListener("keyup", handleChange, true);
document.documentElement.addEventListener("click", handleChange, true);

})();