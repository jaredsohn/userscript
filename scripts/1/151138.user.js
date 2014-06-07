// ==UserScript==
// @name       SEO Helper for BigCommerce
// @namespace  http://www.ecommerceaction.com
// @version    0.2
// @grant       GM_addStyle
// @description  Displays characters counts next to all Page Title and Meta Description fields in the admin of your BigCommerce store.  The characters counts are there to tell you how many characters have been used for each element, helping you stay within the limits of what is displayed on Google.  Page title = 70 characters.  Meta description = 155 characters.
// @include    https://*/admin/index.php?ToDo=addProduct*
// @include    https://*/admin/index.php?ToDo=editProduct*
// @include    https://*/admin/index.php?ToDo=createCategory*
// @include    https://*/admin/index.php?ToDo=editCategory*
// @include    https://*/admin/index.php?ToDo=createPage*
// @include    https://*/admin/index.php?ToDo=editPage*
// @copyright  2012+, Ken Daniels - ken@kennethdaniels.com
// ==/UserScript==


GM_addStyle ("#cc-prodPageTitle, #cc-prodMetaDesc, #cc-catpagetitle, #cc-catmetadesc, #cc-pagemetatitle, #cc-pagedesc { color:#aaaaaa !important; }"); 

(function() {
    
  function onInput(aEvent) {
    charCount(aEvent.target);
  }
    
  function charCount(aTextArea, aIndex) {
    var cctext = document.getElementById('cc-' + aTextArea.id);   
      
    if (!cctext) {
      cctext = document.createElement('span');
      cctext.id = 'cc-' + aTextArea.id;
        
      if (cctext.id == "cc-prodPageTitle" || cctext.id == "cc-catpagetitle" || cctext.id == "cc-pagemetatitle") {
          var limit = 70;
      } 
        
      if (cctext.id == "cc-prodMetaDesc" || cctext.id == "cc-catmetadesc" || cctext.id == "cc-pagedesc") {
          var limit = 155;
      }  
      
        
        var count = document.createTextNode(aTextArea.value.length + ' / ' + limit + ' (' + (limit - aTextArea.value.length) + ' characters left)');
      cctext.appendChild(count);
      aTextArea.parentNode.insertBefore(cctext, aTextArea.nextSibling);
    } else {
        
      if (cctext.id == "cc-prodPageTitle" || cctext.id == "cc-catpagetitle" || cctext.id == "cc-pagemetatitle") {
          var limit = 70;
      }
        
      if (cctext.id == "cc-prodMetaDesc" || cctext.id == "cc-catmetadesc" || cctext.id == "cc-pagedesc") {
          var limit = 155;
      }  
        
        
      cctext.textContent = (aTextArea.value.length + ' / ' + limit + ' (' + (limit - aTextArea.value.length) + '  characters left)');
    }
  }
  var xpath = "//input[@id='prodPageTitle'] | //input[@id='prodMetaDesc'] | //input[@id='catpagetitle'] | //input[@id='catmetadesc'] | //input[@id='pagemetatitle'] | //input[@id='pagedesc']";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  var i, textarea;
  for (i = 0; textarea = res.snapshotItem(i); ++i) {
    if (!textarea.id)
      textarea.id = '__textarea_' + i;
    charCount(textarea);
    textarea.addEventListener('input', onInput, false);
  }
  
})();
