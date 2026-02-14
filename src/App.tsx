import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Introduce } from './components/Introduce';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Career } from './components/Career';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Profile />
        <Introduce />
        <Skills />
        <Projects />
        <Career />
      </main>
      <Footer />
    </>
  );
}

export default App;
