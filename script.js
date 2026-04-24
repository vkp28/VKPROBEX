const panels = {
    game: { url: "gp.ateex.cloud", img: "gaming-panel.png", sidebar: ["Real-Time Console", "Mods Installer", "Plugin Installer", "Player Manager", "Config Editor", "Version Changer"] },
    web: { url: "smartweb.ateex.cloud", img: "web-panel.png", sidebar: ["Panel Overview", "File Manager", "Database Manager", "SSL & Security", "1-Click Installer", "DNS Zone Editor"] },
    vps: { url: "vps.alarex.org", img: "vps-panel.png", sidebar: ["Panel Overview", "OS Reinstallation", "SSH Keys & Access", "Real-time Monitoring", "Advanced Firewall"] },
    reseller: { url: "panel.ateex.cloud", img: "reseller-panel.png", sidebar: ["Dashboard Overview", "Home Panel", "Manage Clients", "Account Settings", "Activity Logs"] }
};

function toggleModal() { document.getElementById('loginModal').classList.toggle('hidden'); }

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('landingPage').classList.add('hidden');
    document.body.style.overflow = 'hidden'; // Stop scrolling on dashboard
    switchTab('game');
});

function switchTab(type) {
    // UI Update for Tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');
    
    const data = panels[type];

    // Build Sidebar
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item"><span>${item}</span><i class="fas fa-chevron-right text-[10px]"></i></div>
    `).join('');

    // Build the Mac-Style Panel Browser
    document.getElementById('panelView').innerHTML = `
        <div class="flex flex-col h-full bg-[#0d0d0d]">
            <div class="bg-[#1a1a1a] p-3 flex items-center gap-4 border-b border-white/5">
                <div class="flex gap-2 ml-2">
                    <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div class="flex-1 bg-black/40 text-gray-500 text-[10px] py-2 rounded-md text-center font-mono border border-white/5">
                    ${data.url}
                </div>
                <div class="w-12"></div>
            </div>
            <div class="flex-1 relative overflow-hidden group">
                <img src="${data.img}" class="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition duration-500" 
                     onerror="this.src='https://via.placeholder.com/1200x800/0a0a0a/333?text=UPLOAD+${data.img}+TO+GITHUB'">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-8">
                    <h3 class="text-3xl font-black uppercase text-white tracking-tighter">${data.sidebar[0]}</h3>
                </div>
            </div>
        </div>
    `;
}
