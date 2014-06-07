// ==UserScript==
// @name       Vendetta Duel Rating
// @namespace  http://userscripts.org/users/501971
// @version    0.3
// @description  V for Vendetta (Duelists alliance in RU11 World)
// @include     http://ru11.the-west.ru/game.php*
// @copyright  2014+, neversleep1911
// ==/UserScript==

(function (func) {
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = "(" + func.toString() + ")();";
	document.body.appendChild(script);
	document.body.removeChild(script);
}(function () {
    var TW_Widgets = {
        MenuButton: function(image, title, onclick) {
            var self = this;

            this.isHovered = false;
            this.onClick = onclick;
    
            var clicked = function() {
                if (self.onClick)
                    self.onClick(self);
            }
    
            var repaint = function() {
                var x = !self.isHovered ? 0 : -25;
                self.obj.css("background-position", x + "px 0px");
            }
    
            var mouseIn = function() {
                self.isHovered = true;
                repaint();
            }
    
            var mouseOut = function() {
                self.isHovered = false;
                repaint();
            }
    
            this.obj = $("<div class='menulink' title='" + title + "' />").css("background-image", "url(" + image + ")");
            this.obj.hover(mouseIn, mouseOut);
            this.obj.click(clicked);

            $("div#ui_menubar").append($("<div class='ui_menucontainer' />").append(this.obj).append("<div class='menucontainer_bottom' />"));
		}
    };

    var TW_DuelRating = {
        gui: {
            window: null,
            table: null,
            buttons: [],
            progress: null,
        },
        info: {
            name: 'Vendetta Duel Rating'
        },
        players: [],
        stopped: true,
        timer: 0
    };

    TW_DuelRating.init = function() {
		new TW_Widgets.MenuButton(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMXCC4Qdi2K+QAADaBJREFUWMNV1kmTXddBwPH/Pefc+d439ns9qtWyJkuek9jxiJ3EVAgUECAbNmyo7FhRKVhRaEMVXyJVfAeKAkKSIrZD4km2Ylm2JUut1tCt7n6v33TvfXc8h0VSqeQT/LY/65/+5hlzsD+iN3yOz+/fxixSYj+i9DLCJsZv5Sxri07UZVEUTGZT/KZmbmu6KKgN7bDD0TRl7/CEUZmDkqxELZplwXrH5+lLPQ72c1bW1tm9v0+ZpbQ6PZJEE3U1ygede3TigCzTJNMZ2smpKwvtNUSVwglCxqMZh9MF46xCuIJIuijTMGi5WP/8vefMxSee4x/+9d84aDRWDShBrQ3S2Bhjo60cZRoaBEYYHC0pLYFrAko5RSAxukEbga88qnrJRgv+8Qd/y9HVt5BewOlzL/HxjescFQnGgqYuca0YmJPnCtv1abyEuhAoY1GrArfoor0GmgTLCLQWNDTYto20SjpuzFeefILdqz9Hnl1vXfmv/3mfO5OC7Z1NLl68QDVf4LoNHTfAc5Z02y4tDKGnWIldQiWwPQs/qPEdm3YUYFkNyrKRAhSGNDfUZcl3v/kk71/f49//911SUWL5EbWKoUwIHJvCKlG2puU4lE1KLAW9loexwBMgXI3vhWCgKpYIywNjUxYNeV5zfJjwrZcfQ4DFKJ3TOJLNtQ3+6E//ir//wd+x0upiyQJpBJbR6MBFOQGmMSAkCo2jLHxTI4qUptKExgPR0OpCq2fzwafX+TxzkN0eifBZ67cpS5fnXvg2L73xFzyaZlSLAqklj0ZjbO0xnS64/3BGOq44mp0wG2eUi4rp4THLrKYTOwgSLnVsunbBrYOH3Cq6yK+//PUr//3+Hda7EXv37vDFh++xdvoczz7zJMtlynR0QDtwqJc5yqoRykb5NtQghAahQBvWehGtlqET+fTxaSlFMjOcOdtmc22Tazfu0G95VNWMn/zHjxieOsv26TM8OBwxPznCKE1Rahw/RAjJYG0F1/awdMMsSzHSRtqK0XhM3RjmeUNRCsIoRNcZ8tt//NSVX777Gd0YWspFG0Oze52HhcXLL74IymH/eIwRkhpQnkRJGAyGRKHPaDzC83yU7bI/nuAon35UMi8y4njA5W5BVtTs7U3od0NcJfFtOPr4Ax4WFs9/7QXSXGPVOWuDLslsil1XjA/2WU5mKCUJ/ZC6KSnLgk4UEngBtpB42qExt3hsy0c+2xVX9u5P2eqH2Kqk31tF2Tat0V2u3jngjW+9QRTGeGhavkPoSkLpI5qSTuzQjtp0HEUcGnzl0nEkqAmBr2l0wPe/+wK79w7ZPRrh65Qizeh4Dg2G8Pg+V+8c8Mobf0BSCKyqxBMGXZUMhj3iMGBje4cqTwk9hasNTVpgK4jdDGc6Y1lKXnvxdeQ3znev7N5fEHuGXlDixwO0JTlMcnZMwocff4rqDbl46XEOj46RdUEYeAwCC1EvQHpshSCtEumEbPgN3SCgTME4q1y+1FCUDu99Nub0MGSwMiDutoniiHG6ZJjPf2usn9phNjlm4IHvCKSSmHpJkSWsrW2yTGZ0uy2MtvBkRcdWWHZIGDrI77x2+cqHn++xuRIhXBtZGQb9Nr1Oh5M0ZceuOd4/YFxanL14EdfzcZsMXdVYxsKIEMcuKJOSWoQEXk2+KAk7MYFTsNb6KkcNfHHzJmfamnbgUC7nuGZJvxuRGsGazjn6jTHcPkuOjZ1PaeoanSc4tk1VLHEdG0UJTU3LabBjj6zUdAcdRBP0MLaNJXICN8CYJXtffsI0eUDc8zmUNr1qgbx9jY8//IhauLR3niCvCxxP4XCC43QZrHRoeRmu12e41kdJiyIrmKTX6A3BDhvitbPklkdOwH4Ci7xmc2vI1A9/z0hqRTl4iknRkDYOWaEpa0jSnLKxKbQgr1rUZYguKihLRKNzIlsSOjYGh3glprfaInQCLGHTG8Yk/Q4tq+B0+oB7d/Z4cDji9NfexOnEYKDT1nRaPk3Z0I5rWqHN9GTCyXTO9s5TzI7HlJmFlYxwqpSYnJaskNowH88YxIqq9/vGvUdH9M69hG07KAPJPMWUFcv5AlVlWLogSyaMDg9xLImqFyOS3LCYW/jdimXe0GgHbSAvU1zj4niKAy/mpdf/hFfPXeZ4csLP3v4Zzzz5FVa3l+SjO5ykEzr9Lu1OjzSZsXHqNFGSE4ouou4wmRgeHqYEgU9tDOPjBGHlOK6HtjR1pRm7bb76+nd49fzvGs8R6SWHH39ImWZIJciyOavDFXptePzpp9jc2Ub+2csXr/zk/V1s22J8PMb3Qspas1ik1JWhKArKvKEsNQ/392kP1jjz2DleeP7rvPfBB+wfTvH8DkdHx2gjSLMa27aIvC6HkwXPX1ohNg3/eXWX0EhOpgXjeY4lbZQMmMwy8sqga4Nt+zzYPyDqrXDm7O8Yoynrm2ewtEVRNiyXUFUW7VabWaUZrA2Qrz7Wv/LOjWPWOiFG+czmKbNxhvA6nBxNsf02RVZR2Q6mKrj16UfcuX2Lrcce58knL7O+vkl/fYfJdMYyL6lrw3wy5ea9R3y6d8ATWxt8efcWV+9OaLc7uHGbGsXq6hZLBBUgbYfB1g5JUSOlze2bn3Hj+nW2z134rdFb2+TWrZvUWhD3BizKhrIWvPerWwzXe8idjn3l6oMpG8MYXRgc6dIfrqKEJMtKLCmxHZ/lPMcgkMohmU149+2fsXPuErUluHrtGoPBOu+98w51YxiP52RFxaKoiSwXSPnF7oxz51uk+YLGylg2MyqT0ht0kJ7F8fQQP7YQqiZu+whR8Iuf/5St7fPU/NrY2tnhzu4nLPITorYiX2Y8GhUMV9uI009tUxvN/GRBlU0pq5Tjo4ck02M2toc4CtBL1rb6+L6NLQztyGfYa/HLt37E+HCfCxfOs7m1SdwKkVQgDacvPE5jwYXne1z45tdoMCwOC5QOmB3WmMxnclxCHVBlNsO4hyoNVBZNpilTyfbKKa69+zYnhwdcuHCerVOn0JVirbNG1w1Y6US02x6n1s+ggrDDituiFyj8SFJlORgbL1ZIK6ERS7prXZSU2BqCuEU6T/ECB+EKPr32Pq898xyj+7dpuYbYtzG5ISBlPYjZXnW5/2DJoOPw9KU+i5M5p9dWKaqS894QpQp0BL7tUhbgeh6O65JmKUJoFrrmxq8+4JWnn+Ho+m02O5LNvo0lbGxpsbs7Yn21i7zQdq/kVcH6wGFVuTTOClHLZc0LyLRPxxegAxAw9GySyqbtS7QVMkmXdDo97v7fj9EPb5MrH78Vc/nCBjiKLz7bo7cVc3T/mEo6nOm0iaM2ooG1/pAobKGEpMobqkZgGrAdn+NFg6sc6kpzkpX0VobcfvtH6AdfUtoBnd6QdrtLIEo+fbiHGxlU0LLZH83JRUy8XDBqQoY9j0fJjJNa0nM1SZ7hRiGH9ZJJo2irCm1buL7k6P4ucytm1c6x0zmTMKZXLKkbl14/ZjqrOLPzGD/88U8Rc4NQEuUFRElGXjVIKbEwNHWGFoq4LhGO4NGipKkqKq159OABZbjCIM3Q0wk37h8zyGpODyNWO30Woxnq7FoHpzIMul22dvq4+xmD1RZWLyRaNPR7DnVt0RhJ6Gg6iabddlAqxpiSxWRMt2VTH57Qtw3HpmI+z1ndOM+Tl55mRc1YiQ1nQsnZJ0JsEVGbAt9xKaoCISRggXGABktYCAF1Y6GkT1XV2EpRLB2qG5K2qTAqo9uP8Trw4uWLRJFAPSw8gnZEP4gJ2iG96T260mJWGfqhTWw7uKpmliaEKsaLQFITOEum8yX92CMdnxDHXZbzI1bLghv3UrL8iDRfsrPVZ3diowJJFEbMJwXdfkhd1WhdIaWFZQyO64AlWSwShBC4jkuWLDDSwnVbjA8esfkbo5fkXPvoJqsbfdxiztZmF/XTn3/BraMTHsxTVnsx+WRG2IpIsxzXsVnME/r9HtN5QifOODo+JIhilCVACiQW1TLhzVMBZQ3T2QzL6/PZ7pdorTEcIc0Bt0YZxTu7LOYJSimkFCAs6qpimZc4UuF5Nk4YIhpDVi6xtEFYkuniJr3QZ33oUtYwHk9wupskjxI+ORxxlBnUn7/26zo/HOegC7o9G01OJ7awrJrI9ahFzkpPovWC9fUYYRloKrQ0GG3hBx7vzAqy0qPT6hIHLZaPDtjc9jmzNeT1S89Smo9467N7xH4EuqHWFWVR02iNFArfd0gWhuz4GNdRlGWNQWBZFsYISl3yw5McDQir4XuX17n6yS+4eOYcjmeQ339p7crlx8/z3o1b7E8NLddjVmls2yOfG3IpmCcCGo02FlmmyQqLtHGpE01eWFiOT1I3NKbi3nHC4tGIU9sR33jzBfTBLqe2fZ59+hUe3v6cTGhWAo9hN+dUK2I9gFMrfboqoZYNl1YDQmnor/bZCR02VgRRI1lZ7XLudIc6L9mIBG99fpetZzf5y6/0UfUh1r/89QumJQRfHB5ykNRsrq1ysig4mKQkaQplSnewgm9pWkBkg+NKWoFL0JV4DqS5we+tko1OGM0XaDPmD189i9NM+fhulypRtBXcnVbcO37ExsYmaWl4eHTCrKop5if0PB+7G9FLLFbbilQuWQ99VChpdSQWYAChtpiO9rCPZpx5pUUT9dm794D/B+j6xL1E88nvAAAAAElFTkSuQmCC',
			TW_DuelRating.info.name,
			TW_DuelRating.showMainWindow);

        // styles
        $('head').append('<style type="text/css">' +
                         'div.vdr_player_rank { text-align: center; width: 45px; }' +
                         'div.vdr_player_name { width: 180px; }' + 
                         'div.vdr_player_duel_win, div.vdr_player_duel_loss, div.vdr_player_duel_diff, div.vdr_player_duel_win_percent { text-align: right; width: 45px; }' +
                         '</style>');
    }

    TW_DuelRating.showMainWindow = function() {
        TW_DuelRating.stopped = true; // !
        
        TW_DuelRating.gui.window = wman.open('tw-vendetta-duel-rating', null, 'noreload');
        TW_DuelRating.gui.window.setTitle(TW_DuelRating.info.name).setMiniTitle(TW_DuelRating.info.name);
        TW_DuelRating.gui.window.addEventListener('WINDOW_DESTROY', function() {
        	TW_DuelRating.gui.window = null;
            TW_DuelRating.stop(false);
        });
        $(TW_DuelRating.gui.window.getMainDiv()).css('width', '520px');
        
        var content = $('<div></div>');
        TW_DuelRating.gui.window.appendToContentPane(content);

        TW_DuelRating.gui.table = new west.gui.Table().setId('vendetta-duel-rating');
        TW_DuelRating.gui.table
        	.addColumn('vdr_player_rank')
        	.addColumn('vdr_player_name')
        	.addColumn('vdr_player_duel_win')
        	.addColumn('vdr_player_duel_loss')
        	.addColumn('vdr_player_duel_diff')
        	.addColumn('vdr_player_duel_win_percent');
        TW_DuelRating.gui.table
        	.appendToThCell('head', 'vdr_player_rank', 'Ранг', 'Ранг')
        	.appendToThCell('head', 'vdr_player_name', 'Имя персонажа', 'Имя персонажа')
        	.appendToThCell('head', 'vdr_player_duel_win', 'Победы', 'Поб.')
        	.appendToThCell('head', 'vdr_player_duel_loss', 'Поражения', 'Пор.')
        	.appendToThCell('head', 'vdr_player_duel_diff', 'Разница', 'Разн.')
        	.appendToThCell('head', 'vdr_player_duel_win_percent', '% Побед', 'Поб. %');
        
        TW_DuelRating.gui.table.appendTo(content);
        $(TW_DuelRating.gui.table.bodyscroll.getMainDiv()).css('height', '261px');
        
        TW_DuelRating.gui.progress = new west.gui.Progressbar(0, 0);
        $(TW_DuelRating.gui.progress.getMainDiv()).css({ top: '16px', width: '440px' }).hide()
        
        var footer = $('<div style="height: 47px;"></div>'), button;
        footer.append(TW_DuelRating.gui.progress.getMainDiv());
        
        button = new west.gui.Button('Торнадо', function() { TW_DuelRating.updateTable(5957); });
        footer.append($(button.getMainDiv()).css({ position: 'absolute', right: 0, top: '6px' }));
        TW_DuelRating.gui.buttons.push(button);

        button = new west.gui.Button('Саламандра', function() { TW_DuelRating.updateTable(5975); });
        footer.append($(button.getMainDiv()).css({ position: 'absolute', right: '100px', top: '6px' }));
        TW_DuelRating.gui.buttons.push(button);

        TW_DuelRating.gui.table.appendToFooter('vdr_player_rank', footer);
    }

    TW_DuelRating.updateTable = function(townId) {
		var done = function(error) {
            if (!error) {
                TW_DuelRating.players.sort(function(a, b) {
                    var p1 = a.duel_win - a.duel_loss;
                    var p2 = b.duel_win - b.duel_loss;
                    return p2 - p1;
                });

                for (var i = 0; i < TW_DuelRating.players.length; i++) {
                    var p = TW_DuelRating.players[i];
                    var cells = {};
                    cells['vdr_player_rank'] = i + 1;
                    cells['vdr_player_name'] = '<a href="javascript:void(PlayerProfileWindow.open(' + p.player_id + '));">' + p.name + '</a>';
                    cells['vdr_player_duel_win'] = p.duel_win;
                    cells['vdr_player_duel_loss'] = p.duel_loss;
                    cells['vdr_player_duel_diff'] = p.duel_win - p.duel_loss;
                    cells['vdr_player_duel_win_percent'] = Math.floor((p.duel_win * 100) / (p.duel_win + p.duel_loss)) + '%';
    
                    TW_DuelRating.gui.table.buildRow(i, cells, (Character.name == p.name) ? function(row) {
                        row.addClass("highlight_row");
                        return row;
                    } : null);
                }
            }
            TW_DuelRating.stop(true);
        }

        var fetchRanking = function(ranking, player) {
            for (var i = 0; i < ranking.length; i++) {
            	var p = ranking[i];
                if (p.name == player.name) {
                	TW_DuelRating.players.push(p);
                    break;
                }
            }
        }

        var fetchPlayers = function(players) {
            var timerFunc = function() {
                if (TW_DuelRating.stopped) {
                    return;
                }

                var player = players.pop();
                TW_DuelRating.gui.progress.increase();

                Ajax.remoteCallMode('ranking', 'get_data', {
                    rank: NaN,
                    search: player.name,
                    tab: 'duels'
                }, function(json) {
                    if (json.error) {
                        done(true);
                        return new UserMessage(json.msg, UserMessage.TYPE_ERROR).show();
                    }
                    fetchRanking(json.ranking, player);

                    TW_DuelRating.timer = 0;
                    if (players.length > 0)
                    	TW_DuelRating.timer = setTimeout(timerFunc, 1500);
                    else {
                        done(false);
                    }
                });
            }
            timerFunc();
        }
        
        TW_DuelRating.start();
        
        Ajax.remoteCallMode('building_saloon', 'get_data', {
            town_id: townId,
		}, function (json) {
            if (json.error) {
                done(true);
                return new UserMessage(json.msg, UserMessage.TYPE_ERROR).show();
            }

            TW_DuelRating.gui.progress.setMaxValue(json.players.length);
			fetchPlayers(json.players);
        });
    }
    
    TW_DuelRating.start = function() {
        if (!TW_DuelRating.stopped)
            return;

		TW_DuelRating.players = [];
        TW_DuelRating.stopped = false;
        for (var i = 0; i < TW_DuelRating.gui.buttons.length; i++) {
        	$(TW_DuelRating.gui.buttons[i].getMainDiv()).hide();
        }
        TW_DuelRating.gui.table.clearBody();
        TW_DuelRating.gui.window.showLoader();

		TW_DuelRating.gui.progress.setValue(0);
        TW_DuelRating.gui.progress.setMaxValue(0);
        $(TW_DuelRating.gui.progress.getMainDiv()).show();
    }

    TW_DuelRating.stop = function(showControls) {
        TW_DuelRating.stopped = true;

        if (TW_DuelRating.timer != 0) {
            clearInterval(TW_DuelRating.timer);
            TW_DuelRating.timer = 0;
        }
        if (showControls) {
            for (var i = 0; i < TW_DuelRating.gui.buttons.length; i++) {
                $(TW_DuelRating.gui.buttons[i].getMainDiv()).show();
            }
            $(TW_DuelRating.gui.progress.getMainDiv()).hide();
            TW_DuelRating.gui.window.hideLoader();
        }
    }

    $(document).ready(TW_DuelRating.init);
}));