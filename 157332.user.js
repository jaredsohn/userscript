// ==UserScript==
// @name           iptables.fw
// @namespace      sizzlemctwizzle
// @description    Script de firewall iptables criado para utilizacao em servidores de hospedagem, email, dns, que estao ligados diretamente na internet sem a protecao adicional.
// @version        1.0
// @include        *
// ==/UserScript==
﻿#!/bin/bash
##
##: Title        : iptables.fw
##: Date         : 2013-01-01
##: Author       : "Gleyson Lira" <gleysonlf@gmail.com>
##: Version      : 1.0
##: Description  : Script de firewall iptables criado para utilizacao em 
##		   servidores de hospedagem, email, dns, que estao ligados 
##		   diretamente na internet sem a protecao adicional.
##: Options      : start|stop
##
##############################################################################

## DECLARAÇÃO DE VARIAVEIS
    #---------------------------------------------------------------------
    # Definir aplicações
    PATH=/sbin:/bin:/usr/sbin:/usr/bin
    IPTABLES=`which iptables`  
    MODPROBE=`which modprobe`
    TC=`which tc`
    PSNI=/proc/sys/net/ipv4
    #---------------------------------------------------------------------
    # Definier interfaces
    IFLOO=lo			# Interface Loopback
    IFLAN=eth1 			# Placa de rede ligada na rede interna
    IFWAN=eth0 			# Placa de rede ligada na rede externa
    IFDMZ=eth2 			# Placa de rede ligada na DMZ
    IFVPN=tun+ 			# Placa de rede ligada na VPN
    #---------------------------------------------------------------------
    # Definir redes
    REDLOO=127.0.0.0/8		# Rede loopback
    REDLAN=172.16.0.0/16	# Rede local
    REDNET=189.90.173.16/28	# Rede network
    #---------------------------------------------------------------------
    # Porta do serviço SSH
    PSSH=2210
    
##############################################################################

## REALIZAR CONFIGURAÇÕES BÁSICAS
    #---------------------------------------------------------------------
    # Controle de ICMP
    echo 0 > $PSNI/icmp_echo_ignore_all
    # Dropa ICMP echo-request enviadas para o broadcast ou  multicast
    echo 1 > $PSNI/icmp_echo_ignore_broadcasts
    # Nega redirecionamento de ICMP
    echo 0 > $PSNI/conf/*/accept_redirects
    # Não envia redirecionamento ICMP
    echo 0 > $PSNI/conf/*/send_redirects
    # Habilita repasse de pacotes
    echo 1 > $PSNI/ip_forward
    # Habilitar protecao contra SYN floods
    echo 1 > $PSNI/tcp_syncookies
    # Habilitar verificacao de rota de origem (Protecao p/ IP Spoofing)
    for RP in $PSNI/conf/*/rp_filter ; do echo 1 > $RP ; done
    #---------------------------------------------------------------------
    # Carregar modulos conntrack
    $MODPROBE ip_conntrack
    $MODPROBE ip_conntrack_ftp
    $MODPROBE ip_nat_ftp
    $MODPROBE ip_conntrack_irc
    $MODPROBE ip_nat_irc
    
##############################################################################

## DEFINIÇÕES INICIAS DO FIREWALL
    #---------------------------------------------------------------------
    # Limpando regras e cadeias anteriores
    $IPTABLES -F
    $IPTABLES -F INPUT
    $IPTABLES -F OUTPUT
    $IPTABLES -F FORWARD
    $IPTABLES -t mangle -F
    $IPTABLES -t nat -F
    $IPTABLES -X
    $IPTABLES -Z
    #---------------------------------------------------------------------
    # Definindo politica padrão DROP/REJEITAR
    $IPTABLES -P INPUT DROP
    $IPTABLES -P FORWARD DROP
    $IPTABLES -P OUTPUT DROP
    #---------------------------------------------------------------------
    $IPTABLES -A INPUT -p tcp --dport $PSSH -j ACCEPT

##############################################################################

case $1 in 
  start)
    #---------------------------------------------------------------------
    # Definindo portas dos servicos
    PORTADNS="53"
    PORTADHCP="67:68"
    PORTAFTP="21"
    PORTAHTTP="80"
    PORTAHTTPS="443"
    PORTAIMAP="143"
    PORTALDAP="389"
    PORTAPOP="110"
    PORTANTP="123"
    PORTAPROXY="3128"
    PORTASAMBA="137:139"
    PORTASMTP="25"
    PORTASSH=$PSSH
    PORTATS="3389"
    PORTAVNC="5900"
    PORTAVPN="1194"
    #---------------------------------------------------------------------
    # Permite interno
    $IPTABLES -A INPUT -i $IFLOO -s $REDLOO -j ACCEPT
    $IPTABLES -A INPUT -i $IFLOO -s $REDLAN -j ACCEPT
    $IPTABLES -A INPUT -i $IFLOO -s $REDWAN -j ACCEPT
    $IPTABLES -A OUTPUT -o $IFLOO -j ACCEPT
    # Libera o que sai
    $IPTABLES -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    $IPTABLES -A OUTPUT -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
    # Libera conexão SSH para nossa rede, registra erros consecutivos e bloqueia comunicação
    $IPTABLES -A INPUT -p tcp -s $REDLOO --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp -s $REDLAN --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp -s $REDWAN --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport $PORTASSH -m recent --update --seconds 60 --hitcount 4 --rttl --name SSH -j LOG --log-prefix "SSH_brute_force "
    $IPTABLES -A INPUT -p tcp --dport $PORTASSH -m recent --update --seconds 60 --hitcount 4 --rttl --name SSH -j DROP
    # Libera ping nas interfaces
    $IPTABLES -A INPUT -p icmp --icmp-type 8 -i $IFLAN -m limit --limit 5/s -j ACCEPT
    $IPTABLES -A INPUT -p icmp --icmp-type 8 -i $IFLAN -j DROP
    $IPTABLES -A INPUT -p icmp --icmp-type 8 -i $IFWAN -m limit --limit 5/s -j ACCEPT
    $IPTABLES -A INPUT -p icmp --icmp-type 8 -i $IFWAN -j DROP

    ;;
    
  stop)
    #---------------------------------------------------------------------
    # Limpando regras e cadeias anteriores
    $IPTABLES -F
    $IPTABLES -F INPUT
    $IPTABLES -F OUTPUT
    $IPTABLES -F FORWARD
    $IPTABLES -t mangle -F
    $IPTABLES -t nat -F
    $IPTABLES -X
    $IPTABLES -Z
    #---------------------------------------------------------------------
    # Liberando todas as conexões
    $IPTABLES -P INPUT ACCEPT
    $IPTABLES -P OUTPUT ACCEPT
    $IPTABLES -P FORWARD ACCEPT
    exit 0
    ;;
    
  manut)
    #---------------------------------------------------------------------
    # Limpando regras e cadeias anteriores
    $IPTABLES -F
    $IPTABLES -F INPUT
    $IPTABLES -F OUTPUT
    $IPTABLES -F FORWARD
    $IPTABLES -t mangle -F
    $IPTABLES -t nat -F
    $IPTABLES -X
    $IPTABLES -Z
    #---------------------------------------------------------------------
    # Definindo politica padrão DROP/REJEITAR
    $IPTABLES -P INPUT DROP
    $IPTABLES -P FORWARD DROP
    $IPTABLES -P OUTPUT DROP
    #---------------------------------------------------------------------
    # Libera conexão SSH para nossa rede, registra erros consecutivos e bloqueia comunicação
    $IPTABLES -A INPUT -p tcp -s $REDLOO --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp -s $REDLAN --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp -s $REDWAN --dport $PORTASSH -m state --state NEW -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport $PORTASSH -m recent --update --seconds 60 --hitcount 4 --rttl --name SSH -j LOG --log-prefix "SSH_brute_force "
    $IPTABLES -A INPUT -p tcp --dport $PORTASSH -m recent --update --seconds 60 --hitcount 4 --rttl --name SSH -j DROP

    ;;
    
  *)
    echo "Use: ./iptables.fw {start|stop|manut}"
  ;;
esac