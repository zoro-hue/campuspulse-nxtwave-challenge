import subprocess
import os
import shutil
import time

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
cwd = os.getcwd()
art_dir = r'C:\Users\DELL\.gemini\antigravity\brain\16517658-9d22-4741-8a32-9b5a8b976478'

screens = [
    ('qa_growth_overview', 'http://localhost:3000/#overview'),
    ('qa_growth_register', 'http://localhost:3000/?ref=RAHUL-AI#register'),
    ('qa_growth_ambassadors', 'http://localhost:3000/#ambassadors'),
    ('qa_growth_channels', 'http://localhost:3000/#channels'),
    ('qa_growth_actions', 'http://localhost:3000/#actions'),
    ('qa_growth_experiments', 'http://localhost:3000/#experiments'),
]

for name, url in screens:
    out_file = os.path.join(cwd, f'{name}.png')
    cmd = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        '--window-size=1260,820',
        '--virtual-time-budget=2500',
        f'--screenshot={out_file}',
        url
    ]
    res = subprocess.run(cmd, capture_output=True, cwd=cwd)
    if os.path.exists(out_file) and os.path.getsize(out_file) > 0:
        target_path = os.path.join(art_dir, f'{name}.png')
        shutil.copy2(out_file, target_path)
        print(f'Captured {name}: {os.path.getsize(out_file)} bytes')
    else:
        print(f'Failed to capture {name}: {res.stderr.decode()}')

print('All growth screens captured successfully!')

