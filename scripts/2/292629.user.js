// ==UserScript==
// @id             iitc-plugin-sh-enl-target-drawer@Breezewish
// @name           IITC plugin: Draw Shanghai Enlightened Target Portals
// @description    Draw target portals by SH ENL
// @author         Breezewish
// @category       Layer
// @version        0.0.3.20140213.210000
// @updateURL      http://userscripts.org/scripts/source/292629.meta.js
// @downloadURL    http://userscripts.org/scripts/source/292629.user.js
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.enltarget = function() {};

var jsonp_url = [
  "https://gist.github.com/breeswish/3274fb918eae2abfd2fd/raw/ingress-sh-enl-marker-mh-hs.js",
  "https://gist.github.com/breeswish/29e79cab8d34ed9d1f57/raw/ingress-sh-enl-marker-guardian.js"
];

var url_marker = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAAxlBMVEUAAABgYGBmZmZjY2NjY2NkZGReXl5dXV1gYGBjY2NiYmJpaWloaGhdXV1fX19eXl5hYWFdXV1eXl5fX19fX19iYmJubm5ubm5cXFxpaWlqampeXl5nZ2dpaWl5eXlmZmZycnJ2dnZnZ2dvb29tbW10dHSBgYG3t7d9fX1sbGy7u7uIiIh7e3tiYmLBwcHJycmEhITFxcWPj4+zs7OsrKxgYGCurq6ampqjo6OTk5N/f3+oqKiLi4uWlpbDw8Oenp69vb1fX18NGMfXAAAAHXRSTlMARjncHG7uBQ1aq+0rZN51FH74UcaAiVLRnfzD+Kaq0esAAAIoSURBVDjLbZKJbqMwEIbdpklz9L6rlcdjbGzAnIEUEnK+/0vtbJO0dNNPYoz88WuwPOyLq9f+S//1iv3P+ctEK1R68nLOuly8az8weZ6bQOr3i06A+4Y2gzggbXx+dhSvHPIAINhEzb8lBz46JHRsAGAepUUarejNxPyz2XAiSbhyvclTV6flkpScDMk8KwOLtqioFjmYqmgNGPXM2J0XB/PULqWUQWmoujJdBbG4YCO9kFEDEogYCAlNJBd6xMZ+4Ntpnm4jG0X0bFPnLO2NWQ/At3O/zIqNc64uMiun1gfoMQGAZPKi2lau3VaF86cWAQRLQJJBbKugyj4WVYVIRkLCenJvYL30U3BFvDeyx8YIyk7RmVUUbBd2EzhcWgU4Zn0OWNZNMceosU2E06JdlQi8z64SQJtVRimXFdlUqUWVWYSErvBJy7popVKK/oCqbLJa6j+MsZEAZcq0Rh2sjcZVWhoF4pHM8AExDJdRtNSxdjaahqGPg0tG3HtShyHW6Yer1hv6Sktxux+CGSIPQw7tuopp5Yi7wyg8C8k7hFLcHydnh6pjlNrdsQP3wu8Yn7ocudsp5R1R+mHIvrgVyA+CY9L/FnQmrcUerQcU+aafoPcpPEyuWZfhgOt9hNPxf3CdqE+jkhH7yeWAh4lIQn5DkZ+MEi0SoU8iFLrx+Ix7FDnhccYFn9G9nIbehPbeKHLK2YzPztivPM2eqP4e+j1Cna67Xf4CayhfvijWDUMAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAAyVBMVEUAAABbljlblzlhnz1YkjhYkTdYkThZkjhclzpXjzZZkjhemztemjtioT5YkThUijVYkThYkThZkjhlpj9emjtmp0BprEJoq0JkpD9YkThioT5mqEBnqkFkpT9xuUdmqUBprEJkpD9sskRyuklkpT9+wFhioT5fnDy+36vE4rN3vFBhnz1ttEV1u0yHxGWDwl5alDhfmzvT6sey2Zxqr0PP58GNx2zJ5LmTynPM5ryf0IOZzXym04x6vVOr1pO73aeu15e43KNlpj8sQlC2AAAAHnRSTlMARmxcVNnuBw0WxtyrK2QDdX74IIA8iVKdNfBy7uONfM8mAAACLUlEQVQ4y22SCXuiMBCGo1ar1t7ntruTIYeQcF+iqKj//0/tbGml7fo+DwTm5cuQADty+fz29PZ8yX7y6+kPR4H899Pjt/r9Cw+s1rHWFvjLfSceVaCpaENraQxU71M8KxnbUNrabKwMbRyqwUcLHupQyqWpysospaQ7573Z+BW0hGi3qnUV19UuAqnhdUzmAbXcNmWuYVvGoPdlo6XGB8Ym89AuKy8CAHvQAJSuljb0J2zAt2A2VJHUQRIAGwNbPmCzwAbeIq6M8cz7UUWRR7UZuwAZeMvgkJV1HMd1mXmw8AIJF8yVIMjEZW72cWPyMgoWngDpfhghmtzmWb7d74VoDc3WGrmKgkrGZdgamm1WSPQWRazXxpqtV9tIRB7KYsb6jix26025LMzG2xixKJv1rgidPrtMabYs14hRVmYLxG2e0WwpfcIpwrpsABHpDegMm6wGnNK+nbmA+lCtBdqVxmJdHTRK94zM+E4IziNjIh7yyDMLzgMxOmfE7Rw45/RwHuerWtA1+DftT5AIoThXslntQxqVEMmEvfPgg/oCB/eWtUySAp0OxM8IdXIDdRQqcKnLMYQ4/wTxbsyO3LjC+RCOSPudoDVx7rcgH1Gko58Wc5fq7lykV+wr45Hi7j+4apffcZWiT8LHdMC+cz5yeOqm3Bn+iNCWp9xNXZ7SJv8MDecqUfPhNfuPs0T5KukiHddDn5+KEL1EJT12kmkyZafpUeQ051df1/IXN21kjxRPQwoAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAA21BMVEUAAACEly6Bky2OoTKBky2KnDCClC2ClC2GmC+AkS2XrDSKnTCJmzCDlS6AkS2DlS6Bky2Bky2DlS6UqDSJmzCUqDSZrjaDlS6RpTOUqDSPojKWqjWTpzSQozKmvDqTpzSarzaXqzWgtjiKnTCeszfU4JmtxDyxx0eUqDSluzq0yU2JnDDY46SEli6vxUPd56/W4Z+bsDajuTmqwTy4zFm7z2DM2obg6bXN24q/0WjJ2ICtxECovzvE1XW2y1TR3pTb5avC02/V4Z3Q3ZHG1nra5KiMnzGSpjOTpzSlvAGoAAAAHXRSTlMAckZcyS5nBQ0WT9yr3n748FhRIIA8iemdcvDu47wJMjMAAAI6SURBVDjLbZKHcqMwEIbls524pffcqY4QSIBoNuBeA+//Rrdpdpzkm9HC7Df/rDQS2tPuPd0/9droO+37f5xJxv/e3x31bx65UNZ1Xas0f7w5iDsqLDRVpkBbQXufokeJq2ZEzTdzRWbKndHmxwie2RkhoziIgnhEyMxm9duwzrO2hJjlau4GZv2yXBBi9XMHzC2zZDqJSqiRS2weTSyx7BahLs7UKHAWWmu1tVDNMhipDHdRk091vCMpATJY8DeP9ZQ30UAo4QzdIIidOIYVBMY40BugPiHCGYltEc2NMeuocNKhIwjpo+rduFEZ5GYS5JERb6YCk0owYlKqsiineS7k0JEpmH6qwUhJVgvxQkyUyVej0z4aJIQ5w8TYcayCqbNWRi4cRpIBatQkWY530SjZ7JxdLIfRZLxMZnUDtX3YQVFaxkwRFUPGpnkBO/DhCltcj6OJZozlRQk1nRdrzVsIoauKMLsNxpKrleXJONhaRqprMJ0LKTxvsdkseMaNEw89T8jLUwScY809Lxm/lCZfraXncY0b748glJJ6HiWTVZ7Bl0oZdtEbtzilX/DS6hy90w0TVh9g7DMCkypB94KKCqbsQ4zhTxi/6KA9jUrUH6KW/slBwJk4/zCcX0LkwImf4ApjWMcRCF1SXr3C6QMc/zjEMAjM/CY65vSh9vzK9+oziBxz5fPKr7h/hb5zeoZpSDFEfnAdUnBwLz9DLcxxCyI/+RPS8A/6lVbYgvp76PcITDr5OuU/fStqqnMPXpEAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAA21BMVEUAAACvniK5pySqmSC0oiKpmCCtnCGpmCCvniKtnCGyoCKolyCqmSGolyCxoCKqmSGejh6olyCqmSHBriXBriXItCbGsya0oiOmliC+qyXDsCW7qSTDsCW2pCO+qyXXwinEsSXQvCjXwizItCa3pSO7qSTYxDTt457u5afdy0jYxDCsmyHbyD+yoCLaxzzNuSfLtyfx6rfv563ezVTh0Vzp3ovw6LHt5KLi02fr4JLZxTfn24HGsybl13TezU/byELz7cDy67zs4pnj1W3o3Ibm2XvBriW/rCXArSWXpd8TAAAAHnRSTlMAbFzGLu5GBQ1/q2TedRT4GFhRIDyJUt3RnenwctnReCqnAAACO0lEQVQ4y22Rh3KjMBRF5ZbEzqb3sjwkgUAQRLHBNsjdntH/f9E+sk6IkxwGGN7hcgeJfNK9f717ve+S73TvnjWnXD/f3R7Mb540Fept8aYE6KebRtwaqnAoAoFaUXP0Ie4NW4iAidl4JlggFoFp7yt0oALGRn62yvwRY/hkvZedvIBiINfF7C2Tm2I9B6bg5QRNnytWVmmuoEwXoLZppZjifULO3UCMMm8OAGKqADCdjUTgXpK2LsHf4YRhA0MAZj6Uuk0GVFBvuMh8f+y/n5mUHs4G5C8w6o3odLmaSSk36dKDoUcZPBCHQW0Wae5vZeXnqaRogDm1idHQKhf5alputxRNXJsHqE1MWTGnBZNpQOPa4NcGCePeMJFq4gu/HG+EjOceZ8mAtCyWrCe7dJSMd97Op8O0mqyTwGqRbgTUW+aKc7lKl0POy3w5phDhFnY0TFYVcM7z5RSvMFttQHdw3a4c4GqaTagWhdLJJJsqzpzreq0vKLXt+Xg814GWnj+0bRr3jgnSd0HbdjIppjIvNviWBveM1NyENDa2bVhVbAO8GxqHl4TsQ+YLNjh98p/LMOFWA+fhOdnTd6j5FIY62LLnPOTc/YDrixPyyZlDrb2waNRqBP6T1nujdQ8jDa0ocZ33I45OCdKEekY7Ndrg7x9wGnEXhcujNjnkuGfZkRPZ1h+MHHIVaSdydHRFvnP8xzWhcZtIw3Vo0OG+/Aw9utp9xMhPjkITHpFf6YSd3wWGfo9g0+nXln+HFWtueV67NAAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAA5FBMVEUAAADJXiXFWyPSYCXIXCPBWSLFWyPFWyPKXSTOXyTOXyXYYybFWyO5VSHCWiPEWyPFWyPXajHOXyXaaS3cbjXbbTPFWyPAWSLZZinEWyPWYybaaS3aaS7VYibaai/bbjTZZinffUraZirTYibddj7ccTniilzhhFPeekb22szggU7ffEjOXyXddDz44dXeeUT77+nJXSTssZLnnnf5593ppYHyy7f67OPllmz33tLkkWbhh1fww6zuuJzmmXHjjmH99/T88+/jjWD118fxx7HFWyP449j008LvvqTqq4rzzrvaZyssoxv8AAAAHXRSTlMARsbccBZUBw1fqyveA37w+CCAPIlS6dGdNfDpcr0se64AAAJGSURBVDjLbZKHUuMwFACVRgocvR0gyRqruTuOYztOJyEJ6P//5x4lBY6dcd3ZeZZttOP45un66eYY/eTv9SOhASWP11fokIt7wpV8nj5Lpcn9xV5cGS7hpnKVgiM3la24MWyqXKbGg7Firpq6pv01grjSZawfpvM07DMGV9bHsNaDlswrFvn4OS2TfDHxmNQPLTCXVLLhKM6kN4ynnlzGI8kkvUSogV3VT52J1lqtJeyLRdpXLm6gNhnqcONFHoMJDIi8caiHpI06XHGnN01X4SAMYVulReHAvQ6qeYw7fb6ezcdlWSbxzIl6DmdeDdnMezfTOFsty9EqiwsOxmM2mEiA4aNMZfO34XLJg54jIjC1SIMRAcsnPGdl7AYCjI5qqCMYdXqilK+hWg0HiSrExKFMdFDdYmKRbOK+GGycTRj04tHrQrhWHR378ASzTFJazONZj9JhNhtwz4dPWKU6mY80pTSbvcE+Gs8TTasIoSPbo3KdJgFVuaTiNV1LyuwjMK3zgBMyGQwmxCWFE/YI4eKsiYBTrAkhIsnfyixPAjjXuP75E3QDYQgxbJQvXTiaQLw00AeXODIHkMg+RZ80XgS19lC6TWCSzc1OGG7DlF1EKd5C6XkL7ajb3PoSVuDvk/c1EbJNyBkkB5EvsI0xbMJvI2AfnRliv0PMbRN9o+1TDAJTSL7TvLWIb/vEOoHkO0c+sX2b+PCSf0Yn2HQNPvnzU0DUNeD2yZ4/d5jgO0j+p9I13Qr6lWq3in6nAsnvNNuHa/kH0EZroaojqQ4AAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAA7VBMVEUAAADJKirHKCjTKirJKCjCJyfHJyfEKCjLKSnOKyvQKSnTNDTHKCjEJyfGKCjFKCjVOjrOKyvYNjbZPz/ZPT3GKCjCJyfXMzO9MDDWLi7YODjYOzvXNjbXMzPUKyvdVFTcT0/ZPz/YOzvaRUXfXV3319fYNzfbSkrdUlLRKSnhZWX76+v54eHibGzaQ0P99fXeWVnbSEjLKCjngoL20dHzwsLhaGjkdnb43d3jcnLgYWHxt7foi4veV1fuqKjle3v////++/vqkpL88PDsn5/yvb3HKCj65eXrmZnvsLD0x8fWLi7WLi7YNzfXNjYhf6o2AAAAHXRSTlMARsbccBZUBQ1fqyvefvjwIIA8iVLp0Z018HLu40qSuqIAAAJMSURBVDjLbZIHb+IwGEDNagvd+9q7xDN7k0UIexSoJf//n3OmBdKWPim2lKenL3ECDpw/vN6/PpyDn/y5/0cwxeTv/R34ys0zMVjmeV7GEHm+qcSdMGzPZixkTO6GqO3Fg4AeG0I26o0YHDJvKNq7ESTMhhAOXGfquDMIh1mofAw7e0EZNPNkPvKcYuEkYxPa6OVMmltsw34ZpJnZDzzTXgalDW18C0CLh2zgaGOEEEtsueaJM2Mhb4E26SN3YyITQhhCCTJHLuqTNugYzNBiz1m5PdeV18rJc03e64CGCQ1tYCST6agoikUw0VCsGdBsABWakTRekK6WRblKg9yItciEqjSIaoMoKlOWTt/7y2VEY40iaRpoayiF87HhwCII6YdBDdDxIdZiv7BnLlv1ewuW07GGod8BTQX6yXoTDPzeRtu4NA7KWeIPlSY4t+QTTFIb43waTGKM++mkF5mW/IR1jNbTEmGM08m7XNFoukC4DgA4UU1sJ86aYjbPsD9zkgxD9WR71lc00vVxrzcmIck1N9Z1g16fAsklR0TX/bXzXqTzBdV1gnjz8yfoUip0XcByvgzlLih9a4EPbjkSX9CRegk+ab35WKnAeJ/ISaohDkIYqpxyiDDmezC+OgMHmmqk7IRCrSrZvhMh+4Rcb5Mqsnyuci4varWBpIquBVG3EPF4Cr7RtjCXguNdUnH6qOiWaunKxS6pOLGIaqnEkof8M7rgoiv4cSKjrpBOJsfREyf8SSbH1LqiWwO/Uu/Wwe/U9snxpPbXKf8Bppxx8aJF8bAAAAAASUVORK5CYII="    
];

var icons = [];

window.plugin.enltarget.draw = window.plugin.enltarget.draw_guardian;

window.plugin.enltarget.draw_mh_hs = function(portals) {
  portals.forEach(function(po) {
    var target_index = 0;

    po.mods.forEach(function(mod) {
      if (mod == null) {
        return;
      }

      if (mod.type == 'MULTIHACK' || mod.type == 'HEATSINK') {
        if (mod.rarity == 'VERY_RARE') {
          target_index += 3;
        } else if (mod.rarity == 'RARE') {
          target_index += 2;
        } else {
          target_index += 1
        }
      }
    });

    if (target_index > 5) {
      target_index = 5;
    }

    var marker = L.marker([po.lat, po.lng], {icon: icons[target_index]});
    marker.setZIndexOffset(target_index);
    marker.addTo(window.plugin.enltarget.layerGroups.mhhs);
    marker.on('click', function() {
      window.renderPortalDetails(po.guid);
    });
    marker.on('dblclick', function() {
      window.renderPortalDetails(po.guid);
      window.map.setView(L.latLng(po.lat, po.lng), 17);
    })
  });
}

window.plugin.enltarget.draw_guardian = function(portals) {
  portals.forEach(function(po) {
    var target_index;
    var delta_days = Math.floor((new Date().getTime() -  po.time) / 1000 / 60 / 60 / 24);
    
    if (delta_days <= 60) {
      target_index = 1;
    } else if (delta_days <= 70) {
      target_index = 2;
    } else if (delta_days <= 75) {
      target_index = 3;
    } else if (delta_days <= 80) {
      target_index = 4;
    } else if (delta_days < 90) {
      target_index = 5;
    } else if (delta_days <= 110) {
      target_index = 1;
    } else if (delta_days <= 120) {
      target_index = 2;
    } else if (delta_days <= 130) {
      target_index = 3;
    } else if (delta_days <= 140) {
      target_index = 4;
    } else if (delta_days < 150) {
      target_index = 5;
    } else {
      target_index = 0;
    }

    var marker = L.marker([po.lat, po.lng], {icon: icons[target_index]});
    marker.setZIndexOffset(target_index);
    marker.addTo(window.plugin.enltarget.layerGroups.guardian);
    marker.on('click', function() {
      window.renderPortalDetails(po.guid);
    });
    marker.on('dblclick', function() {
      window.renderPortalDetails(po.guid);
      window.map.setView(L.latLng(po.lat, po.lng), 17);
    })
  });
}

function loadScript(src)
{
  jQuery.getScript(src);
}

var setup =  function() {
  
  for (var i = 0; i < url_marker.length; ++i) {
    var Icon = L.Icon.Default.extend({
        options: {
            iconUrl: url_marker[i]
        }
    });
    icons.push(new Icon());
  }

  window.plugin.enltarget.layerGroups = {
    guardian: new L.LayerGroup(),
    mhhs:     new L.LayerGroup()
  }

  window.addLayerGroup('[SH-ENL] Guardian Portals', window.plugin.enltarget.layerGroups.guardian, true);
  window.addLayerGroup('[SH-ENL] MH & HS Portals', window.plugin.enltarget.layerGroups.mhhs, true);

  for (var i = 0; i < jsonp_url.length; ++i) {
    loadScript(jsonp_url[i]);
  }
  
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);