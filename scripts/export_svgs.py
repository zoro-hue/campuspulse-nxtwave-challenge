import os
import re

os.makedirs('public/hoggies', exist_ok=True)
svg_dir = 'node_modules/@posthog/brand/dist/generated/hoggies/svg'

exported = 0
for f in os.listdir(svg_dir):
    if f.endswith('.mjs'):
        name = f.replace('.mjs', '')
        with open(os.path.join(svg_dir, f), 'r', encoding='utf-8') as src:
            content = src.read()
            # find const svg = "..."
            idx = content.find('const svg = "')
            if idx != -1:
                end_idx = content.rfind('";\n//#endregion')
                if end_idx != -1:
                    raw_str = content[idx + len('const svg = "'):end_idx]
                    # replace \" with "
                    svg_content = raw_str.replace('\\"', '"').replace('\\n', '\n')
                    with open(os.path.join('public/hoggies', f'{name}.svg'), 'w', encoding='utf-8') as out:
                        out.write(svg_content)
                    exported += 1

print(f'Successfully exported {exported} SVGs to public/hoggies')
