// ==UserScript==
// @name       Direct.Yandex Extender
// @namespace  http://facebook.com/artyom.tsiplakov
// @version    0.1.1.2
// @description  Extends Yandex.Direct functional
// @include      *://direct.yandex.*
// @copyright  2012+, Artyom 'Grimich' Tsiplakov
// @run-at       document-end
// ==/UserScript==

//https://direct.yandex.ru/pages/transfer/_transfer-1396884891.js

if (location.hostname.indexOf('direct.yandex.ru') != -1 && location.href.match(/\/direct\.yandex\.ru\/registered\/main/)){
    
    if (location.href.match(/cmd=showCamp/) && location.href.match(/cid=/)) {
        
        function rndString(slength) {
            
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
            
            if (!sslength || typeof(sslength) != 'number') {
                
                var sslength = 8;
                
            }
            
            var rs = '';
            
            for (var i=0;i<sslength;i++) {
                
                var rnum = Math.floor(Math.random() * chars.length);
                
                rs += chars.substring(rnum,rnum+1);
                
            }
            
            return rs;
            
        }
        
        
        
        function appendSaveCompany() {
            
            randomString = rndString(17);
            
            cid = location.href.match(/&cid=([0-9]+)/)[1];
            
            ulogin = location.href.match(/&ulogin=([^\&]+)/)[1];
            
            saveCompany = document.createElement('a');
            
            saveCompany.innerHTML = '<a href="https://direct.yandex.ru/registered/main.'+randomString+'.pl?cid='+cid+'&cmd=exportCampXLS&ulogin='+ulogin+'"><img src="data:png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABdUlEQVRIibXUv0pcQRQG8N+qKEkdLTQoBhV9AUUL3TSCpLDRFIKVCClTRhDE1kpF8M9bWFr6FhGLKAYt8gK6CJtiZ2G8zr2r++eDwz135jvnm3POMLwdE7gONvbWoK53CKyExGNY7YRAb+T3tSLwBVeo4BdGCuJHsBW4vzGaJXQngnbwDdvYwxKmMIBy4FyiH8M4wzO+o4qLRhX9DcRBrAe/in85/ho+B/9OpivZFs1hKPiPIaiOTzl+KXAFodmiCg6ik22E4NNoLWungbMZre3nJe/GQ0RciE54mEh+GPaozaa+/iA9WwsR6d7L9mVFjqLkAvc+2p9PCcTtOU7sl9SGvi59vU8UtCnbnnLqBA3wVUGbZuQPslmbFpXazIkboRwLfOiAwMdYIMau2kCbsd1ssve8pimM4qfEI1dHT4sCFxjHD0ymCK1WUMp8X6HVChaxjPNOCfxR8LjlCewEawvqM6i0K2GEp/hnArfa90zcqN0u/wGrOoDAajgetwAAAABJRU5ErkJggg=="/></a>\
<a href="https://direct.yandex.ru/registered/main.'+randomString+'.pl?tab=import&cmd=showExportedXlsList&ulogin='+ulogin+'"><img src="data:png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABnklEQVRIie3VO2sVQRQH8J8JucZ0KW6jCKImooioiI/aT6FYWAgq2gRRtNGAhV8mnQpiH5T4CCp2StL5StKImNzCWMxcOLvs3TtqSg8MLGf/j9k5Z85SFh1cxBN8wxpW8RQXMFKo0xgH8RabLes59v6N+KG84zbx/vqEfX8iPorFILCO+9l0ElO4h58B8yLziuJ8IG7g7ADcafwI2HOlBg8D6cEQ7N2AfTQI1MEV6TPXVM/3wBCDqYD9gu11wC681ly8z0PESW3aC5yXWROM480A8U08LjCA+RrvGcZgRrWYN7Bb6pRJTBQajOJ67Usukc68n7hZKNYWt4LePHwPiZ1bYNANeisj2BZe/mohHsF7vMPhFtxYeO7AQnC8PYB0VHVkfM2GTXFHtdCuhUQvm3QD4bg0OevdtYJjAdfN3Fjkq6RL0dSmp6ThVb90ca1KU/RMw7vF/hHRfNHGpZYdNkVnsKOWe6WhYeKoWMeJvLuPec0Fgbmc+4A9OJk5C7isWujimA0Gs6Wkf/rV/TeoRy88b2z1RmAay1jC/lLSb7ZttH4rA6REAAAAAElFTkSuQmCC"/></a>\
<a href="https://direct.yandex.ru/registered/main.'+randomString+'.pl?cmd=transfer&ulogin='+ulogin+'"><img src="data:png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEQklEQVR4nKWVz2/bZByHn9d24thJnB9d06q0G2vG1rGtGxIgpB3YZRLaiRtISEicOfEXIG7cOPEPILgPDsCJse0wxrrRAVVLt7Zp02xNk9iOk9hOHNscULtWHagd7/nV+9H76Pl8v4IjnoWv3skDV4BL/3LlZ2D+3Ic/2gDiCA9fAj6VE8q7mdECaSODllaRZYEIfGJJMEjk8a2AXn2Djt2+Dnx26IClb65Z2cmx/NiFGWTtNEQRdB8z6DoMPB9dTyIJQC5B7gJu9QYr9+Zs5bABmqbnJ868RpgYY+hZgCCMsghlQKZkEPkuw76LFFSht4omC/56ZOWlwwYARJX70A6QpHEUZBJRj6BjEzotXLtLTJo4UaZVbbNw+xYAh/4BgO/5JM3fiMIyg0AmsnoEHmw1a6ysVNg2HSKvQTEr0LQckDxCwLBP100jhjayW4O4j2Qv45o1NjcsHq22sZyIVCpD28+Ry6bRE/GzgP/SL5lUjoV2g4Js4gbH8PuCZquNF6sElHF1n+LxIaqXoDwzg+YvkmGDpUoScVT9QrdNQsvS68SYT01CJcPoZIZKZf0AIqtrIBa/vmYZU0fTb3XuPmHXp1OvU9+2sfyAfjLeRaRqexDp+tH1W1o2OVHK0RxmqfVjHG9I+dTp5yJSdvWbvIqUGUeKmkhRD69jIwcynhuialnixChm5S71yu9AkmwpzwQSCSRsp8tIqk3oOlQf3KWYFfT2WvQi+h2fPc3a3K9UF9dpND3qTg13wEGLhCQ+clzpC3lo5w+ln5Hl8uVJNLnD4nKbx1Ya00uSTeiUTkwzVT5FUaw9s2hHxc3v3osLOQXb02kHI6wsPqRh+qSyKXq9AYWsytlzU5y5MIv56B9US5Uk5ekSG6vbrK7XMUZ1Elj7LNrtQTgMIYLShMFo7jgnz54ksp4y8Dq0mlusrFR4cKfK3E/f7kN15q2LSOIut375k7SbwDCMXUSZ1J5R8X9QrVQ6aLlJMiMjvPrGm+j9ZQypxuqT1LOAjtOZlyRp3shFV9LJCran03JPsF4LaLQN0uMK6mhEIasyPT3OzOws3eoDFm7fIgqTjOh9Qn+TrYePKY0ohFoO2BMgSdINY2osP2x19qAq88rF8wdQLcxX+ePO9/tQbT5tEArBMMrTiwoHEe0UruP06K4tIeqHG2pqIoXZclDSExTzeU6eP8eYtn0Q0U7h9Mmr6K+fZ2itMXSe4JgWW60UtSclGm0DpaihSQ0yqo+qpCgqkC4oqMIjjOt0K+ukjz0H0d7CxbkyMSoiTKEl8xi6T0M4JISD7Dd4qbSjoUbQqtJoemxag11EblxAUzU7q/HJC1ukqZpdGknR1KbygTFAZWB3vXC+G+kVOZBuynJ8/f3P79n7ln79hw/ysqK8K0nibdsZvLzd8i81TC/fMH0apme3O4N5IajkNHEznRLXP/5yzn7uctpz/gZaPbVZTz0YkgAAAABJRU5ErkJggg=="/></a>';
            
            document.getElementsByTagName('h1')[0].appendChild(saveCompany);
            
        }
        
        window.addEventListener("DOMContentLoaded", appendSaveCompany, false);
        
    }
    
    else if (location.href.match(/cmd=showCamps/) && location.href.match(/ulogin=/)) {
        console.log('Мы на странице всех кампаний, щас покажем кнопочки к каждой');
    }
        else if (location.href.match(/cmd=transfer/) && location.href.match(/ulogin=/)){
            console.log('Мы на странице переноса денег, тут будет два текстовых поля с выборкой кампаний');
        }
        }

//TODO:Быстрая ссылка переноса средств

//Добавить значок скачать у каждой кампании в списке
//foreach document.getElementById('campaign_list_container').getElementsByTagName('div')

// ссылки
// aba = document.createElement('a');
//aba.innerHTML="<a>11</a>";
//document.getElementsByTagName('table')[8].appendChild(aba); 
// 
//body
//div.i-bem.b-phrases-changing-warning.b-phrases-changing-warning_js_inited
//div.i-campaign-tags.i-bem.i-campaign-tags_js_inited
//div.l-campinfo.b-campinfo
//table.l-campinfo__table.b-campinfo
//tbody
//tr
//td.l-campinfo__right
//div.b-campinfo__header
//h1.b-campinfo__header__h1
//div.b-dropdowna.b-dropdowna_is-bem_yes.i-bem.b-campinfo__header__dropdowna.b-dropdowna_js_inited
//span.b-dropdowna__switcher
//span.b-pseudo-link.b-pseudo-link_is-bem_yes.i-bem.b-pseudo-link_js_inited