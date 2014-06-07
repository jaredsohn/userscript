// ==UserScript==
// @name           LayarTancap.com - Direct Video Download
// @namespace      http://loucypher.wordpress.com/
// @description    Add download video link
// @include        http://www.layartancap.com/video/*
// @include        http://layartancap.com/video/*
// ==/UserScript==

(function() {
  var flv;
  if (typeof unsafeWindow == "object") {
    flv = atob(unsafeWindow.v_data);
  } else {
    flv = lyrtcp_atob(v_data);
  }

  var url = flv.match(/http\:\S+\.flv/);

  var img = document.createElement("img");
  img.setAttribute("border", 0);
  img.setAttribute("align", "left");
  img.src = "data:image/gif;base64,\
R0lGODlhJgAdAPcAAAo2Cgo5Cgo7CgdeAAJbCghfAQJdFwJjBgpmCgpnCh9/OxlpTUdH\
R0pKSlNSUlZWVmdnZ3JycnR0dHl3d3p4eDh/nwKRJwKUKAqcKSCBPSCCPSCCPiuhMSmm\
NwKjRR6oSBWoVUCpL3OxGna1HmCwKmK3MX66Ik6wX0m2dEi8enSjeWHHimTEkGnHkWzJ\
k27NmHTKmXvJn37ImH7InX7Po4SDg4iHh5GNjZKOjpOPj5SQkJWRkZaSkpeTk5iUlJmV\
lZqWlpuXl5yYmJ2ZmZ6amp+bm5WslaCcnKCdnaKdnaKenqOfn6Sfn6ShoaWgoKWioqah\
oaaioqikpKilpamkpKqlpaynp6qoqKuoqK2oqK+qqq+rq6+tra+vr7Gvr7Svr7Oxsbey\
srizs7m3t7q1tby3t7q4uLu6ury4uL25ub26ur66ur+/v4fLnpLPpZPXr8C7u8C8vMG9\
vcK+vsTAwMXBwcbCwsbDw8fDw8fHx8jExMjFxcnFxcnGxsrGxsvHx8jIyMrKysvLy8zI\
yMzJyc3Jyc3Kys7Kys/Ly8zMzM3Nzc/MzM7Ozs/Pz9DNzdHNzdDOztHOztHPz9LPz9DQ\
0NHR0dPQ0NLS0tPT09TR0dTU1NXV1dbW1tfX19nW1tjY2NnZ2drZ2dvY2Nra2tvb293a\
2tzc3N3d3d7c3N7e3t/f3+Dg4OHh4eLi4uPj4+Xj4+Tk5OXl5ebk5Obl5ebm5ufn5+jo\
6Ono6Onp6ero6Orq6uvr6+zs7O3t7e7t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb2\
9vf39/j4+Pn5+fr6+vv7+/z8/P38/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAACwAAAAAJgAdAEAI/gCjCRxIsKDBgwgH+tCkaVOnTqBAVZhI\
saLFiseUMWP2DBo0MQOl4NrF61ewYRWiWdSQIYOGDRkUWFRpUM/ACEtKJSSYp+fOgbnG\
RBgo6YqgRIoYMWpUqRImTZw6fRpF6lSqVaxcwaJVC5cuXr2ABRM2zBCqgUWurmrlKlbK\
i3Ar0iwYZ+AWY8eSaXw2kSACF29WYOgQwkQCgn0LHirIrIsEBpAjS55MWXKELswMEnsy\
5QwgQUeVUqp0qWFUUKNMnVK1ti0tW7VC3UFzjCAPRY1GX3oadWrVq1m3dv0a9iSxYsaQ\
JUP2ZaAQ1KlXp1QZ96LA6QTLDGQCK9ZrXLze/laHO5cgnYFWgJEtllc8xQMvYLRI4eHA\
TOwD/wwMcosjtIRGAHBCCSIEYMRP0RTjxUDMQNAABUisAYccc9BRhx147OHHH4MUcggi\
izjySCSTTGLJiZmAUUMDEGRGUDOQYJHDDTjUqMMOO/DQgw8/ABGEEEMQUcQRSSjBhBNQ\
UKGGKM8U1EwTXAQCGlJLkcYbRFRZhZVWXHkFFjCOpNGkQFiwoVRuVkIlVZbAcTncl2MN\
g9ws5wnUQ5pqovZba97ZMlJJ6g1DDF7KLcNMM2EMBERvqJmSGIIDTdSMRwORMdAQVa22\
lnvjyYWfQGsMlAQrbPXJaad9fRrNHANB8d0uemGdimp5A9kxUBWACjPoqQPM4IYMbaBQ\
wH0G8TFQFoImlwwz01V0QAw0gHCBBfZRdJ1BhAykhTHLTnpdRQsYwMIHHJAwAgELzFSQ\
M30MNEEm//2kggD0qgDpKzYM1IUDUXjiC6QIFiOLGQ90QRAvEFSm8MKTQcDLQAEBADs=";

  var div = document.createElement("div");
  div.className = "text_corner_R";

  var link = div.appendChild(document.createElement("a"));
  link.href = url;
  link.title = "Download video";
  link.innerHTML = "Download<br>video";
  link.insertBefore(img, link.firstChild);

  var reportDiv = document.getElementById("show_report").parentNode;
  reportDiv.parentNode.insertBefore(div, reportDiv);

})();

