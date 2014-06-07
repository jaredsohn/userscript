// ==UserScript==
// @name	Stock Quotes Only
// @description	Makes stock quotes the only thinig that shows.
// @include	*https://demo.rcgonyx.com/ONYXWEB/Trade/Trade.aspx*
// @version	2
// ==/UserScript==

document.getElementById("pnl-quotes").style.width = "500 px";
document.getElementById("pnl-quotes").style.height = "500 px";
document.getElementById("pnl-quotes").style.float = "right";
document.getElementById("pnl-ticket").style.width = "0%";
document.getElementById("pnl-contracts").style.width = "0%";
document.getElementById("pnl-positions").style.width = "0%";
document.getElementById("pnl-orders").style.width = "0%";
document.getElementById("pnl-fills").style.width = "0%";
document.getElementById("pnl-messages").style.width = "0%";
document.getElementById("pnl-header").style.display = "none";
document.getElementById("studyMain").style.display = "none";
document.getElementById("study1").style.display = "none";
document.getElementById("java_notInstalled").style.display = "none";
document.getElementById("ticket_Pad").style.display = "none";
document.getElementById("paramSection1").style.display = "none";
document.getElementById("ddlStudy1").style.display = "none";
document.getElementById("tifCalendar").style.display = "none";
document.getElementById("pnlParam1").style.display = "none";
document.getElementById("pnlParam2").style.display = "none";
document.getElementById("pnlParam3").style.display = "none";
document.getElementsByClassName("tradeColumn").item(1).style.width = "0%";
document.getElementsByClassName("chartColumn").item(1).style.width = "0%";
document.getElementsByClassName("removeColumn").item(1).style.margin = "0px";
