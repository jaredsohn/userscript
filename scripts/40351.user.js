// Based on: http://userscripts.org/scripts/show/27548 by !user
// Thx !user
// ==UserScript==
// @name          Google's Second Favicon
// @description   Brings back the 2nd version Google favicon
// @version       2.0
// @author        Steelsnarl
// @include       http://*.google.tld/*
// @include       http://google.tld/*
// @include       https://*.google.tld/*
// @include       https://google.tld/*
// @exclude       http://desktop.google.tld/*
// @exclude       http://docs.google.tld/*
// @exclude       http://google.tld/notebook/*
// @exclude       http://groups.google.tld/*
// @exclude       http://mail.google.tld/*
// @exclude       http://pack.google.tld/*
// @exclude       http://pages.google.tld/*
// @exclude       http://picasaweb.google.tld/*
// @exclude       http://toolbar.google.tld/*
// @exclude       http://sites.google.tld/*
// @exclude       http://spreadsheets.google.tld/*
// @exclude       http://webaccelerator.google.tld/*
// @exclude       http://www.google.tld/calendar/*
// @exclude       http://www.google.tld/notebook/*
// @exclude       http://www.google.tld/reader/*
// @exclude       https://docs.google.tld/*
// @exclude       https://sites.google.tld/*
// @exclude       https://spreadsheets.google.tld/*
// @exclude       https://pages.google.tld/*
// @exclude       https://groups.google.tld/*
// @exclude       https://mail.google.tld/*
// @exclude       https://www.google.tld/calendar/*
// @exclude       https://www.google.tld/health/*
// @exclude       https://www.google.tld/reader/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var vodka = document.createElement('link');
vodka.setAttribute('type', 'image/x-icon');
vodka.setAttribute('rel', 'shortcut icon');
vodka.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1tbUFHBwcFQAAABoAAAAaAAAAFgAAAA8AAAAWBAAAGwIAABoAAAAXAAAAGQAAABkAAAAaAAAAGg0NDRiOjo4JJiYmDwAAABQAAAATAAAADQwCAR1YFRB4nCsqua0yLMSbLCyxYxoYfBgFAiwDAQAUAAAAEgAAABMAAAAUBwcHEhQUFA0AAAAOAAAACxMEARayLy/F7T9C/640K7FuJR1pZiMgYpczMZqeLSzBIAcFPQEBABAAAAANAAAADgAAAA4XFxcJAAAACgAAAABbKSNY/1ZO/3MdHY8AAAAAAAAAAAAAAAAAAAAAjzc2lHwdG7oDAAAVAAAACAAAAAoAAAAKFxcXBgAAAAcAAAAAVj43Tfx6df87BQFmAQIAAgAAAAQAAAAEAAAAAI0vJomvLCftCwEAHQAAAAQAAAAHAAAABxEREQQAAAAEAAAAAwYEAAi4bVm0uT8/4UwOC1wnBgMlFAQAEF4YGmnwQ0X8niQfxQEAAAgAAAADAAAABAAAAAQzMzMCHh4eAh8fHwMAAAAAKSglBJVbWGfQX16qxktJsLItKNTqP0X/5DxE8VklJTsAAAAAHx8fAh8fHwIfHx8C7+/vBO3t7QTt7e0E7e3tBOrr6wIAAAAAAAAAALWHgkH+VFD/xjI226J1dDYAAAAA7e7uBO3t7QTt7e0E7e3tBP///wn///8K////Cv///wv///8Eybi3HHw1LHeySkjC/nd2/34iIZ1rbGkJ8fHxCv///wr///8K////Cv///wr///8R////E////xP///8P9OTiHtFGSNHPKS//15KSeP7k4Evgb3DOXh4cjouJiCD9/f4R////E////xP///8T////Gf///xv///8b////Dvu3rnbrNCn/o1NTk9/r6wn///8C/9fXaqskJf9kTUxX7e/vGP///xr///8b////G////yH///8k////JP///xb/0MyT00JA/5Byblv7//8d////Fv7Ix3XUNjH/hFhVee/z8x3///8j////JP///yT///8o////Lf///yz///8j//DmZNphWv+Oa2ll4urpJPHy8iLwcWDF0zEn+7edm1f///8m////LP///yz///8s////MP///zX///80////M////y77u7KoxlhZyrV/f3XSc3Oy7z83/7w5NtymioZg5OHgOf///zP///80////Nf///yv///89////Ov///zr///84////M//T0m/3oaGk/bS0uv24ubPujouw2oqIoO3j40r///83////PP///zP///8K////Mf///z7///89////Pf///z3///80////Mf///zH///8x////Mf///zX///88////Pv///zf///8SAAAAAAAAAAAAAAAAI8AAACBAAAAAAAAAEAgAAAYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
head.appendChild(vodka);