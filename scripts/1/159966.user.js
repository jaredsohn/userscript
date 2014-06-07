// ==UserScript==
// @name           select online HDFC
// @namespace      YASTIKA KAUSHAL
// @description    select HDFC Internet Banking 
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
// ==/UserScript==
function selectOnlineHDFC() {
    var form = document.forms.namedItem('BookTicketForm');
    var radioObj, radioLength;
    //alert("BookTicketForm");
    if(form) {
        //to click the "make payment" button
        //var paymentButton = form.elements.namedItem('Submit');
        //if(paymentButton.value == 'Make Payment') {
        //    paymentButton.click();
        //}
       
        //to choose the payment option
        //setBank(11,0,1); for HDFC - Internet Banking
        radioObj = form.elements.namedItem('gatewayIDV');
       
        if(radioObj) {
          
            form.elements.namedItem('paymentMode').value = "0";
         
            form.elements.namedItem('pgType').value = "1";
           
            form.elements.namedItem('gatewayID').value = "2";
           
            form.elements.namedItem('buyTicket').value = "0";
           
            form.elements.namedItem('screen').value = "paymnt";
           
           
            if (form.elements.namedItem('TatkalOpt').value == "Y") { 
                form.elements.namedItem('CKFARE').value = "CKFARE";
            }
            //if (document.BookTicketForm.TatkalOpt.value == "Y") {
            //    document.BookTicketForm.TatkalOpt.value = "Y";
            //    document.BookTicketForm.CKFARE.value = "CKFARE";
            //}
           
            form.elements.namedItem('submitClicks').value = parseInt(form.elements.namedItem('submitClicks').value) + 1;
            //document.BookTicketForm.submitClicks.value = parseInt(document.BookTicketForm.submitClicks.value) + 1;
           
            form.submit();
           
            return true;
        }
       
    }//if
}
selectOnlineHDFC();