import './App.css'; // Importando o CSS
import Header from '../../components/Header';
import Footer from '@/components/Footer';



function Home() {

  return (
    <>
      <Header />
      <div className='table-container'>
        <h1>Você esta na home</h1>
      </div>
      <Footer />
    </>

  );
}

export default Home;
