// ==UserScript==
// @name           Auto BB Registration
// @namespace      http://adder.com
// @include        http*://*register*
// @include        http*://*profile.php*
// @version        0.3
// ==/UserScript==

function getEl(elName){
	for(i=0;i<document.forms[getRegForm()].elements.length;i++) if(document.forms[getRegForm()].elements[i].getAttribute("name")==elName) return i;
}

username="";
password="";

function saveInfo(){
	f=document.forms[getRegForm()];
	GM_setValue("username",f.elements[getEl(username)].value);
	GM_setValue("new_password",f.elements[getEl(password)].value);
	alert("Form information successfully saved!\nIt will be used for autofill.");
}

function focusFirstBlankField(f){
	i=0;
	while(f.elements[i].value!="" && i<f.elements.length-1) i++;
	f.elements[i].focus();
}

function getActLink(){
	t=document.getElementById("emailTable").tBodies[0];
	
	messageURL=t.rows[t.rows.length-1].cells[2].firstChild.getAttribute("href");
	mf=document.getElementById("tmMail");
	mf.parentNode.removeChild(mf);
	
	GM_deleteValue("mailsInBox");
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://10minutemail.com"+messageURL,
		onload: function(response){
			document.body.innerHTML+='<div id="tmMail" style="display:none">'+response.responseText+'</div>';
			
			actEmail=document.getElementById("content").innerHTML.split("\n");						
			actURL="";
			for(i=0;i<actEmail.length;i++) if(actEmail[i].indexOf("http://")>-1 && (actEmail[i].indexOf("activate")>-1 || actEmail[i].indexOf("a=act")>-1)){ actURL=actEmail[i].replace("<br>",""); break; }			
			document.location.href=actURL.replace(/&amp;/g,"&");
		}
	});	
}

d=0;

function animateDots(){
	p=document.getElementById("BBdots");	
	l=document.getElementById("BBmirror");
	d=d<3?d+1:0;
	o="";
	for(i=0;i<d;i++) o+=".";
	p.innerHTML=o;
	l.innerHTML=o;
	setTimeout(animateDots,400);
}

function waitForMail(){	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://10minutemail.com/10MinuteMail/index.html",
		onload: function(response){
			document.body.innerHTML+='<div id="tmMail" style="display:none">'+response.responseText+'</div>';
			if(!document.getElementById("emailTable").tBodies[0].rows[0]){
				
				mf=document.getElementById("tmMail");
				mf.parentNode.removeChild(mf);
				setTimeout(waitForMail,1000);
			}
			else if(document.getElementById("emailTable").tBodies[0].rows.length==mailsInBox){
				mf=document.getElementById("tmMail");
				mf.parentNode.removeChild(mf);
				setTimeout(waitForMail,1000);
			}
			else getActLink()
		}
	});
}

regForm=-1;
mailsInBox=GM_getValue("mailsInBox")==undefined?0:GM_getValue("mailsInBox");
m="";

function getRegForm(){	
	if(regForm>-1) return regForm;
	
	ss=document.location.href.indexOf("profile.php")>-1?"profile.php":"register";
	f=document.forms;
	for(i=0;i<f.length;i++) if(f[i].getAttribute("action").indexOf(ss)>-1){ regForm=i; return i; }
}

function Load(){
	
	if(document.location.href.indexOf("a=act")>-1 && document.referrer.indexOf("do=addmember")>-1) return;
	
	if(document.location.href.indexOf("register")==-1)
		if(document.referrer.indexOf("register")==-1) return;
	
	if(document.getElementById("agreed")){
		document.getElementById("agreed").click();
		return;
	}
	if(document.forms[getRegForm()]==undefined){
		a=document.getElementsByTagName("a");
		for(i=0;i<a.length;i++){
			if(a[i].getAttribute("href"))
				if(a[i].getAttribute("href").indexOf("agreed=")>-1){ document.location.href=a[i].getAttribute("href"); return; }
		}
	}
			
	ch=document.getElementsByTagName("input");
	for(i=0;i<ch.length;i++) if(ch[i].getAttribute("name")=="pf_rules"){
		ch=ch[i];
		ch.setAttribute("checked","checked");
		break;
	}
	
	if(document.getElementById("regagree")){
		document.getElementById("regagree").setAttribute("checked","checked");
		document.forms[getRegForm()].elements[getEl("regSubmit")].removeAttribute("disabled");
	}
	
	if(document.forms[getRegForm()]!=undefined){
	
		if(document.forms[getRegForm()].elements[getEl("agree")]!=undefined){
			f=document.forms[getRegForm()];
			if(f.elements[getEl("agree")].getAttribute("type")=="checkbox"){
				f.elements[getEl("agree")].setAttribute("checked","checked");
				f.submit();
			}
		}
				
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://10minutemail.com/10MinuteMail/index.html",
			onload: function(response){
				document.body.innerHTML+='<div id="tmMail" style="display:none">'+response.responseText+'</div>';
				m=document.getElementById("addyForm:addressSelect").value;
				
				r=document.getElementById("leftpart").getElementsByTagName("a");				
				for(i=0;i<r.length;i++) 
					if(r[i].getAttribute("href")) if(r[i].getAttribute("href").indexOf("resetSessionLife")>-1){
						GM_xmlhttpRequest({
							method: "GET",
							url: "http://10minutemail.com/10MinuteMail"+r[i].getAttribute("href"),
							onload: function(resp){}
						});
						break;
					}
				
				if(document.getElementById("emailTable").tBodies[0].rows[0]){
					mailsInBox=document.getElementById("emailTable").tBodies[0].rows.length;
					GM_setValue("mailsInBox",mailsInBox);
				}	

				f=document.forms[getRegForm()];
				
				if(GM_getValue("username")!=undefined){
					if(f.elements[getEl("username")]!=undefined){
						f.elements[getEl("username")].value=GM_getValue("username");
						username="username";
					}
					if(f.elements[getEl("user")]!=undefined){
						f.elements[getEl("user")].value=GM_getValue("username");
						username="user";
					}
				}
				
				
				if(GM_getValue("new_password")!=undefined){
					if(f.elements[getEl("new_password")]!=undefined){
						f.elements[getEl("new_password")].value=GM_getValue("new_password");
						f.elements[getEl("password_confirm")].value=GM_getValue("new_password");
						password="new_password";
					}
					if(f.elements[getEl("passwrd1")]!=undefined){
						f.elements[getEl("passwrd1")].value=GM_getValue("new_password");
						f.elements[getEl("passwrd2")].value=GM_getValue("new_password");
						password="passwrd1";
					}
					if(f.elements[getEl("password")]!=undefined){
						f.elements[getEl("password")].value=GM_getValue("new_password");
						f.elements[getEl("passwordconfirm")].value=GM_getValue("new_password");
						password="password";
					}
				}
															
				if(f.elements[getEl("email")]!=undefined) f.elements[getEl("email")].value=m;
				else if(f.elements[getEl("email1")]!=undefined){
					m1=m.split("@")[0];
					m2=m.split("@")[1];
					f.elements[getEl("email1")].value=m1;
					f.elements[getEl("email2")].value=m2;
				}
				
				if(f.elements[getEl("email_confirm")]!=undefined) f.elements[getEl("email_confirm")].value=m;
				if(f.elements[getEl("emailconfirm")]!=undefined) f.elements[getEl("emailconfirm")].value=m;
				
				focusFirstBlankField(document.forms[getRegForm()]);
				
									
				
				if(f.elements[getEl("submit")]!=undefined){
					buttonClass=f.elements[getEl("submit")].getAttribute("class")?f.elements[getEl("submit")].getAttribute("class"):"";
					f.elements[getEl("submit")].parentNode.innerHTML+='&nbsp;&nbsp;<input class="'+buttonClass+'" type="button" id="SaveForm" value="Save Filled Information" />';
					document.getElementById("SaveForm").addEventListener("click",saveInfo,false);
				}				
				else if(f.elements[getEl("regSubmit")]!=undefined){
					buttonClass=f.elements[getEl("regSubmit")].getAttribute("class")?f.elements[getEl("regSubmit")].getAttribute("class"):"";
					f.elements[getEl("regSubmit")].parentNode.innerHTML+='&nbsp;&nbsp;<input class="'+buttonClass+'" type="button" id="SaveForm" value="Save Filled Information" />';
					document.getElementById("SaveForm").addEventListener("click",saveInfo,false);
				}				
				else for(i=1;i<=2;i++)
					if(f.elements[f.elements.length-i].getAttribute("type")=="submit"){
						buttonClass=f.elements[f.elements.length-i].getAttribute("class")?f.elements[f.elements.length-i].getAttribute("class"):"";
						f.elements[f.elements.length-i].parentNode.innerHTML+='&nbsp;&nbsp;<input class="'+buttonClass+'" type="button" id="SaveForm" value="Save Filled Information" />';
						document.getElementById("SaveForm").addEventListener("click",saveInfo,false);
					}
				
			}
		});
	}
	else{
		done=false;
		p=document.getElementsByTagName("p");
		if(p.length==0) p=document.getElementsByTagName("span");
		if(p.length>0){
			for(i=0;i<p.length;i++) if(p[i].getAttribute("class")) if(p[i].getAttribute("class")=="gen"){
				p[i].innerHTML+='<br/><br/> <span id="BBmirror" style="visibility:hidden"></span><b>[BB Registration]</b> Waiting for an activation email<span id="BBdots"></span>';
				done=true;			
				break;
			}
			t=document.getElementsByTagName("tr");
			for(i=0;i<t.length;i++) if(t[i].getAttribute("class")=="windowbg"){
				t[i].cells[0].innerHTML+='<br/><br/> <span id="BBmirror" style="display:none"></span><b>[BB Registration]</b> Waiting for an activation email<span id="BBdots"></span>';
				done=true;
				break;
			}
		}
		if(!done){
			d=document.getElementsByTagName("div");
			for(i=0;i<d.length;i++) if(d[i].innerHTML) if(d[i].childNodes[1]) if(d[i].childNodes[1].nodeName=="A" && d[i].innerHTML.indexOf(m)>-1){
				d[i].innerHTML+='<br/><br/> <span id="BBmirror" style="display:none"></span><b>[BB Registration]</b> Waiting for an activation email<span id="BBdots"></span>';
				done=true;
				break;				
			}	
		}
		
		if(done) animateDots();
		
		waitForMail();			
	}	
}

window.addEventListener("load",Load,false);
