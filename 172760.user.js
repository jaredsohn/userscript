// ==UserScript==
// @id   github-better-search
// @name Github Better Search
// @namespace http://efcl.info/
// @version 1.0
// @description Enhance Github Search
// @include https://github.com/*
// @require https://raw.github.com/azu/Github-better-search/master/dispatcher.js
// @require https://raw.github.com/azu/Github-better-search/master/purl.js
// @run-at  document-end
// ==/UserScript==
(function (){
    var URLHandler = {
        onSearch: function (){
            Github.insertCurrentLanguage();
            // 検索画面はpjax的なので読み終わったらもう一度付け直す
            // 子ノードが変更されたら
            var observerTarget = util.selector("#container");
            util.addMutationEvent(observerTarget, "childList", function (mutationEvent){
                Github.insertCurrentLanguage();
            });
        },

        onRepository: function (){
            Github.selectRadioBox(Github.selectRadioType.global);
        },

        onOther: function (){
        }

    };

    var Github = (function (){

        /**
         * Github Search の検索オプション
         * @type {{repository: string, global: string}}
         */
        var selectRadioType = {
            repository: "repository",
            global: "global"
        };

        /**
         * 検索オプションの選択をする
         * @param {selectRadioType|String} radioType
         */
        function selectRadioBox(radioType){
            var searchTarget = document.getElementsByName("search_target");
            for (var i = 0, len = searchTarget.length; i < len; i++) {
                var input = searchTarget[i];
                // Hidden Radioを更新する
                var inputValue = input.value;
                input.checked = (inputValue === radioType);
                // update label
                var label = util.selector(".js-select-button");
                label.textContent = inputValue;
            }
        }

        function searchInPublic(word){
            var searchBasedURL = "https://github.com/search?q=";
            location.href = searchBasedURL + word;
        }

        function searchInRepository(word){
            // user/repoName
            var repositoryPath = getRepositoryInfo(repositoryInfoType.repository_nwo);
            var searchBasedURL = "https://" + repositoryPath + "/search?q=";
            location.href = searchBasedURL + word;
        }

        /**
         *
         * @type {{user_id: string, user_login: string, repository_id: string, repository_nwo: string, repository_public: string, repository_is_fork: string, repository_network_root_id: string, repository_network_root_nwo: string}}
         */
        var repositoryInfoType = {
            "user_id": "user_id",
            "user_login": "user_login",
            "repository_id": "repository_id",
            "repository_nwo": "repository_nwo",
            "repository_public": "repository_public",
            "repository_is_fork": "repository_is_fork",
            "repository_network_root_id": "repository_network_root_id",
            "repository_network_root_nwo": "repository_network_root_nwo"
        };

        /**
         * Repository DOM info
         * @param {repositoryInfoType} infoType
         */
        function getRepositoryInfo(infoType){
            var info = window._octo[infoType];
            if (info == null) {
                util.throwError(new Error("Not found" + infoType));
            }
            return info;
        }

        function getSearchLanguage(){
            return purl(location.href).param("l");
        }

        function insertHiddenLang(currentLang){
            if (currentLang == null) {
                return;
            }
            var searchForm = util.selector("#search_form");
            var id = "GM_Github_Better_Search_Lang";
            var hiddenLang = document.getElementById(id);
            if (hiddenLang == null) {
                hiddenLang = document.createElement("input");
                hiddenLang.name = "l";
                hiddenLang.id = id;
                hiddenLang.type = "hidden";
                searchForm.appendChild(hiddenLang);
            }
            hiddenLang.value = currentLang;
        }

        function insertCurrentLanguage(){
            var currentLang = getSearchLanguage();
            insertHiddenLang(currentLang);
        }

        return {
            insertCurrentLanguage: insertCurrentLanguage,
            selectRadioType: selectRadioType,
            selectRadioBox: selectRadioBox,
            searchInPublic: searchInPublic,
            searchInRepository: searchInRepository
        }
    })();

    var util = (function (){
        function selector(selector){
            var result = document.querySelector(selector);
            if (result == null) {
                throwError(new Error("Not found" + selector));
            }
            return result;
        }

        function selectorAll(selector){
            var result = document.querySelectorAll(selector);
            if (result == null) {
                throwError(new Error("Not found" + selector));
            }
            return result;
        }

        /**
         * throw error & notification error
         * @param {Error} error
         */
        function throwError(error){
            if (typeof GM_notification !== "undefined") {
                GM_notification(error.message, GM_getMetadata("name") + " is Error");
            }
            throw error;
        }

        /**
         * MutationObserverInit
         * @type {{attributes: string, childList: string, characterData: string}}
         * @see http://dom.spec.whatwg.org/#mutationobserverinit
         */
        var MutationEventType = {
            "attributes": "attributes",
            "childList": "childList",
            "characterData": "characterData"
        };

        /**
         * simple MutationObserver wrapper
         * @param {Node} target
         * @param {MutationEventType|String} type
         * @param {Function} listener
         */
        function addMutationEvent(target, type, listener){
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var observer = new MutationObserver(function (mutations){
                mutations.forEach(function (mutation){
                    if (mutation.type === type) {
                        listener(mutation);
                    }
                });
            });
            observer.observe(target, {
                attributes: type === MutationEventType.attributes,
                childList: type === MutationEventType.childList,
                characterData: type === MutationEventType.characterData
            });
        }

        return {
            selector: selector,
            selectorAll: selectorAll,
            throwError: throwError,
            addMutationEvent: addMutationEvent
        };
    })();

    (function main(){
        dispatcher
            .connect(/^\/search/, URLHandler.onSearch)
            .connect(/^\/.*?\//, URLHandler.onRepository)
            .connect(/^\/.*?/, URLHandler.onOther)
            .dispatch();

    })();
})();