// ==UserScript==
// @name            Ikariam Kaynak Güvenlilik V.1.1
// @namespace       kkhweb.com
// @author          kevinhill
// @version         1.0
// @history         1.0 Rewrote code in OOP
// @description     güvenli olup olmadığını bağlı olarak farklı renklerde görüntüler kaynaklar. Yeşil güvenli ve Kırmızı güvenli olmadıgını gösterir.(www.ikariam.forumm.biz)
// @homepage        http://kkhweb.com/web_share/greasemonkey/ResourceColorizer/
// @include         http://*.ikariam.*/*
// @exclude         http://www.ika-world.com/*
// @exclude         http://ikariamap.com/*
// @exclude         http://board.ikariam.org/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require         http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

//NOTICE: I have not gotten this script approved, by installing this you are using it at your own risk

GM_addStyle(".insecureRes {color: #FF0000; font-weight: bold;}");
GM_addStyle(".secureRes {color: #4AC948; font-weight: bold;}");

var ResColor = {
    //Member Data
    curVer: '1.0',
    usoNum: 54415,
    server: document.location.host,

    //Member Functions
    store: function(key, value) {
        GM_setValue(key, value);
    },
    fetch: function(key) {
        var temp = GM_getValue(key);
        if(temp == null || temp == 'undefined'){
            return false;
        } else {
            return temp;
        }
    },
    init: function() {
        this.store('currSecureAmount', 0);
        this.store('initDone', true);
        alert('Please visit all your town\'s warehouses to set current Secure Amount.');
    },
    colorize: function(){
        if(this.fetch('initDone') != true) {
            ResColor.init();
        }

        if(this.isWarehouse() == true){
            var secure = parseInt($('.secure:first').text().replace(',',''));

            this.store(this.getCityID() + '|secureAmount', secure);
            this.store('currSecureAmount', secure);

            $$(this.getCityID() + '\'s Secure Amount: ' + secure);

            this.addColorClasses();
        } else {
            this.store('currSecureAmount', this.fetch(this.getCityID() + '|secureAmount'));

            this.addColorClasses();
        }
    },
    checkUpdates: function(){
        ScriptUpdater.check(this.usoNum, this.curVer);
    },
    getNumber: function(number) {
        return parseInt(number.replace(/[^0-9]/g, ''));
    },
    getCityID: function() {
        return $('#citySelect > option:selected').attr('value');
    },
    isWarehouse: function() {
        var url = document.location.toString();

        if(url.indexOf('warehouse') > 0) {
            return true;
        } else {
            return false;
        }
    },
    addColorClasses: function() {
        var secureAmount = this.fetch('currSecureAmount');

        var woodSpan = $('#value_wood');
        var wineSpan = $('#value_wine');
        var marbleSpan = $('#value_marble');
        var crystalSpan = $('#value_crystal');
        var sulfurSpan = $('#value_sulfur');

        var woodAmount = this.getNumber(woodSpan.text());
        var wineAmount = this.getNumber(wineSpan.text());
        var marbleAmount = this.getNumber(marbleSpan.text());
        var crystalAmount = this.getNumber(crystalSpan.text());
        var sulfurAmount = this.getNumber(sulfurSpan.text());

     //Wood Colorize
        if(woodAmount <= secureAmount) {
            woodSpan.addClass('secureRes');
        } else if(woodAmount > secureAmount) {
            woodSpan.addClass('insecureRes');
        }

    //Wine Colorize
        if(wineAmount <= secureAmount) {
            wineSpan.addClass('secureRes');
        } else if(wineAmount > secureAmount) {
            wineSpan.addClass('insecureRes');
        }

    //Marble Colorize
        if(marbleAmount <= secureAmount) {
            marbleSpan.addClass('secureRes');
        } else if(marbleAmount > secureAmount) {
            marbleSpan.addClass('insecureRes');
        }

    //Crystal Colorize
        if(crystalAmount <= secureAmount) {
            crystalSpan.addClass('secureRes');
        } else if(crystalAmount > secureAmount) {
            crystalSpan.addClass('insecureRes');
        }

    //Sulfur Colorize
        if(sulfurAmount <= secureAmount) {
            sulfurSpan.addClass('secureRes');
        } else if(sulfurAmount > secureAmount) {
            sulfurSpan.addClass('insecureRes');
        }
    }

}

//var $$ = function(m){unsafeWindow.console.log(m);}

ResColor.colorize();
ResColor.checkUpdates();