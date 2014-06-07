// ==UserScript==
// @name           Twitter Unicode Bar
// @namespace      http://luciano.longo.me/twitter-unicode
// @description    Add cool unicode symbols to your tweets
// @include        http://twitter.com/*
// @include        http://localhost/tests/unicode-bar/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    function UnicodeBar()
    {
        var _codes = {
            'Misc':[{"name":"Black Sun With Rays","code":"9728"},{"name":"Cloud","code":"9729"},{"name":"Umbrella","code":"9730"},{"name":"Black Star","code":"9733"},{"name":"White Star","code":"9734"},{"name":"Skull And Crossbones","code":"9760"},{"name":"White Frowning Face","code":"9785"},{"name":"White Smiling Face","code":"9786"},{"name":"Female Sign","code":"9792"},{"name":"Male Sign","code":"9794"},{"name":"White Heart Suit","code":"9825"},{"name":"Black Heart Suit","code":"9829"},{"name":"Wheelchair Symbol","code":"9855"},{"name":"High Voltage Sign","code":"9889"}],
            'Arrows': [{"name":"Leftwards Arrow","code":"8592"},{"name":"Upwards Arrow","code":"8593"},{"name":"Rightwards Arrow","code":"8594"},{"name":"Downwards Arrow","code":"8595"},{"name":"Left Right Arrow","code":"8596"},{"name":"Up Down Arrow","code":"8597"},{"name":"Anticlockwise Top Semicircle Arrow","code":"8630"},{"name":"Clockwise Top Semicircle Arrow","code":"8631"},{"name":"Anticlockwise Open Circle Arrow","code":"8634"},{"name":"Clockwise Open Circle Arrow","code":"8635"},{"name":"Leftwards Squiggle Arrow","code":"8668"},{"name":"Rightwards Squiggle Arrow","code":"8669"}]
        };
        
        var styles = {
            '#unicode-bar': {
                'display': 'none',
                'position': 'absolute',
                'margin': 0, 'padding': '2px',
                'top': 0, 'left': 0,
                'background': '-moz-linear-gradient(top, #bbb, #999)',
                'border': '1px solid #999',
                'border-radius': '3px',
                'box-shadow': '0 0 5px 1px rgba(0,0,0,0.2)',
                'z-index': '100',
                'font': '13px/22px Helvetica, Arial, sans-serif',
                'color': '#000',
            },
            '#unicode-bar > select': {
                'float': 'left'
            },
            '#unicode-bar ul, #unicode-bar ul li': {
                'float':'left',
                'margin': 0, 'padding': 0,
                'list-style': 'none'
            },
            '#unicode-bar:after, #unicode-bar ul:after': {
                'content': '.',
                'display': 'block',
                'visibility': 'hidden',
                'height': 0
            },
            '#unicode-bar li': {
                'border': '1px solid transparent',
                'border-radius': '3px',
                'padding': '0px 4px',
                'cursor': 'default',
                'font': '20px/22px sans-serif',
            },
            '#unicode-bar li:hover': {
                'border-color': '#666',
                'box-shadow': '1px 1px 1px 0 #ddd inset'
            },
            '#unicode-bar li:active': {
                'border-color': '#666',
                'box-shadow': '-1px -1px 1px #ddd inset, 1px 1px 2px #999 inset'
            }
        };
        
        var bar = $('<div id="unicode-bar"/>');
        var select = $('<select/>').appendTo( bar );
        var list = $('<ul/>').appendTo( bar );
        
        var curr_ta,
            mouse_on_bar = false;
        
        this.__init__ = function()
        {
            // Add styles
            _parseStyles();
            
            // Append bar to body
            bar.appendTo('body');
            
            // Create select
            var opts = '';
            for( var categ in _codes )
            {
                opts += '<option value="'+categ+'">'+categ+'</option>'
            }
            select.html( opts ).change(function()
            {
                renderList( $(this).val() );
            });
            
            // Create the default list
            renderList('Misc');
            
            $('#unicode-bar li').live('click', function(e)
            {
                // Switch focus to textarea instantly
                curr_ta.focus();
                
                insertSymbol( $(this).data('code') );
            });
            
            $('textarea').click(showBar).live('blur', function()
            {
                if( ! mouse_on_bar )
                    bar.fadeOut();
            });
            
            if( location.host == 'twitter.com' )
            {
                var twta = $('.twitter-anywhere-tweet-box-editor')
                .live('focus', function()
                {
                    showBar.apply(this);
                });
                
                $(document).mousemove(function()
                {
                    if( twta.length )
                        bar.css({
                            left: twta.offset().left,
                            top: twta.offset().top + parseInt( $(twta).outerHeight() )
                        });
                });
                
                // Wait for the twitter ta to be created
                var iid = setInterval(function()
                {
                    var _twta = $('.twitter-anywhere-tweet-box-editor');
                    
                    if( _twta.length )
                    {
                        twta = _twta;
                        clearInterval( iid );
                    }
                }, 100);
            }
            
            // Record if the mouse is over the bar
            bar.mouseenter(function()
            {
                mouse_on_bar = true;
            }).mouseleave(function()
            {
                mouse_on_bar = false;
            });
        }
        
        function showBar()
        {
            curr_ta = this; _l( 'Current Textarea', curr_ta );
            
            bar.fadeIn().css({
                left: $(this).offset().left,
                top: $(this).offset().top + parseInt( $(this).outerHeight() )
            });
        }
        
        function renderList( categ )
        {
            var syms = _codes[categ]
                lis = '';
            
            for( var i = 0; i < syms.length; i++ )
            {
                var sym = syms[i];
                var theSym = String.fromCharCode( sym.code );
                
                lis += '<li data-code="'+sym.code+'" title="'+sym.name+'">'+theSym+'</li>';
            }
            list.html( lis );
        }
        
        function insertSymbol( code )
        {
            if( ! curr_ta )
                return;
            
            var $ta = $(curr_ta);
            var val = $ta.val();
            var start = curr_ta.selectionStart;
            var end = curr_ta.selectionEnd;
            var insert = parseInt( code ) > 0 ? String.fromCharCode( code ) : code;
            
            var newval = val.substr(0, start) + insert + val.substr( end );
            
            $ta.val( newval );
            
            curr_ta.setSelectionRange( start + insert.length, start + insert.length );
        }
        
        function _parseStyles()
        {
            var css = [];
            for( var selector in styles )
            {
                var rules = [];
                
                for( var property in styles[selector] )
                    rules.push(property + ': ' + styles[selector][property]);
                
                css.push( selector + '{ ' + rules.join('; ') + ' }' );
            }
            
            GM_addStyle( css.join("\n") );
        }
    }
    
    var ub = new UnicodeBar();
    
    $(function()
    {
        ub.__init__();
    });
    
})(jQuery);

function _l()
{
    if( 'console' in unsafeWindow )
        unsafeWindow.console.log.apply( unsafeWindow, arguments );
}