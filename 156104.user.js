/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Twitter Settings sub-menu
// @namespace       http://userscripts.org/users/12
// @description     Add sub-menu for Twitter settings for quick access.
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @updateURL       https://userscripts.org/scripts/source/156104.meta.js
// @downloadURL     https://userscripts.org/scripts/source/156104.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://twitter.com/*
// @include         https://twitter.com/*
// @grant           GM_addStyle
// ==/UserScript==

(function() {
  var setting = document.querySelector('.dropdown-menu li > a.js-nav[data-nav="settings"]');
  if (!setting) return;

  var text;
  var lang = document.documentElement.lang;
  switch (lang) {
    case "template":
      text = {
        account: "",
        password: "",
        devices: "",
        notifications: "",
        profile: "",
        design: "",
        applications: "",
        widgets: ""
      }
      break;
    case "ar":  // العربية
      text = {
        account: "\u0627\u0644\u062D\u0633\u0627\u0628",
        password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
        devices: "\u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062D\u0645\u0648\u0644",
        notifications: "\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
        profile: "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A",
        design: "\u0627\u0644\u062A\u0635\u0645\u064A\u0645",
        applications: "\u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A",
        widgets: "\u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0645\u0635\u063A\u0651\u0631\u0629"
      }
      break;
    case "ca":  // Català
      text = {
        account: "Account",
        password: "Password",
        devices: "M\u00F2bil",
        notifications: "Notificacions per correu electr\u00F2nic",
        profile: "Profile",
        design: "Design",
        applications: "Aplicacions",
        widgets: "Widgets"
      }
      break;
    case "cs":  // Čeština
      text = {
        account: "\u00DA\u010Det",
        password: "Heslo",
        devices: "Mobil",
        notifications: "E-mailov\u00E9 upozorn\u011Bn\u00ED",
        profile: "Profil",
        design: "Vzhled",
        applications: "Aplikace",
        widgets: "Widgety"
      }
      break;
    case "da":  // Dansk
      text = {
        account: "Konto",
        password: "Adgangskode",
        devices: "Mobil",
        notifications: "E-mail-meddelelser",
        profile: "Profil",
        design: "Design",
        applications: "Apps",
        widgets: "Widgets"
      }
      break;
    case "de":  // Deutsch
      text = {
        account: "Account",
        password: "Passwort",
        devices: "Mobiltelefon",
        notifications: "E-Mail-Benachrichtigungen",
        profile: "Profil",
        design: "Design",
        applications: "Apps",
        widgets: "Widgets"
      }
      break;
    case "es":  // Español
      text = {
        account: "Cuenta",
        password: "Contrase\u00F1a",
        devices: "M\u00F3vil",
        notifications: "Notificaciones por correo electr\u00F3nico",
        profile: "Perfil",
        design: "Dise\u00F1o",
        applications: "Aplicaciones",
        widgets: "Widgets"
      }
      break;
    case "eu":  // Euskara
      text = {
        account: "Kontua",
        password: "Password",
        devices: "Mugikorra",
        notifications: "E-posta bidezko jakinarazpenak",
        profile: "Profila",
        design: "Diseinua",
        applications: "Aplikazioak",
        widgets: "Tresnak"
      }
      break;
    case "fa":  // فارسی
      text = {
        account: "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
        password: "\u06AF\u0630\u0631\u0648\u0627\u0698\u0647 - \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
        devices: "\u06AF\u0648\u0634\u06CC \u0647\u0645\u0631\u0627\u0647",
        notifications: "\u0622\u06AF\u0627\u0647\u200C\u0633\u0627\u0632\u06CC\u200C\u0647\u0627\u06CC \u0627\u06CC\u0645\u06CC\u0644\u06CC",
        profile: "\u0646\u0645\u0627\u06CC\u0647",
        design: "\u0637\u0631\u0627\u062D\u06CC",
        applications: "\u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0647\u0627",
        widgets: "\u0627\u0628\u0632\u0627\u0631\u06A9\u200C\u0647\u0627"
      }
      break;
    case "fi":  // Suomi
      text = {
        account: "Tili",
        password: "Salasana",
        devices: "Mobili",
        notifications: "S\u00E4hk\u00F6posti-ilmoitukset",
        profile: "Profili",
        design: "Ulkoasu",
        applications: "Sovellukset",
        widgets: "Pienoisohjelmat"
      }
      break;
    case "fil": // Filipino
      text = {
        account: "Account",
        password: "Password",
        devices: "Mobile",
        notifications: "Mga abiso sa email",
        profile: "Profile",
        design: "Disenyo",
        applications: "Mga App",
        widgets: "Mga Widget"
      }
      break;
    case "fr":  // Français
      text = {
        account: "Compte",
        password: "Mot de passe",
        devices: "Mobile",
        notifications: "Notifications par email",
        profile: "Profil",
        design: "Th\u00E8me",
        applications: "Applications",
        widgets: "Widgets"
      }
      break;
    case "gl":  // Galego
      text = {
        account: "Conta",
        password: "Contrasinal",
        devices: "M\u00F3bil",
        notifications: "Notificaci\u00F3ns por correo electr\u00F3nico",
        profile: "Profile",
        design: "Dese\u00F1o",
        applications: "Aplicaci\u00F3ns",
        widgets: "Widgets"
      }
      break;
    case "he":  // עִבְרִית
      text = {
        account: "\u05D7\u05E9\u05D1\u05D5\u05DF",
        password: "\u05E1\u05E1\u05DE\u05D4",
        devices: "\u05D8\u05DC\u05E4\u05D5\u05DF \u05E0\u05D9\u05D9\u05D3",
        notifications: "\u05D4\u05EA\u05E8\u05E2\u05D5\u05EA \u05D1\u05D3\u05D5\u05D0\u05F4\u05DC",
        profile: "\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC",
        design: "\u05E2\u05D9\u05E6\u05D5\u05D1",
        applications: "\u05D9\u05D9\u05E9\u05D5\u05DE\u05D9\u05DD",
        widgets: "\u05D5\u05D9\u05D3\u05D2\u05F3\u05D8\u05D9\u05DD"
      }
      break;
    case "hi":  // हिन्दी
      text = {
        account: "\u0916\u093E\u0924\u093E",
        password: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921",
        devices: "\u092E\u094B\u092C\u093E\u0907\u0932",
        notifications: "\u0908\u092E\u0947\u0932 \u0905\u0927\u093F\u0938\u0942\u091A\u0928\u093E\u090F\u0902",
        profile: "\u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932",
        design: "\u0921\u093F\u091C\u093C\u093E\u0907\u0928",
        applications: "\u090F\u092A\u094D\u092A\u094D\u0938",
        widgets: "\u0935\u093F\u091C\u0947\u091F\u094D\u0938"
      }
      break;
    case "hu":  // Magyar
      text = {
        account: "Fi\u00F3k",
        password: "Jelsz\u00F3",
        devices: "Mobil",
        notifications: "E-mail \u00E9rtes\u00EDt\u00E9sek",
        profile: "Profil",
        design: "Kin\u00E9zet",
        applications: "Alkalmaz\u00E1sok",
        widgets: "Modulok"
      }
      break;
    case "id":  // Bahasa Indonesia
      text = {
        account: "Akun",
        password: "Kata sandi",
        devices: "Ponsel",
        notifications: "Notifikasi email",
        profile: "Profil",
        design: "Desain",
        applications: "Applikasi",
        widgets: "Widget"
      }
      break;
    case "it":  // Italiano
      text = {
        account: "Account",
        password: "Password",
        devices: "Cellulare",
        notifications: "Notifiche email",
        profile: "Profilo",
        design: "Aspetto",
        applications: "Applicazioni",
        widgets: "Widget"
      }
      break;
    case "ja":  // 日本語
      text = {
        account: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831",
        password: "\u30D1\u30B9\u30EF\u30FC\u30C9",
        devices: "\u30E2\u30D0\u30A4\u30EB",
        notifications: "\u30E1\u30FC\u30EB\u901A\u77E5",
        profile: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",
        design: "\u30C7\u30B6\u30A4\u30F3",
        applications: "\u30A2\u30D7\u30EA\u9023\u643A",
        widgets: "\u30A6\u30A3\u30B8\u30A7\u30C3\u30C8"
      }
      break;
    case "ko":  // 한국어
      text = {
        account: "\uACC4\uC815",
        password: "\uBE44\uBC00\uBC88\uD638",
        devices: "\uBAA8\uBC14\uC77C",
        notifications: "\uC774\uBA54\uC77C \uC54C\uB9BC",
        profile: "\uD504\uB85C\uD544",
        design: "\uB514\uC790\uC778",
        applications: "\uC560\uD50C\uB9AC\uCF00\uC774\uC158",
        widgets: "\uC704\uC82F"
      }
      break;
    case "msa": // Bahasa Melayu
      text = {
        account: "Akaun",
        password: "Kata laluan",
        devices: "Mudah alih",
        notifications: "E-mel pemberitahuan",
        profile: "Profil",
        design: "Reka Bentuk",
        applications: "Aplikasi",
        widgets: "Widget"
      }
      break;
    case "pl":  // Polski
      text = {
        account: "Konto",
        password: "Has\u0142o",
        devices: "Telefon kom\u00F3rkowy",
        notifications: "Powiadomienia e-mail",
        profile: "Profil",
        design: "Wygl\u0105d",
        applications: "Aplikacje",
        widgets: "Wid\u017Cety"
      }
      break;
    case "nl":  // Nederlands
      text = {
        account: "Account",
        password: "Wachtwoord",
        devices: "Mobiel",
        notifications: "E-mailmeldingen",
        profile: "Profiel",
        design: "Ontwerp",
        applications: "Applicaties",
        widgets: "Widgets"
      }
      break;
    case "ro":  // Română
      text = {
        account: "Account",
        password: "Parol\u0103",
        devices: "Mobil",
        notifications: "Notific\u0103ri prin email",
        profile: "Profil",
        design: "Design",
        applications: "Aplica\u0163ii",
        widgets: "Widgets"
      }
      break;
    case "ru":  // Русский
      text = {
        account: "\u0423\u0447\u0451\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
        password: "\u041F\u0430\u0440\u043E\u043B\u044C",
        devices: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
        notifications: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435",
        profile: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C",
        design: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435",
        applications: "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
        widgets: "\u0412\u0438\u0434\u0436\u0435\u0442\u044B"
      }
      break;
    case "tr":  // Türkçe
      text = {
        account: "Hesap",
        password: "\u015Eifre",
        devices: "Mobil",
        notifications: "E-posta bildirimleri",
        profile: "Profil",
        design: "Tasar\u0131m",
        applications: "Uygulamalar",
        widgets: "Bile\u015Fenler"
      }
      break;
    case "uk":  // Українська мова
      text = {
        account: "Account",
        password: "\u041F\u0430\u0440\u043E\u043B\u044C",
        devices: "\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0439",
        notifications: "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u044E \u043F\u043E\u0448\u0442\u043E\u044E",
        profile: "\u041F\u0440\u043E\u0444\u0456\u043B\u044C",
        design: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u043D\u044F",
        applications: "\u0414\u043E\u0434\u0430\u0442\u043A\u0438",
        widgets: "\u0412\u0456\u0434\u0436\u0435\u0442\u0438"
      }
      break;
    case "xx-lc": // LOLCATZ
      text = {
        account: "Account",
        password: "PASSWORD",
        devices: "MOBILE. KTHXBYE!",
        notifications: "EMAIL NOTIFICASHUNS",
        profile: "PROFILE",
        design: "DESIGN",
        applications: "APPS",
        widgets: "Widgets"
      }
      break;
    case "zh-cn": // 简体中文
      text = {
        account: "\u8D26\u53F7",
        password: "\u5BC6\u7801",
        devices: "\u79FB\u52A8\u8BBE\u5907",
        notifications: "\u7535\u5B50\u90AE\u4EF6\u901A\u77E5",
        profile: "\u4E2A\u4EBA\u8D44\u6599",
        design: "\u4E3B\u9898",
        applications: "\u5E94\u7528",
        widgets: "\u5C0F\u5DE5\u5177"
      }
      break;
    case "zh-tw": // 繁體中文
      text = {
        account: "\u5E33\u6236",
        password: "\u5BC6\u78BC",
        devices: "\u884C\u52D5\u96FB\u8A71",
        notifications: "\u96FB\u5B50\u90F5\u4EF6\u901A\u77E5",
        profile: "\u500B\u4EBA\u6A94\u6848",
        design: "\u8A2D\u8A08",
        applications: "\u61C9\u7528\u7A0B\u5F0F",
        widgets: "\u5C0F\u5DE5\u5177"
      }
      break;
    default:  // English
      text = {
        account: "Account",
        password: "Password",
        devices: "Mobile",
        notifications: "Email notifications",
        profile: "Profile",
        design: "Design",
        applications: "Apps",
        widgets: "Widgets"
      }
  }

  var submenu = setting.parentNode.insertBefore(document.createElement("ul"), setting);
  submenu.id = "sub-menu";
  submenu.className = "dropdown-menu";
  submenu.innerHTML = '<li><a data-nav="settings" href="/settings/account">'
                    + text.account + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/password">'
                    + text.password + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/devices">'
                    + text.devices + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/notifications">'
                    + text.notifications + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/profile">'
                    + text.profile + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/design">'
                    + text.design + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/applications">'
                    + text.applications + '</a></li>'
                    + '<li><a data-nav="settings" href="/settings/widgets">'
                    + text.widgets + '</a></li>';

  var css = "#sub-menu {\n\
    display: none;\n\
    min-width: 237px;\n\
    background-color: white;\n\
    position: absolute;\n\
    margin: -2.3em " + (document.body.dir == "rtl" ? "0 0 -227px" : "-227px 0 0") + ";\n\
    padding: .5em 0;\n\
  }\n\
  li:hover > #sub-menu { display: block; }";

  if (typeof GM_addStyle === "function") return GM_addStyle(css);
  var style = document.head.appendChild(document.createElement("style"));
  style.type = "text/css";
  style.textContent = css;
})()
