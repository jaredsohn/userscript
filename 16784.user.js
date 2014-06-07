// ==UserScript==
// @name			GMail Contact Book
// @author			Firch Tsai
// @email			firchtsai@gmail.com
// @description		Add Contact Book beside To:, CC:, BCC: box for gmail.You can get the lastest version from http://userscripts.org/scripts/edit_src/16784 .Modify source code of [GMail Contact List] fromvhttp://userscripts.org/scripts/show/10548 .Address Book icons by Michael Okeh http://okeh.macthink.org
// @namespace		http://firchtsai.blogspot.com
// @include			*mail.google.com/mail/*
// ==/UserScript==



function getContacts(){

	var all_toBox = document.evaluate(
		    "//textarea[@id='to_compose']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
    
    var toBox = all_toBox.snapshotItem(0);
    
	if(!toBox)
	{
		all_toBox = document.evaluate(
		    "//textarea[contains(@id,'to_')]",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		    
		toBox = all_toBox.snapshotItem(0);

	}
	
	//table id="omt_?" is the nav bar for replay and forward,if we found it then we must in the mail read page. 
	var all_MailBox = document.evaluate(
		    "//table[contains(@id,'omt_')]",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
    
    var inMailBox = all_MailBox.snapshotItem(0);
	
	if(toBox || inMailBox)
	{
		var all_ccBox = document.evaluate(
		    "//textarea[@id='cc_compose']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		var ccBox = all_ccBox.snapshotItem(0);
		    
		if(!ccBox)
		{
														//ignore the bcc_
			all_ccBox = document.evaluate(
			    "//textarea[contains(@id,'cc_') and not(contains(@id,'bcc'))]",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);
			    
			ccBox = all_ccBox.snapshotItem(0);
	
		}	
		
		
		
		var all_bccBox = document.evaluate(
		    "//textarea[@id='bcc_compose']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		    
	    var bccBox = all_bccBox.snapshotItem(0);
	    
		if(!bccBox)
		{
			all_bccBox = document.evaluate(
			    "//textarea[contains(@id,'bcc_')]",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);
			    
			bccBox = all_bccBox.snapshotItem(0);
	
		}
		
		cleanContacts();
		cleanContacts(); //the second cleanContacts() is only to avoid the dalay insert bug (T_T)

		
		for (var i = 0; i < all_toBox.snapshotLength; i++)
		{
			toBox = all_toBox.snapshotItem(i);
			ccBox = all_ccBox.snapshotItem(i);
			bccBox = all_bccBox.snapshotItem(i);


			makeContacts(toBox,ccBox,bccBox);
			
		}

	}
	else
	{
			//table id="omt_?" is the nav bar for replay and forward,if we found it in parent window,then we must in the iframe of mail read page. 
			var all_MailBox = parent.document.evaluate(
		    "//table[contains(@id,'omt_')]",
		    parent.document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
    
    		var inMailBox_iFrame = all_MailBox.snapshotItem(0);
    		
    		if(inMailBox_iFrame)
    		{
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("load", false, false);
				parent.dispatchEvent(evt);
    		}
	}

}




function makeContacts(toBox,ccBox,bccBox)
{

	var addr_img_g = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABnRSTlMA/wD/AP83WBt9AAAACXBI'+
    'WXMAAAsTAAALEwEAmpwYAAAE0UlEQVR42pWVS2yUVRTH//fxvWe+6cx87dDWttNOeWhBI4hEjTwU'+
    'AlEXPBKjibrRlRujiRujCwxbFy5Eo/GFbl2o1CAE5NHGRgTElpS2tLR2Zko7785Mp9NvvntdTGkR'+
    'o8aTu7r3nN895+Q8iJQS/1PqJoSQOy/5P2kLIRYqxXRuJp2Lp3KJdDaeysVT2UQqG09nE6+9eHTX'+
    'o4fuBkkpLw1eyBbmphKD6Vw8lYtn8olsIblQLYAIEBAAK99LSGDg996djxy80ynued75vv5j3x+Z'+
    'K1wrlpOUgjBQCkLBFBACQu+g1EESg+NnXNdVVXXlmiaTySbHCdhOS0sP42AKuAKuQdGg6FAMmD4z'+
    'FGrx2bZqQNWhaFA0FCp/TMaH/xKarusXr/y2WJ0bT5zmKuosysE5u2/t805ofaU6s7iU1bWgZbRM'+
    'xk9Nz5wXAqImr4yeWNf1wCqIMRYMBCLh+31NDWM3eyVZZApMs2Hv9g9Hpr6+NPoOoaB0WXvTulft'+
    'huCNqW+9Gq5NnhLiTXr7jRuGkc1kTMMdGj+pGkQScJU8s/vT61OfJ7O9ukW7o/t1zWZUATA4dvSJ'+
    'hz+5lT9ZrVbi8wPFUiFgB5dzRClta2/36Z2x2GM+v6nqiEWftAONicxx1cS+HR8oWnVi5tjmTS8Z'+
    'Pq5bSJd+6o7t1C0wvTwyfWE12Zzz+XxuTWNwoZoIh9YoOjasPThXOKfqaGt5qKtjRzzTq+hC41io'+
    'XlcNVL3JcKhVs6BZGE6eWAURQoKhsMKaCBO58g2uIhTqkLTEVazteKpcmeAquEqa7HXF6qiiwQlE'+
    'S4sjqg7VwM3Madd1V0GAdAJBn9XYE9vNFXgyH2qIMg7GYBsRxtHqbLW4D7TqM5228JbZYj9XoWgo'+
    'YWw2M7EKMg1jNp11l/LD072UYzbb13nPHsbp9emvAnrzvgc/ijT0/HD1hW2x1+9tPdA//jbjYrnc'+
    'VDky+2MdRKSUI6OjjNJvLh5ujGiXJ77QDevlA8M/D741kvhSUTRNNVyZr9c6AIWarlcRnhQCooYO'+
    '6+lXdn1H61Xgs6yrg0M1d+GX0c9APNebP9536PFNRzojeyWqrshTutw0jm/99u7DnCmUgVJQhmS5'+
    'r1IpL3sUj8dd1z0z9DF8qYnZE+WlBFMQDER3bHxXV8xb+f4lL+fXIwG9LVcZu5w86glXCkgPwoPn'+
    '4bmNJzdG9xApZalUOnf+wnj+7Gj5fbAqV5YbhXGoqu7Y3ZpiLtRulZbiIIIAEpACUkB4EDVsbnpj'+
    '/9b3OADP86Id7fB3uYVdUuancwMApAQkat5iqjhEGeqxAAABkQABCCgFGG7mTtdqNQ7AsqxMNptL'+
    '6+mFieLiGOPLFPm3Q2/PJgJICglAktLSdK6Q4vVhaJrmhs6uXy/PdTjbpnMDUtw2FpACoPV4AAmO'+
    'gJ/F/CxmsjXUs1i1xfFv8VtBDoBzrmtafHY+GjmYLZ5dQQgBlfqDPNagxfxaK4dOq020ZoslyTnT'+
    'lWDY3+m0NzY3NzPGeH2MCyEioYYzl87a/kBP5Nmg1a5ynblhJuxazaMe0Wv+oBlzWhzbtk3TVFV1'+
    'ZYCsFiSAycnJTCZTKM9UamkpBGd60Op0wk2BQMCyLFVVGWP/vlrIyjqSUlYqFQB1s7u2zX/Kn0Kf'+
    'LGiemCi3AAAAAElFTkSuQmCC';
		
		
	var addr_img_b = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABnRSTlMA/wD/AP83WBt9AAAACXBI'+
    'WXMAAAsTAAALEwEAmpwYAAAE00lEQVR42pWVS2yUVRTHz7mP7znfN+8+6TClaLG1AhEiEBWBaCJs'+
    'bCKJMRqXGhdGNNHIQhcmJC5ZmhAWbggr0UDUgPIoCFKKlBYohT5oO30wr850Hp35vu9eF9OXJGo8'+
    'uaube37nkXP/B6WU8D+t5oKIay/ZP70WQhRK5ZnUfCKZTSTnE8nsdDKbSGYTycx0Mnv00Nvde3c8'+
    'CZJS9vTdmcvk740nlnxSuZlMPleqSIlQi7wSX0oA+PnqwBt7XlibFPM879LlK19/98vwbC41XwAk'+
    'QCgSAkiAcEACWGMhgAQJABKkvHB7zHEcRVFWQGR6erouEgkHrLbYOqAMGUemAFOBa6joqOiaaUcj'+
    'UdPyIzdQ0ZHryNXJ+cWhscTfStM0rffPW7li+Y97M8hUoAwIQ8oJ469ueybWEM4UFvOlim1oYdu4'+
    'PvSo/2FCCg+Ed/bmg+faW1dBlNKg3/9Uc1QJNl8eGKkKBMotn++zt/b9dHP02K93kNDl6qB7Z4cd'+
    'CPXcHgHh/jY4dUgIQsgSSNf1TDrNOL92b4IoOgoCTDn83oEzNx5eG0kTzffK5lafoTJKAPDU1ftf'+
    'HNzVO5auLFZ6Jwu5hULQby/1iBDSEos1BoytHRsNnwVc39axMRgIXH2YQkU//M5uj6pn+me7d29S'+
    'DR1V362p7PZnN6DmKxP996HVNhHGWH4+2xAJPV6o1EdCyLU9z2/qn0wD1zrbGnd0Nl1+kAGmKZRM'+
    'ZCqgGHMLXlNdAFUTVN+5u3OrIEQMhsJ+nXtIx9Jl4Gpzvb8iJDJl9+aW6UwJmYJMebrON55xkKmx'+
    'Ov+jtINcR0W/OJJzHGcVBCDrg1bYNnd3xZHysuOuq7OAcIKk3taAsM3xkF+jVUlDtrG1JdA3VQSm'+
    'ANNG8mR8NrMKMnR9LpUuLlbPDs4AYf2P0i92NhDKfuybbfJrRw52tjf6Pzpx//2XY/u76r85NwmE'+
    'A+VIOTDl3FCqBkIp5f3hYUrIl6cGfKHoyT8mDEM//dXrR08P/XBzjnOuq0q+CkAIIgEAnZNy1QUp'+
    'QHhSuK+1qic/2EVqU+Azzf6BwUrFOXFlVAAWK97Hx65/cmDTS+1RR+BCVWKNgqQtany+r4UzBkiB'+
    'UER6bWqxWCovZTQ1NeU4zrfnh9NoXRxKzi64QPm6qPXp/nZT4X0TC7myqLfVZlsZzVSO9yZdzwMh'+
    'VpL6/t22vV0xlFIWCoWLl3rOjxaPD1YcoEg4MI6EA+WqylujlqHyx0VvesGRgEsCICVID4QHwv1w'+
    'e+DIm1sYAHieF18faxe5ndVyuSpuTORASgkSQVYcMTRXrFUBhNQ4y5JCAAUguTCad12XAYBpmulM'+
    'RhRz44+diewiEr4cUywfAihBSgBcw0IgFEAm8pVkNs9qYmgYRucGO9tzd1s81DeRX6asxdX+rbS4'+
    'bLUxbmGdyXR0Grm7pcEIWgYDAMaYpqqp2dSejobbkzkpBYIAKaTwfAq2hlg8QJpsplCI0pJFXSEF'+
    'oyygs3jEikabGxsbKaWsJuNCiPqw/9aDQb9tdXeFm4O6xlmIVS3qup5LiPBp3oawEYmst23bMAxF'+
    'UVYEZHUgAWB8fDydTs/Ol9IlVwihchIPm3WRsN/vN01TURRK6b+vFlxZR1LKcrkMADW3J7bNf9pf'+
    'j0kz/XI/s7YAAAAASUVORK5CYII=';
    
    
    var addr_img_r = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABnRSTlMA/wD/AP83WBt9AAAACXBI'+
    'WXMAAAsTAAALEwEAmpwYAAAEr0lEQVR42pVVbWxTVRh+7vftvettL+3abmOlo8DQGTEZiAYiqBAi'+
    'hESGITEhGv3pLyXhj6IJhMQ/8gOjk2hEEI2JiT8kVveRjcE2WaJRhMnYB7OO23Yf/Vi7dl13e8/x'+
    'x123uUSNb968P95z3ifPOec9z8tQSvE/zS5hGGZ1kv+n3YSQ4txcOpFIG0Y6FksbRsow0rGYHV9p'+
    'bd199OhaIErp7d7ezNR0bPBO2jDShpGJxbLx+EI2C0IYgFnDCLgViexqaVlNircs60Zf/zdnzmbv'+
    '/j4/GWeBZecBFlgNRCtxpLvbNE1RFJeB2Hg87vN6Na/Xv7WJBwRABERAAmRAAlSH4g7UVjk1uZIR'+
    'gfmJiQdDQ387mizLP/16q5yajvV0CQC/7BwXannRtalxcTphZtKiW5f9tZM9nTM3bxDAonSorS28'+
    'bdsKEMdxusulP/yoVuV+0B5hFhYEwOFyb3/vo/jXX0Tffds+pm2hV1/TdD32/bcWMN7ZSU6eZNml'+
    'Rd7hcKRTqSpq3uvukBmGAQSGefL8p/GvPst1RhSWrT38vKRprCCA4s+LrY+8/8nctY7FYjE9MJDP'+
    'ZjVdX7ojlmXrg0Ex2BB8YpdTUWRg/VPPOr3VufbvZGDH+Q+lxVLqy883v/ySKvEKUPzxWnDPXgWQ'+
    'CoVob+/KZfM8n5vN1Hh1MxFbFwhIwIbDLfmb10XAv3177TN7cj9EJEJkDuXhezJAJ6L6+joFUICJ'+
    'trYVIIZh9HUexutjyyQ/NiYCrtAGZiEvAnUHD5p/jAuAwDD65i2LIyMSoIdC5vCw/YIzXV2maa4A'+
    'AdTj0RVfdXjfPh5AYVZrCNlvp/r9PODdsUOuqmJLJcXr9TY35/v77RYpj44mx8dXgBSHYyqZtrKz'+
    'E5EIB2Rv9vkP7OdYNnHlilpT89iFC+6mptvHj295/Y31R46MnTrFE2J3nEBprL3dBmIopcMjIxzL'+
    'XnvndECR7l+6JKnqvrtDY2+9OXX5siBJosNBZmeXm4BTlHKxSCglgAW4Dx167upV1u6CKlX97c6g'+
    'NT8/fPEiLMvK5X554ejWs2d9Bw6gVLIqKCygNTY+dPo0LwgcwAIckO3rKxYKS4wMwzBN8+cLH8vJ'+
    'man2tlIsJgDOUKjpzBlRUXL9/SSTUfx+R319cXQ02tpKTJMCFmCTeryjI7x/P0Mpzefz12/0Tnb3'+
    '5D44z5ZKqz+KKMvapk2iopiTk4uGYYsBBShAKkB1J07sPneOB2BZVmhDUNm8cXLv02x2NjkwQCsf'+
    '3VpYmBsc5FZJAipiwFaUINnVVS6XeQCqqqbS6Slenr0/Xro/yld2EICtxGVjKnFJWBlmceJBdmaG'+
    't8VQUZTGLRt7k9OBnTtnKozW+FKhyyWGw0I4LAQCVFHNulpHc7Oq6zwAnudlSYplcp7DLYX+ntVc'+
    '4HQ6wmE5HHbU1XGybPp8llOjoITjiK5rDQ3e6uqamhqO43hbxgkhPo97uL9Hc7nqjx1zBoOCLBOP'+
    'h2hauWyxLMM4nY5wuN7r1TRNURRRFJcFZKUhAUSj0VQqVUgkzGSSEMLJclVDg8fnc7lcqqqKoshx'+
    '3L+PFmZ5HFFKi8UiALtszbT5T/sLjO4LMTNq5qUAAAAASUVORK5CYII=';
				
	if(window.location.toString().charAt(4) == 's')
		http = 'https';
	else
		http = 'http';
	//get contacts
	GM_xmlhttpRequest({
			method: 'GET',
			url: http+'://mail.google.com/mail/?view=cl&search=contacts&pnl=a',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				 contactPage = responseDetails.responseText;
				 to_contactLink = "<span class='l' onClick=\"to_comp = document.getElementById('" + toBox.id + "'); if(to_comp.value){to_comp.value+=',{{NAME}} &lt;{{EMAIL}}&gt;';}else{to_comp.value+='{{NAME}} &lt;{{EMAIL}}&gt;,';}event.cancelBubble=true;\">{{NAME}} &lt;{{EMAIL}}&gt;</span><br>";
				 cc_contactLink = "<span class='l' onClick=\"cc_comp = document.getElementById('" + ccBox.id + "'); if(cc_comp.value){cc_comp.value+=',{{NAME}} &lt;{{EMAIL}}&gt;';}else{cc_comp.value+='{{NAME}} &lt;{{EMAIL}}&gt;,';}event.cancelBubble=true;\">{{NAME}} &lt;{{EMAIL}}&gt;</span><br>";
				 bcc_contactLink = "<span class='l' onClick=\"bcc_comp = document.getElementById('" + bccBox.id + "'); if(bcc_comp.value){bcc_comp.value+=',{{NAME}} &lt;{{EMAIL}}&gt;';}else{bcc_comp.value+='{{NAME}} &lt;{{EMAIL}}&gt;,';}event.cancelBubble=true;\">{{NAME}} &lt;{{EMAIL}}&gt;</span><br>";
				 
				 to_contactHTML='';
				 cc_contactHTML='';
				 bcc_contactHTML='';
				 
				 contacts = contactPage.match(/D\(\[\"cl\"[\s\S]*?\)\;/g);
				 for(var i=0;i<contacts.length;i++)
				 {
					 eval(contacts[i].replace('D(','contactArray=').replace(');',';')); 
					 for(var j = 0;j<contactArray.length;j++)
					 {
						 name=contactArray[j][2];
						 email=contactArray[j][4];
						 
						 if(name&&email)
						 {
						 	to_contactHTML = to_contactHTML+to_contactLink.replace(/{{NAME}}/g,name).replace(/{{EMAIL}}/g,email);
							 cc_contactHTML = cc_contactHTML+cc_contactLink.replace(/{{NAME}}/g,name).replace(/{{EMAIL}}/g,email);
							 bcc_contactHTML = bcc_contactHTML+bcc_contactLink.replace(/{{NAME}}/g,name).replace(/{{EMAIL}}/g,email);
						}
					 }
				 }
				 
				 to_contactContainer = document.createElement('div');
				 cc_contactContainer = document.createElement('div');
				 bcc_contactContainer = document.createElement('div');
				 
				 to_contactContainer.innerHTML="<span class='l' onClick=\"document.getElementById('TO_GM_CONTACT_LIST_" + toBox.id.substr(3,toBox.id.length-3) + "').style.display='';event.cancelBubble=true;\"><img src='" + addr_img_b + "' title='pick user from contacts'></span>"+
							"<div id='TO_GM_CONTACT_LIST_" + toBox.id.substr(3,toBox.id.length-3) + "' style='overflow:scroll;height:300;display:none;position:absolute;border:1px solid black;background-color:white;text-align:left;'>"+to_contactHTML+'</div>';
							
				 cc_contactContainer.innerHTML="<span class='l' onClick=\"document.getElementById('CC_GM_CONTACT_LIST_" + ccBox.id.substr(3,ccBox.id.length-3) + "').style.display='';event.cancelBubble=true;\"><img src='" + addr_img_g + "' title='pick user from contacts'></span>"+
							"<div id='CC_GM_CONTACT_LIST_" + ccBox.id.substr(3,ccBox.id.length-3) + "' style='overflow:scroll;height:300;display:none;position:absolute;border:1px solid black;background-color:white;text-align:left;'>"+cc_contactHTML+'</div>';
							
				 bcc_contactContainer.innerHTML="<span class='l' onClick=\"document.getElementById('BCC_GM_CONTACT_LIST_" + bccBox.id.substr(4,bccBox.id.length-4) + "').style.display='';event.cancelBubble=true;\"><img src='" + addr_img_r + "' title='pick user from contacts'></span>"+
							"<div id='BCC_GM_CONTACT_LIST_" + bccBox.id.substr(4,bccBox.id.length-4) + "' style='overflow:scroll;height:300;display:none;position:absolute;border:1px solid black;background-color:white;text-align:left;'>"+bcc_contactHTML+'</div>';

				toBox.parentNode.parentNode.childNodes[0].appendChild(to_contactContainer);
				toBox.parentNode.parentNode.childNodes[0].align='right';
				
				ccBox.parentNode.parentNode.childNodes[0].appendChild(cc_contactContainer);
				ccBox.parentNode.parentNode.childNodes[0].align='right';
				
				bccBox.parentNode.parentNode.childNodes[0].appendChild(bcc_contactContainer);
				bccBox.parentNode.parentNode.childNodes[0].align='right';
			} //end onload function
	});//end GM_xmlhttpRequest
		
}






function hideContacts(){
	var allContacts = document.evaluate(
	    "//div[contains(@id,'GM_CONTACT_LIST')]",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	for (var i = 0; i < allContacts.snapshotLength; i++)
	{
		var thisContact =allContacts.snapshotItem(i);
		thisContact.style.display='none';
	}    

}


function cleanContacts(){

	//clean all Contacts in this window.
	var allContacts = document.evaluate(
	    "//div[contains(@id,'GM_CONTACT_LIST')]",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	for (var i = 0; i < allContacts.snapshotLength; i++)
	{
		var thisContact =allContacts.snapshotItem(i);
		thisContact.parentNode.parentNode.removeChild(thisContact.parentNode);
	}  
	  
}




if(document.body)
	document.body.addEventListener("click", hideContacts, false);

window.addEventListener("load", getContacts, true);

