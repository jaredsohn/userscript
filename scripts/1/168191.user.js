// ==UserScript==
// @name ROBLOX TC BOT
// @include http://www.roblox.com/My/Money.aspx#/#TradeCurrency_tab
// ==/UserScript== 
var Tix_Trades = "CurrencyBidsPane";
var Bux_Trades = "CurrencyOffersPane";
var Limit_Radio = "ctl00_cphRoblox_LimitOrderRadioButton";
var Market_Radio = "ctl00_cphRoblox_MarketOrderRadioButton";
var cur1 = "ctl00_cphRoblox_HaveCurrencyDropDownList";
var cur2 = "ctl00_cphRoblox_WantCurrencyDropDownList";
var hav = "ctl00_cphRoblox_HaveAmountTextBox";
var wnt = "ctl00_cphRoblox_WantAmountTextBox";
var subb = "ctl00_cphRoblox_SubmitTradeButton";
var buxcan = 'ctl00_cphRoblox_ctl02_OpenOffers_OpenOffersListView_ctrl0_ctl00_CancelOfferButton';
var tixcan = 'ctl00_cphRoblox_ctl04_OpenBids_OpenBidsListView_ctrl0_ctl00_CancelBidButton';
var My_Tix = "ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink";
var My_Bux = 'ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink';
var tixa = new Array(20);
var buxa = new Array(20);
var Tix_Trades_Array = new Array(20);
var Bux_Trades_Array = new Array(20);
var MaxTrades = 10;
var My_Tix_Trades = new Array(MaxTrades);
var My_Bux_Trades = new Array(MaxTrades);
var tmnt = 100;
var WaitTime1 = 5000;/* Time to wait before refreshing*/
var WaitTime2 = 500; /* Time to wait before submitting trade */
var WaitTime3 = 20000; /*Time to wait if the rates are bad*/
var WaitTime4 = 2000; /*Time to wait before trying to trade after refreshing*/
var lastamt =0;
var Hist;
var added=0;
var lasttrade = 0;
var Stop = false;
var mytix = 0;
var mybux = 0;
var frame = document.createElement('iframe');
var framedoc;
var rand = Math.floor(Math.random()*1000);
var site = "http://www.roblox.com/marketplace/tradecurrency.aspx";
var Skip = false;
var made_trade = false;
var Last_Trade = true;
var Rate_Threshold = .3;
var CmdBar;
function confirmTrade() {
   return true;
}

function Buffer() {
   /*framedoc.removeChild(framedoc.getElementById('ctl00_cphRoblox_SubmitTradeButton'));
   var sub = framedoc.createElement("input");
   sub.type = "submit";
   sub.id = subb;
   sub.onclick*/
   setTimeout('startTCing()',WaitTime4+rand);
}

function Log(txt) {
   CmdBar.innerText = txt+"n"+CmdBar.innerText.substr(0,256);
}

function getrate() { /*/This here finds the current rates by gathering all the trades and putting them in an array (if you want to put error checking. Unknown if it works with "Market" as the rate)*/
   rand = Math.floor(Math.random()*1000);
   var i=0;
   mytix = parseFloat(framedoc.getElementById(My_Tix).innerHTML.replace(/,/g,""));
   mybux = parseFloat(framedoc.getElementById(My_Bux).innerHTML.replace(/,/g,""));
   var pane = framedoc.getElementById(Tix_Trades).getElementsByTagName('div')[0];
   pane = pane.getElementsByTagName('div');
   for(i=0;i<20;i++) {
      tixa[i] = pane[i].innerHTML.replace(/,/g,"").split("@");
      tixa[i][1] =tixa[i][1].substr(0,tixa[i][1].lastIndexOf(":"));
      tixa[i][0] = parseFloat(tixa[i][0]);
      tixa[i][1] = parseFloat(tixa[i][1]);
   }
   pane = framedoc.getElementById(Bux_Trades).getElementsByTagName('div')[0];
   pane = pane.getElementsByTagName('div');
   for(i=0;i<20;i++) {
      buxa[i] = pane[i].innerHTML.replace(/,/g,"").split("@");
      buxa[i][1] =buxa[i][1].substr(buxa[i][1].lastIndexOf(":")+1);
      buxa[i][0] = parseFloat(buxa[i][0]);
      buxa[i][1] = parseFloat(buxa[i][1]);
   }
}

function TixToBux() { /*Tix to Bux*/
   var amt = parseInt(Math.ceil(((tixa[0][1])*tmnt)+.001));
   if (buxa[0][1] > amt/tmnt) {
      framedoc.getElementById(Limit_Radio).click();
      document.title = "Trade " + String(amt) + " tix for " + String(tmnt);
      framedoc.getElementById(cur1).selectedIndex = 0;
      framedoc.getElementById(cur2).selectedIndex = 0;
      framedoc.getElementById(hav).value = amt;
      framedoc.getElementById(wnt).value = tmnt;
      lasttrade = amt/tmnt;
      Hist.innerHTML = amt+" Tix->"+tmnt+" bux<br/>"+ Hist.innerHTML;
      lastamt = amt;
      lasttrade = amt/tmnt;
      made_trade = true;
      setTimeout('framedoc.getElementById(subb).click()',WaitTime2+rand);
   } else {
      document.title = "Bad Rates (ttb)";
      setTimeout('frame.contentDocument.location.reload(true)',WaitTime3+rand);
   }

}

function BuxToTix() { /*Bux to Tix*/
   var amt = parseInt(Math.floor(((buxa[0][1])*tmnt)-1));
   if (amt > lasttrade*tmnt) {
      framedoc.getElementById(Limit_Radio).click();
      document.title = "Trade "+ String(tmnt) +" bux for " + String(amt);
      framedoc.getElementById(cur1).selectedIndex = 1;
      framedoc.getElementById(cur2).selectedIndex = 1;
      framedoc.getElementById(wnt).value = amt;
      framedoc.getElementById(hav).value = tmnt;
      added = added + (amt-lastamt);
      Hist.innerHTML = tmnt+" Bux -> "+amt+" tix. (+"+added+" tix) <br/>" + Hist.innerHTML.substr(0,128);
      made_trade = true;
      setTimeout('framedoc.getElementById(subb).click();lasttrade = 0;',WaitTime2+rand);
   } else {
      document.title = "Bad Rates (btt)";
      setTimeout('frame.contentDocument.location.reload(true)',WaitTime3+rand);
   }
}

function HasBuxTrade() { /*Checks if you have any running bux trades, you might need to change the id?*/
   framedoc = frame.contentDocument;
   if (framedoc.getElementById(buxcan) != null) {
      document.title = "Have bux trade";
      return true;
   }
   return false;
}

function HasTixTrade() {/*Ditto except for tix, check the id to make sure it's still what I used.*/
   framedoc = frame.contentDocument;
   if (framedoc.getElementById(tixcan) != null) {
      document.title = "Have tix trade";
      return true;
   }
   return false;
}

function Market(amount,tix) {
   framedoc.getElementById(Market_Radio).click();
   document.title = "Market Order";
   if (!tix) {
      Skip = false;
   }
}

function LimitTrade(have,want,to) {
   framedoc.getElementById(Limit_Radio).click();
   document.title = String(have)+" "+to+" "+String(want);
   if (to == "->") {
      framedoc.getElementById(cur1).selectedIndex = 0;
      framedoc.getElementById(cur2).selectedIndex = 0;
   } else {
      framedoc.getElementById(cur1).selectedIndex = 1;
      framedoc.getElementById(cur2).selectedIndex = 1;
   }
   framedoc.getElementById(wnt).value = want;
   framedoc.getElementById(hav).value = have;
}

function MakeDecision() {
   Skip = false;
   var SuperInflated = false;
   if (Last_Trade) { /*next trade is for tix*/
      if (tixa[0][1] - tixa[1][1] < Rate_Threshold) {
         Log("No inflation Detected");
      } else {

         Log("Inflation is "+tixa[0][1] - tixa[1][1]);
      }

   }

}

function startTCing() { /*This is the thingy.*/
   framedoc = frame.contentDocument;
   frame.contentWindow.confirmTrade = confirmTrade;
   getrate(); /*Get Current Rate.*/
   MakeDecision();

   /* if (!Stop) {*/
   if (lasttrade == 0 && (HasBuxTrade() == false) && (HasTixTrade()==false)) /*Checks stuff lol*/ {
      TixToBux();
   } else if((HasBuxTrade() == false) && (HasTixTrade()==false)) {
      BuxToTix();
   }
   setTimeout('frame.contentDocument.location.reload(true)',WaitTime1+rand); /*Loop*/
   /*}*/
}

function hijack() { /*Ignore this, this makes an iframe to allow for 'persistant' data.
    I operate trades on the iframe.*/
   frame.width = window.innerWidth;
   frame.height = window.innerHeight-40;
   frame.style.position = "aboslute";
   frame.style.top = "0px";
   frame.style.left = "0px";
   frame.src = site;
   frame.onload = Buffer;
   document.body.outerHTML = "";
   document.body.appendChild(frame);
   framedoc = frame.contentDocument;
}

function HistoryToggle() { /*Never got around to finishing*/

}

function derp() {
   if (Stop) {
      Stop = false;
   } else {
      Stop = true;
   }
}

function createGUI() { /*I was gonna make a fully featured GUI.*/
   CmdBar = document.createElement('div');
   CmdBar.id = "TCBot_Bar";
   CmdBar.style.position = "fixed";
   CmdBar.style.bottom = "0px";
   CmdBar.style.left = "0px";
   CmdBar.style.width = "100%";
   CmdBar.style.height = "30px";
   CmdBar.style.background = "#edf";
   document.body.appendChild(CmdBar);/* Not adding yet */
   Hist = document.createElement('div');
   Hist.id = "TCBot_History";
   Hist.style.position = "fixed";
   Hist.style.top = "0px";
   Hist.style.left = "0px";
   Hist.style.overflow = "auto";
   Hist.style.height = "50px";
   Hist.style.width = "100%";
   Hist.style.background = "#fef";
   document.body.appendChild(Hist);
   var stopbut = document.createElement('button');
   stopbut.style.position = "absolute";
   stopbut.style.left = "0px";
   stopbut.style.bottom = "100px";
   stopbut.textContent = "Stop/Start";
   stopbut.style.height = "50px";
   stopbut.style.width = "100px";
   document.body.appendChild(stopbut);
   stopbut.onclick = derp;
   var dont = document.createElement('div');
   dont.style.fontSize = "30px";
   dont.style.background = "rgba(200,200,200,.5)";
   dont.innerText= "Don't touch this window!";
   dont.style.position = "absolute";
   dont.style.left = "40%";
   dont.style.top = "40%";
   dont.style.width = "30%";
   dont.style.height = "30%";
   document.body.appendChild(dont);
}

hijack();
createGUI();
/*setTimeout("startTCing()",1000);*/