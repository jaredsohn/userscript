// ==UserScript==
// @name            Flickr Map Icon
// @namespace       http://cantoni.org/projects/greasemonkey
// @description     Add Map icon for photos with geo-tagging
// @author          Brian Cantoni <brian@cantoni.org>
// @include         http://flickr.com/photos/*
// @include         http://www.flickr.com/photos/*
// ==/UserScript==

(function() {

  /* if mini map exists, assume image geotagged and proceed, otherwise make no changes */
  var mm = document.getElementById('div_mini_map_frame');
  if (mm) {

    /* find link that brings up mini-map (HACK: sensitive to flickr html changes!) */
    var uls = new Array();
    uls = document.getElementsByTagName('UL');
    if (uls && uls.length>0) {
        var atmp = uls[0].childNodes[1].childNodes[3];
        var aclick = atmp.getAttribute('onclick');
    
        /* find button bar, then append map icon */
        var bbar = document.getElementById('button_bar');
        if (bbar) {
            var newimg = document.createElement('IMG');
            newimg.setAttribute ('src', 'data:image/gif;base64,R0lGODlhGAAYAPcAABEtdXu6zjKRyDFwv9bW1hNEro2bzD9FZnR3iX+65WuUzvH4pLy8vCoxXjRdrU12voWn5+/1/Vl+vaS737/Q7lOSvB9KpV5eZun3+aGjrtjg+LbF4fL47hJatqXHrgArmm2j3BqA0rfH54WFhoio2B1Ci7/f2DxSi1OZ1pav31xfd+336tzl8kCc1eTo9J3K02mwwKvH5AI+pZPK3RdIt151txBiujBpvU52x3Gy2ZSUlBh8zKOw1gAmkmKLyCiN1bLXvsbg9UhiqFKlxWSb1aXH5py23bXXzHh/oQ44n8bGxozE0rTO6/r9/S1HfJSt10GZ3dng8G6wzEyBxy1KhuXl5cjW8ihKpDd0xD5GfjyR1UdsthhpwUmEtSJYr5rA54OIoX2q3DpirAlRsFp8xNzm95nH4TpSoXic0mGqyrDW4e/y+Mrk1GyMy1Gn2CyG1TWO2IS04szMzN/f3xY3hgBCpba3uXB3nwtgwp/MuyhWrfj4+rS5xZDFxhAzmmOr16m43m213U6P02NjbFuD15Ov63mIvLjZ8ru+zBRFpD1Ia3mZ0Q4qjViRzZ612Emh3e/v76vS0szZ7C9ZqEFsvnmXzQpVt62wuXq5xff9kWZphjFatYWu3c/l+eju94ys1qnO6yRvxEuexh1BoB1Ur1R5ySxevI6OkUt5vCOH0////9rs9wgzntXq9tzr51KEvT1ltzE4YoXA08fg3svk3HeAn8rU81alzzGS2gs+nb/U8DuS0LLG7k2Y2whKrfX78RFdv4yMjEaCyn2m1KjNuIq24Hu15j1otWSDwhFtxWOEvV6X1mdobgg4nTiMzxBrvVih3omg1KfQz9Hd8ZO34SRRpazA3xEueURIXlaaw0RUg2R8uKmz2LXcuTJPhjl7xiFrxff/93Wx5bXW98DD1BhJpYyv3gVGqO/v//f3/9bm/wAzmfD2+HOVyyuK2w1Tskuf4Hye36rT6+Dx/L3W96XFtaHQ6i9itT9irSFSrRFTrw1KrxhbtyB80TyV3P///yH5BAUUAP8ALAAAAAAYABgAAAj/AP8JHOiCBz4L1aoh3EZuoMOHawxYqCRpj6qLnlJQOsPnoUNPV9p48jStCJEcZjBcFEEDicd/IAF58jGAmrNdt9Ko2dkkgqk7Hs98cvFgHwhxu/7IikQLUiQ1TdgVAOPQwAMXpKYwafVHwBBZtH6pajJriSpbfhgIdDEqioRmlpbN2+qJnUVV4Y7AmKGqVBZI/7gh28BKnw0QCXa0SNOHzYpfHI5gusXOBSM7/2o4IvzOxpc4qdz8CfDChGNpUgTIU1UAwb9JE9otGmOpiLjQj4gtANLH1RJRgQ41IaSoigNASV4xCVWsV4hH8LplyjNETQAzhx5FgBBrjgNrudZN/6HgKc6bEOh/tMjRqZU9fz8iFGpA4Hg5Gec66NJwqFOnVZ0Eccg8CfyAixZrxEMfPoCIsY4+Y3BCRDJaSJEDPFD4Iw80cLwhyBo4HECAIdFY04wMYwwDAh7ZeJDHLe5oAUovbyTDSQRJDDIHIpSwUEk5H0xhDjAVeOBBNv2g8EUoXDTiCS/X6ACYELw4UokE93zCTwdddMEkEWF8w4kR7MCCjVr/XHJPFFts8YQkaNyABRbfCMNEDGigwkIKAIxQxUBglOLJMT1IIEI7w5DQzhMTkOIFCxTQwYwSD91BhidGJCKBHj18sA4y9/iwBi8lXIDmQ7VsQp4kIiiAihGSuDngSRt0DHKqR5ecIEYKVmhQxjS8IFOCIiNQ+tJAkGSgiTbeUOGEIiqcwsCfx3o0hxIMKCHHHIC9FBAAOw==');
            newimg.setAttribute ('border', '0');
            newimg.setAttribute ('onclick', 'javascript:document.location="' + atmp.href + '"');
            newimg.setAttribute ('height', '24');
            newimg.setAttribute ('width', '24');
            newimg.setAttribute ('hspace', '10');
            newimg.setAttribute ('img', atmp.href);

            bbar.appendChild (newimg);
        }
    }
  }

})();
