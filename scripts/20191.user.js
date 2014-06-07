// ==UserScript==
// @name AntiBoss
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
		'DQphW2hyZWZdDQp7DQoJY29sb3I6ICNmZmYgIWltcG9ydGFudDsNCgl0ZXh0LWRlY29yYXRpb246IHVu' +
		'ZGVybGluZSAhaW1wb3J0YW50Ow0KfQ0KYVtocmVmXTpob3Zlcg0Kew0KCWNvbG9yOiAjY2NjICFpbXBv' +
		'cnRhbnQ7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7DQp9DQoNCi8qIENPUiBEQVMg' +
		'TEVUUkFTICovDQpsaSx0ZXh0YXJlYSxib2R5LHRhYmxlLHRkW2NsYXNzKj1wYW5lbF0sc3Bhbix0ZFtp' +
		'ZCo9dGFiXSwNCnRkW2NsYXNzKj1jYXRdLHRkW2lkPSJoZWFkZXJNZW51Il0sdGRbY2xhc3M9bmF2SW5m' +
		'b10sDQp0YWJsZS5rYXJtYXRhYmxlIHRkLHRhYmxlLmZyaWVuZHRhYmxlIHRkLHRkW2NsYXNzPSJyb3cw' +
		'Il0sdHJbY2xhc3M9InJvdzAiXSwNCnRkW2NsYXNzKj0idGFiIl0sdHJbYmdjb2xvcj0iI2U1ZWNmNCJd' +
		'LHRyW2JnY29sb3I9IiNiZmQwZWEiXSwNCmFbY2xhc3M9ImNhdGVnb3J5X2xpbmsiXSxkaXZbY2xhc3M9' +
		'InJvdzEiXSx0ZFthbGlnbj0icmlnaHQiXSwvKg0KdHJbY2xhc3M9InBhbmVsSGVhZGVyIl0sKi90clti' +
		'Z2NvbG9yPSIjYzlkNmViIl0saW5wdXQsZm9ybSxvcHRpb24sc2VsZWN0LA0KdGRbY2xhc3M9cm93TGFi' +
		'ZWxdLA0KdHJbY2xhc3M9InJvdzEiXSx0ZFtjbGFzcz0icm93MSJdLHRyW2NsYXNzPSJtZXNzYWdlQm9k' +
		'eSJdLHRyW2JnY29sb3I9IiNkNGRkZWQiXQ0Kew0KCWNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7DQp9DQoN' +
		'CiNoZWFkZXJNZW51IHsNCgliYWNrZ3JvdW5kOiAjNjk2OTY5ICFpbXBvcnRhbnQ7DQoJbWFyZ2luOiA1' +
		'cHg7DQoJaGVpZ2h0OiAxM3B4OyANCn0NCg0KDQojc2NyYXBUZXh0ew0KIHdpZHRoOiA4NzBweCAhaW1w' +
		'b3J0YW50Ow0KIGhlaWdodDogMTU1cHggIWltcG9ydGFudDsNCn0NCg0KDQppbWdbc3JjKj0iaHR0cDov' +
		'L2ltYWdlczMub3JrdXQuY29tL2ltYWdlcy9taXR0ZWwvIl0saW1nW3NyYyo9Imh0dHA6Ly9pbWFnZXMz' +
		'Lm9ya3V0LmNvbS9pbWFnZXMvbWVkaXVtLyJdew0KCXBvc2l0aW9uOiBmaXhlZDsNCgl0b3A6IDUwcHg7' +
		'DQoJbGVmdDogMTJweDsNCgkvKm9wYWNpdHk6IDAuOSAhaW1wb3J0YW50OyovDQoJd2lkdGg6IDE0OHB4' +
		'Ow0KCWhlaWdodDogMTQ2cHg7DQp9DQoNCmltZ1tzcmMqPSdibC5naWYnXSxpbWdbc3JjKj0nYnIuZ2lm' +
		'J117DQoJZGlzcGxheTpub25lICFpbXBvcnRhbnQ7DQp9DQoNCg0KdGRbc3R5bGUqPSJibS5naWYiXQ0K' +
		'ew0KICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsNCgliYWNr' +
		'Z3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50Ow0KICAgYm9yZGVyOiAycHggb3V0c2V0ICM2MzYz' +
		'NjM7DQoJcGFkZGluZzogNXB4ICFpbXBvcnRhbnQ7DQoJLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnQ6' +
		'IDFlbTsgDQoJLW1vei1ib3JkZXItcmFkaXVzLXRvcHJpZ2h0OiAxZW07DQoJLW1vei1ib3JkZXItcmFk' +
		'aXVzLWJvdHRvbXJpZ2h0OiAxZW07IA0KCS1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0OiAxZW07' +
		'DQp9DQovKg0KdGRbc3R5bGUqPSJibS5naWYiXTpob3ZlciB7DQogICBjb2xvcjogIzAwMCAhaW1wb3J0' +
		'YW50Ow0KCWJhY2tncm91bmQ6ICNGRjYzNDcgIWltcG9ydGFudDsNCiAgIGJvcmRlcjogMnB4IHNvbGlk' +
		'ICNDRDRGMzkgIWltcG9ydGFudDsNCglwYWRkaW5nOiAzcHggIWltcG9ydGFudDsNCn0NCiovDQoNCg0K' +
		'DQovKiBDT1IgRlVORE8gMSAqLw0KYm9keSxsaSxib2R5LHRhYmxlLHRkW2NsYXNzKj1wYW5lbF0sc3Bh' +
		'bix0ZFtpZCo9dGFiXSwNCnRkW2NsYXNzKj1jYXRdLC8qdGRbaWQ9ImhlYWRlck1lbnUiXSwqL3RkW2Ns' +
		'YXNzPW5hdkluZm9dLA0KdGFibGUua2FybWF0YWJsZSB0ZCx0YWJsZS5mcmllbmR0YWJsZSB0ZCx0ZFtj' +
		'bGFzcz0icm93MCJdLHRyW2NsYXNzPSJyb3cwIl0sDQp0ZFtjbGFzcyo9InRhYiJdLHRyW2JnY29sb3I9' +
		'IiNlNWVjZjQiXSx0cltiZ2NvbG9yPSIjYmZkMGVhIl0sDQphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0s' +
		'DQp0cltjbGFzcz0icGFuZWxIZWFkZXIiXSx0cltiZ2NvbG9yPSIjYzlkNmViIl0sdGRbYmFja2dyb3Vu' +
		'ZCo9InRyOC5naWYiXVthbGlnbj0icmlnaHQiXQ0Kew0KCWJhY2tncm91bmQ6ICMzMzMgIWltcG9ydGFu' +
		'dDsNCn0NCg0KLyogQ09SIEZVTkRPIDIgKi8NCmlucHV0LGRpdltjbGFzcz0icm93MSJdLGZvcm0sb3B0' +
		'aW9uLHNlbGVjdCx0ZXh0YXJlYSx0cltjbGFzcz0icm93MSJdLHRkW2NsYXNzPSJyb3cxIl0sdHJbY2xh' +
		'c3M9Im1lc3NhZ2VCb2R5Il0sdHJbYmdjb2xvcj0iI2Q0ZGRlZCJdDQp7DQoJYmFja2dyb3VuZC1jb2xv' +
		'cjogIzY2NiAhaW1wb3J0YW50Ow0KfQ0KDQovKiBDT1IgREFTIEJPUkRBUyAqLw0KbGksdGV4dGFyZWEs' +
		'Ym9keSx0YWJsZSx0ZFtjbGFzcyo9cGFuZWxdLHNwYW4sdGRbaWQqPXRhYl0sDQp0ZFtjbGFzcyo9Y2F0' +
		'XSx0ZFtpZD0iaGVhZGVyTWVudSJdLHRkW2NsYXNzPW5hdkluZm9dLA0KdGFibGUua2FybWF0YWJsZSB0' +
		'ZCx0YWJsZS5mcmllbmR0YWJsZSB0ZCx0ZFtjbGFzcz0icm93MCJdLHRyW2NsYXNzPSJyb3cwIl0sDQp0' +
		'ZFtjbGFzcyo9InRhYiJdLHRyW2JnY29sb3I9IiNlNWVjZjQiXSx0cltiZ2NvbG9yPSIjYmZkMGVhIl0s' +
		'DQphW2NsYXNzPSJjYXRlZ29yeV9saW5rIl0sZGl2W2NsYXNzPSJyb3cxIl0sdGRbYWxpZ249InJpZ2h0' +
		'Il0sDQp0cltjbGFzcz0icGFuZWxIZWFkZXIiXSx0cltiZ2NvbG9yPSIjYzlkNmViIl0saW5wdXQsZm9y' +
		'bSxvcHRpb24sc2VsZWN0DQp7DQoJYm9yZGVyLWNvbG9yOiAjOTk5ICFpbXBvcnRhbnQ7DQp9DQoNCg0K' +
		'LyogTUVOVSAqLw0KbGkubmF2TGlzdCBhDQp7IA0KY29sb3I6ICMwMDAgIWltcG9ydGFudDsNCmJhY2tn' +
		'cm91bmQtY29sb3I6ICM2NjYgIWltcG9ydGFudDsgDQp0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9y' +
		'dGFudDsNCn0NCmxpLm5hdkxpc3QgYTpob3ZlciANCnsgDQpjb2xvcjogIzMzMyAhaW1wb3J0YW50Ow0K' +
		'YmFja2dyb3VuZC1jb2xvcjogIzk5OSAhaW1wb3J0YW50OyANCn0NCg0KLyogQURBUFRBQ09FUyAqLw0K' +
		'DQovKg0KdGRbdmFsaWduPSJ0b3AiXVthbGlnbj0icmlnaHQiXSwNCnRkW2FsaWduPSJyaWdodCJdW25v' +
		'd3JhcF0sDQp0ZFthbGlnbj0icmlnaHQiXVtzdHlsZT0icGFkZGluZzogMHB0IDVweDsiXQ0KeyANCmJh' +
		'Y2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQgDQp9DQoqLw0KaW1nW3NyYyo9Imlfc29jaWFs' +
		'X2J3LmdpZiJdLA0KaW1nW3NyYyo9ImlfcHJvZmVzc2lvbmFsX2NvbG9yLmdpZiJdLA0KaW1nW3NyYyo9' +
		'ImlfcGVyc29uYWxfY29sb3IuZ2lmIl0sDQppbWdbc3JjKj0idGFiYW5nbGVfYmx1ZS5naWYiXSwNCmlt' +
		'Z1tzcmMqPSJpX3NvY2lhbF9jb2xvci5naWYiXSwNCmltZ1tzcmMqPSJ0YWJhbmdsZV9ncmV5LmdpZiJd' +
		'LA0KaW1nW3NyYyo9ImlfcHJvZmVzc2lvbmFsX2J3LmdpZiJdLA0KaW1nW3NyYyo9ImlfcGVyc29uYWxf' +
		'YncuZ2lmIl0sDQppbWdbc3JjKj0idGFiX2dyYXkuZ2lmIl0sDQppbWdbc3JjKj0idGFiX2J0eF9ncmF5' +
		'LmdpZiJdLA0KaW1nW3NyYyo9InRhYl9ibHVlLmdpZiJdLA0KdGFibGVbaWQ9ImZvb3RlciJdLA0KdGRb' +
		'c3R5bGUqPSJ0cjEwLmdpZiJdLA0KdGRbYmFja2dyb3VuZCo9InRyNC5naWYiXQ0Kew0KCWRpc3BsYXk6' +
		'IG5vbmUgIWltcG9ydGFudDsNCn0NCnRkW2JhY2tncm91bmQqPSJ0cjguZ2lmIl1bYWxpZ249InJpZ2h0' +
		'Il0NCnsNCmRpc3BsYXk6bm9uZSAhaW1wb3J0YW50Ow0KDQoNCn0NCnRkW2lkPSJoZWFkZXJNZW51Il0N' +
		'CnsNCnRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50Ow0KfQ0KaW1nW3NyYyo9ImFscGgiXQ0Kew0K' +
		'CW1heC13aWR0aDogMHB4ICFpbXBvcnRhbnQ7IA0KCW1heC1oZWlnaHQ6IDBweCAhaW1wb3J0YW50OyAN' +
		'Cn0NCmltZ1tzcmMqPSJhbHBoIl06YWZ0ZXINCnsgDQoJY29udGVudDogYXR0cihhbHQpICFpbXBvcnRh' +
		'bnQ7DQp9DQoNCi5uZXdzSXRlbSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQ0KDQp0ZFt2YWxp' +
		'Z249InRvcCJdW3dpZHRoPSI1OTQiXSB7DQoJd2lkdGg6IDEwMCUgIWltcG9ydGFudDsNCn0NCg0KdGRb' +
		'aWQ9ImhlYWRlck1lbnUiXXsNCnRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50Ow0KY29sb3I6ICM2' +
		'NjYgIWltcG9ydGFudDsNCmJhY2tncm91bmQ6ICM2NjYgIWltcG9ydGFudDsNCn0NCiNoZWFkZXJNZW51' +
		'IGE6bGluaywgI2hlYWRlck1lbnUgYTp2aXNpdGVkIHsgCXRleHQtZGVjb3JhdGlvbjpub25lICFpbXBv' +
		'cnRhbnQ7CW1hcmdpbiA6IDVweDsJZm9udC1zaXplOiAxMnB4O30NCg0KdGl0bGUgew0KCWJhY2tncm91' +
		'bmQ6IEJsdWU7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCWxlZnQ6IDEwcHg7DQoJdG9wOiAxMHB4Ow0K' +
		'CWNvbnRlbnQ6ICdMTExMTExMTExMTExMTExPTCc7DQp9';



  style = document.createElement('link');
  style . href = css ;
  style . rel  = 'stylesheet';
  style . type = 'text/css';
 
document.getElementsByTagName('head').item(0).appendChild(style)