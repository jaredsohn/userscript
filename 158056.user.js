// ==UserScript==
// @id             sort.gog@blunet.cc
// @name           gog.com - Sort by Title
// @author         bernstein
// @description    Re-Sorts the Games by Title (locally)
// @updateURL      https://userscripts.org/scripts/source/158056.user.js
// @version        0.9
// @domain         www.gog.com
// @include        http*://www.gog.com/catalogue/*
// @run-at         document-end
// @namespace      cc.blunet.userscripts
// @grant          GM_addStyle
// ==/UserScript==

//var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
({
    list: document.querySelector('.games_list'),
    observer: null,
    
    init: function()
    {
        this.updateUI();
        this.sort();
        
        this.observer = new MutationObserver(this.onDOMMutation.bind(this));
        this.observer.observe(this.list, {childList: true});
    },
    onDOMMutation: function(mutations,observer)
    {
        for(i=0,iL=mutations.length; i<iL; i++)
            if (mutations[i].type === 'childList')
            {
                observer.disconnect();
                this.sort();
                observer.observe(this.list, {childList: true});
            }
    },
    updateUI: function()
    {
        var url = location.href; if (url.endsWith('/')) url = url.slice(0,-1);
        var e = document.querySelector('#' + url.split('/').pop() + '_order_alph');
        for (i=0,iL=e.parentNode.children.length; i<iL; i++)
            e.parentNode.children[i].classList.remove('active');
        e.classList.add('active');
        e.parentNode.parentNode.children[0].textContent = e.textContent;
    },
    sort: function()
    {
        console.debug("sorting");
        for (i=1, iL=this.list.children.length; i<iL; i++)
            for (j=0; j<i; j++) // i is the 'sorted' sentinel !!
            {
                let iS = this.list.children[i].querySelector('.dark_un').textContent.toLowerCase();
                let jS = this.list.children[j].querySelector('.dark_un').textContent.toLowerCase();
                
                if (iS.localeCompare(jS) <= 0) { this.list.insertBefore(this.list.children[i], this.list.children[j]); break; }
            }
    }
}).init();
