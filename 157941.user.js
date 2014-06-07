// ==UserScript==
// @name       德阳旅游形象大使排名 Top 10
// @namespace  http://dachie.com
// @version    0.2
// @description  德阳旅游形象大使排名 Top 10
// @match      http://www.dystour.com/ds/finalist.aspx
// @include       http://www.dystour.com/ds/finalist.aspx
// @license			Public Domain
// @developer		Dachie
// @copyright  2013+, Dachie
// @updateURL		http://www.dachie.com/userscript/sortByDY.user.js
// ==/UserScript==
$ = window.unsafeWindow.$;
$(function() {
    var list = [];
    $.ajaxSetup({
        async: false
    });
	$.post("AjaxVote.aspx","userName=1044",function(){});
    for (var i = 1; i <= 3; i++) {
        $.post("http://www.dystour.com/ds/finalist.aspx", "__VIEWSTATE=%2FwEPDwUKLTM0Mzk3NDMxNw9kFgJmD2QWAgIDD2QWBAIDDxYCHgdWaXNpYmxlaBYCZg8WAh4EVGV4dGVkAgUPZBYEAgkPFgIeC18hSXRlbUNvdW50AhUWKmYPZBYCZg8VBgMwMzcJ5p2O6Zuo6IqpAzIzNgQzMDU5BDEwMjE7Li4vVXBMb2FkL3N0YWZmcy95LjM2ZWZjOWNlLWY5YWMtNGVjMy05YjZiLTRlN2JhMzZhYmVjZS5qcGdkAgEPZBYCZg8VBgMwMzgG55%2Bz6I6OAjE1AjQwBDEwODM7Li4vVXBMb2FkL3N0YWZmcy95LjU5Zjc0MGI3LTgxNjAtNDA1Zi05MDgxLWQ0YWU2MzZlYmM0My5qcGdkAgIPZBYCZg8VBgMwMzkJ5p2o5Yqb5pifATABNAQxMTA4Oy4uL1VwTG9hZC9zdGFmZnMveS43NmI3MGM3Mi03NmI5LTRhMjgtOWQ5Yy02MjJkODZjNGI3ZDkuanBnZAIDD2QWAmYPFQYDMDQ4Bum%2BmuWymgI0NAM2NDcEMTAyMjwuLi9VcExvYWQvc3RhZmZzL3kuYzI4ODI1ZTMtMzNiMC00Yzk3LTg3MWUtOTU4YjExZjFiZjE4LmpwZWdkAgQPZBYCZg8VBgMwNDkJ6JKL5paH5q2mAjM2AzQ1MAQxMTA5Oy4uL1VwTG9hZC9zdGFmZnMveS4xOGY5NTFmOC0yN2IxLTRiMTUtYWFjOC1jM2Q3MmY5MTY4NDUuanBnZAIFD2QWAmYPFQYDMDU1CeiRo%2BaWh%2BixqgMxNDcDNTIwBDEwMjM7Li4vVXBMb2FkL3N0YWZmcy95LjBmMjc3OWNhLWVjMGItNDlmYi1iMzM3LTdmNjc2YmIxYzNjYi5qcGdkAgYPZBYCZg8VBgMwNTYJ5YiY5re755qTAjM1AzE3OAQxMDg0Oy4uL1VwTG9hZC9zdGFmZnMveS5jMzk4Y2VlYy1mMDdkLTRkMmYtYjg4Yi05NmQ3YjRhMjhkOTIuanBnZAIHD2QWAmYPFQYDMDU3CemYrumdkumdkgMzNzIENzI5MAQxMDI1Oy4uL1VwTG9hZC9zdGFmZnMveS5mZjExYTlmZS05OTA1LTRkMzktOTRiZi1hNTNkY2UwMDk3Y2EuanBnZAIID2QWAmYPFQYDMDU5Cem7hOWFtOWFgwEwAjM0BDEwMjQ7Li4vVXBMb2FkL3N0YWZmcy95LjU3NWUzZDNkLWI3MDMtNDlkMy04NWIyLTMyNmExOTM5NjRlNi5qcGdkAgkPZBYCZg8VBgMwNjAG6YOt6ZuqAzM1NwIyMAQxMDI2Oy4uL1VwTG9hZC9zdGFmZnMveS5jNTNlZjg4OC03ZjBmLTQ5YTItOTc5Ny05Y2JhZDFlNGRhZmUuanBnZAIKD2QWAmYPFQYDMDYyCeiuuOaipuWmrgEwAjEzBDEwMjc7Li4vVXBMb2FkL3N0YWZmcy95LjZjNzgyNTBhLTU0YzktNDY3YS04NDRkLWRkZDJlMTRkMDdlNS5qcGdkAgsPZBYCZg8VBgMwNjMG5byg55G2AzE5OQM2MzQEMTAyODsuLi9VcExvYWQvc3RhZmZzL3kuYWU0NzgyNTUtMDVmMy00YzU3LTllNWYtYzUwODNhM2Q4MjNkLmpwZ2QCDA9kFgJmDxUGAzA2NAborrjmmLYDMzExATUEMTAyOTsuLi9VcExvYWQvc3RhZmZzL3kuMjM5ODlkM2MtMGI4Mi00MGNkLThmZTMtYzU2N2MyYzVjNDMxLmpwZ2QCDQ9kFgJmDxUGAzA2OAnnhorln7nln7kBMAE2BDEwMzA7Li4vVXBMb2FkL3N0YWZmcy95LmM1OTY3NWU4LWJhNWUtNDY5MC1hYzZlLTFkNTRkODI1ODBiMy5qcGdkAg4PZBYCZg8VBgMwNjkJ6Z%2Bp6Jek5a2QAzE2NwMxNDMEMTAzMTsuLi9VcExvYWQvc3RhZmZzL3kuNDkwNDhjZTktMTU4YS00ZTAxLTk5MmQtNWJjODQxMGY4ODVjLmpwZ2QCDw9kFgJmDxUGAzA3MQnmnajljY7lkJsDMzEwAjEyBDEwMzI5Li4vVXBMb2FkL3N0YWZmcy83MjFiNGJhYi1lYzM5LTRiNmUtYmFkNy1mYzUzY2ZlNGQ2NTMuanBnZAIQD2QWAmYPFQYDMDcyBumZiOmbqgMzMjYCNTYEMTAzMzsuLi9VcExvYWQvc3RhZmZzL3kuZDNkMzhhNDctMDFhMS00MjUxLTkxMzgtZTM4ZjY0ZjA5YzRiLmpwZ2QCEQ9kFgJmDxUGAzA3NAblj7bmlY8DMzExATUEMTAzNDsuLi9VcExvYWQvc3RhZmZzL3kuYmJkOTJkZmEtZjI1Yy00ZGU1LWE5ZGItZWVhY2NjNTMzZmJjLmpwZ2QCEg9kFgJmDxUGAzA3NgnmrrXkvbPpm68BMAE3BDEwMzU7Li4vVXBMb2FkL3N0YWZmcy95LjAwZTgyNDgzLWZmYTQtNDJiYy05ZjkyLTVhOWQyNjQ2ZTBhZC5qcGdkAhMPZBYCZg8VBgMwNzcG5L2Z6ZSQAzMxMAExBDEwMzY7Li4vVXBMb2FkL3N0YWZmcy95LjcyNDUxMTU0LTdjNTUtNGFhYS1hYjMzLTI1MzJlNDIwZjAyNi5qcGdkAhQPZBYCZg8VBgMwNzkJ5byg5oCd5769AzMxMAE0BDEwMzc7Li4vVXBMb2FkL3N0YWZmcy95LmZkMzVhYWZkLTVjNjUtNDA0NS04ODM3LTdhNTU4YmJkY2RjNy5qcGdkAgsPDxYGHgtSZWNvcmRjb3VudAJ3Hg5DdXN0b21JbmZvVGV4dAUr5b2T5YmN56ysMi826aG1IOWFsTExOeadoeiusOW9lSDmr4%2FpobUyMeadoR4QQ3VycmVudFBhZ2VJbmRleAICZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgMFJl9jdGwwOkNvbnRlbnRQbGFjZUhvbGRlcjE6SW1hZ2VCdXR0b24xBSZfY3RsMDpDb250ZW50UGxhY2VIb2xkZXIxOkltYWdlQnV0dG9uMgUmX2N0bDA6Q29udGVudFBsYWNlSG9sZGVyMTpJbWFnZUJ1dHRvbjM%3D&__EVENTTARGET=_ctl0%24ContentPlaceHolder1%24AspNetPager&__EVENTARGUMENT=" + i + "&_ctl0%3AContentPlaceHolder1%3AHiddenField1=0",
        function(x) {
            var dt = $(x).find("dt");
            for (var i = 0; i < dt.length; i++) {
                var data = {};
                data.name = dt.eq(i).find("span").text().replace(/(^\s+)|(\s+$)/g,"");
                var dx = dt.eq(i).html().match(/票:\d+/)[0].replace("票:", "");
                var wl = dt.eq(i).html().match(/支持率:\d+/)[0].replace("支持率:", "");
                data.value = parseInt(dx) * 10 + parseInt(wl);
                list.push(data);
            }
        });
    }
    var load = function() {
        list.sort(function aa(a, b) {
            return b.value - a.value;
        });
        var txt = "";
        for (var i = 0; i < 10; i++) {
            txt += (list[i].name + ":" + list[i].value + "\n");
        }
        console.log(txt);
    };
    load();
});