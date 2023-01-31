import {useEffect, useState} from 'react'
import axios from 'axios'
import Pokemon from './components/Pokemon'
import Pagination from './components/Pagination'

function App() {

  //Felveszünk egy állapotot amiben eltároljuk az api-ból vissszakapott elemeket (pokemon neve+url)
  const [pokemon, setPokemon] = useState([]);
  //Felveszünk egy állapotot a lekért api urljének. Azért állapotként tároljuk, mert meg fog változni azt url cím ha a következő 20 pokemon nevét akarom lekérni
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  //Felveszünk két állpaotot a gombok működéséhez - Ebben tároljuk el az előző és következő 20 pokemont tartalmazó url címet
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();


  //Lekérjük az alapértelmezetten eltárolt url-ben szereplő pokemonokat (összes)
  useEffect(()=> {

    let cancel;

    axios.get(currentUrl, {

      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {

      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemon(res.data.results.map(p => p));
    })

   

    return () => cancel();

  }, [currentUrl])


  const goNextPage = () => {

      setCurrentUrl(nextPage)
  }

  const goPrevPage = () => {

    setCurrentUrl(prevPage)
}



  return (
    <div>
        <Pokemon data={pokemon} />
        <Pagination
          goNextPage={nextPage ? goNextPage : null}
          goPrevPage={prevPage ? goPrevPage : null}
        />
    </div>
  );
}

export default App;
