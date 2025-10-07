#!/bin/bash
set -e

# Current working directory inside container is mounted from host
BASE_DIR="/data/participants"

for dir in "$BASE_DIR"/*/; do
    # Only proceed if directory exists and contains webm files
    if compgen -G "$dir"*.webm > /dev/null; then
        foldername=$(basename "$dir")
        listfile="$dir/concat_list.txt"

        # Create a list file for ffmpeg
        > "$listfile"
        for f in "$dir"/*.webm; do
            echo "file '$(realpath --relative-to="$dir" "$f")'" >> "$listfile"
        done

        # Output to parent directory
        ffmpeg -f concat -safe 0 -i "$listfile" -c copy "$BASE_DIR/$foldername.webm"

        echo "✅ Combined $foldername into $foldername.webm"

        rm "$listfile"
    fi
done
