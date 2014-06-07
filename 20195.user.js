// ==UserScript==
// @name Light Blue
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
		'cnNhbyBMaWdodCBCbHVlDQpWZXJzYW8gMC4yICggMjYvMTAvMjAwNiApDQoqLw0KDQovKiBMSU5LUyAq' +
		'Lw0KYVtocmVmXQ0Kew0KCWNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7DQoJdGV4dC1kZWNvcmF0aW9uOiB1' +
		'bmRlcmxpbmUgIWltcG9ydGFudDsNCn0NCmFbaHJlZl06aG92ZXINCnsNCgljb2xvcjogI2NjYyAhaW1w' +
		'b3J0YW50Ow0KCXRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50Ow0KfQ0KDQovKiBDT1IgREFT' +
		'IExFVFJBUyAqLw0KbGksdGV4dGFyZWEsYm9keSx0YWJsZSx0ZFtjbGFzcyo9cGFuZWxdLHNwYW4sdGRb' +
		'aWQqPXRhYl0sDQp0ZFtjbGFzcyo9Y2F0XSx0ZFtpZD0iaGVhZGVyTWVudSJdLHRkW2NsYXNzPW5hdklu' +
		'Zm9dLA0KdGFibGUua2FybWF0YWJsZSB0ZCx0YWJsZS5mcmllbmR0YWJsZSB0ZCx0ZFtjbGFzcz0icm93' +
		'MCJdLHRyW2NsYXNzPSJyb3cwIl0sDQp0ZFtjbGFzcyo9InRhYiJdLHRyW2JnY29sb3I9IiNlNWVjZjQi' +
		'XSx0cltiZ2NvbG9yPSIjYmZkMGVhIl0sDQphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0sZGl2W2NsYXNz' +
		'PSJyb3cxIl0sdGRbYWxpZ249InJpZ2h0Il0sDQp0cltjbGFzcz0icGFuZWxIZWFkZXIiXSx0cltiZ2Nv' +
		'bG9yPSIjYzlkNmViIl0saW5wdXQsZm9ybSxvcHRpb24sc2VsZWN0LA0KdGRbY2xhc3M9cm93TGFiZWxd' +
		'LA0KdHJbY2xhc3M9InJvdzEiXSx0ZFtjbGFzcz0icm93MSJdLHRyW2NsYXNzPSJtZXNzYWdlQm9keSJd' +
		'LHRyW2JnY29sb3I9IiNkNGRkZWQiXQ0Kew0KCWNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7DQp9DQoNCi8q' +
		'IENPUiBGVU5ETyAxICovDQpsaSxib2R5LHRhYmxlLHRkW2NsYXNzKj1wYW5lbF0sc3Bhbix0ZFtpZCo9' +
		'dGFiXSwNCnRkW2NsYXNzKj1jYXRdLHRkW2NsYXNzPW5hdkluZm9dLHRhYmxlLmthcm1hdGFibGUgdGQs' +
		'dGFibGUuZnJpZW5kdGFibGUgdGQsdGRbY2xhc3M9InJvdzAiXSx0cltjbGFzcz0icm93MCJdLA0KdGRb' +
		'Y2xhc3MqPSJ0YWIiXSx0cltiZ2NvbG9yPSIjZTVlY2Y0Il0sdHJbYmdjb2xvcj0iI2JmZDBlYSJdLA0K' +
		'YVtjbGFzcz0iY2F0ZWdvcnlfbGluayJdLA0KdHJbY2xhc3M9InBhbmVsSGVhZGVyIl0sdHJbYmdjb2xv' +
		'cj0iI2M5ZDZlYiJdLHRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxpZ249InJpZ2h0Il0NCnsNCgli' +
		'YWNrZ3JvdW5kOiAjNjg4MzhCICFpbXBvcnRhbnQ7DQp9DQoNCi8qIENPUiBGVU5ETyAyICovDQppbnB1' +
		'dCxkaXZbY2xhc3M9InJvdzEiXSx0ZFtpZD0iaGVhZGVyTWVudSJdLGZvcm0sb3B0aW9uLHNlbGVjdCx0' +
		'ZXh0YXJlYSx0cltjbGFzcz0icm93MSJdLHRkW2NsYXNzPSJyb3cxIl0sdHJbY2xhc3M9Im1lc3NhZ2VC' +
		'b2R5Il0sdHJbYmdjb2xvcj0iI2Q0ZGRlZCJdDQp7DQoJYmFja2dyb3VuZC1jb2xvcjogIzlBQzBDRCAh' +
		'aW1wb3J0YW50Ow0KfQ0KDQppbWdbc3JjKj0nYmwuZ2lmJ10saW1nW3NyYyo9J2JyLmdpZiddew0KCWRp' +
		'c3BsYXk6bm9uZSAhaW1wb3J0YW50Ow0KfQ0KDQoNCnRkW3N0eWxlKj0iYm0uZ2lmIl0NCnsNCiAgIHRl' +
		'eHQtYWxpZ246IGNlbnRlcjsNCiAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7DQoJYmFja2dyb3VuZDog' +
		'IzlBQzBDRCAhaW1wb3J0YW50Ow0KICAgYm9yZGVyOiAycHggb3V0c2V0ICM2ODgzOEI7DQoJcGFkZGlu' +
		'ZzogM3B4ICFpbXBvcnRhbnQ7DQoJLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnQ6IDFlbTsgDQoJLW1v' +
		'ei1ib3JkZXItcmFkaXVzLXRvcHJpZ2h0OiAxZW07DQoJLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbXJp' +
		'Z2h0OiAxZW07IA0KCS1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07DQp9DQoNCg0KI2hl' +
		'YWRlck1lbnUgYTpsaW5rLCNoZWFkZXJNZW51IGE6dmlzaXRlZHsNCgliYWNrZ3JvdW5kLWNvbG9yOiAj' +
		'OWFjMGNkICFpbXBvcnRhbnQ7DQoJbWFyZ2luOjVweDsNCiAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAh' +
		'aW1wb3J0YW50Ow0KCX0NCg0KI2hlYWRlck1lbnUgew0KCWNvbG9yOiAjOWFjMGNkICFpbXBvcnRhbnQ7' +
		'DQp9CQ0KDQoNCi8qIENPUiBEQVMgQk9SREFTICovDQpsaSx0ZXh0YXJlYSxib2R5LHRhYmxlLHRkW2Ns' +
		'YXNzKj1wYW5lbF0sc3Bhbix0ZFtpZCo9dGFiXSwNCnRkW2NsYXNzKj1jYXRdLHRkW2lkPSJoZWFkZXJN' +
		'ZW51Il0sdGRbY2xhc3M9bmF2SW5mb10sDQp0YWJsZS5rYXJtYXRhYmxlIHRkLHRhYmxlLmZyaWVuZHRh' +
		'YmxlIHRkLHRkW2NsYXNzPSJyb3cwIl0sdHJbY2xhc3M9InJvdzAiXSwNCnRkW2NsYXNzKj0idGFiIl0s' +
		'dHJbYmdjb2xvcj0iI2U1ZWNmNCJdLHRyW2JnY29sb3I9IiNiZmQwZWEiXSwNCmFbY2xhc3M9ImNhdGVn' +
		'b3J5X2xpbmsiXSxkaXZbY2xhc3M9InJvdzEiXSx0ZFthbGlnbj0icmlnaHQiXSwNCnRyW2NsYXNzPSJw' +
		'YW5lbEhlYWRlciJdLHRyW2JnY29sb3I9IiNjOWQ2ZWIiXSxpbnB1dCxmb3JtLG9wdGlvbixzZWxlY3QN' +
		'CnsNCglib3JkZXItY29sb3I6ICNCRkVGRkYgIWltcG9ydGFudDsNCn0NCg0KDQovKiBNRU5VICovDQps' +
		'aS5uYXZMaXN0IGENCnsgDQpjb2xvcjogIzAwMCAhaW1wb3J0YW50Ow0KYmFja2dyb3VuZC1jb2xvcjog' +
		'IzlBQzBDRCAhaW1wb3J0YW50OyANCnRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50Ow0KfQ0K' +
		'bGkubmF2TGlzdCBhOmhvdmVyIA0KeyANCmNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7DQpiYWNrZ3JvdW5k' +
		'LWNvbG9yOiAjQkZFRkZGICFpbXBvcnRhbnQ7IA0KfQ0KDQovKiBBREFQVEFDT0VTICovDQoNCg0KdGRb' +
		'dmFsaWduPSJ0b3AiXVthbGlnbj0icmlnaHQiXSwNCnRkW2FsaWduPSJyaWdodCJdW25vd3JhcF0sDQp0' +
		'ZFthbGlnbj0icmlnaHQiXVtzdHlsZT0icGFkZGluZzogMHB0IDVweDsiXQ0KeyANCmJhY2tncm91bmQ6' +
		'IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQgDQp9DQppbWdbc3JjKj0iaV9zb2NpYWxfYncuZ2lmIl0sDQpp' +
		'bWdbc3JjKj0iaV9wcm9mZXNzaW9uYWxfY29sb3IuZ2lmIl0sDQppbWdbc3JjKj0iaV9wZXJzb25hbF9j' +
		'b2xvci5naWYiXSwNCmltZ1tzcmMqPSJ0YWJhbmdsZV9ibHVlLmdpZiJdLA0KaW1nW3NyYyo9Imlfc29j' +
		'aWFsX2NvbG9yLmdpZiJdLA0KaW1nW3NyYyo9InRhYmFuZ2xlX2dyZXkuZ2lmIl0sDQppbWdbc3JjKj0i' +
		'aV9wcm9mZXNzaW9uYWxfYncuZ2lmIl0sDQppbWdbc3JjKj0iaV9wZXJzb25hbF9idy5naWYiXSwNCmlt' +
		'Z1tzcmMqPSJ0YWJfZ3JheS5naWYiXSwNCmltZ1tzcmMqPSJ0YWJfYnR4X2dyYXkuZ2lmIl0sDQppbWdb' +
		'c3JjKj0idGFiX2JsdWUuZ2lmIl0sDQp0YWJsZVtpZD0iZm9vdGVyIl0sDQp0ZFtzdHlsZSo9InRyMTAu' +
		'Z2lmIl0sDQp0ZFtiYWNrZ3JvdW5kKj0idHI0LmdpZiJdDQp7DQoJZGlzcGxheTogbm9uZSAhaW1wb3J0' +
		'YW50Ow0KfQ0KdGRbYmFja2dyb3VuZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXQ0Kew0KZGlzcGxh' +
		'eTpub25lOw0KfQ0KdGRbaWQ9ImhlYWRlck1lbnUiXQ0Kew0KdGV4dC1hbGlnbjogY2VudGVyICFpbXBv' +
		'cnRhbnQ7DQp9DQppbWdbc3JjKj0iYWxwaCJdDQp7DQoJbWF4LXdpZHRoOiAwcHggIWltcG9ydGFudDsg' +
		'DQoJbWF4LWhlaWdodDogMHB4ICFpbXBvcnRhbnQ7IA0KfQ0KaW1nW3NyYyo9ImFscGgiXTphZnRlcg0K' +
		'eyANCgljb250ZW50OiBhdHRyKGFsdCkgIWltcG9ydGFudDsNCn0=';



  style = document.createElement('link');
  style . href = css ;
  style . rel  = 'stylesheet';
  style . type = 'text/css';
 
document.getElementsByTagName('head').item(0).appendChild(style)