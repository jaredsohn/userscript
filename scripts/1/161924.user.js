// ==UserScript==
// @name        Jira Repository list sort
// @namespace   jira
// @version     1
// @grant       none
// ==/UserScript==

function sortList(){

    // This <tr> tag is the only element I can find with an id.
    contener = document.getElementById("fld_repository");
    // Find the <select> element
    selectElement = contener.getElementsByTagName("select")[0];
    
    // This is the number of repositories
    len     = selectElement.length;
    
    // Create a new list of elements and sort them
    myList = new Array();
    for (var i=0; i<len; i++) {
        myList[i] = selectElement[i].value;
    }
    newItems = myList.sort();
   
    // clear the actual list of elements
    selectElement.length = 0;
    
    // add the new sorted list into the <select>
    for ( var i = 0; i < len; i++ ) {
      selectElement.add(new Option(newItems[i]));
    }
}

function main(){

    // determine this is a Jira page: the body id must be "jira"
    if (document.body.id != 'jira') return;
    
    // determine this is the good page we are looking for
    url = self.location.toString();
    if (url.indexOf("/secure/admin/AssociateProjectRepPath") == -1) return;

    // This is the good page we are looking for. Let's sort!
    sortList();
    
}

main();