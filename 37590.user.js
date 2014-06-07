// ==UserScript==
// @name                   Skin Green
// @namespace              about:mozilla
// @description            Skin Green
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
		'LyogQnkgSWdvciBUaGlhZ28gKi8KCmFbaHJlZl0gewljb2xvcjogIzIzOTAyNCAhaW1wb3J0YW50OyAg' +
		'dGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7IH0KYVtocmVmXTpob3ZlciB7IGNvbG9yOiAj' +
		'NDVEMzQ2ICFpbXBvcnRhbnQ7CXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lICFpbXBvcnRhbnQ7IH0K' +
		'CmxpLApib2R5LAp0YWJsZSwKdGRbY2xhc3MqPXBhbmVsXSwKc3BhbiwKdGRbaWQqPXRhYl0sCnRkW2Ns' +
		'YXNzKj1jYXRdLAp0ZFtpZD0iaGVhZGVyTWVudSJdLAp0ZFtjbGFzcz1uYXZJbmZvXSwKdGFibGUua2Fy' +
		'bWF0YWJsZSB0ZCwKdGFibGUuZnJpZW5kdGFibGUgdGQsCnRkW2NsYXNzPSJyb3cwIl0sCnRyW2NsYXNz' +
		'PSJyb3cwIl0sCnRkW2NsYXNzKj0idGFiIl0sCnRyW2JnY29sb3I9IiNlNWVjZjQiXSwKdHJbYmdjb2xv' +
		'cj0iI2JmZDBlYSJdLAphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0sCnRyW2NsYXNzPSJwYW5lbEhlYWRl' +
		'ciJdCix0cltiZ2NvbG9yPSIjYzlkNmViIl0sCnRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxpZ249' +
		'InJpZ2h0Il17Cgljb2xvcjogIzFBNkUxQiAhaW1wb3J0YW50OwoJYmFja2dyb3VuZDogI0JCRUVCQiAh' +
		'aW1wb3J0YW50Owp9Cgp0cltzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MSwgMjA4LCAyMzQp' +
		'OyJdewoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsKfQoKCmlucHV0LApkaXZbY2xh' +
		'c3M9InJvdzEiXSwKZm9ybSwKb3B0aW9uLApzZWxlY3QsCnRleHRhcmVhLAp0cltjbGFzcz0icm93MSJd' +
		'LAp0ZFtjbGFzcz0icm93MSJdLAp0cltjbGFzcz0ibWVzc2FnZUJvZHkiXSwKdHJbYmdjb2xvcj0iI2Q0' +
		'ZGRlZCJdCnsKCWNvbG9yOiAjMUE2RTFCICFpbXBvcnRhbnQ7CgliYWNrZ3JvdW5kOiAjQ0RGM0NEICFp' +
		'bXBvcnRhbnQ7Cn0KCgoKbGksCnRleHRhcmVhLApib2R5LAp0YWJsZSwKdGRbY2xhc3MqPXBhbmVsXSwK' +
		'c3BhbiwKdGRbaWQqPXRhYl0sCnRkW2NsYXNzKj1jYXRdLAp0ZFtpZD0iaGVhZGVyTWVudSJdLAp0ZFtj' +
		'bGFzcz1uYXZJbmZvXSwKdGFibGUua2FybWF0YWJsZSB0ZCwKdGFibGUuZnJpZW5kdGFibGUgdGQsCnRk' +
		'W2NsYXNzPSJyb3cwIl0sCnRyW2NsYXNzPSJyb3cwIl0sCnRkW2NsYXNzKj0idGFiIl0sCnRyW2JnY29s' +
		'b3I9IiNlNWVjZjQiXSwKdHJbYmdjb2xvcj0iI2JmZDBlYSJdLAphW2NsYXNzPSJjYXRlZ29yeV9saW5r' +
		'Il0sCmRpdltjbGFzcz0icm93MSJdLAp0ZFthbGlnbj0icmlnaHQiXSwKdHJbY2xhc3M9InBhbmVsSGVh' +
		'ZGVyIl0sCnRyW2JnY29sb3I9IiNjOWQ2ZWIiXSwKaW5wdXQsCmZvcm0sCm9wdGlvbiwKc2VsZWN0ewoJ' +
		'Ym9yZGVyLWNvbG9yOiAjNUZEQjYwICFpbXBvcnRhbnQ7Cn0KCgp0ZFtzdHlsZSo9ImJtLmdpZiJdewog' +
		'ICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7CgliYWNrZ3JvdW5k' +
		'OiAjM0JEMjNEICFpbXBvcnRhbnQ7CiAgIGJvcmRlcjogMXB4IHNvbGlkICMzQkQyM0Q7CglwYWRkaW5n' +
		'LXRvcDogM3B4ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0YW50OwoJCQlw' +
		'YWRkaW5nLXJpZ2h0OiAxM3B4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDEzcHggIWltcG9y' +
		'dGFudDsKCS1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJICAtbW96LWJvcmRlci1yYWRp' +
		'dXMtdG9wcmlnaHQ6IDFlbTsKCSAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHQ6IDFlbTsg' +
		'CgkgICAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9Cgp0ZFtzdHlsZSo9ImJt' +
		'LmdpZiJdOmhvdmVyCnsKICAgdGV4dC1hbGlnbjogY2VudGVyOwogICBjb2xvcjogI2ZmZiAhaW1wb3J0' +
		'YW50OwoJYmFja2dyb3VuZDogIzhFRTQ4RSAhaW1wb3J0YW50OwogICBib3JkZXI6IDFweCBzb2xpZCAg' +
		'IzhFRTQ4RTsKCXBhZGRpbmctdG9wOiAzcHggIWltcG9ydGFudDsKCQlwYWRkaW5nLWJvdHRvbTogM3B4' +
		'ICFpbXBvcnRhbnQ7CgkJCXBhZGRpbmctcmlnaHQ6IDEzcHggIWltcG9ydGFudDsKCQkJCXBhZGRpbmct' +
		'bGVmdDogMTNweCAhaW1wb3J0YW50OwoJLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnQ6IDFlbTsgCgkg' +
		'IC1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodDogMWVtOwoJICAgIC1tb3otYm9yZGVyLXJhZGl1cy1i' +
		'b3R0b21yaWdodDogMWVtOyAKCSAgICAgIC1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07' +
		'Cn0KCgppbWdbc3JjKj0iSXMiXSxpbWdbc3JjKj0nL2lfY29tbS5naWYnXQp7CglvcGFjaXR5IDogMC4z' +
		'Owp9CgppbWdbc3JjKj0iYmwuZ2lmIl0saW1nW3NyYyo9ImJyLmdpZiJdewoJZGlzcGxheTogbm9uZSAh' +
		'aW1wb3J0YW50Owp9Cgp0ZXh0YXJlYSxpbnB1dCB7CiAgIGJvcmRlcjogMXB4IHNvbGlkICNGRkM2RDA7' +
		'CglwYWRkaW5nLXRvcDogM3B4ICFpbXBvcnRhbnQ7CgkJcGFkZGluZy1ib3R0b206IDNweCAhaW1wb3J0' +
		'YW50OwoJCQlwYWRkaW5nLXJpZ2h0OiAxM3B4ICFpbXBvcnRhbnQ7CgkJCQlwYWRkaW5nLWxlZnQ6IDEz' +
		'cHggIWltcG9ydGFudDsKCS1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0OiAxZW07IAoJICAtbW96LWJv' +
		'cmRlci1yYWRpdXMtdG9wcmlnaHQ6IDFlbTsKCSAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmln' +
		'aHQ6IDFlbTsgCgkgICAgICAtbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdDogMWVtOwp9Cgp0ZFt2' +
		'YWxpZ249InRvcCJdW3dpZHRoPSI1OTQiXXsKCXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IAp9CgojaGVh' +
		'ZGVyTWVudSB7Cgl0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDsKCWJhY2tncm91bmQ6ICM5NUU1' +
		'OTYgIWltcG9ydGFudDsKICAgY29sb3IgOiAjOTVFNTk2ICFpbXBvcnRhbnQ7CgltYXJnaW46IDEwcHgg' +
		'IWltcG9ydGFudDsKCWZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50Owp9CgojaGVhZGVyTWVudSBhOmhv' +
		'dmVyIHsKCWNvbG9yOiBCbGFjayFpbXBvcnRhbnQ7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9y' +
		'dGFudDsKfQoKCi5jYXBpdGFsaXplZFRpdGxlLC5jb21tdW5pdHlQYW5lbEhlYWRlciB7Cgljb2xvcjog' +
		'IzMyQ0QzMiAhaW1wb3J0YW50OwoJZm9udC1zaXplOiAyOXB4ICFpbXBvcnRhbnQ7Cgl0ZXh0LWFsaWdu' +
		'OiBjZW50ZXIgIWltcG9ydGFudDsKfQoKbGkubmF2TGlzdCBhCnsgCmNvbG9yOiAjZmZmICFpbXBvcnRh' +
		'bnQ7CmJhY2tncm91bmQtY29sb3I6ICM5NUU1OTYgIWltcG9ydGFudDsgCnRleHQtZGVjb3JhdGlvbjog' +
		'bm9uZSAhaW1wb3J0YW50Owp9CmxpLm5hdkxpc3QgYTpob3ZlciAKeyAKY29sb3I6ICMwMDAgIWltcG9y' +
		'dGFudDsKYmFja2dyb3VuZC1jb2xvcjogI0NGRjNDRiAhaW1wb3J0YW50OyAgCnRleHQtZGVjb3JhdGlv' +
		'bjogbm9uZSAhaW1wb3J0YW50Owp9Cgpmb3JtIHsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBv' +
		'cnRhbnQ7Cn0KCmltZ1tzcmMqPSdjXyddewoJb3BhY2l0eTogMC4wICFpbXBvcnRhbnQ7Cn0KCnRkW3Zh' +
		'bGlnbj0idG9wIl1bYWxpZ249InJpZ2h0Il0sCnRkW2FsaWduPSJyaWdodCJdW25vd3JhcF0sCnRkW2Fs' +
		'aWduPSJyaWdodCJdW3N0eWxlPSJwYWRkaW5nOiAwcHQgNXB4OyJdCnsgCmJhY2tncm91bmQ6IHRyYW5z' +
		'cGFyZW50ICFpbXBvcnRhbnQgCn0KaW1nW3NyYyo9Imlfc29jaWFsX2J3LmdpZiJdLAppbWdbc3JjKj0i' +
		'aV9wcm9mZXNzaW9uYWxfY29sb3IuZ2lmIl0sCmltZ1tzcmMqPSJpX3BlcnNvbmFsX2NvbG9yLmdpZiJd' +
		'LAppbWdbc3JjKj0idGFiYW5nbGVfYmx1ZS5naWYiXSwKaW1nW3NyYyo9Imlfc29jaWFsX2NvbG9yLmdp' +
		'ZiJdLAppbWdbc3JjKj0idGFiYW5nbGVfZ3JleS5naWYiXSwKaW1nW3NyYyo9ImlfcHJvZmVzc2lvbmFs' +
		'X2J3LmdpZiJdLAppbWdbc3JjKj0iaV9wZXJzb25hbF9idy5naWYiXSwKaW1nW3NyYyo9InRhYl9ncmF5' +
		'LmdpZiJdLAppbWdbc3JjKj0idGFiX2J0eF9ncmF5LmdpZiJdLAppbWdbc3JjKj0idGFiX2JsdWUuZ2lm' +
		'Il0sCnRhYmxlW2lkPSJmb290ZXIiXSwKdGRbc3R5bGUqPSJ0cjEwLmdpZiJdLAp0ZFtiYWNrZ3JvdW5k' +
		'Kj0idHI0LmdpZiJdCnsKCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKfQp0ZFtiYWNrZ3JvdW5kKj0i' +
		'dHI4LmdpZiJdW2FsaWduPSJyaWdodCJdCnsKZGlzcGxheSA6IG5vbmUgIWltcG9ydGFudDsKfQoKaW1n' +
		'W3NyYyo9ImFscGgiXQp7CglvcGFjaXR5IDogMC40Owp9CgppbWdbc3JjKj0nY18nXXsKCW9wYWNpdHk6' +
		'IDAuMDsKfQ==';
	var head=document.getElementsByTagName('head').item(0);
	oo=document.createElement('link');
	oo.href= css ;
	oo.type='text/css';
	oo.rel='stylesheet';
	oo.defer=true;
	head.appendChild(oo);




