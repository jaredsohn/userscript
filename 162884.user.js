// ==UserScript==
// @name        crplyd
// @namespace   crplyd
// @description crplyd
// @include     *
// @version     1
// ==/UserScript==
var lh=location.href;
	if(location.href.indexOf("qvod")>30){
		window.onload=function(){
		creat("D:\\cookies\\history{default}.json");
		Player.QVOD.domute();
		quiplay();
		setTimeout(lowplay, 10000);}
	}else{
		nyp();
	}

function quiplay(){
	var e=document.getElementById("loading").style.display,s=$("span.rate").text(),pe=Player.QVOD.etime,pb=Player.QVOD.object.BufferPercent;
	if (pe>0 || s=="正在播放" || e=="none" || s=="正在缓冲 100%" || pb>=3&&pb<10){
		cntpl();
	}else {
		setTimeout(quiplay, 100);
	}
}

function lowplay(){
	var s=$("span.rate").text();
	if (s=="正在缓冲 60%" || s=="正在缓冲..."){
		cntpl();
	}else if (s=="停止"){
		location.reload();
	}else if (s==""){
		alert("播放器崩溃,重启浏览器吧");
	}else{
		setTimeout(lowplay, 300);
	}
}

function cntpl(){
	var nobj=read("D:\\cookies\\history{default}.json"),lp=LI.count,ldl=LI.data,sl=/[a-z0-9]{40}/;
	for (var i=0;i<lp;i++){
		if (nobj.indexOf(ldl[i].link.match(sl))<0){
			ul=ldl[i].link;
			self.location=ul;break;
		}else if(i+1>=lp){
			window.close();
		}
	}
}

function nyp(){
	var d=document.getElementsByTagName("a"),t=d.length,nobj=read("D:\\cookies\\history{default}.json"),vd=parseInt(VideoID)-1,vcd=VideoCID,sl=/[a-z0-9]{40}/;
	for (var i=0;i<t;i++){
		if(d[i].href.indexOf("qvod")>30 && d[i].href.length>60 && nobj.indexOf(d[i].href.match(sl))<0 && vcd!=="14"){
			ul=d[i].href;
			self.location=ul;break;
		}else if (i+1>=t || vcd=="14"){
			window.close();
		}
	}
}

function read(file) {
	if(typeof window.ActiveXObject != 'undefined') {
		var content = "";
		try {
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var reader = fso.openTextFile(file, 1);
			while(!reader.AtEndofStream) {
				content += reader.readline();
				content += "\n";
			}
			// close the reader
			reader.close();
		}
		catch (e) {
			alert("Internet Explore read local file error: \n" + e);
		}
		// VeryHuo.Com
		return content;
	}else if(document.implementation && document.implementation.createDocument) {
		var content = ""
		try {
			netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
			var lf = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			lf.initWithPath(file);
			if (lf.exists() == false) {
				alert("File does not exist");
			}
			var fis = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
			fis.init(lf, 0x01, 00004, null);
			var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
			sis.init(fis);
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			content = converter.ConvertToUnicode(sis.read(sis.available()));
		}
		catch (e) {
			alert("Mozilla Firefox read local file error: \n" + e);
		}
		return content;
	}
}

function creat(c){
	var obj=read(c),lh=location.href,sl=/[a-f0-9]{40}/,t=lh.match(sl);
	if (obj==""){
		content= t;//'{"aURI":"'+lh+'"}';
	}else if(obj.indexOf(t)<0){
		content = obj+','+t;//obj+'\r\n'+'{"aURI":"'+lh+'"}';
	}else if (obj.indexOf(t)>=0){
		content = obj ;
	}
	var path = c
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	}catch (e) {
	   alert("no permisson..."); 
	}
	var file = Components.classes["@mozilla.org/file/local;1"] .createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(path); 
	if ( file.exists() == false ){ 
	  file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 ); 
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"] .createInstance( Components.interfaces.nsIFileOutputStream );
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 ); 
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"] .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
	converter.charset = 'UTF-8'; var convSource = converter.ConvertFromUnicode(content);
	var result = outputStream.write( convSource, convSource.length ); 
	outputStream.close();
}