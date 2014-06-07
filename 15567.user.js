// ==UserScript==
// @name           IKViews
// @namespace      http://www.taka.nl/greasemonkey
// @description    displays the views of individual images in an imagekind gallery
// @include        http://*imagekind.com/member/gallery.aspx?*
// ==/UserScript==

var aGalleryImages = [];
var oGalleryResultTable;

function main() {
	var aGalleryLink = document.getElementById('ctl00_mainContent_linkGallery');
	var oButton = document.createElement('input');
	oButton.setAttribute('type','button');
	oButton.setAttribute('id','viewcountbutton');
	oButton.value = 'Click to see views on all images';
	oButton.style.zIndex = 5;
	aGalleryLink.parentNode.appendChild(oButton);
	oButton.addEventListener('click', CountViews, false);
}


function HideDiv() {
	document.getElementById('countviewsdiv').style.display = 'none';
}

function CountViews() {
	var oImageDiv, sImageId, oImage, oNewRow, i, sPhotoUrl, sPhotohtml, oPhotoXML;
	var iViewsCountSpan, iSalesCountSpan;

	document.getElementById('viewcountbutton').style.display = 'none';
	
	var oDiv = document.createElement('div');
	oDiv.style.position = 'absolute';
	oDiv.style.backgroundColor = 'white';
	oDiv.style.left = '50px';
	oDiv.style.top = '50px';
	oDiv.setAttribute('id','countviewsdiv');

	//oDiv.style.width = '400px';

	var oGalleryResultTable = document.createElement('table');
	oGalleryResultTable.border='1';

	oDiv.style.zIndex = 200;

	var oHideRow = document.createElement('tr');
	var oHideCell = document.createElement('td');
	oHideCell.colspan = 2;
	oHideCell.setAttribute('align','right');

	var oHideButton = document.createElement('input');
	oHideButton.setAttribute('type','button');
	oHideButton.value = 'Hide';
	oHideButton.addEventListener('click', HideDiv, false);
	oHideCell.appendChild(oHideButton);

	oHideRow.appendChild(oHideCell);
	oGalleryResultTable.appendChild(oHideRow);

	var oUpperRow = document.createElement('tr');
	var oTableCell = document.createElement('th');

	var oImageHeader = oUpperRow.appendChild(oTableCell.cloneNode(false));
	var oImageHeaderText = document.createTextNode('image');
	oImageHeader.appendChild(oImageHeaderText);

	var oViewsHeader = oUpperRow.appendChild(oTableCell.cloneNode(false));
	var oViewsHeaderText = document.createTextNode('views');
	oViewsHeader.appendChild(oViewsHeaderText);
	
	oUpperRow.appendChild(oImageHeader);
	oUpperRow.appendChild(oViewsHeader);
	oGalleryResultTable.appendChild(oUpperRow);

	oDiv.appendChild(oGalleryResultTable);
	document.body.insertBefore(oDiv,null);

	var oViewRow = document.createElement('tr');
	var oImageCell = document.createElement('td');
	var oViewCell = document.createElement('td');

	oViewRow.appendChild(oImageCell);
	oViewRow.appendChild(oViewCell);
	oViewCell.style.whiteSpace='nowrap';


	var oGallyDiv = document.getElementById('gallerysImages');	
	if(oGallyDiv) {
		var oImageDivs = oGallyDiv.childNodes;
		//alert(oImageDivs.length);
		for(i=0;i<oImageDivs.length;i++) {
			oImageDiv = oImageDivs.item(i);
			if(oImageDiv.tagName=='DIV') {
				sImageId = oImageDiv.id;
				oImages = oImageDiv.getElementsByTagName('img');
				oImage = oImages.item(oImages.length - 1);
				if(oImage) {
					oNewRow = oViewRow.cloneNode(true);
					oNewRow.id = 'imageresult_'+ sImageId;
					oNewRow.firstChild.appendChild(oImage.cloneNode(true));
					GetViewsSales(sImageId, oNewRow);
					oGalleryResultTable.appendChild(oNewRow);
				}
			}
		}
	}
};



function GetViewsSales(sImageId, oRow) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://uploads.imagekind.com/member/image.aspx?IMID='+sImageId,
		onload: function(responseDetails) {
			var sStatus = responseDetails.status.toString();
			//alert(sStatus);
			if(sStatus=='200') {
				var oImageRow = document.getElementById('imageresult_'+ sImageId);
				if(oImageRow) {

					var sResponseText = responseDetails.responseText;
					var sSpanId = 'ctl00_mainContent_lblTimesViewed'
					var iSpanStart = sResponseText.indexOf(sSpanId);
					var iSpanEnd = sResponseText.indexOf('</span>',iSpanStart);
					var sViewText = 'viewed: ' + sResponseText.substring(iSpanStart + sSpanId.length + 2, iSpanEnd);
					oImageRow.lastChild.appendChild(document.createTextNode(sViewText));
					oImageRow.lastChild.appendChild(document.createElement('br'));

					sSpanId = 'ctl00_mainContent_lblTimesSold'
					iSpanStart = sResponseText.indexOf(sSpanId);
					iSpanEnd = sResponseText.indexOf('</span>',iSpanStart);
					sViewText = 'sold: ' + sResponseText.substring(iSpanStart + sSpanId.length + 2, iSpanEnd);
					oImageRow.lastChild.appendChild(document.createTextNode(sViewText));

					//oImageRow.lastChild.appendChild(document.createElement('br'));
					//sSpanId = 'ctl00_mainContent_lblNoComments'
					//iSpanStart = sResponseText.indexOf(sSpanId);
					//iSpanEnd = sResponseText.indexOf('</span>',iSpanStart);
					//sViewText = 'comments: ' + sResponseText.substring(iSpanStart + sSpanId.length + 2, iSpanEnd);
					//oImageRow.lastChild.appendChild(document.createTextNode(sViewText));

				}
			}
			
		}
	});
}



//main();
window.onload = main();

