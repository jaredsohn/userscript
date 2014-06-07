// ==UserScript==
// @name        Seitwert - Filter
// @namespace   seitwert
// @include     http://www.seitwert.de/showtracking.php*
// @version     1
// ==/UserScript==

var $,jQuery;

// ---  basic extensions  ---
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};

String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};

String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

// ---

// add jQuery
var GM_JS   = document.createElement('script');
GM_JS.src   = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JS.type  = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS);


// --- waiting for scripts ---

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        jQuery = $;
        addJqueryCookie();   
        // main();
    }
}


function addJqueryCookie() {
    // add jQuery cookie plugin
    $.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=$.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};
    GM_wait2();
}


// Check if jQuery plugin: cookie loaded
function GM_wait2() { 
    if(typeof $.cookie == 'undefined') {
        window.setTimeout(GM_wait2,200); 
    } else { 
        main();
    }
}

GM_wait();

//===========================================================

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// load jQuery and execute the main function
addGlobalStyle( '#pos-filter { border-bottom: 1px solid #999; margin-bottom: 20px;}' +
                '#debug {}' +
                '#debug p { margin: 0 0 3px; }' +
                '#pos-filter table { width: auto; margin-bottom: 0; }' +
                '#pos-filter th { padding: 5px; }' +
                '#pos-filter table .col1 { width: 20px; }' +
                '#pos-filter table .col2 { width: 300px; }' +
                '#pos-filter table .col3 { width: 20px; }' +
                '#pos-filter table .col4 { width: 20px; }' +
                '#pos-filter table .col5 { width: 200px;}' +
                '#pos-filter td { border: 0; padding: 5px; }' +
                '#pos-filter input { margin-right: 10px; }' +
                '#filter-same { width: 20px; }'+
                '#filter-text { width: 280px; }' +
                '#filter-text.inactive { background: #ececec; color: #999; }' +
                '#filter-action-doit { width: 120px; }' +
                '#filter-action-clear { width: 30px; border-color: red; }'+
                '#filter-hits { width: 20px; }'+
                '#filter-unique { width: 20px; }'+
                '#filter-action-doit.active { background:#2f4; }' +
                '.hide { display: none; }' );

//===========================================================


var same, kword, hits, unique;


function initInterface() {
    // set filter fields
    var filter = $('<div id="pos-filter"><div id="debug"></div><p><strong>Filter:</strong> <br>   Die Felder sind UND verknüpft. <br>   Wenn der Filter aktiv ist, erscheint der Button in grün.</p><table><tr><th class="col1">Same</th><th class="col2">Text</th><th class="col3">Hits</th><th class="col4">Unique</th><th class="col5">&nbsp;</th></tr><tr> <td> <input type="checkbox" value="" title="Ziel = Quelle" name="filter-double" id="filter-same"></td><td> <input type="text" value="" title="Teil des Link" name="filter-text" id="filter-text" class="inactive"></td><td> <input type="text" value="" title="aufgerufen &gt;=" name="filter-hits" id="filter-hits"></td><td> <input type="text" value="" title="Unique Hits &gt;=" name="filter-unique" id="filter-unique"></td><td> <input type="button" value="filter" title="" id="filter-action-doit" class="active"> <input type="button" value="X" title="Filter löschen" id="filter-action-clear" style="display: inline;"></td></tr></table></div>');
    $('#content-wide').prepend( filter );
}


function getFilter( field ) {
    if (field) {
        var ref = $('#filter-' + field);
        if (ref.length) {
            var val = ref.val();
            switch (field) {
                case 'hits':
                case 'unique':
                      // typecase as int
                      val = parseInt(val);
                      break;
                case 'same':
                      val = ref.is(':checked') ? 1 : 0;
                      break;
                default:
                      // pass
            }
            return val;
        }
    }
    return null;
}


function getRowCol( col, row) {
    var td;
    var v = null;
    switch (col) {
        case 'text':
              td  = $('td:first', row);
              v = td.text();
              break;
        case 'hits':
              td = $('td:nth-child(4)', row);
              if (td.length) {
                  v = parseInt(td.text());
                  if (isNaN(v)) {
                      v = 0;
                  }
              }
              break;
        case 'unique':
              td = $('td:nth-child(5)', row);
              if (td.length) {
                  v = parseInt(td.text());
                  if (isNaN(v)) {
                      v = 0;
                  }
              }
              break;
    }
    return v;
}


// main filter function
function checkRow(idx, ref) {
    txt = getRowCol('text', ref);
    h   = getRowCol('hits', ref);
    q   = getRowCol('unique', ref);
    // if (idx > 2) { return; }
    if (same || txt || h || q) {
        // filtering list
        if (!same && kword) {
            // alert(idx + ': ' + txt + ' ? ' + td1.text() + ' => ' + td1.text().indexOf(txt) );
            if (txt.indexOf(kword) == -1) {
                // disable this row
                $(ref).addClass('hide');
                return
            }
            
            // check for hits
            if (hits) {
                if (h < hits) {
                    // disable this row
                    $(ref).addClass('hide');
                    return;
                }
            }
            
            // check for unique
            if (unique) {
                if (q < unique) {
                    // disable this row
                    $(ref).addClass('hide');
                    return;
                }
            }
             
            // enable this row
            $(ref).removeClass('hide');
        } else {
            // check same (source and target)
            if (same) {
                var tmp = txt.replace(/\t.*?http(s)?:/g, '#').split('#');
                if (tmp.length == 1) {
                    $('#debug').append('<p>no split: '+tmp+'</p>');
                    return;
                }
                tmp[0] = tmp[0].trim();
                tmp[1] = 'http:' + tmp[1].trim();
                // $('#debug').append('<p>'+tmp[0]+' ? '+tmp[1]+' = '+(tmp[0]==tmp[1]?'1':'0')+'</p>');
                if (tmp[0]==tmp[1]) {
                    // target same as source
                    // check for hits
                    if (hits) {
                        if (h < hits) {
                            // disable this row
                            $(ref).addClass('hide');
                            return;
                        }
                    }
                    
                    // check unique
                    if (unique) {
                        if (q < unique) {
                            // disable this row
                            $(ref).addClass('hide');
                            return;
                        }
                    }
                } else {
                    // disable this row
                    $(ref).addClass('hide');
                }
            } else {
        
                // check for hits
                if (hits) {
                    if (h < hits) {
                        // disable this row
                        $(ref).addClass('hide');
                        return;
                    }
                }
                
                // check unique
                if (unique) {
                    if (q < unique) {
                        // disable this row
                        $(ref).addClass('hide');
                        return;
                    }
                }
            }
        }
    }
}


function switchSame() {
    var ref = $(this);
    // after the click on unchecked field this function is called
    // and the field *is* checked.
    if (ref.is(':checked')) {
        // enable option
        $('#filter-text').addClass('inactive');
        same = 1;
        $.cookie('posfilter-same', 1);
    } else {
        // disable option
        $('#filter-text').removeClass('inactive');
        same = 0;
        $.cookie('posfilter-same', 0);
    }
}


function filterActionDoit() {
    var btn = $(this);
    same    = getFilter('same');
    kword   = getFilter('text');
    hits    = getFilter('hits');
    unique  = getFilter('unique');
    if (kword)  { $.cookie('posfilter-text', kword); }
    if (hits)   { $.cookie('posfilter-h', hits); }
    if (unique) { $.cookie('posfilter-u', unique); }
    
    if (same || kword || hits | unique) {
        var full_list = $('#content-wide .datawrapper tbody tr');
        $('#filter-action-doit').addClass('active');
        $('#filter-action-clear').show();
        full_list.each( checkRow );
    }
}


function filterActionClear() {
    var btn = $(this);
    btn.hide();
    var full_list = $('#content-wide tbody tr.hide');
    full_list.each( function () { $(this).removeClass('hide'); } );
    $('#filter-same').attr('checked', false);
    $('#filter-text, #filter-hits, #filter-unique').val('');
    $('#filter-action-doit').removeClass('active');
    
    $.cookie('posfilter-same', '');
    $.cookie('posfilter-text', '');
    $.cookie('posfilter-h', '');
    $.cookie('posfilter-u', '');
}


function filterAfterReload() {
    // reset some things
    $('#filter-text').removeClass('inactive')
    $('#filter-action-doit').removeClass('active');
    
    var s = $.cookie('posfilter-same');
    var kword = $.cookie('posfilter-text');
    var h = $.cookie('posfilter-h');
    var u = $.cookie('posfilter-u');
    
    if (kword)  { $('#filter-text').attr('value', kword); }
    if (h)      { $('#filter-hits').attr('value', h); }
    if (u)      { $('#filter-unique').attr('value', u); }
    
    if (s || kword || h || u) {
        if (s) {
            $('#filter-same').prop('checked', 1);
            $('#filter-text').addClass('inactive');
        }
        $('#filter-action-doit').click();
    }
}
    
    
function main() {
    /*
    $.cookie('posfilter', 'abc');
    alert('cookie: ' + $.cookie('posfilter'));
    */
    initInterface();
    $('#filter-same').click( switchSame );
    $('#filter-action-doit').click( filterActionDoit );
    $('#filter-action-clear').hide().click( filterActionClear );
    filterAfterReload();
}


