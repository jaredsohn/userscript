// ==UserScript==
// @name           Last.fm Artist Playcount/Chart Position Graph
// @namespace      http://abhin4v.myinfo.ws
// @include        http://www.last.fm/artist/*
// @include        http://www.last.fm/music/*
// @exclude        http://www.last.fm/music/*/+*
// @exclude        http://www.last.fm/artist/*/+*
// @exclude        http://www.last.fm/music/*/*/+*
// @exclude        http://www.last.fm/artist/*/*/+*
// @exclude        http://www.last.fm/music/*/*/*/+*
// @exclude        http://www.last.fm/artist/*/*/*/+*
// ==/UserScript==



(function() {
    lastfmPlaycountsVariation = {
        $x: function(p, context) {
            if (!context) context = document;
            var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
            return arr;
        },
        
        getUser: function() {
            if (this.$x("/html/body/div/div/div[2]/ul/li[2]/a")[0].innerHTML == "Log in")
                return '';
            
            return this.$x("/html/body/div/div/div/div/a[2]")[0].innerHTML;
        },
        
        getArtist: function() {
            return this.$x("/html/body/div[2]/div[3]/h1/a")[0].innerHTML;   
        },
        
        getData: function(url, cb) {
            //GM_log("url = "+url);
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(xhr) {
                    if (xhr.status == 200) cb("(" + xhr.responseText + ")");
                }    
            });
        },
        
        parseData: function(data) {
            //GM_log(data);
            data = eval(data);
            
            window.setTimeout(function() {}, 1000);
            var chartData = {'from':[],'playcount':[],'chartposition':[],'x':[],'y1':[],y2:[], 'ex':'','ey1':'',ey2:''};
            var maxPlaycount = 0;
            var maxChartposition = 0;
            var maxFrom = parseInt(data.value.items[data.value.items.length-1].from);
            var minFrom = parseInt(data.value.items[0].from);
            
            beginDate = new Date(minFrom*1000);
            endDate = new Date(maxFrom*1000);
            
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            beginMonth = beginDate.getMonth();
            endMonth = endDate.getMonth();
            beginYear = beginDate.getFullYear();
            endYear = endDate.getFullYear();
            
            //GM_log(months[beginMonth]+ " " + beginYear);
            //GM_log(months[endMonth]+ " " + endYear);
            
            monthsCount = (endYear - beginYear)*12 + (endMonth - beginMonth);
            chartMonths = [];
            chartYears = [];
            
            for (var i = 0; i < monthsCount; i++) {
                if (i%3 == 0) chartMonths.push(months[(beginMonth + i)%12]);
                else chartMonths.push('');
                if (i%12 == 0) chartYears.push(beginYear + Math.floor(i/12));
                else chartYears.push('');
                
            }
                
            chartMonths.push('');
            chartYears.push('');
            //GM_log(chartMonths);
            
            
            
            data.value.items.forEach(
                function(item) {
                    chartData.from.push(parseInt(item.from));
                    chartData.x.push(parseInt(item.from)-minFrom);
                    if (item.playcount != null) {                        
                        chartData.playcount.push(parseInt(item.playcount));
                        chartData.chartposition.push(parseInt(item.chartposition));
                        chartData.y1.push(parseInt(item.playcount));
                        if (maxPlaycount < parseInt(item.playcount)) maxPlaycount = parseInt(item.playcount);
                        if (maxChartposition < parseInt(item.chartposition)) maxChartposition = parseInt(item.chartposition);
                    }
                    else {
                        chartData.playcount.push(-1);
                        chartData.chartposition.push(-1);
                        chartData.y1.push(-1);
                    }
                }
            );
            
            for (var i = 0; i < chartData.chartposition.length; i++) {
                if (chartData.chartposition[i] != -1)
                    chartData.y2[i] = maxChartposition -(chartData.chartposition[i] - 1);
                else
                    chartData.y2[i] = -1;
            }
            
            chartData.ex = lastfmPlaycountsVariation.simpleEncode(chartData.x, maxFrom-minFrom);
            chartData.ey1 = lastfmPlaycountsVariation.simpleEncode(chartData.y1, maxPlaycount);
            chartData.ey2 = lastfmPlaycountsVariation.simpleEncode(chartData.y2, maxChartposition);
            //GM_log(chartData.ex);
            //GM_log(chartData.ey1);
            //GM_log(chartData.ey2);
            /*chartData.cx = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            chartData.cy = lastfmPlaycountsVariation.compressData(chartData.ex, chartData.ey);
            
            cmaxPlaycount = 0;
            for (var i=0; i < chartData.cy.length; i++) {
                var playcount = chartData.cx.indexOf(chartData.cy.charAt(i));
                if (playcount > cmaxPlaycount) cmaxPlaycount = playcount;
            }*/
            
            //GM_log(chartData.cx);
            //GM_log(chartData.cy);
            insertHere = lastfmPlaycountsVariation.$x('/html/body/div[2]/div[5]/div/div[2]/div[2]/div/h3')[0];
            maxHeight = (maxChartposition > maxPlaycount) ? maxChartposition : maxPlaycount;
            //GM_log(maxPlaycount + " " + maxChartposition + " " + maxHeight);
            width = parseInt(insertHere.offsetWidth) - 10;
            height = Math.round(width/3) + 5;
            chartImgUrl = 'http://chart.apis.google.com/chart?' +
                'chs=' + width + 'x' + height + '&' +
                'chd=s:' + chartData.ex + ',' + chartData.ey1 + ',' + chartData.ex + ',' + chartData.ey2 + '&' +
                //'chtt=Playcount+over+time&' +
                'cht=lxy&' +
                'chm=r,E5ECF9,0,' + Math.round((1-10/maxChartposition)*100)/100 + ',1.00&' +
                'chxt=x,x,y,r&' +
                'chco=FF9933,6666CC,E5ECF9&' +
                'chdl=Playcount|Chart Position|Top 10&' +
                'chxl=' + '0:|' + chartMonths.join('|') +
                '|1:|' + chartYears.join('|') + 
                '|2:|0|' + Math.floor(maxPlaycount/5) + '|' + Math.floor(2*maxPlaycount/5) + '|' + Math.floor(3*maxPlaycount/5) + '|' + Math.floor(4*maxPlaycount/5) + '|' + maxPlaycount +
                '|3:|' + maxChartposition + '|' + Math.floor(4*maxChartposition/5) + '|' + Math.floor(3*maxChartposition/5) + '|' + Math.floor(2*maxChartposition/5) + '|' + Math.floor(maxChartposition/5) + '|1';
                
            //GM_log(chartImgUrl);
                        
            d = document.createElement('div');
            i = document.createElement('img');
            h3 = document.createElement('h3');
            h3.innerHTML = 'Artist Playcount/Chart Position Graph';
            i.src = chartImgUrl;
            i.style.padding = "2px";
            i.style.backgroundColor = "#FFFFFF";
            d.appendChild(h3);
            d.appendChild(i);
            insertHere.parentNode.insertBefore(d, insertHere);
            
        },
        
        simpleEncode: function(values,maxValue) {
            var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var chartData = [];
            for (var i = 0; i < values.length; i++) {
                var currentValue = values[i];
                if (!isNaN(currentValue) && currentValue >= 0) {
                    chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length-1) * currentValue / maxValue)));
                } else {
                    chartData.push('_');
                }
            }
            return chartData.join('');
        },
        
        compressData: function(x, y) {
            var cy = [];
            var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < simpleEncoding.length; i++) {
                cy[i] = [];
            }
            for (var i = 0; i < x.length; i++) {
                idx = simpleEncoding.indexOf(x.charAt(i));
                cy[idx].push(simpleEncoding.indexOf(y.charAt(i)));
            }
            
            for (var i = 0; i < cy.length; i++) cy[i] = lastfmPlaycountsVariation.avg(cy[i]);
            //GM_log(uneval(cy));
            return(lastfmPlaycountsVariation.simpleEncode(cy, simpleEncoding.length-1));
        },
        
        avg: function(nums) {
            sum = 0;
            flag = 1;
            for (var i = 0; i< nums.length; i++)
                if (nums[i] != -1) {
                    sum += nums[i];
                    flag = 0;
                }
            
            if (flag) return(-1);
            return(Math.round(sum/nums.length));
        }    
    };
    
    //insertHere = lastfmPlaycountsVariation.$x("/html/body/div/div[4]/div/div[2]/div[2]/div/h3")[0];
    //insertHere.parentNode.insertBefore(document.createElement('div'), insertHere).innerHTML = "<canvas id='canvas' height='300' width='400'></canvas>";
    
            
    user = lastfmPlaycountsVariation.getUser();
    //GM_log("user = "+user);
    if (user != '') {
        artist = lastfmPlaycountsVariation.getArtist();
        //GM_log("artist = "+artist);
        dataURL = "http://pipes.yahoo.com/pipes/pipe.run?_id=DPyk_K9E3BGNzxTTDtXErg&_render=json&artist="+artist+"&user="+user;
        lastfmPlaycountsVariation.getData(
            dataURL,
            lastfmPlaycountsVariation.parseData
        );
    }
})();