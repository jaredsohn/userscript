// ==UserScript==
// @name           Facebook Emoticons - DP
// @namespace      Jhon Doe
// @description    Facebook Emoticons
// @include        http*://www.facebook.com/*
// @version        1.1
// ==/UserScript==
//---------------------------------------------------------------------------------

// http://webcodertools.com/imagetobase64converter/Create
var FBE_graySmile="data:image/gif;base64,R0lGODlhEwATAPcAALy6vNze3PTy9MzOzOzq7MTGxPz6/NTW1OTm5MTCxOTi5PT29NTS1Ozu7MzKzPz+/Nza3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAA8ALAAAAAATABMABwjcAB8IHEiwoMGBBhIuWCjAwEGCDQIcOMDgAIQADRweVHBAgYAFCRtwVLBRQUaQCw0sEBCAJMQDDRY0QJCxAQECKw8QINjyI4MEARYoSDBgpYKgAhcwaPDRAQAICwIAKLCyAQONBhwwFcCgQACWBZYKEDBAQFIHApgiUEBAAAEFCMZaXSAwa1uaafPOdFu27gCaLREQsLkWggAEA7BCgPB24sXFDDAupiuwwQC4HAcUGHAgwNsBOwkqgAD35k3BIzXyrBh4LcUADx80gOCgQIICDnTGrqswoerdwB8EBAA7";
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AkKFS0PYf3SBAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACBElEQVQ4jZ2TW2/iMBCF41twbAgo8AZC6v//STxUrQpPEWASx7nYM/swLLTdXWnVeYs035zJnGOGiNmPSn77Tr/rMZExxjmXUgoh/knGGG+3W9M0fd8TTNhsNivLcrlcSvnsZ4/ZiHg8Hr33xpjFYqG1FkIAQN/3TdO0bVsUxW63eyjfSUT8+PhIKVVVlef5n38VY6zrmjG23W5JmWdZBgCXy8V7v1qtlFLee+fcMAyIOI6jc65tWyHEer0OIVyv15TSF9IYI6VExNPpdDgczuczIjrnDofD+/s7InLOrbW32y3G+CS7rrPW0trDMIQQpmlCxBhjCIH0EXE+n4cQAOB+W9qKBBGxKIoYY57nACClXCwWRVHcu6WcpulJkixhWZZVVVWWpdaapmy3WyHEZwu++MkYSykxxvq+n81mxhhqUkoppQAghKC1/pwQSZiUchgGznnXdWS9lJJzDgAxxnEcp2nK83wYBiEEY+xJWmu990opIYT3vus6pdSDBABjDABQTjjn99sKIaqqohtqra215Edd1865lJK11lrb9z15Tkm4ZwgA3t7exnE0xpAarfR4BjHGtm3zPN/v919IqtfXV+ec1rooCiklwWRp13VlWb68vNCq30kKU13XTdOM40hvRSk1n883m816vX5g30mCU0rkNZFZlnHOhRCfsb+Q/1+/AAtYmJwrjrB/AAAAAElFTkSuQmCC";

var FBE_yellowSmile=
"data:image/gif;base64,R0lGODlhFAAUAPcAAHxaLMyudNTGvOzWhPTmxMSunKyKVPzmjNS+dKyWfOzq5LyeXOTSpOTaxOzm1NS+jMy2jMy2dLSWVPTmpOTe1Jx2NPTepPzyvNzGnPz27LyebNzKjPTejPzurJx+TOzevMSufKyOZNzGhLSihOTStPzy1My+lNS2hKyWZMzCtPzuxMSmZPTmtOTe3Pz6/KyWbOzWlPzmnNS+hLSefPTy7OTarPTmrJx+POzitPz2zNzOnMSmdPTenKSCXOTezKySbNy+lMyydNTOxOTSjPTqzMS2pPzmlNS+fPTu7OTSrNzWzOzm3NS6fOTi1OzerPzyxNzGpPz29LSedNzGlPTelPzutJyCVOzexMSyfKSSZPz23My6hMyqZLyabLSehIxuRNTKxPTqxKSOXPzqjPTq5LyiXPTq1Ny+jNS6lNS2dPzqpIxyRPTipNzKnKSCTOzivNzKhLyqlOzatPz21NS+lLSWZNzKrPzuzMymZOzi3Pz+/LSabLyefPzqrKSCRNzClNSydOzWjMy6pNzCfOTazOTWrPz2xPz69LSidNzKlPTilPzytOzi1MyyfKySZNS6hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHoALAAAAAAUABQABwj/APUIHEiwoMGDCBOaaQMID54VAf74SKiHxAkZhd4QICDnTBAohw42OJOEQIk5WrSUIILjDJQoBR00KnSHyIcwc+58eFPiQ6MPMAeiOUEgB4QsdHLUCCElx5wzaMgQ1MBAhaEXABDlwADgi6EccnYwIugGx5MniL6AeKJjjZWzKhZMHOiGxYULU7DouOAEBIS7F+oQIujBQhUbVRZdqHJh0eEqVRwNHtgDRocNMCZ02NzHApMObAQTTCBjwqAVQYbwgMFkQQQ1ImbkISjAEYwYIsr4qXBDAoIYMeoIQkLQRZwggYxQ4UBluSIjabwoMIikwIs0Aw5o5zCojpc8Lg4qHUgx4kcIMWJ+zCjSgmIUCkLACBAgRAlxivjz5w8IADs=";
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AkKFS4jeAjtJAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAC1UlEQVQ4jaWUS08TURTH7513O51pO31SWgq1gOJGEhUXmmBM9AO4ceE38xuwEWKiC0MiG4KB2EBLeQaQvsu0Q6ftvO7MvS5lCBvx7E7y/+U8cv4HEkLAfYO6NwkAYG7leuegd7Gld48cQ8MegpBmBUmM5mPTS8rUM0jRN8XwZtuNylettsMFBDkxLUhJmhUwdp2xNlQv9Ku6nFqYWnzP8KE74Ebl26h3LMUycjzDByWG5SGkCcCeixxzbAxUtVYVpFxm4S0XjPpm1prV7vmWHJ+MZ4sYUNf97njUB8RClq6pTdM0lIl8qvBEa5T79TKyRj64cbDBcLwcT7I8PChtrq+tnFZKALhqp76+trL5/QsFUTiRDISjV5e71qjng9tne9F0nuNpSJz6+Ul5e6tVOwfEGWpqefvn0V4JAEQRK54t6mrNNnTftgf9TigSZmgMsCNKopJMBMUAIIjlKCWRkKNRgG0AgKwopjFEyPbBpmUzjAcBIgQU5ouhsDSZywLiRBR5afmVIAgE2xBCloXIcbCHfbCLaYwMgjnbtAoPsnMPZwAAANuKEnr5+gXxsDHqB0WJYNf1CCbQNzPNSuZ4gD2zdXnSa9ccU/dcg3gmdg1kDYfX6ll1j3iGOewTyEGK8VWWYnm1q4aVAHbtw90TUQplprJiWHIsu9NotWuNRDpFsNVttfhgnOECPri4uHy8s5pMirnpCZoGZ0enh7vlsT7iBD6ZSc/MzhQfzRI03v91lioui3LMd2HItn6sfpIDrbm5SEgKeB5wPYwxgBDSNGQYCIB3UG412qHn7z4qqSmKonznqWtXpY3Penc/l+Py0xFJFmgGEkxM0201h9WKSgvZp28+xCfyNMPeYYxep/77sNStVYxBEzljjF0AKZYRBCkeSc4XHi+lsgWa+WtEeOsZjAaaprZHAw05NsEegJBhuaAoRRLpSCwFIbwpvg3/U/zXJ/kDNKp/NWm/KxoAAAAASUVORK5CYII=";

function FBE_getCaret(el) 
{
	if (el.selectionStart) 
	{
		return el.selectionStart;
	} 
	else if (document.selection) 
	{
		el.focus();

		var r = document.selection.createRange();
		if (r == null) 
		{
			return 0;
		}

		var re = el.createTextRange(),
		rc = re.duplicate();
		re.moveToBookmark(r.getBookmark());
		rc.setEndPoint('EndToStart', re);

		return rc.text.length;
	} 
	return 0;
}
//---------------------------------------------------------------------------------
/*
function FBE_AddSymbol(symbol)
{	
	var mentionsHidden = document.getElementsByClassName("mentionsHidden");
	if(mentionsHidden&&mentionsHidden.length>0)
	{
		var foundTextInTextArea = false; // user still didn't enter any text ...
		for ( var i = 0 ; i < mentionsHidden.length ; i++ ) 
		{			
			if(mentionsHidden[i].value != "")
			{
				foundTextInTextArea = true;
			}
		}		
		if(foundTextInTextArea) 
		{
			var eb = document.getElementById("FBE_errorBanner");
			if(eb)
				eb.style.display = "none";
		}
		else
		{
			var eb = document.getElementById("FBE_errorBanner");
			if(eb)
				eb.style.display = "";
			return;
		}
	}	
	//------------ adding symbol to all inner elements ....	
	var xhpc_message_text = document.getElementsByName("xhpc_message_text");
	if(xhpc_message_text&&xhpc_message_text.length>0)
	{		
		for ( var i = 0 ; i < xhpc_message_text.length ; i++ ) 
		{
			//GM_log("FBE_getCaret(el) = "+FBE_getCaret(xhpc_message_text[i]));
			if(xhpc_message_text[i].value )
			{
				//GM_log("current value="+xhpc_message_text[i].value);				
				var cursor_pos = FBE_getCaret(xhpc_message_text[i]);
				//GM_log("cursor_pos="+cursor_pos+"\n"+
				//	   "until pos="+xhpc_message_text[i].value.substr(0, cursor_pos)+"\n"+
				//	   "symbol="+symbol+"\n"+
				//	   "other_part="+xhpc_message_text[i].value.substr(cursor_pos)
				//	  );
				xhpc_message_text[i].value = xhpc_message_text[i].value.substr(0, cursor_pos) +
											 symbol +
											 xhpc_message_text[i].value.substr(cursor_pos);
				xhpc_message_text[i].setSelectionRange(cursor_pos+1, cursor_pos+1);
				//xhpc_message_text[i].value = xhpc_message_text[i].value + symbol ;	
				xhpc_message_text[i].focus();				
			}
		}
	}
	
	// var mentionsTextarea = document.getElementsByClassName("mentionsTextarea");
	// if(mentionsTextarea&&mentionsTextarea.length>0)
	// {		
		// for ( var i = 0 ; i < mentionsTextarea.length ; i++ ) 
		// {
			// GM_log("(i="+i+")"+mentionsTextarea[i].outerHTML);
			// if(mentionsTextarea[i].value )
			// {
				// mentionsTextarea[i].value = mentionsTextarea[i].value + symbol ;	
				// //mentionsTextarea[i].focus();				
			// }
		// }
	// }
	//------------	
	var xhpcMessage = document.getElementsByName("xhpc_message");
	if(xhpcMessage&&xhpcMessage.length>0)
	{
		for ( var i = 0 ; i < xhpcMessage.length ; i++ ) 
		{
			if(xhpcMessage[i].value)
			{
				xhpcMessage[i].value = xhpcMessage[i].value.substr(0, cursor_pos) +
									   symbol +
									   xhpcMessage[i].value.substr(cursor_pos);
				//xhpcMessage[i].value = xhpcMessage[i].value + symbol;				
			}
		}
	}
	//------------
	var highlighterContent = document.getElementsByClassName("highlighterContent hidden_elem");
	if(highlighterContent&&highlighterContent.length>0)
	{
		highlighterContent[0].innerHTML = 	highlighterContent[0].innerHTML.substr(0, cursor_pos) +
											symbol +
											highlighterContent[0].innerHTML.substr(cursor_pos);
		//highlighterContent[0].innerHTML = highlighterContent[0].innerHTML + symbol;
	}
	//------------
	
}
//---------------------------------------------------------------------------------
var FBE_visible = false;
function FBE_TogglePopup(hoveritem)
{	
	hp = document.getElementById("FBE_hoverpopup");
	if ( FBE_visible )
	{		
		hp.style.visibility = "hidden";	
		FBE_visible = false ;		
	}
	else
	{
		hp.style.visibility = "visible";
		FBE_visible = true;
		var eb = document.getElementById("FBE_errorBanner");
		if(eb)
			eb.style.display = "none";
	}
}
//---------------------------------------------------------------------------------
var foundTextInTextArea_saved = false;
function FBE_main_orig()
{	
	//---------------------------------
	// if POST occured - Close table
	var mentionsHidden = document.getElementsByClassName("mentionsHidden");
	if(mentionsHidden&&mentionsHidden.length>0)
	{
		var foundTextInTextArea = false; // user still didn't enter any text ...
		for ( var i = 0 ; i < mentionsHidden.length ; i++ ) 
		{			
			if(mentionsHidden[i].value != "")
			{
				foundTextInTextArea = true;
			}
		}		
	}	
	if( foundTextInTextArea == false && foundTextInTextArea_saved == true ) 
	{
		FBE_visible = true;
		FBE_TogglePopup();
	}	
	foundTextInTextArea_saved = foundTextInTextArea;
	//---------------------------------
	if(document.getElementById("FBE_attachmentBarArea_a"))
		return;
		
	var FBE_attachmentBarArea = document.getElementsByClassName("uiComposerAttachments"); 
	if(FBE_attachmentBarArea && FBE_attachmentBarArea.length>0 )	
	{
		var FBE_attachmentBarArea_a = document.createElement("li");
		FBE_attachmentBarArea_a.id = "FBE_attachmentBarArea_a";	
		//FBE_attachmentBarArea_a.innerHTML = "<font size='3' color ='#666666'>&#9730;&#9835;</font>&nbsp;" +
		//									"<a onClick='FBE_TogglePopup(this);'><strong>Status Symbols</strong></a>" +
		//									"&nbsp;<font size='3' color ='#666666'>&#9829;&#9775;</font>" ;		
		FBE_attachmentBarArea_a.setAttribute('class', "uiListItem  uiListHorizontalItemBorder uiListHorizontalItem");				
		FBE_attachmentBarArea_a.innerHTML = '<span class="uiComposerAttachment postAttachment attachmentAcceptsLink" id="" data-endpoint=""><span class="uiIconText attachmentLink normal"><strong class=""><font size="3" color ="#666666">&#9730;&#9835;</font>&nbsp;<a onClick="FBE_TogglePopup(this);"><strong>Status Symbols</strong></a>&nbsp;<font size="3" color ="#666666">&#9829;&#9775;</font></strong></span></span>' ;
		
		for ( var i = 0 ; i < FBE_attachmentBarArea.length ; i++ ) 
		{
			FBE_attachmentBarArea[i].appendChild(FBE_attachmentBarArea_a);
		}
		//--------------	
		var  FBE_symbolArr= [10084,9728,9729,9730,9731,9732,9733,9734,9784,9786,9785,10026,10047,10048,10027,9832,10003,10005,10010,9742,
							 9743, //9748,9749,
							 10056,
							 //9752,9753,
							 9754,9755,9756,9757,9758,9759,9760,9762,9763,9774,9775,9833,
							 9834,9835,9836,9837,9838,9839,9986,9990,9991,9992,9993,9996,9997,9998,8800,8226,169,174,8482,9812,9813,9814,9815,
							 9816,9817,9818,9819,9820,9821,9822,9823,9824,9825,9826,9827,9828,9829,9830,9831,10102,10103,
							 10104,10105,10106,10107,10108,10109,10110];
		FBE_symbolArr.reverse();
		//--------------
		var FBE_symbol;
		FBE_symbolTable_str = "<table border='0'><tbody>";		
		for(var row=0;row<6;row++)
		{
			FBE_symbolTable_str = FBE_symbolTable_str + "<tr>";
			for(var col=0;col<15;col++)
			{
				FBE_symbol = FBE_symbolArr.pop();
				if(!FBE_symbol)
					break;
				var FBE_fontSize = 200;
				if(FBE_symbol >= 10102 && FBE_symbol <= 10110)
					FBE_fontSize = 120;
				FBE_symbolTable_str = FBE_symbolTable_str + "<td style='font-size:"+FBE_fontSize+"%' onclick='FBE_AddSymbol(\"&#"+FBE_symbol+";\");'>&#"+FBE_symbol+"; "+"</td>";			
			}
			FBE_symbolTable_str = FBE_symbolTable_str + "</tr>";		
		}
		FBE_symbolTable_str = FBE_symbolTable_str + "</table>";
		//--------------	
		FBE_close_button = "|&nbsp;&nbsp;<a onClick='FBE_TogglePopup(this);'><strong>Close</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;";
		FBE_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Status-Symbols%2F3000-12941_4-75754350.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
		FBE_banner = "<table><tr><td>Please Like Facebook Symbols : </td><td>"+FBE_like_button+"</td><td>"+FBE_close_button+"</td></tr></table><hr>";
		FBE_errorBanner ="<div id='FBE_errorBanner' style='display:none;background-color:yellow;color:#3B5998;'><hr>&nbsp;Please insert at least one letter in the Status Line first ... </div>";
		//--------------
		var FBE_attachmentBarArea_div = document.createElement("div");
		FBE_attachmentBarArea_div.id = "FBE_hoverpopup";	
		FBE_attachmentBarArea_div.style.border = "solid 1px #3B5998";
		FBE_attachmentBarArea_div.style.backgroundColor = "white";
		FBE_attachmentBarArea_div.style.visibility = "hidden";
		FBE_attachmentBarArea_div.style.position = "absolute";
		//FBE_attachmentBarArea_div.style.top = "125px"; //30px
		//FBE_attachmentBarArea_div.style.left = "0px";	//150px
		FBE_attachmentBarArea_div.innerHTML = FBE_banner + FBE_symbolTable_str + FBE_errorBanner ;
		
		// add symbol table 
		//-----------------
		FBE_attachmentBarArea = document.getElementsByClassName("fbTimelineComposerUnit"); // Timeline
		
		if( !FBE_attachmentBarArea  || FBE_attachmentBarArea.length < 1 )
			FBE_attachmentBarArea = document.getElementsByClassName("uiComposerMetaContainer"); 
		
		for ( var i = 0 ; i < FBE_attachmentBarArea.length ; i++ ) 
		{
			FBE_attachmentBarArea[i].appendChild(FBE_attachmentBarArea_div);	
			//----------
			
			// if (FBE_attachmentBarArea[i].addEventListener) // all browsers except IE before version 9
			// { 
				// FBE_attachmentBarArea[i].addEventListener ('DOMAttrModified', OnAttrModified, false);    // Firefox, Opera, IE
			// }
			// if (FBE_attachmentBarArea[i].attachEvent) // Internet Explorer and Opera
			// {  
				// FBE_attachmentBarArea[i].attachEvent ('onpropertychange', OnAttrModified);   // Internet Explorer
			// }
			//----------
		}
	}	
}*/
//---------------------------------------------------------------------------------
// document.activeElement
// var x = FBE_getOffset( document.getElementById('yourElId') ).left; 
/*
function FBE_getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}*/
//---------------------------------------------------------------------------------
/*
function FBE_searchParentNodeTagAndThenChildClass(curNode,parentTagName,childClassName,maxUpperLevels)
{
	for(var i = 0 ; i < maxUpperLevels ; i ++)
	{
		GM_log("i="+i+",curNode.tagName="+curNode.tagName);
		if ( curNode.tagName.toLowerCase() == parentTagName.toLowerCase() )
		{
			return curNode.getElementsByClassName(childClassName); 
		}
		curNode = curNode.parentNode;
	}

	return null;
}*/
/*
function FBE_searchParentNodeClassAndThenChildClass(curNode,parentClassName,childClassName,maxUpperLevels)
{
	for(var i = 0 ; i < maxUpperLevels ; i ++)
	{
		GM_log("i="+i+",curNode.getAttribute('class')="+curNode.getAttribute("class"));
		if ( curNode.getAttribute("class") && curNode.getAttribute("class")== parentClassName )
		{
			// ChildClass is me ..
			if(curNode.getAttribute("class") == childClassName )
			{
				var arr = [];
				arr.push(curNode);
				return arr;
			}
			return curNode.getElementsByClassName(childClassName); 
		}
		curNode = curNode.parentNode;
		if(!curNode)
			break;
	}

	return null;
}*/
//--------------------------------------------------------------------------------------------
//############################################################################################
//--------------------------------------------------------------------------------------------
function FBE_enableErrorMsg(curNode,enable)
{	
	if(enable)
	{
		var eb = curNode.getElementsByClassName("FBE_errorBanner");
		if(eb&&eb.length>0)
		{
			//GM_log("eb[0].innerHTML="+eb[0].innerHTML);
			eb[0].style.display = "";	
		}
	}
	else
	{
		var eb = curNode.getElementsByClassName("FBE_errorBanner");
		if(eb&&eb.length>0)
		{
			eb[0].style.display = "none";
		}
	}
}
//--------------------------------------------------------------------------------------------
//############################################################################################
//--------------------------------------------------------------------------------------------
//var FBE_foundTextInTextArea_saved = false;
function FBE_AddSymbol(curNode,symbol)
{	
	/*
	var timelineUnitContainer = FBE_searchParentNodeClass(curNode,"timelineUnitContainer",10);
	if( !timelineUnitContainer || !timelineUnitContainer.parentNode )
		return;	
		
	var timelineUnitContainerParent = timelineUnitContainer.parentNode;
	*/
	var FBE_SymbolsWin = FBE_searchParentNodeClass(curNode,"FBE_SymbolsWin",15);
	if( !FBE_SymbolsWin )
		return;
	
	if(!FBE_SymbolsWin.parentNode)
		return;		
	var FBE_SymbolsWinParent = FBE_SymbolsWin.parentNode;

	//GM_log("adding symbol="+symbol);
	// if there is no text in comment field - present error msg ..
	//-------------------------------------------------------------
	/*
	<span class="highlighterContent hidden_elem">nnnnnnnn</span>
	<input type="hidden" class="mentionsHidden" autocomplete="off" name="add_comment_text" value="nnnnnnnnn">
	*/
	
	var mentionsHidden = FBE_SymbolsWinParent.getElementsByClassName("mentionsHidden");
	if( !mentionsHidden || mentionsHidden.length < 1 )
		return;
	//-------------------------------------------------------------
	if( !mentionsHidden[0].value || mentionsHidden[0].value==""  )
		var mentionsHiddenEmpty = true;
	else
		var mentionsHiddenEmpty = false;
	//----------	
	var textMetrics = document.getElementsByClassName("textMetrics");
	if( !textMetrics || textMetrics.length < 1 || !textMetrics[0].value || textMetrics[0].value=="" || textMetrics[0].value=="..." )
		var textMetricsEmptyOrNotExist = true;
	else
		var textMetricsEmptyOrNotExist = false;
	//GM_log("textMetric="+textMetrics[0].value);
	//----------
	var mentionsTextarea = FBE_SymbolsWinParent.getElementsByClassName("mentionsTextarea");
	if(!mentionsTextarea || mentionsTextarea.length < 1)
		return;
	var lastMentionsTextareaPos = mentionsTextarea.length-1;
	//----------
	if(  mentionsHiddenEmpty && textMetricsEmptyOrNotExist )
	{
		FBE_enableErrorMsg(FBE_SymbolsWin,true);
		/*
		if(FBE_foundTextInTextArea_saved) // POST occured - Close Table
		{
			FBE_toggleSymbolsWin(FBE_SymbolsWin);
			FBE_foundTextInTextArea_saved = false;
		}*/
		mentionsTextarea[lastMentionsTextareaPos].focus();
		mentionsTextarea[lastMentionsTextareaPos].focus();
		return;
	}		
	FBE_enableErrorMsg(FBE_SymbolsWin,false);
	//----------
	
	var cursor_pos = FBE_getCaret(mentionsTextarea[0]);
	//----------
	mentionsTextarea[lastMentionsTextareaPos].value =	mentionsTextarea[lastMentionsTextareaPos].value.substr(0, cursor_pos) +
								symbol +
								mentionsTextarea[lastMentionsTextareaPos].value.substr(cursor_pos);
	mentionsTextarea[lastMentionsTextareaPos].setSelectionRange(cursor_pos+symbol.length, cursor_pos+symbol.length);
	//----------
	mentionsHidden[0].value =	mentionsHidden[0].value.substr(0, cursor_pos) +
								symbol +
								mentionsHidden[0].value.substr(cursor_pos);	
	
	//----------
	var highlighterContent = FBE_SymbolsWinParent.getElementsByClassName("highlighterContent hidden_elem");
	if(!highlighterContent || highlighterContent.length < 1)
		return;
	highlighterContent[0].innerHTML = 	highlighterContent[0].innerHTML.substr(0, cursor_pos) +
										symbol +
										highlighterContent[0].innerHTML.substr(cursor_pos);	
										
	//FBE_foundTextInTextArea_saved = true;
	mentionsTextarea[lastMentionsTextareaPos].focus();
	mentionsTextarea[lastMentionsTextareaPos].focus();
	//----------
	
	// adding symbol to all inner elements ....	
	//-------------------------------------------------------------
	//var cursor_pos  = 0;
	/*
	var xhpc_message_text = FBE_SymbolsWinParent.getElementsByName("xhpc_message_text");
	if(xhpc_message_text&&xhpc_message_text.length>0)
	{		
		for ( var i = 0 ; i < xhpc_message_text.length ; i++ ) 
		{			
			if(xhpc_message_text[i].value )
			{		
				var cursor_pos = FBE_getCaret(xhpc_message_text[i]);			
				xhpc_message_text[i].value = xhpc_message_text[i].value.substr(0, cursor_pos) +
											 symbol +
											 xhpc_message_text[i].value.substr(cursor_pos);
				xhpc_message_text[i].setSelectionRange(cursor_pos+1, cursor_pos+1);				
				xhpc_message_text[i].focus();				
			}
		}
	}		
	//------------	
	var xhpcMessage = FBE_SymbolsWinParent.getElementsByName("xhpc_message");
	if(xhpcMessage&&xhpcMessage.length>0)
	{
		for ( var i = 0 ; i < xhpcMessage.length ; i++ ) 
		{
			if(xhpcMessage[i].value)
			{
				xhpcMessage[i].value = xhpcMessage[i].value.substr(0, cursor_pos) +
									   symbol +
									   xhpcMessage[i].value.substr(cursor_pos);				
			}
		}
	}
	//------------
	*/	
	//------------	
}
//--------------------------------------------------------------------------------------------
//############################################################################################
//--------------------------------------------------------------------------------------------
function FBE_searchParentNodeClass(curNode,parentClassName,maxUpperLevels)
{
	//GM_log("FBE_searchParentNodeClass parentClassName="+parentClassName);
	for(var i = 0 ; i < maxUpperLevels ; i ++)
	{
		//GM_log("i="+i+",curNode.getAttribute('class')="+curNode.getAttribute("class"));
		if ( curNode.getAttribute("class") && 
			 curNode.getAttribute("class").indexOf(parentClassName) != -1 )
		{
			//GM_log("FBE_searchParentNodeClass found parentClassName="+parentClassName);
			return curNode;
		}
		curNode = curNode.parentNode;
		if(!curNode)
			break;
	}
	//GM_log("FBE_searchParentNodeClass NOT found parentClassName="+parentClassName);
	return null;
}

//---------------------------------------------------------------------------------
//var FBE_SymbolsWinVisible = false;
function FBE_ShowCommentsIcons(FBE_SymbolsWin,show)
{
	var FBE_commentsIcons = FBE_SymbolsWin.getElementsByClassName("FBE_commentsIcons"); 
	if( FBE_commentsIcons && FBE_commentsIcons.length > 0 )
	{		
		for ( var i = 0 ; i < FBE_commentsIcons.length ; i++ ) 
		{	
			if(show)
				FBE_commentsIcons[i].style.display = "";
			else
				FBE_commentsIcons[i].style.display = "none";	
		}
	}
}

function FBE_toggleSymbolsWin(curNode,template/*,closeMe*/)
{
	/*
	//if( !curNode || !curNode.parentNode )
	//	return;
	//curNode = curNode.parentNode;	
	GM_log("curNode.tagName="+curNode.tagName);
	GM_log("curNode.innerHTML="+curNode.innerHTML);
	GM_log("curNode.outerHTML="+curNode.outerHTML);
	GM_log("curNode.offsetTop="+curNode.offsetTop);
	GM_log("curNode.offsetLeft="+curNode.offsetLeft);
	GM_log("curNode.offsetHeight="+curNode.offsetHeight);
	GM_log("curNode.offsetWidth="+curNode.offsetWidth);
	GM_log("curNode.scrollHeight="+curNode.scrollHeight);
	GM_log("curNode.scrollWidth="+curNode.scrollWidth);
	
	GM_log("curNode.style.top="+curNode.style.top);
	GM_log("curNode.style.left="+curNode.style.left);
	
	GM_log("FBE_getOffset(curNode).left="+FBE_getOffset(curNode).left);
	GM_log("FBE_getOffset(curNode).top="+FBE_getOffset(curNode).top);
	//GM_log(GM_printObj_simple(curNode));
	*/
	//----------------------------------------------------------------------
	if( curNode.getAttribute("class") == "FBE_SymbolsWin" )
	{
		FBE_SymbolsWin = curNode;		
	}
	else if(template=="old_FB_status")
	{
		//GM_log("FBE_toggleSymbolsWin::old_FB_status");
		//var uiComposerWhiteMessageBox = FBE_searchParentNodeClass(curNode,"pagelet_composer",15); // uiComposerWhiteMessageBox
		//if(!uiComposerWhiteMessageBox || uiComposerWhiteMessageBox.length < 1 || !uiComposerWhiteMessageBox.parentNode)
			//return;
		var uiComposerWhiteMessageBox = document.getElementById("pagelet_composer");
			if(!uiComposerWhiteMessageBox)
				return;
		var uiComposerWhiteMessageBoxParent = uiComposerWhiteMessageBox.parentNode;
		var FBE_SymbolsWin_arr = uiComposerWhiteMessageBoxParent.getElementsByClassName("FBE_SymbolsWin");
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			GM_log("creating new FBE_SymbolsWin for this uiComposerWhiteMessageBox");
			FBE_SymbolsWin = FBE_createSymbolsWin(uiComposerWhiteMessageBox);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}	
		FBE_ShowCommentsIcons(FBE_SymbolsWin,false);
	} 
	
	else if ( FBE_searchParentNodeClass(curNode,"UFIAddComment",15)!=null )
	{
		//GM_log("FBE_toggleSymbolsWin::UFIAddComment");		
		var UFIAddComment = FBE_searchParentNodeClass(curNode,"UFIAddComment",15);
		if( !UFIAddComment )
			return;
		
		var UFIAddCommentParent = UFIAddComment.parentNode;
		var FBE_SymbolsWin_arr = UFIAddCommentParent.getElementsByClassName("FBE_SymbolsWin");
		
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			//GM_log("creating new FBE_SymbolsWin for this UFIAddCommentParent");
			FBE_SymbolsWin = FBE_createSymbolsWin(UFIAddCommentParent);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}
		FBE_ShowCommentsIcons(FBE_SymbolsWin,true);
	}
	else if ( FBE_searchParentNodeClass(curNode,"UFIList",15)!=null )
	{
		//GM_log("FBE_toggleSymbolsWin::UFIList");		
		var UFIList = FBE_searchParentNodeClass(curNode,"UFIList",15);
		if( !UFIList )
			return;
		
		var UFIListParent = UFIList.parentNode;
		var FBE_SymbolsWin_arr = UFIListParent.getElementsByClassName("FBE_SymbolsWin");
		
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			//GM_log("creating new FBE_SymbolsWin for this UFIListParent");
			FBE_SymbolsWin = FBE_createSymbolsWin(UFIListParent);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}
		FBE_ShowCommentsIcons(FBE_SymbolsWin,true);
	}
	else if ( FBE_searchParentNodeClass(curNode,"fbxPhotoSetPageMetadata",15)!=null )
	{
		//GM_log("FBE_toggleSymbolsWin::fbxPhotoSetPageMetadata");
		var fbxPhotoSetPageMetadata = FBE_searchParentNodeClass(curNode,"fbxPhotoSetPageMetadata",15);
		if( !fbxPhotoSetPageMetadata )
			return;
		
		var fbxPhotoSetPageMetadataParent = fbxPhotoSetPageMetadata.parentNode;
		var FBE_SymbolsWin_arr = fbxPhotoSetPageMetadataParent.getElementsByClassName("FBE_SymbolsWin");
		
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			//GM_log("creating new FBE_SymbolsWin for this fbxPhotoSetPageMetadataParent");
			FBE_SymbolsWin = FBE_createSymbolsWin(fbxPhotoSetPageMetadataParent);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}
		FBE_ShowCommentsIcons(FBE_SymbolsWin,true);
	}
	else if(template=="old_FB_comments"||FBE_searchParentNodeClass(curNode,"storyInnerContent",15)!=null	)
	{
		//GM_log("FBE_toggleSymbolsWin::old_FB_comments || storyInnerContent");
		var storyInnerContent = FBE_searchParentNodeClass(curNode,"storyInnerContent",15);
		if( !storyInnerContent || storyInnerContent.length < 1 || !storyInnerContent.parentNode )
			return;
		
		var storyInnerContentParent = storyInnerContent.parentNode;
		var FBE_SymbolsWin_arr = storyInnerContentParent.getElementsByClassName("FBE_SymbolsWin");
		
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			//GM_log("creating new FBE_SymbolsWin for this storyInnerContentParent");
			FBE_SymbolsWin = FBE_createSymbolsWin(storyInnerContentParent);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}
		FBE_ShowCommentsIcons(FBE_SymbolsWin,true);
	}	
	else // calculate where is FBE_SymbolsWin
	{
		//GM_log("FBE_toggleSymbolsWin::else");
		var timelineUnitContainer = FBE_searchParentNodeClass(curNode,"timelineUnitContainer",15);
		if( !timelineUnitContainer || timelineUnitContainer.length < 1 || !timelineUnitContainer.parentNode )
			return;
		
		var timelineUnitContainerParent = timelineUnitContainer.parentNode;
		var FBE_SymbolsWin_arr = timelineUnitContainerParent.getElementsByClassName("FBE_SymbolsWin");
		
		if( ! FBE_SymbolsWin_arr || FBE_SymbolsWin_arr.length < 1 )	
		{
			//GM_log("creating new FBE_SymbolsWin for this timelineUnitContainerParent");
			FBE_SymbolsWin = FBE_createSymbolsWin(timelineUnitContainerParent);
		}
		else
		{
			FBE_SymbolsWin = FBE_SymbolsWin_arr[0];
		}
		FBE_ShowCommentsIcons(FBE_SymbolsWin,false);
	}
	//----------------------------------------------------------------------
	//if ( FBE_SymbolsWinVisible /*|| closeMe */)
	//if( FBE_SymbolsWin.getAttribute('FBE_toggle') != null     && 
	//    FBE_SymbolsWin.getAttribute('FBE_toggle') == "openned"   )
	if( !FBE_SymbolsWin.style.display || FBE_SymbolsWin.style.display == "" )
	{		
		//FBE_SymbolsWin.style.visibility = "hidden";	
		FBE_SymbolsWin.style.display = "none";			
		
		var img_arr = curNode.getElementsByTagName("img");
		if(img_arr&&img_arr.length>0)
		{
			//img_arr[0].setAttribute("class","emote_img");		
			//img_arr[0].setAttribute("style","background-position: 0px 0;background-image:none");			
			//img_arr[0].setAttribute("src","http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif");
			img_arr[0].setAttribute("src",FBE_yellowSmile);
		}
		else 
		{
			var img_arr_parentNode = curNode.parentNode.getElementsByTagName("img");
			if(img_arr_parentNode&&img_arr_parentNode.length>0)
			{
				img_arr_parentNode[0].setAttribute("src",FBE_yellowSmile);
			}
		}
		//FBE_SymbolsWinVisible = false ;	
		//FBE_SymbolsWin.setAttribute('FBE_toggle', 'closed');
		/*if(curNode.innerHTML.indexOf("Symbols")!=-1)
			curNode.innerHTML = "Open Symbols";*/		
	} 
	else
	{
		//FBE_SymbolsWin.style.top = FBE_getOffset(curNode).top + 18;
		//FBE_SymbolsWin.style.left = FBE_getOffset(curNode).left + 20;
		//GM_log("curNode.style.top="+curNode.style.top);
		//GM_log("curNode.style.left="+curNode.style.left);
		//FBE_SymbolsWin.style.top = "30px"; //30px
		//FBE_SymbolsWin.style.left = "0px";	//150px
		//FBE_SymbolsWin.style.visibility = "visible";
		FBE_SymbolsWin.style.display = "";	
		
		
		var img_arr = curNode.getElementsByTagName("img");
		if(img_arr&&img_arr.length>0)
		{
			//img_arr[0].setAttribute("class","emoteTogglerImg");
			//img_arr[0].setAttribute("style","background-position: -269px -80px;background-image:url(\"http://static.ak.fbcdn.net/rsrc.php/v2/yS/x/hA-1OAP-yli.png\"");
			//img_arr[0].setAttribute("src","");
			img_arr[0].setAttribute("src",FBE_graySmile);
		}
		else 
		{
			var img_arr_parentNode = curNode.parentNode.getElementsByTagName("img");
			if(img_arr_parentNode&&img_arr_parentNode.length>0)
			{
				img_arr_parentNode[0].setAttribute("src",FBE_graySmile);
			}
		}
		
		
		//FBE_SymbolsWinVisible = true;
		//FBE_SymbolsWin.setAttribute('FBE_toggle', 'openned');
		/*if(curNode.innerHTML.indexOf("Symbols")!=-1)
		{
			curNode.innerHTML = "Close Symbols";
			curNode.style.fontWeight = "bold";
		}*/
		/*
		var eb = curNode.getElementById("FBE_errorBanner");
		if(eb)
		{
			eb.style.display = "none";
		}
		*/
	}
	//------------------------------------------------------
	// close all other windows except me ...
	var FBE_SymbolsWinArr = document.getElementsByClassName("FBE_SymbolsWin"); 
	if( FBE_SymbolsWinArr && FBE_SymbolsWinArr.length > 0 )
	{		
		for ( var i = 0 ; i < FBE_SymbolsWinArr.length ; i++ ) 
		{	
			if( FBE_SymbolsWinArr[i] !=  FBE_SymbolsWin )
			{
				FBE_SymbolsWinArr[i].style.display = "none";
				//if(FBE_SymbolsWinArr[0].innerHTML.indexOf("Symbols")!=-1)
				//	FBE_SymbolsWinArr[0].innerHTML = "Open Symbols";
			}
		}
	}
	//------------------------------------------------------
	var textMetricsArr = document.getElementsByClassName("textMetrics"); 
	if( textMetricsArr && textMetricsArr.length > 0 )
	{
		for ( var i = 0 ; i < textMetricsArr.length ; i++ ) 
		{	
			if(textMetricsArr[i].parentNode)
				textMetricsArr[i].parentNode.removeChild(textMetricsArr[i]);
		}
	}
}
/*
	// find the appropriate SymbolWin in curNode or create it ...
	//var FBE_SymbolsWin = document.getElementsByClassName("FBE_SymbolsWin"); 
	var FBE_SymbolsWin = FBE_searchParentNodeClassAndThenChildClass(curNode,"timelineUnitContainer","FBE_SymbolsWin",10);
	if( FBE_SymbolsWin && FBE_SymbolsWin.length > 0 )
	{
		GM_log("found FBE_SymbolsWin"); //// #### write new function x=FBE_searchParentNodeClass(curNode,"name",10) , then x.parentNode.appeendChild
		FBE_SymbolsWin = FBE_SymbolsWin[0];
	}
	else
	{
		var parentTimelineUnitContainer = 
			FBE_searchParentNodeClassAndThenChildClass(curNode,"timelineUnitContainer","timelineUnitContainer",10);		
		if( parentTimelineUnitContainer && parentTimelineUnitContainer.length > 0 )
		{
			GM_log("found parentTimelineUnitContainer");
			FBE_SymbolsWin = FBE_createSymbolsWin(parentTimelineUnitContainer[0]);
		}
		else
		{
			GM_log("didnt found parentTimelineUnitContainer");
			return;
		}
	}*/	
//---------------------------------------------------------------------------------
var FBE_SymbolsWin_str ;
function FBE_createSymbolsWin(parentNode)
{
	// performance : create it once and save the str in memory...
	if( !FBE_SymbolsWin_str || FBE_SymbolsWin_str.length < 1)
		FBE_SymbolsWin_str = FBE_createSymbolsWin_str();
		
	var FBE_SymbolsWin_div = document.createElement("div");
	//FBE_SymbolsWin_div.id = "FBE_SymbolsWin_"+id;	
	FBE_SymbolsWin_div.setAttribute("class","FBE_SymbolsWin");	
	FBE_SymbolsWin_div.style.border = "solid 1px #3B5998";
	FBE_SymbolsWin_div.style.backgroundColor = "white";
	//FBE_SymbolsWin_div.style.visibility = "hidden";
	FBE_SymbolsWin_div.style.display = "none";
	//FBE_SymbolsWin_div.style.position = "absolute";
	FBE_SymbolsWin_div.style.top = "0px";
	FBE_SymbolsWin_div.style.left = "0px";			
	FBE_SymbolsWin_div.style.zIndex = 999999999;			
	FBE_SymbolsWin_div.innerHTML = FBE_SymbolsWin_str;		
		
	parentNode.appendChild(FBE_SymbolsWin_div);
	
	return FBE_SymbolsWin_div;
}
//---------------------------------------------------------------------------------
function FBE_createSymbolsWin_str()
{
		var FBE_HttpsOn = location.href.match('https://')?true:false;
		var FBE_ImagesURL = FBE_HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
		//var FBE_emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:o ', ':/','>:(',  '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
		//var FBE_emotsInfoClass = ['emoticon_smile', 'emoticon_frown', 'emoticon_tongue', 'emoticon_grin', 'emoticon_gasp', 'emoticon_wink', 'emoticon_glasses', 'emoticon_sunglasses', 'emoticon_grumpy', 'emoticon_unsure', 'emoticon_devil','emoticon_angel', 'emoticon_kiss','emoticon_heart', 'emoticon_kiki', 'emoticon_squint', 'emoticon_confused', 'emoticon_upset','emoticon_pacman',   'emoticon_colonthree', 'emoticon_like' ];
		var FBE_emotsInfo = [   'emoticon_smile',':)',
								'emoticon_frown',':(',
								'emoticon_tongue',':P',
								'emoticon_grin','=D',
								'emoticon_gasp',':o',
								'emoticon_wink',';)',
								'emoticon_pacman',':v',
								'emoticon_grumpy','>:(',
								'emoticon_unsure',':/',
								'emoticon_cry',":\'(",
								'emoticon_kiki','^_^',
								'emoticon_glasses','8)',
								'emoticon_sunglasses','B|',
								'emoticon_heart','<3',
								'emoticon_devil','3:)',
								'emoticon_angel','O:)',
								'emoticon_squint','-_-',
								'emoticon_confused','o.O',
								'emoticon_upset','>:o',
								'emoticon_colonthree',':3',
								'emoticon_like','(y)' ];

       
		var FBE_spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
		
		//var FBE_halffEmotsListDom = parseInt( ( FBE_emotsInfo.length + FBE_spemotsInfo.length ) / 2 + 1);
		//GM_log("FBE_halffEmotsListDom="+FBE_halffEmotsListDom);
		var fEmotsListDom = document.createElement('div');
		fEmotsListDom.setAttribute('name','EmotsList');
		for(i=0;i<FBE_emotsInfo.length;i+=2) 
		{
			var fEmotsDom = document.createElement('img');
			fEmotsDom.setAttribute('alt',FBE_emotsInfo[i+1]);
			//fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px; ');
			fEmotsDom.setAttribute('src',FBE_ImagesURL + 'blank.gif');			
			fEmotsDom.setAttribute('class','emoticon ' + FBE_emotsInfo[i]);
			fEmotsDom.setAttribute('onclick',"FBE_AddSymbol(this,\" "+FBE_emotsInfo[i+1]+" \" );");
			fEmotsListDom.appendChild(fEmotsDom);
			if ( i == 24 )
			{
				var fEmotsDomBr = document.createElement('BR');
				fEmotsListDom.appendChild(fEmotsDomBr);
			}
			else
			{
				fEmotsListDom.innerHTML = fEmotsListDom.innerHTML + "&nbsp;&nbsp;&nbsp;";
			}
		}
		for(i=0;i<FBE_spemotsInfo.length;i+=2) 
		{
			var fEmotsDom = document.createElement('img');
			fEmotsDom.setAttribute('alt',FBE_spemotsInfo[i]);
			fEmotsDom.setAttribute('src',FBE_ImagesURL + FBE_spemotsInfo[i+1]);
			fEmotsDom.setAttribute('style','cursor: pointer;');
			fEmotsDom.setAttribute('class','emote_custom');
			fEmotsDom.setAttribute('onclick',"FBE_AddSymbol(this,' "+FBE_spemotsInfo[i]+" ');");
			fEmotsListDom.appendChild(fEmotsDom);
			fEmotsListDom.innerHTML = fEmotsListDom.innerHTML + "&nbsp;&nbsp;&nbsp;";
		}		
		var FBE_iconsTable_str = "<div class='FBE_commentsIcons' class=''>" + fEmotsListDom.innerHTML + "<hr></div>";		
		//-------------
		var  FBE_symbolArr= [10084,9728,9729,9730,9731,9732,9733,9734,9784,9786,9785,10026,10047,10048,10027,9832,10003,10005,10010,9742,
							 9743,/*9748,9749,*/10056,/*9752,9753,*/9754,9755,9756,9757,9758,9759,9760,9762,9763,9774,9775,9833,
							 9834,9835,9836,9837,9838,9839,9986,9990,9991,9992,9993,9996,9997,9998,8800,8226,169,174,8482,9812,9813,9814,9815,
							 9816,9817,9818,9819,9820,9821,9822,9823,9824,9825,9826,9827,9828,9829,9830,9831,10102,10103,
							 10104,10105,10106,10107,10108,10109,10110];
		FBE_symbolArr.reverse();
		//--------------
		var FBE_symbol;
		var FBE_symbolTable_str = "<table border='0'><tbody>";		
		for(var row=0;row<6;row++)
		{
			FBE_symbolTable_str = FBE_symbolTable_str + "<tr>";
			for(var col=0;col<15;col++)
			{
				FBE_symbol = FBE_symbolArr.pop();
				if(!FBE_symbol)
					break;
				var FBE_fontSize = 200;
				if(FBE_symbol >= 10102 && FBE_symbol <= 10110)
					FBE_fontSize = 120;
				FBE_symbolTable_str = FBE_symbolTable_str + "<td style='font-size:"+FBE_fontSize+"%' onclick='FBE_AddSymbol(this,\"&#"+FBE_symbol+";\");'>&#"+FBE_symbol+"; "+/*FBE_symbol+*/ "</td>";			
			}
			FBE_symbolTable_str = FBE_symbolTable_str + "</tr>";		
		}
		FBE_symbolTable_str = FBE_symbolTable_str + "</table>";
		//--------------	
		var FBE_close_button = "";//"|&nbsp;&nbsp;<a onClick='FBE_toggleSymbolsWin(this);'><strong>Close</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;";
		var FBE_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Status-Symbols%2F3000-12941_4-75754350.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
		var FBE_banner = "<table><tr><td>Please Like Facebook Emoticons : </td><td>"+FBE_like_button+"</td><td>"+FBE_close_button+"</td></tr></table><hr>";
		var FBE_errorBanner ="<div class='FBE_errorBanner' style='display:none;background-color:yellow;color:#3B5998;'><hr>&nbsp;Please insert at least one letter in the status/comment box first ... </div>";
		//--------------
		return  FBE_banner + FBE_iconsTable_str + FBE_symbolTable_str + FBE_errorBanner ;
}
//---------------------------------------------------------------------------------
var FBE_savedSeconds ;
function FBE_main()
{
	//-------------------------------------------
	// don't trigger on each DOMNodeInserted ... do it each 1 second ...
	var FBE_curSeconds = new Date().getSeconds(); 	
	if(FBE_savedSeconds == FBE_curSeconds )
	{		
		return;
	}	
	FBE_savedSeconds = FBE_curSeconds;
	//-------------------------------------------
	var timeline_found = false;
	//-------------------------------------------------------------------------------------------------
	// add link to Main Status win - timeline
	var fbTimelineComposerUnit = document.getElementsByClassName("fbTimelineComposerUnit"); //fbTimelineComposerAttachments
	//GM_log("fbTimelineComposerUnit="+fbTimelineComposerUnit+",fbTimelineComposerUnit.length="+fbTimelineComposerUnit.length);
	if( fbTimelineComposerUnit && fbTimelineComposerUnit.length > 0 )
	{
		timeline_found = true;
		for ( var i = 0 ; i < fbTimelineComposerUnit.length ; i++ ) 
		{	
			//GM_log("fbTimelineComposerUnit["+i+"].innerHTML="+fbTimelineComposerUnit[i].innerHTML);
			if( fbTimelineComposerUnit[i].getAttribute('FBE_status') != null )
				continue;			
			fbTimelineComposerUnit[i].setAttribute('FBE_status', 'set');
				
			if(fbTimelineComposerUnit[i].innerHTML.indexOf("FBE_toggleSymbolsWin")!=-1)
					break;
					
			var ul_tags = fbTimelineComposerUnit[i].getElementsByTagName("ul");
			if( !ul_tags || ul_tags.length < 1 )
				continue;

			var MainStatusWinSymbolLink = document.createElement("li");
			MainStatusWinSymbolLink.setAttribute("class","uiListItem  uiListLight");
			//MainStatusWinSymbolLink.setAttribute("style","padding-bottom:2px !important");
			//MainStatusWinSymbolLink.innerHTML = '<span class="uiComposerAttachment"><a tabindex="0"  onClick="FBE_toggleSymbolsWin(this);" href="#" class="uiIconText attachmentLink normal"><i class=""></i><strong class="attachmentName" style="font-size:1.3em;" >&#9829;&#9775;&#9730;&#9835;</strong></a><span class="uiIconText selected"><i class=""></i><strong class="attachmentName">&#9829;&#9775;&#9730;&#9835;<i class="nub"></i></strong></span></span>';			
			//MainStatusWinSymbolLink.innerHTML = '<span class="uiComposerAttachment"><a tabindex="0"  onClick="FBE_toggleSymbolsWin(this);" href="#" class="uiIconText attachmentLink normal"><i class=""></i><strong class="attachmentName" style="font-size:1.3em;" ><img style="background-position: 0px 0" src="http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif" class="emote_img" alt="smile"></strong></a><span class="uiIconText selected"><i class=""></i><strong class="attachmentName"><img style="background-position: 0px 0" src="http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif" class="emote_img" alt="smile"><i class="nub"></i></strong></span></span>';
			MainStatusWinSymbolLink.innerHTML = '<span class="uiComposerAttachment" style="padding-bottom:2px !important"><a tabindex="0"  onClick="FBE_toggleSymbolsWin(this);" href="#" class="uiIconText attachmentLink normal" style="padding-bottom:2px !important"><i class=""></i><strong class="attachmentName" style="font-size:1.3em;" ><img src="'+FBE_yellowSmile+'" alt=""></strong></a>' /*'<span class="uiIconText selected"><i class=""></i><strong class="attachmentName"><img src="'+FBE_yellowSmile+'"  alt=""><i class="nub"></i></strong></span>'+*/ + '</span>';
			ul_tags[0].appendChild(MainStatusWinSymbolLink);	
		}
	}
	else // add link to Main Status win	- old template/before timeline ...
	{
		timeline_found = false; // just in case ..
		var pagelet_composer = document.getElementById("pagelet_composer"); 		
		if( pagelet_composer &&
		    pagelet_composer.getAttribute('FBE_status') == null              && 
			pagelet_composer.innerHTML.indexOf("FBE_toggleSymbolsWin") == -1    )
		{						
			pagelet_composer.setAttribute('FBE_status', 'set');
				
			var ul_tags = pagelet_composer.getElementsByTagName("ul");
			if( ul_tags && ul_tags.length > 0 )
			{
				var MainStatusWinSymbolLink = document.createElement("li");
				MainStatusWinSymbolLink.setAttribute("class","plm uiListItem  uiListHorizontalItemBorder uiListHorizontalItem");
				// setting oldFacebookSkin=true 
				//MainStatusWinSymbolLink.innerHTML = '<span  class="uiComposerAttachment" style="font-size:13px">&#9829;&#9775;&nbsp;<a style="font-size:11px" tabindex="0" onClick="FBE_toggleSymbolsWin(this,\'old_FB_status\');" href="#" class="attachmentLink normal"><strong class="attachmentName">Add Symbols</strong></a>&nbsp;&#9730;&#9835;<span class="uiIconText selected"><i class=""></i><strong style="font-size:13px" class="attachmentName">&#9829;&#9775; Add Symbols &#9730;&#9835;<i class="nub"></i></strong></span></span>'
				//MainStatusWinSymbolLink.innerHTML = '<span  class="uiComposerAttachment" style="font-size:13px"><img style="background-position: 0px 0" src="http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif" class="emote_img" alt="smile">&nbsp;<a style="font-size:11px" tabindex="0" onClick="FBE_toggleSymbolsWin(this,\'old_FB_status\');" href="#" class="attachmentLink normal"><strong class="attachmentName">Symbols</strong></a><span class="uiIconText selected"><i class=""></i><strong style="font-size:13px" class="attachmentName"><img style="background-position: 0px 0" src="http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif" class="emote_img" alt="smile"><i class="nub"></i></strong></span></span>';
				MainStatusWinSymbolLink.innerHTML = '<span  class="uiComposerAttachment" style="font-size:13px"><img  style="vertical-align:top;height:16px;width:16px"   src="'+FBE_yellowSmile+'"  alt="">&nbsp;<a style="font-size:11px" tabindex="0" onClick="FBE_toggleSymbolsWin(this,\'old_FB_status\');" href="#" class="attachmentLink normal"><strong class="attachmentName">Emoticons</strong></a><span class="uiIconText selected"><i class=""></i><strong style="font-size:13px" class="attachmentName"><i class="nub"></i></strong></span></span>';
				//oldMainStatusWinSymbolLink.setAttribute("class","plm uiListItem  uiListHorizontalItemBorder uiListHorizontalItem");
				//oldMainStatusWinSymbolLink.innerHTML = '<span class="uiComposerAttachment"><a tabindex="0"  onClick="FBE_toggleSymbolsWin(this,true);" href="#" class="uiIconText attachmentLink normal"><i class=""></i><strong class="attachmentName" style="font-size:1.3em;" >&#9829;&#9775;&#9730;&#9835;</strong></a><span class="uiIconText selected"><i class=""></i><strong class="attachmentName">&#9829;&#9775;&#9730;&#9835;<i class="nub"></i></strong></span></span>';
				ul_tags[0].appendChild(MainStatusWinSymbolLink);	 
			}
		}
	}
	//-------------------------------------------------------------------------------------------------
	// go over all comments in timeline and add symbols links
	//var UIActionLinks = document.getElementsByClassName("UIActionLinks_bottom"); 	 
	var UIActionLinks = document.getElementsByClassName("mentionsAddComment"); 
	if(!UIActionLinks||UIActionLinks.length < 1)
		UIActionLinks = document.getElementsByClassName("UFIMentionsInputWrap"); 
	
	if( UIActionLinks && UIActionLinks.length > 0 )
	{
		for ( var i = 0 ; i < UIActionLinks.length ; i++ ) 
		{			
			// add link only once
			if( UIActionLinks[i].getAttribute('FBE_status') != null )
				continue;				
			UIActionLinks[i].setAttribute('FBE_status', 'set');
			
			if(UIActionLinks[i].innerHTML.indexOf("FBE_toggleSymbolsWin")!=-1)
				continue;
										
			//GM_log("UIActionLinks["+i+"].innerHTML="+UIActionLinks[i].innerHTML);
			//GM_log("UIActionLinks[0].innerHTML="+UIActionLinks[0].innerHTML);
			//if( UIActionLinks[i].parentNode && UIActionLinks[i].parentNode.parentNode && 
			 //  ( UIActionLinks[i].parentNode.getAttribute("class")=="uiStreamFooter" ||
			   //  UIActionLinks[i].parentNode.parentNode.getAttribute("class").indexOf("uiImageBlockDeprecated")!=-1 )
			   //)
			if(timeline_found)
			{
				//timeline
				//UIActionLinks[i].innerHTML = UIActionLinks[i].innerHTML + "<a onClick='FBE_toggleSymbolsWin(this);'><img style='background-position: 0px 0' src='http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif' class='emote_img' alt='smile'></a>";
				UIActionLinks[i].innerHTML = UIActionLinks[i].innerHTML + "<a onClick='FBE_toggleSymbolsWin(this);'><img src='"+FBE_yellowSmile+"'  alt=''></a>";
			}
			else				
			{	
				//UIActionLinks[i].innerHTML = UIActionLinks[i].innerHTML + "&nbsp;&#9829;&#9775;&nbsp;<a onClick='FBE_toggleSymbolsWin(this,\"old_FB_comments\");'>Symbols</a>&nbsp;&#9730;&#9835;&nbsp;&nbsp;&middot;&nbsp;&nbsp;";
				//UIActionLinks[i].innerHTML = UIActionLinks[i].innerHTML + "<a onClick='FBE_toggleSymbolsWin(this,\"old_FB_comments\");'><img style='background-position: 0px 0' src='http://static.ak.fbcdn.net/rsrc.php/v2/yw/r/drP8vlvSl_8.gif' class='emote_img' alt='smile'></a>";
				UIActionLinks[i].innerHTML = UIActionLinks[i].innerHTML + "<a onClick='FBE_toggleSymbolsWin(this,\"old_FB_comments\");'><img  src='"+FBE_yellowSmile+"'  alt=''></a>";
			}
		}
	}
	/*
	// go over all comments in timeline and add symbols links
	var uiCommentContainer = document.getElementsByClassName("fbTimelineUFI uiCommentContainer"); 
	if( uiCommentContainer && uiCommentContainer.length > 0 )
	{
		for ( var i = 0 ; i < uiCommentContainer.length ; i++ ) 
		{			
			// add link only once
			if( uiCommentContainer[i].getAttribute('FBE_status') != null )
				continue;				
			uiCommentContainer[i].setAttribute('FBE_status', 'set');
			//GM_log("uiCommentContainer["+i+"].innerHTML="+uiCommentContainer[i].innerHTML);
			
			// add Symbol link
			var UIActionLinks = getElementsByClassName(uiCommentContainer[i],"UIActionLinks_bottom"); 
			if( UIActionLinks && UIActionLinks.length > 0 )
			{
				//GM_log("UIActionLinks[0].innerHTML="+UIActionLinks[0].innerHTML);
				UIActionLinks[0].innerHTML = UIActionLinks[0].innerHTML + "&nbsp;&nbsp;&#9829;&#9775;&nbsp;<a onClick='FBE_toggleSymbolsWin(this);'>Symbols</a>&nbsp;&#9730;&#9835;";
			}
		}
	}
	*/
	
}
// because of facebook emulation of "refresh" pages
function FBE_removeAll_FBE_status_set() 
{
	var els = document.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	{
		if( els[i].getAttribute('FBE_status') != null )
		{
			els[i].removeAttribute('FBE_status');
		}
	}
}
//---------------------------------------------------------------------------------
FBE_removeAll_FBE_status_set();
document.body.addEventListener('DOMNodeInserted', FBE_main, false);
//---------------------------------------------------------------------------------
/*
function OnAttrModified(event) 
{
	var message = "";
	if ('attrChange' in event) // Firefox, Opera, Internet Explorer from version 9
	{    
		message += "Something has happened to an attribute of the " + event.target.tagName + " element.\n";
		switch (event.attrChange) 
		{
			case MutationEvent.MODIFICATION:
				message += "The value of the " + event.attrName + " attribute has been changed from "
							+ event.prevValue + " to " + event.newValue + ".";
				break;
			case MutationEvent.ADDITION:
				message += "The " + event.attrName + " attribute has been added to the element "
							+ "with the value of " + event.newValue + ".";
				break;
			case MutationEvent.REMOVAL:
				message += "The " + event.attrName + " attribute has been removed from the element."
							+ "The value was " + event.prevValue + " previously.";
				break;
		};
	}
	if ('propertyName' in event) // Internet Explorer
	{  
		message = "The " + event.propertyName + " property of the "
				   + event.srcElement.tagName + " element has been changed.";
	}

	GM_log(message);	
}
*/
//-------------------------------------------------------------------------------------------------
/*
	// POST occured - Close Table
	if(FBE_foundTextInTextArea_saved)
	{
		var FBE_SymbolsWin_arr = document.getElementsByClassName("FBE_SymbolsWin"); 
		if( FBE_SymbolsWin_arr && FBE_SymbolsWin_arr.length > 0 )
		{
			for ( var i = 0 ; i < FBE_SymbolsWin_arr.length ; i++ ) 
			{
				FBE_toggleSymbolsWin(FBE_SymbolsWin_arr[i],true);
			}			
		}
		FBE_foundTextInTextArea_saved = false;
	}*/