#!/bin/bash
foo=`git status|grep "nothing to commit"`
if [ "$foo" = "" ]
then 
  echo "Please commit your changes first."
else
  echo "rm -rf /tmp/chisel-builds"
  rm -rf /tmp/chisel-builds
  echo "cp -r ./builds /tmp/chisel-builds"
  cp -r ./builds /tmp/chisel-builds
  echo "git checkout gh-pages"
  git checkout gh-pages
  echo "rm -rf builds"
  rm -rf builds
  echo "mv /tmp/chisel-builds ./builds"
  mv /tmp/chisel-builds ./builds
  echo "git add builds"
  git add builds
  echo "git commit -am \"auto updated builds folder\""
  git commit -am "auto updated builds folder"
  echo "git push origin gh-pages"
  git push origin gh-pages
  echo "git checkout master"
  git checkout master
fi