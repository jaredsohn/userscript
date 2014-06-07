// ==UserScript==
// @name           user ratio everywhere
// @namespace      script
// @include        http://free-torrents.org/forum/view*
// @require http://static.free-torrents.org/forum/misc/js/jquery.pack.js?v=20
// @updateURL http://userscripts.org/scripts/source/87681.meta.js
// @homepageURL http://userscripts.org/scripts/show/87681
// ==/UserScript==
var check=document.getElementById('user_ratio')
var st;
var image="data:image/gif;base64,R0lGODlhKgAqAPcAAAAAAP///8XEx4R9l6ahs7q2xbi0w9rY39bU293b4kxDaE5FalJJbVNKbV9Xd21lhHVuinpzj3x1kYmDm5KMo5WPppWRobWxwbKuvsfE0NfV3bq5vbSzt0lAZkpBZ0tCaE9Ha1BIbFFJbVJKblVNcFpSdGdgf21mhWZge3JriHhxjn13knx2kXx2j4qEnXl0ipaRp5iTqKqmuK+rvL67yL26x9DO15+br6KesZOQnp+cqqKfrbazwrm2xL+8ypKQms3L1YWCktva4a6usMDAwbStq+Lb2eFMKd5LKeFPLed9ZOiAZ+2Uf86FdNaSgvCnlvGsnOSomvK2qPO5q/S8r7mRh9Kmm/TBtfTKwObTzsKzr9/OyuDPy99CHt9DH95CH95DIOBFIt5IJt5JJ91IJuFLKd1KKeJVNeRdPuReQOBiReVnStlhRtJhR9ViSedvVNZoT+RyWONxV+h3Xeh3Xul6YeqEbdh8Z+eFb+yRfO2Sfc6GdsWCdMyKe+6klPGrm/GvoPKxovKzpfGypPS8sPfOxdazq/nb1fbY0vnc1sOzsNzMyeDg4N/f393d3dzc3Nra2tnZ2djY2NfX19bW1tXV1dTU1NPT09HR0dDQ0M/Pz83NzczMzMvLy8jIyMfHx8bGxsXFxcPDw8LCwsHBwcDAwL6+vr29vbu7u7q6urm5ubW1ta6urv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAK0ALAAAAAAqACoAAAj/AFsJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGBMCyQhxwACODi90OEED5EIcIzp0cCHEpEEbLBSo7PBBhUuCGDx08PBBZYkMB68QuoiBhEoPCzowoICQyRlAFW3oVEniRooICAOh6eKlEEUWMxf0aLXCB8I3XdLSmThDZgcSBQQa0IBwSpK0YaBIfDCzgsM8abusiZhgJgOIZQIfgshjpgSIcwILgghjpgyITwLrgThhZsmHVALb4TyzBsTQaUc/rKySgMBHlCIxUuhHM0SRKiE0suSJ1KhOkBLGCTwI4oGZIDaIKmXK1CdJCLeICYwooomZL4hw0oQJekEsrYzcqAmsRqKFqSF2JPyzpFUUJGnBOIkIiQOKmQ4QIKxzREmYwG1oEdxDlqjyg04ixIBQIml0cURgXlShyiUQVYIKK0E00IJ+B0kRWFpm8MEKKpVA1MgnqwyRgw4J4fGhF30UsconjUQUCSionCJAQnKMkdYXe6iSCiiRTORIJpxYkhAXVsBBRhdukLKJIzcRhEkoijTBhiFVGvTIJJUskkWXZJZp5plopjlRQAA7"
if(!check)
{
 $('<div id="rat" align="center">Идёт загрузка панели рейтинга</div>').insertAfter('#page_header .topmenu:eq(0)')
function req(st)
 {
  if(st=='1'){$('#rat').html('Идёт подгрузка панели рейтинга, пожалуйста подождите...')}
  $.ajaxSetup({'beforeSend' : function(xhr) {xhr.overrideMimeType('text/html; charset=cp1251');},});
  $('#rat').load('http://free-torrents.org/forum/indexer.php #user_ratio', function(){
  $('#user_ratio').append('<img id="asd" src='+image+' style="width:18px;height:18px;margin-bottom: -3px;cursor:pointer" title="Обновить рейтинг">');
  $('#asd').click(function(){req('1')});});
 }
 req()
}