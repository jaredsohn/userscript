// ==UserScript==
// @name      Tomato by Shibby 韌體中文化
// @namespace      http://userscripts.org/users/612505
// @homepage      http://userscripts.org/users/612505
// @description      此腳本用來中文化 Tomato by Shibby 韌體,這樣就不用針對韌體去中文化,新版出了也可立即享受中文化版本的 Tomato by Shibby 韌體。
// @include      http://192.168.1.1/*
// @include      https://192.168.1.1/*
// @include      http://192.168.2.1/*
// @include      https://192.168.2.1/*
// @copyright      ken670128
// @version      0.8.115
// @downloadURL      http://userscripts.org/scripts/source/422411.user.js
// @updateURL      http://userscripts.org/scripts/source/422411.meta.js
// @icon      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACxZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjEyOjE4ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzQgV2luZG93cyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMTAtMDUtMjBUMTU6MDQ6MzQtMDc6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDEwLTA1LTIwVDE1OjA0OjM0LTA3OjAwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDEwLTA1LTIwVDE1OjA0OjM0LTA3OjAwIgogICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIvPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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
// ==/UserScript==


/*	
2014/04/03 v0.8.115
此腳本在 Shibby 的 Tomato v115 的環境下所撰寫,理論上未來版本也可適用。
此腳本主要在使用 Asus RT-N12 的環境下所撰寫,有些項目可能會因 RT-N12 未支援而沒翻到。
此腳本主要以 Shibby 的 Tomato v115 Max 版本來翻譯,使用其它版本也可使用,僅會有些地方沒中文化。
翻譯完成的部份,目前有些地方還未能中文化,目前已不打算研究解決,因為那僅有一小部份。
翻譯完成的部份若有不適當的譯詞或是漏翻的部份,歡迎提供建議及回報。
翻譯的譯詞大都參考數位天堂 Aven 所中文化的 Tomato Shibby 中文版韌體。
數位天堂 : http://digiland.tw/
替代文字代碼從 JoeSimmons 所寫的 Replace Text On Webpages 所改寫。
JoeSimmons : http://userscripts.org/users/23652
*/


	// Tomato 介面中文化
	// ===============================================================
	var TomatoPage = window.location.pathname.replace(/\//g,"");
	Tomato_Gui = document.getElementsByClassName('title');
	Tomato_Gui[0].innerHTML = '蕃茄 (Tomato)';

	Tomato_Gui = document.getElementsByClassName('version');
	Tomato_Gui[0].innerHTML = "Shibby's Tomato 油猴中文化版本";
	


	// Tomato 選單中文化
	// ===============================================================
	Tomato_Menu = document.getElementsByClassName('indent1');
		for (var i = 0 ; Tomato_Menu.length > i ; i++) {
			switch(Tomato_Menu[i].innerHTML) {
				case 'Status':
					Tomato_Menu[i].innerHTML = '系統狀態';
					break;
				case 'Bandwidth':
					Tomato_Menu[i].innerHTML = '頻寬監控';
					break;
				case 'IP Traffic':
					Tomato_Menu[i].innerHTML = 'IP 流量監控';
					break;
				case 'Tools':
					Tomato_Menu[i].innerHTML = '診斷工具';
					break;
				case 'Basic':
					Tomato_Menu[i].innerHTML = '基本設定';
					break;
				case 'Advanced':
					Tomato_Menu[i].innerHTML = '進階設定';
					break;
				case 'Port Forwarding':
					Tomato_Menu[i].innerHTML = '連接埠轉送';
					break;
				case 'Access Restriction':
					Tomato_Menu[i].innerHTML = '連線管制';
					break;
				case 'QoS':
					Tomato_Menu[i].innerHTML = '網路品質管理';
					break;
				case 'Bandwidth Limiter':
					Tomato_Menu[i].innerHTML = '頻寬限制';
					break;
				case 'Captive Portal':
					Tomato_Menu[i].innerHTML = '網頁認證';
					break;
				case 'VPN Tunneling':
					Tomato_Menu[i].innerHTML = 'VPN 通道';
					break;
				case 'Administration':
					Tomato_Menu[i].innerHTML = '路由器管理';
					break;
				case 'About':
					Tomato_Menu[i].innerHTML = '關於 Tomato';
					break;
				case 'Reboot...':
					Tomato_Menu[i].innerHTML = '重新開機...';
					break;
				case 'Shutdown...':
					Tomato_Menu[i].innerHTML = '關機...';
					break;
				case 'Logout':
					Tomato_Menu[i].innerHTML = '登出';
					break;
			}
		}

	
	Tomato_Menu = document.getElementsByClassName('indent2');
		for (var i = 0 ; Tomato_Menu.length > i ; i++) {
			switch(Tomato_Menu[i].innerHTML) {
				case 'Overview':
					Tomato_Menu[i].innerHTML = '系統資訊';
					break;
				case 'Device List':
					Tomato_Menu[i].innerHTML = '連線裝置列表';
					break;
				case 'Web Usage':
					Tomato_Menu[i].innerHTML = '網站瀏覽記錄';
					break;
				case 'Logs':
					Tomato_Menu[i].innerHTML = '系統日誌';
					break;
				case 'Real-Time':
					Tomato_Menu[i].innerHTML = '即時流量';
					break;
				case 'Last 24 Hours':
					Tomato_Menu[i].innerHTML = '24小時內流量';
					break;
				case 'Daily':
					Tomato_Menu[i].innerHTML = '每日流量';
					break;
				case 'Weekly':
					Tomato_Menu[i].innerHTML = '每週流量';
					break;
				case 'Monthly':
					Tomato_Menu[i].innerHTML = '每月流量';
					break;
				case 'View Graphs':
					Tomato_Menu[i].innerHTML = '圖表分析';
					break;
				case 'Transfer Rates':
					Tomato_Menu[i].innerHTML = '傳輸速率';
					break;
				case 'Trace':
					Tomato_Menu[i].innerHTML = '路由追蹤';
					break;
				case 'System Commands':
					Tomato_Menu[i].innerHTML = '系統指令';
					break;
				case 'Wireless Survey':
					Tomato_Menu[i].innerHTML = '搜尋無線基地台';
					break;
				case 'WOL':
					Tomato_Menu[i].innerHTML = '網路喚醒';
					break;
				case 'Network':
					Tomato_Menu[i].innerHTML = '網路連線';
					break;
				case 'IPv6':
					Tomato_Menu[i].innerHTML = 'IPv6 設定';
					break;
				case 'Identification':
					Tomato_Menu[i].innerHTML = '基本資料';
					break;
				case 'Time':
					Tomato_Menu[i].innerHTML = '網際網路時間';
					break;
				case 'DDNS':
					Tomato_Menu[i].innerHTML = '動態 DNS';
					break;
				case 'Static DHCP/ARP/IPT':
					Tomato_Menu[i].innerHTML = '靜態 DHCP/ARP/IPT';
					break;
				case 'Wireless Filter':
					Tomato_Menu[i].innerHTML = '無線存取控制';
					break;
				case 'Conntrack/Netfilter':
					Tomato_Menu[i].innerHTML = '連線追蹤/過濾';
					break;
				case 'DHCP/DNS':
					Tomato_Menu[i].innerHTML = 'DHCP/DNS 設定';
					break;
				case 'Firewall':
					Tomato_Menu[i].innerHTML = '防火牆';
					break;
				case 'MAC Address':
					Tomato_Menu[i].innerHTML = 'MAC 位址';
					break;
				case 'Miscellaneous':
					Tomato_Menu[i].innerHTML = '其他設定';
					break;
				case 'Routing':
					Tomato_Menu[i].innerHTML = '路由表';
					break;
				case 'TOR Project':
					Tomato_Menu[i].innerHTML = '洋蔥路由';
					break;
				case 'VLAN':
					Tomato_Menu[i].innerHTML = '虛擬區域網路';
					break;
				case 'LAN Access':
					Tomato_Menu[i].innerHTML = '區域網路控制';
					break;
				case 'Virtual Wireless':
					Tomato_Menu[i].innerHTML = '虛擬無線網路';
					break;
				case 'Wireless':
					Tomato_Menu[i].innerHTML = '無線網路';
					break;
				case 'Basic':
					Tomato_Menu[i].innerHTML = '基本設定';
					break;
				case 'Basic IPv6':
					Tomato_Menu[i].innerHTML = 'IPv6 基本設定';
					break;
				case 'DMZ':
					Tomato_Menu[i].innerHTML = 'DMZ 隔離區';
					break;
				case 'Triggered':
					Tomato_Menu[i].innerHTML = '觸發式轉送';
					break;
				case 'UPnP/NAT-PMP':
					Tomato_Menu[i].innerHTML = '通用隨插即用';
					break;
				case 'Basic Settings':
					Tomato_Menu[i].innerHTML = '基本設定';
					break;
				case 'Classification':
					Tomato_Menu[i].innerHTML = '分級管制';
					break;
				case 'View Details':
					Tomato_Menu[i].innerHTML = '連線列表';
					break;
				case 'OpenVPN Server':
					Tomato_Menu[i].innerHTML = 'OpenVPN 伺服器';
					break;
				case 'OpenVPN Client':
					Tomato_Menu[i].innerHTML = 'OpenVPN 用戶端';
					break;
				case 'PPTP Server':
					Tomato_Menu[i].innerHTML = 'PPTP 伺服器';
					break;
				case 'PPTP Online':
					Tomato_Menu[i].innerHTML = 'PPTP 連線狀態';
					break;
				case 'PPTP Client':
					Tomato_Menu[i].innerHTML = 'PPTP 用戶端';
					break;
				case 'Admin Access':
					Tomato_Menu[i].innerHTML = '連線登入與密碼';
					break;
				case 'TomatoAnon':
					Tomato_Menu[i].innerHTML = '匿名回報';
					break;
				case 'Bandwidth Monitoring':
					Tomato_Menu[i].innerHTML = '頻寬監控';
					break;
				case 'IP Traffic Monitoring':
					Tomato_Menu[i].innerHTML = 'IP 流量監控';
					break;
				case 'Buttons/LED':
					Tomato_Menu[i].innerHTML = '按鈕 / 燈號';
					break;
				case 'CIFS Client':
					Tomato_Menu[i].innerHTML = '網路芳鄰掛載';
					break;
				case 'Configuration':
					Tomato_Menu[i].innerHTML = '路由器設定值';
					break;
				case 'Debugging':
					Tomato_Menu[i].innerHTML = '路由器除錯';
					break;
				case 'JFFS':
					Tomato_Menu[i].innerHTML = 'JFFS 支援';
					break;
				case 'NFS Server':
					Tomato_Menu[i].innerHTML = 'NFS 伺服器';
					break;
				case 'SNMP':
					Tomato_Menu[i].innerHTML = '簡易網管協定';
					break;
				case 'Logging':
					Tomato_Menu[i].innerHTML = '系統日誌';
					break;
				case 'Scheduler':
					Tomato_Menu[i].innerHTML = '定時作業';
					break;
				case 'Scripts':
					Tomato_Menu[i].innerHTML = '系統指令';
					break;
				case 'Upgrade':
					Tomato_Menu[i].innerHTML = '韌體升級';
					break;
			}
		}


	// Tomato 系統資訊頁面
	// ===============================================================
	if (TomatoPage == '') {
		Tomato_Overview = document.getElementsByClassName('section-title');
		for (var i = 0 ; Tomato_Overview.length > i ; i++) {
			switch(Tomato_Overview[i].innerHTML) {
				case '<center>!! Attention !!</center>':
					Tomato_Overview[i].innerHTML = '<center>!! 注意 !!</center>';
					break;
				case 'System':
					Tomato_Overview[i].innerHTML = '系統資訊';
					break;
				case 'Ethernet Ports State':
					Tomato_Overview[i].innerHTML = '乙太網路埠口狀態';
					break;
			}
		}
		
		Tomato_Overview = document.getElementsByClassName('title indent1');
		for (var i = 0 ; Tomato_Overview.length > i ; i++) {
			switch(Tomato_Overview[i].innerHTML) {
				case 'Name':
					Tomato_Overview[i].innerHTML = '名稱';
					break;
				case 'Model':
					Tomato_Overview[i].innerHTML = '機型';
					break;
				case 'Chipset':
					Tomato_Overview[i].innerHTML = 'CPU 型號';
					break;
				case 'CPU Freq':
					Tomato_Overview[i].innerHTML = 'CPU 時脈';
					break;
				case 'Flash Size':
					Tomato_Overview[i].innerHTML = 'Flash 容量';
					break;
				case 'Time':
					Tomato_Overview[i].innerHTML = '現在時間';
					break;
				case 'Uptime':
					Tomato_Overview[i].innerHTML = '開機時間';
					break;
				case 'CPU Load <small>(1 / 5 / 15 mins)</small>':
					Tomato_Overview[i].innerHTML = 'CPU 負載 <small>(1/5/15分鐘)</small>';
					break;
				case 'Total / Free Memory':
					Tomato_Overview[i].innerHTML = '總計/可用 RAM';
					break;
				case 'Total / Free NVRAM':
					Tomato_Overview[i].innerHTML = '總計/可用 NVRAM';
					break;
				case 'MAC Address':
					Tomato_Overview[i].innerHTML = 'MAC 位址';
					break;
				case 'Connection Type':
					Tomato_Overview[i].innerHTML = '連線類型';
					break;
				case 'IP Address':
					Tomato_Overview[i].innerHTML = '目前 IP 位址';
					break;
				case 'Previous WAN IP':
					Tomato_Overview[i].innerHTML = '上次 IP 位址';
					break;
				case 'Subnet Mask':
					Tomato_Overview[i].innerHTML = '子網路遮罩';
					break;
				case 'Gateway':
					Tomato_Overview[i].innerHTML = '閘道器';
					break;
				case 'DNS':
					Tomato_Overview[i].innerHTML = 'DNS 伺服器';
					break;
				case 'MTU':
					Tomato_Overview[i].innerHTML = '最大傳輸單位 (MTU)';
					break;
				case '系統狀態':
					Tomato_Overview[i].innerHTML = '連線狀態';
					break;
				case 'Connection Uptime':
					Tomato_Overview[i].innerHTML = '連線時間';
					break;
				case 'Router MAC Address':
					Tomato_Overview[i].innerHTML = '路由器 MAC 位址';
					break;
				case 'Router IP Addresses':
					Tomato_Overview[i].innerHTML = '路由器 IP 位址';
					break;
				case 'DHCP':
					Tomato_Overview[i].innerHTML = 'DHCP 伺服器';
					break;
				case 'Wireless Mode':
					Tomato_Overview[i].innerHTML = '無線工作模式';
					break;
				case 'Wireless Network Mode':
					Tomato_Overview[i].innerHTML = '無線網路模式';
					break;
				case 'Interface Status':
					Tomato_Overview[i].innerHTML = '介面狀態';
					break;
				case 'Radio':
					Tomato_Overview[i].innerHTML = '無線電波';
					break;
				case 'SSID':
					Tomato_Overview[i].innerHTML = '無線名稱 (SSID)';
					break;
				case 'Broadcast':
					Tomato_Overview[i].innerHTML = '廣播名稱';
					break;
				case 'Security':
					Tomato_Overview[i].innerHTML = '安全性等級';
					break;
				case 'Channel':
					Tomato_Overview[i].innerHTML = '頻道';
					break;
				case 'Channel Width':
					Tomato_Overview[i].innerHTML = '頻寬';
					break;
				case 'Interference Level':
					Tomato_Overview[i].innerHTML = '干擾程度';
					break;
				case 'Rate':
					Tomato_Overview[i].innerHTML = '速率';
					break;
			}
		}
       
		Tomato_Overview = document.getElementsByTagName('b');
		for (var i = 0 ; Tomato_Overview.length > i ; i++) {
			switch(Tomato_Overview[i].innerHTML) {
				case 'WAN':
					Tomato_Overview[i].innerHTML = '廣域網路';
					break;
				case 'LAN 1':
					Tomato_Overview[i].innerHTML = '埠口1';
					break;
				case 'LAN 2':
					Tomato_Overview[i].innerHTML = '埠口2';
					break;
				case 'LAN 3':
					Tomato_Overview[i].innerHTML = '埠口3';
					break;
				case 'LAN 4':
					Tomato_Overview[i].innerHTML = '埠口4';
					break;
			}
		}

		var words = {
			'Tomato by Shibby':"已有新版的 Shibby's Tomato",
			'is now available.':'可更新。',
			'Click here to read more' : '請點擊此處取得更多資訊',
			'You did not configure' : '你尚未完成',
			'TomatoAnon project' : 'TomatoAnon 計劃',
			'setting.' : '設定。',
			'Please go to' : '請到',
			'TomatoAnon configuration page' : 'TomatoAnon 設定頁面',
			'and make a choice.' : '做一個選擇以完成設定。',
			'System' : '系統資訊',
			'WAN' : '廣域網路',
			'LAN' : '區域網路',
			'(區域網路)' : '(LAN)',
			'hide' : '隱藏',
			'show' : '顯示',
			'Configure' : '設定',
			'100M Full' : '100M 全雙工',
			'1000M Full' : '1000M 全雙工',
			'Unplugged' : '尚未插入',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
			// 無線網路
			'Access Point + WDS' : '無線基地台 + WDS',
			'Access Point' : '無線基地台',
			'Wireless Client' : '無線用戶端 (Client)',
			'Wireless Ethernet Bridge' : '無線網路橋接 (Bridge)',
			'Wireless' : '無線網路',
			'Auto' : '自動',
			'B Only' : '僅 802.11b',
			'G Only' : '僅 802.11g',
			'B/G Mixed' : '802.11b/g 混合',
			'N Only' : '僅 802.11n',
			'WPA Personal' : 'WPA 個人版',
			'WPA Enterprise' : 'WPA 企業版',
			'WPA2 Personal' : 'WPA2 個人版',
			'WPA2 Enterprise' : 'WPA2 企業版',
			'Enabled' : '啟用',
			'Disabled' : '停用',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}

	
	// Tomato 連線裝置列表頁面
	// ===============================================================
	if (TomatoPage == 'status-devices.asp') {
		Tomato_Devices = document.getElementsByClassName('section-title');
		Tomato_Devices[0].innerHTML = '連線裝置列表';
		Tomato_Devices = document.getElementsByClassName('co1');
		Tomato_Devices[0].innerHTML = '連線介面';
		Tomato_Devices = document.getElementsByClassName('co2');
		Tomato_Devices[0].innerHTML = 'MAC 位址';
		Tomato_Devices = document.getElementsByClassName('co3');
		Tomato_Devices[0].innerHTML = 'IP 位址';
		Tomato_Devices = document.getElementsByClassName('co4');
		Tomato_Devices[0].innerHTML = '裝置名稱';
		Tomato_Devices = document.getElementsByClassName('co5');
		Tomato_Devices[0].innerHTML = '訊號強度';
		Tomato_Devices = document.getElementsByClassName('co6');
		Tomato_Devices[0].innerHTML = '訊號品質';
		Tomato_Devices = document.getElementsByClassName('co7');
		Tomato_Devices[0].innerHTML = '傳輸速率';
		Tomato_Devices = document.getElementsByClassName('co8');
		Tomato_Devices[0].innerHTML = '剩餘租期';
		
		var words = {
			'Noise Floor':'背景雜訊',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}
	
	
	// Tomato 網站瀏覽記錄頁面
	// ===============================================================
	if (TomatoPage == 'status-webmon.asp') {
		Tomato_Webmon = document.getElementsByClassName('section-title');
		Tomato_Webmon[0].innerHTML = '最近造訪的網站';
		Tomato_Webmon[1].innerHTML = '最近搜尋的網站';

		Tomato_Webmon = document.getElementsByClassName('co1');
		for (var i = 0 ; Tomato_Webmon.length > i ; i++) {
			switch(Tomato_Webmon[i].innerHTML) {
				case 'Last Access Time':
					Tomato_Webmon[i].innerHTML = '存取時間';
					break;
				case 'Search Time':
					Tomato_Webmon[i].innerHTML = '搜尋時間';
					break;
			}
		}
		
		Tomato_Webmon = document.getElementsByClassName('co2');
		for (var i = 0 ; Tomato_Webmon.length > i ; i++) {
			switch(Tomato_Webmon[i].innerHTML) {
				case 'IP Address':
					Tomato_Webmon[i].innerHTML = 'IP 位址';
					break;
			}
		}
		
		Tomato_Webmon = document.getElementsByClassName('co3');
		for (var i = 0 ; Tomato_Webmon.length > i ; i++) {
			switch(Tomato_Webmon[i].innerHTML) {
				case 'Domain Name':
					Tomato_Webmon[i].innerHTML = '網域名稱';
					break;
				case 'Search Criteria':
					Tomato_Webmon[i].innerHTML = '搜尋條件';
					break;
			}
		}
		
		var words = {
			'Download':'下載',
			'Clear' : '清除',
			'Show up to' : '顯示',
			'All' : '全部',
			'available entries' : '有效記錄',
			'Web Monitor Configuration' : '網站監控設定',
			'Web Monitoring disabled.' : '網站監控功能已停用。',
			'Enable' : '啟用',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 系統日誌頁面
	// ===============================================================
	if (TomatoPage == 'status-log.asp') {
		Tomato_Log = document.getElementsByClassName('section-title');
		Tomato_Log[0].innerHTML = '系統日誌';
		
		var words = {
			'View Last 25 Lines':'查看最後 25 行',
			'View Last 50 Lines':'查看最後 50 行',
			'View Last 100 Lines':'查看最後 100 行',
			'View All':'查看全部',
			'Download Log File' : '下載日誌記錄檔',
			'Logging Configuration' : '系統日誌設定',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}

	
	// Tomato 頻寬/IP 流量監控的即時流量/24小時內流量頁面
	// ===============================================================
	if (TomatoPage == 'bwm-realtime.asp' || TomatoPage == 'bwm-24.asp' || TomatoPage == 'ipt-realtime.asp' || TomatoPage == 'ipt-24.asp') {
		var words = {
			'RX':'接收',
			'TX':'傳送',
			'Avg':'平均值',
			'Peak':'最大值',
			'Total' : '合計',
			'10 minute window, 2 second interval' : '每格2分鐘, 每2秒鐘取樣',
			'Max' : '最大值',
			'Uniform' : '制式化',
			'Per IF' : '依介面',
			'Display' : '繪圖',
			'Solid' : '填滿',
			'Line' : '實線',
			'Color' : '顏色',
			'reverse' : '反置顏色',
			'Configure' : '設定',
			'2 minute interval' : '每2分鐘取樣',
			'Hours' : '顯示時數',
			'10 minute window' : '每格2分鐘',
			'2 second interval' : '每2秒鐘取樣',
			'Per Address' : '依位址',
			'IPs currently on graphic' : '已顯示的 IP 位址',
			'Hidden addresses' : '已隱藏的 IP 位址',
			'Select' : '請選擇',
			'Click/select a device from this list to hide it' : '點擊/選取要隱藏的 IP 位址',
			'Click/select to show it again' : '點擊/選取要取消隱藏的 IP 位址',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}

	
	// Tomato 頻寬監控的每日/每週/每月流量頁面
	// ===============================================================
	if (TomatoPage == 'bwm-daily.asp' || TomatoPage == 'bwm-weekly.asp' || TomatoPage == 'bwm-monthly.asp') {
		Tomato_Bwm = document.getElementsByClassName('section-title');
		switch(TomatoPage) {
			case 'bwm-daily.asp':
				Tomato_Bwm[0].innerHTML = '廣域網路頻寬監控 - 每日流量';
				break;
			case 'bwm-weekly.asp':
				Tomato_Bwm[0].innerHTML = '廣域網路頻寬監控 - 每週流量';
				break;
			case 'bwm-monthly.asp':
				Tomato_Bwm[0].innerHTML = '廣域網路頻寬監控 - 每月流量';
				break;
		}

		var words = {
			'Last 30 Days' : '過去 30 天',
			'Down' : '下載',
			'Up' : '上傳',
			'Total' : '合計',
			'Date' : '日期格式',
			'yyyy-mm-dd' : '年-月-日',
			'mm-dd-yyyy' : '月-日-年',
			'mmm dd, yyyy' : '月 日,年',
			'dd.mm.yyyy' : '日.月.年',
			'yyyy-mm' : '年-月',
			'mm-yyyy' : '月-年',
			'mmm yyyy' : '月,年',
			'mm.yyyy' : '月.年',
			'Scale' : '計量單位',
			'Data':'資料',
			'Configure' : '設定',
			'Show' : '顯示方式',
			'Summary' : '總和',
			'Full' : '列表',
			'Start' : '每週首日',
			'Sunday' : '週日',
			'Monday' : '週一',
			'Tuesday' : '週二',
			'Wednesday' : '週三',
			'Thursday' : '週四',
			'Friday' : '週五',
			'Saturday' : '週六',
			'Sun' : '日',
			'Mon' : '一',
			'Tue' : '二',
			'Wed' : '三',
			'Thu' : '四',
			'Fri' : '五',
			'Sat' : '六',
			'Jan' : '一月',
			'Feb' : '二月',
			'Mar' : '三月',
			'Apr' : '四月',
			'May' : '五月',
			'Jun' : '六月',
			'Jul' : '七月',
			'Aug' : '八月',
			'Sep' : '九月',
			'Oct' : '十月',
			'Nov' : '十一月',
			'Dec' : '十二月',
			' to ' : ' 到 ',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(ReplaceBwm, 200);
	}
	
	
	// Tomato IP 流量監控的圖表分析頁面
	// ===============================================================
	if (TomatoPage == 'ipt-graphs.asp') {
		Tomato_IptGraphs = document.getElementsByClassName('section-title');
		Tomato_IptGraphs[0].innerHTML = '連線分佈圖 (TCP/UDP)';
		Tomato_IptGraphs[1].innerHTML = '頻寬分佈圖 (下載)';
		Tomato_IptGraphs[2].innerHTML = '頻寬分佈圖 (上傳)';
		
		Tomato_IptGraphs = document.getElementsByClassName('total');
		for (var i = 0 ; Tomato_IptGraphs.length > i ; i++) {
			switch(Tomato_IptGraphs[i].innerHTML) {
				case 'Total':
					Tomato_IptGraphs[i].innerHTML = '合計';
					break;
			}
		}
		
		var words = {
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato IP 流量監控的傳輸速率頁面
	// ===============================================================
	if (TomatoPage == 'ipt-details.asp') {
		Tomato_IptDetails = document.getElementsByClassName('section-title');
		Tomato_IptDetails[0].innerHTML = 'IP 流量監控資訊';
		
		var words = {
			'Options' : '選項',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'Only these IPs' : '顯示這些 IP 位址',
			'Exclude these IPs' : '排除這些 IP 位址',
			'Scale' : '單位',
			'Ignore inactive hosts' : '忽略停止傳輸的主機',
			'Show hostnames' : '顯示主機名稱',
			'Show shortcuts' : '顯示功能快捷',
			'Comma separated list' : '請以逗號分隔 IP 位址',
			'Configure' : '設定',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(ReplaceIpt, 200);
		setTimeout(RefreshPage, 200);
	}
	
	
	// Tomato IP 流量監控的每日/每月流量頁面
	// ===============================================================
	if (TomatoPage == 'ipt-daily.asp' || TomatoPage == 'ipt-monthly.asp') {
		Tomato_Ipt = document.getElementsByClassName('section-title');
		switch(TomatoPage) {
			case 'ipt-daily.asp':
				Tomato_Ipt[0].innerHTML = '每日 IP 流量統計';
				break;
			case 'ipt-monthly.asp':
				Tomato_Ipt[0].innerHTML = '每月 IP 流量統計';
				break;
		}
		
		var words = {
			'Options' : '選項',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'List only these IPs' : '顯示這些 IP 位址',
			'Exclude these IPs' : '排除這些 IP 位址',
			'Date Range' : '日期範圍',
			'Any' : '不限', 
			'Date Format' : '日期格式',
			'yyyy-mm-dd' : '年-月-日',
			'mm-dd-yyyy' : '月-日-年',
			'mmm dd, yyyy' : '月 日,年',
			'dd.mm.yyyy' : '日.月.年',
			'yyyy-mm' : '年-月',
			'mm-yyyy' : '月-年',
			'mmm, yyyy' : '月,年',
			'mm.yyyy' : '月.年',
			'Scale' : '單位',
			'Show subnet totals' : '子網段流量列入計算',
			'Not considered when calculating total traffic on the last line' : '計算最後一行的合計流量時不列入考慮',
			'Hide IPs without traffic' : '隱藏沒有流量的 IP 位址',
			'Show known hostnames' : '顯示已知的主機名稱',
			'Show shortcuts' : '顯示功能快捷',
			'Comma separated list' : '請以逗號分隔 IP 位址',
			'Data' : '資料',
			'Configure' : '設定',
			'Total' : '合計',
			'hosts' : '主機',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(ReplaceIpt, 200);
		setTimeout(RefreshPage, 200);
	}
	
	
	// Tomato 診斷工具的 Ping 頁面
	// ===============================================================
	if (TomatoPage == 'tools-ping.asp') {
		Tomato_ToolsPing = document.getElementsByClassName('section-title');
		Tomato_ToolsPing[0].innerHTML = 'Ping 工具';

		Tomato_ToolsPing = document.getElementsByClassName('co1');
		Tomato_ToolsPing[0].innerHTML = '順序';
		Tomato_ToolsPing = document.getElementsByClassName('co2');
		Tomato_ToolsPing[0].innerHTML = '主機名稱 (IP 位址)';
		Tomato_ToolsPing = document.getElementsByClassName('co3');
		Tomato_ToolsPing[0].innerHTML = '接收位元組';
		Tomato_ToolsPing = document.getElementsByClassName('co4');
		Tomato_ToolsPing[0].innerHTML = '生存期限 (TTL)';
		Tomato_ToolsPing = document.getElementsByClassName('co5');
		Tomato_ToolsPing[0].innerHTML = '回應時間 (ms)';
		Tomato_ToolsPing = document.getElementsByClassName('co6');
		Tomato_ToolsPing[0].innerHTML = '相差時間 (ms)';
		
		var words = {
			'Address' : '位址',
			'Ping Count' : 'Ping 次數',
			'Packet Size' : '封包大小',
			'bytes' : '位元組',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 診斷工具的路由追蹤頁面
	// ===============================================================
	if (TomatoPage == 'tools-trace.asp') {
		Tomato_ToolsTrace = document.getElementsByClassName('section-title');
		Tomato_ToolsTrace[0].innerHTML = '路由追蹤';

		Tomato_ToolsTrace = document.getElementsByClassName('co1');
		Tomato_ToolsTrace[0].innerHTML = '躍點';
		Tomato_ToolsTrace = document.getElementsByClassName('co2');
		Tomato_ToolsTrace[0].innerHTML = '主機名稱 (IP 位址)';
		Tomato_ToolsTrace = document.getElementsByClassName('co3');
		Tomato_ToolsTrace[0].innerHTML = '最小值 (ms)';
		Tomato_ToolsTrace = document.getElementsByClassName('co4');
		Tomato_ToolsTrace[0].innerHTML = '最大值 (ms)';
		Tomato_ToolsTrace = document.getElementsByClassName('co5');
		Tomato_ToolsTrace[0].innerHTML = '平圴值 (ms)';
		Tomato_ToolsTrace = document.getElementsByClassName('co6');
		Tomato_ToolsTrace[0].innerHTML = '相差時間 (ms)';
		
		var words = {
			'Address' : '位址',
			'Maximum Hops' : '最大躍點數',
			'Maximum Wait Time' : '最大等待時間',
			'seconds per hop' : '每躍點之等候秒數',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 診斷工具的系統指令頁面
	// ===============================================================
	if (TomatoPage == 'tools-shell.asp') {
		Tomato_ToolsShell = document.getElementsByClassName('section-title');
		Tomato_ToolsShell[0].innerHTML = '執行系統指令';

		var words = {
			'Command' : '指令',
			'Execute' : '執行',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 診斷工具的搜尋無線基地台頁面
	// ===============================================================
	if (TomatoPage == 'tools-survey.asp') {
		Tomato_ToolsSurvey = document.getElementsByClassName('section-title');
		Tomato_ToolsSurvey[0].innerHTML = '無線基地台列表';

		Tomato_ToolsSurvey = document.getElementsByClassName('co1');
		Tomato_ToolsSurvey[0].innerHTML = '發現時間';
		Tomato_ToolsSurvey = document.getElementsByClassName('co2');
		Tomato_ToolsSurvey[0].innerHTML = '無線名稱 (SSID)';
		Tomato_ToolsSurvey = document.getElementsByClassName('co3');
		Tomato_ToolsSurvey[0].innerHTML = '無線 MAC 位址';
		Tomato_ToolsSurvey = document.getElementsByClassName('co4');
		Tomato_ToolsSurvey[0].innerHTML = '訊號強度';
		Tomato_ToolsSurvey = document.getElementsByClassName('co5');
		Tomato_ToolsSurvey[0].innerHTML = '雜訊';
		Tomato_ToolsSurvey = document.getElementsByClassName('co6');
		Tomato_ToolsSurvey[0].innerHTML = '訊號品質';
		Tomato_ToolsSurvey = document.getElementsByClassName('co7');
		Tomato_ToolsSurvey[0].innerHTML = '頻道';
		Tomato_ToolsSurvey = document.getElementsByClassName('co8');
		Tomato_ToolsSurvey[0].innerHTML = '相容性';
		Tomato_ToolsSurvey = document.getElementsByClassName('co9');
		Tomato_ToolsSurvey[0].innerHTML = '速率';

		var words = {
			'Warning: Wireless connections to this router may be disrupted while using this tool.' : '使用此診斷工具有可能會中斷連接到此路由器的無線用戶端。',
			'Auto Expire' : '自動停止',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 診斷工具的網路喚醒頁面
	// ===============================================================
	if (TomatoPage == 'tools-wol.asp') {
		Tomato_ToolsWol = document.getElementsByClassName('section-title');
		Tomato_ToolsWol[0].innerHTML = '網路喚醒';

		Tomato_ToolsWol = document.getElementsByClassName('co1');
		Tomato_ToolsWol[0].innerHTML = 'MAC 位址';
		Tomato_ToolsWol = document.getElementsByClassName('co2');
		Tomato_ToolsWol[0].innerHTML = 'IP 位址';
		Tomato_ToolsWol = document.getElementsByClassName('co3');
		Tomato_ToolsWol[0].innerHTML = '狀態';
		Tomato_ToolsWol = document.getElementsByClassName('co4');
		Tomato_ToolsWol[0].innerHTML = '名稱';

		var words = {
			'MAC Address List' : 'MAC 位址清單',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 基本設定的網路連線頁面
	// ===============================================================
	if (TomatoPage == 'basic-network.asp') {
		Tomato_BasicNetwork = document.getElementsByClassName('section-title');
		Tomato_BasicNetwork[0].innerHTML = '廣域網路 / 網際網路 (WAN / Internet)';
		Tomato_BasicNetwork[1].innerHTML = '區域網路 (LAN)';
		Tomato_BasicNetwork[2].innerHTML = '乙太網路埠口狀態 - 設定';
		
		Tomato_BasicNetwork = document.getElementById('_wan_proto').childNodes;
		for (var i = 0 ; Tomato_BasicNetwork.length > i ; i++) {
			switch(Tomato_BasicNetwork[i].innerHTML) {
				case 'DHCP':
					Tomato_BasicNetwork[i].innerHTML = '自動取得 IP (DHCP)';
					break;
				case 'Static':
					Tomato_BasicNetwork[i].innerHTML = '固定 IP';
					break;
				case '3G Modem':
					Tomato_BasicNetwork[i].innerHTML = '3G 數據機';
					break;
			}
		}

		Tomato_BasicNetwork = document.getElementsByClassName('co1');
		Tomato_BasicNetwork[0].innerHTML = '橋接';
		Tomato_BasicNetwork = document.getElementsByClassName('co3');
		Tomato_BasicNetwork[0].innerHTML = 'IP 位址';
		Tomato_BasicNetwork = document.getElementsByClassName('co4');
		Tomato_BasicNetwork[0].innerHTML = '子網路遮罩';
		Tomato_BasicNetwork = document.getElementsByClassName('co6');
		Tomato_BasicNetwork[0].innerHTML = 'IP 範圍 (起始/結束)';
		Tomato_BasicNetwork = document.getElementsByClassName('co7');
		Tomato_BasicNetwork[0].innerHTML = '租期時間 (分鐘)';
		
		Tomato_BasicNetwork = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_BasicNetwork.length > i ; i++) {
			switch(Tomato_BasicNetwork[i].innerHTML) {
				case 'MTU':
					Tomato_BasicNetwork[i].innerHTML = '最大傳輸單位 (MTU)';
					break;
				case 'SSID':
					Tomato_BasicNetwork[i].innerHTML = '無線名稱 (SSID)';
					break;
			}
		}

		var words = {
			'Type' : '連線類型',
			'Enabled' : '啟用',
			'Disabled' : '停用',
			'Username' : '帳號',
			'Password' : '密碼',
			'Service Name' : '服務名稱',
			'Options' : '選項',
			'Connect Mode' : '連線模式',
			'Connect On Demand' : '閒置斷線',
			'Keep Alive' : '保持連線',
			'Max Idle Time' : ' 最大閒置時間',
			'Redial Interval' : '重撥間隔',
			'LCP Echo Interval' : 'LCP 回應間隔時間',
			'range: 1 - 60; default: 10' : '範圍: 1 - 60; 預設值: 10',
			'LCP Echo Link fail limit' : 'LCP 回應連線失敗限制',
			'range: 1 - 10; default: 5' : '範圍: 1 - 10; 預設值: 5',
			'Default Gateway' : '預設閘道器',
			'Default' : '預設',
			'Manual' : '自訂',
			'Single Line MLPPP' : '單線 MLPPP',
			'Route Modem IP' : '路由數據機 IP 位址',
			'must be in different subnet to router, 0.0.0.0 to disable' : '必須與路由器在不同的子網段, 0.0.0.0 為停用',
			'IP Address' : '固定 IP 位址',
			'Subnet Mask' : '子網路遮罩',
			'Gateway' : '閘道器',
			'Use DHCP' : '使用 DHCP',
			'L2TP Server' : 'L2TP 伺服器',
			'Modem device' :  '數據機裝置',
			'Advised to turn off PIN Code' : '建議關閉 PIN 碼',
			'PIN Code' : 'PIN 碼',
			'Modem init string' : '數據機起始字串',
			'Bridge WAN port to primary LAN (br0)' : '橋接廣域網路至主要區網 (br0)',
			'Static DNS' : 'DNS 伺服器',
			'Use dnscrypt-proxy' : '使用 dnscrypt-proxy',
			'Local Port' : '本地端口',
			'Startup Parameters' : '啟動參數',
			'for DHCP' : '用於 DHCP',
			'optional' : '可選填',
			'Enable Ports State' : '顯示網路埠口狀態',
			'Show Speed Info' : '顯示速度資訊',
			'Invert Ports Order' : '顛倒埠口順序',
			'Enable Wireless' : '啟用無線網路',
			'MAC Address' : 'MAC 位址',
			'Wireless Mode' : '無線工作模式',
			'Wireless Network Mode' : '無線網路模式',
			// 無線網路
			'Access Point + WDS' : '無線基地台 + WDS',
			'Access Point' : '無線基地台',
			'Wireless Client' : '無線用戶端 (Client)',
			'Wireless Ethernet Bridge' : '無線網路橋接 (Bridge)',
			'Wireless' : '無線網路',
			'Link With...' : '指定連結...',
			'Automatic' : '自動連結',
			'Auto' : '自動',
			'B Only' : '僅 802.11b',
			'G Only' : '僅 802.11g',
			'B/G Mixed' : '802.11b/g 混合',
			'N Only' : '僅 802.11n',
			'WPA Personal' : 'WPA 個人版',
			'WPA Enterprise' : 'WPA 企業版',
			'WPA2 Personal' : 'WPA2 個人版',
			'WPA2 Enterprise' : 'WPA2 企業版',
			'Broadcast' : '廣播名稱',
			'Channel Width' : '頻寬',
			'Channel' : '頻道',
			'Control Sideband' : '控制 Sideband',
			'Security' : '安全性等級',
			'Encryption' : '加密類型',
			'Passphrase' : '通行碼',
			'Shared Key' : '公用金鑰',
			'Group Key Renewal' : '群組金鑰更新時間',
			'Radius Server' : 'Radius 認證伺服器',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 基本設定的 IPv6 設定/基本資料/網際網路時間頁面
	// ===============================================================
	if (TomatoPage == 'basic-ipv6.asp' || TomatoPage == 'basic-ident.asp' || TomatoPage == 'basic-time.asp') {
		Tomato_Basic = document.getElementsByClassName('section-title');
		switch(TomatoPage) {
			case 'basic-ipv6.asp':
				Tomato_Basic [0].innerHTML = 'IPv6 設定';
				break;
			case 'basic-ident.asp':
				Tomato_Basic [0].innerHTML = '路由器基本資料';
				break;
			case 'basic-time.asp':
				Tomato_Basic [0].innerHTML = '時間設定';
				break;
		}

		var words = {
			'IPv6 Service Type' : 'IPv6 服務型態',
			'Disabled' : '停用',
			'Other (Manual Configuration)' : '其它 (自訂設定)',
			'Assigned / Routed Prefix' : '指定 / 路由前置碼',
			'Prefix Length' : '前置碼長度 (Prefix)',
			'Router IPv6 Address' : '路由器 IPv6 位址',
			'Default' : '預設',
			'Manual' : '自訂',
			'Static DNS' : 'DNS 伺服器',
			'Accept RA from' : '接受遠端路由公告 (RA)',
			'Relay Anycast Address' : '中繼任播位址',
			'Tunnel MTU' : '通道 MTU',
			'Tunnel TTL' : '通道 TTL',
			'for default' : '為預設值',
			'Tunnel Remote Endpoint (IPv4 Address)' : '通道遠端端點 IPv4 位址',
			'Tunnel Client IPv6 Address' : '通道用戶端的 IPv6 位址',
			'6rd Routed Prefix' : '6rd 路由前置碼',
			'6rd Prefix Length' : '6rd 前置碼長度 (Prefix)',
			'Usually' : '通常為',
			'usually' : '通常為',
			'6RD Tunnel Border Relay (IPv4 Address)' : '6rd 通道邊界中繼位址 (IPv4 位址)',
			'6RD IPv4 Mask Length' : '6rd IPv4 遮罩長度',
			'IPv6 WAN Interface' : 'IPv6 WAN 介面',
			'Router Name' : '路由器名稱',
			'Hostname' : '主機名稱',
			'Domain Name' : '網域名稱',
			'Router Time' : '路由器時間',
			'Not Available' : '不可使用',
			'Sun' : '週日',
			'Mon' : '週一',
			'Tue' : '週二',
			'Wed' : '週三',
			'Thu' : '週四',
			'Fri' : '週五',
			'Sat' : '週六',
			'Time Zone' : '時區',
			'UTC+08:00 China, Hong Kong, Western Australia, Singapore, Taiwan' : 'UTC+08:00 台灣, 中國, 香港, 西澳, 新加坡',
			'Auto Daylight Savings Time' : '自動調整日光節約時間',
			'Auto Update Time' : '自動更新時間',
			'Never' : '停用',
			'Only at startup' : '僅在啟動後',
			'Every hour' : '每 1 小時',
			'Every' : '每',
			'hours' : '小時',
			'Trigger Connect On Demand' : '重新連線時觸發校時',
			'NTP Time Server' : 'NTP 時間伺服器',
			'Custom...' : '自訂...',
			'Africa' : '非洲',
			'Asia' : '亞洲',
			'Europe' : '歐洲',
			'Oceania' : '大洋洲',
			'North America' : '北美洲',
			'South America' : '南美洲',
			'US' : '美國',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 基本設定的動態 DNS 頁面
	// ===============================================================
	if (TomatoPage == 'basic-ddns.asp') {
		Tomato_BasicDdns = document.getElementsByClassName('section-title');
		Tomato_BasicDdns[0].innerHTML = '動態名稱伺服器 (Dynamic DNS)';
		Tomato_BasicDdns[1].innerHTML = '動態名稱伺服器 1';
		Tomato_BasicDdns[2].innerHTML = '動態名稱伺服器 2';

		var words = {
			'Use WAN IP Address' : '使用廣域網路 IP 位址',
			'recommended' : '建議',
			'Use External IP Address Checker (every 10 minutes)' : '使用外部 IP 位址檢驗器 (每10分鐘)',
			'Auto refresh every' : '自動更新週期',
			'days' : '天',
			'disable' : '停用',
			'Offline' : '離線',
			'Custom IP Address' : '自訂 IP 位址',
			'Custom IP address' : '自訂 IP 位址',
			'This service determines the IP address using its own method.' : '此服務商使用它自己的方式來判斷 IP 位址。',
			'Use @IP for the current IP address' : '使用 @IP 於目前的 IP 位址',
			'IP address' : 'IP 位址',
			'Service' : '服務商',
			'None' : '停用',
			'- Static' : '- 靜態',
			'- Dynamic' : '- 動態',
			'Custom URL' : '自訂網址',
			'Custom' : '自訂',
			'URL' : '網址',
			'Username' : '帳號',
			'Password' : '密碼',
			'Hostname' : '主機名稱',
			'Wildcard' : '萬用字元',
			'Backup MX' : '備援 MX 記錄',
			'Force next update' : '強制下次更新',
			'Last IP Address' : '目前 IP 位址',
			'Last Result' : '目前更新結果',
			'Save state when IP changes (nvram commit)' : '當 IP 變更時即儲存狀態 (寫入 NVRAM)',
			'Domain' : '網域',
			'optional' : '可選填',
			'User ID' : '用戶 ID',
			'not your username' : '不是你的用戶名稱',
			'Global Tunnel ID' : '通道 ID',
			'Email Address' : '電子郵件位址',
			'Group' : '群組',
			'Network' : '網路',
			'Use as DNS' : '當成 DNS 使用',
			'Current DNS' : '目前的 DNS',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 基本設定的靜態 DHCP/ARP/IPT 頁面
	// ===============================================================
	if (TomatoPage == 'basic-static.asp') {
		Tomato_BasicStatic = document.getElementsByClassName('section-title');
		Tomato_BasicStatic[0].innerHTML = '靜態 DHCP/ARP/IPT';
		Tomato_BasicStatic[1].innerHTML = '選項';
		
		Tomato_BasicStatic = document.getElementsByClassName('co1');
		Tomato_BasicStatic[0].innerHTML = 'MAC 位址';
		Tomato_BasicStatic = document.getElementsByClassName('co2');
		Tomato_BasicStatic[0].innerHTML = '綁定';
		Tomato_BasicStatic = document.getElementsByClassName('co3');
		Tomato_BasicStatic[0].innerHTML = 'IP 位址';
		Tomato_BasicStatic = document.getElementsByClassName('co4');
		Tomato_BasicStatic[0].innerHTML = 'IP 流量監控';
		Tomato_BasicStatic = document.getElementsByClassName('co5');
		Tomato_BasicStatic[0].innerHTML = '主機名稱';

		var words = {
			'Enabled' : '啟用',
			'Ignore DHCP requests from unknown devices' : '忽略來自未知裝置的 DHCP 請求',
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'MAC Address' : 'MAC 位址',
			'Unique identifier associated to a network interface on this particular device.' : '每個網路裝置會有一個專屬於它的識別位址。',
			'Bound to' : '綁定',
			'Enforce static ARP binding of this particular IP/MAC address pair.' : '在此 IP 或 MAC 位址上指定靜態 ARP 綁定。',
			'IP Address' : 'IP 位址',
			'Network address assigned to this device on the local network.' : '在本地網路上指定網路位址給這個網路裝置。',
			'IPTraffic' : 'IP 流量監控',
			'Keep track of bandwidth usage for this IP address.' : '監控此 IP 位址的網路流量。',
			'Hostname' : '主機名稱',
			'Human-readable nickname/label assigned to this device on the network.' : '在本地網路上指定名稱給這個網路裝置。',
			'Other relevant notes/hints' : '其他相關說明及提示',
			'To specify multiple hostnames for a device, separate them with spaces.' : '如要在網路裝置上指定多重主機名稱, 請用空格隔開各個名稱。',
			'To enable/enforce static ARP binding for a particular device, it must have only one MAC associated with that particular IP address' : '如要在網路裝置上啟用/執行靜態 ARP 綁定, 每個 MAC 位址必須指定到不同的 IP 位址',
			"(i.e. you can't have two MAC addresses linked to the same hostname/device in the table above)." : '(即在上面的列表裡, 你不能有兩個 MAC 位址指定到相同的主機或網路裝置)。',
			'When ARP binding is enabled for a particular MAC/IP address pair, that device will always be shown as "active" in the' : '當對一個特定的 MAC 位址或 IP 位址啟用了靜態 ARP 綁定後, 那個裝置將永遠在',
			'Wake On LAN' : '網路喚醒',
			'table.' : '列表裡顯示為 "Active"。',
			'See also the' : '也可以查看在進階設定裡的',
			'Advanced DHCP/DNS' : 'DHCP/DNS 設定',
			'settings page for more DHCP-related configuration options.' : '頁面,裡面有更多 DHCP 相關設定選項。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 基本設定的無線存取控制頁面
	// ===============================================================
	if (TomatoPage == 'basic-wfilter.asp') {
		Tomato_BasicWfilter = document.getElementsByClassName('section-title');
		Tomato_BasicWfilter[0].innerHTML = '無線存取控制';
		
		Tomato_BasicWfilter = document.getElementsByClassName('co1');
		Tomato_BasicWfilter[0].innerHTML = 'MAC 位址';
		Tomato_BasicWfilter = document.getElementsByClassName('co2');
		Tomato_BasicWfilter[0].innerHTML = '註解';

		var words = {
			'Disable filter' : '關閉',
			'Permit only the following clients' : '允許下列的 MAC 位址連線',
			'Block the following clients' : '拒絕下列的 MAC 位址連線',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的連線追蹤/過濾頁面
	// ===============================================================
	if (TomatoPage == 'advanced-ctnf.asp') {
		Tomato_AdvancedCtnf = document.getElementsByClassName('section-title');
		Tomato_AdvancedCtnf[0].innerHTML = '連線數';
		Tomato_AdvancedCtnf[1].innerHTML = 'TCP 逾時';
		Tomato_AdvancedCtnf[2].innerHTML = 'UDP 逾時';
		Tomato_AdvancedCtnf[3].innerHTML = '其他逾時';
		Tomato_AdvancedCtnf[4].innerHTML = '追蹤 / NAT 輔助模組';
		Tomato_AdvancedCtnf[5].innerHTML = '其它設定';
		
		var words = {
			'Maximum Connections' : '最大連線數',
			'Hash Table Size' : '雜湊表大小 (Hash Table)',
			'count current...' : '計算目前的連線數...',
			'connections currently tracked' : '個連線數已追蹤到',
			'in this state' : '個連線在這種狀態',
			'TTL Adjust' : 'TTL 調整',
			'None' : '不調整',
			'Custom' : '自訂',
			'Inbound Layer 7' : '啟用 L7 應用層過濾 (下載)',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的 DHCP/DNS 設定頁面
	// ===============================================================
	if (TomatoPage == 'advanced-dhcpdns.asp') {
		Tomato_AdvancedDhcpdns = document.getElementsByClassName('section-title');
		Tomato_AdvancedDhcpdns[0].innerHTML = 'DHCP / DNS 伺服器 (LAN)';
		Tomato_AdvancedDhcpdns[1].innerHTML = 'DHCP 用戶端 (WAN)';
		
		var words = {
			'Use internal DNS' : '使用內建 DNS',
			'Use received DNS with user-entered DNS' : '使用自訂 DNS',
			'Prevent DNS-rebind attacks' : ' 防止 DNS 劫持攻擊',
			'Intercept DNS port' : '攔截 DNS 連接埠',
			'Use user-entered gateway if WAN is disabled' : '當廣域網路停用時使用自訂閘道',
			'Ignore DHCP requests from unknown devices' : '忽略來自未知裝置的 DHCP 請求',
			'Maximum active DHCP leases' : 'DHCP 分配最大數量',
			'Static lease time' : '固定租期時間',
			'Same as normal lease time' : '與基本設定→網路→租期時間相同',
			'"Infinite"' : '不限制',
			'Custom configuration' : '自訂設定',
			'Custom' : '自訂',
			'Announce IPv6 on LAN' : '公告 IPv6 在區域網路',
			'Mute dhcpv4 logging' : '隱藏 dhcpv4 記錄',
			'Mute dhcpv6 logging' : '隱藏 dhcpv6 記錄',
			'Mute RA logging' : '隱藏 RA 記錄',
			'DHCPC Options' : 'DHCPC 選項',
			'Reduce packet size' : '減少封包大小',
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'DHCP / DNS Server (LAN)' : 'DHCP / DNS 伺服器 (LAN)',
			'Allow dnsmasq to be your DNS server on LAN.' : '允許 Dnsmasq 為區域網路的 DNS 伺服器。',
			'Add DNS servers received from your WAN connection to the static DNS server list (see' : '使用網路連線頁面裡所設定的 DNS 伺服器 (請參考',
			'Network' : '網路連線',
			'configuration).' : '設定)。',
			'Enable DNS rebinding protection on Dnsmasq.' : '在 Dnsmasq 啟用 DNS 劫持保護 (DNS-rebind)。',
			'Any DNS requests/packets sent out to UDP port 53 are redirected to the internal DNS server.' : '任何發送到 UDP 連接埠 53 的 DNS 請求或封包將重新導向到內部的 DNS 伺服器。',
			'DHCP will use the IP address of the router as the default gateway on each LAN.' : 'DHCP 將使用路由器自訂的預設閘道器 IP 位址做為預設閘道器。',
			'Ignore DHCP requests (...)' : '忽略來自未知裝置的 DHCP 請求',
			'Dnsmasq will ignore DHCP requests ' : '',
			'to Only MAC addresses listed on the' : '請在',
			'Static DHCP/ARP' : '靜態 DHCP/ARP',
			"page won't be able to obtain an IP address through DHCP." : '頁面裡建立 MAC 位址清單, 否則 Dnsmasq 將忽略未知裝置的 DHCP 請求。',
			'Self-explanatory.' : '不用解釋。',
			'Absolute maximum amount of time allowed for any DHCP lease to be valid.' : 'DHCP 租期存活時間的絕對最大值。',
			'Extra options to be added to the Dnsmasq configuration file.' : '在 Dnsmasq 設定檔新增額外的設定。',
			'DHCP Client (WAN)' : 'DHCP 用戶端 (WAN)',
			'Extra options for the DHCP client.' : 'DHCP 用戶端的額外選項。',
			'Other relevant notes/hints' : '其他相關說明及提示',
			"The contents of file /etc/dnsmasq.custom are also added to the end of Dnsmasq's configuration file (if it exists)." : '當 /etc/dnsmasq.custom 檔案存在時, 將其內容加入 Dnsmasq 的設定檔末端。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的防火牆頁面
	// ===============================================================
	if (TomatoPage == 'advanced-firewall.asp') {
		Tomato_AdvancedFirewall = document.getElementsByClassName('section-title');
		Tomato_AdvancedFirewall[0].innerHTML = '防火牆 (Firewall)';
		Tomato_AdvancedFirewall[1].innerHTML = '網路位址轉譯 (NAT)';
		Tomato_AdvancedFirewall[2].innerHTML = '多點傳播 (Multicast)';
		
		var words = {
			'Respond to ICMP ping' : '回應 ICMP ping',
			'Limits per second' : '限制每秒鐘回應數量',
			'request per second' : '每秒鐘回應數量',
			'Enable SYN cookies' : '啟用 SYN cookies',
			'All' : '全部',
			'Forwarded Only' : '只有被轉送的封包',
			'Disabled' : '停用',
			'Enable IGMPproxy' : '啟用 IGMP 代理',
			'Enable Udpxy' : '啟用 Udpxy',
			'Enable client statistics' : '啟用用戶端統計',
			'Max clients' : '最大用戶端數量',
			'Udpxy port' : 'Udpxy 連接埠',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的 MAC 位址頁面
	// ===============================================================
	if (TomatoPage == 'advanced-mac.asp') {
		Tomato_AdvancedMac = document.getElementsByClassName('section-title');
		Tomato_AdvancedMac[0].innerHTML = 'MAC 位址';
		
		var words = {
			'WAN Port' : '廣域網路的 MAC 位址',
			'Wireless Interface' : '無線網路的 MAC 位址',
			"Router's LAN MAC Address" : '區域網路的 MAC 位址',
			"Computer's MAC Address" : '電腦網卡的 MAC 位址',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的其他設定頁面
	// ===============================================================
	if (TomatoPage == 'advanced-misc.asp') {
		Tomato_AdvancedMisc = document.getElementsByClassName('section-title');
		Tomato_AdvancedMisc[0].innerHTML = '其他設定';
		
		var words = {
			'Boot Wait Time' : '路由啟動等待時間',
			'WAN Port Speed' : 'WAN 埠口連線速度',
			'10Mb Full' : '10Mb 全雙工',
			'10Mb Half' : '10Mb 半雙工',
			'100Mb Full' : '100Mb 全雙工',
			'100Mb Half' : '100Mb 半雙工',
			'Auto' : '自動偵測',
			'Not all models support these options.' : '並非所有機型皆支援這些選項。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的路由表頁面
	// ===============================================================
	if (TomatoPage == 'advanced-routing.asp') {
		Tomato_AdvancedRouting = document.getElementsByClassName('section-title');
		Tomato_AdvancedRouting[0].innerHTML = '目前的路由表';
		Tomato_AdvancedRouting[1].innerHTML = '靜態路由表';
		Tomato_AdvancedRouting[2].innerHTML = '其他設定';
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co1');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Destination':
					Tomato_AdvancedRouting[i].innerHTML = '目的地';
					break;
				case 'default':
					Tomato_AdvancedRouting[i].innerHTML = '預設';
					break;
			}
		}
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co2');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Gateway / Next Hop':
					Tomato_AdvancedRouting[i].innerHTML = '閘道 / 下一躍點';
					break;
				case 'Gateway':
					Tomato_AdvancedRouting[i].innerHTML = '閘道';
					break;
			}
		}
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co3');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Subnet Mask':
					Tomato_AdvancedRouting[i].innerHTML = '子網路遮罩';
					break;
			}
		}
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co4');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Metric':
					Tomato_AdvancedRouting[i].innerHTML = '計量';
					break;
			}
		}
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co5');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Interface':
					Tomato_AdvancedRouting[i].innerHTML = '介面';
					break;
			}
		}
		
		Tomato_AdvancedRouting = document.getElementsByClassName('co6');
		for (var i = 0 ; Tomato_AdvancedRouting.length > i ; i++) {
			switch(Tomato_AdvancedRouting[i].innerHTML) {
				case 'Description':
					Tomato_AdvancedRouting[i].innerHTML = '註解';
					break;
			}
		}
		
		var words = {
			'Mode' : '模式',
			'Gateway' : '閘道',
			'Router' : '路由',
			'Efficient Multicast Forwarding' : '高效多點傳播轉送 (Multicast)',
			'DHCP Routes' : 'DHCP 路由',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的洋蔥路由頁面
	// ===============================================================
	if (TomatoPage == 'advanced-tor.asp') {
		Tomato_AdvancedTor = document.getElementsByClassName('section-title');
		Tomato_AdvancedTor[0].innerHTML = '洋蔥路由設定 (TOR)';
		Tomato_AdvancedTor[1].innerHTML = '說明';
		
		var words = {
			'Enable TOR' : '啟用 TOR',
			'Socks Port' : 'Socks 連接埠',
			'Trans Port' : 'Trans 連接埠',
			'DNS Port' : 'DNS 連接埠',
			'Data Directory' : '資料目錄',
			'Redirect all users from' : '選擇要重新導向的用戶',
			'Only selected IP`s' : '僅自訂的 IP 範圍',
			'Custom Configuration' : '自訂設定',
			'Be patient. Starting the TOR client can take from several seconds to several minutes.' : '請耐心等候, 啟動 TOR 用戶端可能需要幾秒到幾分鐘的時間。',
			'ex:' : '例如:',
			'Only connections to destination port 80 are redirected to TOR.' : ' 只有連接到目的地連接埠 80 的連線會被重新導向到 TOR。',
			"Caution! - If your router only has 32MB of RAM, you'll have to use swap." : ' 注意！如果你的路由器只有 32MB 記憶體, 你必須使用虛擬記憶體 (swap)。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的虛擬區域網路頁面
	// ===============================================================
	if (TomatoPage == 'advanced-vlan.asp') {
		Tomato_AdvancedVlan = document.getElementsByClassName('section-title');
		Tomato_AdvancedVlan[0].innerHTML = '虛擬區域網路 (VLAN)';
		Tomato_AdvancedVlan[1].innerHTML = 'VLAN 識別碼偏移 (VID Offset)';
		Tomato_AdvancedVlan[2].innerHTML = '無線網路';
		Tomato_AdvancedVlan[3].innerHTML = 'VLAN 中繼支援 (VLAN Trunk)';
		
		Tomato_AdvancedVlan = document.getElementsByClassName('co3');
		Tomato_AdvancedVlan[0].innerHTML = '埠口1';
		Tomato_AdvancedVlan = document.getElementsByClassName('co4');
		Tomato_AdvancedVlan[0].innerHTML = '標籤';
		Tomato_AdvancedVlan = document.getElementsByClassName('co5');
		Tomato_AdvancedVlan[0].innerHTML = '埠口2';
		Tomato_AdvancedVlan = document.getElementsByClassName('co6');
		Tomato_AdvancedVlan[0].innerHTML = '標籤';
		Tomato_AdvancedVlan = document.getElementsByClassName('co7');
		Tomato_AdvancedVlan[0].innerHTML = '埠口3';
		Tomato_AdvancedVlan = document.getElementsByClassName('co8');
		Tomato_AdvancedVlan[0].innerHTML = '標籤';
		Tomato_AdvancedVlan = document.getElementsByClassName('co9');
		Tomato_AdvancedVlan[0].innerHTML = '埠口4';
		Tomato_AdvancedVlan = document.getElementsByClassName('co10');
		Tomato_AdvancedVlan[0].innerHTML = '標籤';
		Tomato_AdvancedVlan = document.getElementsByClassName('co11');
		Tomato_AdvancedVlan[0].innerHTML = 'WAN 埠口';
		Tomato_AdvancedVlan = document.getElementsByClassName('co12');
		Tomato_AdvancedVlan[0].innerHTML = '標籤';
		Tomato_AdvancedVlan = document.getElementsByClassName('co13');
		Tomato_AdvancedVlan[0].innerHTML = '預設';
		Tomato_AdvancedVlan = document.getElementsByClassName('co14');
		Tomato_AdvancedVlan[0].innerHTML = '橋接';
		
		var words = {
			'none' : '無',
			'range: 0 - 4080; must be a multiple of 16; set to 0 to disable' : '範圍: 0 - 4080; 必須為 16 的倍數; 設置成 0 為停用',
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'Unique identifier of a VLAN.' : 'VLAN 的唯一識別碼',
			'EXPERIMENTAL' : '尚在研究',
			"Allows overriding 'traditional' VLAN/VID mapping with arbitrary VIDs for each VLAN (set to '0' to use 'regular' VLAN/VID mappings instead). Warning: this hasn't been verified/tested on anything but a Cisco/Linksys E3000 and may not be supported by your particular device/model" : '允許在每個 VLAN 上將傳統的 VLAN/VID 映射到任意的 VID 編號 (設置成 0 時將會使用正常的 VLAN/VID 來替代映射)。警告: 這僅在 Cisco/Linksys E3000 檢驗並測試過, 所以有可能會不支援你的裝置及機型',
			'see notes on "VID Offset" below' : '請參考說明下方的 "VID Offset"',
			'Ports 1-4 & WAN' : '埠口 1-4 & WAN',
			'Which ethernet ports on the router should be members of this VLAN.' : '選擇將路由器上的哪些乙太網路埠口加入為這個 VLAN 的成員。',
			'Tagged' : '標籤',
			'Enable 802.1Q tagging of ethernet frames on a particular port/VLAN' : '替指定埠口/VLAN 的乙太網路訊框加入 802.1Q 標籤資訊',
			'unknown support for this model...contact the developper (Victek))' : '需啟用 VLAN Trunk 才可用, 若有不支援的機型,請聯絡作者 Victek)。',
			'Default' : '預設',
			'VLAN ID assigned to untagged frames received by the router.' : 'VLAN ID 會分配無標籤資訊的訊框給路由器接收。',
			'Determines if this VLAN ID should be treated as WAN, part of a LAN bridge or just left alone (i.e. member of a 802.1Q trunk, being managed manually via scripts, etc...).' : '確認此 VLAN ID 應該被視為廣域網路 (WAN), 還是區域網路 (LAN) 的一部份,又或者是獨立網路 (即 802.1Q trunk 成員, 經由腳本手動管理, 其它...)。',
			'First 802.1Q VLAN tag to be used as ' : '首個 802.1Q VLAN 標籤用於分配 VLAN 及 VID 的',
			'base/initial tag/VID' : '基本起始標籤/VID',
			'for VLAN and VID assignments.' : '。',
			'This allows using VIDs larger than 15 on (older) devices such as the Linksys WRT54GL v1.1 (in contiguous blocks/ranges with up to 16 VLANs/VIDs).' : '這將允許一些像是 Linksys WRT54GL v1.1 的老裝置能夠使用大於 15 的 VID 編號 (在相鄰的區塊/範圍內可多達 16 個 VLAN/VID)。',
			"Set to '0' (zero) to disable this feature and VLANs will have the very same/identical value for its VID, as usual (from 0 to 15)." : '設置成 0 時將會關閉這個功能, 且 VLAN 也將會與 VID 擁有同樣的識別碼編號, 通常是從 0 到 15。',
			'Assignments of wireless interfaces to different LAN briges. You should probably be using and/or check things on' : '將無線網路介面橋接到不同的區域網路 (LAN)。你可以從以下兩個頁面設定並檢查與其相關的設定項目:',
			'Advanced/Virtual Wireless' : '進階設定/虛擬無線網路',
			'Wireless' : '無線網路',
			'Basic/Network' : '基本設定/網路連線',
			'Other relevant notes/hints' : '其他相關說明及提示',
			'One VID' : '至少一個 VID',
			'must' : '必須',
			'be assigned to WAN.' : '要橋接至廣域網路 (WAN)。',
			'be selected as the default.' : '要設置成預設 VID。',
			'This is an' : '這是個',
			'experimental' : '尚在研究',
			"feature and hasn't been tested in anything but a Linksys WRT54GL v1.1 running a Teaman-ND K24 build and a Cisco/Linksys E3000 running a Teaman-RT K26 build." : '的功能, 僅在 Linksys WRT54GL v1.1 搭載 Teaman-ND K24 建構版及 Cisco/Linksys E3000 搭載 Teaman-RT K26 建構版的環境下測試過。',
			"There's lots of things that could go wrong, please do think about what you're doing and take a backup before hitting the 'Save' button on this page!" : '有很多地方可能會出現錯誤, 當你在此頁面按下『儲存』鍵之前, 請好好想想你做了些什麼!',
			').' : ')。',
			'First 802.1Q VLAN tag' : '首個 802.1Q VLAN 標籤',
			'Enable' : '啟用',
			'Bridge' : '橋接',
			' to' : ' 到',
			'and' : '及',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的區域網路控制頁面
	// ===============================================================
	if (TomatoPage == 'advanced-access.asp') {
		Tomato_AdvancedAccess = document.getElementsByClassName('section-title');
		Tomato_AdvancedAccess[0].innerHTML = '區域網路控制 (LAN Access)';
		
		var words = {
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'Src Address' : '來源位址',
			'Src' : '來源',
			'Source LAN bridge.' : '區域網路橋接來源。',
			'optional' : '可選填',
			'Source address allowed. Ex: "1.2.3.4", "1.2.3.4 - 2.3.4.5", "1.2.3.0/24".' : '可被允許的來源位址。例如: "1.2.3.4", "1.2.3.4 - 2.3.4.5", "1.2.3.0/24"。',
			'Dst Address' : '目的位址',
			'Dst' : '目的',
			'Destination LAN bridge.' : '區域網路橋接目的。',
			'Destination address inside the LAN.' : '目的 LAN 內部的位址。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(ReplaceAdvanced, 200);
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的虛擬無線網路控制頁面
	// ===============================================================
	if (TomatoPage == 'advanced-wlanvifs.asp') {
		Tomato_AdvancedWlanvifs = document.getElementsByClassName('section-title');
		Tomato_AdvancedWlanvifs[0].innerHTML = '虛擬無線網路介面';
		
		Tomato_AdvancedWlanvifs = document.getElementsByTagName('b');
		for (var i = 0 ; Tomato_AdvancedWlanvifs.length > i ; i++) {
			switch(Tomato_AdvancedWlanvifs[i].innerHTML) {
				case 'SSID':
					Tomato_AdvancedWlanvifs[i].innerHTML = '無線名稱 (SSID)';
					break;
				case 'Bridge':
					Tomato_AdvancedWlanvifs[i].innerHTML = '橋接';
					break;
			}
		}
		
		Tomato_AdvancedWlanvifs = document.getElementsByTagName('i');
		for (var i = 0 ; Tomato_AdvancedWlanvifs.length > i ; i++) {
			switch(Tomato_AdvancedWlanvifs[i].innerHTML) {
				case 'set':
					Tomato_AdvancedWlanvifs[i].innerHTML = '設定值';
					break;
				case 'recreated':
					Tomato_AdvancedWlanvifs[i].innerHTML = '重建';
					break;
			}
		}
		
		Tomato_AdvancedWlanvifs = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdvancedWlanvifs.length > i ; i++) {
			switch(Tomato_AdvancedWlanvifs[i].innerHTML) {
				case 'SSID':
					Tomato_AdvancedWlanvifs[i].innerHTML = '無線名稱 (SSID)';
					break;
			}
		}
		
		var words = {
			'Overview' : '概觀',
			'none' : '無',
			'Wireless Interfaces Details' : '無線網路介面資訊',
			'Virtual Interfaces' : '虛擬介面',
			'max 16' : '最多 16 個',
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'Wireless VIF name.' : '虛擬無線網路介面名稱。',
			'If this VIF should be active and brought online.' : '啟用後才會將此虛擬無線網路介面上線運作。',
			'Wireless Service Set Identifier.' : '設置無線網路服務的識別名稱。',
			'Interface mode: Access Point, WDS, Wireless Client, etc...' : '介面模式: 無線基地台 (AP), 無線分散系統 (WDS), 無線用戶端 (Client), 其它...',
			'Which LAN bridge this VIF should be assigned.' : '將虛擬無線網路介面橋接到指定的區域網路 (LAN)。',
			'Other relevant notes/hints' : '其他相關說明及提示',
			"When creating/defining a new wireless VIF, it's MAC address will be shown (incorrectly) as '00:00:00:00:00:00', as it's unknown at that moment (until network is restarted and this page is reloaded)." : "當建立或定義一個新的虛擬無線網路介面時, 它的 MAC 位址將會顯示為 '00:00:00:00:00:00' (不正確的值), 因為此時還並未取得資訊, 直到網路重啟並且重新載入此頁面後才會顯示正確的值。",
			'When saving changes, the MAC addresses of all defined non-primary wireless VIFs could sometimes be (already) ' : '當儲存變更時, 所有己定義的非主要虛擬無線網路介面的',
			'but might be ' : ', 有時可能會被 WL 驅動',
			'by the WL driver (so that previously defined/saved settings might need to be updated/changed accordingly on' : '(因此在你儲存並重啟你的路由器後, 先前已定義/儲存的設定值可能需要在',
			'Advanced/MAC Address' : '進階設定/MAC 位址',
			'after saving settings and rebooting your router).' : '進行對應的更新或變更)。',
			'This web interface allows configuring a maximum of 4 VIFs for each physical wireless interface available - up to 3 extra VIFs can be defined in addition to the primary VIF' : '這個 Web 介面允許你替每個可用的實體無線網路介面設置最多 4 個虛擬無線網路介面 - 除了主要的虛擬無線網路介面外, 可再定義並加入 3 個擴充的虛擬無線網路介面',
			'on devices with multiple VIF capabilities' : '無線網卡裝置須支援多重虛擬無線網路介面',
			'By definition, configuration settings for the ' : '如果僅是要替實體無線網路介面定義或設定其',
			'primary VIF' : '主要的無線網路介面',
			" of any physical wireless interfaces shouldn't be touched here (use the" : ', 你不應該在此頁面設定, 這會使得設定變得較繁雜 (請改由',
			'Basic/Network' : '基本設定/網路連線',
			'page instead).' : '頁面來設定)。',
			'Enable Interface' : '啟用介面',
			'MAC Address' : 'MAC 位址',
			'Wireless Mode' : '無線工作模式',
			'Wireless Network Mode' : '無線工作模式',
			'note: you might wish to cross-check settings later on' : '說明: 你稍後可能須要交叉比對設定值在',
			'is not defined.' : '尚未定義。',
			'warning: WL driver reports BSSID' : '警告: WL 驅動回報的 MAC 位址為',
			'Enabled' : '啟用',
			'Disabled' : '停用',
			'Mode' : '模式',
			'Interface' : '介面',
			').' : ')。',
			// 無線網路
			'Access Point + WDS' : '無線基地台 + WDS',
			'Access Point' : '無線基地台',
			'Wireless Client' : '無線用戶端 (Client)',
			'Wireless Ethernet Bridge' : '無線網路橋接 (Bridge)',
			'Wireless' : '無線網路',
			'Link With...' : '指定連結...',
			'Automatic' : '自動連結',
			'Auto' : '自動',
			'B Only' : '僅 802.11b',
			'G Only' : '僅 802.11g',
			'B/G Mixed' : '802.11b/g 混合',
			'N Only' : '僅 802.11n',
			'WPA Personal' : 'WPA 個人版',
			'WPA Enterprise' : 'WPA 企業版',
			'WPA2 Personal' : 'WPA2 個人版',
			'WPA2 Enterprise' : 'WPA2 企業版',
			'Broadcast' : '廣播名稱',
			'Channel Width' : '頻寬',
			'Channel' : '頻道',
			'Control Sideband' : '控制 Sideband',
			'Security' : '安全性等級',
			'Encryption' : '加密類型',
			'Passphrase' : '通行碼',
			'Shared Key' : '公用金鑰',
			'Group Key Renewal' : '群組金鑰更新時間',
			'Radius Server' : 'Radius 認證伺服器',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		
		var f = unsafeWindow.save;
		unsafeWindow.save = function() {
			Tomato_ButtonValue = document.getElementsByTagName('input');
			for (var i = 0 ; Tomato_ButtonValue.length > i ; i++) {
				switch(Tomato_ButtonValue[i].value) {
					case '儲存':
						Tomato_ButtonValue[i].value = 'Save';
						break;
				}
			}
			f();
			Replaceword();
		}
		
		Replaceword();
		setTimeout(ReplaceAdvanced, 200);
		setTimeout(RefreshPage, 200);
	}


	// Tomato 進階設定的無線網路頁面
	// ===============================================================
	if (TomatoPage == 'advanced-wireless.asp') {
		Tomato_AdvancedWireless = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdvancedWireless.length > i ; i++) {
			switch(Tomato_AdvancedWireless[i].innerHTML) {
				case 'Afterburner':
					Tomato_AdvancedWireless[i].innerHTML = 'Afterburner (125HSM)';
					break;
				case 'AP Isolation':
					Tomato_AdvancedWireless[i].innerHTML = '禁止無線用戶互通';
					break;
				case 'Authentication Type':
					Tomato_AdvancedWireless[i].innerHTML = '認證類型';
					break;
				case 'Basic Rate':
					Tomato_AdvancedWireless[i].innerHTML = '基本速率';
					break;
				case 'Beacon Interval':
					Tomato_AdvancedWireless[i].innerHTML = '訊號間隔 (Beacon)';
					break;
				case 'CTS Protection Mode':
					Tomato_AdvancedWireless[i].innerHTML = 'CTS 保護模式';
					break;
				case 'Regulatory Mode':
					Tomato_AdvancedWireless[i].innerHTML = '管制模式';
					break;
				case 'Country / Region':
					Tomato_AdvancedWireless[i].innerHTML = '國家 / 地區';
					break;
				case 'Bluetooth Coexistence':
					Tomato_AdvancedWireless[i].innerHTML = '藍芽共存';
					break;
				case 'Distance / ACK Timing':
					Tomato_AdvancedWireless[i].innerHTML = '距離 / ACK 時序';
					break;
				case 'DTIM Interval':
					Tomato_AdvancedWireless[i].innerHTML = 'DTIM 間隔';
					break;
				case 'Fragmentation Threshold':
					Tomato_AdvancedWireless[i].innerHTML = '封包分割門檻';
					break;
				case 'Frame Burst':
					Tomato_AdvancedWireless[i].innerHTML = '訊框爆發 (Frame Burst)';
					break;
				case 'Maximum Clients':
					Tomato_AdvancedWireless[i].innerHTML = '最大無線用戶端數量';
					break;
				case 'Multicast Rate':
					Tomato_AdvancedWireless[i].innerHTML = '多點傳播速率 (Multicast)';
					break;
				case 'Preamble':
					Tomato_AdvancedWireless[i].innerHTML = '前導訊號 (Preamble)';
					break;
				case '802.11n Preamble':
					Tomato_AdvancedWireless[i].innerHTML = '802.11n 前導訊號';
					break;
				case 'Overlapping BSS Coexistence':
					Tomato_AdvancedWireless[i].innerHTML = '重疊 BSS 共存';
					break;
				case 'RTS Threshold':
					Tomato_AdvancedWireless[i].innerHTML = 'RTS 門檻';
					break;
				case 'Receive Antenna':
					Tomato_AdvancedWireless[i].innerHTML = '接收天線';
					break;
				case 'Transmit Antenna':
					Tomato_AdvancedWireless[i].innerHTML = '發射天線';
					break;
				case 'Transmit Power':
					Tomato_AdvancedWireless[i].innerHTML = '發射功率';
					break;
				case 'Transmission Rate':
					Tomato_AdvancedWireless[i].innerHTML = '傳輸速率';
					break;
				case 'Interference Mitigation':
					Tomato_AdvancedWireless[i].innerHTML = '干擾抑制';
					break;
				case 'WMM':
					Tomato_AdvancedWireless[i].innerHTML = '無線多媒體 (WMM)';
					break;
				case 'No ACK':
					Tomato_AdvancedWireless[i].innerHTML = '無雙向確認 (No ACK)';
					break;
				case 'APSD Mode':
					Tomato_AdvancedWireless[i].innerHTML = '自動省電傳輸模式 (APSD)';
					break;
				case 'Wireless Multicast Forwarding':
					Tomato_AdvancedWireless[i].innerHTML = '無線網路多點傳播轉送 (Multicast)';
					break;
			}
		}
		
		Tomato_AdvancedWireless = document.getElementById('_wl0_obss_coex').childNodes;
		Tomato_AdvancedWireless[1].innerHTML = '啟用';
		
		var words = {
			'Wireless Settings' : '無線網路設定',
			'Enable' : '啟用',
			'Disable' : '停用',
			'Default' : '預設',
			'All' : '全部',
			'Off' : '關閉',
			'TAIWAN, PROVINCE OF CHINA' : '台灣',
			'Preemption' : '搶占',
			'range' : '範圍',
			'meters' : '公尺',
			'use default' : '使用預設值',
			'Long' : '長',
			'Short' : '短',
			'Mixed Mode' : '混合模式',
			'actual max depends on Country selected; use 0 for hardware default' : '最大值取決於所選擇的國家；0 為硬體預設值',
			'None' : '停用',
			'Non-WLAN' : '其它干擾抑制',
			'WLAN Manual' : '無線干擾手動抑制',
			'WLAN Auto with Noise Reduction' : '無線干擾自動抑制並減少雜訊',
			'WLAN Auto' : '無線干擾自動抑制',
			'The default settings are indicated with an asterisk' : '預設的設定值會以星號',
			'symbol.' : '標記在設定值的後方。',
			'default' : '預設值',
			'Auto' : '自動',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連接埠轉送的基本設定頁面
	// ===============================================================
	if (TomatoPage == 'forward-basic.asp') {
		Tomato_ForwardBasic = document.getElementsByClassName('section-title');
		Tomato_ForwardBasic[0].innerHTML = '連接埠轉送設定 (Port Forwarding)';
		
		Tomato_ForwardBasic = document.getElementsByClassName('co1');
		Tomato_ForwardBasic[0].innerHTML = '啟用';
		Tomato_ForwardBasic = document.getElementsByClassName('co2');
		Tomato_ForwardBasic[0].innerHTML = '通訊協定';
		Tomato_ForwardBasic = document.getElementsByClassName('co3');
		Tomato_ForwardBasic[0].innerHTML = '來源位址';
		Tomato_ForwardBasic = document.getElementsByClassName('co4');
		Tomato_ForwardBasic[0].innerHTML = '外部埠口';
		Tomato_ForwardBasic = document.getElementsByClassName('co5');
		Tomato_ForwardBasic[0].innerHTML = '內部埠口';
		Tomato_ForwardBasic = document.getElementsByClassName('co6');
		Tomato_ForwardBasic[0].innerHTML = '內部位址';
		Tomato_ForwardBasic = document.getElementsByClassName('co7');
		Tomato_ForwardBasic[0].innerHTML = '註解';
		
		var words = {
			'Src Address' : '來源位址',
			'optional' : '可選填',
			'Forward only if from this address. Ex: "1.2.3.4", "1.2.3.4 - 2.3.4.5", "1.2.3.0/24", "me.example.com".' : '限制僅在來源位址是來自於所設定的位址時才啟用連接埠轉送, 位址可為單一位址或範圍, 空白為不限制來源位址。例如: "1.2.3.4", "1.2.3.4 - 2.3.4.5", "1.2.3.0/24", "me.example.com"。',
			'Ext Ports' : '外部埠口',
			'The ports to be forwarded, as seen from the WAN. Ex: "2345", "200,300", "200-300,400".' : '指定從廣域網路連入時所須啟用轉送的連接埠埠口, 埠口可為單一埠口或範圍。例如: "2345", "200,300", "200-300,400"。',
			'Int Port' : '內部埠口',
			'The destination port inside the LAN. If blank, the destination port' : '指定要轉送到區域網路內的目的埠口。如果空白, 轉送後的內部埠口',
			'is the same as' : '將會與',
			'. Only one port per entry is supported when forwarding to a different internal' : '相同。如要將外部埠口轉送到不同的內部埠口, 外部埠口的值不能設定成埠口範圍, 因目前僅支援從外部單一埠口轉送到指定的內部單一埠口',
			'port.' : '。',
			'Int Address' : '內部位址',
			'The destination address inside the LAN.' : '指定要轉送到區域網路內的目的位址。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連接埠轉送的 IPv6 基本設定頁面
	// ===============================================================
	if (TomatoPage == 'forward-basic-ipv6.asp') {
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('section-title');
		Tomato_ForwardBasicIpv6[0].innerHTML = 'IPv6 連接埠轉送設定 (IPv6 Port Forwarding)';
		
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co1');
		Tomato_ForwardBasicIpv6[0].innerHTML = '啟用';
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co2');
		Tomato_ForwardBasicIpv6[0].innerHTML = '通訊協定';
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co3');
		Tomato_ForwardBasicIpv6[0].innerHTML = '來源位址';
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co4');
		Tomato_ForwardBasicIpv6[0].innerHTML = '目的位址';
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co5');
		Tomato_ForwardBasicIpv6[0].innerHTML = '目的埠口';
		Tomato_ForwardBasicIpv6 = document.getElementsByClassName('co6');
		Tomato_ForwardBasicIpv6[0].innerHTML = '註解';
		
		var words = {
			'Opens access to ports on machines inside the LAN, but does ' : '僅是開放存取區域網路內部機器的連接埠, 並',
			'not' : '不會',
			' re-map ports.' : '重新映射連接埠。',
			'Src Address' : '來源位址',
			'optional' : '可選填',
			'Forward only if from this address. Ex: "2001:4860:800b::/48", "me.example.com".' : '限制僅在來源位址是來自於所設定的位址時才啟用連接埠轉送, 位址可為單一位址或範圍, 空白為不限制來源位址。例如: "2001:4860:800b::/48", "me.example.com"。',
			'Dest Address' : '目的位址',
			'The destination address inside the LAN.' : '指定要轉送至區域網路內的目的位址。',
			'Dest Ports' : '目的埠口',
			'The ports to be opened for forwarding. Ex: "2345", "200,300", "200-300,400".' : '指定要為轉送而開放存取的埠口。例如: "2345", "200,300", "200-300,400"。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連接埠轉送的 DMZ 隔離區頁面
	// ===============================================================
	if (TomatoPage == 'forward-dmz.asp') {
		Tomato_ForwardDmz = document.getElementsByClassName('section-title');
		Tomato_ForwardDmz[0].innerHTML = 'DMZ 隔離區';
		
		Tomato_ForwardDmz = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_ForwardDmz.length > i ; i++) {
			switch(Tomato_ForwardDmz[i].innerHTML) {
				case 'Enable DMZ':
					Tomato_ForwardDmz[i].innerHTML = '啟用 DMZ 隔離區';
					break;
				case 'Destination Address':
					Tomato_ForwardDmz[i].innerHTML = '目的位址';
					break;
				case 'Destination Interface':
					Tomato_ForwardDmz[i].innerHTML = '目的介面';
					break;
				case 'Source Address<br>Restriction':
					Tomato_ForwardDmz[i].innerHTML = '來源位址限制';
					break;
				case 'Leave Remote Access':
					Tomato_ForwardDmz[i].innerHTML = '保留遠端存取';
					break;
			}
		}
		
		var words = {
			'optional; ex: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" or "me.example.com"' : '可選填; 例如: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" 或 "me.example.com"',
			'Redirect remote access ports for SSH and HTTP(s) to router' : '將 SSH 及 HTTP(s) 的遠端存取連接埠重新導向到路由器',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連接埠轉送的觸發式轉送頁面
	// ===============================================================
	if (TomatoPage == 'forward-triggered.asp') {
		Tomato_ForwardTriggered = document.getElementsByClassName('section-title');
		Tomato_ForwardTriggered[0].innerHTML = '觸發式連接埠轉送 (Triggered Port Forwarding)';
		
		Tomato_ForwardTriggered = document.getElementsByClassName('co1');
		Tomato_ForwardTriggered[0].innerHTML = '啟用';
		Tomato_ForwardTriggered = document.getElementsByClassName('co2');
		Tomato_ForwardTriggered[0].innerHTML = '通訊協定';
		Tomato_ForwardTriggered = document.getElementsByClassName('co3');
		Tomato_ForwardTriggered[0].innerHTML = '觸發埠口';
		Tomato_ForwardTriggered = document.getElementsByClassName('co4');
		Tomato_ForwardTriggered[0].innerHTML = '轉送埠口';
		Tomato_ForwardTriggered = document.getElementsByClassName('co5');
		Tomato_ForwardTriggered[0].innerHTML = '註解';
		
		var words = {
			'Use "-" to specify a range of ports (200-300).' : '使用 "-" 可指定連接埠範圍 (例如: 200-300)。',
			'Trigger Ports are the initial LAN to WAN "trigger".' : '若區域網路內的裝置向外連接時, 有使用到觸發埠口裡的連接埠, 即會啟動 "觸發" 狀態。',
			'Forwarded Ports are the WAN to LAN ports that are opened if the "trigger" is activated.' : '若 "觸發" 狀態已啟動, 轉送埠口將會暫時開放, 以讓廣域網路能夠傳入連接。',
			'These ports are automatically closed after a few minutes of inactivity.' : '被開放的轉送連接埠會在閒置數分鐘後自動關閉。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連接埠轉送的通用隨插即用設定頁面
	// ===============================================================
	if (TomatoPage == 'forward-upnp.asp') {
		Tomato_ForwardUpnp = document.getElementsByClassName('section-title');
		Tomato_ForwardUpnp[0].innerHTML = '通用隨插即用轉送連接埠 (UPnP/NAT-PMP Forwarded Ports)';
		Tomato_ForwardUpnp[1].innerHTML = '設定';
		
		Tomato_ForwardUpnp = document.getElementsByClassName('co1');
		Tomato_ForwardUpnp[0].innerHTML = '外部';
		Tomato_ForwardUpnp = document.getElementsByClassName('co2');
		Tomato_ForwardUpnp[0].innerHTML = '內部';
		Tomato_ForwardUpnp = document.getElementsByClassName('co3');
		Tomato_ForwardUpnp[0].innerHTML = '內部位址';
		Tomato_ForwardUpnp = document.getElementsByClassName('co4');
		Tomato_ForwardUpnp[0].innerHTML = '通訊協定';
		Tomato_ForwardUpnp = document.getElementsByClassName('co5');
		Tomato_ForwardUpnp[0].innerHTML = '註解';
		
		Tomato_ForwardUpnp = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_ForwardUpnp.length > i ; i++) {
			switch(Tomato_ForwardUpnp[i].innerHTML) {
				case 'Enable UPnP':
					Tomato_ForwardUpnp[i].innerHTML = '啟用 UPnP';
					break;
				case 'Enable NAT-PMP':
					Tomato_ForwardUpnp[i].innerHTML = '啟用 NAT-PMP';
					break;
				case 'Inactive Rules Cleaning':
					Tomato_ForwardUpnp[i].innerHTML = '清除閒置的規則';
					break;
				case 'Cleaning Interval':
					Tomato_ForwardUpnp[i].innerHTML = '清除間隔';
					break;
				case 'Cleaning Threshold':
					Tomato_ForwardUpnp[i].innerHTML = '清除門檻';
					break;
				case 'Secure Mode':
					Tomato_ForwardUpnp[i].innerHTML = '安全模式';
					break;
				case 'Listen on':
					Tomato_ForwardUpnp[i].innerHTML = '監聽介面';
					break;
				case 'Show In My Network Places':
					Tomato_ForwardUpnp[i].innerHTML = '顯示在網路芳鄰';
					break;
				case 'Miniupnpd<br>Custom configuration':
					Tomato_ForwardUpnp[i].innerHTML = 'Miniupnpd<br>自訂設定';
					break;
			}
		}
		var words = {
			'redirections' : '轉向次數',
			'when enabled, UPnP clients are allowed to add mappings only to their IP' : '當啟用安全模式時, UPnP 用戶端將會被允許加入映射到它們的 IP',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 連線管制相關頁面
	// ===============================================================
	if (TomatoPage == 'restrict.asp' || TomatoPage == 'restrict-edit.asp') {
		switch(TomatoPage) {
			case 'restrict.asp':
				Tomato_Restrict = document.getElementsByClassName('section-title');
				Tomato_Restrict[0].innerHTML = '連線管制時程表';
				
				Tomato_Restrict = document.getElementsByClassName('co1');
				Tomato_Restrict[0].innerHTML = '註解';
				Tomato_Restrict = document.getElementsByClassName('co2');
				Tomato_Restrict[0].innerHTML = '時程';
				break;
			case 'restrict-edit.asp':
				Tomato_Restrict = document.getElementsByClassName('section-title');
				Tomato_Restrict[0].innerHTML = '連線管制時程設定';
				
				Tomato_Restrict = document.getElementsByClassName('co1');
				for (var i = 0 ; Tomato_Restrict.length > i ; i++) {
					switch(Tomato_Restrict[i].innerHTML) {
						case 'Rules':
							Tomato_Restrict[i].innerHTML = '規則';
							break;
						case 'MAC / IP Address':
							Tomato_Restrict[i].innerHTML = 'MAC / IP 位址';
							break;
					}
				}
				
				Tomato_Restrict = document.getElementsByTagName('label');
				for (var i = 0 ; Tomato_Restrict.length > i ; i++) {
					switch(Tomato_Restrict[i].innerHTML) {
						case 'Enabled':
							Tomato_Restrict[i].innerHTML = '啟用';
							break;
						case 'Description':
							Tomato_Restrict[i].innerHTML = '註解';
							break;
						case 'Schedule':
							Tomato_Restrict[i].innerHTML = '時程';
							break;
						case 'Time':
							Tomato_Restrict[i].innerHTML = '時間';
							break;
						case 'Days':
							Tomato_Restrict[i].innerHTML = '天數';
							break;
						case 'Type':
							Tomato_Restrict[i].innerHTML = '管制類型';
							break;
						case 'Applies To':
							Tomato_Restrict[i].innerHTML = '適用對象';
							break;
						case 'Blocked Resources':
							Tomato_Restrict[i].innerHTML = '封鎖的連線資源';
							break;
						case 'HTTP Request':
							Tomato_Restrict[i].innerHTML = 'HTTP 連線請求';
							break;
						case 'HTTP Requested Files':
							Tomato_Restrict[i].innerHTML = 'HTTP 檔案請求';
							break;
					}
				}
				
				Tomato_Restrict = document.getElementsByClassName('title indent2');
				for (var i = 0 ; Tomato_Restrict.length > i ; i++) {
					switch(Tomato_Restrict[i].innerHTML) {
						case 'Port /<br>Application':
							Tomato_Restrict[i].innerHTML = '連接埠 / 應用程式';
							break;
						case 'MAC / IP Address':
							Tomato_Restrict[i].innerHTML = 'MAC / IP 位址';
							break;
					}
				}
				break;
		}
		
		var words = {
			'Everyday' : '每天',
			'Sun' : '週日',
			'Mon' : '週一',
			'Tue' : '週二',
			'Wed' : '週三',
			'Thu' : '週四',
			'Fri' : '週五',
			'Sat' : '週六',
			' to ' : ' 至 ',
			'the following day' : '第二天',
			'Disabled' : '已停用',
			'All Day' : '整天',
			'Normal Access Restriction' : '一般連線管制',
			'Disable Wireless' : '關閉無線網路',
			'All Computers / Devices' : '所有的電腦 / 裝置',
			'The Following...' : '以下列表...',
			'All Except...' : '排除以下列表...',
			'Block All Internet Access' : '封鎖所有的網際網路連線',
			'Any Protocol' : '不限通訊協定',
			'Any Port' : '不限連接埠',
			'Dst Port' : '目的連接埠',
			'Src Port' : '來源連接埠',
			'Src or Dst' : '來源或目的連接埠',
			'IPP2P (disabled)' : 'IPP2P (停用)',
			'All IPP2P Filters' : 'IPP2P 全部過濾',
			'Layer 7 (disabled)' : 'Layer 7 (停用)',
			'Any Address' : '不限位址',
			'Dst IP' : '目的 IP',
			'Src IP' : '來源 IP',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 網路品質管理的基本設定頁面
	// ===============================================================
	if (TomatoPage == 'qos-settings.asp') {
		Tomato_QosSettings = document.getElementsByClassName('section-title');
		Tomato_QosSettings[0].innerHTML = '基本設定';
		Tomato_QosSettings[1].innerHTML = '僅用於 DSL 的設定';
		Tomato_QosSettings[2].innerHTML = '上傳速率 / 限制';
		Tomato_QosSettings[3].innerHTML = '下載速率 / 限制';
		Tomato_QosSettings[5].innerHTML = 'TCP Vegas (網路擁塞控制)';
		
		Tomato_Restrict = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_Restrict.length > i ; i++) {
			switch(Tomato_Restrict[i].innerHTML) {
				case 'Enable QoS':
					Tomato_Restrict[i].innerHTML = '啟用網路品質管理 (QoS)';
					break;
				case 'Prioritize small packets with these control flags':
					Tomato_Restrict[i].innerHTML = 'TCP 控制標誌封包優先';
					break;
				case 'Prioritize ICMP':
					Tomato_Restrict[i].innerHTML = 'ICMP 協定優先';
					break;
				case 'No Ingress QOS for UDP':
					Tomato_Restrict[i].innerHTML = 'UDP 連線不排入 QoS 佇列';
					break;
				case 'Reset class when changing settings':
					Tomato_Restrict[i].innerHTML = '變更設定時重置分級';
					break;
				case 'Default class':
					Tomato_Restrict[i].innerHTML = '預設分級';
					break;
				case 'Qdisc Scheduler':
					Tomato_Restrict[i].innerHTML = '佇列規則調度器 (Qdisc)';
					break;
				case 'DSL Overhead Value - ATM Encapsulation Type':
					Tomato_Restrict[i].innerHTML = 'DSL 覆改值 - ATM 封裝類型';
					break;
				case 'Max Bandwidth Limit':
					Tomato_Restrict[i].innerHTML = '最大頻寬限制';
					break;
				case 'Enable TCP Vegas':
					Tomato_Restrict[i].innerHTML = '啟用 TCP Vegas';
					break;
			}
		}
		
		var words = {
			'QOS Class Names' : 'QoS 分級名稱',
			'Toggle Visibility' : '顯示/隱藏細節',
			'None' : '無',
			'Set to measured bandwidth less 15-30%' : '建議最好將值設定在低於你使用頻寬的 15-30%',
			'No Limit' : '不限制',
			'Maximum 10 characters, no spaces' : '最大 10 個字元, 不允許空格、空白或中文名稱, 想以中文來顯示名稱的話, 請保持預設',
			'Priority Class' : '優先等級',
			'Service' : '網路服務',
			'VOIP/Game' :'網路電話/遊戲',
			'Media' : '網路多媒體',
			'Remote' : '遠端連線',
			'WWW' : '網頁',
			'Mail' : '電子郵件',
			'Messenger' : '即時通訊',
			'FileXfer' : '檔案傳輸',
			'P2P/Bulk' : 'P2P/大量傳輸',
			'Crawl' : '其它/限速',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 網路品質管理的分級管制頁面
	// ===============================================================
	if (TomatoPage == 'qos-classify.asp') {
		Tomato_QosClassify = document.getElementsByClassName('section-title');
		Tomato_QosClassify[0].innerHTML = '對外傳輸分級管制';
		
		Tomato_QosClassify = document.getElementsByClassName('co1');
		Tomato_QosClassify[0].innerHTML = '符合規則';
		
		Tomato_QosClassify = document.getElementsByClassName('co2');
		for (var i = 0 ; Tomato_QosClassify.length > i ; i++) {
			switch(Tomato_QosClassify[i].innerHTML) {
				case 'Class':
					Tomato_QosClassify[i].innerHTML = '級別';
					break;
				case 'Disabled':
					Tomato_QosClassify[i].innerHTML = '不分級別';
					break;
				case 'Service':
					Tomato_QosClassify[i].innerHTML = '網路服務';
					break;
				case 'VOIP/Game':
					Tomato_QosClassify[i].innerHTML = '網路電話<br>網路遊戲';
					break;
				case 'Media':
					Tomato_QosClassify[i].innerHTML = '網路多媒體';
					break;
				case 'Remote':
					Tomato_QosClassify[i].innerHTML = '遠端連線';
					break;
				case 'WWW':
					Tomato_QosClassify[i].innerHTML = '網頁';
					break;
				case 'Mail':
					Tomato_QosClassify[i].innerHTML = '電子郵件';
					break;
				case 'Messenger':
					Tomato_QosClassify[i].innerHTML = '即時通訊';
					break;
				case 'FileXfer':
					Tomato_QosClassify[i].innerHTML = '檔案傳輸';
					break;
				case 'P2P/Bulk':
					Tomato_QosClassify[i].innerHTML = 'P2P 傳輸<br>大量傳輸';
					break;
				case 'Crawl':
					Tomato_QosClassify[i].innerHTML = '其它/限速';
					break;
			}
		}
		
		Tomato_QosClassify = document.getElementsByClassName('co3');
		Tomato_QosClassify[0].innerHTML = '註解';
		
		Tomato_QosClassify = document.getElementById('_[object HTMLTableElement]_12').childNodes;
		for (var i = 0 ; Tomato_QosClassify.length > i ; i++) {
			switch(Tomato_QosClassify[i].innerHTML) {
				case 'Disabled':
					Tomato_QosClassify[i].innerHTML = '不分級別';
					break;
				case 'Service':
					Tomato_QosClassify[i].innerHTML = '網路服務';
					break;
				case 'VOIP/Game':
					Tomato_QosClassify[i].innerHTML = '網路電話/遊戲';
					break;
				case 'Media':
					Tomato_QosClassify[i].innerHTML = '網路多媒體';
					break;
				case 'Remote':
					Tomato_QosClassify[i].innerHTML = '遠端連線';
					break;
				case 'WWW':
					Tomato_QosClassify[i].innerHTML = '網頁';
					break;
				case 'Mail':
					Tomato_QosClassify[i].innerHTML = '電子郵件';
					break;
				case 'Messenger':
					Tomato_QosClassify[i].innerHTML = '即時通訊';
					break;
				case 'FileXfer':
					Tomato_QosClassify[i].innerHTML = '檔案傳輸';
					break;
				case 'P2P/Bulk':
					Tomato_QosClassify[i].innerHTML = 'P2P/大量傳輸';
					break;
				case 'Crawl':
					Tomato_QosClassify[i].innerHTML = '其它/限速';
					break;
			}
		}
		
		var words = {
			'Any Address' : '不限位址',
			'Dst IP' : '目的 IP',
			'Src IP' : '來源 IP',
			'Src MAC' : '來源 MAC',
			'Any Protocol' : '不限通訊協定',
			'Any Port' : '不限連接埠',
			'Dst Port' : '目的連接埠',
			'Src Port' : '來源連接埠',
			'Src or Dst' : '來源或目的連接埠',
			'IPP2P (disabled)' : 'IPP2P (停用)',
			'All IPP2P filters' : 'IPP2P 全部過濾',
			'Layer 7 (disabled)' : 'Layer 7 (停用)',
			'DSCP (any)' : 'DSCP (不限)',
			'DSCP value' : 'DSCP 數值 (自訂)',
			'KB Transferred' : 'KB 傳送流量',
			'Port:' : '連接埠:',
			'Transferred:' : '傳送流量:',
			'QoS disabled.' : 'QoS 目前已停用。',
			'Enable »' : '啟用 »',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 網路品質管理的圖表分析頁面
	// ===============================================================
	if (TomatoPage == 'qos-graphs.asp') {
		Tomato_QosGraphs = document.getElementsByClassName('section-title');
		Tomato_QosGraphs[0].innerHTML = '連線分佈圖';
		Tomato_QosGraphs[1].innerHTML = '頻寬分佈圖 (上傳)';
		Tomato_QosGraphs[2].innerHTML = '頻寬分佈圖 (下載)';
		
		Tomato_QosGraphs = document.getElementsByClassName('title');
		for (var i = 0 ; Tomato_QosGraphs.length > i ; i++) {
			switch(Tomato_QosGraphs[i].style.width) {
				case '45px':
					Tomato_QosGraphs[i].style.width = '70px';
					break;
			}
		}
		
		Tomato_QosGraphs = document.getElementsByTagName('a');
		for (var i = 0 ; Tomato_QosGraphs.length > i ; i++) {
			switch(Tomato_QosGraphs[i].innerHTML) {
				case 'Unclassified':
					Tomato_QosGraphs[i].innerHTML = '未有級別';
					break;
				case 'Service':
					Tomato_QosGraphs[i].innerHTML = '網路服務';
					break;
				case 'VOIP/Game':
					Tomato_QosGraphs[i].innerHTML = '網路電話<br>網路遊戲';
					break;
				case 'Media':
					Tomato_QosGraphs[i].innerHTML = '網路多媒體';
					break;
				case 'Remote':
					Tomato_QosGraphs[i].innerHTML = '遠端連線';
					break;
				case 'WWW':
					Tomato_QosGraphs[i].innerHTML = '網頁';
					break;
				case 'Mail':
					Tomato_QosGraphs[i].innerHTML = '電子郵件';
					break;
				case 'Messenger':
					Tomato_QosGraphs[i].innerHTML = '即時通訊';
					break;
				case 'FileXfer':
					Tomato_QosGraphs[i].innerHTML = '檔案傳輸';
					break;
				case 'P2P/Bulk':
					Tomato_QosGraphs[i].innerHTML = 'P2P 傳輸 <br>大量傳輸';
					break;
				case 'Crawl':
					Tomato_QosGraphs[i].innerHTML = '其它/限速';
					break;
			}
		}
		
		Tomato_QosGraphs = document.getElementsByClassName('total');
		for (var i = 0 ; Tomato_QosGraphs.length > i ; i++) {
			switch(Tomato_QosGraphs[i].innerHTML) {
				case 'Total':
					Tomato_QosGraphs[i].innerHTML = '合計';
					break;
			}
		}
		
		Tomato_QosGraphs = document.getElementsByClassName('thead pct');
		Tomato_QosGraphs[0].innerHTML = '比例';
		Tomato_QosGraphs[1].innerHTML = '比例';
		
		var words = {
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 網路品質管理的連線列表頁面
	// ===============================================================
	if (TomatoPage == 'qos-detailed.asp') {
		
		Tomato_QosDetailed = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_QosDetailed.length > i ; i++) {
			switch(Tomato_QosDetailed[i].innerHTML) {
				case 'Show only these IPs':
					Tomato_QosDetailed[i].innerHTML = '顯示這些 IP 位址';
					break;
				case 'Exclude these IPs':
					Tomato_QosDetailed[i].innerHTML = '排除這些 IP 位址';
					break;
				case 'Exclude gateway traffic':
					Tomato_QosDetailed[i].innerHTML = '排除閘道器流量';
					break;
				case 'Exclude IPv4 broadcast':
					Tomato_QosDetailed[i].innerHTML = '排除 IPv4 廣播';
					break;
				case 'Exclude IPv4 multicast':
					Tomato_QosDetailed[i].innerHTML = '排除 IPv4 多點傳播';
					break;
				case 'Auto resolve addresses':
					Tomato_QosDetailed[i].innerHTML = '自動解析位址';
					break;
				case 'Show shortcuts':
					Tomato_QosDetailed[i].innerHTML = '顯示功能快捷';
					break;
			}
		}
		
		var words = {
			'View Details' : '連線列表詳細資訊',
			'connections' : '連線數',
			'showing' : '顯示',
			'out of' : '/',
			'resolve' : '解析',
			'Filters' : '過濾條件',
			'Toggle Visibility' : '顯示/隱藏細節',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'hide': '隱藏',
			'Comma separated list' : '請以逗號分隔 IP 位址',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		
		var f = unsafeWindow.verifyFields;
		unsafeWindow.verifyFields = function() {
			f();
			setTimeout(ReplaceQos, 600);
			setTimeout(RefreshPage, 600);
		}
		
		Replaceword();
		setTimeout(ReplaceQos, 600);
		setTimeout(RefreshPage, 600);
	}


	// Tomato 網路品質管理的傳輸速率頁面
	// ===============================================================
	if (TomatoPage == 'qos-ctrate.asp') {
		
		Tomato_QosCtrate = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_QosCtrate.length > i ; i++) {
			switch(Tomato_QosCtrate[i].innerHTML) {
				case 'Show only these IPs':
					Tomato_QosCtrate[i].innerHTML = '顯示這些 IP 位址';
					break;
				case 'Exclude these IPs':
					Tomato_QosCtrate[i].innerHTML = '排除這些 IP 位址';
					break;
				case 'Exclude gateway traffic':
					Tomato_QosCtrate[i].innerHTML = '排除閘道器流量';
					break;
				case 'Exclude IPv4 broadcast':
					Tomato_QosCtrate[i].innerHTML = '排除 IPv4 廣播';
					break;
				case 'Exclude IPv4 multicast':
					Tomato_QosCtrate[i].innerHTML = '排除 IPv4 多點傳播';
					break;
				case 'Ignore inactive connections':
					Tomato_QosCtrate[i].innerHTML = '忽略停止傳輸的連線';
					break;
				case 'Auto resolve addresses':
					Tomato_QosCtrate[i].innerHTML = '自動解析位址';
					break;
				case 'Show shortcuts':
					Tomato_QosCtrate[i].innerHTML = '顯示功能快捷';
					break;
			}
		}
		
		var words = {
			'Transfer Rates' : '傳輸速率',
			'connections' : '連線數',
			'showing' : '顯示',
			'out of' : '/',
			'resolve' : '解析',
			'Filters' : '過濾條件',
			'Toggle Visibility' : '顯示/隱藏細節',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'hide': '隱藏',
			'Comma separated list' : '請以逗號分隔 IP 位址',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		
		var f = unsafeWindow.verifyFields;
		unsafeWindow.verifyFields = function() {
			f();
			setTimeout(ReplaceQos, 2400);
			setTimeout(RefreshPage, 2400);
		}
		
		Replaceword();
		setTimeout(ReplaceQos, 2400);
		setTimeout(RefreshPage, 2400);
	}


	// Tomato 頻寬限制設定頁面
	// ===============================================================
	if (TomatoPage == 'bwlimit.asp') {
		Tomato_Bwlimit = document.getElementsByClassName('section-title');
		Tomato_Bwlimit[0].innerHTML = 'LAN (br0) 頻寬限制';
		Tomato_Bwlimit[1].innerHTML = 'LAN (br0) 預設頻寬限制 (未列在 MAC / IP 位址清單裡的預設頻寬限制)';
		Tomato_Bwlimit[2].innerHTML = 'LAN1 (br1) 預設頻寬限制';
		Tomato_Bwlimit[3].innerHTML = 'LAN2 (br2) 預設頻寬限制';
		Tomato_Bwlimit[4].innerHTML = 'LAN3 (br3) 預設頻寬限制';
		
		Tomato_Bwlimit = document.getElementsByClassName('co1');
		Tomato_Bwlimit[0].innerHTML = 'IP 位址 | IP 範圍 | MAC 位址';
		Tomato_Bwlimit = document.getElementsByClassName('co2');
		Tomato_Bwlimit[0].innerHTML = '下載保證頻寬';
		Tomato_Bwlimit = document.getElementsByClassName('co3');
		Tomato_Bwlimit[0].innerHTML = '下載最大頻寬';
		Tomato_Bwlimit = document.getElementsByClassName('co4');
		Tomato_Bwlimit[0].innerHTML = '上傳保證頻寬';
		Tomato_Bwlimit = document.getElementsByClassName('co5');
		Tomato_Bwlimit[0].innerHTML = '上傳最大頻寬';
		Tomato_Bwlimit = document.getElementsByClassName('co6');
		Tomato_Bwlimit[0].innerHTML = '優先等級';
		Tomato_Bwlimit = document.getElementsByClassName('co7');
		Tomato_Bwlimit[0].innerHTML = 'TCP 限制';
		Tomato_Bwlimit = document.getElementsByClassName('co8');
		Tomato_Bwlimit[0].innerHTML = 'UDP 限制';
		
		Tomato_Bwlimit = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_Bwlimit.length > i ; i++) {
			switch(Tomato_Bwlimit[i].innerHTML) {
				case 'Enable Limiter':
					Tomato_Bwlimit[i].innerHTML = '啟用頻寬限制';
					break;
				case 'Enable':
					Tomato_Bwlimit[i].innerHTML = '啟用';
					break;
				case 'Download rate':
					Tomato_Bwlimit[i].innerHTML = '下載保證頻寬';
					break;
				case 'Download ceil':
					Tomato_Bwlimit[i].innerHTML = '下載最大頻寬';
					break;
				case 'Upload rate':
					Tomato_Bwlimit[i].innerHTML = '上傳保證頻寬';
					break;
				case 'Upload ceil':
					Tomato_Bwlimit[i].innerHTML = '上傳最大頻寬';
					break;
				case 'TCP Limit':
					Tomato_Bwlimit[i].innerHTML = 'TCP 限制';
					break;
				case 'UDP limit':
					Tomato_Bwlimit[i].innerHTML = 'UDP 限制';
					break;
				case 'Priority':
					Tomato_Bwlimit[i].innerHTML = '優先等級';
					break;
			}
		}
		
		var words = {
			'Max Available Download' :'最大可用下載頻寬',
			'Max Available Upload' :'最大可用上傳頻寬',
			'same as used in QoS' : '與 QoS 使用的相同',
			'Highest' : '最高',
			'High' : '高',
			'Normal' : '標準',
			'Lowest' : '最低',
			'Low' : '低',
			'nolimit' : '不限制',
			'IP Address / IP Range' : 'IP 位址 / IP 範圍',
			'Example: 192.168.1.5 for one IP.' : '例如: 192.168.1.5 為單一 IP 位址',
			'Example: 192.168.1.4-7 for IP 192.168.1.4 to 192.168.1.7' : '例如: 192.168.1.4-7 為 IP 192.168.1.4 到 192.168.1.7',
			'Example: 4-7 for IP Range .4 to .7' : '上例中 4-7 代表 IP 範圍 .4 到 .7',
			'The IP Range devices will share the Bandwidth' : 'IP 範圍裡的裝置將共享所設定的頻寬',
			'MAC Address' : 'MAC 位址',
			'Example: 00:2E:3C:6A:22:D8' : '例如: 00:2E:3C:6A:22:D8',
			'no limit' : '不限制',
			'Default Class' : '預設頻寬限制',
			"IP / MAC's non included in the list will take the Default Rate/Ceiling setting" : '所有未列在上方 LAN (br0) 頻寬限制清單裡的 IP / MAC 位址將使用這個預設的頻寬限制設定。',
			'The bandwitdh will be shared by all unlisted hosts in br0' : '所有未列在上方 LAN (br0) 頻寬限制清單裡的主機將共享在此所設定的頻寬。',
			'The bandwitdh will be shared by all hosts in br1.' : '所有在 LAN (br1) 的主機將共享在此所設定的頻寬。',
			'The bandwitdh will be shared by all hosts in br2.' : '所有在 LAN (br2) 的主機將共享在此所設定的頻寬。',
			'The bandwitdh will be shared by all hosts in br3.' : '所有在 LAN (br3) 的主機將共享在此所設定的頻寬。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 網頁認證設定頁面
	// ===============================================================
	if (TomatoPage == 'splashd.asp') {
		Tomato_Splashd = document.getElementsByClassName('section-title');
		Tomato_Splashd[0].innerHTML = '網頁認證管理';
		Tomato_Splashd[1].innerHTML = '自訂認證網頁檔案路徑';
		
		Tomato_Splashd = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_Splashd.length > i ; i++) {
			switch(Tomato_Splashd[i].innerHTML) {
				case 'Enable Function':
					Tomato_Splashd[i].innerHTML = '啟用網頁認證功能';
					break;
				case 'Interface':
					Tomato_Splashd[i].innerHTML = '網路介面';
					break;
				case 'Gateway Name':
					Tomato_Splashd[i].innerHTML = '閘道器名稱';
					break;
				case 'Captive Site Forwarding':
					Tomato_Splashd[i].innerHTML = '認證網站轉送';
					break;
				case 'Home Page':
					Tomato_Splashd[i].innerHTML = '轉送網址';
					break;
				case 'Welcome html Path':
					Tomato_Splashd[i].innerHTML = '歡迎頁面路徑';
					break;
				case 'Logged Timeout':
					Tomato_Splashd[i].innerHTML = '登入逾時';
					break;
				case 'Idle Timeout':
					Tomato_Splashd[i].innerHTML = '閒置逾時';
					break;
				case 'Max Missed ARP':
					Tomato_Splashd[i].innerHTML = '最大 ARP 遺失數量';
					break;
				case 'Log Info Level':
					Tomato_Splashd[i].innerHTML = '日誌資訊層級';
					break;
				case 'Gateway Port':
					Tomato_Splashd[i].innerHTML = '閘道器連接埠';
					break;
				case 'Excluded Ports to be redirected':
					Tomato_Splashd[i].innerHTML = '排除重新導向的連接埠';
					break;
				case 'Included Ports to be redirected':
					Tomato_Splashd[i].innerHTML = '需要重新導向的連接埠';
					break;
				case 'URL Excluded off Captive Portal':
					Tomato_Splashd[i].innerHTML = '排除網頁認證的網址';
					break;
				case 'MAC Address Whitelist':
					Tomato_Splashd[i].innerHTML = 'MAC 位址白名單';
					break;
			}
		}
		
		Tomato_Splashd = document.getElementsByTagName('b');
		for (var i = 0 ; Tomato_Splashd.length > i ; i++) {
			switch(Tomato_Splashd[i].innerHTML) {
				case 'Captive Portal. User Guide.':
					Tomato_Splashd[i].innerHTML = '網頁認證 - 使用說明';
					break;
				case '*- Enable function:':
					Tomato_Splashd[i].innerHTML = '*- 啟用網頁認證功能:';
					break;
				case '*- Interface:':
					Tomato_Splashd[i].innerHTML = '*- 網路介面:';
					break;
				case '*- Gateway name:':
					Tomato_Splashd[i].innerHTML = '*- 閘道器名稱:';
					break;
				case '*- Captive Site Forwarding:':
					Tomato_Splashd[i].innerHTML = '*- 認證網站轉送:';
					break;
				case '*- Home page:':
					Tomato_Splashd[i].innerHTML = '*- 轉送網址:';
					break;
				case '*- Welcome html Path:':
					Tomato_Splashd[i].innerHTML = '*- 歡迎頁面路徑:';
					break;
				case '*- Logged Timeout:':
					Tomato_Splashd[i].innerHTML = '*- 登入逾時:';
					break;
				case '*- Idle Timeout:':
					Tomato_Splashd[i].innerHTML = '*- 閒置逾時:';
					break;
				case '*- Max Missed ARP:':
					Tomato_Splashd[i].innerHTML = '*- 最大 ARP 遺失數量:';
					break;
				case '*- Log Info Level:':
					Tomato_Splashd[i].innerHTML = '*- 日誌資訊層級:';
					break;
				case '*- Gateway Port:':
					Tomato_Splashd[i].innerHTML = '*- 閘道器連接埠:';
					break;
				case '*- Excluded/Included ports to be redirected:':
					Tomato_Splashd[i].innerHTML = '*- 排除/需要重新導向的連接埠:';
					break;
				case '*- URL excluded off the portal:':
					Tomato_Splashd[i].innerHTML = '*- 排除網頁認證的網址:';
					break;
				case '*- MAC address whitelist:':
					Tomato_Splashd[i].innerHTML = '*- MAC 位址白名單:';
					break;
				case '*- Customized Splash File Path:':
					Tomato_Splashd[i].innerHTML = '*- 自訂認證網頁檔案路徑:';
					break;
			}
		}
		
		var words = {
			'0 - unlimited' : '0 - 不限制',
			'When you tick and save the router will show a Welcome Banner when a computer access the Internet.' : '當你在路由器核取此項目並儲存後, 將會在裝置存取網際網路時顯示歡迎頁面。',
			'Select one of the bridges on which Captive Portal will listen.' : '選擇網頁認證要監聽的網路介面。',
			'The name of the Gateway appearing in the welcome banner' : '設定在歡迎頁面所要顯示的閘道器名稱。',
			"When active, the 'Home Page' (read next line) will appear after you Agree in Welcome Banner." : '當啟用此項目時, 將會在歡迎頁面按下同意後, 轉送到下方的轉送網址。',
			'The URL that will appear after you Agree the Welcome Banner.' : '設定在歡迎頁面按下同意後所要轉送的網址。',
			'The location where the Welcome banner is located' : '設定歡迎頁面所在的路徑位址。',
			'During this period of time no Welcome banner will appear when you access to the device. Default=3600 sec.(1 Hour).' : '設定當存取過裝置後, 在所設定的時間週期內都不會再出現歡迎頁面 (預設值 = 3600 秒 - 1 小時)。',
			"Expired time where you can't access the device again.Default value=0." : '設定無法再存取裝置的閒置到期時間 (預設值 = 0 秒 - 不限制)。',
			'Number of lost ARP before considering the client has leaved the connection. Default = 5' : '設定用來考慮用戶端已離線的 ARP 遺失數量 (預設值 = 5)。',
			'Messages from this module stored internally for better trace. Level 0=Silent, 10=Parrot, 2=Default.' : '設定此功能模組內部儲存的訊息層級以利於追蹤 (層級 0 = 無訊息, 10 = 重複訊息, 2 = 預設訊息)。',
			'Port to be used by the Captive Portal for page redirection. Port 1 to 65534. Default=5280.' : '設定重新導向到網頁認證頁面所要使用的連接埠 (連接埠 1 到 65534, 預設值 = 5280)。',
			'When setting any port (included or excluded) leave a blank space between each port number, i.e; 25 110 4662 4672. Use prefereable one of the two option to avoid conflicts.' : '設定多個連接埠時可用空格隔開每個連接埠號碼, 例如: 25 110 4662 4672。設定時應避免同一連接埠同時被設在 (排除/需要) 選項以避免衝突。',
			"URL that will be accessed without Welcome banner screen appearing. When you set allowed url's also leave a blank space between each url. i.e; http://www.google.com http://www.google.es" : '設定存取時不會出現歡迎頁面的網址。當設定多個網址時可用空格隔開每個網址, 例如: http://www.google.com http://www.google.es。',
			'MAC addresses excluded of the feature. Leave a blank space between each MAC Address, i.e; 11:22:33:44:55:66 11:22:33:44:55:67' : '設定要排除網頁認證功能的 MAC 位址。設定多個 MAC 位址時可用空格隔開每個 MAC 位址, 例如: 11:22:33:44:55:66 11:22:33:44:55:67。',
			'Here you can upload your personal Welcome banner that will overwrite * default one.' : '可在此上傳你個人自訂的歡迎頁面, 將會覆寫到原本的歡迎頁面路徑。',
			'* default' : '* 為預設值',
			'Note: If Login Time is expired you should re-enter again into the splash page to get a new lease period. Be aware, there is no notice about expired period so, you can loss Internet Access.' : '說明: 若登入時間已到期,你應該重新登入歡迎頁面以取得新的租期。請注意租約到期並不會有任何的相關公告, 所以若不重新登入, 你可能會失去存取網際網路的權限。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato VPN 通道的 OpenVPN 伺服器頁面
	// ===============================================================
	if (TomatoPage == 'vpn-server.asp') {
		Tomato_VpnServer = document.getElementsByClassName('section-title');
		Tomato_VpnServer[0].innerHTML = 'OpenVPN 伺服器設定';
		
		Tomato_VpnServer = document.getElementsByTagName('a');
		for (var i = 0 ; Tomato_VpnServer.length > i ; i++) {
			switch(Tomato_VpnServer[i].innerHTML) {
				case 'Server 1':
					Tomato_VpnServer[i].innerHTML = '伺服器 1';
					break;
				case 'Server 2':
					Tomato_VpnServer[i].innerHTML = '伺服器 2';
					break;
				case 'Basic':
					Tomato_VpnServer[i].innerHTML = '基本設定';
					break;
				case 'Advanced':
					Tomato_VpnServer[i].innerHTML = '進階設定';
					break;
				case 'Keys':
					Tomato_VpnServer[i].innerHTML = '金鑰設定';
					break;
				case 'Status':
					Tomato_VpnServer[i].innerHTML = '狀態';
					break;
				case 'Refresh Status':
					Tomato_VpnServer[i].innerHTML = '更新狀態';
					break;
			}
		}
		
		Tomato_VpnServer = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_VpnServer.length > i ; i++) {
			switch(Tomato_VpnServer[i].innerHTML) {
				case 'Start with WAN':
					Tomato_VpnServer[i].innerHTML = '與廣域網路一起啟動';
					break;
				case 'Interface Type':
					Tomato_VpnServer[i].innerHTML = '介面類型';
					break;
				case 'Protocol':
					Tomato_VpnServer[i].innerHTML = '通訊協定';
					break;
				case 'Port':
					Tomato_VpnServer[i].innerHTML = '連接埠';
					break;
				case 'Firewall':
					Tomato_VpnServer[i].innerHTML = '防火牆';
					break;
				case 'Authorization Mode':
					Tomato_VpnServer[i].innerHTML = '授權模式';
					break;
				case 'Extra HMAC authorization (tls-auth)':
					Tomato_VpnServer[i].innerHTML = '擴展 HMAC 授權 (tls-auth)';
					break;
				case 'VPN subnet/netmask':
					Tomato_VpnServer[i].innerHTML = 'VPN 子網路 / 遮罩';
					break;
				case 'Local/remote endpoint addresses':
					Tomato_VpnServer[i].innerHTML = '本地 / 遠端端點位址';
					break;
				case 'Poll Interval':
					Tomato_VpnServer[i].innerHTML = '輪詢間隔';
					break;
				case 'Push LAN to clients':
					Tomato_VpnServer[i].innerHTML = '推送 LAN 至用戶端';
					break;
				case 'Direct clients to<br>redirect Internet traffic':
					Tomato_VpnServer[i].innerHTML = '重新導向用戶端的網際網路流量至 VPN 伺服器';
					break;
				case 'Respond to DNS':
					Tomato_VpnServer[i].innerHTML = '回應 DNS';
					break;
				case 'Advertise DNS to clients':
					Tomato_VpnServer[i].innerHTML = '通報 DNS 至用戶端';
					break;
				case 'Encryption cipher':
					Tomato_VpnServer[i].innerHTML = '加密方式';
					break;
				case 'Compression':
					Tomato_VpnServer[i].innerHTML = '資料壓縮';
					break;
				case 'TLS Renegotiation Time':
					Tomato_VpnServer[i].innerHTML = 'TLS 重新協商時間';
					break;
				case 'Manage Client-Specific Options':
					Tomato_VpnServer[i].innerHTML = '管理用戶端特定選項';
					break;
				case 'Allow Only These Clients':
					Tomato_VpnServer[i].innerHTML = '僅允許這些用戶端';
					break;
				case 'Allow User/Pass Auth':
					Tomato_VpnServer[i].innerHTML = '允許帳號 / 密碼認證';
					break;
				case 'Allow Only User/Pass(Without cert) Auth':
					Tomato_VpnServer[i].innerHTML = '僅允許帳號 / 密碼認證 (停用憑證)';
					break;
				case 'Custom Configuration':
					Tomato_VpnServer[i].innerHTML = '自訂設定';
					break;
				case 'Certificate Authority':
					Tomato_VpnServer[i].innerHTML = '認證中心';
					break;
				case 'Server Certificate':
					Tomato_VpnServer[i].innerHTML = '伺服器憑證';
					break;
				case 'Server Key':
					Tomato_VpnServer[i].innerHTML = '伺服器金鑰';
					break;
				case 'Diffie Hellman parameters':
					Tomato_VpnServer[i].innerHTML = 'Diffie Hellman 參數';
					break;
			}
		}
		
		Tomato_VpnServer = document.getElementsByClassName('co1');
		Tomato_VpnServer[0].innerHTML = '啟用';
		Tomato_VpnServer[1].innerHTML = '啟用';
		Tomato_VpnServer = document.getElementsByClassName('co2');
		Tomato_VpnServer[0].innerHTML = '公共名稱';
		Tomato_VpnServer[1].innerHTML = '用戶名稱';
		Tomato_VpnServer = document.getElementsByClassName('co3');
		Tomato_VpnServer[0].innerHTML = '子網路';
		Tomato_VpnServer[1].innerHTML = '密碼';
		Tomato_VpnServer = document.getElementsByClassName('co4');
		Tomato_VpnServer[0].innerHTML = '子網路遮罩';
		Tomato_VpnServer = document.getElementsByClassName('co5');
		Tomato_VpnServer[0].innerHTML = '推送';
		
		var words = {
			'Automatic' : '自動',
			'External Only' : '僅外部',
			'Custom' : '自訂',
			'Static Key' : '固定金鑰',
			'must configure manually...' : '必需自己手動設定...',
			'Allow Client<->Client' : '允許用戶端互連',
			'in minutes, 0 to disable' : '分鐘, 0 為停用',
			'Use Default' : '使用預設',
			'None' : '無',
			'Disabled' : '停用',
			'Enabled' : '啟用',
			'Adaptive' : '自動調整',
			'in seconds, -1 for default' : '秒, -1 為預設值',
			'For help generating keys, refer to the OpenVPN' : '對於如何產生金鑰的方式, 請參考 OpenVPN 的',
			'Server is not running or status could not be read.' : '伺服器尚未啟動或狀態無法讀取。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato VPN 通道的 OpenVPN 用戶端頁面
	// ===============================================================
	if (TomatoPage == 'vpn-client.asp') {
		Tomato_VpnClient = document.getElementsByClassName('section-title');
		Tomato_VpnClient[0].innerHTML = 'OpenVPN 用戶端設定';
		
		Tomato_VpnClient = document.getElementsByTagName('a');
		for (var i = 0 ; Tomato_VpnClient.length > i ; i++) {
			switch(Tomato_VpnClient[i].innerHTML) {
				case 'Client 1':
					Tomato_VpnClient[i].innerHTML = '用戶端 1';
					break;
				case 'Client 2':
					Tomato_VpnClient[i].innerHTML = '用戶端 2';
					break;
				case 'Basic':
					Tomato_VpnClient[i].innerHTML = '基本設定';
					break;
				case 'Advanced':
					Tomato_VpnClient[i].innerHTML = '進階設定';
					break;
				case 'Keys':
					Tomato_VpnClient[i].innerHTML = '金鑰設定';
					break;
				case 'Status':
					Tomato_VpnClient[i].innerHTML = '狀態';
					break;
				case 'Refresh Status':
					Tomato_VpnClient[i].innerHTML = '更新狀態';
					break;
			}
		}
		
		Tomato_VpnClient = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_VpnClient.length > i ; i++) {
			switch(Tomato_VpnClient[i].innerHTML) {
				case 'Start with WAN':
					Tomato_VpnClient[i].innerHTML = '與廣域網路一起啟動';
					break;
				case 'Interface Type':
					Tomato_VpnClient[i].innerHTML = '介面類型';
					break;
				case 'Protocol':
					Tomato_VpnClient[i].innerHTML = '通訊協定';
					break;
				case 'Server Address/Port':
					Tomato_VpnClient[i].innerHTML = '伺服器位址 / 連接埠';
					break;
				case 'Firewall':
					Tomato_VpnClient[i].innerHTML = '防火牆';
					break;
				case 'Authorization Mode':
					Tomato_VpnClient[i].innerHTML = '授權模式';
					break;
				case 'Username/Password Authentication':
					Tomato_VpnClient[i].innerHTML = '帳號 / 密碼認證';
					break;
				case 'Username: ':
					Tomato_VpnClient[i].innerHTML = '帳號:';
					break;
				case 'Password: ':
					Tomato_VpnClient[i].innerHTML = '密碼:';
					break;
				case 'Username Authen. Only':
					Tomato_VpnClient[i].innerHTML = '僅用帳號認證';
					break;
				case 'Extra HMAC authorization (tls-auth)':
					Tomato_VpnClient[i].innerHTML = '擴展 HMAC 授權 (tls-auth)';
					break;
				case 'Create NAT on tunnel':
					Tomato_VpnClient[i].innerHTML = '建立通道 NAT';
					break;
				case 'Local/remote endpoint addresses':
					Tomato_VpnClient[i].innerHTML = '本地 / 遠端端點位址';
					break;
				case 'Poll Interval':
					Tomato_VpnClient[i].innerHTML = '輪詢間隔';
					break;
				case 'Redirect Internet traffic':
					Tomato_VpnClient[i].innerHTML = '重新導向網際網路流量';
					break;
				case 'Accept DNS configuration':
					Tomato_VpnClient[i].innerHTML = '接受 DNS 設定';
					break;
				case 'Encryption cipher':
					Tomato_VpnClient[i].innerHTML = '加密方式';
					break;
				case 'Compression':
					Tomato_VpnClient[i].innerHTML = '資料壓縮';
					break;
				case 'TLS Renegotiation Time':
					Tomato_VpnClient[i].innerHTML = 'TLS 重新協商時間';
					break;
				case 'Connection retry':
					Tomato_VpnClient[i].innerHTML = '連線重試';
					break;
				case 'Verify server certificate (tls-remote)':
					Tomato_VpnClient[i].innerHTML = '驗證伺服器憑證 (tls-remote)';
					break;
				case 'Custom Configuration':
					Tomato_VpnClient[i].innerHTML = '自訂設定';
					break;
				case 'Certificate Authority':
					Tomato_VpnClient[i].innerHTML = '認證中心';
					break;
				case 'Client Certificate':
					Tomato_VpnClient[i].innerHTML = '用戶端憑證';
					break;
				case 'Client Key':
					Tomato_VpnClient[i].innerHTML = '用戶端金鑰';
					break;
			}
		}
		
		var words = {
			'Automatic' : '自動',
			'Custom' : '自訂',
			'Static Key' : '固定金鑰',
			'Warning: Must define Certificate Authority.' : '注意: 必須定義認證中心。',
			'must configure manually...' : '必需自己手動設定...',
			'Routes must be configured manually.' : '路由表必須自己手動設定。',
			'Common Name:' : '公共名稱:',
			'in minutes, 0 to disable' : '分鐘, 0 為停用',
			'Use Default' : '使用預設',
			'None' : '無',
			'Disabled' : '停用',
			'Enabled' : '啟用',
			'Adaptive' : '自動調整',
			'in seconds, -1 for default' : '秒, -1 為預設值',
			'in seconds; -1 for infinite' : '秒, -1 為無限制',
			'For help generating keys, refer to the OpenVPN' : '對於如何產生金鑰的方式, 請參考 OpenVPN 的',
			'Client is not running or status could not be read.' : '用戶端尚未啟動或狀態無法讀取。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato VPN 通道的 PPTP 伺服器頁面
	// ===============================================================
	if (TomatoPage == 'vpn-pptp-server.asp') {
		Tomato_VpnPptpServer = document.getElementsByClassName('section-title');
		Tomato_VpnPptpServer[0].innerHTML = 'PPTP 伺服器設定';
		Tomato_VpnPptpServer[1].innerHTML = 'PPTP 帳號清單';
		
		Tomato_VpnPptpServer = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_VpnPptpServer.length > i ; i++) {
			switch(Tomato_VpnPptpServer[i].innerHTML) {
				case 'Enable':
					Tomato_VpnPptpServer[i].innerHTML = '啟用';
					break;
				case 'Remote IP Address Range':
					Tomato_VpnPptpServer[i].innerHTML = '用戶端 IP 位址範圍';
					break;
				case 'Broadcast Relay Mode':
					Tomato_VpnPptpServer[i].innerHTML = '廣播中繼模式';
					break;
				case 'Encryption':
					Tomato_VpnPptpServer[i].innerHTML = '加密方式';
					break;
				case 'DNS Servers':
					Tomato_VpnPptpServer[i].innerHTML = 'DNS 伺服器';
					break;
				case 'WINS Servers':
					Tomato_VpnPptpServer[i].innerHTML = 'WINS 伺服器';
					break;
				case 'MTU':
					Tomato_VpnPptpServer[i].innerHTML = '最大傳輸單位 (MTU)';
					break;
				case 'MRU':
					Tomato_VpnPptpServer[i].innerHTML = '最大接收單位 (MRU)';
					break;
			}
		}
		
		Tomato_VpnPptpServer = document.getElementsByClassName('title indent1');
		Tomato_VpnPptpServer[1].innerHTML = '本地 IP 位址 / 遮罩';
		
		Tomato_VpnPptpServer = document.getElementsByTagName('b');
		for (var i = 0 ; Tomato_VpnPptpServer.length > i ; i++) {
			switch(Tomato_VpnPptpServer[i].innerHTML) {
				case 'Local IP Address/Netmask':
					Tomato_VpnPptpServer[i].innerHTML = '本地 IP 位址 / 遮罩';
					break;
				case 'Remote IP Address Range':
					Tomato_VpnPptpServer[i].innerHTML = '用戶端 IP 位址範圍';
					break;
				case 'Broadcast Relay Mode':
					Tomato_VpnPptpServer[i].innerHTML = '廣播中繼模式';
					break;
				case 'Enable Encryption':
					Tomato_VpnPptpServer[i].innerHTML = '加密方式';
					break;
				case 'DNS Servers':
					Tomato_VpnPptpServer[i].innerHTML = 'DNS 伺服器';
					break;
				case 'WINS Servers':
					Tomato_VpnPptpServer[i].innerHTML = 'WINS 伺服器';
					break;
				case 'MTU':
					Tomato_VpnPptpServer[i].innerHTML = 'MTU';
					break;
				case 'MRU':
					Tomato_VpnPptpServer[i].innerHTML = 'MRU';
					break;
			}
		}
		
		var words = {
			'Custom configuration' : '自訂設定',
			'Disabled' : '停用',
			'LAN to VPN Clients' : 'LAN 到 VPN 用戶端',
			'VPN Clients to LAN' : 'VPN 用戶端到 LAN',
			'Both' : '兩者同時啟用',
			'None' : '無',
			'Notes' : '說明',
			'Click here to hide' : '隱藏細節',
			'Click here to show' : '顯示細節',
			'Address to be used at the local end of the tunnelled PPP links between the server and the VPN clients.' : '用來連接 VPN 伺服器及用戶端之間的本地 IP 位址。',
			'Remote IP addresses to be used on the tunnelled PPP links (max 6).' : '設定分配給 VPN 用戶端的 IP 位址範圍 (最大值為 6)。',
			'Turns on broadcast relay between VPN clients and LAN interface.' : '設定在 VPN 用戶端及 LAN 介面之間的廣播中繼模式。',
			'Enabling this option will turn on VPN channel encryption, but it might lead to reduced channel bandwidth.' : '啟用此項目將會加密 VPN 通道, 但它有可能會使頻寬降低。',
			'Allows defining DNS servers manually (if none are set, the router/local IP address should be used by VPN clients).' : '允許自訂 DNS 伺服器給 VPN 用戶端使用 (如果沒有設定, VPN 用戶端應設定成使用路由器/本地 IP 位址)。',
			'Allows configuring extra WINS servers for VPN clients, in addition to the WINS server defined on' : '允許設定額外的 WINS 伺服器給 VPN 用戶端使用, 另外也可設定 WINS 伺服器在',
			'Basic/Network' : '基本設定/網路連線',
			'Maximum Transmission Unit. Max packet size the PPTP interface will be able to send without packet fragmentation.' : '最大傳輸單位。在不分割封包的情況下, PPTP 介面所能傳送的最大封包大小。',
			'Maximum Receive Unit. Max packet size the PPTP interface will be able to receive without packet fragmentation.' : '最大接收單位。在不分割封包的情況下, PPTP 介面所能接收的最大封包大小。',
			'Other relevant notes/hints' : '其他相關說明及提示',
			'Try to avoid any conflicts and/or overlaps between the address ranges configured/available for DHCP and VPN clients on your local networks.' : '請避免將分配給 VPN 用戶端的 IP 位址範圍, 設定成跟路由器 DHCP 所配發的 IP 位址範圍重疊。',
			'PPTP Online' : 'PPTP 連線狀態',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(ReplaceVpn, 200);
		setTimeout(RefreshPage, 200);
	}


	// Tomato VPN 通道的 PPTP 連線狀態頁面
	// ===============================================================
	if (TomatoPage == 'vpn-pptp-online.asp') {
		Tomato_VpnPptpOnline = document.getElementsByClassName('section-title');
		Tomato_VpnPptpOnline[0].innerHTML = 'PPTP 線上用戶列表';
		
		Tomato_VpnPptpOnline = document.getElementsByClassName('co1');
		Tomato_VpnPptpOnline[0].innerHTML = '介面';
		Tomato_VpnPptpOnline = document.getElementsByClassName('co2');
		Tomato_VpnPptpOnline[0].innerHTML = '帳號';
		Tomato_VpnPptpOnline = document.getElementsByClassName('co3');
		Tomato_VpnPptpOnline[0].innerHTML = '連線時間';
		Tomato_VpnPptpOnline = document.getElementsByClassName('co4');
		Tomato_VpnPptpOnline[0].innerHTML = '通道 IP 位址';
		Tomato_VpnPptpOnline = document.getElementsByClassName('co5');
		Tomato_VpnPptpOnline[0].innerHTML = '來源 IP 位址';
		Tomato_VpnPptpOnline = document.getElementsByClassName('co6');
		Tomato_VpnPptpOnline[0].innerHTML = '動作';
		
		var words = {
			'Configure' : '設定',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato VPN 通道的 PPTP 用戶端頁面
	// ===============================================================
	if (TomatoPage == 'vpn-pptp.asp') {
		Tomato_VpnPptp = document.getElementsByClassName('section-title');
		Tomato_VpnPptp[0].innerHTML = 'PPTP 用戶端設定';
		
		Tomato_VpnPptp = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_VpnPptp.length > i ; i++) {
			switch(Tomato_VpnPptp[i].innerHTML) {
				case 'Start with WAN':
					Tomato_VpnPptp[i].innerHTML = '與廣域網路一起啟動';
					break;
				case 'Server Address':
					Tomato_VpnPptp[i].innerHTML = '伺服器 IP 位址';
					break;
				case 'Username: ':
					Tomato_VpnPptp[i].innerHTML = '帳號:';
					break;
				case 'Password: ':
					Tomato_VpnPptp[i].innerHTML = '密碼:';
					break;
				case 'Encryption':
					Tomato_VpnPptp[i].innerHTML = '加密方式';
					break;
				case 'Stateless MPPE connection':
					Tomato_VpnPptp[i].innerHTML = '無狀態 MPPE 連線模式';
					break;
				case 'Accept DNS configuration':
					Tomato_VpnPptp[i].innerHTML = '接受 DNS 設定';
					break;
				case 'Redirect Internet traffic':
					Tomato_VpnPptp[i].innerHTML = '重新導向網際網路流量';
					break;
				case 'Remote subnet / netmask':
					Tomato_VpnPptp[i].innerHTML = '遠端子網路 / 遮罩';
					break;
				case 'Create NAT on tunnel':
					Tomato_VpnPptp[i].innerHTML = '建立通道 NAT';
					break;
				case 'MTU':
					Tomato_VpnPptp[i].innerHTML = '最大傳輸單位 (MTU)';
					break;
				case 'MRU':
					Tomato_VpnPptp[i].innerHTML = '最大接收單位 (MRU)';
					break;
				case 'Custom Configuration':
					Tomato_VpnPptp[i].innerHTML = '自訂設定';
					break;
			}
		}
		
		var words = {
			'Auto' : '自動',
			'None' : '無',
			'Maximum (128 bit only)' : '最大 (僅 128 位元)',
			'Required (128 or 40 bit)' : '視需求 (128 或 40 位元)',
			'Disabled' : '停用',
			'Yes' : '是',
			'Default' : '預設',
			'Manual' : '自訂',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的連線登入與密碼頁面
	// ===============================================================
	if (TomatoPage == 'admin-access.asp') {
		Tomato_AdminAccess = document.getElementsByClassName('section-title');
		Tomato_AdminAccess[0].innerHTML = '網頁管理介面';
		Tomato_AdminAccess[1].innerHTML = 'SSH 連線服務';
		Tomato_AdminAccess[2].innerHTML = 'Telnet 連線服務';
		Tomato_AdminAccess[3].innerHTML = '管理限制';
		Tomato_AdminAccess[4].innerHTML = '管理密碼';
		
		Tomato_AdminAccess = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminAccess.length > i ; i++) {
			switch(Tomato_AdminAccess[i].innerHTML) {
				case 'Local Access':
					Tomato_AdminAccess[i].innerHTML = '本地登入';
					break;
				case 'HTTP Port':
					Tomato_AdminAccess[i].innerHTML = 'HTTP 連接埠';
					break;
				case 'Remote Access':
					Tomato_AdminAccess[i].innerHTML = '遠端登入';
					break;
				case 'Allow Wireless Access':
					Tomato_AdminAccess[i].innerHTML = '允許無線網路登入';
					break;
				case 'Color Scheme':
					Tomato_AdminAccess[i].innerHTML = '佈景主題';
					break;
				case 'TTB ID#':
					Tomato_AdminAccess[i].innerHTML = '蕃茄主題名稱';
					break;
				case 'Open Menus':
					Tomato_AdminAccess[i].innerHTML = '固定展開的選單';
					break;
				case 'Status':
					Tomato_AdminAccess[i].innerHTML = '系統狀態';
					break;
				case 'Bandwidth':
					Tomato_AdminAccess[i].innerHTML = '頻寬監控';
					break;
				case 'IP Traffic':
					Tomato_AdminAccess[i].innerHTML = 'IP 流量監控';
					break;
				case 'Tools':
					Tomato_AdminAccess[i].innerHTML = '診斷工具';
					break;
				case 'Basic':
					Tomato_AdminAccess[i].innerHTML = '基本設定';
					break;
				case 'Advanced':
					Tomato_AdminAccess[i].innerHTML = '進階設定';
					break;
				case 'Port Forwarding':
					Tomato_AdminAccess[i].innerHTML = '連接埠轉送';
					break;
				case 'QoS':
					Tomato_AdminAccess[i].innerHTML = '網路品質管理';
					break;
				case 'VPN Tunneling':
					Tomato_AdminAccess[i].innerHTML = 'VPN 通道';
					break;
				case 'Administration':
					Tomato_AdminAccess[i].innerHTML = '路由器管理';
					break;
				case 'Enable at Startup':
					Tomato_AdminAccess[i].innerHTML = '開機自動啟用';
					break;
				case 'Extended MOTD':
					Tomato_AdminAccess[i].innerHTML = '顯示歡迎訊息';
					break;
				case 'Remote Forwarding':
					Tomato_AdminAccess[i].innerHTML = '遠端連接埠轉送';
					break;
				case 'Port':
					Tomato_AdminAccess[i].innerHTML = '連接埠';
					break;
				case 'Allow Password Login':
					Tomato_AdminAccess[i].innerHTML = '允許密碼登入';
					break;
				case 'Authorized Keys':
					Tomato_AdminAccess[i].innerHTML = '授權金鑰';
					break;
				case 'Allowed Remote<br>IP Address':
					Tomato_AdminAccess[i].innerHTML = '允許遠端登入的 IP 位址';
					break;
				case 'Limit Connection Attempts':
					Tomato_AdminAccess[i].innerHTML = '限制連線嘗試次數';
					break;
				case 'Password':
					Tomato_AdminAccess[i].innerHTML = '密碼';
					break;
			}
		}
		
		Tomato_AdminAccess = document.getElementById('_web_css').childNodes;
		for (var i = 0 ; Tomato_AdminAccess.length > i ; i++) {
			switch(Tomato_AdminAccess[i].innerHTML) {
				case 'USB Blue - OpenLinksys':
					Tomato_AdminAccess[i].innerHTML = 'USB 藍色 - OpenLinksys';
					break;
				case 'Tomato':
					Tomato_AdminAccess[i].innerHTML = 'Tomato 預設主題';
					break;
				case 'Custom (ext/custom.css)':
					Tomato_AdminAccess[i].innerHTML = '自訂樣式 (ext/custom.css)';
					break;
				case 'On-line from TTB':
					Tomato_AdminAccess[i].innerHTML = '線上主題 (TTB)';
					break;
			}
		}
		
		var words = {
			'Disabled' : '停用',
			'Theme name from' : '取得主題名稱:',
			'TTB themes gallery' : '蕃茄主題基地',
			'optional; ex: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" or "me.example.com"' : '可選填; 例如: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" 或 "me.example.com"',
			'every' : '次, 每',
			're-enter to confirm' : '請再次輸入以確認密碼',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的匿名回報頁面
	// ===============================================================
	if (TomatoPage == 'admin-tomatoanon.asp') {
		Tomato_AdminTomatoanon = document.getElementsByClassName('section-title');
		Tomato_AdminTomatoanon[0].innerHTML = '關於 TomatoAnon 計劃';
		Tomato_AdminTomatoanon[2].innerHTML = 'Tomato 版本更新通知';
		
		Tomato_AdminTomatoanon = document.getElementsByClassName('about');
		Tomato_AdminTomatoanon[0].innerHTML = '<b>大家好,</b><br><br>我想向大家介紹一個我一直在推動的新計劃 - TomatoAnon。<br>這個 TomatoAnon 腳本會將你使用的路由器型號及所安裝的 Tomato 版本等資訊上傳至網路資料庫。<br>這些資訊完全是匿名蒐集, 而且僅是做為統計用途。<br><b>這個腳本並不會傳送任何私人的資訊 (例如 MAC 或 IP 等資訊)!</b><br>這個腳本是以 bash 所寫的, 並且完全公開原始碼, 任何人都可以檢視哪些資訊會被傳送至資料庫。<br><br>你可以到  <a href=http://tomato.groov.pl/tomatoanon.php target=_blanc><b>http://tomato.groov.pl/tomatoanon.php</b></a> 頁面查看統計結果。<br>這些資訊可以在你要選購路由器時, 幫助你了解在你的國家裡, 哪些路由器是最好、最受歡迎的選擇。<br>你也可以藉此了解哪一個 Tomato 版本最常被使用及哪一個版本最為穩定。<br><br>如果你不同意或不希望執行這個腳本, 你可以把這個功能關閉。<br>你也可以隨時再啟用這個功能。<br><br>TomatoAnon 蒐集的資訊如下：:<br>- WAN+LAN MAC 位址的 MD5SUM 運算碼 - 這將用來做為每台路由器的識別碼 (例如: 1c1dbd4202d794251ec1acf1211bb2c8)。<br>- 路由器型號 (例如: Asus RT-N66U)。<br>- Tomato 安裝版本 (例如: 102 K26 USB)。<br>- Tomato 建構類型 (例如: Mega-VPN-64K)。<br>- 路由器運作時間 (例如: 3 days)。<br>以上!!<br><br>謝謝你的閱讀, 請作出正確的選擇以協助這個計劃的推動。<br><br><b>此致最高敬意!</b></font>';
		
		Tomato_AdminTomatoanon = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminTomatoanon.length > i ; i++) {
			switch(Tomato_AdminTomatoanon[i].innerHTML) {
				case 'Do you know what TomatoAnon doing ?':
					Tomato_AdminTomatoanon[i].innerHTML = '你已知道 TomatoAnon 的作用了嗎?';
					break;
				case 'Do you want enable TomatoAnon ?':
					Tomato_AdminTomatoanon[i].innerHTML = '你要啟用 TomatoAnon 嗎?';
					break;
				case 'Send every':
					Tomato_AdminTomatoanon[i].innerHTML = '傳送資料間隔時間';
					break;
				case 'Enable':
					Tomato_AdminTomatoanon[i].innerHTML = '啟用';
					break;
			}
		}
		
		var words = {
			'TomatoAnon Settings' : 'TomatoAnon 設定',
			'Checkout my router' : '查看我的路由器',
			'No, i don`t. Have to read all information, before i will make a choice' : '不, 請等我閱讀過所有資訊後再做決定',
			'Yes, i do and want to make a choice' : '是的, 我已知道並且將做一個選擇',
			'I`m not sure right now' : '我目前還不能決定',
			'Yes, i`m sure i do' : '是的, 我已確定要啟用',
			'No, i definitely wont enable it' : '不, 我絕對不會啟用它',
			'hours (range: 1 - 12; default: 6)' : '小時 (範圍: 1 - 12; 預設值: 6)',
			'When new tomato version will be available, you will be notified about this on status-overview page.' : '當有新的 Tomato 版本推出時, 你將在系統狀態頁面收到更新通知。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的頻寬監控頁面
	// ===============================================================
	if (TomatoPage == 'admin-bwm.asp') {
		Tomato_AdminBwm = document.getElementsByClassName('section-title');
		Tomato_AdminBwm[0].innerHTML = '頻寬監控設定';
		Tomato_AdminBwm[1].innerHTML = '備份頻寬監控記錄';
		Tomato_AdminBwm[2].innerHTML = '還原頻寬監控記錄';
		
		Tomato_AdminBwm = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminBwm.length > i ; i++) {
			switch(Tomato_AdminBwm[i].innerHTML) {
				case 'Enable':
					Tomato_AdminBwm[i].innerHTML = '啟用';
					break;
				case 'Save History Location':
					Tomato_AdminBwm[i].innerHTML = '儲存歷史記錄位置';
					break;
				case 'Save Frequency':
					Tomato_AdminBwm[i].innerHTML = '儲存頻率';
					break;
				case 'Save On Shutdown':
					Tomato_AdminBwm[i].innerHTML = '關機自動儲存';
					break;
				case 'Create New File<br><small>(Reset Data)</small>':
					Tomato_AdminBwm[i].innerHTML = '建立新檔 (重置資料)';
					break;
				case 'Create Backups':
					Tomato_AdminBwm[i].innerHTML = '建立備份';
					break;
				case 'First Day Of The Month':
					Tomato_AdminBwm[i].innerHTML = '每月首日';
					break;
				case 'Excluded Interfaces':
					Tomato_AdminBwm[i].innerHTML = '要排除的網路介面';
					break;
			}
		}
		
		var words = {
			'RAM (Temporary)' : 'RAM (暫存)',
			'Custom Path' : '自訂路徑',
			'Every Hour' : '每小時',
			'Every Week' : '每週',
			'Every' : '每',
			'Hours' : '小時',
			'Days' : '天',
			'comma separated list' : '請以逗號分隔網路介面名稱',
			'Link' : '下載記錄',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的 IP 流量監控頁面
	// ===============================================================
	if (TomatoPage == 'admin-iptraffic.asp') {
		Tomato_AdminIptraffic = document.getElementsByClassName('section-title');
		Tomato_AdminIptraffic[0].innerHTML = 'IP 流量監控設定';
		Tomato_AdminIptraffic[1].innerHTML = '備份流量監控記錄';
		Tomato_AdminIptraffic[2].innerHTML = '還原流量監控記錄';
		
		Tomato_AdminIptraffic = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminIptraffic.length > i ; i++) {
			switch(Tomato_AdminIptraffic[i].innerHTML) {
				case 'Enable':
					Tomato_AdminIptraffic[i].innerHTML = '啟用';
					break;
				case 'Save History Location':
					Tomato_AdminIptraffic[i].innerHTML = '儲存歷史記錄位置';
					break;
				case 'Save Frequency':
					Tomato_AdminIptraffic[i].innerHTML = '儲存頻率';
					break;
				case 'Save On Shutdown':
					Tomato_AdminIptraffic[i].innerHTML = '關機自動儲存';
					break;
				case 'Create New File<br><small>(Reset Data)</small>':
					Tomato_AdminIptraffic[i].innerHTML = '建立新檔 (重置資料)';
					break;
				case 'Create Backups':
					Tomato_AdminIptraffic[i].innerHTML = '建立備份';
					break;
				case 'First Day Of The Month':
					Tomato_AdminIptraffic[i].innerHTML = '每月首日';
					break;
				case 'Excluded IPs':
					Tomato_AdminIptraffic[i].innerHTML = '要排除的 IP 位址';
					break;
				case 'Included IPs':
					Tomato_AdminIptraffic[i].innerHTML = '要監控的 IP 位址';
					break;
				case 'Enable Auto-Discovery':
					Tomato_AdminIptraffic[i].innerHTML = '啟用自動監控';
					break;
				case 'Labels on graphics':
					Tomato_AdminIptraffic[i].innerHTML = '圖表標籤內容';
					break;
			}
		}
		
		var words = {
			'RAM (Temporary)' : 'RAM (暫存)',
			'Custom Path' : '自訂路徑',
			'Every Hour' : '每小時',
			'Every Week' : '每週',
			'Every' : '每',
			'Hours' : '小時',
			'Days' : '天',
			'comma separated list' : '請以逗號分隔 IP 位址',
			'Link' : '下載記錄',
			'automatically include new IPs in monitoring as soon as any traffic is detected' : '自動監控有網路流量的新 IP 位址',
			'Show known hostnames and IPs' : '顯示已知主機名稱及 IP 位址',
			'Prefer to show only known hostnames, otherwise show IPs' : '優先顯示已知主機名稱, 其它則顯示 IP 位址',
			'Show only IPs' : '僅顯示 IP 位址',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的按鈕 / 燈號頁面
	// ===============================================================
	if (TomatoPage == 'admin-buttons.asp') {
		var words = {
			'This feature is not supported on this router.' : '這台路由器不支援此功能。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的網路芳鄰掛載頁面
	// ===============================================================
	if (TomatoPage == 'admin-cifs.asp') {
		Tomato_AdminCifs = document.getElementsByClassName('section-title');
		Tomato_AdminCifs[0].innerHTML = '網路芳鄰掛載設定 (CIFS Client)';

		Tomato_AdminCifs = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminCifs.length > i ; i++) {
			switch(Tomato_AdminCifs[i].innerHTML) {
				case 'Enable':
					Tomato_AdminCifs[i].innerHTML = '啟用';
					break;
				case 'UNC':
					Tomato_AdminCifs[i].innerHTML = 'UNC 路徑';
					break;
				case 'Netbios Name':
					Tomato_AdminCifs[i].innerHTML = 'Netbios 名稱';
					break;
				case 'Username':
					Tomato_AdminCifs[i].innerHTML = '使用者名稱';
					break;
				case 'Password':
					Tomato_AdminCifs[i].innerHTML = '密碼';
					break;
				case 'Domain':
					Tomato_AdminCifs[i].innerHTML = '網域';
					break;
				case 'Execute When Mounted':
					Tomato_AdminCifs[i].innerHTML = '掛載後執行';
					break;
				case 'Security':
					Tomato_AdminCifs[i].innerHTML = '安全性等級';
					break;
			}
		}
		
		var words = {
			'Total / Free Size' : '總容量 / 可用空間',
			'Default (NTLM)' : '預設 (NTLM)',
			'NTLM and packet signing' : 'NTLM 及封包簽章',
			'NTLMv2 and packet signing' : 'NTLMv2 及封包簽章',
			'None' : '無',
			'not mounted' : '尚未掛載',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的路由器設定值頁面
	// ===============================================================
	if (TomatoPage == 'admin-config.asp') {
		Tomato_AdminConfig = document.getElementsByClassName('section-title');
		Tomato_AdminConfig[0].innerHTML = '備份路由器設定值';
		Tomato_AdminConfig[1].innerHTML = '還原路由器設定值';
		Tomato_AdminConfig[2].innerHTML = '恢復預設值';
		
		Tomato_AdminConfig = document.getElementsByClassName('title indent1');
		Tomato_AdminConfig[0].innerHTML = '總計/可用 NVRAM';
		
		var words = {
			'Link' : '下載設定檔',
			'Select the configuration file to restore:' : '請選擇所要還原的設定檔:',
			'Select...' : '請選擇...',
			'Restore default router settings (normal)' : '恢復 Tomato 預設值 (標準)',
			'Erase all data in NVRAM memory (thorough)' : '清除 NVRAM 全部資料 (徹底)',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的路由器除錯頁面
	// ===============================================================
	if (TomatoPage == 'admin-debug.asp') {
		Tomato_AdminDebug = document.getElementsByClassName('section-title');
		Tomato_AdminDebug[0].innerHTML = '路由器除錯設定';
		
		Tomato_AdminDebug = document.getElementsByClassName('title indent1');
		for (var i = 0 ; Tomato_AdminDebug.length > i ; i++) {
			Tomato_AdminDebug[i].style.width = '240px';
		}

		Tomato_AdminDebug = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminDebug.length > i ; i++) {
			switch(Tomato_AdminDebug[i].innerHTML) {
				case 'Avoid performing an NVRAM commit':
					Tomato_AdminDebug[i].innerHTML = '避免執行寫入 NVRAM';
					break;
				case 'Enable cprintf output to console':
					Tomato_AdminDebug[i].innerHTML = '啟用 cprintf 輸出至主控台';
					break;
				case 'Enable cprintf output to /tmp/cprintf':
					Tomato_AdminDebug[i].innerHTML = '啟用 cprintf 輸出至 /tmp/cprintf';
					break;
				case 'Enable DDNS output to /tmp/mdu-*':
					Tomato_AdminDebug[i].innerHTML = '啟用 DDNS 輸出至 /tmp/mdu-*';
					break;
				case 'Count cache memory and buffers as free memory':
					Tomato_AdminDebug[i].innerHTML = '將快取記憶體及緩衝區列入可用記憶體';
					break;
				case 'Avoid displaying LAN to router connections':
					Tomato_AdminDebug[i].innerHTML = '避免顯示從 LAN 到路由器的連線';
					break;
				case 'Console log level':
					Tomato_AdminDebug[i].innerHTML = '主控台日誌記錄層級';
					break;
				case 'Do not restart the following process if they die':
					Tomato_AdminDebug[i].innerHTML = '當下列程序消失時不要重新啟動';
					break;
			}
		}
		
		var words = {
			'Clear Cookies' : '清除 Cookies',
			'NVRAM Commit' : '寫入 NVRAM',
			'Reboot' : '重新開機',
			'Shutdown' : '關機',
			'Download CFE' : '下載 CFE',
			'Download Iptables Dump' : '下載 Iptables 傾印檔',
			'Download Ip6tables Dump' : '下載 Ip6tables 傾印檔',
			'Download Logs' : '下載日誌記錄檔',
			'Download NVRAM Dump' : '下載 NVRAM 傾印檔',
			'Warning' : '警告',
			'The NVRAM Dump text file may contain information like wireless' : 'NVRAM 傾印文件檔包含重要的個人資訊,',
			'encryption keys and usernames/passwords for the router, ISP and DDNS. Please' : '例如無線金鑰, ISP 及 DDNS 的帳號/密碼...等。',
			'review & edit this file before sharing it with' : '請先檢視並編輯這個檔案, 將重要的個人資訊清除後再交予他人。',
			'anyone.' : '',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的 JFFS 支援頁面
	// ===============================================================
	if (TomatoPage == 'admin-jffs2.asp') {
		Tomato_AdminJffs2 = document.getElementsByClassName('section-title');
		Tomato_AdminJffs2[0].innerHTML = 'JFFS 設定';
		
		Tomato_AdminJffs2 = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminJffs2.length > i ; i++) {
			switch(Tomato_AdminJffs2[i].innerHTML) {
				case 'Enable':
					Tomato_AdminJffs2[i].innerHTML = '啟用';
					break;
				case 'Execute When Mounted':
					Tomato_AdminJffs2[i].innerHTML = '掛載後執行';
					break;
			}
		}
		
		var words = {
			'Total / Free Size' : '總容量 / 可用空間',
			'not mounted' : '尚未掛載',
			'Loaded' : '載入完成',
			'Formatted' : '格式化完成',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的 NFS 伺服器頁面
	// ===============================================================
	if (TomatoPage == 'admin-nfs.asp') {
		Tomato_AdminNfs = document.getElementsByClassName('section-title');
		Tomato_AdminNfs[0].innerHTML = 'NFS 伺服器';
		Tomato_AdminNfs[1].innerHTML = '共享設定';
		Tomato_AdminNfs[2].innerHTML = 'NFS 用戶端';
		
		Tomato_AdminNfs = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminNfs.length > i ; i++) {
			switch(Tomato_AdminNfs[i].innerHTML) {
				case 'Enable NFS Server':
					Tomato_AdminNfs[i].innerHTML = '啟用 NFS 伺服器';
					break;
			}
		}
		
		Tomato_AdminNfs = document.getElementsByClassName('co1');
		Tomato_AdminNfs[0].innerHTML = '目錄';
		Tomato_AdminNfs = document.getElementsByClassName('co2');
		Tomato_AdminNfs[0].innerHTML = 'IP 位址 / 子網路';
		Tomato_AdminNfs = document.getElementsByClassName('co3');
		Tomato_AdminNfs[0].innerHTML = '存取權限';
		Tomato_AdminNfs = document.getElementsByClassName('co4');
		Tomato_AdminNfs[0].innerHTML = '同步';
		Tomato_AdminNfs = document.getElementsByClassName('co5');
		Tomato_AdminNfs[0].innerHTML = '子目錄檢查';
		Tomato_AdminNfs = document.getElementsByClassName('co6');
		Tomato_AdminNfs[0].innerHTML = '其他選項';
		
		Tomato_AdminNfs = document.getElementById('_[object HTMLTableElement]_4').childNodes;
		for (var i = 0 ; Tomato_AdminNfs.length > i ; i++) {
			switch(Tomato_AdminNfs[i].innerHTML) {
				case 'Yes':
					Tomato_AdminNfs[i].innerHTML = '是';
					break;
				case 'No':
					Tomato_AdminNfs[i].innerHTML = '否';
					break;
			}
		}
		
		Tomato_AdminNfs = document.getElementById('_[object HTMLTableElement]_5').childNodes;
		for (var i = 0 ; Tomato_AdminNfs.length > i ; i++) {
			switch(Tomato_AdminNfs[i].innerHTML) {
				case 'Yes':
					Tomato_AdminNfs[i].innerHTML = '是';
					break;
				case 'No':
					Tomato_AdminNfs[i].innerHTML = '否';
					break;
			}
		}
		
		var words = {
			'Read/Write' : '讀/寫',
			'Read only' : '唯讀',
			'You can find more information on proper NFS configuration at the following website' : '你可以在下列網站找到更多 NFS 設定的相關資訊',
			'If you want to mount an NFS share from other NFS Server, you can use the mount.nfs tool via telnet/ssh.' : '如果你想要掛載其它 NFS 伺服器的共享資源, 你可以透過 telnet/ssh 使用 mount.nfs 工具來掛載。',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的簡易網管協定頁面
	// ===============================================================
	if (TomatoPage == 'admin-snmp.asp') {
		Tomato_AdminSnmp = document.getElementsByClassName('section-title');
		Tomato_AdminSnmp[0].innerHTML = '簡易網管協定設定 (SNMP Settings)';
		
		Tomato_AdminSnmp = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminSnmp.length > i ; i++) {
			switch(Tomato_AdminSnmp[i].innerHTML) {
				case 'Enable SNMP':
					Tomato_AdminSnmp[i].innerHTML = '啟用簡易網管協定';
					break;
				case 'Port':
					Tomato_AdminSnmp[i].innerHTML = '連接埠';
					break;
				case 'Remote access':
					Tomato_AdminSnmp[i].innerHTML = '遠端存取';
					break;
				case 'Allowed Remote<br>IP Address':
					Tomato_AdminSnmp[i].innerHTML = '允許遠端存取的 IP 位址';
					break;
				case 'Location':
					Tomato_AdminSnmp[i].innerHTML = '實體位置';
					break;
				case 'Contact':
					Tomato_AdminSnmp[i].innerHTML = '聯絡人';
					break;
				case 'RO Community':
					Tomato_AdminSnmp[i].innerHTML = '唯讀社群';
					break;
			}
		}
		
		var words = {
			'optional; ex: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" or "me.example.com"' : '可選填; 例如: "1.1.1.1", "1.1.1.0/24", "1.1.1.1 - 2.2.2.2" 或 "me.example.com"',
			// 自動更新
			'Auto Refresh' : '自動更新',
			'seconds' : '秒',
			'minutes' : '分鐘',
			'minute' : '分鐘',
			'Please wait...' : '請等待...',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的系統日誌頁面
	// ===============================================================
	if (TomatoPage == 'admin-log.asp') {
		Tomato_AdminLog = document.getElementsByClassName('section-title');
		Tomato_AdminLog[0].innerHTML = '系統日誌設定';
		Tomato_AdminLog[1].innerHTML = '網站監控設定';
		
		Tomato_AdminLog = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminLog.length > i ; i++) {
			switch(Tomato_AdminLog[i].innerHTML) {
				case 'Log Internally':
					Tomato_AdminLog[i].innerHTML = '記錄系統日誌';
					break;
				case 'Max size before rotate':
					Tomato_AdminLog[i].innerHTML = '最大覆寫空間';
					break;
				case 'Number of rotated logs to keep':
					Tomato_AdminLog[i].innerHTML = '保留覆寫日誌數量';
					break;
				case 'Custom Log File Path':
					Tomato_AdminLog[i].innerHTML = '自訂日誌檔案路徑';
					break;
				case 'Log To Remote System':
					Tomato_AdminLog[i].innerHTML = '記錄至遠端系統';
					break;
				case 'Host or IP Address / Port':
					Tomato_AdminLog[i].innerHTML = '主機名或 IP 位址 / 連接埠';
					break;
				case 'Generate Marker':
					Tomato_AdminLog[i].innerHTML = '產生間隔標記';
					break;
				case 'Access Restriction':
					Tomato_AdminLog[i].innerHTML = '連線管制';
					break;
				case 'Cron':
					Tomato_AdminLog[i].innerHTML = '週期指令';
					break;
				case 'DHCP Client':
					Tomato_AdminLog[i].innerHTML = 'DHCP 用戶連線';
					break;
				case 'NTP':
					Tomato_AdminLog[i].innerHTML = 'NTP 網路校時';
					break;
				case 'Scheduler':
					Tomato_AdminLog[i].innerHTML = '定時作業';
					break;
				case 'Connection Logging':
					Tomato_AdminLog[i].innerHTML = '記錄連線項目';
					break;
				case 'Inbound':
					Tomato_AdminLog[i].innerHTML = '下載連線';
					break;
				case 'Outbound':
					Tomato_AdminLog[i].innerHTML = '上傳連線';
					break;
				case 'Limit':
					Tomato_AdminLog[i].innerHTML = '記錄限制';
					break;
				case 'Monitor Web Usage':
					Tomato_AdminLog[i].innerHTML = '監控網站瀏覽記錄';
					break;
				case 'Monitor':
					Tomato_AdminLog[i].innerHTML = '監控對象';
					break;
				case 'IP Address(es)':
					Tomato_AdminLog[i].innerHTML = 'IP 位址';
					break;
				case 'Number of Entries to remember':
					Tomato_AdminLog[i].innerHTML = '記錄限制';
					break;
				case 'Domains':
					Tomato_AdminLog[i].innerHTML = '造訪網站';
					break;
				case 'Searches':
					Tomato_AdminLog[i].innerHTML = '搜尋網站';
					break;
				case 'Daily Backup':
					Tomato_AdminLog[i].innerHTML = '每日備份';
					break;
				case 'Clear Data After Backup':
					Tomato_AdminLog[i].innerHTML = '備份後清除資料';
					break;
				case 'Backup Directory':
					Tomato_AdminLog[i].innerHTML = '備份目錄';
					break;
			}
		}
		
		Tomato_AdminLog = document.getElementsByClassName('title indent1');
		for (var i = 0 ; Tomato_AdminLog.length > i ; i++) {
			switch(Tomato_AdminLog[i].innerHTML) {
				case 'Events Logged':
					Tomato_AdminLog[i].innerHTML = '記錄事件項目';
					break;
			}
		}
		
		var words = {
			'make sure the directory exists and is writable' : '請確認目錄是否存在及擁有寫入權限',
			'Every' : '每',
			'Minutes' : '分鐘',
			'Hours' : '小時',
			'Hour' : '小時',
			'Days' : '天',
			'Day' : '天',
			'some of the changes will take effect after a restart' : '變更某些事件紀錄項目需重新開機才有效',
			'Disabled (recommended)' : '停用 (建議)',
			'Disabled' : '停用',
			'If Blocked By Firewall' : '被防火牆拒絕的連線',
			'If Allowed By Firewall' : '被防火牆允許的連線',
			'Both' : '兩者同時記錄',
			'messages per minute / 0 for unlimited' : '每分鐘訊息數量 / 0 為不限制',
			'All Computers / Devices' : '所有的電腦 / 裝置',
			'The Following...' : '以下列表...',
			'All Except...' : '排除以下列表...',
			'ex: "1.1.1.1", "1.1.1.0/24" or "1.1.1.1 - 2.2.2.2"' : '例如: "1.1.1.1", "1.1.1.0/24" 或 "1.1.1.1 - 2.2.2.2"',
			'0 to disable' : '0 為停用',
			'every day at midnight' : '每日午夜',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的定時作業頁面
	// ===============================================================
	if (TomatoPage == 'admin-sched.asp') {
		Tomato_AdminSched = document.getElementsByClassName('section-title');
		Tomato_AdminSched[0].innerHTML = '重新開機';
		Tomato_AdminSched[1].innerHTML = '重新連線';
		Tomato_AdminSched[2].innerHTML = '自訂作業 1';
		Tomato_AdminSched[3].innerHTML = '自訂作業 2';
		Tomato_AdminSched[4].innerHTML = '自訂作業 3';
		Tomato_AdminSched[5].innerHTML = '自訂作業 4';
		Tomato_AdminSched[6].innerHTML = '自訂作業 5';
		
		Tomato_AdminSched = document.getElementsByTagName('label');
		for (var i = 0 ; Tomato_AdminSched.length > i ; i++) {
			switch(Tomato_AdminSched[i].innerHTML) {
				case 'Enabled':
					Tomato_AdminSched[i].innerHTML = '啟用';
					break;
				case 'Time':
					Tomato_AdminSched[i].innerHTML = '時間';
					break;
				case 'Days':
					Tomato_AdminSched[i].innerHTML = '天數';
					break;
				case 'Command':
					Tomato_AdminSched[i].innerHTML = '指令';
					break;
			}
		}
		
		var words = {
			'make sure the directory exists and is writable' : '請確認目錄是否存在及擁有寫入權限',
			'Everyday' : '每天',
			'Every hour' : '每小時',
			'Every minute' : '每分鐘',
			'Every...' : '自訂間隔時間...',
			'Every' : '每',
			'minutes' : '分鐘',
			'hours' : '小時',
			'days' : '天',
			'Sun' : '週日',
			'Mon' : '週一',
			'Tue' : '週二',
			'Wed' : '週三',
			'Thu' : '週四',
			'Fri' : '週五',
			'Sat' : '週六',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的系統指令頁面
	// ===============================================================
	if (TomatoPage == 'admin-scripts.asp') {
		Tomato_AdminScripts = document.getElementsByTagName('a');
		for (var i = 0 ; Tomato_AdminScripts.length > i ; i++) {
			switch(Tomato_AdminScripts[i].innerHTML) {
				case 'Init':
					Tomato_AdminScripts[i].innerHTML = '開機起始時';
					break;
				case 'Shutdown':
					Tomato_AdminScripts[i].innerHTML = '關機停止前';
					break;
				case 'Firewall':
					Tomato_AdminScripts[i].innerHTML = '防火牆啟動時';
					break;
				case 'WAN Up':
					Tomato_AdminScripts[i].innerHTML = '廣域網路連線後';
					break;
			}
		}
		
		var words = {
			'Word Wrap' : '自動斷行',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 路由器管理的韌體升級頁面
	// ===============================================================
	if (TomatoPage == 'admin-upgrade.asp') {
		Tomato_AdminUpgrade = document.getElementsByClassName('section-title');
		Tomato_AdminUpgrade[0].innerHTML = '韌體升級';
		
		var words = {
			'Cannot upgrade if JFFS is enabled.' : 'JFFS 啟用時無法更新韌體。',
			'An upgrade may overwrite the JFFS partition currently in use. Before upgrading,' : '韌體升級時會覆寫目前使用中的 JFFS 分區。所以在升級前,',
			'please backup the contents of the JFFS partition, disable it, then reboot the router.' : '請先備份 JFFS 分區裡的資料, 然後將 JFFS 關閉並將路由器重新開機。',
			'Disable' : '停用',
			'Select the file to use:' : '請選擇所要升級的韌體檔案',
			'After flashing, erase all data in NVRAM memory' : '升級完成後, 清除 NVRAM 全部資料',
			'Current Version' : '目前版本',
			'Free Memory' : '可用記憶體',
			'aprox. size that can be buffered completely in RAM' : '容量應可完整地將韌體升級緩衝在記憶體裡執行',
			'Please wait while the firmware is uploaded & flashed.' : '請等待, 直到韌體上傳完畢並升級完成。',
			'Warning:' : '警告:',
			'Do not interrupt this browser or the router!' : '請勿中斷瀏覽器或關閉路由器電源!',
		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// Tomato 關於 Tomato 頁面
	// ===============================================================
	if (TomatoPage == 'about.asp') {
		var words = {
			'Tomato Firmware' : 'Tomato 韌體',
			'IPv6 support' : 'IPv6 支援',
			'Linux kernel' : 'Linux 核心',
			'and Broadcom Wireless Driver' : '及 Broadcom 無線驅動',
			'updates' : '更新',
			'support for additional router models, dual-band and Wireless-N mode.' : '支援更多路由器型號, 無線雙頻及無線 N 模式。',
			'Copyright (C)' : '版權所有 ©',
			'OpenVPN integration and GUI,' : 'OpenVPN 整合及使用者介面:',
			'features:' : '提供的功能:',
			'feature:' : '提供的功能:',
			'Features:' : '提供的功能:',
			'NFS utils integration and GUI' : 'NFS 工具整合及使用者介面',
			'Custom log file path' : '自訂日誌檔案路徑',
			'SD-idle tool integration for kernel 2.6' : 'Linux 核心 2.6 版的 SD-idle 工具整合',
			'SNMP integration and GUI' : '簡易網管協定整合及使用者介面 (SNMP)',
			'DNScrypt-proxy 1.0 integration and GUI' : 'DNS 加密代理 1.0 整合及使用者介面 (DNScrypt-proxy)',
			'TOR Project integration and GUI' : '洋蔥路由整合及使用者介面 (TOR Project)',
			'TomatoAnon project integration and GUI' : '匿名回報整合及使用者介面 (TomatoAnon Project)',
			'TomatoThemeBase project integration and GUI' : '蕃茄線上主題整合及使用者介面 (TomatoThemeBase project)',
			'Ethernet Ports State' : '乙太網路埠口狀態',
			'Extended MOTD (written by @Monter, modified by @Shibby)' : '擴展版今日訊息 (Extended MOTD, 作者: @Monter, 修改: @Shibby)',
			'Webmon Backup Script' : '網站監控備份腳本',
			'OpenVPN enhancements & username/password only authentication' : 'OpenVPN 增強 & 僅用帳號 / 密碼認證',
			'PPTP VPN Client integration and GUI' : 'PPTP VPN 用戶端整合及使用者介面',
			'Openvpn username/password verify feature and configure GUI.' : 'OpenVPN 帳號 / 密碼驗證功能及設定的使用者介面',
			'Extended Sysinfo' : '擴展系統資訊功能',
			'Captive Portal. (Based in NocatSplash)' : '網頁認證功能 (基於 NocatSplash)',
			'QOS-detailed & ctrate filters' : 'QoS 連線列表 & 傳輸速率過濾功能',
			'Realtime bandwidth monitoring of LAN clients' : '網路介面的即時頻寬監控功能',
			'Static ARP binding' : '靜態 ARP 綁定功能',
			'VLAN administration GUI' : '虛擬區域網路管理的使用者介面 (VLAN)',
			'Multiple LAN support integration and GUI' : '多重區域網路支援整合及使用者介面 (Multiple LAN)',
			'Multiple/virtual SSID support (experimental)' : '多重 / 虛擬 SSID 支援 (尚在研究)',
			'UDPxy integration and GUI' : 'UDPxy 整合及使用者介面',
			'PPTP Server integration and GUI' : 'PPTP 伺服器整合及使用者介面',
			'Configurable QOS class names' : '設定 QoS 分級名稱功能',
			'Comprehensive QOS rule examples set by default' : '預設的 QoS 分級管制規則範例',
			'TC-ATM overhead calculation - patch by tvlz' : 'TC-ATM 覆改值計算 - 升級: tvlz',
			'GPT support for HDD by Yaniv Hamo' : '支援使用 GPT 分割表的硬碟, 作者: Yaniv Hamo',
			'Tools-System refresh timer' : '系統更新計時器工具',
			'IMQ based QOS Ingress' : '基於 IMQ 的 QoS 入口',
			'Incoming Class Bandwidth pie chart' : '下載的頻寬分佈圖',
			'Revised IP/MAC Bandwidth Limiter' : '修訂 IP/MAC 頻寬限制',
			'Based on' : '基於',
			'Built on' : '建立在',
			'Thanks to everyone who risked their routers, tested, reported bugs, made' : '感謝冒險提供路由器, 幫忙測試, 回報錯誤,',
			'suggestions and contributed to this project.' : '提供建議及對這個計劃有貢獻的每個人。',
	

		};
		Replaceword();
		setTimeout(RefreshPage, 200);
	}


	// 等待 VPN 通道的相關頁面資料建立後再行取代文字
	// ===============================================================
	function ReplaceVpn() {
		switch(TomatoPage) {
			case 'vpn-pptp-server.asp':
				Tomato_Ipt = document.getElementsByClassName('co1');
				Tomato_Ipt[0].innerHTML = '帳號';
				Tomato_Ipt = document.getElementsByClassName('co2');
				Tomato_Ipt[0].innerHTML = '密碼';
				break;
		}
	}


	// 等待網路品質管理相關頁面資料建立後再行取代文字
	// ===============================================================
	function ReplaceQos() {
		switch(TomatoPage) {
			case 'qos-detailed.asp':
				Tomato_Qos = document.getElementsByClassName('co1');
				Tomato_Qos[0].innerHTML = '通訊協定';
				Tomato_Qos = document.getElementsByClassName('co2');
				Tomato_Qos[0].innerHTML = '來源位址';
				Tomato_Qos = document.getElementsByClassName('co3');
				Tomato_Qos[0].innerHTML = '來源埠口';
				Tomato_Qos = document.getElementsByClassName('co4');
				Tomato_Qos[0].innerHTML = '目的位址';
				Tomato_Qos = document.getElementsByClassName('co5');
				Tomato_Qos[0].innerHTML = '目的埠口';
				
				Tomato_Qos = document.getElementsByClassName('co6');
				for (var i = 0 ; Tomato_Qos.length > i ; i++) {
					switch(Tomato_Qos[i].innerHTML) {
						case 'Class':
							Tomato_Qos[i].innerHTML = '級別';
							break;
						case 'Unclassified':
							Tomato_Qos[i].innerHTML = '未有級別';
							break;
						case 'Service':
							Tomato_Qos[i].innerHTML = '網路服務';
							break;
						case 'VOIP/Game':
							Tomato_Qos[i].innerHTML = '網路電話<br>網路遊戲';
							break;
						case 'Media':
							Tomato_Qos[i].innerHTML = '網路多媒體';
							break;
						case 'Remote':
							Tomato_Qos[i].innerHTML = '遠端連線';
							break;
						case 'WWW':
							Tomato_Qos[i].innerHTML = '網頁';
							break;
						case 'Mail':
							Tomato_Qos[i].innerHTML = '電子郵件';
							break;
						case 'Messenger':
							Tomato_Qos[i].innerHTML = '即時通訊';
							break;
						case 'FileXfer':
							Tomato_Qos[i].innerHTML = '檔案傳輸';
							break;
						case 'P2P/Bulk':
							Tomato_Qos[i].innerHTML = 'P2P 傳輸<br>大量傳輸';
							break;
						case 'Crawl':
							Tomato_Qos[i].innerHTML = '其它/限速';
							break;
					}
				}
		
				Tomato_Qos = document.getElementsByClassName('co7');
				Tomato_Qos[0].innerHTML = '規則';
				Tomato_Qos = document.getElementsByClassName('co8');
				Tomato_Qos[0].innerHTML = '上傳位元組';
				Tomato_Qos = document.getElementsByClassName('co9');
				Tomato_Qos[0].innerHTML = '下載位元組';
				
				Tomato_Qos = document.getElementsByClassName('co7');
				for (var i = 0 ; Tomato_Qos.length > i ; i++) {
					Tomato_Qos[i].style.width = '22px';
				}
				break;
			case 'qos-ctrate.asp':
				Tomato_Qos = document.getElementsByClassName('co1');
				Tomato_Qos[0].innerHTML = '通訊協定';
				Tomato_Qos = document.getElementsByClassName('co2');
				Tomato_Qos[0].innerHTML = '來源位址';
				Tomato_Qos = document.getElementsByClassName('co3');
				Tomato_Qos[0].innerHTML = '來源埠口';
				Tomato_Qos = document.getElementsByClassName('co4');
				Tomato_Qos[0].innerHTML = '目的位址';
				Tomato_Qos = document.getElementsByClassName('co5');
				Tomato_Qos[0].innerHTML = '目的埠口';
				Tomato_Qos = document.getElementsByClassName('co6');
				Tomato_Qos[0].innerHTML = '上傳速率';
				Tomato_Qos = document.getElementsByClassName('co7');
				Tomato_Qos[0].innerHTML = '下載速率';
				break;
		}
	}

	// 等待進階設定相關頁面資料建立後再行取代文字
	// ===============================================================
	function ReplaceAdvanced() {
		switch(TomatoPage) {
			case 'advanced-access.asp':
				Tomato_Advanced = document.getElementsByClassName('co1');
				Tomato_Advanced[0].innerHTML = '啟用';
				Tomato_Advanced = document.getElementsByClassName('co2');
				Tomato_Advanced[0].innerHTML = '來源';
				Tomato_Advanced = document.getElementsByClassName('co3');
				Tomato_Advanced[0].innerHTML = '來源位址';
				Tomato_Advanced = document.getElementsByClassName('co4');
				Tomato_Advanced[0].innerHTML = '目的';
				Tomato_Advanced = document.getElementsByClassName('co5');
				Tomato_Advanced[0].innerHTML = '目的位址';
				Tomato_Advanced = document.getElementsByClassName('co6');
				Tomato_Advanced[0].innerHTML = '註解';
				break;
			case 'advanced-wlanvifs.asp':
				Tomato_Advanced = document.getElementsByClassName('co1');
				Tomato_Advanced[0].innerHTML = '介面';
				Tomato_Advanced = document.getElementsByClassName('co2');
				Tomato_Advanced[0].innerHTML = '啟用';
				Tomato_Advanced = document.getElementsByClassName('co3');
				Tomato_Advanced[0].innerHTML = '無線名稱 (SSID)';
				Tomato_Advanced = document.getElementsByClassName('co4');
				Tomato_Advanced[0].innerHTML = '模式';
				Tomato_Advanced = document.getElementsByClassName('co5');
				Tomato_Advanced[0].innerHTML = '橋接';
				
				var f = unsafeWindow.tabSelect;
				unsafeWindow.tabSelect = function(name) {
					f(name);
					Replaceword();
				}
				break;
		}
	}


	// 等待IP 流量監控相關頁面資料建立後再行取代文字
	// ===============================================================
	function ReplaceIpt() {
		switch(TomatoPage) {
			case 'ipt-details.asp':
				Tomato_Ipt = document.getElementsByClassName('co1');
				Tomato_Ipt[0].innerHTML = '主機';
				Tomato_Ipt = document.getElementsByClassName('co2');
				Tomato_Ipt[0].innerHTML = '下載速率';
				Tomato_Ipt = document.getElementsByClassName('co3');
				Tomato_Ipt[0].innerHTML = '上傳速率';
				Tomato_Ipt = document.getElementsByClassName('co4');
				Tomato_Ipt[0].innerHTML = 'TCP 封包 (入/出)';
				Tomato_Ipt = document.getElementsByClassName('co5');
				Tomato_Ipt[0].innerHTML = 'UDP 封包 (入/出)';
				Tomato_Ipt = document.getElementsByClassName('co6');
				Tomato_Ipt[0].innerHTML = 'ICMP 封包 (入/出)';
				Tomato_Ipt = document.getElementsByClassName('co7');
				Tomato_Ipt[0].innerHTML = 'TCP 連線數';
				Tomato_Ipt = document.getElementsByClassName('co8');
				Tomato_Ipt[0].innerHTML = 'UDP 連線數';
				break;
			case 'ipt-daily.asp':
				Tomato_Ipt = document.getElementsByClassName('co1');
				Tomato_Ipt[0].innerHTML = '日期';
				Tomato_Ipt = document.getElementsByClassName('co2');
				Tomato_Ipt[0].innerHTML = '主機';
				Tomato_Ipt = document.getElementsByClassName('co3');
				Tomato_Ipt[0].innerHTML = '下載';
				Tomato_Ipt = document.getElementsByClassName('co4');
				Tomato_Ipt[0].innerHTML = '上傳';
				Tomato_Ipt = document.getElementsByClassName('co5');
				Tomato_Ipt[0].innerHTML = '合計';
				break;
			case 'ipt-monthly.asp':
				Tomato_Ipt = document.getElementsByClassName('co1');
				Tomato_Ipt[0].innerHTML = '日期';
				Tomato_Ipt = document.getElementsByClassName('co2');
				Tomato_Ipt[0].innerHTML = '主機';
				Tomato_Ipt = document.getElementsByClassName('co3');
				Tomato_Ipt[0].innerHTML = '下載';
				Tomato_Ipt = document.getElementsByClassName('co4');
				Tomato_Ipt[0].innerHTML = '上傳';
				Tomato_Ipt = document.getElementsByClassName('co5');
				Tomato_Ipt[0].innerHTML = '合計';
				break;
		}
	}


	// 等待頻寬監控相關頁面資料建立後再行取代文字
	// ===============================================================
	function ReplaceBwm() {
		Tomato_Bwm = document.getElementsByClassName('rtitle');
		for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
			switch(Tomato_Bwm[i].innerHTML) {
				case 'Date':
					Tomato_Bwm[i].innerHTML = '日期';
					break;
				case 'Total':
					Tomato_Bwm[i].innerHTML = '合計';
					break;
			}
		}
		
		Tomato_Bwm = document.getElementsByClassName('dl');
		for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
			switch(Tomato_Bwm[i].innerHTML) {
				case 'Download':
					Tomato_Bwm[i].innerHTML = '下載';
					break;
			}
		}

		Tomato_Bwm = document.getElementsByClassName('ul');
		for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
			switch(Tomato_Bwm[i].innerHTML) {
				case 'Upload':
					Tomato_Bwm[i].innerHTML = '上傳';
					break;
			}
		}

		Tomato_Bwm = document.getElementsByClassName('total');
		for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
			switch(Tomato_Bwm[i].innerHTML) {
				case 'Total':
					Tomato_Bwm[i].innerHTML = '合計';
					break;
			}
		}
		
		var f = unsafeWindow.redraw;
		unsafeWindow.redraw = function(redraw) {
			f();
			Tomato_Bwm = document.getElementsByClassName('rtitle');
			for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
				switch(Tomato_Bwm[i].innerHTML) {
					case 'Date':
						Tomato_Bwm[i].innerHTML = '日期';
						break;
					case 'Total':
						Tomato_Bwm[i].innerHTML = '合計';
						break;
				}
			}
			
			Tomato_Bwm = document.getElementsByClassName('dl');
			for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
				switch(Tomato_Bwm[i].innerHTML) {
					case 'Download':
						Tomato_Bwm[i].innerHTML = '下載';
						break;
				}
			}

			Tomato_Bwm = document.getElementsByClassName('ul');
			for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
				switch(Tomato_Bwm[i].innerHTML) {
					case 'Upload':
						Tomato_Bwm[i].innerHTML = '上傳';
						break;
				}
			}
			
			Tomato_Bwm = document.getElementsByClassName('total');
			for (var i = 0 ; Tomato_Bwm.length > i ; i++) {
				switch(Tomato_Bwm[i].innerHTML) {
					case 'Total':
						Tomato_Bwm[i].innerHTML = '合計';
						break;
				}
			}
			Replaceword();
		}
		Replaceword();
	}


	// 切換顯示/隱藏腳本時重整頁面文字
	// ===============================================================
	function RefreshPage() {
		switch(TomatoPage) {
			case 'basic-ddns.asp':
				var f = unsafeWindow.verifyFields;
				unsafeWindow.verifyFields = function(focused, quiet) {
					f(focused, quiet);
					Replaceword();
					Tomato_RefreshPage = document.getElementsByTagName('label');
					for (var i = 0 ; Tomato_RefreshPage.length > i ; i++) {
						switch(Tomato_RefreshPage[i].innerHTML) {
							case 'MX':
								Tomato_RefreshPage[i].innerHTML = 'MX 記錄';
								break;
						}
					}
				}
				break;
			case 'advanced-ctnf.asp':
				var f = unsafeWindow.clicked;
				unsafeWindow.clicked = function() {
					f();
					Replaceword();
				}
				break;
			default:
				var f = unsafeWindow.toggleVisibility;
				unsafeWindow.toggleVisibility = function(whichone) {
					f(whichone);
					Replaceword();
				}
				break;
		}
		Replaceword();
	}


	// 切換顯示/隱藏腳本時重整頁面文字
	// ===============================================================
	function ReplaceButtonValue() {
		Tomato_ButtonValue = document.getElementsByTagName('input');
		for (var i = 0 ; Tomato_ButtonValue.length > i ; i++) {
			switch(Tomato_ButtonValue[i].value) {
				case 'Connect':
					Tomato_ButtonValue[i].value = '連線';
					break;
				case 'Disconnect':
					Tomato_ButtonValue[i].value = '斷線';
					break;
				case 'Enable':
					Tomato_ButtonValue[i].value = '啟用';
					break;
				case 'Disable':
					Tomato_ButtonValue[i].value = '停用';
					break;
				case 'Refresh':
					Tomato_ButtonValue[i].value = '更新';
					break;
				case 'Stop':
					Tomato_ButtonValue[i].value = '停止';
					break;
				case 'Add':
					Tomato_ButtonValue[i].value = '新增';
					break;
				case 'Delete':
					Tomato_ButtonValue[i].value = '刪除';
					break;
				case 'OK':
					Tomato_ButtonValue[i].value = '確定';
					break;
				case 'Cancel':
					Tomato_ButtonValue[i].value = '取消';
					break;
				case 'Save':
					Tomato_ButtonValue[i].value = '儲存';
					break;
				case 'Cancel':
					Tomato_ButtonValue[i].value = '取消';
					break;
				case 'Measure':
					Tomato_ButtonValue[i].value = '測量';
					break;
				case 'Find':
					Tomato_ButtonValue[i].value = '搜尋';
					break;
				case 'Trace':
					Tomato_ButtonValue[i].value = '追蹤';
					break;
				case 'Execute':
					Tomato_ButtonValue[i].value = '執行';
					break;
				case 'Wake Up':
					Tomato_ButtonValue[i].value = '喚醒';
					break;
				case 'Random':
					Tomato_ButtonValue[i].value = '亂數';
					break;
				case 'Drop Idle':
					Tomato_ButtonValue[i].value = '清除逾時連線';
					break;
				case 'Default':
					Tomato_ButtonValue[i].value = '預設值';
					break;
				case 'Clone PC':
					Tomato_ButtonValue[i].value = '複製電腦網卡 MAC 位址';
					break;
				case 'Overview':
					Tomato_ButtonValue[i].value = '概觀';
					break;
				case 'Scan':
					Tomato_ButtonValue[i].value = '掃描';
					break;
				case 'Generate':
					Tomato_ButtonValue[i].value = '產生';
					break;
				case 'Delete All':
					Tomato_ButtonValue[i].value = '全部刪除';
					break;
				case 'Delete...':
					Tomato_ButtonValue[i].value = '刪除...';
					break;
				case 'Zoom Graphs':
					Tomato_ButtonValue[i].value = '縮放圖表';
					break;
				case 'Upload':
					Tomato_ButtonValue[i].value = '上傳';
					break;
				case 'Start Now':
					Tomato_ButtonValue[i].value = '立即啟動';
					break;
				case 'Stop Now':
					Tomato_ButtonValue[i].value = '立即停止';
					break;
				case 'Backup':
					Tomato_ButtonValue[i].value = '備份';
					break;
				case 'Restore':
					Tomato_ButtonValue[i].value = '還原';
					break;
				case 'Format / Erase...':
					Tomato_ButtonValue[i].value = '格式化 / 清除...';
					break;
				case 'Upgrade':
					Tomato_ButtonValue[i].value = '升級';
					break;
			}
		}
	}


	// Replace Text On Webpages  by JoeSimmons
	// ===============================================================
	function Replaceword() {
		ReplaceButtonValue();
		'use strict';
		/*
			NOTE: 
				You can use \\* to match actual asterisks instead of using it as a wildcard!
				The examples below show a wildcard in use and a regular asterisk replacement.
		*/
    
		//////////////////////////////////////////////////////////////////////////////
		// This is where the real code is
		// Don't edit below this
		//////////////////////////////////////////////////////////////////////////////

		var regexs = [], replacements = [],
			tagsWhitelist = ['PRE', 'BLOCKQUOTE', 'CODE', 'INPUT', 'BUTTON', 'TEXTAREA'],
			rIsRegexp = /^\/(.+)\/([gim]+)?$/,
			word, text, texts, i, userRegexp;

		// prepareRegex by JoeSimmons
		// used to take a string and ready it for use in new RegExp()
		function prepareRegex(string) {
			return string.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, '\\$1');
		}

		// function to decide whether a parent tag will have its text replaced or not
		function isTagOk(tag) {
			return tagsWhitelist.indexOf(tag) === -1;
		}

		delete words[''];	// so the user can add each entry ending with a comma,
										// I put an extra empty key/value pair in the object.
										// so we need to remove it before continuing

		// convert the 'words' JSON object to an Array
		for (word in words) {
			if ( typeof word === 'string' && words.hasOwnProperty(word) ) {
				userRegexp = word.match(rIsRegexp);

				// add the search/needle/query
				if (userRegexp) {
					regexs.push(
						new RegExp(userRegexp[1], 'g')
					);
				} else {
					regexs.push(
						new RegExp(prepareRegex(word).replace(/\\?\*/g, function (fullMatch) {
						return fullMatch === '\\*' ? '*' : '[^ ]*';
						}), 'g')
					);
				}

				// add the replacement
				replacements.push( words[word] );
			}
		}

		// do the replacement
		texts = document.evaluate('//body//text()[ normalize-space(.) != "" ]', document, null, 6, null);
		for (i = 0; text = texts.snapshotItem(i); i += 1) {
			if ( isTagOk(text.parentNode.tagName) ) {
				regexs.forEach(function (value, index) {
					text.data = text.data.replace( value, replacements[index] );
				});
			}
		}
	}