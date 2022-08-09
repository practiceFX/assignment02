import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import './App.css';
import Browse from './pages/browse/Browse';
import Navbar from './pages/component/navbar';
import Search from './pages/search/Search';
import Store from './pages/store/store';




const requests = { // Array requests for each category
	fetchTrending: `trending/all/week?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&language=en-US`,
	fetchNetflixOriginals: `discover/tv?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_network=123`,
	fetchTopRated: `movie/top_rated?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&language=en-US`,
	fetchActionMovies: `discover/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_genres=28`,
	fetchComedyMovies: `discover/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_genres=35`,
	fetchHorrorMovies: `discover/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_genres=27`,
	fetchRomanceMovies: `discover/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_genres=10749`,
	fetchDocumentaries: `discover/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&with_genres=99`,
	fetchSearch: `search/movie?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb&language=en-US`
};
//end



//model to save the details of the film
const modelItemThumb = (id, name, poster_path, overview, vote_average, first_air_date) => {
	return [{
		id: id,
		name: name,
		poster_path: poster_path,
		overview: overview,
		vote_average: vote_average,
		first_air_date: first_air_date
	}]
}
//end


//model to save the details banner 
const modelBanner = (name, poster_path, overview) => {
	return [{
		name: name,
		poster_path: poster_path,
		overview: overview
	}]
}
//end

function App() {
	const [loading, setloading] = React.useState(false);
	const [error, seterror] = React.useState(false);
	const [dataMovie, setdataMovie] = React.useState(null);
	const [search, setsearch] = React.useState(null);
	const [urlEmber, seturlEmber] = React.useState(null);




	const fetchHandleMovie = React.useCallback(
		async () => {
			try {
				// set status loading when get data
				setloading(true);
				seterror(false);
				//end

				//get information movie from The Movie Database API 
				const Banner = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb`);
				const jsonBanner = await Banner.json();
				const Originals = await fetch(`https://api.themoviedb.org/3/${requests.fetchNetflixOriginals}`);
				const jsonOriginals = await Originals.json();
				const Trending = await fetch(`https://api.themoviedb.org/3/${requests.fetchTrending}`);
				const jsonTrending = await Trending.json();
				const Toprated = await fetch(`https://api.themoviedb.org/3/${requests.fetchTopRated}`);
				const jsonToprated = await Toprated.json();
				const Action = await fetch(`https://api.themoviedb.org/3/${requests.fetchActionMovies}`);
				const jsonAction = await Action.json();
				const Comedy = await fetch(`https://api.themoviedb.org/3/${requests.fetchComedyMovies}`);
				const jsonComedy = await Comedy.json();
				const Horror = await fetch(`https://api.themoviedb.org/3/${requests.fetchHorrorMovies}`);
				const jsonHorror = await Horror.json();
				const Romance = await fetch(`https://api.themoviedb.org/3/${requests.fetchRomanceMovies}`);
				const jsonRomance = await Romance.json();
				const Document = await fetch(`https://api.themoviedb.org/3/${requests.fetchDocumentaries}`);
				const jsonDocument = await Document.json();
				// end

				//check response 
				if (!Banner.ok) {
					throw new Error('Some thing error')
				}
				//end


				//save data 
				await setdataMovie([
					{
						Banner: modelBanner(jsonBanner.original_title, jsonBanner.poster_path, jsonBanner.overview),
						Originals: jsonOriginals?.results?.map((item) => { return modelItemThumb(item.id, item.name, item.poster_path, item.overview, item.vote_average, item.first_air_date) }),
						Trending: jsonTrending?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Toprated: jsonToprated?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Action: jsonAction?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Comedy: jsonComedy?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Horror: jsonHorror?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Romance: jsonRomance?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Document: jsonDocument?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.backdrop_path, item.overview, item.vote_average, item.release_date) }),
						Search: jsonDocument?.results?.map((item) => { return modelItemThumb(item.id, item.name, item.backdrop_path, item.overview, item.vote_average, item.first_air_date) })
					}
				]);//end

				setloading(false);

			} catch (err) {
				seterror(err);

			}
		}
	)

	//get URL key embers video when show details movie
	const getUrlVideo = async (id) => {
		const res = await fetch(`https://api.themoviedb.org/3//movie/${id}/videos?api_key=e2bc2cc2c5780ae2c6ffab88b2ba43fb`);
		const data = await res.json();
		seturlEmber(data?.results[0]?.key);
	}
	//end

	//get data from search key
	const handleSearch = async (query) => {
		const Search = await fetch(`https://api.themoviedb.org/3/${requests.fetchSearch}&query=${query?.current?.value}`);
		const jsonSearch = await Search.json();
		setsearch([{
			Search: jsonSearch?.results?.map((item) => { return modelItemThumb(item.id, item.title, item.poster_path, item.overview, item.vote_average, item.release_date) })
		}]);
		console.log(jsonSearch)
	}//end

	React.useEffect(() => {
		if (dataMovie == null) {
			fetchHandleMovie()
		}
		// getUrlVideo()
	});

	return (
		<BrowserRouter>
			<Store.Provider value={{ url: urlEmber }}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Browse
						poster_path={dataMovie != null ? (dataMovie[0].Banner[0].poster_path) : null}
						name={dataMovie != null ? (dataMovie[0].Banner[0].name) : null}
						overview={dataMovie != null ? (dataMovie[0].Banner[0].overview) : null}
						Original={dataMovie != null ? (dataMovie[0].Originals) : null}
						Toprated={dataMovie != null ? (dataMovie[0].Toprated) : null}
						Action={dataMovie != null ? (dataMovie[0].Action) : null}
						Comedy={dataMovie != null ? (dataMovie[0].Comedy) : null}
						Horror={dataMovie != null ? (dataMovie[0].Horror) : null}
						Romance={dataMovie != null ? (dataMovie[0].Romance) : null}
						Document={dataMovie != null ? (dataMovie[0].Document) : null}
						handleIdvideo={getUrlVideo}
						loading={loading}
					/>} />
					<Route path="/search" element={<Search
						SearchDefault={dataMovie != null ? (dataMovie[0].Search) : null}
						search={search != null ? (search[0].Search) : null}
						loading={loading}
						handleIdvideo={getUrlVideo}
						handleSearch={handleSearch}
					/>} />

				</Routes>
			</Store.Provider>
		</BrowserRouter>
	);
}

export default App;
