// ==UserScript==
// @name            Skills Manager
// @namespace       http://www.heymexa.ru/
// @description     Позволяет сохранять и загружать навыки
// @include         http://ganjawars.ru/*
// @include         http://*.ganjawars.ru/*
// @grant           none
// @version         1.0
// @author          W_or_M
// ==/UserScript==

(function () {
    /**
     * @constructor
     */
    var SkillManager = function() {
        this.storage = window.localStorage;
        this.storagePrefix = 'skills_manager__';

        this._init();
    };

    SkillManager.prototype = {
        /**
         * Инициализация
         * @private
         */
        _init: function() {
            if (this._isItems()) {
                this._addSelectSetHandler();
                this._addTakeOffHandler();
                this._addInputSet();
                this._changeSelectSet();
            } else if (this._isHomeSkills()) {
                this._addResultBlock();
                this._addHandlers();
                this._getSkillsHash();
                this._update();

                this._saveCurrentSet();

                if (this.isLoad()) {
                    this._submit();
                }
            }

            if (this._isPutSet()) {
                this._addPutSetHandler();
            }
        },

        /**
         * @private
         */
        _addTakeOffHandler: function() {
            var anchors = document.querySelectorAll('[href*="take"]'),
                self = this,
                itemsbody = document.getElementById('itemsbody'),
                currentHtml = itemsbody.innerHTML;

            var handler = function() {
                self._addSelectSetHandler();
                self._addTakeOffHandler();
                self._addInputSet();
                self._changeSelectSet();
            };

            for (var i = 0, l = anchors.length; i < l; i++) {
                anchors[i].addEventListener('click', function() {
                    var timerId = setInterval(function() {
                        if (currentHtml != itemsbody.innerHTML) {
                            clearInterval(timerId);
                            handler();
                        }
                    }, 100);
                }, false);
            }
        },

        /**
         * Устанавливает обработчик на все путсеты
         * @private
         */
        _addPutSetHandler: function() {
            var a = document.querySelectorAll('a[href*="/home.do.php?putset="]');
            for(var i = 0, l = a.length; i < l; i++) {
                var id = /putset=(\d+)/.exec(a[i].href)[1],
                    skillNames = this._getActiveSkillsNamesById(id);
                a[i].addEventListener('click', this._loadSetSkills, false);
                if (skillNames) {
                    a[i].title = 'Навыки: '+ skillNames;
                } else {
                    a[i].title = 'Навыки не заданы';
                }
            }
        },

        /**
         * Загружает комплекты навыков в ифрейм
         * @private
         */
        _loadSetSkills: function(a) {
            a.preventDefault();
            var anchor = a.currentTarget,
                id = /putset=(\d+)/.exec(anchor.href)[1],
                url = skillManager._getSetSkillsById(id),
                frame = document.createElement('iframe');
            frame.id = 'skills_manager__frame';
            frame.style.display = 'none';
            frame.src = url;
            frame.onload = function() {
                setTimeout(function() {
                    frame.parentNode.removeChild(frame);
                    window.location.href = anchor.href;
                }, 500);
            }
            document.body.appendChild(frame);
            return false;
        },

        /**
         * Проверяет на наличие на странице ссылок на комплекты
         * @private
         */
        _isPutSet: function() {
            return !!document.querySelector('a[href*="/home.do.php?putset="]');
        },

        /**
         * Добавляет текстовый инпут для ввода комплекта навыков
         * @private
         */
        _addInputSet: function() {
            var beforeNode = document.querySelector('form[action*="home.do.php"] br'),
                beforeNodeParent = beforeNode.parentNode;
            this.labelSet = document.createElement('label');
            this.checkboxSaveSetState = document.createElement('input');
            this.btnCancelSaveSetState = document.createElement('button');
            this.btnCancelSaveSetState.onclick = this._cancelSaveSetState.bind(this);
            this.btnCancelSaveSetState.innerHTML = 'отвязать комплект навыков';
            this.btnCancelSaveSetState.title = this.getSkillsNames();
            this.checkboxSaveSetState.type = 'checkbox';
            this.checkboxSaveSetState.id = 'skills_manager__save-set';
            this.inputSet = document.createElement('input');
            this.inputSet.id = 'skills_manager__input-set';
            this.labelSet.setAttribute('for', this.checkboxSaveSetState.id);
            this.labelSet.innerHTML = 'привязать текущие навыки';
            this.labelSet.style.pointer = 'info';
            this.labelSet.style.borderBottom = '1px dotted #000';
            this.labelSet.title = this.getActiveSkillsNamesFromStorage();
            beforeNodeParent.insertBefore(document.createElement('br'), beforeNode);
            beforeNodeParent.insertBefore(document.createTextNode('Комплект навыков: '), beforeNode);
            beforeNodeParent.insertBefore(this.checkboxSaveSetState, beforeNode);
            beforeNodeParent.insertBefore(this.labelSet, beforeNode);
            beforeNodeParent.insertBefore(this.btnCancelSaveSetState, beforeNode);
//            beforeNodeParent.insertBefore(this.inputSet, beforeNode);

        },

        /**
         *
         */
        getSkillsNames: function() {
            var setId = this._getSetItemsId();
            return this._getActiveSkillsNamesById(setId);
        },

        /**
         *
         */
        _getActiveSkillsNamesById: function(id) {
            var skillsNames = this.storage.getItem(this.storagePrefix +'set_skill-names_'+ id);
            if (!skillsNames) {
                skillsNames = '';
            }
            return skillsNames;
        },

        /**
         * @private
         */
        _cancelSaveSetState: function(e) {
            e.preventDefault();
            var setId = this._getSetItemsId();
            this.storage.removeItem(this.storagePrefix +'set_skill-names_'+ setId);
            this.storage.removeItem(this.storagePrefix +'set_'+ setId);
            this._changeSelectSet();
        },

        /**
         * Вешает обработчик на смену комплекта
         * @private
         */
        _addSelectSetHandler: function() {
            this.selectSet = document.querySelector('[name="set_id"]');
            if (!this.selectSet) return;

            this.selectSet.addEventListener('change', this._changeSelectSet.bind(this), false);
            document.querySelector('form[action*="home.do.php"] input[type="submit"]')
                .addEventListener('click', this._saveSet.bind(this), false);

        },

        /**
         * Сохраняет комплект навыков для конкретного комплекта шмота
         * @private
         */
        _saveSet: function() {
            var setId = this._getSetItemsId(),
                skillsUrl = this.getCurrentSkillsSet(),
                isChecked = this.checkboxSaveSetState.checked;
            if (isChecked) {
                this.storage.setItem(this.storagePrefix +'set_skill-names_'+ setId,
                    this.getActiveSkillsNamesFromStorage());
                this.storage.setItem(this.storagePrefix +'set_'+ setId, skillsUrl);
            }
        },

        /**
         *
         * @private
         */
        _changeSelectSet: function() {
            var setId = this._getSetItemsId(),
                setUrl = this._getSetSkillsById(setId);
            if (setUrl) {
                this.btnCancelSaveSetState.title = this.getSkillsNames();
                this.btnCancelSaveSetState.style.display = 'inline';
                this.checkboxSaveSetState.style.display = 'none';
                this.labelSet.style.display = 'none';
            } else {
                this.btnCancelSaveSetState.style.display = 'none';
                this.checkboxSaveSetState.style.display = 'inline';
                this.labelSet.style.display = 'inline';
            }
//            this.inputSet.value = setUrl;
        },

        /**
         * Возвращает текущий номер комплекта предметов
         * @returns {Number}
         * @private
         */
        _getSetItemsId: function() {
            return parseInt(this.selectSet.value, 10);
        },

        /**
         * Возвращает урл по нужному id
         * @param {Number} id
         * @private
         */
        _getSetSkillsById: function(id) {
            var setUrl = this.storage.getItem(this.storagePrefix + 'set_'+ id);
            return setUrl ? setUrl : '';
        },

        /**
         * Добавление блока вывода результата скрипта
         * @private
         */
        _addResultBlock: function() {
            var form = document.querySelectorAll('form[action*="home.skills.php"]')[1];
            this.result = document.createElement('p');
            this.result.style.textAlign = 'center';
            this.result.id = 'skills_manager__result';
            form.parentNode.appendChild(this.result);
        },

        /**
         * Апдейт результат скрипта
         * @private
         */
        _update: function() {
            this.getSkillsState();
            var url = this.getSaveUrl();
            this.result.innerHTML = '<a target="_blank" href="'+ url +'">Ссылка на комплект</a>';
        },

        /**
         * Возвращает ссылку для сохранения комплекта
         * @returns {string}
         * @private
         */
        getSaveUrl: function() {
            var url = '/home.skills.php#';
            for (var i in this.activeSkills) { if (this.activeSkills.hasOwnProperty(i)) {
                url += this.hashSkills[i] +'=' + this.activeSkills[i] + '&';
            }}
            return url;
        },

        /**
         * Получает хэши параметров навыков
         * @private
         */
        _getSkillsHash: function() {
            var inputs = document.querySelectorAll('form[action*="home.skills.php"]')[1].querySelectorAll('input[id]');
            var hashs = {},
                hashSkills = {};
            for (var i = 0, l = inputs.length; i < l; i++) {
                var hash = inputs[i].name
                    .replace('set_active_skill_combat', 'sasc')
                    .replace('set_passive_skill_combat', 'spsc')
                    .replace('set_active_general', 'sag')
                    .replace('set_passive_general', 'spg')
                    .replace('_', '');
                hashs[hash] = inputs[i].name;
                hashSkills[inputs[i].name] = hash;
            }
            this.skillsHash = hashs;
            this.hashSkills = hashSkills;
        },

        /**
         * Возвращает состояние навыков
         */
        getSkillsState: function() {
            var inputs = document.querySelectorAll('form[action*="home.skills.php"]')[1].querySelectorAll('input[type="radio"]'),
                skills = {},
                counter = 0;

            for (var i = 0, l = inputs.length; i < l; i++) {
                var name = inputs[i].name,
                    checked = inputs[i].checked;

                if (typeof skills[name] == 'undefined') {
                    skills[name] = 0;
                    counter = 0;
                } else if (checked) {
                    skills[name] = counter;
                }
                ++counter;
            }
            this.activeSkills = skills;
            return skills;
        },

        /**
         *
         */
        getActiveSkillsNames: function() {
            var inputs = document.querySelectorAll('input[type="radio"]:not([value=""]):checked'),
                skillNames = [];
            for (var i = 0, l = inputs.length; i < l; i++) {
                skillNames.push(inputs[i].parentNode.nextSibling.firstChild.textContent);
            }
            return skillNames;
        },

        /**
         * Возвращает имена навыков из сторадж
         * @returns {String}
         */
        getActiveSkillsNamesFromStorage: function() {
            var skillNames = this.storage.getItem(this.storagePrefix +'set_active-names');
            if (!skillNames) {
                skillNames = "";
            }
            return skillNames;
        },

        /**
         *
         * @private
         */
        _saveCurrentSet: function() {
            var skillsNames = this.getActiveSkillsNames();
            this.storage.setItem(this.storagePrefix +'set_active-names', skillsNames.join(', '));
            this.storage.setItem(this.storagePrefix +'current-set', this.getSaveUrl());
        },

        getCurrentSkillsSet: function() {
            return this.storage.getItem(this.storagePrefix +'current-set');
        },

        /**
         * Вешает обработчики клика на радиоинпуты
         * @private
         */
        _addHandlers: function() {
            var inputs = document.querySelectorAll('form[action*="home.skills.php"]')[1].getElementsByTagName('input');
            for(var i = 0, l = inputs.length; i < l; i++) {
                inputs[i].addEventListener('click', this._update.bind(this), false);
            }
        },

        /**
         * Проверяет загрузка ли это
         * @returns {Boolean}
         */
        isLoad: function() {
            var skills = this._getSkillsFromHash();
            for (var i in skills) { if (skills.hasOwnProperty(i)) {
                return !!i;
            }}
            return false;
        },

        /**
         * Получает и возвращает умения из хэша
         * @returns {Object}
         * @private
         */
        _getSkillsFromHash: function() {
            var keyvalue = document.location.hash.replace('#','').split('&');
            if (!keyvalue.length) return {};

            this.activeSkills = {};
            keyvalue.forEach(function(skill) {
                if (skill != '') {
                    skill = skill.split('=');
                    var skillHash = this.skillsHash[skill[0]];
                    if (skillHash) {
                        this.activeSkills[skillHash] = skill[1];
                    }
                }
            }.bind(this));
            return this.activeSkills;
        },

        /**
         * Сабмит формы с навыками
         * @private
         */
        _submit: function() {
            var skills = this._getSkillsFromHash(),
                form = document.querySelectorAll('form[action*="home.skills.php"]')[1];
            for (var i in skills) { if (skills.hasOwnProperty(i)) {
                document.querySelectorAll('input[name="'+ i +'"]')[skills[i]].setAttribute('checked', 'checked');
            }}
            form.submit();
        },

        /**
         * Проверка на страницу предметов
         * @returns {boolean}
         * @private
         */
        _isItems: function() {
            return document.location.href.indexOf('ganjawars.ru/items.php') > 0;
        },

        /**
         * Проверка на страницу навыков
         * @returns {boolean}
         * @private
         */
        _isHomeSkills: function() {
            return document.location.href.indexOf('ganjawars.ru/home.skills.php') > 0;
        }
    };

    var skillManager = new SkillManager();
})();
