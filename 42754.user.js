// ==UserScript==
// @name           posttest
// @namespace      diamethuel
// @description    autofill
// @include        *postyourtest.com/node/add/test
// ==/UserScript==

{

// Title
    document.getElementById("edit-title").value = 'Math 131A';
// City
    document.getElementById("edit-locations-0-city").value = 'Los Angeles';
// Country
    document.getElementById("edit-locations-0-country").value = 'us';
// University Full Name
    document.getElementById("edit-taxonomy-tags-11").value = '"University of California, Los Angeles"';
// Department
    document.getElementById("edit-taxonomy-tags-6").value = 'Chemistry';
// Professor
    document.getElementById("edit-taxonomy-tags-7").value = 'Chatterjee';
// Class
    document.getElementById("edit-taxonomy-tags-8").value = 'Chem30A';
// Confirmation Email
    document.getElementById("edit-field-emailconfirm-0-email").value = 'diamethuel@hotmail.com';
    
}
