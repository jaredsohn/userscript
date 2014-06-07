// ==UserScript==
// @name           cibus hebrew fix
// @namespace      cibushebrewfix
// @description    cibus hebrew fix
// @include        http://www.cibus.co.il/*
// @//include        http://www.cibus.co.il/EmpNN/HS_EMP_Menu.asp*
// @//include        http://www.cibus.co.il/EmpNN/HS_EMP_Restaurants.asp*
// @exclude        http://www.cibus.co.il/Secure/Login.asp*
// @author         Original (israel)
// ==/UserScript==

var s=new String(document.body.innerHTML);
s=s.replace(/dir="rtl"/ig,'');
s=s.replace(/dir="ltr"/ig,'');
document.body.innerHTML = s;
