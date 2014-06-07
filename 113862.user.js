// ==UserScript==
// @name            Campfire Notifications for Chrome
// @version         2011.09.24.001
// @author          Andrew Childs
// @namespace       http://glomerate.com
// @description     Adds webkitnotification support to Campfire. Works in Chrome only.
// @include         *.campfirenow.com/*
// ==/UserScript==

(function(){

  setTimeout(function() {
    exec(bindNotifications);
  }, 1000);

  function bindNotifications() {
    if (window.webkitNotifications && typeof window.chat != 'undefined') {

      Campfire.Responders.push('WebKitNotifier');
      createNotifier();
      createSettingsUI();
      bindEvents();

      function createNotifier() {
        Campfire.WebKitNotifier = Class.create({
          initialize: function(chat) {
            this.chat = chat;
            if (typeof localStorage.notificationMatches == 'undefined') {
              localStorage.notificationMatches = this.chat.username;
            }
            if (typeof localStorage.notificationTimeout == 'undefined') {
              localStorage.notificationTimeout = 15;
            }
          },
          onMessagesInserted: function(messages) {
            var pattern = new RegExp(localStorage.notificationMatches.replace(/\n/g, '|'), 'i');
            for (var i = 0, message; message = messages[i++];) {
              if (message.kind == 'text') {
                var body = message.bodyElement().innerHTML.unescapeHTML();
                var author = message.authorElement().getAttribute('data-name');
                var not_my_own_message = author != window.chat.username;

                if (not_my_own_message && body.match(pattern)) {
                  setNotification(message);
                }
              }
            }
          }
        });
        chat.register.apply(chat, Campfire.Responders);
        $('sounds').style.display = 'block';
      }

      function setNotification(message) {
        if (window.webkitNotifications.checkPermission() > 0) {
          window.webkitNotifications.requestPermission();
        }

        var icon = message._author.dataset.avatar;
        // var title = message.author();
        var title = message.authorElement().getAttribute('data-name');
        var body = message.bodyElement().innerHTML.unescapeHTML();

        var popup = window.webkitNotifications.createNotification(icon, title, body);
        popup.show();
        setTimeout(function() {
          popup.cancel();
        }, localStorage.notificationTimeout * 1000);
      }

      function createSettingsUI() {
        var link = document.createElement('div');
        var dialog = document.createElement('div');

        link.innerHTML = '<h3><a href="#" id="notificationLink">Notifications</a></h3>';

        dialog.innerHTML = '' +
          '<div id="notificationsDialogContainer" style="display: none;">' +
          '  <div id="notificationsOverlay" style="background: -webkit-radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.8)); height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 100;"></div>' +
          '  <div id="notificationsDialog" style="left: 0; position: fixed; top: 140px; width: 100%; z-index: 101;">' +
          '    <div style="margin: 0 auto; position: relative; width: 390px;">' +
          '      <div style="background: #fff; -webkit-border-radius: 4px; -webkit-box-shadow: 0 12px 24px rgba(0, 0, 0, 0.55); padding: 32px 34px; position: relative; text-align: left;">' +
          '        <h2 style="margin: 0 0 14px 0;">Notification Settings</h2>' +
          '        <label style="display: block; font-size: 12px;">Notifications <span style="color: #999; font-size: 11px; font-style: italic;">one per line, regex supported</span></label>' +
          '        <textarea id="notificationMatches" style="display: block; font-weight: bold; font-size: 14px; padding: 3px; width: 310px; height: 150px;">' + localStorage.notificationMatches + '</textarea>' +
          '        <label style="display: block; font-size: 12px; margin-top: 15px;">Notification Timeout</label>' +
          '        <input style="font-weight: bold; font-size: 14px; padding: 3px;" type="text" id="notificationTimeout" size="3" value="' + localStorage.notificationTimeout + '" /> seconds' +
          '        <div style="margin-top: 15px;">' +
          '          <input id="notificationDialogSaveChanges" type="submit" value="Save Changes" /> <span style="font-size: 11px;">or <a href="#" id="notificationDialogCancel" class="admin">Cancel</a></span>' +
          '        </div>' +
          '      </div>' +
          '    </div>' +
          '  </div>' +
          '</div>';

        $('Sidebar').appendChild(link);
        document.body.appendChild(dialog);
      }

      function bindEvents() {
        $('notificationLink').onclick = openSettings;
        $('notificationsOverlay').onclick = closeSettings;
        $('notificationDialogCancel').onclick = closeSettings;
        $('notificationDialogSaveChanges').onclick = saveSettings;
      }

      function openSettings() {
        $('notificationMatches').value = localStorage.notificationMatches;
        $('notificationTimeout').value = localStorage.notificationTimeout;
        $('notificationsDialogContainer').style.display = 'block';
        return false;
      }

      function closeSettings() {
        $('notificationsDialogContainer').style.display = 'none';
        return false;
      }

      function saveSettings() {
        localStorage.notificationMatches = $('notificationMatches').value;
        localStorage.notificationTimeout = $('notificationTimeout').value;
        closeSettings();
        return false;
      }

    }
  }

  function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
  }

})();
