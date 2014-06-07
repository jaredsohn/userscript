// ==UserScript==
// @name           Flickr embed markdown
// @description    Get embeddable markdown code for flickr photos
// @namespace      http://mattnguyen.wordpress.com/
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

function updateSharingTextArea() {
	var sizeSelect = document.getElementById('sharing_size');
	var selectedFormat=sizeSelect.options[sizeSelect.selectedIndex].value;
	var textAreaID = 'share-options-embed-textarea';
	if (selectedFormat == 'Square'){
	    textAreaID = textAreaID+'-sq-markdown';
	} else if (selectedFormat == 'Large Square') {
	    textAreaID = textAreaID+'-q-markdown';
	} else if (selectedFormat == 'Thumbnail') {
	    textAreaID = textAreaID+'-t-markdown';
	} else if (selectedFormat == 'Small') {
	    textAreaID = textAreaID+'-s-markdown';
	} else if (selectedFormat == 'Small 320') {
	    textAreaID = textAreaID+'-n-markdown';
	} else if (selectedFormat == 'Medium') {
	    textAreaID = textAreaID+'-m-markdown';
	} else if (selectedFormat == 'Medium 640') {
	    textAreaID = textAreaID+'-z-markdown';
	} else if (selectedFormat == 'Medium 800') {
	    textAreaID = textAreaID+'-c-markdown';
	} else if (selectedFormat == 'Large') {
	    textAreaID = textAreaID+'-l-markdown';
	} else if (selectedFormat == 'Original') {
	    textAreaID = textAreaID+'-o-markdown';
	}

    var textareas = document.getElementById('markdown-text-areas-holder').getElementsByTagName('textarea');
	for (i=0;i<textareas.length;i++){
	    var currentTextarea = textareas[i];
	    if (currentTextarea.getAttribute('id') == textAreaID){
		currentTextarea.setAttribute('style','display:block;border-width: 1px solid #d7d7d7;height: 72px;padding:4px;width: 350px;');
	    } else {
		currentTextarea.setAttribute('style','display:none;');
	    }
	}
}

sharingBlock = document.getElementById('share-options-embed');

if (sharingBlock != null) {
    // Change labels
    header = sharingBlock.getElementsByClassName('share-options-header')[0];
    header.innerHTML = '<span class="caret"></span> Grab the HTML/BBCode/Markdown';

    textareasParent = sharingBlock.getElementsByClassName('sharing_embed_cont')[0];
    inner = sharingBlock.getElementsByClassName('share-options-inner')[0];
    markdownText = document.createElement('p');
    markdownText.setAttribute('class','sharing_faded_text');
    markdownText.innerHTML='Markdown code:';
    inner.appendChild(markdownText);
    markdownTextareas=document.createElement('p');
    markdownTextareas.setAttribute('class','sharing_embed_cont');
    markdownTextareas.setAttribute('id','markdown-text-areas-holder');
    inner.appendChild(markdownTextareas);
    clearfix = document.createElement('div');
    inner.appendChild(clearfix);

    document.getElementById('sharing_size').addEventListener('change',updateSharingTextArea,false);

    var shortUrl=document.getElementById('gp-short-url').getAttribute('data-url-short');

    // Replace HTML code with Markdown
    var sizeFormats = ['', '-t', '-sq', '-q', '-s', '-n', '-m', '-z', '-c', '-l','-o'];
    var sizeFormatNames = ['', 'T', 'SQ', '-Q', 'S', 'N', 'M', 'Z','C', 'L','O'];
    
    for (i=0;i<sizeFormats.length;i++) {
	sizeFormat = sizeFormats[i];
	textarea = document.getElementById('share-options-embed-textarea' + sizeFormat);

	if (textarea != null) {
	    html = textarea.innerHTML;
	    
	    // HTML will be in the form "<a href="url" title="title"><img src="imgsrc" width="width" height="height" alt="alt"/></a>"
	    // Markdown is in the form [![alt](imgsrc)](href "title")

	    var regExp = new RegExp(".*href=\"(.*)\" title=\"(.*)\".*img src=\"(.*)\" width=\".*\" height=\".*\" alt=\"(.*)\".*a?");

	    // Use the ShortURL instead of the flickr link URL, to prevent services like Diaspora from generating an additional thumbnail	    
//	    var markdown = html.replace(regExp,'\[!\[$4\]\($3\)\]\($1 \"$2\"\)');
	    var markdown = html.replace(regExp,'\[!\[$4\]\($3\)\]\('+shortUrl+' \"$2\"\)');

	    // recreate hidden textarea corresponding to the markdown code.
	    // NOTE: Do not set class "embed-markup" or the flickr API will hide
	    // it automatically on change of the size dropdown...
	    markdownTextarea = document.createElement('textarea');
	    markdownTextarea.setAttribute('name','SharingEmbedMarkup'+sizeFormatNames[i]+'Markdown');
	    markdownTextarea.setAttribute('id','share-options-embed-textarea'+sizeFormat+'-markdown');
	    markdownTextarea.setAttribute('rows','4');
	    markdownTextarea.setAttribute('wrap','virtual');
//	    markdownTextarea.setAttribute('style','border-width: 1px solid #d7d7d7;height: 72px;padding:4px;width: 350px;'),
	    markdownTextarea.setAttribute('style','display:none;');
	    markdownTextarea.innerHTML = markdown;
	    markdownTextareas.appendChild(markdownTextarea);
	}
    }
    updateSharingTextArea();
}
