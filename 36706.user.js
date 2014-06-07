// ==UserScript==
// @name           QuickDefine
// @namespace      realillusions
// @include        *
// ==/UserScript==

var that;
RI_Init = function(){
if(!document.getElementById("ridefine")){
GM_addStyle("#ridefine{position:fixed;left:67px;top:58px;max-width:253px;padding:10px;background:#737373;color:AliceBlue;z-index:999;border:1px solid black;-moz-border-radius:6px;font-size:11px;font-family:Verdana;text-align:left;}"
				+"#ridefine a{text-decoration:none!important;color:LightBlue}"
				+"#ridefine a:hover{text-decoration:underline!important;color:LightCyan}")
definebox = document.createElement("div");
definebox.id="ridefine"
definebox.innerHTML='Enter word:<br/><input type="text" id="ri_form" />'
document.body.appendChild(definebox);
definebox.lastChild.focus();
definebox.addEventListener("keypress",function(e){if(e.keyCode==13){
																		that = this;
																		RI_Define(document.getElementById("ri_form").value);
																		this.innerHTML+='<br/>Loading...'
																		}
																	},true);
}
}

RI_Define = function(word){
definition = GM_xmlhttpRequest({
	method:'GET',
	url:"http://www.merriam-webster.com/dictionary/"+word,
	headers: {'User-Agent':navigator.userAgent},
	onload: function(rep){
		try{
		final = "<b>"+word+"</b>: "+rep.responseText.split('<strong>:</strong> ')[1].split("</span>")[0]+"<br/>";
		that.innerHTML=that.innerHTML.replace(/Loading.../,final);
		document.getElementById("ri_form").focus();
		}
		catch(e){
		oops = "Something went wrong:<br/><br/><code>"+e+'</code><br/><br/><a href="'+this.url+'"><i>'+word+'</i> via Merriam-Webster</a><br/>'
				 +'<sub>Opening in a new page in 5 seconds...</sub>';
		that.innerHTML=that.innerHTML.replace(/Loading.../,oops);
		j=4;
		here = this
		i = setInterval(function(){that.innerHTML=that.innerHTML.replace(j+1,j);j--;if(j==-1){clearInterval(i);window.open(here.url);}},1000)
		}
	 },
	data:null
	})
}

document.addEventListener("keypress",function(e){
														if(e.altKey && e.charCode==(107||75)){
																	RI_Init();
																	}
														if(e.keyCode==27 && document.getElementById("ridefine")){
															document.getElementById("ridefine").parentNode.removeChild(document.getElementById("ridefine"));
															}
														},true);