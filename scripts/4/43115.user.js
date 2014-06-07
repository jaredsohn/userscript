// ==UserScript==
// @name           Google Translate
// @namespace      jackhsu
// @include        https://twitter.com/*
// @include        https://*.twitter.com/*
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0',
	langpair = '%7Cen',
	timeline = document.getElementById('timeline'),
	statuses = timeline.getElementsByClassName('status'),
    i = 0,
    n = statuses.length,
    loaderDiv = document.createElement('div'),
    more = document.getElementById('more'),
    translateImg = 'data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP////j4+Ovr6+Xl5dfX19HR0ba2trCwsKOjo5ycnP///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAAQwcMlJqzVq2J3ytp32LZ1inkoCoqj6hSMFx9JM2zE+dgQtHYqDwFdguT4FxOnoq0QAADs=',
    loadingImg = 'data:image/gif;base64,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',
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
        translateLink.className = 'non-fav';
        translateLink.style.backgroundImage = 'url(' + translateImg + ')';
        translateLink.title ='Translate using Google';
                
        translation.style.marginLeft = '65px';
        translation.style.width = '420px';
        translation.style.minHeight = '40px';
        translation.style.backgroundColor = '#EEEEEE';
        translation.style.marginTop = '10px';
        translation.style.marginBottom = '25px';
        translation.style.display = 'none';
        translation.style.padding = '3px';
        translation.className = 'translation';
        translation.id = 'translation_' + status.id;
        translation.innerHTML = '<img src="' + loadingImg + '" alt="" style="vertical-align: middle"/> working...';
        status.appendChild(translation);
        
        onclick.value = 'document.getElementById("translation_' + status.id + '").style.display = "block";' + 
                'var s=document.createElement("script");' +
                's.src="' + url + '&q=' + q + '&langpair=' + langpair + '&callback=t' + '&context=translation_' + status.id + '";' + 
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
        
        p.innerHTML = 'Translated from ' + fromLang + ' to English...';
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
