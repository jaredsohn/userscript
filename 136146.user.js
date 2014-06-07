// ==UserScript==
// @name        Google Search Extended
// @namespace   http://userscripts.org/users/472402
// @description Search in Google for pages in a specific language and/or files of a specific type
// @include     http://*.google.*/search?*
// @include     https://*.google.*/search?*
// @version     2.9
// ==/UserScript==

(function() {
/* BEGIN CODE */
var langs = {
	'':'-'
	,'any language': '-'
	//,'Afrikaans': 'af'
	,'Arabic': 'ar'
	//,'Armenian': 'hy'
	//,'Belarusian': 'be'
	//,'Bulgarian': 'bg'
	//,'Catalan': 'ca'
	,'Chinese (Simplified)': 'zh-CN'
	,'Chinese (Traditional)': 'zh-TW'
	//,'Croatian': 'hr'
	//,'Czech': 'cs'
	//,'Danish': 'da'
	,'Dutch': 'nl'
	,'English': 'en'
	//,'Esperanto': 'eo'
	//,'Estonian': 'et'
	//,'Filipino': 'tl'
	,'Finnish': 'fi'
	,'French': 'fr'
	,'German': 'de'
	//,'Greek': 'el'
	//,'Hebrew': 'iw'
	//,'Hindi': 'hi'
	//,'Hungarian': 'hu'
	//,'Icelandic': 'is'
	//,'Indonesian': 'id'
	,'Italian': 'it'
	,'Japanese': 'ja'
	,'Korean': 'ko'
	//,'Latvian': 'lv'
	//,'Lithuanian': 'lt'
	//,'Norwegian': 'no'
	,'Persian': 'fa'
	,'Polish': 'pl'
	,'Portuguese': 'pt'
	//,'Romanian': 'ro'
	,'Russian': 'ru'
	//,'Serbian': 'sr'
	//,'Slovak': 'sk'
	//,'Slovenian': 'sl'
	,'Spanish': 'es'
	//,'Swahili': 'sw'
	//,'Swedish': 'sv'
	//,'Thai': 'th'
	,'Turkish': 'tr'
	//,'Ukrainian': 'uk'
	//,'Vietnamese': 'vi'
};

var filetypes = {
	'':'-'
	,'any format': '-'
	,'Adobe Acrobat PDF (.pdf)': 'pdf'
	,'Adobe Postscript (.ps)': 'ps'
	,'Autodesk DWF (.dwf)': 'dwf'
	,'Google Earth KML (.kml)': 'kml'
	,'Google Earth KMZ (.kmz)': 'kmz'
	,'Microsoft Excel (.xls)': 'xls'
	,'Microsoft PowerPoint (.ppt)': 'ppt'
	,'Microsoft Word (.doc)': 'doc'
	,'Rich Text Format (.rtf)': 'rtf'
	,'Shockwave Flash (.swf)': 'swf'
};

var holder = document.createElement('div')
	,cboLang = document.createElement('select')
	,cboFileType = document.createElement('select')
	,btnSearch = document.createElement('button')
	,searchBoxHolderID = 'gbqfw'
	,searchBoxID = 'gbqfq'
	,query = location.search;

/* Fill combo boxes */
for (var l in langs) {
		cboLang.innerHTML += '<option ' + 
			((query.indexOf('&lr=lang_' + langs[l]) !== -1) ? 'selected="selected"' : '') + 
			'value="' + langs[l] + '">' + l + '</option>';
}

for (var f in filetypes) {
	cboFileType.innerHTML += '<option ' + 
			((query.indexOf('&as_filetype=' + filetypes[f]) !== -1) ? 'selected="selected"' : '') + 
			'value="' + filetypes[f] + '">' + f + '</option>';
}

/* Add elements to the page */
holder.setAttribute('style','background-color:#f9edbe;border:1px solid #f0c36d;padding:1px 5px;');
holder.appendChild(document.createTextNode(' Language: '));
holder.appendChild(cboLang);
holder.appendChild(document.createTextNode(' File type: '));
holder.appendChild(cboFileType);
btnSearch.appendChild(document.createTextNode('Search'));
btnSearch.setAttribute('style','margin-left:5px;');
holder.appendChild(btnSearch);
document.getElementById(searchBoxHolderID).appendChild(holder);

/* Search with customized settings */
btnSearch.onclick = function () {
	var selectedLang = cboLang.options[cboLang.selectedIndex].value
		,searchTerm = document.getElementById(searchBoxID).value.replace(/ +filetype:[^ ]*/gi, '')
		,selectedFileType = cboFileType.options[cboFileType.selectedIndex].value
		,lang = (selectedLang == '-') ? '' : ('&lr=lang_' + selectedLang)
		,filetype = (selectedFileType == '-') ? '' : ('&as_filetype=' + selectedFileType)
		,url = location.protocol + '//' + location.host + '/search?q=' + encodeURIComponent(searchTerm) + lang + filetype;
	
	window.location.replace(url);
};
/* END CODE */
})();
