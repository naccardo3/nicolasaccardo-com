from PIL import Image, ImageDraw, ImageFont
import os

WIDTH, HEIGHT = 1200, 800
SURFACE = (20, 26, 24)  # #141A18
RULE = (36, 45, 42)  # #242D2A
INK_DIM = (130, 142, 137)  # #828E89
ACCENT = (111, 180, 154)  # #6FB49A

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "media")

PLACEHOLDERS = [
    ("joc-weekly-schedule.jpg", "JOC Weekly Schedule"),
    ("photo-stamp-replacer.jpg", "Photo Stamp Replacer"),
    ("sync.jpg", "SYNC"),
    ("behavior-empowerment.jpg", "Behavior Empowerment"),
]

try:
    font_label = ImageFont.truetype("consola.ttf", 40)
    font_sub = ImageFont.truetype("consola.ttf", 24)
except OSError:
    font_label = ImageFont.load_default(size=40)
    font_sub = ImageFont.load_default(size=24)


def draw_placeholder(path, name):
    img = Image.new("RGB", (WIDTH, HEIGHT), SURFACE)
    draw = ImageDraw.Draw(img)

    # hairline border
    draw.rectangle([0, 0, WIDTH - 1, HEIGHT - 1], outline=RULE, width=2)

    # diagonal hatch pattern, subtle
    step = 40
    for x in range(-HEIGHT, WIDTH, step):
        draw.line([(x, 0), (x + HEIGHT, HEIGHT)], fill=RULE, width=1)

    label = name
    sub = "placeholder — pending capture"

    bbox = draw.textbbox((0, 0), label, font=font_label)
    lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    bbox2 = draw.textbbox((0, 0), sub, font=font_sub)
    sw, sh = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]

    cx, cy = WIDTH / 2, HEIGHT / 2
    draw.text((cx - lw / 2, cy - lh), label, font=font_label, fill=ACCENT)
    draw.text((cx - sw / 2, cy + 14), sub, font=font_sub, fill=INK_DIM)

    img.save(path, "JPEG", quality=87)
    print(f"wrote {path}")


os.makedirs(OUT_DIR, exist_ok=True)
for filename, name in PLACEHOLDERS:
    draw_placeholder(os.path.join(OUT_DIR, filename), name)
