# Chisel
Customizations for Forrst.

## Description
This is my personal experiment on creating a simple tool to help me tweak the
Forrst.com website and share my mods/patches/plugins/themes with the community.

## How does it work?
The idea is simple: Modify the existing web-page on the client side 
by dynamically monkey-patching custom stylesheets and javascript.

It could have been done with a Chrome extension or a Greasemonkey script, 
but I need this to work on my iPad and other mobile devices, and 
unfortunately, Apple's monopolistic mobile browser (mobile Safari) does not 
support plugins, extensions or user scripts. So I cheat and use a bookmarklet 
for that.

What I've hacked here is basically a command line tool that will grab some 
javascript and css files packaged in a folder and generate a nice bookmarklet 
URL of your patch.

## About the Build System — Chisel Compiler
To generate a bookmarklet URL we use the Chisel Compiler, which is a node.js
script that will read the content scripts of your theme, compress them 
(using Uglify.js and YUI Compressor CSS minification) and wrap it on a javascript:
function call.

Type:

    node chiselc.js --help

For more usage information.