import os
from PIL import Image

art_dir = r'C:\Users\DELL\.gemini\antigravity\brain\16517658-9d22-4741-8a32-9b5a8b976478'

image_files = [
    os.path.join(art_dir, 'qa_growth_overview.png'),
    os.path.join(art_dir, 'qa_growth_register.png'),
    os.path.join(art_dir, 'qa_growth_ambassadors.png'),
    os.path.join(art_dir, 'qa_growth_channels.png'),
    os.path.join(art_dir, 'qa_growth_actions.png'),
    os.path.join(art_dir, 'qa_standardized_experiments.png'),
]

images = [Image.open(f) for f in image_files]

# Target cell size: 500 x 325
cell_w, cell_h = 500, 325
resized = [img.resize((cell_w, cell_h), Image.Resampling.LANCZOS) for img in images]

# Create 3 columns x 2 rows collage (1520 x 670 with 10px margins)
grid_w = cell_w * 3 + 10 * 4
grid_h = cell_h * 2 + 10 * 3
collage = Image.new('RGB', (grid_w, grid_h), color='#8da871')

for idx, img in enumerate(resized):
    row = idx // 3
    col = idx % 3
    x = 10 + col * (cell_w + 10)
    y = 10 + row * (cell_h + 10)
    collage.paste(img, (x, y))

out_path = os.path.join(art_dir, 'campuspulse_growth_asset_collage.png')
collage.save(out_path, quality=95)
print(f'Collage created at {out_path} ({grid_w}x{grid_h})')

