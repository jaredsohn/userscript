// ==UserScript==
// @name           MLSE Links
// @namespace      http://link.mlxchange.com/
// @include        http://link.mlxchange.com/*
// @include        http://link.mlxchange.com/
// ==/UserScript==

var spans = document.getElementsByTagName('span');
for (k=0; k<spans.length; k++) {
	if (spans[k].style.border == "1px solid rgb(0, 0, 128)") {
		spans[k].style.height = "";
		spans[k].style.width = "500px";
		spans[k].style.left = "0px";
	}		
	else if (spans[k].style.top.substring(0, spans[k].style.top.length - 2) < 250) {
		var bump = eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) + 240;
		spans[k].style.left = bump + "px";
	}	
	else if (eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) == 536) {
		var bump = eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) + 350;
		spans[k].style.left = bump + "px";
	}	
	else if (eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) == 632) {
		var bump = eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) + 350;
		spans[k].style.left = bump + "px";
	}		
	else {
		var bump = eval(spans[k].style.left.substring(0, spans[k].style.left.length - 2)) + 500;
		spans[k].style.left = bump + "px";
	}

	//alert(spans[k].width);
/*	if (eval(spans[k].width.substring(0, spans[k].width - 2)) == 768) {
		spans[k].width = "300px";
	}*/
}

var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
	var regex = /JEE[A-Za-z0-9_].+/;
	var result = imgs[i].id.match(regex);
	if (result != null) {
		var imgsList = unsafeWindow[imgs[i].id.substring(0,imgs[i].id.length - 2) + '_List'];

				var thumbSpan = document.getElementById(imgs[i].id);
				if (thumbSpan) {

				thumbSpan.innerHTML = "";	// Remove existing thumbnails
				thumbSpan.height = 0;
				thumbSpan.width = 0;
				var splits = imgsList.split("|");

					for (j= splits.length - 1; j > -1; j--) {
							var span = document.createElement('span');
							span.innerHTML = '<img src="' + splits[j] + '"/>';
							thumbSpan.src = splits[j];
							thumbSpan.parentNode.insertBefore(span, thumbSpan.nextSibling);
					}
				}
	}
}


function StandardAbbreviations(address)
{
    address = address.replace(/\bAV\b/, "Ave");
    address = address.replace(/\bBL\b/, "Blvd");
    address = address.replace(/\bPR\b/, "Pvt");
    return (address);
}

function FullAddress(address, address1)
{
	address = address.replace(/&nbsp;/g, ' ');
	address = address.replace(/<br>/ig, ',');
	address = address.replace(/\n/g, ' ');
	address = address.replace(/\r/g, ' ');
	address = address.replace(/\s*,\s*$/,'');

	address1 = address1.replace(/&nbsp;/g, ' ');
	address1 = address1.replace(/<br>/ig, ',');
	address1 = address1.replace(/\n/g, ' ');
	address1 = address1.replace(/\r/g, ' ');
	address1 = address1.replace(/\s*,\s*$/,'');


	address = address + ", " + address1;

    return (address);
}

function AddressToGoogleLink(address, address1)
{
    fullAddress = FullAddress(StandardAbbreviations(address), StandardAbbreviations(address1));
    googleURL = 'http://maps.google.ca?q=' + escape(fullAddress);
    newHTML = '<a target="_blank" href="' + googleURL + '">' + address + '</a>';
    return newHTML;   
}

function SelectorLink(document) {
    if (document.title != "Email Report Action")
        return;
    addressSelector= document.getElementsByName( 'RecordIDList' )[0];
    addressIndex = addressSelector.selectedIndex;


    var address=addressSelector.options[addressSelector.selectedIndex].textContent;
    address = address.replace(/^[0-9]+ /,"");
    s = document.createElement("span");
    s.innerHTML = AddressToGoogleLink(address);
    document.firstChild.lastChild.insertBefore(s, document.firstChild.lastChild.firstChild);
}


function AgentMainFrameLink(document)
{

    var address1;
    var address;
<nobr>REALTORS(r) Association of Hamilton-Burlington</nobr>
    y = document.evaluate("//span/nobr[contains( ., 'Lease Rate:' )]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (y.snapshotLength > 0)
    {
       	address1 = y.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML;

    }

    x = document.evaluate("//span/nobr[contains( ., 'List Price:' )]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (x.snapshotLength > 0)
    {
        address = x.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML;
	x.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML = AddressToGoogleLink(address, address1);
    }

}

AgentMainFrameLink(document);

