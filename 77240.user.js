// ==UserScript==
// @name vkEasyMusic
// @namespace http://userscripts.org/users/m4rt1n
// @description Позволяет загружать музыку на vkontakte.ru или vk.com перетаскиванием файлов в окно браузера. 
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// @include http://vk.com/*
// @include http://*.vk.com/*
// ==/UserScript==

(function(){

	var DOM_SIDEBAR = document.getElementById('side_bar') || document.getElementById('sideBar'),
	IS_NEW_LAYOUT = (document.getElementById('utils') !== null),
	
	METHOD_GET = 'GET', 
	METHOD_POST = 'POST',
	
	ENCTYPE_URLENCODED = 'application/x-www-form-urlencoded', 
	ENCTYPE_MULTIPART = 'multipart/form-data';
	
	// ************************** cXhr BEGIN ************************** 
	
	/**
	 * Обертка для GM_xmlhttpRequest с возможностью отправки файлов.
	 * @constructor
	 * @property {String} method METHOD_GET || METHOD_POST
	 * @property {Object} headers заголовки
	 * @property {String} url адрес для запроса
	 * @property {String} enctype ENCTYPE_URLENCODED || ENCTYPE_MULTIPART
	 * @property {Object} data поля формы, значения типа Object обрабатываются как File, вложенные массивы не поддерживаются
	 * @property {Object} custom произвольные данные, передаваемые в функцию обратного вызова
	 * @property {Function} onDone функция обратного вызова, вызывается при завершении запроса
	 * @param {Object} params может содержать любые свойства из перечисленных выше
	 */
	function cXhr(params){
		var self = this, prepared = false, crlf = "\r\n";
		// Назначаем свойствам значения.
		self.method = params.method || METHOD_GET;
		self.headers = params.headers || {};
		self.url = params.url || null;
		self.enctype = params.enctype || ENCTYPE_URLENCODED;
		self.data = params.data || null;
		self.custom = params.custom || null;
		self.onDone = params.onDone || null;
		/**
		 * Подготовить данные перед кодированием.
		 */
		self.prepareData = function(){
			var i, files = {}, total = 0, read = 0, reader;
			// Подготавливать данные нужно только если они будут кодироваться ENCTYPE_MULTIPART.
			if (self.enctype !== ENCTYPE_MULTIPART) {
				return;
			}
			// Ищем в массиве данных файлы и подсчитываем их количество.
			for (i in self.data) {
				// FIXME: плохая проверка типа, подходит только для данного проекта.
				if (typeof self.data[i] === 'object') {
					files[i] = self.data[i];
					total++;
				}
			}
			// Асинхронно считываем содержимое найденных файлов.
			for (i in files) {
				reader = new FileReader(files[i]);
				// Используем вложенную функцию, чтобы сохранить значение i.
				reader.onloadend = function(index){
					return function(){
						// Когда файл прочитан, заменяем его объект в массиве данных на массив свойств.
						self.data[index] = {
							'name': self.data[index].name,
							'contents': this.result
						};
						read++;
						if (read === total) {
							prepared = true;
							self.process();
						}
					};
				}(i);
				reader.readAsBinaryString(files[i]);
			}
		};
		/**
		 * Кодировать данные.
		 */
		self.encodeData = function(){
			var i, encoded = '', boundary = '-------------------xhr' + parseInt(Math.random() * 1000000);
			switch (self.enctype) {
				// Кодирование ENCTYPE_URLENCODED
				case ENCTYPE_URLENCODED:
					for (i in self.data) {
						if (encoded) {
							encoded += '&';
						}
						encoded += encodeURIComponent(i) + '=' + encodeURIComponent(self.data[i]);
					}
					self.headers['Content-Type'] = ENCTYPE_URLENCODED;
					break;
				// Кодирование ENCTYPE_MULTIPART
				case ENCTYPE_MULTIPART:
					for (i in self.data) {
						// Каждую часть тела запроса предваряем boundary.
						encoded += '--' + boundary + crlf;
						// FIXME: плохая проверка типа.
						if (typeof self.data[i] === 'object') {
							// Добавляем к телу файл и сопутствующую инфромацию о нем.
							encoded += 'Content-Disposition: form-data; name=\'' + i + '\'; filename=\'' + encodeURIComponent(self.data[i].name) + '\'' + crlf;
							encoded += 'Content-Type: application/octet-stream' + crlf + crlf;
							encoded += self.data[i].contents;
						}
						else {
							// Добавляем к телу поле формы.
							encoded += 'Content-Disposition: form-data; name=\'' + i + '\'' + crlf + crlf;
							encoded += self.data[i];
						}
						encoded += crlf;
					}
					// Закрываем тело запроса.
					encoded += '--' + boundary + '--';
					self.headers['Content-Type'] = ENCTYPE_MULTIPART + ', boundary=' + boundary;
					self.headers['Content-Length'] = encoded.length;
					break;
			}
			// Замещаем массив данных закодированной строкой.
			self.data = encoded;
		};
		/**
		 * Выполнить запрос.
		 */
		self.process = function(){
			if (self.data !== null && typeof self.data === 'object') {
				if (!prepared) {
					self.prepareData();
					return;
				}
				self.encodeData();
			}
			// Отправляем запрос.
			(new GM_xmlhttpRequest({
				method: self.method,
				url: self.url,
				headers: self.headers,
				data: self.data,
				binary: true,
				onload: self.onDone
			}));
		};
	}
	
	// ************************** cXhr END ************************** 
	
	// ************************** cFileUploader BEGIN ************************** 
	
	/**
	 * Загрузчик файлов.
	 * @constructor
	 * @param {cController} controller контроллер очереди
	 * @param {Number} index индекс файла (может изменяться)
	 * @param {File} file файл
	 */
	function cFileUploader(controller, index, file){
		var self = this, startTime = null,  // Выполняется ли отправка файла
		isUploading = false,  // Контейнер
		domFile = document.createElement('div'),  // Имя и размер файла
		domName = document.createElement('span'),  // Статус отправки файла
		domStatus = document.createElement('span');
		/**
		 * Получить dom-контейнер файла.
		 * @return {HTMLDivElement}
		 */
		self.getDom = function(){
			return domFile;
		};
		/**
		 * Получить объект файла.
		 * @return {File}
		 */
		self.getFile = function(){
			return file;
		};
		/**
		 * Изменить статус файла.
		 * @param {Object} status
		 */
		self.setStatus = function(status){
			domStatus.innerHTML = status;
		};
		/**
		 * Первая стадия отправки файла.
		 * Отправить запрос для получения данных для отправки.
		 */
		self.uplStage1 = function(){
			self.setStatus('подготовка');
			new cXhr({
				method: METHOD_GET,
				url: 'http://vkontakte.ru/audio.php?act=new',
				onDone: self.uplStage2
			}).process();
		};
		/**
		 * Вторая стадия отправки файла.
		 * Получить адрес сервера и данные формы для отправки.
		 * @param {Object} e
		 */
		self.uplStage2 = function(e){
			var url = '', data = {
				file: file
			};
			// Достаем из кода страницы адрес сервера для загрузки музыки.
			e.responseText.replace(/action="(.*?)" enctype="multipart/, function(str, action){
				url = action;
			});
			// Достаем из кода страницы поля формы.
			e.responseText.replace(/name="(act|aid|gid|mid|vk|hash|rhash)" value="(.*?)"/g, function(str, key, value){
				data[key] = value;
			});
			// Меняем статус файла и отправляем файл на сервер.
			self.setStatus('<b>отправляется...</b>');
			(new cXhr({
				method: METHOD_POST,
				url: url,
				enctype: ENCTYPE_MULTIPART,
				data: data,
				onDone: self.uplStage3
			})).process();
		};
		/**
		 * Третья стадия отправки файла.
		 * Определить результат отправки и перейти к следующему файлу.
		 * @param {Object} e
		 */
		self.uplStage3 = function(e){
			var result = !/blank\.php/.test(e.finalUrl);
			self.setStatus(result ? 'загружено за ' + controller.getTime((new Date()).getTime() - startTime) : 'ошибка');
			domFile.className = 'vkem-file';
			controller.processQueue(result);
		};
		/**
		 * Отправить файл.
		 */
		self.process = function(){
			startTime = (new Date()).getTime();
			isUploading = true;
			domStatus.className = 'vkem-status';
			domFile.className = 'vkem-file vkem-file-current';
			self.uplStage1();
		};
		/**
		 * Изменить значение индекса, вызывается при удалении вышестоящих файлов.
		 * @param {Number} newIndex
		 */
		self.setIndex = function(newIndex){
			index = newIndex;
		};
		/**
		 * Обработчик события click на статусе.
		 * @param {Object} e
		 */
		self.hStatusClick = function(e){
			// Если файл уже отправляется, игнорируем клик.
			if (isUploading) {
				return;
			}
			controller.removeFile(index);
		};
		
		domName.innerHTML = '<span class="vkem-title">' + file.name + '</span> <span class="vkem-time">(' + controller.getFileSize(file.size) + ')</span>';
		with (domStatus) {
			className = 'vkem-status vkem-btn';
			innerHTML = 'удалить';
			addEventListener('click', self.hStatusClick, true);
		}
		with (domFile) {
			className = 'vkem-file';
			appendChild(domName);
			appendChild(domStatus);
		}
	}
	
	// ************************** cFileUploader END ************************** 
	
	// ************************** cController BEGIN ************************** 
	
	/**
	 * Контроллер очереди.
	 */
	function cController(){
		var self = this,
		// Массив файлов для отправки
		files = [],
		// Индекс последнего выбранного файла
		lastIndex = -1,
		// Общий размер всех файлов
		size = 0,
		// Флаг, показывающий, отправляется ли сейчас файл
		nowUploading = false,
		// Количество отправленных файлов
		uploaded = 0,
		// Количество неудачных отправок
		failed = 0,
		// Скрыто ли окно
		isHidden = false,
		// Находится ли окно в первончальном состоянии 
		isFlushed = false,
		// Всплывающее окно
		wnd = new unsafeWindow.MessageBox({
			title: 'vkEasyMusic',
			width: '600px',
			progress: 'vkem-progress',
			selfDestruct: false
		}),
		// Оконные элементы
		domWndInfo = document.createElement('div'),
		domWndFiles = document.createElement('div'),  
		// Кнопки окна
		btnClose = null, 
		btnCancel = null, 
		btnHide = null, 
		domWnd = null,
		// Элементы напоминалки
		domTipProgress = document.createElement('span'),
		domTipText = document.createElement('span'), 
		domTipSep = document.createElement('div'), 
		domTipLink = document.createElement('a'), 
		domTip = document.createElement('li');
		/**
		 * Обновить содержимое окна.
		 */
		self.updateWnd = function(){
			// Обновляем текст в окне и напоминалке.
			domWndInfo.innerHTML = '<b>' + uploaded + '</b> из <b>' + files.length + '</b> файлов загружено, <b>' + failed + '</b> файлов загрузить не удалось, общий размер: <b>' + self.getFileSize(size) + '</b>.';
			domTipText.innerHTML = '<b>' + parseInt(((uploaded + failed) / files.length) * 100) + '%</b> (<b>' + uploaded + '</b> из <b>' + files.length + '</b>)';
			// Меняем высоту окна.
			wnd.setOptions({});
			// Обновляем окно, если все файлы загружены.
			if (self.isAllUploaded()) {
				isFlushed = false;
				// Скрываем прогрессбары.
				domTipProgress.style.display = 'none';
				document.getElementById('vkem-progress').style.display = 'none';
				// Показываем кнопку "Закрыть".
				btnClose.style.display = 'block';
			}
			else {
				// Обновляем окно, если оно не было обновлено ранее.
				if (!isFlushed) {
					isFlushed = true;
					// Показываем напоминалку.
					domTip.style.display = 'block';
					// Показываем прогрессбары.
					domTipProgress.style.display = 'block';
					document.getElementById('vkem-progress').style.display = 'block';
					// Скрываем кнопку "Закрыть".
					btnClose.style.display = 'none';
					// Показываем окно, если оно не было скрыто ранее.
					if (!isHidden) {
						wnd.show();
					}
				}
			}
			// Если файлов для отправки не осталось, скрываем кнопку "Отмена".
			btnCancel.style.display = (((files.length - lastIndex) > 1)  ? 'block' : 'none');
		};
		/**
		 * Добавить файл в очередь.
		 * @param {Object} file
		 */
		self.insertFile = function(file){
			// Добавляем в очередь только mp3 размером менее 20мб.
			if (file.type !== 'audio/mpeg' || file.size >= 20 * 1024 * 1024) {
				return;
			}
			size += file.size;
			file = new cFileUploader(self, files.length, file);
			files.push(file);
			domWndFiles.appendChild(file.getDom());
			self.updateWnd();
		};
		/**
		 * Удалить файл из очереди.
		 * @param {Number} index
		 */
		self.removeFile = function(index){
			var i;
			// Нельзя удалить отправленный или отправляемый файл.  
			if (lastIndex >= index) {
				return;
			}
			// Изменяем общий размер файлов.
			size -= files[index].getFile().size;
			// Удаляем dom-контейнер файла.
			domWndFiles.removeChild(files[index].getDom());
			// Удаляем файл из массива и обновляем индексы всех последующих файлов.
			files.splice(index, 1);
			for (i = index; i < files.length; i++) {
				files[i].setIndex(i);
			}
			// Обновляем окно.
			self.updateWnd();
		};
		/**
		 * Загрузить следующий в очереди файл.
		 * Метод может быть вызван из cFileUploader и из самого контроллера.
		 * В первом случае в result передается результат отправки файла, во втором - null.
		 * @param {Bool|null} result
		 */
		self.processQueue = function(result){
			if (nowUploading && result === null) {
				return;
			}
			if (result !== null) {
				nowUploading = false;
				if (result) {
					uploaded++;
				}
				else {
					failed++;
				}
				self.updateWnd();
			}
			// Если есть неотправленные файлы, выбираем следующий в очереди файл.
			if (lastIndex < (files.length - 1)) {
				nowUploading = true;
				lastIndex++;
				files[lastIndex].process();
			}
		};
		/**
		 * Очистить очередь.
		 */
		self.clearQueue = function(){
			files = [];
			lastIndex = -1;
			size = 0;
			nowUploading = false;
			uploaded = 0;
			failed = 0;
			domWndFiles.innerHTML = '';
			self.updateWnd();
		};
		/**
		 * Проверить, все ли файлы отправлены.
		 * @return {Bool}
		 */
		self.isAllUploaded = function(){
			return ((uploaded + failed) === files.length);
		};
		/**
		 * Преобразовать размер файла в строку.
		 * @param {Number} size
		 * @return {String}
		 */
		self.getFileSize = function(size){
			var units = 'байт';
			if (size > 1024 * 1024) {
				size = size / (1024 * 1024);
				units = 'Мб';
			}
			else 
				if (size > 1024) {
					size = size / 1024;
					units = 'кб';
				}
			return size.toFixed(1) + ' ' + units;
		};
		/**
		 * Преобразовать миллисекунды в строку вида m:ss.
		 * @param {Number} time
		 * @return {String}
		 */
		self.getTime = function(time){
			time = parseInt(time / 1000);
			var minutes = parseInt(time / 60), seconds = time - (minutes * 60);
			// FIXME: некрасиво как-то :(
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			return minutes + ':' + seconds;
		};
		/**
		 * Обработчик события click на кнопке "Скрыть".
		 * @param {Object} e
		 */
		self.hHideClick = function(e){
			isHidden = true;
			wnd.hide();
		};
		/**
		 * Обработчик события click на кнопке "Закрыть".
		 * @param {Object} e
		 */
		self.hCloseClick = function(e){
			domTip.style.display = 'none';
			wnd.hide();
			self.clearQueue();
		};
		/**
		 * Обработчик события click на кнопке "Отмена".
		 * @param {Object} e
		 */
		self.hCancelClick = function(e){
			var i;
			for (i = lastIndex + 1; i < files.length; i++) {
				self.removeFile(i);
				i--;
			}
		};
		/**
		 * Обработчик события click на напоминалке.
		 * @param {Object} e
		 */
		self.hTipClick = function(e){
			e.preventDefault();
			isHidden = false;
			wnd.show();
		};
		/**
		 * Обработчик события dragover.
		 * @param {Object} e
		 */
		self.hDragOver = function(e){
			e.preventDefault();
		};
		/**
		 * Обработчик события drop.
		 * @param {Object} e
		 */
		self.hDrop = function(e){
			try {
				var i;
				e.preventDefault();
				for (i = 0; i < e.dataTransfer.files.length; i++) {
					self.insertFile(e.dataTransfer.files[i]);
				}
				// Запускаем очередь.
				self.processQueue(null);
			}
			catch (e) {
				alert('hDrop(): ' + e);
			}
		};
		/**
		 * Обработчик события beforeunload.
		 * @param {Object} e
		 */
		self.hBeforeUnload = function(e){
			if (self.isAllUploaded()) {
				return;
			}
			// Значение из returnValue будет выводится в тексте предупреждения о закрытии окна.
			e.returnValue = 'Еще не отправлено ' + (files.length - (uploaded + failed)) + ' файлов.';
		};
		
		try {
			// FIXME: не самый лучший способ получить dom-объект кнопки.
			wnd.addButtonDom = function(title, callback, type){
				var btn, btnId;
				if (!IS_NEW_LAYOUT) {
					btn = wnd.addButton({
						label: title,
						onClick: callback,
						style: 'button_' + type,
						returnBtn: true
					});
				}
				else {
					btnId = 'vkem_btn_' + Math.random();
					wnd.addButton(title, callback, type + '" id="' + btnId);
					btn = document.getElementById(btnId).parentNode;
				}
				
				return btn;
			};
			with (wnd) {
				// Получаем dom-объект окна, чтобы избежать использования MessageBox.content().
				content('<div id="vkem-container"></div>');
				domWnd = document.getElementById('vkem-container').parentNode;
				content('');
				btnCancel = addButtonDom('Отмена', self.hCancelClick, 'no');
				btnHide = addButtonDom('Скрыть', self.hHideClick, 'yes');
				btnClose = addButtonDom('Закрыть', self.hCloseClick, 'yes');
			}
			
			domWndInfo.className = 'vkem-info';
			with (domWnd) {
				appendChild(domWndInfo);
				appendChild(domWndFiles);
			}
			
			domTipProgress.className = 'vkem-tip-progress';
			domTipSep.className = 'moreDiv more_div';
			with (domTipLink) {
				href = '#';
				addEventListener('click', self.hTipClick, false);
				appendChild(domTipText);
				appendChild(domTipProgress);
			}
			with (domTip) {
				className = 'vkem-tip';
				style.display = 'none';
				appendChild(domTipSep);
				appendChild(domTipLink);
			}
			
			DOM_SIDEBAR.appendChild(domTip);
			
			document.body.addEventListener('dragover', self.hDragOver, false);
			document.body.addEventListener('drop', self.hDrop, false);
			// FIXME: событие beforeunload не являтся стандартным, но альтернативы я не знаю.
			unsafeWindow.addEventListener('beforeunload', self.hBeforeUnload, true);
		}
		catch (e) {
			alert('cController() init: ' + e);
		}
	}
	
	// ************************** cController END ************************** 
	
	document.addEventListener('DOMContentLoaded', function(){
		try {
			// Запускаем скрипт только тогда, когда доступны класс MessageBox и сайдбар.
			if (!unsafeWindow.MessageBox || !DOM_SIDEBAR) {
				return;
			}

			var i, style = document.createElement('style');
			
			// Ищем сайдбар.
			for (i = 0; i <= DOM_SIDEBAR.childNodes.length; i++) {
				if (DOM_SIDEBAR.childNodes[i].tagName === 'OL') {
					DOM_SIDEBAR = DOM_SIDEBAR.childNodes[i];
					break;
				}
			}
			
			// Добавляем свою таблицу стилей.
			style.type = 'text/css';
			style.innerHTML = '.vkem-info{padding-bottom: 10px;}.vkem-tip-progress{width:32px;height:8px;padding-top:6px;display:block;float:right;background:url(/images/upload.gif) no-repeat right center;}.vkem-file{padding: 3px 6px 3px 6px;-moz-border-radius:4px;}.vkem-file:hover{background:#DAE1E8;}.vkem-file-current .vkem-title{font-weight:bold;}.vkem-title{}.vkem-time{color:#777777;}.vkem-status{float:right;color:#777777;font-size: 10px;}.vkem-btn{color:#2B587A;cursor:pointer}.vkem-btn:hover{text-decoration:underline;}';
			document.body.appendChild(style);
			// Создаем контроллер очереди.
			(new cController());
		}
		catch (e) {
			alert('init: ' + e);
		}
	}, false);
})();