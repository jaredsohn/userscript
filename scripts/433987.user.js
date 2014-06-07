// ==UserScript==
// @name       dark-facebook
// @namespace  http://dtinth.github.io/dark-facebook/
// @version    0.1
// @description  Self-updating script for dark theme on Facebook
// @match      https://www.facebook.com/*
// @copyright  2014, Thai Pangsakulyanont
// @run-at document-body
// ==/UserScript==

var styleElement

log('Script is starting...')

var cached = GM_getValue('style')

if (cached) {
    log('Cached version found, inserting it right away...')
    style(cached)
}

checkForUpdate()


function checkForUpdate() {
    
    var commit = GM_getValue('commit', 'none')
    log('Current commit is ' + commit)
    
    request('https://dark-facebook.appspot.com/dark-facebook.commit', function(result) {
        if (result == commit) {
            log('Already at latest version')
        } else {
            log('Must update to', result)
            update(result)
        }
    })
    
}

function update(commit) {
    request('https://dark-facebook.appspot.com/dark-facebook.css?commit=' + encodeURIComponent(commit), function(result) {
        if (result.indexOf('|| https://github.com/dtinth/dark-facebook ||') == -1) {
            log('CSS integrity check failed...')
        } else {
            style(result)
            GM_setValue('style', result)
            GM_setValue('commit', commit)
            log('Applied!')
        }
    })
}





function log() {
	console.log.apply(console, ['[dark-facebook]'].concat([].slice.call(arguments)))
}

function style(css) {
    if (!styleElement) {
    	styleElement = document.createElement('style')
    }
    styleElement.textContent = css
    var head = document.querySelector('head')
    head.appendChild(styleElement)
}

function request(url, callback) {
    log('Requesting', url)
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            if (response.status != 200) {
            	log('Status', response.status, 'not OK for', url)
                return
            } else {
            	callback(response.responseText)
            }
        },
        onerror: function(response) {
            log('Error loading', url)
        },
        ontimeout: function(response) {
            log('Timeout loading', url)
        }
    })
}
