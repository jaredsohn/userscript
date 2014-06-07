// ==UserScript==
// @name           Newegg Tracking Links
// @include        *newegg.com/Info/TrackOrder.aspx?*TrackingNumber=*
// @version                1.0
// ==/UserScript==
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
return true;
}
var newLabel = document.createElement("a");
newLabel.innerHTML = "     <a href='http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=" + window.location.href.toString().split("=")[1] + "&track.x=0&track.y=0'>UPS</a>     <a href='https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=" + window.location.href.toString().split("=")[1] + "&qtc_senddate1=&qtc_zipcode1='>USPS</a>     <a href='http://www.fedex.com/Tracking?cntry_code=us&tracknumber_list=" + window.location.href.toString().split("=")[1] + "&language=english'>FedEx</a>"
insertAfter(newLabel,document.getElementsByClassName("trackNumTitle")[0].childNodes[1]);