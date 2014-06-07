// ==UserScript==
// @name           Google Emoticons [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/74432
// @description    Smilies Set for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="Google" href="https://mail.google.com/mail/e/">001#.gif,002#.gif,003#.gif,004#.gif,005#.gif,006#.gif,007#.gif,008#.gif,009#.gif,010#.gif,011#.gif,012#.gif,013#.gif,014#.gif,015#.gif,016#.gif,017#.gif,018#.gif,019#.gif,020#.gif,021#.gif,022#.gif,023#.gif,024#.gif,025#.gif,026#.gif,027#.gif,028#.gif,029#.gif,030#.gif,031#.gif,032#.gif,033#.gif,034#.gif,035#.gif,036#.gif,037#.gif,038#.gif,039#.gif,040#.gif,041#.gif,042#.gif,043#.gif,044#.gif,045#.gif,046#.gif,047#.gif,048#.gif,049#.gif,050#.gif,051#.gif,052#.gif,053#.gif,054#.gif,055#.gif,056#.gif,057#.gif,058#.gif,059#.gif,060#.gif,061#.gif,062#.gif,063#.gif,064#.gif,065#.gif,066#.gif,067#.gif,068#.gif,069#.gif,070#.gif,071#.gif,072#.gif,073#.gif,074#.gif,075#.gif,076#.gif,077#.gif,078#.gif,079#.gif,080#.gif,081#.gif,082#.gif,083#.gif,084#.gif,085#.gif,086#.gif,087#.gif,088#.gif,089#.gif,090#.gif,091#.gif,092#.gif,093#.gif,094#.gif,095#.gif,096#.gif,097#.gif,098#.gif,099#.gif,100#.gif,101#.gif,102#.gif,103#.gif,104#.gif,105#.gif,106#.gif,107#.gif,108#.gif,109#.gif,110#.gif,111#.gif,112#.gif,113#.gif,114#.gi115#.gif,116#.gif,117#.gif,118#.gif,119#.gif,120#.gif,121#.gif,122#.gif,123#.gif,124#.gif,125#.gif,126#.gif,127#.gif,128#.gif,129#.gif,130#.gif,131#.gif,132#.gif,133#.gif,134#.gif,135#.gif,136#.gif,137#.gif,138#.gif,139#.gif,140#.gif,141#.gif,142#.gif,143#.gif,144#.gif,145#.gif,146#.gif,147#.gif,148#.gif,149#.gif,150#.gif,151#.gif,152#.gif,153#.gif,154#.gif,155#.gif,156#.gif,157#.gif,158#.gif,159#.gif,160#.gif,161#.gif,162#.gif,163#.gif,164#.gif,165#.gif,166#.gif,167#.gif,168#.gif,169#.gif,170#.gif,171#.gif,172#.gif,173#.gif,174#.gif,175#.gif,176#.gif,177#.gif,178#.gif,179#.gif,180#.gif,181#.gif,182#.gif,183#.gif,184#.gif,185#.gif,186#.gif,187#.gif,188#.gif,189#.gif,190#.gif,191#.gif,192#.gif,193#.gif,194#.gif,195#.gif,196#.gif,197#.gif,198#.gif,199#.gif,200#.gif,201#.gif,202#.gif,203#.gif,204#.gif,205#.gif,206#.gif,207#.gif,208#.gif,209#.gif,210#.gif,211#.gif,212#.gif,213#.gif,214#.gif,215#.gif,216#.gif,217#.gif,218#.gif,219#.gif,220#.gif,221#.gif,222#.gif,223#.gif,224#.gif,225#.gif,226#.gif,227#.gif,228#.gif,229#.gif,230#.gif,231#.gif,232#.gif,233#.gif,234#.gif,235#.gif,236#.gif,237#.gif,238#.gif,239#.gif,240#.gif,241#.gif,242#.gif,243#.gif,244#.gif,245#.gif,246#.gif,247#.gif,248#.gif,249#.gif,250#.gif,251#.gif,252#.gif,253#.gif,254#.gif,255#.gif,256#.gif,257#.gif,258#.gif,259#.gif,260#.gif,261#.gif,262#.gif,263#.gif,264#.gif,265#.gif,266#.gif,267#.gif,268#.gif,269#.gif,270#.gif,271#.gif,272#.gif,273#.gif,274#.gif,275#.gif,276#.gif,277#.gif,278#.gif,279#.gif,280#.gif,281#.gif,282#.gif,283#.gif,284#.gif,285#.gif,286#.gif,287#.gif,288#.gif,289#.gif,290#.gif,291#.gif,292#.gif,293#.gif,294#.gif,295#.gif,296#.gif,297#.gif,298#.gif,299#.gif,300#.gif,301#.gif,302#.gif,303#.gif,304#.gif,305#.gif,306#.gif,307#.gif,308#.gif,309#.gif,310#.gif,311#.gif,312#.gif,313#.gif,314#.gif,315#.gif,316#.gif,317#.gif,318#.gif,319#.gif,320#.gif,321#.gif,322#.gif,323#.gif,324#.gif,325#.gif,326#.gif,327#.gif,328#.gif,329#.gif,330#.gif,331#.gif,332#.gif,333#.gif,334#.gif,335#.gif,336#.gif,337#.gif,338#.gif,339#.gif,340#.gif,341#.gif,342#.gif,343#.gif,344#.gif,345#.gif,346#.gif,347#.gif,348#.gif,349#.gif,350#.gif,351#.gif,352#.gif,353#.gif,354#.gif,355#.gif,356#.gif,357#.gif,358#.gif,359#.gif,360#.gif,361#.gif,362#.gif,363#.gif,364#.gif,365#.gif,366#.gif,367#.gif,368#.gif,369#.gif,500#.gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);