// ==UserScript==
// @name Orkut Scrap Helper
// @description Scrap those who have scrapped you in a single step! It creates a Text box besides each scrap so that the user can directly scrap the person without actually going to the other person's scrapbook
// @author     Ankur Saxena and Ajay Martin
// @include 	http://www.orkut.com/Scrapbook*
// ==/UserScript==


(function() {
var inputPostTokens;
var inputSignatures;
var allDivs, thisDiv;
var topLinksTds;

function init()
{
	var retVal = true;

	inputPostTokens = document.evaluate(
		"//input[@name='POST_TOKEN']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);


	inputSignatures = document.evaluate(
		"//input[@name='signature']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);


	if(! (inputPostTokens.snapshotItem(0) || inputSignatures.snapshotItem(0)) ) 
		retVal = false;


	allDivs = document.evaluate(
		"//TD[@class='r']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	topLinksTds = document.evaluate(
		"//TD[@class='H']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	return retVal;

}



function addScrapBookLink()
{	
	var a;
	if(a=topLinksTds.snapshotItem(0))
		a.innerHTML += ' |  <a class="H" href="http://www.orkut.com/Scrapbook.aspx">My Scrapbook</a>';
}




if(init()){
	addScrapBookLink();
}

var i = document.getElementsByTagName('div');
for (var j=i.length-1; j>-1; j--) {
    var linkdata =  i[j].getAttribute("style");
    var o = linkdata.indexOf("overflow");
    if(o >= 0){
	    var re = new RegExp("uid=([0-9]+)","ig");
		var arr = re.exec(i[j].innerHTML);
		var uid = RegExp.$1;
		var postToken = inputPostTokens.snapshotItem(0).value; 
		var signature = inputSignatures.snapshotItem(0).value; 
		
	    
	    var frm = '<form style="/*margin:0px*/" method="post" action="/Scrapbook.aspx?uid='+uid+'" autocomplete="off">' + 
	  '<input name="POST_TOKEN" value="'+postToken+'" type="hidden"><input name="signature" value="'+signature+'" type="hidden">' +
	  '<table border="0" cellpadding="0" cellspacing="0">' +
	  '<tbody><tr>' +
		  '<td rowspan="2" >' +
			  '<textarea ' +
			  'style="width: 302px; BACKGROUND-COLOR: #d4dded; BORDER-RIGHT: #bfd0ea 1px solid; BORDER-TOP: #bfd0ea 1px solid; BORDER-LEFT: #bfd0ea 1px solid; BORDER-BOTTOM: #bfd0ea 1px solid;margin-bottom:0em;" '+
			  'id="scrapText" name="scrapText" cols="42" rows="3" onkeyup="counterUpdate(\'scrapText\', \'countBody\', 1024);"></textarea>' +
		  '</td>' +
	  '</tr>' +
	  '<tr>' +
		  '<td valign="bottom">' +
			  '<input name="Action.submit" alt="submit" title="submit" src="http://images3.orkut.com/img/en-US/nb_submit.gif" onmouseover="this.src=\'http://images3.orkut.com/img/en-US/ob_submit.gif\';" onmouseout="this.src=\'http://images3.orkut.com/img/en-US/nb_submit.gif\';" onload="var obtn_submit=new Image(); obtn_submit.src=\'http://images3.orkut.com/img/en-US/ob_submit.gif\';" border="0" type="image"><br>' +
		  '</td>' +
	  '</tr>' +
	  '</tbody></table>' +
	  '</form>';
	  i[j].innerHTML = i[j].innerHTML + "<br> <br>" +frm;
	    
    }
    }
})();
