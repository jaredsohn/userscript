// ==UserScript==
// @name           new look done card
// @namespace      
// @description    gives a good clearer look to donecard.com
// @include        *
// ==/UserScript==

GM_addStyle(
<><![CDATA[

 #ctl00_NewLoginUserContentPlaceHolder_Table1 > tbody > tr:first-child {
    display: none
}
 #ctl00_NewLoginUserContentPlaceHolder_dgCardTransaction_GridData {
    height: auto !important;
    overflow: visible !important;
}
 #ctl00_NewLoginUserContentPlaceHolder_dgCardTransaction_ctl01 > tbody > tr > td:first-child+td+td+td+td {
    color: green
}
 #ctl00_NewLoginUserContentPlaceHolder_dgCardTransaction_ctl01>tbody>tr>td:first-child+td+td+td+td+td {
    color: red
}

]]></> + ""
);