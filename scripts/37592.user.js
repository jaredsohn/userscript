// ==UserScript==
// @name                   Rosa Claro
// @namespace              about:mozilla
// @description            Skin Rosa Claro
// @include                http://www.orkut.com/*
// @autorDaPorraDoUserJs   Igor Thiago Faria
// @CSSOriginal            Eddie      
// ==/UserScript==




var um,dois;
    um = document.getElementsByTagName('head')[0] ;
    if (!um) { return; }
    dois = document.createElement('style');
    dois.type = 'text/css';
    dois.innerHTML = 'div.navPanelTop, div.navPanelBottom { background: transparent !important; border: 0px !important;}';
    um.appendChild(dois);


a=document.createElement('link'); 
a.href="http://www.javascriptkit.com/favicon.ico"; 
a.rel="SHORTCUT ICON"; 
a.type="image/x-icon"; 
document.getElementsByTagName('head').item(0).appendChild(a);
	
var css =  'data:text/css;base64,' +
		'LyoKQ1NTIE9yaWdpbmFsIHBvciBFZGRpZSAsIG1hcyBldSBlZGl0ZWkgYm9hIHBhcnRlLCBwcSB0YXZh' +
		'IEJyYW5jbyBlIFJvc2EgLi4uIExvTAoqLwoKCmFbaHJlZl0gewljb2xvcjogI0NENjA5MCAhaW1wb3J0' +
		'YW50OyB9CmFbaHJlZl06aG92ZXIgeyBjb2xvcjogIzhCM0E2MiAhaW1wb3J0YW50Owl0ZXh0LWRlY29y' +
		'YXRpb246IG5vbmUgIWltcG9ydGFudDsgfQoKbGksCmJvZHksCnRhYmxlLAp0ZFtjbGFzcyo9cGFuZWxd' +
		'LApzcGFuLAp0ZFtpZCo9dGFiXSwKdGRbY2xhc3MqPWNhdF0sCnRkW2lkPSJoZWFkZXJNZW51Il0sCnRk' +
		'W2NsYXNzPW5hdkluZm9dLAp0YWJsZS5rYXJtYXRhYmxlIHRkLAp0YWJsZS5mcmllbmR0YWJsZSB0ZCwK' +
		'dGRbY2xhc3M9InJvdzAiXSwKdHJbY2xhc3M9InJvdzAiXSwKdGRbY2xhc3MqPSJ0YWIiXSwKdHJbYmdj' +
		'b2xvcj0iI2U1ZWNmNCJdLAp0cltiZ2NvbG9yPSIjYmZkMGVhIl0sCmFbY2xhc3M9ImNhdGVnb3J5X2xp' +
		'bmsiXSwKdHJbY2xhc3M9InBhbmVsSGVhZGVyIl0KLHRyW2JnY29sb3I9IiNjOWQ2ZWIiXSwKdGRbYmFj' +
		'a2dyb3VuZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXSwKW2JnY29sb3I9IiNGRkZGRkYiXQp7Cglj' +
		'b2xvcjogIzhCM0E2MiAhaW1wb3J0YW50OwoJYmFja2dyb3VuZDogI0ZGRTFFNiAhaW1wb3J0YW50Owp9' +
		'CgoKaW5wdXQsCmRpdltjbGFzcz0icm93MSJdLApmb3JtLApvcHRpb24sCnNlbGVjdCwKdGV4dGFyZWEs' +
		'CnRyW2NsYXNzPSJyb3cxIl0sCnRkW2NsYXNzPSJyb3cxIl0sCnRyW2NsYXNzPSJtZXNzYWdlQm9keSJd' +
		'LAp0cltiZ2NvbG9yPSIjZDRkZGVkIl0KewoJY29sb3I6ICM4QjNBNjIgIWltcG9ydGFudDsKCWJhY2tn' +
		'cm91bmQtY29sb3I6ICNGRkMwQ0IgIWltcG9ydGFudDsKfQoKZm9ybSB7CgliYWNrZ3JvdW5kOiB0cmFu' +
		'c3BhcmVudCAhaW1wb3J0YW50Owp9CgppbWdbc3JjKj0nY18nXXsKCW9wYWNpdHk6IDAuMCAhaW1wb3J0' +
		'YW50Owp9CgpsaSwKdGV4dGFyZWEsCmJvZHksCnRhYmxlLAp0ZFtjbGFzcyo9cGFuZWxdLApzcGFuLAp0' +
		'ZFtpZCo9dGFiXSwKdGRbY2xhc3MqPWNhdF0sCnRkW2lkPSJoZWFkZXJNZW51Il0sCnRkW2NsYXNzPW5h' +
		'dkluZm9dLAp0YWJsZS5rYXJtYXRhYmxlIHRkLAp0YWJsZS5mcmllbmR0YWJsZSB0ZCwKdGRbY2xhc3M9' +
		'InJvdzAiXSwKdHJbY2xhc3M9InJvdzAiXSwKdGRbY2xhc3MqPSJ0YWIiXSwKdHJbYmdjb2xvcj0iI2U1' +
		'ZWNmNCJdLAp0cltiZ2NvbG9yPSIjYmZkMGVhIl0sCmFbY2xhc3M9ImNhdGVnb3J5X2xpbmsiXSwKZGl2' +
		'W2NsYXNzPSJyb3cxIl0sCnRkW2FsaWduPSJyaWdodCJdLAp0cltjbGFzcz0icGFuZWxIZWFkZXIiXSwK' +
		'dHJbYmdjb2xvcj0iI2M5ZDZlYiJdLAppbnB1dCwKZm9ybSwKb3B0aW9uLApzZWxlY3R7Cglib3JkZXIt' +
		'Y29sb3I6ICNGRkMwQ0IgIWltcG9ydGFudDsKfQoKCnRkW3N0eWxlKj0iYm0uZ2lmIl17CiAgIHRleHQt' +
		'YWxpZ246IGNlbnRlcjsKICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsKCWJhY2tncm91bmQ6ICNGRkQw' +
		'RDggIWltcG9ydGFudDsKICAgYm9yZGVyOiAxcHggc29saWQgICNGRkQwRDg7CglwYWRkaW5nLXRvcDog' +
		'M3B4ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0YW50OwoJCQlwYWRkaW5n' +
		'LXJpZ2h0OiAxM3B4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDEzcHggIWltcG9ydGFudDsK' +
		'CS1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJICAtbW96LWJvcmRlci1yYWRpdXMtdG9w' +
		'cmlnaHQ6IDFlbTsKCSAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDFlbTsgCgkgICAg' +
		'ICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9Cgp0ZFtzdHlsZSo9ImJtLmdpZiJd' +
		'OmhvdmVyCnsKICAgdGV4dC1hbGlnbjogY2VudGVyOwogICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OwoJ' +
		'YmFja2dyb3VuZDogI0RDOTFCMyAhaW1wb3J0YW50OwogICBib3JkZXI6IDFweCBzb2xpZCAgI0RDOTFC' +
		'MzsKCXBhZGRpbmctdG9wOiAzcHggIWltcG9ydGFudDsKCQlwYWRkaW5nLWJvdHRvbTogM3B4ICFpbXBv' +
		'cnRhbnQ7CgkJCXBhZGRpbmctcmlnaHQ6IDEzcHggIWltcG9ydGFudDsKCQkJCXBhZGRpbmctbGVmdDog' +
		'MTNweCAhaW1wb3J0YW50OwoJLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnQ6IDFlbTsgCgkgIC1tb3ot' +
		'Ym9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOwoJICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21y' +
		'aWdodDogMWVtOyAKCSAgICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07Cn0KCmlt' +
		'Z1tzcmMqPSJJcyJdCnsKCW9wYWNpdHkgOiAwLjQ7Cn0KCmltZ1tzcmMqPSJibC5naWYiXSwKaW1nW3Ny' +
		'Yyo9ImJyLmdpZiJdewoJZGlzcGxheTpub25lICFpbXBvcnRhbnQ7Cn0KCnRleHRhcmVhLGlucHV0IHsK' +
		'ICAgYm9yZGVyOiAxcHggc29saWQgI0ZGQzZEMDsKCXBhZGRpbmctdG9wOiAzcHggIWltcG9ydGFudDsK' +
		'CQlwYWRkaW5nLWJvdHRvbTogM3B4ICFpbXBvcnRhbnQ7CgkJCXBhZGRpbmctcmlnaHQ6IDEzcHggIWlt' +
		'cG9ydGFudDsKCQkJCXBhZGRpbmctbGVmdDogMTNweCAhaW1wb3J0YW50OwoJLW1vei1ib3JkZXItcmFk' +
		'aXVzLXRvcGxlZnQ6IDFlbTsgCgkgIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOwoJICAg' +
		'IC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21yaWdodDogMWVtOyAKCSAgICAgIC1tb3otYm9yZGVyLXJh' +
		'ZGl1cy1ib3R0b21sZWZ0OiAxZW07Cn0KCiNoZWFkZXJNZW51ewoJdGV4dC1hbGlnbjogY2VudGVyICFp' +
		'bXBvcnRhbnQ7CgliYWNrZ3JvdW5kOiAjRkZDMENCICFpbXBvcnRhbnQ7CiAgIGNvbG9yIDogI0ZGQzBD' +
		'QiAhaW1wb3J0YW50OwoJbWFyZ2luOiAxMHB4ICFpbXBvcnRhbnQ7Cglmb250LXNpemU6IDE2cHggIWlt' +
		'cG9ydGFudDsKfQoKCgpsaS5uYXZMaXN0IGEKeyAKY29sb3I6ICMwMDAgIWltcG9ydGFudDsKYmFja2dy' +
		'b3VuZC1jb2xvcjogI0ZGRTRFMSAhaW1wb3J0YW50OyAKdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBv' +
		'cnRhbnQ7Cn0KbGkubmF2TGlzdCBhOmhvdmVyIAp7IApjb2xvcjogI2ZmZiAhaW1wb3J0YW50OwpiYWNr' +
		'Z3JvdW5kLWNvbG9yOiAjQ0Q2MDkwICFpbXBvcnRhbnQ7IAp9Cgp0ZFt2YWxpZ249InRvcCJdW2FsaWdu' +
		'PSJyaWdodCJdLAp0ZFthbGlnbj0icmlnaHQiXVtub3dyYXBdLAp0ZFthbGlnbj0icmlnaHQiXVtzdHls' +
		'ZT0icGFkZGluZzogMHB0IDVweDsiXQp7IApiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50' +
		'IAp9CmltZ1tzcmMqPSJpX3NvY2lhbF9idy5naWYiXSwKaW1nW3NyYyo9ImlfcHJvZmVzc2lvbmFsX2Nv' +
		'bG9yLmdpZiJdLAppbWdbc3JjKj0iaV9wZXJzb25hbF9jb2xvci5naWYiXSwKaW1nW3NyYyo9InRhYmFu' +
		'Z2xlX2JsdWUuZ2lmIl0sCmltZ1tzcmMqPSJpX3NvY2lhbF9jb2xvci5naWYiXSwKaW1nW3NyYyo9InRh' +
		'YmFuZ2xlX2dyZXkuZ2lmIl0sCmltZ1tzcmMqPSJpX3Byb2Zlc3Npb25hbF9idy5naWYiXSwKaW1nW3Ny' +
		'Yyo9ImlfcGVyc29uYWxfYncuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJfZ3JheS5naWYiXSwKaW1nW3NyYyo9' +
		'InRhYl9idHhfZ3JheS5naWYiXSwKaW1nW3NyYyo9InRhYl9ibHVlLmdpZiJdLAp0YWJsZVtpZD0iZm9v' +
		'dGVyIl0sCnRkW3N0eWxlKj0idHIxMC5naWYiXSwKdGRbYmFja2dyb3VuZCo9InRyNC5naWYiXQp7Cglk' +
		'aXNwbGF5OiBub25lICFpbXBvcnRhbnQ7Cn0KdGRbYmFja2dyb3VuZCo9InRyOC5naWYiXVthbGlnbj0i' +
		'cmlnaHQiXQp7CmRpc3BsYXkgOiBub25lICFpbXBvcnRhbnQ7Cn0KCmltZ1tzcmMqPSJhbHBoIl0KewoJ' +
		'b3BhY2l0eSA6IDAuNDsKfQoKCWltZ1tzcmMqPSd3ZHlrLmpwZyddLGltZ1tzcmMqPSdpX28uZ2lmJ10s' +
		'aW1nW3NyYyo9J2dvb2dsZV93aGl0ZS5naWYnXSB7CgkJb3BhY2l0eTogMC40ICFpbXBvcnRhbnQ7Cgl9';

	var head=document.getElementsByTagName('head').item(0);
	oo=document.createElement('link');
	oo.href= css ;
	oo.type='text/css';
	oo.rel='stylesheet';
	oo.defer=true;
	head.appendChild(oo);




