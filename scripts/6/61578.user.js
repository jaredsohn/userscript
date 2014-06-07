// ==UserScript==
// @name           Neopets : Stamps Comparer
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Compares your stamps collection with the collection of someone else
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes/neopets)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes/neopets
// @version        1.0.0.3
// @include        http://www.neopets.com/stamps.phtml?type=album&page_id=*&owner=*
// @include        http://www.neopets.com/stamps.phtml?owner=*
// @include        http://www.neopets.com/stamps.phtml?type=progress
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/61577.user.js
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

//-------------------------------//
//GM_setValue("cache", 1 * 60 * 60 * 1000); // 1 hour
//-------------------------------//

if (/^\/stamps\.phtml/.test(location.pathname) && /\btype=progress\b/.test(location.search)) {
	GM_setValue("overview", uneval({
		"LastAccess" : "" + new Date().valueOf(),
		"Albums" : Stamp.convert(document, true)
	}));
} else {
	var comparer = document.evaluate(".//td[@class='content']//p[2]/b/a", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	if (comparer) {
		var albums = document.evaluate(".//td[@class='content']//p[3]/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for ( var ai = albums.snapshotLength ; ai-- ; ) {
			var album = albums.snapshotItem(ai);
			
			album.href += "#compare";
		}
	}

	if (location.hash == "#compare" && /[&?]page_id=(\d+)/.test(location.search) && parseInt(RegExp.$1, 10) > 0) {
		function compare (stamps) {
			var ai = 0;
			for each ( var stamp in Stamp.convert(document, false, true).Stamps) {
				var img = stamp.Reference;
				if (stamps[ai].Image == stamp.Image)	// both have / both don't have
				{
					img.style.opacity = "0.35";
				} else {
					var status = document.createElement("img");
					status.setAttribute("style", "position: absolute; width: 24px; height: 27px;");
					img.parentNode.insertBefore(status, img);

					if (/no_stamp\.gif$/.test(stamps[ai].Image)) {
	//						alert("[X] "+albums[1][ai].Name);
						status.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFRklEQVR42sWWf2xTVRTHz23fa1+7tevasZVNVtnGNsXFFIEy2RLREWADhoKC6PwD/0EU/BETEzERE/EvE0ACWSRGQoQEJI75g4W4DIGaMkAWGS50Gz/WjI6WraU/1r729b3ruW9lSoCAfxBfcnZP173zOfec77l3BB7xQ/5XwKaZM21Gk6mppLq6zlZcXGnIy7Ox3yej0bGQ39/v93rdiXj8l+0XLoz9J8DbM2aUW4uKPn26oWF1ZW0tzwvCxBeUZt8iqi+lUtDv8Ui9XV0HQ4HAZzu93ssPBGysqHi/pr5+65zmZgOv16thCfu7bFD2GX2CPvukvo8gera9Xbzodm/+amBg230Bm8rLd9c2Nq6vrKsDDVEf0DBA1s8+jEJoFqDgT+biSvrdbnq6o6N1x+DghrsAGxyOj2fNm/f5EwsWgFajmTAMylYNA5E7N8sCM5MVBeTbK9ql48fhfHf3J7uuXftiEvDmtGkzywoLzz/T1KQzGI3AaTQUjUxfsgS0HEdHOjuJVi09megEZotBab7TSVjQkTNnaEaWSQb9ZCJBzx89Kl0LBmd97fP9pb6x3uH4zuV0rrVXVBCdVgtoVMdxpMDphOnLl9PIpUsk2NHByjUBUBRidrloYX09CXR3g6+jg6YzGZKWZUCjgcFBcrqnZ3/r0NDrpNxoNL5aWhp4sqYmJ9dkAgPPg8BxIOh0wOOaP3s2TFu1CmJ9fTDW3o61UcA0fz7YsJSjHg9cP3IE5EwGREmCJDP049Eo9PX2jrcNDxcxwJy3KivP2EtKaI5eT3IwsFGnowb09eizEpnmziXFa9ZAvLcX0oEAtS5cSELY0ODhw0RBYBpVlEynSQJlOy5JdFwUycj16/DNwMBc4jAYmj+orm7Lx+xzUZYmtBzUPQJAj8YhRIONNrpcYG9pUWsUPnkSQocOqbuRMOsUBk6KIozjGsc1lk5DGHeBc/EieUwQVn1YVfW9VRAoBicmDI4AahAEokMAz/NUy/PEtHgx2Jqb1R7Ezp4lY3v3UhmzljAY24GIWWPmEBVFigASRn+b1/sysfH8Cx9VVXVOzc2lZgSYEWDMAnjMnkOAZelSYluxAiKnToHo89GitWtJ7Nw5Gtyzh8j3AqRSxB+Pw5debwPRETJ1Y1nZZWdBgYDZTwIEhDEAZk2nrFxJbp04AdG2NjYPlEd5FrW00Gh3N/G3tkLmX4AYAqII6Ll5M7n76tVywgFwdVbrT6+VlS0qMBggC1BVVITqsa9eDaGuLriFNc8eHZDBrHWorpJ16yDsdoNv5061D1kAjCaTsP/KlWO/h8PL1Dko4Pnn1zkcx2YXFnIMgGqiqCDCAnDojx44QFjDiUYzOQdYe2pwudRBC3V2UhHrfrtEfwSD8rdDQ4uCktSlAnhCtDUm0/ZXSkvfqc7Ph1zWAwSwOWBNxmYTDQ7gJAAnWclkKCqIMBWh0SSWhWXvDYfpQZ9vV188/p6oKPLkASNoNMZnrdZ9jVOLX6qw5DEICDh0OjRstCrVLABwB8D0n8GhSjOZYslY8MuRCBz1+3/whEJvJBQlcddpakCI02LZsqyk5N3HzWadBcuCEMrhscEOvTvOIkWhCCApBISxyUOxmPTj8PCOPyORLeOynLjvfaDHVKfo9bUNdvvm5+z2hfmCoBUYgJXon2uHyHjmpBCAwTO/jYz82nnjxtbRVMqTZFt7mCsTS8aZeb5yls229CmLpbbCbC4rEIQ8totRUYwMRqNXLobDnp5Q6OeoJPUnZDnz0FfmvXaFCyoar4iJK1NmahVlWXnQu4/8v4q/AfqFuJpc+G2eAAAAAElFTkSuQmCC");
					} else {
	//						alert("[V] " + albums[0][ai].Name);
						status.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFe0lEQVR42sWWa2wUVRTHz5n3zu70udCW0i12S2mtVVvlUSwW2tIqBYnGR3zED/qloqASExMxERPxkwkggRCjMTESJSr4AgTXAqakRaAFCoSWtlDowy1tl+5zHjt7vTNbECUE/EC82TszmZl7f/d/7v+cWYQ73PB/BTSsKs10ykqjN7e4KitzWpHiSM207odjwTH/+FB331BXSyQa3rVnw8mx/wSoeXWmd0pG1nsP3Vf3THlRJS/y0uQTct0wApqhQUd3q9Ha2bz98rj/fd+mrt5bAmpWFr45t2zBurrZyx0CL9qzIlrv4VUAPdA7QGhLjtcNjfiO/KAeOdWyxvfxufU3BdSs8m6pq1zSVFFUBQyDVgNkLEDy+joZSEgSQBLERiUSBNu7W0hz256tvo09K24AVK/If2dOxbwP5pYsAoZl7M6ymLxm0O7XNzphspsJMM3k2eqHz+6HI+2H3z2w+cKH1wDzX84rzSuY2r7ogUbB4ZCB5RjCcSxyPAP0TDiWQfoDSwWxFBCCZoIQ00ygYZgwa+o8Qt/Eo72/QUyNkgPtu42BCyMVLZ9cPG0DHm7K/3L23PLn8rMLkRNYEASWCCKHgsCBwHGEt2AMA5NhsiKCcbp8Ix7HmekLoDSnihzv/x1be/aAGTdJv78Hj7Z1bDu4tf8FdHtlufJZj7/s7jKn4lJAdPAgSRw4JAEkkQeRp51jgWO4a2Giiwc6OdyVuhBKpiyEE4PN0NK7Ayw1WiwOoXAQOs90Ro7uHMiyALMXv1L0R252LpGdIjqcAsiyQJwOCZ0UIPECkTgOeZYDlu64pcBImOhRaklRRi12+n3Qdmk70Yw4RqMaRCMGiUZUHBwehP2fnZuDGfmO5Y2ri3empSsgu0Rw0v5ocRO4XTnQOrwVZJ4FiaMqLABVYa0+11kH3vR6OHN5Hxzzfw2GGafJp0I4okE4rEIkpMOVQBB+2dT1OKZNl55c+tasb5QMibgUEV0UcO+0evJYyWocCB6HjpGthEKQpxAGOchzNpAZqfXYNbaPnBr7im52AiK6RkKqiqGICsGgSsIhHUMBFXav73oK5Uy+dunbs3zuHBdRUkRUUiSQJYGUuGux3rsShsMnyemxT1Ggds1XGoFOTnoCPuwOfEu1mBiNGzYg/A+AhqNDYdj1UVcdsgLm1Kws6J1Z7pYURbIBiiwRSeDRm1YNi/JXEH+kE8P6EBSmPwK9gWbSF/zOMixRTR2jhgFRQ/8bEKKAoIbdHZdj+7ec9yINK1dQlfFT9fMFDeluB0wCwCWJlkXBoyyAak8TWNXi3LgPzk/sBOpa0EwDVOqkWFynAA0iqgYWIBRSITAag4Pb+vb2HQoss33ndPM1VS/l7y1+cCpnA5widZGIsiBSe7LE46rCDEce9F75nlqWIyahCZaIE43mgQ3QdRKJaRieDNHZYyPmoc/7G8IjRrMNYHlkc8qUDfOe9rw2ozgdXC6JOGWBAgTbphRiJ5pAnWTZlDrJBug2wICYlgRYq+/vCpC27Rc3D58JvxFXqZ+v1hZOYmTv/Iwv7l+S88T0wjRQXBJNNpoHAk9DxQNPAUwyD2j0E2BQ91AAqDrdA023QzPYOwHHdw/t6Gsdf1GPJqI3VFPewcie8rS1FctyX8+akSKkpIkWhJYKK9H+VSpoMbIVaAaEAhrx94eM9h8HNl46MbFWi5jRm34POJFhlCliZVld9prShdmLlXSJFSUOWZaFyYptl2mTllBdi1O/a/HTB4Z/7fT9uS40qrUaMSrtdj6ZvMRwjhS+qKAic6nnnrTKnMKUghS3lGqpCI6qE0M9wb5LpwKtfR3jP8eCRrcepel8u5/MG2BUlSXO8kNyBJr0EDdUM3GrsXf8X8Vfg0Wt0w0efAMAAAAASUVORK5CYII=");

						img.setAttribute("src", stamps[ai].Image);
						img.setAttribute("alt", stamps[ai].Name);
						img.setAttribute("title", stamps[ai].Name);
					}
				}
				
				++ai;
			}
		}

		function update (p, t) {
			for each (var a in p.progress)
				if (a.Id == p.id)
					break;

			if (a.Total == p.cache.Total)	// cache is updated
				compare(p.cache.Stamps);
			else
				setTimeout(Stamp.album, t * Math.floor(500 + 500 * Math.random()), {
					"page" : p.id,
					"onsuccess" : function (params) {
						GM_setValue("page"+params.id, uneval({
							"Stamps" : params.page.Stamps
						}));

						compare(params.page.Stamps)
					},
					"parameters" : {"id": p.id}
				});
		}

		var pg = parseInt(RegExp.$1, 10);
		var overview = eval(GM_getValue("overview", "({LastAccess:0})"));
		var cache = eval(GM_getValue("page" + pg, "({})"));
		cache.Total = 0;
		for each (var s in cache.Stamps) !/\/no_stamp/i.test(s.Image) && ++cache.Total;

		if (parseInt(overview.LastAccess, 10) >= new Date().valueOf() - GM_getValue("cache", 21600000))	// progress is cached
			update({
				"id" : pg,
				"progress" : overview.Albums,
				"cache" : cache
			}, false);
		else
			Stamp.progress({
				"onsuccess" : function(params)
				{
					GM_setValue("overview", uneval({
						"LastAccess" : "" + new Date().valueOf(),
						"Albums" : params.progress
					}));
					
					update(params, true);
				},
				"parameters" : {
					"id" : pg,
					"cache" : cache
				}
			});
	}
}