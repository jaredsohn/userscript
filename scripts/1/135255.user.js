// ==UserScript==
// @name         What.CD Imgur Image uploader
// @namespace    http://what.cd/
// @include      http://what.cd/*
// @include      https://ssl.what.cd/*
// @author       BloodPhilia
// @description  Upload images to Imgur on-the-go
// @version      1.1.3
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
	var $j = jQuery.noConflict();
	var href = jQuery(location).attr('href');
	var apiKey = "ad4dfd0add73d63ec7319876a9beb4c0";
	var bttnText = "Upload to imgur";
	if (href.indexOf("forums.php") >= 0){
		$j('<input value="' + bttnText + '" type="button" id="wcdimguruploadfacade" tabindex="1"><img id="wcdimguruploadldr" style="display: none; position: relative; top: 6px;" src="http://i.imgur.com/CjAuV.gif" alt="Uploading..." /><input style="visibility: collapse; width: 0px;" id="wcdimgurupload" type="file" />').insertBefore('input#submit_button');
		$j('input#wcdimguruploadfacade').click(function(){
			$j('input#wcdimgurupload').click();
		});
		$j('input#wcdimgurupload').change(function() {
		   $j("img#wcdimguruploadldr").fadeIn();
		   var file = this.files[0];
		   if (!file || !file.type.match(/image.*/)) return;
		   var fd = new FormData();
		   fd.append("image", file);
		   fd.append("key", apiKey);
		   var xhr = new XMLHttpRequest();
		   xhr.open("POST", "http://api.imgur.com/2/upload.json");
		   xhr.onload = function() {
			  $j("textarea#quickpost").val($j("textarea#quickpost").val()+"[img="+JSON.parse(xhr.responseText).upload.links.original+"]");
			  $j("textarea#posttext").val($j("textarea#posttext").val()+"[img="+JSON.parse(xhr.responseText).upload.links.original+"]");
			  $j("img#wcdimguruploadldr").fadeOut();
		   }
		   xhr.send(fd);
		});
	}
	else if (href.indexOf("upload.php") >= 0){
		$j('<input value="' + bttnText + '" type="button" id="wcdimguruploadfacade" tabindex="1"><img id="wcdimguruploadldr" style="display: none; position: relative; top: 6px;" src="http://i.imgur.com/CjAuV.gif" alt="Uploading..." /><input style="visibility: collapse; width: 0px;" id="wcdimgurupload" type="file" />').insertAfter('input#image');
		$j('input#wcdimguruploadfacade').click(function(){
			$j('input#wcdimgurupload').click();
		});
		$j('input#wcdimgurupload').change(function() {
		   $j("img#wcdimguruploadldr").fadeIn();
		   var file = this.files[0];
		   if (!file || !file.type.match(/image.*/)) return;
		   var fd = new FormData();
		   fd.append("image", file);
		   fd.append("key", apiKey);
		   var xhr = new XMLHttpRequest();
		   xhr.open("POST", "http://api.imgur.com/2/upload.json");
		   xhr.onload = function() {
			  $j('input#image').val(JSON.parse(xhr.responseText).upload.links.original);
			  alert("Uploaded picture has a size of " + JSON.parse(xhr.responseText).upload.image.width + "x" + JSON.parse(xhr.responseText).upload.image.height + "px and has a file size of " + JSON.parse(xhr.responseText).upload.image.size/1000 + "KB. High-quality images are much appreciated but use your common sense when it comes to file sizes.");
			  $j("img#wcdimguruploadldr").fadeOut();
		   }
		   xhr.send(fd);
		});
	}
	else if (href.indexOf("requests.php?action=new") >= 0 || href.indexOf("requests.php?action=edit") >= 0 || href.indexOf("torrents.php?action=editgroup") >= 0 || href.indexOf("artist.php?action=edit") >= 0){
		$j('<input value="' + bttnText + '" type="button" id="wcdimguruploadfacade" tabindex="1"><img id="wcdimguruploadldr" style="display: none; position: relative; top: 6px;" src="http://i.imgur.com/CjAuV.gif" alt="Uploading..." /><input style="visibility: collapse; width: 0px;" id="wcdimgurupload" type="file" />').insertAfter('input[name="image"]');
		$j('input#wcdimguruploadfacade').click(function(){
			$j('input#wcdimgurupload').click();
		});
		$j('input#wcdimgurupload').change(function() {
		   $j("img#wcdimguruploadldr").fadeIn();
		   var file = this.files[0];
		   if (!file || !file.type.match(/image.*/)) return;
		   var fd = new FormData();
		   fd.append("image", file);
		   fd.append("key", apiKey);
		   var xhr = new XMLHttpRequest();
		   xhr.open("POST", "http://api.imgur.com/2/upload.json");
		   xhr.onload = function() {
			  $j('input[name="image"]').val(JSON.parse(xhr.responseText).upload.links.original);
			  alert("Uploaded picture has a size of " + JSON.parse(xhr.responseText).upload.image.width + "x" + JSON.parse(xhr.responseText).upload.image.height + "px and has a file size of " + JSON.parse(xhr.responseText).upload.image.size/1000 + "KB. High-quality images are much appreciated but use your common sense when it comes to file sizes.");
			  $j("img#wcdimguruploadldr").fadeOut();
		   }
		   xhr.send(fd);
		});
	}
}

addJQuery(main);