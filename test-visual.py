"""Visual testing script for 3D Photo Gallery"""
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # === Desktop View ===
    ctx_desktop = browser.new_context(viewport={"width": 1920, "height": 1080})
    page_desktop = ctx_desktop.new_page()
    page_desktop.goto('http://localhost:5173')
    page_desktop.wait_for_load_state('networkidle')
    # Wait for Three.js to render
    page_desktop.wait_for_timeout(4000)
    page_desktop.screenshot(path='test-desktop.png', full_page=False)
    print("Desktop screenshot saved")
    
    # Check for console errors
    console_msgs = []
    page_desktop.on("console", lambda msg: console_msgs.append(f"[{msg.type}] {msg.text}"))
    page_desktop.wait_for_timeout(2000)
    errors = [m for m in console_msgs if 'error' in m.lower() or 'fail' in m.lower()]
    if errors:
        print("Desktop errors:", errors)
    else:
        print("Desktop: No errors in console")
    
    ctx_desktop.close()
    
    # === Mobile View (iPhone 15) ===
    ctx_mobile = browser.new_context(viewport={"width": 390, "height": 844})
    page_mobile = ctx_mobile.new_page()
    
    console_msgs_mobile = []
    page_mobile.on("console", lambda msg: console_msgs_mobile.append(f"[{msg.type}] {msg.text}"))
    
    page_mobile.goto('http://localhost:5173')
    page_mobile.wait_for_load_state('networkidle')
    page_mobile.wait_for_timeout(5000)
    page_mobile.screenshot(path='test-mobile.png', full_page=False)
    print("Mobile screenshot saved")
    
    errors_mobile = [m for m in console_msgs_mobile if 'error' in m.lower() or 'fail' in m.lower()]
    if errors_mobile:
        print("Mobile errors:", errors_mobile)
    else:
        print("Mobile: No errors in console")
    
    ctx_mobile.close()
    browser.close()
    print("\n=== Testing complete ===")