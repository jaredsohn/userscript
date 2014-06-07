// ==UserScript==
// @name           EclippTV Direct Video Download Link
// @namespace      http://www.digivill.net/~joykillr
// @description    Gives a direct video download link on EclippTV video page.
// @include        http://*.eclipptv.com/*
// @include        http://eclipptv.com/*
// ==/UserScript==

//v 1.5

function getResponseXML() {
  if(this._responseXML) {return this._responseXML;}
  return this._responseXML = new DOMParser().parseFromString(this.responseText,'text/xml');
}

var z2="x",n3="m",mr="1\/",f1="r",a3="ss",b9="t",c4="a",r2="ld",ld="d2",xml="data",ss="rm",go="com",g="a\/",ldg="a\/",_v="d",ldgg="\=",x="mr",ss="ss",lda="\/",z3=z2,n31="12",n33="33",i="i",z1=z2,n4=n3,n2=f1,c4a="\?",_cn="nn",cn="t",c4b="\!",j="p\?",c4e="d",xss=ldgg,_n3="_c",a=xss,ldaa="l",_z="g",_g="y",_x="en",_y=lda,_q="e",_zz="\/",_as="su",_r="c",_s="h",_j="h",_t="p",_u="r\/",_x_z=_s,hd="co",xm=_v,_ss="pl",_nn=_zz,pl="ec",_ml=xss,_re="er",_f=c4,b="l",k=_nn,_c4=_t,h="x",r=_q,_c=".",ml=hd,_hd=_q,_xml="xml",_a_ss="u";

function getDat(x) {
	GM_xmlhttpRequest({
		method:"GET",
		url:x,
		headers:{
			"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6",
            "Accept":"application/xml,text/xml"
		},
		onload:function(details) {
			//details.responseXML getter = getResponseXML;
			//var ul = details.responseXML;
			//hackm(ul);
			var URLstring = new String(details.responseText);
			if (URLstring!=null&&URLstring!="") {
				var l = isolate(URLstring);
				addDLLink(l);
			}
		}
	});
}


function hackm(llll) {
	if (llll.getElementsByTagName("URLMOV1")[0]) {
		//hID = llll.getElementsByTagName("urlMOV1")[0].textContent.toString();
		hID = llll.getElementsByTagName("urlMOV1")[0].innerHTML.toString();
		hID = hID.replace("\n","").replace("\ ","").replace("\<WBR\/\>","");
	}
	if (hID!=null&&hID!="") {addDLLink(hID);}
}

function isolate(u){
	u = u.split('videoData')[1];
	u = u.split('\<urlMOV1\>')[1].split('\<\/urlMOV1\>')[0];
	return u;
}

function addDLLink(lnlnl) {
	var lnnl = document.createElement("div");
	//nn.setAttribute("id","vid_dl_link");
	lnnl.innerHTML = '\<a\ href\=\"'+lnlnl+'\"\ style=\"z-index:10000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	lnnl.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(lnnl,document.body.firstChild);
}

if (window.content.location.href.match(/id\=\d{1,9}/i)) {
	var hid = window.content.location.href.match(/video_id\=\d{1,9}/i).toString();
	var hiD = window.content.location.host.toString();
	var hId = window.content.location.protocol.toString();
	if (hid&&hId&&hiD) {getDat(hId+_nn+k+hiD+_y+_z+_x+_q+f1+c4+ldaa+lda+_x_z+xm+_ss+_f+_g+_re+_y+_c4+b+_f+_g+r+_u+h+n3+b+_n3+"o"+_cn+pl+cn+_c+_t+_j+j+ml+_v+_hd+_ml+hid.split("=")[1]);}
}
