// ==UserScript==
// @name       Acuro Contact Manager
// @namespace  http://www.acuro.in
// @version    0.1
// @description  ACURO Contact Manager
// @include    https://mail.google.com/mail/contacts/u/0/ui/ContactManager
// @include    https://mail.google.com/mail/contacts/u/0/ui/ContactManager#
// @include    https://www.google.com/contacts_v1/c/u/0/ui/ContactManager?hl=en
// @include    https://www.google.com/contacts_v1/c/u/0/ui/ContactManager?hl=en#
// @icon	C:/Contact.ico
// @version	0.2
// @copyright  2011+, Acuro Organics Limited
// ==/UserScript==


// To change Title
document.title="Acuro Contact Manager"
    
//To replace IMPORT|EXPORT|PRINT options
    var link1;
link1 = document.body.getElementsByTagName("span") 
    for (var i = 0; i < link1.length; i++) {
        if (link1[i].id == "Node26") {
            link1[i].innerHTML='<b>Acuro Organics Limited</b>'

                }     
    }