// ==UserScript==
// @name           Backpack.tf Prices
// @version        3.0
// @namespace      Made 99% by l'autre!
// @description    modded version of jacobisconfused script to get it working with last tf2op update, fixed some css, removed search from items icons, added bbcode buttons to new trade.
// @include        *tf2outpost.com/*
// @require	       http://code.jquery.com/jquery-1.7.2.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @downloadURL    https://userscripts.org/scripts/source/156744.user.js
// @updateURL      https://userscripts.org/scripts/source/156744.meta.js
// ==/UserScript==
GM_addStyle(".hov0:hover{opacity:1} .hov0{opacity: 0.4;} .hov:hover{background:#51463e} .hov:active{border:2px solid #945312} .tonbou{margin:0px 5px 5px 0px; width: 27px ;height: 27px;padding:0px} .cc{margin:0px 5px 5px 0px; width: 120px ;height: 27px;padding:0px 0px 0px 5px}");
jQuery.noConflict();
(function ($) {
    $(function () {
        console.log('loading from storage');
        var prices = GM_getValue("backpack.tf prices"),
            timeGot = new Date(parseInt(GM_getValue("backpack.tf time")));
        
        console.log(GM_getValue("backpack.tf prices"));
                    
        try {
            prices = JSON.parse(prices);
        } catch (err) {
            prices = null;
        }
        if ((prices == null || prices == undefined) || (timeGot == null || timeGot.getHours() != new Date().getHours())) {
            console.log('getting prices from backpack.tf');
            GM_xmlhttpRequest({
                url: "http://backpack.tf/api/IGetPrices/v2/?format=jsonp&currency=metal",
                method: "GET",
                onload: function (data) {
                    prices = data.responseText;
                    console.log(data);
                    GM_setValue("backpack.tf prices", prices);
                    GM_setValue("backpack.tf time", new Date().getTime().toString());
                    prices = JSON.parse(data.responseText);
                    setEvents();
     
                }
            });
        } else setEvents();
        $('.tools').each(function () {
            var profileLink = $(this).find('.profile').attr('href').split('/')[4];
           
            $(this).append('&#160;&#160;<a href="http://www.backpack.tf/id/' + profileLink + '" class="hov0" original-title><img alt="Backpack.tf" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAASGSURBVHjatJZLaCRVFIa/c289+lFd3UlmoiHjIPNSBx8wMBsRwYXiQlEQdaGCCxVxJ+51JbgSdKEbXQkudCMIguD7MYwTEcdxNOoMRJ1kJkmn00m60tX1uMdFdyaZKLiaC0VRl7r1n/Of8/+nRFW5mstwlddVB/AAnn78kduBECj/74CIXPGsim99u77RWZsZbKY4FVwp2GYXW+sPAUA+AJqAIsDusoz2rDXkeU7S6+FEEATARFGUxOPxS/41zdeXFrok6ylWd2SAiA8Eo5hABGNkFKGiTrHWkqYpyWafI0dvZmp6H34QcHF+ntkzp1vWRq8hmvuh92YtquG8BHQLQF2+M/0sG5CmKarQaDQwxjAYpPQHA+657wEO3XAT6krCsEIcN5k98yPqlCLTV+uNahY1grfXBqtkWmxRxOVoe70E6/vsP3gYEcOf5/+g1YzZ6PW45dhxjtx0lEGa4pxj8eIC83//hQ6TRpVKWeobhqLvSe1dcEMA1SEFa90uk9P7uevuexnfs4c/Zn/l919+oigqiDFcf+AQWZZhjOHUia/57psvqNUjqpXqkEpVUIKS4s2qmciVyfe9LWqyLGMjSTgYx7TGxnBlSZFnZFnOancd6wVEUQNByPOM8+d+pyhKrLX4vmWXYONSi7fAbYqq8tRjDy+tr2/sPX7HnRw6fCP1KAJgkKasdjooiud5jE/swVqLc4617ip5lvPNl5+xtrJEPYpQ53a1sHYuU+TUMb3vOiYmJ+knCapKtVZnbGJi1AdKv7+JqiIiTE3vw/N8fpg5SftSDs7xH7Yzvl0DYzl14lt6Gz2uP3AQay0ry4ucPfMTIkJQCbn1tmOElQrOOX44dZLVToeV9jJhGODUsfv71ngLlwFq9RqzP59GBA4cOoy1HktLi5z48hPq9ToqliM3HKVaq1EWBT9+P8PFC3PsnZwkDCuoul2K93JH8vwIwGHE0mhEBEE4EvKwsxpxTLMZM8jKnaep1qq0xsYIghDnyl3Ct3j++isFi++NAEaKVTfyhW2jUVW03MXvaN+VJc7tpEYBgx9UP2x35l7ubqxu6wCGlrBtRAII/X6fSuCjxkfkSlHq1l23zwRe8dvC8tlnv5/5bdBL+lt2PXpJhKIoQBXnSq6ZmmJqej+5E5zTK7NjZ9TDS8RLBkXvuV46uxBWM8LQGwJsReH7Hp2V9jB954ibLR594knuf+gRPM+jKAtEDBgzzFO36RUBNHkxKe1nxlisNajuGDjOOcIwZGXxEjMnv8UYg+/7xM0WrbFxEMUagwhYYxER3KhzrDWkaf7Oarv9qitzxA51VbptL/KHIBDHESe/+pyLF/7m2ul9iBg67SU2ewmffvwRQRCgCqudNmEYIjgGmZzurqUvtP/qUIl6qJmg5TvqYzoEEGwOZKqqxvq0mmNcmJtj7ty54dDwPaJanaX5+WHUCtVqFd8PLJjlzf7iM+J3l+O9GeoGgKGy1yIymgelrD24NTK3almLBRHLdhNsUIl2tlGCM/jqmpeMWT8bjZ+nMe79e8Re7d+WfwYAaQtgXc45WocAAAAASUVORK5CYII=" /></a>');
        })
        $('#heading').each(function () {
            var profileLink = $(this).find('a')[0].toString().split('/')[4];
            $(this).find('#tools').append('<a href="http://www.backpack.tf/id/' + profileLink + '" class="hov0" original-title><img alt="Backpack.tf" src="data:image/png;base64,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" /></a>');
        })
        $('#header').css({
            position: 'fixed',
            width: '98%',
            'z-index': '3'
        });
        $('.main').css({
            'padding-top': '78px'
        });
        $('#topbar').css({
            'padding-top': '0px'
        });
        var alreadyloading = false;
        //var $pagination = $('.pagination').hide();         
        var $pagination = $('#pagination');
        $(window).scroll(function (e) {
            if (($(window).innerHeight() + $(window).scrollTop()) >= $('.main').innerHeight() - 150) {
                if (alreadyloading == false) {
                    var $nextPage = $pagination.find('.selected').next('a');
                    if ($nextPage.length) {
                        $pagination.find('a').removeClass('selected');
                        alreadyloading = true;
                        $pagination.before('<div id="search" class="loadingContainer" style="padding:0;"><div class="bar" style="position:relative;width: 124px;height: 24px;"><span id="loading" class="cream" style="position:relative;width:90px;display: none; left: 0px; top: 0px; background-position: initial initial; background-repeat: initial initial; ">Loading...  </span></div></div>');
                        $('#loading').stop().fadeIn(300);
                        var url = 'http://www.tf2outpost.com' + $nextPage.attr('href');
                        GM_xmlhttpRequest({
                            url: url,
                            method: "GET",
                            onload: function (data) {
                                $pagination.before('<hr/>');
                                $pagination.before($(data.responseText).find('.trade'));
                                setEvents();
                                alreadyloading = false;
                                $('#loading').stop().fadeOut(500);
                                $('.loadingContainer').remove();
                                $nextPage.addClass('selected');
                            }
                        });
                    }
                }
            }
        });

        function setEvents() {
            $('.trade').each(function () {
                if ($(this).hasClass('loaded')) return;
                $(this).addClass('loaded');
                var notes = $(this).find('.notes').text(),
                    offering = $(this).find('.four-column:first');
                var total = 0;
                offering.find('.item').each(function () {
                    if (!$(this).hasClass('deleted')) total += parseFloat(getItemPricing($(this)));
                });
                total = convertItemPrice(total);
                if (total != '0.00 ref') {
                    $(this).find('.caption').append('<span class="strange">≏' + total + '</span>');
                }
                // try to find b/o,bo,
                var bo = getString(notes, 'b/o, bo:, bo-');
                if (bo != null) {
                    bo = bo.replace('pure', 'bud');
                    if (bo.indexOf('bud') > -1) {
                        var r = /\d+\.?\d*/;
                        var matches = bo.match(r);
                        if (matches) {
                            var actualBO = parseFloat(matches[0]);
                            //if(actualBO <= 2.10)
                            //  $(this).hide();
                            $(this).find('.caption').append(' - <span class="unique">BO ≏' + actualBO + ' bud</span>');
                        }
                    } else if (bo.indexOf('key') > -1) {
                        var r = /\d+\.?\d*/;
                        var matches = bo.match(r);
                        if (matches) {
                            var actualBO = parseFloat(matches[0]);
                            $(this).find('.caption').append(' - <span class="unique">BO ≏' + actualBO + ' key</span>');
                        }
                    }
                }
            })
            $('.item').each(function () {
                if ($(this).hasClass('loaded')) return;
                $(this).addClass('loaded');
                var itemPrice = convertItemPrice(getItemPricing($(this)));
                if (itemPrice != '0.00 ref') {
                    $(this).find('.icon').append('<span class="notification" style="background:#3b342f; right:0px auto;color:#00000;margin:0px 0px ">' + itemPrice + '</span>');
                    $(this).one('mouseenter', function () {
                        $(this).children('.details').append('<br/> ' + itemPrice);
                    });
                }
            });
        }

        function getItemData($item) {
            var itemData = $item.attr('data-hash'),
                searchData = $item.attr('search');
            if (itemData == null || itemData == undefined) return;
            var splitData = itemData.split(',');
            if (splitData[0] != 440) return;
            if (splitData[1] == 5000 || splitData[1] == 5001 || splitData[1] == 5002) return;
            var effect = '',
                craft = true,
                paint = '',
                craftable = '';
            if (searchData != null && searchData != undefined) {
                var merp = searchData.split(';');
                if (splitData[2] == 5) {
                    for (var i = 0; i < merp.length; i++) {
                        var p = merp[i].split(':');
                        if (p != null && p.length == 2 && p[0] == "effect") {
                            effect = p[1];
                            break;
                        }
                    }
                }
                for (var i = 0; i < merp.length; i++) {
                    var p = merp[i].split(':');
                    if (p != null && p.length == 2 && p[0] == "craftable") {
                        craft = false;
                        break;
                    }
                }
                paint = "";
                for (var i = 0; i < merp.length; i++) {
                    var p = merp[i].split(':');
                    if (p != null && p.length == 2 && p[0] == "paint") {
                        paint = p[1];
                        break;
                    }
                }
            }
            var item = new Object;
            item.ItemNum = splitData[1];
            item.Quality = (craft == false) ? "600" : splitData[2];
            item.Effect = (effect != '') ? effect : 0;
            item.Craftable = craft;
            return item;
        }

        function getItemPricing($item) {
            var currValue = 0;
            try {
                var item = getItemData($item),
                    priceObj = prices.response.prices[item.ItemNum][item.Quality][item.Effect];
                console.log(item);
                currValue = priceObj.value;
                  if(currValue == 1.83 && item.Craftable == false) {
                alert(item.ItemNum+" craftable "+item.Craftable);
              }
            } catch (err) {
                currValue = 0;
            }
            return currValue;
        }

        function convertItemPrice(currValue) {
            currValue = parseFloat(currValue);
            var currencyValue = ' ref',
                keyPrice = parseFloat(prices.response.prices[5021][6][0].value),
                budPrice = parseFloat(prices.response.prices[143][6][0].value);
            if (currValue > budPrice) {
                currValue = (currValue / budPrice);
                currencyValue = ' buds';
            } else if (currValue > keyPrice) {
                currValue = (currValue / keyPrice);
                currencyValue = ' keys';
            }
            return currValue.toFixed(2) + currencyValue;
        }
    });
})(jQuery);

function addtag(obj, tag) {
    beforeText = obj.value.substring(0, obj.selectionStart);
    selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);
    afterText = obj.value.substring(obj.selectionEnd, obj.value.length);
    switch (tag) {
        case "bold":
            tagOpen = "[b]";
            tagClose = "[/b]";
            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
        case "strike":
            tagOpen = "[s]";
            tagClose = "[/s]";
            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
        case "underline":
            tagOpen = "[u]";
            tagClose = "[/u]";
            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
        case "italic":
            tagOpen = "[i]";
            tagClose = "[/i]";
            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
        case "color":
            color = document.getElementById("Color");
            if (color == "Select") {
                break;
            }
            tagOpen = "[color=" + String(color.value) + "]";
            tagClose = "[/color]";
            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
    }
    obj.value = newText;
}

function xpath(query, object) {
    if (!object) var object = document;
    return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getXpathRes() {
    var path = xpath("//textarea[@name='notes']");
    //var path = xpath("//textarea");
    return (path.snapshotLength > 0) ? path : false;
}
var xpathRes = getXpathRes();
if (xpathRes) {
    var div1 = document.createElement("div");
    div1.align = "Left";
    div1.id = "BBcode4tf2ot";
    div1.innerHTML = " "
    div1.style.display = "block";
    xpathRes.snapshotItem(0).parentNode.insertBefore(div1, xpathRes.snapshotItem(0));
    var post = document.createElement("input");
    post.type = "button";
    post.style.fontWeight = "900";
    post.value = "B";
    post.className = "tonbou hov";
    post.addEventListener('click', function () {
        addtag(document.getElementsByTagName("textarea")[0], 'bold');
    }, false);
    div1.appendChild(post);
    var post = document.createElement("input");
    post.type = "button";
    post.style.fontStyle = "italic";
    post.value = "I";
    post.className = "tonbou hov";
    post.addEventListener('click', function () {
        addtag(document.getElementsByTagName("textarea")[0], 'italic');
    }, false);
    div1.appendChild(post);
    var post = document.createElement("input");
    post.type = "button";
    post.style.textDecoration = "line-through"
    post.value = "S";
    post.className = "tonbou hov";
    post.addEventListener('click', function () {
        addtag(document.getElementsByTagName("textarea")[0], 'strike');
    }, false);
    div1.appendChild(post);
    var post = document.createElement("input");
    post.type = "button";
    post.style.textDecoration = "underline";
    post.value = "U";
    post.className = "tonbou hov";
    post.addEventListener('click', function () {
        addtag(document.getElementsByTagName("textarea")[0], 'underline');
    }, false);
    div1.appendChild(post);
    var post = document.createElement("select");
    post.id = "Color";
    post.className = "cc hov";
    var opt = document.createElement("option");
    opt.value = "1";
    opt.style.display = "none";
    opt.appendChild(document.createTextNode('Select Color'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#FF0000";
    opt.style.color = '#FF0000';
    opt.appendChild(document.createTextNode('Red'));
    post.appendChild(opt);
     var opt = document.createElement("option");
    opt.value = "ffa500";
    opt.style.color = '#ffa500';
    opt.appendChild(document.createTextNode('Orange'));
    post.appendChild(opt);
     var opt = document.createElement("option");
    opt.value = "yellow";
    opt.style.color = 'yellow';
    opt.appendChild(document.createTextNode('Yellow'));
    post.appendChild(opt);
    
     var opt = document.createElement("option");
    opt.value = "#00ff00";
    opt.style.color = '#00ff00';
    opt.appendChild(document.createTextNode('Green'));
    post.appendChild(opt);
    
         var opt = document.createElement("option");
    opt.value = "blue";
    opt.style.color = 'blue';
    opt.appendChild(document.createTextNode('Blue'));
    post.appendChild(opt);
    
     var opt = document.createElement("option");
    opt.value = "#4B0082";
    opt.style.color = '#4B0082';
    opt.appendChild(document.createTextNode('Indigo'));
    post.appendChild(opt);

    var opt = document.createElement("option");
    opt.value = "#8F00FF";
    opt.style.color = '#8F00FF';
    opt.appendChild(document.createTextNode('Purple'));
    post.appendChild(opt);
    //item quality
    var opt = document.createElement("option");
    opt.disabled = "disabled";
    opt.appendChild(document.createTextNode('------------------ Item Quality ------------------'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#70B04A";
    opt.style.color = '#70B04A';
    opt.appendChild(document.createTextNode('Community'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#4D7455";
    opt.style.color = '#4D7455';
    opt.appendChild(document.createTextNode('Genuine'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#38F3AB";
    opt.style.color = '#38F3AB';
    opt.appendChild(document.createTextNode('Haunted'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#CF6A32";
    opt.style.color = '#CF6A32';
    opt.appendChild(document.createTextNode('Strange'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#FFD700";
    opt.style.color = '#FFD700';
    opt.appendChild(document.createTextNode('Unique'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#8650AC";
    opt.style.color = '#8650AC';
    opt.appendChild(document.createTextNode('Unusual'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#476291";
    opt.style.color = '#476291';
    opt.appendChild(document.createTextNode('Vintage'));
    post.appendChild(opt);
    //paints
    var opt = document.createElement("option");
    opt.disabled = "disabled";
    opt.appendChild(document.createTextNode('--------------------- Paints ----------------------'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#2F4F4F";
    opt.style.color = '#2F4F4F';
    opt.appendChild(document.createTextNode('A Color Similar to Slate'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#7D4071";
    opt.style.color = '#7D4071';
    opt.appendChild(document.createTextNode('A Deep Commitment to Purple'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#141414";
    opt.style.color = '#141414';
    opt.appendChild(document.createTextNode('A Distinctive Lack of Hue'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#BCDDB3";
    opt.style.color = '#BCDDB3';
    opt.appendChild(document.createTextNode("A Mann's Mint"));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#2D2D24";
    opt.style.color = '#2D2D24';
    opt.appendChild(document.createTextNode('After Eight'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#7E7E7E";
    opt.style.color = '#7E7E7E';
    opt.appendChild(document.createTextNode('Aged Moustache Grey'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#E6E6E6";
    opt.style.color = '#E6E6E6';
    opt.appendChild(document.createTextNode('An Extraordinary Abundance of Tinge'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#E7B53B";
    opt.style.color = '#E7B53B';
    opt.appendChild(document.createTextNode('Australium Gold'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#D8BED8";
    opt.style.color = '#D8BED8';
    opt.appendChild(document.createTextNode('Color No. 216-190-216'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#E9967A";
    opt.style.color = '#E9967A';
    opt.appendChild(document.createTextNode('Dark Salmon Injustice'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#808000";
    opt.style.color = '#808000';
    opt.appendChild(document.createTextNode('Drably Olive'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#729E42";
    opt.style.color = '#729E42';
    opt.appendChild(document.createTextNode('Indubitably Green'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#CF7336";
    opt.style.color = '#CF7336';
    opt.appendChild(document.createTextNode('Mann Co. Orange'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#A57545";
    opt.style.color = '#A57545';
    opt.appendChild(document.createTextNode('Muskelmannbraun'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#51384A";
    opt.style.color = '#51384A';
    opt.appendChild(document.createTextNode("Noble Hatter's Violet"));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#C5AF91";
    opt.style.color = '#C5AF91';
    opt.appendChild(document.createTextNode('Peculiarly Drab Tincture'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#FF69B4";
    opt.style.color = '#FF69B4';
    opt.appendChild(document.createTextNode('Pink as Hell'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#694D3A";
    opt.style.color = '#694D3A';
    opt.appendChild(document.createTextNode('Radigan Conagher Brown'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#32CD32";
    opt.style.color = '#32CD32';
    opt.appendChild(document.createTextNode('The Bitter Taste of Defeat and Lime'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#F0E68C";
    opt.style.color = '#F0E68C';
    opt.appendChild(document.createTextNode("The Color Gentlemann's Business Pants"));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#7C6C57";
    opt.style.color = '#7C6C57';
    opt.appendChild(document.createTextNode('Ye Olde Rustic Colour'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#424F3B";
    opt.style.color = '#424F3B';
    opt.appendChild(document.createTextNode('Zepheniah s Greed'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#654740";
    opt.style.color = '#654740';
    opt.appendChild(document.createTextNode('An Air of Debonair #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#28394D";
    opt.style.color = '#28394D';
    opt.appendChild(document.createTextNode('An Air of Debonair #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#3B1F23";
    opt.style.color = '#3B1F23';
    opt.appendChild(document.createTextNode('Balaclavas Are Forever #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#18233D";
    opt.style.color = '#18233D';
    opt.appendChild(document.createTextNode('Balaclavas Are Forever #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#C36C2D";
    opt.style.color = '#C36C2D';
    opt.appendChild(document.createTextNode('Cream Spirit #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#B88035";
    opt.style.color = '#B88035';
    opt.appendChild(document.createTextNode('Cream Spirit #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#483838";
    opt.style.color = '#483838';
    opt.appendChild(document.createTextNode("Operator's Overalls #1"));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#384248";
    opt.style.color = '#384248';
    opt.appendChild(document.createTextNode("Operator's Overalls #2"));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#B8383B";
    opt.style.color = '#B8383B';
    opt.appendChild(document.createTextNode('Team Spirit #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#5885A2";
    opt.style.color = '#5885A2';
    opt.appendChild(document.createTextNode('Team Spirit #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#803020";
    opt.style.color = '#803020';
    opt.appendChild(document.createTextNode('The Value of Teamwork #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#256D8D";
    opt.style.color = '#256D8D';
    opt.appendChild(document.createTextNode('The Value of Teamwork #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#A89A8C";
    opt.style.color = '#A89A8C';
    opt.appendChild(document.createTextNode('Waterlogged Lab Coat #1'));
    post.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "#839FA3";
    opt.style.color = '#839FA3';
    opt.appendChild(document.createTextNode('Waterlogged Lab Coat #2'));
    post.appendChild(opt);
    var opt = document.createElement("option");
   
    post.addEventListener('change', function () {
        addtag(document.getElementsByTagName("textarea")[0], 'color');
        document.getElementById("Color").value = 1;
    }, false);
    div1.appendChild(post);
}

function getString(s, v) {
    s = s.toLowerCase();
    var p = v.split(',');
    for (var i = 0; i < p.length; i++) {
        if (s.indexOf(p[i]) > -1) {
            return s.substring(s.indexOf(p[i]));
        }
    }
    return null;
}