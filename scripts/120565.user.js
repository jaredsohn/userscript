// ==UserScript==
// @name           mysw.info safe browsing
// @namespace      http://userscripts.org/users/424596
// @description    Change title and icon for mysw.info site
// @include        http://*mysw.info/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');

icon.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk1JREFUeNqUVr1uE0EQ3vOt7ZMSRUoIhZMCHoTOsmSXSBZIVJEQBU+QgooqXUoKqnQIybVduOI90kEslDTY4J/L3e1m5pI5zc6NA4w03r1vd+ebn92Ro1+vXsbGmPegb0CPzL1cnb6+ODZ1ufry/J2KX+87jn8H/Qr6yRZZ/hEmH8SBnTz1h4qhHb/JdDwL9j8DfQGa2DxNT5QDy9u1SrD0f1IVd7vq/rc236S7ykKSLp3RcL/YqLjb8xr+xN6u1z9gMueo8362+V2kcrf3buaSdQ2HhVm+b2o42PkZdbtd32g0TBRFhkauiKHgPLR577FzrhoRQ+Vz22q1SiMaCc1RiKjy7sGwNMpHVMs9QmM0ci8Jr2fGqyMXS2zooUZC3o5Go+DgcDgMiPlI3pcp4gu0GMdx4E2WZWa1WgUEiDWbzeqcrENVA0lAG3mh8zyvhY8YOfKYWhkapUrmehv2VwLylhezKAozmUwCg4vFIvgej8fB92AwKM/L22TJaxop/Pl8bh4Tuc5TxkmqW8SjwAjonv+rIAFlQI2AF5eu2f8Iv5qcpBYBFRlzSl7h+nQ6DQz2er1qr7XWJEkSOFYrMn+9OG+326VS+PIWoUE0TCIjDwi0V8x7kpYyLCgSyJTIRhikSJJQVFo98CJQ7fg7kQ+3liKZLhr7/X6ZqrKBgeeYPk4sSfhLvgHsKe+cnIwKj20dew/hlFbNMCO9acDPhdakZFdEg5h3VHqY9F62nYXxc9zpdL6BR0iLfzsOtN6ueLa1Lz3IJeg5fJ/dCTAADerLCxiOYIkAAAAASUVORK5CYII=');

head.appendChild(icon);

document.title = "Google search results for Societe Internationale de Telecommunications Aeronautiques";
