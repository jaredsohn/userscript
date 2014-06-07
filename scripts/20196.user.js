// ==UserScript==
// @name Violet
// @CSS feita por Eddie
// @Adaptaï¿½ï¿½o para Greasemonkey por Igor Thiago
// @include http://*orkut.com/**
// @exclude *.js
// ==/UserScript==



var um,dois;
    um = document.getElementsByTagName('head')[0] ;
    if (!um) { return; }
    dois = document.createElement('style');
    dois.type = 'text/css';
    dois.innerHTML = 'div.navPanelTop, div.navPanelBottom { background: transparent !important; border: 0px !important;}';
    um.appendChild(dois);

css = 'data:text/css;base64,' +
		'LyoNClNraW4gQ1NTIHBhcmEgb3JrdXQgbmEgY29yIENhbWFsZW9uIGZlaXRvIHBvciBlZGRpZSANClZl' +
		'cnNhbyBPcmNoaWQNClZlcnNhbyAwLjIgKCAyNi8xMC8yMDA2ICkNCiovDQoNCi8qIExJTktTICovDQph' +
		'W2hyZWZdDQp7DQoJY29sb3I6ICMzMzMgIWltcG9ydGFudDsNCgl0ZXh0LWRlY29yYXRpb246IHVuZGVy' +
		'bGluZSAhaW1wb3J0YW50Ow0KfQ0KYVtocmVmXTpob3Zlcg0Kew0KCWNvbG9yOiAjY2NjICFpbXBvcnRh' +
		'bnQ7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7DQp9DQoNCi8qIENPUiBEQVMgTEVU' +
		'UkFTICovDQpsaSx0ZXh0YXJlYSxib2R5LHRhYmxlLHRkW2NsYXNzKj1wYW5lbF0sc3Bhbix0ZFtpZCo9' +
		'dGFiXSwNCnRkW2NsYXNzKj1jYXRdLHRkW2lkPSJoZWFkZXJNZW51Il0sdGRbY2xhc3M9bmF2SW5mb10s' +
		'DQp0YWJsZS5rYXJtYXRhYmxlIHRkLHRhYmxlLmZyaWVuZHRhYmxlIHRkLHRkW2NsYXNzPSJyb3cwIl0s' +
		'dHJbY2xhc3M9InJvdzAiXSwNCnRkW2NsYXNzKj0idGFiIl0sdHJbYmdjb2xvcj0iI2U1ZWNmNCJdLHRy' +
		'W2JnY29sb3I9IiNiZmQwZWEiXSwNCmFbY2xhc3M9ImNhdGVnb3J5X2xpbmsiXSxkaXZbY2xhc3M9InJv' +
		'dzEiXSx0ZFthbGlnbj0icmlnaHQiXSwNCnRyW2NsYXNzPSJwYW5lbEhlYWRlciJdLHRyW2JnY29sb3I9' +
		'IiNjOWQ2ZWIiXSxpbnB1dCxmb3JtLG9wdGlvbixzZWxlY3QsDQp0ZFtjbGFzcz1yb3dMYWJlbF0sDQp0' +
		'cltjbGFzcz0icm93MSJdLHRkW2NsYXNzPSJyb3cxIl0sdHJbY2xhc3M9Im1lc3NhZ2VCb2R5Il0sdHJb' +
		'Ymdjb2xvcj0iI2Q0ZGRlZCJdDQp7DQoJY29sb3I6ICNmZmYgIWltcG9ydGFudDsNCn0NCg0KLyogQ09S' +
		'IEZVTkRPIDEgKi8NCmxpLGJvZHksdGFibGUsdGRbY2xhc3MqPXBhbmVsXSxzcGFuLHRkW2lkKj10YWJd' +
		'LA0KdGRbY2xhc3MqPWNhdF0sdGRbaWQ9ImhlYWRlck1lbnUiXSx0ZFtjbGFzcz1uYXZJbmZvXSwNCnRh' +
		'YmxlLmthcm1hdGFibGUgdGQsdGFibGUuZnJpZW5kdGFibGUgdGQsdGRbY2xhc3M9InJvdzAiXSx0cltj' +
		'bGFzcz0icm93MCJdLA0KdGRbY2xhc3MqPSJ0YWIiXSx0cltiZ2NvbG9yPSIjZTVlY2Y0Il0sdHJbYmdj' +
		'b2xvcj0iI2JmZDBlYSJdLA0KYVtjbGFzcz0iY2F0ZWdvcnlfbGluayJdLA0KdHJbY2xhc3M9InBhbmVs' +
		'SGVhZGVyIl0sdHJbYmdjb2xvcj0iI2M5ZDZlYiJdLHRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxp' +
		'Z249InJpZ2h0Il0NCnsNCgliYWNrZ3JvdW5kOiAjOEI0Nzg5ICFpbXBvcnRhbnQ7DQp9DQoNCi8qIENP' +
		'UiBGVU5ETyAyICovDQppbnB1dCxkaXZbY2xhc3M9InJvdzEiXSxmb3JtLG9wdGlvbixzZWxlY3QsdGV4' +
		'dGFyZWEsdHJbY2xhc3M9InJvdzEiXSx0ZFtjbGFzcz0icm93MSJdLHRyW2NsYXNzPSJtZXNzYWdlQm9k' +
		'eSJdLHRyW2JnY29sb3I9IiNkNGRkZWQiXQ0Kew0KCWJhY2tncm91bmQtY29sb3I6ICNDRDY5QzkgIWlt' +
		'cG9ydGFudDsNCn0NCg0KLyogQ09SIERBUyBCT1JEQVMgKi8NCmxpLHRleHRhcmVhLGJvZHksdGFibGUs' +
		'dGRbY2xhc3MqPXBhbmVsXSxzcGFuLHRkW2lkKj10YWJdLA0KdGRbY2xhc3MqPWNhdF0sdGRbaWQ9Imhl' +
		'YWRlck1lbnUiXSx0ZFtjbGFzcz1uYXZJbmZvXSwNCnRhYmxlLmthcm1hdGFibGUgdGQsdGFibGUuZnJp' +
		'ZW5kdGFibGUgdGQsdGRbY2xhc3M9InJvdzAiXSx0cltjbGFzcz0icm93MCJdLA0KdGRbY2xhc3MqPSJ0' +
		'YWIiXSx0cltiZ2NvbG9yPSIjZTVlY2Y0Il0sdHJbYmdjb2xvcj0iI2JmZDBlYSJdLA0KYVtjbGFzcz0i' +
		'Y2F0ZWdvcnlfbGluayJdLGRpdltjbGFzcz0icm93MSJdLHRkW2FsaWduPSJyaWdodCJdLA0KdHJbY2xh' +
		'c3M9InBhbmVsSGVhZGVyIl0sdHJbYmdjb2xvcj0iI2M5ZDZlYiJdLGlucHV0LGZvcm0sb3B0aW9uLHNl' +
		'bGVjdA0Kew0KCWJvcmRlci1jb2xvcjogI0ZGODNGQSAhaW1wb3J0YW50Ow0KfQ0KDQoNCg0KLyogTUVO' +
		'VSAqLw0KbGkubmF2TGlzdCBhDQp7IA0KY29sb3I6ICMwMDAgIWltcG9ydGFudDsNCmJhY2tncm91bmQt' +
		'Y29sb3I6ICNDRDY5QzkgIWltcG9ydGFudDsgDQp0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFu' +
		'dDsNCn0NCmxpLm5hdkxpc3QgYTpob3ZlciANCnsgDQpjb2xvcjogIzMzMyAhaW1wb3J0YW50Ow0KYmFj' +
		'a2dyb3VuZC1jb2xvcjogI0ZGODNGQSAhaW1wb3J0YW50OyANCn0NCg0KLyogQURBUFRBQ09FUyAqLw0K' +
		'DQoNCnRkW3ZhbGlnbj0idG9wIl1bYWxpZ249InJpZ2h0Il0sDQp0ZFthbGlnbj0icmlnaHQiXVtub3dy' +
		'YXBdLA0KdGRbYWxpZ249InJpZ2h0Il1bc3R5bGU9InBhZGRpbmc6IDBwdCA1cHg7Il0NCnsgDQpiYWNr' +
		'Z3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50IA0KfQ0KaW1nW3NyYyo9Imlfc29jaWFsX2J3Lmdp' +
		'ZiJdLA0KaW1nW3NyYyo9ImlfcHJvZmVzc2lvbmFsX2NvbG9yLmdpZiJdLA0KaW1nW3NyYyo9ImlfcGVy' +
		'c29uYWxfY29sb3IuZ2lmIl0sDQppbWdbc3JjKj0idGFiYW5nbGVfYmx1ZS5naWYiXSwNCmltZ1tzcmMq' +
		'PSJpX3NvY2lhbF9jb2xvci5naWYiXSwNCmltZ1tzcmMqPSJ0YWJhbmdsZV9ncmV5LmdpZiJdLA0KaW1n' +
		'W3NyYyo9ImlfcHJvZmVzc2lvbmFsX2J3LmdpZiJdLA0KaW1nW3NyYyo9ImlfcGVyc29uYWxfYncuZ2lm' +
		'Il0sDQppbWdbc3JjKj0idGFiX2dyYXkuZ2lmIl0sDQppbWdbc3JjKj0idGFiX2J0eF9ncmF5LmdpZiJd' +
		'LA0KaW1nW3NyYyo9InRhYl9ibHVlLmdpZiJdLA0KdGFibGVbaWQ9ImZvb3RlciJdLA0KdGRbc3R5bGUq' +
		'PSJ0cjEwLmdpZiJdLA0KdGRbYmFja2dyb3VuZCo9InRyNC5naWYiXQ0Kew0KCWRpc3BsYXk6IG5vbmUg' +
		'IWltcG9ydGFudDsNCn0NCnRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxpZ249InJpZ2h0Il0NCnsN' +
		'CmRpc3BsYXk6bm9uZSAhaW1wb3J0YW50Ow0KfQ0KdGRbaWQ9ImhlYWRlck1lbnUiXQ0Kew0KdGV4dC1h' +
		'bGlnbjogY2VudGVyICFpbXBvcnRhbnQ7DQpjb2xvcjojQ0Q2OUM5ICFpbXBvcnRhbnQ7DQpiYWNrZ3Jv' +
		'dW5kOiAjQ0Q2OUM5ICFpbXBvcnRhbnQ7DQp9DQppbWdbc3JjKj0iYWxwaCJdDQp7DQoJbWF4LXdpZHRo' +
		'OiAwcHggIWltcG9ydGFudDsgDQoJbWF4LWhlaWdodDogMHB4ICFpbXBvcnRhbnQ7IA0KfQ0KaW1nW3Ny' +
		'Yyo9ImFscGgiXTphZnRlcg0KeyANCgljb250ZW50OiBhdHRyKGFsdCkgIWltcG9ydGFudDsNCn0NCg0K' +
		'I2hlYWRlck1lbnUgYTpsaW5rLCAjaGVhZGVyTWVudSBhOnZpc2l0ZWQgew0KCXRleHQtZGVjb3JhdGlv' +
		'bjpub25lICFpbXBvcnRhbnQ7DQoJbWFyZ2luIDogNXB4Ow0KCWZvbnQtc2l6ZTogMTJweDsNCn0NCg0K' +
		'dGRbdmFsaWduPSJ0b3AiXVt3aWR0aD0iNTk0Il0gew0KCXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7DQp9';



  style = document.createElement('link');
  style . href = css ;
  style . rel  = 'stylesheet';
  style . type = 'text/css';
 
document.getElementsByTagName('head').item(0).appendChild(style)