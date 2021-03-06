#!/usr/bin/env bash
# this serves the build output and watches for changes to the source or tasks
# to rebuild

# exit with non-zero code if anything fails
set -e

case "$OSTYPE" in
  solaris*) OS="SOLARIS" ;;
  darwin*)  OS="OSX" ;;
  linux*)   OS="LINUX" ;;
  bsd*)     OS="BSD" ;;
esac

build() {
    echo "ninja"
    ninja && echo '* build succeeded *' || echo 'BUILD FAILED'
}

./configure.coffee $1

build $1

http-server build/ &


echo "watching for file changes in src/ tasks/ boards/"
if [ "$OS" == 'LINUX' ]; then
    while inotifywait --exclude '\..*sw.' -r -q -e modify src/ tasks/ boards/; do
      build $1
    done
elif [ "$OS" == 'OSX' ]; then
    while fswatch --one-event src/ tasks/ boards/; do
        build $1
    done
fi
