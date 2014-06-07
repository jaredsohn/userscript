    // ==UserScript==
    // @name          Neopets Elite AutoBuyer
    // @namespace     http://www.gamingire.com/
    // @description   Autobuys in neopets main shops
    // @include       *neopets.com*
    // ==/UserScript==
	var layout = '<div class="contentModule" style="height: 100%">\
<table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable">\
<tr>\
<td class="contentModuleHeaderAlt">Neopets Elite AutoBuyer - By Backslash</td>\
</tr>\
<tr>\
<td align="left" valign="top" class="contentModuleContent">\
<div align="center">\
<table cellpadding="4" cellspacing="0" border="0">\
<tr>\
<td align="left" valign="top"><form action="market.phtml" method="post">\
<table align="center" cellpadding="4" cellspacing="1" border="0">\
<tr>\
<td valign="middle" style="background-color: #EFEFEF;"><b>Shop ID</b></td>\
<td valign="top"><input type="text" id="shopID" size="3" maxlength="3" value="'+GM_getValue("shopID", "")+'"></td>\
</tr>\
<tr>\
<td valign="middle" style="background-color: #EFEFEF;"><b>Refresh Rate</b></td>\
<td valign="top"><input type="text" id="min" size="4" maxlength="4" value="'+GM_getValue("min", "")+'"> to <input type="text" id="max" size="4" maxlength="4" value="'+GM_getValue("max", "")+'"> milliseconds</td>\
</tr>\
<tr>\
<td valign="middle" style="background-color: #EFEFEF;"><b>Wait Before Buy</b></td>\
<td valign="top"><input type="text" id="wbb" size="4" maxlength="4" value="'+GM_getValue("wbb", "")+'"> milliseconds</td>\
</tr>\
<tr>\
<td valign="middle" style="background-color: #EFEFEF;"><b>Restock Ban</b></td>\
<td valign="top"><input type="checkbox" id="chkRestockBan" checked="true" /> Check Restock Ban when shop is empty</td>\
</tr>\
<tr>\
<td valign="top" style="background-color: #EFEFEF;"><b>Restock List</b></td>\
<td valign="top"><textarea id="restockList" style="width:100%;height:300px;font-family:tahoma;font-size:9pt;text-align:center;">'+GM_getValue("rsList", "")+'</textarea></td>\
</tr>\
</table>\
</td>\
</tr>\
</table>\
<div align="center" style="background-color: #EFEFEF; padding: 4px;">\
<input type="submit" value="Save Settings" id="saveButton">\
</div>\
</form>\
</div></table></div>';
if (document.location == 'http://www.neopets.com/objects.phtml')
	{
		document.body.innerHTML = document.body.innerHTML.replace("magical potions, collectable cards, and even buy clothes!", "magical potions, collectable cards, and even buy clothes!<br><br>"+layout);
	document.getElementById('saveButton').addEventListener('click', saveSettings, false);
	}
	
	if (document.location == "http://www.neopets.com/objects.phtml?type=shop&obj_type="+GM_getValue("shopID", ""))
{
					var max = GM_getValue("max", "");
					var min = GM_getValue("min", "");
					var e = random(min, max);
					setTimeout("document.location = location.href", e);

			var rList = GM_getValue("rsList", "").split('\n');
			var itemStocked = false;
		for (i=0;i<rList.length;i++)
	{
		if (document.body.innerHTML.indexOf(rList[i]) != -1) 
			{
			var item = document.evaluate('//b[. = "' + rList[i] + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (item.snapshotLength > 0) 
				{
				itemStocked = true;
				item = item.snapshotItem(0);
				var selectedlink = item.previousSibling.previousSibling;
				window.location = selectedlink;
				}
				
			}
	}
	

}	
		

	function random(min, max) {		
	return Math.floor(Math.random() * parseFloat((max - min))) + parseFloat(min);
}
		
	function saveSettings()
		{
			GM_setValue("shopID", document.getElementById('shopID').value);
			GM_setValue("min", document.getElementById('min').value);
			GM_setValue("max", document.getElementById('max').value);
			GM_setValue("wbb", document.getElementById('wbb').value);
			GM_setValue("rsList", document.getElementById('restockList').value);
			var saved = confirm('Your settings were successfully saved. Redirect to shop?');
			if (saved)
			{
			document.location = "http://www.neopets.com/objects.phtml?type=shop&obj_type="+GM_getValue("shopID", "");
			}
		}
	
    function run_cap()
    {
        if (document.location.href.match('haggle.phtml') && (document.body.innerHTML.indexOf("captcha_show.phtml") > -1))
        {
            if(document.body.innerHTML.indexOf("I wont take less than ") > -1)
            {
                start_pos = document.body.innerHTML.indexOf("I wont take less than ") + 22;
                end_pos = document.body.innerHTML.indexOf(" Neopoints for it");
                raw_price = document.body.innerHTML.substr(start_pos,end_pos-start_pos);
                raw_price = raw_price.replace(",","");
               
                document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"","value=\""+haggle_price(raw_price)+"\"");   
            }
           
            if(document.body.innerHTML.indexOf("I want at least ") > -1)
            {
                start_pos = document.body.innerHTML.indexOf("I want at least ") + 16;
                end_pos = document.body.innerHTML.indexOf(" Neopoints for this great item");
                raw_price = document.body.innerHTML.substr(start_pos,end_pos-start_pos);
                raw_price = raw_price.replace(",","");
       
                document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"","value=\""+haggle_price(raw_price)+"\"");
            }   
           
            allForms = document.evaluate("//form[@name='haggleform']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
            for (var i = 0; i < allForms.snapshotLength; i++)
            {
                thisForm = allForms.snapshotItem(i);
               
                allImgs = document.evaluate("//input[@type='image']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
                for (var i = 0; i < allImgs.snapshotLength; i++)
                {
                    var image = allImgs.snapshotItem(i);
                   
                    if(image)
                    {
                        var newImg = document.createElement("img");
                        newImg.src = image.src;
                       
                        var canvas = unsafeWindow.document.createElement("canvas");
                        canvas.width = newImg.width;
                        canvas.height = newImg.height;
                   
                        canvas.getContext("2d").drawImage(newImg, 0, 0);
                       
                        var image_data = canvas.getContext("2d").getImageData(0, 0, newImg.width, newImg.height);
                       
                        var lowy = 999;
                        var lowx = 999;
                        var low = 999;
                       
                        for (var x = 0; x < image_data.width; x++)
                        {
                            for (var y = 0; y < image_data.height; y++)
                            {
                                var i = x*4+y*4*image_data.width;
                               
                                var avg = Math.floor((image_data.data[i]+image_data.data[i+1]+image_data.data[i+2])/3);
                               
                                if (avg < low)
                                {
                                    low = avg;
                                    lowx = x;
                                    lowy = y; 
                                }
                            }
                        }
                             
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="x";
                        newInput.value=lowx;
                        thisForm.appendChild(newInput);
                       
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="y";
                        newInput.value=lowy;
                        thisForm.appendChild(newInput);
                       
                        thisForm.submit();
						
                    }else{
                        alert("Image error");
                    }
                }           
            }
        }
    }

    function haggle_price(raw_price)
    {
        var iVal = new Array(2);
       
        iVal[0] = raw_price.substr(0,1);
        iVal[1] = raw_price.substr(1,1);

        var x = 0;
        var end_price = "";
       
        for(x=0; x<raw_price.length; x++)
        {
            end_price += iVal[(x%2)];
        }

        return end_price;
    }
	
window.addEventListener('load', run_cap, false);

if (document.location == "http://www.neopets.com/haggle.phtml")
{
setTimeout(function(){document.location = "http://www.neopets.com/objects.phtml?type=shop&obj_type="+GM_getValue("shopID", "")}, 5000);
}