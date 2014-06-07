// ==UserScript==
// @name           Link Navigation
// @namespace      linknav
// @description    Inserts LINK elements with rel=prev, next, up.. on a number of sites
// @include        http://0day.kiev.ua/*
// @include        http://www.sinfest.net/*
// @include        http://torrents.net.ua/*
// @include        http://torrents.net.ua/*
// @include        http://torrents.ru/* 
// @include        http://price.ua/* 
// @include        http://dilbert.com/*
// @include        http://digg.com/*
// @include        http://sexylosers.com/*
// @include        http://www.menagea3.net/*
// @include        http://xkcd.com/*
// @include        http://thenoobcomic.com/*
// ==/UserScript==

nav = {
    '0day.kiev.ua': {
        'prev': "//img[@title='Предыдущая страница']/parent::*",
        'next': "//img[@title='Следующая страница']/parent::*",
        },
    'www.sinfest.net': {
        'first': "//img[@alt='First']/parent::*",    
        'prev': "//img[@alt='Previous']/parent::*",
        'next': "//img[@alt='Next']/parent::*",
        },
    'www.menagea3.net': {
        'first': "//img[@name='first_day']/parent::*",    
        'prev':  "//img[@name='previous_day']/parent::*",
        'next':  "//img[@name='next_day']/parent::*",
        'last':  "//img[@name='last_day']/parent::*",
        },        
     'torrents.net.ua': {
        'next': "//a[text()='далі']",
        'prev': "//a[text()='назад']"
        },
      'yandex.ru': {
        'prev': "//a[id('previous_page')]",
        'next': "//a[id('next_page')]",
        },
      'torrents.ru': {
        'next': "//a[text()='След.']",
        'prev': "//a[text()='Пред.']",
      },
      'price.ua': {
        'next': "//a[text()='Следующая страница >']",
        'prev': "//a[text()='< Предыдущая страница']",
      },
      'dilbert.com': {
        'prev': "//a[@class='STR_Prev']",
        'next': "//a[@class='STR_Next']",
      },
      'digg.com': {
        'prev': "//a[text()='« Previous']",
        'next': "//a[text()='Next »']",
      },
      'sexylosers.com': {
        'first': "//font[text()='|<'][@color='#ffaaaa']/parent::*",
        'prev' : "//font[text()='<<'][@color='#ffaaaa']/parent::*",
        'next' : "//font[text()='>>'][@color='#ffaaaa']/parent::*",
        'last' : "//font[text()='>|'][@color='#ffaaaa']/parent::*",
      },
      'xkcd.com': {
        'first': "//a[text()='|<']",
        'next' : "//a[text()='Next >']",
        'prev' : "//a[text()='< Prev']",
        'last' : "//a[text()='>|']",
      },
      'thenoobcomic.com': {
        'first': "//a[@class='comic_nav_first_button']",
        'prev' : "//a[@class='comic_nav_previous_button']",
        'next' : "//a[@class='comic_nav_next_button']",
        'last' : "//a[@class='comic_nav_last_button']",
      },      
}

cur_nav = nav[location.host]

for (key in cur_nav) {
    orig_link = document.evaluate(cur_nav[key],
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

    if (orig_link.snapshotLength) {
        nav_link = document.createElement('LINK')
        nav_link.rel = key
        nav_link.href= orig_link.snapshotItem(0).href
        document.body.appendChild(nav_link)
    }
}

