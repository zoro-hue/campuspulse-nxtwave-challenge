import subprocess
import os
import shutil

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
cwd = os.getcwd()
art_dir = r'C:\Users\DELL\.gemini\antigravity\brain\16517658-9d22-4741-8a32-9b5a8b976478'

screens = [
    ('qa_growth_register', 'http://localhost:3000/#register'),
    ('qa_growth_ambassadors', 'http://localhost:3000/#ambassadors'),
    ('qa_growth_channels', 'http://localhost:3000/#channels'),
    ('qa_growth_actions', 'http://localhost:3000/#actions'),
]

for name, url in screens:
    out_file = os.path.join(cwd, f'{name}.png')
    if os.path.exists(out_file):
        os.remove(out_file)
    cmd = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        '--window-size=1260,820',
        '--virtual-time-budget=2000',
        f'--screenshot={out_file}',
        url
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, cwd=cwd, timeout=8)
        if os.path.exists(out_file) and os.path.getsize(out_file) > 0:
            target_path = os.path.join(art_dir, f'{name}.png')
            shutil.copy2(out_file, target_path)
            print(f'Captured {name}: {os.path.getsize(out_file)} bytes')
        else:
            print(f'Failed {name}: no file')
    except Exception as e:
        print(f'Error {name}: {e}')

print('Done')

