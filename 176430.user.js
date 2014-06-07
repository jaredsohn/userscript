// ==UserScript==
// @name       shanbay dictionary spider
// @author     Bob Yuan
// @namespace  http://www.sakuratya.org/scripts/shanbay-dict-spider
// @version    0.1
// @description  To auto export the user dictionary of shanbay to CSV format
// @include      http://www.shanbay.com/bdc/learnings/library/all
// @include      http://www.shanbay.com/bdc/learnings/library/all?page=*
// @run-at     document-end
// @copyright  MIT License
// ==/UserScript==
var wordsArray = [];
function createButton(buttonText, width) {
	var button = document.createElement('a');
	button.style.width = width;
	button.style.height = '34px';
	button.style.borderColor = '#a0a0a0';
	button.style.borderStyle = 'solid';
	button.style.borderWidth = '1px';
	button.style.borderRadius = '4px';
	button.style.display = 'block';
	button.style.backgroundColor = '#f0f0f0';
	button.style.cursor = 'pointer';
	button.style.textDecoration = 'none';
	button.style.boxShadow = '3px 3px 6px 0px #ccc';

	var innerText = document.createElement('span');
	innerText.innerHTML = buttonText;
	innerText.style.fontSize = '18px';
	innerText.style.position = 'relative';
	innerText.style.display = 'block';
	innerText.style.textAlign = 'center';
	innerText.style.marginTop = '-9px';
	innerText.style.top = '50%';
	button.appendChild(innerText);
	
	return button;
}

function startButtonListener() {
	wordsArray = [];
	if(window.location.search && window.location.search != '?page=1') {
		window.location.href = window.location.origin + window.location.pathname;
	} else {
		retrieveWords(1);
	}
	
}

function showButtonListener() {
	if(!document.getElementById('captured-words-panel')) {
		createPanel();
	}
}

function closeButtonListener() {
	var panel = document.getElementById('captured-words-panel');
	document.body.removeChild(panel);
}

function copyButtonListener() {	
	for(var i = 0; i < wordsArray.length; i++) {
		var word = wordsArray[i].trim();
		if(word.indexOf(',') != -1) {
			word = '"' + word + '"';
		}
		wordsArray[i] = word;
	}
	var csv = wordsArray.join('\r');
	GM_setClipboard(csv, {type: 'text', mimetype: 'text/plain'});
}

function createPanel() {
	var displayPanel = document.createElement('div');
	displayPanel.setAttribute('id', 'captured-words-panel');
	displayPanel.style.width = '400px';
	displayPanel.style.height = '500px';
	displayPanel.style.position = 'absolute';
	displayPanel.style.top = '50%';
	displayPanel.style.left = '50%';
	displayPanel.style.marginTop = '-250px';
	displayPanel.style.marginLeft = '-200px';
	displayPanel.style.borderColor = '#a0a0a0';
	displayPanel.style.borderStyle = 'solid';
	displayPanel.style.borderWidth = '1px';
	displayPanel.style.borderRadius = '4px';
	displayPanel.style.backgroundColor = '#f0f0f0';
	displayPanel.style.boxShadow = '5px 5px 10px 0 #ccc';

	var resultBox = document.createElement('div');
	resultBox.style.width = '370px';
	resultBox.style.height =  '400px';
	resultBox.style.margin = '15px';
	resultBox.style.borderColor = '#6e6e6e';
	resultBox.style.borderWidth = '1px';
	resultBox.style.borderStyle = 'solid';
	resultBox.style.backgroundColor = '#c0c0c0';
	resultBox.style.overflowY = 'scroll';

	displayPanel.appendChild(resultBox);

	var content = '';
	/* build human readable content */
	for(var i = 0; i < wordsArray.length; i++) {
		content += wordsArray[i] + '<br/>';
	}
	resultBox.innerHTML = content;

	var copyToClipboardButton = createButton('复制到剪贴板', '200px');
	copyToClipboardButton.style.marginLeft = '25px';
	copyToClipboardButton.style.marginRight = '20px';
	copyToClipboardButton.style.float = 'left';

	displayPanel.appendChild(copyToClipboardButton);

	copyToClipboardButton.addEventListener('click', copyButtonListener, false);

	var closeButton = createButton('关闭', '100px');
	closeButton.style.marginLeft = '15px';
	closeButton.style.float = 'left';

	displayPanel.appendChild(closeButton);

	closeButton.addEventListener('click', closeButtonListener, false);

	document.body.appendChild(displayPanel);
}

function retrieveWords(currentPage) {
	var libraryElement = document.getElementById('learnings-library');
	var wordsElements = libraryElement.getElementsByClassName('learning');
	var anchorElemens = libraryElement.getElementsByClassName('endless_page_link');
	var lastPageAnchor = anchorElemens[anchorElemens.length - 2];
	var totalPage = parseInt(lastPageAnchor.innerHTML, 10);
	console.log(totalPage);
	for(var i = 0; i < wordsElements.length; i++) {
		var wordElement = wordsElements[i].getElementsByClassName('word')[0];
		wordsArray.push(wordElement.textContent);
	}
	GM_setValue('words_array', wordsArray);
	if(currentPage >= totalPage) {
		var startButton = createButton('开始', '100px');
		startButton.style.position = 'absolute';
		startButton.style.right = '50px';
		startButton.style.bottom = '50px';
		document.body.appendChild(startButton);

		startButton.addEventListener('click', startButtonListener, false);

		if(wordsArray && wordsArray.length > 0) {
			var showPanelButton = createButton('显示单词', '100px');
			showPanelButton.style.position = 'absolute';
			showPanelButton.style.right = '50px';
			showPanelButton.style.bottom = '95px';
			document.body.appendChild(showPanelButton);

			showPanelButton.addEventListener('click', showButtonListener, false);
		}
		createPanel();
	} else {
		var root = window.location.origin;
		var path = window.location.pathname;
		currentPage++;
		window.location.href = root + path + '?page=' + currentPage + '#capture';
	}
}

function main() {
	wordsArray = GM_getValue('words_array');
	var queryString = window.location.search;
	var hash = window.location.hash;
	if(!hash && !queryString) {
		var startButton = createButton('开始', '100px');
		startButton.style.position = 'absolute';
		startButton.style.right = '50px';
		startButton.style.bottom = '50px';
		document.body.appendChild(startButton);

		startButton.addEventListener('click', startButtonListener, false);

		if(wordsArray && wordsArray.length > 0) {
			var showPanelButton = createButton('显示单词', '100px');
			showPanelButton.style.position = 'absolute';
			showPanelButton.style.right = '50px';
			showPanelButton.style.bottom = '95px';
			document.body.appendChild(showPanelButton);

			showPanelButton.addEventListener('click', showButtonListener, false);
		}
	} else if(hash && hash === '#capture') {
		var currentPage = 1;
		if(queryString && queryString.match(/\d+/)) {
			currentPage = parseInt(queryString.match(/\d+/), 10);
		}
		retrieveWords(currentPage);
		
	}

}
main();