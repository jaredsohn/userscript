// ==UserScript==
// @name           BoardGameGeek
// @namespace      Woems
// @include        http://*boardgamegeek.com*
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
// XPath
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// Edit Nodes
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
css=GM_addStyle;
//GM_log=function (){}
/********************************/

Werbung();

var Type=location.pathname.match(/\/([^\/]*)\//)[1]
switch(Type) {
  case 'files':
    VoteTheDownload();
    BetterTitle();
    //break;
  case 'filepage':
    Captcha();
    BoldDownloadLinks();
    FilesInNewWindow();
    break;
  case 'image':
    break;
  default:
    GM_log('Typ nicht gefunden: '+Type);
    break;
}


/**
  @name VoteTheDownload
  @function
  @description Man kann die Downloads bewerten
*/
function VoteTheDownload() {
  // http://tools.larskleinschmidt.de/dataurl
  var star_empty_data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjdJREFUeNpsU83OGWEUnmEQfy1DVKTI16hJI91YVdJNdy6gbsCiNi7CPVjZWNpIurPoStqFdOWTIl8IGyKkZWj9jDGYnmcyVKZOcuY9nvOcv/e82Hw+zwwGAyabzTJ35J1+fjc6yuUyE4vFGA4f6GKxYHw+n5EXvpcA3HQ6rdncBZRlmdnv94zVar1AvNPpdMHYbrc8HSLsw+GgcS9ius0siqLmhBLxIRQKyVDYFxycWzEZe16v11oVRVFeRSKRNRQ2MPiMwhmB4/HIsCzLu91up9/v/wnMYrH4KJgnn/hfgvP5/MkIotVEIoFyf/CbupCbzebHe2tiM5nMc6rwIR6Pu3O53CIYDO4Il3T/Sj89+mmfzWaOUqnk6/f7GK1upkqyx+PpkVOlKq9tNhsbDoeXNMYSmK6SqqrWRqMRrFQq/t1u90j+b5Ik7S+XqHIc9yMQCHzudrvcaDTCgzjeKjD4wAFXT/xvC7jlyWTyu9PpSMvl8mRMAAw+cMC9rrFarTKn00lbEe3YTHMFBEEQ9QrPdFWBwQcOuIhBrNZBrVbT1kca8Hq9e7vdrkyn03ChUEhCYQODDxxwEQMx47PZbLSMtHchlUrZx+Oxs1gsPszn8zZV/FWv19/S3CaXy3Xu9Xpqq9WaDofD60Ni8Vba7TZHbb4ksoeCdvQP/UKXpo1Cm5qtVqv3PM87MD9xn/S7Ua4JsGNazQsKeqJ19qlNhTAbEhAmUeWvyWRSiEajbwhz6G/l+FeAAQCbRln27TVvxAAAAABJRU5ErkJggg==";
  var star_full_data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAn1JREFUeNpsUstrE2EQn91skk3TNE9SbEOiRdBgxQSk0EM92oOKUETwoF70fxAED+JBL4JeBBFEi55E8FVB6UOoiXjQS2vE1rZogi2peTTZ7CvfrjPZrtokAz++2flmfjszv497O8kBWTAA3ezc9vmw/aJcsU7eDtTrXQnS29hh/+cKtqM3EToG/kYg7unds58cub4ax+MH+c2mldtB0GKWALxey+c4GPX3H4kBmFCrro6apkUgSTu74dvbUxTrL4ixUP9ILBQdiZFPMbprtw4CxhBNSLjEWFLgzYDAGwGXOJikGN21m4CtTbUHaca+SGpAkdZwAhN8oeGBarlwp9uWuTeTDpwTLgWjB0f3pS8mBYH3MK2EhQbojbz1FzHa+uYcbtBUSf7+5Wmu8nsli1fXicAe5ZRDEC8MJSeSoUgipsgFkPU6KJqM+9BRHR+o1c18sfAhZzD9HuY/QRg2gW3UzdWhQxMnVVgPmdi+babmKP36Ov8M3SuIfIeMkmTiOzDziNqgss55enfqVW8wrlhkNaeTyyNQbusF80fPMigUGFQqBpG4GONT4aDm73HK4HUZ4HXq0CPIEAnqfsa4FOVQLtVQbUvGG3e35WMw7A94w26hzjPN0DLTS4uZmeVFpsma6FT5Pr8YphzKpRqy1gI2y7gNHHdvAo7Hd/vGG5Kqzs/+zNVq2m1JamZWlrdiouhwo0LCxoay9HwGPmU+/yOgLjzf1sA/Pgbn5UYzvLCw9fH1O/Pyzfvw/uUs5Bgzs6jpLk1lPlk24NYDyNrvjpZI2+hBRHgO0nNZ/dHjFzClatDAWB8J8GoOStNZuHbmhH7s8AE4TbnUOEL9I8AA8UAob9tkt3AAAAAASUVORK5CYII=";
  var star_half_data="data:image/png;base64,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";
  var star_green_data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sLGRYDIZED8xcAAAKeSURBVDjLbVLfS1NhGH7Ojx31sOXcJjY925C6cCCkmBcKlhEaUdCNeGfd+BeEF0HQRQQWrIToKrpSuolujLIysd2kZVCg2cRBLtxyTNEzd7aznXO+7+viOH/NB14+eN/ne3h43pf7NMEBAOrcqMAT3+BNALi99Wr8+GxHtV++3NA0nIT2vTqCw9x9AdMCTBNgzK6IdyDoEl0tLtHVEvEOBMt907S5FQIAoOX3hCyAMNIVkINKQA4qhJGucl/LH3XDH7dXLAKWBRjU6AnJISUkhxSDGj2WZc+Oo0KAEGC0oS/kFJ1hnuPdANxO0RkebegLEVIpwPV9vjR1Unrn3G3NZ1xnWxhjiGvxlV/q4tpJPK4/elkBcEeRA10X6i+GHZxYoxPdzsSy45ZFGYwxCJwAnej69+2FWLqYngfwkJueEBAJ9PIABhycY7jDcz7cVNOk5MxdFGkJOtFhURMi78CumU3Gc6sxCvYCwOuR9SjlpieEfTuRQK8C4H63t/uGySzPYaslUtxezC5OArg3sh5NVoSYzzMML80mC5uFnGZpnMRLOFwWs7jCZiE3vDSbzOfZwRb6hwhSKQJVpRhzd0rUpG3eKl+tg3egWqiGxEsQOAG+qvpaatK2MXenpKoUqRRB/xCxHTx6bq+PEdYqeSSvgxN5g5SM94mp5Y9/Pywb1DAkXuIlj+RlhLUSYv8BAAEAtnYAygCt1X/d33j6StbaLX1b+hozVOOpmTPn1jJ/FLhQJYqCqGay8fXJjR9zPw8EeAA1qwnUNl7139KNgjf5O7WQevvv7srj+JfUm40YNel8XtT8RVp0kQJB9NnGfPnuRAAcABmAD0D7xkzmZWI8MUVNVgBwCgD79y69nZ7JPGgeCl3zdNQN7nG3AJT+A5FKPKn+Xw7uAAAAAElFTkSuQmCC";
  var neu_big_data="data:image/gif;base64,R0lGODlhLQAtAPf/ALKXlvnc3f75+bUDBu3t7cunpcQBBszLy95VWPTs7IhjY9UABcWKiPv7++Xl5XtISdXV1XgwMeC4t7VoaOHh4ZeJieoCBrKLi7S0tH9paq+CgfXLzPzv78VsavKztNEMEdjU1NEABbOrq/f399HR0aMYG+6kptrMzPTCw8VWVOyZm8ZHRuJCRvPy8vjU1cXDw8G7u++oqowYGoN7e9/f3/b29n9AQYhLStjY2L0fIOqTldGbmr29vaxqar8BBskBBtHOzpgUFqZFR9J4d++rreUABd4BBrQUF9xERNK8vKKiovEYFuQtLZuVlagJDJqamvMDB9sBBscWGdsyNry3t/Tz8/729uqChL2fn/fR0pN5ev/8/Ojo6MUlJuwLDLdcW9w+QeVZXOABBvfW1+vr6/vn59w7P/Hv7+hpbOyJi4YfIOHe3vrg4dIbHuE3O+kWFNgvMf0LCswABckABep8f4uKiuJWWbt6e8oFCaolJ5U0NdoeItskKPzr66GenueEht5KTNkBBp58fM81N88ABfEKCtgABfTy8s0IDcrCwuNRVOZ5fL07OXdwcNYFCvzw8NQJDvzp6dkKD+IHCoErLPoFCNlFSdoABeN0d8sABfKvseAABezn5vnf4OHY2NsWG+MABdwABOqOkNwjJssBBrUvMc0LENIEB9gpLd9cX8wBBvS5uuRoa9MlKc8BBtIWG+4HCOACBt4ABdQjJ9UPFOUIC9sDB+IBBv39/fz8/Lq6utwBBs4CB94DB7hISZEvMK51dKsuMdqAffCwsuDCwdYFB9TS0vn5+eYDB+MGCIJQUZFCQ5lZWdPHx7YxL75iXqdVVe6eoNzb2+Nucfny8vDm5tkDBsIuLbMfIcUFCfgDBut0d9FGQtRPTPf19dzDwtA8Od03O8CxsdeVk8y9vcsCB+yGiJGRkfrj5O+Vl382N5Jqa5ksLvLx8d8FCPfS0+np6doEB6eXl+Xf36uUlKYPEeNfYuJnaqmamtGGhbcMD9axsKqnp8YBBt0BBv///yH5BAEAAP8ALAAAAAAtAC0AAAj/AP8JHEiwoEABBJOcGLilgcGHECMOLJBP4IklTLj8OzQkicSPD88kEFgjRRwGuO5UqoRlRIc4d3AJrOYN5MckSMYdAjIKypIOgyxYWNGhEpRBZDgJA+TJpkQsULyAW4EMVBELyG7dEgoKVK0UcKKSc1rwjCdq/y5YuApL660iRbR21VoEltBa4v4l8FSFbDMm3Rh8WStGjNvDhwuLKZJsAgMkYNaQBSJFG5RksTYp3sx586ZYsLRpK0WDLI0cRTZp7syas+pNFoS0A3liRwEsXYoY2c27t+/fuzcVYVSgwI55EbHAKuRlEvDn0I34m+SlUBsQMg02OICtSCh/4MOL/x9PvnyoIkIcHIPogFnq8vDji99kS9AIgy0kjHt2zd+uKAAGKOCABAZ4yYGX7BIPIx2MQ8x6ArXgCyxtFWhhFAhimOElnyiyDROXRIHMchPkMtAIIhwRSiAstuhii4bEKKMhgUiyhxuSxIjGFlugQWMUsuTBQ3b/VCFNBUdsQuOLgcxY4ygshEEHGoEoEskWbsQYhhX/pBNjkH5QcN9Aa2iQgz8LpBljmgs4MgothtDhgQsI/WOFI2EIhEaaU/Txjwdp7uIMAAQQtA83b7jD5qILSGLCGGEs8M5AkaxijiMscPDPFWlKEsA/KEiSZjJvpPCNQFX0EM8mbIJBxAYm0P+yACRZdLlAGv90AsgnkPDJxj/RsKnJP1nsweYtp1zQAC7tvKCMPmzaUScdaQ7zzyqQ5FkGGLSEwwoftGzwJ5t0/BMAHGzWowAJfdVAAwY3pBmCGZraaU8IKhC7ByoCbPHOp5uGMOwGIRRsxz/ohJMmHgrw4MCYZwDTxQIF81HGFnT2kQor/7ABhyNjCNSJB6IgEcIi/3AwRcEcs7HyAq5ccwGExwzhRSyuuBICLZ1sQQQK//RhjwBWgBFCDKBO8UHBIaCiKQqoTDHpO22EoDMyb+wgEAE9DECI1YS4UqsJSJTxDxEhA0LIFf9s8AohhEDyASGiCMTBIwLp4ErYIcz/MYAGI+DSwgEz2HBECHCbACovqTyyhab3EKLIP4/8sYgJnajgygeijFFGAB5g8kHOIZTwQAUk1PDPMQ4Y00QOC6gixzT/jDGLHAhsIZAKqsxSp0B96ICIHHIg8srwxKuiSiB58IMDGQ79g8saKxiRieyW5ApHJnJY27YptKAwxjB/pAJGG9wTr74cyqvCSy3PEEBkOxMUIwchP8zRBgdbpJJJJq2IhgkwgYhytKIVpsjEHOaQCVI48IEQzATciqGB6P2DDPhQgDqCYAA54OFVlljgHPCAiB/kT4RzMKEKV6hCOfhADTZQgAj6EiEIYMAPygiBHH5gihKqUIQsDKIQ/wmBhwwoQRc4UJ1AGkAAB7ygFNYwIRCFSEUqzsEW0ICAA85gooJgoRdymIMB+kHGMprxjGg04xjn4AopSAMiuADALygRgXrMIY14zOMcghABSughERAZAQ5EoIRzlEAOZDSAIhfJyEY2kowh0MMTjkgBCBWkAS2ABzxgcIQFiNGRoAzlHBYQjANwAR416OJDZAIDfThBDWrwgSL7EUpG0tJvapDBAPJgDOkRCY6JUEAG6qAMA4iwlosUoQ+GmYF1gMApueACBIwBAUFkYw4yoIQsGblNRQ4gAkFwhT7kgQMg4EB+TjlGFUaQC3o4gRIzyIATXOEDGTjhjkEIgg9KN4uDRsigHlT4Rw1qYEGy4AIGWvCDLvjBDgNQohHqIMQcHuDPTCwDAxhogiCAQJaHMJECFCCANLRwAyXwoAJOCIIfeNAEG1SAAmSgwRY76tEGmIgML0CiA4CgAC1okQS6OMAZ/tGAY6iSpg+pATwc0I4GOOAAQIBeE8kwJqSCxKYCOUYLWhC9BhQUJAEBADs=";
  var neu_data="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAWCAYAAABZuWWzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNrMV01rE0EYfjfdVK0pJUgRFUUqnvQWin8gPXps8eipIP6A9Ce0v6CQk3i0R/Fi+g9KL54K0lKLbSESSiVp87Gb9XlmZzaTcfPhoSYvPJnZd2bfefadZz7i7YmyR8A74K2uT9JOgQ/A9nJcT8wD2SeeyI+HeLgHzE6YaRuoAWfAuciz1yLHqEZEhhl9gJ/7gA90JwxfcyGnBZH3KLIAeXrMbPWlyKIv02UB8A1JfiXyHNUroEOOi5CBhFNG1ovTSWXe1dxDlVCX6K1KReTiQlpra4kvu7mpys7GRq9PirG9u7+v2lma/uYd18e4mUJBWisrg3jf0ZltpZKdKRbjslSS9tZWPBAC2n3ZJ8IHcXDburqPiRGmxLV9jEv/kJn1jWZ9o480mwXZ63I5JmVpKdEViNYHZ0S9E4zw8XlmCAetCEIxVh1t0Jog6eXzkl1fV75Iw+7D9gyyYsNuj1Liur7w6EglIxjAwxA1KU79qg6CBJBADppq7OyoQdy+PqZwwdHuuZfETojZ5vo4jocZCsZYdKmaNdPTANk5ZHZeLy63bxuDXFqLJS1WWuzQGUfG3I0GZpZB2pieSxDOg2yXu4OTgRC+xu7uYLFBJqM020TM7nDNjkeW/hqlgOxml5b+mkIfvnksQtv4QVf4gDqkk1tdVe30sU5jmx1jFjrnjhDoXWeo4QSLDhzQqqVS8nxSLCpfo1Lp65Nm5r3jQiFqHx72tfH97/l831j00Q5SeOzFEn/Bg4u7HI/baO4GT6Lb3EchB0qm6ezJo4wnAW5euA1IFfhNGfwK9JF7E9b4R4LOrlHTVTH7bDmcgtuWC3I6EflsbfGK7HaoG6eJKPFR5JM5O9hEGZziovs0j7sjLo5v4Hg84cv32U+RryT6BX8K4LrWhCMuMIo4oy+5vOHkuC70s2cfd//JzLR3uA0DdU244zunoPmKrL5feBNKcKSnvqPRy6zE2fV6d96knKR1NWlTRn8EGABj7PpLxTYA7QAAAABJRU5ErkJggg==";
  var ausrufezeichen_data="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAOAAYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD628M/sPeI/jZ/wVx/bo+CI1vxNpvhbwg3jH4qWn2bxFrlhBZJ8RvFngHxZ4b06BoL+MLbDSvG2pJbwg7DFZDauIQEK/ev4I/BL9rDwn/wUE/av+K3irxf+znrPwv+IfhTQIPCH9k/DhdJ+LllYWOp2EfgPRfFXiTTPDuj6hqth4b8M2mt6VqcmqeNPFC6xqH9i6nZWWhwW5062K/O+DeDsjo5ZjfrWUQrVKvEHENZSx9PDOsqE84xX1anD6tiMXD2NLDxp0qblVjUlyylOjRcvZr+zPpJfSP8Usz444X/ALC8Q8Rl2By/wh8HMsqUeFMZnMcuq5nhfDvh151ja/8AbWScO4v+0cfm9XG4zFxp4GvhaPtqdDD5lmUaP1ur/9k=";
  var new_data="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzs3LzM1ODg4ISoyQTw0QTI4ODgBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1LCw1NTU1NTU1NTU1NTU1NTUpNTU1NTU2NTU1NTU1NSk1NTU1NSw1NTU1Mv/AABEIABEAJQMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAwQFBgcB/8QAKRAAAgEDAgUCBwAAAAAAAAAAAQMCAAQRITEFBhITIjJRBxRScYGR4f/EABkBAAIDAQAAAAAAAAAAAAAAAAAGAgQFAf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAhESMQMEIVFhEzJBcYH/2gAMAwEAAhEDEQA/AOncwcwM4Qtzu21i1EZioAy1+5FULfiAQmTlpexA7eGAwA89BudNQQfarPmzh87yLkic1RaB5xj1Ea/ys63lhLfmQtl0sXTFtYIQGMxydARpknJpUxHZjrPDq+4xFURI24mFfDWUgiLcKVdc93Nqqc7mzYvCi1eXRwwAgeJGfqBqRZ803F5ewWEnssaVRdF2QSIdecY/H7qNPl+FzBIuhd3RS7vRk3p3x6cAAdOg0Ap9lwEWVtbItre5iu2mZwHVuTn1e+9V34eZfh6MfVr5dHFz6vupigG4j4thwm6lc2QlPfail8GtmIsyJjBMicUU4Yc0CbrON9E++3pEa8oqa4nQp0aKKEJ8dqKKKEL/2Q==";

  css(".vote img:hover { background-image:url("+star_green_data+"); }");
  css(".neu { margin-right:4px; float:left } ");

  $x('id("main_content")/table[@class="forum_table"]/tbody/tr').forEach(function (tr) {
    if (tr.cells[1].textContent=="Title") return;
    var Link_FilePage=$xs('.//a[contains(@href,"/filepage/")]',tr);
    var ID=Link_FilePage.href.match(/\/filepage\/([0-9]*)\//)[1];
    var vote=deserialize("vote",{});
    var div_vote=createElement('div', { width:"100px", className:"vote", innerHTML: "Vote: <!--input size=1 class=vote name='"+ID+"' value='"+(vote[ID]||"")+"'-->" })
    insertAfter(div_vote,Link_FilePage);
    if (!vote[ID]) insertAfter(createElement('img', { className:"neu", src:neu_big_data }),Link_FilePage); // NEU?
    for (var i=0; i<5; i++) createElement('img', { src:(i < vote[ID]*1)?star_full_data:star_empty_data, id:"star_"+ID+'_'+(i+1) }, div_vote);

  });
  $x("//input[@class='vote']").forEach(function (input) {
    input.addEventListener("change",function(event){
      var vote=deserialize("vote",{});
      vote[event.target.name]=event.target.value;
      //alert(event.target.name);
      serialize("vote",vote);
      event.stopPropagation(); event.preventDefault();
    }, true);
  });
  $x('//img[contains(@id,"star")]').forEach(function (img) { img.addEventListener("click",function(event){
      var vote=deserialize("vote",{});
      var data=event.target.id.split("_");
      vote[data[1]]=data[2];
      serialize("vote",vote);
      event.target.src=star_green_data;
      var neuimg=$xs("../../img[@class='neu']",event.target);
      if (neuimg)
      {
        //neuimg.style.visibility="hidden";
        window.setTimeout(function () { 
          neuimg.style.display="none";
        }, 2*1000);
      }
      event.stopPropagation(); event.preventDefault();
    }, true);
  });
  if (neu=$xs("//img[@class='neu']")) neu.scrollIntoView();
} // End VoteTheDownload

/**
	@name bold_download_links
	@function
	@description Zeigt die Downloadlinks in Fett an
*/
function BoldDownloadLinks() {
  $x('id("main_content")//a[contains(@href,"/file/download")]').forEach(function (a) { a.style.fontWeight="bold";  });
} // End bold_download_links

/**
	@name Captcha
	@function
	@description Zeigt das Captcha immer oben an
*/
function Captcha () {
  css("#main_content > div > form { position:fixed; top:10px; left:10px; z-index:999; background-color:white; border:2px solid black; padding: 5px; }");
  if (captcha=$("recaptcha_response_field")) captcha.focus();
} // End Captcha

/**
	@name FilesInNewWindow
	@function
	@description Dateien in einem neuen Fenster öffnen, wenn sie im Firefox direkt angezeigt werden können
*/
function FilesInNewWindow() {
  $x('//a[contains(@href,"download")]').filter(function (a) {
    return /\.(txt|jpeg|jpg|gif|png)$/.test(a.href);
  }).forEach(function (a) {
    a.target="_blank";
  });
} // End FilesInNewWindow

/**
	@name BetterTitle
	@function
	@description Korrigiert den Titel, dass immer der Name des BoardGame drin vorkommt.
*/
function BetterTitle () {
  if (GameLink=$xs("//div[@id='main_content']/div/a"))
  {
    var GameTitleFileBrowser=GameLink.textContent;
    document.title="Files | "+GameTitleFileBrowser+" | BoardGameGeek";
  }
} // End BetterTitle

/**
	@name Werbung
	@function
	@description Blendet die Werbung aus
*/
function hide(e) { e.style.display="none"; }
function Werbung() {
  var ElementList="id('dfp-leaderboard') | //div[@class='thermometer'] | id('dfp-skyscraper')"; // alle Seiten
  ElementList+=" | id('dfp-medrect') | id('results_5')/table/tbody/tr/td[2]"; // Spieleseite (Typ: boardgame)
  for (var i=1; i<=10; i++) window.setTimeout(function () { $x(ElementList).forEach(hide); }, i*1000);
} // End Werbung
