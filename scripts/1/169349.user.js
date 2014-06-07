// ==UserScript==
// @name           AMO Similar Addons
// @version        1.0.4
// @description    Similar add-ons section on Addons.Mozilla.Org pages
// @namespace      https://github.com/piotrex
// @include        /^https:\/\/addons.mozilla.org\/.*\/firefox\/addon\/[^\/]+\/?[^\/]*$/
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @downloadURL    http://userscripts.org/scripts/source/169349.user.js
// @updateURL      http://userscripts.org/scripts/source/169349.meta.js
// @homepage       http://userscripts.org/scripts/show/169349
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @icon           https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==
 /* |*|
*|
 |*|    JXON framework - Copyleft 2011 by Mozilla Developer Network

 |*|

 |*|    https://developer.mozilla.org/en-US/docs/JXON

 |*|

 |*|    This framework is released under the GNU Public License, version 3 or later.

 |*|    http://www.gnu.org/licenses/gpl-3.0-standalone.html

 |*|

 \*/
 /* minified by UglifyJS2 online - default options but using ';' and infinity chars per line */
const JXON=new function(){function e(e){return c.test(e)?null:l.test(e)?"true"===e.toLowerCase():isFinite(e)?parseFloat(e):isFinite(Date.parse(e))?new Date(e):e}function t(){}function n(e){return null===e?new t:e instanceof Object?e:new e.constructor(e)}function r(t,o,c,l){const f=s.length,d=t.hasChildNodes(),p=t.hasAttributes(),h=Boolean(2&o);var g,m,b=0,y="",v=h?{}:!0;if(d)for(var C,N=0;N<t.childNodes.length;N++)C=t.childNodes.item(N),4===C.nodeType?y+=C.nodeValue:3===C.nodeType?y+=C.nodeValue.trim():1!==C.nodeType||C.prefix||s.push(C);const T=s.length,w=e(y);h||!d&&!p||(v=0===o?n(w):{});for(var A=f;T>A;A++)g=s[A].nodeName.toLowerCase(),m=r(s[A],o,c,l),v.hasOwnProperty(g)?(v[g].constructor!==Array&&(v[g]=[v[g]]),v[g].push(m)):(v[g]=m,b++);if(p){const O=t.attributes.length,S=l?"":u,x=l?{}:v;for(var D,F=0;O>F;b++,F++)D=t.attributes.item(F),x[S+D.name.toLowerCase()]=e(D.value.trim());l&&(c&&Object.freeze(x),v[a]=x,b-=O-1)}return 3===o||(2===o||1===o&&b>0)&&y?v[i]=w:!h&&0===b&&y&&(v=w),c&&(h||b>0)&&Object.freeze(v),s.length=f,v}function o(e,t,n){var r,s;n instanceof String||n instanceof Number||n instanceof Boolean?t.appendChild(e.createTextNode(n.toString())):n.constructor===Date&&t.appendChild(e.createTextNode(n.toGMTString()));for(var c in n)if(r=n[c],!(isFinite(c)||r instanceof Function))if(c===i)null!==r&&r!==!0&&t.appendChild(e.createTextNode(r.constructor===Date?r.toGMTString():String(r)));else if(c===a)for(var l in r)t.setAttribute(l,r[l]);else if(c.charAt(0)===u)t.setAttribute(c.slice(1),r);else if(r.constructor===Array)for(var f=0;f<r.length;f++)s=e.createElement(c),o(e,s,r[f]),t.appendChild(s);else s=e.createElement(c),r instanceof Object?o(e,s,r):null!==r&&r!==!0&&s.appendChild(e.createTextNode(r.toString())),t.appendChild(s)}const i="keyValue",a="keyAttributes",u="@",s=[],c=/^\s*$/,l=/^(?:true|false)$/i;t.prototype.toString=function(){return"null"},t.prototype.valueOf=function(){return null},this.build=function(e,t,n,o){const i=arguments.length>1&&"number"==typeof t?3&t:1;return r(e,i,n||!1,arguments.length>3?o:3===i)},this.unbuild=function(e){const t=document.implementation.createDocument("","",null);return o(t,t,e),t}};
var section_title = {"af": "Soortgelyke Byvoegings", "sq": "Ngjashëm Shtesa", "ar": "مماثلة فيرفكس", "be": "Падобныя дапаўненняў", "bs": "Slične Add-ons", "bg": "Подобни добавки", "ca": "Complements similars", "zh": "类似的附加组件", "hr": "Slično Add-ons", "cs": "Podobně jako Firefox", "da": "Lignende tilføjelser", "nl": "Vergelijkbare add-ons", "en": "Similar Add-ons", "et": "Sarnased Add-ons", "fi": "Samanlaisia ​​lisäosat", "fr": "Similaire Modules", "gl": "Semellante Extras", "de": "Ähnliche Add-ons", "el": "Παρόμοια Πρόσθετα", "ht": "Menm jan Add-ons", "he": "דומה תוספות", "hi": "जोड़ें-ons इसी प्रकार की", "hu": "Hasonló Kiegészítők", "id": "Mirip Pengaya", "ga": "Similar Breiseáin", "is": "Similar Bæta við-ons", "it": "Componenti aggiuntivi simili", "ja": "アドオン同様", "ko": "부가 기능 유사", "lt": "Panašus Add-ons", "lv": "Līdzīgi Add-ons", "mk": "Слични додатоци", "ms": "Similar Firefox", "mt": "Simili Żid-ons", "nb": "Lignende Add-ons", "no": "Lignende Add-ons", "fa": "مشابه افزودنیهای فایرفاکس", "pl": "Podobne dodatki", "pt": "Semelhante Extras", "ro": "Similar Suplimente", "ru": "Похожие дополнений", "sr": "Сличан Додаци", "sk": "Podobne ako Firefox", "sl": "Podobno Dodatek", "es": "Complementos similares", "sw": "Sawa Viongezo", "sv": "Liknande Add-ons", "th": "ที่คล้ายกัน Add-ons", "tl": "Mga Katulad na Add-ons", "tr": "Eklentiler Benzer", "uk": "Схожі доповнень", "vi": "Tiện ích tương tự", "cy": "Adia-ons tebyg", "yi": "ענלעך לייג-אונדז"};
var the_same_labels = {"af": "Gedeelde etikette:", "sq": "Etiketat përbashkët:", "ar": "التسميات المشتركة:", "be": "Агульны этыкеткі:", "bs": "Shared oznake:", "bg": "Общо етикети:", "ca": "Etiquetes compartides:", "zh": "共享标签：", "hr": "Zajednička oznake:", "cs": "Sdílené štítky:", "da": "Delte labels:", "nl": "Gedeeld labels:", "en": "Shared labels:", "et": "Jagatud sildid:", "fi": "Jaettu tarrat:", "fr": "Étiquettes partagés:", "gl": "Rótulos compartidos:", "de": "Gemeinsamer Etiketten:", "el": "Κοινόχρηστο ετικέτες:", "ht": "Pataje etikèt:", "he": "תוויות משותפות:", "hi": "साझा लेबल:", "hu": "Megosztott címkék:", "id": "Bersama label:", "ga": "Lipéid Roinnte:", "is": "Hluti miða:", "it": "Etichette condivise:", "ja": "共有ラベル：", "ko": "공유 라벨 :", "lt": "Bendri ženklai:", "lv": "Shared etiķetes:", "mk": "Дели етикети:", "ms": "Label dikongsi:", "mt": "Tikketti Maqsuma:", "nb": "Delt etiketter:", "no": "Delt etiketter:", "fa": "برچسب های مشترک:", "pl": "Współdzielone etykiety: ", "pt": "Rótulos compartilhados:", "ro": "Etichete comune:", "ru": "Общий этикетки:", "sr": "Дељене ознаке:", "sk": "Zdieľané štítky:", "sl": "Skupne oznake:", "es": "Etiquetas compartidas:", "sw": "Pamoja maandiko:", "sv": "Delade etiketter:", "th": "ป้ายที่ใช้ร่วมกัน:", "tl": "Ibinahagi label:", "tr": "Paylaşılan etiketler:", "uk": "Загальний етикетки:", "vi": "Nhãn được chia sẻ:", "cy": "Labeli a rennir:", "yi": "שערד לאַבעלס:"};
// FF >=14 CHR >=18
var MUTATIONOBSERVER = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
function error(_string)
{
    console.error(_string);
    throw _string;
}
//======================= GENERAL FUNCTIONS =========================//
function getElementByKey(arr, key, key1)
{
    for (var i = 0, L = arr.length; i < L; i++)
    {
        if (arr[i][key] === key1)
        {
            return arr[i];
        }
    }
    return null;
}
// http://stackoverflow.com/a/7951947/1794387
//{
var parseXml;
if (typeof window.DOMParser != "undefined")
{
    parseXml = function (xmlStr) {
        return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
    };
}
else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM"))
{
    parseXml = function (xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
}
else
{
    error("No XML parser found");
}
//}
function parseXmlUsingHttp(_url, _callback)
{
    GM_xmlhttpRequest({
        method : "GET",
        url : _url,
        onreadystatechange : function (response)
        {
            if(response.readyState === 4)
                _callback(parseXml(response.responseText));
        },
        onerror : function()
        {
            error("GM_xmlhttpRequest failed");
        },
        ontimeout: function()
        {
            error("GM_xmlhttpRequest timeout");
        }
    });
}
// http://stackoverflow.com/a/2901298/1794387
function numberWithSeparators(x, sep)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
function findRecord(_records, _field, _value) // returns index of found record
{
    for (var i=0, _records_length=_records.length ; i<_records_length ; i++)
        if(_records[i][_field] == _value)
            return i;
    return -1;
}
//======================= SCRIPT-SPECIFIC FUNCTIONS =========================//
function getAddonId()
{
    var addon_box = document.getElementById("addon");
    return addon_box.getAttribute("data-id");
}
function getAMOLang()
{
   return /https?:\/\/addons\.mozilla\.org\/([^\/]+).*/.exec(window.location.href)[1];
}
function changeAMOLangInUrl(_url, _new_lang)
{
    return _url.replace(/(https?:\/\/addons\.mozilla\.org\/)([^\/]+)(.*)/, "$1"+_new_lang+"$3");
}
function getAMOLinkNamePart(_url)
{
    return /https?:\/\/addons\.mozilla\.org\/[^\/]+\/firefox\/addon\/([^\/]+)\/.*/.exec(_url)[1];
}
function getAddonLabels(_callback)
{
    var getLabelsFromBox = function(_box_div)
    {
        var labels_elems = _box_div.getElementsByTagName("UL")[0].getElementsByTagName("LI");
        var labels = [];
        var label_str;
        for (var i=0, labels_elems_length=labels_elems.length ; i<labels_elems_length ; i++)
        {
            label_str = labels_elems[i].getElementsByTagName("A")[0].textContent;
            labels.push(label_str.substr(7, label_str.length-7-5));
        }
        return labels;
    };
    var tag_box = document.getElementById("tagbox");
    if(tag_box === null)
    {
        setTimeout(function(){getAddonLabels(_callback);}, 500);
    }
    else
    {
        _callback(getLabelsFromBox(tag_box));
    }
    // mutation observation method doesn't work so it is commented
    //{
    // var tag_box = document.getElementById("tagbox");
    // if(tag_box === null)
    // {
        // function dom_listener(mutations, observer)
        // {
            // FOR_EACH(mutations,i)
            // {
                // var added_nodes = mutations[i].addedNodes;
                // if(added_nodes)
                    // FOR_EACH(added_nodes,node_i)
                    // {
                        // node_curr = added_nodes[node_i];
                        // if(node_curr.id === "tagbox")
                        // {debugger;
                            // observer.disconnect();
                            // _callback(getLabelsFromBox(node_curr));
                        // }
                    // }           
            // }
        // }
        // var doc_observer = new MUTATIONOBSERVER(dom_listener);      
        // doc_observer.observe(document, {childList : true, subtree: true});
        // return doc_observer;
    // }
    // else
    // {
        // _callback(getLabelsFromBox(tag_box));
    // }
    //}
}
function getAddonAMOInfo(_addon_id, _lang, _callback)
{
    parseXmlUsingHttp(
        "https://services.addons.mozilla.org/"+_lang+"/firefox/api/1.5/addon/"+_addon_id,
        function(_xml_object)
        {
            _callback(JXON.build(_xml_object).addon);
        }
    );
}
function findAddonsInAMO(_term, _callback) // returns array of addons
{
    parseXmlUsingHttp(
        "https://services.addons.mozilla.org/en-US/firefox/api/1.5/search/"+_term+"/all/50/WINNT/18",
        function(_xml_object)
        {
            var jxon = JXON.build(_xml_object);
            if(jxon.searchresults["@total_results"] != "0")
                _callback(jxon.searchresults.addon);
            else
                _callback([]);
        }
    );
}
function compareAddons(elem1, elem2) // to sort function (descending)
{
    if (elem1.ASA_shared_labels > elem2.ASA_shared_labels)
        return -1;
    if (elem1.ASA_shared_labels < elem2.ASA_shared_labels)
        return 1;
    return 0;
}
function findAddonsByTag(_tag, _lang, _callback)
{
    GM_xmlhttpRequest({
        method : "GET",
        url : "/en-US/firefox/tag/"+_tag,
        onreadystatechange : function (response)
        {
            if(response.readyState === 4)
            {
                var parser = new DOMParser();
                var doc = parser.parseFromString(response.responseText, "text/html");
                var addon_boxes = doc.getElementsByClassName("item addon");
                var counter = 0;
                var matched_addons = [];
                for (var i=0, addon_boxes_length=addon_boxes.length ; i<addon_boxes_length ; i++)
                {
                    getAddonAMOInfo(
                        addon_boxes[i].getElementsByClassName("install-shell")[0].getElementsByClassName("install")[0].getAttribute("data-addon"),
                        _lang,
                        function(_data)
                        {
                            matched_addons.push(_data);
                            counter++;
                            if(counter >= addon_boxes.length)
                            {
                                _callback(matched_addons);
                            }
                        }
                    );
                }
            }
        },
        onerror : function()
        {
            error("GM_xmlhttpRequest failed");
        },
        ontimeout: function()
        {
            error("GM_xmlhttpRequest timeout");
        }
    });
}
//======================= MAIN CODE OF THE SCRIPT =========================//
var LANG4 = getAMOLang(); // lang like "en-US"
var LANG2 = getAMOLang().substr(0,2); // lang like "en""
function main()
{
    getAddonLabels(function(labels) { labels.length;
        var searched = 0;
        var addon_records = [];
        for (var i=0, labels_length=labels.length ; i<labels_length ; i++)
        {
            findAddonsByTag(
                labels[i],
                LANG4,
                function(_found_addons)
                {
                    var found_index, found;
                    for (var j=0, _found_addons_length=_found_addons.length ; j<_found_addons_length ; j++)
                    {
                        found_index = findRecord(addon_records, "@id", _found_addons[j]["@id"]);
                        if(found_index === -1)
                        {
                            if(_found_addons[j]["@id"] != getAddonId())
                            {
                                _found_addons[j].ASA_shared_labels = 1;
                                addon_records.push(_found_addons[j]);
                            }
                        }
                        else
                        {
                            found = addon_records[found_index];
                            found.ASA_shared_labels++;
                        }
                    }
                    searched++;
                    if(searched == labels.length)
                    { // All labels has been parsed now
                        addon_records.sort(compareAddons); // sort descending by shared labels number
                        var similar_section = document.createElement("section");
                        similar_section.innerHTML = '<h2 class="compact-bottom">'+section_title[LANG2]+'</h2> <ul class="listing-grid c cols-3" style="width: 720px; height: 132px;"> <section id="ASA_addon_boxes_parent"> </section> </ul>';
                        var sections_grid = document.getElementsByClassName("primary island c")[2];
                        similar_section.id = "ASA_similars-grid";
                        var addon_box_template = document.createElement("LI");
                        addon_box_template.innerHTML = '<div class="addon hovercard"> <div class="icon"> <a href="/en-us/firefox/addon/xowcomicscom-toolbar/?src=dp-dl-oftenusedwith"> <img src="https://addons.cdn.mozilla.net/img/uploads/addon_icons/90/90992-32.png?modified=1298481907"> </a> </div> <div class="summary"> <a href="/en-us/firefox/addon/xowcomicscom-toolbar/?src=dp-dl-oftenusedwith"> <h3>XOWComics.com Toolbar</h3> <div class="category more-info">Social &amp; Communication</div> </a> <div class="vital"> <span class="rating"> <span title="" class="stars stars-1">Rated 1 out of 5 stars</span> <a href="/en-us/firefox/addon/xowcomicscom-toolbar/#reviews">(1)</a> </span> </div> </div> <div class="more"> <div class="install-shell"> <div data-compat-overrides="[]" data-is-compatible-app="true" data-is-compatible="true" data-waffle-d2c-buttons="true" data-max="4.0.*" data-min="1.5" data-name="XOWComics.com Toolbar" data-versions="/en-us/firefox/addon/90992/versions/" data-developers="/en-us/firefox/addon/xowcomicscom-toolbar/developers" data-icon="https://addons.cdn.mozilla.net/img/uploads/addon_icons/90/90992-32.png?modified=1298481907" data-addon="90992" class="install clickHijack" data-version-supported="true"> <p class="install-button"> <a href="/firefox/downloads/latest/90992/addon-90992-latest.xpi?src=dp-hc-oftenusedwith" data-hash="sha256:d65812fbd9010bea270699f29cfeb8e549edcb444e1906ec3f27ec9690b8150f" class="button add installer"> <b></b> <span>Add to Firefox</span> </a> </p><div style="display:none"><input type="hidden" value="ui1FQJ946fYCC9MKlzjOCWt1iWtWFRps" name="csrfmiddlewaretoken"></div> <p></p> </div> <div class="d2c-reasons-popup popup"> <p>This add-on is not compatible with your version of Firefox because of the following:</p> <ul></ul> </div> <div class="extra"><span class="notavail">Not available for Firefox 21.0</span></div></div> <span class="addon-summary"> Firefox toolbar extension for XOWComics.com comic book collection management. </span> <div class="byline"> by <a href="/en-us/firefox/user/nyrdyv/">nyrdyv</a> </div> <div class="vitals"> <div class="vital"> <span class="adu"> 44 users </span> </div> </div> </div> </div>';
                        sections_grid.insertBefore(similar_section, sections_grid.firstChild);
                        var addon_boxes_parent = document.getElementById("ASA_addon_boxes_parent");
                        var how_many_addons = GM_config.get('alternatives_number');
                        for (
                            var k=0, aaddon_records_length=addon_records.length ;
                            k<how_many_addons && k<aaddon_records_length ;
                            k++
                        ){
                            var addon_box = addon_box_template.cloneNode(true);
                            var icon_link = addon_box.getElementsByClassName("icon")[0].getElementsByTagName("A")[0];
                            var icon_img = icon_link.getElementsByTagName("IMG")[0];
                            var name_link = addon_box.getElementsByClassName("summary")[0].getElementsByTagName("A")[0];
                            var name = name_link.getElementsByTagName("H3")[0];
                            var category = name_link.getElementsByClassName("category")[0];
                            var stars = addon_box.getElementsByClassName("stars")[0];
                            var reviews = addon_box.getElementsByClassName("rating")[0].getElementsByTagName("A")[0];
                            var extra = addon_box.getElementsByClassName("extra")[0]; // compatibility notes
                            var install_button = addon_box.getElementsByClassName("installer")[0];
                            var summary = addon_box.getElementsByClassName("addon-summary")[0];
                            var author = addon_box.getElementsByClassName("byline")[0].getElementsByTagName("A")[0];
                            var users = addon_box.getElementsByClassName("adu")[0];
                            icon_link.href = "//addons.mozilla.org/"+LANG4+"/firefox/addon/"+getAMOLinkNamePart(addon_records[k].reviews.keyValue)+"/?src=amo-similar-addons";
                            var icon32 = getElementByKey(addon_records[k].icon, "@size", 32);
                            icon_img.src = (icon32 !== null && typeof icon32.keyValue !== 'undefined')? icon32.keyValue : "https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png";
                            name_link.href = icon_link.href;
                            name.innerHTML = addon_records[k].name;
                            category.innerHTML = '';
                            stars.className = "stars stars-"+addon_records[k].rating;
                            reviews.innerHTML = "("+addon_records[k].reviews["@num"]+")";
                            reviews.href = changeAMOLangInUrl(addon_records[k].reviews.keyValue, LANG4);
                            addon_box.getElementsByClassName("install-shell")[0].parentNode.removeChild(addon_box.getElementsByClassName("install-shell")[0]); // removing 'extra' and 'install_button'
                            // install_button.href = addon_records[k].install.keyValue;
                            // install_button.setAttribute("data-hash", addon_records[k].install.hash);
                            summary.innerHTML = addon_records[k].summary;
                            author.parentNode.innerHTML = '';
                            users.textContent = numberWithSeparators(addon_records[k].daily_users, ' ') + /([^0-9]+)$/m.exec(users.textContent)[1];
                            var ASA_info = document.createElement("DIV");
                            ASA_info.innerHTML = "<br>"+the_same_labels[LANG2]+" "+addon_records[k].ASA_shared_labels+" ";
                            users.parentNode.appendChild(ASA_info);
                            addon_boxes_parent.appendChild(addon_box);
                            addon_records[k]["@id"];
                        }
                    }
                }
            );
        }
    });
}
GM_config.init('AMO Similar Addons' /* Script title */,
    {
        'alternatives_number' : // This would be accessed using GM_config.get('Name')
        {
            'label' : 'Number of shown similar addons', // Appears next to field
            'type' : 'number', // Makes this setting a number field
            'default' : 6 // Default value if user doesn't change it
        }
    }
);
main();
GM_registerMenuCommand("AMO Similar Addons - Options", GM_config.open);
