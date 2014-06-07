// ==UserScript==
// @name           wiealt.de Extension
// @namespace      wiealt.de
// @description    Erweitert wiealt.de
// @include        http://*wiealt.de/*
// ==/UserScript==

(function() {
    
    /**
        Das erweiterte User-Image
        ExtendedUserImage extends AbstractPropertyUpdater
    */
    function ExtendedUserImage( container, previewUrl, userName, linkHref ) {
        
        var _mouseOver = false;
        var _image = null;
        var _tooltip = null;
        var _zoom = null;
        var _heart = null;
        var self = this;
        var _tooltipHiding = false;
        
        var _buttons = [];
        
        /**
            Erzeugt das kleine Panel mit dem Namen des Users
        */
        function addNamePanel() {
            _namePanel = document.createElement( "div" );
            _namePanel.className = "NamePanel"
            _namePanel.style.width = container.style.width;
            _namePanel.innerHTML = userName;
            
            container.appendChild( _namePanel );
        }
        
        /**
            Erzeugt das Event-Panel und verbindet die EventHandler mit ihm
        */
        function addEventPanel() {
            var div = document.createElement( "div" );
            div.style.width = container.style.width;
            div.style.height = container.style.height;
            div.style.position = "absolute";
            div.style.zIndex = 90;
            
            _eventPanel = div;
            container.appendChild( div );
            
            // EventHandler registrieren
            _eventPanel.addEventListener( "mouseover", onMouseOver, true );
            _eventPanel.addEventListener( "mouseout", onMouseOut, true );
            _eventPanel.addEventListener( "mousemove", onMouseMove, true );
            _eventPanel.addEventListener( "click", onClick, true );
        }
        
        /**
            fügt die Buttons hinzu
        */
        function addButtons() {
            // Für alle Buttons
            self.addProperty( "opacity", new SmoothProperty( 0.2, 3 ) );
            
            // Den Zoom-Butotn
            _zoom = document.createElement( "img" );
            _zoom.style.position = "absolute";
            _zoom.style.border = "none";
            _zoom.src = "http://theoneandonlyfoo.th.funpic.de/wiealt/zoom-in.png";
            container.appendChild( _zoom );
            
            var zoomSizeProperty = new SmoothProperty( 16, 48 );
            self.addProperty( "zoom-size", zoomSizeProperty );
            
            var zoom = new Button( _zoom );
            zoom.setDefaultSize( 16, 16 );
            zoom.setMaximumSize( 32, 32 );
            zoom.setHotspot( 0, 0 );
            zoom.setDefaultPosition( 0, 0 );
            zoom.setSizeProperties( zoomSizeProperty, zoomSizeProperty );
            zoom.setActionCommand( "zoom" );
            _buttons.push( zoom );
            
            // Erzeugt den Flirt-Button
            _heart = document.createElement( "img" );
            _heart.style.position = "absolute";
            _heart.style.border = "none";
            _heart.src = "http://theoneandonlyfoo.th.funpic.de/wiealt/emblem-favorite.png";
            container.appendChild( _heart );
            
            var heartSizeProperty = new SmoothProperty( 16, 48 );
            self.addProperty( "heart-size", heartSizeProperty );
            
            var heart = new Button( _heart );
            heart.setDefaultSize( 16, 16 );
            heart.setMaximumSize( 32, 32 );
            heart.setHotspot( 0.7, 0 );
            heart.setDefaultPosition( parseInt( container.style.width ), 0 );
            heart.setSizeProperties( heartSizeProperty, heartSizeProperty );
            heart.setActionCommand( "flirt" );
            _buttons.push( heart );
        }
        
        /**
            Die Maus wurde auf das Bild bewegt.
            Lade das große Bild und zeige die erweiterten Buttons an
        */
        function onMouseOver( event ) {
            _mouseOver = true;
            
            if( !_image ) {
                preloadImage( getBigImageUrl(), function( image ) {
                        _image = image;
                        setTooltipImage( image );
                    } );
            }
            
            self.getProperty( "opacity" ).setTarget( 1.0 );
        }
        
        /**
            Die Maus wurde aus dem Feld heraus bewegt.
            Blende die Buttons wieder aus.
        */
        function onMouseOut( event ) {
            _mouseOver = false;
            
            self.getProperty( "opacity" ).setTarget( 0.2 );
            self.getProperty( "zoom-size" ).setTarget( 16 );
            self.getProperty( "heart-size" ).setTarget( 16 );
        }
        
        /**
            Die Maus wird über das Feld bewegt
        */
        function onMouseMove( event ) {
            if( !_mouseOver )
                return;
            
            for( var i = 0; i < _buttons.length; i++ )
                _buttons[i].update( event.layerX, event.layerY );
        }
        
        /**
            Die Maus wurde geklickt
        */
        function onClick( event ) {
            for( var i = 0; i < _buttons.length; i++ ) {
                var button = _buttons[i];
                
                if( button.contains( event.layerX, event.layerY ) ) {
                    actionPerformed( button.getActionCommand() );
                    return;
                }
            }
            
            if( event.which == 1 ) {
                location.href = linkHref;
            }
        }
        
        /**
            wird aufgeurfen, wenn ein Button geklickt wurde.
            @param command enthält einen String, der die durchzufürgende
            Aktion beschreibt
        */
        function actionPerformed( command ) {
            if( command == "zoom" )
                doZoom();
            
            if( command == "flirt" )
                doFlirt( linkHref );
        }
        
        /**
            Gibt die BildURL der 640px Version zurück
        */
        function getBigImageUrl() {
            return previewUrl.substr( 0, previewUrl.indexOf( "_" ) ) + "_640.jpg";
        }
        
        /**
            Wird aufgerufen, wenn eines der Properties geändert wurde
        */
        self.valueChanged = function() {
            _zoom.style.opacity = self.getProperty( "opacity" ).getValue();
            _zoom.style.width = self.getProperty( "zoom-size" ).getValue();
            _zoom.style.height = self.getProperty( "zoom-size" ).getValue();
            
            _heart.style.opacity = self.getProperty( "opacity" ).getValue();
            _heart.style.width = self.getProperty( "heart-size" ).getValue();
            _heart.style.height = self.getProperty( "heart-size" ).getValue();
            
            _heart.style.left = parseInt( container.style.width) -
                self.getProperty( "heart-size" ).getValue();
            
            if( _tooltip ) {
                var visible = (self.getProperty( "tooltip.opacity" ).getValue() > 0.01);
                
                if( visible ) {
                    _tooltip.style.display = "block";
                    
                    _tooltip.style.width = self.getProperty( "tooltip.width" ).getValue();
                    _tooltip.style.height = self.getProperty( "tooltip.height" ).getValue();
                    _tooltip.style.opacity = self.getProperty( "tooltip.opacity" ).getValue();
                    
                    var left = getAbsoluteLeft( container ) +
                        (parseInt( container.style.width ) - self.getProperty( "tooltip.width" ).getValue()) / 2;
                        
                    var top = getAbsoluteTop( container ) +
                        (parseInt( container.style.height ) - self.getProperty( "tooltip.height" ).getValue()) / 2;
                        
                    
                    if( left < 0 )
                        left = 0;
                    
                    if( top < 0 )
                        top = 0;
                        
                    _tooltip.style.left = left;
                    _tooltip.style.top = top;
                    
                } else {
                    _tooltip.style.display = "none";
                }
            }
        }
        
        /**
            Erzeugt das Zoom-Tooltip-Image
        */
        function doZoom() {
            if( !_tooltip ) {
                _tooltip = document.createElement( "img" );
                _tooltip.className = "Tooltip";
                document.getElementsByTagName( "body" )[0].appendChild( _tooltip );
            
                self.addProperty( "tooltip.width", new SmoothProperty( parseInt( container.style.width ), 800 ) );
                self.addProperty( "tooltip.height", new SmoothProperty( parseInt( container.style.height ), 800 ) );
                self.addProperty( "tooltip.opacity", new SmoothProperty( 0, 2.5 ) );
            }
            
            _tooltipHiding = false;
            
            if( _image ) {
                setTooltipImage( _image );
            } else {
                _tooltip.src = "http://theoneandonlyfoo.th.funpic.de/wiealt/wait.gif";
                
                self.getProperty( "tooltip.width" ).setTarget( 100 );
                self.getProperty( "tooltip.height" ).setTarget( 100 );
                self.getProperty( "tooltip.opacity" ).setTarget( 0.5 );
            }
            
            _tooltip.addEventListener( "click", function() {
                    _tooltipHiding = false;
                    
                    self.getProperty( "tooltip.width" ).setTarget( parseInt( container.style.width ) );
                    self.getProperty( "tooltip.height" ).setTarget( parseInt( container.style.height ) );
                    self.getProperty( "tooltip.opacity" ).setTarget( 0.0 );
                }, true );
        }
        
        /**
            Verändert die größe des Tooltips
        */
        function setTooltipImage( image ) {
            if( !_tooltip || _tooltipHiding )
                return;
                
            _tooltip.src = image.src;
            self.getProperty( "tooltip.width" ).setTarget( image.width );
            self.getProperty( "tooltip.height" ).setTarget( image.height );
            self.getProperty( "tooltip.height" ).setSpeed( image.height * 800 / image.width );
            self.getProperty( "tooltip.opacity" ).setTarget( 1.0 );
        }
        
        /**
            Der Konstruktor
        */
        {
            AbstractPropertyUpdater.apply( self );
            
            addNamePanel();
            addButtons();
            addEventPanel();
            
            self.valueChanged();
        }
    }
    
    /**
        Ein Button der sich vergrößert, je näher man dem hotspot-Point kommt
    */
    function Button( object ) {
        
        var _left = 0;
        var _top = 0;
        var _hotspotX = 0;
        var _hotspotY = 0;
        var _defaultLeft = 0;
        var _defaultTop = 0;
        var _width = 0;
        var _height = 0;
        var _defaultHeight = 0;
        var _defaultWidth = 0;
        
        var _propertyWidth = null;
        var _propertyHeight = null;
        var _propertyLeft = null;
        var _propertyTop = null;
        
        var _actionCommand = null;
        
        var self = this;
        
        /**
            Prüft ob ein Punkt im Button enthalten ist.
        */
        this.contains = function( x, y ) {
            return( x >= _left && x <= _left + _width && 
                y >= _top && y <= _top + _height );
        }
        
        /**
            Setzt den ActionCommand
        */
        self.setActionCommand = function( str ) {
            _actionCommand = str;
        }
        
        /**
            Liefert den gesetzten ActionCommand zurück, oder null,
            falls keiner gesetzt wurde
        */
        self.getActionCommand = function( str ) {
            return _actionCommand;
        }
        
        /**
            Setzt die Hotspot-Koordianten in Anteilen (0 - 1)
            von defaultWidth und defaultHeight
        */
        self.setHotspot = function( x, y ) {
            _hotspotX = x;
            _hotspotY = y;
        }
        
        /**
            Setzt die Standardgröße
        */
        self.setDefaultSize = function( width, height ) {
            _defaultWidth = width;
            _defaultHeight = height;
            
            updateSize( _width, _height );
        }
        
        /**
            Setzt die maximale Größe
        */
        self.setMaximumSize = function( width, height ) {
            _maxWidth = width;
            _maxHeight = height;
        }
        
        /**
            Setzt die standard Position
        */
        self.setDefaultPosition = function( left, top ) {
            _defaultLeft = left;
            _defaultTop = top;
            
            updateSize( _width, _height );
        }
        
        /**
            Gibt die Position des Buttons zurück
        */
        self.getLeft = function() {
            return _left;
        }
        
        /**
            Gibt die Breite des Buttons zurück
        */
        self.getWidth = function() {
            return _width;
        }
        
        /**
            Gibt die Höhe des Buttons zurück
        */
        self.getHeight = function() {
            return _height;
        }
        
        /**
            Gibt die Y-Koordinate des Buttons zurück
        */
        self.getTop = function() {
            return _top;
        }
        
        /**
            Setzt die Positions-Propertys
        */
        self.setPositionProperties = function( left, top ) {
            _propertyLeft = left;
            _propertyTop = top;
            
            if( !_propertyWidth )
                setSizeProperties( new SmoothProperty( 0, 0 ),
                    new SmoothProperty( 0, 0 ) );
        }
        
        /**
            Setzt die Größen-Properties
        */
        self.setSizeProperties = function( width, height ) {
            _propertyWidth = width;
            _propertyHeight = height;
            
            if( !_propertyLeft )
                self.setPositionProperties( new SmoothProperty( 0, 0 ),
                    new SmoothProperty( 0, 0 ) );
        }
        
        /**
            Updated die Größe und Position
        */
        self.update = function( x, y ) {
            var radius = Math.max( _maxWidth, _maxHeight );
            var factor = 1 - distance( _hotspotX * _defaultWidth + _defaultLeft,
                _hotspotY * _defaultHeight + _defaultTop, x, y ) / radius;
            
            if( factor < 0 )
                factor = 0;
            
            updateSize( _defaultWidth + (_maxWidth - _defaultWidth) * factor,
                _defaultHeight + (_maxHeight - _defaultHeight) * factor );
        }
        
        /**
            Setzt die Größe und Position intern
        */
        function updateSize( width, height ) {
            _width = width;
            _height = height;
            
            _left = _defaultLeft - _hotspotX * _width;
            _top = _defaultTop - _hotspotY * _height;
            
            self.updateObject();
        }
        
        /**
            Updated das Objekt oder die die Properties, je nachdem, was
            vorhanden ist.
        */
        self.updateObject = function() {
            if( _propertyLeft || _propertyTop || _propertyWidth || _propertyHeight ) {
            
                _propertyLeft.setTarget( _left );
                _propertyTop.setTarget( _top );
                _propertyWidth.setTarget( _width );
                _propertyHeight.setTarget( _height );
            } else {
                object.style.left = _left;
                object.style.top = _top;
                object.style.width = _width;
                object.style.height = _height;
            }
        }
        
        /**
            der Konstruktor
        */
        {
            // nix
        }
    }
    
    /**
        Repräsentiert ein SmoothProperty. 
    */
    function SmoothProperty( current, speed ) {
        
        var _lastUpdate = 0;
        var _target = current;
        var _changeListeners = [];
        
        /**
            Prüft zwei Float werte auf gleichheit.
        */
        function floatEquals( a, b ) {
            return Math.abs( a - b ) < 0.001;
        }
        
        /**
            Prüft ob ein Update notwendig ist
        */
        function needUpdate() {
            return !floatEquals( current, _target ) && !floatEquals( speed, 0 );
        }
        
        /**
            Bringt current näher an Target heran
        */
        this.update = function() {
            var time = new Date().getTime();
            var factor = 0.001 * (time - _lastUpdate);
            _lastUpdate = time;
            
            if( !needUpdate() )
                return false;
                
            if( factor > 1 )
                return true;
                
            var direction = _target > current ? 1 : -1;
            var step = speed * factor * direction;
            var newValue = current + step;
            
            var newSign = _target > newValue ? 1 : -1;
            if( newSign != direction || floatEquals( newValue, _target ) )
                newValue = _target;
            
            current = newValue;
            return true;
        }
        
        /**
            Setzt ein neues Target
        */
        this.setTarget = function( newTarget ) {
            _target = newTarget;
            fireChangeEvent();
        }
        
        /**
            Gibt dem aktuellen wert zurück
        */
        this.getValue = function() {
            return current;
        }
        
        /**
            Setzt den Speed-Wert
        */
        this.setSpeed = function( newSpeed ) {
            speed = newSpeed;
            fireChangeEvent();
        }
        
        /**
            Fügt einen ChangeListener hinzu
        */
        this.addChangeListener = function( l ) {
            _changeListeners.push( l );
        }
        
        /**
            Feuert ein ChangeEvent
        */
        function fireChangeEvent() {
            _lastUpdate = new Date().getTime();
            for( var i = 0; i < _changeListeners.length; i++ )
                _changeListeners[i].stateChanged();
        }
        
    }
    
    /**
        Abstrakte Basisklasse für PropertyUpdater. Die Methode
        this.valueChanged muss überschrieben werden. Sie wird aufgerufen,
        sobald sich die Werte verändert haben.
    */
    function AbstractPropertyUpdater() {
        
        var _properties = {};
        var _interval = -1;
        var self = this;
        
        /**
            Fügt ein neues Property hinzu und initalisiert es mit einem
            gegebenen Wert.
        */
        this.addProperty = function( propertyName, property ) {
            _properties[ propertyName ] = property;
            property.addChangeListener( this );
        }
        
        /**
            Gibt ein Property mit gegebenen Namen zurück
        */
        this.getProperty = function( propertyName ) {
            return _properties[ propertyName ];
        }
        
        /**
            Geht alle Properties durch und updated diese
        */
        function update() {
            var n, changed = false;
            for( n in _properties ) {
                changed |= _properties[n].update();
            }
            
            if( changed ) {
                self.valueChanged();
            } else {
                window.clearInterval( _interval );
                _interval = -1;
            }
        }
        
        self.stateChanged = function() {
            if( _interval == -1 )
                _interval = window.setInterval( update, 50 );
        }
        
        /**
            Initalisiert das Objekt
        */
        {
            
        }
    }
    
    function Diashow( images ) {
        
        var _black, _comment;
        var _previous, _next;
        var self = this;
        var _images = [];
        var _current = -1;
        
        self.valueChanged = function() {
            _black.style.display = (self.getProperty( "black.opacity" ).getValue() > 0.01) ? "block" : "none";
            _black.style.opacity = self.getProperty( "black.opacity" ).getValue();
            
            for( var i = 0; i < images.length; i++ ) {
                var visible = self.getProperty( i + ".size" ).getValue() > 0.01 &&
                    self.getProperty( i + ".opacity" ).getValue() > 0.01;
                
                _images[i].style.display = visible ? "block" : "none";
                if( visible ) {
                    _images[i].style.opacity = self.getProperty( i + ".opacity" ).getValue();
                    
                    var width = self.getProperty( i + ".size" ).getValue() * images[i].image.width;
                    var height = self.getProperty( i + ".size" ).getValue() * images[i].image.height;
                    
                    var left = (_black.offsetWidth - width) / 2;
                    var top = (_black.offsetHeight - height) / 2;
                    
                    _images[i].style.left = left;
                    _images[i].style.top = top;
                    _images[i].style.width = width;
                    _images[i].style.height = height;
                }
            }
        }
        
        function addImages() {
            
            var current = 0;
            var fNext = function( image ) {
                    if( current > 0 ) {
                        images[current-1].image = image;
                        if( current == 1 )
                            showImage( 0 );
                    }
                    
                    if( current < images.length ) {
                        var thisOne = current++;
                        preloadImage( images[thisOne].src, fNext );
                    }
                };
            fNext();
            
            for( var i = 0; i < images.length; i++ ) {
                
                var image = document.createElement( "img" );
                image.style.position = "absolute";
                image.style.display = "none";
                image.style.background = "#000";
                image.style.padding = 2;
                image.style.border = "1px solid #fff";
                image.addEventListener( "mouseup", (function( nr ) { return function( event ) {
                        if( event.which == 1 && nr + 1 < images.length )
                            showImage( nr + 1 );
                        if( event.which == 2 && nr - 1 >= 0 )
                            showImage( nr - 1 );
                    } })(i), true );
                
                _black.appendChild( image );
                _images.push( image );
                
                var propertyOpacity = new SmoothProperty( 0, 2 );
                var propertySize = new SmoothProperty( 0, 2 );
                self.addProperty( i + ".opacity", propertyOpacity );
                self.addProperty( i + ".size", propertySize );
            }
        }
        
        
        function showImage( nr ) {
            if( _current != -1 ) {
                var prev = _current;
                
                _images[ prev ].style.zIndex = 130;
                self.getProperty( prev + ".opacity" ).setTarget( 0 );
                self.getProperty( prev + ".size" ).setTarget( 0 );
            }
            
            if( nr >= _images.length || nr < 0 )
                return;
            
            _images[ nr ].src = images[ nr ].image.src;
            _images[ nr ].style.zIndex = 131;
            
            self.addProperty( nr + ".opacity", new SmoothProperty( 0, 2 ) );
            self.addProperty( nr + ".size", new SmoothProperty( 0, 2 ) );
            
            self.getProperty( nr + ".opacity" ).setTarget( 1 );
            self.getProperty( nr + ".size" ).setTarget( 1 );
            
            if( images[nr].comment ) {
                _comment.innerHTML = images[nr].comment;
            } else {
                _comment.innerHTML = "";
            }
            
            _current = nr;
        }
        
        /**
            Konstruktor
        */
        {
            AbstractPropertyUpdater.apply( self );
            
            _black = document.createElement( "div" );
            _black.className = "Diashow";
            
            document.addEventListener( "keyup", function( event ) {
                    self.getProperty( "black.opacity" ).setTarget( 0 );
                }, true );
            
            document.getElementsByTagName( "body" )[0].appendChild( _black );
            addImages();
            
            _comment = document.createElement( "div" );
            _comment.className = "Comment";
           
            _black.appendChild( _comment );
            
            self.addProperty( "black.opacity", new SmoothProperty( 0, 1 ) );
            self.getProperty( "black.opacity" ).setTarget( 1 );
        }
    }
    
    /**
        Läd ein Bild und ruft bei Erfolg die Funktion "callback" auf
    */
    function preloadImage( file, callback ) {
        var image = new Image();
        if( callback ) {
            image.addEventListener( "load", function() {
                    callback( image );
                }, true );
        }
        image.src = file;
    }
    
    /**
        Brechnet die absolute Position eines Objektes zur oberen
        linken Ecke der Seite
    */
    function getAbsoluteLeft( object ) {
        var left = 0;
        while( object.offsetParent != null ) {
            left += object.offsetLeft;
            object = object.offsetParent;
        }
        return left;
    }
    
    /**
        Berechnet die absolute Position eines Objektes zur linken
        oberen Ecke der Seite.
    */
    function getAbsoluteTop( object ) {
        var top = 0;
        while( object.offsetParent != null ) {
            top += object.offsetTop;
            object = object.offsetParent;
        }
        return top;
    }
    
    
    function doFlirt( link ) {
        var index = link.indexOf( "id=" );
        if( index == -1 )
            return;
        
        var id = parseInt( link.substr( index + 3 ) );
        var xml = new XMLHttpRequest();
        xml.open( "POST", "http://www.wiealt.de/index.php?show=home&mode=wiehot&do=flirt", true );
        xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        
        xml.onreadystatechange = function() {
            if( xml.readyState == 4 ) {
                if( xml.responseText.indexOf( "erfolgreich verschickt" ) != -1 ) {
                    alert( "Flirtnachricht erfolgreich verschickt!" );
                } else {
                    alert( "Flirtnachricht konnte nicht verschickt werden!" );
                }
            } };
            
        xml.send( "flirtid=" + id );
    }
    
    /**
        Berechnet die Distanz zwischen [x1,y1] und [x2,y2]
    */
    function distance( x1, y1, x2, y2 ) {
        var a = x2 - x1;
        var b = y2 - y1;
        return Math.sqrt( a * a + b * b );
    }
    
    
    /**
        Fügt das CSS-StyleSheet in die Seite ein
    */
    function addStyleSheet( url ) {
        var link = document.createElement( "link" );
        link.href = url;
        link.type = "text/css";
        link.rel = "stylesheet";
        
        document.getElementsByTagName( "head" )[0].appendChild( link );
    }
    
    /**
        Erzeugt die erweiterten Tooltips
    */
    function createTooltips() {
        var images = [];
        var nodes = document.getElementsByTagName( "img" );
        for( var i = 0; i < nodes.length; i++ ) {
            var node = nodes[i];
            if( node.src.match( "http://img.*wiealt\\.de/.*/profil/.*jpg" ) ) {
                images.push( node );
            }
        }
        
        for( var i = 0; i < images.length; i++ ) {
            var preview = images[i];
            if( preview.previousSibling == null
                ||preview.previousSibling.className != "tooltip" ) {
             
                continue;
            }
            
            var name = preview.previousSibling.innerHTML;
            var link = preview.parentNode;
            
            var image = document.createElement( "div" );
            if( preview.className == "" )
                image.style.border = "1px solid #000";
                
            image.className = "UserImage";
            image.style.position = "relative";
            image.style.width = preview.width;
            image.style.height = preview.height;
            image.style.backgroundImage = "url(" + preview.src + ")";
            
            link.parentNode.replaceChild( image, link );
            
            new ExtendedUserImage( image, preview.src, name, link.href );
        }
    }
    
    /**
        Versucht die Werbung zu entfernen
    */
    function removeAds() {
        var nodes = document.getElementsByTagName( "td" );
        for( var i = 0; i < nodes.length; i++ ) {
            if( nodes[i].width == 162 || nodes[i].width == 468 )
                nodes[i].innerHTML = "";
        }
    }
    
    /**
        Fügt einen Flirtbutton in der UserAnsicht hinzu
    */
    function addFlirtButton() {
        var nodes = document.getElementsByTagName( "img" );
        for( var i = 0; i < nodes.length; i++ ) {
            var image = nodes[i];
            if( image.src.indexOf( 'img/layout/usr_block.png' ) != -1 ) {
            
                var flirt = document.createElement( "img" );
                flirt.src = "http://theoneandonlyfoo.th.funpic.de/wiealt/flirt22.png";
                flirt.style.border = "none";
                flirt.addEventListener( "click", function() {
                        doFlirt( location.href );
                    }, true );
                
                image.parentNode.parentNode.insertBefore( flirt, image.parentNode );
                break;
            }
        }
    }
    
    /**
        Erstellt eine Diashow, indem es alle Bilder ausließt und einen
        Button hinzufügt.
    */
    function createDiashow() {
        
        var images = [];
        var nodes = document.getElementsByTagName( "img" );
        for( var i = 0; i < nodes.length; i++ ) {
            if( nodes[i].src.match( "http://img.\\.wiealt\\.de/.*_thumb.jpg" ) ) {
                var image = {};
                image.preview = nodes[i].src;
                image.src = image.preview.replace( "_thumb", "" );
                
                var tooltip = nodes[i].parentNode.previousSibling;
                while( tooltip && tooltip.className != "tooltip" )
                    tooltip = tooltip.previousSibling;
                
                if( tooltip )
                    image.comment = tooltip.innerHTML;
                    
                images.push( image );
            }
        }
        
        for( var i = 0; i< nodes.length; i++ ) {
            var node = nodes[i];
            if( node.src.match( "http://img.*wiealt\\.de/.*/profil/.*jpg" ) ) {
                var image = {};
                image.preview = node.src;
                image.src = image.preview.substr( 0, image.preview.indexOf( "_" ) ) + "_640.jpg";
               
                if( node.previousSibling == null
                    || node.previousSibling.className != "tooltip" ) {
                 
                    continue;
                }
                
                image.comment = "User: " + node.previousSibling.innerHTML;
                
                images.push( image );
            }
        }
        
        nodes = document.getElementsByTagName( "a" );
        for( var i = 0; i < nodes.length; i++ ) {
            if( nodes[i].innerHTML == "Zurück zur Galerieübersicht" ) {
                
                var link = document.createElement( "a" );
                link.href = 'javascript:void(0);';
                link.innerHTML = "Diashow starten";
                link.addEventListener( "click", function() {
                        new Diashow( images );
                    }, true );
                    
                nodes[i].parentNode.appendChild( link );
                
                break;
            }
        }
    }
    
    function initializeHotnessVote() {
        
        var _quickVote = [];
        
        /**
            Guckt ob wir uns im hotvote Modus befinden
        */
        function isHotnessVote() {
            return location.href.indexOf( "show=hotness" ) != -1;
        }
        
        /**
            Findet die Hotness-Tabelle
        */
        function getHotnessTable() {
            var nodes = document.getElementsByTagName( "table" );
            for( var i = 0; i < nodes.length; i++ ) {
                if( nodes[i].width == 750 ) {
                    return nodes[i];
                }
            }
            
            return null;
        }
        
        /**
            Wenn wir uns im Hotvote Modus befinden, dann Bereiten wir
            die aktuelle Tabelle auf den QuickVoteModus vor und
            cachen die nächste Anfrage
        */
        function enableQuickVote() {
            if( !isHotnessVote() )
                return;
            
            var table = getHotnessTable();
            if( table == null )
                return;
            
            preloadQuickVote();
            
            var nodes = table.getElementsByTagName( "input" );
            for( var i = 0; i < nodes.length; i++ ) {
                var node = nodes[i];
                if( node.type != "submit" || node.value.indexOf( "berspringen" ) != -1 )
                    continue;
                
                node.type = "button";
                node.addEventListener( "click", (function( n ) { 
                        return function() { doQuickVote( n ); }
                    } )( node ), true );
                
            }
        }
        
        /**
            Führt einen QuickVote aus
        */
        function doQuickVote( button ) {
            var xml = new XMLHttpRequest();
            xml.open( "POST", "http://www.wiealt.de/index.php?show=hotness&do=rate" +
                (button.name == "flirt" ? "&flirt=1" : "" ), true );
                
            xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            
            xml.onreadystatechange = function() {
                    if( xml.readyState == 4 ) {
                        flipQuickVotes();
                        enableQuickVote();
                    }
                };
            
            var form = button.parentNode;
            var looser = getElementByName( form, "loserid" );
            var winner = getElementByName( form, "winnerid" );
            
            var post = [];
            post.push( "winnerid=" + winner.value );
            post.push( "loserid=" + looser.value );
            post.push( button.name + "=" + encodeURIComponent( button.value ) );
            
            xml.send( post.join( "&" ) );
        }
        
        /**
            Läd die daten für ein QuickVote vor
        */
        function preloadQuickVote() {
            if( _quickVote.length >= 5 )
                return;
            
            var xml = new XMLHttpRequest();
            xml.open( "GET", "http://www.wiealt.de/index.php?show=hotness", true );
            xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            xml.onreadystatechange = function() {
                    if( xml.readyState == 4 ) {
                        var text = xml.responseText;
                        var start = text.indexOf( "<table align='center' width='750'" );
                        if( start == -1 ) {
                            _quickVote = null;
                            return;
                        }
                        
                        var end = text.indexOf( "</table>", start );
                        if( end == -1 ) {
                            _quickVote = null;
                            return;
                        }
                        var text = text.substring( start, end + 8 );
                        _quickVote.push( text );
                        
                        start = text.indexOf( "http://img" );
                        while( start != -1 ) {
                            end = text.indexOf( "'", start );
                            var image =text.substring( start, end );
                            preloadImage( image );
                            
                            start = text.indexOf( "http://img", end );
                        }
                        
                        if( _quickVote.length < 5 )
                            preloadQuickVote();
                    }
                };
            xml.send( null );
        }
        
        /**
            Zeigt das nächste Hotness-Paar
        */
        function flipQuickVotes() {
            var table = getHotnessTable();
            if( table == null )
                return;
            
            table.parentNode.innerHTML = _quickVote.shift();
        }
        
        /**
            Emuliert das getElementsByName Verhalten
        */
        function getElementByName( form, name ) {
            var nodes = form.getElementsByTagName( "*" );
            for( var i = 0; i < nodes.length; i++ ) {
                if( nodes[i].name == name ) {
                    return nodes[i];
                }
            }
            return null;
        }
        
        
        /**
            Konstruktor
        */
        {
            enableQuickVote();
        }
    }
    
    /**
        Läd die GoogleNews
    */
    function fetchNews( rssUrl ) {
        GM_xmlhttpRequest( {
            method: 'GET',
            url: rssUrl,
            onload: function( details ) {
                if( details.status == 200 ) {
                    
                }
            }
        } );
    }
    
    /**
        Konstruktor
    */
    {
        addStyleSheet( "http://theoneandonlyfoo.th.funpic.de/wiealt/wiealt.css" );
        removeAds();
        addFlirtButton();
        createDiashow();
        // fetchNews( "http://news.google.com/?output=rss&topic=h" );
        initializeHotnessVote();
        createTooltips();
    }
})();

