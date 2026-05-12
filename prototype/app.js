const appContainer = document.getElementById('app-container');
const bottomNav = document.getElementById('bottom-nav');

// Screen Definitions
const screens = {
    splash: `
        <div class="screen" id="splash">
            <div class="wire-avatar" style="width: 80px; height: 80px; background-color: var(--white); margin-bottom: 24px;"></div>
            <div class="wire-title">App Name</div>
            <div class="wire-text-line short" style="background-color: var(--gray-600);"></div>
        </div>
    `,
    onboarding: `
        <div class="screen" id="onboarding">
            <div class="spacer"></div>
            <div class="image-placeholder" style="height: 250px; border-radius: 24px;">Illustration Placeholder</div>
            <div class="wire-title" style="text-align: center;">Welcome to ZenRoutine</div>
            <div class="wire-subtitle" style="text-align: center;">Track your habits, manage your tasks, and achieve your goals effortlessly.</div>
            
            <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 40px;">
                <div style="width: 24px; height: 8px; border-radius: 4px; background: var(--gray-800);"></div>
                <div style="width: 8px; height: 8px; border-radius: 4px; background: var(--gray-300);"></div>
                <div style="width: 8px; height: 8px; border-radius: 4px; background: var(--gray-300);"></div>
            </div>
            
            <button class="wire-button" onclick="navigateTo('signup')">Get Started</button>
            <div class="spacer" style="flex-grow: 0.5;"></div>
        </div>
    `,
    loading: `
        <div class="screen" id="loading" style="justify-content: center; align-items: center;">
            <div style="width: 60px; height: 60px; border: 6px solid var(--gray-200); border-top-color: var(--gray-800); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <div class="wire-title" style="margin-top: 24px;">Loading...</div>
        </div>
    `,
    login: `
        <div class="screen" id="login">
            <div style="margin-top: 60px; margin-bottom: 40px; text-align: center;">
                <div class="wire-avatar" style="margin: 0 auto 16px auto; width: 64px; height: 64px;"></div>
                <div class="wire-title">Welcome Back</div>
                <div class="wire-text-line medium" style="margin: 0 auto;"></div>
            </div>
            
            <input type="email" class="wire-input" placeholder="Email Placeholder" />
            <input type="password" class="wire-input" placeholder="Password Placeholder" />
            
            <div style="text-align: right; margin-bottom: 32px;">
                <span style="font-size: 14px; color: var(--gray-600);">Forgot Password?</span>
            </div>
            
            <button class="wire-button" onclick="simulateLoading('login')">Login</button>
            
            <div class="spacer"></div>
            
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 14px; color: var(--gray-600);">Don't have an account? <span style="color: var(--gray-900); font-weight: bold; cursor: pointer;" onclick="navigateTo('signup')">Sign Up</span></span>
            </div>
        </div>
    `,
    signup: `
        <div class="screen" id="signup">
            <div class="header-bar">
                <div class="icon-placeholder" onclick="navigateTo('login')" style="cursor: pointer;"></div>
            </div>
            <div class="wire-title">Create Account</div>
            <div class="wire-subtitle">Sign up to get started</div>
            
            <input type="text" id="signup-name" class="wire-input" placeholder="Full Name Placeholder" />
            <input type="email" class="wire-input" placeholder="Email Placeholder" />
            <input type="password" class="wire-input" placeholder="Password Placeholder" />
            
            <button class="wire-button" onclick="simulateLoading('signup')">Sign Up</button>
        </div>
    `,
    home: `
        <div class="screen" id="home">
            <div class="header-bar">
                <div>
                    <div class="wire-text-line short"></div>
                    <div class="wire-title" id="home-greeting" style="margin: 0;">Good Morning</div>
                </div>
                <div class="wire-avatar" onclick="navigateTo('profile')" style="cursor: pointer;"></div>
            </div>
            
            <div class="wire-card">
                <div class="wire-card-header">
                    <div class="wire-text-line medium" style="height: 16px; background-color: var(--gray-400);"></div>
                </div>
                <div class="wire-text-line long"></div>
                <div class="wire-text-line long"></div>
                <div class="wire-text-line short"></div>
            </div>
            
            <div class="wire-subtitle" style="margin-top: 16px; margin-bottom: 16px; color: var(--gray-900); font-weight: bold;">Recent Activity</div>
            
            <div class="wire-card" onclick="navigateTo('details')">
                <div style="display: flex; align-items: center;">
                    <div class="icon-placeholder" style="margin-right: 16px;"></div>
                    <div style="flex-grow: 1;">
                        <div class="wire-text-line medium"></div>
                        <div class="wire-text-line short"></div>
                    </div>
                </div>
            </div>
            
            <div class="wire-card" onclick="navigateTo('details')">
                <div style="display: flex; align-items: center;">
                    <div class="icon-placeholder" style="margin-right: 16px;"></div>
                    <div style="flex-grow: 1;">
                        <div class="wire-text-line medium"></div>
                        <div class="wire-text-line short"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    search: `
        <div class="screen" id="search">
            <div class="wire-title">Search</div>
            <input type="text" class="wire-input" style="border-radius: 24px;" placeholder="Search Placeholder..." />
            
            <div style="display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto;">
                <div style="padding: 8px 16px; background: var(--gray-200); border-radius: 16px; font-size: 12px; font-weight: bold;">Filter 1</div>
                <div style="padding: 8px 16px; background: var(--gray-200); border-radius: 16px; font-size: 12px; font-weight: bold;">Filter 2</div>
                <div style="padding: 8px 16px; background: var(--gray-200); border-radius: 16px; font-size: 12px; font-weight: bold;">Filter 3</div>
            </div>
            
            <div class="wire-card"><div class="wire-text-line medium"></div><div class="wire-text-line short"></div></div>
            <div class="wire-card"><div class="wire-text-line medium"></div><div class="wire-text-line short"></div></div>
            <div class="wire-card"><div class="wire-text-line medium"></div><div class="wire-text-line short"></div></div>
        </div>
    `,
    notifications: `
        <div class="screen" id="notifications">
            <div class="wire-title">Notifications</div>
            
            <div style="display: flex; padding: 16px 0; border-bottom: 1px solid var(--gray-200);">
                <div class="wire-avatar" style="width: 40px; height: 40px; margin-right: 16px;"></div>
                <div style="flex-grow: 1;">
                    <div class="wire-text-line long"></div>
                    <div class="wire-text-line medium"></div>
                    <div class="wire-text-line short" style="margin-top: 8px;"></div>
                </div>
            </div>
            <div style="display: flex; padding: 16px 0; border-bottom: 1px solid var(--gray-200);">
                <div class="wire-avatar" style="width: 40px; height: 40px; margin-right: 16px;"></div>
                <div style="flex-grow: 1;">
                    <div class="wire-text-line long"></div>
                    <div class="wire-text-line short" style="margin-top: 8px;"></div>
                </div>
            </div>
        </div>
    `,
    profile: `
        <div class="screen" id="profile">
            <div class="header-bar">
                <div></div>
                <div class="icon-placeholder" onclick="navigateTo('settings')" style="cursor: pointer;"></div>
            </div>
            
            <div style="text-align: center; margin-bottom: 32px;">
                <div class="wire-avatar" style="width: 96px; height: 96px; margin: 0 auto 16px auto;"></div>
                <div class="wire-title" style="margin-bottom: 8px;">User Name</div>
                <div class="wire-text-line short" style="margin: 0 auto;"></div>
            </div>
            
            <div style="display: flex; gap: 16px; margin-bottom: 32px;">
                <div style="flex: 1; text-align: center; padding: 16px; background: var(--gray-100); border-radius: 12px;">
                    <div style="font-weight: bold; font-size: 20px;">12</div>
                    <div style="font-size: 12px; color: var(--gray-600);">Stats</div>
                </div>
                <div style="flex: 1; text-align: center; padding: 16px; background: var(--gray-100); border-radius: 12px;">
                    <div style="font-weight: bold; font-size: 20px;">34</div>
                    <div style="font-size: 12px; color: var(--gray-600);">Stats</div>
                </div>
            </div>
            
            <div class="wire-card"><div class="wire-text-line medium"></div></div>
            <div class="wire-card"><div class="wire-text-line medium"></div></div>
        </div>
    `,
    settings: `
        <div class="screen" id="settings">
            <div class="header-bar">
                <div class="icon-placeholder" onclick="navigateTo('profile')" style="cursor: pointer;"></div>
            </div>
            <div class="wire-title">Settings</div>
            
            <div style="margin-top: 24px;">
                <div style="padding: 16px 0; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center;">
                    <div style="color: var(--gray-900); font-weight: bold;">Dark Mode</div>
                    <div class="toggle-switch" id="dark-mode-toggle" onclick="toggleDarkMode()">
                        <div class="toggle-knob"></div>
                    </div>
                </div>
                <div style="padding: 16px 0; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center;">
                    <div class="wire-text-line medium" style="margin: 0;"></div>
                    <div class="icon-placeholder"></div>
                </div>
                <div style="padding: 16px 0; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center;">
                    <div class="wire-text-line medium" style="margin: 0;"></div>
                    <div class="icon-placeholder"></div>
                </div>
            </div>
            
            <div class="spacer"></div>
            <button class="wire-button secondary" onclick="navigateTo('login')">Log Out</button>
        </div>
    `,
    details: `
        <div class="screen" id="details">
            <div class="header-bar">
                <div class="icon-placeholder" onclick="navigateTo('home')" style="cursor: pointer;"></div>
            </div>
            
            <div class="image-placeholder">Image Placeholder</div>
            
            <div class="wire-title">Item Details Title</div>
            <div class="wire-text-line long"></div>
            <div class="wire-text-line long"></div>
            <div class="wire-text-line long"></div>
            <div class="wire-text-line medium"></div>
            
            <div class="spacer"></div>
            <button class="wire-button">Main Action</button>
        </div>
    `
};

// Inject all screens into DOM
for (const [key, html] of Object.entries(screens)) {
    appContainer.innerHTML += html;
}

// Loading Simulation Logic
function simulateLoading(fromScreen) {
    if (fromScreen === 'signup') {
        const nameInput = document.getElementById('signup-name');
        if (nameInput && nameInput.value.trim() !== '') {
            const homeGreeting = document.getElementById('home-greeting');
            if (homeGreeting) {
                homeGreeting.innerText = "Good Morning, " + nameInput.value.trim();
            }
        }
    }
    navigateTo('loading');
    setTimeout(() => {
        navigateTo('home');
    }, 1500);
}

// Navigation Logic
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        appContainer.scrollTop = 0;
    }
    
    // Show/hide bottom nav based on screen
    const screensWithNav = ['home', 'search', 'notifications', 'profile'];
    if (screensWithNav.includes(screenId)) {
        bottomNav.style.display = 'flex';
        appContainer.style.paddingBottom = '80px';
    } else {
        bottomNav.style.display = 'none';
        appContainer.style.paddingBottom = '24px';
    }
}

// Dark Mode Logic
function toggleDarkMode() {
    document.querySelector('.device-frame').classList.toggle('dark-theme');
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.classList.toggle('active');
    }
}

// Start with splash, then go to onboarding
navigateTo('splash');
setTimeout(() => {
    navigateTo('onboarding');
}, 2000);
