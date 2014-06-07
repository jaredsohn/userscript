// ==UserScript==
// @name           Flickr Fav Set
// @namespace      http://endflow.net/
// @description    Provides 'Set' feature for your favorites on Flickr.
// @include        http://www.flickr.com/photos/*/favorites/*
// @include        http://flickr.com/photos/*/favorites/*
// @resource       YUI_EVT_JS http://yui.yahooapis.com/2.6.0/build/event/event-min.js
// @resource       YUI_DD_JS http://yui.yahooapis.com/2.6.0/build/dragdrop/dragdrop-min.js
// @resource       YUI_SLDR_JS http://yui.yahooapis.com/2.6.0/build/slider/slider-min.js
// @resource       YUI_SLDR_CSS http://yui.yahooapis.com/2.6.0/build/slider/assets/skins/sam/slider.css
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.5
// @history {{{1
//  [2008-09-26] 0.1.0 first version
//  [2008-09-27] 0.1.1 supports AutoPagerize
//  [2008-09-28] 0.1.2 some bugfix and improvements
//  [2008-09-29] 0.1.3 supports Multilanguage (en & ja)
//  [2008-09-29] 0.1.4 add confing
//  [2008-09-29] 0.1.5 add default language
// @todo {{{1
//  *System
//   -[IMP] provide 2 import modes: 'override' and 'merge'
//   -[UTL] utility script to delete crashed favset data
//   -[FTR] (share favset on Wedata)
//  *FavSet Selector
//   -[BUG] crash FavSetSelector when it include long name favset. that is not fixed width.
//   -[IMP] show photo only included in favset if click favset again
//   -[IMP] optimize: updateMarker/scrollTo: store selected SPAN obj as member variable
//   -[NEW] arrange order of favset with dnd
//   -[BUG] (fix slider bug)
//   -[FTR] (multiple selection)
//  *FavSet Info
//   -[NEW] add username list under FavSetInfo (like 'Tag Cloud')
//   -[NEW] add 'Tag Cloud' under FavSetInfo
//  *Photo Selector
//   -[IMP] floating PhotoSelector same as FavSetInfo
//   -[IMP] optimize: PhotoSelector.updateCounter()
//   -[NEW] advanced search (tag or full-text, sort, date, not in favset)
//   -[FTR] (support 'tag autocomplete' in search box)
//  *Photo Deck
//   -[IMP] optimize: PhotoDeck.loadThumbnail: applyOverlay/updateCounter make it slowly
//   -[NEW] put 'tick marks' to the left side of PhotoDeck for counting num of photos
//   -[NEW] arrange order of photo with dnd
//  *Others
//   -[IMP] cleanup CSS: divide in some of section using folding marker.
//   -[NEW] provide 'Wide mode' for 1280x1024 or more large display
// }}}1

(function(){
if(document.title !== 'Your favorites on Flickr') return;

//// Config {{{1
var cfg = {
    lang:'en',      // UI language: 'en', 'ja'
    hide:true,      // hide default search box
    follow:true,    // FavSet Info panel follow page scroll
    num:{           // display num of photos like "FavSet#1 [18]"
        sel:false,  // in FavSet Selector
        dd:true     // in dropdown-list of Photo Selector
    }
}

//// I18N {{{1
var I18N = {
list:['en', 'ja'],
data:{
    // Common UI
    UI_SAVE:['SAVE', '保存'],
    UI_CANCEL:['CANCEL', 'キャンセル'],
    UI_NEW:['NEW', '作成'],
    UI_DELETE:['DELETE', '削除'],
    UI_EDIT:['EDIT', '編集'],
    UI_CLOSE:['CLOSE', '閉じる'],
    UI_OR:['OR', 'または'],
    UI_UNTITLED:['Untitled', '無題'],
    UI_GO:['GO', '検索'],
    UI_CLEAR:['CLEAR', 'クリア'],
    UI_IMPORT:['IMPORT', 'インポート'],
    UI_EXPORT:['EXPORT', 'エクスポート'],
    // Toolbar
    TB_DEL_CONFIRM:['Are you sure you want to delete?', '本当に削除してもよろしいですか？'],
    TB_DATA:['data', 'データ'],
    // FavSet Info
    FI_PHOTO:['%1 photos', '%1枚の写真'],
    FI_VIEW:['%1 views', '%1回の閲覧'],
    FI_PUBLIC:['Public', '公開'],
    FI_EDIT:['edit', '編集'],
    FI_UPDATE:['Updated on %1', '%1に更新'],
    FI_CREATE:['Created on %1', '%1に作成'],
    // Photo Selector
    PS_ALL:['All', '全て'],
    PS_NOT_IN_FS:['Not in a FavSet', 'FavSetに含まれない'],
    PS_YOUR_FS:['Your FavSets', 'あなたのFavSet'],
    PS_CNT_FAV:['<b>%1</b> favs', '全部で<b>%1</b>個のお気に入り'],
    PS_CNT_LOAD:['<b>%1</b> loaded', '<b>%1</b>個読み込み済'],
    PS_CNT_SHOW:['<b>%1</b> items', '<b>%1</b>個を表示'],
    PS_CNT_SEL:['<b>%1</b> selected', '<b>%1</b>個を選択'],
    PS_SEL_ALL:['Select all', '全て選択'],
    PS_CLR_ALL:['Clear selection', '選択を解除']
},
init:function(){
    var i = this.list.indexOf(cfg.lang);
    this.dict = {};
    for(var k in this.data) this.dict[k] = this.data[k][i] || this.data[k][0];
},
$:function(id){
    var str = this.dict[id];
    if(1 < arguments.length){
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        var len = args.length;
        for(var i = 0, k = 1; i < len; i++, k++){
            str = str.replace('%' + k, args[i]);
        }
    }
    return str;
}
}

//// Styles {{{1
GM_addStyle(<><![CDATA[
#Main.view #ffs_new, #Main.view #ffs_delete,
#Main.view #ffs_import, #Main.view #ffs_export { visibility: hidden; }
#Main.view #ffs_desc_edit, #Main.edit #ffs_desc_view,
#ffs_info.rename #ffs_info_title, #Main.view span.pc_s > div,
#ffs_msg_cont.ffs_confirm #ffs_msg_text, #ffs_msg_cont.ffs_message #ffs_msg_text,
#ffs_msg_cont.ffs_message #ffs_msg_ok, #ffs_msg_cont.ffs_message #ffs_msg_cancal,
#ffs_fs > #ffs_fs_mark, #favoriteThumbs > span.ffs_hidden,
#Main.view #ffs_ps_sel_cont { display: none; }
#Main.edit #ffs_new, #Main.edit #ffs_delete, #Main.edit #ffs_desc_edit,
#Main.view #ffs_desc_edit, #Main.edit #ffs_import, #Main.edit #ffs_export,
#Main.edit #ffs_ps_sel_cont { display: inline; }
#ffs_ui #ffs_status.ffs_mode_info .ffs_status_info,
#ffs_ui #ffs_status.ffs_mode_confirm .ffs_status_confirm,
#ffs_ui #ffs_status.ffs_mode_error .ffs_status_error,
#Main.edit span.pc_s > div, #ffs_info.rename #ffs_info_form,
#ffs_fs.selected > #ffs_fs_mark, #favoriteThumbs > span { display: block; }
#ffs_toolbar > p { position: relative; margin-bottom: 0; }
#ffs_import { margin-left: 20px; }
.ffs_separator {
    display: inline;
    height: 16px;
    width: 2px;
    background-color: #666666;
    margin: 0 6px;
}
#ffs_switch { position: absolute; right: 11px; top: 10px; }
#Main.view #ffs_switch {
    color: white;
    background-color: #0063DC;  /* flickr blue */
}
#ffs_fs { position: relative; overflow: hidden; margin-bottom: 6px; }
#ffs_fs_cont {
    position: absolute;
    top: 0;
    margin-top: 10px;
    width: 10700px;
}
#ffs_fs_mark { position: absolute; left: 7px; top: 2px; }
#ffs_fs_mark > img { display: block; }
#ffs_fs_cont > span { text-align: center; float: left; margin: 0 16px; }
#ffs_fs_cont > span > img { display: block; margin: 0 auto; cursor: pointer; }
#ffs_fs_cont > span > p {
    margin-top: -68px;
    padding: 0;
    color: #333;
    cursor: pointer;
}
#ffs_fs_slider {
    background-image:url('http://l.yimg.com/g/images/slider_bg.gif');
    background-position:0 4px;
    background-repeat:repeat-x;
    margin:0 6px;
    position:absolute;
    top:114px;
    width:788px;
}
.overlay {
    width: 800px;
    height: 130px;
    position: absolute;
    top: 0px;
    display: none;
}
#ffs_overlay { opacity: 0.75; background-color: white; }
#ffs_msg { text-align: center; padding-top: 40px; }
#ffs_msg_body { padding: 0 14px; }
#ffs_info { width: 280px; float: left; }
#ffs_info_cont { width: 280px; }
#ffs_cover {
    padding: 20px;
    text-align: center;
    background-color: #F3F3F3; /* flickr ui gray */
}
#ffs_cover > div { margin: -10px 0 10px; }
#ffs_cover > p { margin: 0; }
#ffs_cover > p > span.pc_m, #ffs_cover.loading > p > span.pc_m.photo_container { display: none; }
#ffs_cover > p > span.pc_m.photo_container, #ffs_cover.loading > p > span.pc_m { display: block; }
#ffs_cover > p > span > div { width: 240px; height: 180px; }
#ffs_cover > p > span > div > img { margin-top: 82px; }
#Main.edit #ffs_info_title:hover { background-color: #FFFFD3; }
#ffs_info_form {
    text-align: left;
    margin: 0 20px;
    padding: 2px 0;
    display: none;
    font-size: 12px;
}
#ffs_info_text {
    background-color: #FFFFD3;
    border-width: 1px;
    border-color: #E9E9AE;
    font-size: 14px;
    font-weight: bold;
    padding: 3px;
    margin-bottom: 5px;
    width: 240px;
}
#ffs_info_d {
    background-color: white;
    color: #999999;
    font-size: 11px;
    margin: 15px;
    padding: 5px;
}
#ffs_info_d > span { display: block; margin: 3px 0; }
#ffs_ps {
    position: relative;
    background-color: #F3F3F3;
    padding: 10px;
    margin: 0 0 3px 317px;
}
#ffs_ps > div { font-size: 11px; color: black; margin: 5px 0 -4px -2px; }
#ffs_ps > div > *, #ffs_ps > div > * > * { margin: 0 2px; }
.ffs_ps_button { cursor: pointer; color: #1057AE; text-decoration: underline; }
.ffs_ps_button:hover { color: white; }
#ffs_ps > #ffs_ps_msg {
    position: absolute;
    width: 483px;
    margin: 0;
    top: 70px;
    left: 0;
    text-align: center;
    display: none;
}
#ffs_ps_msg > span { color: #CCCCCC; font-size: 32px; }
#ffs_ps_msg.result > #ffs_ps_result,
#ffs_ps_msg.search > #ffs_ps_search { display: block; }
#ffs_ps_msg.search > #ffs_ps_result,
#ffs_ps_msg.result > #ffs_ps_search { display: none; }
#favoriteThumbs { margin-left: 317px; }
#Main.edit #ffs_switch, #ffs_info_cancel,
#ffs_ui #ffs_status.ffs_mode_info, #ffs_ps_clear,
#ffs_msg_cancal {
    color: #666666;                     /* dark gray */
    background-color: #DDDDDD;          /* light gray */
}
#ffs_ui #ffs_status { margin: 10px 0 0; padding: 4px 8px; text-align: center; }
#ffs_ui #ffs_status.ffs_mode_info span { margin: 0 8px; }
#ffs_ui #ffs_status.ffs_mode_confirm {
    color: #005A17;                     /* dark green */
    background-color: rgb(203,255,216); /* light green */
    font-weight: bold;
    font-size: 14px;
}
#ffs_ui #ffs_status.ffs_mode_error {
    color: #98002E;                     /* dark red */
    background-color: rgb(255,219,238); /* light red */
    font-weight: bold;
    font-size: 14px;
}
.pc_s > div { position: absolute; top: 0; width: 75px; height: 75px; }
.pc_s > div.ffs_selected {
    border: 3px solid rgb(255,0,132);   /* flickr red */
    width: 69px;
    height: 69px;
}
/* rgb(255,0,132); // red // rgb(0,99,220);  // blue // rgb(0,255,64);  // green */
]]></> + GM_getResourceText('YUI_SLDR_CSS'));

//// Global Variables {{{1
var w = this.unsafeWindow || window;
var Y = w.Y.util.Dom;
var main = $('Main');
var fav = $('favoriteThumbs');
var head = $X('//head');
head.appendChild($n('script', {innerHTML:
    GM_getResourceText('YUI_EVT_JS')+
    GM_getResourceText('YUI_DD_JS')+
    GM_getResourceText('YUI_SLDR_JS')
}));

//// Storage {{{1
var Storage = {
def_s:'http://farm4.static.flickr.com/3292/2911868500_1f7704b84f_s.jpg',
def_m:'http://farm4.static.flickr.com/3292/2911868500_1f7704b84f_m.jpg',
init:function(){
    if(!this.setRawData(GM_getValue('data'))) this.clear();
},
valid:function(){
    if(!isO(this.data) || !$h(this.data, ['favsets'])
        || !isA(this.data.favsets)) return false;
    this.data.favsets.forEach(function(favset){
        if(!$h(favset, ['name', 'create', 'update', 'photo', 'cover'])) return false;
        if(!isA(favset.photo) || !isO(favset.cover)) return false;
        if(!$h(favset.cover, ['src_s', 'src_m'])) return false;
    });
    return true;
},
save:function(){
    //! to avoid "Error: Greasemonkey access violation: unsafeWindow cannot call GM_setValue.",
    //! it has to use "setTimeout" function in this function call.
    setTimeout($b(this, function(){
        GM_setValue('data', this.data.toSource());
    }), 0);
},
clear:function(){
    this.data = {favsets:[]};
    this.index = {};
    this.save();
},
updateIndex:function(){
    this.index = {};
    this.data.favsets.forEach(function(favset, i){
        this.index[favset.name] = i;
    }, this);
},
getRawData:function(){ return GM_getValue('data') || ''; },
setRawData:function(data){
    if(!data || data == '') return false;
    try{
        this.data = eval(data);
    }catch(e){
        return false;
    }
    if(!this.valid()) return false;
    this.updateIndex();
    this.save();
    return true;
},
getFavSet:function(name){
    if(!this.existFavSet(name)) return null;
    return this.data.favsets[this.index[name]];
},
addFavSet:function(name, favset){
    if(this.existFavSet(name)) return false;
    var now = (new Date()).getTime().toString();
    favset = favset || {name:name, create:now, update:now, photo:[], cover: {src_s:this.def_s, src_m:this.def_m}};
    this.data.favsets.push(favset);
    this.updateIndex();
    this.save();
    Event.fire('onAddFavSet', name);
    return true;
},
removeFavSet:function(name){
    if(!this.existFavSet(name)) return false;
    var pos = this.index[name];
    this.data.favsets = this.data.favsets.slice(0, pos)
        .concat(this.data.favsets.slice(pos + 1));
    this.updateIndex();
    this.save();
    Event.fire('onRemoveFavSet', name);
    return true;
},
renameFavSet:function(oldName, newName){
    if(!this.existFavSet(oldName)) return false;
    if(this.existFavSet(newName)) return false;
    var set = this.getFavSet(oldName);
    set.name = newName;
    set.update = (new Date()).getTime().toString();
    this.updateIndex();
    this.save();
    Event.fire('onRenameFavSet', oldName, newName);
    Event.fire('onChangeFavSet', newName);
    return true;
},
existFavSet:function(name){ return $h(this.index, [name]); },
getNumFavSet:function(){ return this.data.favsets.length; },
getAllSetName:function(){ return this.data.favsets.map(function(fs){return fs.name}); },
addPhoto:function(name, urls, silent){
    var set = this.getFavSet(name);
    var num = set.photo.length;
    urls = isA(urls) ? urls : [urls];
    urls.forEach(function(url){
        url = url.replace('http://www.flickr.com', '');
        if(set.photo.indexOf(url) == -1){
            set.photo.push(url);
            set.update = (new Date()).getTime().toString();
        }
    }, this);
    if(num != set.photo.length && silent !== true){
        this.save();
        Event.fire('onChangeFavSet', name);
    }
},
removePhoto:function(name, urls){
    var set = this.getFavSet(name);
    var num = set.photo.length;
    urls = isA(urls) ? urls : [urls];
    urls.forEach(function(url){
        url = url.replace('http://www.flickr.com', '');
        var pos = set.photo.indexOf(url);
        if(pos != -1){
            set.photo = set.photo.slice(0, pos).concat(set.photo.slice(pos + 1));
            set.update = (new Date()).getTime().toString();
        }
    }, this);
    if(num != set.photo.length){
        this.save();
        Event.fire('onChangeFavSet', name);
    }
},
getAllPhoto:function(){
    var all = [];
    this.data.favsets.forEach(function(favset){
        all = all.concat(favset.photo.filter(function(url){
            return all.indexOf(url) == -1
        }));
    });
    return all;
},
setCoverPhoto:function(name, url){
    url = url.replace('http://www.flickr.com', '');
    var a = $X('id("favoriteThumbs")//a[contains(@href,"' + url + '")]');
    var set = this.getFavSet(name);
    set.cover.href = a.href;
    set.cover.src_s = a.firstChild.src;
    set.cover.src_m = a.firstChild.src.replace('_s.', '_m.');
    set.cover.alt = a.firstChild.alt;
    set.update = (new Date()).getTime().toString();
    this.addPhoto(name, url, true);
    this.save();
    Event.fire('onChangeFavSet', name);
}
};

//// Event {{{1
var Event = {
init:function(){
    head.appendChild($n('script', {innerHTML:<><![CDATA[
        if(!FFS) var FFS = {};
        if(!FFS.Event) FFS.Event = {};
        FFS.Event.onAddFavSet = new Y.util.CustomEvent('onAddFavSet');
        FFS.Event.onRemoveFavSet = new Y.util.CustomEvent('onRemoveFavSet');
        FFS.Event.onSelectFavSet = new Y.util.CustomEvent('onSelectFavSet');
        FFS.Event.onChangeFavSet = new Y.util.CustomEvent('onChangeFavSet');
        FFS.Event.onSelectPhoto = new Y.util.CustomEvent('onSelectPhoto');
        FFS.Event.onRenameFavSet = new Y.util.CustomEvent('onRenameFavSet');
        FFS.Event.onDropCoverPhoto =  new Y.util.CustomEvent('onDropCoverPhoto');
    ]]></>}));

    this.onAddFavSet = w.FFS.Event.onAddFavSet;
    this.onRemoveFavSet = w.FFS.Event.onRemoveFavSet;
    this.onSelectFavSet = w.FFS.Event.onSelectFavSet;
    this.onChangeFavSet = w.FFS.Event.onChangeFavSet;
    this.onSelectPhoto = w.FFS.Event.onSelectPhoto;
    this.onRenameFavSet = w.FFS.Event.onRenameFavSet;
    this.onDropCoverPhoto = w.FFS.Event.onDropCoverPhoto;
},
subs:function(type, callback){ this[type].subscribe(callback); },
fire:function(){
    var args = Array.prototype.slice.call(arguments);
    var type = args.shift();
    this[type].fire.apply(this[type], args);
}
};

//// Toolbar {{{1
var Toolbar = {
// init {{{2
init:function(){
    main.insertBefore($n('div', {id:'ffs_toolbar'}, [
      $n('p', {className:'Focus'}, [
        $n('b', {id:'ffs_desc_view', innerHTML:'Flickr Fav Set'}),
        $n('b', {id:'ffs_desc_edit', innerHTML:''}),
        $n('input', {id:'ffs_new', className:'Butt', type:'button', value:I18N.$('UI_NEW')}), $t(' '),
        $n('input', {id:'ffs_delete', className:'Butt', type:'button', value:I18N.$('UI_DELETE')}), $t(' '),
        $n('input', {id:'ffs_import', className:'Butt', type:'button', value:I18N.$('UI_IMPORT')}), $t(' '),
        $n('input', {id:'ffs_export', className:'Butt', type:'button', value:I18N.$('UI_EXPORT')}), $t(' '),
        $n('input', {id:'ffs_switch', className:'Butt', type:'button', value:I18N.$('UI_EDIT')})
    ])]), fav);
    Y.addClass(main, 'view');

    if(cfg.hide) {
        Y.setStyle($X('id("Main")/form'), 'display', 'none');
        GM_addStyle('#SubNav{margin-bottom:0;margin-top:10px;}');
    }

    this.toolbar = $('ffs_toolbar');
    this.btnSwitch = $('ffs_switch');
    this.btnNew = $('ffs_new');
    this.btnDelete = $('ffs_delete');
    this.btnImport = $('ffs_import');
    this.btnExport = $('ffs_export');

    this.onedit = $b(this, this.onedit);
    this.onnew = $b(this, this.onnew);
    this.ondelete = $b(this, this.ondelete);
    this.onimport = $b(this, this.onimport);
    this.onexport = $b(this, this.onexport);

    this.btnSwitch.addEventListener('click', this.onedit, false);
    this.btnNew.addEventListener('click', this.onnew, false);
    this.btnDelete.addEventListener('click', this.ondelete, false);
    this.btnImport.addEventListener('click', this.onimport, false);
    this.btnExport.addEventListener('click', this.onexport, false);
},
// DOM Operation {{{2
enableToolbar:function(bool){
    if(bool){
        Y.addClass(main, 'edit');
        Y.removeClass(main, 'view');
        this.btnSwitch.value = I18N.$('UI_CLOSE');
        PhotoDeck.updateDeck();
    }else{
        Y.removeClass(main, 'edit');
        Y.addClass(main, 'view');
        this.btnSwitch.value = I18N.$('UI_EDIT');
        PhotoSelector.updateCounter();
    }
    FavSetSelector.updateMessage();
},
isView:function(){return Y.hasClass(main, 'view')},
isEdit:function(){return Y.hasClass(main, 'edit')},
// Event Handler {{{2
onedit:function(){ this.enableToolbar(Y.hasClass(main, 'view')); },
onnew:function(){
    Storage.addFavSet(I18N.$('UI_UNTITLED'));
    FavSetSelector.fireSelectFavSet(I18N.$('UI_UNTITLED'));
    FavSetInfo.startRenameFavSet();
    FavSetSelector.scrollTo();
},
ondelete:function(){
    var name = FavSetSelector.selectedFavSet;
    if(!name || name == '') return;
    Msg.confirm(I18N.$('TB_DEL_CONFIRM'), $b(this, function(res){
        if(res) Storage.removeFavSet(name);
        if(FavSetInfo.isRenaming()) FavSetInfo.endRenameFavSet();
        return true;
    }));
},
onimport:function(){
    Msg.input(I18N.$('TB_DATA') + ' :', $b(this, function(res, value){
        if(res){
            if(!Storage.setRawData(value)) return false;
            w.location.reload();
            return true;
        }
    }), '');
},
onexport:function(){
    Msg.input(I18N.$('TB_DATA') + ' :', null, Storage.getRawData());
    return true;
}
};

//// FavSetSelector {{{1
var FavSetSelector = {
mark_src:'http://farm4.static.flickr.com/3137/2933968184_ee346cbcae_o.png',
width:800, height:130, max:751,
// init {{{2
init:function(){
    main.insertBefore($n('div', {id:'ffs_fs'}, [
      $n('canvas', {id:'ffs_fs_canvas', width:this.width, height:this.height}),
      $n('span', {id:'ffs_fs_mark'}, [
        $n('img', {src:this.mark_src}),
        $n('canvas', {width:93, height:83})
      ]),
      $n('div', {id:'ffs_fs_cont'}),
      $n('div', {id:'ffs_fs_slider'}, [
        $n('div', {id:'ffs_fs_thumb'}, [
            $n('img', {src:'http://l.yimg.com/g/images/findr_dragger_default.gif'})])])
    ]), fav);

    this.ui = $('ffs_fs');
    this.cont = $('ffs_fs_cont');
    this.mark = $('ffs_fs_mark');
    this.uiSlider = $('ffs_fs_slider');

    this.selectedFavSet = '';
    this.uiRgn = Y.getRegion(this.ui);

    this.onchangeslider = $b(this, this.onchangeslider);
    this.onaddfavset = $b(this, this.onaddfavset);
    this.onremovefavset = $b(this, this.onremovefavset);
    this.onrenamefavset = $b(this, this.onrenamefavset);
    this.onchangefavset = $b(this, this.onchangefavset);
    this.fireSelectFavSet = $b(this, this.fireSelectFavSet);

    Msg.init();

    head.appendChild($n('script', {innerHTML:$e(<><![CDATA[
        if(!FFS) var FFS = {};
        if(!FFS.UI) FFS.UI = {};
        FFS.UI.slider = new YAHOO.widget.Slider.getHorizSlider('ffs_fs_slider', 'ffs_fs_thumb', 0, #{max});
    ]]></>, {max:this.max})}));
    this.slider = w.FFS.UI.slider;
    this.slider.subscribe('change', this.onchangeslider);

    var gc = $('ffs_fs_canvas').getContext('2d');
    gc.fillStyle = 'rgb(249,249,249)';
    gc.fillRect(0, 0, this.width, this.height);
    var lgrad = gc.createLinearGradient(0, 0, 0, this.height);
    lgrad.addColorStop(0, 'rgb(249,249,249)');
    lgrad.addColorStop(0.5, 'rgb(249,249,249)');
    lgrad.addColorStop(1, 'rgb(220,220,220)');
    gc.fillStyle = lgrad;
    gc.fillRect(0, 0, this.width, this.height);

    this.drawReflection(this.mark_src, this.mark.lastChild.getContext('2d'), 93, 83);
    Storage.getAllSetName().forEach(function(name){
        this.addFavSet(name);
    }, this);
    this.updateSelector(true);

    this.cont.addEventListener('click', this.fireSelectFavSet, true);

    Event.subs('onAddFavSet', this.onaddfavset);
    Event.subs('onRemoveFavSet', this.onremovefavset);
    Event.subs('onRenameFavSet', this.onrenamefavset);
    Event.subs('onChangeFavSet', this.onchangefavset);
},
// DOM Operation {{{2
addFavSet:function(name){
    var set = Storage.getFavSet(name);
    var span = $n('span', {title:set.name}, [
        $n('img', {src:set.cover.src_s || '', alt:set.cover.alt}),
        $n('canvas', {width:'75', height:'75'}),
        $n('p', {innerHTML:this.formatFavSetName(set.name, cfg.num.sel)})
    ]);
    span.firstChild.addEventListener('click', this.fireSelectFavSet, false)
    span.lastChild.addEventListener('click', this.fireSelectFavSet, false)
    this.cont.appendChild(span);
    this.updateFavSet(name);
    this.updateSelector();
},
removeFavSet:function(name){
    if($X('//span[@title="' + name + '"]')){
        this.cont.removeChild($X.$);
        this.updateSelector();
        this.fireSelectFavSet('');
    }
},
renameFavSet:function(oldName, newName){
    if($X('//span[@title="' + oldName + '"]')){
        var span = $X.$;
        span.title = newName;
        span.lastChild.innerHTML = this.formatFavSetName(newName, cfg.num.sel);
        this.fireSelectFavSet(newName);
    }
},
updateFavSet:function(name){
    if($X('//span[@title="' + name + '"]')){
        var set = Storage.getFavSet(name);
        var span = $X.$;
        span.title = set.name;
        span.firstChild.src = set.cover.src_s;
        span.lastChild.innerHTML = this.formatFavSetName(set.name, cfg.num.sel);
        this.drawReflection(set.cover.src_s, span.firstChild.nextSibling.getContext('2d'), 75, 75);
    }
},
drawReflection:function(src, gc, width, height){
    var img = new Image();
    img.addEventListener('load', function(){
        // draw vertical-reversed image
        gc.clearRect(0, 0, width, height);
        gc.save();
        gc.translate(0, height);
        gc.scale(1, -1);
        gc.drawImage(img, 0, 0);
        gc.restore();
        // apply alpha
        gc.save();
        gc.globalCompositeOperation = 'destination-out';
        var lgrad = gc.createLinearGradient(0, 0, 0, height);
        lgrad.addColorStop(0, 'rgba(0,0,0,0.55)');
        lgrad.addColorStop(0.3, 'rgba(0,0,0,1)');
        lgrad.addColorStop(1, 'rgba(0,0,0,1)');
        gc.fillStyle = lgrad;
        gc.fillRect(0, 0, width, height);
        gc.restore();
    }, false);
    img.src = src;
},
formatFavSetName:function(name, bool){
    var set = Storage.getFavSet(name);
    return (bool && set) ? (name + ' [' + set.photo.length + ']') : name;
},
updateSelector:function(force){
    this.updateMessage();
    var cont_w = 107 * Storage.getNumFavSet();
    if(cont_w <= this.width){
        if(force || Y.getStyle(this.cont, 'left') !== '0px'){
            Y.setStyle(this.cont, 'left', '0px');
            Y.setStyle(this.uiSlider, 'visibility', 'hidden');
            this.slider.setValue(0, false, true, true);
        }
        this.updateMarker();
        return;
    }
    var rest = cont_w - this.width;
    var left = (rest / this.max) * this.slider.getValue();
    Y.setStyle(this.cont, 'left', '-' + left + 'px');
    Y.setStyle(this.uiSlider, 'visibility', '');
    this.updateMarker();
},
updateMarker:function(){
    if($X('id("ffs_fs_cont")/span[@title="' + this.selectedFavSet + '"]')){
        var left = Y.getRegion($X.$).left - this.uiRgn.left - 9; // '-9' is a offset of blur width
        Y.setStyle(this.mark, 'left', left + 'px');
    }
},
updateMessage:function(){
    if(Storage.getNumFavSet() == 0){
        setTimeout(function(){Msg.message('No FavSet')},0);
    }else{
        Msg.hide();
    }
},
scrollTo:function(name){
    name = name || this.selectedFavSet;
    if($X('id("ffs_fs_cont")/span[@title="' + name + '"]')){
        var cont_w = 107 * Storage.getNumFavSet();
        var fsRgn = Y.getRegion($X.$);
        if(cont_w <= this.width || this.uiRgn.contains(fsRgn)) return;
        var offset = 16; // margin width of SPAN elem
        var fsW = fsRgn.right - fsRgn.left;
        if(fsRgn.left < this.uiRgn.left){
            var diff = this.uiRgn.left - fsRgn.left + offset;
        }else{
            var diff = (this.uiRgn.right - fsW) - fsRgn.left - offset;
        }
        var left = parseFloat(Y.getStyle('ffs_fs_cont', 'left').replace('px', ''));
        Y.setStyle(this.cont, 'left', (left + diff) + 'px');
        this.updateSlider();
        this.updateMarker();
    }
},
updateSlider:function(){
    var cont_w = 107 * Storage.getNumFavSet();
    var rest = cont_w - this.width;
    var left = - parseInt(Y.getStyle('ffs_fs_cont', 'left').replace('px', ''));
    var value = Math.round((this.max / rest) * left);
    this.slider.setValue(value, false, true, true);
},
// Event Handler {{{2
fireSelectFavSet:function(e){
    if(isS(e)){
        this.selectedFavSet = e;
    }else{
        this.selectedFavSet = (e.target.nodeName == 'CANVAS' || e.target.nodeName == 'DIV')
                ? '' : e.target.parentNode.title;
        e.stopPropagation();
    }
    this.updateSelector();
    this.scrollTo();
    (this.selectedFavSet == '')
        ? Y.removeClass(this.ui, 'selected')
        : Y.addClass(this.ui, 'selected');
    Event.fire('onSelectFavSet', this.selectedFavSet);
},
onchangeslider:function(){ this.updateSelector(); },
onaddfavset:function(type, args){ this.addFavSet(args[0]); },
onremovefavset:function(type, args){ this.removeFavSet(args[0]); },
onrenamefavset:function(type, args){ this.renameFavSet(args[0], args[1]); },
onchangefavset:function(type, args){ this.updateFavSet(args[0]); }
//}}}2
};

//// Msg {{{1
var Msg = {
init:function(){
    this.overlay = $n('div', {id:'ffs_overlay', className:'overlay'});
    FavSetSelector.ui.appendChild(this.overlay);
    FavSetSelector.ui.appendChild($n('div', {id:'ffs_msg', className:'overlay'}, [
      $n('span', {id:'ffs_msg_cont'}, [
        $n('span', {id:'ffs_msg_body'}),
        $n('input', {id:'ffs_msg_text', type:'text', size:'40'}), $t(' '),
        $n('input', {id:'ffs_msg_ok', type:'button', className:'Butt', value:'OK'}), $t(' '),
        $n('input', {id:'ffs_msg_cancal', type:'button', className:'Butt', value:I18N.$('UI_CANCEL')})])]));

    this.uiCont = $('ffs_msg_cont');
    this.uiBody = $('ffs_msg');
    this.uiMsg = $('ffs_msg_body');
    this.uiText = $('ffs_msg_text');
    this.uiOK = $('ffs_msg_ok');
    this.uiCancel = $('ffs_msg_cancal');

    this.onclickok = $b(this, this.onclickok);
    this.onclickcancel = $b(this, this.onclickcancel);

    this.uiOK.addEventListener('click', this.onclickok, false);
    this.uiCancel.addEventListener('click', this.onclickcancel, false);
},
confirm:function(text, callback){
    if(this.isShow()) this.hide();
    this.callback = callback;
    Y.addClass(this.uiCont, 'ffs_confirm');
    this.show(text);
},
input:function(text, callback, value){
    if(this.isShow()) this.hide();
    this.callback = callback;
    Y.addClass(this.uiCont, 'ffs_input');
    this.show(text, value);
    this.uiText.focus();
    this.uiText.select();
},
message:function(text){
    if(this.isShow()) this.hide();
    Y.addClass(this.uiCont, 'ffs_message');
    this.show(text);
},
show:function(text, value){
    this.uiMsg.innerHTML = text;
    this.uiText.value = value || '';
    Y.setStyle(this.overlay, 'display', 'block');
    Y.setStyle(this.uiBody, 'display', 'block');
},
hide:function(){
    this.callback = null;
    this.uiMsg.innerHTML = '';
    this.uiText.value = '';
    this.uiCont.className = '';
    Y.setStyle(this.overlay, 'display', 'none');
    Y.setStyle(this.uiBody, 'display', 'none');
},
isShow:function(){
    return Y.hasClass(this.uiCont, 'ffs_confirm')
        || Y.hasClass(this.uiCont, 'ffs_input')
        || Y.hasClass(this.uiCont, 'ffs_message');
},
onclickok:function(){
    if(this.callback){
        if(this.callback(true, this.uiText.value)){
            this.callback = null;
            this.hide();
        }else{
            this.uiText.focus();
            this.uiText.select();
        }
    }else{
        this.hide();
    }
},
onclickcancel:function(){
    if(this.callback){
        this.callback(false, this.uiText.value);
        this.callback = null;
    }
    FavSetSelector.updateMessage();
}
};

//// FavSetInfo {{{1
var FavSetInfo = {
// init {{{2
init:function(){
    main.insertBefore($n('div', {id:'ffs_info'}, [
      $n('div', {id:'ffs_info_cont'}, [
        $n('div', {id:'ffs_cover'}, [
          $n('div', {id:'ffs_info_title', innerHTML:''}),
          $n('div', {id:'ffs_info_form'}, [
            $n('input', {id:'ffs_info_text', type:'text'}), $n('br'),
            $n('input', {id:'ffs_info_ok', type:'button', className:'Butt', value:I18N.$('UI_SAVE')}),
            $t('  '), $n('span', {innerHTML:I18N.$('UI_OR')}), $t('  '),
            $n('input', {id:'ffs_info_cancel', type:'button', className:'Butt', value:I18N.$('UI_CANCEL')}),
          ]),
          $n('p', null, [
            $n('span', {className:'photo_container pc_m'}, [
              $n('a', {id:'ffs_cover_a', href:''}, [
                $n('img', {id:'ffs_cover_img', src:Storage.def_m})])]),
            $n('span', {className:'pc_m'}, [
              $n('div', null, [
                $n('img', {src:'http://l.yimg.com/g/images/progress/balls-16x16-trans.gif'})])])])]),
        $n('div', {id:'ffs_info_d'}, [
          $n('span', null, [
            $n('span', {id:'ffs_info_num', innerHTML:I18N.$('FI_PHOTO', 0)}), $t(' | '),
            $n('span', {innerHTML:I18N.$('FI_VIEW', 0)}), $t(' | '),
            $n('span', {innerHTML:I18N.$('FI_PUBLIC') + '(' + I18N.$('FI_EDIT') + ')'})]),
          $n('span', null, [
            $n('span', {id:'ffs_info_updated', innerHTML:I18N.$('FI_UPDATE', '-')}), $t(' | '),
            $n('span', {id:'ffs_info_created', innerHTML:I18N.$('FI_CREATE', '-')})])])])]), fav);

    this.ui = $('ffs_info');
    this.cont = $('ffs_info_cont');
    this.infoTitle = $('ffs_info_title');
    this.cover = $('ffs_cover');
    this.coverAnchor = $('ffs_cover_a');
    this.coverImg = $('ffs_cover_img');
    this.infoNum = $('ffs_info_num');
    this.infoUpdated = $('ffs_info_updated');
    this.infoCreated = $('ffs_info_created');
    this.infoOK = $('ffs_info_ok');
    this.infoCancel = $('ffs_info_cancel');
    this.infoText = $('ffs_info_text');

    this.offset = 6;
    this.loading = false;
    this.it = Y.getRegion(this.cont).top;

    this.ondropcoverphoto = $b(this, this.ondropcoverphoto);
    this.oncommonfavset = $b(this, this.oncommonfavset);
    this.onremovefavset = $b(this, this.onremovefavset);
    this.onkeyup = $b(this, this.onkeyup);
    this.onscroll = $b(this, this.onscroll);
    this.onloadcoverphoto = $b(this, this.onloadcoverphoto);
    this.updateFavSetInfo = $b(this, this.updateFavSetInfo);
    this.startRenameFavSet = $b(this, this.startRenameFavSet);
    this.endRenameFavSet = $b(this, this.endRenameFavSet);
    this.doRename = $b(this, this.doRename);

    // drag & drop for changing cover photo
    head.appendChild($n('script', {innerHTML:<><![CDATA[
        if(!FFS) var FFS = {};
        if(!FFS.DD) FFS.DD = {};
        FFS.DD.target = new Y.util.DDTarget("ffs_cover");
        FFS.DD.photo = [];
    ]]></>}));
    main.appendChild($n('img', {id:'ffs_dd_proxy'}));
    w.FFS.Event.onDropCoverPhoto.subscribe(this.ondropcoverphoto);

    this.infoTitle.addEventListener('click', this.startRenameFavSet, false)
    this.infoOK.addEventListener('click', this.doRename, false)
    this.infoCancel.addEventListener('click', this.endRenameFavSet, false)
    this.infoText.addEventListener('keyup', this.onkeyup, false)
    if(cfg.follow) w.addEventListener('scroll', this.onscroll, false);
    this.coverImg.addEventListener('load', this.onloadcoverphoto, false);

    Event.subs('onSelectFavSet', this.oncommonfavset);
    Event.subs('onChangeFavSet', this.oncommonfavset);
    Event.subs('onAddFavSet', this.oncommonfavset);
    Event.subs('onRemoveFavSet', this.onremovefavset);
},
// DOM Operation {{{2
updateFavSetInfo:function(name){
    var set = Storage.getFavSet(name);
    if(!set){ this.clearFavSetInfo(); return; }

    this.infoTitle.innerHTML = set.name;
    this.infoNum.innerHTML = I18N.$('FI_PHOTO', set.photo.length);
    this.infoUpdated.innerHTML = I18N.$('FI_UPDATE', fmtD(set.update));
    this.infoCreated.innerHTML = I18N.$('FI_CREATE', fmtD(set.create));
    this.coverAnchor.href = set.cover.href;
    this.coverAnchor.title = set.cover.alt;
    this.coverImg.src = set.cover.src_m;
    this.coverImg.alt = set.cover.alt;

    this.loading = true;
    setTimeout($b(this, function(){
        if(this.loading) Y.addClass(this.cover, 'loading');
    }), 200);
},
clearFavSetInfo:function(){
    this.infoTitle.innerHTML = '';
    this.infoNum.innerHTML = I18N.$('FI_PHOTO', 0);
    this.infoUpdated.innerHTML = I18N.$('FI_UPDATE', '-');
    this.infoCreated.innerHTML = I18N.$('FI_CREATE', '-');
    this.coverAnchor.href = '#';
    this.coverAnchor.title = '';
    this.coverImg.src = Storage.def_m;
    this.coverImg.alt = '';
},
startRenameFavSet:function(){
    if(!Y.hasClass(main, 'edit')) return;
    Y.addClass(this.ui, 'rename');
    this.infoText.value = this.infoTitle.innerHTML;
    this.infoText.focus();
    this.infoText.select();
},
endRenameFavSet:function(){
    Y.removeClass(this.ui, 'rename');
    this.infoText.value = '';
    var set = Storage.getFavSet(FavSetSelector.selectedFavSet);
    if(set && set.name == I18N.$('UI_UNTITLED') && set.photo.length == 0 &&
            set.cover.src_s == Storage.def_s && set.cover.src_m == Storage.def_m){
        Storage.removeFavSet(I18N.$('UI_UNTITLED'));
    }
},
isRenaming:function(){ return Y.hasClass(this.ui, 'rename'); },
enableFloat:function(bool){
    if(arguments.callee.prev == bool) return;
    if(bool){
        var r = Y.getRegion(this.cont);
        Y.setStyle(this.ui, 'height', r.bottom - r.top);
        Y.setStyle(this.cont, 'position', 'fixed');
        Y.setStyle(this.cont, 'top', this.offset + 'px');
    }else{
        Y.setStyle(this.cont, 'position', '');
        Y.setStyle(this.cont, 'top', '');
        Y.setStyle(this.ui, 'height', '');
    }
    arguments.callee.prev = bool;
},
// Logic {{{2
doRename:function(){
    var newName = this.infoText.value;
    if(!newName || newName == '' || newName == I18N.$('UI_UNTITLED')){
        this.infoText.focus();
        this.infoText.select();
        return;
    }
    var oldName = FavSetSelector.selectedFavSet;
    if(!Storage.renameFavSet(oldName, newName)){
        this.infoText.focus();
        this.infoText.select();
        return;
    }
    this.endRenameFavSet();
    return true;
},
doChangeCoverPhoto:function(url){
    var name = FavSetSelector.selectedFavSet;
    if(!name || name == '') return;
    Storage.setCoverPhoto(name, url);
    PhotoDeck.updateDeck();
},
// Event Handler {{{2
ondropcoverphoto:function(type, args){ this.doChangeCoverPhoto(args[0]); },
oncommonfavset:function(type, args){ this.updateFavSetInfo(args[0]); },
onremovefavset:function(type, args){ this.updateFavSetInfo(); },
onscroll:function(){ this.enableFloat(this.it - this.offset < Y.getDocumentScrollTop(w.document)); },
onkeyup:function(e){
    switch(e.keyCode){
        case e.DOM_VK_RETURN: this.doRename(); break;
        case e.DOM_VK_ESCAPE: this.endRenameFavSet(); break;
    }
},
onloadcoverphoto:function(e){
    if(this.loading) this.loading = false;
    if(Y.hasClass(this.cover, 'loading')) Y.removeClass(this.cover, 'loading');
}
};

//// PhotoDeck {{{1
var PhotoDeck = {
// init {{{2
init:function(){
    this.onfetch = $b(this, this.onfetch);
    this.onselectphoto = $b(this, this.onselectphoto);
    this.onselectfavset = $b(this, this.onselectfavset);
    this.onloadphotoinfo = $b(this, this.onloadphotoinfo);
    this.fireSelectPhoto = $b(this, this.fireSelectPhoto);

    // AutoPagerize
    $b(this, function(callback, count){
        count = count || 4;
        if(window.AutoPagerize && window.AutoPagerize.addFilter){
            window.AutoPagerize.addFilter(callback);
        }else if (0 < count) {
            setTimeout(arguments.callee, 1000, callback, count - 1);
        }
    })(this.onfetch);

    Event.subs('onSelectPhoto', this.onselectphoto);
    Event.subs('onSelectFavSet', this.onselectfavset);

    this.cleanup();
    this.applyOverlay();
},
// DOM Operation {{{2
cleanup:function(){
    this.clearfix = $X('id("favoriteThumbs")/div[@class="clearfix"]');
    this.clearfix.id = 'clearfix';
    $x('id("Main")/div/p[not(@class)]').forEach(function(e){e.parentNode.removeChild(e)});
    $x('//a[@class="autopagerize_link"]/..').forEach(function(e){e.parentNode.removeChild(e)});
    var hrs = document.getElementsByTagName('hr');
    for(var i = 0; i < hrs.length; i++) hrs[i].parentNode.removeChild(hrs[i]);
},
applyOverlay:function(){
    this.ddc = this.ddc || 0;
    var script = '';
    $x('//span[contains(concat(" ",@class," ")," pc_s ") and not(child::div)]').forEach(function(span, i){
        var anchor = span.firstChild;
        var overlay = $n('div', {id:'ffs_photo_' + this.ddc, title:anchor.title});
        overlay.addEventListener('click', this.fireSelectPhoto, false);
        span.appendChild(overlay);
        script += $e(<><![CDATA[
            FFS.DD.photo[#{this.ddc}] = new Y.util.DDProxy('ffs_photo_#{this.ddc}', 'default', {dragElId:'ffs_dd_proxy'});
            FFS.DD.photo[#{this.ddc}].startDrag = function(){
                Y.util.Dom.setStyle(this.getDragEl(), 'opacity', 0.5);
                this.startPos = Y.util.Dom.getXY(this.getEl());
                Y.util.Dom.get('ffs_dd_proxy').src = this.getEl().parentNode.firstChild.firstChild.src;
            };
            FFS.DD.photo[#{this.ddc}].onDragDrop = function(e, id){
                if(id == 'ffs_cover'){
                    FFS.Event.onDropCoverPhoto.fire(this.getEl().parentNode.firstChild.href);
                }
            };
            FFS.DD.photo[#{this.ddc}].endDrag = function(){
                Y.util.Dom.setStyle(this.getDragEl(), 'opacity', 1);
                Y.util.Dom.setXY(this.getEl(), this.startPos);
            };
        ]]></>, {'this.ddc':this.ddc});
        this.ddc++;
    }, this);
    head.appendChild($n('script', {innerHTML:script}));
},
updateDeck:function(){
    //! use delayed call for quick UI response. this function is too slow
    setTimeout($b(this, function(){
    var urls = [];
    var fsName = FavSetSelector.selectedFavSet;
    var psName = PhotoSelector.getSelected();
    // show & hide photos on deck
    if(fsName && fsName != ''){
        var fsSet = Storage.getFavSet(fsName).photo;
        switch(psName){
            case PhotoSelector.ALL:
                urls = Toolbar.isEdit() ? unionA(this.getAllPhoto(), fsSet) : fsSet;
                break;
            case PhotoSelector.NOT_IN_FAVSET: break;
            default:
                var psSet = Storage.getFavSet(psName).photo;
                urls = (fsName == psName) ? fsSet : interA(fsSet, psSet);
        }
    }else{
        switch(psName){
            case PhotoSelector.ALL: urls = this.getAllPhoto(); break;
            case PhotoSelector.NOT_IN_FAVSET:
                urls = diffA(this.getAllPhoto(), Storage.getAllPhoto());
                break;
            default: urls = Storage.getFavSet(psName).photo;
        }
    }
    this.hideAllPhoto();
    urls.forEach(function(url){this.showPhoto(url)}, this);
    // show & hide selection mark
    if(Toolbar.isEdit()){
        var anchors = $x('//span[contains(concat(" ",@class," ")," pc_s ")]/a');
        var set = Storage.getFavSet(FavSetSelector.selectedFavSet);
        if(set){
            anchors.forEach(function(a){
                url = a.href.replace('http://www.flickr.com', '');
                (set.photo.indexOf(url) != -1)
                    ? Y.addClass(a.nextSibling, 'ffs_selected')
                    : Y.removeClass(a.nextSibling, 'ffs_selected');
            });
        }else{
            anchors.forEach(function(a){
                Y.removeClass(a.nextSibling, 'ffs_selected');
            });
        }
    }
    this.sortDeck();
    PhotoSelector.updateCounter();
    }),0);
},
sortDeck:function(){
    if(Toolbar.isView() || FavSetSelector.selectedFavSet == PhotoSelector.getSelected()) return;
    var ref = Y.getFirstChild('favoriteThumbs');
    $x('id("favoriteThumbs")/span[child::div[@class="ffs_selected"]]').forEach(function(span){
        span.parentNode.insertBefore(span, ref);
    });
},
getAllPhoto:function(){
    return $x('//span[contains(concat(" ",@class," ")," pc_s ")]/a')
        .map(function(a){return a.href.replace('http://www.flickr.com', '')});
},
allPhoto:function(bool){
    $x('//span[contains(concat(" ",@class," ")," pc_s ")]').forEach(function(span){
        if(bool){
            Y.removeClass(span, 'ffs_hidden');
        }else{
            Y.addClass(span, 'ffs_hidden');
        }
    });
},
showAllPhoto:function(){this.allPhoto(true)},
hideAllPhoto:function(){this.allPhoto(false)},
showPhoto:function(url){
    url = url.replace('http://www.flickr.com', '');
    if($X('//span[contains(concat(" ",@class," ")," pc_s ") and child::a[contains(@href,"' + url + '")]]')){
        Y.removeClass($X.$, 'ffs_hidden');
    }else{
        var photo_id = url.match(/\/(\d+)\//)[1];
        w.F.API.callMethod('flickr.photos.getInfo', {
            photo_id:photo_id, format:'json'
        }, {flickr_photos_getInfo_onLoad:this.onloadphotoinfo});
    }
},
loadThumbnail:function(title, href, src){
    Y.insertBefore($n('span', {className:'photo_container pc_s'}, [
        $n('a', {title:title, href:href}, [
            $n('img', {className:'pc_img', width:'75', height:'75', alt:title, src:src})
        ])
    ]), 'clearfix');
    this.applyOverlay();
    PhotoSelector.updateCounter();
},
// Event Handler {{{2
fireSelectPhoto:function(e){ Event.fire('onSelectPhoto', e.target, !Y.hasClass(e.target, 'ffs_selected')); },
onfetch:function(nodes){
    this.cleanup();
    $x('id("Main")/div/div[@class="clearfix"]').forEach(function(e){e.parentNode.removeChild(e)});
    var divs = $x('//span[contains(concat(" ",@class," ")," pc_s ")]/..');
    var firstDiv = divs.shift();
    var loaded = toA(firstDiv.childNodes).filter(function(e){
        return e.nodeType == 1 && e.nodeName == 'SPAN';
    }).map(function(e){return e.firstChild.href});
    divs.forEach(function(div){
        toA(div.childNodes).forEach(function(span){
            if(span.nodeType == 1 && span.nodeName == 'SPAN' &&
              loaded.indexOf(span.firstChild.href) == -1){
                firstDiv.appendChild(span);
            }
        });
        div.parentNode.removeChild(div);
    });
    firstDiv.appendChild($n('div', {id:'clearfix', className:'clearfix'}));
    this.applyOverlay();
    this.updateDeck();
},
onselectphoto:function(type, args){
    var url = args[0].previousSibling.href;
    var name = FavSetSelector.selectedFavSet;
    if(args[1]){
        Y.addClass(args[0], 'ffs_selected');
        (name && name != '') && Storage.addPhoto(name, url);
    }else{
        Y.removeClass(args[0], 'ffs_selected');
        (name && name != '') && Storage.removePhoto(name, url);
    }
    PhotoSelector.updateCounter();
},
onselectfavset:function(type, args){ this.updateDeck(); },
onloadphotoinfo:function(s, rx, rt){
    var p = eval(rt.replace(/jsonFlickrApi/, '')).photo;
    var title = p.title._content + ' by ' + p.owner.username;
    var href = p.urls.url[0]._content;
    var src = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_s.jpg';
    this.loadThumbnail(title, href, src);
}
//}}}2
};

//// PhotoSelector {{{1
var PhotoSelector = {
ALL:'ffs_all', NOT_IN_FAVSET:'ffs_not_in_favset',
// init {{{2
init:function(){
    main.insertBefore($n('div',{id:'ffs_ps'}, [
      $n('select', {id:'ffs_ps_select'}, [
        $n('option', {value:this.ALL, innerHTML:I18N.$('PS_ALL')}),
        $n('option', {value:this.NOT_IN_FAVSET, innerHTML:I18N.$('PS_NOT_IN_FS')}),
        $n('optgroup', {id:'ffs_ps_favset', label:I18N.$('PS_YOUR_FS')})
      ]), $t(' '),
      $n('input', {id:'ffs_ps_text', type:'text', size:'30'}), $t(' '),
      $n('input', {id:'ffs_ps_go', className:'Butt', type:'button', value:I18N.$('UI_GO')}), $t(' '),
      $n('input', {id:'ffs_ps_clear', className:'Butt', type:'button', value:I18N.$('UI_CLEAR')}),
      $n('div', null, [
        $n('span', {id:'ffs_ps_show', innerHTML:I18N.$('PS_CNT_SHOW', 0)}), $n('b', {innerHTML:'::'}),
        $n('span', {id:'ffs_ps_load', innerHTML:I18N.$('PS_CNT_LOAD', 0)}), $n('b', {innerHTML:'::'}),
        $n('span', {id:'ffs_ps_fav', innerHTML:I18N.$('PS_CNT_FAV', $X('//div[@class="Results"]')
            .innerHTML.match(/[\d,]+/)[0].replace(',', ''))}),
        $n('span', {id:'ffs_ps_sel_cont'}, [
          $n('b', {innerHTML:'::'}),
          $n('span', {id:'ffs_ps_sel', innerHTML:I18N.$('PS_CNT_SEL', 0)}), $n('span', {innerHTML:'|'}),
          $n('a', {id:'ffs_ps_selall', className:'ffs_ps_button', innerHTML:I18N.$('PS_SEL_ALL')}), $n('span', {innerHTML:'|'}),
          $n('a', {id:'ffs_ps_clrall', className:'ffs_ps_button', innerHTML:I18N.$('PS_CLR_ALL')})
        ])
      ]),
      $n('div', {id:'ffs_ps_msg'}, [
        $n('span', {id:'ffs_ps_result', innerHTML:'No matches'}),
        $n('span', {id:'ffs_ps_search'}, [$n('img', {src:'http://l.yimg.com/g/images/progress/balls-16x16-trans.gif'})])
      ])
    ]), fav);

    this.ui = $('ffs_ps');
    this.uiSelect = $('ffs_ps_select');
    this.uiFavSets = $('ffs_ps_favset');
    this.uiText = $('ffs_ps_text');
    this.uiSearch = $('ffs_ps_go');
    this.uiClear = $('ffs_ps_clear');
    this.cntLoad = $('ffs_ps_load');
    this.cntShow = $('ffs_ps_show');
    this.cntSel = $('ffs_ps_sel');
    this.uiSelAll = $('ffs_ps_selall');
    this.uiClrAll = $('ffs_ps_clrall');
    this.uiMsg = $('ffs_ps_msg');

    this.onclicksearch = $b(this, this.onclicksearch);
    this.onclickclear = $b(this, this.onclickclear);
    this.onkeyuptext = $b(this, this.onkeyuptext);
    this.onchangeselect = $b(this, this.onchangeselect);
    this.oncommonfavset = $b(this, this.oncommonfavset);
    this.onclickselall = $b(this, this.onclickselall);
    this.onclickclrall = $b(this, this.onclickclrall);

    this.uiText.addEventListener('keyup', this.onkeyuptext, false);
    this.uiSearch.addEventListener('click', this.onclicksearch, false);
    this.uiClear.addEventListener('click', this.onclickclear, false);
    this.uiSelect.addEventListener('change', this.onchangeselect, false);
    this.uiSelAll.addEventListener('click', this.onclickselall, false);
    this.uiClrAll.addEventListener('click', this.onclickclrall, false);

    Event.subs('onAddFavSet', this.oncommonfavset);
    Event.subs('onRemoveFavSet', this.oncommonfavset);
    Event.subs('onRenameFavSet', this.oncommonfavset);

    this.updateList();
    this.updateCounter();
},
// DOM Operation {{{2
updateList:function(){
    this.uiFavSets.innerHTML = '';
    Storage.getAllSetName().forEach(function(name){
        this.uiFavSets.appendChild($n('option',{value:name
            , innerHTML:FavSetSelector.formatFavSetName(name, cfg.num.dd)}));
    }, this);
},
updateCounter:function(){
    this.cntShow.innerHTML = I18N.$('PS_CNT_SHOW', $x('id("favoriteThumbs")/span[not(contains(concat(" ",@class," ")," ffs_hidden "))]').length);
    this.cntSel.innerHTML = I18N.$('PS_CNT_SEL', $x('id("favoriteThumbs")/span/div[contains(concat(" ",@class," ")," ffs_selected ")]').length);
    this.cntLoad.innerHTML = I18N.$('PS_CNT_LOAD', $x('id("favoriteThumbs")/span[contains(concat(" ",@class," ")," pc_s ")]').length);
},
search:function(keyword, options){
    keyword = keyword.replace(' ', '+');
    GM_xmlhttpRequest({
        method:'GET', url:'http://www.flickr.com/search/?w=faves&q='+keyword,
        onload:$b(this, function(r){
            var html = r.responseText.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html.*?>/, '');
            var doc  = document.implementation.createDocument(null, 'html', null);
            var range = document.createRange();
            range.setStartAfter(document.body);
            var fragment = range.createContextualFragment(html);
            try{
                fragment = doc.adoptNode(fragment);
            }catch(e){
                fragment = doc.importNode(fragment, true);
            }
            doc.documentElement.appendChild(fragment);

            var cnt = 0;
            $x('//span[@class="photo_container pc_m"]/a', doc).forEach(function(a){
                PhotoDeck.showPhoto(a.href);
                cnt++;
            });
            this.enableMsg(cnt === 0, 'result');
            this.updateCounter();
        }),
        onerror:function(r){console.log('ERROR:\n'+r.responseText)}
    });
    this.enableMsg(true, 'search');
    PhotoDeck.hideAllPhoto();
},
getSelected:function(){ return this.uiSelect.value; },
enableMsg:function(bool, id){
    if(bool){
        this.uiMsg.className = '';
        Y.addClass(this.uiMsg, id);
        Y.setStyle(this.uiMsg, 'display', 'block');
    }else{
        Y.setStyle(this.uiMsg, 'display', 'none');
    }
},
// Event Handler {{{2
onclicksearch:function(){ if(this.uiText.value != '') this.search(this.uiText.value); },
onclickclear:function(){
    this.uiText.value = '';
    this.uiSelect.value = this.ALL;
    this.enableMsg(false);
    PhotoDeck.updateDeck();
},
onkeyuptext:function(e){
    switch(e.keyCode){
        case e.DOM_VK_RETURN: this.onclicksearch(); break;
        case e.DOM_VK_ESCAPE:
            this.uiText.value = '';
            PhotoDeck.updateDeck();
            break;
    }
},
onchangeselect:function(){ PhotoDeck.updateDeck(); },
oncommonfavset:function(){ this.updateList(); },
onclickselall:function(){
    var urls = $x('id("favoriteThumbs")/span[not(contains(concat(" ",@class," ")," ffs_hidden "))]').map(function(span){
        Y.addClass(span.lastChild, 'ffs_selected');
        return span.firstChild.href;
    });
    var name = FavSetSelector.selectedFavSet;
    if(name != '' && urls.length != 0){
        Storage.addPhoto(name, urls);
    }
    this.updateCounter();
},
onclickclrall:function(){
    var urls = $x('id("favoriteThumbs")/span[not(contains(concat(" ",@class," ")," ffs_hidden "))]').map(function(span){
        Y.removeClass(span.lastChild, 'ffs_selected');
        return span.firstChild.href;
    });
    var name = FavSetSelector.selectedFavSet;
    if(name != '' && urls.length != 0){
        Storage.removePhoto(name, urls);
    }
    this.updateCounter();
}
};

//// Main {{{1
Storage.init();
I18N.init();
Event.init();
Toolbar.init();
FavSetSelector.init();
FavSetInfo.init();
PhotoSelector.init();
PhotoDeck.init();

GM_registerMenuCommand('Flickr Fav Set - Clear Data', $b(Storage, Storage.clear));

//// Utils {{{1
function $x(x,c){c=c||document;var d=c.ownerDocument||c;
var r=d.evaluate(x,c,null,4,null);for(var i,n=[];i=r.iterateNext();n.push(i));return n}
function $X(x,c){var e=$x(x,c)[0];e&&(arguments.callee.$=e);return e}
function $n(t,o,c){var e = document.createElement(t);if(o){for(var k in o)
{e[k]=o[k]}}if(c){c.forEach(function(ch){e.appendChild(ch)})}return e}
function $t(t){return document.createTextNode(t)}
function $(id){return document.getElementById(id)}
function $b(o,f){return function(){return f.apply(o,arguments)}}
function $e(t,o){t=t.toString();for(var k in o){t=t.replace(new RegExp('#{'+k+'}','g'),o[k])}return t}
function $h(o,a){if(a.length==0)return false;return a.every(function(p){return o.hasOwnProperty(p)})}
function isO(o){return o.constructor.toString()==Object.toString()}
function isA(a){return a.constructor.toString()==Array.toString()}
function isS(s){return (typeof s)=='string'}
function diffA(a,b){b.forEach(function(i){var p=a.indexOf(i);
if(p!=-1){a=a.slice(0,p).concat(a.slice(p+1))}});return a}
function interA(a,b){return a.filter(function(i){return b.indexOf(i)!=-1})}
function unionA(a,b){(a.length<b.length)&&([a,b]=[b,a]);
b.forEach(function(i){(a.indexOf(i)==-1)&&(a.push(i))});return a}
function toA(o){for(var i=0,a=[];i<o.length;a.push(o[i]),i++);return a}
function pdg(s){s=s.toString();if(s.length<2){s='0'+s}return s}
function fmtD(d){d=new Date(parseInt(d));return d.getFullYear()
+'.'+pdg(d.getMonth()+1)+'.'+pdg(d.getDate())}
// }}}1

})();
// vim:set foldmethod=marker:
