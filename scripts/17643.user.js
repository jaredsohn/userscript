Source for "Add related Community..!!"

   1. // ==UserScript==
   2. // @name           Add related Community..!!
   3. // @author         Sibo
   4. // @provided by    http://www.orkut.com
   5. // @description    It adds related communities on Orkut u want :)
   6. // @include        *.orkut.com/CommunitySearch.aspx*
   7. // ==/UserScript==
   8.
   9.
  10. a=document.forms[1]; a.action='/CommunitySearch.aspx?cmm='+ a.elements[2].value+ '&relatedId='+ prompt("type the comm id u want to add:","41646677")+ '&Action.addRelated';a.submit()