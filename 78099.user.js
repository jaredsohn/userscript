// ==UserScript==
// @name           editor4ex
// @namespace      http://www.ex.ua
// @description    wyciwyg
// @include        http://www.ex.ua/*
// @author         fatalfury aka .bs
// @version	   0.2.2.2
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// _@require	http://greasemonkey4ex.googlecode.com/files/jquery.wysiwyg.js
// @require http://greasemonkey4ex.googlecode.com/files/wysiwyg.style.js
// @resource img	http://greasemonkey4ex.googlecode.com/files/jquery.wysiwyg.gif
// ==/UserScript==
if(document.location.href.lastIndexOf('edit') != -1){
/**
 * WYSIWYG - jQuery plugin 0.6
 *
 * Copyright (c) 2008-2009 Juan M Martinez
 * http://plugins.jquery.com/project/jWYSIWYG
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Applieted by bs.
 */
 debug = true;
 if(!debug || typeof console == 'undefined'){
 console = new Object();
 console.log = function (){};
 }
(function( $ )
{
    $.fn.document = function()
    {
        var element = this.get(0);
		console.log('$.fn.document = %o',this);
        if ( element.nodeName.toLowerCase() == 'iframe' )
        {
			console.log('element.contentWindow.document = %o',element.contentWindow.document);
			console.log('element.contentDocument.document = %o',element.contentDocument);
            return element.contentDocument;
        }
        return this;
    };

    $.fn.documentSelection = function()
    {
        var element = this.get(0);
        if ( element.contentWindow.document.selection )
			return element.contentWindow.document.selection.createRange().text;	
		else
            return element.contentWindow.getSelection().toString();
    };

    $.fn.wysiwyg = function( options )
    {
        if ( arguments.length > 0 && arguments[0].constructor == String )
        {
            var action = arguments[0].toString();
            var params = [];

            for ( var i = 1; i < arguments.length; i++ )
                params[i - 1] = arguments[i];

            if ( action in Wysiwyg )
            {
                return this.each(function()
                {
                    $.data(this, 'wysiwyg')
                     .designMode();

                    Wysiwyg[action].apply(this, params);
                });
            }
            else return this;
        }

        var controls = {};

        /**
         * If the user set custom controls, we catch it, and merge with the
         * defaults controls later.
         */
        if ( options && options.controls )
        {
            var controls = options.controls;
            delete options.controls;
        }

        options = $.extend({
            html : '<'+'?xml version="1.0" encoding="UTF-8"?'+'><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">STYLE_SHEET</head><body id="ed4ex" style="margin: 0px;">INITIAL_CONTENT</body></html>',
            css  : {},

            debug        : false,

            autoSave     : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=11
            rmUnwantedBr : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=15
            //brIE         : true,

            controls : {},
            messages : {}
        }, options);

        options.messages = $.extend(true, options.messages, Wysiwyg.MSGS_EN);
        options.controls = $.extend(true, options.controls, Wysiwyg.TOOLBAR);

        for ( var control in controls )
        {
            if ( control in options.controls )
                $.extend(options.controls[control], controls[control]);
            else
                options.controls[control] = controls[control];
        }

        // not break the chain
        return this.each(function()
        {
            Wysiwyg(this, options);
        });
    };

    function Wysiwyg( element, options )
    {
        return this instanceof Wysiwyg
            ? this.init(element, options)
            : new Wysiwyg(element, options);
    }

    $.extend(Wysiwyg, {
        createLink : function( szURL )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szURL && szURL.length > 0 )
            {
                var selection = $(self.editor).documentSelection();

                if ( selection.length > 0 )
                {
                    self.editorDoc.execCommand('unlink', false, []);
                    self.editorDoc.execCommand('createLink', false, szURL);
                }
                else if ( self.options.messages.nonSelection )
                    alert(self.options.messages.nonSelection);
            }
        },

        insertHtml : function( szHTML )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szHTML && szHTML.length > 0 )
            {

                    self.editorDoc.execCommand('insertHTML', false, szHTML);
            }
        },

        setContent : function( newContent )
        {
            var self = $.data(this, 'wysiwyg');
                self.setContent( newContent );
                self.saveContent();
        },

        clear : function()
        {
            var self = $.data(this, 'wysiwyg');
                self.setContent('');
                self.saveContent();
        },

        MSGS_EN : {
            nonSelection : 'select the text you wish to link'
        },

        TOOLBAR : {
            bold          : { visible : true, tags : ['b', 'strong'], css : { fontWeight : 'bold' }, tooltip : "Bold" },
            italic        : { visible : true, tags : ['i', 'em'], css : { fontStyle : 'italic' }, tooltip : "Italic" },
            //strikeThrough : { visible : true, tags : ['s', 'strike'], css : { textDecoration : 'line-through' }, tooltip : "Strike-through" },
            underline     : { visible : true, tags : ['u'], css : { textDecoration : 'underline' }, tooltip : "Underline" },

            separator00 : { visible : true, separator : true },
			/*
            justifyLeft   : { visible : true, css : { textAlign : 'left' }, tooltip : "Justify Left" },
            justifyCenter : { visible : true, tags : ['center'], css : { textAlign : 'center' }, tooltip : "Justify Center" },
            justifyRight  : { visible : true, css : { textAlign : 'right' }, tooltip : "Justify Right" },
            justifyFull   : { visible : true, css : { textAlign : 'justify' }, tooltip : "Justify Full" },

            separator01 : { visible : true, separator : true },
			
            indent  : { visible : true, tooltip : "Indent" },
            outdent : { visible : true, tooltip : "Outdent" },
			*/
            separator02 : { visible : false, separator : true },

            subscript   : { visible : true, tags : ['sub'], tooltip : "Subscript" },
            superscript : { visible : true, tags : ['sup'], tooltip : "Superscript" },

            separator03 : { visible : true, separator : true },

            undo : { visible : true, tooltip : "Undo" },
            redo : { visible : true, tooltip : "Redo" },

            separator04 : { visible : true, separator : true },

            insertOrderedList    : { visible : true, tags : ['ol'], tooltip : "Insert Ordered List" },
            insertUnorderedList  : { visible : true, tags : ['ul'], tooltip : "Insert Unordered List" },
            //insertHorizontalRule : { visible : true, tags : ['hr'], tooltip : "Insert Horizontal Rule" },

            separator05 : { separator : true },

            createLink : {
                visible : true,
                exec    : function()
                {
                    var selection = $(this.editor).documentSelection();

                    if ( selection.length > 0 )
                    {
                            var szURL = prompt('URL', 'http://');

                            if ( szURL && szURL.length > 0 )
                            {
                                this.editorDoc.execCommand('unlink', false, []);
                                this.editorDoc.execCommand('createLink', false, szURL);
                            }
                    }
                    else if ( this.options.messages.nonSelection )
                        alert(this.options.messages.nonSelection);
                },

                tags : ['a'],
                tooltip : "Create link"
            },


            separator06 : { separator : true },

            //h1mozilla : { visible : true && $.browser.mozilla, className : 'h1', command : 'heading', arguments : ['h1'], tags : ['h1'], tooltip : "Header 1" },
            //h2mozilla : { visible : true && $.browser.mozilla, className : 'h2', command : 'heading', arguments : ['h2'], tags : ['h2'], tooltip : "Header 2" },
            //h3mozilla : { visible : true && $.browser.mozilla, className : 'h3', command : 'heading', arguments : ['h3'], tags : ['h3'], tooltip : "Header 3" },

            //separator07 : { visible : false, separator : true },

            //cut   : { visible : false, tooltip : "Cut" },
            //copy  : { visible : false, tooltip : "Copy" },
            //paste : { visible : false, tooltip : "Paste" },

           //separator08 : { separator : false && !( $.browser.msie ) },

			
			changeColor : { visible : false , tags : ['font'], tooltip : "change color", exec: function(){
								//var selection = $(this.editor).documentSelection();
					//if ( selection.length > 0 )
                    {
						console.log(this.getContent());
						//this.editorDoc.execCommand('ForeColor',false,'#00ff00');
						//this.setContent(this.getContent().replace(/span/g,'font'));
						try{
						var r = $(this.editor).get(0).contentWindow.getSelection().getRangeAt(0);
						r.insertNode($(this.editor).document().createTextNode("this is sparta!"));
						console.log(r);
						//r.collapse(false);
						}catch(e){console.log(e);}
						console.log($(this.editor).get(0).contentWindow.getSelection());
					}
			}},
		   
            //increaseFontSize : { visible : true , tags : ['big'], tooltip : "Increase font size" },
			
			increaseFontSize: { visible: false, tags: ['font'], tooltip: 'Font Size',exec: function()
			{
					var selection = $(this.editor).documentSelection();
					if ( selection.length > 0 )
                    {
					   this.editorDoc.execCommand('FontSize',false,'125%');
					}
			}},
            decreaseFontSize : { visible : false , tags : ['font'], tooltip : "Decrease font size", exec: function(){
				var selection = $(this.editor).documentSelection();
					if ( selection.length > 0 )
                    {
					   this.editorDoc.execCommand('FontSize',false,'75%');
					}	
			}},

            //separator09 : { separator : true },

            html : {
                visible : true,
                exec    : function()
                {
                    if ( this.viewHTML )
                    {
                        this.setContent( $(this.original).val().replace(/\n/g,'<br>') );
                        $(this.original).hide();
                    }
                    else
                    {
                        this.saveContent();
                        $(this.original).show();
                    }

                    this.viewHTML = !( this.viewHTML );
                },
                tooltip : "View source code"
            },

            removeFormat : {
                visible : true,
                exec    : function()
                {
                    this.editorDoc.execCommand('removeFormat', false, []);
                    this.editorDoc.execCommand('unlink', false, []);
                },
                tooltip : "Remove formatting"
            }
        }
    });

    $.extend(Wysiwyg.prototype,
    {
        original : null,
        options  : {},

        element  : null,
        editor   : null,

        focus : function()
        {
            $(this.editorDoc.body).focus();
        },

        init : function( element, options )
        {
            var self = this;
			console.log('[init]this = %o',this);
            this.editor = element;
            this.options = options || {};

            $.data(element, 'wysiwyg', this);

            var newX = element.width || element.clientWidth;
            var newY = element.height || element.clientHeight;

            if ( element.nodeName.toLowerCase() == 'textarea' )
            {
                this.original = element;

                if ( newX == 0 && element.cols )
                    newX = ( element.cols * 8 ) + 21;

                if ( newY == 0 && element.rows )
                    newY = ( element.rows * 16 ) + 16;
				
				
                var editor = this.editor = $('<iframe src=""></iframe>').css({
                    minHeight : ( newY - 6 ).toString() + 'px',
                    width     : ( newX - 8 ).toString() + 'px'
                }).attr('id', $(element).attr('id') + 'IFrame')
                .attr('frameborder', '0');

				console.log('[init]editor = %o',editor);
                /**
                 * http://code.google.com/p/jwysiwyg/issues/detail?id=96
                 */
                this.editor.attr('tabindex', $(element).attr('tabindex'));
            }

            var panel = this.panel = $('<ul role="menu" class="panel"></ul>');

            this.appendControls();
            this.element = $('<div></div>').css({
                width : ( newX > 0 ) ? ( newX ).toString() + 'px' : '100%'
            }).addClass('wysiwyg')
                .append(panel)
                .append( $('<div><!-- --></div>').css({ clear : 'both' }) )
                .append(editor)
		;
		console.log('element = %o, this.element = %o',element,this.element);
            $(element)
                .hide()
                .before(this.element)
		;

            this.viewHTML = false;
            this.initialHeight = newY - 8;

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=52
             */
            this.initialContent = $(element).val().replace(/\n/g,'<br>') ;
			
			$($(this.editor).document()).ready(function(){
				console.log('iframe loaded %o , mainEditor',this,self);
				            self.initFrame();
			
            if ( self.initialContent.length == 0 )
                self.setContent('');

            /**
             * http://code.google.com/p/jwysiwyg/issues/detail?id=100
             */
            var form = $(element).closest('form');

            if ( self.options.autoSave )
			{
                form.submit(function() { self.saveContent(); });
			}

            form.bind('reset', function()
            {
                self.setContent( self.initialContent );
                self.saveContent();
            });
				});

        },

        initFrame : function()
        {
			console.log('[initFrame] start!');
            var self = this;
            var style = '';

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=14
             */
            if ( this.options.css && this.options.css.constructor == String )
	    {
                style = '<link rel="stylesheet" type="text/css" media="screen" href="' + this.options.css + '" />';
	    }

            this.editorDoc = $(this.editor).document();
            console.log('[initFrame]editorDoc = %o',this.editorDoc);
			this.editorDoc_designMode = false;

            try {
                this.editorDoc.designMode = 'on';
                this.editorDoc_designMode = true;
            } catch ( e ) {
                // Will fail on Gecko if the editor is placed in an hidden container element
                // The design mode will be set ones the editor is focused
				console.log('[initFrame] designMode exception %o',e);
                $(this.editorDoc).focus(function()
                {
                    self.designMode();
                });
            }
			console.log('style = %s',style);
			
			console.log('[initFrame]editorDoc.open call %o',this.editorDoc);
            this.editorDoc.open();
			console.log('[initFrame]editorDoc.write');
            this.editorDoc.write(
                this.options.html
                    /**
                     * @link http://code.google.com/p/jwysiwyg/issues/detail?id=144
                     */
                    .replace(/INITIAL_CONTENT/, function() { return self.initialContent; })
                    .replace(/STYLE_SHEET/, function() { return style; })
            );
            this.editorDoc.close();
			
			
			console.log($('body',this.editorDoc).html());
			
			
            this.editorDoc.contentEditable = 'true';

            $(this.editorDoc).click(function( event )
            {
                self.checkTargets( event.target ? event.target : event.srcElement);
            });

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=20
             */
            $(this.original).focus(function()
            {
                self.focus();
            });

            if ( this.options.autoSave )
            {
                /**
                 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=11
                 */
                $(this.editorDoc).keydown(function() { self.saveContent(); })
                                 .keyup(function() { self.saveContent(); })
                                 .mousedown(function() { self.saveContent(); });
            }

            if ( this.options.css )
            {
                setTimeout(function()
                {
                    if ( self.options.css.constructor == String )
                    {
                        /**
                         * $(self.editorDoc)
                         * .find('head')
                         * .append(
                         *     $('<link rel="stylesheet" type="text/css" media="screen" />')
                         *     .attr('href', self.options.css)
                         * );
                         */
                    }
                    else
                        $(self.editorDoc).find('body').css(self.options.css);
                }, 0);
            }

            $(this.editorDoc).keydown(function( event )
            {
                return true;
            });
			console.log('[initFrame] end.');
        },

        designMode : function()
        {
            if ( !( this.editorDoc_designMode ) )
            {
                try {
                    this.editorDoc.designMode = 'on';
                    this.editorDoc_designMode = true;
                } catch ( e ) {}
            }
        },

        getSelection : function()
        {
            return ( window.getSelection ) ? window.getSelection() : document.selection;
        },

        getRange : function()
        {
            var selection = this.getSelection();

            if ( !( selection ) )
                return null;

            return ( selection.rangeCount > 0 ) ? selection.getRangeAt(0) : selection.createRange();
        },

        getContent : function()
        {
            return $( $(this.editor).document() ).find('body').html();
        },

        setContent : function( newContent )
        {
            $( $(this.editor).document() ).find('body').html(newContent);
        },

        saveContent : function()
        {
            if ( this.original )
            {
                var content = this.getContent();
                if ( this.options.rmUnwantedBr )
		{
                    content = ( content.substr(-4) == '<br>' ) ? content.substr(0, content.length - 4) : content;
		}

                $(this.original).val(content.replace(/<br>/ig,'\n'));
            }
        },

        withoutCss: function()
        {
            if ($.browser.mozilla)
            {
                try
                {
                    this.editorDoc.execCommand('styleWithCSS', false, false);
                }
                catch (e)
                {
                    try
                    {
                        this.editorDoc.execCommand('useCSS', false, true);
                    }
                    catch (e)
                    {
                    }
                }
            }
        },

        appendMenu : function( cmd, args, className, fn, tooltip )
        {
			console.log('cmd: %s, args: %s, class: %s, fn: %s, tooltip: %s',cmd,args,className,fn,tooltip);
            var self = this;
            args = args || [];

            $('<li></li>').append(
                $('<a role="menuitem" tabindex="-1" href="javascript:;">' + (className || cmd) + '</a>')
                    .addClass(className || cmd)
                    .attr('title', tooltip)
            ).click(function() {
                if ( fn ) fn.apply(self); else
                {
                    self.withoutCss();
					console.log('exec command %s with args %s',cmd,args);
                    self.editorDoc.execCommand(cmd, false, args);
                }
                if ( self.options.autoSave ) self.saveContent();
            }).appendTo( this.panel );
        },

        appendMenuSeparator : function()
        {
            $('<li role="separator" class="separator"></li>').appendTo( this.panel );
        },

        appendControls : function()
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];

                if ( control.separator )
                {
                    if ( control.visible !== false )
                        this.appendMenuSeparator();
                }
                else if ( control.visible )
                {
				console.log('control add : %o',control);
                    this.appendMenu(
                        control.command || name, control.arguments || [],
                        control.className || control.command || name || 'empty', control.exec,
                        control.tooltip || control.command || name || ''
                    );
                }
            }
        },

        checkTargets : function( element )
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];
                var className = control.className || control.command || name || 'empty';

                $('.' + className, this.panel).removeClass('active');

                if ( control.tags )
                {
                    var elm = element;

                    do {
                        if ( elm.nodeType != 1 )
                            break;

                        if ( $.inArray(elm.tagName.toLowerCase(), control.tags) != -1 )
                            $('.' + className, this.panel).addClass('active');
                    } while ((elm = elm.parentNode));
                }

                if ( control.css )
                {
                    var elm = $(element);

                    do {
                        if ( elm[0].nodeType != 1 )
                            break;

                        for ( var cssProperty in control.css )
                            if ( elm.css(cssProperty).toString().toLowerCase() == control.css[cssProperty] )
                                $('.' + className, this.panel).addClass('active');
                    } while ((elm = elm.parent()));
                }
            }
        },

        getElementByAttributeValue : function( tagName, attributeName, attributeValue )
        {
            var elements = this.editorDoc.getElementsByTagName(tagName);

            for ( var i = 0; i < elements.length; i++ )
            {
                var value = elements[i].getAttribute(attributeName);

                if ( value == attributeValue )
                    return elements[i];
            }

            return false;
        }
    });
})(jQuery);



function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style+'div.wysiwyg * {overflow-x:hidden;} #ed4ex {overflow-x:hidden;}';
console.log(style)
return ele;
}

try{

addStyle(style.replace(/"JQIMG"/,GM_getResourceURL('img')));

	$('textarea').wysiwyg({controls: {insertImage: {visible: false}}});
}catch(e){console.log(e);}
}