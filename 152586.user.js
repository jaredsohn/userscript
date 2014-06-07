    // ==UserScript==
    // @name           Mouse Enable/Enable Copy Paste清除禁止复制禁止拖曳之类的代码
    // @namespace      
    // @version        1.0
    // @description    Set 'oncontextmenu', 'onselectstart', 'ondragstart' to return true可清除禁止复制禁止拖曳之类的代码，可通用于大多数网站
    // @include        http://*
    // @include        https://*
    
    // ==/UserScript==

    document.body.setAttribute('oncontextmenu', 'return true');
    document.body.setAttribute('onselectstart', 'return true');
    document.body.setAttribute('ondragstart', 'return true');
    var devs=document.evaluate('//*[@onpaste]', document, null, 6, null), dev, i=0;
    while(dev=devs.snapshotItem(i++)) dev.setAttribute('onpaste', null);