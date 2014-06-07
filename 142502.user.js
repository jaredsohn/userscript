// ==UserScript==
// @name            Deluge+Flexget & Rutorrent+Rtorreng+FTP+Webin
// @namespace       http://www.dwhd.org/
// @author          1nm
// @description     Deluge+Flexget(RSS)+Web/Rutorrent+FTP+Web可自由选择式一键安装脚本V0.02版,本脚步由SEEDBOX军团原创，转载请注明。
// @include http://*/details.php*
// @include https://*/details.php*
// ==/UserScript==

#!/bin/bash
#Website: http://www.dwhd.org 
#IMPORTANT!!!Please Setting the following Values!

# START
Version=`cat /etc/issue | grep 'Ubuntu'`
if [ -n "$Version" ]
then
    clear
    echo "Please select below option 1 or 2 or 3"
    echo "1. Install Deluge+Flexget"
    echo "2. Install Rutorrent"
    echo "3. Quit shell"
    echo ""
    echo "Please select:"
    read input
    if [ "$input" = "1" ]
    then
        echo "start install deluge..............................."
		#start install deluge
		mkdir -p /home/box123/downloads
		mkdir -p /home/box123/rss/
		mkdir -p ~/.flexget/
		rm -rf /root/.flexget/config.yml
		#wget --no-check-certificate -O /root/.flexget/config.yml http://www.dwhd.org/download/11/
		cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
		apt-get autoremove --purge mysql* -y
		echo "deb http://ppa.launchpad.net/deluge-team/ppa/ubuntu jaunty main" >> /etc/apt/sources.list
		echo "deb-src http://ppa.launchpad.net/deluge-team/ppa/ubuntu jaunty main" >> /etc/apt/sources.list
		apt-get install python-software-properties --force-yes -y
		add-apt-repository ppa:deluge-team/ppa
		apt-get update -y
		apt-get install vsftpd screen deluged deluge-web -y
		
		#start install flexget
		apt-get install -y python-setuptools
		easy_install flexget
		
		#run deluge and config auto start on system start
		deluged
		screen -fa -d -m -S deluge-web deluge-web
		sed -i '/exit 0/d' /etc/rc.local
		sed -i '/deluge/d' /etc/rc.local
		echo "deluged" >> /etc/rc.local
		echo "screen -fa -d -m -S deluge-web deluge-web" >> /etc/rc.local
		
		#config flexget crontab
		touch /var/spool/cron/crontabs/root
		echo "*/1 * * * * /usr/local/bin/flexget >> /root/flexget.log 2>&1" >>/var/spool/cron/crontabs/root
		crontab /var/spool/cron/crontabs/root
		crontab -l
		
		#config ftp username and password, resever!!!!!!!!!!!!!!
		#read -p "Please enter your FTP name: " ftpname
		#echo ""
		#read -p "Please enter your FTP passwoed: " ftppasswd
		#echo ""
		
		#start install apache
		apt-get install -y apache2
		ln -s /home/box123/downloads/ /var/www/
		#/etc/init.d/apache2 stop
		
		#download config.yml and config it
		cd /root/.flexget/
		wget http://www.dwhd.org/config.yml

		#modify pass
		Pass=`awk -F ':' '{print $2}' /root/.config/deluge/auth`
		IP=$(/sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v 127.0.0.2|grep -v inet6|awk '{print $2}'|tr -d "addr:")
		sed -i s/"pass:"/"pass: $Pass"/g config.yml
		
		read -p "Please enter your CHD RSS url1: " chdrss1
		read -p "Please enter your CHD RSS url2: " chdrss2
		read -p "Please enter your HDC RSS url1: " hdcrss1
		read -p "Please enter your HDC RSS url2: " hdcrss2
		echo ""
		#modiry rss url and del no define variables
		if [ "$chdrss1" != "" ]
		then
			chdrss1=`echo "$chdrss1" | sed 's@\&@\\\&@g'`
			#modify CHD RSS url1 3 line
			sed -i 3,3s@rss:.*@"rss: $chdrss1\r"@ config.yml
		else
			#del 2-20 line
			sed -i '2,20s/.*//' config.yml
		fi
		
		if [ "$chdrss2" != "" ]
		then
			chdrss2=`echo "$chdrss2" | sed 's@\&@\\\&@g'`
			#modify CHD RSS url2 22 line
			sed -i 22,22s@rss:.*@"rss: $chdrss2\r"@ config.yml
		else
			#del 21-32 line
			sed -i '21,32s/.*//' config.yml
		fi
		
		if [ "$hdcrss1" != "" ]
		then
			hdcrss1=`echo "$hdcrss1" | sed 's@\&@\\\&@g'`
			#modify CHD HDC url1 34 line
			sed -i 34,34s@rss:.*@"rss: $hdcrss1\r"@ config.yml
		else
			#del 33-52 line
			sed -i '33,52s/.*//' config.yml
		fi
		
		if [ "$hdcrss2" != "" ]
		then
			hdcrss2=`echo "$hdcrss2" | sed 's@\&@\\\&@g'`
			#modify CHD HDC url2 54 line
			sed -i 54,54s@rss:.*@"rss: $hdcrss2\r"@ config.yml
		else
			#del 53-64 line
			sed -i '53,64s/.*//' config.yml
		fi

		#del space line
		sed -i '/^$/d' config.yml
		
		#dos2unix
		sed -i 's/\\r//' config.yml
		
		echo "Please wait,Script running...";sleep 55;clear;echo "Please wait 5 Seconds ,Script running...";echo "5 .........";sleep 1;echo "4 ........";sleep 1;echo "3 ......";sleep 1;echo "2 ....";sleep 1;echo "1 ...GO";sleep 1;clear
		echo -e "\033[43;31;5m================================================================= \033[0m"
		echo -e "\033[43;31;5m==              The end of the Deluge installation             == \033[0m"
		echo -e "\033[43;31;5m==     Your Deluge address    http://$IP:8112       == \033[0m"
		echo -e "\033[43;31;5m==               Your Deluge web Password : deluge             == \033[0m"
		echo -e "\033[43;31;5m==       Your Deluge Download to: /home/box123/downloads       == \033[0m"
		echo -e "\033[43;31;5m==     Deluge pass: $Pass   == \033[0m"
		echo -e "\033[43;31;5m==   Your Downloads URL http://$IP/downloads/    == \033[0m"
		echo -e "\033[43;31;5m================================================================= \033[0m"
		#echo -e "\033[43;31;5m==           Your FTP $IP:5050       == \033[0m"
		#echo -e "\033[43;31;5m==   Your FTP UserName:$ftpname Password:$ftppasswd      == \033[0m"
		echo -e "\033[43;31;5m==                   This's a GOOD START                       == \033[0m"
		echo -e "\033[43;31;5m==                       HDPT Seedbox                          == \033[0m"
		echo -e "\033[43;31;5m==                                                             == \033[0m"
		echo -e "\033[43;31;5m==                   CHD HDC TTG HDR HDS ......                == \033[0m"
		echo -e "\033[43;31;5m==                                                             == \033[0m"
		echo -e "\033[43;31;5m== Uploaded 1T >>>Uploaded 2T >>>Uploaded 10T >>>Uploaded 100T == \033[0m"
		echo -e "\033[43;31;5m==                                                             == \033[0m"
		echo -e "\033[43;31;5m==                  WEB http://www.dwhd.org                    == \033[0m"
		echo -e "\033[43;31;5m================================================================= \033[0m"
    elif [ "$input" = "2" ]
    then
        echo "start install rutorrent............................"  
		#self shell run
		wget -O /root/ubunturt.sh http://www.dwhd.org/download/12/
		sh /root/ubunturt.sh
    else
		#exit shell
        echo "now quit."
        exit
    fi
else
    echo "Version is not Ubuntu,now exit"
fi