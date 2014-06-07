// ==UserScript==
// @name           The united forums of 88FM 
// @namespace      http://88fm.albumart.co.il
// @description    Display posts from the official forum of 88FM in the unofficial forum 
// @include        http://www.88fm.albumart.co.il/*
// @include        http://88fm.albumart.co.il/*
// ==/UserScript==
//
// version 0.3
//





function getNextSibling(node) {
    node = node.nextSibling;

    while (node && node.nodeType != 1) {
        node = node.nextSibling;
    }    

    return node;
}    




function getPrevSibling(node) {
    node = node.previousSibling;

    while (node && node.nodeType != 1) {
        node = node.previousSibling;
    }    

    return node;
}


// from http://www.somacon.com/p355.php
function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}



// from http://www.mojavelinux.com/articles/javascript_hashes.html
function Hash()
{
    this.length = 0;
    this.items = [];

    for (var i = 0; i < arguments.length; i += 2) {
        if (typeof(arguments[i + 1]) != 'undefined') {
            this.items[arguments[i]] = arguments[i + 1];
            this.length++;
        }
    }

    this.removeItem = function(in_key)
    {
        var tmp_previous;
        if (typeof(this.items[in_key]) != 'undefined') {
            this.length--;
            tmp_previous = this.items[in_key];
            delete this.items[in_key];
        }

        return tmp_previous;
    };

    this.getItem = function(in_key) {
        return this.items[in_key];
    };

    this.setItem = function(in_key, in_value)
    {
        var tmp_previous;
        if (typeof(in_value) != 'undefined') {
            if (typeof(this.items[in_key]) == 'undefined') {
                this.length++;
            }
            else {
                tmp_previous = this.items[in_key];
            }

            this.items[in_key] = in_value;
        }

        return tmp_previous;
    };

    this.hasItem = function(in_key)
    {
        return typeof(this.items[in_key]) != 'undefined';
    };

    this.clear = function()
    {
        for (var i = 0; i < this.items.length; i++) {
            delete this.items[i];
        }

        this.length = 0;
    };
}





function zeroPad(num) {
    var st = num.toString();
    if (num < 10) {
        st = '0' + st;
    } 
    return st;

} 



















var artTimeRegexp = /((\d+)\s+([^\s]+)\s+(\d+),\s+[^:]+:|<b>([^<>]+)<\/b>\s*[^\-]+\-\s*)(\d+):(\d+):(\d+)/;




function getArtTime() {
    var divs = document.evaluate(
            "//div[@class='module']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    // alert(divs.snapshotLength);
    var div = divs.snapshotItem(0);
    var td = div.getElementsByTagName("td")[0];
    var html = td.innerHTML;
    var matches = html.match(artTimeRegexp);

    var dateSt = matches[0];


    return dateSt;

}

var hebMonths = new Hash(
        'ינואר', 1,
        'פברואר',2,
        'מרץ',3,
        'אפריל',4,
        'מאי',5,
        'יוני',6,
        'יולי',7,
        'אוגוסט',8,
        'ספטמבר',9,
        'אוקטובר',10,
        'נובמבר',11,
        'דצמבר',12
        ); // dsdl;kl;



var forums = new Hash(
        '69', {ibaCode: '37', title: '"זהב שחור" - עם מיכל דוקרסקי' },
        '67', {ibaCode: '32', title: '"רוקר טוב" - עם בועז כהן' },
        '17', {ibaCode: '29', title: '"חורף גורלי" - עם אבנר גורלי' },
        '64', {ibaCode: '30', title: '"שעת ה- G" - עם גליה גלעדי' },
        '72', {ibaCode: '26', title: '"נותן ברוק" - עם בן רד' },
        '84', {ibaCode: '35', title: '"דרייב טיים" - שעתיים בדרך עם משה מורד' },
        '68', {ibaCode: '24', title: '"ערב עירוני" - עם גדי ליבנה' },
        '66', {ibaCode: '23', title: '"בא בערב" - עם רוני ורטהיימר' },
        '74', {ibaCode: '36', title: 'לילה של אלבומים' },
        '85', {ibaCode: '43', title: '"גלגל שישי" עם גל אפלרויט' },
        
        '58', {ibaCode: '38', title: '"דיבור חדיש" - עם יובל גנור' }


        ); 

var users = new Hash(
        'מיכל_דוקרסקי', {code: '202', title: 'מיכל דוקרסקי'},
        'יובל גנור', {code: '406', title: 'יובל גנור'},

        'משה_מורד', {code: '1021', title: 'משה'},
        'בועז_כהן', {code: '66', title: 'בועז כהן'},
        'גליה_גלעדי', {code: '2999', title: 'גליה גלעדי'},
        'אבנר_גורלי', {code: '357', title: 'אבנר גורלי'},
        'בן_רד', {code: '3385', title: 'בן רד'},
        'גדי_ליבנה', {code: '3077', title: 'גדי ליבנה'},
        
         'גל אפלרויט', {code: '182', title: 'גלגל'},
        'רוני_ורטהיימר', {code: '180', title: 'רוני ורטהיימר'}



        ); 



var guest_code = '123456';



function monthName2Num(st) {
    return hebMonths.getItem(st);
}

function monthNum2Name(num) {
    var st = '';
    for (var k in hebMonths.items) {
        if (hebMonths.items[k] == num) {
            st = k;
        }
    }        
    return st;
}



function artTime2Time(st) {

    var month1;
    var nowSt;
    var matches2;
    var day;
    var month;
    var year;
    var matches1 = st.match(artTimeRegexp);
    if (matches1[2] === undefined) {
        nowSt = getArtTime();

        matches2 = nowSt.match(artTimeRegexp);
        day = matches2[2];
        month1 = matches2[3].substring(1, matches2[3].length);
        month = monthName2Num(month1) - 1;
        year = matches2[4];
    }
    else {
        day = matches1[2];
        month1 = matches1[3].substring(1, matches1[3].length);
        month = monthName2Num(month1) - 1;
        year = matches1[4];
    }

    var hour = matches1[6];
    var minute = matches1[7];
    var second = matches1[8];


    var time = new Date(parseInt(year, 10), parseInt(month,10), parseInt(day,10), parseInt(hour,10), parseInt(minute,10), parseInt(second,10));
    if (matches1[5] == 'אתמול') {
        time.setDate(time.getDate() - 1); 
    }

    return time;

}




function time2ArtTime(time, absolute) {

    var artNow = artTime2Time(getArtTime());
    var dateSt;
    var today = new Date(artNow.getFullYear(), artNow.getMonth(), artNow.getDate());
    var yesterday = new Date(artNow.getFullYear(), artNow.getMonth(), artNow.getDate());
    yesterday.setDate(today.getDate() - 1);
    if (!absolute && time >= today) {
        dateSt = '<b>היום</b> ב- ';
    }
    else if (!absolute && time >= yesterday) {
        dateSt = '<b>אתמול</b> ב- ';
    }
    else {
        dateSt = zeroPad(time.getDate());
        dateSt += ' ' + 'ב' + 
            zeroPad(monthNum2Name(time.getMonth() + 1)) + ' ' + 
            time.getFullYear() + ', ' + 'שעה:' ;
    }        

    var timeSt = dateSt +         
        zeroPad(time.getHours()) + ':' +
        zeroPad(time.getMinutes()) + ':' +
        zeroPad(time.getSeconds())  ;

    return timeSt;
}




function ibaTime2Time(dateSt, timeSt) {

    var matches = dateSt.match(/(\d{2})\/(\d{2})\/(\d{2})/);
    var year = matches[3];
    var month = matches[2];
    var day =  matches[1];
    matches = timeSt.match(/(\d{2}):(\d{2})/);
    var hour = matches[1];
    var minute = matches[2];
    var time = new Date(parseInt(year,10) + 2000, parseInt(month,10) - 1, parseInt(day,10), parseInt(hour,10), parseInt(minute,10));
    return time;


}






function html2bbcode(rootElm) {
    var before = '';
    var after = '';
    var content = '';
    var elm;

    switch(rootElm.nodeName)
    {
        case 'BR':
            before = '<br />';
            break;
        case 'TABLE':
            before = '[table]';
            after = '[/table]';
            break;
        case 'TR':
            before = '[tr]';
            after = '[/tr]';
            break;
        case 'TD':
            before = '[td]';
            after = '[/td]';
            break;
        case 'U':
            before = '[u]';
            after = '[/u]';
            break;
        case 'STRONG':
            before = '[b]';
            after = '[/b]';
            break;
        case 'A':
            before = '[url=' + rootElm.href + ']';
            after = '[/url]';
            break;

        default:
            before = '';
            after = '';

    }    

    if (rootElm.nodeName == 'BR') {

    }

    for (var i in rootElm.childNodes) {
        if (rootElm.childNodes[i].nodeType) {
            elm = rootElm.childNodes[i];
            if (elm.nodeType != 1 ) {
                content += elm.textContent;
            }
            else {
                content += html2bbcode(elm);
            }
        }     
    }

    return before + content + after;
}








function ArtLastMsgSummary(forumCode) {
    this.forumCode = forumCode;
    this.load = function(rootElm) {
        this.title = null; 
        this.dateSt = null;
        this.titleElm = null;

        var html;   
        var a;

        this.rootElm = rootElm;
        html = rootElm.innerHTML;
        this.dateSt = html.substr(0, html.indexOf('<br'));
        a = this.rootElm.getElementsByTagName("a");
        this.linkElm = a[0];
        this.userElm = a[1];
        this.theTime = artTime2Time(this.dateSt);



    };




    this.setLink = function(url) {
        this.linkElm.setAttribute('href', url);
    };

    this.getTheTime = function() {
        return this.theTime;


    };    

    this.setForumCode = function(code) {
        this.forumCode = code;

    };    

    this.setTheTime = function(time) {
        var st = this.rootElm.innerHTML.replace(artTimeRegexp, time2ArtTime(time));
        this.rootElm.innerHTML = st;
        this.load(this.rootElm);


    };    

    this.setUser = function(user) {
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=profile;u=' + user.code;

        this.userElm.setAttribute('href', url);
        this.userElm.textContent = user.title;


    };     


    this.merge = function(ibaTopic) {
        this.setTheTime(ibaTopic.getTheTime());
        var url =
            'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&topic=4176.msg12525' +
            '&show_message_id=' + ibaTopic.getCode() +
            '&forum_id=' + this.forumCode +
            '#new' ;

        this.setLink(url);
        this.setUser(ibaTopic.getUser());
    };       


}






















function ArtTopicSummary(forumCode) {

    this.forumCode = forumCode;
    this.load = function(rootElm) {


        this.rootElm = rootElm;
        var tds = this.rootElm.getElementsByTagName("td");

        var a = tds[2].getElementsByTagName("a");

        this.titleElm = a[0];
        this.title = this.titleElm.textContent;
        this.ibaCode = null;   
        var matches = this.title.match(/\[=(\d+)=\]/);
        if (matches) {
            this.ibaCode = matches[1];
        }

        a = tds[3].getElementsByTagName("a");
        this.userElm = a[0];
        this.lastMsgElm = tds[6];
        this.lastMsg = new ArtLastMsgSummary(this.forumCode);
        this.lastMsg.load(this.lastMsgElm);



    };




    this.init = function() {

        var st =
            '        <tr class="windowbg2">' + 
            '					<td align="center" width="5%" valign="middle">' + 
            '						<img alt="" src="http://www.88fm.albumart.co.il/smf/Themes/Electron1/images/topic/normal_post.gif"/>' + 
            '					</td>' + 
            '					<td align="center" width="4%" valign="middle">' + 
            '						<img alt="" src="http://www.88fm.albumart.co.il/smf/Themes/Electron1/images/post/xx.gif"/>' + 
            '					</td>' + 
            '					<td width="42%" valign="middle" class="windowbg">' + 
            '						<span id="msg_26516"><a href="http://www.88fm.albumart.co.il/index.php?option=com_smf&amp;Itemid=2&amp;topic=9026.0">מיכל תודה</a></span>' + 
            '						<span id="pages26516" class="smalltext"/>' + 
            '					</td>' + 
            '					<td width="14%" valign="middle">' + 
            '						<a title="צפה בפרופיל של asix" href="http://www.88fm.albumart.co.il/index.php?option=com_smf&amp;Itemid=2&amp;action=profile;u=2641">asix</a>' + 
            '					</td>' + 
            '					<td align="center" width="4%" valign="middle" class="windowbg">' + 
            '						0' + 
            '					</td>' + 
            '					<td align="center" width="4%" valign="middle" class="windowbg">' + 
            '						20' + 
            '					</td>' + 
            '					<td width="22%" valign="middle" class="smalltext">' + 


            '						11 בדצמבר 2009, שעה:11:56:43<br/><a alt="תגובה אחרונה" href="http://www.88fm.albumart.co.il/index.php?option=com_smf&amp;Itemid=2&amp;topic=9026.0#new">פורסם ע"י:</a>:' +   
            '						<a href="http://www.88fm.albumart.co.il/index.php?option=com_smf&amp;Itemid=2&amp;action=profile;u=2641">asix</a>' + 
            '					</td>' + 
            '				</tr>';

        var table = document.createElement('table');
        table.innerHTML = st;
        var trs = table.getElementsByTagName("tr");
        var rootElm = trs[0];
        this.load(rootElm);



    };


    this.getRoot = function() {
        return this.rootElm;

    };    


    this.setTheTime = function(time) {
        this.lastMsg.setTheTime(time);
        this.load(this.rootElm);

    };    



    this.getTheTime = function() {
        return this.lastMsg.getTheTime();
    }; 


    this.getTitle = function() {
        return this.titleElm.textContent;
    };     



    this.getIbaCode = function() {
        return this.ibaCode;
    };     



    this.setTitle = function(title) {
        this.titleElm.textContent = title;
    };     

    this.setForumCode = function(code) {
        this.forumCode = code;

    };    


    this.setLink = function(url) {
        this.titleElm.setAttribute('href', url);
    };     


    this.setUser = function(user) {
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=profile;u=' + user.code;
        this.userElm.setAttribute('href', url);
        this.userElm.textContent = user.title;
    };     


    this.merge = function(ibaTopic, withLastMsg) {
        if (withLastMsg) {
            this.lastMsg.merge(ibaTopic);
        }
        this.setTitle(ibaTopic.getTitle());
        if (!this.ibaCode) {
            var url =
                'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&topic=4176.0' +
                '&show_message_id=' + ibaTopic.getCode() +
                '&forum_id=' + this.forumCode; 
            this.setLink(url);
        }        

        this.setUser(ibaTopic.getUser());

    };       




}






function ArtLastTopicSummary(forumCode) {
    this.forumCode = forumCode;
    this.load = function(rootElm) {

        this.title = null; 
        this.dateSt = null;
        this.titleElm = null;
        this.theTime = null;

        var html;   
        var a;

        this.rootElm = rootElm;
        html = rootElm.innerHTML;
        if (html.indexOf('<br') > 1) {
            this.dateSt = html.substr(0, html.indexOf('<br'));

            a = this.rootElm.getElementsByTagName("a");
            this.titleElm = a[0];
            this.title = this.titleElm.textContent;

            this.userElm = a[1];
            this.theTime = artTime2Time(this.dateSt);
        }    



    };




    this.setTitle = function(title) {
        if (this.titleElm) {
            this.titleElm.textContent = title;
            this.load(this.rootElm);
        }   
    };     

    this.setLink = function(url) {
        if (this.titleElm) {
            this.titleElm.setAttribute('href', url);
        }   
    };     



    this.setTheTime = function(time) {
        var st = this.rootElm.innerHTML.replace(artTimeRegexp, time2ArtTime(time));
        this.rootElm.innerHTML = st;
        this.load(this.rootElm);


    };    

    this.getTheTime = function() {
        return this.theTime;
    };     


    this.setForumCode = function(code) {
        this.forumCode = code;

    };    


    this.setUser = function(user) {
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=profile;u=' + user.code;
        if (this.userElm) {

            this.userElm.setAttribute('href', url);
            this.userElm.textContent = user.title;


        }   
    };     


    this.merge = function(ibaLastTopicSummary) {
        if (this.theTime && this.theTime < ibaLastTopicSummary.getTheTime()) {
            this.setTitle(ibaLastTopicSummary.getTitle());
            this.setTheTime(ibaLastTopicSummary.getTheTime());
            var url =
                'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&topic=4176.0' + 
                '&show_message_id=' + ibaLastTopicSummary.getCode() +
                '&forum_id=' + this.forumCode ;
            this.setLink(url);
            this.setUser(ibaLastTopicSummary.getUser());
        }     
    };       


}


function ArtForumSummary() {

    this.load = function(rootElm) {
        var tds;
        var b;
        var href;
        var matches;

        this.rootElm = rootElm;
        tds = this.rootElm.getElementsByTagName("td");
        b = tds[1].getElementsByTagName("b")[0];
        this.titleElm = b.getElementsByTagName("a")[0];
        this.codeElm = this.titleElm;
        this.title = this.titleElm.innerHTML;
        href = this.codeElm.getAttribute('href');
        matches = href.match(/board=(\d+)\./);
        this.code = matches[1];
        this.lastTopicElm = tds[4];
        this.lastTopicSummary = new ArtLastTopicSummary(this.code);
        this.lastTopicSummary.load(this.lastTopicElm);

    };    

    this.getTitle = function() {
        return this.title;
    }; 



    this.getCode = function() {
        return this.code;
    }; 

    this.lastTopic = function() {
        return this.lastTopicSummary;
    }; 

    this.ibaCode = function() {
        var retVal = null;
        if (forums.hasItem(this.code)) {
            retVal = forums.getItem(this.code).ibaCode;
        }    
        return retVal;
    };

    this.merge = function(ibaForumSummary) {

        var ibaLastTopic = ibaForumSummary.lastTopic();
        if (ibaLastTopic) {
            this.lastTopicSummary.merge(ibaLastTopic);
        }
    };



}




function ArtForumList() {

    this.items = [];
    this.load = function() {
        var tr;
        var summary;
        var trs = document.evaluate(
                "//tr[@class='windowbg2']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.items = [];
        for (var i = 0; i < trs.snapshotLength; i++) {
            tr = trs.snapshotItem(i);
            summary = new ArtForumSummary();
            summary.load(tr);
            this.items.push(summary);
        }

    }; 

    this.summaries = function() {
        return this.items;
    };

    this.merge = function(ibaForumList) {

        var summary;
        var ibaSummary;
        for (var i in this.items) {
            if (this.items[i] instanceof ArtForumSummary) {
                summary = this.items[i];
                if (summary.ibaCode()) {
                    ibaSummary = ibaForumList.summaryOf(summary.ibaCode());
                    summary.merge(ibaSummary);
                }
            }
        }
    };


}





function ArtMsg(forumCode, ibaTopicCode) {
    this.forumCode = forumCode;
    this.ibaTopicCode = ibaTopicCode;

    this.load = function(rootElm) {


        this.rootElm = rootElm;
        var a = document.evaluate(
                '//td[@class="posterbg"]//a',
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        this.userElm = a.snapshotItem(0);

        var tds = document.evaluate(
                '//td[@class="posterbg1"]',
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        this.userDetailsElm = tds.snapshotItem(0);


        a = document.evaluate(
                '//div[starts-with(@id,"subject")]//a',
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);


        this.titleElm = a.snapshotItem(0);
        this.linkElm = this.titleElm;
        this.timeElm = getNextSibling(this.titleElm);
        var divs = document.evaluate(
                '//div[@class="post"]',
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.contentElm = divs.snapshotItem(0);

        divs = document.evaluate(
                '//div[@class="signature"]',
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.signatureElm = divs.snapshotItem(0);


    };    



    this.setUser = function(user) {
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=profile;u=' + user.code;

        this.userElm.setAttribute('href', url);
        this.userElm.textContent = user.title;


    };     



    this.setTitle = function(title) {
        this.titleElm.textContent = title;
    };     

    this.setLink = function(url) {
        this.linkElm.setAttribute('href', url);
    };     



    this.setTheTime = function(time) {
        var st = this.timeElm.innerHTML.replace(artTimeRegexp, time2ArtTime(time));
        this.timeElm.innerHTML = st;
        this.load(this.rootElm);


    };    


    this.setContent = function(st) {
        this.contentElm.innerHTML = st;
        // this.load(this.rootElm);


    };    

    this.setSignature = function(content) {
        if (this.signatureElm) {
            this.signatureElm.innerHTML = content;
            // this.load(this.rootElm);
        }    


    };    


    this.clean = function() {
        this.userDetailsElm.innerHTML = '';

        var elm;
        var a = document.evaluate(
                ".//a[contains(@href,'action=post')]",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);


        for (var i = 0; i < a.snapshotLength; i++) {
            elm = a.snapshotItem(i);
            elm.parentNode.removeChild(elm);
        }    



    };


    this.merge = function(ibaTopic) {

        this.setUser(ibaTopic.getUser());
        this.setTitle(ibaTopic.getTitle());
        this.setTheTime(ibaTopic.getTheTime());

        var linkToOrg = 
            '<a target="_blank" href="http://www.iba.org.il/forum/message.aspx?fid=' +
            forums.getItem(this.forumCode).ibaCode + '&amp;show_message_id=' + this.ibaTopicCode + '">ההודעה המקורית</a>';

        this.setContent(ibaTopic.getContentElm().innerHTML + '<br /> ' + linkToOrg);

        this.clean();

    };



}










function ArtTopic(forumCode, ibaTopicCode, isVirtual) {
    this.forumCode = forumCode;
    this.ibaTopicCode = ibaTopicCode;
    this.isVirtual = isVirtual;

    this.items = [];
    this.load = function() {
        var matches;
        var artMsg;
        this.rootElm = document.getElementById('bodyarea');
        var a = this.rootElm.getElementsByTagName("a");
        this.topicLinkElm = a[5];
        var td;
        var i;
        var elm;
        var tds = document.evaluate(
                "//td[contains(text(),'נושא:')]",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.headerElm = tds.snapshotItem(0);
        if (!this.ibaTopicCode) {
            matches = this.headerElm.textContent.match(/\[=(\d+)=\]/);
            if (matches) {
                this.ibaTopicCode = matches[1];
            }
        }


        var navs = document.evaluate(
                "//a[@class='nav']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.linkElm = navs.snapshotItem(3);
        this.forumLinkElm = navs.snapshotItem(2);
        this.forumTitleElm = this.forumLinkElm;
        if (!this.forumCode) {
            matches = this.forumLinkElm.href.match(/board=(\d+)/);
            if (matches) {
                this.forumCode = matches[1];
            }
        }

        tds = document.evaluate(
                "//td[@class='post']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);


        for (i = 0; i < tds.snapshotLength; i++) {
            td = tds.snapshotItem(i);
            artMsg = new ArtMsg(this.forumCode, this.ibaTopicCode);
            artMsg.load(td);
            this.items.push(artMsg);


        }

        if (this.isVirtual) {
            a = document.evaluate(

                    ".//img[contains(@src,'reply')]/..",
                    this.rootElm,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);


            for (i = 0; i < a.snapshotLength; i++) {
                elm = a.snapshotItem(i);
                elm.href = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=post;board=' +
                    this.forumCode + '.0' + '&show_message_id=' + this.ibaTopicCode;
            }
        }     




    };    





    this.getIbaCode = function() {
        return this.ibaTopicCode;
    };    


    this.getForumCode = function() {
        return this.forumCode;
    };     


    this.setTitle = function(title) {
        this.headerElm.textContent = 'נושא: ' + title;
        this.linkElm.textContent = title;
    };     

    this.setLink = function(url) {
        this.linkElm.setAttribute('href', url);
    };     


    this.setForumLink = function(url) {
        this.forumLinkElm.setAttribute('href', url);
    };     

    this.setForumTitle = function(title) {
        this.forumTitleElm.textContent = title;
    };     


    this.msgs = function() {
        return this.items;
    };



    this.clean = function() {
        var elm;
        var a = document.evaluate(
                "//a[contains(@href,'action=markasread') or contains(@href,'action=sendtopic')]",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);


        for (var i = 0; i < a.snapshotLength; i++) {
            elm = a.snapshotItem(i);
            elm.parentNode.removeChild(elm);
        }    
    }; 

    this.merge = function(ibaTopic) {

        this.setTitle(ibaTopic.getTitle());
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&topic=4176.0' +
            '&show_message_id=' + this.ibaTopicCode +
            '&forum_id=' + this.forumCode;
        this.setLink(url);
        url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&board=' + this.forumCode + '.0';
        this.setForumLink(url);
        this.setForumTitle(forums.getItem(this.forumCode).title);



        this.items[0].merge(ibaTopic);
        this.clean();

    };



}





function IbaTopic(rootElm) {

    this.load = function(rootElm) {
        this.rootElm = rootElm;


        var tds = this.rootElm.getElementsByTagName("td");
        this.timeElm = tds[0];
        this.titleElm = tds[2].getElementsByTagName("a")[0];
        this.title = this.titleElm.textContent;
        this.codeElm = this.timeElm; 
        var matches = this.codeElm.getAttribute('id').match(/MsgDate(\d+)$/);
        this.code = matches[1];
        this.userElm = tds[1];
        var a = this.userElm.getElementsByTagName("a");

        this.userTitle = trim(a[0].textContent);
        this.user = users.getItem(this.userTitle);
        if (!this.user) {
            this.user = {title: this.userTitle, code: guest_code};
        }
        var timeArray = trim(this.timeElm.textContent).split(' ');
        this.theTime = ibaTime2Time(timeArray[0], timeArray[1]);
        tds = document.evaluate(
                "//td[@class='MsgContent']//td[@class='break_word']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.contentElm = tds.snapshotItem(0);

    };



    this.getTheTime = function() {

        return this.theTime;
    };

    this.getTitle = function() {
        return this.title;
    }; 

    this.getCode = function() {
        return this.code;
    }; 
    this.getUser = function() {
        return this.user;
    }; 

    this.getContentElm = function() {
        return this.contentElm;
    }; 



}








function findIbaTopicRoots(containerElm) {

    var tds = document.evaluate(
            ".//td[contains(@id,'MsgSubject')]",
            containerElm,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

    var a = [];   
    for (var i = 0; i < tds.snapshotLength; i++) {
        if (tds.snapshotItem(i).firstChild.textContent.length === 0) {
            a.push(tds.snapshotItem(i).parentNode);
        }  
    }

    return a;


}



function mergeTopicSummary(responseDetails) {
    var url = window.location.href;

    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);
    var forumCode = url.match(/forum_id=(\d+)/)[1];
    var ibaTopicCode = url.match(/show_message_id=(\d+)/)[1];
    var ibaTopic = new IbaTopic();

    var tr = findIbaTopicRoots(div)[0];
    ibaTopic.load(tr);

    var artTopic = new ArtTopic(forumCode, ibaTopicCode);
    artTopic.load();
    artTopic.merge(ibaTopic);

}


function ArtForum(forumCode) {

    this.forumCode = forumCode;
    this.items = [];
    this.foreignItems = new Hash();
    this.load = function() {
        var tr;
        var summary;
        var trs = document.evaluate(
                "//tr[@class='windowbg2']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.items = [];
        for (var i = 0; i < trs.snapshotLength; i++) {
            tr = trs.snapshotItem(i);
            summary = new ArtTopicSummary(this.forumCode);
            summary.load(tr);
            this.items.push(summary);
            if (summary.getIbaCode()) {
                this.foreignItems.setItem(summary.getIbaCode(), summary);
            }
        }

    }; 

    this.summaries = function() {
        return this.items;
    };


    this.getHandler = function(artSummary) {
        return function(responseDetails) {
                           var resp = responseDetails.responseText;
    
                            var from = resp.indexOf('<form');
                            var to = resp.indexOf('</form>') + '</form>'.length;
    
                            var div = document.createElement('div');
                            div.innerHTML = resp.substr(from, to - from + 1);
                            var ibaTopic = new IbaTopic();
    
                            var tr = findIbaTopicRoots(div)[0];
                            ibaTopic.load(tr);
                            artSummary.merge(ibaTopic);
        };
    };


    this.merge = function(ibaForum) {

        var ibaTopics = ibaForum.topics();
        var ibaIndex = 0;
        var artIndex = 0;
        var ibaTopic;
        var artSummary = this.items[artIndex];
        var newSummary;
        var newRoot;
        var i;
        for (ibaIndex in ibaTopics) {
            if (ibaTopics[ibaIndex] instanceof IbaTopic) {
                ibaTopic = ibaTopics[ibaIndex];
                if (!this.foreignItems.hasItem(ibaTopic.getCode())) {
                    newSummary = new ArtTopicSummary(this.forumCode);
                    newSummary.init();
                    newSummary.merge(ibaTopic, true);

                    newRoot = newSummary.getRoot();
                    while ((artIndex < this.items.length - 1) && (newSummary.getTheTime() < artSummary.getTheTime())) {
                        artIndex++;
                        artSummary = this.items[artIndex];
                    }
                    if (newSummary.getTheTime() >= artSummary.getTheTime()) {    
                        artSummary.getRoot().parentNode.insertBefore(newRoot, artSummary.getRoot());
                    }
                    else
                    {
                        artSummary.getRoot().parentNode.insertBefore(newRoot, getNextSibling(artSummary.getRoot()));
                    }
                    if (artIndex == this.items.length - 1) {
                        artSummary = newSummary;
                    }   
                }
            } 
        }


        for (i in this.foreignItems.items) {
            if (this.foreignItems.items[i] instanceof ArtTopicSummary) {
                ibaTopic = ibaForum.getTopic(i);
                artSummary = this.foreignItems.items[i];
                if (ibaTopic) {
                    artSummary.merge(ibaTopic);
                }    
                else {

                    GM_xmlhttpRequest({
                        method : 'GET',
                        url    : 'http://www.iba.org.il/forum/message.aspx?fid=' + forums.getItem(this.forumCode).ibaCode + '&show_message_id=' + i,
                        artTopicSummary : artSummary,
                        onload : this.getHandler(artSummary) 
                    });
                }
            }
        }           
    
        this.load();

    }; 

    
}

















function ArtReply(forumCode, ibaTopicCode) {
    this.forumCode = forumCode;
    this.ibaTopicCode = ibaTopicCode;

    this.items = [];
    this.load = function() {
        this.rootElm = document.getElementById('bodyarea');
        var a = this.rootElm.getElementsByTagName("a");
        this.forumLinkElm = a[4];
        this.topicLinkElm = a[5];

        var navs = document.evaluate(
                "//a[@class='nav']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.linkElm = navs.snapshotItem(3);
        this.forumLinkElm = navs.snapshotItem(2);
        this.forumTitleElm = this.forumLinkElm;

        var inputs = document.evaluate(
                ".//input[@name='subject']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.titleInputElm = inputs.snapshotItem(0);
        this.mainInputElm = this.rootElm.getElementsByTagName("textarea")[0];



    };    






    this.setTitle = function(title) {
        this.titleInputElm.value = 'בעניין: ' + title;
        this.linkElm.textContent = 'בעניין: ' + title;
    };     

    this.setLink = function(url) {
        this.linkElm.setAttribute('href', url);
    };     


    this.setForumLink = function(url) {
        this.forumLinkElm.setAttribute('href', url);
    };     

    this.setForumTitle = function(title) {
        this.forumTitleElm.textContent = title;
    };     


    this.msgs = function() {
        return this.items;
    };

    this.clean = function() {
    }; 

    this.merge = function(ibaTopic) {

        this.setTitle(ibaTopic.getTitle());
        var url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&topic=4176.0' +
            '&show_message_id=' + this.ibaTopicCode +
            '&forum_id=' + this.forumCode;
        this.setLink(url);
        url = 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&board=' + this.forumCode + '.0';
        this.setForumLink(url);
        this.setForumTitle(forums.getItem(this.forumCode).title);

        this.clean();

    };



}















function ArtNewTopic(forumCode, ibaTopicCode) {
    this.forumCode = forumCode;
    this.ibaTopicCode = ibaTopicCode;

    this.items = [];
    this.load = function() {
        this.rootElm = document.getElementById('bodyarea');

        var inputs = document.evaluate(
                ".//input[@name='subject']",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        this.titleInputElm = inputs.snapshotItem(0);
        this.mainInputElm = this.rootElm.getElementsByTagName("textarea")[0];



    };    






    this.setTitleInput = function(title) {
        this.titleInputElm.value = title;
    };     

    this.setMainInput = function(st) {
        this.mainInputElm.textContent = st;
    };        


    this.msgs = function() {
        return this.items;
    };

    this.clean = function() {
    }; 

    this.merge = function(ibaTopic) {

        this.titleInputElm.disabled = 'disabled';
        this.mainInputElm.disabled = 'disabled';
        this.setTitleInput(ibaTopic.getTitle() + ' [=' + this.ibaTopicCode + '=]');
        var user = ibaTopic.getUser();
        var div = document.createElement('div');
        div.innerHTML = ibaTopic.getContentElm().innerHTML;
        var content = html2bbcode(div);
        var st = 
            '[hr]' +
            "\n" + time2ArtTime(ibaTopic.getTheTime(), true) +
            "\n" + 'נושא: ' + ibaTopic.getTitle() +
            "\n" + 'ע"י: ' + '[url=' + 'http://www.88fm.albumart.co.il/index.php?option=com_smf&Itemid=2&action=profile;u=' + 
            user.code + ']' + user.title + '[/url]' +
            "\n" + '[url=' + 'http://www.iba.org.il/forum/message.aspx?fid=' +
            forums.getItem(this.forumCode).ibaCode + '&show_message_id=' + this.ibaTopicCode + ']' + 'ההודעה המקורית' + '[/url]' +

            "\n" + '[hr]' +
            "\n" + content;


        var context = this;
        unsafeWindow.origSubmitThisOnce = unsafeWindow.submitThisOnce; 
        unsafeWindow.submitThisOnce = function(x) {
            context.titleInputElm.removeAttribute('disabled');
            context.mainInputElm.removeAttribute('disabled');
            return unsafeWindow.origSubmitThisOnce(x);
        };


        this.setMainInput(st);

        this.clean();

    };



}






















function IbaLastTopicSummary(rootElm) {

    this.load = function(rootElm) {
        this.rootElm = rootElm;

        var tds = this.rootElm.getElementsByTagName("td");
        this.timeElm = tds[1];
        this.dateElm = tds[0];
        this.titleElm = tds[3].getElementsByTagName("a")[0];
        this.codeElm = this.titleElm; 
        var href = this.codeElm.getAttribute('href');
        var matches = href.match(/show_message_id=(\d+)/);
        this.code = matches[1];
        this.userElm = tds[2];
        this.userTitle = this.userElm.textContent;
        this.user = users.getItem(this.userTitle);
        if (!this.user) {
            this.user = {title: this.userTitle, code: guest_code};
        }

        this.theTime = ibaTime2Time(this.dateElm.innerHTML, this.timeElm.innerHTML);
    };



    this.getTheTime = function() {

        return this.theTime;
    }; 

    this.getTitle = function() {
        return this.titleElm.innerHTML;
    }; 

    this.getCode = function() {
        return this.code;
    }; 
    this.getUser = function() {
        return this.user;
    }; 



}







function IbaForumSummary() {


    this.load = function(rootElm) {
        this.rootElm = rootElm;

        var topicSummary;
        var href;
        var matches;
        this.lastTopicSummaries = [];
        var tr;
        var trs = document.evaluate(
                ".//following-sibling::tr/td[@class='catlistmsg']/..",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);


        for (var i = 0; i < 5; i++) {
            tr = trs.snapshotItem(i);


            topicSummary = new IbaLastTopicSummary();
            topicSummary.load(tr);

            if (topicSummary.getUser().code != guest_code) {
                    this.lastTopicSummaries.push(topicSummary);
            }   

        }




        this.titleElm = this.rootElm.getElementsByTagName("a")[0];
        this.codeElm = this.titleElm;
            this.title = this.titleElm.innerHTML;
            href = this.codeElm.getAttribute('href');
        matches = href.match(/fid=(\d+)/);
            this.code = matches[1];
    }; 





    this.getTitle = function() {
        return this.title;
    }; 



    this.getCode = function() {
        return this.code;
    }; 

    this.lastTopic = function() {
        var retVal = null;
        if (this.lastTopicSummaries.length > 0) {
            retVal =  this.lastTopicSummaries[0];
        }
        return retVal;
    }; 


}





function IbaForumList() {

    this.rootElm = null;
    this.items = [];
    this.load = function(rootElm) { 
        this.rootElm = rootElm;
        this.items = [];
        var summary;
        var tr;

        var trs = document.evaluate(
                ".//td[@class='CatListForumName']/..",
                this.rootElm,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        for (var i = 0; i < trs.snapshotLength; i++) {
            tr = trs.snapshotItem(i);

            summary = new IbaForumSummary();

            summary.load(tr);
            this.items.push(summary);
        }



    };

    this.summaries = function() {

        return this.items;

    };

    this.summaryOf = function(code) { 
        var summary = null;
        var i;
        for (i in this.items) {
            if (this.items[i].getCode() == code) {
                summary = this.items[i];
            }
        }
        return summary;

    };


}







function IbaForum() {

    this.rootElm = null;
    this.items = [];
    this.load = function(rootElm) { 
        this.rootElm = rootElm;
        this.items = [];
        var topic;
        var tr;


        var trs = findIbaTopicRoots(this.rootElm);

        for (var i = 0; i < trs.length; i++) {
            tr = trs[i];



            topic = new IbaTopic();

            topic.load(tr);
            if (topic.getUser().code != guest_code) {

                this.items.push(topic);
            }    
        }



    };

    this.getTopic = function(code) {
        var retVal = null;
        for (var i in this.items) {
            if (this.items[i].getCode() == code) {
                retVal = this.items[i];
            }
        }
        return retVal;    
    };


    this.topics = function() {

        return this.items;

    };


}









function getArtTime() {
    var divs = document.evaluate(
            "//div[@class='module']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    // alert(divs.snapshotLength);
    var div = divs.snapshotItem(0);
    var td = div.getElementsByTagName("td")[0];
    var html = td.innerHTML;
    var matches = html.match(artTimeRegexp);
    if (!matches) {
        div = document.getElementById('headerarea');
        html = div.innerHTML;
        matches = html.match(artTimeRegexp);
    }

    var dateSt = matches[0];

    return dateSt;

}







function onloadForumList(responseDetails) {
    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);

    var ibaForumList = new IbaForumList();
    ibaForumList.load(div);
    var artForumList = new ArtForumList();
    artForumList.load();
    artForumList.merge(ibaForumList);

}







function onloadForum(responseDetails) {
    var url = window.location.href;

    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);
    var forumCode = url.match(/board=(\d+)\.\d+$/)[1];

    var ibaForum = new IbaForum();
    ibaForum.load(div);

    var artForum = new ArtForum(forumCode);
    artForum.load();
    artForum.merge(ibaForum);

}


function onloadVirtualTopic(responseDetails) {
    var url = window.location.href;

    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);
    var forumCode = url.match(/forum_id=(\d+)/)[1];
    var ibaTopicCode = url.match(/show_message_id=(\d+)/)[1];
    var ibaTopic = new IbaTopic();

    var tr = findIbaTopicRoots(div)[0];
    ibaTopic.load(tr);

    var artTopic = new ArtTopic(forumCode, ibaTopicCode, true);
    artTopic.load();
    artTopic.merge(ibaTopic);

}



function onloadTopic(responseDetails) {
    // var url = window.location.href;

    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);


    var ibaTopic = new IbaTopic();

    var tr = findIbaTopicRoots(div)[0];
    ibaTopic.load(tr);

    var artTopic = new ArtTopic(null, null);
    artTopic.load();
    artTopic.merge(ibaTopic);

}




function onloadNewTopic(responseDetails) {
    var url = window.location.href;

    var resp     = responseDetails.responseText;
    var from = resp.indexOf('<form');
    var to = resp.indexOf('</form>') + '</form>'.length;

    var div = document.createElement('div');
    div.innerHTML = resp.substr(from, to - from + 1);
    var forumCode = url.match(/board=(\d+)/)[1];
    var ibaTopicCode = url.match(/show_message_id=(\d+)/)[1];
    var ibaTopic = new IbaTopic();

    var tr = findIbaTopicRoots(div)[0];
    ibaTopic.load(tr);

    var artTopic = new ArtNewTopic(forumCode, ibaTopicCode);
    artTopic.load();
    artTopic.merge(ibaTopic);

}





window.run = function() {

    var matches;
    var url = window.location.href;

    if (url.match(/Itemid=2$/)) {
        GM_xmlhttpRequest({
            method : 'GET',
            url    : "http://www.iba.org.il/forum/ForumsList.aspx?CatId=38",
            onload : onloadForumList
        });


    }
    else if ((matches = url.match(/Itemid=2&board=(\d+)\.\d+$/))) {
        if (forums.hasItem(matches[1])) {
            GM_xmlhttpRequest({
                method : 'GET',
                url    : 'http://www.iba.org.il/forum/forum.aspx?fid=' + forums.getItem(matches[1]).ibaCode,
                onload : onloadForum
            });
        }
    }	  

    else if ((matches = url.match(/option=com_smf&Itemid=2&topic=\d+.0$/))) {

        var artTopic = new ArtTopic(null, null);
        artTopic.load();

        if (artTopic.getIbaCode()) {
            GM_xmlhttpRequest({
                method : 'GET',
                url    : 'http://www.iba.org.il/forum/message.aspx?fid=' +
                            forums.getItem(artTopic.getForumCode()).ibaCode + '&show_message_id=' + artTopic.getIbaCode(),
                onload : onloadTopic
            });
        }
    }	  

    else if ((matches = url.match(/option=com_smf&Itemid=2&topic=4176.0&show_message_id=(\d+)&forum_id=(\d+)/))) {
        GM_xmlhttpRequest({
            method : 'GET',
            url    : 'http://www.iba.org.il/forum/message.aspx?fid=' + forums.getItem(matches[2]).ibaCode + '&show_message_id=' + matches[1],
            onload : onloadVirtualTopic
        });
    }  

    else if ((matches = url.match(/option=com_smf&Itemid=2&action=post;board=(\d+).\d+&show_message_id=(\d+)/))) {
        GM_xmlhttpRequest({
            method : 'GET',
            url    : 'http://www.iba.org.il/forum/message.aspx?fid=' + forums.getItem(matches[1]).ibaCode + '&show_message_id=' + matches[2],
            onload : onloadNewTopic
        });


    }


};



run();


