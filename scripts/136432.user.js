// ==UserScript==
// @name          Google CSE To DuckDuckGo
// @namespace     namespace:googlecsetoduckduckgo
// @description   Replaces Google Custom Search Engine Boxes with a DuckDuckGo Search box.
// @version       1.0
// ==/UserScript==


for(var i=0;i<document.forms.length;i++) 
{
	var f=document.forms[i];
	var qlock=false;
	var cxlock=false;
	for(var j=0;j<f.elements.length;j++) 
	{
		var e=f.elements[j];
		if(e.tagName=="INPUT")
		{
			if(e.name=="cx" && e.type=="hidden") cxlock=true;
			else if(e.name=="q" && e.type=="text") qlock=true;
		}				
	}
	
	if(qlock && cxlock)
	{
		var nf = document.createElement("FORM");
		nf.action="https://duckduckgo.com/?q=site%3Atest.com";
		nf.method="get";
		nf.id="cse2ddgform"+Math.floor(99999*Math.random());
		nf.addEventListener("submit",function(){document.getElementById(nf.id+"_q_").value="site:"+location.hostname+" "+document.getElementById(nf.id+"_q_").value;});
				
		var st=document.createElement("INPUT");
		st.name="q";
		st.id=nf.id+"_q_";
		st.type="text";
		nf.appendChild(st);
		
		var kd= document.createElement("INPUT");
		kd.name="kd";
		kd.value="1"; 
		kd.type="hidden";
		nf.appendChild(kd);
		
		var kh= document.createElement("INPUT");
		kh.name="kh";
		kh.value="1"; 
		kh.type="hidden";
		nf.appendChild(kh);
				
		var sb= document.createElement("INPUT");
		sb.name="_sb_";
		sb.value="Search with DDG"; 
		sb.type="submit";
		
		nf.appendChild(sb);
		f.parentNode.replaceChild(nf,f);
	}
}
