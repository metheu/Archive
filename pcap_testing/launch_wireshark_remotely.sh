#!/bin/bash
# ssh -i nomad vagrant@192.168.0.250 '/usr/sbin/tshark -f "port !22" -i eth1 -w -' | wireshark -k -i -

ssh -i $1 $2@$3 '/usr/sbin/tshark -f "port !22" -i '$4' -w -' | wireshark -k -i -

