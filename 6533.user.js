// ==UserScript==
// @name            SpamCop Automator
// @namespace       http://www.spamcop.net/
// @description     Automatically submit all spamcop reports.  Just click "Report Spam Messages" on the spamcop page or submit a spam while this script is installed.
// @include         http://www.spamcop.net/sc*
// ==/UserScript==


(function(){var forms=document.getElementsByName('sendreport');if(forms.length==1){forms[0].submit();}else{var x,n,nD,z,i; function htmlEscape(s){s=s.replace(/&/g,'&amp;');s=s.replace(/>/g,'&gt;');s=s.replace(/</g,'&lt;');return s;} function attrQuoteEscape(s){s=s.replace(/&/g,'&amp;'); s=s.replace(/"/g, '&quot;');return s;} x='sc?id='; n=0; if(x!=null) { x=x.toLowerCase(); z = document.links; for (i = 0; i < z.length; ++i) { if ((z[i].innerHTML && z[i].innerHTML.toLowerCase().indexOf(x) != -1) || z[i].href.toLowerCase().indexOf(x) != -1 ) { location.href=attrQuoteEscape(z[i].href) } } }}})();
