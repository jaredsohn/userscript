// ==UserScript==
// @name           PROHARDVER! design fix
// @namespace      http://userscripts.org/users/20715/scripts
// @description    Repairs the stupid fixed-width design
// @include        http://*prohardver.hu/*
// ==/UserScript==
var DATA = {
	logo: 'data:image/gif;base64,R0lGODlh1QAqAPcAAMXEwYF+dVBOSNzb1Hd1bKCdlbOrjTQzMvjw00FAPlZVU+/lvtLKqm1pXaeii4uGc+DYtU1MRru5snd0Zc/Nx6Ocg2NgVH15aV9dUjAwL+/lwjs6NravkkVDPJiTfXl0YiYmJv/++P/99/3zybW1tba2tv/++f3yyP/99v/99f/88v/99P3zyv/88f/98/30zv3zzP3zy/3zzf30z/755v765/766f755P776v721/711v732v732fj38/b07/f18ff28vXz7v733L20kfTy7PDt5f776/Px6/Lw6b61k/Hu57+2lP733sC3lv300O7s48G4l/310sS8nf7108K5mcO7m/744P744v744f/88FxbVf/77/777eHdzcW9n+Tg0+bj1ePf0FxaUd/bytPNtujk2dHLstbPus3HrLu7u8fAoszEqdfRvc/IsMfApcnBpezq4d3YxlNSTdrTwNvWw5KRiZKQhevo3lxbWMjFucjDrZKPgZ2Xgenm209OSsjDsMjEtIWDfKqllpKOffDnxIaCc9TRxH57cPHu4cjBqOPau9XNsLi4t2ppY8HBv7WzqZ+ZhcnGvbu0nHFuZ/Dr2aSfjLGuokRDQGlmXJ+bjdnWzszLyOPdxKmnn62ol7q3qcO9p7q1o76+vMTDwHp3akhHROTi27Swoz08OoqIg9TSyszHtvDpza2nkfHr08PBu4eGf7Ktmfr37PXtz/bw3Pr25I6JetrXxqyqouPeyebhzb68t+zlytLOvuDcz66qnHl3cvXy6Pv45paUjdjTv9XOtbu0l/Dox6KhnO7o0r66qsrEsfrz2fry1WRiXe7oysjHxPbtyrmyleHd0b+4n/f16+jm4F5cVvXy4ezn0GBfWPz578PAtvnwzv778szJvfv12ywsLPr038vJwszLxvDoy/TryuPfzePfz7y8u6ijkpeUidXQuIF8Z7mwkvHv6f366u/t6PnvzOfk1aeikOPg1MTAr4+JdOro4VpYUFlYVHx4Z/vz0Orm2M3JwPPsziH5BAAAAAAALAAAAADVACoAAAj/AE2Y6CGQ4MCCCA8qNMgwYcOFDiNCnPiwokSLFC9qzMgRo8eNHzuCLBgCSIiSJ02iXKmyZcqXLGG6jElzpk2ZOGvmvKmzJ8+fO4P6FAp0KMofJ5GGUMo0qdOlT5tCnSq1atSr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',
	css: 'LyogY29sdW1uIGNvbnRhaW5lciAqLwouY29sbWFzayB7CnBvc2l0aW9uOnJlbGF0aXZlOwpjbGVhcjpib3RoOwpmbG9hdDpsZWZ0Owp3aWR0aDoxMDAlOwpvdmVyZmxvdzpoaWRkZW47Cn0KLyogaG9seSBncmFpbCAzIGNvbHVtbiBzZXR0aW5ncyAqLwouaG9seWdyYWlsIHsKfQouaG9seWdyYWlsIC5jb2xtaWQgewpmbG9hdDpsZWZ0Owp3aWR0aDoyMDAlOwptYXJnaW4tbGVmdDotMTYxcHg7CnBvc2l0aW9uOnJlbGF0aXZlOwpyaWdodDoxMDAlOwp9Ci5ob2x5Z3JhaWwgLmNvbGxlZnQgewpmbG9hdDpsZWZ0Owp3aWR0aDoxMDAlOwptYXJnaW4tbGVmdDotNTAlOwpwb3NpdGlvbjpyZWxhdGl2ZTsKbGVmdDozMzRweDsKfQouaG9seWdyYWlsIC5jb2wxd3JhcCB7CmZsb2F0OmxlZnQ7CndpZHRoOjUwJTsKcG9zaXRpb246cmVsYXRpdmU7CnJpZ2h0OjE3M3B4OwpwYWRkaW5nLWJvdHRvbToxZW07Cn0KLmhvbHlncmFpbCAuY29sMSB7Cm1hcmdpbjowIDE2MXB4IDAgMTczcHg7CnBvc2l0aW9uOnJlbGF0aXZlOwpsZWZ0OjIwMCU7Cm92ZXJmbG93OmhpZGRlbjsKfQouaG9seWdyYWlsIC5jb2wyIHsKZmxvYXQ6bGVmdDsKZmxvYXQ6cmlnaHQ7CndpZHRoOjE3M3B4Owpwb3NpdGlvbjpyZWxhdGl2ZTsKcmlnaHQ6MHB4Owp9Ci5ob2x5Z3JhaWwgLmNvbDMgewpmbG9hdDpsZWZ0OwpmbG9hdDpyaWdodDsKd2lkdGg6MTYxcHg7Cm1hcmdpbi1yaWdodDowcHg7CnBvc2l0aW9uOnJlbGF0aXZlOwpsZWZ0OjUwJTsKfQojZm8sICN0b3AsIC5tZW51X3NpZCwgLm1lbnVfZm9vdCwgI2ZvbywgI21pZGggewp3aWR0aDogYXV0byAhaW1wb3J0YW50Owp9Cg=='
};

/*
 * CSS and HTML from: http://matthewjamestaylor.com/blog/ultimate-3-column-holy-grail-pixels.htm
 */
GM_addStyle(decode64(DATA.css));

var hDiv = document.createElement("div");
hDiv.setAttribute("class", "colmask holygrail");

var mDiv = document.createElement("div");
mDiv.setAttribute("class", "colmid");

var lDiv = document.createElement("div");
lDiv.setAttribute("class", "colleft");

var wDiv = document.createElement("div");
wDiv.setAttribute("class", "col1wrap");

var c1Div = document.createElement("div");
c1Div.setAttribute("class", "col1");

var c2Div = document.createElement("div");
c2Div.setAttribute("class", "col2");

var c3Div = document.createElement("div");
c3Div.setAttribute("class", "col3");

var fo = document.getElementById("fo");
fo.appendChild(hDiv);
hDiv.appendChild(mDiv);
mDiv.appendChild(lDiv);
lDiv.appendChild(wDiv);
wDiv.appendChild(c1Div);

lDiv.appendChild(c2Div);
lDiv.appendChild(c3Div);

var m1Div = document.getElementById("midh");
c1Div.appendChild(m1Div);

var m2Div = document.getElementById("balh");
c2Div.appendChild(m2Div);

var m3Div = document.getElementById("jobbh");
c3Div.appendChild(m3Div);

GM_addStyle("#top .logo a { background-image: url(" + DATA.logo + "); }");

/*
 * base64 decode from: http://rumkin.com/tools/compression/base64.php
 */
function decode64(input) {
   var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}
