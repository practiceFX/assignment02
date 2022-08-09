import React from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import DetailMovie from '../component/detailMovie';
import MovieSearch from '../component/movieSearch';
import './search.scss'



const Search = props => {
	const [status, setstatus] = React.useState('false');
	const query = React.useRef();
	const [detailMovie, setdetailMovie] = React.useState(null);
	//pass data IdMovie to App Componet
	function handleClick(item) {
		setdetailMovie(item);
		setstatus(item.status);
		props.handleIdvideo(item.id);
		console.log(item);
	};
	// end
	// handle click outside to close detailMovie Component
	document.addEventListener('click', (e) => {

		if (e.target.classList.value == 'box-item-movie btn btn-secondary' ||
			e.target.classList.value == 'detail-movie card-body' ||
			e.target.classList.value == 'infor col-6') {
			setstatus('true');
		}
		else {
			setstatus('false');
		}
	})
	//end
	const handleReset = () => {
		query.current.value = '';
	}
	return (
		<Card className={`page ${status == 'true' ? 'page-detail' : ''}`}>
			<CardBody className='search-area'>
				<CardTitle className='search-box'>
					<input type='text' className='search' ref={query} placeholder='Search' />
					<i class="fa fa-search" aria-hidden="true"></i>
				</CardTitle>
				<CardTitle className='btn-gr'>
					<Button className='btn-reset' onClick={handleReset}>Reset</Button>
					<Button className='btn-search' onClick={() => props.handleSearch(query)}>Search</Button>
				</CardTitle>
			</CardBody>
			{
				props.loading == true ? ('Loading') : (
					<MovieSearch
						title='Kết quả tìm kiếm'
						listMovie={props.search == null ? (props.SearchDefault) : props.search}
						handlePassData={handleClick}
					/>
				)
			}

			<DetailMovie
				title={detailMovie?.name}
				date_release={detailMovie?.first_air_date}
				vote={detailMovie?.vote_average}
				overview={detailMovie?.overview}
				url={detailMovie?.id}
				status={status} />
		</Card >
	);
};

export default Search;
