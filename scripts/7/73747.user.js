// ==UserScript==
// @name           erep Id stripper
// @namespace      www.userscript.org/sripts/show
// @include        http://www.erepublik.com/en/rankings/citizens/country/*/63
// ==/UserScript==

	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	var iframe, text, btn_state=0, i=0, inpt;
	var url_r= 'http://www.erepublik.com/en/rankings/citizens/country/';
	
	var style= (<r><![CDATA[
		.area{background-color:#e9f5fa;font:600 12px sans-serif;text-shadow:1px 1px #999999;color:#7ec3db;}
		.buttn{margin-top:3px;background-color:#e9f5fa;font:600 15px sans-serif;color:#7ec3db;width:60px;border:1px solid #7ec3db;}
		.buttn:hover{border:1px solid #e9f5fa;}
		.inpt{margin:3px 0px 0px 4px;width:50px;}
	]]></r>).toString();
	
(function (){
	GM_addStyle(style);
	text= create('textarea');
	text.className= 'area';
	text.cols= 107;
	text.rows= 15;
	text.readonly= 'readonly';
	
	var div= create('div');
	div.appendChild(text);
	inpt= create('input');
	inpt.type= 'button';
	inpt.value= 'Start';
	inpt.className= 'buttn';
	inpt.addEventListener('click', Handler, false);
	div.appendChild(inpt);
	inpt= create('input');
	inpt.type= 'text';
	inpt.className= 'inpt';
	inpt.value= '0';
	inpt.addEventListener('keypress', function (e){
		var k= window.e || e;
		k= k.charCode || k.keyCode;
		if (k<48 || k>57) e.preventDefault();
	}, false);
	div.appendChild(inpt);
	
	var a= byClass('holder')[0];
	a.parentNode.insertBefore(div, a);
	
	iframe= document.createElement('iframe');
	iframe.style.display= 'none';
	document.body.appendChild(iframe);
})()

function StripId(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_r+i+'/63',
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState==4 && e.status!=200) return 1;
			var a= byClass('dotted');
			var b;
			var data= text.textContent;
			for (var j=0; j<a.length; j++){
				b= a[j].href.split('/');
				data+=b[b.length-1]+',';
			}
			text.textContent= data;
			i--;
			if (i>0 && btn_state) StripId();
		}
	});
}

function Handler(){
	if (btn_state){ btn_state=0; this.value= 'Start'; }
	else { btn_state=1; this.value= 'Stop'; }
	var j= Number(inpt.value);
	inpt.value= '0';
	var k= byClass('pager')[0].getElementsByTagName('a');
	k= k[k.length-1].href.split('/');
	k= Number(k[k.length-1]);
	
	if (!j){ if (!i) i=k; }
	else { if (j>k) i=k; else i=j; }
	
	StripId();
}

