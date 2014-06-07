// ==UserScript==
// @name           payment option
// @namespace      
// @description    show balance itz in irctc
// @include        *https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do?click=true
// ==/UserScript==

<tr>
   <td align="left" class="normaltxt" colspan="2"><b>Payment Options</b></td>
   <td>







 <select name="gatewayID" onchange="GetSerCahrge(document.BookTicketForm.gatewayID.value);" class="formText135">

 <option value="select">-- Select One --</option>


                        <option value="0">Gateway 2(Operated By ICICI)</option>

                      
                        <option value="1">Gateway 1(Operated By Citibank)</option>

                      
                        <option value="2">HDFC Bank</option>

                      
                        <option value="3">ICICI Bank</option>

                      
                        <option value="4">IDBI Bank</option>

                      
                        <option value="7">CITI Debit</option>

                      
                        <option value="9">ITZ Cash Card</option>

                      
                        <option value="11">State Bank Of India</option>

                      
                        <option value="12">Punjab National Bank</option>

                      
                        <option value="13">American Express Bank Gateway</option>

                      
                        <option value="15">Corporation Bank</option>

                      
                        <option value="16">Federal Bank</option>

                      
                        <option value="17">CITI Bank EMI</option>

                      
                        <option value="18">Syndicate Bank</option>

                      
                        <option value="19">Union Bank</option>

                      
                        <option value="23">IndusInd Bank</option>

                      
                        <option value="24">I Cash Card</option>

                      
                        <option value="30">Andhra Bank</option>

                      
                        <option value="28">Karnataka Bank</option>

                      
                        <option value="31">DoneCard</option>

                      
                        <option value="25">SBI Debit Card</option>

                      
                        <option value="34">Bank Of India</option>

                      
                        <option value="42">SBIAssociate</option>

                      
                        <option value="45">Indian Bank</option>

                      
                        <option value="44">Canara Bank</option>

                      
                        <option value="48">Bank Of Baroda</option>

                      
                        <option value="39">HDFC Bank Payment Gateway</option>

                      
                        <option value="51">oxicash</option>

                      
   </select>

   

<script language="JavaScript">
<!--
function setBank(gatewayID,payMode,pgType)
{
	window.opener.document.BookTicketForm.paymentMode.value=payMode;
	window.opener.document.BookTicketForm.pgType.value=pgType;
	window.opener.document.BookTicketForm.gatewayID.value=gatewayID;
	window.opener.document.BookTicketForm.buyTicket.value="0";
	window.opener.document.BookTicketForm.screen.value="paymnt";
	window.opener.document.BookTicketForm.Submit.click();
	window.close();
}

function openWin(url,name,w,h)
{
	 var att = "width="+ w +",height="+ h +"left=0,top=100,toolbar=yes,menubar=yes,scrollbars=yes,status=no,resizable=yes,location=yes"
	 window.open(url,'',att)
	 return false;
} //end of function

//-->
</script></td>
   </tr>