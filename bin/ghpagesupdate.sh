#!/bin/bash
foo=`git status|grep "nothing to commit"`
if [ "$foo" = "" ]
then 
  echo "Please commit your changes first."
else
  echo "yay!"
  cp -r ./builds /tmp/chisel-builds
  git checkout gh-pages
  cp -r /tmp/chisel-builds ./builds
  git add .
  git commit -m "auto updated builds folder"
  git push origin gh-pages
  git checkout master
fi