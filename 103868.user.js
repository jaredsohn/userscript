// ==UserScript==
// @name           Unicode Collector
// @namespace      http://luciano.longo.me/unicode2json
// @description    Collect unicode symbols from alanwood.net
// @include        http://www.alanwood.net/unicode/*
// @exclude        http://www.alanwood.net/unicode/menu.html*
// @exclude        http://www.alanwood.net/unicode/index.html*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function( $ )
{

var UnicodeCollector = function()
{
    var unicodes = [],
        _listNS = location.toString().replace(/\?.*$/i, ''),
        wrap,
        list,
        area;
    
    function __init__()
    {
        // Load unicodes from GM cache
        var cache = GM_getValue( _listNS );
        
        if( typeof cache !== 'undefined' )
        {
            unicodes = JSON.parse( cache );
        }
        
        /* Check for updates and whatnot */
    }
    __init__();
    
    function _start()
    {
        GM_addStyle('#gm-unicode-list-wrap { '+
                    'position: fixed;'+
                    'top: 100px; right:0;'+
                    'background: #fff; border-radius: 5px 0 0 5px;'+
                    'box-shadow: 0 0 12px rgba(0,0,0,0.15);'+
                    'padding: 0 10px; '+
                    'font-size: 13px; }' +
                    '#gm-unicode-list-wrap textarea { width: 100%; height: 100px } '+
                    '.unicode tr td { cursor: pointer; } '+
                    '.unicode tr.over { background: rgba(0,0,255,0.1); }');
        
        var trs = $('.unicode tr:has(td)').hover(
            function(){ $(this).addClass('over'); },
            function(){ $(this).removeClass('over'); }
        ).click(function(e) { _addToList( $(this) ); });
        
        wrap = $('<div id="gm-unicode-list-wrap"><h4>Selected unicode chars</h4></div>').appendTo('body');
        
        list = $('<ul/>').appendTo(wrap);
        area = $('<textarea/>').appendTo(wrap);
        
        area.blur(function(e)
        {
            try {
                // Replace the unicode list with the one in the textarea
                unicodes = JSON.parse( e.currentTarget.value );
                
                // Save list to GM cache
                GM_setValue( _listNS, JSON.stringify( unicodes ));
                
                // Render the list
                _renderList();
            } catch( ex ) {
                _l( "The JSON pasted in the textarea is malformed.", ex );
            }
        });
        
        $('a.unicode-remove').live('click', function(e)
        {
            e.preventDefault();
            
            var pos = _searchByCode( this.hash.substr(1) );
            
            if( pos !== false )
                unicodes.splice( pos, 1 );
            
            _renderList();
        });
        
        _renderList();
    }
    this.start = _start;
    
    function _addToList( tr )
    {
        var _n = tr.find('td:eq(4)').text();
        
        if( ! $.trim(_n) || _n[0] == '&' )
            _n = tr.find('td:eq(5)').text().replace(/[\s]\(.*?\)/i, '');
            
        _n = _n.split(' ');
        
        for( var i = 0; i < _n.length; i++ )
        {
            _n[i] = _n[i][0].toUpperCase() + _n[i].substr(1).toLowerCase();
        }
        
        var _c = tr.find('td:eq(1)').text();
        
        var o = {
            'name': $.trim(_n.join(' ')),
            'code': _c
        };
        
        if( _searchByCode( _c ) === false )
        {
            // Add to the list
            unicodes.push(o);
            
            // Save list to GM cache
            GM_setValue( _listNS, JSON.stringify( unicodes ));
        }
        
        _renderList();
    }
    
    function _renderList()
    {
        var lis = '';
        for( var i = 0; i < unicodes.length; i++ )
        {
            var u = unicodes[i];
            lis += '<li><big>'+String.fromCharCode(u.code)+'</big>: '+u.code+' <a href="#'+u.code+'" class="unicode-remove">[remove]</a></li>';
        }
        list.html( lis );
        area.val( JSON.stringify( unicodes ) );
    }
    
    function _searchByCode( code )
    {
        for( var i = 0; i < unicodes.length; i++ )
        {
            if( unicodes[i].code === code )
                return i;
        }
        
        return false;
    }
};

var uc = new UnicodeCollector();

$(function()
{
    uc.start();
});

})(jQuery);

function _l()
{
    if( 'console' in unsafeWindow )
    {
        var c = unsafeWindow.console;
        c.log.apply(c, arguments);
    }
}