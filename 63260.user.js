// ==UserScript==
// @name           GM_download test
// @namespace     GM_download
// @require       http://gmdownload.googlecode.com/files/gmdownload2.js
// @description    GM_download test
// @include        *
// ==/UserScript==

var files = {
			txtOutput:null,	//if set to true, a text file will be saved to the desktop with all the files data (e.g. filename, file url, etc.);
			fileArray:[
				{
					fName:"Logo_25wht.gif",
					fURL:"http://www.google.com/logos/Logo_25wht.gif",
					//fRefferer:null,
					//MD5:null
					//fileMeta:''	//maybe for image files - http://en.wikipedia.org/wiki/IPTC#Image_metadata  http://en.wikipedia.org/wiki/Exchangeable_image_file_format			
				},
				{
					fName:"bg.jpg",
					fURL:"http://start.ubuntu.com/9.04/images/bg.jpg",
					//fRefferer:null,
					//MD5:null
					//fileMeta:''	//maybe for image files - http://en.wikipedia.org/wiki/IPTC#Image_metadata  http://en.wikipedia.org/wiki/Exchangeable_image_file_format			
				}
			]
};
	
GM_download(files);