from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 820})

    # 1. Overview
    page.goto('http://localhost:3000/#overview')
    page.wait_for_timeout(1000)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_overview.png')

    # 2. Register Screen
    page.goto('http://localhost:3000/?ref=RAHUL-AI#register')
    page.wait_for_timeout(1000)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_register.png')

    # 3. Ambassadors Screen
    page.goto('http://localhost:3000/#ambassadors')
    page.wait_for_timeout(1000)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_ambassadors.png')

    # 4. Channel Planning
    page.goto('http://localhost:3000/#channels')
    page.wait_for_timeout(1000)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_channels.png')

    # 5. Next Actions
    page.goto('http://localhost:3000/#actions')
    page.wait_for_timeout(1000)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_actions.png')

    # 6. WhatsApp Outreach Modal
    page.goto('http://localhost:3000/#experiments')
    page.wait_for_timeout(800)
    page.click('button:has-text("Launch WhatsApp Dispatcher")')
    page.wait_for_timeout(600)
    page.screenshot(path='C:/Users/DELL/.gemini/antigravity/brain/16517658-9d22-4741-8a32-9b5a8b976478/qa_growth_whatsapp.png')

    browser.close()
print('All QA screenshots captured!')

