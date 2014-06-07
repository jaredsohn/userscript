// ==UserScript==
// @name		prezzipazzi
// @description		Hide all watched videos in PLAY
// @include		http://www.prezzipazzi.com/
// @version		0.1.1
// @copyright	Luca Iacoponi - jacoponi@gmail.com

// ==/UserScript==

"" Automatically bid on prezzipazzi.it when a treshold is reached """

# NB Remove winsound lines to make it portable
# Substitute all 299 with the item id

import urllib2
import urllib
import time
import random
import re
import sys
import ConfigParser
import socket
import os
import cookielib
import winsound


def main():
    # Link to the item to bid goes here
    BIDITEM = 'http://www.prezzipazzi.com/puntare.php?asta=299&rnd=0.0'
    USERNAME = 'username'
    PASSWORD = 'password'
    cookiefile = 'cookies.lwp'
    # create cookie obj
    urlopen = urllib2.urlopen
    Request = urllib2.Request
    cj = cookielib.LWPCookieJar()
    if os.path.isfile(cookiefile):
        cj.load(cookiefile)
    if cookielib is not None:
        opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
        urllib2.install_opener(opener)
    # authenticate and get the cookie
    url = 'http://www.prezzipazzi.com/entra.php'
    values = {'user': USERNAME, 'pass': PASSWORD, 'b':'ENTRA'}
    user_agent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
    headers = {'User-Agent':user_agent}
    data = urllib.urlencode(values)
    req = urllib2.Request(url, data, headers)
    send(req)
    # print and save the cookies
    for index, cookie in enumerate(cj):
        print index, '  :  ', cookie
    cj.save(cookiefile)                     # save the cookies again

    # get the home page
    while 1:
        randnum = str(random.randint(100000000000000, 9999999999999999))
        url = 'http://www.prezzipazzi.com/aggiorna_puntate.php?0.' + randnum
        values = {}
        req = urllib2.Request(url, data, headers)
        page = send(req)
        this_time = re.findall('parent.aggiorna_puntate\(299, (\d+),', page)
        print this_time
        if int(this_time[0]) < 10:
            pause = int(this_time[0]) - 2
            pause += 0.3
            time.sleep(pause)
            randnum = str(random.randint(100000000000000, 9999999999999999))
            url = 'http://www.prezzipazzi.com/aggiorna_puntate.php?0.' + randnum
            values = {}
            req = urllib2.Request(url, data, headers)
            page = send(req)
            this_time = re.findall('parent.aggiorna_puntate\(299, (\d+),', page)
            if int(this_time[0]) < 10:
                print this_time
                BIDITEM2 = BIDITEM + randnum
                url = BIDITEM2
                values = {}
                req = urllib2.Request(url, data, headers)
                req.add_header('Host', 'www.prezzipazzi.com')
                req.add_header('Referer', 'http://www.prezzipazzi.com/prodotto.php?id=299')
                page = send(req)
                print page
                winsound.PlaySound("SystemExclamation", winsound.SND_ALIAS)
                time.sleep(22)
                # rinput = raw_input('continui a puntare?')

        elif int(this_time[0]) > 40 and int(this_time[0]) < 47:
            # check the user is logged in
            url = 'http://www.prezzipazzi.com/prodotto.php?id=299'
            values = {}
            req = urllib2.Request(url, data, headers)
            req.add_header('Host', 'www.prezzipazzi.com')
            req.add_header('Referer', 'http://www.prezzipazzi.com/prodotto.php?id=299')
            page = send(req)
            connected = re.findall('Pannello', page)
            if not connected:
                winsound.PlaySound("SystemExit", winsound.SND_ALIAS)
            else:
                print 'connected'
        time.sleep(5)

def send(req):
    response = urllib2.urlopen(req)
    the_page = response.read()
    return the_page

if __name__ == '__main__':
    main()