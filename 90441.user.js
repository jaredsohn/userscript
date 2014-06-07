// ==UserScript==
// @name           Facebook Phonebook Export / Re-render
// @namespace      http://techtalkthoughts.tumblr.com/post/1566492734/export-phonebook-from-facebook
// @description    Re-render contact phone information as CSV.
// @include        http://www.facebook.com/friends/edit/*
// @LastUpdated     11/13/2010.
// ==/UserScript==


/**
 * In order to trigger a correct export, navigate to:
 *   http://www.facebook.com/friends/edit/?sk=phonebook
 */
var FPE_PERSON_CLASS = 'UIImageBlock_Content UIImageBlock_ENT_Content';
var PERSON_IDENTIFIER = 'profile.php';
var DATA_RENDER_INJECTION = 'contentArea';
var SEPARATOR = ',';


/**
 * Parse HTML string for person name, phone number.
 * @param html string containing html data to parse.
 * @return Array containing parsed data: ['name'] or ['number', 'type'].
 */
var ParsePersonHtml = function(html) {
  if (html.search(PERSON_IDENTIFIER) != -1) {
    // it is a <a href="/profile.php?id=xxx">NAME</a>
    var name = html.substring(html.indexOf('>') + 1, html.lastIndexOf('<'));
    return [name];
  } else {
    // it is a NUMBER<span class="pls fss fcg">TYPE</span>
    var number = html.substring(0, html.indexOf('<'));
    var type = html.substring(html.indexOf('>') + 1, html.lastIndexOf('<'));
    return [number, type];
  }
}


/**
 * Parse Facebook for phone numbers.
 * @param HTMLCollection wrapped in XPCNativeWrapper containing contact info.
 * @return Array of contact strings separated by SEPARATOR.
 */
var GetPhoneNumbers = function(people) {
  var phone_numbers = new Array();
  for (var index = 0; index < people.length; index++) {
    var person = people[index].children;
    var person_data = new Array();
    for (var j = 0; j < person.length; j++) {
      person_data.push(ParsePersonHtml(person.item(j).innerHTML));
    }
    phone_numbers.push(person_data.join(SEPARATOR));
  }
  return phone_numbers;
}


/**
 * Render data to the page/screen.
 * @param Array containing data to render.
 */
var RenderData = function(contact_data) {
  var main_container = document.getElementById(DATA_RENDER_INJECTION);
  main_container.innerHTML = (
      'You can just click on the phone numbers and select all to copy.<br/>' +
      'Save this information as a CSV file.<br/>' +
      "<textarea cols='60' rows='" + contact_data.length + 1 + "'>" +
      contact_data.join('\n') +
      '</textarea>');
}

RenderData(GetPhoneNumbers(document.getElementsByClassName(FPE_PERSON_CLASS)));