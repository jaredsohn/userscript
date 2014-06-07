// ==UserScript==
// @name          nubisindo mass message
// @description   nubisindo guide
// @include       http://secura.e-sim.org/composeMessage.html*
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "titleInput") zTextFields[i].value="selamat datang di secura world";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "messageForm") zTextFields[i].value="[b]Selamat Datang Pemuda Pemudi Masa Depan Bangsa sIndonesia[/b]. \n\nberikut ada beberapa link ttg bagaimana memainkan game ini dengan baik [url=http://secura.e-sim.org/article.html?id=12283]Basic Tutorial[/url], \n\njika masih kesulitan, cari petugas [b]c4[/b] di IRC,  [url=http://secura.e-sim.org/article.html?id=4826]cara masuk ke IRC[/url] , \n\natau klik link ini [url=http://mibbit.com/?channel=%23secura.ID&server=rizonbnc.us.rizon.net]komunitas IRC sIndonesia[/url]\n\n\n[b]Regards and Have Fun[/b]";
}