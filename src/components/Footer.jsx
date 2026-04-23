import React from 'react'
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer>
        <div className="footer_content">
            <p>&copy; 2026 <span className="highlight">Bato Bato Pick</span>. All Rights Reserved.</p>
            <p id="footer_dev">Designed & Developed by <span className="dev_name">John Paul</span></p>
        </div>
    </footer>
  )
}

export default Footer
