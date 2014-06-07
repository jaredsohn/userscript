// ==UserScript==
// @name            GetDescription
// @description     Добавляет 2 кнопки для копирования короткого описания
// @date            2013-04-21
// @version         3.3.5
// @author          ReklatsMasters
// @homepageURL     http://userscripts.org/scripts/show/127340
// @updateURL       https://userscripts.org/scripts/source/127340.meta.js
// @include         http://www.kinopoisk.ru/level/1/film/*
// @include         http://www.kinopoisk.ru/film/*
// @icon            http://st.kinopoisk.ru/images/favicon.ico
// ==/UserScript==

(function(window, undefined){
    
    var SWF = 'http://dl.dropbox.com/u/62000403/clipboard.swf';
    
    function main(){
        var swfDesc = '<EMBED width="160" height="23" \
                type="application/x-shockwave-flash"  autoplay="1" allowScriptAccess="always"\
                flashVars="clipboard='+encodeURIComponent(getDescription())+'"  menu="false"\
                wmode="transparent" src="'+SWF+'">';
        var swfName = '<EMBED width="160" height="23" type="application/x-shockwave-flash" \
                autostart="1" allowScriptAccess="always" flashVars="clipboard='+encodeURIComponent(getName())+'" \
                menu="false" wmode="transparent" src="'+SWF+'">';
        var d = '<td class="type">описание</td><td><div>'+swfDesc+'</div></td>';
        var n = '<td class="type">название</td><td>'+swfName+'</td>';

        var description = document.createElement('tr')
            , name = description.cloneNode()
        ;

        description.innerHTML = d;
        name.innerHTML = n;
        
        var fragment = document.createDocumentFragment();
        fragment.appendChild(name);
        fragment.appendChild(description);

        var body = document.querySelector("#infoTable").querySelector("tbody")
            , firstChild = body.firstChild
        ;

        body.insertBefore(fragment, firstChild);
    }

// полное описание    
    function getDescription(){
        var info = getBaseInfo()
            , desc = getMainDesc()
            , actors = getActors()
        ;

        return info + ((desc) ? "\r\n\r\n\r\n" + desc : '') + ((actors) ? "\r\n\r\n\r\n" + actors : '');
    }
 
// список актёров    
    function getActors(){
        var $wlist = document.querySelector("#actorList")
            , $head = $wlist.children[0]
            , $list = $wlist.querySelectorAll("li")
            , $return = $head.textContent + "\r\n"
        ;

        for (var i=0; i<$list.length; i++) {
            $return += "\r\n" + $list[i].textContent;
        }

        return ($list[$list.length -1].textContent != "...") ? $return + "\r\n..." : $return;
    }
    
// краткое описание
    function getMainDesc(){
        var $node = document.querySelector("div[itemprop=description]"); 
        return ($node) ? $node.textContent : null;
    }
    
// имя фильма
    function getName() {
        var rus = document.querySelector("[itemprop=name]").firstChild.textContent.trim()
            , org = document.querySelector("[itemprop='alternativeHeadline']").textContent.trim()
            , year = document.querySelector("#infoTable").querySelector("a").textContent
            , ret = rus + " (" + (org || '...') + ") [" + year + "]";
        ;

        return ret.replace(/\?/g, "").replace(/:/g," -").replace(/\s{2,}|&nbsp;/g," ");
    }
  
// краткое описание  
    function getBaseInfo(){
        var b_parse = document.querySelector("#infoTable").querySelectorAll("tr");
        var b_info = new Array(2); 
            for (var i=0; i<2; i++) 
                b_info[i] = new Array(); // массив параметров(0) и значений(1)
        var b_ret = "", cp, td;
        
        for (var i=0; i<b_parse.length; i++){
            td = b_parse[i].querySelectorAll("td");
            b_info[0][i] = td[0].textContent.trim();    // имя текущего параметра

            if (!i)
                cp = td[1].querySelector("a");
            else if (i == 10)
                cp = td[1].querySelector("span");
            else
                cp = td[1];

            b_info[1][i] = cp.textContent.trim();
        }

        // подготавливаем возвращаемое значение
        var i = -1;
        do {
            i++;
            b_info[0][i] = b_info[0][i][0].toUpperCase() + b_info[0][i].substr(1);// переделываем имя параметра
            b_ret += b_info[0][i] + ": " + b_info[1][i] + "\r\n";
        } while (b_info[0][i].length != 4); 
        
        return b_ret + "Ссылка: "+location.href;
    }
    
    window.addEventListener('DOMContentLoaded', main, false);
})(window);
