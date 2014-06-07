// ==UserScript==

// @name           Vkontakte additional links

// @author         Eugene Lamskoy

// @description    Additional links and features for Vkontakte.ru

// @include        http://vkontakte.ru/*

// ==/UserScript==



/**

 * Thanks for regizz for ukrainian translation (http://userscripts.org/users/100131)

 * Script uses next 3d party components:

 * 1. adopted each() function from jquery library 

 */



(function(){

    /**

     * Constants

     */

    Const = {

        'version' : '0.190',

        'consoleEnabled' : false,

        'homepage' : 'http://userscripts.org/scripts/show/43183',

        'scriptSource' : 'http://userscripts.org/scripts/source/43183.user.js',

        'author' : 'http://vkontakte.ru/id3095966',

        'groupPage' : 'http://vkontakte.ru/club9266497'

    };



    /**

     * Multilanguage translations

     */

    Lang = {

        'en' : {

            'update' : {

                'confirm' : "Vkontakte Additional Links Updater \n\nNew version is available: {0}\nYour current version is: {1}\n\nDo you want to upgrade?",

                'menuTitle' : "Vkontakte Additional Links - Check for updates",

                'noUpdates' : "No updates found. Wait a little bit while author make upgrade :)"

            },

            'links' : {

                'homepageTitle' : '[ Homepage ]',

                'authorTitle' : '[ Author ]',

                'groupTitle' : '[ VK Group ]',

                'downloadVideo' : 'Download video',

                'downloadAudio' : 'Download'

            },

            'search': {

                'photosLink': 'Photos',

                'photosWithLink': 'Photos with user',

                'notesLink': 'Notes',

                'questionsLink': 'Questions',

                'audioLink': 'Audio',

                'videoLink': 'Video',

                'groupsLink': 'Groups',

                'wallLink': 'Wall',

                'friendsLink' : 'Friends',

                'sendLink' : 'Send message'

            },

            'groups': {

                'photosLink': 'Photos',

                'audioLink': 'Audio',

                'videoLink': 'Video',

                'boardsLink': 'Boards',

                'wallLink': 'Wall',

                'membersLink': 'Members'

            },

            'favourites' : {

                'addLink' : 'Add to favourites',

                'delLink' : 'Remove from favourites'

            },

            'settings' : {

                'title' : 'Additional links settings',

                'myFriends' : 'Show additional links on "My friends", "Friends of user" pages',

                'favouritesLinks': 'Show additional links on  "My Bookmarks" (add/delete) ',

                'favouritesOnline': 'Show all users on "My bookmarks" in one table with status icon (online/offline)',

                'searchMode' : 'Show links on "Members search"',

                'inviteToGroup' : 'Show links in extended "Invite to group" mode',

                'deletedPages' : 'Show links on pages of deleted members',

                'groups' : 'Show links on "Search groups", "Groups of user" pages',

                'awayLinks' : 'Don\'t show redirect page while opening external links',

                'favouritesEnlarge' : 'Increase width of "My bookmarks" users list',

                'eraseAds' : 'Erase banners on all pages',

                'sidebarOneWord' : 'Erase "My" prefixes in left sidebar',

                'onlineTextToImage' : 'Replace "Online" text with image',

                'videoLinks' : 'Display "Download video" links',

                'audioLinks' : 'Display "Download audio" links',

                'albumsFlashUpload' : 'Use "Flash uploader" for photos by default',

                'appendUploadPhotos' : 'Enlarge upload files count to 6 in default images uploader'

            }

        },

        'ru' : {

            'update' : {

                'confirm' : "Обновление Vkontakte Additional Links\n\nДоступна новая версия: {0}\nВаша текущая версия: {1}\n\nХотите обновиться?",

                'menuTitle' : "Vkontakte Additional Links - Проверить наличие обновлений",

                'noUpdates' : "Обновления не найдены. Подождите пока автор не выпустит очередную версию :)"

            },

            'links' : {

                'homepageTitle' : '[ Домашняя страница ]',

                'authorTitle' : '[ Автор скрипта  ]',

                'groupTitle' : '[ Группа Вконтакте ]',

                'downloadVideo' : 'Скачать видео',

                'downloadAudio' : 'Скачать'

            },

            'search': {

                'photosLink': 'Фотографии',

                'photosWithLink': 'Фото с пользователем',

                'notesLink': 'Заметки',

                'questionsLink': 'Вопросы',

                'audioLink': 'Аудио',

                'videoLink': 'Видео',

                'groupsLink': 'Группы',

                'wallLink': 'Стена',

                'friendsLink' : 'Друзья пользователя',

                'sendLink' : 'Отправить сообщение'

            },

            'groups': {

                'photosLink': 'Фотографии',

                'audioLink': 'Аудио',

                'videoLink': 'Видео',

                'boardsLink': 'Обсуждения',

                'wallLink': 'Стена',

                'membersLink': 'Члены группы'

            },

            'favourites' : {

                'addLink' : 'Добавить в закладки',

                'delLink' : 'Удалить из закладок'

            },

            'settings' : {

                'title' : 'Настройки дополнительных ссылок',

                'myFriends' : 'Отображать дополнительные ссылки на странице "Мои друзья", "Друзья пользователя"',

                'favouritesLinks': 'Отображать дополнительные ссылки на странице "Мои закладки" (удалить/добавить) ',

                'favouritesOnline': 'Отображать всех пользователей в закладках в одной таблице с иконкой статуса (онлайн/оффлайн)',

                'searchMode' : 'Отображать ссылки в режиме "Поиск пользователей"',

                'inviteToGroup' : 'Отображать ссылки в режиме расширенного приглашения в группу',

                'deletedPages' : 'Отображать ссылки на страницах удаленных пользователей',

                'groups' : 'Отображать ссылки при поиске групп и в "Друзьях пользователя"',

                'awayLinks' : 'Не показывать страницу переадресации при переходе по внешней ссылке',

                'favouritesEnlarge' : 'Увеличить ширину блока с пользователями в "Моих закладках"',

                'eraseAds' : 'Удалить баннеры на всех страницах',

                'sidebarOneWord' : 'Удалить префиксы "Моя/мои" в панели ссылок',

                'onlineTextToImage' : 'Заменить текст "Online" на картинку',

                'videoLinks' : 'Отображать ссылки "Скачать видео"',

                'audioLinks' : 'Отображать ссылки "Скачать аудио"',

                'albumsFlashUpload' : 'Использовать флеш-загрузчик фотографий по умолчанию',

                'appendUploadPhotos' : 'Расширить количество файлов до 6 в обычном загрузчике фотографий'

            }

        },

        // Перевод на украинский by regizz (http://userscripts.org/users/100131)

        'ua' : {

          'update' : {

              'confirm' : "Оновлення Vkontakte Additional Links\n\nДоступна нова версія: {0}\nВаша поточна версія: {1}\n\nХочете поновити?",

              'menuTitle' : "Vkontakte Additional Links - Перевірити наявність оновлень",

              'noUpdates' : "Обновленя відсутні. Зачекайте доки автор напише нову версію :)"

              

          },

          'links' : {

              'homepageTitle' : '[ Домашня сторінка ]',

              'authorTitle' : '[ Автор скрипту  ]',

              'groupTitle' : '[ Група Вконтакті ]',

              'downloadVideo' : 'Скачати відео',

              'downloadAudio' : 'Скачати'

          },

          'search': {

              'photosLink': 'Фотографії',

              'photosWithLink': 'Фото з користувачем',

              'notesLink': 'Нотатки',

              'questionsLink': 'Питання',

              'audioLink': 'Аудіо',

              'videoLink': 'Відео',

              'groupsLink': 'Групи',

              'wallLink': 'Стіна',

              'friendsLink' : 'Друзі користувача',

              'sendLink' : 'Відправити повідомлення'

          },

          'groups': {

              'photosLink': 'Фотографії',

              'audioLink': 'Аудіо',

              'videoLink': 'Відео',

              'boardsLink': 'Обговорення',

              'wallLink': 'Стіна',

              'membersLink': 'Члени групи'

          },

          'favourites' : {

              'addLink' : 'Додати в закладки',

              'delLink' : 'Втидалити з закладок'

          },

          'settings' : {

              'title' : 'Налаштування додаткових посиланнь',

              'myFriends' : 'Показувати додаткові посилання на сторінці "Мої друзі", "Друзі користувача"',

              'favouritesLinks': 'Показувати додаткові посілання на сторінці "Мої закладки" (видалити/додати) ',

              'favouritesOnline': 'Показувати усіх користувачів у закладках в одній таблиці з іконкою статусу (онлайн/оффлайн)',

              'searchMode' : 'Показувати посилання в режимі "Пошук користувачів"',

              'inviteToGroup' : 'Показувати посилання в режимі розширеного запрошення в групу',

              'deletedPages' : 'Показувати посилання на сторінках видалених користувачів',

              'groups' : 'Показувати посилання при пошуку груп і у "Друзях користувача"',

              'awayLinks' : 'Не показувати сторінку переадресації при переході за зовнішнім посиланням',

              'favouritesEnlarge' : 'Збільшити ширину блоку з користувачами у "Моїх закладках"',

              'eraseAds' : 'Прибрати банери на всіх сторінках',

              'sidebarOneWord' : 'Прибрати префікси "Моя/мої" на панелі посиланнь',

              'onlineTextToImage' : 'Замінювати текст "Online" на картинку',

              'videoLinks' : 'Показувати посилання "Скачати відео"',

              'audioLinks' : 'Показувати посилання "Скачати аудіо"',

              'albumsFlashUpload' : 'Використовувати флеш-завантажувач фотографій за замовчуванням',

              'appendUploadPhotos' : 'Розширити кількість файлів до 6 у звичайному завантажувачі фотографій'

          }

        },        

        getLanguage : function() {

            var cookie = parseInt(Cookie.get('remixlang')) 

            var defaultLang = "ru"

            var cases = {0:'ru', 1:'ua', 3:'en'}

            for (i in cases) {

                if(i == cookie) {

                    return cases[i]

                }

            }            

            return defaultLang

        },

        text : function(section, val) {

             var code = Lang.getLanguage();

             if(typeof(Lang[code][section][val]) != 'undefined') {

                return Lang[code][section][val];

             }

             return '%%'+section+'.'+val+'%%';

        }

    };



    /**

     * Wrapper for cookies

     * @param {Object} check_name

     */

    Cookie = {

        get : function ( check_name ) {

            var a_all_cookies = document.cookie.split( ';' );

            var a_temp_cookie = '';

            var cookie_name = '';

            var cookie_value = '';

            for ( var i = 0; i < a_all_cookies.length; i++ ) {

                a_temp_cookie = a_all_cookies[i].split( '=' );

                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

                if ( cookie_name == check_name ) {

                    if ( a_temp_cookie.length > 1 ) {

                        cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );

                    }

                    return cookie_value;

                }

            }

            return null;

        }

    };



    /**

     * Settings wrapper

     */

    Settings = {

        store: function(name, value){

            return GM_setValue(name, value);

        },

        load: function(name, defaultVal){

            return GM_getValue(name, defaultVal);

        },

        kill: function(name){

            return GM_deleteValue(name);

        },

        list: function(){

            return GM_listValues();

        }

    };



    Settings.list = {

        update : {

            'internal' : true,

            'key' : 'update_lastChecked',

            'defaultVal' : 0

        },

        updateDelta : {

            'internal' : true,

            'key': 'update_period',

            'defaultVal' : 3600 * 12

        },

        myFriends : {

            'description': Lang.text('settings', 'myFriends'),

            'defaultVal' : true,

            'key' : 'show_myFriends'

        } ,

        favouritesLinks : {

            'description': Lang.text('settings', 'favouritesLinks'),

            'key': 'show_myFavourites',

            'defaultVal' : true

        } ,

        favouritesOnline : {

            'description': Lang.text('settings', 'favouritesOnline'),

            'key': 'online_myFavourtites',

            'defaultVal' : true

        },

        videoLinks : {

            'description': Lang.text('settings', 'videoLinks'),

            'key': 'show_downloadVideo',

            'defaultVal' : true

        },        

        audioLinks : {

            'description': Lang.text('settings', 'audioLinks'),

            'key': 'show_downloadAudio',

            'defaultVal' : true

        },        



        onlineTextToImage : {

            'description': Lang.text('settings', 'onlineTextToImage'),

            'key': 'online_textToImage',

            'defaultVal' : true    

        },

        favEnlarge : {

            'description': Lang.text('settings', 'favouritesEnlarge'),

            'key': 'enlarge_myFavUsers',

            'defaultVal' : false

        } ,

        searchMode    : {

            'description': Lang.text('settings', 'searchMode'),

            'key': 'show_searchMode',

            'defaultVal' : true

        } ,

        inviteToGroup : {

            'description': Lang.text('settings', 'inviteToGroup'),

            'key': 'show_inviteMode',

            'defaultVal' : true

        } ,

        deletedPages : {

            'description': Lang.text('settings', 'deletedPages'),

            'key': 'show_deletedPage',

            'defaultVal' : true

        } ,

        groups : {

            'description': Lang.text('settings', 'groups'),

            'key': 'show_groups',

            'defaultVal' : true

        } ,

        awayLinks : {

            'description': Lang.text('settings', 'awayLinks'),

            'key': 'erase_awayLinks',

            'defaultVal' : false

        } ,

        eraseAds : {

            'description': Lang.text('settings', 'eraseAds'),

            'key': 'erase_advertisements',

            'defaultVal' : true

        },

/*        sidebarOneWord : {

            'description': Lang.text('settings', 'sidebarOneWord'),

            'key': 'split_sidebarLinksTitles',

            'defaultVal' : false        

        },*/

        albumsFlashUpload : {

            'description': Lang.text('settings', 'albumsFlashUpload'),

            'key': 'flash_uploaderByDefault',

            'defaultVal' : false        

        },

        appendUploadPhotos: {

            'description': Lang.text('settings', 'appendUploadPhotos'),

            'key': 'flash_appendUploadPhotos',

            'defaultVal' : false                    

        }



    };



    Settings.autoLoad = function(index) {

        return Settings.load(Settings.list[index].key, Settings.list[index].defaultVal);

    };



    function jeach( object, callback, args ) {

        var name, i = 0;

        if ( args ) {

            if ( typeof(object.length) == 'undefined' ) {

                for ( name in object )

                    if ( callback.apply( object[ name ], args ) === false )

                        break;

            } else

                for ( ; i < object.length; )

                    if ( callback.apply( object[ i++ ], args ) === false )

                        break;

        } else {

            if ( typeof(object.length) == 'undefined' ) {

                for (name in object) {

                     if (callback.call(object[name], name, object[name]) === false) {

                        break;

                    }

                }

            } else

                for ( var value = object[0];

                    i < object.length && callback.call( value, i, value ) !== false; value = object[++i] ){}

        }

        return object;

    };



    



    VersionControl = {

        timestamp : function() {

            return parseInt(new Date().getTime().toString().substring(0, 10))

        },

        init: function() {

            var title = Lang.text('update', 'menuTitle')

            GM_registerMenuCommand(title, VersionControl.check);

            var now = VersionControl.timestamp();

            var lastCheck = parseInt(Settings.autoLoad('update'));

            // Allow update each 12 hours

            var timeDelta = parseInt(Settings.autoLoad('updateDelta'));

            if(lastCheck == 0 || now >= lastCheck + timeDelta) {

                VersionControl.check(true);

            }

        },

        check: function(suppressNoUpdatesMessage) {

            GM_xmlhttpRequest({

              method : "GET",

              url : Const.homepage,

              headers:{

                "User-Agent": navigator.userAgent,

                "Accept": "text/xml"

              },

              onload: function(response) {

                var version = response.responseText.match(/<span>([0-9]+\.[0-9]+)<\/span>/i);

                if( typeof(version[1]) == 'undefined') {

                    return;

                }

                var siteVer = parseFloat(version[1]);

                Settings.store(Settings.list.update.key, VersionControl.timestamp());

                if( parseFloat(siteVer) <= parseFloat(Const.version)) {

                    if( ! suppressNoUpdatesMessage ) {                        

                        alert(Lang.text('update', 'noUpdates')) 

                    }

                    return

                }

                if(confirm(StringsHelper.format(Lang.text('update', 'confirm'), siteVer, Const.version))) {

                    window.location.href = Const.scriptSource;

                }

              }

              });

        }

    }



    /**

     * Vkontakte request map

     */





    Vkontakte = {

        makeRequest : function(options) {

            var args = {

                method: 'POST',

                url: 'http://vkontakte.ru',

                headers: {'Content-type': 'application/x-www-form-urlencoded'}

            };



            if(typeof(options.method) == 'string') {

                args.method = options.method;

            }

            if(typeof(options.url) == 'string') {

                args.url = options.url;

            }

            if(typeof(options.onload) == 'function') {

                args.onload = options.onload;

            }

            if(typeof(options.onerror) == 'function') {

                args.onload = options.onerror;

            }

            if(typeof(options.path) == 'string') {

                args.url += options.path;

            }

            if(typeof(options.params) == 'object') {

                args.data = StringsHelper.http_build_query(options.params);

            } else if(typeof(options.params) == 'string') {

                args.data = options.params;

            }

            //console.log(args)

            GM_xmlhttpRequest(args);

        },



        addPersonToFavourites : function(options) {

            options.path = '/fave.php';

            options.params = {'act':'addPerson', 'mid':options.id};

            Vkontakte.makeRequest(options);

        },

        addGroupToFavourites : function(options) {

            options.path = '/fave.php';

            options.params = {'act':'addGroup', 'gid':options.id};

            Vkontakte.makeRequest(options);

        },

        deletePersonFromFavourites : function(options) {

            options.path = '/fave.php';

            options.params = {'act':'deletePerson', 'mid':options.id};

            Vkontakte.makeRequest(options);

        },

        deleteGroupFromFavourites : function(options) {

            options.path = '/fave.php';

            options.params = {'act':'deleteGroup', 'gid':options.id};

            Vkontakte.makeRequest(options);

        },

        addDelFavouritesCombined : function(options) {

            var gMode = typeof(options.groupMode) != 'undefined' ? options.groupMode : false;

            var aMode = typeof(options.addMode) != 'undefined' ? options.addMode : true;

            var processors = {

                'add' :  {'group' : Vkontakte.addGroupToFavourites, 'person' : Vkontakte.addPersonToFavourites},

                'del' :  {'group' : Vkontakte.deleteGroupFromFavourites, 'person' : Vkontakte.deletePersonFromFavourites},

            };

            gMode = gMode == true ? 'group' : 'person';

            aMode = aMode == true ? 'add' : 'del';

            //Console.log(aMode, gMode);

            return (processors[aMode][gMode])(options);

        }

    };







    /**

     * FavouritesInnerObj

     * @param {Object} options

     */

    FavouritesInnerObj = function(options) {

        this.obj = null;

        this.images = {};

        this.text = {};

        this.init(options);

    };

    FavouritesInnerObj.prototype = {

        init: function(options) {

            this.images.add = options.addImage ? options.addImage : false;

            this.images.del = options.delImage ? options.delImage : false;

            this.images.load = options.loadImage ? options.loadImage : false;

            this.text.add = options.addText ? options.addText : false;

            this.text.del = options.delText ? options.delText : false;

        },

        addRenderer: function() {

            var out = [];

            if(this.images.add) {

                var img = document.createElement('img');

                img.setAttribute('src', this.images.add);

                out.push(img);

            }

            if(this.text.add) {

                out.push(this.text.add);

            }

            return out;

        },

        delRenderer: function() {

            var out = [];

            if(this.images.del) {

                var img = document.createElement('img');

                img.setAttribute('src', this.images.del);

                out.push(img);

            }

            if(this.text.del) {

                out.push(this.text.del);

            }

            return out;

        },

        loadRenderer: function() {

            var img = document.createElement('img');

            img.setAttribute('src', this.images.load);

            return [img];

        }

    };





    /**

     * Favourites Link object

     * @param {Object} options

     */

    function FavouritesLink(options){

        this.obj = null;

        this.pictureMode = false;

        this.addMode = false;

        this.section = '';

        this.id = 0;

        this.img = null;

        this.renderer = null;

        this.loadMode = false;

        this.init(options);

        return this.obj;

    }

    FavouritesLink.prototype = {

        objToHtml : function(arg) {

            var div = document.createElement('div');

            jeach(arg, function(key, obj) {

                if(typeof(obj) != 'string') {

                    div.appendChild(obj);

                } else {

                    div.innerHTML += obj;

                }

            });



            return div.innerHTML;

        },

        render : function() {

            this.obj.href = 'javascript:void(0);';

            var rObj = null;

            if(this.loadMode) {

                rObj = this.renderer.loadRenderer();

                this.loadMode = false;

            } else {

                rObj = this.addMode ? this.renderer.addRenderer() : this.renderer.delRenderer();

            }

            this.obj.innerHTML = this.objToHtml(rObj);

        },

        init : function(options) {

            this.pictureMode = typeof(options.pictureMode) != 'undefined' ? options.pictureMode : false;

            this.obj = document.createElement('a');

            this.addMode = typeof(options.addMode) != 'undefined' ? options.addMode : true;

            this.groupMode = typeof(options.groupMode) != 'undefined' ? options.groupMode : false;

            this.section = options.section;

            this.id = options.id;

            this.loadMode = false;

            var picRender = {'addImage': Images['add'], 'delImage' : Images['delete'], 'loadImage': Images['loader'] };

            var txtRender = {'addText' : Lang.text('favourites', 'addLink'), 'delText' : Lang.text('favourites', 'delLink'),  'loadImage': Images['loader'] };

            var rOptions = this.pictureMode ? picRender : txtRender;

            this.renderer = new FavouritesInnerObj(rOptions);

            this.render();



            // Трюк для замыкания

            var self = this;

            this.obj.addEventListener('click', function() {

                self.loadMode = true;

                self.render();

                Vkontakte.addDelFavouritesCombined({

                    'id' : self.id,

                    'addMode' : self.addMode,

                    'groupMode' : self.groupMode,

                    'onload' : function(response) {

                        if(response.status != 200) {

                            alert('Error while sending request to server!');

                        } else {

                            self.addMode =! self.addMode;

                        }

                        self.render();

                    }

                });

                return false;

            }, false);

        }

    };



    /**

     * SettingsCheck

     * @param {Object} options

     */

    function SettingsCheck (options) {

        this.obj = null;

        this.settingsKey = '';

        this.checked = false;

        this.init(options);

        return this.obj;

    };

    SettingsCheck.prototype = {

        init: function(options) {

        this.settingsKey = options.key;

        this.checked = Settings.autoLoad(this.settingsKey);

        //console.log('Checked :', this.checked, ', ', options.key);

        this.obj = document.createElement('input');

        this.obj.setAttribute('type', 'checkbox');



        if(options.id) {

            this.obj.setAttribute('id', options.id);

        }

        if(this.checked) {

            this.obj.setAttribute('checked', 'checked');

        }

        var self = this;

        this.obj.addEventListener('change',

            function() {

                self.checked =! self.checked;

                Settings.store(Settings.list[self.settingsKey].key, self.checked);

            },

            false);

        }

    };





    SettingsTable = function(options) {

        this.obj = null;

        this.init(options);

        return this.obj;



    };

    SettingsTable.prototype = {

        init : function (options) {

            var table = document.createElement('table');

            table.setAttribute('cellspacing', 0);

            table.setAttribute('cellpadding', 0);

            table.setAttribute('class', 'editor');

            table.style.width = '420px';

            table.style.margin = '0px';

            var t = document.createElement('tbody');

            table.appendChild(t);



            this.obj = document.createElement('form');

            this.obj.appendChild(table);



            if(typeof(options.checkboxes) != 'undefined') {

                jeach(options.checkboxes, function(key, c) {

                    var tr = document.createElement('tr');



                    var td = document.createElement('td');

                    td.setAttribute('class', 'servCheck');

                    td.appendChild(c.checkbox);

                    tr.appendChild(td);



                    var td = document.createElement('td');

                    td.setAttribute('class', 'servDesc');

                    td.innerHTML = c.description;



                    tr.appendChild(td);

                    t.appendChild(tr);

                });

            }

        },

    };







    /**

     * PHP-like func_get_args()

     */

    function func_get_args(){

        return Array.prototype.slice.call(arguments.callee.caller.arguments);

    }



    /**

     * Links helper

     */

    LinksHelper = {

        /**

         * Create user links set

         * @param {Object} id

         */

        getUserLinks: function(id, params){

            if(!params) {

                params = {};

            }

            var out = [];

            var noSend = false;

            var noFriends = false;

            if(typeof(params.noSend) != 'undefined') {

                noSend = params.noSend;

            }

            if(typeof(params.noFriends) != 'undefined') {

                noFriends = params.noFriends;

            }



            if (!noSend) {

                out.push(createLink('/mail.php?act=write&to=' + id, Lang.text('search', 'sendLink')));

            }

            if (!noFriends) {

                out.push(createLink('/friends.php?id=' + id, Lang.text('search', 'friendsLink')));

            }

            /* out.push(document.createElement('br')); */

            out.push(createLink("/photos.php?id=" + id, Lang.text('search', 'photosLink')));

            out.push(createLink("/photos.php?act=user&id=" + id, Lang.text('search', 'photosWithLink')));

            out.push(createLink("/notes.php?id=" + id, Lang.text('search', 'notesLink')));

            out.push(createLink("/questions.php?mid=" + id, Lang.text('search', 'questionsLink')));

            out.push(createLink("/video.php?id=" + id, Lang.text('search', 'videoLink')));

            out.push(createLink("/audio.php?id=" + id, Lang.text('search', 'audioLink')));

            out.push(createLink("/groups.php?id=" + id, Lang.text('search', 'groupsLink')));

            out.push(createLink("/wall.php?id=" + id, Lang.text('search', 'wallLink')));

            /* out.push(document.createElement('br')); */

            return out;

        },

        /**

         * Create group links set

         * @param {Object} id

         */

        getGroupLinks: function(id){

            var out = [];

            out.push(document.createElement('br'));

            out.push(createLink("/search.php?group=" + id, Lang.text('groups', 'membersLink')));

            out.push(createLink("/video.php?gid=" + id, Lang.text('groups', 'videoLink')))

            out.push(createLink("/audio.php?gid=" + id, Lang.text('groups', 'audioLink')));

            out.push(createLink("/photos.php?gid=" + id, Lang.text('groups', 'photosLink')));

            out.push(createLink("/board.php?act=topics&id=" + id, Lang.text('groups', 'boardsLink')));

            out.push(createLink("/wall.php?gid=" + id,Lang.text('groups', 'wallLink')));

            out.push(document.createElement('br'));

            return out;



        }

    };



    /**

     * Strings helper

     */

    StringsHelper = {

        format : function( text ) {

            //check if there are two arguments in the arguments list

            if ( arguments.length <= 1 ) {

                return text;

            }

            //decrement to move to the second argument in the array

            var tokenCount = arguments.length - 2;



            for( var token = 0; token <= tokenCount; token++ ) {

                text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );



            }

            return text;

        },





        /**

         * PHP-like urlencode

         * @param {Object} str

         */

        urlencode: function(str){



            var histogram = {}, tmp_arr = [];

            var ret = str.toString();



            var replacer = function(search, replace, str){

                var tmp_arr = [];

                tmp_arr = str.split(search);

                return tmp_arr.join(replace);

            };



            // The histogram is identical to the one in urldecode.

            histogram["'"] = '%27';

            histogram['('] = '%28';

            histogram[')'] = '%29';

            histogram['*'] = '%2A';

            histogram['~'] = '%7E';

            histogram['!'] = '%21';

            histogram['%20'] = '+';



            // Begin with encodeURIComponent, which most resembles PHP's encoding functions

            ret = encodeURIComponent(ret);



            for (search in histogram) {

                replace = histogram[search];

                ret = replacer(search, replace, ret) // Custom replace. No regexing

            }



            // Uppercase for full PHP compatibility

            return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2){

                return "%" + m2.toUpperCase();

            });



            return ret;

        },



        /**

         * PHP-like http_build_query

         * @param {Object} formdata

         * @param {Object} numeric_prefix

         * @param {Object} arg_separator

         */

        http_build_query: function(formdata, numeric_prefix, arg_separator){

            var key, use_val, use_key, i = 0, j = 0, tmp_arr = [];



            if (!arg_separator) {

                arg_separator = '&';

            }



            for (key in formdata) {

                use_val = this.urlencode(formdata[key].toString());

                use_key = this.urlencode(key);



                if (numeric_prefix && !isNaN(key)) {

                    use_key = numeric_prefix + j;

                    j++;

                }

                tmp_arr[i++] = use_key + '=' + use_val;

            }



            return tmp_arr.join(arg_separator);

        }





    }



    /**

     * Safe console wrapper

     */

    Console = {

        /**

         * console.log wrapper

         * @see func_get_args()

         */

        log: function(){



            if (!Const.consoleEnabled) {

                return false;

            }

            if (typeof(console) !== 'undefined') {

                return console.log.apply(null, func_get_args());

            }

            return false;

        }



    }



    /**

     * Xpath iteration wrapper

     */

    Xpath = {

        /**

         * Iterate

         * @param {String} xPath

         * @param {Function} callback

         * @param {Object} obj

         */

        iterate: function(xPath, callback, obj, evalCaller){

            if (!obj) {

                obj = document;

            }

            if (!evalCaller) {

                evalCaller = document;

            }

            var query = evalCaller.evaluate(xPath, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for (var i = 0, length = query.snapshotLength; i < length; i++) {

                var item = query.snapshotItem(i);

                var res = callback(item);

                if (typeof(res) == 'boolean' && res == false) {

                    break;

                }

            }

            return this;

        },

        count : function(xPath, obj) {

            if(!obj) {

                obj = document;

            }

            return document.evaluate('count('+xPath+')', obj, null, XPathResult.ANY_TYPE, null).numberValue;

        }

    };



    /**

     * Append object

     */

    Append = {

        /**

         * Append elements to UL wrapped in LI

         * @param {Object} element

         * @param {Array} childs

         */

        appendToUl: function(element, childs){

            for (j in childs) {

                var t = childs[j];

                var tmp = document.createElement("li");

                if (typeof(t) == 'object') {

                    tmp.appendChild(t);

                }

                else {

                    tmp.innerHTML = t;

                }

                element.appendChild(tmp);

            }

        }

    };







    // HTML: construct link

    function createLink (href, inner, onclick){

        var addon = document.createElement("a");

        addon.setAttribute("href", href);

        addon.innerHTML = inner;

        if (onclick) {

            addon.addEventListener('click', onclick, false);

        }

        return addon;

    };



    /**

     * http://vkontakte.ru/fave.php processor

     */

    function faveProcessor(){

        var faves = [{

            'xpath': "//div[@id='Information'][1]//td/a[starts-with(@href, '/id')]",

            'regex': /id([0-9]+)/i,

            'type' : 'people'

        }, {

            'xpath': "//li//a[starts-with(@href, '/club')]",

            'regex': /club([0-9]+)/i,

            'type' : 'groups'

        }, {

            'xpath': "//li//a[starts-with(@href, 'events.php?act=')]",

            'regex': /gid=([0-9]+)/i,

            'type' : 'groups'

        }];



        var useLinks = Settings.autoLoad('favouritesLinks');

        var useOnline = Settings.autoLoad('favouritesOnline');

        var useEnlarge = Settings.autoLoad('favEnlarge');



        if (useEnlarge) {

            GM_addStyle("#leftColumn { width: 470px;}");

            GM_addStyle("#pageLayout { width: 891px }");

            GM_addStyle("#pageBody { width: 732px }");

            //        GM_addStyle ("#pageHeader { width: 800px; background-color: #FFFFFF;}");

            //        GM_addStyle ("#topNav { position: relative; left:-100px}");

            //        GM_addStyle ("div#quickSearch {position: relative; left:20px}");

            GM_addStyle("#pageHeader { margin-left: 50px;}");

        }



        if (useOnline) {

            Xpath.iterate("//div[@id='Information'][2]", function(link){

                link.style.display = 'none';

            });

            var onlinePeople = {};

            Xpath.iterate("//div[@id='Information'][2]//td/a[starts-with(@href, '/id')]", function(link){

                var id = parseInt(link.href.match(faves[0].regex)[1]);

                onlinePeople[id] = true;

            });

        }



        jeach (faves, function(key, j) {

            Xpath.iterate(j.xpath, function(link){



                var id = link.getAttribute('href').toString().match(j.regex)[1];

                //Console.log('Id = ' + id);



                if (useLinks) {

                    var element = new FavouritesLink({

                        'id': id,

                        'addMode': false,

                        'pictureMode': j.type == 'people',

                        'groupMode': j.type != 'people'

                    });

                    element.style.color = '#FF0000';

                    element.style.padding = "0px 0px 0px 4px";

                }

                //Console.log('type = ' + j.type);



                if(j.type == 'people' && useOnline) {

                    var div = document.createElement("div");

                    var img = document.createElement("img");



                    img.src = onlinePeople[id] ? Images.online : Images.offline;

                    img.style.padding = '0px';

                    div.appendChild(img);



                    if (useLinks) {

                        element.style.padding = '0px';

                        div.appendChild(element);

                    }



                    link.parentNode.appendChild (document.createElement("br"));

                    link.parentNode.appendChild (div);

                } else if(useLinks) {

                    link.parentNode.appendChild (document.createElement("br"));

                    link.parentNode.appendChild (element);

                }



                if(!link.innerHTML) {

                    link.innerHTML = 'No title';

                }

            });

        } );

    }



    

    function newSearchProcessor() {

        

        searchMode = Settings.autoLoad('searchMode')  

        allowAudio = Settings.autoLoad('audioLinks') 

        groupsMode = Settings.autoLoad('groups')

        document.addEventListener('DOMNodeInserted', function(event) {

            var div = e = event.target

            if (!typeof(e) == 'object' || !e.tagName || e.tagName.toUpperCase() != 'DIV' || !e.hasAttribute('class')) {

                return;

            }



            elementClass = e.getAttribute('class').match(/(result|audioRow)/i)

            if (!elementClass) {

                return

            }



            appendUserLinks = function(id) {

                var id = 0

                Xpath.iterate("*//a[starts-with(@href, 'mail.php?')]", function(row) {

                    id = row.getAttribute('href').match(/mail.php\?act=write&to=([0-9]+)/i)[1];

                    return false;

                }, div);

                if (!id) {

                    return

                }

                var isDeleted = Xpath.count("*//span[@class='bbb']", div) != 0;

                var noItems = Xpath.count("*//ul/li", div) == 0;

                var hasWriteTo = Xpath.count("*//a[starts-with(@href, 'mail.php?act=write')]", div) != 0

                var hasFriendsOf = Xpath.count("*//a[contains(@href, 'friend')]", div) != 0;

                var hasFavLink = Xpath.count("*//a[starts-with(@href, 'fave.php?act=')]", div) != 0;

                Xpath.iterate('*//ul', function(ul) {

                    var links = LinksHelper.getUserLinks(id, {'noSend': hasWriteTo, 'noFriends' : hasFriendsOf});

                    var t = [];

                    links = t.concat(links);

                    if (!hasFavLink) {

                        links.push(new FavouritesLink({

                            'id': id,

                            'addMode': true,

                            'pictureMode': false

                        }));

                    } else {

                        links.pop();

                    }

                    Append.appendToUl(ul, links);

                }, div);

            }            

            appendClubLinks = function() {

                Xpath.iterate("*//li/a[starts-with(@href, 'club')]", function(link){

                    var idGroup = link.getAttribute('href').match(/club(\d+)/i)[1];

                    var element = link.parentNode.parentNode;

                    var l = LinksHelper.getGroupLinks(idGroup);

                    l.push(new FavouritesLink({'id':idGroup, 'groupMode': true, 'addMode': true, 'pictureMode': false}));

                    Append.appendToUl(element, l);

                }, div);

            }

            

            if ( searchMode ) {

                appendUserLinks()

            } 

            if ( groupsMode ) {

                appendClubLinks()

            }

            if ( allowAudio ) {

                Xpath.iterate("*//img[starts-with(@id, 'imgbutton')]", processSoundLink, div)

            }



        }, false);

    }

    

    function searchProcessor(){

        var useSearch = Settings.autoLoad('searchMode');

        var useInvite = Settings.autoLoad('inviteToGroup');

        var inviteMode = Xpath.count("//a[starts-with(@href, 'javascript: inviteMemberToGroup')]") != 0;

        

        /*

        if(inviteMode) {

            Xpath.iterate("//a[starts-with(@href, 'javascript: inviteMemberToGroup')]", function(a) {

                console.log(a);

                //var evt = document.createEvent("HTMLEvents");

                //evt.initEvent("click", true, true);

                //a.dispatchEvent(evt);

                location.href = a.href;

                alert('yes');

            });

        }

        */

    

        var xpath = "//div[starts-with(@class, 'result clearFix')]";



        

        Xpath.iterate(xpath, function(div) {

            var id = 0;

            Xpath.iterate("*//div[starts-with(@id, 'row')]", function(row) {

                id = row.getAttribute('id').match(/row2([0-9]+)/i)[1];

                return false;

            }, div);



            if(!id) { return true;}



            var isDeleted = Xpath.count("*//span[@class='bbb']", div) != 0;

            var noItems = Xpath.count("*//ul/li", div) == 0;

            var hasWriteTo = Xpath.count("*//a[starts-with(@href, 'mail.php?act=write')]", div) != 0

            var hasFriendsOf = Xpath.count("*//a[contains(@href, 'friend')]", div) != 0;

            var hasFavLink = Xpath.count("*//a[starts-with(@href, 'fave.php?act=')]", div) != 0;



            Xpath.iterate('*//ul', function(ul) {

                var links = LinksHelper.getUserLinks(id, {'noSend': hasWriteTo, 'noFriends' : hasFriendsOf});

                var t = [];

                links = t.concat(links);

                if (!hasFavLink) {

                    links.push(new FavouritesLink({

                        'id': id,

                        'addMode': true,

                        'pictureMode': false

                    }));

                } else {

                    links.pop();

                }

                if( (useSearch && !inviteMode) || (useInvite && inviteMode) ) {

                    Append.appendToUl(ul, links);

                }

            }, div);

        });

    }



    // Groups

    function browseProcessor(){

        if(false == Settings.autoLoad('groups')) {

            return;

        }

        Xpath.iterate("//li/a[starts-with(@href, '/club')]", function(link){

            var idGroup = link.getAttribute('href').match(/club(\d+)/i)[1];

            var element = link.parentNode.parentNode;

            var l = LinksHelper.getGroupLinks(idGroup);

            l.push(new FavouritesLink({'id':idGroup, 'groupMode': true, 'addMode': true, 'pictureMode': false}));

            Append.appendToUl(element, l);

        });

    }



    /**

     * Profile page processor

     */

    function profileProcessor(){

        //Console.log('Profile processor');

        if(false == Settings.autoLoad('deletedPages')) {

            return;

        }

        var rightCol = document.getElementById('rightColumn');

        if (rightCol) {

            return;

        }

        /**

         *  When it's user's deleted profile, do our job

         */

        var idUser = location.href.match(/id[=]?([\d]+)/i)[1];

        var element = document.createElement("ul");

        element.id = 'nav';

        var l = LinksHelper.getUserLinks(idUser);

        l.push(new FavouritesLink({'id':idUser, 'addMode': true, 'pictureMode': false}));

        Append.appendToUl(element, l);

        document.getElementById('header').appendChild(element);

    }


    /**

     * Info processor

     */

    function infoProcessor(){

        //Console.log('Info processor');
	//alert('Info processor');



        if ( document.getElementById('personal') ) {

            return;

        }



        var idUser = location.href.match( /id[=]?([\d]+)/i )[1];



        var links = LinksHelper.getUserLinks( idUser, {'noSend': true } );

        links.push( new FavouritesLink( {'id':idUser, 'addMode': true, 'pictureMode': false} ) );

	for (i in links) {
		document.getElementById( 'profileActions' ).appendChild( links[i] );
		}

    }



    /**

     * Settings processor

     */

    function settingsProcessor() {

        var e = document.createElement('div');

        e.setAttribute('id', 'vkadd_settings');

        e.setAttribute('class', 'settingsPanel');

        var header = document.createElement('h4');

        header.innerHTML = Lang.text('settings', 'title');

        e.appendChild(header);

        var boxes = [];

        jeach(Settings.list, function(key, val) {

            if(typeof(val.internal) == 'undefined') {

                boxes.push( {

                    'description' :val.description,

                    'checkbox': (new SettingsCheck({'key': key}))

                });

            }

        });



        e.appendChild(new SettingsTable({'checkboxes':boxes}));

        

        jeach([

            { 'href' : Const.groupPage, 'title' : Lang.text('links', 'groupTitle') },

            { 'href' : Const.homepage, 'title' : Lang.text('links', 'homepageTitle') },

            { 'href' : Const.author, 'title' : Lang.text('links', 'authorTitle') }    

        ], function(k, val) {

            var link = createLink(val.href, val.title);

            link.style.padding = '4px';

            e.appendChild(link);        

        });

        

        Xpath.iterate("//div[@id='content']/div[@class='editorPanel clearFix']", function(o) {

            o.insertBefore(e, o.hasChildNodes() ? o.childNodes[0] : null);

        });

    }



    Images = {

        'online': 'data:image/gif;base64,R0lGODlhDwAPAPcAAAAAAAAAALVCShAACFIxQhgAEEIAOWsAa1IAUjEAMVopWhAIEIR7hHtze8aEzloAcxgAOQAAMQAAIYyl3gAQMWN7nGOczgAQEAAICITvnHPnhEJ7SmvOcwAxAAAYAAAIAEJKQggYABg5CBAhCEprOSFKCBgxCCFCCAgQABAYCAgIAIyMKZSUMZSUOf//a///c///e///hP//jL29a/f3jP//lKWlY+fnjP//nP//rdbWlP//tf//vf//xv//zv//1v//3t7WObWtMf/3St7WQtbOQv/3Ut7WSu/nUtbOSv/3Wt7WUv/3Y97WWv/3a//3c//3e//vOf/vQpSMKZSMMb21Su/ne//nGHNrGGtjGIR7IdbGOXNrIf/vUvfvpefOCN7GCM61CMatCL2lCN7GEGNaGP/eCPfWCOfGCLWcCP/eEPfWEP/eGO/OGP/WCPfOCHtjEMZSGFoYCIwpELUxGFoQCLUpGIxCOYQYEPcxKQgAAFoICIQQEP8hIe8hIa0YGOchIbUhIf9ra/97e9Zzc4RaWv+1te/v7+fn597e3tbW1sbGxrW1taWlpZycnJSUlISEhGtrayEhIRgYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJQALAAAAAAPAA8ABwhqACkJpLShIEGDAwduyJCBw8KGGxIKXKjBYYaKERUWvGgRo8GHGTZghMjQoUgNKDc47OiRg0uXG1yofOnwYMGYLmTejAgSokyGJTeiXLmQYkuYJEO+5Cm0o8mMEzlSrClx5kqYEid+RCgwIAA7',

        'offline': 'data:image/gif;base64,R0lGODlhDwAPAPcAAAAAAP///7VCShAACFIxQhgAEEIAOWsAa1IAUjEAMVopWhAIEIR7hHtze8aEzloAcxgAOQAAMQAAIYyl3gAQMWN7nGOczgAQEAAICITvnHPnhEJ7SmvOcwAxAAAYAAAIAEJKQggYABg5CBAhCEprOSFKCBgxCCFCCAgQABAYCAgIAIyMKZSUMZSUOf//a///c///e///hP//jL29a/f3jP//lKWlY+fnjP//nP//rdbWlP//tf//vf//xv//zv//1v//3t7WObWtMf/3St7WQtbOQv/3Ut7WSu/nUtbOSv/3Wt7WUv/3Y97WWv/3a//3c//3e//vOf/vQpSMKZSMMb21Su/ne//nGHNrGGtjGIR7IdbGOXNrIf/vUvfvpefOCN7GCM61CMatCL2lCN7GEGNaGP/eCPfWCOfGCLWcCP/eEPfWEP/eGO/OGP/WCPfOCHtjEMZSGFoYCIwpELUxGFoQCLUpGIxCOYQYEPcxKQgAAFoICIQQEP8hIe8hIa0YGOchIbUhIf9ra/97e9Zzc4RaWv+1te/v7+fn597e3tbW1sbGxrW1taWlpZycnJSUlISEhGtrayEhIRgYGP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAPAA8ABwhoACkJpFSoIEGDAwcWMsRwYcOEAhcOIiSRYsKCFTMadGhoIUVDHxtKHNSR4sdBEwsSWrmykItCLFsexOiiJsaNDBlSfJkTZEFDKE0uHEkRZkufPlkWmgn0ZNGlCptmhEhQqVKqM7MODAgAOw==',

        'delete' : 'data:image/gif;base64,R0lGODlhDwAPAKIFAP///8zMzGZmZpmZmTMzM////wAAAAAAACH5BAEAAAUALAAAAAAPAA8AAAM2WLrcTtApSGtcJOgw+hAEY40NAWge+ABDIAyEWrIuLIv0G4dzq9+YnI2H8w1XqA5wMrpInoUEADs=',

        'add'    : 'data:image/gif;base64,R0lGODlhDwAPAPcAAAQCBCyKBJzehGy+PGTCTAxGBGyqTNz2xHzWJJTeTAweBESeFMzupCR6BITWbGzSPAQOBLTuhITCXCRaDHSuXOz63EyuLESaDLTmlGTCPBxCFKTiZAwqBEyeHIzeRAQKBDSKDKTejHTOVGyqVOT21ITaNEyeFMzyrDx6JHTSRAQWBIzGXHSuZPT67GzCPCRKHKTqZBQmDIB3AAAAAAAA2AAA6QAAFwAAAID/4JH/7Xf/7wAAdkgAgAEAO3IA1gAAAACoRQADAAAAAAAAANhXeB8B3ngBdQABAACMAADmAHIXcgAAAAjeAADOAADTAAh1AABkAAD7AAAXcgEAAIB4EHAc7X/5dQB2AIDxAHBSAH/wAAB2AJj+nyX/y3f/DAD/dgiXYQC3AADwAAB2AAD4ZACy6SDwFwB2AAAARQAAAHIAAAAAAADgwAAfbgB4RgAAAGzgAOcfABd4AAAAAKuQALbvAPDvAHZ2ADA0gQEAtXIA8ADAdpeoTrfn2/AX03YAdV0ZuyjMjBfTFwB1AAAAAAAAAAByAAAAAAAABwAAAHIAAAAAAODYAB8fAHh4AAAAANgAAKUAYHwAdgAAAADKAABCAADUAAB1AAAAAAABAAAAAAAAAAvcAADnAAAXAAAAAFcAAAAAAAAAAAAAAHgAWwEBv3IA0wAAdUjK/tRC/3fU/wB1/0jcTgHn23IX0wAAdQBQFQBHAADVAAB1AAAAFQDoAHIXAAAAAEgA0AEB7XIAFwAAAOjK/ztC/4DU/wB1/4AAAJEAAHcAAAAAAEgYCAEA6XIAFwAAAAJcBgBDnQDUTAJ1AAAA6AAA6AAAFwAAAI0EdwDpcAAXT40AAHWXHABD6QDUFwB1ABxEXOaNQxdP1AAAdQBgsQKY6gBPFwAAAAMA6QAB/wAA/wAAf3gAnBzo6vkXF3YAAIAAAAABAAAAAAAAAA24XABDQwDU1AB1dZcBALcAAPAAAHYAAPEABx4wjQAAF+92AHXwKAClZwAMdgB2AOgYgTvoRYAXSAAAACH5BAEAAAAALAAAAAAPAA8ABwh3AAEIHEiwoMGDByHEWAgBoUANIhwQ0OAQwAsBFUZwSPjiBQoBBwxMKPCi4cAYIkKEwMBAwoAHFhQQjOGgBYkTETZ4QBBAxcwBLEasgDFgwYUGPgdC0MBhgosEHQpw2HjwxYMSC6gifGEhQAOtCRVASFqxrFkAAQEAOw==',

        'loader' : 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='        

    };



     function eraseRedirectionLinks() {

        var prefix = "http://vkontakte.ru/away.php?to=";

        var path = "//a[starts-with(@href, '" + prefix + "')]";

        Xpath.iterate(path, function(link) {

            var encodedHref = link.href.substr(prefix.length);

            link.href = unescape(encodedHref.replace(/\+/g, " "));

            link.target = "";

        });

    }



    function eraseAdvertisement() {

        jeach([

        "//a[starts-with(@href, '/ads.php')]",

        "//a[starts-with(@href, 'help.php?page=target')]",

        "//iframe", "//div[starts-with(@id, 'banner')]"

        ], function(key,val) {

            Xpath.iterate(val, function(link) {

                if(link.getAttribute('id') != 'editFrame') {

                    link.style.display = 'none';

                }

            });

        });

    }

    

    

    function appendWallpost (e) {

        if(e.innerHTML.match(/online/i)) {                

            e.innerHTML = '<div style="margin-left:17px;padding-top:2px;">Online</div>';

            e.style.margin = '0px';

            e.style.height = '16px';

            e.style.background = 'url('+Images['online']+') bottom left no-repeat';

        }

    }



    function appendWallpost2 (e) {

        if(e.innerHTML.match(/online/i)) {                

            e.innerHTML = '<img src="'+Images['online']+'"/>';

        }

    }



    function appendOnlineProfile(e) {

        e.innerHTML = '';

        e.setAttribute('align', 'right');                

        var img = document.createElement('img');

        img.src = Images['online'];

        e.appendChild(img);                

    }

        

    function onlineText() {

        Xpath.iterate('//*[@class="messageFrom"]//div', appendWallpost);

        Xpath.iterate('//span[@class="bbb"]', appendWallpost2);

        Xpath.iterate('//div[@id="wrapHI"]//div[@id="header"]//h1//b', appendOnlineProfile);

        Xpath.iterate('//table[@class="wallpost"]//td[@class="image"]//div', appendWallpost);

    }

    

    function domTest(event) {

        var element = event.target;

        try {

            if(!element.getAttribute('id').match(/wPostContainer/i)) {

                return;

            }

        } catch (ex) {

            return;

        } finally {

            

        }

        Xpath.iterate('//td[@class="image"]//div', appendWallpost, element);

    }



    function cleanSidebar() {

        Xpath.iterate( '//*[@id="sideBar"]//li//a', function(link) {

            var html = link.innerHTML.split(' ');

            if(html.length > 3) {

                link.innerHTML = html.slice(1).join(' ');

            }

        });        

    }

    

    function checkCommonGroups() {

        Xpath.iterate('//[@id="groups"]//*[@class="flexBox clearFix aPad"]//a', function(link) {

            //console.log(link);

        });

    }

    function albumProcessor() {

        if(!Settings.autoLoad('albumsFlashUpload')) {

            return;

        }

        Xpath.iterate("//a[starts-with(@href, 'photos.php?act=add')]", function(link) {

           link.href = link.href.replace('act=add&', 'act=add_flash&').replace('gid=', 'oid=-')

        });

    }

    

    function videoProcessor() {

        if(!Settings.autoLoad('videoLinks')) {

            return;

        }

        var t = document.getElementsByTagName('script');

        jeach(t, function(key, k) {

            var m = k.innerHTML.match(/vtag:'(.*?)',/);

            if(m) {

                var vtag = m[1];

                var vkid = k.innerHTML.match(/vkid:'(.*?)',/)[1];

                var host = k.innerHTML.match(/host:'(.*?)',/)[1];

                GM_xmlhttpRequest({

                    method: 'GET',

                    url: "http://vkadre.ru/get_video?version=1&vtag="+vtag+"&vkid="+vkid,

                    onload: function(resp) {

                            try {

                                var XMLResponce = (new DOMParser()).parseFromString(resp.responseText, "text/xml");

                                var link = XMLResponce.getElementsByTagName('location')[0].firstChild.nodeValue;

                            } catch (ex) {

                            

                            } finally {

                                var e = document.createElement("a");

                                e.href = link;

                                e.innerHTML = Lang.text('links', 'downloadVideo');

                                e.style.fontWeight = 'bold';

                                document.getElementById("videoactions").appendChild(e);     

                            }

                    }

                });

                return false;

            }

        });



    }

    function processSoundLink(link) {

        var data = link.getAttribute('id').match(/(imgbutton|imgbuttonWall)(\d+)/i)

        var id = data[2]

          var str = link.getAttribute("onclick");

        var re=/(operate|operateWall)\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;

        var arr=re.exec(str);

        var user=arr[4];

        if (user<100000) {

            user=parseInt(user)+100000;

            user=(user.toString()).substr(1);

        }

        var newHref = "http://cs"+arr[3]+".vkontakte.ru/u"+user+"/audio/"+arr[5]+".mp3"

        var key = data[1] == 'imgbutton' ? 'title' : 'titleWall'

        var node = document.getElementById(key+id).parentNode

        var linkTitle = Lang.text('links', 'downloadAudio')

        node.innerHTML += " | <a target='_blank' href='"+newHref+"'>"+linkTitle+"</a>"

    }

    function soundLinks() {

        Xpath.iterate("*//img[starts-with(@id, 'imgbutton')]", function(link) {

            processSoundLink(link)

        })   

    }

    function friendsProcessDiv(e) {

            var data = e.getAttribute('id').toString().match(/fr_res([\d]+)/i);

            if (!data) {

                return;

            }

            var alreadyDone = Xpath.count("*//a[contains(@href, 'photos.php?')]", e) != 0;

            if (alreadyDone) {

                return

            }

            var idUser = data[1];

            var l = LinksHelper.getUserLinks(idUser, {'noSend': true, 'noFriends' : true});

            l.push(new FavouritesLink({'id':idUser,  'addMode': true, 'pictureMode': false}));

            Append.appendToUl(e.getElementsByTagName('ul')[0], l);

    }

	

    function friendsProcessor() {

		if (! Settings.autoLoad('myFriends') ) {

			return

		}

        Xpath.iterate("*//div[starts-with(@id, 'fr_res')]", friendsProcessDiv);

        domProc = function (event) {

            var e = event.target;

            if (!typeof(e) == 'object' || !e.tagName || e.tagName.toUpperCase() != 'DIV' || !e.hasAttribute('id')) {

                return;

            }

            friendsProcessDiv(e)

        }

        document.addEventListener('DOMNodeInserted', domProc, false);

    }

    

    function uploadPhotosProcessor() {

        if (! Settings.autoLoad('appendUploadPhotos') ) {

            return

        }

        Xpath.iterate("*//table[@class = 'formTable']/tbody/tr[@class = 'tallRow']/td[2]", function(e) {

            e.innerHTML += '<input type="file" name="file4" id="file4" size="22" class="upload"/>'

            e.innerHTML += '<input type="file" name="file5" id="file5" size="22" class="upload"/>'

            e.innerHTML += '<input type="file" name="file6" id="file6" size="22" class="upload"/>'

        })

    

    }

    

    // Entry function. Detects page by regex and calls appropriate processor

    function run() {

        VersionControl.init();

        if(Settings.autoLoad('awayLinks')) {

            eraseRedirectionLinks();

        }

        if(Settings.autoLoad('eraseAds')) {

            eraseAdvertisement();

        }

        /*if(Settings.autoLoad('sidebarOneWord')) {

            cleanSidebar();

        }*/

        if(Settings.autoLoad('onlineTextToImage')) {

            document.addEventListener('DOMNodeInserted', domTest, false);

            onlineText();    

        }

        if(Settings.autoLoad('audioLinks')) {

            soundLinks();

        }

        jeach ([

        {

            // Album | photos processor

            'regex': /\/(album|photos)/i,

            'processor': albumProcessor

        }, {

            // Favourites processor

            'regex': /\/fave.php/i,

            'processor': faveProcessor

        }, {

            // Extended "invite to group" mode

            'regex': /\/search.php/i,

            'processor': searchProcessor

        } , {

            // New-style "friends page" processor

            'regex': /\/(friends).php/i,

            'processor': friendsProcessor

        }, {

            // New-style "search" page processor

            'regex': /\/gsearch.php/i,

            'processor': newSearchProcessor

        }, {

            // Groups processors

            'regex': /\/(browse|groups).php/i,

            'processor': browseProcessor

        }, {

            // Profile processor

            'regex': /\/(profile.php|id[0-9]+)/i,

            'processor': profileProcessor

        }, {          
            // Info processor

            'regex': /\/(id[0-9]+)/i,

            'processor': infoProcessor

        }, {

            // Settings page processor

            'regex': /\/settings.php($|\?[0-9]+|\?m=[0-9]+)/i,

            'processor': settingsProcessor

        }, {

            // Video page processor

            'regex': /\/(video|video-)(\d+)_(\d+)/i,

            'processor': videoProcessor

        }, {

            'regex': /\/photos.php\?act=add/i,

            'processor' : uploadPhotosProcessor

        

        }], function(key, val) {

            var match =    location.href.match(val.regex);

            if (match) {

                return (val.processor)(match);

            }

        });

    }



    

    /**

     * Entry Point :)

     */

    //GM_addStyle('.mailbox table tr.newRow { background-color: #DEE1E3; }');

    run();



})();