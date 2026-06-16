import { Outlet } from 'react-router-dom'
import { SidebarDesktop, MobileDrawer } from './Sidebar'
import { Topbar } from './Topbar'
import { useState } from 'react'

export function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SidebarDesktop />
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="lg:ml-64">
        <Topbar showMenuButton onMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
