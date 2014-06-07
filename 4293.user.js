// Superpages.com listing info reveal
//
// WHAT IT DOES:
// Superpages.com business listings do not display phone numbers
// and email address without first clicking on a link
// that reveals the information.  This Greasemonkey script automatically
// reveals all listing information on all listings pages.
//
// ==UserScript==
// @name           Superpages.com listing info reveal
// @description    Reveal all the Superpages.com listing information
// @include        http://yellowpages.superpages.com/listings*
// ==/UserScript==
(function()
{

function hideObject(obj) {
  if (obj != null) {
    obj.style.display = "none";
  }
}

function showObject(obj) {
  if (obj != null) {
    obj.style.display = "inline";
    obj.style.position = "static";
    obj.style.width = "auto";
    obj.style.height = "auto";
    obj.style.overflow = "visible";
  }
}

var spans = window.document.getElementsByTagName("span");

for(var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var id = String(span.id);

    if(
       id.indexOf("phoneVal") == 0 ||
       id.indexOf("sendVal") == 0 ||
       id.indexOf("emailVal") == 0 ||
       id.indexOf("phoneLabel") == 0 ||
       id.indexOf("sendLabel") == 0 ||
       id.indexOf("emailLabel") == 0
       ) {
      showObject(span);
    } else if(
       id.indexOf("phoneLink") == 0 ||
       id.indexOf("sendLink") == 0 ||
       id.indexOf("emailLink") == 0
       ) {
      hideObject(span);
    }
}

})();
