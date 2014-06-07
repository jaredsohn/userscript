// ==UserScript==
// @name Aqua Marine
// @CSS feita por Eddie
// @Adaptação para Greasemonkey por Igor Thiago
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
		'cnNhbyBBcXVhbWFyaW5lDQpWZXJzYW8gMC4yICggMjYvMTAvMjAwNiApDQoqLw0KDQovKiBMSU5LUyAq' +
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
		'dGFiXSwNCnRkW2NsYXNzKj1jYXRdLHRkW2NsYXNzPW5hdkluZm9dLA0KdGFibGUua2FybWF0YWJsZSB0' +
		'ZCx0YWJsZS5mcmllbmR0YWJsZSB0ZCx0ZFtjbGFzcz0icm93MCJdLHRyW2NsYXNzPSJyb3cwIl0sDQp0' +
		'ZFtjbGFzcyo9InRhYiJdLHRyW2JnY29sb3I9IiNlNWVjZjQiXSx0cltiZ2NvbG9yPSIjYmZkMGVhIl0s' +
		'DQphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0sDQp0cltjbGFzcz0icGFuZWxIZWFkZXIiXSx0cltiZ2Nv' +
		'bG9yPSIjYzlkNmViIl0sdGRbYmFja2dyb3VuZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXQ0Kew0K' +
		'CWJhY2tncm91bmQ6ICM0NThCNzQgIWltcG9ydGFudDsNCn0NCg0KaW1nW3NyYyo9J2JsLmdpZiddLGlt' +
		'Z1tzcmMqPSdici5naWYnXXsNCglkaXNwbGF5Om5vbmUgIWltcG9ydGFudDsNCn0NCg0KDQp0ZFtzdHls' +
		'ZSo9ImJtLmdpZiJdDQp7DQogICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICBjb2xvcjogI2ZmZiAhaW1w' +
		'b3J0YW50Ow0KCWJhY2tncm91bmQ6ICM2NkNEQUEgIWltcG9ydGFudDsNCiAgIGJvcmRlcjogMnB4IG91' +
		'dHNldCAjNDU4Qjc0Ow0KCXBhZGRpbmc6IDVweCAhaW1wb3J0YW50Ow0KCS1tb3otYm9yZGVyLXJhZGl1' +
		'cy10b3BsZWZ0OiAxZW07IA0KCS1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOw0KCS1tb3ot' +
		'Ym9yZGVyLXJhZGl1cy1ib3R0b21yaWdodDogMWVtOyANCgktbW96LWJvcmRlci1yYWRpdXMtYm90dG9t' +
		'bGVmdDogMWVtOw0KfQ0KDQoNCi8qIENPUiBGVU5ETyAyICovDQppbnB1dCxkaXZbY2xhc3M9InJvdzEi' +
		'XSxmb3JtLG9wdGlvbixzZWxlY3QsdGV4dGFyZWEsdHJbY2xhc3M9InJvdzEiXSx0ZFtjbGFzcz0icm93' +
		'MSJdLHRyW2NsYXNzPSJtZXNzYWdlQm9keSJdLHRyW2JnY29sb3I9IiNkNGRkZWQiXQ0Kew0KCWJhY2tn' +
		'cm91bmQtY29sb3I6ICM2NkNEQUEgIWltcG9ydGFudDsNCn0NCg0KdGRbaWQ9ImhlYWRlck1lbnUiXSB7' +
		'DQoJYmFja2dyb3VuZDogIzY2Q0RBQSAhaW1wb3J0YW50Ow0KCWNvbG9yOiAjNjZDREFBICFpbXBvcnRh' +
		'bnQ7DQp9DQoNCiNoZWFkZXJNZW51IGE6bGluaywjaGVhZGVyTWVudSBhOnZpc2l0ZWQgew0KCXRleHQt' +
		'ZGVjb3JhdGlvbjpub25lICFpbXBvcnRhbnQ7DQoJbWFyZ2luOiA1cHg7DQp9DQoNCg0KLyogQ09SIERB' +
		'UyBCT1JEQVMgKi8NCmxpLHRleHRhcmVhLGJvZHksdGFibGUsdGRbY2xhc3MqPXBhbmVsXSxzcGFuLHRk' +
		'W2lkKj10YWJdLA0KdGRbY2xhc3MqPWNhdF0sdGRbaWQ9ImhlYWRlck1lbnUiXSx0ZFtjbGFzcz1uYXZJ' +
		'bmZvXSwNCnRhYmxlLmthcm1hdGFibGUgdGQsdGFibGUuZnJpZW5kdGFibGUgdGQsdGRbY2xhc3M9InJv' +
		'dzAiXSx0cltjbGFzcz0icm93MCJdLA0KdGRbY2xhc3MqPSJ0YWIiXSx0cltiZ2NvbG9yPSIjZTVlY2Y0' +
		'Il0sdHJbYmdjb2xvcj0iI2JmZDBlYSJdLA0KYVtjbGFzcz0iY2F0ZWdvcnlfbGluayJdLGRpdltjbGFz' +
		'cz0icm93MSJdLHRkW2FsaWduPSJyaWdodCJdLA0KdHJbY2xhc3M9InBhbmVsSGVhZGVyIl0sdHJbYmdj' +
		'b2xvcj0iI2M5ZDZlYiJdLGlucHV0LGZvcm0sb3B0aW9uLHNlbGVjdA0Kew0KCWJvcmRlci1jb2xvcjog' +
		'IzdGRkZENCAhaW1wb3J0YW50Ow0KfQ0KDQoNCi8qIE1FTlUgKi8NCmxpLm5hdkxpc3QgYQ0KeyANCmNv' +
		'bG9yOiAjMDAwICFpbXBvcnRhbnQ7DQpiYWNrZ3JvdW5kLWNvbG9yOiAjNjZDREFBICFpbXBvcnRhbnQ7' +
		'IA0KdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7DQp9DQpsaS5uYXZMaXN0IGE6aG92ZXIg' +
		'DQp7IA0KY29sb3I6ICMzMzMgIWltcG9ydGFudDsNCmJhY2tncm91bmQtY29sb3I6ICM3RkZGRDQgIWlt' +
		'cG9ydGFudDsgDQp9DQoNCi8qIEFEQVBUQUNPRVMgKi8NCg0KDQp0ZFt2YWxpZ249InRvcCJdW2FsaWdu' +
		'PSJyaWdodCJdLA0KdGRbYWxpZ249InJpZ2h0Il1bbm93cmFwXSwNCnRkW2FsaWduPSJyaWdodCJdW3N0' +
		'eWxlPSJwYWRkaW5nOiAwcHQgNXB4OyJdDQp7IA0KYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9y' +
		'dGFudCANCn0NCmltZ1tzcmMqPSJpX3NvY2lhbF9idy5naWYiXSwNCmltZ1tzcmMqPSJpX3Byb2Zlc3Np' +
		'b25hbF9jb2xvci5naWYiXSwNCmltZ1tzcmMqPSJpX3BlcnNvbmFsX2NvbG9yLmdpZiJdLA0KaW1nW3Ny' +
		'Yyo9InRhYmFuZ2xlX2JsdWUuZ2lmIl0sDQppbWdbc3JjKj0iaV9zb2NpYWxfY29sb3IuZ2lmIl0sDQpp' +
		'bWdbc3JjKj0idGFiYW5nbGVfZ3JleS5naWYiXSwNCmltZ1tzcmMqPSJpX3Byb2Zlc3Npb25hbF9idy5n' +
		'aWYiXSwNCmltZ1tzcmMqPSJpX3BlcnNvbmFsX2J3LmdpZiJdLA0KaW1nW3NyYyo9InRhYl9ncmF5Lmdp' +
		'ZiJdLA0KaW1nW3NyYyo9InRhYl9idHhfZ3JheS5naWYiXSwNCmltZ1tzcmMqPSJ0YWJfYmx1ZS5naWYi' +
		'XSwNCnRhYmxlW2lkPSJmb290ZXIiXSwNCnRkW3N0eWxlKj0idHIxMC5naWYiXSwNCnRkW2JhY2tncm91' +
		'bmQqPSJ0cjQuZ2lmIl0NCnsNCglkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7DQp9DQp0ZFtiYWNrZ3Jv' +
		'dW5kKj0idHI4LmdpZiJdW2FsaWduPSJyaWdodCJdDQp7DQpkaXNwbGF5OiBub25lDQp9DQp0ZFtpZD0i' +
		'aGVhZGVyTWVudSJdDQp7DQp0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDsNCn0NCmltZ1tzcmMq' +
		'PSJhbHBoIl0NCnsNCgltYXgtd2lkdGg6IDBweCAhaW1wb3J0YW50OyANCgltYXgtaGVpZ2h0OiAwcHgg' +
		'IWltcG9ydGFudDsgDQp9DQppbWdbc3JjKj0iYWxwaCJdOmFmdGVyDQp7IA0KCWNvbnRlbnQ6IGF0dHIo' +
		'YWx0KSAhaW1wb3J0YW50Ow0KfQ==';



  style = document.createElement('link');
  style . href = css ;
  style . rel  = 'stylesheet';
  style . type = 'text/css';
 
document.getElementsByTagName('head').item(0).appendChild(style)