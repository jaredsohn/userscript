// ==UserScript==
// @name            Mamba search view new
// @author          olecom
// @namespace       mamba
// @description     Улучшенный поиск и фильтрация несимпатичных фотографий без рекламы
// @match           http://www.mamba.ru/*
// @match           http://www.mamba.ru/*/*
// @match           http://love.mail.ru/*
// @match           http://love.mail.ru/*/*
// @version         0.8
// ==/UserScript==

function uglify_js(w ,d ,con){
    var j ,el

    if(w.location.pathname === '/') return false

    j = setTimeout(on_load, 123)

    // remove ads
    rm_class("MainBlockContainer", "MainBlockLeft")
    rm_class("MainBlockRight", "mordolenta")

    try {// fix Firefox.noscript issue
        el = d.createElement("div"), el.setAttribute("id", "banner_xgemius")
        d.children[0].appendChild(el)
        el = null
    } catch(e){}

    return true

    function rm_class(p, c){
        try {
            d.getElementsByClassName(p)[0].removeChild(d.getElementsByClassName(c)[0])
        } catch(e){}
    }

    function on_load(){
        var a ,ul ,oid ,i ,f
           ,page_timeout
           ,dev = !!con && !true// development/debug mode

        clearTimeout(j)

if(dev) con.log('hi')

        // add buttons: forget, auto next, next
        try {
            a = d.getElementsByClassName("ui-userbar-empty")[0]
            if(!a){
                a = d.getElementsByClassName("lang-selector")[0]
                if(!a) return con.warn('No "ui-userbar-empty" or "lang-selector" found!')
            }
        } catch(e){
            con.log('Error: "ui-userbar-empty" or "lang-selector"')
            return con.dir(e)
        }
        w.addEventListener('keydown', on_keydown, true)
// export button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">Экспорт</div>' +
                       '<div class="baloon tl show-hover baloon-with-close" style="min-width: 411px">' +
                       '<div class="make-top-noprocess-block">' +
'Скопировать данные о просмотренных анкетах в буфер обмена<br>' +
'для переноса в другой профиль/браузер/сохранение в файл' +
                       '</div></div>'
        el.onclick = function prepare_export(){
            var s = '', t
            this.onclick = function(){}
            this.preCopyExportHTML = this.innerHTML
            this.innerHTML = '' +
'<div class="inset" style="color: red; overflow:hidden;">Нажмите <b>CTRL+C</b> и ждите...' +
'  <textarea style="position:absolute; top:-12px; width:1px;height:1px;">' +
'     copy|paste' +
'  </textarea>' +
'</div>'
            el = this.children['0'].children['1']//textarea
            j = 0
            for(t in localStorage) if(t){
                if('-' == localStorage[t]){// light
                    s += t + '\n'
                    j++
                } else if('_' == localStorage[t]){// hard
                    s += t + '#\n'
                    j++
                }
            }
            el.value = s
            el.focus()
            el.select()
            this.lengthExport = j.toString()
            el = this// -> on_keydown()
        }
        a.parentElement.insertBefore(el, a)

// import button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">Импорт</div>' +
                       '<div class="baloon tl show-hover baloon-with-close" style="min-width: 411px">' +
                       '<div class="make-top-noprocess-block">' +
'Внести данные об анкетах;<br>' +
'<b>буфер обмена должен быть с номерами анкет </b><br>' +
'(скопированными из файла или экспортированны из другого браузера/профиля)<br><br>' +
'Для того чтобы очистить всю память, нужно в консоли ввести команду: <i><b>localStorage.clear()</b></i>' +
                       '</div></div>'
        el.onclick = function prepare_import(){
            var s = '', t
            this.onclick = function(){}
            this.prePasteImportHTML = this.innerHTML
            this.innerHTML = '' +
'<div class="inset" style="color: red; overflow:hidden;">Нажмите <b>CTRL+V</b> и ждите...' +
'  <textarea style="position:absolute; top:-12px; width:1px;height:1px;">' +
'     copy|paste' +
'  </textarea>' +
'</div>'
            el = this.children['0'].children['1']//textarea
            el.value = ''
            el.focus()
            el.select()
            el = this// -> on_keydown()
        }
        a.parentElement.insertBefore(el, a)

// forget button on anketa/user page
        if(w.location.href.match(/fromsearch/) || !w.location.href.match(/search[.]phtm/)){
            rm_class('anketa_bottom', 'b-people__similar')// remove ads
if(dev) con.log('anketa')

            for(i = 0, el = d.getElementsByClassName("b-anketa_inset-form"); i < el.length; i++){
                if(/[\d][\d][\d] см/.test(el[i].innerHTML)){// human height
                    oid = el[i].innerHTML.match(/[^><]* см/)[0]
                    break
                }
            }

            el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
            el.innerHTML = '<div class="inset" style="color: red">' + (oid ? oid : '') +
' Забыть анкету</div>' +
                           '<div style="min-width: 280px;" class="baloon tl show-hover baloon-with-close ">' +
                           '<div class="make-top-noprocess-block">' +
'Скрыть анкету в поиске; не понравилась' +
                           '</div></div>'

            el.onclick = function forget_item(){
                var id

                if(!/[/]mb[\d]*[/#?]/.test(w.location.href)){//text ID from URL
                // URL examples with text ID:
                // http://www.mamba.ru/mega_baba
                // http://www.mamba.ru/mega_baba?hit=10&fromsearch&sp=4
                // http://www.mamba.ru/mega_baba/albums?sp=4
                // http://www.mamba.ru/mega_baba/album_photos?album_id=1170973545&#closed
                // RE gets this part:  ^^^^^^^^^
                    id = w.location.href.replace(/http[s]*:[/][/][^/]*[/]([^/?#]*).*$/ ,'$1')
                } else {//numeric ID on page
                    id = d.getElementsByClassName("mb5 fl-l")[0].innerHTML
                          .replace(/ID: ([^,]*),.*$/,'$1')
                }
if(dev) con.log('forgetting "' + id + '": ' + localStorage[id])
                localStorage[id] = '_'
                this.innerHTML = ''
            }
            return a.parentElement.insertBefore(el, a)
        }

// autoprev button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">' +
                       (localStorage['aprev'] ?
'<b>Само</b> назад идёт' :
'Само <b>назад</b> включить') +
                       '</div><div style="min-width: 280px;" class="baloon tl show-hover baloon-with-close ">' +
                       '<div class="make-top-noprocess-block">' +
'Автоматически переходить на предыдующую, если на странице только безынтересные анкеты' +
                       '</div></div>'
        el.onclick = function automatic_prev_page(){
            var an = !localStorage['aprev']
            localStorage['aprev'] =  an ? '+' : ''
            this.innerHTML = '<div class="inset">' + (an ?
'<b>Само</b> назад идёт' :
'Само <b>назад</b> включить') + '</div>'
            an ? on_keydown_back() : clearTimeout(page_timeout)
        }
        a.parentElement.insertBefore(el, a)

// next backwards button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">Дальше <b>Назад</b></div>' +
                       '<div style="min-width: 280px;" class="baloon tl show-hover baloon-with-close ">' +
                       '<div class="make-top-noprocess-block">' +
'Перейти на предыдущую страницу поиска, пометить все фотки (кроме выбраных) как безынтересные<br><br>' +
'Клавиши кроме <b>[0]</b>-<b>[9]</b>, <b>[пробел]</b>, <b>[ввод]</b>, эквивалентны нажатию этой кнопки<br><br>' +
'Переход на следущую страницу через обычную листалку (снизу) ничего не помечает' +
                       '</div></div>'
        el.onclick = on_keydown_back
        a.parentElement.insertBefore(el, a)

// autonext button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">' +
                       (localStorage['anext'] ?
'<b>Само</b> вперёд идёт' :
'Само <b>вперёд</b> включить') +
                       '</div><div style="min-width: 280px;" class="baloon tl show-hover baloon-with-close ">' +
                       '<div class="make-top-noprocess-block">' +
'Автоматически переходить на следующую, если на странице только безынтересные анкеты' +
                       '</div></div>'
        el.onclick = function automatic_next_page(){
            var an = !localStorage['anext']
            localStorage['anext'] =  an ? '+' : ''
            this.innerHTML = '<div class="inset">' + (an ?
'<b>Само</b> вперёд идёт' :
'Само <b>вперёд</b> включить') + '</div>'
if(dev) con.log('automatic next page: ' + (an ? 'yes' : 'no'))
            an ? on_keydown() : clearTimeout(page_timeout)
        }
        a.parentElement.insertBefore(el, a)

// next button
        el = d.createElement("div") ,el.setAttribute("class", "btn-group-item")
        el.innerHTML = '<div class="inset" style="color: red">Дальше <b>Вперёд</b></div>' +
                       '<div style="min-width: 280px;" class="baloon tl show-hover baloon-with-close ">' +
                       '<div class="make-top-noprocess-block">' +
'Перейти на следующую страницу, пометить все фотки (кроме выбраных) как безынтересные<br><br>' +
'Клавиши кроме <b>[0]</b>-<b>[9]</b>, <b>[пробел]</b>, <b>[ввод]</b>, эквивалентны нажатию этой кнопки<br><br>' +
'Переход на следущую страницу через обычную листалку (снизу) ничего не помечает' +
                       '</div></div>'
        el.onclick = on_keydown
        a.parentElement.insertBefore(el, a)

        // scan and fade away items of "no interest"
        try {
            d.getElementsByClassName('MainBlockRight')[0].style.width = '100%'// some style
            ul = d.getElementsByClassName('MainBlockRightSearch')[0].children[0]
            if(!ul) return con.warn('No "MainBlockRightSearch" found!')
        } catch(e){ return con.log("MainBlockRightSearch"), con.dir(e) }

        w.scroll(0, 237)

        j = 0 ,f = false
        for(i = 0; i < ul.childElementCount; i++){
/*  <ul><li[i]>                         | children[i]
    <div class="opacity>                | children[0]
        <div class="sr-ico-count"/>
        <div class="u-m-photo u-photo"> | children[1]
            <a href="http://www.mamba.ru/anketa.phtml?oid=0123456789&hit=10&fromsearch&sp=14">
                                        | children[0]  RE=^^^^^^^^^^
                     http://www.mamba.ru/mb0123456789?hit=10&fromsearch&sp=1
                                        RE=^^^^^^^^^^
                <img>                   | children[0]
            </a>
        </div>
        ...
    </div></li[i]>
    ...
    </ul>  */
            a = ul.children[i]
            a.style.width = '33%' ,a.style.margin = '0'// some style
            a.children[0].style['min-height'] = '168px'// some style
            a = a.children[0].children[1].children[0]
            if(/oid=/.test(a.href)){
                oid = a.href.replace(/.*oid=([^&]*).*$/ ,'$1')
            } else if(/[/]mb[\d]*[?]/.test(a.href)){
                oid = a.href.replace(/.*[/]mb([^?]*).*$/ ,'$1')
            } else {
                oid = a.href.replace(/.*[/]([^?]*).*$/ ,'$1')
            }
if(dev) con.log('id search: ' + oid)
            if(w.localStorage[oid] === '-' || w.localStorage[oid] === '_'){
                j += 1
                if(w.localStorage[oid] === '-'){
                    a.style.opacity = a.children[0].style.opacity = 0.8
                } else {
                    a.style.opacity = a.children[0].style.opacity = 0.4
                }
                a.onmouseover = function(){
                    this.style.opacity = this.children[0].style.opacity = 1
                }
                a.onmouseout = function(){
                    this.style.opacity = this.children[0].style.opacity = 0.8
                }
            } else {// forget inline
                el = d.createElement("a")
                el.innerHTML = 'Забыть'
                el.style.cursor = 'crosshair',el.style.color = 'red'
                el.onclick = function(id ,a ,el){ return function(){
if(dev) con.log('forgetting "' + id + '": ' + localStorage[id])
                     localStorage[id] = '_'
                     a.style.opacity = a.children[0].style.opacity = 0.4
                     el.innerHTML = ''
                }}(oid ,a ,el)
                a.parentNode.appendChild(el)
                if(!f) a.scrollIntoView(true) ,f = true// scroll to the first item
            }
            a.onmousedown = function(){// for marked and yet not marked items
                var t
                if(/oid=/.test(this.href)){
                    t = this.href.replace(/.*oid=([^&]*).*$/ ,'$1')
                } else if(/[/]mb[\d]*[?]/.test(this.href)){
                    t = this.href.replace(/.*[/]mb([^?]*).*$/ ,'$1')
                } else {
                    t = this.href.replace(/.*[/]([^?]*).*$/ ,'$1')
                }
if(dev) con.log('id clear: ' + t)

                localStorage[t] = '' // save or restore "interest"
                this.style.opacity = this.children[0].style.opacity = 1
                this.onmousedown = this.onmouseover = this.onmouseout = function(){}
            }
        }//for{}
if(dev && !j) con.log('all items in view')

        el = null
        if(j === ul.childElementCount){// nothing to look at
            if(w.localStorage['anext']){
                page_timeout = setTimeout(on_keydown ,4096)// give some time for switch off action
            } else if(w.localStorage['aprev']){
                page_timeout = setTimeout(on_keydown_back ,4096)
            } else w.scroll(0, 99999)
        }

        return true

        function on_keydown_back(){
            on_keydown(null, true)
        }

        function on_keydown(ev, backwards){
            if(el){
                if(el.preCopyExportHTML && ev.ctrlKey && 67 == ev.keyCode){
                    setTimeout(function clean_export(){
                        el.children['0'].children['1'].remove()//selection in chrome
                        el.innerHTML = el.preCopyExportHTML.replace(
                            /Экспорт[^<]*/,
                            'Экспорт (в буфере обмена ' + el.lengthExport + ' шт.)'
                        )
                        el.preCopyExportHTML = el.lengthExport = ''
                        el = null
                    }, 12)
                }
                if(el.prePasteImportHTML && ev.ctrlKey && 86 == ev.keyCode){
                    setTimeout(function clean_import(){
                        var t
                           ,val = el.children['0'].children['1'].value.split('\n')

                        if(!val.length){
                            el.innerHTML = el.prePasteImportHTML.replace(
                                /Импорт[^<]*/,
                                'Импорт, ошибка: пустой буфер!'
                            )
                            el = null
                            return
                        }
                        for(j = 0; j < val.length - 1; j++){
                            t = val[j]
                            if(!t){
                                el.innerHTML = el.prePasteImportHTML.replace(
                                    /Импорт[^<]*/,
                                    'Импорт, ошибка: пустые строки!'
                                )
                                el = null
                                return
                            }
                            if(~t.indexOf(' ')){
                                el.innerHTML = el.prePasteImportHTML.replace(
                                    /Импорт[^<]*/,
                                    'Импорт, ошибка: пробелы в номерах(' + j + ')!'
                                )
                                el = null
                                return
                            }
                        }
                        for(j = 0; j < val.length - 1; j++){
                            t = val[j]
                            if('#' == t[t.length - 1]){// hard
                                localStorage[t.substring(0, t.length - 1)] = '_'
                            } else {// light
                                localStorage[t] = '-'
                            }
                        }
                        el.innerHTML = el.prePasteImportHTML.replace(
                            /Импорт[^<]*/,
                            'Импорт (из буфера обмена ' + j + ' шт.)'
                        )
                        el.prePasteImportHTML = ''
                        el = null
                        setTimeout(function reload_page(){
                            location.reload()
                        }, 1234)
                    }, 12)
                }
                return
            }
            if(ev && ev.altKey) return// export/import || keydown garbage

            if(ul) for(i = 0; i < ul.childElementCount; i++){// scan and save "no interest"
                a = ul.children[i].children[0].children[1].children[0]
                if(/oid=/.test(a.href)){
                    oid = a.href.replace(/.*oid=([^&]*).*$/ ,'$1')
                } else if(/[/]mb[\d]*[?]/.test(a.href)){
                    oid = a.href.replace(/.*[/]mb([^?]*).*$/ ,'$1')
                } else {
                    oid = a.href.replace(/.*[/]([^?]*).*$/ ,'$1')
                }
if(dev) con.log('id n: ' + oid)
                if(w.localStorage[oid] === undefined){
                    w.localStorage[oid] = '-' // save "no interest"
                }
            }
            ul = null
            // direct calls and/or event handling
            if((!ev || !ev.keyCode) ||
               (ev && ev.keyCode && ev.keyCode != 32 && (ev.keyCode < 48 || ev.keyCode > 57))
            ) try {
                if (ev && (13 == ev.keyCode || 9 == ev.keyCode)) return// Enter, Tab
                // space and numbers are normal keys
                // any other key will load prev/next page if there is one
                ul = d.getElementById("Paginator").getElementsByClassName('selected')[0]
                w.location.href = (backwards ?
                    ul.previousSibling.previousSibling :
                    ul.nextSibling.nextSibling
                ).children[0].href
            } catch(e){
                if(localStorage['anext']){
                    localStorage['anext'] = '' // clear autonext, load the first page
                } else if(localStorage['aprev']){
                    localStorage['aprev'] = ''
                }
                ev = d.getElementById("Paginator")
                if(ev && ev.children && ev.children.length){
                    w.location = d.getElementById("Paginator").children[0].children[0].href
                }
            }
        }
    }// on_load()
}

uglify_js(window ,document ,console)
