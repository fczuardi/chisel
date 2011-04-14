#!/bin/bash
foo=`git status|grep "nothing to commit"`
if [ "$foo" = "" ]
then 
  echo "Please commit your changes first."
else
  rm -rf /tmp/chisel-builds
  cp -r ./builds /tmp/chisel-builds
  git checkout gh-pages
  rm -rf builds
  mv /tmp/chisel-builds ./builds
  git add .
  git commit -am "auto updated builds folder"
  git push origin gh-pages
  git checkout master
fi