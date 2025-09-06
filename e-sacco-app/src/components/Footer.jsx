import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="small-text"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '10px 0',
        background: 'transparent',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 1000,
        color: theme === 'dark' ? '#f8f9fa' : '#212529',
      }}
    >
      © 2025 Beatcraft
    </footer>
  );
}

export default Footer;
