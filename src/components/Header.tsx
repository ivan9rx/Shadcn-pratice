
import { Link } from 'react-router-dom'

import { Button } from './ui/button'

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">

            <div className="text-xl font-bold">
                Sistema Notas de Corte
            </div>


            <nav className="space-x-4">
                <Link to="/home">
                    <Button variant="link" className="text-white">
                        Home
                    </Button></Link>

                <Link to="/admin-curso">
                    <Button variant="link" className="text-white">
                        Gerenciar Cursos
                    </Button>
                </Link>

                <Link to="/admin-user">
                    <Button variant="link" className="text-white">
                        Gerenciar Usuários
                    </Button>
                </Link>


            </nav>
        </header>
    )
}

export default Header
