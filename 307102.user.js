// ==UserScript==
// @name        MTurk Great HIT Export
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker edited by Tjololo12
// @description Export HIT description as vBulletin formatted text with turkopticon link, turkopticon info, and all relevant data
// @include     https://www.mturk.com/mturk/searchbar*
// @include     https://www.mturk.com/mturk/findhits*
// @include     https://www.mturk.com/mturk/viewhits*
// @include     https://www.mturk.com/mturk/viewsearchbar*
// @include     https://www.mturk.com/mturk/sortsearchbar*
// @include     https://www.mturk.com/mturk/sorthits*
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @version     1.74
// @downloadURL https://userscripts.org/scripts/source/174117.user.js
// @updateURL   https://userscripts.org/scripts/source/174117.meta.js
// ==/UserScript==

//
// 2012-11-19 0.2: Added customizable template
//
// 2012-11-20 0.3: Fixed: verifies that HIT link is correct
//
// 2012-11-26 0.4: Try to get requester and requesterId right even if some other script has changed the page.
//                 Added requester link to default template.
// 
// 2012-11-26 0.5: Partially works with Opera (No customisation)
//
// 2012-12-02 1.0: Added @downloadURL and @updateURL
//

(function () {
    var EDIT = false;
    var HITS = [];
    var HIT;

    var TO_BASE = "http://turkopticon.ucsd.edu/";
    var API_BASE = "https://api.turkopticon.istrack.in/";
    var API_MULTI_ATTRS_URL = API_BASE + "multi-attrs.php?ids=";
    
    DEFAULT_TEMPLATE = '[b]Title:[/b] [url={link}][COLOR=blue]{title}[/COLOR][/url]\n';
    DEFAULT_TEMPLATE += '[b]Requester:[/b] [url=https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId={requesterId}][COLOR=blue]{requester}[/COLOR][/url]';
    DEFAULT_TEMPLATE += ' [{requesterId}] ([url='+TO_BASE+'{requesterId}][COLOR=blue]TO[/COLOR][/url])';
    DEFAULT_TEMPLATE += '\n[b]TO Ratings:[/b]{to_stuff}';
    DEFAULT_TEMPLATE += '\n[b]Description:[/b] {description}';
    DEFAULT_TEMPLATE += '\n[b]Reward:[/b] [COLOR=green][b]{reward}[/b][/COLOR]';
    DEFAULT_TEMPLATE += '\n[b]Qualifications:[/b] {qualifications}';
    DEFAULT_TEMPLATE += '\n[b]Time:[/b] {time}';
    DEFAULT_TEMPLATE += '\n[b]Hits Available:[/b] {hits_available}';
    var TEMPLATE;
    var EASYLINK;

    if (typeof GM_getValue === 'undefined')
        TEMPLATE = null;
    else {
        TEMPLATE = GM_getValue('HITExport Template');
        EASYLINK = GM_getValue('HITExport Easylink');
    }
    if (TEMPLATE == null) {
        TEMPLATE = DEFAULT_TEMPLATE;
    }

    function get_requester_id(s) {
        var idx = 12 + s.search('requesterId=');
        return s.substr(idx);
    }

    function getRequesterAnchorsAndIds(a) {
        var rai = {};
        var re = new RegExp(/requesterId/);
        var rf = new RegExp(/contact/);
        for (var i = 0; i < a.length; i++) {
            var href = a[i].getAttribute('href');
            if (re.test(href) && !rf.test(href)) {
                var id = a[i].href.split('requesterId=')[1].split('&')[0]
                if (!rai.hasOwnProperty(id)) {
                    rai[id] = [];
                }
                rai[id].push(a[i]);
            }
        }
        return rai;
    }

    function buildXhrUrl(rai) {
        var url = API_MULTI_ATTRS_URL;
        var ri = Object.keys(rai);
        for (var i = 0; i < ri.length; i++) {
            url += ri[i];
            if (i < ri.length - 1) {
                url += ",";
            }
        }
        return url;
    }

    function makeXhrQuery(url) {
        var xhr = new XMLHttpRequest();
        try{
        	xhr.open('GET', url, false);
            xhr.send(null);
            return $.parseJSON(xhr.response);
        }
        catch(err){
            return "TO DOWN";
        }
    }

    function getNamesForEmptyResponses(rai, resp) {
        for (var rid in rai) {
            if (rai.hasOwnProperty(rid) && resp[rid] == "") {
                resp[rid] = $.parseJSON('{"name": "' + rai[rid][0].innerHTML + '"}');
            }
        }
        return resp;
    }

    function getKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }

    function apply_template(hit_data) {
        var txt = TEMPLATE;

        var vars = ['title', 'requester', 'requesterId', 'description', 'reward', 'qualifications', 'link', 'time', 'hits_available', 'to_stuff', 'to_text', 'adfly'];

        var resp = null;
        if (txt.indexOf('{to_text}') >= 0 || txt.indexOf('{to_stuff}') >= 0){
            var a = document.getElementsByTagName('a');
            var rai = getRequesterAnchorsAndIds(a);
            var url = buildXhrUrl(rai);
            resp = makeXhrQuery(url);
            console.log(resp);
            if (resp != "TO DOWN")
            	resp = getNamesForEmptyResponses(rai, resp);
        }
        var toText = "";
        var toStuff = "";
        var toData = "";
        var numResp = (resp == null || resp == "TO DOWN" ? "n/a" : resp[hit_data["requesterId"]].reviews);
        if (resp == "TO DOWN"){
            toStuff = " [URL=\""+TO_BASE+hit_data['requesterId']+"\"]TO down.[/URL]";
            toText = toStuff;
        }
        else if (resp == null || resp[hit_data["requesterId"]].attrs == null && resp != "TO DOWN") {
            toStuff = " No TO ";
            toText = " No TO ";
            toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['requesterId'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
            toStuff += "(Submit a new TO rating for this requester)[/URL]";
        }
        else {
            for (var key in resp[hit_data["requesterId"]].attrs) {
                //toText += "\n[*]"+key+": "+resp[hit_data["requesterId"]].attrs[key]+"\n";
                var i = 0;
                var color = "green";
                var name = key;
                var num = Math.floor(resp[hit_data["requesterId"]].attrs[key]);
                switch (key){
                    case "comm":
                        name = "Communicativity";
                        break;
                    case "pay":
                        name = "Generosity";
                        break;
                    case "fast":
                        name = "Promptness";
                        break;
                    case "fair":
                        name = "Fairness";
                        break;
                    default:
                        name = key;
                        break;
                }
                switch (num){
                    case 0:
                        color = "red";
                        break;
                    case 1:
                        color = "red";
                        break;
                    case 2:
                        color = "orange";
                        break;
                    case 3:
                        color = "yellow";
                        break;
                    default:
                        break;
                }
                toText += (num > 0 ? "\n[color="+color+"]" : "\n");
                for (i; i < num; i++){
                    toText += "[b]☢[/b]"
                }
                toText += (num > 0 ? "[/color]" : "")
                if (i < 5){
                    toText += "[color=white]";
                    for (i; i < 5; i++)
                        toText += "[b]☢[/b]";
                    toText += "[/color]";
                }
                toText += " "+Number(resp[hit_data["requesterId"]].attrs[key]).toFixed(2)+" "+name;
                toData += Number(resp[hit_data["requesterId"]].attrs[key]).toFixed(2) + ",";
            }
            //toText += "[/list]";
            toText += (txt.indexOf('{to_stuff}') >= 0 ? "" : "\nNumber of Reviews: "+numResp+"\n[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['requesterId'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"](Submit a new TO rating for this requester)[/URL]");
            toStuff = '\n[img]http://data.istrack.in/turkopticon.php?data=' + toData.slice(0,-1) + '[/img]';
            toStuff += (txt.indexOf('{to_stuff}') >= 0 ? (txt.indexOf('{to_text}') >= 0 ? "" : toText) : "");
            toStuff += "\nNumber of Reviews: "+numResp;
            toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['requesterId'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
            toStuff += "\n(Submit a new TO rating for this requester)[/URL]";
        }
        
        if (hit_data["link"] == null)
            hit_data["title"] += (hit_data["title"].indexOf(" (Cannot preview due to quals)") >= 0 ? "" : " (Cannot preview due to quals)");
        
        for (var i = 0; i < vars.length; i++) {
            t = new RegExp('\{' + vars[i] + '\}', 'g');
            if (vars[i] == "to_stuff") {
                txt = txt.replace(t, toStuff);
            }
            else if (vars[i] == "to_text"){
                txt = txt.replace(t, toText);
            }
            else
                txt = txt.replace(t, hit_data[vars[i]]);
        }
        textarea.value = txt;
    }

    function export_func(item) {
        return function () {
            HIT = item;
            EDIT = false;
            edit_button.textContent = 'Edit Template';
            apply_template(HITS[HIT]);
            div.style.display = 'block';
            textarea.select();
        }
    }

    function hide_func(div) {
        return function () {
            if (EDIT == false)
                div.style.display = 'none';
        }
    }

    function default_func() {
        return function () {
            GM_deleteValue('HITExport Template');
            TEMPLATE = DEFAULT_TEMPLATE;
            EDIT = false;
            edit_button.textContent = 'Edit Template';
            apply_template(HITS[HIT]);
        }
    }


    function edit_func() {
        return function () {
            if (EDIT == true) {
                EDIT = false;
                TEMPLATE = textarea.value;
                edit_button.textContent = 'Edit Template';
                apply_template(HITS[HIT]);
            }
            else {
                EDIT = true;
                edit_button.textContent = 'Show Changes';
                save_button.disabled = false;
                textarea.value = TEMPLATE;
            }
        }
    }

    function easy_func() {
        return function () {
            var input = prompt("Please enter your adfly easy link, or leave blank if you don't have one.");
            if (input.substring(input.length - 1) != "/")
                input += "/";
            EASYLINK = input;
            GM_setValue('HITExport Easylink', EASYLINK);
            var url = EASYLINK + hit_data["link"];
            hit_data["adfly"] = url;
            apply_template(hit_data);
        }
    }

    function save_func() {
        return function () {
            if (EDIT)
                TEMPLATE = textarea.value;
            GM_setValue('HITExport Template', TEMPLATE);
        }
    }

    for (var item = 0; item < 10; item++) {
        var tooltip = document.getElementById('requester.tooltip--' + item);
        if (tooltip == null)
            break; // no need to continue
        var titleElement = document.getElementById('capsule' + item + '-0');
        var requesterId = tooltip.parentNode.parentNode.getElementsByTagName('a');

        var hit_data = {};
        hit_data.title = titleElement.textContent.trim();

        for (var i = 0; i < requesterId.length; i++) {
            if (requesterId[i].href.match(/requesterId=/)) {
                hit_data.requesterId = get_requester_id(requesterId[i].href);
                hit_data.requester = requesterId[i].textContent.trim();
                break;
            }
        }

        hit_data.description = document.getElementById('description.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
        hit_data.reward = document.getElementById('reward.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
        hit_data.time = document.getElementById('duration_to_complete.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
        hit_data.hits_available = document.getElementById('number_of_hits.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
        //hit_data.to_stuff = toStuff;

        var linkElements = titleElement.parentNode.parentNode.getElementsByTagName('a');

        if (linkElements != null)
            for (var i = 0; i < linkElements.length; i++) {
                if (linkElements[i] != null && linkElements[i].textContent == 'View a HIT in this group' || linkElements[i].textContent == 'Preview this HIT') {
                    var url = EASYLINK + linkElements[i].href;
                    hit_data.adfly = url;
                    hit_data.link = linkElements[i].href;
                    break;
                }
            }

        var qElements = document.getElementById('qualificationsRequired.tooltip--' + item).parentNode.parentNode.parentNode.getElementsByTagName('tr');

        var qualifications = [];
        for (var i = 1; i < qElements.length; i++) {
            qualifications.push((qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ').indexOf("Masters") != -1 ? "[color=red][b]"+qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ')+"[/b][/color]" : qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ')));
        }
        hit_data.qualifications = (qualifications.join(', ') ? qualifications.join(', ') : "None");

        HITS[item] = hit_data;

        button = document.createElement('button');
        button.textContent = 'vB';
        button.title = 'Export this HIT description as vBulletin formatted text';

        button.style.height = '14px';
        button.style.width = '30px';
        button.style.fontSize = '8px';
        button.style.border = '1px solid';
        button.style.padding = '0px';
        button.style.backgroundColor = 'transparent';

        button.addEventListener("click", export_func(item), false);
        titleElement.parentNode.appendChild(button);
    }

    var div = document.createElement('div');
    var textarea = document.createElement('textarea');
    var div2 = document.createElement('label');

    div.style.position = 'fixed';
    div.style.width = '500px';
    div.style.height = '235px';
    div.style.left = '50%';
    div.style.right = '50%';
    div.style.margin = '-250px 0px 0px -250px';
    div.style.top = '300px';
    div.style.padding = '5px';
    div.style.border = '2px';
    div.style.backgroundColor = 'black';
    div.style.color = 'white';
    div.style.zIndex = '100';

    textarea.style.padding = '2px';
    textarea.style.width = '500px';
    textarea.style.height = '200px';
    textarea.title = '{title}\n{requester}\n{requesterId}\n{description}\n{reward}\n{qualifications}\n{link}\n{time}\n{hits_available}\n{to_stuff}\n{to_text}\n{adfly}';

    div.textContent = 'Press Ctrl+C to copy to clipboard. Click textarea to close';
    div.style.fontSize = '12px';
    div.appendChild(textarea);

    var edit_button = document.createElement('button');
    var save_button = document.createElement('button');
    var default_button = document.createElement('button');
    var easy_button = document.createElement('button');

    edit_button.textContent = 'Edit Template';
    edit_button.setAttribute('id', 'edit_button');
    edit_button.style.height = '18px';
    edit_button.style.width = '100px';
    edit_button.style.fontSize = '10px';
    edit_button.style.paddingLeft = '3px';
    edit_button.style.paddingRight = '3px';
    edit_button.style.backgroundColor = 'white';

    save_button.textContent = 'Save Template';
    save_button.setAttribute('id', 'save_button');
    save_button.style.height = '18px';
    save_button.style.width = '100px';
    save_button.style.fontSize = '10px';
    save_button.style.paddingLeft = '3px';
    save_button.style.paddingRight = '3px';
    save_button.style.backgroundColor = 'white';
    save_button.style.marginLeft = '5px';

    easy_button.textContent = 'Change Adfly Url';
    easy_button.setAttribute('id', 'easy_button');
    easy_button.style.height = '18px';
    easy_button.style.width = '100px';
    easy_button.style.fontSize = '10px';
    easy_button.style.paddingLeft = '3px';
    easy_button.style.paddingRight = '3px';
    easy_button.style.backgroundColor = 'white';
    easy_button.style.marginLeft = '5px';

    default_button.textContent = ' D ';
    default_button.setAttribute('id', 'default_button');
    default_button.style.height = '18px';
    default_button.style.width = '20px';
    default_button.style.fontSize = '10px';
    default_button.style.paddingLeft = '3px';
    default_button.style.paddingRight = '3px';
    default_button.style.backgroundColor = 'white';
    default_button.style.marginLeft = '5px';
    default_button.title = 'Return default template';


    div.appendChild(edit_button);
    div.appendChild(save_button);
    div.appendChild(default_button);
    div.appendChild(easy_button);
    save_button.disabled = true;

    div.style.display = 'none';
    textarea.addEventListener("click", hide_func(div), false);
    edit_button.addEventListener("click", edit_func(), false);
    save_button.addEventListener("click", save_func(), false);
    default_button.addEventListener("click", default_func(), false);
    easy_button.addEventListener("click", easy_func(), false);
    document.body.insertBefore(div, document.body.firstChild);
})();
