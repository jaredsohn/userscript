// ==UserScript==
// @name                   Azul Claro
// @namespace              about:mozilla
// @description            Skin Azul Claro
// @include                http://www.orkut.com/*
// @autorDaPorraDoUserJs   Igor Thiago Faria 
// @AutorDoCSS             Eddie
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
	
var css = 'data:text/css;base64,' +
		'LyoKU2tpbiBDU1MgcGFyYSBtb2RpZmljYXIgb3JrdXQ6IENhbWFsZW9uIGZlaXRvIHBvciBlZGRpZSAK' +
		'aHR0cDovL3d3dy5lZGllLnhwZy5jb20uYnIvY3NzL2Nzc1NraW4uaHRtbApodHRwOi8vd3d3Lm9ya3V0' +
		'LmNvbS9Qcm9maWxlLmFzcHg/dWlkPTU4NjYxMzIzMzgxNjEwNDEwODQKVmVyc2FvIEF6dWwgY2xhcm8K' +
		'VmVyc2FvIDAuMiAoIDI2LzEwLzIwMDYgKQoqLwoKYVtocmVmXSB7CQogICBjb2xvcjogIzMzMyAhaW1w' +
		'b3J0YW50OwoJdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgIWltcG9ydGFudDsKfQphW2hyZWZdOmhv' +
		'dmVyIHsKCWNvbG9yOiAjNjY2ICFpbXBvcnRhbnQ7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9y' +
		'dGFudDsKfQoKdHJbc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IHJnYigxOTEsIDIwOCwgMjM0KTsiXXsK' +
		'CWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7Cn0KCmZvcm0gewoJYmFja2dyb3VuZDog' +
		'dHJhbnNwYXJlbnQgIWltcG9ydGFudDsKfQoKCmltZ1tzcmMqPSdjXyddewoJb3BhY2l0eTogMC4wICFp' +
		'bXBvcnRhbnQ7Cn0KCgpsaSxib2R5LHRhYmxlLAp0ZFtjbGFzcyo9cGFuZWxdLApzcGFuLAp0ZFtpZCo9' +
		'dGFiXSwKdGRbY2xhc3MqPWNhdF0sCnRkW2NsYXNzPW5hdkluZm9dLAp0YWJsZS5rYXJtYXRhYmxlIHRk' +
		'LAp0YWJsZS5mcmllbmR0YWJsZSB0ZCwKdGRbY2xhc3M9InJvdzAiXSwKdHJbY2xhc3M9InJvdzAiXSwK' +
		'dGRbY2xhc3MqPSJ0YWIiXSwKdHJbYmdjb2xvcj0iI2U1ZWNmNCJdLAp0cltiZ2NvbG9yPSIjYmZkMGVh' +
		'Il0sCmFbY2xhc3M9ImNhdGVnb3J5X2xpbmsiXSwKdHJbY2xhc3M9InBhbmVsSGVhZGVyIl0sCnRyW2Jn' +
		'Y29sb3I9IiNjOWQ2ZWIiXSwKdGRbYmFja2dyb3VuZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXQp7' +
		'CWJhY2tncm91bmQ6ICNjYWQ4ZGIgIWltcG9ydGFudDsgCiAgIGNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7' +
		'Cn0KCgppbnB1dCxkaXZbY2xhc3M9InJvdzEiXSwKZm9ybSwKb3B0aW9uLApzZWxlY3QsCnRleHRhcmVh' +
		'LAp0cltjbGFzcz0icm93MSJdLAp0ZFtjbGFzcz0icm93MSJdLAp0cltjbGFzcz0ibWVzc2FnZUJvZHki' +
		'XSwKdHJbYmdjb2xvcj0iI2Q0ZGRlZCJdCnsJYmFja2dyb3VuZC1jb2xvcjogI2Q4ZTRlYSAgIWltcG9y' +
		'dGFudDsgCiAgIGNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7Cn0KCmxpLAp0ZXh0YXJlYSwKYm9keSwKdGFi' +
		'bGUsCnRkW2NsYXNzKj1wYW5lbF0sCnNwYW4sCnRkW2lkKj10YWJdLAp0ZFtjbGFzcyo9Y2F0XSwKdGRb' +
		'aWQ9ImhlYWRlck1lbnUiXSwKdGRbY2xhc3M9bmF2SW5mb10sCnRhYmxlLmthcm1hdGFibGUgdGQsCnRh' +
		'YmxlLmZyaWVuZHRhYmxlIHRkLAp0ZFtjbGFzcz0icm93MCJdLAp0cltjbGFzcz0icm93MCJdLAp0ZFtj' +
		'bGFzcyo9InRhYiJdLAp0cltiZ2NvbG9yPSIjZTVlY2Y0Il0sCnRyW2JnY29sb3I9IiNiZmQwZWEiXSwK' +
		'YVtjbGFzcz0iY2F0ZWdvcnlfbGluayJdLApkaXZbY2xhc3M9InJvdzEiXSwKdGRbYWxpZ249InJpZ2h0' +
		'Il0sCnRyW2NsYXNzPSJwYW5lbEhlYWRlciJdLAp0cltiZ2NvbG9yPSIjYzlkNmViIl0sCmlucHV0LApm' +
		'b3JtLApvcHRpb24sCnNlbGVjdAp7Cglib3JkZXItY29sb3I6ICM2MmE0YmUgIWltcG9ydGFudDsKfQoK' +
		'aW1nW3NyYyo9J2JsLmdpZiddLGltZ1tzcmMqPSdici5naWYnXXsKCWRpc3BsYXk6IG5vbmUgIWltcG9y' +
		'dGFudDsKfQoKdGRbc3R5bGUqPSJibS5naWYiXQp7CiAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgY29s' +
		'b3I6ICNmZmYgIWltcG9ydGFudDsKCWJhY2tncm91bmQ6ICM4RUJERDAgIWltcG9ydGFudDsKICAgYm9y' +
		'ZGVyOiAxcHggc29saWQgI0I0RDZERDsKCXBhZGRpbmctdG9wOiAzcHggIWltcG9ydGFudDsKCQlwYWRk' +
		'aW5nLWJvdHRvbTogM3B4ICFpbXBvcnRhbnQ7CgkJCXBhZGRpbmctcmlnaHQ6IDE1cHggIWltcG9ydGFu' +
		'dDsKCQkJCXBhZGRpbmctbGVmdDogMTVweCAhaW1wb3J0YW50OwoJLW1vei1ib3JkZXItcmFkaXVzLXRv' +
		'cGxlZnQ6IDFlbTsgCgkgIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOwoJICAgIC1tb3ot' +
		'Ym9yZGVyLXJhZGl1cy1ib3R0b21yaWdodDogMWVtOyAKCSAgICAgIC1tb3otYm9yZGVyLXJhZGl1cy1i' +
		'b3R0b21sZWZ0OiAxZW07Cn0KCnRkW3N0eWxlKj0iYm0uZ2lmIl06aG92ZXIKewogICB0ZXh0LWFsaWdu' +
		'OiBjZW50ZXI7CiAgIGNvbG9yOiAjMDAwMDAwICFpbXBvcnRhbnQ7CgliYWNrZ3JvdW5kOiAjQjRENkRE' +
		'ICFpbXBvcnRhbnQ7CiAgIGJvcmRlcjogMXB4IHNvbGlkICNCNEQ2REQ7CglwYWRkaW5nLXRvcDogM3B4' +
		'ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0YW50OwoJCQlwYWRkaW5nLXJp' +
		'Z2h0OiAxNXB4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDE1cHggIWltcG9ydGFudDsKCS1t' +
		'b3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdo' +
		'dDogMWVtOwoJICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDFlbTsgCgkgICAtbW96LWJv' +
		'cmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9CgpsaS5uYXZMaXN0IGEgeyAKY29sb3I6ICMwMDAg' +
		'IWltcG9ydGFudDsKYmFja2dyb3VuZC1jb2xvcjogI0I0RDZERCAhaW1wb3J0YW50OyAKdGV4dC1kZWNv' +
		'cmF0aW9uOiBub25lICFpbXBvcnRhbnQ7Cn0KbGkubmF2TGlzdCBhOmhvdmVyIHsgCmNvbG9yOiAjMzMz' +
		'ICFpbXBvcnRhbnQ7CmJhY2tncm91bmQtY29sb3I6ICNkOGU0ZWEgICFpbXBvcnRhbnQ7IAp9Cgp0ZFt2' +
		'YWxpZ249InRvcCJdW2FsaWduPSJyaWdodCJdLAp0ZFthbGlnbj0icmlnaHQiXVtub3dyYXBdLAp0ZFth' +
		'bGlnbj0icmlnaHQiXVtzdHlsZT0icGFkZGluZzogMHB0IDVweDsiXQp7IApiYWNrZ3JvdW5kOiB0cmFu' +
		'c3BhcmVudCAhaW1wb3J0YW50IAp9CgppbWdbc3JjKj0iaV9zb2NpYWxfYncuZ2lmIl0sCmltZ1tzcmMq' +
		'PSJpX3Byb2Zlc3Npb25hbF9jb2xvci5naWYiXSwKaW1nW3NyYyo9ImlfcGVyc29uYWxfY29sb3IuZ2lm' +
		'Il0sCmltZ1tzcmMqPSJ0YWJhbmdsZV9ibHVlLmdpZiJdLAppbWdbc3JjKj0iaV9zb2NpYWxfY29sb3Iu' +
		'Z2lmIl0sCmltZ1tzcmMqPSJ0YWJhbmdsZV9ncmV5LmdpZiJdLAppbWdbc3JjKj0iaV9wcm9mZXNzaW9u' +
		'YWxfYncuZ2lmIl0sCmltZ1tzcmMqPSJpX3BlcnNvbmFsX2J3LmdpZiJdLAppbWdbc3JjKj0idGFiX2dy' +
		'YXkuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJfYnR4X2dyYXkuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJfYmx1ZS5n' +
		'aWYiXSwKdGFibGVbaWQ9ImZvb3RlciJdLAp0ZFtzdHlsZSo9InRyMTAuZ2lmIl0sCnRkW2JhY2tncm91' +
		'bmQqPSJ0cjQuZ2lmIl0gCnsKCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKfQoKdGRbYmFja2dyb3Vu' +
		'ZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXQp7CmRpc3BsYXk6bm9uZSAhaW1wb3J0YW50Owp9Cgoj' +
		'aGVhZGVyTWVudXsKICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDsKICBiYWNrZ3JvdW5kOiAj' +
		'ZDhlNGVhICFpbXBvcnRhbnQ7CiAgZm9udC1zaXplOiAwcHggIWltcG9ydGFudDsKICBwb3NpdGlvbjog' +
		'Zml4ZWQ7CiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICB0b3A6IDAgIWltcG9ydGFudDsKICBsZWZ0' +
		'OiAwICFpbXBvcnRhbnQ7CiAgaGVpZ2h0OiAyNXB4ICFpbXBvcnRhbnQ7CiAgb3BhY2l0eTogMC44ICFp' +
		'bXBvcnRhbnQ7Cn0KCiNoZWFkZXJNZW51IGE6bGluaywgI2hlYWRlck1lbnUgYTp2aXNpdGVkIHsKCWNv' +
		'bG9yOiBCbGFjayAhaW1wb3J0YW50OwoJdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7Cglm' +
		'b250LXNpemU6IDE5cHggIWltcG9ydGFudDsKCW1hcmdpbjogMTBweDsKfQoKCiNoZWFkZXJNZW51IGE6' +
		'aG92ZXIgewoJY29sb3I6IFdoaXRlICFpbXBvcnRhbnQ7Cglmb250LXNpemU6IDE5cHggIWltcG9ydGFu' +
		'dDsKfQoKYVtocmVmPSdodHRwOi8vd3d3Lm9ya3V0LmNvbS9OZXdzLmFzcHgnXSxhW2hyZWY9J2h0dHA6' +
		'Ly9tZWRpYS5vcmt1dC5jb20vJ117CglkaXNwbGF5Om5vbmUgIWltcG9ydGFudDsKfQo=';

	var head=document.getElementsByTagName('head').item(0);
	oo=document.createElement('link');
	oo.href= css ;
	oo.type='text/css';
	oo.rel='stylesheet';
	oo.defer=true;
	head.appendChild(oo);




