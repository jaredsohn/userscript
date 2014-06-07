// ==UserScript==
// @name           flickwriter
// @namespace      http://labs.37to.net/flickwriter/
// @description    Create Link as flickr image.
// @version        0.10 alpha
// @copyright      2009+, 37to (http://www.37to.net/)
// @licence        The MIT License Copyright (c) 2009 37to.
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
(function() {

    /**
     * Controller Object
     */
    var flickWriter = {
        photo      : {},
        template   : {},
        hasStorage : false,

        /*------------------------------------
         Main
        ------------------------------------*/

        init : function(){
            if(typeof GM_getValue == 'function'){
                this.hasStorage = true;
                //load saved data.
                this.loadTemplates();
            }
            
            if( view.insertTarget.get() ){
                //load image data
                this.requestPhotoData();
            }
        },

        requestPhotoData : function(){
            var self     = this;
            var photoId  = view.getPhotoId();
            var callback = {
                flickr_photos_getSizes_onLoad : function(success, responseXML, responseText, params){
                    self.loadPhoto(responseXML);
                }
            };
            unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {
                photo_id: photoId
            }, callback);
        },

        loadPhoto : function(responseXML){
            var self = this;

            /*** photo data ***/
            this.photo = new FlickrPhoto(responseXML);
            this.setTemplate( this.photo );

            /*** generate html ***/
            //edit area
            var editArea = view.editArea.createElement();
            //select box
            var selectBox = view.selectBox.createElement( templateSets.getNames() );
            selectBox.addEventListener('change', function(event){
                self.changeTemplate(event.target);
                event.stopPropagation();
            }, false);
            editArea.appendChild( selectBox );
            
            //textarea
            var textArea = view.textArea.createElement();
            //textarea wrapper
            var p        = view.textAreaBox.createElement();

            //append html.
            if( this.hasStorage ){
                //this is bad code.rewrite later.
                var editMenuList = view.editMenuList.create({
                    code : {
                        id   : 'code',
                        text : 'code',
                        //"this" keyword in event handler indicates parent object
                        event : {
                            click : function(event){
                            },
                            active : function(){
                                view.editMenuButton.get(this.id).style.color = '#000';
                                var selectBox = view.selectBox.get();
                                self.showTemplate(selectBox);
                                view.editMenuArea.toggle(this.id);
                            },
                            nonActive : function(){
                                view.editMenuButton.get(this.id).style.color = '#0063DC';
                            }
                        }
                    },
                    format : {
                        id   : 'format',
                        text : 'edit',
                        //"this" keyword in event handler indicates parent object
                        event : {
                            click : function(event){
                            },
                            active : function(){
                                view.editMenuButton.get(this.id).style.color = '#000';
                                var selectBox = view.selectBox.get();
                                self.showTemplateFormat(selectBox);
                                view.editMenuArea.toggle(this.id);
                            },
                            nonActive : function(){
                                view.editMenuButton.get(this.id).style.color = '#0063DC';
                            }
                        },
                        editArea : function(elem){
                            var menuBody  = view.formatEditMenu.createElement();
                            menuBody.addEventListener('click', function(event){
                                var selectBox = view.selectBox.get();
                                var n = selectBox.selectedIndex;
                                if( selectBox.options[n].value !== '' ){
                                    var template = templateSets.templates[selectBox.options[n].value];
                                    template.code = view.textArea.get().value;
                                }
                                self.saveTemplate(templateSets);
                                alert('saved');
                                event.stopPropagation();
                            }, false);
                            elem.appendChild(menuBody);
                        }
                    }
                });
                editArea.appendChild(editMenuList);
            }
            p.appendChild(textArea);
            editArea.appendChild( p );
            view.insertTarget.append(editArea);
        },

        loadTemplates : function(){
            var templates = GM_getValue('templates');
            if( templates === undefined ){
                this.saveTemplate(templateSets);
            }else{
                templateSets.templates = eval(templates);
            }
        },

        setTemplate : function(photo){
            this.template = new Templater();

            //set default valiables
            for( var i in templateSets.valiables ){
                this.template.set( templateSets.valiables[i].name, '' );
            }

            //set photo info
            for( var i in photo.info ){
                this.template.set( i.toUpperCase(), photo.info[i] );
            }

            //set photo sizes
            for( var i in photo.sizes ){
                var label = this.getSizeLabel(i);
                var size  = photo.sizes[i];
                for( var j in size ){
                    name = label + '_' + j.toUpperCase();
                    this.template.set( name, size[j] );
                }
            }
        },

        saveTemplate : function( templateSets ){
            templates = templateSets.templates.toSource();
            GM_setValue('templates', templates);
        },

        /*------------------------------------
         Event Handler
        ------------------------------------*/

        changeTemplate : function(selectBox){
            var n = selectBox.selectedIndex;
            if( selectBox.options[n].value !== '' ){
                view.editMenuList.show();
                view.textAreaBox.show();
                this.showTemplate(selectBox);
                view.editMenuList.activate(document.getElementById('flickwriter_edit_menubar_code'));
            }else{
                view.editMenuList.hide();
                view.textAreaBox.hide();
            }
        },
        
        showTemplate : function(selectBox){
            var n = selectBox.selectedIndex;
            //This event is deleted once so that it is not called more than once. 
            view.textArea.get().removeEventListener('click', this.selectTextArea, false);
            if( selectBox.options[n].value !== '' ){
                var template = templateSets.templates[selectBox.options[n].value];
                view.textArea.get().value = this.template.fetch(template.code);
                view.textArea.get().addEventListener('click',this.selectTextArea, false);
                view.textAreaBox.show();
            }else{
                view.textAreaBox.hide();
            }
        },
        
        showTemplateFormat : function(selectBox){
            var n = selectBox.selectedIndex;
            //This event is deleted once so that it is not called more than once. 
            view.textArea.get().removeEventListener('click', this.selectTextArea, false);
            if( selectBox.options[n].value !== '' ){
                var template = templateSets.templates[selectBox.options[n].value];
                view.textArea.get().value = template.code;
                view.textArea.get().addEventListener('click',this.selectTextArea, false);
                view.textAreaBox.show();
            }else{
                view.textAreaBox.hide();
            }
        },

        selectTextArea : function(event){
            event.target.focus();
            event.target.select();
            //only first click
            event.target.removeEventListener(event.type, arguments.callee, false);
        },

        /*------------------------------------
         Utility
        ------------------------------------*/

        getSizeLabel : function( sizeName ){
            var label = 'SIZE_';
            switch( sizeName ){
              case 'large':
                label = label + 'O';
                break;
              case 'medium':
                label = label + 'M';
                break;
              case 'small':
                label = label + 'S';
                break;
              case 'thumbnail':
                label = label + 'T';
                break;
              case 'square':
                label = label + 'SQ';
                break;
            }
            return label;
        }
    };

    /**
     * HTML and more View Object
     */
    var view = {
        
        /*------------------------------------
         Manipulation HTML
        ------------------------------------*/

        selectBox : {
            createElement : function( names ){
                var selectBox    = document.createElement('select');
                selectBox.id     = 'flickwriter_selectbox';
                var option       = document.createElement('option');
                option.innerHTML = '... Please select';
                option.value     = '';
                selectBox.appendChild(option);
                for( var i in names ){
                    var option       = document.createElement('option');
                    option.innerHTML = names[i];
                    option.value     = i;
                    selectBox.appendChild(option);
                }
                return selectBox;
            },
            get : function(){
                return document.getElementById('flickwriter_selectbox');
            }
        },

        textArea : {
            createElement : function(){
                var textArea         = document.createElement('textarea');
                textArea.id          = 'flickwriter_textarea';
                textArea.rows        = 10;
                textArea.style.width = '90%';
                return textArea;
            },

            get : function(){
                return document.getElementById('flickwriter_textarea');
            }
        },

        textAreaBox : {
            createElement : function(){
                var p           = document.createElement('p');
                p.id            = 'flickwriter_textarea_box';
                p.style.display = 'none';
                return p;
            },

            get : function(){
                return document.getElementById('flickwriter_textarea_box');
            },

            show : function(){
                this.get().style.display = 'block';
            },

            hide : function(){
                this.get().style.display = 'none';
            }
        },

        editArea : {
            createElement : function(){
                var div = document.createElement('div');
                div.style.margin = '1em 0';
                return div;
            }
        },

        insertTarget : {
            get : function(){
                return document.getElementById('button_bar');;
            },
            append : function(elem){
                var buttonBar = this.get();
                buttonBar.parentNode.insertBefore( elem, buttonBar.nextSibling );
            }
        },

        editMenuList : {

            menus : {},

            create : function(menus){
                this.menus   = menus;
                var menubar  = this.createMenubar(menus);
                var editArea = this.createEditArea(menus);
                var menuList = this.createElement();
                menuList.appendChild(menubar);
                menuList.appendChild(editArea);
                return menuList;
            },
            
            createElement : function(){
                var div = document.createElement('div');
                div.id  = 'flickwriter_edit_menu';
                div.style.display = 'none';
                return div;
            },

            activate : function(target){
                var menus = this.menus;
                for( var key in menus ){
                    if(target.id != view.editMenuButton.getId( menus[key].id ) ){
                        if( menus[key].event.nonActive )
                          menus[key].event.nonActive.apply( menus[key], null );
                    }else{
                        if( menus[key].event.active )
                          menus[key].event.active.apply( menus[key], null );
                    }
                }
                
            },

            createMenubar : function(menus){
                var p = document.createElement('p');
                p.id  = 'flickwriter_edit_menubar';
                for( var i in menus ){
                    var elem = view.editMenuButton.createElement( menus[i].id, menus[i].text);
                    elem._flickWriter = {};
                    if( menus[i].event ){
                        for( var type in menus[i].event ){
                            if( type == 'active' || type == 'nonActive' ){
                                elem._flickWriter[type] = function(menus, key, type){
                                    return function(elem){
                                        menus[key].event[type](elem);
                                    };
                                }(menus, i, type);
                            }else{
                                var callback = function(menus, key, type){
                                    return function(event){
                                        menus[key].event[type].call( menus[key] ,event);
                                    }
                                }(menus, i, type);
                                elem.addEventListener( type, callback, false );
                            }
                        }
                    }
                    elem.addEventListener( 'click', function(event){
                        view.editMenuList.activate( event.currentTarget );
                    }, false );
                    p.appendChild( elem );
                    p.appendChild( document.createTextNode( ' | ' ) );
                }
                //remove last "|"
                p.removeChild( p.childNodes.item(p.childNodes.length-1) );
                return p;
            },

            createEditArea : function(menus){
                var div = document.createElement('div');
                div.id  = 'flickwriter_edit_menuarea';
                for( var i in menus ){
                    var elem = view.editMenuArea.createElement( menus[i].id, menus[i].text);
                    if( typeof menus[i].editArea === 'function' ){
                        menus[i].editArea(elem);
                    }
                    div.appendChild( elem );
                }
                return div;
            },

            get : function(){
                return document.getElementById('flickwriter_edit_menu');
            },

            show : function(){
                this.get().style.display = '';
            },

            hide : function(){
                this.get().style.display = 'none';
            }
        },
        
        editMenuButton : {

            getId : function(id){
                return 'flickwriter_edit_menubar_'+id;
            },
            
            createElement : function(id, text){
                var span          = document.createElement('span');
                span.id           = this.getId(id);
                span.style.color  = '#0063DC';
                span.style.cursor = 'pointer';
                span.innerHTML    = text;
                return span;
            },

            get : function(id){
                return document.getElementById(this.getId(id));
            },

            button : {
                
            },

            area : {
            }
        },

        editMenuArea : {

            getId : function(id){
                return 'flickwriter_edit_menuarea_'+id
            },
            
            createElement : function(id, text){
                var div           = document.createElement('div');
                div.id            = this.getId(id);
                div.style.display = 'none';
                return div;
            },

            get : function(id){
                return document.getElementById( this.getId(id) );
            },

            toggle : function(id, before, after){
                var elem = this.get(id);
                var areas = document.getElementById('flickwriter_edit_menuarea').childNodes;
                for( var i=0, l=areas.length; i<l; i++ ){
                    if(elem.id != areas[i].id){
                        areas[i].style.display = 'none';
                        //areas[i]._flickWriter.nonactive();
                    }
                }
                view.toggle(elem);
                //elem._flickWriter.nonactive();
            }
        },

        formatMenu : {
            createElement : function(){
                var div = document.createElement('div');
                div.id  = 'format_menu';
                div.innerHTML = 'edit';
                return div;
            },

            newTitle : function(){
            },

            newBody : function(){
            }
            
        },
        
        formatEditMenu : {
            createElement : function(name, code){
                var div = document.createElement('div');
                div.id  = 'format_edit_menu';
                div.innerHTML = '<span id="format_save_link" style="color:#0063DC;cursor:pointer;">save</span>';
                return div;
            },

            newTitle : function(){
            },

            newBody : function(){
            }
            
        },

        /*------------------------------------
         Getter of Photo into
        ------------------------------------*/

        getTitle : function(){
            var title   = '';
            var photoId = this.getPhotoId();
            var elem    = document.getElementById("title_div" + photoId);
            if( elem ) title = elem.innerHTML;
            return title;
        },

        getDescription : function(){
            var description = '';
            var photoId     = this.getPhotoId();
            var elem        = document.getElementById("description_div" + photoId);
            if( elem ) description = elem.innerHTML;
            return description;
        },

        getOwnerName : function(){
            var ownerName = '';
            var res = document.evaluate('//div[@class="Widget"]//a/b',
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if( res.snapshotLength ) ownerName = res.snapshotItem(0).innerHTML;
            return ownerName;
        },
        
        getOwnerIcon : function(){
            var ownerIcon = '';
            var res = document.evaluate('//div[@class="Widget"]//a/img',
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if( res.snapshotLength ) ownerIcon = res.snapshotItem(0).src;
            return ownerIcon;
            
        },

        getPhotoStream : function(){
            var photoStream = '';
            var res = document.evaluate('//div[@class="Widget"]//a/b',
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if( res.snapshotLength ) photoStream = res.snapshotItem(0).parentNode.href;
            return photoStream;
        },

        getUploadDate : function(){
            var uploadDate = '';
            var res = document.evaluate('//div[@class="Widget"]//a[@class="Plain"]',
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if( res.snapshotLength ) uploadDate = res.snapshotItem(0).innerHTML;
            return uploadDate;
            
        },

        getPhotoId : function(){
            return location.pathname.split('/')[3];
        },
        
        /*------------------------------------
         Utility
        ------------------------------------*/

        toggle : function(elem){
            if( elem.style.display == 'none' ){
                elem.style.display = '';
            }else{
                elem.style.display = 'none';
            }
        }
    }

    /**
     * flickr's photo Object
     */
    var FlickrPhoto = function(rsp){
        //parse xml and set to object
        this.rsp.status = rsp.getElementsByTagName('rsp')[0].getAttribute('stat');
        this.rsp.sizes  = rsp.getElementsByTagName('size');
        if( this.rsp.status != 'ok' ) return;

        //set sizes
        for( var i=0, l=this.rsp.sizes.length; i<l; i++ ){
            var size = this.rsp.sizes[i];
            if( size.getAttribute('media') === 'photo' ){
                this.sizes[size.getAttribute('label').toLowerCase()] = {
                    width    : size.getAttribute('width'),
                    height   : size.getAttribute('height'),
                    imageUrl : size.getAttribute('source'),
                    pageUrl  : size.getAttribute('url'),
                };
            }
        }
        
        //set page info
        this.info.pageUrl     = location;
        this.info.title       = view.getTitle();
        this.info.description = view.getDescription();
        this.info.uploadDate  = view.getUploadDate();
        this.info.ownerName   = view.getOwnerName();
        this.info.ownerIcon   = view.getOwnerIcon();
        this.info.photoStream = view.getPhotoStream();
    };
    FlickrPhoto.prototype = {
        sizes : {},
        info : {
            pageUrl     : '',
            title       : '',
            description : '',
            uploadDate  : '',
            ownerName   : '',
            ownerIcon   : '',
            photoStream : ''
        },
        rsp : {
            status : 'error',
            sizes  : []
        }
    };

    /**
     * Simple Template Engine Object
     **/
    var Templater = function(){};
    Templater.prototype ={
        valiables : {},
        set : function( name, value ){
            this.valiables[name] = value;
        },

        fetch : function( template ){
            var pattern = /(%.+?%)/;
            var splitTemplate = template.split(pattern);
            for( var i=0,l=splitTemplate.length; i<l; i++ ){
                if( splitTemplate[i].match(pattern) ){
                    var name = splitTemplate[i].replace( /%(.+)%/, '$1' );
                    if( this.valiables[name] !== undefined )
                      splitTemplate[i] = this.valiables[name];
                }
            }
            return splitTemplate.join('');
        }
    };

    /**
     * Template sets object
     **/
    var templateSets = {
        valiables : [
            {
                name : 'TITLE',
                desc : 'Photo title'
            },
            {
                name : 'PAGEURL',
                desc : 'Photo page url'
            },
            {
                name : 'DESCRIPTION',
                desc : 'Description of photo'
            },
            {
                name : 'UPLOADDATE',
                desc : 'Updaload date of photo'
            },
            {
                name : 'OWNERNAME',
                desc : 'Author in photo'
            },
            {
                name : 'OWNERICON',
                desc : 'Icon url of author in photo'
            },
            {
                name : 'PHOTOSTREAM',
                desc : 'Photo Stream url of author in photo'
            },
            {
                name : 'SIZE_O_IMAGEURL',
                desc : 'Url of original size photo'
            },
            {
                name : 'SIZE_O_PAGEURL',
                desc : 'Url of original size photo page'
            },
            {
                name : 'SIZE_O_WIDTH',
                desc : 'Width of original size photo'
            },
            {
                name : 'SIZE_O_HEIGHT',
                desc : 'Height of original size photo'
            },
            {
                name : 'SIZE_M_IMAGEURL',
                desc : 'Url of medium size photo'
            },
            {
                name : 'SIZE_M_PAGEURL',
                desc : 'Url of medium size photo page'
            },
            {
                name : 'SIZE_M_WIDTH',
                desc : 'Width of medium size photo'
            },
            {
                name : 'SIZE_M_HEIGHT',
                desc : 'Height of medium size photo'
            },
            {
                name : 'SIZE_T_IMAGEURL',
                desc : 'Url of thumbnail size photo'
            },
            {
                name : 'SIZE_T_PAGEURL',
                desc : 'Url of thumbnail size photo page'
            },
            {
                name : 'SIZE_T_WIDTH',
                desc : 'Width of thumbnail size photo'
            },
            {
                name : 'SIZE_T_HEIGHT',
                desc : 'Height of thumbnail size photo'
            },
            {
                name : 'SIZE_S_IMAGEURL',
                desc : 'Url of small size photo'
            },
            {
                name : 'SIZE_S_PAGEURL',
                desc : 'Url of small size photo page'
            },
            {
                name : 'SIZE_S_WIDTH',
                desc : 'Width of small size photo'
            },
            {
                name : 'SIZE_S_HEIGHT',
                desc : 'Height of small size photo'
            },
            {
                name : 'SIZE_SQ_IMAGEURL',
                desc : 'Url of square size photo'
            },
            {
                name : 'SIZE_SQ_PAGEURL',
                desc : 'Url of square size photo page'
            },
            {
                name : 'SIZE_SQ_WIDTH',
                desc : 'Width of square size photo'
            },
            {
                name : 'SIZE_SQ_HEIGHT',
                desc : 'Height of square size photo'
            }
        ],
        
        templates : [
            {
                name : 'Plane Text',
                code : '%TITLE%\n%PAGEURL%'
            },
            {
                name : 'Basic HTML(Original)',
                code : '<a title="%TITLE%" href="%PAGEURL%"><img src="%SIZE_O_IMAGEURL%" width="%SIZE_O_WIDTH%" height="%SIZE_O_HEIGHT%" alt="%TITLE%" /></a>'
            },
            {
                name : 'Basic HTML(Medium)',
                code : '<a title="%TITLE%" href="%PAGEURL%"><img src="%SIZE_M_IMAGEURL%" width="%SIZE_M_WIDTH%" height="%SIZE_M_HEIGHT%" alt="%TITLE%" /></a>'
            },
            {
                name : 'Basic HTML(Small)',
                code : '<a title="%TITLE%" href="%PAGEURL%"><img src="%SIZE_S_IMAGEURL%" width="%SIZE_S_WIDTH%" height="%SIZE_S_HEIGHT%" alt="%TITLE%" /></a>'
            },
            {
                name : 'Basic HTML(Thumbnail)',
                code : '<a title="%TITLE%" href="%PAGEURL%"><img src="%SIZE_T_IMAGEURL%" width="%SIZE_T_WIDTH%" height="%SIZE_T_HEIGHT%" alt="%TITLE%" /></a>'
            },
            {
                name : 'Basic HTML(Square)',
                code : '<a title="%TITLE%" href="%PAGEURL%"><img src="%SIZE_SQ_IMAGEURL%" width="%SIZE_SQ_WIDTH%" height="%SIZE_SQ_HEIGHT%" alt="%TITLE%" /></a>'
            },
            {
                name : 'LightBox HTML(Medium to Original)',
                code : '<a title="%TITLE%" href="%SIZE_O_IMAGEURL%" rel="lightbox"><img src="%SIZE_M_IMAGEURL%" width="%SIZE_M_WIDTH%" height="%SIZE_M_HEIGHT%" alt="%TITLE%" /></a><br /><a href="%PAGEURL%">%TITLE%"</a>'
            },
            {
                name : 'LightBox HTML(Small to Original)',
                code : '<a title="%TITLE%" href="%SIZE_O_IMAGEURL%" rel="lightbox"><img src="%SIZE_S_IMAGEURL%" width="%SIZE_S_WIDTH%" height="%SIZE_S_HEIGHT%" alt="%TITLE%" /></a><br /><a href="%PAGEURL%">%TITLE%"</a>'
            },
            {
                name : 'LightBox HTML(Thumbnail to original)',
                code : '<a title="%TITLE%" href="%SIZE_O_IMAGEURL%" rel="lightbox"><img src="%SIZE_T_IMAGEURL%" width="%SIZE_T_WIDTH%" height="%SIZE_T_HEIGHT%" alt="%TITLE%" /></a><br /><a href="%PAGEURL%">%TITLE%"</a>'
            },
            {
                name : 'LightBox HTML(Square to Original)',
                code : '<a title="%TITLE%" href="%SIZE_O_IMAGEURL%" rel="lightbox"><img src="%SIZE_SQ_IMAGEURL%" width="%SIZE_SQ_WIDTH%" height="%SIZE_SQ_HEIGHT%" alt="%TITLE%" /></a><br /><a href="%PAGEURL%">%TITLE%"</a>'
            }
        ],
        
        getNames : function(){
            var names = [];
            this.templates.forEach( function(v, i){
                names.push(v.name);
            });
            return names;
        }
    };
    

    //Execute
    //----------------------------------------
    //  Maybe, processing of flickr stopped bubbling event. 
    //  Therefore, the loading event is executed by the capture phase.
    document.body.addEventListener( 'load', function(event){
        flickWriter.init();
        //It executes only first and the event is deleted because it is called many times.
        event.currentTarget.removeEventListener( event.type, arguments.callee, true );
    }, true );

})();
