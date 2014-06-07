// ==UserScript==
// @id             vanhoa_acelife_001
// @name           Hien thi menu
// @version        1.2
// @namespace      vanhoa_acelife
// @author         vanhoa
// @description    
// @include        http://www.baohiemacelife.com.vn/life/*
// @include        http://baohiemacelife.com.vn/life/*
// @run-at         document-end
// ==/UserScript==

function appendScript(){
	var script = document.createElement('script'); 
	script.type = "text/javascript"; 
	script.innerHTML = (main+";main();");
	document.getElementsByTagName('head')[0].appendChild(script);
}

function main(){
	//try{
	//	l=document.getElementsByTagName("tr");
	//	s="";
	//	for(i in l){
	//		if(l[i].style)
	//			s+=(l[i].style.display)+";";
	//	}
	//	alert(s);
	//}catch(e){};
	try{
		eval((DisTableXmlThree+"")
		.replace(/function DisTableXmlThree\(([^\)]+)\)[\s\n\r\t]*./,
			"DisTableXmlThree=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	try{
		eval((RefreshInsured+"")
		.replace(/function RefreshInsured\(([^\)]+)\)[\s\n\r\t]*./,
			"RefreshInsured=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	try{
		eval((RefreshProduct+"")
		.replace(/function RefreshProduct\(([^\)]+)\)[\s\n\r\t]*./,
			"RefreshProduct=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	try{
		eval((GeneTableHtmlXmlThree+"")
		.replace(/function GeneTableHtmlXmlThree\(([^\)]+)\)[\s\n\r\t]*./,
			"GeneTableHtmlXmlThree=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	try{
		eval((DisTableXmlTwo+"")
		.replace(/function DisTableXmlTwo\(([^\)]+)\)[\s\n\r\t]*./,
			"DisTableXmlTwo=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	try{
		eval((GeneTableHtmlXmlTwo+"")
		.replace(/function GeneTableHtmlXmlTwo\(([^\)]+)\)[\s\n\r\t]*./,
			"GeneTableHtmlXmlTwo=function($1){")
		.replace(/"block"/g,'""')
	);}catch(e){};
	window.event=new Object();
	window.event.srcElement=new Object();
	window.event.srcElement.value=-1;
	window.ActiveXObject=function(){
		return {
  		async: 1,
  		documentElement: null,
  		load: function(url){
  			if(url===undefined) return;
  			var srcLoader = new XMLHttpRequest();
  			srcLoader.open("GET",url,false);
  			try{
	  			srcLoader.send(null);
				}catch(e){}
  			s=(srcLoader.responseText).replace(/^[\s\n\r\t]+/gm,'');
				ret=(this.documentElement=(new DOMParser()).parseFromString(s,"text/xml"));
				//ret.selectSingleNode=function(n){return cSelectSingleNode(this,n);};
				this.documentElement=ret.selectSingleNode(ret.childNodes[0].nodeName);
				//alert(this.documentElement);
				return ret;
			}
  	};
 	}; 
 	basicXML=new window.ActiveXObject();
 HTMLDocument.prototype.__defineGetter__("all",function(){return this.getElementsByTagName("*");});
 Object.prototype.__defineGetter__("description",function(){return this.toString()+String.fromCharCode(13)+String.fromCharCode(13)+String.fromCharCode(13)+this.stack.toString();});
	HTMLElement.prototype.__defineGetter__("outerHTML", function()  
	{  
	    var a = this.attributes, str = "<" + this.tagName, i = 0; for (; i < a.length; i++)  
	        if (a[i].specified)  
	        str += " " + a[i].name + '="' + a[i].value + '"';  
	    return str + ">" + this.innerHTML + "</" + this.tagName + ">";  
	});  
	HTMLElement.prototype.__defineSetter__("outerHTML", function (sHTML) {
   var r = this.ownerDocument.createRange();
   r.setStartBefore(this);
   var df = r.createContextualFragment(sHTML);
   this.parentNode.replaceChild(df, this);
   //alert(sHTML);
	});
	Element.prototype.__defineGetter__("text",function(){
		return this.textContent;
	}) ;
	XMLDocument.prototype.selectSingleNode=function(elementPath)
	{
	     var xpe = new XPathEvaluator();
	     var nsResolver = xpe.createNSResolver( this.ownerDocument == null ? this.documentElement : this.ownerDocument.documentElement);
	     var results = xpe.evaluate(elementPath,this,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	     return results.singleNodeValue; 
	}
	Element.prototype.selectSingleNode = function(cXPathString){    
	     var xpe = new XPathEvaluator();
	     var nsResolver = xpe.createNSResolver( this.ownerDocument == null ? this.documentElement : this.ownerDocument.documentElement);
	     var results = xpe.evaluate(cXPathString,this,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	     return results.singleNodeValue; 
	}
	String.prototype.toACEDate=function(){
		fld=this.replace(/^[^0-9]*(.*)[^0-9]*$/g,"$1").split(/[^0-9]+/g);
		fld[2]=parseInt(fld[2]);
		if(fld[2]<100)
			if(fld[2]<11) fld[2]+=1900;
			else fld[2]+=2000;
		if(fld[1].length<2) fld[1]="0"+fld[1];
		if(fld[0].length<2) fld[0]="0"+fld[0];
		ret=fld[2]+"-"+fld[1]+"-"+fld[0];
		return ret;
	}
	showMenu =function (mod,modid){
		s="<h2>Menu</h2>";
		for(i=0;i<modid.length;i++){
			id=modid[i];
			for(i2=0;i2<mod.length;i2++){
				if(id==mod[i2][0]){
					s+="<a href=\""+mod[i2][3]+"\"><h3>"+mod[i2][2]+"</h3></a><br>";
				}
			}
		}
		return s;
	}
	try{
		inner=document.getElementsByTagName("html")[0].innerHTML+"";
		if((s=((inner).match(/(va[r] modules[^<]+)/mg)))!=null){
			s=s[0].substr(0,s[0].indexOf('var node'));
			s+=";document.body.innerHTML=showMenu(modules,user_module);";
			eval(s);
		} else{
			if(null!=(inner.match(/[d]ocument\.form[1]\.insuredBirthday/g))){
				s=(save+"");
				s=s.replace(/function save\(\)[\s\n\r\t]*./,
					"save=function(){"
					+"document.form1.insuredBirthday.value="
					+"(document.form1.insuredBirthday_hidden.value+'').toACEDate();");
				eval(s);
			}
		}
	}catch(e){};
	try{
		BeforeLoad();
	}catch(e){};
}

appendScript();