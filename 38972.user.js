// ==UserScript==
// @name          [Android] Scan barcode into LibraryThing.com
// @description   Add button to LibraryThing.com search box to scan barcode with an Android device
// @author        Dan Guy, based almost entirely on work by Jeffrey Sharkey
// @include       http://*librarything.com/addbooks*
// ==/UserScript==

function generate(item) {
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'Scan barcode...';
	helper.addEventListener('click', function(event) {
		// use the intentHelper bridge to fire an intent to Barcode Scanner
		// it's available in Market, or from http://code.google.com/p/zxing/
		var result = window.intentHelper.startActivityForResult(JSON.stringify({
			action:'com.google.zxing.client.android.SCAN',
			category:['CATEGORY_DEFAULT']
		}));

		// parse the result we get back, and read the barcode from the extras
		result = JSON.parse(result);
		item.value = result['extras']['SCAN_RESULT'];
	}, false);
	return helper;
}

// find the 'query' form field
var items = document.body.getElementsByTagName('input');
for(i in items) {
	var item = items[i];
	if(item.name == 'form_find') {
		// build our 'scan barcode' helper button
		// then insert it after the query form field
		var helper = generate(item);
		item.parentNode.insertBefore(helper, item.nextSibling);
	}
}