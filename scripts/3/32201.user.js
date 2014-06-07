// LessFail
// Friendlier Failure from the Mole of Production
// If there's an easier way to do this, EIP
// ==UserScript==
// @name		Less Fail
// @namespace	TotalFark
// @description	A gentler fail.
// @include		*.fark.com/*
// @include		*.totalfark.com/*
// ==/UserScript==


(function ()
{
	var img_src = 'data:image/gif;base64,' +
		'R0lGODlhNgALAMQAAKenxKWludjY5YWFx7y80sTE2GZmmufn87S0yWxsotnZ9IKCu3R0qJiYt3t7xJmZ' +
		'qnt7uuDg54qKrM7O4////1tbh3Z2unNzsa6u0ZeXx3t7sYWFmmFhje/v9Wxsrn19jCH5BAAAAAAALAAA' +
		'AAA2AAsAAAX/IEIUk2KeShQdbHt0cCzPbqsqQj6VJ5B4Fotj6LlYIEjkwgFZLAaDhabpVC4gUKhzOXRc' +
		'IJGMZzhQBCQNAGaNkVDe7wKAEEB0ECJEAB4AvDtzBIKCCACGAQ0RBWlsZgZAXQ4GBhQaCQlfAxcYHRlP' +
		'AwluDJeiGlmnFwUYHhkTmGRlZ4xsABsUiH10ATsHIgUBDxQPBA97ASODgwGIDQWLbGuOkJEccBgaC5sN' +
		'CxRRAxoalQMMbqan5w4JBBgXXVBmaGrQtg8PacsdcAIiAHsiDwgoiCCU7NADZwGgYZAmpMskCqOYJCjE' +
		'ocIeCaPKZYSIBACWLKkwGGgwwQgseA36XhiqxQcAwDcbPuQTFuxNPThx6uBB0KDegw0HJqRsBOCRkSAW' +
		'DFSowMGAhQscohpIwHSSAamTKlZNwCCJ16QGJkiAVAaDrx1o0eZYuzaCABVw47p9+3buWrT9EJA4EQIA' +
		'Ow==';

	var img, link;
	a = document.evaluate('//img[contains(@src, \'img1.fark.net\/images\/topics\/fail.gif\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var j=0; j<a.snapshotLength; j++)
	{
		link = a.snapshotItem(j);
		link.src= unescape(link.src.replace(/http:\/\/img1\.fark\.net\/images\/topics\/fail\.gif/gi, img_src));
	}
})();