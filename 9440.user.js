// ==UserScript==
// @name           UK Banks login redirect
// @namespace      znerp
// @description    redirects to online banking login pages for UK banks.
// @include        http://www.abbey.com/csgs/Satellite?pagename=Abbey/GSDistribuidora/GS_Home
// @include        http://www.barclays.co.uk/
// @include        http://www.halifax.co.uk/home/home.asp
// @include        http://www.natwest.com/
// @include        http://www.nationwide.co.uk/default.htm
// @include        http://www.barclaycard.co.uk/
// @include        http://www.hsbc.com/
// @include        http://www.rbs.co.uk/default.htm
// @include        http://www.alliance-leicester.co.uk/home/index.asp
// @include        https://www.northernrock.co.uk/
// @include        http://www.lloydstsb.com/
// ==/UserScript==

switch (document.location.href) {
  case "http://www.natwest.com/":
    location.replace("http://www.natwest.com/redirects/onlinebanking/index.asp");
    break;
  case "http://www.hsbc.com/":
    location.replace("http://www.hsbc.co.uk/1/2/personal/internet-banking");
    break;
  case "http://www.rbs.co.uk/default.htm":
    location.replace("http://www.rbs.co.uk/Bank_Online/logon_to_digital_banking/default.asp?referrer=hmp");
    break;
  case "http://www.alliance-leicester.co.uk/home/index.asp":
    location.replace("http://www.alliance-leicester.co.uk/redir/?page=mybanklogin&src=IBLogin");
    break;
  case "https://www.northernrock.co.uk/":
    location.replace("https://www.northernrock.co.uk/my/");
    break;
  case "http://www.lloydstsb.com/":
    location.replace("http://www.lloydstsb.com/it/cmf/exturl.asp?asset=/assets/link/lloydstsb2004/external/log_on.xml");
    break;
  case "http://www.halifax.co.uk/home/home.asp":
    location.replace("https://www.halifax-online.co.uk/_mem_bin/formslogin.asp?source=halifaxcoukHOME");
    break;
  case "http://www.barclays.co.uk/":
    location.replace("http://www.personal.barclays.co.uk/goto/pfsolb_login");
    break;
  case "http://www.abbey.com/csgs/Satellite?pagename=Abbey/GSDistribuidora/GS_Home":
    location.replace("https://myonlineaccounts2.abbeynational.co.uk/CentralLogonWeb/Logon?action=prepare");
    break;
  case "http://www.nationwide.co.uk/default.htm":
    location.replace("https://olb2.nationet.com/signon/index2.asp");
    break;
  case "http://www.barclaycard.co.uk/":
    location.replace("https://bcol.barclaycard.co.uk/ecom/as/doLogon.do?ID=null");
    break;
  default:
    GM_log("an error occured");
}