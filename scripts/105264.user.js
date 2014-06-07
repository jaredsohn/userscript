// EmailSpy v0.8
// By Dipesh Acharya (aka xtranophilist)
// Last updated: September 04, 2010

// This script extracts information like name, address, age, sex, interests, and photos from social
// networks using the e-mail addresses found in web-pages. The mashup is possible by employing Yahoo
// Pipes and Dapper and AJAX requests.
// The information is displayed in a new pop-up division over e-mail addresses in the page.
//

// ==UserScript==
// @name	  EmailSpy
// @namespace	  http://yespiracy.com/go/emailspy
// @author	  xtranophilist (Dipesh Acharya)
// @version	  v0.8
// @description	  Displays information about the owner of the e-mail addresses found in pages. Information includes name, photos, age, sex, address, interests, etc.
// @include	  http://*
// @include	  https://*
// @include	  file://*
// ==/UserScript==

function $(s) {
    return document.getElementById(s);
}

//add trim method for string
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function getElementsByClassName(className, tagName) {
    tagName = typeof(tagName) != 'undefined' ? tagName : '*';
    var result = new Array();
    var c = 0;
    var tags = document.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className == className) {
            result[c++] = tags[i];
        }
    }
    return result;
}

function findLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do curleft += obj.offsetLeft;
        while ((obj = obj.offsetParent));
        
        return [curleft];
    }
    return false;
}

function linkifyEmails() { //linkifies e-mail addresses
    //http://userscripts.org/scripts/show/1069
    var emailRegExp = /\b([a-zA-Z0-9_\-])+(\.([a-zA-Z0-9_\-])+)*@((\[(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))\]))|((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*))/ig;

    // tags we will scan looking for un-hyperlinked email addresses
    var allowedParents = ["abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe", "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"];

    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " + "contains(translate(., '@', '@'), '@')]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0;
        (cand = candidates.snapshotItem(i)); i++) {
        if (emailRegExp.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            emailRegExp.lastIndex = 0;
            for (var match = null, lastLastIndex = 0;
                (match = emailRegExp.exec(source));) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
                a.setAttribute("href", "mailto:" + match[0]);
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = emailRegExp.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
}


function getdb(i) {
    var db = document.createElement("span");
    db.id = 'dBox_' + i;
    db.className = 'dBox';
    db.setAttribute('style', ' border : 1px solid #ccc;text-align:inherit');


    db.addEventListener("mouseover", createDiv, false);
    db.addEventListener("mouseout", function () {
        document.getElementById('dCon_' + i).style.display = 'none';
    }, false);
    //    db.setAttribute("onmouseover","createDiv('"+ad+"',"+i+")");
    //  db.setAttribute("onmouseout", "$('dCon_"+i+"').style.display='none';");
    return db;
}

function createDiv() { //creates the pulldown division
    //see if content is already generated for the email address
    var ad = this.firstChild.href.replace('mailto:', '');
    var i = this.id.replace('dBox_', '');


    if ($('dCon_' + i)) {
        $('dCon_' + i).style.display = '';
        $('dCon_' + i).style.left = findLeft(this);
    }
    else {
        var d = document.createElement('div');
        d.className = 'dCon';
        d.setAttribute('style', 'left:12px;position:absolute; text-align:left; border : 5px solid #ccc; -moz-border-radius: 20px 20px 20px 20px;background-color: #C7BF8D; padding:10px 10px 10px 10px;z-index:100;');
        d.style.left = findLeft(this)+'px';
        var f = 1;
        d.id = 'dCon_' + i;
        var y = getElementsByClassName('dBox');
        for (x in y) {
            var e = y[x].firstChild.href.split(':')[1];
            if (e == ad) {

                if (y[x].firstChild.nextSibling) {
                    f = 0;
                    d.innerHTML = y[x].firstChild.nextSibling.innerHTML;
              
                    //d.style.left = findLeft($('dBox_' + i));
                    $('dBox_' + i).appendChild(d);
                }
            }
        }
        if (f) {
            d.innerHTML = getInner(ad, i);
            d.style.left = findLeft(this)+'px';
            $('dBox_' + i).appendChild(d);
        }
    }

}

function init() {

    linkifyEmails();
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    //Use X-Path to evaluate the anchor-tags
    an = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //lopp though each anchor tag
    for (var i = 0, item;
        (item = an.snapshotItem(i)); i++) {
        //get its link
        var l = item.href;
        //test if it is a e-mail address, if no mailto:, add it
        if (regex.test(l)) {
            regex.test(l);
            //&& l.substring(0,7)!='mailto:') l='mailto:'+l;
            //set its target attribute to newWin
            item.setAttribute("target", "_blank");
            //get the actual e-mail address emitting mailto:
            ad = l.replace('mailto:', '');
            //create the box
            db = getdb(i);
            //insert box into the document
            item.parentNode.insertBefore(db, item.nextSibling);
            db.appendChild(item);
        }
    }
}

function getInner(ad, i) { //html for all e-mails
    var str = '';

    str += '<a href="mailto:' + ad + '">E-mail!</a> | <a target="_blank" href="http://askwhole.com/checkemail/?e=' + ad + '">Validate E-mail!</a><br>'
    str += 'Manual Search : <a target="_blank" href="http://www.google.com.np/search?client=esus&q=' + ad + '"> Google! </a><br>';
    str += '<a target="_blank" href="http://www.facebook.com/search/?src=esus&q=' + ad + '">Facebook</a> | <a target="_blank" href="http://www.linkedin.com/search?search=&rd=out&keywords=' + ad + '">LinkedIn</a><br>';
    str += '<a target="_blank" href="http://www.intelius.com/searching.php?ReportType=43&qee=' + ad + '">Intelius!</a> | <a target="_blank" href="http://www.spokeo.com/email/search?e=' + ad + '">Spokeo!</a>';

    //get Hi5 info
    tmp = i;
    loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=153152fe16e2c5f839df2efbb46eac73&_render=json&_callback=processHi5&email=' + ad);
    str += '<div id="hi5_' + i + '">Searching Hi5...</div>';
    loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=f2544cd7f4d6d50a5a1cefcba089eeaa&_render=json&_callback=processMS&email=' + ad);
    str += '<div id="ms_' + i + '">Searching MySpace...</div>';

    str += '<br>' + getServiceText(ad);
    return str;
}

function getService(ad) { //find the service
    var s = ad.split('@')[1].split('.')[0]
    switch (s) {
        case 'gmail':
            return 'g';
            break;
        case 'yahoo':
            return 'y';
            break;
        case 'ymail':
            return 'y';
            break;
        case 'hotmail':
            return 'h';
            break;
        case 'live':
            return 'l';
            break;
        case 'msn':
            return 'm';
            break;
        case 'aim':
            return 'a';
            break;
        case 'aol':
            return 'o';
            break;
        default:
            return s;

    }
}

function getServiceText(ad) { //service dependent html
    var s = getService(ad);
    var str = '';
    user = ad.split('@')[0];
    switch (s) {
        case 'y':
            str += ad + " is in Yahoo!<br>";
            str += '<br><b>From Yahoo Messenger:</b><br>';
            str += '<img src="http://img.msg.yahoo.com/avatar.php?yids=' + user + '">';
            str += '<img src="http://opi.yahoo.com/online?t=14&u=' + user + '"><br>';
            //http://opi.yahoo.com/online?u=xtranophilist&t=22
            str += '<a href="ymsgr:sendIM?' + user + '">Send ' + user + ' a message</a><br>';
            str += '<a href="ymsgr:addFriend?' + user + '">Add Contact in Messenger!</a><br>';
            str += '<a href="ymsgr:sendIM?' + user + '&m=Ahoy, Matey!">Say Hello!</a><br>';
            str += '<div id="yp_' + tmp + '">Searching Yahoo Profiles...</div>';
            loadJS('http://open.dapper.net/transform.php?dappName=YPE&transformer=JSON&extraArg_callbackFunctionWrapper=processYP&v_Query=' + user);
            str += '<div id="yf_' + tmp + '">Searching Yahoo Flickr...</div>';
            loadJS('http://open.dapper.net/transform.php?dappName=YFE&transformer=JSON&extraArg_callbackFunctionWrapper=processYF&v_Query=' + user);
            break;
        case 'g':
            str += ad + " is in Google!<br>";
            str += '<div id="gp_' + tmp + '">Searching Google Profiles...</div>';
            loadJS('http://open.dapper.net/transform.php?dappName=GPE&transformer=JSON&extraArg_callbackFunctionWrapper=processGP&v_Query=' + user);
            str += '<div id="gpic_' + tmp + '">Searching Google Picasa...</div>';
            loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=eee96ba049a94647ed74fefe062b415d&_render=json&_callback=processGPic&user=' + user);
            break;
    }
    return str;
}

function loadJS(url) {
    setTimeout(function () {
        doRequest(url);
    }, 0);
}

function doRequest(url) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/json'
        },
        onload: function (xhr) {
            response = eval(xhr.responseText);
        }
    });
}

function processHi5(feed) {
    if (feed.value.items[0]) {
        $('hi5_' + tmp).innerHTML = '<br>Extracting information from hi5....';
        link = feed.value.items[0].link;
        loadJS('http://open.dapper.net/transform.php?dappName=hi5EVersion3&transformer=JSON&extraArg_callbackFunctionWrapper=processFullHi5&applyToUrl=' + link);
    }
    else {
        $('hi5_' + tmp).innerHTML = '<a target="_blank" href="http://hi5.com/friend/processBrowseSearch.do?searchText=' + ad + '">The e-mail address is not registered with Hi5 Network!</a>';
    }

}

function processFullHi5(feed) {
    var str = '<br><b>From hi5:</b>';
    if (feed.fields.name) str += '<br>Name:- ' + feed.fields.name[0].value + '';
    if (feed.fields.photo) str += '<br><img src="' + feed.fields.photo[0].src + '">';
    if (feed.fields.sexNAge) str += '<br>' + feed.fields.sexNAge[0].value;
    if (feed.fields.birthday) str += '<br>BirthDay:- ' + feed.fields.birthday[0].value;
    if (feed.fields.location) str += '<br>Location:- ' + feed.fields.location[0].value;
    if (feed.fields.interests) str += '<br>Interests:- ' + feed.fields.interests[0].value;
    if (feed.fields.status) str += '<br>Status:- ' + feed.fields.status[0].value;
    if (feed.fields.lastUpdate) str += ' (' + feed.fields.lastUpdate[0].value + ')';
    if (feed.fields.photoLink) str += '<br><a target="_blank" href="' + feed.fields.photoLink[0].href + '">More photos</a> ';
    if (feed.fields.photoCount) str += feed.fields.photoCount[0].value;
    $('hi5_' + tmp).innerHTML = str + '<br><br>';

}

function processMS(feed) {
    if (feed.value.items[0]) {
        $('ms_' + tmp).innerHTML = '<br>Extracting information from MySpace....';
        link = feed.value.items[0].content;
        loadJS('http://open.dapper.net/transform.php?dappName=MSEVersion2&transformer=JSON&extraArg_callbackFunctionWrapper=processFullMS&applyToUrl=' + link);
    }
    else {
        $('ms_' + tmp).innerHTML = '<a target="_blank" href="http://searchservice.myspace.com/index.cfm?fuseaction=sitesearch.results&type=People&qry=' + ad + '">The e-mail address is not registered with MySpace Network!</a>';
    }

}

function processFullMS(feed) {
    var str = '<br><b>From MySpace:</b>';
    if (feed.fields.name) str += '<br>Name:- ' + feed.fields.name[0].value + '';
    if (feed.fields.photo) str += '<br><img src="' + feed.fields.photo[0].src + '">';
    if (feed.fields.sex) str += '<br>Sex:- ' + feed.fields.sex[0].value;
    if (feed.fields.age) str += '<br>Age:- ' + feed.fields.age[0].value;
    if (feed.fields.address[0]) str += '<br>Address:- ' + feed.fields.address[0].value;
    if (feed.fields.address[1]) str += ',' + feed.fields.address[0].value;
    if (feed.fields.relation) str += '<br>Relation Status:- ' + feed.fields.relation[0].value;
    if (feed.fields.orientation) str += '<br>Orientation:- ' + feed.fields.orientation[0].value;
    if (feed.fields.body) str += '<br>Body:- ' + feed.fields.body[0].value;
    if (feed.fields.zodiac) str += '<br>Zodiac:-' + feed.fields.zodiac[0].value;
    if (feed.fields.children) str += '<br>Children:-' + feed.fields.children[0].value;
    if (feed.fields.education) str += '<br>Education:-' + feed.fields.education[0].value;
    if (feed.fields.occupation) str += '<br>Occupation:-' + feed.fields.occupation[0].value;
    if (feed.fields.morePics) str += '<br><a target="_blank" href="' + feed.fields.morePics[0].href + '">More photos</a> ';
    $('ms_' + tmp).innerHTML = str;

}




function processYP(feed) {
    if (feed.fields) {
        var str = '<br><b>From Yahoo Profiles</b>:';
        if (feed.fields.fullName) str += '<br>Name:- ' + feed.fields.fullName[0].value;
        if (feed.fields.photo) str += '<br><img src="' + feed.fields.photo[0].src + '">';
        if (feed.fields.info) str += '<br>Info:- ' + feed.fields.info[0].value;
        if (feed.fields.morePics) str += '<br><a target="_blank" href="' + feed.fields.morePics[0].href + '">More photos</a>';
        if (feed.fields.status) str += '<br>Status:- ' + feed.fields.status[0].value + '';
        if (feed.fields.lastUpdate) str += ' (' + feed.fields.lastUpdate[0].value + ')';
        if (feed.fields.memberSince) str += '<br>' + feed.fields.memberSince[0].value;
    }
    else {
        str = "Yahoo Profiles has not been created yet!";
    }
    $('yp_' + tmp).innerHTML = str;
}

function processYF(feed) {
    if (feed.fields) {
        var str = '<br><b>From FLickr</b>:';
        var n = feed.fields.name[0].value.replace("'s photostream", "");
        if (feed.fields.name) {
            str += '<br>Name:- ' + n;
        }
        str += '<br><a target="_blank" href="http://www.flickr.com/search/people/?q=' + user + '@yahoo.com">More photos</a>';
    }
    else {
        str = "<br>Yahoo Flickr has not been created yet!";
    }
    $('yf_' + tmp).innerHTML = str;
}


function processGP(feed) {
    if (feed.fields) {
        if (feed.fields.name) {
            var str = '<br><b>From Google Profiles:</b>';
            str += '<br>Name:- ' + feed.fields.name[0].value;
        }
        if (feed.fields.photo) str += '<br><img src="' + feed.fields.photo[0].src;
        if (feed.fields.gender) str += '<br>Sex:- ' + feed.fields.gender[0].value;
        if (feed.fields.address) str += '<br>Address:- ' + feed.fields.address[0].value;
        if (feed.fields.title) str += '<br>Title:- ' + feed.fields.title[0].value;
        if (feed.fields.organization) str += '<br>Organization:- ' + feed.fields.organization[0].value;
        if (feed.fields.school) str += '<br>School:- ' + feed.fields.school[0].value;
        if (feed.fields.status) str += '<br>Status:- ' + feed.fields.status[0].value;
        if (feed.fields.interest) str += '<br>Interests:- ' + feed.fields.interest[0].value;
        if (feed.fields.map) str += '<br><img src="' + feed.fields.map[0].src + '"><br>';
    }
    else {
        str = "Google Profiles has not been created yet!";
    }
    $('gp_' + tmp).innerHTML = str;
}



function processGPic(feed) {
    if (feed.value.items[0]) {
        var n = feed.value.items[0].title;
        n = n.trim();
        var str = '<br><b>From Google Picasa:</b><br>';
        str += 'Name:-' + n;
        str += '<br>Photo:-<a target="_blank" href="http://picasaweb.google.com/' + user + '"><img src="' + feed.value.items[0].content + '"></a>';
        str += '<br><a target="_blank" href="http://picasaweb.google.com/' + user + '">More photos</a>';
    }
    else {
        str = 'The user has not enabled Google Picasa!';
    }
    $('gpic_' + tmp).innerHTML = str;
}



init();
