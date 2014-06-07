// ==UserScript==
// @name           filmweb: forum
// @namespace      browser
// @description    filmweb: rozszerzenie forum
// @include        http://www.filmweb.pl/forum/*
// ==/UserScript==

try {

var settings = {
    USER_COLOR              : [ '#bbeebb', '#aaccaa' ],
    DIRECT_REPLY_COLOR      : [ '#eecccc', '#ccaaaa' ],
    INDIRECT_REPLY_COLOR    : [ '#e8dcdc', '#f4e8e8' ],
    NEW_COLOR               : [ '#b0d0ff', '#c8e0ff' ]
    }

/* ************************************************************************** */

if('undefined' == typeof $) $ = unsafeWindow.$;

var store = (('undefined'==typeof unsafeWindow) ? window : unsafeWindow).localStorage;

function store_get(name,value) {
    return store[name] ? eval(store[name]) : value;
    }
    
function store_put(name,value) {
    store[name] = uneval(value);
    }
    
function store_puts(name,value) {
    store[name] = value;
    }
    
function store_gets(name,value) {
    return store[name] || value;
    }

Number.prototype.in_range = function(a,b) {
    return (this >= a) && (this <= b);
    }
    
function console_log(text) {
    if('undefined'==typeof GM_log) alert(text); else GM_log(text);
    }
    
/* ************************************************************************** */

/*
    id          : String
    user        : String
    time        : Date
    timeRecord  : { y,m,d,H,M,S }
    parentPost  : String // post-id
    parentUser  : String // user-id


    _body       : HTMLDivElement
    _user       : HTMLDivElement
    _content    : HTMLDivElement
    _info       : HTMLDivElement
    _time       : HTMLSpanElement

    hasAncestorPost(id)
    hasAncestorUser(id)
    save()
*/

var nodelist = [];
var nodemap = {};

function Node(args) {
    for(var i in args) this[i] = args[i];
    }

Node.prototype = {

    hasAncestorPost : function(id, level) {
        if(id == this.id) return (level||0);
        if(nodemap[this.parentPost]) {
            return nodemap[this.parentPost].hasAncestorPost(id, (level||0)+1 );
            }
        return -1;
        },

    hasAncestorUser : function(id, level) {
        if(id == this.user) return (level||0);
        if(nodemap[this.parentPost]) {
            return nodemap[this.parentPost].hasAncestorUser(id, (level||0)+1 );
            }
        return -1;
        },
        
    save : function() {
        var uid = 'FWID_'+this.id;
        var found = store_get(uid, null);
        if(found) return false;
        store_put(uid, {
            id      : this.id, 
            user    : this.user,
            time    : this.time
            });
        return true;
        },

    };

/* ************************************************************************** */

    var user = $('div.loggedUserInfo div.userMenu a').get(0);
    if(user) {
        var USER_ID = user.textContent.trim();

        $('li[id^="post_"]').each(function(i,item){
            var _parent     = ((item.parentNode||{parentNode:null}).parentNode || {id:""}).id.match(/post_([0-9]+)/);

            var _body       = $('div.topicPostItem > div', item).get(0);
            var _info       = $('div.postInfo', _body).get(0);
            var _user       = $('div.userInfo', _body).get(0);
            var _content    = $('div.postContentAndInfo', _body).get(0);
            var _time       = $('span.creationTime', item).get(0);

            var xt  = _time.title.match(/([0-9]+)\/([0-9]+)\/([0-9]+) ([0-9]+):([0-9]+)/);
            var dt  = {
                y : parseInt(xt[3],10),
                m : parseInt(xt[2],10),
                d : parseInt(xt[1],10),
                H : parseInt(xt[4],10),
                M : parseInt(xt[5],10),
                S : 0
                }

            var _parentUser = null;
            $('span[class=""]', _info).each(function(i,value) {
                if( value.textContent.indexOf('w odpowiedzi na post') > -1 ) {
                    _parentUser = $('a', value).get(0);
                    return false;
                    }
                });

            var record = new Node({
                parentPost  : (_parent ? _parent[1] : null) || null,
                parentUser  : (_parentUser ? _parentUser.textContent : null) || null,
                id          : item.id.match(/post_([0-9]+)/)[1],
                user        : $('a.userNameLink', item).get(0).textContent.trim(),
                time        : new Date(dt.y, dt.m-1, dt.d, dt.H, dt.M, dt.S),
                timeRecord  : dt,

                _body       : _body,
                _user       : _user,
                _info       : _info,
                _content    : _content,
                });
                
            nodelist.push(record);
            nodemap[record.id] = record;
            });

        /* ********************************************************************** */

        for(var i=0; i<nodelist.length; i++) {
            var is_new = nodelist[i].save();
            
            if( USER_ID == nodelist[i].user ) {
                nodelist[i]._body.style.background = settings.USER_COLOR[0];
                nodelist[i]._info.style.background = settings.USER_COLOR[1];
                }
            else
            if(is_new) {
                nodelist[i]._body.style.background = settings.NEW_COLOR[0];
                nodelist[i]._info.style.background = settings.NEW_COLOR[1];
                } 
            else
            if( USER_ID == nodelist[i].parentUser ) {
                nodelist[i]._body.style.background = settings.DIRECT_REPLY_COLOR[0];
                nodelist[i]._info.style.background = settings.DIRECT_REPLY_COLOR[1];
                }
            nodelist[i].save();
            /*else 
            if( nodelist[i].hasAncestorUser(USER_ID).in_range(1, 3) ) {
                nodelist[i]._body.style.background = settings.INDIRECT_REPLY_COLOR[0];
                nodelist[i]._info.style.background = settings.INDIRECT_REPLY_COLOR[1];
                }*/
            }
        }

    }
catch(cause) {
    console_log(cause);
    }