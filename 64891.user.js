// ==UserScript==
// @name           Lithuanian Dating Script
// @namespace      http://arturaz.net
// @description    Script for extending dating sites (point.lt, ieskok.lt, hotnot.lt) with status functionality.
// @version        1.1.1
// @include        http://*.point.lt/*
// @include        http://*.ieskok.lt/*
// @include        http://www.hotnot.lt/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// Skeleton handler object. Use this to make your own handlers.
// All methods in this handler MUST BE IMPLEMENTED!
function SkeletonHandler(script) { // {{{
  this.name = 'skeleton';

  // Determines user id for currently logged in user.
  this.determineUser = function() { // {{{

  } // }}}

  // Handles scenario when user is unknown
  this.handleUnknownUser = function() { // {{{
    return null;
  } // }}}

  // Determines mode of current page. Valid modes are: 'profile', 'listing',
  // 'mail'
  this.determineMode = function() { // {{{
    return this.script.url;
  } // }}}

  // Returns profile ID that you are currently viewing.
  this.getProfileId = function() { // {{{

  } // }}}

  // Handles profile page.
  this.handleProfile = function() { // {{{

  } // }}}

  // Handles mail page. Marks profiles that have replied or written to you.
  this.handleMail = function() { // {{{

  } // }}}

  // Handles profiles listing. Styles them according to their status.
  this.handleListing = function() { // {{{

  } // }}}

  // Adds handler specific css that colors profiles in listing to page.
  this.addListingStyle = function() { // {{{
    GM_addStyle(<><![CDATA[
      .gm_lds_state {
      }
      .gm_lds_viewed {
      }
      .gm_lds_initiated {
      }
      .gm_lds_written {
      }
      .gm_lds_chat {
      }
    ]]></>.toString());
  } // }}}
  
  this.script = script;
} // }}}

// Handler object for point.lt
function PointHandler(script) { // {{{
  this.profileRegexp = /userinfo\.php(.*?)(\?|&)id=(\d+)/;
  this.photoRegexp = /show\.php(.*?)(\?|&)id=(\d+)/;
  this.name = 'point';

  // Determines user id for currently logged in user.
  this.determineUser = function() { // {{{
    var name = $('#drop_down_username b').get(0);
    if (name) {
      return name.innerHTML;
    }
    else {
      return null;
    }
  } // }}}

  // Extracts user id from userinfo url.
  this.extractId = function(url) { // {{{
    var matches = url.match(this.profileRegexp);
    if (matches) {
      return matches[3];
    }
    else {
      return null;
    }
  } // }}}

  // Determines mode of current page. Valid modes are: 'profile', 'listing',
  // 'mail'
  this.determineMode = function() { // {{{
    if (this.script.url.match(/search\.php/)) {
      return 'listing';
    }
    else if (this.extractId(this.script.url)) {
      this.profileMode = 'profile';
      return 'profile';
    }
    else if (this.script.url.match(this.photoRegexp)) {
      this.profileMode = 'photo';
      return 'profile';
    }
    else if (this.script.url.match(/mail\.php/)) {
      return 'mail';
    }
    else {
      return null;
    }
  } // }}}

  // Returns profile ID that you are currently viewing.
  this.getProfileId = function() { // {{{
    if (this.profileMode == 'profile') {
      return this.extractId(this.script.url);
    }
    else if (this.profileMode == 'photo') {
      var matches = document.body.innerHTML.match(
        /<td class="rightBoxContent(.*?)<a class="right4" href="(.*?)(userinfo\.php(.*?)id=\d+)">/
      );
      if (matches) {
        return this.extractId(matches[3]);
      }
      else {
        return null;
      }
    }
    else {
      window.alert('Unknown LDS profile mode: ' + this.profileMode);
    }
  } // }}}

  // Handles profile page.
  // Attaches handler to message form.
  this.handleProfile = function() { // {{{
    if (this.profileMode == 'profile') {
      var form = $('form[name=form]').get(0);
      // It might be that form is not there. For example when profile owner
      // limits receiving of the mails.
      if (form) {
        form.addEventListener('submit', 
          this.script.bindEventHandler(this.mailSubmitHandler, this),
          false);
      }
    }
  } // }}}

  // Handles mail submission form.
  this.mailSubmitHandler = function() { // {{{
    var id = this.extractId(this.script.url);
    this.script.mailTo(id);
  } // }}}

  // Handles mail page. Marks profiles that have replied or written to you.
  this.handleMail = function() { // {{{
    var mails = $('.containerContent td.mailUserHeader').get();
    for (var index = 0; index < mails.length; index++) {
      var mail = mails[index];
      var row = $('.mailUserHeaderInfoIn', mail).get(0);
      if (row) {
        var a = $('a', row).get(0);
        var id = this.extractId(a.href);
        this.script.mailFrom(id);
      }
      else {
        row = $('.mailUserHeaderInfoOut', mail).get(1);
        if (row) {
          var a = $('a', row).get(0);
          var id = this.extractId(a.href);
          this.script.mailTo(id);
        }
      }
    }
  } // }}}

  // Handles profiles listing. Styles them according to their status.
  this.handleListing = function() { // {{{
    var links = $("td.contentBrd a[href*='/userinfo.php?id=']").get();
    for (var index = 0; index < links.length; index++) {
      var a = links[index];
      var id = this.extractId(a.href);

      var parent = $(a).parents('table').get(1);
      var fotoA = $('a img[width=120]', parent).parent().get(0);
      var tags = [parent];

      this.script.addStateInfo(id, tags, fotoA);
    }
  } // }}}
  
  // Handles scenario when user is unknown
  this.handleUnknownUser = function() { // {{{
    return null;
  } // }}}

  // Adds handler specific css that colors profiles in listing to page.
  this.addListingStyle = function() { // {{{
    GM_addStyle(<><![CDATA[
      .gm_lds_state {
      }
      .gm_lds_viewed {
      }
      .gm_lds_initiated {
      }
      .gm_lds_written {
      }
      .gm_lds_chat {
      }
    ]]></>.toString());
  } // }}}
  
  this.script = script;
} // }}}

// Handler object for ieskok.lt
function IeskokHandler(script) { // {{{
  this.name = 'ieskok';
  this.oldProfile = /ieskok\.lt\/anketa\.php\?id=(\d+)/;
  this.newProfile = /^http:\/\/(\d+).ieskok.lt/;

  // Determines user id for currently logged in user.
  this.determineUser = function() { // {{{
    return GM_getValue("ieskokUser", null);
  } // }}}

  // Handles scenario when user is unknown
  this.handleUnknownUser = function() { // {{{
    var input = $('form#loginf input[name=login]').get(0);
    if (input) {
      input.addEventListener('change',
        this.script.bindEventHandler(this.loginChanged, this),
        false
      );
    }
    else if (this.determineMode()) {
      window.alert(
        "Lithuanian Dating Script cannot determine your username!\n\n" +
        "Please log out and log in again."
      );
    }
  } // }}}

  // Handles login input change
  this.loginChanged = function(e) { // {{{
    GM_setValue("ieskokUser", e.target.value);
  } // }}}

  // Determines mode of current page. Valid modes are: 'profile', 'listing',
  // 'mail'
  this.determineMode = function() { // {{{
    if (this.getProfileId()) {
      return 'profile';
    }
    else if (this.script.url.match(/index\.php\?w=prisijunge/)) {
      return 'listing';
    }
    else if (
      this.script.url.match(/inod\.php$/) ||
      this.script.url.match(/inod\.php\?.*?&mo=0/)
    ) {
      return 'mail';
    }
    else {
      return null;
    }
  } // }}}

  // Returns profile ID that you are currently viewing.
  this.getProfileId = function() { // {{{
    var matches = this.script.url.match(this.oldProfile);
    if (matches) {
      this.profileMode = 'old';
      return matches[1];
    }
    else {
      matches = this.script.url.match(this.newProfile);
      if (matches) {
        this.profileMode = 'new';
        return matches[1];
      }
    }

    return null;
  } // }}}

  // Handles profile page.
  this.handleProfile = function() { // {{{
    if (this.profileMode == 'new') {
      var a = $("#anketa_write_msg a.bbtn").get(0);
      if (a) {
        a.addEventListener(
          'click',
          this.script.bindEventHandler(this.mailSentHandler, this),
          true
        );
      }
    }
  } // }}}

  // Handles mail submit button
  this.mailSentHandler = function(e) { // {{{
    var id = this.getProfileId();
    this.script.mailTo(id);
  } // }}}

  // Parses profile id out of profile thumbnail image.
  this.idFromImg = function(img) { // {{{
    return img.src.match(/(\d+)\.jpg$/)[1];
  } // }}}

  // Handles mail page. Marks profiles that have replied or written to you.
  this.handleMail = function() { // {{{
    var images = $('img.imagemf').get();
    for (var index = 0; index < length; index++) {
      var id = this.idFromImg(images[index]);
      this.script.mailFrom(id);
    }    
  } // }}}

  // Handles profiles listing. Styles them according to their status.
  this.handleListing = function() { // {{{
    var images = $('img.thumb_img').get();
    for (var index = 0; index < images.length; index++) {
      var img = images[index];
      var id = this.idFromImg(img);

      this.script.addStateInfo(id, [img.parentNode], img);
    }
  } // }}}
  
  // Adds handler specific css that colors profiles in listing to page.
  this.addListingStyle = function() { // {{{
    GM_addStyle(<><![CDATA[
      .gm_lds_state {
        background-color:#2B303F !important;
        display:block !important;
        margin:0.2em !important;
        padding:0.2em 0.5em !important;
        position:relative !important;
        width:83% !important;
      }
      .gm_lds_viewed {
      }
      .gm_lds_initiated {
      }
      .gm_lds_written {
      }
      .gm_lds_chat {
      }
    ]]></>.toString());
  } // }}}
  
  this.script = script;
} // }}}

// Handler object for hotnot.lt
function HotnotHandler(script) { // {{{
  this.name = 'hotnot';

  // Determines user id for currently logged in user.
  this.determineUser = function() { // {{{
    //return GM_getValue("hotnotUser", null);
    return 'arturaz1';
  } // }}}

  // Handles scenario when user is unknown
  this.handleUnknownUser = function() { // {{{
    var form = $('form[name=form_login]').get(0);
    if (form) {
      form.addEventListener('submit',
        this.script.bindEventHandler(this.loginChanged, this),
        true
      );
    }
    else if (this.determineMode()) {
      window.alert(
        "Lithuanian Dating Script cannot determine your username!\n\n" +
        "Please log out and log in again."
      );
    }
    return null;
  } // }}}

  // Handles login input change
  this.loginChanged = function(e) { // {{{
    window.alert(e.target);
    //this.storeLoginName(e.target.value);
    return false;
  } // }}}

  this.storeLoginName = function(username) { // {{{
    window.alert(username);
    GM_setValue("hotnotUser", username);
  } // }}}

  // Determines mode of current page. Valid modes are: 'profile', 'listing',
  // 'mail'
  this.determineMode = function() { // {{{
    if (this.script.url.match('/sutikmane$')) {
      return 'listing';
    }
    // We don't really need any other modes here.
    else {
      return null;
    }
  } // }}}

  // Extracts profile id from given url.
  this.extractProfileId = function(url) { // {{{
    var matches = url.match('/profilis/(.+)$');
    if (matches) {
      return matches[1];
    }
    else {
      return null;
    }
  } // }}}

  // Returns profile ID that you are currently viewing.
  this.getProfileId = function() { // {{{
    return this.extractProfileId(this.script.url);
  } // }}}

  // Handles profile page.
  this.handleProfile = function() { // {{{

  } // }}}

  // Handles mail page. Marks profiles that have replied or written to you.
  this.handleMail = function() { // {{{

  } // }}}

  // Handles profiles listing. Skips to next profile if this one is already
  // viewed.
  this.handleListing = function() { // {{{
    var username = this.extractProfileId(
      $('td.vertink_po_foto_r a').get(0).href
    );
    var yesA = $('img#vertink_scale_img_1').parent().get(0);
    var noA = $('img#vertink_scale_img_2').parent().get(0);
    
    // It may not be defined
    if (yesA) {
      if (this.script.getId(username) == "yes") {
        // We said we want you, stop asking
        yesA.click(); 
      }     
      else {
        yesA.addEventListener(
          'click',
          this.script.bindEventHandler(
            function(event) {
              this.script.storeId(username, 'yes');
            }, this
          ),
          true
        );
      }
    }

    // noA may not be defined sometimes.
    if (noA) {
      if (this.script.getId(username) == "no") {
        // We said we don't want you, go away please.
        noA.click(); 
      }
      else {
        noA.addEventListener(
          'click',
          this.script.bindEventHandler(
            function(event) {
              this.script.storeId(username, 'no');
            }, this
          ),
          true
        );
      }
    }
  } // }}}

  // Adds handler specific css that colors profiles in listing to page.
  this.addListingStyle = function() { // {{{
    GM_addStyle(<><![CDATA[
      .gm_lds_state {
      }
      .gm_lds_viewed {
      }
      .gm_lds_initiated {
      }
      .gm_lds_written {
      }
      .gm_lds_chat {
      }
    ]]></>.toString());
  } // }}}
  
  this.script = script;
} // }}}

// Base script object
//
// Valid states for profile:
// * null - no action from any side
// * 'viewed' - you have viewed that profile
// * 'written' - you have written to that profile
// * 'initiated' - that profile has written to you first
// * 'chat' - either that profile has replied to your letter or you replied
//   to its letter
function Script() { // {{{
  this.baseRemoteUrl = "http://thor.nebula44.com/~x11/lds";

  // Texts for different profile states
  this.stateTexts = { // {{{
    null: "Unviewed",
    'viewed': "Viewed",
    'initiated': "Written to you",
    'written': "Written",
    'chat': "Chat"
  }; // }}}

  // Return object as Array.
  this.A = function(object) { // {{{
    var arr = [];
    for (var index = 0; index < object.length; index++) {
      arr.push(object[index]);
    }
    return arr;
  } // }}}

  // Binds method to object.
  this.bind = function() { // {{{
    var args = this.A(arguments);
    var method = args.shift();
    var object = args.shift();

    return function() {
      return method.apply(object, args);
    }
  } // }}}

  // Binds event handler method to object.
  this.bindEventHandler = function(method, object) { // {{{
    return function(e) {
      return method.call(object, e);
    }
  } // }}}

  // Returns unique client ID that identifies installation of a script.
  // Used in synchronizing data between different installations (i.e.
  // on different computers).
  this.clientId = function() { // {{{
    var clientId = GM_getValue('clientId', null);
    if (! clientId) {
      clientId = this.timestamp() + "_" + parseInt(Math.random() * 100000);
      GM_setValue('clientId', clientId);
    }

    return clientId;
  } // }}}

  // Determines site handler and stores it in this.handler.
  this.determineHandler = function() { // {{{
    this.url = document.documentURI;
    if (this.url.match(/point\.lt/)) {
      this.handler = new PointHandler(this);
    }
    else if (this.url.match(/ieskok\.lt/)) {
      this.handler = new IeskokHandler(this);
    }
    else if (this.url.match(/hotnot\.lt/)) {
      this.handler = new HotnotHandler(this);
    }
    else {
      this.handler = null;
    }
  } // }}}

  // Returns string that uniquely identifies handler/user pair.
  this.accessId = function() { // {{{
    return this.handler.name + "_" + this.user;
  } // }}}

  // Returns remote server URL for given file.
  this.remoteFile = function(file) { // {{{
    return this.baseRemoteUrl + "/" + file;
  } // }}}

  // Returns remote server URL for given action.
  this.remoteUrl = function(action) { // {{{
    return this.remoteFile("index.php?action=" + action);
  } // }}}

  // Returns POST encrypted string for storing given values to remote server.
  this.remoteData = function(accessId, key, value) { // {{{
    return "client_id=" + this.clientId() + "&access_id=" + accessId +
      "&key=" + key + "&value=" + value;
  } // }}}
  
  // Returns string for local storage key composed of accessId and key.
  this.localId = function(accessId, key) { // {{{
    return accessId + "|" + key;
  } // }}}

  // Store given key, value pair to local storage. Must provide accessId.
  // You should not call this method directly, use store*() methods instead.
  this.localStore = function(accessId, key, value) { // {{{
    GM_setValue(this.localId(accessId, key), value);
  } // }}}

  // Store given key, value pair to remote server. Must provide accessId.
  // You should not call this method directly, use store*() methods instead.
  this.remoteStore = function(accessId, key, value) { // {{{
    GM_xmlhttpRequest({
      method: "POST",
      url: this.remoteUrl("store"),
      data: this.remoteData(accessId, key, value),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: this.bindEventHandler(this.remoteSyncCallback, this)
    });
  } // }}}

  // Get value by given key from local storage. If no value is set return 
  // _default_value_. If default is not provided - return null.
  this.get = function(key, default_value) { // {{{
    if (typeof(default_value) == "undefined") {
      default_value = null;
    }

    return GM_getValue(this.localId(this.accessId(), key), default_value);
  } // }}}

  // Get value for profile id.
  this.getId = function(id) { // {{{
    return this.get("id_" + id);
  } // }}}

  // Store given key, value pair. If onlyLocal is true - do not store to
  // remote server.
  this.store = function(key, value, onlyLocal) { // {{{
    var accessId = this.accessId();
    this.localStore(accessId, key, value);

    if (! onlyLocal) {
      this.remoteStore(accessId, key, value);
    }
  } // }}}

  // Store given value for profile with id.
  this.storeId = function(id, value) { // {{{
    this.store("id_" + id, value);
    this.setNeedsUpdate(true);
  } // }}}

  // Do we need to sync with remote?
  this.needsSync = function() { // {{{
    return (this.timestamp() - this.get('lastSync', 0) > 60 * 60);
  } // }}}

  // Synchronize with remote storage if needed.
  this.sync = function() { // {{{
    if (this.needsSync()) {
      GM_xmlhttpRequest({
        method: "POST",
        url: this.remoteUrl("sync"),
        data: this.remoteData(this.accessId()),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: this.bindEventHandler(this.remoteSyncCallback, this)
      });
    }
  } // }}}

  // Callback that gets called when remote server replies.
  this.remoteSyncCallback = function(response) { // {{{
    try {
      var remote = JSON.parse(response.responseText);

      if (remote.sync) {
        this.syncWithData(remote.data);
      }
    }
    catch (e) {
      window.alert(
        "Lithuanian Dating Script\n\n" +
        "Remote server error!\n\n" + 
        response.responseText
      );
    }
  } // }}}

  // Synchronize local storage with given data.
  this.syncWithData = function(data) { // {{{
    for (key in data) {
      this.store(key, data[key], true);
    }
    this.setNeedsUpdate(true);
    this.store('lastSync', this.timestamp(), true);
  } // }}}

  // Record fact that user has viewed profile. Only store if no value
  // has been set before.
  this.storeView = function() { // {{{
    var id = this.handler.getProfileId();
    if (id && this.getId(id) == null) {
      this.storeId(id, 'viewed');
    }
  } // }}}

  // Called by handlers to note that profile with id has written to us.
  this.mailFrom = function(id) { // {{{
    var state = this.getId(id);
    if (state == 'written') {
      this.storeId(id, 'chat');
    }
    else if (state == null || state == 'viewed') {
      this.storeId(id, 'initiated');
    }
  } // }}}

  // Called by handlers when user sends mail to some profile.
  this.mailTo = function(id) { // {{{
    var state = this.getId(id);
    if (state == 'initiated') {
      this.storeId(id, 'chat');
    }
    else if (state == null || state == 'viewed') {
      this.storeId(id, 'written');
    }
  } // }}}

  // Returns string ID for state element for given id.
  this.idForState = function(id) { // {{{
    return "gm_lds_state_" + id;
  } // }}}

  // Adds style and other state info resolved by id to tags.
  this.addStateInfo = function(id, tags, stateAnchor) { // {{{
    var state = this.getId(id);
    for (var index = 0; index < tags.length; index++) {
      $(tags[index]).addClass("gm_lds_" + state);
    }

    if (typeof(stateAnchor) != "undefined") {
      var stateId = this.idForState(id);
      var stateEl = $('#' + stateId).get(0) ;
      if (! stateEl) {
        stateEl = document.createElement('div');
        $(stateEl).addClass('gm_lds_state');
        stateEl.setAttribute('id', stateId);
        $(stateAnchor).after(stateEl);
      }

      stateEl.innerHTML = this.stateTexts[state];
    }
  } // }}}

  // Adds css that colors profiles in listing to page.
  this.addListingStyle = function() { // {{{
    GM_addStyle(<><![CDATA[
      .gm_lds_state {
        background-color:#2B303F;
        border:1px solid black;
        color:white;
        margin:0.2em;
        padding:0.2em 0.5em;
        text-align:center;
        width:7em;
      }
      .gm_lds_viewed {
        /* Greenish */
        background-color: #56EF6B!important;;
      }
      .gm_lds_initiated {
        /* Orangeish */
        background-color: #FFC35C!important;;
      }
      .gm_lds_written {
        /* Blueish */
        background-color: #6C7BFF!important;;
      }
      .gm_lds_chat {
        /* Redish */
        background-color: #FF9F9F!important;
      }
    ]]></>.toString());
  } // }}}

  // Returns UNIX timestamp for now.
  this.timestamp = function() { // {{{
    return parseInt(new Date().getTime() / 1000);
  } // }}}

  // Get needsUpdate flag.
  this.needsUpdate = function() { // {{{
    return this.get('needsUpdate');
  } // }}}

  // Set needsUpdate flag (local only).
  this.setNeedsUpdate = function(value) { // {{{
    this.store('needsUpdate', value, true);
  } // }}}

  // Sets up timer that periodicaly checks for listing.
  this.handleListing = function() { // {{{
    this.addListingStyle();
    this.handler.addListingStyle();
    this.handler.handleListing();
    this.setNeedsUpdate(false);

    // Periodicaly recolor to show changes.
    setInterval(
      this.bind(
        function() {
          if (this.needsUpdate()) {
            this.handler.handleListing();
            this.setNeedsUpdate(false);
          }
        },
        this
      ),
      1000
    );
  } // }}}

  // Constructor
  this.initialize = function() { // {{{
    this.determineHandler();
    if (this.handler) {
      this.user = this.handler.determineUser();
      if (! this.user) {
        this.handler.handleUnknownUser();
      }
      else {
        this.sync();

        this.mode = this.handler.determineMode();
        if (! this.mode) return;

        if (this.mode == 'profile') {
          this.handler.handleProfile();
          this.storeView();
        }
        else if (this.mode == 'mail') {
          this.handler.handleMail();
        }
        else if (this.mode == 'listing') {
          this.handleListing();
        }
      }
    }
    else {
      window.alert("Unknown site for Lithuanian Dating Script!");
    }
  } // }}}

  // For sync debugging purposes: erases all local stored data.
  //for each(var val in GM_listValues()) { GM_deleteValue(val); }

  this.initialize();
} // }}}

// Instantiate script
new Script();
