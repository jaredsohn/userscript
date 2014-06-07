// ==UserScript==
// @name       Flickr Exif 2014
// @namespace  http://userscripts.org/users/lorriman
// @version    0.19
// @description  Inserts exif in to photo data bar
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         http://userscripts.org/scripts/source/95009.user.js
// @match      http://www.flickr.com/*
// @match      https://www.flickr.com/*
// @copyright  2012+,  Lorriman MIT license
// ==/UserScript==



function debug(s,label)
{ 	
    label = label || '';
    if(label){
        label=label+': ';
    }
    console.debug('Exif 2014 - '+label+s);
    return s;
}

function debugb(s,label){
    
    label = label || '';
    if(label){
        label='<div>'+label+': '+'</div>';
    }
    $('body').prepend(label+'<pre>'+s+'</pre>');
}

debug('loaded');

function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
} //endfunc


function var_dump() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Zahlii
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // %        note 1: For returning a string, use var_export() with the second argument set to true
    // *     example 1: var_dump(1);
    // *     returns 1: 'int(1)'
    
    var output = '',
        pad_char = ' ',
        pad_val = 4,
        lgth = 0,
        i = 0,
        d = this.window.document;
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    
    var _repeat_char = function (len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };
    var _getInnerVal = function (val, thick_pad) {
        var ret = '';
        if (val === null) {
            ret = 'NULL';
        } else if (typeof val === 'boolean') {
            ret = 'bool(' + val + ')';
        } else if (typeof val === 'string') {
            ret = 'string(' + val.length + ') "' + val + '"';
        } else if (typeof val === 'number') {
            if (parseFloat(val) == parseInt(val, 10)) {
                ret = 'int(' + val + ')';
            } else {
                ret = 'float(' + val + ')';
            }
        }
            // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
            else if (typeof val === 'undefined') {
                ret = 'undefined';
            } else if (typeof val === 'function') {
                var funcLines = val.toString().split('\n');
                ret = '';
                for (var i = 0, fll = funcLines.length; i < fll; i++) {
                    ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
                }
            } else if (val instanceof Date) {
                ret = 'Date(' + val + ')';
            } else if (val instanceof RegExp) {
                ret = 'RegExp(' + val + ')';
            } else if (val.nodeName) { // Different than PHP's DOMElement
                switch (val.nodeType) {
                    case 1:
                        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
                            ret = 'HTMLElement("' + val.nodeName + '")';
                        } else {
                            ret = 'XML Element("' + val.nodeName + '")';
                        }
                        break;
                    case 2:
                        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
                        break;
                    case 3:
                        ret = 'TEXT_NODE(' + val.nodeValue + ')';
                        break;
                    case 4:
                        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
                        break;
                    case 5:
                        ret = 'ENTITY_REFERENCE_NODE';
                        break;
                    case 6:
                        ret = 'ENTITY_NODE';
                        break;
                    case 7:
                        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
                        break;
                    case 8:
                        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
                        break;
                    case 9:
                        ret = 'DOCUMENT_NODE';
                        break;
                    case 10:
                        ret = 'DOCUMENT_TYPE_NODE';
                        break;
                    case 11:
                        ret = 'DOCUMENT_FRAGMENT_NODE';
                        break;
                    case 12:
                        ret = 'NOTATION_NODE';
                        break;
                }
            }
                return ret;
    };
    
    var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
        var someProp = '';
        if (cur_depth > 0) {
            cur_depth++;
        }
        
        var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
        var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';
        var val = '';
        
        if (typeof obj === 'object' && obj !== null) {
            if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
                return obj.var_dump();
            }
            lgth = 0;
            for (someProp in obj) {
                lgth++;
            }
            str += 'array(' + lgth + ') {\n';
            for (var key in obj) {
                var objVal = obj[key];
                if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val, pad_char);
                } else {
                    val = _getInnerVal(objVal, thick_pad);
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
                }
            }
            str += base_pad + '}\n';
        } else {
            str = _getInnerVal(obj, thick_pad);
        }
        return str;
    };
    
    output = _formatArray(arguments[0], 0, pad_val, pad_char);
    for (i = 1; i < arguments.length; i++) {
        output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
    }
    
    return '<pre>'+output+'</pre>';
}

console.debug('loaded');

Config.prefix = document.domain;
Config.footerHtml = '';
Config.reloadOnSave = false;
Config.scriptName = "Flickr Exif config";


Config.settings = {
    
    '35mm equivalent' : {
        fields : {
            'show35mmequiv' : {
                'type' : 'checkbox',
                'label' : '35mm equiv',
                'text' : 'Show 35mm equiv focal length (in brackets, otherwise fall back to real FL)',
                'value' : false,
                
            },
            'showboth' : { 'type' : 'checkbox' , 'label':'show both', 'value' : true , 'text' : 'disabled unless above also ticked'}
            
        }
    }
};

GM_registerMenuCommand('Flickr Exif 2014 config', Config.show);

//allows passing paramters to the ajax callback
Function.prototype.bind = function (thisObject) {
    var method = this;
    var oldargs = [].slice.call(arguments, 1);
    return function () {
        var newargs = [].slice.call(arguments);
        return method.apply(thisObject, oldargs.concat(newargs));
    };
}; //endfunc

function add_acronym(s,a){
    if(a.charAt(0)=='-'){
        return s+a.replace('-','');
        
    }else{
        return a.replace('-','')+s;
    }   
}



page_targets=[
    
    //home stream
    {	'pages' : [/www.flickr.com\/$/],
     'root' : 'div.imgWrapper[data-photo-id]',
     'id' : {
         'sel' : 'root', 
         'attr' :  'data-photo-id',
         'regex' : /(.*)/
     },
     'target' : {
         'sel' : 'ul.imgLinks',
         'insert' : '<li class="il_fav counter2 "><span class="opacityBackground"></span><span class="li_divider"></span><span class="li_counter">~~replaceme~~</span></li>',
         'pre' : '',
         'post' :'',
         'command' : 'prepend'
     }
    },
    
    //discussion
    {	
        'pages' : [ /\/groups\/.*\/discuss\/\d+/, /\/services\// ],
        'root' : 'img',
        'id' : {
            'sel' : 'root', 
            'attr' :  'src',
            'regex' : /flickr\.com\/[^\/]+\/(\d*)_/
        },
        'target' : {
            'sel' : 'parent',
            'insert' : '&nbsp;~~replaceme~~&nbsp;',
            'pre' : '<p class="Said"><small>',
            'post' :'</small></p>',
            'command' : 'prepend'  
            
        }
    },
    //gallery  
    {	
        'pages' : [ /\/photos\/[^\/]+\/galleries\/\d+/ ],
        'root' : 'div.gallery-item[data-photo-id]',
        'id' : {
            'sel' : 'root', 
            'attr' :  'data-photo-id',
            'regex' : /(.*)/
        },
        'target' : {
            'sel' : 'div.curator_info',
            'insert' : '&nbsp;~~replaceme~~&nbsp;',
            'pre' : '<p class="Said"><small>',
            'post' :'</small></p>',
            'command' : 'append'  
            
        }
    },
    
    
    
    //explore, groups, sets and personal photos 
    {	'pages' : [/\/explore/,/\/photos\/.*/, /\/groups\/[^\/]*?/, /\/search\// ] ,      
     'root' : 'div.photo-display-item[data-photo-id]',
     'id' : {
         'sel' : 'root', 
         'attr' :  'data-photo-id',
         'regex' : /(.*)/
     },
     'user_id' : {
         'sel' : 'root',
         'attr' : 'data-photo-owner',
         'regex' : /(.*)/
     },
     'target' : {
         'sel' : 'div.meta',
         'insert' : '<span class="" style="font-size:9px;padding-left: 2px;" placeholder1 placeholder2 >~~replaceme~~</span>', //placeholders are to aid optional substitutions
         'pre' : '<span class="inline-icons" findme="1" style="bottom:; !important;top:0"  title="~~replaceme_lenscamerainfo~~">',
         'post' :'</span>',
         'command' : 'prepend',
         'func' :  function($e,id,selec,exifUrl,res,defaultFunc){ 
             defaultFunc();
             //truncate title
             if($e.find('[findme]').width()+$e.find('a.title').width()+5>$e.width()){
                 $e.find('a.title').html('&nbsp;');
             }
         }
     }
    }     
];



//   {	'pages' : [/\/explore/,/\/photos\/.*/, /\/groups\/[^\/]*?\/$/ ],      
/*    'root' : 'div.photo-display-item[data-photo-id]',
     'id' : {
         'sel' : 'root', 
         'attr' :  'data-photo-id',
         'regex' : /(.*)/
     },
     'target' : {
         'sel' : 'div.meta > span.inline-icons',
         'insert' : '<span class="fave-count count" style="font-size:9px">~~replaceme~~</span>',
         'pre' : '',
         'post' :'',
         'command' : 'prepend'
     }
    }
    
    */


var loc=window.location.toString();
debug(loc,'location');
debug(loc.match(/\/groups\/$/));
var selec=null;
for(p=0;p<page_targets.length;p++){
    
    pt=page_targets[p];
    
    for(i=0;i<pt.pages.length;i++){
        page_reg=pt.pages[i];
        if(loc.match(page_reg)){
            selec=pt;
            break;
        }
    }
    if(selec){ break;;};
}

function make_exif_url(photo_id,user_id){
    if(user_id){
        url='/photos/'+user_id+'/'+photo_id+'/meta';
    }else{//no user id so fall back on less reliable link
        url='/photos/genie_in_a_lightbox/'+id+'/meta/';	
    }
    return url;
    
}

if(selec){
    
    debug(loc+ ' : '+selec.pages);
    
    //explore
    setInterval(function(){
        
        
        $(selec.root).not('[mouseover_added]').each(function(i,el){
            
            $e=$(el);
            
            $e.attr('mouseover_added',true);
            debug('mouse event attached');
            $e.one('mouseover',function($e,selec){  //attach mouseover event handler
                id=null;
                user_id=null;
                debug('mouse over');
                //if(!$e.attr('mouseenter_added')){
                
                if(selec.id.sel=='root'){ $img_id_el=$e; }else{ $img_id_el=$($e.find(selec.id.sel)[0]); };
                
                //extract it
                id=debug($img_id_el.attr(selec.id.attr).match(selec.id.regex)[1],'id');
                if(!id){return;};//the target is probably not legit, some random img ref we don't want
                
                if(selec.user_id){
                    if(selec.user_id.sel=='root'){ $user_id_el=$e; }else{ $user_id_el=$($e.find(selec.user_id.sel)[0]); };
                    user_id=debug($user_id_el.attr(selec.user_id.attr).match(selec.user_id.regex)[1],'user_id');
                }
                url=make_exif_url(id,user_id);
                
                
                debug(url,'httprequest');            
                GM_xmlhttpRequest({
                    method : 'GET',
                    url : url,               
                    onerror : function(res){ debug(res.responseText,'httpRequest onerror')},
                    onload : function ($e, id, selec, url,  res ) {
                        debug(url,'onload');
                        //debug(url);
                        try{
                            
                            
                            
                            if(!$e.attr('exif_fetched')){
                                
                                $e.attr('exif_fetched',true); 
                                //console.debug('xml:'+res.responseText);
                                // $('body').html( '<pre>'+$('<div>').text(res.responseText).html()+'</pre>');
                                regs=[
                                    [function(selec,defaultFunc){//inserts a title for full camera info
                                        var s='';
                                        regEx=/<th>Camera<\/th>[\s\S]*?<td>(?:<a.*?>)?(.*?)(?:<\/a>)?<\/td>/;
                                        units='';
                                        removeRegex=/Canon |Olympus |Fujifilm |Fuji |Sigma |Nokia |Apple |Casio |Sony |Panasonic |Pentax |Ricoh |Samsung |Nikon |EOS |Mark |Digital |Rebel | digital|leica camera ag |Leica ag |Leica |camera | camera|dslr-/i;
                                        s=defaultFunc(regEx,units,removeRegex);
                                        if(fl=res.responseText.match(regEx)){
                                           s=s.replace('placeholder1','title="'+fl[1]+'"');
                                    }
                                     return s;
                                     }],
                                    [/<th>ISO speed<\/th>[\s\S]*?<td>(\d{1,10})<\/td>/i,''],
                                    [/<th>Exposure<\/th>[\s\S]*?<td>.*?\(([\d\/]*?)\)<\/td>/,''] ,                           
                                    [/<th>Aperture<\/th>[\s\S]*?<td>(f\/[\d\.]{1,4})<\/td>/,'' ],
                                    [ function(selec,defaultFunc){ 
                                        var _35mmequiv='';
                                        var realFL='';
                                        var s='';
                                        //we fetch both focal lenths anyway
                                        if(fl=res.responseText.match(/<th>Focal Length<\/th>[\s\S]*?<td>([\d\.]{1,6})\s?mm<\/td>/)){
                                            realFL=add_acronym(fl[1],'-mm');                                                
                                        }
                                        if(fl=res.responseText.match(/<th>Focal Length \(35mm format\)<\/th>[\s\S]*?<td>([\d\.]{1,6})\s?mm<\/td>/)){
                                            _35mmequiv='('+add_acronym(fl[1],'-mm')+')';                                                
                                        }
                                        
                                        show35equiv=Config.get('show35mmequiv');
                                        showboth=Config.get('showboth');
                                        
                                        if(show35equiv && showboth){
                                            s=realFL+' '+_35mmequiv;
                                        }else if(show35equiv){
                                            if(!_35mmequiv){
                                                s=realFL;
                                            }else{
                                                s=_35mmequiv;
                                            }
                                        }else{
                                            s=realFL;
                                        }
                                        
                                        if(s=s.trim()){
                                            s=selec.target.insert.replace('~~replaceme~~',s.trim());
                                        }
                                        return s;
                                        //return defaultFunc(/<th>Focal Length<\/th>[\s\S]*?<td>([\d\.]{1,6})\s?mm<\/td>/,'-mm',null); 
                                        
                                    } 
                                    ],//[/<th>Focal Length<\/th>[\s\S]*?<td>([\d\.]{1,6})\s?mm<\/td>/, '-mm' ],
                                    [/<th>Exposure Bias<\/th>[\s\S]*?<td>(.{1,10}?) EV<\/td>/,'-ev'] 
                                ];
                                lens_camera_regs=[
                                    
                                    [/<th>Lens(?: Model)?<\/th>[\s\S]*?<td>(?:<a.*?>)?(.*?)(?:<\/a>)?<\/td>/,'']
                                ]
                                if(selec.target.sel=='root'){$target=$e;}else if( selec.target.sel=='parent'){ $target=$($e.parent()[0]); }else{$target=$($e.find(selec.target.sel)[0]); };
                                function defaultFunc(){
                                    str=''
                                    aurl='<a href="'+url+'" target="_flickr_exif">';//don't forget closing tag
                                    lens_camera_str=''
                                    for(var i=0;i<lens_camera_regs.length;i++){                                        
                                        if(fl=res.responseText.match(lens_camera_regs[i][0])){
                                            lens_camera_str= fl[1]+lens_camera_str;                
                                            
                                        }
                                    }  
                                    for(var i=0;i<regs.length;i++){
                                        exifVal='';
                                        var s='';
                                        function defaultExifExtract(regex,units,removeRegex){
                                            if(fl=res.responseText.match(regex)){
                                                var s=selec.target.insert.replace('~~replaceme~~',add_acronym(fl[1],units));
                                                if(removeRegex){//remove camera-make and other stuff, no loop to make it more obvious                                                    
                                                    s=s.replace(removeRegex,'');
                                                    s=s.replace(removeRegex,'');
                                                    s=s.replace(removeRegex,'');
                                                    s=s.replace(removeRegex,'');                                                
                                                }
                                            }
                                            
                                            return s;
                                        }//defaultExifExtract
                                        
                                        if(typeof(func=regs[i][0])=='function'){
                                            exifVal=func(selec,defaultExifExtract); 
                                            debug(exifVal,'function');
                                        }else{
                                            exifVal=defaultExifExtract(regs[i][0],regs[i][1],regs[i][2]);
                                            debug(escape(exifVal),regs[i][0]);
                                        }
                                        if(exifVal){
                                            str= aurl+ exifVal+'</a>'+str; 
                                        }
                                    }  
                                    //no exif stuff
                                    if(res.responseText.match(/this page is private/i)){ str=aurl+'no exif'+'</a>'; };
                                    if(str.trim()==''){ str=aurl+'exif fields not found</a>';}
                                    
                                    //insert lens string in to surrounding html (probably as a title attribute)
                                    newEl=$target[selec.target.command](selec.target.pre.replace('~~replaceme_lenscamerainfo~~',debug(lens_camera_str))+str.trim()+selec.target.post);
                                    
                                    //add events and styles if defined
                                    if(selec.target.event){
                                        debug('event attached');
                                        newEl=$(newEl).find('[findme]');
                                        $target.mouseover(selec.target.event.bind({},newEl))
                                    }
                                    if(selec.target.style){
                                        GM_addStyle(selec.target.style);
                                    }
                                    
                                    
                                }//defaultFunc
                                
                                if(selec.target.func){
                                    selec.target.func($e,id,selec,url,res,defaultFunc);
                                }else{
                                    defaultFunc();
                                }
                            }
                        }catch(err){
                            debug(err.message,'Exception in onload');
                        }
                        
                    }.bind({}, $e, id ,selec, url)//onload
            }); //GM_xml
            
            // }//if mouseenter
            
        }.bind({},$e,selec) ); 	 //mouseover
    });//selec root
    
},1000);//setinterval
};//if selec
