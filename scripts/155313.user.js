// ==UserScript==
// @name        Tumblr Notecap
// @author      scibot9000
// @namespace   http://scibot9000.tumblr.com
// @description add "!too many notes" to your Tumblr Savior block list, set threshhold via the box at right sidebar. Refresh to apply changes, enjoy capped notes.
// @include        *tumblr.com/dashboard* 
// @version     0.3
// ==/UserScript==


lastlilistlength = 1;
function ch(){
	lilist = document.getElementById("posts").getElementsByTagName("li");
	if(lilist.length > lastlilistlength){
		//cycle li
		for(q=lastlilistlength;q<=lilist.length;q++){
			//check note count
			notecount=0;
			try{
				chspan = document.getElementById("posts").getElementsByTagName("li")[q].getElementsByTagName("span")[1];
				if(chspan.getAttribute("id").indexOf("note")!=-1){
					notecount = parseInt(chspan.innerHTML.replace(/\D/g,""))
				}
			}catch(e){}
			if(notecount>=cookiegrab){
				//if note count is higher than thresh, do this:
					if(document.getElementById("posts").getElementsByTagName("li")[q].getAttribute("class").indexOf("tumblr_savior")==-1){
					var insertme = document.createElement("a");
					insertme.setAttribute("class","tag");
					insertme.setAttribute("style","display:none");
					insertme.appendChild(document.createTextNode( "!too many notes" ));
					a = document.getElementById("posts").getElementsByTagName("li")[q]
						asd = a.getElementsByTagName("a");
						for(z=0;z<asd.length;z++){
							if(asd[z].getAttribute("class")=="tag"){
								asd[z].parentNode.appendChild(insertme);
								break;
							}
						}
						zxc = a.getElementsByTagName("div");
						for(s=0;s<zxc.length;s++){
							if(zxc[s].getAttribute("class").indexOf("post_content")!=-1){
								zxc[s].appendChild(insertme);
								break;
							}
						}
						try{
							document.getElementById("posts").getElementsByTagName("li")[q].setAttribute("style","-webkit-animation-name:falloff;-moz-animation-name:falloff;-ms-animation-name:falloff;-o-animation-name:falloff;animation-name:falloff;-webkit-transform-origin:right bottom;-moz-transform-origin:right bottom;-ms-transform-origin:right bottom;-o-transform-origin:right bottom;transform-origin:right bottom");
						}catch(e){}
				}
			}
		}
		lastlilistlength=lilist.length
	}

}



function getc(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return decodeURIComponent(unescape(y));
		}
	}
}


knownfeedlength=0;
function startsc(){
	cookiegrab = 1000000;
	if(getc("maxnotenumber")==null){
		exdate=new Date();
		exdate.setDate(exdate.getDate()+808);
		c_value=" ; expires="+exdate.toUTCString();
		document.cookie="maxnotenumber" + "=10000" + c_value;
		cookiegrab = 10000;
	}else{
		cookiegrab = parseInt(getc("maxnotenumber"));
	}
	
	lsp = document.createElement('span');
	lsp.setAttribute("class","subheading")
	lsp.appendChild(document.createTextNode( "anything with..." ));
	lul = document.createElement('ul');
	lul.setAttribute("class","controls_section")
	lli = document.createElement('li');
	lbut= document.createElement('input');
	lbut.setAttribute("type","button");
	lbut.setAttribute("value","notes or above shall be blocked");
	lbut.setAttribute("style","background: #163350;color: #D7D6DD;border: 2px solid #162941; ");
	lbut.setAttribute("onClick","exdate=new Date();exdate.setDate(exdate.getDate() + 909);document.cookie='maxnotenumber=' + parseInt(parentNode.getElementsByTagName('input')[0].value) + ';expires='+exdate.toUTCString();");
	inputr = document.createElement('input');
	inputr.setAttribute("type","text");
	inputr.setAttribute("size","6");
	inputr.setAttribute("value",cookiegrab);
	
	lli.appendChild(lsp)
	lli.appendChild(inputr)
	lli.appendChild(lbut)
	lul.appendChild(lli)
	document.getElementById("right_column").appendChild(lul);
	
	
	chinterval = setInterval(ch,500);/*tumblr notecap v0.3*/
}


setTimeout(startsc,2000);


