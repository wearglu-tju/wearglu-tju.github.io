import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navigation } from '../data/siteContent'
import { useSlideNavigation } from './SlideDeck'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { activeId } = useSlideNavigation()
  const active = activeId.replace(/-(?:more|\d+)$/, '')

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="WearGlu 首页">
        <span className="brand-mark">W<span>+</span></span>
        <span>WearGlu</span>
      </a>
      <button className="menu-toggle" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
        {navigation.map((item) => (
          <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} onClick={closeMenu}>{item.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href="#demo" onClick={closeMenu}>查看演示 <ArrowRight size={15} /></a>
    </header>
  )
}
