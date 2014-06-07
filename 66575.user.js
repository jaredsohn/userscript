// ==UserScript==
// @name           Twitter translate to Chinese
// @namespace      http://twitter.com/bimzcy
// @author1        jackhsu
// @author2        modify by bimzcy（白鸽男孩）
// @description1   将Twitter上任意语言的消息翻译成中文。欢迎大家加白鸽为推友：@bimzcy
// @description2   Translate any Twitter messages to Chinese. Welcome to follow me on Twitter: @bimzcy
// @version        1.0
// @include        https://twitter.com/*
// @include        https://*.twitter.com/*
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0',
	langpair = '%7Czh-CN',
	timeline = document.getElementById('timeline'),
	statuses = timeline.getElementsByClassName('status'),
    i = 0,
    n = statuses.length,
    loaderDiv = document.createElement('div'),
    more = document.getElementById('more'),
    translateImg = 
'data:image/jpeg;base64,/9j/4AAQSkZJRgABAAEAYABgAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEAAUFBQgFCAwHBwwMCQkJDA0MDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0BBQgICgcKDAcHDA0MCgwNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDf/EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/AABEIABYAEAMBEQACEQEDEQH/2gAMAwEAAhEDEQA/APUfir4whufCF7c6N9oufne3M9puQ2k1tKC7zPlHiWN0xuUHdlduVYEgHG+HPjTqWhQaLY+I7Eyf2rDAsFzFdLNcSq2yMTy2+wMDIWBIL7mO7buIxQBL498Can4V0fxJd6ZdxHTtVJu5LaVGLRbt7XQiKnG+VygQnACDnlFLAGr8G/hja2drY+KdQlk1C9msbf7Ms6jbZxlMqsIyeiEBWwNoyVClzQB7J4w0k67ol/pqlQ13Z3ESFs7Vd4mCM2AThWwTgE4HQ0AaOjabHo1jb6dCSY7OCK3UnqVijVFP1IUZoA//2Q==',
    loadingImg = 
'data:image/jpeg;base64,/9j/4QDdRXhpZgAASUkqAAgAAAAIABIBAwABAAAAAQAAABoBBQABAAAAbgAAABsBBQABAAAAdgAAACgBAwABAAAAAgAAADEBAgAVAAAAfgAAADIBAgAUAAAAkwAAABMCAwABAAAAAQAAAGmHBAABAAAApwAAAAAAAABIAAAAAQAAAEgAAAABAAAAQUNEIFN5c3RlbXMgyv3C67PJz/EAMjAxMDowMToxNiAxODozNjoyNwADAJCSAgAEAAAAODg0AAKgBAABAAAAFAAAAAOgBAABAAAAFAAAAAAAAAAAAGPm/8AAEQgAFAAUAwEhAAIRAQMRAf/bAIQAAgEBAQEBAgEBAQICAgIDBQMDAgIDBgQEAwUHBgcHBwYHBggJCwkICAoIBgcKDQoKCwwMDQwHCQ4PDgwPCwwMDAEDAwMEAwQIBAQIEgwKDBISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS/8QAegAAAgMBAAAAAAAAAAAAAAAAAggAAwkHEAABAgQEBAQEBwAAAAAAAAABAgQDBQYRAAcIIQkSMUETFBUiCjJTVGFxgZGh4fABAQADAQAAAAAAAAAAAAAAAAQAAQMCEQACAgICAwAAAAAAAAAAAAAAAgEDESEEEhMxUf/aAAwDAQACEQMRAD8AzU4VGgfIPiNZjznTnXWoJ3l3Xcdt5umn0Vsh2zmpRvFbKgkoUYvL7k8qwSAdlW2YKnvhadY1Y1VVlMyLPGgGfoztKJK5n4dNxUTVQSQ6SlCIhgJuoo5V3JXCiDoASd+RFbdWOq6PKnZZEK1R6can0nZ3TvISsa4pidzWn4vgO3lHzDzzIRO6BF5U3UO4tt06459Zf3J/36Y1hsxkK2VnAzXCVzW0zZI63aSzY1OvZ4yltPxw+lc0k70tYbF+g3hRHCkpKjB6gpSRe4ubXw6vFS4jOTlU5I1C0yQ1YV7La1m8cN4UtoaoAJZNmUVYiLQ6QgAhCAkhMRKhEIKYaudPymtrdr1bGhtFiLx2XOzJHxOYlVzub/nic344YB18CKrKMMbBJ7d9sVKNk3G2/bbEKj2XwWsOOkrUpQN7e09f4wfp8L6i/wB/6xDU/9k=',
    d = {
        sq: 'Albanian',
        ar: 'Arabic',
        bg: 'Bulgarian',
        ca: 'Catalan',
        'zh-CN': 'Chinese',
        'zh-TW': 'Chinese (Taiwan)',
        hr: 'Croatian',
        cs: 'Czech',
        da: 'Danish',
        nl: 'Dutch',
        en: 'English',
        et: 'Estonian',
        tl: 'Filipino',
        fi: 'Finnish',
        fr: 'French',
        gl: 'Galician',
        de: 'German',
        el: 'Greek',
        iw: 'Hebrew',
        hi: 'Hindi',
        hu: 'Hungarian',
        id: 'Indonesian',
        it: 'Italian',
        ja: 'Japanese',
        ko: 'Korean',
        lv: 'Latvian',
        lt: 'Lithuanian',
        mt: 'Maltese',
        no: 'Norwegian',
        pl: 'Polish',
        pt: 'Portuguese',
        ro: 'Romanian',
        ru: 'Russian',
        sr: 'Serbian',
        sk: 'Slovak',
        sl: 'Slovenian',
        es: 'Spanish',
        sv: 'Swedish',
        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian',
        vi: 'Vietnamese'
    };

loaderDiv.id = 'google-translate-loader';
document.body.appendChild(loaderDiv);
    
// Listen for when new tweets are loaded
var _onPageChange = unsafeWindow.onPageChange;
unsafeWindow.onPageChange = function(A) {
	_onPageChange(A);
	n = statuses.length;   
	_attachEvents();
};

_attachEvents();

// Function to attach translate button/events to tweets
function _attachEvents() {
    for (; i<n; i++) {
        var status = statuses[i],
            actions = status.getElementsByClassName('actions')[0].getElementsByTagName('div')[0],
            q = encodeURIComponent(status.getElementsByClassName('entry-content')[0].innerHTML),
            translateLink = document.createElement('a'),
            onclick = document.createAttribute('onclick'),
            translation = document.createElement('div');
    
        status.style.minHeight = '67px';
    
        translateLink.innerHTML = '&nbsp;';
        translateLink.href = '#';
        translateLink.className = 'meta entry-meta';
        translateLink.style.backgroundImage = 'url(' + translateImg + ')';
        translateLink.title ='Translate using Google';
                
        translation.style.marginLeft = '65px';
        translation.style.width = '420px';
        translation.style.minHeight = '40px';
        translation.style.backgroundColor = '#EEEEEE';
        translation.style.marginTop = '10px';
        translation.style.display = 'none';
        translation.style.padding = '3px';
        translation.className = 'translation';
        translation.id = 'translation_' + status.id;
        translation.innerHTML = '<img src="' + loadingImg + '" alt="" style="vertical-align: middle"/> working...';
        status.appendChild(translation);
        
        onclick.value = 'document.getElementById("translation_' + status.id + '").style.display = "block";' + 
                'var s=document.createElement("script");' +
                's.src="' + url + '&q=' + q + '&langpair=' + langpair + '&callback=t' + '&context=translation_' + status.id + 

'";' + 
                'document.getElementById("google-translate-loader").appendChild(s);' +
                'return false;';
        
        translateLink.attributes.setNamedItem(onclick);
        actions.appendChild(translateLink);
    }
};

// Callback function for Gogole Translate's JSONP API
unsafeWindow.t = function(id, json, s, msg) {
    var div = document.getElementById(id),
        p = document.createElement('p'),
        translation = document.createElement('code'),
        fromLang;
        
    if (s == 200) {
        fromLang = json.detectedSourceLanguage
        document.getElementById("google-translate-loader").innerHTML = '';
        
        if (d[json.detectedSourceLanguage] !== undefined) {
            fromLang = d[json.detectedSourceLanguage];
        }
        
        div.innerHTML = '';
        
        p.innerHTML = 'Translated from ' + fromLang + ' to Chinese...';
        p.style.fontSize = '11px';
        p.style.fontFamily = 'georgia';
        p.style.fontStyle = 'italic';
        p.style.color = '#666666';
        translation.innerHTML = json.translatedText;
        
        div.appendChild(p);
        div.appendChild(translation);
    } else {
        div.innerHTML = 'Error: ' + msg;
    }
};
