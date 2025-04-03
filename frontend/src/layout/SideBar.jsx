import './style.css';
import { Link } from "react-router-dom";

function SideBar() {

    return (
        <nav className="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-brand">Menu</div>
          </div>
            <div className="sidebar-menu">
              <ul className="menu-list">
                <li>
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text">Novo usuário</span>
                  </Link>
                </li>

                <li>
                  <Link to="/update-user" className="menu-link">
                    <span className="menu-link-text">Atualizar usuário</span>
                  </Link>
                </li>
    
                <li>
                  <Link to="/list-people" className="menu-link">
                    <span className="menu-link-text">Lista de usuários</span>
                  </Link>
                </li>
              </ul>
            </div>
        </nav>
      );
}

export default SideBar;