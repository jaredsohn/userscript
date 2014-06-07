// ==UserScript==

// @name                    IMDb @ the RadioTimes
// @namespace               :: the auld dubliner ::
// @description             Adds IMDb links to Radio Times

// @include                 *http://www.radiotimes.com/ListingsServlet?event=10*

// ==/UserScript==


(function() {
   var results = document.evaluate("//div[@id='titleInfo']/h3", document, null,
      XPathResult.ANY_TYPE, null);
   var result, title;
   result = results.iterateNext();
   if (!result) return;
   title = result.childNodes[0].nodeValue;
   var imdbLink = document.createElement('a');
   imdbLink.href = 'http://www.uk.imdb.com/Tsearch?' + escape(title);
   var imdbIcon = document.createElement('img');
   imdbIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAK3RFWHRDcmVhdGlvbiBUaW1lAEZyaSA4IFNlcCAyMDA2IDA1OjU0OjM5IC0wMDAwQuUZ%2BQAAAAd0SU1FB9YJCAQ7MapyWNIAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAEZ0FNQQAAsY8L%2FGEFAAAHcUlEQVR42m1XW29dxRX%2BZvbF52I7TmwcO3bdoIQQAQIEVEK0AUHaqgJaiVatgB%2BA%2BtDygHjhB1R94KkSEvCABERCfUBVKWpkcWkDAtoHA0oTtWoCuTg0dXDIqY%2BPz23PpWvWzD57bDjSPvs2s9a31vrWN7MFws9aG656dPE4nYd0pHRoVD8RXdvobKPHojQYDTNhWPwsjNPRXIPtdoypbIk6MPky3ezhiSm%2B9vszHQoo6NTeJMMyOJbemTNiIyfu1lYerfXjXSIsB2H9dFsFrU08ng5TJs5GY2ywk2FiVwbZpESatwD5KHYAb9PIt%2Bn8qs92ixzN1uhafj22bdkuc%2BfBiNI%2FA4kCjRKb7cwyY7Q%2By2Ww5RyVob3exmRGWFrHgOkGPT1S1d7aH1sG7JixRX9pAjRcXA58EuC5Y4OOySgIGmv7viIiryrBQDp0MeUr6MDaAR2qAsoXdZ8%2Frhq9U2RLOJsZuOxU8d41Tfg0ak0JmWUw5CfKuPLON8nAVG2Uoi%2FOHMLvnv8cwggs7T%2BAXz1xDr95toH%2FbXR8ho3EU7%2Fcj%2B5Q4YWXrsEkPhfTu%2Bt45ul5%2FPZZgda1daKrp1CjnmNpcRyP%2FKiO6dkLeP%2BDm%2FH6W2cJSIaj9x7AQ%2FedCtk2uHRRYWNzgMM3TEES8M22wsSkhhSDHRw3XMdwk3A2r%2F53gDf%2BtAJBeO64zeCJxzK88%2FZprK19FaYI3HfPd7DVbuKPxz9GEri8uLAHzzx5L9478SkuXjpPWZKcZReXIvq8%2BtoM3jh2AGfPrGL5%2BAoSnWHvTI6HvidChai2G1202gabnR6mJgUSabmHLHmtgGtC7bLiSuQybxTz21VUhC53mLSbJrlteJrL47nzxK6iS%2Fy2Uc%2B6ptQwqWH2Oe7%2F7Kf34MS7%2F0CrtYUr6y18uJKTfeeHyk%2Bjel2B547N4PzFAW462MTPH%2B7hoPkS6VgCrQv2Zok6ZjvwhB35aMdGKqKZuwQagiMVheBajKYJg9UrCQabLQpMMnjpysOJs1w5QRG7PP3iJ4v4z%2Boa%2Fr5yjsPuDut07vF1QqV4%2Fc2PUQx6RIsEb5LdXeN345EHHCwVGKBYIYnpEXBlgxLIcO3b3epYXCspc%2BCMdeEI%2FOufl5FnOYcWPzdGs8xxICyPRJWkcmlhR9ruKnv0yAFkSYbl5ZP87Mv1GgodkhBUyvu3EXD3wDAiT5sgstXC5PtV0ztLXhy4PM%2FRrDew%2BsUVyrbB1PguDIoBev1%2B0PESlP0GUfXvS%2BvO7eLcONlrjt4rgmdIYYSSPkiXGvLt6FrZ0wG4C10Zf2gXj%2BUy%2B1anK1PKIqllcxzzC%2FuovH1SsSFm9l6HxsREZVLBjy0XU1PJuyDSC8rmtsSYhHtL0buU3mlSDztMGIMJfjm%2FJl5dbFU2Bu8O8myNV45SooxSI6rUxsawsDBPVfDDl5a%2BRVXIvAOE1c%2F4xcQ58%2BuO5uz6QCw%2Ft2HBsSa0vBOCcndAPp0dHarMdijJI%2BBWe73nxUBJf9AzlbjGkY5d1B4SQ5rptFvolCcsLjXofc46vLSwC6kd8jhJ6Aodlns6klR4rqNPjxTJZsKNrJ0gkLII45VFywQpyR6I606JCvJnaKweGma2q6JWRcVxriCnV3naCL%2FJ4cTH5XQFSYll0iAxBa5fmCSHtNqZHLPTJH%2Bj5dwGWhiugCJwm50mut3ttqqCUyV4yXeBFHDM8HCIUtY3OaI9UQW8dOjkTwcNZ5S%2BbKJkOsuk54YkQ3vna5RJGp%2FUMbcvYV1milhPRmYmSZ2hAF585ROc%2BfxyoKRTHsX%2FzpcQKS5c7EPmA25Kx3%2FXB6qgapASWV1wVW3Y%2B4yAu5IlLKh54Bdlm7JoaWJiUg%2BOaKCKSUgHjLJuqKwL0z0q7Tj1cop9M4aBpC5MV96iwRLpDEqd4%2BTKSa8MRL2p3RO45UbaUnzku7VIevj05Gl0e0MHj6bkOLTfcMCSKZx7pSGaJMirTdbw8v2WsEBM0YANAqgs0%2BTyxq346BPKjBpg79wc7jx8Cn%2F92yIGA4VaJvGDoynp7gYKqsSDR4G%2FnDDoDBKSNeCHR%2FpY%2FnAWna0eORui1IIxOcCtNyfYM3YBl1qHcfrfJK2pwvUHD%2BLU6bO0nejhxhtmcOT2z2jBa3NgMk1JsVJ0NtyGLq2AFxcetFJ1IRtU4mbOq2h%2FXVbdbYK02UgFggCN9uMRDW3QvbK0wnoVKQWMlcfG99bL5Wi%2B4do51a6N0x61nqDfHWLYdet3Hm9rj1u0VzC8%2Bj7Tpj5XQ3%2Bt4%2BkeQIZvgtFNrKDW61rogVhZ%2FfogLUZAfUBRA5e2TOzDJ01IhevmJ9FaG6IgpUp334K5b383Bn7VN13%2F93Zr9Q%2Bo1%2BmrY497k4VG2%2FFBEH%2BGxVHt%2BGiovphENGf7x0Jlym%2F0XLYNZ9yvmFv0jbPVIe7P3YXZQ7%2BmyfvibW3iOVi7m87LJF0dZO0EBW%2FqnXZT41EzshNtR%2BDilc850by8J7wosXJQlgwvGCLaApRV8nsaS9KrWdVokpQhAR64%2BykKVKU5Fpa%2BT3cz7gn%2BD83pc%2Fb4AmR8AAAAAElFTkSuQmCC';
   imdbIcon.alt = 'IMDb';
   imdbIcon.title = 'Search IMDb for "' + title + '"';
   imdbLink.appendChild(imdbIcon);
   result.parentNode.appendChild(imdbLink);
})();