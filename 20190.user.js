// ==UserScript==
// @name                   Silver
// @namespace              about:mozilla
// @description            Skin Silver
// @include                http://www.orkut.com/*
// @autorDaPorraDoUserJs   Igor Thiago Faria 
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
		'LyoKQnkgSWdvciBUaGlhZ28KKi8KCmFbaHJlZl0gewljb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50OyAg' +
		'dGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7IH0KYVtocmVmXTpob3ZlciB7IGNvbG9yOiAj' +
		'ODM4MzgzICFpbXBvcnRhbnQ7CXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lICFpbXBvcnRhbnQ7IH0K' +
		'CmxpLApib2R5LAp0YWJsZSwKdGRbY2xhc3MqPXBhbmVsXSwKc3BhbiwKdGRbaWQqPXRhYl0sCnRkW2Ns' +
		'YXNzKj1jYXRdLAp0ZFtpZD0iaGVhZGVyTWVudSJdLAp0ZFtjbGFzcz1uYXZJbmZvXSwKdGFibGUua2Fy' +
		'bWF0YWJsZSB0ZCwKdGFibGUuZnJpZW5kdGFibGUgdGQsCnRkW2NsYXNzPSJyb3cwIl0sCnRyW2NsYXNz' +
		'PSJyb3cwIl0sCnRkW2NsYXNzKj0idGFiIl0sCnRyW2JnY29sb3I9IiNlNWVjZjQiXSwKdHJbYmdjb2xv' +
		'cj0iI2JmZDBlYSJdLAphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0sCnRyW2NsYXNzPSJwYW5lbEhlYWRl' +
		'ciJdCix0cltiZ2NvbG9yPSIjYzlkNmViIl0sCnRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxpZ249' +
		'InJpZ2h0Il0sCmRpdltzdHlsZT0ibWFyZ2luLWxlZnQ6IDVweDsgbWFyZ2luLXJpZ2h0OiA1cHg7IG1h' +
		'cmdpbi1ib3R0b206IDVweDsiXSwKW2JnY29sb3I9IiNGRkZGRkYiXQp7Cgljb2xvcjogIzAwMDAwMCAh' +
		'aW1wb3J0YW50OwoJYmFja2dyb3VuZDogI0RDRENEQyAhaW1wb3J0YW50Owp9CgppbnB1dCwKZGl2W2Ns' +
		'YXNzPSJyb3cxIl0sCmZvcm0sCm9wdGlvbiwKc2VsZWN0LAp0ZXh0YXJlYSwKdHJbY2xhc3M9InJvdzEi' +
		'XSwKdGRbY2xhc3M9InJvdzEiXSwKdHJbY2xhc3M9Im1lc3NhZ2VCb2R5Il0sCnRyW2JnY29sb3I9IiNk' +
		'NGRkZWQiXQp7Cgljb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50OwoJYmFja2dyb3VuZDogI0U4RThFOCAh' +
		'aW1wb3J0YW50Owp9CgpkaXZbc3R5bGU9InBhZGRpbmc6IDNweDsiXVthbGlnbj0icmlnaHQiXSxmb3Jt' +
		'ewoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsKfQoKdHJbc3R5bGU9ImJhY2tncm91' +
		'bmQtY29sb3I6IHJnYigxOTEsIDIwOCwgMjM0KTsiXXsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFp' +
		'bXBvcnRhbnQ7Cn0KCmxpLAp0ZXh0YXJlYSwKYm9keSwKdGFibGUsCnRkW2NsYXNzKj1wYW5lbF0sCnNw' +
		'YW4sCnRkW2lkKj10YWJdLAp0ZFtjbGFzcyo9Y2F0XSwKdGRbaWQ9ImhlYWRlck1lbnUiXSwKdGRbY2xh' +
		'c3M9bmF2SW5mb10sCnRhYmxlLmthcm1hdGFibGUgdGQsCnRhYmxlLmZyaWVuZHRhYmxlIHRkLAp0ZFtj' +
		'bGFzcz0icm93MCJdLAp0cltjbGFzcz0icm93MCJdLAp0ZFtjbGFzcyo9InRhYiJdLAp0cltiZ2NvbG9y' +
		'PSIjZTVlY2Y0Il0sCnRyW2JnY29sb3I9IiNiZmQwZWEiXSwKYVtjbGFzcz0iY2F0ZWdvcnlfbGluayJd' +
		'LApkaXZbY2xhc3M9InJvdzEiXSwKdGRbYWxpZ249InJpZ2h0Il0sCnRyW2NsYXNzPSJwYW5lbEhlYWRl' +
		'ciJdLAp0cltiZ2NvbG9yPSIjYzlkNmViIl0sCmlucHV0LApmb3JtLApvcHRpb24sCnNlbGVjdHsKCWJv' +
		'cmRlci1jb2xvcjogR3JheSAhaW1wb3J0YW50Owp9CgoKaW1nW3NyYyo9J2NfJ117CglvcGFjaXR5OiAw' +
		'LjAgIWltcG9ydGFudDsKfQoKdGRbc3R5bGUqPSJibS5naWYiXXsKICAgdGV4dC1hbGlnbjogY2VudGVy' +
		'OwogICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OwoJYmFja2dyb3VuZDogI0FEQURBRCAhaW1wb3J0YW50' +
		'OwogICBib3JkZXI6IDFweCBzb2xpZCAjQURBREFEICFpbXBvcnRhbnQ7CglwYWRkaW5nLXRvcDogM3B4' +
		'ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0YW50OwoJCQlwYWRkaW5nLXJp' +
		'Z2h0OiAxM3B4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDEzcHggIWltcG9ydGFudDsKCS1t' +
		'b3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJICAtbW96LWJvcmRlci1yYWRpdXMtdG9wcmln' +
		'aHQ6IDFlbTsKCSAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDFlbTsgCgkgICAgICAt' +
		'bW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9Cgp0ZFtzdHlsZSo9ImJtLmdpZiJdOmhv' +
		'dmVyCnsKICAgdGV4dC1hbGlnbjogY2VudGVyOwogICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OwoJYmFj' +
		'a2dyb3VuZDogU2lsdmVyICFpbXBvcnRhbnQ7CiAgIGJvcmRlcjogMXB4IHNvbGlkICBTaWx2ZXI7Cglw' +
		'YWRkaW5nLXRvcDogM3B4ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0YW50' +
		'OwoJCQlwYWRkaW5nLXJpZ2h0OiAxM3B4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDEzcHgg' +
		'IWltcG9ydGFudDsKCS1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJICAtbW96LWJvcmRl' +
		'ci1yYWRpdXMtdG9wcmlnaHQ6IDFlbTsKCSAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6' +
		'IDFlbTsgCgkgICAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9CgppbWdbc3Jj' +
		'Kj0iSXMiXQp7CglvcGFjaXR5IDogMC40Owp9CgppbWdbc3JjKj0iYmwuZ2lmIl0sCmltZ1tzcmMqPSJi' +
		'ci5naWYiXXsKCWRpc3BsYXk6bm9uZSAhaW1wb3J0YW50OwoJfQoKdGRbdmFsaWduPSJ0b3AiXVt3aWR0' +
		'aD0iNTk0Il17Cgl3aWR0aDogMTAwJSAhaW1wb3J0YW50OyAKfQoKdGV4dGFyZWEsaW5wdXQgewogICBi' +
		'b3JkZXI6IDFweCBzb2xpZCBTaWx2ZXIgIWltcG9ydGFudDsKCXBhZGRpbmctdG9wOiAzcHggIWltcG9y' +
		'dGFudDsKCQlwYWRkaW5nLWJvdHRvbTogM3B4ICFpbXBvcnRhbnQ7CgkJCXBhZGRpbmctcmlnaHQ6IDEz' +
		'cHggIWltcG9ydGFudDsKCQkJCXBhZGRpbmctbGVmdDogMTNweCAhaW1wb3J0YW50OwoJLW1vei1ib3Jk' +
		'ZXItcmFkaXVzLXRvcGxlZnQ6IDFlbTsgCgkgIC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVt' +
		'OwoJICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21yaWdodDogMWVtOyAKCSAgICAgIC1tb3otYm9y' +
		'ZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07Cn0KI2hlYWRlck1lbnUgewoJCgl0ZXh0LWFsaWduOiBj' +
		'ZW50ZXIgIWltcG9ydGFudDsKCWJhY2tncm91bmQ6IFNpbHZlciAhaW1wb3J0YW50OwogICBjb2xvciA6' +
		'ICBTaWx2ZXIgIWltcG9ydGFudDsKCW1hcmdpbjogMTBweCAhaW1wb3J0YW50OwoJZm9udC1zaXplOiAx' +
		'NnB4ICFpbXBvcnRhbnQ7Cgl3aWR0aDogMTAwJSAhaW1wb3J0YW50Owp9CgojaGVhZGVyTWVudSBhOmhv' +
		'dmVyIHsKCWNvbG9yOiBCbGFjayFpbXBvcnRhbnQ7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9y' +
		'dGFudDsKfQoKCi5jYXBpdGFsaXplZFRpdGxlLC5jb21tdW5pdHlQYW5lbEhlYWRlciB7Cgljb2xvcjog' +
		'R3JheSAhaW1wb3J0YW50OwoJZm9udC1zaXplOiAyOXB4ICFpbXBvcnRhbnQ7Cgl0ZXh0LWFsaWduOiBj' +
		'ZW50ZXIgIWltcG9ydGFudDsKfQoKI3NjcmFwVGV4dCB7Cgl3aWR0aDogODAwcHggIWltcG9ydGFudDsK' +
		'CWhlaWdodDogMjAwcHggIWltcG9ydGFudDsKfQoKI21lc3NhZ2VCb2R5IHsKCXdpZHRoOiA4MDBweCAh' +
		'aW1wb3J0YW50OwoJaGVpZ2h0OiAzMDBweCAhaW1wb3J0YW50Owp9Cgojc3ViamVjdCB7Cgl3aWR0aDog' +
		'NTAwcHggIWltcG9ydGFudDsKfQoKbGkubmF2TGlzdCBhCnsgCmNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7' +
		'CmJhY2tncm91bmQtY29sb3I6ICBTaWx2ZXIgIWltcG9ydGFudDsgCnRleHQtZGVjb3JhdGlvbjogbm9u' +
		'ZSAhaW1wb3J0YW50Owp9CmxpLm5hdkxpc3QgYTpob3ZlciAKeyAKY29sb3I6ICMwMDAgIWltcG9ydGFu' +
		'dDsKdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7CiBiYWNrZ3JvdW5kOiAjQjhCOEI4ICFp' +
		'bXBvcnRhbnQ7Cn0KCnRib2R5ewoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsKfQoK' +
		'dGRbdmFsaWduPSJ0b3AiXVthbGlnbj0icmlnaHQiXSwKdGRbYWxpZ249InJpZ2h0Il1bbm93cmFwXSwK' +
		'dGRbYWxpZ249InJpZ2h0Il1bc3R5bGU9InBhZGRpbmc6IDBwdCA1cHg7Il0KeyAKYmFja2dyb3VuZDog' +
		'dHJhbnNwYXJlbnQgIWltcG9ydGFudCAKfQppbWdbc3JjKj0iaV9zb2NpYWxfYncuZ2lmIl0sCmltZ1tz' +
		'cmMqPSJpX3Byb2Zlc3Npb25hbF9jb2xvci5naWYiXSwKaW1nW3NyYyo9ImlfcGVyc29uYWxfY29sb3Iu' +
		'Z2lmIl0sCmltZ1tzcmMqPSJ0YWJhbmdsZV9ibHVlLmdpZiJdLAppbWdbc3JjKj0iaV9zb2NpYWxfY29s' +
		'b3IuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJhbmdsZV9ncmV5LmdpZiJdLAppbWdbc3JjKj0iaV9wcm9mZXNz' +
		'aW9uYWxfYncuZ2lmIl0sCmltZ1tzcmMqPSJpX3BlcnNvbmFsX2J3LmdpZiJdLAppbWdbc3JjKj0idGFi' +
		'X2dyYXkuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJfYnR4X2dyYXkuZ2lmIl0sCmltZ1tzcmMqPSJ0YWJfYmx1' +
		'ZS5naWYiXSwKdGFibGVbaWQ9ImZvb3RlciJdLAp0ZFtzdHlsZSo9InRyMTAuZ2lmIl0sCnRkW2JhY2tn' +
		'cm91bmQqPSJ0cjQuZ2lmIl0KewoJZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Owp9CnRkW2JhY2tncm91' +
		'bmQqPSJ0cjguZ2lmIl1bYWxpZ249InJpZ2h0Il0KewpkaXNwbGF5IDogbm9uZSAhaW1wb3J0YW50Owp9' +
		'CgppbWdbc3JjKj0iYWxwaCJdCnsKCW9wYWNpdHkgOiAwLjQgIWltcG9ydGFudDsKfQoKaW1nW3NyYyo9' +
		'J2NfJ117CglvcGFjaXR5OiAwLjAgIWltcG9ydGFudDsKfQoKaW1nW3NyYyo9JzE1MDQzODMyLmpwZydd' +
		'ewoJb3BhY2l0eTogMC40ICFpbXBvcnRhbnQ7CgkJICAgYm9yZGVyOiAxcHggc29saWQgU2lsdmVyICFp' +
		'bXBvcnRhbnQ7CglwYWRkaW5nLXRvcDogMnB4ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDJw' +
		'eCAhaW1wb3J0YW50OwoJCQlwYWRkaW5nLXJpZ2h0OiAycHggIWltcG9ydGFudDsKCQkJCXBhZGRpbmct' +
		'bGVmdDogMnB4ICFpbXBvcnRhbnQ7CgktbW96LWJvcmRlci1yYWRpdXMtdG9wbGVmdDogMWVtOyAKCSAg' +
		'LW1vei1ib3JkZXItcmFkaXVzLXRvcHJpZ2h0OiAxZW07CgkgICAgLW1vei1ib3JkZXItcmFkaXVzLWJv' +
		'dHRvbXJpZ2h0OiAxZW07IAoJICAgICAgLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbWxlZnQ6IDFlbTsK' +
		'CQkJYmFja2dyb3VuZDogU2lsdmVyICFpbXBvcnRhbnQ7Cn0KCmZvcm0gewoJYmFja2dyb3VuZDogdHJh' +
		'bnNwYXJlbnQgIWltcG9ydGFudDsKfQoKaW1nW3NyYyo9JzE1MDQzODMyLmpwZyddOmhvdmVyewoJb3Bh' +
		'Y2l0eTogMS4wICFpbXBvcnRhbnQ7CgkgICBib3JkZXI6IDFweCBzb2xpZCBCbGFjayAhaW1wb3J0YW50' +
		'OwoJcGFkZGluZy10b3A6IDJweCAhaW1wb3J0YW50OwoJCXBhZGRpbmctYm90dG9tOiAycHggIWltcG9y' +
		'dGFudDsKCQkJcGFkZGluZy1yaWdodDogMnB4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDJw' +
		'eCAhaW1wb3J0YW50OwoJLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnQ6IDFlbTsgCgkgIC1tb3otYm9y' +
		'ZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOwoJICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21yaWdo' +
		'dDogMWVtOyAKCSAgICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07CgkJCWJhY2tn' +
		'cm91bmQ6IFNpbHZlciAhaW1wb3J0YW50Owp9CgoJaW1nW3NyYyo9J3dkeWsuanBnJ10saW1nW3NyYyo9' +
		'J2lfby5naWYnXSxpbWdbc3JjKj0nZ29vZ2xlX3doaXRlLmdpZiddLGltZ1tzcmMqPSJpX2NvbW0uZ2lm' +
		'Il0saW1nW3NyYyo9J2lfZm9sZGVyLmdpZiddIHsKCQlvcGFjaXR5OiAwLjMgIWltcG9ydGFudDsKCX0=';

	var head=document.getElementsByTagName('head').item(0);
	oo=document.createElement('link');
	oo.href= css ;
	oo.type='text/css';
	oo.rel='stylesheet';
	oo.defer=true;
	head.appendChild(oo);




