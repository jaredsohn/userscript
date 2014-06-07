// ==UserScript==
// @name           ERX Donator
// @namespace      http://userscripts.org/users/NOTEXIST
// @description    Stuff.
// @include        http://ww*.erepublik.com/en/messages/alerts/*
// ==/UserScript==

function getAlertString()
{
	return '<p class="smallpadded"><b><h3>LIST '+reset_button_text+'</h3>'+GM_getValue('multi_list')+'<br><h3></h3><h3>Gold Listed: <font color=red>'+GM_getValue('multi_gold_count')+'</font><br>All-time Gold Listed: <font color=red>'+GM_getValue('multi_gold_count_all')+'</font></h3></b></p>';
}

unsafeWindow.resetList = resetList;

var reset_button_text = '<input type="submit" name="resetlist" onclick="resetList();return false;" value="Reset List" />';

if(document.getElementsByClassName("avatarholder")[0].innerHTML.split("ERX Terminal").length>1)
{

	var alert_table = document.getElementsByClassName('messages largepadded');
	var first_alert = alert_table[0].getElementsByTagName('tr')[1];
	var button_box = document.createElement('tr');
	var button_box = first_alert.cloneNode(true);
	var alert_children = button_box.getElementsByTagName('td');
	alert_children[2].innerHTML = getAlertString();
	alert_children[3].innerHTML = '<span class="fakeheight">List of Suspected Multies</span>';
}

function resetList()
{
	setTimeout(function() {
	var where_to = confirm("Confirm reseting of multi list?");
	if(where_to)
	{
		GM_setValue("multi_list","");
		GM_setValue("multi_gold_count","0");
		alert_children[2].innerHTML = getAlertString();
	}
	},0);
}

function startGoldTransfer(name,amt,msgID)
{
	if(amt>=0)
	{
		setTimeout(function() {
		GM_xmlhttpRequest({
    			method: 'GET',
    			url: 'http://api.erepublik.com/v1/feeds/citizens/'+name+'?by_username=true',
    			headers: {
       				 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
       				 'Accept': 'application/atom+xml,application/xml,text/xml',
    			},
    			onload: function(responseDetails) {
				if(responseDetails.responseText.split('The page you were looking for').length>1)
				{
					startGoldTransferConfirmed(name,amt,msgID);
				}
				else
				{
        			var parser = new DOMParser();
        			var dom = parser.parseFromString(responseDetails.responseText,
            				"application/xml");
       	 			var entries = dom.getElementsByTagName('level');
				var level = parseFloat(entries[0].textContent);
				if(level>=10)
				{
       					startGoldTransferConfirmed(name,amt,msgID);
				}
				else
				{
					GM_setValue(msgID,"multi");
					alert("Warning: "+name+" has attempted to donate "+amt+" GOLD at level "+level+". Added to multi suspicion list and crediting canceled.");
					var entries = dom.getElementsByTagName('id');	
					var id = entries[0].textContent;
					var multiList = GM_getValue("multi_list");
					var currentTime = new Date();
					var hours = currentTime.getHours();
					var minutes = currentTime.getMinutes();
					if (minutes < 10){
						minutes = "0" + minutes;
					}

					var timestamp = currentTime.getMonth()+1+'/'+currentTime.getDate()+'/'+currentTime.getFullYear()+' '+hours+':'+minutes;
					multiList += name+": Level "+level+" attempted donation of "+amt+" GOLD "+timestamp+"<br>";
					GM_setValue("multi_list",multiList);
					GM_setValue("multi_gold_count",(parseFloat(GM_getValue("multi_gold_count"))+amt)+'');
					GM_setValue("multi_gold_count_all",(parseFloat(GM_getValue("multi_gold_count_all"))+amt)+'');
					alert_children[2].innerHTML = getAlertString();
					var button = document.getElementById(msgID);
					var completed = document.createElement("div");
					completed.innerHTML = "<font color=blue>Suspected Multi.</font>";
					button.parentNode.insertBefore(completed,button);
					button.parentNode.removeChild(button);
				}
				}
    			},
    			onerror: function(responseDetails) {
       				 ERRORERRORERROR();
    			}
		});
		},0);
	}
	else
	{
		setTimeout(function() {
		startGoldTransferConfirmed(name,amt,msgID);
		},0);
	}
}

function startGoldTransferConfirmed(name,amt,msgID)
{
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://erx.erepublik.ws/admin.php",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI('admin_user='+name),
		onload: function(e) { 
			var tt = e.responseText.split('">'+name+'</a>')[0];
			var finalNum = "";
			var index = tt.length-1;
			var numChar = tt.charAt(index);
			while(numChar!="=")
			{
				finalNum = numChar + finalNum;
				index--;
				numChar = tt.charAt(index);
			}
			var id = finalNum;
			transferGold(id,amt,name,msgID);
		}
	});
}

function transferGold(id,amt,name,msgID)
{
	
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://erx.erepublik.ws/admin.php?id="+id,
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			//data: encodeURI('admin_user='+name),
			onload: function(e) { 
				var pw = e.responseText.split('size="40" value="')[1].split('"')[0];
				finishTransfer(id,amt,pw,name,msgID);
			}
		});
	
}

function finishTransfer(id,amt,pw,name,msgID)
{
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://erx.erepublik.ws/admin.php?id="+id,
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI('edituser=true&addgold='+amt+'&password='+pw),
		onload: function(e) { 
			var button = document.getElementById(msgID);
			var completed = document.createElement("div");
			completed.innerHTML = "<font color=red>Completed.</font>";
			button.parentNode.insertBefore(completed,button);
			button.parentNode.removeChild(button);
			GM_setValue(msgID,true);
		}
	});
}

unsafeWindow.startGoldTransfer = startGoldTransfer;

function GM_setValueTIMEOUT(id,value)
{
	setTimeout(function() {
		GM_setValue(id,value);
	},0);
}

unsafeWindow.GM_setValueTIMEOUT = GM_setValueTIMEOUT;

function addslashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}

first_alert.parentNode.insertBefore(button_box,first_alert);

if(document.getElementsByClassName("avatarholder")[0].innerHTML.split("ERX Terminal").length>1)
{
	var elements = document.getElementsByClassName("smallpadded");
	for(var i = 0;i<elements.length;i++)
	{
		if(elements[i].innerHTML.split('GOLD to').length>1)
		{
			var temp = elements[i].innerHTML.split('">')[1];
			var name = temp.split('</a>')[0];
			name = addslashes(name);
			var amount = temp.split("transfered ")[1].split(" GOLD")[0];
			var msgID = elements[i].parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML.split('value="')[1].split('"')[0];
			if(GM_getValue(msgID)==true)
			{
				elements[i].innerHTML+='<font color=red>Completed</font>';
			}
			else if(GM_getValue(msgID)=='multi')
			{
				elements[i].innerHTML+='<font color=blue>Suspected Multi.</font>';
			}
			else
			{
				elements[i].innerHTML+='<input type="submit" id="'+msgID+'" name="processgold" onclick="startGoldTransfer(\x27'+name+'\x27,'+amount+','+msgID+');return false;" value="Process Deposit" />';
				//elements[i].innerHTML+='<input type="submit" id="sac" name="setascompleted" onclick="GM_setValueTIMEOUT('+msgID+',true);return false;" value="Set as Completed" />';
				var button=document.getElementById(msgID);
				//button.onclick = startGoldTransfer(name,amount);
				//button.addEventListener("click", startGoldTransfer(name,amount), false);
				//elements[i].innerHTML+='<a href="javascript:void(0)" OnClick="javascript:startGoldTransfer(\x27'+name+'\x27,'+amount+','+msgID);return false;">Text to Click</a>';
			}
		}
	}	

}
