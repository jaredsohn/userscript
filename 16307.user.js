// ==UserScript==
// @name           Automatic Newsletters Subscriber
// @namespace      Newsletters
// @description    Subscribe automatic email addresses to all newsletters during surfing
// @include        *
// ==/UserScript==

var emails=[];

if (emails.length!=0) SubscribeEmails();

function SubscribeEmails()
{
	
	var forms=document.getElementsByTagName("form");

	var location=window.location.toString();
	var num0=location.indexOf("/",location.indexOf("://")+3);
	if (num0!=-1) location=location.substring(0,num0);

	for(var num1=0;num1<forms.length;num1++)
	{
		var textboxCount=0;
		var passwordCount=0;
		var form=forms[num1];
		var subscribeSubmit=false;
		var action=form.action;

		if (action==null || action.length==0) action=window.location.toString();
		var allowXmlHttpRequest=action.indexOf(location)==0;

		var inputs=form.getElementsByTagName("input");
		for(var num3=0;num3<inputs.length;num3++)
		{
			var input=inputs[num3];
			if (input.type=="text") textboxCount++;
			else if (input.type=="password") passwordCount++;
			else if (input.type=="submit") subscribeSubmit|=input.value.toLowerCase().indexOf("subscribe")!=-1;
		}

		var content=form.innerHTML.toLowerCase();
		var containsEmailWord=content.indexOf("email")!=-1 || content.indexOf("e-mail")!=-1;
		var containsSubjectWord=content.indexOf("subject")!=-1;

		//GM_log("Number of textboxs: "+textboxCount);
		//GM_log("Number of textboxs: "+passswordCount);
		//GM_log("Subscribe submit? "+subscribeSubmit);
		//GM_log("Html contains email word? "+containsEmailWord);
		//GM_log("Html contains subject word? "+containsSubjectWord);
		//GM_log("Allow XmlHttpRequest? "+allowXmlHttpRequest);

		if (allowXmlHttpRequest && containsEmailWord && !containsSubjectWord &&(subscribeSubmit || (textboxCount>0 && textboxCount<3 && passwordCount==0)))
		{
			//GM_log("Preparing form to be submitted");
		
			var post=form.method.toUpperCase()=="POST";
			var encodeFunction=post?encodeURI:encodeURIComponent;

			var params=new Array();

			for(var num4=0;num4<inputs.length;num4++)
			{
				var input=inputs[num4];
			
				//GM_log("Preparing input "+num4);

				switch(input.type)
				{
					case "text":
						params.push(encodeFunction(input.name)+"={0}");
						break;
					case "checkbox":
					case "radio":
					case "submit":
					case "hidden":
						params.push(encodeFunction(input.name)+"="+encodeFunction(input.value?input.value:"on"));
						break;
				}
			}

			var selects=form.getElementsByTagName("select");
			for(var num4=0;num4<selects.length;num4++)
			{
				//GM_log("Preparing select "+num4);

				var select=selects[num4];
				var selectedIndex=select.selectedIndex;
				if (selectedIndex==-1) selectedIndex=0;
				var selectedValue=select.options[selectedIndex].value;
				if (selectedValue==null || selectedValue.length==0) selectedValue=select.options[selectedIndex].text;
				params.push(encodeFunction(select.name)+"="+encodeFunction(selectedValue));
			}

			//GM_log("Parameters preparation finished");
	
			var contentAnon=params.join("&");

			window.clients=new Array();

			for(var num5=0;num5<emails.length;num5++)
			{
				var email=emails[num5];
				var contentEmail=contentAnon.replace("{0}",encodeFunction(email));
				var stateChangeFunction=new Function("var client=window.clients["+num5+"]; var div=document.createElement(\"DIV\"); div.style.border=\"solid 1px red\"; div.style.backgroundColor=\"yellow\"; div.style.color=\"red\"; client.form.appendChild(div); if (client.readyState==4) {if (client.status==200) div.innerHTML=\"Email address "+email+" sucessfully subscribed to the mailing list\"; else div.innerHTML=\"Subscription of email "+email+" to the mailing list has generated an error\"}");
				var client=new XMLHttpRequest();
				client.onreadystatechange=stateChangeFunction;
				client.overrideMimeType("text/html");
				client.form=form;
				window.clients[num5]=client;

				//GM_log("Preparing to subscribe email "+email+" ("+post+") to be submitted to "+url);

				try
				{
					if (post)
					{
						client.open("POST",action);
						client.setRequestHeader("Content-type","x-www-form-urlencoded");
						client.send(contentEmail);
					}
					else
					{
						client.open("GET",action+"?"+contentEmail);
						client.send();
					}
				}
				catch(ex)
				{
					GM_log(ex.message+"\nwindow location: "+window.location+"\nform action: "+form.action);
				}
			}
		}
	}
}

