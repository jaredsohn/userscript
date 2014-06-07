// ==UserScript==
// @name        Emoji in right menu
// @namespace   http://daix.me
// @description Insert emoji by right clicking
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var emoji_groups = localStorage.getItem('gm_emoji')
    if (!emoji_groups) {
        emoji_groups = [{
            'name': '熊',
            'emojis': [
                '=͟͟͞͞ʕ•̫͡•ʔ',
                '(￣(エ)￣)',
                '(●￣(ｴ)￣●)'
            ]
        }, {
            'name': 'Orz',
            'emojis': [
                '_(:з」∠)_'
            ]
        }, {
            'name': '脸',
            'emojis': [
                '(｡･ω･｡)',
                '(*ノ・ω・)ノ'
            ]
        }]
        localStorage.setItem('gm_emoji', JSON.stringify(emoji_groups))
    }
    emoji_groups = JSON.parse(emoji_groups)


    var config = {
        menu_id: 'gm_emoji_menu',
        template: '<menuitem label="{emoji}" onclick="window.GM_EMOJI.insert(this)"></menuitem>'
    }

    var format = function(template, data) {
        return template.replace('{emoji}', data)
    }
    var all_menus = ''
    var menus = emoji_groups.forEach(function(group) {
        var menu = document.createElement('menu')
          , innerStr = ''
        menu.setAttribute('label', group.name)
        group.emojis.forEach(function(emoji) {
            innerStr += format(config.template, emoji)
        })
        menu.innerHTML = innerStr
        all_menus += menu.outerHTML
    })

    var menu = document.createElement('menu')
    menu.setAttribute('type', 'context')
    menu.setAttribute('id', config.menu_id)
    menu.innerHTML = all_menus
    document.body.appendChild(menu)

    var textareas = document.querySelectorAll('textarea')
    Array.prototype.slice.call(textareas, 0).forEach(function(textarea) {
        textarea.setAttribute('contextmenu', config.menu_id)
    })

    window.GM_EMOJI = {
        _insertAtCaret: function(textarea, content) {
           if (textarea.selectionStart || textarea.selectionStart == '0') {
               var startPos = textarea.selectionStart
                 , endPos = textarea.selectionEnd
                 , scrollTop = textarea.scrollTop
               textarea.value = textarea.value.substring(0, startPos)+content+textarea.value.substring(endPos,textarea.value.length)
               textarea.focus()
               textarea.selectionStart = startPos + content.length
               textarea.selectionEnd = startPos + content.length
               textarea.scrollTop = scrollTop
           }
        },
        insert: function(menuitem) {
            var emoji = menuitem.getAttribute('label')
              , textarea = document.activeElement
            this._insertAtCaret(textarea, emoji)
        }
    }
})()
