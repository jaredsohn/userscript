// ==UserScript==
// @name           Fruit Factory
// @namespace      kol.interface.unfinished
// @description    Provides a convenient button for restocking fruit as soon as it is duplicated in Professor Jacking's laboratory, in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://127.0.0.1:*/choice.php*
// @version        1.0
// ==/UserScript==


function findPwdhash() {
    var somef = window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var page = goo.document.documentElement.innerHTML;
            var find = 'pwdhash = ';
            if (page.indexOf(find) >= 0) {
                var i = page.indexOf(find);
                var j = find.length;
                var ps = page.substr(i+j+2);
                var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
                GM_setValue('fruitpwd',foundit);
                return foundit;
            }
        }
    }
    return GM_getValue('fruitpwd');
}


function addFruit(inum) {
    this.removeEventListener('click',addFruit,false);
    var args = 'action=addfruit&whichitem=4560&pwd='+findPwdhash()+'&whichfruit='+this.getAttribute('fruit');
    doPost(args);
}

function doPost(vars) {
    var d = document.getElementById('fruitfactorymsg');
    d.innerHTML='Inserting fruit...';
    GM_xmlhttpRequest({
            method: "POST",
                url: "http://" + location.host + "/inv_use.php",
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                data: vars,
                onload: function(response){
                if (response.responseText.indexOf('Please pick a fruit from the list.')>=0)
                    d.innerHTML = 'Failed---you don\'t have that fruit.';
                else if (response.responseText.indexOf('disappears into the tube and begins bouncing around noisily')>=0)
                    d.innerHTML = 'Restocked.';
                else if (response.responseText.indexOf('is sucked into the tube, displacing the')>=0)
                    d.innerHTML = 'Restocked.';
                else
                    d.innerHTML = 'Failed maybe; best verify with the <a href="inv_use.php?pwd='+findPwdhash()+'&amp;which=3&amp;whichitem=4560">map</a>.';
                var b = document.getElementById('fruitfactorybutton');
                if (b)
                    b.addEventListener('click',addFruit,false);
            }
        });
}


function selectFruit() {
    if (this.selectedIndex!=0) {
        var b = document.getElementById('fruitfactorybutton');
        if (b) {
            b.setAttribute('fruit',this.options[this.selectedIndex].getAttribute('value'));
            b.setAttribute('value','Restock with '+this.options[this.selectedIndex].innerHTML);
            this.selectedIndex = 0;
        }
    }
}

function createSelect() {
    var fruits = [
                  {name:"banana",num:"2373"},
                  {name:"blackberry",num:"2063"},
                  {name:"bunch of square grapes",num:"2733"},
                  {name:"cactus fruit",num:"2579"},
                  {name:"cherry",num:"1006"},
                  {name:"cocktail onion",num:"1560"},
                  {name:"cranberries",num:"672"},
                  {name:"gr8ps",num:"358"},
                  {name:"grapefruit",num:"243"},
                  {name:"grapes",num:"244"},
                  {name:"jumbo olive",num:"455"},
                  {name:"juniper berries",num:"2726"},
                  {name:"kiwi",num:"1562"},
                  {name:"kumquat",num:"1557"},
                  {name:"lemon",num:"332"},
                  {name:"lime",num:"333"},
                  {name:"olive",num:"245"},
                  {name:"orange",num:"242"},
                  {name:"peach",num:"2729"},
                  {name:"pear",num:"2728"},
                  {name:"plum",num:"2727"},
                  {name:"raisin",num:"4565"},
                  {name:"raspberry",num:"1561"},
                  {name:"sea blueberry",num:"3691"},
                  {name:"sea honeydew",num:"3560"},
                  {name:"sea lychee",num:"3558"},
                  {name:"sea persimmon",num:"3692"},
                  {name:"sea tangelo",num:"3559"},
                  {name:"strawberry",num:"786"},
                  {name:"tangerine",num:"1558"},
                  {name:"tomato",num:"246"},
                  ];
    var s = document.createElement('select');
    var opt = document.createElement('option');
    opt.setAttribute('value','0');
    opt.appendChild(document.createTextNode("(select a fruit)"));
    s.appendChild(opt);
    for (var i=0;i<fruits.length;i++) {
        opt = document.createElement('option');
        opt.setAttribute('value',fruits[i].num);
        opt.appendChild(document.createTextNode(fruits[i].name));
        s.appendChild(opt);
    }
    s.addEventListener("change", selectFruit, true);
    return s;
}

if (document.evaluate('//td[contains(.,"That machine must\'ve shrunk and duplicated the fruit you put in it, somehow.")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    var p = document.evaluate('//table[@class="item"]//td/img[@class="hand"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var iname = p.getAttribute('alt');
    while (p && p.tagName!='TABLE') {
        p = p.parentNode;
    }
    if (p) {
        var inum = p.getAttribute('rel');
        if (inum) {
            inum = inum.match(/id=([0-9]+)/i);
            if (inum && inum.length>1) {
                inum = inum[1];
                p = p.parentNode;
                while (p && p.tagName!='TABLE') {
                    p = p.parentNode;
                }
                if (p) {
                    var r = document.createElement('tr');
                    var d = document.createElement('td');
                    var c = document.createElement('center');
                    var b = document.createElement('input');
                    var div = document.createElement('div');
                    div.setAttribute('id','fruitfactorymsg');
                    b.setAttribute('type','button');
                    b.setAttribute('value','Restock with '+iname);
                    b.setAttribute('fruit',inum);
                    b.setAttribute('id','fruitfactorybutton');
                    b.addEventListener('click',addFruit,false);
                    c.appendChild(createSelect());
                    c.appendChild(document.createTextNode('\u00A0\u00A0'));
                    c.appendChild(b);
                    c.appendChild(document.createElement('br'));
                    c.appendChild(div);
                    d.appendChild(c);
                    r.appendChild(d);
                    p.appendChild(r);
                }
            }
        }
    }
}
