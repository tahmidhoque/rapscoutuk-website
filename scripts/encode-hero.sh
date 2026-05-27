#!/usr/bin/env bash
# Encode RapScout hero videos for web delivery.
# Requires: ffmpeg (brew install ffmpeg)
# Source files: public/portrait-hero.mov, public/landscape-hero.mov

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/hero"
mkdir -p "$OUT"

PORTRAIT_SRC="${PORTRAIT_SRC:-$ROOT/public/portrait-hero.mov}"
LANDSCAPE_SRC="${LANDSCAPE_SRC:-$ROOT/public/landscape-hero.mov}"

if [[ ! -f "$PORTRAIT_SRC" ]]; then
  echo "Missing portrait source: $PORTRAIT_SRC" >&2
  exit 1
fi
if [[ ! -f "$LANDSCAPE_SRC" ]]; then
  echo "Missing landscape source: $LANDSCAPE_SRC" >&2
  exit 1
fi

echo "→ Portrait MP4"
ffmpeg -i "$PORTRAIT_SRC" -an -vf "scale=-2:1280" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart \
  -y "$OUT/portrait-hero.mp4"

echo "→ Portrait WebM"
ffmpeg -i "$PORTRAIT_SRC" -an -vf "scale=-2:1280" \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -y "$OUT/portrait-hero.webm"

echo "→ Landscape MP4"
ffmpeg -i "$LANDSCAPE_SRC" -an -vf "scale=1920:-2" \
  -c:v libx264 -crf 26 -preset slow -movflags +faststart \
  -y "$OUT/landscape-hero.mp4"

echo "→ Landscape WebM"
ffmpeg -i "$LANDSCAPE_SRC" -an -vf "scale=1920:-2" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -y "$OUT/landscape-hero.webm"

echo "→ Posters"
ffmpeg -i "$OUT/portrait-hero.mp4" -frames:v 1 -q:v 2 -y "$OUT/portrait-poster.jpg"
ffmpeg -i "$OUT/landscape-hero.mp4" -frames:v 1 -q:v 2 -y "$OUT/landscape-poster.jpg"
ffmpeg -i "$OUT/portrait-poster.jpg" -c:v libaom-av1 -still-picture 1 -crf 30 -y "$OUT/portrait-poster.avif" 2>/dev/null \
  || ffmpeg -i "$OUT/portrait-poster.jpg" -y "$OUT/portrait-poster.avif"
ffmpeg -i "$OUT/landscape-poster.jpg" -c:v libaom-av1 -still-picture 1 -crf 30 -y "$OUT/landscape-poster.avif" 2>/dev/null \
  || ffmpeg -i "$OUT/landscape-poster.jpg" -y "$OUT/landscape-poster.avif"

echo "Done. Outputs in $OUT"
ls -lh "$OUT"
