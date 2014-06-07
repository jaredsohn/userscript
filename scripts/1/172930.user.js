// ==UserScript==
// @name        WhatstheCapital_Facebook
// @namespace   flashcards
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @version     1
// ==/UserScript==


if (document.getElementById('headNav')) {

var Qs = [
{q:"Afghanistan", a: "Kabul"},
{q:"Albania", a: "Tirane"},
{q:"Algeria", a: "Algiers"},
{q:"Andorra", a: "Andorra la Vella"},
{q:"Angola", a: "Luanda"},
{q:"Argentina", a: "Buenos Aires"},
{q:"Armenia", a: "Yerevan"},
{q:"Australia", a: "Canberra"},
{q:"Austria", a: "Vienna"},
{q:"Azerbaijan", a: "Baku"},
{q:"Bahrain", a: "Manama"},
{q:"Bangladesh", a: "Dhaka"},
{q:"Belarus", a: "Minsk"},
{q:"Belgium", a: "Brussels"},
{q:"Belize", a: "Belmopan"},
{q:"Benin", a: "Porto-Novo"},
{q:"Bermuda", a: "Hamilton"},
{q:"Bhutan", a: "Thimphu"},
{q:"Bolivia (administrative)", a: "La Paz"},
{q:"Bosnia and Herzegovina", a: "Sarajevo"},
{q:"Botswana", a: "Gaborone"},
{q:"Brazil", a: "Brasilia"},
{q:"British Virgin Islands", a: "Road Town"},
{q:"Brunei", a: "Bandar Seri Begawan"},
{q:"Bulgaria", a: "Sofia"},
{q:"Burkina Faso", a: "Ouagadougou"},
{q:"Burundi", a: "Bujumbura"},
{q:"Cambodia", a: "Phnom Penh"},
{q:"Cameroon", a: "Yaounde"},
{q:"Canada", a: "Ottawa"},
{q:"Cape Verde", a: "Praia"},
{q:"Cayman Islands", a: "George Town"},
{q:"Central African Republic", a: "Bangui"},
{q:"Chad", a: "N'Djamena"},
{q:"Chile", a: "Santiago"},
{q:"China", a: "Beijing"},
{q:"Colombia", a: "Bogota"},
{q:"Comoros", a: "Moroni"},
{q:"Democratic Republic of the Congo", a: "Kinshasa"},
{q:"Republic of the Congo", a: "Brazzaville"},
{q:"Costa Rica", a: "San Jose"},
{q:"Cote d'Ivoire", a: "Yamoussoukro"},
{q:"Croatia", a: "Zagreb"},
{q:"Cuba", a: "Havana"},
{q:"Cyprus", a: "Nicosia"},
{q:"Czech Republic", a: "Prague"},
{q:"Denmark", a: "Copenhagen"},
{q:"Djibouti", a: "Djibouti"},
{q:"Dominican Republic", a: "Santo Domingo"},
{q:"East Timor", a: "Dili"},
{q:"Ecuador", a: "Quito"},
{q:"Egypt", a: "Cairo"},
{q:"El Salvador", a: "San Salvador"},
{q:"Equatorial Guinea", a: "Malabo"},
{q:"Eritrea", a: "Asmara"},
{q:"Estonia", a: "Tallinn"},
{q:"Ethiopia", a: "Addis Ababa"},
{q:"Falkland Islands", a: "Stanley"},
{q:"Federated States of Micronesia", a: "Palikir"},
{q:"Fiji", a: "Suva"},
{q:"Finland", a: "Helsinki"},
{q:"France", a: "Paris"},
{q:"French Polynesia", a: "Papeete"},
{q:"Gabon", a: "Libreville"},
{q:"Georgia", a: "Tbilisi"},
{q:"Germany", a: "Berlin"},
{q:"Ghana", a: "Accra"},
{q:"Greece", a: "Athens"},
{q:"Greenland", a: "Nuuk"},
{q:"Grenada", a: "Saint George's"},
{q:"Guam", a: "Hagatna"},
{q:"Guatemala", a: "Guatemala City"},
{q:"Guinea", a: "Conakry"},
{q:"Guinea-Bissau", a: "Bissau"},
{q:"Guyana", a: "Georgetown"},
{q:"Haiti", a: "Port-au-Prince"},
{q:"Honduras", a: "Tegucigalpa"},
{q:"Hungary", a: "Budapest"},
{q:"Iceland", a: "Reykjavik"},
{q:"India", a: "New Delhi"},
{q:"Indonesia", a: "Jakarta"},
{q:"Iran", a: "Tehran"},
{q:"Iraq", a: "Baghdad"},
{q:"Ireland", a: "Dublin"},
{q:"Northern Ireland", a: "Belfast"},
{q:"Israel", a: "Jerusalem"},
{q:"Italy", a: "Rome"},
{q:"Jamaica", a: "Kingston"},
{q:"Japan", a: "Tokyo"},
{q:"Jordan", a: "Amman"},
{q:"Kazakhstan", a: "Astana"},
{q:"Kenya", a: "Nairobi"},
{q:"Kiribati", a: "Tarawa"},
{q:"North Korea", a: "Pyongyang"},
{q:"South Korea", a: "Seoul"},
{q:"Kuwait", a: "Kuwait City"},
{q:"Kyrgyzstan", a: "Bishkek"},
{q:"Laos", a: "Vientiane"},
{q:"Latvia", a: "Riga"},
{q:"Lebanon", a: "Beirut"},
{q:"Lesotho", a: "Maseru"},
{q:"Liberia", a: "Monrovia"},
{q:"Libya", a: "Tripoli"},
{q:"Liechtenstein", a: "Vaduz"},
{q:"Lithuania", a: "Vilnius"},
{q:"Luxembourg", a: "Luxembourg"},
{q:"Macedonia", a: "Skopje"},
{q:"Madagascar", a: "Antananarivo"},
{q:"Malawi", a: "Lilongwe"},
{q:"Malaysia", a: "Kuala Lumpur"},
{q:"Maldives", a: "Male"},
{q:"Mali", a: "Bamako"},
{q:"Malta", a: "Valletta"},
{q:"Mauritania", a: "Nouakchott"},
{q:"Mexico", a: "Mexico City"},
{q:"Moldova", a: "Chisinau"},
{q:"Monaco", a: "Monaco"},
{q:"Mongolia", a: "Ulaanbaatar"},
{q:"Montenegro", a: "Podgorica"},
{q:"Morocco", a: "Rabat"},
{q:"Mozambique", a: "Maputo"},
{q:"Myanmar (Burma)", a: "Rangoon"},
{q:"Namibia", a: "Windhoek"},
{q:"Nepal", a: "Kathmandu"},
{q:"Netherlands", a: "Amsterdam"},
{q:"New Zealand", a: "Wellington"},
{q:"Nicaragua", a: "Managua"},
{q:"Niger", a: "Niamey"},
{q:"Nigeria", a: "Abuja"},
{q:"Norway", a: "Oslo"},
{q:"Oman", a: "Muscat"},
{q:"Pakistan", a: "Islamabad"},
{q:"Panama", a: "Panama City"},
{q:"Papua New Guinea", a: "Port Moresby"},
{q:"Paraguay", a: "Asuncion"},
{q:"Peru", a: "Lima"},
{q:"Philippines", a: "Manila"},
{q:"Poland", a: "Warsaw"},
{q:"Portugal", a: "Lisbon"},
{q:"Puerto Rico", a: "San Juan"},
{q:"Qatar", a: "Doha"},
{q:"Romania", a: "Bucharest"},
{q:"Russia", a: "Moscow"},
{q:"Rwanda", a: "Kigali"},
{q:"Samoa", a: "Apia"},
{q:"San Marino", a: "San Marino"},
{q:"Sao Tome and Principe", a: "Sao Tome"},
{q:"Saudi Arabia", a: "Riyadh"},
{q:"Senegal", a: "Dakar"},
{q:"Serbia", a: "Belgrade"},
{q:"Sierra Leone", a: "Freetown"},
{q:"Singapore", a: "Singapore"},
{q:"Slovakia", a: "Bratislava"},
{q:"Slovenia", a: "Ljubljana"},
{q:"Somalia", a: "Mogadishu"},
{q:"South Africa (administrative)", a: "Pretoria"},
{q:"Spain", a: "Madrid"},
{q:"Sri Lanka", a: "Colombo"},
{q:"Sudan", a: "Khartoum"},
{q:"Suriname", a: "Paramaribo"},
{q:"Swaziland", a: "Mbabana"},
{q:"Sweden", a: "Stockholm"},
{q:"Switzerland", a: "Bern"},
{q:"Syria", a: "Damascus"},
{q:"Taiwan", a: "Taipei"},
{q:"Tajikistan", a: "Dushanbe"},
{q:"Tanzania", a: "Dodoma"},
{q:"Thailand", a: "Bangkok"},
{q:"The Bahamas", a: "Nassau"},
{q:"The Gambia", a: "Banjul"},
{q:"Togo", a: "Lome"},
{q:"Trinidad and Tobago", a: "Port-of-Spain"},
{q:"Tunisia", a: "Tunis"},
{q:"Turkey", a: "Ankara"},
{q:"Turkmenistan", a: "Ashgabat"},
{q:"Uganda", a: "Kampala"},
{q:"Ukraine", a: "Kyiv"},
{q:"United Arab Emirates", a: "Abu Dhabi"},
{q:"Uruguay", a: "Montevideo"},
{q:"US Virgin Islands", a: "Charlotte Amalie"},
{q:"Uzbekistan", a: "Tashkent"},
{q:"Vatican City (Holy See)", a: "Vatican City"},
{q:"Venezuela", a: "Caracas"},
{q:"Vietnam", a: "Hanoi"},
{q:"Western Sahara", a: "El Aaiun"},
{q:"Yemen", a: "Sanaa"},
{q:"Zambia", a: "Lusaka"},
{q:"Zimbabwe", a: "Harare"},
{q:"Montserrat", a: "Plymouth"},
{q:"Saint Martin", a: "Marigot"},
{q:"Martinique", a: "Fort-de-France"},
{q:"Guadeloupe", a: "Basse-Terre"},
{q:"American Samoa", a: "Pago Pago"},
{q:"French Guiana", a: "Cayenne"},
{q:"Aruba", a: "Oranjestad"},
{q:"Antigua and Barbuda", a: "Saint John's"},
{q:"Southern Sudan", a: "Juba"},
{q:"United Kingdom", a: "London"},
{q:"United States", a: "Washington, D.C."},
]



var overlay = document.createElement('div');

var stylesheet = document.createElement('link');



document.head.appendChild(stylesheet);

overlay.id = "overlay";

document.body.appendChild(overlay);


var show = function()
  { 

console.log ('hallo');

var zufall = Math.round( Math.random()*Qs.length );


overlay.innerHTML = '<div id="flashcard_background" class="flashcard_screenblocker">\
<div id="popup" class="flashcard_popup">\
  What is the capital of<br>\
  '+ Qs[zufall].q +'\
  <form><input id="flashcard_answer" type="textbox" size="35" font-size="14" placeholder="Type your answer here">\
  <button id="flashcard_submit" type="submit">submit</button></form>\
  <a href="http://en.wikipedia.org/wiki/'+ Qs[zufall].q +'" target="_blank">Need some help?</a>\
</div>\
\
\
<style type="text/css">\
  .flashcard_popup {\
    text-align: center;\
    border-radius: 15px;\
    -webkit-box-shadow: 0px 0px 15px 2px rgba(255, 255, 190, .75);\
    -moz-box-shadow: 0px 0px 15px 2px rgba(255, 255, 190, .75);\
    box-shadow: 0px 0px 15px 2px rgba(255, 255, 190, .75);\
    padding-top:18px;\
    color: darkslateblue;\
    font-family:tahoma,verdana,arial,sans-serif;\
    font-size: 18pt;\
    font-weight: regular;\
    font-stretch:wider;\
    width:600px;\
    height:260px;\
    border: 5px white solid;\
    background-repeat: no-repeat;\
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAEsCAIAAACQX1rBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAGOhJREFUeNrs3b9PFVn/B3B2Yy31Y7QnrDWErSFiq0RqiNZisIZoLVm2xkgNWZ8WyWO9JhbfSo29xOrb6F/w/YSTZ75378+59869d+ae16vYICsIZ2bO+3zOnDnzy+n//O8CAOTqxi+//KIVAMjWr5oAgLwrQm0AQNZBKAkBUBECgCAEgAyDUBICkHMQLixIQgByrgi1AQBZB6EkBEBFCACCEAAyDEJJCICKEAAyDUKPTwCQd0UoBwHIOgi1AQCCEAByDUJJCICKEAAEIQDkF4QL5kYBUBECgCAEgAyDUBICoCIEAEEIABkGoSQEIOcg9PYJAPKuCLUBAFkHoSQEQEUIAIIQADIMQkkIgIoQALINQlEIQM5BKAcByNivmgCAvCtCbQBA1kEoCQFQEQKAIASADIPQ3CgAKkIAyLYi1AgAqAgBIEseqAcg84pQSQhA1kFo020A8g5CAMg5CCUhACpCABCEAJBfEForA4CKEAAy5YF6ADKvCC0bBUBFCAC5VoTaAICcg9CqUQBUhAAgCAEgwyA0NQqAihAAsq0IlYQAZF0RykEAMuaBegAyrwi1AQBZB6EkBCBjpkYByLwi1AYA5ByEnp4AIPOKUBICkC/3CAHIvCJUEAKgIgQAFSEAZBiE2gCAjJkaBSDzilBJCEDOQeh9hADkXRFqAwCyrgglIQAqQgAQhACQXxCaGgVARQgAmfJAPQCZV4RKQgByDkIP1AOQd0WoDQDIOgglIQAZs1gGgMwrQm0AQM5BaK0MACpCAMiUe4QAZF4RWjYKgIoQAHKtCLUBAFkHoSQEIGOmRgHIvCLUBgDkHIQeqAdARQgA2VaESkIAsq4I5SAAWQehNgAgYx6fACDzilBJCICKEAByrQi1AQA5B6GnJwDIvCKUhACoCAEg14oQAAQhAOQZhKZGAVARAkCmPFAPQOYVoZIQABUhAORaEVotA0DOQSgHAci8IgQAQQgAeQahqVEAVIQAkCmPTwCQeUWoJAQg5yBccJMQgKwrQm0AQNZBKAkByJjFMgBkXhFqAwByDkJrZQBQEQJAptwjBCDzitCyUQBUhACQa0WoDQDIOgglIQAZMzUKgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFgBv6+JggByNfPnz8FIQCZ+vDhw+fPnwUhAIzihiYAoNE+ffo0zperCOEfvn37phGgWX5eE4RQjfPzc40AjRu/jjOEFYTwD+MswgZmUg5eXRt5vYwghH+k4I8fP7QDNMjBwUHbB4IQRvft27cvX75oB2iQ4nbGhw8fBCGM6+rqamG8J3OBaWq7Wke7eAUh/L90g3DMpdjA1Ozs7LT+8cGDB4IQxpKmVjxBAY1wdHTUNh365cuXvb09QQhjlYNhnL2agGkGYecnz8/Ph137LQih/aKKC8ltQqi/27dvd/383bt3BSGMUg4WcyyRgmdnZ9oEau7OnTtdP3/z5k1BCENIdwTb5lhOTk4W3CyEPAhCBOG31nIwubq6iqJQEEITK8L5D8KR9w6AriICe91yH/n5XGAK9vf3l5eX2z75/fv3+Q9CK/qovCLsGnjxSRUh1LwiXFxczK4i7JzCgvGDcIT/BdQ2JuY8CNOidkvbqVCfoZVRF+SgYUGY5kWbuAPWmO+NBKBXKIzpRrN+5xSBMU7//fffG/Rjn52dPXv2bOH66ZbffvstPmj9+eMzfZ56ifjsPNLRDvH5+MLnz58P+8QMwNzoLDBGKDkaFoRpqqpxFWHrk9rp40rm3OKbbG5uNmtMADDpGjE6xqG+pElTo3///XeK+sbdubHmAqC2mhSExdsXIw7fvXvn4AHkbIQFos0OwrbwE4QAVKIx9wifPn3aegs0qsP9/f2q9teZoWL5zML1w6EhLYSJP/748ePLly/OUYChysRIh3kLwkiFSMHLy8u2zx8cHJyenjbuIN2+fXt7e3ttbW1xcbGIwP6/fkTjt2/frq6u4oPPnz/HB851gIwqwq4pGOKTDx8+PD4+blZdGDE21GglSsbWdaGRi0tLS07cCodZA/+CB1SgnqracbPu9wiL5w26iv+VXpfTLOMsIm3iZgJ1NvBm+8XFhVaChg5k5yQIDw4O+v+q7969q/+OLT9+/KgqCNtGQB7MGHMsMjAIi3GYpoZGGOH5uvoGYfQ7Dx8+LB6Z6OXq6mpgWM5c25qXccr5tu7Y/cIxxxMDg7BYn+y1JzCv6hiEkWpHR0cbGxslgz3Ccn19vaoHSqZZjoxfETJOM8aZNnBdbvHczvRbPs6Tvb29+o/zoIl9aa2D8OzsbGVlJYJwqIs/CqOtra2oIBsRh+N0qYKwEulWa8mzJf21aZ5acRXs7Oysrq7GIO/169dxRTTxXjg0JQjrtWo0xr8D50L7iAoy4vDx48cvX76s88EbeYu4OOqKg6rGIrdu3Sr5l19fm8La0Ti+EXhxCbQd5fjj4eFhJHETnxeCmQTkUE8T1KUijEu9zB3Bkt1WfKuaB8ZoAxnrNao62Ua4txpfNbn2j5CLkzZKwDh7e526l5eX6kKYRFdZiyCMK//BgwcVbqUd3yq+YZ2zcLQZTu+JrSp1pvyFfbx7925lZWVra6vMwT06OjI3DpWrRRDu7OxUvpdYfMM6Z+Fo3ZmHCKvKnmketf5V4O7ubvnyNO2y5AjO5dnVoPqp6R1pHYNwb29vQoVOnbNwtNpCNTAfFWGckwcHByWrwM6z2mlQZ69evWrczxxnY0Nbe04eqD86OqrkvmCfXqOeI+gR+rK03aiOZvyWH7kZK5m3SHOhr1+/Hvk7nJ2dOY71FMP6Jm6Uf3l5ub6+Pk9LEIb9XWa5ajR6hAjCKRzjGO/UbR1pDGSiRy6z6bZysCblYPHlrVu/DnvQe22cO+yFU/N10bmJIxuDm6I6qfBecsmt+SupGVZXV+OD/WtNPyLDDnZnFoTRrcfoaTr/Voy+42Ta3t6u1aH69OnTUKd4g3YMqLNZlVNx+HZ3dyuZyYmLfNhRFBN18+bNzc3NYnJra2urzj/t2trayP93Xs0mCNPQeJp37w4PD+/evVurvuPDhw9DZbMgrGrkO+YIfYSvOrpW4W8RRaEgrJUGzSvOzeLzCtt8NvcIX716NeWZ9OlH78CjNVSwldkMjCkYNn7SA7KV3wLwToxaiWt5btJloos2BOE/TppxVgqMUwrMZEFXr6N1dXVV/kAqB5vo8+fP6+vrk+gi42S2u0J9jvLu7u7c/DoRhBmuxpp2EMYAeWq3BjtFANfqKZ/y8SYIm1glRC04uYW+TXxebS5TsP77WA3r2bNnTc/Ctjff1S4Ioyab7TMAtdrLv3xf1utvCsh6in5ka2tromeahyikoCzsc2jqG4Txw81kUrRVxHB9nngtOWk2zqNvMyxzs90fPHqQ6Ecm/a98+fJlZWVlZ2fHPuyzOsrzmoJFFk7h8baamGoQ1mT/ggjjmjyTV7zrrmS0NEIc5eig04v08qwSDg8Ppzaqu7y8fPDggViaskiIyIm5H4LErxkXcm1/zQrvvk8vCKPHr8/Cqvr00WWCsFlzFE+ePIkO+vz8PD7IrX+MLmP6JZrlxFM+xJNYBlxbcSHHSKtxu3nU9+0TtaoPIpJrUmYNDMI4BZvV092/f//mtQwfdIuT3DZ4cyxtj5fbS2Ci/4nsb9YrwIa9DKcUhJE6desgajKmiwFm/4Kvcbes0y4bt2/fzq2XjJO8Qc9gMWyFEbV+VXsDNbEOPjw8jDis1UM7FRYzUwrCGnYQMayrSb3fp3Hi/Gti3/ro0aMM5+vymS7LLQPiyG5sbIy/SWzTRZ+5uroardGI0cBQ3fuUgrCezzzVpNjqM097cnLSxBFoOgWzeuI7fmWvTZ4/0UWsr683peuf2oAv2qQOnWf/HmaoRwmnEYQ/r9XwiNZnNWbXYiIarVnz8m0Nm9XrMjzVN38HdGVl5dmzZ276doo2iZaJ9pntad//0Aw1EJ9GENb2ver1mb6LYqLzlHr16lVDx6FpEil+o3ye97ezwXxIE6EicNg4nH5PNTDnhjp81QehnZ9Gc3h42FpCxbk1880HxjwBIg63traWlpZyOHyzHVTZd7SS83Zvby9O1whCEThCHB4cHEzzPBz4b82yIoyTqT77toxmVluhFs8nRW0Rp9QUtiYZ8yzsPM9SBLaNhLoui51hx/3o0aMxD1MND8edO3f0yOXFVVacpelyi358d3fXot9xrosYuK+urq6vr5+cnLRe4BOaPq02CCt+H2E0QdoXv6FXZlqlGX3lyG8hH/Nfb8rKw+g+Iqpv3759enpaPC94cq3z1mB0Oq1vXkyRHy18fHzcuMyIX3xzc7Ptk9O5G3rv3r1ouq5LcuKnmskZ20RxsNKt9zhv42OrYCqfGjm8try8fP/+/egi0pi+8veiD6zah7oqqwzCOL3SVRq9eWsfV+dTLX62mzdvtg1e4uevsFuZy2mru3fvpnPx6dOn79+/Lz7ftZu+vLxsbec4T+ILZzWFPubNvK5BOOxW98OKpnvz5k06J7tu9Ly1tRUx+eeff7aezJmLa7kY9MTpGpdhHKY4P4uV2Fb5TjoRi/sFaTu6areaGrj0ZKjcqWxqNPq1YovFKKpae/86rx5sa800VExXy9RGLk1UVIFxrpfZM6iInzgxUtuura018RfvmqMVjnW6bkSwv79fjMyi5bvO7sZow8rVVtELbf3X0tLSxsZGfOBBiFmJdIij8LDF+vr6rVu3Rk6HMsex/Ki3miCMX6bt1lrrH+u8oK61C2u9SR6HTbfSX5Fkr1+/vnWtzxD77FqcFUU109CpvK7DmkrGOpF2X79+/fjxY3zQFo1tQ+nFxcVeg1GnZcF907pJE/uFVC+OvBFjmYK+/Ai1giDsOlcTP2XKwpo/aFz8bMWdg0KU81k9CTdRUa9Ee8YgvciMWbXtmItlXrx40fnJ8adG96+lic34oLUu7JyJ7XMyK3cEYYOMvBFjyYQrP0IdNwhjmL+xsdH18oteb2VlJTKy5vMnf1/r+mqx+GTN68IZDjLG/Kej5WeShWPetO/65cP+IsvLy22faav5WjvxXvVfVxcXF7rXYgDhjmnNjVwOlgzC8o+wjxWEA19AGoFc/yFquovQ9eeMTzb9Tc21NU+vpxjqHmGUpO/fv//Pf/5TxOHa2lqfLnuoVrIApLXdWhuZuknLuyY6Ci8/Qv11nIu/5s+6VUUWVi66p3l6W2H5GZgIvJcvX6ZuOn1Q5kvK/yRuE7YV1jHmePHihdKwboPgN2/enJ6ejnxcajQ1OqsHz2fi8PDQ5h1txnnR0vPnz+cmCAeuBWst+LrO13Xezeo/ku0z4fPz50+bvbWJMy1Kw6g/NEUdPH78+OPHj+XvfA97CQx7eSYjPkcYqZDVJEx61H0mD4DXVgzoNjY2Rvvak5OTKLLTw4htiyQbp/8IKe05EFfj7u7uwj8fGilm4zuDsP8Nhf7/d2trqxh3p2nV+CBGHqNNRKcdHlrnse9ca1xpmI5C0ThMX4xFXr58WcnJU35Hw5IFzI2ul9nAirWhb0UYx/n5eRzFnOdY0pPIFxcX4++rmUZRaW/uGLA3ulX7jwi3t7dvXkt/TNlfpuzrFYExFi55bbduQxMfFI/kD1Xs9t/qqMj1iMm0qCc+SL9s/KZ1O6w235n50LmS71PmweXWXitOxYGjwBudp35cnwOnrfK8FRFFzMCWidZr+hqQ+BW6Pg9QbJhQraWlpfTwQEOnCjqvhfhd4lRJ9ydSVBQrP7ueG/0nmSPD4p/4fG3kpWfxhVEMvXjxotoZ6dag7R+WRR2Z/ljDmKQRIgWHehtBjNofPnz49evX4YIw6p4YcnZeLa1lYlyQee7OHv3RwH7k1atXI09DjWlnZ6ehL9GOUVufqfzxB/LR+U6oGuh8VVZcJhGE8eukaySVgGlg0RZ4xa9cTBalgq8tVCrcfja94WTKExvp1+malMvLyzFESNVkHKPKJ11Te6YBhFunM5cOwZhHeYSutcyX3Ojs6+Ok6dw1O1Wj6SZZtivT0gPLqRNJ3V9nhxJRFFf1TO4mbm9vNzQIe+0lPbDaKCOO0YQW5sRl0jk4bb0L2DoputD7Ee/za0V2TlT6hwb2RNPZjTrNsbce32iuaMAYPWxubpbpvzovwzR7n2pob1OqldYbtGkMFMPTOMrx3/Ijs+jlhn1PVpnZphudKdhZ+sQFn15QEj9unKBNeUPCJKTZ0WilBw8e3L9/v62Ju76HaGri0ETN4eLvvAwmVAB1vRBa7wK2deVF/MQFlXrqIpym2SBX12o7JLq8Fm2bepuk19+PyzDSNE77om09SdkIbWOge/fupVBMn/zx40eauug6GIoruvyTeyVng2609fJFDdsahMUFH+PfzF/ZlV5MEfVxHMjoTdoWeqQITG/gq/y1IyX7EddYZ0U4oe/cdcTTv45Jy2Vn+xbfBs0TpFo5juCjR4/iWmsrZKObSi1Z52injDT6aftkdLNv376dzg9wY+G/22y2PhHR+t6cohzU1S789116qRHiv9FurUVh0TPG51PhP+UVAYKwawE0zdZORzxdSsVQNJ0Y3vs6cju/vhaj+9YXcTDfehX3QxX9Jf/yryl44xJt+4KlpaX0SoHV1VWHpFf3V7zbLI1Pi49joLq7uxttaKeP3LR20zGIPDo6WllZGWqdG306ta2trRiJplll22rnadh1T2U64V8165ihWIwYuj6r6/0Vjbtsyuv62EOaGE8fx/hy2Bv7lInDjY2NGL4vLi7+8ccfGmRePX78uGuP2nlBff369XuLXsuz+7ihuSdt0q8vL5ZdlN92KCvROKnTTNujVDixFhVJ5zUZ9Z8J6imIIjvO/OPj4zdv3sTxNdqYvxTsuhlvZ6q1rc3uvDDjPBm4r68gnEZHPNHvn/buok/VXsxMxlDx48ePk/7ntPl0RGe3tbUVRWEc06jCO+/v0ET37t3r8yh25zxn59+MwW7rmRDnSecDgYKQfE1oXxVmKL1AO4b829vb6cH5+GP819FpkPT8aATY5uZmn8Tq+sBxZxB2fmbgXiiCsPHiBHLNl7zYKnymxd3f+oiKP/q+tK1reu5wf3//1q1bWqYRvn//XvJvdr3b1xmcnZ9peyCwk8UyjXd6eurto2VS8Pj4uMKnWdyRrRUvSstBySd3Oz8zcMstQThZU9jhMDr3f//735q6v0jBMV+BpiKss667n5NDd9p1KrV1p8M+ISoI5+rksJH/QNWmoE2c8xx0MkO9No/tGoRdZ0cHBOGk1/fDbPV/z9EIKZi2uNSwdeso0wfpuV4N0hT9Xz7TP8k6K7+kc3Z0cBC6pJlv1W5BEtetS6aGPErYUIeHh2WW+5WfF+0ahHHN9rmLbGqUvMqF8ZmCqy2HZo51XfDSKwhbXwJT5vQQhPMg5xdjlRHjzWKrdOaYhaPzqtdSl15Tozdv3uy8IdJnvYznCOfBkydPPn361NC38k5BXBVv3761pEjdz5zV+l13eO4zIFYRznlHf3p6qh16+e2adhCEzFlFOJQ+i71VhDCcO3fu2MqnnhyXOVP56t9UQXbuZaMiZP65dZQP62WaqNoHnEagIpwTZVaC/PXXX61D5oiHXu9MX1tbe/v2befnHz582Dno7vWXSw7x9q+VHw92/eeOrvX6R6tdWC9WFYVUa+bvWBaEc6LM1pe/X2sdO/cKQnS1DXVxcaERGJapUZ1mfdVwnaeZt5qz1wGCkJ56PXDT1cxnKpLySz2H+u3GYWdnaPqgs/M7/+qGx3yo9jgOFYSNeDKhqoX1ghCmY3L7hHR+Z0HYmC64vxHWg1T1gy0uLtb/KFS1s7wNLWEKTk5OJndfKb5zfP/Wz1gsM3G13dnLlmNAPbumocrB1jsjUdqVGa3G99/e3i5WIQjCXAy18GTmj/UMq3U1LNBoT58+HThMjw7t0aNHEWadt2biay8uLs7Pz/vUlPF34l8pNuSyWGZODJzi7rodey81WSzTlddnwhx79+7dwG2TIwI/fvz48uXLrgsUIiMjIN++ffvXX3/1GdPHv3J2diYI8wrCuTHa+ni7UEL9RaG2t7fX/+/88ccfx8fHZaa4fv/99/fv3/dZUn54eJh6TkEoO3O5wBxxqLmBk6KRglHtlf+G6c0z9+7d65+7glAQdlHnqdFepvYoITAJJycn/SdFI8+GSsHCn3/+uby83PV/ffjw4ejoSBDOiYFTf0M97TdUEEogYPxxef+VolHbRZ6N9s37f60gnB9lFllppQV7pEEt7ezs9O/Enjx5Mk4nFpXA48ePe/1fQUh9DVWY9r9IUv7Ff62agbqJmmzgIrgIwjH/lefPn/fqJX7517/+5TAAkC0VIQCCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIASAyfs/AQYAjrv+JQzGLLwAAAAASUVORK5CYII=");\
    background-position: center center;\
    opacity:0.99999;\
    position:fixed;\
    top:50%;\
    left:50%;\
    z-index: 999999;\
    margin-top: -130px;\
    margin-left: -300px;\
    scroll:no;\
  }\
</style>\
<style type="text/css">\
  .flashcard_screenblocker {\
    width:100%;\
    height:100%;\
    background-color: rgba(59, 89, 152,0.8);\
    position:absolute;\
    position:fixed;\
    top:0%;\
    left:0%;\
    bottom:0%;\
    right:0%;\
    z-index: 900000;\
    visibility:hidden;\
  }\
</style>\
<style type="text/css">\
  .flashcard_submit {\
  border-color: white;\
  border-top: solid 3px white;\
  border-left: solid 3px white;\
  border-bottom: solid 3px #666666;\
  border-right: solid 3px #666666;\
  }\
';


document.getElementById('flashcard_submit').addEventListener('click', function(){
  var answer = document.getElementById('flashcard_answer').value.toLowerCase();
      answer = answer.replace(/^\s+/, '');
      answer = answer.replace(/\s+$/, '');
      
  if(answer == Qs[zufall].a || answer == Qs[zufall].a.toLowerCase()
    ) {
    alert("Good job!!!");
    document.getElementById("flashcard_background").style.visibility="hidden";
    window.history.go(0);

  } else {
    alert("Try again!");
  }

});

    document.getElementById("flashcard_background").style.visibility="visible";

var answertext = document.getElementById("flashcard_answer");

answertext.focus();


    };//ende show-funktion

console.log(show);


setTimeout(show, 60 * 1000);

}//ende if headnav 
