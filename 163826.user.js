// ==UserScript==
// @name           4otaku-URL-upload
// @description    Script which add image URL field to image upload form (http://4otaku.org/art/)
// @author         shtrih (akashtrih@hitagi.ru)
// @include        http://4otaku.org/art/*
// @match          http://4otaku.org/art/*
// @version        1.3.1
// @history        2013.04.05 1.3  Добавлена обработка ошибок ответов, вывод текста ошибок.
// @history        2013.04.04 1.2  Поддержка работы в Chrome c расширением Tampermonkey v2.12.3124.133, а также работа в Chrome в виде расширения (проверено в Chrome 26).
// @history        2013.04.03 1.1  Увеличена производительность за счет замены обработчиков DOMNodeInserted и DOMNodeRemoved на MutationObserver.
// @history        2013.04.02 1.0  Первая версия работала на Chrome с расширением Blank Canvas Script Handler v0.0.20.
// ==/UserScript==
// http://wiki.4otaku.org/Api:Добавление:Арт
// http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/9517879#9517879

function scriptBody() {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		element = $('#add_form'),
		uploadOverlay = $('<div/>', {
			css: {
				position:'absolute',
				top: '0',
				width: '100%',
				height: '100%',
				background: 'rgba(230, 230, 230, 0.48) url(http://4otaku.org/images/loadingAnimation.gif) no-repeat center center',
				margin: '-11px',
				padding: '11px',
				display: 'none',
				'z-index': '1000'
			}
		}),
		// http://wiki.4otaku.org/Api:Коды_ошибок
		error_messages = {
			5:   'Файл не был получен.',
			10:  'Файл слишком большой.',
			20:  'Файл не является картинкой.',
			//30:  'Такой материал уже существует.', // игнорируем
			60:  'Тег не удалось найти в базе данных, ни поискав по алиасам, ни поискав по именам, ни поискав по вариантам. Новый тег был создан. Обычно эта ошибка не обозначает провал всего действия.',
			150: 'Сервер не имеет возможности обработать анимированные картинки (по идее, на 4otaku.org вы никогда не должны увидеть такой ошибки, если это случилось сообщите разработчику).',
			180: 'Произошел программный сбой при обработке картинки (по идее, на 4otaku.org вы никогда не должны увидеть такой ошибки, если это случилось сообщите разработчику).',
			//200: 'Файл не является торрент-файлом.', // это не про нас
			260: 'Битая картинка.',
			410: 'Не удалось скачать файл с предложенной ссылки.',
			420: 'Неполные данные запроса, пропущены основные поля.',
			430: 'Некорректные данные запроса.'
		},
		observer = new MutationObserver(function(mutationRecords) {
		mutationRecords.forEach(function(mutation) {
			if (mutation.addedNodes.length) {
				element.find('tr').eq(0).after(
					'<tr><td class="input field_name">Загрузить изображение по URL</td><td class="inputdata"><input style="width:65%;" type="url" name="image" placeholder="http://" /></td></tr>'
				);

				$('.art_body').delegate('#addform', 'submit', function (event) {
					var $this = $(event.target),
						error_div = $('#error', element);

					if ($this.find('input[name="image"]').val()) {
						$.ajax({
							url:      'http://4otaku.org/api/create/art',
							type:     'POST',
							data:     $this.serialize() + '&format=json',
							beforeSend: function () {
								$('#addform', element).css('position', 'relative').append(uploadOverlay.fadeIn());
							},
							success:  function (data) {
								if (data.id) {
									document.location.href = 'http://4otaku.org/art/' + Number(data.id);
								}
								else {
									error_div.html('');
									for (var i = 0, len = data.errors.length; i < len; i++) {
										error_div.append(
											$('<div/>', {
												text: error_messages[data.errors[i].code]
											})
										);
									}
									uploadOverlay.hide();
								}
							},
							error:    function (jqXHR, textStatus, errorThrown) {
								alert("Ошибка " + textStatus + ': ' + errorThrown);
								uploadOverlay.hide();
							},
							dataType: 'json'
						});

						return false;
					}
				});
			}
	 	});
	});
	if (element.length) {
		observer.observe(element[0], {
			childList: true,  // include information childNode insertion/removals
		});
	}
}

var script = document.createElement('script');
script.textContent = '(' + scriptBody.toString() + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);